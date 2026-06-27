---
layout: default
title: "Uber Interview Prep — System Design, DSA & Machine Coding"
description: "Curated system design and DSA problems asked at Uber. Ride Sharing, Job Scheduler, Rate Limiter, Merge Intervals, Sliding Window Maximum."
permalink: /companies/uber
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What system design questions are asked at Uber?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Uber commonly asks: Ride Sharing Platform, Job Scheduler, Rate Limiter, Notification System, and Food Delivery (Uber Eats) for system design rounds."
      }
    },
    {
      "@type": "Question",
      "name": "What is Uber's SDE interview process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Uber's SDE loop includes: 1 phone screen (DSA), 1 System Design round, 1-2 coding rounds, and 1 Behavioral/Leadership round. Strong emphasis on distributed systems knowledge."
      }
    }
  ]
}
</script>

# Uber Interview Prep

Uber's interview loop for SDE-2+ emphasizes distributed systems heavily. The system design round expects depth on real-time systems, geo-indexing, and event-driven architectures. Uber open-sourced many of their internal tools (Cadence/Temporal, Ringpop, H3) — knowing these shows domain awareness.

---

## HLD Problems Asked at Uber

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | Uber / Lyft (Ride Sharing) | Advanced | [Read →](/hld/Uber) |
| 2 | Zomato / Uber Eats (Food Delivery) | Advanced | [Read →](/hld/Zomato) |
| 3 | Distributed Job Scheduler | Advanced | [Read →](/hld/JobScheduler) |
| 4 | Rate Limiter | Beginner | [Read →](/hld/RateLimiter) |
| 5 | Notification System | Intermediate | [Read →](/hld/NotificationSystem) |

---

## DSA Problems Frequently Asked at Uber

| # | Problem | Pattern | Link |
|---|---------|---------|------|
| 1 | Merge Intervals | Sorting + Greedy | [LeetCode →](https://leetcode.com/problems/merge-intervals/) |
| 2 | Sliding Window Maximum | Monotonic Deque | [LeetCode →](https://leetcode.com/problems/sliding-window-maximum/) |
| 3 | Group Anagrams | HashMap + Sorting | [LeetCode →](https://leetcode.com/problems/group-anagrams/) |
| 4 | LRU Cache | HashMap + Doubly Linked List | [LeetCode →](https://leetcode.com/problems/lru-cache/) |
| 5 | Word Break | DP + Trie | [LeetCode →](https://leetcode.com/problems/word-break/) |
| 6 | Task Scheduler | Greedy / Heap | [LeetCode →](https://leetcode.com/problems/task-scheduler/) |
| 7 | Cheapest Flights Within K Stops | BFS / Bellman-Ford | [LeetCode →](https://leetcode.com/problems/cheapest-flights-within-k-stops/) |
| 8 | Longest Consecutive Sequence | HashSet | [LeetCode →](https://leetcode.com/problems/longest-consecutive-sequence/) |
| 9 | Find Median from Data Stream | Two Heaps | [LeetCode →](https://leetcode.com/problems/find-median-from-data-stream/) |
| 10 | Graph Valid Tree | Union-Find / DFS | [LeetCode →](https://leetcode.com/problems/graph-valid-tree/) |

---

## Tips for Uber Interviews

1. **Know their open-source stack.** Mentioning Cadence/Temporal for workflow orchestration, H3 for geo-indexing, or Ringpop for consistent hashing shows you understand Uber's domain.
2. **Real-time is expected.** Uber builds real-time systems (matching, tracking, pricing). Show comfort with WebSockets, event streaming, and sub-second latency requirements.
3. **Geo-spatial thinking matters.** If you're designing anything location-related, discuss geohash, H3 hexagons, or Redis Geo. Don't just say "store lat/lng in a database."
4. **Distributed systems depth.** Uber expects senior candidates to discuss distributed locking, exactly-once delivery, saga patterns, and failure handling without prompting.

---

## Other Company Prep

- [Google Interview Prep →](/companies/google)
- [Amazon Interview Prep →](/companies/amazon)
- [Swiggy Interview Prep →](/companies/swiggy)
- [Back to Interview Guide →](/system-design-interview-guide)
