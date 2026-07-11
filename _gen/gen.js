// Problem generator: emits LeetCode-style problem pages under content/dsa/problem/
// with reference-computed test cases (so expected outputs are provably correct).
// Run: node _gen/gen.js   (the _gen folder is ignored by Jekyll)
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'content', 'dsa', 'problem');
fs.mkdirSync(OUT, { recursive: true });

// ---------- helpers ----------
function randInt(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function randArr(n, lo, hi) { return Array.from({ length: n }, () => randInt(lo, hi)); }
function arrStr(a) { return '[' + a.join(',') + ']'; }
function ln(...xs) { return xs.join('\n'); }

// ---------- harness templates by signature type ----------
// Each returns { stubs, harness } per language. User edits `stub`; `harness` is appended.
const T = {};

// (int[] nums) -> int
T.ARR_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, nums):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split()', '_n=int(_d[0])', '_nums=list(map(int,_d[1:1+_n]))', 'print(Solution().' + fn + '(_nums))') },
    javascript: { stub: ln('/**', ' * @param {number[]} nums', ' * @return {number}', ' */', 'var ' + fn + ' = function(nums) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);", 'const _n=+_d[0];', 'const _nums=_d.slice(1,1+_n).map(Number);', 'console.log(' + fn + '(_nums));') },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(vector<int>& nums) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];cout<<Solution().' + fn + '(nums)<<endl;}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(int[] nums) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();System.out.println(new Solution().' + fn + '(nums));}}') },
  };
};

// (int[] nums) -> boolean
T.ARR_BOOL = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, nums):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split()', '_n=int(_d[0])', '_nums=list(map(int,_d[1:1+_n]))', "print('true' if Solution()." + fn + '(_nums) else \'false\')') },
    javascript: { stub: ln('/**', ' * @param {number[]} nums', ' * @return {boolean}', ' */', 'var ' + fn + ' = function(nums) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);", 'const _n=+_d[0];', 'const _nums=_d.slice(1,1+_n).map(Number);', "console.log(" + fn + "(_nums)?'true':'false');") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    bool ' + fn + '(vector<int>& nums) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];cout<<(Solution().' + fn + "(nums)?\"true\":\"false\")<<endl;}") },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public boolean ' + fn + '(int[] nums) {', '        // Write your code here', '        return false;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();System.out.println(new Solution().' + fn + "(nums)?\"true\":\"false\");}}") },
  };
};

// (int[] nums, int target) -> int
T.ARR_TGT_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, nums, target):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split()', '_n=int(_d[0])', '_nums=list(map(int,_d[1:1+_n]))', '_t=int(_d[1+_n])', 'print(Solution().' + fn + '(_nums,_t))') },
    javascript: { stub: ln('/**', ' * @param {number[]} nums', ' * @param {number} target', ' * @return {number}', ' */', 'var ' + fn + ' = function(nums, target) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);", 'const _n=+_d[0];', 'const _nums=_d.slice(1,1+_n).map(Number);', 'const _t=+_d[1+_n];', 'console.log(' + fn + '(_nums,_t));') },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(vector<int>& nums, int target) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];int t;cin>>t;cout<<Solution().' + fn + '(nums,t)<<endl;}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(int[] nums, int target) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();int t=sc.nextInt();System.out.println(new Solution().' + fn + '(nums,t));}}') },
  };
};

// (int n) -> int
T.INT_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, n):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_n=int(sys.stdin.read().split()[0])', 'print(Solution().' + fn + '(_n))') },
    javascript: { stub: ln('/**', ' * @param {number} n', ' * @return {number}', ' */', 'var ' + fn + ' = function(n) {', '    // Write your code here', '};'),
      harness: ln("const _n=+require('fs').readFileSync(0,'utf8').trim();", 'console.log(' + fn + '(_n));') },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(int n) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int n;cin>>n;cout<<Solution().' + fn + '(n)<<endl;}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(int n) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int n=sc.nextInt();System.out.println(new Solution().' + fn + '(n));}}') },
  };
};

// (int[] nums) -> int[]  (order preserved, space-separated)
T.ARR_ARR = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, nums):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split()', '_n=int(_d[0])', '_nums=list(map(int,_d[1:1+_n]))', 'print(*Solution().' + fn + '(_nums))') },
    javascript: { stub: ln('/**', ' * @param {number[]} nums', ' * @return {number[]}', ' */', 'var ' + fn + ' = function(nums) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);", 'const _n=+_d[0];', 'const _nums=_d.slice(1,1+_n).map(Number);', "console.log(" + fn + "(_nums).join(' '));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<int> ' + fn + '(vector<int>& nums) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];vector<int> r=Solution().' + fn + '(nums);for(size_t i=0;i<r.size();i++){if(i)cout<<\' \';cout<<r[i];}cout<<endl;}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int[] ' + fn + '(int[] nums) {', '        // Write your code here', '        return nums;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();int[] r=new Solution().' + fn + '(nums);StringBuilder sb=new StringBuilder();for(int i=0;i<r.length;i++){if(i>0)sb.append(\' \');sb.append(r[i]);}System.out.println(sb.toString().trim());}}') },
  };
};

// (string s) -> boolean
T.STR_BOOL = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, s):', '        # Write your code here', '        pass'),
      harness: ln('import sys', "_s=sys.stdin.readline().rstrip('\\n')", "print('true' if Solution()." + fn + "(_s) else 'false')") },
    javascript: { stub: ln('/**', ' * @param {string} s', ' * @return {boolean}', ' */', 'var ' + fn + ' = function(s) {', '    // Write your code here', '};'),
      harness: ln("const _s=require('fs').readFileSync(0,'utf8').replace(/\\n$/,'');", "console.log(" + fn + "(_s)?'true':'false');") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    bool ' + fn + '(string s) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){string s;getline(cin,s);cout<<(Solution().' + fn + "(s)?\"true\":\"false\")<<endl;}") },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public boolean ' + fn + '(String s) {', '        // Write your code here', '        return false;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);String s=sc.hasNextLine()?sc.nextLine():"";System.out.println(new Solution().' + fn + "(s)?\"true\":\"false\");}}") },
  };
};

// (string s, string t) -> boolean
T.STR_STR_BOOL = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, s, t):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_l=sys.stdin.read().split("\\n")', '_s=_l[0] if len(_l)>0 else ""', '_t=_l[1] if len(_l)>1 else ""', "print('true' if Solution()." + fn + "(_s,_t) else 'false')") },
    javascript: { stub: ln('/**', ' * @param {string} s', ' * @param {string} t', ' * @return {boolean}', ' */', 'var ' + fn + ' = function(s, t) {', '    // Write your code here', '};'),
      harness: ln("const _l=require('fs').readFileSync(0,'utf8').split('\\n');", "console.log(" + fn + "(_l[0]||'', (_l[1]||'').replace(/\\r$/,''))?'true':'false');") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    bool ' + fn + '(string s, string t) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){string s,t;getline(cin,s);getline(cin,t);cout<<(Solution().' + fn + "(s,t)?\"true\":\"false\")<<endl;}") },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public boolean ' + fn + '(String s, String t) {', '        // Write your code here', '        return false;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);String s=sc.hasNextLine()?sc.nextLine():"";String t=sc.hasNextLine()?sc.nextLine():"";System.out.println(new Solution().' + fn + "(s,t)?\"true\":\"false\");}}") },
  };
};

module.exports = { T, randInt, randArr, arrStr, ln };
