#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool repeatedSubstringPattern(string s) {
        string d = s + s;
        return d.substr(1, d.size() - 2).find(s) != string::npos;
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<(Solution().repeatedSubstringPattern(s)?"true":"false")<<"\n";}}