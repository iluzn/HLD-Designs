---
layout: default
title: "Valid Parentheses"
description: "Stack pattern: check if brackets are balanced and correctly nested. Push opens, match closes. PhonePe warm-up question."
permalink: /dsa/valid-parentheses
---

# Valid Parentheses

⚡ **Difficulty:** Easy 🏷️ **Pattern:** Stack 🏢 **Asked at:** PhonePe, Amazon, Google, Microsoft

---

## Problem

Given a string of `()[]{}`, return `true` if every bracket is closed by the same type in the correct order.

**Example:**
```
"()[]{}"  →  true
"(]"      →  false
"([)]"    →  false
"{[]}"    →  true
```

---

## Approach

### Why a stack

Brackets close in **LIFO** order — the most recently opened bracket must be the first to close. That's exactly a stack.

- On an **opening** bracket, push it.
- On a **closing** bracket, the top of the stack must be its matching open. If the stack is empty or the top doesn't match, it's invalid.
- At the end, the stack must be **empty** (no unclosed opens).

A map from closing → opening keeps the matching clean.

---

## Complexity

| | Time | Space |
|---|---|---|
| Stack | O(n) | O(n) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public boolean isValid(String s) {
    Deque&lt;Character&gt; stack = new ArrayDeque&lt;&gt;();
    Map&lt;Character, Character&gt; match = Map.of(')', '(', ']', '[', '}', '{');

    for (char c : s.toCharArray()) {
        if (match.containsKey(c)) {          // closing bracket
            if (stack.isEmpty() || stack.pop() != match.get(c)) return false;
        } else {
            stack.push(c);                   // opening bracket
        }
    }
    return stack.isEmpty();
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def isValid(s):
    stack = []
    match = {')': '(', ']': '[', '}': '{'}
    for c in s:
        if c in match:
            if not stack or stack.pop() != match[c]:
                return False
        else:
            stack.append(c)
    return not stack</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">bool isValid(string s) {
    stack&lt;char&gt; st;
    unordered_map&lt;char, char&gt; match = {{')','('}, {']','['}, {'}','{'}};
    for (char c : s) {
        if (match.count(c)) {
            if (st.empty() || st.top() != match[c]) return false;
            st.pop();
        } else {
            st.push(c);
        }
    }
    return st.empty();
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> Matching-pairs problems that must respect nesting order are stacks: the last thing opened is the first that must close. The two failure modes are a **closing bracket with a wrong/absent partner** (fail mid-scan) and **leftover opens** (non-empty stack at the end).

---

## Follow-ups

- **Longest valid parentheses substring** → [LC 32](https://leetcode.com/problems/longest-valid-parentheses/): stack of indices or DP.
- **Minimum removals to make valid** → count unmatched opens/closes in one pass.
- **Only one bracket type?** → A counter suffices; no stack needed.

---

## Related Problems

- [Min Stack](https://leetcode.com/problems/min-stack/)
- [Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/)
- [Valid Parentheses (LC 20)](https://leetcode.com/problems/valid-parentheses/)

---

*Drop a comment below if you want the minimum-removals variant 👇*
