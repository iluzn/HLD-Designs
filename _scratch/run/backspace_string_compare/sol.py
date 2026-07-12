class Solution:
    def backspaceCompare(self, s, t):
        def build(x):
            st = []
            for c in x:
                if c == "#":
                    if st: st.pop()
                else:
                    st.append(c)
            return "".join(st)
        return build(s) == build(t)
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+2*_i] if 1+2*_i<len(_l) else ""
    _t=_l[2+2*_i] if 2+2*_i<len(_l) else ""
    _o.append('true' if Solution().backspaceCompare(_s,_t) else 'false')
print('\n'.join(_o))