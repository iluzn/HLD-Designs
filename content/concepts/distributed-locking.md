---
layout: default
title: "Distributed Locking in System Design - Redis, DynamoDB, ZooKeeper"
description: "Complete guide to distributed locking for system design interviews. Redis SETNX, Redlock, DynamoDB conditional writes, fencing tokens, deadlock prevention."
permalink: /concepts/distributed-locking/
---

# Distributed Locking - Complete Deep Dive

> **Prerequisites:** [Database Concepts](/concepts#database-concepts), [Caching](/concepts/caching/)
> **Used in:** [Digital Wallet](/hld/DigitalWallet), [BookMyShow](/hld/BookMyShow), [Job Scheduler](/hld/JobScheduler), any system with shared mutable state

---

## What is Distributed Locking?

A distributed lock ensures that only ONE process/server can access a shared resource at a time, even when multiple servers are running.

**Real-world analogy:** A bathroom with a lock. One person enters, locks it. Others wait. When done, they unlock, and the next person enters. In distributed systems, the "bathroom" is a shared resource (database row, file, external API) and the "people" are different servers.

**Why it's needed:**
```
Without lock:
  Server A: reads balance=100, deducts 80 → writes 20
  Server B: reads balance=100 (same time!), deducts 80 → writes 20
  Expected final: 100 - 80 - 80 = -60 (impossible!) or 20 (lost update)

With lock:
  Server A: acquires lock → reads 100 → deducts 80 → writes 20 → releases lock
  Server B: tries lock → WAITS → acquires lock → reads 20 → deducts 80 → FAILS (insufficient)
  Correct!
```

---

## When Do You Need Distributed Locks?

| Scenario | Why |
|---|---|
| Prevent double-booking | Two users try to book the last seat at the same time |
| Prevent double-spending | Two transfers from the same wallet concurrently |
| Exactly-once job execution | Cron job running on 5 servers — only one should execute |
| Rate limit writes to external API | Only one server should call the API at a time |
| Resource ownership | Only one worker processes a specific task |

---

## Approaches

### 1. Redis SETNX (Simplest, Most Common)

Use Redis `SET key value NX EX ttl` — sets the key only if it doesn't exist (NX), with expiry (EX).

```
ACQUIRE LOCK:
  SET "lock:order_123" "server_A_uuid" NX EX 30
  → returns OK if acquired (key didn't exist)
  → returns nil if someone else holds it

RELEASE LOCK (only if you own it):
  if GET "lock:order_123" == "server_A_uuid":
      DEL "lock:order_123"
```

**Why UUID as value?** To ensure only the lock OWNER can release it. Without it, Server B could accidentally delete Server A's lock.

**Why TTL (EX 30)?** If the lock holder crashes, the lock auto-expires after 30s. Without TTL, a crashed holder keeps the lock forever (deadlock).

```java
// Java implementation
public boolean acquireLock(String resource, String owner, int ttlSeconds) {
    String key = "lock:" + resource;
    String result = redis.set(key, owner, SetParams.setParams().nx().ex(ttlSeconds));
    return "OK".equals(result);
}

public boolean releaseLock(String resource, String owner) {
    String key = "lock:" + resource;
    // Lua script for atomic check-and-delete
    String lua = "if redis.call('get', KEYS[1]) == ARGV[1] then " +
                 "return redis.call('del', KEYS[1]) else return 0 end";
    return redis.eval(lua, List.of(key), List.of(owner)) == 1;
}
```

**Why Lua for release?** GET and DEL must be atomic. Without Lua:
```
Server A: GET lock → "server_A" (correct owner)
  --- A's TTL expires here ---
Server B: SET lock → "server_B" (acquires lock)
Server A: DEL lock → deletes B's lock!  ← BUG
```

**Pros:** Simple, fast (~1ms), widely used.
**Cons:** Single Redis instance is a SPOF. If Redis crashes, lock is gone.

---

### 2. Redlock (Multi-Node Redis)

For higher reliability, acquire locks on a MAJORITY of Redis nodes (e.g., 3 out of 5).

```
5 independent Redis instances.

ACQUIRE:
  Try SET NX EX on all 5 instances
  If successful on ≥ 3 (majority) → lock acquired
  If < 3 → release all, retry after random delay

RELEASE:
  DEL key on ALL 5 instances
```

**Pros:** Tolerates up to 2 Redis nodes dying.
**Cons:** Complex. Debated in the community (Martin Kleppmann's critique). Clock skew issues.

**For interviews:** Mention Redlock exists but say "for most applications, single Redis SETNX with TTL is sufficient. Redlock adds complexity."

---

### 3. DynamoDB Conditional Write

Use `PutItem` with a condition expression.

```
Put lock item:
  PK: "lock:order_123"
  owner: "server_A"
  expiresAt: now + 30s
  ConditionExpression: "attribute_not_exists(PK) OR expiresAt < :now"

If condition passes → lock acquired
If condition fails → someone else holds it → retry or fail
```

**Pros:** No extra infrastructure (already using DynamoDB). Serverless-friendly. TTL via DynamoDB TTL feature.
**Cons:** ~10ms latency (vs ~1ms Redis). Eventually consistent reads might miss a lock (use consistent reads).

---

### 4. Database Row Locking (SELECT FOR UPDATE)

Use your existing relational database.

```sql
BEGIN;
SELECT * FROM locks WHERE resource = 'order_123' FOR UPDATE;
-- If row exists and not expired → someone holds it → rollback
-- If row doesn't exist or expired → insert/update with our owner
INSERT INTO locks (resource, owner, expires_at) 
VALUES ('order_123', 'server_A', NOW() + INTERVAL '30 seconds')
ON CONFLICT (resource) DO UPDATE SET owner = 'server_A', expires_at = ...
WHERE locks.expires_at < NOW();
COMMIT;
```

**Pros:** ACID guaranteed. No extra infrastructure.
**Cons:** Database becomes the bottleneck. Locks are slow (disk I/O). Connection pool pressure.

---

### 5. ZooKeeper / etcd (Heavyweight)

Create an ephemeral node. When the holder disconnects, the node auto-deletes (lock released).

```
ACQUIRE: create("/locks/order_123", ephemeral=true)
  → success: you have the lock
  → already exists: set a watch, wait for deletion

RELEASE: node auto-deletes when session ends (client disconnects/crashes)
```

**Pros:** Battle-tested. Auto-cleanup on crash. No TTL guessing.
**Cons:** Heavy infrastructure (ZooKeeper cluster). Higher latency. Overkill for most use cases.

---

## Comparison

| Method | Latency | Reliability | Complexity | Best For |
|---|---|---|---|---|
| Redis SETNX | ~1ms | Single Redis SPOF | Low | Most applications |
| Redlock | ~5ms | Tolerates minority failure | High | Critical locks needing HA |
| DynamoDB | ~10ms | Highly available (managed) | Medium | AWS/serverless apps |
| DB Row Lock | ~20-50ms | As reliable as your DB | Low | Small scale, already have DB |
| ZooKeeper | ~10-20ms | Very high (consensus) | High | Distributed coordination |

---

## Common Problems and Solutions

### Problem 1: Lock Holder Crashes (Deadlock)

Lock is acquired, holder crashes, lock never released.

**Solution:** TTL/expiry on every lock. After TTL, lock auto-releases.

**Trade-off:** TTL too short → lock expires while holder is still working (split-brain). TTL too long → long wait if holder crashes.

**Best practice:** TTL = 3x expected operation time. If operation takes 5s, set TTL = 15s.

---

### Problem 2: Lock Expires While Still Working

```
Server A acquires lock (TTL=30s)
Server A's operation takes 35s (slow network/GC pause)
Lock expires at 30s → Server B acquires lock
Both A and B are now operating on the same resource! ← DANGEROUS
```

**Solution: Fencing Tokens**

```
Every lock acquisition returns an incrementing token number.

Server A gets lock with token=33
Server B gets lock with token=34 (after A's expires)

Storage checks: "reject writes with token < current max"
Server A tries to write with token=33 → REJECTED (current max is 34)
Server B writes with token=34 → ACCEPTED
```

---

### Problem 3: Lock Ordering (Deadlock Between Two Locks)

```
Server A: acquires lock on Wallet_1, then tries lock on Wallet_2
Server B: acquires lock on Wallet_2, then tries lock on Wallet_1
→ Both wait forever (deadlock)
```

**Solution:** Always acquire locks in the same order (sorted by ID).

```java
// Transfer from wallet A to wallet B
Wallet first = walletA.id < walletB.id ? walletA : walletB;
Wallet second = walletA.id < walletB.id ? walletB : walletA;

acquireLock(first.id);   // Both threads try this first
acquireLock(second.id);  // Then this
// No circular wait → no deadlock
```

---

## Common Interview Questions

**Q: "How do you prevent double-booking?"**
A: "Use a distributed lock on the resource (seat_id). Before booking, acquire lock with Redis SETNX + TTL. If acquired, proceed with booking. If not, return 'already booked'. Release lock after commit."

**Q: "What if the lock holder crashes?"**
A: "TTL auto-releases the lock. The next server to try will acquire it. The crashed server's partial work should be rolled back (use DB transactions) or designed to be idempotent."

**Q: "Redis SETNX vs database locking?"**
A: "Redis is faster (~1ms vs ~20ms) and doesn't pressure your DB connection pool. Use Redis if you have it. Use DB locking only if you don't want to add Redis infrastructure."

**Q: "How do you handle lock contention (too many waiting)?"**
A: "1) Exponential backoff on retry. 2) Timeout — if can't acquire within 5s, fail fast. 3) Redesign to reduce lock scope (lock individual items, not entire collections)."

---

[← Back to Fundamentals](/concepts) | [← Database Sharding](/concepts/database-sharding/) | [Next: Event Sourcing & CQRS →](/concepts/event-sourcing/)
