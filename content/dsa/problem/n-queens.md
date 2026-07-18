---
layout: lc
title: "N-Queens - Online Judge"
description: "N-Queens (Hard): The n-queens puzzle places n queens on an n x n chessboard so that no two queens attack each other (no shared row,… Solve it online in Python, Java, C++ or JavaScript with instant verdicts."
permalink: /dsa/problem/n-queens
---
{% raw %}
<h1>N-Queens</h1>
<span class="lc-diff hard">Hard</span>
<details class="lc-topics"><summary>Topics</summary><div class="lc-tags"><span class="lc-tag">Backtracking</span></div></details>
<p>The n-queens puzzle places <code>n</code> queens on an <code>n x n</code> chessboard so that no two queens attack each other (no shared row, column, or diagonal). Given an integer <code>n</code>, return the <strong>number</strong> of distinct solutions to the n-queens puzzle.</p>
<h2>Example 1</h2><pre>Input:  n = 4
Output: 2</pre>
<h2>Example 2</h2><pre>Input:  n = 1
Output: 1</pre>
<h2>Example 3</h2><pre>Input:  n = 8
Output: 92</pre>
<h2>Constraints</h2><ul><li>1 &lt;= n &lt;= 9</li></ul>
<script>
window.SC_LC = {"id":"n-queens","type":"INT_INT","diagram":"","editorial":"<h2>Approach: Backtracking with column and diagonal tracking</h2><pre><code>Place queens row by row. For each row, try every column.\nTrack which columns and both diagonal directions are occupied using sets or bitmasks.\nWhen a queen is safely placed, recurse to the next row.\nCount a solution when all n rows are filled.\n\nBitmask variant: use three integers (cols, diag1, diag2) where each set bit marks an occupied lane.\nAt each row, available = ~(cols | diag1 | diag2) & allMask.\nPick the lowest set bit, mark the three masks, recurse.</code></pre><p><b>Complexity:</b> O(n!) time, O(n) space.</p>","langs":{"java":{"stub":"import java.util.*;\n\nclass Solution {\n    public int solveNQueens(int n) {\n        // Write your code here\n        return 0;\n    }\n}","harness":"public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();sb.append(new Solution().solveNQueens(n)).append(\"\\n\");}System.out.print(sb);}}"},"python":{"stub":"class Solution:\n    def solveNQueens(self, n):\n        # Write your code here\n        pass","harness":"import sys\n_d=sys.stdin.read().split();_p=0\n_T=int(_d[_p]);_p+=1;_o=[]\nfor _ in range(_T):\n    _n=int(_d[_p]);_p+=1\n    _o.append(str(Solution().solveNQueens(_n)))\nprint('\\n'.join(_o))"},"cpp":{"stub":"#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    int solveNQueens(int n) {\n        // Write your code here\n    }\n};","harness":"int main(){int T;cin>>T;while(T--){int n;cin>>n;cout<<Solution().solveNQueens(n)<<\"\\n\";}}"},"javascript":{"stub":"/**\n * @param {number} n\n * @return {number}\n */\nvar solveNQueens = function(n) {\n    // Write your code here\n};","harness":"const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];\nfor(let _i=0;_i<_T;_i++){const _n=+_d[_p++];_o.push(String(solveNQueens(_n)));}\nconsole.log(_o.join('\\n'));"}},"cases":[{"stdin":"1","expected":"1","display":{"n":"1"}},{"stdin":"4","expected":"2","display":{"n":"4"}},{"stdin":"5","expected":"10","display":{"n":"5"}},{"stdin":"6","expected":"4","display":{"n":"6"}},{"stdin":"7","expected":"40","display":{"n":"7"}},{"stdin":"8","expected":"92","display":{"n":"8"}},{"stdin":"9","expected":"352","display":{"n":"9"}},{"stdin":"2","expected":"0","display":{"n":"2"}},{"stdin":"3","expected":"0","display":{"n":"3"}}]};
</script>
{% endraw %}
