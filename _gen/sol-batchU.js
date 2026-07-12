// Batch U: solutions for graph & grid problems (batch 24).
const SOL = {
  'island-perimeter': {
    python: `        R, C = len(grid), len(grid[0])
        per = 0
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 1:
                    if r == 0 or grid[r-1][c] == 0: per += 1
                    if r == R-1 or grid[r+1][c] == 0: per += 1
                    if c == 0 or grid[r][c-1] == 0: per += 1
                    if c == C-1 or grid[r][c+1] == 0: per += 1
        return per`,
    java: `        int R = grid.length, C = grid[0].length, per = 0;
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (grid[r][c] == 1) {
                    if (r == 0 || grid[r-1][c] == 0) per++;
                    if (r == R-1 || grid[r+1][c] == 0) per++;
                    if (c == 0 || grid[r][c-1] == 0) per++;
                    if (c == C-1 || grid[r][c+1] == 0) per++;
                }
        return per;`,
    cpp: `        int R = grid.size(), C = grid[0].size(), per = 0;
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (grid[r][c] == 1) {
                    if (r == 0 || grid[r-1][c] == 0) per++;
                    if (r == R-1 || grid[r+1][c] == 0) per++;
                    if (c == 0 || grid[r][c-1] == 0) per++;
                    if (c == C-1 || grid[r][c+1] == 0) per++;
                }
        return per;`,
    javascript: `    const R = grid.length, C = grid[0].length;
    let per = 0;
    for (let r = 0; r < R; r++)
        for (let c = 0; c < C; c++)
            if (grid[r][c] === 1) {
                if (r === 0 || grid[r-1][c] === 0) per++;
                if (r === R-1 || grid[r+1][c] === 0) per++;
                if (c === 0 || grid[r][c-1] === 0) per++;
                if (c === C-1 || grid[r][c+1] === 0) per++;
            }
    return per;`,
  },
  'number-of-closed-islands': {
    python: `        R, C = len(grid), len(grid[0])
        edge = [False]
        def dfs(r, c):
            if r < 0 or r >= R or c < 0 or c >= C:
                edge[0] = True
                return
            if grid[r][c] != 0:
                return
            grid[r][c] = 2
            dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
        count = 0
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 0:
                    edge[0] = False
                    dfs(r, c)
                    if not edge[0]:
                        count += 1
        return count`,
    java: `        int R = grid.length, C = grid[0].length, count = 0;
        boolean[] edge = new boolean[1];
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (grid[r][c] == 0) {
                    edge[0] = false;
                    dfs(grid, r, c, edge);
                    if (!edge[0]) count++;
                }
        return count;
    }
    void dfs(int[][] grid, int r, int c, boolean[] edge) {
        int R = grid.length, C = grid[0].length;
        if (r < 0 || r >= R || c < 0 || c >= C) { edge[0] = true; return; }
        if (grid[r][c] != 0) return;
        grid[r][c] = 2;
        dfs(grid, r+1, c, edge); dfs(grid, r-1, c, edge); dfs(grid, r, c+1, edge); dfs(grid, r, c-1, edge);`,
    cpp: `        int R = grid.size(), C = grid[0].size(), count = 0;
        bool edge = false;
        function<void(int,int)> dfs = [&](int r, int c) {
            if (r < 0 || r >= R || c < 0 || c >= C) { edge = true; return; }
            if (grid[r][c] != 0) return;
            grid[r][c] = 2;
            dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
        };
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (grid[r][c] == 0) {
                    edge = false;
                    dfs(r, c);
                    if (!edge) count++;
                }
        return count;`,
    javascript: `    const R = grid.length, C = grid[0].length;
    let edge = false;
    const dfs = (r, c) => {
        if (r < 0 || r >= R || c < 0 || c >= C) { edge = true; return; }
        if (grid[r][c] !== 0) return;
        grid[r][c] = 2;
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
    };
    let count = 0;
    for (let r = 0; r < R; r++)
        for (let c = 0; c < C; c++)
            if (grid[r][c] === 0) {
                edge = false;
                dfs(r, c);
                if (!edge) count++;
            }
    return count;`,
  },
  'number-of-enclaves': {
    python: `        R, C = len(grid), len(grid[0])
        def dfs(r, c):
            if r < 0 or r >= R or c < 0 or c >= C or grid[r][c] != 1:
                return
            grid[r][c] = 0
            dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
        for r in range(R):
            dfs(r, 0); dfs(r, C-1)
        for c in range(C):
            dfs(0, c); dfs(R-1, c)
        return sum(1 for r in range(R) for c in range(C) if grid[r][c] == 1)`,
    java: `        int R = grid.length, C = grid[0].length;
        for (int r = 0; r < R; r++) { dfs(grid, r, 0); dfs(grid, r, C-1); }
        for (int c = 0; c < C; c++) { dfs(grid, 0, c); dfs(grid, R-1, c); }
        int cnt = 0;
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (grid[r][c] == 1) cnt++;
        return cnt;
    }
    void dfs(int[][] grid, int r, int c) {
        int R = grid.length, C = grid[0].length;
        if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] != 1) return;
        grid[r][c] = 0;
        dfs(grid, r+1, c); dfs(grid, r-1, c); dfs(grid, r, c+1); dfs(grid, r, c-1);`,
    cpp: `        int R = grid.size(), C = grid[0].size();
        function<void(int,int)> dfs = [&](int r, int c) {
            if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] != 1) return;
            grid[r][c] = 0;
            dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
        };
        for (int r = 0; r < R; r++) { dfs(r, 0); dfs(r, C-1); }
        for (int c = 0; c < C; c++) { dfs(0, c); dfs(R-1, c); }
        int cnt = 0;
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (grid[r][c] == 1) cnt++;
        return cnt;`,
    javascript: `    const R = grid.length, C = grid[0].length;
    const dfs = (r, c) => {
        if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] !== 1) return;
        grid[r][c] = 0;
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
    };
    for (let r = 0; r < R; r++) { dfs(r, 0); dfs(r, C-1); }
    for (let c = 0; c < C; c++) { dfs(0, c); dfs(R-1, c); }
    let cnt = 0;
    for (let r = 0; r < R; r++)
        for (let c = 0; c < C; c++)
            if (grid[r][c] === 1) cnt++;
    return cnt;`,
  },
  'count-servers-that-communicate': {
    python: `        R, C = len(grid), len(grid[0])
        rowC = [0] * R
        colC = [0] * C
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 1:
                    rowC[r] += 1
                    colC[c] += 1
        cnt = 0
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 1 and (rowC[r] > 1 or colC[c] > 1):
                    cnt += 1
        return cnt`,
    java: `        int R = grid.length, C = grid[0].length;
        int[] rowC = new int[R], colC = new int[C];
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (grid[r][c] == 1) { rowC[r]++; colC[c]++; }
        int cnt = 0;
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (grid[r][c] == 1 && (rowC[r] > 1 || colC[c] > 1)) cnt++;
        return cnt;`,
    cpp: `        int R = grid.size(), C = grid[0].size();
        vector<int> rowC(R, 0), colC(C, 0);
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (grid[r][c] == 1) { rowC[r]++; colC[c]++; }
        int cnt = 0;
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (grid[r][c] == 1 && (rowC[r] > 1 || colC[c] > 1)) cnt++;
        return cnt;`,
    javascript: `    const R = grid.length, C = grid[0].length;
    const rowC = new Array(R).fill(0), colC = new Array(C).fill(0);
    for (let r = 0; r < R; r++)
        for (let c = 0; c < C; c++)
            if (grid[r][c] === 1) { rowC[r]++; colC[c]++; }
    let cnt = 0;
    for (let r = 0; r < R; r++)
        for (let c = 0; c < C; c++)
            if (grid[r][c] === 1 && (rowC[r] > 1 || colC[c] > 1)) cnt++;
    return cnt;`,
  },
  'as-far-from-land-as-possible': {
    python: `        R, C = len(grid), len(grid[0])
        q = [(r, c) for r in range(R) for c in range(C) if grid[r][c] == 1]
        if len(q) == 0 or len(q) == R * C:
            return -1
        dist = 0
        dirs = [(1,0),(-1,0),(0,1),(0,-1)]
        while q:
            nq = []
            for r, c in q:
                for dr, dc in dirs:
                    nr, nc = r+dr, c+dc
                    if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 0:
                        grid[nr][nc] = 1
                        nq.append((nr, nc))
            if nq:
                dist += 1
            q = nq
        return dist`,
    java: `        int R = grid.length, C = grid[0].length;
        ArrayDeque<int[]> q = new ArrayDeque<>();
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (grid[r][c] == 1) q.add(new int[]{r, c});
        if (q.isEmpty() || q.size() == R * C) return -1;
        int dist = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            ArrayDeque<int[]> nq = new ArrayDeque<>();
            for (int[] cur : q) {
                for (int[] d : dirs) {
                    int nr = cur[0] + d[0], nc = cur[1] + d[1];
                    if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] == 0) {
                        grid[nr][nc] = 1;
                        nq.add(new int[]{nr, nc});
                    }
                }
            }
            if (!nq.isEmpty()) dist++;
            q = nq;
        }
        return dist;`,
    cpp: `        int R = grid.size(), C = grid[0].size();
        vector<pair<int,int>> q;
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (grid[r][c] == 1) q.push_back({r, c});
        if (q.empty() || (int)q.size() == R * C) return -1;
        int dist = 0;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty()) {
            vector<pair<int,int>> nq;
            for (auto& cur : q) {
                for (int d = 0; d < 4; d++) {
                    int nr = cur.first + dirs[d][0], nc = cur.second + dirs[d][1];
                    if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] == 0) {
                        grid[nr][nc] = 1;
                        nq.push_back({nr, nc});
                    }
                }
            }
            if (!nq.empty()) dist++;
            q = nq;
        }
        return dist;`,
    javascript: `    const R = grid.length, C = grid[0].length;
    let q = [];
    for (let r = 0; r < R; r++)
        for (let c = 0; c < C; c++)
            if (grid[r][c] === 1) q.push([r, c]);
    if (q.length === 0 || q.length === R * C) return -1;
    let dist = 0;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    while (q.length) {
        const nq = [];
        for (const [r, c] of q) {
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] === 0) {
                    grid[nr][nc] = 1;
                    nq.push([nr, nc]);
                }
            }
        }
        if (nq.length) dist++;
        q = nq;
    }
    return dist;`,
  },
  'shortest-path-in-binary-matrix': {
    python: `        R, C = len(grid), len(grid[0])
        if grid[0][0] != 0 or grid[R-1][C-1] != 0:
            return -1
        dirs = [(1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)]
        vis = [row[:] for row in grid]
        vis[0][0] = 1
        q = [(0, 0)]
        length = 1
        while q:
            nq = []
            for r, c in q:
                if r == R-1 and c == C-1:
                    return length
                for dr, dc in dirs:
                    nr, nc = r+dr, c+dc
                    if 0 <= nr < R and 0 <= nc < C and vis[nr][nc] == 0:
                        vis[nr][nc] = 1
                        nq.append((nr, nc))
            length += 1
            q = nq
        return -1`,
    java: `        int R = grid.length, C = grid[0].length;
        if (grid[0][0] != 0 || grid[R-1][C-1] != 0) return -1;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};
        int[][] vis = new int[R][C];
        for (int r = 0; r < R; r++) vis[r] = grid[r].clone();
        vis[0][0] = 1;
        ArrayDeque<int[]> q = new ArrayDeque<>();
        q.add(new int[]{0, 0});
        int length = 1;
        while (!q.isEmpty()) {
            ArrayDeque<int[]> nq = new ArrayDeque<>();
            for (int[] cur : q) {
                if (cur[0] == R-1 && cur[1] == C-1) return length;
                for (int[] d : dirs) {
                    int nr = cur[0] + d[0], nc = cur[1] + d[1];
                    if (nr >= 0 && nr < R && nc >= 0 && nc < C && vis[nr][nc] == 0) {
                        vis[nr][nc] = 1;
                        nq.add(new int[]{nr, nc});
                    }
                }
            }
            length++;
            q = nq;
        }
        return -1;`,
    cpp: `        int R = grid.size(), C = grid[0].size();
        if (grid[0][0] != 0 || grid[R-1][C-1] != 0) return -1;
        int dirs[8][2] = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};
        vector<vector<int>> vis = grid;
        vis[0][0] = 1;
        vector<pair<int,int>> q = {{0, 0}};
        int length = 1;
        while (!q.empty()) {
            vector<pair<int,int>> nq;
            for (auto& cur : q) {
                if (cur.first == R-1 && cur.second == C-1) return length;
                for (int d = 0; d < 8; d++) {
                    int nr = cur.first + dirs[d][0], nc = cur.second + dirs[d][1];
                    if (nr >= 0 && nr < R && nc >= 0 && nc < C && vis[nr][nc] == 0) {
                        vis[nr][nc] = 1;
                        nq.push_back({nr, nc});
                    }
                }
            }
            length++;
            q = nq;
        }
        return -1;`,
    javascript: `    const R = grid.length, C = grid[0].length;
    if (grid[0][0] !== 0 || grid[R-1][C-1] !== 0) return -1;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
    const vis = grid.map(row => row.slice());
    vis[0][0] = 1;
    let q = [[0, 0]], length = 1;
    while (q.length) {
        const nq = [];
        for (const [r, c] of q) {
            if (r === R-1 && c === C-1) return length;
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < R && nc >= 0 && nc < C && vis[nr][nc] === 0) {
                    vis[nr][nc] = 1;
                    nq.push([nr, nc]);
                }
            }
        }
        length++;
        q = nq;
    }
    return -1;`,
  },
  'number-of-provinces': {
    python: `        n = len(grid)
        par = list(range(n))
        def find(x):
            while par[x] != x:
                par[x] = par[par[x]]; x = par[x]
            return x
        for i in range(n):
            for j in range(i+1, n):
                if grid[i][j] == 1:
                    par[find(i)] = find(j)
        return len(set(find(i) for i in range(n)))`,
    java: `        int n = grid.length;
        int[] par = new int[n];
        for (int i = 0; i < n; i++) par[i] = i;
        for (int i = 0; i < n; i++)
            for (int j = i+1; j < n; j++)
                if (grid[i][j] == 1) par[find(par, i)] = find(par, j);
        int cnt = 0;
        for (int i = 0; i < n; i++) if (find(par, i) == i) cnt++;
        return cnt;
    }
    int find(int[] par, int x) {
        while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; }
        return x;`,
    cpp: `        int n = grid.size();
        vector<int> par(n);
        for (int i = 0; i < n; i++) par[i] = i;
        function<int(int)> find = [&](int x) {
            while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; }
            return x;
        };
        for (int i = 0; i < n; i++)
            for (int j = i+1; j < n; j++)
                if (grid[i][j] == 1) par[find(i)] = find(j);
        int cnt = 0;
        for (int i = 0; i < n; i++) if (find(i) == i) cnt++;
        return cnt;`,
    javascript: `    const n = grid.length;
    const par = [];
    for (let i = 0; i < n; i++) par[i] = i;
    const find = (x) => {
        while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; }
        return x;
    };
    for (let i = 0; i < n; i++)
        for (let j = i+1; j < n; j++)
            if (grid[i][j] === 1) par[find(i)] = find(j);
    let cnt = 0;
    for (let i = 0; i < n; i++) if (find(i) === i) cnt++;
    return cnt;`,
  },
  'find-the-town-judge': {
    python: `        score = [0] * (n + 1)
        for a, b in edges:
            score[a] -= 1
            score[b] += 1
        for i in range(1, n + 1):
            if score[i] == n - 1:
                return i
        return -1`,
    java: `        int[] score = new int[n + 1];
        for (int[] e : edges) { score[e[0]]--; score[e[1]]++; }
        for (int i = 1; i <= n; i++) if (score[i] == n - 1) return i;
        return -1;`,
    cpp: `        vector<int> score(n + 1, 0);
        for (auto& e : edges) { score[e[0]]--; score[e[1]]++; }
        for (int i = 1; i <= n; i++) if (score[i] == n - 1) return i;
        return -1;`,
    javascript: `    const score = new Array(n + 1).fill(0);
    for (const [a, b] of edges) { score[a]--; score[b]++; }
    for (let i = 1; i <= n; i++) if (score[i] === n - 1) return i;
    return -1;`,
  },
  'find-center-of-star-graph': {
    python: `        a, b = edges[0]
        c, d = edges[1]
        return a if (a == c or a == d) else b`,
    java: `        int a = edges[0][0], b = edges[0][1];
        int c = edges[1][0], d = edges[1][1];
        return (a == c || a == d) ? a : b;`,
    cpp: `        int a = edges[0][0], b = edges[0][1];
        int c = edges[1][0], d = edges[1][1];
        return (a == c || a == d) ? a : b;`,
    javascript: `    const [a, b] = edges[0];
    const [c, d] = edges[1];
    return (a === c || a === d) ? a : b;`,
  },
  'count-the-number-of-complete-components': {
    python: `        par = list(range(n))
        def find(x):
            while par[x] != x:
                par[x] = par[par[x]]; x = par[x]
            return x
        for a, b in edges:
            par[find(a)] = find(b)
        node = {}
        edge = {}
        for i in range(n):
            r = find(i)
            node[r] = node.get(r, 0) + 1
        for a, b in edges:
            r = find(a)
            edge[r] = edge.get(r, 0) + 1
        cnt = 0
        for r in node:
            k = node[r]
            e = edge.get(r, 0)
            if e == k * (k - 1) // 2:
                cnt += 1
        return cnt`,
    java: `        int[] par = new int[n];
        for (int i = 0; i < n; i++) par[i] = i;
        for (int[] e : edges) par[find(par, e[0])] = find(par, e[1]);
        Map<Integer,Integer> node = new HashMap<>(), edge = new HashMap<>();
        for (int i = 0; i < n; i++) { int r = find(par, i); node.put(r, node.getOrDefault(r, 0) + 1); }
        for (int[] e : edges) { int r = find(par, e[0]); edge.put(r, edge.getOrDefault(r, 0) + 1); }
        int cnt = 0;
        for (int r : node.keySet()) {
            int k = node.get(r), e = edge.getOrDefault(r, 0);
            if (e == k * (k - 1) / 2) cnt++;
        }
        return cnt;
    }
    int find(int[] par, int x) {
        while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; }
        return x;`,
    cpp: `        vector<int> par(n);
        for (int i = 0; i < n; i++) par[i] = i;
        function<int(int)> find = [&](int x) {
            while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; }
            return x;
        };
        for (auto& e : edges) par[find(e[0])] = find(e[1]);
        unordered_map<int,int> node, edge;
        for (int i = 0; i < n; i++) node[find(i)]++;
        for (auto& e : edges) edge[find(e[0])]++;
        int cnt = 0;
        for (auto& kv : node) {
            long long k = kv.second, e = edge.count(kv.first) ? edge[kv.first] : 0;
            if (e == k * (k - 1) / 2) cnt++;
        }
        return cnt;`,
    javascript: `    const par = [];
    for (let i = 0; i < n; i++) par[i] = i;
    const find = (x) => {
        while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; }
        return x;
    };
    for (const [a, b] of edges) par[find(a)] = find(b);
    const node = {}, edge = {};
    for (let i = 0; i < n; i++) { const r = find(i); node[r] = (node[r] || 0) + 1; }
    for (const [a, b] of edges) { const r = find(a); edge[r] = (edge[r] || 0) + 1; }
    let cnt = 0;
    for (const r in node) {
        const k = node[r], e = edge[r] || 0;
        if (e === k * (k - 1) / 2) cnt++;
    }
    return cnt;`,
  },
  'maximal-network-rank': {
    python: `        deg = [0] * n
        conn = set()
        for a, b in edges:
            deg[a] += 1
            deg[b] += 1
            conn.add((a, b))
            conn.add((b, a))
        best = 0
        for i in range(n):
            for j in range(i + 1, n):
                rank = deg[i] + deg[j] - (1 if (i, j) in conn else 0)
                if rank > best:
                    best = rank
        return best`,
    java: `        int[] deg = new int[n];
        Set<Integer> conn = new HashSet<>();
        for (int[] e : edges) {
            deg[e[0]]++; deg[e[1]]++;
            conn.add(e[0] * n + e[1]);
            conn.add(e[1] * n + e[0]);
        }
        int best = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                int rank = deg[i] + deg[j] - (conn.contains(i * n + j) ? 1 : 0);
                if (rank > best) best = rank;
            }
        return best;`,
    cpp: `        vector<int> deg(n, 0);
        unordered_set<int> conn;
        for (auto& e : edges) {
            deg[e[0]]++; deg[e[1]]++;
            conn.insert(e[0] * n + e[1]);
            conn.insert(e[1] * n + e[0]);
        }
        int best = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                int rank = deg[i] + deg[j] - (conn.count(i * n + j) ? 1 : 0);
                if (rank > best) best = rank;
            }
        return best;`,
    javascript: `    const deg = new Array(n).fill(0);
    const conn = new Set();
    for (const [a, b] of edges) {
        deg[a]++; deg[b]++;
        conn.add(a * n + b);
        conn.add(b * n + a);
    }
    let best = 0;
    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++) {
            const rank = deg[i] + deg[j] - (conn.has(i * n + j) ? 1 : 0);
            if (rank > best) best = rank;
        }
    return best;`,
  },
  'find-if-path-exists-in-graph': {
    python: `        par = list(range(n))
        def find(x):
            while par[x] != x:
                par[x] = par[par[x]]; x = par[x]
            return x
        for a, b in edges:
            par[find(a)] = find(b)
        return find(0) == find(n - 1)`,
    java: `        int[] par = new int[n];
        for (int i = 0; i < n; i++) par[i] = i;
        for (int[] e : edges) par[find(par, e[0])] = find(par, e[1]);
        return find(par, 0) == find(par, n - 1);
    }
    int find(int[] par, int x) {
        while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; }
        return x;`,
    cpp: `        vector<int> par(n);
        for (int i = 0; i < n; i++) par[i] = i;
        function<int(int)> find = [&](int x) {
            while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; }
            return x;
        };
        for (auto& e : edges) par[find(e[0])] = find(e[1]);
        return find(0) == find(n - 1);`,
    javascript: `    const par = [];
    for (let i = 0; i < n; i++) par[i] = i;
    const find = (x) => {
        while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; }
        return x;
    };
    for (const [a, b] of edges) par[find(a)] = find(b);
    return find(0) === find(n - 1);`,
  },
  'find-champion-ii': {
    python: `        indeg = [0] * n
        for a, b in edges:
            indeg[b] += 1
        champ, cnt = -1, 0
        for i in range(n):
            if indeg[i] == 0:
                champ = i
                cnt += 1
        return champ if cnt == 1 else -1`,
    java: `        int[] indeg = new int[n];
        for (int[] e : edges) indeg[e[1]]++;
        int champ = -1, cnt = 0;
        for (int i = 0; i < n; i++) if (indeg[i] == 0) { champ = i; cnt++; }
        return cnt == 1 ? champ : -1;`,
    cpp: `        vector<int> indeg(n, 0);
        for (auto& e : edges) indeg[e[1]]++;
        int champ = -1, cnt = 0;
        for (int i = 0; i < n; i++) if (indeg[i] == 0) { champ = i; cnt++; }
        return cnt == 1 ? champ : -1;`,
    javascript: `    const indeg = new Array(n).fill(0);
    for (const [a, b] of edges) indeg[b]++;
    let champ = -1, cnt = 0;
    for (let i = 0; i < n; i++) if (indeg[i] === 0) { champ = i; cnt++; }
    return cnt === 1 ? champ : -1;`,
  },
  'battleships-in-a-board': {
    python: `        R, C = len(grid), len(grid[0])
        cnt = 0
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 'X' and (r == 0 or grid[r-1][c] != 'X') and (c == 0 or grid[r][c-1] != 'X'):
                    cnt += 1
        return cnt`,
    java: `        int R = grid.length, C = grid[0].length, cnt = 0;
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (grid[r][c] == 'X' && (r == 0 || grid[r-1][c] != 'X') && (c == 0 || grid[r][c-1] != 'X'))
                    cnt++;
        return cnt;`,
    cpp: `        int R = grid.size(), C = grid[0].size(), cnt = 0;
        for (int r = 0; r < R; r++)
            for (int c = 0; c < C; c++)
                if (grid[r][c] == 'X' && (r == 0 || grid[r-1][c] != 'X') && (c == 0 || grid[r][c-1] != 'X'))
                    cnt++;
        return cnt;`,
    javascript: `    const R = grid.length, C = grid[0].length;
    let cnt = 0;
    for (let r = 0; r < R; r++)
        for (let c = 0; c < C; c++)
            if (grid[r][c] === 'X' && (r === 0 || grid[r-1][c] !== 'X') && (c === 0 || grid[r][c-1] !== 'X'))
                cnt++;
    return cnt;`,
  },
};
module.exports = { SOL };
