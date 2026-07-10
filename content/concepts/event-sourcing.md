---
layout: default
title: "Event Sourcing & CQRS in System Design"
description: "Complete guide to Event Sourcing and CQRS in system design interviews. Event stores, command vs query separation, replay, projections, Kafka as event log."
permalink: /concepts/event-sourcing/
---

# Event Sourcing & CQRS - Complete Deep Dive

> **Prerequisites:** [Message Queues](/concepts/message-queues/), [Database Sharding](/concepts/database-sharding/)
> **Used in:** [Stock Broker](/hld/StockBroker/), [Digital Wallet](/hld/DigitalWallet/)

---

## What is Event Sourcing?

Instead of storing the *current state* of data, you store every *event* (change) that happened to it. The current state is derived by replaying all events.

**Real-world analogy:** Think of your bank statement. The bank doesn't just store "balance = $5,000". It stores every transaction: +$3000 salary, -$50 groceries, -$200 rent, +$2250 refund. Your balance is *computed* from replaying all those transactions. If there's a dispute, they can trace exactly what happened.

```
Traditional (state-based):
  UPDATE account SET balance = 5000 WHERE user_id = 123
  (Previous states are lost forever)

Event Sourced:
  Event 1: AccountCreated { user: 123, balance: 0 }
  Event 2: MoneyDeposited { user: 123, amount: 3000 }
  Event 3: MoneyWithdrawn { user: 123, amount: 50 }
  Event 4: MoneyWithdrawn { user: 123, amount: 200 }
  Event 5: MoneyDeposited { user: 123, amount: 2250 }
  Current balance = replay all events = $5000
```

---

## What is CQRS?

**CQRS (Command Query Responsibility Segregation)** means separating the write path (commands) from the read path (queries) into different models, often different databases.

```
Traditional:
  ┌──────────────────────────┐
  │     Same Database         │
  │  (reads AND writes)       │
  │  Same schema for both     │
  └──────────────────────────┘

CQRS:
  ┌─────────────────┐       ┌─────────────────┐
  │  Write Model     │       │  Read Model      │
  │  (commands)      │──────▶│  (queries)       │
  │  Normalized      │ event │  Denormalized    │
  │  Append-only     │  sync │  Pre-computed    │
  └─────────────────┘       └─────────────────┘
```

---

## How Event Sourcing + CQRS Work Together

```
┌────────────────────────────────────────────────────────────────────┐
│                         WRITE SIDE                                  │
│                                                                    │
│  Command ──▶ Validate ──▶ Produce Event ──▶ Append to Event Store  │
│  "Transfer $100"         "MoneyTransferred"      (immutable log)   │
└─────────────────────────────────────────┬──────────────────────────┘
                                          │
                                          │ Events published
                                          ▼
┌────────────────────────────────────────────────────────────────────┐
│                        EVENT STORE                                  │
│                                                                    │
│  [ Event 1 ] [ Event 2 ] [ Event 3 ] ... [ Event N ]              │
│  (Kafka topic / EventStoreDB / DynamoDB append-only table)         │
└─────────────────────────────────────────┬──────────────────────────┘
                                          │
                                          │ Consumers read events
                                          ▼
┌────────────────────────────────────────────────────────────────────┐
│                         READ SIDE                                   │
│                                                                    │
│  Projection 1: User Balance (Redis)                                │
│  Projection 2: Transaction History (Postgres)                      │
│  Projection 3: Analytics Dashboard (ClickHouse)                    │
│  Projection 4: Search Index (Elasticsearch)                        │
└────────────────────────────────────────────────────────────────────┘
```

---

## Key Concepts

### Event Store

The single source of truth. An append-only log of all events. Never update, never delete.

```
Event Store (ordered, immutable):
┌──────┬─────────────────────┬───────────────────────────────────────┐
│ Seq  │ Timestamp           │ Event                                 │
├──────┼─────────────────────┼───────────────────────────────────────┤
│ 1    │ 2024-01-01 10:00:00 │ AccountCreated { id: A1, owner: Bob } │
│ 2    │ 2024-01-01 10:05:00 │ MoneyDeposited { id: A1, amt: 1000 } │
│ 3    │ 2024-01-01 11:00:00 │ MoneyWithdrawn { id: A1, amt: 200 }  │
│ 4    │ 2024-01-01 12:30:00 │ MoneyTransferred { from: A1, to: A2} │
└──────┴─────────────────────┴───────────────────────────────────────┘
```

### Commands vs Events

| | Commands | Events |
|---|---|---|
| Tense | Imperative ("TransferMoney") | Past tense ("MoneyTransferred") |
| Can fail? | Yes (validation) | No (already happened) |
| Mutable? | N/A | Immutable |
| Example | `CreateOrder { items: [...] }` | `OrderCreated { orderId: 123 }` |

### Projections

Materialized views built from events. Each projection is optimized for a specific read pattern.

```
Same events → multiple projections:

Events: [OrderCreated, ItemAdded, ItemAdded, OrderPaid, OrderShipped]

Projection 1 (Order Status API):
  { orderId: 123, status: "shipped", total: $50 }

Projection 2 (Analytics Dashboard):
  { daily_orders: 1542, revenue: $78,000 }

Projection 3 (Search Index):
  { orderId: 123, items: ["book", "pen"], searchable: true }
```

### Replay

Since all events are stored, you can:
- Rebuild any projection from scratch
- Fix bugs in projection logic and re-derive correct state
- Create new projections retroactively
- Debug issues by replaying what happened

---

## Kafka as an Event Store

Kafka is commonly used as the event store because:

```
┌─────────────────────────────────────────────────────────┐
│  Kafka Topic: "wallet-events"                           │
│                                                         │
│  Partition 0 (user_id % N = 0):                        │
│  [ev1][ev2][ev5][ev8]...                               │
│                                                         │
│  Partition 1 (user_id % N = 1):                        │
│  [ev3][ev4][ev6][ev9]...                               │
│                                                         │
│  Partition 2 (user_id % N = 2):                        │
│  [ev7][ev10][ev11]...                                  │
│                                                         │
│  Properties:                                            │
│  - Append-only (immutable)                              │
│  - Ordered within partition                             │
│  - Configurable retention (forever if needed)           │
│  - Multiple consumer groups (multiple projections)      │
│  - High throughput (millions of events/sec)             │
└─────────────────────────────────────────────────────────┘
```

---

## Types / Approaches Comparison

| Approach | Write Model | Read Model | Sync Mechanism | Consistency |
|---|---|---|---|---|
| Simple CRUD | Same DB | Same DB | N/A (one model) | Strong |
| CQRS only | Write DB | Read replicas | DB replication | Eventual |
| Event Sourcing only | Event store | Derive from events | Replay | Strong (on replay) |
| Event Sourcing + CQRS | Event store | Separate read DBs | Event consumers | Eventual |

---

## When to Use

### Use Event Sourcing When:
- You need a complete **audit trail** (finance, healthcare, compliance)
- You need **time-travel debugging** (replay events to reproduce bugs)
- Multiple **read models** are needed from the same write data
- Domain is naturally event-driven (orders, payments, trades)
- You need to answer "what was the state at time T?"

### Use CQRS When:
- Read and write patterns are vastly different
- Reads need denormalized data across multiple aggregates
- Write throughput and read throughput need to scale independently
- Different consistency requirements for reads vs writes

### When NOT to Use:
- Simple CRUD applications (blog, basic todo app)
- When eventual consistency is unacceptable for reads
- Small teams without distributed systems experience
- When the domain doesn't have meaningful events
- When storage costs for retaining all events are prohibitive

---

## Real-World Examples

| Company | Use Case |
|---|---|
| **Stripe** | Every payment state change is an event. Enables dispute resolution, refunds, and audit trails. |
| **LinkedIn** | Uses Kafka as central event log for all data changes. Services build their own projections. |
| **Uber** | Trip lifecycle events (requested, matched, started, completed). CQRS for trip tracking vs billing. |
| **Event Store Ltd** | Created EventStoreDB specifically for event sourcing. |
| **Goldman Sachs** | Trade events for regulatory compliance and audit. |

---

## Common Interview Questions

**Q: "Why not just use a regular database with an audit log table?"**
A: An audit log is a secondary artifact — it can drift from reality. With event sourcing, the event log IS the source of truth. You can't have inconsistency between state and history because state is derived from history. Also, with event sourcing you can rebuild projections, create new read models retroactively, and replay for debugging.

**Q: "How do you handle the fact that replaying millions of events to get current state is slow?"**
A: Use **snapshots**. Periodically save the current state (e.g., every 1000 events). To rebuild, load the latest snapshot and replay only events after it. For example: Snapshot at event 10,000 (balance=$5000) → replay events 10,001 to 10,050 → current state.

**Q: "What about eventual consistency between write and read models?"**
A: Yes, there's a propagation delay (usually milliseconds to seconds). For most use cases this is fine. If a user MUST read their own write immediately, use "read-your-writes" consistency: after a command, read from the write model (event store) until the projection catches up.

**Q: "How do you handle schema evolution when event formats change?"**
A: Use event versioning. Store a version field with each event. Consumers (projections) must handle all versions via upcasting — transforming old event formats to new ones on read. Never modify stored events.

**Q: "What's the difference between Event Sourcing and Change Data Capture (CDC)?"**
A: CDC captures changes FROM a database (after the fact). Event Sourcing captures changes AS the primary storage (events are the source of truth, not derived from a DB). CDC is a way to get events out of a traditional DB. Event Sourcing means events ARE your DB.

---

[← Back to Fundamentals](/concepts) | [Next: API Design →](/concepts/api-design/)
