class Solution:
    def removeDuplicates(self, s, k):
        st = []
        for c in s:
            if st and st[-1][0] == c:
                st[-1][1] += 1
                if st[-1][1] == k:
                    st.pop()
            else:
                st.append([c, 1])
        return "".join(c * n for c, n in st)
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+2*_i] if 1+2*_i<len(_l) else ""
    _k=int(_l[2+2*_i]) if 2+2*_i<len(_l) else 0
    _o.append(str(Solution().removeDuplicates(_s,_k)))
print('\n'.join(_o))