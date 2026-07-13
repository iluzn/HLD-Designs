// Batch 29: famous HARD problems. Every entry is difficulty:'hard' and its
// output is a single unambiguous int/bool. Types used are limited to
// ARR_INT, ARR_BOOL, ARR_TGT_INT, ARR_INT_INT, INT_INT and INT_INT_INT.
// The `ref` in each entry is the pure-JS source of truth; gen() keeps data
// SMALL and mixes real examples with ~35 random cases.
const { T, randInt, randArr, ln } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}
function randBin(n) { var a = []; for (var i = 0; i < n; i++) a.push(randInt(0, 1)); return a; }

const MORE29 = [];

// ---- Shortest Subarray with Sum at Least K (Monotonic Deque + Prefix Sum) ----
MORE29.push({ slug: 'shortest-subarray-with-sum-at-least-k', title: 'Shortest Subarray with Sum at Least K', difficulty: 'hard', topics: ['Array', 'Binary Search', 'Queue', 'Sliding Window', 'Heap', 'Prefix Sum', 'Monotonic Queue'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('shortestSubarray'),
  desc: '<p>Given an integer array <code>nums</code> (values may be negative) and an integer <code>target</code>, return the length of the <strong>shortest non-empty contiguous subarray</strong> whose sum is at least <code>target</code>. If there is no such subarray, return <code>-1</code>.</p>',
  examples: [{ in: 'nums = [1], target = 1', out: '1' }, { in: 'nums = [1,2], target = 4', out: '-1' }, { in: 'nums = [2,-1,2], target = 3', out: '3' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '-10^5 &lt;= nums[i] &lt;= 10^5', '1 &lt;= target &lt;= 10^9'],
  editorial: ed('Prefix sums with a monotonic deque', 'def shortestSubarray(nums, target):\n    n = len(nums)\n    P = [0]*(n+1)\n    for i in range(n): P[i+1] = P[i] + nums[i]\n    from collections import deque\n    dq = deque(); best = n+1\n    for i in range(n+1):\n        while dq and P[i]-P[dq[0]] >= target:\n            best = min(best, i-dq.popleft())\n        while dq and P[dq[-1]] >= P[i]:\n            dq.pop()\n        dq.append(i)\n    return best if best <= n else -1', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[1], 1], [[1, 2], 4], [[2, -1, 2], 3], [[-1, -2], 1], [[5], 5]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 10), -6, 10), randInt(1, 15)]); return o; },
  ref: function (a) { var nums = a[0], k = a[1], n = nums.length, best = Infinity; for (var i = 0; i < n; i++) { var s = 0; for (var j = i; j < n; j++) { s += nums[j]; if (s >= k) { if (j - i + 1 < best) best = j - i + 1; break; } } } return best === Infinity ? -1 : best; } });

// ---- Constrained Subsequence Sum (DP + Monotonic Deque) ----
MORE29.push({ slug: 'constrained-subsequence-sum', title: 'Constrained Subsequence Sum', difficulty: 'hard', topics: ['Array', 'Dynamic Programming', 'Queue', 'Sliding Window', 'Heap', 'Monotonic Queue'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('constrainedSubsetSum'),
  desc: '<p>Given an integer array <code>nums</code> and an integer <code>target</code> (= k), return the maximum sum of a <strong>non-empty subsequence</strong> such that for every two consecutive chosen elements at indices <code>i &lt; j</code>, the condition <code>j - i &lt;= target</code> holds.</p>',
  examples: [{ in: 'nums = [10,2,-10,5,20], target = 2', out: '37' }, { in: 'nums = [-1,-2,-3], target = 1', out: '-1' }, { in: 'nums = [10,-2,-10,-5,20], target = 2', out: '23' }],
  constraints: ['1 &lt;= target &lt;= nums.length &lt;= 10^5', '-10^4 &lt;= nums[i] &lt;= 10^4'],
  editorial: ed('DP with a sliding-window maximum deque', 'def constrainedSubsetSum(nums, k):\n    from collections import deque\n    n = len(nums); dp = [0]*n; dq = deque(); ans = float("-inf")\n    for i in range(n):\n        while dq and dq[0] < i-k: dq.popleft()\n        best = dp[dq[0]] if dq else 0\n        dp[i] = nums[i] + max(0, best)\n        ans = max(ans, dp[i])\n        while dq and dp[dq[-1]] <= dp[i]: dq.pop()\n        dq.append(i)\n    return ans', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[10, 2, -10, 5, 20], 2], [[-1, -2, -3], 1], [[10, -2, -10, -5, 20], 2]]; for (var k = 0; k < 37; k++) { var arr = randArr(randInt(1, 10), -8, 10); o.push([arr, randInt(1, arr.length)]); } return o; },
  ref: function (a) { var nums = a[0], k = a[1], n = nums.length, dp = new Array(n), ans = -Infinity; for (var i = 0; i < n; i++) { var best = 0; for (var j = Math.max(0, i - k); j < i; j++) if (dp[j] > best) best = dp[j]; dp[i] = nums[i] + best; if (dp[i] > ans) ans = dp[i]; } return ans; } });

// ---- Subarrays with K Different Integers (Sliding Window atMost) ----
MORE29.push({ slug: 'subarrays-with-k-different-integers', title: 'Subarrays with K Different Integers', difficulty: 'hard', topics: ['Array', 'Hash Table', 'Sliding Window', 'Counting'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('subarraysWithKDistinct'),
  desc: '<p>Given an integer array <code>nums</code> and an integer <code>target</code> (= k), return the number of contiguous subarrays that contain <strong>exactly</strong> <code>target</code> distinct integers.</p>',
  examples: [{ in: 'nums = [1,2,1,2,3], target = 2', out: '7' }, { in: 'nums = [1,2,1,3,4], target = 3', out: '3' }],
  constraints: ['1 &lt;= nums.length &lt;= 2*10^4', '1 &lt;= nums[i] &lt;= nums.length', '1 &lt;= target &lt;= nums.length'],
  editorial: ed('exactly(k) = atMost(k) - atMost(k-1)', 'def subarraysWithKDistinct(nums, k):\n    def at_most(m):\n        if m < 0: return 0\n        cnt = {}; res = l = 0\n        for r in range(len(nums)):\n            cnt[nums[r]] = cnt.get(nums[r], 0) + 1\n            while len(cnt) > m:\n                cnt[nums[l]] -= 1\n                if cnt[nums[l]] == 0: del cnt[nums[l]]\n                l += 1\n            res += r - l + 1\n        return res\n    return at_most(k) - at_most(k-1)', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[1, 2, 1, 2, 3], 2], [[1, 2, 1, 3, 4], 3], [[1, 1, 1], 1]]; for (var k = 0; k < 37; k++) { var n = randInt(1, 10), arr = randArr(n, 1, 5); o.push([arr, randInt(1, 4)]); } return o; },
  ref: function (a) { var nums = a[0], k = a[1], n = nums.length, count = 0; for (var i = 0; i < n; i++) { var m = {}, d = 0; for (var j = i; j < n; j++) { if (m[nums[j]] === undefined) { m[nums[j]] = 0; d++; } m[nums[j]]++; if (d > k) break; if (d === k) count++; } } return count; } });

// ---- Minimum Number of K Consecutive Bit Flips (Greedy + Difference Array) ----
MORE29.push({ slug: 'minimum-number-of-k-consecutive-bit-flips', title: 'Minimum Number of K Consecutive Bit Flips', difficulty: 'hard', topics: ['Array', 'Bit Manipulation', 'Queue', 'Sliding Window', 'Prefix Sum'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('minKBitFlips'),
  desc: '<p>Given a binary array <code>nums</code> and an integer <code>target</code> (= k), a <em>k-bit flip</em> selects <code>k</code> consecutive elements and flips every bit in it. Return the minimum number of k-bit flips required so that the array contains no <code>0</code>. If it is impossible, return <code>-1</code>.</p>',
  examples: [{ in: 'nums = [0,1,0], target = 1', out: '2' }, { in: 'nums = [1,1,0], target = 2', out: '-1' }, { in: 'nums = [0,0,0,1,0,1,1,0], target = 3', out: '3' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '1 &lt;= target &lt;= nums.length', 'nums[i] is 0 or 1'],
  editorial: ed('Greedy left-to-right with a running flip count', 'def minKBitFlips(nums, k):\n    n = len(nums); is_flipped = [0]*n; flip = 0; res = 0\n    for i in range(n):\n        if i >= k: flip -= is_flipped[i-k]\n        if (nums[i] + flip) % 2 == 0:\n            if i + k > n: return -1\n            is_flipped[i] = 1; flip += 1; res += 1\n    return res', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[0, 1, 0], 1], [[1, 1, 0], 2], [[0, 0, 0, 1, 0, 1, 1, 0], 3], [[1, 1, 1], 1]]; for (var k = 0; k < 36; k++) { var n = randInt(1, 10), arr = randBin(n); o.push([arr, randInt(1, n)]); } return o; },
  ref: function (a) { var nums = a[0], k = a[1], n = nums.length, flip = 0, res = 0, isf = new Array(n).fill(0); for (var i = 0; i < n; i++) { if (i >= k) flip -= isf[i - k]; if (((nums[i] + flip) & 1) === 0) { if (i + k > n) return -1; isf[i] = 1; flip++; res++; } } return res; } });

// ---- Find K-th Smallest Pair Distance (Binary Search on Answer) ----
MORE29.push({ slug: 'find-k-th-smallest-pair-distance', title: 'Find K-th Smallest Pair Distance', difficulty: 'hard', topics: ['Array', 'Two Pointers', 'Binary Search', 'Sorting'], type: 'ARR_INT_INT', langsrc: T.ARR_INT_INT('smallestDistancePair'),
  desc: '<p>The distance of a pair <code>(a, b)</code> is <code>|a - b|</code>. Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code>-th smallest distance among all <code>n * (n - 1) / 2</code> pairs (1-indexed).</p>',
  examples: [{ in: 'nums = [1,3,1], k = 1', out: '0' }, { in: 'nums = [1,1,1], k = 2', out: '0' }, { in: 'nums = [1,6,1], k = 3', out: '5' }],
  constraints: ['2 &lt;= nums.length &lt;= 10^4', '0 &lt;= nums[i] &lt;= 10^6', '1 &lt;= k &lt;= n * (n - 1) / 2'],
  editorial: ed('Sort, then binary search on the distance value', 'def smallestDistancePair(nums, k):\n    nums.sort(); n = len(nums)\n    def count(d):\n        c = l = 0\n        for r in range(n):\n            while nums[r]-nums[l] > d: l += 1\n            c += r - l\n        return c\n    lo, hi = 0, nums[-1]-nums[0]\n    while lo < hi:\n        mid = (lo+hi)//2\n        if count(mid) >= k: hi = mid\n        else: lo = mid+1\n    return lo', 'O(n log n + n log(max))', 'O(1)'),
  gen: function () { var o = [[[1, 3, 1], 1], [[1, 1, 1], 2], [[1, 6, 1], 3]]; for (var t = 0; t < 37; t++) { var n = randInt(2, 7), arr = randArr(n, 0, 15), pairs = n * (n - 1) / 2; o.push([arr, randInt(1, pairs)]); } return o; },
  ref: function (a) { var nums = a[0], k = a[1], d = []; for (var i = 0; i < nums.length; i++) for (var j = i + 1; j < nums.length; j++) d.push(Math.abs(nums[i] - nums[j])); d.sort(function (x, y) { return x - y; }); return d[k - 1]; } });

// ---- Best Time to Buy and Sell Stock IV (DP) ----
MORE29.push({ slug: 'best-time-to-buy-and-sell-stock-iv', title: 'Best Time to Buy and Sell Stock IV', difficulty: 'hard', topics: ['Array', 'Dynamic Programming'], type: 'ARR_INT_INT', langsrc: T.ARR_INT_INT('maxProfit'),
  desc: '<p>You are given an integer array <code>nums</code> where <code>nums[i]</code> is the price of a stock on day <code>i</code>, and an integer <code>k</code>. Return the maximum profit you can achieve with at most <code>k</code> transactions. You must sell before you buy again.</p>',
  examples: [{ in: 'nums = [2,4,1], k = 2', out: '2' }, { in: 'nums = [3,2,6,5,0,3], k = 2', out: '7' }],
  constraints: ['1 &lt;= k &lt;= 100', '1 &lt;= nums.length &lt;= 1000', '0 &lt;= nums[i] &lt;= 1000'],
  editorial: ed('Track best buy/sell for each transaction count', 'def maxProfit(nums, k):\n    if k == 0 or not nums: return 0\n    buy = [float("-inf")]*(k+1); sell = [0]*(k+1)\n    for p in nums:\n        for j in range(1, k+1):\n            buy[j] = max(buy[j], sell[j-1]-p)\n            sell[j] = max(sell[j], buy[j]+p)\n    return sell[k]', 'O(n*k)', 'O(k)'),
  gen: function () { var o = [[[2, 4, 1], 2], [[3, 2, 6, 5, 0, 3], 2], [[1, 2, 3, 4, 5], 2]]; for (var t = 0; t < 37; t++) { var arr = randArr(randInt(1, 9), 0, 20); o.push([arr, randInt(0, 4)]); } return o; },
  ref: function (a) { var prices = a[0], k = a[1], n = prices.length; if (n === 0 || k === 0) return 0; var buy = new Array(k + 1).fill(-Infinity), sell = new Array(k + 1).fill(0); for (var i = 0; i < n; i++) { var p = prices[i]; for (var j = 1; j <= k; j++) { buy[j] = Math.max(buy[j], sell[j - 1] - p); sell[j] = Math.max(sell[j], buy[j] + p); } } return sell[k]; } });

// ---- Trapping Rain Water (Two Pointers) ----
MORE29.push({ slug: 'trapping-rain-water', title: 'Trapping Rain Water', difficulty: 'hard', topics: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack', 'Monotonic Stack'], type: 'ARR_INT', langsrc: T.ARR_INT('trap'),
  desc: '<p>Given <code>n</code> non-negative integers <code>nums</code> representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.</p>',
  examples: [{ in: 'nums = [0,1,0,2,1,0,1,3,2,1,2,1]', out: '6' }, { in: 'nums = [4,2,0,3,2,5]', out: '9' }],
  constraints: ['1 &lt;= nums.length &lt;= 2*10^4', '0 &lt;= nums[i] &lt;= 10^5'],
  editorial: ed('Two pointers tracking left/right max', 'def trap(nums):\n    l, r = 0, len(nums)-1; lm = rm = res = 0\n    while l < r:\n        if nums[l] < nums[r]:\n            lm = max(lm, nums[l]); res += lm - nums[l]; l += 1\n        else:\n            rm = max(rm, nums[r]); res += rm - nums[r]; r -= 1\n    return res', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], [[4, 2, 0, 3, 2, 5]], [[3]], [[2, 0, 2]]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 12), 0, 8)]); return o; },
  ref: function (a) { var h = a[0], l = 0, r = h.length - 1, lm = 0, rm = 0, res = 0; while (l < r) { if (h[l] < h[r]) { if (h[l] >= lm) lm = h[l]; else res += lm - h[l]; l++; } else { if (h[r] >= rm) rm = h[r]; else res += rm - h[r]; r--; } } return res; } });

// ---- Largest Rectangle in Histogram (Monotonic Stack) ----
MORE29.push({ slug: 'largest-rectangle-in-histogram', title: 'Largest Rectangle in Histogram', difficulty: 'hard', topics: ['Array', 'Stack', 'Monotonic Stack'], type: 'ARR_INT', langsrc: T.ARR_INT('largestRectangleArea'),
  desc: '<p>Given an array of integers <code>nums</code> representing the histogram bar heights where the width of each bar is <code>1</code>, return the area of the largest rectangle in the histogram.</p>',
  examples: [{ in: 'nums = [2,1,5,6,2,3]', out: '10' }, { in: 'nums = [2,4]', out: '4' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '0 &lt;= nums[i] &lt;= 10^4'],
  editorial: ed('Monotonic increasing stack with a sentinel', 'def largestRectangleArea(nums):\n    stack = []; best = 0; n = len(nums)\n    for i in range(n+1):\n        h = nums[i] if i < n else 0\n        while stack and nums[stack[-1]] >= h:\n            top = stack.pop()\n            width = i if not stack else i-stack[-1]-1\n            best = max(best, nums[top]*width)\n        stack.append(i)\n    return best', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[2, 1, 5, 6, 2, 3]], [[2, 4]], [[0]], [[3, 3, 3]]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 10), 0, 9)]); return o; },
  ref: function (a) { var h = a[0], n = h.length, best = 0; for (var i = 0; i < n; i++) { var mn = h[i]; for (var j = i; j < n; j++) { if (h[j] < mn) mn = h[j]; var area = mn * (j - i + 1); if (area > best) best = area; } } return best; } });

// ---- Candy (Greedy Two-Pass) ----
MORE29.push({ slug: 'candy', title: 'Candy', difficulty: 'hard', topics: ['Array', 'Greedy'], type: 'ARR_INT', langsrc: T.ARR_INT('candy'),
  desc: '<p>There are <code>n</code> children standing in a line, each with a rating given in <code>nums</code>. You give candies subject to: every child gets at least one candy, and a child with a higher rating than an adjacent child gets more candies than that neighbor. Return the minimum number of candies you must give.</p>',
  examples: [{ in: 'nums = [1,0,2]', out: '5' }, { in: 'nums = [1,2,2]', out: '4' }],
  constraints: ['1 &lt;= nums.length &lt;= 2*10^4', '0 &lt;= nums[i] &lt;= 2*10^4'],
  editorial: ed('Sweep left-to-right then right-to-left', 'def candy(nums):\n    n = len(nums); c = [1]*n\n    for i in range(1, n):\n        if nums[i] > nums[i-1]: c[i] = c[i-1]+1\n    for i in range(n-2, -1, -1):\n        if nums[i] > nums[i+1]: c[i] = max(c[i], c[i+1]+1)\n    return sum(c)', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[1, 0, 2]], [[1, 2, 2]], [[1]], [[1, 3, 2, 2, 1]]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 10), 0, 5)]); return o; },
  ref: function (a) { var r = a[0], n = r.length, c = new Array(n).fill(1); for (var i = 1; i < n; i++) if (r[i] > r[i - 1]) c[i] = c[i - 1] + 1; for (i = n - 2; i >= 0; i--) if (r[i] > r[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1); var s = 0; for (i = 0; i < n; i++) s += c[i]; return s; } });

// ---- Reverse Pairs (Merge Sort) ----
MORE29.push({ slug: 'reverse-pairs', title: 'Reverse Pairs', difficulty: 'hard', topics: ['Array', 'Binary Search', 'Divide and Conquer', 'Merge Sort', 'Binary Indexed Tree'], type: 'ARR_INT', langsrc: T.ARR_INT('reversePairs'),
  desc: '<p>Given an integer array <code>nums</code>, return the number of <strong>reverse pairs</strong>. A reverse pair is a pair <code>(i, j)</code> where <code>0 &lt;= i &lt; j &lt; nums.length</code> and <code>nums[i] &gt; 2 * nums[j]</code>.</p>',
  examples: [{ in: 'nums = [1,3,2,3,1]', out: '2' }, { in: 'nums = [2,4,3,5,1]', out: '3' }],
  constraints: ['1 &lt;= nums.length &lt;= 5*10^4', '-2^31 &lt;= nums[i] &lt;= 2^31 - 1'],
  editorial: ed('Count across merge-sort partitions', 'def reversePairs(nums):\n    def sort(lo, hi):\n        if hi-lo <= 1: return 0\n        mid = (lo+hi)//2\n        cnt = sort(lo, mid) + sort(mid, hi)\n        j = mid\n        for i in range(lo, mid):\n            while j < hi and nums[i] > 2*nums[j]: j += 1\n            cnt += j - mid\n        nums[lo:hi] = sorted(nums[lo:hi])\n        return cnt\n    return sort(0, len(nums))', 'O(n log n)', 'O(n)'),
  gen: function () { var o = [[[1, 3, 2, 3, 1]], [[2, 4, 3, 5, 1]], [[1]], [[5, 4, 3, 2, 1]]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 10), -6, 6)]); return o; },
  ref: function (a) { var nums = a[0], n = nums.length, cnt = 0; for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) if (nums[i] > 2 * nums[j]) cnt++; return cnt; } });

// ---- Best Time to Buy and Sell Stock III (DP, at most 2 transactions) ----
MORE29.push({ slug: 'best-time-to-buy-and-sell-stock-iii', title: 'Best Time to Buy and Sell Stock III', difficulty: 'hard', topics: ['Array', 'Dynamic Programming'], type: 'ARR_INT', langsrc: T.ARR_INT('maxProfit'),
  desc: '<p>You are given an array <code>nums</code> where <code>nums[i]</code> is the price of a given stock on day <code>i</code>. Find the maximum profit you can achieve with <strong>at most two transactions</strong>. You may not engage in multiple transactions simultaneously (you must sell before you buy again).</p>',
  examples: [{ in: 'nums = [3,3,5,0,0,3,1,4]', out: '6' }, { in: 'nums = [1,2,3,4,5]', out: '4' }, { in: 'nums = [7,6,4,3,1]', out: '0' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '0 &lt;= nums[i] &lt;= 10^5'],
  editorial: ed('Track four rolling states', 'def maxProfit(nums):\n    b1 = float("-inf"); s1 = 0; b2 = float("-inf"); s2 = 0\n    for p in nums:\n        b1 = max(b1, -p)\n        s1 = max(s1, b1+p)\n        b2 = max(b2, s1-p)\n        s2 = max(s2, b2+p)\n    return s2', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[3, 3, 5, 0, 0, 3, 1, 4]], [[1, 2, 3, 4, 5]], [[7, 6, 4, 3, 1]], [[1]]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 12), 0, 20)]); return o; },
  ref: function (a) { var p = a[0], b1 = -Infinity, s1 = 0, b2 = -Infinity, s2 = 0; for (var i = 0; i < p.length; i++) { b1 = Math.max(b1, -p[i]); s1 = Math.max(s1, b1 + p[i]); b2 = Math.max(b2, s1 - p[i]); s2 = Math.max(s2, b2 + p[i]); } return s2; } });

// ---- Frog Jump (Dynamic Programming) ----
MORE29.push({ slug: 'frog-jump', title: 'Frog Jump', difficulty: 'hard', topics: ['Array', 'Dynamic Programming', 'Hash Table'], type: 'ARR_BOOL', langsrc: T.ARR_BOOL('canCross'),
  desc: '<p>A frog crosses a river by jumping on stones. Given the strictly increasing positions <code>nums</code> (with <code>nums[0] == 0</code>), determine if the frog can reach the last stone. The first jump must be exactly <code>1</code> unit. If the last jump was <code>k</code> units, the next jump must be <code>k-1</code>, <code>k</code>, or <code>k+1</code> units (and must be positive). The frog can only jump forward.</p>',
  examples: [{ in: 'stones = [0,1,3,5,6,8,12,17]', out: 'true' }, { in: 'stones = [0,1,2,3,4,8,9,11]', out: 'false' }],
  constraints: ['2 &lt;= nums.length &lt;= 2000', '0 &lt;= nums[i] &lt;= 2^31 - 1', 'nums[0] == 0', 'nums is strictly increasing'],
  editorial: ed('DP over reachable (stone, jump-size) states', 'def canCross(nums):\n    n = len(nums)\n    if n == 1: return True\n    if nums[1] != 1: return False\n    idx = {s: i for i, s in enumerate(nums)}\n    dp = [set() for _ in range(n)]; dp[0].add(0)\n    for i in range(n):\n        for k in dp[i]:\n            for nk in (k-1, k, k+1):\n                if nk > 0 and nums[i]+nk in idx:\n                    dp[idx[nums[i]+nk]].add(nk)\n    return len(dp[n-1]) > 0', 'O(n^2)', 'O(n^2)'),
  gen: function () { var o = [[[0, 1, 3, 5, 6, 8, 12, 17]], [[0, 1, 2, 3, 4, 8, 9, 11]], [[0, 1]], [[0, 2]]]; for (var k = 0; k < 36; k++) { var n = randInt(1, 8), cur = 0, arr = [0]; for (var i = 1; i < n; i++) { cur += randInt(1, 3); arr.push(cur); } o.push([arr]); } return o; },
  ref: function (a) { var st = a[0], n = st.length; if (n === 1) return true; if (st[1] !== 1) return false; var idx = {}; for (var i = 0; i < n; i++) idx[st[i]] = i; var dp = []; for (i = 0; i < n; i++) dp.push({}); dp[0][0] = true; for (i = 0; i < n; i++) { for (var kk in dp[i]) { var k = +kk; for (var d = -1; d <= 1; d++) { var nk = k + d; if (nk > 0) { var t = st[i] + nk; if (idx[t] !== undefined) dp[idx[t]][nk] = true; } } } } return Object.keys(dp[n - 1]).length > 0; } });

// ---- Ugly Number II (DP, three pointers) ----
MORE29.push({ slug: 'ugly-number-ii', title: 'Ugly Number II', difficulty: 'hard', topics: ['Hash Table', 'Math', 'Dynamic Programming', 'Heap'], type: 'INT_INT', langsrc: T.INT_INT('nthUglyNumber'),
  desc: '<p>An <strong>ugly number</strong> is a positive integer whose prime factors are limited to <code>2</code>, <code>3</code>, and <code>5</code>. Given an integer <code>n</code>, return the <code>n</code>-th ugly number. (The sequence <code>1, 2, 3, 4, 5, 6, 8, 9, 10, 12, ...</code> begins with <code>1</code>.)</p>',
  examples: [{ in: 'n = 10', out: '12' }, { in: 'n = 1', out: '1' }],
  constraints: ['1 &lt;= n &lt;= 1690'],
  editorial: ed('Merge three multiples with pointers', 'def nthUglyNumber(n):\n    ugly = [1]*n; i2 = i3 = i5 = 0\n    for i in range(1, n):\n        nxt = min(ugly[i2]*2, ugly[i3]*3, ugly[i5]*5)\n        ugly[i] = nxt\n        if nxt == ugly[i2]*2: i2 += 1\n        if nxt == ugly[i3]*3: i3 += 1\n        if nxt == ugly[i5]*5: i5 += 1\n    return ugly[n-1]', 'O(n)', 'O(n)'),
  gen: function () { var o = [[10], [1], [11], [15]]; for (var k = 0; k < 36; k++) o.push([randInt(1, 120)]); return o; },
  ref: function (a) { var n = a[0], ug = [1], i2 = 0, i3 = 0, i5 = 0; while (ug.length < n) { var n2 = ug[i2] * 2, n3 = ug[i3] * 3, n5 = ug[i5] * 5, m = Math.min(n2, n3, n5); ug.push(m); if (m === n2) i2++; if (m === n3) i3++; if (m === n5) i5++; } return ug[n - 1]; } });

// ---- Super Egg Drop (DP on moves) ----
MORE29.push({ slug: 'super-egg-drop', title: 'Super Egg Drop', difficulty: 'hard', topics: ['Math', 'Binary Search', 'Dynamic Programming'], type: 'INT_INT_INT', langsrc: T.INT_INT_INT('superEggDrop'),
  desc: '<p>You are given <code>a</code> identical eggs and access to a building with <code>b</code> floors. An egg breaks if dropped from a floor at or above some unknown threshold <code>f</code> (<code>0 &lt;= f &lt;= b</code>) and survives below it. Return the <strong>minimum number of moves</strong> needed to determine <code>f</code> with certainty in the worst case.</p>',
  examples: [{ in: 'a = 1, b = 2', out: '2' }, { in: 'a = 2, b = 6', out: '3' }, { in: 'a = 3, b = 14', out: '4' }],
  constraints: ['1 &lt;= a &lt;= 100', '1 &lt;= b &lt;= 10^4'],
  editorial: ed('DP on number of moves: reachable floors with a eggs and m moves', 'def superEggDrop(a, b):\n    dp = [0]*(a+1); m = 0\n    while dp[a] < b:\n        m += 1\n        for k in range(a, 0, -1):\n            dp[k] = dp[k] + dp[k-1] + 1\n    return m', 'O(a log b)', 'O(a)'),
  gen: function () { var o = [[1, 2], [2, 6], [3, 14], [1, 1]]; for (var k = 0; k < 36; k++) o.push([randInt(1, 4), randInt(1, 60)]); return o; },
  ref: function (a) { var K = a[0], N = a[1], dp = new Array(K + 1).fill(0), m = 0; while (dp[K] < N) { m++; for (var j = K; j >= 1; j--) dp[j] = dp[j] + dp[j - 1] + 1; } return m; } });

module.exports = { MORE29 };
