const puppeteer = require('puppeteer');
const T = [
  { slug: 'coin-change', lang: 'Python3', code: 'class Solution:\n    def coinChange(self, coins, amount):\n        dp=[0]+[amount+1]*amount\n        for a in range(1,amount+1):\n            for c in coins:\n                if c<=a: dp[a]=min(dp[a],dp[a-c]+1)\n        return dp[amount] if dp[amount]<=amount else -1' },
  { slug: 'house-robber', lang: 'C++', code: '#include <bits/stdc++.h>\nusing namespace std;\nclass Solution{public:\n int rob(vector<int>& nums){int p=0,c=0;for(int x:nums){int t=max(c,p+x);p=c;c=t;}return c;}\n};' },
  { slug: 'move-zeroes', lang: 'Java', code: 'import java.util.*;\nclass Solution{public int[] moveZeroes(int[] nums){int j=0;for(int i=0;i<nums.length;i++){if(nums[i]!=0){int t=nums[i];nums[i]=nums[j];nums[j]=t;j++;}}return nums;}}' },
  { slug: 'longest-substring-without-repeating-characters', lang: 'Python3', code: 'class Solution:\n    def lengthOfLongestSubstring(self, s):\n        seen={};l=b=0\n        for r,c in enumerate(s):\n            if c in seen and seen[c]>=l: l=seen[c]+1\n            seen[c]=r; b=max(b,r-l+1)\n        return b' },
  { slug: 'valid-palindrome', lang: 'JavaScript', code: 'var isPalindrome=function(s){var t=s.toLowerCase().replace(/[^a-z0-9]/g,"");return t===t.split("").reverse().join("");};' },
  { slug: 'palindrome-number', lang: 'Java', code: 'import java.util.*;\nclass Solution{public boolean isPalindrome(int n){if(n<0)return false;String s=""+n;return s.equals(new StringBuilder(s).reverse().toString());}}' },
  { slug: 'sqrtx', lang: 'C++', code: '#include <bits/stdc++.h>\nusing namespace std;\nclass Solution{public:\n int mySqrt(int n){long lo=0,hi=n,ans=0;while(lo<=hi){long m=(lo+hi)/2;if(m*m<=(long)n){ans=m;lo=m+1;}else hi=m-1;}return (int)ans;}\n};' },
  { slug: 'kth-largest-element-in-an-array', lang: 'Python3', code: 'class Solution:\n    def findKthLargest(self, nums, target):\n        return sorted(nums, reverse=True)[target-1]' },
];
async function verdict(p, ms){const t0=Date.now();while(Date.now()-t0<ms){const v=await p.evaluate(()=>(document.querySelector('.lc-verdict')||{}).textContent||'');if(v&&!/Judging|Running/.test(v))return v.trim();await new Promise(r=>setTimeout(r,500));}return 'TIMEOUT';}
(async()=>{
  const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});
  for(const t of T){
    const p=await b.newPage();
    try{
      await p.goto('https://systemcraft.in/dsa/problem/'+t.slug,{waitUntil:'networkidle2',timeout:60000});
      await new Promise(r=>setTimeout(r,3000));
      await p.evaluate((name)=>{const s=document.getElementById('lc-lang');for(const o of s.options)if(o.textContent===name)s.value=o.value;s.dispatchEvent(new Event('change'));},t.lang);
      await new Promise(r=>setTimeout(r,300));
      await p.evaluate((c)=>document.querySelector('.CodeMirror').CodeMirror.setValue(c),t.code);
      await p.click('#lc-submit');
      console.log((t.slug+' ['+t.lang+']').padEnd(52)+await verdict(p,25000));
    }catch(e){console.log(t.slug+' ERROR '+e.message);}
    await p.close();
  }
  await b.close();
})();
