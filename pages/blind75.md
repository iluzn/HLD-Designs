---
permalink: /the-75/
layout: default
title: "Blind 75 - LeetCode Interview Cheatsheet with Progress Tracker"
description: "75 essential coding problems with LeetCode links, pattern tags, and one-line approaches. Complete your interview prep in 4-5 weeks."
---

# The 75 - Interview Sprint

75 problems that cover every pattern asked in tech interviews. Solve these and you've seen every trick interviewers use. Each row links directly to the problem on LeetCode.

> 📋 **Which list should I use?**
> - **1 week of prep?** → [Quick-Fire 50](/cheatsheet) (subset of this list)
> - **4 weeks of prep?** → You're here. The Blind 75.
> - **8 weeks of prep?** → [NeetCode 150](/the-150) (includes all 75 + 75 more)

> 💡 **How to use:** Go top-to-bottom by section. If you can explain the approach in 10 seconds, move on. If not, click the link and solve it.

---

## Arrays & Hashing (9)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 1 | [Two Sum](/dsa/problem/two-sum) | HashMap | Store complement → lookup | O(n) |
| 2 | [Best Time to Buy and Sell Stock](/dsa/problem/best-time-to-buy-and-sell-stock) | Greedy | Track min price, compute profit at each step | O(n) |
| 3 | [Contains Duplicate](/dsa/problem/contains-duplicate) | HashSet | Add to set, check existence | O(n) |
| 4 | [Product of Array Except Self](/dsa/problem/product-of-array-except-self) | Prefix/Suffix | Left-pass × right-pass | O(n) |
| 5 | [Maximum Subarray](/dsa/problem/maximum-subarray) | Kadane | `curMax = max(num, curMax + num)` | O(n) |
| 6 | [Maximum Product Subarray](/dsa/problem/maximum-product-subarray) | DP | Track both maxProd and minProd (negatives flip) | O(n) |
| 7 | [Find Minimum in Rotated Sorted Array](/dsa/problem/find-minimum-in-rotated-sorted-array) | Binary Search | Shrink toward unsorted half | O(log n) |
| 8 | [Search in Rotated Sorted Array](/dsa/problem/search-in-rotated-sorted-array) | Binary Search | Check which half is sorted, decide direction | O(log n) |
| 9 | [3Sum](/dsa/problem/3sum) | Two Pointers | Sort + fix one + two-pointer. Skip dupes. | O(n²) |

## Two Pointers (3)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 10 | [Container With Most Water](/dsa/problem/container-with-most-water) | Two Pointers | Left/right, move shorter side inward | O(n) |
| 11 | [Valid Palindrome](/dsa/problem/valid-palindrome) | Two Pointers | Skip non-alphanumeric, compare inward | O(n) |
| 12 | [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) | Expand from Center | Try each index as center, expand both sides | O(n²) |

## Sliding Window (4)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 13 | [Longest Substring Without Repeating](/dsa/problem/longest-substring-without-repeating-characters) | Sliding Window | HashMap for last-seen index, jump left on conflict | O(n) |
| 14 | [Longest Repeating Character Replacement](/dsa/problem/longest-repeating-character-replacement) | Sliding Window | Window valid while `len - maxFreq <= k` | O(n) |
| 15 | [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) | Sliding Window | Expand until valid, shrink to minimize | O(n) |
| 16 | [Group Anagrams](/dsa/problem/group-anagrams) | HashMap | Sorted string as key | O(n·k log k) |

## Stack (1)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 17 | [Valid Parentheses](/dsa/problem/valid-parentheses) | Stack | Push opens, pop on close, check match | O(n) |

## Binary Search (2)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 18 | [Find Minimum in Rotated Sorted Array](/dsa/problem/find-minimum-in-rotated-sorted-array) | Binary Search | If `mid > right`, min is in right half | O(log n) |
| 19 | [Search in Rotated Sorted Array](/dsa/problem/search-in-rotated-sorted-array) | Binary Search | Determine sorted half, check if target is in it | O(log n) |

## Linked List (6)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 20 | [Reverse Linked List](/dsa/problem/reverse-linked-list) | Iterative/Recursive | prev/curr/next pointer swap | O(n) |
| 21 | [Merge Two Sorted Lists](/dsa/problem/merge-two-sorted-lists) | Merge | Dummy head, compare and advance | O(n+m) |
| 22 | [Linked List Cycle](/dsa/problem/linked-list-cycle) | Fast/Slow | Floyd's cycle detection | O(n) |
| 23 | [Reorder List](/dsa/problem/reorder-list) | Find Middle + Reverse + Merge | Split at mid, reverse 2nd half, interleave | O(n) |
| 24 | [Remove Nth Node From End](/dsa/problem/remove-nth-node-from-end-of-list) | Two Pointers | Advance fast N steps, then move both | O(n) |
| 25 | [Merge K Sorted Lists](/dsa/problem/merge-k-sorted-lists) | Heap | Min-heap of K list heads, extract-min and advance | O(n log k) |

## Trees (11)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 26 | [Invert Binary Tree](/dsa/problem/invert-binary-tree) | DFS | Recursively swap left/right children | O(n) |
| 27 | [Maximum Depth of Binary Tree](/dsa/problem/maximum-depth-of-binary-tree) | DFS | `1 + max(left, right)` | O(n) |
| 28 | [Same Tree](/dsa/problem/same-tree) | DFS | Compare both nodes recursively | O(n) |
| 29 | [Subtree of Another Tree](/dsa/problem/subtree-of-another-tree) | DFS | For each node, check `isSameTree` | O(m×n) |
| 30 | [Lowest Common Ancestor of BST](/dsa/problem/lowest-common-ancestor-of-a-binary-search-tree) | BST Property | Both < node → go left; both > → go right; else found | O(h) |
| 31 | [Binary Tree Level Order Traversal](/dsa/problem/binary-tree-level-order-traversal) | BFS | Queue, process level by level | O(n) |
| 32 | [Validate BST](/dsa/problem/validate-binary-search-tree) | DFS | Pass (min, max) bounds down | O(n) |
| 33 | [Kth Smallest in BST](/dsa/problem/kth-smallest-element-in-a-bst) | Inorder | Inorder traversal gives sorted; stop at k | O(h+k) |
| 34 | [Build Tree from Preorder & Inorder](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | Recursion | Root = preorder[0], split inorder, recurse | O(n) |
| 35 | [Binary Tree Max Path Sum](/dsa/problem/binary-tree-maximum-path-sum) | DFS | At each node: max gain = node + max(left, right, 0). Track global max. | O(n) |
| 36 | [Serialize/Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) | Preorder | Mark nulls as "#", split by delimiter | O(n) |

## Tries (3)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 37 | [Implement Trie](https://leetcode.com/problems/implement-trie-prefix-tree/) | Trie | TrieNode with children[26] + isEnd flag | O(L) per op |
| 38 | [Add and Search Word](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | Trie + DFS | On '.', branch to all children | O(26^L) worst |
| 39 | [Word Search II](/dsa/problem/word-search-ii/) | Trie + Backtracking | Build trie of words, DFS grid matching trie paths | O(m×n×4^L) |

## Heap / Priority Queue (3)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 40 | [Top K Frequent Elements](/dsa/problem/top-k-frequent-elements) | Heap / Bucket Sort | Count freq → min-heap of size K (or bucket sort O(n)) | O(n log k) |
| 41 | [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) | Two Heaps | Max-heap (left half) + min-heap (right half), balance sizes | O(log n) per add |
| 42 | [Merge K Sorted Lists](/dsa/problem/merge-k-sorted-lists) | Heap | (duplicate - see #25) | O(n log k) |

## Backtracking (2)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 43 | [Combination Sum](/dsa/problem/combination-sum) | Backtracking | DFS with remaining target, include/skip each candidate | O(2^t) |
| 44 | [Word Search](/dsa/problem/word-search) | Backtracking | DFS from each cell, mark visited, backtrack | O(m×n×4^L) |

## Graphs (8)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 45 | [Number of Islands](/dsa/problem/number-of-islands) | BFS/DFS | From each '1', flood-fill and count components | O(m×n) |
| 46 | [Clone Graph](https://leetcode.com/problems/clone-graph/) | BFS/DFS | HashMap old→new, clone neighbors recursively | O(V+E) |
| 47 | [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/) | DFS | DFS from pacific edges + DFS from atlantic edges, intersect | O(m×n) |
| 48 | [Course Schedule](/dsa/problem/course-schedule) | Topological Sort | Kahn's BFS (in-degree) or DFS cycle detection | O(V+E) |
| 49 | [Number of Connected Components](/dsa/problem/number-of-connected-components-in-an-undirected-graph) | Union-Find / DFS | Union-Find with path compression, count roots | O(V+E·α) |
| 50 | [Graph Valid Tree](/dsa/problem/graph-valid-tree) | Union-Find | Tree = connected + no cycle: E == V-1 + union-find no duplicate edge | O(V+E) |
| 51 | [Alien Dictionary](https://leetcode.com/problems/alien-dictionary/) | Topological Sort | Build graph from word order, topo sort | O(C) |
| 52 | [Longest Consecutive Sequence](/dsa/problem/longest-consecutive-sequence) | HashSet | For each num, if num-1 not in set → start counting up | O(n) |

## Dynamic Programming (11)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 53 | [Climbing Stairs](/dsa/problem/climbing-stairs) | DP (Fibonacci) | `dp[i] = dp[i-1] + dp[i-2]` | O(n) |
| 54 | [House Robber](/dsa/problem/house-robber) | DP | `dp[i] = max(dp[i-1], dp[i-2] + nums[i])` | O(n) |
| 55 | [House Robber II](/dsa/problem/house-robber-ii) | DP (circular) | Run House Robber on `[0..n-2]` and `[1..n-1]`, take max | O(n) |
| 56 | [Coin Change](/dsa/problem/coin-change) | DP | `dp[i] = min(dp[i-coin]+1)` for each coin | O(amount×coins) |
| 57 | [Longest Increasing Subsequence](/dsa/problem/longest-increasing-subsequence) | DP / Patience | DP O(n²) or patience sort + binary search O(n log n) | O(n log n) |
| 58 | [Word Break](/dsa/problem/word-break) | DP | `dp[i] = any dp[j] && s[j:i] in dict` | O(n²·L) |
| 59 | [Decode Ways](/dsa/problem/decode-ways) | DP | `dp[i]` based on 1-digit and 2-digit valid decodings | O(n) |
| 60 | [Unique Paths](/dsa/problem/unique-paths) | DP (2D) | `dp[i][j] = dp[i-1][j] + dp[i][j-1]` | O(m×n) |
| 61 | [Jump Game](/dsa/problem/jump-game) | Greedy | Track farthest reachable | O(n) |
| 62 | [Longest Common Subsequence](/dsa/problem/longest-common-subsequence) | DP (2D) | `if match: dp[i][j] = dp[i-1][j-1]+1` else `max(left, up)` | O(m×n) |
| 63 | [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/) | DP (0/1 Knapsack) | Can we make sum/2 with a subset? Boolean dp. | O(n×sum) |

## Intervals (5)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 64 | [Insert Interval](https://leetcode.com/problems/insert-interval/) | Merge | Find overlap range, merge, collect rest | O(n) |
| 65 | [Merge Intervals](/dsa/problem/merge-intervals) | Sort + Sweep | Sort by start, extend end if overlapping | O(n log n) |
| 66 | [Non-Overlapping Intervals](/dsa/problem/non-overlapping-intervals) | Greedy | Sort by end, greedily keep earliest-ending | O(n log n) |
| 67 | [Meeting Rooms](/dsa/problem/meeting-rooms) | Sort | Sort by start, check any overlap | O(n log n) |
| 68 | [Meeting Rooms II](/dsa/problem/meeting-rooms-ii/) | Sweep / Heap | Sort starts+ends separately, sweep counter (or min-heap) | O(n log n) |

## Greedy (2)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 69 | [Maximum Subarray](/dsa/problem/maximum-subarray) | Kadane | (duplicate - see #5) | O(n) |
| 70 | [Jump Game](/dsa/problem/jump-game) | Greedy | (duplicate - see #61) | O(n) |

## Bit Manipulation (5)

| # | Problem | Pattern | Approach | Time |
|---|---|---|---|---|
| 71 | [Number of 1 Bits](/dsa/problem/number-of-1-bits) | Bit Counting | `n & (n-1)` removes lowest set bit; count iterations | O(32) |
| 72 | [Counting Bits](/dsa/problem/counting-bits) | DP + Bits | `dp[i] = dp[i >> 1] + (i & 1)` | O(n) |
| 73 | [Reverse Bits](https://leetcode.com/problems/reverse-bits/) | Bit Manipulation | Shift result left, OR with `n & 1`, shift n right | O(32) |
| 74 | [Missing Number](/dsa/problem/missing-number) | XOR | XOR all indices + all values → missing remains | O(n) |
| 75 | [Sum of Two Integers (no +/-)](/dsa/problem/sum-of-two-integers) | Bit Manipulation | `carry = (a & b) << 1; sum = a ^ b;` repeat until no carry | O(32) |

---

*For detailed solutions with explanations, check the [DSA section](/dsa). For pattern fundamentals, read [DSA Fundamentals](/dsa-fundamentals).*
