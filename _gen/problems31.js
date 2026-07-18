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

module.exports = { MORE31 };
