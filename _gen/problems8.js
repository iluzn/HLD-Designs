// Batch D: more binary tree / BST problems.
const { T, randInt } = require('./gen.js');

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
function bt(arr) { if (!arr.length || arr[0] === null) return null; var root = { val: arr[0], left: null, right: null }; var q = [root], i = 1; while (q.length && i < arr.length) { var n = q.shift(); if (i < arr.length && arr[i] !== null) { n.left = { val: arr[i], left: null, right: null }; q.push(n.left); } i++; if (i < arr.length && arr[i] !== null) { n.right = { val: arr[i], left: null, right: null }; q.push(n.right); } i++; } return root; }
function stArr(root) { if (!root) return []; var out = [], q = [root]; while (q.length) { var n = q.shift(); if (n === null) { out.push(null); continue; } out.push(n.val); q.push(n.left); q.push(n.right); } while (out.length && out[out.length - 1] === null) out.pop(); return out; }
function nn(arr) { return arr.map(function (x) { return x === null ? 'null' : x; }); }
function genTree(maxNodes, lo, hi) { var count = randInt(0, maxNodes); if (count === 0) return []; var root = { v: randInt(lo, hi), l: null, r: null }, q = [root], n = 1; while (q.length && n < count) { var node = q.shift(); if (n < count && Math.random() < 0.85) { node.l = { v: randInt(lo, hi), l: null, r: null }; q.push(node.l); n++; } if (n < count && Math.random() < 0.85) { node.r = { v: randInt(lo, hi), l: null, r: null }; q.push(node.r); n++; } } var out = [], qq = [root]; while (qq.length) { var nd = qq.shift(); if (nd === null) { out.push(null); continue; } out.push(nd.v); qq.push(nd.l); qq.push(nd.r); } while (out.length && out[out.length - 1] === null) out.pop(); return out; }
function genBST(n) { if (n === 0) return []; var used = {}, vals = []; while (vals.length < n) { var v = randInt(-25, 25); if (!used[v]) { used[v] = 1; vals.push(v); } } shuffle(vals); var root = null; function ins(node, v) { if (!node) return { val: v, left: null, right: null }; if (v < node.val) node.left = ins(node.left, v); else node.right = ins(node.right, v); return node; } vals.forEach(function (v) { root = ins(root, v); }); return stArr(root); }
function present(arr) { return arr.filter(function (x) { return x !== null; }); }
function genTreeNE(maxNodes, lo, hi) { var g = genTree(maxNodes, lo, hi); return g.length ? g : [randInt(lo, hi)]; }

const MORE8 = [];

// ---- Invert Binary Tree (TREE_TREE_OUT) ----
MORE8.push({ slug: 'invert-binary-tree', title: 'Invert Binary Tree', difficulty: 'easy', topics: ['Tree', 'DFS', 'BFS'], type: 'TREE_TREE_OUT', langsrc: T.TREE_TREE_OUT('invertTree'),
  desc: '<p>Given the <code>root</code> of a binary tree, invert it (swap every left and right child) and return the root. Output is the inverted tree in level order.</p>',
  examples: [{ in: 'root = [4,2,7,1,3,6,9]', out: '[4,7,2,9,6,3,1]' }, { in: 'root = []', out: '[]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 100', '-100 &lt;= Node.val &lt;= 100'],
  editorial: ED({ intuition: 'Inverting a tree just means swapping the two children at every node. Do it recursively (or with a queue) and the whole tree mirrors.', approach: ['If the node is null, return null.', 'Swap its left and right child.', 'Recurse into both children.'], code: 'def invertTree(self, root):\n    if not root:\n        return None\n    root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)\n    return root', time: 'O(n)', timeWhy: 'each node is visited once.', space: 'O(h)', spaceWhy: 'recursion stack up to the tree height.' }),
  gen: function () { var o = [[[4, 2, 7, 1, 3, 6, 9]], [[]], [[1]], [[1, 2]]]; for (var k = 0; k < 40; k++) o.push([genTree(randInt(0, 12), -9, 9)]); return o; },
  ref: function (a) { var r = bt(a[0]); (function inv(n) { if (!n) return; var t = n.left; n.left = n.right; n.right = t; inv(n.left); inv(n.right); })(r); return nn(stArr(r)); } });

// ---- Same Tree (TREE_TREE_BOOL) ----
MORE8.push({ slug: 'same-tree', title: 'Same Tree', difficulty: 'easy', topics: ['Tree', 'DFS', 'BFS'], type: 'TREE_TREE_BOOL', langsrc: T.TREE_TREE_BOOL('isSameTree'),
  desc: '<p>Given the roots of two binary trees <code>p</code> and <code>q</code>, return <code>true</code> if they are structurally identical and the nodes have the same values.</p>',
  examples: [{ in: 'p = [1,2,3], q = [1,2,3]', out: 'true' }, { in: 'p = [1,2], q = [1,null,2]', out: 'false' }],
  constraints: ['0 &lt;= number of nodes &lt;= 100', '-10^4 &lt;= Node.val &lt;= 10^4'],
  editorial: ED({ intuition: 'Two trees are the same when their roots match AND their left subtrees match AND their right subtrees match — a clean recursive definition.', approach: ['If both nodes are null, they match.', 'If exactly one is null, or values differ, they do not match.', 'Otherwise recurse on both pairs of children.'], code: 'def isSameTree(self, p, q):\n    if not p and not q:\n        return True\n    if not p or not q or p.val != q.val:\n        return False\n    return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)', time: 'O(n)', timeWhy: 'each pair of nodes is compared once.', space: 'O(h)', spaceWhy: 'recursion stack.' }),
  gen: function () { var o = [[[1, 2, 3], [1, 2, 3]], [[1, 2], [1, null, 2]], [[], []], [[1], [2]]]; for (var k = 0; k < 40; k++) { var t = genTree(randInt(0, 10), -5, 5); if (Math.random() < 0.5) o.push([t, t.slice()]); else o.push([t, genTree(randInt(0, 10), -5, 5)]); } return o; },
  ref: function (a) { function same(x, y) { if (!x && !y) return true; if (!x || !y || x.val !== y.val) return false; return same(x.left, y.left) && same(x.right, y.right); } return same(bt(a[0]), bt(a[1])); } });

// ---- Subtree of Another Tree (TREE_TREE_BOOL) ----
MORE8.push({ slug: 'subtree-of-another-tree', title: 'Subtree of Another Tree', difficulty: 'easy', topics: ['Tree', 'DFS', 'String Matching'], type: 'TREE_TREE_BOOL', langsrc: T.TREE_TREE_BOOL('isSubtree'),
  desc: '<p>Given the roots of two binary trees <code>root</code> and <code>subRoot</code>, return <code>true</code> if <code>subRoot</code> appears as a subtree of <code>root</code> (a node of root plus all its descendants matches subRoot exactly).</p>',
  examples: [{ in: 'root = [3,4,5,1,2], subRoot = [4,1,2]', out: 'true' }, { in: 'root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]', out: 'false' }],
  constraints: ['1 &lt;= root nodes &lt;= 2000', '1 &lt;= subRoot nodes &lt;= 1000', '-10^4 &lt;= Node.val &lt;= 10^4'],
  editorial: ED({ intuition: 'At every node of the big tree, ask "is the subtree rooted here identical to subRoot?" That inner check is just the Same Tree comparison.', approach: ['Write a <code>sameTree(a, b)</code> helper.', 'Traverse root; at each node test <code>sameTree(node, subRoot)</code>.', 'Return true if any node matches.'], code: 'def isSubtree(self, root, subRoot):\n    def same(a, b):\n        if not a and not b: return True\n        if not a or not b or a.val != b.val: return False\n        return same(a.left, b.left) and same(a.right, b.right)\n    if not subRoot: return True\n    if not root: return False\n    if same(root, subRoot): return True\n    return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)', time: 'O(m*n)', timeWhy: 'each of m nodes may trigger an O(n) comparison.', space: 'O(h)', spaceWhy: 'recursion stack.', pitfalls: ['An empty subRoot is a subtree of anything; handle it before dereferencing.'] }),
  gen: function () {
    var o = [[[3, 4, 5, 1, 2], [4, 1, 2]], [[3, 4, 5, 1, 2, null, null, null, null, 0], [4, 1, 2]], [[1], [1]]];
    for (var k = 0; k < 40; k++) {
      var t = genTree(randInt(1, 10), 0, 5);
      if (Math.random() < 0.5) {
        // pick a random node's subtree
        var r = bt(t), nodes = []; (function coll(n) { if (!n) return; nodes.push(n); coll(n.left); coll(n.right); })(r);
        var pick = nodes[randInt(0, nodes.length - 1)];
        o.push([t, stArr(pick)]);
      } else o.push([t, genTree(randInt(1, 5), 0, 5)]);
    }
    return o;
  },
  ref: function (a) { function same(x, y) { if (!x && !y) return true; if (!x || !y || x.val !== y.val) return false; return same(x.left, y.left) && same(x.right, y.right); } var root = bt(a[0]), sub = bt(a[1]); function go(n) { if (!n) return false; if (same(n, sub)) return true; return go(n.left) || go(n.right); } if (!sub) return true; return go(root); } });

// ---- Binary Tree Level Order Traversal (TREE_LEVELS) ----
MORE8.push({ slug: 'binary-tree-level-order-traversal', title: 'Binary Tree Level Order Traversal', difficulty: 'medium', topics: ['Tree', 'BFS'], type: 'TREE_LEVELS', langsrc: T.TREE_LEVELS('levelOrder'),
  desc: '<p>Given the <code>root</code> of a binary tree, return its level-order traversal — a list of levels, each a list of node values from left to right. On this judge levels are shown separated by <code>|</code>.</p>',
  examples: [{ in: 'root = [3,9,20,null,null,15,7]', out: '[[3],[9,20],[15,7]]' }, { in: 'root = []', out: '[]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 2000', '-1000 &lt;= Node.val &lt;= 1000'],
  editorial: ED({ intuition: 'A breadth-first traversal naturally visits the tree level by level. Process the queue one full level at a time by capturing its size before the inner loop.', approach: ['Push the root; if null, return empty.', 'While the queue is non-empty, record its current size — that is one level.', 'Pop exactly that many nodes into the current level list, enqueueing their children.'], code: 'from collections import deque\n\ndef levelOrder(self, root):\n    if not root: return []\n    res, q = [], deque([root])\n    while q:\n        level = []\n        for _ in range(len(q)):\n            node = q.popleft()\n            level.append(node.val)\n            if node.left: q.append(node.left)\n            if node.right: q.append(node.right)\n        res.append(level)\n    return res', time: 'O(n)', timeWhy: 'each node is enqueued and dequeued once.', space: 'O(n)', spaceWhy: 'the queue can hold a full level.', pitfalls: ['Snapshot the queue length before the inner loop, since you keep adding children to the same queue.'] }),
  gen: function () { var o = [[[3, 9, 20, null, null, 15, 7]], [[]], [[1]], [[1, 2, 3, 4, 5]]]; for (var k = 0; k < 40; k++) o.push([genTree(randInt(0, 12), -9, 9)]); return o; },
  ref: function (a) { var r = bt(a[0]); if (!r) return ''; var res = [], q = [r]; while (q.length) { var level = [], nq = []; for (var i = 0; i < q.length; i++) { var n = q[i]; level.push(n.val); if (n.left) nq.push(n.left); if (n.right) nq.push(n.right); } res.push(level.join(' ')); q = nq; } return res.join('|'); } });

// ---- Binary Tree Right Side View (TREE_ARR) ----
MORE8.push({ slug: 'binary-tree-right-side-view', title: 'Binary Tree Right Side View', difficulty: 'medium', topics: ['Tree', 'BFS', 'DFS'], type: 'TREE_ARR', langsrc: T.TREE_ARR('rightSideView'),
  desc: '<p>Given the <code>root</code> of a binary tree, imagine standing on the right side. Return the values of the nodes you can see, ordered top to bottom.</p>',
  examples: [{ in: 'root = [1,2,3,null,5,null,4]', out: '[1,3,4]' }, { in: 'root = [1,null,3]', out: '[1,3]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 100', '-100 &lt;= Node.val &lt;= 100'],
  editorial: ED({ intuition: 'From the right you only see the last node of each level. So a level-order BFS, keeping the rightmost node of each level, is exactly the right-side view.', approach: ['BFS level by level.', 'For each level, the last node dequeued is the visible one — record it.', 'Collect these across all levels.'], code: 'from collections import deque\n\ndef rightSideView(self, root):\n    if not root: return []\n    res, q = [], deque([root])\n    while q:\n        n = len(q)\n        for i in range(n):\n            node = q.popleft()\n            if i == n - 1: res.append(node.val)\n            if node.left: q.append(node.left)\n            if node.right: q.append(node.right)\n    return res', time: 'O(n)', timeWhy: 'each node visited once.', space: 'O(n)', spaceWhy: 'the BFS queue.' }),
  gen: function () { var o = [[[1, 2, 3, null, 5, null, 4]], [[1, null, 3]], [[]], [[1, 2, 3, 4]]]; for (var k = 0; k < 40; k++) o.push([genTree(randInt(0, 12), -9, 9)]); return o; },
  ref: function (a) { var r = bt(a[0]); if (!r) return []; var res = [], q = [r]; while (q.length) { var nq = []; for (var i = 0; i < q.length; i++) { var n = q[i]; if (i === q.length - 1) res.push(n.val); if (n.left) nq.push(n.left); if (n.right) nq.push(n.right); } q = nq; } return res; } });

// ---- Count Good Nodes in Binary Tree (TREE_INT) ----
MORE8.push({ slug: 'count-good-nodes-in-binary-tree', title: 'Count Good Nodes in Binary Tree', difficulty: 'medium', topics: ['Tree', 'DFS', 'BFS'], type: 'TREE_INT', langsrc: T.TREE_INT('goodNodes'),
  desc: '<p>A node is <em>good</em> if no node on the path from the root to it has a greater value. Given the <code>root</code>, return the number of good nodes.</p>',
  examples: [{ in: 'root = [3,1,4,3,null,1,5]', out: '4' }, { in: 'root = [3,3,null,4,2]', out: '3' }],
  constraints: ['1 &lt;= number of nodes &lt;= 10^5', '-10^4 &lt;= Node.val &lt;= 10^4'],
  editorial: ED({ intuition: 'A node is good exactly when it is at least as large as the biggest value seen on the way down. Carry that running maximum as you descend.', approach: ['DFS from the root carrying <code>maxSoFar</code>, starting at the root value (or -inf).', 'At each node, if <code>node.val &gt;= maxSoFar</code> it is good; update the max.', 'Sum the good count over both subtrees.'], code: 'def goodNodes(self, root):\n    def dfs(node, mx):\n        if not node: return 0\n        good = 1 if node.val >= mx else 0\n        mx = max(mx, node.val)\n        return good + dfs(node.left, mx) + dfs(node.right, mx)\n    return dfs(root, root.val)', time: 'O(n)', timeWhy: 'each node visited once.', space: 'O(h)', spaceWhy: 'recursion stack.' }),
  gen: function () { var o = [[[3, 1, 4, 3, null, 1, 5]], [[3, 3, null, 4, 2]], [[1]]]; for (var k = 0; k < 40; k++) o.push([genTreeNE(randInt(1, 12), -9, 9)]); return o; },
  ref: function (a) { var r = bt(a[0]); function dfs(n, mx) { if (!n) return 0; var good = n.val >= mx ? 1 : 0; var nm = Math.max(mx, n.val); return good + dfs(n.left, nm) + dfs(n.right, nm); } return r ? dfs(r, r.val) : 0; } });

// ---- Validate Binary Search Tree (TREE_BOOL) ----
MORE8.push({ slug: 'validate-binary-search-tree', title: 'Validate Binary Search Tree', difficulty: 'medium', topics: ['Tree', 'DFS', 'BST'], type: 'TREE_BOOL', langsrc: T.TREE_BOOL('isValidBST'),
  desc: '<p>Given the <code>root</code> of a binary tree, return <code>true</code> if it is a valid binary search tree: every node in the left subtree is strictly less, every node in the right subtree is strictly greater, and both subtrees are themselves valid BSTs.</p>',
  examples: [{ in: 'root = [2,1,3]', out: 'true' }, { in: 'root = [5,1,4,null,null,3,6]', out: 'false' }],
  constraints: ['1 &lt;= number of nodes &lt;= 10^4', '-2^31 &lt;= Node.val &lt;= 2^31 - 1'],
  editorial: ED({ intuition: 'A node being larger than its left child is not enough — it must be larger than everything in the left subtree. Track an allowed (low, high) open interval that tightens as you descend.', approach: ['Recurse with bounds (low, high), initially (-inf, +inf).', 'Each node must satisfy <code>low &lt; node.val &lt; high</code>.', 'Recurse left with high = node.val and right with low = node.val.'], code: 'def isValidBST(self, root):\n    def valid(node, low, high):\n        if not node: return True\n        if not (low < node.val < high): return False\n        return valid(node.left, low, node.val) and valid(node.right, node.val, high)\n    return valid(root, float("-inf"), float("inf"))', time: 'O(n)', timeWhy: 'each node checked once.', space: 'O(h)', spaceWhy: 'recursion stack.', pitfalls: ['Comparing only against the immediate parent misses violations deeper in a subtree — pass down the full interval.'] }),
  gen: function () { var o = [[[2, 1, 3]], [[5, 1, 4, null, null, 3, 6]], [[1]]]; for (var k = 0; k < 22; k++) o.push([genBST(randInt(1, 10))]); for (var m = 0; m < 18; m++) o.push([genTree(randInt(1, 10), -9, 9)]); return o; },
  ref: function (a) { var r = bt(a[0]); function valid(n, lo, hi) { if (!n) return true; if (!(lo < n.val && n.val < hi)) return false; return valid(n.left, lo, n.val) && valid(n.right, n.val, hi); } return valid(r, -Infinity, Infinity); } });

// ---- Kth Smallest Element in a BST (TREE_INT_INT) ----
MORE8.push({ slug: 'kth-smallest-element-in-a-bst', title: 'Kth Smallest Element in a BST', difficulty: 'medium', topics: ['Tree', 'DFS', 'BST'], type: 'TREE_INT_INT', langsrc: T.TREE_INT_INT('kthSmallest'),
  desc: '<p>Given the <code>root</code> of a binary search tree and an integer <code>k</code>, return the <code>k</code>-th smallest value (1-indexed).</p>',
  examples: [{ in: 'root = [3,1,4,null,2], k = 1', out: '1' }, { in: 'root = [5,3,6,2,4,null,null,1], k = 3', out: '3' }],
  constraints: ['1 &lt;= k &lt;= number of nodes &lt;= 10^4', '0 &lt;= Node.val &lt;= 10^4'],
  editorial: ED({ intuition: 'An in-order traversal of a BST yields values in sorted order. So the k-th value produced by an in-order walk is the answer — you can even stop early once you have counted k.', approach: ['Do an in-order traversal (left, node, right).', 'Count nodes as you visit them.', 'When the count reaches k, that node\u2019s value is the answer.'], code: 'def kthSmallest(self, root, k):\n    stack = []\n    node = root\n    while stack or node:\n        while node:\n            stack.append(node)\n            node = node.left\n        node = stack.pop()\n        k -= 1\n        if k == 0:\n            return node.val\n        node = node.right', time: 'O(h + k)', timeWhy: 'descend to the smallest, then pop k nodes.', space: 'O(h)', spaceWhy: 'the explicit stack.' }),
  gen: function () { var o = [[[3, 1, 4, null, 2], 1], [[5, 3, 6, 2, 4, null, null, 1], 3]]; for (var t = 0; t < 40; t++) { var n = randInt(1, 12), arr = genBST(n); var cnt = present(arr).length; o.push([arr, randInt(1, cnt)]); } return o; },
  ref: function (a) { var r = bt(a[0]), k = a[1], res = []; (function ino(n) { if (!n) return; ino(n.left); res.push(n.val); ino(n.right); })(r); return res[k - 1]; } });

// ---- Lowest Common Ancestor of a BST (TREE_INT_INT_INT) ----
MORE8.push({ slug: 'lowest-common-ancestor-of-a-binary-search-tree', title: 'Lowest Common Ancestor of a Binary Search Tree', difficulty: 'medium', topics: ['Tree', 'DFS', 'BST'], type: 'TREE_INT_INT_INT', langsrc: T.TREE_INT_INT_INT('lowestCommonAncestor'),
  desc: '<p>Given a binary search tree and two node values <code>p</code> and <code>q</code> present in it, return the value of their lowest common ancestor — the deepest node that has both as descendants (a node can be a descendant of itself).</p>',
  examples: [{ in: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', out: '6' }, { in: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', out: '2' }],
  constraints: ['2 &lt;= number of nodes &lt;= 10^5', 'All node values are unique.', 'p and q exist in the BST.'],
  editorial: ED({ intuition: 'The BST ordering tells you which way to go. If both p and q are smaller than the current node, the LCA is in the left subtree; if both larger, in the right. The first node that splits them (or equals one) is the LCA.', approach: ['Start at the root.', 'If both p and q are less than node.val, go left; if both greater, go right.', 'Otherwise the node is the split point — return it.'], code: 'def lowestCommonAncestor(self, root, p, q):\n    node = root\n    while node:\n        if p < node.val and q < node.val:\n            node = node.left\n        elif p > node.val and q > node.val:\n            node = node.right\n        else:\n            return node.val', time: 'O(h)', timeWhy: 'you descend a single path.', space: 'O(1)', spaceWhy: 'iterative, constant extra space.' }),
  gen: function () { var o = [[[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 8], [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 4]]; for (var t = 0; t < 40; t++) { var arr = genBST(randInt(2, 12)); var vals = present(arr); var i = randInt(0, vals.length - 1), j; do { j = randInt(0, vals.length - 1); } while (j === i); o.push([arr, vals[i], vals[j]]); } return o; },
  ref: function (a) { var r = bt(a[0]), p = a[1], q = a[2], node = r; while (node) { if (p < node.val && q < node.val) node = node.left; else if (p > node.val && q > node.val) node = node.right; else return node.val; } return r.val; } });

// ---- Binary Tree Maximum Path Sum (TREE_INT) ----
MORE8.push({ slug: 'binary-tree-maximum-path-sum', title: 'Binary Tree Maximum Path Sum', difficulty: 'hard', topics: ['Tree', 'DFS', 'Dynamic Programming'], type: 'TREE_INT', langsrc: T.TREE_INT('maxPathSum'),
  desc: '<p>A path is any sequence of nodes connected by parent-child edges; it need not pass through the root. The path sum is the sum of the node values. Given the <code>root</code>, return the maximum path sum of any non-empty path.</p>',
  examples: [{ in: 'root = [1,2,3]', out: '6' }, { in: 'root = [-10,9,20,null,null,15,7]', out: '42' }],
  constraints: ['1 &lt;= number of nodes &lt;= 3*10^4', '-1000 &lt;= Node.val &lt;= 1000'],
  editorial: ED({ intuition: 'At each node the best path that <em>bends</em> here is <code>node.val + max(leftGain, 0) + max(rightGain, 0)</code>. But what you can hand to a parent is only a straight downward branch, so you return <code>node.val + max(leftGain, rightGain, 0)</code>.', approach: ['DFS returning the best downward gain from each node (clamped at 0 so negative branches are dropped).', 'At each node update a global best with the bent path through it.', 'Return the straight branch gain to the parent.'], code: 'def maxPathSum(self, root):\n    best = float("-inf")\n    def gain(node):\n        nonlocal best\n        if not node: return 0\n        l = max(gain(node.left), 0)\n        r = max(gain(node.right), 0)\n        best = max(best, node.val + l + r)\n        return node.val + max(l, r)\n    gain(root)\n    return best', time: 'O(n)', timeWhy: 'one post-order pass.', space: 'O(h)', spaceWhy: 'recursion stack.', pitfalls: ['Clamp negative child gains to 0, but still allow an all-negative tree to answer with its largest single node.'] }),
  gen: function () { var o = [[[1, 2, 3]], [[-10, 9, 20, null, null, 15, 7]], [[-3]], [[2, -1]]]; for (var k = 0; k < 40; k++) o.push([genTreeNE(randInt(1, 12), -9, 9)]); return o; },
  ref: function (a) { var r = bt(a[0]), best = -Infinity; (function gain(n) { if (!n) return 0; var l = Math.max(gain(n.left), 0), rr = Math.max(gain(n.right), 0); best = Math.max(best, n.val + l + rr); return n.val + Math.max(l, rr); })(r); return best; } });

module.exports = { MORE8 };
