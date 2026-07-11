---
layout: default
title: "Two Sum — Online Judge"
description: "Solve Two Sum in the browser. Write code in Python, Java, or C++, run against test cases, and get an instant verdict. SystemCraft code judge."
permalink: /judge/two-sum
---

# Two Sum

⚡ **Difficulty:** Easy 🏷️ **Topic:** Arrays + Hashing

Given an array of integers and a target, return the indices of the two numbers that add up to the target.

## Input
- Line 1: integer `n` — the size of the array.
- Line 2: `n` space-separated integers.
- Line 3: the integer `target`.

Exactly one valid answer exists, and you may not use the same element twice.

## Output
- The two **0-based** indices `i j` (with `i < j`) separated by a single space.

## Example
```text
Input:
4
2 7 11 15
9

Output:
0 1
```

Because `nums[0] + nums[1] == 2 + 7 == 9`.

---

<script>
window.SC_PROBLEM = {
  id: "two-sum",
  timeLimitMs: 5000,
  starter: {
    python: [
      "import sys",
      "",
      "def two_sum(nums, target):",
      "    # TODO: return the two indices i, j (i < j)",
      "    pass",
      "",
      "data = sys.stdin.read().split()",
      "n = int(data[0])",
      "nums = list(map(int, data[1:1+n]))",
      "target = int(data[1+n])",
      "i, j = two_sum(nums, target)",
      "print(i, j)"
    ].join("\n"),
    java: [
      "import java.util.*;",
      "",
      "public class Main {",
      "    static int[] twoSum(int[] nums, int target) {",
      "        // TODO: return the two indices {i, j} (i < j)",
      "        return new int[]{-1, -1};",
      "    }",
      "",
      "    public static void main(String[] args) {",
      "        Scanner sc = new Scanner(System.in);",
      "        int n = sc.nextInt();",
      "        int[] nums = new int[n];",
      "        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();",
      "        int target = sc.nextInt();",
      "        int[] r = twoSum(nums, target);",
      "        System.out.println(r[0] + \" \" + r[1]);",
      "    }",
      "}"
    ].join("\n"),
    cpp: [
      "#include <bits/stdc++.h>",
      "using namespace std;",
      "",
      "pair<int,int> twoSum(vector<int>& nums, int target) {",
      "    // TODO: return the two indices (i, j) with i < j",
      "    return {-1, -1};",
      "}",
      "",
      "int main() {",
      "    int n; cin >> n;",
      "    vector<int> nums(n);",
      "    for (int i = 0; i < n; i++) cin >> nums[i];",
      "    int target; cin >> target;",
      "    auto r = twoSum(nums, target);",
      "    cout << r.first << \" \" << r.second << endl;",
      "}"
    ].join("\n")
  },
  samples: [
    { input: "4\n2 7 11 15\n9", output: "0 1" },
    { input: "3\n3 2 4\n6", output: "1 2" }
  ],
  tests: [
    { input: "4\n2 7 11 15\n9", output: "0 1" },
    { input: "3\n3 2 4\n6", output: "1 2" },
    { input: "2\n3 3\n6", output: "0 1" },
    { input: "5\n1 5 3 8 2\n10", output: "1 3" },
    { input: "6\n-3 4 3 90 0 -1\n0", output: "0 2" }
  ]
};
</script>

{% include judge.html %}

---

Want the full explanation and optimal approach? Read the [Two Sum II solution walkthrough](/dsa/two-sum-ii) or browse [all problems](/judge/).
