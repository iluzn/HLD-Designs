---
layout: lc
title: "Longest Substring Without Repeating Characters - Online Judge"
description: "Solve Longest Substring Without Repeating Characters like LeetCode in Python, Java, C++, or JavaScript with instant verdicts and test cases."
permalink: /dsa/problem/longest-substring-without-repeating-characters
---
{% raw %}
<h1>Longest Substring Without Repeating Characters</h1>
<span class="lc-diff medium">Medium</span>
<details class="lc-topics"><summary>Topics</summary><div class="lc-tags"><span class="lc-tag">String</span><span class="lc-tag">Sliding Window</span><span class="lc-tag">Hash Table</span></div></details>
<p>Given a string <code>s</code>, find the length of the longest substring without repeating characters.</p>
<h2>Example 1</h2><pre>Input:  s = "abcabcbb"
Output: 3
Explanation: The answer is "abc".</pre>
<h2>Example 2</h2><pre>Input:  s = "bbbbb"
Output: 1</pre>
<h2>Constraints</h2><ul><li>0 &lt;= s.length &lt;= 5*10^4</li><li>s consists of English letters, digits, symbols and spaces.</li></ul>
<script>
window.SC_LC = {"id":"longest-substring-without-repeating-characters","editorial":"<h2>Approach: Sliding Window</h2><pre><code>def lengthOfLongestSubstring(s):\n    seen = {}\n    left = best = 0\n    for right, c in enumerate(s):\n        if c in seen and seen[c] >= left:\n            left = seen[c] + 1\n        seen[c] = right\n        best = max(best, right - left + 1)\n    return best</code></pre><p><b>Complexity:</b> O(n) time, O(min(n, charset)) space.</p>","langs":{"java":{"stub":"import java.util.*;\n\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n        return 0;\n    }\n}","harness":"public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():\"\";sb.append(new Solution().lengthOfLongestSubstring(s)).append(\"\\n\");}System.out.print(sb);}}"},"python":{"stub":"class Solution:\n    def lengthOfLongestSubstring(self, s):\n        # Write your code here\n        pass","harness":"import sys\n_l=sys.stdin.read().split('\\n')\n_T=int(_l[0]);_o=[]\nfor _i in range(_T):\n    _s=_l[1+_i] if 1+_i<len(_l) else \"\"\n    _o.append(str(Solution().lengthOfLongestSubstring(_s)))\nprint('\\n'.join(_o))"},"cpp":{"stub":"#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your code here\n    }\n};","harness":"int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s=\"\";cout<<Solution().lengthOfLongestSubstring(s)<<\"\\n\";}}"},"javascript":{"stub":"/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n    // Write your code here\n};","harness":"const _l=require('fs').readFileSync(0,'utf8').split('\\n');const _T=+_l[0];const _o=[];\nfor(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\\r$/,'');_o.push(String(lengthOfLongestSubstring(_s)));}\nconsole.log(_o.join('\\n'));"}},"cases":[{"stdin":"","expected":"3","display":{}}]};
</script>
{% endraw %}
