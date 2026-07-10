---
permalink: /concepts/
layout: default
title: "System Design Fundamentals - CAP, Caching, Sharding, Queues"
description: "Core system design concepts: CAP theorem, load balancing, caching, sharding, message queues, and more. Everything you need before diving into HLD problems."
---

# System Design Fundamentals

> 📖 **Part of the [System Design Interview Guide](/system-design-interview-guide).** This page covers the building blocks. Once you're comfortable here, move to [The 45-Min Interview Framework →](/approach)

Everything you need to know before tackling specific HLD problems. These are the building blocks every design uses.

---

## System Design Concepts — Learning Tracker

Track your progress through all 42 fundamentals. Sign in to save across devices.

### Core Infrastructure

| # | Concept | Deep Dive |
|---|---|---|
| 1 | Scalability (Vertical vs Horizontal) | [Read →](/concepts/scalability/) |
| 2 | Load Balancing (Round Robin, L4 vs L7) | [Read →](/concepts/load-balancing/) |
| 3 | CDN (Pull vs Push, Cache Invalidation) | [Read →](/concepts/cdn/) |
| 4 | Proxy (Forward vs Reverse) | [Read →](/concepts/proxy/) |
| 5 | API Gateway (Routing, Auth, Rate Limiting) | [Read →](/concepts/api-gateway/) |
| 6 | Connection Pooling (HikariCP, PgBouncer) | [Read →](/concepts/connection-pooling/) |

### Data & Storage

| # | Concept | Deep Dive |
|---|---|---|
| 7 | Database Indexing (B-Tree, Composite) | [Read →](/concepts/database-indexing/) |
| 8 | Database Sharding (Hash, Range, Geo) | [Read →](/concepts/database-sharding/) |
| 9 | Database Replication (Primary-Replica, Quorum) | [Read →](/concepts/database-replication/) |
| 10 | DB Query Complexity (Postgres, DynamoDB, Redis) | [Read →](/concepts/db-query-complexity/) |
| 11 | Object Storage (S3, Presigned URLs) | [Read →](/concepts/object-storage/) |
| 12 | Write-Ahead Log (Crash Recovery, Kafka) | [Read →](/concepts/write-ahead-log/) |

### Caching & Performance

| # | Concept | Deep Dive |
|---|---|---|
| 13 | Caching (Cache-Aside, Stampede, Eviction) | [Read →](/concepts/caching/) |
| 14 | Rate Limiting (Token Bucket, Sliding Window) | [Read →](/concepts/rate-limiting/) |
| 15 | Bloom Filters (Probabilistic, False Positives) | [Read →](/concepts/bloom-filters/) |

### Communication & Messaging

| # | Concept | Deep Dive |
|---|---|---|
| 16 | Message Queues (Kafka vs SQS vs RabbitMQ) | [Read →](/concepts/message-queues/) |
| 17 | WebSocket vs SSE vs Polling | [Read →](/concepts/websockets/) |
| 18 | Fan-Out Patterns (On Write vs On Read) | [Read →](/concepts/fan-out/) |
| 19 | Dead Letter Queue (Poison Messages, Retry) | [Read →](/concepts/dead-letter-queue/) |

### Distributed Systems

| # | Concept | Deep Dive |
|---|---|---|
| 20 | CAP Theorem (CP vs AP, PACELC) | [Read →](/concepts/cap-theorem/) |
| 21 | Consistency Models (Strong, Eventual, Causal) | [Read →](/concepts/consistency-models/) |
| 22 | Consistent Hashing (Hash Ring, Virtual Nodes) | [Read →](/concepts/consistent-hashing/) |
| 23 | Leader Election (Raft, ZooKeeper, Split-Brain) | [Read →](/concepts/leader-election/) |
| 24 | Vector Clocks (Causality, Conflict Detection) | [Read →](/concepts/vector-clocks/) |
| 25 | Merkle Trees (Data Integrity, Anti-Entropy) | [Read →](/concepts/merkle-trees/) |
| 26 | Fencing Tokens (Stale Lock Prevention) | [Read →](/concepts/fencing-tokens/) |

### Patterns & Architecture

| # | Concept | Deep Dive |
|---|---|---|
| 27 | Event Sourcing & CQRS | [Read →](/concepts/event-sourcing/) |
| 28 | Saga Pattern (Choreography vs Orchestration) | [Read →](/concepts/saga-pattern/) |
| 29 | Outbox Pattern (Reliable Event Publishing) | [Read →](/concepts/outbox-pattern/) |
| 30 | Circuit Breaker (Fail Fast, Fallback) | [Read →](/concepts/circuit-breaker/) |
| 31 | Idempotency (Keys, Duplicate Prevention) | [Read →](/concepts/idempotency/) |
| 32 | Retry & Exponential Backoff (Jitter) | [Read →](/concepts/retry-backoff/) |
| 33 | Durable Execution (Temporal, Step Functions) | [Read →](/concepts/durable-execution/) |

### Architecture Decisions

| # | Concept | Deep Dive |
|---|---|---|
| 34 | Microservices vs Monolith | [Read →](/concepts/microservices/) |
| 35 | Batch vs Stream Processing | [Read →](/concepts/batch-vs-stream/) |
| 36 | API Design (REST, GraphQL, gRPC) | [Read →](/concepts/api-design/) |
| 37 | Service Discovery (DNS, Consul, K8s) | [Read →](/concepts/service-discovery/) |

### Security & Auth

| # | Concept | Deep Dive |
|---|---|---|
| 38 | Authentication (JWT, Sessions, OAuth 2.0) | [Read →](/concepts/authentication/) |

### Other Essentials

| # | Concept | Deep Dive |
|---|---|---|
| 39 | Back-of-Envelope Estimation | [Read →](/concepts/back-of-envelope/) |
| 40 | Heartbeat & Health Checks (Liveness, Readiness) | [Read →](/concepts/heartbeat/) |
| 41 | Geospatial Indexing (Geohash, H3, Redis Geo) | [Read →](/concepts/geospatial/) |
| 42 | Distributed Locking (Redis, DynamoDB, ZK) | [Read →](/concepts/distributed-locking/) |

---

> The summaries below serve as a quick reference. Click "Read →" on any topic above for the full deep dive with diagrams, code, and interview questions.

---

## Scalability

**Vertical scaling (scale up):** Add more CPU/RAM to one machine. Simple but has a ceiling.

**Horizontal scaling (scale out):** Add more machines. Harder (state management, coordination) but practically unlimited.

| | Vertical | Horizontal |
|---|---|---|
| Cost | Expensive hardware | Cheap commodity servers |
| Limit | Hardware ceiling | Practically unlimited |
| Complexity | Low | High (distributed state) |
| Downtime | Requires restart | Zero-downtime rolling |
| When to use | DB primary, cache | Stateless services, web tier |

---

## Load Balancing

Distributes traffic across multiple servers so no single server gets overloaded.

**Where it sits:**
```
Client → Load Balancer → Server 1
                       → Server 2
                       → Server 3
```

**Algorithms:**

| Algorithm | How it works | Best for |
|---|---|---|
| Round Robin | Rotate through servers 1→2→3→1→... | Equal-capacity servers |
| Weighted Round Robin | More traffic to stronger servers | Mixed hardware |
| Least Connections | Send to server with fewest active requests | Long-lived connections |
| IP Hash | Same client always hits same server | Session stickiness |
| Random | Pick randomly | Simple, surprisingly effective |

**L4 vs L7:**
- **L4 (Transport):** Routes based on IP/port. Fast, no content inspection. (e.g., AWS NLB)
- **L7 (Application):** Routes based on URL, headers, cookies. Smarter, slightly slower. (e.g., AWS ALB, Nginx)

> ⚠️ **Common mistake:** Proposing a load balancer without explaining WHAT it's balancing. Always specify: "L7 load balancer routing to 5 stateless API servers." Also, don't forget - if you're using WebSockets, you need sticky sessions or L4 balancing because the connection is stateful.

---

## Caching

Store frequently accessed data closer to the consumer. Trades freshness for speed.

**Where to cache:**

```
Client → CDN → API Gateway Cache → Application Cache → Database
         ↑         ↑                      ↑
     static     response-level       object-level
     assets     (full response)      (query results)
```

**Cache strategies:**

| Strategy | How | Best for |
|---|---|---|
| Cache-Aside | App checks cache, misses → read DB → write cache | General purpose, most common |
| Write-Through | Write to cache + DB together | Strong consistency needs |
| Write-Behind | Write to cache, async flush to DB later | High write throughput |
| Read-Through | Cache itself fetches from DB on miss | Simpler app code |

**Cache eviction policies:**
- **LRU** (Least Recently Used) - evict what hasn't been touched longest. Most common.
- **LFU** (Least Frequently Used) - evict what's been used least overall.
- **TTL** (Time To Live) - expire after N seconds regardless of access.

**Cache invalidation** (the hard problem):
- TTL-based: simple but stale window exists
- Event-based: DB change → invalidate cache entry. Consistent but complex.
- Versioning: key includes version number. New version = cache miss.

**Tools:** Redis, Memcached, CDN (CloudFront, Cloudflare), local in-process (Caffeine, Guava)

> ⚠️ **Common mistake:** Caching everything. Only cache data that's read frequently AND doesn't change often. If you're caching data that changes every request, you're adding latency and complexity for no benefit. Also watch for **cache stampede** - when a popular key expires and 1000 requests simultaneously hit the DB to rebuild it. Solutions: locking (only one request rebuilds), early refresh (rebuild before TTL expires), or jittered TTLs.

---

## Database Concepts

### SQL vs NoSQL

| | SQL (Postgres, MySQL) | NoSQL (DynamoDB, Cassandra, MongoDB) |
|---|---|---|
| Schema | Fixed, enforced | Flexible, schema-on-read |
| Relationships | Joins, foreign keys | Denormalized, no joins |
| Scale | Vertical (hard to shard) | Horizontal (built for it) |
| Consistency | Strong (ACID) | Tunable (eventual to strong) |
| Best for | Transactions, complex queries | High throughput, simple access patterns |

### Database Replication

**Primary-Replica:** One primary handles writes. Replicas handle reads. Read-heavy workloads scale horizontally.

```
Writes → Primary DB ──replicates──→ Replica 1 (reads)
                                  → Replica 2 (reads)
                                  → Replica 3 (reads)
```

**Replication lag:** Replicas might be a few ms behind primary. If you write then immediately read from a replica, you might not see your write. Solutions: read-your-writes consistency, sticky sessions to primary after write.

### Database Sharding (Partitioning)

Split data across multiple databases by a shard key.

```
User ID 1-1M    → Shard 1
User ID 1M-2M   → Shard 2
User ID 2M-3M   → Shard 3
```

**Shard key choice is critical:**
- Bad key (e.g., country) → one shard gets 80% of data (hot shard)
- Good key (e.g., user_id hash) → even distribution

**Problems with sharding:**
- Cross-shard queries are expensive
- Resharding (adding shards) is painful
- Transactions across shards are very hard

> ⚠️ **Common mistake:** Proposing sharding too early. A single well-tuned Postgres with read replicas handles 50K+ TPS and multiple TB. Don't shard until the math proves you need it. Also, always state your shard key and the tradeoff: "Shard by user_id - fast for user-scoped queries, expensive for global aggregations."

---

## CAP Theorem

In a distributed system, you can only guarantee 2 of 3:

- **C (Consistency):** Every read sees the latest write
- **A (Availability):** Every request gets a response (might be stale)
- **P (Partition Tolerance):** System works despite network splits

**In practice:** Network partitions WILL happen. So you choose between:
- **CP:** Consistent + Partition-tolerant. During partition, some requests fail. (e.g., ZooKeeper, HBase)
- **AP:** Available + Partition-tolerant. During partition, you might read stale data. (e.g., Cassandra, DynamoDB)

Most systems are AP with tunable consistency - you choose per-operation whether you need strong or eventual consistency.

> ⚠️ **Interview tip:** Don't pick CP or AP for your entire system. Different parts need different guarantees. "Product catalog is AP (eventual consistency fine), but inventory count is CP (can't oversell)." That shows mature thinking.

---

## Consistency Models

| Model | Guarantee | Example |
|---|---|---|
| Strong | Read always sees latest write | Single-node DB, ZooKeeper |
| Eventual | Read will eventually see latest write | DynamoDB (default), Cassandra |
| Read-your-writes | YOU see your own writes immediately; others might not | Social media feeds |
| Causal | If A caused B, everyone sees A before B | Chat messages |

---

## Message Queues

Decouple producers from consumers. Enable async processing.

```
Producer → Queue → Consumer
           ↑
     (buffer, retry, ordering)
```

**Why use queues:**
- Producer doesn't wait for consumer (async)
- Consumer can be offline; messages wait
- Spike absorption (queue buffers during bursts)
- Retry on failure (message stays until acked)

**Delivery guarantees:**
- **At-most-once:** Fire and forget. Message might be lost. Fast.
- **At-least-once:** Retry until acked. Message might be delivered twice. Most common.
- **Exactly-once:** Hard to achieve. Usually "at-least-once + idempotent consumer."

**Tools:** Kafka (log-based, ordered, high throughput), SQS (simple queue, managed), RabbitMQ (routing, priority)

**Kafka vs SQS:**

| | Kafka | SQS |
|---|---|---|
| Ordering | Per-partition guaranteed | FIFO queue or best-effort |
| Retention | Days/weeks (replay possible) | 14 days max, once consumed gone |
| Throughput | Millions/sec | Thousands/sec |
| Consumer model | Pull (consumer controls pace) | Pull (long-polling) |
| Use case | Event streaming, log aggregation | Task queues, decoupling |

> ⚠️ **Common mistake:** Using Kafka when SQS would suffice. If you just need "process this job later" with no ordering requirement and < 10K msgs/sec, SQS is simpler and cheaper. Kafka shines when you need ordering, replay, or millions of events/sec. Also - saying "put it in a queue" without specifying what the consumer does is hand-waving. Always say: "Consumer X reads from the queue and does Y."

---

## API Design

### REST

```
GET    /users/123       → fetch user
POST   /users           → create user
PUT    /users/123       → replace user
PATCH  /users/123       → partial update
DELETE /users/123       → delete user
```

**Key principles:**
- Stateless (no server-side session)
- Resource-based URLs (nouns, not verbs)
- HTTP verbs for actions
- Proper status codes (200, 201, 400, 404, 500)

### Rate Limiting

Protect services from abuse or thundering herds.

**Algorithms:**
- **Token Bucket:** Bucket fills at constant rate. Each request takes a token. Empty = rejected.
- **Sliding Window:** Count requests in last N seconds. Exceed limit = rejected.
- **Fixed Window:** Count per time window (e.g., per minute). Simpler but bursty at boundaries.

---

## Authentication - JWT and Sessions

Almost every system design includes "auth via JWT" in the API section. Here's what that means and when to use which approach.

**Session-based auth (traditional):**

```
Client logs in → Server creates a session (stored in Redis/DB) → returns session ID as a cookie
Client sends cookie on every request → Server looks up session → "yes, this is user 42"
```

- Server stores state (session data in Redis)
- Easy to invalidate (delete the session)
- Requires centralized session store (all servers must access it)

**JWT (JSON Web Token) - stateless auth:**

```
Client logs in → Server creates a signed token containing {userId: 42, exp: ...} → returns token
Client sends token in every request header → Server verifies the signature → "yes, this is user 42"
```

A JWT is a self-contained token with three parts:
```
header.payload.signature

Header:  { "alg": "HS256" }
Payload: { "userId": 42, "role": "admin", "exp": 1719500000 }
Signature: HMAC-SHA256(header + payload, SECRET_KEY)
```

- Server does NOT store anything - just verifies the signature is valid
- Scales horizontally (any server can verify without hitting a DB)
- Hard to invalidate (token is valid until it expires, unless you maintain a blocklist)

**When to use which:**

| | JWT | Sessions |
|---|---|---|
| Scale | Scales horizontally (no shared state) | Needs centralized session store |
| Invalidation | Hard (wait for expiry or maintain blocklist) | Easy (delete from Redis) |
| Payload | Can carry user data (role, permissions) | Just an opaque ID |
| Best for | Microservices, APIs, service-to-service | Monoliths, web apps with logout needs |

**In system design interviews, default to JWT** because it's stateless and doesn't require a session store. But mention the trade-off: "JWT can't be revoked instantly - for sensitive operations like password change, we'd use a short-lived access token (15 min) + a long-lived refresh token stored server-side."

**Access + Refresh Token pattern (what most production systems use):**

```
Login → get access token (15 min TTL) + refresh token (7 days, stored in DB)
Every API call → send access token (verified locally, no DB hit)
Access token expires → call /refresh with refresh token → get new access token
Logout → delete refresh token from DB (access token expires naturally in 15 min)
```

This gives you the scalability of JWT (no DB hit per request) with the revocability of sessions (delete refresh token = user is logged out within 15 min).

> Interview tip: When asked "how do you handle auth?" say: "Short-lived JWT access token verified at the gateway, refresh token stored server-side for revocation. The gateway validates the signature without hitting a DB on every request." That shows you understand both scalability and security.

---

## CDN (Content Delivery Network)

Cache static content at edge locations close to users.

```
User in India → CDN edge in Mumbai (cache hit) → fast!
                  ↓ (cache miss)
              Origin server in US → slow, but CDN caches for next time
```

**What to put on CDN:** Images, CSS, JS, videos, static HTML, API responses (with TTL)

**Tools:** CloudFront, Cloudflare, Fastly, Akamai

---

## Consistent Hashing

Problem: you have N cache servers. `hash(key) % N` works until you add/remove a server - then ALL keys remap.

**Consistent hashing:** Only K/N keys remap when a server is added/removed.

How: place servers on a ring (0 to 2^32). Hash the key → walk clockwise → first server you hit owns that key. Adding a server only steals keys from its clockwise neighbor.

**Used in:** DynamoDB, Cassandra, Redis Cluster, load balancers

---

## Idempotency

An operation is idempotent if doing it 1 time or N times produces the same result.

**Why it matters:** In distributed systems, retries happen. If "charge $10" is retried, you don't want to charge $20.

**How to achieve:**
- Client sends a unique `idempotency-key` with each request
- Server checks: "did I already process this key?" → yes: return cached result, no: process and store result
- Key stored with TTL (e.g., 24h)

**Examples:**
- `PUT /users/123 {name: "Alice"}` → naturally idempotent (same result every time)
- `POST /payments {amount: 100, idempotency_key: "abc"}` → made idempotent via key

---

## Heartbeat & Health Checks

How distributed systems detect dead nodes.

- **Heartbeat:** Node periodically sends "I'm alive" signal. No heartbeat for N seconds → considered dead.
- **Health check:** Load balancer pings `/health` endpoint. Non-200 → remove from rotation.

**Failure detection trade-off:**
- Aggressive (short timeout): detect failures fast, but false positives during GC pauses or network blips
- Conservative (long timeout): fewer false positives, but slow to detect real failures

---

## Leader Election

When multiple nodes exist, sometimes one must be the "leader" (coordinates work, makes decisions).

**Algorithms:** ZooKeeper (ephemeral nodes), Raft (consensus), Bully algorithm

**Why needed:**
- Only one node should run a cron job (avoid duplicates)
- Only one node writes to a resource (avoid conflicts)
- Shard assignment coordination

---

## Back-of-Envelope Estimation

Quick math to validate design decisions.

**Key numbers to memorize:**

| Operation | Time |
|---|---|
| L1 cache read | 1 ns |
| RAM read | 100 ns |
| SSD read | 100 μs |
| HDD seek | 10 ms |
| Network round-trip (same DC) | 0.5 ms |
| Network round-trip (cross-continent) | 150 ms |

**Data size rules:**
- 1 char = 1 byte (ASCII) or 2 bytes (Unicode)
- 1 KB = 1000 chars
- 1 million rows × 1 KB each = 1 GB
- 1 billion rows × 1 KB each = 1 TB

**Traffic rules:**
- 1 million DAU × 10 requests/user/day = 10M requests/day
- 10M requests/day ÷ 86400 = ~115 QPS average
- Peak = 2-5× average → ~230-575 QPS peak

---

## Database Indexing

Without an index, finding a user by email means scanning every row. With 10M users, that's 10M rows checked. With an index, it's milliseconds.

**Types of indexes:**

| Index Type | How | Best For |
|---|---|---|
| **B-tree** (default) | Sorted tree structure | Exact lookups + range queries (dates, IDs) |
| **Hash** | Direct hash → position | Exact match only, faster than B-tree for equality |
| **Full-text** | Inverted index of words | Text search ("find all posts mentioning 'Redis'") |
| **Geospatial** (R-tree, GiST) | Spatial partitioning | "Restaurants within 5km" |
| **Composite** | Multiple columns sorted together | Queries filtering on city AND date |

**When to create an index:**
- Fields you query frequently (user_id, email, created_at)
- Fields in WHERE, ORDER BY, or JOIN conditions
- Foreign keys

**When NOT to index:**
- Columns with very low cardinality (boolean flags)
- Tables with heavy writes and few reads (indexes slow down inserts)

**External search indexes (Elasticsearch, Typesense):** When your queries go beyond what your primary DB supports (full-text search, fuzzy matching, faceted filters), sync data via CDC (Change Data Capture) to a dedicated search engine. The search index lags slightly but enables queries your main DB can't handle efficiently.

> ⚠️ **Interview tip:** If the problem has text search ("search for restaurants by name"), you NEED a search index. Don't say "just use LIKE '%biryani%' in SQL" - that's a full table scan. Say "we'll use Elasticsearch synced from the primary DB via CDC, accepting 1-2 second staleness on the search index."

---

## Database Query Complexity (What Interviewers Actually Ask)

In HLD interviews, you'll be asked "how will you query this data?" Here's what operations cost in the two most common databases.

### Postgres (SQL) — Query Time Complexity

| Operation | Without Index | With B-Tree Index | Example |
|---|---|---|---|
| Find by primary key | O(n) | **O(log n)** | `WHERE id = 123` |
| Find by any column | O(n) full scan | **O(log n)** if indexed | `WHERE email = 'x@y.com'` |
| Range query | O(n) | **O(log n + k)** (k = results) | `WHERE age BETWEEN 20 AND 30` |
| Sort (ORDER BY) | O(n log n) | **O(n)** if index matches sort | `ORDER BY created_at DESC` |
| Filter + Sort | O(n log n) | **O(log n + k)** with composite index | `WHERE status='active' ORDER BY date` |
| COUNT(*) | O(n) | O(n) even with index | `SELECT COUNT(*) FROM users` |
| JOIN | O(n x m) nested loop | **O(n + m)** with indexes on join keys | `users JOIN orders ON user_id` |
| LIKE 'abc%' | O(n) | **O(log n)** prefix uses index | `WHERE name LIKE 'Sha%'` |
| LIKE '%abc%' | O(n) | O(n) can't use index | `WHERE name LIKE '%kumar%'` |

**How B-Tree works (mental model):**
```
Without index: flip through every page to find "Kumar" → O(n)
With B-Tree: sorted tree → jump to "K" section → O(log n)

         [M]
        /   \
     [D,H]   [R,W]
    / | \    / | \
  [A-C][E-G][I-L][N-Q][S-V][X-Z]

Lookup: O(log n) — traverse tree depth
Range: O(log n) to find start, then scan leaves sequentially
```

**Composite Index Rule:**

Index on `(status, created_at)` helps queries on:
- `WHERE status = 'X'` ✓
- `WHERE status = 'X' ORDER BY created_at` ✓
- `WHERE created_at > '2025-01-01'` ✗ (wrong column order, falls back to scan)

Rule: composite index works left-to-right only.

### DynamoDB (NoSQL) — Query Time Complexity

| Operation | Complexity | Example |
|---|---|---|
| GetItem (PK + SK) | **O(1)** | `PK=user_123, SK=order_456` |
| Query (PK + sort key range) | **O(1) + O(k)** | `PK=user_123, SK between '2025-01' and '2025-06'` |
| Query with filter expression | O(all items in partition) | `PK=user_123, filter: status='active'` (reads all, filters after) |
| Scan (full table) | **O(N)** entire table | Avoid in production |
| Query on GSI | **O(1) + O(k)** | GSI PK=status, SK=created_at |

**Key concept:** DynamoDB partition key = O(1) hash lookup to find the right partition. Sort key = sequential scan within that partition.

**What DynamoDB can NOT do efficiently:**

| You want | Problem | Solution |
|---|---|---|
| Filter by non-key attribute | Scans entire partition | Add a GSI |
| Sort by non-sort-key column | Not possible | GSI with desired sort key |
| Query across all users | Full table scan O(N) | GSI with that column as PK |
| JOINs | Not supported | Denormalize or app-side |
| Aggregation (SUM, COUNT) | Not supported | Streams → Lambda → aggregate |
| Full-text search | Not supported | Sync to Elasticsearch |

**GSI (Global Secondary Index):**

```
Base table: PK = userId, SK = orderId
GSI:        PK = status, SK = createdAt

Query: "All PENDING orders sorted by date"
  Without GSI → Scan entire table O(N)
  With GSI → Query PK='PENDING' → O(1) + O(k)
```

### Redis — Time Complexity

| Operation | Complexity | Use Case |
|---|---|---|
| GET / SET | **O(1)** | Cache lookup |
| HGET / HSET | **O(1)** | Hash field access |
| ZADD / ZRANGEBYSCORE | **O(log n)** | Leaderboards, rate limiting |
| LPUSH / RPOP | **O(1)** | Queue |
| LINDEX (access by index) | **O(n)** | Avoid for large lists |
| SMEMBERS | **O(n)** | Get all set members |
| GEORADIUS | **O(n + log n)** | Nearby search |

### Quick Decision Framework (What to Say in Interview)

| Access Pattern | Best DB | Why |
|---|---|---|
| "Get user by ID" | Any (PK lookup) | O(1) DynamoDB, O(log n) Postgres |
| "Get all orders for a user, sorted by date" | DynamoDB (PK=userId, SK=date) or Postgres (indexed) | Both efficient |
| "Find all active users" | Postgres (indexed) or DynamoDB GSI | Needs index either way |
| "Search by name substring" | Elasticsearch | Neither Postgres nor DDB handles this well |
| "Top 100 by score" | Redis Sorted Set | O(log n) insert, O(log n + k) range |
| "Count of orders per day" | Postgres | DDB can't aggregate natively |
| "Real-time leaderboard" | Redis ZSET | O(log n) updates, O(log n + k) reads |

> ⚠️ **Interview tip:** When interviewer asks "how will you query X?" — first identify if it's a key-based lookup or a filter/sort. Key lookups are cheap everywhere. Filters on non-indexed columns are always O(n). The answer is almost always: "add an index" (Postgres) or "create a GSI" (DynamoDB).

---

## Real-Time Communication (WebSocket vs SSE vs Polling)

When your system needs to push data to clients (chat messages, live tracking, notifications), you have three options:

| Method | Direction | When to use | Example |
|---|---|---|---|
| **Polling** | Client → Server (repeated) | Simple, low-frequency updates | Email inbox check every 30s |
| **Long Polling** | Client holds connection, server responds when ready | Moderate real-time, simple infra | Facebook's original chat |
| **SSE (Server-Sent Events)** | Server → Client (one-way) | Server pushes, client only receives | Live scores, stock tickers |
| **WebSocket** | Bidirectional | Both sides send freely | Chat, collaborative editing, live games |

**Decision rule:**
- Need only server → client? → **SSE** (simpler, works with HTTP infra)
- Need client → server too? → **WebSocket**
- Can tolerate 5-30s delay? → **Long polling** (simplest)

**WebSocket challenges at scale:**
- Stateful connections - can't just load-balance randomly
- If a server dies, thousands of connections drop (need reconnect logic)
- 1M concurrent connections = 100K per server × 10 servers (memory-bound)

> ⚠️ **Common mistake:** Proposing WebSockets when SSE or even long-polling would work. WebSockets add complexity (stateful connections, sticky routing, reconnect handling). Only use them when the CLIENT needs to push data to the server frequently (chat, collaborative editing). For server-only pushes (live scores, tracking), SSE is simpler and works with standard HTTP infrastructure.

---

## Data Modeling: Normalization vs Denormalization

**Normalization:** Split data across tables to avoid duplication. One source of truth per entity.

```
users: { id, name, email }
orders: { id, user_id, product_id, amount }  ← references user by ID
products: { id, name, price }
```

- ✅ Easy updates (change name once, updated everywhere)
- ❌ Requires joins for complete data (slower reads)

**Denormalization:** Duplicate data to avoid joins. Optimize for read speed.

```
orders: { id, user_id, user_name, product_name, amount }  ← copies user_name into order
```

- ✅ Fast reads (no joins needed)
- ❌ Hard updates (user changes name → update everywhere it's copied)

**When to denormalize:**
- Read-heavy systems (100:1 read-write ratio)
- Data rarely changes (product catalog, historical events)
- Need sub-10ms reads (feeds, dashboards)

**Safe default:** Start normalized. Denormalize specific hot paths when you identify read bottlenecks.

---

## Event Sourcing & CQRS

Used in: [Stock Broker](/hld/StockBroker), [Digital Wallet](/hld/DigitalWallet)

**Event Sourcing:** Instead of storing current state, store every event that happened. Current state = replay all events.

```
Event 1: OrderPlaced { orderId: 123, amount: 500 }
Event 2: PaymentReceived { orderId: 123, amount: 500 }
Event 3: OrderShipped { orderId: 123, trackingId: "ABC" }

Current state of order 123 = SHIPPED (derived from replaying events)
```

**Why:** Complete audit trail, time-travel debugging, easy to add new read models retroactively.

**CQRS (Command Query Responsibility Segregation):** Separate the write path from the read path.

- **Write side:** Accepts commands, validates, stores events
- **Read side:** Materialized views optimized for queries, updated asynchronously from events

**When to use:**
- Financial systems (every transaction must be auditable)
- Systems where read and write patterns are dramatically different
- When you need multiple read models from the same data

**When NOT to use:** Simple CRUD apps. The complexity tax is high.

> ⚠️ **Interview tip:** Only propose event sourcing for financial or audit-heavy systems. For a URL shortener or chat app, it's overkill. Say: "We use event sourcing here because every transaction needs a complete audit trail and we need multiple read models (portfolio view, tax report, P&L dashboard) from the same data."

---

## Saga Pattern

Used in: [Digital Wallet](/hld/DigitalWallet), [BookMyShow](/hld/BookMyShow)

A saga coordinates a multi-step distributed transaction where each step has a **compensating action** (undo).

**Example - booking a trip:**

```
Step 1: Reserve hotel → Compensate: Cancel hotel
Step 2: Book flight → Compensate: Cancel flight
Step 3: Charge card → Compensate: Refund card
```

If Step 3 fails, run compensations in reverse: cancel flight, cancel hotel.

**Two approaches:**

| Orchestration | Choreography |
|---|---|
| Central orchestrator coordinates all steps | Each service listens to events and reacts |
| Easier to reason about, single point of control | No single point of failure, but harder to trace |
| Better for complex flows (5+ steps) | Better for simple flows (2-3 steps) |

**Key principle:** Each step must be idempotent (safe to retry) and have a defined compensation.

---

## Geospatial Indexing

Used in: [Uber](/hld/Uber), [Zomato](/hld/Zomato)

When you need "find things near this location" - restaurants within 3km, drivers within 5 minutes, friends nearby.

| Approach | How | Used By |
|---|---|---|
| **Geohash** | Encode lat/lng into a string. Nearby points share prefix. | Elasticsearch, general |
| **Redis Geo (GEOADD/GEORADIUS)** | In-memory sorted set with geohash encoding | Uber, Grab, delivery apps |
| **PostGIS** | Postgres extension with R-tree spatial index | Low-write-volume geo queries |
| **H3 (Hexagonal grid)** | Uniform-area hexagons, hierarchical resolution | Uber surge pricing, analytics |
| **S2 Geometry** | Hilbert curve cells, used by Google | Google Maps, multi-level precision |

**Decision rule:**
- Need 500K+ writes/sec (live driver pings)? → **Redis Geo** (in-memory, fast)
- Need complex queries (text + geo + filters)? → **Elasticsearch** with geo_point
- Low volume, existing Postgres? → **PostGIS**
- Need uniform spatial analysis (surge zones)? → **H3**

---

## Bloom Filters

Used in: [Key-Value Store](/hld/KeyValueStore)

A space-efficient probabilistic structure that tells you: "definitely NOT here" or "MAYBE here."

**Why it matters:** Before reading a 100MB file on disk to check if a key exists, ask the bloom filter first (1μs). If it says "not here," skip the disk read entirely. Saves enormous I/O.

**Properties:**
- False positives possible (says "maybe" but key isn't there)
- False negatives impossible (if it says "not here," it's definitely not there)
- Cannot delete entries (use counting bloom filters for that)

**Used in:** LSM-tree databases (LevelDB, RocksDB, Cassandra), CDN cache lookups, spell checkers, duplicate detection.

---

## Write-Ahead Log (WAL)

Used in: [Key-Value Store](/hld/KeyValueStore), any database

Before applying a change to an in-memory data structure, first write it to a sequential log on disk.

**Why:** If the process crashes before the change is flushed to the main data file, the WAL can be replayed on restart to recover the lost data. Zero data loss.

**The pattern:**
1. Write operation arrives
2. Append to WAL (sequential disk write - fast)
3. Apply to in-memory structure (memtable, buffer pool)
4. Eventually flush in-memory changes to disk
5. Truncate WAL up to the flushed point

Every database uses this: Postgres, MySQL, Redis (AOF), Kafka (the log IS the database).

---

## Fan-Out Patterns

Used in: [Twitter Feed](/hld/TwitterFeed), [Instagram](/hld/Instagram), [Notification System](/hld/NotificationSystem)

**Fan-out = one event → many recipients.**

| Pattern | When | How |
|---|---|---|
| **Fan-out on Write (push)** | Recipient count is small-medium (< 10K) | On event, push to all recipients' caches immediately |
| **Fan-out on Read (pull)** | Recipient count is huge (celebrities, 50M followers) | Do nothing on event; assemble at read time |
| **Hybrid** | Mixed audience (most users small, some huge) | Push for normal users, pull for celebrities |

**The decision threshold:** If pushing takes > 5 seconds (too many recipients), switch to pull for that sender.

---

## Merkle Trees

Used in: [Key-Value Store](/hld/KeyValueStore)

A Merkle tree is a hash tree used to efficiently detect differences between two copies of data. Instead of comparing every key one by one (O(N)), you compare hashes at each tree level (O(log N)).

**How it works:**

```
         Root Hash (abc...)
        /                  \
   Hash(left)          Hash(right)
   /       \           /        \
Hash(K1) Hash(K2)  Hash(K3)  Hash(K4)
  |         |        |          |
 K1        K2       K3         K4
```

1. Each leaf is the hash of one key-value pair
2. Each internal node is the hash of its children
3. The root hash represents ALL data on the node

**To find which keys diverged between two replicas:**
1. Compare root hashes. Different? → go deeper.
2. Compare left and right children. Left matches, right doesn't? → only check the right subtree.
3. Recurse until you find the exact leaves that differ.

**Why it matters:** After a node failure and recovery, you need to sync it with a healthy replica. Without Merkle trees, you'd transfer ALL keys to check which are stale. With Merkle trees, you only transfer the specific keys that actually diverged - saving enormous bandwidth.

**Used by:** Cassandra (anti-entropy repair), DynamoDB, Git (internal object storage), IPFS, Ethereum.

---

## Vector Clocks

Used in: [Key-Value Store](/hld/KeyValueStore)

A vector clock tracks **causality** between events in a distributed system. It tells you: "did event A happen before event B, or were they concurrent?"

**The problem:** In a distributed system with no global clock, two replicas can independently write to the same key. When they sync, which write is "newer"? Wall-clock timestamps are unreliable (clock skew), so we need a logical clock.

**How it works:**

Each node maintains a vector (array) of counters, one per node:

```
Node A writes: [A:1, B:0, C:0]
Node B writes: [A:0, B:1, C:0]

These are CONCURRENT - neither happened before the other.

Node A reads B's write and writes again: [A:2, B:1, C:0]
This HAPPENED AFTER B's write (A:2 > A:1 AND B:1 >= B:1).
```

**Comparison rules:**
- V1 < V2 (V1 happened before V2) if ALL elements of V1 ≤ V2 and at least one is strictly less
- V1 || V2 (concurrent) if neither V1 < V2 nor V2 < V1

**What to do with conflicts:**
- **Last-writer-wins (LWW):** Pick one arbitrarily. Simple but loses data.
- **Return both to client:** Let the application merge (DynamoDB's "sibling resolution").
- **CRDT auto-merge:** Use a data structure designed to merge without conflict (counters, sets).

> ⚠️ **Interview tip:** Most systems use LWW for simplicity. Mention vector clocks to show depth, but say "for our use case, LWW with a version counter is sufficient - vector clocks add complexity we don't need unless we have multi-master writes."

---

## Fencing Tokens

Used in: [Uber](/hld/Uber), [BookMyShow](/hld/BookMyShow), [Job Scheduler](/hld/JobScheduler)

A fencing token prevents **stale processes** from corrupting data after their lock has expired.

**The problem:** Process A acquires a distributed lock (TTL = 30s). Process A pauses (GC, network delay) for 35 seconds. Lock expires. Process B acquires the same lock. Now Process A wakes up, thinks it still holds the lock, and writes - corrupting Process B's work.

**The solution:** Every lock acquisition returns a monotonically increasing **fencing token** (a number). Any downstream write must include the token. The resource rejects writes with a token older than the latest one it's seen.

```
Process A gets lock → token = 33
Process A pauses...
Lock expires. Process B gets lock → token = 34
Process A wakes up, tries to write with token 33
Resource sees: 33 < 34 (latest seen) → REJECTED
```

**Where to apply:** Any system where distributed locks protect a shared resource: seat booking, order assignment, job execution.

---

## Outbox Pattern

Used in: [Digital Wallet](/hld/DigitalWallet), [Stock Broker](/hld/StockBroker)

The outbox pattern solves: "how do I update my database AND publish an event atomically?"

**The problem:** You want to save an order to the DB and send an event to Kafka. If the DB write succeeds but Kafka publish fails (or vice versa), your systems are inconsistent.

**The solution:**

1. Write both the business data AND the event to the SAME database transaction (the event goes into an "outbox" table)
2. A separate process (CDC or poller) reads the outbox table and publishes events to Kafka
3. Once published, mark the outbox row as processed

```
BEGIN TRANSACTION
  INSERT INTO orders (...) 
  INSERT INTO outbox (event_type, payload) VALUES ('OrderCreated', '{...}')
COMMIT

-- Separate process (CDC/poller):
-- Reads outbox → publishes to Kafka → marks as sent
```

**Why not just publish to Kafka directly?** Because you can't atomically commit to Postgres AND Kafka in one transaction. The outbox makes it a local DB transaction (atomic), then handles the Kafka publish separately with retries.

**CDC (Change Data Capture)** is the production approach: tools like Debezium watch the database transaction log and stream changes to Kafka automatically. No polling needed.

---

## Durable Execution (Temporal / Cadence)

Used in: [Uber](/hld/Uber), [Zomato](/hld/Zomato), [Job Scheduler](/hld/JobScheduler)

Temporal (formerly Cadence, open-sourced by Uber) is a framework for running **long-lived, multi-step workflows** that survive crashes.

**The problem:** A food delivery dispatch involves: offer to rider → wait for response (15s) → if rejected, try next rider → if accepted, notify customer → track delivery. Any step can fail. If a server crashes mid-workflow, the whole dispatch is lost.

**How Temporal solves it:**

You write workflow code as a normal function. Temporal records every step. If the process crashes, it replays from the last checkpoint - your workflow continues exactly where it left off.

```
// Pseudocode - this survives crashes
function dispatchOrder(orderId) {
  riders = findNearbyRiders(orderId)
  for rider in riders:
    offer = sendOffer(rider, timeout=15s)  // persisted step
    if offer.accepted:
      notifyCustomer(orderId, rider)       // persisted step
      return
  escalateToOps(orderId)
}
```

**When to use:**
- Multi-step processes with human-in-the-loop (rider accepts/declines)
- Workflows with timeouts and retries
- Saga orchestration (each step has a compensation)
- Anything where "a server crash should NOT lose progress"

**When NOT to use:**
- Simple request-response APIs
- Stateless operations
- High-throughput hot paths (Temporal adds latency per step)

> ⚠️ **Interview tip:** Mention Temporal when the interviewer asks "what if the server crashes mid-workflow?" It shows you know production tools. But don't over-engineer - for simple retry logic, a dead-letter queue is enough.

---

## Rate Limiting

Controls how many requests a client can make in a given time window. Used to protect APIs from abuse, prevent DDoS, and enforce fair usage.

### Algorithms

| Algorithm | How it works | Pros | Cons |
|---|---|---|---|
| **Token Bucket** | Bucket fills at fixed rate. Each request removes a token. If empty, reject. | Allows bursts, smooth rate | Slight complexity |
| **Leaky Bucket** | Requests enter a queue that processes at fixed rate. | Perfectly smooth output | No burst tolerance |
| **Fixed Window** | Count requests in fixed time windows (e.g., per minute). | Simple | Burst at window edges (2x in 1 sec) |
| **Sliding Window Log** | Store timestamp of each request. Count within last N seconds. | Exact | Memory-heavy (stores every timestamp) |
| **Sliding Window Counter** | Combine current + previous window with time-weighted average. | Low memory, ~99% accurate | Approximate |

**Token Bucket (most common in interviews):**
```
Bucket capacity: 10 tokens
Refill rate: 1 token/second

Request arrives:
  - tokens > 0? → allow, tokens -= 1
  - tokens == 0? → reject (429 Too Many Requests)

After 10 seconds of no requests → bucket is full again (10 tokens)
```

**Where to place rate limiter:**
- API Gateway level (per-user limits)
- Load balancer (per-IP)
- Application level (per-endpoint)

**Distributed rate limiting:** Use Redis with Lua scripts for atomic check-and-decrement across multiple server instances.

> ⚠️ **Interview tip:** Always mention WHERE the rate limiter sits (edge/gateway, not inside each microservice) and that it's stateful (needs shared store like Redis for distributed deployments).

---

## Distributed Locking

When multiple services/instances need to coordinate access to a shared resource (e.g., only one worker should process a job, only one transfer should debit a wallet).

### Approaches

| Method | How | Pros | Cons |
|---|---|---|---|
| **Redis SETNX** | `SET lock_key "owner" NX EX 30` | Simple, fast | Single point of failure |
| **Redlock** | Acquire lock on majority of Redis nodes (3/5) | Tolerates node failures | Complex, debated |
| **DB row lock** | `SELECT FOR UPDATE` or conditional write | ACID, no extra infra | Slow, DB becomes bottleneck |
| **DynamoDB conditional write** | `PutItem` with condition `attribute_not_exists(lockKey)` | Serverless-friendly | Eventually consistent reads |
| **ZooKeeper / etcd** | Ephemeral nodes with watches | Battle-tested, auto-cleanup | Heavy infra, complex |

**Redis distributed lock pattern:**
```
# Acquire
SET "lock:order_123" "worker_A" NX EX 30
# NX = only if not exists
# EX 30 = auto-expire in 30 seconds (prevents dead locks if holder crashes)

# Release (only if you're the owner)
if GET "lock:order_123" == "worker_A":
    DEL "lock:order_123"
```

**Key problems solved:**
- **Deadlock:** TTL ensures lock auto-releases if holder crashes
- **Split-brain:** Fencing tokens ensure stale lock holders can't make writes
- **Race condition:** Atomic SETNX prevents two holders

> ⚠️ **Interview tip:** When you say "distributed lock", always mention the TTL/expiry. Without it, a crashed holder keeps the lock forever. Also mention fencing tokens if discussing writes to storage — a lock alone doesn't prevent stale operations.

---

## Circuit Breaker Pattern

Prevents cascading failures when a downstream service is down. Instead of endlessly retrying and timing out, "break the circuit" and fail fast.

**States:**
```
CLOSED (normal) → requests flow through
    ↓ (failures exceed threshold)
OPEN (broken) → all requests fail immediately, no calls to downstream
    ↓ (after timeout period)
HALF-OPEN (testing) → allow one request through
    ↓ success → back to CLOSED
    ↓ failure → back to OPEN
```

**When to use:** Any call to an external service (payment provider, third-party API, downstream microservice) that might be slow or down.

**Configuration:**
- Failure threshold: 5 failures in 60 seconds → OPEN
- Timeout: 30 seconds → try HALF-OPEN
- Fallback: return cached data, default response, or graceful error

**Real-world:** Netflix Hystrix (deprecated), Resilience4j (Java), Polly (.NET)

> ⚠️ **Interview tip:** Mention circuit breaker when designing payment gateways or any multi-service architecture. Shows you think about failure modes, not just the happy path.

---

## Retry and Exponential Backoff

When a request fails due to a transient error (network blip, 503, timeout), don't immediately retry at full speed — you'll overwhelm the recovering service.

**Exponential backoff:**
```
Attempt 1: wait 1 second
Attempt 2: wait 2 seconds
Attempt 3: wait 4 seconds
Attempt 4: wait 8 seconds
(give up after max retries)
```

**With jitter (add randomness):**
```
wait = base_delay * 2^attempt + random(0, 1000ms)
```
Jitter prevents thundering herd — 1000 clients all retrying at exactly the same time.

**What to retry vs what NOT to retry:**

| Retriable | NOT retriable |
|---|---|
| 500 (server error) | 400 (bad request — your fault) |
| 503 (service unavailable) | 401 (unauthorized) |
| Timeout | 404 (not found) |
| Connection refused | 409 (conflict — duplicate) |

> ⚠️ **Interview tip:** When you mention retries in HLD, always pair it with idempotency. Retrying a non-idempotent operation (like payment charge) without idempotency keys = double-charging the user.

---

## Dead Letter Queue (DLQ)

When a message in a queue fails processing after multiple retries, instead of losing it or blocking the queue, move it to a separate "dead letter queue" for investigation.

```
Main Queue → Consumer tries to process
    ↓ (fails 3 times)
Dead Letter Queue → message sits here for manual review or auto-retry later
    ↓
Alert fires → engineer investigates
```

**Why you need it:**
- A single "poison message" (malformed data, edge case) would block the entire queue without DLQ
- Provides audit trail of failures
- Enables retry after fixing the bug

**Real-world:** SQS DLQ, Kafka `.DLT` topics, RabbitMQ dead-letter exchange

> ⚠️ **Interview tip:** Always mention DLQ when designing async pipelines (notification system, payment processing, ETL). Shows you handle failure gracefully instead of silently dropping messages.

---

## Service Discovery

In a microservices architecture with many services scaling up/down, how does Service A know the IP/port of Service B?

**Approaches:**

| Method | How | Example |
|---|---|---|
| **DNS-based** | Services register with DNS. Clients resolve hostname. | AWS Route 53, Cloud Map |
| **Registry-based** | Central registry (services register on start, deregister on stop). Clients query registry. | Consul, Eureka, ZooKeeper |
| **Sidecar/Mesh** | Each service has a proxy that handles routing. | Istio, Envoy, Linkerd |
| **Load Balancer** | All services sit behind LB. Clients talk to LB. | AWS ALB, Nginx |

**In practice (most common in interviews):** "Service A calls Service B through an internal load balancer or API gateway. Service discovery is handled by the platform (Kubernetes DNS, AWS Cloud Map)." — Don't over-explain unless asked.

---

## API Gateway

A single entry point for all client requests. Routes to the right microservice, handles cross-cutting concerns.

**What it does:**
- Request routing (path-based: /users → User Service, /orders → Order Service)
- Authentication/Authorization (validate JWT before forwarding)
- Rate limiting
- Request/response transformation
- Load balancing
- SSL termination
- Caching
- Logging & monitoring

```
Client → API Gateway → User Service
                     → Order Service
                     → Payment Service
```

**Why not let clients call services directly?**
- Client would need to know addresses of 20+ services
- No central auth check
- No rate limiting
- CORS issues
- Can't do request aggregation (one client call → fan out to 3 services)

**Real-world:** Kong, AWS API Gateway, Nginx, Envoy

---

## Proxy: Forward vs Reverse

| | Forward Proxy | Reverse Proxy |
|---|---|---|
| Sits between | Client and internet | Internet and server |
| Client knows? | Yes (configured) | No (transparent) |
| Purpose | Privacy, filtering, caching for clients | Load balancing, SSL, caching for servers |
| Example | VPN, corporate proxy | Nginx, CDN, API Gateway |

**Reverse proxy in HLD (what you'll use):**
```
Internet → Reverse Proxy (Nginx) → Server 1
                                  → Server 2
                                  → Server 3
```
It's basically what a load balancer does + SSL termination + static file caching.

---

## Microservices vs Monolith

| | Monolith | Microservices |
|---|---|---|
| Deployment | One big deployment | Each service deploys independently |
| Scaling | Scale everything together | Scale only what's needed |
| Complexity | Simple to start | Complex (networking, debugging, consistency) |
| Data | Shared database | Each service owns its data |
| Failure | One bug takes down everything | Isolated failures (with circuit breakers) |
| Team | Works for small teams (< 10) | Enables large teams to work independently |
| When to use | MVP, early stage, small team | Large teams, independent scaling needs |

**What to say in interview:** "I'd start with a modular monolith and extract services only when a specific module needs independent scaling or a different team owns it." Shows maturity.

---

## Batch vs Stream Processing

| | Batch | Stream |
|---|---|---|
| When | Process accumulated data at intervals | Process each event as it arrives |
| Latency | Minutes to hours | Milliseconds to seconds |
| Example | Nightly analytics, monthly reports | Real-time fraud detection, live dashboards |
| Tools | Spark, Hadoop, AWS Glue | Kafka Streams, Flink, Spark Streaming |
| Complexity | Lower | Higher (ordering, exactly-once) |

**When to use which:**
- User needs to see result immediately → Stream
- Result can be delayed (analytics, recommendations) → Batch
- Both → Lambda architecture (batch for accuracy + stream for speed)

**Common interview pattern:**
```
Events → Kafka (stream) → Real-time consumer (live alerts)
                        → Batch consumer (nightly aggregation to data warehouse)
```

---

## Connection Pooling

Creating a new database connection is expensive (~50-100ms for TCP + TLS + auth). Instead, maintain a pool of pre-created connections and reuse them.

```
Without pooling:
  Request 1: create connection → query → close
  Request 2: create connection → query → close (50ms wasted each time)

With pooling:
  Startup: create 20 connections, keep them alive
  Request 1: borrow connection → query → return to pool
  Request 2: borrow connection → query → return to pool (0ms overhead)
```

**Configuration:**
- Min pool size: connections kept alive even when idle (e.g., 5)
- Max pool size: maximum concurrent connections (e.g., 50)
- Connection timeout: how long to wait if pool is full (e.g., 5s)

**Why it matters in HLD:** If your service has 100 instances each with max 50 connections, that's 5000 connections to the DB. Most databases cap at ~5000-10000. This is why you need connection pooling + potentially a connection proxy (PgBouncer for Postgres).

---

## Object Storage (S3 Design Principles)

For storing large files (images, videos, backups, logs) — not rows of data.

**Key properties:**
- Flat namespace (no folders — "folders" are just key prefixes)
- Immutable objects (overwrite = new version)
- Virtually unlimited storage
- Eventual consistency for overwrites (strong consistency for new objects in AWS S3)
- Cheap storage, expensive retrieval for cold tiers

**Access patterns:**
| Operation | Latency | Cost |
|---|---|---|
| PUT (upload) | ~100ms | Low |
| GET (download) | ~50-100ms | Low |
| LIST (list all objects) | Slow for large buckets | Expensive |
| DELETE | Fast | Free |

**When to use in HLD:**
- User-uploaded media (profile pics, videos) → S3 + CDN
- System backups → S3 Glacier (cold storage)
- Log archival → S3 with lifecycle rules
- Large file exports (XLSX, PDF) → generate → upload to S3 → return presigned URL

**Presigned URLs:** Generate a time-limited URL that lets a client upload/download directly to S3 without going through your server. Reduces server load for large files.

> ⚠️ **Interview tip:** When your design involves file uploads, say "Client uploads directly to S3 via a presigned URL to avoid bottlenecking our API servers." Then S3 triggers an event (via SNS/SQS) for post-processing (thumbnail generation, virus scan, etc).

---

## Numbers Every Engineer Should Know

Quick reference for capacity planning:

| System | Throughput | Notes |
|---|---|---|
| Single Postgres | 10-50K TPS | Depends on query complexity |
| Single Redis | 100-200K ops/sec | In-memory, single-threaded |
| Single Kafka broker | 200K-1M msgs/sec | Depends on message size |
| Single Elasticsearch node | 10-30K writes/sec | Depends on mapping complexity |
| HTTP request (same DC) | 1-5ms roundtrip | Network + processing |
| Cross-continent roundtrip | 100-200ms | Speed of light limit |
| SSD random read | 100μs | 10K IOPS typical |
| RAM access | 100ns | 1000x faster than SSD |

**Storage rules:**
- 1M users × 1KB profile = 1GB
- 1B rows × 100 bytes = 100GB
- 10M images × 500KB = 5TB

---

## How to Approach an HLD Interview

1. **Clarify requirements** (2-3 min): functional + non-functional. Ask what's in scope.
2. **Back-of-envelope** (2 min): traffic, storage, bandwidth estimates.
3. **High-level design** (10-15 min): boxes and arrows. Client → LB → Service → DB.
4. **Deep dive** (15-20 min): interviewer picks 2-3 areas. Show depth.
5. **Wrap up** (2-3 min): trade-offs, what you'd change at 10× scale.

**Don't:**
- Don't jump into details before drawing the big picture
- Don't pick a database without justifying why
- Don't ignore non-functional requirements (latency, consistency, availability)

---

*Next: Read the [45-min interview framework →](/approach) to learn how to deliver these concepts in an actual interview. Or pick a [specific design problem](/hld) and see them applied.*

---

## Part of the System Design Interview Guide

| Step | Page |
|------|------|
| 1. Prep Roadmap | [Interview Guide](/system-design-interview-guide) |
| 2. Fundamentals | **You're here** |
| 3. Interview Framework | [The 45-Min Approach →](/approach) |
| 4. Practice | [HLD Problems →](/hld) |
