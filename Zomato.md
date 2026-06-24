---
layout: default
title: "Designing a Food Delivery Service Like Zomato"
description: "System design for Designing a Food Delivery Service Like Zomato - architecture, deep dives, and trade-offs"
---

# Designing a Food Delivery Service Like Zomato

## Understanding the Problem

🍔 **What is Zomato?** Zomato is an on-demand food delivery platform that connects customers with nearby restaurants. Customers browse menus, place orders, pay, and watch their food travel from the restaurant to their door via a delivery partner.

## Functional Requirements

### Core Requirements
1. Customers should be able to search for nearby restaurants and browse their menus.
2. Customers should be able to place an order and pay for it.
3. The system should dispatch the order to an available delivery partner and let the customer track it in real time.

### Below the line (out of scope)
- Ratings and reviews for restaurants and riders
- Promotions, coupons, loyalty programs
- Scheduled / group orders
- Restaurant onboarding and menu management tooling
- Multi-restaurant carts

## Non-Functional Requirements

### Core Requirements
- **Low latency** for search and order placement: search < 300 ms P95, order placement < 1 s P95.
- **Strong consistency** for order state and payment — no double charges, no two riders assigned to one order.
- **High throughput at peak** — dinner rush in a metro can generate 100K+ orders/hour and 200K+ live rider GPS streams.
- **Real-time tracking** — rider location visible to the customer within 2 seconds of each update.

### Below the line
- Fine-grained access control, GDPR/DPDP compliance
- Disaster recovery with multi-region failover
- CI/CD and zero-downtime deploys
- Full observability stack

---

## Core Entities

- **Customer** — user placing the order.
- **Restaurant** — merchant with a menu and operating hours.
- **Menu Item** — a dish belonging to a restaurant, with price and availability.
- **Order** — a confirmed request linking a customer, a restaurant, and items, with lifecycle state.
- **Delivery Partner (Rider)** — the person physically delivering the order; has a live location.
- **Payment** — the financial transaction tied to an order.

---

## API / System Interface

```
GET  /v1/restaurants?lat=<>&lng=<>&q=<>        → Restaurant[]
GET  /v1/restaurants/:id/menu                  → Menu
POST /v1/orders                                → Order
     Body: { restaurantId, items, addressId, paymentMethod }
     Header: Idempotency-Key: <uuid>
POST /v1/riders/location                       → 200
     Body: { lat, lng }
     (riderId comes from JWT, never trust the body)
PATCH /v1/rides/:rideId                        → Ride
     Body: { accept | decline }
GET  /v1/orders/:id/track                      → WebSocket stream
```

Security: every endpoint requires a JWT. `customerId`, `riderId`, and server-side amounts must never be taken from the client body.

---

## High-Level Design

Let's build up the design by walking through each functional requirement.

### 1) Customers can search restaurants and browse menus

Customer opens the app → hits our backend through an API Gateway → a Restaurant Service returns a list of nearby restaurants filtered by location, cuisine, and availability.

```mermaid
flowchart LR
    CUST["Customer App"]:::client
    GW["API Gateway"]:::edge
    RESTSVC["Restaurant Service"]:::service
    DB[("Restaurants and Menus DB")]:::data

    CUST --> GW
    GW --> RESTSVC
    RESTSVC --> DB

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef edge fill:#42A5F5,stroke:#0D47A1,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
```

### Color Legend

| Color | Layer |
|---|---|
| 🟠 Orange | Clients |
| 🔵 Blue | Edge |
| 🟢 Green | Services |
| 🟣 Purple | Async / Streaming |
| 🟡 Yellow | Data |
| 🩷 Pink | External |

Flow:
1. Customer sends `GET /v1/restaurants?lat&lng&q` via the API Gateway.
2. Gateway handles auth and rate limiting.
3. Restaurant Service queries the DB for restaurants near the customer's coordinates and returns the results.
4. Customer picks one, hits `GET /v1/restaurants/:id/menu`, same service serves the menu.

The naive version of this is fine for now; we'll address the cost of geo queries and scale in the deep dives.

### 2) Customers can place and pay for an order

When the customer confirms a cart, we need to create an order, charge them, and move on to dispatch. We add an Order Service and a Payment Service.

```mermaid
flowchart LR
    CUST["Customer App"]:::client
    GW["API Gateway"]:::edge
    ORDER["Order Service"]:::service
    PAY["Payment Service"]:::service
    DB[("Orders DB")]:::data
    PG["Payment Gateway<br/>Razorpay Stripe UPI"]:::external

    CUST --> GW
    GW --> ORDER
    ORDER --> DB
    ORDER --> PAY
    PAY --> PG

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef edge fill:#42A5F5,stroke:#0D47A1,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
    classDef external fill:#EC407A,stroke:#880E4F,color:#fff
```

Flow:
1. Customer sends `POST /v1/orders` with an `Idempotency-Key` header.
2. Order Service validates the cart and computes the authoritative total.
3. Order Service calls Payment Service, which charges through the gateway.
4. On success, Order Service writes an `Order` row with status `CONFIRMED`.
5. Customer gets back an order confirmation.

The idempotency key protects against double-submission from network retries. The server computes the final amount itself — never trust the client's number.

### 3) Match a rider and let the customer track the delivery

Now we introduce a Rider Client, a Location Service that receives live GPS pings, and a Ride Matching Service that picks a rider for each confirmed order. We also need a push channel so the rider gets notified immediately.

```mermaid
flowchart LR
    CUST["Customer App"]:::client
    RIDER["Rider App"]:::client
    GW["API Gateway"]:::edge
    ORDER["Order Service"]:::service
    MATCH["Ride Matching Service"]:::service
    LOC["Location Service"]:::service
    NOTIF["Notification Service"]:::service
    LOCDB[("Location Store")]:::data
    ORDERDB[("Orders DB")]:::data
    PUSH["FCM and APNs"]:::external

    RIDER -->|"location pings"| LOC
    LOC --> LOCDB
    CUST --> GW
    GW --> ORDER
    ORDER --> ORDERDB
    ORDER -->|"match request"| MATCH
    MATCH --> LOCDB
    MATCH --> NOTIF
    NOTIF --> PUSH
    PUSH --> RIDER
    RIDER -->|"accept"| GW

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef edge fill:#42A5F5,stroke:#0D47A1,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
    classDef external fill:#EC407A,stroke:#880E4F,color:#fff
```

Flow:
1. Riders continuously send GPS updates to the Location Service, which keeps a live position per rider.
2. Once an order is confirmed, the Order Service asks the Ride Matching Service to find a rider.
3. Matching queries the location store for nearby available riders and picks the best one.
4. Notification Service pushes the offer to the rider's phone via FCM or APNs.
5. Rider taps accept, which sends a `PATCH /v1/rides/:rideId`. Order Service updates the order to `RIDER_ASSIGNED`.
6. Customer's app subscribes to a tracking channel and sees the rider's position on a map.

That's the happy path covered. Now the interesting parts.

---

## Potential Deep Dives

### Deep Dive 1 — How do we handle 200K riders pinging their location every few seconds?

**Problem.** 200K riders × 1 ping / 4s ≈ 50K writes/sec of tiny geo records. Standard databases (PostgreSQL, DynamoDB) would either fall over on write volume or cost a fortune. And we also need to answer "give me riders within 3 km of this point" fast — a lat/lng scan of millions of rows is a non-starter.

**Bad — store every ping in PostgreSQL with a B-tree on (lat, lng).**
Writes are O(log N) per insert and proximity queries require a full scan or a bounding-box lookup that's still O(N) in the worst case. B-trees don't understand two-dimensional data. Breaks under real load.

**Good — use PostGIS or a geospatial index.**
PostGIS adds R-tree / GiST indexes tuned for 2D queries. `ST_DWithin(point, rider_location, 3000)` gives you nearby riders in log N. Handles the read side, but writes at 50K/sec still hammer the DB and each write costs multiple disk IOs.

**Great — use Redis Geo for live positions, partitioned by city.**
Redis Geo (backed by sorted sets under the hood with geohash scoring) stores rider positions entirely in memory:
- `GEOADD riders:{city_id} <lng> <lat> <rider_id>` — O(log N) and well under a millisecond.
- `GEOSEARCH riders:{city_id} FROMLONLAT <lng> <lat> BYRADIUS 3 km COUNT 50` — returns nearby riders in tens of microseconds.

Sharding by `city_id` keeps each Redis shard small (say 10K riders) and evenly distributed. Riders don't cross city boundaries often.

Freshness over durability is the right tradeoff here — if Redis loses a few seconds of pings, the rider just shows up again on the next ping. We still tee every ping to Kafka for a durable history stream consumed by analytics and fraud detection, not by the matching hot path.

Client-side optimization matters too. Instead of dumb 5s intervals, the rider app can adapt:
- Stationary rider → 30s interval.
- Moving rider → 3-5s interval.
- Sharp turn or stop → immediate ping.

This alone cuts traffic by 60-70%.

```mermaid
flowchart LR
    RIDER["Rider App<br/>adaptive pings"]:::client
    LOC["Location Service"]:::service
    GEO[("Redis Geo<br/>sharded by city")]:::data
    K["Kafka<br/>rider location stream"]:::async
    DW[("Cassandra<br/>history")]:::data

    RIDER --> LOC
    LOC --> GEO
    LOC --> K
    K --> DW

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef async fill:#AB47BC,stroke:#4A148C,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
```

### Deep Dive 2 — How do we make sure one rider isn't offered the same order twice, and one order isn't offered to two riders at the same time?

**Problem.** Matching is a race. Multiple concurrent orders in the same area may see the same candidate rider at the top of their list. Without coordination we could double-book a rider, or send the same customer's order to two riders.

**Bad — optimistically send to the top candidate, hope for the best.**
Under high concurrency this produces double-offers. Riders get confused, customers get delayed.

**Good — lock the rider with a Redis `SET NX PX`.**
Before sending an offer, try `SET offer:rider:{rider_id} <orderId> NX PX 10000`.
- `NX` = only set if no offer is currently out.
- `PX 10000` = 10-second window for the rider to accept.
If the lock fails, the rider is busy; move on to the next candidate. If the rider doesn't accept within 10 s, the key expires and someone else can offer.

This is the same "reserve a ticket at checkout" pattern from Ticketmaster.

**Great — add a fencing token to defend against late accepts.**
A rider might hit "accept" after the 10-second TTL expired and another order already locked them. Store a monotonic `offer_seq` as the lock value: `SET offer:rider:r1 "orderA:42" NX PX 10000`. The rider's accept request carries `offer_seq = 42`. On accept, the service runs a Lua compare-and-delete: only honor the accept if the current lock value still matches `orderA:42`. Late accepts are rejected cleanly.

This gives us strong consistency in matching without introducing a traditional database transaction on the hot path.

### Deep Dive 3 — Real-time updates for the customer tracking the order

**Problem.** The customer's map needs to show the rider moving smoothly. We can't have the app hammer the server with polling queries — at 20 million DAU, that's catastrophic.

**Bad — short polling every 3 seconds.**
Easy to implement but means millions of wasted requests for orders that aren't moving, and 3-second lag feels laggy.

**Good — long polling or server-sent events (SSE).**
SSE gives one-way server → client push over a long-lived HTTP connection. Works well for pure read streams like live tracking. But iOS Safari support is flaky for SSE, and you lose the persistent connection during app backgrounding.

**Great — WebSocket from client to a WebSocket Gateway, Redis Pub/Sub behind it.**
- Customer app opens a WSS connection to our WebSocket Gateway.
- Gateway subscribes the connection to a Redis Pub/Sub channel `track:order:<id>`.
- Location Service publishes every rider ping for an active delivery to that channel.
- Gateway fans out the message to every subscribed customer on the same pod.

Consistent hashing at the edge routes all subscribers for one order to the same gateway pod, keeping Pub/Sub fan-out local. Supports millions of concurrent connections with a few hundred pods.

### Deep Dive 4 — What if no rider accepts? What if the gateway loses the accept?

**Problem.** This is a multi-step human-in-the-loop workflow. Any step can fail: rider doesn't respond, app crashes, phone loses signal, offer times out. We need to move on to the next rider automatically and never strand an order.

**Bad — best-effort timers in the matching service.**
If the matching service pod restarts mid-offer, the state is lost and the order hangs. Customer waits forever.

**Good — persist the matching state in a database and poll it with a worker.**
Matching state lives in a DB, a background worker looks for expired offers and triggers reassignment. Works but you're hand-rolling a workflow engine and retry logic, which is always more subtle than it looks.

**Great — use a durable workflow engine like Temporal (Cadence).**
The whole matching workflow is expressed as a Temporal workflow: "offer to top rider, wait 10s, if no accept, offer to next rider, repeat up to N times, then emit DispatchFailed." Temporal persists every step's state to its own storage. If any worker crashes, another worker picks up the exact same workflow at the exact same step — no custom retry code needed.

Uber themselves open-sourced Cadence for exactly this reason; food-delivery dispatch is the same class of problem.

### Deep Dive 5 — How do we search across 500K restaurants with text, filters, and ranking?

**Problem.** Zomato isn't just "tap the nearest pin" — customers type "biryani," filter by "pure veg, rating 4+, under ₹300," and expect relevant results in under 300ms. At 50K search QPS peak across a catalog of 500K restaurants with nested menu items, the requirements are: text search, faceted filters, geo constraint, custom ranking, and personalization, all at low latency.

**Bad — `WHERE name ILIKE '%biryani%' AND is_open = true` on Postgres.**
Full table scans. No relevance ranking. No typo tolerance — "biriyani" returns nothing. Facet counts (how many veg results? how many 4+ rated?) require a separate aggregation query per facet. Falls apart past 50 QPS.

**Good — Postgres full-text search with `tsvector` + PostGIS for geo.**
Adds a GIN-indexed `tsvector` column, handles stemming and basic relevance. Works for small catalogs. But:
- Ranking is rigid — hard to blend text relevance with distance, rating, and popularity.
- No out-of-the-box typo tolerance or edge n-grams for prefix matching as the user types.
- Facet counts still require separate `COUNT(*) GROUP BY` queries.
- Search traffic competes with OLTP writes on the same Postgres cluster.

**Great — Elasticsearch as a dedicated search index, fed by CDC.**
Elasticsearch is purpose-built for exactly this workload:
- **Inverted index + BM25** for fast text search with proper relevance.
- **Edge n-grams** for as-you-type suggestions ("piz" → "pizza").
- **Geo-point filter + distance scoring** built in.
- **`function_score` query** blends text relevance, distance, rating, popularity, and personalization into a single score in one query.
- **Aggregations** give you all facet counts in the same request.

Index structure — one document per restaurant with denormalized menu highlights:
```json
{
  "restaurant_id": "r_123",
  "name": "Pizza Hub",
  "name_ngram": "piz pizz pizza pizz hub",
  "cuisines": ["italian", "pizza"],
  "location": {"lat": 12.93, "lon": 77.61},
  "rating": 4.3,
  "price_range": 2,
  "is_open": true,
  "popular_items": ["margherita pizza", "garlic bread"],
  "popularity_score": 0.87
}
```

A query blends relevance + distance + rating in one shot:
```json
{
  "query": {
    "bool": {
      "filter": [
        { "geo_distance": { "distance": "5km", "location": { "lat": 12.9, "lon": 77.6 } } },
        { "term": { "is_open": true } },
        { "range": { "rating": { "gte": 4 } } }
      ],
      "must": [{ "match": { "name_ngram": "biryani" } }]
    }
  },
  "functions": [
    { "gauss": { "location": { "origin": "...", "scale": "2km" } } },
    { "field_value_factor": { "field": "popularity_score", "modifier": "sqrt" } }
  ],
  "score_mode": "sum"
}
```

**Keeping the index in sync.** Restaurants and menus live in the primary DB (Postgres or Mongo). We don't dual-write — that leads to drift. Instead, Debezium tails the DB's change log and publishes to a Kafka topic; a Kafka consumer materializes the search document and bulk-indexes it into Elasticsearch. End-to-end lag under 3 seconds is fine for a catalog that changes slowly.

**Adding a cache in front.** Popular queries (`"pizza near me"` in Bangalore CBD) repeat constantly. Cache the top results in Redis with a key like `search:{geohash5}:{query_hash}` and a 60-second TTL. Use single-flight / request coalescing on cache miss so a viral query doesn't stampede Elasticsearch.

```mermaid
flowchart LR
    CUST["Customer App"]:::client
    GW["API Gateway"]:::edge
    SEARCH["Search Service"]:::service
    REDIS[("Redis<br/>query cache")]:::data
    ES[("Elasticsearch")]:::data
    RDB[("Primary DB")]:::data
    CDC["Debezium CDC"]:::async
    K["Kafka"]:::async
    IDX["Indexer"]:::service

    CUST --> GW
    GW --> SEARCH
    SEARCH --> REDIS
    SEARCH --> ES
    RDB --> CDC
    CDC --> K
    K --> IDX
    IDX --> ES

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef edge fill:#42A5F5,stroke:#0D47A1,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef async fill:#AB47BC,stroke:#4A148C,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
```

This is why a separate search tier matters: we get text, geo, facets, and relevance ranking in one system, decoupled from the OLTP database that owns the truth.

---

## Core Flows

Here's how each functional requirement plays out end-to-end across the system.

### Flow 1 — Search for nearby restaurants

```mermaid
sequenceDiagram
    autonumber
    participant C as Customer App
    participant GW as API Gateway
    participant S as Search Service
    participant R as Redis Cache
    participant ES as Elasticsearch
    participant RS as Restaurant Service
    participant DB as Restaurants DB

    C->>GW: GET v1 restaurants lat lng q
    GW->>GW: auth JWT and rate limit
    GW->>S: forward query
    S->>R: lookup geohash5 and query hash
    alt cache hit
        R-->>S: cached top results
    else cache miss
        S->>ES: geo text filters query
        ES-->>S: ranked candidates
        S->>R: cache 60s TTL
    end
    S-->>C: restaurant list with ETA and rating

    C->>GW: GET v1 restaurants id menu
    GW->>RS: forward
    RS->>DB: fetch menu
    DB-->>RS: menu document
    RS-->>C: menu JSON
```

1. Gateway validates the JWT and applies per-user rate limits.
2. Search Service computes a cache key from a coarse geohash plus the query and filter fingerprint.
3. Cache miss hits Elasticsearch with a `function_score` query blending text relevance, geo distance, rating, and popularity in one shot.
4. Results are cached for 60 seconds with request coalescing to prevent stampedes on viral queries.
5. Customer picks a restaurant; client fetches the menu directly from the Restaurant Service.

### Flow 2 — Place and pay for an order

```mermaid
sequenceDiagram
    autonumber
    participant C as Customer App
    participant GW as API Gateway
    participant O as Order Service
    participant R as Redis
    participant P as Payment Service
    participant PG as Payment Gateway
    participant DB as Orders DB
    participant K as Kafka

    C->>GW: POST v1 orders Idempotency-Key
    GW->>O: forward with JWT
    O->>R: SET NX idem key 60s TTL
    alt retry of completed request
        R-->>O: cached response
        O-->>C: replay original 201
    else first attempt
        O->>O: validate cart and compute authoritative total
        O->>P: create payment intent
        P->>PG: authorize charge
        PG-->>P: auth OK txn_ref
        P-->>O: intent confirmed
        O->>DB: insert order plus outbox row in tx
        O->>R: SET idem response 24h
        O-->>C: 201 CONFIRMED
        DB->>K: OrderConfirmed via CDC
    end
```

1. Client generates a UUIDv4 idempotency key tied to the cart. Retries reuse the same key.
2. Order Service checks Redis for the key; duplicate retries replay the cached response with no duplicate processing.
3. Server recomputes the total authoritatively — never trust a client-supplied amount.
4. Payment Service authorizes through the gateway. For UPI this is immediate; for 3DS cards the client finishes the extra step before capture.
5. Order row plus outbox row go in one Postgres transaction — either both land or neither does.
6. Debezium tails the WAL and publishes `OrderConfirmed` to Kafka for downstream services.

Failure worth calling out: if the gateway times out, the order stays in `PAYMENT_PENDING`. A reconciler polls the gateway every 5 minutes and either promotes to `CONFIRMED` or cancels with refund — gateway truth always wins.

### Flow 3a — Dispatch a rider

```mermaid
sequenceDiagram
    autonumber
    participant K as Kafka
    participant D as Dispatch Service
    participant GEO as Redis Geo
    participant LOCK as Redis Locks
    participant WS as WebSocket Gateway
    participant RID as Rider App
    participant O as Order Service

    K->>D: consume OrderConfirmed partitioned by city
    D->>GEO: GEOSEARCH nearby riders 3km
    GEO-->>D: top candidates
    D->>D: ML scorer picks best rider
    D->>LOCK: SET NX PX offer rider r1 token 42
    LOCK-->>D: acquired
    D->>WS: push offer with token 42
    WS->>RID: offer notification
    alt rider accepts within 10s
        RID->>D: accept with token 42
        D->>LOCK: Lua compare and delete token 42
        LOCK-->>D: matched and consumed
        D->>O: RiderAssigned event
        O->>O: CAS status to ASSIGNED
    else timeout or reject
        LOCK-->>D: key expired
        D->>D: pick next candidate and repeat
    end
```

1. Dispatch consumes `OrderConfirmed` from a Kafka topic partitioned by `city_id` so one worker owns each city and there's no cross-worker race.
2. Redis Geo returns nearby riders; the ML scorer ranks them by distance, acceptance rate, and expected pickup time.
3. Before sending an offer, Dispatch grabs a per-rider lock carrying a fencing token — `SET offer:rider:r1 "orderA:42" NX PX 10000`.
4. Rider taps accept; the request carries the token. A Lua compare-and-delete verifies the token still matches. Mismatch means the offer expired and someone else owns the slot — clean rejection.
5. On timeout or reject, Dispatch picks the next candidate. After N unsuccessful rounds, escalate to ops or cancel with refund.

### Flow 3b — Live tracking

```mermaid
sequenceDiagram
    autonumber
    participant RID as Rider App
    participant L as Location Service
    participant GEO as Redis Geo
    participant K as Kafka
    participant PS as Redis PubSub
    participant WS as WebSocket Gateway
    participant CUST as Customer App

    loop every 3 to 5s adaptive
        RID->>L: gRPC stream GPS ping
        L->>GEO: GEOADD riders city
        L->>PS: PUBLISH track order channel
        L->>K: produce rider location
    end

    CUST->>WS: open WSS connection
    WS->>WS: auth JWT and subscribe track order channel
    PS-->>WS: location event
    WS-->>CUST: rider position update
```

1. Rider app streams GPS pings over a long-lived gRPC connection. Intervals are adaptive — 30s when stationary, 3-5s moving, immediate on sharp turns. Cuts traffic by ~60%.
2. Location Service validates each ping, updates Redis Geo for the matching hot path, publishes to a Redis Pub/Sub channel for customer fan-out, and tees a copy to Kafka for history.
3. Customer opens tracking; WebSocket connects and subscribes to the order's channel.
4. Consistent hashing at the edge routes all subscribers for one order to the same gateway pod, keeping Pub/Sub fan-out local.
5. Kafka feeds the durable history tier (ClickHouse warm, S3 cold) for fraud, payouts, and ETA model training.

### Order state machine

For clarity, here's the full state progression driven by events from the flows above:

```mermaid
stateDiagram-v2
    [*] --> CREATED
    CREATED --> CONFIRMED: payment auth succeeds
    CONFIRMED --> ASSIGNED: rider accepts
    ASSIGNED --> READY: restaurant marks ready
    READY --> PICKED_UP: rider exits restaurant geofence
    PICKED_UP --> DELIVERED: rider enters customer geofence
    DELIVERED --> [*]
    CONFIRMED --> CANCELLED: restaurant rejects or no rider found
    CANCELLED --> [*]
```

Every transition is a compare-and-set in Postgres (`UPDATE ... WHERE status = expected_current`), so no consumer can push the order into an illegal state. Each transition writes an outbox row that fans out via Kafka to notification, analytics, and recommendation services.

---

## Final Architecture

Putting it all together:

```mermaid
flowchart LR
    CUST["Customer App"]:::client
    RIDER["Rider App"]:::client
    REST["Restaurant App"]:::client
    GW["API Gateway"]:::edge
    WS["WebSocket Gateway"]:::edge

    RSVC["Restaurant Service"]:::service
    SEARCH["Search Service"]:::service
    ORDER["Order Service"]:::service
    PAY["Payment Service"]:::service
    LOC["Location Service"]:::service
    MATCH["Matching Workflow<br/>Temporal"]:::service
    NOTIF["Notification Service"]:::service

    PUBSUB[("Redis PubSub")]:::data
    GEO[("Redis Geo<br/>per city")]:::data
    SCACHE[("Redis<br/>search cache")]:::data
    ES[("Elasticsearch")]:::data
    ORDERDB[("Orders DB<br/>Postgres")]:::data
    RDB[("Restaurants DB")]:::data
    HIST[("Cassandra<br/>location history")]:::data
    K["Kafka<br/>event bus"]:::async
    CDC["Debezium CDC"]:::async

    PG["Razorpay Stripe UPI"]:::external
    PUSH["FCM APNs"]:::external

    CUST --> GW
    RIDER --> GW
    REST --> GW
    CUST --> WS
    RIDER --> LOC

    GW --> RSVC
    RSVC --> RDB
    GW --> SEARCH
    SEARCH --> SCACHE
    SEARCH --> ES
    RDB --> CDC
    CDC --> K
    K --> ES
    GW --> ORDER
    ORDER --> ORDERDB
    ORDER --> PAY
    PAY --> PG
    ORDER -->|"confirmed"| MATCH
    LOC --> GEO
    LOC --> K
    K --> HIST
    LOC --> PUBSUB
    PUBSUB --> WS
    MATCH --> GEO
    MATCH --> NOTIF
    NOTIF --> PUSH
    MATCH --> ORDER

    classDef client fill:#FF7043,stroke:#BF360C,color:#fff
    classDef edge fill:#42A5F5,stroke:#0D47A1,color:#fff
    classDef service fill:#66BB6A,stroke:#1B5E20,color:#fff
    classDef async fill:#AB47BC,stroke:#4A148C,color:#fff
    classDef data fill:#FFCA28,stroke:#F57F17,color:#000
    classDef external fill:#EC407A,stroke:#880E4F,color:#fff
```

That's the design. Five deep dives in Bad / Good / Great progression, each picking the right primitive for the problem: Redis Geo for live rider locations, Redis locks with fencing tokens for consistent matching, WebSockets plus Pub/Sub for real-time tracking, Temporal for durable multi-step dispatch, and Elasticsearch fed by CDC for catalog search.
