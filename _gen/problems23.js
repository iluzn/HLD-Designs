// Batch 23: STRINGS & string two-pointers — reversals, parsing, palindrome
// checks, stack-based string simulation, and digit-string arithmetic.
// Types restricted to the verified-safe line-based string I/O:
// STR_STR, STR_BOOL, STR_STR_BOOL, STR_STR_STR, STR_INT, STR_STR_INT.
const { T, randInt, ln } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}
function rs(len, lo, hi) { var s = ''; for (var i = 0; i < len; i++) s += String.fromCharCode(97 + randInt(lo, hi)); return s; }
function genBalanced(pairs) { var open = pairs, close = pairs, s = ''; while (open > 0 || close > open) { if (open > 0 && (close === open || Math.random() < 0.5)) { s += '('; open--; } else { s += ')'; close--; } } return s; }
function genEnc(depth) { var n = randInt(1, 3), s = ''; for (var i = 0; i < n; i++) { if (depth > 0 && Math.random() < 0.4) { var k = randInt(1, 3); s += k + '[' + genEnc(depth - 1) + ']'; } else s += String.fromCharCode(97 + randInt(0, 4)); } return s; }

const MORE23 = [];

// ---- Reverse String ----
MORE23.push({ slug: 'reverse-string', title: 'Reverse String', difficulty: 'easy', topics: ['String', 'Two Pointers'], type: 'STR_STR', langsrc: T.STR_STR('reverseString'),
  desc: '<p>Given a string <code>s</code>, return the string reversed.</p>',
  examples: [{ in: 's = "hello"', out: '"olleh"' }, { in: 's = "abcd"', out: '"dcba"' }],
  constraints: ['1 &lt;= s.length &lt;= 10^5', 's consists of printable ASCII letters.'],
  editorial: ed('Two pointers / reverse', 'def reverseString(s):\n    return s[::-1]', 'O(n)', 'O(n)'),
  gen: function () { var o = [['hello'], ['abcd'], ['a']]; for (var k = 0; k < 38; k++) o.push([rs(randInt(1, 12), 0, 25)]); return o; },
  ref: function (a) { return a[0].split('').reverse().join(''); } });

// ---- Reverse Vowels of a String ----
MORE23.push({ slug: 'reverse-vowels-of-a-string', title: 'Reverse Vowels of a String', difficulty: 'easy', topics: ['String', 'Two Pointers'], type: 'STR_STR', langsrc: T.STR_STR('reverseVowels'),
  desc: '<p>Given a string <code>s</code>, reverse only the vowels (<code>a e i o u</code>, both cases) and return the result.</p>',
  examples: [{ in: 's = "hello"', out: '"holle"' }, { in: 's = "leetcode"', out: '"leotcede"' }],
  constraints: ['1 &lt;= s.length &lt;= 3*10^5'],
  editorial: ed('Two pointers', 'def reverseVowels(s):\n    v = set("aeiouAEIOU")\n    a = list(s); l, r = 0, len(a)-1\n    while l < r:\n        if a[l] not in v: l += 1\n        elif a[r] not in v: r -= 1\n        else: a[l], a[r] = a[r], a[l]; l += 1; r -= 1\n    return "".join(a)', 'O(n)', 'O(n)'),
  gen: function () { var o = [['hello'], ['leetcode'], ['aA']]; for (var k = 0; k < 38; k++) o.push([rs(randInt(1, 12), 0, 25)]); return o; },
  ref: function (a) { var v = 'aeiouAEIOU', arr = a[0].split(''), l = 0, r = arr.length - 1; while (l < r) { if (v.indexOf(arr[l]) < 0) l++; else if (v.indexOf(arr[r]) < 0) r--; else { var t = arr[l]; arr[l] = arr[r]; arr[r] = t; l++; r--; } } return arr.join(''); } });

// ---- Reverse Words in a String ----
MORE23.push({ slug: 'reverse-words-in-a-string', title: 'Reverse Words in a String', difficulty: 'medium', topics: ['String', 'Two Pointers'], type: 'STR_STR', langsrc: T.STR_STR('reverseWords'),
  desc: '<p>Given an input string <code>s</code>, reverse the order of the words. Words are separated by one or more spaces; the result must have single spaces between words and no leading or trailing spaces.</p>',
  examples: [{ in: 's = "the sky is blue"', out: '"blue is sky the"' }, { in: 's = "  hello world  "', out: '"world hello"' }],
  constraints: ['1 &lt;= s.length &lt;= 10^4'],
  editorial: ed('Split and reverse', 'def reverseWords(s):\n    return " ".join(reversed(s.split()))', 'O(n)', 'O(n)'),
  gen: function () { var o = [['the sky is blue'], ['  hello world  '], ['a']]; for (var k = 0; k < 38; k++) { var w = randInt(1, 5), parts = []; for (var i = 0; i < w; i++) { parts.push(rs(randInt(1, 5), 0, 12)); if (Math.random() < 0.3) parts.push(''); } var pre = Math.random() < 0.3 ? ' ' : ''; o.push([pre + parts.join(' ')]); } return o; },
  ref: function (a) { return a[0].split(/\s+/).filter(function (x) { return x.length; }).reverse().join(' '); } });

// ---- Reverse Words in a String III ----
MORE23.push({ slug: 'reverse-words-in-a-string-iii', title: 'Reverse Words in a String III', difficulty: 'easy', topics: ['String', 'Two Pointers'], type: 'STR_STR', langsrc: T.STR_STR('reverseWords'),
  desc: '<p>Given a string <code>s</code> of words separated by single spaces, reverse the characters of each word while preserving word order and spacing.</p>',
  examples: [{ in: 's = "Lets code"', out: '"steL edoc"' }, { in: 's = "God Ding"', out: '"doG gniD"' }],
  constraints: ['1 &lt;= s.length &lt;= 5*10^4', 'Words are separated by single spaces with no leading/trailing spaces.'],
  editorial: ed('Reverse each token', 'def reverseWords(s):\n    return " ".join(w[::-1] for w in s.split(" "))', 'O(n)', 'O(n)'),
  gen: function () { var o = [['Lets code'], ['God Ding'], ['abc']]; for (var k = 0; k < 38; k++) { var w = randInt(1, 5), parts = []; for (var i = 0; i < w; i++) parts.push(rs(randInt(1, 6), 0, 12)); o.push([parts.join(' ')]); } return o; },
  ref: function (a) { return a[0].split(' ').map(function (w) { return w.split('').reverse().join(''); }).join(' '); } });

// ---- Valid Palindrome II ----
MORE23.push({ slug: 'valid-palindrome-ii', title: 'Valid Palindrome II', difficulty: 'easy', topics: ['String', 'Two Pointers', 'Greedy'], type: 'STR_BOOL', langsrc: T.STR_BOOL('validPalindrome'),
  desc: '<p>Given a string <code>s</code>, return <code>true</code> if it can be a palindrome after deleting at most one character.</p>',
  examples: [{ in: 's = "aba"', out: 'true' }, { in: 's = "abca"', out: 'true' }, { in: 's = "abc"', out: 'false' }],
  constraints: ['1 &lt;= s.length &lt;= 10^5', 's consists of lowercase English letters.'],
  editorial: ed('Two pointers with one skip', 'def validPalindrome(s):\n    def isPal(i, j):\n        while i < j:\n            if s[i] != s[j]: return False\n            i += 1; j -= 1\n        return True\n    i, j = 0, len(s)-1\n    while i < j:\n        if s[i] != s[j]:\n            return isPal(i+1, j) or isPal(i, j-1)\n        i += 1; j -= 1\n    return True', 'O(n)', 'O(1)'),
  gen: function () { var o = [['aba'], ['abca'], ['abc'], ['a']]; for (var k = 0; k < 38; k++) o.push([rs(randInt(1, 9), 0, 3)]); return o; },
  ref: function (a) { var s = a[0]; function pal(i, j) { while (i < j) { if (s[i] !== s[j]) return false; i++; j--; } return true; } var i = 0, j = s.length - 1; while (i < j) { if (s[i] !== s[j]) return pal(i + 1, j) || pal(i, j - 1); i++; j--; } return true; } });

// ---- Backspace String Compare ----
MORE23.push({ slug: 'backspace-string-compare', title: 'Backspace String Compare', difficulty: 'easy', topics: ['String', 'Stack', 'Two Pointers'], type: 'STR_STR_BOOL', langsrc: T.STR_STR_BOOL('backspaceCompare'),
  desc: '<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if they are equal after typing them into empty text editors. <code>#</code> is a backspace character.</p>',
  examples: [{ in: 's = "ab#c", t = "ad#c"', out: 'true' }, { in: 's = "a##c", t = "#a#c"', out: 'true' }, { in: 's = "a#c", t = "b"', out: 'false' }],
  constraints: ['1 &lt;= s.length, t.length &lt;= 200', 's and t contain lowercase letters and #.'],
  editorial: ed('Build with stack', 'def backspaceCompare(s, t):\n    def build(x):\n        st = []\n        for c in x:\n            if c == "#":\n                if st: st.pop()\n            else: st.append(c)\n        return "".join(st)\n    return build(s) == build(t)', 'O(n)', 'O(n)'),
  gen: function () { var o = [['ab#c', 'ad#c'], ['a##c', '#a#c'], ['a#c', 'b']]; for (var k = 0; k < 38; k++) { function mk() { var n = randInt(1, 7), s = ''; for (var i = 0; i < n; i++) s += Math.random() < 0.3 ? '#' : String.fromCharCode(97 + randInt(0, 3)); return s; } o.push([mk(), mk()]); } return o; },
  ref: function (a) { function build(x) { var st = []; for (var i = 0; i < x.length; i++) { if (x[i] === '#') { if (st.length) st.pop(); } else st.push(x[i]); } return st.join(''); } return build(a[0]) === build(a[1]); } });

// ---- Remove All Adjacent Duplicates In String ----
MORE23.push({ slug: 'remove-all-adjacent-duplicates-in-string', title: 'Remove All Adjacent Duplicates In String', difficulty: 'easy', topics: ['String', 'Stack'], type: 'STR_STR', langsrc: T.STR_STR('removeDuplicates'),
  desc: '<p>Given a string <code>s</code>, repeatedly remove two adjacent equal letters until no more can be removed. Return the final string.</p>',
  examples: [{ in: 's = "abbaca"', out: '"ca"' }, { in: 's = "azxxzy"', out: '"ay"' }],
  constraints: ['1 &lt;= s.length &lt;= 10^5', 's consists of lowercase English letters.'],
  editorial: ed('Stack', 'def removeDuplicates(s):\n    st = []\n    for c in s:\n        if st and st[-1] == c: st.pop()\n        else: st.append(c)\n    return "".join(st)', 'O(n)', 'O(n)'),
  gen: function () { var o = [['abbaca'], ['azxxzy'], ['aa']]; for (var k = 0; k < 38; k++) o.push([rs(randInt(1, 12), 0, 3)]); return o; },
  ref: function (a) { var st = []; for (var i = 0; i < a[0].length; i++) { if (st.length && st[st.length - 1] === a[0][i]) st.pop(); else st.push(a[0][i]); } return st.join(''); } });

// ---- Add Strings ----
MORE23.push({ slug: 'add-strings', title: 'Add Strings', difficulty: 'easy', topics: ['Math', 'String', 'Simulation'], type: 'STR_STR_STR', langsrc: T.STR_STR_STR('addStrings'),
  desc: '<p>Given two non-negative integers <code>num1</code> and <code>num2</code> represented as strings, return their sum as a string. You must not convert the inputs to integers directly or use a big-integer library.</p>',
  examples: [{ in: 'num1 = "11", num2 = "123"', out: '"134"' }, { in: 'num1 = "456", num2 = "77"', out: '"533"' }, { in: 'num1 = "0", num2 = "0"', out: '"0"' }],
  constraints: ['1 &lt;= num1.length, num2.length &lt;= 10^4', 'num1 and num2 consist of only digits.', 'num1 and num2 do not contain any leading zero except the number 0 itself.'],
  editorial: ed('Digit-by-digit from the right', 'def addStrings(num1, num2):\n    i, j, carry = len(num1)-1, len(num2)-1, 0\n    res = []\n    while i >= 0 or j >= 0 or carry:\n        d = carry\n        if i >= 0: d += ord(num1[i]) - 48; i -= 1\n        if j >= 0: d += ord(num2[j]) - 48; j -= 1\n        res.append(chr(d % 10 + 48)); carry = d // 10\n    return "".join(reversed(res))', 'O(max(n,m))', 'O(max(n,m))'),
  gen: function () { function num(len) { var s = '' + randInt(1, 9); for (var i = 1; i < len; i++) s += randInt(0, 9); return s; } var o = [['11', '123'], ['456', '77'], ['0', '0'], ['1', '9']]; for (var k = 0; k < 38; k++) { var a = Math.random() < 0.1 ? '0' : num(randInt(1, 8)); var b = Math.random() < 0.1 ? '0' : num(randInt(1, 8)); o.push([a, b]); } return o; },
  ref: function (a) { return (BigInt(a[0]) + BigInt(a[1])).toString(); } });

// ---- Make The String Great ----
MORE23.push({ slug: 'make-the-string-great', title: 'Make The String Great', difficulty: 'easy', topics: ['String', 'Stack'], type: 'STR_STR', langsrc: T.STR_STR('makeGood'),
  desc: '<p>A good string has no two adjacent characters where one is the lowercase and the other the uppercase of the same letter. Repeatedly remove such pairs from <code>s</code> and return the result.</p>',
  examples: [{ in: 's = "leEeetcode"', out: '"leetcode"' }, { in: 's = "abBAcC"', out: '""' }],
  constraints: ['1 &lt;= s.length &lt;= 100', 's contains upper and lower case English letters.'],
  editorial: ed('Stack', 'def makeGood(s):\n    st = []\n    for c in s:\n        if st and st[-1] != c and st[-1].lower() == c.lower(): st.pop()\n        else: st.append(c)\n    return "".join(st)', 'O(n)', 'O(n)'),
  gen: function () { var o = [['leEeetcode'], ['abBAcC'], ['s']]; for (var k = 0; k < 38; k++) { var n = randInt(1, 10), s = ''; for (var i = 0; i < n; i++) { var c = randInt(0, 3); s += Math.random() < 0.5 ? String.fromCharCode(97 + c) : String.fromCharCode(65 + c); } o.push([s]); } return o; },
  ref: function (a) { var st = []; for (var i = 0; i < a[0].length; i++) { var c = a[0][i]; if (st.length && st[st.length - 1] !== c && st[st.length - 1].toLowerCase() === c.toLowerCase()) st.pop(); else st.push(c); } return st.join(''); } });

// ---- Removing Stars From a String ----
MORE23.push({ slug: 'removing-stars-from-a-string', title: 'Removing Stars From a String', difficulty: 'medium', topics: ['String', 'Stack'], type: 'STR_STR', langsrc: T.STR_STR('removeStars'),
  desc: '<p>Given a string <code>s</code> with letters and <code>*</code>. Each <code>*</code> removes the closest non-star character to its left (and itself). Return the resulting string.</p>',
  examples: [{ in: 's = "leet**cod*e"', out: '"lecoe"' }, { in: 's = "erase*****"', out: '""' }],
  constraints: ['1 &lt;= s.length &lt;= 10^5', 'The operation is always possible.'],
  editorial: ed('Stack', 'def removeStars(s):\n    st = []\n    for c in s:\n        if c == "*": st.pop()\n        else: st.append(c)\n    return "".join(st)', 'O(n)', 'O(n)'),
  gen: function () { var o = [['leet**cod*e'], ['erase*****']]; for (var k = 0; k < 38; k++) { var s = '', depth = 0; var n = randInt(1, 12); for (var i = 0; i < n; i++) { if (depth > 0 && Math.random() < 0.35) { s += '*'; depth--; } else { s += String.fromCharCode(97 + randInt(0, 4)); depth++; } } o.push([s]); } return o; },
  ref: function (a) { var st = []; for (var i = 0; i < a[0].length; i++) { if (a[0][i] === '*') st.pop(); else st.push(a[0][i]); } return st.join(''); } });

// ---- Simplify Path ----
MORE23.push({ slug: 'simplify-path', title: 'Simplify Path', difficulty: 'medium', topics: ['String', 'Stack'], type: 'STR_STR', langsrc: T.STR_STR('simplifyPath'),
  desc: '<p>Given an absolute Unix-style path <code>path</code>, return its simplified canonical path. Handle <code>.</code> (current), <code>..</code> (parent), and redundant slashes.</p>',
  examples: [{ in: 'path = "/home/"', out: '"/home"' }, { in: 'path = "/../"', out: '"/"' }, { in: 'path = "/a/./b/../../c/"', out: '"/c"' }],
  constraints: ['1 &lt;= path.length &lt;= 3000', 'path begins with a single slash.'],
  editorial: ed('Stack of segments', 'def simplifyPath(path):\n    st = []\n    for part in path.split("/"):\n        if part == "" or part == ".": continue\n        if part == "..":\n            if st: st.pop()\n        else: st.append(part)\n    return "/" + "/".join(st)', 'O(n)', 'O(n)'),
  gen: function () { var o = [['/home/'], ['/../'], ['/a/./b/../../c/'], ['/']]; var segs = ['a', 'b', 'c', '.', '..', '']; for (var k = 0; k < 38; k++) { var n = randInt(1, 6), p = ''; for (var i = 0; i < n; i++) p += '/' + segs[randInt(0, segs.length - 1)]; if (!p) p = '/'; o.push([p]); } return o; },
  ref: function (a) { var st = []; a[0].split('/').forEach(function (part) { if (part === '' || part === '.') return; if (part === '..') { if (st.length) st.pop(); } else st.push(part); }); return '/' + st.join('/'); } });

// ---- Decode String ----
MORE23.push({ slug: 'decode-string', title: 'Decode String', difficulty: 'medium', topics: ['String', 'Stack'], type: 'STR_STR', langsrc: T.STR_STR('decodeString'),
  desc: '<p>Given an encoded string <code>s</code> following the rule <code>k[encoded]</code> meaning the bracketed part repeats k times, return the decoded string.</p>',
  examples: [{ in: 's = "3[a]2[bc]"', out: '"aaabcbc"' }, { in: 's = "3[a2[c]]"', out: '"accaccacc"' }],
  constraints: ['1 &lt;= s.length &lt;= 30', 'Digits are only for repeat counts.'],
  editorial: ed('Stack of counts and strings', 'def decodeString(s):\n    st = []; cur = ""; num = 0\n    for c in s:\n        if c.isdigit(): num = num*10 + int(c)\n        elif c == "[": st.append((cur, num)); cur = ""; num = 0\n        elif c == "]":\n            prev, k = st.pop(); cur = prev + cur*k\n        else: cur += c\n    return cur', 'O(output)', 'O(output)'),
  gen: function () { var o = [['3[a]2[bc]'], ['3[a2[c]]'], ['abc']]; for (var k = 0; k < 38; k++) o.push([genEnc(2)]); return o; },
  ref: function (a) { var st = [], cur = '', num = 0, s = a[0]; for (var i = 0; i < s.length; i++) { var c = s[i]; if (c >= '0' && c <= '9') num = num * 10 + (+c); else if (c === '[') { st.push([cur, num]); cur = ''; num = 0; } else if (c === ']') { var p = st.pop(); cur = p[0] + cur.repeat(p[1]); } else cur += c; } return cur; } });

// ---- Minimum Add to Make Parentheses Valid ----
MORE23.push({ slug: 'minimum-add-to-make-parentheses-valid', title: 'Minimum Add to Make Parentheses Valid', difficulty: 'medium', topics: ['String', 'Stack', 'Greedy'], type: 'STR_INT', langsrc: T.STR_INT('minAddToMakeValid'),
  desc: '<p>Given a parentheses string <code>s</code>, return the minimum number of <code>(</code> or <code>)</code> insertions needed to make it valid.</p>',
  examples: [{ in: 's = "())"', out: '1' }, { in: 's = "((("', out: '3' }, { in: 's = "()"', out: '0' }],
  constraints: ['1 &lt;= s.length &lt;= 1000', 's consists of ( and ) only.'],
  editorial: ed('Track open and needed', 'def minAddToMakeValid(s):\n    open_ = add = 0\n    for c in s:\n        if c == "(": open_ += 1\n        elif open_ > 0: open_ -= 1\n        else: add += 1\n    return add + open_', 'O(n)', 'O(1)'),
  gen: function () { var o = [['())'], ['((('], ['()']]; for (var k = 0; k < 38; k++) { var n = randInt(1, 10), s = ''; for (var i = 0; i < n; i++) s += Math.random() < 0.5 ? '(' : ')'; o.push([s]); } return o; },
  ref: function (a) { var open = 0, add = 0; for (var i = 0; i < a[0].length; i++) { if (a[0][i] === '(') open++; else if (open > 0) open--; else add++; } return add + open; } });

// ---- Score of Parentheses ----
MORE23.push({ slug: 'score-of-parentheses', title: 'Score of Parentheses', difficulty: 'medium', topics: ['String', 'Stack'], type: 'STR_INT', langsrc: T.STR_INT('scoreOfParentheses'),
  desc: '<p>Given a balanced parentheses string <code>s</code>, compute its score: <code>()</code> is 1, <code>AB</code> is A+B, and <code>(A)</code> is 2*A.</p>',
  examples: [{ in: 's = "()"', out: '1' }, { in: 's = "(())"', out: '2' }, { in: 's = "()()"', out: '2' }, { in: 's = "(()(()))"', out: '6' }],
  constraints: ['2 &lt;= s.length &lt;= 50', 's is a balanced parentheses string.'],
  editorial: ed('Stack of running scores', 'def scoreOfParentheses(s):\n    st = [0]\n    for c in s:\n        if c == "(": st.append(0)\n        else:\n            v = st.pop()\n            st[-1] += max(2*v, 1)\n    return st[0]', 'O(n)', 'O(n)'),
  gen: function () { var o = [['()'], ['(())'], ['()()'], ['(()(()))']]; for (var k = 0; k < 38; k++) o.push([genBalanced(randInt(1, 5))]); return o; },
  ref: function (a) { var st = [0]; for (var i = 0; i < a[0].length; i++) { if (a[0][i] === '(') st.push(0); else { var v = st.pop(); st[st.length - 1] += Math.max(2 * v, 1); } } return st[0]; } });

// ---- Baseball Game ----
MORE23.push({ slug: 'baseball-game', title: 'Baseball Game', difficulty: 'easy', topics: ['Stack', 'Simulation'], type: 'STR_INT', langsrc: T.STR_INT('calPoints'),
  desc: '<p>You are given operations as a space-separated string <code>s</code>. Each token is an integer (record it), <code>"+"</code> (sum of last two), <code>"D"</code> (double last), or <code>"C"</code> (invalidate last). Return the total sum of the record.</p>',
  examples: [{ in: 's = "5 2 C D +"', out: '30' }, { in: 's = "5 -2 4 C D 9 + +"', out: '27' }],
  constraints: ['1 &lt;= number of operations &lt;= 1000', 'Operations are valid when applied.'],
  editorial: ed('Stack simulation', 'def calPoints(s):\n    st = []\n    for tok in s.split():\n        if tok == "C": st.pop()\n        elif tok == "D": st.append(2*st[-1])\n        elif tok == "+": st.append(st[-1]+st[-2])\n        else: st.append(int(tok))\n    return sum(st)', 'O(n)', 'O(n)'),
  gen: function () { var o = [['5 2 C D +'], ['5 -2 4 C D 9 + +']]; for (var k = 0; k < 38; k++) { var st = [], toks = [], n = randInt(1, 10); for (var i = 0; i < n; i++) { var r = Math.random(); if (st.length >= 2 && r < 0.2) { toks.push('+'); st.push(st[st.length - 1] + st[st.length - 2]); } else if (st.length >= 1 && r < 0.4) { toks.push('D'); st.push(2 * st[st.length - 1]); } else if (st.length >= 1 && r < 0.55) { toks.push('C'); st.pop(); } else { var v = randInt(-5, 9); toks.push('' + v); st.push(v); } } if (!toks.length) toks.push('1'); o.push([toks.join(' ')]); } return o; },
  ref: function (a) { var st = []; a[0].split(/\s+/).filter(function (x) { return x.length; }).forEach(function (tok) { if (tok === 'C') st.pop(); else if (tok === 'D') st.push(2 * st[st.length - 1]); else if (tok === '+') st.push(st[st.length - 1] + st[st.length - 2]); else st.push(parseInt(tok, 10)); }); return st.reduce(function (a, b) { return a + b; }, 0); } });

// ---- Find the Index of the First Occurrence in a String ----
MORE23.push({ slug: 'find-the-index-of-the-first-occurrence-in-a-string', title: 'Find the Index of the First Occurrence in a String', difficulty: 'easy', topics: ['String', 'Two Pointers'], type: 'STR_STR_INT', langsrc: T.STR_STR_INT('strStr'),
  desc: '<p>Given two strings <code>s</code> (haystack) and <code>t</code> (needle), return the index of the first occurrence of <code>t</code> in <code>s</code>, or <code>-1</code> if not present.</p>',
  examples: [{ in: 's = "sadbutsad", t = "sad"', out: '0' }, { in: 's = "leetcode", t = "leeto"', out: '-1' }],
  constraints: ['1 &lt;= s.length, t.length &lt;= 10^4', 'Both consist of lowercase English letters.'],
  editorial: ed('Scan', 'def strStr(s, t):\n    n, m = len(s), len(t)\n    for i in range(n - m + 1):\n        if s[i:i+m] == t: return i\n    return -1', 'O(n*m)', 'O(1)'),
  gen: function () { var o = [['sadbutsad', 'sad'], ['leetcode', 'leeto'], ['a', 'a']]; for (var k = 0; k < 38; k++) { var s = rs(randInt(1, 12), 0, 3); var t; if (Math.random() < 0.6 && s.length > 0) { var i = randInt(0, s.length - 1), j = randInt(i, s.length - 1); t = s.slice(i, j + 1); } else t = rs(randInt(1, 4), 0, 3); o.push([s, t]); } return o; },
  ref: function (a) { return a[0].indexOf(a[1]); } });

// ---- Repeated Substring Pattern ----
MORE23.push({ slug: 'repeated-substring-pattern', title: 'Repeated Substring Pattern', difficulty: 'easy', topics: ['String', 'String Matching'], type: 'STR_BOOL', langsrc: T.STR_BOOL('repeatedSubstringPattern'),
  desc: '<p>Given a string <code>s</code>, return <code>true</code> if it can be built by repeating a substring of it multiple times.</p>',
  examples: [{ in: 's = "abab"', out: 'true' }, { in: 's = "aba"', out: 'false' }, { in: 's = "abcabcabc"', out: 'true' }],
  constraints: ['1 &lt;= s.length &lt;= 10^4', 's consists of lowercase English letters.'],
  editorial: ed('Doubling trick', 'def repeatedSubstringPattern(s):\n    return s in (s + s)[1:-1]', 'O(n)', 'O(n)'),
  gen: function () { var o = [['abab'], ['aba'], ['abcabcabc'], ['a']]; for (var k = 0; k < 38; k++) { if (Math.random() < 0.5) { var unit = rs(randInt(1, 3), 0, 2), reps = randInt(2, 4); o.push([unit.repeat(reps)]); } else o.push([rs(randInt(1, 8), 0, 2)]); } return o; },
  ref: function (a) { var s = a[0]; return (s + s).slice(1, -1).indexOf(s) !== -1; } });

// ---- Detect Capital ----
MORE23.push({ slug: 'detect-capital', title: 'Detect Capital', difficulty: 'easy', topics: ['String'], type: 'STR_BOOL', langsrc: T.STR_BOOL('detectCapitalUse'),
  desc: '<p>Given a word <code>s</code>, return <code>true</code> if its capital usage is correct: all uppercase, all lowercase, or only the first letter uppercase.</p>',
  examples: [{ in: 's = "USA"', out: 'true' }, { in: 's = "FlaG"', out: 'false' }, { in: 's = "Google"', out: 'true' }],
  constraints: ['1 &lt;= s.length &lt;= 100', 's consists of upper and lowercase English letters.'],
  editorial: ed('Three cases', 'def detectCapitalUse(s):\n    return s.isupper() or s.islower() or (s[0].isupper() and s[1:].islower())', 'O(n)', 'O(1)'),
  gen: function () { var o = [['USA'], ['FlaG'], ['Google'], ['a']]; for (var k = 0; k < 38; k++) { var n = randInt(1, 8), s = ''; for (var i = 0; i < n; i++) { var c = randInt(0, 5); s += Math.random() < 0.5 ? String.fromCharCode(65 + c) : String.fromCharCode(97 + c); } o.push([s]); } return o; },
  ref: function (a) { var s = a[0]; var allUp = s === s.toUpperCase(), allLow = s === s.toLowerCase(); var title = s[0] === s[0].toUpperCase() && s.slice(1) === s.slice(1).toLowerCase(); return allUp || allLow || title; } });

module.exports = { MORE23 };
