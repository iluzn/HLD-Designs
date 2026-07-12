class Solution:
    def reverseString(self, s):
        return s[::-1]
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+_i] if 1+_i<len(_l) else ""
    _o.append(str(Solution().reverseString(_s)))
print('\n'.join(_o))