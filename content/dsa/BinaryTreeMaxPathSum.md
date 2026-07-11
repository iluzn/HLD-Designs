---
layout: default
title: "Binary Tree Maximum Path Sum"
description: "Tree DFS pattern: find the max-sum path between any two nodes. Track a global max while returning the best downward gain. PhonePe hard tree favorite."
permalink: /dsa/binary-tree-maximum-path-sum
---

# Binary Tree Maximum Path Sum

⚡ **Difficulty:** Hard 🏷️ **Pattern:** Tree DFS (Global Max) 🏢 **Asked at:** PhonePe, Amazon, Meta, Google

---

## Problem

A **path** is any sequence of connected nodes; it does **not** need to pass through the root and cannot reuse a node. Return the maximum sum over all possible paths.

**Example:**
```
   -10
   /  \
  9   20
      / \
    15   7

Max path = 15 + 20 + 7 = 42
```

---

## Approach

### Two different quantities

At each node you must distinguish:
1. **Gain to pass upward** — a path can only extend to a parent through **one** child, so the upward contribution is `node.val + max(leftGain, rightGain)`.
2. **Best path that peaks here** — a path may "turn" at this node using **both** children: `node.val + leftGain + rightGain`. This can never be passed up (it would fork), so we compare it against a **global max**.

### Clamp negatives to zero

If a child's gain is negative, ignore that branch (`max(gain, 0)`) — a negative subtree never helps.

### Post-order DFS

Compute child gains, update the global max with the "turning" path, and return the single-branch gain upward.

---

## Complexity

| | Time | Space |
|---|---|---|
| DFS + global max | O(n) | O(h) recursion stack |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">private int best = Integer.MIN_VALUE;

public int maxPathSum(TreeNode root) {
    gain(root);
    return best;
}

private int gain(TreeNode node) {
    if (node == null) return 0;
    int left = Math.max(gain(node.left), 0);
    int right = Math.max(gain(node.right), 0);
    best = Math.max(best, node.val + left + right); // path turns here
    return node.val + Math.max(left, right);        // extend one branch up
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def maxPathSum(root):
    best = float('-inf')
    def gain(node):
        nonlocal best
        if not node:
            return 0
        left = max(gain(node.left), 0)
        right = max(gain(node.right), 0)
        best = max(best, node.val + left + right)
        return node.val + max(left, right)
    gain(root)
    return best</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">int best = INT_MIN;

int gain(TreeNode* node) {
    if (!node) return 0;
    int left = max(gain(node-&gt;left), 0);
    int right = max(gain(node-&gt;right), 0);
    best = max(best, node-&gt;val + left + right);
    return node-&gt;val + max(left, right);
}
int maxPathSum(TreeNode* root) {
    gain(root);
    return best;
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> Separate what you **return** (single-branch gain, usable by the parent) from what you **record** (the two-branch path that peaks at this node). The path can fork at most once, and that fork can't propagate upward — so it only ever contributes to the global answer.

---

## Common Mistakes

1. **Returning the two-branch sum** → a forked path can't be extended; only return `node.val + max(left, right)`.
2. **Forgetting to clamp negatives** → a negative child should contribute `0`, not drag the path down.
3. **Initializing best to 0** → fails on all-negative trees; use `-infinity`.

---

## Follow-ups

- **Return the actual path, not just the sum** → track parent pointers or reconstruct by re-descending along the chosen branches.
- **Diameter of Binary Tree** → same shape but counting edges instead of summing values.

---

## Related Problems

- [House Robber III](/dsa/house-robber-iii)
- [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
- [Binary Tree Maximum Path Sum (LC 124)](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

---

*Drop a comment below if you want the path-reconstruction variant 👇*
