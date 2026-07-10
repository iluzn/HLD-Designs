---
layout: default
title: "Database Sharding in System Design - Strategies, Hot Partitions, Rebalancing"
description: "Complete guide to database sharding for system design interviews. Horizontal partitioning, shard keys, range vs hash sharding, cross-shard queries, rebalancing."
permalink: /concepts/database-sharding/
---

# Database Sharding - Complete Deep Dive

> **Prerequisites:** [Database Concepts](/concepts#database-concepts), [Consistent Hashing](/concepts/consistent-hashing/)
> **Used in:** [Key-Value Store](/hld/KeyValueStore), [Chat System](/hld/ChatSystem), [URL Shortener](/hld/URLShortner), any system beyond single-DB scale

---

## What is Sharding?

Sharding splits a large database into smaller pieces (shards), each stored on a different server. Each shard holds a subset of the data.

**Real-world analogy:** A library with 1 million books. Instead of one giant room (single DB), you build 10 rooms (shards), each holding 100K books organized by author's last name initial (A-C in Room 1, D-F in Room 2, etc).

```
Without sharding:
  1 billion rows → 1 database server → CPU maxed, disk full, queries slow

With sharding (4 shards):
  Shard 1: rows where userId 0-249M      (Server 1)
  Shard 2: rows where userId 250M-499M   (Server 2)
  Shard 3: rows where userId 500M-749M   (Server 3)
  Shard 4: rows where userId 750M-1B     (Server 4)
```

---

## When Do You Need Sharding?

**NOT yet:** If your database is < 1TB and < 10K queries/sec, a single server with read replicas is enough. Don't shard prematurely.

**Time to shard when:**
- Single DB exceeds disk capacity (> 1-5 TB)
- Write throughput exceeds single server (> 10-50K writes/sec)
- Read replicas aren't enough (write-heavy workload)
- Query latency grows despite indexes

**Rule of thumb:** Scale reads with replicas first. Shard only when writes are the bottleneck.

---

## Sharding Strategies

### 1. Hash-Based Sharding

Hash the shard key and mod by number of shards.

```
shard_id = hash(userId) % num_shards

hash("user_001") % 4 = 2 → Shard 2
hash("user_002") % 4 = 0 → Shard 0
hash("user_003") % 4 = 3 → Shard 3
```

**Pros:** Even distribution (if hash function is good). No hotspots from sequential keys.
**Cons:** Range queries impossible (can't ask "all users with ID 100-200" — they're scattered). Adding shards requires rehashing (use consistent hashing to fix this).

**Best for:** Key-value lookups, user data, sessions.

### 2. Range-Based Sharding

Assign contiguous ranges to each shard.

```
Shard 0: userId 0 - 999,999
Shard 1: userId 1,000,000 - 1,999,999
Shard 2: userId 2,000,000 - 2,999,999
```

**Pros:** Range queries work naturally ("get all users from 1M to 1.5M"). Simple to understand.
**Cons:** Hotspots if data isn't evenly distributed (new users all hit the last shard). Uneven shard sizes over time.

**Best for:** Time-series data (shard by month), geographic data (shard by region).

### 3. Directory-Based Sharding

A lookup table maps each key to its shard.

```
Lookup table:
  user_001 → Shard 2
  user_002 → Shard 0
  user_003 → Shard 1

Query: look up shard in directory, then query that shard.
```

**Pros:** Flexible — can move any key to any shard. Rebalancing is easy (update directory).
**Cons:** Directory is a single point of failure. Extra hop for every query.

**Best for:** When you need fine-grained control over data placement.

### 4. Geographic Sharding

Shard by user's geographic region.

```
Shard "US": all US users (servers in us-east-1)
Shard "EU": all EU users (servers in eu-west-1)
Shard "APAC": all Asia-Pacific users (servers in ap-south-1)
```

**Pros:** Data locality (low latency for users near their shard). Compliance (EU data stays in EU for GDPR).
**Cons:** Uneven distribution (US shard might be 5x larger). Cross-region queries are expensive.

---

## Choosing a Shard Key

The shard key determines which shard a row goes to. It's the most important decision in sharding.

**Good shard key properties:**
- High cardinality (many unique values — userId is good, country is bad)
- Even distribution (no single value dominates)
- Matches query patterns (queries include the shard key → single-shard lookup)

| Shard Key | Good For | Bad For |
|---|---|---|
| userId | User-centric apps (get all data for one user) | Cross-user queries |
| orderId | Order lookups | "All orders for user X" (need to scan all shards) |
| timestamp | Time-series | Hot partition (all writes hit current time shard) |
| country | Geo-partitioning | Uneven (US has 60% of traffic) |
| hash(userId) | Even distribution | Range queries, debugging |

---

## Hot Partition Problem

**The problem:** One shard gets disproportionately more traffic than others.

**Examples:**
- Celebrity user (10M followers → their shard gets hammered on every post)
- Time-based shard key (all current writes go to "today" shard)
- Popular product (flash sale → one product's shard overwhelmed)

**Solutions:**

| Solution | How |
|---|---|
| Add salt/suffix to key | `shard_key = userId + "_" + random(0,9)` → spreads across 10 sub-shards. Reads must fan-out. |
| Dedicated shard for hot keys | Detect hot keys → move to a dedicated high-capacity shard |
| Caching in front | Cache hot data aggressively → most reads don't hit the shard |
| Further split the hot shard | Break one shard into 4 smaller ones |

---

## Cross-Shard Queries (The Pain)

**The biggest downside of sharding:** Queries that span multiple shards are expensive.

```
"Get the top 10 orders across all users sorted by amount"
→ Query ALL shards → each returns its top 10 → merge → pick global top 10
→ Scatter-gather pattern (slow, expensive)
```

**How to handle:**

| Pattern | When | Trade-off |
|---|---|---|
| Denormalize | Store duplicate data to avoid cross-shard JOINs | Write amplification |
| Application-side join | Query both shards, merge in app code | Complex, higher latency |
| Scatter-gather | Fan out query to all shards, aggregate results | Latency = slowest shard |
| Secondary index (Elasticsearch) | Sync data to a search index that isn't sharded the same way | Extra infra, lag |

**Best practice in interviews:** "I'd shard by userId so all of a user's data is on one shard. For cross-user queries (leaderboards, analytics), I'd use a separate denormalized read store or Elasticsearch."

---

## Rebalancing

When shards become uneven (one grows too large), you need to move data between shards.

**Approaches:**

| Strategy | How | Downtime? |
|---|---|---|
| Fixed partitions | Pre-create many partitions (e.g., 1000), assign groups to nodes. Rebalance = move partition groups. | Minimal |
| Dynamic splitting | When a shard exceeds size threshold, split into two. | Zero (if background) |
| Consistent hashing | Add virtual nodes for new server, only ~K/N keys move. | Zero |

**DynamoDB:** Auto-splits partitions when they exceed 10GB or 3000 RCU/1000 WCU. You don't manage this manually.

**Cassandra:** Uses consistent hashing with virtual nodes. Adding a node = automatic rebalancing.

---

## Sharding vs Replication

| | Sharding | Replication |
|---|---|---|
| Purpose | Scale writes + storage | Scale reads + availability |
| Data | Each shard has DIFFERENT data | Each replica has SAME data |
| Failure | Shard down = that data unavailable | Replica down = other replicas serve |
| Complexity | High (routing, cross-shard queries) | Medium (replication lag, failover) |
| When | Write-heavy, large data | Read-heavy, high availability |

**You usually need BOTH:** Shard for writes/storage, replicate each shard for reads/HA.

```
Shard 1: Primary → Replica 1A, Replica 1B
Shard 2: Primary → Replica 2A, Replica 2B
Shard 3: Primary → Replica 3A, Replica 3B
```

---

## Common Interview Questions

**Q: "How would you shard this database?"**
A: "I'd shard by [entity]Id using hash-based sharding for even distribution. All data for one [entity] lives on one shard, so most queries are single-shard. For cross-entity queries, I'd use a secondary index (Elasticsearch) synced via CDC."

**Q: "What's the risk of sharding by timestamp?"**
A: "Hot partition. All current writes go to the 'now' shard. Fix: compound key = timestamp + random suffix, or hash-based sharding with separate time-series index for time queries."

**Q: "When would you NOT shard?"**
A: "When your data fits on one server (< 1TB), when writes are < 10K/sec, or when your queries frequently need cross-entity JOINs (sharding makes JOINs very expensive)."

**Q: "How do you handle transactions across shards?"**
A: "You can't do ACID transactions across shards easily. Options: 1) Design so transactions are single-shard (shard by the transactional entity). 2) Use saga pattern for cross-shard operations. 3) Use two-phase commit (slow, avoid)."

---

[← Back to Fundamentals](/concepts) | [← Consistent Hashing](/concepts/consistent-hashing/) | [Next: CDN →](/concepts/cdn/)
