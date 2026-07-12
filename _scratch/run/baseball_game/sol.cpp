#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int calPoints(string s) {
        vector<int> st;
        stringstream ss(s);
        string tok;
        while (ss >> tok) {
            if (tok == "C") st.pop_back();
            else if (tok == "D") st.push_back(2 * st.back());
            else if (tok == "+") st.push_back(st[st.size()-1] + st[st.size()-2]);
            else st.push_back(stoi(tok));
        }
        int sum = 0;
        for (int x : st) sum += x;
        return sum;
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<Solution().calPoints(s)<<"\n";}}