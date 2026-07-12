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

// (string s, string t) -> int   (line-based: T then 2 lines per case)
T.STR_STR_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, s, t):', '        # Write your code here', '        pass'),
      harness: ln('import sys', "_l=sys.stdin.read().split('\\n')", '_T=int(_l[0]);_o=[]', 'for _i in range(_T):', '    _s=_l[1+2*_i] if 1+2*_i<len(_l) else ""', '    _t=_l[2+2*_i] if 2+2*_i<len(_l) else ""', '    _o.append(str(Solution().' + fn + '(_s,_t)))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {string} s', ' * @param {string} t', ' * @return {number}', ' */', 'var ' + fn + ' = function(s, t) {', '    // Write your code here', '};'),
      harness: ln("const _l=require('fs').readFileSync(0,'utf8').split('\\n');const _T=+_l[0];const _o=[];", "for(let _i=0;_i<_T;_i++){const _s=(_l[1+2*_i]||'').replace(/\\r$/,'');const _t=(_l[2+2*_i]||'').replace(/\\r$/,'');_o.push(String(" + fn + "(_s,_t)));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(string s, string t) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){string l;getline(cin,l);int T=stoi(l);string s,t;for(int i=0;i<T;i++){if(!getline(cin,s))s="";if(!getline(cin,t))t="";cout<<Solution().' + fn + '(s,t)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(String s, String t) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";String t=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().' + fn + '(s,t)).append("\\n");}System.out.print(sb);}}') },
  };
};

// (int[] nums, int k) -> int   (whitespace: n, nums, k)
T.ARR_INT_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, nums, k):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _nums=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _k=int(_d[_p]);_p+=1', '    _o.append(str(Solution().' + fn + '(_nums,_k)))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[]} nums', ' * @param {number} k', ' * @return {number}', ' */', 'var ' + fn + ' = function(nums, k) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _nums=_d.slice(_p,_p+_n).map(Number);_p+=_n;const _k=+_d[_p++];_o.push(String(' + fn + '(_nums,_k)));}', "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(vector<int>& nums, int k) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];int k;cin>>k;cout<<Solution().' + fn + '(nums,k)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(int[] nums, int k) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();int k=sc.nextInt();sb.append(new Solution().' + fn + '(nums,k)).append("\\n");}System.out.print(sb);}}') },
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

// ---------- Singly linked list types (array input, array output) ----------
// Python/JS/C++/Java stubs include the ListNode definition; harnesses build
// the list from "n v0 v1 ..." and print the result list space-separated.
var _LN_PY = ln('class ListNode:', '    def __init__(self, val=0, next=None):', '        self.val = val', '        self.next = next', '');
var _LN_CPP = ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'struct ListNode {', '    int val; ListNode *next;', '    ListNode(int x): val(x), next(nullptr) {}', '};', '');
var _LN_JAVA = ln('import java.util.*;', '', 'class ListNode {', '    int val; ListNode next;', '    ListNode(int x) { val = x; }', '}', '');
var _LN_JS = ln('/** Node shape: { val, next }. Build/return plain objects or use this ctor. */', 'function ListNode(val, next) { this.val = (val === undefined ? 0 : val); this.next = (next === undefined ? null : next); }', '');

var _BL_PY = ln('def _bl(vals):', '    dummy=ListNode(0); cur=dummy', '    for v in vals: cur.next=ListNode(v); cur=cur.next', '    return dummy.next', 'def _tl(head):', '    out=[]', '    while head: out.append(head.val); head=head.next', '    return out');
var _BL_JS = ln('function _bl(vals){let d=new ListNode(0),cur=d;for(const v of vals){cur.next=new ListNode(v);cur=cur.next;}return d.next;}', 'function _tl(head){const o=[];while(head){o.push(head.val);head=head.next;}return o;}');
var _BL_CPP = ln('ListNode* _bl(vector<int>& vals){ListNode d(0);ListNode* cur=&d;for(int v:vals){cur->next=new ListNode(v);cur=cur->next;}return d.next;}', 'string _tl(ListNode* h){string s;bool f=true;while(h){if(!f)s+=" ";s+=to_string(h->val);f=false;h=h->next;}return s;}');
var _BL_JAVA = ln('  static ListNode bl(int[] vals){ListNode d=new ListNode(0),cur=d;for(int v:vals){cur.next=new ListNode(v);cur=cur.next;}return d.next;}', '  static String tl(ListNode h){StringBuilder s=new StringBuilder();boolean f=true;while(h!=null){if(!f)s.append(" ");s.append(h.val);f=false;h=h.next;}return s.toString();}');

// (ListNode head) -> ListNode   (stdin: n, values; output list values)
T.LIST_ARR = function (fn) {
  return {
    python: { stub: ln(_LN_PY + 'class Solution:', '    def ' + fn + '(self, head):', '        # Write your code here', '        pass'),
      harness: ln('import sys', _BL_PY, '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _vals=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _r=Solution().' + fn + '(_bl(_vals))', "    _o.append(' '.join(map(str,_tl(_r))))", "print('\\n'.join(_o))") },
    javascript: { stub: ln(_LN_JS + '/**', ' * @param {ListNode} head', ' * @return {ListNode}', ' */', 'var ' + fn + ' = function(head) {', '    // Write your code here', '};'),
      harness: ln(_BL_JS, "const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _vals=_d.slice(_p,_p+_n).map(Number);_p+=_n;const _r=" + fn + "(_bl(_vals));_o.push(_tl(_r).join(' '));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln(_LN_CPP + 'class Solution {', 'public:', '    ListNode* ' + fn + '(ListNode* head) {', '        // Write your code here', '    }', '};'),
      harness: ln(_BL_CPP, 'int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> v(n);for(int i=0;i<n;i++)cin>>v[i];ListNode* r=Solution().' + fn + '(_bl(v));cout<<_tl(r)<<"\\n";}}') },
    java: { stub: ln(_LN_JAVA + 'class Solution {', '    public ListNode ' + fn + '(ListNode head) {', '        // Write your code here', '        return head;', '    }', '}'),
      harness: ln('public class Main {', _BL_JAVA, '  public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] v=new int[n];for(int i=0;i<n;i++)v[i]=sc.nextInt();ListNode r=new Solution().' + fn + '(bl(v));sb.append(tl(r)).append("\\n");}System.out.print(sb);}', '}') },
  };
};

// (ListNode l1, ListNode l2) -> ListNode   (stdin: n1, vals1, n2, vals2)
T.LIST_LIST_ARR = function (fn) {
  return {
    python: { stub: ln(_LN_PY + 'class Solution:', '    def ' + fn + '(self, l1, l2):', '        # Write your code here', '        pass'),
      harness: ln('import sys', _BL_PY, '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n1=int(_d[_p]);_p+=1', '    _v1=list(map(int,_d[_p:_p+_n1]));_p+=_n1', '    _n2=int(_d[_p]);_p+=1', '    _v2=list(map(int,_d[_p:_p+_n2]));_p+=_n2', '    _r=Solution().' + fn + '(_bl(_v1),_bl(_v2))', "    _o.append(' '.join(map(str,_tl(_r))))", "print('\\n'.join(_o))") },
    javascript: { stub: ln(_LN_JS + '/**', ' * @param {ListNode} l1', ' * @param {ListNode} l2', ' * @return {ListNode}', ' */', 'var ' + fn + ' = function(l1, l2) {', '    // Write your code here', '};'),
      harness: ln(_BL_JS, "const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _n1=+_d[_p++];const _v1=_d.slice(_p,_p+_n1).map(Number);_p+=_n1;const _n2=+_d[_p++];const _v2=_d.slice(_p,_p+_n2).map(Number);_p+=_n2;const _r=" + fn + "(_bl(_v1),_bl(_v2));_o.push(_tl(_r).join(' '));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln(_LN_CPP + 'class Solution {', 'public:', '    ListNode* ' + fn + '(ListNode* l1, ListNode* l2) {', '        // Write your code here', '    }', '};'),
      harness: ln(_BL_CPP, 'int main(){int T;cin>>T;while(T--){int n1;cin>>n1;vector<int> v1(n1);for(int i=0;i<n1;i++)cin>>v1[i];int n2;cin>>n2;vector<int> v2(n2);for(int i=0;i<n2;i++)cin>>v2[i];ListNode* r=Solution().' + fn + '(_bl(v1),_bl(v2));cout<<_tl(r)<<"\\n";}}') },
    java: { stub: ln(_LN_JAVA + 'class Solution {', '    public ListNode ' + fn + '(ListNode l1, ListNode l2) {', '        // Write your code here', '        return l1;', '    }', '}'),
      harness: ln('public class Main {', _BL_JAVA, '  public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n1=sc.nextInt();int[] v1=new int[n1];for(int i=0;i<n1;i++)v1[i]=sc.nextInt();int n2=sc.nextInt();int[] v2=new int[n2];for(int i=0;i<n2;i++)v2[i]=sc.nextInt();ListNode r=new Solution().' + fn + '(bl(v1),bl(v2));sb.append(tl(r)).append("\\n");}System.out.print(sb);}', '}') },
  };
};

// (ListNode head, int k) -> ListNode   (stdin: n, vals, k)
T.LIST_INT_ARR = function (fn) {
  return {
    python: { stub: ln(_LN_PY + 'class Solution:', '    def ' + fn + '(self, head, k):', '        # Write your code here', '        pass'),
      harness: ln('import sys', _BL_PY, '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _vals=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _k=int(_d[_p]);_p+=1', '    _r=Solution().' + fn + '(_bl(_vals),_k)', "    _o.append(' '.join(map(str,_tl(_r))))", "print('\\n'.join(_o))") },
    javascript: { stub: ln(_LN_JS + '/**', ' * @param {ListNode} head', ' * @param {number} k', ' * @return {ListNode}', ' */', 'var ' + fn + ' = function(head, k) {', '    // Write your code here', '};'),
      harness: ln(_BL_JS, "const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _vals=_d.slice(_p,_p+_n).map(Number);_p+=_n;const _k=+_d[_p++];const _r=" + fn + "(_bl(_vals),_k);_o.push(_tl(_r).join(' '));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln(_LN_CPP + 'class Solution {', 'public:', '    ListNode* ' + fn + '(ListNode* head, int k) {', '        // Write your code here', '    }', '};'),
      harness: ln(_BL_CPP, 'int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> v(n);for(int i=0;i<n;i++)cin>>v[i];int k;cin>>k;ListNode* r=Solution().' + fn + '(_bl(v),k);cout<<_tl(r)<<"\\n";}}') },
    java: { stub: ln(_LN_JAVA + 'class Solution {', '    public ListNode ' + fn + '(ListNode head, int k) {', '        // Write your code here', '        return head;', '    }', '}'),
      harness: ln('public class Main {', _BL_JAVA, '  public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] v=new int[n];for(int i=0;i<n;i++)v[i]=sc.nextInt();int k=sc.nextInt();ListNode r=new Solution().' + fn + '(bl(v),k);sb.append(tl(r)).append("\\n");}System.out.print(sb);}', '}') },
  };
};

// (ListNode head) -> boolean, list may be cyclic   (stdin: n, vals, pos)
T.LIST_POS_BOOL = function (fn) {
  return {
    python: { stub: ln(_LN_PY + 'class Solution:', '    def ' + fn + '(self, head):', '        # Write your code here', '        pass'),
      harness: ln('import sys', 'def _blc(vals,pos):', '    if not vals: return None', '    nodes=[ListNode(v) for v in vals]', '    for i in range(len(nodes)-1): nodes[i].next=nodes[i+1]', '    if pos>=0: nodes[-1].next=nodes[pos]', '    return nodes[0]', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _vals=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _pos=int(_d[_p]);_p+=1', "    _o.append('true' if Solution()." + fn + "(_blc(_vals,_pos)) else 'false')", "print('\\n'.join(_o))") },
    javascript: { stub: ln(_LN_JS + '/**', ' * @param {ListNode} head', ' * @return {boolean}', ' */', 'var ' + fn + ' = function(head) {', '    // Write your code here', '};'),
      harness: ln('function _blc(vals,pos){if(!vals.length)return null;const nodes=vals.map(v=>new ListNode(v));for(let i=0;i<nodes.length-1;i++)nodes[i].next=nodes[i+1];if(pos>=0)nodes[nodes.length-1].next=nodes[pos];return nodes[0];}', "const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _vals=_d.slice(_p,_p+_n).map(Number);_p+=_n;const _pos=+_d[_p++];_o.push(" + fn + "(_blc(_vals,_pos))?'true':'false');}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln(_LN_CPP + 'class Solution {', 'public:', '    bool ' + fn + '(ListNode* head) {', '        // Write your code here', '    }', '};'),
      harness: ln('ListNode* _blc(vector<int>& vals,int pos){if(vals.empty())return nullptr;vector<ListNode*> nodes;for(int v:vals)nodes.push_back(new ListNode(v));for(size_t i=0;i+1<nodes.size();i++)nodes[i]->next=nodes[i+1];if(pos>=0)nodes.back()->next=nodes[pos];return nodes[0];}', 'int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> v(n);for(int i=0;i<n;i++)cin>>v[i];int pos;cin>>pos;cout<<(Solution().' + fn + '(_blc(v,pos))?"true":"false")<<"\\n";}}') },
    java: { stub: ln(_LN_JAVA + 'class Solution {', '    public boolean ' + fn + '(ListNode head) {', '        // Write your code here', '        return false;', '    }', '}'),
      harness: ln('public class Main {', '  static ListNode blc(int[] vals,int pos){if(vals.length==0)return null;ListNode[] nodes=new ListNode[vals.length];for(int i=0;i<vals.length;i++)nodes[i]=new ListNode(vals[i]);for(int i=0;i+1<nodes.length;i++)nodes[i].next=nodes[i+1];if(pos>=0)nodes[nodes.length-1].next=nodes[pos];return nodes[0];}', '  public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] v=new int[n];for(int i=0;i<n;i++)v[i]=sc.nextInt();int pos=sc.nextInt();sb.append(new Solution().' + fn + '(blc(v,pos))?"true":"false").append("\\n");}System.out.print(sb);}', '}') },
  };
};

// (ListNode[] lists) -> ListNode   (stdin: K, then each list: n, vals)
T.LISTK_ARR = function (fn) {
  return {
    python: { stub: ln(_LN_PY + 'class Solution:', '    def ' + fn + '(self, lists):', '        # Write your code here', '        pass'),
      harness: ln('import sys', _BL_PY, '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _K=int(_d[_p]);_p+=1', '    _lists=[]', '    for _j in range(_K):', '        _n=int(_d[_p]);_p+=1', '        _vals=list(map(int,_d[_p:_p+_n]));_p+=_n', '        _lists.append(_bl(_vals))', '    _r=Solution().' + fn + '(_lists)', "    _o.append(' '.join(map(str,_tl(_r))))", "print('\\n'.join(_o))") },
    javascript: { stub: ln(_LN_JS + '/**', ' * @param {ListNode[]} lists', ' * @return {ListNode}', ' */', 'var ' + fn + ' = function(lists) {', '    // Write your code here', '};'),
      harness: ln(_BL_JS, "const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _K=+_d[_p++];const _lists=[];for(let _j=0;_j<_K;_j++){const _n=+_d[_p++];const _vals=_d.slice(_p,_p+_n).map(Number);_p+=_n;_lists.push(_bl(_vals));}const _r=" + fn + "(_lists);_o.push(_tl(_r).join(' '));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln(_LN_CPP + 'class Solution {', 'public:', '    ListNode* ' + fn + '(vector<ListNode*>& lists) {', '        // Write your code here', '    }', '};'),
      harness: ln(_BL_CPP, 'int main(){int T;cin>>T;while(T--){int K;cin>>K;vector<ListNode*> lists;for(int j=0;j<K;j++){int n;cin>>n;vector<int> v(n);for(int i=0;i<n;i++)cin>>v[i];lists.push_back(_bl(v));}ListNode* r=Solution().' + fn + '(lists);cout<<_tl(r)<<"\\n";}}') },
    java: { stub: ln(_LN_JAVA + 'class Solution {', '    public ListNode ' + fn + '(ListNode[] lists) {', '        // Write your code here', '        return null;', '    }', '}'),
      harness: ln('public class Main {', _BL_JAVA, '  public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int K=sc.nextInt();ListNode[] lists=new ListNode[K];for(int j=0;j<K;j++){int n=sc.nextInt();int[] v=new int[n];for(int i=0;i<n;i++)v[i]=sc.nextInt();lists[j]=bl(v);}ListNode r=new Solution().' + fn + '(lists);sb.append(tl(r)).append("\\n");}System.out.print(sb);}', '}') },
  };
};

// (int[][] grid) -> int   (whitespace: R, C, then R*C ints)
T.GRID_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, grid):', '        # Write your code here', '        pass'),
      harness: ln('import sys', 'sys.setrecursionlimit(100000)', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _R=int(_d[_p]);_p+=1', '    _C=int(_d[_p]);_p+=1', '    _g=[]', '    for _r in range(_R):', '        _g.append(list(map(int,_d[_p:_p+_C])));_p+=_C', '    _o.append(str(Solution().' + fn + '(_g)))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[][]} grid', ' * @return {number}', ' */', 'var ' + fn + ' = function(grid) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _R=+_d[_p++];const _C=+_d[_p++];const _g=[];for(let _r=0;_r<_R;_r++){_g.push(_d.slice(_p,_p+_C).map(Number));_p+=_C;}_o.push(String(' + fn + '(_g)));}', "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(vector<vector<int>>& grid) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int R,C;cin>>R>>C;vector<vector<int>> g(R,vector<int>(C));for(int i=0;i<R;i++)for(int j=0;j<C;j++)cin>>g[i][j];cout<<Solution().' + fn + '(g)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(int[][] grid) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int R=sc.nextInt();int C=sc.nextInt();int[][] g=new int[R][C];for(int i=0;i<R;i++)for(int j=0;j<C;j++)g[i][j]=sc.nextInt();sb.append(new Solution().' + fn + '(g)).append("\\n");}System.out.print(sb);}}') },
  };
};

// (int[][] grid) -> int[]   (whitespace: R, C, then R*C ints; output space-separated)
T.GRID_ARR = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, matrix):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _R=int(_d[_p]);_p+=1', '    _C=int(_d[_p]);_p+=1', '    _g=[]', '    for _r in range(_R):', '        _g.append(list(map(int,_d[_p:_p+_C])));_p+=_C', "    _o.append(' '.join(map(str,Solution()." + fn + '(_g))))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[][]} matrix', ' * @return {number[]}', ' */', 'var ' + fn + ' = function(matrix) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _R=+_d[_p++];const _C=+_d[_p++];const _g=[];for(let _r=0;_r<_R;_r++){_g.push(_d.slice(_p,_p+_C).map(Number));_p+=_C;}_o.push(" + fn + "(_g).join(' '));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<int> ' + fn + '(vector<vector<int>>& matrix) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int R,C;cin>>R>>C;vector<vector<int>> g(R,vector<int>(C));for(int i=0;i<R;i++)for(int j=0;j<C;j++)cin>>g[i][j];vector<int> r=Solution().' + fn + '(g);for(size_t i=0;i<r.size();i++){if(i)cout<<\' \';cout<<r[i];}cout<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public java.util.List<Integer> ' + fn + '(int[][] matrix) {', '        // Write your code here', '        return new ArrayList<>();', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int R=sc.nextInt();int C=sc.nextInt();int[][] g=new int[R][C];for(int i=0;i<R;i++)for(int j=0;j<C;j++)g[i][j]=sc.nextInt();java.util.List<Integer> r=new Solution().' + fn + '(g);for(int j=0;j<r.size();j++){if(j>0)sb.append(\' \');sb.append(r.get(j));}sb.append("\\n");}System.out.print(sb);}}') },
  };
};

// (int[][] matrix, int target) -> boolean   (whitespace: R, C, R*C ints, target)
T.GRID_TGT_BOOL = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, matrix, target):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _R=int(_d[_p]);_p+=1', '    _C=int(_d[_p]);_p+=1', '    _g=[]', '    for _r in range(_R):', '        _g.append(list(map(int,_d[_p:_p+_C])));_p+=_C', '    _t=int(_d[_p]);_p+=1', "    _o.append('true' if Solution()." + fn + "(_g,_t) else 'false')", "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[][]} matrix', ' * @param {number} target', ' * @return {boolean}', ' */', 'var ' + fn + ' = function(matrix, target) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _R=+_d[_p++];const _C=+_d[_p++];const _g=[];for(let _r=0;_r<_R;_r++){_g.push(_d.slice(_p,_p+_C).map(Number));_p+=_C;}const _t=+_d[_p++];_o.push(" + fn + "(_g,_t)?'true':'false');}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    bool ' + fn + '(vector<vector<int>>& matrix, int target) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int R,C;cin>>R>>C;vector<vector<int>> g(R,vector<int>(C));for(int i=0;i<R;i++)for(int j=0;j<C;j++)cin>>g[i][j];int t;cin>>t;cout<<(Solution().' + fn + '(g,t)?"true":"false")<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public boolean ' + fn + '(int[][] matrix, int target) {', '        // Write your code here', '        return false;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int R=sc.nextInt();int C=sc.nextInt();int[][] g=new int[R][C];for(int i=0;i<R;i++)for(int j=0;j<C;j++)g[i][j]=sc.nextInt();int t=sc.nextInt();sb.append(new Solution().' + fn + '(g,t)?"true":"false").append("\\n");}System.out.print(sb);}}') },
  };
};

// (int[][] grid) -> boolean   (whitespace: R, C, then R*C ints)
T.GRID_BOOL = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, intervals):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _R=int(_d[_p]);_p+=1', '    _C=int(_d[_p]);_p+=1', '    _g=[]', '    for _r in range(_R):', '        _g.append(list(map(int,_d[_p:_p+_C])));_p+=_C', "    _o.append('true' if Solution()." + fn + "(_g) else 'false')", "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[][]} intervals', ' * @return {boolean}', ' */', 'var ' + fn + ' = function(intervals) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _R=+_d[_p++];const _C=+_d[_p++];const _g=[];for(let _r=0;_r<_R;_r++){_g.push(_d.slice(_p,_p+_C).map(Number));_p+=_C;}_o.push(" + fn + "(_g)?'true':'false');}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    bool ' + fn + '(vector<vector<int>>& intervals) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int R,C;cin>>R>>C;vector<vector<int>> g(R,vector<int>(C));for(int i=0;i<R;i++)for(int j=0;j<C;j++)cin>>g[i][j];cout<<(Solution().' + fn + '(g)?"true":"false")<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public boolean ' + fn + '(int[][] intervals) {', '        // Write your code here', '        return false;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int R=sc.nextInt();int C=sc.nextInt();int[][] g=new int[R][C];for(int i=0;i<R;i++)for(int j=0;j<C;j++)g[i][j]=sc.nextInt();sb.append(new Solution().' + fn + '(g)?"true":"false").append("\\n");}System.out.print(sb);}}') },
  };
};

// (int[][] grid) -> int[][]   (input R C then R*C ints; output rows joined by | )
T.GRID_GRID = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, grid):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _R=int(_d[_p]);_p+=1', '    _C=int(_d[_p]);_p+=1', '    _g=[]', '    for _r in range(_R):', '        _g.append(list(map(int,_d[_p:_p+_C])));_p+=_C', '    _res=Solution().' + fn + '(_g)', "    _o.append('|'.join(' '.join(str(x) for x in row) for row in _res))", "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[][]} grid', ' * @return {number[][]}', ' */', 'var ' + fn + ' = function(grid) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _R=+_d[_p++];const _C=+_d[_p++];const _g=[];for(let _r=0;_r<_R;_r++){_g.push(_d.slice(_p,_p+_C).map(Number));_p+=_C;}const _res=" + fn + "(_g)||_g;_o.push(_res.map(function(row){return row.join(' ');}).join('|'));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<vector<int>> ' + fn + '(vector<vector<int>>& grid) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int R,C;cin>>R>>C;vector<vector<int>> g(R,vector<int>(C));for(int i=0;i<R;i++)for(int j=0;j<C;j++)cin>>g[i][j];auto res=Solution().' + fn + '(g);string s;for(size_t i=0;i<res.size();i++){if(i)s+="|";for(size_t j=0;j<res[i].size();j++){if(j)s+=" ";s+=to_string(res[i][j]);}}cout<<s<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int[][] ' + fn + '(int[][] grid) {', '        // Write your code here', '        return grid;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int R=sc.nextInt();int C=sc.nextInt();int[][] g=new int[R][C];for(int i=0;i<R;i++)for(int j=0;j<C;j++)g[i][j]=sc.nextInt();int[][] res=new Solution().' + fn + '(g);if(res==null)res=g;StringBuilder s=new StringBuilder();for(int i=0;i<res.length;i++){if(i>0)s.append("|");for(int j=0;j<res[i].length;j++){if(j>0)s.append(" ");s.append(res[i][j]);}}sb.append(s).append("\\n");}System.out.print(sb);}}') },
  };
};

// ----- canonicalizers for list-of-list outputs (order-independent judging) --
var _CANON_PY = ln('def _cmp_key(x): return (len(x), x)', 'def _canon(res, sw):', '    r=[sorted(x) if sw else list(x) for x in res]', '    r.sort()', "    return '|'.join(' '.join(map(str,x)) for x in r)", 'def _canonS(res, sw):', '    r=[sorted(x) if sw else list(x) for x in res]', '    r.sort()', "    return '|'.join(' '.join(x) for x in r)");
var _CANON_JS = ln('function _cmp(a,b){for(var i=0;i<Math.min(a.length,b.length);i++){if(a[i]<b[i])return -1;if(a[i]>b[i])return 1;}return a.length-b.length;}', 'function _canon(res,sw){var r=res.map(function(x){return sw?x.slice().sort(function(p,q){return p-q;}):x.slice();});r.sort(_cmp);return r.map(function(x){return x.join(" ");}).join("|");}', 'function _canonS(res,sw){var r=res.map(function(x){return sw?x.slice().sort():x.slice();});r.sort(_cmp);return r.map(function(x){return x.join(" ");}).join("|");}');
var _CANON_CPP = ln('template<class V> string _canonI(vector<vector<int>> res, bool sw){if(sw)for(auto&x:res)sort(x.begin(),x.end());sort(res.begin(),res.end());string s;for(size_t i=0;i<res.size();i++){if(i)s+="|";for(size_t j=0;j<res[i].size();j++){if(j)s+=" ";s+=to_string(res[i][j]);}}return s;}', 'string _canonS(vector<vector<string>> res, bool sw){if(sw)for(auto&x:res)sort(x.begin(),x.end());sort(res.begin(),res.end());string s;for(size_t i=0;i<res.size();i++){if(i)s+="|";for(size_t j=0;j<res[i].size();j++){if(j)s+=" ";s+=res[i][j];}}return s;}');
var _CANON_JAVA = ln('  static <T extends Comparable<T>> int cmpL(List<T> a, List<T> b){int n=Math.min(a.size(),b.size());for(int i=0;i<n;i++){int c=a.get(i).compareTo(b.get(i));if(c!=0)return c;}return a.size()-b.size();}', '  static String canonI(List<List<Integer>> res, boolean sw){List<List<Integer>> r=new ArrayList<>();for(List<Integer> x:res){List<Integer> y=new ArrayList<>(x);if(sw)Collections.sort(y);r.add(y);}r.sort(Main::cmpL);StringBuilder s=new StringBuilder();for(int i=0;i<r.size();i++){if(i>0)s.append("|");for(int j=0;j<r.get(i).size();j++){if(j>0)s.append(" ");s.append(r.get(i).get(j));}}return s.toString();}', '  static String canonS(List<List<String>> res, boolean sw){List<List<String>> r=new ArrayList<>();for(List<String> x:res){List<String> y=new ArrayList<>(x);if(sw)Collections.sort(y);r.add(y);}r.sort(Main::cmpL);StringBuilder s=new StringBuilder();for(int i=0;i<r.size();i++){if(i>0)s.append("|");for(int j=0;j<r.get(i).size();j++){if(j>0)s.append(" ");s.append(r.get(i).get(j));}}return s.toString();}');
var _SORTSTR_JS = ln('function _sortStr(arr){return arr.slice().sort().join(" ");}');

// (int[] nums) -> int[][]   canonical; sw=sort-within (subsets/combos) vs false (perms)
function arrListsType(fn, sw) {
  var swp = sw ? 'True' : 'False', swj = sw ? 'true' : 'false';
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, nums):', '        # Write your code here', '        pass'),
      harness: ln('import sys', _CANON_PY, '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _nums=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _o.append(_canon(Solution().' + fn + '(_nums), ' + swp + '))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[]} nums', ' * @return {number[][]}', ' */', 'var ' + fn + ' = function(nums) {', '    // Write your code here', '};'),
      harness: ln(_CANON_JS, "const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _nums=_d.slice(_p,_p+_n).map(Number);_p+=_n;_o.push(_canon(' + fn + '(_nums),' + swj + '));}', "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<vector<int>> ' + fn + '(vector<int>& nums) {', '        // Write your code here', '    }', '};'),
      harness: ln(_CANON_CPP, 'int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];cout<<_canonI<int>(Solution().' + fn + '(nums),' + swj + ')<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public List<List<Integer>> ' + fn + '(int[] nums) {', '        // Write your code here', '        return new ArrayList<>();', '    }', '}'),
      harness: ln('public class Main {', _CANON_JAVA, '  public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();sb.append(canonI(new Solution().' + fn + '(nums),' + swj + ')).append("\\n");}System.out.print(sb);}', '}') },
  };
}
T.ARR_LISTS = function (fn) { return arrListsType(fn, true); };
T.ARR_LISTS_PERM = function (fn) { return arrListsType(fn, false); };

// (int[] candidates, int target) -> int[][]   canonical, sort-within
T.ARR_INT_LISTS = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, candidates, target):', '        # Write your code here', '        pass'),
      harness: ln('import sys', _CANON_PY, '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _c=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _t=int(_d[_p]);_p+=1', '    _o.append(_canon(Solution().' + fn + '(_c,_t), True))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number[]} candidates', ' * @param {number} target', ' * @return {number[][]}', ' */', 'var ' + fn + ' = function(candidates, target) {', '    // Write your code here', '};'),
      harness: ln(_CANON_JS, "const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _c=_d.slice(_p,_p+_n).map(Number);_p+=_n;const _t=+_d[_p++];_o.push(_canon(' + fn + '(_c,_t),true));}', "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<vector<int>> ' + fn + '(vector<int>& candidates, int target) {', '        // Write your code here', '    }', '};'),
      harness: ln(_CANON_CPP, 'int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> c(n);for(int i=0;i<n;i++)cin>>c[i];int t;cin>>t;cout<<_canonI<int>(Solution().' + fn + '(c,t),true)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public List<List<Integer>> ' + fn + '(int[] candidates, int target) {', '        // Write your code here', '        return new ArrayList<>();', '    }', '}'),
      harness: ln('public class Main {', _CANON_JAVA, '  public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] c=new int[n];for(int i=0;i<n;i++)c[i]=sc.nextInt();int t=sc.nextInt();sb.append(canonI(new Solution().' + fn + '(c,t),true)).append("\\n");}System.out.print(sb);}', '}') },
  };
};

// (int n) -> string[]   (sorted, space-joined)
T.INT_ARRSTR = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, n):', '        # Write your code here', '        pass'),
      harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', "    _o.append(' '.join(sorted(Solution()." + fn + '(_n))))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {number} n', ' * @return {string[]}', ' */', 'var ' + fn + ' = function(n) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];_o.push(" + fn + "(_n).slice().sort().join(' '));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<string> ' + fn + '(int n) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<string> r=Solution().' + fn + '(n);sort(r.begin(),r.end());string s;for(size_t i=0;i<r.size();i++){if(i)s+=" ";s+=r[i];}cout<<s<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public List<String> ' + fn + '(int n) {', '        // Write your code here', '        return new ArrayList<>();', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();List<String> r=new Solution().' + fn + '(n);Collections.sort(r);sb.append(String.join(" ",r)).append("\\n");}System.out.print(sb);}}') },
  };
};

// (string s) -> string[]   (line-based; sorted, space-joined)
T.STR_ARRSTR = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, digits):', '        # Write your code here', '        pass'),
      harness: ln('import sys', "_l=sys.stdin.read().split('\\n')", '_T=int(_l[0]);_o=[]', 'for _i in range(_T):', '    _s=_l[1+_i] if 1+_i<len(_l) else ""', "    _o.append(' '.join(sorted(Solution()." + fn + '(_s))))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {string} digits', ' * @return {string[]}', ' */', 'var ' + fn + ' = function(digits) {', '    // Write your code here', '};'),
      harness: ln("const _l=require('fs').readFileSync(0,'utf8').split('\\n');const _T=+_l[0];const _o=[];", "for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\\r$/,'');_o.push(" + fn + "(_s).slice().sort().join(' '));}", "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<string> ' + fn + '(string digits) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";vector<string> r=Solution().' + fn + '(s);sort(r.begin(),r.end());string o;for(size_t k=0;k<r.size();k++){if(k)o+=" ";o+=r[k];}cout<<o<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public List<String> ' + fn + '(String digits) {', '        // Write your code here', '        return new ArrayList<>();', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";List<String> r=new Solution().' + fn + '(s);Collections.sort(r);sb.append(String.join(" ",r)).append("\\n");}System.out.print(sb);}}') },
  };
};

// (string s) -> List<List<String>>   (line-based; canonical, sort-within=false)
T.STR_LISTSTR = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, s):', '        # Write your code here', '        pass'),
      harness: ln('import sys', _CANON_PY, "_l=sys.stdin.read().split('\\n')", '_T=int(_l[0]);_o=[]', 'for _i in range(_T):', '    _s=_l[1+_i] if 1+_i<len(_l) else ""', '    _o.append(_canonS(Solution().' + fn + '(_s), False))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {string} s', ' * @return {string[][]}', ' */', 'var ' + fn + ' = function(s) {', '    // Write your code here', '};'),
      harness: ln(_CANON_JS, "const _l=require('fs').readFileSync(0,'utf8').split('\\n');const _T=+_l[0];const _o=[];", "for(let _i=0;_i<_T;_i++){const _s=(_l[1+_i]||'').replace(/\\r$/,'');_o.push(_canonS(" + fn + '(_s),false));}', "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<vector<string>> ' + fn + '(string s) {', '        // Write your code here', '    }', '};'),
      harness: ln(_CANON_CPP, 'int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<_canonS(Solution().' + fn + '(s),false)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public List<List<String>> ' + fn + '(String s) {', '        // Write your code here', '        return new ArrayList<>();', '    }', '}'),
      harness: ln('public class Main {', _CANON_JAVA, '  public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";sb.append(canonS(new Solution().' + fn + '(s),false)).append("\\n");}System.out.print(sb);}', '}') },
  };
};

// (string[] strs) -> List<List<String>>   (whitespace; canonical, sort-within=true)
T.ARRSTR_LISTSTR = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, strs):', '        # Write your code here', '        pass'),
      harness: ln('import sys', _CANON_PY, '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _c=int(_d[_p]);_p+=1', '    _w=_d[_p:_p+_c];_p+=_c', '    _o.append(_canonS(Solution().' + fn + '(_w), True))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {string[]} strs', ' * @return {string[][]}', ' */', 'var ' + fn + ' = function(strs) {', '    // Write your code here', '};'),
      harness: ln(_CANON_JS, "const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", 'for(let _i=0;_i<_T;_i++){const _c=+_d[_p++];const _w=_d.slice(_p,_p+_c);_p+=_c;_o.push(_canonS(' + fn + '(_w),true));}', "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    vector<vector<string>> ' + fn + '(vector<string>& strs) {', '        // Write your code here', '    }', '};'),
      harness: ln(_CANON_CPP, 'int main(){int T;cin>>T;while(T--){int c;cin>>c;vector<string> w(c);for(int i=0;i<c;i++)cin>>w[i];cout<<_canonS(Solution().' + fn + '(w),true)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public List<List<String>> ' + fn + '(String[] strs) {', '        // Write your code here', '        return new ArrayList<>();', '    }', '}'),
      harness: ln('public class Main {', _CANON_JAVA, '  public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int c=sc.nextInt();String[] w=new String[c];for(int i=0;i<c;i++)w[i]=sc.next();sb.append(canonS(new Solution().' + fn + '(w),true)).append("\\n");}System.out.print(sb);}', '}') },
  };
};

// (char[][] grid) -> int   (whitespace: R, C, then R row-strings of length C)
T.CHARGRID_INT = function (fn) {
  return {
    python: { stub: ln('class Solution:', '    def ' + fn + '(self, grid):', '        # Write your code here', '        pass'),
      harness: ln('import sys', 'sys.setrecursionlimit(100000)', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _R=int(_d[_p]);_p+=1', '    _C=int(_d[_p]);_p+=1', '    _g=[]', '    for _r in range(_R):', '        _g.append(list(_d[_p]));_p+=1', '    _o.append(str(Solution().' + fn + '(_g)))', "print('\\n'.join(_o))") },
    javascript: { stub: ln('/**', ' * @param {character[][]} grid', ' * @return {number}', ' */', 'var ' + fn + ' = function(grid) {', '    // Write your code here', '};'),
      harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _R=+_d[_p++];const _C=+_d[_p++];const _g=[];for(let _r=0;_r<_R;_r++){_g.push(_d[_p++].split(''));}_o.push(String(" + fn + '(_g)));}', "console.log(_o.join('\\n'));") },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Solution {', 'public:', '    int ' + fn + '(vector<vector<char>>& grid) {', '        // Write your code here', '    }', '};'),
      harness: ln('int main(){int T;cin>>T;while(T--){int R,C;cin>>R>>C;vector<vector<char>> g(R);for(int i=0;i<R;i++){string s;cin>>s;g[i]=vector<char>(s.begin(),s.end());}cout<<Solution().' + fn + '(g)<<"\\n";}}') },
    java: { stub: ln('import java.util.*;', '', 'class Solution {', '    public int ' + fn + '(char[][] grid) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int R=sc.nextInt();int C=sc.nextInt();char[][] g=new char[R][];for(int i=0;i<R;i++)g[i]=sc.next().toCharArray();sb.append(new Solution().' + fn + '(g)).append("\\n");}System.out.print(sb);}}') },
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

// ----- shared TreeNode stubs + builders/serializers for extra tree types -----
var _TN_PY = ln('class TreeNode:', '    def __init__(self, val=0, left=None, right=None):', '        self.val = val', '        self.left = left', '        self.right = right', '');
var _TN_CPP = ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'struct TreeNode {', '    int val; TreeNode *left, *right;', '    TreeNode(int v): val(v), left(nullptr), right(nullptr) {}', '};', '');
var _TN_JAVA = ln('import java.util.*;', '', 'class TreeNode {', '    int val; TreeNode left, right;', '    TreeNode(int v) { val = v; }', '}', '');
var _TN_JS = ln('/** Tree node shape: { val, left, right } */', '');
var _BTF_PY = ln('from collections import deque', 'def _bt(line):', '    t=line.split()', '    if not t or t[0]=="null": return None', '    root=TreeNode(int(t[0])); q=deque([root]); i=1', '    while q and i<len(t):', '        n=q.popleft()', '        if i<len(t) and t[i]!="null":', '            n.left=TreeNode(int(t[i])); q.append(n.left)', '        i+=1', '        if i<len(t) and t[i]!="null":', '            n.right=TreeNode(int(t[i])); q.append(n.right)', '        i+=1', '    return root', 'def _st(root):', '    out=[]; q=deque([root])', '    while q:', '        n=q.popleft()', '        if n is None: out.append("null"); continue', '        out.append(str(n.val)); q.append(n.left); q.append(n.right)', '    while out and out[-1]=="null": out.pop()', "    return ' '.join(out)");
var _BTF_JS = ln('function _bt(line){var t=line.split(/\\s+/).filter(function(x){return x.length;});if(!t.length||t[0]==="null")return null;var root={val:+t[0],left:null,right:null};var q=[root],i=1;while(q.length&&i<t.length){var n=q.shift();if(i<t.length&&t[i]!=="null"){n.left={val:+t[i],left:null,right:null};q.push(n.left);}i++;if(i<t.length&&t[i]!=="null"){n.right={val:+t[i],left:null,right:null};q.push(n.right);}i++;}return root;}', 'function _st(root){var out=[],q=[root];while(q.length){var n=q.shift();if(n===null){out.push("null");continue;}out.push(String(n.val));q.push(n.left);q.push(n.right);}while(out.length&&out[out.length-1]==="null")out.pop();return out.join(" ");}');
var _BTF_CPP = ln('TreeNode* _bt(string line){istringstream is(line);vector<string> t;string x;while(is>>x)t.push_back(x);if(t.empty()||t[0]=="null")return nullptr;TreeNode* root=new TreeNode(stoi(t[0]));queue<TreeNode*> q;q.push(root);size_t i=1;while(!q.empty()&&i<t.size()){TreeNode* n=q.front();q.pop();if(i<t.size()&&t[i]!="null"){n->left=new TreeNode(stoi(t[i]));q.push(n->left);}i++;if(i<t.size()&&t[i]!="null"){n->right=new TreeNode(stoi(t[i]));q.push(n->right);}i++;}return root;}', 'string _st(TreeNode* root){vector<string> out;queue<TreeNode*> q;q.push(root);while(!q.empty()){TreeNode* n=q.front();q.pop();if(!n){out.push_back("null");continue;}out.push_back(to_string(n->val));q.push(n->left);q.push(n->right);}while(!out.empty()&&out.back()=="null")out.pop_back();string s;for(size_t i=0;i<out.size();i++){if(i)s+=" ";s+=out[i];}return s;}');
var _BTF_JAVA = ln('  static TreeNode bt(String line){if(line==null)return null;String[] t=line.trim().split("\\\\s+");if(t.length==0||t[0].isEmpty()||t[0].equals("null"))return null;TreeNode root=new TreeNode(Integer.parseInt(t[0]));Queue<TreeNode> q=new LinkedList<>();q.add(root);int i=1;while(!q.isEmpty()&&i<t.length){TreeNode n=q.poll();if(i<t.length&&!t[i].equals("null")){n.left=new TreeNode(Integer.parseInt(t[i]));q.add(n.left);}i++;if(i<t.length&&!t[i].equals("null")){n.right=new TreeNode(Integer.parseInt(t[i]));q.add(n.right);}i++;}return root;}', '  static String st(TreeNode root){List<String> out=new ArrayList<>();Queue<TreeNode> q=new LinkedList<>();q.add(root);while(!q.isEmpty()){TreeNode n=q.poll();if(n==null){out.add("null");continue;}out.add(String.valueOf(n.val));q.add(n.left);q.add(n.right);}while(!out.isEmpty()&&out.get(out.size()-1).equals("null"))out.remove(out.size()-1);return String.join(" ",out);}');

// (TreeNode p, TreeNode q) -> boolean   (line-based: T then 2 lines per case)
T.TREE_TREE_BOOL = function (fn) {
  return {
    python: { stub: ln(_TN_PY + 'class Solution:', '    def ' + fn + '(self, p, q):', '        # Write your code here', '        pass'),
      harness: ln('import sys', _BTF_PY, '_L=sys.stdin.read().split("\\n"); _T=int(_L[0]); _o=[]', 'for _i in range(_T):', '    _a=_bt(_L[1+2*_i] if 1+2*_i<len(_L) else "")', '    _b=_bt(_L[2+2*_i] if 2+2*_i<len(_L) else "")', "    _o.append('true' if Solution()." + fn + "(_a,_b) else 'false')", 'print("\\n".join(_o))') },
    javascript: { stub: ln(_TN_JS + '/**', ' * @param {TreeNode} p', ' * @param {TreeNode} q', ' * @return {boolean}', ' */', 'var ' + fn + ' = function(p, q) {', '    // Write your code here', '};'),
      harness: ln(_BTF_JS, 'const _L=require("fs").readFileSync(0,"utf8").split("\\n"); const _T=+_L[0]; const _o=[];', 'for(let _i=0;_i<_T;_i++){const _a=_bt((_L[1+2*_i]||"").replace(/\\r$/,""));const _b=_bt((_L[2+2*_i]||"").replace(/\\r$/,""));_o.push(' + fn + "(_a,_b)?'true':'false');}", 'console.log(_o.join("\\n"));') },
    cpp: { stub: ln(_TN_CPP + 'class Solution {', 'public:', '    bool ' + fn + '(TreeNode* p, TreeNode* q) {', '        // Write your code here', '    }', '};'),
      harness: ln(_BTF_CPP, 'int main(){string line;getline(cin,line);int T=stoi(line);for(int c=0;c<T;c++){string l1,l2;if(!getline(cin,l1))l1="";if(!getline(cin,l2))l2="";cout<<(Solution().' + fn + '(_bt(l1),_bt(l2))?"true":"false")<<"\\n";}}') },
    java: { stub: ln(_TN_JAVA + 'class Solution {', '    public boolean ' + fn + '(TreeNode p, TreeNode q) {', '        // Write your code here', '        return false;', '    }', '}'),
      harness: ln('public class Main {', _BTF_JAVA, '  public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int c=0;c<T;c++){String l1=sc.hasNextLine()?sc.nextLine():"";String l2=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().' + fn + '(bt(l1),bt(l2))?"true":"false").append("\\n");}System.out.print(sb);}', '}') },
  };
};

// (TreeNode root) -> TreeNode   (line-based: T then T lines; output level-order)
T.TREE_TREE_OUT = function (fn) {
  return {
    python: { stub: ln(_TN_PY + 'class Solution:', '    def ' + fn + '(self, root):', '        # Write your code here', '        pass'),
      harness: ln('import sys', _BTF_PY, '_L=sys.stdin.read().split("\\n"); _T=int(_L[0]); _o=[]', 'for _i in range(_T):', '    _r=Solution().' + fn + '(_bt(_L[1+_i] if 1+_i<len(_L) else ""))', '    _o.append(_st(_r))', 'print("\\n".join(_o))') },
    javascript: { stub: ln(_TN_JS + '/**', ' * @param {TreeNode} root', ' * @return {TreeNode}', ' */', 'var ' + fn + ' = function(root) {', '    // Write your code here', '};'),
      harness: ln(_BTF_JS, 'const _L=require("fs").readFileSync(0,"utf8").split("\\n"); const _T=+_L[0]; const _o=[];', 'for(let _i=0;_i<_T;_i++){const _r=' + fn + '(_bt((_L[1+_i]||"").replace(/\\r$/,"")));_o.push(_st(_r));}', 'console.log(_o.join("\\n"));') },
    cpp: { stub: ln(_TN_CPP + 'class Solution {', 'public:', '    TreeNode* ' + fn + '(TreeNode* root) {', '        // Write your code here', '    }', '};'),
      harness: ln(_BTF_CPP, 'int main(){string line;getline(cin,line);int T=stoi(line);for(int c=0;c<T;c++){string l;if(!getline(cin,l))l="";cout<<_st(Solution().' + fn + '(_bt(l)))<<"\\n";}}') },
    java: { stub: ln(_TN_JAVA + 'class Solution {', '    public TreeNode ' + fn + '(TreeNode root) {', '        // Write your code here', '        return root;', '    }', '}'),
      harness: ln('public class Main {', _BTF_JAVA, '  public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int c=0;c<T;c++){String l=sc.hasNextLine()?sc.nextLine():"";sb.append(st(new Solution().' + fn + '(bt(l)))).append("\\n");}System.out.print(sb);}', '}') },
  };
};

// (TreeNode root) -> List<List<Integer>>   (output levels joined by | )
T.TREE_LEVELS = function (fn) {
  return {
    python: { stub: ln(_TN_PY + 'class Solution:', '    def ' + fn + '(self, root):', '        # Write your code here', '        pass'),
      harness: ln('import sys', _BTF_PY, '_L=sys.stdin.read().split("\\n"); _T=int(_L[0]); _o=[]', 'for _i in range(_T):', '    _r=Solution().' + fn + '(_bt(_L[1+_i] if 1+_i<len(_L) else ""))', "    _o.append('|'.join(' '.join(str(x) for x in lvl) for lvl in _r))", 'print("\\n".join(_o))') },
    javascript: { stub: ln(_TN_JS + '/**', ' * @param {TreeNode} root', ' * @return {number[][]}', ' */', 'var ' + fn + ' = function(root) {', '    // Write your code here', '};'),
      harness: ln(_BTF_JS, 'const _L=require("fs").readFileSync(0,"utf8").split("\\n"); const _T=+_L[0]; const _o=[];', 'for(let _i=0;_i<_T;_i++){const _r=' + fn + '(_bt((_L[1+_i]||"").replace(/\\r$/,"")));_o.push(_r.map(function(lvl){return lvl.join(" ");}).join("|"));}', 'console.log(_o.join("\\n"));') },
    cpp: { stub: ln(_TN_CPP + 'class Solution {', 'public:', '    vector<vector<int>> ' + fn + '(TreeNode* root) {', '        // Write your code here', '    }', '};'),
      harness: ln(_BTF_CPP, 'int main(){string line;getline(cin,line);int T=stoi(line);for(int c=0;c<T;c++){string l;if(!getline(cin,l))l="";auto r=Solution().' + fn + '(_bt(l));string s;for(size_t i=0;i<r.size();i++){if(i)s+="|";for(size_t j=0;j<r[i].size();j++){if(j)s+=" ";s+=to_string(r[i][j]);}}cout<<s<<"\\n";}}') },
    java: { stub: ln(_TN_JAVA + 'class Solution {', '    public List<List<Integer>> ' + fn + '(TreeNode root) {', '        // Write your code here', '        return new ArrayList<>();', '    }', '}'),
      harness: ln('public class Main {', _BTF_JAVA, '  public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int c=0;c<T;c++){String l=sc.hasNextLine()?sc.nextLine():"";List<List<Integer>> r=new Solution().' + fn + '(bt(l));StringBuilder s=new StringBuilder();for(int i=0;i<r.size();i++){if(i>0)s.append("|");for(int j=0;j<r.get(i).size();j++){if(j>0)s.append(" ");s.append(r.get(i).get(j));}}sb.append(s).append("\\n");}System.out.print(sb);}', '}') },
  };
};

// (TreeNode root, int k) -> int   (line-based: T then 2 lines per case: tree, k)
T.TREE_INT_INT = function (fn) {
  return {
    python: { stub: ln(_TN_PY + 'class Solution:', '    def ' + fn + '(self, root, k):', '        # Write your code here', '        pass'),
      harness: ln('import sys', _BTF_PY, '_L=sys.stdin.read().split("\\n"); _T=int(_L[0]); _o=[]', 'for _i in range(_T):', '    _r=_bt(_L[1+2*_i] if 1+2*_i<len(_L) else "")', '    _k=int(_L[2+2*_i]) if 2+2*_i<len(_L) else 0', '    _o.append(str(Solution().' + fn + '(_r,_k)))', 'print("\\n".join(_o))') },
    javascript: { stub: ln(_TN_JS + '/**', ' * @param {TreeNode} root', ' * @param {number} k', ' * @return {number}', ' */', 'var ' + fn + ' = function(root, k) {', '    // Write your code here', '};'),
      harness: ln(_BTF_JS, 'const _L=require("fs").readFileSync(0,"utf8").split("\\n"); const _T=+_L[0]; const _o=[];', 'for(let _i=0;_i<_T;_i++){const _r=_bt((_L[1+2*_i]||"").replace(/\\r$/,""));const _k=+((_L[2+2*_i]||"0").trim());_o.push(String(' + fn + '(_r,_k)));}', 'console.log(_o.join("\\n"));') },
    cpp: { stub: ln(_TN_CPP + 'class Solution {', 'public:', '    int ' + fn + '(TreeNode* root, int k) {', '        // Write your code here', '    }', '};'),
      harness: ln(_BTF_CPP, 'int main(){string line;getline(cin,line);int T=stoi(line);for(int c=0;c<T;c++){string l,ks;if(!getline(cin,l))l="";if(!getline(cin,ks))ks="0";cout<<Solution().' + fn + '(_bt(l),stoi(ks))<<"\\n";}}') },
    java: { stub: ln(_TN_JAVA + 'class Solution {', '    public int ' + fn + '(TreeNode root, int k) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main {', _BTF_JAVA, '  public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int c=0;c<T;c++){String l=sc.hasNextLine()?sc.nextLine():"";int k=Integer.parseInt(sc.hasNextLine()?sc.nextLine().trim():"0");sb.append(new Solution().' + fn + '(bt(l),k)).append("\\n");}System.out.print(sb);}', '}') },
  };
};

// (TreeNode root, int p, int q) -> int   (line-based: T then 2 lines: tree, "p q")
T.TREE_INT_INT_INT = function (fn) {
  return {
    python: { stub: ln(_TN_PY + 'class Solution:', '    def ' + fn + '(self, root, p, q):', '        # Write your code here', '        pass'),
      harness: ln('import sys', _BTF_PY, '_L=sys.stdin.read().split("\\n"); _T=int(_L[0]); _o=[]', 'for _i in range(_T):', '    _r=_bt(_L[1+2*_i] if 1+2*_i<len(_L) else "")', '    _pq=(_L[2+2*_i] if 2+2*_i<len(_L) else "0 0").split()', '    _o.append(str(Solution().' + fn + '(_r,int(_pq[0]),int(_pq[1]))))', 'print("\\n".join(_o))') },
    javascript: { stub: ln(_TN_JS + '/**', ' * @param {TreeNode} root', ' * @param {number} p', ' * @param {number} q', ' * @return {number}', ' */', 'var ' + fn + ' = function(root, p, q) {', '    // Write your code here', '};'),
      harness: ln(_BTF_JS, 'const _L=require("fs").readFileSync(0,"utf8").split("\\n"); const _T=+_L[0]; const _o=[];', 'for(let _i=0;_i<_T;_i++){const _r=_bt((_L[1+2*_i]||"").replace(/\\r$/,""));const _pq=(_L[2+2*_i]||"0 0").trim().split(/\\s+/).map(Number);_o.push(String(' + fn + '(_r,_pq[0],_pq[1])));}', 'console.log(_o.join("\\n"));') },
    cpp: { stub: ln(_TN_CPP + 'class Solution {', 'public:', '    int ' + fn + '(TreeNode* root, int p, int q) {', '        // Write your code here', '    }', '};'),
      harness: ln(_BTF_CPP, 'int main(){string line;getline(cin,line);int T=stoi(line);for(int c=0;c<T;c++){string l,pq;if(!getline(cin,l))l="";if(!getline(cin,pq))pq="0 0";istringstream is(pq);int p,q;is>>p>>q;cout<<Solution().' + fn + '(_bt(l),p,q)<<"\\n";}}') },
    java: { stub: ln(_TN_JAVA + 'class Solution {', '    public int ' + fn + '(TreeNode root, int p, int q) {', '        // Write your code here', '        return 0;', '    }', '}'),
      harness: ln('public class Main {', _BTF_JAVA, '  public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int c=0;c<T;c++){String l=sc.hasNextLine()?sc.nextLine():"";String pq=sc.hasNextLine()?sc.nextLine().trim():"0 0";String[] pp=pq.split("\\\\s+");sb.append(new Solution().' + fn + '(bt(l),Integer.parseInt(pp[0]),Integer.parseInt(pp[1]))).append("\\n");}System.out.print(sb);}', '}') },
  };
};

module.exports = { T, randInt, randArr, arrStr, ln };
