---
permalink: /cheatsheet/
layout: default
title: "Quick-Fire 50 - Coding Interview Cheatsheet"
description: "Quick-reference cheatsheet of the 50 most frequently asked coding interview problems. Pattern, approach, and complexity in one glance."
---

# Quick-Fire 50 - Interview Cheatsheet

The 50 problems that show up most in FAANG + Indian tech interviews (Amazon, Google, Meta, PhonePe, Flipkart, Uber). Bookmark this page and review before every interview.

> 📋 **Which list should I use?**
> - **1 week of prep?** → You're here. Quick-Fire 50.
> - **4 weeks of prep?** → [The Blind 75](/the-75) (includes all 50 + 25 more)
> - **8 weeks of prep?** → [NeetCode 150](/the-150) (most comprehensive)

> 💡 **How to use:** Scan the "Approach" column. If you can't explain it in 10 seconds, that's the one to practice.

---

## Arrays & Hashing

| # | Problem | Approach | Time | Space |
|---|---|---|---|---|
| 1 | [Two Sum](/dsa/problem/two-sum) | HashMap: store complement, lookup on each element | O(n) | O(n) |
| 2 | [Best Time to Buy/Sell Stock](/dsa/problem/best-time-to-buy-and-sell-stock) | Track min price so far, compute profit at each step | O(n) | O(1) |
| 3 | [Contains Duplicate](/dsa/problem/contains-duplicate) | HashSet - add and check | O(n) | O(n) |
| 4 | [Product of Array Except Self](/dsa/problem/product-of-array-except-self) | Left-pass prefix product + right-pass suffix product | O(n) | O(1)* |
| 5 | [Maximum Subarray (Kadane)](/dsa/problem/maximum-subarray) | Track `currentMax = max(num, currentMax + num)` | O(n) | O(1) |
| 6 | [Group Anagrams](https://leetcode.com/problems/group-anagrams/) | Sort each word → use as HashMap key | O(n·k log k) | O(n·k) |
| 7 | [Top K Frequent Elements](/dsa/problem/top-k-frequent-elements) | HashMap count + min-heap of size K (or bucket sort) | O(n log k) | O(n) |
| 8 | [Encode/Decode Strings](https://leetcode.com/problems/encode-and-decode-strings/) | Length-prefix each string: `"4#word"` | O(n) | O(1) |

## Two Pointers

| # | Problem | Approach | Time | Space |
|---|---|---|---|---|
| 9 | [Valid Palindrome](/dsa/problem/valid-palindrome) | Left/right pointers, skip non-alphanumeric, compare | O(n) | O(1) |
| 10 | [3Sum](https://leetcode.com/problems/3sum/) | Sort + fix one, two-pointer on rest. Skip duplicates. | O(n²) | O(1) |
| 11 | [Container With Most Water](/dsa/problem/container-with-most-water) | Left/right, move the shorter side inward | O(n) | O(1) |
| 12 | [Trapping Rain Water](/dsa/problem/trapping-rain-water) | Two pointers with `leftMax`/`rightMax` tracking | O(n) | O(1) |

## Sliding Window

| # | Problem | Approach | Time | Space |
|---|---|---|---|---|
| 13 | [Longest Substring Without Repeating](/dsa/problem/longest-substring-without-repeating-characters) | Window + HashMap (last seen index), jump left on conflict | O(n) | O(128) |
| 14 | [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) | Expand right until valid, shrink left to minimize | O(n) | O(128) |
| 15 | [Longest Repeating Character Replacement](/dsa/problem/longest-repeating-character-replacement) | Window where `len - maxFreq <= k` | O(n) | O(26) |
| 16 | [Sliding Window Maximum](/dsa/problem/sliding-window-maximum) | Monotonic decreasing deque | O(n) | O(k) |

## Stack

| # | Problem | Approach | Time | Space |
|---|---|---|---|---|
| 17 | [Valid Parentheses](/dsa/problem/valid-parentheses) | Push open, pop on close, check match | O(n) | O(n) |
| 18 | [Daily Temperatures](/dsa/problem/daily-temperatures) | Monotonic stack: pop when current > top | O(n) | O(n) |
| 19 | [Largest Rectangle in Histogram](/dsa/problem/largest-rectangle-in-histogram) | Monotonic stack for next-smaller on both sides | O(n) | O(n) |
| 20 | [Min Stack](https://leetcode.com/problems/min-stack/) | Two stacks: values + running minimum | O(1) all ops | O(n) |

## Binary Search

| # | Problem | Approach | Time | Space |
|---|---|---|---|---|
| 21 | [Search in Rotated Sorted Array](/dsa/problem/search-in-rotated-sorted-array) | Binary search - check which half is sorted | O(log n) | O(1) |
| 22 | [Find Minimum in Rotated Array](/dsa/problem/find-minimum-in-rotated-sorted-array) | Binary search - shrink toward the unsorted half | O(log n) | O(1) |
| 23 | [Koko Eating Bananas](/dsa/problem/koko-eating-bananas) | Binary search on answer (speed), check feasibility | O(n log m) | O(1) |
| 24 | [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/) | Binary search on partition of smaller array | O(log min(m,n)) | O(1) |

## Linked List

| # | Problem | Approach | Time | Space |
|---|---|---|---|---|
| 25 | [Reverse Linked List](/dsa/problem/reverse-linked-list) | Iterative: prev/curr/next pointers | O(n) | O(1) |
| 26 | [Linked List Cycle](/dsa/problem/linked-list-cycle) | Fast/slow pointers (Floyd's) | O(n) | O(1) |
| 27 | [Merge Two Sorted Lists](/dsa/problem/merge-two-sorted-lists) | Dummy head, compare and advance | O(n+m) | O(1) |
| 28 | [LRU Cache](https://leetcode.com/problems/lru-cache/) | HashMap + doubly-linked list (or LinkedHashMap) | O(1) all ops | O(cap) |

## Trees

| # | Problem | Approach | Time | Space |
|---|---|---|---|---|
| 29 | [Invert Binary Tree](/dsa/problem/invert-binary-tree) | Recursive: swap left/right children | O(n) | O(h) |
| 30 | [Maximum Depth of Binary Tree](/dsa/problem/maximum-depth-of-binary-tree) | DFS: `1 + max(left, right)` | O(n) | O(h) |
| 31 | [Lowest Common Ancestor](/dsa/problem/lowest-common-ancestor-of-a-binary-search-tree) | If both in left → go left. Both right → go right. Else current. | O(n) | O(h) |
| 32 | [Validate BST](/dsa/problem/validate-binary-search-tree) | DFS with (min, max) bounds | O(n) | O(h) |
| 33 | [Level Order Traversal](/dsa/problem/binary-tree-level-order-traversal) | BFS with queue, process level-by-level | O(n) | O(n) |
| 34 | [Serialize/Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) | Preorder with nulls marked as "#" | O(n) | O(n) |

## Graphs

| # | Problem | Approach | Time | Space |
|---|---|---|---|---|
| 35 | [Number of Islands](/dsa/problem/number-of-islands) | BFS/DFS from each '1', mark visited | O(m×n) | O(m×n) |
| 36 | [Clone Graph](https://leetcode.com/problems/clone-graph/) | BFS/DFS + HashMap (old node → new node) | O(V+E) | O(V) |
| 37 | [Course Schedule](https://leetcode.com/problems/course-schedule/) | Topological sort (BFS Kahn's or DFS cycle detection) | O(V+E) | O(V+E) |
| 38 | [Word Ladder](https://leetcode.com/problems/word-ladder/) | BFS level-by-level, change one char at a time | O(n·26·L) | O(n·L) |
| 39 | [Dijkstra's Shortest Path](https://leetcode.com/problems/network-delay-time/) | Min-heap + relaxation | O((V+E) log V) | O(V) |

## Dynamic Programming

| # | Problem | Approach | Time | Space |
|---|---|---|---|---|
| 40 | [Climbing Stairs](/dsa/problem/climbing-stairs) | `dp[i] = dp[i-1] + dp[i-2]` (Fibonacci) | O(n) | O(1) |
| 41 | [Coin Change](/dsa/problem/coin-change) | `dp[i] = min(dp[i-coin]+1)` for each coin | O(amount×coins) | O(amount) |
| 42 | [Longest Increasing Subsequence](/dsa/problem/longest-increasing-subsequence) | DP: O(n²) or patience sort with binary search: O(n log n) | O(n log n) | O(n) |
| 43 | [Word Break](/dsa/problem/word-break) | `dp[i] = any dp[j] && s[j:i] in dict` | O(n²·L) | O(n) |
| 44 | [House Robber](/dsa/problem/house-robber) | `dp[i] = max(dp[i-1], dp[i-2] + nums[i])` | O(n) | O(1) |
| 45 | [Edit Distance](/dsa/problem/edit-distance) | 2D DP: insert/delete/replace at each (i,j) | O(m×n) | O(m×n) |

## Greedy / Intervals

| # | Problem | Approach | Time | Space |
|---|---|---|---|---|
| 46 | [Merge Intervals](/dsa/problem/merge-intervals) | Sort by start, extend end if overlapping | O(n log n) | O(n) |
| 47 | [Meeting Rooms II](/dsa/problem/meeting-rooms-ii/) | Sort starts + ends separately, sweep with counter | O(n log n) | O(n) |
| 48 | [Jump Game](/dsa/problem/jump-game) | Track farthest reachable index | O(n) | O(1) |
| 49 | [Non-Overlapping Intervals](/dsa/problem/non-overlapping-intervals) | Sort by end, greedily keep earliest-ending | O(n log n) | O(1) |
| 50 | [Task Scheduler](https://leetcode.com/problems/task-scheduler/) | Count max-freq task, compute idle slots | O(n) | O(26) |

---

## Pattern Recognition Cheatsheet

| If you see... | Try this pattern |
|---|---|
| "Sorted array + find pair/target" | Two Pointers |
| "Contiguous subarray/substring with constraint" | Sliding Window |
| "Find minimum/maximum that satisfies condition" | Binary Search on Answer |
| "Shortest path in unweighted graph" | BFS |
| "All combinations/permutations" | Backtracking (DFS) |
| "Overlapping subproblems + optimal substructure" | Dynamic Programming |
| "Next greater/smaller element" | Monotonic Stack |
| "Connected components / merge groups" | Union-Find |
| "Task dependencies / ordering" | Topological Sort |
| "Prefix matching / dictionary" | Trie |
| "Intervals overlap/merge" | Sort by start + sweep |
| "Top K / Kth largest" | Heap (Priority Queue) |

---

## Complexity Quick Reference

| Structure | Access | Search | Insert | Delete |
|---|---|---|---|---|
| Array | O(1) | O(n) | O(n) | O(n) |
| HashMap | - | O(1) avg | O(1) avg | O(1) avg |
| BST (balanced) | - | O(log n) | O(log n) | O(log n) |
| Heap | O(1) peek | O(n) | O(log n) | O(log n) |
| Stack/Queue | O(1) top | O(n) | O(1) | O(1) |

| Sort | Best | Average | Worst | Stable? |
|---|---|---|---|---|
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | No |
| Tim Sort (Java/Python default) | O(n) | O(n log n) | O(n log n) | Yes |

---

## The 10 "Must-Solve-First" Problems

If you only have 3 days, solve these - they cover the most patterns with the least problems:

1. [Two Sum](/dsa/problem/two-sum) (HashMap)
2. [Best Time to Buy/Sell Stock](/dsa/problem/best-time-to-buy-and-sell-stock) (Greedy/Kadane)
3. [Longest Substring Without Repeating](/dsa/problem/longest-substring-without-repeating-characters) (Sliding Window)
4. [3Sum](https://leetcode.com/problems/3sum/) (Two Pointers + Sort)
5. [Merge Intervals](/dsa/problem/merge-intervals) (Sort + Sweep)
6. [Number of Islands](/dsa/problem/number-of-islands) (BFS/DFS)
7. [Coin Change](/dsa/problem/coin-change) (DP)
8. [LRU Cache](https://leetcode.com/problems/lru-cache/) (HashMap + DLL)
9. [Course Schedule](https://leetcode.com/problems/course-schedule/) (Topological Sort)
10. [Valid Parentheses](/dsa/problem/valid-parentheses) (Stack)

---

*Bookmark this page. Review it 30 minutes before every coding interview.*

*Want detailed solutions? Check the [DSA problems section](/dsa).*
