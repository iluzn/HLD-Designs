---
layout: default
title: "Rate Limiting in System Design - Token Bucket, Sliding Window, Algorithms"
description: "Complete guide to rate limiting for system design interviews. Token bucket, sliding window, leaky bucket algorithms. Distributed rate limiting with Redis."
permalink: /concepts/rate-limiting/
---

# Rate Limiting - Complete Deep Dive

> **Prerequisites:** [Caching](/concepts/caching/), [API Gateway](/concepts#api-gateway)
> **Used in:** [Rate Limiter HLD](/hld/RateLimiter), every API-facing system

---

## What is Rate Limiting?

Rate limiting controls how many requests a client can make in a given time window. It protects your system from being overwhelmed — whether by a bug, abuse, or DDoS attack.

**Real-world analogy:** A nightclub with a bouncer. Capacity is 200. Once 200 people are inside, the bouncer stops letting people in until someone leaves. Doesn't matter who you are — the limit applies to everyone.

**Without rate limiting:**
```
Buggy client sends 10,000 requests/sec
→ Your servers max out CPU
→ Database connection pool exhausted
→ Legitimate users get errors
→ System crashes
```

**With rate limiting:**
```
Buggy client sends 10,000 requests/sec
→ Rate limiter allows 100/sec, rejects 9,900
→ Client gets 429 Too Many Requests
→ System stays healthy for everyone else
```

---

## Where Rate Limiting Lives

```
Client → CDN/Edge (Cloudflare rules) → API Gateway (per-user limits) → Service
                                                                         ↓
                                                              Per-endpoint limits
```

**Best practice:** Apply at the edge (API Gateway level). Don't put rate limiting inside each microservice — that's too late and duplicates logic.

---

## Rate Limiting Algorithms

### 1. Token Bucket (Most Popular in Interviews)

**How it works:** Imagine a bucket that holds tokens. Tokens are added at a fixed rate. Each request costs one token. If bucket is empty, request is rejected.

```
Bucket capacity: 10 tokens (max burst)
Refill rate: 2 tokens/second

Timeline:
  t=0: bucket has 10 tokens
  t=0: 5 requests arrive → 5 tokens used → 5 remaining
  t=1: 2 tokens added → 7 remaining
  t=1: 3 requests arrive → 3 used → 4 remaining
  t=2: 2 tokens added → 6 remaining
  t=2: 8 requests arrive → only 6 allowed, 2 rejected
```

**Properties:**
- Allows bursts (up to bucket capacity)
- Average rate matches refill rate
- Simple to implement

```python
class TokenBucket:
    def __init__(self, capacity, refill_rate):
        self.capacity = capacity
        self.tokens = capacity
        self.refill_rate = refill_rate  # tokens per second
        self.last_refill = time.time()

    def allow_request(self):
        # Refill tokens based on elapsed time
        now = time.time()
        elapsed = now - self.last_refill
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        self.last_refill = now

        # Check if we have a token
        if self.tokens >= 1:
            self.tokens -= 1
            return True  # Allowed
        return False  # Rejected (429)
```

**Used by:** AWS API Gateway, Stripe, most cloud providers

---

### 2. Sliding Window Log (Most Precise)

**How it works:** Store the timestamp of every request. To check if a new request is allowed, count how many timestamps fall within the last N seconds.

```
Window size: 60 seconds
Max requests: 100

Request arrives at t=150:
  - Look at all timestamps in range [90, 150]
  - Count = 98 → under limit → allow, store timestamp 150
  
Request arrives at t=151:
  - Look at all timestamps in range [91, 151]
  - Count = 100 → AT limit → reject
```

**Implementation with Redis Sorted Set:**
```
ZREMRANGEBYSCORE key 0 (now - window_size)   # Remove old entries
ZCARD key                                     # Count current window
ZADD key now now                              # Add this request
EXPIRE key window_size                        # Cleanup
```

**Pros:** Perfectly accurate. No edge-case bursts.
**Cons:** Memory-heavy — stores every request timestamp. At 10K requests/sec, that's 600K entries per minute per user.

---

### 3. Sliding Window Counter (Best Tradeoff)

**How it works:** Combines two fixed windows and weights the previous window by time overlap. ~99% accurate with minimal memory (just 2 counters).

```
Window size: 1 minute
We're at 15 seconds into the current minute (25% in)

Previous minute count: 80 requests
Current minute count: 20 requests

Weighted estimate = 80 × 75% + 20 × 100% = 60 + 20 = 80
(75% because 75% of previous window overlaps with our sliding window)

Limit = 100 → 80 < 100 → allowed
```

**Why it's approximate:** We assume requests in the previous window were evenly distributed. In reality they might have been bursty. But the error is typically < 1%.

**Pros:** Only stores 2 integers per key. Very fast.
**Cons:** ~1% inaccuracy (acceptable for most use cases).

**Used by:** Cloudflare, most production rate limiters.

---

### 4. Leaky Bucket

**How it works:** Requests enter a queue (bucket). The queue processes at a fixed rate. If queue is full, new requests are dropped.

```
Queue capacity: 10
Processing rate: 5 requests/second

Burst of 15 requests:
  - 10 enter the queue
  - 5 are dropped immediately
  - Queue drains at 5/sec (takes 2 seconds to empty)
```

**Difference from Token Bucket:**
- Token Bucket: allows bursts (processes immediately if tokens available)
- Leaky Bucket: smooths output (always processes at fixed rate)

**Used by:** Network traffic shaping (TCP congestion control), not common in API rate limiting.

---

### 5. Fixed Window Counter (Simplest but Flawed)

**How it works:** Count requests in fixed time windows (minute 1, minute 2, etc).

```
Window: 1 minute
Limit: 100

Minute 1 (0:00 - 0:59): 60 requests → allowed
Minute 2 (1:00 - 1:59): 0 requests so far → reset counter
```

**The flaw — burst at window edges:**
```
Minute 1, second 59: 100 requests (just under limit)
Minute 2, second 0:  100 requests (new window, counter reset)

Result: 200 requests in 2 seconds! Double the intended rate.
```

This is why sliding window is preferred.

---

## Algorithm Comparison

| Algorithm | Accuracy | Memory | Burst Handling | Complexity |
|---|---|---|---|---|
| Token Bucket | Good | Low (1 counter + timestamp) | Allows controlled bursts | Low |
| Sliding Window Log | Perfect | High (stores all timestamps) | No bursts at boundary | Medium |
| Sliding Window Counter | ~99% | Low (2 counters) | Minimal boundary burst | Low |
| Leaky Bucket | Good | Medium (queue) | Smooths all bursts | Medium |
| Fixed Window | Poor (edge burst) | Low (1 counter) | Bad at boundaries | Very Low |

**For interviews: say Token Bucket or Sliding Window Counter.** Explain why fixed window has the edge problem if asked.

---

## Distributed Rate Limiting

Single-server rate limiting is easy (in-memory counter). But with 10 servers, each seeing different requests, how do you enforce a global limit?

### Approach 1: Centralized Store (Redis)

All servers check the same Redis instance before allowing a request.

```
Server A: redis.INCR("user:123:minute:500") → returns 51 → under 100 → allow
Server B: redis.INCR("user:123:minute:500") → returns 52 → under 100 → allow
...
Server C: redis.INCR("user:123:minute:500") → returns 101 → over limit → REJECT
```

**Problem:** Race condition between INCR and limit check.
**Solution:** Use Redis Lua script (atomic execution):

```lua
-- Atomic rate limit check
local count = redis.call('INCR', KEYS[1])
if count == 1 then
    redis.call('EXPIRE', KEYS[1], ARGV[1])  -- Set TTL on first request
end
if count > tonumber(ARGV[2]) then
    return 0  -- Rejected
end
return 1  -- Allowed
```

### Approach 2: Local + Sync

Each server maintains a local counter. Periodically sync with central store. Less accurate but no Redis dependency on every request.

```
Server A: local_count=30, syncs every 5s
Server B: local_count=25, syncs every 5s
Central: total=55 (under 100) → all good
```

**Trade-off:** Can overshoot limit by up to (num_servers × sync_interval_requests). Acceptable for most use cases.

---

## HTTP Response for Rate-Limited Requests

When a request is rate-limited, return:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 30
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1625097600

{
    "error": "Rate limit exceeded. Try again in 30 seconds."
}
```

**Headers to include:**
- `Retry-After`: seconds until the client can retry
- `X-RateLimit-Limit`: total requests allowed in window
- `X-RateLimit-Remaining`: requests remaining
- `X-RateLimit-Reset`: Unix timestamp when window resets

---

## Rate Limiting by What?

| Limit by | When | Example |
|---|---|---|
| User ID | Authenticated APIs | "User can make 1000 API calls/hour" |
| IP address | Public endpoints, login pages | "Max 10 login attempts per IP per minute" |
| API key | Third-party integrations | "Free tier: 100 calls/day, Pro: 10000/day" |
| Endpoint | Expensive operations | "/search: 30/min, /upload: 5/min" |
| Combination | Fine-grained control | "User X on endpoint Y: 50/min" |

---

## Common Interview Questions

**Q: "Where would you add rate limiting in this design?"**
A: At the API Gateway level, before requests reach any backend service. Use Redis for distributed state across multiple gateway instances.

**Q: "What algorithm would you use?"**
A: Token Bucket for most cases — it's simple, allows controlled bursts, and only needs 2 values per key (tokens + last_refill_timestamp). For stricter requirements, Sliding Window Counter.

**Q: "What if Redis is down?"**
A: Fail open (allow all requests) or fail closed (reject all). Usually fail open — better to serve some extra requests than reject all users. Log the failure and alert.

**Q: "How do you handle distributed rate limiting without a central store?"**
A: Each server gets a fraction of the limit (100 total / 10 servers = 10 per server). Coarse but works without coordination. Or use the local+sync approach with periodic aggregation.

**Q: "What's the difference between rate limiting and throttling?"**
A: Rate limiting = hard reject after limit. Throttling = slow down (queue/delay) instead of reject. Rate limiting is simpler and more common.

---

## Real-World Examples

| Company | Limit | Details |
|---|---|---|
| GitHub API | 5000/hour (authenticated) | Token-based, returns headers |
| Twitter API | 300 tweets/3 hours | Per-user per-app |
| Stripe | 100/sec (test mode) | Per-API-key |
| Google Maps | 50 requests/sec | Per-project |
| OpenAI | Tokens/min + requests/min | Dual limit |

---

[← Back to Fundamentals](/concepts) | [← Caching](/concepts/caching/) | [Next: Distributed Locking →](/concepts/distributed-locking/)
