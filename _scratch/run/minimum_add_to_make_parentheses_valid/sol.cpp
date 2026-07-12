#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int minAddToMakeValid(string s) {
        int open = 0, add = 0;
        for (char c : s) {
            if (c == '(') open++;
            else if (open > 0) open--;
            else add++;
        }
        return add + open;
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<Solution().minAddToMakeValid(s)<<"\n";}}