---
layout: default
title: "Amazon Interview Prep — System Design & Machine Coding"
description: "Curated system design and LLD problems asked at Amazon. URL Shortener, Chat System, Rate Limiter, Parking Lot."
permalink: /companies/amazon
---

# Amazon Interview Prep

Amazon's loop for SDE-2 and above includes 1-2 system design rounds alongside coding and behavioral (Leadership Principles) rounds. System design is evaluated on scalability, availability, and the ability to make clear trade-offs. Amazon values operational excellence — expect questions about monitoring, failure modes, and blast radius.

---

## HLD Problems Asked at Amazon

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | URL Shortener | 🟡 Intermediate | [Read →](/URLShortner) |
| 2 | Chat System (WhatsApp) | 🟡 Intermediate | [Read →](/ChatSystem) |
| 3 | Rate Limiter | 🟢 Beginner | [Read →](/RateLimiter) |
| 4 | Notification System | 🟡 Intermediate | [Read →](/NotificationSystem) |
| 5 | Distributed Job Scheduler | 🔴 Advanced | [Read →](/JobScheduler) |

---

## LLD Problems Asked at Amazon

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | Parking Lot | 🟢 Beginner | [Read →](/ParkingLot) |
| 2 | Music Player | 🟡 Intermediate | [Read →](/MusicPlayer) |

---

## Tips for Amazon Interviews

1. **Lead with Leadership Principles.** Even in system design, tie decisions back to "Customer Obsession," "Bias for Action," and "Ownership." Amazon evaluates how you think, not just what you design.
2. **Discuss operational readiness.** Monitoring, alerting, runbooks, blast radius, and graceful degradation are expected in every design answer.
3. **Quantify your design.** Back-of-envelope math (QPS, storage, bandwidth) shows you can reason about scale. Amazon operates at massive scale — show you understand the numbers.
4. **Address failure modes explicitly.** What happens when a service goes down? How do retries work? What's the dead-letter strategy? Amazon interviewers probe resilience deeply.
