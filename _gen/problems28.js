// Batch 28: famous HARD interview problems returning a single scalar (int or
// bool). Types restricted to the harnesses that serialize cleanly:
//   TREE_INT, TREE_INT_INT, GRID_INT.
// Trees are serialized level-order with "null" markers; grids are rectangular
// int matrices (R C then R*C ints). Every ref() below is a pure-JS source of
// truth that matches the true semantics on the ACTUAL generated data.
const { T, randInt } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}

// ---- JS reference tree helpers (mirror the harness builder) ----
function bt(arr) {
  if (!arr.length || arr[0] === null) return null;
  var root = { val: arr[0], left: null, right: null };
  var q = [root], i = 1;
  while (q.length && i < arr.length) {
    var n = q.shift();
    if (i < arr.length && arr[i] !== null) { n.left = { val: arr[i], left: null, right: null }; q.push(n.left); } i++;
    if (i < arr.length && arr[i] !== null) { n.right = { val: arr[i], left: null, right: null }; q.push(n.right); } i++;
  }
  return root;
}
// random valid level-order array with values in [lo,hi]
function genTree(maxNodes, lo, hi) {
  var count = randInt(0, maxNodes);
  if (count === 0) return [];
  var root = { v: randInt(lo, hi), l: null, r: null }, q = [root], n = 1;
  while (q.length && n < count) {
    var node = q.shift();
    if (n < count && Math.random() < 0.85) { node.l = { v: randInt(lo, hi), l: null, r: null }; q.push(node.l); n++; }
    if (n < count && Math.random() < 0.85) { node.r = { v: randInt(lo, hi), l: null, r: null }; q.push(node.r); n++; }
  }
  var out = [], qq = [root];
  while (qq.length) { var node = qq.shift(); if (node === null) { out.push(null); continue; } out.push(node.v); qq.push(node.l); qq.push(node.r); }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}
function genTree1(maxNodes, lo, hi) { var t; do { t = genTree(maxNodes, lo, hi); } while (!t.length); return t; }

// ---- grid helpers ----
function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = randInt(0, i); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function intGrid(R, C, lo, hi) { var g = []; for (var i = 0; i < R; i++) { var row = []; for (var j = 0; j < C; j++) row.push(randInt(lo, hi)); g.push(row); } return g; }
function binGrid(R, C, p) { var g = []; for (var i = 0; i < R; i++) { var row = []; for (var j = 0; j < C; j++) row.push(Math.random() < p ? 1 : 0); g.push(row); } return g; }
// grid of 0 (empty) / 1 (building) / 2 (obstacle) with at least one building
function buildingGrid(R, C) {
  var g = [];
  for (var i = 0; i < R; i++) { var row = []; for (var j = 0; j < C; j++) { var r = Math.random(); row.push(r < 0.7 ? 0 : (r < 0.85 ? 1 : 2)); } g.push(row); }
  var has = false;
  for (i = 0; i < R; i++) for (var j = 0; j < C; j++) if (g[i][j] === 1) has = true;
  if (!has) g[randInt(0, R - 1)][randInt(0, C - 1)] = 1;
  return g;
}
// grid of directions 1..4 (right,left,down,up)
function dirGrid(R, C) { var g = []; for (var i = 0; i < R; i++) { var row = []; for (var j = 0; j < C; j++) row.push(randInt(1, 4)); g.push(row); } return g; }
// n x n permutation of 0..n*n-1
function permGrid(n) { var vals = []; for (var i = 0; i < n * n; i++) vals.push(i); shuffle(vals); var g = []; for (i = 0; i < n; i++) g.push(vals.slice(i * n, i * n + n)); return g; }
// grid for cut-off-trees: 0 obstacle, 1 walkable ground, >1 distinct tree heights; (0,0) is walkable
function cutGrid(R, C) {
  var g = [];
  for (var i = 0; i < R; i++) { var row = []; for (var j = 0; j < C; j++) row.push(Math.random() < 0.2 ? 0 : 1); g.push(row); }
  if (g[0][0] === 0) g[0][0] = 1;
  var cells = [];
  for (i = 0; i < R; i++) for (var j = 0; j < C; j++) if (g[i][j] === 1) cells.push([i, j]);
  shuffle(cells);
  var k = randInt(0, Math.min(cells.length, 5));
  for (var t = 0; t < k; t++) g[cells[t][0]][cells[t][1]] = t + 2; // distinct heights 2,3,...
  return g;
}

const MORE28 = [];

// ---- Binary Tree Cameras (TREE_INT) ----
MORE28.push({
  slug: 'binary-tree-cameras', title: 'Binary Tree Cameras', difficulty: 'hard', topics: ['Tree', 'DFS', 'Dynamic Programming', 'Greedy'], type: 'TREE_INT', langsrc: T.TREE_INT('minCameraCover'),
  desc: '<p>You are given the <code>root</code> of a binary tree. A camera placed on a node can monitor its parent, itself, and its immediate children. Return the <strong>minimum</strong> number of cameras needed to monitor every node of the tree.</p>',
  examples: [{ in: 'root = [0,0,null,0,0]', out: '1' }, { in: 'root = [0,0,null,0,null,0,null,null,0]', out: '2' }],
  constraints: ['1 &lt;= number of nodes &lt;= 1000', 'Node.val == 0.'],
  editorial: ed('Greedy post-order', 'each node is in one of three states (uncovered, covered, has-camera); place a camera only when a child is uncovered', 'O(n)', 'O(h)'),
  gen: function () {
    var o = [[[0, 0, null, 0, 0]], [[0, 0, null, 0, null, 0, null, null, 0]], [[0]], [[0, 0, 0]]];
    for (var k = 0; k < 35; k++) o.push([genTree1(14, 0, 0)]);
    return o;
  },
  ref: function (a) {
    var cameras = 0;
    function dfs(n) { if (!n) return 1; var l = dfs(n.left), r = dfs(n.right); if (l === 0 || r === 0) { cameras++; return 2; } if (l === 2 || r === 2) return 1; return 0; }
    if (dfs(bt(a[0])) === 0) cameras++;
    return cameras;
  }
});

// ---- Maximum Sum BST in Binary Tree (TREE_INT) ----
MORE28.push({
  slug: 'maximum-sum-bst-in-binary-tree', title: 'Maximum Sum BST in Binary Tree', difficulty: 'hard', topics: ['Tree', 'DFS', 'Binary Search Tree', 'Dynamic Programming'], type: 'TREE_INT', langsrc: T.TREE_INT('maxSumBST'),
  desc: '<p>Given the <code>root</code> of a binary tree, return the maximum sum of all keys of any sub-tree which is also a <strong>Binary Search Tree</strong> (BST). A valid BST requires every node in the left subtree to be strictly less than the node, and every node in the right subtree to be strictly greater. If no sub-tree is a BST with positive sum, return <code>0</code>.</p>',
  examples: [{ in: 'root = [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]', out: '20' }, { in: 'root = [4,3,null,1,2]', out: '2' }, { in: 'root = [-4,-2,-5]', out: '0' }],
  constraints: ['1 &lt;= number of nodes &lt;= 4*10^4', '-4*10^4 &lt;= Node.val &lt;= 4*10^4.'],
  editorial: ed('Post-order validation', 'return (isBST, min, max, sum) from each node; a node forms a BST only if both children are BSTs and its value fits between them', 'O(n)', 'O(h)'),
  gen: function () {
    var o = [[[1, 4, 3, 2, 4, 2, 5, null, null, null, null, null, null, 4, 6]], [[4, 3, null, 1, 2]], [[-4, -2, -5]], [[2, 1, 3]]];
    for (var k = 0; k < 35; k++) o.push([genTree1(14, -8, 8)]);
    return o;
  },
  ref: function (a) {
    var best = 0;
    function dfs(n) {
      if (!n) return { bst: true, mn: Infinity, mx: -Infinity, sum: 0 };
      var l = dfs(n.left), r = dfs(n.right);
      if (l.bst && r.bst && n.val > l.mx && n.val < r.mn) {
        var s = n.val + l.sum + r.sum;
        if (s > best) best = s;
        return { bst: true, mn: Math.min(l.mn, n.val), mx: Math.max(r.mx, n.val), sum: s };
      }
      return { bst: false, mn: 0, mx: 0, sum: 0 };
    }
    dfs(bt(a[0]));
    return best;
  }
});

// ---- Longest ZigZag Path in a Binary Tree (TREE_INT) ----
MORE28.push({
  slug: 'longest-zigzag-path-in-a-binary-tree', title: 'Longest ZigZag Path in a Binary Tree', difficulty: 'hard', topics: ['Tree', 'DFS', 'Dynamic Programming'], type: 'TREE_INT', langsrc: T.TREE_INT('longestZigZag'),
  desc: '<p>A ZigZag path alternates direction (left, right, left, ...) at each step. Its length is the number of <strong>edges</strong> visited. Given the <code>root</code> of a binary tree, return the length of the longest ZigZag path contained in it.</p>',
  examples: [{ in: 'root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1,null,1]', out: '3' }, { in: 'root = [1,1,1,null,1,null,null,1,1,null,1]', out: '4' }, { in: 'root = [1]', out: '0' }],
  constraints: ['1 &lt;= number of nodes &lt;= 5*10^4', '1 &lt;= Node.val &lt;= 100.'],
  editorial: ed('Post-order DP', 'each node returns the best zigzag starting by going left and by going right; going left uses the child\'s right value plus one', 'O(n)', 'O(h)'),
  gen: function () {
    var o = [[[1, null, 1, 1, 1, null, null, 1, 1, null, 1, null, null, null, 1, null, 1]], [[1, 1, 1, null, 1, null, null, 1, 1, null, 1]], [[1]], [[1, 2, 3, 4, 5, 6, 7]]];
    for (var k = 0; k < 35; k++) o.push([genTree1(14, 1, 5)]);
    return o;
  },
  ref: function (a) {
    var best = 0;
    function dfs(n) {
      if (!n) return [-1, -1];
      var l = dfs(n.left), r = dfs(n.right);
      var cl = l[1] + 1, cr = r[0] + 1;
      if (cl > best) best = cl;
      if (cr > best) best = cr;
      return [cl, cr];
    }
    dfs(bt(a[0]));
    return best;
  }
});

// ---- Number of Good Leaf Nodes Pairs (TREE_INT_INT: root, distance) ----
MORE28.push({
  slug: 'number-of-good-leaf-nodes-pairs', title: 'Number of Good Leaf Nodes Pairs', difficulty: 'hard', topics: ['Tree', 'DFS'], type: 'TREE_INT_INT', langsrc: T.TREE_INT_INT('countPairs'),
  desc: '<p>Given the <code>root</code> of a binary tree and an integer <code>distance</code>, a pair of two different <strong>leaf</strong> nodes is <em>good</em> if the length of the shortest path between them (in edges) is less than or equal to <code>distance</code>. Return the number of good leaf node pairs.</p>',
  examples: [{ in: 'root = [1,2,3,null,4], distance = 3', out: '1' }, { in: 'root = [1,2,3,4,5,6,7], distance = 3', out: '2' }, { in: 'root = [7,1,4,6,null,5,3,null,null,null,null,null,null,2], distance = 3', out: '1' }],
  constraints: ['1 &lt;= number of nodes &lt;= 2^10', '1 &lt;= Node.val &lt;= 100', '1 &lt;= distance &lt;= 10.'],
  editorial: ed('Post-order leaf distances', 'each node returns the list of distances to leaves below it; combine left and right lists to count pairs within distance', 'O(n^2)', 'O(n)'),
  gen: function () {
    var o = [[[1, 2, 3, null, 4], 3], [[1, 2, 3, 4, 5, 6, 7], 3], [[7, 1, 4, 6, null, 5, 3, null, null, null, null, null, null, 2], 3], [[1], 1]];
    for (var k = 0; k < 35; k++) o.push([genTree1(14, 1, 10), randInt(1, 8)]);
    return o;
  },
  ref: function (a) {
    var distance = a[1], res = 0;
    function dfs(n) {
      if (!n) return [];
      if (!n.left && !n.right) return [0];
      var left = dfs(n.left), right = dfs(n.right), out = [], i, j;
      for (i = 0; i < left.length; i++) for (j = 0; j < right.length; j++) if (left[i] + right[j] + 2 <= distance) res++;
      for (i = 0; i < left.length; i++) out.push(left[i] + 1);
      for (i = 0; i < right.length; i++) out.push(right[i] + 1);
      return out;
    }
    dfs(bt(a[0]));
    return res;
  }
});

// ---- Making A Large Island (GRID_INT, 0/1) ----
MORE28.push({
  slug: 'making-a-large-island', title: 'Making A Large Island', difficulty: 'hard', topics: ['Array', 'DFS', 'BFS', 'Union Find', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('largestIsland'),
  desc: '<p>You are given an <code>n x n</code> binary grid. You may change <strong>at most one</strong> <code>0</code> to a <code>1</code>. Return the size of the largest island (a 4-directionally connected group of <code>1</code>s) achievable after at most one such change.</p>',
  examples: [{ in: 'grid = [[1,0],[0,1]]', out: '3' }, { in: 'grid = [[1,1],[1,0]]', out: '4' }, { in: 'grid = [[1,1],[1,1]]', out: '4' }],
  constraints: ['n == grid.length == grid[i].length', '1 &lt;= n &lt;= 500', 'grid[i][j] is 0 or 1.'],
  editorial: ed('Label islands then probe zeros', 'flood-fill each island with a unique id and record its size; for every 0 sum the sizes of distinct neighbouring islands plus one', 'O(n^2)', 'O(n^2)'),
  gen: function () {
    var o = [[[[1, 0], [0, 1]]], [[[1, 1], [1, 0]]], [[[1, 1], [1, 1]]], [[[0]]]];
    for (var k = 0; k < 35; k++) { var n = randInt(1, 5); o.push([binGrid(n, n, 0.55)]); }
    return o;
  },
  ref: function (a) {
    var g = a[0].map(function (r) { return r.slice(); }), R = g.length, C = g[0].length;
    var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]], size = {}, id = 2;
    function fill(sr, sc, lab) { var st = [[sr, sc]], cnt = 0; g[sr][sc] = lab; while (st.length) { var cur = st.pop(); cnt++; for (var d = 0; d < 4; d++) { var nr = cur[0] + dirs[d][0], nc = cur[1] + dirs[d][1]; if (nr >= 0 && nr < R && nc >= 0 && nc < C && g[nr][nc] === 1) { g[nr][nc] = lab; st.push([nr, nc]); } } } return cnt; }
    var best = 0, r, c, d;
    for (r = 0; r < R; r++) for (c = 0; c < C; c++) if (g[r][c] === 1) { size[id] = fill(r, c, id); if (size[id] > best) best = size[id]; id++; }
    for (r = 0; r < R; r++) for (c = 0; c < C; c++) if (g[r][c] === 0) { var seen = {}, tot = 1; for (d = 0; d < 4; d++) { var nr = r + dirs[d][0], nc = c + dirs[d][1]; if (nr >= 0 && nr < R && nc >= 0 && nc < C && g[nr][nc] > 1) { var idd = g[nr][nc]; if (!seen[idd]) { seen[idd] = 1; tot += size[idd]; } } } if (tot > best) best = tot; }
    return best;
  }
});

// ---- Shortest Distance from All Buildings (GRID_INT, 0/1/2) ----
MORE28.push({
  slug: 'shortest-distance-from-all-buildings', title: 'Shortest Distance from All Buildings', difficulty: 'hard', topics: ['Array', 'BFS', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('shortestDistance'),
  desc: '<p>You are given a grid where <code>0</code> is empty land you can travel through, <code>1</code> marks a building, and <code>2</code> marks an obstacle. Return the shortest total travel distance from an empty land cell that can reach <strong>all</strong> buildings (moving 4-directionally). If no such cell exists, return <code>-1</code>.</p>',
  examples: [{ in: 'grid = [[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]]', out: '7' }, { in: 'grid = [[1,0]]', out: '1' }, { in: 'grid = [[1]]', out: '-1' }],
  constraints: ['1 &lt;= m, n &lt;= 50', 'grid[i][j] is 0, 1, or 2', 'There is at least one building.'],
  editorial: ed('BFS from every building', 'run a BFS from each building accumulating distance and reach counts into empty cells; the answer is the minimum total distance of a cell reached by all buildings', 'O(b*m*n)', 'O(m*n)'),
  gen: function () {
    var o = [[[[1, 0, 2, 0, 1], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0]]], [[[1, 0]]], [[[1]]], [[[1, 2, 0]]]];
    for (var k = 0; k < 35; k++) { var R = randInt(1, 5), C = randInt(1, 5); o.push([buildingGrid(R, C)]); }
    return o;
  },
  ref: function (a) {
    var g = a[0], R = g.length, C = g[0].length, i, j;
    var total = [], reach = [];
    for (i = 0; i < R; i++) { total.push(new Array(C).fill(0)); reach.push(new Array(C).fill(0)); }
    var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]], buildings = 0;
    for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) if (g[r][c] === 1) {
      buildings++;
      var vis = []; for (i = 0; i < R; i++) vis.push(new Array(C).fill(false));
      vis[r][c] = true; var q = [[r, c]], dist = 0;
      while (q.length) { var nq = []; dist++; for (var k = 0; k < q.length; k++) { var cr = q[k][0], cc = q[k][1]; for (var d = 0; d < 4; d++) { var nr = cr + dirs[d][0], nc = cc + dirs[d][1]; if (nr >= 0 && nr < R && nc >= 0 && nc < C && !vis[nr][nc] && g[nr][nc] === 0) { vis[nr][nc] = true; total[nr][nc] += dist; reach[nr][nc]++; nq.push([nr, nc]); } } } q = nq; }
    }
    if (buildings === 0) return -1;
    var best = -1;
    for (r = 0; r < R; r++) for (c = 0; c < C; c++) if (g[r][c] === 0 && reach[r][c] === buildings) { if (best === -1 || total[r][c] < best) best = total[r][c]; }
    return best;
  }
});

// ---- Minimum Cost to Make at Least One Valid Path in a Grid (GRID_INT, 1..4) ----
MORE28.push({
  slug: 'minimum-cost-to-make-at-least-one-valid-path-in-a-grid', title: 'Minimum Cost to Make at Least One Valid Path in a Grid', difficulty: 'hard', topics: ['Array', 'BFS', 'Graph', 'Heap', 'Matrix', 'Shortest Path'], type: 'GRID_INT', langsrc: T.GRID_INT('minCost'),
  desc: '<p>Each cell of the grid holds a sign pointing to the next cell you move to: <code>1</code> = right, <code>2</code> = left, <code>3</code> = down, <code>4</code> = up. Starting at the top-left cell, you follow signs for free, but you may change the sign of any cell (cost <code>1</code> each). Return the minimum total cost to reach the bottom-right cell.</p>',
  examples: [{ in: 'grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]', out: '3' }, { in: 'grid = [[1,1,3],[3,2,2],[1,1,4]]', out: '0' }, { in: 'grid = [[1,2],[4,3]]', out: '1' }],
  constraints: ['1 &lt;= m, n &lt;= 100', '1 &lt;= grid[i][j] &lt;= 4.'],
  editorial: ed('0-1 BFS', 'model each cell as a node; following the existing sign costs 0 and any other move costs 1; run a deque BFS from the top-left', 'O(m*n)', 'O(m*n)'),
  gen: function () {
    var o = [[[[1, 1, 1, 1], [2, 2, 2, 2], [1, 1, 1, 1], [2, 2, 2, 2]]], [[[1, 1, 3], [3, 2, 2], [1, 1, 4]]], [[[1, 2], [4, 3]]], [[[3]]]];
    for (var k = 0; k < 35; k++) { var R = randInt(1, 5), C = randInt(1, 5); o.push([dirGrid(R, C)]); }
    return o;
  },
  ref: function (a) {
    var g = a[0], R = g.length, C = g[0].length, INF = 1e9, i;
    var dist = []; for (i = 0; i < R; i++) dist.push(new Array(C).fill(INF));
    dist[0][0] = 0; var dq = [[0, 0]];
    var arrows = [[0, 1, 1], [0, -1, 2], [1, 0, 3], [-1, 0, 4]];
    while (dq.length) {
      var cur = dq.shift(), cr = cur[0], cc = cur[1];
      for (var k = 0; k < 4; k++) {
        var nr = cr + arrows[k][0], nc = cc + arrows[k][1], sign = arrows[k][2];
        if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
        var cost = (g[cr][cc] === sign) ? 0 : 1;
        if (dist[cr][cc] + cost < dist[nr][nc]) { dist[nr][nc] = dist[cr][cc] + cost; if (cost === 0) dq.unshift([nr, nc]); else dq.push([nr, nc]); }
      }
    }
    return dist[R - 1][C - 1];
  }
});

// ---- Trapping Rain Water II (GRID_INT heights) ----
MORE28.push({
  slug: 'trapping-rain-water-ii', title: 'Trapping Rain Water II', difficulty: 'hard', topics: ['Array', 'BFS', 'Heap', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('trapRainWater'),
  desc: '<p>Given an <code>m x n</code> matrix of non-negative integers representing the height of each cell, return the volume of water that can be trapped after raining.</p>',
  examples: [{ in: 'heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]', out: '4' }, { in: 'heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]', out: '10' }],
  constraints: ['m == heightMap.length', 'n == heightMap[i].length', '1 &lt;= m, n &lt;= 200', '0 &lt;= heightMap[i][j] &lt;= 2*10^4.'],
  editorial: ed('Min-heap from the border', 'push all boundary cells into a min-heap keyed on height; pop the lowest wall, trap water against taller inner neighbours, and push the raised level inward', 'O(m*n log(m*n))', 'O(m*n)'),
  gen: function () {
    var o = [[[[1, 4, 3, 1, 3, 2], [3, 2, 1, 3, 2, 4], [2, 3, 3, 2, 3, 1]]], [[[3, 3, 3, 3, 3], [3, 2, 2, 2, 3], [3, 2, 1, 2, 3], [3, 2, 2, 2, 3], [3, 3, 3, 3, 3]]], [[[1, 1], [1, 1]]], [[[5]]]];
    for (var k = 0; k < 35; k++) { var R = randInt(1, 6), C = randInt(1, 6); o.push([intGrid(R, C, 0, 12)]); }
    return o;
  },
  ref: function (a) {
    var g = a[0], R = g.length, C = g[0].length, i, j;
    if (R < 3 || C < 3) return 0;
    var vis = []; for (i = 0; i < R; i++) vis.push(new Array(C).fill(false));
    var heap = [];
    function pop() { var mi = 0; for (var i = 1; i < heap.length; i++) if (heap[i][0] < heap[mi][0]) mi = i; return heap.splice(mi, 1)[0]; }
    for (i = 0; i < R; i++) for (j = 0; j < C; j++) if (i === 0 || i === R - 1 || j === 0 || j === C - 1) { heap.push([g[i][j], i, j]); vis[i][j] = true; }
    var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]], water = 0;
    while (heap.length) {
      var cur = pop(), h = cur[0], cr = cur[1], cc = cur[2];
      for (var d = 0; d < 4; d++) { var nr = cr + dirs[d][0], nc = cc + dirs[d][1]; if (nr >= 0 && nr < R && nc >= 0 && nc < C && !vis[nr][nc]) { vis[nr][nc] = true; if (h > g[nr][nc]) water += h - g[nr][nc]; heap.push([Math.max(h, g[nr][nc]), nr, nc]); } }
    }
    return water;
  }
});

// ---- Maximum Number of Points with Cost (GRID_INT) ----
MORE28.push({
  slug: 'maximum-number-of-points-with-cost', title: 'Maximum Number of Points with Cost', difficulty: 'hard', topics: ['Array', 'Dynamic Programming', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('maxPoints'),
  desc: '<p>You are given an <code>m x n</code> matrix <code>points</code>. You pick exactly one cell in each row. Picking cell <code>(r, c)</code> adds <code>points[r][c]</code> to your score, but for adjacent rows you lose <code>abs(c1 - c2)</code> for the columns picked. Return the maximum score obtainable.</p>',
  examples: [{ in: 'points = [[1,2,3],[1,5,1],[3,1,1]]', out: '9' }, { in: 'points = [[1,5],[2,3],[4,2]]', out: '11' }],
  constraints: ['m == points.length', 'n == points[i].length', '1 &lt;= m, n &lt;= 10^5', '1 &lt;= m*n &lt;= 10^5', '0 &lt;= points[r][c] &lt;= 10^5.'],
  editorial: ed('Row DP with prefix maxima', 'carry the best achievable score per column; combine left-to-right and right-to-left running maxima to fold in the abs column penalty in linear time', 'O(m*n)', 'O(n)'),
  gen: function () {
    var o = [[[[1, 2, 3], [1, 5, 1], [3, 1, 1]]], [[[1, 5], [2, 3], [4, 2]]], [[[5]]], [[[0, 0], [0, 0]]]];
    for (var k = 0; k < 35; k++) { var R = randInt(1, 6), C = randInt(1, 6); o.push([intGrid(R, C, 0, 9)]); }
    return o;
  },
  ref: function (a) {
    var g = a[0], R = g.length, C = g[0].length, j;
    var dp = g[0].slice();
    for (var r = 1; r < R; r++) {
      var left = new Array(C), right = new Array(C);
      left[0] = dp[0]; for (j = 1; j < C; j++) left[j] = Math.max(left[j - 1] - 1, dp[j]);
      right[C - 1] = dp[C - 1]; for (j = C - 2; j >= 0; j--) right[j] = Math.max(right[j + 1] - 1, dp[j]);
      var nd = new Array(C); for (j = 0; j < C; j++) nd[j] = g[r][j] + Math.max(left[j], right[j]);
      dp = nd;
    }
    var best = dp[0]; for (j = 1; j < C; j++) if (dp[j] > best) best = dp[j];
    return best;
  }
});

// ---- Minimum Falling Path Sum II (GRID_INT, square) ----
MORE28.push({
  slug: 'minimum-falling-path-sum-ii', title: 'Minimum Falling Path Sum II', difficulty: 'hard', topics: ['Array', 'Dynamic Programming', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('minFallingPathSum'),
  desc: '<p>Given an <code>n x n</code> integer matrix <code>grid</code>, a falling path with non-zero shifts chooses exactly one element from each row so that no two elements chosen from adjacent rows are in the same column. Return the minimum sum of such a falling path.</p>',
  examples: [{ in: 'grid = [[1,2,3],[4,5,6],[7,8,9]]', out: '13' }, { in: 'grid = [[7]]', out: '7' }],
  constraints: ['n == grid.length == grid[i].length', '1 &lt;= n &lt;= 200', '-99 &lt;= grid[i][j] &lt;= 99.'],
  editorial: ed('Row DP with two minima', 'for each row combine with the smallest previous value from a different column, tracking the two smallest values of the previous row', 'O(n^2)', 'O(n)'),
  gen: function () {
    var o = [[[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], [[[7]]], [[[-1, 2], [3, -4]]], [[[2, 2], [2, 2]]]];
    for (var k = 0; k < 35; k++) { var n = randInt(1, 6); o.push([intGrid(n, n, -9, 9)]); }
    return o;
  },
  ref: function (a) {
    var g = a[0], R = g.length, C = g[0].length, j;
    var dp = g[0].slice();
    for (var r = 1; r < R; r++) {
      var m1 = Infinity, m1i = -1, m2 = Infinity;
      for (j = 0; j < C; j++) { if (dp[j] < m1) { m2 = m1; m1 = dp[j]; m1i = j; } else if (dp[j] < m2) { m2 = dp[j]; } }
      var nd = new Array(C);
      for (j = 0; j < C; j++) { var pick = (j === m1i) ? m2 : m1; nd[j] = g[r][j] + pick; }
      dp = nd;
    }
    var ans = Infinity; for (j = 0; j < C; j++) if (dp[j] < ans) ans = dp[j];
    return ans;
  }
});

// ---- Dungeon Game (GRID_INT) ----
MORE28.push({
  slug: 'dungeon-game', title: 'Dungeon Game', difficulty: 'hard', topics: ['Array', 'Dynamic Programming', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('calculateMinimumHP'),
  desc: '<p>A knight starts at the top-left cell of a dungeon grid and must reach the bottom-right cell, moving only right or down. Each cell adds its value to the knight\'s health (negative values are demons, positive are potions). If health ever drops to <code>0</code> or below, the knight dies. Return the minimum initial health needed to reach the destination alive.</p>',
  examples: [{ in: 'dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]', out: '7' }, { in: 'dungeon = [[0]]', out: '1' }],
  constraints: ['m == dungeon.length', 'n == dungeon[i].length', '1 &lt;= m, n &lt;= 200', '-1000 &lt;= dungeon[i][j] &lt;= 1000.'],
  editorial: ed('Reverse DP', 'compute the minimum health required entering each cell working backwards from the destination; health must stay at least 1 everywhere', 'O(m*n)', 'O(m*n)'),
  gen: function () {
    var o = [[[[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]], [[[0]]], [[[100]]], [[[-3, 5], [1, -4]]]];
    for (var k = 0; k < 35; k++) { var R = randInt(1, 5), C = randInt(1, 5); o.push([intGrid(R, C, -9, 9)]); }
    return o;
  },
  ref: function (a) {
    var g = a[0], R = g.length, C = g[0].length, i;
    var dp = []; for (i = 0; i <= R; i++) dp.push(new Array(C + 1).fill(Infinity));
    dp[R][C - 1] = 1; dp[R - 1][C] = 1;
    for (var r = R - 1; r >= 0; r--) for (var c = C - 1; c >= 0; c--) { var need = Math.min(dp[r + 1][c], dp[r][c + 1]) - g[r][c]; dp[r][c] = need <= 0 ? 1 : need; }
    return dp[0][0];
  }
});

// ---- Cut Off Trees for Golf Event (GRID_INT) ----
MORE28.push({
  slug: 'cut-off-trees-for-golf-event', title: 'Cut Off Trees for Golf Event', difficulty: 'hard', topics: ['Array', 'BFS', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('cutOffTree'),
  desc: '<p>You are given a grid where <code>0</code> is an impassable obstacle, <code>1</code> is walkable ground, and any value greater than <code>1</code> is a tree of that height (all tree heights are distinct). Starting at the top-left cell, you must cut all trees in order of increasing height, walking 4-directionally (you may walk through trees). Return the total number of steps, or <code>-1</code> if some tree cannot be reached.</p>',
  examples: [{ in: 'forest = [[1,2,3],[0,0,4],[7,6,5]]', out: '6' }, { in: 'forest = [[1,2,3],[0,0,0],[7,6,5]]', out: '-1' }, { in: 'forest = [[2,3,4],[0,0,5],[8,7,6]]', out: '6' }],
  constraints: ['1 &lt;= m, n &lt;= 50', '0 &lt;= forest[i][j] &lt;= 10^9', 'The top-left cell is walkable.'],
  editorial: ed('BFS between consecutive trees', 'sort tree cells by height, then BFS from the current position to each next tree summing steps; return -1 if any BFS fails', 'O((m*n)^2)', 'O(m*n)'),
  gen: function () {
    var o = [[[[1, 2, 3], [0, 0, 4], [7, 6, 5]]], [[[1, 2, 3], [0, 0, 0], [7, 6, 5]]], [[[2, 3, 4], [0, 0, 5], [8, 7, 6]]], [[[1]]]];
    for (var k = 0; k < 35; k++) { var R = randInt(1, 5), C = randInt(1, 5); o.push([cutGrid(R, C)]); }
    return o;
  },
  ref: function (a) {
    var g = a[0], R = g.length, C = g[0].length, r, c;
    var trees = [];
    for (r = 0; r < R; r++) for (c = 0; c < C; c++) if (g[r][c] > 1) trees.push([g[r][c], r, c]);
    trees.sort(function (x, y) { return x[0] - y[0]; });
    var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    function bfs(sr, sc, tr, tc) {
      if (sr === tr && sc === tc) return 0;
      var vis = []; for (var i = 0; i < R; i++) vis.push(new Array(C).fill(false));
      vis[sr][sc] = true; var q = [[sr, sc]], steps = 0;
      while (q.length) { var nq = []; steps++; for (var k = 0; k < q.length; k++) { var cr = q[k][0], cc = q[k][1]; for (var d = 0; d < 4; d++) { var nr = cr + dirs[d][0], nc = cc + dirs[d][1]; if (nr >= 0 && nr < R && nc >= 0 && nc < C && !vis[nr][nc] && g[nr][nc] !== 0) { if (nr === tr && nc === tc) return steps; vis[nr][nc] = true; nq.push([nr, nc]); } } } q = nq; }
      return -1;
    }
    var sr = 0, sc = 0, total = 0;
    for (var t = 0; t < trees.length; t++) { var d = bfs(sr, sc, trees[t][1], trees[t][2]); if (d === -1) return -1; total += d; sr = trees[t][1]; sc = trees[t][2]; }
    return total;
  }
});

// ---- Swim in Rising Water (GRID_INT permutation) ----
MORE28.push({
  slug: 'swim-in-rising-water', title: 'Swim in Rising Water', difficulty: 'hard', topics: ['Array', 'BFS', 'Union Find', 'Heap', 'Matrix', 'Binary Search'], type: 'GRID_INT', langsrc: T.GRID_INT('swimInWater'),
  desc: '<p>You are given an <code>n x n</code> grid where <code>grid[i][j]</code> is the elevation at that cell. At time <code>t</code>, water rises to depth <code>t</code>, and you may swim from a cell to a 4-directional neighbour only if both elevations are at most <code>t</code>. Starting at the top-left cell, return the least time until you can reach the bottom-right cell.</p>',
  examples: [{ in: 'grid = [[0,2],[1,3]]', out: '3' }, { in: 'grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]', out: '16' }],
  constraints: ['n == grid.length == grid[i].length', '1 &lt;= n &lt;= 50', 'grid[i][j] is a permutation of 0..n^2-1.'],
  editorial: ed('Dijkstra on max elevation', 'run a best-first search from the top-left minimizing the maximum elevation encountered so far; the answer is that maximum when the destination is popped', 'O(n^2 log n)', 'O(n^2)'),
  gen: function () {
    var o = [[[[0, 2], [1, 3]]], [[[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]], [[[0]]], [[[0, 1], [3, 2]]]];
    for (var k = 0; k < 35; k++) { var n = randInt(1, 5); o.push([permGrid(n)]); }
    return o;
  },
  ref: function (a) {
    var g = a[0], n = g.length, i;
    var vis = []; for (i = 0; i < n; i++) vis.push(new Array(n).fill(false));
    var heap = [[g[0][0], 0, 0]]; vis[0][0] = true;
    function pop() { var mi = 0; for (var i = 1; i < heap.length; i++) if (heap[i][0] < heap[mi][0]) mi = i; return heap.splice(mi, 1)[0]; }
    var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]], ans = g[0][0];
    while (heap.length) {
      var cur = pop(); if (cur[0] > ans) ans = cur[0]; var cr = cur[1], cc = cur[2];
      if (cr === n - 1 && cc === n - 1) return ans;
      for (var d = 0; d < 4; d++) { var nr = cr + dirs[d][0], nc = cc + dirs[d][1]; if (nr >= 0 && nr < n && nc >= 0 && nc < n && !vis[nr][nc]) { vis[nr][nc] = true; heap.push([g[nr][nc], nr, nc]); } }
    }
    return ans;
  }
});

module.exports = { MORE28 };
