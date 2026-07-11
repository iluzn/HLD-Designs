---
layout: default
title: "Serialize and Deserialize Binary Tree"
description: "Tree design pattern: encode a binary tree to a string and rebuild it. Pre-order DFS with null markers. PhonePe hard tree question."
permalink: /dsa/serialize-deserialize-binary-tree
---

# Serialize and Deserialize Binary Tree

⚡ **Difficulty:** Hard 🏷️ **Pattern:** Tree Design (Pre-order DFS) 🏢 **Asked at:** PhonePe, Amazon, Google, Meta

---

## Problem

Design two functions: `serialize(root)` converts a binary tree into a string, and `deserialize(data)` reconstructs the exact same tree from that string. Any consistent format is fine as long as the round-trip is lossless.

---

## Approach

### Why null markers matter

An in-order traversal alone can't rebuild a tree (structure is ambiguous). But a **pre-order traversal that also records nulls** captures the full structure uniquely: the position of each `#` tells you where a subtree ends.

### Serialize — pre-order DFS

Visit root, then left, then right. Emit `node.val` for real nodes and a sentinel (`#`) for nulls, separated by commas.

```
     1
    / \
   2   3
      / \
     4   5

→ "1,2,#,#,3,4,#,#,5,#,#"
```

### Deserialize — consume tokens in the same order

Read tokens left to right. Each call: if the token is `#`, return null; otherwise create the node and **recursively build its left subtree, then its right**. Because we wrote pre-order, we read pre-order — the recursion mirrors the encoding exactly.

---

## Complexity

| | Time | Space |
|---|---|---|
| Serialize | O(n) | O(n) output + O(h) stack |
| Deserialize | O(n) | O(n) tokens + O(h) stack |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public String serialize(TreeNode root) {
    StringBuilder sb = new StringBuilder();
    build(root, sb);
    return sb.toString();
}
private void build(TreeNode node, StringBuilder sb) {
    if (node == null) { sb.append("#,"); return; }
    sb.append(node.val).append(",");
    build(node.left, sb);
    build(node.right, sb);
}

public TreeNode deserialize(String data) {
    Queue&lt;String&gt; q = new LinkedList&lt;&gt;(Arrays.asList(data.split(",")));
    return parse(q);
}
private TreeNode parse(Queue&lt;String&gt; q) {
    String tok = q.poll();
    if (tok.equals("#")) return null;
    TreeNode node = new TreeNode(Integer.parseInt(tok));
    node.left = parse(q);
    node.right = parse(q);
    return node;
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def serialize(root):
    out = []
    def build(node):
        if not node:
            out.append("#")
            return
        out.append(str(node.val))
        build(node.left)
        build(node.right)
    build(root)
    return ",".join(out)

def deserialize(data):
    tokens = iter(data.split(","))
    def parse():
        tok = next(tokens)
        if tok == "#":
            return None
        node = TreeNode(int(tok))
        node.left = parse()
        node.right = parse()
        return node
    return parse()</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">string serialize(TreeNode* root) {
    string s;
    function&lt;void(TreeNode*)&gt; build = [&amp;](TreeNode* n) {
        if (!n) { s += "#,"; return; }
        s += to_string(n-&gt;val) + ",";
        build(n-&gt;left); build(n-&gt;right);
    };
    build(root);
    return s;
}

TreeNode* deserialize(string data) {
    stringstream ss(data);
    string tok;
    function&lt;TreeNode*()&gt; parse = [&amp;]() -&gt; TreeNode* {
        getline(ss, tok, ',');
        if (tok == "#") return nullptr;
        TreeNode* node = new TreeNode(stoi(tok));
        node-&gt;left = parse();
        node-&gt;right = parse();
        return node;
    };
    return parse();
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> Pre-order traversal **plus explicit null markers** is a bijection with the tree — one unique string per tree and vice versa. Because encode and decode both walk in pre-order, the decode recursion is a mirror image of the encode recursion.

---

## Follow-ups

- **BFS/level-order version** → Works too (this is how LeetCode prints trees); use a queue and emit nulls for missing children.
- **Make it compact** → For BSTs you can skip null markers since ranges disambiguate structure.

---

## Related Problems

- [Construct Binary Tree from Preorder and Inorder](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
- [Serialize and Deserialize Binary Tree (LC 297)](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

---

*Drop a comment below if you want the level-order (BFS) encoding 👇*
