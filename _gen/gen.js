// Problem generator with MULTI-CASE harnesses: one execution runs all test
// cases (reads T, loops, prints one output line per case). This turns N
// backend calls into 1, so Submit is fast even with 45 cases.
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'content', 'dsa', 'problem');
fs.mkdirSync(OUT, { recursive: true });

function randInt(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function randArr(n, lo, hi) { return Array.from({ length: n }, () => randInt(lo, hi)); }
function arrStr(a) { return '[' + a.join(',') + ']'; }
function ln(...xs) { return xs.join('\n'); }

const T = {};

// (int[] nums) -> int
T.ARR_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, nums):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _nums=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _o.append(str(Solution().' + fn + '(_nums)))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[]} nums', ' * @return {number}', ' */', 'var ' + fn + ' = function(nums) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _nums=_d.slice(_p,_p+_n).map(Number);_p+=_n;_o.push(String(' + fn + '(_nums)));}', "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(vector<int>& nums) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];cout<<Solution().' + fn + '(nums)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(int[] nums) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();sb.append(new Solution().' + fn + '(nums)).append("\\n");}System.out.print(sb);}}') },
  };
};

// (int[] nums) -> boolean
T.ARR_BOOL = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, nums):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _nums=list(map(int,_d[_p:_p+_n]));_p+=_n', "    _o.append('true' if Solution()." + fn + "(_nums) else 'false')", "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[]} nums', ' * @return {boolean}', ' */', 'var ' + fn + ' = function(nums) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _nums=_d.slice(_p,_p+_n).map(Number);_p+=_n;_o.push(' + fn + "(_nums)?'true':'false');}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    bool ' + fn + '(vector<int>& nums) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];cout<<(Solution().' + fn + '(nums)?"true":"false")<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public boolean ' + fn + '(int[] nums) {', '        // Write your code here', '        return false;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();sb.append(new Solution().' + fn + '(nums)?"true":"false").append("\\n");}System.out.print(sb);}}') },
  };
};

// (int[] nums, int target) -> int
T.ARR_TGT_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, nums, target):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _nums=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _t=int(_d[_p]);_p+=1', '    _o.append(str(Solution().' + fn + '(_nums,_t)))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[]} nums', ' * @param {number} target', ' * @return {number}', ' */', 'var ' + fn + ' = function(nums, target) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _nums=_d.slice(_p,_p+_n).map(Number);_p+=_n;const _t=+_d[_p++];_o.push(String(' + fn + '(_nums,_t)));}', "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(vector<int>& nums, int target) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];int t;cin>>t;cout<<Solution().' + fn + '(nums,t)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(int[] nums, int target) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();int t=sc.nextInt();sb.append(new Solution().' + fn + '(nums,t)).append("\\n");}System.out.print(sb);}}') },
  };
};

// (int n) -> int
T.INT_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, n):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _o.append(str(Solution().' + fn + '(_n)))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number} n', ' * @return {number}', ' */', 'var ' + fn + ' = function(n) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];_o.push(String(' + fn + '(_n)));}', "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(int n) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int n;cin>>n;cout<<Solution().' + fn + '(n)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(int n) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();sb.append(new Solution().' + fn + '(n)).append("\\n");}System.out.print(sb);}}') },
  };
};

// (int[] nums) -> int[]  (space-separated, order preserved)
T.ARR_ARR = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, nums):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _nums=list(map(int,_d[_p:_p+_n]));_p+=_n', "    _o.append(' '.join(map(str,Solution()." + fn + '(_nums))))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[]} nums', ' * @return {number[]}', ' */', 'var ' + fn + ' = function(nums) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _nums=_d.slice(_p,_p+_n).map(Number);_p+=_n;_o.push(" + fn + "(_nums).join(' '));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<int> ' + fn + '(vector<int>& nums) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];vector<int> r=Solution().' + fn + '(nums);for(size_t i=0;i<r.size();i++){if(i)cout<<\' \';cout<<r[i];}cout<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int[] ' + fn + '(int[] nums) {', '        // Write your code here', '        return nums;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();int[] r=new Solution().' + fn + '(nums);for(int i=0;i<r.length;i++){if(i>0)sb.append(\' \');sb.append(r[i]);}sb.append("\\n");}System.out.print(sb);}}') },
  };
};

// (string s) -> boolean   (line-based: T then T lines)
T.STR_BOOL = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, s):', '        # Write your code here', '        pass'),
      harness: ln('import sys', "_l=sys.stdin.read().split('\\n')", '_T=int(_l[0]);_o=[]', 'for _i in range(_T):', '    _s=_l[1+_i] if 1+_i<len(_l) else ""', "    _o.append('true' if Solution()." + fn + "(_s) else 'false')", "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {string} s', ' * @return {boolean}', ' */', 'var ' + fn + ' = function(s) {', '    // Write your code here', '};'),
      harness: ln("const _l=require('fs').readFileSync(0,'utf8').split('\\n');const _T=+_l[0];const _o=[];", "for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\\r$/,'');_o.push(" + fn + "(_s)?'true':'false');}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    bool ' + fn + '(string s) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<(Solution().' + fn + '(s)?"true":"false")<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public boolean ' + fn + '(String s) {', '        // Write your code here', '        return false;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().' + fn + '(s)?"true":"false").append("\\n");}System.out.print(sb);}}') },
  };
};

// (string s, string t) -> boolean   (line-based: T then 2 lines per case)
T.STR_STR_BOOL = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, s, t):', '        # Write your code here', '        pass'),
      harness: ln('import sys', "_l=sys.stdin.read().split('\\n')", '_T=int(_l[0]);_o=[]', 'for _i in range(_T):', '    _s=_l[1+2*_i] if 1+2*_i<len(_l) else ""', '    _t=_l[2+2*_i] if 2+2*_i<len(_l) else ""', "    _o.append('true' if Solution()." + fn + "(_s,_t) else 'false')", "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {string} s', ' * @param {string} t', ' * @return {boolean}', ' */', 'var ' + fn + ' = function(s, t) {', '    // Write your code here', '};'),
      harness: ln("const _l=require('fs').readFileSync(0,'utf8').split('\\n');const _T=+_l[0];const _o=[];", "for(let _i=0;_i<_T;_i++){const _s=(_l[1+2*_i]||'').replace(/\\r$/,'');const _t=(_l[2+2*_i]||'').replace(/\\r$/,'');_o.push(" + fn + "(_s,_t)?'true':'false');}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    bool ' + fn + '(string s, string t) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){string l;getline(cin,l);int T=stoi(l);string s,t;for(int i=0;i<T;i++){if(!getline(cin,s))s="";if(!getline(cin,t))t="";cout<<(Solution().' + fn + '(s,t)?"true":"false")<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public boolean ' + fn + '(String s, String t) {', '        // Write your code here', '        return false;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";String t=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().' + fn + '(s,t)?"true":"false").append("\\n");}System.out.print(sb);}}') },
  };
};

// (string s) -> int   (line-based: T then T lines)
T.STR_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, s):', '        # Write your code here', '        pass'),
      harness: ln('import sys', "_l=sys.stdin.read().split('\\n')", '_T=int(_l[0]);_o=[]', 'for _i in range(_T):', '    _s=_l[1+_i] if 1+_i<len(_l) else ""', '    _o.append(str(Solution().' + fn + '(_s)))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {string} s', ' * @return {number}', ' */', 'var ' + fn + ' = function(s) {', '    // Write your code here', '};'),
      harness: ln("const _l=require('fs').readFileSync(0,'utf8').split('\\n');const _T=+_l[0];const _o=[];", "for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\\r$/,'');_o.push(String(" + fn + "(_s)));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(string s) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<Solution().' + fn + '(s)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(String s) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().' + fn + '(s)).append("\\n");}System.out.print(sb);}}') },
  };
};

// (int n) -> boolean
T.INT_BOOL = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, n):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', "    _o.append('true' if Solution()." + fn + "(_n) else 'false')", "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number} n', ' * @return {boolean}', ' */', 'var ' + fn + ' = function(n) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];_o.push(" + fn + "(_n)?'true':'false');}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    bool ' + fn + '(int n) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){long long n;cin>>n;cout<<(Solution().' + fn + '((int)n)?"true":"false")<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public boolean ' + fn + '(int n) {', '        // Write your code here', '        return false;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();sb.append(new Solution().' + fn + '(n)?"true":"false").append("\\n");}System.out.print(sb);}}') },
  };
};

module.exports = { T, randInt, randArr, arrStr, ln };
