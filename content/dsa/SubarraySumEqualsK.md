---
layout: default
title: "Subarray Sum Equals K"
description: "Prefix sum + HashMap pattern: count subarrays summing to K in O(n). Handles negatives where sliding window fails. PhonePe favorite."
permalink: /dsa/subarray-sum-equals-k
---

# Subarray Sum Equals K

⚡ **Difficulty:** Medium 🏷️ **Pattern:** Prefix Sum + HashMap 🏢 **Asked at:** PhonePe, Amazon, Google, Meta

---

## Problem

Given an integer array `nums` and integer `k`, return the **number of contiguous subarrays** whose sum equals `k`. Values may be negative.

**Example:**
```
nums = [1, 1, 1], k = 2  →  2   ([1,1] at indices 0-1 and 1-2)
```

---

## Approach

### Why sliding window fails here

Sliding window needs monotonic growth of the sum when you extend, which requires **non-negative** numbers. Negatives break it. So we reach for prefix sums.

### Prefix sums + a frequency map

Let `prefix[i]` = sum of `nums[0..i]`. A subarray `(j, i]` sums to `k` when:
```
prefix[i] - prefix[j] = k   →   prefix[j] = prefix[i] - k
```
So as we sweep and maintain the running `prefix`, the count of subarrays ending at `i` is **how many earlier prefixes equal `prefix - k`**. Keep a HashMap of `prefixSum → count seen so far`.

**Seed the map with `{0: 1}`** so subarrays starting at index 0 are counted.

---

## Complexity

| | Time | Space |
|---|---|---|
| Prefix sum + HashMap | O(n) | O(n) |
| Brute force (all subarrays) | O(n²) | O(1) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int subarraySum(int[] nums, int k) {
    Map&lt;Integer, Integer&gt; count = new HashMap&lt;&gt;();
    count.put(0, 1);              // empty prefix
    int prefix = 0, res = 0;

    for (int x : nums) {
        prefix += x;
        res += count.getOrDefault(prefix - k, 0);
        count.merge(prefix, 1, Integer::sum);
    }
    return res;
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">from collections import defaultdict

def subarraySum(nums, k):
    count = defaultdict(int)
    count[0] = 1
    prefix = res = 0
    for x in nums:
        prefix += x
        res += count[prefix - k]
        count[prefix] += 1
    return res</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">int subarraySum(vector&lt;int&gt;&amp; nums, int k) {
    unordered_map&lt;int, int&gt; count;
    count[0] = 1;
    int prefix = 0, res = 0;
    for (int x : nums) {
        prefix += x;
        res += count.count(prefix - k) ? count[prefix - k] : 0;
        count[prefix]++;
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

> Any "contiguous subarray with sum == target" question becomes O(n) once you rewrite it as `prefix[i] - prefix[j] = k` and count matching earlier prefixes in a HashMap. Seeding `{0: 1}` is the classic off-by-one guard so a valid prefix from index 0 is counted. This trick handles negatives, which sliding window cannot.

---

## Walkthrough

```
nums = [1, 1, 1], k = 2
map = {0:1}
x=1: prefix=1, need 1-2=-1 → 0 found; map={0:1, 1:1}
x=1: prefix=2, need 2-2=0  → 1 found (res=1); map={0:1,1:1,2:1}
x=1: prefix=3, need 3-2=1  → 1 found (res=2); map={...,3:1}
Answer = 2
```

---

## Follow-ups

- **All non-negative?** → A sliding window also works in O(n), O(1) space.
- **Longest subarray with sum k** → Store the **first** index of each prefix instead of a count.
- **Subarray divisible by k** → Key the map on `prefix mod k`.

---

## Related Problems

- [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/)
- [Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/)
- [Subarray Sum Equals K (LC 560)](https://leetcode.com/problems/subarray-sum-equals-k/)

---

*Drop a comment below if you want the "longest subarray" variant 👇*
