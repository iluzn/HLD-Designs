---
layout: default
title: "PhonePe DSA Solutions - All Problems Solved (Java)"
description: "Complete solutions to every DSA problem asked at PhonePe: Trees, DP, Graphs, Binary Search, Stack, Heap, Union-Find. Clean Java code with approach and complexity for each."
permalink: /dsa/phonepe-solutions
---

# PhonePe DSA Solutions — Every Problem Solved

Full solutions to every problem in the [PhonePe DSA question list](/companies/phonpe). Each entry has the core idea, a clean Java solution, and complexity. PhonePe interviews are Java-heavy and grade on code quality, so the code here favors clear naming and structure over cleverness.

**How to use this page:** don't read the solution first. Try the problem, get stuck, read only the *approach* line, then retry. Read the code last. Problems marked 🔎 have a dedicated deep-dive page with a longer walkthrough and Java / Python / C++ tabs.

> Jump to: [Trees + DP](#trees--dp) · [Dynamic Programming](#dynamic-programming) · [Graphs](#graphs--bfs--dfs) · [Arrays & Hashing](#arrays--strings--hashing) · [Binary Search](#binary-search) · [Stack](#stack) · [Linked List](#linked-list) · [Heap & Greedy](#heap--greedy) · [Backtracking](#backtracking) · [Union-Find](#union-find) · [PhonePe Custom](#phonepe-custom-problems)

---

## Trees + DP

PhonePe's single favorite category. The recurring pattern: a DFS that returns a small tuple of values per node, combined at the parent. Master House Robber III and Max Path Sum and most tree problems fall out.

### 1. House Robber III — [LC 337](https://leetcode.com/problems/house-robber-iii/) · Medium

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/house-robber-iii)

**Approach:** Each node returns two values: `{rob, skip}`. If you rob a node you must skip its children; if you skip it you take the best of each child. Post-order DFS.

**Complexity:** O(n) time, O(h) space.

```java
public int rob(TreeNode root) {
    int[] res = dfs(root);
    return Math.max(res[0], res[1]);
}

// returns [robThis, skipThis]
private int[] dfs(TreeNode node) {
    if (node == null) return new int[]{0, 0};
    int[] left = dfs(node.left);
    int[] right = dfs(node.right);
    int robThis = node.val + left[1] + right[1];
    int skipThis = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    return new int[]{robThis, skipThis};
}
```

### 2. Binary Tree Maximum Path Sum — [LC 124](https://leetcode.com/problems/binary-tree-maximum-path-sum/) · Hard

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/binary-tree-maximum-path-sum)

**Approach:** DFS returns the best *downward* path from a node (one branch only). At each node, the best path *through* it is `node + max(0,left) + max(0,right)` — update a global max with that. Clamp negatives to 0.

**Complexity:** O(n) time, O(h) space.

```java
private int best = Integer.MIN_VALUE;

public int maxPathSum(TreeNode root) {
    gain(root);
    return best;
}

private int gain(TreeNode node) {
    if (node == null) return 0;
    int left = Math.max(gain(node.left), 0);
    int right = Math.max(gain(node.right), 0);
    best = Math.max(best, node.val + left + right); // path through node
    return node.val + Math.max(left, right);        // best single branch upward
}
```

### 3. All Nodes Distance K in Binary Tree — [LC 863](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/) · Medium

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/all-nodes-distance-k)

**Approach:** A tree only has downward edges, so first build a parent map to make it an undirected graph, then BFS outward from `target` for exactly K levels.

**Complexity:** O(n) time, O(n) space.

```java
public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
    Map<TreeNode, TreeNode> parent = new HashMap<>();
    buildParents(root, null, parent);

    Queue<TreeNode> q = new LinkedList<>();
    Set<TreeNode> seen = new HashSet<>();
    q.add(target); seen.add(target);
    int dist = 0;

    while (!q.isEmpty()) {
        if (dist == k) {
            List<Integer> res = new ArrayList<>();
            for (TreeNode n : q) res.add(n.val);
            return res;
        }
        for (int size = q.size(); size > 0; size--) {
            TreeNode n = q.poll();
            for (TreeNode nb : new TreeNode[]{n.left, n.right, parent.get(n)}) {
                if (nb != null && seen.add(nb)) q.add(nb);
            }
        }
        dist++;
    }
    return new ArrayList<>();
}

private void buildParents(TreeNode node, TreeNode par, Map<TreeNode, TreeNode> parent) {
    if (node == null) return;
    parent.put(node, par);
    buildParents(node.left, node, parent);
    buildParents(node.right, node, parent);
}
```

### 4. Serialize and Deserialize Binary Tree — [LC 297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) · Hard

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/serialize-deserialize-binary-tree)

**Approach:** Pre-order DFS with explicit null markers. Deserialize by consuming tokens in the same order using a queue.

**Complexity:** O(n) for both.

```java
public String serialize(TreeNode root) {
    StringBuilder sb = new StringBuilder();
    ser(root, sb);
    return sb.toString();
}

private void ser(TreeNode node, StringBuilder sb) {
    if (node == null) { sb.append("#,"); return; }
    sb.append(node.val).append(",");
    ser(node.left, sb);
    ser(node.right, sb);
}

public TreeNode deserialize(String data) {
    Queue<String> tokens = new LinkedList<>(Arrays.asList(data.split(",")));
    return des(tokens);
}

private TreeNode des(Queue<String> tokens) {
    String val = tokens.poll();
    if (val.equals("#")) return null;
    TreeNode node = new TreeNode(Integer.parseInt(val));
    node.left = des(tokens);
    node.right = des(tokens);
    return node;
}
```

### 5. Lowest Common Ancestor — [LC 236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) · Medium

**Approach:** DFS. If the current node is p or q, return it. If both subtrees return non-null, current node is the LCA. Otherwise bubble up whichever side is non-null.

**Complexity:** O(n) time, O(h) space.

```java
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;
    return left != null ? left : right;
}
```

### 6. Validate Binary Search Tree — [LC 98](https://leetcode.com/problems/validate-binary-search-tree/) · Medium

**Approach:** Carry down a valid `(low, high)` range. Each node must lie strictly inside it; recurse tightening the bound. Use `long` bounds to avoid Integer overflow.

**Complexity:** O(n) time, O(h) space.

```java
public boolean isValidBST(TreeNode root) {
    return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

private boolean valid(TreeNode node, long low, long high) {
    if (node == null) return true;
    if (node.val <= low || node.val >= high) return false;
    return valid(node.left, low, node.val) && valid(node.right, node.val, high);
}
```

### 7. Kth Smallest Element in a BST — [LC 230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) · Medium

**Approach:** In-order traversal of a BST visits values in sorted order. Stop at the k-th.

**Complexity:** O(h + k) time.

```java
public int kthSmallest(TreeNode root, int k) {
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode cur = root;
    while (cur != null || !stack.isEmpty()) {
        while (cur != null) { stack.push(cur); cur = cur.left; }
        cur = stack.pop();
        if (--k == 0) return cur.val;
        cur = cur.right;
    }
    return -1;
}
```

### 8. Flatten Binary Tree to Linked List — [LC 114](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) · Medium

**Approach:** For each node with a left child, find the left subtree's rightmost node, attach the current right subtree there, then move left subtree to the right and null the left. Morris-style, O(1) extra space.

**Complexity:** O(n) time, O(1) space.

```java
public void flatten(TreeNode root) {
    TreeNode cur = root;
    while (cur != null) {
        if (cur.left != null) {
            TreeNode rightmost = cur.left;
            while (rightmost.right != null) rightmost = rightmost.right;
            rightmost.right = cur.right;
            cur.right = cur.left;
            cur.left = null;
        }
        cur = cur.right;
    }
}
```

### 9. Construct Binary Tree from Inorder and Postorder — [LC 106](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) · Medium

**Approach:** The last postorder element is the root. Its index in inorder splits left/right subtrees. Build right before left since we consume postorder from the end.

**Complexity:** O(n) time with an index map.

```java
private int postIdx;
private Map<Integer, Integer> inIdx = new HashMap<>();

public TreeNode buildTree(int[] inorder, int[] postorder) {
    postIdx = postorder.length - 1;
    for (int i = 0; i < inorder.length; i++) inIdx.put(inorder[i], i);
    return build(postorder, 0, inorder.length - 1);
}

private TreeNode build(int[] post, int inLo, int inHi) {
    if (inLo > inHi) return null;
    int rootVal = post[postIdx--];
    TreeNode root = new TreeNode(rootVal);
    int mid = inIdx.get(rootVal);
    root.right = build(post, mid + 1, inHi);
    root.left = build(post, inLo, mid - 1);
    return root;
}
```

### 10. Diameter of Binary Tree — [LC 543](https://leetcode.com/problems/diameter-of-binary-tree/) · Easy

**Approach:** DFS returns height. At each node the longest path through it is `leftHeight + rightHeight`; track the global max.

**Complexity:** O(n) time, O(h) space.

```java
private int diameter = 0;

public int diameterOfBinaryTree(TreeNode root) {
    height(root);
    return diameter;
}

private int height(TreeNode node) {
    if (node == null) return 0;
    int left = height(node.left);
    int right = height(node.right);
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
}
```

### 67. Distribute Coins in Binary Tree — [LC 979](https://leetcode.com/problems/distribute-coins-in-binary-tree/) · Medium

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/distribute-coins-in-binary-tree)

**Approach:** DFS returns each subtree's "balance" (coins minus nodes). The moves across an edge equal `abs(balance)` of the child; sum those absolute flows.

**Complexity:** O(n) time, O(h) space.

```java
private int moves = 0;

public int distributeCoins(TreeNode root) {
    balance(root);
    return moves;
}

private int balance(TreeNode node) {
    if (node == null) return 0;
    int left = balance(node.left);
    int right = balance(node.right);
    moves += Math.abs(left) + Math.abs(right);
    return node.val + left + right - 1;
}
```

---

## Dynamic Programming

### 11. Candy — [LC 135](https://leetcode.com/problems/candy/) · Hard

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/candy)

**Approach:** Two greedy passes. Left-to-right: if a child rates higher than the left neighbor, give one more. Right-to-left: same for the right neighbor, taking the max. Asked specifically to SDE-2 candidates.

**Complexity:** O(n) time, O(n) space.

```java
public int candy(int[] ratings) {
    int n = ratings.length;
    int[] candies = new int[n];
    Arrays.fill(candies, 1);

    for (int i = 1; i < n; i++)
        if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;

    for (int i = n - 2; i >= 0; i--)
        if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);

    int total = 0;
    for (int c : candies) total += c;
    return total;
}
```

### 12. House Robber — [LC 198](https://leetcode.com/problems/house-robber/) · Medium

**Approach:** `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`. Roll into two variables.

**Complexity:** O(n) time, O(1) space.

```java
public int rob(int[] nums) {
    int prev = 0, curr = 0; // prev = dp[i-2], curr = dp[i-1]
    for (int num : nums) {
        int next = Math.max(curr, prev + num);
        prev = curr;
        curr = next;
    }
    return curr;
}
```

### 13. House Robber II (Circular) — [LC 213](https://leetcode.com/problems/house-robber-ii/) · Medium

**Approach:** First and last house are adjacent, so run linear House Robber twice: excluding the last, and excluding the first. Take the max.

**Complexity:** O(n) time, O(1) space.

```java
public int rob(int[] nums) {
    if (nums.length == 1) return nums[0];
    return Math.max(robLine(nums, 0, nums.length - 2),
                    robLine(nums, 1, nums.length - 1));
}

private int robLine(int[] nums, int lo, int hi) {
    int prev = 0, curr = 0;
    for (int i = lo; i <= hi; i++) {
        int next = Math.max(curr, prev + nums[i]);
        prev = curr;
        curr = next;
    }
    return curr;
}
```

### 14. Longest Increasing Subsequence — [LC 300](https://leetcode.com/problems/longest-increasing-subsequence/) · Medium

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/longest-increasing-subsequence)

**Approach:** Patience sorting. Keep a `tails` array where `tails[i]` is the smallest possible tail of an increasing subsequence of length `i+1`. Binary-search each number's insertion point.

**Complexity:** O(n log n) time.

```java
public int lengthOfLIS(int[] nums) {
    int[] tails = new int[nums.length];
    int size = 0;
    for (int num : nums) {
        int lo = 0, hi = size;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (tails[mid] < num) lo = mid + 1;
            else hi = mid;
        }
        tails[lo] = num;
        if (lo == size) size++;
    }
    return size;
}
```

### 15. Coin Change — [LC 322](https://leetcode.com/problems/coin-change/) · Medium

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/coin-change)

**Approach:** Unbounded knapsack. `dp[a] = min over coins of dp[a - coin] + 1`. Use `amount+1` as infinity to avoid overflow.

**Complexity:** O(amount × coins) time.

```java
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int a = 1; a <= amount; a++)
        for (int coin : coins)
            if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}
```

### 16. Edit Distance — [LC 72](https://leetcode.com/problems/edit-distance/) · Medium

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/edit-distance)

**Approach:** 2D DP. `dp[i][j]` = edits to turn `word1[0..i]` into `word2[0..j]`. If chars match, carry the diagonal; else 1 + min(insert, delete, replace).

**Complexity:** O(mn) time and space.

```java
public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1))
                dp[i][j] = dp[i - 1][j - 1];
            else
                dp[i][j] = 1 + Math.min(dp[i - 1][j - 1],
                              Math.min(dp[i - 1][j], dp[i][j - 1]));
        }
    }
    return dp[m][n];
}
```

### 17. Word Break — [LC 139](https://leetcode.com/problems/word-break/) · Medium

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/word-break)

**Approach:** `dp[i]` = can `s[0..i]` be segmented. For each `i`, check every split `j` where `dp[j]` is true and `s[j..i]` is in the dictionary.

**Complexity:** O(n²) time (× substring cost).

```java
public boolean wordBreak(String s, List<String> wordDict) {
    Set<String> words = new HashSet<>(wordDict);
    boolean[] dp = new boolean[s.length() + 1];
    dp[0] = true;
    for (int i = 1; i <= s.length(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && words.contains(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length()];
}
```

### 18. Maximum Subarray (Kadane's) — [LC 53](https://leetcode.com/problems/maximum-subarray/) · Medium

**Approach:** Track the best subarray ending here: either extend or restart. Keep a global max.

**Complexity:** O(n) time, O(1) space.

```java
public int maxSubArray(int[] nums) {
    int best = nums[0], curr = nums[0];
    for (int i = 1; i < nums.length; i++) {
        curr = Math.max(nums[i], curr + nums[i]);
        best = Math.max(best, curr);
    }
    return best;
}
```

### 19. Unique Paths — [LC 62](https://leetcode.com/problems/unique-paths/) · Medium

**Approach:** Grid DP with a rolling 1D row. Each cell = cell above + cell left.

**Complexity:** O(mn) time, O(n) space.

```java
public int uniquePaths(int m, int n) {
    int[] row = new int[n];
    Arrays.fill(row, 1);
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            row[j] += row[j - 1];
    return row[n - 1];
}
```

### 20. Minimum Path Sum — [LC 64](https://leetcode.com/problems/minimum-path-sum/) · Medium

**Approach:** Grid DP in place. Each cell adds the min of the reachable neighbor above or left.

**Complexity:** O(mn) time, O(1) extra.

```java
public int minPathSum(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 && j == 0) continue;
            int up = i > 0 ? grid[i - 1][j] : Integer.MAX_VALUE;
            int left = j > 0 ? grid[i][j - 1] : Integer.MAX_VALUE;
            grid[i][j] += Math.min(up, left);
        }
    }
    return grid[m - 1][n - 1];
}
```

### 21. Maximal Square — [LC 221](https://leetcode.com/problems/maximal-square/) · Medium

**Approach:** `dp[i][j]` = side of the largest all-1 square ending at (i,j) = `1 + min(top, left, top-left)` when the cell is '1'.

**Complexity:** O(mn) time.

```java
public int maximalSquare(char[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    int[][] dp = new int[m + 1][n + 1];
    int best = 0;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (matrix[i - 1][j - 1] == '1') {
                dp[i][j] = 1 + Math.min(dp[i - 1][j - 1],
                              Math.min(dp[i - 1][j], dp[i][j - 1]));
                best = Math.max(best, dp[i][j]);
            }
        }
    }
    return best * best;
}
```

### 22. Jump Game — [LC 55](https://leetcode.com/problems/jump-game/) · Medium

**Approach:** Greedy. Track the farthest reachable index; if you ever stand beyond it, fail.

**Complexity:** O(n) time.

```java
public boolean canJump(int[] nums) {
    int farthest = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > farthest) return false;
        farthest = Math.max(farthest, i + nums[i]);
    }
    return true;
}
```

### 23. Longest Palindromic Substring — [LC 5](https://leetcode.com/problems/longest-palindromic-substring/) · Medium

**Approach:** Expand around each center (2n-1 centers for odd and even lengths).

**Complexity:** O(n²) time, O(1) space.

```java
public String longestPalindrome(String s) {
    if (s.length() < 2) return s;
    int start = 0, maxLen = 1;
    for (int i = 0; i < s.length(); i++) {
        int len = Math.max(expand(s, i, i), expand(s, i, i + 1));
        if (len > maxLen) {
            maxLen = len;
            start = i - (len - 1) / 2;
        }
    }
    return s.substring(start, start + maxLen);
}

private int expand(String s, int left, int right) {
    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
        left--; right++;
    }
    return right - left - 1;
}
```

---

## Graphs / BFS / DFS

### 24. Number of Islands — [LC 200](https://leetcode.com/problems/number-of-islands/) · Medium

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/number-of-islands)

**Approach:** Scan the grid; on each unvisited '1', DFS-sink the whole island and count once.

**Complexity:** O(mn) time.

```java
public int numIslands(char[][] grid) {
    int count = 0;
    for (int i = 0; i < grid.length; i++)
        for (int j = 0; j < grid[0].length; j++)
            if (grid[i][j] == '1') { sink(grid, i, j); count++; }
    return count;
}

private void sink(char[][] grid, int i, int j) {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] != '1') return;
    grid[i][j] = '0';
    sink(grid, i + 1, j);
    sink(grid, i - 1, j);
    sink(grid, i, j + 1);
    sink(grid, i, j - 1);
}
```

### 25. Course Schedule — [LC 207](https://leetcode.com/problems/course-schedule/) · Medium

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/course-schedule)

**Approach:** Detect a cycle in a directed graph via Kahn's topological sort. If all nodes get processed, no cycle → schedulable.

**Complexity:** O(V + E) time.

```java
public boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    int[] indegree = new int[numCourses];
    for (int[] p : prerequisites) {
        adj.get(p[1]).add(p[0]);
        indegree[p[0]]++;
    }

    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) if (indegree[i] == 0) q.add(i);

    int done = 0;
    while (!q.isEmpty()) {
        int course = q.poll();
        done++;
        for (int next : adj.get(course))
            if (--indegree[next] == 0) q.add(next);
    }
    return done == numCourses;
}
```

### 26. Word Ladder — [LC 127](https://leetcode.com/problems/word-ladder/) · Hard

**Approach:** BFS over words; neighbors are words differing by one letter. Use a wildcard pattern map (`h*t`) to find neighbors in O(word length) rather than comparing all pairs.

**Complexity:** O(N · L²) time.

```java
public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    Set<String> dict = new HashSet<>(wordList);
    if (!dict.contains(endWord)) return 0;

    Queue<String> q = new LinkedList<>();
    q.add(beginWord);
    int steps = 1;

    while (!q.isEmpty()) {
        for (int size = q.size(); size > 0; size--) {
            String word = q.poll();
            if (word.equals(endWord)) return steps;
            char[] chars = word.toCharArray();
            for (int i = 0; i < chars.length; i++) {
                char original = chars[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    chars[i] = c;
                    String next = new String(chars);
                    if (dict.remove(next)) q.add(next);
                }
                chars[i] = original;
            }
        }
        steps++;
    }
    return 0;
}
```

### 27. Rotting Oranges — [LC 994](https://leetcode.com/problems/rotting-oranges/) · Medium

**Approach:** Multi-source BFS. Seed the queue with all rotten oranges, spread one minute per level, count fresh remaining.

**Complexity:** O(mn) time.

```java
public int orangesRotting(int[][] grid) {
    int m = grid.length, n = grid[0].length, fresh = 0;
    Queue<int[]> q = new LinkedList<>();
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 2) q.add(new int[]{i, j});
            else if (grid[i][j] == 1) fresh++;
        }
    if (fresh == 0) return 0;

    int minutes = 0;
    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    while (!q.isEmpty() && fresh > 0) {
        minutes++;
        for (int size = q.size(); size > 0; size--) {
            int[] cell = q.poll();
            for (int[] d : dirs) {
                int r = cell[0] + d[0], c = cell[1] + d[1];
                if (r >= 0 && c >= 0 && r < m && c < n && grid[r][c] == 1) {
                    grid[r][c] = 2;
                    fresh--;
                    q.add(new int[]{r, c});
                }
            }
        }
    }
    return fresh == 0 ? minutes : -1;
}
```

### 28. Number of Provinces — [LC 547](https://leetcode.com/problems/number-of-provinces/) · Medium

**Approach:** Count connected components in the adjacency matrix via DFS (or Union-Find).

**Complexity:** O(n²) time.

```java
public int findCircleNum(int[][] isConnected) {
    int n = isConnected.length;
    boolean[] visited = new boolean[n];
    int provinces = 0;
    for (int i = 0; i < n; i++)
        if (!visited[i]) { dfs(isConnected, visited, i); provinces++; }
    return provinces;
}

private void dfs(int[][] g, boolean[] visited, int i) {
    visited[i] = true;
    for (int j = 0; j < g.length; j++)
        if (g[i][j] == 1 && !visited[j]) dfs(g, visited, j);
}
```

### 29. Clone Graph — [LC 133](https://leetcode.com/problems/clone-graph/) · Medium

**Approach:** DFS with a map from original node to its clone. Create the clone on first visit, then wire neighbors recursively.

**Complexity:** O(V + E) time.

```java
private Map<Node, Node> clones = new HashMap<>();

public Node cloneGraph(Node node) {
    if (node == null) return null;
    if (clones.containsKey(node)) return clones.get(node);
    Node copy = new Node(node.val);
    clones.put(node, copy);
    for (Node nb : node.neighbors) copy.neighbors.add(cloneGraph(nb));
    return copy;
}
```

### 30. Shortest Path in Binary Matrix — [LC 1091](https://leetcode.com/problems/shortest-path-in-binary-matrix/) · Medium

**Approach:** BFS from top-left with 8-directional moves; first time we reach the bottom-right is the shortest path.

**Complexity:** O(n²) time.

```java
public int shortestPathBinaryMatrix(int[][] grid) {
    int n = grid.length;
    if (grid[0][0] == 1 || grid[n-1][n-1] == 1) return -1;

    Queue<int[]> q = new LinkedList<>();
    q.add(new int[]{0, 0});
    grid[0][0] = 1; // mark visited
    int path = 1;
    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};

    while (!q.isEmpty()) {
        for (int size = q.size(); size > 0; size--) {
            int[] cell = q.poll();
            if (cell[0] == n-1 && cell[1] == n-1) return path;
            for (int[] d : dirs) {
                int r = cell[0] + d[0], c = cell[1] + d[1];
                if (r >= 0 && c >= 0 && r < n && c < n && grid[r][c] == 0) {
                    grid[r][c] = 1;
                    q.add(new int[]{r, c});
                }
            }
        }
        path++;
    }
    return -1;
}
```

---

## Arrays / Strings / Hashing

### 31. Two Sum — [LC 1](https://leetcode.com/problems/two-sum/) · Easy

**Approach:** One-pass HashMap of value → index. For each number, check if its complement was already seen.

**Complexity:** O(n) time, O(n) space.

```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int need = target - nums[i];
        if (seen.containsKey(need)) return new int[]{seen.get(need), i};
        seen.put(nums[i], i);
    }
    return new int[]{-1, -1};
}
```

### 32. 3Sum — [LC 15](https://leetcode.com/problems/3sum/) · Medium

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/3sum)

**Approach:** Sort, fix each element, two-pointer the remainder for the complement. Skip duplicates at all three positions.

**Complexity:** O(n²) time.

```java
public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int lo = i + 1, hi = nums.length - 1;
        while (lo < hi) {
            int sum = nums[i] + nums[lo] + nums[hi];
            if (sum == 0) {
                res.add(Arrays.asList(nums[i], nums[lo], nums[hi]));
                while (lo < hi && nums[lo] == nums[lo + 1]) lo++;
                while (lo < hi && nums[hi] == nums[hi - 1]) hi--;
                lo++; hi--;
            } else if (sum < 0) lo++;
            else hi--;
        }
    }
    return res;
}
```

### 33. Trapping Rain Water — [LC 42](https://leetcode.com/problems/trapping-rain-water/) · Hard

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/trapping-rain-water)

**Approach:** Two pointers with running `leftMax`/`rightMax`. Water above a bar is `min(leftMax, rightMax) - height`. Advance the smaller side because its max is the binding constraint.

**Complexity:** O(n) time, O(1) space.

```java
public int trap(int[] height) {
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        } else {
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }
    return water;
}
```

### 34. Merge Intervals — [LC 56](https://leetcode.com/problems/merge-intervals/) · Medium

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/merge-intervals)

**Approach:** Sort by start. Walk through; if the next interval overlaps the last merged one, extend the end, else append.

**Complexity:** O(n log n) time.

```java
public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> merged = new ArrayList<>();
    for (int[] interval : intervals) {
        if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
            merged.add(interval);
        } else {
            merged.get(merged.size() - 1)[1] =
                Math.max(merged.get(merged.size() - 1)[1], interval[1]);
        }
    }
    return merged.toArray(new int[0][]);
}
```

### 35. Meeting Rooms II — [LC 253](https://leetcode.com/problems/meeting-rooms-ii/) · Medium

**Approach:** Min-heap of end times. Sort by start; if the earliest ending room is free before the next meeting starts, reuse it, else allocate a new room. Heap size = rooms needed.

**Complexity:** O(n log n) time.

```java
public int minMeetingRooms(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    PriorityQueue<Integer> ends = new PriorityQueue<>();
    for (int[] meeting : intervals) {
        if (!ends.isEmpty() && ends.peek() <= meeting[0]) ends.poll();
        ends.add(meeting[1]);
    }
    return ends.size();
}
```

### 36. Subarray Sum Equals K — [LC 560](https://leetcode.com/problems/subarray-sum-equals-k/) · Medium

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/subarray-sum-equals-k)

**Approach:** Prefix sums + HashMap. A subarray sums to k when `prefix - k` was seen before. Count occurrences of each prefix.

**Complexity:** O(n) time.

```java
public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    count.put(0, 1);
    int prefix = 0, result = 0;
    for (int num : nums) {
        prefix += num;
        result += count.getOrDefault(prefix - k, 0);
        count.merge(prefix, 1, Integer::sum);
    }
    return result;
}
```

### 37. Product of Array Except Self — [LC 238](https://leetcode.com/problems/product-of-array-except-self/) · Medium

**Approach:** Two sweeps. First pass stores prefix products; second pass multiplies by a running suffix product. No division.

**Complexity:** O(n) time, O(1) extra (output aside).

```java
public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    result[0] = 1;
    for (int i = 1; i < n; i++) result[i] = result[i - 1] * nums[i - 1];
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    return result;
}
```

### 38. Longest Substring Without Repeating Characters — [LC 3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) · Medium

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/longest-substring-without-repeating)

**Approach:** Sliding window with a last-seen index map. When a repeat inside the window appears, jump `left` past it.

**Complexity:** O(n) time.

```java
public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> last = new HashMap<>();
    int left = 0, best = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (last.containsKey(c) && last.get(c) >= left) left = last.get(c) + 1;
        last.put(c, right);
        best = Math.max(best, right - left + 1);
    }
    return best;
}
```

### 39. Group Anagrams — [LC 49](https://leetcode.com/problems/group-anagrams/) · Medium

**Approach:** Key each word by its sorted character signature; group into a map.

**Complexity:** O(n · k log k) time.

```java
public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> groups = new HashMap<>();
    for (String s : strs) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        groups.computeIfAbsent(new String(chars), x -> new ArrayList<>()).add(s);
    }
    return new ArrayList<>(groups.values());
}
```

### 40. Find the Duplicate Number — [LC 287](https://leetcode.com/problems/find-the-duplicate-number/) · Medium

**Approach:** Treat values as "next index" pointers; the duplicate is the entrance of a cycle. Floyd's tortoise and hare, O(1) space, no mutation.

**Complexity:** O(n) time, O(1) space.

```java
public int findDuplicate(int[] nums) {
    int slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);

    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}
```

### 41. Set Matrix Zeroes — [LC 73](https://leetcode.com/problems/set-matrix-zeroes/) · Medium

**Approach:** Use the first row and column as zero-flags to get O(1) space. Track separately whether the first row/column themselves need zeroing.

**Complexity:** O(mn) time, O(1) space.

```java
public void setZeroes(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    boolean firstRow = false, firstCol = false;
    for (int j = 0; j < n; j++) if (matrix[0][j] == 0) firstRow = true;
    for (int i = 0; i < m; i++) if (matrix[i][0] == 0) firstCol = true;

    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (matrix[i][j] == 0) { matrix[i][0] = 0; matrix[0][j] = 0; }

    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;

    if (firstRow) for (int j = 0; j < n; j++) matrix[0][j] = 0;
    if (firstCol) for (int i = 0; i < m; i++) matrix[i][0] = 0;
}
```

### 42. Spiral Matrix — [LC 54](https://leetcode.com/problems/spiral-matrix/) · Medium

**Approach:** Maintain four boundaries; peel off top row, right column, bottom row, left column, shrinking inward.

**Complexity:** O(mn) time.

```java
public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> res = new ArrayList<>();
    int top = 0, bottom = matrix.length - 1;
    int left = 0, right = matrix[0].length - 1;
    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++) res.add(matrix[top][j]);
        top++;
        for (int i = top; i <= bottom; i++) res.add(matrix[i][right]);
        right--;
        if (top <= bottom) {
            for (int j = right; j >= left; j--) res.add(matrix[bottom][j]);
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) res.add(matrix[i][left]);
            left++;
        }
    }
    return res;
}
```

### 68. Maximum Product of Three Numbers — [LC 628](https://leetcode.com/problems/maximum-product-of-three-numbers/) · Easy

**Approach:** The answer is either the three largest, or the two smallest (possibly negative) times the largest. Track five extremes in one pass.

**Complexity:** O(n) time.

```java
public int maximumProduct(int[] nums) {
    int max1 = Integer.MIN_VALUE, max2 = Integer.MIN_VALUE, max3 = Integer.MIN_VALUE;
    int min1 = Integer.MAX_VALUE, min2 = Integer.MAX_VALUE;
    for (int n : nums) {
        if (n > max1) { max3 = max2; max2 = max1; max1 = n; }
        else if (n > max2) { max3 = max2; max2 = n; }
        else if (n > max3) max3 = n;
        if (n < min1) { min2 = min1; min1 = n; }
        else if (n < min2) min2 = n;
    }
    return Math.max(max1 * max2 * max3, min1 * min2 * max1);
}
```

### 69. Minimum Window Substring — [LC 76](https://leetcode.com/problems/minimum-window-substring/) · Hard

**Approach:** Sliding window with a need-count map. Expand right until all target chars are covered, then shrink left to minimize while still valid.

**Complexity:** O(n) time.

```java
public String minWindow(String s, String t) {
    int[] need = new int[128];
    for (char c : t.toCharArray()) need[c]++;
    int required = t.length(), left = 0, bestLen = Integer.MAX_VALUE, bestStart = 0;

    for (int right = 0; right < s.length(); right++) {
        if (need[s.charAt(right)]-- > 0) required--;
        while (required == 0) {
            if (right - left + 1 < bestLen) {
                bestLen = right - left + 1;
                bestStart = left;
            }
            if (need[s.charAt(left)]++ == 0) required++;
            left++;
        }
    }
    return bestLen == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLen);
}
```

### 70. Container With Most Water — [LC 11](https://leetcode.com/problems/container-with-most-water/) · Medium

**Approach:** Two pointers from both ends. Area is limited by the shorter wall, so move the shorter pointer inward hoping for a taller one.

**Complexity:** O(n) time.

```java
public int maxArea(int[] height) {
    int left = 0, right = height.length - 1, best = 0;
    while (left < right) {
        best = Math.max(best, Math.min(height[left], height[right]) * (right - left));
        if (height[left] < height[right]) left++;
        else right--;
    }
    return best;
}
```

---

## Binary Search

### 43. Search in Rotated Sorted Array — [LC 33](https://leetcode.com/problems/search-in-rotated-sorted-array/) · Medium

**Approach:** At each step one half is sorted. Check which half is sorted, decide if the target lies inside it, and discard the other half.

**Complexity:** O(log n) time.

```java
public int search(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        int mid = (lo + hi) >>> 1;
        if (nums[mid] == target) return mid;
        if (nums[lo] <= nums[mid]) { // left half sorted
            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {                     // right half sorted
            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}
```

### 44. Find Minimum in Rotated Sorted Array — [LC 153](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) · Medium

**Approach:** Binary search for the inflection point. If `mid` value exceeds the rightmost, the minimum is to the right; else it's at mid or left.

**Complexity:** O(log n) time.

```java
public int findMin(int[] nums) {
    int lo = 0, hi = nums.length - 1;
    while (lo < hi) {
        int mid = (lo + hi) >>> 1;
        if (nums[mid] > nums[hi]) lo = mid + 1;
        else hi = mid;
    }
    return nums[lo];
}
```

### 45. Koko Eating Bananas — [LC 875](https://leetcode.com/problems/koko-eating-bananas/) · Medium

**Approach:** Binary search on the answer (eating speed). For a candidate speed, compute hours needed; find the smallest speed that finishes within `h`.

**Complexity:** O(n log maxPile) time.

```java
public int minEatingSpeed(int[] piles, int h) {
    int lo = 1, hi = 0;
    for (int p : piles) hi = Math.max(hi, p);
    while (lo < hi) {
        int mid = (lo + hi) >>> 1;
        if (hoursNeeded(piles, mid) <= h) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

private long hoursNeeded(int[] piles, int speed) {
    long hours = 0;
    for (int p : piles) hours += (p + speed - 1) / speed; // ceil
    return hours;
}
```

### 46. Find Peak Element — [LC 162](https://leetcode.com/problems/find-peak-element/) · Medium

**Approach:** Binary search toward the higher neighbor; you always walk uphill and must hit a peak.

**Complexity:** O(log n) time.

```java
public int findPeakElement(int[] nums) {
    int lo = 0, hi = nums.length - 1;
    while (lo < hi) {
        int mid = (lo + hi) >>> 1;
        if (nums[mid] < nums[mid + 1]) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

### 47. Median of Two Sorted Arrays — [LC 4](https://leetcode.com/problems/median-of-two-sorted-arrays/) · Hard

**Approach:** Binary search the partition of the smaller array so that left halves of both arrays together form the lower half. Adjust until `maxLeft <= minRight` on both sides.

**Complexity:** O(log min(m,n)) time.

```java
public double findMedianSortedArrays(int[] a, int[] b) {
    if (a.length > b.length) return findMedianSortedArrays(b, a);
    int m = a.length, n = b.length, half = (m + n + 1) / 2;
    int lo = 0, hi = m;
    while (lo <= hi) {
        int i = (lo + hi) / 2;
        int j = half - i;
        int aLeft = i == 0 ? Integer.MIN_VALUE : a[i - 1];
        int aRight = i == m ? Integer.MAX_VALUE : a[i];
        int bLeft = j == 0 ? Integer.MIN_VALUE : b[j - 1];
        int bRight = j == n ? Integer.MAX_VALUE : b[j];

        if (aLeft <= bRight && bLeft <= aRight) {
            if ((m + n) % 2 == 1) return Math.max(aLeft, bLeft);
            return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2.0;
        } else if (aLeft > bRight) hi = i - 1;
        else lo = i + 1;
    }
    return 0.0;
}
```

---

## Stack

### 48. Valid Parentheses — [LC 20](https://leetcode.com/problems/valid-parentheses/) · Easy

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/valid-parentheses)

**Approach:** Push expected closing bracket on each open; on a close, it must match the top.

**Complexity:** O(n) time.

```java
public boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '[') stack.push(']');
        else if (c == '{') stack.push('}');
        else if (stack.isEmpty() || stack.pop() != c) return false;
    }
    return stack.isEmpty();
}
```

### 49. Largest Rectangle in Histogram — [LC 84](https://leetcode.com/problems/largest-rectangle-in-histogram/) · Hard

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/largest-rectangle-in-histogram)

**Approach:** Monotonic increasing stack of indices. When a shorter bar appears, pop and compute the area of each popped bar using the width between the new bar and the element now below it.

**Complexity:** O(n) time.

```java
public int largestRectangleArea(int[] heights) {
    Deque<Integer> stack = new ArrayDeque<>();
    int best = 0, n = heights.length;
    for (int i = 0; i <= n; i++) {
        int h = i == n ? 0 : heights[i];
        while (!stack.isEmpty() && heights[stack.peek()] >= h) {
            int height = heights[stack.pop()];
            int width = stack.isEmpty() ? i : i - stack.peek() - 1;
            best = Math.max(best, height * width);
        }
        stack.push(i);
    }
    return best;
}
```

### 50. Min Stack — [LC 155](https://leetcode.com/problems/min-stack/) · Medium

**Approach:** Store each element alongside the running minimum in a single stack of pairs, so `getMin` is O(1).

**Complexity:** O(1) per operation.

```java
class MinStack {
    private Deque<int[]> stack = new ArrayDeque<>(); // [value, minSoFar]

    public void push(int val) {
        int min = stack.isEmpty() ? val : Math.min(val, stack.peek()[1]);
        stack.push(new int[]{val, min});
    }
    public void pop() { stack.pop(); }
    public int top() { return stack.peek()[0]; }
    public int getMin() { return stack.peek()[1]; }
}
```

### 51. Daily Temperatures — [LC 739](https://leetcode.com/problems/daily-temperatures/) · Medium

**Approach:** Monotonic decreasing stack of indices. When a warmer day arrives, pop all colder days and record the day gap.

**Complexity:** O(n) time.

```java
public int[] dailyTemperatures(int[] temps) {
    int[] answer = new int[temps.length];
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 0; i < temps.length; i++) {
        while (!stack.isEmpty() && temps[i] > temps[stack.peek()]) {
            int prev = stack.pop();
            answer[prev] = i - prev;
        }
        stack.push(i);
    }
    return answer;
}
```

### 52. Next Greater Element I — [LC 496](https://leetcode.com/problems/next-greater-element-i/) · Easy

**Approach:** Precompute next-greater for every value in nums2 with a monotonic stack into a map, then look up nums1.

**Complexity:** O(n + m) time.

```java
public int[] nextGreaterElement(int[] nums1, int[] nums2) {
    Map<Integer, Integer> nextGreater = new HashMap<>();
    Deque<Integer> stack = new ArrayDeque<>();
    for (int num : nums2) {
        while (!stack.isEmpty() && num > stack.peek())
            nextGreater.put(stack.pop(), num);
        stack.push(num);
    }
    int[] res = new int[nums1.length];
    for (int i = 0; i < nums1.length; i++)
        res[i] = nextGreater.getOrDefault(nums1[i], -1);
    return res;
}
```

---

## Linked List

### 53. LRU Cache — [LC 146](https://leetcode.com/problems/lru-cache/) · Medium

**Approach:** HashMap for O(1) lookup + doubly linked list for O(1) recency updates. Head = most recent, tail = eviction end. (Machine-coding round favorite.)

**Complexity:** O(1) per operation.

```java
class LRUCache {
    private class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }

    private final int capacity;
    private final Map<Integer, Node> map = new HashMap<>();
    private final Node head = new Node(0, 0), tail = new Node(0, 0);

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insertFront(node);
        return node.val;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) remove(map.get(key));
        Node node = new Node(key, value);
        map.put(key, node);
        insertFront(node);
        if (map.size() > capacity) {
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key);
        }
    }

    private void remove(Node n) {
        n.prev.next = n.next;
        n.next.prev = n.prev;
    }

    private void insertFront(Node n) {
        n.next = head.next;
        n.prev = head;
        head.next.prev = n;
        head.next = n;
    }
}
```

### 54. Reverse Linked List — [LC 206](https://leetcode.com/problems/reverse-linked-list/) · Easy

**Approach:** Iteratively flip each `next` pointer, tracking the previous node.

**Complexity:** O(n) time, O(1) space.

```java
public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    while (head != null) {
        ListNode next = head.next;
        head.next = prev;
        prev = head;
        head = next;
    }
    return prev;
}
```

### 55. Merge Two Sorted Lists — [LC 21](https://leetcode.com/problems/merge-two-sorted-lists/) · Easy

**Approach:** Dummy head; repeatedly append the smaller head. Attach the leftover tail at the end.

**Complexity:** O(n + m) time.

```java
public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0), tail = dummy;
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
        else { tail.next = l2; l2 = l2.next; }
        tail = tail.next;
    }
    tail.next = l1 != null ? l1 : l2;
    return dummy.next;
}
```

### 56. Linked List Cycle — [LC 141](https://leetcode.com/problems/linked-list-cycle/) · Easy

**Approach:** Floyd's tortoise and hare. If a fast pointer laps a slow one, there's a cycle.

**Complexity:** O(n) time, O(1) space.

```java
public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}
```

---

## Heap / Greedy

### 57. Kth Largest Element — [LC 215](https://leetcode.com/problems/kth-largest-element-in-an-array/) · Medium

**Approach:** Min-heap of size k. Keep only the k largest seen; the root is the answer. (QuickSelect gives O(n) average but the heap is cleaner to write.)

**Complexity:** O(n log k) time.

```java
public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> heap = new PriorityQueue<>();
    for (int num : nums) {
        heap.add(num);
        if (heap.size() > k) heap.poll();
    }
    return heap.peek();
}
```

### 58. Top K Frequent Elements — [LC 347](https://leetcode.com/problems/top-k-frequent-elements/) · Medium

**Approach:** Count frequencies, then bucket sort by frequency (index = count). Collect from the highest buckets down.

**Complexity:** O(n) time.

```java
public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int n : nums) count.merge(n, 1, Integer::sum);

    List<Integer>[] buckets = new List[nums.length + 1];
    for (var e : count.entrySet()) {
        int freq = e.getValue();
        if (buckets[freq] == null) buckets[freq] = new ArrayList<>();
        buckets[freq].add(e.getKey());
    }

    int[] res = new int[k];
    int idx = 0;
    for (int f = buckets.length - 1; f >= 0 && idx < k; f--) {
        if (buckets[f] == null) continue;
        for (int val : buckets[f]) {
            res[idx++] = val;
            if (idx == k) break;
        }
    }
    return res;
}
```

### 59. Merge K Sorted Lists — [LC 23](https://leetcode.com/problems/merge-k-sorted-lists/) · Hard

**Approach:** Min-heap of the current head of each list. Pop the smallest, append it, push its successor.

**Complexity:** O(N log k) time.

```java
public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> a.val - b.val);
    for (ListNode node : lists) if (node != null) heap.add(node);

    ListNode dummy = new ListNode(0), tail = dummy;
    while (!heap.isEmpty()) {
        ListNode smallest = heap.poll();
        tail.next = smallest;
        tail = tail.next;
        if (smallest.next != null) heap.add(smallest.next);
    }
    return dummy.next;
}
```

### 60. Task Scheduler — [LC 621](https://leetcode.com/problems/task-scheduler/) · Medium

**Approach:** The most frequent task defines the skeleton of idle slots. Compute frames from `maxCount` and fill gaps with other tasks; answer is `max(totalTasks, framework slots)`.

**Complexity:** O(n) time.

```java
public int leastInterval(char[] tasks, int n) {
    int[] freq = new int[26];
    for (char t : tasks) freq[t - 'A']++;
    int maxFreq = 0, maxCount = 0;
    for (int f : freq) {
        if (f > maxFreq) { maxFreq = f; maxCount = 1; }
        else if (f == maxFreq) maxCount++;
    }
    int slots = (maxFreq - 1) * (n + 1) + maxCount;
    return Math.max(slots, tasks.length);
}
```

---

## Backtracking

### 61. Word Search — [LC 79](https://leetcode.com/problems/word-search/) · Medium

**Approach:** DFS from each cell, matching one character at a time; mark the cell visited during recursion and restore it on backtrack.

**Complexity:** O(m·n·4^L) worst case.

```java
public boolean exist(char[][] board, String word) {
    for (int i = 0; i < board.length; i++)
        for (int j = 0; j < board[0].length; j++)
            if (dfs(board, word, i, j, 0)) return true;
    return false;
}

private boolean dfs(char[][] board, String word, int i, int j, int k) {
    if (k == word.length()) return true;
    if (i < 0 || j < 0 || i >= board.length || j >= board[0].length
            || board[i][j] != word.charAt(k)) return false;

    char temp = board[i][j];
    board[i][j] = '#'; // mark visited
    boolean found = dfs(board, word, i + 1, j, k + 1)
                 || dfs(board, word, i - 1, j, k + 1)
                 || dfs(board, word, i, j + 1, k + 1)
                 || dfs(board, word, i, j - 1, k + 1);
    board[i][j] = temp; // restore
    return found;
}
```

### 62. Combination Sum — [LC 39](https://leetcode.com/problems/combination-sum/) · Medium

**Approach:** DFS choosing candidates with reuse. Pass a `start` index to avoid permutations; subtract from remaining target.

**Complexity:** exponential in the number of combinations.

```java
public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(candidates, target, 0, new ArrayList<>(), res);
    return res;
}

private void backtrack(int[] candidates, int remain, int start,
                       List<Integer> path, List<List<Integer>> res) {
    if (remain == 0) { res.add(new ArrayList<>(path)); return; }
    if (remain < 0) return;
    for (int i = start; i < candidates.length; i++) {
        path.add(candidates[i]);
        backtrack(candidates, remain - candidates[i], i, path, res); // i, reuse allowed
        path.remove(path.size() - 1);
    }
}
```

### 63. Generate Parentheses — [LC 22](https://leetcode.com/problems/generate-parentheses/) · Medium

**Approach:** DFS tracking open and close counts. Add `(` while open < n; add `)` while close < open.

**Complexity:** O(4^n / √n) (Catalan) time.

```java
public List<String> generateParenthesis(int n) {
    List<String> res = new ArrayList<>();
    build(res, new StringBuilder(), 0, 0, n);
    return res;
}

private void build(List<String> res, StringBuilder sb, int open, int close, int n) {
    if (sb.length() == 2 * n) { res.add(sb.toString()); return; }
    if (open < n) { sb.append('('); build(res, sb, open + 1, close, n); sb.deleteCharAt(sb.length() - 1); }
    if (close < open) { sb.append(')'); build(res, sb, open, close + 1, n); sb.deleteCharAt(sb.length() - 1); }
}
```

---

## Union-Find

A reusable DSU with path compression and union by rank underpins all three problems below.

```java
class DSU {
    int[] parent, rank;
    int count;

    DSU(int n) {
        parent = new int[n];
        rank = new int[n];
        count = n;
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]]; // path compression
            x = parent[x];
        }
        return x;
    }

    boolean union(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;
        if (rank[ra] < rank[rb]) { int t = ra; ra = rb; rb = t; }
        parent[rb] = ra;
        if (rank[ra] == rank[rb]) rank[ra]++;
        count--;
        return true;
    }
}
```

### 64. Number of Connected Components — [LC 323](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/) · Medium

🔎 [Deep dive: full walkthrough with Java, Python & C++ →](/dsa/number-of-connected-components)

**Approach:** Union every edge; the remaining set count is the answer.

**Complexity:** O(E · α(n)) time.

```java
public int countComponents(int n, int[][] edges) {
    DSU dsu = new DSU(n);
    for (int[] e : edges) dsu.union(e[0], e[1]);
    return dsu.count;
}
```

### 65. Redundant Connection — [LC 684](https://leetcode.com/problems/redundant-connection/) · Medium

**Approach:** Add edges one by one; the first edge whose endpoints already share a root is the cycle-closing redundant edge.

**Complexity:** O(E · α(n)) time.

```java
public int[] findRedundantConnection(int[][] edges) {
    DSU dsu = new DSU(edges.length + 1);
    for (int[] e : edges)
        if (!dsu.union(e[0], e[1])) return e;
    return new int[0];
}
```

### 66. Accounts Merge — [LC 721](https://leetcode.com/problems/accounts-merge/) · Medium

**Approach:** Union accounts that share any email (map email → first owner index). Then group emails by their component root, sort, and prepend the name.

**Complexity:** O(N·K·α + sort) time.

```java
public List<List<String>> accountsMerge(List<List<String>> accounts) {
    DSU dsu = new DSU(accounts.size());
    Map<String, Integer> emailToId = new HashMap<>();

    for (int i = 0; i < accounts.size(); i++) {
        for (int j = 1; j < accounts.get(i).size(); j++) {
            String email = accounts.get(i).get(j);
            if (emailToId.containsKey(email)) dsu.union(i, emailToId.get(email));
            else emailToId.put(email, i);
        }
    }

    Map<Integer, TreeSet<String>> groups = new HashMap<>();
    for (var entry : emailToId.entrySet()) {
        int root = dsu.find(entry.getValue());
        groups.computeIfAbsent(root, x -> new TreeSet<>()).add(entry.getKey());
    }

    List<List<String>> res = new ArrayList<>();
    for (var entry : groups.entrySet()) {
        List<String> merged = new ArrayList<>();
        merged.add(accounts.get(entry.getKey()).get(0)); // name
        merged.addAll(entry.getValue());
        res.add(merged);
    }
    return res;
}
```

---

## PhonePe Custom Problems

These aren't direct LeetCode problems — they're reconstructed from PhonePe OA and interview reports. Treat the code as a reference implementation of the described pattern.

### C1. Maximize Minimum Distance in Seat Allocation (2024)

**Problem:** `n` seats in a row, some already occupied (1s). For each of `m` queries you must seat one new person at the position that maximizes the distance to the nearest occupied seat; ties break to the smaller index. Return the chosen seat per query.

**Approach:** Keep occupied positions in a `TreeSet`. For a query, scan gaps between consecutive occupied seats and the two ends; the best seat in a middle gap sits at its midpoint with value `gap/2`, and the ends give `firstOccupied` / `n-1-lastOccupied`. Pick the max, insert it, repeat. (For very large `m`, replace the scan with a max-heap of gaps keyed by achievable distance.)

**Complexity:** O(m · n) simple / O((n + m) log n) with a gap heap.

```java
public int[] allocateSeats(int n, int[] occupied, int m) {
    TreeSet<Integer> seats = new TreeSet<>();
    for (int s : occupied) seats.add(s);
    int[] result = new int[m];

    for (int q = 0; q < m; q++) {
        int bestSeat;
        if (seats.isEmpty()) {
            bestSeat = 0;                          // convention: first person sits at index 0
        } else {
            // start by assuming the far-left seat (index 0)
            bestSeat = 0;
            int bestDist = seats.first();          // distance from index 0 to nearest occupied
            // middle gaps: best seat is the midpoint, distance is gap/2
            Integer prev = null;
            for (int occ : seats) {
                if (prev != null) {
                    int gapMid = (prev + occ) / 2;
                    int dist = gapMid - prev;
                    if (dist > bestDist) { bestDist = dist; bestSeat = gapMid; }
                }
                prev = occ;
            }
            // far-right seat (index n-1)
            int rightDist = (n - 1) - seats.last();
            if (rightDist > bestDist) { bestSeat = n - 1; }
        }
        result[q] = bestSeat;
        seats.add(bestSeat);
    }
    return result;
}
```

### C2. Maximum Triple Product with Ordered Non-Decreasing Indices (2024)

**Problem:** Find indices `i < j < k` with `A[i] <= A[j] <= A[k]` maximizing `A[i] * A[j] * A[k]`. Return the max product, or -1 if no such triple exists.

**Approach:** Fix the middle element `j`. For the left we want the largest value `<= A[j]` (a `floorKey` query on a running sorted multiset). For the right we want the largest value that is `>= A[j]` — and the largest value on the right is always the best choice as long as it is `>= A[j]`, so we just track a suffix max and check it clears `A[j]`. Assumes non-negative values, per the reported constraints.

**Complexity:** O(n log n) time.

```java
public long maxOrderedTripleProduct(int[] a) {
    int n = a.length;
    if (n < 3) return -1;

    // suffixMax[j] = max of a[j..n-1]
    int[] suffixMax = new int[n];
    suffixMax[n - 1] = a[n - 1];
    for (int j = n - 2; j >= 0; j--) suffixMax[j] = Math.max(a[j], suffixMax[j + 1]);

    long best = -1;
    TreeMap<Integer, Integer> leftVals = new TreeMap<>(); // values strictly to the left of j
    for (int j = 0; j < n; j++) {
        // left choice: largest value <= a[j] seen so far
        Integer left = leftVals.floorKey(a[j]);
        // right choice: overall max to the right, valid only if it is >= a[j]
        int rightMax = j + 1 < n ? suffixMax[j + 1] : -1;
        if (left != null && rightMax >= a[j]) {
            best = Math.max(best, (long) left * a[j] * rightMax);
        }
        leftVals.merge(a[j], 1, Integer::sum);
    }
    return best;
}
```

### C3. Max Path Sum, n×2 Grid, Strictly Increasing (2021)

**Problem:** Given an `n × 2` grid, pick exactly one element per row starting at row 0, moving downward. The chosen values must be strictly increasing. Maximize the sum. Return -1 if impossible.

**Approach:** DP over two states per row: the best sum ending at column 0 vs column 1, given the last picked value. Since only two columns exist, carry `(value, sum)` for each and extend to the next row when strictly greater.

**Complexity:** O(n) time.

```java
public int maxStrictlyIncreasingPath(int[][] grid) {
    int n = grid.length;
    // dp0 = best sum ending at col 0 of current row; dp1 = col 1. Long.MIN means unreachable.
    long dp0 = grid[0][0], dp1 = grid[0][1];
    int prev0 = grid[0][0], prev1 = grid[0][1];

    for (int i = 1; i < n; i++) {
        long next0 = Long.MIN_VALUE, next1 = Long.MIN_VALUE;
        int cur0 = grid[i][0], cur1 = grid[i][1];
        // extend into col 0 (value cur0) from any previous cell strictly smaller
        if (dp0 != Long.MIN_VALUE && cur0 > prev0) next0 = Math.max(next0, dp0 + cur0);
        if (dp1 != Long.MIN_VALUE && cur0 > prev1) next0 = Math.max(next0, dp1 + cur0);
        if (dp0 != Long.MIN_VALUE && cur1 > prev0) next1 = Math.max(next1, dp0 + cur1);
        if (dp1 != Long.MIN_VALUE && cur1 > prev1) next1 = Math.max(next1, dp1 + cur1);
        dp0 = next0; dp1 = next1;
        prev0 = cur0; prev1 = cur1;
    }
    long best = Math.max(dp0, dp1);
    return best == Long.MIN_VALUE ? -1 : (int) best;
}
```

### C4. Minimum Moves to Convert String A to String B (2021)

**Problem:** Minimum single-character edits (insert / delete / replace) to turn `A` into `B`.

**Approach:** This is classic Edit Distance — see [problem 16](#16-edit-distance--lc-72--medium). Reuse that exact DP.

### C5. Maximize People Passing a Threshold Test (2022)

**Problem:** Score starts at 0. Process people in some order; a person passes if the current score `>` their threshold, and after passing, their `bound` is added to the score. Choose the order to maximize the number who pass.

**Approach:** Greedy by threshold ascending — always let the easiest-to-satisfy person go next, since passing only ever increases the score and never hurts a later person. Simulate.

**Complexity:** O(n log n) time.

```java
public int maxPassing(int[] threshold, int[] bound) {
    int n = threshold.length;
    Integer[] order = new Integer[n];
    for (int i = 0; i < n; i++) order[i] = i;
    Arrays.sort(order, (x, y) -> Integer.compare(threshold[x], threshold[y]));

    long score = 0;
    int passed = 0;
    for (int idx : order) {
        if (score > threshold[idx]) {
            passed++;
            score += bound[idx];
        }
    }
    return passed;
}
```

### C6. Max Path Sum in m×n Grid, Right/Down from Any Start (2022)

**Problem:** From any cell, moving only right or down, find the maximum reachable path sum.

**Approach:** DP from bottom-right. `dp[i][j] = grid[i][j] + max(dp[i+1][j], dp[i][j+1])`. The global max over all cells is the answer (any start).

**Complexity:** O(mn) time.

```java
public int maxPathAnyStart(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    int[][] dp = new int[m][n];
    int best = Integer.MIN_VALUE;
    for (int i = m - 1; i >= 0; i--) {
        for (int j = n - 1; j >= 0; j--) {
            int down = i + 1 < m ? dp[i + 1][j] : 0;
            int right = j + 1 < n ? dp[i][j + 1] : 0;
            dp[i][j] = grid[i][j] + Math.max(down, right);
            best = Math.max(best, dp[i][j]);
        }
    }
    return best;
}
```

### C7. Lexicographically Smallest Word from N×N Matrix with K Changes (2026)

**Problem:** Walk a path (right/down) through an N×N letter matrix from top-left to bottom-right; you may change at most `K` cells to any letter. Produce the lexicographically smallest resulting string of length `2N-1`.

**Approach:** DP / greedy over `(row, col, changesUsed)`. At each step prefer the move that yields the smaller next character, spending a change to force `'a'` only when it strictly helps and budget remains. Because both moves advance the same total length, compare the two candidate suffixes greedily; memoize on `(r, c, k)`.

**Complexity:** O(N² · K) states.

```java
// Greedy-DP sketch: at each cell choose the move whose resulting character
// (after optionally spending a change to make it 'a') is smaller; break ties
// by recursing. Memoize best suffix per (r, c, k).
public String smallestPath(char[][] grid, int k) {
    int n = grid.length;
    Map<String, String> memo = new HashMap<>();
    return solve(grid, 0, 0, k, memo);
}

private String solve(char[][] g, int r, int c, int k, Map<String, String> memo) {
    int n = g.length;
    String key = r + "," + c + "," + k;
    if (memo.containsKey(key)) return memo.get(key);

    char cur = g[r][c];
    char used = cur;
    int kLeft = k;
    if (k > 0 && cur != 'a') { used = 'a'; kLeft = k - 1; }

    String result;
    if (r == n - 1 && c == n - 1) {
        result = String.valueOf(used);
    } else {
        String down = r + 1 < n ? solve(g, r + 1, c, kLeft, memo) : null;
        String right = c + 1 < n ? solve(g, r, c + 1, kLeft, memo) : null;
        String rest = down == null ? right
                    : right == null ? down
                    : (down.compareTo(right) <= 0 ? down : right);
        result = used + rest;
    }
    memo.put(key, result);
    return result;
}
```

> This greedy-first sketch captures the intent; a fully rigorous solution compares the "spend a change here" branch against "save it for later" by exploring both and keeping the smaller string, which the memo on `(r, c, k)` makes tractable.

### C8. Balance Coins in a Binary Tree (2026)

**Problem:** Every node has some coins; total coins equal total nodes. In one move you shift a coin between adjacent nodes. Minimize moves so each node ends with exactly one coin.

**Approach:** Identical to [Distribute Coins in Binary Tree, LC 979](#67-distribute-coins-in-binary-tree--lc-979--medium). Each edge carries `abs(subtreeBalance)` coins; sum those.

---

## Wrap-Up

That's every problem from the PhonePe list solved. A few patterns cover the majority:

- **Tree DFS returning a tuple** — House Robber III, Max Path Sum, Diameter, Distribute Coins.
- **Grid / linear DP** — Coin Change, Edit Distance, the custom path-sum problems.
- **Sliding window + prefix hashing** — Longest Substring, Subarray Sum K, Min Window.
- **Monotonic stack** — Histogram, Daily Temperatures, Next Greater.
- **Union-Find** — the trending 2025-2026 category; learn the one DSU class and reuse it.

For interview delivery, PhonePe grades progression (brute → optimized) and clean code. State the brute force, explain why it's slow, then write the optimized version with clear names — exactly the structure above.

---

*More company-specific solution sets coming. Spot a bug or want a deeper walkthrough on any problem? Drop a comment below 👇*

- [← Back to PhonePe Prep](/companies/phonpe)
- [All DSA Problems](/dsa/)
