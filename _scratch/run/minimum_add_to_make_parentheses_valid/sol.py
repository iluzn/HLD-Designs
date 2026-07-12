class Solution:
    def minAddToMakeValid(self, s):
        open_ = add = 0
        for c in s:
            if c == "(":
                open_ += 1
            elif open_ > 0:
                open_ -= 1
            else:
                add += 1
        return add + open_
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+_i] if 1+_i<len(_l) else ""
    _o.append(str(Solution().minAddToMakeValid(_s)))
print('\n'.join(_o))