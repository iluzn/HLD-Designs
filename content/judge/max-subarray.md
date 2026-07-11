---
layout: lc
title: "Maximum Subarray — Online Judge"
description: "Solve Maximum Subarray (Kadane's algorithm) like LeetCode. Implement the function in Python, Java, C++, or JavaScript and get an instant verdict."
permalink: /judge/max-subarray
---

# Maximum Subarray

<span class="lc-diff medium">Medium</span>
<div class="lc-tags"><span class="lc-tag">Array</span><span class="lc-tag">Dynamic Programming</span><span class="lc-tag">Divide and Conquer</span></div>

Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum, and return **its sum**.

## Example 1
```text
Input:  nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
```

## Example 2
```text
Input:  nums = [5,4,-1,7,8]
Output: 23
```

## Constraints
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

<script>
window.SC_LC = {
  id: "max-subarray",
  functionName: "maxSubArray",
  sampleCount: 2,
  langs: {
    python: {
      stub: [
        "class Solution:",
        "    def maxSubArray(self, nums):",
        "        # Write your code here",
        "        pass"
      ].join("\n"),
      harness: [
        "import sys",
        "_d = sys.stdin.read().split()",
        "_n = int(_d[0])",
        "_nums = list(map(int, _d[1:1+_n]))",
        "print(Solution().maxSubArray(_nums))"
      ].join("\n")
    },
    javascript: {
      stub: [
        "/**",
        " * @param {number[]} nums",
        " * @return {number}",
        " */",
        "var maxSubArray = function(nums) {",
        "    // Write your code here",
        "};"
      ].join("\n"),
      harness: [
        "const _d = require('fs').readFileSync(0, 'utf8').split(/\\s+/).filter(function(x){return x.length;});",
        "const _n = +_d[0];",
        "const _nums = _d.slice(1, 1 + _n).map(Number);",
        "console.log(maxSubArray(_nums));"
      ].join("\n")
    },
    cpp: {
      stub: [
        "#include <bits/stdc++.h>",
        "using namespace std;",
        "",
        "class Solution {",
        "public:",
        "    int maxSubArray(vector<int>& nums) {",
        "        // Write your code here",
        "    }",
        "};"
      ].join("\n"),
      harness: [
        "int main() {",
        "    int n; cin >> n;",
        "    vector<int> nums(n);",
        "    for (int i = 0; i < n; i++) cin >> nums[i];",
        "    cout << Solution().maxSubArray(nums) << endl;",
        "}"
      ].join("\n")
    },
    java: {
      stub: [
        "import java.util.*;",
        "",
        "class Solution {",
        "    public int maxSubArray(int[] nums) {",
        "        // Write your code here",
        "        return 0;",
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
        "        System.out.println(new Solution().maxSubArray(nums));",
        "    }",
        "}"
      ].join("\n")
    }
  },
  cases: [
    { stdin: "9\n-2 1 -3 4 -1 2 1 -5 4", expected: "6", display: { nums: "[-2,1,-3,4,-1,2,1,-5,4]" } },
    { stdin: "5\n5 4 -1 7 8", expected: "23", display: { nums: "[5,4,-1,7,8]" } },
    { stdin: "1\n-1", expected: "-1", display: { nums: "[-1]" } },
    { stdin: "4\n-2 -3 -1 -5", expected: "-1", display: { nums: "[-2,-3,-1,-5]" } },
    { stdin: "6\n1 2 3 4 5 6", expected: "21", display: { nums: "[1,2,3,4,5,6]" } }
  ]
};
</script>
