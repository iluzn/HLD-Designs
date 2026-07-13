// Batch 26: HARD arrays / DP / sliding-window problems.
// All outputs are single unambiguous values (int or bool). Types reuse the
// existing harnesses: ARR_INT, ARR_BOOL, ARR_INT_INT, ARR_TGT_INT,
// GRID_INT, CHARGRID_INT, STR_INT.
const { T, randInt, randArr } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}
function binGridInt(R, C, lo, hi) { var g = []; for (var i = 0; i < R; i++) { var row = []; for (var j = 0; j < C; j++) row.push(randInt(lo, hi)); g.push(row); } return g; }

const MORE26 = [];

// ---- Best Time to Buy and Sell Stock III (ARR_INT) ----
MORE26.push({ slug: 'best-time-to-buy-and-sell-stock-iii', title: 'Best Time to Buy and Sell Stock III', difficulty: 'hard', topics: ['Array', 'Dynamic Programming'], type: 'ARR_INT', langsrc: T.ARR_INT('maxProfit'),
  desc: '<p>Given an array <code>prices</code> where <code>prices[i]</code> is the stock price on day <code>i</code>, return the maximum profit you can achieve with <strong>at most two</strong> transactions. You may not hold more than one share at a time (you must sell before you buy again).</p>',
  examples: [{ in: 'prices = [3,3,5,0,0,3,1,4]', out: '6' }, { in: 'prices = [1,2,3,4,5]', out: '4' }, { in: 'prices = [7,6,4,3,1]', out: '0' }],
  constraints: ['1 &lt;= prices.length &lt;= 10^5', '0 &lt;= prices[i] &lt;= 10^5'],
  editorial: ed('Four-state DP', 'track buy1, sell1, buy2, sell2 in one pass', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[3, 3, 5, 0, 0, 3, 1, 4]], [[1, 2, 3, 4, 5]], [[7, 6, 4, 3, 1]], [[1]]]; for (var k = 0; k < 37; k++) o.push([randArr(randInt(1, 12), 0, 12)]); return o; },
  ref: function (a) { var p = a[0], b1 = -1e9, s1 = 0, b2 = -1e9, s2 = 0; for (var i = 0; i < p.length; i++) { b1 = Math.max(b1, -p[i]); s1 = Math.max(s1, b1 + p[i]); b2 = Math.max(b2, s1 - p[i]); s2 = Math.max(s2, b2 + p[i]); } return s2; } });

// ---- Best Time to Buy and Sell Stock IV (ARR_INT_INT) ----
MORE26.push({ slug: 'best-time-to-buy-and-sell-stock-iv', title: 'Best Time to Buy and Sell Stock IV', difficulty: 'hard', topics: ['Array', 'Dynamic Programming'], type: 'ARR_INT_INT', langsrc: T.ARR_INT_INT('maxProfit'),
  desc: '<p>You are given an integer array <code>nums</code> where <code>nums[i]</code> is the price of a stock on day <code>i</code>, and an integer <code>k</code>. Return the maximum profit achievable with <strong>at most <code>k</code> transactions</strong>. You may not hold more than one share at a time.</p>',
  examples: [{ in: 'nums = [2,4,1], k = 2', out: '2' }, { in: 'nums = [3,2,6,5,0,3], k = 2', out: '7' }],
  constraints: ['0 &lt;= k &lt;= 100', '1 &lt;= nums.length &lt;= 1000', '0 &lt;= nums[i] &lt;= 1000'],
  editorial: ed('DP over k transactions', 'buy[j]/sell[j] arrays updated each day', 'O(n*k)', 'O(k)'),
  gen: function () { var o = [[[2, 4, 1], 2], [[3, 2, 6, 5, 0, 3], 2], [[1, 2, 3, 4, 5], 0], [[5], 3]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 12), 0, 12), randInt(0, 4)]); return o; },
  ref: function (a) { var p = a[0], K = a[1], n = p.length; if (K === 0 || n === 0) return 0; var buy = new Array(K + 1).fill(-1e9), sell = new Array(K + 1).fill(0); for (var i = 0; i < n; i++) { for (var j = 1; j <= K; j++) { buy[j] = Math.max(buy[j], sell[j - 1] - p[i]); sell[j] = Math.max(sell[j], buy[j] + p[i]); } } return sell[K]; } });

// ---- Maximum Gap (ARR_INT) ----
MORE26.push({ slug: 'maximum-gap', title: 'Maximum Gap', difficulty: 'hard', topics: ['Array', 'Sorting', 'Bucket Sort'], type: 'ARR_INT', langsrc: T.ARR_INT('maximumGap'),
  desc: '<p>Given an integer array <code>nums</code>, return the maximum difference between two successive elements once the array is sorted in ascending order. If the array contains fewer than two elements, return <code>0</code>.</p>',
  examples: [{ in: 'nums = [3,6,9,1]', out: '3' }, { in: 'nums = [10]', out: '0' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '0 &lt;= nums[i] &lt;= 10^9'],
  editorial: ed('Sort and scan', 'sort then take the largest adjacent gap', 'O(n log n)', 'O(n)'),
  gen: function () { var o = [[[3, 6, 9, 1]], [[10]], [[1, 1, 1]], [[1, 100000, 3]]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 12), 0, 100)]); return o; },
  ref: function (a) { var n = a[0].slice().sort(function (x, y) { return x - y; }); if (n.length < 2) return 0; var best = 0; for (var i = 1; i < n.length; i++) best = Math.max(best, n[i] - n[i - 1]); return best; } });

// ---- Reverse Pairs (ARR_INT) ----
MORE26.push({ slug: 'reverse-pairs', title: 'Reverse Pairs', difficulty: 'hard', topics: ['Array', 'Merge Sort', 'Binary Indexed Tree'], type: 'ARR_INT', langsrc: T.ARR_INT('reversePairs'),
  desc: '<p>Given an integer array <code>nums</code>, return the number of <strong>reverse pairs</strong>. A reverse pair is a pair <code>(i, j)</code> where <code>0 &lt;= i &lt; j &lt; nums.length</code> and <code>nums[i] &gt; 2 * nums[j]</code>.</p>',
  examples: [{ in: 'nums = [1,3,2,3,1]', out: '2' }, { in: 'nums = [2,4,3,5,1]', out: '3' }],
  constraints: ['1 &lt;= nums.length &lt;= 5*10^4', '-2^31 &lt;= nums[i] &lt;= 2^31 - 1'],
  editorial: ed('Merge sort counting', 'count cross pairs during a modified merge sort', 'O(n log n)', 'O(n)'),
  gen: function () { var o = [[[1, 3, 2, 3, 1]], [[2, 4, 3, 5, 1]], [[1]], [[-5, -3, -1]]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 14), -10, 10)]); return o; },
  ref: function (a) { var nums = a[0], n = nums.length, c = 0; for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) if (nums[i] > 2 * nums[j]) c++; return c; } });

// ---- Maximal Rectangle (CHARGRID_INT) ----
MORE26.push({ slug: 'maximal-rectangle', title: 'Maximal Rectangle', difficulty: 'hard', topics: ['Array', 'Dynamic Programming', 'Stack', 'Matrix'], type: 'CHARGRID_INT', langsrc: T.CHARGRID_INT('maximalRectangle'),
  desc: "<p>Given a rows-of-characters binary matrix <code>grid</code> filled with <code>'0'</code> and <code>'1'</code>, find the largest rectangle containing only <code>'1'</code>s and return its area.</p>",
  examples: [{ in: 'matrix = ["10100","10111","11111","10010"]', out: '6' }, { in: 'matrix = ["0"]', out: '0' }, { in: 'matrix = ["1"]', out: '1' }],
  constraints: ['1 &lt;= rows, cols &lt;= 200', "grid[i][j] is '0' or '1'."],
  editorial: ed('Histogram per row', 'build a histogram of consecutive 1s per column and run largest-rectangle-in-histogram on each row', 'O(rows*cols)', 'O(cols)'),
  gen: function () { var o = [[['10100', '10111', '11111', '10010']], [['0']], [['1']], [['00', '00']], [['111', '111']]]; for (var k = 0; k < 35; k++) { var R = randInt(1, 5), C = randInt(1, 5), g = []; for (var i = 0; i < R; i++) { var s = ''; for (var j = 0; j < C; j++) s += (Math.random() < 0.6 ? '1' : '0'); g.push(s); } o.push([g]); } return o; },
  ref: function (a) { var grid = a[0], R = grid.length, C = grid[0].length, heights = new Array(C).fill(0), best = 0; for (var r = 0; r < R; r++) { for (var c = 0; c < C; c++) heights[c] = grid[r][c] === '1' ? heights[c] + 1 : 0; var st = []; for (var i = 0; i <= C; i++) { var h = i === C ? 0 : heights[i]; while (st.length && heights[st[st.length - 1]] >= h) { var top = st.pop(); var width = st.length ? i - st[st.length - 1] - 1 : i; best = Math.max(best, heights[top] * width); } st.push(i); } } return best; } });

// ---- Russian Doll Envelopes (GRID_INT) ----
MORE26.push({ slug: 'russian-doll-envelopes', title: 'Russian Doll Envelopes', difficulty: 'hard', topics: ['Array', 'Binary Search', 'Dynamic Programming', 'Sorting'], type: 'GRID_INT', langsrc: T.GRID_INT('maxEnvelopes'),
  desc: '<p>You are given a list <code>grid</code> of envelopes where <code>grid[i] = [w, h]</code> is the width and height of envelope <code>i</code>. One envelope fits inside another only if both its width and height are strictly greater. Return the maximum number of envelopes you can nest (Russian doll style).</p>',
  examples: [{ in: 'envelopes = [[5,4],[6,4],[6,7],[2,3]]', out: '3' }, { in: 'envelopes = [[1,1],[1,1],[1,1]]', out: '1' }],
  constraints: ['1 &lt;= grid.length &lt;= 10^5', 'grid[i].length == 2', '1 &lt;= w, h &lt;= 10^5'],
  editorial: ed('Sort + LIS on heights', 'sort by width ascending and height descending for ties, then find the longest strictly increasing subsequence of heights', 'O(n log n)', 'O(n)'),
  gen: function () { var o = [[[[5, 4], [6, 4], [6, 7], [2, 3]]], [[[1, 1], [1, 1], [1, 1]]], [[[4, 5], [4, 6], [6, 7], [2, 3], [1, 1]]]]; for (var k = 0; k < 37; k++) { var n = randInt(1, 8), env = []; for (var i = 0; i < n; i++) env.push([randInt(1, 8), randInt(1, 8)]); o.push([env]); } return o; },
  ref: function (a) { var env = a[0].slice().sort(function (x, y) { return x[0] - y[0] || y[1] - x[1]; }); var tails = []; for (var i = 0; i < env.length; i++) { var h = env[i][1], lo = 0, hi = tails.length; while (lo < hi) { var mid = (lo + hi) >> 1; if (tails[mid] < h) lo = mid + 1; else hi = mid; } tails[lo] = h; } return tails.length; } });

// ---- Palindrome Partitioning II (STR_INT) ----
MORE26.push({ slug: 'palindrome-partitioning-ii', title: 'Palindrome Partitioning II', difficulty: 'hard', topics: ['String', 'Dynamic Programming'], type: 'STR_INT', langsrc: T.STR_INT('minCut'),
  desc: '<p>Given a string <code>s</code>, partition it so that every substring of the partition is a palindrome. Return the <strong>minimum</strong> number of cuts needed for such a partitioning.</p>',
  examples: [{ in: 's = "aab"', out: '1' }, { in: 's = "a"', out: '0' }, { in: 's = "ab"', out: '1' }],
  constraints: ['1 &lt;= s.length &lt;= 2000', 's consists of lowercase English letters.'],
  editorial: ed('DP with palindrome table', 'cut[i] = min cuts for prefix ending at i using a palindrome table', 'O(n^2)', 'O(n^2)'),
  gen: function () { var o = [['aab'], ['a'], ['ab'], ['aba'], ['abccba'], ['fff'], ['abcba']]; for (var k = 0; k < 34; k++) { var len = randInt(1, 10), s = ''; for (var i = 0; i < len; i++) s += String.fromCharCode(97 + randInt(0, 2)); o.push([s]); } return o; },
  ref: function (a) { var s = a[0], n = s.length; if (n <= 1) return 0; var pal = []; for (var i = 0; i < n; i++) pal.push(new Array(n).fill(false)); var cut = new Array(n).fill(0); for (i = 0; i < n; i++) { var mn = i; for (var j = 0; j <= i; j++) { if (s[j] === s[i] && (i - j < 2 || pal[j + 1][i - 1])) { pal[j][i] = true; mn = j === 0 ? 0 : Math.min(mn, cut[j - 1] + 1); } } cut[i] = mn; } return cut[n - 1]; } });

// ---- Dungeon Game (GRID_INT) ----
MORE26.push({ slug: 'dungeon-game', title: 'Dungeon Game', difficulty: 'hard', topics: ['Array', 'Dynamic Programming', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('calculateMinimumHP'),
  desc: '<p>A knight starts at the top-left cell of <code>grid</code> and must reach the bottom-right cell, moving only right or down. Each cell adds its value to the knight&#39;s health (negative values are demons, positive are potions). The knight dies if health drops to <code>0</code> or below at any point. Return the minimum initial health needed to survive the journey.</p>',
  examples: [{ in: 'dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]', out: '7' }, { in: 'dungeon = [[0]]', out: '1' }],
  constraints: ['1 &lt;= rows, cols &lt;= 200', '-1000 &lt;= grid[i][j] &lt;= 1000'],
  editorial: ed('DP from bottom-right', 'dp[i][j] = max(1, min(down, right) - grid[i][j])', 'O(rows*cols)', 'O(rows*cols)'),
  gen: function () { var o = [[[[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]], [[[0]]], [[[100]]], [[[-3, 5]]]]; for (var k = 0; k < 36; k++) { var R = randInt(1, 5), C = randInt(1, 5); o.push([binGridInt(R, C, -9, 9)]); } return o; },
  ref: function (a) { var g = a[0], R = g.length, C = g[0].length, INF = Infinity, dp = []; for (var i = 0; i <= R; i++) dp.push(new Array(C + 1).fill(INF)); dp[R][C - 1] = 1; dp[R - 1][C] = 1; for (i = R - 1; i >= 0; i--) for (var j = C - 1; j >= 0; j--) { var need = Math.min(dp[i + 1][j], dp[i][j + 1]) - g[i][j]; dp[i][j] = need <= 0 ? 1 : need; } return dp[0][0]; } });

// ---- Cherry Pickup II (GRID_INT) ----
MORE26.push({ slug: 'cherry-pickup-ii', title: 'Cherry Pickup II', difficulty: 'hard', topics: ['Array', 'Dynamic Programming', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('cherryPickup'),
  desc: '<p>Given a <code>grid</code> where each cell holds a number of cherries, two robots start at the top-left <code>(0,0)</code> and top-right <code>(0, cols-1)</code>. Each robot moves down one row at a time to a diagonally-left, straight-down, or diagonally-right cell. When a robot passes a cell it collects its cherries; if both robots are on the same cell only one collection counts. Return the maximum cherries both robots can collect together after reaching the bottom row.</p>',
  examples: [{ in: 'grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]', out: '24' }, { in: 'grid = [[5]]', out: '5' }],
  constraints: ['2 &lt;= rows, cols &lt;= 70', '0 &lt;= grid[i][j] &lt;= 100'],
  editorial: ed('DP over two columns', 'memoize solve(row, col1, col2) over 9 move combinations', 'O(rows*cols^2)', 'O(rows*cols^2)'),
  gen: function () { var o = [[[[3, 1, 1], [2, 5, 1], [1, 5, 5], [2, 1, 1]]], [[[5]]], [[[1, 0, 0, 3]]], [[[2, 2], [2, 2]]]]; for (var k = 0; k < 36; k++) { var R = randInt(1, 5), C = randInt(1, 5); o.push([binGridInt(R, C, 0, 9)]); } return o; },
  ref: function (a) { var g = a[0], R = g.length, C = g[0].length, memo = {}; function solve(r, c1, c2) { if (c1 < 0 || c1 >= C || c2 < 0 || c2 >= C) return -Infinity; var key = r + '_' + c1 + '_' + c2; if (memo[key] !== undefined) return memo[key]; var cur = g[r][c1] + (c1 !== c2 ? g[r][c2] : 0); if (r === R - 1) { memo[key] = cur; return cur; } var best = -Infinity; for (var d1 = -1; d1 <= 1; d1++) for (var d2 = -1; d2 <= 1; d2++) best = Math.max(best, solve(r + 1, c1 + d1, c2 + d2)); memo[key] = cur + best; return cur + best; } return solve(0, 0, C - 1); } });

// ---- Minimum Falling Path Sum II (GRID_INT) ----
MORE26.push({ slug: 'minimum-falling-path-sum-ii', title: 'Minimum Falling Path Sum II', difficulty: 'hard', topics: ['Array', 'Dynamic Programming', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('minFallingPathSum'),
  desc: '<p>Given an <code>n x n</code> integer <code>grid</code>, a falling path with non-zero shifts chooses exactly one element from each row such that no two chosen elements in adjacent rows are in the same column. Return the minimum sum of such a falling path.</p>',
  examples: [{ in: 'grid = [[1,2,3],[4,5,6],[7,8,9]]', out: '13' }, { in: 'grid = [[7]]', out: '7' }],
  constraints: ['n == grid.length == grid[i].length', '1 &lt;= n &lt;= 200', '-99 &lt;= grid[i][j] &lt;= 99'],
  editorial: ed('Track two smallest per row', 'each row adds the smallest previous value unless it shares the column of the minimum, then use the second smallest', 'O(n^2)', 'O(n)'),
  gen: function () { var o = [[[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], [[[7]]], [[[2, 2], [2, 2]]]]; for (var k = 0; k < 37; k++) { var n = randInt(1, 5); o.push([binGridInt(n, n, -9, 9)]); } return o; },
  ref: function (a) { var g = a[0], R = g.length, C = g[0].length, prev = g[0].slice(); for (var r = 1; r < R; r++) { var m1 = Infinity, i1 = -1, m2 = Infinity; for (var c = 0; c < C; c++) { if (prev[c] < m1) { m2 = m1; m1 = prev[c]; i1 = c; } else if (prev[c] < m2) m2 = prev[c]; } var cur = new Array(C); for (c = 0; c < C; c++) cur[c] = g[r][c] + (c === i1 ? m2 : m1); prev = cur; } var ans = Infinity; for (c = 0; c < C; c++) ans = Math.min(ans, prev[c]); return ans; } });

// ---- Frog Jump (ARR_BOOL) ----
MORE26.push({ slug: 'frog-jump', title: 'Frog Jump', difficulty: 'hard', topics: ['Array', 'Dynamic Programming', 'Hash Table'], type: 'ARR_BOOL', langsrc: T.ARR_BOOL('canCross'),
  desc: '<p>A frog crosses a river by hopping on stones. The array <code>nums</code> gives the sorted positions of the stones (in units). The frog starts on the first stone (position 0) and its first jump must be exactly 1 unit. If the last jump was <code>k</code> units, the next jump must be <code>k-1</code>, <code>k</code>, or <code>k+1</code> units and must be strictly positive. Return <code>true</code> if the frog can land on the last stone.</p>',
  examples: [{ in: 'stones = [0,1,3,5,6,8,12,17]', out: 'true' }, { in: 'stones = [0,1,2,3,4,8,9,11]', out: 'false' }],
  constraints: ['2 &lt;= nums.length &lt;= 2000', '0 &lt;= nums[i] &lt;= 2^31 - 1', 'nums[0] == 0 and nums is strictly increasing.'],
  editorial: ed('DP over reachable jump sizes', 'for each stone track the set of jump sizes that can land on it', 'O(n^2)', 'O(n^2)'),
  gen: function () { var o = [[[0, 1, 3, 5, 6, 8, 12, 17]], [[0, 1, 2, 3, 4, 8, 9, 11]], [[0]], [[0, 2]], [[0, 1, 3, 6, 10, 13, 14]]]; for (var k = 0; k < 35; k++) { var stones = [0], cur = 0, len = randInt(1, 9); for (var i = 0; i < len; i++) { cur += randInt(1, 3); stones.push(cur); } o.push([stones]); } return o; },
  ref: function (a) { var stones = a[0], n = stones.length; if (n === 1) return true; var pos = {}; for (var i = 0; i < n; i++) pos[stones[i]] = i; var dp = []; for (i = 0; i < n; i++) dp.push({}); dp[0][0] = true; for (i = 0; i < n; i++) { for (var kk in dp[i]) { var k = +kk; for (var step = k - 1; step <= k + 1; step++) { if (step > 0) { var np = stones[i] + step; if (pos[np] !== undefined) dp[pos[np]][step] = true; } } } } return Object.keys(dp[n - 1]).length > 0; } });

// ---- Shortest Subarray with Sum at Least K (ARR_TGT_INT) ----
MORE26.push({ slug: 'shortest-subarray-with-sum-at-least-k', title: 'Shortest Subarray with Sum at Least K', difficulty: 'hard', topics: ['Array', 'Prefix Sum', 'Sliding Window', 'Deque'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('shortestSubarray'),
  desc: '<p>Given an integer array <code>nums</code> and an integer <code>target</code>, return the length of the <strong>shortest</strong> non-empty contiguous subarray whose sum is at least <code>target</code>. If there is no such subarray, return <code>-1</code>.</p>',
  examples: [{ in: 'nums = [1], target = 1', out: '1' }, { in: 'nums = [1,2], target = 4', out: '-1' }, { in: 'nums = [2,-1,2], target = 3', out: '3' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '-10^5 &lt;= nums[i] &lt;= 10^5', '1 &lt;= target &lt;= 10^9'],
  editorial: ed('Monotonic deque on prefix sums', 'maintain an increasing deque of prefix sums to find the shortest qualifying window', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[1], 1], [[1, 2], 4], [[2, -1, 2], 3], [[84, -37, 32, 40, 95], 167]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 12), -5, 8), randInt(1, 15)]); return o; },
  ref: function (a) { var nums = a[0], K = a[1], n = nums.length, best = Infinity; for (var i = 0; i < n; i++) { var s = 0; for (var j = i; j < n; j++) { s += nums[j]; if (s >= K) { best = Math.min(best, j - i + 1); break; } } } return best === Infinity ? -1 : best; } });

// ---- Minimum Number of K Consecutive Bit Flips (ARR_TGT_INT) ----
MORE26.push({ slug: 'minimum-number-of-k-consecutive-bit-flips', title: 'Minimum Number of K Consecutive Bit Flips', difficulty: 'hard', topics: ['Array', 'Bit Manipulation', 'Sliding Window', 'Prefix Sum'], type: 'ARR_TGT_INT', langsrc: T.ARR_TGT_INT('minKBitFlips'),
  desc: '<p>You are given a binary array <code>nums</code> and an integer <code>target</code> (the flip window length <code>k</code>). In one operation you choose a contiguous subarray of length exactly <code>k</code> and flip every bit in it. Return the minimum number of operations needed to make every element <code>1</code>, or <code>-1</code> if it is impossible.</p>',
  examples: [{ in: 'nums = [0,1,0], target = 1', out: '2' }, { in: 'nums = [1,1,0], target = 2', out: '-1' }, { in: 'nums = [0,0,0,1,0,1,1,0], target = 3', out: '3' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '1 &lt;= target &lt;= nums.length', 'nums[i] is 0 or 1.'],
  editorial: ed('Greedy with difference array', 'sweep left to right; flip whenever the current bit is 0, tracking the active flip parity with a hint array', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[0, 1, 0], 1], [[1, 1, 0], 2], [[0, 0, 0, 1, 0, 1, 1, 0], 3], [[1], 1]]; for (var k = 0; k < 36; k++) { var n = randInt(1, 12), bits = []; for (var i = 0; i < n; i++) bits.push(randInt(0, 1)); o.push([bits, randInt(1, n)]); } return o; },
  ref: function (a) { var A = a[0], K = a[1], n = A.length, hint = new Array(n).fill(0), flip = 0, ans = 0; for (var i = 0; i < n; i++) { if (i >= K) flip ^= hint[i - K]; if (((A[i] + flip) & 1) === 0) { if (i + K > n) return -1; ans++; flip ^= 1; hint[i] = 1; } } return ans; } });

// ---- Jump Game IV (ARR_INT) ----
MORE26.push({ slug: 'jump-game-iv', title: 'Jump Game IV', difficulty: 'hard', topics: ['Array', 'BFS', 'Hash Table'], type: 'ARR_INT', langsrc: T.ARR_INT('minJumps'),
  desc: '<p>Given an integer array <code>nums</code>, you start at index 0. From index <code>i</code> you can move to <code>i+1</code>, <code>i-1</code>, or any index <code>j</code> with <code>nums[j] == nums[i]</code> (all within bounds). Return the minimum number of steps to reach the last index.</p>',
  examples: [{ in: 'nums = [100,-23,-23,404,100,23,23,23,3,404]', out: '3' }, { in: 'nums = [7]', out: '0' }, { in: 'nums = [7,6,9,6,9,6,9,7]', out: '1' }],
  constraints: ['1 &lt;= nums.length &lt;= 5*10^4', '-10^8 &lt;= nums[i] &lt;= 10^8'],
  editorial: ed('BFS with value buckets', 'BFS over indices; group indices by value and clear a value bucket after first use', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[100, -23, -23, 404, 100, 23, 23, 23, 3, 404]], [[7]], [[7, 6, 9, 6, 9, 6, 9, 7]], [[1, 1, 1, 1, 1]]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 12), -5, 5)]); return o; },
  ref: function (a) { var arr = a[0], n = arr.length; if (n <= 1) return 0; var val = {}; for (var i = 0; i < n; i++) { if (!val[arr[i]]) val[arr[i]] = []; val[arr[i]].push(i); } var visited = new Array(n).fill(false), usedVal = {}; visited[0] = true; var q = [0], steps = 0; while (q.length) { var nq = []; for (var x = 0; x < q.length; x++) { var idx = q[x]; if (idx === n - 1) return steps; if (val[arr[idx]] && !usedVal[arr[idx]]) { var lst = val[arr[idx]]; for (var t = 0; t < lst.length; t++) { var j = lst[t]; if (!visited[j]) { visited[j] = true; nq.push(j); } } usedVal[arr[idx]] = true; } if (idx + 1 < n && !visited[idx + 1]) { visited[idx + 1] = true; nq.push(idx + 1); } if (idx - 1 >= 0 && !visited[idx - 1]) { visited[idx - 1] = true; nq.push(idx - 1); } } q = nq; steps++; } return -1; } });

// ---- Minimize Deviation in Array (ARR_INT) ----
MORE26.push({ slug: 'minimize-deviation-in-array', title: 'Minimize Deviation in Array', difficulty: 'hard', topics: ['Array', 'Greedy', 'Heap'], type: 'ARR_INT', langsrc: T.ARR_INT('minimumDeviation'),
  desc: '<p>Given an array <code>nums</code> of positive integers, you may repeatedly apply two operations any number of times: if an element is even you may halve it, and if an element is odd you may double it. The deviation is the difference between the maximum and minimum elements. Return the minimum possible deviation.</p>',
  examples: [{ in: 'nums = [1,2,3,4]', out: '1' }, { in: 'nums = [4,1,5,20,3]', out: '3' }, { in: 'nums = [2,10,8]', out: '3' }],
  constraints: ['1 &lt;= nums.length &lt;= 10^5', '1 &lt;= nums[i] &lt;= 10^9'],
  editorial: ed('Heap of maxima', 'double all odds once, then repeatedly halve the current maximum while it is even, tracking the running minimum', 'O(n log n log maxVal)', 'O(n)'),
  gen: function () { var o = [[[1, 2, 3, 4]], [[4, 1, 5, 20, 3]], [[2, 10, 8]], [[1]]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 8), 1, 20)]); return o; },
  ref: function (a) { var arr = a[0].map(function (x) { return x % 2 ? x * 2 : x; }); var mn = Math.min.apply(null, arr); var res = Infinity; while (true) { var mx = -Infinity, idx = -1; for (var i = 0; i < arr.length; i++) if (arr[i] > mx) { mx = arr[i]; idx = i; } res = Math.min(res, mx - mn); if (mx % 2 === 1) break; arr[idx] = mx / 2; if (arr[idx] < mn) mn = arr[idx]; } return res; } });

// ---- Median of Two Sorted Arrays (ARR_ARR_INT -> uses ARR_INT_INT with custom) ----
MORE26.push({ slug: 'median-of-two-sorted-arrays', title: 'Median of Two Sorted Arrays', difficulty: 'hard', topics: ['Array', 'Binary Search', 'Divide and Conquer'], type: 'ARR_ARR_INT',
  langsrc: T.ARR_ARR_INT('findMedianSortedArrays'),
  desc: '<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size m and n respectively, return the <strong>median</strong> of the two sorted arrays. The overall run time complexity should be O(log(m+n)).</p><p>The median of an array of length L is the (L/2)-th element if L is odd, or the average of the (L/2-1)-th and (L/2)-th elements if L is even (0-indexed, integer division). For this problem, return the integer part (floor) of the median.</p>',
  examples: [{ in: 'nums1 = [1,3], nums2 = [2]', out: '2' }, { in: 'nums1 = [1,2], nums2 = [3,4]', out: '2' }],
  constraints: ['0 &lt;= m, n &lt;= 1000', '1 &lt;= m + n', '-10^6 &lt;= nums1[i], nums2[i] &lt;= 10^6', 'Both arrays are sorted in non-decreasing order.'],
  editorial: ed('Merge + median', 'Merge the two sorted arrays and pick the middle element(s). Return floor of median.', 'O(m+n)', 'O(m+n)'),
  gen: function () { var o = [[[1, 3], [2]], [[1, 2], [3, 4]], [[], [1]], [[2], []]]; for (var k = 0; k < 36; k++) { var a = randArr(randInt(0, 8), -10, 10).sort(function (x, y) { return x - y; }); var b = randArr(randInt(0, 8), -10, 10).sort(function (x, y) { return x - y; }); if (!a.length && !b.length) b = [0]; o.push([a, b]); } return o; },
  ref: function (a) { var merged = a[0].concat(a[1]).sort(function (x, y) { return x - y; }); var n = merged.length; if (n % 2 === 1) return merged[Math.floor(n / 2)]; return Math.floor((merged[Math.floor(n / 2) - 1] + merged[Math.floor(n / 2)]) / 2); } });

// ---- Text Justification (STR_INT -> custom: returns joined string lines count) ----
MORE26.push({ slug: 'count-text-justification-lines', title: 'Text Justification Line Count', difficulty: 'hard', topics: ['Array', 'String', 'Greedy', 'Simulation'], type: 'ARR_TGT_INT',
  langsrc: T.ARR_TGT_INT('countLines'),
  desc: '<p>Given an array of words <code>nums</code> (encoded as lengths) and a max width <code>target</code>, pack words into lines greedily (as many as fit with at least one space between them). Return the number of lines needed.</p>',
  examples: [{ in: 'wordLengths = [4,2,3,7,1,1,1,3,2,2,1], maxWidth = 8', out: '5' }, { in: 'wordLengths = [1,1,1,1], maxWidth = 3', out: '2' }],
  constraints: ['1 &lt;= nums.length &lt;= 300', '1 &lt;= nums[i] &lt;= target', '1 &lt;= target &lt;= 100'],
  editorial: ed('Greedy line packing', 'Iterate words; fit as many on the current line as possible (word + 1 space each except first); start a new line when the next word would exceed maxWidth.', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[4, 2, 3, 7, 1, 1, 1, 3, 2, 2, 1], 8], [[1, 1, 1, 1], 3], [[5], 5], [[3, 3, 3], 3]]; for (var k = 0; k < 36; k++) { var mw = randInt(4, 12); var ws = []; var wn = randInt(1, 15); for (var i = 0; i < wn; i++) ws.push(randInt(1, mw)); o.push([ws, mw]); } return o; },
  ref: function (a) { var words = a[0], mw = a[1], lines = 1, cur = 0; for (var i = 0; i < words.length; i++) { if (cur === 0) { cur = words[i]; } else if (cur + 1 + words[i] <= mw) { cur += 1 + words[i]; } else { lines++; cur = words[i]; } } return lines; } });

// ---- Minimum Cost to Hire K Workers (ARR_TGT_INT) ----
MORE26.push({ slug: 'minimum-cost-to-hire-k-workers', title: 'Minimum Cost to Hire K Workers', difficulty: 'hard', topics: ['Array', 'Greedy', 'Sorting', 'Heap'], type: 'ARR_TGT_INT',
  langsrc: T.ARR_TGT_INT('mincostToHireWorkers'),
  desc: '<p>There are <code>n</code> workers. Worker <code>i</code> has quality <code>nums[i]</code> (first n/2 of the array) and minimum wage expectation <code>nums[i]</code> (second n/2). You want to hire exactly <code>target</code> workers. In a paid group, each worker is paid in proportion to their quality relative to the group, and each must receive at least their minimum wage. Return the minimum total cost (integer part) to hire exactly <code>target</code> workers.</p><p><b>Encoding:</b> <code>nums</code> has 2k elements: first k are qualities, next k are wages. <code>target</code> is the number to hire.</p>',
  examples: [{ in: 'nums = [10,20,5,70,50,30], target = 2', out: '105' }, { in: 'nums = [3,1,10,10,1,1], target = 2', out: '2' }],
  constraints: ['2 &lt;= n &lt;= 50 (n = nums.length / 2)', '1 &lt;= target &lt;= n', '1 &lt;= quality[i], wage[i] &lt;= 10^4'],
  editorial: ed('Sort by ratio + max-heap on quality', 'Sort workers by wage/quality ratio. Iterate; maintain a max-heap of the k smallest qualities seen so far. The cost is ratio * sumOfQualities.', 'O(n log n)', 'O(n)'),
  gen: function () { var o = [[[10, 20, 5, 70, 50, 30], 2], [[3, 1, 10, 10, 1, 1], 2]]; for (var k = 0; k < 38; k++) { var n = randInt(2, 6); var q = randArr(n, 1, 20); var w = randArr(n, 1, 50); var target = randInt(1, n); o.push([q.concat(w), target]); } return o; },
  ref: function (a) { var nums = a[0], target = a[1]; var n = nums.length / 2; var q = nums.slice(0, n), w = nums.slice(n); var workers = []; for (var i = 0; i < n; i++) workers.push({ ratio: w[i] / q[i], quality: q[i] }); workers.sort(function (a, b) { return a.ratio - b.ratio; }); var best = Infinity, sumQ = 0, heap = []; for (var i = 0; i < workers.length; i++) { heap.push(workers[i].quality); sumQ += workers[i].quality; heap.sort(function (a, b) { return b - a; }); if (heap.length > target) { sumQ -= heap.shift(); } if (heap.length === target) { var cost = sumQ * workers[i].ratio; if (cost < best) best = cost; } } return Math.floor(best); } });

// ---- Alien Dictionary (custom: encoded as edges -> topological order length or -1) ----
MORE26.push({ slug: 'minimum-height-trees', title: 'Minimum Height Trees', difficulty: 'hard', topics: ['Graph', 'BFS', 'Topological Sort'], type: 'INT_EDGES_INT',
  langsrc: T.INT_EDGES_INT('findMinHeightTreesCount'),
  desc: '<p>Given a tree of <code>n</code> nodes labeled from <code>0</code> to <code>n-1</code> with <code>n-1</code> edges, return the <strong>number</strong> of nodes that could be the root of a Minimum Height Tree (MHT). A MHT is one where the longest path from root to any leaf is minimized.</p>',
  examples: [{ in: 'n = 4, edges = [[1,0],[1,2],[1,3]]', out: '1' }, { in: 'n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]', out: '2' }],
  constraints: ['1 &lt;= n &lt;= 2*10^4', 'edges.length == n - 1', 'The graph is a valid tree.'],
  editorial: ed('Leaf trimming (topological peel)', 'Repeatedly remove all current leaves; the 1-2 nodes remaining are MHT roots.', 'O(n)', 'O(n)'),
  gen: function () { var o = [[4, [[1, 0], [1, 2], [1, 3]]], [6, [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]]], [1, []], [2, [[0, 1]]]]; for (var k = 0; k < 36; k++) { var n = randInt(2, 12); var edges = []; for (var i = 1; i < n; i++) { edges.push([i, randInt(0, i - 1)]); } o.push([n, edges]); } return o; },
  ref: function (a) { var n = a[0], edges = a[1]; if (n <= 2) return n; var adj = []; for (var i = 0; i < n; i++) adj.push([]); var deg = new Array(n).fill(0); for (var i = 0; i < edges.length; i++) { adj[edges[i][0]].push(edges[i][1]); adj[edges[i][1]].push(edges[i][0]); deg[edges[i][0]]++; deg[edges[i][1]]++; } var leaves = []; for (var i = 0; i < n; i++) if (deg[i] === 1) leaves.push(i); var remaining = n; while (remaining > 2) { var nl = []; remaining -= leaves.length; for (var i = 0; i < leaves.length; i++) { var v = leaves[i]; for (var j = 0; j < adj[v].length; j++) { var u = adj[v][j]; deg[u]--; if (deg[u] === 1) nl.push(u); } } leaves = nl; } return remaining; } });

module.exports = { MORE26 };
