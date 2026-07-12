// Batch I: sudoku / word search / greedy / DP-string / scheduling.
const { T, randInt, randArr } = require('./gen.js');

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
function rw(minL, maxL, al) { var L = randInt(minL, maxL), s = ''; for (var i = 0; i < L; i++) s += al[randInt(0, al.length - 1)]; return s; }

const MORE13 = [];

// ---- Valid Sudoku (CHARGRID_BOOL) ----
MORE13.push({ slug: 'valid-sudoku', title: 'Valid Sudoku', difficulty: 'medium', topics: ['Array', 'Hash Table', 'Matrix'], type: 'CHARGRID_BOOL', langsrc: T.CHARGRID_BOOL('isValidSudoku'),
  desc: "<p>Determine if a 9 x 9 Sudoku <code>board</code> is valid. Only the filled cells need to be checked: each row, each column, and each 3 x 3 sub-box must contain no repeated digit 1-9. Empty cells are <code>'.'</code>. The board need not be solvable.</p>",
  examples: [{ in: 'board rows like "53..7...."', out: 'true' }, { in: 'a board with two 8s in a column', out: 'false' }],
  constraints: ['board.length == 9', 'board[i].length == 9', "board[i][j] is a digit 1-9 or '.'"],
  editorial: ED({ intuition: 'Validity is purely about no duplicate digit within any row, column, or 3x3 box. Track seen digits for each of those 27 groups.', approach: ['Maintain a set for each row, each column, and each box (box index = (r/3)*3 + c/3).', 'For each filled cell, check all three sets; if the digit is already present, it is invalid.', 'Otherwise record it in the three sets.'], code: 'def isValidSudoku(self, board):\n    rows = [set() for _ in range(9)]\n    cols = [set() for _ in range(9)]\n    boxes = [set() for _ in range(9)]\n    for r in range(9):\n        for c in range(9):\n            v = board[r][c]\n            if v == ".":\n                continue\n            b = (r // 3) * 3 + c // 3\n            if v in rows[r] or v in cols[c] or v in boxes[b]:\n                return False\n            rows[r].add(v); cols[c].add(v); boxes[b].add(v)\n    return True', time: 'O(1)', timeWhy: 'the board is a fixed 81 cells.', space: 'O(1)', spaceWhy: '27 small sets.' }),
  gen: function () { var o = []; for (var k = 0; k < 40; k++) { var g = []; for (var i = 0; i < 9; i++) { var row = ''; for (var j = 0; j < 9; j++) row += (Math.random() < 0.28 ? ('' + randInt(1, 9)) : '.'); g.push(row); } o.push([g]); } return o; },
  ref: function (a) { var b = a[0], rows = {}, cols = {}, box = {}; for (var i = 0; i < 9; i++) for (var j = 0; j < 9; j++) { var ch = b[i][j]; if (ch === '.') continue; var bi = Math.floor(i / 3) * 3 + Math.floor(j / 3); if ((rows[i] && rows[i][ch]) || (cols[j] && cols[j][ch]) || (box[bi] && box[bi][ch])) return false; (rows[i] = rows[i] || {})[ch] = 1; (cols[j] = cols[j] || {})[ch] = 1; (box[bi] = box[bi] || {})[ch] = 1; } return true; } });

// ---- Hand of Straights (ARR_INT_BOOL) ----
MORE13.push({ slug: 'hand-of-straights', title: 'Hand of Straights', difficulty: 'medium', topics: ['Array', 'Greedy', 'Hash Table', 'Sorting'], type: 'ARR_INT_BOOL', langsrc: T.ARR_INT_BOOL('isNStraightHand'),
  desc: '<p>Given an array <code>hand</code> of card values and a group size <code>k</code> (LeetCode: groupSize), return <code>true</code> if the cards can be rearranged into groups of <code>k</code> consecutive cards.</p>',
  examples: [{ in: 'hand = [1,2,3,6,2,3,4,7,8], k = 3', out: 'true' }, { in: 'hand = [1,2,3,4,5], k = 4', out: 'false' }],
  constraints: ['1 &lt;= hand.length &lt;= 10^4', '0 &lt;= hand[i] &lt;= 10^9', '1 &lt;= k'],
  editorial: ED({ intuition: 'The smallest remaining card must start a group. Greedily forming groups from the smallest value forces the choice, so a frequency map processed in sorted order settles it.', approach: ['If the count of cards is not divisible by k, return false.', 'Count each value; process values in ascending order.', 'For each value with remaining count c, consume c copies of the next k consecutive values; if any is short, return false.'], code: 'def isNStraightHand(self, hand, k):\n    if len(hand) % k:\n        return False\n    from collections import Counter\n    count = Counter(hand)\n    for v in sorted(count):\n        c = count[v]\n        if c > 0:\n            for i in range(v, v + k):\n                if count[i] < c:\n                    return False\n                count[i] -= c\n    return True', time: 'O(n log n)', timeWhy: 'sorting the distinct values.', space: 'O(n)', spaceWhy: 'the count map.', pitfalls: ['Start each group at the smallest available card; picking arbitrary starts fails.'] }),
  gen: function () { var o = [[[1, 2, 3, 6, 2, 3, 4, 7, 8], 3], [[1, 2, 3, 4, 5], 4], [[1], 1]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 9), 1, 6), randInt(1, 4)]); return o; },
  ref: function (a) { var hand = a[0], k = a[1]; if (hand.length % k !== 0) return false; var cnt = {}; hand.forEach(function (x) { cnt[x] = (cnt[x] || 0) + 1; }); var keys = Object.keys(cnt).map(Number).sort(function (x, y) { return x - y; }); for (var i = 0; i < keys.length; i++) { var v = keys[i]; if (cnt[v] > 0) { var need = cnt[v]; for (var j = 0; j < k; j++) { if ((cnt[v + j] || 0) < need) return false; cnt[v + j] -= need; } } } return true; } });

// ---- Interleaving String (STR_STR_STR_BOOL) ----
MORE13.push({ slug: 'interleaving-string', title: 'Interleaving String', difficulty: 'medium', topics: ['String', 'Dynamic Programming'], type: 'STR_STR_STR_BOOL', langsrc: T.STR_STR_STR_BOOL('isInterleave'),
  desc: '<p>Given strings <code>s1</code>, <code>s2</code>, and <code>s3</code>, return <code>true</code> if <code>s3</code> is formed by an interleaving of <code>s1</code> and <code>s2</code> (preserving the order of each).</p>',
  examples: [{ in: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"', out: 'true' }, { in: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"', out: 'false' }],
  constraints: ['0 &lt;= s1.length, s2.length &lt;= 100', 's3.length == s1.length + s2.length', 'Inputs are lowercase letters.'],
  editorial: ED({ intuition: 'Let <code>dp[i][j]</code> mean the first i chars of s1 and first j of s2 can interleave to form the first i+j chars of s3. Each step consumes one char from s1 or s2 if it matches the next char of s3.', approach: ['If lengths do not add up, return false.', 'dp[0][0] = true. dp[i][j] is true if (s1[i-1]==s3[i+j-1] and dp[i-1][j]) or (s2[j-1]==s3[i+j-1] and dp[i][j-1]).', 'Answer is dp[m][n].'], code: 'def isInterleave(self, s1, s2, s3):\n    m, n = len(s1), len(s2)\n    if m + n != len(s3):\n        return False\n    dp = [[False]*(n+1) for _ in range(m+1)]\n    dp[0][0] = True\n    for i in range(m+1):\n        for j in range(n+1):\n            if i > 0 and s1[i-1] == s3[i+j-1] and dp[i-1][j]:\n                dp[i][j] = True\n            if j > 0 and s2[j-1] == s3[i+j-1] and dp[i][j-1]:\n                dp[i][j] = True\n    return dp[m][n]', time: 'O(m*n)', timeWhy: 'fill the table once.', space: 'O(m*n)', spaceWhy: 'the DP grid (reducible to O(n)).', pitfalls: ['A greedy char-by-char match fails; you need the full DP because either string could supply the next char.'] }),
  gen: function () {
    var o = [['aabcc', 'dbbca', 'aadbbcbcac'], ['aabcc', 'dbbca', 'aadbbbaccc'], ['', '', '']];
    for (var k = 0; k < 38; k++) {
      var s1 = rw(0, 4, 'ab'), s2 = rw(0, 4, 'ab'), s3;
      if (Math.random() < 0.5) { var i = 0, j = 0; s3 = ''; while (i < s1.length || j < s2.length) { if (j >= s2.length || (i < s1.length && Math.random() < 0.5)) s3 += s1[i++]; else s3 += s2[j++]; } }
      else s3 = rw(0, 8, 'ab');
      o.push([s1, s2, s3]);
    }
    return o;
  },
  ref: function (a) { var s1 = a[0], s2 = a[1], s3 = a[2], m = s1.length, n = s2.length; if (m + n !== s3.length) return false; var dp = []; for (var i = 0; i <= m; i++) dp.push(new Array(n + 1).fill(false)); dp[0][0] = true; for (i = 0; i <= m; i++) for (var j = 0; j <= n; j++) { if (i > 0 && s1[i - 1] === s3[i + j - 1] && dp[i - 1][j]) dp[i][j] = true; if (j > 0 && s2[j - 1] === s3[i + j - 1] && dp[i][j - 1]) dp[i][j] = true; } return dp[m][n]; } });

// ---- Word Search (CHARGRID_STR_BOOL) ----
MORE13.push({ slug: 'word-search', title: 'Word Search', difficulty: 'medium', topics: ['Array', 'Backtracking', 'Matrix'], type: 'CHARGRID_STR_BOOL', langsrc: T.CHARGRID_STR_BOOL('exist'),
  desc: '<p>Given an <code>m x n</code> grid of characters <code>board</code> and a string <code>word</code>, return <code>true</code> if the word can be formed from sequentially adjacent (horizontally or vertically) cells, using each cell at most once.</p>',
  examples: [{ in: 'board = ["ABCE","SFCS","ADEE"], word = "ABCCED"', out: 'true' }, { in: 'board = ["ABCE","SFCS","ADEE"], word = "ABCB"', out: 'false' }],
  constraints: ['1 &lt;= m, n &lt;= 6', '1 &lt;= word.length &lt;= 15'],
  editorial: ED({ intuition: 'Try to match the word starting from every cell, walking to neighbours that continue the word. Mark visited cells during a path and unmark on backtrack so they can be reused by other paths.', approach: ['For each cell, DFS matching word[k] against the cell.', 'On a match, temporarily blank the cell and recurse into the 4 neighbours for word[k+1].', 'Restore the cell after recursing; succeed when k reaches word length.'], code: 'def exist(self, board, word):\n    R, C = len(board), len(board[0])\n    def dfs(r, c, k):\n        if k == len(word):\n            return True\n        if r < 0 or r >= R or c < 0 or c >= C or board[r][c] != word[k]:\n            return False\n        tmp = board[r][c]; board[r][c] = "#"\n        found = (dfs(r+1,c,k+1) or dfs(r-1,c,k+1) or dfs(r,c+1,k+1) or dfs(r,c-1,k+1))\n        board[r][c] = tmp\n        return found\n    for r in range(R):\n        for c in range(C):\n            if dfs(r, c, 0):\n                return True\n    return False', time: 'O(m*n*4^L)', timeWhy: 'each start can branch 4 ways up to the word length L.', space: 'O(L)', spaceWhy: 'recursion depth.', pitfalls: ['Restore the cell on backtrack, or a single cell would be permanently blocked for other paths.'] }),
  gen: function () { var o = [[['ABCE', 'SFCS', 'ADEE'], 'ABCCED'], [['ABCE', 'SFCS', 'ADEE'], 'ABCB'], [['A'], 'A']]; for (var k = 0; k < 38; k++) { var R = randInt(1, 4), C = randInt(1, 4), g = []; for (var i = 0; i < R; i++) g.push(rw(C, C, 'ab')); o.push([g, rw(1, 4, 'ab')]); } return o; },
  ref: function (a) { var g = a[0].map(function (s) { return s.split(''); }), word = a[1], R = g.length, C = g[0].length; function dfs(r, c, k) { if (k === word.length) return true; if (r < 0 || r >= R || c < 0 || c >= C || g[r][c] !== word[k]) return false; var tmp = g[r][c]; g[r][c] = '#'; var found = dfs(r + 1, c, k + 1) || dfs(r - 1, c, k + 1) || dfs(r, c + 1, k + 1) || dfs(r, c - 1, k + 1); g[r][c] = tmp; return found; } for (var i = 0; i < R; i++) for (var j = 0; j < C; j++) if (dfs(i, j, 0)) return true; return false; } });

// ---- Task Scheduler (STR_INT_INT) ----
MORE13.push({ slug: 'task-scheduler', title: 'Task Scheduler', difficulty: 'medium', topics: ['Array', 'Greedy', 'Heap', 'Hash Table'], type: 'STR_INT_INT', langsrc: T.STR_INT_INT('leastInterval'),
  desc: '<p>Given a string <code>tasks</code> of uppercase-letter task types and a cooldown <code>n</code> (passed as the second value), each task takes one unit and identical tasks must be at least <code>n</code> units apart. Return the minimum number of units to finish all tasks.</p>',
  examples: [{ in: 'tasks = "AAABBB", n = 2', out: '8' }, { in: 'tasks = "AAABBB", n = 0', out: '6' }],
  constraints: ['1 &lt;= tasks.length &lt;= 10^4', 'tasks are uppercase English letters.', '0 &lt;= n &lt;= 100'],
  editorial: ED({ intuition: 'The most frequent task dictates the skeleton: place its copies with n gaps between them, forming (maxFreq - 1) frames of size (n + 1), then fill the last frame with the tasks that share the max frequency. If there are enough other tasks to fill all idle slots, the answer is just the total number of tasks.', approach: ['Count frequencies; find maxFreq and how many tasks have it (maxCount).', 'Compute <code>(maxFreq - 1) * (n + 1) + maxCount</code>.', 'The answer is the max of that and the total task count (when no idling is needed).'], code: 'def leastInterval(self, tasks, n):\n    from collections import Counter\n    freq = Counter(tasks)\n    max_freq = max(freq.values())\n    max_count = sum(1 for f in freq.values() if f == max_freq)\n    return max(len(tasks), (max_freq - 1) * (n + 1) + max_count)', time: 'O(N)', timeWhy: 'a single pass to count frequencies.', space: 'O(1)', spaceWhy: 'at most 26 counts.', pitfalls: ['Take the max with the total task count — with small n there may be no idle time at all.'] }),
  gen: function () { var o = [['AAABBB', 2], ['AAABBB', 0], ['A', 0], ['AAAA', 3]]; for (var k = 0; k < 40; k++) o.push([rw(1, 10, 'ABCD'), randInt(0, 3)]); return o; },
  ref: function (a) { var tasks = a[0], n = a[1], cnt = {}; for (var i = 0; i < tasks.length; i++) cnt[tasks[i]] = (cnt[tasks[i]] || 0) + 1; var maxf = 0; Object.keys(cnt).forEach(function (kk) { maxf = Math.max(maxf, cnt[kk]); }); var maxc = 0; Object.keys(cnt).forEach(function (kk) { if (cnt[kk] === maxf) maxc++; }); return Math.max(tasks.length, (maxf - 1) * (n + 1) + maxc); } });

module.exports = { MORE13 };
