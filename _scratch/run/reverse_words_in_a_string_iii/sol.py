class Solution:
    def reverseWords(self, s):
        return " ".join(w[::-1] for w in s.split(" "))
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+_i] if 1+_i<len(_l) else ""
    _o.append(str(Solution().reverseWords(_s)))
print('\n'.join(_o))