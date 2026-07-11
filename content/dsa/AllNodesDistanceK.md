---
layout: default
title: "All Nodes Distance K in Binary Tree"
description: "Tree-to-graph pattern: find all nodes exactly K edges from a target. Build parent pointers, then BFS outward. PhonePe OA favorite."
permalink: /dsa/all-nodes-distance-k
---

# All Nodes Distance K in Binary Tree

⚡ **Difficulty:** Medium 🏷️ **Pattern:** Tree → Graph + BFS 🏢 **Asked at:** PhonePe (OA), Amazon, Meta

---

## Problem

Given a binary tree, a `target` node, and an integer `k`, return the values of all nodes that are **exactly `k` edges** away from the target. The distance can go up (through parents) as well as down.

**Example:**
```
        3
       / \
      5   1
     / \  / \
    6  2 0   8
      / \
     7   4

target = 5, k = 2  →  [7, 4, 1]
```

---

## Approach

### The core problem: trees only point down

A binary tree node knows its children but **not its parent**. Distance `k` can go upward, so we need to travel in all three directions (left, right, up).

### Step 1 — turn the tree into a graph

Do one DFS to record each node's **parent** in a hash map. Now every node effectively has up to 3 neighbors.

### Step 2 — BFS from the target

Standard multi-directional BFS. Push the target, expand level by level, and stop after `k` levels. All nodes on that frontier are the answer. Track visited nodes so BFS doesn't bounce back.

---

## Complexity

| | Time | Space |
|---|---|---|
| Build parents + BFS | O(n) | O(n) for parent map + visited |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public List&lt;Integer&gt; distanceK(TreeNode root, TreeNode target, int k) {
    Map&lt;TreeNode, TreeNode&gt; parent = new HashMap&lt;&gt;();
    buildParents(root, null, parent);

    Queue&lt;TreeNode&gt; q = new LinkedList&lt;&gt;();
    Set&lt;TreeNode&gt; seen = new HashSet&lt;&gt;();
    q.add(target); seen.add(target);
    int dist = 0;

    while (!q.isEmpty()) {
        if (dist == k) {
            List&lt;Integer&gt; res = new ArrayList&lt;&gt;();
            for (TreeNode n : q) res.add(n.val);
            return res;
        }
        int size = q.size();
        for (int i = 0; i &lt; size; i++) {
            TreeNode n = q.poll();
            for (TreeNode nb : new TreeNode[]{n.left, n.right, parent.get(n)}) {
                if (nb != null &amp;&amp; seen.add(nb)) q.add(nb);
            }
        }
        dist++;
    }
    return new ArrayList&lt;&gt;();
}

private void buildParents(TreeNode node, TreeNode par, Map&lt;TreeNode, TreeNode&gt; parent) {
    if (node == null) return;
    parent.put(node, par);
    buildParents(node.left, node, parent);
    buildParents(node.right, node, parent);
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">from collections import deque

def distanceK(root, target, k):
    parent = {}
    def build(node, par):
        if not node: return
        parent[node] = par
        build(node.left, node)
        build(node.right, node)
    build(root, None)

    q = deque([target])
    seen = {target}
    dist = 0
    while q:
        if dist == k:
            return [n.val for n in q]
        for _ in range(len(q)):
            n = q.popleft()
            for nb in (n.left, n.right, parent[n]):
                if nb and nb not in seen:
                    seen.add(nb)
                    q.append(nb)
        dist += 1
    return []</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">vector&lt;int&gt; distanceK(TreeNode* root, TreeNode* target, int k) {
    unordered_map&lt;TreeNode*, TreeNode*&gt; parent;
    function&lt;void(TreeNode*, TreeNode*)&gt; build = [&amp;](TreeNode* n, TreeNode* p) {
        if (!n) return;
        parent[n] = p;
        build(n-&gt;left, n); build(n-&gt;right, n);
    };
    build(root, nullptr);

    queue&lt;TreeNode*&gt; q; q.push(target);
    unordered_set&lt;TreeNode*&gt; seen{target};
    int dist = 0;
    while (!q.empty()) {
        if (dist == k) {
            vector&lt;int&gt; res;
            while (!q.empty()) { res.push_back(q.front()-&gt;val); q.pop(); }
            return res;
        }
        int sz = q.size();
        for (int i = 0; i &lt; sz; i++) {
            TreeNode* n = q.front(); q.pop();
            for (TreeNode* nb : {n-&gt;left, n-&gt;right, parent[n]})
                if (nb &amp;&amp; !seen.count(nb)) { seen.insert(nb); q.push(nb); }
        }
        dist++;
    }
    return {};
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> Any "distance in all directions from a node" tree problem becomes trivial once you add **parent pointers** — the tree turns into an undirected graph and plain BFS finds the K-th frontier. The tree-to-graph conversion is the whole trick.

---

## Follow-ups

- **No extra parent map allowed?** → A single DFS can compute the answer by returning the distance from target found in a subtree, but it's fiddlier than BFS.
- **Return distance ≤ k instead of == k?** → Collect every frontier during BFS instead of only the k-th.

---

## Related Problems

- [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) (multi-source BFS)
- [All Nodes Distance K (LC 863)](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/)

---

*Drop a comment below if you want the DFS-only version 👇*
