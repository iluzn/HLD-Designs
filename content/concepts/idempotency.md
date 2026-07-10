---
layout: default
title: "Idempotency in System Design - Keys, Patterns, Implementation"
description: "Complete guide to idempotency in system design interviews. Idempotency keys, Redis implementation, at-least-once delivery with exactly-once semantics."
permalink: /concepts/idempotency/
---

# Idempotency - Complete Deep Dive

> **Prerequisites:** [API Design](/concepts/api-design/), [Distributed Locking](/concepts/distributed-locking/)
> **Used in:** [Digital Wallet](/hld/DigitalWallet/), [Payment Gateway](/hld/PaymentGateway/), [Notification System](/hld/NotificationSystem/)

---

## What is Idempotency?

An operation is **idempotent** if performing it multiple times produces the same result as performing it once. No matter how many times you retry, the side effect happens exactly once.

**Real-world analogy:** An elevator button. You press "3" once — the elevator goes to floor 3. You press it 5 more times frantically — it still just goes to floor 3. The button is idempotent. Compare with a vending machine button: press it 5 times, get 5 sodas (not idempotent).

```
Idempotent:
  SET balance = 100        (do it 5 times → balance is still 100)
  DELETE /orders/123       (do it 5 times → order is still deleted)
  PUT /users/123 {name: X} (do it 5 times → name is still X)

NOT Idempotent:
  balance += 100           (do it 5 times → balance increases by 500!)
  POST /orders {items:[]}  (do it 5 times → 5 orders created!)
  INSERT INTO ledger(...)  (do it 5 times → 5 rows inserted!)
```

---

## Why Does It Matter?

In distributed systems, requests can be retried due to:

```
┌─────────┐         ┌─────────┐         ┌─────────┐
│  Client  │────────▶│  Server  │────────▶│   DB     │
└─────────┘         └─────────┘         └─────────┘
     │                    │                    │
     │  POST /pay $100    │                    │
     │───────────────────▶│                    │
     │                    │  INSERT payment    │
     │                    │───────────────────▶│
     │                    │         OK ◀───────│
     │                    │                    │
     │  ╳ Network timeout │                    │
     │  (no response)     │                    │
     │                    │                    │
     │  Client retries!   │                    │
     │  POST /pay $100    │                    │
     │───────────────────▶│                    │
     │                    │  INSERT payment    │  ← DUPLICATE!
     │                    │───────────────────▶│    User charged
     │                    │                    │    $200 instead of $100!
```

**Without idempotency:** Network failures, timeouts, load balancer retries, and message queue redelivery all cause duplicate processing.

---

## HTTP Methods and Idempotency

| Method | Idempotent? | Safe? | Why |
|---|---|---|---|
| GET | Yes | Yes | Just reads, no side effects |
| HEAD | Yes | Yes | Like GET but no body |
| PUT | Yes | No | Sets to specific state, repeatable |
| DELETE | Yes | No | Deleting deleted resource = no-op |
| POST | **No** | No | Creates new resource each time |
| PATCH | Depends | No | Can be idempotent if designed well |

**Key insight:** POST is the problematic one. Creating a payment, sending a notification, placing an order — all are POST operations that must be made idempotent.

---

## Idempotency Keys — The Solution

Client generates a unique key per logical operation. Server uses it to detect retries.

```
First attempt:
  POST /payments
  Idempotency-Key: "pay_a1b2c3d4e5f6"
  { "amount": 100, "to": "merchant_xyz" }

  Server: key "pay_a1b2c3d4e5f6" not seen before
          → process payment → store result with key
          → return 200 { "paymentId": "pm_789" }

Retry (network timeout on first attempt):
  POST /payments
  Idempotency-Key: "pay_a1b2c3d4e5f6"    ← same key!
  { "amount": 100, "to": "merchant_xyz" }

  Server: key "pay_a1b2c3d4e5f6" found!
          → return stored result: 200 { "paymentId": "pm_789" }
          → NO duplicate payment created
```

---

## Implementation with Redis

```
┌────────────────────────────────────────────────────────────────┐
│                   Idempotency Flow                              │
│                                                                │
│  1. Request arrives with Idempotency-Key header                │
│  2. Check Redis: GET idempotency:{key}                         │
│     ┌─────────────────────────────────────────────┐            │
│     │ Key exists?                                  │            │
│     │  YES → Return stored response (skip logic)  │            │
│     │  NO  → Continue to step 3                   │            │
│     └─────────────────────────────────────────────┘            │
│  3. Acquire lock: SET idempotency:{key}:lock NX EX 30          │
│     (prevents concurrent duplicate requests)                    │
│  4. Process the request (business logic)                       │
│  5. Store result: SET idempotency:{key} {response} EX 86400    │
│  6. Release lock                                               │
│  7. Return response                                            │
└────────────────────────────────────────────────────────────────┘
```

```python
# Pseudocode implementation
def handle_payment(request):
    idempotency_key = request.headers["Idempotency-Key"]

    # Step 1: Check if already processed
    cached = redis.get(f"idempotency:{idempotency_key}")
    if cached:
        return deserialize(cached)  # Return stored response

    # Step 2: Acquire lock (prevent race condition)
    lock_acquired = redis.set(
        f"idempotency:{idempotency_key}:lock",
        "1", nx=True, ex=30  # 30s lock timeout
    )
    if not lock_acquired:
        return 409  # Another request with same key in progress

    try:
        # Step 3: Process payment (actual business logic)
        result = payment_service.charge(request.body)

        # Step 4: Store response (24h TTL)
        redis.set(
            f"idempotency:{idempotency_key}",
            serialize(result),
            ex=86400  # 24 hours
        )
        return result
    finally:
        # Step 5: Release lock
        redis.delete(f"idempotency:{idempotency_key}:lock")
```

---

## Implementation with Database

For stronger durability (Redis can lose data on restart):

```sql
CREATE TABLE idempotency_keys (
    key         VARCHAR(255) PRIMARY KEY,
    response    JSONB NOT NULL,
    status      VARCHAR(20) DEFAULT 'processing',  -- processing | completed
    created_at  TIMESTAMP DEFAULT NOW(),
    expires_at  TIMESTAMP DEFAULT NOW() + INTERVAL '24 hours'
);

-- Step 1: Try to insert (fails if duplicate)
INSERT INTO idempotency_keys (key, status)
VALUES ('pay_a1b2c3d4', 'processing')
ON CONFLICT (key) DO NOTHING;

-- If insert succeeded → process payment
-- If insert failed → fetch stored response
SELECT response FROM idempotency_keys WHERE key = 'pay_a1b2c3d4';
```

---

## At-Least-Once + Idempotency = Exactly-Once

This is a crucial formula in distributed systems:

```
Delivery Guarantees:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  At-Most-Once:  Fire and forget. May lose messages.         │
│                 (UDP, no retries)                            │
│                                                             │
│  At-Least-Once: Retry until acknowledged. May duplicate.    │
│                 (Kafka default, SQS, most queues)           │
│                                                             │
│  Exactly-Once:  Each message processed exactly once.        │
│                 (The holy grail — hard to achieve natively)  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

The trick:
  At-Least-Once delivery + Idempotent consumers = Exactly-Once semantics

  Queue delivers message 3 times (retries)?
  Consumer processes it only once (idempotency key = message ID).
  Net effect: exactly-once processing.
```

```
┌──────────┐     ┌──────────┐     ┌──────────────────────────┐
│  Producer │────▶│  Queue    │────▶│  Consumer (idempotent)    │
│           │     │ (retries) │     │                          │
│           │     │           │     │  if msg_id seen:         │
│           │     │  msg_id:  │     │    skip (already done)   │
│           │     │  "abc123" │     │  else:                   │
│           │     │           │     │    process + store msg_id│
└──────────┘     └──────────┘     └──────────────────────────┘
```

---

## Patterns for Making Operations Idempotent

| Pattern | How | Example |
|---|---|---|
| **Idempotency Key** | Client sends unique key, server deduplicates | Payment creation |
| **Natural Idempotency Key** | Use business identifier as key | `order_id + action` = natural key |
| **Conditional Write** | Only write if current state matches expected | `UPDATE SET x=new WHERE x=old` |
| **Upsert** | Insert or update if exists | `INSERT ON CONFLICT UPDATE` |
| **Token/Claim** | Pre-allocate a token, claim it once | Seat reservation tokens |
| **Deduplication Table** | Store processed message IDs | Queue consumer dedup |

---

## When to Use / When NOT to Use

### When to Use:
- **Payment processing** — double charges are unacceptable
- **Order placement** — duplicate orders are costly
- **Notification sending** — double SMS/email is annoying
- **Inventory updates** — double decrement = overselling
- **Any operation triggered by queue messages** — queues redeliver

### When NOT to Use:
- **Read operations** (GET) — already idempotent
- **Logging/analytics events** — duplicates are usually acceptable
- **Operations with natural idempotency** — PUT already overwrites
- **Internal caches** — writing same value twice is fine

---

## Real-World Examples

| Company | Implementation |
|---|---|
| **Stripe** | Requires `Idempotency-Key` header on all POST requests. Keys stored 24h. Same key returns cached response. |
| **PayPal** | Uses `PayPal-Request-Id` header. Prevents duplicate payment execution. |
| **AWS** | Many APIs use client tokens (e.g., `ClientToken` in EC2 RunInstances). |
| **Google Pay** | `requestId` field in payment API. Same ID = same payment, no duplicates. |
| **Razorpay** | Idempotency key on payment capture. Retrying capture with same key is safe. |

---

## Common Interview Questions

**Q: "How do you prevent double payments in a payment system?"**
A: Use idempotency keys. Client generates a UUID per payment attempt and sends it with the request. Server checks Redis/DB for the key. If found, returns stored response. If not, processes payment and stores result with the key. Lock during processing prevents race conditions from concurrent retries.

**Q: "What happens if the server crashes after processing but before storing the idempotency key?"**
A: This is the partial failure problem. Solution: wrap the business logic and idempotency key storage in a single database transaction. If using Redis for idempotency and Postgres for payments, use the Outbox Pattern: write payment + idempotency record to Postgres atomically, then sync to Redis asynchronously.

**Q: "How long should you keep idempotency keys?"**
A: Typically 24-72 hours. Long enough for all possible retries to complete. Short enough to not consume excessive storage. Stripe uses 24 hours. After expiry, the same key can be reused (treated as new request).

**Q: "What if two different requests use the same idempotency key?"**
A: Compare request bodies. If the key exists but the request body differs from the stored one, return 422 Unprocessable Entity with an error explaining the key was used with different parameters. This prevents misuse and bugs.

**Q: "How is idempotency different from deduplication?"**
A: Idempotency is a broader concept — the operation itself is safe to retry. Deduplication is one technique to achieve it (track processed IDs and skip duplicates). Other techniques include conditional writes, upserts, and token-based claiming.

---

[← Back to Fundamentals](/concepts) | [Next: Leader Election →](/concepts/leader-election/)
