const { T, randInt, randArr, arrStr, ln } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}
function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = randInt(0, i); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

const MORE = [];

MORE.push({ slug: 'move-zeroes', title: 'Move Zeroes', difficulty: 'easy', topics: ['Array', 'Two Pointers'], type: 'ARR_ARR', langsrc: T.ARR_ARR('moveZeroes'),
  desc: '<p>Given an integer array <code>nums</code>, move all <code>0</code>&#39;s to the end while keeping the relative order of the non-zero elements. Return the resulting array.</p>',
  examples: [{ in: 'nums = [0,1,0,3,12]', out: '[1,3,12,0,0]' }, { in: 'nums = [0]', out: '[0]' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^4', '-2^31 &lt;= nums[i] &lt;= 2^31 - 1'],
  editorial: ed('Two Pointers', 'def moveZeroes(nums):\n    j = 0\n    for i in range(len(nums)):\n        if nums[i] != 0:\n            nums[i], nums[j] = nums[j], nums[i]\n            j += 1\n    return nums', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[0, 1, 0, 3, 12]], [[0]], [[1, 2, 3]], [[0, 0, 1]]]; for (var k = 0; k < 40; k++) o.push([randArr(randInt(1, 10), 0, 5)]); return o; },
  ref: function (a) { var nz = a[0].filter(function (x) { return x !== 0; }); while (nz.length < a[0].length) nz.push(0); return nz; } });

MORE.push({ slug: 'container-with-most-water', title: 'Container With Most Water', difficulty: 'medium', topics: ['Array', 'Two Pointers', 'Greedy'], type: 'ARR_INT', langsrc: T.ARR_INT('maxArea'),
  desc: '<p>Given an integer array <code>height</code> of length n, find two lines that together with the x-axis form a container holding the most water. Return the maximum area.</p>',
  examples: [{ in: 'height = [1,8,6,2,5,4,8,3,7]', out: '49' }, { in: 'height = [1,1]', out: '1' }],
  constraints: ['2 &lt;= height.length &lt;= 10^5', '0 &lt;= height[i] &lt;= 10^4'],
  editorial: ed('Two Pointers', 'def maxArea(h):\n    l, r, best = 0, len(h)-1, 0\n    while l < r:\n        best = max(best, (r-l) * min(h[l], h[r]))\n        if h[l] < h[r]: l += 1\n        else: r -= 1\n    return best', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 8, 6, 2, 5, 4, 8, 3, 7]], [[1, 1]], [[4, 3, 2, 1, 4]], [[1, 2, 1]]]; for (var k = 0; k < 40; k++) o.push([randArr(randInt(2, 10), 0, 12)]); return o; },
  ref: function (a) { var h = a[0], l = 0, r = h.length - 1, best = 0; while (l < r) { best = Math.max(best, (r - l) * Math.min(h[l], h[r])); if (h[l] < h[r]) l++; else r--; } return best; } });

MORE.push({ slug: 'trapping-rain-water', title: 'Trapping Rain Water', difficulty: 'hard', topics: ['Array', 'Two Pointers', 'Stack'], type: 'ARR_INT', langsrc: T.ARR_INT('trap'),
  desc: '<p>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.</p>',
  examples: [{ in: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', out: '6' }, { in: 'height = [4,2,0,3,2,5]', out: '9' }],
  constraints: ['1 &lt;= n &lt;= 2*10^4', '0 &lt;= height[i] &lt;= 10^5'],
  editorial: ed('Two Pointers', 'def trap(h):\n    l, r = 0, len(h)-1\n    lm = rm = water = 0\n    while l < r:\n        if h[l] < h[r]:\n            lm = max(lm, h[l]); water += lm - h[l]; l += 1\n        else:\n            rm = max(rm, h[r]); water += rm - h[r]; r -= 1\n    return water', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], [[4, 2, 0, 3, 2, 5]], [[1]], [[3, 0, 2, 0, 4]]]; for (var k = 0; k < 40; k++) o.push([randArr(randInt(1, 12), 0, 6)]); return o; },
  ref: function (a) { var h = a[0], l = 0, r = h.length - 1, lm = 0, rm = 0, w = 0; while (l < r) { if (h[l] < h[r]) { lm = Math.max(lm, h[l]); w += lm - h[l]; l++; } else { rm = Math.max(rm, h[r]); w += rm - h[r]; r--; } } return w; } });

MORE.push({ slug: 'house-robber', title: 'House Robber', difficulty: 'medium', topics: ['Array', 'Dynamic Programming'], type: 'ARR_INT', langsrc: T.ARR_INT('rob'),
  desc: '<p>You are a robber planning to rob houses along a street. You cannot rob two adjacent houses. Given <code>nums</code> (money in each house), return the maximum you can rob without alerting the police.</p>',
  examples: [{ in: 'nums = [1,2,3,1]', out: '4' }, { in: 'nums = [2,7,9,3,1]', out: '12' }],
  constraints: ['1 &lt;= nums.length &lt;= 100', '0 &lt;= nums[i] &lt;= 400'],
  editorial: ed('DP (rolling)', 'def rob(nums):\n    prev = cur = 0\n    for x in nums:\n        prev, cur = cur, max(cur, prev + x)\n    return cur', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3, 1]], [[2, 7, 9, 3, 1]], [[5]], [[2, 1, 1, 2]]]; for (var k = 0; k < 40; k++) o.push([randArr(randInt(1, 10), 0, 20)]); return o; },
  ref: function (a) { var prev = 0, cur = 0; a[0].forEach(function (x) { var t = Math.max(cur, prev + x); prev = cur; cur = t; }); return cur; } });

MORE.push({ slug: 'house-robber-ii', title: 'House Robber II', difficulty: 'medium', topics: ['Array', 'Dynamic Programming'], type: 'ARR_INT', langsrc: T.ARR_INT('rob'),
  desc: '<p>Same as House Robber, but the houses are arranged in a <strong>circle</strong> — the first and last are adjacent. Return the maximum you can rob.</p>',
  examples: [{ in: 'nums = [2,3,2]', out: '3' }, { in: 'nums = [1,2,3,1]', out: '4' }],
  constraints: ['1 &lt;= nums.length &lt;= 100', '0 &lt;= nums[i] &lt;= 1000'],
  editorial: ed('DP twice (exclude first or last)', 'def rob(nums):\n    if len(nums) == 1: return nums[0]\n    def line(a):\n        p = c = 0\n        for x in a:\n            p, c = c, max(c, p + x)\n        return c\n    return max(line(nums[1:]), line(nums[:-1]))', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[2, 3, 2]], [[1, 2, 3, 1]], [[5]], [[1, 2, 3]]]; for (var k = 0; k < 40; k++) o.push([randArr(randInt(1, 9), 0, 20)]); return o; },
  ref: function (a) { var n = a[0]; if (n.length === 1) return n[0]; function line(arr) { var p = 0, c = 0; arr.forEach(function (x) { var t = Math.max(c, p + x); p = c; c = t; }); return c; } return Math.max(line(n.slice(1)), line(n.slice(0, -1))); } });

MORE.push({ slug: 'coin-change', title: 'Coin Change', difficulty: 'medium', topics: ['Array', 'Dynamic Programming'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('coinChange'),
  desc: '<p>Given an array <code>coins</code> (passed as <code>nums</code>) and an integer <code>amount</code> (passed as <code>target</code>), return the fewest coins needed to make up that amount, or <code>-1</code> if impossible. You have unlimited coins of each type.</p>',
  examples: [{ in: 'coins = [1,2,5], amount = 11', out: '3', ex: '11 = 5 + 5 + 1.' }, { in: 'coins = [2], amount = 3', out: '-1' }],
  constraints: ['1 &lt;= coins.length &lt;= 12', '1 &lt;= coins[i] &lt;= 2^31 - 1', '0 &lt;= amount &lt;= 10^4'],
  editorial: ed('Unbounded Knapsack DP', 'def coinChange(coins, amount):\n    dp = [0] + [amount+1]*amount\n    for a in range(1, amount+1):\n        for c in coins:\n            if c <= a:\n                dp[a] = min(dp[a], dp[a-c] + 1)\n    return dp[amount] if dp[amount] <= amount else -1', 'O(amount * coins)', 'O(amount)'),
  gen: function () { var o = [[[1, 2, 5], 11], [[2], 3], [[1], 0], [[1, 5, 10, 25], 63]]; for (var k = 0; k < 38; k++) { var m = randInt(1, 4), coins = shuffle(randArr(m, 1, 9)); o.push([coins, randInt(0, 30)]); } return o; },
  ref: function (a) { var coins = a[0], amount = a[1], dp = new Array(amount + 1).fill(amount + 1); dp[0] = 0; for (var x = 1; x <= amount; x++) coins.forEach(function (c) { if (c <= x) dp[x] = Math.min(dp[x], dp[x - c] + 1); }); return dp[amount] <= amount ? dp[amount] : -1; } });

MORE.push({ slug: 'longest-increasing-subsequence', title: 'Longest Increasing Subsequence', difficulty: 'medium', topics: ['Array', 'Binary Search', 'Dynamic Programming'], type: 'ARR_INT', langsrc: T.ARR_INT('lengthOfLIS'),
  desc: '<p>Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.</p>',
  examples: [{ in: 'nums = [10,9,2,5,3,7,101,18]', out: '4', ex: '[2,3,7,101] or [2,3,7,18].' }, { in: 'nums = [0,1,0,3,2,3]', out: '4' }],
  constraints: ['1 &lt;= nums.length &lt;= 2500', '-10^4 &lt;= nums[i] &lt;= 10^4'],
  editorial: ed('Patience Sorting (Binary Search)', 'import bisect\ndef lengthOfLIS(nums):\n    tails = []\n    for x in nums:\n        i = bisect.bisect_left(tails, x)\n        if i == len(tails): tails.append(x)\n        else: tails[i] = x\n    return len(tails)', 'O(n log n)', 'O(n)'),
  gen: function () { var o = [[[10, 9, 2, 5, 3, 7, 101, 18]], [[0, 1, 0, 3, 2, 3]], [[7, 7, 7]], [[1, 3, 6, 7, 9, 4, 10, 5, 6]]]; for (var k = 0; k < 40; k++) o.push([randArr(randInt(1, 12), -8, 8)]); return o; },
  ref: function (a) { var tails = []; a[0].forEach(function (x) { var lo = 0, hi = tails.length; while (lo < hi) { var m = (lo + hi) >> 1; if (tails[m] < x) lo = m + 1; else hi = m; } if (lo === tails.length) tails.push(x); else tails[lo] = x; }); return tails.length; } });

MORE.push({ slug: 'missing-number', title: 'Missing Number', difficulty: 'easy', topics: ['Array', 'Math', 'Bit Manipulation'], type: 'ARR_INT', langsrc: T.ARR_INT('missingNumber'),
  desc: '<p>Given an array <code>nums</code> containing <code>n</code> distinct numbers in the range <code>[0, n]</code>, return the only number in the range that is missing.</p>',
  examples: [{ in: 'nums = [3,0,1]', out: '2' }, { in: 'nums = [0,1]', out: '2' }],
  constraints: ['n == nums.length', '1 &lt;= n &lt;= 10^4', 'All numbers are distinct and in [0, n].'],
  editorial: ed('Gauss Sum', 'def missingNumber(nums):\n    n = len(nums)\n    return n*(n+1)//2 - sum(nums)', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[3, 0, 1]], [[0, 1]], [[9, 6, 4, 2, 3, 5, 7, 0, 1]], [[0]]]; for (var k = 0; k < 40; k++) { var n = randInt(1, 10); var all = []; for (var i = 0; i <= n; i++) all.push(i); var miss = randInt(0, n); var arr = all.filter(function (x) { return x !== miss; }); o.push([shuffle(arr)]); } return o; },
  ref: function (a) { var n = a[0].length; var s = a[0].reduce(function (x, y) { return x + y; }, 0); return n * (n + 1) / 2 - s; } });

MORE.push({ slug: 'maximum-product-subarray', title: 'Maximum Product Subarray', difficulty: 'medium', topics: ['Array', 'Dynamic Programming'], type: 'ARR_INT', langsrc: T.ARR_INT('maxProduct'),
  desc: '<p>Given an integer array <code>nums</code>, find a contiguous non-empty subarray that has the largest <strong>product</strong>, and return the product.</p>',
  examples: [{ in: 'nums = [2,3,-2,4]', out: '6' }, { in: 'nums = [-2,0,-1]', out: '0' }],
  constraints: ['1 &lt;= nums.length &lt;= 2*10^4', '-10 &lt;= nums[i] &lt;= 10', 'Answer fits in a 32-bit integer.'],
  editorial: ed('Track max and min (sign flips)', 'def maxProduct(nums):\n    res = mx = mn = nums[0]\n    for x in nums[1:]:\n        if x < 0: mx, mn = mn, mx\n        mx = max(x, mx * x)\n        mn = min(x, mn * x)\n        res = max(res, mx)\n    return res', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[2, 3, -2, 4]], [[-2, 0, -1]], [[-2]], [[3, -1, 4]]]; for (var k = 0; k < 40; k++) o.push([randArr(randInt(1, 8), -4, 4)]); return o; },
  ref: function (a) { var n = a[0], res = n[0], mx = n[0], mn = n[0]; for (var i = 1; i < n.length; i++) { var x = n[i]; if (x < 0) { var t = mx; mx = mn; mn = t; } mx = Math.max(x, mx * x); mn = Math.min(x, mn * x); res = Math.max(res, mx); } return res; } });

MORE.push({ slug: 'jump-game', title: 'Jump Game', difficulty: 'medium', topics: ['Array', 'Greedy', 'Dynamic Programming'], type: 'ARR_BOOL', langsrc: T.ARR_BOOL('canJump'),
  desc: '<p>Given an array <code>nums</code> where each element is your maximum jump length from that position, return <code>true</code> if you can reach the last index.</p>',
  examples: [{ in: 'nums = [2,3,1,1,4]', out: 'true' }, { in: 'nums = [3,2,1,0,4]', out: 'false' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^4', '0 &lt;= nums[i] &lt;= 10^5'],
  editorial: ed('Greedy (farthest reach)', 'def canJump(nums):\n    reach = 0\n    for i, x in enumerate(nums):\n        if i > reach: return False\n        reach = max(reach, i + x)\n    return True', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[2, 3, 1, 1, 4]], [[3, 2, 1, 0, 4]], [[0]], [[2, 0, 0]]]; for (var k = 0; k < 40; k++) o.push([randArr(randInt(1, 9), 0, 4)]); return o; },
  ref: function (a) { var reach = 0, n = a[0]; for (var i = 0; i < n.length; i++) { if (i > reach) return false; reach = Math.max(reach, i + n[i]); } return true; } });

MORE.push({ slug: 'kth-largest-element-in-an-array', title: 'Kth Largest Element in an Array', difficulty: 'medium', topics: ['Array', 'Heap', 'Quickselect'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('findKthLargest'),
  desc: '<p>Given an integer array <code>nums</code> and an integer <code>k</code> (passed as <code>target</code>), return the <code>k</code>-th largest element in the array (in sorted order, not distinct).</p>',
  examples: [{ in: 'nums = [3,2,1,5,6,4], k = 2', out: '5' }, { in: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', out: '4' }],
  constraints: ['1 &lt;= k &lt;= nums.length &lt;= 10^4', '-10^4 &lt;= nums[i] &lt;= 10^4'],
  editorial: ed('Sort or Min-Heap of size k', 'import heapq\ndef findKthLargest(nums, k):\n    return heapq.nlargest(k, nums)[-1]', 'O(n log k)', 'O(k)'),
  gen: function () { var o = [[[3, 2, 1, 5, 6, 4], 2], [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], [[1], 1]]; for (var k = 0; k < 40; k++) { var n = randInt(1, 10), arr = randArr(n, -10, 10); o.push([arr, randInt(1, n)]); } return o; },
  ref: function (a) { var s = a[0].slice().sort(function (x, y) { return y - x; }); return s[a[1] - 1]; } });

MORE.push({ slug: 'longest-substring-without-repeating-characters', title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', topics: ['String', 'Sliding Window', 'Hash Table'], type: 'STR_INT', langsrc: T.STR_INT('lengthOfLongestSubstring'),
  desc: '<p>Given a string <code>s</code>, find the length of the longest substring without repeating characters.</p>',
  examples: [{ in: 's = "abcabcbb"', out: '3', ex: 'The answer is "abc".' }, { in: 's = "bbbbb"', out: '1' }],
  constraints: ['0 &lt;= s.length &lt;= 5*10^4', 's consists of English letters, digits, symbols and spaces.'],
  editorial: ed('Sliding Window', 'def lengthOfLongestSubstring(s):\n    seen = {}\n    left = best = 0\n    for right, c in enumerate(s):\n        if c in seen and seen[c] >= left:\n            left = seen[c] + 1\n        seen[c] = right\n        best = max(best, right - left + 1)\n    return best', 'O(n)', 'O(min(n, charset))'),
  gen: function () { var o = [['abcabcbb'], ['bbbbb'], ['pwwkew'], ['']]; var ch = 'abcde'; for (var k = 0; k < 40; k++) { var L = randInt(0, 10), s = ''; for (var i = 0; i < L; i++) s += ch[randInt(0, 4)]; o.push([s]); } return o; },
  ref: function (a) { var s = a[0], seen = {}, left = 0, best = 0; for (var r = 0; r < s.length; r++) { var c = s[r]; if (seen[c] !== undefined && seen[c] >= left) left = seen[c] + 1; seen[c] = r; best = Math.max(best, r - left + 1); } return best; } });

MORE.push({ slug: 'valid-palindrome', title: 'Valid Palindrome', difficulty: 'easy', topics: ['String', 'Two Pointers'], type: 'STR_BOOL', langsrc: T.STR_BOOL('isPalindrome'),
  desc: '<p>A phrase is a palindrome if, after converting uppercase to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string <code>s</code>, return <code>true</code> if it is a palindrome.</p>',
  examples: [{ in: 's = "A man, a plan, a canal: Panama"', out: 'true' }, { in: 's = "race a car"', out: 'false' }],
  constraints: ['1 &lt;= s.length &lt;= 2*10^5', 's consists of printable ASCII characters.'],
  editorial: ed('Two Pointers on alphanumerics', 'def isPalindrome(s):\n    t = [c.lower() for c in s if c.isalnum()]\n    return t == t[::-1]', 'O(n)', 'O(1)'),
  gen: function () { var o = [['A man, a plan, a canal: Panama'], ['race a car'], [' '], ['0P'], ['aba'], ['ab']]; var ch = 'abcAB 1,'; for (var k = 0; k < 38; k++) { var L = randInt(1, 9), s = ''; for (var i = 0; i < L; i++) s += ch[randInt(0, ch.length - 1)]; o.push([s]); } return o; },
  ref: function (a) { var t = (a[0].toLowerCase().match(/[a-z0-9]/g) || []); return t.join('') === t.slice().reverse().join(''); } });

MORE.push({ slug: 'palindrome-number', title: 'Palindrome Number', difficulty: 'easy', topics: ['Math'], type: 'INT_BOOL', langsrc: T.INT_BOOL('isPalindrome'),
  desc: '<p>Given an integer <code>n</code>, return <code>true</code> if it is a palindrome (reads the same backward as forward). Negative numbers are not palindromes.</p>',
  examples: [{ in: 'n = 121', out: 'true' }, { in: 'n = -121', out: 'false' }, { in: 'n = 10', out: 'false' }],
  constraints: ['-2^31 &lt;= n &lt;= 2^31 - 1'],
  editorial: ed('Reverse and compare', 'def isPalindrome(n):\n    if n < 0: return False\n    return str(n) == str(n)[::-1]', 'O(digits)', 'O(1)'),
  gen: function () { var o = [[121], [-121], [10], [0], [7], [1221], [12321]]; for (var k = 0; k < 38; k++) o.push([randInt(-500, 5000)]); return o; },
  ref: function (a) { var n = a[0]; if (n < 0) return false; var s = '' + n; return s === s.split('').reverse().join(''); } });

MORE.push({ slug: 'min-cost-climbing-stairs', title: 'Min Cost Climbing Stairs', difficulty: 'easy', topics: ['Array', 'Dynamic Programming'], type: 'ARR_INT', langsrc: T.ARR_INT('minCostClimbingStairs'),
  desc: '<p>Given an array <code>cost</code> where <code>cost[i]</code> is the cost of step <code>i</code>, you can climb 1 or 2 steps and start from index 0 or 1. Return the minimum cost to reach the top (just past the last step).</p>',
  examples: [{ in: 'cost = [10,15,20]', out: '15' }, { in: 'cost = [1,100,1,1,1,100,1,1,100,1]', out: '6' }],
  constraints: ['2 &lt;= cost.length &lt;= 1000', '0 &lt;= cost[i] &lt;= 999'],
  editorial: ed('DP', 'def minCostClimbingStairs(cost):\n    a = b = 0\n    for c in cost:\n        a, b = b, min(b, a) + c\n    return min(a, b)', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[10, 15, 20]], [[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]], [[0, 0]]]; for (var k = 0; k < 40; k++) o.push([randArr(randInt(2, 10), 0, 30)]); return o; },
  ref: function (a) { var x = 0, y = 0; a[0].forEach(function (c) { var t = Math.min(y, x) + c; x = y; y = t; }); return Math.min(x, y); } });

MORE.push({ slug: 'sqrtx', title: 'Sqrt(x)', difficulty: 'easy', topics: ['Math', 'Binary Search'], type: 'INT_INT', langsrc: T.INT_INT('mySqrt'),
  desc: '<p>Given a non-negative integer <code>n</code>, return the integer square root of <code>n</code> (the floor of the true square root). Do not use built-in sqrt.</p>',
  examples: [{ in: 'n = 4', out: '2' }, { in: 'n = 8', out: '2', ex: 'floor(2.828...) = 2.' }],
  constraints: ['0 &lt;= n &lt;= 2^31 - 1'],
  editorial: ed('Binary Search', 'def mySqrt(n):\n    lo, hi, ans = 0, n, 0\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if mid * mid <= n:\n            ans = mid; lo = mid + 1\n        else:\n            hi = mid - 1\n    return ans', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[4], [8], [0], [1], [2], [100], [2147395600]]; for (var k = 0; k < 38; k++) o.push([randInt(0, 100000)]); return o; },
  ref: function (a) { var n = a[0], lo = 0, hi = n, ans = 0; while (lo <= hi) { var mid = Math.floor((lo + hi) / 2); if (mid * mid <= n) { ans = mid; lo = mid + 1; } else hi = mid - 1; } return ans; } });

module.exports = { MORE };
