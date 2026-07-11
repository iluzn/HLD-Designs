---
layout: lc
title: "Palindrome Number - Online Judge"
description: "Solve Palindrome Number like LeetCode in Python, Java, C++, or JavaScript with instant verdicts and test cases."
permalink: /dsa/problem/palindrome-number
---
{% raw %}
<h1>Palindrome Number</h1>
<span class="lc-diff easy">Easy</span>
<details class="lc-topics"><summary>Topics</summary><div class="lc-tags"><span class="lc-tag">Math</span></div></details>
<p>Given an integer <code>n</code>, return <code>true</code> if it is a palindrome (reads the same backward as forward). Negative numbers are not palindromes.</p>
<h2>Example 1</h2><pre>Input:  n = 121
Output: true</pre>
<h2>Example 2</h2><pre>Input:  n = -121
Output: false</pre>
<h2>Example 3</h2><pre>Input:  n = 10
Output: false</pre>
<h2>Constraints</h2><ul><li>-2^31 &lt;= n &lt;= 2^31 - 1</li></ul>
<script>
window.SC_LC = {"id":"palindrome-number","editorial":"<h2>Approach: Reverse and compare</h2><pre><code>def isPalindrome(n):\n    if n < 0: return False\n    return str(n) == str(n)[::-1]</code></pre><p><b>Complexity:</b> O(digits) time, O(1) space.</p>","langs":{"java":{"stub":"import java.util.*;\n\nclass Solution {\n    public boolean isPalindrome(int n) {\n        // Write your code here\n        return false;\n    }\n}","harness":"public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();sb.append(new Solution().isPalindrome(n)?\"true\":\"false\").append(\"\\n\");}System.out.print(sb);}}"},"python":{"stub":"class Solution:\n    def isPalindrome(self, n):\n        # Write your code here\n        pass","harness":"import sys\n_d=sys.stdin.read().split();_p=0\n_T=int(_d[_p]);_p+=1;_o=[]\nfor _ in range(_T):\n    _n=int(_d[_p]);_p+=1\n    _o.append('true' if Solution().isPalindrome(_n) else 'false')\nprint('\\n'.join(_o))"},"cpp":{"stub":"#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(int n) {\n        // Write your code here\n    }\n};","harness":"int main(){int T;cin>>T;while(T--){long long n;cin>>n;cout<<(Solution().isPalindrome((int)n)?\"true\":\"false\")<<\"\\n\";}}"},"javascript":{"stub":"/**\n * @param {number} n\n * @return {boolean}\n */\nvar isPalindrome = function(n) {\n    // Write your code here\n};","harness":"const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];\nfor(let _i=0;_i<_T;_i++){const _n=+_d[_p++];_o.push(isPalindrome(_n)?'true':'false');}\nconsole.log(_o.join('\\n'));"}},"cases":[{"stdin":"","expected":"true","display":{}}]};
</script>
{% endraw %}
