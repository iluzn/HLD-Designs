---
layout: default
title: "Consistent Hashing in System Design - How It Works, Virtual Nodes"
description: "Complete guide to consistent hashing for system design interviews. Hash ring, virtual nodes, rebalancing, real-world use in DynamoDB, Cassandra, CDN, Redis Cluster."
permalink: /concepts/consistent-hashing/
---

# Consistent Hashing - Complete Deep Dive

> **Prerequisites:** [Load Balancing](/concepts/load-balancing/), [Database Sharding](/concepts#database-sharding-partitioning)
> **Used in:** [Key-Value Store](/hld/KeyValueStore), CDN routing, distributed caches, database sharding

---

## The Problem: Why Regular Hashing Breaks

With N servers, the simplest approach is:

```
server = hash(key) % N

hash("user_123") % 3 = 1 → Server 1
hash("user_456") % 3 = 0 → Server 0
hash("user_789") % 3 = 2 → Server 2
```

**Works fine until you add or remove a server:**

```
N changes from 3 to 4:
hash("user_123") % 4 = 3 → Server 3  (was Server 1!)
hash("user_456") % 4 = 0 → Server 0  (same, lucky)
hash("user_789") % 4 = 1 → Server 1  (was Server 2!)
```

**Almost ALL keys get remapped.** If you have a cache cluster, this means nearly 100% cache miss — a "cache stampede" that could crash your database.

**Goal of consistent hashing:** When adding/removing a server, only remap K/N keys (K = total keys, N = total servers). If you have 1M keys and 10 servers, only ~100K keys move instead of ~900K.

---

## How Consistent Hashing Works

### Step 1: The Hash Ring

Imagine the hash space as a circle (ring) from 0 to 2^32.

```
        0
       / \
    359   1
    /       \
  358   ...   2
   |           |
  ...         ...
   |           |
  180         90
     \       /
      \     /
       179
       
(Positions 0 to 2^32 arranged in a circle)
```

### Step 2: Place Servers on the Ring

Hash each server name to get its position on the ring.

```
hash("Server_A") = 100    → position 100
hash("Server_B") = 200    → position 200
hash("Server_C") = 350    → position 350

Ring:
        0
      /    \
    350(C)   100(A)
   /           \
  ...         200(B)
```

### Step 3: Place Keys on the Ring

Hash each key to get its position. Walk CLOCKWISE to find the first server.

```
hash("user_1") = 50   → walk clockwise → hits Server_A (at 100)
hash("user_2") = 150  → walk clockwise → hits Server_B (at 200)
hash("user_3") = 250  → walk clockwise → hits Server_C (at 350)
hash("user_4") = 360  → walk clockwise → hits Server_A (at 100, wraps around)
```

### Step 4: Adding a Server

Add Server_D at position 250:

```
Before: hash("user_3") = 250 → Server_C (at 350)
After:  hash("user_3") = 250 → Server_D (at 250) ← only this key moves!
```

Only keys between the new server and its predecessor need to move. Everything else stays in place.

### Step 5: Removing a Server

Remove Server_B (at 200):

```
Before: hash("user_2") = 150 → Server_B (at 200)
After:  hash("user_2") = 150 → Server_C (at 350) ← walks to next server
```

Only keys that were on Server_B move to the next server clockwise.

---

## The Problem: Uneven Distribution

With only 3 servers on the ring, the distribution is often uneven. One server might own 60% of the ring while another owns 10%.

```
        0
      /    \
    350(C)   10(A)
   /           \
  ...         300(B)

Server A owns: 10 to 300 (290 units of range) → ~80% of traffic!
Server B owns: 300 to 350 (50 units) → ~14%
Server C owns: 350 to 10 (20 units) → ~6%
```

---

## Virtual Nodes (The Fix)

Instead of placing each server once on the ring, place it MULTIPLE times (virtual nodes).

```
Server A → hash("A_1")=10, hash("A_2")=120, hash("A_3")=250
Server B → hash("B_1")=50, hash("B_2")=180, hash("B_3")=300
Server C → hash("C_1")=80, hash("C_2")=200, hash("C_3")=350

Ring:
  0→10(A)→50(B)→80(C)→120(A)→180(B)→200(C)→250(A)→300(B)→350(C)
```

Now each server appears 3 times, and the ranges are much more even.

**In practice:** Use 100-200 virtual nodes per server. The more virtual nodes, the more even the distribution.

**Bonus:** When a server is removed, its load is distributed evenly among ALL remaining servers (not just the one neighbor).

---

## When Adding/Removing Servers

```
Add Server D (with 3 virtual nodes at positions 30, 170, 280):
  - Keys in range (10,30] move from Server B to Server D
  - Keys in range (120,170] move from Server B to Server D
  - Keys in range (250,280] move from Server B to Server D
  
Total keys moved: only those in D's ranges (~1/N of total)
```

**Compare to mod hashing:** ~N/(N+1) keys move (nearly everything). Consistent hashing: ~1/N keys move.

---

## Implementation

```java
public class ConsistentHash<T> {
    private final TreeMap<Integer, T> ring = new TreeMap<>();
    private final int virtualNodes;

    public ConsistentHash(int virtualNodes) {
        this.virtualNodes = virtualNodes;
    }

    public void addNode(T node) {
        for (int i = 0; i < virtualNodes; i++) {
            int hash = hash(node.toString() + "_" + i);
            ring.put(hash, node);
        }
    }

    public void removeNode(T node) {
        for (int i = 0; i < virtualNodes; i++) {
            int hash = hash(node.toString() + "_" + i);
            ring.remove(hash);
        }
    }

    public T getNode(String key) {
        if (ring.isEmpty()) return null;
        int hash = hash(key);
        // Find first server clockwise (ceiling)
        Map.Entry<Integer, T> entry = ring.ceilingEntry(hash);
        if (entry == null) {
            // Wrap around to first server
            entry = ring.firstEntry();
        }
        return entry.getValue();
    }

    private int hash(String key) {
        // Use MD5 or MurmurHash for good distribution
        return Math.abs(key.hashCode()) % 360;
    }
}
```

---

## Real-World Usage

| System | How it uses consistent hashing |
|---|---|
| **DynamoDB** | Partitions data across nodes. Adding node = split one partition. |
| **Cassandra** | Token ring. Each node owns a range. Virtual nodes distribute evenly. |
| **Redis Cluster** | 16384 hash slots distributed across nodes. |
| **CDN (Akamai)** | Routes requests to nearest cache node. Adding edge server = minimal cache disruption. |
| **Amazon S3** | Internal partition routing for objects. |
| **Discord** | Routes guilds to specific servers. |
| **Memcached** | Client-side consistent hashing for cache distribution. |

---

## Replication with Consistent Hashing

For fault tolerance, each key is stored on N consecutive nodes (clockwise).

```
Replication factor = 3

Key at position 150:
  Primary: Server at 180 (first clockwise)
  Replica 1: Server at 200 (second clockwise)
  Replica 2: Server at 250 (third clockwise)
```

If primary dies, replicas still have the data. New primary is automatically the next node.

---

## Common Interview Questions

**Q: "Why not just use mod hashing?"**
A: Mod hashing remaps ~100% of keys when you add/remove a server. Consistent hashing only remaps ~1/N keys. This is critical for caches and distributed databases where remapping means cache misses or data migration.

**Q: "What are virtual nodes?"**
A: Each physical server is placed multiple times on the hash ring (100-200 positions). This ensures even distribution and smooth load transfer when nodes join/leave.

**Q: "How does DynamoDB handle hot partitions?"**
A: If one partition gets too hot, it splits into two (each taking half the key range). Consistent hashing ensures only the affected range is split — other partitions are undisturbed.

**Q: "How many virtual nodes should I use?"**
A: More virtual nodes = more even distribution. 100-200 per node is standard. Beyond that, diminishing returns and more memory for the ring.

**Q: "What hash function should I use?"**
A: MurmurHash3 or xxHash (fast, good distribution). NOT Java's hashCode() (poor distribution, clusters). NOT MD5/SHA (too slow for this use case).

---

## Consistent Hashing vs Rendezvous Hashing

| | Consistent Hashing | Rendezvous (Highest Random Weight) |
|---|---|---|
| How | Hash ring with virtual nodes | Hash each (key, server) pair, pick highest |
| Add/Remove | ~K/N keys move | ~K/N keys move |
| Complexity | O(log N) lookup (TreeMap) | O(N) lookup (check all servers) |
| Memory | Stores ring | Stores server list only |
| When | Large N (many servers) | Small N (< 20 servers) |

---

[← Back to Fundamentals](/concepts) | [← CAP Theorem](/concepts/cap-theorem/) | [Next: Database Indexing →](/concepts/database-indexing/)
