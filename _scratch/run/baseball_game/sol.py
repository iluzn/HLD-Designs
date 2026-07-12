class Solution:
    def calPoints(self, s):
        st = []
        for tok in s.split():
            if tok == "C":
                st.pop()
            elif tok == "D":
                st.append(2 * st[-1])
            elif tok == "+":
                st.append(st[-1] + st[-2])
            else:
                st.append(int(tok))
        return sum(st)
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+_i] if 1+_i<len(_l) else ""
    _o.append(str(Solution().calPoints(_s)))
print('\n'.join(_o))