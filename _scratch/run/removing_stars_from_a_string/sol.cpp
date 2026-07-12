#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string removeStars(string s) {
        string st;
        for (char c : s) {
            if (c == '*') st.pop_back();
            else st.push_back(c);
        }
        return st;
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<Solution().removeStars(s)<<"\n";}}