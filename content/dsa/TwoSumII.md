---
layout: default
title: "Two Sum II - Input Array is Sorted"
description: "Two Pointers pattern: find two numbers in a sorted array that add up to a target. O(n) time, O(1) space."
permalink: /dsa/two-sum-ii
---

# Two Sum II - Input Array is Sorted

⚡ **Difficulty:** Easy 🏷️ **Pattern:** Two Pointers 🏢 **Asked at:** Amazon, Google, Microsoft, PhonePe

---

## Problem

Given a **1-indexed** sorted array `numbers` and a `target`, find two numbers that add up to `target`. Return their indices `[i, j]` where `i < j`.

**Constraints:**
- The array is sorted in non-decreasing order.
- Exactly one solution exists.
- Cannot use the same element twice.
- `2 ≤ n ≤ 30,000`

**Example:**
```
Input:  numbers = [2, 7, 11, 15], target = 9
Output: [1, 2]   (numbers[1] + numbers[2] = 2 + 7 = 9)
```

---

## Approach

### Why Two Pointers?

The array is **sorted**. This is the trigger for Two Pointers:
- Start with `left = 0`, `right = n - 1`.
- If `numbers[left] + numbers[right] == target` → found.
- If sum is too small → move `left` right (increase the smaller value).
- If sum is too large → move `right` left (decrease the larger value).

Each step eliminates one candidate. We converge to the answer in at most `n` steps.

### Why not HashMap?

HashMap works (O(n) time, O(n) space) but Two Pointers is O(n) time with **O(1) space** - strictly better when the input is sorted.

---

## Complexity

| | Time | Space |
|---|---|---|
| Two Pointers | O(n) | O(1) |
| HashMap | O(n) | O(n) |
| Brute force | O(n²) | O(1) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int[] twoSum(int[] numbers, int target) {
    int left = 0, right = numbers.length - 1;
    while (left &lt; right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) return new int[]{left + 1, right + 1};
        else if (sum &lt; target) left++;
        else right--;
    }
    return new int[]{-1, -1}; // unreachable per constraints
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1
    while left &lt; right:
        s = numbers[left] + numbers[right]
        if s == target:
            return [left + 1, right + 1]
        elif s &lt; target:
            left += 1
        else:
            right -= 1
    return [-1, -1]</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">vector&lt;int&gt; twoSum(vector&lt;int&gt;&amp; numbers, int target) {
    int left = 0, right = numbers.size() - 1;
    while (left &lt; right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) return {left + 1, right + 1};
        else if (sum &lt; target) left++;
        else right--;
    }
    return {-1, -1};
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> When the array is sorted and you need to find a pair, Two Pointers from both ends gives you O(1) space. The sorted property guarantees that moving `left` right increases the sum, and moving `right` left decreases it - so you always make progress.

---

## Follow-ups

- **What if the array is NOT sorted?** → Use a HashMap (O(n) time, O(n) space). That's LeetCode #1 "Two Sum."
- **What if you need all pairs, not just one?** → Keep both pointers moving after finding a pair; skip duplicates.
- **3Sum?** → Fix one element, then Two-Sum on the rest. O(n²) total.

---

## Related Problems

- [Two Sum](https://leetcode.com/problems/two-sum/) (unsorted, HashMap)
- [3Sum](https://leetcode.com/problems/3sum/)
- [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) (Two Pointers on width)

---

*Drop a comment below if you want a follow-up on 3Sum or Container With Most Water 👇*
