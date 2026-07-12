// Known-correct solutions for Batch F problems.
const SOL = {
  'meeting-rooms': {
    python: '        intervals.sort()\n        for i in range(1,len(intervals)):\n            if intervals[i][0]<intervals[i-1][1]:\n                return False\n        return True',
    javascript: '    intervals.sort((a,b)=>a[0]-b[0]); for(let i=1;i<intervals.length;i++)if(intervals[i][0]<intervals[i-1][1])return false; return true;',
    cpp: '        sort(intervals.begin(),intervals.end()); for(size_t i=1;i<intervals.size();i++)if(intervals[i][0]<intervals[i-1][1])return false; return true;',
    java: '        Arrays.sort(intervals,(a,b)->a[0]-b[0]); for(int i=1;i<intervals.length;i++)if(intervals[i][0]<intervals[i-1][1])return false; return true;',
  },
  'non-overlapping-intervals': {
    python: "        grid.sort(key=lambda x:x[1])\n        end=float('-inf'); kept=0\n        for s,e in grid:\n            if s>=end:\n                kept+=1; end=e\n        return len(grid)-kept",
    javascript: '    grid.sort((a,b)=>a[1]-b[1]); let end=-Infinity,kept=0; for(const iv of grid){if(iv[0]>=end){kept++;end=iv[1];}} return grid.length-kept;',
    cpp: '        sort(grid.begin(),grid.end(),[](const vector<int>&a,const vector<int>&b){return a[1]<b[1];}); long end=-1000000000L; int kept=0; for(auto& iv:grid){if(iv[0]>=end){kept++;end=iv[1];}} return grid.size()-kept;',
    java: '        Arrays.sort(grid,(a,b)->a[1]-b[1]); long end=-1000000000L; int kept=0; for(int[] iv:grid){if(iv[0]>=end){kept++;end=iv[1];}} return grid.length-kept;',
  },
  'meeting-rooms-ii': {
    python: '        starts=sorted(i[0] for i in grid)\n        ends=sorted(i[1] for i in grid)\n        rooms=cur=0; s=e=0\n        while s<len(starts):\n            if starts[s]<ends[e]:\n                cur+=1; s+=1; rooms=max(rooms,cur)\n            else:\n                cur-=1; e+=1\n        return rooms',
    javascript: '    const starts=grid.map(x=>x[0]).sort((a,b)=>a-b); const ends=grid.map(x=>x[1]).sort((a,b)=>a-b); let rooms=0,cur=0,s=0,e=0; while(s<starts.length){if(starts[s]<ends[e]){cur++;s++;rooms=Math.max(rooms,cur);}else{cur--;e++;}} return rooms;',
    cpp: '        vector<int> starts,ends; for(auto& iv:grid){starts.push_back(iv[0]);ends.push_back(iv[1]);} sort(starts.begin(),starts.end()); sort(ends.begin(),ends.end()); int rooms=0,cur=0,s=0,e=0,n=starts.size(); while(s<n){if(starts[s]<ends[e]){cur++;s++;rooms=max(rooms,cur);}else{cur--;e++;}} return rooms;',
    java: '        int n=grid.length; int[] starts=new int[n],ends=new int[n]; for(int i=0;i<n;i++){starts[i]=grid[i][0];ends[i]=grid[i][1];} Arrays.sort(starts); Arrays.sort(ends); int rooms=0,cur=0,s=0,e=0; while(s<n){if(starts[s]<ends[e]){cur++;s++;rooms=Math.max(rooms,cur);}else{cur--;e++;}} return rooms;',
  },
  'merge-intervals': {
    python: '        intervals=grid; intervals.sort()\n        res=[]\n        for s,e in intervals:\n            if res and s<=res[-1][1]:\n                res[-1][1]=max(res[-1][1],e)\n            else:\n                res.append([s,e])\n        return res',
    javascript: '    grid.sort((a,b)=>a[0]-b[0]||a[1]-b[1]); const res=[]; for(const iv of grid){if(res.length&&iv[0]<=res[res.length-1][1])res[res.length-1][1]=Math.max(res[res.length-1][1],iv[1]);else res.push([iv[0],iv[1]]);} return res;',
    cpp: '        sort(grid.begin(),grid.end()); vector<vector<int>> res; for(auto& iv:grid){if(!res.empty()&&iv[0]<=res.back()[1])res.back()[1]=max(res.back()[1],iv[1]);else res.push_back(iv);} return res;',
    java: '        Arrays.sort(grid,(a,b)->a[0]!=b[0]?a[0]-b[0]:a[1]-b[1]); List<int[]> res=new ArrayList<>(); for(int[] iv:grid){if(!res.isEmpty()&&iv[0]<=res.get(res.size()-1)[1])res.get(res.size()-1)[1]=Math.max(res.get(res.size()-1)[1],iv[1]);else res.add(new int[]{iv[0],iv[1]});} return res.toArray(new int[0][]);',
  },
  'rotate-image': {
    python: '        n=len(grid)\n        for i in range(n):\n            for j in range(i+1,n):\n                grid[i][j],grid[j][i]=grid[j][i],grid[i][j]\n        for row in grid:\n            row.reverse()\n        return grid',
    javascript: '    const n=grid.length; for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const t=grid[i][j];grid[i][j]=grid[j][i];grid[j][i]=t;} for(const row of grid)row.reverse(); return grid;',
    cpp: '        int n=grid.size(); for(int i=0;i<n;i++)for(int j=i+1;j<n;j++)swap(grid[i][j],grid[j][i]); for(auto& row:grid)reverse(row.begin(),row.end()); return grid;',
    java: '        int n=grid.length; for(int i=0;i<n;i++)for(int j=i+1;j<n;j++){int t=grid[i][j];grid[i][j]=grid[j][i];grid[j][i]=t;} for(int i=0;i<n;i++){for(int l=0,r=n-1;l<r;l++,r--){int t=grid[i][l];grid[i][l]=grid[i][r];grid[i][r]=t;}} return grid;',
  },
  'set-matrix-zeroes': {
    python: '        rows=set(); cols=set()\n        for i,row in enumerate(grid):\n            for j,v in enumerate(row):\n                if v==0: rows.add(i); cols.add(j)\n        for i in range(len(grid)):\n            for j in range(len(grid[0])):\n                if i in rows or j in cols: grid[i][j]=0\n        return grid',
    javascript: '    const rows={},cols={}; for(let i=0;i<grid.length;i++)for(let j=0;j<grid[0].length;j++)if(grid[i][j]===0){rows[i]=1;cols[j]=1;} for(let i=0;i<grid.length;i++)for(let j=0;j<grid[0].length;j++)if(rows[i]||cols[j])grid[i][j]=0; return grid;',
    cpp: '        int R=grid.size(),C=grid[0].size(); set<int> rows,cols; for(int i=0;i<R;i++)for(int j=0;j<C;j++)if(grid[i][j]==0){rows.insert(i);cols.insert(j);} for(int i=0;i<R;i++)for(int j=0;j<C;j++)if(rows.count(i)||cols.count(j))grid[i][j]=0; return grid;',
    java: '        int R=grid.length,C=grid[0].length; Set<Integer> rows=new HashSet<>(),cols=new HashSet<>(); for(int i=0;i<R;i++)for(int j=0;j<C;j++)if(grid[i][j]==0){rows.add(i);cols.add(j);} for(int i=0;i<R;i++)for(int j=0;j<C;j++)if(rows.contains(i)||cols.contains(j))grid[i][j]=0; return grid;',
  },
  'last-stone-weight': {
    python: '        import heapq\n        h=[-s for s in nums]\n        heapq.heapify(h)\n        while len(h)>1:\n            a=-heapq.heappop(h); b=-heapq.heappop(h)\n            if a!=b: heapq.heappush(h,-(a-b))\n        return -h[0] if h else 0',
    javascript: '    const h=nums.slice(); while(h.length>1){h.sort((x,y)=>x-y);const b=h.pop(),a=h.pop();if(a!==b)h.push(b-a);} return h.length?h[0]:0;',
    cpp: '        priority_queue<int> pq(nums.begin(),nums.end()); while(pq.size()>1){int a=pq.top();pq.pop();int b=pq.top();pq.pop();if(a!=b)pq.push(a-b);} return pq.empty()?0:pq.top();',
    java: '        PriorityQueue<Integer> pq=new PriorityQueue<>(Collections.reverseOrder()); for(int s:nums)pq.add(s); while(pq.size()>1){int a=pq.poll(),b=pq.poll();if(a!=b)pq.add(a-b);} return pq.isEmpty()?0:pq.peek();',
  },
};
module.exports = { SOL };
