class Solution:
    def validPalindrome(self, s):
        def isPal(i, j):
            while i < j:
                if s[i] != s[j]:
                    return False
                i += 1
                j -= 1
            return True
        i, j = 0, len(s) - 1
        while i < j:
            if s[i] != s[j]:
                return isPal(i + 1, j) or isPal(i, j - 1)
            i += 1
            j -= 1
        return True
import sys
_l=sys.stdin.read().split('\n')
_T=int(_l[0]);_o=[]
for _i in range(_T):
    _s=_l[1+_i] if 1+_i<len(_l) else ""
    _o.append('true' if Solution().validPalindrome(_s) else 'false')
print('\n'.join(_o))