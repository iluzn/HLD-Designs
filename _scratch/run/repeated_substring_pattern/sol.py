class Solution:
    def repeatedSubstringPattern(self, s):
        return s in (s + s)[1:-1]
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+_i] if 1+_i<len(_l) else ""
    _o.append('true' if Solution().repeatedSubstringPattern(_s) else 'false')
print('\n'.join(_o))