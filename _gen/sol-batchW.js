// Batch W: known-correct solutions for batch 20 (binary tree / BST).
// Python & JS use nested functions; C++ uses std::function lambdas; Java uses
// instance fields + a helper method whose final brace is supplied by the stub.
const SOL = {
  'sum-root-to-leaf-numbers': {
    python: `        def dfs(node, cur):
            if not node: return 0
            cur = cur * 10 + node.val
            if not node.left and not node.right: return cur
            return dfs(node.left, cur) + dfs(node.right, cur)
        return dfs(root, 0)`,
    javascript: `    const dfs = (node, cur) => {
        if (!node) return 0;
        cur = cur * 10 + node.val;
        if (!node.left && !node.right) return cur;
        return dfs(node.left, cur) + dfs(node.right, cur);
    };
    return dfs(root, 0);`,
    cpp: `        function<int(TreeNode*,int)> dfs = [&](TreeNode* node, int cur) -> int {
            if (!node) return 0;
            cur = cur * 10 + node->val;
            if (!node->left && !node->right) return cur;
            return dfs(node->left, cur) + dfs(node->right, cur);
        };
        return dfs(root, 0);`,
    java: `        return dfs(root, 0);
    }
    private int dfs(TreeNode node, int cur) {
        if (node == null) return 0;
        cur = cur * 10 + node.val;
        if (node.left == null && node.right == null) return cur;
        return dfs(node.left, cur) + dfs(node.right, cur);`,
  },
  'sum-of-root-to-leaf-binary-numbers': {
    python: `        def dfs(node, cur):
            if not node: return 0
            cur = cur * 2 + node.val
            if not node.left and not node.right: return cur
            return dfs(node.left, cur) + dfs(node.right, cur)
        return dfs(root, 0)`,
    javascript: `    const dfs = (node, cur) => {
        if (!node) return 0;
        cur = cur * 2 + node.val;
        if (!node.left && !node.right) return cur;
        return dfs(node.left, cur) + dfs(node.right, cur);
    };
    return dfs(root, 0);`,
    cpp: `        function<int(TreeNode*,int)> dfs = [&](TreeNode* node, int cur) -> int {
            if (!node) return 0;
            cur = cur * 2 + node->val;
            if (!node->left && !node->right) return cur;
            return dfs(node->left, cur) + dfs(node->right, cur);
        };
        return dfs(root, 0);`,
    java: `        return dfs(root, 0);
    }
    private int dfs(TreeNode node, int cur) {
        if (node == null) return 0;
        cur = cur * 2 + node.val;
        if (node.left == null && node.right == null) return cur;
        return dfs(node.left, cur) + dfs(node.right, cur);`,
  },
  'deepest-leaves-sum': {
    python: `        from collections import deque
        q = deque([root]); s = 0
        while q:
            s = 0
            for _ in range(len(q)):
                n = q.popleft(); s += n.val
                if n.left: q.append(n.left)
                if n.right: q.append(n.right)
        return s`,
    javascript: `    let q = [root], s = 0;
    while (q.length) {
        const nq = []; s = 0;
        for (const n of q) { s += n.val; if (n.left) nq.push(n.left); if (n.right) nq.push(n.right); }
        q = nq;
    }
    return s;`,
    cpp: `        queue<TreeNode*> q; q.push(root); int s = 0;
        while (!q.empty()) {
            int sz = q.size(); s = 0;
            for (int i = 0; i < sz; i++) {
                TreeNode* n = q.front(); q.pop(); s += n->val;
                if (n->left) q.push(n->left);
                if (n->right) q.push(n->right);
            }
        }
        return s;`,
    java: `        Queue<TreeNode> q = new LinkedList<>(); q.add(root); int s = 0;
        while (!q.isEmpty()) {
            int sz = q.size(); s = 0;
            for (int i = 0; i < sz; i++) {
                TreeNode n = q.poll(); s += n.val;
                if (n.left != null) q.add(n.left);
                if (n.right != null) q.add(n.right);
            }
        }
        return s;`,
  },
  'sum-of-nodes-with-even-valued-grandparent': {
    python: `        def dfs(node, p, g):
            if not node: return 0
            s = node.val if (g and g.val % 2 == 0) else 0
            return s + dfs(node.left, node, p) + dfs(node.right, node, p)
        return dfs(root, None, None)`,
    javascript: `    const dfs = (node, p, g) => {
        if (!node) return 0;
        const s = (g && g.val % 2 === 0) ? node.val : 0;
        return s + dfs(node.left, node, p) + dfs(node.right, node, p);
    };
    return dfs(root, null, null);`,
    cpp: `        function<int(TreeNode*,TreeNode*,TreeNode*)> dfs = [&](TreeNode* node, TreeNode* p, TreeNode* g) -> int {
            if (!node) return 0;
            int s = (g && g->val % 2 == 0) ? node->val : 0;
            return s + dfs(node->left, node, p) + dfs(node->right, node, p);
        };
        return dfs(root, nullptr, nullptr);`,
    java: `        return dfs(root, null, null);
    }
    private int dfs(TreeNode node, TreeNode p, TreeNode g) {
        if (node == null) return 0;
        int s = (g != null && g.val % 2 == 0) ? node.val : 0;
        return s + dfs(node.left, node, p) + dfs(node.right, node, p);`,
  },
  'binary-tree-tilt': {
    python: `        self.total = 0
        def dfs(node):
            if not node: return 0
            l = dfs(node.left); r = dfs(node.right)
            self.total += abs(l - r)
            return node.val + l + r
        dfs(root)
        return self.total`,
    javascript: `    let total = 0;
    const dfs = (node) => {
        if (!node) return 0;
        const l = dfs(node.left), r = dfs(node.right);
        total += Math.abs(l - r);
        return node.val + l + r;
    };
    dfs(root);
    return total;`,
    cpp: `        int total = 0;
        function<int(TreeNode*)> dfs = [&](TreeNode* node) -> int {
            if (!node) return 0;
            int l = dfs(node->left), r = dfs(node->right);
            total += abs(l - r);
            return node->val + l + r;
        };
        dfs(root);
        return total;`,
    java: `        total = 0;
        dfs(root);
        return total;
    }
    int total;
    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int l = dfs(node.left), r = dfs(node.right);
        total += Math.abs(l - r);
        return node.val + l + r;`,
  },
  'maximum-width-of-binary-tree': {
    python: `        if not root: return 0
        best = 0; q = [(root, 0)]
        while q:
            first = q[0][1]; best = max(best, q[-1][1] - first + 1); nq = []
            for node, idx in q:
                p = idx - first
                if node.left: nq.append((node.left, p * 2))
                if node.right: nq.append((node.right, p * 2 + 1))
            q = nq
        return best`,
    javascript: `    if (!root) return 0;
    let best = 0, q = [[root, 0]];
    while (q.length) {
        const first = q[0][1];
        best = Math.max(best, q[q.length - 1][1] - first + 1);
        const nq = [];
        for (const [node, idx] of q) {
            const p = idx - first;
            if (node.left) nq.push([node.left, p * 2]);
            if (node.right) nq.push([node.right, p * 2 + 1]);
        }
        q = nq;
    }
    return best;`,
    cpp: `        if (!root) return 0;
        int best = 0;
        vector<pair<TreeNode*,long long>> q = {{root, 0}};
        while (!q.empty()) {
            long long first = q[0].second;
            best = max(best, (int)(q.back().second - first + 1));
            vector<pair<TreeNode*,long long>> nq;
            for (auto& pr : q) {
                long long p = pr.second - first;
                if (pr.first->left) nq.push_back({pr.first->left, p * 2});
                if (pr.first->right) nq.push_back({pr.first->right, p * 2 + 1});
            }
            q = nq;
        }
        return best;`,
    java: `        if (root == null) return 0;
        int best = 0;
        List<TreeNode> q = new ArrayList<>(); List<Long> idx = new ArrayList<>();
        q.add(root); idx.add(0L);
        while (!q.isEmpty()) {
            long first = idx.get(0);
            best = Math.max(best, (int)(idx.get(idx.size() - 1) - first + 1));
            List<TreeNode> nq = new ArrayList<>(); List<Long> ni = new ArrayList<>();
            for (int i = 0; i < q.size(); i++) {
                long p = idx.get(i) - first;
                TreeNode node = q.get(i);
                if (node.left != null) { nq.add(node.left); ni.add(p * 2); }
                if (node.right != null) { nq.add(node.right); ni.add(p * 2 + 1); }
            }
            q = nq; idx = ni;
        }
        return best;`,
  },
  'house-robber-iii': {
    python: `        def dfs(node):
            if not node: return (0, 0)
            l = dfs(node.left); r = dfs(node.right)
            take = node.val + l[1] + r[1]
            skip = max(l) + max(r)
            return (take, skip)
        return max(dfs(root))`,
    javascript: `    const dfs = (node) => {
        if (!node) return [0, 0];
        const l = dfs(node.left), r = dfs(node.right);
        const take = node.val + l[1] + r[1];
        const skip = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);
        return [take, skip];
    };
    const res = dfs(root);
    return Math.max(res[0], res[1]);`,
    cpp: `        function<pair<int,int>(TreeNode*)> dfs = [&](TreeNode* node) -> pair<int,int> {
            if (!node) return {0, 0};
            auto l = dfs(node->left); auto r = dfs(node->right);
            int take = node->val + l.second + r.second;
            int skip = max(l.first, l.second) + max(r.first, r.second);
            return {take, skip};
        };
        auto res = dfs(root);
        return max(res.first, res.second);`,
    java: `        int[] res = dfs(root);
        return Math.max(res[0], res[1]);
    }
    private int[] dfs(TreeNode node) {
        if (node == null) return new int[]{0, 0};
        int[] l = dfs(node.left), r = dfs(node.right);
        int take = node.val + l[1] + r[1];
        int skip = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);
        return new int[]{take, skip};`,
  },
  'longest-univalue-path': {
    python: `        self.best = 0
        def dfs(node):
            if not node: return 0
            l = dfs(node.left); r = dfs(node.right)
            lp = l + 1 if node.left and node.left.val == node.val else 0
            rp = r + 1 if node.right and node.right.val == node.val else 0
            self.best = max(self.best, lp + rp)
            return max(lp, rp)
        dfs(root)
        return self.best`,
    javascript: `    let best = 0;
    const dfs = (node) => {
        if (!node) return 0;
        const l = dfs(node.left), r = dfs(node.right);
        const lp = (node.left && node.left.val === node.val) ? l + 1 : 0;
        const rp = (node.right && node.right.val === node.val) ? r + 1 : 0;
        best = Math.max(best, lp + rp);
        return Math.max(lp, rp);
    };
    dfs(root);
    return best;`,
    cpp: `        int best = 0;
        function<int(TreeNode*)> dfs = [&](TreeNode* node) -> int {
            if (!node) return 0;
            int l = dfs(node->left), r = dfs(node->right);
            int lp = (node->left && node->left->val == node->val) ? l + 1 : 0;
            int rp = (node->right && node->right->val == node->val) ? r + 1 : 0;
            best = max(best, lp + rp);
            return max(lp, rp);
        };
        dfs(root);
        return best;`,
    java: `        best = 0;
        dfs(root);
        return best;
    }
    int best;
    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int l = dfs(node.left), r = dfs(node.right);
        int lp = (node.left != null && node.left.val == node.val) ? l + 1 : 0;
        int rp = (node.right != null && node.right.val == node.val) ? r + 1 : 0;
        best = Math.max(best, lp + rp);
        return Math.max(lp, rp);`,
  },
  'count-nodes-equal-to-average-of-subtree': {
    python: `        self.cnt = 0
        def dfs(node):
            if not node: return (0, 0)
            ls, lc = dfs(node.left); rs, rc = dfs(node.right)
            s = ls + rs + node.val; c = lc + rc + 1
            if s // c == node.val: self.cnt += 1
            return (s, c)
        dfs(root)
        return self.cnt`,
    javascript: `    let cnt = 0;
    const dfs = (node) => {
        if (!node) return [0, 0];
        const l = dfs(node.left), r = dfs(node.right);
        const s = l[0] + r[0] + node.val, c = l[1] + r[1] + 1;
        if (Math.floor(s / c) === node.val) cnt++;
        return [s, c];
    };
    dfs(root);
    return cnt;`,
    cpp: `        int cnt = 0;
        function<pair<int,int>(TreeNode*)> dfs = [&](TreeNode* node) -> pair<int,int> {
            if (!node) return {0, 0};
            auto l = dfs(node->left); auto r = dfs(node->right);
            int s = l.first + r.first + node->val, c = l.second + r.second + 1;
            if (s / c == node->val) cnt++;
            return {s, c};
        };
        dfs(root);
        return cnt;`,
    java: `        cnt = 0;
        dfs(root);
        return cnt;
    }
    int cnt;
    private int[] dfs(TreeNode node) {
        if (node == null) return new int[]{0, 0};
        int[] l = dfs(node.left), r = dfs(node.right);
        int s = l[0] + r[0] + node.val, c = l[1] + r[1] + 1;
        if (s / c == node.val) cnt++;
        return new int[]{s, c};`,
  },
  'find-bottom-left-tree-value': {
    python: `        from collections import deque
        q = deque([root]); res = root.val
        while q:
            res = q[0].val
            for _ in range(len(q)):
                n = q.popleft()
                if n.left: q.append(n.left)
                if n.right: q.append(n.right)
        return res`,
    javascript: `    let q = [root], res = root.val;
    while (q.length) {
        res = q[0].val;
        const nq = [];
        for (const n of q) { if (n.left) nq.push(n.left); if (n.right) nq.push(n.right); }
        q = nq;
    }
    return res;`,
    cpp: `        queue<TreeNode*> q; q.push(root); int res = root->val;
        while (!q.empty()) {
            int sz = q.size(); res = q.front()->val;
            for (int i = 0; i < sz; i++) {
                TreeNode* n = q.front(); q.pop();
                if (n->left) q.push(n->left);
                if (n->right) q.push(n->right);
            }
        }
        return res;`,
    java: `        Queue<TreeNode> q = new LinkedList<>(); q.add(root); int res = root.val;
        while (!q.isEmpty()) {
            int sz = q.size(); res = q.peek().val;
            for (int i = 0; i < sz; i++) {
                TreeNode n = q.poll();
                if (n.left != null) q.add(n.left);
                if (n.right != null) q.add(n.right);
            }
        }
        return res;`,
  },
  'pseudo-palindromic-paths-in-a-binary-tree': {
    python: `        self.cnt = 0
        def dfs(node, mask):
            if not node: return
            mask ^= (1 << node.val)
            if not node.left and not node.right:
                if (mask & (mask - 1)) == 0: self.cnt += 1
                return
            dfs(node.left, mask); dfs(node.right, mask)
        dfs(root, 0)
        return self.cnt`,
    javascript: `    let cnt = 0;
    const dfs = (node, mask) => {
        if (!node) return;
        mask ^= (1 << node.val);
        if (!node.left && !node.right) {
            if ((mask & (mask - 1)) === 0) cnt++;
            return;
        }
        dfs(node.left, mask); dfs(node.right, mask);
    };
    dfs(root, 0);
    return cnt;`,
    cpp: `        int cnt = 0;
        function<void(TreeNode*,int)> dfs = [&](TreeNode* node, int mask) {
            if (!node) return;
            mask ^= (1 << node->val);
            if (!node->left && !node->right) {
                if ((mask & (mask - 1)) == 0) cnt++;
                return;
            }
            dfs(node->left, mask); dfs(node->right, mask);
        };
        dfs(root, 0);
        return cnt;`,
    java: `        cnt = 0;
        dfs(root, 0);
        return cnt;
    }
    int cnt;
    private void dfs(TreeNode node, int mask) {
        if (node == null) return;
        mask ^= (1 << node.val);
        if (node.left == null && node.right == null) {
            if ((mask & (mask - 1)) == 0) cnt++;
            return;
        }
        dfs(node.left, mask); dfs(node.right, mask);`,
  },
  'path-sum-iii': {
    python: `        from collections import defaultdict
        cnt = defaultdict(int); cnt[0] = 1
        self.total = 0
        def dfs(node, cur):
            if not node: return
            cur += node.val
            self.total += cnt[cur - k]
            cnt[cur] += 1
            dfs(node.left, cur); dfs(node.right, cur)
            cnt[cur] -= 1
        dfs(root, 0)
        return self.total`,
    javascript: `    const cnt = new Map(); cnt.set(0, 1);
    let total = 0;
    const dfs = (node, cur) => {
        if (!node) return;
        cur += node.val;
        total += (cnt.get(cur - k) || 0);
        cnt.set(cur, (cnt.get(cur) || 0) + 1);
        dfs(node.left, cur); dfs(node.right, cur);
        cnt.set(cur, cnt.get(cur) - 1);
    };
    dfs(root, 0);
    return total;`,
    cpp: `        unordered_map<long long,int> cnt; cnt[0] = 1;
        int total = 0;
        function<void(TreeNode*,long long)> dfs = [&](TreeNode* node, long long cur) {
            if (!node) return;
            cur += node->val;
            total += cnt.count(cur - k) ? cnt[cur - k] : 0;
            cnt[cur]++;
            dfs(node->left, cur); dfs(node->right, cur);
            cnt[cur]--;
        };
        dfs(root, 0);
        return total;`,
    java: `        map.clear(); map.put(0L, 1);
        total = 0; K = k;
        dfs(root, 0L);
        return total;
    }
    Map<Long,Integer> map = new HashMap<>();
    int total; int K;
    private void dfs(TreeNode node, long cur) {
        if (node == null) return;
        cur += node.val;
        total += map.getOrDefault(cur - K, 0);
        map.put(cur, map.getOrDefault(cur, 0) + 1);
        dfs(node.left, cur); dfs(node.right, cur);
        map.put(cur, map.get(cur) - 1);`,
  },
  'univalued-binary-tree': {
    python: `        def dfs(node):
            if not node: return True
            if node.val != root.val: return False
            return dfs(node.left) and dfs(node.right)
        return dfs(root)`,
    javascript: `    const dfs = (node) => {
        if (!node) return true;
        if (node.val !== root.val) return false;
        return dfs(node.left) && dfs(node.right);
    };
    return dfs(root);`,
    cpp: `        int rv = root->val;
        function<bool(TreeNode*)> dfs = [&](TreeNode* node) -> bool {
            if (!node) return true;
            if (node->val != rv) return false;
            return dfs(node->left) && dfs(node->right);
        };
        return dfs(root);`,
    java: `        rootVal = root.val;
        return dfs(root);
    }
    int rootVal;
    private boolean dfs(TreeNode node) {
        if (node == null) return true;
        if (node.val != rootVal) return false;
        return dfs(node.left) && dfs(node.right);`,
  },
  'even-odd-tree': {
    python: `        from collections import deque
        q = deque([root]); level = 0
        while q:
            prev = None
            for _ in range(len(q)):
                n = q.popleft(); v = n.val
                if level % 2 == 0:
                    if v % 2 == 0 or (prev is not None and v <= prev): return False
                else:
                    if v % 2 == 1 or (prev is not None and v >= prev): return False
                prev = v
                if n.left: q.append(n.left)
                if n.right: q.append(n.right)
            level += 1
        return True`,
    javascript: `    let q = [root], level = 0;
    while (q.length) {
        let prev = null;
        const nq = [];
        for (const n of q) {
            const v = n.val;
            if (level % 2 === 0) {
                if (v % 2 === 0 || (prev !== null && v <= prev)) return false;
            } else {
                if (v % 2 === 1 || (prev !== null && v >= prev)) return false;
            }
            prev = v;
            if (n.left) nq.push(n.left);
            if (n.right) nq.push(n.right);
        }
        q = nq; level++;
    }
    return true;`,
    cpp: `        queue<TreeNode*> q; q.push(root); int level = 0;
        while (!q.empty()) {
            int sz = q.size(); bool has = false; int prev = 0;
            for (int i = 0; i < sz; i++) {
                TreeNode* n = q.front(); q.pop(); int v = n->val;
                if (level % 2 == 0) {
                    if (v % 2 == 0 || (has && v <= prev)) return false;
                } else {
                    if (v % 2 == 1 || (has && v >= prev)) return false;
                }
                prev = v; has = true;
                if (n->left) q.push(n->left);
                if (n->right) q.push(n->right);
            }
            level++;
        }
        return true;`,
    java: `        Queue<TreeNode> q = new LinkedList<>(); q.add(root); int level = 0;
        while (!q.isEmpty()) {
            int sz = q.size(); boolean has = false; int prev = 0;
            for (int i = 0; i < sz; i++) {
                TreeNode n = q.poll(); int v = n.val;
                if (level % 2 == 0) {
                    if (v % 2 == 0 || (has && v <= prev)) return false;
                } else {
                    if (v % 2 == 1 || (has && v >= prev)) return false;
                }
                prev = v; has = true;
                if (n.left != null) q.add(n.left);
                if (n.right != null) q.add(n.right);
            }
            level++;
        }
        return true;`,
  },
  'find-largest-value-in-each-tree-row': {
    python: `        if not root: return []
        from collections import deque
        q = deque([root]); res = []
        while q:
            mx = float("-inf")
            for _ in range(len(q)):
                n = q.popleft(); mx = max(mx, n.val)
                if n.left: q.append(n.left)
                if n.right: q.append(n.right)
            res.append(mx)
        return res`,
    javascript: `    if (!root) return [];
    let q = [root]; const res = [];
    while (q.length) {
        let mx = -Infinity;
        const nq = [];
        for (const n of q) { mx = Math.max(mx, n.val); if (n.left) nq.push(n.left); if (n.right) nq.push(n.right); }
        res.push(mx);
        q = nq;
    }
    return res;`,
    cpp: `        vector<int> res;
        if (!root) return res;
        queue<TreeNode*> q; q.push(root);
        while (!q.empty()) {
            int sz = q.size(); int mx = INT_MIN;
            for (int i = 0; i < sz; i++) {
                TreeNode* n = q.front(); q.pop(); mx = max(mx, n->val);
                if (n->left) q.push(n->left);
                if (n->right) q.push(n->right);
            }
            res.push_back(mx);
        }
        return res;`,
    java: `        List<Integer> res = new ArrayList<>();
        if (root == null) return new int[]{};
        Queue<TreeNode> q = new LinkedList<>(); q.add(root);
        while (!q.isEmpty()) {
            int sz = q.size(); int mx = Integer.MIN_VALUE;
            for (int i = 0; i < sz; i++) {
                TreeNode n = q.poll(); mx = Math.max(mx, n.val);
                if (n.left != null) q.add(n.left);
                if (n.right != null) q.add(n.right);
            }
            res.add(mx);
        }
        int[] out = new int[res.size()];
        for (int i = 0; i < out.length; i++) out[i] = res.get(i);
        return out;`,
  },
  'minimum-absolute-difference-in-bst': {
    python: `        self.prev = None; self.best = float("inf")
        def inorder(node):
            if not node: return
            inorder(node.left)
            if self.prev is not None:
                self.best = min(self.best, node.val - self.prev)
            self.prev = node.val
            inorder(node.right)
        inorder(root)
        return self.best`,
    javascript: `    let prev = null, best = Infinity;
    const inorder = (node) => {
        if (!node) return;
        inorder(node.left);
        if (prev !== null) best = Math.min(best, node.val - prev);
        prev = node.val;
        inorder(node.right);
    };
    inorder(root);
    return best;`,
    cpp: `        long long prev = 0; bool has = false; int best = INT_MAX;
        function<void(TreeNode*)> inorder = [&](TreeNode* node) {
            if (!node) return;
            inorder(node->left);
            if (has) best = min(best, (int)(node->val - prev));
            prev = node->val; has = true;
            inorder(node->right);
        };
        inorder(root);
        return best;`,
    java: `        prev = 0; has = false; best = Integer.MAX_VALUE;
        inorder(root);
        return best;
    }
    long prev; boolean has; int best;
    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (has) best = Math.min(best, (int)(node.val - prev));
        prev = node.val; has = true;
        inorder(node.right);`,
  },
};

module.exports = { SOL };
