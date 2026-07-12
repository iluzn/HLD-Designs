#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string simplifyPath(string s) {
        vector<string> st;
        stringstream ss(s);
        string part;
        while (getline(ss, part, '/')) {
            if (part.empty() || part == ".") continue;
            if (part == "..") { if (!st.empty()) st.pop_back(); }
            else st.push_back(part);
        }
        string res;
        for (auto& p : st) res += "/" + p;
        return res.empty() ? "/" : res;
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<Solution().simplifyPath(s)<<"\n";}}