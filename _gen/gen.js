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

// (int[] nums, int target) -> int[]  (space-separated, order preserved)
T.ARR_TGT_ARR = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, nums, target):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _nums=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _t=int(_d[_p]);_p+=1', "    _o.append(' '.join(map(str,Solution()." + fn + '(_nums,_t))))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[]} nums', ' * @param {number} target', ' * @return {number[]}', ' */', 'var ' + fn + ' = function(nums, target) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _nums=_d.slice(_p,_p+_n).map(Number);_p+=_n;const _t=+_d[_p++];_o.push(" + fn + "(_nums,_t).join(' '));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<int> ' + fn + '(vector<int>& nums, int target) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];int t;cin>>t;vector<int> r=Solution().' + fn + '(nums,t);for(size_t i=0;i<r.size();i++){if(i)cout<<\' \';cout<<r[i];}cout<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int[] ' + fn + '(int[] nums, int target) {', '        // Write your code here', '        return nums;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();int t=sc.nextInt();int[] r=new Solution().' + fn + '(nums,t);for(int i=0;i<r.length;i++){if(i>0)sb.append(\' \');sb.append(r[i]);}sb.append("\\n");}System.out.print(sb);}}') },
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

// (int n) -> int[]   (space-separated)
T.INT_ARR = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, n):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', "    _o.append(' '.join(map(str,Solution()." + fn + '(_n))))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number} n', ' * @return {number[]}', ' */', 'var ' + fn + ' = function(n) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];_o.push(" + fn + "(_n).join(' '));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<int> ' + fn + '(int n) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> r=Solution().' + fn + '(n);for(size_t i=0;i<r.size();i++){if(i)cout<<\' \';cout<<r[i];}cout<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int[] ' + fn + '(int n) {', '        // Write your code here', '        return new int[]{};', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] r=new Solution().' + fn + '(n);for(int i=0;i<r.length;i++){if(i>0)sb.append(\' \');sb.append(r[i]);}sb.append("\\n");}System.out.print(sb);}}') },
  };
};

// (int a, int b) -> int
T.INT_INT_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, a, b):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _a=int(_d[_p]);_p+=1', '    _b=int(_d[_p]);_p+=1', '    _o.append(str(Solution().' + fn + '(_a,_b)))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number} a', ' * @param {number} b', ' * @return {number}', ' */', 'var ' + fn + ' = function(a, b) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _a=+_d[_p++];const _b=+_d[_p++];_o.push(String(' + fn + '(_a,_b)));}', "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(int a, int b) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){long long a,b;cin>>a>>b;cout<<Solution().' + fn + '((int)a,(int)b)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(int a, int b) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int x=sc.nextInt();int y=sc.nextInt();sb.append(new Solution().' + fn + '(x,y)).append("\\n");}System.out.print(sb);}}') },
  };
};

// (string s) -> string   (line-based: T then T lines)
T.STR_STR = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, s):', '        # Write your code here', '        pass'),
      harness: ln('import sys', "_l=sys.stdin.read().split('\\n')", '_T=int(_l[0]);_o=[]', 'for _i in range(_T):', '    _s=_l[1+_i] if 1+_i<len(_l) else ""', '    _o.append(str(Solution().' + fn + '(_s)))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {string} s', ' * @return {string}', ' */', 'var ' + fn + ' = function(s) {', '    // Write your code here', '};'),
      harness: ln("const _l=require('fs').readFileSync(0,'utf8').split('\\n');const _T=+_l[0];const _o=[];", "for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\\r$/,'');_o.push(String(" + fn + "(_s)));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    string ' + fn + '(string s) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<Solution().' + fn + '(s)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public String ' + fn + '(String s) {', '        // Write your code here', '        return "";', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().' + fn + '(s)).append("\\n");}System.out.print(sb);}}') },
  };
};

// (string s, string t) -> string   (line-based: T then 2 lines per case)
T.STR_STR_STR = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, s, t):', '        # Write your code here', '        pass'),
      harness: ln('import sys', "_l=sys.stdin.read().split('\\n')", '_T=int(_l[0]);_o=[]', 'for _i in range(_T):', '    _s=_l[1+2*_i] if 1+2*_i<len(_l) else ""', '    _t=_l[2+2*_i] if 2+2*_i<len(_l) else ""', '    _o.append(str(Solution().' + fn + '(_s,_t)))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {string} s', ' * @param {string} t', ' * @return {string}', ' */', 'var ' + fn + ' = function(s, t) {', '    // Write your code here', '};'),
      harness: ln("const _l=require('fs').readFileSync(0,'utf8').split('\\n');const _T=+_l[0];const _o=[];", "for(let _i=0;_i<_T;_i++){const _s=(_l[1+2*_i]||'').replace(/\\r$/,'');const _t=(_l[2+2*_i]||'').replace(/\\r$/,'');_o.push(String(" + fn + "(_s,_t)));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    string ' + fn + '(string s, string t) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){string l;getline(cin,l);int T=stoi(l);string s,t;for(int i=0;i<T;i++){if(!getline(cin,s))s="";if(!getline(cin,t))t="";cout<<Solution().' + fn + '(s,t)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public String ' + fn + '(String s, String t) {', '        // Write your code here', '        return "";', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";String t=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().' + fn + '(s,t)).append("\\n");}System.out.print(sb);}}') },
  };
};

// (string s, int k) -> int   (line-based: T then 2 lines per case: s, k)
T.STR_INT_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, s, k):', '        # Write your code here', '        pass'),
      harness: ln('import sys', "_l=sys.stdin.read().split('\\n')", '_T=int(_l[0]);_o=[]', 'for _i in range(_T):', '    _s=_l[1+2*_i] if 1+2*_i<len(_l) else ""', '    _k=int(_l[2+2*_i]) if 2+2*_i<len(_l) else 0', '    _o.append(str(Solution().' + fn + '(_s,_k)))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {string} s', ' * @param {number} k', ' * @return {number}', ' */', 'var ' + fn + ' = function(s, k) {', '    // Write your code here', '};'),
      harness: ln("const _l=require('fs').readFileSync(0,'utf8').split('\\n');const _T=+_l[0];const _o=[];", "for(let _i=0;_i<_T;_i++){const _s=(_l[1+2*_i]||'').replace(/\\r$/,'');const _k=+((_l[2+2*_i]||'0').trim());_o.push(String(" + fn + "(_s,_k)));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(string s, int k) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){string l;getline(cin,l);int T=stoi(l);string s,ks;for(int i=0;i<T;i++){if(!getline(cin,s))s="";if(!getline(cin,ks))ks="0";cout<<Solution().' + fn + '(s,stoi(ks))<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(String s, int k) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";int k=Integer.parseInt(sc.hasNextLine()?sc.nextLine().trim():"0");sb.append(new Solution().' + fn + '(s,k)).append("\\n");}System.out.print(sb);}}') },
  };
};

// (int[] nums, int k) -> int[]   (whitespace: n, nums, k)
T.ARR_INT_ARR = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, nums, k):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _nums=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _k=int(_d[_p]);_p+=1', "    _o.append(' '.join(map(str,Solution()." + fn + '(_nums,_k))))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[]} nums', ' * @param {number} k', ' * @return {number[]}', ' */', 'var ' + fn + ' = function(nums, k) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _nums=_d.slice(_p,_p+_n).map(Number);_p+=_n;const _k=+_d[_p++];_o.push(" + fn + "(_nums,_k).join(' '));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<int> ' + fn + '(vector<int>& nums, int k) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];int k;cin>>k;vector<int> r=Solution().' + fn + '(nums,k);for(size_t i=0;i<r.size();i++){if(i)cout<<\' \';cout<<r[i];}cout<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int[] ' + fn + '(int[] nums, int k) {', '        // Write your code here', '        return new int[]{};', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();int k=sc.nextInt();int[] r=new Solution().' + fn + '(nums,k);for(int i=0;i<r.length;i++){if(i>0)sb.append(\' \');sb.append(r[i]);}sb.append("\\n");}System.out.print(sb);}}') },
  };
};

// (int[] a, int[] b) -> int   (whitespace: n, a[n], b[n])
T.ARR_ARR_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, a, b):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _a=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _b=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _o.append(str(Solution().' + fn + '(_a,_b)))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[]} a', ' * @param {number[]} b', ' * @return {number}', ' */', 'var ' + fn + ' = function(a, b) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _a=_d.slice(_p,_p+_n).map(Number);_p+=_n;const _b=_d.slice(_p,_p+_n).map(Number);_p+=_n;_o.push(String(' + fn + '(_a,_b)));}', "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(vector<int>& a, vector<int>& b) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> a(n),b(n);for(int i=0;i<n;i++)cin>>a[i];for(int i=0;i<n;i++)cin>>b[i];cout<<Solution().' + fn + '(a,b)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(int[] a, int[] b) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] z){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] a=new int[n];int[] b=new int[n];for(int i=0;i<n;i++)a[i]=sc.nextInt();for(int i=0;i<n;i++)b[i]=sc.nextInt();sb.append(new Solution().' + fn + '(a,b)).append("\\n");}System.out.print(sb);}}') },
  };
};

// (string s) -> int[]   (line-based: T then T lines; output space-separated)
T.STR_ARR = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, s):', '        # Write your code here', '        pass'),
      harness: ln('import sys', "_l=sys.stdin.read().split('\\n')", '_T=int(_l[0]);_o=[]', 'for _i in range(_T):', '    _s=_l[1+_i] if 1+_i<len(_l) else ""', "    _o.append(' '.join(map(str,Solution()." + fn + '(_s))))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {string} s', ' * @return {number[]}', ' */', 'var ' + fn + ' = function(s) {', '    // Write your code here', '};'),
      harness: ln("const _l=require('fs').readFileSync(0,'utf8').split('\\n');const _T=+_l[0];const _o=[];", "for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\\r$/,'');_o.push(" + fn + "(_s).join(' '));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<int> ' + fn + '(string s) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";vector<int> r=Solution().' + fn + '(s);for(size_t i=0;i<r.size();i++){if(i)cout<<\' \';cout<<r[i];}cout<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public java.util.List<Integer> ' + fn + '(String s) {', '        // Write your code here', '        return new ArrayList<>();', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";java.util.List<Integer> r=new Solution().' + fn + '(s);for(int j=0;j<r.size();j++){if(j>0)sb.append(\' \');sb.append(r.get(j));}sb.append("\\n");}System.out.print(sb);}}') },
  };
};

// (string[] words) -> int   (whitespace: count then words)
T.ARRSTR_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, words):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _c=int(_d[_p]);_p+=1', '    _w=_d[_p:_p+_c];_p+=_c', '    _o.append(str(Solution().' + fn + '(_w)))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {string[]} words', ' * @return {number}', ' */', 'var ' + fn + ' = function(words) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _c=+_d[_p++];const _w=_d.slice(_p,_p+_c);_p+=_c;_o.push(String(' + fn + '(_w)));}', "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(vector<string>& words) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int c;cin>>c;vector<string> w(c);for(int i=0;i<c;i++)cin>>w[i];cout<<Solution().' + fn + '(w)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(String[] words) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int c=sc.nextInt();String[] w=new String[c];for(int i=0;i<c;i++)w[i]=sc.next();sb.append(new Solution().' + fn + '(w)).append("\\n");}System.out.print(sb);}}') },
  };
};

// (string s, string[] wordDict) -> boolean   (whitespace: s, count, words)
T.STR_ARRSTR_BOOL = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, s, wordDict):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _s=_d[_p];_p+=1', '    _c=int(_d[_p]);_p+=1', '    _w=_d[_p:_p+_c];_p+=_c', "    _o.append('true' if Solution()." + fn + "(_s,_w) else 'false')", "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {string} s', ' * @param {string[]} wordDict', ' * @return {boolean}', ' */', 'var ' + fn + ' = function(s, wordDict) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _s=_d[_p++];const _c=+_d[_p++];const _w=_d.slice(_p,_p+_c);_p+=_c;_o.push(' + fn + "(_s,_w)?'true':'false');}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    bool ' + fn + '(string s, vector<string>& wordDict) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){string s;cin>>s;int c;cin>>c;vector<string> w(c);for(int i=0;i<c;i++)cin>>w[i];cout<<(Solution().' + fn + '(s,w)?"true":"false")<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public boolean ' + fn + '(String s, List<String> wordDict) {', '        // Write your code here', '        return false;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){String s=sc.next();int c=sc.nextInt();List<String> w=new ArrayList<>();for(int i=0;i<c;i++)w.add(sc.next());sb.append(new Solution().' + fn + '(s,w)?"true":"false").append("\\n");}System.out.print(sb);}}') },
  };
};

// ---------- Binary tree types (level-order input with "null" markers) ----------
// ret: 'int' | 'bool' | 'arr'
function treeType(fn, ret) {
  var pyOut = ret === 'bool' ? "('true' if _r else 'false')" : (ret === 'arr' ? "' '.join(map(str,_r))" : 'str(_r)');
  var jsOut = ret === 'bool' ? "(_r?'true':'false')" : (ret === 'arr' ? "_r.join(' ')" : 'String(_r)');
  var cppType = ret === 'bool' ? 'bool' : (ret === 'arr' ? 'vector<int>' : 'int');
  var javaType = ret === 'bool' ? 'boolean' : (ret === 'arr' ? 'int[]' : 'int');
  var javaRet = ret === 'bool' ? 'false' : (ret === 'arr' ? 'new int[]{}' : '0');
  var cppPrint = ret === 'bool' ? 'cout<<(_r?"true":"false")<<"\\n";' : (ret === 'arr' ? 'for(size_t i=0;i<_r.size();i++){if(i)cout<<\' \';cout<<_r[i];}cout<<"\\n";' : 'cout<<_r<<"\\n";');
  var javaPrint = ret === 'bool' ? 'sb.append(_r?"true":"false").append("\\n");' : (ret === 'arr' ? 'for(int i=0;i<_r.length;i++){if(i>0)sb.append(\' \');sb.append(_r[i]);}sb.append("\\n");' : 'sb.append(_r).append("\\n");');
  return {
    python: {
      stub: ln('class TreeNode:', '    def __init__(self, val=0, left=None, right=None):', '        self.val = val', '        self.left = left', '        self.right = right', '', 'class Solution:', '    def ' + fn + '(self, root):', '        # Write your code here', '        pass'),
      harness: ln('import sys', 'from collections import deque', 'def _bt(t):', '    if not t or t[0]=="null": return None', '    root=TreeNode(int(t[0])); q=deque([root]); i=1', '    while q and i<len(t):', '        n=q.popleft()', '        if i<len(t) and t[i]!="null":', '            n.left=TreeNode(int(t[i])); q.append(n.left)', '        i+=1', '        if i<len(t) and t[i]!="null":', '            n.right=TreeNode(int(t[i])); q.append(n.right)', '        i+=1', '    return root', '_L=sys.stdin.read().split("\\n"); _T=int(_L[0]); _o=[]', 'for _i in range(_T):', '    _t=_L[1+_i].split() if 1+_i<len(_L) else []', '    _r=Solution().' + fn + '(_bt(_t))', '    _o.append(' + pyOut + ')', 'print("\\n".join(_o))'),
    },
    javascript: {
      stub: ln('/**', ' * Tree node shape: { val, left, right }', ' * @param {TreeNode} root', ' * @return {' + (ret === 'bool' ? 'boolean' : ret === 'arr' ? 'number[]' : 'number') + '}', ' */', 'var ' + fn + ' = function(root) {', '    // Write your code here', '};'),
      harness: ln('function _bt(line){', '  const t=line.split(/\\s+/).filter(x=>x.length);', '  if(!t.length||t[0]==="null")return null;', '  const root={val:+t[0],left:null,right:null}; const q=[root]; let i=1;', '  while(q.length&&i<t.length){', '    const n=q.shift();', '    if(i<t.length&&t[i]!=="null"){n.left={val:+t[i],left:null,right:null};q.push(n.left);} i++;', '    if(i<t.length&&t[i]!=="null"){n.right={val:+t[i],left:null,right:null};q.push(n.right);} i++;', '  }', '  return root;', '}', 'const _L=require("fs").readFileSync(0,"utf8").split("\\n"); const _T=+_L[0]; const _o=[];', 'for(let _i=0;_i<_T;_i++){ const _r=' + fn + '(_bt((_L[1+_i]||"").replace(/\\r$/,""))); _o.push(' + jsOut + '); }', 'console.log(_o.join("\\n"));'),
    },
    cpp: {
      stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'struct TreeNode {', '    int val; TreeNode *left, *right;', '    TreeNode(int v): val(v), left(nullptr), right(nullptr) {}', '};', '', 'class Solution {', 'public:', '    ' + cppType + ' ' + fn + '(TreeNode* root) {', '        // Write your code here', '    }', '};'),
      harness: ln('TreeNode* _bt(string line){', '  istringstream is(line); vector<string> t; string x; while(is>>x) t.push_back(x);', '  if(t.empty()||t[0]=="null") return nullptr;', '  TreeNode* root=new TreeNode(stoi(t[0])); queue<TreeNode*> q; q.push(root); size_t i=1;', '  while(!q.empty()&&i<t.size()){', '    TreeNode* n=q.front(); q.pop();', '    if(i<t.size()&&t[i]!="null"){n->left=new TreeNode(stoi(t[i]));q.push(n->left);} i++;', '    if(i<t.size()&&t[i]!="null"){n->right=new TreeNode(stoi(t[i]));q.push(n->right);} i++;', '  }', '  return root;', '}', 'int main(){', '  string line; getline(cin,line); int T=stoi(line);', '  for(int c=0;c<T;c++){ string l; if(!getline(cin,l))l=""; auto _r=Solution().' + fn + '(_bt(l)); ' + cppPrint + ' }', '}'),
    },
    java: {
      stub: ln('import java.util.*;', '', 'class TreeNode {', '    int val; TreeNode left, right;', '    TreeNode(int v) { val = v; }', '}', '', 'class Solution {', '    public ' + javaType + ' ' + fn + '(TreeNode root) {', '        // Write your code here', '        return ' + javaRet + ';', '    }', '}'),
      harness: ln('public class Main {', '  static TreeNode bt(String line){', '    if(line==null) return null;', '    String[] t=line.trim().split("\\\\s+");', '    if(t.length==0||t[0].isEmpty()||t[0].equals("null")) return null;', '    TreeNode root=new TreeNode(Integer.parseInt(t[0]));', '    Queue<TreeNode> q=new LinkedList<>(); q.add(root); int i=1;', '    while(!q.isEmpty()&&i<t.length){', '      TreeNode n=q.poll();', '      if(i<t.length&&!t[i].equals("null")){n.left=new TreeNode(Integer.parseInt(t[i]));q.add(n.left);} i++;', '      if(i<t.length&&!t[i].equals("null")){n.right=new TreeNode(Integer.parseInt(t[i]));q.add(n.right);} i++;', '    }', '    return root;', '  }', '  public static void main(String[] a){', '    Scanner sc=new Scanner(System.in);', '    int T=Integer.parseInt(sc.nextLine().trim());', '    StringBuilder sb=new StringBuilder();', '    for(int c=0;c<T;c++){', '      String line=sc.hasNextLine()?sc.nextLine():"";', '      ' + javaType + ' _r=new Solution().' + fn + '(bt(line));', '      ' + javaPrint, '    }', '    System.out.print(sb);', '  }', '}'),
    },
  };
}
T.TREE_INT = function (fn) { return treeType(fn, 'int'); };
T.TREE_BOOL = function (fn) { return treeType(fn, 'bool'); };
T.TREE_ARR = function (fn) { return treeType(fn, 'arr'); };

module.exports = { T, randInt, randArr, arrStr, ln };
