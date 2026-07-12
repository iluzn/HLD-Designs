class Solution:
    def scoreOfParentheses(self, s):
        st = [0]
        for c in s:
            if c == "(":
                st.append(0)
            else:
                v = st.pop()
                st[-1] += max(2 * v, 1)
        return st[0]
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+_i] if 1+_i<len(_l) else ""
    _o.append(str(Solution().scoreOfParentheses(_s)))
print('\n'.join(_o))