// Batch 17: famous problems chosen to round out pattern coverage —
// prefix sum, binary-search-on-answer, monotonic stack, bit tricks,
// sliding window, DP knapsack, and math.
const { T, randInt, randArr, ln } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}
function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = randInt(0, i); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function rsUpper(len) { var s = ''; for (var i = 0; i < len; i++) s += String.fromCharCode(65 + randInt(0, 25)); return s; }

const MORE17 = [];

// ---- Find Pivot Index (Prefix Sum) ----
MORE17.push({ slug: 'find-pivot-index', title: 'Find Pivot Index', difficulty: 'easy', topics: ['Array', 'Prefix Sum'], type: 'ARR_INT', langsrc: T.ARR_INT('pivotIndex'),
  desc: '<p>Given an array <code>nums</code>, return the leftmost <strong>pivot index</strong>: the index where the sum of all numbers strictly to the left equals the sum strictly to the right. Return <code>-1</code> if none exists.</p>',
  examples: [{ in: 'nums = [1,7,3,6,5,6]', out: '3' }, { in: 'nums = [1,2,3]', out: '-1' }, { in: 'nums = [2,1,-1]', out: '0' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^4', '-1000 &lt;= nums[i] &lt;= 1000'],
  editorial: ed('Prefix sum', 'def pivotIndex(nums):\n    total = sum(nums)\n    left = 0\n    for i, x in enumerate(nums):\n        if left == total - left - x:\n            return i\n        left += x\n    return -1', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 7, 3, 6, 5, 6]], [[1, 2, 3]], [[2, 1, -1]], [[0]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 9), -4, 6)]); return o; },
  ref: function (a) { var total = a[0].reduce(function (s, x) { return s + x; }, 0), left = 0; for (var i = 0; i < a[0].length; i++) { if (left === total - left - a[0][i]) return i; left += a[0][i]; } return -1; } });

// ---- 3Sum Closest (Two Pointers) ----
MORE17.push({ slug: '3sum-closest', title: '3Sum Closest', difficulty: 'medium', topics: ['Array', 'Two Pointers', 'Sorting'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('threeSumClosest'),
  desc: '<p>Given an array <code>nums</code> and a value <code>target</code>, find three integers whose sum is closest to <code>target</code> and return that sum.</p>',
  examples: [{ in: 'nums = [-1,2,1,-4], target = 1', out: '2' }, { in: 'nums = [0,0,0], target = 1', out: '0' }],
  constraints: ['3 &lt;= nums.length &lt;= 500', '-1000 &lt;= nums[i] &lt;= 1000', '-10^4 &lt;= target &lt;= 10^4'],
  editorial: ed('Sort + two pointers', 'def threeSumClosest(nums, target):\n    nums.sort()\n    best = nums[0]+nums[1]+nums[2]\n    for i in range(len(nums)-2):\n        l, r = i+1, len(nums)-1\n        while l < r:\n            s = nums[i]+nums[l]+nums[r]\n            if abs(s-target) < abs(best-target): best = s\n            if s < target: l += 1\n            elif s > target: r -= 1\n            else: return s\n    return best', 'O(n^2)', 'O(1)'),
  gen: function () { var o = [[[-1, 2, 1, -4], 1], [[0, 0, 0], 1], [[1, 1, 1, 0], -100]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(3, 9), -10, 10), randInt(-10, 20)]); return o; },
  ref: function (a) { var n = a[0].slice().sort(function (x, y) { return x - y; }), t = a[1], best = n[0] + n[1] + n[2]; for (var i = 0; i < n.length - 2; i++) { var l = i + 1, r = n.length - 1; while (l < r) { var s = n[i] + n[l] + n[r]; if (Math.abs(s - t) < Math.abs(best - t)) best = s; if (s < t) l++; else if (s > t) r--; else return s; } } return best; } });

// ---- Remove Element (Two Pointers) ----
MORE17.push({ slug: 'remove-element', title: 'Remove Element', difficulty: 'easy', topics: ['Array', 'Two Pointers'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('removeElement'),
  desc: '<p>Given an array <code>nums</code> and a value <code>target</code>, remove all occurrences of <code>target</code> in-place and return the number of remaining elements <code>k</code>.</p>',
  examples: [{ in: 'nums = [3,2,2,3], target = 3', out: '2' }, { in: 'nums = [0,1,2,2,3,0,4,2], target = 2', out: '5' }],
  constraints: ['0 &lt;= nums.length &lt;= 100', '0 &lt;= nums[i], target &lt;= 50'],
  editorial: ed('Overwrite pointer', 'def removeElement(nums, target):\n    k = 0\n    for x in nums:\n        if x != target:\n            nums[k] = x; k += 1\n    return k', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[3, 2, 2, 3], 3], [[0, 1, 2, 2, 3, 0, 4, 2], 2], [[1], 1]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 10), 0, 4), randInt(0, 4)]); return o; },
  ref: function (a) { var t = a[1], k = 0; a[0].forEach(function (x) { if (x !== t) k++; }); return k; } });

// ---- Find First and Last Position (Binary Search) ----
MORE17.push({ slug: 'find-first-and-last-position-of-element-in-sorted-array', title: 'Find First and Last Position of Element in Sorted Array', difficulty: 'medium', topics: ['Array', 'Binary Search'], type: 'ARR_TGT_ARR', langsrc: T.ARR_TGT_ARR('searchRange'),
  desc: '<p>Given a <strong>sorted</strong> array <code>nums</code> and a <code>target</code>, return <code>[first, last]</code> — the first and last index of <code>target</code>. Return <code>[-1, -1]</code> if it is not found. Must run in O(log n).</p>',
  examples: [{ in: 'nums = [5,7,7,8,8,10], target = 8', out: '[3,4]' }, { in: 'nums = [5,7,7,8,8,10], target = 6', out: '[-1,-1]' }],
  constraints: ['0 &lt;= nums.length &lt;= 10^5', 'nums is sorted in non-decreasing order.'],
  editorial: ed('Two binary searches', 'def searchRange(nums, target):\n    def bound(lo_bias):\n        lo, hi, res = 0, len(nums)-1, -1\n        while lo <= hi:\n            mid = (lo+hi)//2\n            if nums[mid] == target:\n                res = mid\n                if lo_bias: hi = mid-1\n                else: lo = mid+1\n            elif nums[mid] < target: lo = mid+1\n            else: hi = mid-1\n        return res\n    return [bound(True), bound(False)]', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[[5, 7, 7, 8, 8, 10], 8], [[5, 7, 7, 8, 8, 10], 6], [[], 0]]; for (var k = 0; k < 38; k++) { var a = randArr(randInt(1, 10), 0, 6).sort(function (x, y) { return x - y; }); o.push([a, randInt(0, 6)]); } return o; },
  ref: function (a) { var t = a[1], first = -1, last = -1; for (var i = 0; i < a[0].length; i++) { if (a[0][i] === t) { if (first < 0) first = i; last = i; } } return [first, last]; } });

// ---- Capacity To Ship Packages Within D Days (Binary Search on Answer) ----
MORE17.push({ slug: 'capacity-to-ship-packages-within-d-days', title: 'Capacity To Ship Packages Within D Days', difficulty: 'medium', topics: ['Array', 'Binary Search'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('shipWithinDays'),
  desc: '<p>Package weights <code>nums</code> must be shipped in order within <code>target</code> days. Each day loads a contiguous prefix whose total weight is at most the ship capacity. Return the minimum capacity that ships everything within <code>target</code> days.</p>',
  examples: [{ in: 'weights = [1,2,3,4,5,6,7,8,9,10], days = 5', out: '15' }, { in: 'weights = [3,2,2,4,1,4], days = 3', out: '6' }],
  constraints: ['1 &lt;= nums.length &lt;= 5*10^4', '1 &lt;= target &lt;= nums.length', '1 &lt;= nums[i] &lt;= 500'],
  editorial: ed('Binary search on capacity', 'def shipWithinDays(nums, target):\n    def ok(cap):\n        d, cur = 1, 0\n        for w in nums:\n            if cur + w > cap: d += 1; cur = 0\n            cur += w\n        return d <= target\n    lo, hi = max(nums), sum(nums)\n    while lo < hi:\n        mid = (lo+hi)//2\n        if ok(mid): hi = mid\n        else: lo = mid+1\n    return lo', 'O(n log(sum))', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5], [[3, 2, 2, 4, 1, 4], 3], [[1, 2, 3, 1, 1], 4]]; for (var k = 0; k < 38; k++) { var w = randArr(randInt(1, 9), 1, 9); o.push([w, randInt(1, w.length)]); } return o; },
  ref: function (a) { var w = a[0], days = a[1]; var lo = Math.max.apply(null, w), hi = w.reduce(function (s, x) { return s + x; }, 0); function ok(cap) { var d = 1, cur = 0; for (var i = 0; i < w.length; i++) { if (cur + w[i] > cap) { d++; cur = 0; } cur += w[i]; } return d <= days; } while (lo < hi) { var mid = (lo + hi) >> 1; if (ok(mid)) hi = mid; else lo = mid + 1; } return lo; } });

// ---- Asteroid Collision (Stack) ----
MORE17.push({ slug: 'asteroid-collision', title: 'Asteroid Collision', difficulty: 'medium', topics: ['Array', 'Stack', 'Simulation'], type: 'ARR_ARR', langsrc: T.ARR_ARR('asteroidCollision'),
  desc: '<p>Given <code>nums</code> of asteroids (absolute value = size, sign = direction: positive right, negative left), return the state after all collisions. Two moving toward each other: the smaller explodes; equal sizes both explode. Same direction never collide.</p>',
  examples: [{ in: 'asteroids = [5,10,-5]', out: '[5,10]' }, { in: 'asteroids = [8,-8]', out: '[]' }, { in: 'asteroids = [10,2,-5]', out: '[10]' }],
  constraints: ['2 &lt;= nums.length &lt;= 10^4', '-1000 &lt;= nums[i] &lt;= 1000', 'nums[i] != 0'],
  editorial: ed('Stack simulation', 'def asteroidCollision(nums):\n    st = []\n    for a in nums:\n        alive = True\n        while alive and a < 0 and st and st[-1] > 0:\n            if st[-1] < -a: st.pop()\n            elif st[-1] == -a: st.pop(); alive = False\n            else: alive = False\n        if alive: st.append(a)\n    return st', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[5, 10, -5]], [[8, -8]], [[10, 2, -5]], [[-2, -1, 1, 2]]]; for (var k = 0; k < 38; k++) { var n = randInt(2, 8), arr = []; for (var i = 0; i < n; i++) { var v = randInt(-6, 6); if (v === 0) v = 1; arr.push(v); } o.push([arr]); } return o; },
  ref: function (a) { var st = []; a[0].forEach(function (x) { var alive = true; while (alive && x < 0 && st.length && st[st.length - 1] > 0) { if (st[st.length - 1] < -x) st.pop(); else if (st[st.length - 1] === -x) { st.pop(); alive = false; } else alive = false; } if (alive) st.push(x); }); return st; } });

// ---- Next Greater Element II (Monotonic Stack, circular) ----
MORE17.push({ slug: 'next-greater-element-ii', title: 'Next Greater Element II', difficulty: 'medium', topics: ['Array', 'Stack', 'Monotonic Stack'], type: 'ARR_ARR', langsrc: T.ARR_ARR('nextGreaterElements'),
  desc: '<p>Given a <strong>circular</strong> array <code>nums</code>, return an array where each position holds the next greater element (searching circularly), or <code>-1</code> if none exists.</p>',
  examples: [{ in: 'nums = [1,2,1]', out: '[2,-1,2]' }, { in: 'nums = [1,2,3,4,3]', out: '[2,3,4,-1,4]' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^4', '-10^9 &lt;= nums[i] &lt;= 10^9'],
  editorial: ed('Monotonic stack over 2n', 'def nextGreaterElements(nums):\n    n = len(nums)\n    res = [-1]*n\n    st = []\n    for i in range(2*n):\n        cur = nums[i % n]\n        while st and nums[st[-1]] < cur:\n            res[st.pop()] = cur\n        if i < n:\n            st.append(i)\n    return res', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[1, 2, 1]], [[1, 2, 3, 4, 3]], [[5]], [[3, 3, 3]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 9), -3, 6)]); return o; },
  ref: function (a) { var nums = a[0], n = nums.length, res = [], st = []; for (var i = 0; i < n; i++) res.push(-1); for (i = 0; i < 2 * n; i++) { var cur = nums[i % n]; while (st.length && nums[st[st.length - 1]] < cur) res[st.pop()] = cur; if (i < n) st.push(i); } return res; } });

// ---- Partition Equal Subset Sum (DP knapsack) ----
MORE17.push({ slug: 'partition-equal-subset-sum', title: 'Partition Equal Subset Sum', difficulty: 'medium', topics: ['Array', 'Dynamic Programming'], type: 'ARR_BOOL', langsrc: T.ARR_BOOL('canPartition'),
  desc: '<p>Given an array <code>nums</code> of positive integers, return <code>true</code> if it can be split into two subsets with equal sum.</p>',
  examples: [{ in: 'nums = [1,5,11,5]', out: 'true' }, { in: 'nums = [1,2,3,5]', out: 'false' }],
  constraints: ['1 &lt;= nums.length &lt;= 200', '1 &lt;= nums[i] &lt;= 100'],
  editorial: ed('0/1 knapsack on sum/2', 'def canPartition(nums):\n    total = sum(nums)\n    if total % 2: return False\n    t = total // 2\n    dp = [False]*(t+1)\n    dp[0] = True\n    for x in nums:\n        for j in range(t, x-1, -1):\n            dp[j] = dp[j] or dp[j-x]\n    return dp[t]', 'O(n * sum)', 'O(sum)'),
  gen: function () { var o = [[[1, 5, 11, 5]], [[1, 2, 3, 5]], [[2, 2]], [[1]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 8), 1, 8)]); return o; },
  ref: function (a) { var total = a[0].reduce(function (s, x) { return s + x; }, 0); if (total % 2) return false; var t = total / 2, dp = []; for (var j = 0; j <= t; j++) dp.push(false); dp[0] = true; a[0].forEach(function (x) { for (var j = t; j >= x; j--) if (dp[j - x]) dp[j] = true; }); return dp[t]; } });

// ---- Excel Sheet Column Number (Math) ----
MORE17.push({ slug: 'excel-sheet-column-number', title: 'Excel Sheet Column Number', difficulty: 'easy', topics: ['Math', 'String'], type: 'STR_INT', langsrc: T.STR_INT('titleToNumber'),
  desc: '<p>Given a spreadsheet column title <code>s</code> (as in Excel: A, B, ..., Z, AA, AB, ...), return its corresponding column number.</p>',
  examples: [{ in: 's = "A"', out: '1' }, { in: 's = "AB"', out: '28' }, { in: 's = "ZY"', out: '701' }],
  constraints: ['1 &lt;= s.length &lt;= 7', 's consists of uppercase English letters and is in the range ["A", "FXSHRXW"].'],
  editorial: ed('Base-26', 'def titleToNumber(s):\n    r = 0\n    for c in s:\n        r = r * 26 + (ord(c) - ord("A") + 1)\n    return r', 'O(n)', 'O(1)'),
  gen: function () { var o = [['A'], ['AB'], ['ZY'], ['Z'], ['AA']]; for (var k = 0; k < 35; k++) o.push([rsUpper(randInt(1, 5))]); return o; },
  ref: function (a) { var r = 0; for (var i = 0; i < a[0].length; i++) r = r * 26 + (a[0].charCodeAt(i) - 64); return r; } });

// ---- Count Primes (Math / Sieve) ----
MORE17.push({ slug: 'count-primes', title: 'Count Primes', difficulty: 'medium', topics: ['Math', 'Sieve of Eratosthenes'], type: 'INT_INT', langsrc: T.INT_INT('countPrimes'),
  desc: '<p>Given an integer <code>n</code>, return the number of prime numbers strictly less than <code>n</code>.</p>',
  examples: [{ in: 'n = 10', out: '4' }, { in: 'n = 0', out: '0' }, { in: 'n = 2', out: '0' }],
  constraints: ['0 &lt;= n &lt;= 5*10^6'],
  editorial: ed('Sieve of Eratosthenes', 'def countPrimes(n):\n    if n < 3: return 0\n    sieve = [True]*n\n    sieve[0] = sieve[1] = False\n    i = 2\n    while i*i < n:\n        if sieve[i]:\n            for j in range(i*i, n, i):\n                sieve[j] = False\n        i += 1\n    return sum(sieve)', 'O(n log log n)', 'O(n)'),
  gen: function () { var o = [[10], [0], [2], [1], [3], [100]]; for (var k = 0; k < 34; k++) o.push([randInt(0, 200)]); return o; },
  ref: function (a) { var n = a[0]; if (n < 3) return 0; var sieve = []; for (var i = 0; i < n; i++) sieve.push(true); sieve[0] = sieve[1] = false; for (i = 2; i * i < n; i++) if (sieve[i]) for (var j = i * i; j < n; j += i) sieve[j] = false; var c = 0; for (i = 0; i < n; i++) if (sieve[i]) c++; return c; } });

// ---- Power of Two (Bit Manipulation) ----
MORE17.push({ slug: 'power-of-two', title: 'Power of Two', difficulty: 'easy', topics: ['Math', 'Bit Manipulation'], type: 'INT_BOOL', langsrc: T.INT_BOOL('isPowerOfTwo'),
  desc: '<p>Given an integer <code>n</code>, return <code>true</code> if it is a power of two (i.e., <code>n == 2^x</code> for some non-negative integer x).</p>',
  examples: [{ in: 'n = 1', out: 'true' }, { in: 'n = 16', out: 'true' }, { in: 'n = 3', out: 'false' }],
  constraints: ['-2^31 &lt;= n &lt;= 2^31 - 1'],
  editorial: ed('Bit trick n &amp; (n-1)', 'def isPowerOfTwo(n):\n    return n > 0 and (n & (n - 1)) == 0', 'O(1)', 'O(1)'),
  gen: function () { var o = [[1], [16], [3], [0], [-4], [1024], [6]]; for (var k = 0; k < 34; k++) { if (k % 2 === 0) o.push([1 << randInt(0, 12)]); else o.push([randInt(-4, 300)]); } return o; },
  ref: function (a) { var n = a[0]; return n > 0 && (n & (n - 1)) === 0; } });

// ---- Single Number II (Bit Manipulation) ----
MORE17.push({ slug: 'single-number-ii', title: 'Single Number II', difficulty: 'medium', topics: ['Array', 'Bit Manipulation'], type: 'ARR_INT', langsrc: T.ARR_INT('singleNumber'),
  desc: '<p>Every element in <code>nums</code> appears exactly three times except for one, which appears once. Return that single element. O(n) time and O(1) extra space.</p>',
  examples: [{ in: 'nums = [2,2,3,2]', out: '3' }, { in: 'nums = [0,1,0,1,0,1,99]', out: '99' }],
  constraints: ['1 &lt;= nums.length &lt;= 3*10^4', 'Each element appears 3x except one which appears once.'],
  editorial: ed('Bitwise ones/twos', 'def singleNumber(nums):\n    ones = twos = 0\n    for x in nums:\n        ones = (ones ^ x) & ~twos\n        twos = (twos ^ x) & ~ones\n    return ones', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[2, 2, 3, 2]], [[0, 1, 0, 1, 0, 1, 99]]]; for (var k = 0; k < 40; k++) { var used = {}, uniq = randInt(1, 50); used[uniq] = 1; var arr = [uniq]; var trips = randInt(1, 4); for (var t = 0; t < trips; t++) { var v; do { v = randInt(1, 80); } while (used[v]); used[v] = 1; arr.push(v, v, v); } o.push([shuffle(arr)]); } return o; },
  ref: function (a) { var cnt = {}; a[0].forEach(function (x) { cnt[x] = (cnt[x] || 0) + 1; }); for (var k in cnt) if (cnt[k] === 1) return +k; return 0; } });

// ---- First Missing Positive (Array) ----
MORE17.push({ slug: 'first-missing-positive', title: 'First Missing Positive', difficulty: 'hard', topics: ['Array', 'Hash Table'], type: 'ARR_INT', langsrc: T.ARR_INT('firstMissingPositive'),
  desc: '<p>Given an unsorted array <code>nums</code>, return the smallest missing positive integer. Aim for O(n) time and O(1) extra space (use the array itself as a hash).</p>',
  examples: [{ in: 'nums = [1,2,0]', out: '3' }, { in: 'nums = [3,4,-1,1]', out: '2' }, { in: 'nums = [7,8,9,11,12]', out: '1' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '-2^31 &lt;= nums[i] &lt;= 2^31 - 1'],
  editorial: ed('Index placement', 'def firstMissingPositive(nums):\n    n = len(nums)\n    for i in range(n):\n        while 1 <= nums[i] <= n and nums[nums[i]-1] != nums[i]:\n            j = nums[i]-1\n            nums[i], nums[j] = nums[j], nums[i]\n    for i in range(n):\n        if nums[i] != i+1:\n            return i+1\n    return n+1', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 0]], [[3, 4, -1, 1]], [[7, 8, 9, 11, 12]], [[1]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 10), -3, 10)]); return o; },
  ref: function (a) { var set = {}; a[0].forEach(function (x) { if (x > 0) set[x] = 1; }); var i = 1; while (set[i]) i++; return i; } });

// ---- Max Consecutive Ones III (Sliding Window) ----
MORE17.push({ slug: 'max-consecutive-ones-iii', title: 'Max Consecutive Ones III', difficulty: 'medium', topics: ['Array', 'Sliding Window'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('longestOnes'),
  desc: '<p>Given a binary array <code>nums</code> and an integer <code>target</code> (the number of <code>0</code>s you may flip to <code>1</code>), return the maximum number of consecutive <code>1</code>s achievable.</p>',
  examples: [{ in: 'nums = [1,1,1,0,0,0,1,1,1,1,0], target = 2', out: '6' }, { in: 'nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], target = 3', out: '10' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', 'nums[i] is 0 or 1', '0 &lt;= target &lt;= nums.length'],
  editorial: ed('Sliding window with at most k zeros', 'def longestOnes(nums, target):\n    l = zeros = best = 0\n    for r in range(len(nums)):\n        if nums[r] == 0: zeros += 1\n        while zeros > target:\n            if nums[l] == 0: zeros -= 1\n            l += 1\n        best = max(best, r - l + 1)\n    return best', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2], [[0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3]]; for (var k = 0; k < 38; k++) { var n = randInt(1, 14), arr = []; for (var i = 0; i < n; i++) arr.push(randInt(0, 1)); o.push([arr, randInt(0, 3)]); } return o; },
  ref: function (a) { var nums = a[0], k = a[1], l = 0, zeros = 0, best = 0; for (var r = 0; r < nums.length; r++) { if (nums[r] === 0) zeros++; while (zeros > k) { if (nums[l] === 0) zeros--; l++; } best = Math.max(best, r - l + 1); } return best; } });

module.exports = { MORE17 };
