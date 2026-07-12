// Batch 18: array & math fundamentals — prefix sums, counting, simple DP.
const { T, randInt, randArr, ln } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}
function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = randInt(0, i); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function perm(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return shuffle(a); }
function binArr(n) { var a = []; for (var i = 0; i < n; i++) a.push(randInt(0, 1)); return a; }

const MORE18 = [];

// ---- Running Sum of 1d Array ----
MORE18.push({ slug: 'running-sum-of-1d-array', title: 'Running Sum of 1d Array', difficulty: 'easy', topics: ['Array', 'Prefix Sum'], type: 'ARR_ARR', langsrc: T.ARR_ARR('runningSum'),
  desc: '<p>Given an array <code>nums</code>, return its running sum where <code>runningSum[i] = sum(nums[0..i])</code>.</p>',
  examples: [{ in: 'nums = [1,2,3,4]', out: '[1,3,6,10]' }, { in: 'nums = [1,1,1,1,1]', out: '[1,2,3,4,5]' }],
  constraints: ['1 &lt;= nums.length &lt;= 1000', '-10^6 &lt;= nums[i] &lt;= 10^6'],
  editorial: ed('Prefix sum', 'def runningSum(nums):\n    s = 0; out = []\n    for x in nums:\n        s += x; out.append(s)\n    return out', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3, 4]], [[1, 1, 1, 1, 1]], [[3, 1, 2, 10, 1]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 10), -5, 9)]); return o; },
  ref: function (a) { var s = 0, out = []; a[0].forEach(function (x) { s += x; out.push(s); }); return out; } });

// ---- Build Array from Permutation ----
MORE18.push({ slug: 'build-array-from-permutation', title: 'Build Array from Permutation', difficulty: 'easy', topics: ['Array', 'Simulation'], type: 'ARR_ARR', langsrc: T.ARR_ARR('buildArray'),
  desc: '<p>Given a zero-based permutation <code>nums</code>, build an array <code>ans</code> of the same length where <code>ans[i] = nums[nums[i]]</code>.</p>',
  examples: [{ in: 'nums = [0,2,1,5,3,4]', out: '[0,1,2,4,5,3]' }, { in: 'nums = [5,0,1,2,3,4]', out: '[4,5,0,1,2,3]' }],
  constraints: ['1 &lt;= nums.length &lt;= 1000', 'nums is a permutation of 0..n-1'],
  editorial: ed('Direct indexing', 'def buildArray(nums):\n    return [nums[nums[i]] for i in range(len(nums))]', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[0, 2, 1, 5, 3, 4]], [[5, 0, 1, 2, 3, 4]], [[0]]]; for (var k = 0; k < 38; k++) o.push([perm(randInt(1, 10))]); return o; },
  ref: function (a) { var n = a[0]; return n.map(function (_, i) { return n[n[i]]; }); } });

// ---- Concatenation of Array ----
MORE18.push({ slug: 'concatenation-of-array', title: 'Concatenation of Array', difficulty: 'easy', topics: ['Array', 'Simulation'], type: 'ARR_ARR', langsrc: T.ARR_ARR('getConcatenation'),
  desc: '<p>Given an array <code>nums</code> of length n, return an array <code>ans</code> of length 2n where <code>ans[i] = nums[i]</code> and <code>ans[i+n] = nums[i]</code>.</p>',
  examples: [{ in: 'nums = [1,2,1]', out: '[1,2,1,1,2,1]' }, { in: 'nums = [1,3,2,1]', out: '[1,3,2,1,1,3,2,1]' }],
  constraints: ['1 &lt;= nums.length &lt;= 1000', '1 &lt;= nums[i] &lt;= 1000'],
  editorial: ed('Concatenate', 'def getConcatenation(nums):\n    return nums + nums', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[1, 2, 1]], [[1, 3, 2, 1]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 10), 1, 20)]); return o; },
  ref: function (a) { return a[0].concat(a[0]); } });

// ---- Find Numbers with Even Number of Digits ----
MORE18.push({ slug: 'find-numbers-with-even-number-of-digits', title: 'Find Numbers with Even Number of Digits', difficulty: 'easy', topics: ['Array', 'Math'], type: 'ARR_INT', langsrc: T.ARR_INT('findNumbers'),
  desc: '<p>Given an array <code>nums</code> of integers, return how many of them contain an even number of digits.</p>',
  examples: [{ in: 'nums = [12,345,2,6,7896]', out: '2' }, { in: 'nums = [555,901,482,1771]', out: '1' }],
  constraints: ['1 &lt;= nums.length &lt;= 500', '1 &lt;= nums[i] &lt;= 10^5'],
  editorial: ed('Count digits', 'def findNumbers(nums):\n    return sum(1 for x in nums if len(str(abs(x))) % 2 == 0)', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[12, 345, 2, 6, 7896]], [[555, 901, 482, 1771]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 10), 1, 99999)]); return o; },
  ref: function (a) { var c = 0; a[0].forEach(function (x) { if (('' + Math.abs(x)).length % 2 === 0) c++; }); return c; } });

// ---- How Many Numbers Are Smaller Than the Current Number ----
MORE18.push({ slug: 'how-many-numbers-are-smaller-than-the-current-number', title: 'How Many Numbers Are Smaller Than the Current Number', difficulty: 'easy', topics: ['Array', 'Hash Table', 'Counting'], type: 'ARR_ARR', langsrc: T.ARR_ARR('smallerNumbersThanCurrent'),
  desc: '<p>For each <code>nums[i]</code>, count how many <code>nums[j]</code> (j != i) are strictly smaller. Return the counts as an array.</p>',
  examples: [{ in: 'nums = [8,1,2,2,3]', out: '[4,0,1,1,3]' }, { in: 'nums = [6,5,4,8]', out: '[2,1,0,3]' }],
  constraints: ['2 &lt;= nums.length &lt;= 500', '0 &lt;= nums[i] &lt;= 100'],
  editorial: ed('Counting sort', 'def smallerNumbersThanCurrent(nums):\n    count = [0]*101\n    for x in nums: count[x] += 1\n    prefix = [0]*101\n    for i in range(1,101): prefix[i] = prefix[i-1] + count[i-1]\n    return [prefix[x] for x in nums]', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[8, 1, 2, 2, 3]], [[6, 5, 4, 8]], [[7, 7, 7, 7]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(2, 10), 0, 12)]); return o; },
  ref: function (a) { var n = a[0]; return n.map(function (x) { var c = 0; n.forEach(function (y) { if (y < x) c++; }); return c; }); } });

// ---- Maximum Product of Two Elements in an Array ----
MORE18.push({ slug: 'maximum-product-of-two-elements-in-an-array', title: 'Maximum Product of Two Elements in an Array', difficulty: 'easy', topics: ['Array', 'Sorting'], type: 'ARR_INT', langsrc: T.ARR_INT('maxProduct'),
  desc: '<p>Given an array <code>nums</code>, choose two different indices i and j and return the maximum value of <code>(nums[i]-1)*(nums[j]-1)</code>.</p>',
  examples: [{ in: 'nums = [3,4,5,2]', out: '12' }, { in: 'nums = [1,5,4,5]', out: '16' }],
  constraints: ['2 &lt;= nums.length &lt;= 500', '1 &lt;= nums[i] &lt;= 10^3'],
  editorial: ed('Take two largest', 'def maxProduct(nums):\n    a = sorted(nums)\n    return (a[-1]-1)*(a[-2]-1)', 'O(n log n)', 'O(1)'),
  gen: function () { var o = [[[3, 4, 5, 2]], [[1, 5, 4, 5]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(2, 10), 1, 30)]); return o; },
  ref: function (a) { var s = a[0].slice().sort(function (x, y) { return x - y; }); return (s[s.length - 1] - 1) * (s[s.length - 2] - 1); } });

// ---- Sum of All Odd Length Subarrays ----
MORE18.push({ slug: 'sum-of-all-odd-length-subarrays', title: 'Sum of All Odd Length Subarrays', difficulty: 'easy', topics: ['Array', 'Prefix Sum', 'Math'], type: 'ARR_INT', langsrc: T.ARR_INT('sumOddLengthSubarrays'),
  desc: '<p>Given an array of positive integers <code>arr</code>, return the sum of all elements over all contiguous subarrays of <strong>odd</strong> length.</p>',
  examples: [{ in: 'arr = [1,4,2,5,3]', out: '58' }, { in: 'arr = [1,2]', out: '3' }],
  constraints: ['1 &lt;= arr.length &lt;= 100', '1 &lt;= arr[i] &lt;= 1000'],
  editorial: ed('Contribution / brute force', 'def sumOddLengthSubarrays(arr):\n    n = len(arr); total = 0\n    for i in range(n):\n        s = 0\n        for j in range(i, n):\n            s += arr[j]\n            if (j - i + 1) % 2 == 1: total += s\n    return total', 'O(n^2)', 'O(1)'),
  gen: function () { var o = [[[1, 4, 2, 5, 3]], [[1, 2]], [[10, 11, 12]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 12), 1, 20)]); return o; },
  ref: function (a) { var arr = a[0], n = arr.length, total = 0; for (var i = 0; i < n; i++) { var s = 0; for (var j = i; j < n; j++) { s += arr[j]; if ((j - i + 1) % 2 === 1) total += s; } } return total; } });

// ---- Number of Good Pairs ----
MORE18.push({ slug: 'number-of-good-pairs', title: 'Number of Good Pairs', difficulty: 'easy', topics: ['Array', 'Hash Table', 'Math'], type: 'ARR_INT', langsrc: T.ARR_INT('numIdenticalPairs'),
  desc: '<p>Given an array <code>nums</code>, a pair <code>(i, j)</code> is good if <code>nums[i] == nums[j]</code> and <code>i &lt; j</code>. Return the number of good pairs.</p>',
  examples: [{ in: 'nums = [1,2,3,1,1,3]', out: '4' }, { in: 'nums = [1,1,1,1]', out: '6' }],
  constraints: ['1 &lt;= nums.length &lt;= 100', '1 &lt;= nums[i] &lt;= 100'],
  editorial: ed('Count by value', 'def numIdenticalPairs(nums):\n    from collections import Counter\n    return sum(c*(c-1)//2 for c in Counter(nums).values())', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[1, 2, 3, 1, 1, 3]], [[1, 1, 1, 1]], [[1, 2, 3]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 12), 1, 6)]); return o; },
  ref: function (a) { var cnt = {}, total = 0; a[0].forEach(function (x) { total += (cnt[x] || 0); cnt[x] = (cnt[x] || 0) + 1; }); return total; } });

// ---- Maximum Product of Three Numbers ----
MORE18.push({ slug: 'maximum-product-of-three-numbers', title: 'Maximum Product of Three Numbers', difficulty: 'easy', topics: ['Array', 'Math', 'Sorting'], type: 'ARR_INT', langsrc: T.ARR_INT('maximumProduct'),
  desc: '<p>Given an integer array <code>nums</code>, find three numbers whose product is maximum and return that product.</p>',
  examples: [{ in: 'nums = [1,2,3]', out: '6' }, { in: 'nums = [-4,-3,-2,-1,60]', out: '720' }],
  constraints: ['3 &lt;= nums.length &lt;= 10^4', '-1000 &lt;= nums[i] &lt;= 1000'],
  editorial: ed('Sort, compare two candidates', 'def maximumProduct(nums):\n    a = sorted(nums)\n    return max(a[-1]*a[-2]*a[-3], a[0]*a[1]*a[-1])', 'O(n log n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3]], [[-4, -3, -2, -1, 60]], [[-1, -2, -3]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(3, 10), -20, 20)]); return o; },
  ref: function (a) { var s = a[0].slice().sort(function (x, y) { return x - y; }), n = s.length; return Math.max(s[n - 1] * s[n - 2] * s[n - 3], s[0] * s[1] * s[n - 1]); } });

// ---- Third Maximum Number ----
MORE18.push({ slug: 'third-maximum-number', title: 'Third Maximum Number', difficulty: 'easy', topics: ['Array', 'Sorting'], type: 'ARR_INT', langsrc: T.ARR_INT('thirdMax'),
  desc: '<p>Given an integer array <code>nums</code>, return the third distinct maximum value. If it does not exist, return the maximum value.</p>',
  examples: [{ in: 'nums = [3,2,1]', out: '1' }, { in: 'nums = [1,2]', out: '2' }, { in: 'nums = [2,2,3,1]', out: '1' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^4', '-2^31 &lt;= nums[i] &lt;= 2^31 - 1'],
  editorial: ed('Distinct sort', 'def thirdMax(nums):\n    s = sorted(set(nums), reverse=True)\n    return s[2] if len(s) >= 3 else s[0]', 'O(n log n)', 'O(n)'),
  gen: function () { var o = [[[3, 2, 1]], [[1, 2]], [[2, 2, 3, 1]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 10), -8, 8)]); return o; },
  ref: function (a) { var s = Array.from(new Set(a[0])).sort(function (x, y) { return y - x; }); return s.length >= 3 ? s[2] : s[0]; } });

// ---- Find the Highest Altitude ----
MORE18.push({ slug: 'find-the-highest-altitude', title: 'Find the Highest Altitude', difficulty: 'easy', topics: ['Array', 'Prefix Sum'], type: 'ARR_INT', langsrc: T.ARR_INT('largestAltitude'),
  desc: '<p>A biker starts at altitude 0. <code>gain[i]</code> is the net gain between point i and i+1. Return the highest altitude reached.</p>',
  examples: [{ in: 'gain = [-5,1,5,0,-7]', out: '1' }, { in: 'gain = [-4,-3,-2,-1,4,3,2]', out: '0' }],
  constraints: ['1 &lt;= gain.length &lt;= 100', '-100 &lt;= gain[i] &lt;= 100'],
  editorial: ed('Running max of prefix', 'def largestAltitude(gain):\n    h = best = 0\n    for g in gain:\n        h += g; best = max(best, h)\n    return best', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[-5, 1, 5, 0, -7]], [[-4, -3, -2, -1, 4, 3, 2]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 12), -10, 10)]); return o; },
  ref: function (a) { var h = 0, best = 0; a[0].forEach(function (g) { h += g; if (h > best) best = h; }); return best; } });

// ---- Minimum Value to Get Positive Step by Step Sum ----
MORE18.push({ slug: 'minimum-value-to-get-positive-step-by-step-sum', title: 'Minimum Value to Get Positive Step by Step Sum', difficulty: 'easy', topics: ['Array', 'Prefix Sum'], type: 'ARR_INT', langsrc: T.ARR_INT('minStartValue'),
  desc: '<p>Given an array <code>nums</code>, pick a positive start value. The step-by-step total (start plus a running prefix of nums) must never drop below 1. Return the minimum positive start value.</p>',
  examples: [{ in: 'nums = [-3,2,-3,4,2]', out: '5' }, { in: 'nums = [1,2]', out: '1' }, { in: 'nums = [1,-2,-3]', out: '5' }],
  constraints: ['1 &lt;= nums.length &lt;= 100', '-100 &lt;= nums[i] &lt;= 100'],
  editorial: ed('Track minimum prefix', 'def minStartValue(nums):\n    s = 0; mn = 0\n    for x in nums:\n        s += x; mn = min(mn, s)\n    return 1 - mn', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[-3, 2, -3, 4, 2]], [[1, 2]], [[1, -2, -3]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 12), -10, 10)]); return o; },
  ref: function (a) { var s = 0, mn = 0; a[0].forEach(function (x) { s += x; if (s < mn) mn = s; }); return 1 - mn; } });

// ---- Max Consecutive Ones ----
MORE18.push({ slug: 'max-consecutive-ones', title: 'Max Consecutive Ones', difficulty: 'easy', topics: ['Array'], type: 'ARR_INT', langsrc: T.ARR_INT('findMaxConsecutiveOnes'),
  desc: '<p>Given a binary array <code>nums</code>, return the maximum number of consecutive <code>1</code>s.</p>',
  examples: [{ in: 'nums = [1,1,0,1,1,1]', out: '3' }, { in: 'nums = [1,0,1,1,0,1]', out: '2' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', 'nums[i] is 0 or 1'],
  editorial: ed('Running counter', 'def findMaxConsecutiveOnes(nums):\n    best = cur = 0\n    for x in nums:\n        cur = cur + 1 if x == 1 else 0\n        best = max(best, cur)\n    return best', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 1, 0, 1, 1, 1]], [[1, 0, 1, 1, 0, 1]], [[0]], [[1]]]; for (var k = 0; k < 38; k++) o.push([binArr(randInt(1, 15))]); return o; },
  ref: function (a) { var best = 0, cur = 0; a[0].forEach(function (x) { cur = x === 1 ? cur + 1 : 0; if (cur > best) best = cur; }); return best; } });

// ---- Wiggle Subsequence ----
MORE18.push({ slug: 'wiggle-subsequence', title: 'Wiggle Subsequence', difficulty: 'medium', topics: ['Array', 'Dynamic Programming', 'Greedy'], type: 'ARR_INT', langsrc: T.ARR_INT('wiggleMaxLength'),
  desc: '<p>A wiggle sequence has strictly alternating positive and negative differences between successive numbers. Given <code>nums</code>, return the length of the longest wiggle subsequence.</p>',
  examples: [{ in: 'nums = [1,7,4,9,2,5]', out: '6' }, { in: 'nums = [1,17,5,10,13,15,10,5,16,8]', out: '7' }, { in: 'nums = [1,2,3,4,5]', out: '2' }],
  constraints: ['1 &lt;= nums.length &lt;= 1000', '0 &lt;= nums[i] &lt;= 1000'],
  editorial: ed('Track up/down lengths', 'def wiggleMaxLength(nums):\n    if len(nums) < 2: return len(nums)\n    up = down = 1\n    for i in range(1, len(nums)):\n        if nums[i] > nums[i-1]: up = down + 1\n        elif nums[i] < nums[i-1]: down = up + 1\n    return max(up, down)', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 7, 4, 9, 2, 5]], [[1, 17, 5, 10, 13, 15, 10, 5, 16, 8]], [[1, 2, 3, 4, 5]], [[7]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 12), 0, 12)]); return o; },
  ref: function (a) { var n = a[0]; if (n.length < 2) return n.length; var up = 1, down = 1; for (var i = 1; i < n.length; i++) { if (n[i] > n[i - 1]) up = down + 1; else if (n[i] < n[i - 1]) down = up + 1; } return Math.max(up, down); } });

// ---- Arithmetic Slices ----
MORE18.push({ slug: 'arithmetic-slices', title: 'Arithmetic Slices', difficulty: 'medium', topics: ['Array', 'Dynamic Programming'], type: 'ARR_INT', langsrc: T.ARR_INT('numberOfArithmeticSlices'),
  desc: '<p>An arithmetic slice is a contiguous subarray of length at least 3 with a constant difference between consecutive elements. Return the number of arithmetic slices in <code>nums</code>.</p>',
  examples: [{ in: 'nums = [1,2,3,4]', out: '3' }, { in: 'nums = [1,3,5,7,9]', out: '6' }, { in: 'nums = [1,2,3,8,9,10]', out: '2' }],
  constraints: ['1 &lt;= nums.length &lt;= 5000', '-1000 &lt;= nums[i] &lt;= 1000'],
  editorial: ed('DP on ending index', 'def numberOfArithmeticSlices(nums):\n    total = cur = 0\n    for i in range(2, len(nums)):\n        if nums[i]-nums[i-1] == nums[i-1]-nums[i-2]:\n            cur += 1; total += cur\n        else:\n            cur = 0\n    return total', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3, 4]], [[1, 3, 5, 7, 9]], [[1, 2, 3, 8, 9, 10]], [[1]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 12), -4, 6)]); return o; },
  ref: function (a) { var n = a[0], total = 0, cur = 0; for (var i = 2; i < n.length; i++) { if (n[i] - n[i - 1] === n[i - 1] - n[i - 2]) { cur++; total += cur; } else cur = 0; } return total; } });

// ---- Maximum Ascending Subarray Sum ----
MORE18.push({ slug: 'maximum-ascending-subarray-sum', title: 'Maximum Ascending Subarray Sum', difficulty: 'easy', topics: ['Array'], type: 'ARR_INT', langsrc: T.ARR_INT('maxAscendingSum'),
  desc: '<p>Given an array <code>nums</code>, return the maximum possible sum of a strictly ascending contiguous subarray.</p>',
  examples: [{ in: 'nums = [10,20,30,5,10,50]', out: '65' }, { in: 'nums = [10,20,30,40,50]', out: '150' }, { in: 'nums = [12,17,15,13,10,11,12]', out: '33' }],
  constraints: ['1 &lt;= nums.length &lt;= 100', '1 &lt;= nums[i] &lt;= 100'],
  editorial: ed('Reset on non-ascending', 'def maxAscendingSum(nums):\n    best = cur = nums[0]\n    for i in range(1, len(nums)):\n        cur = cur + nums[i] if nums[i] > nums[i-1] else nums[i]\n        best = max(best, cur)\n    return best', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[10, 20, 30, 5, 10, 50]], [[10, 20, 30, 40, 50]], [[12, 17, 15, 13, 10, 11, 12]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 12), 1, 15)]); return o; },
  ref: function (a) { var n = a[0], best = n[0], cur = n[0]; for (var i = 1; i < n.length; i++) { cur = n[i] > n[i - 1] ? cur + n[i] : n[i]; if (cur > best) best = cur; } return best; } });

// ---- Monotonic Array ----
MORE18.push({ slug: 'monotonic-array', title: 'Monotonic Array', difficulty: 'easy', topics: ['Array'], type: 'ARR_BOOL', langsrc: T.ARR_BOOL('isMonotonic'),
  desc: '<p>An array is monotonic if it is entirely non-increasing or entirely non-decreasing. Given <code>nums</code>, return <code>true</code> if it is monotonic.</p>',
  examples: [{ in: 'nums = [1,2,2,3]', out: 'true' }, { in: 'nums = [6,5,4,4]', out: 'true' }, { in: 'nums = [1,3,2]', out: 'false' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '-10^5 &lt;= nums[i] &lt;= 10^5'],
  editorial: ed('Two flags', 'def isMonotonic(nums):\n    inc = dec = True\n    for i in range(1, len(nums)):\n        if nums[i] > nums[i-1]: dec = False\n        if nums[i] < nums[i-1]: inc = False\n    return inc or dec', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 2, 3]], [[6, 5, 4, 4]], [[1, 3, 2]], [[1]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 12), -6, 6)]); return o; },
  ref: function (a) { var n = a[0], inc = true, dec = true; for (var i = 1; i < n.length; i++) { if (n[i] > n[i - 1]) dec = false; if (n[i] < n[i - 1]) inc = false; } return inc || dec; } });

module.exports = { MORE18 };
