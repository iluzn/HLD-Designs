---
layout: default
title: "Leader Election in System Design - Raft, ZooKeeper, Bully"
description: "Complete guide to leader election in system design interviews. Bully algorithm, Raft consensus, ZooKeeper ephemeral nodes, split-brain prevention."
permalink: /concepts/leader-election/
---

# Leader Election - Complete Deep Dive

> **Prerequisites:** [Distributed Locking](/concepts/distributed-locking/), [CAP Theorem](/concepts/cap-theorem/)
> **Used in:** [Job Scheduler](/hld/JobScheduler/), [Key-Value Store](/hld/KeyValueStore/)

---

## What is Leader Election?

Leader election is the process of choosing one node in a distributed system to act as the coordinator (leader) while others are followers. The leader makes decisions, assigns work, or handles writes — preventing conflicts from multiple nodes acting independently.

**Real-world analogy:** A classroom group project. Without a leader, everyone works on the same section (conflicts) or nobody does certain parts (gaps). Electing a team lead means one person assigns tasks, tracks progress, and resolves conflicts. If the lead is absent, the group picks a new one.

```
Without leader:
  Node A: "I'll process job 42"
  Node B: "I'll process job 42"     ← Duplicate work!
  Node C: "I'll process job 42"

With leader:
  Leader: "Node A → job 42, Node B → job 43, Node C → job 44"
  Followers: execute assigned work only
```

---

## Why Do We Need a Leader?

| Problem | Without Leader | With Leader |
|---|---|---|
| Write conflicts | Multiple nodes accept conflicting writes | Leader serializes all writes |
| Job scheduling | Jobs executed multiple times | Leader assigns each job once |
| Coordination | Nodes make inconsistent decisions | Leader is single decision point |
| Resource allocation | Race conditions | Leader distributes fairly |

**Key use cases:**
- Database primary (handles all writes, replicates to followers)
- Job scheduler coordinator (assigns tasks to workers)
- Distributed lock manager (one authority)
- Message queue partition leader (handles reads/writes for partition)

---

## How It Works

### The Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│                    Leader Election Lifecycle                  │
│                                                             │
│  ┌──────────┐    election     ┌──────────┐                 │
│  │ Follower  │──────────────▶│  Candidate │                 │
│  │           │◀──────────────│            │                 │
│  └──────────┘   lost vote    └─────┬──────┘                │
│       ▲                            │                        │
│       │                            │ won majority           │
│       │ leader dies                ▼                        │
│       │                      ┌──────────┐                   │
│       └──────────────────────│  Leader   │                  │
│                              │ (active)  │                  │
│                              └──────────┘                   │
│                                                             │
│  Leader maintains position via heartbeats                   │
│  If heartbeats stop → followers trigger new election        │
└─────────────────────────────────────────────────────────────┘
```

---

## Approaches to Leader Election

### 1. Bully Algorithm (Simplest)

The node with the highest ID (or priority) always becomes leader.

```
Nodes: [N1, N2, N3, N4, N5]  (N5 = highest priority)

N5 is leader. N5 crashes.

Step 1: N3 detects N5 is down (missed heartbeat)
Step 2: N3 sends ELECTION to all higher nodes (N4, N5)
Step 3: N4 responds "I'm alive, I'll take over"
        N5 doesn't respond (dead)
Step 4: N4 sends ELECTION to N5 (no response)
Step 5: N4 declares itself leader
Step 6: N4 sends COORDINATOR message to all: "I'm the new leader"

Timeline:
  N3: "Election!" ──▶ N4: "I'm here, back off"
                       N4: "Election!" ──▶ N5: (dead, no response)
                       N4: "I am the leader now."
```

**Pros:** Simple to implement. Deterministic.
**Cons:** Highest-ID node always wins (even if it's slow). Frequent elections if top node is flaky.

---

### 2. Raft Consensus (Industry Standard)

Leader elected by majority vote. Uses terms (epochs) and randomized timeouts to prevent conflicts.

```
Raft Election Process:
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. Election timeout expires on a follower (random 150-300ms)   │
│  2. Follower becomes CANDIDATE                                  │
│  3. Candidate increments term, votes for itself                 │
│  4. Candidate requests votes from all other nodes               │
│  5. Other nodes vote YES if:                                    │
│     - They haven't voted in this term                           │
│     - Candidate's log is at least as up-to-date as theirs      │
│  6. If candidate gets majority votes → becomes LEADER           │
│  7. Leader sends heartbeats to maintain authority                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Example with 5 nodes:
  Term 1: N1 is leader, sending heartbeats
  Term 1: N1 crashes (heartbeats stop)
  ...150ms pass...
  Term 2: N3's election timeout fires first (random!)
  Term 2: N3 → Candidate, votes for itself (1/5)
  Term 2: N3 asks N2, N4, N5 for votes
  Term 2: N2 votes YES (2/5), N4 votes YES (3/5) ← MAJORITY!
  Term 2: N3 is now leader
  Term 2: N3 sends heartbeats to all
```

**Why randomized timeouts?** Prevents all nodes from starting elections simultaneously (which would split votes and delay election).

---

### 3. ZooKeeper Ephemeral Nodes

Uses ZooKeeper's coordination primitives. Nodes create ephemeral sequential znodes — lowest sequence number becomes leader.

```
ZooKeeper:  /election/
            ├── node_0000000001  (created by Server A) ← LEADER (lowest)
            ├── node_0000000002  (created by Server B)
            └── node_0000000003  (created by Server C)

How it works:
  1. Each server creates an ephemeral sequential znode under /election/
  2. Server checks: "Am I the lowest sequence number?"
     - YES → I am the leader
     - NO  → Watch the node just before me (not all nodes!)
  3. If leader crashes → ephemeral node auto-deleted by ZooKeeper
  4. Next node in sequence sees deletion → becomes new leader

Ephemeral = auto-deleted when session dies (server crash/disconnect)
Sequential = ZooKeeper assigns incrementing numbers
```

```
Server A crashes:
  /election/
  ├── node_0000000001  ← DELETED (session expired)
  ├── node_0000000002  (Server B was watching 001)
  │                     → B is now lowest → B is leader!
  └── node_0000000003  (Server C watches 002, not affected yet)
```

---

## Comparison Table

| Feature | Bully | Raft | ZooKeeper |
|---|---|---|---|
| Complexity | Low | High | Medium (uses ZK) |
| Consistency | Weak | Strong (linearizable) | Strong (ZAB protocol) |
| Speed of election | Fast | 150-300ms | Fast (session timeout) |
| Split-brain safe? | No | Yes (majority quorum) | Yes (majority quorum) |
| External dependency | None | None | Requires ZK cluster |
| Replication | Not included | Built-in log replication | Separate from election |
| Used by | Simple systems | etcd, CockroachDB, TiKV | Kafka, HBase, Hadoop |

---

## Split-Brain Problem

The most dangerous failure in leader election: **two nodes both think they're leader**.

```
Network Partition:
┌───────────────────────────┐    ┌───────────────────────────┐
│  Partition A               │    │  Partition B               │
│                           │    │                           │
│  N1 (leader)              │    │  N3, N4, N5               │
│  N2                       │    │  "N1 is dead!"            │
│                           │    │  "Elect N3 as leader"     │
│  N1 thinks it's leader    │    │  N3 thinks it's leader    │
│  (it still is, in its     │    │                           │
│   partition)              │    │                           │
└───────────────────────────┘    └───────────────────────────┘

DANGER: Two leaders accepting writes → data corruption!
```

### Solutions to Split-Brain

**1. Majority Quorum (Raft/ZooKeeper approach)**
```
5 nodes total. Need 3+ votes to be leader.
Partition A: 2 nodes → can't get majority → old leader steps down
Partition B: 3 nodes → gets majority → elects new leader
Only one partition can have a leader at any time!
```

**2. Fencing Tokens**
```
Each leader gets an incrementing token (epoch/term).
Leader 1: token = 5
Leader 2: token = 6 (elected after partition)

All writes must include the token.
Storage rejects writes with token < current max.
Even if old leader (token=5) sends a write, storage rejects it.
```

**3. Lease-Based Leadership**
```
Leader holds a time-limited lease (e.g., 30 seconds).
Must renew before expiry. If network partition prevents renewal,
leader's lease expires and it must step down.
New leader elected only after old lease expires.
```

---

## When to Use / When NOT to Use

### Use Leader Election When:
- **Database replication** — one primary handles writes
- **Job scheduling** — one coordinator assigns tasks
- **Distributed locks** — one authority grants locks
- **Consensus** — one node proposes and commits decisions
- **Cache invalidation** — one node coordinates cache coherence

### When NOT to Use:
- **Stateless services** — no coordination needed, just load balance
- **Read-heavy workloads** — all replicas can serve reads
- **Event-driven architectures** — consumers are independent
- **When single leader is a bottleneck** — consider leaderless (Cassandra)
- **Simple systems** — if you have 2-3 nodes, a simpler approach (manual failover) might suffice

---

## Real-World Examples

| System | Mechanism | Details |
|---|---|---|
| **Kafka** | ZooKeeper (legacy) / KRaft | Each partition has a leader broker. ZK managed elections. New KRaft mode uses Raft internally. |
| **etcd** | Raft | Core coordination service for Kubernetes. Leader handles all writes. |
| **Redis Sentinel** | Quorum voting | Sentinel nodes vote to elect new primary when current one fails. |
| **CockroachDB** | Raft | Each range (data shard) has its own Raft group with elected leader. |
| **MongoDB** | Modified Raft | Replica set election. Priority-based voting. |

---

## Common Interview Questions

**Q: "How does your job scheduler ensure only one node processes each job?"**
A: Use leader election. One node is elected leader (via ZooKeeper or Raft). The leader is responsible for assigning jobs to workers. Workers only execute jobs assigned to them. If the leader crashes, a new one is elected and takes over the assignment duty. Jobs in progress continue on workers unaffected.

**Q: "What happens during a network partition?"**
A: With quorum-based election (Raft/ZooKeeper), only the partition with majority can have a leader. The minority partition's old leader will fail to get heartbeat acknowledgments and step down. No split-brain. The minority partition is unavailable for writes until the partition heals.

**Q: "How fast is leader election? What's the downtime?"**
A: Typically 1-10 seconds. Raft: election timeout is 150-300ms, but detecting leader failure takes 1-3 missed heartbeats (seconds). ZooKeeper: session timeout (default 30s, tunable to 2-5s). During election, the system is unavailable for writes. Reads from followers may still work.

**Q: "Raft vs ZooKeeper — which would you choose?"**
A: If building a new distributed system from scratch — embed Raft (no external dependency, used by etcd, CockroachDB). If already running ZooKeeper in the infra (Kafka, Hadoop ecosystem) — use ZK for leader election (simpler to implement, battle-tested). ZooKeeper is easier to use but adds operational complexity.

---

[← Back to Fundamentals](/concepts) | [Next: Saga Pattern →](/concepts/saga-pattern/)
