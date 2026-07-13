// Batch X2: known-correct solutions for batch 30 (famous HARD problems).
// Non-FULL: each body is filled into the language stub by fillStub().
// Python/JS use nested funcs; C++ uses std::function lambdas; Java uses the
// helper-method / instance-field pattern where recursion is required (the
// final closing brace of the helper is supplied by the stub).
const SOL = {
  'n-queens-ii': {
    python: `        all_mask = (1 << n) - 1
        self.count = 0
        def solve(cols, d1, d2):
            if cols == all_mask:
                self.count += 1
                return
            avail = all_mask & ~(cols | d1 | d2)
            while avail:
                p = avail & (-avail)
                avail -= p
                solve(cols | p, (d1 | p) << 1, (d2 | p) >> 1)
        solve(0, 0, 0)
        return self.count`,
    javascript: `    const all = (1 << n) - 1;
    let count = 0;
    const solve = (cols, d1, d2) => {
        if (cols === all) { count++; return; }
        let avail = all & ~(cols | d1 | d2);
        while (avail) {
            const p = avail & (-avail);
            avail -= p;
            solve(cols | p, (d1 | p) << 1, (d2 | p) >> 1);
        }
    };
    solve(0, 0, 0);
    return count;`,
    cpp: `        int all = (1 << n) - 1;
        int count = 0;
        function<void(int,int,int)> solve = [&](int cols, int d1, int d2) {
            if (cols == all) { count++; return; }
            int avail = all & ~(cols | d1 | d2);
            while (avail) {
                int p = avail & (-avail);
                avail -= p;
                solve(cols | p, (d1 | p) << 1, (d2 | p) >> 1);
            }
        };
        solve(0, 0, 0);
        return count;`,
    java: `        count = 0;
        all = (1 << n) - 1;
        solve(0, 0, 0);
        return count;
    }
    int count, all;
    private void solve(int cols, int d1, int d2) {
        if (cols == all) { count++; return; }
        int avail = all & ~(cols | d1 | d2);
        while (avail != 0) {
            int p = avail & (-avail);
            avail -= p;
            solve(cols | p, (d1 | p) << 1, (d2 | p) >> 1);
        }`,
  },
  'integer-replacement': {
    python: `        m = n
        count = 0
        while m != 1:
            if m % 2 == 0:
                m //= 2
            elif m == 3 or m % 4 == 1:
                m -= 1
            else:
                m += 1
            count += 1
        return count`,
    javascript: `    let m = n, count = 0;
    while (m !== 1) {
        if (m % 2 === 0) m = Math.floor(m / 2);
        else if (m === 3 || m % 4 === 1) m -= 1;
        else m += 1;
        count++;
    }
    return count;`,
    cpp: `        long long m = n;
        int count = 0;
        while (m != 1) {
            if (m % 2 == 0) m /= 2;
            else if (m == 3 || m % 4 == 1) m -= 1;
            else m += 1;
            count++;
        }
        return count;`,
    java: `        long m = n;
        int count = 0;
        while (m != 1) {
            if (m % 2 == 0) m /= 2;
            else if (m == 3 || m % 4 == 1) m -= 1;
            else m += 1;
            count++;
        }
        return count;`,
  },
  'consecutive-numbers-sum': {
    python: `        count = 0
        k = 1
        while k * (k - 1) // 2 < n:
            rem = n - k * (k - 1) // 2
            if rem % k == 0:
                count += 1
            k += 1
        return count`,
    javascript: `    let count = 0, k = 1;
    while (k * (k - 1) / 2 < n) {
        const rem = n - k * (k - 1) / 2;
        if (rem % k === 0) count++;
        k++;
    }
    return count;`,
    cpp: `        long long count = 0, k = 1;
        while (k * (k - 1) / 2 < n) {
            long long rem = (long long)n - k * (k - 1) / 2;
            if (rem % k == 0) count++;
            k++;
        }
        return (int)count;`,
    java: `        int count = 0;
        long k = 1;
        while (k * (k - 1) / 2 < n) {
            long rem = n - k * (k - 1) / 2;
            if (rem % k == 0) count++;
            k++;
        }
        return count;`,
  },
  'numbers-with-repeated-digits': {
    python: `        count = 0
        for i in range(1, n + 1):
            seen = 0
            dup = False
            x = i
            while x > 0:
                b = 1 << (x % 10)
                if seen & b:
                    dup = True
                    break
                seen |= b
                x //= 10
            if dup:
                count += 1
        return count`,
    javascript: `    let count = 0;
    for (let i = 1; i <= n; i++) {
        let seen = 0, dup = false, x = i;
        while (x > 0) {
            const b = 1 << (x % 10);
            if (seen & b) { dup = true; break; }
            seen |= b;
            x = Math.floor(x / 10);
        }
        if (dup) count++;
    }
    return count;`,
    cpp: `        int count = 0;
        for (int i = 1; i <= n; i++) {
            int seen = 0, x = i; bool dup = false;
            while (x > 0) {
                int b = 1 << (x % 10);
                if (seen & b) { dup = true; break; }
                seen |= b;
                x /= 10;
            }
            if (dup) count++;
        }
        return count;`,
    java: `        int count = 0;
        for (int i = 1; i <= n; i++) {
            int seen = 0, x = i; boolean dup = false;
            while (x > 0) {
                int b = 1 << (x % 10);
                if ((seen & b) != 0) { dup = true; break; }
                seen |= b;
                x /= 10;
            }
            if (dup) count++;
        }
        return count;`,
  },
  'super-egg-drop': {
    python: `        k, floors = a, b
        dp = [0] * (k + 1)
        m = 0
        while dp[k] < floors:
            m += 1
            for e in range(k, 0, -1):
                dp[e] = dp[e] + dp[e - 1] + 1
        return m`,
    javascript: `    const k = a, floors = b;
    const dp = new Array(k + 1).fill(0);
    let m = 0;
    while (dp[k] < floors) {
        m++;
        for (let e = k; e >= 1; e--) dp[e] = dp[e] + dp[e - 1] + 1;
    }
    return m;`,
    cpp: `        int k = a, floors = b;
        vector<int> dp(k + 1, 0);
        int m = 0;
        while (dp[k] < floors) {
            m++;
            for (int e = k; e >= 1; e--) dp[e] = dp[e] + dp[e - 1] + 1;
        }
        return m;`,
    java: `        int k = a, floors = b;
        int[] dp = new int[k + 1];
        int m = 0;
        while (dp[k] < floors) {
            m++;
            for (int e = k; e >= 1; e--) dp[e] = dp[e] + dp[e - 1] + 1;
        }
        return m;`,
  },
  'largest-multiple-of-three': {
    python: `        d = sorted(nums)
        s = sum(d)
        r = s % 3
        if r != 0:
            idx = -1
            for i in range(len(d)):
                if d[i] % 3 == r:
                    idx = i
                    break
            if idx >= 0:
                d.pop(idx)
            else:
                need = 3 - r
                removed = 0
                i = 0
                while i < len(d) and removed < 2:
                    if d[i] % 3 == need:
                        d.pop(i)
                        removed += 1
                    else:
                        i += 1
                if removed < 2:
                    return -1
        if not d:
            return -1
        d.sort(reverse=True)
        if d[0] == 0:
            return 0
        val = 0
        for x in d:
            val = val * 10 + x
        return val`,
    javascript: `    const d = nums.slice().sort((x, y) => x - y);
    let s = 0;
    for (let i = 0; i < d.length; i++) s += d[i];
    const r = s % 3;
    if (r !== 0) {
        let idx = -1;
        for (let i = 0; i < d.length; i++) if (d[i] % 3 === r) { idx = i; break; }
        if (idx >= 0) d.splice(idx, 1);
        else {
            const need = 3 - r;
            let removed = 0, i = 0;
            while (i < d.length && removed < 2) {
                if (d[i] % 3 === need) { d.splice(i, 1); removed++; }
                else i++;
            }
            if (removed < 2) return -1;
        }
    }
    if (d.length === 0) return -1;
    d.sort((x, y) => y - x);
    if (d[0] === 0) return 0;
    let val = 0;
    for (let i = 0; i < d.length; i++) val = val * 10 + d[i];
    return val;`,
    cpp: `        vector<int> d = nums;
        sort(d.begin(), d.end());
        int s = 0;
        for (int v : d) s += v;
        int r = s % 3;
        if (r != 0) {
            int idx = -1;
            for (int i = 0; i < (int)d.size(); i++) if (d[i] % 3 == r) { idx = i; break; }
            if (idx >= 0) d.erase(d.begin() + idx);
            else {
                int need = 3 - r, removed = 0, i = 0;
                while (i < (int)d.size() && removed < 2) {
                    if (d[i] % 3 == need) { d.erase(d.begin() + i); removed++; }
                    else i++;
                }
                if (removed < 2) return -1;
            }
        }
        if (d.empty()) return -1;
        sort(d.rbegin(), d.rend());
        if (d[0] == 0) return 0;
        long long val = 0;
        for (int x : d) val = val * 10 + x;
        return (int)val;`,
    java: `        List<Integer> d = new ArrayList<>();
        for (int v : nums) d.add(v);
        Collections.sort(d);
        int s = 0;
        for (int v : d) s += v;
        int r = s % 3;
        if (r != 0) {
            int idx = -1;
            for (int i = 0; i < d.size(); i++) if (d.get(i) % 3 == r) { idx = i; break; }
            if (idx >= 0) d.remove(idx);
            else {
                int need = 3 - r, removed = 0, i = 0;
                while (i < d.size() && removed < 2) {
                    if (d.get(i) % 3 == need) { d.remove(i); removed++; }
                    else i++;
                }
                if (removed < 2) return -1;
            }
        }
        if (d.isEmpty()) return -1;
        d.sort(Collections.reverseOrder());
        if (d.get(0) == 0) return 0;
        long val = 0;
        for (int x : d) val = val * 10 + x;
        return (int) val;`,
  },
  'self-crossing': {
    python: `        x = nums
        n = len(x)
        for i in range(3, n):
            if x[i] >= x[i - 2] and x[i - 1] <= x[i - 3]:
                return True
            if i >= 4 and x[i - 1] == x[i - 3] and x[i] + x[i - 4] >= x[i - 2]:
                return True
            if i >= 5 and x[i - 2] >= x[i - 4] and x[i] + x[i - 4] >= x[i - 2] and x[i - 1] <= x[i - 3] and x[i - 1] + x[i - 5] >= x[i - 3]:
                return True
        return False`,
    javascript: `    const x = nums, n = x.length;
    for (let i = 3; i < n; i++) {
        if (x[i] >= x[i - 2] && x[i - 1] <= x[i - 3]) return true;
        if (i >= 4 && x[i - 1] === x[i - 3] && x[i] + x[i - 4] >= x[i - 2]) return true;
        if (i >= 5 && x[i - 2] >= x[i - 4] && x[i] + x[i - 4] >= x[i - 2] && x[i - 1] <= x[i - 3] && x[i - 1] + x[i - 5] >= x[i - 3]) return true;
    }
    return false;`,
    cpp: `        vector<int>& x = nums;
        int n = x.size();
        for (int i = 3; i < n; i++) {
            if (x[i] >= x[i - 2] && x[i - 1] <= x[i - 3]) return true;
            if (i >= 4 && x[i - 1] == x[i - 3] && x[i] + x[i - 4] >= x[i - 2]) return true;
            if (i >= 5 && x[i - 2] >= x[i - 4] && x[i] + x[i - 4] >= x[i - 2] && x[i - 1] <= x[i - 3] && x[i - 1] + x[i - 5] >= x[i - 3]) return true;
        }
        return false;`,
    java: `        int[] x = nums;
        int n = x.length;
        for (int i = 3; i < n; i++) {
            if (x[i] >= x[i - 2] && x[i - 1] <= x[i - 3]) return true;
            if (i >= 4 && x[i - 1] == x[i - 3] && x[i] + x[i - 4] >= x[i - 2]) return true;
            if (i >= 5 && x[i - 2] >= x[i - 4] && x[i] + x[i - 4] >= x[i - 2] && x[i - 1] <= x[i - 3] && x[i - 1] + x[i - 5] >= x[i - 3]) return true;
        }
        return false;`,
  },
  'minimum-cost-to-merge-stones': {
    python: `        stones = nums
        n = len(stones)
        if k < 2 or (n - 1) % (k - 1) != 0:
            return -1
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + stones[i]
        dp = [[0] * n for _ in range(n)]
        for length in range(k, n + 1):
            for i in range(0, n - length + 1):
                j = i + length - 1
                best = float('inf')
                mid = i
                while mid < j:
                    best = min(best, dp[i][mid] + dp[mid + 1][j])
                    mid += k - 1
                dp[i][j] = best
                if (length - 1) % (k - 1) == 0:
                    dp[i][j] += prefix[j + 1] - prefix[i]
        return dp[0][n - 1]`,
    javascript: `    const stones = nums, n = stones.length;
    if (k < 2 || (n - 1) % (k - 1) !== 0) return -1;
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stones[i];
    const dp = [];
    for (let i = 0; i < n; i++) dp.push(new Array(n).fill(0));
    for (let length = k; length <= n; length++) {
        for (let i = 0; i + length - 1 < n; i++) {
            const j = i + length - 1;
            let best = Infinity;
            for (let mid = i; mid < j; mid += k - 1) best = Math.min(best, dp[i][mid] + dp[mid + 1][j]);
            dp[i][j] = best;
            if ((length - 1) % (k - 1) === 0) dp[i][j] += prefix[j + 1] - prefix[i];
        }
    }
    return dp[0][n - 1];`,
    cpp: `        vector<int>& stones = nums;
        int n = stones.size();
        if (k < 2 || (n - 1) % (k - 1) != 0) return -1;
        vector<int> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stones[i];
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int length = k; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                int best = INT_MAX;
                for (int mid = i; mid < j; mid += k - 1) best = min(best, dp[i][mid] + dp[mid + 1][j]);
                dp[i][j] = best;
                if ((length - 1) % (k - 1) == 0) dp[i][j] += prefix[j + 1] - prefix[i];
            }
        }
        return dp[0][n - 1];`,
    java: `        int[] stones = nums;
        int n = stones.length;
        if (k < 2 || (n - 1) % (k - 1) != 0) return -1;
        int[] prefix = new int[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stones[i];
        int[][] dp = new int[n][n];
        for (int length = k; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                int best = Integer.MAX_VALUE;
                for (int mid = i; mid < j; mid += k - 1) best = Math.min(best, dp[i][mid] + dp[mid + 1][j]);
                dp[i][j] = best;
                if ((length - 1) % (k - 1) == 0) dp[i][j] += prefix[j + 1] - prefix[i];
            }
        }
        return dp[0][n - 1];`,
  },
  'matchsticks-to-square': {
    python: `        m = nums
        n = len(m)
        total = sum(m)
        if n < 4 or total % 4 != 0:
            return False
        side = total // 4
        arr = sorted(m, reverse=True)
        if arr[0] > side:
            return False
        sides = [0, 0, 0, 0]
        def dfs(idx):
            if idx == n:
                return True
            for s in range(4):
                if s > 0 and sides[s] == sides[s - 1]:
                    continue
                if sides[s] + arr[idx] <= side:
                    sides[s] += arr[idx]
                    if dfs(idx + 1):
                        return True
                    sides[s] -= arr[idx]
            return False
        return dfs(0)`,
    javascript: `    const m = nums, n = m.length;
    let total = 0;
    for (let i = 0; i < n; i++) total += m[i];
    if (n < 4 || total % 4 !== 0) return false;
    const side = total / 4;
    const arr = m.slice().sort((x, y) => y - x);
    if (arr[0] > side) return false;
    const sides = [0, 0, 0, 0];
    const dfs = (idx) => {
        if (idx === n) return true;
        for (let s = 0; s < 4; s++) {
            if (s > 0 && sides[s] === sides[s - 1]) continue;
            if (sides[s] + arr[idx] <= side) {
                sides[s] += arr[idx];
                if (dfs(idx + 1)) return true;
                sides[s] -= arr[idx];
            }
        }
        return false;
    };
    return dfs(0);`,
    cpp: `        vector<int> arr = nums;
        int n = arr.size();
        long long total = 0;
        for (int v : arr) total += v;
        if (n < 4 || total % 4 != 0) return false;
        long long side = total / 4;
        sort(arr.rbegin(), arr.rend());
        if (arr[0] > side) return false;
        vector<long long> sides(4, 0);
        function<bool(int)> dfs = [&](int idx) -> bool {
            if (idx == n) return true;
            for (int s = 0; s < 4; s++) {
                if (s > 0 && sides[s] == sides[s - 1]) continue;
                if (sides[s] + arr[idx] <= side) {
                    sides[s] += arr[idx];
                    if (dfs(idx + 1)) return true;
                    sides[s] -= arr[idx];
                }
            }
            return false;
        };
        return dfs(0);`,
    java: `        int n = nums.length;
        long total = 0;
        for (int v : nums) total += v;
        if (n < 4 || total % 4 != 0) return false;
        sideLen = total / 4;
        arr = nums.clone();
        Arrays.sort(arr);
        for (int i = 0; i < n / 2; i++) { int t = arr[i]; arr[i] = arr[n - 1 - i]; arr[n - 1 - i] = t; }
        if (arr[0] > sideLen) return false;
        sides = new long[4];
        return dfs(0);
    }
    long[] sides;
    long sideLen;
    int[] arr;
    private boolean dfs(int idx) {
        if (idx == arr.length) return true;
        for (int s = 0; s < 4; s++) {
            if (s > 0 && sides[s] == sides[s - 1]) continue;
            if (sides[s] + arr[idx] <= sideLen) {
                sides[s] += arr[idx];
                if (dfs(idx + 1)) return true;
                sides[s] -= arr[idx];
            }
        }
        return false;`,
  },
  'minimum-number-of-taps-to-open-to-water-a-garden': {
    python: `        ranges = nums
        n = k
        max_reach = [0] * (n + 1)
        for i in range(len(ranges)):
            l = max(0, i - ranges[i])
            r = min(n, i + ranges[i])
            if r > max_reach[l]:
                max_reach[l] = r
        taps = 0
        cur = 0
        nxt = 0
        p = 0
        while cur < n:
            while p <= cur:
                if max_reach[p] > nxt:
                    nxt = max_reach[p]
                p += 1
            if nxt <= cur:
                return -1
            taps += 1
            cur = nxt
        return taps`,
    javascript: `    const ranges = nums, n = k;
    const maxReach = new Array(n + 1).fill(0);
    for (let i = 0; i < ranges.length; i++) {
        const l = Math.max(0, i - ranges[i]), r = Math.min(n, i + ranges[i]);
        if (r > maxReach[l]) maxReach[l] = r;
    }
    let taps = 0, cur = 0, nxt = 0, p = 0;
    while (cur < n) {
        while (p <= cur) { if (maxReach[p] > nxt) nxt = maxReach[p]; p++; }
        if (nxt <= cur) return -1;
        taps++;
        cur = nxt;
    }
    return taps;`,
    cpp: `        vector<int>& ranges = nums;
        int n = k;
        vector<int> maxReach(n + 1, 0);
        for (int i = 0; i < (int)ranges.size(); i++) {
            int l = max(0, i - ranges[i]), r = min(n, i + ranges[i]);
            if (r > maxReach[l]) maxReach[l] = r;
        }
        int taps = 0, cur = 0, nxt = 0, p = 0;
        while (cur < n) {
            while (p <= cur) { if (maxReach[p] > nxt) nxt = maxReach[p]; p++; }
            if (nxt <= cur) return -1;
            taps++;
            cur = nxt;
        }
        return taps;`,
    java: `        int[] ranges = nums;
        int n = k;
        int[] maxReach = new int[n + 1];
        for (int i = 0; i < ranges.length; i++) {
            int l = Math.max(0, i - ranges[i]), r = Math.min(n, i + ranges[i]);
            if (r > maxReach[l]) maxReach[l] = r;
        }
        int taps = 0, cur = 0, nxt = 0, p = 0;
        while (cur < n) {
            while (p <= cur) { if (maxReach[p] > nxt) nxt = maxReach[p]; p++; }
            if (nxt <= cur) return -1;
            taps++;
            cur = nxt;
        }
        return taps;`,
  },
  'max-points-on-a-line': {
    python: `        import math
        pts = grid
        n = len(pts)
        if n <= 2:
            return n
        best = 1
        for i in range(n):
            slopes = {}
            for j in range(n):
                if i == j:
                    continue
                dx = pts[j][0] - pts[i][0]
                dy = pts[j][1] - pts[i][1]
                g = math.gcd(dx, dy)
                if g != 0:
                    dx //= g
                    dy //= g
                if dx < 0 or (dx == 0 and dy < 0):
                    dx, dy = -dx, -dy
                key = (dx, dy)
                slopes[key] = slopes.get(key, 0) + 1
                if slopes[key] + 1 > best:
                    best = slopes[key] + 1
        return best`,
    javascript: `    const pts = grid, n = pts.length;
    if (n <= 2) return n;
    const gg = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; };
    let best = 1;
    for (let i = 0; i < n; i++) {
        const slopes = {};
        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            let dx = pts[j][0] - pts[i][0], dy = pts[j][1] - pts[i][1];
            const g = gg(dx, dy);
            if (g !== 0) { dx = dx / g; dy = dy / g; }
            if (dx < 0 || (dx === 0 && dy < 0)) { dx = -dx; dy = -dy; }
            const key = dx + ',' + dy;
            slopes[key] = (slopes[key] || 0) + 1;
            if (slopes[key] + 1 > best) best = slopes[key] + 1;
        }
    }
    return best;`,
    cpp: `        int n = grid.size();
        if (n <= 2) return n;
        int best = 1;
        for (int i = 0; i < n; i++) {
            unordered_map<string,int> slopes;
            for (int j = 0; j < n; j++) {
                if (i == j) continue;
                int dx = grid[j][0] - grid[i][0], dy = grid[j][1] - grid[i][1];
                int ga = abs(dx), gb = abs(dy);
                while (gb) { int t = ga % gb; ga = gb; gb = t; }
                int g = ga;
                if (g != 0) { dx /= g; dy /= g; }
                if (dx < 0 || (dx == 0 && dy < 0)) { dx = -dx; dy = -dy; }
                string key = to_string(dx) + "," + to_string(dy);
                slopes[key]++;
                if (slopes[key] + 1 > best) best = slopes[key] + 1;
            }
        }
        return best;`,
    java: `        int n = grid.length;
        if (n <= 2) return n;
        int best = 1;
        for (int i = 0; i < n; i++) {
            Map<String,Integer> slopes = new HashMap<>();
            for (int j = 0; j < n; j++) {
                if (i == j) continue;
                int dx = grid[j][0] - grid[i][0], dy = grid[j][1] - grid[i][1];
                int g = gcd(Math.abs(dx), Math.abs(dy));
                if (g != 0) { dx /= g; dy /= g; }
                if (dx < 0 || (dx == 0 && dy < 0)) { dx = -dx; dy = -dy; }
                String key = dx + "," + dy;
                int c = slopes.getOrDefault(key, 0) + 1;
                slopes.put(key, c);
                if (c + 1 > best) best = c + 1;
            }
        }
        return best;
    }
    private int gcd(int a, int b) {
        while (b != 0) { int t = a % b; a = b; b = t; }
        return a;`,
  },
  'stone-game-ii': {
    python: `        piles = nums
        n = len(piles)
        suf = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            suf[i] = suf[i + 1] + piles[i]
        M = 2 * n + 2
        dp = [[0] * M for _ in range(n + 1)]
        for i in range(n - 1, -1, -1):
            for m in range(1, M):
                if i + 2 * m >= n:
                    dp[i][m] = suf[i]
                else:
                    best = 0
                    for x in range(1, 2 * m + 1):
                        mm = m if m > x else x
                        val = suf[i] - dp[i + x][mm]
                        if val > best:
                            best = val
                    dp[i][m] = best
        return dp[0][1]`,
    javascript: `    const piles = nums, n = piles.length;
    const suf = new Array(n + 1).fill(0);
    for (let i = n - 1; i >= 0; i--) suf[i] = suf[i + 1] + piles[i];
    const M = 2 * n + 2;
    const dp = [];
    for (let i = 0; i <= n; i++) dp.push(new Array(M).fill(0));
    for (let i = n - 1; i >= 0; i--) {
        for (let m = 1; m < M; m++) {
            if (i + 2 * m >= n) dp[i][m] = suf[i];
            else {
                let best = 0;
                for (let x = 1; x <= 2 * m; x++) {
                    const mm = m > x ? m : x;
                    const val = suf[i] - dp[i + x][mm];
                    if (val > best) best = val;
                }
                dp[i][m] = best;
            }
        }
    }
    return dp[0][1];`,
    cpp: `        vector<int>& piles = nums;
        int n = piles.size();
        vector<long long> suf(n + 1, 0);
        for (int i = n - 1; i >= 0; i--) suf[i] = suf[i + 1] + piles[i];
        int M = 2 * n + 2;
        vector<vector<long long>> dp(n + 1, vector<long long>(M, 0));
        for (int i = n - 1; i >= 0; i--) {
            for (int m = 1; m < M; m++) {
                if (i + 2 * m >= n) dp[i][m] = suf[i];
                else {
                    long long best = 0;
                    for (int x = 1; x <= 2 * m; x++) {
                        int mm = m > x ? m : x;
                        long long val = suf[i] - dp[i + x][mm];
                        if (val > best) best = val;
                    }
                    dp[i][m] = best;
                }
            }
        }
        return (int)dp[0][1];`,
    java: `        int[] piles = nums;
        int n = piles.length;
        long[] suf = new long[n + 1];
        for (int i = n - 1; i >= 0; i--) suf[i] = suf[i + 1] + piles[i];
        int M = 2 * n + 2;
        long[][] dp = new long[n + 1][M];
        for (int i = n - 1; i >= 0; i--) {
            for (int m = 1; m < M; m++) {
                if (i + 2 * m >= n) dp[i][m] = suf[i];
                else {
                    long best = 0;
                    for (int x = 1; x <= 2 * m; x++) {
                        int mm = m > x ? m : x;
                        long val = suf[i] - dp[i + x][mm];
                        if (val > best) best = val;
                    }
                    dp[i][m] = best;
                }
            }
        }
        return (int) dp[0][1];`,
  },
  'stone-game-iii': {
    python: `        s = nums
        n = len(s)
        dp = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            take = 0
            best = float('-inf')
            for x in range(3):
                if i + x < n:
                    take += s[i + x]
                    val = take - dp[i + x + 1]
                    if val > best:
                        best = val
            dp[i] = best
        return dp[0]`,
    javascript: `    const s = nums, n = s.length;
    const dp = new Array(n + 1).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        let take = 0, best = -Infinity;
        for (let x = 0; x < 3 && i + x < n; x++) {
            take += s[i + x];
            const val = take - dp[i + x + 1];
            if (val > best) best = val;
        }
        dp[i] = best;
    }
    return dp[0];`,
    cpp: `        vector<int>& s = nums;
        int n = s.size();
        vector<int> dp(n + 1, 0);
        for (int i = n - 1; i >= 0; i--) {
            int take = 0, best = INT_MIN;
            for (int x = 0; x < 3 && i + x < n; x++) {
                take += s[i + x];
                int val = take - dp[i + x + 1];
                if (val > best) best = val;
            }
            dp[i] = best;
        }
        return dp[0];`,
    java: `        int[] s = nums;
        int n = s.length;
        int[] dp = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            int take = 0, best = Integer.MIN_VALUE;
            for (int x = 0; x < 3 && i + x < n; x++) {
                take += s[i + x];
                int val = take - dp[i + x + 1];
                if (val > best) best = val;
            }
            dp[i] = best;
        }
        return dp[0];`,
  },
  'predict-the-winner': {
    python: `        n = len(nums)
        if n == 0:
            return True
        dp = [[0] * n for _ in range(n)]
        for i in range(n):
            dp[i][i] = nums[i]
        for length in range(2, n + 1):
            for i in range(0, n - length + 1):
                j = i + length - 1
                dp[i][j] = max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1])
        return dp[0][n - 1] >= 0`,
    javascript: `    const n = nums.length;
    if (n === 0) return true;
    const dp = [];
    for (let i = 0; i < n; i++) { dp.push(new Array(n).fill(0)); dp[i][i] = nums[i]; }
    for (let length = 2; length <= n; length++) {
        for (let i = 0; i + length - 1 < n; i++) {
            const j = i + length - 1;
            dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
        }
    }
    return dp[0][n - 1] >= 0;`,
    cpp: `        int n = nums.size();
        if (n == 0) return true;
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int i = 0; i < n; i++) dp[i][i] = nums[i];
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                dp[i][j] = max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
            }
        }
        return dp[0][n - 1] >= 0;`,
    java: `        int n = nums.length;
        if (n == 0) return true;
        int[][] dp = new int[n][n];
        for (int i = 0; i < n; i++) dp[i][i] = nums[i];
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
            }
        }
        return dp[0][n - 1] >= 0;`,
  },
};

module.exports = { SOL };
