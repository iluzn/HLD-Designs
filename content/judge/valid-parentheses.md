---
layout: default
title: "Valid Parentheses — Online Judge"
description: "Solve Valid Parentheses in the browser. Write code in Python, Java, or C++, run against test cases, and get an instant verdict."
permalink: /judge/valid-parentheses
---

# Valid Parentheses

⚡ **Difficulty:** Easy 🏷️ **Topic:** Stack

Given a string containing only the characters `()[]{}`, determine if the brackets are balanced and correctly nested.

## Input
- A single line: the bracket string `s` (may be empty).

## Output
- `true` if the string is valid, otherwise `false` (lowercase).

## Example
```text
Input:
{[]}

Output:
true
```

---

<script>
window.SC_PROBLEM = {
  id: "valid-parentheses",
  timeLimitMs: 5000,
  starter: {
    python: [
      "import sys",
      "",
      "def is_valid(s):",
      "    # TODO: return True if brackets are balanced, else False",
      "    pass",
      "",
      "s = sys.stdin.readline().rstrip('\\n')",
      "print('true' if is_valid(s) else 'false')"
    ].join("\n"),
    java: [
      "import java.util.*;",
      "",
      "public class Main {",
      "    static boolean isValid(String s) {",
      "        // TODO: return true if brackets are balanced",
      "        return false;",
      "    }",
      "",
      "    public static void main(String[] args) {",
      "        Scanner sc = new Scanner(System.in);",
      "        String s = sc.hasNextLine() ? sc.nextLine() : \"\";",
      "        System.out.println(isValid(s) ? \"true\" : \"false\");",
      "    }",
      "}"
    ].join("\n"),
    cpp: [
      "#include <bits/stdc++.h>",
      "using namespace std;",
      "",
      "bool isValid(string s) {",
      "    // TODO: return true if brackets are balanced",
      "    return false;",
      "}",
      "",
      "int main() {",
      "    string s;",
      "    getline(cin, s);",
      "    cout << (isValid(s) ? \"true\" : \"false\") << endl;",
      "}"
    ].join("\n")
  },
  samples: [
    { input: "()[]{}", output: "true" },
    { input: "(]", output: "false" }
  ],
  tests: [
    { input: "()[]{}", output: "true" },
    { input: "(]", output: "false" },
    { input: "{[]}", output: "true" },
    { input: "([)]", output: "false" },
    { input: "(((", output: "false" },
    { input: "", output: "true" }
  ]
};
</script>

{% include judge.html %}

---

Want the approach? Read the [Valid Parentheses solution](/dsa/valid-parentheses) or browse [all problems](/judge/).
