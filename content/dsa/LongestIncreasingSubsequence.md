---
layout: default
title: "Longest Increasing Subsequence"
description: "DP + Binary Search pattern: length of the longest strictly increasing subsequence in O(n log n) using patience sorting. PhonePe favorite."
permalink: /dsa/longest-increasing-subsequence
---

# Longest Increasing Subsequence

⚡ **Difficulty:** Medium 🏷️ **Pattern:** DP + Binary Search 🏢 **Asked at:** PhonePe, Amazon, Google, Microsoft

---

## Problem

Given an integer array `nums`, return the length of the **longest strictly increasing subsequence**. A subsequence keeps order but need not be contiguous.

**Example:**
```
nums = [10, 9, 2, 5, 3, 7, 101, 18]  →  4   (2, 3, 7, 18 or 2, 3, 7, 101)
```

---

## Approach

### O(n²) DP (the intuitive version)

`dp[i]` = length of the longest increasing subsequence **ending at** index `i`. For each `i`, check all `j < i`; if `nums[j] < nums[i]`, then `dp[i] = max(dp[i], dp[j] + 1)`. Answer is `max(dp)`.

### O(n log n) — patience sorting

Maintain a `tails` array where `tails[k]` = the **smallest possible tail** of an increasing subsequence of length `k+1`.
- For each number, binary-search the first tail `>=` it.
- Replace that tail (keeps future options open) — or append if the number is larger than every tail (extends the longest run).
- The final length of `tails` is the answer.

`tails` isn't a real subsequence, but its **length** is always correct.

---

## Complexity

| | Time | Space |
|---|---|---|
| Patience sorting + binary search | O(n log n) | O(n) |
| DP | O(n²) | O(n) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int lengthOfLIS(int[] nums) {
    List&lt;Integer&gt; tails = new ArrayList&lt;&gt;();
    for (int x : nums) {
        int lo = 0, hi = tails.size();
        while (lo &lt; hi) {                 // first tail &gt;= x
            int mid = (lo + hi) / 2;
            if (tails.get(mid) &lt; x) lo = mid + 1;
            else hi = mid;
        }
        if (lo == tails.size()) tails.add(x);
        else tails.set(lo, x);
    }
    return tails.size();
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">import bisect

def lengthOfLIS(nums):
    tails = []
    for x in nums:
        i = bisect.bisect_left(tails, x)   # first tail &gt;= x
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">int lengthOfLIS(vector&lt;int&gt;&amp; nums) {
    vector&lt;int&gt; tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> Keep the **smallest tail for each achievable length**. A smaller tail never hurts — it leaves more room for future elements to extend the run. Binary search finds where each number fits, giving O(n log n). Use `lower_bound` for strictly increasing; switch to `upper_bound` if duplicates are allowed (non-decreasing).

---

## Walkthrough

```
nums = [10, 9, 2, 5, 3, 7, 101, 18]

10        → tails [10]
9         → replace 10   → [9]
2         → replace 9    → [2]
5         → append       → [2, 5]
3         → replace 5    → [2, 3]
7         → append       → [2, 3, 7]
101       → append       → [2, 3, 7, 101]
18        → replace 101  → [2, 3, 7, 18]

length = 4
```

---

## Follow-ups

- **Reconstruct the actual subsequence?** → Store predecessor indices during the DP version, or track positions in patience sorting.
- **Longest non-decreasing?** → Use `upper_bound` / `bisect_right`.
- **Number of LIS** → [LC 673](https://leetcode.com/problems/number-of-longest-increasing-subsequence/) needs counts alongside lengths.

---

## Related Problems

- [Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/) (2D LIS)
- [Number of Longest Increasing Subsequence](https://leetcode.com/problems/number-of-longest-increasing-subsequence/)
- [LIS (LC 300)](https://leetcode.com/problems/longest-increasing-subsequence/)

---

*Drop a comment below if you want the path-reconstruction version 👇*
