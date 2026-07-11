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
    case 'INT_INT': return '' + args[0];
    case 'STR_BOOL': return args[0];
    case 'STR_STR_BOOL': return args[0] + '\n' + args[1];
    default: return '';
  }
}
function displayOf(type, args) {
  switch (type) {
    case 'ARR_INT': case 'ARR_BOOL': case 'ARR_ARR': return { nums: arrStr(args[0]) };
    case 'ARR_TGT_INT': case 'ARR_TGT_ARR': return { nums: arrStr(args[0]), target: '' + args[1] };
    case 'INT_INT': return { n: '' + args[0] };
    case 'STR_BOOL': return { s: '"' + args[0] + '"' };
    case 'STR_STR_BOOL': return { s: '"' + args[0] + '"', t: '"' + args[1] + '"' };
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
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();int t=sc.nextInt();int[] r=new Solution().twoSum(nums,t);Arrays.sort(r);System.out.println(r[0]+" "+r[1]);}}') },
    python: { stub: ln('class Solution:', '    def twoSum(self, nums, target):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split()', '_n=int(_d[0])', '_nums=list(map(int,_d[1:1+_n]))', '_t=int(_d[1+_n])', '_r=sorted(Solution().twoSum(_nums,_t))', 'print(_r[0], _r[1])') },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<int> twoSum(vector<int>& nums, int target) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];int t;cin>>t;vector<int> r=Solution().twoSum(nums,t);sort(r.begin(),r.end());cout<<r[0]<<" "<<r[1]<<endl;}') },
    javascript: { stub: ln('/**', ' * @param {number[]} nums', ' * @param {number} target', ' * @return {number[]}', ' */', 'var twoSum = function(nums, target) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);", 'const _n=+_d[0];const _nums=_d.slice(1,1+_n).map(Number);const _t=+_d[1+_n];', 'const _r=twoSum(_nums,_t).slice().sort((a,b)=>a-b);', "console.log(_r.join(' '));") },
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
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();int t=sc.nextInt();int[] r=new Solution().twoSum(nums,t);System.out.println(r[0]+" "+r[1]);}}') },
    python: { stub: ln('class Solution:', '    def twoSum(self, numbers, target):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split()', '_n=int(_d[0])', '_nums=list(map(int,_d[1:1+_n]))', '_t=int(_d[1+_n])', '_r=Solution().twoSum(_nums,_t)', 'print(_r[0], _r[1])') },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<int> twoSum(vector<int>& numbers, int target) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];int t;cin>>t;vector<int> r=Solution().twoSum(nums,t);cout<<r[0]<<" "<<r[1]<<endl;}') },
    javascript: { stub: ln('/**', ' * @param {number[]} numbers', ' * @param {number} target', ' * @return {number[]}', ' */', 'var twoSum = function(numbers, target) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);", 'const _n=+_d[0];const _nums=_d.slice(1,1+_n).map(Number);const _t=+_d[1+_n];', 'const _r=twoSum(_nums,_t);', "console.log(_r[0]+' '+_r[1]);") },
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
