---
layout: default
title: "Edit Distance"
description: "2D DP pattern: minimum insert/delete/replace operations to turn one string into another (Levenshtein distance). PhonePe favorite."
permalink: /dsa/edit-distance
---

# Edit Distance

⚡ **Difficulty:** Medium 🏷️ **Pattern:** 2D Dynamic Programming 🏢 **Asked at:** PhonePe, Amazon, Google, Microsoft

---

## Problem

Given two strings `word1` and `word2`, return the minimum number of operations to convert `word1` into `word2`. Allowed operations: **insert**, **delete**, or **replace** a single character.

**Example:**
```
word1 = "horse", word2 = "ros"  →  3
horse → rorse (replace h→r) → rose (delete r) → ros (delete e)
```

---

## Approach

### State

`dp[i][j]` = min operations to convert the first `i` characters of `word1` into the first `j` characters of `word2`.

### Recurrence

- If `word1[i-1] == word2[j-1]`: characters match, no cost → `dp[i][j] = dp[i-1][j-1]`.
- Else take `1 +` the cheapest of three moves:
  - **Replace** → `dp[i-1][j-1]`
  - **Delete** from word1 → `dp[i-1][j]`
  - **Insert** into word1 → `dp[i][j-1]`

### Base cases

- `dp[0][j] = j` (insert `j` chars into an empty string).
- `dp[i][0] = i` (delete all `i` chars).

---

## Complexity

| | Time | Space |
|---|---|---|
| 2D table | O(m × n) | O(m × n) |
| Rolling rows | O(m × n) | O(min(m, n)) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 0; i &lt;= m; i++) dp[i][0] = i;
    for (int j = 0; j &lt;= n; j++) dp[0][j] = j;

    for (int i = 1; i &lt;= m; i++) {
        for (int j = 1; j &lt;= n; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j - 1],
                              Math.min(dp[i - 1][j], dp[i][j - 1]));
            }
        }
    }
    return dp[m][n];
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">int minDistance(string word1, string word2) {
    int m = word1.size(), n = word2.size();
    vector&lt;vector&lt;int&gt;&gt; dp(m + 1, vector&lt;int&gt;(n + 1));

    for (int i = 0; i &lt;= m; i++) dp[i][0] = i;
    for (int j = 0; j &lt;= n; j++) dp[0][j] = j;

    for (int i = 1; i &lt;= m; i++)
        for (int j = 1; j &lt;= n; j++)
            if (word1[i - 1] == word2[j - 1])
                dp[i][j] = dp[i - 1][j - 1];
            else
                dp[i][j] = 1 + min({dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]});
    return dp[m][n];
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> The three edit operations map cleanly to three neighboring cells: **replace** = diagonal, **delete** = up, **insert** = left. When characters match, you inherit the diagonal for free. This diagonal/up/left structure is the signature of nearly every two-string DP (LCS, regex matching, alignment).

---

## Walkthrough

```
        ""  r  o  s
    ""   0  1  2  3
    h    1  1  2  3
    o    2  2  1  2
    r    3  2  2  2
    s    4  3  3  2
    e    5  4  4  3   → answer 3
```

---

## Follow-ups

- **Reconstruct the actual edits?** → Walk back from `dp[m][n]` choosing which neighbor produced each value.
- **Different operation costs?** → Multiply each move by its cost inside the `min`.
- **Space optimize** → Only the previous row is needed → O(n) space.

---

## Related Problems

- [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
- [Coin Change](/dsa/coin-change)
- [Edit Distance (LC 72)](https://leetcode.com/problems/edit-distance/)

---

*Drop a comment below if you want the O(n)-space rolling version 👇*
