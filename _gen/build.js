const fs = require('fs');
const path = require('path');
const { T, randInt, randArr, arrStr, ln } = require('./gen.js');
const { P, stdinOf, displayOf, fmtExpected, OUT } = require('./problems.js');
const { EDITORIALS } = require('./editorials.js');
const { SOLUTIONS, FULLCLASS, fillStub } = require('./solutions.js');
const { prettyC } = require('./prettyc.js');

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function escH(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
// Build a language-tabbed "Full Solution" block for the editorial.
function solBlock(slug, langs) {
  var sol = SOLUTIONS[slug];
  if (!sol) return '';
  var order = ['python', 'java', 'cpp', 'javascript'], names = { python: 'Python', java: 'Java', cpp: 'C++', javascript: 'JavaScript' };
  var avail = order.filter(function (l) { return sol[l] && langs[l]; });
  if (!avail.length) return '';
  var tabs = '', panes = '';
  avail.forEach(function (l, i) {
    var code = FULLCLASS[slug] ? sol[l] : fillStub(langs[l].stub, sol[l], l);
    if (l !== 'python') code = prettyC(code);   // reindent one-line C-style bodies
    tabs += '<button class="lc-sol-tab' + (i === 0 ? ' active' : '') + '" data-l="' + l + '">' + names[l] + '</button>';
    panes += '<pre class="lc-sol-code" data-l="' + l + '"' + (i === 0 ? '' : ' hidden') + '><code>' + escH(code) + '</code></pre>';
  });
  return '<div class="lc-sol"><h3>Full Solution &mdash; all languages</h3><div class="lc-sol-tabs">' + tabs + '</div>' + panes + '</div>';
}
function pick(arr) { return arr[randInt(0, arr.length - 1)]; }

// ---------- remaining problems (template-based) ----------
P.push({ slug: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'easy', topics: ['String', 'Stack'], type: 'STR_BOOL', langsrc: T.STR_BOOL('isValid'),
  desc: '<p>Given a string <code>s</code> containing just <code>()[]{}</code>, determine if the input is valid: brackets are closed by the same type in the correct order.</p>',
  examples: [{ in: 's = "()[]{}"', out: 'true' }, { in: 's = "([)]"', out: 'false' }],
  constraints: ['1 &lt;= s.length &lt;= 10^4', 's consists of brackets only.'],
  editorial: '<h2>Approach: Stack</h2><p>Push opens; on a close, the stack top must be the matching open. Stack must be empty at the end.</p>',
  gen: function () { var out = [['()[]{}'], ['(]'], ['{[]}'], ['([)]'], ['((('], ['']]; var ch = '()[]{}'; for (var k = 0; k < 40; k++) { var L = randInt(1, 8), s = ''; for (var i = 0; i < L; i++) s += ch[randInt(0, 5)]; out.push([s]); } return out; },
  ref: function (a) { var s = a[0], st = [], m = { ')': '(', ']': '[', '}': '{' }; for (var i = 0; i < s.length; i++) { var c = s[i]; if (m[c]) { if (!st.length || st.pop() !== m[c]) return false; } else st.push(c); } return st.length === 0; } });

P.push({ slug: 'maximum-subarray', title: 'Maximum Subarray', difficulty: 'medium', topics: ['Array', 'Dynamic Programming'], type: 'ARR_INT', langsrc: T.ARR_INT('maxSubArray'),
  desc: '<p>Given an integer array <code>nums</code>, find the contiguous subarray with the largest sum and return its sum.</p>',
  examples: [{ in: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', out: '6', ex: '[4,-1,2,1] has sum 6.' }, { in: 'nums = [5,4,-1,7,8]', out: '23' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '-10^4 &lt;= nums[i] &lt;= 10^4'],
  editorial: '<h2>Approach: Kadane&#39;s</h2><p>Track the best sum ending here: either extend or restart. Keep a global max.</p>',
  gen: function () { var out = [[[-2, 1, -3, 4, -1, 2, 1, -5, 4]], [[5, 4, -1, 7, 8]], [[-1]], [[-2, -3, -1, -5]], [[1, 2, 3, 4, 5, 6]]]; for (var k = 0; k < 40; k++) out.push([randArr(randInt(1, 12), -10, 10)]); return out; },
  ref: function (a) { var n = a[0], best = n[0], cur = n[0]; for (var i = 1; i < n.length; i++) { cur = Math.max(n[i], cur + n[i]); best = Math.max(best, cur); } return best; } });

P.push({ slug: 'contains-duplicate', title: 'Contains Duplicate', difficulty: 'easy', topics: ['Array', 'Hash Table', 'Sorting'], type: 'ARR_BOOL', langsrc: T.ARR_BOOL('containsDuplicate'),
  desc: '<p>Given an integer array <code>nums</code>, return <code>true</code> if any value appears at least twice, and <code>false</code> if every element is distinct.</p>',
  examples: [{ in: 'nums = [1,2,3,1]', out: 'true' }, { in: 'nums = [1,2,3,4]', out: 'false' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '-10^9 &lt;= nums[i] &lt;= 10^9'],
  editorial: '<h2>Approach: Hash Set</h2><p>Add elements to a set; if one is already present, return true.</p>',
  gen: function () { var out = [[[1, 2, 3, 1]], [[1, 2, 3, 4]], [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]]]; for (var k = 0; k < 40; k++) out.push([randArr(randInt(1, 10), 1, 8)]); return out; },
  ref: function (a) { var n = a[0], s = {}; for (var i = 0; i < n.length; i++) { if (s[n[i]]) return true; s[n[i]] = 1; } return false; } });

P.push({ slug: 'best-time-to-buy-and-sell-stock', title: 'Best Time to Buy and Sell Stock', difficulty: 'easy', topics: ['Array', 'Dynamic Programming'], type: 'ARR_INT', langsrc: T.ARR_INT('maxProfit'),
  desc: '<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a stock on day <code>i</code>. Maximize profit by choosing one day to buy and a later day to sell. Return the max profit, or 0 if none.</p>',
  examples: [{ in: 'prices = [7,1,5,3,6,4]', out: '5', ex: 'Buy at 1, sell at 6.' }, { in: 'prices = [7,6,4,3,1]', out: '0' }],
  constraints: ['1 &lt;= prices.length &lt;= 10^5', '0 &lt;= prices[i] &lt;= 10^4'],
  editorial: '<h2>Approach</h2><p>Track the minimum price so far and the best profit against it.</p>',
  gen: function () { var out = [[[7, 1, 5, 3, 6, 4]], [[7, 6, 4, 3, 1]], [[1]], [[2, 4, 1]]]; for (var k = 0; k < 40; k++) out.push([randArr(randInt(1, 12), 0, 20)]); return out; },
  ref: function (a) { var p = a[0], mn = Infinity, best = 0; for (var i = 0; i < p.length; i++) { mn = Math.min(mn, p[i]); best = Math.max(best, p[i] - mn); } return best; } });

P.push({ slug: 'single-number', title: 'Single Number', difficulty: 'easy', topics: ['Array', 'Bit Manipulation'], type: 'ARR_INT', langsrc: T.ARR_INT('singleNumber'),
  desc: '<p>Given a non-empty array <code>nums</code> where every element appears twice except one, find that single one. Do it with O(n) time and O(1) extra space.</p>',
  examples: [{ in: 'nums = [2,2,1]', out: '1' }, { in: 'nums = [4,1,2,1,2]', out: '4' }],
  constraints: ['1 &lt;= nums.length &lt;= 3*10^4', 'Each element appears twice except one.'],
  editorial: '<h2>Approach: XOR</h2><p>XOR of all numbers cancels the pairs, leaving the unique value.</p>',
  gen: function () { var out = [[[2, 2, 1]], [[4, 1, 2, 1, 2]], [[1]]]; for (var k = 0; k < 40; k++) { var m = randInt(1, 6), arr = []; for (var i = 0; i < m; i++) { var v = randInt(1, 30); arr.push(v); arr.push(v); } arr.push(randInt(31, 60)); for (var s = arr.length - 1; s > 0; s--) { var j = randInt(0, s); var tmp = arr[s]; arr[s] = arr[j]; arr[j] = tmp; } out.push([arr]); } return out; },
  ref: function (a) { var x = 0; a[0].forEach(function (v) { x ^= v; }); return x; } });

P.push({ slug: 'majority-element', title: 'Majority Element', difficulty: 'easy', topics: ['Array', 'Hash Table'], type: 'ARR_INT', langsrc: T.ARR_INT('majorityElement'),
  desc: '<p>Given an array <code>nums</code> of size n, return the majority element (the one appearing more than <code>n/2</code> times). It always exists.</p>',
  examples: [{ in: 'nums = [3,2,3]', out: '3' }, { in: 'nums = [2,2,1,1,1,2,2]', out: '2' }],
  constraints: ['n == nums.length', '1 &lt;= n &lt;= 5*10^4', 'The majority element always exists.'],
  editorial: '<h2>Approach: Boyer-Moore Voting</h2><p>Keep a candidate and a count; the survivor is the majority.</p>',
  gen: function () { var out = [[[3, 2, 3]], [[2, 2, 1, 1, 1, 2, 2]], [[1]]]; for (var k = 0; k < 40; k++) { var n = randInt(1, 9), maj = randInt(1, 5), arr = []; var need = Math.floor(n / 2) + 1; for (var i = 0; i < need; i++) arr.push(maj); while (arr.length < n) arr.push(randInt(6, 12)); for (var s = arr.length - 1; s > 0; s--) { var j = randInt(0, s); var t = arr[s]; arr[s] = arr[j]; arr[j] = t; } out.push([arr]); } return out; },
  ref: function (a) { var n = a[0], c = null, cnt = 0; for (var i = 0; i < n.length; i++) { if (cnt === 0) c = n[i]; cnt += (n[i] === c ? 1 : -1); } return c; } });

P.push({ slug: 'product-of-array-except-self', title: 'Product of Array Except Self', difficulty: 'medium', topics: ['Array', 'Prefix Sum'], type: 'ARR_ARR', langsrc: T.ARR_ARR('productExceptSelf'),
  desc: '<p>Given an integer array <code>nums</code>, return an array <code>answer</code> where <code>answer[i]</code> is the product of all elements except <code>nums[i]</code>. Do it without division.</p>',
  examples: [{ in: 'nums = [1,2,3,4]', out: '[24,12,8,6]' }, { in: 'nums = [-1,1,0,-3,3]', out: '[0,0,9,0,0]' }],
  constraints: ['2 &lt;= nums.length &lt;= 10^5', 'Product fits in 32-bit integer.'],
  editorial: '<h2>Approach: Prefix &times; Suffix</h2><p>answer[i] = product of everything to the left times everything to the right.</p>',
  gen: function () { var out = [[[1, 2, 3, 4]], [[-1, 1, 0, -3, 3]], [[2, 3]]]; for (var k = 0; k < 35; k++) out.push([randArr(randInt(2, 6), -4, 4)]); return out; },
  ref: function (a) { var n = a[0], r = new Array(n.length).fill(1), pre = 1; for (var i = 0; i < n.length; i++) { r[i] = pre; pre *= n[i]; } var suf = 1; for (var j = n.length - 1; j >= 0; j--) { r[j] *= suf; suf *= n[j]; } return r; } });

P.push({ slug: 'plus-one', title: 'Plus One', difficulty: 'easy', topics: ['Array', 'Math'], type: 'ARR_ARR', langsrc: T.ARR_ARR('plusOne'),
  desc: '<p>You are given a large integer as an array of digits <code>digits</code> (most significant first). Increment it by one and return the resulting digits.</p>',
  examples: [{ in: 'digits = [1,2,3]', out: '[1,2,4]' }, { in: 'digits = [9,9]', out: '[1,0,0]' }],
  constraints: ['1 &lt;= digits.length &lt;= 100', '0 &lt;= digits[i] &lt;= 9', 'No leading zeros (except the number 0).'],
  editorial: '<h2>Approach</h2><p>Add from the last digit; carry while it is 9. If carry remains, prepend 1.</p>',
  gen: function () { var out = [[[1, 2, 3]], [[9, 9]], [[0]], [[9]]]; for (var k = 0; k < 35; k++) { var L = randInt(1, 5), d = []; d.push(randInt(1, 9)); for (var i = 1; i < L; i++) d.push(randInt(0, 9)); out.push([d]); } return out; },
  ref: function (a) { var d = a[0].slice(); for (var i = d.length - 1; i >= 0; i--) { if (d[i] < 9) { d[i]++; return d; } d[i] = 0; } d.unshift(1); return d; } });

P.push({ slug: 'climbing-stairs', title: 'Climbing Stairs', difficulty: 'easy', topics: ['Dynamic Programming', 'Math'], type: 'INT_INT', langsrc: T.INT_INT('climbStairs'),
  desc: '<p>You are climbing a staircase with <code>n</code> steps. Each time you can climb 1 or 2 steps. In how many distinct ways can you reach the top?</p>',
  examples: [{ in: 'n = 2', out: '2' }, { in: 'n = 3', out: '3' }],
  constraints: ['1 &lt;= n &lt;= 45'],
  editorial: '<h2>Approach: DP (Fibonacci)</h2><p>ways(n) = ways(n-1) + ways(n-2).</p>',
  gen: function () { var out = [[1], [2], [3], [4], [5]]; for (var k = 6; k <= 45; k++) out.push([k]); return out; },
  ref: function (a) { var n = a[0], p = 1, q = 1; for (var i = 2; i <= n; i++) { var t = p + q; p = q; q = t; } return q; } });

P.push({ slug: 'fibonacci-number', title: 'Fibonacci Number', difficulty: 'easy', topics: ['Math', 'Dynamic Programming', 'Recursion'], type: 'INT_INT', langsrc: T.INT_INT('fib'),
  desc: '<p>The Fibonacci numbers satisfy <code>F(0)=0</code>, <code>F(1)=1</code>, and <code>F(n)=F(n-1)+F(n-2)</code> for n &gt; 1. Given <code>n</code>, return <code>F(n)</code>.</p>',
  examples: [{ in: 'n = 2', out: '1' }, { in: 'n = 4', out: '3' }],
  constraints: ['0 &lt;= n &lt;= 30'],
  editorial: '<h2>Approach</h2><p>Iterate keeping the last two values.</p>',
  gen: function () { var out = []; for (var k = 0; k <= 30; k++) out.push([k]); return out; },
  ref: function (a) { var n = a[0]; if (n < 2) return n; var p = 0, q = 1; for (var i = 2; i <= n; i++) { var t = p + q; p = q; q = t; } return q; } });

P.push({ slug: 'valid-anagram', title: 'Valid Anagram', difficulty: 'easy', topics: ['String', 'Hash Table', 'Sorting'], type: 'STR_STR_BOOL', langsrc: T.STR_STR_BOOL('isAnagram'),
  desc: '<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an anagram of <code>s</code> (same letters, same counts).</p>',
  examples: [{ in: 's = "anagram", t = "nagaram"', out: 'true' }, { in: 's = "rat", t = "car"', out: 'false' }],
  constraints: ['1 &lt;= s.length, t.length &lt;= 5*10^4', 's and t consist of lowercase English letters.'],
  editorial: '<h2>Approach</h2><p>Compare character counts (or sorted strings).</p>',
  gen: function () {
    function shuffle(str) { var a = str.split(''); for (var i = a.length - 1; i > 0; i--) { var j = randInt(0, i); var t = a[i]; a[i] = a[j]; a[j] = t; } return a.join(''); }
    function rw(L) { var s = ''; for (var i = 0; i < L; i++) s += String.fromCharCode(97 + randInt(0, 5)); return s; }
    var out = [['anagram', 'nagaram'], ['rat', 'car'], ['a', 'ab']];
    for (var k = 0; k < 25; k++) { var w = rw(randInt(1, 7)); out.push([w, shuffle(w)]); }
    for (var m = 0; m < 15; m++) out.push([rw(randInt(1, 7)), rw(randInt(1, 7))]);
    return out;
  },
  ref: function (a) { var s = a[0], t = a[1]; if (s.length !== t.length) return false; var c = {}; for (var i = 0; i < s.length; i++) c[s[i]] = (c[s[i]] || 0) + 1; for (var j = 0; j < t.length; j++) { if (!c[t[j]]) return false; c[t[j]]--; } return true; } });

P.push({ slug: 'binary-search', title: 'Binary Search', difficulty: 'easy', topics: ['Array', 'Binary Search'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('search'),
  desc: '<p>Given a sorted (ascending) array <code>nums</code> of distinct integers and a <code>target</code>, return its index, or <code>-1</code> if not present. Must run in O(log n).</p>',
  examples: [{ in: 'nums = [-1,0,3,5,9,12], target = 9', out: '4' }, { in: 'nums = [-1,0,3,5,9,12], target = 2', out: '-1' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^4', 'nums is sorted ascending with distinct values.'],
  editorial: '<h2>Approach: Binary Search</h2><p>Halve the search range each step by comparing the middle to the target.</p>',
  gen: function () {
    var out = [[[-1, 0, 3, 5, 9, 12], 9], [[-1, 0, 3, 5, 9, 12], 2], [[5], 5], [[5], -3]];
    for (var k = 0; k < 40; k++) { var n = randInt(1, 10), set = {}, arr = []; while (arr.length < n) { var v = randInt(-20, 20); if (!set[v]) { set[v] = 1; arr.push(v); } } arr.sort(function (a, b) { return a - b; }); var t = (Math.random() < 0.6) ? arr[randInt(0, n - 1)] : randInt(-25, 25); out.push([arr, t]); }
    return out;
  },
  ref: function (a) { var n = a[0], t = a[1], lo = 0, hi = n.length - 1; while (lo <= hi) { var mid = (lo + hi) >> 1; if (n[mid] === t) return mid; if (n[mid] < t) lo = mid + 1; else hi = mid - 1; } return -1; } });

P.push({ slug: 'search-insert-position', title: 'Search Insert Position', difficulty: 'easy', topics: ['Array', 'Binary Search'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('searchInsert'),
  desc: '<p>Given a sorted array of distinct integers <code>nums</code> and a <code>target</code>, return the index if found. If not, return the index where it would be inserted to keep the array sorted. O(log n).</p>',
  examples: [{ in: 'nums = [1,3,5,6], target = 5', out: '2' }, { in: 'nums = [1,3,5,6], target = 2', out: '1' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^4', 'nums is sorted ascending with distinct values.'],
  editorial: '<h2>Approach: Lower Bound</h2><p>Binary search for the first index whose value is &gt;= target.</p>',
  gen: function () {
    var out = [[[1, 3, 5, 6], 5], [[1, 3, 5, 6], 2], [[1, 3, 5, 6], 7], [[1, 3, 5, 6], 0]];
    for (var k = 0; k < 40; k++) { var n = randInt(1, 10), set = {}, arr = []; while (arr.length < n) { var v = randInt(-20, 20); if (!set[v]) { set[v] = 1; arr.push(v); } } arr.sort(function (a, b) { return a - b; }); out.push([arr, randInt(-25, 25)]); }
    return out;
  },
  ref: function (a) { var n = a[0], t = a[1], lo = 0, hi = n.length; while (lo < hi) { var mid = (lo + hi) >> 1; if (n[mid] < t) lo = mid + 1; else hi = mid; } return lo; } });

// Additional problems (with editorials) from problems2.js / problems3.js
require('./problems2.js').MORE.forEach(function (p) { P.push(p); });
require('./problems3.js').MORE3.forEach(function (p) { P.push(p); });
require('./problems4.js').MORE4.forEach(function (p) { P.push(p); });
require('./problems5.js').MORE5.forEach(function (p) { P.push(p); });
require('./problems6.js').MORE6.forEach(function (p) { P.push(p); });
require('./problems7.js').MORE7.forEach(function (p) { P.push(p); });
require('./problems8.js').MORE8.forEach(function (p) { P.push(p); });
require('./problems9.js').MORE9.forEach(function (p) { P.push(p); });
require('./problems10.js').MORE10.forEach(function (p) { P.push(p); });
require('./problems11.js').MORE11.forEach(function (p) { P.push(p); });
require('./problems12.js').MORE12.forEach(function (p) { P.push(p); });
require('./problems13.js').MORE13.forEach(function (p) { P.push(p); });
require('./problems14.js').MORE14.forEach(function (p) { P.push(p); });
require('./problems15.js').MORE15.forEach(function (p) { P.push(p); });
require('./problems16.js').MORE16.forEach(function (p) { P.push(p); });
require('./problems17.js').MORE17.forEach(function (p) { P.push(p); });
require('./problems18.js').MORE18.forEach(function (p) { P.push(p); });
require('./problems19.js').MORE19.forEach(function (p) { P.push(p); });
require('./problems20.js').MORE20.forEach(function (p) { P.push(p); });
require('./problems21.js').MORE21.forEach(function (p) { P.push(p); });
require('./problems22.js').MORE22.forEach(function (p) { P.push(p); });
require('./problems23.js').MORE23.forEach(function (p) { P.push(p); });
require('./problems24.js').MORE24.forEach(function (p) { P.push(p); });
require('./problems25.js').MORE25.forEach(function (p) { P.push(p); });
require('./problems26.js').MORE26.forEach(function (p) { P.push(p); });
require('./problems27.js').MORE27.forEach(function (p) { P.push(p); });
require('./problems28.js').MORE28.forEach(function (p) { P.push(p); });
require('./problems29.js').MORE29.forEach(function (p) { P.push(p); });
require('./problems30.js').MORE30.forEach(function (p) { P.push(p); });

// Deduplicate by slug (keep first occurrence)
var _seen = {}; var _deduped = [];
P.forEach(function (p) { if (!_seen[p.slug]) { _seen[p.slug] = 1; _deduped.push(p); } });
P.length = 0; _deduped.forEach(function (p) { P.push(p); });

// ---------- unique SEO meta description per problem ----------
// Built from the real problem statement + difficulty so no two pages share
// the same meta description (fixes Google "crawled - currently not indexed").
function stripHtml(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&le;/g, '<=').replace(/&ge;/g, '>=').replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
function metaDesc(p) {
  var snip = stripHtml(p.desc);
  if (snip.length > 118) snip = snip.slice(0, 115).replace(/\s+\S*$/, '') + '…';
  var d = cap(p.difficulty);
  var desc = p.title + ' (' + d + '): ' + snip +
    ' Solve it online in Python, Java, C++ or JavaScript with instant verdicts.';
  return desc.replace(/\s+/g, ' ').trim().replace(/"/g, '\\"');
}

// ---------- write ----------
var indexRows = [];
P.forEach(function (p) {
  var src = p.custom || p.langsrc;
  var langs = {};
  ['java', 'python', 'cpp', 'javascript'].forEach(function (k) { if (src[k]) langs[k] = { stub: src[k].stub, harness: src[k].harness }; });

  var seen = {}, cases = [];
  p.gen().forEach(function (args) {
    var stdin = stdinOf(p.type, args);
    if (seen[stdin] !== undefined) return; seen[stdin] = 1;
    cases.push({ stdin: stdin, expected: fmtExpected(p.ref(args)), display: displayOf(p.type, args) });
  });

  var edHtml = EDITORIALS[p.slug] || p.editorial || '';
  var sb = solBlock(p.slug, langs);
  if (sb) edHtml = edHtml.replace(/<h3>Solution<\/h3><pre><code>[\s\S]*?<\/code><\/pre>/, '') + sb;
  var sc = { id: p.slug, type: p.type || '', diagram: p.diagram || '', editorial: edHtml, langs: langs, cases: cases };
  var topics = p.topics.map(function (t) { return '<span class="lc-tag">' + t + '</span>'; }).join('');
  var exs = p.examples.map(function (e, i) { return '<h2>Example ' + (i + 1) + '</h2><pre>Input:  ' + e.in + '\nOutput: ' + e.out + (e.ex ? '\nExplanation: ' + e.ex : '') + '</pre>'; }).join('\n');
  var cons = '<h2>Constraints</h2><ul>' + p.constraints.map(function (c) { return '<li>' + c + '</li>'; }).join('') + '</ul>';
  var body = '<h1>' + p.title + '</h1>\n<span class="lc-diff ' + p.difficulty + '">' + cap(p.difficulty) + '</span>\n' +
    '<details class="lc-topics"><summary>Topics</summary><div class="lc-tags">' + topics + '</div></details>\n' +
    p.desc + '\n' + exs + '\n' + cons + '\n' +
    '<script>\nwindow.SC_LC = ' + JSON.stringify(sc) + ';\n</script>';
  var fm = '---\nlayout: lc\ntitle: "' + p.title + ' - Online Judge"\ndescription: "' + metaDesc(p) + '"\npermalink: /dsa/problem/' + p.slug + '\n---\n';
  fs.writeFileSync(path.join(OUT, p.slug + '.md'), fm + '{% raw %}\n' + body + '\n{% endraw %}\n');
  indexRows.push({ slug: p.slug, title: p.title, difficulty: p.difficulty, topics: p.topics, n: cases.length });
});

// problemset index
var psData = indexRows.map(function (r) { return { s: r.slug, t: r.title, d: r.difficulty, g: r.topics || [] }; });
var idx = '---\nlayout: default\ntitle: "Problemset - Practice Coding Problems"\ndescription: "SystemCraft Problemset. Solve LeetCode-style problems in Python, Java, C++, or JavaScript with an in-browser judge, test cases, and instant verdicts."\npermalink: /problemset\nhide_toc: true\n---\n\n' +
  '{% raw %}\n<div id="ps-root">Loading problems…</div>\n' +
  '<script>window.SC_PROBLEMS = ' + JSON.stringify(psData) + ';</script>\n{% endraw %}\n' +
  '{% include problemset-app.html %}\n';
fs.writeFileSync(path.join(__dirname, '..', 'content', 'problemset.md'), idx);

// Catalog: slug -> { title, difficulty } for the profile difficulty breakdown.
var catalog = {};
indexRows.forEach(function (r) { catalog[r.slug] = { title: r.title, difficulty: r.difficulty, topics: r.topics || [] }; });
fs.writeFileSync(path.join(__dirname, '..', '_includes', 'sc-catalog.html'),
  '<script>window.SC_CATALOG = ' + JSON.stringify(catalog) + ';</script>\n');

// Compact ordered [slug, title] list for the header Daily Challenge widget.
// A deterministic date seed indexes this list so every user gets the same
// problem on the same (UTC) day, like LeetCode's daily.
var dailyList = indexRows.map(function (r) { return [r.slug, r.title]; });
fs.writeFileSync(path.join(__dirname, '..', '_includes', 'daily-data.html'),
  '<script>window.SC_DAILY = ' + JSON.stringify(dailyList) + ';</script>\n');

console.log('Generated ' + P.length + ' problems + problemset index + catalog + daily.');
