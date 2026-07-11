---
layout: default
title: "Trapping Rain Water"
description: "Two Pointers pattern: compute water trapped between bars in O(n) time O(1) space. PhonePe hard array question."
permalink: /dsa/trapping-rain-water
---

# Trapping Rain Water

⚡ **Difficulty:** Hard 🏷️ **Pattern:** Two Pointers 🏢 **Asked at:** PhonePe, Amazon, Google, Goldman Sachs

---

## Problem

Given `n` non-negative bar heights (each width 1), compute how much rain water is trapped between the bars after it rains.

**Example:**
```
height = [0,1,0,2,1,0,1,3,2,1,2,1]  →  6
```

---

## Approach

### The per-column truth

Water above column `i` = `min(maxLeft[i], maxRight[i]) - height[i]` (clamped at 0). A column holds water up to the shorter of the tallest walls on either side.

### From O(n) space to O(1) — two pointers

Precomputing `maxLeft` and `maxRight` arrays works but uses O(n) space. Instead, walk two pointers inward:
- Track `leftMax` and `rightMax` seen so far.
- Move the pointer on the **smaller side**. On that side you already know the smaller of the two maxes is the limiting wall, so `water += leftMax - height[left]` (or the right equivalent) safely.

The smaller side is always the bottleneck, so its answer is finalized even without knowing the exact opposite wall.

---

## Complexity

| | Time | Space |
|---|---|---|
| Two pointers | O(n) | O(1) |
| Precomputed max arrays | O(n) | O(n) |
| Brute force (scan both ways per column) | O(n²) | O(1) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int trap(int[] height) {
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0, water = 0;

    while (left &lt; right) {
        if (height[left] &lt; height[right]) {
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        } else {
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }
    return water;
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def trap(height):
    left, right = 0, len(height) - 1
    left_max = right_max = water = 0

    while left &lt; right:
        if height[left] &lt; height[right]:
            left_max = max(left_max, height[left])
            water += left_max - height[left]
            left += 1
        else:
            right_max = max(right_max, height[right])
            water += right_max - height[right]
            right -= 1
    return water</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">int trap(vector&lt;int&gt;&amp; height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0, water = 0;

    while (left &lt; right) {
        if (height[left] &lt; height[right]) {
            leftMax = max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        } else {
            rightMax = max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }
    return water;
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> Water at a column depends on `min(leftMax, rightMax)`. The two-pointer trick works because whenever `height[left] < height[right]`, the **left wall is guaranteed to be the limiting one** — so `leftMax` alone determines the water there, no need to know the exact right max. Always advance the smaller side.

---

## Follow-ups

- **Trapping Rain Water II (2D)** → [LC 407](https://leetcode.com/problems/trapping-rain-water-ii/): min-heap flood fill from the border inward.
- **Container With Most Water** → similar two-pointer setup but maximizes area between two lines, no inner bars.
- **Stack approach** → Resolve water layer-by-layer using a monotonic decreasing stack.

---

## Related Problems

- [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
- [Largest Rectangle in Histogram](/dsa/largest-rectangle-in-histogram)
- [Trapping Rain Water (LC 42)](https://leetcode.com/problems/trapping-rain-water/)

---

*Drop a comment below if you want the monotonic-stack version 👇*
