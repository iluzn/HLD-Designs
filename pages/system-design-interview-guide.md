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

## How System Design Interviews Actually Work

A typical system design interview is 45-60 minutes. The interviewer gives you an open-ended problem ("Design Uber" or "Design a notification system") and evaluates:

1. **Problem scoping** — Can you ask the right clarifying questions and narrow requirements?
2. **High-level architecture** — Can you identify the right components and how they communicate?
3. **Deep dive ability** — Can you go deep on 2-3 technical challenges and discuss trade-offs?
4. **Communication** — Can you drive the conversation and explain your decisions clearly?

You're NOT expected to design a production system. You're expected to demonstrate structured thinking and trade-off awareness.

---

## The 5-Step Framework for Any Design Problem

### Step 1: Clarify Requirements (3-5 minutes)

Ask about:
- **Scale** — How many users? How many requests per second?
- **Core features** — What are the top 3 things the system must do?
- **Constraints** — Consistency vs availability? Latency requirements?

### Step 2: Define the API (3-5 minutes)

Write out 2-3 core API endpoints. This forces you to think about what the system actually does.

### Step 3: High-Level Design (10-15 minutes)

Draw 5-8 components and show how data flows between them for each core requirement.

### Step 4: Deep Dive (15-20 minutes)

Pick 2-3 technically challenging areas and discuss:
- Why the naive approach fails
- What pattern/technology solves it
- Trade-offs of your choice

### Step 5: Wrap Up (3-5 minutes)

Summarize key decisions, mention what you'd add with more time (monitoring, multi-region, etc.).

---

## Topics to Study (Priority Order)

### Must-Know (Week 1-2)

| Topic | Why It Matters | Practice Problem |
|-------|---------------|-----------------|
| Load balancing | Every system needs it | [URL Shortener](/hld/URLShortner) |
| Caching (Redis) | 80% of designs use a cache | [Rate Limiter](/hld/RateLimiter) |
| Database choice (SQL vs NoSQL) | Most common trade-off question | [Key-Value Store](/hld/KeyValueStore) |
| Message queues (Kafka) | Async processing, decoupling | [Notification System](/hld/NotificationSystem) |
| API design (REST) | You'll design APIs in every interview | [Pastebin](/hld/Pastebin) |

### Important (Week 3-4)

| Topic | Why It Matters | Practice Problem |
|-------|---------------|-----------------|
| Consistent hashing | Distributed data placement | [Key-Value Store](/hld/KeyValueStore) |
| WebSockets / real-time | Chat, tracking, live updates | [Chat System](/hld/ChatSystem) |
| CDN and object storage | Media-heavy systems | [Netflix / YouTube](/hld/Netflix) |
| Distributed locking | Preventing double-booking | [Uber](/hld/Uber) |
| Fan-out patterns | News feeds, notifications | [Twitter Feed](/hld/TwitterFeed) |

### Advanced (Week 5+)

| Topic | Why It Matters | Practice Problem |
|-------|---------------|-----------------|
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

## Common Mistakes to Avoid

1. **Jumping to solutions** — Always spend 3-5 minutes on requirements first
2. **Over-engineering** — A URL shortener doesn't need Kafka and microservices
3. **Ignoring scale** — "Just use a database" isn't a design answer at 100K QPS
4. **Not discussing trade-offs** — Every choice has downsides. Name them.
5. **Monologuing** — The interview is a conversation. Pause and check in with the interviewer.

---

## How Long Does Preparation Take?

| Your Level | Time Needed | Focus |
|-----------|-------------|-------|
| Junior (0-2 YOE) | 6-8 weeks | Fundamentals + 8 beginner/intermediate problems |
| Mid (2-5 YOE) | 4-6 weeks | All topics + 12-15 problems |
| Senior (5+ YOE) | 2-4 weeks | Advanced topics + deep dive practice |

---

## Frequently Asked Questions

**How many problems should I practice?**

12-15 problems, studied deeply, is better than 30 problems skimmed. Understand the patterns, not memorize solutions.

**Do I need to memorize exact numbers?**

No. But know orders of magnitude: "a single Postgres handles ~10K QPS," "Redis does 100K ops/sec," "Kafka handles millions of events/sec." These inform your scaling decisions.

**Should I draw diagrams or use text?**

Always draw. Interviewers are visual. Even a simple box-and-arrow diagram communicates better than 5 minutes of talking.

**What if the interviewer asks about a system I haven't prepared?**

The patterns transfer. If you've done 12 designs, you've seen caching, queues, databases, and real-time delivery. Apply those patterns to the new problem.

**Is system design asked at all levels?**

- Junior/New grad: Rarely (some companies ask simplified versions)
- Mid-level (SDE-2): Yes, at most top companies
- Senior+ (SDE-3, Staff): Yes, with higher depth expectations

---

## Next Steps

1. Start with [the concepts page](/concepts) to build vocabulary
2. Pick a problem from the beginner list above
3. Time yourself: 45 minutes, draw on paper or whiteboard
4. Compare your design with our solution — focus on what you missed
5. Do 2-3 problems per week for 4-6 weeks

Good luck with your prep. You've got this. 🚀

---

## Related Resources

- [System Design Cheatsheet](/cheatsheet) — Quick-reference patterns
- [HLD Fundamentals & Concepts](/concepts) — Core building blocks
- [DSA Fundamentals — 12 Patterns](/dsa-fundamentals) — For coding rounds
- [Company-Specific Prep: Amazon](/companies/amazon) — Amazon's design interview format
