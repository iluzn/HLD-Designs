// Batch F: intervals, matrix-output, heap.
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
function genIntervals(n) { var iv = []; for (var i = 0; i < n; i++) { var s = randInt(0, 10); iv.push([s, s + randInt(1, 6)]); } return iv; }
function intGrid(R, C, lo, hi) { var g = []; for (var i = 0; i < R; i++) { var row = []; for (var j = 0; j < C; j++) row.push(randInt(lo, hi)); g.push(row); } return g; }

const MORE10 = [];

// ---- Meeting Rooms (GRID_BOOL) ----
MORE10.push({ slug: 'meeting-rooms', title: 'Meeting Rooms', difficulty: 'easy', topics: ['Array', 'Sorting', 'Intervals'], type: 'GRID_BOOL', langsrc: T.GRID_BOOL('canAttendMeetings'),
  desc: '<p>Given an array of meeting time <code>intervals</code> where <code>intervals[i] = [start, end]</code>, return <code>true</code> if a person could attend all meetings (no two overlap).</p>',
  examples: [{ in: 'intervals = [[0,30],[5,10],[15,20]]', out: 'false' }, { in: 'intervals = [[7,10],[2,4]]', out: 'true' }],
  constraints: ['0 &lt;= intervals.length &lt;= 10^4', 'intervals[i].length == 2', '0 &lt;= start &lt; end'],
  editorial: ED({ intuition: 'If you sort meetings by start time, a conflict can only happen between consecutive meetings — one starts before the previous ends.', approach: ['Sort intervals by start time.', 'Scan adjacent pairs; if a meeting starts before the previous one ends, return false.', 'If no such overlap, return true.'], code: 'def canAttendMeetings(self, intervals):\n    intervals.sort()\n    for i in range(1, len(intervals)):\n        if intervals[i][0] < intervals[i-1][1]:\n            return False\n    return True', time: 'O(n log n)', timeWhy: 'dominated by the sort.', space: 'O(1)', spaceWhy: 'aside from sorting.' }),
  gen: function () { var o = [[[[0, 30], [5, 10], [15, 20]]], [[[7, 10], [2, 4]]], [[[1, 2]]]]; for (var k = 0; k < 38; k++) o.push([genIntervals(randInt(1, 6))]); return o; },
  ref: function (a) { var iv = a[0].slice().sort(function (x, y) { return x[0] - y[0]; }); for (var i = 1; i < iv.length; i++) if (iv[i][0] < iv[i - 1][1]) return false; return true; } });

// ---- Non-overlapping Intervals (GRID_INT) ----
MORE10.push({ slug: 'non-overlapping-intervals', title: 'Non-overlapping Intervals', difficulty: 'medium', topics: ['Array', 'Greedy', 'Sorting', 'Intervals'], type: 'GRID_INT', langsrc: T.GRID_INT('eraseOverlapIntervals'),
  desc: '<p>Given an array of intervals (each <code>[start, end]</code>), return the minimum number of intervals you must remove so the rest are non-overlapping.</p>',
  examples: [{ in: 'grid = [[1,2],[2,3],[3,4],[1,3]]', out: '1' }, { in: 'grid = [[1,2],[1,2],[1,2]]', out: '2' }],
  constraints: ['1 &lt;= intervals.length &lt;= 10^5', 'intervals[i].length == 2'],
  editorial: ED({ intuition: 'Greedily keep the interval that ends earliest — it leaves the most room for the rest. Sorting by end time and always keeping compatible intervals maximizes how many you keep, minimizing removals.', approach: ['Sort by end time.', 'Track the end of the last kept interval; if the next starts at or after it, keep it and advance the end.', 'Otherwise it overlaps and must be removed.'], code: 'def eraseOverlapIntervals(self, intervals):\n    intervals.sort(key=lambda x: x[1])\n    end = float("-inf")\n    kept = 0\n    for s, e in intervals:\n        if s >= end:\n            kept += 1\n            end = e\n    return len(intervals) - kept', time: 'O(n log n)', timeWhy: 'the sort dominates.', space: 'O(1)', spaceWhy: 'greedy scan.', pitfalls: ['Sort by end (not start) — that is what makes the greedy choice optimal.'] }),
  gen: function () { var o = [[[[1, 2], [2, 3], [3, 4], [1, 3]]], [[[1, 2], [1, 2], [1, 2]]], [[[1, 2]]]]; for (var k = 0; k < 38; k++) o.push([genIntervals(randInt(1, 7))]); return o; },
  ref: function (a) { var iv = a[0].slice().sort(function (x, y) { return x[1] - y[1]; }); var end = -Infinity, kept = 0; for (var i = 0; i < iv.length; i++) { if (iv[i][0] >= end) { kept++; end = iv[i][1]; } } return iv.length - kept; } });

// ---- Meeting Rooms II (GRID_INT) ----
MORE10.push({ slug: 'meeting-rooms-ii', title: 'Meeting Rooms II', difficulty: 'medium', topics: ['Array', 'Heap', 'Sorting', 'Intervals'], type: 'GRID_INT', langsrc: T.GRID_INT('minMeetingRooms'),
  desc: '<p>Given meeting intervals (each <code>[start, end]</code>), return the minimum number of conference rooms required.</p>',
  examples: [{ in: 'grid = [[0,30],[5,10],[15,20]]', out: '2' }, { in: 'grid = [[7,10],[2,4]]', out: '1' }],
  constraints: ['1 &lt;= intervals.length &lt;= 10^4', 'intervals[i].length == 2'],
  editorial: ED({ intuition: 'The number of rooms needed at any instant is the number of meetings currently in progress. Sweeping the sorted start and end times and tracking concurrent meetings gives the peak — that peak is the answer.', approach: ['Sort all start times and all end times separately.', 'Two-pointer sweep: when the next start is before the next end, a new room is needed; else a room frees up.', 'Track the maximum concurrent rooms.'], code: 'def minMeetingRooms(self, intervals):\n    starts = sorted(i[0] for i in intervals)\n    ends = sorted(i[1] for i in intervals)\n    rooms = cur = 0\n    s = e = 0\n    while s < len(starts):\n        if starts[s] < ends[e]:\n            cur += 1; s += 1\n            rooms = max(rooms, cur)\n        else:\n            cur -= 1; e += 1\n    return rooms', time: 'O(n log n)', timeWhy: 'the two sorts dominate.', space: 'O(n)', spaceWhy: 'the start/end arrays.', pitfalls: ['Use strict <code>&lt;</code> so a meeting ending exactly when another starts reuses the room.'] }),
  gen: function () { var o = [[[[0, 30], [5, 10], [15, 20]]], [[[7, 10], [2, 4]]], [[[1, 5]]]]; for (var k = 0; k < 38; k++) o.push([genIntervals(randInt(1, 7))]); return o; },
  ref: function (a) { var iv = a[0]; var starts = iv.map(function (x) { return x[0]; }).sort(function (p, q) { return p - q; }); var ends = iv.map(function (x) { return x[1]; }).sort(function (p, q) { return p - q; }); var rooms = 0, cur = 0, s = 0, e = 0; while (s < starts.length && e < ends.length) { if (starts[s] < ends[e]) { cur++; s++; rooms = Math.max(rooms, cur); } else { cur--; e++; } } return rooms; } });

// ---- Merge Intervals (GRID_GRID) ----
MORE10.push({ slug: 'merge-intervals', title: 'Merge Intervals', difficulty: 'medium', topics: ['Array', 'Sorting', 'Intervals'], type: 'GRID_GRID', langsrc: T.GRID_GRID('merge'),
  desc: '<p>Given an array of intervals (each <code>[start, end]</code>), merge all overlapping intervals and return the non-overlapping result sorted by start. On this judge intervals are shown separated by <code>|</code>.</p>',
  examples: [{ in: 'grid = [[1,3],[2,6],[8,10],[15,18]]', out: '[[1,6],[8,10],[15,18]]' }, { in: 'grid = [[1,4],[4,5]]', out: '[[1,5]]' }],
  constraints: ['1 &lt;= intervals.length &lt;= 10^4', 'intervals[i].length == 2'],
  editorial: ED({ intuition: 'Once sorted by start, overlapping intervals are adjacent. Walk through and extend the current merged interval whenever the next one starts before the current end.', approach: ['Sort intervals by start.', 'Keep a running merged interval; if the next starts within it, extend the end to the max.', 'Otherwise push the current and start a new one.'], code: 'def merge(self, intervals):\n    intervals.sort()\n    res = []\n    for s, e in intervals:\n        if res and s <= res[-1][1]:\n            res[-1][1] = max(res[-1][1], e)\n        else:\n            res.append([s, e])\n    return res', time: 'O(n log n)', timeWhy: 'sort plus a linear merge.', space: 'O(n)', spaceWhy: 'the output list.', pitfalls: ['Extend using max of ends — the next interval may be fully inside the current one.'] }),
  gen: function () { var o = [[[[1, 3], [2, 6], [8, 10], [15, 18]]], [[[1, 4], [4, 5]]], [[[1, 2]]]]; for (var k = 0; k < 38; k++) o.push([genIntervals(randInt(1, 7))]); return o; },
  ref: function (a) { var iv = a[0].slice().sort(function (x, y) { return x[0] - y[0] || x[1] - y[1]; }); var res = []; for (var i = 0; i < iv.length; i++) { if (res.length && iv[i][0] <= res[res.length - 1][1]) res[res.length - 1][1] = Math.max(res[res.length - 1][1], iv[i][1]); else res.push([iv[i][0], iv[i][1]]); } return res.map(function (r) { return r.join(' '); }).join('|'); } });

// ---- Rotate Image (GRID_GRID) ----
MORE10.push({ slug: 'rotate-image', title: 'Rotate Image', difficulty: 'medium', topics: ['Array', 'Math', 'Matrix'], type: 'GRID_GRID', langsrc: T.GRID_GRID('rotate'),
  desc: '<p>Given an <code>n x n</code> matrix, rotate it 90 degrees clockwise. LeetCode mutates in place and returns void; here return the rotated matrix.</p>',
  examples: [{ in: 'grid = [[1,2,3],[4,5,6],[7,8,9]]', out: '[[7,4,1],[8,5,2],[9,6,3]]' }, { in: 'grid = [[1,2],[3,4]]', out: '[[3,1],[4,2]]' }],
  constraints: ['1 &lt;= n &lt;= 20', '-1000 &lt;= matrix[i][j] &lt;= 1000'],
  editorial: ED({ intuition: 'A 90-degree clockwise rotation is the composition of two simple in-place operations: transpose the matrix (swap across the main diagonal), then reverse each row.', approach: ['Transpose: swap matrix[i][j] with matrix[j][i] for i &lt; j.', 'Reverse each row.', 'The result is the clockwise rotation.'], code: 'def rotate(self, matrix):\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i+1, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n    for row in matrix:\n        row.reverse()\n    return matrix', time: 'O(n^2)', timeWhy: 'touch each cell a constant number of times.', space: 'O(1)', spaceWhy: 'in-place swaps.', pitfalls: ['Transpose only the upper triangle (j &gt; i), or you swap everything back.'] }),
  gen: function () { var o = [[[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], [[[1, 2], [3, 4]]], [[[5]]]]; for (var k = 0; k < 38; k++) { var n = randInt(1, 4); o.push([intGrid(n, n, -9, 9)]); } return o; },
  ref: function (a) { var g = a[0], n = g.length, res = []; for (var i = 0; i < n; i++) { var row = []; for (var j = 0; j < n; j++) row.push(g[n - 1 - j][i]); res.push(row); } return res.map(function (r) { return r.join(' '); }).join('|'); } });

// ---- Set Matrix Zeroes (GRID_GRID) ----
MORE10.push({ slug: 'set-matrix-zeroes', title: 'Set Matrix Zeroes', difficulty: 'medium', topics: ['Array', 'Hash Table', 'Matrix'], type: 'GRID_GRID', langsrc: T.GRID_GRID('setZeroes'),
  desc: '<p>Given an <code>m x n</code> matrix, if an element is 0 set its entire row and column to 0. LeetCode mutates in place; here return the modified matrix.</p>',
  examples: [{ in: 'grid = [[1,1,1],[1,0,1],[1,1,1]]', out: '[[1,0,1],[0,0,0],[1,0,1]]' }, { in: 'grid = [[0,1],[1,1]]', out: '[[0,0],[0,1]]' }],
  constraints: ['1 &lt;= m, n &lt;= 200', '-2^31 &lt;= matrix[i][j] &lt;= 2^31 - 1'],
  editorial: ED({ intuition: 'First record which rows and columns contain a zero, then zero them out in a second pass. Doing it in one pass would spread zeros incorrectly.', approach: ['Scan the matrix, collecting the set of rows and columns that have a zero.', 'In a second pass, zero any cell whose row or column was marked.', '(An O(1)-space variant uses the first row/column as the markers.)'], code: 'def setZeroes(self, matrix):\n    rows, cols = set(), set()\n    for i, row in enumerate(matrix):\n        for j, v in enumerate(row):\n            if v == 0:\n                rows.add(i); cols.add(j)\n    for i in range(len(matrix)):\n        for j in range(len(matrix[0])):\n            if i in rows or j in cols:\n                matrix[i][j] = 0\n    return matrix', time: 'O(m*n)', timeWhy: 'two passes over the grid.', space: 'O(m+n)', spaceWhy: 'the marked-row and column sets.', pitfalls: ['Collect all zero positions first — mutating during the first scan would cascade zeros wrongly.'] }),
  gen: function () { var o = [[[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], [[[0, 1], [1, 1]]], [[[5]]]]; for (var k = 0; k < 38; k++) { var R = randInt(1, 4), C = randInt(1, 4); var g = intGrid(R, C, 0, 3).map(function (r) { return r.map(function (v) { return Math.random() < 0.3 ? 0 : (v === 0 ? 1 : v); }); }); o.push([g]); } return o; },
  ref: function (a) { var g = a[0].map(function (r) { return r.slice(); }); var R = g.length, C = g[0].length, rows = {}, cols = {}; for (var i = 0; i < R; i++) for (var j = 0; j < C; j++) if (g[i][j] === 0) { rows[i] = 1; cols[j] = 1; } for (i = 0; i < R; i++) for (j = 0; j < C; j++) if (rows[i] || cols[j]) g[i][j] = 0; return g.map(function (r) { return r.join(' '); }).join('|'); } });

// ---- Last Stone Weight (ARR_INT) ----
MORE10.push({ slug: 'last-stone-weight', title: 'Last Stone Weight', difficulty: 'easy', topics: ['Array', 'Heap', 'Greedy'], type: 'ARR_INT', langsrc: T.ARR_INT('lastStoneWeight'),
  desc: '<p>You are given <code>stones</code> weights. Each turn, smash the two heaviest together: if equal both are destroyed, else the lighter is destroyed and the heavier becomes their difference. Return the weight of the last remaining stone, or 0 if none remain.</p>',
  examples: [{ in: 'stones = [2,7,4,1,8,1]', out: '1' }, { in: 'stones = [1]', out: '1' }],
  constraints: ['1 &lt;= stones.length &lt;= 30', '1 &lt;= stones[i] &lt;= 1000'],
  editorial: ED({ intuition: 'You always need the two heaviest stones, and each smash produces a new stone that must rejoin the pool. A max-heap gives you the two largest and reinserts the difference in log time.', approach: ['Put all stones in a max-heap.', 'Pop the two largest; if they differ, push the difference back.', 'When one or zero stones remain, that is the answer (or 0).'], code: 'import heapq\n\ndef lastStoneWeight(self, stones):\n    heap = [-s for s in stones]\n    heapq.heapify(heap)\n    while len(heap) > 1:\n        a = -heapq.heappop(heap)\n        b = -heapq.heappop(heap)\n        if a != b:\n            heapq.heappush(heap, -(a - b))\n    return -heap[0] if heap else 0', time: 'O(n log n)', timeWhy: 'each smash is a couple of log-time heap operations.', space: 'O(n)', spaceWhy: 'the heap.' }),
  gen: function () { var o = [[[2, 7, 4, 1, 8, 1]], [[1]], [[1, 1]], [[3, 3, 2]]]; for (var k = 0; k < 40; k++) o.push([randArr(randInt(1, 12), 1, 15)]); return o; },
  ref: function (a) { var h = a[0].slice(); while (h.length > 1) { h.sort(function (x, y) { return x - y; }); var b = h.pop(), aa = h.pop(); if (aa !== b) h.push(b - aa); } return h.length ? h[0] : 0; } });

module.exports = { MORE10 };
