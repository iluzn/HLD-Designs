---
permalink: /dsa-fundamentals/
layout: default
title: "DSA Fundamentals — 12 Patterns for Coding Interviews"
description: "The core DSA patterns, how to recognize them, complexity analysis, and a framework for solving any coding interview problem."
---

# DSA Fundamentals

The concepts and patterns you need before solving problems. This isn't a data-structures textbook — it's a practical guide to recognizing patterns, choosing the right approach, and communicating clearly during an interview.

---

## The Problem-Solving Framework

Every coding interview answer follows this structure. Practice it until it's muscle memory.

| Step | What you do | Time |
|---|---|---|
| 1. **Clarify** | Repeat the problem. Ask about edge cases, constraints, input size. | 2 min |
| 2. **Examples** | Work through 1-2 small examples by hand. Find the pattern. | 3 min |
| 3. **Brute force** | State the naive approach and its complexity. | 1 min |
| 4. **Optimize** | Identify the bottleneck. Can you trade space for time? Is there a pattern? | 3-5 min |
| 5. **Code** | Write clean code. Name variables well. Handle edges. | 15-20 min |
| 6. **Test** | Walk through your code with the example. Try an edge case. | 3-5 min |

**The silent killer:** Jumping to code at step 1. Interviewers want to see your thought process in steps 2-4. Narrate out loud.

---

## Time & Space Complexity

### Big-O Cheat Sheet

| Complexity | Name | Example | Gut feel at n=10^6 |
|---|---|---|---|
| O(1) | Constant | HashMap get, array index | Instant |
| O(log n) | Logarithmic | Binary search, balanced BST | ~20 ops |
| O(n) | Linear | Array scan, hash table build | 10^6 ops, fast |
| O(n log n) | Linearithmic | Merge sort, sort-then-search | ~20M ops, fine |
| O(n²) | Quadratic | Nested loops, brute-force pairs | 10^12 ops — TLE |
| O(2^n) | Exponential | All subsets, recursive fib | Forget it beyond n=25 |

### Constraint → Complexity mapping

This is how you decide your approach before writing code:

| Input size (n) | Max acceptable complexity |
|---|---|
| n ≤ 10 | O(n!) — brute force ok |
| n ≤ 20 | O(2^n) — bitmask DP |
| n ≤ 500 | O(n³) — triple nested loops |
| n ≤ 5000 | O(n²) — double nested loops |
| n ≤ 10^5 | O(n log n) — sort + binary search |
| n ≤ 10^6 | O(n) — linear pass, hash maps |
| n ≤ 10^8 | O(n) barely, prefer O(log n) or O(1) |

---

## Core Data Structures

### Array / List

- **Access:** O(1) by index
- **Search:** O(n) unsorted, O(log n) sorted (binary search)
- **Insert/Delete:** O(n) at arbitrary position (shift), O(1) at end
- **When:** random access, iteration, cache-friendly operations

### HashMap / HashSet

- **Put/Get/Contains:** O(1) average, O(n) worst (hash collisions)
- **When:** need O(1) lookup by key, dedup, frequency counting
- **Key insight:** "Can I solve this with a lookup table?" → probably HashMap

### Stack

- **Push/Pop/Peek:** O(1)
- **When:** matching parentheses, next-greater-element, undo, DFS
- **Pattern signal:** "last in, first out" or "nearest previous/next"

### Queue / Deque

- **Enqueue/Dequeue:** O(1)
- **When:** BFS, sliding window max, level-order traversal
- **Pattern signal:** "first in, first out" or "process in order"

### Heap / Priority Queue

- **Insert:** O(log n)
- **Extract min/max:** O(log n)
- **Peek min/max:** O(1)
- **When:** "top K," "kth largest," merge K sorted lists, Dijkstra
- **Pattern signal:** "repeatedly pick the smallest/largest from a changing set"

### Binary Search Tree / TreeMap

- **All ops:** O(log n) for balanced BST
- **When:** sorted order + fast insert/delete, range queries, floor/ceiling
- **In Java:** `TreeMap`, `TreeSet`

### Trie

- **Insert/Search:** O(word length)
- **When:** prefix matching, autocomplete, word search in grid
- **Pattern signal:** "common prefix" or "dictionary lookup"

### Graph (adjacency list / matrix)

- **When:** relationships between entities, shortest path, connectivity, cycles
- **Traversal:** BFS (shortest in unweighted), DFS (explore all paths, cycles)

---

## The 12 Core Patterns

Almost every interview problem maps to one of these patterns. Learn to recognize the trigger.

### 1. Two Pointers

**Trigger:** sorted array, find a pair that satisfies a condition, or shrink search space from both ends.

**Examples:** Two Sum (sorted), Container With Most Water, Remove Duplicates, 3Sum.

```
left = 0, right = n-1
while left < right:
    if condition met: record answer
    elif too small: left++
    else: right--
```

### 2. Sliding Window

**Trigger:** contiguous subarray/substring with a constraint (max length, sum ≤ K, at most K distinct chars).

**Examples:** Longest Substring Without Repeating Characters, Minimum Window Substring, Maximum Sum Subarray of Size K.

```
left = 0
for right in range(n):
    expand window by adding arr[right]
    while window violates constraint:
        shrink from left
    update answer
```

### 3. Binary Search

**Trigger:** sorted data, or "find minimum X such that f(X) is true" (monotonic predicate).

**Examples:** Search in Rotated Array, Find Peak, Koko Eating Bananas, Capacity to Ship Packages.

```
lo, hi = min_possible, max_possible
while lo < hi:
    mid = (lo + hi) / 2
    if feasible(mid): hi = mid
    else: lo = mid + 1
return lo
```

### 4. BFS / Level-order

**Trigger:** shortest path in unweighted graph, level-by-level processing, "minimum steps."

**Examples:** Number of Islands, Word Ladder, Shortest Path in Binary Matrix, Rotting Oranges.

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">

<pre><code class="language-java">Queue&lt;int[]&gt; queue = new ArrayDeque&lt;&gt;();
Set&lt;Integer&gt; visited = new HashSet&lt;&gt;();
queue.offer(new int[]{start});
visited.add(start);

while (!queue.isEmpty()) {
    int[] node = queue.poll();
    for (int neighbor : adj(node)) {
        if (visited.add(neighbor)) {
            queue.offer(new int[]{neighbor});
        }
    }
}</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-python">from collections import deque
queue = deque([start])
visited = {start}

while queue:
    node = queue.popleft()
    for neighbor in adj(node):
        if neighbor not in visited:
            visited.add(neighbor)
            queue.append(neighbor)</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-cpp">queue&lt;int&gt; q;
unordered_set&lt;int&gt; visited;
q.push(start);
visited.insert(start);

while (!q.empty()) {
    int node = q.front(); q.pop();
    for (int neighbor : adj(node)) {
        if (!visited.count(neighbor)) {
            visited.insert(neighbor);
            q.push(neighbor);
        }
    }
}</code></pre>

</div>
</div>

### 5. DFS / Backtracking

**Trigger:** "find all combinations/permutations," "explore all paths," cycle detection, connected components.

**Examples:** Subsets, Permutations, N-Queens, Word Search, Course Schedule (cycle).

<pre><code>def backtrack(state):
    if base_case: record answer; return
    for choice in choices:
        make choice
        backtrack(next_state)
        undo choice  # backtrack</code></pre>

### 6. Dynamic Programming

**Trigger:** overlapping subproblems + optimal substructure. "Count ways," "minimum cost," "maximum value." Often starts with recursion + memoization, then converts to tabulation.

**Examples:** Climbing Stairs, Coin Change, Longest Increasing Subsequence, Edit Distance, Knapsack.

**Approach:**
1. Define state: what changes between subproblems?
2. Define recurrence: `dp[i] = ...`
3. Base case
4. Fill order (bottom-up) or memoize (top-down)
5. Return `dp[final_state]`

### 7. Greedy

**Trigger:** locally optimal choice leads to globally optimal. Usually involves sorting first, then making irrevocable choices.

**Examples:** Activity Selection, Jump Game, Merge Intervals, Task Scheduler.

**Key check:** Can you prove the greedy choice doesn't eliminate a better solution? If yes → greedy works.

### 8. Monotonic Stack

**Trigger:** "next greater element," "previous smaller," "largest rectangle in histogram."

**Examples:** Daily Temperatures, Next Greater Element, Trapping Rain Water, Largest Rectangle.

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">

<pre><code class="language-java">Deque&lt;Integer&gt; stack = new ArrayDeque&lt;&gt;();
int[] result = new int[n];
for (int i = 0; i &lt; n; i++) {
    while (!stack.isEmpty() &amp;&amp; arr[stack.peek()] &lt; arr[i]) {
        int idx = stack.pop();
        result[idx] = arr[i]; // arr[i] is the next greater for arr[idx]
    }
    stack.push(i);
}</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-python">stack = []
result = [0] * n
for i in range(n):
    while stack and arr[stack[-1]] &lt; arr[i]:
        idx = stack.pop()
        result[idx] = arr[i]  # arr[i] is next greater for arr[idx]
    stack.append(i)</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-cpp">stack&lt;int&gt; st;
vector&lt;int&gt; result(n, 0);
for (int i = 0; i &lt; n; i++) {
    while (!st.empty() &amp;&amp; arr[st.top()] &lt; arr[i]) {
        int idx = st.top(); st.pop();
        result[idx] = arr[i];
    }
    st.push(i);
}</code></pre>

</div>
</div>

### 9. Union-Find (Disjoint Set)

**Trigger:** "connected components," "are X and Y in the same group?", "merge groups."

**Examples:** Number of Connected Components, Accounts Merge, Redundant Connection.

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">

<pre><code class="language-java">int[] parent = new int[n];
int[] rank = new int[n];
for (int i = 0; i &lt; n; i++) parent[i] = i;

int find(int x) {
    if (parent[x] != x) parent[x] = find(parent[x]);
    return parent[x];
}
void union(int x, int y) {
    int px = find(x), py = find(y);
    if (px == py) return;
    if (rank[px] &lt; rank[py]) parent[px] = py;
    else if (rank[px] &gt; rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
}</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-python">parent = list(range(n))
rank = [0] * n

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(x, y):
    px, py = find(x), find(y)
    if px == py: return
    if rank[px] &lt; rank[py]: parent[px] = py
    elif rank[px] &gt; rank[py]: parent[py] = px
    else: parent[py] = px; rank[px] += 1</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-cpp">vector&lt;int&gt; parent(n), rank_(n, 0);
iota(parent.begin(), parent.end(), 0);

int find(int x) {
    if (parent[x] != x) parent[x] = find(parent[x]);
    return parent[x];
}
void unite(int x, int y) {
    int px = find(x), py = find(y);
    if (px == py) return;
    if (rank_[px] &lt; rank_[py]) parent[px] = py;
    else if (rank_[px] &gt; rank_[py]) parent[py] = px;
    else { parent[py] = px; rank_[px]++; }
}</code></pre>

</div>
</div>

### 10. Topological Sort

**Trigger:** dependencies between tasks, "can I finish all courses?", "order of compilation."

**Examples:** Course Schedule, Alien Dictionary, Build Order.

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">

<pre><code class="language-java">int[] inDegree = new int[n];
for (int[] edge : edges) inDegree[edge[1]]++;

Queue&lt;Integer&gt; queue = new ArrayDeque&lt;&gt;();
for (int i = 0; i &lt; n; i++) if (inDegree[i] == 0) queue.offer(i);

List&lt;Integer&gt; order = new ArrayList&lt;&gt;();
while (!queue.isEmpty()) {
    int node = queue.poll();
    order.add(node);
    for (int neighbor : adj.get(node)) {
        if (--inDegree[neighbor] == 0) queue.offer(neighbor);
    }
}
if (order.size() != n) { /* cycle exists */ }</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-python">from collections import deque
in_degree = [0] * n
for u, v in edges:
    in_degree[v] += 1

queue = deque(i for i in range(n) if in_degree[i] == 0)
order = []
while queue:
    node = queue.popleft()
    order.append(node)
    for neighbor in adj[node]:
        in_degree[neighbor] -= 1
        if in_degree[neighbor] == 0:
            queue.append(neighbor)

if len(order) != n:  # cycle exists
    pass</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-cpp">vector&lt;int&gt; inDegree(n, 0);
for (auto&amp; [u, v] : edges) inDegree[v]++;

queue&lt;int&gt; q;
for (int i = 0; i &lt; n; i++) if (inDegree[i] == 0) q.push(i);

vector&lt;int&gt; order;
while (!q.empty()) {
    int node = q.front(); q.pop();
    order.push_back(node);
    for (int neighbor : adj[node]) {
        if (--inDegree[neighbor] == 0) q.push(neighbor);
    }
}
if (order.size() != n) { /* cycle exists */ }</code></pre>

</div>
</div>

### 11. Trie

**Trigger:** prefix-based operations, autocomplete, "word exists in dictionary," word search in grid.

**Examples:** Implement Trie, Word Search II, Design Search Autocomplete.

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">

<pre><code class="language-java">class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd;
}

class Trie {
    TrieNode root = new TrieNode();

    void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null)
                node.children[c - 'a'] = new TrieNode();
            node = node.children[c - 'a'];
        }
        node.isEnd = true;
    }

    boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) return false;
            node = node.children[c - 'a'];
        }
        return node.isEnd;
    }
}</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-python">class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, word):
        node = self.root
        for c in word:
            if c not in node.children: return False
            node = node.children[c]
        return node.is_end</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-cpp">struct TrieNode {
    TrieNode* children[26] = {};
    bool isEnd = false;
};

class Trie {
    TrieNode* root = new TrieNode();
public:
    void insert(string word) {
        auto node = root;
        for (char c : word) {
            if (!node-&gt;children[c - 'a'])
                node-&gt;children[c - 'a'] = new TrieNode();
            node = node-&gt;children[c - 'a'];
        }
        node-&gt;isEnd = true;
    }
    bool search(string word) {
        auto node = root;
        for (char c : word) {
            if (!node-&gt;children[c - 'a']) return false;
            node = node-&gt;children[c - 'a'];
        }
        return node-&gt;isEnd;
    }
};</code></pre>

</div>
</div>

### 12. Intervals

**Trigger:** merge overlapping intervals, find free slots, meeting rooms, insert interval.

**Examples:** Merge Intervals, Meeting Rooms II, Insert Interval, Non-Overlapping Intervals.

**Approach:** Sort by start time. Then merge/scan in one pass.

---

## Complexity Analysis — How to Explain It

In interviews, always state time AND space complexity. Use this template:

> "Time is O(n log n) — we sort once (n log n) then do a single linear pass (n). The sort dominates. Space is O(n) for the output list; if we can sort in-place, space is O(1) excluding output."

Common mistakes:
- Forgetting to count recursive call stack as space.
- Saying O(n) when there's a nested loop (check: is the inner loop bounded by a constant or by n?).
- Ignoring amortized cost (ArrayList resize, Union-Find path compression).

---

## Java-Specific Tips for DSA Interviews

<pre><code class="language-java">// Sorting
Arrays.sort(arr);                            // primitives: dual-pivot quicksort O(n log n)
list.sort(Comparator.comparingInt(a -&gt; a));   // objects: TimSort (stable)

// HashMap tricks
map.getOrDefault(key, 0);
map.merge(key, 1, Integer::sum);             // increment counter
map.computeIfAbsent(key, k -&gt; new ArrayList&lt;&gt;()).add(value);

// PriorityQueue (min-heap by default)
PriorityQueue&lt;int[]&gt; pq = new PriorityQueue&lt;&gt;((a,b) -&gt; a[0] - b[0]);

// Deque for BFS
Deque&lt;Integer&gt; queue = new ArrayDeque&lt;&gt;();

// StringBuilder for string manipulation
StringBuilder sb = new StringBuilder();
sb.append(c); sb.reverse(); sb.toString();

// Bit manipulation
x &amp; (x - 1);    // remove lowest set bit
x &amp; (-x);       // isolate lowest set bit
Integer.bitCount(x);</code></pre>

---

## How to Practice Effectively

1. **Pattern-first, not problem-first.** Learn the pattern → solve 3-5 problems that use it → move on.
2. **Time yourself.** Give each problem 25 min. If stuck at 15 min, look at the approach (not the code) and try again.
3. **Explain out loud.** If you can't explain your approach in plain English, you'll freeze in the interview.
4. **Review after solving.** "Was there a simpler approach? Can I reduce space? What if n was 10×?"
5. **Spaced repetition.** Solve, wait 3 days, re-solve without looking. The ones you forget are the ones to drill.

**Target:** 100-150 problems across the 12 patterns, 2-3 problems solved per day, 6-8 weeks.

---

## Common Mistakes in DSA Interviews

| Mistake | Fix |
|---|---|
| Jumping to code without thinking | Always state brute force + optimization BEFORE coding |
| Not clarifying constraints | Ask: "what's the range of n?" — it determines your approach |
| Off-by-one errors in binary search | Use `lo < hi` with `hi = mid` (not mid-1) for left-boundary templates |
| Forgetting edge cases | Empty input, single element, all same, max int overflow |
| Not testing with examples | Dry-run your code on the given example before saying "done" |
| Using wrong data structure | If you're doing `list.contains(x)` in a loop → use a HashSet |
| Not communicating | Silence for 5+ minutes = the interviewer assumes you're stuck |

---

*Ready to practice? Head to the [DSA problems](/dsa) section (coming soon) or review [LLD fundamentals](/lld-fundamentals) for machine-coding prep.*
