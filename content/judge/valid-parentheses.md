---
layout: lc
title: "Valid Parentheses — Online Judge"
description: "Solve Valid Parentheses like LeetCode. Implement the function in Python, Java, C++, or JavaScript, run against test cases, and get an instant verdict."
permalink: /judge/valid-parentheses
---

# Valid Parentheses

<span class="lc-diff easy">Easy</span>
<div class="lc-tags"><span class="lc-tag">String</span><span class="lc-tag">Stack</span></div>

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if open brackets are closed by the same type of brackets, and open brackets are closed in the correct order.

## Example 1
```text
Input:  s = "()[]{}"
Output: true
```

## Example 2
```text
Input:  s = "([)]"
Output: false
```

## Constraints
- `1 <= s.length <= 10^4`
- `s` consists of parentheses only `()[]{}`.

<script>
window.SC_LC = {
  id: "valid-parentheses",
  functionName: "isValid",
  sampleCount: 3,
  langs: {
    python: {
      stub: [
        "class Solution:",
        "    def isValid(self, s):",
        "        # Write your code here",
        "        pass"
      ].join("\n"),
      harness: [
        "import sys",
        "_s = sys.stdin.readline().rstrip('\\n')",
        "print('true' if Solution().isValid(_s) else 'false')"
      ].join("\n")
    },
    javascript: {
      stub: [
        "/**",
        " * @param {string} s",
        " * @return {boolean}",
        " */",
        "var isValid = function(s) {",
        "    // Write your code here",
        "};"
      ].join("\n"),
      harness: [
        "const _s = require('fs').readFileSync(0, 'utf8').replace(/\\n$/, '');",
        "console.log(isValid(_s) ? 'true' : 'false');"
      ].join("\n")
    },
    cpp: {
      stub: [
        "#include <bits/stdc++.h>",
        "using namespace std;",
        "",
        "class Solution {",
        "public:",
        "    bool isValid(string s) {",
        "        // Write your code here",
        "    }",
        "};"
      ].join("\n"),
      harness: [
        "int main() {",
        "    string s;",
        "    getline(cin, s);",
        "    cout << (Solution().isValid(s) ? \"true\" : \"false\") << endl;",
        "}"
      ].join("\n")
    },
    java: {
      stub: [
        "import java.util.*;",
        "",
        "class Solution {",
        "    public boolean isValid(String s) {",
        "        // Write your code here",
        "        return false;",
        "    }",
        "}"
      ].join("\n"),
      harness: [
        "public class Main {",
        "    public static void main(String[] args) {",
        "        Scanner sc = new Scanner(System.in);",
        "        String s = sc.hasNextLine() ? sc.nextLine() : \"\";",
        "        System.out.println(new Solution().isValid(s) ? \"true\" : \"false\");",
        "    }",
        "}"
      ].join("\n")
    }
  },
  cases: [
    { stdin: "()[]{}", expected: "true", display: { s: "()[]{}" } },
    { stdin: "(]", expected: "false", display: { s: "(]" } },
    { stdin: "{[]}", expected: "true", display: { s: "{[]}" } },
    { stdin: "([)]", expected: "false", display: { s: "([)]" } },
    { stdin: "(((", expected: "false", display: { s: "(((" } }
  ]
};
</script>
