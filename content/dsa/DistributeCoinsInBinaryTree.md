---
layout: default
title: "Distribute Coins in Binary Tree"
description: "Tree DFS pattern: move coins so every node holds exactly one. Count moves via subtree balance (excess flows across edges). PhonePe 2026 favorite."
permalink: /dsa/distribute-coins-in-binary-tree
---

# Distribute Coins in Binary Tree

⚡ **Difficulty:** Medium 🏷️ **Pattern:** Tree DFS (Subtree Balance) 🏢 **Asked at:** PhonePe (2026), Amazon, Google

---

## Problem

A binary tree has `n` nodes and exactly `n` coins total, spread unevenly across nodes. In one move you can move **one coin** between a node and its parent (either direction). Return the **minimum number of moves** so every node ends up with exactly one coin.

**Example:**
```
   3
  / \
 0   0

Answer: 2  (move one coin from root to left child, one to right child)
```

---

## Approach

### The insight: count coins that cross each edge

Forget about tracking individual coins. Think about **each edge** between a node and its parent. Every coin that must flow across that edge — in either direction — is one move.

For any subtree, define its **balance** = `(coins in subtree) - (nodes in subtree)`.
- Positive balance → surplus coins that must flow **up** to the parent.
- Negative balance → deficit that must be filled **from** the parent.

The number of moves across the edge into a node is `abs(balance of that subtree)`. Sum `abs(balance)` over all nodes (except we naturally accumulate during DFS).

### Post-order DFS

Compute each child's balance first, add `abs(childBalance)` to the answer, then propagate `node.val + leftBalance + rightBalance - 1` upward.

---

## Complexity

| | Time | Space |
|---|---|---|
| Post-order DFS | O(n) | O(h) recursion stack |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">private int moves = 0;

public int distributeCoins(TreeNode root) {
    balance(root);
    return moves;
}

// returns surplus/deficit of this subtree
private int balance(TreeNode node) {
    if (node == null) return 0;
    int left = balance(node.left);
    int right = balance(node.right);
    moves += Math.abs(left) + Math.abs(right);
    return node.val + left + right - 1;
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def distributeCoins(root):
    moves = 0
    def balance(node):
        nonlocal moves
        if not node:
            return 0
        left = balance(node.left)
        right = balance(node.right)
        moves += abs(left) + abs(right)
        return node.val + left + right - 1
    balance(root)
    return moves</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">int moves = 0;

int balance(TreeNode* node) {
    if (!node) return 0;
    int left = balance(node-&gt;left);
    int right = balance(node-&gt;right);
    moves += abs(left) + abs(right);
    return node-&gt;val + left + right - 1;
}
int distributeCoins(TreeNode* root) {
    balance(root);
    return moves;
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> Don't simulate coins moving. Count the **net flow across each edge**. A subtree with balance `b` forces `abs(b)` moves on the edge to its parent, regardless of direction. Summing those absolute balances gives the answer in one pass.

---

## Walkthrough

```
   3
  / \
 0   0

balance(left leaf 0)  = 0 + 0 + 0 - 1 = -1   → moves += 1
balance(right leaf 0) = -1                    → moves += 1
balance(root 3)       = 3 + (-1) + (-1) - 1 = 0
Total moves = 2
```

---

## Follow-ups

- **What if edges had weights (cost per move)?** → The greedy edge-flow argument breaks; becomes a min-cost flow problem.
- **Why does `abs` work even when coins flow both ways on different edges?** → Each edge is counted independently; a subtree's net requirement is all that matters.

---

## Related Problems

- [House Robber III](/dsa/house-robber-iii)
- [Binary Tree Maximum Path Sum](/dsa/binary-tree-maximum-path-sum)
- [Distribute Coins in Binary Tree (LC 979)](https://leetcode.com/problems/distribute-coins-in-binary-tree/)

---

*Drop a comment below if the subtree-balance idea needs another example 👇*
