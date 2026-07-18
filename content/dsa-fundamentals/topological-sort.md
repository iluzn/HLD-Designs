---
permalink: /dsa-fundamentals/topological-sort/
layout: default
title: "Topological Sort - DSA Fundamentals"
description: "Complete guide to topological sort: Kahn's BFS algorithm, DFS-based approach, cycle detection in DAGs. Code in Python/Java/C++/JavaScript with practice problems."
hide_toc: false
---

# Topological Sort

**The pattern:** Given a directed acyclic graph (DAG), produce a linear ordering of nodes such that for every directed edge u → v, node u comes before v. Think of it as scheduling tasks with dependencies — you can't start a task until all its prerequisites are done.

**Why this matters in interviews:** Topological sort appears in course scheduling, build systems, dependency resolution, and task ordering. The two approaches (Kahn's BFS and DFS) also double as cycle detectors for directed graphs.

---

## When to Recognize It

- The problem has **dependencies** or **prerequisites** (task A must come before task B)
- You need a **valid ordering** of tasks or courses
- You need to **detect if the ordering is possible** (no cycles)
- Keywords: "prerequisites," "ordering," "schedule," "dependency," "course schedule"
- The graph is **directed** and you need to check if it's a DAG

---

## How It Works

**Kahn's Algorithm (BFS):** Start with all nodes that have no incoming edges (indegree = 0). Process them, remove their outgoing edges, and find new zero-indegree nodes. Repeat until all nodes are processed (valid order) or you get stuck (cycle exists).

```mermaid
flowchart LR
    A["Course 0: no prereqs"]:::client
    B["Course 1: needs 0"]:::service
    C["Course 2: needs 0"]:::service
    D["Course 3: needs 1 and 2"]:::data

    A --> B
    A --> C
    B --> D
    C --> D

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

**Valid orderings:** [0, 1, 2, 3] or [0, 2, 1, 3] — both are correct because the dependency constraints are satisfied.

**Cycle detection:** If Kahn's processes fewer than n nodes, there's a cycle (some nodes have indegree that never reaches 0).

---

## Template Code

### Code

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Python</button>
<button class="tab-btn">Java</button>
<button class="tab-btn">C++</button>
<button class="tab-btn">JavaScript</button>
</div>
<div class="tab-content active">

<pre><code class="language-python">from collections import deque

def topological_sort_kahn(n, edges):
    """Kahn's BFS-based topological sort."""
    graph = [[] for _ in range(n)]
    indegree = [0] * n

    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1

    # Start with zero-indegree nodes
    queue = deque([i for i in range(n) if indegree[i] == 0])
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    if len(order) == n:
        return order  # valid topological order
    return []  # cycle exists

# DFS-based topological sort
def topological_sort_dfs(n, edges):
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)

    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * n
    order = []
    has_cycle = False

    def dfs(node):
        nonlocal has_cycle
        color[node] = GRAY
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                has_cycle = True
                return
            if color[neighbor] == WHITE:
                dfs(neighbor)
        color[node] = BLACK
        order.append(node)

    for i in range(n):
        if color[i] == WHITE:
            dfs(i)

    if has_cycle:
        return []
    return order[::-1]  # reverse post-order = topo order</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-java">// Kahn's BFS topological sort
List&lt;Integer&gt; topoSortKahn(int n, int[][] edges) {
    List&lt;List&lt;Integer&gt;&gt; graph = new ArrayList&lt;&gt;();
    int[] indegree = new int[n];
    for (int i = 0; i &lt; n; i++) graph.add(new ArrayList&lt;&gt;());

    for (int[] e : edges) {
        graph.get(e[0]).add(e[1]);
        indegree[e[1]]++;
    }

    Queue&lt;Integer&gt; queue = new LinkedList&lt;&gt;();
    for (int i = 0; i &lt; n; i++) {
        if (indegree[i] == 0) queue.offer(i);
    }

    List&lt;Integer&gt; order = new ArrayList&lt;&gt;();
    while (!queue.isEmpty()) {
        int node = queue.poll();
        order.add(node);
        for (int nb : graph.get(node)) {
            if (--indegree[nb] == 0) queue.offer(nb);
        }
    }
    return order.size() == n ? order : new ArrayList&lt;&gt;();
}</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-cpp">vector&lt;int&gt; topoSortKahn(int n, vector&lt;vector&lt;int&gt;&gt;&amp; edges) {
    vector&lt;vector&lt;int&gt;&gt; graph(n);
    vector&lt;int&gt; indegree(n, 0);

    for (auto&amp; e : edges) {
        graph[e[0]].push_back(e[1]);
        indegree[e[1]]++;
    }

    queue&lt;int&gt; q;
    for (int i = 0; i &lt; n; i++) {
        if (indegree[i] == 0) q.push(i);
    }

    vector&lt;int&gt; order;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        order.push_back(node);
        for (int nb : graph[node]) {
            if (--indegree[nb] == 0) q.push(nb);
        }
    }
    return order.size() == n ? order : vector&lt;int&gt;{};
}</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-javascript">function topoSortKahn(n, edges) {
    const graph = Array.from({length: n}, () =&gt; []);
    const indegree = new Array(n).fill(0);

    for (const [u, v] of edges) {
        graph[u].push(v);
        indegree[v]++;
    }

    const queue = [];
    for (let i = 0; i &lt; n; i++) {
        if (indegree[i] === 0) queue.push(i);
    }

    const order = [];
    let idx = 0;
    while (idx &lt; queue.length) {
        const node = queue[idx++];
        order.push(node);
        for (const nb of graph[node]) {
            if (--indegree[nb] === 0) queue.push(nb);
        }
    }
    return order.length === n ? order : [];
}</code></pre>

</div>
</div>

---

## Variations

### Course Schedule (Can You Finish?)

Just check if topological sort produces all n nodes. If not, there's a cycle (impossible to finish).

### Course Schedule II (Return the Order)

Same as Kahn's — return the order if valid, empty if cycle detected.

### Alien Dictionary

Build a graph from the ordering implied by the sorted word list. Characters are nodes, orderings between characters are directed edges. Run topological sort to find the alphabet order.

---

## Complexity

| Algorithm | Time | Space |
|---|---|---|
| Kahn's BFS | O(V + E) | O(V + E) |
| DFS-based | O(V + E) | O(V + E) |

Both are equally efficient. Kahn's is often preferred in interviews because it naturally counts processed nodes (easy cycle detection) and is iterative (no stack overflow risk).

---

## Common Mistakes

- **Applying topological sort to undirected graphs** — topo sort only makes sense for directed graphs. Undirected graphs don't have a "before/after" relationship.
- **Forgetting to detect cycles** — if you don't check `len(order) == n`, you might return a partial order for a graph with a cycle
- **Getting the DFS direction wrong** — in DFS-based topo sort, you append AFTER visiting all neighbors (post-order), then reverse at the end
- **Not handling disconnected components** — always iterate over ALL nodes as starting points, not just node 0

---

## Practice Problems

- [Course Schedule](/dsa/problem/course-schedule)
- [Course Schedule II](/dsa/problem/course-schedule-ii)
- [Alien Dictionary](/dsa/problem/alien-dictionary)
- [Minimum Height Trees](/dsa/problem/minimum-height-trees)

---

## Key Takeaways

- Topological sort = schedule tasks respecting dependencies. It only works on DAGs (directed acyclic graphs).
- Kahn's algorithm: repeatedly remove zero-indegree nodes. If you can't remove all n nodes, there's a cycle.
- DFS approach: reverse post-order traversal. Detect cycles via gray (in-progress) node visits.
- Both run in O(V + E) — choose based on preference. Kahn's is more intuitive for most people.
