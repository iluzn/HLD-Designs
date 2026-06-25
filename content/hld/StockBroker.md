---
layout: default
title: "Designing a Stock Broker Platform (Robinhood / Zerodha)"
description: "System design for a stock broker with order matching, transaction history, notifications, and delivery semantics. Event-driven architecture with Kafka."
permalink: /StockBroker
---

# Designing a Stock Broker Platform

⚡ **Difficulty:** Advanced 🏷️ **Topics:** Order Matching, Event Sourcing, CQRS, Kafka, Delivery Semantics 🏢 **Asked at:** Robinhood, Zerodha, Groww, Upstox, Goldman Sachs

---

## 1. Understanding the Problem

A stock broker platform lets retail users buy and sell financial instruments (stocks, ETFs, options). The broker receives user orders, validates them against account balances and risk rules, routes them to an exchange (or internal matching engine), and shows real-time status updates. The system must handle thousands of concurrent orders during market hours with strong consistency guarantees — a lost or duplicate trade is a regulatory violation.

---

## 1.5. Naive First Cut

```mermaid
flowchart LR
    Client["Mobile App"]:::client
    API["API Server"]:::service
    DB["Postgres DB"]:::data
    Exchange["Exchange NSE or BSE"]:::external

    Client --> API
    API --> DB
    API --> Exchange

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
    classDef external fill:#EC407A,stroke:#880E4F,color:#fff
```

**How this breaks:**
- Single API server can't handle 100K+ orders/sec during market open
- Synchronous exchange call blocks the API — timeouts pile up
- No order queue — if exchange is slow, user retries create duplicates
- No way to notify users of fills without polling
- Single DB becomes write bottleneck during peak hours
- No audit trail — regulators require full event history of every order state change

The rest of the doc evolves this into a production-grade event-driven architecture.

---

## 1.7. Prior Art We're Drawing From

- **Zerodha Kite OMS** — Silo-based user partitioning, pre-trade validation at the gateway, async order routing to exchange. Handles millions of orders daily on commodity hardware. ([zerodha.tech blog](https://zerodha.tech/blog/))
- **LMAX Exchange Disruptor** — Single-threaded matching engine processing 6M orders/sec using a lock-free ring buffer. Demonstrates that matching is CPU-bound, not I/O-bound.
- **Coinbase Matching Engine** — Continuous first-come-first-serve order book with price-time priority. Publishes trade events via WebSocket feed. ([Coinbase docs](https://docs.cdp.coinbase.com/exchange/concepts/matching-engine))
- **Kafka + Flink for Exchange** — Event-driven architecture where every state change is a Kafka event; Flink processes matching and settlement in real-time streams. ([Medium article](https://medium.com/@swayam.imo001/how-we-built-a-real-time-stock-exchange-with-an-event-driven-architecture-on-kafka-and-flink-51e5902fdc6c))
- **Robinhood** — Routes orders to market makers (PFOF model) rather than running own matching engine. Emphasizes idempotent order submission and real-time push notifications.

---

## 2. Functional Requirements

### Core (Top 3)

1. **Place and match buy/sell orders** — submit limit/market orders, match based on price-time priority
2. **Show users their transactions** — real-time order status, trade history, portfolio positions
3. **Send notifications** — push notifications on order fills, partial fills, rejections, price alerts

### Below the Line

- Watchlists and price charts (read-heavy, CDN-cacheable)
- Margin trading and short selling
- Options and derivatives
- Admin dashboard and compliance reporting
- Referral and rewards system

---

## 3. Non-Functional Requirements

### Core

| NFR | Target |
|---|---|
| **Latency** | Order placement < 50ms P99 (broker side); matching < 5ms |
| **Throughput** | 100K orders/sec during market open |
| **Consistency** | Exactly-once order execution — no duplicates, no lost fills |
| **Availability** | 99.99% during market hours (09:15 - 15:30 IST) |

### Below the Line

- Audit trail retained for 7 years (regulatory)
- Multi-region DR (but matching engine is single-leader)
- Sub-second portfolio updates after fills

---

## Technology Choices

| Tier | Purpose | Stores | Access Pattern | Primary | Alternatives |
|---|---|---|---|---|---|
| Order Book (hot) | Active limit orders | Open orders per symbol | Price-time sorted insert/remove | In-memory TreeMap per symbol | Redis Sorted Set, LMAX Disruptor |
| Order DB | Order state and history | All orders ever placed | Write-heavy during market, read for history | Postgres (partitioned by date) | CockroachDB, TiDB |
| Event Bus | Order events stream | Events: placed, matched, filled, rejected | Append-only, partitioned by symbol | Kafka | Redpanda, Kinesis |
| Portfolio Store | User holdings and balances | Positions, cash, P&L | Read-heavy, write on fills | Postgres (CQRS read replica) | DynamoDB, ScyllaDB |
| Notification Queue | Push delivery | Notification payloads | Fan-out per user | Kafka + FCM/APNs | SQS + SNS |
| Cache | Market data, session | Prices, user sessions | High-QPS reads | Redis Cluster | Memcached |
| Object Store | Trade confirmations, reports | PDFs, CSVs | Batch reads | S3 | GCS, MinIO |

**Why Postgres for the order DB, not DynamoDB?**
Orders are relational (order → fills → settlements), need ACID transactions for balance deductions, and regulators require complex queries for audits. Postgres with partitioning by date handles the write volume. The matching engine itself uses in-memory structures — the DB is for persistence, not matching speed.

**Why Kafka, not a simple queue?**
Orders need event replay (for reconciliation), partitioning by symbol (for ordered matching), and multiple consumers (matcher, notifier, portfolio updater, audit logger). Kafka's log-based model fits perfectly.

---

## 4. Core Entities

- **User** — account, KYC status, cash balance, margin
- **Order** — symbol, side (buy/sell), type (market/limit), quantity, price, status, timestamps
- **Trade (Fill)** — matched order pair, execution price, quantity, timestamp
- **Position** — user's holding in a symbol (quantity, avg price)
- **Notification** — type, user, payload, delivery status
- **OrderBook** — per-symbol sorted structure of active limit orders

---

## 5. API / System Interface

```text
POST /api/v1/orders
  Body: { symbol, side: "BUY"|"SELL", type: "MARKET"|"LIMIT", quantity, price?, idempotencyKey }
  Response: { orderId, status: "ACCEPTED", timestamp }
  Auth: JWT Bearer token
  Note: idempotencyKey prevents duplicate submissions on retry

GET /api/v1/orders?status=FILLED&from=2026-01-01&to=2026-06-25&page=1
  Response: { orders: [...], pagination: { total, page, pageSize } }

GET /api/v1/portfolio
  Response: { cash, positions: [{ symbol, quantity, avgPrice, currentPrice, pnl }] }

GET /api/v1/orders/{orderId}
  Response: { order details + fills }

WebSocket /ws/v1/orders
  Pushes: { type: "ORDER_UPDATE", orderId, status, filledQty, ... }
```

---

## 6. High-Level Design

### FR1: Place and Match Orders

```mermaid
flowchart LR
    App["Mobile or Web"]:::client
    GW["API Gateway"]:::edge
    OMS["Order Management Service"]:::service
    KF["Kafka orders.placed"]:::async
    ME["Matching Engine"]:::service
    KF2["Kafka trades.executed"]:::async
    DB["Order DB Postgres"]:::data
    EX["Exchange NSE"]:::external

    App --> GW
    GW --> OMS
    OMS --> KF
    KF --> ME
    ME --> KF2
    OMS --> DB
    ME --> EX

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef edge fill:#42A5F5,stroke:#1565C0,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef async fill:#AB47BC,stroke:#6A1B9A,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
    classDef external fill:#EC407A,stroke:#880E4F,color:#fff
```

| Color | Meaning |
|---|---|
| 🟠 Orange | Client |
| 🔵 Blue | Edge / Gateway |
| 🟢 Green | Service |
| 🟣 Purple | Async (Kafka) |
| 🟡 Yellow | Data store |
| 🩷 Pink | External |

**Flow (7 steps):**

1. User submits order via app → hits API Gateway (rate limiting, auth, idempotency check)
2. Gateway routes to **Order Management Service (OMS)** which validates: sufficient balance, valid symbol, market hours, risk limits
3. OMS persists order with status `PENDING` in Postgres, deducts blocked funds (soft hold)
4. OMS publishes `order.placed` event to Kafka (partitioned by symbol for ordering)
5. **Matching Engine** consumes events for its assigned symbols. For internal matching (dark pool): runs price-time priority against the order book. For exchange routing: forwards to NSE/BSE via FIX protocol.
6. On match/fill, Matching Engine publishes `trade.executed` event to Kafka
7. OMS consumes fill event, updates order status to `FILLED`, releases blocked funds, credits securities

**Why async (Kafka) between OMS and Matching Engine?**
The matching engine is the bottleneck — it processes one order at a time per symbol. If OMS called it synchronously, every order would block waiting for matching. Kafka decouples them: OMS responds to user instantly ("ACCEPTED"), matching happens async. The user gets a push notification when filled.

**Why partition by symbol?**
All orders for RELIANCE must be matched in strict price-time order. Kafka partitioning by symbol ensures a single consumer processes all orders for one symbol sequentially — no distributed locks needed.

---

### FR2: Show Users Their Transactions

```mermaid
flowchart LR
    App["App"]:::client
    GW["Gateway"]:::edge
    QS["Query Service CQRS"]:::service
    RC["Redis Cache"]:::data
    RDB["Read Replica Postgres"]:::data
    KF["Kafka trade events"]:::async
    Proj["Projector"]:::service

    App --> GW
    GW --> QS
    QS --> RC
    QS --> RDB
    KF --> Proj
    Proj --> RDB
    Proj --> RC

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef edge fill:#42A5F5,stroke:#1565C0,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef async fill:#AB47BC,stroke:#6A1B9A,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
```

**Flow:**

1. `trade.executed` events flow into a **Projector** service (Kafka consumer)
2. Projector updates the read-optimized **Portfolio DB** (denormalized: positions, P&L, trade history)
3. Projector also invalidates/updates **Redis Cache** (user's portfolio, recent orders)
4. When user opens "Transactions" screen, **Query Service** checks Redis first (cache hit for hot data), falls back to Postgres read replica
5. Portfolio reflects fills within 500ms of execution (eventual consistency is acceptable for reads)

**Why CQRS here?**
Write path (order placement) needs ACID and strong consistency. Read path (portfolio, history) is 100x more frequent and tolerates slight staleness. Separating them lets us scale reads independently with caches and replicas.

---

### FR3: Send Notifications

```mermaid
flowchart LR
    KF["Kafka trade.executed"]:::async
    NS["Notification Service"]:::service
    TMP["Template Engine"]:::service
    FCM["FCM or APNs"]:::external
    WS["WebSocket Gateway"]:::service
    DLQ["Dead Letter Queue"]:::async

    KF --> NS
    NS --> TMP
    NS --> FCM
    NS --> WS
    NS --> DLQ

    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef async fill:#AB47BC,stroke:#6A1B9A,color:#fff
    classDef external fill:#EC407A,stroke:#880E4F,color:#fff
```

**Flow:**

1. Notification Service consumes `trade.executed`, `order.rejected`, `price.alert` events from Kafka
2. Resolves user preferences (push / email / SMS / in-app only)
3. Templates the message via Template Engine ("Your order to BUY 10 RELIANCE filled at ₹2,847")
4. For real-time: pushes via **WebSocket Gateway** (user has active connection) — instant delivery
5. For push: sends to FCM/APNs with retry + exponential backoff
6. Failed deliveries go to **DLQ** — reconciler retries or flags for manual review

**Delivery semantics:**
- **At-least-once** for notifications — duplicate "order filled" notification is annoying but safe
- **Exactly-once** for order execution — achieved via idempotency keys + Kafka consumer offsets + DB unique constraints

---

## 6.5. Core Flows

### Flow 1: Order Placement End-to-End

```mermaid
sequenceDiagram
    participant User
    participant GW as API Gateway
    participant OMS as Order Service
    participant DB as Postgres
    participant Kafka
    participant ME as Matching Engine
    participant NS as Notification Svc

    User->>GW: POST /orders (idempotencyKey)
    GW->>GW: Rate limit + Auth + Idempotency check
    GW->>OMS: Forward order
    OMS->>DB: Check balance and block funds
    OMS->>DB: INSERT order (status=PENDING)
    OMS-->>User: 202 Accepted (orderId)
    OMS->>Kafka: Publish order.placed
    Kafka->>ME: Consume (partitioned by symbol)
    ME->>ME: Match against order book
    alt Match found
        ME->>Kafka: Publish trade.executed
        Kafka->>OMS: Consume fill
        OMS->>DB: UPDATE order status=FILLED
        OMS->>DB: Credit securities debit cash
        Kafka->>NS: Consume fill event
        NS-->>User: Push "Order Filled"
    else No match (limit order)
        ME->>ME: Add to order book (resting)
        Note over ME: Waits for counter-party
    end
```

**Non-obvious failure path:** If Kafka is temporarily unavailable after OMS persists the order, the order sits in `PENDING` state. A **reconciler cron** (every 30s) scans for orders stuck in PENDING > 60s and re-publishes them to Kafka. The matching engine is idempotent (uses orderId as dedup key), so re-publishing is safe.

### Flow 2: Transaction History Query

```mermaid
sequenceDiagram
    participant User
    participant QS as Query Service
    participant Redis
    participant DB as Read Replica

    User->>QS: GET /orders?status=FILLED
    QS->>Redis: Check cache (key: user:123:orders:filled)
    alt Cache hit
        Redis-->>QS: Return cached results
    else Cache miss
        QS->>DB: SELECT from orders WHERE user_id=123
        DB-->>QS: Results
        QS->>Redis: Cache for 30s
    end
    QS-->>User: 200 OK (orders list)
```

### Order State Machine

```mermaid
stateDiagram-v2
    [*] --> PENDING : User submits
    PENDING --> OPEN : Accepted by exchange
    OPEN --> PARTIALLY_FILLED : Partial match
    PARTIALLY_FILLED --> FILLED : Remaining matched
    OPEN --> FILLED : Full match
    OPEN --> CANCELLED : User cancels
    PENDING --> REJECTED : Validation fails
    OPEN --> EXPIRED : Market close
```

---

## 7. Deep Dives

### Deep Dive 1: Order Matching (Price-Time Priority)

**Bad:** Scan all open orders linearly on each new order — O(n) per match, breaks at scale.

**Good:** Sorted data structure (TreeMap/BST) keyed by price. Buy side = max-heap (highest bid first). Sell side = min-heap (lowest ask first). O(log n) insert, O(1) match against best price.

**Great:** In-memory order book per symbol using two TreeMaps (bids descending, asks ascending). Each price level holds a FIFO queue of orders at that price. Match = peek best opposing side, if prices cross, execute.

```mermaid
flowchart LR
    subgraph OrderBook
        BID["Bids TreeMap DESC"]:::data
        ASK["Asks TreeMap ASC"]:::data
    end
    NEW["New Order"]:::client --> MATCH{"Prices Cross?"}:::service
    MATCH -->|Yes| FILL["Execute Trade"]:::service
    MATCH -->|No| REST["Add to Book"]:::data

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
```

**Mechanism:** When a BUY order arrives at price P:
1. Check best ASK — if ask_price <= P, execute at ask_price (price improvement for buyer)
2. Fill as much quantity as available at that level
3. If partially filled, move to next ask level
4. If unfilled quantity remains and it's a LIMIT order, add to bids at price P

Single-threaded per symbol — no locks needed. Borrowing from LMAX Disruptor: one thread per symbol partition achieves millions of matches/sec.

---

### Deep Dive 2: Exactly-Once Delivery Semantics

**Bad:** Fire-and-forget — orders get lost on crashes. Or naive retry — user gets double-filled.

**Good:** Idempotency key on order submission + DB unique constraint. Kafka consumer with manual offset commit after processing.

**Great:** End-to-end exactly-once via the following chain:

1. **Client → OMS:** Idempotency key in request. OMS stores `(idempotencyKey, orderId)` in DB. Duplicate request returns same orderId.
2. **OMS → Kafka:** Use Kafka transactions (exactly-once semantics via `transactional.id`). Order is published exactly once.
3. **Kafka → Matching Engine:** Consumer uses `read_committed` isolation. Processes each order exactly once per offset. Uses orderId as dedup key in order book.
4. **Matching Engine → Trade DB:** Kafka transaction that atomically commits the trade AND the consumer offset. If crash after write but before offset commit, re-processing finds trade already exists (idempotent upsert with orderId + fill sequence).

**Backstop:** Reconciler compares Kafka events vs DB state every 5 minutes. Flags discrepancies for manual review. In 4 years at Zerodha, reconciler catches < 0.001% of trades.

---

### Deep Dive 3: Real-Time Notifications and WebSocket Delivery

**Bad:** Client polls every second — wastes bandwidth, adds latency, doesn't scale to millions.

**Good:** WebSocket connection per user, server pushes events. But: how do you route a fill event to the correct WebSocket server holding that user's connection?

**Great:** Pub/Sub fan-out with connection registry:

1. User connects to WebSocket Gateway (any instance behind load balancer)
2. Gateway registers `(userId → serverId)` in Redis
3. When fill happens, Notification Service publishes to Redis Pub/Sub channel `user:{userId}`
4. The specific gateway instance subscribed to that user's channel receives it and pushes to WebSocket
5. If user is offline (no WebSocket), fall back to FCM/APNs push notification

**Why Redis Pub/Sub, not Kafka for this?**
Kafka guarantees durability but adds latency. WebSocket delivery is best-effort and ephemeral — if the push fails, the notification still gets sent via FCM as backup. Redis Pub/Sub is sub-millisecond.

---

### Deep Dive 4: Hot Partition and Market Open Spike

**Problem:** Market opens at 09:15 IST. Within 30 seconds, 80% of daily orders flood in. Specific symbols (RELIANCE, NIFTY futures) get 10x more orders than others.

**Bad:** Single Kafka partition per symbol — the hot symbol partition overwhelms one consumer.

**Good:** Pre-split hot symbols into sub-partitions (e.g., RELIANCE-0 through RELIANCE-3). Round-robin incoming orders across sub-partitions. Each sub-partition has its own matching engine instance.

**Great:** Adaptive partitioning (borrowing from Zerodha's silo approach):
- Pre-market: analyze previous day's volume, assign partition count per symbol proportionally
- Each partition is a single-threaded matching engine (LMAX-style)
- Sub-partitions for same symbol share an order book via shared memory (or merge at end of batch)
- During lull periods, consolidate partitions back to save resources

**Backstop:** Queue depth monitoring. If any partition's lag exceeds 1000 messages, auto-scale by spinning up additional consumer for that partition.

---

### Deep Dive 5: CQRS and Event Sourcing for Audit

**Why event sourcing for a broker?**
Regulators (SEBI, SEC) require a full audit trail of every order state change. "What was the state of order X at 10:32:47.123?" must be answerable. Event sourcing gives this for free — replay events to any point in time.

**Architecture:**
- Every state change is an immutable event in Kafka (retained forever / 7 years)
- Current state is a projection: `OrderProjector` consumes events and materializes current state in Postgres
- Audit queries replay from Kafka directly (or from a cold store like S3 + Athena for old data)
- CQRS: writes go through OMS → Kafka. Reads go through Query Service → projected DB/cache.

**Trade-off:** Eventual consistency on reads (200-500ms lag). Acceptable for portfolio views. Not acceptable for balance checks (those hit the write DB directly).

---

### Deep Dive 6: Idempotent Order Submission

**Problem:** User's network drops after hitting "Buy." App retries. Without protection, user buys 2x.

**Mechanism:**
1. Client generates a UUID `idempotencyKey` before sending
2. OMS has a table: `idempotency_keys (key VARCHAR PK, order_id UUID, created_at TIMESTAMP, expires_at TIMESTAMP)`
3. On receive: `INSERT INTO idempotency_keys (key, order_id) VALUES (?, ?) ON CONFLICT (key) DO NOTHING`
4. If insert succeeds → new order, proceed
5. If conflict → duplicate, return the existing `order_id` and its current status
6. Keys expire after 24 hours (cron cleanup)

**Cost:** One extra DB lookup per order. At 100K orders/sec, this table is write-hot. Solution: partition by key hash, or use Redis with TTL for the idempotency check (faster, but less durable — acceptable since the DB has a unique constraint as backstop).

---

## 7.5. Design Self-Audit

| Question | Answer |
|---|---|
| Dedicated search index? | Not needed — users search by symbol (indexed column), not free text |
| Stale reads after writes? | Read-your-writes for order status via write-DB; portfolio via cache invalidation on fill |
| Single points of failure? | Matching engine is single-leader per symbol — failover via standby replica with Kafka replay |
| Dead-letter / reconciliation? | ✅ Reconciler scans PENDING orders, DLQ for failed notifications |
| Data freshness across caches? | Portfolio cache TTL 30s + event-driven invalidation on fills |
| Cost at scale? | Kafka retention (7 years) → tier to S3 after 30 days. Matching engine is CPU-only, no expensive DB |

---

## 8. Final Architecture

```mermaid
flowchart LR
    subgraph Clients
        MOB["Mobile App"]:::client
        WEB["Web App"]:::client
    end

    subgraph Edge
        LB["Load Balancer"]:::edge
        GW["API Gateway"]:::edge
        WSG["WebSocket Gateway"]:::edge
    end

    subgraph Services
        OMS["Order Management"]:::service
        ME["Matching Engine x N"]:::service
        QS["Query Service"]:::service
        NS["Notification Service"]:::service
        REC["Reconciler"]:::service
        PROJ["Event Projector"]:::service
    end

    subgraph Async
        KF["Kafka"]:::async
    end

    subgraph Data
        PG["Postgres Primary"]:::data
        PGR["Postgres Read Replica"]:::data
        RD["Redis Cluster"]:::data
        S3["S3 Cold Storage"]:::data
    end

    subgraph External
        EX["Exchange NSE BSE"]:::external
        FCM["FCM and APNs"]:::external
    end

    MOB --> LB
    WEB --> LB
    LB --> GW
    LB --> WSG
    GW --> OMS
    GW --> QS
    OMS --> PG
    OMS --> KF
    KF --> ME
    ME --> KF
    ME --> EX
    KF --> NS
    KF --> PROJ
    PROJ --> PGR
    PROJ --> RD
    QS --> RD
    QS --> PGR
    NS --> FCM
    NS --> WSG
    REC --> PG
    REC --> KF
    KF --> S3

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef edge fill:#42A5F5,stroke:#1565C0,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef async fill:#AB47BC,stroke:#6A1B9A,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
    classDef external fill:#EC407A,stroke:#880E4F,color:#fff
```

---

*Drop a comment below if you want a specific deep dive expanded (margin trading, options settlement, FIX protocol) 👇*
