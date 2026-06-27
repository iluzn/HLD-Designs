---
layout: default
title: "System Design Interview Guide 2025 — Complete Preparation Roadmap"
description: "How to prepare for system design interviews at FAANG, startups, and top tech companies. Step-by-step guide with topics, patterns, and practice problems."
permalink: /system-design-interview-guide/
---

# System Design Interview Guide — Complete Preparation Roadmap

⚡ **Updated:** June 2025 🏢 **Target:** Amazon, Google, Meta, Microsoft, Uber, Stripe, Flipkart, and startups

---

## Who Is This For?

Whether you're a mid-level engineer preparing for your first system design round or a senior engineer targeting Staff+ roles, this guide gives you the exact roadmap to prepare efficiently.

---

## Your Learning Path

This guide is organized into 3 parts. Follow them in order:

| Step | Page | What You'll Learn |
|------|------|-------------------|
| 1 | **You're here** | What to study, in what order, how long it takes |
| 2 | [System Design Fundamentals →](/concepts) | The building blocks: CAP, caching, sharding, queues, DBs |
| 3 | [The 45-Min Interview Framework →](/approach) | Exact structure, timing, and what interviewers score on |

After these three, start solving: [Practice Problems →](/hld)

---

## How System Design Interviews Actually Work

A typical system design interview is 45-60 minutes. The interviewer gives you an open-ended problem ("Design Uber" or "Design a notification system") and evaluates:

1. **Problem scoping** — Can you ask the right clarifying questions and narrow requirements?
2. **High-level architecture** — Can you identify the right components and how they communicate?
3. **Deep dive ability** — Can you go deep on 2-3 technical challenges and discuss trade-offs?
4. **Communication** — Can you drive the conversation and explain your decisions clearly?

You're NOT expected to design a production system. You're expected to demonstrate structured thinking and trade-off awareness.

> **New here?** Start with the [fundamentals](/concepts) if terms like "CAP theorem" or "consistent hashing" don't ring a bell. Then read the [interview framework](/approach) to understand the 45-minute structure.

---

## Topics to Study (Priority Order)

### Must-Know (Week 1-2)

| Topic | Why It Matters | Learn It | Practice It |
|-------|---------------|----------|-------------|
| Load balancing | Every system needs it | [Fundamentals](/concepts) | [URL Shortener](/hld/URLShortner) |
| Caching (Redis) | 80% of designs use a cache | [Fundamentals](/concepts) | [Rate Limiter](/hld/RateLimiter) |
| Database choice (SQL vs NoSQL) | Most common trade-off question | [Fundamentals](/concepts) | [Key-Value Store](/hld/KeyValueStore) |
| Message queues (Kafka) | Async processing, decoupling | [Fundamentals](/concepts) | [Notification System](/hld/NotificationSystem) |
| API design (REST) | You'll design APIs in every interview | [Fundamentals](/concepts) | [Pastebin](/hld/Pastebin) |

### Important (Week 3-4)

| Topic | Why It Matters | Practice It |
|-------|---------------|-------------|
| Consistent hashing | Distributed data placement | [Key-Value Store](/hld/KeyValueStore) |
| WebSockets / real-time | Chat, tracking, live updates | [Chat System](/hld/ChatSystem) |
| CDN and object storage | Media-heavy systems | [Netflix / YouTube](/hld/Netflix) |
| Distributed locking | Preventing double-booking | [Uber](/hld/Uber) |
| Fan-out patterns | News feeds, notifications | [Twitter Feed](/hld/TwitterFeed) |

### Advanced (Week 5+)

| Topic | Why It Matters | Practice It |
|-------|---------------|-------------|
| Event sourcing / CQRS | Financial systems, audit trails | [Stock Broker](/hld/StockBroker) |
| Saga pattern | Distributed transactions | [Digital Wallet](/hld/DigitalWallet) |
| Conflict resolution (CRDT/OT) | Collaborative editing | [Google Docs](/hld/GoogleDocs) |
| Geo-indexing (Geohash, H3) | Location-based systems | [Uber](/hld/Uber) |
| Search (Elasticsearch) | Discovery, catalogs | [Zomato](/hld/Zomato) |

---

## Recommended Practice Problems (By Difficulty)

### Beginner (Start Here)

1. [URL Shortener (Bitly)](/hld/URLShortner) — ID generation, caching, redirects
2. [Pastebin](/hld/Pastebin) — Object storage, metadata, TTL
3. [Rate Limiter](/hld/RateLimiter) — Redis patterns, token bucket, sliding window
4. [Key-Value Store](/hld/KeyValueStore) — Partitioning, replication, consistency
5. [Unique ID Generator](/hld/UniqueIDGenerator) — Snowflake, UUID, range allocation

### Intermediate

5. [Chat System (WhatsApp)](/hld/ChatSystem) — WebSockets, message delivery, offline handling
6. [Notification System](/hld/NotificationSystem) — Multi-channel, Kafka, templating
7. [Twitter Feed](/hld/TwitterFeed) — Fan-out, timeline, caching
8. [Instagram](/hld/Instagram) — Photo upload, CDN, news feed
9. [Leaderboard](/hld/Leaderboard) — Redis sorted sets, real-time ranking
10. [Netflix / YouTube](/hld/Netflix) — Video encoding, adaptive streaming, recommendations

### Advanced

11. [Uber / Lyft](/hld/Uber) — Real-time matching, Redis Geo, surge pricing
12. [Zomato / Uber Eats](/hld/Zomato) — Search, dispatch, live tracking
13. [BookMyShow](/hld/BookMyShow) — Seat booking, distributed locks, payment
14. [Stock Broker (Robinhood)](/hld/StockBroker) — Order matching, event sourcing, CQRS
15. [Digital Wallet (PhonePe)](/hld/DigitalWallet) — Double-entry ledger, saga, idempotency
16. [Google Docs](/hld/GoogleDocs) — Collaborative editing, CRDT, real-time sync
17. [Distributed Job Scheduler](/hld/JobScheduler) — Leader election, exactly-once, retries
18. [Delayed Trigger Service](/hld/DelayedTriggerService) — Timing wheels, scheduled execution

---

## How Long Does Preparation Take?

| Your Level | Time Needed | Focus |
|-----------|-------------|-------|
| Junior (0-2 YOE) | 6-8 weeks | [Fundamentals](/concepts) + 8 beginner/intermediate problems |
| Mid (2-5 YOE) | 4-6 weeks | All topics + 12-15 problems + [framework](/approach) mastery |
| Senior (5+ YOE) | 2-4 weeks | Advanced topics + deep dive practice |

---

## Common Mistakes to Avoid

1. **Jumping to solutions** — Always spend 3-5 minutes on requirements first
2. **Over-engineering** — A URL shortener doesn't need Kafka and microservices
3. **Ignoring scale** — "Just use a database" isn't a design answer at 100K QPS
4. **Not discussing trade-offs** — Every choice has downsides. Name them.
5. **Monologuing** — The interview is a conversation. Pause and check in with the interviewer.
6. **Solving random problems** — Study by pattern, not by difficulty. See [the framework](/approach).

---

## Frequently Asked Questions

**How many problems should I practice?**

12-15 problems, studied deeply, is better than 30 problems skimmed. Understand the patterns, not memorize solutions.

**Do I need to memorize exact numbers?**

No. But know orders of magnitude: "a single Postgres handles ~10K QPS," "Redis does 100K ops/sec," "Kafka handles millions of events/sec." See [back-of-envelope estimation](/concepts#back-of-envelope-estimation).

**Should I draw diagrams or use text?**

Always draw. Interviewers are visual. Even a simple box-and-arrow diagram communicates better than 5 minutes of talking.

**What if the interviewer asks about a system I haven't prepared?**

The patterns transfer. If you've done 12 designs, you've seen caching, queues, databases, and real-time delivery. Apply those patterns to the new problem. The [cheat sheet in the approach page](/approach) helps here.

**Is system design asked at all levels?**

- Junior/New grad: Rarely (some companies ask simplified versions)
- Mid-level (SDE-2): Yes, at most top companies
- Senior+ (SDE-3, Staff): Yes, with higher depth expectations

---

## The Complete Prep Roadmap

```
Week 1-2: Learn fundamentals (/concepts)
              ↓
Week 2-3: Master the framework (/approach)
              ↓
Week 3-6: Solve problems by difficulty (beginner → advanced)
              ↓
Week 6+:  Mock interviews + revisit weak areas
```

**Daily routine:**
- 30 min: Read one concept from [fundamentals](/concepts)
- 60 min: Solve one HLD problem (timer: 45 min attempt, 15 min review)
- 15 min: Review the [approach framework](/approach) patterns table

---

## Next Steps

| Where you are | What to do next |
|---------------|-----------------|
| Don't know the basics | [Read System Design Fundamentals →](/concepts) |
| Know the concepts but freeze in interviews | [Read The 45-Min Framework →](/approach) |
| Ready to practice | [Start with URL Shortener →](/hld/URLShortner) |
| Want a quick reference | [Cheatsheet →](/cheatsheet) |

---

## Related Resources

- [System Design Fundamentals](/concepts) — CAP, caching, sharding, queues, DBs
- [The 45-Min Interview Framework](/approach) — Exact structure and scoring criteria
- [Quick-Fire 50 Cheatsheet](/cheatsheet) — DSA patterns at a glance
- [Company-Specific: Amazon](/companies/amazon) — Amazon's design interview format
- [LLD Fundamentals](/lld-fundamentals) — For machine coding rounds
