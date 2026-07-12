// Batch Q: solutions for batch 23 (strings & string two-pointers).
const SOL = {
  'reverse-string': {
    python: `        return s[::-1]`,
    java: `        return new StringBuilder(s).reverse().toString();`,
    cpp: `        reverse(s.begin(), s.end());
        return s;`,
    javascript: `    return s.split('').reverse().join('');`,
  },
  'reverse-vowels-of-a-string': {
    python: `        v = set("aeiouAEIOU")
        a = list(s)
        l, r = 0, len(a) - 1
        while l < r:
            if a[l] not in v:
                l += 1
            elif a[r] not in v:
                r -= 1
            else:
                a[l], a[r] = a[r], a[l]
                l += 1
                r -= 1
        return "".join(a)`,
    java: `        String v = "aeiouAEIOU";
        char[] a = s.toCharArray();
        int l = 0, r = a.length - 1;
        while (l < r) {
            if (v.indexOf(a[l]) < 0) l++;
            else if (v.indexOf(a[r]) < 0) r--;
            else { char t = a[l]; a[l] = a[r]; a[r] = t; l++; r--; }
        }
        return new String(a);`,
    cpp: `        string v = "aeiouAEIOU";
        int l = 0, r = (int)s.size() - 1;
        while (l < r) {
            if (v.find(s[l]) == string::npos) l++;
            else if (v.find(s[r]) == string::npos) r--;
            else { swap(s[l], s[r]); l++; r--; }
        }
        return s;`,
    javascript: `    const v = "aeiouAEIOU";
    const a = s.split('');
    let l = 0, r = a.length - 1;
    while (l < r) {
        if (v.indexOf(a[l]) < 0) l++;
        else if (v.indexOf(a[r]) < 0) r--;
        else { const t = a[l]; a[l] = a[r]; a[r] = t; l++; r--; }
    }
    return a.join('');`,
  },
  'reverse-words-in-a-string': {
    python: `        return " ".join(reversed(s.split()))`,
    java: `        String[] parts = s.trim().split("\\\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = parts.length - 1; i >= 0; i--) {
            if (parts[i].isEmpty()) continue;
            if (sb.length() > 0) sb.append(' ');
            sb.append(parts[i]);
        }
        return sb.toString();`,
    cpp: `        vector<string> words;
        stringstream ss(s);
        string w;
        while (ss >> w) words.push_back(w);
        string res;
        for (int i = (int)words.size() - 1; i >= 0; i--) {
            if (!res.empty()) res += " ";
            res += words[i];
        }
        return res;`,
    javascript: `    return s.split(/\\s+/).filter(x => x.length).reverse().join(' ');`,
  },
  'reverse-words-in-a-string-iii': {
    python: `        return " ".join(w[::-1] for w in s.split(" "))`,
    java: `        String[] parts = s.split(" ");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < parts.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(new StringBuilder(parts[i]).reverse());
        }
        return sb.toString();`,
    cpp: `        stringstream ss(s);
        string w, res;
        bool first = true;
        while (ss >> w) {
            reverse(w.begin(), w.end());
            if (!first) res += " ";
            res += w;
            first = false;
        }
        return res;`,
    javascript: `    return s.split(' ').map(w => w.split('').reverse().join('')).join(' ');`,
  },
  'valid-palindrome-ii': {
    python: `        def isPal(i, j):
            while i < j:
                if s[i] != s[j]:
                    return False
                i += 1
                j -= 1
            return True
        i, j = 0, len(s) - 1
        while i < j:
            if s[i] != s[j]:
                return isPal(i + 1, j) or isPal(i, j - 1)
            i += 1
            j -= 1
        return True`,
    java: `        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) return isPal(s, i + 1, j) || isPal(s, i, j - 1);
            i++; j--;
        }
        return true;
    }
    boolean isPal(String s, int i, int j) {
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) return false;
            i++; j--;
        }
        return true;`,
    cpp: `        auto isPal = [&](int i, int j) {
            while (i < j) { if (s[i] != s[j]) return false; i++; j--; }
            return true;
        };
        int i = 0, j = (int)s.size() - 1;
        while (i < j) {
            if (s[i] != s[j]) return isPal(i + 1, j) || isPal(i, j - 1);
            i++; j--;
        }
        return true;`,
    javascript: `    const isPal = (i, j) => {
        while (i < j) { if (s[i] !== s[j]) return false; i++; j--; }
        return true;
    };
    let i = 0, j = s.length - 1;
    while (i < j) {
        if (s[i] !== s[j]) return isPal(i + 1, j) || isPal(i, j - 1);
        i++; j--;
    }
    return true;`,
  },
  'backspace-string-compare': {
    python: `        def build(x):
            st = []
            for c in x:
                if c == "#":
                    if st: st.pop()
                else:
                    st.append(c)
            return "".join(st)
        return build(s) == build(t)`,
    java: `        return build(s).equals(build(t));
    }
    String build(String x) {
        StringBuilder sb = new StringBuilder();
        for (char c : x.toCharArray()) {
            if (c == '#') { if (sb.length() > 0) sb.deleteCharAt(sb.length() - 1); }
            else sb.append(c);
        }
        return sb.toString();`,
    cpp: `        auto build = [](string x) {
            string st;
            for (char c : x) {
                if (c == '#') { if (!st.empty()) st.pop_back(); }
                else st.push_back(c);
            }
            return st;
        };
        return build(s) == build(t);`,
    javascript: `    const build = (x) => {
        const st = [];
        for (const c of x) {
            if (c === '#') { if (st.length) st.pop(); }
            else st.push(c);
        }
        return st.join('');
    };
    return build(s) === build(t);`,
  },
  'remove-all-adjacent-duplicates-in-string': {
    python: `        st = []
        for c in s:
            if st and st[-1] == c:
                st.pop()
            else:
                st.append(c)
        return "".join(st)`,
    java: `        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (sb.length() > 0 && sb.charAt(sb.length() - 1) == c) sb.deleteCharAt(sb.length() - 1);
            else sb.append(c);
        }
        return sb.toString();`,
    cpp: `        string st;
        for (char c : s) {
            if (!st.empty() && st.back() == c) st.pop_back();
            else st.push_back(c);
        }
        return st;`,
    javascript: `    const st = [];
    for (const c of s) {
        if (st.length && st[st.length - 1] === c) st.pop();
        else st.push(c);
    }
    return st.join('');`,
  },
  'add-strings': {
    python: `        i, j, carry = len(s) - 1, len(t) - 1, 0
        res = []
        while i >= 0 or j >= 0 or carry:
            d = carry
            if i >= 0:
                d += ord(s[i]) - 48
                i -= 1
            if j >= 0:
                d += ord(t[j]) - 48
                j -= 1
            res.append(chr(d % 10 + 48))
            carry = d // 10
        return "".join(reversed(res))`,
    java: `        StringBuilder sb = new StringBuilder();
        int i = s.length() - 1, j = t.length() - 1, carry = 0;
        while (i >= 0 || j >= 0 || carry > 0) {
            int d = carry;
            if (i >= 0) d += s.charAt(i--) - '0';
            if (j >= 0) d += t.charAt(j--) - '0';
            sb.append((char) (d % 10 + '0'));
            carry = d / 10;
        }
        return sb.reverse().toString();`,
    cpp: `        string res;
        int i = (int)s.size() - 1, j = (int)t.size() - 1, carry = 0;
        while (i >= 0 || j >= 0 || carry > 0) {
            int d = carry;
            if (i >= 0) d += s[i--] - '0';
            if (j >= 0) d += t[j--] - '0';
            res += char(d % 10 + '0');
            carry = d / 10;
        }
        reverse(res.begin(), res.end());
        return res;`,
    javascript: `    let i = s.length - 1, j = t.length - 1, carry = 0, res = '';
    while (i >= 0 || j >= 0 || carry > 0) {
        let d = carry;
        if (i >= 0) d += s.charCodeAt(i--) - 48;
        if (j >= 0) d += t.charCodeAt(j--) - 48;
        res = String(d % 10) + res;
        carry = Math.floor(d / 10);
    }
    return res;`,
  },
  'make-the-string-great': {
    python: `        st = []
        for c in s:
            if st and st[-1] != c and st[-1].lower() == c.lower():
                st.pop()
            else:
                st.append(c)
        return "".join(st)`,
    java: `        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (sb.length() > 0) {
                char t = sb.charAt(sb.length() - 1);
                if (t != c && Character.toLowerCase(t) == Character.toLowerCase(c)) { sb.deleteCharAt(sb.length() - 1); continue; }
            }
            sb.append(c);
        }
        return sb.toString();`,
    cpp: `        string st;
        for (char c : s) {
            if (!st.empty() && st.back() != c && tolower(st.back()) == tolower(c)) st.pop_back();
            else st.push_back(c);
        }
        return st;`,
    javascript: `    const st = [];
    for (const c of s) {
        if (st.length && st[st.length - 1] !== c && st[st.length - 1].toLowerCase() === c.toLowerCase()) st.pop();
        else st.push(c);
    }
    return st.join('');`,
  },
  'removing-stars-from-a-string': {
    python: `        st = []
        for c in s:
            if c == "*":
                st.pop()
            else:
                st.append(c)
        return "".join(st)`,
    java: `        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (c == '*') sb.deleteCharAt(sb.length() - 1);
            else sb.append(c);
        }
        return sb.toString();`,
    cpp: `        string st;
        for (char c : s) {
            if (c == '*') st.pop_back();
            else st.push_back(c);
        }
        return st;`,
    javascript: `    const st = [];
    for (const c of s) {
        if (c === '*') st.pop();
        else st.push(c);
    }
    return st.join('');`,
  },
  'simplify-path': {
    python: `        st = []
        for part in s.split("/"):
            if part == "" or part == ".":
                continue
            if part == "..":
                if st: st.pop()
            else:
                st.append(part)
        return "/" + "/".join(st)`,
    java: `        Deque<String> st = new ArrayDeque<>();
        for (String part : s.split("/")) {
            if (part.isEmpty() || part.equals(".")) continue;
            if (part.equals("..")) { if (!st.isEmpty()) st.pollLast(); }
            else st.addLast(part);
        }
        StringBuilder sb = new StringBuilder();
        for (String p : st) sb.append('/').append(p);
        return sb.length() == 0 ? "/" : sb.toString();`,
    cpp: `        vector<string> st;
        stringstream ss(s);
        string part;
        while (getline(ss, part, '/')) {
            if (part.empty() || part == ".") continue;
            if (part == "..") { if (!st.empty()) st.pop_back(); }
            else st.push_back(part);
        }
        string res;
        for (auto& p : st) res += "/" + p;
        return res.empty() ? "/" : res;`,
    javascript: `    const st = [];
    for (const part of s.split('/')) {
        if (part === '' || part === '.') continue;
        if (part === '..') { if (st.length) st.pop(); }
        else st.push(part);
    }
    return '/' + st.join('/');`,
  },
  'decode-string': {
    python: `        st = []
        cur = ""
        num = 0
        for c in s:
            if c.isdigit():
                num = num * 10 + int(c)
            elif c == "[":
                st.append((cur, num))
                cur = ""
                num = 0
            elif c == "]":
                prev, k = st.pop()
                cur = prev + cur * k
            else:
                cur += c
        return cur`,
    java: `        Deque<String> strs = new ArrayDeque<>();
        Deque<Integer> nums = new ArrayDeque<>();
        StringBuilder cur = new StringBuilder();
        int num = 0;
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) num = num * 10 + (c - '0');
            else if (c == '[') { strs.push(cur.toString()); nums.push(num); cur = new StringBuilder(); num = 0; }
            else if (c == ']') {
                int k = nums.pop();
                StringBuilder tmp = new StringBuilder(strs.pop());
                for (int i = 0; i < k; i++) tmp.append(cur);
                cur = tmp;
            } else cur.append(c);
        }
        return cur.toString();`,
    cpp: `        vector<string> strs;
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
        return cur;`,
    javascript: `    const st = [];
    let cur = "", num = 0;
    for (const c of s) {
        if (c >= '0' && c <= '9') num = num * 10 + (+c);
        else if (c === '[') { st.push([cur, num]); cur = ""; num = 0; }
        else if (c === ']') { const [prev, k] = st.pop(); cur = prev + cur.repeat(k); }
        else cur += c;
    }
    return cur;`,
  },
  'minimum-add-to-make-parentheses-valid': {
    python: `        open_ = add = 0
        for c in s:
            if c == "(":
                open_ += 1
            elif open_ > 0:
                open_ -= 1
            else:
                add += 1
        return add + open_`,
    java: `        int open = 0, add = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') open++;
            else if (open > 0) open--;
            else add++;
        }
        return add + open;`,
    cpp: `        int open = 0, add = 0;
        for (char c : s) {
            if (c == '(') open++;
            else if (open > 0) open--;
            else add++;
        }
        return add + open;`,
    javascript: `    let open = 0, add = 0;
    for (const c of s) {
        if (c === '(') open++;
        else if (open > 0) open--;
        else add++;
    }
    return add + open;`,
  },
  'score-of-parentheses': {
    python: `        st = [0]
        for c in s:
            if c == "(":
                st.append(0)
            else:
                v = st.pop()
                st[-1] += max(2 * v, 1)
        return st[0]`,
    java: `        Deque<Integer> st = new ArrayDeque<>();
        st.push(0);
        for (char c : s.toCharArray()) {
            if (c == '(') st.push(0);
            else {
                int v = st.pop();
                st.push(st.pop() + Math.max(2 * v, 1));
            }
        }
        return st.peek();`,
    cpp: `        vector<int> st = {0};
        for (char c : s) {
            if (c == '(') st.push_back(0);
            else {
                int v = st.back(); st.pop_back();
                st.back() += max(2 * v, 1);
            }
        }
        return st[0];`,
    javascript: `    const st = [0];
    for (const c of s) {
        if (c === '(') st.push(0);
        else {
            const v = st.pop();
            st[st.length - 1] += Math.max(2 * v, 1);
        }
    }
    return st[0];`,
  },
  'baseball-game': {
    python: `        st = []
        for tok in s.split():
            if tok == "C":
                st.pop()
            elif tok == "D":
                st.append(2 * st[-1])
            elif tok == "+":
                st.append(st[-1] + st[-2])
            else:
                st.append(int(tok))
        return sum(st)`,
    java: `        Deque<Integer> st = new ArrayDeque<>();
        for (String tok : s.trim().split("\\\\s+")) {
            if (tok.equals("C")) st.pop();
            else if (tok.equals("D")) st.push(2 * st.peek());
            else if (tok.equals("+")) { int a = st.pop(); int b = a + st.peek(); st.push(a); st.push(b); }
            else st.push(Integer.parseInt(tok));
        }
        int sum = 0;
        for (int x : st) sum += x;
        return sum;`,
    cpp: `        vector<int> st;
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
        return sum;`,
    javascript: `    const st = [];
    for (const tok of s.split(/\\s+/).filter(x => x.length)) {
        if (tok === 'C') st.pop();
        else if (tok === 'D') st.push(2 * st[st.length - 1]);
        else if (tok === '+') st.push(st[st.length - 1] + st[st.length - 2]);
        else st.push(parseInt(tok, 10));
    }
    return st.reduce((a, b) => a + b, 0);`,
  },
  'find-the-index-of-the-first-occurrence-in-a-string': {
    python: `        n, m = len(s), len(t)
        for i in range(n - m + 1):
            if s[i:i+m] == t:
                return i
        return -1`,
    java: `        return s.indexOf(t);`,
    cpp: `        size_t pos = s.find(t);
        return pos == string::npos ? -1 : (int)pos;`,
    javascript: `    return s.indexOf(t);`,
  },
  'repeated-substring-pattern': {
    python: `        return s in (s + s)[1:-1]`,
    java: `        return (s + s).substring(1, 2 * s.length() - 1).contains(s);`,
    cpp: `        string d = s + s;
        return d.substr(1, d.size() - 2).find(s) != string::npos;`,
    javascript: `    return (s + s).slice(1, -1).indexOf(s) !== -1;`,
  },
  'detect-capital': {
    python: `        return s.isupper() or s.islower() or (s[0].isupper() and s[1:].islower())`,
    java: `        return s.equals(s.toUpperCase()) || s.equals(s.toLowerCase())
            || (Character.isUpperCase(s.charAt(0)) && s.substring(1).equals(s.substring(1).toLowerCase()));`,
    cpp: `        auto isUpper = [](const string& x) { for (char c : x) if (!isupper((unsigned char)c)) return false; return true; };
        auto isLower = [](const string& x) { for (char c : x) if (!islower((unsigned char)c)) return false; return true; };
        if (isUpper(s) || isLower(s)) return true;
        return isupper((unsigned char)s[0]) && isLower(s.substr(1));`,
    javascript: `    const allUp = s === s.toUpperCase();
    const allLow = s === s.toLowerCase();
    const title = s[0] === s[0].toUpperCase() && s.slice(1) === s.slice(1).toLowerCase();
    return allUp || allLow || title;`,
  },
};
module.exports = { SOL };
