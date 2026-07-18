// Batch 31: backtracking + bit manipulation classics.
// Types restricted to the verified-safe set: INT_INT.
// Every output is a single deterministic int so the multi-case harness
// stays unambiguous. Inputs are kept small (n<=9 for backtracking) so the
// pure JS refs run fast.
const { T, randInt, randArr, ln } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}

const MORE31 = [];

// ---- N-Queens (backtracking, count solutions — same as n-queens-ii but different slug) ----
MORE31.push({ slug: 'n-queens', title: 'N-Queens', difficulty: 'hard', topics: ['Backtracking'], type: 'INT_INT', langsrc: T.INT_INT('solveNQueens'),
  desc: '<p>The n-queens puzzle places <code>n</code> queens on an <code>n x n</code> chessboard so that no two queens attack each other (no shared row, column, or diagonal). Given an integer <code>n</code>, return the <strong>number</strong> of distinct solutions to the n-queens puzzle.</p>',
  examples: [{ in: 'n = 4', out: '2' }, { in: 'n = 1', out: '1' }, { in: 'n = 8', out: '92' }],
  constraints: ['1 &lt;= n &lt;= 9'],
  editorial: ed('Backtracking with column and diagonal tracking',
    'Place queens row by row. For each row, try every column.\nTrack which columns and both diagonal directions are occupied using sets or bitmasks.\nWhen a queen is safely placed, recurse to the next row.\nCount a solution when all n rows are filled.\n\nBitmask variant: use three integers (cols, diag1, diag2) where each set bit marks an occupied lane.\nAt each row, available = ~(cols | diag1 | diag2) & allMask.\nPick the lowest set bit, mark the three masks, recurse.',
    'O(n!)', 'O(n)'),
  gen: function () { var o = [[1], [4], [5], [6], [7], [8], [9]]; for (var k = 0; k < 33; k++) o.push([randInt(1, 9)]); return o; },
  ref: function (a) {
    var n = a[0], count = 0, all = (1 << n) - 1;
    function solve(cols, d1, d2) {
      if (cols === all) { count++; return; }
      var avail = all & ~(cols | d1 | d2);
      while (avail) {
        var p = avail & (-avail);
        avail -= p;
        solve(cols | p, (d1 | p) << 1, (d2 | p) >> 1);
      }
    }
    solve(0, 0, 0);
    return count;
  } });

// ---- Reverse Bits (bit manipulation) ----
MORE31.push({ slug: 'reverse-bits', title: 'Reverse Bits', difficulty: 'easy', topics: ['Bit Manipulation'], type: 'INT_INT', langsrc: T.INT_INT('reverseBits'),
  desc: '<p>Reverse the bits of a given 32-bit unsigned integer. Return the resulting unsigned integer represented as a (possibly large) number.</p><p>For example, the input <code>43261596</code> in binary is <code>00000010100101000001111010011100</code>. Reversing gives <code>00111001011110000010100101000000</code> which is <code>964176192</code>.</p>',
  examples: [{ in: 'n = 43261596', out: '964176192' }, { in: 'n = 4294967293', out: '3221225471' }, { in: 'n = 0', out: '0' }],
  constraints: ['0 &lt;= n &lt;= 2^32 - 1'],
  editorial: ed('Bit-by-bit reversal',
    'Initialize result = 0. Loop 32 times:\n  result = (result << 1) | (n & 1)\n  n = n >>> 1 (unsigned right shift)\nAfter 32 iterations, result holds the reversed bits.\n\nAlternative: divide-and-conquer swapping (swap adjacent bits, then pairs, then nibbles, bytes, and halves).',
    'O(1) — fixed 32 iterations', 'O(1)'),
  gen: function () {
    var o = [[43261596], [4294967293], [0], [1], [2147483648], [4294967295]];
    for (var k = 0; k < 34; k++) o.push([Math.floor(Math.random() * 4294967296)]);
    return o;
  },
  ref: function (a) {
    var n = a[0] >>> 0, result = 0;
    for (var i = 0; i < 32; i++) {
      result = (result * 2) + (n & 1);
      n = n >>> 1;
    }
    return result >>> 0;
  } });

// ---- Longest Cycle in a Graph (DFS / functional graph) ----
MORE31.push({ slug: 'longest-cycle-in-a-graph', title: 'Longest Cycle in a Graph', difficulty: 'hard', topics: ['Graph', 'DFS'], type: 'ARR_INT', langsrc: T.ARR_INT('longestCycle'),
  desc: '<p>You are given a directed graph of <code>n</code> nodes numbered from <code>0</code> to <code>n - 1</code>, where each node has <strong>at most one</strong> outgoing edge.</p><p>The graph is represented by a 0-indexed array <code>nums</code> of size <code>n</code>, where <code>nums[i]</code> indicates that there is a directed edge from node <code>i</code> to node <code>nums[i]</code>. If there is no outgoing edge from node <code>i</code>, then <code>nums[i] == -1</code>.</p><p>Return the length of the <strong>longest</strong> cycle in the graph. If no cycle exists, return <code>-1</code>.</p>',
  examples: [{ in: 'nums = [3,3,4,2,3]', out: '3', ex: 'Nodes 2 → 4 → 3 → 2 form a cycle of length 3.' }, { in: 'nums = [2,-1,3,1]', out: '-1', ex: 'No cycle exists.' }, { in: 'nums = [-1,4,-1,2,0,4]', out: '-1' }],
  constraints: ['n == nums.length', '1 &lt;= n &lt;= 10^5', '-1 &lt;= nums[i] &lt; n', 'nums[i] != i (no self-loops)'],
  editorial: '<h2>Approach: Walk each unvisited node forward</h2><p>Since each node has at most one outgoing edge (functional graph), following edges from any node either reaches -1 or enters a cycle. For each unvisited node, walk forward tracking the step count. If we revisit a node from the current walk, cycle length = current step - step when first seen.</p><pre><code>def longestCycle(nums):\n    n = len(nums)\n    visited = [False] * n\n    ans = -1\n    for i in range(n):\n        if visited[i]: continue\n        path = {}\n        node, step = i, 0\n        while node != -1 and not visited[node]:\n            if node in path:\n                ans = max(ans, step - path[node])\n                break\n            path[node] = step\n            step += 1\n            node = nums[node]\n        for key in path:\n            visited[key] = True\n    return ans</code></pre><p><b>Complexity:</b> O(n) time, O(n) space.</p>',
  gen: function () {
    var o = [[[3, 3, 4, 2, 3]], [[2, -1, 3, 1]], [[-1, 4, -1, 2, 0, 4]], [[-1]], [[1, 0]], [[-1, -1, -1]]];
    for (var k = 0; k < 34; k++) {
      var n = randInt(2, 12), arr = [];
      for (var i = 0; i < n; i++) {
        if (Math.random() < 0.2) arr.push(-1);
        else { var t = randInt(0, n - 1); arr.push(t === i ? -1 : t); }
      }
      o.push([arr]);
    }
    return o;
  },
  ref: function (a) {
    var edges = a[0], n = edges.length, visited = new Array(n).fill(false), ans = -1;
    for (var i = 0; i < n; i++) {
      if (visited[i]) continue;
      var path = {}, node = i, step = 0, found = false;
      while (node !== -1 && !visited[node]) {
        if (path[node] !== undefined) { ans = Math.max(ans, step - path[node]); found = true; break; }
        path[node] = step; step++; node = edges[node];
      }
      var keys = Object.keys(path);
      for (var j = 0; j < keys.length; j++) visited[+keys[j]] = true;
    }
    return ans;
  } });

module.exports = { MORE31 };
