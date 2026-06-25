---
permalink: /concepts/
layout: default
title: "System Design Fundamentals — CAP, Caching, Sharding, Queues"
description: "Core system design concepts: CAP theorem, load balancing, caching, sharding, message queues, and more. Everything you need before diving into HLD problems."
---

# System Design Fundamentals

Everything you need to know before tackling specific HLD problems. These are the building blocks every design uses.

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
- **LRU** (Least Recently Used) — evict what hasn't been touched longest. Most common.
- **LFU** (Least Frequently Used) — evict what's been used least overall.
- **TTL** (Time To Live) — expire after N seconds regardless of access.

**Cache invalidation** (the hard problem):
- TTL-based: simple but stale window exists
- Event-based: DB change → invalidate cache entry. Consistent but complex.
- Versioning: key includes version number. New version = cache miss.

**Tools:** Redis, Memcached, CDN (CloudFront, Cloudflare), local in-process (Caffeine, Guava)

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

---

## CAP Theorem

In a distributed system, you can only guarantee 2 of 3:

- **C (Consistency):** Every read sees the latest write
- **A (Availability):** Every request gets a response (might be stale)
- **P (Partition Tolerance):** System works despite network splits

**In practice:** Network partitions WILL happen. So you choose between:
- **CP:** Consistent + Partition-tolerant. During partition, some requests fail. (e.g., ZooKeeper, HBase)
- **AP:** Available + Partition-tolerant. During partition, you might read stale data. (e.g., Cassandra, DynamoDB)

Most systems are AP with tunable consistency — you choose per-operation whether you need strong or eventual consistency.

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

Problem: you have N cache servers. `hash(key) % N` works until you add/remove a server — then ALL keys remap.

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

*Next: pick a [specific design problem](/) and see these concepts applied.*
