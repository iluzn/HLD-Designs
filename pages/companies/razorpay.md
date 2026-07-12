---
layout: default
title: "Razorpay Interview Prep - System Design, DSA & Machine Coding"
description: "Curated system design, DSA, and LLD problems asked at Razorpay. Digital Wallet, Rate Limiter, Notification System, Parking Lot, Splitwise."
permalink: /companies/razorpay
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What system design questions are asked at Razorpay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Razorpay commonly asks: Digital Wallet / Payment System, Rate Limiter, Notification System, and Job Scheduler for HLD. For LLD: Parking Lot, Splitwise, and Snake and Ladder."
      }
    },
    {
      "@type": "Question",
      "name": "What is Razorpay's SDE interview process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Razorpay's SDE-2 loop includes: 1-2 DSA rounds, 1 Machine Coding round (90 minutes), 1 System Design round, and 1 Hiring Manager round. Strong focus on fintech domain and correctness."
      }
    }
  ]
}
</script>

# Razorpay Interview Prep

Razorpay's loop for SDE-2+ includes DSA, machine coding (90 min), system design, and a hiring manager round. As a fintech company, system design questions lean heavily toward payment processing, transaction correctness, and idempotency. They expect candidates to understand double-entry bookkeeping, saga patterns, and exactly-once semantics without prompting.

---

## HLD Problems Asked at Razorpay

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | Digital Wallet (PhonePe / Venmo) | Advanced | [Read →](/hld/DigitalWallet) |
| 2 | Rate Limiter | Beginner | [Read →](/hld/RateLimiter) |
| 3 | Notification System | Intermediate | [Read →](/hld/NotificationSystem) |
| 4 | Distributed Job Scheduler | Advanced | [Read →](/hld/JobScheduler) |
| 5 | Delayed Trigger Service | Advanced | [Read →](/hld/DelayedTriggerService) |

---

## LLD Problems Asked at Razorpay

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | Parking Lot | Beginner | [Read →](/lld/ParkingLot) |
| 2 | Splitwise | Intermediate | [Read →](/lld/Splitwise) |
| 3 | Snake and Ladder | Intermediate | [Read →](/lld/SnakeLadder) |

---

## DSA Problems Frequently Asked at Razorpay

| # | Problem | Pattern | Link |
|---|---------|---------|------|
| 1 | Two Sum | HashMap | [Solve →](/dsa/problem/two-sum) |
| 2 | Valid Parentheses | Stack | [Solve →](/dsa/problem/valid-parentheses) |
| 3 | Merge Intervals | Sorting + Greedy | [Solve →](/dsa/problem/merge-intervals) |
| 4 | LRU Cache | HashMap + DLL | [Solve →](/dsa/problem/lru-cache) |
| 5 | Maximum Subarray | Kadane's Algorithm | [Solve →](/dsa/problem/maximum-subarray) |
| 6 | Coin Change | DP | [Solve →](/dsa/problem/coin-change) |
| 7 | Binary Search | Binary Search | [Solve →](/dsa/problem/binary-search) |
| 8 | Linked List Cycle | Fast and Slow Pointers | [Solve →](/dsa/problem/linked-list-cycle) |
| 9 | Group Anagrams | HashMap + Sorting | [Solve →](/dsa/problem/group-anagrams) |
| 10 | Min Stack | Stack Design | [Solve →](/dsa/problem/min-stack) |

---

## Tips for Razorpay Interviews

1. **Fintech correctness is non-negotiable.** In system design, always address idempotency, double-entry ledgers, and reconciliation. "What happens if the payment gateway times out?" is guaranteed.
2. **Machine coding round is heavy.** Razorpay's LLD round expects Strategy pattern, clean interfaces, and extensibility. Practice Splitwise or Parking Lot end-to-end in 90 minutes.
3. **Know distributed transactions.** Saga pattern, two-phase commit (and why it's impractical), compensating transactions - these are core to Razorpay's domain.
4. **DSA is standard medium.** Focus on implementation quality: handle nulls, validate inputs, name variables well. Razorpay values code readability as much as correctness.

---

## Other Company Prep

- [PhonePe Interview Prep →](/companies/phonpe)
- [Flipkart Interview Prep →](/companies/flipkart)
- [Swiggy Interview Prep →](/companies/swiggy)
- [Back to Interview Guide →](/system-design-interview-guide)
