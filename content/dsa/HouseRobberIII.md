---
layout: default
title: "House Robber III"
description: "Tree DP pattern: rob a binary tree of houses where you can't rob two directly-linked houses. Post-order DFS returning rob/skip pairs. PhonePe's most-asked problem."
permalink: /dsa/house-robber-iii
---

# House Robber III

⚡ **Difficulty:** Medium 🏷️ **Pattern:** Tree DP (Post-order DFS) 🏢 **Asked at:** PhonePe (most repeated), Amazon, Google

---

## Problem

Houses are arranged as a **binary tree**. Each node holds an amount of money. The rule: you **cannot rob two directly-connected houses** (a parent and its direct child) on the same night, or the alarm trips. Return the maximum money you can rob.

**Example:**
```
     3
    / \
   2   3
    \   \
     3   1

Max = 3 + 3 + 1 = 7   (rob root, skip children, rob the two grandchildren-ish nodes)
```

---

## Approach

### Why the naive recursion is slow

The obvious recursion: for each node, either rob it (then skip children, recurse on grandchildren) or skip it (recurse on children), take the max. This recomputes the same subtrees repeatedly → **O(2^n)**.

### The key insight: return a pair, not a number

Every node has exactly two states. Do a single **post-order DFS** and return **two values** per node:
- `rob`  = max money for this subtree **if we rob this node** = `node.val + left.skip + right.skip`
- `skip` = max money **if we don't rob this node** = `max(left.rob, left.skip) + max(right.rob, right.skip)`

The parent picks whichever child-state is legal. One pass, each node visited once → **O(n)**.

---

## Complexity

| | Time | Space |
|---|---|---|
| DFS returning (rob, skip) | O(n) | O(h) recursion stack |
| Naive recursion | O(2^n) | O(h) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int rob(TreeNode root) {
    int[] res = dfs(root);
    return Math.max(res[0], res[1]);
}

// returns [rob_this, skip_this]
private int[] dfs(TreeNode node) {
    if (node == null) return new int[]{0, 0};
    int[] left = dfs(node.left);
    int[] right = dfs(node.right);
    int rob = node.val + left[1] + right[1];
    int skip = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    return new int[]{rob, skip};
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def rob(root):
    def dfs(node):
        if not node:
            return (0, 0)  # (rob_this, skip_this)
        l = dfs(node.left)
        r = dfs(node.right)
        rob = node.val + l[1] + r[1]
        skip = max(l) + max(r)
        return (rob, skip)
    return max(dfs(root))</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">pair&lt;int,int&gt; dfs(TreeNode* node) {
    if (!node) return {0, 0};              // {rob, skip}
    auto l = dfs(node-&gt;left);
    auto r = dfs(node-&gt;right);
    int rob = node-&gt;val + l.second + r.second;
    int skip = max(l.first, l.second) + max(r.first, r.second);
    return {rob, skip};
}
int rob(TreeNode* root) {
    auto res = dfs(root);
    return max(res.first, res.second);
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> When a tree problem has a per-node binary choice ("take it or leave it") with an adjacency constraint, return a **tuple of states** from the DFS instead of a single number. The parent combines child states legally. This turns exponential recursion into a linear post-order pass — the same trick powers Binary Tree Max Path Sum and Distribute Coins.

---

## Why PhonePe loves this

PhonePe repeatedly asks tree problems where you pick nodes to maximize a score under a "can't pick adjacent" constraint. If you recognize the `(rob, skip)` pair pattern, most of their tree-DP variants collapse into the same shape.

---

## Follow-ups

- **House Robber (linear array)** → [LC 198](https://leetcode.com/problems/house-robber/): same idea, `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`.
- **House Robber II (circular)** → [LC 213](https://leetcode.com/problems/house-robber-ii/): run the linear version twice, excluding first or last house.
- **Make it thread-safe?** → The DFS is read-only on an immutable tree, so it's already safe for concurrent reads.

---

## Related Problems

- [House Robber](https://leetcode.com/problems/house-robber/)
- [House Robber II](https://leetcode.com/problems/house-robber-ii/)
- [Binary Tree Maximum Path Sum](/dsa/binary-tree-maximum-path-sum)
- [Distribute Coins in Binary Tree](/dsa/distribute-coins-in-binary-tree)

---

*Drop a comment below if you want the linear House Robber walkthrough 👇*
