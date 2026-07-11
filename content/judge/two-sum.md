---
layout: lc
title: "Two Sum — Online Judge"
description: "Solve Two Sum in the browser like LeetCode. Implement the function in Python, Java, C++, or JavaScript, run against test cases, and get an instant verdict."
permalink: /judge/two-sum
---

# Two Sum

<span class="lc-diff easy">Easy</span>
<div class="lc-tags"><span class="lc-tag">Array</span><span class="lc-tag">Hash Table</span></div>

Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.

You may assume that each input has **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.

## Example 1
```text
Input:  nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] == 9, so we return [0, 1].
```

## Example 2
```text
Input:  nums = [3,2,4], target = 6
Output: [1,2]
```

## Constraints
- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- Only one valid answer exists.

<script>
window.SC_LC = {
  id: "two-sum",
  functionName: "twoSum",
  sampleCount: 3,
  langs: {
    python: {
      stub: [
        "class Solution:",
        "    def twoSum(self, nums, target):",
        "        # Write your code here",
        "        pass"
      ].join("\n"),
      harness: [
        "import sys",
        "_d = sys.stdin.read().split()",
        "_n = int(_d[0])",
        "_nums = list(map(int, _d[1:1+_n]))",
        "_t = int(_d[1+_n])",
        "_r = Solution().twoSum(_nums, _t)",
        "print(*sorted(_r))"
      ].join("\n")
    },
    javascript: {
      stub: [
        "/**",
        " * @param {number[]} nums",
        " * @param {number} target",
        " * @return {number[]}",
        " */",
        "var twoSum = function(nums, target) {",
        "    // Write your code here",
        "};"
      ].join("\n"),
      harness: [
        "const _d = require('fs').readFileSync(0, 'utf8').split(/\\s+/).filter(function(x){return x.length;});",
        "const _n = +_d[0];",
        "const _nums = _d.slice(1, 1 + _n).map(Number);",
        "const _t = +_d[1 + _n];",
        "const _r = twoSum(_nums, _t).slice().sort(function(a, b){return a - b;});",
        "console.log(_r.join(' '));"
      ].join("\n")
    },
    cpp: {
      stub: [
        "#include <bits/stdc++.h>",
        "using namespace std;",
        "",
        "class Solution {",
        "public:",
        "    vector<int> twoSum(vector<int>& nums, int target) {",
        "        // Write your code here",
        "    }",
        "};"
      ].join("\n"),
      harness: [
        "int main() {",
        "    int n; cin >> n;",
        "    vector<int> nums(n);",
        "    for (int i = 0; i < n; i++) cin >> nums[i];",
        "    int t; cin >> t;",
        "    Solution s;",
        "    vector<int> r = s.twoSum(nums, t);",
        "    sort(r.begin(), r.end());",
        "    for (size_t i = 0; i < r.size(); i++) { if (i) cout << ' '; cout << r[i]; }",
        "    cout << endl;",
        "}"
      ].join("\n")
    },
    java: {
      stub: [
        "import java.util.*;",
        "",
        "class Solution {",
        "    public int[] twoSum(int[] nums, int target) {",
        "        // Write your code here",
        "        return new int[]{};",
        "    }",
        "}"
      ].join("\n"),
      harness: [
        "public class Main {",
        "    public static void main(String[] args) {",
        "        Scanner sc = new Scanner(System.in);",
        "        int n = sc.nextInt();",
        "        int[] nums = new int[n];",
        "        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();",
        "        int t = sc.nextInt();",
        "        int[] r = new Solution().twoSum(nums, t);",
        "        Arrays.sort(r);",
        "        StringBuilder sb = new StringBuilder();",
        "        for (int i = 0; i < r.length; i++) { if (i > 0) sb.append(' '); sb.append(r[i]); }",
        "        System.out.println(sb.toString().trim());",
        "    }",
        "}"
      ].join("\n")
    }
  },
  cases: [
    { stdin: "4\n2 7 11 15\n9", expected: "0 1", display: { nums: "[2,7,11,15]", target: "9" } },
    { stdin: "3\n3 2 4\n6", expected: "1 2", display: { nums: "[3,2,4]", target: "6" } },
    { stdin: "2\n3 3\n6", expected: "0 1", display: { nums: "[3,3]", target: "6" } },
    { stdin: "5\n1 5 3 8 2\n10", expected: "3 4", display: { nums: "[1,5,3,8,2]", target: "10" } },
    { stdin: "6\n-3 4 3 90 0 -1\n0", expected: "0 2", display: { nums: "[-3,4,3,90,0,-1]", target: "0" } }
  ]
};
</script>
