---
permalink: /URLShortner/
layout: default
title: "Design a URL Shortener — System Design Interview"
description: "System design for Designing a URL Shortener Like Bitly or TinyURL - architecture, deep dives, and trade-offs"
---

# Designing a URL Shortener Like Bitly or TinyURL

⚡ **Difficulty:** Beginner–Intermediate
📋 **Prerequisites:** [System Design Fundamentals](/concepts) — especially Caching and CDN
⏱️ **Reading time:** 20 min

---

## TL;DR

A URL shortener maps short codes to long URLs and redirects billions of clicks per day using tiered caching (CDN → Redis → DB).

```mermaid
flowchart LR
    USER["Browser"]:::client
    CDN["CDN Edge<br/>cache hot links"]:::edge
    RS["Redirect Service"]:::service
    REDIS[("Redis cache")]:::data
    DB[("Global KV Store<br/>all links")]:::data

    USER --> CDN
    CDN --> RS
    RS --> REDIS
    RS --> DB

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef edge fill:#42A5F5,stroke:#0D47A1,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
```

**In 3 sentences:** User submits a long URL → system generates a unique short code (base62 of a Snowflake ID) → stores the mapping. On redirect, the system looks up the short code through CDN → Redis → DB tiers and returns a 302. Analytics events fire async to Kafka without slowing the redirect.

---

## Understanding the Problem

🔗 **What is a URL shortener?** A service that takes a long URL like `https://example.com/products/2024/summer-sale?utm_campaign=email&ref=newsletter` and gives you back a short one like `https://sho.rt/aB3xY9`. When someone clicks the short link, they're redirected to the original. Despite the tiny API surface, a URL shortener has to handle billions of redirects a day, generate unique codes without collisions, survive traffic spikes on viral links, and provide analytics.

Think Bitly, TinyURL, t.co (Twitter), or Google's short-lived goo.gl.

## Naive First Cut

A 30-second whiteboard sketch:

```mermaid
flowchart LR
    USER["User Browser"]:::client
    API["Shortener API"]:::service
    DB[("One DB<br/>short to long")]:::data

    USER --> API
    API --> DB

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
```

Receive a URL, generate a random code, store `{short, long}` in a DB, look it up on redirect. Works for 100 users. Breaks at scale:
- Random code generation collides more often than you'd think at 100M+ links.
- Every redirect is a DB read, so 1M redirects/sec melts the DB.
- Hot links (a tweet goes viral) hammer a single row.
- No analytics beyond "it existed."
- One DB region → half the planet sees 200ms+ redirect latency.

The rest of this doc evolves this into a system that serves billions of redirects globally at low latency.

## Prior Art We're Drawing From

- **Bitly** — the canonical URL shortener. Public writeups describe a heavy read-cache tier, base62 encoding over numeric IDs, and a dedicated analytics pipeline separate from the redirect hot path. ([Educative overview](https://www.educative.io/blog/bitly-system-design))
- **Twitter Snowflake** — 64-bit distributed ID generator producing time-ordered unique IDs without coordination per request. Widely adopted as an alternative to DB auto-increment for short-code generation. ([paper / repo](https://github.com/twitter-archive/snowflake))
- **Base62 encoding** — the standard way to turn a numeric ID into a short alphanumeric code. 7 characters of base62 give 3.5 trillion unique codes, enough for decades of links.
- **Counter-based ranges (Zookeeper / DB)** — pre-allocate ranges of IDs to each service instance to avoid per-request coordination. Instagram's photo ID generation is a famous variant.
- **CDN-cached 301 redirects** — t.co and goo.gl both served redirects from edge POPs. Bitly uses its own edge infrastructure with aggressive caching.

## Technology Choices

Each component in this design is generic — here are real options for each. Pick per your stack and ops capacity.

| Component | Options (pick one) |
|---|---|
| CDN / edge compute | Cloudflare (Workers), CloudFront (Lambda@Edge), Fastly (Compute@Edge), Akamai EdgeWorkers |
| Edge WAF / bot control | Cloudflare WAF, AWS WAF + Shield, Fastly Next-Gen WAF, Akamai Kona |
| API gateway | Kong, Apigee, AWS API Gateway, Envoy, Tyk |
| Service compute | Kubernetes (EKS / GKE / AKS), Nomad, ECS Fargate, plain VMs |
| Global KV source of truth | DynamoDB Global Tables, Cassandra multi-DC, ScyllaDB, Spanner, CockroachDB |
| Regional in-memory cache | Redis (ElastiCache / self-hosted / Upstash), Memcached, Valkey |
| ID generation | Snowflake (self-hosted), Sonyflake, MongoDB ObjectID, UUIDv7, DB counter with range allocation |
| Event backbone | Kafka (MSK / Confluent / self-hosted), Kinesis, Google Pub/Sub, Pulsar, RabbitMQ Streams |
| Stream processing | Flink (managed or self-hosted), Kafka Streams, Spark Structured Streaming, Materialize, ksqlDB |
| Raw event lake | S3, GCS, Azure Blob, MinIO — with Parquet/Iceberg table format |
| Ad-hoc analytics | Athena, BigQuery, Snowflake, Trino / Presto, DuckDB |
| Serving analytics store | ClickHouse, Pinot, Druid, Timestream, OpenSearch, Redshift, TimescaleDB |
| DNS / traffic routing | Route 53, Cloudflare DNS, NS1, Google Cloud DNS with latency-based routing |
| Secrets / config | Vault, AWS Secrets Manager, GCP Secret Manager, Doppler |
| Observability | Prometheus + Grafana + Loki + Tempo, Datadog, New Relic, CloudWatch, Honeycomb |

Rule of thumb: **managed > self-hosted** when the workload isn't a differentiator. We're not in the "run Kafka" business.

---

## Functional Requirements

### Core Requirements
1. Users should be able to submit a long URL and get back a unique short URL.
2. Anyone with a short URL should be redirected to the original long URL, fast.
3. Short URLs should have a configurable expiry (default: forever) and support click analytics.

### Below the line (out of scope)
- User accounts, API keys, billing, dashboards
- Custom aliases / vanity URLs (simple extension once core works)
- Password-protected or expiring-on-click links
- Real-time dashboards with sub-second freshness
- QR codes, link previews, malware scanning
- Custom domains per customer

## Non-Functional Requirements

### Core Requirements
- **Read-heavy workload** — 100:1 reads to writes. Every design decision is driven by the redirect hot path.
- **Low redirect latency** — P99 under 100ms globally. This is user-facing; slow redirects feel broken.
- **High availability** — 99.99% on the redirect path. A dead redirect breaks someone else's tweet.
- **Uniqueness** — no two long URLs can accidentally share a short code.
- **Scale** — 100M new links/day, 10B redirects/day, 5-year retention → ~200B rows at peak.

### Below the line
- Strong consistency on analytics counts (eventual is fine)
- Strict ordering of click events
- Sub-100ms link creation latency (creation is rare; can be 500ms)

---

## Core Entities

- **Long URL** — the original destination URL the user submitted.
- **Short Code** — the unique alphanumeric suffix (`aB3xY9`) that identifies a mapping.
- **Link** — the stored mapping of `short_code → long_url` with metadata (creator, created_at, expires_at).
- **Click Event** — a record of a single redirect, with timestamp, IP-derived country, referrer, user agent.

---

## API / System Interface

```
POST /v1/links                                 → Link
     Body: { longUrl, customAlias?, expiresAt? }
     Header: Authorization: Bearer <api_key>

GET  /:shortCode                               → 302 redirect
     Public endpoint on the short domain (sho.rt/aB3xY9)

GET  /v1/links/:shortCode/stats                → ClickStats
     Aggregated clicks by time bucket, country, referrer

DELETE /v1/links/:shortCode                    → 204
     Soft delete — short code becomes 410 Gone
```

Security notes:
- Creation is authenticated via API key; redirects are public.
- `customAlias` (if supported) must be validated for reserved words and rate-limited per user.
- Submitted URLs should be screened for phishing/malware (out of scope for this HLD, but hook point needed).
- Never trust the `Referer` header for anything beyond analytics; it's user-controlled.

---

## High-Level Design

Let's build up service by service.

### 1) User creates a short URL

The create path is low-QPS (~1K/sec peak) but needs a unique, collision-free short code every time.

**New components we need:**

1. **API Gateway** — the front door. Authenticates API keys, applies per-user rate limits, and routes requests to the right service. 💡 *Think of it as a security guard + receptionist for your backend.*
2. **Write Service** — handles link creation. Validates the URL, generates the short code, and stores the mapping.
3. **Snowflake ID Generator** — produces unique numeric IDs without any coordination between servers. 💡 *Snowflake = a distributed ID generator that embeds a timestamp + machine ID + sequence number into a single 64-bit integer. No two machines ever produce the same ID, even without talking to each other.*
4. **Global KV Store** — where the `short_code → long_url` mapping lives permanently. Needs to survive failures and serve reads worldwide.

```mermaid
flowchart LR
    CLIENT["Client"]:::client
    GW["API Gateway<br/>Kong Apigee or AWS"]:::edge
    WS["Write Service<br/>Kubernetes or Fargate"]:::service
    IDG["Snowflake ID Gen"]:::service
    DB[("Global KV<br/>DynamoDB or Cassandra")]:::data

    CLIENT --> GW
    GW --> WS
    WS --> IDG
    WS --> DB

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef edge fill:#42A5F5,stroke:#0D47A1,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
```

### Color Legend

| Color | Layer |
|---|---|
| 🟠 Orange | Clients |
| 🔵 Blue | Edge |
| 🟢 Green | Services |
| 🟣 Purple | Async / Streaming |
| 🟡 Yellow | Data |
| 🩷 Pink | External |

**Step-by-step flow:**

1. User calls `POST /v1/links` with their long URL and API key → request hits the API Gateway
2. Gateway checks: Is this API key valid? Has this user exceeded their rate limit?
3. Gateway forwards to Write Service, which asks the Snowflake ID Generator for a fresh numeric ID, then base62-encodes it into a 7-character short code (e.g., `aB3xY9`)
4. Write Service stores `{short_code, long_url, user_id, created_at, expires_at}` in the Global KV Store
5. Returns the short URL to the user — done in under 100ms

**Why Snowflake instead of random strings?** Random strings require a "check if it already exists" round-trip on every creation. At 100M+ links, collisions become frequent and expensive. Snowflake IDs are unique by construction — no checking needed, ever.

### 2) Anyone hits the short URL and gets redirected

This is the hot path — billions of reads per day. Latency and cost both matter.

**New components we need (in addition to the ones above):**

1. **CDN Edge** — servers deployed worldwide (Cloudflare, CloudFront, Fastly) that cache popular redirects close to users. A viral link gets served from the edge in under 10ms without ever touching our origin servers.
2. **Redirect Service** — the origin server that handles CDN misses. Looks up the short code and returns a `302 Found` with the long URL.
3. **Redis Cache** — a regional in-memory cache sitting between the Redirect Service and the database. Holds recently-accessed links for sub-millisecond lookups.
4. **Event Bus** — captures every click as an event for analytics, without slowing down the redirect. 💡 *Fire-and-forget pattern: the redirect returns immediately, and the click event flows through the bus in the background.*

```mermaid
flowchart LR
    USER["Browser"]:::client
    CDN["CDN edge<br/>Cloudflare CloudFront Fastly"]:::edge
    RS["Redirect Service"]:::service
    CACHE[("Redis cache<br/>ElastiCache or self hosted")]:::data
    DB[("Global KV<br/>DynamoDB or Cassandra")]:::data
    K["Event bus<br/>Kafka or Kinesis"]:::async

    USER --> CDN
    CDN --> RS
    RS --> CACHE
    RS --> DB
    RS --> K

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef edge fill:#42A5F5,stroke:#0D47A1,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef async fill:#AB47BC,stroke:#4A148C,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
```

**Step-by-step flow:**

1. User clicks `sho.rt/aB3xY9` → browser sends a GET request
2. CDN edge checks its local cache — for popular links (that viral tweet everyone's clicking), the redirect is served right there, under 10ms, without ever reaching our servers
3. On CDN miss → request reaches our Redirect Service, which checks the regional Redis cache
4. On Redis miss → reads from the Global KV Store and backfills both Redis and CDN caches for next time
5. Fires a click event to the Event Bus (fire-and-forget — the redirect doesn't wait for analytics)
6. Returns `302 Found` with the long URL in the `Location` header → browser redirects

**Why `302` and not `301`?** A `301` (permanent redirect) tells the browser to cache it forever. Next time the user clicks that link, the browser goes directly to the destination — we never see the click. That means no analytics. `302` (temporary redirect) forces the browser through us every time, so we count every click.

### 3) Analytics and stats

Clicks go to Kafka from the hot path. A stream processor aggregates them into per-link counters visible via a stats API.

**New components we need (in addition to the ones above):**

1. **Stream Processor (Flink or Kafka Streams)** — reads raw click events and aggregates them into per-link counters by time bucket, country, and referrer. 💡 *Instead of counting clicks one-by-one on each query, the stream processor pre-computes rollups so dashboard queries are instant.*
2. **Serving Store (ClickHouse, Pinot, or Timestream)** — a columnar database optimized for fast aggregation queries like "how many clicks did this link get in the last 30 days, broken down by country?"
3. **Object Storage (S3 / GCS)** — where raw click events are archived as Parquet files for long-term retention and ad-hoc analysis.
4. **Stats API** — serves pre-aggregated analytics to dashboards. Never scans raw events at query time.

```mermaid
flowchart LR
    RS["Redirect Service"]:::service
    K["Event bus<br/>Kafka or Kinesis"]:::async
    SP["Stream processor<br/>Flink or Kafka Streams"]:::service
    AGG[("Serving store<br/>ClickHouse Pinot or Timestream")]:::data
    RAW[("Object storage<br/>S3 GCS Parquet")]:::data
    API["Stats API"]:::service
    CLIENT["Dashboard"]:::client
    ADHOC["Ad hoc SQL<br/>Athena BigQuery Trino"]:::service

    RS --> K
    K --> SP
    K --> RAW
    SP --> AGG
    CLIENT --> API
    API --> AGG
    CLIENT --> ADHOC
    ADHOC --> RAW

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef async fill:#AB47BC,stroke:#4A148C,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
```

Flow:
1. Redirect Service fires every click to the event bus (Kafka / Kinesis / Pub/Sub). The redirect itself doesn't wait.
2. A stream processor (Flink / Kafka Streams / Spark Streaming) windows events by `short_code + time_bucket + country + referrer`, writing aggregates to a serving store (ClickHouse / Pinot / Druid / Timestream).
3. Raw events tee to object storage (S3 / GCS) as hourly Parquet, queryable via Athena / BigQuery / Trino.
4. Stats API reads pre-aggregated rollups — cheap queries, no scanning billions of rows at request time.

---

## Potential Deep Dives

### Deep Dive 1 — How do we generate short codes at 1K/sec without collisions?

**Problem.** We need every short code to be globally unique. With 100M links/day, we're generating ~1,200/sec sustained. Naive approaches either collide, don't scale, or require coordination on every request.

**Bad — MD5 or SHA256 hash of the long URL, take first 7 chars.**
- Same URL always hashes to the same code, which **seems** like a nice dedupe property — but now two users submitting the same URL share a code and share click stats, which is almost never what they want.
- Hash collisions force you to rehash with a salt and retry, which means an unknown number of DB round-trips per write.
- Truncating 128 bits to 42 bits (7 base62 chars) multiplies collision probability exponentially.

Use hashing only if "same URL → same short code" is an explicit product requirement.

**Good — DB auto-increment ID, base62-encoded.**
- `INSERT INTO links (long_url, ...) RETURNING id`, then base62-encode the ID.
- 7 chars of base62 = 62^7 ≈ 3.5 trillion codes. Plenty.
- Zero collision risk — the DB guarantees uniqueness.
- Problem: a single-primary DB becomes the ID bottleneck at scale. Every insert waits on the sequence.
- Sequential IDs are **predictable** — someone can enumerate `aAAAAA0`, `aAAAAA1`, ... and scrape every link. For a URL shortener that's a privacy leak (short links are often effectively "private" because they're unguessable).

**Great — distributed ID generation with Snowflake + base62 + optional bit-shuffling.**

Options, each with a use case:

1. **Twitter Snowflake** — 64-bit ID = `[41 bits timestamp][10 bits machine ID][12 bits sequence]`. Each service pod generates its own IDs, no coordination, time-ordered, collision-free across ~1K machines. Base62-encode the lower 42 bits for a 7-char code. Used in production by Twitter, Instagram, Discord.
2. **Zookeeper range allocator** — a service instance requests a range of 1M IDs at once from Zookeeper, burns through them locally, and requests the next range. Handles DB unavailability, no per-request coordination.
3. **Database with pre-allocated ranges** — same as (2) but using a single `counter` table row with `SELECT ... FOR UPDATE SKIP LOCKED`. Simpler infra, slightly slower.

To defeat enumeration scraping, we can **bit-shuffle** the numeric ID before base62-encoding using a fixed, reversible permutation (Feistel network or multiply-by-large-prime mod 2^42). Codes become unpredictable without adding any lookup cost — we still decode back to the real ID by reversing the permutation.

For custom aliases (if we support them), we use a separate write path: first try `INSERT ... ON CONFLICT DO NOTHING` on the alias; reserve reserved words (`admin`, `api`, `login`) in a denylist.

### Deep Dive 2 — How do we serve 10B redirects per day at <100ms P99 globally?

**Problem.** 10B redirects/day = ~120K/sec average, 500K/sec peak. A round-trip to a primary DB in us-east-1 from Singapore is already 200ms, before you touch the data. We need data close to the user.

**Bad — single origin DB, one region, hope for the best.**
Falls over on raw QPS and gives lousy latency to anyone outside the origin region.

**Good — Redis read-through cache, multi-replica DB.**
In-memory cache holds the top N popular links; origin DB handles misses. Read replicas spread the load. Better, but still a round-trip to the origin region for cache misses, and Redis in one region doesn't help international users on cold links.

**Great — tiered caching with CDN at the edge, Redis per region, and a globally replicated KV store as source of truth.**

1. **CDN edge with edge compute.** Options: Cloudflare (Workers), CloudFront (Lambda@Edge or CloudFront Functions), Fastly (Compute@Edge), Akamai. For popular links, the edge serves the `302` directly without calling origin. Sub-10ms for cache hits worldwide. Short codes cached with a short TTL (5 min). A WAF (Cloudflare WAF / AWS WAF / Fastly Next-Gen) sits in front for bot filtering and rate limits.

2. **Regional Redis cluster per region.** Options: ElastiCache Redis, self-hosted Redis on Kubernetes, Upstash, Valkey. On CDN miss, the Redirect Service in that region checks Redis. Hot dataset is the top few percent of active links — typically 20-50 GB per region, easily fits in memory. Cluster mode enabled for horizontal scale.

3. **Globally replicated KV as source of truth.** Options: DynamoDB Global Tables, Cassandra multi-DC, ScyllaDB, Spanner, CockroachDB. Multi-region, active-active or single-writer-with-replicas, asynchronous replication. A new link takes ~1-2 seconds to become readable in every region — acceptable for this use case.

4. **Bloom filter in each Redirect Service pod** to fast-reject obviously-invalid codes (404 without even hitting Redis or the KV).

```mermaid
flowchart LR
    USER["Browser"]:::client
    WAF["WAF<br/>Cloudflare AWS or Fastly"]:::edge
    CDN["CDN edge<br/>5 min TTL"]:::edge
    RS["Redirect Service<br/>regional"]:::service
    BF["Bloom Filter<br/>in pod"]:::service
    REDIS[("Redis<br/>ElastiCache or self hosted")]:::data
    KV[("Global KV<br/>DynamoDB Cassandra or Spanner")]:::data

    USER --> WAF
    WAF --> CDN
    CDN --> RS
    RS --> BF
    RS --> REDIS
    RS --> KV

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef edge fill:#42A5F5,stroke:#0D47A1,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
```

**Cache invalidation.** Two mechanisms:
- TTL-based: CDN 5 min, Redis 24 h. Worst case a deleted link keeps redirecting for 5 min.
- Active purge on delete: call the CDN's invalidation API (CloudFront `CreateInvalidation`, Cloudflare purge, Fastly purge) and publish a `link-deleted` event on the bus that regional consumers use to `DEL` from Redis. Best-effort — the TTL is the hard backstop.

### Deep Dive 3 — How do we handle a single link going viral without melting Redis?

**Problem.** "Celebrity problem." Elon tweets a short link. 100K people click it in the first second. Every redirect goes to the same Redis key on the same shard. A single Redis node tops out around 100-200K ops/sec; we've saturated one shard while the rest of the cluster sits idle.

**Bad — scale up by adding more Redis nodes.**
Doesn't help. Consistent hashing still lands all requests on the same node for this key.

**Good — local in-process LRU cache in each redirect service pod.**
Each pod caches the hottest codes in its own memory, absorbing most of the load before it ever hits Redis. Works well — RAM is cheap, a few hundred MB per pod holds the hot tail. Downside: stale invalidation is harder (have to push or poll invalidations).

**Great — CDN does most of the work + local pod cache for what gets through + request coalescing on genuine misses.**

For any truly viral link, the CDN edge should absorb 99%+ of traffic before it reaches origin. Tune the edge cache:
- Set aggressive `Cache-Control: public, max-age=300` on hot redirects.
- Use the CDN's **request collapsing** feature — N concurrent edge misses for the same key go as one upstream request.

At origin, add a per-pod LRU cache (10K entries) with 60s TTL. Anything that slips through goes to Redis.

For the rare path of a brand-new viral link (cold across all tiers), use **request coalescing in-process**: the first miss acquires a local mutex keyed by `short_code`; subsequent misses for the same code wait up to 50ms instead of all racing to Redis simultaneously. Single-flight pattern. Prevents cache stampede.

### Deep Dive 4 — How do we handle analytics without slowing down the redirect path?

**Problem.** We want per-link click counts, country breakdowns, referrer stats, time-series graphs. If we synchronously write to an analytics DB on every redirect, we just added 20ms to the hot path and a second point of failure. Multiply by 120K/sec sustained.

**Bad — synchronously increment a counter in Redis or Postgres on each redirect.**
Adds latency. Redis `INCR` on one key creates the same hot-partition problem as redirect. A counter row in Postgres is even worse. Also loses events on Redis restart.

**Good — fire-and-forget Kafka produce, aggregate in a stream processor.**
Redirect Service produces to Kafka async (100µs latency), a Flink job windows events and writes aggregates to a columnar DB. Decoupled from the redirect path; durable.

**Great — event bus + stream processor for rollups + object storage for raw events + columnar serving store.**

- Every click becomes a Protobuf message on the event bus (Kafka / Kinesis / Pub/Sub) topic `link-clicks`, keyed by `short_code` for partition-level ordering.
- A stream processor (Flink / Kafka Streams / Spark Structured Streaming) maintains tumbling-window aggregates: 1-min, 1-hour, 1-day buckets per `(short_code, country, referrer)` tuple. Writes to a columnar serving store (ClickHouse / Pinot / Druid / Timestream) for fast per-link queries.
- Same stream is tee'd via a sink connector to object storage (S3 / GCS) as hourly Parquet files — for ad-hoc queries via Athena / BigQuery / Trino, ML training, and long-term retention.
- Stats API reads only pre-aggregated rollups. `GET /links/:code/stats?range=30d` runs in milliseconds.

Fully-serverless shortcut if team wants less ops: swap Kafka+Flink for Kinesis Data Streams + Kinesis Data Firehose + Kinesis Data Analytics, or Pub/Sub + Dataflow on GCP.

Eventual consistency tradeoff is explicit: dashboard numbers lag the true count by ~1-2 minutes. For link analytics this is never a problem; nobody sits watching their click count refresh every second expecting real-time precision.

### Deep Dive 5 — How do we scale the writes to the links store?

**Problem.** 100M new links per day = ~1,200 writes/sec average. Over 5 years: 200B rows. A single Postgres instance groans somewhere around a few billion rows even with good indexing.

**Bad — one big Postgres table, add read replicas when it gets slow.**
Replicas don't help writes. Indexes balloon. Backup and restore take 12+ hours.

**Good — shard Postgres by `short_code` hash.**
N shards, each smaller and faster. Application routes by hash. Works but operationally heavy — you now own a sharding layer, cross-shard queries, and painful resharding.

**Great — pick a store built for this: DynamoDB, Cassandra, or TiDB.**

The access pattern is a perfect fit for a KV store:
- **Writes:** `PUT short_code → {long_url, user_id, created_at, expires_at}` — no joins, no transactions beyond a single row.
- **Reads:** `GET short_code` — point lookup by primary key.
- **Deletes:** `UPDATE status = 'deleted'` — also point-key.

No relational queries on the redirect path. DynamoDB (fully managed, auto-scales, Global Tables for multi-region), Cassandra (self-managed, cheaper at massive scale), or TiDB (SQL-compatible if you want it) all fit.

Schema:
```
PK: short_code  (partition key, hashed)
Attrs: long_url, user_id, created_at, expires_at, status
```

User-side queries like "all links created by user X" are a different, secondary access pattern. Serve them from a GSI (global secondary index) on `user_id` or a separate materialized view updated via CDC. Don't warp the primary schema for it.

---

## Core Flows

### Flow 1 — Create a short link

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant GW as API Gateway
    participant WS as Write Service
    participant ID as ID Generator
    participant DB as Links DB

    C->>GW: POST v1 links with API key
    GW->>GW: auth and rate limit
    GW->>WS: forward
    WS->>WS: validate URL format and deny list
    WS->>ID: next id
    ID-->>WS: snowflake id
    WS->>WS: base62 encode and bit shuffle
    WS->>DB: put short_code to long_url
    DB-->>WS: success
    WS-->>C: 201 with short URL
```

1. Client submits the long URL with an API key.
2. Gateway authenticates, rate-limits, and forwards.
3. Write Service validates URL format, blocks obvious junk and phishing denylist.
4. Asks ID Generator for a fresh Snowflake ID; base62-encodes with bit-shuffling so the code isn't enumerable.
5. Writes to the KV store. Collisions are impossible — Snowflake IDs are unique by construction.
6. Returns the short URL.

Failure worth calling out: if the KV store write fails, we retry with the same ID (the ID has already been generated, there's no benefit to burning a new one). If it keeps failing, the ID is silently wasted — Snowflake has 42 bits of address space so waste is irrelevant.

### Flow 2 — Redirect a short link

```mermaid
sequenceDiagram
    autonumber
    participant U as Browser
    participant CDN as CDN Edge
    participant RS as Redirect Service
    participant BF as Bloom Filter
    participant L as Local Pod Cache
    participant R as Regional Redis
    participant KV as Global KV
    participant K as Event Bus

    U->>CDN: GET short code
    alt CDN cache hit
        CDN-->>U: 302 to long URL
        CDN->>K: click event
    else CDN miss path
        CDN->>RS: forward to origin
        RS->>BF: probe bloom filter
        BF-->>RS: unknown or definitely not
        RS->>L: read local pod cache
        L-->>RS: hit or miss
        RS->>R: GET on local miss
        R-->>RS: hit or miss
        RS->>KV: GET on Redis miss
        KV-->>RS: long URL or not found
        RS->>R: backfill SETEX 24h
        RS->>L: backfill 60s
        RS-->>U: 302 with Location header
        RS->>K: click event fire and forget
    end
```

1. User's browser hits the short URL. CDN edge checks its cache first.
2. On CDN hit (vast majority), browser gets the `302` instantly and the CDN logs the click.
3. On CDN miss, origin service checks a bloom filter to cheaply reject codes that definitely don't exist.
4. Local pod cache → regional Redis → global KV, each populated on miss.
5. `302` returned to browser with `Location: <long_url>` header.
6. Click event fired to Kafka asynchronously; the redirect does not wait.

Failure handling: if all caches miss AND the KV is slow, we time out the read at 50ms and return `503 Try Again`. We never serve a wrong URL; stale-if-error is risky because the link's destination may have been changed.

### Flow 3 — Analytics ingestion

```mermaid
sequenceDiagram
    autonumber
    participant RS as Redirect Service
    participant K as Kafka clicks
    participant SP as Flink Stream Processor
    participant CH as ClickHouse
    participant S3 as S3 Parquet
    participant API as Stats API
    participant D as Dashboard

    RS->>K: produce click event
    K->>SP: consume
    K->>S3: hourly sink
    SP->>SP: window by short_code + country + bucket
    SP->>CH: write aggregates
    D->>API: GET stats range 30d
    API->>CH: SELECT aggregated
    CH-->>API: rollup rows
    API-->>D: chart data
```

1. Every redirect produces a click event — `{short_code, ts, ip_country, referrer, user_agent}`.
2. Kafka Connect sinks raw events to S3 for long-term retention and ad-hoc analytics.
3. Flink maintains per-link rollups in ClickHouse across 1-min, 1-hour, and 1-day windows.
4. Dashboards query ClickHouse via the Stats API — fast even for a link with a billion clicks because we're reading aggregates, not raw events.

### Link state machine

```mermaid
stateDiagram-v2
    [*] --> ACTIVE
    ACTIVE --> EXPIRED: TTL reached
    ACTIVE --> DELETED: user deletes
    EXPIRED --> [*]: purged after 90d
    DELETED --> [*]: purged after 90d
```

`ACTIVE` links redirect normally. `EXPIRED` and `DELETED` return `410 Gone` (not `404`), so clients can distinguish "this link intentionally ended" from "this link never existed."

---

## Final Architecture

```mermaid
flowchart LR
    CLIENT["User or API Client"]:::client
    BROWSER["Browser<br/>redirect"]:::client
    CDN["CDN edge<br/>Cloudflare CloudFront Fastly"]:::edge
    GW["API Gateway"]:::edge

    WS["Write Service"]:::service
    RS["Redirect Service"]:::service
    IDG["Snowflake ID Gen"]:::service
    SP["Stream Processor<br/>Flink"]:::service
    STATS["Stats API"]:::service

    BF[("Bloom Filter")]:::data
    REDIS[("Regional Redis")]:::data
    KV[("Global KV<br/>DynamoDB Cassandra or Spanner")]:::data
    CH[("Serving store<br/>ClickHouse or Pinot")]:::data
    S3[("Object storage<br/>S3 or GCS")]:::data

    K["Event bus<br/>Kafka or Kinesis"]:::async

    CLIENT --> GW
    GW --> WS
    WS --> IDG
    WS --> KV

    BROWSER --> CDN
    CDN --> RS
    RS --> BF
    RS --> REDIS
    RS --> KV
    RS --> K

    K --> SP
    K --> S3
    SP --> CH

    CLIENT --> STATS
    STATS --> CH

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef edge fill:#42A5F5,stroke:#0D47A1,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef async fill:#AB47BC,stroke:#4A148C,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
```

That's the design. Five deep dives each picking the right primitive: Snowflake for collision-free distributed ID generation, a CDN-Redis-KV tiered cache for global low-latency reads, local caches with request coalescing to absorb viral spikes, Kafka-to-Flink-to-ClickHouse for analytics that never touches the hot path, and a globally-replicated KV store to eliminate regional bottlenecks. Read-heavy, latency-sensitive, and deceptively simple — the fun is in making it feel trivial at any scale.


---
## Related Designs
- [Rate Limiter](/RateLimiter) — protecting high-QPS endpoints
- [Leaderboard](/Leaderboard) — Redis-based caching patterns
- [Stock Broker](/StockBroker) — idempotency keys for write operations
