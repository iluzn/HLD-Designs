// Batch 24: famous graph & grid problems (BFS / DFS / union-find).
// Only unambiguous, single-value outputs. Types mirror existing batches:
//   GRID_INT, CHARGRID_INT, INT_EDGES_INT, INT_EDGES_BOOL.
const { T, randInt } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}
function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = randInt(0, i); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function binGrid(R, C, p) { var g = []; for (var i = 0; i < R; i++) { var row = []; for (var j = 0; j < C; j++) row.push(Math.random() < p ? 1 : 0); g.push(row); } return g; }

const MORE24 = [];

// ---- Island Perimeter (GRID_INT) ----
MORE24.push({ slug: 'island-perimeter', title: 'Island Perimeter', difficulty: 'easy', topics: ['Array', 'DFS', 'BFS', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('islandPerimeter'),
  desc: '<p>Given a binary grid where <code>1</code> is land and <code>0</code> is water, return the total perimeter of the land. Each land cell contributes one unit of perimeter for every edge that borders water or the grid boundary.</p>',
  examples: [{ in: 'grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]', out: '16' }, { in: 'grid = [[1]]', out: '4' }],
  constraints: ['1 &lt;= m, n &lt;= 100', 'grid[i][j] is 0 or 1.'],
  editorial: ed('Count exposed edges', 'for each land cell add 1 for every side that is water or off-grid', 'O(m*n)', 'O(1)'),
  gen: function () { var o = [[[[0, 1, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]]], [[[1]]], [[[1, 0]]], [[[1, 1], [1, 1]]]]; for (var k = 0; k < 32; k++) o.push([binGrid(randInt(1, 4), randInt(1, 4), 0.5)]); return o; },
  ref: function (a) { var g = a[0], R = g.length, C = g[0].length, per = 0; for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) if (g[r][c] === 1) { if (r === 0 || g[r - 1][c] === 0) per++; if (r === R - 1 || g[r + 1][c] === 0) per++; if (c === 0 || g[r][c - 1] === 0) per++; if (c === C - 1 || g[r][c + 1] === 0) per++; } return per; } });

// ---- Number of Closed Islands (GRID_INT) ----
MORE24.push({ slug: 'number-of-closed-islands', title: 'Number of Closed Islands', difficulty: 'medium', topics: ['Graph', 'DFS', 'BFS', 'Union Find', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('closedIsland'),
  desc: '<p>Given a grid where <code>0</code> is land and <code>1</code> is water, an island is a maximal group of 4-directionally connected land cells. Return the number of <strong>closed islands</strong> &mdash; islands that are entirely surrounded by water (no land cell touches the grid border).</p>',
  examples: [{ in: 'grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]', out: '2' }, { in: 'grid = [[1,1,1],[1,0,1],[1,1,1]]', out: '1' }],
  constraints: ['1 &lt;= m, n &lt;= 100', 'grid[i][j] is 0 or 1.'],
  editorial: ed('Flood fill + border check', 'DFS each land component; it is closed only if no cell touches the border', 'O(m*n)', 'O(m*n)'),
  gen: function () { var o = [[[[1, 1, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0], [1, 0, 0, 0, 0, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 0]]], [[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], [[[0, 0, 1, 0, 0]]], [[[1]]]]; for (var k = 0; k < 32; k++) o.push([binGrid(randInt(1, 5), randInt(1, 5), 0.55)]); return o; },
  ref: function (a) { var g = a[0].map(function (r) { return r.slice(); }), R = g.length, C = g[0].length; var edge = { v: false }; function dfs(r, c) { if (r < 0 || r >= R || c < 0 || c >= C) { edge.v = true; return; } if (g[r][c] !== 0) return; g[r][c] = 2; dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1); } var cnt = 0; for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) if (g[r][c] === 0) { edge.v = false; dfs(r, c); if (!edge.v) cnt++; } return cnt; } });

// ---- Number of Enclaves (GRID_INT) ----
MORE24.push({ slug: 'number-of-enclaves', title: 'Number of Enclaves', difficulty: 'medium', topics: ['Graph', 'DFS', 'BFS', 'Union Find', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('numEnclaves'),
  desc: '<p>Given a binary grid where <code>1</code> is land and <code>0</code> is sea, return the number of land cells from which you <strong>cannot</strong> walk off the boundary of the grid moving 4-directionally through land.</p>',
  examples: [{ in: 'grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]', out: '3' }, { in: 'grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]', out: '0' }],
  constraints: ['1 &lt;= m, n &lt;= 500', 'grid[i][j] is 0 or 1.'],
  editorial: ed('Flood from border', 'DFS from every border land cell to sink reachable land; count the land that remains', 'O(m*n)', 'O(m*n)'),
  gen: function () { var o = [[[[0, 0, 0, 0], [1, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]], [[[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]]], [[[1]]], [[[0]]]]; for (var k = 0; k < 32; k++) o.push([binGrid(randInt(1, 5), randInt(1, 5), 0.5)]); return o; },
  ref: function (a) { var g = a[0].map(function (r) { return r.slice(); }), R = g.length, C = g[0].length; function dfs(r, c) { if (r < 0 || r >= R || c < 0 || c >= C || g[r][c] !== 1) return; g[r][c] = 0; dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1); } for (var r = 0; r < R; r++) { dfs(r, 0); dfs(r, C - 1); } for (var c = 0; c < C; c++) { dfs(0, c); dfs(R - 1, c); } var cnt = 0; for (r = 0; r < R; r++) for (c = 0; c < C; c++) if (g[r][c] === 1) cnt++; return cnt; } });

// ---- Count Servers that Communicate (GRID_INT) ----
MORE24.push({ slug: 'count-servers-that-communicate', title: 'Count Servers that Communicate', difficulty: 'medium', topics: ['Array', 'Graph', 'Matrix', 'Counting'], type: 'GRID_INT', langsrc: T.GRID_INT('countServers'),
  desc: '<p>You are given a grid of <code>0</code>s and <code>1</code>s where <code>1</code> marks a server. Two servers communicate if they lie in the same row or the same column. Return the number of servers that can communicate with at least one other server.</p>',
  examples: [{ in: 'grid = [[1,0],[0,1]]', out: '0' }, { in: 'grid = [[1,0],[1,1]]', out: '3' }],
  constraints: ['1 &lt;= m, n &lt;= 250', 'grid[i][j] is 0 or 1.'],
  editorial: ed('Row/column counts', 'count servers per row and column; a server communicates if its row or column has more than one server', 'O(m*n)', 'O(m+n)'),
  gen: function () { var o = [[[[1, 0], [0, 1]]], [[[1, 0], [1, 1]]], [[[1, 1, 0, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 1]]], [[[1]]]]; for (var k = 0; k < 32; k++) o.push([binGrid(randInt(1, 5), randInt(1, 5), 0.45)]); return o; },
  ref: function (a) { var g = a[0], R = g.length, C = g[0].length, rowC = new Array(R).fill(0), colC = new Array(C).fill(0); for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) if (g[r][c] === 1) { rowC[r]++; colC[c]++; } var cnt = 0; for (r = 0; r < R; r++) for (c = 0; c < C; c++) if (g[r][c] === 1 && (rowC[r] > 1 || colC[c] > 1)) cnt++; return cnt; } });

// ---- As Far from Land as Possible (GRID_INT) ----
MORE24.push({ slug: 'as-far-from-land-as-possible', title: 'As Far from Land as Possible', difficulty: 'medium', topics: ['Graph', 'BFS', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('maxDistance'),
  desc: '<p>Given a grid where <code>1</code> is land and <code>0</code> is water, find the water cell whose Manhattan distance to the nearest land cell is maximized, and return that distance. If the grid has no water or no land, return <code>-1</code>.</p>',
  examples: [{ in: 'grid = [[1,0,1],[0,0,0],[1,0,1]]', out: '2' }, { in: 'grid = [[1,0,0],[0,0,0],[0,0,0]]', out: '4' }],
  constraints: ['1 &lt;= n &lt;= 100', 'grid[i][j] is 0 or 1.'],
  editorial: ed('Multi-source BFS', 'BFS outward from all land cells at once; the last layer reached is the farthest distance', 'O(n^2)', 'O(n^2)'),
  gen: function () { var o = [[[[1, 0, 1], [0, 0, 0], [1, 0, 1]]], [[[1, 0, 0], [0, 0, 0], [0, 0, 0]]], [[[1, 1, 1], [1, 1, 1]]], [[[0, 0], [0, 0]]]]; for (var k = 0; k < 32; k++) o.push([binGrid(randInt(1, 5), randInt(1, 5), 0.4)]); return o; },
  ref: function (a) { var g = a[0].map(function (r) { return r.slice(); }), R = g.length, C = g[0].length, q = []; for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) if (g[r][c] === 1) q.push([r, c]); if (q.length === 0 || q.length === R * C) return -1; var dist = 0, dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]; while (q.length) { var nq = []; for (var i = 0; i < q.length; i++) { var cr = q[i][0], cc = q[i][1]; for (var d = 0; d < 4; d++) { var nr = cr + dirs[d][0], nc = cc + dirs[d][1]; if (nr >= 0 && nr < R && nc >= 0 && nc < C && g[nr][nc] === 0) { g[nr][nc] = 1; nq.push([nr, nc]); } } } if (nq.length) dist++; q = nq; } return dist; } });

// ---- Shortest Path in Binary Matrix (GRID_INT) ----
MORE24.push({ slug: 'shortest-path-in-binary-matrix', title: 'Shortest Path in Binary Matrix', difficulty: 'medium', topics: ['Graph', 'BFS', 'Matrix'], type: 'GRID_INT', langsrc: T.GRID_INT('shortestPathBinaryMatrix'),
  desc: '<p>Given a binary matrix <code>grid</code>, return the length of the shortest clear path from the top-left cell to the bottom-right cell, or <code>-1</code> if none exists. A clear path visits only cells with value <code>0</code> and may move in any of the 8 directions. Path length is the number of visited cells.</p>',
  examples: [{ in: 'grid = [[0,1],[1,0]]', out: '2' }, { in: 'grid = [[0,0,0],[1,1,0],[1,1,0]]', out: '4' }],
  constraints: ['1 &lt;= m, n &lt;= 100', 'grid[i][j] is 0 or 1.'],
  editorial: ed('8-directional BFS', 'BFS from the top-left through 0-cells over 8 neighbours, counting cells until the bottom-right is reached', 'O(m*n)', 'O(m*n)'),
  gen: function () { var o = [[[[0, 1], [1, 0]]], [[[0, 0, 0], [1, 1, 0], [1, 1, 0]]], [[[1, 0, 0]]], [[[0]]]]; for (var k = 0; k < 32; k++) o.push([binGrid(randInt(1, 4), randInt(1, 4), 0.4)]); return o; },
  ref: function (a) { var g = a[0], R = g.length, C = g[0].length; if (g[0][0] !== 0 || g[R - 1][C - 1] !== 0) return -1; var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]; var vis = g.map(function (r) { return r.slice(); }); vis[0][0] = 1; var q = [[0, 0]], len = 1; while (q.length) { var nq = []; for (var i = 0; i < q.length; i++) { var cr = q[i][0], cc = q[i][1]; if (cr === R - 1 && cc === C - 1) return len; for (var d = 0; d < 8; d++) { var nr = cr + dirs[d][0], nc = cc + dirs[d][1]; if (nr >= 0 && nr < R && nc >= 0 && nc < C && vis[nr][nc] === 0) { vis[nr][nc] = 1; nq.push([nr, nc]); } } } len++; q = nq; } return -1; } });

// ---- Number of Provinces (GRID_INT adjacency matrix) ----
MORE24.push({ slug: 'number-of-provinces', title: 'Number of Provinces', difficulty: 'medium', topics: ['Graph', 'DFS', 'BFS', 'Union Find'], type: 'GRID_INT', langsrc: T.GRID_INT('findCircleNum'),
  desc: '<p>There are <code>n</code> cities. You are given an <code>n x n</code> matrix <code>grid</code> where <code>grid[i][j] = 1</code> means city <code>i</code> and city <code>j</code> are directly connected. A province is a group of directly or indirectly connected cities. Return the total number of provinces.</p>',
  examples: [{ in: 'grid = [[1,1,0],[1,1,0],[0,0,1]]', out: '2' }, { in: 'grid = [[1,0,0],[0,1,0],[0,0,1]]', out: '3' }],
  constraints: ['1 &lt;= n &lt;= 200', 'grid[i][j] is 1 or 0', 'grid[i][i] == 1', 'grid[i][j] == grid[j][i].'],
  editorial: ed('Union-Find', 'union every connected pair (i,j); the answer is the number of distinct roots', 'O(n^2)', 'O(n)'),
  gen: function () { var o = [[[[1, 1, 0], [1, 1, 0], [0, 0, 1]]], [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]], [[[1, 1], [1, 1]]], [[[1]]]]; for (var k = 0; k < 32; k++) { var n = randInt(1, 5), g = []; for (var i = 0; i < n; i++) { var row = []; for (var j = 0; j < n; j++) row.push(0); g.push(row); } for (i = 0; i < n; i++) g[i][i] = 1; for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) { var v = Math.random() < 0.4 ? 1 : 0; g[i][j] = v; g[j][i] = v; } o.push([g]); } return o; },
  ref: function (a) { var g = a[0], n = g.length, par = []; for (var i = 0; i < n; i++) par[i] = i; function find(x) { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; } for (i = 0; i < n; i++) for (var j = i + 1; j < n; j++) if (g[i][j] === 1) par[find(i)] = find(j); var s = {}; for (i = 0; i < n; i++) s[find(i)] = 1; return Object.keys(s).length; } });

// ---- Find the Town Judge (INT_EDGES_INT, directed trust) ----
MORE24.push({ slug: 'find-the-town-judge', title: 'Find the Town Judge', difficulty: 'easy', topics: ['Graph', 'Array', 'Hash Table'], type: 'INT_EDGES_INT', langsrc: T.INT_EDGES_INT('findJudge'),
  desc: '<p>In a town of <code>n</code> people labeled 1..n, exactly one person may be the town judge. Each edge <code>[a, b]</code> means person <code>a</code> trusts person <code>b</code>. The judge trusts nobody, and every other person trusts the judge. Return the judge&#39;s label, or <code>-1</code> if there is no such person.</p>',
  examples: [{ in: 'n = 2, edges = [[1,2]]', out: '2' }, { in: 'n = 3, edges = [[1,3],[2,3]]', out: '3' }, { in: 'n = 3, edges = [[1,3],[2,3],[3,1]]', out: '-1' }],
  constraints: ['1 &lt;= n &lt;= 1000', 'edges[i] = [a, b] with a != b.'],
  editorial: ed('Trust score', 'score[b]++ and score[a]--; the judge is the person whose score equals n-1', 'O(n + e)', 'O(n)'),
  gen: function () { var o = [[2, [[1, 2]]], [3, [[1, 3], [2, 3]]], [3, [[1, 3], [2, 3], [3, 1]]], [1, []]]; for (var k = 0; k < 32; k++) { var n = randInt(1, 6), m = randInt(0, n + 1), seen = {}, edges = []; for (var i = 0; i < m; i++) { var a = randInt(1, n), b = randInt(1, n); if (a === b) continue; var key = a + ',' + b; if (seen[key]) continue; seen[key] = 1; edges.push([a, b]); } o.push([n, edges]); } return o; },
  ref: function (a) { var n = a[0], edges = a[1], score = new Array(n + 1).fill(0); edges.forEach(function (e) { score[e[0]]--; score[e[1]]++; }); for (var i = 1; i <= n; i++) if (score[i] === n - 1) return i; return -1; } });

// ---- Find Center of Star Graph (INT_EDGES_INT) ----
MORE24.push({ slug: 'find-center-of-star-graph', title: 'Find Center of Star Graph', difficulty: 'easy', topics: ['Graph'], type: 'INT_EDGES_INT', langsrc: T.INT_EDGES_INT('findCenter'),
  desc: '<p>You are given an undirected star graph of <code>n</code> nodes labeled 1..n. A star graph has one center node connected to every other node, and no other edges. Given its <code>edges</code>, return the label of the center node.</p>',
  examples: [{ in: 'n = 3, edges = [[1,2],[2,3]]', out: '2' }, { in: 'n = 4, edges = [[4,1],[4,2],[4,3]]', out: '4' }],
  constraints: ['3 &lt;= n &lt;= 10^5', 'The given graph is a valid star graph.'],
  editorial: ed('Common endpoint', 'the center is the node shared by the first two edges', 'O(1)', 'O(1)'),
  gen: function () { var o = [[3, [[1, 2], [2, 3]]], [4, [[4, 1], [4, 2], [4, 3]]], [3, [[2, 1], [2, 3]]]]; for (var k = 0; k < 33; k++) { var n = randInt(3, 7), center = randInt(1, n), edges = []; for (var i = 1; i <= n; i++) if (i !== center) { if (Math.random() < 0.5) edges.push([center, i]); else edges.push([i, center]); } shuffle(edges); o.push([n, edges]); } return o; },
  ref: function (a) { var edges = a[1], e0 = edges[0], e1 = edges[1]; return (e0[0] === e1[0] || e0[0] === e1[1]) ? e0[0] : e0[1]; } });

// ---- Count the Number of Complete Components (INT_EDGES_INT) ----
MORE24.push({ slug: 'count-the-number-of-complete-components', title: 'Count the Number of Complete Components', difficulty: 'medium', topics: ['Graph', 'DFS', 'BFS', 'Union Find'], type: 'INT_EDGES_INT', langsrc: T.INT_EDGES_INT('countCompleteComponents'),
  desc: '<p>Given <code>n</code> nodes labeled 0..n-1 and a list of undirected <code>edges</code>, return the number of <strong>complete connected components</strong>. A connected component is complete if every pair of its vertices is connected by a direct edge.</p>',
  examples: [{ in: 'n = 6, edges = [[0,1],[0,2],[1,2],[3,4]]', out: '3' }, { in: 'n = 6, edges = [[0,1],[0,2],[1,2],[3,4],[3,5]]', out: '1' }],
  constraints: ['1 &lt;= n &lt;= 50', '0 &lt;= edges.length &lt;= n*(n-1)/2', 'No repeated edges and no self-loops.'],
  editorial: ed('Union-Find + edge count', 'group nodes with union-find, then a component of k nodes is complete iff it has exactly k*(k-1)/2 edges', 'O(n + e)', 'O(n)'),
  gen: function () { var o = [[6, [[0, 1], [0, 2], [1, 2], [3, 4]]], [6, [[0, 1], [0, 2], [1, 2], [3, 4], [3, 5]]], [3, []], [2, [[0, 1]]]]; for (var k = 0; k < 32; k++) { var n = randInt(1, 6), m = randInt(0, n + 2), seen = {}, edges = []; for (var i = 0; i < m; i++) { var a = randInt(0, n - 1), b = randInt(0, n - 1); if (a === b) continue; var lo = Math.min(a, b), hi = Math.max(a, b), key = lo + ',' + hi; if (seen[key]) continue; seen[key] = 1; edges.push([lo, hi]); } o.push([n, edges]); } return o; },
  ref: function (a) { var n = a[0], edges = a[1], par = []; for (var i = 0; i < n; i++) par[i] = i; function find(x) { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; } edges.forEach(function (e) { par[find(e[0])] = find(e[1]); }); var node = {}, edge = {}; for (i = 0; i < n; i++) { var r = find(i); node[r] = (node[r] || 0) + 1; } edges.forEach(function (e) { var r = find(e[0]); edge[r] = (edge[r] || 0) + 1; }); var cnt = 0; for (var key in node) { var kk = node[key], ee = edge[key] || 0; if (ee === kk * (kk - 1) / 2) cnt++; } return cnt; } });

// ---- Maximal Network Rank (INT_EDGES_INT) ----
MORE24.push({ slug: 'maximal-network-rank', title: 'Maximal Network Rank', difficulty: 'medium', topics: ['Graph', 'Array'], type: 'INT_EDGES_INT', langsrc: T.INT_EDGES_INT('maximalNetworkRank'),
  desc: '<p>There are <code>n</code> cities and some undirected roads given as <code>edges</code>. The network rank of two different cities is the total number of roads directly connected to either city; a road connecting both counts only once. Return the maximum network rank over all pairs of cities.</p>',
  examples: [{ in: 'n = 4, edges = [[0,1],[0,3],[1,2],[1,3]]', out: '4' }, { in: 'n = 5, edges = [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]]', out: '5' }],
  constraints: ['2 &lt;= n &lt;= 100', 'No repeated roads and no self-loops.'],
  editorial: ed('Degree over all pairs', 'compute each city degree, then for every pair sum degrees and subtract one if they share a road', 'O(n^2)', 'O(n^2)'),
  gen: function () { var o = [[4, [[0, 1], [0, 3], [1, 2], [1, 3]]], [5, [[0, 1], [0, 3], [1, 2], [1, 3], [2, 3], [2, 4]]], [8, [[0, 1], [1, 2], [2, 3], [2, 4], [5, 6], [5, 7]]]]; for (var k = 0; k < 33; k++) { var n = randInt(2, 6), m = randInt(0, n + 2), seen = {}, edges = []; for (var i = 0; i < m; i++) { var a = randInt(0, n - 1), b = randInt(0, n - 1); if (a === b) continue; var lo = Math.min(a, b), hi = Math.max(a, b), key = lo + ',' + hi; if (seen[key]) continue; seen[key] = 1; edges.push([lo, hi]); } o.push([n, edges]); } return o; },
  ref: function (a) { var n = a[0], edges = a[1], deg = new Array(n).fill(0), conn = {}; edges.forEach(function (e) { deg[e[0]]++; deg[e[1]]++; conn[e[0] + ',' + e[1]] = 1; conn[e[1] + ',' + e[0]] = 1; }); var best = 0; for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) { var rank = deg[i] + deg[j] - (conn[i + ',' + j] ? 1 : 0); if (rank > best) best = rank; } return best; } });

// ---- Find if Path Exists in Graph (INT_EDGES_BOOL, source 0 to n-1) ----
MORE24.push({ slug: 'find-if-path-exists-in-graph', title: 'Find if Path Exists in Graph', difficulty: 'easy', topics: ['Graph', 'DFS', 'BFS', 'Union Find'], type: 'INT_EDGES_BOOL', langsrc: T.INT_EDGES_BOOL('validPath'),
  desc: '<p>There is a bi-directional graph with <code>n</code> vertices labeled 0..n-1, described by the list of undirected <code>edges</code>. Return <code>true</code> if there is a valid path from vertex <code>0</code> to vertex <code>n-1</code>, and <code>false</code> otherwise.</p>',
  examples: [{ in: 'n = 3, edges = [[0,1],[1,2],[2,0]]', out: 'true' }, { in: 'n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]]', out: 'false' }],
  constraints: ['1 &lt;= n &lt;= 2*10^5', '0 &lt;= edges.length &lt;= 2*10^5'],
  editorial: ed('Union-Find', 'union every edge, then check whether 0 and n-1 share a root', 'O(n + e)', 'O(n)'),
  gen: function () { var o = [[3, [[0, 1], [1, 2], [2, 0]]], [6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]]], [1, []], [2, [[0, 1]]]]; for (var k = 0; k < 32; k++) { var n = randInt(1, 7), m = randInt(0, n + 1), seen = {}, edges = []; for (var i = 0; i < m; i++) { var a = randInt(0, n - 1), b = randInt(0, n - 1); if (a === b) continue; var lo = Math.min(a, b), hi = Math.max(a, b), key = lo + ',' + hi; if (seen[key]) continue; seen[key] = 1; edges.push([lo, hi]); } o.push([n, edges]); } return o; },
  ref: function (a) { var n = a[0], edges = a[1], par = []; for (var i = 0; i < n; i++) par[i] = i; function find(x) { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; } edges.forEach(function (e) { par[find(e[0])] = find(e[1]); }); return find(0) === find(n - 1); } });

// ---- Find Champion II (INT_EDGES_INT, directed) ----
MORE24.push({ slug: 'find-champion-ii', title: 'Find Champion II', difficulty: 'medium', topics: ['Graph'], type: 'INT_EDGES_INT', langsrc: T.INT_EDGES_INT('findChampion'),
  desc: '<p>There are <code>n</code> teams labeled 0..n-1 in a tournament. Each directed edge <code>[u, v]</code> means team <code>u</code> is stronger than team <code>v</code>. A team is the champion if no other team is stronger than it. Return the label of the unique champion, or <code>-1</code> if it is not unique.</p>',
  examples: [{ in: 'n = 3, edges = [[0,1],[1,2]]', out: '0' }, { in: 'n = 2, edges = [[0,1],[1,0]]', out: '-1' }],
  constraints: ['1 &lt;= n &lt;= 100', 'edges[i] = [u, v] with u != v.'],
  editorial: ed('In-degree count', 'the champion is the only team with in-degree 0; if there are zero or several such teams, return -1', 'O(n + e)', 'O(n)'),
  gen: function () { var o = [[3, [[0, 1], [1, 2]]], [2, [[0, 1], [1, 0]]], [4, [[0, 2], [1, 3], [1, 2]]], [3, [[0, 1], [0, 2]]]]; for (var k = 0; k < 32; k++) { var n = randInt(1, 6), m = randInt(0, n + 1), seen = {}, edges = []; for (var i = 0; i < m; i++) { var a = randInt(0, n - 1), b = randInt(0, n - 1); if (a === b) continue; var key = a + ',' + b; if (seen[key]) continue; seen[key] = 1; edges.push([a, b]); } o.push([n, edges]); } return o; },
  ref: function (a) { var n = a[0], edges = a[1], indeg = new Array(n).fill(0); edges.forEach(function (e) { indeg[e[1]]++; }); var champ = -1, cnt = 0; for (var i = 0; i < n; i++) if (indeg[i] === 0) { champ = i; cnt++; } return cnt === 1 ? champ : -1; } });

// ---- Count Battleships in a Board (CHARGRID_INT) ----
MORE24.push({ slug: 'battleships-in-a-board', title: 'Battleships in a Board', difficulty: 'medium', topics: ['Array', 'DFS', 'Matrix'], type: 'CHARGRID_INT', langsrc: T.CHARGRID_INT('countBattleships'),
  desc: "<p>Given an <code>m x n</code> board where each cell is either <code>'X'</code> (part of a battleship) or <code>'.'</code> (empty), return the number of battleships. Battleships are placed horizontally or vertically, and no two battleships are adjacent (there is at least one empty cell between them).</p>",
  examples: [{ in: 'board = ["X..X","...X","...X"]', out: '2' }, { in: 'board = ["."]', out: '0' }],
  constraints: ['1 &lt;= m, n &lt;= 200', "board[i][j] is 'X' or '.'."],
  editorial: ed('Count ship heads', "count each 'X' whose top and left neighbours are not 'X' &mdash; that cell is the head of a distinct ship", 'O(m*n)', 'O(1)'),
  gen: function () {
    var o = [[['X..X', '...X', '...X']], [['.']], [['X']], [['X.X.X']]];
    for (var k = 0; k < 32; k++) {
      var R = randInt(1, 5), C = randInt(1, 5), g = [];
      for (var i = 0; i < R; i++) { var row = []; for (var j = 0; j < C; j++) row.push('.'); g.push(row); }
      var ships = randInt(0, 3);
      for (var s = 0; s < ships; s++) {
        var horiz = Math.random() < 0.5;
        var maxLen = horiz ? C : R;
        var len = randInt(1, maxLen);
        var r0 = randInt(0, R - 1), c0 = randInt(0, C - 1);
        var cells = [], ok = true;
        for (var t = 0; t < len; t++) { var rr = r0 + (horiz ? 0 : t), cc = c0 + (horiz ? t : 0); if (rr >= R || cc >= C) { ok = false; break; } cells.push([rr, cc]); }
        if (!ok) continue;
        for (t = 0; t < cells.length && ok; t++) {
          var cr = cells[t][0], cc2 = cells[t][1];
          if (g[cr][cc2] !== '.') { ok = false; break; }
          var nb = [[cr + 1, cc2], [cr - 1, cc2], [cr, cc2 + 1], [cr, cc2 - 1]];
          for (var d = 0; d < 4; d++) { var nr = nb[d][0], nc = nb[d][1]; if (nr >= 0 && nr < R && nc >= 0 && nc < C && g[nr][nc] === 'X') { ok = false; break; } }
        }
        if (!ok) continue;
        for (t = 0; t < cells.length; t++) g[cells[t][0]][cells[t][1]] = 'X';
      }
      o.push([g.map(function (row) { return row.join(''); })]);
    }
    return o;
  },
  ref: function (a) { var b = a[0].map(function (s) { return s.split(''); }), R = b.length, C = b[0].length, cnt = 0; for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) { if (b[r][c] === 'X' && (r === 0 || b[r - 1][c] !== 'X') && (c === 0 || b[r][c - 1] !== 'X')) cnt++; } return cnt; } });

module.exports = { MORE24 };
