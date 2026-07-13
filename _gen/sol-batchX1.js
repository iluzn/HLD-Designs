// Batch X1: known-correct solutions for batch 29 (famous hard array problems).
// Python/JS bodies fill the stub method; C++ uses inline loops/std::function;
// Java bodies are pure method statements ending in a return (stub supplies the
// closing braces).
const SOL = {
  'shortest-subarray-with-sum-at-least-k': {
    python: `        from collections import deque
        n = len(nums)
        pre = [0] * (n + 1)
        for i in range(n):
            pre[i + 1] = pre[i] + nums[i]
        dq = deque()
        best = n + 1
        for i in range(n + 1):
            while dq and pre[i] - pre[dq[0]] >= target:
                best = min(best, i - dq.popleft())
            while dq and pre[dq[-1]] >= pre[i]:
                dq.pop()
            dq.append(i)
        return best if best <= n else -1`,
    javascript: `    const n = nums.length;
    const pre = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
    const dq = [];
    let head = 0, best = n + 1;
    for (let i = 0; i <= n; i++) {
        while (head < dq.length && pre[i] - pre[dq[head]] >= target) {
            best = Math.min(best, i - dq[head]);
            head++;
        }
        while (dq.length > head && pre[dq[dq.length - 1]] >= pre[i]) dq.pop();
        dq.push(i);
    }
    return best <= n ? best : -1;`,
    cpp: `        int n = nums.size();
        vector<long long> pre(n + 1, 0);
        for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
        deque<int> dq;
        int best = n + 1;
        for (int i = 0; i <= n; i++) {
            while (!dq.empty() && pre[i] - pre[dq.front()] >= target) {
                best = min(best, i - dq.front());
                dq.pop_front();
            }
            while (!dq.empty() && pre[dq.back()] >= pre[i]) dq.pop_back();
            dq.push_back(i);
        }
        return best <= n ? best : -1;`,
    java: `        int n = nums.length;
        long[] pre = new long[n + 1];
        for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
        Deque<Integer> dq = new ArrayDeque<>();
        int best = n + 1;
        for (int i = 0; i <= n; i++) {
            while (!dq.isEmpty() && pre[i] - pre[dq.peekFirst()] >= target) {
                best = Math.min(best, i - dq.pollFirst());
            }
            while (!dq.isEmpty() && pre[dq.peekLast()] >= pre[i]) dq.pollLast();
            dq.addLast(i);
        }
        return best <= n ? best : -1;`,
  },
  'constrained-subsequence-sum': {
    python: `        from collections import deque
        dq = deque()
        n = len(nums)
        dp = [0] * n
        ans = float("-inf")
        for i in range(n):
            while dq and dq[0] < i - target:
                dq.popleft()
            best = dp[dq[0]] if dq else 0
            dp[i] = nums[i] + max(0, best)
            ans = max(ans, dp[i])
            while dq and dp[dq[-1]] <= dp[i]:
                dq.pop()
            dq.append(i)
        return ans`,
    javascript: `    const n = nums.length;
    const dp = new Array(n).fill(0);
    const dq = [];
    let head = 0, ans = -Infinity;
    for (let i = 0; i < n; i++) {
        while (head < dq.length && dq[head] < i - target) head++;
        const best = head < dq.length ? dp[dq[head]] : 0;
        dp[i] = nums[i] + Math.max(0, best);
        ans = Math.max(ans, dp[i]);
        while (dq.length > head && dp[dq[dq.length - 1]] <= dp[i]) dq.pop();
        dq.push(i);
    }
    return ans;`,
    cpp: `        int n = nums.size();
        vector<long long> dp(n, 0);
        deque<int> dq;
        long long ans = LLONG_MIN;
        for (int i = 0; i < n; i++) {
            while (!dq.empty() && dq.front() < i - target) dq.pop_front();
            long long best = dq.empty() ? 0 : dp[dq.front()];
            dp[i] = nums[i] + max(0LL, best);
            ans = max(ans, dp[i]);
            while (!dq.empty() && dp[dq.back()] <= dp[i]) dq.pop_back();
            dq.push_back(i);
        }
        return (int)ans;`,
    java: `        int n = nums.length;
        long[] dp = new long[n];
        Deque<Integer> dq = new ArrayDeque<>();
        long ans = Long.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            while (!dq.isEmpty() && dq.peekFirst() < i - target) dq.pollFirst();
            long best = dq.isEmpty() ? 0 : dp[dq.peekFirst()];
            dp[i] = nums[i] + Math.max(0, best);
            ans = Math.max(ans, dp[i]);
            while (!dq.isEmpty() && dp[dq.peekLast()] <= dp[i]) dq.pollLast();
            dq.addLast(i);
        }
        return (int)ans;`,
  },
  'subarrays-with-k-different-integers': {
    python: `        def at_most(m):
            if m < 0:
                return 0
            cnt = {}
            l = 0
            res = 0
            for r in range(len(nums)):
                cnt[nums[r]] = cnt.get(nums[r], 0) + 1
                while len(cnt) > m:
                    cnt[nums[l]] -= 1
                    if cnt[nums[l]] == 0:
                        del cnt[nums[l]]
                    l += 1
                res += r - l + 1
            return res
        return at_most(target) - at_most(target - 1)`,
    javascript: `    const atMost = (m) => {
        if (m < 0) return 0;
        const cnt = new Map();
        let l = 0, res = 0;
        for (let r = 0; r < nums.length; r++) {
            cnt.set(nums[r], (cnt.get(nums[r]) || 0) + 1);
            while (cnt.size > m) {
                cnt.set(nums[l], cnt.get(nums[l]) - 1);
                if (cnt.get(nums[l]) === 0) cnt.delete(nums[l]);
                l++;
            }
            res += r - l + 1;
        }
        return res;
    };
    return atMost(target) - atMost(target - 1);`,
    cpp: `        function<long long(int)> atMost = [&](int m) -> long long {
            if (m < 0) return 0;
            unordered_map<int,int> cnt;
            int l = 0;
            long long res = 0;
            for (int r = 0; r < (int)nums.size(); r++) {
                cnt[nums[r]]++;
                while ((int)cnt.size() > m) {
                    if (--cnt[nums[l]] == 0) cnt.erase(nums[l]);
                    l++;
                }
                res += r - l + 1;
            }
            return res;
        };
        return (int)(atMost(target) - atMost(target - 1));`,
    java: `        return atMost(nums, target) - atMost(nums, target - 1);
    }
    private int atMost(int[] nums, int m) {
        if (m < 0) return 0;
        Map<Integer,Integer> cnt = new HashMap<>();
        int l = 0, res = 0;
        for (int r = 0; r < nums.length; r++) {
            cnt.put(nums[r], cnt.getOrDefault(nums[r], 0) + 1);
            while (cnt.size() > m) {
                cnt.put(nums[l], cnt.get(nums[l]) - 1);
                if (cnt.get(nums[l]) == 0) cnt.remove(nums[l]);
                l++;
            }
            res += r - l + 1;
        }
        return res;`,
  },
  'minimum-number-of-k-consecutive-bit-flips': {
    python: `        n = len(nums)
        diff = [0] * (n + 1)
        flip = 0
        res = 0
        for i in range(n):
            flip += diff[i]
            if (nums[i] + flip) % 2 == 0:
                if i + target > n:
                    return -1
                res += 1
                flip += 1
                diff[i + target] -= 1
        return res`,
    javascript: `    const n = nums.length;
    const diff = new Array(n + 1).fill(0);
    let flip = 0, res = 0;
    for (let i = 0; i < n; i++) {
        flip += diff[i];
        if ((nums[i] + flip) % 2 === 0) {
            if (i + target > n) return -1;
            res++;
            flip++;
            diff[i + target]--;
        }
    }
    return res;`,
    cpp: `        int n = nums.size();
        vector<int> diff(n + 1, 0);
        int flip = 0, res = 0;
        for (int i = 0; i < n; i++) {
            flip += diff[i];
            if ((nums[i] + flip) % 2 == 0) {
                if (i + target > n) return -1;
                res++;
                flip++;
                diff[i + target]--;
            }
        }
        return res;`,
    java: `        int n = nums.length;
        int[] diff = new int[n + 1];
        int flip = 0, res = 0;
        for (int i = 0; i < n; i++) {
            flip += diff[i];
            if ((nums[i] + flip) % 2 == 0) {
                if (i + target > n) return -1;
                res++;
                flip++;
                diff[i + target]--;
            }
        }
        return res;`,
  },
  'find-k-th-smallest-pair-distance': {
    python: `        nums.sort()
        n = len(nums)
        lo, hi = 0, nums[-1] - nums[0]
        def count(mid):
            c = 0
            l = 0
            for r in range(n):
                while nums[r] - nums[l] > mid:
                    l += 1
                c += r - l
            return c
        while lo < hi:
            mid = (lo + hi) // 2
            if count(mid) >= k:
                hi = mid
            else:
                lo = mid + 1
        return lo`,
    javascript: `    nums.sort((a, b) => a - b);
    const n = nums.length;
    let lo = 0, hi = nums[n - 1] - nums[0];
    const count = (mid) => {
        let c = 0, l = 0;
        for (let r = 0; r < n; r++) {
            while (nums[r] - nums[l] > mid) l++;
            c += r - l;
        }
        return c;
    };
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (count(mid) >= k) hi = mid;
        else lo = mid + 1;
    }
    return lo;`,
    cpp: `        sort(nums.begin(), nums.end());
        int n = nums.size();
        int lo = 0, hi = nums[n - 1] - nums[0];
        auto count = [&](int mid) -> int {
            int c = 0, l = 0;
            for (int r = 0; r < n; r++) {
                while (nums[r] - nums[l] > mid) l++;
                c += r - l;
            }
            return c;
        };
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (count(mid) >= k) hi = mid;
            else lo = mid + 1;
        }
        return lo;`,
    java: `        Arrays.sort(nums);
        int n = nums.length;
        int lo = 0, hi = nums[n - 1] - nums[0];
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            int c = 0, l = 0;
            for (int r = 0; r < n; r++) {
                while (nums[r] - nums[l] > mid) l++;
                c += r - l;
            }
            if (c >= k) hi = mid;
            else lo = mid + 1;
        }
        return lo;`,
  },
  'maximum-running-time-of-n-computers': {
    python: `        total = sum(nums)
        lo, hi = 0, total // k
        def ok(t):
            s = 0
            for b in nums:
                s += b if b < t else t
            return s >= k * t
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if ok(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo`,
    javascript: `    let total = 0;
    for (const b of nums) total += b;
    let lo = 0, hi = Math.floor(total / k);
    const ok = (t) => {
        let s = 0;
        for (const b of nums) s += Math.min(b, t);
        return s >= k * t;
    };
    while (lo < hi) {
        const mid = Math.floor((lo + hi + 1) / 2);
        if (ok(mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;`,
    cpp: `        long long total = 0;
        for (int b : nums) total += b;
        long long lo = 0, hi = total / k;
        auto ok = [&](long long t) -> bool {
            long long s = 0;
            for (int b : nums) s += min((long long)b, t);
            return s >= (long long)k * t;
        };
        while (lo < hi) {
            long long mid = (lo + hi + 1) / 2;
            if (ok(mid)) lo = mid;
            else hi = mid - 1;
        }
        return (int)lo;`,
    java: `        long total = 0;
        for (int b : nums) total += b;
        long lo = 0, hi = total / k;
        while (lo < hi) {
            long mid = (lo + hi + 1) / 2;
            long s = 0;
            for (int b : nums) s += Math.min((long) b, mid);
            if (s >= (long) k * mid) lo = mid;
            else hi = mid - 1;
        }
        return (int) lo;`,
  },
  'minimum-time-to-repair-cars': {
    python: `        lo, hi = 1, min(nums) * k * k
        def cars(t, r):
            c = int((t // r) ** 0.5)
            while r * (c + 1) * (c + 1) <= t:
                c += 1
            while c > 0 and r * c * c > t:
                c -= 1
            return c
        def ok(t):
            total = 0
            for r in nums:
                total += cars(t, r)
            return total >= k
        while lo < hi:
            mid = (lo + hi) // 2
            if ok(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo`,
    javascript: `    let minR = Infinity;
    for (const r of nums) minR = Math.min(minR, r);
    let lo = 1, hi = minR * k * k;
    const cars = (t, r) => {
        let c = Math.floor(Math.sqrt(t / r));
        while (r * (c + 1) * (c + 1) <= t) c++;
        while (c > 0 && r * c * c > t) c--;
        return c;
    };
    const ok = (t) => {
        let total = 0;
        for (const r of nums) total += cars(t, r);
        return total >= k;
    };
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (ok(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;`,
    cpp: `        long long minR = LLONG_MAX;
        for (int r : nums) minR = min(minR, (long long)r);
        long long lo = 1, hi = minR * (long long)k * k;
        auto cars = [&](long long t, long long r) -> long long {
            long long c = (long long)sqrt((double)(t / r));
            while (r * (c + 1) * (c + 1) <= t) c++;
            while (c > 0 && r * c * c > t) c--;
            return c;
        };
        auto ok = [&](long long t) -> bool {
            long long total = 0;
            for (int r : nums) total += cars(t, r);
            return total >= k;
        };
        while (lo < hi) {
            long long mid = (lo + hi) / 2;
            if (ok(mid)) hi = mid;
            else lo = mid + 1;
        }
        return (int)lo;`,
    java: `        long minR = Long.MAX_VALUE;
        for (int r : nums) minR = Math.min(minR, r);
        long lo = 1, hi = minR * (long) k * k;
        while (lo < hi) {
            long mid = (lo + hi) / 2;
            long total = 0;
            for (int r : nums) {
                long c = (long) Math.sqrt((double) (mid / r));
                while (r * (c + 1) * (c + 1) <= mid) c++;
                while (c > 0 && r * c * c > mid) c--;
                total += c;
            }
            if (total >= k) hi = mid;
            else lo = mid + 1;
        }
        return (int) lo;`,
  },
  'jump-game-ii': {
    python: `        jumps = cur_end = far = 0
        for i in range(len(nums) - 1):
            if i + nums[i] > far:
                far = i + nums[i]
            if i == cur_end:
                jumps += 1
                cur_end = far
        return jumps`,
    javascript: `    let jumps = 0, curEnd = 0, far = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        if (i + nums[i] > far) far = i + nums[i];
        if (i === curEnd) {
            jumps++;
            curEnd = far;
        }
    }
    return jumps;`,
    cpp: `        int jumps = 0, curEnd = 0, far = 0;
        int n = nums.size();
        for (int i = 0; i < n - 1; i++) {
            if (i + nums[i] > far) far = i + nums[i];
            if (i == curEnd) {
                jumps++;
                curEnd = far;
            }
        }
        return jumps;`,
    java: `        int jumps = 0, curEnd = 0, far = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            if (i + nums[i] > far) far = i + nums[i];
            if (i == curEnd) {
                jumps++;
                curEnd = far;
            }
        }
        return jumps;`,
  },
  'largest-rectangle-in-histogram': {
    python: `        st = []
        best = 0
        heights = nums + [0]
        for i, h in enumerate(heights):
            while st and heights[st[-1]] >= h:
                height = heights[st.pop()]
                width = i if not st else i - st[-1] - 1
                if height * width > best:
                    best = height * width
            st.append(i)
        return best`,
    javascript: `    const st = [];
    let best = 0;
    const heights = nums.concat([0]);
    for (let i = 0; i < heights.length; i++) {
        while (st.length && heights[st[st.length - 1]] >= heights[i]) {
            const height = heights[st.pop()];
            const width = st.length === 0 ? i : i - st[st.length - 1] - 1;
            if (height * width > best) best = height * width;
        }
        st.push(i);
    }
    return best;`,
    cpp: `        vector<int> heights = nums;
        heights.push_back(0);
        vector<int> st;
        int best = 0;
        for (int i = 0; i < (int)heights.size(); i++) {
            while (!st.empty() && heights[st.back()] >= heights[i]) {
                int height = heights[st.back()];
                st.pop_back();
                int width = st.empty() ? i : i - st.back() - 1;
                if (height * width > best) best = height * width;
            }
            st.push_back(i);
        }
        return best;`,
    java: `        int n = nums.length;
        int[] heights = new int[n + 1];
        for (int i = 0; i < n; i++) heights[i] = nums[i];
        heights[n] = 0;
        Deque<Integer> st = new ArrayDeque<>();
        int best = 0;
        for (int i = 0; i <= n; i++) {
            while (!st.isEmpty() && heights[st.peek()] >= heights[i]) {
                int height = heights[st.pop()];
                int width = st.isEmpty() ? i : i - st.peek() - 1;
                if (height * width > best) best = height * width;
            }
            st.push(i);
        }
        return best;`,
  },
  'maximum-gap': {
    python: `        s = sorted(nums)
        if len(s) < 2:
            return 0
        best = 0
        for i in range(1, len(s)):
            if s[i] - s[i - 1] > best:
                best = s[i] - s[i - 1]
        return best`,
    javascript: `    const s = nums.slice().sort((a, b) => a - b);
    if (s.length < 2) return 0;
    let best = 0;
    for (let i = 1; i < s.length; i++) {
        if (s[i] - s[i - 1] > best) best = s[i] - s[i - 1];
    }
    return best;`,
    cpp: `        vector<int> s = nums;
        sort(s.begin(), s.end());
        if (s.size() < 2) return 0;
        int best = 0;
        for (int i = 1; i < (int)s.size(); i++) {
            if (s[i] - s[i - 1] > best) best = s[i] - s[i - 1];
        }
        return best;`,
    java: `        int[] s = nums.clone();
        Arrays.sort(s);
        if (s.length < 2) return 0;
        int best = 0;
        for (int i = 1; i < s.length; i++) {
            if (s[i] - s[i - 1] > best) best = s[i] - s[i - 1];
        }
        return best;`,
  },
  'reverse-pairs': {
    python: `        count = 0
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] > 2 * nums[j]:
                    count += 1
        return count`,
    javascript: `    let count = 0;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[i] > 2 * nums[j]) count++;
        }
    }
    return count;`,
    cpp: `        long long count = 0;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if ((long long)nums[i] > 2LL * nums[j]) count++;
            }
        }
        return (int)count;`,
    java: `        long count = 0;
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if ((long) nums[i] > 2L * nums[j]) count++;
            }
        }
        return (int) count;`,
  },
  'super-egg-drop': {
    python: `        dp = [0] * (a + 1)
        m = 0
        while dp[a] < b:
            m += 1
            for e in range(a, 0, -1):
                dp[e] = dp[e - 1] + dp[e] + 1
        return m`,
    javascript: `    const dp = new Array(a + 1).fill(0);
    let m = 0;
    while (dp[a] < b) {
        m++;
        for (let e = a; e >= 1; e--) dp[e] = dp[e - 1] + dp[e] + 1;
    }
    return m;`,
    cpp: `        vector<long long> dp(a + 1, 0);
        int m = 0;
        while (dp[a] < b) {
            m++;
            for (int e = a; e >= 1; e--) dp[e] = dp[e - 1] + dp[e] + 1;
        }
        return m;`,
    java: `        long[] dp = new long[a + 1];
        int m = 0;
        while (dp[a] < b) {
            m++;
            for (int e = a; e >= 1; e--) dp[e] = dp[e - 1] + dp[e] + 1;
        }
        return m;`,
  },
};

module.exports = { SOL };
