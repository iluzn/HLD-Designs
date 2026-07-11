---
layout: lc
title: "Two Sum II - Input Array Is Sorted — Online Judge"
description: "Solve Two Sum II (sorted array, two pointers) like LeetCode. Implement the function in Python, Java, C++, or JavaScript and get an instant verdict."
permalink: /judge/two-sum-ii
---

# Two Sum II - Input Array Is Sorted

<span class="lc-diff medium">Medium</span>
<div class="lc-tags"><span class="lc-tag">Array</span><span class="lc-tag">Two Pointers</span><span class="lc-tag">Binary Search</span></div>

Given a **1-indexed** array of integers `numbers` that is already **sorted in non-decreasing order**, find two numbers that add up to `target`.

Return the indices of the two numbers, `index1` and `index2`, **added by one**, as an array `[index1, index2]` where `1 <= index1 < index2 <= numbers.length`.

The tests are generated such that there is **exactly one solution**. You may not use the same element twice. Your solution must use only constant extra space.

## Example 1
```text
Input:  numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: 2 + 7 = 9, so index1 = 1, index2 = 2.
```

## Example 2
```text
Input:  numbers = [2,3,4], target = 6
Output: [1,3]
```

## Constraints
- `2 <= numbers.length <= 3 * 10^4`
- `numbers` is sorted in non-decreasing order.
- Exactly one solution exists.

<script>
window.SC_LC = {
  id: "two-sum-ii",
  functionName: "twoSum",
  sampleCount: 2,
  langs: {
    python: {
      stub: [
        "class Solution:",
        "    def twoSum(self, numbers, target):",
        "        # numbers is 1-indexed and sorted; return [i, j] (1-indexed)",
        "        pass"
      ].join("\n"),
      harness: [
        "import sys",
        "_d = sys.stdin.read().split()",
        "_n = int(_d[0])",
        "_nums = list(map(int, _d[1:1+_n]))",
        "_t = int(_d[1+_n])",
        "_r = Solution().twoSum(_nums, _t)",
        "print(_r[0], _r[1])"
      ].join("\n")
    },
    javascript: {
      stub: [
        "/**",
        " * @param {number[]} numbers",
        " * @param {number} target",
        " * @return {number[]}",
        " */",
        "var twoSum = function(numbers, target) {",
        "    // Write your code here",
        "};"
      ].join("\n"),
      harness: [
        "const _d = require('fs').readFileSync(0, 'utf8').split(/\\s+/).filter(function(x){return x.length;});",
        "const _n = +_d[0];",
        "const _nums = _d.slice(1, 1 + _n).map(Number);",
        "const _t = +_d[1 + _n];",
        "const _r = twoSum(_nums, _t);",
        "console.log(_r[0] + ' ' + _r[1]);"
      ].join("\n")
    },
    cpp: {
      stub: [
        "#include <bits/stdc++.h>",
        "using namespace std;",
        "",
        "class Solution {",
        "public:",
        "    vector<int> twoSum(vector<int>& numbers, int target) {",
        "        // Write your code here",
        "    }",
        "};"
      ].join("\n"),
      harness: [
        "int main() {",
        "    int n; cin >> n;",
        "    vector<int> numbers(n);",
        "    for (int i = 0; i < n; i++) cin >> numbers[i];",
        "    int t; cin >> t;",
        "    vector<int> r = Solution().twoSum(numbers, t);",
        "    cout << r[0] << ' ' << r[1] << endl;",
        "}"
      ].join("\n")
    },
    java: {
      stub: [
        "import java.util.*;",
        "",
        "class Solution {",
        "    public int[] twoSum(int[] numbers, int target) {",
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
        "        int[] numbers = new int[n];",
        "        for (int i = 0; i < n; i++) numbers[i] = sc.nextInt();",
        "        int t = sc.nextInt();",
        "        int[] r = new Solution().twoSum(numbers, t);",
        "        System.out.println(r[0] + \" \" + r[1]);",
        "    }",
        "}"
      ].join("\n")
    }
  },
  cases: [
    { stdin: "4\n2 7 11 15\n9", expected: "1 2", display: { numbers: "[2,7,11,15]", target: "9" } },
    { stdin: "3\n2 3 4\n6", expected: "1 3", display: { numbers: "[2,3,4]", target: "6" } },
    { stdin: "2\n-1 0\n-1", expected: "1 2", display: { numbers: "[-1,0]", target: "-1" } },
    { stdin: "5\n1 3 4 5 7\n9", expected: "3 4", display: { numbers: "[1,3,4,5,7]", target: "9" } },
    { stdin: "6\n1 2 3 4 4 9\n8", expected: "4 5", display: { numbers: "[1,2,3,4,4,9]", target: "8" } }
  ]
};
</script>
