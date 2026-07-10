---
layout: default
title: "CAP Theorem in System Design - Consistency, Availability, Partition Tolerance"
description: "Complete guide to CAP theorem for system design interviews. CP vs AP systems, PACELC theorem, real-world examples, when to choose consistency vs availability."
permalink: /concepts/cap-theorem/
---

# CAP Theorem - Complete Deep Dive

> **Prerequisites:** [Database Concepts](/concepts#database-concepts), [Scalability](/concepts#scalability)
> **Used in:** [Key-Value Store](/hld/KeyValueStore), [Digital Wallet](/hld/DigitalWallet), [Chat System](/hld/ChatSystem)

---

## What is CAP Theorem?

CAP theorem states that a distributed system can only guarantee TWO of these three properties simultaneously:

- **C**onsistency — Every read gets the most recent write (all nodes see the same data at the same time)
- **A**vailability — Every request gets a response (even if it's stale data)
- **P**artition Tolerance — System works even when network communication between nodes breaks

**The catch:** Network partitions WILL happen in distributed systems (routers fail, cables break, cloud AZs lose connectivity). So Partition Tolerance is not optional — you must have P.

**This means your real choice is: C or A** (during a partition).

```
During normal operation: You get all three (C + A + P)
During a network partition: You must choose C OR A

Choose C (Consistency): System refuses to serve potentially stale data → some requests fail
Choose A (Availability): System serves whatever data it has → some responses might be stale
```

---

## The Analogy

Imagine two bank branches (Node A and Node B) that share account data. The phone line between them breaks (partition).

**If you choose Consistency (CP):**
- Customer at Branch B wants to withdraw $500
- Branch B can't verify the balance with Branch A (partition)
- Branch B says: "Sorry, system is unavailable. Come back later."
- No wrong transaction happens, but service is down.

**If you choose Availability (AP):**
- Customer at Branch B wants to withdraw $500
- Branch B can't verify with Branch A, but serves anyway using its last known balance
- Customer withdraws $500
- Meanwhile, Customer ALSO withdraws at Branch A (balance was already $500)
- Total withdrawn: $1000 from a $500 account (inconsistency!)
- But both branches stayed "available."

---

## CP vs AP Systems

### CP Systems (Consistency + Partition Tolerance)

During a partition, the system becomes unavailable rather than serve stale data.

| System | Why CP |
|---|---|
| **Postgres (single primary)** | Writes go to one node. If primary is unreachable, writes fail. |
| **MongoDB (default write concern)** | Writes to primary only. If primary is down, writes fail until election. |
| **HBase** | Strong consistency via single region server per row range |
| **ZooKeeper / etcd** | Consensus-based. Won't serve reads if can't reach majority. |
| **Redis (single node)** | Single node = no partition issue, but if it dies, data is gone. |

**When to choose CP:** Financial transactions, inventory management, any system where wrong data is worse than no data.

### AP Systems (Availability + Partition Tolerance)

During a partition, the system continues serving requests but might return stale data.

| System | Why AP |
|---|---|
| **Cassandra** | Always writable to any node. Resolves conflicts later (last-write-wins). |
| **DynamoDB** | Configurable — default is eventually consistent reads (AP). |
| **CouchDB** | Multi-master replication. Conflicts detected and resolved later. |
| **DNS** | Returns cached (possibly stale) records. Always available. |
| **CDN** | Serves cached content even if origin is down. |

**When to choose AP:** Social media feeds, product catalogs, DNS, session stores — where stale data is acceptable for a few seconds.

---

## Consistency Models (Spectrum)

It's not binary (consistent vs inconsistent). There's a spectrum:

| Model | Meaning | Latency | Example |
|---|---|---|---|
| **Strong Consistency** | Read always returns latest write | Highest | Bank balance, Postgres primary |
| **Linearizability** | Operations appear in real-time order | Very High | ZooKeeper |
| **Sequential Consistency** | Operations appear in same order on all nodes (but not real-time) | High | — |
| **Causal Consistency** | If A caused B, everyone sees A before B | Medium | Comments thread |
| **Read-Your-Writes** | You always see your own latest write | Medium | After posting, you see your post |
| **Eventual Consistency** | All nodes converge eventually (seconds to minutes) | Lowest | DNS, social feeds, CDN |

**For interviews, you only need to know:**
- Strong consistency (CP) — for money/critical data
- Eventual consistency (AP) — for everything else
- Read-your-writes — compromise (after write, read from primary; otherwise read from replica)

---

## Real-World Examples in System Design

### Example 1: Digital Wallet (CP)

```
User A has $100.
User A transfers $100 to User B.
User A tries to spend $100 again.

CP (correct): Second spend is rejected — balance is 0.
AP (dangerous): Second spend might succeed if nodes are partitioned → $100 created from nothing.
```

**Decision:** Financial systems MUST be CP. Lost availability (retry later) is better than lost money.

### Example 2: Instagram Feed (AP)

```
User posts a photo.
Follower opens app 2 seconds later.

CP: Follower sees "loading..." until all replicas are consistent.
AP: Follower might not see the photo for 2-5 seconds (eventual consistency). That's fine.
```

**Decision:** Social feeds use AP. Seeing a post 3 seconds late doesn't matter. Unavailability would be worse.

### Example 3: Chat System (Compromise)

```
Message ordering within a conversation: needs consistency (can't show messages out of order).
Read receipts: eventual consistency is fine (delay of 1-2s is OK).
Online status: eventual consistency (green dot can be 10s stale).
```

**Decision:** Different parts of the same system can have different consistency requirements.

---

## PACELC Theorem (Extended CAP)

CAP only talks about what happens DURING a partition. PACELC adds: what happens during NORMAL operation?

```
PAC: During Partition → choose Availability or Consistency
ELC: Else (no partition) → choose Latency or Consistency
```

| System | During Partition | Normal Operation |
|---|---|---|
| Postgres | PC (unavailable) | EC (consistent, higher latency for sync replication) |
| Cassandra | PA (available, stale) | EL (low latency, eventual consistency) |
| DynamoDB | PA/PC (configurable) | EL/EC (configurable per read) |
| MongoDB | PC (writes fail) | EC (consistent reads from primary) |

**Translation:** Even without partitions, you trade latency for consistency. Strong consistency requires waiting for all replicas to acknowledge. Eventual consistency returns immediately (faster) but might be stale.

---

## How to Talk About CAP in Interviews

**Don't say:** "My system is CP" (too simplistic)

**Do say:** "For the payment/wallet path, I'd use strong consistency (writes to single Postgres primary, reads from primary after writes). For the feed/notification path, I'd use eventual consistency with read replicas (AP), accepting 1-2s staleness. Different components have different consistency requirements."

**The key insight:** You don't choose CP or AP for the whole system. You choose PER COMPONENT based on what that component does.

---

## Common Interview Questions

**Q: "Is your system CP or AP?"**
A: "It depends on the component. The transaction ledger is CP (strong consistency — we can't lose or duplicate money). The user feed is AP (eventual consistency — seeing a post 2s late is fine). The notification system is AP (we'd rather deliver eventually than fail completely)."

**Q: "What happens if your database primary goes down?"**
A: "If CP: writes fail until a new primary is elected (seconds to minutes). The system is unavailable for writes but no data is corrupted. If AP: writes go to a replica, but we risk conflicts when the original primary comes back."

**Q: "How do you handle stale reads?"**
A: "For critical reads (after a write): read from primary (strong consistency). For general browsing: read from replica (eventually consistent, ~100ms lag). Use read-your-writes pattern: tag the user with a version number after writing, read from primary if version hasn't caught up on replica."

**Q: "Can you have strong consistency AND high availability?"**
A: "During normal operation, yes (PACELC: EC). During a network partition, no — you must choose. In practice, partitions are rare and short-lived, so most of the time you get both."

---

## Decision Framework

| Question to ask yourself | If YES | If NO |
|---|---|---|
| Can I lose money or corrupt data? | Strong consistency (CP) | Eventual is fine |
| Does the user need to see their own write immediately? | Read-your-writes (read from primary after write) | Read from replica |
| Is a 2-5s delay acceptable? | Eventual consistency (AP) | Strong consistency |
| Is the data financial/transactional? | CP always | AP probably fine |
| Am I building a cache/CDN? | AP (serve stale, refresh in background) | — |

---

[← Back to Fundamentals](/concepts) | [← Message Queues](/concepts/message-queues/) | [Next: Consistent Hashing →](/concepts/consistent-hashing/)
