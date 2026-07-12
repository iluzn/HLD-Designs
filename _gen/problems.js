const fs = require('fs');
const path = require('path');
const { T, randInt, randArr, arrStr, ln } = require('./gen.js');

const OUT = path.join(__dirname, '..', 'content', 'dsa', 'problem');
fs.mkdirSync(OUT, { recursive: true });

// ---------- stdin / display / expected formatting by type ----------
function stdinOf(type, args) {
  switch (type) {
    case 'ARR_INT': case 'ARR_BOOL': case 'ARR_ARR': return args[0].length + '\n' + args[0].join(' ');
    case 'ARR_TGT_INT': case 'ARR_TGT_ARR': return args[0].length + '\n' + args[0].join(' ') + '\n' + args[1];
    case 'INT_INT': case 'INT_BOOL': return '' + args[0];
    case 'STR_BOOL': case 'STR_INT': return args[0];
    case 'STR_STR_BOOL': return args[0] + '\n' + args[1];
    case 'TREE_INT': case 'TREE_BOOL': case 'TREE_ARR':
      return args[0].map(function (x) { return x === null ? 'null' : x; }).join(' ');
    case 'INT_ARR': return '' + args[0];
    case 'INT_INT_INT': return args[0] + ' ' + args[1];
    case 'STR_STR': return args[0];
    case 'STR_STR_STR': case 'STR_INT_INT': case 'STR_STR_INT': return args[0] + '\n' + args[1];
    case 'ARR_INT_INT': return args[0].length + '\n' + args[0].join(' ') + '\n' + args[1];
    case 'ARR_INT_ARR': return args[0].length + '\n' + args[0].join(' ') + '\n' + args[1];
    case 'ARR_ARR_INT': return args[0].length + '\n' + args[0].join(' ') + '\n' + args[1].join(' ');
    case 'STR_ARR': return args[0];
    case 'ARRSTR_INT': return args[0].length + '\n' + args[0].join(' ');
    case 'STR_ARRSTR_BOOL': return args[0] + '\n' + args[1].length + '\n' + args[1].join(' ');
    case 'ARR_LISTS': case 'ARR_LISTS_PERM': return args[0].length + '\n' + args[0].join(' ');
    case 'ARR_INT_LISTS': return args[0].length + '\n' + args[0].join(' ') + '\n' + args[1];
    case 'INT_ARRSTR': return '' + args[0];
    case 'STR_ARRSTR': case 'STR_LISTSTR': return args[0];
    case 'ARRSTR_LISTSTR': return args[0].length + '\n' + args[0].join(' ');
    case 'GRID_INT': case 'GRID_ARR': case 'GRID_BOOL': case 'GRID_GRID':
      return args[0].length + ' ' + (args[0][0] ? args[0][0].length : 0) + '\n' + args[0].map(function (r) { return r.join(' '); }).join('\n');
    case 'GRID_TGT_BOOL':
      return args[0].length + ' ' + (args[0][0] ? args[0][0].length : 0) + '\n' + args[0].map(function (r) { return r.join(' '); }).join('\n') + '\n' + args[1];
    case 'CHARGRID_INT':
      return args[0].length + ' ' + (args[0][0] ? args[0][0].length : 0) + '\n' + args[0].join('\n');
    case 'LIST_ARR': return args[0].length + '\n' + args[0].join(' ');
    case 'LIST_LIST_ARR': return args[0].length + '\n' + args[0].join(' ') + '\n' + args[1].length + '\n' + args[1].join(' ');
    case 'LIST_INT_ARR': case 'LIST_POS_BOOL': return args[0].length + '\n' + args[0].join(' ') + '\n' + args[1];
    case 'LISTK_ARR': return args[0].length + '\n' + args[0].map(function (l) { return l.length + '\n' + l.join(' '); }).join('\n');
    case 'TREE_TREE_OUT': case 'TREE_LEVELS':
      return args[0].map(function (x) { return x === null ? 'null' : x; }).join(' ');
    case 'TREE_TREE_BOOL':
      return args[0].map(function (x) { return x === null ? 'null' : x; }).join(' ') + '\n' + args[1].map(function (x) { return x === null ? 'null' : x; }).join(' ');
    case 'TREE_INT_INT':
      return args[0].map(function (x) { return x === null ? 'null' : x; }).join(' ') + '\n' + args[1];
    case 'TREE_INT_INT_INT':
      return args[0].map(function (x) { return x === null ? 'null' : x; }).join(' ') + '\n' + args[1] + ' ' + args[2];
    default: return '';
  }
}
function displayOf(type, args) {
  switch (type) {
    case 'ARR_INT': case 'ARR_BOOL': case 'ARR_ARR': return { nums: arrStr(args[0]) };
    case 'ARR_TGT_INT': case 'ARR_TGT_ARR': return { nums: arrStr(args[0]), target: '' + args[1] };
    case 'INT_INT': case 'INT_BOOL': return { n: '' + args[0] };
    case 'STR_BOOL': case 'STR_INT': return { s: '"' + args[0] + '"' };
    case 'STR_STR_BOOL': return { s: '"' + args[0] + '"', t: '"' + args[1] + '"' };
    case 'TREE_INT': case 'TREE_BOOL': case 'TREE_ARR':
      return { root: '[' + args[0].map(function (x) { return x === null ? 'null' : x; }).join(',') + ']' };
    case 'INT_ARR': return { n: '' + args[0] };
    case 'INT_INT_INT': return { a: '' + args[0], b: '' + args[1] };
    case 'STR_STR': case 'STR_ARR': return { s: '"' + args[0] + '"' };
    case 'STR_STR_STR': return { s: '"' + args[0] + '"', t: '"' + args[1] + '"' };
    case 'STR_INT_INT': return { s: '"' + args[0] + '"', k: '' + args[1] };
    case 'STR_STR_INT': return { s: '"' + args[0] + '"', t: '"' + args[1] + '"' };
    case 'ARR_INT_INT': return { nums: arrStr(args[0]), k: '' + args[1] };
    case 'ARR_INT_ARR': return { nums: arrStr(args[0]), k: '' + args[1] };
    case 'ARR_ARR_INT': return { a: arrStr(args[0]), b: arrStr(args[1]) };
    case 'ARRSTR_INT': return { words: '[' + args[0].map(function (w) { return '"' + w + '"'; }).join(',') + ']' };
    case 'STR_ARRSTR_BOOL': return { s: '"' + args[0] + '"', wordDict: '[' + args[1].map(function (w) { return '"' + w + '"'; }).join(',') + ']' };
    case 'ARR_LISTS': case 'ARR_LISTS_PERM': return { nums: arrStr(args[0]) };
    case 'ARR_INT_LISTS': return { candidates: arrStr(args[0]), target: '' + args[1] };
    case 'INT_ARRSTR': return { n: '' + args[0] };
    case 'STR_ARRSTR': return { digits: '"' + args[0] + '"' };
    case 'STR_LISTSTR': return { s: '"' + args[0] + '"' };
    case 'ARRSTR_LISTSTR': return { strs: '[' + args[0].map(function (w) { return '"' + w + '"'; }).join(',') + ']' };
    case 'GRID_INT': case 'GRID_ARR': case 'GRID_BOOL': case 'GRID_GRID':
      return { grid: '[' + args[0].map(function (r) { return '[' + r.join(',') + ']'; }).join(',') + ']' };
    case 'GRID_TGT_BOOL':
      return { matrix: '[' + args[0].map(function (r) { return '[' + r.join(',') + ']'; }).join(',') + ']', target: '' + args[1] };
    case 'CHARGRID_INT':
      return { grid: '[' + args[0].map(function (r) { return '"' + r + '"'; }).join(',') + ']' };
    case 'LIST_ARR': return { head: arrStr(args[0]) };
    case 'LIST_LIST_ARR': return { l1: arrStr(args[0]), l2: arrStr(args[1]) };
    case 'LIST_INT_ARR': return { head: arrStr(args[0]), k: '' + args[1] };
    case 'LIST_POS_BOOL': return { head: arrStr(args[0]), pos: '' + args[1] };
    case 'LISTK_ARR': return { lists: '[' + args[0].map(function (l) { return arrStr(l); }).join(',') + ']' };
    case 'TREE_TREE_OUT': case 'TREE_LEVELS':
      return { root: '[' + args[0].map(function (x) { return x === null ? 'null' : x; }).join(',') + ']' };
    case 'TREE_TREE_BOOL':
      return { p: '[' + args[0].map(function (x) { return x === null ? 'null' : x; }).join(',') + ']', q: '[' + args[1].map(function (x) { return x === null ? 'null' : x; }).join(',') + ']' };
    case 'TREE_INT_INT':
      return { root: '[' + args[0].map(function (x) { return x === null ? 'null' : x; }).join(',') + ']', k: '' + args[1] };
    case 'TREE_INT_INT_INT':
      return { root: '[' + args[0].map(function (x) { return x === null ? 'null' : x; }).join(',') + ']', p: '' + args[1], q: '' + args[2] };
    default: return {};
  }
}
function fmtExpected(v) {
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (Array.isArray(v)) return v.join(' ');
  return '' + v;
}

// ---------- problem definitions ----------
const P = [];

// Two Sum (custom: unsorted, 0-indexed, output sorted pair)
P.push({
  slug: 'two-sum', title: 'Two Sum', difficulty: 'easy', topics: ['Array', 'Hash Table'],
  desc: '<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return the indices of the two numbers such that they add up to <code>target</code>.</p><p>You may assume exactly one solution, and you may not use the same element twice. Return the answer in any order.</p>',
  examples: [{ in: 'nums = [2,7,11,15], target = 9', out: '[0,1]', ex: 'nums[0] + nums[1] == 9.' }, { in: 'nums = [3,2,4], target = 6', out: '[1,2]' }],
  constraints: ['2 &lt;= nums.length &lt;= 10^4', '-10^9 &lt;= nums[i] &lt;= 10^9', 'Exactly one valid answer exists.'],
  editorial: '<h2>Approach: Hash Map</h2><p>Store each value&#39;s index as you scan. For each <code>x</code>, check if <code>target - x</code> was already seen. O(n) time, O(n) space.</p><pre><code>def twoSum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        if target - x in seen:\n            return [seen[target-x], i]\n        seen[x] = i</code></pre>',
  custom: {
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int[] twoSum(int[] nums, int target) {', '        // Write your code here', '        return new int[]{};', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();int t=sc.nextInt();int[] r=new Solution().twoSum(nums,t);Arrays.sort(r);sb.append(r[0]+" "+r[1]).append("\\n");}System.out.print(sb);}}') },
    python: { stub: ln('class Solution:', '    def twoSum(self, nums, target):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _nums=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _t=int(_d[_p]);_p+=1', '    _r=sorted(Solution().twoSum(_nums,_t))', "    _o.append(str(_r[0])+' '+str(_r[1]))", "print('\\n'.join(_o))") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<int> twoSum(vector<int>& nums, int target) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];int t;cin>>t;vector<int> r=Solution().twoSum(nums,t);sort(r.begin(),r.end());cout<<r[0]<<" "<<r[1]<<"\\n";}}') },
    javascript: { stub: ln('/**', ' * @param {number[]} nums', ' * @param {number} target', ' * @return {number[]}', ' */', 'var twoSum = function(nums, target) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _nums=_d.slice(_p,_p+_n).map(Number);_p+=_n;const _t=+_d[_p++];const _r=twoSum(_nums,_t).slice().sort((a,b)=>a-b);_o.push(_r[0]+" "+_r[1]);}', "console.log(_o.join('\\n'));") },
  },
  type: 'ARR_TGT_ARR',
  gen: function () {
    var out = [[[2, 7, 11, 15], 9], [[3, 2, 4], 6], [[3, 3], 6], [[1, 5, 3, 8, 2], 10], [[-3, 4, 3, 90, 0, -1], 0]];
    for (var k = 0; k < 40; k++) { var n = randInt(2, 8); var arr = randArr(n, -20, 20); var i = randInt(0, n - 1), j; do { j = randInt(0, n - 1); } while (j === i); out.push([arr, arr[i] + arr[j]]); }
    return out;
  },
  ref: function (args) { var nums = args[0], t = args[1], seen = {}; for (var i = 0; i < nums.length; i++) { if (seen[t - nums[i]] !== undefined) return [seen[t - nums[i]], i].sort(function (a, b) { return a - b; }); seen[nums[i]] = i; } return []; },
});

// Two Sum II (sorted, 1-indexed)
P.push({
  slug: 'two-sum-ii', title: 'Two Sum II - Input Array Is Sorted', difficulty: 'medium', topics: ['Array', 'Two Pointers', 'Binary Search'],
  desc: '<p>Given a <strong>1-indexed</strong> array <code>numbers</code> sorted in non-decreasing order, find two numbers adding up to <code>target</code>. Return <code>[index1, index2]</code> (1-indexed) with <code>index1 &lt; index2</code>.</p><p>Exactly one solution exists; use only constant extra space.</p>',
  examples: [{ in: 'numbers = [2,7,11,15], target = 9', out: '[1,2]' }, { in: 'numbers = [2,3,4], target = 6', out: '[1,3]' }],
  constraints: ['2 &lt;= numbers.length &lt;= 3*10^4', 'numbers is sorted non-decreasing.', 'Exactly one solution.'],
  editorial: '<h2>Approach: Two Pointers</h2><p>Start pointers at both ends. If the sum is too big move right in; too small move left out. O(n) time, O(1) space.</p><pre><code>def twoSum(numbers, target):\n    l, r = 0, len(numbers)-1\n    while l < r:\n        s = numbers[l] + numbers[r]\n        if s == target: return [l+1, r+1]\n        if s < target: l += 1\n        else: r -= 1</code></pre>',
  custom: {
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int[] twoSum(int[] numbers, int target) {', '        // Write your code here', '        return new int[]{};', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();int t=sc.nextInt();int[] r=new Solution().twoSum(nums,t);sb.append(r[0]+" "+r[1]).append("\\n");}System.out.print(sb);}}') },
    python: { stub: ln('class Solution:', '    def twoSum(self, numbers, target):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _nums=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _t=int(_d[_p]);_p+=1', '    _r=Solution().twoSum(_nums,_t)', "    _o.append(str(_r[0])+' '+str(_r[1]))", "print('\\n'.join(_o))") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<int> twoSum(vector<int>& numbers, int target) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];int t;cin>>t;vector<int> r=Solution().twoSum(nums,t);cout<<r[0]<<" "<<r[1]<<"\\n";}}') },
    javascript: { stub: ln('/**', ' * @param {number[]} numbers', ' * @param {number} target', ' * @return {number[]}', ' */', 'var twoSum = function(numbers, target) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _nums=_d.slice(_p,_p+_n).map(Number);_p+=_n;const _t=+_d[_p++];const _r=twoSum(_nums,_t);_o.push(_r[0]+" "+_r[1]);}', "console.log(_o.join('\\n'));") },
  },
  type: 'ARR_TGT_ARR',
  gen: function () {
    var out = [[[2, 7, 11, 15], 9], [[2, 3, 4], 6], [[-1, 0], -1], [[1, 3, 4, 5, 7], 9], [[1, 2, 3, 4, 4, 9], 8]];
    for (var k = 0; k < 40; k++) { var n = randInt(2, 8); var arr = randArr(n, -15, 15).sort(function (a, b) { return a - b; }); var i = randInt(0, n - 2), j = randInt(i + 1, n - 1); out.push([arr, arr[i] + arr[j]]); }
    return out;
  },
  ref: function (args) { var nums = args[0], t = args[1], l = 0, r = nums.length - 1; while (l < r) { var s = nums[l] + nums[r]; if (s === t) return [l + 1, r + 1]; if (s < t) l++; else r--; } return []; },
});

module.exports = { P, stdinOf, displayOf, fmtExpected, OUT };
