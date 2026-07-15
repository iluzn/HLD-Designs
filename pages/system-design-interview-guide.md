---
layout: default
title: "System Design Interview Guide 2026 - Complete Preparation Roadmap"
description: "How to prepare for system design, machine coding (LLD), and DSA interviews at FAANG, fintech, and startups. An opinionated roadmap: pick your rounds, build a plan, learn the framework, follow a curated path."
permalink: /system-design-interview-guide/
hide_toc: true
---

<div class="sdg-hero">
  <span class="sdg-badge">Interview Prep · 2026</span>
  <h1>The Interview Prep <em>Playbook</em></h1>
  <p>Skip the giant reading list. This answers three questions fast — <strong>which rounds am I facing, what's my plan, and what do I do in the room</strong> — and links straight into the practice on this site.</p>
  <div class="sdg-hero-stats">
    <span><b>3</b> rounds</span>
    <span><b>20</b> HLD designs</span>
    <span><b>360+</b> DSA problems</span>
  </div>
</div>

Built for HLD, LLD, and DSA rounds at Amazon, Google, Meta, PhonePe, Uber, Stripe, Flipkart, and startups.

---

## Step 1 — Which rounds are you facing?

Most loops test **two or three** of these. Figure out yours from the recruiter, then commit your time to the ones that count.

<div class="sdg-rounds">
  <a class="sdg-round" href="/hld">
    <div class="sdg-round-tag">Round type</div>
    <h3>HLD — System Design</h3>
    <p>Open-ended "Design X." Tests architecture, trade-offs, and how you scale. 45–60 min, whiteboard/verbal.</p>
    <span class="sdg-round-go">20 designs to practice →</span>
  </a>
  <a class="sdg-round" href="/lld">
    <div class="sdg-round-tag">Round type</div>
    <h3>LLD — Machine Coding</h3>
    <p>Build a working, modular OOP system in 90–120 min. Tests clean class design, patterns, extensibility.</p>
    <span class="sdg-round-go">Machine coding problems →</span>
  </a>
  <a class="sdg-round" href="/dsa">
    <div class="sdg-round-tag">Round type</div>
    <h3>DSA — Coding</h3>
    <p>Algorithmic problem solving under time pressure. Tests patterns, correctness, and communication.</p>
    <span class="sdg-round-go">360+ problems + judge →</span>
  </a>
</div>

---

## Step 2 — Build your plan

Pick the row that matches you. The plan assumes ~1–1.5 focused hours a day.

<div class="sdg-plans">
  <div class="sdg-plan">
    <div class="sdg-plan-h"><b>Junior</b><span>0–2 YOE</span></div>
    <div class="sdg-plan-t">6–8 weeks</div>
    <ul>
      <li>Nail <a href="/concepts">fundamentals</a> first (caching, DBs, queues).</li>
      <li>DSA is usually the main gate — spend most time there.</li>
      <li>8 beginner/intermediate HLD designs; light LLD.</li>
    </ul>
  </div>
  <div class="sdg-plan featured">
    <div class="sdg-plan-h"><b>Mid (SDE-2)</b><span>2–5 YOE</span></div>
    <div class="sdg-plan-t">4–6 weeks</div>
    <ul>
      <li>All three rounds are in play — balance them.</li>
      <li>Master the <a href="/approach">45-min framework</a> + 12–15 HLD designs.</li>
      <li>Practice one full LLD build end-to-end weekly.</li>
    </ul>
  </div>
  <div class="sdg-plan">
    <div class="sdg-plan-h"><b>Senior+</b><span>5+ YOE</span></div>
    <div class="sdg-plan-t">2–4 weeks</div>
    <ul>
      <li>Depth over breadth — advanced deep dives and trade-offs.</li>
      <li>Own the conversation; drive scoping and tech choices.</li>
      <li>Be ready to defend your real production work in the HM round.</li>
    </ul>
  </div>
</div>

---

## Step 3 — What to do in the room (the 45-minute HLD framework)

The single biggest score driver isn't knowing more tech — it's running the interview with structure. Spend your time like this:

<div class="sdg-phases">
  <div class="sdg-phase"><span class="sdg-min">~5 min</span><b>Scope</b><p>Clarify functional + non-functional requirements. Pin down scale (QPS, data size, read/write ratio). Write them down.</p></div>
  <div class="sdg-phase"><span class="sdg-min">~5 min</span><b>Entities & API</b><p>List core entities and one endpoint per requirement. This anchors the whole design.</p></div>
  <div class="sdg-phase"><span class="sdg-min">~10 min</span><b>High-level design</b><p>Draw the boxes: client → edge → services → data. Introduce components only as a requirement forces them.</p></div>
  <div class="sdg-phase"><span class="sdg-min">~15 min</span><b>Deep dives</b><p>Go deep on 2–3 hard parts. For each: naive approach, why it breaks, the fix. This is where senior signal lives.</p></div>
  <div class="sdg-phase"><span class="sdg-min">~5 min</span><b>Wrap</b><p>Call out bottlenecks, failure modes, and what you'd do with more time.</p></div>
</div>

Full breakdown with scripts and the scoring rubric: **[The 45-Min Interview Framework →](/approach)**

### What interviewers actually score
1. **Scoping** — do you ask the right questions before designing?
2. **Architecture** — right components, sensible data flow.
3. **Depth & trade-offs** — can you defend *why*, not just *what*? (SQL vs NoSQL is asked in almost every round.)
4. **Communication** — you drive; it's a conversation, not a monologue.

You are *not* expected to design a production system. You're expected to show structured thinking and trade-off awareness.

---

## Step 4 — A curated path (not a reading list)

Twelve designs, in order, chosen so each one teaches a new pattern. Do these deeply — patterns transfer to any "Design X" you're handed.

<div class="sdg-track">
  <div class="sdg-tier">
    <div class="sdg-tier-h">Foundations — one service, one pattern</div>
    <ol>
      <li><a href="/hld/URLShortner">URL Shortener</a> — ID generation, caching, read-heavy scaling</li>
      <li><a href="/hld/RateLimiter">Rate Limiter</a> — Redis token bucket, shared counters</li>
      <li><a href="/hld/KeyValueStore">Key-Value Store</a> — partitioning, replication, quorum</li>
      <li><a href="/hld/Pastebin">Pastebin</a> — object storage, CDN, TTL cleanup</li>
    </ol>
  </div>
  <div class="sdg-tier">
    <div class="sdg-tier-h">Core — multi-service, async, real-time</div>
    <ol start="5">
      <li><a href="/hld/ChatSystem">Chat System</a> — WebSockets, delivery, offline queues</li>
      <li><a href="/hld/NotificationSystem">Notification System</a> — Kafka fan-out, retries, DLQ</li>
      <li><a href="/hld/TwitterFeed">Twitter Feed</a> — fan-out on write vs read, celebrity problem</li>
      <li><a href="/hld/BookMyShow">BookMyShow</a> — distributed locks, seat holds, payment saga</li>
    </ol>
  </div>
  <div class="sdg-tier">
    <div class="sdg-tier-h">Advanced — correctness & deep trade-offs</div>
    <ol start="9">
      <li><a href="/hld/DigitalWallet">Digital Wallet</a> — double-entry ledger, idempotency, saga</li>
      <li><a href="/hld/Uber">Uber</a> — geo-indexing, real-time matching, surge</li>
      <li><a href="/hld/StockBroker">Stock Broker</a> — order matching, event sourcing, CQRS</li>
      <li><a href="/hld/GoogleDocs">Google Docs</a> — CRDT/OT, conflict resolution, presence</li>
    </ol>
  </div>
</div>

Need the fundamentals behind these first? Start at **[System Design Fundamentals →](/concepts)**. Targeting a specific company? See **[Company-Specific Prep →](/companies)**.

---

## The 6 mistakes that sink interviews

1. **Jumping to a solution** before scoping requirements. Spend the first 5 minutes clarifying.
2. **Over-engineering** — a URL shortener doesn't need Kafka and 8 microservices.
3. **Hand-waving scale** — "just use a database" is not an answer at 100K QPS.
4. **Skipping trade-offs** — every choice has a downside. Name it before the interviewer does.
5. **Monologuing** — pause, check in, let the interviewer steer.
6. **Grinding random problems** — study by pattern, not by count. 12 deep beats 30 skimmed.

---

## FAQ

**How many problems should I practice?**
12–15 studied deeply. Understand the patterns; don't memorize solutions.

**Do I need exact numbers?**
No — just orders of magnitude: one Postgres ≈ 10K QPS, Redis ≈ 100K ops/sec, Kafka ≈ millions of events/sec. See [back-of-envelope estimation](/concepts#back-of-envelope-estimation).

**Diagrams or text?**
Always draw. A simple box-and-arrow diagram communicates more than five minutes of talking.

**They asked a system I didn't prepare — now what?**
The patterns transfer. Caching, queues, DB choice, and real-time delivery show up everywhere. Apply what you practiced.

**Is system design asked at my level?**
Rarely for new grads, yes for SDE-2 at most top companies, and with higher depth expectations for senior/staff.

---

## Your daily routine

- **30 min** — read one concept from [Fundamentals](/concepts)
- **60 min** — one HLD design (45-min timed attempt, 15-min review)
- **15 min** — review the [framework](/approach) patterns, or solve one [DSA](/dsa) problem

## Keep going
- [System Design Fundamentals](/concepts) — CAP, caching, sharding, queues, DBs
- [The 45-Min Interview Framework](/approach) — structure, scripts, scoring
- [Company-Specific Prep](/companies) — Amazon, Google, Uber, Flipkart, PhonePe
- [LLD Fundamentals](/lld-fundamentals) — for machine coding rounds
- [DSA Problemset](/dsa) — 360+ problems with an in-browser judge

<div class="sdg-cta-wrap">
<a class="sdg-cta" href="/concepts">
<span class="sdg-cta-text"><strong>Ready to start?</strong> Begin with the fundamentals, then work the curated path above.</span>
<span class="sdg-cta-go">Start with Fundamentals →</span>
</a>
</div>

<style>
.sdg-rounds { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin: 1.5rem 0; }
.sdg-round { display: flex; flex-direction: column; gap: 0.4rem; padding: 1.3rem; border: 1px solid var(--border); border-radius: 14px; background: var(--bg-card, rgba(25,25,35,0.6)); text-decoration: none; color: var(--text); transition: border-color 0.2s, transform 0.2s; }
.sdg-round:hover { border-color: var(--accent); transform: translateY(-3px); }
.sdg-round-tag { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-dim); font-weight: 700; }
.sdg-round h3 { font-size: 1.05rem; font-weight: 700; margin: 0; }
.sdg-round p { font-size: 0.84rem; color: var(--text-muted); line-height: 1.55; margin: 0; flex: 1; }
.sdg-round-go { font-size: 0.82rem; font-weight: 600; color: var(--accent); margin-top: 0.3rem; }

.sdg-plans { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 1rem; margin: 1.5rem 0; }
.sdg-plan { border: 1px solid var(--border); border-radius: 14px; padding: 1.2rem; background: var(--bg-card, rgba(25,25,35,0.6)); }
.sdg-plan.featured { border-color: var(--accent); background: rgba(129,140,248,0.06); }
.sdg-plan-h { display: flex; align-items: baseline; justify-content: space-between; gap: 0.5rem; }
.sdg-plan-h b { font-size: 1rem; } .sdg-plan-h span { font-size: 0.72rem; color: var(--text-dim); }
.sdg-plan-t { font-size: 1.3rem; font-weight: 800; color: var(--accent); margin: 0.3rem 0 0.6rem; }
.sdg-plan ul { margin: 0; padding-left: 1.1rem; } .sdg-plan li { font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.35rem; }

.sdg-phases { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 0.7rem; margin: 1.3rem 0; }
.sdg-phase { border: 1px solid var(--border); border-radius: 12px; padding: 0.9rem 1rem; background: var(--bg-card, rgba(25,25,35,0.6)); }
.sdg-phase .sdg-min { display: inline-block; font-size: 0.68rem; font-weight: 700; color: var(--accent); background: var(--tag-bg, rgba(129,140,248,0.1)); border: 1px solid var(--tag-border, rgba(129,140,248,0.25)); padding: 1px 8px; border-radius: 20px; margin-bottom: 0.4rem; }
.sdg-phase b { display: block; font-size: 0.9rem; margin-bottom: 0.2rem; }
.sdg-phase p { font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; margin: 0; }

.sdg-track { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin: 1.3rem 0; }
.sdg-tier { border: 1px solid var(--border); border-radius: 14px; padding: 1.1rem 1.2rem; background: var(--bg-card, rgba(25,25,35,0.6)); }
.sdg-tier-h { font-size: 0.8rem; font-weight: 700; color: var(--accent); margin-bottom: 0.6rem; }
.sdg-tier ol { margin: 0; padding-left: 1.2rem; } .sdg-tier li { font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.45rem; }
.sdg-tier a { font-weight: 600; }

/* Hero */
.breadcrumbs { display: none; }
.sdg-hero { text-align: center; padding: 1rem 0 0.5rem; }
.sdg-badge { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: var(--accent); background: var(--tag-bg, rgba(129,140,248,0.1)); border: 1px solid var(--tag-border, rgba(129,140,248,0.25)); padding: 0.25rem 0.7rem; border-radius: 20px; margin-bottom: 0.9rem; }
.sdg-hero h1 { font-size: 2.4rem; font-weight: 800; letter-spacing: -0.5px; margin: 0 0 0.7rem; border: none; padding: 0; }
.sdg-hero h1 em { font-style: normal; background: linear-gradient(135deg, var(--accent), var(--accent-light)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.sdg-hero p { color: var(--text-muted); max-width: 640px; margin: 0 auto; line-height: 1.65; }
.sdg-hero-stats { display: flex; justify-content: center; gap: 1.6rem; margin-top: 1.2rem; }
.sdg-hero-stats span { font-size: 0.8rem; color: var(--text-dim); } .sdg-hero-stats b { display: block; font-size: 1.4rem; font-weight: 800; color: var(--accent); }

/* Round cards get a colored top accent */
.sdg-round { position: relative; overflow: hidden; }
.sdg-round::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--accent), var(--accent-light)); }

/* Closing CTA */
.sdg-cta { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin: 2rem 0 1rem; padding: 1.3rem 1.6rem; border-radius: 14px; text-decoration: none; color: #fff; background: linear-gradient(135deg, var(--accent), var(--accent-light)); transition: transform 0.2s, box-shadow 0.2s; }
.sdg-cta:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(129,140,248,0.28); }
.sdg-cta-text { font-size: 0.9rem; opacity: 0.95; } .sdg-cta-text strong { display: block; font-size: 1.02rem; opacity: 1; margin-bottom: 0.1rem; }
.sdg-cta-go { font-weight: 700; font-size: 0.9rem; white-space: nowrap; background: rgba(255,255,255,0.18); padding: 0.5rem 1rem; border-radius: 9px; }
</style>
