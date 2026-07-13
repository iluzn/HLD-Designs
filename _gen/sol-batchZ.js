// Batch Z: known-correct solutions for batch 28 (hard tree / grid / graph).
// Python & JS use nested functions; C++ uses std::function lambdas; Java uses
// instance fields + helper methods whose final brace is supplied by the stub.
const SOL = {
  'binary-tree-cameras': {
    python: `        self.cams = 0
        def dfs(node):
            if not node: return 1
            l = dfs(node.left); r = dfs(node.right)
            if l == 0 or r == 0:
                self.cams += 1; return 2
            if l == 2 or r == 2: return 1
            return 0
        if dfs(root) == 0: self.cams += 1
        return self.cams`,
    javascript: `    let cams = 0;
    const dfs = (node) => {
        if (!node) return 1;
        const l = dfs(node.left), r = dfs(node.right);
        if (l === 0 || r === 0) { cams++; return 2; }
        if (l === 2 || r === 2) return 1;
        return 0;
    };
    if (dfs(root) === 0) cams++;
    return cams;`,
    cpp: `        int cams = 0;
        function<int(TreeNode*)> dfs = [&](TreeNode* node) -> int {
            if (!node) return 1;
            int l = dfs(node->left), r = dfs(node->right);
            if (l == 0 || r == 0) { cams++; return 2; }
            if (l == 2 || r == 2) return 1;
            return 0;
        };
        if (dfs(root) == 0) cams++;
        return cams;`,
    java: `        cams = 0;
        if (dfs(root) == 0) cams++;
        return cams;
    }
    int cams;
    private int dfs(TreeNode node) {
        if (node == null) return 1;
        int l = dfs(node.left), r = dfs(node.right);
        if (l == 0 || r == 0) { cams++; return 2; }
        if (l == 2 || r == 2) return 1;
        return 0;`,
  },
  'maximum-sum-bst-in-binary-tree': {
    python: `        self.best = 0
        def dfs(node):
            if not node: return (True, float('inf'), float('-inf'), 0)
            lb, lmin, lmax, ls = dfs(node.left)
            rb, rmin, rmax, rs = dfs(node.right)
            if lb and rb and node.val > lmax and node.val < rmin:
                s = ls + rs + node.val
                if s > self.best: self.best = s
                return (True, min(lmin, node.val), max(rmax, node.val), s)
            return (False, 0, 0, 0)
        dfs(root)
        return self.best`,
    javascript: `    let best = 0;
    const dfs = (node) => {
        if (!node) return [true, Infinity, -Infinity, 0];
        const l = dfs(node.left), r = dfs(node.right);
        if (l[0] && r[0] && node.val > l[2] && node.val < r[1]) {
            const s = l[3] + r[3] + node.val;
            if (s > best) best = s;
            return [true, Math.min(l[1], node.val), Math.max(r[2], node.val), s];
        }
        return [false, 0, 0, 0];
    };
    dfs(root);
    return best;`,
    cpp: `        long long best = 0;
        function<array<long long,4>(TreeNode*)> dfs = [&](TreeNode* node) -> array<long long,4> {
            if (!node) return {1, LLONG_MAX, LLONG_MIN, 0};
            array<long long,4> l = dfs(node->left), r = dfs(node->right);
            if (l[0] == 1 && r[0] == 1 && node->val > l[2] && node->val < r[1]) {
                long long s = l[3] + r[3] + node->val;
                if (s > best) best = s;
                return {1, min(l[1], (long long)node->val), max(r[2], (long long)node->val), s};
            }
            return {0, 0, 0, 0};
        };
        dfs(root);
        return (int)best;`,
    java: `        best = 0;
        dfs(root);
        return best;
    }
    int best;
    private long[] dfs(TreeNode node) {
        if (node == null) return new long[]{1, Long.MAX_VALUE, Long.MIN_VALUE, 0};
        long[] l = dfs(node.left), r = dfs(node.right);
        if (l[0] == 1 && r[0] == 1 && node.val > l[2] && node.val < r[1]) {
            long s = l[3] + r[3] + node.val;
            if (s > best) best = (int) s;
            return new long[]{1, Math.min(l[1], node.val), Math.max(r[2], node.val), s};
        }
        return new long[]{0, 0, 0, 0};`,
  },
  'longest-zigzag-path-in-a-binary-tree': {
    python: `        self.best = 0
        def dfs(node):
            if not node: return (-1, -1)
            l = dfs(node.left); r = dfs(node.right)
            left = l[1] + 1; right = r[0] + 1
            if left > self.best: self.best = left
            if right > self.best: self.best = right
            return (left, right)
        if root: dfs(root)
        return self.best`,
    javascript: `    let best = 0;
    const dfs = (node) => {
        if (!node) return [-1, -1];
        const l = dfs(node.left), r = dfs(node.right);
        const left = l[1] + 1, right = r[0] + 1;
        if (left > best) best = left;
        if (right > best) best = right;
        return [left, right];
    };
    if (root) dfs(root);
    return best;`,
    cpp: `        int best = 0;
        function<array<int,2>(TreeNode*)> dfs = [&](TreeNode* node) -> array<int,2> {
            if (!node) return {-1, -1};
            array<int,2> l = dfs(node->left), r = dfs(node->right);
            int left = l[1] + 1, right = r[0] + 1;
            if (left > best) best = left;
            if (right > best) best = right;
            return {left, right};
        };
        if (root) dfs(root);
        return best;`,
    java: `        best = 0;
        if (root != null) dfs(root);
        return best;
    }
    int best;
    private int[] dfs(TreeNode node) {
        if (node == null) return new int[]{-1, -1};
        int[] l = dfs(node.left), r = dfs(node.right);
        int left = l[1] + 1, right = r[0] + 1;
        if (left > best) best = left;
        if (right > best) best = right;
        return new int[]{left, right};`,
  },
  'number-of-good-leaf-nodes-pairs': {
    python: `        self.cnt = 0
        def dfs(node):
            if not node: return []
            if not node.left and not node.right: return [0]
            L = dfs(node.left); R = dfs(node.right)
            for x in L:
                for y in R:
                    if x + y + 2 <= 3: self.cnt += 1
            res = []
            for d in L + R:
                if d + 1 <= 3: res.append(d + 1)
            return res
        dfs(root)
        return self.cnt`,
    javascript: `    let cnt = 0;
    const dfs = (node) => {
        if (!node) return [];
        if (!node.left && !node.right) return [0];
        const L = dfs(node.left), R = dfs(node.right);
        for (const x of L) for (const y of R) if (x + y + 2 <= 3) cnt++;
        const res = [];
        for (const d of L.concat(R)) if (d + 1 <= 3) res.push(d + 1);
        return res;
    };
    dfs(root);
    return cnt;`,
    cpp: `        int cnt = 0;
        function<vector<int>(TreeNode*)> dfs = [&](TreeNode* node) -> vector<int> {
            vector<int> res;
            if (!node) return res;
            if (!node->left && !node->right) { res.push_back(0); return res; }
            vector<int> L = dfs(node->left), R = dfs(node->right);
            for (int x : L) for (int y : R) if (x + y + 2 <= 3) cnt++;
            for (int x : L) if (x + 1 <= 3) res.push_back(x + 1);
            for (int y : R) if (y + 1 <= 3) res.push_back(y + 1);
            return res;
        };
        dfs(root);
        return cnt;`,
    java: `        cnt = 0;
        dfs(root);
        return cnt;
    }
    int cnt;
    private List<Integer> dfs(TreeNode node) {
        List<Integer> res = new ArrayList<>();
        if (node == null) return res;
        if (node.left == null && node.right == null) { res.add(0); return res; }
        List<Integer> L = dfs(node.left), R = dfs(node.right);
        for (int x : L) for (int y : R) if (x + y + 2 <= 3) cnt++;
        for (int x : L) if (x + 1 <= 3) res.add(x + 1);
        for (int y : R) if (y + 1 <= 3) res.add(y + 1);
        return res;`,
  },
  'cut-off-trees-for-golf-event': {
    python: `        from collections import deque
        R = len(grid); C = len(grid[0])
        trees = []
        for r in range(R):
            for c in range(C):
                if grid[r][c] > 1: trees.append((grid[r][c], r, c))
        trees.sort()
        def bfs(sr, sc, tr, tc):
            if sr == tr and sc == tc: return 0
            vis = [[False] * C for _ in range(R)]
            q = deque([(sr, sc)]); vis[sr][sc] = True; d = 0
            while q:
                d += 1
                for _ in range(len(q)):
                    cr, cc = q.popleft()
                    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        nr, nc = cr + dr, cc + dc
                        if nr < 0 or nr >= R or nc < 0 or nc >= C or vis[nr][nc] or grid[nr][nc] == 0: continue
                        if nr == tr and nc == tc: return d
                        vis[nr][nc] = True; q.append((nr, nc))
            return -1
        pr, pc, total = 0, 0, 0
        for _, tr, tc in trees:
            d = bfs(pr, pc, tr, tc)
            if d < 0: return -1
            total += d; pr, pc = tr, tc
        return total`,
    javascript: `    const R = grid.length, C = grid[0].length;
    const trees = [];
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (grid[r][c] > 1) trees.push([grid[r][c], r, c]);
    trees.sort((a, b) => a[0] - b[0]);
    const bfs = (sr, sc, tr, tc) => {
        if (sr === tr && sc === tc) return 0;
        const vis = Array.from({ length: R }, () => new Array(C).fill(false));
        let q = [[sr, sc]]; vis[sr][sc] = true; let d = 0;
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        while (q.length) {
            const nq = []; d++;
            for (const [cr, cc] of q) {
                for (const [dr, dc] of dirs) {
                    const nr = cr + dr, nc = cc + dc;
                    if (nr < 0 || nr >= R || nc < 0 || nc >= C || vis[nr][nc] || grid[nr][nc] === 0) continue;
                    if (nr === tr && nc === tc) return d;
                    vis[nr][nc] = true; nq.push([nr, nc]);
                }
            }
            q = nq;
        }
        return -1;
    };
    let pr = 0, pc = 0, total = 0;
    for (const t of trees) {
        const d = bfs(pr, pc, t[1], t[2]);
        if (d < 0) return -1;
        total += d; pr = t[1]; pc = t[2];
    }
    return total;`,
    cpp: `        int R = grid.size(), C = grid[0].size();
        vector<array<int,3>> trees;
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) if (grid[r][c] > 1) trees.push_back({grid[r][c], r, c});
        sort(trees.begin(), trees.end());
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        auto bfs = [&](int sr, int sc, int tr, int tc) -> int {
            if (sr == tr && sc == tc) return 0;
            vector<vector<char>> vis(R, vector<char>(C, 0));
            queue<pair<int,int>> q; q.push({sr, sc}); vis[sr][sc] = 1; int d = 0;
            while (!q.empty()) {
                int sz = q.size(); d++;
                for (int i = 0; i < sz; i++) {
                    auto cur = q.front(); q.pop();
                    for (int k = 0; k < 4; k++) {
                        int nr = cur.first + dirs[k][0], nc = cur.second + dirs[k][1];
                        if (nr < 0 || nr >= R || nc < 0 || nc >= C || vis[nr][nc] || grid[nr][nc] == 0) continue;
                        if (nr == tr && nc == tc) return d;
                        vis[nr][nc] = 1; q.push({nr, nc});
                    }
                }
            }
            return -1;
        };
        int pr = 0, pc = 0, total = 0;
        for (auto& t : trees) {
            int d = bfs(pr, pc, t[1], t[2]);
            if (d < 0) return -1;
            total += d; pr = t[1]; pc = t[2];
        }
        return total;`,
    java: `        int R = grid.length, C = grid[0].length;
        List<int[]> trees = new ArrayList<>();
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) if (grid[r][c] > 1) trees.add(new int[]{grid[r][c], r, c});
        trees.sort((a, b) -> a[0] - b[0]);
        int pr = 0, pc = 0, total = 0;
        for (int[] t : trees) {
            int d = bfs(grid, pr, pc, t[1], t[2]);
            if (d < 0) return -1;
            total += d; pr = t[1]; pc = t[2];
        }
        return total;
    }
    private int bfs(int[][] g, int sr, int sc, int tr, int tc) {
        if (sr == tr && sc == tc) return 0;
        int R = g.length, C = g[0].length;
        boolean[][] vis = new boolean[R][C];
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{sr, sc}); vis[sr][sc] = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        int d = 0;
        while (!q.isEmpty()) {
            int sz = q.size(); d++;
            for (int i = 0; i < sz; i++) {
                int[] cur = q.poll();
                for (int[] dir : dirs) {
                    int nr = cur[0] + dir[0], nc = cur[1] + dir[1];
                    if (nr < 0 || nr >= R || nc < 0 || nc >= C || vis[nr][nc] || g[nr][nc] == 0) continue;
                    if (nr == tr && nc == tc) return d;
                    vis[nr][nc] = true; q.add(new int[]{nr, nc});
                }
            }
        }
        return -1;`,
  },
  'making-a-large-island': {
    python: `        R = len(grid); C = len(grid[0])
        size = {}; idx = 2
        dirs = ((1, 0), (-1, 0), (0, 1), (0, -1))
        def fill(sr, sc, iid):
            st = [(sr, sc)]; grid[sr][sc] = iid; cnt = 0
            while st:
                cr, cc = st.pop(); cnt += 1
                for dr, dc in dirs:
                    nr, nc = cr + dr, cc + dc
                    if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1:
                        grid[nr][nc] = iid; st.append((nr, nc))
            return cnt
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 1:
                    size[idx] = fill(r, c, idx); idx += 1
        best = 0
        for v in size.values():
            if v > best: best = v
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 0:
                    seen = set(); tot = 1
                    for dr, dc in dirs:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] > 1:
                            pid = grid[nr][nc]
                            if pid not in seen: seen.add(pid); tot += size[pid]
                    if tot > best: best = tot
        return best`,
    javascript: `    const R = grid.length, C = grid[0].length;
    const size = {}; let id = 2;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const fill = (sr, sc, iid) => {
        const st = [[sr, sc]]; grid[sr][sc] = iid; let cnt = 0;
        while (st.length) {
            const [cr, cc] = st.pop(); cnt++;
            for (const [dr, dc] of dirs) {
                const nr = cr + dr, nc = cc + dc;
                if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] === 1) { grid[nr][nc] = iid; st.push([nr, nc]); }
            }
        }
        return cnt;
    };
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (grid[r][c] === 1) { size[id] = fill(r, c, id); id++; }
    let best = 0;
    for (const k in size) if (size[k] > best) best = size[k];
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (grid[r][c] === 0) {
        const seen = {}; let tot = 1;
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] > 1) { const pid = grid[nr][nc]; if (!seen[pid]) { seen[pid] = 1; tot += size[pid]; } }
        }
        if (tot > best) best = tot;
    }
    return best;`,
    cpp: `        int R = grid.size(), C = grid[0].size();
        unordered_map<int,int> sz; int id = 2;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        function<int(int,int,int)> fill = [&](int sr, int sc, int iid) -> int {
            vector<pair<int,int>> st; st.push_back({sr, sc}); grid[sr][sc] = iid; int cnt = 0;
            while (!st.empty()) {
                auto cur = st.back(); st.pop_back(); cnt++;
                for (int k = 0; k < 4; k++) {
                    int nr = cur.first + dirs[k][0], nc = cur.second + dirs[k][1];
                    if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] == 1) { grid[nr][nc] = iid; st.push_back({nr, nc}); }
                }
            }
            return cnt;
        };
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) if (grid[r][c] == 1) { sz[id] = fill(r, c, id); id++; }
        int best = 0;
        for (auto& pr : sz) if (pr.second > best) best = pr.second;
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) if (grid[r][c] == 0) {
            set<int> seen; int tot = 1;
            for (int k = 0; k < 4; k++) {
                int nr = r + dirs[k][0], nc = c + dirs[k][1];
                if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] > 1) { int pid = grid[nr][nc]; if (!seen.count(pid)) { seen.insert(pid); tot += sz[pid]; } }
            }
            if (tot > best) best = tot;
        }
        return best;`,
    java: `        int R = grid.length, C = grid[0].length;
        Map<Integer,Integer> size = new HashMap<>();
        int id = 2;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) if (grid[r][c] == 1) { size.put(id, fill(grid, r, c, id)); id++; }
        int best = 0;
        for (int v : size.values()) if (v > best) best = v;
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) if (grid[r][c] == 0) {
            Set<Integer> seen = new HashSet<>(); int tot = 1;
            for (int[] d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] > 1) { int pid = grid[nr][nc]; if (seen.add(pid)) tot += size.get(pid); }
            }
            if (tot > best) best = tot;
        }
        return best;
    }
    private int fill(int[][] g, int sr, int sc, int id) {
        int R = g.length, C = g[0].length;
        Deque<int[]> st = new ArrayDeque<>();
        st.push(new int[]{sr, sc}); g[sr][sc] = id; int cnt = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!st.isEmpty()) {
            int[] cur = st.pop(); cnt++;
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nr < R && nc >= 0 && nc < C && g[nr][nc] == 1) { g[nr][nc] = id; st.push(new int[]{nr, nc}); }
            }
        }
        return cnt;`,
  },
  'shortest-distance-from-all-buildings': {
    python: `        from collections import deque
        R = len(grid); C = len(grid[0])
        total = [[0] * C for _ in range(R)]
        reach = [[0] * C for _ in range(R)]
        buildings = 0
        dirs = ((1, 0), (-1, 0), (0, 1), (0, -1))
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 1:
                    buildings += 1
                    vis = [[False] * C for _ in range(R)]; vis[r][c] = True
                    q = deque([(r, c)]); d = 0
                    while q:
                        d += 1
                        for _ in range(len(q)):
                            cr, cc = q.popleft()
                            for dr, dc in dirs:
                                nr, nc = cr + dr, cc + dc
                                if nr < 0 or nr >= R or nc < 0 or nc >= C or vis[nr][nc] or grid[nr][nc] != 0: continue
                                vis[nr][nc] = True; total[nr][nc] += d; reach[nr][nc] += 1; q.append((nr, nc))
        if buildings == 0: return -1
        best = -1
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 0 and reach[r][c] == buildings:
                    if best == -1 or total[r][c] < best: best = total[r][c]
        return best`,
    javascript: `    const R = grid.length, C = grid[0].length;
    const total = Array.from({ length: R }, () => new Array(C).fill(0));
    const reach = Array.from({ length: R }, () => new Array(C).fill(0));
    let buildings = 0;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (grid[r][c] === 1) {
        buildings++;
        const vis = Array.from({ length: R }, () => new Array(C).fill(false)); vis[r][c] = true;
        let q = [[r, c]], d = 0;
        while (q.length) {
            const nq = []; d++;
            for (const [cr, cc] of q) {
                for (const [dr, dc] of dirs) {
                    const nr = cr + dr, nc = cc + dc;
                    if (nr < 0 || nr >= R || nc < 0 || nc >= C || vis[nr][nc] || grid[nr][nc] !== 0) continue;
                    vis[nr][nc] = true; total[nr][nc] += d; reach[nr][nc]++; nq.push([nr, nc]);
                }
            }
            q = nq;
        }
    }
    if (buildings === 0) return -1;
    let best = -1;
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (grid[r][c] === 0 && reach[r][c] === buildings) { if (best === -1 || total[r][c] < best) best = total[r][c]; }
    return best;`,
    cpp: `        int R = grid.size(), C = grid[0].size();
        vector<vector<int>> total(R, vector<int>(C, 0)), reach(R, vector<int>(C, 0));
        int buildings = 0;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) if (grid[r][c] == 1) {
            buildings++;
            vector<vector<char>> vis(R, vector<char>(C, 0)); vis[r][c] = 1;
            queue<pair<int,int>> q; q.push({r, c}); int d = 0;
            while (!q.empty()) {
                int sz = q.size(); d++;
                for (int i = 0; i < sz; i++) {
                    auto cur = q.front(); q.pop();
                    for (int k = 0; k < 4; k++) {
                        int nr = cur.first + dirs[k][0], nc = cur.second + dirs[k][1];
                        if (nr < 0 || nr >= R || nc < 0 || nc >= C || vis[nr][nc] || grid[nr][nc] != 0) continue;
                        vis[nr][nc] = 1; total[nr][nc] += d; reach[nr][nc]++; q.push({nr, nc});
                    }
                }
            }
        }
        if (buildings == 0) return -1;
        int best = -1;
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) if (grid[r][c] == 0 && reach[r][c] == buildings) { if (best == -1 || total[r][c] < best) best = total[r][c]; }
        return best;`,
    java: `        int R = grid.length, C = grid[0].length;
        int[][] total = new int[R][C]; int[][] reach = new int[R][C];
        int buildings = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) if (grid[r][c] == 1) {
            buildings++;
            boolean[][] vis = new boolean[R][C]; vis[r][c] = true;
            Queue<int[]> q = new LinkedList<>(); q.add(new int[]{r, c}); int d = 0;
            while (!q.isEmpty()) {
                int sz = q.size(); d++;
                for (int i = 0; i < sz; i++) {
                    int[] cur = q.poll();
                    for (int[] dir : dirs) {
                        int nr = cur[0] + dir[0], nc = cur[1] + dir[1];
                        if (nr < 0 || nr >= R || nc < 0 || nc >= C || vis[nr][nc] || grid[nr][nc] != 0) continue;
                        vis[nr][nc] = true; total[nr][nc] += d; reach[nr][nc]++; q.add(new int[]{nr, nc});
                    }
                }
            }
        }
        if (buildings == 0) return -1;
        int best = -1;
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) if (grid[r][c] == 0 && reach[r][c] == buildings) { if (best == -1 || total[r][c] < best) best = total[r][c]; }
        return best;`,
  },
  'minimum-cost-to-make-at-least-one-valid-path-in-a-grid': {
    python: `        from collections import deque
        R = len(grid); C = len(grid[0])
        INF = float('inf')
        dist = [[INF] * C for _ in range(R)]; dist[0][0] = 0
        dq = deque([(0, 0)])
        dv = ((1, 0, 1), (2, 0, -1), (3, 1, 0), (4, -1, 0))
        while dq:
            r, c = dq.popleft()
            for v, dr, dc in dv:
                nr, nc = r + dr, c + dc
                if nr < 0 or nr >= R or nc < 0 or nc >= C: continue
                cost = 0 if grid[r][c] == v else 1
                if dist[r][c] + cost < dist[nr][nc]:
                    dist[nr][nc] = dist[r][c] + cost
                    if cost == 0: dq.appendleft((nr, nc))
                    else: dq.append((nr, nc))
        return dist[R - 1][C - 1]`,
    javascript: `    const R = grid.length, C = grid[0].length, INF = Infinity;
    const dist = Array.from({ length: R }, () => new Array(C).fill(INF));
    dist[0][0] = 0;
    const dq = [[0, 0]];
    const dv = [[1, 0, 1], [2, 0, -1], [3, 1, 0], [4, -1, 0]];
    while (dq.length) {
        const [r, c] = dq.shift();
        for (const [v, dr, dc] of dv) {
            const nr = r + dr, nc = c + dc;
            if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
            const cost = (grid[r][c] === v) ? 0 : 1;
            if (dist[r][c] + cost < dist[nr][nc]) {
                dist[nr][nc] = dist[r][c] + cost;
                if (cost === 0) dq.unshift([nr, nc]); else dq.push([nr, nc]);
            }
        }
    }
    return dist[R - 1][C - 1];`,
    cpp: `        int R = grid.size(), C = grid[0].size();
        const int INF = 1e9;
        vector<vector<int>> dist(R, vector<int>(C, INF));
        dist[0][0] = 0;
        deque<pair<int,int>> dq; dq.push_back({0, 0});
        int dv[4][3] = {{1,0,1},{2,0,-1},{3,1,0},{4,-1,0}};
        while (!dq.empty()) {
            auto cur = dq.front(); dq.pop_front();
            int r = cur.first, c = cur.second;
            for (int k = 0; k < 4; k++) {
                int v = dv[k][0], nr = r + dv[k][1], nc = c + dv[k][2];
                if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
                int cost = (grid[r][c] == v) ? 0 : 1;
                if (dist[r][c] + cost < dist[nr][nc]) {
                    dist[nr][nc] = dist[r][c] + cost;
                    if (cost == 0) dq.push_front({nr, nc});
                    else dq.push_back({nr, nc});
                }
            }
        }
        return dist[R - 1][C - 1];`,
    java: `        int R = grid.length, C = grid[0].length;
        int[][] dist = new int[R][C];
        for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
        dist[0][0] = 0;
        Deque<int[]> dq = new ArrayDeque<>();
        dq.add(new int[]{0, 0});
        int[][] dv = {{1,0,1},{2,0,-1},{3,1,0},{4,-1,0}};
        while (!dq.isEmpty()) {
            int[] cur = dq.pollFirst(); int r = cur[0], c = cur[1];
            for (int[] d : dv) {
                int v = d[0], nr = r + d[1], nc = c + d[2];
                if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
                int cost = (grid[r][c] == v) ? 0 : 1;
                if (dist[r][c] + cost < dist[nr][nc]) {
                    dist[nr][nc] = dist[r][c] + cost;
                    if (cost == 0) dq.addFirst(new int[]{nr, nc});
                    else dq.addLast(new int[]{nr, nc});
                }
            }
        }
        return dist[R - 1][C - 1];`,
  },
  'unique-paths-iii': {
    python: `        R = len(grid); C = len(grid[0])
        Z = 0; sr = sc = 0
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 0: Z += 1
                elif grid[r][c] == 1: sr, sc = r, c
        def dfs(r, c, remain):
            if r < 0 or r >= R or c < 0 or c >= C or grid[r][c] == -1: return 0
            if grid[r][c] == 2: return 1 if remain == 0 else 0
            orig = grid[r][c]; grid[r][c] = -1
            res = dfs(r + 1, c, remain - 1) + dfs(r - 1, c, remain - 1) + dfs(r, c + 1, remain - 1) + dfs(r, c - 1, remain - 1)
            grid[r][c] = orig
            return res
        return dfs(sr, sc, Z + 1)`,
    javascript: `    const R = grid.length, C = grid[0].length;
    let Z = 0, sr = 0, sc = 0;
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) { if (grid[r][c] === 0) Z++; else if (grid[r][c] === 1) { sr = r; sc = c; } }
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const dfs = (r, c, remain) => {
        if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] === -1) return 0;
        if (grid[r][c] === 2) return remain === 0 ? 1 : 0;
        const orig = grid[r][c]; grid[r][c] = -1;
        let res = 0;
        for (const [dr, dc] of dirs) res += dfs(r + dr, c + dc, remain - 1);
        grid[r][c] = orig;
        return res;
    };
    return dfs(sr, sc, Z + 1);`,
    cpp: `        int R = grid.size(), C = grid[0].size();
        int Z = 0, sr = 0, sc = 0;
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) { if (grid[r][c] == 0) Z++; else if (grid[r][c] == 1) { sr = r; sc = c; } }
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        function<int(int,int,int)> dfs = [&](int r, int c, int remain) -> int {
            if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] == -1) return 0;
            if (grid[r][c] == 2) return remain == 0 ? 1 : 0;
            int orig = grid[r][c]; grid[r][c] = -1;
            int res = 0;
            for (int k = 0; k < 4; k++) res += dfs(r + dirs[k][0], c + dirs[k][1], remain - 1);
            grid[r][c] = orig;
            return res;
        };
        return dfs(sr, sc, Z + 1);`,
    java: `        R = grid.length; C = grid[0].length; g = grid;
        int Z = 0, sr = 0, sc = 0;
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) { if (g[r][c] == 0) Z++; else if (g[r][c] == 1) { sr = r; sc = c; } }
        return dfs(sr, sc, Z + 1);
    }
    int R, C; int[][] g;
    private int dfs(int r, int c, int remain) {
        if (r < 0 || r >= R || c < 0 || c >= C || g[r][c] == -1) return 0;
        if (g[r][c] == 2) return remain == 0 ? 1 : 0;
        int orig = g[r][c]; g[r][c] = -1;
        int res = dfs(r + 1, c, remain - 1) + dfs(r - 1, c, remain - 1) + dfs(r, c + 1, remain - 1) + dfs(r, c - 1, remain - 1);
        g[r][c] = orig;
        return res;`,
  },
  'trapping-rain-water-ii': {
    python: `        R = len(grid); C = len(grid[0])
        if R < 3 or C < 3: return 0
        maxH = max(max(row) for row in grid)
        level = [[grid[r][c] if (r == 0 or r == R - 1 or c == 0 or c == C - 1) else maxH for c in range(C)] for r in range(R)]
        dirs = ((1, 0), (-1, 0), (0, 1), (0, -1))
        changed = True
        while changed:
            changed = False
            for r in range(1, R - 1):
                for c in range(1, C - 1):
                    m = min(level[r + dr][c + dc] for dr, dc in dirs)
                    nv = grid[r][c] if grid[r][c] > m else m
                    if nv < level[r][c]:
                        level[r][c] = nv; changed = True
        water = 0
        for r in range(R):
            for c in range(C):
                water += level[r][c] - grid[r][c]
        return water`,
    javascript: `    const R = grid.length, C = grid[0].length;
    if (R < 3 || C < 3) return 0;
    let maxH = 0;
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (grid[r][c] > maxH) maxH = grid[r][c];
    const level = [];
    for (let r = 0; r < R; r++) { const row = []; for (let c = 0; c < C; c++) row.push((r === 0 || r === R - 1 || c === 0 || c === C - 1) ? grid[r][c] : maxH); level.push(row); }
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let changed = true;
    while (changed) {
        changed = false;
        for (let r = 1; r < R - 1; r++) for (let c = 1; c < C - 1; c++) {
            let m = Infinity;
            for (const [dr, dc] of dirs) { const v = level[r + dr][c + dc]; if (v < m) m = v; }
            const nv = Math.max(grid[r][c], m);
            if (nv < level[r][c]) { level[r][c] = nv; changed = true; }
        }
    }
    let water = 0;
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) water += level[r][c] - grid[r][c];
    return water;`,
    cpp: `        int R = grid.size(), C = grid[0].size();
        if (R < 3 || C < 3) return 0;
        int maxH = 0;
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) if (grid[r][c] > maxH) maxH = grid[r][c];
        vector<vector<int>> level(R, vector<int>(C));
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) level[r][c] = (r == 0 || r == R - 1 || c == 0 || c == C - 1) ? grid[r][c] : maxH;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        bool changed = true;
        while (changed) {
            changed = false;
            for (int r = 1; r < R - 1; r++) for (int c = 1; c < C - 1; c++) {
                int m = INT_MAX;
                for (int k = 0; k < 4; k++) { int v = level[r + dirs[k][0]][c + dirs[k][1]]; if (v < m) m = v; }
                int nv = max(grid[r][c], m);
                if (nv < level[r][c]) { level[r][c] = nv; changed = true; }
            }
        }
        int water = 0;
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) water += level[r][c] - grid[r][c];
        return water;`,
    java: `        int R = grid.length, C = grid[0].length;
        if (R < 3 || C < 3) return 0;
        int maxH = 0;
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) if (grid[r][c] > maxH) maxH = grid[r][c];
        int[][] level = new int[R][C];
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) level[r][c] = (r == 0 || r == R - 1 || c == 0 || c == C - 1) ? grid[r][c] : maxH;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        boolean changed = true;
        while (changed) {
            changed = false;
            for (int r = 1; r < R - 1; r++) for (int c = 1; c < C - 1; c++) {
                int m = Integer.MAX_VALUE;
                for (int[] d : dirs) { int v = level[r + d[0]][c + d[1]]; if (v < m) m = v; }
                int nv = Math.max(grid[r][c], m);
                if (nv < level[r][c]) { level[r][c] = nv; changed = true; }
            }
        }
        int water = 0;
        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) water += level[r][c] - grid[r][c];
        return water;`,
  },
  'graph-valid-tree': {
    python: `        if len(edges) != n - 1: return False
        par = list(range(n))
        def find(x):
            while par[x] != x:
                par[x] = par[par[x]]; x = par[x]
            return x
        for a, b in edges:
            ra, rb = find(a), find(b)
            if ra == rb: return False
            par[ra] = rb
        return True`,
    javascript: `    if (edges.length !== n - 1) return false;
    const par = [];
    for (let i = 0; i < n; i++) par[i] = i;
    const find = (x) => { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; };
    for (const [a, b] of edges) {
        const ra = find(a), rb = find(b);
        if (ra === rb) return false;
        par[ra] = rb;
    }
    return true;`,
    cpp: `        if ((int)edges.size() != n - 1) return false;
        vector<int> par(n);
        for (int i = 0; i < n; i++) par[i] = i;
        function<int(int)> find = [&](int x) -> int {
            while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; }
            return x;
        };
        for (auto& e : edges) {
            int ra = find(e[0]), rb = find(e[1]);
            if (ra == rb) return false;
            par[ra] = rb;
        }
        return true;`,
    java: `        if (edges.length != n - 1) return false;
        int[] par = new int[n];
        for (int i = 0; i < n; i++) par[i] = i;
        for (int[] e : edges) {
            int ra = find(par, e[0]), rb = find(par, e[1]);
            if (ra == rb) return false;
            par[ra] = rb;
        }
        return true;
    }
    private int find(int[] par, int x) {
        while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; }
        return x;`,
  },
  'shortest-path-visiting-all-nodes': {
    python: `        if n <= 1: return 0
        from collections import deque
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b); adj[b].append(a)
        full = (1 << n) - 1
        vis = [[False] * (1 << n) for _ in range(n)]
        q = deque()
        for i in range(n):
            q.append((i, 1 << i)); vis[i][1 << i] = True
        d = 0
        while q:
            for _ in range(len(q)):
                node, mask = q.popleft()
                if mask == full: return d
                for nb in adj[node]:
                    nm = mask | (1 << nb)
                    if not vis[nb][nm]:
                        vis[nb][nm] = True; q.append((nb, nm))
            d += 1
        return -1`,
    javascript: `    if (n <= 1) return 0;
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) { adj[a].push(b); adj[b].push(a); }
    const full = (1 << n) - 1;
    const vis = Array.from({ length: n }, () => new Array(1 << n).fill(false));
    let q = [];
    for (let i = 0; i < n; i++) { q.push([i, 1 << i]); vis[i][1 << i] = true; }
    let d = 0;
    while (q.length) {
        const nq = [];
        for (const [node, mask] of q) {
            if (mask === full) return d;
            for (const nb of adj[node]) {
                const nm = mask | (1 << nb);
                if (!vis[nb][nm]) { vis[nb][nm] = true; nq.push([nb, nm]); }
            }
        }
        q = nq; d++;
    }
    return -1;`,
    cpp: `        if (n <= 1) return 0;
        vector<vector<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        int full = (1 << n) - 1;
        vector<vector<char>> vis(n, vector<char>(1 << n, 0));
        queue<pair<int,int>> q;
        for (int i = 0; i < n; i++) { q.push({i, 1 << i}); vis[i][1 << i] = 1; }
        int d = 0;
        while (!q.empty()) {
            int sz = q.size();
            for (int j = 0; j < sz; j++) {
                auto cur = q.front(); q.pop();
                int node = cur.first, mask = cur.second;
                if (mask == full) return d;
                for (int nb : adj[node]) {
                    int nm = mask | (1 << nb);
                    if (!vis[nb][nm]) { vis[nb][nm] = 1; q.push({nb, nm}); }
                }
            }
            d++;
        }
        return -1;`,
    java: `        if (n <= 1) return 0;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        int full = (1 << n) - 1;
        boolean[][] vis = new boolean[n][1 << n];
        Queue<int[]> q = new LinkedList<>();
        for (int i = 0; i < n; i++) { q.add(new int[]{i, 1 << i}); vis[i][1 << i] = true; }
        int d = 0;
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int j = 0; j < sz; j++) {
                int[] cur = q.poll(); int node = cur[0], mask = cur[1];
                if (mask == full) return d;
                for (int nb : adj.get(node)) {
                    int nm = mask | (1 << nb);
                    if (!vis[nb][nm]) { vis[nb][nm] = true; q.add(new int[]{nb, nm}); }
                }
            }
            d++;
        }
        return -1;`,
  },
};

module.exports = { SOL };
