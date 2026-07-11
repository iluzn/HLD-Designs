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

## Solve It

Implement the `twoSum` function, hit **Run** to check the sample cases, then **Submit** to run against all hidden test cases for an Accepted / Wrong Answer verdict — LeetCode style, right in the browser. Supports Python, JavaScript, Java, and C++.

{% raw %}
<script>
window.SC_PROBLEM = {
  // stdin tokens per test: "<target> <n> <a1 a2 ... an>"
  tests: [
    { stdin: "9 4 2 7 11 15",            expected: "1 2", hidden: false, label: "numbers = [2, 7, 11, 15], target = 9" },
    { stdin: "6 3 2 3 4",                expected: "1 3", hidden: false, label: "numbers = [2, 3, 4], target = 6" },
    { stdin: "-1 2 -1 0",                expected: "1 2", hidden: false, label: "numbers = [-1, 0], target = -1" },
    { stdin: "8 8 1 2 3 4 4 9 56 90",    expected: "4 5", hidden: true },
    { stdin: "100 3 5 25 75",            expected: "2 3", hidden: true },
    { stdin: "16 7 1 3 5 7 9 11 13",     expected: "2 7", hidden: true },
    { stdin: "2 2 1 1",                   expected: "1 2", hidden: true }
  ],
  languages: {
    "Python": {
      piston: ["python", "python3"],
      mode: "python",
      file: "main.py",
      stub: [
        "def twoSum(numbers, target):",
        "    # numbers is 1-indexed and sorted. Return [i, j] with i < j.",
        "    pass",
        ""
      ].join("\n"),
      harness: [
        "{{USER_CODE}}",
        "",
        "import sys",
        "_t = sys.stdin.read().split()",
        "_p = 0",
        "_T = int(_t[_p]); _p += 1",
        "for _ in range(_T):",
        "    _target = int(_t[_p]); _p += 1",
        "    _n = int(_t[_p]); _p += 1",
        "    _nums = [int(_t[_p + _k]) for _k in range(_n)]",
        "    _p += _n",
        "    _r = twoSum(_nums, _target)",
        "    print(_r[0], _r[1])"
      ].join("\n")
    },
    "JavaScript": {
      piston: ["javascript", "node", "js"],
      mode: "javascript",
      file: "main.js",
      stub: [
        "function twoSum(numbers, target) {",
        "    // numbers is 1-indexed and sorted. Return [i, j] with i < j.",
        "}",
        ""
      ].join("\n"),
      harness: [
        "{{USER_CODE}}",
        "",
        "const _t = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number);",
        "let _p = 0;",
        "const _T = _t[_p++];",
        "for (let _i = 0; _i < _T; _i++) {",
        "  const _target = _t[_p++];",
        "  const _n = _t[_p++];",
        "  const _nums = [];",
        "  for (let _k = 0; _k < _n; _k++) _nums.push(_t[_p++]);",
        "  const _r = twoSum(_nums, _target);",
        "  console.log(_r[0] + ' ' + _r[1]);",
        "}"
      ].join("\n")
    },
    "Java": {
      piston: ["java"],
      mode: "text/x-java",
      file: "Main.java",
      stub: [
        "class Solution {",
        "    public int[] twoSum(int[] numbers, int target) {",
        "        // numbers is 1-indexed and sorted. Return new int[]{i, j} with i < j.",
        "        return new int[]{-1, -1};",
        "    }",
        "}",
        ""
      ].join("\n"),
      harness: [
        "import java.util.*;",
        "{{USER_CODE}}",
        "public class Main {",
        "    public static void main(String[] args) {",
        "        Scanner sc = new Scanner(System.in);",
        "        int T = sc.nextInt();",
        "        Solution sol = new Solution();",
        "        StringBuilder sb = new StringBuilder();",
        "        for (int t = 0; t < T; t++) {",
        "            int target = sc.nextInt();",
        "            int n = sc.nextInt();",
        "            int[] nums = new int[n];",
        "            for (int i = 0; i < n; i++) nums[i] = sc.nextInt();",
        "            int[] r = sol.twoSum(nums, target);",
        "            sb.append(r[0]).append(' ').append(r[1]).append(System.lineSeparator());",
        "        }",
        "        System.out.print(sb);",
        "    }",
        "}"
      ].join("\n")
    },
    "C++": {
      piston: ["c++", "cpp"],
      mode: "text/x-c++src",
      file: "main.cpp",
      stub: [
        "class Solution {",
        "public:",
        "    vector<int> twoSum(vector<int>& numbers, int target) {",
        "        // numbers is 1-indexed and sorted. Return {i, j} with i < j.",
        "        return {-1, -1};",
        "    }",
        "};",
        ""
      ].join("\n"),
      harness: [
        "#include <bits/stdc++.h>",
        "using namespace std;",
        "{{USER_CODE}}",
        "int main() {",
        "    int T;",
        "    if (!(cin >> T)) return 0;",
        "    for (int t = 0; t < T; t++) {",
        "        int target, n;",
        "        cin >> target >> n;",
        "        vector<int> nums(n);",
        "        for (int i = 0; i < n; i++) cin >> nums[i];",
        "        Solution sol;",
        "        vector<int> r = sol.twoSum(nums, target);",
        "        cout << r[0] << ' ' << r[1] << endl;",
        "    }",
        "}"
      ].join("\n")
    }
  }
};
</script>
{% endraw %}

{% include code-judge.html %}

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
