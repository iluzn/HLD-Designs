#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string reverseWords(string s) {
        stringstream ss(s);
        string w, res;
        bool first = true;
        while (ss >> w) {
            reverse(w.begin(), w.end());
            if (!first) res += " ";
            res += w;
            first = false;
        }
        return res;
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<Solution().reverseWords(s)<<"\n";}}