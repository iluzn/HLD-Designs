---
layout: default
title: "Back-of-Envelope Estimation for System Design Interviews"
description: "Complete guide to back-of-envelope estimation in system design interviews. Numbers to memorize, QPS estimation, storage calculations, bandwidth math."
permalink: /concepts/back-of-envelope/
---

# Back-of-Envelope Estimation - Complete Deep Dive

> **Prerequisites:** None (this is foundational)
> **Used in:** Every HLD interview (first 3 minutes)

---

## What is Back-of-Envelope Estimation?

Quick, approximate calculations to determine the scale of a system — how much storage, bandwidth, and compute you need. Interviewers use this to test whether you can think about scale before diving into design.

**Real-world analogy:** A contractor estimating materials before building a house. They don't measure every nail — they estimate "3-bedroom house, ~2000 sq ft, roughly 15,000 board feet of lumber, ~30 yards of concrete." Close enough to plan. Same idea: estimate scale to make informed design decisions.

```
Interviewer: "Design Twitter"
You: "Let me estimate the scale first."

- 500M users, 200M daily active
- Each user reads ~100 tweets/day → 20B reads/day → ~230K QPS
- Each user posts ~0.5 tweets/day → 100M writes/day → ~1,150 QPS
- Read:Write ratio = 200:1 → read-heavy! Need caching + fan-out

Now you know: optimize for reads, use cache heavily, consider fan-out-on-write.
```

---

## Numbers You Must Memorize

### Latency Numbers

```
┌────────────────────────────────────────────────────────────┐
│  LATENCY NUMBERS EVERY ENGINEER SHOULD KNOW                │
│                                                            │
│  L1 cache reference ................... 0.5 ns             │
│  L2 cache reference ................... 7 ns               │
│  RAM reference ........................ 100 ns             │
│  Read 1 MB from RAM .................. 250 us (0.25 ms)   │
│  SSD random read ..................... 150 us             │
│  Read 1 MB from SSD .................. 1 ms               │
│  HDD seek ............................ 10 ms              │
│  Read 1 MB from HDD .................. 20 ms              │
│  Send packet within same DC .......... 0.5 ms             │
│  Redis GET (network + lookup) ......... 1 ms              │
│  Database query (indexed) ............. 1-5 ms            │
│  Database query (full scan) ........... 50-500 ms         │
│  Send packet cross-continent .......... 150 ms            │
│  TLS handshake ........................ 50-100 ms          │
│                                                            │
│  TAKEAWAYS:                                               │
│  - Memory is 1000x faster than SSD                        │
│  - SSD is 10x faster than HDD                            │
│  - Network within DC is ~0.5ms                           │
│  - Cross-continent adds 150ms                            │
│  - Avoid disk I/O and network hops where possible        │
└────────────────────────────────────────────────────────────┘
```

### Powers of 2

```
┌───────────────────────────────────────────────┐
│  2^10  = 1 Thousand     = 1 KB                │
│  2^20  = 1 Million      = 1 MB                │
│  2^30  = 1 Billion      = 1 GB                │
│  2^40  = 1 Trillion     = 1 TB                │
│  2^50  = 1 Quadrillion  = 1 PB                │
│                                               │
│  Quick conversions:                           │
│  1 KB = 1,000 bytes (use 10^3)               │
│  1 MB = 1,000 KB = 10^6 bytes               │
│  1 GB = 1,000 MB = 10^9 bytes               │
│  1 TB = 1,000 GB = 10^12 bytes              │
└───────────────────────────────────────────────┘
```

### Time Conversions

```
┌──────────────────────────────────────────┐
│  1 day    = 86,400 seconds  ≈ 100K sec   │
│  1 month  = 2.5 million seconds          │
│  1 year   = 30 million seconds           │
│                                          │
│  Shortcut: 1 day ≈ 10^5 seconds         │
│                                          │
│  QPS from daily count:                   │
│  daily_count / 100,000 = average QPS     │
│  Peak QPS ≈ 2-3x average QPS            │
└──────────────────────────────────────────┘
```

### Common Data Sizes

```
┌──────────────────────────────────────────────────────────┐
│  Text:                                                   │
│  - 1 character (ASCII) .............. 1 byte             │
│  - 1 character (UTF-8 avg) ......... 2-3 bytes          │
│  - Tweet (280 chars) ................ ~560 bytes         │
│  - Average JSON API response ........ 1-5 KB            │
│  - Average web page ................. 2-5 MB            │
│                                                          │
│  Media:                                                  │
│  - Profile picture (compressed) ..... 50-200 KB         │
│  - High-res photo ................... 2-5 MB            │
│  - 1 min video (720p) .............. 50-100 MB          │
│  - 1 min video (1080p) ............. 100-200 MB         │
│  - 1 hour video (1080p, compressed).. 1-3 GB            │
│                                                          │
│  Database:                                               │
│  - User record (text fields) ........ 1-2 KB            │
│  - Order record ..................... 2-5 KB             │
│  - Database row (average) ........... 1 KB              │
│  - 1 billion rows at 1 KB each ...... 1 TB              │
│                                                          │
│  Network:                                                │
│  - HTTP request overhead ............ 1-2 KB            │
│  - WebSocket frame overhead ......... 2-14 bytes        │
│  - Average API call payload ......... 1-10 KB           │
└──────────────────────────────────────────────────────────┘
```

---

## The Estimation Framework

For any system, estimate these three:

### 1. QPS (Queries Per Second)

```
Formula:
  QPS = Daily Active Users × Actions per user per day / 86,400

Example (Twitter reads):
  DAU = 200M
  Reads per user per day = 100 (home timeline refreshes + scrolling)
  Read QPS = 200M × 100 / 100,000 = 200,000 QPS
  Peak QPS = 200K × 3 = 600K QPS

Example (Twitter writes):
  DAU = 200M
  Tweets per user per day = 0.5 (not everyone tweets daily)
  Write QPS = 200M × 0.5 / 100,000 = 1,000 QPS
  Peak QPS = 1K × 3 = 3,000 QPS
```

### 2. Storage

```
Formula:
  Storage = Daily new data × Retention period

Example (WhatsApp messages):
  DAU = 500M
  Messages per user per day = 40
  Average message size = 100 bytes (text) or 500 KB (media, 5% of msgs)
  
  Text: 500M × 40 × 100B = 2 TB/day
  Media: 500M × 40 × 0.05 × 500KB = 500 TB/day
  
  Retain for 30 days: ~15,000 TB = 15 PB (just for messages!)
```

### 3. Bandwidth

```
Formula:
  Bandwidth = QPS × Average response size

Example (YouTube streaming):
  Concurrent viewers = 5M
  Average bitrate = 5 Mbps (1080p)
  
  Egress bandwidth = 5M × 5 Mbps = 25 Tbps
  Per server (10 Gbps link) = need 2,500 servers just for streaming
```

---

## Example Calculations

### Twitter/X

```
┌─────────────────────────────────────────────────────────────┐
│  TWITTER ESTIMATION                                         │
│                                                             │
│  Given:                                                     │
│  - 500M total users, 200M DAU                              │
│  - Average: 2 tweets posted / day (among active tweeters)  │
│  - Average: 100 tweet reads / day (timeline + search)      │
│  - 10% of tweets have media (avg 500KB)                    │
│                                                             │
│  QPS:                                                       │
│  - Write QPS: 200M × 0.5 / 100K = 1,000 QPS              │
│  - Read QPS: 200M × 100 / 100K = 200,000 QPS             │
│  - Ratio: 200:1 read-heavy → cache aggressively            │
│                                                             │
│  Storage (per day):                                         │
│  - Tweet text: 100M tweets × 560B = 56 GB/day             │
│  - Media: 10M media × 500KB = 5 TB/day                    │
│  - Metadata: 100M × 200B = 20 GB/day                      │
│  - Total: ~5 TB/day → 150 TB/month → 1.8 PB/year         │
│                                                             │
│  Bandwidth:                                                 │
│  - Read: 200K QPS × 5KB avg response = 1 GB/s egress      │
│  - Media: 50K media reads/s × 500KB = 25 GB/s             │
│                                                             │
│  Design Implications:                                       │
│  - Read-heavy → CDN + cache (Redis for timelines)          │
│  - Media-heavy storage → object store (S3)                 │
│  - Fan-out-on-write for feed generation                    │
└─────────────────────────────────────────────────────────────┘
```

### YouTube

```
┌─────────────────────────────────────────────────────────────┐
│  YOUTUBE ESTIMATION                                         │
│                                                             │
│  Given:                                                     │
│  - 2B total users, 1B DAU                                  │
│  - Average watch time: 30 min/day                          │
│  - 500 hours of video uploaded per minute                  │
│  - Video stored in 5 resolutions                           │
│                                                             │
│  Storage (uploads):                                         │
│  - 500 hours/min = 30,000 hours/hour = 720,000 hours/day  │
│  - 1 hour raw video ≈ 3 GB                                │
│  - 720K hours × 3 GB = 2.16 PB/day (raw)                  │
│  - × 5 resolutions = ~10 PB/day (transcoded)              │
│  - Per year: ~3.6 EB (exabytes!)                          │
│                                                             │
│  Bandwidth (streaming):                                     │
│  - Peak concurrent viewers: ~100M                          │
│  - Average bitrate: 5 Mbps                                │
│  - Peak bandwidth: 100M × 5 Mbps = 500 Tbps              │
│  - CDN handles 95%+ → origin serves ~25 Tbps             │
│                                                             │
│  Design Implications:                                       │
│  - Massive object storage (S3/GCS)                         │
│  - Heavy CDN usage (edge caching for popular videos)       │
│  - Async transcoding pipeline (multiple resolutions)       │
│  - Adaptive bitrate streaming (client picks quality)       │
└─────────────────────────────────────────────────────────────┘
```

### WhatsApp

```
┌─────────────────────────────────────────────────────────────┐
│  WHATSAPP ESTIMATION                                        │
│                                                             │
│  Given:                                                     │
│  - 2B total users, 500M DAU                                │
│  - 40 messages sent per user per day                       │
│  - 5% messages contain media (avg 200KB)                   │
│  - Text message avg: 100 bytes                             │
│                                                             │
│  QPS:                                                       │
│  - Messages: 500M × 40 / 100K = 200,000 QPS              │
│  - Peak: 600K QPS                                          │
│  - Per connection: mostly idle (WebSocket)                  │
│                                                             │
│  Storage (per day):                                         │
│  - Text: 20B msgs × 100B = 2 TB/day                       │
│  - Media: 1B × 200KB = 200 TB/day                         │
│  - Total: ~200 TB/day (dominated by media)                 │
│                                                             │
│  Connections:                                               │
│  - 500M concurrent WebSocket connections (peak)            │
│  - 50K connections per server → 10,000 servers             │
│                                                             │
│  Design Implications:                                       │
│  - WebSocket at massive scale                              │
│  - Media stored in blob storage, only URL in message       │
│  - End-to-end encryption (keys per device)                 │
│  - Message queuing for offline users                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Estimation Cheat Sheet

| Metric | Formula | Example |
|---|---|---|
| QPS | DAU × actions/user / 86,400 | 200M × 10 / 100K = 20K QPS |
| Peak QPS | Average QPS × 2-3 | 20K × 3 = 60K QPS |
| Storage/day | New items/day × item size | 1M × 5KB = 5 GB/day |
| Storage/year | Storage/day × 365 | 5 GB × 365 = 1.8 TB |
| Bandwidth | QPS × avg response size | 20K × 10KB = 200 MB/s |
| Servers needed | Peak QPS / QPS per server | 60K / 1000 = 60 servers |
| Cache size | Hot data × size | 20% of 1TB = 200 GB Redis |

---

## Common Mistakes to Avoid

```
┌─────────────────────────────────────────────────────────────┐
│  ✗ Being too precise: "2,314,814 QPS"                       │
│  ✓ Round aggressively: "about 2.3M QPS, let's say 2-3M"   │
│                                                             │
│  ✗ Forgetting peak vs average                               │
│  ✓ Always multiply average by 2-3x for peak                │
│                                                             │
│  ✗ Ignoring read vs write ratio                             │
│  ✓ Calculate both — it drives caching and architecture     │
│                                                             │
│  ✗ Not stating assumptions                                  │
│  ✓ "I'll assume 200M DAU and 50 reads/user/day"           │
│                                                             │
│  ✗ Spending more than 3-5 minutes on estimation            │
│  ✓ Quick numbers, then move to design                      │
│                                                             │
│  ✗ Estimating without connecting to design decisions        │
│  ✓ "200K read QPS means we need aggressive caching"        │
└─────────────────────────────────────────────────────────────┘
```

---

## When to Use / When NOT to Use

### Use Back-of-Envelope When:
- Opening a system design interview (always)
- Deciding between architectures (e.g., "can a single DB handle this QPS?")
- Justifying technology choices ("need 500K QPS → need cache")
- Estimating infrastructure cost
- Determining if a design constraint matters at your scale

### When NOT to Stress:
- Exact numbers don't matter — order of magnitude is enough
- Don't estimate things that don't affect design decisions
- Skip estimation if the interviewer says "assume it's large scale"

---

## Real-World Scale References

| Company | Key Numbers |
|---|---|
| **Google Search** | 8.5B searches/day → ~100K QPS |
| **Twitter** | 500M tweets/day, 200B timeline reads/day |
| **Netflix** | 15% of global internet bandwidth, 200M subscribers |
| **WhatsApp** | 100B messages/day across 2B users |
| **Uber** | 100M rides/month, millions of location updates/second |
| **Instagram** | 2B MAU, 100M photos uploaded daily |

---

## Common Interview Questions

**Q: "How many servers do we need for this system?"**
A: Calculate peak QPS first. Assume a single application server handles 500-1000 simple requests/sec (varies by complexity). Divide peak QPS by per-server capacity. Add 30% headroom. For example: 60K peak QPS / 1000 per server = 60 servers + 30% = ~80 servers.

**Q: "Can this fit in a single database?"**
A: Check two things: (1) Storage — a single Postgres instance handles up to ~10TB comfortably. (2) QPS — a single instance handles ~5-10K simple reads/sec, ~1-5K writes/sec with good indexes. If you exceed either, you need sharding or read replicas.

**Q: "How much cache do we need?"**
A: Apply the 80/20 rule: 20% of data serves 80% of requests. Calculate: total data size × 20% = cache size. For 1TB of user data: 200GB Redis. At $25/GB/month for Redis, that's $5000/month — often worth it to avoid DB load.

**Q: "What's the bandwidth cost?"**
A: Egress bandwidth costs ~$0.05-0.12/GB on cloud providers. If you serve 100 TB/month: ~$5,000-$12,000/month for bandwidth alone. This is why CDNs are essential — they reduce origin egress and often cost less per GB.

---

[← Back to Fundamentals](/concepts) | [Next: Fan-Out Patterns →](/concepts/fan-out/)
