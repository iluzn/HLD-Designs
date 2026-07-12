// Batch R: solutions for the BINARY SEARCH problems (batch 21).
// Classic binary search on sorted arrays plus "binary search on the answer".
const SOL = {
  'valid-perfect-square': {
    python: `        lo, hi = 1, n
        while lo <= hi:
            mid = (lo + hi) // 2
            sq = mid * mid
            if sq == n:
                return True
            if sq < n:
                lo = mid + 1
            else:
                hi = mid - 1
        return False`,
    java: `        long lo = 1, hi = n;
        while (lo <= hi) {
            long mid = (lo + hi) / 2;
            long sq = mid * mid;
            if (sq == n) return true;
            if (sq < n) lo = mid + 1;
            else hi = mid - 1;
        }
        return false;`,
    cpp: `        long long lo = 1, hi = n;
        while (lo <= hi) {
            long long mid = (lo + hi) / 2;
            long long sq = mid * mid;
            if (sq == n) return true;
            if (sq < n) lo = mid + 1;
            else hi = mid - 1;
        }
        return false;`,
    javascript: `    let lo = 1, hi = n;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const sq = mid * mid;
        if (sq === n) return true;
        if (sq < n) lo = mid + 1;
        else hi = mid - 1;
    }
    return false;`,
  },
  'arranging-coins': {
    python: `        lo, hi = 0, n
        while lo <= hi:
            mid = (lo + hi) // 2
            need = mid * (mid + 1) // 2
            if need <= n:
                lo = mid + 1
            else:
                hi = mid - 1
        return hi`,
    java: `        long lo = 0, hi = n;
        while (lo <= hi) {
            long mid = (lo + hi) / 2;
            long need = mid * (mid + 1) / 2;
            if (need <= n) lo = mid + 1;
            else hi = mid - 1;
        }
        return (int) hi;`,
    cpp: `        long long lo = 0, hi = n;
        while (lo <= hi) {
            long long mid = (lo + hi) / 2;
            long long need = mid * (mid + 1) / 2;
            if (need <= n) lo = mid + 1;
            else hi = mid - 1;
        }
        return (int) hi;`,
    javascript: `    let lo = 0, hi = n;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const need = mid * (mid + 1) / 2;
        if (need <= n) lo = mid + 1;
        else hi = mid - 1;
    }
    return hi;`,
  },
  'single-element-in-a-sorted-array': {
    python: `        lo, hi = 0, len(nums) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if mid % 2 == 1:
                mid -= 1
            if nums[mid] == nums[mid + 1]:
                lo = mid + 2
            else:
                hi = mid
        return nums[lo]`,
    java: `        int lo = 0, hi = nums.length - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (mid % 2 == 1) mid--;
            if (nums[mid] == nums[mid + 1]) lo = mid + 2;
            else hi = mid;
        }
        return nums[lo];`,
    cpp: `        int lo = 0, hi = (int)nums.size() - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (mid % 2 == 1) mid--;
            if (nums[mid] == nums[mid + 1]) lo = mid + 2;
            else hi = mid;
        }
        return nums[lo];`,
    javascript: `    let lo = 0, hi = nums.length - 1;
    while (lo < hi) {
        let mid = (lo + hi) >> 1;
        if (mid % 2 === 1) mid--;
        if (nums[mid] === nums[mid + 1]) lo = mid + 2;
        else hi = mid;
    }
    return nums[lo];`,
  },
  'peak-index-in-a-mountain-array': {
    python: `        lo, hi = 0, len(nums) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] < nums[mid + 1]:
                lo = mid + 1
            else:
                hi = mid
        return lo`,
    java: `        int lo = 0, hi = nums.length - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] < nums[mid + 1]) lo = mid + 1;
            else hi = mid;
        }
        return lo;`,
    cpp: `        int lo = 0, hi = (int)nums.size() - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] < nums[mid + 1]) lo = mid + 1;
            else hi = mid;
        }
        return lo;`,
    javascript: `    let lo = 0, hi = nums.length - 1;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] < nums[mid + 1]) lo = mid + 1;
        else hi = mid;
    }
    return lo;`,
  },
  'h-index-ii': {
    python: `        n = len(nums)
        lo, hi = 0, n - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] >= n - mid:
                hi = mid - 1
            else:
                lo = mid + 1
        return n - lo`,
    java: `        int n = nums.length;
        int lo = 0, hi = n - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] >= n - mid) hi = mid - 1;
            else lo = mid + 1;
        }
        return n - lo;`,
    cpp: `        int n = (int)nums.size();
        int lo = 0, hi = n - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] >= n - mid) hi = mid - 1;
            else lo = mid + 1;
        }
        return n - lo;`,
    javascript: `    const n = nums.length;
    let lo = 0, hi = n - 1;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] >= n - mid) hi = mid - 1;
        else lo = mid + 1;
    }
    return n - lo;`,
  },
  'maximum-count-of-positive-integer-and-negative-integer': {
    python: `        neg = sum(1 for x in nums if x < 0)
        pos = sum(1 for x in nums if x > 0)
        return max(neg, pos)`,
    java: `        int neg = 0, pos = 0;
        for (int x : nums) {
            if (x < 0) neg++;
            else if (x > 0) pos++;
        }
        return Math.max(neg, pos);`,
    cpp: `        int neg = 0, pos = 0;
        for (int x : nums) {
            if (x < 0) neg++;
            else if (x > 0) pos++;
        }
        return max(neg, pos);`,
    javascript: `    let neg = 0, pos = 0;
    for (const x of nums) {
        if (x < 0) neg++;
        else if (x > 0) pos++;
    }
    return Math.max(neg, pos);`,
  },
  'kth-missing-positive-number': {
    python: `        lo, hi = 0, len(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] - (mid + 1) < target:
                lo = mid + 1
            else:
                hi = mid
        return target + lo`,
    java: `        int lo = 0, hi = nums.length;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] - (mid + 1) < target) lo = mid + 1;
            else hi = mid;
        }
        return target + lo;`,
    cpp: `        int lo = 0, hi = (int)nums.size();
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] - (mid + 1) < target) lo = mid + 1;
            else hi = mid;
        }
        return target + lo;`,
    javascript: `    let lo = 0, hi = nums.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] - (mid + 1) < target) lo = mid + 1;
        else hi = mid;
    }
    return target + lo;`,
  },
  'split-array-largest-sum': {
    python: `        def need(cap):
            c, cur = 1, 0
            for x in nums:
                if cur + x > cap:
                    c += 1
                    cur = 0
                cur += x
            return c
        lo, hi = max(nums), sum(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if need(mid) <= target:
                hi = mid
            else:
                lo = mid + 1
        return lo`,
    java: `        int lo = 0, hi = 0;
        for (int x : nums) { lo = Math.max(lo, x); hi += x; }
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (need(nums, mid) <= target) hi = mid; else lo = mid + 1;
        }
        return lo;
    }
    int need(int[] nums, int cap) {
        int c = 1, cur = 0;
        for (int x : nums) {
            if (cur + x > cap) { c++; cur = 0; }
            cur += x;
        }
        return c;`,
    cpp: `        int lo = 0, hi = 0;
        for (int x : nums) { lo = max(lo, x); hi += x; }
        auto need = [&](int cap) {
            int c = 1, cur = 0;
            for (int x : nums) { if (cur + x > cap) { c++; cur = 0; } cur += x; }
            return c;
        };
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (need(mid) <= target) hi = mid; else lo = mid + 1;
        }
        return lo;`,
    javascript: `    let lo = 0, hi = 0;
    for (const x of nums) { lo = Math.max(lo, x); hi += x; }
    const need = (cap) => {
        let c = 1, cur = 0;
        for (const x of nums) { if (cur + x > cap) { c++; cur = 0; } cur += x; }
        return c;
    };
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (need(mid) <= target) hi = mid; else lo = mid + 1;
    }
    return lo;`,
  },
  'find-the-smallest-divisor-given-a-threshold': {
    python: `        def total(d):
            s = 0
            for x in nums:
                s += (x + d - 1) // d
            return s
        lo, hi = 1, max(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if total(mid) <= target:
                hi = mid
            else:
                lo = mid + 1
        return lo`,
    java: `        int lo = 1, hi = 0;
        for (int x : nums) hi = Math.max(hi, x);
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (total(nums, mid) <= target) hi = mid; else lo = mid + 1;
        }
        return lo;
    }
    int total(int[] nums, int d) {
        int s = 0;
        for (int x : nums) s += (x + d - 1) / d;
        return s;`,
    cpp: `        int lo = 1, hi = 0;
        for (int x : nums) hi = max(hi, x);
        auto total = [&](int d) {
            int s = 0;
            for (int x : nums) s += (x + d - 1) / d;
            return s;
        };
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (total(mid) <= target) hi = mid; else lo = mid + 1;
        }
        return lo;`,
    javascript: `    let lo = 1, hi = 0;
    for (const x of nums) hi = Math.max(hi, x);
    const total = (d) => {
        let s = 0;
        for (const x of nums) s += Math.floor((x + d - 1) / d);
        return s;
    };
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (total(mid) <= target) hi = mid; else lo = mid + 1;
    }
    return lo;`,
  },
  'minimum-time-to-complete-trips': {
    python: `        def trips(t):
            s = 0
            for x in nums:
                s += t // x
            return s
        lo, hi = 1, min(nums) * target
        while lo < hi:
            mid = (lo + hi) // 2
            if trips(mid) >= target:
                hi = mid
            else:
                lo = mid + 1
        return lo`,
    java: `        int mn = nums[0];
        for (int x : nums) mn = Math.min(mn, x);
        long lo = 1, hi = (long) mn * target;
        while (lo < hi) {
            long mid = (lo + hi) / 2;
            if (trips(nums, mid) >= target) hi = mid; else lo = mid + 1;
        }
        return (int) lo;
    }
    long trips(int[] nums, long t) {
        long s = 0;
        for (int x : nums) s += t / x;
        return s;`,
    cpp: `        long long mn = nums[0];
        for (int x : nums) mn = min(mn, (long long) x);
        long long lo = 1, hi = mn * (long long) target;
        auto trips = [&](long long t) {
            long long s = 0;
            for (int x : nums) s += t / x;
            return s;
        };
        while (lo < hi) {
            long long mid = (lo + hi) / 2;
            if (trips(mid) >= target) hi = mid; else lo = mid + 1;
        }
        return (int) lo;`,
    javascript: `    let mn = nums[0];
    for (const x of nums) mn = Math.min(mn, x);
    let lo = 1, hi = mn * target;
    const trips = (t) => {
        let s = 0;
        for (const x of nums) s += Math.floor(t / x);
        return s;
    };
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (trips(mid) >= target) hi = mid; else lo = mid + 1;
    }
    return lo;`,
  },
  'maximum-candies-allocated-to-k-children': {
    python: `        if sum(nums) < target:
            return 0
        def kids(x):
            s = 0
            for v in nums:
                s += v // x
            return s
        lo, hi, ans = 1, max(nums), 0
        while lo <= hi:
            mid = (lo + hi) // 2
            if kids(mid) >= target:
                ans = mid
                lo = mid + 1
            else:
                hi = mid - 1
        return ans`,
    java: `        long total = 0;
        for (int x : nums) total += x;
        if (total < target) return 0;
        int lo = 1, hi = 0, ans = 0;
        for (int x : nums) hi = Math.max(hi, x);
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (kids(nums, mid) >= target) { ans = mid; lo = mid + 1; }
            else hi = mid - 1;
        }
        return ans;
    }
    long kids(int[] nums, int x) {
        long s = 0;
        for (int v : nums) s += v / x;
        return s;`,
    cpp: `        long long total = 0;
        for (int x : nums) total += x;
        if (total < target) return 0;
        int lo = 1, hi = 0, ans = 0;
        for (int x : nums) hi = max(hi, x);
        auto kids = [&](int x) {
            long long s = 0;
            for (int v : nums) s += v / x;
            return s;
        };
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (kids(mid) >= target) { ans = mid; lo = mid + 1; }
            else hi = mid - 1;
        }
        return ans;`,
    javascript: `    let total = 0;
    for (const x of nums) total += x;
    if (total < target) return 0;
    let lo = 1, hi = 0, ans = 0;
    for (const x of nums) hi = Math.max(hi, x);
    const kids = (x) => {
        let s = 0;
        for (const v of nums) s += Math.floor(v / x);
        return s;
    };
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (kids(mid) >= target) { ans = mid; lo = mid + 1; }
        else hi = mid - 1;
    }
    return ans;`,
  },
  'minimized-maximum-of-products-distributed-to-any-store': {
    python: `        def stores(x):
            s = 0
            for v in nums:
                s += (v + x - 1) // x
            return s
        lo, hi = 1, max(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if stores(mid) <= target:
                hi = mid
            else:
                lo = mid + 1
        return lo`,
    java: `        int lo = 1, hi = 0;
        for (int x : nums) hi = Math.max(hi, x);
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (stores(nums, mid) <= target) hi = mid; else lo = mid + 1;
        }
        return lo;
    }
    long stores(int[] nums, int x) {
        long s = 0;
        for (int v : nums) s += (v + x - 1) / x;
        return s;`,
    cpp: `        int lo = 1, hi = 0;
        for (int x : nums) hi = max(hi, x);
        auto stores = [&](int x) {
            long long s = 0;
            for (int v : nums) s += (v + x - 1) / x;
            return s;
        };
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (stores(mid) <= target) hi = mid; else lo = mid + 1;
        }
        return lo;`,
    javascript: `    let lo = 1, hi = 0;
    for (const x of nums) hi = Math.max(hi, x);
    const stores = (x) => {
        let s = 0;
        for (const v of nums) s += Math.floor((v + x - 1) / x);
        return s;
    };
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (stores(mid) <= target) hi = mid; else lo = mid + 1;
    }
    return lo;`,
  },
  'divide-chocolate': {
    python: `        def pieces(x):
            c, cur = 0, 0
            for v in nums:
                cur += v
                if cur >= x:
                    c += 1
                    cur = 0
            return c
        lo, hi, ans = min(nums), sum(nums), 0
        while lo <= hi:
            mid = (lo + hi) // 2
            if pieces(mid) >= target + 1:
                ans = mid
                lo = mid + 1
            else:
                hi = mid - 1
        return ans`,
    java: `        int lo = nums[0], hi = 0;
        for (int x : nums) { lo = Math.min(lo, x); hi += x; }
        int ans = 0;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (pieces(nums, mid) >= target + 1) { ans = mid; lo = mid + 1; }
            else hi = mid - 1;
        }
        return ans;
    }
    int pieces(int[] nums, int x) {
        int c = 0, cur = 0;
        for (int v : nums) {
            cur += v;
            if (cur >= x) { c++; cur = 0; }
        }
        return c;`,
    cpp: `        int lo = nums[0], hi = 0;
        for (int x : nums) { lo = min(lo, x); hi += x; }
        int ans = 0;
        auto pieces = [&](int x) {
            int c = 0, cur = 0;
            for (int v : nums) { cur += v; if (cur >= x) { c++; cur = 0; } }
            return c;
        };
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (pieces(mid) >= target + 1) { ans = mid; lo = mid + 1; }
            else hi = mid - 1;
        }
        return ans;`,
    javascript: `    let lo = nums[0], hi = 0;
    for (const x of nums) { lo = Math.min(lo, x); hi += x; }
    let ans = 0;
    const pieces = (x) => {
        let c = 0, cur = 0;
        for (const v of nums) { cur += v; if (cur >= x) { c++; cur = 0; } }
        return c;
    };
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (pieces(mid) >= target + 1) { ans = mid; lo = mid + 1; }
        else hi = mid - 1;
    }
    return ans;`,
  },
  'magnetic-force-between-two-balls': {
    python: `        nums.sort()
        def ok(d):
            cnt, last = 1, nums[0]
            for p in nums[1:]:
                if p - last >= d:
                    cnt += 1
                    last = p
            return cnt
        lo, hi, ans = 1, nums[-1] - nums[0], 0
        while lo <= hi:
            mid = (lo + hi) // 2
            if ok(mid) >= target:
                ans = mid
                lo = mid + 1
            else:
                hi = mid - 1
        return ans`,
    java: `        Arrays.sort(nums);
        int lo = 1, hi = nums[nums.length - 1] - nums[0], ans = 0;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (ok(nums, mid) >= target) { ans = mid; lo = mid + 1; }
            else hi = mid - 1;
        }
        return ans;
    }
    int ok(int[] nums, int d) {
        int cnt = 1, last = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] - last >= d) { cnt++; last = nums[i]; }
        }
        return cnt;`,
    cpp: `        sort(nums.begin(), nums.end());
        int lo = 1, hi = nums.back() - nums.front(), ans = 0;
        auto ok = [&](int d) {
            int cnt = 1, last = nums[0];
            for (size_t i = 1; i < nums.size(); i++) {
                if (nums[i] - last >= d) { cnt++; last = nums[i]; }
            }
            return cnt;
        };
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (ok(mid) >= target) { ans = mid; lo = mid + 1; }
            else hi = mid - 1;
        }
        return ans;`,
    javascript: `    nums.sort((a, b) => a - b);
    let lo = 1, hi = nums[nums.length - 1] - nums[0], ans = 0;
    const ok = (d) => {
        let cnt = 1, last = nums[0];
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] - last >= d) { cnt++; last = nums[i]; }
        }
        return cnt;
    };
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (ok(mid) >= target) { ans = mid; lo = mid + 1; }
        else hi = mid - 1;
    }
    return ans;`,
  },
  'minimum-limit-of-balls-in-a-bag': {
    python: `        def ops(x):
            s = 0
            for v in nums:
                s += (v - 1) // x
            return s
        lo, hi = 1, max(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if ops(mid) <= target:
                hi = mid
            else:
                lo = mid + 1
        return lo`,
    java: `        int lo = 1, hi = 0;
        for (int x : nums) hi = Math.max(hi, x);
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (ops(nums, mid) <= target) hi = mid; else lo = mid + 1;
        }
        return lo;
    }
    long ops(int[] nums, int x) {
        long s = 0;
        for (int v : nums) s += (v - 1) / x;
        return s;`,
    cpp: `        int lo = 1, hi = 0;
        for (int x : nums) hi = max(hi, x);
        auto ops = [&](int x) {
            long long s = 0;
            for (int v : nums) s += (v - 1) / x;
            return s;
        };
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (ops(mid) <= target) hi = mid; else lo = mid + 1;
        }
        return lo;`,
    javascript: `    let lo = 1, hi = 0;
    for (const x of nums) hi = Math.max(hi, x);
    const ops = (x) => {
        let s = 0;
        for (const v of nums) s += Math.floor((v - 1) / x);
        return s;
    };
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (ops(mid) <= target) hi = mid; else lo = mid + 1;
    }
    return lo;`,
  },
  'find-target-indices-after-sorting-the-array': {
    python: `        lo = sum(1 for x in nums if x < target)
        cnt = sum(1 for x in nums if x == target)
        return list(range(lo, lo + cnt))`,
    java: `        int lo = 0, cnt = 0;
        for (int x : nums) {
            if (x < target) lo++;
            else if (x == target) cnt++;
        }
        int[] res = new int[cnt];
        for (int i = 0; i < cnt; i++) res[i] = lo + i;
        return res;`,
    cpp: `        int lo = 0, cnt = 0;
        for (int x : nums) {
            if (x < target) lo++;
            else if (x == target) cnt++;
        }
        vector<int> res;
        for (int i = 0; i < cnt; i++) res.push_back(lo + i);
        return res;`,
    javascript: `    let lo = 0, cnt = 0;
    for (const x of nums) {
        if (x < target) lo++;
        else if (x === target) cnt++;
    }
    const res = [];
    for (let i = 0; i < cnt; i++) res.push(lo + i);
    return res;`,
  },
};
module.exports = { SOL };
