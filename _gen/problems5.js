// Batch A: multi-argument scalar / array / string problems.
const { T, randInt, randArr, arrStr, ln } = require('./gen.js');

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function ED(o) {
  var h = '';
  if (o.intuition) h += '<h3>Intuition</h3>' + (Array.isArray(o.intuition) ? o.intuition.map(function (p) { return '<p>' + p + '</p>'; }).join('') : '<p>' + o.intuition + '</p>');
  if (o.approach) h += '<h3>Approach</h3><ol>' + o.approach.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>';
  if (o.code) h += '<h3>Solution</h3><pre><code>' + esc(o.code) + '</code></pre>';
  h += '<h3>Complexity</h3><ul><li><b>Time — ' + o.time + ':</b> ' + o.timeWhy + '</li><li><b>Space — ' + o.space + ':</b> ' + o.spaceWhy + '</li></ul>';
  if (o.pitfalls) h += '<h3>Common Pitfalls</h3><ul>' + o.pitfalls.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>';
  return h;
}
function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = randInt(0, i); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function randWord(minL, maxL, alpha) { var L = randInt(minL, maxL), s = ''; for (var i = 0; i < L; i++) s += alpha[randInt(0, alpha.length - 1)]; return s; }

const MORE5 = [];

// ---- Counting Bits (INT_ARR) ----
MORE5.push({ slug: 'counting-bits', title: 'Counting Bits', difficulty: 'easy', topics: ['Dynamic Programming', 'Bit Manipulation'], type: 'INT_ARR', langsrc: T.INT_ARR('countBits'),
  desc: '<p>Given an integer <code>n</code>, return an array <code>ans</code> of length <code>n + 1</code> where <code>ans[i]</code> is the number of <code>1</code>-bits in the binary representation of <code>i</code>.</p>',
  examples: [{ in: 'n = 2', out: '[0,1,1]' }, { in: 'n = 5', out: '[0,1,1,2,1,2]' }],
  constraints: ['0 &lt;= n &lt;= 10^5'],
  editorial: ED({ intuition: 'Every number <code>i</code> is some smaller number <code>i &gt;&gt; 1</code> with one extra bit shifted in. So <code>bits(i) = bits(i/2) + (i &amp; 1)</code> — the low bit tells you whether the shift dropped a 1.', approach: ['Allocate <code>ans</code> of size n+1 with ans[0]=0.', 'For each i from 1 to n set <code>ans[i] = ans[i &gt;&gt; 1] + (i &amp; 1)</code>.'], code: 'def countBits(self, n):\n    ans = [0] * (n + 1)\n    for i in range(1, n + 1):\n        ans[i] = ans[i >> 1] + (i & 1)\n    return ans', time: 'O(n)', timeWhy: 'one pass filling the table, each entry O(1).', space: 'O(n)', spaceWhy: 'the output array (aside from output, O(1)).' }),
  gen: function () { var o = [[0], [1], [2], [5]]; for (var k = 0; k <= 33; k++) o.push([k]); return o; },
  ref: function (a) { var n = a[0], ans = [0]; for (var i = 1; i <= n; i++) ans.push(ans[i >> 1] + (i & 1)); return ans; } });

// ---- Sum of Two Integers (INT_INT_INT) ----
MORE5.push({ slug: 'sum-of-two-integers', title: 'Sum of Two Integers', difficulty: 'medium', topics: ['Math', 'Bit Manipulation'], type: 'INT_INT_INT', langsrc: T.INT_INT_INT('getSum'),
  desc: '<p>Given two integers <code>a</code> and <code>b</code>, return their sum <strong>without</strong> using the operators <code>+</code> or <code>-</code>.</p>',
  examples: [{ in: 'a = 1, b = 2', out: '3' }, { in: 'a = 2, b = 3', out: '5' }],
  constraints: ['-1000 &lt;= a, b &lt;= 1000'],
  editorial: ED({ intuition: 'Binary addition splits into two pieces: <code>a ^ b</code> adds bit-by-bit ignoring carries, and <code>(a &amp; b) &lt;&lt; 1</code> is exactly the carry. Repeat until there is no carry left.', approach: ['Let <code>sum = a ^ b</code> (addition without carry).', 'Let <code>carry = (a &amp; b) &lt;&lt; 1</code>.', 'Set a = sum, b = carry, and loop until carry is 0.'], code: 'def getSum(self, a, b):\n    mask = 0xFFFFFFFF\n    while b & mask:\n        a, b = a ^ b, (a & b) << 1\n    return a & mask if b > mask else a', time: 'O(1)', timeWhy: 'at most 32 carry-propagation iterations for fixed-width integers.', space: 'O(1)', spaceWhy: 'a constant number of variables.', pitfalls: ['In languages without wraparound (Python), mask to 32 bits and re-interpret the sign.'] }),
  gen: function () { var o = [[1, 2], [2, 3], [-1, 1], [0, 0], [-5, -7], [1000, -1000]]; for (var k = 0; k < 40; k++) o.push([randInt(-1000, 1000), randInt(-1000, 1000)]); return o; },
  ref: function (a) { return a[0] + a[1]; } });

// ---- Unique Paths (INT_INT_INT) ----
MORE5.push({ slug: 'unique-paths', title: 'Unique Paths', difficulty: 'medium', topics: ['Math', 'Dynamic Programming', 'Combinatorics'], type: 'INT_INT_INT', langsrc: T.INT_INT_INT('uniquePaths'),
  desc: '<p>A robot sits at the top-left of an <code>m x n</code> grid and can only move <strong>right</strong> or <strong>down</strong>. Return the number of distinct paths to the bottom-right corner.</p>',
  examples: [{ in: 'm = 3, n = 7', out: '28' }, { in: 'm = 3, n = 2', out: '3' }],
  constraints: ['1 &lt;= m, n &lt;= 100'],
  editorial: ED({ intuition: 'The number of ways to reach a cell is the ways to reach the cell above plus the cell to its left, because those are the only two moves. The whole top row and left column have exactly one path.', approach: ['Use a 1-D array <code>row</code> of length n filled with 1.', 'For each subsequent row, update <code>row[j] += row[j-1]</code> left to right.', 'The last entry is the answer.'], code: 'def uniquePaths(self, m, n):\n    row = [1] * n\n    for _ in range(1, m):\n        for j in range(1, n):\n            row[j] += row[j - 1]\n    return row[-1]', time: 'O(m*n)', timeWhy: 'fill every cell once.', space: 'O(n)', spaceWhy: 'a single rolling row instead of the full grid.' }),
  gen: function () { var o = [[3, 7], [3, 2], [1, 1], [3, 3], [1, 10]]; for (var k = 0; k < 40; k++) o.push([randInt(1, 9), randInt(1, 9)]); return o; },
  ref: function (a) { var m = a[0], n = a[1], row = new Array(n).fill(1); for (var i = 1; i < m; i++) for (var j = 1; j < n; j++) row[j] += row[j - 1]; return row[n - 1]; } });

// ---- Longest Repeating Character Replacement (STR_INT_INT) ----
MORE5.push({ slug: 'longest-repeating-character-replacement', title: 'Longest Repeating Character Replacement', difficulty: 'medium', topics: ['String', 'Sliding Window', 'Hash Table'], type: 'STR_INT_INT', langsrc: T.STR_INT_INT('characterReplacement'),
  desc: '<p>Given a string <code>s</code> of uppercase English letters and an integer <code>k</code>, you may replace at most <code>k</code> characters with any uppercase letter. Return the length of the longest substring containing a single repeated letter you can obtain.</p>',
  examples: [{ in: 's = "ABAB", k = 2', out: '4' }, { in: 's = "AABABBA", k = 1', out: '4' }],
  constraints: ['1 &lt;= s.length &lt;= 10^5', 's consists of uppercase English letters.', '0 &lt;= k &lt;= s.length'],
  editorial: ED({ intuition: 'A window is valid if we can turn it into all-same by changing at most k characters, i.e. <code>windowLen - countOfMostFrequentLetter &lt;= k</code>. Grow the window; when it becomes invalid, slide the left edge.', approach: ['Track a frequency map over the current window and the max frequency seen.', 'Expand right; if <code>(right-left+1) - maxFreq &gt; k</code>, shrink from the left.', 'The answer is the largest valid window length.'], code: 'def characterReplacement(self, s, k):\n    count = {}\n    left = maxf = res = 0\n    for right in range(len(s)):\n        count[s[right]] = count.get(s[right], 0) + 1\n        maxf = max(maxf, count[s[right]])\n        while (right - left + 1) - maxf > k:\n            count[s[left]] -= 1\n            left += 1\n        res = max(res, right - left + 1)\n    return res', time: 'O(n)', timeWhy: 'each index enters and leaves the window at most once.', space: 'O(1)', spaceWhy: 'the frequency map holds at most 26 letters.', pitfalls: ['You do not need to shrink maxFreq back down — leaving it stale never overestimates the answer.'] }),
  gen: function () { var al = 'ABCD'; var o = [['ABAB', 2], ['AABABBA', 1], ['A', 0], ['AAAA', 2]]; for (var k = 0; k < 40; k++) { var s = randWord(1, 10, al); o.push([s, randInt(0, 4)]); } return o; },
  ref: function (a) { var s = a[0], k = a[1], count = {}, left = 0, maxf = 0, res = 0; for (var right = 0; right < s.length; right++) { var c = s[right]; count[c] = (count[c] || 0) + 1; maxf = Math.max(maxf, count[c]); while ((right - left + 1) - maxf > k) { count[s[left]]--; left++; } res = Math.max(res, right - left + 1); } return res; } });

// ---- Multiply Strings (STR_STR_STR) ----
MORE5.push({ slug: 'multiply-strings', title: 'Multiply Strings', difficulty: 'medium', topics: ['String', 'Math', 'Simulation'], type: 'STR_STR_STR', langsrc: T.STR_STR_STR('multiply'),
  desc: '<p>Given two non-negative integers <code>num1</code> and <code>num2</code> represented as strings, return the product, also as a string. Do not use any built-in big-integer library or convert the inputs directly to an integer.</p>',
  examples: [{ in: 'num1 = "2", num2 = "3"', out: '"6"' }, { in: 'num1 = "123", num2 = "456"', out: '"56088"' }],
  constraints: ['1 &lt;= num1.length, num2.length &lt;= 200', 'The numbers contain only digits and have no leading zero (except "0").'],
  editorial: ED({ intuition: 'Grade-school multiplication: digit <code>i</code> of num1 times digit <code>j</code> of num2 contributes to position <code>i + j</code> (and a carry into <code>i + j - 1</code>) of the result, counting from the right.', approach: ['Allocate a result array of size <code>len1 + len2</code> initialized to 0.', 'For each pair of digits, add the product into <code>pos[i+j+1]</code>, propagate carry to <code>pos[i+j]</code>.', 'Skip leading zeros and join; if empty, the answer is "0".'], code: 'def multiply(self, num1, num2):\n    if num1 == "0" or num2 == "0":\n        return "0"\n    res = [0] * (len(num1) + len(num2))\n    for i in range(len(num1) - 1, -1, -1):\n        for j in range(len(num2) - 1, -1, -1):\n            mul = (ord(num1[i]) - 48) * (ord(num2[j]) - 48)\n            s = mul + res[i + j + 1]\n            res[i + j + 1] = s % 10\n            res[i + j] += s // 10\n    out = "".join(map(str, res)).lstrip("0")\n    return out or "0"', time: 'O(m*n)', timeWhy: 'every digit pair is multiplied once.', space: 'O(m+n)', spaceWhy: 'the digit buffer for the product.', pitfalls: ['Handle the "0" case up front, and strip leading zeros from the final buffer.'] }),
  gen: function () { function rn(L) { var s = '' + randInt(1, 9); for (var i = 1; i < L; i++) s += randInt(0, 9); return s; } var o = [['2', '3'], ['123', '456'], ['0', '52'], ['9', '99'], ['999', '999']]; for (var k = 0; k < 35; k++) o.push([rn(randInt(1, 5)), rn(randInt(1, 5))]); return o; },
  ref: function (a) { return (BigInt(a[0]) * BigInt(a[1])).toString(); } });

// ---- Partition Labels (STR_ARR) ----
MORE5.push({ slug: 'partition-labels', title: 'Partition Labels', difficulty: 'medium', topics: ['String', 'Greedy', 'Two Pointers', 'Hash Table'], type: 'STR_ARR', langsrc: T.STR_ARR('partitionLabels'),
  desc: '<p>You are given a string <code>s</code>. Partition it into as many parts as possible so that each letter appears in at most one part. Return a list of the sizes of these parts, in order.</p>',
  examples: [{ in: 's = "ababcbacadefegdehijhklij"', out: '[9,7,8]' }, { in: 's = "eccbbbbdec"', out: '[10]' }],
  constraints: ['1 &lt;= s.length &lt;= 500', 's consists of lowercase English letters.'],
  editorial: ED({ intuition: 'A part must extend at least until the last occurrence of every letter it contains. Track the farthest last-occurrence as you scan; when the current index reaches that boundary, the part is complete.', approach: ['Record the last index of each letter.', 'Scan with a running <code>end = max(end, last[s[i]])</code>.', 'When <code>i == end</code>, cut a part of length <code>i - start + 1</code> and reset start.'], code: 'def partitionLabels(self, s):\n    last = {c: i for i, c in enumerate(s)}\n    res = []\n    start = end = 0\n    for i, c in enumerate(s):\n        end = max(end, last[c])\n        if i == end:\n            res.append(i - start + 1)\n            start = i + 1\n    return res', time: 'O(n)', timeWhy: 'one pass to record last indices, one pass to partition.', space: 'O(1)', spaceWhy: 'the last-index map holds at most 26 entries.' }),
  gen: function () { var o = [['ababcbacadefegdehijhklij'], ['eccbbbbdec'], ['a'], ['abcabc']]; for (var k = 0; k < 35; k++) o.push([randWord(1, 14, 'abcde')]); return o; },
  ref: function (a) { var s = a[0], last = {}; for (var i = 0; i < s.length; i++) last[s[i]] = i; var res = [], start = 0, end = 0; for (var j = 0; j < s.length; j++) { end = Math.max(end, last[s[j]]); if (j === end) { res.push(j - start + 1); start = j + 1; } } return res; } });

// ---- Maximum Product of Word Lengths (ARRSTR_INT) ----
MORE5.push({ slug: 'maximum-product-of-word-lengths', title: 'Maximum Product of Word Lengths', difficulty: 'medium', topics: ['Array', 'String', 'Bit Manipulation'], type: 'ARRSTR_INT', langsrc: T.ARRSTR_INT('maxProduct'),
  desc: '<p>Given an array of strings <code>words</code>, return the maximum value of <code>length(words[i]) * length(words[j])</code> where the two words share no common letters. If no such pair exists, return 0.</p>',
  examples: [{ in: 'words = ["abcw","baz","foo","bar","xtfn","abcdef"]', out: '16', ex: '"abcw" and "xtfn" share no letters: 4 * 4 = 16.' }, { in: 'words = ["a","aa","aaa","aaaa"]', out: '0' }],
  constraints: ['2 &lt;= words.length &lt;= 1000', '1 &lt;= words[i].length &lt;= 1000', 'words[i] consists of lowercase English letters.'],
  editorial: ED({ intuition: 'Two words share a letter iff their 26-bit letter masks intersect. A bitmask reduces the "share a letter?" test to a single AND, so comparing all pairs becomes cheap.', approach: ['Build a bitmask per word: set bit <code>c - \'a\'</code> for each letter.', 'For every pair <code>(i, j)</code>, if <code>mask[i] &amp; mask[j] == 0</code> they are disjoint.', 'Track the maximum length product over disjoint pairs.'], code: 'def maxProduct(self, words):\n    masks = []\n    for w in words:\n        m = 0\n        for c in w:\n            m |= 1 << (ord(c) - 97)\n        masks.append(m)\n    res = 0\n    for i in range(len(words)):\n        for j in range(i + 1, len(words)):\n            if masks[i] & masks[j] == 0:\n                res = max(res, len(words[i]) * len(words[j]))\n    return res', time: 'O(n^2 + total letters)', timeWhy: 'masks are built in linear total time, then all pairs are compared in O(1) each.', space: 'O(n)', spaceWhy: 'one integer mask per word.' }),
  gen: function () { var o = [[['abcw', 'baz', 'foo', 'bar', 'xtfn', 'abcdef']], [['a', 'aa', 'aaa', 'aaaa']], [['ab', 'cd']]]; for (var k = 0; k < 30; k++) { var c = randInt(2, 6), w = []; for (var i = 0; i < c; i++) w.push(randWord(1, 5, 'abcdef')); o.push([w]); } return o; },
  ref: function (a) { var words = a[0], masks = words.map(function (w) { var m = 0; for (var i = 0; i < w.length; i++) m |= 1 << (w.charCodeAt(i) - 97); return m; }); var res = 0; for (var i = 0; i < words.length; i++) for (var j = i + 1; j < words.length; j++) if ((masks[i] & masks[j]) === 0) res = Math.max(res, words[i].length * words[j].length); return res; } });

// ---- Word Break (STR_ARRSTR_BOOL) ----
MORE5.push({ slug: 'word-break', title: 'Word Break', difficulty: 'medium', topics: ['String', 'Dynamic Programming', 'Hash Table'], type: 'STR_ARRSTR_BOOL', langsrc: T.STR_ARRSTR_BOOL('wordBreak'),
  desc: '<p>Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words. A word may be reused.</p>',
  examples: [{ in: 's = "leetcode", wordDict = ["leet","code"]', out: 'true' }, { in: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', out: 'false' }],
  constraints: ['1 &lt;= s.length &lt;= 300', '1 &lt;= wordDict.length &lt;= 1000', 'All dictionary words are unique.'],
  editorial: ED({ intuition: 'Define <code>dp[i]</code> = "the first i characters can be segmented." A prefix is breakable if some earlier breakable point <code>j</code> exists and <code>s[j:i]</code> is a dictionary word.', approach: ['Put the dictionary in a set for O(1) lookups.', 'dp[0] = true (empty prefix).', 'For each end i, if any dp[j] is true and s[j:i] is in the set, set dp[i] = true.', 'Return dp[n].'], code: 'def wordBreak(self, s, wordDict):\n    words = set(wordDict)\n    dp = [False] * (len(s) + 1)\n    dp[0] = True\n    for i in range(1, len(s) + 1):\n        for j in range(i):\n            if dp[j] and s[j:i] in words:\n                dp[i] = True\n                break\n    return dp[-1]', time: 'O(n^2 * L)', timeWhy: 'for each end, scan all starts and hash a substring of length up to L.', space: 'O(n)', spaceWhy: 'the dp array plus the word set.' }),
  gen: function () {
    var o = [['leetcode', ['leet', 'code']], ['applepenapple', ['apple', 'pen']], ['catsandog', ['cats', 'dog', 'sand', 'and', 'cat']]];
    for (var k = 0; k < 35; k++) {
      var dict = [], nd = randInt(2, 4);
      for (var i = 0; i < nd; i++) dict.push(randWord(1, 3, 'abc'));
      // build s by concatenating some dict words (usually breakable), sometimes add junk
      var parts = randInt(1, 4), s = '';
      for (var p = 0; p < parts; p++) s += dict[randInt(0, dict.length - 1)];
      if (Math.random() < 0.35) s += randWord(1, 2, 'xyz');
      o.push([s, dict]);
    }
    return o;
  },
  ref: function (a) { var s = a[0], words = {}; a[1].forEach(function (w) { words[w] = 1; }); var dp = new Array(s.length + 1).fill(false); dp[0] = true; for (var i = 1; i <= s.length; i++) { for (var j = 0; j < i; j++) { if (dp[j] && words[s.slice(j, i)]) { dp[i] = true; break; } } } return dp[s.length]; } });

// ---- Sliding Window Maximum (ARR_INT_ARR) ----
MORE5.push({ slug: 'sliding-window-maximum', title: 'Sliding Window Maximum', difficulty: 'hard', topics: ['Array', 'Sliding Window', 'Heap', 'Monotonic Queue'], type: 'ARR_INT_ARR', langsrc: T.ARR_INT_ARR('maxSlidingWindow'),
  desc: '<p>Given an array <code>nums</code> and a window size <code>k</code>, the window slides from left to right one position at a time. Return an array of the maximum value in each window.</p>',
  examples: [{ in: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', out: '[3,3,5,5,6,7]' }, { in: 'nums = [1], k = 1', out: '[1]' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '1 &lt;= k &lt;= nums.length'],
  editorial: ED({ intuition: 'A value can never be a future maximum if a newer, larger value sits to its right. Keep a deque of indices whose values are strictly decreasing — the front is always the current window maximum.', approach: ['Maintain a deque of indices, values decreasing front to back.', 'Before pushing i, pop smaller values off the back; pop the front if it fell out of the window.', 'Once the first window is formed (i &gt;= k-1), record nums[front].'], code: 'from collections import deque\n\ndef maxSlidingWindow(self, nums, k):\n    dq, res = deque(), []\n    for i, x in enumerate(nums):\n        while dq and nums[dq[-1]] < x:\n            dq.pop()\n        dq.append(i)\n        if dq[0] <= i - k:\n            dq.popleft()\n        if i >= k - 1:\n            res.append(nums[dq[0]])\n    return res', time: 'O(n)', timeWhy: 'each index is pushed and popped from the deque at most once.', space: 'O(k)', spaceWhy: 'the deque holds at most one window of indices.', pitfalls: ['Store indices (not values) so you can tell when the front has slid out of the window.'] }),
  gen: function () { var o = [[[1, 3, -1, -3, 5, 3, 6, 7], 3], [[1], 1], [[9, 8, 7, 6], 2], [[1, 2, 3, 4, 5], 5]]; for (var t = 0; t < 40; t++) { var n = randInt(1, 12), arr = randArr(n, -10, 10), k = randInt(1, n); o.push([arr, k]); } return o; },
  ref: function (a) { var nums = a[0], k = a[1], dq = [], res = []; for (var i = 0; i < nums.length; i++) { while (dq.length && nums[dq[dq.length - 1]] < nums[i]) dq.pop(); dq.push(i); if (dq[0] <= i - k) dq.shift(); if (i >= k - 1) res.push(nums[dq[0]]); } return res; } });

// ---- Jump Game II (ARR_INT) ----
MORE5.push({ slug: 'jump-game-ii', title: 'Jump Game II', difficulty: 'medium', topics: ['Array', 'Greedy', 'Dynamic Programming'], type: 'ARR_INT', langsrc: T.ARR_INT('jump'),
  desc: '<p>Given an array <code>nums</code> where <code>nums[i]</code> is the maximum jump length from index <code>i</code>, return the minimum number of jumps to reach the last index. You can assume the last index is always reachable.</p>',
  examples: [{ in: 'nums = [2,3,1,1,4]', out: '2', ex: 'Jump 1 step to index 1, then 3 steps to the end.' }, { in: 'nums = [2,3,0,1,4]', out: '2' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^4', '0 &lt;= nums[i] &lt;= 1000', 'The last index is reachable.'],
  editorial: ED({ intuition: 'Think of it as BFS over "levels." Everything reachable within j jumps forms a contiguous range. When you exhaust the current range you must take another jump, extending to the farthest index seen so far.', approach: ['Track <code>curEnd</code> (edge of the current jump range) and <code>farthest</code> (best reach seen).', 'At each i update farthest; when i hits curEnd, increment jumps and set curEnd = farthest.', 'Stop before the last index — you never need to jump from it.'], code: 'def jump(self, nums):\n    jumps = cur_end = farthest = 0\n    for i in range(len(nums) - 1):\n        farthest = max(farthest, i + nums[i])\n        if i == cur_end:\n            jumps += 1\n            cur_end = farthest\n    return jumps', time: 'O(n)', timeWhy: 'a single sweep updating two counters.', space: 'O(1)', spaceWhy: 'constant extra space.', pitfalls: ['Loop only to n-2; counting a jump from the last index would over-count.'] }),
  gen: function () { var o = [[[2, 3, 1, 1, 4]], [[2, 3, 0, 1, 4]], [[0]], [[1, 1, 1, 1]]]; for (var k = 0; k < 40; k++) { var n = randInt(1, 12), arr = []; for (var i = 0; i < n; i++) arr.push(randInt(1, 4)); arr[n - 1] = randInt(0, 4); o.push([arr]); } return o; },
  ref: function (a) { var nums = a[0], jumps = 0, curEnd = 0, farthest = 0; for (var i = 0; i < nums.length - 1; i++) { farthest = Math.max(farthest, i + nums[i]); if (i === curEnd) { jumps++; curEnd = farthest; } } return jumps; } });

// ---- Happy Number (INT_BOOL) ----
MORE5.push({ slug: 'happy-number', title: 'Happy Number', difficulty: 'easy', topics: ['Math', 'Hash Table', 'Two Pointers'], type: 'INT_BOOL', langsrc: T.INT_BOOL('isHappy'),
  desc: '<p>A number is <em>happy</em> if repeatedly replacing it by the sum of the squares of its digits eventually reaches 1. Numbers that never reach 1 loop forever. Return <code>true</code> if <code>n</code> is happy.</p>',
  examples: [{ in: 'n = 19', out: 'true', ex: '1+81=82, 64+4=68, 36+64=100, 1 -> happy.' }, { in: 'n = 2', out: 'false' }],
  constraints: ['1 &lt;= n &lt;= 2^31 - 1'],
  editorial: ED({ intuition: 'The digit-square process is a sequence that either hits 1 or enters a cycle. Detecting "did we loop?" is exactly cycle detection — use a seen-set, or Floyd\u2019s fast/slow pointers.', approach: ['Repeatedly compute the sum of squared digits.', 'Keep a set of seen values; if you revisit one you are in a loop -> not happy.', 'If you reach 1, it is happy.'], code: 'def isHappy(self, n):\n    seen = set()\n    while n != 1 and n not in seen:\n        seen.add(n)\n        n = sum(int(d) ** 2 for d in str(n))\n    return n == 1', time: 'O(log n) per step', timeWhy: 'digit counts shrink quickly; the number of distinct values before a cycle is bounded.', space: 'O(log n)', spaceWhy: 'the set of seen values (or O(1) with Floyd\u2019s).' }),
  gen: function () { var o = [[19], [2], [7], [1], [10]]; for (var k = 0; k < 45; k++) o.push([randInt(1, 200)]); return o; },
  ref: function (a) { var n = a[0], seen = {}; while (n !== 1 && !seen[n]) { seen[n] = 1; var s = 0; while (n > 0) { var d = n % 10; s += d * d; n = Math.floor(n / 10); } n = s; } return n === 1; } });

// ---- Reverse Integer (INT_INT) ----
MORE5.push({ slug: 'reverse-integer', title: 'Reverse Integer', difficulty: 'medium', topics: ['Math'], type: 'INT_INT', langsrc: T.INT_INT('reverse'),
  desc: '<p>Given a signed 32-bit integer <code>x</code>, return <code>x</code> with its digits reversed. If reversing causes the value to fall outside the 32-bit signed range <code>[-2^31, 2^31 - 1]</code>, return <code>0</code>.</p>',
  examples: [{ in: 'x = 123', out: '321' }, { in: 'x = -123', out: '-321' }, { in: 'x = 120', out: '21' }],
  constraints: ['-2^31 &lt;= x &lt;= 2^31 - 1'],
  editorial: ED({ intuition: 'Peel digits off the right with <code>%10</code> and push them onto a result with <code>result*10 + digit</code>. The only subtlety is detecting 32-bit overflow before it happens.', approach: ['Track the sign, work with the absolute value.', 'Pop the last digit and append it to the running result.', 'Before each append, check the result would not exceed the 32-bit bound; if it would, return 0.'], code: 'def reverse(self, x):\n    sign = -1 if x < 0 else 1\n    x = abs(x)\n    res = 0\n    while x:\n        res = res * 10 + x % 10\n        x //= 10\n    res *= sign\n    return res if -2**31 <= res <= 2**31 - 1 else 0', time: 'O(log x)', timeWhy: 'one iteration per digit.', space: 'O(1)', spaceWhy: 'a couple of integer variables.', pitfalls: ['In fixed-width languages, check overflow using the bound before multiplying, not after.'] }),
  gen: function () { var o = [[123], [-123], [120], [0], [1534236469], [-2147483648], [2147483647]]; for (var k = 0; k < 40; k++) o.push([randInt(-100000, 100000)]); return o; },
  ref: function (a) { var x = a[0], sign = x < 0 ? -1 : 1, v = Math.abs(x), res = 0; while (v > 0) { res = res * 10 + (v % 10); v = Math.floor(v / 10); } res *= sign; return (res < -2147483648 || res > 2147483647) ? 0 : res; } });

// ---- Valid Parenthesis String (STR_BOOL) ----
MORE5.push({ slug: 'valid-parenthesis-string', title: 'Valid Parenthesis String', difficulty: 'medium', topics: ['String', 'Greedy', 'Dynamic Programming', 'Stack'], type: 'STR_BOOL', langsrc: T.STR_BOOL('checkValidString'),
  desc: '<p>Given a string <code>s</code> containing only <code>(</code>, <code>)</code> and <code>*</code>, return <code>true</code> if it can be made a valid parentheses string. A <code>*</code> can be treated as <code>(</code>, <code>)</code>, or an empty string.</p>',
  examples: [{ in: 's = "()"', out: 'true' }, { in: 's = "(*)"', out: 'true' }, { in: 's = "(*))"', out: 'true' }],
  constraints: ['1 &lt;= s.length &lt;= 100', "s consists of '(', ')' and '*'."],
  editorial: ED({ intuition: 'Instead of committing each <code>*</code>, track the <em>range</em> of possible open-paren counts. <code>lo</code> is the fewest opens still unmatched (treat * as )), <code>hi</code> is the most (treat * as (). The string is valid if 0 stays achievable.', approach: ['For "(" increment both lo and hi; for ")" decrement both; for "*" decrement lo and increment hi.', 'Clamp lo at 0 (open count can never go negative).', 'If hi ever goes negative there are too many ")"; fail. At the end lo must be 0.'], code: 'def checkValidString(self, s):\n    lo = hi = 0\n    for c in s:\n        if c == "(":\n            lo += 1; hi += 1\n        elif c == ")":\n            lo -= 1; hi -= 1\n        else:\n            lo -= 1; hi += 1\n        if hi < 0:\n            return False\n        lo = max(lo, 0)\n    return lo == 0', time: 'O(n)', timeWhy: 'a single pass maintaining two counters.', space: 'O(1)', spaceWhy: 'constant extra space.', pitfalls: ['Clamp lo to 0 each step, otherwise extra "*" treated as ")" push it artificially negative.'] }),
  gen: function () { var ch = '()*'; var o = [['()'], ['(*)'], ['(*))'], ['('], [')'], ['**']]; for (var k = 0; k < 40; k++) { var L = randInt(1, 9), s = ''; for (var i = 0; i < L; i++) s += ch[randInt(0, 2)]; o.push([s]); } return o; },
  ref: function (a) { var s = a[0], lo = 0, hi = 0; for (var i = 0; i < s.length; i++) { var c = s[i]; if (c === '(') { lo++; hi++; } else if (c === ')') { lo--; hi--; } else { lo--; hi++; } if (hi < 0) return false; if (lo < 0) lo = 0; } return lo === 0; } });

// ---- Decode Ways (STR_INT) ----
MORE5.push({ slug: 'decode-ways', title: 'Decode Ways', difficulty: 'medium', topics: ['String', 'Dynamic Programming'], type: 'STR_INT', langsrc: T.STR_INT('numDecodings'),
  desc: "<p>A message of digits is encoded to letters using the mapping <code>'A' -&gt; 1</code>, ..., <code>'Z' -&gt; 26</code>. Given a digit string <code>s</code>, return the number of ways to decode it. The answer fits in a 32-bit integer.</p>",
  examples: [{ in: 's = "12"', out: '2', ex: '"AB" (1 2) or "L" (12).' }, { in: 's = "226"', out: '3' }, { in: 's = "06"', out: '0' }],
  constraints: ['1 &lt;= s.length &lt;= 100', 's contains only digits and may contain leading zeros.'],
  editorial: ED({ intuition: 'At each position you either decode one digit (1-9) or two digits (10-26). So the ways to decode up to position i is the sum of the ways ending with a valid single and a valid double.', approach: ['dp[0] = 1 (empty), dp[1] = 1 if s[0] != "0".', 'For each i, add dp[i-1] if the single digit s[i-1] is 1-9.', 'Add dp[i-2] if the two-digit s[i-2:i] is between 10 and 26.'], code: 'def numDecodings(self, s):\n    if not s or s[0] == "0":\n        return 0\n    n = len(s)\n    dp = [0] * (n + 1)\n    dp[0] = dp[1] = 1\n    for i in range(2, n + 1):\n        if s[i - 1] != "0":\n            dp[i] += dp[i - 1]\n        two = int(s[i - 2:i])\n        if 10 <= two <= 26:\n            dp[i] += dp[i - 2]\n    return dp[n]', time: 'O(n)', timeWhy: 'one pass over the string.', space: 'O(n)', spaceWhy: 'the dp array (reducible to O(1)).', pitfalls: ['A "0" is only decodable as part of 10 or 20; a standalone or ill-placed 0 makes that prefix undecodable.'] }),
  gen: function () { function rd(L) { var s = '' + randInt(0, 9); for (var i = 1; i < L; i++) s += randInt(0, 9); return s; } var o = [['12'], ['226'], ['06'], ['10'], ['0'], ['27'], ['100']]; for (var k = 0; k < 40; k++) o.push([rd(randInt(1, 6))]); return o; },
  ref: function (a) { var s = a[0]; if (!s || s[0] === '0') return 0; var n = s.length, dp = new Array(n + 1).fill(0); dp[0] = 1; dp[1] = 1; for (var i = 2; i <= n; i++) { if (s[i - 1] !== '0') dp[i] += dp[i - 1]; var two = parseInt(s.slice(i - 2, i), 10); if (two >= 10 && two <= 26) dp[i] += dp[i - 2]; } return dp[n]; } });

// ---- Palindromic Substrings (STR_INT) ----
MORE5.push({ slug: 'palindromic-substrings', title: 'Palindromic Substrings', difficulty: 'medium', topics: ['String', 'Dynamic Programming', 'Two Pointers'], type: 'STR_INT', langsrc: T.STR_INT('countSubstrings'),
  desc: '<p>Given a string <code>s</code>, return the number of <strong>palindromic substrings</strong> in it. Substrings at different start or end positions count separately even if identical.</p>',
  examples: [{ in: 's = "abc"', out: '3', ex: 'The three single characters.' }, { in: 's = "aaa"', out: '6' }],
  constraints: ['1 &lt;= s.length &lt;= 1000', 's consists of lowercase English letters.'],
  editorial: ED({ intuition: 'Every palindrome has a center — either a single character (odd length) or a gap between two characters (even length). Expanding outward from each of the 2n-1 centers finds all palindromes without recomputation.', approach: ['For each index, expand around the odd center (i, i) and the even center (i, i+1).', 'While the two ends match, count one palindrome and widen.', 'Sum the counts over all centers.'], code: 'def countSubstrings(self, s):\n    res = 0\n    for center in range(2 * len(s) - 1):\n        l = center // 2\n        r = l + center % 2\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            res += 1\n            l -= 1\n            r += 1\n    return res', time: 'O(n^2)', timeWhy: 'each of the ~2n centers can expand up to n times.', space: 'O(1)', spaceWhy: 'only pointers and a counter.' }),
  gen: function () { var o = [['abc'], ['aaa'], ['a'], ['abba']]; for (var k = 0; k < 40; k++) o.push([randWord(1, 10, 'abc')]); return o; },
  ref: function (a) { var s = a[0], res = 0; for (var center = 0; center < 2 * s.length - 1; center++) { var l = Math.floor(center / 2), r = l + (center % 2); while (l >= 0 && r < s.length && s[l] === s[r]) { res++; l--; r++; } } return res; } });

// ---- Top K Frequent Elements (custom: distinct frequencies -> unique sorted output) ----
MORE5.push({ slug: 'top-k-frequent-elements', title: 'Top K Frequent Elements', difficulty: 'medium', topics: ['Array', 'Hash Table', 'Heap', 'Bucket Sort'],
  desc: '<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code> most frequent elements. <em>On this judge the answer is returned sorted in ascending order</em>, and the inputs guarantee the k most frequent elements are unambiguous.</p>',
  examples: [{ in: 'nums = [1,1,1,2,2,3], k = 2', out: '[1,2]' }, { in: 'nums = [1], k = 1', out: '[1]' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', 'k is in the range [1, number of distinct elements]', 'The k most frequent elements are unique.'],
  editorial: ED({ intuition: 'Count frequencies, then you need the k largest by count. A full sort is O(n log n); a bucket indexed by frequency (which is at most n) gets you there in O(n).', approach: ['Count each value\u2019s frequency in a hash map.', 'Place values into buckets indexed by their frequency.', 'Walk buckets from high frequency down, collecting until you have k values.'], code: 'def topKFrequent(self, nums, k):\n    from collections import Counter\n    count = Counter(nums)\n    buckets = [[] for _ in range(len(nums) + 1)]\n    for val, c in count.items():\n        buckets[c].append(val)\n    res = []\n    for freq in range(len(buckets) - 1, 0, -1):\n        for val in buckets[freq]:\n            res.append(val)\n            if len(res) == k:\n                return res\n    return res', time: 'O(n)', timeWhy: 'counting and bucket placement are linear; bucket scan is bounded by n.', space: 'O(n)', spaceWhy: 'the count map and buckets.', pitfalls: ['A heap of size k gives O(n log k) — also fine, but bucket sort avoids the log factor.'] }),
  type: 'ARR_INT_ARR',
  custom: (function () {
    // reuse the generic ARR_INT_ARR harness but SORT the returned array so any
    // valid permutation of a (unique) answer set compares equal.
    var base = T.ARR_INT_ARR('topKFrequent');
    return {
      python: { stub: base.python.stub, harness: ln('import sys', '_d=sys.stdin.read().split();_p=0', '_T=int(_d[_p]);_p+=1;_o=[]', 'for _ in range(_T):', '    _n=int(_d[_p]);_p+=1', '    _nums=list(map(int,_d[_p:_p+_n]));_p+=_n', '    _k=int(_d[_p]);_p+=1', '    _r=sorted(Solution().topKFrequent(_nums,_k))', "    _o.append(' '.join(map(str,_r)))", "print('\\n'.join(_o))") },
      javascript: { stub: base.javascript.stub, harness: ln("const _d=require('fs').readFileSync(0,'utf8').split(/\\s+/).filter(x=>x.length);let _p=0;const _T=+_d[_p++];const _o=[];", "for(let _i=0;_i<_T;_i++){const _n=+_d[_p++];const _nums=_d.slice(_p,_p+_n).map(Number);_p+=_n;const _k=+_d[_p++];const _r=topKFrequent(_nums,_k).slice().sort((a,b)=>a-b);_o.push(_r.join(' '));}", "console.log(_o.join('\\n'));") },
      cpp: { stub: base.cpp.stub, harness: ln('int main(){int T;cin>>T;while(T--){int n;cin>>n;vector<int> nums(n);for(int i=0;i<n;i++)cin>>nums[i];int k;cin>>k;vector<int> r=Solution().topKFrequent(nums,k);sort(r.begin(),r.end());for(size_t i=0;i<r.size();i++){if(i)cout<<\' \';cout<<r[i];}cout<<"\\n";}}') },
      java: { stub: base.java.stub, harness: ln('public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=sc.nextInt();StringBuilder sb=new StringBuilder();while(T-->0){int n=sc.nextInt();int[] nums=new int[n];for(int i=0;i<n;i++)nums[i]=sc.nextInt();int k=sc.nextInt();int[] r=new Solution().topKFrequent(nums,k);Arrays.sort(r);for(int i=0;i<r.length;i++){if(i>0)sb.append(\' \');sb.append(r[i]);}sb.append("\\n");}System.out.print(sb);}}') },
    };
  })(),
  gen: function () {
    var o = [];
    // Explicit distinct-frequency cases.
    o.push([[1, 1, 1, 2, 2, 3], 2]);
    o.push([[1], 1]);
    for (var t = 0; t < 40; t++) {
      var m = randInt(1, 5);                 // distinct values
      var vals = shuffle([1, 2, 3, 4, 5, 6, 7, 8].slice(0, m + 2)).slice(0, m);
      var freqs = shuffle([1, 2, 3, 4, 5].slice(0, m)); // distinct counts 1..m
      var arr = [];
      for (var i = 0; i < m; i++) for (var c = 0; c < freqs[i]; c++) arr.push(vals[i]);
      shuffle(arr);
      var k = randInt(1, m);
      o.push([arr, k]);
    }
    return o;
  },
  ref: function (a) {
    var nums = a[0], k = a[1], count = {};
    nums.forEach(function (x) { count[x] = (count[x] || 0) + 1; });
    var pairs = Object.keys(count).map(function (v) { return [parseInt(v, 10), count[v]]; });
    pairs.sort(function (x, y) { return y[1] - x[1]; });
    return pairs.slice(0, k).map(function (p) { return p[0]; }).sort(function (x, y) { return x - y; });
  } });

module.exports = { MORE5 };
