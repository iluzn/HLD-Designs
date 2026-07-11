---
layout: default
title: "Koko Eating Bananas"
description: "Binary search on answer pattern: find the minimum eating speed to finish in H hours. Search the answer space, not the array. PhonePe OA favorite."
permalink: /dsa/koko-eating-bananas
---

# Koko Eating Bananas

⚡ **Difficulty:** Medium 🏷️ **Pattern:** Binary Search on Answer 🏢 **Asked at:** PhonePe (OA), Amazon, Google

---

## Problem

Koko has `piles` of bananas and `h` hours before the guards return. Each hour she picks one pile and eats up to `k` bananas from it (if the pile has fewer, she finishes it and stops for that hour). Find the **minimum integer speed `k`** so she finishes all piles within `h` hours.

**Example:**
```
piles = [3, 6, 7, 11], h = 8  →  4
```

---

## Approach

### Binary search on the answer, not the input

The array isn't sorted, but the **answer space is monotonic**: if speed `k` finishes in time, any speed `> k` also does. This monotonic predicate ("can she finish at speed k?") is the trigger for **binary search on the answer**.

- **Search range:** `k` from `1` to `max(piles)` (never need to eat faster than the biggest pile).
- **Feasibility check** at speed `k`: hours needed = `Σ ceil(pile / k)`. Feasible if `≤ h`.
- Binary search for the **smallest feasible `k`**: if feasible, try slower (`right = mid`); else go faster (`left = mid + 1`).

---

## Complexity

| | Time | Space |
|---|---|---|
| Binary search on answer | O(n log maxPile) | O(1) |
| Linear scan of speeds | O(n · maxPile) | O(1) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int minEatingSpeed(int[] piles, int h) {
    int left = 1, right = 0;
    for (int p : piles) right = Math.max(right, p);

    while (left &lt; right) {
        int mid = left + (right - left) / 2;
        if (hours(piles, mid) &lt;= h) right = mid;   // feasible, try slower
        else left = mid + 1;                        // too slow, speed up
    }
    return left;
}

private long hours(int[] piles, int k) {
    long total = 0;
    for (int p : piles) total += (p + k - 1) / k;   // ceil(p / k)
    return total;
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">import math

def minEatingSpeed(piles, h):
    left, right = 1, max(piles)

    def hours(k):
        return sum((p + k - 1) // k for p in piles)   # ceil

    while left &lt; right:
        mid = (left + right) // 2
        if hours(mid) &lt;= h:
            right = mid
        else:
            left = mid + 1
    return left</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">long hours(vector&lt;int&gt;&amp; piles, int k) {
    long total = 0;
    for (int p : piles) total += (p + k - 1) / k;   // ceil
    return total;
}
int minEatingSpeed(vector&lt;int&gt;&amp; piles, int h) {
    int left = 1, right = *max_element(piles.begin(), piles.end());
    while (left &lt; right) {
        int mid = left + (right - left) / 2;
        if (hours(piles, mid) &lt;= h) right = mid;
        else left = mid + 1;
    }
    return left;
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> When the answer is a number and "does answer `x` work?" is **monotonic** (works for all values above/below a threshold), binary-search the answer range instead of the data. The trick is writing a clean O(n) feasibility check; the log factor comes from halving the answer space. This same template solves "split array largest sum," "capacity to ship packages," and many OA questions.

---

## Follow-ups

- **Ship packages within D days** → [LC 1011](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/): identical structure, feasibility check simulates loading.
- **Why `right = mid` not `mid - 1`?** → We're finding the smallest feasible value, so we keep `mid` as a candidate.

---

## Related Problems

- [Capacity to Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)
- [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/)
- [Koko Eating Bananas (LC 875)](https://leetcode.com/problems/koko-eating-bananas/)

---

*Drop a comment below if you want the "ship packages" walkthrough 👇*
