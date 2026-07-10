---
layout: default
title: "Saga Pattern in System Design - Choreography vs Orchestration"
description: "Complete guide to the Saga pattern in system design interviews. Distributed transactions, choreography vs orchestration, compensating transactions."
permalink: /concepts/saga-pattern/
---

# Saga Pattern - Complete Deep Dive

> **Prerequisites:** [Message Queues](/concepts/message-queues/), [Event Sourcing](/concepts/event-sourcing/)
> **Used in:** [Digital Wallet](/hld/DigitalWallet/), [Zomato](/hld/Zomato/), [BookMyShow](/hld/BookMyShow/)

---

## What is the Saga Pattern?

A Saga is a sequence of local transactions across multiple services, where each step either succeeds and triggers the next, or fails and triggers compensating (undo) actions for all previous steps.

**Real-world analogy:** Planning a vacation. You book a flight, then a hotel, then a rental car. If the rental car is unavailable, you don't just accept a partial trip — you cancel the hotel, cancel the flight, and get refunds. Each cancellation is a "compensating transaction" that undoes a previous step.

```
Traditional (single DB transaction):
  BEGIN TRANSACTION
    debit account A
    credit account B
    update ledger
  COMMIT  ← all or nothing, easy!

Distributed (microservices, no shared DB):
  Service A: debit account    ← has its own DB
  Service B: credit account   ← has its own DB
  Service C: update ledger    ← has its own DB

  Problem: Can't wrap all 3 in one transaction!
  What if Service B succeeds but Service C fails?
```

---

## The Distributed Transaction Problem

In a monolith, ACID transactions are easy. In microservices, each service has its own database. You can't use a single transaction across services.

```
┌────────────────────────────────────────────────────────────┐
│  Why 2PC (Two-Phase Commit) doesn't work at scale:        │
│                                                            │
│  1. Coordinator is a single point of failure               │
│  2. All participants are BLOCKED during prepare phase      │
│  3. Latency: 2 network round trips minimum                │
│  4. Any participant failure = entire transaction blocked   │
│  5. Doesn't work across different DB vendors               │
│  6. Not supported by most message queues or HTTP services  │
│                                                            │
│  Saga is the alternative for microservices.                │
└────────────────────────────────────────────────────────────┘
```

---

## How Sagas Work

### Forward Flow (Happy Path)

```
Order Placement Saga:

Step 1: Order Service    → Create order (PENDING)
Step 2: Payment Service  → Charge customer
Step 3: Inventory Service → Reserve items
Step 4: Shipping Service → Schedule delivery
Step 5: Order Service    → Mark order CONFIRMED

All succeeded? Great! Order is complete.
```

### Compensating Flow (Failure)

```
Step 1: Order Service    → Create order (PENDING)     ✓
Step 2: Payment Service  → Charge customer            ✓
Step 3: Inventory Service → Reserve items             ✗ FAILED! (out of stock)

Compensating transactions (reverse order):
Step 2C: Payment Service → Refund customer            ✓ (undo step 2)
Step 1C: Order Service   → Cancel order (CANCELLED)   ✓ (undo step 1)

Result: System is back to consistent state. No money lost.
```

---

## Choreography (Event-Driven)

Each service listens for events and decides what to do next. No central coordinator.

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Order    │     │ Payment   │     │ Inventory │     │ Shipping  │
│  Service  │     │ Service   │     │ Service   │     │ Service   │
└────┬─────┘     └────┬─────┘     └────┬─────┘     └────┬─────┘
     │                 │                 │                 │
     │ OrderCreated    │                 │                 │
     │────────────────▶│                 │                 │
     │                 │                 │                 │
     │                 │ PaymentCharged  │                 │
     │                 │────────────────▶│                 │
     │                 │                 │                 │
     │                 │                 │ ItemsReserved   │
     │                 │                 │────────────────▶│
     │                 │                 │                 │
     │                 │                 │                 │ ShipScheduled
     │◀────────────────│─────────────────│─────────────────│
     │ OrderConfirmed  │                 │                 │
```

**Each service:**
1. Listens for specific events on message bus
2. Performs its local transaction
3. Publishes result event (success or failure)
4. Other services react to the event

### Choreography - Failure Flow

```
OrderCreated → Payment charges → PaymentCharged → Inventory tries to reserve
                                                  → FAILS! Publishes "ReservationFailed"

Payment hears "ReservationFailed" → refunds → publishes "PaymentRefunded"
Order hears "PaymentRefunded" → cancels order → publishes "OrderCancelled"
```

---

## Orchestration (Coordinator)

A central **Saga Orchestrator** tells each service what to do and handles failures.

```
┌──────────────────────────────────────────────────────────────┐
│                    SAGA ORCHESTRATOR                           │
│                                                              │
│  Saga Definition:                                            │
│  Step 1: OrderService.create()      Compensate: .cancel()    │
│  Step 2: PaymentService.charge()    Compensate: .refund()    │
│  Step 3: InventoryService.reserve() Compensate: .release()   │
│  Step 4: ShippingService.schedule() Compensate: .cancel()    │
└─────────────────────────┬────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
         ▼                ▼                ▼
  ┌──────────┐    ┌──────────┐    ┌──────────┐
  │  Payment  │    │ Inventory │    │ Shipping  │
  │  Service  │    │ Service   │    │ Service   │
  └──────────┘    └──────────┘    └──────────┘
```

```
Orchestrator flow:
  1. Orchestrator → OrderService: "Create order" → OK
  2. Orchestrator → PaymentService: "Charge $50" → OK
  3. Orchestrator → InventoryService: "Reserve items" → FAILED!
  4. Orchestrator detects failure, runs compensations:
     - Orchestrator → PaymentService: "Refund $50" → OK
     - Orchestrator → OrderService: "Cancel order" → OK
  5. Orchestrator marks saga as FAILED
```

---

## Comparison: Choreography vs Orchestration

| Feature | Choreography | Orchestration |
|---|---|---|
| Coordinator | None (decentralized) | Central orchestrator |
| Coupling | Loose (events only) | Tighter (orchestrator knows all) |
| Complexity | Grows exponentially with steps | Linear (one place to look) |
| Debugging | Hard (trace events across services) | Easy (orchestrator has full state) |
| Single point of failure | None | Orchestrator (must be HA) |
| Adding new steps | Modify multiple services | Modify only orchestrator |
| Best for | Simple flows (2-4 steps) | Complex flows (5+ steps) |
| Cyclic dependencies | Risk of event loops | No (orchestrator controls flow) |
| Visibility | Distributed tracing needed | Centralized dashboard |
| Technology | Kafka, RabbitMQ, SNS/SQS | Temporal, Cadence, Step Functions |

---

## Compensating Transactions

The "undo" operation for each step. Not always a simple reverse:

```
┌─────────────────────┬────────────────────────────────────────┐
│ Forward Action       │ Compensating Action                    │
├─────────────────────┼────────────────────────────────────────┤
│ Create order         │ Cancel order                           │
│ Charge payment       │ Refund payment                        │
│ Reserve inventory    │ Release inventory                     │
│ Send notification    │ Send "sorry, cancelled" notification  │
│ Book hotel           │ Cancel booking (may lose deposit!)    │
│ Debit account        │ Credit account                        │
└─────────────────────┴────────────────────────────────────────┘
```

**Important:** Compensations are not always perfect inverses:
- Some actions can't be fully undone (email already sent)
- Some have costs (cancellation fees)
- Some require human intervention (physical shipment already sent)

### Saga States

```
┌─────────┐     ┌────────────┐     ┌───────────┐
│ STARTED  │────▶│ PROCESSING  │────▶│ COMPLETED  │
└─────────┘     └──────┬─────┘     └───────────┘
                       │
                       │ failure
                       ▼
                ┌──────────────┐     ┌───────────┐
                │ COMPENSATING  │────▶│  FAILED    │
                └──────────────┘     └───────────┘
```

---

## Implementation Example: Order Saga (Orchestration)

```python
# Saga Orchestrator (simplified)
class OrderSaga:
    steps = [
        SagaStep(
            action=order_service.create_order,
            compensation=order_service.cancel_order
        ),
        SagaStep(
            action=payment_service.charge,
            compensation=payment_service.refund
        ),
        SagaStep(
            action=inventory_service.reserve,
            compensation=inventory_service.release
        ),
        SagaStep(
            action=shipping_service.schedule,
            compensation=shipping_service.cancel
        ),
    ]

    def execute(self, order_data):
        completed_steps = []

        for step in self.steps:
            try:
                result = step.action(order_data)
                completed_steps.append(step)
            except Exception as e:
                # Failure! Run compensations in reverse
                for completed in reversed(completed_steps):
                    completed.compensation(order_data)
                raise SagaFailed(e)

        return SagaCompleted(order_data)
```

---

## When to Use / When NOT to Use

### Use Saga Pattern When:
- Multiple microservices must coordinate a business transaction
- Each service has its own database (no shared DB)
- You need eventual consistency across services
- Operations are long-running (can't hold DB locks)
- You need audit trail of what happened in each step

### When NOT to Use:
- **Single database** — use regular ACID transactions
- **Strong consistency required immediately** — saga is eventually consistent
- **Simple operations** — 2 services only, consider direct call + retry
- **Read-only operations** — no transaction needed
- **When compensations are impossible** — some actions truly can't be undone

---

## Real-World Examples

| Company | Use Case |
|---|---|
| **Uber** | Trip lifecycle: match driver → start ride → calculate fare → charge payment → pay driver. Each step is a saga participant. |
| **Amazon** | Order fulfillment: payment → inventory → warehouse pick → ship. Cancellation triggers compensating actions. |
| **Netflix** | Uses Conductor (orchestration engine) for multi-service workflows like content ingestion and encoding. |
| **Airbnb** | Booking flow: hold dates → charge guest → notify host → confirm booking. Failure at any step triggers undo. |
| **Zomato** | Order: accept → payment → restaurant confirm → assign delivery. Restaurant rejection triggers refund saga. |

---

## Common Interview Questions

**Q: "How do you handle distributed transactions across microservices?"**
A: Use the Saga pattern. Define the transaction as a sequence of local transactions, each with a compensating action. Use orchestration (central coordinator like Temporal/Cadence) for complex flows, or choreography (events on Kafka) for simpler ones. Accept eventual consistency.

**Q: "What happens if a compensating transaction fails?"**
A: Retry with exponential backoff (compensations should be idempotent). If retries are exhausted, alert operations team and put the saga in a "requires manual intervention" state. Store the full saga state for debugging. Use a dead-letter queue for failed compensations.

**Q: "Choreography or Orchestration — how do you decide?"**
A: Choreography for simple flows (2-4 services, no branching logic). Orchestration for complex flows (5+ services, conditional paths, timeouts, human approvals). Most production systems with complex business logic use orchestration because debugging choreography at scale is very hard.

**Q: "How does this relate to eventual consistency?"**
A: During saga execution, the system is in an intermediate state (order created but payment not yet charged). This is eventual consistency — the system will eventually reach a consistent state (either all committed or all compensated). Design your reads to handle intermediate states (show "processing" status).

**Q: "How do you handle timeouts in a saga?"**
A: Each step has a timeout. If a service doesn't respond within the timeout, treat it as a failure and trigger compensation. The orchestrator (Temporal/Cadence) handles this natively with activity timeouts and retry policies. For choreography, use a deadline event and a watchdog service.

---

[← Back to Fundamentals](/concepts) | [Next: Database Indexing →](/concepts/database-indexing/)
