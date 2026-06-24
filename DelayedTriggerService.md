---
layout: default
title: "Delayed Trigger Service"
description: "System design for Delayed Trigger Service - architecture, deep dives, and trade-offs"
---

# HLD: Delayed Trigger Service

## 1. Understanding the Problem

A delayed trigger service lets internal services register a callback with a future fire time (e.g., "ping me back in 30 minutes"). When the delay elapses, the service POSTs a response to a callback URL the caller provided. It's the building block behind reminders, payment retries, abandoned-cart nudges, "release the seat hold in 7 minutes," and "auto-cancel the order if not paid in 15 min."

## 1.5. Naive First Cut

```mermaid
flowchart LR
  Caller["Caller service"] --> API["Trigger API"]
  API --> Mem["In-process map<br/>triggerId to fireAt"]
  Timer["ScheduledExecutorService"] --> Mem
  Timer --> Caller

  classDef client fill:#FFD8A8,stroke:#E8590C,color:#000
  classDef service fill:#B2F2BB,stroke:#2F9E44,color:#000
  classDef data fill:#FFE066,stroke:#F08C00,color:#000
  class Caller client
  class API,Timer service
  class Mem data
```

| Color | Meaning |
|---|---|
| 🟧 client | calling service |
| 🟩 service | application service |
| 🟨 data | storage / state |

Why this breaks under real constraints:

- **Process crash loses every pending trigger** — no durability. If the box reboots, every "fire in 10 min" is gone.
- **One JVM caps throughput** — `ScheduledExecutorService` is fine for thousands of timers, hopeless at millions.
- **No horizontal scale** — two replicas would each fire the callback, giving duplicates.
- **No retry on callback failure** — if the caller's endpoint is down at fire time, the trigger is silently lost.
- **No long delays** — JVM heap pressure with millions of `DelayedTask` objects.
- **Hot fire-time spikes** — "fire at top of the hour" thundering herd would saturate the executor.

The rest of the doc evolves this into a durable, sharded, bucketed scheduler with a timing-wheel front end and at-least-once HTTP callback delivery.

## 1.7. Prior Art We're Drawing From

- **[Airbnb Dynein](https://medium.com/airbnb-engineering/dynein-building-a-distributed-delayed-job-queueing-system-93ab10f05f99)** — short-delay jobs (≤15 min) go straight to SQS; long-delay jobs sit in DynamoDB and a sweeper moves them to SQS as fire time approaches. We borrow this two-tier split.
- **[Apache Kafka Purgatory + Hierarchical Timing Wheels](https://www.confluent.io/blog/apache-kafka-purgatory-hierarchical-timing-wheels/)** — O(1) insert/expire for millions of in-memory timers across multiple resolutions. We use this for the hot, near-future tier.
- **[AWS SQS delay queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-delay-queues.html)** — built-in 0–15 min delay primitive. We treat SQS as the "execution lane" once a trigger is within 15 min.
- **[Stripe Idempotency-Key](https://stripe.com/docs/api/idempotent_requests)** — caller-supplied idempotency key on register so repeated submissions don't create duplicate triggers.
- **[Netflix Maestro](https://blog.bytebytego.com/p/how-netflix-orchestrates-millions)** — sharded execution layer; we use the same partition-by-triggerId model so each shard is independently leader-led.

When deep dives below cite "borrowing from Dynein" or "borrowing from Kafka Purgatory," that's what they mean.

## Technology Choices

| Tier / Purpose | What it stores | Access pattern | Primary pick | Alternatives |
|---|---|---|---|---|
| OLTP trigger store | triggerId, callerId, callbackUrl, fireAt, payload, status, idempotencyKey | write-heavy on register, point read on fire, range scan by fireAt bucket | Cassandra / DynamoDB (partition key = bucket) | ScyllaDB, Bigtable |
| Short-delay execution lane | trigger envelope, retries metadata | FIFO with per-msg delay 0–15 min | SQS (delay queue) | RabbitMQ delayed exchange, Redis Streams + ZSET |
| In-memory timer wheel | next-tick triggers per shard | O(1) insert/expire | hierarchical timing wheel in-process | Netty `HashedWheelTimer`, Redis sorted set per bucket |
| Long-delay sweep index | fireAt bucket (1-min) → list of triggerIds | range scan by upcoming bucket | secondary index on Cassandra (partition = bucket minute) | DynamoDB GSI on `fireAtMinute` |
| Idempotency cache | (callerId, idempotencyKey) → triggerId | TTL'd KV | Redis with TTL = max delay + grace | DynamoDB with TTL |
| Audit / DLQ | failed callbacks after N retries | append-only | Kafka topic + S3 sink | Kinesis Firehose |

Two non-obvious picks worth a note:

**Why Cassandra for the trigger store, not Postgres.** Writes dominate (every register is a write, every fire is an update). The access pattern is `partition key = fireAt-bucket` → range scan within the bucket. That's exactly what wide-column stores are built for. Postgres would work but you'd be hand-rolling sharding and the time-series indexing.

**Why a separate timing wheel in-process when the queue already has delay.** SQS caps at 15-minute delay, and even within that window, draining millions of messages at the exact same fireAt second is hard to control. The timing wheel gives precise local scheduling and feeds SQS only with messages that are due in the next few seconds.

## 2. Functional Requirements

**Core:**

1. `registerTrigger(callerId, callbackUrl, payload, delaySeconds, idempotencyKey)` returns a `triggerId`. Persists the intent durably.
2. At `now + delaySeconds`, the service POSTs `{triggerId, payload}` to `callbackUrl` and considers the trigger fired only after a 2xx ack.
3. `cancelTrigger(triggerId)` — best-effort cancel before fire time.

**Below the line (out of scope for the interview):**

- Recurring / cron-like triggers.
- Workflow chaining (trigger A fires trigger B).
- Per-caller priority / rate limits beyond fairness.
- Cross-region active-active.

## 3. Non-Functional Requirements

**Core:**

- **Durability** — once `register` returns 200, the trigger must fire even if every component crashes. No silent drops.
- **On-time firing** — P99 jitter < 1s for short delays, < 5s for long (>15 min) delays.
- **Throughput** — 100K registers/sec, 100K fires/sec at peak.
- **At-least-once + idempotent** — callback may fire twice; caller must dedupe via `triggerId`.

**Below the line:** strict-once delivery, sub-millisecond jitter, multi-region failover.

## 4. Core Entities

- **Trigger** — id, callerId, callbackUrl, payload, fireAt, status (PENDING / IN_FLIGHT / FIRED / FAILED / CANCELLED), attemptCount.
- **Caller** — registered service with auth credentials and (optionally) per-tenant rate limits.
- **Bucket** — a 1-minute window keyed by floor(fireAt). Triggers live in their bucket's row in Cassandra.
- **Dispatcher** — worker that turns "trigger is due" into "HTTP POST to callbackUrl."
- **Sweeper** — process that scans upcoming buckets and pushes due-soon triggers into the in-memory wheel.

## 5. API / System Interface

```http
POST /v1/triggers
Authorization: Bearer <caller JWT>
Idempotency-Key: <client-supplied uuid>

{
  "callbackUrl": "https://orders.internal/seat-hold/expire",
  "payload":     {"holdId": "h_8c4"},
  "delaySeconds": 420
}
```

```http
200 OK
{ "triggerId": "trg_01HZ...", "fireAt": "2026-06-12T14:31:00Z" }
```

```http
DELETE /v1/triggers/{triggerId}
Authorization: Bearer <caller JWT>
```

The dispatcher fires this against the caller:

```http
POST <callbackUrl>
X-Trigger-Id: trg_01HZ...
X-Trigger-Attempt: 1

{ "triggerId": "trg_01HZ...", "payload": {"holdId": "h_8c4"} }
```

Caller responds 2xx for ack. Anything else (or timeout) → retry with exponential backoff, eventually DLQ.

Security notes: caller authenticated via short-lived JWT minted for the service identity; `callbackUrl` validated against an allow-list of registered base URLs per caller (prevents using us as an SSRF springboard). `payload` size capped at 4 KB.

## 6. High-Level Design

We'll layer in components as the three FRs demand them.

### FR1: Register a trigger

```mermaid
flowchart LR
  Caller["Caller"] --> API["Trigger API"]
  API --> Idem["Redis<br/>idempotency cache"]
  API --> DB["Cassandra<br/>partition by fireAt-minute"]

  classDef client fill:#FFD8A8,stroke:#E8590C,color:#000
  classDef service fill:#B2F2BB,stroke:#2F9E44,color:#000
  classDef data fill:#FFE066,stroke:#F08C00,color:#000
  class Caller client
  class API service
  class Idem,DB data
```

1. Caller POSTs to the **Trigger API** with caller JWT + `Idempotency-Key`.
2. API checks Redis for `(callerId, idempotencyKey)` — if present, returns the cached triggerId. Idempotency exists to keep retries from creating duplicate triggers when the API responds slowly to the caller.
3. API computes `fireAt = now + delaySeconds`, generates a ULID `triggerId`, writes the row to Cassandra. Partition key is the **1-minute bucket** containing `fireAt`; clustering key is `triggerId`. This shape lets the sweeper later say "give me all triggers in bucket M" with one partition read.
4. API caches the `triggerId` in Redis under the idempotency key with TTL = `delaySeconds + grace`.
5. API returns 200 to the caller.

### FR2: Fire the callback at the right time

We split by delay length, borrowing from Dynein:

- **Short delay (≤ 15 min)** — push directly to SQS with `DelaySeconds = delay`. SQS handles the wait, the dispatcher picks up the message when visible. We keep the Cassandra row as the source of truth.
- **Long delay (> 15 min)** — leave it in Cassandra. The **Sweeper** scans the next bucket every 30 s and, when within 15 min of fireAt, pushes into SQS the same way. This caps the in-memory state and lets the long tail live cheaply in Cassandra.

```mermaid
flowchart LR
  DB["Cassandra"] --> Sweeper["Sweeper<br/>scans next bucket"]
  Sweeper --> Wheel["Timing wheel<br/>per shard"]
  Wheel --> SQS["SQS delay queue"]
  API2["Trigger API"] --> SQS
  SQS --> Disp["Dispatcher pool"]
  Disp --> CallerCB["Caller callback URL"]

  classDef client fill:#FFD8A8,stroke:#E8590C,color:#000
  classDef edge fill:#A5D8FF,stroke:#1971C2,color:#000
  classDef service fill:#B2F2BB,stroke:#2F9E44,color:#000
  classDef async fill:#D0BFFF,stroke:#6741D5,color:#000
  classDef data fill:#FFE066,stroke:#F08C00,color:#000
  class CallerCB client
  class API2,Disp,Sweeper service
  class Wheel,SQS async
  class DB data
```

1. Sweeper runs per shard, leader-elected via ZooKeeper / etcd. Each shard owns a slice of `triggerId hash space` so two replicas can't sweep the same partition. Leader election is needed because a partition without an owner stalls; two owners would double-fire.
2. Every 30 s, the leader scans Cassandra partition `bucket = floor((now + 15m) / 1m)` — the bucket that's about to enter the SQS-eligible window.
3. For each row, it inserts into the in-process **hierarchical timing wheel** (Kafka Purgatory style) keyed by `fireAt`. This is O(1) per insert and supports millions of pending timers per shard.
4. When a wheel slot expires, the entry is enqueued to SQS with `DelaySeconds = fireAt - now` (small positive value — usually 0–60 s of slack). SQS is the durable handoff between the timing wheel and the dispatchers; if the shard process dies after the wheel fires but before the SQS send, the row is still in Cassandra and the next leader's sweeper picks it up.
5. **Dispatcher pool** consumes SQS, looks up the row in Cassandra, and POSTs to `callbackUrl`. Why go back to Cassandra: the SQS message holds only `triggerId` to keep it small and to ensure the dispatcher always reads the current `status` (the trigger may have been cancelled in flight).
6. On 2xx, dispatcher writes `status = FIRED` to Cassandra and deletes the SQS message.
7. On non-2xx or timeout, dispatcher requeues to SQS with exponential backoff (`DelaySeconds`), incrementing `attemptCount`. After N attempts it goes to a DLQ topic.

**Why the wheel is needed even though SQS has a built-in delay.** SQS's per-message delay is precise to the second but limited to 15 min, and at scale we want to control fan-out into SQS — flooding SQS at the top of the hour with 200K messages all wanting `DelaySeconds=0` would cause throttling. The wheel acts as a **smoothing front-end**: it releases messages into SQS in sub-second slots so the dispatcher pool sees an even rate.

### FR3: Cancel a trigger

```mermaid
flowchart LR
  Caller2["Caller"] --> API3["Trigger API"]
  API3 --> DB2["Cassandra<br/>set status=CANCELLED"]
  Disp2["Dispatcher"] --> DB2
  Disp2 -.skips if cancelled.-> Drop["Discard"]

  classDef client fill:#FFD8A8,stroke:#E8590C,color:#000
  classDef service fill:#B2F2BB,stroke:#2F9E44,color:#000
  classDef data fill:#FFE066,stroke:#F08C00,color:#000
  class Caller2 client
  class API3,Disp2 service
  class DB2,Drop data
```

1. Caller hits `DELETE /triggers/{id}`. API sets `status = CANCELLED` in Cassandra (conditional on `status = PENDING`).
2. We **don't** try to remove from SQS or the wheel — too racy and SQS doesn't support targeted delete by content. Instead we let the dispatcher check status when the trigger fires.
3. Dispatcher reads the row at fire time, sees `CANCELLED`, drops the SQS message without firing the callback.
4. This is "lazy cancel": cancellation is durable instantly but the trigger may sit in the queue until its fire time. Acceptable because callers care that the callback **won't** fire, not when the slot is reclaimed.

## 6.5. Core Flows

### Flow A: Register + fire (short delay, ≤15 min)

```mermaid
sequenceDiagram
  participant C as Caller
  participant A as Trigger API
  participant R as Redis idem cache
  participant D as Cassandra
  participant Q as SQS
  participant W as Dispatcher
  C->>A: POST /triggers (delay=120s)
  A->>R: GET (callerId, idemKey)
  alt cache hit
    R-->>A: triggerId
    A-->>C: 200 (cached id)
  else miss
    A->>D: INSERT trigger row PENDING
    A->>Q: SendMessage DelaySeconds=120 body=triggerId
    A->>R: SET idemKey=triggerId TTL=180
    A-->>C: 200 triggerId
  end
  Note over Q: 120s elapse
  Q-->>W: receive message
  W->>D: SELECT trigger
  W->>C: POST callbackUrl payload
  alt 2xx
    C-->>W: 200
    W->>D: UPDATE status=FIRED
    W->>Q: DeleteMessage
  else non-2xx or timeout
    W->>Q: ChangeMessageVisibility backoff
  end
```

1. Caller POSTs with delay 120s. API checks idempotency, persists to Cassandra, sends an SQS message with `DelaySeconds=120`.
2. After 120s SQS makes the message visible. Dispatcher receives it and looks up the trigger row.
3. Dispatcher POSTs the payload to the caller's `callbackUrl`.
4. On 2xx, mark `FIRED` and delete from SQS. **Failure path:** on 5xx or timeout, dispatcher pushes the message back with exponential `ChangeMessageVisibility` (e.g., 10s, 30s, 2m, 10m, 30m). After 6 attempts it goes to DLQ.
5. **Non-obvious failure path:** dispatcher crashes after POST but before deleting from SQS. SQS visibility timeout expires, another dispatcher receives the message, POSTs again. The caller is expected to dedupe on `triggerId` — at-least-once is the contract.

### Flow B: Long delay (> 15 min)

```mermaid
sequenceDiagram
  participant C as Caller
  participant A as Trigger API
  participant D as Cassandra
  participant S as Sweeper
  participant TW as Timing wheel
  participant Q as SQS
  participant W as Dispatcher
  C->>A: POST /triggers (delay=2h)
  A->>D: INSERT bucket=now+2h status=PENDING
  A-->>C: 200 triggerId
  Note over S: every 30s
  S->>D: SELECT * FROM bucket=now+15m
  D-->>S: rows due in next 15min
  S->>TW: insert(fireAt, triggerId)
  Note over TW: wheel ticks
  TW->>Q: SendMessage triggerId DelaySeconds=remaining
  Q-->>W: receive
  W->>D: SELECT and POST callback
```

1. Trigger lands in Cassandra, partition keyed by `floor(fireAt / 1min)`.
2. Sweeper for that shard scans `bucket = now + 15min` every 30 s. Reading 15 min into the future gives slack for sweeper hiccups.
3. Each row is inserted into the in-process timing wheel.
4. The wheel ticks; when a slot expires, that triggerId is shipped to SQS with a small `DelaySeconds` (typically 0–60 s).
5. Dispatcher path is identical to Flow A from there.
6. **Non-obvious failure path:** sweeper leader crashes mid-scan. ZooKeeper detects the session loss, elects a new leader. The new leader rescans the bucket — Cassandra row's `status` is still `PENDING` so it gets re-inserted into the wheel. Possible duplicate fire if the old leader had already pushed to SQS; dedupe on `triggerId` handles it.

### Trigger state machine

```
PENDING ──register──> in Cassandra
   │
   ├──cancel─────────> CANCELLED (terminal)
   │
   └──dispatcher picks up──> IN_FLIGHT
            │
            ├──2xx ack───> FIRED (terminal)
            └──N retries fail──> FAILED (DLQ, terminal)
```

## 7. Potential Deep Dives

Self-audit found these as the real risk areas: (1) hot bucket at top-of-the-hour, (2) duplicate fires from dispatcher retries, (3) the long-delay tail in Cassandra, (4) callback failures with bad caller endpoints, (5) at-fire-time read amplification on Cassandra.

### 7.1 Hot bucket: thundering herd at popular fire times

**Bad** — single Cassandra partition keyed by `bucket = fireAt minute`. At 14:00:00 sharp every cron-aligned trigger lands in the same partition. Cassandra hot partition warning, sweeper read fan-out spikes, and the wheel inserts a million entries in one go. Latency for that bucket blows up.

**Good** — sub-shard the bucket. Partition key becomes `(bucket, hash(triggerId) % 64)`. The single 14:00 minute is now 64 partitions, evenly distributed. Sweeper runs 64 parallel reads (one per sub-shard).

**Great** — combine sub-sharding with **jittered fireAt**. Caller asks for `delay = 1h`; we add ±5s of jitter (`fireAt = requested + rand(-5s, +5s)`). This is invisible to the caller (they wanted "in roughly an hour") but spreads the load across many seconds. For callers that need exact timing (e.g., `delay = 0`), skip the jitter — usually the exact-timing callers are a small fraction. Borrowed from Airbnb Dynein's load-spreading approach.

```mermaid
flowchart LR
  Hot["fireAt=14:00:00<br/>1M triggers"] --> SubShard["Sub-shard by hash(triggerId) % 64"]
  SubShard --> P0["partition 14:00 #0"]
  SubShard --> P1["partition 14:00 #1"]
  SubShard --> Pn["partition 14:00 #63"]

  classDef data fill:#FFE066,stroke:#F08C00,color:#000
  classDef service fill:#B2F2BB,stroke:#2F9E44,color:#000
  class Hot data
  class SubShard service
  class P0,P1,Pn data
```

### 7.2 Exactly-once-ish: idempotency on register and dedupe at fire

**Bad** — caller retries the register request after a network blip. We create two trigger rows. Two callbacks fire at the same time. Caller is confused.

**Good** — caller supplies `Idempotency-Key`. API stores `(callerId, idemKey) → triggerId` in Redis with TTL covering the delay. Repeat requests get the same triggerId.

**Great** — combine register-side idempotency with **fire-side dedupe**. The dispatcher writes `status = FIRED` using a Cassandra `IF status = IN_FLIGHT` condition. If two dispatchers race on the same SQS message (visibility-timeout edge case), one wins the conditional write, the other gets a "no-op" and skips the callback. Borrowed from Stripe's idempotency layer pattern. The caller still has to be ready for at-least-once because the conditional write reduces but doesn't eliminate duplicates (window between POST returning 2xx and the conditional write).

### 7.3 Long-delay tail: 30-day triggers without bloating SQS

**Bad** — push 30-day triggers to SQS with `DelaySeconds=2592000`. SQS doesn't support that — caps at 15 min.

**Good** — keep them in Cassandra; sweeper migrates them to SQS within 15 min of fire. Already the design.

**Great** — bucket-aligned **Cassandra TTL** so old fired/cancelled rows auto-purge. Set TTL on inserts to `delaySeconds + 30 days` so audit data sticks around but the active table stays lean. For super-long delays (> 30 days, e.g., subscription renewal in 1 year), promote to a separate cold table (`triggers_cold`) and have a daily job migrate rows back into the hot table when they're a day away. Borrowed from Dynein's "secondary store for far-future" pattern.

### 7.4 Bad caller endpoints: blocking dispatchers

**Bad** — one caller's callback URL hangs (60s read timeout). Dispatcher pool fills with stuck threads. All other triggers stall. Single-tenant outage becomes platform-wide.

**Good** — per-caller dispatcher pools with bulkhead semantics. Each caller gets a slice of the pool capped at, say, 100 concurrent calls. A misbehaving caller can saturate their own slice but not others'.

**Great** — circuit breaker per caller (e.g., Resilience4j). Track success rate per `callerId`; if >50% errors over the last 30s, open the circuit and fast-fail callbacks to that caller for 60s, dumping them to a per-caller delayed retry SQS. This both protects the dispatcher pool and gives the caller breathing room to recover. Pair with a dashboard surfacing "callers with open circuit" so on-call can reach out. Borrowed from Netflix Hystrix-style isolation.

```mermaid
flowchart LR
  SQS["main SQS"] --> Disp["Dispatcher"]
  Disp --> CB["per-caller<br/>circuit breaker"]
  CB --> Healthy["healthy callers<br/>POST"]
  CB --> Open["open circuit<br/>retry SQS"]
  Open -.30s later.-> Disp

  classDef async fill:#D0BFFF,stroke:#6741D5,color:#000
  classDef service fill:#B2F2BB,stroke:#2F9E44,color:#000
  classDef external fill:#FFC9C9,stroke:#C92A2A,color:#000
  class SQS,Open async
  class Disp,CB service
  class Healthy external
```

### 7.5 Cancellation race: cancel arrives mid-fire

**Bad** — caller cancels at T-2s; dispatcher reads `status = PENDING` at T-3s, fires at T+0. Caller confused.

**Good** — dispatcher reads `status` at the moment of dispatch (just before POST), not when SQS message is received.

**Great** — use a Cassandra LWT (`UPDATE ... IF status='PENDING'`) to atomically transition `PENDING → IN_FLIGHT` right before POST. If the cancel raced and won, the LWT fails and dispatcher skips. This gives us a consistent linearization point at fire time.

### 7.6 Dead-letter / reconciliation

If a callback fails N times, the trigger lands in a DLQ topic (Kafka). A small operator dashboard surfaces failures by caller. Critically, a **reconciler job** runs hourly: scans Cassandra for rows with `fireAt < now - 1h` and `status IN (PENDING, IN_FLIGHT)` — these are leaks. They get re-pushed to SQS. This is the safety net for any sweeper / leader-election bug. Borrowed from Dynein's reconciler.

## 7.5. Design Self-Audit

- **Single point of failure?** Cassandra is multi-DC replicated, SQS is regional with built-in redundancy, Redis cache is tolerable to lose (just rebuild from Cassandra). API and dispatchers are stateless behind a load balancer. ✅
- **Stale reads?** Dispatcher LWT on `IF status='PENDING'` is strongly consistent (Paxos round). The sub-second window between LWT and HTTP POST is the at-least-once gap, accepted. ✅
- **Hot partition?** Addressed in 7.1 with sub-sharding + jitter. ✅
- **DLQ + reconciliation story?** 7.6. ✅
- **Cost callout for hot tier?** SQS at 100K msgs/sec is non-trivial — ~$0.40/M requests, plus delay queue charges. At 100K/s × 86400 = 8.6B msgs/day, that's ~$3500/day in SQS alone. Worth noting we'd evaluate SQS FIFO vs Redis Streams for cost-sensitive deployments. ✅
- **Search?** Not relevant — callers query their own triggers by `triggerId`, no full-text need.
- **What would a skeptical senior push back on?** "Why not just Temporal?" Fair — Temporal solves this and more. Tradeoff: heavier ops, harder to scale to 100K/s of simple delayed triggers without serious tuning. Our scope is the narrow "fire one HTTP callback later" use case, where a purpose-built service is leaner.

## 8. Final Architecture

```mermaid
flowchart LR
  Caller["Caller services"] --> ALB["API gateway"]
  ALB --> API["Trigger API"]
  API --> Idem["Redis idem cache"]
  API --> DB["Cassandra<br/>partition by bucket sub-shard"]
  API --> SQSshort["SQS short-delay queue"]

  Sweeper["Sweeper<br/>leader per shard"] --> DB
  Sweeper --> Wheel["Timing wheel<br/>per shard"]
  Wheel --> SQSshort

  SQSshort --> Disp["Dispatcher pool<br/>per-caller bulkheads + breaker"]
  Disp --> DB
  Disp --> CB["Caller callback URL"]

  Disp -.failures.-> DLQ["DLQ Kafka topic"]
  Recon["Reconciler<br/>hourly"] --> DB
  Recon --> SQSshort

  classDef client fill:#FFD8A8,stroke:#E8590C,color:#000
  classDef edge fill:#A5D8FF,stroke:#1971C2,color:#000
  classDef service fill:#B2F2BB,stroke:#2F9E44,color:#000
  classDef async fill:#D0BFFF,stroke:#6741D5,color:#000
  classDef data fill:#FFE066,stroke:#F08C00,color:#000
  classDef external fill:#FFC9C9,stroke:#C92A2A,color:#000

  class Caller client
  class CB external
  class ALB edge
  class API,Sweeper,Disp,Recon service
  class Wheel,SQSshort,DLQ async
  class Idem,DB data
```

## Glossary (named components)

- **Sweeper** — periodic process that scans Cassandra for triggers due in the next 15 min and pushes them into the in-memory timing wheel. Why it exists: Cassandra is the durable store, but range-scanning it at every tick would be slow; the sweeper hydrates a fast in-memory structure.
- **Timing wheel** — ring buffer of time slots (e.g., 1024 slots × 1 ms). Insert is O(1); each tick fires expired slots. Multiple wheels chained give hierarchical resolution (ms → s → min). Borrowed from Kafka Purgatory.
- **Dispatcher** — worker that pulls from SQS, reads the trigger row, POSTs to the caller's callback URL, marks `FIRED`. Stateless; scale horizontally.
- **Reconciler** — hourly safety-net job that finds triggers stuck in `PENDING` past their fireAt and re-injects them. Catches any leak from sweeper / leader-election bugs.
- **Bucket** — Cassandra partition keyed by `floor(fireAt / 1min)` plus a sub-shard hash. The unit of work the sweeper scans.

## Sources

- [Airbnb Dynein](https://medium.com/airbnb-engineering/dynein-building-a-distributed-delayed-job-queueing-system-93ab10f05f99) — two-tier (SQS + DynamoDB) design, reconciler pattern. Content rephrased for compliance.
- [Kafka Purgatory + Hierarchical Timing Wheels](https://www.confluent.io/blog/apache-kafka-purgatory-hierarchical-timing-wheels/) — wheel structure for O(1) timer insert/expire.
- [AWS SQS delay queues docs](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-delay-queues.html) — 15-min delay primitive.
- [Stripe Idempotency-Key](https://stripe.com/docs/api/idempotent_requests) — caller-supplied idempotency pattern.
- [Netflix Maestro overview](https://blog.bytebytego.com/p/how-netflix-orchestrates-millions) — sharded execution layer.
