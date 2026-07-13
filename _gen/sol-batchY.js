// Batch Y: known-correct solutions for batch 27 (hard string problems).
// Python & JS use nested functions; C++ uses std::function lambdas; Java uses
// instance fields + helper methods whose final brace is supplied by the stub.
const SOL = {
  'minimum-window-substring': {
    python: `        if not t:
            return ""
        need = {}
        for c in t:
            need[c] = need.get(c, 0) + 1
        required = len(need)
        have = {}
        formed = 0
        l = 0
        best_len = float('inf')
        best_l = 0
        for r in range(len(s)):
            c = s[r]
            if c in need:
                have[c] = have.get(c, 0) + 1
                if have[c] == need[c]:
                    formed += 1
            while formed == required:
                if r - l + 1 < best_len:
                    best_len = r - l + 1
                    best_l = l
                lc = s[l]
                if lc in need:
                    have[lc] -= 1
                    if have[lc] < need[lc]:
                        formed -= 1
                l += 1
        return "" if best_len == float('inf') else s[best_l:best_l + best_len]`,
    javascript: `    if (!t.length) return "";
    const need = {};
    for (const c of t) need[c] = (need[c] || 0) + 1;
    const required = Object.keys(need).length;
    const have = {};
    let formed = 0, l = 0, bestLen = Infinity, bestL = 0;
    for (let r = 0; r < s.length; r++) {
        const c = s[r];
        if (need[c] !== undefined) { have[c] = (have[c] || 0) + 1; if (have[c] === need[c]) formed++; }
        while (formed === required) {
            if (r - l + 1 < bestLen) { bestLen = r - l + 1; bestL = l; }
            const lc = s[l];
            if (need[lc] !== undefined) { have[lc]--; if (have[lc] < need[lc]) formed--; }
            l++;
        }
    }
    return bestLen === Infinity ? "" : s.substr(bestL, bestLen);`,
    cpp: `        if (t.empty()) return "";
        unordered_map<char,int> need, have;
        for (char c : t) need[c]++;
        int required = need.size(), formed = 0, l = 0, bestLen = INT_MAX, bestL = 0;
        for (int r = 0; r < (int)s.size(); r++) {
            char c = s[r];
            if (need.count(c)) { have[c]++; if (have[c] == need[c]) formed++; }
            while (formed == required) {
                if (r - l + 1 < bestLen) { bestLen = r - l + 1; bestL = l; }
                char lc = s[l];
                if (need.count(lc)) { have[lc]--; if (have[lc] < need[lc]) formed--; }
                l++;
            }
        }
        return bestLen == INT_MAX ? "" : s.substr(bestL, bestLen);`,
    java: `        if (t.isEmpty()) return "";
        Map<Character,Integer> need = new HashMap<>(), have = new HashMap<>();
        for (char c : t.toCharArray()) need.put(c, need.getOrDefault(c, 0) + 1);
        int required = need.size(), formed = 0, l = 0, bestLen = Integer.MAX_VALUE, bestL = 0;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            if (need.containsKey(c)) { have.put(c, have.getOrDefault(c, 0) + 1); if (have.get(c).equals(need.get(c))) formed++; }
            while (formed == required) {
                if (r - l + 1 < bestLen) { bestLen = r - l + 1; bestL = l; }
                char lc = s.charAt(l);
                if (need.containsKey(lc)) { have.put(lc, have.get(lc) - 1); if (have.get(lc) < need.get(lc)) formed--; }
                l++;
            }
        }
        return bestLen == Integer.MAX_VALUE ? "" : s.substring(bestL, bestL + bestLen);`,
  },
  'wildcard-matching': {
    python: `        n, m = len(s), len(t)
        dp = [[False] * (m + 1) for _ in range(n + 1)]
        dp[0][0] = True
        for j in range(1, m + 1):
            if t[j - 1] == '*':
                dp[0][j] = dp[0][j - 1]
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if t[j - 1] == '*':
                    dp[i][j] = dp[i - 1][j] or dp[i][j - 1]
                elif t[j - 1] == '?' or t[j - 1] == s[i - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
        return dp[n][m]`,
    javascript: `    const n = s.length, m = t.length;
    const dp = Array.from({length: n + 1}, () => new Array(m + 1).fill(false));
    dp[0][0] = true;
    for (let j = 1; j <= m; j++) if (t[j - 1] === '*') dp[0][j] = dp[0][j - 1];
    for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) {
        if (t[j - 1] === '*') dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
        else if (t[j - 1] === '?' || t[j - 1] === s[i - 1]) dp[i][j] = dp[i - 1][j - 1];
    }
    return dp[n][m];`,
    cpp: `        int n = s.size(), m = t.size();
        vector<vector<bool>> dp(n + 1, vector<bool>(m + 1, false));
        dp[0][0] = true;
        for (int j = 1; j <= m; j++) if (t[j - 1] == '*') dp[0][j] = dp[0][j - 1];
        for (int i = 1; i <= n; i++) for (int j = 1; j <= m; j++) {
            if (t[j - 1] == '*') dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
            else if (t[j - 1] == '?' || t[j - 1] == s[i - 1]) dp[i][j] = dp[i - 1][j - 1];
        }
        return dp[n][m];`,
    java: `        int n = s.length(), m = t.length();
        boolean[][] dp = new boolean[n + 1][m + 1];
        dp[0][0] = true;
        for (int j = 1; j <= m; j++) if (t.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 1];
        for (int i = 1; i <= n; i++) for (int j = 1; j <= m; j++) {
            if (t.charAt(j - 1) == '*') dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
            else if (t.charAt(j - 1) == '?' || t.charAt(j - 1) == s.charAt(i - 1)) dp[i][j] = dp[i - 1][j - 1];
        }
        return dp[n][m];`,
  },
  'longest-valid-parentheses': {
    python: `        best = 0
        st = [-1]
        for i in range(len(s)):
            if s[i] == '(':
                st.append(i)
            else:
                st.pop()
                if not st:
                    st.append(i)
                else:
                    best = max(best, i - st[-1])
        return best`,
    javascript: `    let best = 0;
    const st = [-1];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') st.push(i);
        else { st.pop(); if (st.length === 0) st.push(i); else best = Math.max(best, i - st[st.length - 1]); }
    }
    return best;`,
    cpp: `        int best = 0;
        vector<int> st; st.push_back(-1);
        for (int i = 0; i < (int)s.size(); i++) {
            if (s[i] == '(') st.push_back(i);
            else { st.pop_back(); if (st.empty()) st.push_back(i); else best = max(best, i - st.back()); }
        }
        return best;`,
    java: `        int best = 0;
        Deque<Integer> st = new ArrayDeque<>();
        st.push(-1);
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') st.push(i);
            else { st.pop(); if (st.isEmpty()) st.push(i); else best = Math.max(best, i - st.peek()); }
        }
        return best;`,
  },
  'shortest-palindrome': {
    python: `        n = len(s)
        for k in range(n, -1, -1):
            ok = True
            i, j = 0, k - 1
            while i < j:
                if s[i] != s[j]:
                    ok = False
                    break
                i += 1
                j -= 1
            if ok:
                return s[k:][::-1] + s
        return s`,
    javascript: `    const n = s.length;
    for (let k = n; k >= 0; k--) {
        let ok = true;
        for (let i = 0, j = k - 1; i < j; i++, j--) if (s[i] !== s[j]) { ok = false; break; }
        if (ok) return s.substring(k).split('').reverse().join('') + s;
    }
    return s;`,
    cpp: `        int n = s.size();
        for (int k = n; k >= 0; k--) {
            bool ok = true;
            for (int i = 0, j = k - 1; i < j; i++, j--) if (s[i] != s[j]) { ok = false; break; }
            if (ok) { string suffix = s.substr(k); reverse(suffix.begin(), suffix.end()); return suffix + s; }
        }
        return s;`,
    java: `        int n = s.length();
        for (int k = n; k >= 0; k--) {
            boolean ok = true;
            for (int i = 0, j = k - 1; i < j; i++, j--) if (s.charAt(i) != s.charAt(j)) { ok = false; break; }
            if (ok) return new StringBuilder(s.substring(k)).reverse().toString() + s;
        }
        return s;`,
  },
  'scramble-string': {
    python: `        memo = {}
        def rec(a, b):
            if a == b:
                return True
            if len(a) != len(b):
                return False
            key = a + '#' + b
            if key in memo:
                return memo[key]
            cnt = {}
            for c in a:
                cnt[c] = cnt.get(c, 0) + 1
            for c in b:
                cnt[c] = cnt.get(c, 0) - 1
            for v in cnt.values():
                if v != 0:
                    memo[key] = False
                    return False
            n = len(a)
            for i in range(1, n):
                if rec(a[:i], b[:i]) and rec(a[i:], b[i:]):
                    memo[key] = True
                    return True
                if rec(a[:i], b[n - i:]) and rec(a[i:], b[:n - i]):
                    memo[key] = True
                    return True
            memo[key] = False
            return False
        return rec(s, t)`,
    javascript: `    const memo = {};
    const rec = (a, b) => {
        if (a === b) return true;
        if (a.length !== b.length) return false;
        const key = a + '#' + b;
        if (memo[key] !== undefined) return memo[key];
        const cnt = {};
        for (const c of a) cnt[c] = (cnt[c] || 0) + 1;
        for (const c of b) cnt[c] = (cnt[c] || 0) - 1;
        for (const k in cnt) if (cnt[k] !== 0) { memo[key] = false; return false; }
        const n = a.length;
        for (let i = 1; i < n; i++) {
            if (rec(a.substring(0, i), b.substring(0, i)) && rec(a.substring(i), b.substring(i))) { memo[key] = true; return true; }
            if (rec(a.substring(0, i), b.substring(n - i)) && rec(a.substring(i), b.substring(0, n - i))) { memo[key] = true; return true; }
        }
        memo[key] = false;
        return false;
    };
    return rec(s, t);`,
    cpp: `        unordered_map<string,bool> memo;
        function<bool(string,string)> rec = [&](string a, string b) -> bool {
            if (a == b) return true;
            if (a.size() != b.size()) return false;
            string key = a + "#" + b;
            if (memo.count(key)) return memo[key];
            int cnt[26] = {0};
            for (char c : a) cnt[c - 'a']++;
            for (char c : b) cnt[c - 'a']--;
            for (int x = 0; x < 26; x++) if (cnt[x] != 0) { memo[key] = false; return false; }
            int n = a.size();
            for (int i = 1; i < n; i++) {
                if (rec(a.substr(0, i), b.substr(0, i)) && rec(a.substr(i), b.substr(i))) { memo[key] = true; return true; }
                if (rec(a.substr(0, i), b.substr(n - i)) && rec(a.substr(i), b.substr(0, n - i))) { memo[key] = true; return true; }
            }
            memo[key] = false;
            return false;
        };
        return rec(s, t);`,
    java: `        memo = new HashMap<>();
        return rec(s, t);
    }
    Map<String,Boolean> memo;
    private boolean rec(String a, String b) {
        if (a.equals(b)) return true;
        if (a.length() != b.length()) return false;
        String key = a + "#" + b;
        if (memo.containsKey(key)) return memo.get(key);
        int[] cnt = new int[26];
        for (char c : a.toCharArray()) cnt[c - 'a']++;
        for (char c : b.toCharArray()) cnt[c - 'a']--;
        for (int x = 0; x < 26; x++) if (cnt[x] != 0) { memo.put(key, false); return false; }
        int n = a.length();
        for (int i = 1; i < n; i++) {
            if (rec(a.substring(0, i), b.substring(0, i)) && rec(a.substring(i), b.substring(i))) { memo.put(key, true); return true; }
            if (rec(a.substring(0, i), b.substring(n - i)) && rec(a.substring(i), b.substring(0, n - i))) { memo.put(key, true); return true; }
        }
        memo.put(key, false);
        return false;`,
  },
  'basic-calculator': {
    python: `        st = []
        num = 0
        sign = 1
        res = 0
        for c in s:
            if c.isdigit():
                num = num * 10 + int(c)
            elif c == '+':
                res += sign * num
                num = 0
                sign = 1
            elif c == '-':
                res += sign * num
                num = 0
                sign = -1
            elif c == '(':
                st.append(res)
                st.append(sign)
                res = 0
                sign = 1
            elif c == ')':
                res += sign * num
                num = 0
                res *= st.pop()
                res += st.pop()
        res += sign * num
        return res`,
    javascript: `    const st = [];
    let num = 0, sign = 1, res = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c >= '0' && c <= '9') num = num * 10 + (c.charCodeAt(0) - 48);
        else if (c === '+') { res += sign * num; num = 0; sign = 1; }
        else if (c === '-') { res += sign * num; num = 0; sign = -1; }
        else if (c === '(') { st.push(res); st.push(sign); res = 0; sign = 1; }
        else if (c === ')') { res += sign * num; num = 0; res *= st.pop(); res += st.pop(); }
    }
    res += sign * num;
    return res;`,
    cpp: `        vector<long long> st;
        long long num = 0, sign = 1, res = 0;
        for (char c : s) {
            if (c >= '0' && c <= '9') num = num * 10 + (c - '0');
            else if (c == '+') { res += sign * num; num = 0; sign = 1; }
            else if (c == '-') { res += sign * num; num = 0; sign = -1; }
            else if (c == '(') { st.push_back(res); st.push_back(sign); res = 0; sign = 1; }
            else if (c == ')') { res += sign * num; num = 0; res *= st.back(); st.pop_back(); res += st.back(); st.pop_back(); }
        }
        res += sign * num;
        return (int)res;`,
    java: `        Deque<Long> st = new ArrayDeque<>();
        long num = 0, sign = 1, res = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c >= '0' && c <= '9') num = num * 10 + (c - '0');
            else if (c == '+') { res += sign * num; num = 0; sign = 1; }
            else if (c == '-') { res += sign * num; num = 0; sign = -1; }
            else if (c == '(') { st.push(res); st.push(sign); res = 0; sign = 1; }
            else if (c == ')') { res += sign * num; num = 0; res *= st.pop(); res += st.pop(); }
        }
        res += sign * num;
        return (int) res;`,
  },
  'valid-number': {
    python: `        i = 0
        n = len(s)
        if n == 0:
            return False
        if s[i] == '+' or s[i] == '-':
            i += 1
        digits = 0
        dots = 0
        while i < n and (s[i].isdigit() or s[i] == '.'):
            if s[i] == '.':
                dots += 1
                if dots > 1:
                    return False
            else:
                digits += 1
            i += 1
        if digits == 0:
            return False
        if i < n and (s[i] == 'e' or s[i] == 'E'):
            i += 1
            if i < n and (s[i] == '+' or s[i] == '-'):
                i += 1
            ed = 0
            while i < n and s[i].isdigit():
                ed += 1
                i += 1
            if ed == 0:
                return False
        return i == n`,
    javascript: `    let i = 0;
    const n = s.length;
    if (n === 0) return false;
    if (s[i] === '+' || s[i] === '-') i++;
    let digits = 0, dots = 0;
    while (i < n && ((s[i] >= '0' && s[i] <= '9') || s[i] === '.')) {
        if (s[i] === '.') { dots++; if (dots > 1) return false; }
        else digits++;
        i++;
    }
    if (digits === 0) return false;
    if (i < n && (s[i] === 'e' || s[i] === 'E')) {
        i++;
        if (i < n && (s[i] === '+' || s[i] === '-')) i++;
        let ed = 0;
        while (i < n && s[i] >= '0' && s[i] <= '9') { ed++; i++; }
        if (ed === 0) return false;
    }
    return i === n;`,
    cpp: `        int i = 0, n = s.size();
        if (n == 0) return false;
        if (s[i] == '+' || s[i] == '-') i++;
        int digits = 0, dots = 0;
        while (i < n && ((s[i] >= '0' && s[i] <= '9') || s[i] == '.')) {
            if (s[i] == '.') { dots++; if (dots > 1) return false; }
            else digits++;
            i++;
        }
        if (digits == 0) return false;
        if (i < n && (s[i] == 'e' || s[i] == 'E')) {
            i++;
            if (i < n && (s[i] == '+' || s[i] == '-')) i++;
            int ed = 0;
            while (i < n && s[i] >= '0' && s[i] <= '9') { ed++; i++; }
            if (ed == 0) return false;
        }
        return i == n;`,
    java: `        int i = 0, n = s.length();
        if (n == 0) return false;
        if (s.charAt(i) == '+' || s.charAt(i) == '-') i++;
        int digits = 0, dots = 0;
        while (i < n && ((s.charAt(i) >= '0' && s.charAt(i) <= '9') || s.charAt(i) == '.')) {
            if (s.charAt(i) == '.') { dots++; if (dots > 1) return false; }
            else digits++;
            i++;
        }
        if (digits == 0) return false;
        if (i < n && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
            i++;
            if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) i++;
            int ed = 0;
            while (i < n && s.charAt(i) >= '0' && s.charAt(i) <= '9') { ed++; i++; }
            if (ed == 0) return false;
        }
        return i == n;`,
  },
  'longest-duplicate-substring': {
    python: `        n = len(s)
        best = ""
        for length in range(1, n):
            seen = set()
            found = None
            i = 0
            while i + length <= n:
                sub = s[i:i + length]
                if sub in seen:
                    if found is None or sub < found:
                        found = sub
                else:
                    seen.add(sub)
                i += 1
            if found is not None:
                best = found
        return best`,
    javascript: `    const n = s.length;
    let best = "";
    for (let len = 1; len <= n - 1; len++) {
        const seen = {};
        let found = null;
        for (let i = 0; i + len <= n; i++) {
            const sub = s.substring(i, i + len);
            if (seen[sub]) { if (found === null || sub < found) found = sub; }
            else seen[sub] = true;
        }
        if (found !== null) best = found;
    }
    return best;`,
    cpp: `        int n = s.size();
        string best = "";
        for (int len = 1; len <= n - 1; len++) {
            unordered_set<string> seen;
            bool has = false; string found;
            for (int i = 0; i + len <= n; i++) {
                string sub = s.substr(i, len);
                if (seen.count(sub)) { if (!has || sub < found) { found = sub; has = true; } }
                else seen.insert(sub);
            }
            if (has) best = found;
        }
        return best;`,
    java: `        int n = s.length();
        String best = "";
        for (int len = 1; len <= n - 1; len++) {
            Set<String> seen = new HashSet<>();
            String found = null;
            for (int i = 0; i + len <= n; i++) {
                String sub = s.substring(i, i + len);
                if (seen.contains(sub)) { if (found == null || sub.compareTo(found) < 0) found = sub; }
                else seen.add(sub);
            }
            if (found != null) best = found;
        }
        return best;`,
  },
  'count-different-palindromic-subsequences': {
    python: `        MOD = 1000000007
        n = len(s)
        if n == 0:
            return 0
        dp = [[0] * n for _ in range(n)]
        for i in range(n):
            dp[i][i] = 1
        for length in range(2, n + 1):
            for i in range(0, n - length + 1):
                j = i + length - 1
                if s[i] != s[j]:
                    dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1]
                else:
                    lo = i + 1
                    hi = j - 1
                    while lo <= hi and s[lo] != s[i]:
                        lo += 1
                    while lo <= hi and s[hi] != s[i]:
                        hi -= 1
                    if lo > hi:
                        dp[i][j] = dp[i + 1][j - 1] * 2 + 2
                    elif lo == hi:
                        dp[i][j] = dp[i + 1][j - 1] * 2 + 1
                    else:
                        dp[i][j] = dp[i + 1][j - 1] * 2 - dp[lo + 1][hi - 1]
                dp[i][j] = ((dp[i][j] % MOD) + MOD) % MOD
        return dp[0][n - 1]`,
    javascript: `    const MOD = 1000000007;
    const n = s.length;
    if (n === 0) return 0;
    const dp = Array.from({length: n}, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) dp[i][i] = 1;
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i + len - 1 < n; i++) {
            const j = i + len - 1;
            if (s[i] !== s[j]) {
                dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1];
            } else {
                let lo = i + 1, hi = j - 1;
                while (lo <= hi && s[lo] !== s[i]) lo++;
                while (lo <= hi && s[hi] !== s[i]) hi--;
                if (lo > hi) dp[i][j] = dp[i + 1][j - 1] * 2 + 2;
                else if (lo === hi) dp[i][j] = dp[i + 1][j - 1] * 2 + 1;
                else dp[i][j] = dp[i + 1][j - 1] * 2 - dp[lo + 1][hi - 1];
            }
            dp[i][j] = ((dp[i][j] % MOD) + MOD) % MOD;
        }
    }
    return dp[0][n - 1];`,
    cpp: `        const long long MOD = 1000000007;
        int n = s.size();
        if (n == 0) return 0;
        vector<vector<long long>> dp(n, vector<long long>(n, 0));
        for (int i = 0; i < n; i++) dp[i][i] = 1;
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                if (s[i] != s[j]) {
                    dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1];
                } else {
                    int lo = i + 1, hi = j - 1;
                    while (lo <= hi && s[lo] != s[i]) lo++;
                    while (lo <= hi && s[hi] != s[i]) hi--;
                    if (lo > hi) dp[i][j] = dp[i + 1][j - 1] * 2 + 2;
                    else if (lo == hi) dp[i][j] = dp[i + 1][j - 1] * 2 + 1;
                    else dp[i][j] = dp[i + 1][j - 1] * 2 - dp[lo + 1][hi - 1];
                }
                dp[i][j] = ((dp[i][j] % MOD) + MOD) % MOD;
            }
        }
        return (int) dp[0][n - 1];`,
    java: `        final long MOD = 1000000007L;
        int n = s.length();
        if (n == 0) return 0;
        long[][] dp = new long[n][n];
        for (int i = 0; i < n; i++) dp[i][i] = 1;
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                if (s.charAt(i) != s.charAt(j)) {
                    dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1];
                } else {
                    int lo = i + 1, hi = j - 1;
                    while (lo <= hi && s.charAt(lo) != s.charAt(i)) lo++;
                    while (lo <= hi && s.charAt(hi) != s.charAt(i)) hi--;
                    if (lo > hi) dp[i][j] = dp[i + 1][j - 1] * 2 + 2;
                    else if (lo == hi) dp[i][j] = dp[i + 1][j - 1] * 2 + 1;
                    else dp[i][j] = dp[i + 1][j - 1] * 2 - dp[lo + 1][hi - 1];
                }
                dp[i][j] = ((dp[i][j] % MOD) + MOD) % MOD;
            }
        }
        return (int) dp[0][n - 1];`,
  },
  'distinct-echo-substrings': {
    python: `        n = len(s)
        seen = set()
        for i in range(n):
            length = 1
            while i + 2 * length <= n:
                a = s[i:i + length]
                b = s[i + length:i + 2 * length]
                if a == b:
                    seen.add(a)
                length += 1
        return len(seen)`,
    javascript: `    const n = s.length;
    const seen = new Set();
    for (let i = 0; i < n; i++) {
        for (let len = 1; i + 2 * len <= n; len++) {
            const a = s.substring(i, i + len);
            const b = s.substring(i + len, i + 2 * len);
            if (a === b) seen.add(a);
        }
    }
    return seen.size;`,
    cpp: `        int n = s.size();
        unordered_set<string> seen;
        for (int i = 0; i < n; i++) {
            for (int len = 1; i + 2 * len <= n; len++) {
                string a = s.substr(i, len);
                string b = s.substr(i + len, len);
                if (a == b) seen.insert(a);
            }
        }
        return (int) seen.size();`,
    java: `        int n = s.length();
        Set<String> seen = new HashSet<>();
        for (int i = 0; i < n; i++) {
            for (int len = 1; i + 2 * len <= n; len++) {
                String a = s.substring(i, i + len);
                String b = s.substring(i + len, i + 2 * len);
                if (a.equals(b)) seen.add(a);
            }
        }
        return seen.size();`,
  },
  'encode-string-with-shortest-length': {
    python: `        n = len(s)
        if n == 0:
            return ""
        def better(a, b):
            if len(a) != len(b):
                return a if len(a) < len(b) else b
            return a if a <= b else b
        dp = [[None] * n for _ in range(n)]
        for length in range(1, n + 1):
            for i in range(0, n - length + 1):
                j = i + length - 1
                sub = s[i:j + 1]
                best = sub
                for k in range(i, j):
                    best = better(best, dp[i][k] + dp[k + 1][j])
                rep = (sub + sub).find(sub, 1)
                if rep < len(sub):
                    unit_len = rep
                    times = len(sub) // unit_len
                    best = better(best, str(times) + '[' + dp[i][i + unit_len - 1] + ']')
                dp[i][j] = best
        return dp[0][n - 1]`,
    javascript: `    const n = s.length;
    if (n === 0) return "";
    const better = (a, b) => { if (a.length !== b.length) return a.length < b.length ? a : b; return a <= b ? a : b; };
    const dp = Array.from({length: n}, () => new Array(n));
    for (let len = 1; len <= n; len++) {
        for (let i = 0; i + len - 1 < n; i++) {
            const j = i + len - 1, sub = s.substring(i, j + 1);
            let best = sub;
            for (let k = i; k < j; k++) best = better(best, dp[i][k] + dp[k + 1][j]);
            const rep = (sub + sub).indexOf(sub, 1);
            if (rep < sub.length) {
                const unitLen = rep, times = sub.length / unitLen;
                best = better(best, times + '[' + dp[i][i + unitLen - 1] + ']');
            }
            dp[i][j] = best;
        }
    }
    return dp[0][n - 1];`,
    cpp: `        int n = s.size();
        if (n == 0) return "";
        auto better = [](const string& a, const string& b) -> string {
            if (a.size() != b.size()) return a.size() < b.size() ? a : b;
            return a <= b ? a : b;
        };
        vector<vector<string>> dp(n, vector<string>(n));
        for (int len = 1; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                string sub = s.substr(i, len);
                string best = sub;
                for (int k = i; k < j; k++) best = better(best, dp[i][k] + dp[k + 1][j]);
                string dbl = sub + sub;
                int rep = (int) dbl.find(sub, 1);
                if (rep < (int)sub.size()) {
                    int unitLen = rep, times = sub.size() / unitLen;
                    best = better(best, to_string(times) + "[" + dp[i][i + unitLen - 1] + "]");
                }
                dp[i][j] = best;
            }
        }
        return dp[0][n - 1];`,
    java: `        int n = s.length();
        if (n == 0) return "";
        String[][] dp = new String[n][n];
        for (int len = 1; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                String sub = s.substring(i, j + 1);
                String best = sub;
                for (int k = i; k < j; k++) best = better(best, dp[i][k] + dp[k + 1][j]);
                String dbl = sub + sub;
                int rep = dbl.indexOf(sub, 1);
                if (rep < sub.length()) {
                    int unitLen = rep, times = sub.length() / unitLen;
                    best = better(best, times + "[" + dp[i][i + unitLen - 1] + "]");
                }
                dp[i][j] = best;
            }
        }
        return dp[0][n - 1];
    }
    private String better(String a, String b) {
        if (a.length() != b.length()) return a.length() < b.length() ? a : b;
        return a.compareTo(b) <= 0 ? a : b;`,
  },
  'number-of-atoms': {
    python: `        i = 0
        n = len(s)
        stack = [{}]
        while i < n:
            c = s[i]
            if c == '(':
                i += 1
                stack.append({})
            elif c == ')':
                i += 1
                start = i
                while i < n and s[i].isdigit():
                    i += 1
                mult = int(s[start:i]) if start < i else 1
                top = stack.pop()
                cur = stack[-1]
                for key, val in top.items():
                    cur[key] = cur.get(key, 0) + val * mult
            else:
                st2 = i
                i += 1
                while i < n and s[i].islower():
                    i += 1
                name = s[st2:i]
                ds = i
                while i < n and s[i].isdigit():
                    i += 1
                cnt = int(s[ds:i]) if ds < i else 1
                m = stack[-1]
                m[name] = m.get(name, 0) + cnt
        m = stack[0]
        res = []
        for key in sorted(m.keys()):
            res.append(key)
            if m[key] > 1:
                res.append(str(m[key]))
        return ''.join(res)`,
    javascript: `    let i = 0;
    const n = s.length;
    const isDigit = (c) => c >= '0' && c <= '9';
    const isLower = (c) => c >= 'a' && c <= 'z';
    const stack = [{}];
    while (i < n) {
        const c = s[i];
        if (c === '(') { i++; stack.push({}); }
        else if (c === ')') {
            i++;
            let start = i;
            while (i < n && isDigit(s[i])) i++;
            const mult = start < i ? parseInt(s.substring(start, i), 10) : 1;
            const top = stack.pop(), cur = stack[stack.length - 1];
            for (const key in top) cur[key] = (cur[key] || 0) + top[key] * mult;
        } else {
            let st2 = i; i++;
            while (i < n && isLower(s[i])) i++;
            const name = s.substring(st2, i);
            let ds = i;
            while (i < n && isDigit(s[i])) i++;
            const cnt = ds < i ? parseInt(s.substring(ds, i), 10) : 1;
            const m = stack[stack.length - 1];
            m[name] = (m[name] || 0) + cnt;
        }
    }
    const map = stack[0];
    const keys = Object.keys(map).sort();
    let res = "";
    for (const key of keys) { res += key; if (map[key] > 1) res += map[key]; }
    return res;`,
    cpp: `        int i = 0, n = s.size();
        vector<map<string,long long>> stk;
        stk.push_back(map<string,long long>());
        while (i < n) {
            char c = s[i];
            if (c == '(') { i++; stk.push_back(map<string,long long>()); }
            else if (c == ')') {
                i++;
                int start = i;
                while (i < n && isdigit((unsigned char)s[i])) i++;
                long long mult = start < i ? stoll(s.substr(start, i - start)) : 1;
                map<string,long long> top = stk.back(); stk.pop_back();
                for (auto& pr : top) stk.back()[pr.first] += pr.second * mult;
            } else {
                int st2 = i; i++;
                while (i < n && islower((unsigned char)s[i])) i++;
                string name = s.substr(st2, i - st2);
                int ds = i;
                while (i < n && isdigit((unsigned char)s[i])) i++;
                long long cnt = ds < i ? stoll(s.substr(ds, i - ds)) : 1;
                stk.back()[name] += cnt;
            }
        }
        string res = "";
        for (auto& pr : stk[0]) { res += pr.first; if (pr.second > 1) res += to_string(pr.second); }
        return res;`,
    java: `        int i = 0, n = s.length();
        Deque<Map<String,Long>> stack = new ArrayDeque<>();
        stack.push(new HashMap<>());
        while (i < n) {
            char c = s.charAt(i);
            if (c == '(') { i++; stack.push(new HashMap<>()); }
            else if (c == ')') {
                i++;
                int start = i;
                while (i < n && Character.isDigit(s.charAt(i))) i++;
                long mult = start < i ? Long.parseLong(s.substring(start, i)) : 1;
                Map<String,Long> top = stack.pop();
                Map<String,Long> cur = stack.peek();
                for (Map.Entry<String,Long> e : top.entrySet()) cur.put(e.getKey(), cur.getOrDefault(e.getKey(), 0L) + e.getValue() * mult);
            } else {
                int st2 = i; i++;
                while (i < n && Character.isLowerCase(s.charAt(i))) i++;
                String name = s.substring(st2, i);
                int ds = i;
                while (i < n && Character.isDigit(s.charAt(i))) i++;
                long cnt = ds < i ? Long.parseLong(s.substring(ds, i)) : 1;
                Map<String,Long> m = stack.peek();
                m.put(name, m.getOrDefault(name, 0L) + cnt);
            }
        }
        TreeMap<String,Long> sorted = new TreeMap<>(stack.peek());
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String,Long> e : sorted.entrySet()) { sb.append(e.getKey()); if (e.getValue() > 1) sb.append(e.getValue()); }
        return sb.toString();`,
  },
};

module.exports = { SOL };
