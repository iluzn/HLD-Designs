---
layout: default
title: "Course Schedule"
description: "Topological sort pattern: detect a cycle in a directed dependency graph using Kahn's algorithm (BFS on in-degrees). PhonePe graph question."
permalink: /dsa/course-schedule
---

# Course Schedule

⚡ **Difficulty:** Medium 🏷️ **Pattern:** Topological Sort (Cycle Detection) 🏢 **Asked at:** PhonePe, Amazon, Google, Meta

---

## Problem

There are `numCourses` courses labeled `0..n-1`. `prerequisites[i] = [a, b]` means you must take `b` before `a`. Return `true` if you can finish all courses.

**Example:**
```
numCourses = 2, prerequisites = [[1,0]]        →  true   (0 then 1)
numCourses = 2, prerequisites = [[1,0],[0,1]]  →  false  (cycle)
```

---

## Approach

### Reframe: is there a cycle?

Prerequisites form a **directed graph** (edge `b → a`). You can finish all courses **iff the graph has no cycle**. This is exactly "does a topological ordering exist?"

### Kahn's algorithm (BFS on in-degrees)

1. Compute the **in-degree** (number of prerequisites) of every course.
2. Queue all courses with in-degree 0 — they have no blockers.
3. Repeatedly pop a course, "complete" it, and decrement its neighbors' in-degrees. When a neighbor hits 0, enqueue it.
4. Count completed courses. If the count equals `numCourses`, no cycle exists → `true`. If some courses never reach in-degree 0, they're stuck in a cycle → `false`.

---

## Complexity

| | Time | Space |
|---|---|---|
| Kahn's BFS | O(V + E) | O(V + E) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public boolean canFinish(int numCourses, int[][] prerequisites) {
    List&lt;List&lt;Integer&gt;&gt; graph = new ArrayList&lt;&gt;();
    for (int i = 0; i &lt; numCourses; i++) graph.add(new ArrayList&lt;&gt;());
    int[] indegree = new int[numCourses];

    for (int[] p : prerequisites) {
        graph.get(p[1]).add(p[0]);   // b -&gt; a
        indegree[p[0]]++;
    }

    Queue&lt;Integer&gt; q = new LinkedList&lt;&gt;();
    for (int i = 0; i &lt; numCourses; i++)
        if (indegree[i] == 0) q.add(i);

    int done = 0;
    while (!q.isEmpty()) {
        int course = q.poll();
        done++;
        for (int next : graph.get(course))
            if (--indegree[next] == 0) q.add(next);
    }
    return done == numCourses;
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">from collections import deque

def canFinish(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    indegree = [0] * numCourses
    for a, b in prerequisites:
        graph[b].append(a)
        indegree[a] += 1

    q = deque(i for i in range(numCourses) if indegree[i] == 0)
    done = 0
    while q:
        course = q.popleft()
        done += 1
        for nxt in graph[course]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                q.append(nxt)
    return done == numCourses</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">bool canFinish(int numCourses, vector&lt;vector&lt;int&gt;&gt;&amp; prerequisites) {
    vector&lt;vector&lt;int&gt;&gt; graph(numCourses);
    vector&lt;int&gt; indegree(numCourses, 0);
    for (auto&amp; p : prerequisites) {
        graph[p[1]].push_back(p[0]);
        indegree[p[0]]++;
    }

    queue&lt;int&gt; q;
    for (int i = 0; i &lt; numCourses; i++)
        if (indegree[i] == 0) q.push(i);

    int done = 0;
    while (!q.empty()) {
        int course = q.front(); q.pop();
        done++;
        for (int nxt : graph[course])
            if (--indegree[nxt] == 0) q.push(nxt);
    }
    return done == numCourses;
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> Whenever a problem says "X must come before Y," think **directed graph + topological sort**. Kahn's algorithm doubles as cycle detection: if you can't process every node (some in-degree never reaches 0), a cycle exists. This is the same engine behind build systems and task schedulers.

---

## Follow-ups

- **Return the actual order** → [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/): collect nodes as you pop them.
- **DFS alternative** → Three-color DFS (white/gray/black); a back edge to a gray node means a cycle.
- **Alien Dictionary** → Build the graph from letter orderings, then topo-sort.

---

## Related Problems

- [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)
- [Alien Dictionary](https://leetcode.com/problems/alien-dictionary/)
- [Course Schedule (LC 207)](https://leetcode.com/problems/course-schedule/)

---

*Drop a comment below if you want the DFS three-color version 👇*
