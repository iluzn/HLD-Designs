// Batch 25: famous, most-asked interview problems on MATH, BIT MANIPULATION,
// and single-array GREEDY. Types restricted to INT_INT, INT_BOOL,
// INT_INT_INT, ARR_INT, ARR_ARR, ARR_TGT_INT. All outputs are unambiguous
// (arrays returned in deterministic ascending order).
const { T, randInt, randArr, ln } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}
function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = randInt(0, i); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

const MORE25 = [];

// ---- Add Digits (Math / digital root) ----
MORE25.push({ slug: 'add-digits', title: 'Add Digits', difficulty: 'easy', topics: ['Math', 'Simulation'], type: 'INT_INT', langsrc: T.INT_INT('addDigits'),
  desc: '<p>Given a non-negative integer <code>n</code>, repeatedly add all its digits until the result has only one digit, and return it.</p>',
  examples: [{ in: 'n = 38', out: '2', ex: '3 + 8 = 11, 1 + 1 = 2.' }, { in: 'n = 0', out: '0' }],
  constraints: ['0 &lt;= n &lt;= 2^31 - 1'],
  editorial: ed('Digital root', 'def addDigits(n):\n    if n == 0:\n        return 0\n    return 1 + (n - 1) % 9', 'O(1)', 'O(1)'),
  gen: function () { var o = [[38], [0], [10], [199]]; for (var k = 0; k < 35; k++) o.push([randInt(0, 100000)]); return o; },
  ref: function (a) { var n = a[0]; if (n === 0) return 0; return 1 + (n - 1) % 9; } });

// ---- Ugly Number (Math) ----
MORE25.push({ slug: 'ugly-number', title: 'Ugly Number', difficulty: 'easy', topics: ['Math'], type: 'INT_BOOL', langsrc: T.INT_BOOL('isUgly'),
  desc: '<p>An <strong>ugly number</strong> is a positive integer whose prime factors are limited to <code>2</code>, <code>3</code>, and <code>5</code>. Given an integer <code>n</code>, return <code>true</code> if <code>n</code> is ugly.</p>',
  examples: [{ in: 'n = 6', out: 'true' }, { in: 'n = 14', out: 'false' }, { in: 'n = 1', out: 'true' }],
  constraints: ['-2^31 &lt;= n &lt;= 2^31 - 1'],
  editorial: ed('Strip factors 2, 3, 5', 'def isUgly(n):\n    if n <= 0:\n        return False\n    for p in (2, 3, 5):\n        while n % p == 0:\n            n //= p\n    return n == 1', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[6], [14], [1], [0]]; for (var k = 0; k < 35; k++) o.push([randInt(-5, 600)]); return o; },
  ref: function (a) { var n = a[0]; if (n <= 0) return false; while (n % 2 === 0) n /= 2; while (n % 3 === 0) n /= 3; while (n % 5 === 0) n /= 5; return n === 1; } });

// ---- Power of Three (Math) ----
MORE25.push({ slug: 'power-of-three', title: 'Power of Three', difficulty: 'easy', topics: ['Math', 'Recursion'], type: 'INT_BOOL', langsrc: T.INT_BOOL('isPowerOfThree'),
  desc: '<p>Given an integer <code>n</code>, return <code>true</code> if it is a power of three (i.e., <code>n == 3^x</code> for some non-negative integer x).</p>',
  examples: [{ in: 'n = 27', out: 'true' }, { in: 'n = 0', out: 'false' }, { in: 'n = 45', out: 'false' }],
  constraints: ['-2^31 &lt;= n &lt;= 2^31 - 1'],
  editorial: ed('Repeated division', 'def isPowerOfThree(n):\n    if n <= 0:\n        return False\n    while n % 3 == 0:\n        n //= 3\n    return n == 1', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[27], [0], [9], [45]]; for (var k = 0; k < 35; k++) { if (k % 3 === 0) o.push([Math.pow(3, randInt(0, 6))]); else o.push([randInt(-3, 400)]); } return o; },
  ref: function (a) { var n = a[0]; if (n <= 0) return false; while (n % 3 === 0) n /= 3; return n === 1; } });

// ---- Power of Four (Bit / Math) ----
MORE25.push({ slug: 'power-of-four', title: 'Power of Four', difficulty: 'easy', topics: ['Math', 'Bit Manipulation'], type: 'INT_BOOL', langsrc: T.INT_BOOL('isPowerOfFour'),
  desc: '<p>Given an integer <code>n</code>, return <code>true</code> if it is a power of four (i.e., <code>n == 4^x</code> for some non-negative integer x).</p>',
  examples: [{ in: 'n = 16', out: 'true' }, { in: 'n = 5', out: 'false' }, { in: 'n = 1', out: 'true' }],
  constraints: ['-2^31 &lt;= n &lt;= 2^31 - 1'],
  editorial: ed('Repeated division', 'def isPowerOfFour(n):\n    if n <= 0:\n        return False\n    while n % 4 == 0:\n        n //= 4\n    return n == 1', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[16], [5], [1], [0]]; for (var k = 0; k < 35; k++) { if (k % 3 === 0) o.push([Math.pow(4, randInt(0, 5))]); else o.push([randInt(-3, 300)]); } return o; },
  ref: function (a) { var n = a[0]; if (n <= 0) return false; while (n % 4 === 0) n /= 4; return n === 1; } });

// ---- Nim Game (Math / Game Theory) ----
MORE25.push({ slug: 'nim-game', title: 'Nim Game', difficulty: 'easy', topics: ['Math', 'Game Theory'], type: 'INT_BOOL', langsrc: T.INT_BOOL('canWinNim'),
  desc: '<p>You are playing Nim: a heap of <code>n</code> stones, players alternate removing 1 to 3 stones, and whoever removes the last stone wins. You move first and both play optimally. Return <code>true</code> if you can win.</p>',
  examples: [{ in: 'n = 4', out: 'false' }, { in: 'n = 1', out: 'true' }, { in: 'n = 7', out: 'true' }],
  constraints: ['1 &lt;= n &lt;= 2^31 - 1'],
  editorial: ed('You lose iff n is a multiple of 4', 'def canWinNim(n):\n    return n % 4 != 0', 'O(1)', 'O(1)'),
  gen: function () { var o = [[4], [1], [2], [7]]; for (var k = 0; k < 35; k++) o.push([randInt(1, 100000)]); return o; },
  ref: function (a) { return a[0] % 4 !== 0; } });

// ---- Perfect Number (Math) ----
MORE25.push({ slug: 'perfect-number', title: 'Perfect Number', difficulty: 'easy', topics: ['Math'], type: 'INT_BOOL', langsrc: T.INT_BOOL('checkPerfectNumber'),
  desc: '<p>A <strong>perfect number</strong> equals the sum of its positive divisors excluding itself. Given an integer <code>n</code>, return <code>true</code> if it is a perfect number.</p>',
  examples: [{ in: 'n = 28', out: 'true', ex: '28 = 1 + 2 + 4 + 7 + 14.' }, { in: 'n = 7', out: 'false' }],
  constraints: ['1 &lt;= n &lt;= 10^8'],
  editorial: ed('Sum divisors up to sqrt(n)', 'def checkPerfectNumber(n):\n    if n <= 1:\n        return False\n    total, i = 1, 2\n    while i * i <= n:\n        if n % i == 0:\n            total += i\n            if i != n // i:\n                total += n // i\n        i += 1\n    return total == n', 'O(sqrt n)', 'O(1)'),
  gen: function () { var o = [[6], [28], [7], [496]]; for (var k = 0; k < 35; k++) o.push([randInt(1, 10000)]); return o; },
  ref: function (a) { var n = a[0]; if (n <= 1) return false; var sum = 1; for (var i = 2; i * i <= n; i++) { if (n % i === 0) { sum += i; if (i !== n / i) sum += n / i; } } return sum === n; } });

// ---- Factorial Trailing Zeroes (Math) ----
MORE25.push({ slug: 'factorial-trailing-zeroes', title: 'Factorial Trailing Zeroes', difficulty: 'medium', topics: ['Math'], type: 'INT_INT', langsrc: T.INT_INT('trailingZeroes'),
  desc: '<p>Given an integer <code>n</code>, return the number of trailing zeroes in <code>n!</code> (n factorial).</p>',
  examples: [{ in: 'n = 3', out: '0', ex: '3! = 6, no trailing zero.' }, { in: 'n = 5', out: '1', ex: '5! = 120.' }, { in: 'n = 0', out: '0' }],
  constraints: ['0 &lt;= n &lt;= 10^4'],
  editorial: ed('Count factors of 5', 'def trailingZeroes(n):\n    count = 0\n    while n > 0:\n        n //= 5\n        count += n\n    return count', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[3], [5], [0], [25]]; for (var k = 0; k < 35; k++) o.push([randInt(0, 10000)]); return o; },
  ref: function (a) { var n = a[0], c = 0; while (n > 0) { n = Math.floor(n / 5); c += n; } return c; } });

// ---- Number Complement (Bit Manipulation) ----
MORE25.push({ slug: 'number-complement', title: 'Number Complement', difficulty: 'easy', topics: ['Bit Manipulation'], type: 'INT_INT', langsrc: T.INT_INT('findComplement'),
  desc: '<p>The complement of an integer is the number you get by flipping all the bits in its binary representation (within its bit-length). Given a positive integer <code>n</code>, return its complement.</p>',
  examples: [{ in: 'n = 5', out: '2', ex: '101 -> 010.' }, { in: 'n = 1', out: '0' }, { in: 'n = 7', out: '0' }],
  constraints: ['1 &lt;= n &lt; 2^31'],
  editorial: ed('Flip within bit-length mask', 'def findComplement(n):\n    mask = 1\n    t = n\n    while t > 0:\n        mask <<= 1\n        t >>= 1\n    return (mask - 1) ^ n', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[5], [1], [7], [10]]; for (var k = 0; k < 35; k++) o.push([randInt(1, 100000)]); return o; },
  ref: function (a) { var n = a[0], mask = 1, t = n; while (t > 0) { mask <<= 1; t >>= 1; } return (mask - 1) ^ n; } });

// ---- Subtract the Product and Sum of Digits (Math) ----
MORE25.push({ slug: 'subtract-the-product-and-sum-of-digits', title: 'Subtract the Product and Sum of Digits of an Integer', difficulty: 'easy', topics: ['Math'], type: 'INT_INT', langsrc: T.INT_INT('subtractProductAndSum'),
  desc: '<p>Given an integer <code>n</code>, return the product of its digits minus the sum of its digits.</p>',
  examples: [{ in: 'n = 234', out: '15', ex: 'product = 24, sum = 9, 24 - 9 = 15.' }, { in: 'n = 4421', out: '21' }],
  constraints: ['1 &lt;= n &lt;= 10^5'],
  editorial: ed('Single pass over digits', 'def subtractProductAndSum(n):\n    product, total = 1, 0\n    while n > 0:\n        d = n % 10\n        product *= d\n        total += d\n        n //= 10\n    return product - total', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[234], [4421], [1], [10]]; for (var k = 0; k < 35; k++) o.push([randInt(1, 100000)]); return o; },
  ref: function (a) { var n = a[0], p = 1, s = 0; while (n > 0) { var d = n % 10; p *= d; s += d; n = Math.floor(n / 10); } return p - s; } });

// ---- Number of Steps to Reduce a Number to Zero (Math / Bit) ----
MORE25.push({ slug: 'number-of-steps-to-reduce-a-number-to-zero', title: 'Number of Steps to Reduce a Number to Zero', difficulty: 'easy', topics: ['Math', 'Bit Manipulation'], type: 'INT_INT', langsrc: T.INT_INT('numberOfSteps'),
  desc: '<p>Given an integer <code>n</code>, return the number of steps to reduce it to zero. In one step, if the number is even divide it by two, otherwise subtract one.</p>',
  examples: [{ in: 'n = 14', out: '6' }, { in: 'n = 8', out: '4' }, { in: 'n = 0', out: '0' }],
  constraints: ['0 &lt;= n &lt;= 10^6'],
  editorial: ed('Simulate the process', 'def numberOfSteps(n):\n    steps = 0\n    while n > 0:\n        n = n // 2 if n % 2 == 0 else n - 1\n        steps += 1\n    return steps', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[14], [8], [123], [0]]; for (var k = 0; k < 35; k++) o.push([randInt(0, 1000000)]); return o; },
  ref: function (a) { var n = a[0], steps = 0; while (n > 0) { if (n % 2 === 0) n /= 2; else n -= 1; steps++; } return steps; } });

// ---- Bulb Switcher (Math) ----
MORE25.push({ slug: 'bulb-switcher', title: 'Bulb Switcher', difficulty: 'medium', topics: ['Math', 'Brainteaser'], type: 'INT_INT', langsrc: T.INT_INT('bulbSwitch'),
  desc: '<p>There are <code>n</code> bulbs initially off. On round <code>i</code> you toggle every <code>i</code>-th bulb (round 1 toggles all). After <code>n</code> rounds, return how many bulbs are on. A bulb ends on iff it has an odd number of divisors, i.e. it is a perfect square.</p>',
  examples: [{ in: 'n = 3', out: '1' }, { in: 'n = 0', out: '0' }, { in: 'n = 99', out: '9' }],
  constraints: ['0 &lt;= n &lt;= 10^6'],
  editorial: ed('Count perfect squares &lt;= n', 'def bulbSwitch(n):\n    return int(n ** 0.5)', 'O(1)', 'O(1)'),
  gen: function () { var o = [[3], [0], [1], [99]]; for (var k = 0; k < 35; k++) o.push([randInt(0, 1000000)]); return o; },
  ref: function (a) { var n = a[0], r = Math.floor(Math.sqrt(n)); while ((r + 1) * (r + 1) <= n) r++; while (r > 0 && r * r > n) r--; return r; } });

// ---- Maximum Swap (Math / Greedy) ----
MORE25.push({ slug: 'maximum-swap', title: 'Maximum Swap', difficulty: 'medium', topics: ['Math', 'Greedy'], type: 'INT_INT', langsrc: T.INT_INT('maximumSwap'),
  desc: '<p>Given a non-negative integer <code>n</code>, you may swap two digits at most once to get the maximum valued number. Return that maximum value.</p>',
  examples: [{ in: 'n = 2736', out: '7236', ex: 'Swap 2 and 7.' }, { in: 'n = 9973', out: '9973' }],
  constraints: ['0 &lt;= n &lt;= 10^8'],
  editorial: ed('Greedy: swap first digit with the largest later digit', "def maximumSwap(n):\n    d = list(str(n))\n    last = {int(c): i for i, c in enumerate(d)}\n    for i, c in enumerate(d):\n        for k in range(9, int(c), -1):\n            if last.get(k, -1) > i:\n                d[i], d[last[k]] = d[last[k]], d[i]\n                return int(''.join(d))\n    return n", 'O(log n)', 'O(1)'),
  gen: function () { var o = [[2736], [9973], [98368], [0]]; for (var k = 0; k < 35; k++) o.push([randInt(0, 10000000)]); return o; },
  ref: function (a) { var n = a[0]; var d = String(n).split(''); var last = {}; for (var i = 0; i < d.length; i++) last[d[i]] = i; for (i = 0; i < d.length; i++) { for (var k = 9; k > +d[i]; k--) { if (last[k] !== undefined && last[k] > i) { var t = d[i]; d[i] = d[last[k]]; d[last[k]] = t; return parseInt(d.join(''), 10); } } } return n; } });

// ---- Hamming Distance (Bit Manipulation) ----
MORE25.push({ slug: 'hamming-distance', title: 'Hamming Distance', difficulty: 'easy', topics: ['Bit Manipulation'], type: 'INT_INT_INT', langsrc: T.INT_INT_INT('hammingDistance'),
  desc: '<p>The Hamming distance between two integers is the number of positions at which the corresponding bits differ. Given integers <code>a</code> and <code>b</code>, return their Hamming distance.</p>',
  examples: [{ in: 'a = 1, b = 4', out: '2', ex: '0001 vs 0100 differ in two bits.' }, { in: 'a = 3, b = 1', out: '1' }],
  constraints: ['0 &lt;= a, b &lt;= 2^31 - 1'],
  editorial: ed('Popcount of XOR', 'def hammingDistance(a, b):\n    return bin(a ^ b).count("1")', 'O(1)', 'O(1)'),
  gen: function () { var o = [[1, 4], [3, 1], [0, 0]]; for (var k = 0; k < 36; k++) o.push([randInt(0, 1048575), randInt(0, 1048575)]); return o; },
  ref: function (a) { var x = a[0] ^ a[1], c = 0; while (x) { c += x & 1; x >>>= 1; } return c; } });

// ---- Bitwise AND of Numbers Range (Bit Manipulation) ----
MORE25.push({ slug: 'range-bitwise-and', title: 'Bitwise AND of Numbers Range', difficulty: 'medium', topics: ['Bit Manipulation'], type: 'INT_INT_INT', langsrc: T.INT_INT_INT('rangeBitwiseAnd'),
  desc: '<p>Given two integers <code>a</code> and <code>b</code> with <code>a &lt;= b</code>, return the bitwise AND of all numbers in the inclusive range <code>[a, b]</code>.</p>',
  examples: [{ in: 'a = 5, b = 7', out: '4' }, { in: 'a = 0, b = 0', out: '0' }, { in: 'a = 26, b = 30', out: '24' }],
  constraints: ['0 &lt;= a &lt;= b &lt;= 2^31 - 1'],
  editorial: ed('Common binary prefix', 'def rangeBitwiseAnd(a, b):\n    shift = 0\n    while a < b:\n        a >>= 1\n        b >>= 1\n        shift += 1\n    return a << shift', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[5, 7], [0, 0], [26, 30], [1, 1]]; for (var k = 0; k < 35; k++) { var lo = randInt(0, 100000); o.push([lo, lo + randInt(0, 100000)]); } return o; },
  ref: function (a) { var lo = a[0], hi = a[1], shift = 0; while (lo < hi) { lo >>= 1; hi >>= 1; shift++; } return lo << shift; } });

// ---- Single Number III (Bit Manipulation) ----
MORE25.push({ slug: 'single-number-iii', title: 'Single Number III', difficulty: 'medium', topics: ['Array', 'Bit Manipulation'], type: 'ARR_ARR', langsrc: T.ARR_ARR('singleNumber'),
  desc: '<p>Given an array <code>nums</code> in which exactly two elements appear only once and all the others appear exactly twice, return the two single numbers <strong>sorted in ascending order</strong>. Use O(n) time and O(1) extra space.</p>',
  examples: [{ in: 'nums = [1,2,1,3,2,5]', out: '[3,5]' }, { in: 'nums = [0,1]', out: '[0,1]' }],
  constraints: ['2 &lt;= nums.length &lt;= 3*10^4', 'Exactly two elements appear once; the rest appear twice.'],
  editorial: ed('XOR then split by lowest differing bit', 'def singleNumber(nums):\n    x = 0\n    for v in nums:\n        x ^= v\n    diff = x & (-x)\n    a = b = 0\n    for v in nums:\n        if v & diff:\n            a ^= v\n        else:\n            b ^= v\n    return sorted([a, b])', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 1, 3, 2, 5]], [[0, 1]], [[2, 8]], [[4, 1, 4, 6]]]; for (var k = 0; k < 35; k++) { var u1, u2, used = {}; u1 = randInt(1, 60); used[u1] = 1; do { u2 = randInt(1, 60); } while (used[u2]); used[u2] = 1; var arr = [u1, u2]; var pairs = randInt(0, 4); for (var t = 0; t < pairs; t++) { var v; do { v = randInt(1, 90); } while (used[v]); used[v] = 1; arr.push(v, v); } o.push([shuffle(arr)]); } return o; },
  ref: function (a) { var x = 0; a[0].forEach(function (v) { x ^= v; }); var diff = x & (-x); var p = 0, q = 0; a[0].forEach(function (v) { if (v & diff) p ^= v; else q ^= v; }); return [Math.min(p, q), Math.max(p, q)]; } });

// ---- Majority Element II (Array) ----
MORE25.push({ slug: 'majority-element-ii', title: 'Majority Element II', difficulty: 'medium', topics: ['Array', 'Hash Table', 'Sorting'], type: 'ARR_ARR', langsrc: T.ARR_ARR('majorityElement'),
  desc: '<p>Given an integer array <code>nums</code> of size n, return all elements that appear more than <code>&lfloor;n/3&rfloor;</code> times, <strong>sorted in ascending order</strong>.</p>',
  examples: [{ in: 'nums = [3,2,3]', out: '[3]' }, { in: 'nums = [1]', out: '[1]' }, { in: 'nums = [1,2]', out: '[1,2]' }],
  constraints: ['1 &lt;= nums.length &lt;= 5*10^4', '-10^9 &lt;= nums[i] &lt;= 10^9'],
  editorial: ed('Count then filter (at most two can qualify)', 'def majorityElement(nums):\n    n = len(nums)\n    from collections import Counter\n    cnt = Counter(nums)\n    return sorted(v for v in cnt if cnt[v] * 3 > n)', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[3, 2, 3]], [[1]], [[1, 2]], [[1, 1, 1, 3, 3, 2, 2, 2]]]; for (var k = 0; k < 35; k++) o.push([randArr(randInt(1, 12), 1, 5)]); return o; },
  ref: function (a) { var n = a[0].length, cnt = {}; a[0].forEach(function (x) { cnt[x] = (cnt[x] || 0) + 1; }); var res = []; for (var key in cnt) if (cnt[key] * 3 > n) res.push(+key); return res.sort(function (x, y) { return x - y; }); } });

// ---- Boats to Save People (Greedy, Two Pointers) ----
MORE25.push({ slug: 'boats-to-save-people', title: 'Boats to Save People', difficulty: 'medium', topics: ['Array', 'Greedy', 'Two Pointers', 'Sorting'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('numRescueBoats'),
  desc: '<p>You are given weights <code>nums</code> and a boat capacity <code>target</code>. Each boat carries at most two people whose combined weight is at most <code>target</code>. Return the minimum number of boats to carry everyone.</p>',
  examples: [{ in: 'people = [1,2], limit = 3', out: '1' }, { in: 'people = [3,2,2,1], limit = 3', out: '3' }, { in: 'people = [3,5,3,4], limit = 5', out: '4' }],
  constraints: ['1 &lt;= nums.length &lt;= 5*10^4', '1 &lt;= nums[i] &lt;= target &lt;= 3*10^4'],
  editorial: ed('Sort + pair lightest with heaviest', 'def numRescueBoats(nums, target):\n    nums.sort()\n    i, j, boats = 0, len(nums) - 1, 0\n    while i <= j:\n        if nums[i] + nums[j] <= target:\n            i += 1\n        j -= 1\n        boats += 1\n    return boats', 'O(n log n)', 'O(1)'),
  gen: function () { var o = [[[1, 2], 3], [[3, 2, 2, 1], 3], [[3, 5, 3, 4], 5]]; for (var k = 0; k < 36; k++) { var n = randInt(1, 10), w = randArr(n, 1, 9); var mx = Math.max.apply(null, w); o.push([w, mx + randInt(0, 9)]); } return o; },
  ref: function (a) { var w = a[0].slice().sort(function (x, y) { return x - y; }), t = a[1], i = 0, j = w.length - 1, boats = 0; while (i <= j) { if (w[i] + w[j] <= t) i++; j--; boats++; } return boats; } });

// ---- Array Partition (Greedy, Sorting) ----
MORE25.push({ slug: 'array-partition', title: 'Array Partition', difficulty: 'easy', topics: ['Array', 'Greedy', 'Sorting'], type: 'ARR_INT', langsrc: T.ARR_INT('arrayPairSum'),
  desc: '<p>Given an array <code>nums</code> of <code>2n</code> integers, group them into <code>n</code> pairs so that the sum of <code>min(pair)</code> over all pairs is maximized, and return that maximum sum.</p>',
  examples: [{ in: 'nums = [1,4,3,2]', out: '4', ex: 'Pairs (1,2) and (3,4) give 1 + 3 = 4.' }, { in: 'nums = [6,2,6,5,1,2]', out: '9' }],
  constraints: ['1 &lt;= n &lt;= 10^4', 'nums.length == 2n', '-10^4 &lt;= nums[i] &lt;= 10^4'],
  editorial: ed('Sort and take every other element', 'def arrayPairSum(nums):\n    nums.sort()\n    return sum(nums[::2])', 'O(n log n)', 'O(1)'),
  gen: function () { var o = [[[1, 4, 3, 2]], [[6, 2, 6, 5, 1, 2]], [[1, 1]]]; for (var k = 0; k < 37; k++) o.push([randArr(randInt(1, 6) * 2, -10, 10)]); return o; },
  ref: function (a) { var n = a[0].slice().sort(function (x, y) { return x - y; }), s = 0; for (var i = 0; i < n.length; i += 2) s += n[i]; return s; } });

// ---- Minimum Moves to Equal Array Elements (Greedy / Math) ----
MORE25.push({ slug: 'minimum-moves-to-equal-array-elements', title: 'Minimum Moves to Equal Array Elements', difficulty: 'medium', topics: ['Array', 'Math', 'Greedy'], type: 'ARR_INT', langsrc: T.ARR_INT('minMoves'),
  desc: '<p>Given an array <code>nums</code>, in one move you may increment <code>n - 1</code> elements by 1. Return the minimum number of moves to make all elements equal. Incrementing n-1 elements is equivalent to decrementing one, so the answer is the sum of each element minus the minimum.</p>',
  examples: [{ in: 'nums = [1,2,3]', out: '3' }, { in: 'nums = [1,1,1]', out: '0' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '-10^9 &lt;= nums[i] &lt;= 10^9'],
  editorial: ed('Sum minus n * min', 'def minMoves(nums):\n    mn = min(nums)\n    return sum(x - mn for x in nums)', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3]], [[1, 1, 1]], [[5]]]; for (var k = 0; k < 37; k++) o.push([randArr(randInt(1, 8), 1, 12)]); return o; },
  ref: function (a) { var n = a[0], mn = Math.min.apply(null, n), s = 0; for (var i = 0; i < n.length; i++) s += n[i] - mn; return s; } });

// ---- Minimum Cost to Move Chips to The Same Position (Greedy) ----
MORE25.push({ slug: 'min-cost-to-move-chips', title: 'Minimum Cost to Move Chips to The Same Position', difficulty: 'easy', topics: ['Array', 'Math', 'Greedy'], type: 'ARR_INT', langsrc: T.ARR_INT('minCostToMoveChips'),
  desc: '<p>Chips are at positions given by <code>nums</code>. Moving a chip by 2 costs 0; moving it by 1 costs 1. Return the minimum total cost to move all chips to the same position. Even and odd positions split into two groups, so the answer is the size of the smaller group.</p>',
  examples: [{ in: 'position = [1,2,3]', out: '1' }, { in: 'position = [2,2,2,3,3]', out: '2' }],
  constraints: ['1 &lt;= nums.length &lt;= 100', '1 &lt;= nums[i] &lt;= 10^9'],
  editorial: ed('Group by parity, move the smaller group', 'def minCostToMoveChips(nums):\n    even = sum(1 for x in nums if x % 2 == 0)\n    return min(even, len(nums) - even)', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3]], [[2, 2, 2, 3, 3]], [[1]]]; for (var k = 0; k < 37; k++) o.push([randArr(randInt(1, 10), 0, 10)]); return o; },
  ref: function (a) { var even = 0, odd = 0; a[0].forEach(function (x) { if (((x % 2) + 2) % 2 === 0) even++; else odd++; }); return Math.min(even, odd); } });

module.exports = { MORE25 };
