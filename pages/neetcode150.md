---
permalink: /neetcode150/
layout: default
title: "NeetCode 150 Cheatsheet — All Problems with Pattern & Approach"
description: "Complete NeetCode 150 list with pattern, one-line approach, and complexity. The expanded Blind 75 that covers more depth per topic."
---

# NeetCode 150 — Complete Cheatsheet

The expanded version of Blind 75 by NeetCode — 150 problems that cover every pattern in more depth. If you have 6-8 weeks, do this instead of Blind 75.

> 💡 **Format:** Same as the Blind 75 cheatsheet — problem, pattern, one-line approach, complexity. If you already did the Blind 75, the extra 75 problems here fill the gaps.

---

## Arrays & Hashing (9)

| # | Problem | Approach | Time |
|---|---|---|---|
| 1 | Contains Duplicate | HashSet | O(n) |
| 2 | Valid Anagram | Sort or count[26] | O(n) |
| 3 | Two Sum | HashMap complement lookup | O(n) |
| 4 | Group Anagrams | Sorted string as HashMap key | O(n·k log k) |
| 5 | Top K Frequent Elements | HashMap + min-heap K or bucket sort | O(n log k) |
| 6 | Encode and Decode Strings | Length-prefix: `"4#word"` | O(n) |
| 7 | Product of Array Except Self | Left prefix × right suffix | O(n) |
| 8 | Valid Sudoku | HashSet per row + col + box | O(81) |
| 9 | Longest Consecutive Sequence | HashSet, only start if num-1 absent | O(n) |

## Two Pointers (5)

| # | Problem | Approach | Time |
|---|---|---|---|
| 10 | Valid Palindrome | Two pointers inward, skip non-alpha | O(n) |
| 11 | Two Sum II (Sorted) | Left/right, move based on sum vs target | O(n) |
| 12 | 3Sum | Sort + fix one + two-pointer | O(n²) |
| 13 | Container With Most Water | Move shorter side inward | O(n) |
| 14 | Trapping Rain Water | Two pointers with leftMax/rightMax | O(n) |

## Sliding Window (6)

| # | Problem | Approach | Time |
|---|---|---|---|
| 15 | Best Time to Buy/Sell Stock | Track min, compute profit at each step | O(n) |
| 16 | Longest Substring Without Repeating | HashMap last-seen, jump left on conflict | O(n) |
| 17 | Longest Repeating Character Replacement | `len - maxFreq <= k` window | O(n) |
| 18 | Permutation in String | Fixed window of size len(s1), compare freq counts | O(n) |
| 19 | Minimum Window Substring | Expand until valid, shrink to minimize | O(n) |
| 20 | Sliding Window Maximum | Monotonic decreasing deque | O(n) |

## Stack (7)

| # | Problem | Approach | Time |
|---|---|---|---|
| 21 | Valid Parentheses | Push open, pop close, check match | O(n) |
| 22 | Min Stack | Two stacks (values + running min) | O(1) |
| 23 | Evaluate Reverse Polish Notation | Stack of numbers, pop 2 on operator | O(n) |
| 24 | Generate Parentheses | Backtracking with open/close count | O(4^n/√n) |
| 25 | Daily Temperatures | Monotonic decreasing stack, pop when warmer | O(n) |
| 26 | Car Fleet | Sort by position desc, stack by time to reach target | O(n log n) |
| 27 | Largest Rectangle in Histogram | Monotonic stack for next-smaller on both sides | O(n) |

## Binary Search (7)

| # | Problem | Approach | Time |
|---|---|---|---|
| 28 | Binary Search | Standard lo/hi with mid | O(log n) |
| 29 | Search 2D Matrix | Treat as flat sorted array, binary search | O(log(m×n)) |
| 30 | Koko Eating Bananas | Binary search on speed, check feasibility | O(n log m) |
| 31 | Find Minimum in Rotated Sorted Array | If mid > right, min in right half | O(log n) |
| 32 | Search in Rotated Sorted Array | Determine sorted half, check target in it | O(log n) |
| 33 | Time Based Key-Value Store | HashMap + binary search on timestamps | O(log n) |
| 34 | Median of Two Sorted Arrays | Binary search on partition of smaller array | O(log min(m,n)) |

## Linked List (11)

| # | Problem | Approach | Time |
|---|---|---|---|
| 35 | Reverse Linked List | prev/curr/next iterative | O(n) |
| 36 | Merge Two Sorted Lists | Dummy head, compare, advance | O(n+m) |
| 37 | Reorder List | Find mid + reverse 2nd half + interleave | O(n) |
| 38 | Remove Nth Node From End | Fast ahead N, then move both | O(n) |
| 39 | Copy List with Random Pointer | HashMap old→new or interleave nodes | O(n) |
| 40 | Add Two Numbers | Carry propagation through both lists | O(max(m,n)) |
| 41 | Linked List Cycle | Floyd's fast/slow | O(n) |
| 42 | Find Duplicate Number | Floyd's on index array (cycle start) | O(n) |
| 43 | LRU Cache | HashMap + doubly-linked list | O(1) |
| 44 | Merge K Sorted Lists | Min-heap of K heads | O(n log k) |
| 45 | Reverse Nodes in K-Group | Count K, reverse segment, connect | O(n) |

## Trees (15)

| # | Problem | Approach | Time |
|---|---|---|---|
| 46 | Invert Binary Tree | Swap children recursively | O(n) |
| 47 | Maximum Depth | `1 + max(left, right)` | O(n) |
| 48 | Diameter of Binary Tree | At each node: leftH + rightH; track global max | O(n) |
| 49 | Balanced Binary Tree | Check `abs(leftH - rightH) <= 1` at every node | O(n) |
| 50 | Same Tree | Compare both nodes recursively | O(n) |
| 51 | Subtree of Another Tree | For each node, isSameTree check | O(m×n) |
| 52 | Lowest Common Ancestor of BST | BST property: split point is LCA | O(h) |
| 53 | Level Order Traversal | BFS with queue | O(n) |
| 54 | Right Side View | BFS, take last node of each level | O(n) |
| 55 | Count Good Nodes | DFS with running max from root | O(n) |
| 56 | Validate BST | DFS with (min, max) bounds | O(n) |
| 57 | Kth Smallest in BST | Inorder traversal, stop at k | O(h+k) |
| 58 | Build Tree from Pre+In | root=pre[0], split inorder, recurse | O(n) |
| 59 | Max Path Sum | DFS: node + max(left,right,0); track global | O(n) |
| 60 | Serialize/Deserialize | Preorder with "#" for nulls | O(n) |

## Tries (3)

| # | Problem | Approach | Time |
|---|---|---|---|
| 61 | Implement Trie | children[26] + isEnd per node | O(L) |
| 62 | Add and Search Word | DFS on '.' wildcard | O(26^L) worst |
| 63 | Word Search II | Trie of words + DFS grid | O(m×n×4^L) |

## Heap / Priority Queue (7)

| # | Problem | Approach | Time |
|---|---|---|---|
| 64 | Kth Largest Element | Min-heap of size K or quickselect | O(n) avg |
| 65 | Last Stone Weight | Max-heap, smash top two | O(n log n) |
| 66 | K Closest Points to Origin | Min-heap by distance or quickselect | O(n log k) |
| 67 | Task Scheduler | Count max-freq, compute idle slots | O(n) |
| 68 | Design Twitter | HashMap + merge K sorted (heap of recent 10) | O(k log k) |
| 69 | Find Median from Data Stream | Max-heap left + min-heap right | O(log n) |
| 70 | Top K Frequent Elements | (dup — see #5) | O(n log k) |

## Backtracking (9)

| # | Problem | Approach | Time |
|---|---|---|---|
| 71 | Subsets | Include/exclude each element | O(2^n) |
| 72 | Combination Sum | DFS with remaining, reuse allowed | O(2^t) |
| 73 | Permutations | Swap-based or used[] array | O(n!) |
| 74 | Subsets II (with dups) | Sort + skip duplicates at same level | O(2^n) |
| 75 | Combination Sum II | Sort + skip same value at same depth | O(2^n) |
| 76 | Word Search | DFS from each cell, backtrack | O(m×n×4^L) |
| 77 | Palindrome Partitioning | DFS + isPalin check at each split | O(n×2^n) |
| 78 | Letter Combinations of Phone | DFS through digit→letters mapping | O(4^n) |
| 79 | N-Queens | Place row-by-row, check col/diag conflicts | O(n!) |

## Graphs (13)

| # | Problem | Approach | Time |
|---|---|---|---|
| 80 | Number of Islands | BFS/DFS flood fill | O(m×n) |
| 81 | Max Area of Island | DFS, count cells per component | O(m×n) |
| 82 | Clone Graph | BFS/DFS + HashMap old→new | O(V+E) |
| 83 | Walls and Gates | Multi-source BFS from all gates | O(m×n) |
| 84 | Rotting Oranges | Multi-source BFS from all rotten | O(m×n) |
| 85 | Pacific Atlantic Water Flow | DFS from each ocean edge, intersect | O(m×n) |
| 86 | Surrounded Regions | DFS from border 'O's, mark safe; flip rest | O(m×n) |
| 87 | Course Schedule | Topological sort (Kahn's) | O(V+E) |
| 88 | Course Schedule II | Topo sort, return the order | O(V+E) |
| 89 | Graph Valid Tree | V-1 edges + connected (Union-Find) | O(V+E) |
| 90 | Number of Connected Components | Union-Find or DFS count | O(V+E) |
| 91 | Redundant Connection | Union-Find — edge that creates cycle | O(V+E) |
| 92 | Word Ladder | BFS level-by-level, change one char | O(n×26×L) |

## Advanced Graphs (6)

| # | Problem | Approach | Time |
|---|---|---|---|
| 93 | Reconstruct Itinerary | DFS + sort adjacency (Hierholzer's) | O(E log E) |
| 94 | Min Cost to Connect All Points | Prim's MST with min-heap | O(n² log n) |
| 95 | Network Delay Time | Dijkstra from source | O((V+E) log V) |
| 96 | Swim in Rising Water | Binary search + BFS or Dijkstra on grid | O(n² log n) |
| 97 | Alien Dictionary | Build DAG from word order, topo sort | O(C) |
| 98 | Cheapest Flights Within K Stops | Bellman-Ford K iterations or BFS with layers | O(K×E) |

## 1-D Dynamic Programming (10)

| # | Problem | Approach | Time |
|---|---|---|---|
| 99 | Climbing Stairs | `dp[i] = dp[i-1] + dp[i-2]` | O(n) |
| 100 | Min Cost Climbing Stairs | `dp[i] = min(dp[i-1], dp[i-2]) + cost[i]` | O(n) |
| 101 | House Robber | `dp[i] = max(dp[i-1], dp[i-2]+nums[i])` | O(n) |
| 102 | House Robber II | Run robber on [0..n-2] and [1..n-1] | O(n) |
| 103 | Longest Palindromic Substring | Expand from center | O(n²) |
| 104 | Palindromic Substrings (count) | Expand from each center, count | O(n²) |
| 105 | Decode Ways | `dp[i]` from 1-digit + 2-digit valid | O(n) |
| 106 | Coin Change | `dp[i] = min(dp[i-coin]+1)` | O(amount×coins) |
| 107 | Maximum Product Subarray | Track maxProd, minProd (negatives) | O(n) |
| 108 | Word Break | `dp[i] = any dp[j] && s[j:i] in dict` | O(n²×L) |

## 2-D Dynamic Programming (11)

| # | Problem | Approach | Time |
|---|---|---|---|
| 109 | Unique Paths | `dp[i][j] = dp[i-1][j] + dp[i][j-1]` | O(m×n) |
| 110 | Longest Common Subsequence | Match→diag+1, else max(left,up) | O(m×n) |
| 111 | Best Time Buy/Sell with Cooldown | States: hold, sold, rest | O(n) |
| 112 | Coin Change II (count ways) | `dp[i] += dp[i-coin]` | O(amount×coins) |
| 113 | Target Sum | 0/1 knapsack on (sum+total)/2 | O(n×sum) |
| 114 | Interleaving String | 2D dp[i][j] = can form s3[0..i+j] from s1[0..i] + s2[0..j] | O(m×n) |
| 115 | Longest Increasing Path in Matrix | DFS + memo on grid | O(m×n) |
| 116 | Distinct Subsequences | `dp[i][j] = dp[i-1][j] + (match ? dp[i-1][j-1] : 0)` | O(m×n) |
| 117 | Edit Distance | Insert/delete/replace dp table | O(m×n) |
| 118 | Burst Balloons | Interval DP: last balloon to burst in range | O(n³) |
| 119 | Regular Expression Matching | 2D DP for '.' and '*' | O(m×n) |

## Greedy (8)

| # | Problem | Approach | Time |
|---|---|---|---|
| 120 | Maximum Subarray | Kadane's | O(n) |
| 121 | Jump Game | Track farthest reachable | O(n) |
| 122 | Jump Game II | BFS-style levels (current reach, next reach) | O(n) |
| 123 | Gas Station | If total gas >= total cost, solution exists; find start via running sum | O(n) |
| 124 | Hand of Straights | Sort + greedily form groups with HashMap | O(n log n) |
| 125 | Merge Triplets to Form Target | For each triplet, check if any coordinate matches without exceeding | O(n) |
| 126 | Partition Labels | Last occurrence of each char; extend end, split when i == end | O(n) |
| 127 | Valid Parenthesis String | Track min/max open count range | O(n) |

## Intervals (5)

| # | Problem | Approach | Time |
|---|---|---|---|
| 128 | Insert Interval | Collect before + merge overlap + collect after | O(n) |
| 129 | Merge Intervals | Sort by start, extend end if overlap | O(n log n) |
| 130 | Non-Overlapping Intervals | Sort by end, greedily keep earliest | O(n log n) |
| 131 | Meeting Rooms | Sort, check any overlap | O(n log n) |
| 132 | Meeting Rooms II | Sweep (sort starts+ends) or min-heap | O(n log n) |

## Math & Geometry (8)

| # | Problem | Approach | Time |
|---|---|---|---|
| 133 | Rotate Image | Transpose + reverse each row | O(n²) |
| 134 | Spiral Matrix | Boundary tracking (top/bottom/left/right) | O(m×n) |
| 135 | Set Matrix Zeroes | Use first row/col as markers | O(m×n) |
| 136 | Happy Number | Fast/slow (Floyd's) on digit-sum sequence | O(log n) |
| 137 | Plus One | Add from last digit, handle carry | O(n) |
| 138 | Pow(x, n) | Fast exponentiation (square-and-multiply) | O(log n) |
| 139 | Multiply Strings | Grade-school multiplication, digit by digit | O(m×n) |
| 140 | Detect Squares | HashMap of points; for each query, find valid rectangles | O(n) |

## Bit Manipulation (7)

| # | Problem | Approach | Time |
|---|---|---|---|
| 141 | Single Number | XOR all → duplicate cancels, single remains | O(n) |
| 142 | Number of 1 Bits | `n & (n-1)` removes LSB; count | O(32) |
| 143 | Counting Bits | `dp[i] = dp[i>>1] + (i&1)` | O(n) |
| 144 | Reverse Bits | Shift result left + OR with (n&1) + shift n right | O(32) |
| 145 | Missing Number | XOR all indices + all values | O(n) |
| 146 | Sum of Two Integers | `carry = (a&b)<<1; sum = a^b` repeat | O(32) |
| 147 | Reverse Integer | Pop digits with %10, push to result, check overflow | O(log n) |

## Bonus (3)

| # | Problem | Approach | Time |
|---|---|---|---|
| 148 | Design Add and Search Words | Trie + DFS on wildcards | O(26^L) |
| 149 | Maximum Product of Word Lengths | Bitmask per word, compare pairs with no overlap | O(n²) |
| 150 | Longest Increasing Subsequence | Patience sort + binary search | O(n log n) |

---

## Study Plan

| Week | Problems | Focus |
|---|---|---|
| 1-2 | #1-40 | Arrays, Pointers, Window, Stack, Search, Linked List |
| 3-4 | #41-80 | Trees, Tries, Heaps, Backtracking, Graphs |
| 5-6 | #81-120 | Advanced Graphs, 1D DP, 2D DP, Greedy |
| 7-8 | #121-150 | Intervals, Math, Bits, Cleanup + revisit weak spots |

Pace: **~3 problems/day** = done in 7-8 weeks.

---

*For full solutions with walkthroughs, check the [DSA section](/dsa). For the shorter version, see [Blind 75](/blind75).*
