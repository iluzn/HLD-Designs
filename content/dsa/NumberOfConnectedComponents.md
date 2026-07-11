---
layout: default
title: "Number of Connected Components in an Undirected Graph"
description: "Union-Find pattern: count connected components with path compression and union by rank. Trending PhonePe 2025-2026 DSU question."
permalink: /dsa/number-of-connected-components
---

# Number of Connected Components in an Undirected Graph

⚡ **Difficulty:** Medium 🏷️ **Pattern:** Union-Find (DSU) 🏢 **Asked at:** PhonePe (2025-26 trend), Amazon, Google

---

## Problem

You have `n` nodes labeled `0..n-1` and a list of undirected `edges`. Return the number of **connected components**.

**Example:**
```
n = 5, edges = [[0,1],[1,2],[3,4]]  →  2   ({0,1,2} and {3,4})
```

---

## Approach

### Why Union-Find (DSU)

You could DFS/BFS from every unvisited node and count how many times you start (that works, O(V+E)). But when the problem streams edges or asks repeated connectivity queries, **Union-Find** shines: near-O(1) `find` and `union`.

### The mechanics

- Start with `n` components; every node is its own parent.
- For each edge `(a, b)`, `union` them. If they were in **different** sets, the component count drops by one.
- **Path compression** flattens the tree during `find`; **union by rank/size** keeps trees shallow. Together they give near-constant amortized time (inverse Ackermann, α(n)).

---

## Complexity

| | Time | Space |
|---|---|---|
| Union-Find (compression + rank) | O(E · α(n)) ≈ O(E) | O(n) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int countComponents(int n, int[][] edges) {
    int[] parent = new int[n];
    int[] rank = new int[n];
    for (int i = 0; i &lt; n; i++) parent[i] = i;
    int components = n;

    for (int[] e : edges) {
        int ra = find(parent, e[0]), rb = find(parent, e[1]);
        if (ra != rb) {
            if (rank[ra] &lt; rank[rb]) { int t = ra; ra = rb; rb = t; }
            parent[rb] = ra;
            if (rank[ra] == rank[rb]) rank[ra]++;
            components--;
        }
    }
    return components;
}

private int find(int[] parent, int x) {
    while (parent[x] != x) {
        parent[x] = parent[parent[x]];  // path compression
        x = parent[x];
    }
    return x;
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def countComponents(n, edges):
    parent = list(range(n))
    rank = [0] * n

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]   # path compression
            x = parent[x]
        return x

    components = n
    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra != rb:
            if rank[ra] &lt; rank[rb]:
                ra, rb = rb, ra
            parent[rb] = ra
            if rank[ra] == rank[rb]:
                rank[ra] += 1
            components -= 1
    return components</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">vector&lt;int&gt; parent, rnk;

int find(int x) {
    while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
}
int countComponents(int n, vector&lt;vector&lt;int&gt;&gt;&amp; edges) {
    parent.resize(n); rnk.assign(n, 0);
    for (int i = 0; i &lt; n; i++) parent[i] = i;
    int components = n;
    for (auto&amp; e : edges) {
        int ra = find(e[0]), rb = find(e[1]);
        if (ra != rb) {
            if (rnk[ra] &lt; rnk[rb]) swap(ra, rb);
            parent[rb] = ra;
            if (rnk[ra] == rnk[rb]) rnk[ra]++;
            components--;
        }
    }
    return components;
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> Start the component count at `n` and decrement **only when a union actually merges two distinct sets**. Edges within an already-connected component don't change the count. Path compression + union by rank make each operation effectively constant time — that's why DSU beats repeated BFS for dynamic connectivity.

---

## Why PhonePe is asking this now

Multiple 2025-2026 reports show DSU / connected-components questions in PhonePe rounds. They often combine it with graph traversal (e.g., "merge accounts," "redundant connection"). Memorize the compression + rank template — it's copy-paste reusable.

---

## Follow-ups

- **Redundant Connection** → [LC 684](https://leetcode.com/problems/redundant-connection/): the first edge whose endpoints are already unioned is the cycle-closing edge.
- **Accounts Merge** → [LC 721](https://leetcode.com/problems/accounts-merge/): union emails, then group by root.
- **DFS alternative** → Count components by launching DFS from each unvisited node.

---

## Related Problems

- [Redundant Connection](https://leetcode.com/problems/redundant-connection/)
- [Accounts Merge](https://leetcode.com/problems/accounts-merge/)
- [Number of Connected Components (LC 323)](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)

---

*Drop a comment below if you want the Accounts Merge walkthrough 👇*
