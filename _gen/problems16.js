// Batch 16: additional famous, frequently-asked problems.
const { T, randInt, randArr, ln } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}
function toRoman(n) {
  var m = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  var r = ''; m.forEach(function (p) { while (n >= p[0]) { r += p[1]; n -= p[0]; } }); return r;
}
function romanToInt(s) {
  var v = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }, t = 0;
  for (var i = 0; i < s.length; i++) { if (i + 1 < s.length && v[s[i + 1]] > v[s[i]]) t -= v[s[i]]; else t += v[s[i]]; }
  return t;
}
function rs(len, al) { var s = ''; for (var i = 0; i < len; i++) s += al[randInt(0, al.length - 1)]; return s; }
function words(al) { var n = randInt(1, 4), w = []; for (var i = 0; i < n; i++) w.push(rs(randInt(1, 6), al)); return w; }

const MORE16 = [];

// ---- Remove Duplicates from Sorted Array ----
MORE16.push({ slug: 'remove-duplicates-from-sorted-array', title: 'Remove Duplicates from Sorted Array', difficulty: 'easy', topics: ['Array', 'Two Pointers'], type: 'ARR_INT', langsrc: T.ARR_INT('removeDuplicates'),
  desc: '<p>Given a <strong>sorted</strong> integer array <code>nums</code>, remove the duplicates in-place so each unique element appears once, and return the number of unique elements <code>k</code>.</p>',
  examples: [{ in: 'nums = [1,1,2]', out: '2' }, { in: 'nums = [0,0,1,1,1,2,2,3,3,4]', out: '5' }],
  constraints: ['1 &lt;= nums.length &lt;= 3*10^4', 'nums is sorted in non-decreasing order.'],
  editorial: ed('Two Pointers', 'def removeDuplicates(nums):\n    k = 0\n    for x in nums:\n        if k == 0 or x != nums[k-1]:\n            nums[k] = x; k += 1\n    return k', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 1, 2]], [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], [[5]], [[1, 1, 1, 1]]]; for (var k = 0; k < 38; k++) { var a = randArr(randInt(1, 10), 0, 6).sort(function (x, y) { return x - y; }); o.push([a]); } return o; },
  ref: function (a) { var s = {}; a[0].forEach(function (x) { s[x] = 1; }); return Object.keys(s).length; } });

// ---- Best Time to Buy and Sell Stock II ----
MORE16.push({ slug: 'best-time-to-buy-and-sell-stock-ii', title: 'Best Time to Buy and Sell Stock II', difficulty: 'medium', topics: ['Array', 'Greedy', 'Dynamic Programming'], type: 'ARR_INT', langsrc: T.ARR_INT('maxProfit'),
  desc: '<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a stock on day <code>i</code>. You may buy and sell as many times as you like (but hold at most one share at a time). Return the maximum profit.</p>',
  examples: [{ in: 'prices = [7,1,5,3,6,4]', out: '7' }, { in: 'prices = [1,2,3,4,5]', out: '4' }],
  constraints: ['1 &lt;= prices.length &lt;= 3*10^4', '0 &lt;= prices[i] &lt;= 10^4'],
  editorial: ed('Greedy — sum positive deltas', 'def maxProfit(prices):\n    profit = 0\n    for i in range(1, len(prices)):\n        if prices[i] > prices[i-1]:\n            profit += prices[i] - prices[i-1]\n    return profit', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[7, 1, 5, 3, 6, 4]], [[1, 2, 3, 4, 5]], [[7, 6, 4, 3, 1]], [[3]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 10), 0, 12)]); return o; },
  ref: function (a) { var p = a[0], profit = 0; for (var i = 1; i < p.length; i++) if (p[i] > p[i - 1]) profit += p[i] - p[i - 1]; return profit; } });

// ---- H-Index ----
MORE16.push({ slug: 'h-index', title: 'H-Index', difficulty: 'medium', topics: ['Array', 'Sorting', 'Counting Sort'], type: 'ARR_INT', langsrc: T.ARR_INT('hIndex'),
  desc: "<p>Given an array <code>citations</code> where <code>citations[i]</code> is the number of citations for the i-th paper, return the researcher's <strong>h-index</strong>: the maximum h such that h papers have at least h citations each.</p>",
  examples: [{ in: 'citations = [3,0,6,1,5]', out: '3' }, { in: 'citations = [1,3,1]', out: '1' }],
  constraints: ['n == citations.length', '1 &lt;= n &lt;= 5000', '0 &lt;= citations[i] &lt;= 1000'],
  editorial: ed('Sort descending', 'def hIndex(citations):\n    citations.sort(reverse=True)\n    h = 0\n    for i, c in enumerate(citations):\n        if c >= i + 1:\n            h = i + 1\n        else:\n            break\n    return h', 'O(n log n)', 'O(1)'),
  gen: function () { var o = [[[3, 0, 6, 1, 5]], [[1, 3, 1]], [[0]], [[100]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 9), 0, 9)]); return o; },
  ref: function (a) { var c = a[0].slice().sort(function (x, y) { return y - x; }), h = 0; for (var i = 0; i < c.length; i++) { if (c[i] >= i + 1) h = i + 1; else break; } return h; } });

// ---- Candy ----
MORE16.push({ slug: 'candy', title: 'Candy', difficulty: 'hard', topics: ['Array', 'Greedy'], type: 'ARR_INT', langsrc: T.ARR_INT('candy'),
  desc: '<p>There are <code>n</code> children with <code>ratings</code>. Each child gets at least one candy, and a child with a higher rating than an adjacent child must get more candies. Return the minimum total candies.</p>',
  examples: [{ in: 'ratings = [1,0,2]', out: '5' }, { in: 'ratings = [1,2,2]', out: '4' }],
  constraints: ['n == ratings.length', '1 &lt;= n &lt;= 2*10^4', '0 &lt;= ratings[i] &lt;= 2*10^4'],
  editorial: ed('Two passes', 'def candy(ratings):\n    n = len(ratings)\n    c = [1]*n\n    for i in range(1, n):\n        if ratings[i] > ratings[i-1]: c[i] = c[i-1] + 1\n    for i in range(n-2, -1, -1):\n        if ratings[i] > ratings[i+1]: c[i] = max(c[i], c[i+1] + 1)\n    return sum(c)', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[1, 0, 2]], [[1, 2, 2]], [[1]], [[1, 3, 2, 2, 1]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 9), 0, 5)]); return o; },
  ref: function (a) { var r = a[0], n = r.length, c = []; for (var i = 0; i < n; i++) c.push(1); for (i = 1; i < n; i++) if (r[i] > r[i - 1]) c[i] = c[i - 1] + 1; for (i = n - 2; i >= 0; i--) if (r[i] > r[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1); return c.reduce(function (s, x) { return s + x; }, 0); } });

// ---- Sort Colors ----
MORE16.push({ slug: 'sort-colors', title: 'Sort Colors', difficulty: 'medium', topics: ['Array', 'Two Pointers', 'Sorting'], type: 'ARR_ARR', langsrc: T.ARR_ARR('sortColors'),
  desc: '<p>Given an array <code>nums</code> with <code>n</code> objects colored red, white, or blue (<code>0</code>, <code>1</code>, <code>2</code>), sort them in-place so objects of the same color are adjacent, in the order 0, 1, 2. Return the sorted array. Use the one-pass Dutch National Flag algorithm.</p>',
  examples: [{ in: 'nums = [2,0,2,1,1,0]', out: '[0,0,1,1,2,2]' }, { in: 'nums = [2,0,1]', out: '[0,1,2]' }],
  constraints: ['n == nums.length', '1 &lt;= n &lt;= 300', 'nums[i] is 0, 1, or 2.'],
  editorial: ed('Dutch National Flag', 'def sortColors(nums):\n    lo, mid, hi = 0, 0, len(nums)-1\n    while mid <= hi:\n        if nums[mid] == 0:\n            nums[lo], nums[mid] = nums[mid], nums[lo]; lo += 1; mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:\n            nums[mid], nums[hi] = nums[hi], nums[mid]; hi -= 1\n    return nums', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[2, 0, 2, 1, 1, 0]], [[2, 0, 1]], [[0]], [[1, 1, 1]]]; for (var k = 0; k < 38; k++) { var n = randInt(1, 10), a = []; for (var i = 0; i < n; i++) a.push(randInt(0, 2)); o.push([a]); } return o; },
  ref: function (a) { return a[0].slice().sort(function (x, y) { return x - y; }); } });

// ---- Find All Numbers Disappeared in an Array ----
MORE16.push({ slug: 'find-all-numbers-disappeared-in-an-array', title: 'Find All Numbers Disappeared in an Array', difficulty: 'easy', topics: ['Array', 'Hash Table'], type: 'ARR_ARR', langsrc: T.ARR_ARR('findDisappearedNumbers'),
  desc: '<p>Given an array <code>nums</code> of <code>n</code> integers where <code>nums[i]</code> is in the range <code>[1, n]</code>, return an array (ascending) of all integers in <code>[1, n]</code> that do not appear in <code>nums</code>.</p>',
  examples: [{ in: 'nums = [4,3,2,7,8,2,3,1]', out: '[5,6]' }, { in: 'nums = [1,1]', out: '[2]' }],
  constraints: ['n == nums.length', '1 &lt;= n &lt;= 10^5', '1 &lt;= nums[i] &lt;= n'],
  editorial: ed('Mark by sign / seen set', 'def findDisappearedNumbers(nums):\n    seen = set(nums)\n    return [x for x in range(1, len(nums)+1) if x not in seen]', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[4, 3, 2, 7, 8, 2, 3, 1]], [[1, 1]], [[1]], [[2, 2]]]; for (var k = 0; k < 38; k++) { var n = randInt(1, 10), a = []; for (var i = 0; i < n; i++) a.push(randInt(1, n)); o.push([a]); } return o; },
  ref: function (a) { var n = a[0].length, seen = {}; a[0].forEach(function (x) { seen[x] = 1; }); var r = []; for (var x = 1; x <= n; x++) if (!seen[x]) r.push(x); return r; } });

// ---- Next Permutation ----
MORE16.push({ slug: 'next-permutation', title: 'Next Permutation', difficulty: 'medium', topics: ['Array', 'Two Pointers'], type: 'ARR_ARR', langsrc: T.ARR_ARR('nextPermutation'),
  desc: '<p>Rearrange <code>nums</code> into the lexicographically next greater permutation. If no greater permutation exists, rearrange to the lowest order (sorted ascending). Return the resulting array. Do it in-place with O(1) extra memory.</p>',
  examples: [{ in: 'nums = [1,2,3]', out: '[1,3,2]' }, { in: 'nums = [3,2,1]', out: '[1,2,3]' }, { in: 'nums = [1,1,5]', out: '[1,5,1]' }],
  constraints: ['1 &lt;= nums.length &lt;= 100', '0 &lt;= nums[i] &lt;= 100'],
  editorial: ed('Find pivot, swap, reverse suffix', 'def nextPermutation(nums):\n    i = len(nums) - 2\n    while i >= 0 and nums[i] >= nums[i+1]:\n        i -= 1\n    if i >= 0:\n        j = len(nums) - 1\n        while nums[j] <= nums[i]:\n            j -= 1\n        nums[i], nums[j] = nums[j], nums[i]\n    nums[i+1:] = reversed(nums[i+1:])\n    return nums', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3]], [[3, 2, 1]], [[1, 1, 5]], [[1]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 6), 1, 4)]); return o; },
  ref: function (a) { var n = a[0].slice(), i = n.length - 2; while (i >= 0 && n[i] >= n[i + 1]) i--; if (i >= 0) { var j = n.length - 1; while (n[j] <= n[i]) j--; var t = n[i]; n[i] = n[j]; n[j] = t; } var lo = i + 1, hi = n.length - 1; while (lo < hi) { var tt = n[lo]; n[lo] = n[hi]; n[hi] = tt; lo++; hi--; } return n; } });

// ---- Roman to Integer ----
MORE16.push({ slug: 'roman-to-integer', title: 'Roman to Integer', difficulty: 'easy', topics: ['Hash Table', 'Math', 'String'], type: 'STR_INT', langsrc: T.STR_INT('romanToInt'),
  desc: '<p>Given a Roman numeral string <code>s</code>, convert it to an integer. Symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. A smaller symbol before a larger one is subtracted (e.g., IV = 4).</p>',
  examples: [{ in: 's = "III"', out: '3' }, { in: 's = "LVIII"', out: '58' }, { in: 's = "MCMXCIV"', out: '1994' }],
  constraints: ['1 &lt;= s.length &lt;= 15', 's is a valid Roman numeral in the range [1, 3999].'],
  editorial: ed('Scan, subtract when smaller precedes larger', "def romanToInt(s):\n    val = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}\n    total = 0\n    for i in range(len(s)):\n        if i+1 < len(s) and val[s[i]] < val[s[i+1]]:\n            total -= val[s[i]]\n        else:\n            total += val[s[i]]\n    return total", 'O(n)', 'O(1)'),
  gen: function () { var o = [['III'], ['LVIII'], ['MCMXCIV'], ['IV'], ['IX'], ['XL'], ['CD'], ['MMXXV']]; for (var k = 0; k < 34; k++) o.push([toRoman(randInt(1, 3999))]); return o; },
  ref: function (a) { return romanToInt(a[0]); } });

// ---- Length of Last Word ----
MORE16.push({ slug: 'length-of-last-word', title: 'Length of Last Word', difficulty: 'easy', topics: ['String'], type: 'STR_INT', langsrc: T.STR_INT('lengthOfLastWord'),
  desc: '<p>Given a string <code>s</code> of words and spaces, return the length of the <strong>last</strong> word. A word is a maximal substring of non-space characters.</p>',
  examples: [{ in: 's = "Hello World"', out: '5' }, { in: 's = "   fly me   to   the moon  "', out: '4' }, { in: 's = "luffy is still joyboy"', out: '6' }],
  constraints: ['1 &lt;= s.length &lt;= 10^4', 's consists of English letters and spaces, with at least one word.'],
  editorial: ed('Scan from the end', 'def lengthOfLastWord(s):\n    i = len(s) - 1\n    while i >= 0 and s[i] == " ":\n        i -= 1\n    length = 0\n    while i >= 0 and s[i] != " ":\n        length += 1; i -= 1\n    return length', 'O(n)', 'O(1)'),
  gen: function () { var o = [['Hello World'], ['   fly me   to   the moon  '], ['luffy is still joyboy'], ['a']]; var al = 'abcdefghijklmnopqrstuvwxyz'; for (var k = 0; k < 36; k++) { var w = words(al); var sep = k % 3 === 0 ? '  ' : ' '; var str = w.join(sep); if (k % 4 === 0) str += '   '; o.push([str]); } return o; },
  ref: function (a) { var w = a[0].split(/\s+/).filter(function (x) { return x.length; }); return w.length ? w[w.length - 1].length : 0; } });

// ---- Longest Palindrome ----
MORE16.push({ slug: 'longest-palindrome', title: 'Longest Palindrome', difficulty: 'easy', topics: ['Hash Table', 'String', 'Greedy'], type: 'STR_INT', langsrc: T.STR_INT('longestPalindrome'),
  desc: '<p>Given a string <code>s</code> of lowercase and/or uppercase letters, return the length of the <strong>longest palindrome</strong> that can be built with those letters (letters are case-sensitive).</p>',
  examples: [{ in: 's = "abccccdd"', out: '7' }, { in: 's = "a"', out: '1' }, { in: 's = "bb"', out: '2' }],
  constraints: ['1 &lt;= s.length &lt;= 2000', 's consists of lowercase and/or uppercase English letters.'],
  editorial: ed('Count freq — pairs + one odd center', 'def longestPalindrome(s):\n    from collections import Counter\n    length = 0; odd = False\n    for v in Counter(s).values():\n        length += (v // 2) * 2\n        if v % 2: odd = True\n    return length + (1 if odd else 0)', 'O(n)', 'O(1)'),
  gen: function () { var o = [['abccccdd'], ['a'], ['bb'], ['Aa']]; var al = 'abcABC'; for (var k = 0; k < 36; k++) o.push([rs(randInt(1, 12), al)]); return o; },
  ref: function (a) { var f = {}; a[0].split('').forEach(function (c) { f[c] = (f[c] || 0) + 1; }); var len = 0, odd = false; Object.keys(f).forEach(function (c) { len += Math.floor(f[c] / 2) * 2; if (f[c] % 2) odd = true; }); return len + (odd ? 1 : 0); } });

// ---- Ransom Note ----
MORE16.push({ slug: 'ransom-note', title: 'Ransom Note', difficulty: 'easy', topics: ['Hash Table', 'String', 'Counting'], type: 'STR_STR_BOOL', langsrc: T.STR_STR_BOOL('canConstruct'),
  desc: '<p>Given two strings <code>s</code> (the ransom note) and <code>t</code> (the magazine), return <code>true</code> if <code>s</code> can be constructed using the letters of <code>t</code>. Each letter of <code>t</code> can be used at most once.</p>',
  examples: [{ in: 's = "aa", t = "aab"', out: 'true' }, { in: 's = "aa", t = "ab"', out: 'false' }],
  constraints: ['1 &lt;= s.length, t.length &lt;= 10^5', 's and t consist of lowercase English letters.'],
  editorial: ed('Count magazine letters', 'def canConstruct(s, t):\n    from collections import Counter\n    have = Counter(t)\n    for c in s:\n        if have[c] <= 0:\n            return False\n        have[c] -= 1\n    return True', 'O(s + t)', 'O(1)'),
  gen: function () { var o = [['aa', 'aab'], ['aa', 'ab'], ['a', 'b'], ['abc', 'cba']]; var al = 'abcde'; for (var k = 0; k < 36; k++) o.push([rs(randInt(1, 6), al), rs(randInt(1, 8), al)]); return o; },
  ref: function (a) { var have = {}; a[1].split('').forEach(function (c) { have[c] = (have[c] || 0) + 1; }); var s = a[0]; for (var i = 0; i < s.length; i++) { if (!have[s[i]]) return false; have[s[i]]--; } return true; } });

// ---- Isomorphic Strings ----
MORE16.push({ slug: 'isomorphic-strings', title: 'Isomorphic Strings', difficulty: 'easy', topics: ['Hash Table', 'String'], type: 'STR_STR_BOOL', langsrc: T.STR_STR_BOOL('isIsomorphic'),
  desc: '<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if they are isomorphic — the characters in <code>s</code> can be replaced to get <code>t</code> with a consistent one-to-one mapping (no two characters map to the same character).</p>',
  examples: [{ in: 's = "egg", t = "add"', out: 'true' }, { in: 's = "foo", t = "bar"', out: 'false' }, { in: 's = "paper", t = "title"', out: 'true' }],
  constraints: ['1 &lt;= s.length &lt;= 5*10^4', 't.length == s.length', 's and t consist of any valid ASCII characters.'],
  editorial: ed('Two consistent maps', 'def isIsomorphic(s, t):\n    if len(s) != len(t): return False\n    st, ts = {}, {}\n    for a, b in zip(s, t):\n        if a in st and st[a] != b: return False\n        if b in ts and ts[b] != a: return False\n        st[a] = b; ts[b] = a\n    return True', 'O(n)', 'O(1)'),
  gen: function () { var o = [['egg', 'add'], ['foo', 'bar'], ['paper', 'title'], ['ab', 'aa']]; var al = 'abcd'; for (var k = 0; k < 36; k++) { var n = randInt(1, 6); o.push([rs(n, al), rs(n, al)]); } return o; },
  ref: function (a) { var s = a[0], t = a[1]; if (s.length !== t.length) return false; var st = {}, ts = {}; for (var i = 0; i < s.length; i++) { var x = s[i], y = t[i]; if (st[x] !== undefined && st[x] !== y) return false; if (ts[y] !== undefined && ts[y] !== x) return false; st[x] = y; ts[y] = x; } return true; } });

module.exports = { MORE16 };
