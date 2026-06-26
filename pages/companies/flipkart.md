---
layout: default
title: "Flipkart Interview Prep — System Design & Machine Coding"
description: "Curated HLD and LLD problems asked at Flipkart. URL Shortener, Twitter Feed, Parking Lot, Splitwise."
permalink: /companies/flipkart
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What system design questions are asked at Flipkart?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flipkart commonly asks: URL Shortener, Twitter/Social Feed, Notification System for HLD. For Machine Coding: Parking Lot, Splitwise, Snake and Ladder."
      }
    },
    {
      "@type": "Question",
      "name": "What is Flipkart's SDE interview process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flipkart's SDE process includes: 1-2 DSA rounds, 1 Machine Coding round (90 minutes with working demo required), 1 System Design round (SDE-2+), and Hiring Manager round."
      }
    }
  ]
}
</script>

# Flipkart Interview Prep

Flipkart's interview process for SDE-2+ includes 2 DSA rounds, 1 machine coding round (90 minutes), and 1-2 system design rounds. The machine coding round expects clean OOP with design patterns and a running demo. System design rounds focus on e-commerce scale — feeds, notifications, and URL shortening at millions of QPS.

---

## HLD Problems Asked at Flipkart

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | URL Shortener | 🟡 Intermediate | [Read →](/hld/URLShortner) |
| 2 | Twitter / Social Feed | 🟡 Intermediate | [Read →](/hld/TwitterFeed) |
| 3 | Notification System | 🟡 Intermediate | [Read →](/hld/NotificationSystem) |

---

## LLD Problems Asked at Flipkart

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | Parking Lot | 🟢 Beginner | [Read →](/lld/ParkingLot) |
| 2 | Splitwise | 🟡 Intermediate | [Read →](/lld/Splitwise) |

---

## Tips for Flipkart Interviews

1. **Nail the machine coding round first.** Flipkart rejects many candidates at this stage. Focus on Strategy pattern, clean separation of concerns, and a working demo.
2. **Think at e-commerce scale.** Discuss flash sales, inventory locking, and fan-out patterns. Flipkart loves candidates who understand read-heavy vs write-heavy tradeoffs.
3. **Discuss caching strategies.** CDN caching, Redis invalidation, and cache stampede protection are frequently probed in system design rounds.
4. **Prepare for follow-up depth.** Flipkart interviewers often ask "what breaks at 10x scale?" — have answers ready for hot partitions and celebrity problems.
