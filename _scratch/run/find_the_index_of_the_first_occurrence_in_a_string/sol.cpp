#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int strStr(string s, string t) {
        size_t pos = s.find(t);
        return pos == string::npos ? -1 : (int)pos;
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s,t;for(int i=0;i<T;i++){if(!getline(cin,s))s="";if(!getline(cin,t))t="";cout<<Solution().strStr(s,t)<<"\n";}}