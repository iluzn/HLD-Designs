class Solution:
    def reverseVowels(self, s):
        v = set("aeiouAEIOU")
        a = list(s)
        l, r = 0, len(a) - 1
        while l < r:
            if a[l] not in v:
                l += 1
            elif a[r] not in v:
                r -= 1
            else:
                a[l], a[r] = a[r], a[l]
                l += 1
                r -= 1
        return "".join(a)
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+_i] if 1+_i<len(_l) else ""
    _o.append(str(Solution().reverseVowels(_s)))
print('\n'.join(_o))