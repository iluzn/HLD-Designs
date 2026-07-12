// Batch 21: famous BINARY SEARCH problems — classic binary search on sorted
// arrays plus the "binary search on the answer" family (minimize/maximize a
// feasible value under a monotone predicate). All outputs are unambiguous.
const { T, randInt, randArr, ln } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}
function sortAsc(a) { return a.slice().sort(function (x, y) { return x - y; }); }
function sum(a) { return a.reduce(function (s, x) { return s + x; }, 0); }
function maxOf(a) { return a.reduce(function (m, x) { return x > m ? x : m; }, a[0]); }
function minOf(a) { return a.reduce(function (m, x) { return x < m ? x : m; }, a[0]); }
function distinctSorted(n, lo, hi) { var set = {}, out = []; var guard = 0; while (out.length < n && guard < 1000) { var v = randInt(lo, hi); guard++; if (!set[v]) { set[v] = 1; out.push(v); } } return out.sort(function (x, y) { return x - y; }); }

const MORE21 = [];

// ---- Valid Perfect Square (Binary Search) ----
MORE21.push({ slug: 'valid-perfect-square', title: 'Valid Perfect Square', difficulty: 'easy', topics: ['Math', 'Binary Search'], type: 'INT_BOOL', langsrc: T.INT_BOOL('isPerfectSquare'),
  desc: '<p>Given a positive integer <code>n</code>, return <code>true</code> if it is a perfect square (the square of some integer), and <code>false</code> otherwise. Do not use any built-in square-root function.</p>',
  examples: [{ in: 'n = 16', out: 'true' }, { in: 'n = 14', out: 'false' }, { in: 'n = 1', out: 'true' }],
  constraints: ['1 &lt;= n &lt;= 2^31 - 1'],
  editorial: ed('Binary search on the root', 'def isPerfectSquare(n):\n    lo, hi = 1, n\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        sq = mid * mid\n        if sq == n: return True\n        if sq < n: lo = mid + 1\n        else: hi = mid - 1\n    return False', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[16], [14], [1], [2147395600]]; for (var k = 0; k < 36; k++) { if (k % 2 === 0) { var r = randInt(1, 200); o.push([r * r]); } else o.push([randInt(2, 40000)]); } return o; },
  ref: function (a) { var n = a[0], lo = 1, hi = n; while (lo <= hi) { var mid = Math.floor((lo + hi) / 2), sq = mid * mid; if (sq === n) return true; if (sq < n) lo = mid + 1; else hi = mid - 1; } return false; } });

// ---- Arranging Coins (Binary Search) ----
MORE21.push({ slug: 'arranging-coins', title: 'Arranging Coins', difficulty: 'easy', topics: ['Math', 'Binary Search'], type: 'INT_INT', langsrc: T.INT_INT('arrangeCoins'),
  desc: '<p>You have <code>n</code> coins and want to build a staircase where row <code>i</code> holds exactly <code>i</code> coins. The last row may be incomplete. Return the number of <strong>complete</strong> rows you can build.</p>',
  examples: [{ in: 'n = 5', out: '2' }, { in: 'n = 8', out: '3' }, { in: 'n = 1', out: '1' }],
  constraints: ['1 &lt;= n &lt;= 2^31 - 1'],
  editorial: ed('Binary search on row count', 'def arrangeCoins(n):\n    lo, hi = 0, n\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        need = mid * (mid + 1) // 2\n        if need <= n: lo = mid + 1\n        else: hi = mid - 1\n    return hi', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[5], [8], [1], [1000000000]]; for (var k = 0; k < 36; k++) o.push([randInt(1, 200000)]); return o; },
  ref: function (a) { var n = a[0], lo = 0, hi = n; while (lo <= hi) { var mid = Math.floor((lo + hi) / 2), need = mid * (mid + 1) / 2; if (need <= n) lo = mid + 1; else hi = mid - 1; } return hi; } });

// ---- Single Element in a Sorted Array (Binary Search) ----
MORE21.push({ slug: 'single-element-in-a-sorted-array', title: 'Single Element in a Sorted Array', difficulty: 'medium', topics: ['Array', 'Binary Search'], type: 'ARR_INT', langsrc: T.ARR_INT('singleNonDuplicate'),
  desc: '<p>Given a sorted array <code>nums</code> where every element appears exactly twice except for one element that appears exactly once, return the single element. Your solution must run in O(log n) time and O(1) space.</p>',
  examples: [{ in: 'nums = [1,1,2,3,3,4,4,8,8]', out: '2' }, { in: 'nums = [3,3,7,7,10,11,11]', out: '10' }, { in: 'nums = [1]', out: '1' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '0 &lt;= nums[i] &lt;= 10^5', 'Every element appears twice except one which appears once.'],
  editorial: ed('Binary search on even indices', 'def singleNonDuplicate(nums):\n    lo, hi = 0, len(nums) - 1\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if mid % 2 == 1: mid -= 1\n        if nums[mid] == nums[mid + 1]: lo = mid + 2\n        else: hi = mid\n    return nums[lo]', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[[1, 1, 2, 3, 3, 4, 4, 8, 8]], [[3, 3, 7, 7, 10, 11, 11]], [[1]], [[0, 0, 1, 1, 2]]]; for (var k = 0; k < 36; k++) { var m = randInt(1, 8), vals = distinctSorted(m, 0, 40); var single = randInt(0, m - 1); var arr = []; for (var i = 0; i < m; i++) { arr.push(vals[i]); if (i !== single) arr.push(vals[i]); } arr.sort(function (x, y) { return x - y; }); o.push([arr]); } return o; },
  ref: function (a) { var x = 0; for (var i = 0; i < a[0].length; i++) x ^= a[0][i]; return x; } });

// ---- Peak Index in a Mountain Array (Binary Search) ----
MORE21.push({ slug: 'peak-index-in-a-mountain-array', title: 'Peak Index in a Mountain Array', difficulty: 'medium', topics: ['Array', 'Binary Search'], type: 'ARR_INT', langsrc: T.ARR_INT('peakIndexInMountainArray'),
  desc: '<p>An array <code>nums</code> is a <strong>mountain</strong>: it strictly increases up to a unique peak and then strictly decreases. Return the index of the peak element. Solve in O(log n) time.</p>',
  examples: [{ in: 'nums = [0,1,0]', out: '1' }, { in: 'nums = [0,2,1,0]', out: '1' }, { in: 'nums = [0,10,5,2]', out: '1' }],
  constraints: ['3 &lt;= nums.length &lt;= 10^5', '0 &lt;= nums[i] &lt;= 10^6', 'nums forms a mountain (unique peak).'],
  editorial: ed('Binary search toward the rising slope', 'def peakIndexInMountainArray(nums):\n    lo, hi = 0, len(nums) - 1\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if nums[mid] < nums[mid + 1]: lo = mid + 1\n        else: hi = mid\n    return lo', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[[0, 1, 0]], [[0, 2, 1, 0]], [[0, 10, 5, 2]], [[3, 4, 5, 1]]]; for (var k = 0; k < 36; k++) { var n = randInt(3, 11), peak = randInt(1, n - 2); var arr = [], cur = randInt(0, 5); arr.push(cur); for (var i = 1; i <= peak; i++) { cur += randInt(1, 4); arr.push(cur); } for (i = peak + 1; i < n; i++) { cur -= randInt(1, 4); arr.push(cur); } o.push([arr]); } return o; },
  ref: function (a) { var best = 0; for (var i = 1; i < a[0].length; i++) if (a[0][i] > a[0][best]) best = i; return best; } });

// ---- H-Index II (Binary Search) ----
MORE21.push({ slug: 'h-index-ii', title: 'H-Index II', difficulty: 'medium', topics: ['Array', 'Binary Search'], type: 'ARR_INT', langsrc: T.ARR_INT('hIndex'),
  desc: '<p>Given an array <code>nums</code> of citation counts sorted in <strong>ascending</strong> order, return the researcher\'s <strong>h-index</strong>: the maximum value <code>h</code> such that at least <code>h</code> papers have at least <code>h</code> citations each. Solve in O(log n).</p>',
  examples: [{ in: 'nums = [0,1,3,5,6]', out: '3' }, { in: 'nums = [1,2,100]', out: '2' }, { in: 'nums = [0]', out: '0' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '0 &lt;= nums[i] &lt;= 1000', 'nums is sorted in ascending order.'],
  editorial: ed('Binary search on index', 'def hIndex(nums):\n    n = len(nums)\n    lo, hi = 0, n - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] >= n - mid: hi = mid - 1\n        else: lo = mid + 1\n    return n - lo', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[[0, 1, 3, 5, 6]], [[1, 2, 100]], [[0]], [[0, 0, 0, 0]]]; for (var k = 0; k < 36; k++) o.push([sortAsc(randArr(randInt(1, 10), 0, 12))]); return o; },
  ref: function (a) { var c = a[0], n = c.length; for (var i = 0; i < n; i++) if (c[i] >= n - i) return n - i; return 0; } });

// ---- Maximum Count of Positive Integer and Negative Integer (Binary Search) ----
MORE21.push({ slug: 'maximum-count-of-positive-integer-and-negative-integer', title: 'Maximum Count of Positive Integer and Negative Integer', difficulty: 'easy', topics: ['Array', 'Binary Search', 'Counting'], type: 'ARR_INT', langsrc: T.ARR_INT('maximumCount'),
  desc: '<p>Given a sorted array <code>nums</code> in non-decreasing order, return the maximum between the number of strictly positive integers and the number of strictly negative integers. Zeros count toward neither. Aim for O(log n).</p>',
  examples: [{ in: 'nums = [-2,-1,-1,1,2,3]', out: '3' }, { in: 'nums = [-3,-2,-1]', out: '3' }, { in: 'nums = [5,20,66,1314]', out: '4' }],
  constraints: ['1 &lt;= nums.length &lt;= 2000', '-2000 &lt;= nums[i] &lt;= 2000', 'nums is sorted in non-decreasing order.'],
  editorial: ed('Binary search the boundaries', 'def maximumCount(nums):\n    neg = sum(1 for x in nums if x < 0)\n    pos = sum(1 for x in nums if x > 0)\n    return max(neg, pos)', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[[-2, -1, -1, 1, 2, 3]], [[-3, -2, -1]], [[5, 20, 66, 1314]], [[0, 0, 0]]]; for (var k = 0; k < 36; k++) o.push([sortAsc(randArr(randInt(1, 10), -6, 6))]); return o; },
  ref: function (a) { var neg = 0, pos = 0; a[0].forEach(function (x) { if (x < 0) neg++; else if (x > 0) pos++; }); return neg > pos ? neg : pos; } });

// ---- Kth Missing Positive Number (Binary Search on Answer) ----
MORE21.push({ slug: 'kth-missing-positive-number', title: 'Kth Missing Positive Number', difficulty: 'easy', topics: ['Array', 'Binary Search'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('findKthPositive'),
  desc: '<p>Given a strictly increasing array of positive integers <code>nums</code> and an integer <code>target</code> (= k), return the <code>target</code>-th positive integer that is <strong>missing</strong> from the array.</p>',
  examples: [{ in: 'nums = [2,3,4,7,11], target = 5', out: '9' }, { in: 'nums = [1,2,3,4], target = 2', out: '6' }],
  constraints: ['1 &lt;= nums.length &lt;= 1000', '1 &lt;= nums[i] &lt;= 1000', 'nums is strictly increasing.', '1 &lt;= target &lt;= 1000'],
  editorial: ed('Binary search on missing count', 'def findKthPositive(nums, target):\n    lo, hi = 0, len(nums)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if nums[mid] - (mid + 1) < target: lo = mid + 1\n        else: hi = mid\n    return target + lo', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[[2, 3, 4, 7, 11], 5], [[1, 2, 3, 4], 2], [[5, 6, 7], 1]]; for (var k = 0; k < 37; k++) { var arr = distinctSorted(randInt(1, 8), 1, 20); o.push([arr, randInt(1, 12)]); } return o; },
  ref: function (a) { var arr = a[0], k = a[1], idx = 0, num = 1, missing = 0; while (true) { if (idx < arr.length && arr[idx] === num) idx++; else { missing++; if (missing === k) return num; } num++; } } });

// ---- Split Array Largest Sum (Binary Search on Answer) ----
MORE21.push({ slug: 'split-array-largest-sum', title: 'Split Array Largest Sum', difficulty: 'hard', topics: ['Array', 'Binary Search', 'Greedy'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('splitArray'),
  desc: '<p>Given an array <code>nums</code> and an integer <code>target</code> (= k), split <code>nums</code> into <code>target</code> non-empty contiguous subarrays so as to minimize the largest subarray sum. Return that minimized largest sum.</p>',
  examples: [{ in: 'nums = [7,2,5,10,8], target = 2', out: '18' }, { in: 'nums = [1,2,3,4,5], target = 2', out: '9' }, { in: 'nums = [1,4,4], target = 3', out: '4' }],
  constraints: ['1 &lt;= nums.length &lt;= 1000', '0 &lt;= nums[i] &lt;= 10^6', '1 &lt;= target &lt;= nums.length'],
  editorial: ed('Binary search on the largest sum', 'def splitArray(nums, target):\n    def need(cap):\n        c, cur = 1, 0\n        for x in nums:\n            if cur + x > cap: c += 1; cur = 0\n            cur += x\n        return c\n    lo, hi = max(nums), sum(nums)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if need(mid) <= target: hi = mid\n        else: lo = mid + 1\n    return lo', 'O(n log(sum))', 'O(1)'),
  gen: function () { var o = [[[7, 2, 5, 10, 8], 2], [[1, 2, 3, 4, 5], 2], [[1, 4, 4], 3]]; for (var k = 0; k < 37; k++) { var arr = randArr(randInt(1, 9), 1, 12); o.push([arr, randInt(1, arr.length)]); } return o; },
  ref: function (a) { var nums = a[0], k = a[1]; function need(cap) { var c = 1, cur = 0; for (var i = 0; i < nums.length; i++) { if (cur + nums[i] > cap) { c++; cur = 0; } cur += nums[i]; } return c; } var lo = maxOf(nums), hi = sum(nums); while (lo < hi) { var mid = Math.floor((lo + hi) / 2); if (need(mid) <= k) hi = mid; else lo = mid + 1; } return lo; } });

// ---- Find the Smallest Divisor Given a Threshold (Binary Search on Answer) ----
MORE21.push({ slug: 'find-the-smallest-divisor-given-a-threshold', title: 'Find the Smallest Divisor Given a Threshold', difficulty: 'medium', topics: ['Array', 'Binary Search'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('smallestDivisor'),
  desc: '<p>Given an array <code>nums</code> and an integer <code>target</code> (the threshold), find the smallest positive divisor <code>d</code> such that the sum of <code>ceil(nums[i] / d)</code> over all elements is less than or equal to <code>target</code>. It is guaranteed that a valid divisor exists.</p>',
  examples: [{ in: 'nums = [1,2,5,9], target = 6', out: '5' }, { in: 'nums = [44,22,33,11,1], target = 5', out: '44' }],
  constraints: ['1 &lt;= nums.length &lt;= 5*10^4', '1 &lt;= nums[i] &lt;= 10^6', 'nums.length &lt;= target &lt;= 10^6'],
  editorial: ed('Binary search on the divisor', 'def smallestDivisor(nums, target):\n    def total(d):\n        return sum((x + d - 1) // d for x in nums)\n    lo, hi = 1, max(nums)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if total(mid) <= target: hi = mid\n        else: lo = mid + 1\n    return lo', 'O(n log(max))', 'O(1)'),
  gen: function () { var o = [[[1, 2, 5, 9], 6], [[44, 22, 33, 11, 1], 5], [[21212, 10101, 12121], 1000000]]; for (var k = 0; k < 37; k++) { var arr = randArr(randInt(1, 8), 1, 30); o.push([arr, randInt(arr.length, sum(arr))]); } return o; },
  ref: function (a) { var nums = a[0], t = a[1]; function total(d) { var s = 0; for (var i = 0; i < nums.length; i++) s += Math.floor((nums[i] + d - 1) / d); return s; } var lo = 1, hi = maxOf(nums); while (lo < hi) { var mid = Math.floor((lo + hi) / 2); if (total(mid) <= t) hi = mid; else lo = mid + 1; } return lo; } });

// ---- Minimum Time to Complete Trips (Binary Search on Answer) ----
MORE21.push({ slug: 'minimum-time-to-complete-trips', title: 'Minimum Time to Complete Trips', difficulty: 'medium', topics: ['Array', 'Binary Search'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('minimumTime'),
  desc: '<p>Given an array <code>nums</code> where <code>nums[i]</code> is the time a bus takes for one trip, and an integer <code>target</code> (the total number of trips required by all buses combined), return the minimum time needed for the buses to complete at least <code>target</code> trips. Buses run independently and in parallel.</p>',
  examples: [{ in: 'nums = [1,2,3], target = 5', out: '3' }, { in: 'nums = [2], target = 1', out: '2' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '1 &lt;= nums[i] &lt;= 10^7', '1 &lt;= target &lt;= 10^7'],
  editorial: ed('Binary search on time', 'def minimumTime(nums, target):\n    def trips(t):\n        return sum(t // x for x in nums)\n    lo, hi = 1, min(nums) * target\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if trips(mid) >= target: hi = mid\n        else: lo = mid + 1\n    return lo', 'O(n log(min*target))', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3], 5], [[2], 1], [[5, 10, 10], 9]]; for (var k = 0; k < 37; k++) { var arr = randArr(randInt(1, 6), 1, 10); o.push([arr, randInt(1, 25)]); } return o; },
  ref: function (a) { var nums = a[0], t = a[1]; function trips(tm) { var s = 0; for (var i = 0; i < nums.length; i++) s += Math.floor(tm / nums[i]); return s; } var lo = 1, hi = minOf(nums) * t; while (lo < hi) { var mid = Math.floor((lo + hi) / 2); if (trips(mid) >= t) hi = mid; else lo = mid + 1; } return lo; } });

// ---- Maximum Candies Allocated to K Children (Binary Search on Answer) ----
MORE21.push({ slug: 'maximum-candies-allocated-to-k-children', title: 'Maximum Candies Allocated to K Children', difficulty: 'medium', topics: ['Array', 'Binary Search'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('maximumCandies'),
  desc: '<p>Given an array <code>nums</code> of candy piles and an integer <code>target</code> (= k children), split piles (never merge) so every child gets the same number of candies from a single sub-pile. Return the maximum number of candies each child can get; return <code>0</code> if it is impossible to give every child at least one candy.</p>',
  examples: [{ in: 'nums = [5,8,6], target = 3', out: '5' }, { in: 'nums = [2,5], target = 11', out: '0' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '1 &lt;= nums[i] &lt;= 10^7', '1 &lt;= target &lt;= 10^12'],
  editorial: ed('Binary search on candies per child', 'def maximumCandies(nums, target):\n    if sum(nums) < target: return 0\n    def kids(x):\n        return sum(v // x for v in nums)\n    lo, hi, ans = 1, max(nums), 0\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if kids(mid) >= target: ans = mid; lo = mid + 1\n        else: hi = mid - 1\n    return ans', 'O(n log(max))', 'O(1)'),
  gen: function () { var o = [[[5, 8, 6], 3], [[2, 5], 11], [[4, 7, 5], 4]]; for (var k = 0; k < 37; k++) { var arr = randArr(randInt(1, 8), 1, 15); o.push([arr, randInt(1, sum(arr) + 3)]); } return o; },
  ref: function (a) { var nums = a[0], t = a[1]; if (sum(nums) < t) return 0; function kids(x) { var s = 0; for (var i = 0; i < nums.length; i++) s += Math.floor(nums[i] / x); return s; } var lo = 1, hi = maxOf(nums), ans = 0; while (lo <= hi) { var mid = Math.floor((lo + hi) / 2); if (kids(mid) >= t) { ans = mid; lo = mid + 1; } else hi = mid - 1; } return ans; } });

// ---- Minimized Maximum of Products Distributed to Any Store (Binary Search on Answer) ----
MORE21.push({ slug: 'minimized-maximum-of-products-distributed-to-any-store', title: 'Minimized Maximum of Products Distributed to Any Store', difficulty: 'medium', topics: ['Array', 'Binary Search'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('minimizedMaximum'),
  desc: '<p>Given an array <code>nums</code> where <code>nums[i]</code> is the quantity of the i-th product, distribute all products to <code>target</code> stores. Each store gets at most one product type and any quantity (including zero). Return the minimum possible value of the maximum number of products given to any single store.</p>',
  examples: [{ in: 'nums = [11,6], target = 10', out: '3' }, { in: 'nums = [15,10,10], target = 7', out: '5' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '1 &lt;= nums[i] &lt;= 10^5', 'nums.length &lt;= target &lt;= 10^5'],
  editorial: ed('Binary search on the max per store', 'def minimizedMaximum(nums, target):\n    def stores(x):\n        return sum((v + x - 1) // x for v in nums)\n    lo, hi = 1, max(nums)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if stores(mid) <= target: hi = mid\n        else: lo = mid + 1\n    return lo', 'O(n log(max))', 'O(1)'),
  gen: function () { var o = [[[11, 6], 10], [[15, 10, 10], 7], [[100000], 100000]]; for (var k = 0; k < 37; k++) { var arr = randArr(randInt(1, 8), 1, 30); o.push([arr, randInt(arr.length, arr.length + 20)]); } return o; },
  ref: function (a) { var nums = a[0], t = a[1]; function stores(x) { var s = 0; for (var i = 0; i < nums.length; i++) s += Math.floor((nums[i] + x - 1) / x); return s; } var lo = 1, hi = maxOf(nums); while (lo < hi) { var mid = Math.floor((lo + hi) / 2); if (stores(mid) <= t) hi = mid; else lo = mid + 1; } return lo; } });

// ---- Divide Chocolate (Binary Search on Answer) ----
MORE21.push({ slug: 'divide-chocolate', title: 'Divide Chocolate', difficulty: 'hard', topics: ['Array', 'Binary Search'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('maximizeSweetness'),
  desc: '<p>Given an array <code>nums</code> of chunk sweetness values and an integer <code>target</code> (the number of cuts), you split the bar into <code>target + 1</code> contiguous pieces and keep the piece with the smallest total sweetness. Return the maximum total sweetness of the piece you can guarantee for yourself.</p>',
  examples: [{ in: 'nums = [1,2,3,4,5,6,7,8,9], target = 5', out: '6' }, { in: 'nums = [5,6,7,8,9,1,2,3,4], target = 8', out: '1' }, { in: 'nums = [1,2,2,1,2,2,1,2,2], target = 2', out: '5' }],
  constraints: ['0 &lt;= target &lt; nums.length &lt;= 10^4', '1 &lt;= nums[i] &lt;= 10^5'],
  editorial: ed('Binary search on the minimum piece', 'def maximizeSweetness(nums, target):\n    def pieces(x):\n        c, cur = 0, 0\n        for v in nums:\n            cur += v\n            if cur >= x: c += 1; cur = 0\n        return c\n    lo, hi, ans = min(nums), sum(nums), 0\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if pieces(mid) >= target + 1: ans = mid; lo = mid + 1\n        else: hi = mid - 1\n    return ans', 'O(n log(sum))', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3, 4, 5, 6, 7, 8, 9], 5], [[5, 6, 7, 8, 9, 1, 2, 3, 4], 8], [[1, 2, 2, 1, 2, 2, 1, 2, 2], 2]]; for (var k = 0; k < 37; k++) { var arr = randArr(randInt(2, 10), 1, 12); o.push([arr, randInt(0, arr.length - 1)]); } return o; },
  ref: function (a) { var nums = a[0], k = a[1]; function pieces(x) { var c = 0, cur = 0; for (var i = 0; i < nums.length; i++) { cur += nums[i]; if (cur >= x) { c++; cur = 0; } } return c; } var lo = minOf(nums), hi = sum(nums), ans = 0; while (lo <= hi) { var mid = Math.floor((lo + hi) / 2); if (pieces(mid) >= k + 1) { ans = mid; lo = mid + 1; } else hi = mid - 1; } return ans; } });

// ---- Magnetic Force Between Two Balls (Binary Search on Answer) ----
MORE21.push({ slug: 'magnetic-force-between-two-balls', title: 'Magnetic Force Between Two Balls', difficulty: 'medium', topics: ['Array', 'Binary Search', 'Sorting'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('maxDistance'),
  desc: '<p>Given an array <code>nums</code> of distinct basket positions and an integer <code>target</code> (= m balls), place the balls into baskets so that the minimum distance between any two balls is as large as possible. Return that maximum possible minimum distance.</p>',
  examples: [{ in: 'nums = [1,2,3,4,7], target = 3', out: '3' }, { in: 'nums = [5,4,3,2,1,1000000000], target = 2', out: '999999999' }],
  constraints: ['2 &lt;= nums.length &lt;= 10^5', '1 &lt;= nums[i] &lt;= 10^9', 'All positions are distinct.', '2 &lt;= target &lt;= nums.length'],
  editorial: ed('Sort then binary search on distance', 'def maxDistance(nums, target):\n    nums.sort()\n    def ok(d):\n        cnt, last = 1, nums[0]\n        for p in nums[1:]:\n            if p - last >= d: cnt += 1; last = p\n        return cnt >= target\n    lo, hi, ans = 1, nums[-1] - nums[0], 0\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if ok(mid): ans = mid; lo = mid + 1\n        else: hi = mid - 1\n    return ans', 'O(n log(max))', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3, 4, 7], 3], [[5, 4, 3, 2, 1, 1000000000], 2], [[1, 5, 9, 13], 4]]; for (var k = 0; k < 37; k++) { var n = randInt(2, 8), arr = distinctSorted(n, 1, 60); o.push([arr, randInt(2, arr.length)]); } return o; },
  ref: function (a) { var nums = sortAsc(a[0]), m = a[1]; function ok(d) { var cnt = 1, last = nums[0]; for (var i = 1; i < nums.length; i++) { if (nums[i] - last >= d) { cnt++; last = nums[i]; } } return cnt >= m; } var lo = 1, hi = nums[nums.length - 1] - nums[0], ans = 0; while (lo <= hi) { var mid = Math.floor((lo + hi) / 2); if (ok(mid)) { ans = mid; lo = mid + 1; } else hi = mid - 1; } return ans; } });

// ---- Minimum Limit of Balls in a Bag (Binary Search on Answer) ----
MORE21.push({ slug: 'minimum-limit-of-balls-in-a-bag', title: 'Minimum Limit of Balls in a Bag', difficulty: 'medium', topics: ['Array', 'Binary Search'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('minimumSize'),
  desc: '<p>Given an array <code>nums</code> of bag sizes and an integer <code>target</code> (the maximum number of split operations allowed), each operation splits one bag into two smaller non-negative bags. Return the minimum possible penalty, where the penalty is the maximum number of balls in any bag after all operations.</p>',
  examples: [{ in: 'nums = [9], target = 2', out: '3' }, { in: 'nums = [2,4,8,2], target = 4', out: '2' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '1 &lt;= nums[i] &lt;= 10^9', '1 &lt;= target &lt;= 10^9'],
  editorial: ed('Binary search on the penalty', 'def minimumSize(nums, target):\n    def ops(x):\n        return sum((v - 1) // x for v in nums)\n    lo, hi = 1, max(nums)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if ops(mid) <= target: hi = mid\n        else: lo = mid + 1\n    return lo', 'O(n log(max))', 'O(1)'),
  gen: function () { var o = [[[9], 2], [[2, 4, 8, 2], 4], [[7, 17], 2]]; for (var k = 0; k < 37; k++) { var arr = randArr(randInt(1, 8), 1, 30); o.push([arr, randInt(1, 15)]); } return o; },
  ref: function (a) { var nums = a[0], t = a[1]; function ops(x) { var s = 0; for (var i = 0; i < nums.length; i++) s += Math.floor((nums[i] - 1) / x); return s; } var lo = 1, hi = maxOf(nums); while (lo < hi) { var mid = Math.floor((lo + hi) / 2); if (ops(mid) <= t) hi = mid; else lo = mid + 1; } return lo; } });

// ---- Find Target Indices After Sorting the Array (Binary Search) ----
MORE21.push({ slug: 'find-target-indices-after-sorting-the-array', title: 'Find Target Indices After Sorting the Array', difficulty: 'easy', topics: ['Array', 'Binary Search', 'Sorting'], type: 'ARR_TGT_ARR', langsrc: T.ARR_TGT_ARR('targetIndices'),
  desc: '<p>Given an array <code>nums</code> and an integer <code>target</code>, first sort <code>nums</code> in non-decreasing order. Return the list of indices <code>i</code> (in increasing order) such that after sorting <code>nums[i] == target</code>. If <code>target</code> is not present, return an empty list.</p>',
  examples: [{ in: 'nums = [1,2,5,2,3], target = 2', out: '[1,2]' }, { in: 'nums = [1,2,5,2,3], target = 3', out: '[3]' }, { in: 'nums = [1,2,5,2,3], target = 5', out: '[4]' }],
  constraints: ['1 &lt;= nums.length &lt;= 100', '1 &lt;= nums[i], target &lt;= 100'],
  editorial: ed('Count smaller and equal', 'def targetIndices(nums, target):\n    lo = sum(1 for x in nums if x < target)\n    cnt = sum(1 for x in nums if x == target)\n    return list(range(lo, lo + cnt))', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 5, 2, 3], 2], [[1, 2, 5, 2, 3], 3], [[1, 2, 5, 2, 3], 5], [[1, 2, 5, 2, 3], 4]]; for (var k = 0; k < 36; k++) { var arr = randArr(randInt(1, 8), 1, 6); o.push([arr, randInt(1, 6)]); } return o; },
  ref: function (a) { var nums = a[0], t = a[1], lo = 0, cnt = 0; nums.forEach(function (x) { if (x < t) lo++; else if (x === t) cnt++; }); var res = []; for (var i = 0; i < cnt; i++) res.push(lo + i); return res; } });

module.exports = { MORE21 };
