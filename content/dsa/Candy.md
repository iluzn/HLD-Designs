---
layout: default
title: "Candy"
description: "Greedy two-pass pattern: minimum candies for children by rating where higher-rated neighbors get more. PhonePe SDE-2 favorite."
permalink: /dsa/candy
---

# Candy

⚡ **Difficulty:** Hard 🏷️ **Pattern:** Greedy (Two Passes) 🏢 **Asked at:** PhonePe (SDE-2), Amazon, Google

---

## Problem

`n` children stand in a line, each with a `rating`. Distribute candies so that:
1. Every child gets **at least one** candy.
2. A child with a **higher rating than an adjacent child** gets **more candies** than that neighbor.

Return the **minimum total** candies.

**Example:**
```
ratings = [1, 0, 2]
candies  = [2, 1, 2]  →  total = 5
```

---

## Approach

### Why one greedy pass fails

If you only compare to the left, you satisfy the left constraint but violate the right (and vice versa). A rating like `[1,2,2]` or a valley `[3,2,1,2]` breaks single-direction greed.

### Two passes fix both directions

1. **Left → right:** if `ratings[i] > ratings[i-1]`, give `candies[i] = candies[i-1] + 1`. This satisfies every "greater than left neighbor" rule.
2. **Right → left:** if `ratings[i] > ratings[i+1]`, set `candies[i] = max(candies[i], candies[i+1] + 1)`. The `max` preserves what the left pass already guaranteed.

Start everyone at 1. After both passes, every local constraint holds and the total is minimal.

---

## Complexity

| | Time | Space |
|---|---|---|
| Two-pass greedy | O(n) | O(n) |
| One-pass O(1) space | O(n) | O(1) (slope-counting variant) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int candy(int[] ratings) {
    int n = ratings.length;
    int[] candies = new int[n];
    Arrays.fill(candies, 1);

    for (int i = 1; i &lt; n; i++)
        if (ratings[i] &gt; ratings[i - 1])
            candies[i] = candies[i - 1] + 1;

    for (int i = n - 2; i &gt;= 0; i--)
        if (ratings[i] &gt; ratings[i + 1])
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);

    int total = 0;
    for (int c : candies) total += c;
    return total;
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def candy(ratings):
    n = len(ratings)
    candies = [1] * n

    for i in range(1, n):
        if ratings[i] &gt; ratings[i - 1]:
            candies[i] = candies[i - 1] + 1

    for i in range(n - 2, -1, -1):
        if ratings[i] &gt; ratings[i + 1]:
            candies[i] = max(candies[i], candies[i + 1] + 1)

    return sum(candies)</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">int candy(vector&lt;int&gt;&amp; ratings) {
    int n = ratings.size();
    vector&lt;int&gt; candies(n, 1);

    for (int i = 1; i &lt; n; i++)
        if (ratings[i] &gt; ratings[i - 1])
            candies[i] = candies[i - 1] + 1;

    for (int i = n - 2; i &gt;= 0; i--)
        if (ratings[i] &gt; ratings[i + 1])
            candies[i] = max(candies[i], candies[i + 1] + 1);

    int total = 0;
    for (int c : candies) total += c;
    return total;
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> A single adjacency constraint that points **both directions** usually needs **two sweeps** — one per direction — combined with `max`. Each sweep enforces one side; the `max` guarantees the second sweep never breaks the first. This "left pass then right pass" template also solves Trapping Rain Water and Product of Array Except Self.

---

## Follow-ups

- **O(1) space?** → Count the length of up-slopes and down-slopes as you walk, and add the triangular numbers, handling the peak carefully.
- **Equal ratings?** → No constraint between equal neighbors, so they can both be 1 — the code already handles this (strict `>`).

---

## Related Problems

- [Trapping Rain Water](/dsa/trapping-rain-water)
- [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)
- [Candy (LC 135)](https://leetcode.com/problems/candy/)

---

*Drop a comment below if you want the O(1)-space slope-counting version 👇*
