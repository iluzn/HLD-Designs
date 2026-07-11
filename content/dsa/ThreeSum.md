---
layout: default
title: "3Sum"
description: "Two Pointers pattern: find all unique triplets summing to zero. Sort, fix one element, converge with two pointers. PhonePe array favorite."
permalink: /dsa/3sum
---

# 3Sum

⚡ **Difficulty:** Medium 🏷️ **Pattern:** Sorting + Two Pointers 🏢 **Asked at:** PhonePe, Amazon, Google, Meta

---

## Problem

Given an integer array `nums`, return **all unique triplets** `[a, b, c]` such that `a + b + c == 0`. No duplicate triplets in the output.

**Example:**
```
nums = [-1, 0, 1, 2, -1, -4]  →  [[-1, -1, 2], [-1, 0, 1]]
```

---

## Approach

### Reduce 3Sum to 2Sum

Sort the array. **Fix one element** `nums[i]`, then the problem becomes: find two numbers in the rest that sum to `-nums[i]`. Because the array is sorted, use **two pointers** converging from both ends — O(n) per fixed element.

### Skipping duplicates is the tricky part

Sorting groups equal values together, so:
- Skip a fixed `i` if `nums[i] == nums[i-1]` (already handled).
- After finding a valid triplet, advance `left`/`right` past equal values.

### Early exit

Once `nums[i] > 0`, no triplet can sum to zero (all remaining values are positive) — break.

---

## Complexity

| | Time | Space |
|---|---|---|
| Sort + two pointers | O(n²) | O(1) extra (or O(n) for sort) |
| Brute force | O(n³) | O(1) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public List&lt;List&lt;Integer&gt;&gt; threeSum(int[] nums) {
    Arrays.sort(nums);
    List&lt;List&lt;Integer&gt;&gt; res = new ArrayList&lt;&gt;();

    for (int i = 0; i &lt; nums.length - 2; i++) {
        if (nums[i] &gt; 0) break;
        if (i &gt; 0 &amp;&amp; nums[i] == nums[i - 1]) continue;   // skip dup pivot
        int left = i + 1, right = nums.length - 1;
        while (left &lt; right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                while (left &lt; right &amp;&amp; nums[left] == nums[left + 1]) left++;
                while (left &lt; right &amp;&amp; nums[right] == nums[right - 1]) right--;
                left++; right--;
            } else if (sum &lt; 0) left++;
            else right--;
        }
    }
    return res;
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def threeSum(nums):
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if nums[i] &gt; 0:
            break
        if i &gt; 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left &lt; right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                res.append([nums[i], nums[left], nums[right]])
                while left &lt; right and nums[left] == nums[left + 1]:
                    left += 1
                while left &lt; right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1; right -= 1
            elif s &lt; 0:
                left += 1
            else:
                right -= 1
    return res</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">vector&lt;vector&lt;int&gt;&gt; threeSum(vector&lt;int&gt;&amp; nums) {
    sort(nums.begin(), nums.end());
    vector&lt;vector&lt;int&gt;&gt; res;
    for (int i = 0; i + 2 &lt; (int)nums.size(); i++) {
        if (nums[i] &gt; 0) break;
        if (i &gt; 0 &amp;&amp; nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = nums.size() - 1;
        while (left &lt; right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                res.push_back({nums[i], nums[left], nums[right]});
                while (left &lt; right &amp;&amp; nums[left] == nums[left + 1]) left++;
                while (left &lt; right &amp;&amp; nums[right] == nums[right - 1]) right--;
                left++; right--;
            } else if (sum &lt; 0) left++;
            else right--;
        }
    }
    return res;
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> Sorting unlocks two things at once: **two pointers** (turning the inner 2Sum into O(n)) and **duplicate skipping** (equal values sit next to each other). The "fix one, two-pointer the rest" pattern generalizes to 4Sum and kSum.

---

## Follow-ups

- **4Sum** → Fix two elements, two-pointer the rest → O(n³).
- **3Sum Closest** → Track the sum nearest to target instead of exactly zero.
- **Count triplets < target** → For each fixed `i`, all pairs between the pointers count in bulk.

---

## Related Problems

- [Two Sum II](/dsa/two-sum-ii)
- [3Sum Closest](https://leetcode.com/problems/3sum-closest/)
- [4Sum](https://leetcode.com/problems/4sum/)
- [3Sum (LC 15)](https://leetcode.com/problems/3sum/)

---

*Drop a comment below if you want the generalized kSum template 👇*
