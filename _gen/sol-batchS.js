// Batch S: full-class solutions for the batch-22 design (OPS) problems on the
// theme STACKS, QUEUES, and DESIGN. Marked FULL (displayed verbatim, not
// filled into a stub) exactly like sol-batchK.js.
const FULL = true;
const SOL = {
  'implement-queue-using-stacks': {
    python: `class MyQueue:
    def __init__(self):
        self.inp = []
        self.out = []
    def push(self, x):
        self.inp.append(x)
    def _shift(self):
        if not self.out:
            while self.inp:
                self.out.append(self.inp.pop())
    def pop(self):
        self._shift()
        return self.out.pop()
    def peek(self):
        self._shift()
        return self.out[-1]
    def empty(self):
        return not self.inp and not self.out`,
    javascript: `class MyQueue {
  constructor() { this.inp = []; this.out = []; }
  push(x) { this.inp.push(x); }
  _shift() { if (this.out.length === 0) { while (this.inp.length) this.out.push(this.inp.pop()); } }
  pop() { this._shift(); return this.out.pop(); }
  peek() { this._shift(); return this.out[this.out.length - 1]; }
  empty() { return this.inp.length === 0 && this.out.length === 0; }
}`,
    cpp: `class MyQueue {
    stack<int> inp, out;
    void shift() { if (out.empty()) { while (!inp.empty()) { out.push(inp.top()); inp.pop(); } } }
public:
    MyQueue() {}
    void push(int x) { inp.push(x); }
    int pop() { shift(); int v = out.top(); out.pop(); return v; }
    int peek() { shift(); return out.top(); }
    bool empty() { return inp.empty() && out.empty(); }
};`,
    java: `class MyQueue {
    Deque<Integer> inp = new ArrayDeque<>();
    Deque<Integer> out = new ArrayDeque<>();
    public MyQueue() {}
    public void push(int x) { inp.push(x); }
    private void shift() { if (out.isEmpty()) { while (!inp.isEmpty()) out.push(inp.pop()); } }
    public int pop() { shift(); return out.pop(); }
    public int peek() { shift(); return out.peek(); }
    public boolean empty() { return inp.isEmpty() && out.isEmpty(); }
}`,
  },
  'implement-stack-using-queues': {
    python: `from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()
    def push(self, x):
        self.q.append(x)
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())
    def pop(self):
        return self.q.popleft()
    def top(self):
        return self.q[0]
    def empty(self):
        return not self.q`,
    javascript: `class MyStack {
  constructor() { this.q = []; }
  push(x) { this.q.push(x); for (let i = 0; i < this.q.length - 1; i++) this.q.push(this.q.shift()); }
  pop() { return this.q.shift(); }
  top() { return this.q[0]; }
  empty() { return this.q.length === 0; }
}`,
    cpp: `class MyStack {
    queue<int> q;
public:
    MyStack() {}
    void push(int x) { q.push(x); for (int i = 0; i < (int)q.size() - 1; i++) { q.push(q.front()); q.pop(); } }
    int pop() { int v = q.front(); q.pop(); return v; }
    int top() { return q.front(); }
    bool empty() { return q.empty(); }
};`,
    java: `class MyStack {
    Queue<Integer> q = new LinkedList<>();
    public MyStack() {}
    public void push(int x) { q.add(x); for (int i = 0; i < q.size() - 1; i++) q.add(q.poll()); }
    public int pop() { return q.poll(); }
    public int top() { return q.peek(); }
    public boolean empty() { return q.isEmpty(); }
}`,
  },
  'design-hashmap': {
    python: `class MyHashMap:
    def __init__(self):
        self.n = 1009
        self.buckets = [[] for _ in range(self.n)]
    def put(self, key, value):
        b = self.buckets[key % self.n]
        for p in b:
            if p[0] == key:
                p[1] = value
                return
        b.append([key, value])
    def get(self, key):
        for p in self.buckets[key % self.n]:
            if p[0] == key:
                return p[1]
        return -1
    def remove(self, key):
        b = self.buckets[key % self.n]
        for i in range(len(b)):
            if b[i][0] == key:
                b.pop(i)
                return`,
    javascript: `class MyHashMap {
  constructor() { this.n = 1009; this.buckets = Array.from({ length: this.n }, () => []); }
  put(key, value) {
    const b = this.buckets[key % this.n];
    for (const p of b) if (p[0] === key) { p[1] = value; return; }
    b.push([key, value]);
  }
  get(key) {
    for (const p of this.buckets[key % this.n]) if (p[0] === key) return p[1];
    return -1;
  }
  remove(key) {
    const b = this.buckets[key % this.n];
    for (let i = 0; i < b.length; i++) if (b[i][0] === key) { b.splice(i, 1); return; }
  }
}`,
    cpp: `class MyHashMap {
    static const int N = 1009;
    vector<vector<pair<int,int>>> buckets;
public:
    MyHashMap() : buckets(N) {}
    void put(int key, int value) {
        auto& b = buckets[key % N];
        for (auto& p : b) if (p.first == key) { p.second = value; return; }
        b.push_back({key, value});
    }
    int get(int key) {
        for (auto& p : buckets[key % N]) if (p.first == key) return p.second;
        return -1;
    }
    void remove(int key) {
        auto& b = buckets[key % N];
        for (size_t i = 0; i < b.size(); i++) if (b[i].first == key) { b.erase(b.begin() + i); return; }
    }
};`,
    java: `class MyHashMap {
    static final int N = 1009;
    List<int[]>[] buckets;
    public MyHashMap() {
        buckets = new List[N];
        for (int i = 0; i < N; i++) buckets[i] = new ArrayList<>();
    }
    public void put(int key, int value) {
        List<int[]> b = buckets[key % N];
        for (int[] p : b) if (p[0] == key) { p[1] = value; return; }
        b.add(new int[]{key, value});
    }
    public int get(int key) {
        for (int[] p : buckets[key % N]) if (p[0] == key) return p[1];
        return -1;
    }
    public void remove(int key) {
        List<int[]> b = buckets[key % N];
        for (int i = 0; i < b.size(); i++) if (b.get(i)[0] == key) { b.remove(i); return; }
    }
}`,
  },
  'design-hashset': {
    python: `class MyHashSet:
    def __init__(self):
        self.n = 1009
        self.buckets = [[] for _ in range(self.n)]
    def add(self, key):
        b = self.buckets[key % self.n]
        if key not in b:
            b.append(key)
    def contains(self, key):
        return key in self.buckets[key % self.n]
    def remove(self, key):
        b = self.buckets[key % self.n]
        if key in b:
            b.remove(key)`,
    javascript: `class MyHashSet {
  constructor() { this.n = 1009; this.buckets = Array.from({ length: this.n }, () => []); }
  add(key) { const b = this.buckets[key % this.n]; if (b.indexOf(key) === -1) b.push(key); }
  contains(key) { return this.buckets[key % this.n].indexOf(key) !== -1; }
  remove(key) { const b = this.buckets[key % this.n]; const i = b.indexOf(key); if (i !== -1) b.splice(i, 1); }
}`,
    cpp: `class MyHashSet {
    static const int N = 1009;
    vector<vector<int>> buckets;
public:
    MyHashSet() : buckets(N) {}
    void add(int key) {
        auto& b = buckets[key % N];
        for (int x : b) if (x == key) return;
        b.push_back(key);
    }
    bool contains(int key) {
        for (int x : buckets[key % N]) if (x == key) return true;
        return false;
    }
    void remove(int key) {
        auto& b = buckets[key % N];
        for (size_t i = 0; i < b.size(); i++) if (b[i] == key) { b.erase(b.begin() + i); return; }
    }
};`,
    java: `class MyHashSet {
    static final int N = 1009;
    List<Integer>[] buckets;
    public MyHashSet() {
        buckets = new List[N];
        for (int i = 0; i < N; i++) buckets[i] = new ArrayList<>();
    }
    public void add(int key) {
        List<Integer> b = buckets[key % N];
        if (!b.contains(key)) b.add(key);
    }
    public boolean contains(int key) {
        return buckets[key % N].contains(key);
    }
    public void remove(int key) {
        buckets[key % N].remove(Integer.valueOf(key));
    }
}`,
  },
  'find-median-from-data-stream': {
    python: `import heapq

class MedianFinder:
    def __init__(self):
        self.lo = []  # max-heap via negation (lower half)
        self.hi = []  # min-heap (upper half)
    def addNum(self, num):
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))
    def findMedian(self):
        if len(self.lo) > len(self.hi):
            return float(-self.lo[0])
        return (-self.lo[0] + self.hi[0]) / 2.0`,
    javascript: `// JavaScript has no built-in heap, so this keeps a sorted array via
// binary-search insertion. The two-heap approach (see Python/C++/Java) is
// the O(log n) optimum you'd mention in an interview.
class MedianFinder {
    constructor() { this.a = []; }
    addNum(num) {
        let lo = 0, hi = this.a.length;
        while (lo < hi) { const m = (lo + hi) >> 1; if (this.a[m] < num) lo = m + 1; else hi = m; }
        this.a.splice(lo, 0, num);
    }
    findMedian() {
        const n = this.a.length;
        if (n % 2 === 1) return this.a[(n - 1) / 2];
        return (this.a[n / 2 - 1] + this.a[n / 2]) / 2;
    }
}`,
    cpp: `class MedianFinder {
public:
    priority_queue<int> lo;                                  // max-heap (lower half)
    priority_queue<int, vector<int>, greater<int>> hi;       // min-heap (upper half)
    MedianFinder() {}
    void addNum(int num) {
        lo.push(num);
        hi.push(lo.top()); lo.pop();
        if (hi.size() > lo.size()) { lo.push(hi.top()); hi.pop(); }
    }
    double findMedian() {
        if (lo.size() > hi.size()) return lo.top();
        return (lo.top() + hi.top()) / 2.0;
    }
};`,
    java: `class MedianFinder {
    private PriorityQueue<Integer> lo = new PriorityQueue<>(Collections.reverseOrder()); // lower half
    private PriorityQueue<Integer> hi = new PriorityQueue<>();                            // upper half
    public MedianFinder() {}
    public void addNum(int num) {
        lo.offer(num);
        hi.offer(lo.poll());
        if (hi.size() > lo.size()) lo.offer(hi.poll());
    }
    public double findMedian() {
        if (lo.size() > hi.size()) return lo.peek();
        return (lo.peek() + hi.peek()) / 2.0;
    }
}`,
  },
};
module.exports = { SOL, FULL };
// (continued below)

