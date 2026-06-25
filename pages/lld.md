---
layout: default
title: "Low-Level Design / Machine Coding"
description: "Machine coding interview problems with OOP, design patterns, SOLID principles, and runnable code."
permalink: /lld
---

# Low-Level Design / Machine Coding

> 📚 **New to machine coding?** Start with the [LLD Fundamentals](/lld-fundamentals) — covers SOLID, design patterns, concurrency, and the 90-minute approach.

Machine-coding problems asked at PhonePe, Flipkart, Swiggy, Razorpay, and other Indian tech companies. Each solution uses OOP, design patterns (Strategy, State, Observer), and is runnable end-to-end with a demo class.

---

## Problems

| # | Problem | Key Patterns | Companies |
|---|---|---|---|
| 1 | [🅿️ Parking Lot](/ParkingLot) | Strategy, Polymorphism, Factory | Flipkart, PhonePe, Amazon |
| 2 | 🗃️ Multilevel Cache *(coming soon)* | Strategy (LRU/LFU), Composition, Facade | PhonePe, Flipkart |
| 3 | 📨 Message Broker *(coming soon)* | Facade, Composition, Concurrency | PhonePe, Uber |
| 4 | 🎫 Customer Issue Resolution *(coming soon)* | Strategy, State Machine, Facade | PhonePe |
| 5 | 🐍 Snake & Ladder *(coming soon)* | Strategy, State, Command | PhonePe, Flipkart |
| 6 | 💸 Splitwise *(coming soon)* | Strategy (split types), Aggregation | PhonePe, Flipkart |
| 7 | 🍽️ Restaurant Booking *(coming soon)* | Reservation conflicts, Concurrency | PhonePe |
| 8 | 📱 App Version Manager *(coming soon)* | Strategy (rollout), Adapter, Factory | PhonePe |

---

## What interviewers grade on

1. **Working demo class** — must compile and run end-to-end.
2. **Separation of concerns** — multiple files/classes, each doing one thing.
3. **Strategy pattern** somewhere — pricing, eviction, assignment, scoring.
4. **Extensibility** — adding a new variant = one new class, no edits to existing.
5. **Edge cases** — null inputs, capacity limits, state machine violations.
6. **Thread-safety** — when shared mutable state exists.

---

*More problems coming weekly. Drop a request in the comments below 👇*
