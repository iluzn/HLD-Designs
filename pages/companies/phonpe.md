---
layout: default
title: "PhonePe Interview Prep - System Design, DSA & Machine Coding"
description: "Curated HLD, DSA, and LLD problems asked at PhonePe. Digital Wallet, Delayed Triggers, Two Sum, Merge Intervals, Splitwise, Parking Lot."
permalink: /companies/phonpe
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What system design questions are asked at PhonePe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PhonePe commonly asks: Digital Wallet design, Delayed Trigger Service, Notification System, and Job Scheduler for HLD rounds. For LLD/Machine Coding: Parking Lot, Splitwise, and Music Player."
      }
    },
    {
      "@type": "Question",
      "name": "What is PhonePe's interview process for SDE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PhonePe's SDE interview typically includes: 1 DSA round, 1 Machine Coding round (90 minutes), 1 System Design round (for SDE-2+), and 1-2 Hiring Manager rounds."
      }
    }
  ]
}
</script>

# PhonePe Interview Prep

PhonePe interviews typically consist of 2-3 DSA rounds, 1 machine coding (LLD) round, and 1 system design (HLD) round for SDE-2 and above. The machine coding round is 90 minutes with a focus on design patterns, SOLID principles, and runnable code. System design rounds emphasize fintech-scale problems - payments, wallets, and event-driven architectures.

---

## HLD Problems Asked at PhonePe

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | Digital Wallet | 🔴 Advanced | [Read →](/hld/DigitalWallet) |
| 2 | Delayed Trigger Service | 🔴 Advanced | [Read →](/hld/DelayedTriggerService) |
| 3 | Notification System | 🟡 Intermediate | [Read →](/hld/NotificationSystem) |
| 4 | Distributed Job Scheduler | 🔴 Advanced | [Read →](/hld/JobScheduler) |

---

## LLD Problems Asked at PhonePe

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | Parking Lot | 🟢 Beginner | [Read →](/lld/ParkingLot) |
| 2 | Splitwise | 🟡 Intermediate | [Read →](/lld/Splitwise) |
| 3 | Music Player | 🟡 Intermediate | [Read →](/lld/MusicPlayer) |

---

## DSA Problems Frequently Asked at PhonePe

| # | Problem | Pattern | Link |
|---|---------|---------|------|
| 1 | Two Sum | HashMap | [LeetCode →](https://leetcode.com/problems/two-sum/) |
| 2 | Valid Parentheses | Stack | [LeetCode →](https://leetcode.com/problems/valid-parentheses/) |
| 3 | Merge Intervals | Sorting + Greedy | [LeetCode →](https://leetcode.com/problems/merge-intervals/) |
| 4 | Longest Palindromic Substring | DP / Expand from Center | [LeetCode →](https://leetcode.com/problems/longest-palindromic-substring/) |
| 5 | Binary Tree Level Order Traversal | BFS | [LeetCode →](https://leetcode.com/problems/binary-tree-level-order-traversal/) |
| 6 | Min Stack | Stack Design | [LeetCode →](https://leetcode.com/problems/min-stack/) |
| 7 | Group Anagrams | HashMap + Sorting | [LeetCode →](https://leetcode.com/problems/group-anagrams/) |
| 8 | Find Minimum in Rotated Sorted Array | Binary Search | [LeetCode →](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) |
| 9 | Maximum Subarray | Kadane's Algorithm | [LeetCode →](https://leetcode.com/problems/maximum-subarray/) |
| 10 | Linked List Cycle | Fast & Slow Pointers | [LeetCode →](https://leetcode.com/problems/linked-list-cycle/) |

---

## Tips for PhonePe Interviews

1. **Machine coding is make-or-break.** PhonePe weighs the LLD round heavily. Practice writing clean, extensible code in 90 minutes with at least one Strategy pattern.
2. **Expect fintech-specific deep dives.** Idempotency, double-entry ledgers, reconciliation, and saga patterns come up frequently in HLD rounds.
3. **Show concurrency awareness.** PhonePe deals with high-throughput payment systems - discuss thread safety, distributed locks, and exactly-once semantics.
4. **Keep your demo running.** In machine coding, a working `main()` with sample output matters more than perfect code coverage.

---

## Other Company Prep

- [Amazon Interview Prep →](/companies/amazon)
- [Flipkart Interview Prep →](/companies/flipkart)
- [Back to Interview Guide →](/system-design-interview-guide)
