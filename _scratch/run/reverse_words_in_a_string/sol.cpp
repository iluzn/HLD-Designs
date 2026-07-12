#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string reverseWords(string s) {
        vector<string> words;
        stringstream ss(s);
        string w;
        while (ss >> w) words.push_back(w);
        string res;
        for (int i = (int)words.size() - 1; i >= 0; i--) {
            if (!res.empty()) res += " ";
            res += words[i];
        }
        return res;
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<Solution().reverseWords(s)<<"\n";}}