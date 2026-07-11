---
layout: default
title: "Maximum Subarray — Online Judge"
description: "Solve Maximum Subarray (Kadane's algorithm) in the browser. Run against test cases in Python, Java, or C++ and get an instant verdict."
permalink: /judge/max-subarray
---

# Maximum Subarray

⚡ **Difficulty:** Medium 🏷️ **Topic:** Dynamic Programming (Kadane's)

Given an integer array, find the contiguous subarray with the largest sum and return that sum.

## Input
- Line 1: integer `n` — the size of the array.
- Line 2: `n` space-separated integers (may be negative).

## Output
- A single integer: the maximum subarray sum.

## Example
```text
Input:
9
-2 1 -3 4 -1 2 1 -5 4

Output:
6
```

The subarray `[4, -1, 2, 1]` has the largest sum `6`.

---

<script>
window.SC_PROBLEM = {
  id: "max-subarray",
  timeLimitMs: 5000,
  starter: {
    python: [
      "import sys",
      "",
      "def max_subarray(nums):",
      "    # TODO: return the maximum contiguous subarray sum",
      "    pass",
      "",
      "data = sys.stdin.read().split()",
      "n = int(data[0])",
      "nums = list(map(int, data[1:1+n]))",
      "print(max_subarray(nums))"
    ].join("\n"),
    java: [
      "import java.util.*;",
      "",
      "public class Main {",
      "    static long maxSubArray(int[] nums) {",
      "        // TODO: return the maximum contiguous subarray sum",
      "        return 0;",
      "    }",
      "",
      "    public static void main(String[] args) {",
      "        Scanner sc = new Scanner(System.in);",
      "        int n = sc.nextInt();",
      "        int[] nums = new int[n];",
      "        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();",
      "        System.out.println(maxSubArray(nums));",
      "    }",
      "}"
    ].join("\n"),
    cpp: [
      "#include <bits/stdc++.h>",
      "using namespace std;",
      "",
      "long long maxSubArray(vector<int>& nums) {",
      "    // TODO: return the maximum contiguous subarray sum",
      "    return 0;",
      "}",
      "",
      "int main() {",
      "    int n; cin >> n;",
      "    vector<int> nums(n);",
      "    for (int i = 0; i < n; i++) cin >> nums[i];",
      "    cout << maxSubArray(nums) << endl;",
      "}"
    ].join("\n")
  },
  samples: [
    { input: "9\n-2 1 -3 4 -1 2 1 -5 4", output: "6" },
    { input: "1\n-1", output: "-1" }
  ],
  tests: [
    { input: "9\n-2 1 -3 4 -1 2 1 -5 4", output: "6" },
    { input: "1\n-1", output: "-1" },
    { input: "5\n5 4 -1 7 8", output: "23" },
    { input: "4\n-2 -3 -1 -5", output: "-1" },
    { input: "6\n1 2 3 4 5 6", output: "21" }
  ]
};
</script>

{% include judge.html %}

---

New to Kadane's algorithm? See the pattern in the [DSA fundamentals](/dsa-fundamentals) or browse [all problems](/judge/).
