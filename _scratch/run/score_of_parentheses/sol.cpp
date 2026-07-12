#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int scoreOfParentheses(string s) {
        vector<int> st = {0};
        for (char c : s) {
            if (c == '(') st.push_back(0);
            else {
                int v = st.back(); st.pop_back();
                st.back() += max(2 * v, 1);
            }
        }
        return st[0];
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<Solution().scoreOfParentheses(s)<<"\n";}}