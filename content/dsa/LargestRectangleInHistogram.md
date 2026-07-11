---
layout: default
title: "Largest Rectangle in Histogram"
description: "Monotonic stack pattern: largest rectangle area in a histogram in O(n). Each bar's span found via nearest smaller bars. PhonePe hard stack question."
permalink: /dsa/largest-rectangle-in-histogram
---

# Largest Rectangle in Histogram

⚡ **Difficulty:** Hard 🏷️ **Pattern:** Monotonic Stack 🏢 **Asked at:** PhonePe, Amazon, Google, Microsoft

---

## Problem

Given `heights` of histogram bars each of width 1, find the area of the **largest rectangle** that fits entirely within the histogram.

**Example:**
```
heights = [2, 1, 5, 6, 2, 3]  →  10   (bars 5 and 6 form 5 × 2)
```

---

## Approach

### The key question per bar

For each bar of height `h`, the widest rectangle **using `h` as the limiting height** stretches left and right until it hits a bar shorter than `h`. Area = `h × (rightSmaller - leftSmaller - 1)`. The answer is the max over all bars.

### Monotonic increasing stack

A stack of indices with **increasing heights** finds these boundaries in one pass:
- Push while heights increase.
- When the current bar is **shorter** than the stack top, that top's right boundary is found (the current index). Pop it, and its left boundary is the new stack top. Compute its area.
- Append a **sentinel `0`** at the end to flush all remaining bars.

Each index is pushed and popped once → O(n).

---

## Complexity

| | Time | Space |
|---|---|---|
| Monotonic stack | O(n) | O(n) |
| Brute force (expand each bar) | O(n²) | O(1) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int largestRectangleArea(int[] heights) {
    Deque&lt;Integer&gt; stack = new ArrayDeque&lt;&gt;();  // indices, increasing heights
    int maxArea = 0, n = heights.length;

    for (int i = 0; i &lt;= n; i++) {
        int h = (i == n) ? 0 : heights[i];      // sentinel flush
        while (!stack.isEmpty() &amp;&amp; heights[stack.peek()] &gt;= h) {
            int height = heights[stack.pop()];
            int width = stack.isEmpty() ? i : i - stack.peek() - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def largestRectangleArea(heights):
    stack = []          # indices, increasing heights
    max_area = 0
    n = len(heights)
    for i in range(n + 1):
        h = 0 if i == n else heights[i]
        while stack and heights[stack[-1]] &gt;= h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    return max_area</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">int largestRectangleArea(vector&lt;int&gt;&amp; heights) {
    stack&lt;int&gt; st;                 // indices, increasing heights
    int maxArea = 0, n = heights.size();
    for (int i = 0; i &lt;= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        while (!st.empty() &amp;&amp; heights[st.top()] &gt;= h) {
            int height = heights[st.top()]; st.pop();
            int width = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, height * width);
        }
        st.push(i);
    }
    return maxArea;
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> A **monotonic increasing stack** lets you find, for every bar, the nearest shorter bar on both sides in amortized O(1). When a bar gets popped, the current index is its right boundary and the new stack top is its left boundary — the rectangle it can anchor is fully determined at pop time. The trailing sentinel `0` guarantees everything is popped.

---

## Why this unlocks harder problems

**Maximal Rectangle** (largest all-1s rectangle in a binary matrix) reduces to running this histogram routine on each row's accumulated column heights — O(rows × cols).

---

## Follow-ups

- **Maximal Rectangle** → [LC 85](https://leetcode.com/problems/maximal-rectangle/): per-row histogram + this algorithm.
- **Precompute boundaries instead** → Two passes computing nearest-smaller-left and nearest-smaller-right arrays.

---

## Related Problems

- [Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/)
- [Trapping Rain Water](/dsa/trapping-rain-water)
- [Largest Rectangle in Histogram (LC 84)](https://leetcode.com/problems/largest-rectangle-in-histogram/)

---

*Drop a comment below if you want the Maximal Rectangle extension 👇*
