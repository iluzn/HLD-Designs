---
layout: default
title: "Merge Intervals"
description: "Greedy + Intervals pattern: merge all overlapping intervals. Sort by start time then scan. O(n log n)."
permalink: /dsa/merge-intervals
---

# Merge Intervals

⚡ **Difficulty:** Medium 🏷️ **Pattern:** Greedy / Intervals 🏢 **Asked at:** Amazon, Google, Meta, Microsoft, Bloomberg, PhonePe

---

## Problem

Given an array of intervals `intervals[i] = [start, end]`, merge all overlapping intervals and return the resulting non-overlapping intervals.

**Constraints:**
- `1 ≤ intervals.length ≤ 10,000`
- `intervals[i].length == 2`
- `0 ≤ start ≤ end ≤ 10,000`

**Examples:**
```
Input:  [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]

Input:  [[1,4],[4,5]]
Output: [[1,5]]
```

---

## Approach

### Why Sort + Greedy?

Once intervals are sorted by start time, overlapping intervals are **adjacent**. You just scan left-to-right and merge any interval whose `start ≤ current_end`.

1. **Sort** by `start` time.
2. Initialize result with the first interval.
3. For each subsequent interval:
   - If `interval.start <= last_merged.end` → overlap. Extend `last_merged.end = max(last_merged.end, interval.end)`.
   - Else → no overlap. Push a new interval.

---

## Complexity

| | Time | Space |
|---|---|---|
| Sort + scan | O(n log n) | O(n) for output |
| Brute force (compare all pairs) | O(n²) | O(n) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -&gt; a[0] - b[0]);
    List&lt;int[]&gt; merged = new ArrayList&lt;&gt;();

    for (int[] interval : intervals) {
        if (merged.isEmpty() || merged.get(merged.size() - 1)[1] &lt; interval[0]) {
            merged.add(interval);
        } else {
            merged.get(merged.size() - 1)[1] =
                Math.max(merged.get(merged.size() - 1)[1], interval[1]);
        }
    }
    return merged.toArray(new int[0][]);
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def merge(intervals: list[list[int]]) -&gt; list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = []

    for start, end in intervals:
        if not merged or merged[-1][1] &lt; start:
            merged.append([start, end])
        else:
            merged[-1][1] = max(merged[-1][1], end)

    return merged</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">vector&lt;vector&lt;int&gt;&gt; merge(vector&lt;vector&lt;int&gt;&gt;&amp; intervals) {
    sort(intervals.begin(), intervals.end());
    vector&lt;vector&lt;int&gt;&gt; merged;

    for (auto&amp; interval : intervals) {
        if (merged.empty() || merged.back()[1] &lt; interval[0]) {
            merged.push_back(interval);
        } else {
            merged.back()[1] = max(merged.back()[1], interval[1]);
        }
    }
    return merged;
}</code></pre>
</div>
</div>

---

## Key Insight

> After sorting by start, the only question for each interval is: "does my start overlap with the previous merged interval's end?" If yes → extend. If no → new group. That's the whole algorithm.

---

## Walkthrough

```
Input: [[1,3],[2,6],[8,10],[15,18]]
Sorted: [[1,3],[2,6],[8,10],[15,18]] (already sorted)

[1,3]: merged = [[1,3]]
[2,6]: 2 <= 3 → overlap, extend to [1,6]. merged = [[1,6]]
[8,10]: 8 > 6 → new. merged = [[1,6],[8,10]]
[15,18]: 15 > 10 → new. merged = [[1,6],[8,10],[15,18]]

Answer: [[1,6],[8,10],[15,18]]
```

---

## Follow-ups

- **Insert Interval** → Find the merge position via binary search, merge the overlapping range.
- **Meeting Rooms II (min rooms needed)** → Sort start/end separately, sweep with a counter.
- **Non-Overlapping Intervals (max intervals to keep)** → Sort by end, greedy pick the earliest-ending.

---

## Related Problems

- [Insert Interval](https://leetcode.com/problems/insert-interval/)
- [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
- [Non-Overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)

---

*Drop a comment below if you want a follow-up on Meeting Rooms II 👇*
