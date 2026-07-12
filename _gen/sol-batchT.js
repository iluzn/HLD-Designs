// Batch T: known-correct solutions for the DYNAMIC PROGRAMMING problems
// (batch 24 / MORE24): 1D DP, knapsack-style subset sums, DP over a single
// array, and interval game DP.
const SOL = {
  'n-th-tribonacci-number': {
    python: `        if n == 0:
            return 0
        if n < 3:
            return 1
        a, b, c = 0, 1, 1
        for _ in range(3, n + 1):
            a, b, c = b, c, a + b + c
        return c`,
    java: `        if (n == 0) return 0;
        if (n < 3) return 1;
        int a = 0, b = 1, c = 1;
        for (int i = 3; i <= n; i++) {
            int v = a + b + c;
            a = b; b = c; c = v;
        }
        return c;`,
    cpp: `        if (n == 0) return 0;
        if (n < 3) return 1;
        long a = 0, b = 1, c = 1;
        for (int i = 3; i <= n; i++) {
            long v = a + b + c;
            a = b; b = c; c = v;
        }
        return (int)c;`,
    javascript: `    if (n === 0) return 0;
    if (n < 3) return 1;
    let a = 0, b = 1, c = 1;
    for (let i = 3; i <= n; i++) {
        const v = a + b + c;
        a = b; b = c; c = v;
    }
    return c;`,
  },
  'perfect-squares': {
    python: `        dp = [0] + [float("inf")] * n
        for i in range(1, n + 1):
            j = 1
            while j * j <= i:
                dp[i] = min(dp[i], dp[i - j * j] + 1)
                j += 1
        return dp[n]`,
    java: `        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            int best = Integer.MAX_VALUE;
            for (int j = 1; j * j <= i; j++) best = Math.min(best, dp[i - j * j] + 1);
            dp[i] = best;
        }
        return dp[n];`,
    cpp: `        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            int best = INT_MAX;
            for (int j = 1; j * j <= i; j++) best = min(best, dp[i - j * j] + 1);
            dp[i] = best;
        }
        return dp[n];`,
    javascript: `    const dp = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        let best = Infinity;
        for (let j = 1; j * j <= i; j++) best = Math.min(best, dp[i - j * j] + 1);
        dp[i] = best;
    }
    return dp[n];`,
  },
  'integer-break': {
    python: `        dp = [0] * (n + 1)
        dp[1] = 1
        for i in range(2, n + 1):
            for j in range(1, i):
                dp[i] = max(dp[i], j * (i - j), j * dp[i - j])
        return dp[n]`,
    java: `        int[] dp = new int[n + 1];
        dp[1] = 1;
        for (int i = 2; i <= n; i++)
            for (int j = 1; j < i; j++)
                dp[i] = Math.max(dp[i], Math.max(j * (i - j), j * dp[i - j]));
        return dp[n];`,
    cpp: `        vector<int> dp(n + 1, 0);
        dp[1] = 1;
        for (int i = 2; i <= n; i++)
            for (int j = 1; j < i; j++)
                dp[i] = max(dp[i], max(j * (i - j), j * dp[i - j]));
        return dp[n];`,
    javascript: `    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    for (let i = 2; i <= n; i++)
        for (let j = 1; j < i; j++)
            dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);
    return dp[n];`,
  },
  'two-keys-keyboard': {
    python: `        res, d = 0, 2
        while n > 1:
            while n % d == 0:
                res += d
                n //= d
            d += 1
        return res`,
    java: `        int res = 0, d = 2;
        while (n > 1) {
            while (n % d == 0) { res += d; n /= d; }
            d++;
        }
        return res;`,
    cpp: `        int res = 0, d = 2;
        while (n > 1) {
            while (n % d == 0) { res += d; n /= d; }
            d++;
        }
        return res;`,
    javascript: `    let res = 0, d = 2;
    while (n > 1) {
        while (n % d === 0) { res += d; n = Math.floor(n / d); }
        d++;
    }
    return res;`,
  },
  'combination-sum-iv': {
    python: `        dp = [1] + [0] * target
        for i in range(1, target + 1):
            for x in nums:
                if x <= i:
                    dp[i] += dp[i - x]
        return dp[target]`,
    java: `        long[] dp = new long[target + 1];
        dp[0] = 1;
        for (int i = 1; i <= target; i++)
            for (int x : nums)
                if (x <= i) dp[i] += dp[i - x];
        return (int) dp[target];`,
    cpp: `        vector<long long> dp(target + 1, 0);
        dp[0] = 1;
        for (int i = 1; i <= target; i++)
            for (int x : nums)
                if (x <= i) dp[i] += dp[i - x];
        return (int) dp[target];`,
    javascript: `    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= target; i++)
        for (const x of nums)
            if (x <= i) dp[i] += dp[i - x];
    return dp[target];`,
  },
  'longest-arithmetic-subsequence-of-given-difference': {
    python: `        dp = {}
        best = 0
        for x in nums:
            dp[x] = dp.get(x - target, 0) + 1
            best = max(best, dp[x])
        return best`,
    java: `        Map<Integer, Integer> dp = new HashMap<>();
        int best = 0;
        for (int x : nums) {
            int cur = dp.getOrDefault(x - target, 0) + 1;
            dp.put(x, cur);
            best = Math.max(best, cur);
        }
        return best;`,
    cpp: `        unordered_map<int, int> dp;
        int best = 0;
        for (int x : nums) {
            int cur = dp[x - target] + 1;
            dp[x] = cur;
            best = max(best, cur);
        }
        return best;`,
    javascript: `    const dp = new Map();
    let best = 0;
    for (const x of nums) {
        const cur = (dp.get(x - target) || 0) + 1;
        dp.set(x, cur);
        best = Math.max(best, cur);
    }
    return best;`,
  },
  'partition-array-for-maximum-sum': {
    python: `        n = len(nums)
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            mx = 0
            for j in range(1, min(target, i) + 1):
                mx = max(mx, nums[i - j])
                dp[i] = max(dp[i], dp[i - j] + mx * j)
        return dp[n]`,
    java: `        int n = nums.length;
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            int mx = 0;
            for (int j = 1; j <= target && j <= i; j++) {
                mx = Math.max(mx, nums[i - j]);
                dp[i] = Math.max(dp[i], dp[i - j] + mx * j);
            }
        }
        return dp[n];`,
    cpp: `        int n = (int)nums.size();
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            int mx = 0;
            for (int j = 1; j <= target && j <= i; j++) {
                mx = max(mx, nums[i - j]);
                dp[i] = max(dp[i], dp[i - j] + mx * j);
            }
        }
        return dp[n];`,
    javascript: `    const n = nums.length;
    const dp = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        let mx = 0;
        for (let j = 1; j <= target && j <= i; j++) {
            mx = Math.max(mx, nums[i - j]);
            dp[i] = Math.max(dp[i], dp[i - j] + mx * j);
        }
    }
    return dp[n];`,
  },
  'delete-and-earn': {
    python: `        mx = max(nums)
        pts = [0] * (mx + 1)
        for x in nums:
            pts[x] += x
        take, skip = 0, 0
        for i in range(mx + 1):
            take, skip = skip + pts[i], max(skip, take)
        return max(take, skip)`,
    java: `        int mx = 0;
        for (int x : nums) mx = Math.max(mx, x);
        int[] pts = new int[mx + 1];
        for (int x : nums) pts[x] += x;
        int take = 0, skip = 0;
        for (int i = 0; i <= mx; i++) {
            int t = skip + pts[i];
            skip = Math.max(skip, take);
            take = t;
        }
        return Math.max(take, skip);`,
    cpp: `        int mx = 0;
        for (int x : nums) mx = max(mx, x);
        vector<int> pts(mx + 1, 0);
        for (int x : nums) pts[x] += x;
        int take = 0, skip = 0;
        for (int i = 0; i <= mx; i++) {
            int t = skip + pts[i];
            skip = max(skip, take);
            take = t;
        }
        return max(take, skip);`,
    javascript: `    let mx = 0;
    for (const x of nums) mx = Math.max(mx, x);
    const pts = new Array(mx + 1).fill(0);
    for (const x of nums) pts[x] += x;
    let take = 0, skip = 0;
    for (let i = 0; i <= mx; i++) {
        const t = skip + pts[i];
        skip = Math.max(skip, take);
        take = t;
    }
    return Math.max(take, skip);`,
  },
  'number-of-longest-increasing-subsequence': {
    python: `        n = len(nums)
        length = [1] * n
        count = [1] * n
        best = 0
        for i in range(n):
            for j in range(i):
                if nums[j] < nums[i]:
                    if length[j] + 1 > length[i]:
                        length[i] = length[j] + 1
                        count[i] = count[j]
                    elif length[j] + 1 == length[i]:
                        count[i] += count[j]
            best = max(best, length[i])
        return sum(c for l, c in zip(length, count) if l == best)`,
    java: `        int n = nums.length;
        int[] length = new int[n], count = new int[n];
        int best = 0;
        for (int i = 0; i < n; i++) {
            length[i] = 1; count[i] = 1;
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    if (length[j] + 1 > length[i]) { length[i] = length[j] + 1; count[i] = count[j]; }
                    else if (length[j] + 1 == length[i]) count[i] += count[j];
                }
            }
            best = Math.max(best, length[i]);
        }
        int res = 0;
        for (int i = 0; i < n; i++) if (length[i] == best) res += count[i];
        return res;`,
    cpp: `        int n = (int)nums.size();
        vector<int> length(n, 1), count(n, 1);
        int best = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    if (length[j] + 1 > length[i]) { length[i] = length[j] + 1; count[i] = count[j]; }
                    else if (length[j] + 1 == length[i]) count[i] += count[j];
                }
            }
            best = max(best, length[i]);
        }
        int res = 0;
        for (int i = 0; i < n; i++) if (length[i] == best) res += count[i];
        return res;`,
    javascript: `    const n = nums.length;
    const length = new Array(n).fill(1), count = new Array(n).fill(1);
    let best = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                if (length[j] + 1 > length[i]) { length[i] = length[j] + 1; count[i] = count[j]; }
                else if (length[j] + 1 === length[i]) count[i] += count[j];
            }
        }
        best = Math.max(best, length[i]);
    }
    let res = 0;
    for (let i = 0; i < n; i++) if (length[i] === best) res += count[i];
    return res;`,
  },
  'last-stone-weight-ii': {
    python: `        total = sum(nums)
        t = total // 2
        dp = [False] * (t + 1)
        dp[0] = True
        for x in nums:
            for j in range(t, x - 1, -1):
                if dp[j - x]:
                    dp[j] = True
        for j in range(t, -1, -1):
            if dp[j]:
                return total - 2 * j
        return total`,
    java: `        int total = 0;
        for (int x : nums) total += x;
        int t = total / 2;
        boolean[] dp = new boolean[t + 1];
        dp[0] = true;
        for (int x : nums)
            for (int j = t; j >= x; j--)
                if (dp[j - x]) dp[j] = true;
        for (int j = t; j >= 0; j--)
            if (dp[j]) return total - 2 * j;
        return total;`,
    cpp: `        int total = 0;
        for (int x : nums) total += x;
        int t = total / 2;
        vector<char> dp(t + 1, 0);
        dp[0] = 1;
        for (int x : nums)
            for (int j = t; j >= x; j--)
                if (dp[j - x]) dp[j] = 1;
        for (int j = t; j >= 0; j--)
            if (dp[j]) return total - 2 * j;
        return total;`,
    javascript: `    let total = 0;
    for (const x of nums) total += x;
    const t = total >> 1;
    const dp = new Array(t + 1).fill(false);
    dp[0] = true;
    for (const x of nums)
        for (let j = t; j >= x; j--)
            if (dp[j - x]) dp[j] = true;
    for (let j = t; j >= 0; j--)
        if (dp[j]) return total - 2 * j;
    return total;`,
  },
  'maximum-alternating-subsequence-sum': {
    python: `        even, odd = 0, 0
        for x in nums:
            even, odd = max(even, odd + x), max(odd, even - x)
        return even`,
    java: `        long even = 0, odd = 0;
        for (int x : nums) {
            long ne = Math.max(even, odd + x);
            long no = Math.max(odd, even - x);
            even = ne; odd = no;
        }
        return (int) even;`,
    cpp: `        long long even = 0, odd = 0;
        for (int x : nums) {
            long long ne = max(even, odd + x);
            long long no = max(odd, even - x);
            even = ne; odd = no;
        }
        return (int) even;`,
    javascript: `    let even = 0, odd = 0;
    for (const x of nums) {
        const ne = Math.max(even, odd + x);
        const no = Math.max(odd, even - x);
        even = ne; odd = no;
    }
    return even;`,
  },
  'best-sightseeing-pair': {
    python: `        best = float("-inf")
        cur = nums[0]
        for j in range(1, len(nums)):
            best = max(best, cur + nums[j] - j)
            cur = max(cur, nums[j] + j)
        return best`,
    java: `        int best = Integer.MIN_VALUE, cur = nums[0];
        for (int j = 1; j < nums.length; j++) {
            best = Math.max(best, cur + nums[j] - j);
            cur = Math.max(cur, nums[j] + j);
        }
        return best;`,
    cpp: `        int best = INT_MIN, cur = nums[0];
        for (int j = 1; j < (int)nums.size(); j++) {
            best = max(best, cur + nums[j] - j);
            cur = max(cur, nums[j] + j);
        }
        return best;`,
    javascript: `    let best = -Infinity, cur = nums[0];
    for (let j = 1; j < nums.length; j++) {
        best = Math.max(best, cur + nums[j] - j);
        cur = Math.max(cur, nums[j] + j);
    }
    return best;`,
  },
  'longest-turbulent-subarray': {
    python: `        best = inc = dec = 1
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]:
                inc, dec = dec + 1, 1
            elif nums[i] < nums[i - 1]:
                dec, inc = inc + 1, 1
            else:
                inc = dec = 1
            best = max(best, inc, dec)
        return best`,
    java: `        int best = 1, inc = 1, dec = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i - 1]) { inc = dec + 1; dec = 1; }
            else if (nums[i] < nums[i - 1]) { dec = inc + 1; inc = 1; }
            else { inc = 1; dec = 1; }
            best = Math.max(best, Math.max(inc, dec));
        }
        return best;`,
    cpp: `        int best = 1, inc = 1, dec = 1;
        for (int i = 1; i < (int)nums.size(); i++) {
            if (nums[i] > nums[i - 1]) { inc = dec + 1; dec = 1; }
            else if (nums[i] < nums[i - 1]) { dec = inc + 1; inc = 1; }
            else { inc = 1; dec = 1; }
            best = max(best, max(inc, dec));
        }
        return best;`,
    javascript: `    let best = 1, inc = 1, dec = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) { inc = dec + 1; dec = 1; }
        else if (nums[i] < nums[i - 1]) { dec = inc + 1; inc = 1; }
        else { inc = 1; dec = 1; }
        best = Math.max(best, inc, dec);
    }
    return best;`,
  },
  'maximum-sum-circular-subarray': {
    python: `        total = nums[0]
        cur_max = best = nums[0]
        cur_min = worst = nums[0]
        for i in range(1, len(nums)):
            x = nums[i]
            total += x
            cur_max = max(cur_max + x, x); best = max(best, cur_max)
            cur_min = min(cur_min + x, x); worst = min(worst, cur_min)
        if best < 0:
            return best
        return max(best, total - worst)`,
    java: `        int total = nums[0], curMax = nums[0], best = nums[0], curMin = nums[0], worst = nums[0];
        for (int i = 1; i < nums.length; i++) {
            int x = nums[i];
            total += x;
            curMax = Math.max(curMax + x, x); best = Math.max(best, curMax);
            curMin = Math.min(curMin + x, x); worst = Math.min(worst, curMin);
        }
        if (best < 0) return best;
        return Math.max(best, total - worst);`,
    cpp: `        int total = nums[0], curMax = nums[0], best = nums[0], curMin = nums[0], worst = nums[0];
        for (int i = 1; i < (int)nums.size(); i++) {
            int x = nums[i];
            total += x;
            curMax = max(curMax + x, x); best = max(best, curMax);
            curMin = min(curMin + x, x); worst = min(worst, curMin);
        }
        if (best < 0) return best;
        return max(best, total - worst);`,
    javascript: `    let total = nums[0], curMax = nums[0], best = nums[0], curMin = nums[0], worst = nums[0];
    for (let i = 1; i < nums.length; i++) {
        const x = nums[i];
        total += x;
        curMax = Math.max(curMax + x, x); best = Math.max(best, curMax);
        curMin = Math.min(curMin + x, x); worst = Math.min(worst, curMin);
    }
    if (best < 0) return best;
    return Math.max(best, total - worst);`,
  },
  'predict-the-winner': {
    python: `        n = len(nums)
        dp = nums[:]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                dp[i] = max(nums[i] - dp[i + 1], nums[j] - dp[i])
        return dp[0] >= 0`,
    java: `        int n = nums.length;
        int[] dp = Arrays.copyOf(nums, n);
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                dp[i] = Math.max(nums[i] - dp[i + 1], nums[j] - dp[i]);
            }
        }
        return dp[0] >= 0;`,
    cpp: `        int n = (int)nums.size();
        vector<int> dp(nums);
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                dp[i] = max(nums[i] - dp[i + 1], nums[j] - dp[i]);
            }
        }
        return dp[0] >= 0;`,
    javascript: `    const n = nums.length;
    const dp = nums.slice();
    for (let length = 2; length <= n; length++) {
        for (let i = 0; i + length - 1 < n; i++) {
            const j = i + length - 1;
            dp[i] = Math.max(nums[i] - dp[i + 1], nums[j] - dp[i]);
        }
    }
    return dp[0] >= 0;`,
  },
  'stone-game': {
    python: `        n = len(nums)
        dp = nums[:]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                dp[i] = max(nums[i] - dp[i + 1], nums[j] - dp[i])
        return dp[0] > 0`,
    java: `        int n = nums.length;
        int[] dp = Arrays.copyOf(nums, n);
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                dp[i] = Math.max(nums[i] - dp[i + 1], nums[j] - dp[i]);
            }
        }
        return dp[0] > 0;`,
    cpp: `        int n = (int)nums.size();
        vector<int> dp(nums);
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                dp[i] = max(nums[i] - dp[i + 1], nums[j] - dp[i]);
            }
        }
        return dp[0] > 0;`,
    javascript: `    const n = nums.length;
    const dp = nums.slice();
    for (let length = 2; length <= n; length++) {
        for (let i = 0; i + length - 1 < n; i++) {
            const j = i + length - 1;
            dp[i] = Math.max(nums[i] - dp[i + 1], nums[j] - dp[i]);
        }
    }
    return dp[0] > 0;`,
  },
};
module.exports = { SOL };
