#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool backspaceCompare(string s, string t) {
        auto build = [](string x) {
            string st;
            for (char c : x) {
                if (c == '#') { if (!st.empty()) st.pop_back(); }
                else st.push_back(c);
            }
            return st;
        };
        return build(s) == build(t);
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s,t;for(int i=0;i<T;i++){if(!getline(cin,s))s="";if(!getline(cin,t))t="";cout<<(Solution().backspaceCompare(s,t)?"true":"false")<<"\n";}}