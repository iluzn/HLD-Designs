// Batch 30: famous HARD problems — backtracking, math/greedy, game-theory DP,
// interval DP, and plane geometry. Types restricted to the verified-safe set:
// INT_INT, INT_INT_INT, ARR_INT, ARR_BOOL, GRID_INT, ARR_INT_INT.
// Every output is a single deterministic int or bool so the multi-case harness
// stays unambiguous. Inputs are kept small (n<=9 for backtracking) so the pure
// JS refs run fast.
const { T, randInt, randArr, ln } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}
function randDistinctPoints(p, lo, hi) {
  var seen = {}, arr = [], tries = 0;
  while (arr.length < p && tries < 400) {
    var x = randInt(lo, hi), y = randInt(lo, hi), key = x + ',' + y; tries++;
    if (!seen[key]) { seen[key] = 1; arr.push([x, y]); }
  }
  return arr;
}
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }

const MORE30 = [];

// ---- N-Queens II (backtracking, bitmask) ----
MORE30.push({ slug: 'n-queens-ii', title: 'N-Queens II', difficulty: 'hard', topics: ['Backtracking'], type: 'INT_INT', langsrc: T.INT_INT('totalNQueens'),
  desc: '<p>The n-queens puzzle places <code>n</code> queens on an <code>n x n</code> chessboard so that no two queens attack each other (no shared row, column, or diagonal). Given an integer <code>n</code>, return the number of distinct solutions.</p>',
  examples: [{ in: 'n = 4', out: '2' }, { in: 'n = 1', out: '1' }, { in: 'n = 8', out: '92' }],
  constraints: ['1 &lt;= n &lt;= 9'],
  editorial: ed('Backtracking with bitmasks', 'Track occupied columns and both diagonal sets as bitmasks.\nAt each row pick any free column, mark the three masks, recurse to the next row, shifting the diagonal masks.\nCount a solution whenever every column is filled.', 'O(n!)', 'O(n)'),
  gen: function () { var o = [[1], [4], [5], [6], [8]]; for (var k = 0; k < 35; k++) o.push([randInt(1, 8)]); return o; },
  ref: function (a) {
    var n = a[0], count = 0, all = (1 << n) - 1;
    function solve(cols, d1, d2) {
      if (cols === all) { count++; return; }
      var avail = all & ~(cols | d1 | d2);
      while (avail) { var p = avail & (-avail); avail -= p; solve(cols | p, (d1 | p) << 1, (d2 | p) >> 1); }
    }
    solve(0, 0, 0);
    return count;
  } });

// ---- Integer Replacement (greedy / bit) ----
MORE30.push({ slug: 'integer-replacement', title: 'Integer Replacement', difficulty: 'hard', topics: ['Math', 'Bit Manipulation', 'Greedy'], type: 'INT_INT', langsrc: T.INT_INT('integerReplacement'),
  desc: '<p>Given a positive integer <code>n</code>, in one operation you may replace <code>n</code> by <code>n / 2</code> if it is even, or by <code>n + 1</code> or <code>n - 1</code> if it is odd. Return the minimum number of operations needed for <code>n</code> to become <code>1</code>.</p>',
  examples: [{ in: 'n = 8', out: '3', ex: '8 -> 4 -> 2 -> 1.' }, { in: 'n = 7', out: '4', ex: '7 -> 8 -> 4 -> 2 -> 1.' }, { in: 'n = 1', out: '0' }],
  constraints: ['1 &lt;= n &lt;= 2^31 - 1'],
  editorial: ed('Greedy on the two lowest bits', 'If n is even, halve it.\nIf n is odd, prefer the move that makes the next number divisible by 4 (n+1), except for n == 3 where n-1 is better.\nCount steps until n == 1.', 'O(log n)', 'O(1)'),
  gen: function () { var o = [[8], [7], [1], [2], [65535]]; for (var k = 0; k < 35; k++) o.push([randInt(1, 100000)]); return o; },
  ref: function (a) { var n = a[0], c = 0; while (n !== 1) { if (n % 2 === 0) n = n / 2; else if (n === 3 || n % 4 === 1) n -= 1; else n += 1; c++; } return c; } });

// ---- Consecutive Numbers Sum (math) ----
MORE30.push({ slug: 'consecutive-numbers-sum', title: 'Consecutive Numbers Sum', difficulty: 'hard', topics: ['Math'], type: 'INT_INT', langsrc: T.INT_INT('consecutiveNumbersSum'),
  desc: '<p>Given an integer <code>n</code>, return the number of ways to write it as a sum of consecutive positive integers.</p>',
  examples: [{ in: 'n = 5', out: '2', ex: '5 = 5 = 2 + 3.' }, { in: 'n = 9', out: '3', ex: '9 = 9 = 4 + 5 = 2 + 3 + 4.' }, { in: 'n = 15', out: '4' }],
  constraints: ['1 &lt;= n &lt;= 10^9'],
  editorial: ed('Count valid run lengths', 'A run of length k starting at a >= 1 sums to k*a + k(k-1)/2 = n.\nFor each k while k(k-1)/2 < n, the run is valid iff (n - k(k-1)/2) is divisible by k.\nCount all such k.', 'O(sqrt n)', 'O(1)'),
  gen: function () { var o = [[5], [9], [15], [1], [3]]; for (var k = 0; k < 35; k++) o.push([randInt(1, 100000)]); return o; },
  ref: function (a) { var n = a[0], count = 0, k = 1; while (k * (k - 1) / 2 < n) { var rem = n - k * (k - 1) / 2; if (rem % k === 0) count++; k++; } return count; } });

// ---- Numbers With Repeated Digits (counting) ----
MORE30.push({ slug: 'numbers-with-repeated-digits', title: 'Numbers With Repeated Digits', difficulty: 'hard', topics: ['Math', 'Dynamic Programming'], type: 'INT_INT', langsrc: T.INT_INT('numDupDigitsAtMostN'),
  desc: '<p>Given an integer <code>n</code>, return the count of positive integers in the range <code>[1, n]</code> that have at least one repeated digit.</p>',
  examples: [{ in: 'n = 20', out: '1', ex: 'Only 11 has a repeated digit.' }, { in: 'n = 100', out: '10' }, { in: 'n = 1000', out: '262' }],
  constraints: ['1 &lt;= n &lt;= 10^9'],
  editorial: ed('Total minus digit-distinct count', 'Count integers with all-distinct digits via combinatorics, then subtract from n.\nAn equivalent direct count scans each number and checks for a repeated digit.', 'O(n * d) direct, O(d^2) combinatorial', 'O(1)'),
  gen: function () { var o = [[20], [100], [1000], [1], [9]]; for (var k = 0; k < 35; k++) o.push([randInt(1, 20000)]); return o; },
  ref: function (a) {
    var n = a[0], count = 0;
    for (var i = 1; i <= n; i++) {
      var s = '' + i, seen = 0, dup = false;
      for (var j = 0; j < s.length; j++) { var b = 1 << (s.charCodeAt(j) - 48); if (seen & b) { dup = true; break; } seen |= b; }
      if (dup) count++;
    }
    return count;
  } });

// ---- Super Egg Drop (DP) ----
MORE30.push({ slug: 'super-egg-drop', title: 'Super Egg Drop', difficulty: 'hard', topics: ['Math', 'Dynamic Programming', 'Binary Search'], type: 'INT_INT_INT', langsrc: T.INT_INT_INT('superEggDrop'),
  desc: '<p>You have <code>a</code> identical eggs and a building with <code>b</code> floors. An egg breaks if dropped at or above some unknown critical floor and survives below it. Each move drops one egg from a chosen floor. Return the minimum number of moves that guarantees finding the critical floor in the worst case.</p>',
  examples: [{ in: 'a = 1, b = 2', out: '2' }, { in: 'a = 2, b = 6', out: '3' }, { in: 'a = 3, b = 14', out: '4' }],
  constraints: ['1 &lt;= a &lt;= 100', '1 &lt;= b &lt;= 10^4'],
  editorial: ed('Moves-first DP', 'Let f(m, e) = highest number of floors solvable with m moves and e eggs.\nf(m, e) = f(m-1, e-1) + f(m-1, e) + 1.\nIncrease m until f(m, a) >= b; return that m.', 'O(a * log b)', 'O(a)'),
  gen: function () { var o = [[1, 2], [2, 6], [3, 14], [2, 100], [4, 200]]; for (var k = 0; k < 35; k++) o.push([randInt(1, 6), randInt(1, 200)]); return o; },
  ref: function (a) {
    var k = a[0], n = a[1], dp = new Array(k + 1).fill(0), m = 0;
    while (dp[k] < n) { m++; for (var e = k; e >= 1; e--) dp[e] = dp[e] + dp[e - 1] + 1; }
    return m;
  } });

// ---- Largest Multiple of Three (greedy / digits) ----
MORE30.push({ slug: 'largest-multiple-of-three', title: 'Largest Multiple of Three', difficulty: 'hard', topics: ['Array', 'Dynamic Programming', 'Greedy', 'Sorting'], type: 'ARR_INT', langsrc: T.ARR_INT('largestMultipleOfThree'),
  desc: '<p>Given an array <code>nums</code> of digits (each 0-9), form the largest possible multiple of three by concatenating some of the digits, using each at most once. Return that number as an integer. If no non-empty selection is a multiple of three, return <code>-1</code>. If the largest value you can form is <code>0</code> (only zeros usable), return <code>0</code>.</p>',
  examples: [{ in: 'nums = [8,1,9]', out: '981' }, { in: 'nums = [8,6,7,1,0]', out: '8760' }, { in: 'nums = [1]', out: '-1' }],
  constraints: ['1 &lt;= nums.length &lt;= 7', '0 &lt;= nums[i] &lt;= 9'],
  editorial: ed('Remove minimal digits by remainder', 'The whole sum mod 3 tells how much to drop.\nIf remainder r != 0, drop the smallest single digit with digit%3 == r, else drop the two smallest digits with digit%3 == 3-r.\nSort the survivors descending; collapse an all-zero result to 0.', 'O(n log n)', 'O(n)'),
  gen: function () {
    var o = [[[8, 1, 9]], [[8, 6, 7, 1, 0]], [[1]], [[0]], [[0, 0, 0]], [[3, 6, 5, 0]]];
    for (var k = 0; k < 34; k++) { var m = randInt(1, 7), arr = []; for (var i = 0; i < m; i++) arr.push(randInt(0, 9)); o.push([arr]); }
    return o;
  },
  ref: function (a) {
    var d = a[0].slice().sort(function (x, y) { return x - y; });
    var sum = 0; for (var i = 0; i < d.length; i++) sum += d[i];
    var r = sum % 3;
    if (r !== 0) {
      var idx = -1;
      for (i = 0; i < d.length; i++) if (d[i] % 3 === r) { idx = i; break; }
      if (idx >= 0) d.splice(idx, 1);
      else {
        var need = 3 - r, removed = 0; i = 0;
        while (i < d.length && removed < 2) { if (d[i] % 3 === need) { d.splice(i, 1); removed++; } else i++; }
        if (removed < 2) return -1;
      }
    }
    if (d.length === 0) return -1;
    d.sort(function (x, y) { return y - x; });
    if (d[0] === 0) return 0;
    var val = 0; for (i = 0; i < d.length; i++) val = val * 10 + d[i];
    return val;
  } });

// ---- Self Crossing (geometry / simulation) ----
MORE30.push({ slug: 'self-crossing', title: 'Self Crossing', difficulty: 'hard', topics: ['Array', 'Math', 'Geometry'], type: 'ARR_BOOL', langsrc: T.ARR_BOOL('isSelfCrossing'),
  desc: '<p>You start at the origin and move counter-clockwise: <code>nums[0]</code> north, <code>nums[1]</code> west, <code>nums[2]</code> south, <code>nums[3]</code> east, and so on. Given the distance array <code>nums</code>, return <code>true</code> if the path crosses itself, otherwise <code>false</code>.</p>',
  examples: [{ in: 'nums = [2,1,1,2]', out: 'true' }, { in: 'nums = [1,2,3,4]', out: 'false' }, { in: 'nums = [1,1,1,1]', out: 'true' }],
  constraints: ['1 &lt;= nums.length &lt;= 8', '1 &lt;= nums[i] &lt;= 8'],
  editorial: ed('Three crossing patterns', 'Only three geometric cases produce a crossing.\nCurrent segment crosses the one 3 back; overlaps the one 4 back; or crosses the one 6 back.\nCheck each pattern while scanning; return true on the first hit.', 'O(n)', 'O(1)'),
  gen: function () {
    var o = [[[2, 1, 1, 2]], [[1, 2, 3, 4]], [[1, 1, 1, 1]], [[3, 3, 4, 2, 2]], [[1, 1, 2, 1, 1]]];
    for (var k = 0; k < 35; k++) { var m = randInt(1, 8), arr = []; for (var i = 0; i < m; i++) arr.push(randInt(1, 8)); o.push([arr]); }
    return o;
  },
  ref: function (a) {
    var x = a[0], n = x.length;
    for (var i = 3; i < n; i++) {
      if (x[i] >= x[i - 2] && x[i - 1] <= x[i - 3]) return true;
      if (i >= 4 && x[i - 1] === x[i - 3] && x[i] + x[i - 4] >= x[i - 2]) return true;
      if (i >= 5 && x[i - 2] >= x[i - 4] && x[i] + x[i - 4] >= x[i - 2] && x[i - 1] <= x[i - 3] && x[i - 1] + x[i - 5] >= x[i - 3]) return true;
    }
    return false;
  } });

// ---- Minimum Cost to Merge Stones (interval DP) ----
MORE30.push({ slug: 'minimum-cost-to-merge-stones', title: 'Minimum Cost to Merge Stones', difficulty: 'hard', topics: ['Array', 'Dynamic Programming', 'Prefix Sum'], type: 'ARR_INT_INT', langsrc: T.ARR_INT_INT('mergeStones'),
  desc: '<p>You have <code>nums.length</code> piles of stones arranged in a row; <code>nums[i]</code> is the number of stones in pile <code>i</code>. In one move you merge exactly <code>k</code> consecutive piles into a single pile, and the cost of that move equals the total number of stones in those <code>k</code> piles. Return the minimum total cost to merge all piles into one pile. If it is impossible, return <code>-1</code>.</p>',
  examples: [{ in: 'stones = [3,2,4,1], k = 2', out: '20' }, { in: 'stones = [3,2,4,1], k = 3', out: '-1' }, { in: 'stones = [3,5,1,2,6], k = 3', out: '25' }],
  constraints: ['1 &lt;= nums.length &lt;= 30', '2 &lt;= k &lt;= 30', '1 &lt;= nums[i] &lt;= 100'],
  editorial: ed('Interval DP with prefix sums', 'It is possible to end with one pile iff (n - 1) % (k - 1) == 0.\ndp[i][j] = min cost to merge piles[i..j] into the fewest possible piles.\nSplit at mid stepping by k-1: dp[i][j] = min(dp[i][mid] + dp[mid+1][j]); when the whole window collapses to one pile add its total.', 'O(n^3 / k)', 'O(n^2)'),
  gen: function () {
    var o = [[[3, 2, 4, 1], 2], [[3, 2, 4, 1], 3], [[3, 5, 1, 2, 6], 3], [[1], 2], [[6], 5], [[1, 2, 3, 4, 5], 2], [[2, 2, 2, 2, 2, 2, 2], 3]];
    for (var t = 0; t < 33; t++) { var m = randInt(1, 9), arr = randArr(m, 1, 9), k = randInt(2, 4); o.push([arr, k]); }
    return o;
  },
  ref: function (a) {
    var stones = a[0], k = a[1], n = stones.length;
    if (k < 2) return -1;
    if ((n - 1) % (k - 1) !== 0) return -1;
    var prefix = new Array(n + 1).fill(0);
    for (var i = 0; i < n; i++) prefix[i + 1] = prefix[i] + stones[i];
    var dp = []; for (i = 0; i < n; i++) dp.push(new Array(n).fill(0));
    for (var len = k; len <= n; len++) {
      for (i = 0; i + len - 1 < n; i++) {
        var j = i + len - 1, best = Infinity;
        for (var mid = i; mid < j; mid += k - 1) best = Math.min(best, dp[i][mid] + dp[mid + 1][j]);
        dp[i][j] = best;
        if ((len - 1) % (k - 1) === 0) dp[i][j] += prefix[j + 1] - prefix[i];
      }
    }
    return dp[0][n - 1];
  } });

// ---- Matchsticks to Square (backtracking) ----
MORE30.push({ slug: 'matchsticks-to-square', title: 'Matchsticks to Square', difficulty: 'hard', topics: ['Array', 'Backtracking', 'Bitmask', 'Dynamic Programming'], type: 'ARR_BOOL', langsrc: T.ARR_BOOL('makesquare'),
  desc: '<p>You are given an array <code>nums</code> where <code>nums[i]</code> is the length of the i-th matchstick. You must use <strong>every</strong> matchstick exactly once, joining them (without breaking any) to form a square. Return <code>true</code> if you can form a square, otherwise <code>false</code>.</p>',
  examples: [{ in: 'matchsticks = [1,1,2,2,2]', out: 'true', ex: 'Sides of length 2: {2},{2},{2},{1,1}.' }, { in: 'matchsticks = [3,3,3,3,4]', out: 'false' }],
  constraints: ['1 &lt;= nums.length &lt;= 15', '1 &lt;= nums[i] &lt;= 10^8'],
  editorial: ed('DFS placing each stick into a side', 'If the total is not divisible by 4 or the longest stick exceeds a side, it fails.\nSort descending and try to place each matchstick into one of four side buckets, pruning duplicate bucket sums, until every stick is placed.', 'O(4^n)', 'O(n)'),
  gen: function () {
    var o = [[[1, 1, 2, 2, 2]], [[3, 3, 3, 3, 4]], [[5, 5, 5, 5]], [[1, 1, 1, 1]], [[2, 2, 2, 2, 2, 2, 2, 2]], [[1, 2, 3]], [[4, 4, 4, 4, 8, 8]]];
    for (var t = 0; t < 33; t++) { var m = randInt(1, 9), arr = randArr(m, 1, 6); o.push([arr]); }
    return o;
  },
  ref: function (a) {
    var m = a[0], n = m.length, sum = 0;
    for (var i = 0; i < n; i++) sum += m[i];
    if (n < 4 || sum % 4 !== 0) return false;
    var side = sum / 4;
    var arr = m.slice().sort(function (x, y) { return y - x; });
    if (arr[0] > side) return false;
    var sides = [0, 0, 0, 0];
    function dfs(idx) {
      if (idx === n) return true;
      for (var s = 0; s < 4; s++) {
        if (s > 0 && sides[s] === sides[s - 1]) continue;
        if (sides[s] + arr[idx] <= side) {
          sides[s] += arr[idx];
          if (dfs(idx + 1)) return true;
          sides[s] -= arr[idx];
        }
      }
      return false;
    }
    return dfs(0);
  } });

// ---- Minimum Number of Taps to Open to Water a Garden (greedy / jump) ----
MORE30.push({ slug: 'minimum-number-of-taps-to-open-to-water-a-garden', title: 'Minimum Number of Taps to Open to Water a Garden', difficulty: 'hard', topics: ['Array', 'Dynamic Programming', 'Greedy'], type: 'ARR_INT_INT', langsrc: T.ARR_INT_INT('minTaps'),
  desc: '<p>A garden is a one-dimensional interval <code>[0, k]</code>. There are <code>nums.length == k + 1</code> taps, one at each integer point <code>i</code>. Tap <code>i</code> waters the area <code>[i - nums[i], i + nums[i]]</code>. Return the minimum number of taps to open so the whole garden is watered, or <code>-1</code> if it is impossible.</p>',
  examples: [{ in: 'ranges = [3,4,1,1,0,0], n = 5', out: '1' }, { in: 'ranges = [0,0,0,0], n = 3', out: '-1' }, { in: 'ranges = [1,2,1,0,2,1,0,1], n = 7', out: '3' }],
  constraints: ['1 &lt;= k &lt;= 10^4', 'nums.length == k + 1', '0 &lt;= nums[i] &lt;= 100'],
  editorial: ed('Interval-to-jump greedy', 'Convert each tap to the interval it covers, and for every left endpoint keep the farthest right it can reach.\nSweep left to right like Jump Game II: extend the reachable end with the best tap whose start is within the current window; if it never advances, return -1.', 'O(n)', 'O(n)'),
  gen: function () {
    var o = [[[3, 4, 1, 1, 0, 0], 5], [[0, 0, 0, 0], 3], [[1, 2, 1, 0, 2, 1, 0, 1], 7], [[0], 0], [[2], 1], [[3, 1, 1, 2, 1, 3], 5]];
    for (var t = 0; t < 34; t++) { var n = randInt(1, 9), arr = randArr(n + 1, 0, 4); o.push([arr, n]); }
    return o;
  },
  ref: function (a) {
    var ranges = a[0], n = a[1];
    var maxReach = new Array(n + 1).fill(0);
    for (var i = 0; i < ranges.length; i++) {
      var l = Math.max(0, i - ranges[i]), r = Math.min(n, i + ranges[i]);
      if (r > maxReach[l]) maxReach[l] = r;
    }
    var taps = 0, cur = 0, next = 0, p = 0;
    while (cur < n) {
      while (p <= cur) { if (maxReach[p] > next) next = maxReach[p]; p++; }
      if (next <= cur) return -1;
      taps++; cur = next;
    }
    return taps;
  } });

// ---- Max Points on a Line (plane geometry) ----
MORE30.push({ slug: 'max-points-on-a-line', title: 'Max Points on a Line', difficulty: 'hard', topics: ['Array', 'Hash Table', 'Math', 'Geometry'], type: 'GRID_INT', langsrc: T.GRID_INT('maxPoints'),
  desc: '<p>You are given <code>grid</code>, where each row is a distinct point <code>[x, y]</code> on the plane. Return the maximum number of points that lie on the same straight line.</p>',
  examples: [{ in: 'grid = [[1,1],[2,2],[3,3]]', out: '3' }, { in: 'grid = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]', out: '4' }],
  constraints: ['1 &lt;= grid.length &lt;= 300', 'grid[i].length == 2', 'all points are distinct'],
  editorial: ed('Slope counting from each anchor', 'Fix each point as an anchor and group the others by reduced slope (divide dx, dy by their gcd and normalize the sign).\nThe largest slope group plus the anchor is the best line through that anchor.\nTake the maximum over all anchors.', 'O(n^2)', 'O(n)'),
  gen: function () {
    var o = [[[[1, 1], [2, 2], [3, 3]]], [[[1, 1], [3, 2], [5, 3], [4, 1], [2, 3], [1, 4]]], [[[0, 0]]], [[[0, 0], [1, 1], [2, 2], [3, 3], [0, 1], [1, 2]]]];
    for (var k = 0; k < 36; k++) o.push([randDistinctPoints(randInt(2, 8), 0, 5)]);
    return o;
  },
  ref: function (a) {
    var pts = a[0], n = pts.length;
    if (n <= 2) return n;
    var best = 1;
    for (var i = 0; i < n; i++) {
      var slopes = {};
      for (var j = 0; j < n; j++) {
        if (i === j) continue;
        var dx = pts[j][0] - pts[i][0], dy = pts[j][1] - pts[i][1], g = gcd(dx, dy);
        if (g !== 0) { dx = dx / g; dy = dy / g; }
        if (dx < 0 || (dx === 0 && dy < 0)) { dx = -dx; dy = -dy; }
        var key = dx + ',' + dy;
        slopes[key] = (slopes[key] || 0) + 1;
        if (slopes[key] + 1 > best) best = slopes[key] + 1;
      }
    }
    return best;
  } });

// ---- Stone Game II (game-theory DP) ----
MORE30.push({ slug: 'stone-game-ii', title: 'Stone Game II', difficulty: 'hard', topics: ['Array', 'Math', 'Dynamic Programming', 'Game Theory'], type: 'ARR_INT', langsrc: T.ARR_INT('stoneGameII'),
  desc: '<p>Alice and Bob play with piles of stones <code>nums</code> (pile <code>i</code> has <code>nums[i]</code> stones). Alice moves first with <code>M = 1</code>. On a turn a player takes all stones from the first <code>X</code> remaining piles where <code>1 &lt;= X &lt;= 2M</code>, then <code>M</code> becomes <code>max(M, X)</code>. Both play optimally to maximize their own stones. Return the maximum stones Alice can collect.</p>',
  examples: [{ in: 'nums = [2,7,9,4,4]', out: '10' }, { in: 'nums = [1,2,3,4,5,100]', out: '104' }],
  constraints: ['1 &lt;= nums.length &lt;= 100', '1 &lt;= nums[i] &lt;= 10^4'],
  editorial: ed('Suffix sums + minimax DP', 'dp[i][m] = the most the current player can secure from piles[i:] with parameter m.\nIf i + 2m covers the rest take the whole suffix, otherwise try every X in 1..2m and keep suffix[i] - dp[i+X][max(m,X)].', 'O(n^3)', 'O(n^2)'),
  gen: function () { var o = [[[2, 7, 9, 4, 4]], [[1, 2, 3, 4, 5, 100]], [[1]], [[5, 5, 5, 5]]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 8), 1, 12)]); return o; },
  ref: function (a) {
    var piles = a[0], n = piles.length, suf = new Array(n + 1).fill(0);
    for (var i = n - 1; i >= 0; i--) suf[i] = suf[i + 1] + piles[i];
    var memo = {};
    function dp(i, m) {
      if (i >= n) return 0;
      if (i + 2 * m >= n) return suf[i];
      var key = i + ',' + m; if (memo[key] !== undefined) return memo[key];
      var best = 0;
      for (var x = 1; x <= 2 * m; x++) { var val = suf[i] - dp(i + x, Math.max(m, x)); if (val > best) best = val; }
      memo[key] = best; return best;
    }
    return dp(0, 1);
  } });

// ---- Stone Game III (game-theory DP) ----
MORE30.push({ slug: 'stone-game-iii', title: 'Stone Game III', difficulty: 'hard', topics: ['Array', 'Math', 'Dynamic Programming', 'Game Theory'], type: 'ARR_INT', langsrc: T.ARR_INT('stoneGameIII'),
  desc: '<p>Given <code>nums</code> (the value of each stone in a row), Alice and Bob alternate turns with Alice first. On a turn a player takes the first 1, 2, or 3 remaining stones. Both play optimally to maximize their own total. Return Alice&#39;s score minus Bob&#39;s score (positive if Alice wins, negative if Bob wins, 0 for a tie).</p>',
  examples: [{ in: 'nums = [1,2,3,7]', out: '-4' }, { in: 'nums = [1,2,3,6]', out: '0' }],
  constraints: ['1 &lt;= nums.length &lt;= 5*10^4', '-1000 &lt;= nums[i] &lt;= 1000'],
  editorial: ed('Suffix DP on score difference', 'dp[i] = best (myScore - oppScore) achievable from nums[i:].\ndp[i] = max over take in 1..3 of (sum(nums[i:i+take]) - dp[i+take]).', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[1, 2, 3, 7]], [[1, 2, 3, 6]], [[1, 2, 3, -9]], [[-1, -2, -3]]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 9), -5, 10)]); return o; },
  ref: function (a) {
    var s = a[0], n = s.length, dp = new Array(n + 1).fill(0);
    for (var i = n - 1; i >= 0; i--) {
      var take = 0, best = -Infinity;
      for (var x = 0; x < 3 && i + x < n; x++) { take += s[i + x]; var val = take - dp[i + x + 1]; if (val > best) best = val; }
      dp[i] = best;
    }
    return dp[0];
  } });

// ---- Predict the Winner (interval DP) ----
MORE30.push({ slug: 'predict-the-winner', title: 'Predict the Winner', difficulty: 'hard', topics: ['Array', 'Math', 'Dynamic Programming', 'Game Theory'], type: 'ARR_BOOL', langsrc: T.ARR_BOOL('predictTheWinner'),
  desc: '<p>Given a score array <code>nums</code>, two players take turns picking a number from either end; the picked value is added to that player&#39;s score. Player 1 moves first. Both play optimally. Return <code>true</code> if player 1 can end with a score greater than or equal to player 2.</p>',
  examples: [{ in: 'nums = [1,5,2]', out: 'false' }, { in: 'nums = [1,5,233,7]', out: 'true' }],
  constraints: ['1 &lt;= nums.length &lt;= 20', '0 &lt;= nums[i] &lt;= 10^7'],
  editorial: ed('Interval DP on score difference', 'dp[i][j] = best (current - other) over nums[i..j].\ndp[i][j] = max(nums[i] - dp[i+1][j], nums[j] - dp[i][j-1]).\nAnswer: dp[0][n-1] >= 0.', 'O(n^2)', 'O(n^2)'),
  gen: function () { var o = [[[1, 5, 2]], [[1, 5, 233, 7]], [[1]], [[0, 0]]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(1, 9), 0, 12)]); return o; },
  ref: function (a) {
    var nums = a[0], n = nums.length;
    if (n === 0) return true;
    var dp = []; for (var i = 0; i < n; i++) { dp.push(new Array(n).fill(0)); dp[i][i] = nums[i]; }
    for (var len = 2; len <= n; len++) for (i = 0; i + len - 1 < n; i++) { var j = i + len - 1; dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]); }
    return dp[0][n - 1] >= 0;
  } });

module.exports = { MORE30 };
