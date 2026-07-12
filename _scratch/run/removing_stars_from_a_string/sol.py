class Solution:
    def removeStars(self, s):
        st = []
        for c in s:
            if c == "*":
                st.pop()
            else:
                st.append(c)
        return "".join(st)
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+_i] if 1+_i<len(_l) else ""
    _o.append(str(Solution().removeStars(_s)))
print('\n'.join(_o))