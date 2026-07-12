class Solution:
    def detectCapitalUse(self, s):
        return s.isupper() or s.islower() or (s[0].isupper() and s[1:].islower())
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+_i] if 1+_i<len(_l) else ""
    _o.append('true' if Solution().detectCapitalUse(_s) else 'false')
print('\n'.join(_o))