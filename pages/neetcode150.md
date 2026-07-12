---
permalink: /the-150/
layout: default
title: "NeetCode 150 - Complete Coding Interview Prep Cheatsheet"
description: "150 coding problems with LeetCode links, pattern tags, and one-line approaches. Complete deep coverage in 6-8 weeks."
---

# The 150 - Complete Interview Prep

The expanded interview prep list - 150 problems covering every pattern in depth. If you have 6-8 weeks, this is the definitive set. Each row links directly to LeetCode.

> 📋 **Which list should I use?**
> - **1 week of prep?** → [Quick-Fire 50](/cheatsheet)
> - **4 weeks of prep?** → [The Blind 75](/the-75) (subset of this list)
> - **8 weeks of prep?** → You're here. NeetCode 150.

> 💡 **Format:** Problem (clickable LeetCode link), one-line approach, complexity. If you already did The 75, the extra problems here fill the gaps.

---

## Arrays & Hashing (9)

| # | Problem | Approach | Time |
|---|---|---|---|
| 1 | [Contains Duplicate](/dsa/problem/contains-duplicate) | HashSet | O(n) |
| 2 | [Valid Anagram](/dsa/problem/valid-anagram) | Sort or count[26] | O(n) |
| 3 | [Two Sum](/dsa/problem/two-sum) | HashMap complement lookup | O(n) |
| 4 | [Group Anagrams](https://leetcode.com/problems/group-anagrams/) | Sorted string as HashMap key | O(n·k log k) |
| 5 | [Top K Frequent Elements](/dsa/problem/top-k-frequent-elements) | HashMap + min-heap K or bucket sort | O(n log k) |
| 6 | [Encode and Decode Strings](https://leetcode.com/problems/encode-and-decode-strings/) | Length-prefix: `"4#word"` | O(n) |
| 7 | [Product of Array Except Self](/dsa/problem/product-of-array-except-self) | Left prefix × right suffix | O(n) |
| 8 | [Valid Sudoku](https://leetcode.com/problems/valid-sudoku/) | HashSet per row + col + box | O(81) |
| 9 | [Longest Consecutive Sequence](/dsa/problem/longest-consecutive-sequence) | HashSet, only start if num-1 absent | O(n) |

## Two Pointers (5)

| # | Problem | Approach | Time |
|---|---|---|---|
| 10 | [Valid Palindrome](/dsa/problem/valid-palindrome) | Two pointers inward, skip non-alpha | O(n) |
| 11 | [Two Sum II (Sorted)](/dsa/problem/two-sum-ii) | Left/right, move based on sum vs target | O(n) |
| 12 | [3Sum](https://leetcode.com/problems/3sum/) | Sort + fix one + two-pointer | O(n²) |
| 13 | [Container With Most Water](/dsa/problem/container-with-most-water) | Move shorter side inward | O(n) |
| 14 | [Trapping Rain Water](/dsa/problem/trapping-rain-water) | Two pointers with leftMax/rightMax | O(n) |

## Sliding Window (6)

| # | Problem | Approach | Time |
|---|---|---|---|
| 15 | [Best Time to Buy/Sell Stock](/dsa/problem/best-time-to-buy-and-sell-stock) | Track min, compute profit at each step | O(n) |
| 16 | [Longest Substring Without Repeating](/dsa/problem/longest-substring-without-repeating-characters) | HashMap last-seen, jump left on conflict | O(n) |
| 17 | [Longest Repeating Character Replacement](/dsa/problem/longest-repeating-character-replacement) | `len - maxFreq <= k` window | O(n) |
| 18 | [Permutation in String](https://leetcode.com/problems/permutation-in-string/) | Fixed window of size len(s1), compare freq counts | O(n) |
| 19 | [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) | Expand until valid, shrink to minimize | O(n) |
| 20 | [Sliding Window Maximum](/dsa/problem/sliding-window-maximum) | Monotonic decreasing deque | O(n) |

## Stack (7)

| # | Problem | Approach | Time |
|---|---|---|---|
| 21 | [Valid Parentheses](/dsa/problem/valid-parentheses) | Push open, pop close, check match | O(n) |
| 22 | [Min Stack](https://leetcode.com/problems/min-stack/) | Two stacks (values + running min) | O(1) |
| 23 | [Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/) | Stack of numbers, pop 2 on operator | O(n) |
| 24 | [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) | Backtracking with open/close count | O(4^n/√n) |
| 25 | [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) | Monotonic decreasing stack, pop when warmer | O(n) |
| 26 | [Car Fleet](https://leetcode.com/problems/car-fleet/) | Sort by position desc, stack by time to reach target | O(n log n) |
| 27 | [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) | Monotonic stack for next-smaller on both sides | O(n) |

## Binary Search (7)

| # | Problem | Approach | Time |
|---|---|---|---|
| 28 | [Binary Search](/dsa/problem/binary-search) | Standard lo/hi with mid | O(log n) |
| 29 | [Search 2D Matrix](/dsa/problem/search-a-2d-matrix) | Treat as flat sorted array, binary search | O(log(m×n)) |
| 30 | [Koko Eating Bananas](/dsa/problem/koko-eating-bananas) | Binary search on speed, check feasibility | O(n log m) |
| 31 | [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) | If mid > right, min in right half | O(log n) |
| 32 | [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) | Determine sorted half, check target in it | O(log n) |
| 33 | [Time Based Key-Value Store](https://leetcode.com/problems/time-based-key-value-store/) | HashMap + binary search on timestamps | O(log n) |
| 34 | [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/) | Binary search on partition of smaller array | O(log min(m,n)) |

## Linked List (11)

| # | Problem | Approach | Time |
|---|---|---|---|
| 35 | [Reverse Linked List](/dsa/problem/reverse-linked-list) | prev/curr/next iterative | O(n) |
| 36 | [Merge Two Sorted Lists](/dsa/problem/merge-two-sorted-lists) | Dummy head, compare, advance | O(n+m) |
| 37 | [Reorder List](/dsa/problem/reorder-list) | Find mid + reverse 2nd half + interleave | O(n) |
| 38 | [Remove Nth Node From End](/dsa/problem/remove-nth-node-from-end-of-list) | Fast ahead N, then move both | O(n) |
| 39 | [Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/) | HashMap old→new or interleave nodes | O(n) |
| 40 | [Add Two Numbers](/dsa/problem/add-two-numbers) | Carry propagation through both lists | O(max(m,n)) |
| 41 | [Linked List Cycle](/dsa/problem/linked-list-cycle) | Floyd's fast/slow | O(n) |
| 42 | [Find Duplicate Number](/dsa/problem/find-the-duplicate-number) | Floyd's on index array (cycle start) | O(n) |
| 43 | [LRU Cache](https://leetcode.com/problems/lru-cache/) | HashMap + doubly-linked list | O(1) |
| 44 | [Merge K Sorted Lists](/dsa/problem/merge-k-sorted-lists) | Min-heap of K heads | O(n log k) |
| 45 | [Reverse Nodes in K-Group](/dsa/problem/reverse-nodes-in-k-group) | Count K, reverse segment, connect | O(n) |

## Trees (15)

| # | Problem | Approach | Time |
|---|---|---|---|
| 46 | [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/) | Swap children recursively | O(n) |
| 47 | [Maximum Depth](/dsa/problem/maximum-depth-of-binary-tree) | `1 + max(left, right)` | O(n) |
| 48 | [Diameter of Binary Tree](/dsa/problem/diameter-of-binary-tree) | At each node: leftH + rightH; track global max | O(n) |
| 49 | [Balanced Binary Tree](/dsa/problem/balanced-binary-tree) | Check `abs(leftH - rightH) <= 1` at every node | O(n) |
| 50 | [Same Tree](https://leetcode.com/problems/same-tree/) | Compare both nodes recursively | O(n) |
| 51 | [Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/) | For each node, isSameTree check | O(m×n) |
| 52 | [Lowest Common Ancestor of BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) | BST property: split point is LCA | O(h) |
| 53 | [Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) | BFS with queue | O(n) |
| 54 | [Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/) | BFS, take last node of each level | O(n) |
| 55 | [Count Good Nodes](https://leetcode.com/problems/count-good-nodes-in-binary-tree/) | DFS with running max from root | O(n) |
| 56 | [Validate BST](https://leetcode.com/problems/validate-binary-search-tree/) | DFS with (min, max) bounds | O(n) |
| 57 | [Kth Smallest in BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) | Inorder traversal, stop at k | O(h+k) |
| 58 | [Build Tree from Preorder & Inorder](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | Root = preorder[0], split inorder, recurse | O(n) |
| 59 | [Max Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/) | DFS: node + max(left,right,0); track global | O(n) |
| 60 | [Serialize/Deserialize](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) | Preorder with "#" for nulls | O(n) |

## Tries (3)

| # | Problem | Approach | Time |
|---|---|---|---|
| 61 | [Implement Trie](https://leetcode.com/problems/implement-trie-prefix-tree/) | children[26] + isEnd per node | O(L) |
| 62 | [Add and Search Word](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | DFS on '.' wildcard | O(26^L) worst |
| 63 | [Word Search II](https://leetcode.com/problems/word-search-ii/) | Trie of words + DFS grid | O(m×n×4^L) |

## Heap / Priority Queue (7)

| # | Problem | Approach | Time |
|---|---|---|---|
| 64 | [Kth Largest Element](/dsa/problem/kth-largest-element-in-an-array) | Min-heap of size K or quickselect | O(n) avg |
| 65 | [Last Stone Weight](https://leetcode.com/problems/last-stone-weight/) | Max-heap, smash top two | O(n log n) |
| 66 | [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/) | Min-heap by distance or quickselect | O(n log k) |
| 67 | [Task Scheduler](https://leetcode.com/problems/task-scheduler/) | Count max-freq, compute idle slots | O(n) |
| 68 | [Design Twitter](https://leetcode.com/problems/design-twitter/) | HashMap + merge K sorted (heap of recent 10) | O(k log k) |
| 69 | [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) | Max-heap left + min-heap right | O(log n) |
| 70 | [Top K Frequent Elements](/dsa/problem/top-k-frequent-elements) | (dup - see #5) | O(n log k) |

## Backtracking (9)

| # | Problem | Approach | Time |
|---|---|---|---|
| 71 | [Subsets](https://leetcode.com/problems/subsets/) | Include/exclude each element | O(2^n) |
| 72 | [Combination Sum](https://leetcode.com/problems/combination-sum/) | DFS with remaining, reuse allowed | O(2^t) |
| 73 | [Permutations](https://leetcode.com/problems/permutations/) | Swap-based or used[] array | O(n!) |
| 74 | [Subsets II (with dups)](https://leetcode.com/problems/subsets-ii/) | Sort + skip duplicates at same level | O(2^n) |
| 75 | [Combination Sum II](https://leetcode.com/problems/combination-sum-ii/) | Sort + skip same value at same depth | O(2^n) |
| 76 | [Word Search](https://leetcode.com/problems/word-search/) | DFS from each cell, backtrack | O(m×n×4^L) |
| 77 | [Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/) | DFS + isPalin check at each split | O(n×2^n) |
| 78 | [Letter Combinations of Phone](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | DFS through digit→letters mapping | O(4^n) |
| 79 | [N-Queens](https://leetcode.com/problems/n-queens/) | Place row-by-row, check col/diag conflicts | O(n!) |

## Graphs (13)

| # | Problem | Approach | Time |
|---|---|---|---|
| 80 | [Number of Islands](/dsa/problem/number-of-islands) | BFS/DFS flood fill | O(m×n) |
| 81 | [Max Area of Island](/dsa/problem/max-area-of-island) | DFS, count cells per component | O(m×n) |
| 82 | [Clone Graph](https://leetcode.com/problems/clone-graph/) | BFS/DFS + HashMap old→new | O(V+E) |
| 83 | [Walls and Gates](https://leetcode.com/problems/walls-and-gates/) | Multi-source BFS from all gates | O(m×n) |
| 84 | [Rotting Oranges](/dsa/problem/rotting-oranges) | Multi-source BFS from all rotten | O(m×n) |
| 85 | [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/) | DFS from each ocean edge, intersect | O(m×n) |
| 86 | [Surrounded Regions](https://leetcode.com/problems/surrounded-regions/) | DFS from border 'O's, mark safe; flip rest | O(m×n) |
| 87 | [Course Schedule](https://leetcode.com/problems/course-schedule/) | Topological sort (Kahn's) | O(V+E) |
| 88 | [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) | Topo sort, return the order | O(V+E) |
| 89 | [Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/) | V-1 edges + connected (Union-Find) | O(V+E) |
| 90 | [Number of Connected Components](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/) | Union-Find or DFS count | O(V+E) |
| 91 | [Redundant Connection](https://leetcode.com/problems/redundant-connection/) | Union-Find - edge that creates cycle | O(V+E) |
| 92 | [Word Ladder](https://leetcode.com/problems/word-ladder/) | BFS level-by-level, change one char | O(n×26×L) |

## Advanced Graphs (6)

| # | Problem | Approach | Time |
|---|---|---|---|
| 93 | [Reconstruct Itinerary](https://leetcode.com/problems/reconstruct-itinerary/) | DFS + sort adjacency (Hierholzer's) | O(E log E) |
| 94 | [Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/) | Prim's MST with min-heap | O(n² log n) |
| 95 | [Network Delay Time](https://leetcode.com/problems/network-delay-time/) | Dijkstra from source | O((V+E) log V) |
| 96 | [Swim in Rising Water](/dsa/problem/swim-in-rising-water) | Binary search + BFS or Dijkstra on grid | O(n² log n) |
| 97 | [Alien Dictionary](https://leetcode.com/problems/alien-dictionary/) | Build DAG from word order, topo sort | O(C) |
| 98 | [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) | Bellman-Ford K iterations or BFS with layers | O(K×E) |

## 1-D Dynamic Programming (10)

| # | Problem | Approach | Time |
|---|---|---|---|
| 99 | [Climbing Stairs](/dsa/problem/climbing-stairs) | `dp[i] = dp[i-1] + dp[i-2]` | O(n) |
| 100 | [Min Cost Climbing Stairs](/dsa/problem/min-cost-climbing-stairs) | `dp[i] = min(dp[i-1], dp[i-2]) + cost[i]` | O(n) |
| 101 | [House Robber](/dsa/problem/house-robber) | `dp[i] = max(dp[i-1], dp[i-2]+nums[i])` | O(n) |
| 102 | [House Robber II](/dsa/problem/house-robber-ii) | Run robber on [0..n-2] and [1..n-1] | O(n) |
| 103 | [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) | Expand from center | O(n²) |
| 104 | [Palindromic Substrings (count)](/dsa/problem/palindromic-substrings) | Expand from each center, count | O(n²) |
| 105 | [Decode Ways](/dsa/problem/decode-ways) | `dp[i]` from 1-digit + 2-digit valid | O(n) |
| 106 | [Coin Change](/dsa/problem/coin-change) | `dp[i] = min(dp[i-coin]+1)` | O(amount×coins) |
| 107 | [Maximum Product Subarray](/dsa/problem/maximum-product-subarray) | Track maxProd, minProd (negatives) | O(n) |
| 108 | [Word Break](/dsa/problem/word-break) | `dp[i] = any dp[j] && s[j:i] in dict` | O(n²×L) |

## 2-D Dynamic Programming (11)

| # | Problem | Approach | Time |
|---|---|---|---|
| 109 | [Unique Paths](/dsa/problem/unique-paths) | `dp[i][j] = dp[i-1][j] + dp[i][j-1]` | O(m×n) |
| 110 | [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/) | Match→diag+1, else max(left,up) | O(m×n) |
| 111 | [Best Time Buy/Sell with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) | States: hold, sold, rest | O(n) |
| 112 | [Coin Change II (count ways)](https://leetcode.com/problems/coin-change-ii/) | `dp[i] += dp[i-coin]` | O(amount×coins) |
| 113 | [Target Sum](https://leetcode.com/problems/target-sum/) | 0/1 knapsack on (sum+total)/2 | O(n×sum) |
| 114 | [Interleaving String](https://leetcode.com/problems/interleaving-string/) | 2D dp[i][j] = can form s3[0..i+j] from s1[0..i] + s2[0..j] | O(m×n) |
| 115 | [Longest Increasing Path in Matrix](/dsa/problem/longest-increasing-path-in-a-matrix) | DFS + memo on grid | O(m×n) |
| 116 | [Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/) | `dp[i][j] = dp[i-1][j] + (match ? dp[i-1][j-1] : 0)` | O(m×n) |
| 117 | [Edit Distance](https://leetcode.com/problems/edit-distance/) | Insert/delete/replace dp table | O(m×n) |
| 118 | [Burst Balloons](https://leetcode.com/problems/burst-balloons/) | Interval DP: last balloon to burst in range | O(n³) |
| 119 | [Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/) | 2D DP for '.' and '*' | O(m×n) |

## Greedy (8)

| # | Problem | Approach | Time |
|---|---|---|---|
| 120 | [Maximum Subarray](/dsa/problem/maximum-subarray) | Kadane's | O(n) |
| 121 | [Jump Game](/dsa/problem/jump-game) | Track farthest reachable | O(n) |
| 122 | [Jump Game II](/dsa/problem/jump-game-ii) | BFS-style levels (current reach, next reach) | O(n) |
| 123 | [Gas Station](https://leetcode.com/problems/gas-station/) | If total gas >= total cost, solution exists; find start via running sum | O(n) |
| 124 | [Hand of Straights](https://leetcode.com/problems/hand-of-straights/) | Sort + greedily form groups with HashMap | O(n log n) |
| 125 | [Merge Triplets to Form Target](https://leetcode.com/problems/merge-triplets-to-form-target-triplet/) | For each triplet, check if any coordinate matches without exceeding | O(n) |
| 126 | [Partition Labels](/dsa/problem/partition-labels) | Last occurrence of each char; extend end, split when i == end | O(n) |
| 127 | [Valid Parenthesis String](/dsa/problem/valid-parenthesis-string) | Track min/max open count range | O(n) |

## Intervals (5)

| # | Problem | Approach | Time |
|---|---|---|---|
| 128 | [Insert Interval](https://leetcode.com/problems/insert-interval/) | Collect before + merge overlap + collect after | O(n) |
| 129 | [Merge Intervals](https://leetcode.com/problems/merge-intervals/) | Sort by start, extend end if overlap | O(n log n) |
| 130 | [Non-Overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) | Sort by end, greedily keep earliest | O(n log n) |
| 131 | [Meeting Rooms](https://leetcode.com/problems/meeting-rooms/) | Sort, check any overlap | O(n log n) |
| 132 | [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/) | Sweep (sort starts+ends) or min-heap | O(n log n) |

## Math & Geometry (8)

| # | Problem | Approach | Time |
|---|---|---|---|
| 133 | [Rotate Image](https://leetcode.com/problems/rotate-image/) | Transpose + reverse each row | O(n²) |
| 134 | [Spiral Matrix](/dsa/problem/spiral-matrix) | Boundary tracking (top/bottom/left/right) | O(m×n) |
| 135 | [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/) | Use first row/col as markers | O(m×n) |
| 136 | [Happy Number](/dsa/problem/happy-number) | Fast/slow (Floyd's) on digit-sum sequence | O(log n) |
| 137 | [Plus One](/dsa/problem/plus-one) | Add from last digit, handle carry | O(n) |
| 138 | [Pow(x, n)](https://leetcode.com/problems/powx-n/) | Fast exponentiation (square-and-multiply) | O(log n) |
| 139 | [Multiply Strings](/dsa/problem/multiply-strings) | Grade-school multiplication, digit by digit | O(m×n) |
| 140 | [Detect Squares](https://leetcode.com/problems/detect-squares/) | HashMap of points; for each query, find valid rectangles | O(n) |

## Bit Manipulation (7)

| # | Problem | Approach | Time |
|---|---|---|---|
| 141 | [Single Number](/dsa/problem/single-number) | XOR all → duplicate cancels, single remains | O(n) |
| 142 | [Number of 1 Bits](/dsa/problem/number-of-1-bits) | `n & (n-1)` removes LSB; count | O(32) |
| 143 | [Counting Bits](/dsa/problem/counting-bits) | `dp[i] = dp[i>>1] + (i&1)` | O(n) |
| 144 | [Reverse Bits](https://leetcode.com/problems/reverse-bits/) | Shift result left + OR with (n&1) + shift n right | O(32) |
| 145 | [Missing Number](/dsa/problem/missing-number) | XOR all indices + all values | O(n) |
| 146 | [Sum of Two Integers](/dsa/problem/sum-of-two-integers) | `carry = (a&b)<<1; sum = a^b` repeat | O(32) |
| 147 | [Reverse Integer](/dsa/problem/reverse-integer) | Pop digits with %10, push to result, check overflow | O(log n) |

## Bonus (3)

| # | Problem | Approach | Time |
|---|---|---|---|
| 148 | [Design Add and Search Words](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | Trie + DFS on wildcards | O(26^L) |
| 149 | [Maximum Product of Word Lengths](/dsa/problem/maximum-product-of-word-lengths) | Bitmask per word, compare pairs with no overlap | O(n²) |
| 150 | [Longest Increasing Subsequence](/dsa/problem/longest-increasing-subsequence) | Patience sort + binary search | O(n log n) |

---

> ✅ **Your progress is saved automatically** in your browser. Check off problems as you solve them - come back anytime and pick up where you left off.

*For full solutions with walkthroughs, check the [DSA section](/dsa). For the shorter version, see [The 75](/the-75).*
