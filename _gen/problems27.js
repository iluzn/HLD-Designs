// Batch 27: famous HARD string problems with single, deterministic outputs.
// Types used are limited to the verified-safe string harnesses:
//   STR_INT, STR_BOOL, STR_STR, STR_STR_BOOL, STR_STR_STR, STR_STR_INT.
// Every ref() below is the pure-JS source of truth used to compute expected
// output; gen() supplies real examples plus ~35 random valid cases. All
// generated strings contain NO newline and are kept short (<= ~16) so refs
// run fast, and every answer is uniquely defined.
const { T, randInt } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}
function rstr(len, k) { var a = 'abcdefghij'.substring(0, k), s = ''; for (var i = 0; i < len; i++) s += a[randInt(0, k - 1)]; return s; }

const MORE27 = [];

// ============================================================
// 1) Minimum Window Substring (STR_STR_STR)
// ============================================================
function minWindowRef(s, t) {
  if (t.length === 0) return '';
  var need = {}, required = 0;
  for (var i = 0; i < t.length; i++) { if (need[t[i]] === undefined) { need[t[i]] = 0; required++; } need[t[i]]++; }
  var have = {}, formed = 0, l = 0, bestLen = Infinity, bestL = 0;
  for (var r = 0; r < s.length; r++) {
    var c = s[r];
    if (need[c] !== undefined) { have[c] = (have[c] || 0) + 1; if (have[c] === need[c]) formed++; }
    while (formed === required) {
      if (r - l + 1 < bestLen) { bestLen = r - l + 1; bestL = l; }
      var lc = s[l];
      if (need[lc] !== undefined) { have[lc]--; if (have[lc] < need[lc]) formed--; }
      l++;
    }
  }
  return bestLen === Infinity ? '' : s.substr(bestL, bestLen);
}
MORE27.push({
  slug: 'minimum-window-substring', title: 'Minimum Window Substring', difficulty: 'hard',
  topics: ['Hash Table', 'String', 'Sliding Window'], type: 'STR_STR_STR', langsrc: T.STR_STR_STR('minWindow'),
  desc: '<p>Given two strings <code>s</code> and <code>t</code>, return the <strong>smallest substring</strong> of <code>s</code> that contains every character of <code>t</code> (including duplicates). If there is no such window, return the empty string <code>""</code>. When several windows share the minimum length, return the one with the smallest starting index.</p>',
  examples: [{ in: 's = "ADOBECODEBANC", t = "ABC"', out: '"BANC"' }, { in: 's = "a", t = "a"', out: '"a"' }, { in: 's = "a", t = "aa"', out: '""' }],
  constraints: ['1 &lt;= s.length &lt;= 16', '1 &lt;= t.length &lt;= 6', 's and t consist of lowercase and uppercase English letters.'],
  editorial: ed('Sliding window with need counts', 'expand right; when all chars covered, shrink left and record the shortest window (earliest on ties).', 'O(|s| + |t|)', 'O(|s| + |t|)'),
  gen: function () {
    var o = [['ADOBECODEBANC', 'ABC'], ['a', 'a'], ['a', 'aa'], ['aa', 'aa'], ['cabwefgewcwaefgcf', 'cae']];
    for (var k = 0; k < 36; k++) { var s = rstr(randInt(1, 12), 5), t = rstr(randInt(1, 4), 5); o.push([s, t]); }
    return o;
  },
  ref: function (a) { return minWindowRef(a[0], a[1]); }
});

// ============================================================
// 2) Wildcard Matching (STR_STR_BOOL)
// ============================================================
function wildRef(s, p) {
  var n = s.length, m = p.length;
  var dp = []; for (var i = 0; i <= n; i++) { dp.push(new Array(m + 1).fill(false)); }
  dp[0][0] = true;
  for (var j = 1; j <= m; j++) if (p[j - 1] === '*') dp[0][j] = dp[0][j - 1];
  for (i = 1; i <= n; i++) for (j = 1; j <= m; j++) {
    if (p[j - 1] === '*') dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
    else if (p[j - 1] === '?' || p[j - 1] === s[i - 1]) dp[i][j] = dp[i - 1][j - 1];
  }
  return dp[n][m];
}
MORE27.push({
  slug: 'wildcard-matching', title: 'Wildcard Matching', difficulty: 'hard',
  topics: ['String', 'Dynamic Programming', 'Greedy'], type: 'STR_STR_BOOL', langsrc: T.STR_STR_BOOL('isMatch'),
  desc: '<p>Given an input string <code>s</code> and a pattern <code>p</code>, return <code>true</code> if <code>p</code> matches the entire <code>s</code>. The pattern supports <code>\'?\'</code> (matches any single character) and <code>\'*\'</code> (matches any sequence of characters, including the empty sequence).</p>',
  examples: [{ in: 's = "aa", p = "a"', out: 'false' }, { in: 's = "aa", p = "*"', out: 'true' }, { in: 's = "cb", p = "?a"', out: 'false' }],
  constraints: ['0 &lt;= s.length, p.length &lt;= 16', 's contains only lowercase letters.', 'p contains lowercase letters, \'?\' and \'*\'.'],
  editorial: ed('2D DP over prefixes', 'dp[i][j] = does p[..j] match s[..i]; star extends previous row or column.', 'O(|s|*|p|)', 'O(|s|*|p|)'),
  gen: function () {
    var o = [['aa', 'a'], ['aa', '*'], ['cb', '?a'], ['adceb', '*a*b'], ['acdcb', 'a*c?b']];
    for (var k = 0; k < 36; k++) {
      var s = rstr(randInt(0, 7), 3);
      var pl = randInt(0, 7), p = '';
      for (var i = 0; i < pl; i++) { var r = randInt(0, 6); p += r < 3 ? 'abc'[r] : (r < 5 ? '?' : '*'); }
      o.push([s, p]);
    }
    return o;
  },
  ref: function (a) { return wildRef(a[0], a[1]); }
});

// ============================================================
// 3) Longest Valid Parentheses (STR_INT)
// ============================================================
function lvpRef(s) {
  var best = 0, st = [-1];
  for (var i = 0; i < s.length; i++) {
    if (s[i] === '(') st.push(i);
    else { st.pop(); if (st.length === 0) st.push(i); else best = Math.max(best, i - st[st.length - 1]); }
  }
  return best;
}
MORE27.push({
  slug: 'longest-valid-parentheses', title: 'Longest Valid Parentheses', difficulty: 'hard',
  topics: ['String', 'Dynamic Programming', 'Stack'], type: 'STR_INT', langsrc: T.STR_INT('longestValidParentheses'),
  desc: '<p>Given a string <code>s</code> containing just the characters <code>\'(\'</code> and <code>\')\'</code>, return the length of the longest <strong>valid</strong> (well-formed) parentheses substring.</p>',
  examples: [{ in: 's = "(()"', out: '2' }, { in: 's = ")()())"', out: '4' }, { in: 's = ""', out: '0' }],
  constraints: ['0 &lt;= s.length &lt;= 16', 's[i] is \'(\' or \')\'.'],
  editorial: ed('Index stack', 'push -1 as a base; on \')\' pop and either reset the base or measure i - top.', 'O(n)', 'O(n)'),
  gen: function () {
    var o = [['(()'], [')()())'], [''], ['()(()'], ['()(())']];
    for (var k = 0; k < 36; k++) { var len = randInt(0, 14), s = ''; for (var i = 0; i < len; i++) s += randInt(0, 1) ? '(' : ')'; o.push([s]); }
    return o;
  },
  ref: function (a) { return lvpRef(a[0]); }
});

// ============================================================
// 4) Shortest Palindrome (STR_STR)
// ============================================================
function shortestPalRef(s) {
  var n = s.length;
  for (var k = n; k >= 0; k--) {
    var ok = true;
    for (var i = 0, j = k - 1; i < j; i++, j--) if (s[i] !== s[j]) { ok = false; break; }
    if (ok) { var suffix = s.substring(k); return suffix.split('').reverse().join('') + s; }
  }
  return s;
}
MORE27.push({
  slug: 'shortest-palindrome', title: 'Shortest Palindrome', difficulty: 'hard',
  topics: ['String', 'Rolling Hash', 'String Matching'], type: 'STR_STR', langsrc: T.STR_STR('shortestPalindrome'),
  desc: '<p>You are given a string <code>s</code>. You may convert it to a palindrome by adding characters in front of it. Return the shortest palindrome you can find by performing this transformation.</p>',
  examples: [{ in: 's = "aacecaaa"', out: '"aaacecaaa"' }, { in: 's = "abcd"', out: '"dcbabcd"' }, { in: 's = ""', out: '""' }],
  constraints: ['0 &lt;= s.length &lt;= 16', 's consists of lowercase English letters only.'],
  editorial: ed('Longest palindromic prefix', 'find the longest prefix that is a palindrome; prepend the reverse of the remaining suffix.', 'O(n^2)', 'O(n)'),
  gen: function () {
    var o = [['aacecaaa'], ['abcd'], [''], ['aba'], ['aaaa']];
    for (var k = 0; k < 36; k++) o.push([rstr(randInt(0, 12), 3)]);
    return o;
  },
  ref: function (a) { return shortestPalRef(a[0]); }
});

// ============================================================
// 5) Scramble String (STR_STR_BOOL)
// ============================================================
function scrambleRef(s1, s2) {
  var memo = {};
  function rec(a, b) {
    if (a === b) return true;
    if (a.length !== b.length) return false;
    var key = a + '#' + b; if (memo[key] !== undefined) return memo[key];
    var cnt = {}, c;
    for (var i = 0; i < a.length; i++) { c = a[i]; cnt[c] = (cnt[c] || 0) + 1; }
    for (i = 0; i < b.length; i++) { c = b[i]; cnt[c] = (cnt[c] || 0) - 1; }
    for (var kk in cnt) if (cnt[kk] !== 0) { memo[key] = false; return false; }
    var n = a.length;
    for (i = 1; i < n; i++) {
      if (rec(a.substring(0, i), b.substring(0, i)) && rec(a.substring(i), b.substring(i))) { memo[key] = true; return true; }
      if (rec(a.substring(0, i), b.substring(n - i)) && rec(a.substring(i), b.substring(0, n - i))) { memo[key] = true; return true; }
    }
    memo[key] = false; return false;
  }
  return rec(s1, s2);
}
function scrambleOf(str) {
  if (str.length <= 1) return str;
  if (randInt(0, 2) === 0) return str;
  var i = randInt(1, str.length - 1);
  var left = scrambleOf(str.substring(0, i)), right = scrambleOf(str.substring(i));
  return randInt(0, 1) ? left + right : right + left;
}
MORE27.push({
  slug: 'scramble-string', title: 'Scramble String', difficulty: 'hard',
  topics: ['String', 'Dynamic Programming'], type: 'STR_STR_BOOL', langsrc: T.STR_STR_BOOL('isScramble'),
  desc: '<p>We can scramble a string <code>s</code> by recursively splitting it into two non-empty substrings and optionally swapping them, then scrambling each part. Given two strings <code>s</code> (as <code>s</code>) and <code>t</code>, return <code>true</code> if <code>t</code> is a scrambled string of <code>s</code>.</p>',
  examples: [{ in: 's = "great", t = "rgeat"', out: 'true' }, { in: 's = "abcde", t = "caebd"', out: 'false' }, { in: 's = "a", t = "a"', out: 'true' }],
  constraints: ['s.length == t.length', '1 &lt;= s.length &lt;= 8', 's and t consist of lowercase English letters.'],
  editorial: ed('Recursion with memoization', 'try every split point in both the swapped and non-swapped orientation; prune with a character-count check.', 'O(n^4)', 'O(n^3)'),
  gen: function () {
    var o = [['great', 'rgeat'], ['abcde', 'caebd'], ['a', 'a'], ['abc', 'bca'], ['abb', 'bba']];
    for (var k = 0; k < 36; k++) {
      var base = rstr(randInt(1, 6), 3);
      if (k % 2 === 0) o.push([base, scrambleOf(base)]);
      else o.push([base, rstr(base.length, 3)]);
    }
    return o;
  },
  ref: function (a) { return scrambleRef(a[0], a[1]); }
});

// ============================================================
// 6) Basic Calculator (STR_INT)
// ============================================================
function calcRef(s) {
  var st = [], num = 0, sign = 1, res = 0;
  for (var i = 0; i < s.length; i++) {
    var c = s[i];
    if (c >= '0' && c <= '9') num = num * 10 + (c.charCodeAt(0) - 48);
    else if (c === '+') { res += sign * num; num = 0; sign = 1; }
    else if (c === '-') { res += sign * num; num = 0; sign = -1; }
    else if (c === '(') { st.push(res); st.push(sign); res = 0; sign = 1; }
    else if (c === ')') { res += sign * num; num = 0; res *= st.pop(); res += st.pop(); }
  }
  res += sign * num;
  return res;
}
function genExprStr(depth) {
  var r = randInt(0, 10);
  if (depth <= 0 || r < 4) return '' + randInt(0, 12);
  var t = randInt(0, 10);
  if (t < 3) return '(' + genExprStr(depth - 1) + ')';
  if (t < 5) return '-' + genExprStr(depth - 1);
  var op = randInt(0, 1) ? '+' : '-';
  return genExprStr(depth - 1) + op + genExprStr(depth - 1);
}
MORE27.push({
  slug: 'basic-calculator', title: 'Basic Calculator', difficulty: 'hard',
  topics: ['Math', 'String', 'Stack'], type: 'STR_INT', langsrc: T.STR_INT('calculate'),
  desc: '<p>Given a string <code>s</code> representing a valid expression, implement a basic calculator to evaluate it and return the result. The expression contains non-negative integers, <code>+</code>, <code>-</code>, <code>(</code>, <code>)</code>, spaces, and unary minus.</p>',
  examples: [{ in: 's = "1 + 1"', out: '2' }, { in: 's = " 2-1 + 2 "', out: '3' }, { in: 's = "(1+(4+5+2)-3)+(6+8)"', out: '23' }],
  constraints: ['1 &lt;= s.length &lt;= 20', 's consists of digits, \'+\', \'-\', \'(\', \')\', and spaces.', 's represents a valid expression.'],
  editorial: ed('Sign stack', 'accumulate a running result with the current sign; on \'(\' push the context and on \')\' fold it back.', 'O(n)', 'O(n)'),
  gen: function () {
    var o = [['1 + 1'], [' 2-1 + 2 '], ['(1+(4+5+2)-3)+(6+8)'], ['-(3+4)'], ['10-(2+3)']];
    for (var k = 0; k < 36; k++) {
      var e = genExprStr(2);
      var tries = 0;
      while (e.length > 18 && tries < 5) { e = genExprStr(2); tries++; }
      if (e.length > 18) e = '' + randInt(0, 12);
      o.push([e]);
    }
    return o;
  },
  ref: function (a) { return calcRef(a[0]); }
});

// ============================================================
// 7) Valid Number (STR_BOOL)
// ============================================================
function isNumberRef(s) {
  var i = 0, n = s.length;
  if (n === 0) return false;
  if (s[i] === '+' || s[i] === '-') i++;
  var digits = 0, dots = 0;
  while (i < n && ((s[i] >= '0' && s[i] <= '9') || s[i] === '.')) {
    if (s[i] === '.') { dots++; if (dots > 1) return false; }
    else digits++;
    i++;
  }
  if (digits === 0) return false;
  if (i < n && (s[i] === 'e' || s[i] === 'E')) {
    i++;
    if (i < n && (s[i] === '+' || s[i] === '-')) i++;
    var ed2 = 0;
    while (i < n && s[i] >= '0' && s[i] <= '9') { ed2++; i++; }
    if (ed2 === 0) return false;
  }
  return i === n;
}
MORE27.push({
  slug: 'valid-number', title: 'Valid Number', difficulty: 'hard',
  topics: ['String'], type: 'STR_BOOL', langsrc: T.STR_BOOL('isNumber'),
  desc: '<p>Given a string <code>s</code>, return <code>true</code> if <code>s</code> is a valid number. A valid number has an optional sign, an integer or decimal part with at least one digit, and an optional exponent (<code>e</code> or <code>E</code>) followed by an optional sign and at least one digit.</p>',
  examples: [{ in: 's = "0"', out: 'true' }, { in: 's = "e"', out: 'false' }, { in: 's = "-90E3"', out: 'true' }],
  constraints: ['1 &lt;= s.length &lt;= 12', 's consists of digits, \'+\', \'-\', \'.\', \'e\', \'E\'.'],
  editorial: ed('Single left-to-right scan', 'consume optional sign, mantissa (needs a digit, at most one dot), then optional exponent with its own required digits.', 'O(n)', 'O(1)'),
  gen: function () {
    var o = [['0'], ['e'], ['-90E3'], ['.1'], ['4.'], ['.'], ['2e10'], ['abc'], ['1e'], ['+6e-1'], ['99e2.5'], ['53.5e93'], ['--6'], ['-+3'], ['3e+7']];
    var cs = '0123456789.eE+-';
    for (var k = 0; k < 30; k++) { var len = randInt(1, 6), s = ''; for (var i = 0; i < len; i++) s += cs[randInt(0, cs.length - 1)]; o.push([s]); }
    return o;
  },
  ref: function (a) { return isNumberRef(a[0]); }
});

// ============================================================
// 8) Longest Duplicate Substring (STR_STR)
// ============================================================
function longestDupRef(s) {
  var n = s.length, best = '';
  for (var len = 1; len <= n - 1; len++) {
    var seen = {}, found = null;
    for (var i = 0; i + len <= n; i++) {
      var sub = s.substring(i, i + len);
      if (seen[sub]) { if (found === null || sub < found) found = sub; }
      else seen[sub] = true;
    }
    if (found !== null) best = found;
  }
  return best;
}
MORE27.push({
  slug: 'longest-duplicate-substring', title: 'Longest Duplicate Substring', difficulty: 'hard',
  topics: ['String', 'Binary Search', 'Suffix Array', 'Rolling Hash'], type: 'STR_STR', langsrc: T.STR_STR('longestDupSubstring'),
  desc: '<p>Given a string <code>s</code>, consider all <strong>duplicated substrings</strong>: (contiguous) substrings that occur two or more times (the occurrences may overlap). Return the longest such substring; if there are several of the maximum length, return the <strong>lexicographically smallest</strong> one. If none exists, return <code>""</code>.</p>',
  examples: [{ in: 's = "banana"', out: '"ana"' }, { in: 's = "abcd"', out: '""' }, { in: 's = "aaaa"', out: '"aaa"' }],
  constraints: ['1 &lt;= s.length &lt;= 16', 's consists of lowercase English letters.'],
  editorial: ed('Length scan with a seen-set', 'for each length keep the smallest substring seen twice; the largest length with a duplicate wins.', 'O(n^3)', 'O(n^2)'),
  gen: function () {
    var o = [['banana'], ['abcd'], ['aaaa'], ['abcabc'], ['aabaab']];
    for (var k = 0; k < 36; k++) o.push([rstr(randInt(1, 14), 3)]);
    return o;
  },
  ref: function (a) { return longestDupRef(a[0]); }
});

// ============================================================
// 9) Count Different Palindromic Subsequences (STR_INT)
// ============================================================
var CDPS_MOD = 1000000007;
function cdpsRef(s) {
  var n = s.length;
  if (n === 0) return 0;
  var dp = []; for (var i = 0; i < n; i++) dp.push(new Array(n).fill(0));
  for (i = 0; i < n; i++) dp[i][i] = 1;
  for (var len = 2; len <= n; len++) {
    for (i = 0; i + len - 1 < n; i++) {
      var j = i + len - 1;
      if (s[i] !== s[j]) {
        dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1];
      } else {
        var lo = i + 1, hi = j - 1;
        while (lo <= hi && s[lo] !== s[i]) lo++;
        while (lo <= hi && s[hi] !== s[i]) hi--;
        if (lo > hi) dp[i][j] = dp[i + 1][j - 1] * 2 + 2;
        else if (lo === hi) dp[i][j] = dp[i + 1][j - 1] * 2 + 1;
        else dp[i][j] = dp[i + 1][j - 1] * 2 - dp[lo + 1][hi - 1];
      }
      dp[i][j] = ((dp[i][j] % CDPS_MOD) + CDPS_MOD) % CDPS_MOD;
    }
  }
  return dp[0][n - 1];
}
MORE27.push({
  slug: 'count-different-palindromic-subsequences', title: 'Count Different Palindromic Subsequences', difficulty: 'hard',
  topics: ['String', 'Dynamic Programming'], type: 'STR_INT', langsrc: T.STR_INT('countPalindromicSubsequences'),
  desc: '<p>Given a string <code>s</code>, return the number of different non-empty palindromic subsequences in <code>s</code>, taken modulo <code>10^9 + 7</code>. Two subsequences are different if there is some index where they differ.</p>',
  examples: [{ in: 's = "bccb"', out: '6' }, { in: 's = "abcd"', out: '4' }, { in: 's = "aaa"', out: '3' }],
  constraints: ['1 &lt;= s.length &lt;= 12', 's consists of characters \'a\', \'b\', \'c\', or \'d\'.'],
  editorial: ed('Interval DP counting distinct palindromes', 'when the endpoints match, count inner palindromes twice and adjust for equal inner characters; otherwise inclusion-exclusion.', 'O(n^2)', 'O(n^2)'),
  gen: function () {
    var o = [['bccb'], ['abcd'], ['aaa'], ['aabca'], ['dcbabcdb']];
    for (var k = 0; k < 36; k++) o.push([rstr(randInt(1, 12), 4)]);
    return o;
  },
  ref: function (a) { return cdpsRef(a[0]); }
});

// ============================================================
// 10) Distinct Echo Substrings (STR_INT)
// ============================================================
function echoRef(s) {
  var n = s.length, set = {};
  for (var i = 0; i < n; i++) for (var len = 1; i + 2 * len <= n; len++) {
    var a = s.substring(i, i + len), b = s.substring(i + len, i + 2 * len);
    if (a === b) set[a] = true;
  }
  return Object.keys(set).length;
}
MORE27.push({
  slug: 'distinct-echo-substrings', title: 'Distinct Echo Substrings', difficulty: 'hard',
  topics: ['String', 'Hash Table', 'Rolling Hash'], type: 'STR_INT', langsrc: T.STR_INT('distinctEchoSubstrings'),
  desc: '<p>Return the number of <strong>distinct</strong> non-empty substrings of <code>s</code> that can be written as the concatenation of some string with itself (i.e. equal to <code>a + a</code> for some string <code>a</code>).</p>',
  examples: [{ in: 's = "abcabcabc"', out: '3' }, { in: 's = "leetcodeleetcode"', out: '2' }, { in: 's = "aaaa"', out: '2' }],
  constraints: ['1 &lt;= s.length &lt;= 16', 's consists of lowercase English letters.'],
  editorial: ed('Enumerate halves', 'for every start and half-length compare the two halves; collect the distinct matching strings in a set.', 'O(n^3)', 'O(n^2)'),
  gen: function () {
    var o = [['abcabcabc'], ['leetcodeleetcode'], ['aaaa'], ['abab'], ['abaababa']];
    for (var k = 0; k < 36; k++) o.push([rstr(randInt(1, 14), 2)]);
    return o;
  },
  ref: function (a) { return echoRef(a[0]); }
});

// ============================================================
// 11) Encode String with Shortest Length (STR_STR)
// ============================================================
function encodeRef(s) {
  var n = s.length;
  if (n === 0) return '';
  function better(a, b) { if (a.length !== b.length) return a.length < b.length ? a : b; return a <= b ? a : b; }
  var dp = []; for (var i = 0; i < n; i++) dp.push(new Array(n));
  for (var len = 1; len <= n; len++) {
    for (i = 0; i + len - 1 < n; i++) {
      var j = i + len - 1, sub = s.substring(i, j + 1), best = sub;
      for (var k = i; k < j; k++) best = better(best, dp[i][k] + dp[k + 1][j]);
      var rep = (sub + sub).indexOf(sub, 1);
      if (rep < sub.length) {
        var unitLen = rep, times = sub.length / unitLen;
        best = better(best, times + '[' + dp[i][i + unitLen - 1] + ']');
      }
      dp[i][j] = best;
    }
  }
  return dp[0][n - 1];
}
MORE27.push({
  slug: 'encode-string-with-shortest-length', title: 'Encode String with Shortest Length', difficulty: 'hard',
  topics: ['String', 'Dynamic Programming'], type: 'STR_STR', langsrc: T.STR_STR('encode'),
  desc: '<p>Given a string <code>s</code>, encode it so that its encoded length is as short as possible. The encoding rule is <code>k[encoded_string]</code>, where <code>encoded_string</code> is repeated exactly <code>k</code> times. If encoding does not make the string shorter, keep it as-is. When several encodings share the minimum length, return the <strong>lexicographically smallest</strong> one.</p>',
  examples: [{ in: 's = "aaa"', out: '"aaa"' }, { in: 's = "aaaaa"', out: '"5[a]"' }, { in: 's = "aaaaaaaaaa"', out: '"10[a]"' }],
  constraints: ['1 &lt;= s.length &lt;= 12', 's consists of lowercase English letters only.'],
  editorial: ed('Interval DP', 'for each interval take the best of raw text, every split, and the shortest repeating unit; break length ties lexicographically.', 'O(n^3)', 'O(n^2)'),
  gen: function () {
    var o = [['aaa'], ['aaaaa'], ['aaaaaaaaaa'], ['aabcaabcd'], ['abababab']];
    for (var k = 0; k < 36; k++) {
      if (k % 3 === 0) { var unit = rstr(randInt(1, 2), 2), times = randInt(2, 6), s = ''; for (var t = 0; t < times && s.length < 12; t++) s += unit; o.push([s]); }
      else o.push([rstr(randInt(1, 10), 2)]);
    }
    return o;
  },
  ref: function (a) { return encodeRef(a[0]); }
});

// ============================================================
// 12) Number of Atoms (STR_STR)
// ============================================================
function atomsRef(formula) {
  var i = 0, n = formula.length;
  function isDigit(c) { return c >= '0' && c <= '9'; }
  function isLower(c) { return c >= 'a' && c <= 'z'; }
  var stack = [{}];
  while (i < n) {
    var c = formula[i];
    if (c === '(') { i++; stack.push({}); }
    else if (c === ')') {
      i++; var start = i; while (i < n && isDigit(formula[i])) i++;
      var mult = start < i ? parseInt(formula.substring(start, i), 10) : 1;
      var top = stack.pop(), cur = stack[stack.length - 1];
      for (var key in top) cur[key] = (cur[key] || 0) + top[key] * mult;
    } else {
      var st2 = i; i++; while (i < n && isLower(formula[i])) i++;
      var name = formula.substring(st2, i);
      var ds = i; while (i < n && isDigit(formula[i])) i++;
      var cnt = ds < i ? parseInt(formula.substring(ds, i), 10) : 1;
      var m = stack[stack.length - 1]; m[name] = (m[name] || 0) + cnt;
    }
  }
  var map = stack[0], keys = Object.keys(map).sort();
  var res = '';
  for (var q = 0; q < keys.length; q++) { res += keys[q]; if (map[keys[q]] > 1) res += map[keys[q]]; }
  return res;
}
var ATOM_ELEMENTS = ['H', 'O', 'C', 'N', 'B', 'Ca', 'Mg', 'Na', 'K', 'S'];
function genFormula(depth) {
  var parts = randInt(1, 3), out = '';
  for (var p = 0; p < parts; p++) {
    if (depth > 0 && randInt(0, 3) === 0) {
      out += '(' + genFormula(depth - 1) + ')';
      if (randInt(0, 1)) out += randInt(2, 5);
    } else {
      out += ATOM_ELEMENTS[randInt(0, ATOM_ELEMENTS.length - 1)];
      if (randInt(0, 1)) out += randInt(2, 6);
    }
  }
  return out;
}
MORE27.push({
  slug: 'number-of-atoms', title: 'Number of Atoms', difficulty: 'hard',
  topics: ['Hash Table', 'String', 'Stack', 'Sorting'], type: 'STR_STR', langsrc: T.STR_STR('countOfAtoms'),
  desc: '<p>Given a chemical <code>formula</code> (as string <code>s</code>), return the count of each atom. Output the element names in <strong>alphabetical order</strong>, each followed by its count if the count is greater than 1. Groups may be nested with parentheses and followed by a multiplier.</p>',
  examples: [{ in: 's = "H2O"', out: '"H2O"' }, { in: 's = "Mg(OH)2"', out: '"H2MgO2"' }, { in: 's = "K4(ON(SO3)2)3"', out: '"K4N3O21S6"' }],
  constraints: ['1 &lt;= s.length &lt;= 16', 's is a valid chemical formula of element tokens, digits, and parentheses.'],
  editorial: ed('Stack of counts', 'push a new map on \'(\'; on \')\' pop, scale by the multiplier, and merge into the parent; finally emit sorted element counts.', 'O(n log n)', 'O(n)'),
  gen: function () {
    var o = [['H2O'], ['Mg(OH)2'], ['K4(ON(SO3)2)3'], ['OKMg'], ['B2H6']];
    for (var k = 0; k < 36; k++) {
      var f = genFormula(2), tries = 0;
      while (f.length > 16 && tries < 6) { f = genFormula(2); tries++; }
      if (f.length > 16 || f.length === 0) f = ATOM_ELEMENTS[randInt(0, ATOM_ELEMENTS.length - 1)];
      o.push([f]);
    }
    return o;
  },
  ref: function (a) { return atomsRef(a[0]); }
});

module.exports = { MORE27 };
