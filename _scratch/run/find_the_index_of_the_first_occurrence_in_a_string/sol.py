class Solution:
    def strStr(self, s, t):
        n, m = len(s), len(t)
        for i in range(n - m + 1):
            if s[i:i+m] == t:
                return i
        return -1
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+2*_i] if 1+2*_i<len(_l) else ""
    _t=_l[2+2*_i] if 2+2*_i<len(_l) else ""
    _o.append(str(Solution().strStr(_s,_t)))
print('\n'.join(_o))