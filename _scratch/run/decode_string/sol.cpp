#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string decodeString(string s) {
        vector<string> strs;
        vector<int> nums;
        string cur;
        int num = 0;
        for (char c : s) {
            if (isdigit(c)) num = num * 10 + (c - '0');
            else if (c == '[') { strs.push_back(cur); nums.push_back(num); cur = ""; num = 0; }
            else if (c == ']') {
                int k = nums.back(); nums.pop_back();
                string prev = strs.back(); strs.pop_back();
                string rep;
                for (int i = 0; i < k; i++) rep += cur;
                cur = prev + rep;
            } else cur += c;
        }
        return cur;
    }
};
int main(){string l;getline(cin,l);int T=stoi(l);string s;for(int i=0;i<T;i++){if(!getline(cin,s))s="";cout<<Solution().decodeString(s)<<"\n";}}