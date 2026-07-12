// Batch 20: famous binary-tree / BST interview problems returning a scalar
// int, a boolean, or an int array. Types restricted to TREE_INT, TREE_BOOL,
// TREE_ARR, TREE_INT_INT. Trees are serialized level-order with "null" markers,
// mirroring the existing tree batches (problems4 / problems8).
const { T, randInt, ln } = require('./gen.js');

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
// non-empty variant (at least 1 node)
function genTree1(maxNodes, lo, hi) { var t; do { t = genTree(maxNodes, lo, hi); } while (!t.length); return t; }
// random BST with `count` distinct values in [lo,hi], serialized level-order
function genBST(count, lo, hi) {
  var range = hi - lo + 1; if (count > range) count = range;
  var used = {}, arr = [];
  while (arr.length < count) { var v = randInt(lo, hi); if (!used[v]) { used[v] = 1; arr.push(v); } }
  for (var i = arr.length - 1; i > 0; i--) { var j = randInt(0, i); var t = arr[i]; arr[i] = arr[j]; arr[j] = t; }
  var root = null;
  function ins(node, v) { if (!node) return { v: v, l: null, r: null }; if (v < node.v) node.l = ins(node.l, v); else node.r = ins(node.r, v); return node; }
  arr.forEach(function (v) { root = ins(root, v); });
  if (!root) return [];
  var out = [], q = [root];
  while (q.length) { var n = q.shift(); if (n === null) { out.push(null); continue; } out.push(n.v); q.push(n.l); q.push(n.r); }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}

const MORE20 = [];

// ---- Sum Root to Leaf Numbers (TREE_INT, digits 0-9) ----
MORE20.push({ slug: 'sum-root-to-leaf-numbers', title: 'Sum Root to Leaf Numbers', difficulty: 'medium', topics: ['Tree', 'DFS'], type: 'TREE_INT', langsrc: T.TREE_INT('sumNumbers'),
  desc: '<p>Each root-to-leaf path in a binary tree represents a number formed by concatenating the node digits (each node value is a single digit <code>0-9</code>). Return the total sum of all root-to-leaf numbers.</p>',
  examples: [{ in: 'root = [1,2,3]', out: '25', ex: 'Paths 12 and 13; 12 + 13 = 25.' }, { in: 'root = [4,9,0,5,1]', out: '1026' }],
  constraints: ['1 &lt;= number of nodes &lt;= 1000', '0 &lt;= Node.val &lt;= 9'],
  editorial: ed('DFS carrying the running number', 'def sumNumbers(self, root):\n    def dfs(node, cur):\n        if not node: return 0\n        cur = cur * 10 + node.val\n        if not node.left and not node.right: return cur\n        return dfs(node.left, cur) + dfs(node.right, cur)\n    return dfs(root, 0)', 'O(n)', 'O(h)'),
  gen: function () { var o = [[[1, 2, 3]], [[4, 9, 0, 5, 1]], [[0]], [[1, null, 2, null, 3]]]; for (var k = 0; k < 36; k++) o.push([genTree1(randInt(1, 12), 0, 9)]); return o; },
  ref: function (a) { var total = 0; function dfs(n, cur) { if (!n) return; cur = cur * 10 + n.val; if (!n.left && !n.right) { total += cur; return; } dfs(n.left, cur); dfs(n.right, cur); } var r = bt(a[0]); if (r) dfs(r, 0); return total; } });

// ---- Sum of Root To Leaf Binary Numbers (TREE_INT, values 0/1) ----
MORE20.push({ slug: 'sum-of-root-to-leaf-binary-numbers', title: 'Sum of Root To Leaf Binary Numbers', difficulty: 'easy', topics: ['Tree', 'DFS', 'Bit Manipulation'], type: 'TREE_INT', langsrc: T.TREE_INT('sumRootToLeaf'),
  desc: '<p>Every node has value <code>0</code> or <code>1</code>. Each root-to-leaf path represents a binary number (most significant bit first). Return the sum, in base 10, of all root-to-leaf binary numbers.</p>',
  examples: [{ in: 'root = [1,0,1,0,1,0,1]', out: '22' }, { in: 'root = [1,1]', out: '3' }],
  constraints: ['1 &lt;= number of nodes &lt;= 1000', 'Node.val is 0 or 1'],
  editorial: ed('DFS shifting the running value left by one bit', 'def sumRootToLeaf(self, root):\n    def dfs(node, cur):\n        if not node: return 0\n        cur = cur * 2 + node.val\n        if not node.left and not node.right: return cur\n        return dfs(node.left, cur) + dfs(node.right, cur)\n    return dfs(root, 0)', 'O(n)', 'O(h)'),
  gen: function () { var o = [[[1, 0, 1, 0, 1, 0, 1]], [[1, 1]], [[0]], [[1, 0, 0, 0, 1]]]; for (var k = 0; k < 36; k++) o.push([genTree1(randInt(1, 12), 0, 1)]); return o; },
  ref: function (a) { var total = 0; function dfs(n, cur) { if (!n) return; cur = cur * 2 + n.val; if (!n.left && !n.right) { total += cur; return; } dfs(n.left, cur); dfs(n.right, cur); } var r = bt(a[0]); if (r) dfs(r, 0); return total; } });

// ---- Deepest Leaves Sum (TREE_INT) ----
MORE20.push({ slug: 'deepest-leaves-sum', title: 'Deepest Leaves Sum', difficulty: 'medium', topics: ['Tree', 'BFS', 'DFS'], type: 'TREE_INT', langsrc: T.TREE_INT('deepestLeavesSum'),
  desc: '<p>Given the <code>root</code> of a binary tree, return the sum of values of its <strong>deepest</strong> leaves.</p>',
  examples: [{ in: 'root = [1,2,3,4,5,null,6,7,null,null,null,null,8]', out: '15' }, { in: 'root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]', out: '19' }],
  constraints: ['1 &lt;= number of nodes &lt;= 10^4', '1 &lt;= Node.val &lt;= 100'],
  editorial: ed('BFS level by level; keep the last level sum', 'def deepestLeavesSum(self, root):\n    from collections import deque\n    q = deque([root]); s = 0\n    while q:\n        s = 0\n        for _ in range(len(q)):\n            n = q.popleft(); s += n.val\n            if n.left: q.append(n.left)\n            if n.right: q.append(n.right)\n    return s', 'O(n)', 'O(w)'),
  gen: function () { var o = [[[1, 2, 3, 4, 5, null, 6, 7, null, null, null, null, 8]], [[1]], [[5, 4, 6]], [[1, 2, null, 3]]]; for (var k = 0; k < 36; k++) o.push([genTree1(randInt(1, 14), 1, 20)]); return o; },
  ref: function (a) { var root = bt(a[0]); if (!root) return 0; var q = [root], sum = 0; while (q.length) { var nq = []; sum = 0; for (var i = 0; i < q.length; i++) { sum += q[i].val; if (q[i].left) nq.push(q[i].left); if (q[i].right) nq.push(q[i].right); } q = nq; } return sum; } });

// ---- Sum of Nodes with Even-Valued Grandparent (TREE_INT) ----
MORE20.push({ slug: 'sum-of-nodes-with-even-valued-grandparent', title: 'Sum of Nodes with Even-Valued Grandparent', difficulty: 'medium', topics: ['Tree', 'DFS', 'BFS'], type: 'TREE_INT', langsrc: T.TREE_INT('sumEvenGrandparent'),
  desc: '<p>Given the <code>root</code> of a binary tree, return the sum of values of every node whose <strong>grandparent</strong> has an even value. If there are no such nodes, return <code>0</code>.</p>',
  examples: [{ in: 'root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]', out: '18' }, { in: 'root = [1]', out: '0' }],
  constraints: ['1 &lt;= number of nodes &lt;= 10^4', '1 &lt;= Node.val &lt;= 100'],
  editorial: ed('DFS carrying parent and grandparent', 'def sumEvenGrandparent(self, root):\n    def dfs(node, p, g):\n        if not node: return 0\n        s = node.val if (g and g.val % 2 == 0) else 0\n        return s + dfs(node.left, node, p) + dfs(node.right, node, p)\n    return dfs(root, None, None)', 'O(n)', 'O(h)'),
  gen: function () { var o = [[[6, 7, 8, 2, 7, 1, 3, 9, null, 1, 4, null, null, null, 5]], [[1]], [[2, 3, 4, 5, 6, 7, 8]], [[]]]; for (var k = 0; k < 36; k++) o.push([genTree(randInt(0, 14), 0, 9)]); return o; },
  ref: function (a) { var s = 0; function dfs(n, p, g) { if (!n) return; if (g && g.val % 2 === 0) s += n.val; dfs(n.left, n, p); dfs(n.right, n, p); } dfs(bt(a[0]), null, null); return s; } });

// ---- Binary Tree Tilt (TREE_INT) ----
MORE20.push({ slug: 'binary-tree-tilt', title: 'Binary Tree Tilt', difficulty: 'easy', topics: ['Tree', 'DFS'], type: 'TREE_INT', langsrc: T.TREE_INT('findTilt'),
  desc: '<p>The <em>tilt</em> of a node is the absolute difference between the sum of all values in its left subtree and the sum of all values in its right subtree (an empty subtree sums to 0). Return the sum of every node\u2019s tilt.</p>',
  examples: [{ in: 'root = [1,2,3]', out: '1' }, { in: 'root = [4,2,9,3,5,null,7]', out: '15' }],
  constraints: ['0 &lt;= number of nodes &lt;= 10^4', '-1000 &lt;= Node.val &lt;= 1000'],
  editorial: ed('Post-order: return subtree sum, accumulate tilt', 'def findTilt(self, root):\n    self.total = 0\n    def dfs(node):\n        if not node: return 0\n        l = dfs(node.left); r = dfs(node.right)\n        self.total += abs(l - r)\n        return node.val + l + r\n    dfs(root)\n    return self.total', 'O(n)', 'O(h)'),
  gen: function () { var o = [[[1, 2, 3]], [[4, 2, 9, 3, 5, null, 7]], [[]], [[1]]]; for (var k = 0; k < 36; k++) o.push([genTree(randInt(0, 13), -9, 9)]); return o; },
  ref: function (a) { var total = 0; function dfs(n) { if (!n) return 0; var l = dfs(n.left), r = dfs(n.right); total += Math.abs(l - r); return n.val + l + r; } dfs(bt(a[0])); return total; } });

// ---- Maximum Width of Binary Tree (TREE_INT) ----
MORE20.push({ slug: 'maximum-width-of-binary-tree', title: 'Maximum Width of Binary Tree', difficulty: 'medium', topics: ['Tree', 'BFS'], type: 'TREE_INT', langsrc: T.TREE_INT('widthOfBinaryTree'),
  desc: '<p>Given the <code>root</code> of a binary tree, return the <strong>maximum width</strong>. The width of a level is the number of positions between its leftmost and rightmost non-null nodes (as if the level were a full binary tree), counting the null slots between them.</p>',
  examples: [{ in: 'root = [1,3,2,5,3,null,9]', out: '4' }, { in: 'root = [1,3,2,5,null,null,9,6,null,7]', out: '7' }],
  constraints: ['1 &lt;= number of nodes &lt;= 3000', '-100 &lt;= Node.val &lt;= 100'],
  editorial: ed('BFS assigning heap-style indices; normalize per level', 'def widthOfBinaryTree(self, root):\n    if not root: return 0\n    best = 0; q = [(root, 0)]\n    while q:\n        first = q[0][1]; best = max(best, q[-1][1] - first + 1); nq = []\n        for node, idx in q:\n            p = idx - first\n            if node.left: nq.append((node.left, p*2))\n            if node.right: nq.append((node.right, p*2+1))\n        q = nq\n    return best', 'O(n)', 'O(w)'),
  gen: function () { var o = [[[1, 3, 2, 5, 3, null, 9]], [[1, 3, 2, 5, null, null, 9, 6, null, 7]], [[1]], [[1, 2, 3, 4, 5, 6, 7]]]; for (var k = 0; k < 36; k++) o.push([genTree1(randInt(1, 14), -9, 9)]); return o; },
  ref: function (a) { var root = bt(a[0]); if (!root) return 0; var best = 0, q = [[root, 0]]; while (q.length) { var first = q[0][1]; best = Math.max(best, q[q.length - 1][1] - first + 1); var nq = []; for (var i = 0; i < q.length; i++) { var node = q[i][0], p = q[i][1] - first; if (node.left) nq.push([node.left, p * 2]); if (node.right) nq.push([node.right, p * 2 + 1]); } q = nq; } return best; } });

// ---- House Robber III (TREE_INT) ----
MORE20.push({ slug: 'house-robber-iii', title: 'House Robber III', difficulty: 'medium', topics: ['Tree', 'DFS', 'Dynamic Programming'], type: 'TREE_INT', langsrc: T.TREE_INT('rob'),
  desc: '<p>Houses are arranged as a binary tree. You cannot rob two directly-connected houses (a parent and its child) on the same night. Given the <code>root</code>, return the maximum amount of money you can rob without alerting the police.</p>',
  examples: [{ in: 'root = [3,2,3,null,3,null,1]', out: '7' }, { in: 'root = [3,4,5,1,3,null,1]', out: '9' }],
  constraints: ['1 &lt;= number of nodes &lt;= 10^4', '0 &lt;= Node.val &lt;= 10^4'],
  editorial: ed('Post-order DP returning (rob-this, skip-this)', 'def rob(self, root):\n    def dfs(node):\n        if not node: return (0, 0)\n        l = dfs(node.left); r = dfs(node.right)\n        take = node.val + l[1] + r[1]\n        skip = max(l) + max(r)\n        return (take, skip)\n    return max(dfs(root))', 'O(n)', 'O(h)'),
  gen: function () { var o = [[[3, 2, 3, null, 3, null, 1]], [[3, 4, 5, 1, 3, null, 1]], [[1]], [[0]]]; for (var k = 0; k < 36; k++) o.push([genTree1(randInt(1, 13), 0, 9)]); return o; },
  ref: function (a) { function dfs(n) { if (!n) return [0, 0]; var l = dfs(n.left), r = dfs(n.right); var take = n.val + l[1] + r[1]; var skip = Math.max(l[0], l[1]) + Math.max(r[0], r[1]); return [take, skip]; } var res = dfs(bt(a[0])); return Math.max(res[0], res[1]); } });

// ---- Longest Univalue Path (TREE_INT) ----
MORE20.push({ slug: 'longest-univalue-path', title: 'Longest Univalue Path', difficulty: 'medium', topics: ['Tree', 'DFS'], type: 'TREE_INT', langsrc: T.TREE_INT('longestUnivaluePath'),
  desc: '<p>Given the <code>root</code> of a binary tree, return the length of the longest path where every node on the path has the <strong>same value</strong>. The length is measured in <strong>edges</strong>. The path need not pass through the root.</p>',
  examples: [{ in: 'root = [5,4,5,1,1,null,5]', out: '2' }, { in: 'root = [1,4,5,4,4,null,5]', out: '2' }],
  constraints: ['0 &lt;= number of nodes &lt;= 10^4', '-1000 &lt;= Node.val &lt;= 1000'],
  editorial: ed('DFS returning longest same-value arm; bend at each node', 'def longestUnivaluePath(self, root):\n    self.best = 0\n    def dfs(node):\n        if not node: return 0\n        l = dfs(node.left); r = dfs(node.right)\n        lp = l + 1 if node.left and node.left.val == node.val else 0\n        rp = r + 1 if node.right and node.right.val == node.val else 0\n        self.best = max(self.best, lp + rp)\n        return max(lp, rp)\n    dfs(root)\n    return self.best', 'O(n)', 'O(h)'),
  gen: function () { var o = [[[5, 4, 5, 1, 1, null, 5]], [[1, 4, 5, 4, 4, null, 5]], [[]], [[1]]]; for (var k = 0; k < 36; k++) o.push([genTree(randInt(0, 14), 0, 3)]); return o; },
  ref: function (a) { var best = 0; function dfs(n) { if (!n) return 0; var l = dfs(n.left), r = dfs(n.right); var lp = (n.left && n.left.val === n.val) ? l + 1 : 0; var rp = (n.right && n.right.val === n.val) ? r + 1 : 0; best = Math.max(best, lp + rp); return Math.max(lp, rp); } dfs(bt(a[0])); return best; } });

// ---- Count Nodes Equal to Average of Subtree (TREE_INT) ----
MORE20.push({ slug: 'count-nodes-equal-to-average-of-subtree', title: 'Count Nodes Equal to Average of Subtree', difficulty: 'medium', topics: ['Tree', 'DFS'], type: 'TREE_INT', langsrc: T.TREE_INT('averageOfSubtree'),
  desc: '<p>For each node, consider the subtree rooted at it. Count the nodes whose value equals the <strong>average</strong> (rounded down) of all values in that subtree.</p>',
  examples: [{ in: 'root = [4,8,5,0,1,null,6]', out: '5' }, { in: 'root = [1]', out: '1' }],
  constraints: ['1 &lt;= number of nodes &lt;= 1000', '0 &lt;= Node.val &lt;= 1000'],
  editorial: ed('Post-order returning (sum, count) of each subtree', 'def averageOfSubtree(self, root):\n    self.cnt = 0\n    def dfs(node):\n        if not node: return (0, 0)\n        ls, lc = dfs(node.left); rs, rc = dfs(node.right)\n        s = ls + rs + node.val; c = lc + rc + 1\n        if s // c == node.val: self.cnt += 1\n        return (s, c)\n    dfs(root)\n    return self.cnt', 'O(n)', 'O(h)'),
  gen: function () { var o = [[[4, 8, 5, 0, 1, null, 6]], [[1]], [[5, 5, 5]], [[]]]; for (var k = 0; k < 36; k++) o.push([genTree1(randInt(1, 13), 0, 9)]); return o; },
  ref: function (a) { var cnt = 0; function dfs(n) { if (!n) return [0, 0]; var l = dfs(n.left), r = dfs(n.right); var s = l[0] + r[0] + n.val, c = l[1] + r[1] + 1; if (Math.floor(s / c) === n.val) cnt++; return [s, c]; } dfs(bt(a[0])); return cnt; } });

// ---- Find Bottom Left Tree Value (TREE_INT) ----
MORE20.push({ slug: 'find-bottom-left-tree-value', title: 'Find Bottom Left Tree Value', difficulty: 'medium', topics: ['Tree', 'BFS', 'DFS'], type: 'TREE_INT', langsrc: T.TREE_INT('findBottomLeftValue'),
  desc: '<p>Given the <code>root</code> of a binary tree, return the leftmost value in the <strong>last</strong> (deepest) row of the tree.</p>',
  examples: [{ in: 'root = [2,1,3]', out: '1' }, { in: 'root = [1,2,3,4,null,5,6,null,null,7]', out: '7' }],
  constraints: ['1 &lt;= number of nodes &lt;= 10^4', '-2^31 &lt;= Node.val &lt;= 2^31 - 1'],
  editorial: ed('BFS; record the first node of each level', 'def findBottomLeftValue(self, root):\n    from collections import deque\n    q = deque([root]); res = root.val\n    while q:\n        res = q[0].val\n        for _ in range(len(q)):\n            n = q.popleft()\n            if n.left: q.append(n.left)\n            if n.right: q.append(n.right)\n    return res', 'O(n)', 'O(w)'),
  gen: function () { var o = [[[2, 1, 3]], [[1, 2, 3, 4, null, 5, 6, null, null, 7]], [[1]], [[1, 2, 3, 4, 5, 6]]]; for (var k = 0; k < 36; k++) o.push([genTree1(randInt(1, 14), -9, 9)]); return o; },
  ref: function (a) { var root = bt(a[0]), q = [root], res = root.val; while (q.length) { var nq = []; res = q[0].val; for (var i = 0; i < q.length; i++) { if (q[i].left) nq.push(q[i].left); if (q[i].right) nq.push(q[i].right); } q = nq; } return res; } });

// ---- Pseudo-Palindromic Paths in a Binary Tree (TREE_INT, values 1-9) ----
MORE20.push({ slug: 'pseudo-palindromic-paths-in-a-binary-tree', title: 'Pseudo-Palindromic Paths in a Binary Tree', difficulty: 'medium', topics: ['Tree', 'DFS', 'Bit Manipulation'], type: 'TREE_INT', langsrc: T.TREE_INT('pseudoPalindromicPaths'),
  desc: '<p>Node values are digits <code>1-9</code>. A root-to-leaf path is <em>pseudo-palindromic</em> if at least one permutation of its node values is a palindrome. Return the number of pseudo-palindromic root-to-leaf paths.</p>',
  examples: [{ in: 'root = [2,3,1,3,1,null,1]', out: '2' }, { in: 'root = [2,1,1,1,3,null,null,null,null,null,1]', out: '1' }],
  constraints: ['1 &lt;= number of nodes &lt;= 10^5', '1 &lt;= Node.val &lt;= 9'],
  editorial: ed('DFS with a 9-bit parity mask; palindrome iff at most one odd count', 'def pseudoPalindromicPaths(self, root):\n    self.cnt = 0\n    def dfs(node, mask):\n        if not node: return\n        mask ^= (1 << node.val)\n        if not node.left and not node.right:\n            if mask & (mask - 1) == 0: self.cnt += 1\n            return\n        dfs(node.left, mask); dfs(node.right, mask)\n    dfs(root, 0)\n    return self.cnt', 'O(n)', 'O(h)'),
  gen: function () { var o = [[[2, 3, 1, 3, 1, null, 1]], [[2, 1, 1, 1, 3, null, null, null, null, null, 1]], [[9]], [[1, 1, 1]]]; for (var k = 0; k < 36; k++) o.push([genTree1(randInt(1, 13), 1, 4)]); return o; },
  ref: function (a) { var cnt = 0; function dfs(n, mask) { if (!n) return; mask ^= (1 << n.val); if (!n.left && !n.right) { if ((mask & (mask - 1)) === 0) cnt++; return; } dfs(n.left, mask); dfs(n.right, mask); } var r = bt(a[0]); if (r) dfs(r, 0); return cnt; } });

// ---- Path Sum III (TREE_INT_INT) ----
MORE20.push({ slug: 'path-sum-iii', title: 'Path Sum III', difficulty: 'medium', topics: ['Tree', 'DFS', 'Prefix Sum'], type: 'TREE_INT_INT', langsrc: T.TREE_INT_INT('pathSum'),
  desc: '<p>Given the <code>root</code> of a binary tree and an integer <code>targetSum</code> (passed as <code>k</code>), return the number of downward paths (parent to child, any start and end node) whose node values sum to <code>k</code>.</p>',
  examples: [{ in: 'root = [10,5,-3,3,2,null,11,3,-2,null,1], k = 8', out: '3' }, { in: 'root = [5,4,8,11,null,13,4,7,2,null,null,5,1], k = 22', out: '3' }],
  constraints: ['0 &lt;= number of nodes &lt;= 1000', '-10^9 &lt;= Node.val &lt;= 10^9', '-1000 &lt;= k &lt;= 1000'],
  editorial: ed('Prefix-sum counts along the current root path', 'def pathSum(self, root, k):\n    from collections import defaultdict\n    cnt = defaultdict(int); cnt[0] = 1\n    self.total = 0\n    def dfs(node, cur):\n        if not node: return\n        cur += node.val\n        self.total += cnt[cur - k]\n        cnt[cur] += 1\n        dfs(node.left, cur); dfs(node.right, cur)\n        cnt[cur] -= 1\n    dfs(root, 0)\n    return self.total', 'O(n)', 'O(h)'),
  gen: function () { var o = [[[10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], 8], [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 22], [[], 0], [[1], 1]]; for (var k = 0; k < 36; k++) o.push([genTree(randInt(0, 12), -5, 5), randInt(-4, 8)]); return o; },
  ref: function (a) { var k = a[1], cnt = {}; cnt[0] = 1; var total = 0; function dfs(n, cur) { if (!n) return; cur += n.val; total += (cnt[cur - k] || 0); cnt[cur] = (cnt[cur] || 0) + 1; dfs(n.left, cur); dfs(n.right, cur); cnt[cur]--; } var r = bt(a[0]); if (r) dfs(r, 0); return total; } });

// ---- Univalued Binary Tree (TREE_BOOL) ----
MORE20.push({ slug: 'univalued-binary-tree', title: 'Univalued Binary Tree', difficulty: 'easy', topics: ['Tree', 'DFS', 'BFS'], type: 'TREE_BOOL', langsrc: T.TREE_BOOL('isUnivalTree'),
  desc: '<p>A binary tree is <em>univalued</em> if every node has the same value. Given the <code>root</code>, return <code>true</code> if the tree is univalued, otherwise <code>false</code>.</p>',
  examples: [{ in: 'root = [1,1,1,1,1,null,1]', out: 'true' }, { in: 'root = [2,2,2,5,2]', out: 'false' }],
  constraints: ['1 &lt;= number of nodes &lt;= 100', '0 &lt;= Node.val &lt;= 99'],
  editorial: ed('Compare every node against the root value', 'def isUnivalTree(self, root):\n    def dfs(node):\n        if not node: return True\n        if node.val != root.val: return False\n        return dfs(node.left) and dfs(node.right)\n    return dfs(root)', 'O(n)', 'O(h)'),
  gen: function () { var o = [[[1, 1, 1, 1, 1, null, 1]], [[2, 2, 2, 5, 2]], [[7]], [[3, 3, 3, 3]]]; for (var k = 0; k < 36; k++) o.push([genTree1(randInt(1, 12), 0, 2)]); return o; },
  ref: function (a) { var root = bt(a[0]); if (!root) return true; var ok = true, v = root.val; function dfs(n) { if (!n) return; if (n.val !== v) ok = false; dfs(n.left); dfs(n.right); } dfs(root); return ok; } });

// ---- Even Odd Tree (TREE_BOOL) ----
MORE20.push({ slug: 'even-odd-tree', title: 'Even Odd Tree', difficulty: 'medium', topics: ['Tree', 'BFS'], type: 'TREE_BOOL', langsrc: T.TREE_BOOL('isEvenOddTree'),
  desc: '<p>A binary tree is <em>even-odd</em> if: on even-indexed levels (root is level 0) every node has an <strong>odd</strong> value and values are in <strong>strictly increasing</strong> order left to right; on odd-indexed levels every node has an <strong>even</strong> value and values are in <strong>strictly decreasing</strong> order. Return whether the tree is even-odd.</p>',
  examples: [{ in: 'root = [1,10,4,3,null,7,9,12,8,6,null,null,2]', out: 'true' }, { in: 'root = [5,4,2,3,3,7]', out: 'false' }],
  constraints: ['1 &lt;= number of nodes &lt;= 10^5', '1 &lt;= Node.val &lt;= 10^6'],
  editorial: ed('BFS per level checking parity and monotonicity', 'def isEvenOddTree(self, root):\n    from collections import deque\n    q = deque([root]); level = 0\n    while q:\n        prev = None\n        for _ in range(len(q)):\n            n = q.popleft(); v = n.val\n            if level % 2 == 0:\n                if v % 2 == 0 or (prev is not None and v <= prev): return False\n            else:\n                if v % 2 == 1 or (prev is not None and v >= prev): return False\n            prev = v\n            if n.left: q.append(n.left)\n            if n.right: q.append(n.right)\n        level += 1\n    return True', 'O(n)', 'O(w)'),
  gen: function () { var o = [[[1, 10, 4, 3, null, 7, 9, 12, 8, 6, null, null, 2]], [[5, 4, 2, 3, 3, 7]], [[1]], [[1, 2]]]; for (var k = 0; k < 36; k++) o.push([genTree1(randInt(1, 13), 1, 9)]); return o; },
  ref: function (a) { var root = bt(a[0]); if (!root) return true; var q = [root], level = 0; while (q.length) { var nq = [], prev = null; for (var i = 0; i < q.length; i++) { var v = q[i].val; if (level % 2 === 0) { if (v % 2 === 0 || (prev !== null && v <= prev)) return false; } else { if (v % 2 === 1 || (prev !== null && v >= prev)) return false; } prev = v; if (q[i].left) nq.push(q[i].left); if (q[i].right) nq.push(q[i].right); } q = nq; level++; } return true; } });

// ---- Find Largest Value in Each Tree Row (TREE_ARR) ----
MORE20.push({ slug: 'find-largest-value-in-each-tree-row', title: 'Find Largest Value in Each Tree Row', difficulty: 'medium', topics: ['Tree', 'BFS'], type: 'TREE_ARR', langsrc: T.TREE_ARR('largestValues'),
  desc: '<p>Given the <code>root</code> of a binary tree, return an array containing the <strong>largest</strong> value in each row (level), ordered from the top row to the bottom row.</p>',
  examples: [{ in: 'root = [1,3,2,5,3,null,9]', out: '[1,3,9]' }, { in: 'root = [1,2,3]', out: '[1,3]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 10^4', '-2^31 &lt;= Node.val &lt;= 2^31 - 1'],
  editorial: ed('BFS; take the max of each level', 'def largestValues(self, root):\n    if not root: return []\n    from collections import deque\n    q = deque([root]); res = []\n    while q:\n        mx = float("-inf")\n        for _ in range(len(q)):\n            n = q.popleft(); mx = max(mx, n.val)\n            if n.left: q.append(n.left)\n            if n.right: q.append(n.right)\n        res.append(mx)\n    return res', 'O(n)', 'O(w)'),
  gen: function () { var o = [[[1, 3, 2, 5, 3, null, 9]], [[1, 2, 3]], [[]], [[1]]]; for (var k = 0; k < 36; k++) o.push([genTree(randInt(0, 13), -9, 9)]); return o; },
  ref: function (a) { var root = bt(a[0]); if (!root) return []; var res = [], q = [root]; while (q.length) { var nq = [], mx = -Infinity; for (var i = 0; i < q.length; i++) { mx = Math.max(mx, q[i].val); if (q[i].left) nq.push(q[i].left); if (q[i].right) nq.push(q[i].right); } res.push(mx); q = nq; } return res; } });

// ---- Minimum Absolute Difference in BST (TREE_INT) ----
MORE20.push({ slug: 'minimum-absolute-difference-in-bst', title: 'Minimum Absolute Difference in BST', difficulty: 'easy', topics: ['Tree', 'DFS', 'BST'], type: 'TREE_INT', langsrc: T.TREE_INT('getMinimumDifference'),
  desc: '<p>Given the <code>root</code> of a Binary Search Tree, return the minimum absolute difference between the values of any two <strong>different</strong> nodes.</p>',
  examples: [{ in: 'root = [4,2,6,1,3]', out: '1' }, { in: 'root = [1,0,48,null,null,12,49]', out: '1' }],
  constraints: ['2 &lt;= number of nodes &lt;= 10^4', '0 &lt;= Node.val &lt;= 10^5', 'The tree is a valid BST.'],
  editorial: ed('Inorder traversal of a BST is sorted; scan adjacent differences', 'def getMinimumDifference(self, root):\n    self.prev = None; self.best = float("inf")\n    def inorder(node):\n        if not node: return\n        inorder(node.left)\n        if self.prev is not None:\n            self.best = min(self.best, node.val - self.prev)\n        self.prev = node.val\n        inorder(node.right)\n    inorder(root)\n    return self.best', 'O(n)', 'O(h)'),
  gen: function () { var o = [[[4, 2, 6, 1, 3]], [[1, 0, 48, null, null, 12, 49]], [[2, 1]], [[5, 3, 8, 1, 4, 7, 9]]]; for (var k = 0; k < 36; k++) o.push([genBST(randInt(2, 12), 0, 40)]); return o; },
  ref: function (a) { var vals = []; function dfs(n) { if (!n) return; dfs(n.left); vals.push(n.val); dfs(n.right); } dfs(bt(a[0])); var best = Infinity; for (var i = 1; i < vals.length; i++) best = Math.min(best, vals[i] - vals[i - 1]); return best; } });

module.exports = { MORE20 };
