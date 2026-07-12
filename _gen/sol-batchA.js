// Known-correct solutions for Batch A problems (verification only).
const SOL = {
  'counting-bits': {
    python: '        ans=[0]*(n+1)\n        for i in range(1,n+1):\n            ans[i]=ans[i>>1]+(i&1)\n        return ans',
    javascript: '    const ans=[0]; for(let i=1;i<=n;i++) ans.push(ans[i>>1]+(i&1)); return ans;',
    cpp: '        vector<int> ans(n+1,0); for(int i=1;i<=n;i++) ans[i]=ans[i>>1]+(i&1); return ans;',
    java: '        int[] ans=new int[n+1]; for(int i=1;i<=n;i++) ans[i]=ans[i>>1]+(i&1); return ans;',
  },
  'sum-of-two-integers': {
    python: '        return a+b', javascript: '    return a+b;', cpp: '        return a+b;', java: '        return a+b;',
  },
  'unique-paths': {
    python: '        row=[1]*b\n        for _ in range(1,a):\n            for j in range(1,b):\n                row[j]+=row[j-1]\n        return row[-1]',
    javascript: '    const row=new Array(b).fill(1); for(let i=1;i<a;i++) for(let j=1;j<b;j++) row[j]+=row[j-1]; return row[b-1];',
    cpp: '        vector<int> row(b,1); for(int i=1;i<a;i++) for(int j=1;j<b;j++) row[j]+=row[j-1]; return row[b-1];',
    java: '        int[] row=new int[b]; Arrays.fill(row,1); for(int i=1;i<a;i++) for(int j=1;j<b;j++) row[j]+=row[j-1]; return row[b-1];',
  },
  'longest-repeating-character-replacement': {
    python: '        count={}\n        left=maxf=res=0\n        for right in range(len(s)):\n            count[s[right]]=count.get(s[right],0)+1\n            maxf=max(maxf,count[s[right]])\n            while (right-left+1)-maxf>k:\n                count[s[left]]-=1\n                left+=1\n            res=max(res,right-left+1)\n        return res',
    javascript: '    const count={}; let left=0,maxf=0,res=0; for(let right=0;right<s.length;right++){const c=s[right];count[c]=(count[c]||0)+1;maxf=Math.max(maxf,count[c]);while((right-left+1)-maxf>k){count[s[left]]--;left++;}res=Math.max(res,right-left+1);} return res;',
    cpp: "        int cnt[26]={0},left=0,maxf=0,res=0; for(int right=0;right<(int)s.size();right++){maxf=max(maxf,++cnt[s[right]-'A']);while((right-left+1)-maxf>k){cnt[s[left]-'A']--;left++;}res=max(res,right-left+1);} return res;",
    java: "        int[] cnt=new int[26]; int left=0,maxf=0,res=0; for(int right=0;right<s.length();right++){maxf=Math.max(maxf,++cnt[s.charAt(right)-'A']);while((right-left+1)-maxf>k){cnt[s.charAt(left)-'A']--;left++;}res=Math.max(res,right-left+1);} return res;",
  },
  'multiply-strings': {
    python: '        return str(int(s)*int(t))',
    javascript: '    return (BigInt(s)*BigInt(t)).toString();',
    cpp: "        if(s==\"0\"||t==\"0\")return \"0\"; vector<int> res(s.size()+t.size(),0); for(int i=s.size()-1;i>=0;i--)for(int j=t.size()-1;j>=0;j--){int mul=(s[i]-'0')*(t[j]-'0');int sum=mul+res[i+j+1];res[i+j+1]=sum%10;res[i+j]+=sum/10;} string out; for(int d:res){if(!(out.empty()&&d==0))out+=('0'+d);} return out.empty()?\"0\":out;",
    java: '        return new java.math.BigInteger(s).multiply(new java.math.BigInteger(t)).toString();',
  },
  'partition-labels': {
    python: '        last={c:i for i,c in enumerate(s)}\n        res=[]\n        start=end=0\n        for i,c in enumerate(s):\n            end=max(end,last[c])\n            if i==end:\n                res.append(i-start+1)\n                start=i+1\n        return res',
    javascript: '    const last={}; for(let i=0;i<s.length;i++) last[s[i]]=i; const res=[]; let start=0,end=0; for(let i=0;i<s.length;i++){end=Math.max(end,last[s[i]]);if(i===end){res.push(i-start+1);start=i+1;}} return res;',
    cpp: '        int last[128]; for(int i=0;i<(int)s.size();i++) last[(int)s[i]]=i; vector<int> res; int start=0,end=0; for(int i=0;i<(int)s.size();i++){end=max(end,last[(int)s[i]]);if(i==end){res.push_back(i-start+1);start=i+1;}} return res;',
    java: '        int[] last=new int[128]; for(int i=0;i<s.length();i++) last[s.charAt(i)]=i; List<Integer> res=new ArrayList<>(); int start=0,end=0; for(int i=0;i<s.length();i++){end=Math.max(end,last[s.charAt(i)]);if(i==end){res.add(i-start+1);start=i+1;}} return res;',
  },
  'maximum-product-of-word-lengths': {
    python: '        masks=[]\n        for w in words:\n            m=0\n            for c in w:\n                m|=1<<(ord(c)-97)\n            masks.append(m)\n        res=0\n        for i in range(len(words)):\n            for j in range(i+1,len(words)):\n                if masks[i]&masks[j]==0:\n                    res=max(res,len(words[i])*len(words[j]))\n        return res',
    javascript: '    const masks=words.map(w=>{let m=0;for(const c of w)m|=1<<(c.charCodeAt(0)-97);return m;}); let res=0; for(let i=0;i<words.length;i++)for(let j=i+1;j<words.length;j++)if((masks[i]&masks[j])===0)res=Math.max(res,words[i].length*words[j].length); return res;',
    cpp: "        int n=words.size(); vector<int> masks(n,0); for(int i=0;i<n;i++)for(char c:words[i])masks[i]|=1<<(c-'a'); int res=0; for(int i=0;i<n;i++)for(int j=i+1;j<n;j++)if((masks[i]&masks[j])==0)res=max(res,(int)(words[i].size()*words[j].size())); return res;",
    java: "        int n=words.length; int[] masks=new int[n]; for(int i=0;i<n;i++)for(char c:words[i].toCharArray())masks[i]|=1<<(c-'a'); int res=0; for(int i=0;i<n;i++)for(int j=i+1;j<n;j++)if((masks[i]&masks[j])==0)res=Math.max(res,words[i].length()*words[j].length()); return res;",
  },
  'word-break': {
    python: '        wset=set(wordDict)\n        dp=[False]*(len(s)+1)\n        dp[0]=True\n        for i in range(1,len(s)+1):\n            for j in range(i):\n                if dp[j] and s[j:i] in wset:\n                    dp[i]=True\n                    break\n        return dp[-1]',
    javascript: '    const wset=new Set(wordDict); const dp=new Array(s.length+1).fill(false); dp[0]=true; for(let i=1;i<=s.length;i++){for(let j=0;j<i;j++){if(dp[j]&&wset.has(s.slice(j,i))){dp[i]=true;break;}}} return dp[s.length];',
    cpp: '        set<string> w(wordDict.begin(),wordDict.end()); int n=s.size(); vector<char> dp(n+1,0); dp[0]=1; for(int i=1;i<=n;i++)for(int j=0;j<i;j++)if(dp[j]&&w.count(s.substr(j,i-j))){dp[i]=1;break;} return dp[n];',
    java: '        Set<String> w=new HashSet<>(wordDict); int n=s.length(); boolean[] dp=new boolean[n+1]; dp[0]=true; for(int i=1;i<=n;i++)for(int j=0;j<i;j++)if(dp[j]&&w.contains(s.substring(j,i))){dp[i]=true;break;} return dp[n];',
  },
  'sliding-window-maximum': {
    python: '        from collections import deque\n        dq=deque(); res=[]\n        for i,x in enumerate(nums):\n            while dq and nums[dq[-1]]<x:\n                dq.pop()\n            dq.append(i)\n            if dq[0]<=i-k:\n                dq.popleft()\n            if i>=k-1:\n                res.append(nums[dq[0]])\n        return res',
    javascript: '    const dq=[],res=[]; for(let i=0;i<nums.length;i++){while(dq.length&&nums[dq[dq.length-1]]<nums[i])dq.pop();dq.push(i);if(dq[0]<=i-k)dq.shift();if(i>=k-1)res.push(nums[dq[0]]);} return res;',
    cpp: '        deque<int> dq; vector<int> res; for(int i=0;i<(int)nums.size();i++){while(!dq.empty()&&nums[dq.back()]<nums[i])dq.pop_back();dq.push_back(i);if(dq.front()<=i-k)dq.pop_front();if(i>=k-1)res.push_back(nums[dq.front()]);} return res;',
    java: '        Deque<Integer> dq=new ArrayDeque<>(); List<Integer> res=new ArrayList<>(); for(int i=0;i<nums.length;i++){while(!dq.isEmpty()&&nums[dq.peekLast()]<nums[i])dq.pollLast();dq.addLast(i);if(dq.peekFirst()<=i-k)dq.pollFirst();if(i>=k-1)res.add(nums[dq.peekFirst()]);} int[] r=new int[res.size()];for(int i=0;i<r.length;i++)r[i]=res.get(i); return r;',
  },
  'jump-game-ii': {
    python: '        jumps=cur=far=0\n        for i in range(len(nums)-1):\n            far=max(far,i+nums[i])\n            if i==cur:\n                jumps+=1\n                cur=far\n        return jumps',
    javascript: '    let jumps=0,cur=0,far=0; for(let i=0;i<nums.length-1;i++){far=Math.max(far,i+nums[i]);if(i===cur){jumps++;cur=far;}} return jumps;',
    cpp: '        int jumps=0,cur=0,far=0; for(int i=0;i<(int)nums.size()-1;i++){far=max(far,i+nums[i]);if(i==cur){jumps++;cur=far;}} return jumps;',
    java: '        int jumps=0,cur=0,far=0; for(int i=0;i<nums.length-1;i++){far=Math.max(far,i+nums[i]);if(i==cur){jumps++;cur=far;}} return jumps;',
  },
  'happy-number': {
    python: '        seen=set()\n        while n!=1 and n not in seen:\n            seen.add(n)\n            n=sum(int(d)**2 for d in str(n))\n        return n==1',
    javascript: '    const seen=new Set(); while(n!==1&&!seen.has(n)){seen.add(n);let s=0;while(n>0){const d=n%10;s+=d*d;n=Math.floor(n/10);}n=s;} return n===1;',
    cpp: '        set<int> seen; while(n!=1&&!seen.count(n)){seen.insert(n);int s=0;while(n>0){int d=n%10;s+=d*d;n/=10;}n=s;} return n==1;',
    java: '        Set<Integer> seen=new HashSet<>(); while(n!=1&&!seen.contains(n)){seen.add(n);int s=0;while(n>0){int d=n%10;s+=d*d;n/=10;}n=s;} return n==1;',
  },
  'reverse-integer': {
    python: '        sign=-1 if n<0 else 1\n        n=abs(n)\n        res=0\n        while n:\n            res=res*10+n%10\n            n//=10\n        res*=sign\n        return res if -2**31<=res<=2**31-1 else 0',
    javascript: '    const sign=n<0?-1:1; let v=Math.abs(n),res=0; while(v>0){res=res*10+(v%10);v=Math.floor(v/10);} res*=sign; return (res<-2147483648||res>2147483647)?0:res;',
    cpp: '        long long res=0; int sign=n<0?-1:1; long long v=llabs((long long)n); while(v>0){res=res*10+v%10;v/=10;} res*=sign; if(res<-2147483648LL||res>2147483647LL)return 0; return (int)res;',
    java: '        int sign=n<0?-1:1; long v=Math.abs((long)n),res=0; while(v>0){res=res*10+v%10;v/=10;} res*=sign; if(res<-2147483648L||res>2147483647L)return 0; return (int)res;',
  },
  'valid-parenthesis-string': {
    python: "        lo=hi=0\n        for c in s:\n            if c=='(':\n                lo+=1; hi+=1\n            elif c==')':\n                lo-=1; hi-=1\n            else:\n                lo-=1; hi+=1\n            if hi<0: return False\n            lo=max(lo,0)\n        return lo==0",
    javascript: "    let lo=0,hi=0; for(const c of s){if(c==='('){lo++;hi++;}else if(c===')'){lo--;hi--;}else{lo--;hi++;}if(hi<0)return false;if(lo<0)lo=0;} return lo===0;",
    cpp: "        int lo=0,hi=0; for(char c:s){if(c=='('){lo++;hi++;}else if(c==')'){lo--;hi--;}else{lo--;hi++;}if(hi<0)return false;if(lo<0)lo=0;} return lo==0;",
    java: "        int lo=0,hi=0; for(char c:s.toCharArray()){if(c=='('){lo++;hi++;}else if(c==')'){lo--;hi--;}else{lo--;hi++;}if(hi<0)return false;if(lo<0)lo=0;} return lo==0;",
  },
  'decode-ways': {
    python: "        if not s or s[0]=='0': return 0\n        n=len(s)\n        dp=[0]*(n+1)\n        dp[0]=dp[1]=1\n        for i in range(2,n+1):\n            if s[i-1]!='0':\n                dp[i]+=dp[i-1]\n            two=int(s[i-2:i])\n            if 10<=two<=26:\n                dp[i]+=dp[i-2]\n        return dp[n]",
    javascript: "    if(!s||s[0]==='0')return 0; const n=s.length; const dp=new Array(n+1).fill(0); dp[0]=1;dp[1]=1; for(let i=2;i<=n;i++){if(s[i-1]!=='0')dp[i]+=dp[i-1];const two=parseInt(s.slice(i-2,i),10);if(two>=10&&two<=26)dp[i]+=dp[i-2];} return dp[n];",
    cpp: "        if(s.empty()||s[0]=='0')return 0; int n=s.size(); vector<long long> dp(n+1,0); dp[0]=1;dp[1]=1; for(int i=2;i<=n;i++){if(s[i-1]!='0')dp[i]+=dp[i-1];int two=stoi(s.substr(i-2,2));if(two>=10&&two<=26)dp[i]+=dp[i-2];} return (int)dp[n];",
    java: "        if(s.isEmpty()||s.charAt(0)=='0')return 0; int n=s.length(); long[] dp=new long[n+1]; dp[0]=1;dp[1]=1; for(int i=2;i<=n;i++){if(s.charAt(i-1)!='0')dp[i]+=dp[i-1];int two=Integer.parseInt(s.substring(i-2,i));if(two>=10&&two<=26)dp[i]+=dp[i-2];} return (int)dp[n];",
  },
  'palindromic-substrings': {
    python: '        res=0\n        for center in range(2*len(s)-1):\n            l=center//2\n            r=l+center%2\n            while l>=0 and r<len(s) and s[l]==s[r]:\n                res+=1\n                l-=1\n                r+=1\n        return res',
    javascript: '    let res=0; for(let center=0;center<2*s.length-1;center++){let l=Math.floor(center/2),r=l+(center%2);while(l>=0&&r<s.length&&s[l]===s[r]){res++;l--;r++;}} return res;',
    cpp: '        int res=0,n=s.size(); for(int center=0;center<2*n-1;center++){int l=center/2,r=l+center%2;while(l>=0&&r<n&&s[l]==s[r]){res++;l--;r++;}} return res;',
    java: '        int res=0,n=s.length(); for(int center=0;center<2*n-1;center++){int l=center/2,r=l+center%2;while(l>=0&&r<n&&s.charAt(l)==s.charAt(r)){res++;l--;r++;}} return res;',
  },
  'top-k-frequent-elements': {
    python: '        from collections import Counter\n        c=Counter(nums)\n        return [v for v,_ in c.most_common(k)]',
    javascript: '    const c={}; for(const x of nums)c[x]=(c[x]||0)+1; return Object.keys(c).map(Number).sort((a,b)=>c[b]-c[a]).slice(0,k);',
    cpp: '        unordered_map<int,int> c; for(int x:nums)c[x]++; vector<pair<int,int>> v(c.begin(),c.end()); sort(v.begin(),v.end(),[](const pair<int,int>&a,const pair<int,int>&b){return a.second>b.second;}); vector<int> r; for(int i=0;i<k&&i<(int)v.size();i++)r.push_back(v[i].first); return r;',
    java: '        Map<Integer,Integer> c=new HashMap<>(); for(int x:nums)c.merge(x,1,Integer::sum); List<Integer> keys=new ArrayList<>(c.keySet()); keys.sort((a,b)->c.get(b)-c.get(a)); int[] r=new int[k]; for(int i=0;i<k;i++)r[i]=keys.get(i); return r;',
  },
};
module.exports = { SOL };
