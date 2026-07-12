// Batch M: solutions for the additional famous problems (batch 16).
const SOL = {
  'remove-duplicates-from-sorted-array': {
    python: `        k = 0
        for x in nums:
            if k == 0 or x != nums[k - 1]:
                nums[k] = x
                k += 1
        return k`,
    java: `        int k = 0;
        for (int x : nums) {
            if (k == 0 || x != nums[k - 1]) { nums[k] = x; k++; }
        }
        return k;`,
    cpp: `        int k = 0;
        for (int x : nums) {
            if (k == 0 || x != nums[k - 1]) { nums[k] = x; k++; }
        }
        return k;`,
    javascript: `    let k = 0;
    for (const x of nums) {
        if (k === 0 || x !== nums[k - 1]) { nums[k] = x; k++; }
    }
    return k;`,
  },
  'best-time-to-buy-and-sell-stock-ii': {
    python: `        profit = 0
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]:
                profit += nums[i] - nums[i - 1]
        return profit`,
    java: `        int profit = 0;
        for (int i = 1; i < nums.length; i++)
            if (nums[i] > nums[i - 1]) profit += nums[i] - nums[i - 1];
        return profit;`,
    cpp: `        int profit = 0;
        for (int i = 1; i < (int)nums.size(); i++)
            if (nums[i] > nums[i - 1]) profit += nums[i] - nums[i - 1];
        return profit;`,
    javascript: `    let profit = 0;
    for (let i = 1; i < nums.length; i++)
        if (nums[i] > nums[i - 1]) profit += nums[i] - nums[i - 1];
    return profit;`,
  },
  'h-index': {
    python: `        nums.sort(reverse=True)
        h = 0
        for i, c in enumerate(nums):
            if c >= i + 1:
                h = i + 1
            else:
                break
        return h`,
    java: `        Arrays.sort(nums);
        int n = nums.length, h = 0;
        for (int i = 0; i < n; i++) {
            int c = nums[n - 1 - i];
            if (c >= i + 1) h = i + 1; else break;
        }
        return h;`,
    cpp: `        sort(nums.begin(), nums.end());
        int n = (int)nums.size(), h = 0;
        for (int i = 0; i < n; i++) {
            int c = nums[n - 1 - i];
            if (c >= i + 1) h = i + 1; else break;
        }
        return h;`,
    javascript: `    nums.sort((a, b) => b - a);
    let h = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] >= i + 1) h = i + 1; else break;
    }
    return h;`,
  },
  'candy': {
    python: `        n = len(nums)
        c = [1] * n
        for i in range(1, n):
            if nums[i] > nums[i - 1]:
                c[i] = c[i - 1] + 1
        for i in range(n - 2, -1, -1):
            if nums[i] > nums[i + 1]:
                c[i] = max(c[i], c[i + 1] + 1)
        return sum(c)`,
    java: `        int n = nums.length;
        int[] c = new int[n];
        Arrays.fill(c, 1);
        for (int i = 1; i < n; i++) if (nums[i] > nums[i - 1]) c[i] = c[i - 1] + 1;
        for (int i = n - 2; i >= 0; i--) if (nums[i] > nums[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);
        int total = 0;
        for (int x : c) total += x;
        return total;`,
    cpp: `        int n = (int)nums.size();
        vector<int> c(n, 1);
        for (int i = 1; i < n; i++) if (nums[i] > nums[i - 1]) c[i] = c[i - 1] + 1;
        for (int i = n - 2; i >= 0; i--) if (nums[i] > nums[i + 1]) c[i] = max(c[i], c[i + 1] + 1);
        int total = 0;
        for (int x : c) total += x;
        return total;`,
    javascript: `    const n = nums.length;
    const c = new Array(n).fill(1);
    for (let i = 1; i < n; i++) if (nums[i] > nums[i - 1]) c[i] = c[i - 1] + 1;
    for (let i = n - 2; i >= 0; i--) if (nums[i] > nums[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);
    return c.reduce((s, x) => s + x, 0);`,
  },
  'sort-colors': {
    python: `        lo, mid, hi = 0, 0, len(nums) - 1
        while mid <= hi:
            if nums[mid] == 0:
                nums[lo], nums[mid] = nums[mid], nums[lo]
                lo += 1; mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[hi] = nums[hi], nums[mid]
                hi -= 1
        return nums`,
    java: `        int lo = 0, mid = 0, hi = nums.length - 1;
        while (mid <= hi) {
            if (nums[mid] == 0) { int t = nums[lo]; nums[lo] = nums[mid]; nums[mid] = t; lo++; mid++; }
            else if (nums[mid] == 1) mid++;
            else { int t = nums[mid]; nums[mid] = nums[hi]; nums[hi] = t; hi--; }
        }
        return nums;`,
    cpp: `        int lo = 0, mid = 0, hi = (int)nums.size() - 1;
        while (mid <= hi) {
            if (nums[mid] == 0) { swap(nums[lo], nums[mid]); lo++; mid++; }
            else if (nums[mid] == 1) mid++;
            else { swap(nums[mid], nums[hi]); hi--; }
        }
        return nums;`,
    javascript: `    let lo = 0, mid = 0, hi = nums.length - 1;
    while (mid <= hi) {
        if (nums[mid] === 0) { const t = nums[lo]; nums[lo] = nums[mid]; nums[mid] = t; lo++; mid++; }
        else if (nums[mid] === 1) mid++;
        else { const t = nums[mid]; nums[mid] = nums[hi]; nums[hi] = t; hi--; }
    }
    return nums;`,
  },
  'find-all-numbers-disappeared-in-an-array': {
    python: `        seen = set(nums)
        return [x for x in range(1, len(nums) + 1) if x not in seen]`,
    java: `        int n = nums.length;
        boolean[] seen = new boolean[n + 1];
        for (int x : nums) seen[x] = true;
        List<Integer> res = new ArrayList<>();
        for (int x = 1; x <= n; x++) if (!seen[x]) res.add(x);
        int[] r = new int[res.size()];
        for (int i = 0; i < r.length; i++) r[i] = res.get(i);
        return r;`,
    cpp: `        int n = (int)nums.size();
        vector<bool> seen(n + 1, false);
        for (int x : nums) seen[x] = true;
        vector<int> r;
        for (int x = 1; x <= n; x++) if (!seen[x]) r.push_back(x);
        return r;`,
    javascript: `    const n = nums.length, seen = new Array(n + 1).fill(false);
    for (const x of nums) seen[x] = true;
    const r = [];
    for (let x = 1; x <= n; x++) if (!seen[x]) r.push(x);
    return r;`,
  },
  'next-permutation': {
    python: `        i = len(nums) - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1
        if i >= 0:
            j = len(nums) - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        nums[i + 1:] = reversed(nums[i + 1:])
        return nums`,
    java: `        int n = nums.length, i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) j--;
            int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
        }
        int lo = i + 1, hi = n - 1;
        while (lo < hi) { int t = nums[lo]; nums[lo] = nums[hi]; nums[hi] = t; lo++; hi--; }
        return nums;`,
    cpp: `        int n = (int)nums.size(), i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) j--;
            swap(nums[i], nums[j]);
        }
        reverse(nums.begin() + i + 1, nums.end());
        return nums;`,
    javascript: `    const n = nums.length;
    let i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        let j = n - 1;
        while (nums[j] <= nums[i]) j--;
        const t = nums[i]; nums[i] = nums[j]; nums[j] = t;
    }
    let lo = i + 1, hi = n - 1;
    while (lo < hi) { const t = nums[lo]; nums[lo] = nums[hi]; nums[hi] = t; lo++; hi--; }
    return nums;`,
  },
  'roman-to-integer': {
    python: `        val = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
        total = 0
        for i in range(len(s)):
            if i + 1 < len(s) and val[s[i]] < val[s[i + 1]]:
                total -= val[s[i]]
            else:
                total += val[s[i]]
        return total`,
    java: `        Map<Character,Integer> val = new HashMap<>();
        val.put('I',1); val.put('V',5); val.put('X',10); val.put('L',50); val.put('C',100); val.put('D',500); val.put('M',1000);
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            if (i + 1 < s.length() && val.get(s.charAt(i)) < val.get(s.charAt(i + 1))) total -= val.get(s.charAt(i));
            else total += val.get(s.charAt(i));
        }
        return total;`,
    cpp: `        unordered_map<char,int> val = {{'I',1},{'V',5},{'X',10},{'L',50},{'C',100},{'D',500},{'M',1000}};
        int total = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            if (i + 1 < (int)s.size() && val[s[i]] < val[s[i + 1]]) total -= val[s[i]];
            else total += val[s[i]];
        }
        return total;`,
    javascript: `    const val = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let total = 0;
    for (let i = 0; i < s.length; i++) {
        if (i + 1 < s.length && val[s[i]] < val[s[i + 1]]) total -= val[s[i]];
        else total += val[s[i]];
    }
    return total;`,
  },
  'length-of-last-word': {
    python: `        i = len(s) - 1
        while i >= 0 and s[i] == ' ':
            i -= 1
        length = 0
        while i >= 0 and s[i] != ' ':
            length += 1
            i -= 1
        return length`,
    java: `        int i = s.length() - 1;
        while (i >= 0 && s.charAt(i) == ' ') i--;
        int length = 0;
        while (i >= 0 && s.charAt(i) != ' ') { length++; i--; }
        return length;`,
    cpp: `        int i = (int)s.size() - 1;
        while (i >= 0 && s[i] == ' ') i--;
        int length = 0;
        while (i >= 0 && s[i] != ' ') { length++; i--; }
        return length;`,
    javascript: `    let i = s.length - 1;
    while (i >= 0 && s[i] === ' ') i--;
    let length = 0;
    while (i >= 0 && s[i] !== ' ') { length++; i--; }
    return length;`,
  },
  'longest-palindrome': {
    python: `        from collections import Counter
        length = 0
        odd = False
        for v in Counter(s).values():
            length += (v // 2) * 2
            if v % 2:
                odd = True
        return length + (1 if odd else 0)`,
    java: `        Map<Character,Integer> f = new HashMap<>();
        for (char c : s.toCharArray()) f.merge(c, 1, Integer::sum);
        int length = 0; boolean odd = false;
        for (int v : f.values()) { length += (v / 2) * 2; if (v % 2 == 1) odd = true; }
        return length + (odd ? 1 : 0);`,
    cpp: `        unordered_map<char,int> f;
        for (char c : s) f[c]++;
        int length = 0; bool odd = false;
        for (auto& kv : f) { length += (kv.second / 2) * 2; if (kv.second % 2) odd = true; }
        return length + (odd ? 1 : 0);`,
    javascript: `    const f = {};
    for (const c of s) f[c] = (f[c] || 0) + 1;
    let length = 0, odd = false;
    for (const k in f) { length += Math.floor(f[k] / 2) * 2; if (f[k] % 2) odd = true; }
    return length + (odd ? 1 : 0);`,
  },
  'ransom-note': {
    python: `        have = {}
        for c in t:
            have[c] = have.get(c, 0) + 1
        for c in s:
            if have.get(c, 0) <= 0:
                return False
            have[c] -= 1
        return True`,
    java: `        int[] have = new int[128];
        for (char c : t.toCharArray()) have[c]++;
        for (char c : s.toCharArray()) { if (have[c] <= 0) return false; have[c]--; }
        return true;`,
    cpp: `        int have[128] = {0};
        for (char c : t) have[(int)c]++;
        for (char c : s) { if (have[(int)c] <= 0) return false; have[(int)c]--; }
        return true;`,
    javascript: `    const have = {};
    for (const c of t) have[c] = (have[c] || 0) + 1;
    for (const c of s) { if (!have[c]) return false; have[c]--; }
    return true;`,
  },
  'isomorphic-strings': {
    python: `        if len(s) != len(t):
            return False
        st, ts = {}, {}
        for a, b in zip(s, t):
            if a in st and st[a] != b:
                return False
            if b in ts and ts[b] != a:
                return False
            st[a] = b
            ts[b] = a
        return True`,
    java: `        if (s.length() != t.length()) return false;
        Map<Character,Character> st = new HashMap<>(), ts = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char a = s.charAt(i), b = t.charAt(i);
            if (st.containsKey(a) && st.get(a) != b) return false;
            if (ts.containsKey(b) && ts.get(b) != a) return false;
            st.put(a, b); ts.put(b, a);
        }
        return true;`,
    cpp: `        if (s.size() != t.size()) return false;
        unordered_map<char,char> st, ts;
        for (int i = 0; i < (int)s.size(); i++) {
            char a = s[i], b = t[i];
            if (st.count(a) && st[a] != b) return false;
            if (ts.count(b) && ts[b] != a) return false;
            st[a] = b; ts[b] = a;
        }
        return true;`,
    javascript: `    if (s.length !== t.length) return false;
    const st = {}, ts = {};
    for (let i = 0; i < s.length; i++) {
        const a = s[i], b = t[i];
        if (st[a] !== undefined && st[a] !== b) return false;
        if (ts[b] !== undefined && ts[b] !== a) return false;
        st[a] = b; ts[b] = a;
    }
    return true;`,
  },
};
module.exports = { SOL };
