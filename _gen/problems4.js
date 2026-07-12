const { T, randInt, ln } = require('./gen.js');

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
// random valid level-order array
function genTree(maxNodes) {
  var count = randInt(0, maxNodes);
  if (count === 0) return [];
  var root = { v: randInt(-9, 9), l: null, r: null }, q = [root], n = 1;
  while (q.length && n < count) {
    var node = q.shift();
    if (n < count && Math.random() < 0.85) { node.l = { v: randInt(-9, 9), l: null, r: null }; q.push(node.l); n++; }
    if (n < count && Math.random() < 0.85) { node.r = { v: randInt(-9, 9), l: null, r: null }; q.push(node.r); n++; }
  }
  var out = [], qq = [root];
  while (qq.length) { var node = qq.shift(); if (node === null) { out.push(null); continue; } out.push(node.v); qq.push(node.l); qq.push(node.r); }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}

const MORE4 = [];

MORE4.push({ slug: 'maximum-depth-of-binary-tree', title: 'Maximum Depth of Binary Tree', difficulty: 'easy', topics: ['Tree', 'DFS', 'BFS'], type: 'TREE_INT', langsrc: T.TREE_INT('maxDepth'),
  desc: '<p>Given the <code>root</code> of a binary tree, return its maximum depth — the number of nodes along the longest path from the root down to the farthest leaf. Trees are given in level order with <code>null</code> for missing children.</p>',
  examples: [{ in: 'root = [3,9,20,null,null,15,7]', out: '3' }, { in: 'root = [1,null,2]', out: '2' }],
  constraints: ['0 &lt;= number of nodes &lt;= 10^4', '-100 &lt;= Node.val &lt;= 100'],
  editorial: ED({ intuition: 'The depth of a tree is 1 (for the root) plus the depth of its deeper subtree. That recursive definition is the whole solution.', approach: ['If the node is null, its depth is 0.', 'Otherwise return <code>1 + max(depth(left), depth(right))</code>.'], code: 'def maxDepth(self, root):\n    if not root:\n        return 0\n    return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))', time: 'O(n)', timeWhy: 'every node is visited once.', space: 'O(h)', spaceWhy: 'recursion stack up to the tree height h (O(n) worst case for a skewed tree).' }),
  gen: function () { var o = [[[3, 9, 20, null, null, 15, 7]], [[1, null, 2]], [[]], [[0]]]; for (var k = 0; k < 40; k++) o.push([genTree(randInt(0, 12))]); return o; },
  ref: function (a) { function d(n) { return n ? 1 + Math.max(d(n.left), d(n.right)) : 0; } return d(bt(a[0])); } });

MORE4.push({ slug: 'minimum-depth-of-binary-tree', title: 'Minimum Depth of Binary Tree', difficulty: 'easy', topics: ['Tree', 'DFS', 'BFS'], type: 'TREE_INT', langsrc: T.TREE_INT('minDepth'),
  desc: '<p>Given the <code>root</code> of a binary tree, return its minimum depth — the number of nodes along the shortest path from the root to the nearest <strong>leaf</strong> (a node with no children).</p>',
  examples: [{ in: 'root = [3,9,20,null,null,15,7]', out: '2' }, { in: 'root = [2,null,3,null,4,null,5,null,6]', out: '5' }],
  constraints: ['0 &lt;= number of nodes &lt;= 10^5', '-1000 &lt;= Node.val &lt;= 1000'],
  editorial: ED({ intuition: 'Careful: the minimum depth must end at a leaf. A node with only one child cannot count the missing side as depth 0 — it must descend into the child that exists.', approach: ['Null node \u2192 depth 0.', 'Leaf (no children) \u2192 depth 1.', 'One child only \u2192 <code>1 + depth(that child)</code>.', 'Two children \u2192 <code>1 + min(left, right)</code>.'], code: 'def minDepth(self, root):\n    if not root:\n        return 0\n    if not root.left:\n        return 1 + self.minDepth(root.right)\n    if not root.right:\n        return 1 + self.minDepth(root.left)\n    return 1 + min(self.minDepth(root.left), self.minDepth(root.right))', time: 'O(n)', timeWhy: 'each node visited once.', space: 'O(h)', spaceWhy: 'recursion stack up to height h.', pitfalls: ['Using plain <code>1 + min(left, right)</code> is wrong for a node with a single child — it would return 1 for a non-leaf.'] }),
  gen: function () { var o = [[[3, 9, 20, null, null, 15, 7]], [[2, null, 3, null, 4, null, 5, null, 6]], [[]], [[1, 2]]]; for (var k = 0; k < 40; k++) o.push([genTree(randInt(0, 12))]); return o; },
  ref: function (a) { function d(n) { if (!n) return 0; if (!n.left) return 1 + d(n.right); if (!n.right) return 1 + d(n.left); return 1 + Math.min(d(n.left), d(n.right)); } return d(bt(a[0])); } });

MORE4.push({ slug: 'balanced-binary-tree', title: 'Balanced Binary Tree', difficulty: 'easy', topics: ['Tree', 'DFS'], type: 'TREE_BOOL', langsrc: T.TREE_BOOL('isBalanced'),
  desc: '<p>Given a binary tree, determine if it is height-balanced — for every node, the heights of its two subtrees differ by at most 1.</p>',
  examples: [{ in: 'root = [3,9,20,null,null,15,7]', out: 'true' }, { in: 'root = [1,2,2,3,3,null,null,4,4]', out: 'false' }],
  constraints: ['0 &lt;= number of nodes &lt;= 5000', '-10^4 &lt;= Node.val &lt;= 10^4'],
  editorial: ED({ intuition: 'A naive check recomputes height at every node (O(n\u00b2)). Instead, compute height bottom-up and return a sentinel (-1) the moment any subtree is unbalanced, so the whole tree short-circuits.', approach: ['Write a helper returning the height of a subtree, or -1 if it (or anything below) is unbalanced.', 'For a node, get left and right heights; if either is -1, or they differ by more than 1, return -1.', 'Otherwise return <code>1 + max(left, right)</code>. The tree is balanced iff the root helper is not -1.'], code: 'def isBalanced(self, root):\n    def h(node):\n        if not node:\n            return 0\n        l = h(node.left)\n        r = h(node.right)\n        if l == -1 or r == -1 or abs(l - r) > 1:\n            return -1\n        return 1 + max(l, r)\n    return h(root) != -1', time: 'O(n)', timeWhy: 'a single bottom-up pass; heights are computed once.', space: 'O(h)', spaceWhy: 'recursion stack.', pitfalls: ['The naive top-down version recomputes heights and is O(n\u00b2) — use the -1 sentinel to stay O(n).'] }),
  gen: function () { var o = [[[3, 9, 20, null, null, 15, 7]], [[1, 2, 2, 3, 3, null, null, 4, 4]], [[]], [[1]]]; for (var k = 0; k < 40; k++) o.push([genTree(randInt(0, 13))]); return o; },
  ref: function (a) { var ok = true; function h(n) { if (!n) return 0; var l = h(n.left), r = h(n.right); if (Math.abs(l - r) > 1) ok = false; return 1 + Math.max(l, r); } h(bt(a[0])); return ok; } });

MORE4.push({ slug: 'symmetric-tree', title: 'Symmetric Tree', difficulty: 'easy', topics: ['Tree', 'DFS', 'BFS'], type: 'TREE_BOOL', langsrc: T.TREE_BOOL('isSymmetric'),
  desc: '<p>Given the <code>root</code> of a binary tree, check whether it is a mirror of itself (symmetric around its center).</p>',
  examples: [{ in: 'root = [1,2,2,3,4,4,3]', out: 'true' }, { in: 'root = [1,2,2,null,3,null,3]', out: 'false' }],
  constraints: ['1 &lt;= number of nodes &lt;= 1000', '-100 &lt;= Node.val &lt;= 100'],
  editorial: ED({ intuition: 'Symmetry is a property of two subtrees being mirror images: the left subtree\u2019s left child mirrors the right subtree\u2019s right child, and vice versa.', approach: ['Compare two nodes at a time, starting with (root.left, root.right).', 'Two mirror nodes must have equal values, and <code>(a.left, b.right)</code> and <code>(a.right, b.left)</code> must also mirror.', 'Both null \u2192 mirror; one null \u2192 not mirror.'], code: 'def isSymmetric(self, root):\n    def mirror(a, b):\n        if not a and not b:\n            return True\n        if not a or not b or a.val != b.val:\n            return False\n        return mirror(a.left, b.right) and mirror(a.right, b.left)\n    return mirror(root.left, root.right) if root else True', time: 'O(n)', timeWhy: 'each node is compared once.', space: 'O(h)', spaceWhy: 'recursion stack.', pitfalls: ['Mirror the outer and inner pairs correctly: left.left vs right.right, and left.right vs right.left.'] }),
  gen: function () { var o = [[[1, 2, 2, 3, 4, 4, 3]], [[1, 2, 2, null, 3, null, 3]], [[1]], [[1, 2, 2, 2, null, 2]]]; for (var k = 0; k < 40; k++) o.push([genTree(randInt(1, 11))]); return o; },
  ref: function (a) { function m(x, y) { if (!x && !y) return true; if (!x || !y || x.val !== y.val) return false; return m(x.left, y.right) && m(x.right, y.left); } var r = bt(a[0]); return r ? m(r.left, r.right) : true; } });

MORE4.push({ slug: 'diameter-of-binary-tree', title: 'Diameter of Binary Tree', difficulty: 'easy', topics: ['Tree', 'DFS'], type: 'TREE_INT', langsrc: T.TREE_INT('diameterOfBinaryTree'),
  desc: '<p>Given the <code>root</code> of a binary tree, return the length of its diameter — the number of <strong>edges</strong> on the longest path between any two nodes (the path may not pass through the root).</p>',
  examples: [{ in: 'root = [1,2,3,4,5]', out: '3' }, { in: 'root = [1,2]', out: '1' }],
  constraints: ['1 &lt;= number of nodes &lt;= 10^4', '-100 &lt;= Node.val &lt;= 100'],
  editorial: ED({ intuition: 'The longest path that <em>bends</em> at a node uses that node\u2019s left height plus its right height (in edges). Compute heights bottom-up and track the best bend anywhere.', approach: ['Write a helper returning the height of a subtree in nodes.', 'At each node, the candidate diameter is <code>leftHeight + rightHeight</code> (edges).', 'Update a global best; return <code>1 + max(left, right)</code> upward.'], code: 'def diameterOfBinaryTree(self, root):\n    best = 0\n    def h(node):\n        nonlocal best\n        if not node:\n            return 0\n        l = h(node.left)\n        r = h(node.right)\n        best = max(best, l + r)\n        return 1 + max(l, r)\n    h(root)\n    return best', time: 'O(n)', timeWhy: 'one bottom-up pass.', space: 'O(h)', spaceWhy: 'recursion stack.', pitfalls: ['The diameter counts edges, not nodes — do not add 1 to <code>l + r</code>.'] }),
  gen: function () { var o = [[[1, 2, 3, 4, 5]], [[1, 2]], [[1]], [[]]]; for (var k = 0; k < 40; k++) o.push([genTree(randInt(1, 13))]); return o; },
  ref: function (a) { var best = 0; function h(n) { if (!n) return 0; var l = h(n.left), r = h(n.right); best = Math.max(best, l + r); return 1 + Math.max(l, r); } h(bt(a[0])); return best; } });

MORE4.push({ slug: 'binary-tree-inorder-traversal', title: 'Binary Tree Inorder Traversal', difficulty: 'easy', topics: ['Tree', 'DFS', 'Stack'], type: 'TREE_ARR', langsrc: T.TREE_ARR('inorderTraversal'),
  desc: '<p>Given the <code>root</code> of a binary tree, return its <strong>inorder</strong> traversal (left, node, right) as a list of values.</p>',
  examples: [{ in: 'root = [1,null,2,3]', out: '[1,3,2]' }, { in: 'root = []', out: '[]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 100', '-100 &lt;= Node.val &lt;= 100'],
  editorial: ED({ intuition: 'Inorder means: fully visit the left subtree, then the node, then the right subtree. Recursion expresses this directly; an explicit stack gives the iterative version.', approach: ['Recurse left.', 'Append the current node\u2019s value.', 'Recurse right.'], code: 'def inorderTraversal(self, root):\n    res = []\n    def go(node):\n        if not node:\n            return\n        go(node.left)\n        res.append(node.val)\n        go(node.right)\n    go(root)\n    return res', time: 'O(n)', timeWhy: 'each node visited once.', space: 'O(h)', spaceWhy: 'recursion (or explicit) stack up to height h.' }),
  gen: function () { var o = [[[1, null, 2, 3]], [[]], [[1]], [[1, 2, 3, 4, 5]]]; for (var k = 0; k < 40; k++) o.push([genTree(randInt(0, 10))]); return o; },
  ref: function (a) { var res = []; function go(n) { if (!n) return; go(n.left); res.push(n.val); go(n.right); } go(bt(a[0])); return res; } });

MORE4.push({ slug: 'binary-tree-preorder-traversal', title: 'Binary Tree Preorder Traversal', difficulty: 'easy', topics: ['Tree', 'DFS', 'Stack'], type: 'TREE_ARR', langsrc: T.TREE_ARR('preorderTraversal'),
  desc: '<p>Given the <code>root</code> of a binary tree, return its <strong>preorder</strong> traversal (node, left, right) as a list of values.</p>',
  examples: [{ in: 'root = [1,null,2,3]', out: '[1,2,3]' }, { in: 'root = [1,2,3,4,5]', out: '[1,2,4,5,3]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 100', '-100 &lt;= Node.val &lt;= 100'],
  editorial: ED({ intuition: 'Preorder visits the node <em>before</em> its subtrees: node, then left, then right.', approach: ['Append the current node\u2019s value.', 'Recurse left, then recurse right.'], code: 'def preorderTraversal(self, root):\n    res = []\n    def go(node):\n        if not node:\n            return\n        res.append(node.val)\n        go(node.left)\n        go(node.right)\n    go(root)\n    return res', time: 'O(n)', timeWhy: 'each node visited once.', space: 'O(h)', spaceWhy: 'stack up to height h.' }),
  gen: function () { var o = [[[1, null, 2, 3]], [[1, 2, 3, 4, 5]], [[]], [[1]]]; for (var k = 0; k < 40; k++) o.push([genTree(randInt(0, 10))]); return o; },
  ref: function (a) { var res = []; function go(n) { if (!n) return; res.push(n.val); go(n.left); go(n.right); } go(bt(a[0])); return res; } });

MORE4.push({ slug: 'binary-tree-postorder-traversal', title: 'Binary Tree Postorder Traversal', difficulty: 'easy', topics: ['Tree', 'DFS', 'Stack'], type: 'TREE_ARR', langsrc: T.TREE_ARR('postorderTraversal'),
  desc: '<p>Given the <code>root</code> of a binary tree, return its <strong>postorder</strong> traversal (left, right, node) as a list of values.</p>',
  examples: [{ in: 'root = [1,null,2,3]', out: '[3,2,1]' }, { in: 'root = [1,2,3,4,5]', out: '[4,5,2,3,1]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 100', '-100 &lt;= Node.val &lt;= 100'],
  editorial: ED({ intuition: 'Postorder visits the node <em>after</em> both subtrees: left, right, then node. It is the order you would use to safely delete a tree.', approach: ['Recurse left, then recurse right.', 'Append the current node\u2019s value last.'], code: 'def postorderTraversal(self, root):\n    res = []\n    def go(node):\n        if not node:\n            return\n        go(node.left)\n        go(node.right)\n        res.append(node.val)\n    go(root)\n    return res', time: 'O(n)', timeWhy: 'each node visited once.', space: 'O(h)', spaceWhy: 'stack up to height h.' }),
  gen: function () { var o = [[[1, null, 2, 3]], [[1, 2, 3, 4, 5]], [[]], [[1]]]; for (var k = 0; k < 40; k++) o.push([genTree(randInt(0, 10))]); return o; },
  ref: function (a) { var res = []; function go(n) { if (!n) return; go(n.left); go(n.right); res.push(n.val); } go(bt(a[0])); return res; } });

MORE4.push({ slug: 'sum-of-left-leaves', title: 'Sum of Left Leaves', difficulty: 'easy', topics: ['Tree', 'DFS'], type: 'TREE_INT', langsrc: T.TREE_INT('sumOfLeftLeaves'),
  desc: '<p>Given the <code>root</code> of a binary tree, return the sum of all <strong>left leaves</strong> — leaf nodes that are the left child of their parent.</p>',
  examples: [{ in: 'root = [3,9,20,null,null,15,7]', out: '24', ex: 'Left leaves are 9 and 15; 9 + 15 = 24.' }, { in: 'root = [1]', out: '0' }],
  constraints: ['1 &lt;= number of nodes &lt;= 1000', '-1000 &lt;= Node.val &lt;= 1000'],
  editorial: ED({ intuition: 'A node contributes only if it is a <em>left child</em> AND a <em>leaf</em>. Pass down whether the current node is a left child so we know when to count it.', approach: ['Recurse carrying a flag <code>isLeft</code>.', 'If the node is a leaf and <code>isLeft</code> is true, add its value.', 'Recurse left with <code>isLeft=true</code> and right with <code>isLeft=false</code>.'], code: 'def sumOfLeftLeaves(self, root):\n    def go(node, isLeft):\n        if not node:\n            return 0\n        if not node.left and not node.right:\n            return node.val if isLeft else 0\n        return go(node.left, True) + go(node.right, False)\n    return go(root, False)', time: 'O(n)', timeWhy: 'each node visited once.', space: 'O(h)', spaceWhy: 'recursion stack.', pitfalls: ['A left child that is not a leaf does not count — check the leaf condition too.'] }),
  gen: function () { var o = [[[3, 9, 20, null, null, 15, 7]], [[1]], [[]], [[1, 2, 3, 4]]]; for (var k = 0; k < 40; k++) o.push([genTree(randInt(1, 12))]); return o; },
  ref: function (a) { function go(n, left) { if (!n) return 0; if (!n.left && !n.right) return left ? n.val : 0; return go(n.left, true) + go(n.right, false); } return go(bt(a[0]), false); } });

MORE4.push({ slug: 'count-complete-tree-nodes', title: 'Count Complete Tree Nodes', difficulty: 'easy', topics: ['Tree', 'DFS', 'Binary Search'], type: 'TREE_INT', langsrc: T.TREE_INT('countNodes'),
  desc: '<p>Given the <code>root</code> of a binary tree, return the total number of nodes.</p>',
  examples: [{ in: 'root = [1,2,3,4,5,6]', out: '6' }, { in: 'root = []', out: '0' }],
  constraints: ['0 &lt;= number of nodes &lt;= 5*10^4', '-10^4 &lt;= Node.val &lt;= 10^4'],
  editorial: ED({ intuition: 'The simplest correct answer is a full traversal: total nodes = 1 + nodes in the left subtree + nodes in the right subtree. (For a guaranteed <em>complete</em> tree there is an O(log\u00b2 n) trick using left/right heights, but O(n) is accepted here.)', approach: ['Null \u2192 0.', 'Otherwise <code>1 + countNodes(left) + countNodes(right)</code>.'], code: 'def countNodes(self, root):\n    if not root:\n        return 0\n    return 1 + self.countNodes(root.left) + self.countNodes(root.right)', time: 'O(n)', timeWhy: 'visits every node.', space: 'O(h)', spaceWhy: 'recursion stack.' }),
  gen: function () { var o = [[[1, 2, 3, 4, 5, 6]], [[]], [[1]], [[1, 2, 3, 4, 5, 6, 7]]]; for (var k = 0; k < 40; k++) o.push([genTree(randInt(0, 14))]); return o; },
  ref: function (a) { function c(n) { return n ? 1 + c(n.left) + c(n.right) : 0; } return c(bt(a[0])); } });

module.exports = { MORE4 };
