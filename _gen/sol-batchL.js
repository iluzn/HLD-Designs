// Batch L: multi-language solutions for the original problems that previously
// only had a Python editorial. Bodies fill into each language stub.
const SOL = {
  'two-sum': {
    python: `        seen = {}
        for i, x in enumerate(nums):
            if target - x in seen:
                return [seen[target - x], i]
            seen[x] = i
        return []`,
    java: `        Map<Integer,Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (seen.containsKey(target - nums[i])) return new int[]{seen.get(target - nums[i]), i};
            seen.put(nums[i], i);
        }
        return new int[]{};`,
    cpp: `        unordered_map<int,int> seen;
        for (int i = 0; i < (int)nums.size(); i++) {
            if (seen.count(target - nums[i])) return {seen[target - nums[i]], i};
            seen[nums[i]] = i;
        }
        return {};`,
    javascript: `    const seen = {};
    for (let i = 0; i < nums.length; i++) {
        if ((target - nums[i]) in seen) return [seen[target - nums[i]], i];
        seen[nums[i]] = i;
    }
    return [];`,
  },
  'two-sum-ii': {
    python: `        lo, hi = 0, len(numbers) - 1
        while lo < hi:
            s = numbers[lo] + numbers[hi]
            if s == target:
                return [lo + 1, hi + 1]
            if s < target:
                lo += 1
            else:
                hi -= 1
        return []`,
    java: `        int lo = 0, hi = numbers.length - 1;
        while (lo < hi) {
            int s = numbers[lo] + numbers[hi];
            if (s == target) return new int[]{lo + 1, hi + 1};
            if (s < target) lo++; else hi--;
        }
        return new int[]{};`,
    cpp: `        int lo = 0, hi = (int)numbers.size() - 1;
        while (lo < hi) {
            int s = numbers[lo] + numbers[hi];
            if (s == target) return {lo + 1, hi + 1};
            if (s < target) lo++; else hi--;
        }
        return {};`,
    javascript: `    let lo = 0, hi = numbers.length - 1;
    while (lo < hi) {
        const s = numbers[lo] + numbers[hi];
        if (s === target) return [lo + 1, hi + 1];
        if (s < target) lo++; else hi--;
    }
    return [];`,
  },
  'move-zeroes': {
    python: `        j = 0
        for i in range(len(nums)):
            if nums[i] != 0:
                nums[j], nums[i] = nums[i], nums[j]
                j += 1
        return nums`,
    java: `        int j = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) { int t = nums[j]; nums[j] = nums[i]; nums[i] = t; j++; }
        }
        return nums;`,
    cpp: `        int j = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            if (nums[i] != 0) { swap(nums[j], nums[i]); j++; }
        }
        return nums;`,
    javascript: `    let j = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) { const t = nums[j]; nums[j] = nums[i]; nums[i] = t; j++; }
    }
    return nums;`,
  },
  'container-with-most-water': {
    python: `        lo, hi, best = 0, len(nums) - 1, 0
        while lo < hi:
            best = max(best, (hi - lo) * min(nums[lo], nums[hi]))
            if nums[lo] < nums[hi]:
                lo += 1
            else:
                hi -= 1
        return best`,
    java: `        int lo = 0, hi = nums.length - 1, best = 0;
        while (lo < hi) {
            best = Math.max(best, (hi - lo) * Math.min(nums[lo], nums[hi]));
            if (nums[lo] < nums[hi]) lo++; else hi--;
        }
        return best;`,
    cpp: `        int lo = 0, hi = (int)nums.size() - 1, best = 0;
        while (lo < hi) {
            best = max(best, (hi - lo) * min(nums[lo], nums[hi]));
            if (nums[lo] < nums[hi]) lo++; else hi--;
        }
        return best;`,
    javascript: `    let lo = 0, hi = nums.length - 1, best = 0;
    while (lo < hi) {
        best = Math.max(best, (hi - lo) * Math.min(nums[lo], nums[hi]));
        if (nums[lo] < nums[hi]) lo++; else hi--;
    }
    return best;`,
  },
  'trapping-rain-water': {
    python: `        if not nums:
            return 0
        lo, hi = 0, len(nums) - 1
        lmax, rmax, res = nums[lo], nums[hi], 0
        while lo < hi:
            if lmax < rmax:
                lo += 1
                lmax = max(lmax, nums[lo])
                res += lmax - nums[lo]
            else:
                hi -= 1
                rmax = max(rmax, nums[hi])
                res += rmax - nums[hi]
        return res`,
    java: `        if (nums.length == 0) return 0;
        int lo = 0, hi = nums.length - 1, lmax = nums[0], rmax = nums[hi], res = 0;
        while (lo < hi) {
            if (lmax < rmax) { lo++; lmax = Math.max(lmax, nums[lo]); res += lmax - nums[lo]; }
            else { hi--; rmax = Math.max(rmax, nums[hi]); res += rmax - nums[hi]; }
        }
        return res;`,
    cpp: `        if (nums.empty()) return 0;
        int lo = 0, hi = (int)nums.size() - 1, lmax = nums[0], rmax = nums[hi], res = 0;
        while (lo < hi) {
            if (lmax < rmax) { lo++; lmax = max(lmax, nums[lo]); res += lmax - nums[lo]; }
            else { hi--; rmax = max(rmax, nums[hi]); res += rmax - nums[hi]; }
        }
        return res;`,
    javascript: `    if (nums.length === 0) return 0;
    let lo = 0, hi = nums.length - 1, lmax = nums[0], rmax = nums[hi], res = 0;
    while (lo < hi) {
        if (lmax < rmax) { lo++; lmax = Math.max(lmax, nums[lo]); res += lmax - nums[lo]; }
        else { hi--; rmax = Math.max(rmax, nums[hi]); res += rmax - nums[hi]; }
    }
    return res;`,
  },
  'house-robber': {
    python: `        prev, cur = 0, 0
        for x in nums:
            prev, cur = cur, max(cur, prev + x)
        return cur`,
    java: `        int prev = 0, cur = 0;
        for (int x : nums) { int t = Math.max(cur, prev + x); prev = cur; cur = t; }
        return cur;`,
    cpp: `        int prev = 0, cur = 0;
        for (int x : nums) { int t = max(cur, prev + x); prev = cur; cur = t; }
        return cur;`,
    javascript: `    let prev = 0, cur = 0;
    for (const x of nums) { const t = Math.max(cur, prev + x); prev = cur; cur = t; }
    return cur;`,
  },
  'house-robber-ii': {
    python: `        def line(a):
            prev = cur = 0
            for x in a:
                prev, cur = cur, max(cur, prev + x)
            return cur
        if len(nums) == 1:
            return nums[0]
        return max(line(nums[:-1]), line(nums[1:]))`,
    java: `        if (nums.length == 1) return nums[0];
        return Math.max(robLine(nums, 0, nums.length - 2), robLine(nums, 1, nums.length - 1));
    }
    int robLine(int[] nums, int lo, int hi) {
        int prev = 0, cur = 0;
        for (int i = lo; i <= hi; i++) { int t = Math.max(cur, prev + nums[i]); prev = cur; cur = t; }
        return cur;`,
    cpp: `        if (nums.size() == 1) return nums[0];
        auto line = [&](int lo, int hi) {
            int prev = 0, cur = 0;
            for (int i = lo; i <= hi; i++) { int t = max(cur, prev + nums[i]); prev = cur; cur = t; }
            return cur;
        };
        return max(line(0, (int)nums.size() - 2), line(1, (int)nums.size() - 1));`,
    javascript: `    const line = (lo, hi) => {
        let prev = 0, cur = 0;
        for (let i = lo; i <= hi; i++) { const t = Math.max(cur, prev + nums[i]); prev = cur; cur = t; }
        return cur;
    };
    if (nums.length === 1) return nums[0];
    return Math.max(line(0, nums.length - 2), line(1, nums.length - 1));`,
  },
  'coin-change': {
    python: `        INF = target + 1
        dp = [0] + [INF] * target
        for a in range(1, target + 1):
            for c in nums:
                if c <= a:
                    dp[a] = min(dp[a], dp[a - c] + 1)
        return dp[target] if dp[target] != INF else -1`,
    java: `        int INF = target + 1;
        int[] dp = new int[target + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int a = 1; a <= target; a++)
            for (int c : nums)
                if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
        return dp[target] == INF ? -1 : dp[target];`,
    cpp: `        int INF = target + 1;
        vector<int> dp(target + 1, INF);
        dp[0] = 0;
        for (int a = 1; a <= target; a++)
            for (int c : nums)
                if (c <= a) dp[a] = min(dp[a], dp[a - c] + 1);
        return dp[target] == INF ? -1 : dp[target];`,
    javascript: `    const INF = target + 1;
    const dp = new Array(target + 1).fill(INF);
    dp[0] = 0;
    for (let a = 1; a <= target; a++)
        for (const c of nums)
            if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
    return dp[target] === INF ? -1 : dp[target];`,
  },
  'longest-increasing-subsequence': {
    python: `        import bisect
        tails = []
        for x in nums:
            i = bisect.bisect_left(tails, x)
            if i == len(tails):
                tails.append(x)
            else:
                tails[i] = x
        return len(tails)`,
    java: `        List<Integer> tails = new ArrayList<>();
        for (int x : nums) {
            int lo = 0, hi = tails.size();
            while (lo < hi) { int mid = (lo + hi) / 2; if (tails.get(mid) < x) lo = mid + 1; else hi = mid; }
            if (lo == tails.size()) tails.add(x); else tails.set(lo, x);
        }
        return tails.size();`,
    cpp: `        vector<int> tails;
        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) tails.push_back(x); else *it = x;
        }
        return (int)tails.size();`,
    javascript: `    const tails = [];
    for (const x of nums) {
        let lo = 0, hi = tails.length;
        while (lo < hi) { const mid = (lo + hi) >> 1; if (tails[mid] < x) lo = mid + 1; else hi = mid; }
        if (lo === tails.length) tails.push(x); else tails[lo] = x;
    }
    return tails.length;`,
  },
  'missing-number': {
    python: `        n = len(nums)
        return n * (n + 1) // 2 - sum(nums)`,
    java: `        int n = nums.length, sum = n * (n + 1) / 2;
        for (int x : nums) sum -= x;
        return sum;`,
    cpp: `        int n = (int)nums.size(), sum = n * (n + 1) / 2;
        for (int x : nums) sum -= x;
        return sum;`,
    javascript: `    const n = nums.length;
    let sum = n * (n + 1) / 2;
    for (const x of nums) sum -= x;
    return sum;`,
  },
  'maximum-product-subarray': {
    python: `        res = curMax = curMin = nums[0]
        for x in nums[1:]:
            if x < 0:
                curMax, curMin = curMin, curMax
            curMax = max(x, curMax * x)
            curMin = min(x, curMin * x)
            res = max(res, curMax)
        return res`,
    java: `        int res = nums[0], curMax = nums[0], curMin = nums[0];
        for (int i = 1; i < nums.length; i++) {
            int x = nums[i];
            if (x < 0) { int t = curMax; curMax = curMin; curMin = t; }
            curMax = Math.max(x, curMax * x);
            curMin = Math.min(x, curMin * x);
            res = Math.max(res, curMax);
        }
        return res;`,
    cpp: `        int res = nums[0], curMax = nums[0], curMin = nums[0];
        for (int i = 1; i < (int)nums.size(); i++) {
            int x = nums[i];
            if (x < 0) swap(curMax, curMin);
            curMax = max(x, curMax * x);
            curMin = min(x, curMin * x);
            res = max(res, curMax);
        }
        return res;`,
    javascript: `    let res = nums[0], curMax = nums[0], curMin = nums[0];
    for (let i = 1; i < nums.length; i++) {
        const x = nums[i];
        if (x < 0) { const t = curMax; curMax = curMin; curMin = t; }
        curMax = Math.max(x, curMax * x);
        curMin = Math.min(x, curMin * x);
        res = Math.max(res, curMax);
    }
    return res;`,
  },
  'jump-game': {
    python: `        reach = 0
        for i, x in enumerate(nums):
            if i > reach:
                return False
            reach = max(reach, i + x)
        return True`,
    java: `        int reach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > reach) return false;
            reach = Math.max(reach, i + nums[i]);
        }
        return true;`,
    cpp: `        int reach = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            if (i > reach) return false;
            reach = max(reach, i + nums[i]);
        }
        return true;`,
    javascript: `    let reach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > reach) return false;
        reach = Math.max(reach, i + nums[i]);
    }
    return true;`,
  },
  'kth-largest-element-in-an-array': {
    python: `        return sorted(nums)[-target]`,
    java: `        Arrays.sort(nums);
        return nums[nums.length - target];`,
    cpp: `        sort(nums.begin(), nums.end());
        return nums[(int)nums.size() - target];`,
    javascript: `    nums.sort((a, b) => a - b);
    return nums[nums.length - target];`,
  },
  'longest-substring-without-repeating-characters': {
    python: `        last = {}
        start = res = 0
        for i, c in enumerate(s):
            if c in last and last[c] >= start:
                start = last[c] + 1
            last[c] = i
            res = max(res, i - start + 1)
        return res`,
    java: `        Map<Character,Integer> last = new HashMap<>();
        int start = 0, res = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (last.containsKey(c) && last.get(c) >= start) start = last.get(c) + 1;
            last.put(c, i);
            res = Math.max(res, i - start + 1);
        }
        return res;`,
    cpp: `        unordered_map<char,int> last;
        int start = 0, res = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            char c = s[i];
            if (last.count(c) && last[c] >= start) start = last[c] + 1;
            last[c] = i;
            res = max(res, i - start + 1);
        }
        return res;`,
    javascript: `    const last = {};
    let start = 0, res = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c in last && last[c] >= start) start = last[c] + 1;
        last[c] = i;
        res = Math.max(res, i - start + 1);
    }
    return res;`,
  },
  'valid-palindrome': {
    python: `        f = [c.lower() for c in s if c.isalnum()]
        return f == f[::-1]`,
    java: `        int lo = 0, hi = s.length() - 1;
        while (lo < hi) {
            while (lo < hi && !Character.isLetterOrDigit(s.charAt(lo))) lo++;
            while (lo < hi && !Character.isLetterOrDigit(s.charAt(hi))) hi--;
            if (Character.toLowerCase(s.charAt(lo)) != Character.toLowerCase(s.charAt(hi))) return false;
            lo++; hi--;
        }
        return true;`,
    cpp: `        int lo = 0, hi = (int)s.size() - 1;
        while (lo < hi) {
            while (lo < hi && !isalnum((unsigned char)s[lo])) lo++;
            while (lo < hi && !isalnum((unsigned char)s[hi])) hi--;
            if (tolower((unsigned char)s[lo]) != tolower((unsigned char)s[hi])) return false;
            lo++; hi--;
        }
        return true;`,
    javascript: `    const f = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return f === f.split('').reverse().join('');`,
  },
  'palindrome-number': {
    python: `        return str(n) == str(n)[::-1]`,
    java: `        String t = Integer.toString(n);
        return t.equals(new StringBuilder(t).reverse().toString());`,
    cpp: `        string t = to_string(n);
        string r(t.rbegin(), t.rend());
        return t == r;`,
    javascript: `    const t = String(n);
    return t === t.split('').reverse().join('');`,
  },
  'min-cost-climbing-stairs': {
    python: `        a = b = 0
        for i in range(2, len(nums) + 1):
            a, b = b, min(b + nums[i - 1], a + nums[i - 2])
        return b`,
    java: `        int a = 0, b = 0;
        for (int i = 2; i <= nums.length; i++) {
            int t = Math.min(b + nums[i - 1], a + nums[i - 2]);
            a = b; b = t;
        }
        return b;`,
    cpp: `        int a = 0, b = 0;
        for (int i = 2; i <= (int)nums.size(); i++) {
            int t = min(b + nums[i - 1], a + nums[i - 2]);
            a = b; b = t;
        }
        return b;`,
    javascript: `    let a = 0, b = 0;
    for (let i = 2; i <= nums.length; i++) {
        const t = Math.min(b + nums[i - 1], a + nums[i - 2]);
        a = b; b = t;
    }
    return b;`,
  },
  'sqrtx': {
    python: `        if n < 2:
            return n
        lo, hi = 1, n // 2
        while lo <= hi:
            mid = (lo + hi) // 2
            if mid * mid <= n:
                lo = mid + 1
            else:
                hi = mid - 1
        return hi`,
    java: `        if (n < 2) return n;
        long lo = 1, hi = n / 2;
        while (lo <= hi) {
            long mid = (lo + hi) / 2;
            if (mid * mid <= n) lo = mid + 1; else hi = mid - 1;
        }
        return (int) hi;`,
    cpp: `        if (n < 2) return n;
        long lo = 1, hi = n / 2;
        while (lo <= hi) {
            long mid = (lo + hi) / 2;
            if (mid * mid <= (long)n) lo = mid + 1; else hi = mid - 1;
        }
        return (int) hi;`,
    javascript: `    if (n < 2) return n;
    let lo = 1, hi = Math.floor(n / 2);
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (mid * mid <= n) lo = mid + 1; else hi = mid - 1;
    }
    return hi;`,
  },
  'longest-consecutive-sequence': {
    python: `        s = set(nums)
        best = 0
        for x in s:
            if x - 1 not in s:
                y = x
                while y + 1 in s:
                    y += 1
                best = max(best, y - x + 1)
        return best`,
    java: `        Set<Integer> s = new HashSet<>();
        for (int x : nums) s.add(x);
        int best = 0;
        for (int x : s) {
            if (!s.contains(x - 1)) {
                int y = x;
                while (s.contains(y + 1)) y++;
                best = Math.max(best, y - x + 1);
            }
        }
        return best;`,
    cpp: `        unordered_set<int> s(nums.begin(), nums.end());
        int best = 0;
        for (int x : s) {
            if (!s.count(x - 1)) {
                int y = x;
                while (s.count(y + 1)) y++;
                best = max(best, y - x + 1);
            }
        }
        return best;`,
    javascript: `    const s = new Set(nums);
    let best = 0;
    for (const x of s) {
        if (!s.has(x - 1)) {
            let y = x;
            while (s.has(y + 1)) y++;
            best = Math.max(best, y - x + 1);
        }
    }
    return best;`,
  },
  'find-the-duplicate-number': {
    python: `        slow = fast = nums[0]
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break
        slow = nums[0]
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]
        return slow`,
    java: `        int slow = nums[0], fast = nums[0];
        do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow != fast);
        slow = nums[0];
        while (slow != fast) { slow = nums[slow]; fast = nums[fast]; }
        return slow;`,
    cpp: `        int slow = nums[0], fast = nums[0];
        do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow != fast);
        slow = nums[0];
        while (slow != fast) { slow = nums[slow]; fast = nums[fast]; }
        return slow;`,
    javascript: `    let slow = nums[0], fast = nums[0];
    do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow !== fast);
    slow = nums[0];
    while (slow !== fast) { slow = nums[slow]; fast = nums[fast]; }
    return slow;`,
  },
  'squares-of-a-sorted-array': {
    python: `        n = len(nums)
        res = [0] * n
        lo, hi, k = 0, n - 1, n - 1
        while lo <= hi:
            if abs(nums[lo]) > abs(nums[hi]):
                res[k] = nums[lo] * nums[lo]
                lo += 1
            else:
                res[k] = nums[hi] * nums[hi]
                hi -= 1
            k -= 1
        return res`,
    java: `        int n = nums.length;
        int[] res = new int[n];
        int lo = 0, hi = n - 1, k = n - 1;
        while (lo <= hi) {
            if (Math.abs(nums[lo]) > Math.abs(nums[hi])) { res[k] = nums[lo] * nums[lo]; lo++; }
            else { res[k] = nums[hi] * nums[hi]; hi--; }
            k--;
        }
        return res;`,
    cpp: `        int n = (int)nums.size();
        vector<int> res(n);
        int lo = 0, hi = n - 1, k = n - 1;
        while (lo <= hi) {
            if (abs(nums[lo]) > abs(nums[hi])) { res[k] = nums[lo] * nums[lo]; lo++; }
            else { res[k] = nums[hi] * nums[hi]; hi--; }
            k--;
        }
        return res;`,
    javascript: `    const n = nums.length;
    const res = new Array(n);
    let lo = 0, hi = n - 1, k = n - 1;
    while (lo <= hi) {
        if (Math.abs(nums[lo]) > Math.abs(nums[hi])) { res[k] = nums[lo] * nums[lo]; lo++; }
        else { res[k] = nums[hi] * nums[hi]; hi--; }
        k--;
    }
    return res;`,
  },
  'first-unique-character-in-a-string': {
    python: `        from collections import Counter
        cnt = Counter(s)
        for i, c in enumerate(s):
            if cnt[c] == 1:
                return i
        return -1`,
    java: `        int[] cnt = new int[26];
        for (int i = 0; i < s.length(); i++) cnt[s.charAt(i) - 'a']++;
        for (int i = 0; i < s.length(); i++) if (cnt[s.charAt(i) - 'a'] == 1) return i;
        return -1;`,
    cpp: `        int cnt[26] = {0};
        for (char c : s) cnt[c - 'a']++;
        for (int i = 0; i < (int)s.size(); i++) if (cnt[s[i] - 'a'] == 1) return i;
        return -1;`,
    javascript: `    const cnt = {};
    for (const c of s) cnt[c] = (cnt[c] || 0) + 1;
    for (let i = 0; i < s.length; i++) if (cnt[s[i]] === 1) return i;
    return -1;`,
  },
  'is-subsequence': {
    python: `        it = iter(t)
        return all(c in it for c in s)`,
    java: `        int i = 0;
        for (int j = 0; j < t.length() && i < s.length(); j++)
            if (s.charAt(i) == t.charAt(j)) i++;
        return i == s.length();`,
    cpp: `        int i = 0;
        for (int j = 0; j < (int)t.size() && i < (int)s.size(); j++)
            if (s[i] == t[j]) i++;
        return i == (int)s.size();`,
    javascript: `    let i = 0;
    for (let j = 0; j < t.length && i < s.length; j++)
        if (s[i] === t[j]) i++;
    return i === s.length;`,
  },
  'number-of-1-bits': {
    python: `        return bin(n).count('1')`,
    java: `        return Integer.bitCount(n);`,
    cpp: `        int c = 0;
        while (n) { c += n & 1; n >>= 1; }
        return c;`,
    javascript: `    let c = 0;
    while (n) { c += n & 1; n >>>= 1; }
    return c;`,
  },
  'koko-eating-bananas': {
    python: `        lo, hi = 1, max(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            hours = sum((x + mid - 1) // mid for x in nums)
            if hours <= target:
                hi = mid
            else:
                lo = mid + 1
        return lo`,
    java: `        int lo = 1, hi = 0;
        for (int x : nums) hi = Math.max(hi, x);
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            long hours = 0;
            for (int x : nums) hours += (x + mid - 1) / mid;
            if (hours <= target) hi = mid; else lo = mid + 1;
        }
        return lo;`,
    cpp: `        int lo = 1, hi = *max_element(nums.begin(), nums.end());
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            long hours = 0;
            for (int x : nums) hours += (x + mid - 1) / mid;
            if (hours <= target) hi = mid; else lo = mid + 1;
        }
        return lo;`,
    javascript: `    let lo = 1, hi = Math.max(...nums);
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        let hours = 0;
        for (const x of nums) hours += Math.ceil(x / mid);
        if (hours <= target) hi = mid; else lo = mid + 1;
    }
    return lo;`,
  },
  'subarray-sum-equals-k': {
    python: `        from collections import defaultdict
        cnt = defaultdict(int)
        cnt[0] = 1
        s = res = 0
        for x in nums:
            s += x
            res += cnt[s - target]
            cnt[s] += 1
        return res`,
    java: `        Map<Integer,Integer> cnt = new HashMap<>();
        cnt.put(0, 1);
        int s = 0, res = 0;
        for (int x : nums) {
            s += x;
            res += cnt.getOrDefault(s - target, 0);
            cnt.merge(s, 1, Integer::sum);
        }
        return res;`,
    cpp: `        unordered_map<int,int> cnt;
        cnt[0] = 1;
        int s = 0, res = 0;
        for (int x : nums) {
            s += x;
            if (cnt.count(s - target)) res += cnt[s - target];
            cnt[s]++;
        }
        return res;`,
    javascript: `    const cnt = new Map();
    cnt.set(0, 1);
    let s = 0, res = 0;
    for (const x of nums) {
        s += x;
        res += cnt.get(s - target) || 0;
        cnt.set(s, (cnt.get(s) || 0) + 1);
    }
    return res;`,
  },
  'minimum-size-subarray-sum': {
    python: `        lo = s = 0
        res = float('inf')
        for hi in range(len(nums)):
            s += nums[hi]
            while s >= target:
                res = min(res, hi - lo + 1)
                s -= nums[lo]
                lo += 1
        return res if res != float('inf') else 0`,
    java: `        int lo = 0, s = 0, res = Integer.MAX_VALUE;
        for (int hi = 0; hi < nums.length; hi++) {
            s += nums[hi];
            while (s >= target) { res = Math.min(res, hi - lo + 1); s -= nums[lo]; lo++; }
        }
        return res == Integer.MAX_VALUE ? 0 : res;`,
    cpp: `        int lo = 0, s = 0, res = INT_MAX;
        for (int hi = 0; hi < (int)nums.size(); hi++) {
            s += nums[hi];
            while (s >= target) { res = min(res, hi - lo + 1); s -= nums[lo]; lo++; }
        }
        return res == INT_MAX ? 0 : res;`,
    javascript: `    let lo = 0, s = 0, res = Infinity;
    for (let hi = 0; hi < nums.length; hi++) {
        s += nums[hi];
        while (s >= target) { res = Math.min(res, hi - lo + 1); s -= nums[lo]; lo++; }
    }
    return res === Infinity ? 0 : res;`,
  },
  'rotate-array': {
    python: `        n = len(nums)
        if n == 0:
            return nums
        k = target % n
        return nums[n - k:] + nums[:n - k]`,
    java: `        int n = nums.length;
        int[] r = new int[n];
        int k = n == 0 ? 0 : target % n;
        for (int i = 0; i < n; i++) r[(i + k) % n] = nums[i];
        return r;`,
    cpp: `        int n = (int)nums.size();
        vector<int> r(n);
        int k = n == 0 ? 0 : target % n;
        for (int i = 0; i < n; i++) r[(i + k) % n] = nums[i];
        return r;`,
    javascript: `    const n = nums.length;
    const r = new Array(n);
    const k = n === 0 ? 0 : target % n;
    for (let i = 0; i < n; i++) r[(i + k) % n] = nums[i];
    return r;`,
  },
  'maximum-depth-of-binary-tree': {
    python: `        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
    java: `        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));`,
    cpp: `        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));`,
    javascript: `    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));`,
  },
  'minimum-depth-of-binary-tree': {
    python: `        if not root:
            return 0
        if not root.left:
            return 1 + self.minDepth(root.right)
        if not root.right:
            return 1 + self.minDepth(root.left)
        return 1 + min(self.minDepth(root.left), self.minDepth(root.right))`,
    java: `        if (root == null) return 0;
        if (root.left == null) return 1 + minDepth(root.right);
        if (root.right == null) return 1 + minDepth(root.left);
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));`,
    cpp: `        if (!root) return 0;
        if (!root->left) return 1 + minDepth(root->right);
        if (!root->right) return 1 + minDepth(root->left);
        return 1 + min(minDepth(root->left), minDepth(root->right));`,
    javascript: `    if (!root) return 0;
    if (!root.left) return 1 + minDepth(root.right);
    if (!root.right) return 1 + minDepth(root.left);
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));`,
  },
  'balanced-binary-tree': {
    python: `        def h(node):
            if not node:
                return 0
            lh = h(node.left)
            if lh == -1:
                return -1
            rh = h(node.right)
            if rh == -1:
                return -1
            if abs(lh - rh) > 1:
                return -1
            return 1 + max(lh, rh)
        return h(root) != -1`,
    java: `        return height(root) != -1;
    }
    int height(TreeNode node) {
        if (node == null) return 0;
        int l = height(node.left);
        if (l == -1) return -1;
        int r = height(node.right);
        if (r == -1) return -1;
        if (Math.abs(l - r) > 1) return -1;
        return 1 + Math.max(l, r);`,
    cpp: `        function<int(TreeNode*)> h = [&](TreeNode* node) -> int {
            if (!node) return 0;
            int l = h(node->left); if (l == -1) return -1;
            int r = h(node->right); if (r == -1) return -1;
            if (abs(l - r) > 1) return -1;
            return 1 + max(l, r);
        };
        return h(root) != -1;`,
    javascript: `    const h = node => {
        if (!node) return 0;
        const l = h(node.left); if (l === -1) return -1;
        const r = h(node.right); if (r === -1) return -1;
        if (Math.abs(l - r) > 1) return -1;
        return 1 + Math.max(l, r);
    };
    return h(root) !== -1;`,
  },
  'symmetric-tree': {
    python: `        def mirror(a, b):
            if not a and not b:
                return True
            if not a or not b or a.val != b.val:
                return False
            return mirror(a.left, b.right) and mirror(a.right, b.left)
        return mirror(root.left, root.right) if root else True`,
    java: `        return root == null || mirror(root.left, root.right);
    }
    boolean mirror(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null || a.val != b.val) return false;
        return mirror(a.left, b.right) && mirror(a.right, b.left);`,
    cpp: `        function<bool(TreeNode*,TreeNode*)> mir = [&](TreeNode* a, TreeNode* b) -> bool {
            if (!a && !b) return true;
            if (!a || !b || a->val != b->val) return false;
            return mir(a->left, b->right) && mir(a->right, b->left);
        };
        return !root || mir(root->left, root->right);`,
    javascript: `    const mir = (a, b) => {
        if (!a && !b) return true;
        if (!a || !b || a.val !== b.val) return false;
        return mir(a.left, b.right) && mir(a.right, b.left);
    };
    return !root || mir(root.left, root.right);`,
  },
  'diameter-of-binary-tree': {
    python: `        self.best = 0
        def depth(node):
            if not node:
                return 0
            l = depth(node.left)
            r = depth(node.right)
            self.best = max(self.best, l + r)
            return 1 + max(l, r)
        depth(root)
        return self.best`,
    java: `        best = 0;
        depth(root);
        return best;
    }
    int best;
    int depth(TreeNode node) {
        if (node == null) return 0;
        int l = depth(node.left), r = depth(node.right);
        best = Math.max(best, l + r);
        return 1 + Math.max(l, r);`,
    cpp: `        int best = 0;
        function<int(TreeNode*)> depth = [&](TreeNode* node) -> int {
            if (!node) return 0;
            int l = depth(node->left), r = depth(node->right);
            best = max(best, l + r);
            return 1 + max(l, r);
        };
        depth(root);
        return best;`,
    javascript: `    let best = 0;
    const depth = node => {
        if (!node) return 0;
        const l = depth(node.left), r = depth(node.right);
        best = Math.max(best, l + r);
        return 1 + Math.max(l, r);
    };
    depth(root);
    return best;`,
  },
  'binary-tree-inorder-traversal': {
    python: `        res = []
        def dfs(node):
            if not node:
                return
            dfs(node.left)
            res.append(node.val)
            dfs(node.right)
        dfs(root)
        return res`,
    java: `        List<Integer> res = new ArrayList<>();
        Deque<TreeNode> st = new ArrayDeque<>();
        TreeNode cur = root;
        while (cur != null || !st.isEmpty()) {
            while (cur != null) { st.push(cur); cur = cur.left; }
            cur = st.pop();
            res.add(cur.val);
            cur = cur.right;
        }
        int[] a = new int[res.size()];
        for (int i = 0; i < a.length; i++) a[i] = res.get(i);
        return a;`,
    cpp: `        vector<int> res;
        function<void(TreeNode*)> dfs = [&](TreeNode* node) {
            if (!node) return;
            dfs(node->left); res.push_back(node->val); dfs(node->right);
        };
        dfs(root);
        return res;`,
    javascript: `    const res = [];
    const dfs = node => { if (!node) return; dfs(node.left); res.push(node.val); dfs(node.right); };
    dfs(root);
    return res;`,
  },
  'binary-tree-preorder-traversal': {
    python: `        res = []
        def dfs(node):
            if not node:
                return
            res.append(node.val)
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return res`,
    java: `        List<Integer> res = new ArrayList<>();
        Deque<TreeNode> st = new ArrayDeque<>();
        if (root != null) st.push(root);
        while (!st.isEmpty()) {
            TreeNode n = st.pop();
            res.add(n.val);
            if (n.right != null) st.push(n.right);
            if (n.left != null) st.push(n.left);
        }
        int[] a = new int[res.size()];
        for (int i = 0; i < a.length; i++) a[i] = res.get(i);
        return a;`,
    cpp: `        vector<int> res;
        function<void(TreeNode*)> dfs = [&](TreeNode* node) {
            if (!node) return;
            res.push_back(node->val); dfs(node->left); dfs(node->right);
        };
        dfs(root);
        return res;`,
    javascript: `    const res = [];
    const dfs = node => { if (!node) return; res.push(node.val); dfs(node.left); dfs(node.right); };
    dfs(root);
    return res;`,
  },
  'binary-tree-postorder-traversal': {
    python: `        res = []
        def dfs(node):
            if not node:
                return
            dfs(node.left)
            dfs(node.right)
            res.append(node.val)
        dfs(root)
        return res`,
    java: `        List<Integer> res = new ArrayList<>();
        Deque<TreeNode> st = new ArrayDeque<>();
        if (root != null) st.push(root);
        while (!st.isEmpty()) {
            TreeNode n = st.pop();
            res.add(n.val);
            if (n.left != null) st.push(n.left);
            if (n.right != null) st.push(n.right);
        }
        Collections.reverse(res);
        int[] a = new int[res.size()];
        for (int i = 0; i < a.length; i++) a[i] = res.get(i);
        return a;`,
    cpp: `        vector<int> res;
        function<void(TreeNode*)> dfs = [&](TreeNode* node) {
            if (!node) return;
            dfs(node->left); dfs(node->right); res.push_back(node->val);
        };
        dfs(root);
        return res;`,
    javascript: `    const res = [];
    const dfs = node => { if (!node) return; dfs(node.left); dfs(node.right); res.push(node.val); };
    dfs(root);
    return res;`,
  },
  'sum-of-left-leaves': {
    python: `        def dfs(node, isLeft):
            if not node:
                return 0
            if not node.left and not node.right:
                return node.val if isLeft else 0
            return dfs(node.left, True) + dfs(node.right, False)
        return dfs(root, False)`,
    java: `        int sum = 0;
        Deque<TreeNode> st = new ArrayDeque<>();
        Deque<Boolean> sl = new ArrayDeque<>();
        if (root != null) { st.push(root); sl.push(false); }
        while (!st.isEmpty()) {
            TreeNode n = st.pop();
            boolean left = sl.pop();
            if (n.left == null && n.right == null) { if (left) sum += n.val; continue; }
            if (n.left != null) { st.push(n.left); sl.push(true); }
            if (n.right != null) { st.push(n.right); sl.push(false); }
        }
        return sum;`,
    cpp: `        function<int(TreeNode*,bool)> dfs = [&](TreeNode* node, bool left) -> int {
            if (!node) return 0;
            if (!node->left && !node->right) return left ? node->val : 0;
            return dfs(node->left, true) + dfs(node->right, false);
        };
        return dfs(root, false);`,
    javascript: `    const dfs = (node, left) => {
        if (!node) return 0;
        if (!node.left && !node.right) return left ? node.val : 0;
        return dfs(node.left, true) + dfs(node.right, false);
    };
    return dfs(root, false);`,
  },
  'count-complete-tree-nodes': {
    python: `        if not root:
            return 0
        return 1 + self.countNodes(root.left) + self.countNodes(root.right)`,
    java: `        if (root == null) return 0;
        return 1 + countNodes(root.left) + countNodes(root.right);`,
    cpp: `        if (!root) return 0;
        return 1 + countNodes(root->left) + countNodes(root->right);`,
    javascript: `    if (!root) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);`,
  },
};
module.exports = { SOL };
