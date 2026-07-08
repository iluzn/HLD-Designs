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

PhonePe is one of India's most competitive fintech companies. The interview process is structured around strong DSA fundamentals, clean machine coding, and fintech-scale system design. Each round is eliminatory.

---

## Interview Process

| Round | Focus | Duration | Details |
|---|---|---|---|
| Online Assessment | 4 coding problems | 90 min | 1 Easy + 1 Medium + 1 Medium-Hard + 1 Hard (CF 1800+) |
| Round 1 | Machine Coding (LLD) | 90 min | Design patterns, SOLID, runnable code |
| Round 2 | DSA | 45-60 min | 1-2 problems, brute → optimized |
| Round 3 | HLD (SDE-2+) | 45-60 min | Fintech-scale distributed systems |
| Round 4 | Hiring Manager | 45 min | Projects, leadership, culture fit |

**Key insight:** PhonePe rejects candidates with correct logic but messy code. Write clean, named, modular code.

---

## HLD Problems Asked at PhonePe

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | Digital Wallet | 🔴 Advanced | [Read →](/hld/DigitalWallet) |
| 2 | Delayed Trigger Service | 🔴 Advanced | [Read →](/hld/DelayedTriggerService) |
| 3 | Notification System | 🟡 Intermediate | [Read →](/hld/NotificationSystem) |
| 4 | Distributed Job Scheduler | 🔴 Advanced | [Read →](/hld/JobScheduler) |

---

## LLD / Machine Coding Problems Asked at PhonePe

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | Multilevel Cache System | 🟡 Intermediate | [Read →](/lld/MultilevelCache) |
| 2 | Parking Lot | 🟢 Beginner | [Read →](/lld/ParkingLot) |
| 3 | Splitwise | 🟡 Intermediate | [Read →](/lld/Splitwise) |
| 4 | Dispute/Ticket Resolution Service | 🟡 Intermediate | — |
| 5 | Vehicle Rental System | 🟡 Intermediate | — |
| 6 | Journey Service (dynamic fare + promotions) | 🟡 Intermediate | — |
| 7 | Music Player | 🟡 Intermediate | [Read →](/lld/MusicPlayer) |

**Most asked machine coding:** Multilevel Cache and Dispute Resolution Service appear repeatedly (2023-2026). Recent reports show take-home format on CodeSignal (90 min, submit ZIP, then 30-min code review call).

---

## DSA Problems Asked at PhonePe (Complete List)

### Trees + DP (PhonePe's Favorite Category)

| # | Problem | Pattern | Difficulty | Link |
|---|---------|---------|-----------|------|
| 1 | House Robber III | Tree DP | Medium | [LeetCode →](https://leetcode.com/problems/house-robber-iii/) |
| 2 | Binary Tree Maximum Path Sum | DFS | Hard | [LeetCode →](https://leetcode.com/problems/binary-tree-maximum-path-sum/) |
| 3 | All Nodes Distance K in Binary Tree | Tree → Graph + BFS | Medium | [LeetCode →](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/) |
| 4 | Serialize and Deserialize Binary Tree | BFS/DFS | Hard | [LeetCode →](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) |
| 5 | Lowest Common Ancestor | DFS | Medium | [LeetCode →](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) |
| 6 | Validate Binary Search Tree | DFS + Range | Medium | [LeetCode →](https://leetcode.com/problems/validate-binary-search-tree/) |
| 7 | Kth Smallest Element in BST | Inorder | Medium | [LeetCode →](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) |
| 8 | Flatten Binary Tree to Linked List | DFS | Medium | [LeetCode →](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) |
| 9 | Construct Binary Tree from Inorder and Postorder | Recursion | Medium | [LeetCode →](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) |
| 10 | Diameter of Binary Tree | DFS | Easy | [LeetCode →](https://leetcode.com/problems/diameter-of-binary-tree/) |

### Dynamic Programming

| # | Problem | Pattern | Difficulty | Link |
|---|---------|---------|-----------|------|
| 11 | Candy | Greedy/DP | Hard | [LeetCode →](https://leetcode.com/problems/candy/) |
| 12 | House Robber | Linear DP | Medium | [LeetCode →](https://leetcode.com/problems/house-robber/) |
| 13 | House Robber II (Circular) | Linear DP | Medium | [LeetCode →](https://leetcode.com/problems/house-robber-ii/) |
| 14 | Longest Increasing Subsequence | DP + Binary Search | Medium | [LeetCode →](https://leetcode.com/problems/longest-increasing-subsequence/) |
| 15 | Coin Change | Unbounded Knapsack | Medium | [LeetCode →](https://leetcode.com/problems/coin-change/) |
| 16 | Edit Distance | 2D DP | Medium | [LeetCode →](https://leetcode.com/problems/edit-distance/) |
| 17 | Word Break | DP | Medium | [LeetCode →](https://leetcode.com/problems/word-break/) |
| 18 | Maximum Subarray (Kadane's) | DP | Medium | [LeetCode →](https://leetcode.com/problems/maximum-subarray/) |
| 19 | Unique Paths | Grid DP | Medium | [LeetCode →](https://leetcode.com/problems/unique-paths/) |
| 20 | Minimum Path Sum | Grid DP | Medium | [LeetCode →](https://leetcode.com/problems/minimum-path-sum/) |
| 21 | Maximal Square | Grid DP | Medium | [LeetCode →](https://leetcode.com/problems/maximal-square/) |
| 22 | Jump Game | Greedy/DP | Medium | [LeetCode →](https://leetcode.com/problems/jump-game/) |
| 23 | Longest Palindromic Substring | Expand from Center / DP | Medium | [LeetCode →](https://leetcode.com/problems/longest-palindromic-substring/) |

### Graphs / BFS / DFS

| # | Problem | Pattern | Difficulty | Link |
|---|---------|---------|-----------|------|
| 24 | Number of Islands | BFS/DFS | Medium | [LeetCode →](https://leetcode.com/problems/number-of-islands/) |
| 25 | Course Schedule | Topological Sort | Medium | [LeetCode →](https://leetcode.com/problems/course-schedule/) |
| 26 | Word Ladder | BFS | Hard | [LeetCode →](https://leetcode.com/problems/word-ladder/) |
| 27 | Rotting Oranges | Multi-source BFS | Medium | [LeetCode →](https://leetcode.com/problems/rotting-oranges/) |
| 28 | Number of Provinces | Union-Find/DFS | Medium | [LeetCode →](https://leetcode.com/problems/number-of-provinces/) |
| 29 | Clone Graph | BFS + HashMap | Medium | [LeetCode →](https://leetcode.com/problems/clone-graph/) |
| 30 | Shortest Path in Binary Matrix | BFS | Medium | [LeetCode →](https://leetcode.com/problems/shortest-path-in-binary-matrix/) |

### Arrays / Strings / Hashing

| # | Problem | Pattern | Difficulty | Link |
|---|---------|---------|-----------|------|
| 31 | Two Sum | HashMap | Easy | [LeetCode →](https://leetcode.com/problems/two-sum/) |
| 32 | 3Sum | Two Pointers + Sort | Medium | [LeetCode →](https://leetcode.com/problems/3sum/) |
| 33 | Trapping Rain Water | Two Pointers / Stack | Hard | [LeetCode →](https://leetcode.com/problems/trapping-rain-water/) |
| 34 | Merge Intervals | Sort + Sweep | Medium | [LeetCode →](https://leetcode.com/problems/merge-intervals/) |
| 35 | Meeting Rooms II | Intervals + Heap | Medium | [LeetCode →](https://leetcode.com/problems/meeting-rooms-ii/) |
| 36 | Subarray Sum Equals K | Prefix Sum + HashMap | Medium | [LeetCode →](https://leetcode.com/problems/subarray-sum-equals-k/) |
| 37 | Product of Array Except Self | Prefix/Suffix | Medium | [LeetCode →](https://leetcode.com/problems/product-of-array-except-self/) |
| 38 | Longest Substring Without Repeating Characters | Sliding Window | Medium | [LeetCode →](https://leetcode.com/problems/longest-substring-without-repeating-characters/) |
| 39 | Group Anagrams | HashMap + Sorting | Medium | [LeetCode →](https://leetcode.com/problems/group-anagrams/) |
| 40 | Find the Duplicate Number | Fast/Slow Pointer | Medium | [LeetCode →](https://leetcode.com/problems/find-the-duplicate-number/) |
| 41 | Set Matrix Zeroes | Array | Medium | [LeetCode →](https://leetcode.com/problems/set-matrix-zeroes/) |
| 42 | Spiral Matrix | Simulation | Medium | [LeetCode →](https://leetcode.com/problems/spiral-matrix/) |

### Binary Search

| # | Problem | Pattern | Difficulty | Link |
|---|---------|---------|-----------|------|
| 43 | Search in Rotated Sorted Array | Modified BS | Medium | [LeetCode →](https://leetcode.com/problems/search-in-rotated-sorted-array/) |
| 44 | Find Minimum in Rotated Sorted Array | Binary Search | Medium | [LeetCode →](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) |
| 45 | Koko Eating Bananas | BS on Answer | Medium | [LeetCode →](https://leetcode.com/problems/koko-eating-bananas/) |
| 46 | Find Peak Element | Binary Search | Medium | [LeetCode →](https://leetcode.com/problems/find-peak-element/) |
| 47 | Median of Two Sorted Arrays | Binary Search | Hard | [LeetCode →](https://leetcode.com/problems/median-of-two-sorted-arrays/) |

### Stack

| # | Problem | Pattern | Difficulty | Link |
|---|---------|---------|-----------|------|
| 48 | Valid Parentheses | Stack | Easy | [LeetCode →](https://leetcode.com/problems/valid-parentheses/) |
| 49 | Largest Rectangle in Histogram | Monotonic Stack | Hard | [LeetCode →](https://leetcode.com/problems/largest-rectangle-in-histogram/) |
| 50 | Min Stack | Stack Design | Medium | [LeetCode →](https://leetcode.com/problems/min-stack/) |
| 51 | Daily Temperatures | Monotonic Stack | Medium | [LeetCode →](https://leetcode.com/problems/daily-temperatures/) |
| 52 | Next Greater Element I | Monotonic Stack | Easy | [LeetCode →](https://leetcode.com/problems/next-greater-element-i/) |

### Linked List

| # | Problem | Pattern | Difficulty | Link |
|---|---------|---------|-----------|------|
| 53 | LRU Cache | HashMap + DLL | Medium | [LeetCode →](https://leetcode.com/problems/lru-cache/) |
| 54 | Reverse Linked List | Iterative/Recursive | Easy | [LeetCode →](https://leetcode.com/problems/reverse-linked-list/) |
| 55 | Merge Two Sorted Lists | Two Pointers | Easy | [LeetCode →](https://leetcode.com/problems/merge-two-sorted-lists/) |
| 56 | Linked List Cycle | Fast/Slow Pointers | Easy | [LeetCode →](https://leetcode.com/problems/linked-list-cycle/) |

### Heap / Greedy

| # | Problem | Pattern | Difficulty | Link |
|---|---------|---------|-----------|------|
| 57 | Kth Largest Element | QuickSelect / Heap | Medium | [LeetCode →](https://leetcode.com/problems/kth-largest-element-in-an-array/) |
| 58 | Top K Frequent Elements | Heap / Bucket Sort | Medium | [LeetCode →](https://leetcode.com/problems/top-k-frequent-elements/) |
| 59 | Merge K Sorted Lists | Min-Heap | Hard | [LeetCode →](https://leetcode.com/problems/merge-k-sorted-lists/) |
| 60 | Task Scheduler | Greedy / Heap | Medium | [LeetCode →](https://leetcode.com/problems/task-scheduler/) |

### Backtracking

| # | Problem | Pattern | Difficulty | Link |
|---|---------|---------|-----------|------|
| 61 | Word Search | DFS + Backtrack | Medium | [LeetCode →](https://leetcode.com/problems/word-search/) |
| 62 | Combination Sum | Backtracking | Medium | [LeetCode →](https://leetcode.com/problems/combination-sum/) |
| 63 | Generate Parentheses | Backtracking | Medium | [LeetCode →](https://leetcode.com/problems/generate-parentheses/) |

### Union-Find / DSU (Trending in 2025-2026)

| # | Problem | Pattern | Difficulty | Link |
|---|---------|---------|-----------|------|
| 64 | Number of Connected Components | Union-Find | Medium | [LeetCode →](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/) |
| 65 | Redundant Connection | Union-Find | Medium | [LeetCode →](https://leetcode.com/problems/redundant-connection/) |
| 66 | Accounts Merge | Union-Find + DFS | Medium | [LeetCode →](https://leetcode.com/problems/accounts-merge/) |

### Additional Confirmed (2025-2026)

| # | Problem | Pattern | Difficulty | Link |
|---|---------|---------|-----------|------|
| 67 | Distribute Coins in Binary Tree | Tree DFS | Medium | [LeetCode →](https://leetcode.com/problems/distribute-coins-in-binary-tree/) |
| 68 | Maximum Product of Three Numbers | Sorting + Greedy | Easy | [LeetCode →](https://leetcode.com/problems/maximum-product-of-three-numbers/) |
| 69 | Minimum Window Substring | Sliding Window | Hard | [LeetCode →](https://leetcode.com/problems/minimum-window-substring/) |
| 70 | Container With Most Water | Two Pointers | Medium | [LeetCode →](https://leetcode.com/problems/container-with-most-water/) |

---

## PhonePe-Specific Questions (Not on LeetCode)

These are custom problems reported from PhonePe OA and interviews:

| # | Problem Description | Pattern | Year |
|---|---|---|---|
| 1 | Seat allocation: N seats, some occupied. For M queries, allocate seat maximizing distance to nearest person. | Binary Search / Heap | 2024 |
| 2 | Find three indices i,j,k such that A[i]*A[j]*A[k] is max with A[i] <= A[j] <= A[k] and i < j < k | Sorting + Greedy | 2024 |
| 3 | 2D array (n x 2), find max path sum with strictly increasing values, pick one per row | Grid DP | 2021 |
| 4 | Minimum moves to convert string A to string B | Edit Distance variant | 2021 |
| 5 | People pass a test: score starts at 0, person passes if score > threshold, bound value added after passing. Maximize people passing. | Greedy + Sorting | 2022 |
| 6 | Matrix m x n, find max path sum from any element, can only move right or down | Grid DP | 2022 |
| 7 | Lexicographically smallest word from NxN matrix with K letter-change operations | DP + Greedy | 2026 |
| 8 | Balance coins in binary tree so every node has exactly one coin, minimize total moves | Tree DFS | 2026 |

---

## OA Pattern (Online Assessment)

PhonePe OA has 4 questions in 90 minutes on DoSelect platform.

| Difficulty | Typical Topic | Solve Target |
|---|---|---|
| Q1 (Easy) | Arrays / Strings | Must solve |
| Q2 (Medium) | Binary Search / Sliding Window | Must solve |
| Q3 (Medium-Hard) | Trees + DP / Graph | Should solve |
| Q4 (Hard) | CF 1800-2000 rated | Partial credit OK |

Solving 2.5-3 questions typically clears the OA.

---

## Tips for PhonePe Interviews

1. **Machine coding is make-or-break.** PhonePe weighs the LLD round heavily. Practice writing clean, extensible code in 90 minutes with at least one Strategy pattern.
2. **Show progression in DSA.** Start with brute force, explain why it's slow, then optimize. They evaluate your thought process, not just the final answer.
3. **Expect fintech-specific deep dives.** Idempotency, double-entry ledgers, reconciliation, and saga patterns come up in HLD rounds.
4. **Concurrency follow-ups are common.** After solving a DSA problem, they may ask "How would you make this thread-safe?" Be ready with `synchronized`, locks, or ConcurrentHashMap.
5. **Code quality matters.** PhonePe rejects candidates with correct logic but messy code. Use meaningful names, separate concerns, keep methods small.
6. **OA is harder than interview rounds.** The online assessment has CF-rated hard problems. Don't be discouraged if you can't solve Q4 completely.

---

## Other Company Prep

- [Amazon Interview Prep →](/companies/amazon)
- [Flipkart Interview Prep →](/companies/flipkart)
- [Back to Interview Guide →](/system-design-interview-guide)
