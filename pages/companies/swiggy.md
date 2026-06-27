---
layout: default
title: "Swiggy Interview Prep — System Design, DSA & Machine Coding"
description: "Curated system design, DSA, and LLD problems asked at Swiggy. Food Delivery, Rate Limiter, Notification System, Splitwise, Parking Lot."
permalink: /companies/swiggy
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What system design questions are asked at Swiggy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Swiggy commonly asks: Food Delivery Platform, Notification System, Rate Limiter, and Job Scheduler for HLD. For LLD/Machine Coding: Parking Lot, Splitwise, and Snake and Ladder."
      }
    },
    {
      "@type": "Question",
      "name": "What is Swiggy's SDE interview process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Swiggy's SDE-2 loop includes: 1 DSA round, 1 Machine Coding round (90 minutes), 1 System Design round, and 1 Hiring Manager round. Machine coding is a strong elimination round."
      }
    }
  ]
}
</script>

# Swiggy Interview Prep

Swiggy's interview process for SDE-2+ follows the Indian product company template: DSA, machine coding (90 min), system design, and HM round. The machine coding round is the biggest filter — candidates are expected to produce clean, extensible code with design patterns in 90 minutes. System design focuses on food-delivery-adjacent problems: dispatch, real-time tracking, and high-throughput event processing.

---

## HLD Problems Asked at Swiggy

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | Zomato / Uber Eats (Food Delivery) | Advanced | [Read →](/hld/Zomato) |
| 2 | Notification System | Intermediate | [Read →](/hld/NotificationSystem) |
| 3 | Rate Limiter | Beginner | [Read →](/hld/RateLimiter) |
| 4 | Distributed Job Scheduler | Advanced | [Read →](/hld/JobScheduler) |
| 5 | Uber / Lyft (Ride Sharing) | Advanced | [Read →](/hld/Uber) |

---

## LLD Problems Asked at Swiggy

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | Parking Lot | Beginner | [Read →](/lld/ParkingLot) |
| 2 | Splitwise | Intermediate | [Read →](/lld/Splitwise) |
| 3 | Snake and Ladder | Intermediate | [Read →](/lld/SnakeLadder) |

---

## DSA Problems Frequently Asked at Swiggy

| # | Problem | Pattern | Link |
|---|---------|---------|------|
| 1 | Two Sum | HashMap | [LeetCode →](https://leetcode.com/problems/two-sum/) |
| 2 | Merge Intervals | Sorting + Greedy | [LeetCode →](https://leetcode.com/problems/merge-intervals/) |
| 3 | Longest Substring Without Repeating | Sliding Window | [LeetCode →](https://leetcode.com/problems/longest-substring-without-repeating-characters/) |
| 4 | LRU Cache | HashMap + DLL | [LeetCode →](https://leetcode.com/problems/lru-cache/) |
| 5 | Rotting Oranges | BFS on Grid | [LeetCode →](https://leetcode.com/problems/rotting-oranges/) |
| 6 | Coin Change | DP | [LeetCode →](https://leetcode.com/problems/coin-change/) |
| 7 | Kth Largest Element | Quick Select / Heap | [LeetCode →](https://leetcode.com/problems/kth-largest-element-in-an-array/) |
| 8 | Binary Tree Zigzag Level Order | BFS | [LeetCode →](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) |
| 9 | Next Greater Element | Monotonic Stack | [LeetCode →](https://leetcode.com/problems/next-greater-element-i/) |
| 10 | Trapping Rain Water | Two Pointers / Stack | [LeetCode →](https://leetcode.com/problems/trapping-rain-water/) |

---

## Tips for Swiggy Interviews

1. **Machine coding is make-or-break.** Swiggy eliminates most candidates here. Practice writing full OOP solutions with Strategy/Observer patterns in 90 minutes. Working `main()` with output matters more than perfect coverage.
2. **Think about delivery logistics.** Swiggy's core is dispatch and routing — show awareness of geo-queries, rider assignment, and order state machines in system design.
3. **Expect follow-ups on real-time.** "How does the customer see the rider moving?" is a guaranteed follow-up. Know WebSocket vs SSE, and how location pings flow through the system.
4. **DSA is medium difficulty.** Swiggy's coding rounds are LeetCode medium — focus on clean implementation and edge case handling over exotic algorithms.

---

## Other Company Prep

- [Flipkart Interview Prep →](/companies/flipkart)
- [PhonePe Interview Prep →](/companies/phonpe)
- [Uber Interview Prep →](/companies/uber)
- [Back to Interview Guide →](/system-design-interview-guide)
