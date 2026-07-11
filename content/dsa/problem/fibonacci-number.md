---
layout: lc
title: "Fibonacci Number - Online Judge"
description: "Solve Fibonacci Number like LeetCode in Python, Java, C++, or JavaScript with instant verdicts and test cases."
permalink: /dsa/problem/fibonacci-number
---
{% raw %}
<h1>Fibonacci Number</h1>
<span class="lc-diff easy">Easy</span>
<details class="lc-topics"><summary>Topics</summary><div class="lc-tags"><span class="lc-tag">Math</span><span class="lc-tag">Dynamic Programming</span><span class="lc-tag">Recursion</span></div></details>
<p>The Fibonacci numbers satisfy <code>F(0)=0</code>, <code>F(1)=1</code>, and <code>F(n)=F(n-1)+F(n-2)</code> for n &gt; 1. Given <code>n</code>, return <code>F(n)</code>.</p>
<h2>Example 1</h2><pre>Input:  n = 2
Output: 1</pre>
<h2>Example 2</h2><pre>Input:  n = 4
Output: 3</pre>
<h2>Constraints</h2><ul><li>0 &lt;= n &lt;= 30</li></ul>
<script>
window.SC_LC = {"id":"fibonacci-number","editorial":"<h2>Approach</h2><p>Iterate keeping the last two values.</p>","langs":{"java":{"stub":"import java.util.*;\n\nclass Solution {\n    public int fib(int n) {\n        // Write your code here\n        return 0;\n    }\n}","harness":"public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int n=sc.nextInt();System.out.println(new Solution().fib(n));}}"},"python":{"stub":"class Solution:\n    def fib(self, n):\n        # Write your code here\n        pass","harness":"import sys\n_n=int(sys.stdin.read().split()[0])\nprint(Solution().fib(_n))"},"cpp":{"stub":"#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int fib(int n) {\n        // Write your code here\n    }\n};","harness":"int main(){int n;cin>>n;cout<<Solution().fib(n)<<endl;}"},"javascript":{"stub":"/**\n * @param {number} n\n * @return {number}\n */\nvar fib = function(n) {\n    // Write your code here\n};","harness":"const _n=+require('fs').readFileSync(0,'utf8').trim();\nconsole.log(fib(_n));"}},"cases":[{"stdin":"0","expected":"0","display":{"n":"0"}},{"stdin":"1","expected":"1","display":{"n":"1"}},{"stdin":"2","expected":"1","display":{"n":"2"}},{"stdin":"3","expected":"2","display":{"n":"3"}},{"stdin":"4","expected":"3","display":{"n":"4"}},{"stdin":"5","expected":"5","display":{"n":"5"}},{"stdin":"6","expected":"8","display":{"n":"6"}},{"stdin":"7","expected":"13","display":{"n":"7"}},{"stdin":"8","expected":"21","display":{"n":"8"}},{"stdin":"9","expected":"34","display":{"n":"9"}},{"stdin":"10","expected":"55","display":{"n":"10"}},{"stdin":"11","expected":"89","display":{"n":"11"}},{"stdin":"12","expected":"144","display":{"n":"12"}},{"stdin":"13","expected":"233","display":{"n":"13"}},{"stdin":"14","expected":"377","display":{"n":"14"}},{"stdin":"15","expected":"610","display":{"n":"15"}},{"stdin":"16","expected":"987","display":{"n":"16"}},{"stdin":"17","expected":"1597","display":{"n":"17"}},{"stdin":"18","expected":"2584","display":{"n":"18"}},{"stdin":"19","expected":"4181","display":{"n":"19"}},{"stdin":"20","expected":"6765","display":{"n":"20"}},{"stdin":"21","expected":"10946","display":{"n":"21"}},{"stdin":"22","expected":"17711","display":{"n":"22"}},{"stdin":"23","expected":"28657","display":{"n":"23"}},{"stdin":"24","expected":"46368","display":{"n":"24"}},{"stdin":"25","expected":"75025","display":{"n":"25"}},{"stdin":"26","expected":"121393","display":{"n":"26"}},{"stdin":"27","expected":"196418","display":{"n":"27"}},{"stdin":"28","expected":"317811","display":{"n":"28"}},{"stdin":"29","expected":"514229","display":{"n":"29"}},{"stdin":"30","expected":"832040","display":{"n":"30"}}]};
</script>
{% endraw %}
