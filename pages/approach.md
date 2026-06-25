---
layout: default
title: "How to Approach System Design Interviews — The Delivery Framework"
description: "A step-by-step framework for acing system design interviews. Timing, structure, what to say at each stage. Bookmark this before your next interview."
permalink: /approach
---

# How to Approach System Design Interviews

This is the framework. Memorize the structure, not the answers. Every system design interview follows the same arc — here's how to navigate it in 45 minutes.

## The 45-Minute Structure

| Phase | Time | What you do |
|---|---|---|
| 1. Requirements | 5 min | Clarify scope, list functional + non-functional requirements |
| 2. Core Entities + API | 5 min | List 4-6 entities, define 3-4 endpoints |
| 3. High-Level Design | 15 min | Build the architecture incrementally, one FR at a time |
| 4. Deep Dives | 15 min | Pick 2-3 hardest problems, show Bad → Good → Great |
| 5. Wrap-up | 5 min | Summarize trade-offs, mention what you'd do with more time |

## Phase 1: Requirements (5 min)

Start by asking "Users should be able to..." questions. Your goal is to lock down scope fast and show product thinking.

- **List top 3 functional requirements** — be ruthless. Only 3. More than 3 and you won't finish.
- **List top 3 non-functional requirements with NUMBERS** — latency < 200ms, 99.9% availability, 10K QPS. Concrete targets show you think like an engineer, not a student.
- **List "below the line" items** — things you're intentionally skipping. This shows product sense and prioritization.

> **Pro tip:** If you can't prioritize, ask the interviewer: "Which of these would you like me to focus on?"

## Phase 2: Core Entities + API (5 min)

- **List 4-6 entities** as bullet points — User, Order, Restaurant, Driver, etc. No full schemas yet.
- **Define one API endpoint per functional requirement** — method, path, request body, response.
- **Always mention:** auth via JWT, never trust client for IDs/timestamps/prices.

> **Pro tip:** This is your contract with the interviewer. Once they agree on APIs, you both know what "done" looks like.

## Phase 3: High-Level Design (15 min)

This is where you build. Go through each functional requirement ONE AT A TIME.

- For each FR: introduce 1-3 new components, draw a small diagram, walk through the flow step by step.
- **Start simple** — 4-5 nodes. Add complexity only when the requirement forces it.
- **Name every component:** "This is the Order Service — it validates orders and publishes events."
- **Always explain WHY:** "I'm making this async because the matching engine is the bottleneck — I don't want to block the user."

> **Pro tip:** If you're stuck, ask yourself: What's the most naive solution? What breaks about it at scale? That's your next component.

## Phase 4: Deep Dives (15 min)

Pick 2-3 areas driven by your non-functional requirements. Use the **Bad → Good → Great** structure:

- **Bad:** "The naive approach is X. It breaks because of Y (latency, cost, correctness)."
- **Good:** "This works but has limit Z."
- **Great:** "Production-grade solution using [specific tech]. Here's the mechanism."

**Common deep dive topics:**
- Caching strategy + invalidation
- Consistency boundaries (strong vs eventual)
- Hot partitions / celebrity problem
- Exactly-once delivery
- Search and discovery (Elasticsearch)
- Geo-proximity queries
- Rate limiting and backpressure

> **Pro tip:** Lead the deep dives yourself at senior+ level. Don't wait for the interviewer to ask.

## Phase 5: Wrap-up (5 min)

- **Summarize the 2-3 key trade-offs** you made and why.
- **Mention what you'd improve with more time** — monitoring, multi-region, cost optimization, observability.
- **Don't introduce new complexity** — just show you know what's missing.

## The 7 Deadly Sins (What Gets You Rejected)

1. Jumping to the diagram without requirements
2. Designing the entire system at once (not incrementally)
3. Using buzzwords without explaining them
4. Not asking questions — treating it as a monologue
5. Over-engineering when a simple solution works
6. Ignoring non-functional requirements
7. Not explaining trade-offs ("Why this and not that?")

## Quick Reference: What Interviewers Score On

| Dimension | What they look for |
|---|---|
| **Scoping** | Did you define clear requirements and stay focused? |
| **Technical depth** | Can you go deep on 2-3 areas with specific mechanisms? |
| **Trade-offs** | Do you explain WHY, not just WHAT? |
| **Communication** | Can you lead the conversation and check in with the interviewer? |
| **Progression** | Did you build incrementally from simple to complex? |

## Cheat Sheet: Common Patterns to Reach For

| If you see... | Reach for... |
|---|---|
| High write throughput | Event bus (Kafka), async processing |
| Low latency reads | Cache (Redis) + read replicas |
| Real-time updates to clients | WebSocket or SSE |
| Exact-once guarantee | Idempotency keys + transactional outbox |
| Search/discovery | Elasticsearch or similar search index |
| Geo/proximity | Redis Geo, PostGIS, geohash, S2 |
| Scheduling/delays | Timing wheel, delay queue, Temporal |
| Financial correctness | Double-entry ledger, saga pattern |
| Hot partition (celebrity) | Fan-out on write with limits, separate hot path |

---

*Bookmark this page. Read it 30 minutes before every system design interview.*

*Ready to practice? Pick a design: [HLD Problems](/hld)*
