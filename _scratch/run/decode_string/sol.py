class Solution:
    def decodeString(self, s):
        st = []
        cur = ""
        num = 0
        for c in s:
            if c.isdigit():
                num = num * 10 + int(c)
            elif c == "[":
                st.append((cur, num))
                cur = ""
                num = 0
            elif c == "]":
                prev, k = st.pop()
                cur = prev + cur * k
            else:
                cur += c
        return cur
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+_i] if 1+_i<len(_l) else ""
    _o.append(str(Solution().decodeString(_s)))
print('\n'.join(_o))