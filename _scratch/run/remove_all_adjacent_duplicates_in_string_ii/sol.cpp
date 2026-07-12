#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int removeDuplicates(string s, int k) {
        vector<pair<char,int>> st;
        for (char c : s) {
            if (!st.empty() && st.back().first == c) {
                st.back().second++;
                if (st.back().second == k) st.pop_back();
            } else st.push_back({c, 1});
        }
        string res;
        for (auto& p : st) res += string(p.second, p.first);
        return res;
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s,ks;for(int i=0;i<T;i++){if(!getline(cin,s))s="";if(!getline(cin,ks))ks="0";cout<<Solution().removeDuplicates(s,stoi(ks))<<"\n";}}