// Known-correct solutions for Batch E problems.
const SOL = {
  'daily-temperatures': {
    python: '        res=[0]*len(nums)\n        st=[]\n        for i,t in enumerate(nums):\n            while st and nums[st[-1]]<t:\n                j=st.pop(); res[j]=i-j\n            st.append(i)\n        return res',
    javascript: '    const res=new Array(nums.length).fill(0),st=[]; for(let i=0;i<nums.length;i++){while(st.length&&nums[st[st.length-1]]<nums[i]){const j=st.pop();res[j]=i-j;}st.push(i);} return res;',
    cpp: '        vector<int> res(nums.size(),0); vector<int> st; for(int i=0;i<(int)nums.size();i++){while(!st.empty()&&nums[st.back()]<nums[i]){int j=st.back();st.pop_back();res[j]=i-j;}st.push_back(i);} return res;',
    java: '        int[] res=new int[nums.length]; Deque<Integer> st=new ArrayDeque<>(); for(int i=0;i<nums.length;i++){while(!st.isEmpty()&&nums[st.peek()]<nums[i]){int j=st.pop();res[j]=i-j;}st.push(i);} return res;',
  },
  'evaluate-reverse-polish-notation': {
    python: "        st=[]\n        for tok in words:\n            if tok in ('+','-','*','/'):\n                b=st.pop(); a=st.pop()\n                if tok=='+': st.append(a+b)\n                elif tok=='-': st.append(a-b)\n                elif tok=='*': st.append(a*b)\n                else: st.append(int(a/b))\n            else: st.append(int(tok))\n        return st[0]",
    javascript: "    const st=[]; for(const tok of words){if(tok==='+'||tok==='-'||tok==='*'||tok==='/'){const b=st.pop(),a=st.pop();if(tok==='+')st.push(a+b);else if(tok==='-')st.push(a-b);else if(tok==='*')st.push(a*b);else st.push(Math.trunc(a/b));}else st.push(parseInt(tok,10));} return st[0];",
    cpp: '        vector<long long> st; for(auto& tok:words){if(tok=="+"||tok=="-"||tok=="*"||tok=="/"){long long b=st.back();st.pop_back();long long a=st.back();st.pop_back();if(tok=="+")st.push_back(a+b);else if(tok=="-")st.push_back(a-b);else if(tok=="*")st.push_back(a*b);else st.push_back(a/b);}else st.push_back(stoll(tok));} return (int)st[0];',
    java: '        Deque<Integer> st=new ArrayDeque<>(); for(String tok:words){if(tok.equals("+")||tok.equals("-")||tok.equals("*")||tok.equals("/")){int b=st.pop(),a=st.pop();if(tok.equals("+"))st.push(a+b);else if(tok.equals("-"))st.push(a-b);else if(tok.equals("*"))st.push(a*b);else st.push(a/b);}else st.push(Integer.parseInt(tok));} return st.pop();',
  },
  'largest-rectangle-in-histogram': {
    python: '        h=nums+[0]; st=[]; best=0\n        for i in range(len(h)):\n            while st and h[st[-1]]>h[i]:\n                height=h[st.pop()]; width=i if not st else i-st[-1]-1\n                best=max(best,height*width)\n            st.append(i)\n        return best',
    javascript: '    const h=nums.concat([0]),st=[]; let best=0; for(let i=0;i<h.length;i++){while(st.length&&h[st[st.length-1]]>h[i]){const height=h[st.pop()];const width=st.length?i-st[st.length-1]-1:i;best=Math.max(best,height*width);}st.push(i);} return best;',
    cpp: '        vector<int> h=nums; h.push_back(0); vector<int> st; int best=0; for(int i=0;i<(int)h.size();i++){while(!st.empty()&&h[st.back()]>h[i]){int height=h[st.back()];st.pop_back();int width=st.empty()?i:i-st.back()-1;best=max(best,height*width);}st.push_back(i);} return best;',
    java: '        int n=nums.length; int[] h=new int[n+1]; for(int i=0;i<n;i++)h[i]=nums[i]; Deque<Integer> st=new ArrayDeque<>(); int best=0; for(int i=0;i<=n;i++){while(!st.isEmpty()&&h[st.peek()]>h[i]){int height=h[st.pop()];int width=st.isEmpty()?i:i-st.peek()-1;best=Math.max(best,height*width);}st.push(i);} return best;',
  },
  'find-minimum-in-rotated-sorted-array': {
    python: '        lo,hi=0,len(nums)-1\n        while lo<hi:\n            mid=(lo+hi)//2\n            if nums[mid]>nums[hi]: lo=mid+1\n            else: hi=mid\n        return nums[lo]',
    javascript: '    let lo=0,hi=nums.length-1; while(lo<hi){const mid=(lo+hi)>>1; if(nums[mid]>nums[hi])lo=mid+1; else hi=mid;} return nums[lo];',
    cpp: '        int lo=0,hi=nums.size()-1; while(lo<hi){int mid=(lo+hi)/2; if(nums[mid]>nums[hi])lo=mid+1; else hi=mid;} return nums[lo];',
    java: '        int lo=0,hi=nums.length-1; while(lo<hi){int mid=(lo+hi)/2; if(nums[mid]>nums[hi])lo=mid+1; else hi=mid;} return nums[lo];',
  },
  'search-in-rotated-sorted-array': {
    python: '        lo,hi=0,len(nums)-1\n        while lo<=hi:\n            mid=(lo+hi)//2\n            if nums[mid]==target: return mid\n            if nums[lo]<=nums[mid]:\n                if nums[lo]<=target<nums[mid]: hi=mid-1\n                else: lo=mid+1\n            else:\n                if nums[mid]<target<=nums[hi]: lo=mid+1\n                else: hi=mid-1\n        return -1',
    javascript: '    let lo=0,hi=nums.length-1; while(lo<=hi){const mid=(lo+hi)>>1; if(nums[mid]===target)return mid; if(nums[lo]<=nums[mid]){if(nums[lo]<=target&&target<nums[mid])hi=mid-1;else lo=mid+1;}else{if(nums[mid]<target&&target<=nums[hi])lo=mid+1;else hi=mid-1;}} return -1;',
    cpp: '        int lo=0,hi=nums.size()-1; while(lo<=hi){int mid=(lo+hi)/2; if(nums[mid]==target)return mid; if(nums[lo]<=nums[mid]){if(nums[lo]<=target&&target<nums[mid])hi=mid-1;else lo=mid+1;}else{if(nums[mid]<target&&target<=nums[hi])lo=mid+1;else hi=mid-1;}} return -1;',
    java: '        int lo=0,hi=nums.length-1; while(lo<=hi){int mid=(lo+hi)/2; if(nums[mid]==target)return mid; if(nums[lo]<=nums[mid]){if(nums[lo]<=target&&target<nums[mid])hi=mid-1;else lo=mid+1;}else{if(nums[mid]<target&&target<=nums[hi])lo=mid+1;else hi=mid-1;}} return -1;',
  },
  'permutation-in-string': {
    python: '        if len(s)>len(t): return False\n        need=[0]*26; win=[0]*26\n        for c in s: need[ord(c)-97]+=1\n        for i,c in enumerate(t):\n            win[ord(c)-97]+=1\n            if i>=len(s): win[ord(t[i-len(s)])-97]-=1\n            if win==need: return True\n        return False',
    javascript: '    if(s.length>t.length)return false; const need=new Array(26).fill(0),win=new Array(26).fill(0); for(const c of s)need[c.charCodeAt(0)-97]++; for(let i=0;i<t.length;i++){win[t.charCodeAt(i)-97]++;if(i>=s.length)win[t.charCodeAt(i-s.length)-97]--;if(i>=s.length-1){let ok=true;for(let j=0;j<26;j++)if(win[j]!==need[j]){ok=false;break;}if(ok)return true;}} return false;',
    cpp: '        if(s.size()>t.size())return false; vector<int> need(26,0),win(26,0); for(char c:s)need[c-\'a\']++; for(int i=0;i<(int)t.size();i++){win[t[i]-\'a\']++;if(i>=(int)s.size())win[t[i-s.size()]-\'a\']--;if(i>=(int)s.size()-1&&win==need)return true;} return false;',
    java: '        if(s.length()>t.length())return false; int[] need=new int[26],win=new int[26]; for(char c:s.toCharArray())need[c-\'a\']++; for(int i=0;i<t.length();i++){win[t.charAt(i)-\'a\']++;if(i>=s.length())win[t.charAt(i-s.length())-\'a\']--;if(i>=s.length()-1&&Arrays.equals(win,need))return true;} return false;',
  },
  'best-time-to-buy-and-sell-stock-with-cooldown': {
    python: "        hold=float('-inf'); sold=0; rest=0\n        for p in nums:\n            prev=sold; sold=hold+p; hold=max(hold,rest-p); rest=max(rest,prev)\n        return max(sold,rest)",
    javascript: '    let hold=-Infinity,sold=0,rest=0; for(const p of nums){const prev=sold;sold=hold+p;hold=Math.max(hold,rest-p);rest=Math.max(rest,prev);} return Math.max(sold,rest);',
    cpp: '        long long hold=-1000000000LL,sold=0,rest=0; for(int p:nums){long long prev=sold;sold=hold+p;hold=max(hold,rest-(long long)p);rest=max(rest,prev);} return (int)max(sold,rest);',
    java: '        long hold=-1000000000L,sold=0,rest=0; for(int p:nums){long prev=sold;sold=hold+p;hold=Math.max(hold,rest-p);rest=Math.max(rest,prev);} return (int)Math.max(sold,rest);',
  },
  'burst-balloons': {
    python: '        a=[1]+nums+[1]; n=len(a)\n        dp=[[0]*n for _ in range(n)]\n        for length in range(2,n):\n            for i in range(n-length):\n                j=i+length\n                for k in range(i+1,j):\n                    dp[i][j]=max(dp[i][j],dp[i][k]+a[i]*a[k]*a[j]+dp[k][j])\n        return dp[0][n-1]',
    javascript: '    const a=[1].concat(nums,[1]),n=a.length,dp=[]; for(let i=0;i<n;i++)dp.push(new Array(n).fill(0)); for(let len=2;len<n;len++)for(let i=0;i<n-len;i++){const j=i+len;for(let k=i+1;k<j;k++)dp[i][j]=Math.max(dp[i][j],dp[i][k]+a[i]*a[k]*a[j]+dp[k][j]);} return dp[0][n-1];',
    cpp: '        vector<int> a; a.push_back(1); for(int x:nums)a.push_back(x); a.push_back(1); int n=a.size(); vector<vector<int>> dp(n,vector<int>(n,0)); for(int len=2;len<n;len++)for(int i=0;i<n-len;i++){int j=i+len;for(int k=i+1;k<j;k++)dp[i][j]=max(dp[i][j],dp[i][k]+a[i]*a[k]*a[j]+dp[k][j]);} return dp[0][n-1];',
    java: '        int m=nums.length; int[] a=new int[m+2]; a[0]=1;a[m+1]=1; for(int i=0;i<m;i++)a[i+1]=nums[i]; int n=m+2; int[][] dp=new int[n][n]; for(int len=2;len<n;len++)for(int i=0;i<n-len;i++){int j=i+len;for(int k=i+1;k<j;k++)dp[i][j]=Math.max(dp[i][j],dp[i][k]+a[i]*a[k]*a[j]+dp[k][j]);} return dp[0][n-1];',
  },
  'regular-expression-matching': {
    python: "        p=t; m,n=len(s),len(p)\n        dp=[[False]*(n+1) for _ in range(m+1)]\n        dp[0][0]=True\n        for j in range(1,n+1):\n            if p[j-1]=='*': dp[0][j]=dp[0][j-2]\n        for i in range(1,m+1):\n            for j in range(1,n+1):\n                if p[j-1]=='*':\n                    dp[i][j]=dp[i][j-2] or ((p[j-2]==s[i-1] or p[j-2]=='.') and dp[i-1][j])\n                elif p[j-1]==s[i-1] or p[j-1]=='.':\n                    dp[i][j]=dp[i-1][j-1]\n        return dp[m][n]",
    javascript: "    const p=t,m=s.length,n=p.length,dp=[]; for(let i=0;i<=m;i++)dp.push(new Array(n+1).fill(false)); dp[0][0]=true; for(let j=1;j<=n;j++)if(p[j-1]==='*')dp[0][j]=dp[0][j-2]; for(let i=1;i<=m;i++)for(let j=1;j<=n;j++){if(p[j-1]==='*')dp[i][j]=dp[i][j-2]||((p[j-2]===s[i-1]||p[j-2]==='.')&&dp[i-1][j]);else if(p[j-1]===s[i-1]||p[j-1]==='.')dp[i][j]=dp[i-1][j-1];} return dp[m][n];",
    cpp: "        string p=t; int m=s.size(),n=p.size(); vector<vector<char>> dp(m+1,vector<char>(n+1,0)); dp[0][0]=1; for(int j=1;j<=n;j++)if(p[j-1]=='*')dp[0][j]=dp[0][j-2]; for(int i=1;i<=m;i++)for(int j=1;j<=n;j++){if(p[j-1]=='*')dp[i][j]=dp[i][j-2]||((p[j-2]==s[i-1]||p[j-2]=='.')&&dp[i-1][j]);else if(p[j-1]==s[i-1]||p[j-1]=='.')dp[i][j]=dp[i-1][j-1];} return dp[m][n];",
    java: "        String p=t; int m=s.length(),n=p.length(); boolean[][] dp=new boolean[m+1][n+1]; dp[0][0]=true; for(int j=1;j<=n;j++)if(p.charAt(j-1)=='*')dp[0][j]=dp[0][j-2]; for(int i=1;i<=m;i++)for(int j=1;j<=n;j++){if(p.charAt(j-1)=='*')dp[i][j]=dp[i][j-2]||((p.charAt(j-2)==s.charAt(i-1)||p.charAt(j-2)=='.')&&dp[i-1][j]);else if(p.charAt(j-1)==s.charAt(i-1)||p.charAt(j-1)=='.')dp[i][j]=dp[i-1][j-1];} return dp[m][n];",
  },
  'longest-common-subsequence': {
    python: '        m,n=len(s),len(t)\n        dp=[[0]*(n+1) for _ in range(m+1)]\n        for i in range(1,m+1):\n            for j in range(1,n+1):\n                dp[i][j]=dp[i-1][j-1]+1 if s[i-1]==t[j-1] else max(dp[i-1][j],dp[i][j-1])\n        return dp[m][n]',
    javascript: '    const m=s.length,n=t.length,dp=[]; for(let i=0;i<=m;i++)dp.push(new Array(n+1).fill(0)); for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)dp[i][j]=s[i-1]===t[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]); return dp[m][n];',
    cpp: '        int m=s.size(),n=t.size(); vector<vector<int>> dp(m+1,vector<int>(n+1,0)); for(int i=1;i<=m;i++)for(int j=1;j<=n;j++)dp[i][j]=s[i-1]==t[j-1]?dp[i-1][j-1]+1:max(dp[i-1][j],dp[i][j-1]); return dp[m][n];',
    java: '        int m=s.length(),n=t.length(); int[][] dp=new int[m+1][n+1]; for(int i=1;i<=m;i++)for(int j=1;j<=n;j++)dp[i][j]=s.charAt(i-1)==t.charAt(j-1)?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]); return dp[m][n];',
  },
  'edit-distance': {
    python: '        m,n=len(s),len(t)\n        dp=[[0]*(n+1) for _ in range(m+1)]\n        for i in range(m+1): dp[i][0]=i\n        for j in range(n+1): dp[0][j]=j\n        for i in range(1,m+1):\n            for j in range(1,n+1):\n                dp[i][j]=dp[i-1][j-1] if s[i-1]==t[j-1] else 1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])\n        return dp[m][n]',
    javascript: '    const m=s.length,n=t.length,dp=[]; for(let i=0;i<=m;i++){dp.push(new Array(n+1).fill(0));dp[i][0]=i;} for(let j=0;j<=n;j++)dp[0][j]=j; for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)dp[i][j]=s[i-1]===t[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]); return dp[m][n];',
    cpp: '        int m=s.size(),n=t.size(); vector<vector<int>> dp(m+1,vector<int>(n+1,0)); for(int i=0;i<=m;i++)dp[i][0]=i; for(int j=0;j<=n;j++)dp[0][j]=j; for(int i=1;i<=m;i++)for(int j=1;j<=n;j++)dp[i][j]=s[i-1]==t[j-1]?dp[i-1][j-1]:1+min({dp[i-1][j],dp[i][j-1],dp[i-1][j-1]}); return dp[m][n];',
    java: '        int m=s.length(),n=t.length(); int[][] dp=new int[m+1][n+1]; for(int i=0;i<=m;i++)dp[i][0]=i; for(int j=0;j<=n;j++)dp[0][j]=j; for(int i=1;i<=m;i++)for(int j=1;j<=n;j++)dp[i][j]=s.charAt(i-1)==t.charAt(j-1)?dp[i-1][j-1]:1+Math.min(dp[i-1][j],Math.min(dp[i][j-1],dp[i-1][j-1])); return dp[m][n];',
  },
  'distinct-subsequences': {
    python: '        m,n=len(s),len(t)\n        dp=[[0]*(n+1) for _ in range(m+1)]\n        for i in range(m+1): dp[i][0]=1\n        for i in range(1,m+1):\n            for j in range(1,n+1):\n                dp[i][j]=dp[i-1][j]+(dp[i-1][j-1] if s[i-1]==t[j-1] else 0)\n        return dp[m][n]',
    javascript: '    const m=s.length,n=t.length,dp=[]; for(let i=0;i<=m;i++){dp.push(new Array(n+1).fill(0));dp[i][0]=1;} for(let i=1;i<=m;i++)for(let j=1;j<=n;j++){dp[i][j]=dp[i-1][j];if(s[i-1]===t[j-1])dp[i][j]+=dp[i-1][j-1];} return dp[m][n];',
    cpp: '        int m=s.size(),n=t.size(); vector<vector<long long>> dp(m+1,vector<long long>(n+1,0)); for(int i=0;i<=m;i++)dp[i][0]=1; for(int i=1;i<=m;i++)for(int j=1;j<=n;j++){dp[i][j]=dp[i-1][j];if(s[i-1]==t[j-1])dp[i][j]+=dp[i-1][j-1];} return (int)dp[m][n];',
    java: '        int m=s.length(),n=t.length(); long[][] dp=new long[m+1][n+1]; for(int i=0;i<=m;i++)dp[i][0]=1; for(int i=1;i<=m;i++)for(int j=1;j<=n;j++){dp[i][j]=dp[i-1][j];if(s.charAt(i-1)==t.charAt(j-1))dp[i][j]+=dp[i-1][j-1];} return (int)dp[m][n];',
  },
  'coin-change-ii': {
    python: '        dp=[0]*(k+1); dp[0]=1\n        for coin in nums:\n            for a in range(coin,k+1):\n                dp[a]+=dp[a-coin]\n        return dp[k]',
    javascript: '    const dp=new Array(k+1).fill(0); dp[0]=1; for(const coin of nums)for(let a=coin;a<=k;a++)dp[a]+=dp[a-coin]; return dp[k];',
    cpp: '        vector<long long> dp(k+1,0); dp[0]=1; for(int coin:nums)for(int a=coin;a<=k;a++)dp[a]+=dp[a-coin]; return (int)dp[k];',
    java: '        long[] dp=new long[k+1]; dp[0]=1; for(int coin:nums)for(int a=coin;a<=k;a++)dp[a]+=dp[a-coin]; return (int)dp[k];',
  },
  'target-sum': {
    python: '        total=sum(nums)\n        if (total+k)%2 or abs(k)>total: return 0\n        target=(total+k)//2\n        dp=[0]*(target+1); dp[0]=1\n        for num in nums:\n            for s in range(target,num-1,-1):\n                dp[s]+=dp[s-num]\n        return dp[target]',
    javascript: '    const total=nums.reduce((x,y)=>x+y,0); if((total+k)%2!==0||Math.abs(k)>total)return 0; const target=(total+k)/2,dp=new Array(target+1).fill(0); dp[0]=1; for(const num of nums)for(let s=target;s>=num;s--)dp[s]+=dp[s-num]; return dp[target];',
    cpp: '        int total=0; for(int x:nums)total+=x; if((total+k)%2!=0||abs(k)>total)return 0; int target=(total+k)/2; vector<long long> dp(target+1,0); dp[0]=1; for(int num:nums)for(int s=target;s>=num;s--)dp[s]+=dp[s-num]; return (int)dp[target];',
    java: '        int total=0; for(int x:nums)total+=x; if((total+k)%2!=0||Math.abs(k)>total)return 0; int target=(total+k)/2; long[] dp=new long[target+1]; dp[0]=1; for(int num:nums)for(int s=target;s>=num;s--)dp[s]+=dp[s-num]; return (int)dp[target];',
  },
};
module.exports = { SOL };
