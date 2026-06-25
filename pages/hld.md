---
layout: default
title: "High-Level Design Problems"
description: "System design interview problems with diagrams, technology choices, deep dives, and trade-offs."
permalink: /hld
---

# High-Level Design Problems

System design interview problems covering distributed architectures, databases, caching, messaging, and real-time systems. Each design includes diagrams, technology choices, deep dives, and trade-offs.

---

## 🟢 Beginner

| # | Problem | Key Topics |
|---|---|---|
| 1 | [🅿️ Parking Lot (LLD/HLD hybrid)](/ParkingLot) | OOP, Strategy pattern, composition |
| 2 | [🏆 Real-Time Leaderboard](/Leaderboard) | Redis sorted sets, top-N queries |
| 3 | [🚦 Rate Limiter](/RateLimiter) | Token bucket, sliding window, Redis Lua |

## 🟡 Intermediate

| # | Problem | Key Topics |
|---|---|---|
| 4 | [🔗 URL Shortener](/URLShortner) | Base62, Snowflake ID, CDN caching, analytics |
| 5 | [🐦 Twitter / Social Feed](/TwitterFeed) | Fan-out on write vs read, timeline caching |
| 6 | [💬 Chat System (WhatsApp)](/ChatSystem) | WebSocket, offline delivery, Cassandra |
| 7 | [🔔 Notification System](/NotificationSystem) | Multi-channel, Kafka, template service, engagement |

## 🔴 Advanced

| # | Problem | Key Topics |
|---|---|---|
| 8 | [⏰ Distributed Job Scheduler](/JobScheduler) | Redis ZSET, leader election, retries, DLQ |
| 9 | [⏱️ Delayed Trigger Service](/DelayedTriggerService) | SQS + Cassandra, timing wheel, circuit breaker |
| 10 | [💰 Digital Wallet (PhonePe)](/DigitalWallet) | Double-entry ledger, idempotency, reconciliation |
| 11 | [🍔 Food Delivery (Zomato)](/Zomato) | Elasticsearch, Redis Geo, dispatch, live tracking |

---

*More designs coming every week. Drop a request in the comments below 👇*
