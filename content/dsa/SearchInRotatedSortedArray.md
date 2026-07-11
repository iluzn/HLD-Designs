---
layout: default
title: "Search in Rotated Sorted Array"
description: "Modified binary search pattern: find a target in a rotated sorted array in O(log n). Identify the sorted half each step. PhonePe binary search favorite."
permalink: /dsa/search-in-rotated-sorted-array
---

# Search in Rotated Sorted Array

⚡ **Difficulty:** Medium 🏷️ **Pattern:** Modified Binary Search 🏢 **Asked at:** PhonePe, Amazon, Google, Microsoft

---

## Problem

A sorted array was rotated at an unknown pivot (e.g. `[0,1,2,4,5,6,7]` → `[4,5,6,7,0,1,2]`). Given the rotated array (distinct values) and a `target`, return its index or `-1`. Must run in **O(log n)**.

**Example:**
```
nums = [4,5,6,7,0,1,2], target = 0  →  4
nums = [4,5,6,7,0,1,2], target = 3  →  -1
```

---

## Approach

### One half is always sorted

After a single rotation, when you split at `mid`, **at least one side (`left..mid` or `mid..right`) is fully sorted**. Detect which, then check whether the target lies within that sorted side's range:
- If yes, search that side.
- If no, search the other side.

Compare `nums[left]` with `nums[mid]`:
- `nums[left] <= nums[mid]` → left half is sorted.
- Otherwise → right half is sorted.

Standard binary search bookkeeping otherwise, halving the range each step.

---

## Complexity

| | Time | Space |
|---|---|---|
| Modified binary search | O(log n) | O(1) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left &lt;= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;

        if (nums[left] &lt;= nums[mid]) {           // left half sorted
            if (nums[left] &lt;= target &amp;&amp; target &lt; nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {                                 // right half sorted
            if (nums[mid] &lt; target &amp;&amp; target &lt;= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def search(nums, target):
    left, right = 0, len(nums) - 1
    while left &lt;= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] &lt;= nums[mid]:           # left half sorted
            if nums[left] &lt;= target &lt; nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:                                # right half sorted
            if nums[mid] &lt; target &lt;= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">int search(vector&lt;int&gt;&amp; nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left &lt;= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[left] &lt;= nums[mid]) {            // left sorted
            if (nums[left] &lt;= target &amp;&amp; target &lt; nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {                                 // right sorted
            if (nums[mid] &lt; target &amp;&amp; target &lt;= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> Rotation breaks global order but preserves it locally: **one half around `mid` is always sorted**. Once you know which half is sorted, a simple range check tells you whether the target is inside it, so you can discard half the array each step — keeping the O(log n) guarantee.

---

## Follow-ups

- **Duplicates allowed?** → [LC 81](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/): when `nums[left] == nums[mid]`, you can't tell which half is sorted — shrink `left++`; worst case O(n).
- **Find minimum / pivot** → [LC 153](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/): binary search for the rotation point.

---

## Related Problems

- [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- [Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/)
- [Search in Rotated Sorted Array (LC 33)](https://leetcode.com/problems/search-in-rotated-sorted-array/)

---

*Drop a comment below if you want the find-the-pivot walkthrough 👇*
