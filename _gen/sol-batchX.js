// Batch X: known-correct solutions for batch 26 (HARD arrays / DP / grids).
// Python & JS use nested functions where recursion is needed; C++ uses
// std::function lambdas; Java uses instance fields + a helper method whose
// final closing brace is supplied by the stub.
const SOL = {
  'best-time-to-buy-and-sell-stock-iii': {
    python: `        buy1 = buy2 = float('-inf')
        sell1 = sell2 = 0
        for p in nums:
            buy1 = max(buy1, -p)
            sell1 = max(sell1, buy1 + p)
            buy2 = max(buy2, sell1 - p)
            sell2 = max(sell2, buy2 + p)
        return sell2`,
    javascript: `    let buy1 = -Infinity, sell1 = 0, buy2 = -Infinity, sell2 = 0;
    for (const p of nums) {
        buy1 = Math.max(buy1, -p);
        sell1 = Math.max(sell1, buy1 + p);
        buy2 = Math.max(buy2, sell1 - p);
        sell2 = Math.max(sell2, buy2 + p);
    }
    return sell2;`,
    cpp: `        long long buy1 = -1000000000LL, sell1 = 0, buy2 = -1000000000LL, sell2 = 0;
        for (int p : nums) {
            buy1 = max(buy1, (long long)-p);
            sell1 = max(sell1, buy1 + p);
            buy2 = max(buy2, sell1 - p);
            sell2 = max(sell2, buy2 + p);
        }
        return (int)sell2;`,
    java: `        long buy1 = -1000000000L, sell1 = 0, buy2 = -1000000000L, sell2 = 0;
        for (int p : nums) {
            buy1 = Math.max(buy1, (long)-p);
            sell1 = Math.max(sell1, buy1 + p);
            buy2 = Math.max(buy2, sell1 - p);
            sell2 = Math.max(sell2, buy2 + p);
        }
        return (int)sell2;`,
  },
  'best-time-to-buy-and-sell-stock-iv': {
    python: `        n = len(nums)
        if k == 0 or n == 0:
            return 0
        buy = [float('-inf')] * (k + 1)
        sell = [0] * (k + 1)
        for p in nums:
            for j in range(1, k + 1):
                buy[j] = max(buy[j], sell[j - 1] - p)
                sell[j] = max(sell[j], buy[j] + p)
        return sell[k]`,
    javascript: `    const n = nums.length;
    if (k === 0 || n === 0) return 0;
    const buy = new Array(k + 1).fill(-Infinity);
    const sell = new Array(k + 1).fill(0);
    for (const p of nums) {
        for (let j = 1; j <= k; j++) {
            buy[j] = Math.max(buy[j], sell[j - 1] - p);
            sell[j] = Math.max(sell[j], buy[j] + p);
        }
    }
    return sell[k];`,
    cpp: `        int n = nums.size();
        if (k == 0 || n == 0) return 0;
        vector<long long> buy(k + 1, -1000000000LL), sell(k + 1, 0);
        for (int p : nums) {
            for (int j = 1; j <= k; j++) {
                buy[j] = max(buy[j], sell[j - 1] - p);
                sell[j] = max(sell[j], buy[j] + p);
            }
        }
        return (int)sell[k];`,
    java: `        int n = nums.length;
        if (k == 0 || n == 0) return 0;
        long[] buy = new long[k + 1];
        long[] sell = new long[k + 1];
        Arrays.fill(buy, -1000000000L);
        for (int p : nums) {
            for (int j = 1; j <= k; j++) {
                buy[j] = Math.max(buy[j], sell[j - 1] - p);
                sell[j] = Math.max(sell[j], buy[j] + p);
            }
        }
        return (int)sell[k];`,
  },
  'maximum-gap': {
    python: `        if len(nums) < 2:
            return 0
        s = sorted(nums)
        best = 0
        for i in range(1, len(s)):
            best = max(best, s[i] - s[i - 1])
        return best`,
    javascript: `    if (nums.length < 2) return 0;
    const s = nums.slice().sort((a, b) => a - b);
    let best = 0;
    for (let i = 1; i < s.length; i++) best = Math.max(best, s[i] - s[i - 1]);
    return best;`,
    cpp: `        if (nums.size() < 2) return 0;
        vector<int> s = nums;
        sort(s.begin(), s.end());
        int best = 0;
        for (size_t i = 1; i < s.size(); i++) best = max(best, s[i] - s[i - 1]);
        return best;`,
    java: `        if (nums.length < 2) return 0;
        int[] s = nums.clone();
        Arrays.sort(s);
        int best = 0;
        for (int i = 1; i < s.length; i++) best = Math.max(best, s[i] - s[i - 1]);
        return best;`,
  },
  'reverse-pairs': {
    python: `        n = len(nums)
        c = 0
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] > 2 * nums[j]:
                    c += 1
        return c`,
    javascript: `    const n = nums.length;
    let c = 0;
    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++)
            if (nums[i] > 2 * nums[j]) c++;
    return c;`,
    cpp: `        int n = nums.size();
        int c = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if ((long long)nums[i] > 2LL * nums[j]) c++;
        return c;`,
    java: `        int n = nums.length;
        int c = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if ((long)nums[i] > 2L * nums[j]) c++;
        return c;`,
  },
  'maximal-rectangle': {
    python: `        if not grid or not grid[0]:
            return 0
        C = len(grid[0])
        heights = [0] * C
        best = 0
        for row in grid:
            for c in range(C):
                heights[c] = heights[c] + 1 if row[c] == '1' else 0
            st = []
            for i in range(C + 1):
                h = 0 if i == C else heights[i]
                while st and heights[st[-1]] >= h:
                    top = st.pop()
                    width = i - st[-1] - 1 if st else i
                    best = max(best, heights[top] * width)
                st.append(i)
        return best`,
    javascript: `    if (!grid.length || !grid[0].length) return 0;
    const C = grid[0].length;
    const heights = new Array(C).fill(0);
    let best = 0;
    for (const row of grid) {
        for (let c = 0; c < C; c++) heights[c] = row[c] === '1' ? heights[c] + 1 : 0;
        const st = [];
        for (let i = 0; i <= C; i++) {
            const h = i === C ? 0 : heights[i];
            while (st.length && heights[st[st.length - 1]] >= h) {
                const top = st.pop();
                const width = st.length ? i - st[st.length - 1] - 1 : i;
                best = Math.max(best, heights[top] * width);
            }
            st.push(i);
        }
    }
    return best;`,
    cpp: `        if (grid.empty() || grid[0].empty()) return 0;
        int C = grid[0].size();
        vector<int> heights(C, 0);
        int best = 0;
        for (auto& row : grid) {
            for (int c = 0; c < C; c++) heights[c] = row[c] == '1' ? heights[c] + 1 : 0;
            vector<int> st;
            for (int i = 0; i <= C; i++) {
                int h = i == C ? 0 : heights[i];
                while (!st.empty() && heights[st.back()] >= h) {
                    int top = st.back(); st.pop_back();
                    int width = st.empty() ? i : i - st.back() - 1;
                    best = max(best, heights[top] * width);
                }
                st.push_back(i);
            }
        }
        return best;`,
    java: `        if (grid.length == 0 || grid[0].length == 0) return 0;
        int C = grid[0].length;
        int[] heights = new int[C];
        int best = 0;
        for (char[] row : grid) {
            for (int c = 0; c < C; c++) heights[c] = row[c] == '1' ? heights[c] + 1 : 0;
            Deque<Integer> st = new ArrayDeque<>();
            for (int i = 0; i <= C; i++) {
                int h = i == C ? 0 : heights[i];
                while (!st.isEmpty() && heights[st.peek()] >= h) {
                    int top = st.pop();
                    int width = st.isEmpty() ? i : i - st.peek() - 1;
                    best = Math.max(best, heights[top] * width);
                }
                st.push(i);
            }
        }
        return best;`,
  },
  'russian-doll-envelopes': {
    python: `        import bisect
        env = sorted(grid, key=lambda x: (x[0], -x[1]))
        tails = []
        for w, h in env:
            i = bisect.bisect_left(tails, h)
            if i == len(tails):
                tails.append(h)
            else:
                tails[i] = h
        return len(tails)`,
    javascript: `    const env = grid.slice().sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    const tails = [];
    for (const e of env) {
        const h = e[1];
        let lo = 0, hi = tails.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (tails[mid] < h) lo = mid + 1;
            else hi = mid;
        }
        tails[lo] = h;
    }
    return tails.length;`,
    cpp: `        vector<vector<int>> env = grid;
        sort(env.begin(), env.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] != b[0] ? a[0] < b[0] : a[1] > b[1];
        });
        vector<int> tails;
        for (auto& e : env) {
            int h = e[1];
            auto it = lower_bound(tails.begin(), tails.end(), h);
            if (it == tails.end()) tails.push_back(h);
            else *it = h;
        }
        return (int)tails.size();`,
    java: `        int[][] env = grid.clone();
        Arrays.sort(env, (a, b) -> a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]);
        int[] tails = new int[env.length];
        int size = 0;
        for (int[] e : env) {
            int h = e[1];
            int lo = 0, hi = size;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (tails[mid] < h) lo = mid + 1;
                else hi = mid;
            }
            tails[lo] = h;
            if (lo == size) size++;
        }
        return size;`,
  },
  'palindrome-partitioning-ii': {
    python: `        n = len(s)
        if n <= 1:
            return 0
        pal = [[False] * n for _ in range(n)]
        cut = [0] * n
        for i in range(n):
            mn = i
            for j in range(i + 1):
                if s[j] == s[i] and (i - j < 2 or pal[j + 1][i - 1]):
                    pal[j][i] = True
                    mn = 0 if j == 0 else min(mn, cut[j - 1] + 1)
            cut[i] = mn
        return cut[n - 1]`,
    javascript: `    const n = s.length;
    if (n <= 1) return 0;
    const pal = Array.from({length: n}, () => new Array(n).fill(false));
    const cut = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        let mn = i;
        for (let j = 0; j <= i; j++) {
            if (s[j] === s[i] && (i - j < 2 || pal[j + 1][i - 1])) {
                pal[j][i] = true;
                mn = j === 0 ? 0 : Math.min(mn, cut[j - 1] + 1);
            }
        }
        cut[i] = mn;
    }
    return cut[n - 1];`,
    cpp: `        int n = s.size();
        if (n <= 1) return 0;
        vector<vector<bool>> pal(n, vector<bool>(n, false));
        vector<int> cut(n, 0);
        for (int i = 0; i < n; i++) {
            int mn = i;
            for (int j = 0; j <= i; j++) {
                if (s[j] == s[i] && (i - j < 2 || pal[j + 1][i - 1])) {
                    pal[j][i] = true;
                    mn = j == 0 ? 0 : min(mn, cut[j - 1] + 1);
                }
            }
            cut[i] = mn;
        }
        return cut[n - 1];`,
    java: `        int n = s.length();
        if (n <= 1) return 0;
        boolean[][] pal = new boolean[n][n];
        int[] cut = new int[n];
        for (int i = 0; i < n; i++) {
            int mn = i;
            for (int j = 0; j <= i; j++) {
                if (s.charAt(j) == s.charAt(i) && (i - j < 2 || pal[j + 1][i - 1])) {
                    pal[j][i] = true;
                    mn = j == 0 ? 0 : Math.min(mn, cut[j - 1] + 1);
                }
            }
            cut[i] = mn;
        }
        return cut[n - 1];`,
  },
  'dungeon-game': {
    python: `        R = len(grid)
        C = len(grid[0])
        INF = float('inf')
        dp = [[INF] * (C + 1) for _ in range(R + 1)]
        dp[R][C - 1] = 1
        dp[R - 1][C] = 1
        for i in range(R - 1, -1, -1):
            for j in range(C - 1, -1, -1):
                need = min(dp[i + 1][j], dp[i][j + 1]) - grid[i][j]
                dp[i][j] = 1 if need <= 0 else need
        return dp[0][0]`,
    javascript: `    const R = grid.length, C = grid[0].length, INF = Infinity;
    const dp = Array.from({length: R + 1}, () => new Array(C + 1).fill(INF));
    dp[R][C - 1] = 1;
    dp[R - 1][C] = 1;
    for (let i = R - 1; i >= 0; i--) {
        for (let j = C - 1; j >= 0; j--) {
            const need = Math.min(dp[i + 1][j], dp[i][j + 1]) - grid[i][j];
            dp[i][j] = need <= 0 ? 1 : need;
        }
    }
    return dp[0][0];`,
    cpp: `        int R = grid.size(), C = grid[0].size();
        const int INF = INT_MAX;
        vector<vector<int>> dp(R + 1, vector<int>(C + 1, INF));
        dp[R][C - 1] = 1;
        dp[R - 1][C] = 1;
        for (int i = R - 1; i >= 0; i--) {
            for (int j = C - 1; j >= 0; j--) {
                int need = min(dp[i + 1][j], dp[i][j + 1]) - grid[i][j];
                dp[i][j] = need <= 0 ? 1 : need;
            }
        }
        return dp[0][0];`,
    java: `        int R = grid.length, C = grid[0].length;
        final int INF = Integer.MAX_VALUE;
        int[][] dp = new int[R + 1][C + 1];
        for (int[] row : dp) Arrays.fill(row, INF);
        dp[R][C - 1] = 1;
        dp[R - 1][C] = 1;
        for (int i = R - 1; i >= 0; i--) {
            for (int j = C - 1; j >= 0; j--) {
                int need = Math.min(dp[i + 1][j], dp[i][j + 1]) - grid[i][j];
                dp[i][j] = need <= 0 ? 1 : need;
            }
        }
        return dp[0][0];`,
  },
  'cherry-pickup-ii': {
    python: `        R = len(grid)
        C = len(grid[0])
        from functools import lru_cache
        @lru_cache(maxsize=None)
        def solve(r, c1, c2):
            if c1 < 0 or c1 >= C or c2 < 0 or c2 >= C:
                return float('-inf')
            cur = grid[r][c1] + (grid[r][c2] if c1 != c2 else 0)
            if r == R - 1:
                return cur
            best = float('-inf')
            for d1 in (-1, 0, 1):
                for d2 in (-1, 0, 1):
                    best = max(best, solve(r + 1, c1 + d1, c2 + d2))
            return cur + best
        return solve(0, 0, C - 1)`,
    javascript: `    const R = grid.length, C = grid[0].length;
    const memo = new Map();
    const solve = (r, c1, c2) => {
        if (c1 < 0 || c1 >= C || c2 < 0 || c2 >= C) return -Infinity;
        const key = (r * 71 + c1) * 71 + c2;
        if (memo.has(key)) return memo.get(key);
        const cur = grid[r][c1] + (c1 !== c2 ? grid[r][c2] : 0);
        if (r === R - 1) { memo.set(key, cur); return cur; }
        let best = -Infinity;
        for (let d1 = -1; d1 <= 1; d1++)
            for (let d2 = -1; d2 <= 1; d2++)
                best = Math.max(best, solve(r + 1, c1 + d1, c2 + d2));
        memo.set(key, cur + best);
        return cur + best;
    };
    return solve(0, 0, C - 1);`,
    cpp: `        int R = grid.size(), C = grid[0].size();
        vector<vector<vector<int>>> memo(R, vector<vector<int>>(C, vector<int>(C, INT_MIN)));
        function<int(int,int,int)> solve = [&](int r, int c1, int c2) -> int {
            if (c1 < 0 || c1 >= C || c2 < 0 || c2 >= C) return INT_MIN;
            if (memo[r][c1][c2] != INT_MIN) return memo[r][c1][c2];
            int cur = grid[r][c1] + (c1 != c2 ? grid[r][c2] : 0);
            if (r == R - 1) return memo[r][c1][c2] = cur;
            int best = INT_MIN;
            for (int d1 = -1; d1 <= 1; d1++)
                for (int d2 = -1; d2 <= 1; d2++) {
                    int nxt = solve(r + 1, c1 + d1, c2 + d2);
                    if (nxt > best) best = nxt;
                }
            return memo[r][c1][c2] = cur + best;
        };
        return solve(0, 0, C - 1);`,
    java: `        this.g = grid;
        this.R = grid.length;
        this.C = grid[0].length;
        this.memo = new Integer[R][C][C];
        return solve(0, 0, C - 1);
    }
    int[][] g;
    int R, C;
    Integer[][][] memo;
    private int solve(int r, int c1, int c2) {
        if (c1 < 0 || c1 >= C || c2 < 0 || c2 >= C) return Integer.MIN_VALUE;
        if (memo[r][c1][c2] != null) return memo[r][c1][c2];
        int cur = g[r][c1] + (c1 != c2 ? g[r][c2] : 0);
        if (r == R - 1) { memo[r][c1][c2] = cur; return cur; }
        int best = Integer.MIN_VALUE;
        for (int d1 = -1; d1 <= 1; d1++)
            for (int d2 = -1; d2 <= 1; d2++)
                best = Math.max(best, solve(r + 1, c1 + d1, c2 + d2));
        memo[r][c1][c2] = cur + best;
        return cur + best;`,
  },
  'minimum-falling-path-sum-ii': {
    python: `        R = len(grid)
        C = len(grid[0])
        prev = grid[0][:]
        for r in range(1, R):
            m1 = float('inf'); i1 = -1; m2 = float('inf')
            for c in range(C):
                if prev[c] < m1:
                    m2 = m1; m1 = prev[c]; i1 = c
                elif prev[c] < m2:
                    m2 = prev[c]
            cur = [0] * C
            for c in range(C):
                cur[c] = grid[r][c] + (m2 if c == i1 else m1)
            prev = cur
        return min(prev)`,
    javascript: `    const R = grid.length, C = grid[0].length;
    let prev = grid[0].slice();
    for (let r = 1; r < R; r++) {
        let m1 = Infinity, i1 = -1, m2 = Infinity;
        for (let c = 0; c < C; c++) {
            if (prev[c] < m1) { m2 = m1; m1 = prev[c]; i1 = c; }
            else if (prev[c] < m2) m2 = prev[c];
        }
        const cur = new Array(C);
        for (let c = 0; c < C; c++) cur[c] = grid[r][c] + (c === i1 ? m2 : m1);
        prev = cur;
    }
    return Math.min.apply(null, prev);`,
    cpp: `        int R = grid.size(), C = grid[0].size();
        vector<int> prev = grid[0];
        for (int r = 1; r < R; r++) {
            int m1 = INT_MAX, i1 = -1, m2 = INT_MAX;
            for (int c = 0; c < C; c++) {
                if (prev[c] < m1) { m2 = m1; m1 = prev[c]; i1 = c; }
                else if (prev[c] < m2) m2 = prev[c];
            }
            vector<int> cur(C);
            for (int c = 0; c < C; c++) cur[c] = grid[r][c] + (c == i1 ? m2 : m1);
            prev = cur;
        }
        return *min_element(prev.begin(), prev.end());`,
    java: `        int R = grid.length, C = grid[0].length;
        int[] prev = grid[0].clone();
        for (int r = 1; r < R; r++) {
            int m1 = Integer.MAX_VALUE, i1 = -1, m2 = Integer.MAX_VALUE;
            for (int c = 0; c < C; c++) {
                if (prev[c] < m1) { m2 = m1; m1 = prev[c]; i1 = c; }
                else if (prev[c] < m2) m2 = prev[c];
            }
            int[] cur = new int[C];
            for (int c = 0; c < C; c++) cur[c] = grid[r][c] + (c == i1 ? m2 : m1);
            prev = cur;
        }
        int ans = Integer.MAX_VALUE;
        for (int v : prev) ans = Math.min(ans, v);
        return ans;`,
  },
  'frog-jump': {
    python: `        stones = nums
        n = len(stones)
        if n == 1:
            return True
        pos = {s: i for i, s in enumerate(stones)}
        dp = [set() for _ in range(n)]
        dp[0].add(0)
        for i in range(n):
            for k in list(dp[i]):
                for step in (k - 1, k, k + 1):
                    if step > 0:
                        nxt = stones[i] + step
                        if nxt in pos:
                            dp[pos[nxt]].add(step)
        return len(dp[n - 1]) > 0`,
    javascript: `    const stones = nums, n = stones.length;
    if (n === 1) return true;
    const pos = {};
    for (let i = 0; i < n; i++) pos[stones[i]] = i;
    const dp = Array.from({length: n}, () => new Set());
    dp[0].add(0);
    for (let i = 0; i < n; i++) {
        for (const k of dp[i]) {
            for (let step = k - 1; step <= k + 1; step++) {
                if (step > 0) {
                    const nxt = stones[i] + step;
                    if (pos[nxt] !== undefined) dp[pos[nxt]].add(step);
                }
            }
        }
    }
    return dp[n - 1].size > 0;`,
    cpp: `        vector<int>& stones = nums;
        int n = stones.size();
        if (n == 1) return true;
        unordered_map<long long,int> pos;
        for (int i = 0; i < n; i++) pos[stones[i]] = i;
        vector<set<int>> dp(n);
        dp[0].insert(0);
        for (int i = 0; i < n; i++) {
            for (int k : dp[i]) {
                for (int step = k - 1; step <= k + 1; step++) {
                    if (step > 0) {
                        long long nxt = (long long)stones[i] + step;
                        if (pos.count(nxt)) dp[pos[nxt]].insert(step);
                    }
                }
            }
        }
        return !dp[n - 1].empty();`,
    java: `        int[] stones = nums;
        int n = stones.length;
        if (n == 1) return true;
        Map<Integer,Integer> pos = new HashMap<>();
        for (int i = 0; i < n; i++) pos.put(stones[i], i);
        List<Set<Integer>> dp = new ArrayList<>();
        for (int i = 0; i < n; i++) dp.add(new HashSet<>());
        dp.get(0).add(0);
        for (int i = 0; i < n; i++) {
            for (int k : new ArrayList<>(dp.get(i))) {
                for (int step = k - 1; step <= k + 1; step++) {
                    if (step > 0) {
                        int nxt = stones[i] + step;
                        Integer j = pos.get(nxt);
                        if (j != null) dp.get(j).add(step);
                    }
                }
            }
        }
        return !dp.get(n - 1).isEmpty();`,
  },
  'shortest-subarray-with-sum-at-least-k': {
    python: `        from collections import deque
        n = len(nums)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]
        dq = deque()
        best = n + 1
        for i in range(n + 1):
            while dq and prefix[i] - prefix[dq[0]] >= target:
                best = min(best, i - dq.popleft())
            while dq and prefix[dq[-1]] >= prefix[i]:
                dq.pop()
            dq.append(i)
        return best if best <= n else -1`,
    javascript: `    const n = nums.length;
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];
    const dq = [];
    let head = 0, best = n + 1;
    for (let i = 0; i <= n; i++) {
        while (head < dq.length && prefix[i] - prefix[dq[head]] >= target) {
            best = Math.min(best, i - dq[head]);
            head++;
        }
        while (head < dq.length && prefix[dq[dq.length - 1]] >= prefix[i]) dq.pop();
        dq.push(i);
    }
    return best <= n ? best : -1;`,
    cpp: `        int n = nums.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];
        deque<int> dq;
        int best = n + 1;
        for (int i = 0; i <= n; i++) {
            while (!dq.empty() && prefix[i] - prefix[dq.front()] >= target) {
                best = min(best, i - dq.front());
                dq.pop_front();
            }
            while (!dq.empty() && prefix[dq.back()] >= prefix[i]) dq.pop_back();
            dq.push_back(i);
        }
        return best <= n ? best : -1;`,
    java: `        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];
        Deque<Integer> dq = new ArrayDeque<>();
        int best = n + 1;
        for (int i = 0; i <= n; i++) {
            while (!dq.isEmpty() && prefix[i] - prefix[dq.peekFirst()] >= target) {
                best = Math.min(best, i - dq.pollFirst());
            }
            while (!dq.isEmpty() && prefix[dq.peekLast()] >= prefix[i]) dq.pollLast();
            dq.addLast(i);
        }
        return best <= n ? best : -1;`,
  },
  'minimum-number-of-k-consecutive-bit-flips': {
    python: `        A = nums
        K = target
        n = len(A)
        hint = [0] * n
        flip = 0
        ans = 0
        for i in range(n):
            if i >= K:
                flip ^= hint[i - K]
            if ((A[i] + flip) & 1) == 0:
                if i + K > n:
                    return -1
                ans += 1
                flip ^= 1
                hint[i] = 1
        return ans`,
    javascript: `    const A = nums, K = target, n = A.length;
    const hint = new Array(n).fill(0);
    let flip = 0, ans = 0;
    for (let i = 0; i < n; i++) {
        if (i >= K) flip ^= hint[i - K];
        if (((A[i] + flip) & 1) === 0) {
            if (i + K > n) return -1;
            ans++;
            flip ^= 1;
            hint[i] = 1;
        }
    }
    return ans;`,
    cpp: `        vector<int>& A = nums;
        int K = target, n = A.size();
        vector<int> hint(n, 0);
        int flip = 0, ans = 0;
        for (int i = 0; i < n; i++) {
            if (i >= K) flip ^= hint[i - K];
            if (((A[i] + flip) & 1) == 0) {
                if (i + K > n) return -1;
                ans++;
                flip ^= 1;
                hint[i] = 1;
            }
        }
        return ans;`,
    java: `        int[] A = nums;
        int K = target, n = A.length;
        int[] hint = new int[n];
        int flip = 0, ans = 0;
        for (int i = 0; i < n; i++) {
            if (i >= K) flip ^= hint[i - K];
            if (((A[i] + flip) & 1) == 0) {
                if (i + K > n) return -1;
                ans++;
                flip ^= 1;
                hint[i] = 1;
            }
        }
        return ans;`,
  },
  'jump-game-iv': {
    python: `        arr = nums
        n = len(arr)
        if n <= 1:
            return 0
        from collections import defaultdict, deque
        val = defaultdict(list)
        for i, x in enumerate(arr):
            val[x].append(i)
        visited = [False] * n
        visited[0] = True
        q = deque([0])
        steps = 0
        while q:
            for _ in range(len(q)):
                idx = q.popleft()
                if idx == n - 1:
                    return steps
                if arr[idx] in val:
                    for j in val[arr[idx]]:
                        if not visited[j]:
                            visited[j] = True
                            q.append(j)
                    del val[arr[idx]]
                for nb in (idx + 1, idx - 1):
                    if 0 <= nb < n and not visited[nb]:
                        visited[nb] = True
                        q.append(nb)
            steps += 1
        return -1`,
    javascript: `    const arr = nums, n = arr.length;
    if (n <= 1) return 0;
    const val = new Map();
    for (let i = 0; i < n; i++) {
        if (!val.has(arr[i])) val.set(arr[i], []);
        val.get(arr[i]).push(i);
    }
    const visited = new Array(n).fill(false);
    visited[0] = true;
    let q = [0], steps = 0;
    while (q.length) {
        const nq = [];
        for (const idx of q) {
            if (idx === n - 1) return steps;
            if (val.has(arr[idx])) {
                for (const j of val.get(arr[idx])) {
                    if (!visited[j]) { visited[j] = true; nq.push(j); }
                }
                val.delete(arr[idx]);
            }
            if (idx + 1 < n && !visited[idx + 1]) { visited[idx + 1] = true; nq.push(idx + 1); }
            if (idx - 1 >= 0 && !visited[idx - 1]) { visited[idx - 1] = true; nq.push(idx - 1); }
        }
        q = nq; steps++;
    }
    return -1;`,
    cpp: `        vector<int>& arr = nums;
        int n = arr.size();
        if (n <= 1) return 0;
        unordered_map<int, vector<int>> val;
        for (int i = 0; i < n; i++) val[arr[i]].push_back(i);
        vector<char> visited(n, 0);
        visited[0] = 1;
        queue<int> q; q.push(0);
        int steps = 0;
        while (!q.empty()) {
            int sz = q.size();
            for (int s = 0; s < sz; s++) {
                int idx = q.front(); q.pop();
                if (idx == n - 1) return steps;
                auto it = val.find(arr[idx]);
                if (it != val.end()) {
                    for (int j : it->second) {
                        if (!visited[j]) { visited[j] = 1; q.push(j); }
                    }
                    val.erase(it);
                }
                if (idx + 1 < n && !visited[idx + 1]) { visited[idx + 1] = 1; q.push(idx + 1); }
                if (idx - 1 >= 0 && !visited[idx - 1]) { visited[idx - 1] = 1; q.push(idx - 1); }
            }
            steps++;
        }
        return -1;`,
    java: `        int[] arr = nums;
        int n = arr.length;
        if (n <= 1) return 0;
        Map<Integer, List<Integer>> val = new HashMap<>();
        for (int i = 0; i < n; i++) val.computeIfAbsent(arr[i], z -> new ArrayList<>()).add(i);
        boolean[] visited = new boolean[n];
        visited[0] = true;
        Queue<Integer> q = new LinkedList<>();
        q.add(0);
        int steps = 0;
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int s = 0; s < sz; s++) {
                int idx = q.poll();
                if (idx == n - 1) return steps;
                List<Integer> lst = val.get(arr[idx]);
                if (lst != null) {
                    for (int j : lst) {
                        if (!visited[j]) { visited[j] = true; q.add(j); }
                    }
                    val.remove(arr[idx]);
                }
                if (idx + 1 < n && !visited[idx + 1]) { visited[idx + 1] = true; q.add(idx + 1); }
                if (idx - 1 >= 0 && !visited[idx - 1]) { visited[idx - 1] = true; q.add(idx - 1); }
            }
            steps++;
        }
        return -1;`,
  },
  'minimize-deviation-in-array': {
    python: `        import heapq
        heap = []
        mn = float('inf')
        for x in nums:
            if x % 2 == 1:
                x *= 2
            heap.append(-x)
            mn = min(mn, x)
        heapq.heapify(heap)
        res = float('inf')
        while True:
            mx = -heapq.heappop(heap)
            res = min(res, mx - mn)
            if mx % 2 == 1:
                break
            mx //= 2
            mn = min(mn, mx)
            heapq.heappush(heap, -mx)
        return res`,
    javascript: `    const arr = nums.map(x => x % 2 ? x * 2 : x);
    let mn = Math.min.apply(null, arr);
    let res = Infinity;
    while (true) {
        let mx = -Infinity, idx = -1;
        for (let i = 0; i < arr.length; i++) if (arr[i] > mx) { mx = arr[i]; idx = i; }
        res = Math.min(res, mx - mn);
        if (mx % 2 === 1) break;
        arr[idx] = mx / 2;
        if (arr[idx] < mn) mn = arr[idx];
    }
    return res;`,
    cpp: `        priority_queue<int> pq;
        int mn = INT_MAX;
        for (int x : nums) {
            if (x % 2 == 1) x *= 2;
            pq.push(x);
            mn = min(mn, x);
        }
        int res = INT_MAX;
        while (true) {
            int mx = pq.top(); pq.pop();
            res = min(res, mx - mn);
            if (mx % 2 == 1) break;
            mx /= 2;
            mn = min(mn, mx);
            pq.push(mx);
        }
        return res;`,
    java: `        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        int mn = Integer.MAX_VALUE;
        for (int x : nums) {
            if (x % 2 == 1) x *= 2;
            pq.add(x);
            mn = Math.min(mn, x);
        }
        int res = Integer.MAX_VALUE;
        while (true) {
            int mx = pq.poll();
            res = Math.min(res, mx - mn);
            if (mx % 2 == 1) break;
            mx /= 2;
            mn = Math.min(mn, mx);
            pq.add(mx);
        }
        return res;`,
  },
};

module.exports = { SOL };
