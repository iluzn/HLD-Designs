#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool validPalindrome(string s) {
        auto isPal = [&](int i, int j) {
            while (i < j) { if (s[i] != s[j]) return false; i++; j--; }
            return true;
        };
        int i = 0, j = (int)s.size() - 1;
        while (i < j) {
            if (s[i] != s[j]) return isPal(i + 1, j) || isPal(i, j - 1);
            i++; j--;
        }
        return true;
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<(Solution().validPalindrome(s)?"true":"false")<<"\n";}}