---
layout: default
title: "Message Queues in System Design - Kafka, SQS, RabbitMQ"
description: "Complete guide to message queues for system design interviews. Kafka vs SQS vs RabbitMQ, pub-sub, point-to-point, ordering, exactly-once delivery, dead letter queues."
permalink: /concepts/message-queues/
---

# Message Queues - Complete Deep Dive

> **Prerequisites:** [Scalability](/concepts#scalability), [Microservices vs Monolith](/concepts#microservices-vs-monolith)
> **Used in:** [Chat System](/hld/ChatSystem), [Notification System](/hld/NotificationSystem), [Digital Wallet](/hld/DigitalWallet), [Zomato](/hld/Zomato), [Stock Broker](/hld/StockBroker)

---

## What is a Message Queue?

A message queue is a buffer that sits between a producer (sender) and a consumer (receiver). The producer puts messages in the queue. The consumer reads them at its own pace.

**Real-world analogy:** A mailbox. You (producer) drop a letter in. The recipient (consumer) picks it up whenever they're free. You don't need to wait for them to be home. The mailbox (queue) decouples the sender from the receiver.

```
Without queue (synchronous):
  Service A calls Service B directly
  If B is slow → A waits (blocks)
  If B is down → A fails

With queue (asynchronous):
  Service A → puts message in Queue → returns immediately
  Service B → reads from Queue when ready → processes
  If B is slow → messages queue up, A is unaffected
  If B is down → messages wait in queue until B recovers
```

---

## Why Use Message Queues?

| Benefit | Example |
|---|---|
| **Decoupling** | Payment Service doesn't need to know about Email Service, SMS Service, Push Service |
| **Async processing** | User uploads video → response immediately → encoding happens in background |
| **Load leveling** | Burst of 10K orders → queue absorbs → workers process at steady 1K/sec |
| **Reliability** | If consumer crashes, message stays in queue. No data loss. |
| **Fan-out** | One event → consumed by multiple services independently |

---

## Messaging Patterns

### 1. Point-to-Point (Queue)

One message is consumed by exactly ONE consumer. Once processed, message is removed.

```
Producer → [Queue] → Consumer A (gets message 1)
                   → Consumer B (gets message 2)
                   → Consumer C (gets message 3)

Each message processed exactly once by one consumer.
```

**Use case:** Task processing, job scheduling, order processing
**Example:** SQS, RabbitMQ (default mode)

### 2. Pub-Sub (Topic)

One message is delivered to ALL subscribers. Each subscriber gets a copy.

```
Publisher → [Topic] → Subscriber A (gets ALL messages)
                    → Subscriber B (gets ALL messages)
                    → Subscriber C (gets ALL messages)
```

**Use case:** Event broadcasting (order placed → notify inventory, analytics, email, all at once)
**Example:** Kafka topics, SNS, Redis Pub/Sub

### 3. Consumer Groups (Best of Both)

Messages are distributed among consumers within a group (point-to-point WITHIN a group), but multiple groups each get all messages (pub-sub ACROSS groups).

```
Topic: "order_events"
  → Consumer Group "notification-service": messages split among 3 workers
  → Consumer Group "analytics-service": same messages split among 2 workers
  → Consumer Group "inventory-service": single worker gets all

Each group sees ALL messages, but within a group, each message goes to one worker.
```

**This is how Kafka works.** It's the most common pattern in system design interviews.

---

## Delivery Guarantees

| Guarantee | Meaning | Trade-off |
|---|---|---|
| **At-most-once** | Message might be lost, never delivered twice | Fastest, lossy |
| **At-least-once** | Message is guaranteed delivered, but might be duplicated | Most common (SQS, Kafka default) |
| **Exactly-once** | Message delivered exactly once | Hardest to achieve, expensive |

**At-least-once is the standard for most systems.** You handle duplicates on the consumer side using idempotency.

```
Producer sends message → Broker acknowledges
Consumer reads message → processes → acknowledges (commits offset)

If consumer crashes AFTER processing but BEFORE acknowledging:
  → Broker re-delivers the message
  → Consumer sees it again (duplicate!)
  → Solution: check idempotency key before processing
```

---

## Message Ordering

**Kafka:** Messages within a PARTITION are ordered. Across partitions, no ordering guarantee.

```
Topic "orders" with 3 partitions:
  Partition 0: [order_1, order_4, order_7]  ← ordered within partition
  Partition 1: [order_2, order_5, order_8]  ← ordered within partition
  Partition 2: [order_3, order_6, order_9]  ← ordered within partition
  
But order_2 might be processed before order_1 (different partitions)
```

**How to guarantee order for a specific entity:** Use that entity's ID as the partition key.

```
All messages with userId="user_123" → hash("user_123") → always goes to Partition 1
→ All events for user_123 are ordered
```

**SQS Standard:** No ordering guarantee.
**SQS FIFO:** Ordered within a message group (similar to Kafka partitions).

---

## Kafka vs SQS vs RabbitMQ

| Feature | Kafka | SQS | RabbitMQ |
|---|---|---|---|
| Model | Log-based (append-only) | Queue (delete after read) | Queue + Exchange routing |
| Ordering | Within partition | No (Standard) / Yes (FIFO) | Within queue |
| Retention | Configurable (days/weeks/forever) | 4 days (max 14) | Until consumed |
| Replay | Yes (re-read old messages) | No (once read, gone) | No |
| Throughput | 1M+ messages/sec | ~3000 msg/sec per queue | ~20K msg/sec |
| Scaling | Add partitions | Unlimited (managed) | Add queues/nodes |
| Consumer groups | Built-in | Not native | Not native (use exchanges) |
| Managed option | Confluent, MSK | AWS SQS (fully managed) | CloudAMQP, Amazon MQ |
| Best for | Event streaming, CDC, high throughput | Simple async tasks, decoupling | Complex routing, RPC |

### When to Use Which

**Choose Kafka when:**
- High throughput (100K+ events/sec)
- Need to replay events (re-process historical data)
- Multiple consumers need the same events (consumer groups)
- Event sourcing / CDC pipeline
- Ordering matters per entity

**Choose SQS when:**
- Simple job/task queue
- Fully managed, zero ops
- Don't need replay
- Low-medium throughput is fine
- AWS ecosystem

**Choose RabbitMQ when:**
- Complex routing logic (route to different queues by header/topic)
- RPC pattern (request-reply)
- Need message priority
- Smaller scale

---

## Key Concepts

### Partitions (Kafka)

A topic is split into partitions. Each partition is an ordered, immutable log.

```
Topic: "payment_events" (3 partitions)

Partition 0: [msg_0, msg_3, msg_6, msg_9, ...]
Partition 1: [msg_1, msg_4, msg_7, msg_10, ...]
Partition 2: [msg_2, msg_5, msg_8, msg_11, ...]

Each partition is consumed by ONE consumer in a consumer group.
More partitions = more parallelism.
```

**Rule of thumb:** Number of partitions >= number of consumers in a group. If you have 10 consumers, you need at least 10 partitions.

### Offset (Kafka)

Each message in a partition has a sequential offset (position number). Consumer tracks which offset it has processed.

```
Partition 0: [offset_0, offset_1, offset_2, offset_3, offset_4]
                                              ^
                                    consumer has processed up to here
                                    (committed offset = 3)
```

If consumer restarts, it resumes from committed offset (no duplicate processing if committed correctly).

### Visibility Timeout (SQS)

When a consumer reads a message, it becomes "invisible" to other consumers for a timeout period. If consumer doesn't delete it within that time, it becomes visible again (re-delivered).

```
Message in queue → Consumer A reads it → message invisible for 30s
  - Consumer A processes successfully → DELETE message → done
  - Consumer A crashes → 30s timeout → message becomes visible → Consumer B picks it up
```

### Dead Letter Queue (DLQ)

Messages that fail processing N times get moved to a separate queue for investigation.

```
Main Queue → Consumer fails → retry 1 → fail → retry 2 → fail → retry 3 → fail
  ↓
Dead Letter Queue → message sits here → alarm fires → engineer investigates
```

---

## Back-Pressure

**Problem:** Producer generates messages faster than consumer can process. Queue grows unbounded → runs out of memory/disk.

**Solutions:**

| Strategy | How |
|---|---|
| Bounded queue + reject | Queue has max size. When full, producer gets error (back-pressure signal) |
| Rate limit producers | Producer can only publish N messages/sec |
| Auto-scale consumers | Add more consumer instances when queue depth grows |
| Alert on queue depth | Alarm when queue > threshold → manual intervention |

---

## Common Interview Patterns

### Pattern 1: Async Processing

```
User action → API responds immediately → Queue → Worker processes in background
```
Example: Video upload → "Upload successful" → Queue → Encoding worker → S3

### Pattern 2: Event Fan-out

```
Order placed → Kafka topic "order_events"
  → Notification Service (sends email)
  → Inventory Service (reduces stock)
  → Analytics Service (tracks metrics)
  → Fraud Service (checks patterns)
```

### Pattern 3: Work Distribution

```
10,000 emails to send → SQS queue → 20 Lambda workers → processed in parallel
```

### Pattern 4: Rate Smoothing

```
Flash sale: 100K requests/sec spike → Queue buffers → Workers process at steady 10K/sec
(Queue absorbs the spike, prevents DB from dying)
```

---

## Common Interview Questions

**Q: "Why not just call the service directly?"**
A: Direct calls create tight coupling, no retry on failure, and blocking. With a queue: services are decoupled, messages survive failures, and consumers process at their own pace.

**Q: "How do you handle duplicate messages?"**
A: At-least-once delivery means duplicates will happen. Handle on consumer side with idempotency keys — check if this messageId was already processed before executing.

**Q: "How do you ensure ordering?"**
A: Kafka: use entity ID as partition key (all events for same entity go to same partition = ordered). SQS FIFO: use message group ID.

**Q: "What if the queue goes down?"**
A: Managed queues (SQS, Confluent Kafka) are multi-AZ replicated. If self-hosted: Kafka replicates across brokers (replication factor=3 means 3 copies). Single point of failure is rare.

**Q: "When would you NOT use a queue?"**
A: When you need a synchronous response (user is waiting for the result). When latency must be < 100ms. When the operation is idempotent and can be retried at the caller level without a queue.

---

[← Back to Fundamentals](/concepts) | [← Load Balancing](/concepts/load-balancing/) | [Next: Database Sharding →](/concepts/database-sharding/)
