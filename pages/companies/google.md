---
layout: default
title: "Google Interview Prep - System Design, DSA & Googleyness (L4/L5)"
description: "90+ DSA problems asked at Google L4/L5 interviews in 2024-2026. Graphs, DP, Trees, Binary Search. Interview process, Googleyness questions, system design topics."
permalink: /companies/google
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What system design questions are asked at Google?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google commonly asks: Google Docs (collaborative editing), YouTube (video streaming), Key-Value Store, Rate Limiter, URL Shortener, Search Autocomplete, and Web Crawler for system design rounds."
      }
    },
    {
      "@type": "Question",
      "name": "What is Google's SWE interview process for L4?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google L4 process: Online Assessment (GHA) → Recruiter Screen → Phone Screen (45 min DSA) → Onsite: 3 coding rounds + 1 Googleyness round. No system design for L4 in most cases. Hiring committee decides independently."
      }
    }
  ]
}
</script>

# Google Interview Prep (L4 / L5)

Google's SWE interview is purely DSA-focused for L4 (SDE-2 equivalent). L5+ adds system design. The coding bar is higher than most companies — expect medium-hard problems with follow-ups. They evaluate HOW you think, not just whether you get the answer.

---

## Interview Process

### L4 (Software Engineer III)

| Stage | Duration | Focus |
|---|---|---|
| Google Hiring Assessment (GHA) | Online | 2 coding problems (medium) |
| Recruiter Screen | 30 min | Background, level, prep timeline |
| Phone Screen | 45 min | 1-2 DSA problems (medium-hard) |
| Onsite Round 1 | 45 min | Coding (medium-hard) |
| Onsite Round 2 | 45 min | Coding (medium-hard) |
| Onsite Round 3 | 45 min | Coding (hard with follow-ups) |
| Googleyness | 45 min | Behavioral (collaboration, ambiguity) |

**No system design for L4** in most cases. All coding.

### L5 (Senior Software Engineer)

Same as L4 but adds:
- 1 System Design round (45 min)
- Googleyness round focuses on "leading without authority"

---

## HLD Problems Asked at Google

| # | Problem | Difficulty | Link |
|---|---------|-----------|------|
| 1 | Key-Value Store | Beginner | [Read →](/hld/KeyValueStore) |
| 2 | Google Docs (Collaborative Editing) | Advanced | [Read →](/hld/GoogleDocs) |
| 3 | YouTube / Netflix (Video Streaming) | Advanced | [Read →](/hld/Netflix) |
| 4 | Rate Limiter | Beginner | [Read →](/hld/RateLimiter) |
| 5 | URL Shortener | Beginner | [Read →](/hld/URLShortner) |
| 6 | Notification System | Intermediate | [Read →](/hld/NotificationSystem) |
| 7 | News Aggregator (Google News) | Intermediate | [Read →](/hld/NewsAggregator) |

---

## DSA Problems Asked at Google (2024-2026)

### Graphs — Google's #1 Topic (asked in 40%+ of interviews)

| # | Problem | Pattern | Difficulty | Link |
|---|---|---|---|---|
| 1 | Number of Islands | BFS/DFS Grid | Medium | [Solve →](/dsa/problem/number-of-islands) |
| 2 | Word Ladder | BFS Shortest Path | Hard | [Solve →](/dsa/problem/word-ladder) |
| 3 | Course Schedule | Topological Sort | Medium | [Solve →](/dsa/problem/course-schedule) |
| 4 | Course Schedule II | Topological Sort | Medium | [LeetCode →](https://leetcode.com/problems/course-schedule-ii/) |
| 5 | Clone Graph | BFS + HashMap | Medium | [LeetCode →](https://leetcode.com/problems/clone-graph/) |
| 6 | Network Delay Time | Dijkstra | Medium | [Solve →](/dsa/problem/network-delay-time) |
| 7 | Accounts Merge | Union-Find | Medium | [LeetCode →](https://leetcode.com/problems/accounts-merge/) |
| 8 | Alien Dictionary | Topological Sort | Hard | [LeetCode →](https://leetcode.com/problems/alien-dictionary/) |
| 9 | Pacific Atlantic Water Flow | Multi-source DFS | Medium | [LeetCode →](https://leetcode.com/problems/pacific-atlantic-water-flow/) |
| 10 | Shortest Path in Binary Matrix | BFS | Medium | [LeetCode →](https://leetcode.com/problems/shortest-path-in-binary-matrix/) |
| 11 | Minimum Height Trees | Topological BFS | Medium | [LeetCode →](https://leetcode.com/problems/minimum-height-trees/) |
| 12 | Swim in Rising Water | BFS + Heap | Hard | [Solve →](/dsa/problem/swim-in-rising-water) |
| 13 | Critical Connections in Network | Tarjan's (Bridges) | Hard | [LeetCode →](https://leetcode.com/problems/critical-connections-in-a-network/) |
| 14 | Rotting Oranges | Multi-source BFS | Medium | [Solve →](/dsa/problem/rotting-oranges) |
| 15 | Cheapest Flights Within K Stops | BFS / Bellman-Ford | Medium | [LeetCode →](https://leetcode.com/problems/cheapest-flights-within-k-stops/) |
| 16 | Graph Valid Tree | Union-Find / DFS | Medium | [Solve →](/dsa/problem/graph-valid-tree) |
| 17 | Redundant Connection | Union-Find | Medium | [Solve →](/dsa/problem/redundant-connection) |

### Dynamic Programming — Google's #2 Topic

| # | Problem | Pattern | Difficulty | Link |
|---|---|---|---|---|
| 18 | Longest Increasing Subsequence | DP + Binary Search | Medium | [Solve →](/dsa/problem/longest-increasing-subsequence) |
| 19 | Word Break | DP | Medium | [Solve →](/dsa/problem/word-break) |
| 20 | Coin Change | Unbounded Knapsack | Medium | [Solve →](/dsa/problem/coin-change) |
| 21 | Edit Distance | 2D DP | Medium | [Solve →](/dsa/problem/edit-distance) |
| 22 | Unique Paths | Grid DP | Medium | [Solve →](/dsa/problem/unique-paths) |
| 23 | Burst Balloons | Interval DP | Hard | [Solve →](/dsa/problem/burst-balloons) |
| 24 | Decode Ways | Linear DP | Medium | [Solve →](/dsa/problem/decode-ways) |
| 25 | Maximum Product Subarray | DP | Medium | [Solve →](/dsa/problem/maximum-product-subarray) |
| 26 | Longest Common Subsequence | 2D DP | Medium | [Solve →](/dsa/problem/longest-common-subsequence) |
| 27 | Jump Game II | Greedy | Medium | [Solve →](/dsa/problem/jump-game-ii) |
| 28 | Regular Expression Matching | 2D DP | Hard | [Solve →](/dsa/problem/regular-expression-matching) |

### Trees

| # | Problem | Pattern | Difficulty | Link |
|---|---|---|---|---|
| 29 | Binary Tree Maximum Path Sum | DFS | Hard | [Solve →](/dsa/problem/binary-tree-maximum-path-sum) |
| 30 | Serialize and Deserialize Binary Tree | BFS/DFS | Hard | [LeetCode →](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) |
| 31 | Lowest Common Ancestor | DFS | Medium | [LeetCode →](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) |
| 32 | Validate BST | DFS + Range | Medium | [Solve →](/dsa/problem/validate-binary-search-tree) |
| 33 | Binary Tree Level Order Traversal | BFS | Medium | [Solve →](/dsa/problem/binary-tree-level-order-traversal) |
| 34 | Construct Binary Tree from Preorder and Inorder | Recursion | Medium | [LeetCode →](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) |
| 35 | Count Good Nodes | DFS | Medium | [Solve →](/dsa/problem/count-good-nodes-in-binary-tree) |
| 36 | Kth Smallest Element in BST | Inorder | Medium | [Solve →](/dsa/problem/kth-smallest-element-in-a-bst) |

### Binary Search

| # | Problem | Pattern | Difficulty | Link |
|---|---|---|---|---|
| 37 | Search in Rotated Sorted Array | Modified BS | Medium | [Solve →](/dsa/problem/search-in-rotated-sorted-array) |
| 38 | Median of Two Sorted Arrays | Binary Search | Hard | [LeetCode →](https://leetcode.com/problems/median-of-two-sorted-arrays/) |
| 39 | Koko Eating Bananas | BS on Answer | Medium | [Solve →](/dsa/problem/koko-eating-bananas) |
| 40 | Split Array Largest Sum | BS + Greedy | Hard | [LeetCode →](https://leetcode.com/problems/split-array-largest-sum/) |
| 41 | Time Based Key-Value Store | HashMap + BS | Medium | [Solve →](/dsa/problem/time-based-key-value-store) |

### Sliding Window / Two Pointers

| # | Problem | Pattern | Difficulty | Link |
|---|---|---|---|---|
| 42 | Minimum Window Substring | Sliding Window | Hard | [LeetCode →](https://leetcode.com/problems/minimum-window-substring/) |
| 43 | Longest Substring Without Repeating Characters | Sliding Window | Medium | [Solve →](/dsa/problem/longest-substring-without-repeating-characters) |
| 44 | 3Sum | Two Pointers + Sort | Medium | [Solve →](/dsa/problem/3sum) |
| 45 | Container With Most Water | Two Pointers | Medium | [Solve →](/dsa/problem/container-with-most-water) |
| 46 | Trapping Rain Water | Two Pointers / Stack | Hard | [Solve →](/dsa/problem/trapping-rain-water) |
| 47 | Sliding Window Maximum | Monotonic Deque | Hard | [Solve →](/dsa/problem/sliding-window-maximum) |

### Stack / Monotonic Stack

| # | Problem | Pattern | Difficulty | Link |
|---|---|---|---|---|
| 48 | Largest Rectangle in Histogram | Monotonic Stack | Hard | [Solve →](/dsa/problem/largest-rectangle-in-histogram) |
| 49 | Basic Calculator | Stack + Recursion | Hard | [LeetCode →](https://leetcode.com/problems/basic-calculator/) |
| 50 | Daily Temperatures | Monotonic Stack | Medium | [Solve →](/dsa/problem/daily-temperatures) |

### Heap / Priority Queue

| # | Problem | Pattern | Difficulty | Link |
|---|---|---|---|---|
| 51 | Find Median from Data Stream | Two Heaps | Hard | [LeetCode →](https://leetcode.com/problems/find-median-from-data-stream/) |
| 52 | Merge K Sorted Lists | Min-Heap | Hard | [Solve →](/dsa/problem/merge-k-sorted-lists) |
| 53 | Kth Largest Element | QuickSelect / Heap | Medium | [Solve →](/dsa/problem/kth-largest-element-in-an-array) |
| 54 | Top K Frequent Elements | Heap / Bucket Sort | Medium | [Solve →](/dsa/problem/top-k-frequent-elements) |
| 55 | Task Scheduler | Greedy / Heap | Medium | [Solve →](/dsa/problem/task-scheduler) |

### Design (Coding)

| # | Problem | Pattern | Difficulty | Link |
|---|---|---|---|---|
| 56 | LRU Cache | HashMap + DLL | Medium | [Solve →](/dsa/problem/lru-cache) |
| 57 | Implement Trie | Trie | Medium | [Solve →](/dsa/problem/implement-trie-prefix-tree) |
| 58 | Design Search Autocomplete | Trie + Heap | Hard | [LeetCode →](https://leetcode.com/problems/design-search-autocomplete-system/) |
| 59 | Snapshot Array | Binary Search | Medium | [LeetCode →](https://leetcode.com/problems/snapshot-array/) |

### Backtracking

| # | Problem | Pattern | Difficulty | Link |
|---|---|---|---|---|
| 60 | Word Search II | Trie + Backtrack | Hard | [LeetCode →](https://leetcode.com/problems/word-search-ii/) |
| 61 | Permutations | Backtracking | Medium | [Solve →](/dsa/problem/permutations) |
| 62 | Combination Sum | Backtracking | Medium | [Solve →](/dsa/problem/combination-sum) |
| 63 | N-Queens | Backtracking | Hard | [LeetCode →](https://leetcode.com/problems/n-queens/) |
| 64 | Generate Parentheses | Backtracking | Medium | [Solve →](/dsa/problem/generate-parentheses) |

---

## Google-Specific Questions (Actually Asked in 2024-2026)

These are custom/variant problems reported from actual Google interviews:

| # | Problem Description | Pattern | Source |
|---|---|---|---|
| 1 | Binary tree with binary values — count "islands" (connected components of 1s) | Tree DFS | New Grad 2026 |
| 2 | Encode and Decode a directed graph (serialization with cycle handling) | Graph DFS + Serialization | L4 Feb 2025 |
| 3 | Reach target volume with N water jugs (fill/empty/pour operations) | BFS State Space | L4 Feb 2025 |
| 4 | Alice and Bob minimize combined travel cost to a destination (weighted graph) | Dijkstra from multiple sources | L4 Feb 2025 |
| 5 | Find node that when made root converts graph to binary tree (max 3 edges per node) | Tree / Graph | L4 Phone Screen 2025 |
| 6 | Find all critical edges in a connected graph (bridges) | Tarjan's Algorithm | L4 Bangalore 2025 |
| 7 | Minimum health required to reach destination in weighted graph | Graph DP / Dijkstra | L4 Onsite 2025 |
| 8 | Network of teleporters — some broken — find reachable nodes | Graph BFS/DFS | L4 2025 |
| 9 | Given match results determine player rankings (topological sort with full ordering) | Modified Topo Sort | L4 India 2025 |
| 10 | 108 cards (4 sets of 27) — find if 12 cards can split into 4 winning groups of 3 | Backtracking / DP | L4 India 2025 |
| 11 | Find minimum threshold distance for path from source to target in graph | Binary Search + BFS/Dijkstra | L4 India 2025 |
| 12 | Minimum cost to cut all leaf nodes from root (weighted tree edges) | Tree DP | L4 2025 |
| 13 | Alice and Bob share cab — minimize distinct roads crossed | Graph (Steiner Tree variant) | L4 USA 2025 |
| 14 | Find valid path visiting all nodes in undirected graph | Hamiltonian Path / DFS | L4 Cloud 2025 |
| 15 | Predict next word based on given sentences (design API) | Trie / HashMap | L4 MLE India 2025 |
| 16 | Delete storage parts in valid order (no children when deleted) | Topological Sort (Leaf removal) | L4 Hyderabad 2025 |
| 17 | Graph — find path between restricted edges after adding edges one by one | Union-Find / BFS | Off-campus |
| 18 | Post-order DFS traversal with hard follow-up | Tree DFS | L4 Warsaw 2025 |
| 19 | State transition — given initial and final state, check if reachable | BFS/DFS State Space | L4 India 2025 |
| 20 | Routers broadcast within distance d — check if destination gets message | Graph BFS | L3 Oct 2024 |

---

## More Real Questions from Interview Experiences (2023-2026)

Additional specific problems reported by candidates across LeetCode, GeeksforGeeks, and interview blogs. These are the exact variants Google asked (paraphrased):

| # | Problem Description | Pattern | Round |
|---|---|---|---|
| 21 | Find where to cut a rectangular cake so both halves have equal area (return distance as double) | Binary Search on Answer / Geometry | Onsite |
| 22 | Assign patients (arrival + duration) to N rooms, return room that served the most patients | Heap / Interval Scheduling | Onsite Hard |
| 23 | Symbolic algebra: simplify `c-(b-(d+e))` with nested parens and sign flips | Stack Parsing | Onsite |
| 24 | N CPUs, M task durations — find minimum makespan; follow-up: fewest CPUs to still hit it | Heap / Binary Search on Answer | DSA |
| 25 | N×M grid — count unlock-pattern paths of length ≥ L (8 directions, no jumping visited) | Backtracking / DFS | DSA |
| 26 | Sum of distances from each tree node to all others — optimize O(n²) to O(n) | Tree DP (Rerooting) | Onsite |
| 27 | Graph where vertices own intervals, edges connect overlapping ones — count spanning trees | Union-Find / Matrix-Tree | Onsite |
| 28 | Shortest path avoiding a set of forbidden/restricted nodes | Graph / BFS | Onsite |
| 29 | Undirected graph forming one ring — print every ring traversal from each node | Graph / Cycle DFS | Onsite |
| 30 | Water pours from each grid cell — find where it settles (DFS + memo) | Grid DP / Memoized DFS | Onsite |
| 31 | Power propagation through a 3D lattice/cube graph from source nodes to targets | Multi-source BFS (3D) | Onsite |
| 32 | IP-range-to-location file — answer which city a query IP belongs to; batch follow-up | Binary Search / Interval | Coding |
| 33 | Stream of timestamped messages — keep only last 10 time units using a deque | Sliding Window / Deque | Coding |
| 34 | Row of L/R pieces that slide without jumping — can config A transform to target B? | Two Pointers / Greedy | Coding |
| 35 | 12 cards from 108-card deck — can they split into 4 winning groups of 3? | Backtracking / Partition | Coding |
| 36 | Binary tree with 0/1 node values — count connected islands of 1-nodes | Tree DFS | New Grad |
| 37 | Two strings — is there a common cut so prefix(A) + suffix(B) is a palindrome? | String / Palindrome | Phone Screen |
| 38 | Boolean stream data structure: setTrue(i), setFalse(i), setAllTrue(), getIndex(i) optimally | Design / Lazy Propagation | Onsite |
| 39 | Leaderboard: updateEntry(name), getEntryFromRank(rank) efficiently | Design / Order-Statistics Tree | Onsite |
| 40 | Lexicographically smallest subsequence of length exactly k | Greedy / Monotonic Stack | Onsite |
| 41 | Grid of people + bikes — find nearest bike for each person, handle ties | BFS / Grid / Matching | Onsite |
| 42 | Infinite chessboard — min knight moves to (x,y); follow-up adds forbidden cells | Bidirectional BFS | Onsite |
| 43 | Invertible mapping F(x,y)=z and inverse F(z)=(x,y) | Math / Cantor Pairing | Onsite |
| 44 | 1M numbers, many (left,right) queries — max within each range | Sparse Table / Segment Tree | Onsite |
| 45 | Thief crosses room avoiding circular sensors — is a clear path possible? | Union-Find / Geometry | Onsite |
| 46 | Bench of n seats — each arrival picks seat maximizing distance to nearest occupant | Heap / Greedy | Onsite |
| 47 | 0/1 string — min splits so each part is binary of a power of 5 (no leading zeros) | DP (String Partition) | Onsite |
| 48 | I/D pattern — smallest number with non-repeating digits 1-9 following it | Greedy / Stack | Phone Screen |
| 49 | Tree with edge weights, k leaves — min-weight edge deletion so no two leaves connected | Tree DP / Min-Cut | DSA |
| 50 | Flights (src, dst, arrival, departure) — shortest route arriving before deadline | Graph / Dijkstra (time-constrained) | DSA |
| 51 | Ship with fuel K — travel (K-1) or rest (K+1), H mandatory holidays, maximize distance | DP (3D State) | DSA |
| 52 | Read strings from n files — max count of elements shared by at least two files | Hashing / Counting | Coding |
| 53 | Longest substring that appears more than once (longest repeated substring) | Suffix Array / Rolling Hash | Coding |
| 54 | Decode nested encoded string like `3[a2[c]]` into expanded form | Stack / Recursion | Coding |
| 55 | Tree stored as array + indices to erase — remove nodes + descendants in-place | Array / Tree Compaction | Coding |

---

## Google's Favorite Patterns (Ranked by Frequency)

| Rank | Pattern | Frequency | Example Problems |
|---|---|---|---|
| 1 | Graph BFS/DFS | Very High | Islands, Word Ladder, Critical Edges |
| 2 | Dynamic Programming | Very High | LIS, Burst Balloons, Edit Distance |
| 3 | Tree DFS/BFS | High | Max Path Sum, Serialize Tree, LCA |
| 4 | Binary Search (variants) | High | Rotated Array, BS on Answer |
| 5 | Topological Sort | High | Course Schedule, Alien Dictionary, Rankings |
| 6 | Union-Find (DSU) | Medium-High | Accounts Merge, Graph Valid Tree |
| 7 | Sliding Window | Medium | Min Window Substring |
| 8 | Backtracking | Medium | Word Search II, N-Queens |
| 9 | Monotonic Stack | Medium | Histogram, Daily Temperatures |
| 10 | BFS on State Space | Medium | Water Jugs, State Transitions |

**Key insight for Google:** They rarely ask straightforward LeetCode problems. They ask VARIANTS — same pattern but with a twist. If you understand the pattern deeply, you can handle the twist.

---

## Googleyness Questions (Behavioral)

| # | Question |
|---|---|
| 1 | Tell me about a time you disagreed with a teammate. How did you resolve it? |
| 2 | Tell me about a time you had to work with ambiguous requirements. |
| 3 | Tell me about a time you simplified a complex system or process. |
| 4 | Tell me about a time you had to push back on a stakeholder. |
| 5 | Tell me about a time you made a technical decision that turned out to be wrong. What did you do? |
| 6 | Tell me about a time you helped someone on your team grow. |
| 7 | How do you handle disagreements in code reviews? |
| 8 | Tell me about a time you delivered under tight deadlines with incomplete information. |

**For L4:** Focus on collaboration, growth mindset, handling ambiguity.
**For L5:** Focus on leadership without authority, influencing across teams, setting technical direction.

---

## 14-Day Prep Plan (L4)

| Day | Topic | Problems to Solve |
|---|---|---|
| 1 | Arrays + Two Pointers | 3Sum, Container With Most Water, Trapping Rain Water |
| 2 | Sliding Window | Min Window Substring, Longest Substring, Sliding Window Max |
| 3 | Binary Search | Rotated Array, Koko Bananas, Median of Two Arrays |
| 4 | Trees (Part 1) | Validate BST, LCA, Binary Tree Max Path Sum |
| 5 | Trees (Part 2) | Serialize/Deserialize, Level Order, Construct from Preorder |
| 6 | Graphs - BFS/DFS | Number of Islands, Word Ladder, Shortest Path in Matrix |
| 7 | Graphs - Topo Sort + UF | Course Schedule II, Alien Dictionary, Accounts Merge |
| 8 | DP (Part 1) | LIS, Coin Change, Word Break, Edit Distance |
| 9 | DP (Part 2) | Burst Balloons, Unique Paths, Decode Ways |
| 10 | Backtracking + Stack | Permutations, Generate Parens, Largest Rectangle |
| 11 | Heap + Design | Merge K Lists, Find Median, LRU Cache |
| 12 | Google-specific problems | Pick 5 from the "Actually Asked" table above |
| 13 | Revision | Redo 8-10 problems you struggled with |
| 14 | Rest + light review | Review patterns mentally. Sleep early. |

---

## Tips for Google Interviews

1. **Think out loud.** Google evaluates your thought process. Start with brute force, discuss complexity, then optimize. Silence = no signal for the interviewer.
2. **Ask clarifying questions.** "Can the input be empty? Are there negative numbers? Is the graph connected?" Shows maturity.
3. **Handle follow-ups.** Google's style: solve base problem in 15 min → interviewer adds constraints → solve harder version. Prepare for this.
4. **Code on plain text.** Google uses Google Docs (no autocomplete, no syntax highlighting). Practice without IDE.
5. **Edge cases matter.** Empty input, single element, duplicates, overflow. Mention these before the interviewer asks.
6. **Consistency across rounds.** Hiring committee reviews ALL rounds. One great round doesn't save a bad one.
7. **Graphs are mandatory.** If you skip graph prep, you'll likely fail. Google asks graphs more than any other FAANG.

---

## Other Company Prep

- [Amazon Interview Prep →](/companies/amazon)
- [Microsoft Interview Prep →](/companies/microsoft)
- [PhonePe Interview Prep →](/companies/phonpe)
- [Flipkart Interview Prep →](/companies/flipkart)
- [Back to Interview Guide →](/system-design-interview-guide)
