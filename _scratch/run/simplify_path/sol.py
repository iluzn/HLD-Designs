class Solution:
    def simplifyPath(self, s):
        st = []
        for part in s.split("/"):
            if part == "" or part == ".":
                continue
            if part == "..":
                if st: st.pop()
            else:
                st.append(part)
        return "/" + "/".join(st)
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+_i] if 1+_i<len(_l) else ""
    _o.append(str(Solution().simplifyPath(_s)))
print('\n'.join(_o))