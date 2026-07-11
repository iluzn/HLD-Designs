---
layout: default
title: "Word Break"
description: "DP pattern: can a string be segmented into dictionary words? Boolean DP over prefixes. PhonePe DSA favorite."
permalink: /dsa/word-break
---

# Word Break

⚡ **Difficulty:** Medium 🏷️ **Pattern:** Dynamic Programming 🏢 **Asked at:** PhonePe, Amazon, Google, Meta

---

## Problem

Given a string `s` and a dictionary `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words. Words may be reused.

**Example:**
```
s = "leetcode", wordDict = ["leet", "code"]  →  true
s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]  →  false
```

---

## Approach

### Why brute-force backtracking is exponential

Trying every split point recursively re-solves the same suffixes over and over (`"catsandog"` → recompute `"andog"` from many prefixes) → **O(2^n)**.

### Boolean DP over prefixes

`dp[i]` = "can the first `i` characters of `s` be fully segmented?"
- `dp[0] = true` (empty string trivially segments).
- For each `i`, look for a split point `j < i` where `dp[j]` is true **and** `s[j..i)` is a dictionary word. If any works, `dp[i] = true`.

Put the dictionary in a **HashSet** for O(1) lookups.

---

## Complexity

| | Time | Space |
|---|---|---|
| DP + HashSet | O(n² × L) | O(n + dict) |
| Brute force | O(2^n) | O(n) |

*(L = average word length for the substring hash.)*

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public boolean wordBreak(String s, List&lt;String&gt; wordDict) {
    Set&lt;String&gt; dict = new HashSet&lt;&gt;(wordDict);
    int n = s.length();
    boolean[] dp = new boolean[n + 1];
    dp[0] = true;

    for (int i = 1; i &lt;= n; i++) {
        for (int j = 0; j &lt; i; j++) {
            if (dp[j] &amp;&amp; dict.contains(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[n];
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def wordBreak(s, wordDict):
    dict_set = set(wordDict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True

    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in dict_set:
                dp[i] = True
                break
    return dp[n]</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">bool wordBreak(string s, vector&lt;string&gt;&amp; wordDict) {
    unordered_set&lt;string&gt; dict(wordDict.begin(), wordDict.end());
    int n = s.size();
    vector&lt;bool&gt; dp(n + 1, false);
    dp[0] = true;

    for (int i = 1; i &lt;= n; i++)
        for (int j = 0; j &lt; i; j++)
            if (dp[j] &amp;&amp; dict.count(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
    return dp[n];
}</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> "Can this sequence be built from allowed pieces?" is a reachability DP: `dp[i]` is reachable if some earlier reachable point `dp[j]` connects to `i` via a valid piece. The dictionary set turns the piece-check into O(1), and the break exits early once any valid split is found.

---

## Follow-ups

- **Return all sentences (Word Break II)** → [LC 140](https://leetcode.com/problems/word-break-ii/): backtracking + memo of segmentations per suffix.
- **Optimize inner loop** → Only try `j` values within the max dictionary word length of `i`.
- **Trie instead of HashSet** → Avoids repeated substring allocation; useful for large dictionaries.

---

## Related Problems

- [Word Break II](https://leetcode.com/problems/word-break-ii/)
- [Coin Change](/dsa/coin-change) (same reachability shape)
- [Word Break (LC 139)](https://leetcode.com/problems/word-break/)

---

*Drop a comment below if you want the Word Break II backtracking version 👇*
