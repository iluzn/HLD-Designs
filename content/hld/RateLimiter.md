---
permalink: /hld/RateLimiter/
layout: default
title: "Design a Rate Limiter - System Design Interview"
description: "System design for a distributed rate limiter - token bucket, sliding window, Redis, edge limiting, and trade-offs. Beginner-friendly with diagrams."
---

# Designing a Rate Limiter

⚡ **Difficulty:** Beginner-Intermediate
📋 **Prerequisites:** [Fundamentals](/concepts) - especially [Caching](/concepts#caching) and [Message Queues](/concepts#message-queues)

---

## TL;DR

A rate limiter blocks users who send too many requests. It protects your servers from being overwhelmed.

```mermaid
flowchart LR
    CLIENT["Client"]:::client
    EDGE["Edge<br/>IP blocking"]:::edge
    GW["API Gateway<br/>per-user limits"]:::edge
    RL["Rate Limiter<br/>checks Redis"]:::service
    REDIS[("Redis<br/>counters")]:::data
    API["Your API"]:::service

    CLIENT --> EDGE
    EDGE --> GW
    GW --> RL
    RL --> REDIS
    GW -->|"allowed"| API
    GW -->|"rejected 429"| CLIENT

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef edge fill:#1e3a5f,stroke:#60a5fa,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

**In 3 sentences:** Every request passes through a rate limiter before reaching your API. The limiter checks a counter in Redis - if under the limit, allow and increment; if over, reject with HTTP 429. Multiple layers (edge + gateway + service) protect different things.

---

## Understanding the Problem

**What is a rate limiter?** When you use an API - say Twitter or Stripe - you can only make a certain number of requests per minute. Go over the limit and you get a "429 Too Many Requests" error. That's a rate limiter.

**Why do we need it?**
- **Protect servers** - one angry client sending 1M requests shouldn't crash the service for everyone
- **Fair usage** - free-tier users get 100 calls/min, paid users get 10000
- **Cost control** - downstream services (databases, third-party APIs) have their own limits
- **Security** - stop brute-force login attempts, credential stuffing, DDoS

**Real examples:**
- GitHub API: 5000 requests/hour per authenticated user
- Stripe API: 100 requests/sec per account
- Twitter API: 300 tweets/3 hours per user

---

## Prior Art We're Drawing From

- **Stripe Rate Limiting** - Uses token bucket with Redis Lua scripts. Publishes rate limit headers (X-RateLimit-Limit, Remaining, Reset) as the API industry standard. ([Stripe Engineering blog](https://stripe.com/blog/rate-limiters))
- **Cloudflare Rate Limiting** - Processes 45M+ HTTP requests/sec. Uses sliding window counters at the edge for IP-level limits, with per-customer limits at the application layer. ([Cloudflare blog](https://blog.cloudflare.com/counting-things-a-lot-of-different-things/))
- **Kong Gateway** - Open-source API gateway with pluggable rate limiting (local, Redis-backed, or cluster-wide). Shows the three-tier pattern: edge → gateway → service. ([Kong rate limiting plugin](https://docs.konghq.com/hub/kong-inc/rate-limiting/))
- **Google Cloud Armor** - Demonstrates adaptive rate limiting that adjusts thresholds based on request patterns rather than fixed rules. ([Google Cloud docs](https://cloud.google.com/armor/docs/rate-limiting-overview))

## Scale Estimation (Back-of-Envelope)

- **Users:** Millions of API clients (both internal services and external developers)
- **Write QPS:** 1M rate-limit checks/sec (every API request triggers a counter check)
- **Read QPS:** Same as write - each check is a read-modify-write on the counter
- **Storage:** ~10GB counter storage in Redis (key per client per window, short TTL)
- **Bandwidth:** Sub-ms latency per check - rate limiter must not become the bottleneck

---

## Functional Requirements

### Core

1. **Limit requests per client** - enforce a max number of requests per time window (e.g., 100 requests/minute per user)
2. **Return clear feedback** - rejected requests get HTTP 429 with headers showing limit, remaining quota, and reset time
3. **Support multiple granularities** - limit by user ID, API key, IP address, or endpoint

### Below the Line

- Adaptive limits (auto-adjust based on system load)
- Per-endpoint weighting (expensive operations cost more tokens)
- Allowlists/blocklists
- Rate limit dashboard for API consumers

---

## Core Entities

- **Rule** - defines a limit: identifier type (user/IP/key), max requests, time window, algorithm
- **Counter** - tracks current usage for a specific client + window combination
- **Window** - the time boundary (fixed 1-min, sliding, or token bucket refill rate)
- **Decision** - the result of a rate check: ALLOW or REJECT, with remaining quota

---

## Naive First Cut

The simplest possible rate limiter:

```mermaid
flowchart LR
    CLIENT["Client"]:::client
    API["API Server<br/>HashMap counter"]:::service
    DB[("Your DB")]:::data

    CLIENT --> API
    API --> DB

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

Keep a `HashMap<userId, requestCount>` inside the API server. On each request: if count < limit → allow, else → reject.

**Why this breaks:**

- ❌ **Multiple servers** - you have 10 API pods. Each has its own counter. Client hits different pods and effectively gets 10× the limit.
- ❌ **Server restart** - counters vanish. Everyone gets a fresh quota after every deploy.
- ❌ **Memory** - 10 million unique users = 10 million map entries = OOM risk.
- ❌ **Window boundaries** - client sends 100 requests at 11:59:59, another 100 at 12:00:01. Both windows allow it, but 200 requests arrive in 2 seconds.

---

## The Solution: Shared Counter in Redis

**New components we need:**

1. **Multiple API Pods** - your application servers running behind a load balancer. Requests hit any of them randomly.
2. **Redis (shared counters)** - a single, blazing-fast in-memory database that ALL pods talk to. It holds the rate-limit counters so every pod sees the same global count.

```mermaid
flowchart LR
    CLIENT["Client"]:::client
    POD1["API Pod 1"]:::service
    POD2["API Pod 2"]:::service
    POD3["API Pod 3"]:::service
    REDIS[("Redis<br/>shared counters")]:::data

    CLIENT --> POD1
    CLIENT --> POD2
    CLIENT --> POD3
    POD1 --> REDIS
    POD2 --> REDIS
    POD3 --> REDIS

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

All pods check the SAME counter in Redis. Doesn't matter which pod handles the request - the global count is always accurate.

><br>💡 **What is Redis?** An in-memory database that responds in under 1 millisecond. Perfect for counters because it's fast enough to check on every single request without slowing down your API.

---

## Rate Limiting Algorithms

There are 5 main approaches. You need to know all of them for interviews, but **Token Bucket** and **Sliding Window Counter** are the most common in production.

---

### Algorithm 1: Fixed Window Counter

**How it works:**
Divide time into fixed intervals (e.g., every 60 seconds). Maintain one counter per user per window. Each request increments the counter. If counter exceeds the limit → reject. At window boundary → counter resets to 0.

**Example with numbers:**
- Limit: 100 requests per minute
- Window: 12:00:00 – 12:00:59
- User sends request #73 at 12:00:45 → counter = 73 → ✅ ALLOW
- User sends request #101 at 12:00:58 → counter = 101 → ❌ REJECT (429)
- Clock hits 12:01:00 → counter resets to 0

**Redis implementation:**
```
key = "rate:{userId}:{minute_number}"
count = INCR key
if count == 1: EXPIRE key 60   ← auto-cleanup
if count > limit: REJECT
else: ALLOW
```

**The boundary burst problem:**
- User sends 100 requests at 12:00:58 (end of window 1) → allowed
- User sends 100 requests at 12:01:01 (start of window 2) → allowed
- Result: 200 requests in 3 seconds, but technically "within limits" in both windows

```mermaid
flowchart LR
    subgraph W1["Window 12:00-12:01"]
        A["100 requests at 12:00:58"]
    end
    subgraph W2["Window 12:01-12:02"]
        B["100 requests at 12:01:01"]
    end
    RESULT["200 requests in 3 seconds!"]:::client

    A --> RESULT
    B --> RESULT

    classDef default fill:#1e1e2e,stroke:#6366f1,color:#e2e8f0
    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
```

| Pros | Cons |
|---|---|
| ✅ Dead simple - one INCR + one EXPIRE | ❌ Boundary burst allows 2× the limit |
| ✅ Minimal memory - 1 counter per user | ❌ Not accurate for tight limits |
| ✅ O(1) per request | ❌ Resets abruptly |

**Used by:** GitHub API (60/hour for unauthenticated), Twitter/X (15-minute fixed windows), Slack API.

---

### Algorithm 2: Sliding Window Log

**How it works:**
Store the exact timestamp of EVERY request in a sorted list (Redis Sorted Set). When a new request arrives:
1. Remove all entries older than `now - window_size`
2. Count remaining entries
3. If count < limit → allow and add new timestamp; else → reject

**Example with numbers:**
- Limit: 5 requests per 60 seconds
- Current time: 12:01:30
- Stored timestamps: `[12:00:25, 12:00:45, 12:01:05, 12:01:20, 12:01:28]`
- Purge entries before 12:00:30 → removes `12:00:25`
- Remaining count: 4
- 4 < 5 → ✅ ALLOW, add `12:01:30` to the set

**Redis implementation:**
```
key = "rate:{userId}"
now = current_timestamp_ms

ZREMRANGEBYSCORE key 0 (now - window_ms)  ← purge old
count = ZCARD key                          ← count remaining
if count < limit:
    ZADD key now now                       ← log this request
    ALLOW
else:
    REJECT
```

| Pros | Cons |
|---|---|
| ✅ Perfectly accurate - zero boundary burst | ❌ Memory-heavy: stores every timestamp |
| ✅ True rolling window | ❌ 10K req/min limit = 10K entries per user |
| ✅ No approximation | ❌ O(n) cleanup on each request |

**Memory:** For a user with 10,000 requests/hour limit, that is 10,000 timestamps stored per user. At 8 bytes each = 80KB per user. With 1M users = 80GB. Expensive.

**Used by:** Payment/billing systems where exact counts are non-negotiable. Not practical for high-volume public APIs.

---

### Algorithm 3: Sliding Window Counter (Cloudflare's approach)

💡 *This is the "best of both worlds" - accuracy of sliding window + memory of fixed window.*

**How it works:**
Keep TWO counters: one for the current fixed window, one for the previous window. Estimate the rolling count using a weighted formula:

```
estimated_count = current_window_count + (previous_window_count × overlap_percentage)
```

The overlap percentage = how much of the previous window is still "within" our rolling window.

**Example with numbers:**
- Limit: 100 requests per minute
- Current time: 12:01:45 (we're 45 seconds into the current window)
- Previous window (12:00–12:01): 80 requests
- Current window (12:01–12:02): 30 requests so far
- Overlap: we're 45s into the new window, so 15s of the old window still counts = 15/60 = 25%
- Estimated count: 30 + (80 × 0.25) = 30 + 20 = **50** → under 100 → ✅ ALLOW

```mermaid
flowchart LR
    subgraph PREV["Previous Window 12:00-12:01<br/>80 requests"]
        OVERLAP["Last 15s<br/>still counts<br/>80 x 0.25 = 20"]:::data
    end
    subgraph CURR["Current Window 12:01-12:02<br/>30 requests so far"]
        NOW["We are here<br/>at 12:01:45"]:::client
    end
    TOTAL["Estimated: 30 + 20 = 50"]:::service

    OVERLAP --> TOTAL
    CURR --> TOTAL

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

**Redis implementation:**
```
prev_key = "rate:{userId}:{prev_minute}"
curr_key = "rate:{userId}:{curr_minute}"
elapsed = seconds_into_current_window
weight = (window_size - elapsed) / window_size

estimated = GET curr_key + GET prev_key × weight
if estimated < limit:
    INCR curr_key
    ALLOW
else:
    REJECT
```

| Pros | Cons |
|---|---|
| ✅ Smooth - no boundary bursts | ❌ Approximate (~0.003% error rate) |
| ✅ O(1) memory - just 2 counters per user | ❌ Slightly more logic than fixed window |
| ✅ Cloudflare tested: 400M requests, 0.003% error | |

**Memory:** Same as fixed window - 2 integers per user. At 1M users: ~16MB. Negligible.

**Used by:** Cloudflare (45M+ req/sec), most modern REST APIs. The go-to choice when you need accuracy without the memory cost of sliding log.

---

### Algorithm 4: Token Bucket ⭐ (most popular in production)

💡 *Think of a bucket that fills with tokens at a steady rate. Each request costs one token. If the bucket is empty, request is rejected. This allows controlled bursts.*

**How it works:**
1. Each user has a bucket with a maximum capacity (e.g., 10 tokens)
2. Tokens are added at a fixed refill rate (e.g., 1 token every 6 seconds = 10/minute)
3. Each request consumes 1 token
4. If bucket is empty → reject with 429
5. Tokens never exceed max capacity (bucket overflows)

**Example with numbers:**
- Bucket capacity: 10 tokens
- Refill rate: 1 token every 6 seconds (10/minute)
- At 12:00:00 → bucket is full (10 tokens)
- User sends 8 requests instantly → 8 tokens consumed → 2 remaining → all ✅ ALLOWED
- At 12:00:06 → 1 token refilled → bucket = 3
- At 12:00:12 → 1 more token → bucket = 4
- User sends 5 requests → 5 tokens consumed → bucket now has -1? No → 4 used, 1 rejected

**Why bursts are OK here:** The bucket starts full, so a user can "burst" up to 10 requests instantly. But then they must wait for refills. Over time, the average rate converges to the refill rate (10/min). This matches real user behavior - people don't send requests at a perfectly steady rate.

```mermaid
flowchart TD
    BUCKET["🪣 Token Bucket<br/>capacity = 10<br/>current = 7 tokens"]:::data
    REFILL["⏰ Refill<br/>+1 token every 6 sec"]:::service
    REQ["📨 Request arrives<br/>costs 1 token"]:::client
    CHECK{"tokens >= 1?"}:::service
    ALLOW["✅ Allow<br/>tokens -= 1"]:::data
    REJECT["❌ 429 Reject"]:::client

    REFILL -->|"adds tokens up to max"| BUCKET
    REQ --> CHECK
    CHECK -->|"yes"| ALLOW
    CHECK -->|"no"| REJECT
    BUCKET --> CHECK

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

**Redis implementation (lazy refill - no background timer):**
```
key = "bucket:{userId}"
stored = GET key → {tokens: 7, last_refill: 1750000000}

elapsed = now - last_refill
new_tokens = elapsed × refill_rate
tokens = min(capacity, stored.tokens + new_tokens)

if tokens >= 1:
    tokens -= 1
    SET key {tokens, last_refill: now}
    ALLOW
else:
    SET key {tokens, last_refill: now}
    REJECT
```

><br>💡 **Lazy refill:** Instead of a background timer adding tokens, we calculate how many tokens SHOULD have been added since the last request. Same result, zero background processes.

| Pros | Cons |
|---|---|
| ✅ Allows natural burst behavior | ❌ Two values stored per user (tokens + timestamp) |
| ✅ Smooth long-term rate enforcement | ❌ Tuning capacity + refill rate takes thought |
| ✅ Memory efficient - ~50 bytes per user | ❌ In distributed systems, need Redis for sync |
| ✅ Best UX for API consumers | |

**Used by:** Stripe, AWS API Gateway, GitHub, Amazon. The industry default for public APIs.

---

### Algorithm 5: Leaky Bucket

💡 *Like token bucket but inverted: requests go INTO the bucket, and leak out at a constant rate. If the bucket overflows, requests are dropped.*

**How it works:**
1. Incoming requests are added to a queue (the bucket) with a fixed capacity
2. A background worker processes requests from the queue at a constant, steady rate
3. If the queue is full when a new request arrives → drop it (429)

**Think of it as:** Water (requests) pouring into a bucket with a small hole at the bottom. Water drains at a constant rate. If you pour too fast, the bucket overflows and water spills (requests are rejected).

**Example with numbers:**
- Bucket size: 5 requests
- Leak rate: 1 request processed every 200ms (5/sec outflow)
- 10 requests arrive simultaneously
- First 5 fill the bucket → queued
- Next 5 → bucket full → ❌ REJECTED
- Over the next second, the 5 queued requests are processed one every 200ms

```mermaid
flowchart LR
    IN["Burst of 10 requests"]:::client
    BUCKET["🪣 Leaky Bucket<br/>capacity = 5<br/>leak rate = 1 per 200ms"]:::data
    OUT["Steady output<br/>1 req every 200ms"]:::service
    DROP["❌ Dropped<br/>5 requests overflow"]:::client

    IN -->|"5 fit"| BUCKET
    IN -->|"5 overflow"| DROP
    BUCKET -->|"constant drip"| OUT

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

**Key difference from Token Bucket:**
- **Token Bucket:** controls how many requests a user can SEND (input shaping)
- **Leaky Bucket:** controls how fast requests are PROCESSED (output shaping)

Token Bucket allows bursts; Leaky Bucket smooths everything to a constant output rate.

| Pros | Cons |
|---|---|
| ✅ Perfectly smooth output - protects backends | ❌ No burst tolerance - strict constant rate |
| ✅ Prevents downstream overload | ❌ Adds latency (requests wait in queue) |
| ✅ Simple FIFO queue implementation | ❌ Old requests processed before new ones |

**Used by:** Shopify REST API (40 bucket size, 2/sec leak rate), Netflix (streaming traffic shaping). Best for protecting downstream services that can't handle spikes.

---

### Comparison Table

| Algorithm | Memory per user | Burst handling | Accuracy | Best for |
|---|---|---|---|---|
| **Fixed Window** | ~8 bytes (1 counter) | ❌ 2× burst at boundaries | Low | Simple internal APIs, MVPs |
| **Sliding Window Log** | O(n) - 80KB+ at scale | ✅ None (perfect) | Perfect | Billing, payment systems |
| **Sliding Window Counter** | ~16 bytes (2 counters) | ✅ Smooth | ~99.99% | Most public REST APIs |
| **Token Bucket** ⭐ | ~50 bytes (token + timestamp) | ✅ Controlled bursts | High | User-facing APIs (Stripe, AWS) |
| **Leaky Bucket** | ~50 bytes or 1KB (queue) | ❌ None (smooths all) | High | Traffic shaping, backend protection |

### Decision flowchart:

```mermaid
flowchart TD
    START["What does your system need?"]:::client
    Q1{"Allow short bursts?"}:::service
    Q2{"Need exact precision?"}:::service
    Q3{"Shaping outbound traffic?"}:::service
    TB["Token Bucket ⭐<br/>Stripe, AWS, GitHub"]:::data
    SWC["Sliding Window Counter<br/>Cloudflare, most APIs"]:::data
    SWL["Sliding Window Log<br/>Payment and billing systems"]:::data
    LB["Leaky Bucket<br/>Shopify, Netflix"]:::data
    FW["Fixed Window<br/>Simple internal use"]:::data

    START --> Q1
    Q1 -->|"Yes"| TB
    Q1 -->|"No"| Q2
    Q2 -->|"Yes exact"| SWL
    Q2 -->|"No approx OK"| Q3
    Q3 -->|"Yes smooth output"| LB
    Q3 -->|"No just cap input"| SWC
    START -->|"Simplest possible"| FW

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

><br>💡 **Interview tip:** Start with Token Bucket as your default answer. If the interviewer asks "what if we can't tolerate any burst?" → switch to Sliding Window Counter. If they ask "what if we need to protect a fragile downstream?" → Leaky Bucket.

---

## Where to Rate Limit (3 layers)

```mermaid
flowchart LR
    CLIENT["Client"]:::client
    L1["Layer 1: Edge<br/>Cloudflare WAF<br/>IP-level DDoS"]:::edge
    L2["Layer 2: Gateway<br/>Kong or Envoy<br/>per-API-key limits"]:::edge
    L3["Layer 3: Service<br/>your code<br/>domain-specific"]:::service
    API["Backend"]:::service

    CLIENT --> L1
    L1 --> L2
    L2 --> L3
    L3 --> API

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef edge fill:#1e3a5f,stroke:#60a5fa,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
```

| Layer | What it blocks | Key | Example |
|---|---|---|---|
| **Edge (Cloudflare/WAF)** | DDoS, bots, abusive IPs | IP address | "No IP can send >1000 req/sec" |
| **Gateway (Kong/Envoy)** | Per-user quota enforcement | API key or user ID | "Free tier: 100/min. Paid: 10000/min" |
| **Service level** | Domain-specific limits | Per resource | "Max 5 password reset emails/hour" |

**Why three layers instead of one?** Each layer catches a different class of threat at a different cost. Edge blocks volumetric DDoS attacks before they hit your infrastructure (cheapest, highest volume). Gateway enforces business rules like "free vs paid tier" (requires knowing who the user is). Service-level limits handle domain logic only your code understands ("max 5 password resets per hour"). Skipping layers means you're either blocking too much (service-level can't handle DDoS volume) or too little (edge doesn't know your business rules).

><br>💡 **Why multiple layers?** Edge blocks volumetric attacks cheaply (before they hit your servers). Gateway enforces business rules. Service handles logic that only your code understands.

---

## What Happens When Redis Goes Down?

This is a classic interview question. Three options:

```mermaid
flowchart TD
    DOWN["Redis is down"]:::data
    FC["Fail-Closed<br/>reject all requests"]:::service
    FO["Fail-Open<br/>allow all requests"]:::service
    FB["Fallback<br/>local in-memory bucket"]:::service

    DOWN --> FC
    DOWN --> FO
    DOWN --> FB

    FC -->|"❌ Global outage"| BAD["Users locked out"]:::client
    FO -->|"⚠️ No protection"| OK["Backend might overload"]:::client
    FB -->|"✅ Graceful"| GOOD["Slightly inaccurate but safe"]:::client

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

**Best answer for interviews:** "Fail-open with a local fallback. If Redis is unreachable, each pod switches to a local in-memory token bucket. Less accurate (each pod enforces limit/N independently) but the API stays up. Alert on Redis being down so ops investigates."

---

## Complete Flow (Sequence Diagram)

### Request allowed:

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant GW as API Gateway
    participant R as Redis
    participant API as Backend API

    C->>GW: GET /api/search
    GW->>GW: extract API key from header
    GW->>R: EVALSHA token_bucket_check
    R->>R: refill tokens based on elapsed time
    R->>R: tokens >= 1 so decrement
    R-->>GW: ALLOWED remaining=87
    GW->>API: forward request
    API-->>GW: 200 response
    GW-->>C: 200 with X-RateLimit-Remaining 87
```

### Request rejected:

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant GW as API Gateway
    participant R as Redis

    C->>GW: GET /api/search
    GW->>R: EVALSHA token_bucket_check
    R->>R: tokens = 0
    R-->>GW: REJECTED reset_in=42s
    GW-->>C: 429 Too Many Requests with Retry-After 42
```

---

## Response Headers

When your API has rate limiting, always return these headers so clients can self-throttle:

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 100        ← max requests per window
X-RateLimit-Remaining: 87     ← how many left
X-RateLimit-Reset: 1750860060 ← when the window resets (unix timestamp)
```

On rejection:
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 42               ← seconds to wait before retrying
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
```

---

## Deep Dive: Distributed Rate Limiting

**Problem:** You have 10 API servers. If each uses its own counter, the total allowed = 10× the limit.

```mermaid
flowchart LR
    subgraph Problem["Without shared state"]
        P1["Pod 1: count=50"]:::service
        P2["Pod 2: count=50"]:::service
        P3["Pod 3: count=50"]:::service
        TOTAL["Total: 150 but limit is 100!"]:::client
    end

    subgraph Solution["With Redis"]
        R1["Pod 1"]:::service
        R2["Pod 2"]:::service
        R3["Pod 3"]:::service
        REDIS["Redis: count=100"]:::data
        R1 --> REDIS
        R2 --> REDIS
        R3 --> REDIS
    end

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

**Three approaches:**

| Approach | How | Trade-off |
|---|---|---|
| **Centralized Redis** | Every request checks Redis | Accurate but adds 0.5-2ms latency per request |
| **Local + periodic sync** | Each pod counts locally, syncs to Redis every 100ms | Fast but can overshoot by ~10% |
| **Sticky routing** | Load balancer always sends same user to same pod | Simple but uneven load distribution |

**Interview answer:** "For protective limits (abuse prevention), local + periodic sync is fine - 10% overshoot is acceptable. For strict limits (billing, credits), always check centralized Redis."

---

## Deep Dive: Handling Burst Traffic

**Problem:** Limit is 100/minute. Client sends all 100 in the first second. Technically within quota, but backend can't handle 100 concurrent requests from one client.

**Solution: Two-tier limiting.**

```mermaid
flowchart TD
    REQ["Incoming request"]:::client
    BURST["Burst check<br/>max 10 per second"]:::service
    SUSTAIN["Sustained check<br/>max 100 per minute"]:::service
    ALLOW["✅ Allow"]:::data
    REJECT["❌ 429 Reject"]:::client

    REQ --> BURST
    BURST -->|"pass"| SUSTAIN
    BURST -->|"fail"| REJECT
    SUSTAIN -->|"pass"| ALLOW
    SUSTAIN -->|"fail"| REJECT

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

Both limits must pass:
- **Burst:** max 10 requests in any 1-second window
- **Sustained:** max 100 requests in any 60-second window

This is what Stripe does - they publish both a "per-second" and "per-minute" limit.

---

## Final Architecture

```mermaid
flowchart LR
    CLIENTS["Clients"]:::client
    EDGE["Edge WAF<br/>IP limits and DDoS"]:::edge
    GW["API Gateway<br/>per-user limits"]:::edge
    RL["Rate Limit Check<br/>Redis Lua script"]:::service
    REDIS[("Redis Cluster<br/>token buckets")]:::data
    RULES[("Rules Config<br/>limit per tier")]:::data
    API["Backend Services"]:::service
    K["Analytics<br/>limit events"]:::async

    CLIENTS --> EDGE
    EDGE --> GW
    GW --> RL
    RL --> REDIS
    RL --> RULES
    GW -->|"allowed"| API
    RL --> K

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef edge fill:#1e3a5f,stroke:#60a5fa,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef async fill:#AB47BC,stroke:#4A148C,color:#fff
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

---

## Interview Cheat Sheet

| Question | Answer |
|---|---|
| "Which algorithm?" | Token Bucket - allows bursts, caps sustained rate |
| "Where to store counters?" | Redis - sub-ms latency, atomic Lua, built-in TTL |
| "How to make it atomic?" | Redis Lua script - read + check + decrement in one operation |
| "What if Redis is down?" | Fail-open + local fallback. Never be a single point of failure. |
| "Where to put it?" | 3 layers: Edge (IP/DDoS) → Gateway (per-user) → Service (domain logic) |
| "How to handle distributed?" | Centralized Redis for strict limits; local sync for soft limits |
| "What headers to return?" | X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After |

---

## Key Technologies Mentioned

| Term | What it is |
|---|---|
| **Redis** | An in-memory database. Responds in < 1ms. Used for counters, caches, and fast lookups. |
| **Lua script** | A tiny program that runs INSIDE Redis. Lets you read + check + write atomically in one network call. No race conditions between "check count" and "increment count". |
| **API Gateway** | A server that sits in front of your APIs. Handles auth, rate limiting, routing. Examples: Kong, Envoy, AWS API Gateway. |
| **CDN / Edge** | Servers at the "edge" of the network, close to users worldwide. Cloudflare, CloudFront. First line of defense. |
| **Token Bucket** | Algorithm: bucket of tokens, refills at steady rate. Each request costs a token. Empty bucket = rejected. |
| **HTTP 429** | Standard HTTP status code meaning "Too Many Requests." Client should back off and retry later. |

><br>💡 Redis Lua scripts execute atomically on the server - critical for distributed rate limiting where multiple pods check the same counter.

---

## What's Expected at Each Level

> This section helps you calibrate your depth. You don't need to cover everything - just know what's expected for your level.

### Mid-level

Explain the token bucket or fixed window algorithm. Propose Redis INCR for counting requests per time window. Understand why in-memory counters fail across multiple servers - each server has its own count, so a client can exceed limits by hitting different servers.

### Senior

Compare token bucket vs sliding window vs sliding window log - articulate the tradeoffs (burst tolerance, memory, precision). Propose Redis Lua scripts for atomic check-and-increment. Discuss multi-tier limiting (edge + gateway + service) and what happens when Redis goes down (fail-open vs fail-closed tradeoff).

### Staff+

Address distributed rate limiting across multiple regions with eventual consistency (local counters + periodic sync vs centralized Redis). Discuss adaptive rate limits that adjust dynamically based on system load (shed traffic before the backend saturates). Cover per-endpoint granularity (expensive operations like writes get tighter limits than cheap reads) and cost-based limiting where each operation has a "weight" consuming tokens proportionally.

---
## 🎯 Key Takeaways

- **Token bucket** allows bursts; **sliding window** is smoother but more complex
- **Redis Lua scripts** make check-and-increment atomic - no race conditions
- **Apply at multiple levels**: per-user, per-IP, per-endpoint, global
- **Return 429 with Retry-After header** - good API citizenship

---
## Related Designs
- [URL Shortener](/hld/URLShortner) - high-QPS API design
- [Leaderboard](/hld/Leaderboard) - Redis patterns
- [Notification System](/hld/NotificationSystem) - protecting downstream services


---

## Related Concepts

Understand the building blocks used in this design:

- [Rate Limiting →](/concepts/rate-limiting/) — the core algorithms (token bucket, sliding window) this whole design is built on
- [Caching →](/concepts/caching/) — Redis holds the per-client counters for sub-millisecond checks
- [Distributed Locking →](/concepts/distributed-locking/) — atomic check-and-decrement via Lua keeps counts correct across many pods
