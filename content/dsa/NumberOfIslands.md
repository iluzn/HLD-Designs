---
layout: default
title: "Number of Islands"
description: "Graph BFS/DFS pattern: count connected components of land in a 2D grid by flood fill. PhonePe fundamentals question."
permalink: /dsa/number-of-islands
---

# Number of Islands

⚡ **Difficulty:** Medium 🏷️ **Pattern:** Grid BFS/DFS (Flood Fill) 🏢 **Asked at:** PhonePe, Amazon, Google, Meta

---

## Problem

Given a 2D grid of `'1'` (land) and `'0'` (water), count the number of **islands**. An island is land connected 4-directionally (up/down/left/right).

**Example:**
```
11000
11000
00100
00011

Answer: 3
```

---

## Approach

### It's connected components in disguise

Each cell is a graph node; edges connect adjacent land cells. Counting islands = counting **connected components** of land.

### Flood fill

Scan every cell. When you hit an unvisited `'1'`, that's a new island — increment the counter, then **flood fill** (DFS or BFS) all connected land, marking it visited (overwrite to `'0'` or use a visited set) so you never count it again.

DFS is shorter to write; BFS avoids deep recursion stacks on huge grids.

---

## Complexity

| | Time | Space |
|---|---|---|
| DFS/BFS flood fill | O(rows × cols) | O(rows × cols) worst case |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int numIslands(char[][] grid) {
    int count = 0;
    for (int r = 0; r &lt; grid.length; r++)
        for (int c = 0; c &lt; grid[0].length; c++)
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
    return count;
}

private void dfs(char[][] grid, int r, int c) {
    if (r &lt; 0 || c &lt; 0 || r &gt;= grid.length || c &gt;= grid[0].length
            || grid[r][c] != '1') return;
    grid[r][c] = '0';               // mark visited
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def numIslands(grid):
    rows, cols = len(grid), len(grid[0])

    def dfs(r, c):
        if r &lt; 0 or c &lt; 0 or r &gt;= rows or c &gt;= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0'
        dfs(r + 1, c); dfs(r - 1, c)
        dfs(r, c + 1); dfs(r, c - 1)

    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">void dfs(vector&lt;vector&lt;char&gt;&gt;&amp; grid, int r, int c) {
    if (r &lt; 0 || c &lt; 0 || r &gt;= grid.size() || c &gt;= grid[0].size()
            || grid[r][c] != '1') return;
    grid[r][c] = '0';
    dfs(grid, r + 1, c); dfs(grid, r - 1, c);
    dfs(grid, r, c + 1); dfs(grid, r, c - 1);
}
int numIslands(vector&lt;vector&lt;char&gt;&gt;&amp; grid) {
    int count = 0;
    for (int r = 0; r &lt; grid.size(); r++)
        for (int c = 0; c &lt; grid[0].size(); c++)
            if (grid[r][c] == '1') { count++; dfs(grid, r, c); }
    return count;
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> "Count groups of connected cells in a grid" is always **flood fill**: iterate, and every time you find an unvisited member of a group, bump the counter and erase the whole group so it's counted once. Marking cells `'0'` in place saves the visited set at the cost of mutating the input.

---

## Follow-ups

- **Don't mutate the input?** → Use a separate `visited` matrix.
- **Diagonal connections count too?** → Add the 4 diagonal directions (8-connectivity).
- **Streaming islands (add land one at a time)?** → [Number of Islands II](https://leetcode.com/problems/number-of-islands-ii/) needs Union-Find.
- **Thread-safe / parallel?** → Partition the grid, count per-partition, then merge border components with Union-Find.

---

## Related Problems

- [Max Area of Island](https://leetcode.com/problems/max-area-of-island/)
- [Number of Connected Components](/dsa/number-of-connected-components)
- [Number of Islands (LC 200)](https://leetcode.com/problems/number-of-islands/)

---

*Drop a comment below if you want the Union-Find (streaming) version 👇*
