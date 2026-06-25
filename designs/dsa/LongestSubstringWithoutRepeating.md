---
layout: default
title: "Longest Substring Without Repeating Characters"
description: "Sliding Window pattern: find the longest substring with all unique characters. O(n) time, O(min(n,alphabet)) space."
permalink: /dsa/longest-substring-without-repeating
---

# Longest Substring Without Repeating Characters

⚡ **Difficulty:** Medium 🏷️ **Pattern:** Sliding Window 🏢 **Asked at:** Amazon, Google, Meta, Bloomberg, PhonePe

---

## Problem

Given a string `s`, find the length of the **longest substring** without repeating characters.

**Constraints:**
- `0 ≤ s.length ≤ 50,000`
- `s` consists of English letters, digits, symbols, and spaces.

**Examples:**
```
Input:  "abcabcbb"    Output: 3  (abc)
Input:  "bbbbb"       Output: 1  (b)
Input:  "pwwkew"      Output: 3  (wke)
```

---

## Approach

### Why Sliding Window?

We need a **contiguous substring** with a constraint ("no repeating characters"). That's the exact trigger for Sliding Window:
- Expand the window by moving `right`.
- When a duplicate enters, shrink from `left` until the window is valid again.
- Track the maximum window size.

### Implementation trick

Use a HashMap/Set to track characters in the current window. When `s[right]` is already in the map, advance `left` past the previous occurrence of that character (jump, not one-by-one).

---

## Complexity

| | Time | Space |
|---|---|---|
| Sliding Window | O(n) | O(min(n, 128)) — at most the character set |
| Brute force | O(n³) | O(n) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int lengthOfLongestSubstring(String s) {
    Map&lt;Character, Integer&gt; lastSeen = new HashMap&lt;&gt;();
    int maxLen = 0, left = 0;

    for (int right = 0; right &lt; s.length(); right++) {
        char c = s.charAt(right);
        if (lastSeen.containsKey(c) &amp;&amp; lastSeen.get(c) &gt;= left) {
            left = lastSeen.get(c) + 1; // jump past the duplicate
        }
        lastSeen.put(c, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def lengthOfLongestSubstring(s: str) -&gt; int:
    last_seen = {}
    max_len = left = 0

    for right, c in enumerate(s):
        if c in last_seen and last_seen[c] &gt;= left:
            left = last_seen[c] + 1
        last_seen[c] = right
        max_len = max(max_len, right - left + 1)

    return max_len</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">int lengthOfLongestSubstring(string s) {
    unordered_map&lt;char, int&gt; lastSeen;
    int maxLen = 0, left = 0;

    for (int right = 0; right &lt; s.size(); right++) {
        char c = s[right];
        if (lastSeen.count(c) &amp;&amp; lastSeen[c] &gt;= left) {
            left = lastSeen[c] + 1;
        }
        lastSeen[c] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}</code></pre>
</div>
</div>

---

## Key Insight

> The `left = lastSeen[c] + 1` jump is what makes this O(n) instead of O(n²). You don't shrink one character at a time — you teleport `left` past the conflict. The `lastSeen[c] >= left` check ensures you don't jump backward (the old occurrence might be before the current window).

---

## Walkthrough

```
s = "abcabcbb"

right=0: a → window "a", max=1
right=1: b → window "ab", max=2
right=2: c → window "abc", max=3
right=3: a → lastSeen[a]=0 >= left=0 → left=1, window "bca", max=3
right=4: b → lastSeen[b]=1 >= left=1 → left=2, window "cab", max=3
right=5: c → lastSeen[c]=2 >= left=2 → left=3, window "abc", max=3
right=6: b → lastSeen[b]=4 >= left=3 → left=5, window "cb", max=3
right=7: b → lastSeen[b]=6 >= left=5 → left=7, window "b", max=3

Answer: 3
```

---

## Follow-ups

- **Longest substring with at most K distinct characters** → Same window, but track distinct count instead of duplicates.
- **Minimum window substring** → Window shrinks when all required characters are found.
- **Longest repeating character replacement** → Window + "max frequency in window" trick.

---

## Related Problems

- [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) (Hard)
- [Longest Substring with At Most K Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/)
- [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) (Monotonic Deque)

---

*Drop a comment below if you want a follow-up on Minimum Window Substring 👇*
