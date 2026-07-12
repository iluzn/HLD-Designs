#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string reverseVowels(string s) {
        string v = "aeiouAEIOU";
        int l = 0, r = (int)s.size() - 1;
        while (l < r) {
            if (v.find(s[l]) == string::npos) l++;
            else if (v.find(s[r]) == string::npos) r--;
            else { swap(s[l], s[r]); l++; r--; }
        }
        return s;
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<Solution().reverseVowels(s)<<"\n";}}