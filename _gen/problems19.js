// Batch 19: singly linked list — the most-asked interview problems.
// Uses only the linked-list I/O types LIST_ARR, LIST_INT_ARR, LIST_POS_BOOL
// (mirrors reverse-linked-list / remove-nth-node / linked-list-cycle etc.).
const { T, randInt, randArr, ln } = require('./gen.js');

function ed(approach, code, time, space) {
  return '<h2>Approach: ' + approach + '</h2><pre><code>' + code + '</code></pre><p><b>Complexity:</b> ' + time + ' time, ' + space + ' space.</p>';
}
function sortedArr(n, lo, hi) { return randArr(n, lo, hi).sort(function (a, b) { return a - b; }); }

const MORE19 = [];

// ---- Middle of the Linked List (LIST_ARR) ----
MORE19.push({ slug: 'middle-of-the-linked-list', title: 'Middle of the Linked List', difficulty: 'easy', topics: ['Linked List', 'Two Pointers'], type: 'LIST_ARR', langsrc: T.LIST_ARR('middleNode'),
  desc: '<p>Given the <code>head</code> of a singly linked list, return the list starting from the <strong>middle</strong> node. If there are two middle nodes, return the second one.</p>',
  examples: [{ in: 'head = [1,2,3,4,5]', out: '[3,4,5]' }, { in: 'head = [1,2,3,4,5,6]', out: '[4,5,6]' }],
  constraints: ['1 &lt;= number of nodes &lt;= 100', '1 &lt;= Node.val &lt;= 100'],
  editorial: ed('Slow / fast pointers', 'def middleNode(self, head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6]], [[1]], [[1, 2]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 10), 1, 30)]); return o; },
  ref: function (a) { return a[0].slice(Math.floor(a[0].length / 2)); } });

// ---- Palindrome Linked List (LIST_POS_BOOL, pos always -1) ----
MORE19.push({ slug: 'palindrome-linked-list', title: 'Palindrome Linked List', difficulty: 'easy', topics: ['Linked List', 'Two Pointers', 'Stack'], type: 'LIST_POS_BOOL', langsrc: T.LIST_POS_BOOL('isPalindrome'),
  desc: '<p>Given the <code>head</code> of a singly linked list, return <code>true</code> if the sequence of values reads the same forwards and backwards. (The judge passes a plain acyclic list; <code>pos</code> is always <code>-1</code>.)</p>',
  examples: [{ in: 'head = [1,2,2,1]', out: 'true' }, { in: 'head = [1,2]', out: 'false' }],
  constraints: ['0 &lt;= number of nodes &lt;= 100', '0 &lt;= Node.val &lt;= 9'],
  editorial: ed('Collect values, compare', 'def isPalindrome(self, head):\n    vals = []\n    while head:\n        vals.append(head.val)\n        head = head.next\n    return vals == vals[::-1]', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[1, 2, 2, 1], -1], [[1, 2], -1], [[1], -1], [[], -1], [[1, 2, 3, 2, 1], -1]]; for (var k = 0; k < 36; k++) { var n = randInt(0, 8), arr = randArr(n, 0, 3); if (Math.random() < 0.4) { var half = arr.slice(0, Math.ceil(n / 2)); arr = half.concat(half.slice(0, Math.floor(n / 2)).reverse()); } o.push([arr, -1]); } return o; },
  ref: function (a) { var v = a[0]; for (var i = 0, j = v.length - 1; i < j; i++, j--) if (v[i] !== v[j]) return false; return true; } });

// ---- Remove Linked List Elements (LIST_INT_ARR; k is the value to remove) ----
MORE19.push({ slug: 'remove-linked-list-elements', title: 'Remove Linked List Elements', difficulty: 'easy', topics: ['Linked List', 'Recursion'], type: 'LIST_INT_ARR', langsrc: T.LIST_INT_ARR('removeElements'),
  desc: '<p>Given the <code>head</code> of a linked list and an integer <code>k</code>, remove all nodes whose value equals <code>k</code> and return the new head. (LeetCode calls this parameter <code>val</code>.)</p>',
  examples: [{ in: 'head = [1,2,6,3,4,5,6], k = 6', out: '[1,2,3,4,5]' }, { in: 'head = [7,7,7,7], k = 7', out: '[]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 10^4', '0 &lt;= Node.val, k &lt;= 50'],
  editorial: ed('Dummy head + skip', 'def removeElements(self, head, k):\n    dummy = ListNode(0, head)\n    cur = dummy\n    while cur.next:\n        if cur.next.val == k:\n            cur.next = cur.next.next\n        else:\n            cur = cur.next\n    return dummy.next', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 6, 3, 4, 5, 6], 6], [[7, 7, 7, 7], 7], [[], 1], [[1, 2, 3], 5]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(0, 10), 0, 4), randInt(0, 4)]); return o; },
  ref: function (a) { var k = a[1]; return a[0].filter(function (x) { return x !== k; }); } });

// ---- Odd Even Linked List (LIST_ARR) ----
MORE19.push({ slug: 'odd-even-linked-list', title: 'Odd Even Linked List', difficulty: 'medium', topics: ['Linked List'], type: 'LIST_ARR', langsrc: T.LIST_ARR('oddEvenList'),
  desc: '<p>Given the <code>head</code> of a singly linked list, group all the nodes at <strong>odd</strong> positions together followed by the nodes at <strong>even</strong> positions (1-indexed), preserving relative order within each group. Return the reordered list.</p>',
  examples: [{ in: 'head = [1,2,3,4,5]', out: '[1,3,5,2,4]' }, { in: 'head = [2,1,3,5,6,4,7]', out: '[2,3,6,7,1,5,4]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 10^4', '-10^6 &lt;= Node.val &lt;= 10^6'],
  editorial: ed('Split odd/even chains', 'def oddEvenList(self, head):\n    if not head or not head.next:\n        return head\n    odd = head\n    even = head.next\n    even_head = even\n    while even and even.next:\n        odd.next = even.next\n        odd = odd.next\n        even.next = odd.next\n        even = even.next\n    odd.next = even_head\n    return head', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3, 4, 5]], [[2, 1, 3, 5, 6, 4, 7]], [[]], [[1]], [[1, 2]]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(0, 10), -20, 20)]); return o; },
  ref: function (a) { var odd = [], even = []; a[0].forEach(function (v, i) { (i % 2 === 0 ? odd : even).push(v); }); return odd.concat(even); } });

// ---- Swap Nodes in Pairs (LIST_ARR) ----
MORE19.push({ slug: 'swap-nodes-in-pairs', title: 'Swap Nodes in Pairs', difficulty: 'medium', topics: ['Linked List', 'Recursion'], type: 'LIST_ARR', langsrc: T.LIST_ARR('swapPairs'),
  desc: '<p>Given the <code>head</code> of a linked list, swap every two adjacent nodes and return its head. You must swap the nodes themselves, not just their values. A trailing odd node stays in place.</p>',
  examples: [{ in: 'head = [1,2,3,4]', out: '[2,1,4,3]' }, { in: 'head = [1,2,3]', out: '[2,1,3]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 100', '0 &lt;= Node.val &lt;= 100'],
  editorial: ed('Dummy + relink pairs', 'def swapPairs(self, head):\n    dummy = ListNode(0, head)\n    prev = dummy\n    while prev.next and prev.next.next:\n        a = prev.next\n        b = a.next\n        a.next = b.next\n        b.next = a\n        prev.next = b\n        prev = a\n    return dummy.next', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3, 4]], [[1, 2, 3]], [[]], [[1]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(0, 10), 0, 30)]); return o; },
  ref: function (a) { var v = a[0], res = [], i = 0; for (; i + 1 < v.length; i += 2) { res.push(v[i + 1], v[i]); } if (i < v.length) res.push(v[i]); return res; } });

// ---- Rotate List (LIST_INT_ARR) ----
MORE19.push({ slug: 'rotate-list', title: 'Rotate List', difficulty: 'medium', topics: ['Linked List', 'Two Pointers'], type: 'LIST_INT_ARR', langsrc: T.LIST_INT_ARR('rotateRight'),
  desc: '<p>Given the <code>head</code> of a linked list, rotate the list to the right by <code>k</code> places and return the new head.</p>',
  examples: [{ in: 'head = [1,2,3,4,5], k = 2', out: '[4,5,1,2,3]' }, { in: 'head = [0,1,2], k = 4', out: '[2,0,1]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 500', '-100 &lt;= Node.val &lt;= 100', '0 &lt;= k &lt;= 2*10^9'],
  editorial: ed('Close the ring, cut at n-k%n', 'def rotateRight(self, head, k):\n    if not head or not head.next:\n        return head\n    n = 1\n    tail = head\n    while tail.next:\n        tail = tail.next\n        n += 1\n    k %= n\n    if k == 0:\n        return head\n    tail.next = head\n    steps = n - k\n    new_tail = head\n    for _ in range(steps - 1):\n        new_tail = new_tail.next\n    new_head = new_tail.next\n    new_tail.next = None\n    return new_head', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3, 4, 5], 2], [[0, 1, 2], 4], [[], 0], [[1], 99], [[1, 2], 3]]; for (var k = 0; k < 36; k++) o.push([randArr(randInt(0, 9), -20, 20), randInt(0, 12)]); return o; },
  ref: function (a) { var v = a[0].slice(), n = v.length; if (n === 0) return []; var k = a[1] % n; if (k === 0) return v; return v.slice(n - k).concat(v.slice(0, n - k)); } });

// ---- Remove Duplicates from Sorted List (LIST_ARR) ----
MORE19.push({ slug: 'remove-duplicates-from-sorted-list', title: 'Remove Duplicates from Sorted List', difficulty: 'easy', topics: ['Linked List'], type: 'LIST_ARR', langsrc: T.LIST_ARR('deleteDuplicates'),
  desc: '<p>Given the <code>head</code> of a <strong>sorted</strong> linked list, delete all duplicates so that each value appears only once. Return the sorted list.</p>',
  examples: [{ in: 'head = [1,1,2]', out: '[1,2]' }, { in: 'head = [1,1,2,3,3]', out: '[1,2,3]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 300', '-100 &lt;= Node.val &lt;= 100', 'The list is sorted in non-decreasing order.'],
  editorial: ed('Skip equal neighbours', 'def deleteDuplicates(self, head):\n    cur = head\n    while cur and cur.next:\n        if cur.next.val == cur.val:\n            cur.next = cur.next.next\n        else:\n            cur = cur.next\n    return head', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 1, 2]], [[1, 1, 2, 3, 3]], [[]], [[1]], [[2, 2, 2, 2]]]; for (var k = 0; k < 36; k++) o.push([sortedArr(randInt(0, 10), 0, 6)]); return o; },
  ref: function (a) { var res = []; a[0].forEach(function (x) { if (!res.length || res[res.length - 1] !== x) res.push(x); }); return res; } });

// ---- Remove Duplicates from Sorted List II (LIST_ARR) ----
MORE19.push({ slug: 'remove-duplicates-from-sorted-list-ii', title: 'Remove Duplicates from Sorted List II', difficulty: 'medium', topics: ['Linked List', 'Two Pointers'], type: 'LIST_ARR', langsrc: T.LIST_ARR('deleteDuplicates'),
  desc: '<p>Given the <code>head</code> of a <strong>sorted</strong> linked list, delete <em>all</em> nodes that have duplicate values, leaving only values that appear exactly once. Return the sorted list.</p>',
  examples: [{ in: 'head = [1,2,3,3,4,4,5]', out: '[1,2,5]' }, { in: 'head = [1,1,1,2,3]', out: '[2,3]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 300', '-100 &lt;= Node.val &lt;= 100', 'The list is sorted in non-decreasing order.'],
  editorial: ed('Dummy + skip runs', 'def deleteDuplicates(self, head):\n    dummy = ListNode(0, head)\n    prev = dummy\n    cur = head\n    while cur:\n        while cur.next and cur.val == cur.next.val:\n            cur = cur.next\n        if prev.next == cur:\n            prev = prev.next\n        else:\n            prev.next = cur.next\n        cur = cur.next\n    return dummy.next', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3, 3, 4, 4, 5]], [[1, 1, 1, 2, 3]], [[]], [[1]], [[1, 1]]]; for (var k = 0; k < 36; k++) o.push([sortedArr(randInt(0, 10), 0, 6)]); return o; },
  ref: function (a) { var cnt = {}; a[0].forEach(function (x) { cnt[x] = (cnt[x] || 0) + 1; }); return a[0].filter(function (x) { return cnt[x] === 1; }); } });

// ---- Partition List (LIST_INT_ARR; k is the partition value x) ----
MORE19.push({ slug: 'partition-list', title: 'Partition List', difficulty: 'medium', topics: ['Linked List', 'Two Pointers'], type: 'LIST_INT_ARR', langsrc: T.LIST_INT_ARR('partition'),
  desc: '<p>Given the <code>head</code> of a linked list and a value <code>k</code>, partition it so that all nodes with value less than <code>k</code> come before nodes with value greater than or equal to <code>k</code>. Preserve the original relative order within each part. (LeetCode calls this parameter <code>x</code>.)</p>',
  examples: [{ in: 'head = [1,4,3,2,5,2], k = 3', out: '[1,2,2,4,3,5]' }, { in: 'head = [2,1], k = 2', out: '[1,2]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 200', '-100 &lt;= Node.val &lt;= 100', '-200 &lt;= k &lt;= 200'],
  editorial: ed('Two chains, then join', 'def partition(self, head, k):\n    less = ListNode(0)\n    greater = ListNode(0)\n    l, g = less, greater\n    cur = head\n    while cur:\n        if cur.val < k:\n            l.next = cur; l = cur\n        else:\n            g.next = cur; g = cur\n        cur = cur.next\n    g.next = None\n    l.next = greater.next\n    return less.next', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 4, 3, 2, 5, 2], 3], [[2, 1], 2], [[], 0], [[1], 1]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(0, 10), -8, 8), randInt(-8, 8)]); return o; },
  ref: function (a) { var x = a[1], less = [], ge = []; a[0].forEach(function (v) { (v < x ? less : ge).push(v); }); return less.concat(ge); } });

// ---- Delete the Middle Node of a Linked List (LIST_ARR) ----
MORE19.push({ slug: 'delete-the-middle-node-of-a-linked-list', title: 'Delete the Middle Node of a Linked List', difficulty: 'medium', topics: ['Linked List', 'Two Pointers'], type: 'LIST_ARR', langsrc: T.LIST_ARR('deleteMiddle'),
  desc: '<p>Given the <code>head</code> of a linked list, delete the <strong>middle</strong> node (the node at 0-indexed position <code>floor(n/2)</code>) and return the head. If the list has one node, return an empty list.</p>',
  examples: [{ in: 'head = [1,3,4,7,1,2,6]', out: '[1,3,4,1,2,6]' }, { in: 'head = [1,2,3,4]', out: '[1,2,4]' }],
  constraints: ['1 &lt;= number of nodes &lt;= 10^5', '1 &lt;= Node.val &lt;= 10^5'],
  editorial: ed('Slow/fast with trailing prev', 'def deleteMiddle(self, head):\n    if not head or not head.next:\n        return None\n    slow = fast = head\n    prev = None\n    while fast and fast.next:\n        prev = slow\n        slow = slow.next\n        fast = fast.next.next\n    prev.next = slow.next\n    return head', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 3, 4, 7, 1, 2, 6]], [[1, 2, 3, 4]], [[1]], [[1, 2]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 10), 1, 30)]); return o; },
  ref: function (a) { var v = a[0].slice(); if (v.length <= 1) return []; v.splice(Math.floor(v.length / 2), 1); return v; } });

// ---- Merge Nodes in Between Zeros (LIST_ARR) ----
MORE19.push({ slug: 'merge-nodes-in-between-zeros', title: 'Merge Nodes in Between Zeros', difficulty: 'medium', topics: ['Linked List', 'Simulation'], type: 'LIST_ARR', langsrc: T.LIST_ARR('mergeNodes'),
  desc: '<p>You are given the <code>head</code> of a linked list that begins and ends with <code>0</code>; between every pair of consecutive <code>0</code>s there is at least one node. Merge each block of nodes between two zeros into a single node whose value is their sum, then return the resulting list (which no longer contains any <code>0</code>).</p>',
  examples: [{ in: 'head = [0,3,1,0,4,5,2,0]', out: '[4,11]' }, { in: 'head = [0,1,0,3,0,2,2,0]', out: '[1,3,4]' }],
  constraints: ['3 &lt;= number of nodes &lt;= 2*10^5', '0 &lt;= Node.val &lt;= 1000', 'The list starts and ends with 0.'],
  editorial: ed('Accumulate between zeros', 'def mergeNodes(self, head):\n    dummy = ListNode(0)\n    tail = dummy\n    cur = head.next\n    s = 0\n    while cur:\n        if cur.val == 0:\n            tail.next = ListNode(s)\n            tail = tail.next\n            s = 0\n        else:\n            s += cur.val\n        cur = cur.next\n    return dummy.next', 'O(n)', 'O(1)'),
  gen: function () { function blk() { var m = randInt(1, 3), r = []; for (var i = 0; i < m; i++) r.push(randInt(1, 6)); return r; } var o = [[[0, 3, 1, 0, 4, 5, 2, 0]], [[0, 1, 0, 3, 0, 2, 2, 0]]]; for (var k = 0; k < 38; k++) { var g = randInt(1, 4), arr = [0]; for (var i = 0; i < g; i++) { arr = arr.concat(blk()); arr.push(0); } o.push([arr]); } return o; },
  ref: function (a) { var res = [], s = 0; for (var i = 1; i < a[0].length; i++) { if (a[0][i] === 0) { res.push(s); s = 0; } else s += a[0][i]; } return res; } });

// ---- Remove Nodes From Linked List (LIST_ARR) ----
MORE19.push({ slug: 'remove-nodes-from-linked-list', title: 'Remove Nodes From Linked List', difficulty: 'medium', topics: ['Linked List', 'Stack', 'Recursion', 'Monotonic Stack'], type: 'LIST_ARR', langsrc: T.LIST_ARR('removeNodes'),
  desc: '<p>Given the <code>head</code> of a linked list, remove every node which has a node with a <strong>strictly greater</strong> value anywhere to its right. Return the head of the modified list.</p>',
  examples: [{ in: 'head = [5,2,13,3,8]', out: '[13,8]' }, { in: 'head = [1,1,1,1]', out: '[1,1,1,1]' }],
  constraints: ['1 &lt;= number of nodes &lt;= 10^5', '1 &lt;= Node.val &lt;= 10^5'],
  editorial: ed('Recursion from the right', 'def removeNodes(self, head):\n    if not head:\n        return None\n    head.next = self.removeNodes(head.next)\n    if head.next and head.next.val > head.val:\n        return head.next\n    return head', 'O(n)', 'O(n)'),
  gen: function () { var o = [[[5, 2, 13, 3, 8]], [[1, 1, 1, 1]], [[1]], [[9, 8, 7]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 10), 1, 15)]); return o; },
  ref: function (a) { var res = [], maxSeen = -Infinity; for (var i = a[0].length - 1; i >= 0; i--) { if (a[0][i] >= maxSeen) { res.unshift(a[0][i]); maxSeen = a[0][i]; } } return res; } });

// ---- Double a Number Represented as a Linked List (LIST_ARR) ----
MORE19.push({ slug: 'double-a-number-represented-as-a-linked-list', title: 'Double a Number Represented as a Linked List', difficulty: 'medium', topics: ['Linked List', 'Math', 'Stack'], type: 'LIST_ARR', langsrc: T.LIST_ARR('doubleIt'),
  desc: '<p>Given the <code>head</code> of a non-empty linked list whose nodes store the digits of a non-negative integer in order (most significant digit first, no leading zeros except the number 0 itself), return the list representing double that number.</p>',
  examples: [{ in: 'head = [1,8,9]', out: '[3,7,8]', ex: '189 * 2 = 378.' }, { in: 'head = [9,9,9]', out: '[1,9,9,8]' }],
  constraints: ['1 &lt;= number of nodes &lt;= 6', '0 &lt;= Node.val &lt;= 9', 'No leading zeros except the number 0.'],
  editorial: ed('Parse, double, rebuild', 'def doubleIt(self, head):\n    num = 0\n    cur = head\n    while cur:\n        num = num * 10 + cur.val\n        cur = cur.next\n    num *= 2\n    digits = [int(c) for c in str(num)]\n    dummy = ListNode(0)\n    t = dummy\n    for d in digits:\n        t.next = ListNode(d)\n        t = t.next\n    return dummy.next', 'O(n)', 'O(n)'),
  gen: function () { function num(L) { var d = [randInt(1, 9)]; for (var i = 1; i < L; i++) d.push(randInt(0, 9)); return d; } var o = [[[1, 8, 9]], [[9, 9, 9]], [[0]], [[5]]]; for (var k = 0; k < 38; k++) { if (Math.random() < 0.1) o.push([[0]]); else o.push([num(randInt(1, 6))]); } return o; },
  ref: function (a) { var n = BigInt(a[0].join('')) * 2n; return n.toString().split('').map(Number); } });

// ---- Sort List (LIST_ARR) ----
MORE19.push({ slug: 'sort-list', title: 'Sort List', difficulty: 'medium', topics: ['Linked List', 'Sorting', 'Merge Sort', 'Divide and Conquer'], type: 'LIST_ARR', langsrc: T.LIST_ARR('sortList'),
  desc: '<p>Given the <code>head</code> of a linked list, return the list sorted in <strong>ascending</strong> order.</p>',
  examples: [{ in: 'head = [4,2,1,3]', out: '[1,2,3,4]' }, { in: 'head = [-1,5,3,4,0]', out: '[-1,0,3,4,5]' }],
  constraints: ['0 &lt;= number of nodes &lt;= 5*10^4', '-10^5 &lt;= Node.val &lt;= 10^5'],
  editorial: ed('Collect, sort, write back', 'def sortList(self, head):\n    vals = []\n    cur = head\n    while cur:\n        vals.append(cur.val)\n        cur = cur.next\n    vals.sort()\n    cur = head\n    i = 0\n    while cur:\n        cur.val = vals[i]\n        i += 1\n        cur = cur.next\n    return head', 'O(n log n)', 'O(n)'),
  gen: function () { var o = [[[4, 2, 1, 3]], [[-1, 5, 3, 4, 0]], [[]], [[1]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(0, 10), -20, 20)]); return o; },
  ref: function (a) { return a[0].slice().sort(function (x, y) { return x - y; }); } });

// ---- Insertion Sort List (LIST_ARR) ----
MORE19.push({ slug: 'insertion-sort-list', title: 'Insertion Sort List', difficulty: 'medium', topics: ['Linked List', 'Sorting'], type: 'LIST_ARR', langsrc: T.LIST_ARR('insertionSortList'),
  desc: '<p>Given the <code>head</code> of a singly linked list, sort it in <strong>ascending</strong> order using insertion sort and return the sorted list.</p>',
  examples: [{ in: 'head = [4,2,1,3]', out: '[1,2,3,4]' }, { in: 'head = [-1,5,3,4,0]', out: '[-1,0,3,4,5]' }],
  constraints: ['1 &lt;= number of nodes &lt;= 5000', '-5000 &lt;= Node.val &lt;= 5000'],
  editorial: ed('Insert each node into a sorted prefix', 'def insertionSortList(self, head):\n    dummy = ListNode(0)\n    cur = head\n    while cur:\n        nxt = cur.next\n        prev = dummy\n        while prev.next and prev.next.val < cur.val:\n            prev = prev.next\n        cur.next = prev.next\n        prev.next = cur\n        cur = nxt\n    return dummy.next', 'O(n^2)', 'O(1)'),
  gen: function () { var o = [[[4, 2, 1, 3]], [[-1, 5, 3, 4, 0]], [[1]], [[2, 1]]]; for (var k = 0; k < 38; k++) o.push([randArr(randInt(1, 10), -20, 20)]); return o; },
  ref: function (a) { return a[0].slice().sort(function (x, y) { return x - y; }); } });

// ---- Swapping Nodes in a Linked List (LIST_INT_ARR) ----
MORE19.push({ slug: 'swapping-nodes-in-a-linked-list', title: 'Swapping Nodes in a Linked List', difficulty: 'medium', topics: ['Linked List', 'Two Pointers'], type: 'LIST_INT_ARR', langsrc: T.LIST_INT_ARR('swapNodes'),
  desc: '<p>Given the <code>head</code> of a linked list and an integer <code>k</code>, swap the values of the <code>k</code>-th node from the beginning and the <code>k</code>-th node from the end (1-indexed), then return the head.</p>',
  examples: [{ in: 'head = [1,2,3,4,5], k = 2', out: '[1,4,3,2,5]' }, { in: 'head = [7,9,6,6,7,8,3,0,9,5], k = 5', out: '[7,9,6,6,8,7,3,0,9,5]' }],
  constraints: ['1 &lt;= k &lt;= number of nodes &lt;= 10^5', '0 &lt;= Node.val &lt;= 100'],
  editorial: ed('Two-pointer gap of k', 'def swapNodes(self, head, k):\n    first = head\n    for _ in range(k - 1):\n        first = first.next\n    second = head\n    cur = first\n    while cur.next:\n        cur = cur.next\n        second = second.next\n    first.val, second.val = second.val, first.val\n    return head', 'O(n)', 'O(1)'),
  gen: function () { var o = [[[1, 2, 3, 4, 5], 2], [[7, 9, 6, 6, 7, 8, 3, 0, 9, 5], 5], [[1], 1], [[1, 2], 1]]; for (var k = 0; k < 38; k++) { var n = randInt(1, 10), arr = randArr(n, 0, 50); o.push([arr, randInt(1, n)]); } return o; },
  ref: function (a) { var v = a[0].slice(), n = v.length, k = a[1]; var t = v[k - 1]; v[k - 1] = v[n - k]; v[n - k] = t; return v; } });

module.exports = { MORE19 };
