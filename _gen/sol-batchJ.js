// Stub-body solutions for Batch J (fill into the generated stub).
const SOL = {
  'car-fleet': {
    python: '        idx=sorted(range(len(position)),key=lambda i:-position[i])\n        fleets=0; lead=-1.0\n        for i in idx:\n            t=(target-position[i])/speed[i]\n            if t>lead:\n                fleets+=1; lead=t\n        return fleets',
    javascript: '    const idx=position.map((_,i)=>i).sort((x,y)=>position[y]-position[x]); let fleets=0,lead=-1; for(const i of idx){const t=(target-position[i])/speed[i]; if(t>lead){fleets++;lead=t;}} return fleets;',
    cpp: '        int n=position.size(); vector<int> idx(n); for(int i=0;i<n;i++)idx[i]=i; sort(idx.begin(),idx.end(),[&](int x,int y){return position[x]>position[y];}); int fleets=0; double lead=-1; for(int i:idx){double t=(double)(target-position[i])/speed[i]; if(t>lead){fleets++;lead=t;}} return fleets;',
    java: '        int n=position.length; Integer[] idx=new Integer[n]; for(int i=0;i<n;i++)idx[i]=i; Arrays.sort(idx,(x,y)->position[y]-position[x]); int fleets=0; double lead=-1; for(int i:idx){double t=(double)(target-position[i])/speed[i]; if(t>lead){fleets++;lead=t;}} return fleets;',
  },
  'merge-triplets-to-form-target-triplet': {
    python: '        good=set()\n        for t in triplets:\n            if t[0]<=target[0] and t[1]<=target[1] and t[2]<=target[2]:\n                for i in range(3):\n                    if t[i]==target[i]: good.add(i)\n        return len(good)==3',
    javascript: '    const good={}; for(const t of triplets){if(t[0]<=target[0]&&t[1]<=target[1]&&t[2]<=target[2]){for(let i=0;i<3;i++)if(t[i]===target[i])good[i]=1;}} return good[0]&&good[1]&&good[2]?true:false;',
    cpp: '        set<int> good; for(auto& t:triplets){if(t[0]<=target[0]&&t[1]<=target[1]&&t[2]<=target[2]){for(int i=0;i<3;i++)if(t[i]==target[i])good.insert(i);}} return good.size()==3;',
    java: '        Set<Integer> good=new HashSet<>(); for(int[] t:triplets){if(t[0]<=target[0]&&t[1]<=target[1]&&t[2]<=target[2]){for(int i=0;i<3;i++)if(t[i]==target[i])good.add(i);}} return good.size()==3;',
  },
  'network-delay-time': {
    python: '        adj={i:[] for i in range(1,n+1)}\n        for u,v,w in times:\n            adj[u].append((v,w))\n        import heapq\n        dist={}; heap=[(0,k)]\n        while heap:\n            d,u=heapq.heappop(heap)\n            if u in dist: continue\n            dist[u]=d\n            for v,w in adj[u]:\n                if v not in dist: heapq.heappush(heap,(d+w,v))\n        if len(dist)<n: return -1\n        return max(dist.values())',
    javascript: '    const adj={}; for(let i=1;i<=n;i++)adj[i]=[]; for(const e of times)adj[e[0]].push([e[1],e[2]]); const dist={},heap=[[0,k]]; while(heap.length){heap.sort((x,y)=>x[0]-y[0]);const t=heap.shift(),d=t[0],u=t[1]; if(dist[u]!==undefined)continue; dist[u]=d; for(const e of adj[u])if(dist[e[0]]===undefined)heap.push([d+e[1],e[0]]);} let cnt=0,mx=0; for(let i=1;i<=n;i++){if(dist[i]===undefined)return -1;cnt++;mx=Math.max(mx,dist[i]);} return mx;',
    cpp: '        vector<vector<pair<int,int>>> adj(n+1); for(auto& e:times)adj[e[0]].push_back({e[1],e[2]}); vector<int> dist(n+1,-1); priority_queue<pair<int,int>,vector<pair<int,int>>,greater<>> pq; pq.push({0,k}); while(!pq.empty()){auto cur=pq.top();pq.pop();int d=cur.first,u=cur.second; if(dist[u]!=-1)continue; dist[u]=d; for(auto& e:adj[u])if(dist[e.first]==-1)pq.push({d+e.second,e.first});} int mx=0; for(int i=1;i<=n;i++){if(dist[i]==-1)return -1; mx=max(mx,dist[i]);} return mx;',
    java: '        List<int[]>[] adj=new List[n+1]; for(int i=1;i<=n;i++)adj[i]=new ArrayList<>(); for(int[] e:times)adj[e[0]].add(new int[]{e[1],e[2]}); int[] dist=new int[n+1]; Arrays.fill(dist,-1); PriorityQueue<int[]> pq=new PriorityQueue<>((x,y)->x[0]-y[0]); pq.add(new int[]{0,k}); while(!pq.isEmpty()){int[] cur=pq.poll();int d=cur[0],u=cur[1]; if(dist[u]!=-1)continue; dist[u]=d; for(int[] e:adj[u])if(dist[e[0]]==-1)pq.add(new int[]{d+e[1],e[0]});} int mx=0; for(int i=1;i<=n;i++){if(dist[i]==-1)return -1; mx=Math.max(mx,dist[i]);} return mx;',
  },
};
module.exports = { SOL };
