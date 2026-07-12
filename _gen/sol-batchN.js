// Batch N: solutions for the pattern-coverage problems (batch 17).
const SOL = {
  'find-pivot-index': {
    python: `        total = sum(nums)
        left = 0
        for i, x in enumerate(nums):
            if left == total - left - x:
                return i
            left += x
        return -1`,
    java: `        int total = 0;
        for (int x : nums) total += x;
        int left = 0;
        for (int i = 0; i < nums.length; i++) {
            if (left == total - left - nums[i]) return i;
            left += nums[i];
        }
        return -1;`,
    cpp: `        int total = 0;
        for (int x : nums) total += x;
        int left = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            if (left == total - left - nums[i]) return i;
            left += nums[i];
        }
        return -1;`,
    javascript: `    let total = 0;
    for (const x of nums) total += x;
    let left = 0;
    for (let i = 0; i < nums.length; i++) {
        if (left === total - left - nums[i]) return i;
        left += nums[i];
    }
    return -1;`,
  },
  '3sum-closest': {
    python: `        nums.sort()
        best = nums[0] + nums[1] + nums[2]
        for i in range(len(nums) - 2):
            l, r = i + 1, len(nums) - 1
            while l < r:
                s = nums[i] + nums[l] + nums[r]
                if abs(s - target) < abs(best - target):
                    best = s
                if s < target:
                    l += 1
                elif s > target:
                    r -= 1
                else:
                    return s
        return best`,
    java: `        Arrays.sort(nums);
        int best = nums[0] + nums[1] + nums[2];
        for (int i = 0; i < nums.length - 2; i++) {
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int s = nums[i] + nums[l] + nums[r];
                if (Math.abs(s - target) < Math.abs(best - target)) best = s;
                if (s < target) l++;
                else if (s > target) r--;
                else return s;
            }
        }
        return best;`,
    cpp: `        sort(nums.begin(), nums.end());
        int best = nums[0] + nums[1] + nums[2];
        for (int i = 0; i < (int)nums.size() - 2; i++) {
            int l = i + 1, r = (int)nums.size() - 1;
            while (l < r) {
                int s = nums[i] + nums[l] + nums[r];
                if (abs(s - target) < abs(best - target)) best = s;
                if (s < target) l++;
                else if (s > target) r--;
                else return s;
            }
        }
        return best;`,
    javascript: `    nums.sort((a, b) => a - b);
    let best = nums[0] + nums[1] + nums[2];
    for (let i = 0; i < nums.length - 2; i++) {
        let l = i + 1, r = nums.length - 1;
        while (l < r) {
            const s = nums[i] + nums[l] + nums[r];
            if (Math.abs(s - target) < Math.abs(best - target)) best = s;
            if (s < target) l++;
            else if (s > target) r--;
            else return s;
        }
    }
    return best;`,
  },
  'remove-element': {
    python: `        k = 0
        for x in nums:
            if x != target:
                nums[k] = x
                k += 1
        return k`,
    java: `        int k = 0;
        for (int x : nums) {
            if (x != target) { nums[k] = x; k++; }
        }
        return k;`,
    cpp: `        int k = 0;
        for (int x : nums) {
            if (x != target) { nums[k] = x; k++; }
        }
        return k;`,
    javascript: `    let k = 0;
    for (const x of nums) {
        if (x !== target) { nums[k] = x; k++; }
    }
    return k;`,
  },
  'find-first-and-last-position-of-element-in-sorted-array': {
    python: `        def bound(low):
            lo, hi, res = 0, len(nums) - 1, -1
            while lo <= hi:
                mid = (lo + hi) // 2
                if nums[mid] == target:
                    res = mid
                    if low:
                        hi = mid - 1
                    else:
                        lo = mid + 1
                elif nums[mid] < target:
                    lo = mid + 1
                else:
                    hi = mid - 1
            return res
        return [bound(True), bound(False)]`,
    java: `        return new int[]{bound(nums, target, true), bound(nums, target, false)};
    }
    int bound(int[] nums, int target, boolean low) {
        int lo = 0, hi = nums.length - 1, res = -1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] == target) { res = mid; if (low) hi = mid - 1; else lo = mid + 1; }
            else if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return res;`,
    cpp: `        auto bound = [&](bool low) {
            int lo = 0, hi = (int)nums.size() - 1, res = -1;
            while (lo <= hi) {
                int mid = (lo + hi) / 2;
                if (nums[mid] == target) { res = mid; if (low) hi = mid - 1; else lo = mid + 1; }
                else if (nums[mid] < target) lo = mid + 1;
                else hi = mid - 1;
            }
            return res;
        };
        return {bound(true), bound(false)};`,
    javascript: `    const bound = (low) => {
        let lo = 0, hi = nums.length - 1, res = -1;
        while (lo <= hi) {
            const mid = (lo + hi) >> 1;
            if (nums[mid] === target) { res = mid; if (low) hi = mid - 1; else lo = mid + 1; }
            else if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return res;
    };
    return [bound(true), bound(false)];`,
  },
  'capacity-to-ship-packages-within-d-days': {
    python: `        def ok(cap):
            d, cur = 1, 0
            for w in nums:
                if cur + w > cap:
                    d += 1
                    cur = 0
                cur += w
            return d <= target
        lo, hi = max(nums), sum(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if ok(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo`,
    java: `        int lo = 0, hi = 0;
        for (int w : nums) { lo = Math.max(lo, w); hi += w; }
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (ok(nums, target, mid)) hi = mid; else lo = mid + 1;
        }
        return lo;
    }
    boolean ok(int[] nums, int target, int cap) {
        int d = 1, cur = 0;
        for (int w : nums) {
            if (cur + w > cap) { d++; cur = 0; }
            cur += w;
        }
        return d <= target;`,
    cpp: `        int lo = 0, hi = 0;
        for (int w : nums) { lo = max(lo, w); hi += w; }
        auto ok = [&](int cap) {
            int d = 1, cur = 0;
            for (int w : nums) { if (cur + w > cap) { d++; cur = 0; } cur += w; }
            return d <= target;
        };
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (ok(mid)) hi = mid; else lo = mid + 1;
        }
        return lo;`,
    javascript: `    let lo = 0, hi = 0;
    for (const w of nums) { lo = Math.max(lo, w); hi += w; }
    const ok = (cap) => {
        let d = 1, cur = 0;
        for (const w of nums) { if (cur + w > cap) { d++; cur = 0; } cur += w; }
        return d <= target;
    };
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (ok(mid)) hi = mid; else lo = mid + 1;
    }
    return lo;`,
  },
  'asteroid-collision': {
    python: `        st = []
        for a in nums:
            alive = True
            while alive and a < 0 and st and st[-1] > 0:
                if st[-1] < -a:
                    st.pop()
                elif st[-1] == -a:
                    st.pop()
                    alive = False
                else:
                    alive = False
            if alive:
                st.append(a)
        return st`,
    java: `        Deque<Integer> st = new ArrayDeque<>();
        for (int a : nums) {
            boolean alive = true;
            while (alive && a < 0 && !st.isEmpty() && st.peekLast() > 0) {
                if (st.peekLast() < -a) st.pollLast();
                else if (st.peekLast() == -a) { st.pollLast(); alive = false; }
                else alive = false;
            }
            if (alive) st.addLast(a);
        }
        int[] r = new int[st.size()];
        int i = 0;
        for (int x : st) r[i++] = x;
        return r;`,
    cpp: `        vector<int> st;
        for (int a : nums) {
            bool alive = true;
            while (alive && a < 0 && !st.empty() && st.back() > 0) {
                if (st.back() < -a) st.pop_back();
                else if (st.back() == -a) { st.pop_back(); alive = false; }
                else alive = false;
            }
            if (alive) st.push_back(a);
        }
        return st;`,
    javascript: `    const st = [];
    for (const a of nums) {
        let alive = true;
        while (alive && a < 0 && st.length && st[st.length - 1] > 0) {
            if (st[st.length - 1] < -a) st.pop();
            else if (st[st.length - 1] === -a) { st.pop(); alive = false; }
            else alive = false;
        }
        if (alive) st.push(a);
    }
    return st;`,
  },
  'next-greater-element-ii': {
    python: `        n = len(nums)
        res = [-1] * n
        st = []
        for i in range(2 * n):
            cur = nums[i % n]
            while st and nums[st[-1]] < cur:
                res[st.pop()] = cur
            if i < n:
                st.append(i)
        return res`,
    java: `        int n = nums.length;
        int[] res = new int[n];
        Arrays.fill(res, -1);
        Deque<Integer> st = new ArrayDeque<>();
        for (int i = 0; i < 2 * n; i++) {
            int cur = nums[i % n];
            while (!st.isEmpty() && nums[st.peek()] < cur) res[st.pop()] = cur;
            if (i < n) st.push(i);
        }
        return res;`,
    cpp: `        int n = (int)nums.size();
        vector<int> res(n, -1);
        vector<int> st;
        for (int i = 0; i < 2 * n; i++) {
            int cur = nums[i % n];
            while (!st.empty() && nums[st.back()] < cur) { res[st.back()] = cur; st.pop_back(); }
            if (i < n) st.push_back(i);
        }
        return res;`,
    javascript: `    const n = nums.length;
    const res = new Array(n).fill(-1);
    const st = [];
    for (let i = 0; i < 2 * n; i++) {
        const cur = nums[i % n];
        while (st.length && nums[st[st.length - 1]] < cur) res[st.pop()] = cur;
        if (i < n) st.push(i);
    }
    return res;`,
  },
  'partition-equal-subset-sum': {
    python: `        total = sum(nums)
        if total % 2:
            return False
        t = total // 2
        dp = [False] * (t + 1)
        dp[0] = True
        for x in nums:
            for j in range(t, x - 1, -1):
                if dp[j - x]:
                    dp[j] = True
        return dp[t]`,
    java: `        int total = 0;
        for (int x : nums) total += x;
        if (total % 2 == 1) return false;
        int t = total / 2;
        boolean[] dp = new boolean[t + 1];
        dp[0] = true;
        for (int x : nums)
            for (int j = t; j >= x; j--)
                if (dp[j - x]) dp[j] = true;
        return dp[t];`,
    cpp: `        int total = 0;
        for (int x : nums) total += x;
        if (total % 2 == 1) return false;
        int t = total / 2;
        vector<bool> dp(t + 1, false);
        dp[0] = true;
        for (int x : nums)
            for (int j = t; j >= x; j--)
                if (dp[j - x]) dp[j] = true;
        return dp[t];`,
    javascript: `    let total = 0;
    for (const x of nums) total += x;
    if (total % 2 === 1) return false;
    const t = total / 2;
    const dp = new Array(t + 1).fill(false);
    dp[0] = true;
    for (const x of nums)
        for (let j = t; j >= x; j--)
            if (dp[j - x]) dp[j] = true;
    return dp[t];`,
  },
  'excel-sheet-column-number': {
    python: `        r = 0
        for c in s:
            r = r * 26 + (ord(c) - ord('A') + 1)
        return r`,
    java: `        int r = 0;
        for (int i = 0; i < s.length(); i++) r = r * 26 + (s.charAt(i) - 'A' + 1);
        return r;`,
    cpp: `        int r = 0;
        for (char c : s) r = r * 26 + (c - 'A' + 1);
        return r;`,
    javascript: `    let r = 0;
    for (const c of s) r = r * 26 + (c.charCodeAt(0) - 64);
    return r;`,
  },
  'count-primes': {
    python: `        if n < 3:
            return 0
        sieve = [True] * n
        sieve[0] = sieve[1] = False
        i = 2
        while i * i < n:
            if sieve[i]:
                for j in range(i * i, n, i):
                    sieve[j] = False
            i += 1
        return sum(sieve)`,
    java: `        if (n < 3) return 0;
        boolean[] comp = new boolean[n];
        int count = 0;
        for (int i = 2; i < n; i++) {
            if (!comp[i]) {
                count++;
                for (long j = (long) i * i; j < n; j += i) comp[(int) j] = true;
            }
        }
        return count;`,
    cpp: `        if (n < 3) return 0;
        vector<bool> comp(n, false);
        int count = 0;
        for (int i = 2; i < n; i++) {
            if (!comp[i]) {
                count++;
                for (long long j = (long long) i * i; j < n; j += i) comp[j] = true;
            }
        }
        return count;`,
    javascript: `    if (n < 3) return 0;
    const comp = new Array(n).fill(false);
    let count = 0;
    for (let i = 2; i < n; i++) {
        if (!comp[i]) {
            count++;
            for (let j = i * i; j < n; j += i) comp[j] = true;
        }
    }
    return count;`,
  },
  'power-of-two': {
    python: `        return n > 0 and (n & (n - 1)) == 0`,
    java: `        return n > 0 && (n & (n - 1)) == 0;`,
    cpp: `        return n > 0 && (n & (n - 1)) == 0;`,
    javascript: `    return n > 0 && (n & (n - 1)) === 0;`,
  },
  'single-number-ii': {
    python: `        ones = twos = 0
        for x in nums:
            ones = (ones ^ x) & ~twos
            twos = (twos ^ x) & ~ones
        return ones`,
    java: `        int ones = 0, twos = 0;
        for (int x : nums) {
            ones = (ones ^ x) & ~twos;
            twos = (twos ^ x) & ~ones;
        }
        return ones;`,
    cpp: `        int ones = 0, twos = 0;
        for (int x : nums) {
            ones = (ones ^ x) & ~twos;
            twos = (twos ^ x) & ~ones;
        }
        return ones;`,
    javascript: `    let ones = 0, twos = 0;
    for (const x of nums) {
        ones = (ones ^ x) & ~twos;
        twos = (twos ^ x) & ~ones;
    }
    return ones;`,
  },
  'first-missing-positive': {
    python: `        n = len(nums)
        for i in range(n):
            while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
                j = nums[i] - 1
                nums[i], nums[j] = nums[j], nums[i]
        for i in range(n):
            if nums[i] != i + 1:
                return i + 1
        return n + 1`,
    java: `        int n = nums.length;
        for (int i = 0; i < n; i++) {
            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int j = nums[i] - 1;
                int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
            }
        }
        for (int i = 0; i < n; i++) if (nums[i] != i + 1) return i + 1;
        return n + 1;`,
    cpp: `        int n = (int)nums.size();
        for (int i = 0; i < n; i++) {
            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i])
                swap(nums[i], nums[nums[i] - 1]);
        }
        for (int i = 0; i < n; i++) if (nums[i] != i + 1) return i + 1;
        return n + 1;`,
    javascript: `    const n = nums.length;
    for (let i = 0; i < n; i++) {
        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            const j = nums[i] - 1;
            const t = nums[i]; nums[i] = nums[j]; nums[j] = t;
        }
    }
    for (let i = 0; i < n; i++) if (nums[i] !== i + 1) return i + 1;
    return n + 1;`,
  },
  'max-consecutive-ones-iii': {
    python: `        l = zeros = best = 0
        for r in range(len(nums)):
            if nums[r] == 0:
                zeros += 1
            while zeros > target:
                if nums[l] == 0:
                    zeros -= 1
                l += 1
            best = max(best, r - l + 1)
        return best`,
    java: `        int l = 0, zeros = 0, best = 0;
        for (int r = 0; r < nums.length; r++) {
            if (nums[r] == 0) zeros++;
            while (zeros > target) { if (nums[l] == 0) zeros--; l++; }
            best = Math.max(best, r - l + 1);
        }
        return best;`,
    cpp: `        int l = 0, zeros = 0, best = 0;
        for (int r = 0; r < (int)nums.size(); r++) {
            if (nums[r] == 0) zeros++;
            while (zeros > target) { if (nums[l] == 0) zeros--; l++; }
            best = max(best, r - l + 1);
        }
        return best;`,
    javascript: `    let l = 0, zeros = 0, best = 0;
    for (let r = 0; r < nums.length; r++) {
        if (nums[r] === 0) zeros++;
        while (zeros > target) { if (nums[l] === 0) zeros--; l++; }
        best = Math.max(best, r - l + 1);
    }
    return best;`,
  },
};
module.exports = { SOL };
