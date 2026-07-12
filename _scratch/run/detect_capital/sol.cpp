#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool detectCapitalUse(string s) {
        auto isUpper = [](const string& x) { for (char c : x) if (!isupper((unsigned char)c)) return false; return true; };
        auto isLower = [](const string& x) { for (char c : x) if (!islower((unsigned char)c)) return false; return true; };
        if (isUpper(s) || isLower(s)) return true;
        return isupper((unsigned char)s[0]) && isLower(s.substr(1));
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<(Solution().detectCapitalUse(s)?"true":"false")<<"\n";}}