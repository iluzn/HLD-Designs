// Batch K: stateful "design" problems driven by an operations-replay harness.
// Each test case is a sequence of method calls; the harness constructs the
// user's class and dispatches each call, printing return values joined by '|'
// (null for constructors/void). This mirrors LeetCode's design-problem format.
const { randInt, ln } = require('./gen.js');

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
function rw(minL, maxL, al) { var L = randInt(minL, maxL), s = ''; for (var i = 0; i < L; i++) s += al[randInt(0, al.length - 1)]; return s; }

// Build the four-language ops-replay harness for a class. dispatch is a small
// per-language map of opName -> code producing a "token" pushed to _res.
function opsHarness(className, py, js, cpp, java) {
  return {
    python: ln('import sys', '_L=sys.stdin.read().split("\\n"); _i=0', '_T=int(_L[_i]); _i+=1; _out=[]', 'for _c in range(_T):', '    _m=int(_L[_i]); _i+=1; _res=[]; _o=None', '    for _j in range(_m):', '        _p=_L[_i].split(); _i+=1; _op=_p[0]', py, "    _out.append('|'.join(_res))", 'print("\\n".join(_out))'),
    javascript: ln("const _L=require('fs').readFileSync(0,'utf8').split('\\n'); let _i=0;", 'const _T=+_L[_i++]; const _out=[];', 'for(let _c=0;_c<_T;_c++){ const _m=+_L[_i++]; const _res=[]; let _o=null;', ' for(let _j=0;_j<_m;_j++){ const _p=(_L[_i++]||"").split(/\\s+/).filter(x=>x.length); const _op=_p[0];', js, ' } _out.push(_res.join("|")); }', 'console.log(_out.join("\\n"));'),
    cpp: ln('int main(){ string _line; getline(cin,_line); int _T=stoi(_line);', ' for(int _c=0;_c<_T;_c++){ getline(cin,_line); int _m=stoi(_line); vector<string> _res; ' + className + '* _o=nullptr;', '  for(int _j=0;_j<_m;_j++){ getline(cin,_line); istringstream _is(_line); string _op; _is>>_op;', cpp, '  }', '  string _s; for(size_t _k=0;_k<_res.size();_k++){ if(_k)_s+="|"; _s+=_res[_k]; } cout<<_s<<"\\n";', ' }', '}'),
    java: ln('public class Main {', '  public static void main(String[] a){ Scanner sc=new Scanner(System.in); int T=Integer.parseInt(sc.nextLine().trim()); StringBuilder sb=new StringBuilder();', '    for(int c=0;c<T;c++){ int m=Integer.parseInt(sc.nextLine().trim()); List<String> res=new ArrayList<>(); ' + className + ' o=null;', '      for(int j=0;j<m;j++){ String[] p=sc.nextLine().trim().split("\\\\s+"); String op=p[0];', java, '      }', '      sb.append(String.join("|",res)).append("\\n");', '    }', '    System.out.print(sb);', '  }', '}'),
  };
}

const MORE15 = [];

// ---- Min Stack ----
MORE15.push({ slug: 'min-stack', title: 'Min Stack', difficulty: 'medium', topics: ['Stack', 'Design'], type: 'OPS',
  desc: '<p>Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement <code>MinStack</code> with <code>push(val)</code>, <code>pop()</code>, <code>top()</code>, and <code>getMin()</code>.</p>',
  examples: [{ in: 'operations = ["MinStack","push","push","push","getMin","pop","top","getMin"], values = [[],[-2],[0],[-3],[],[],[],[]]', out: '[null,null,null,null,-3,null,0,-2]' }],
  constraints: ['-2^31 &lt;= val &lt;= 2^31 - 1', 'pop, top, getMin are only called on non-empty stacks.', 'At most 3*10^4 calls.'],
  editorial: ED({ intuition: 'The trick is O(1) <code>getMin</code>. Keep a second stack (or store pairs) that tracks the minimum <em>as of</em> each push, so the current minimum is always on top of that auxiliary stack.', approach: ['On push, also push <code>min(val, currentMin)</code> onto a mins stack.', 'On pop, pop both stacks in lockstep.', 'top reads the value stack top; getMin reads the mins stack top.'], code: 'class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.mins = []\n    def push(self, val):\n        self.stack.append(val)\n        self.mins.append(val if not self.mins else min(val, self.mins[-1]))\n    def pop(self):\n        self.stack.pop(); self.mins.pop()\n    def top(self):\n        return self.stack[-1]\n    def getMin(self):\n        return self.mins[-1]', time: 'O(1)', timeWhy: 'every operation is constant time.', space: 'O(n)', spaceWhy: 'the auxiliary mins stack.', pitfalls: ['Push the running min alongside every value so pop stays O(1) and consistent.'] }),
  custom: {
    python: { stub: ln('class MinStack:', '    def __init__(self):', '        # Write your code here', '        pass', '    def push(self, val):', '        pass', '    def pop(self):', '        pass', '    def top(self):', '        return 0', '    def getMin(self):', '        return 0'),
      harness: null },
    javascript: { stub: ln('class MinStack {', '    constructor() {', '        // Write your code here', '    }', '    push(val) {}', '    pop() {}', '    top() { return 0; }', '    getMin() { return 0; }', '}'), harness: null },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class MinStack {', 'public:', '    MinStack() {', '        // Write your code here', '    }', '    void push(int val) {}', '    void pop() {}', '    int top() { return 0; }', '    int getMin() { return 0; }', '};'), harness: null },
    java: { stub: ln('import java.util.*;', '', 'class MinStack {', '    public MinStack() {', '        // Write your code here', '    }', '    public void push(int val) {}', '    public void pop() {}', '    public int top() { return 0; }', '    public int getMin() { return 0; }', '}'), harness: null },
  },
  gen: function () {
    var o = [[[{ name: 'MinStack', a: [] }, { name: 'push', a: [-2] }, { name: 'push', a: [0] }, { name: 'push', a: [-3] }, { name: 'getMin', a: [] }, { name: 'pop', a: [] }, { name: 'top', a: [] }, { name: 'getMin', a: [] }]]];
    for (var k = 0; k < 34; k++) { var ops = [{ name: 'MinStack', a: [] }], size = 0, n = randInt(3, 12); for (var i = 0; i < n; i++) { if (size === 0 || Math.random() < 0.5) { ops.push({ name: 'push', a: [randInt(-20, 20)] }); size++; } else { var c = Math.random(); if (c < 0.34) { ops.push({ name: 'pop', a: [] }); size--; } else if (c < 0.67) ops.push({ name: 'top', a: [] }); else ops.push({ name: 'getMin', a: [] }); } } o.push([ops]); }
    return o;
  },
  ref: function (a) { var st = [], mins = [], res = []; a[0].forEach(function (o) { if (o.name === 'MinStack') res.push('null'); else if (o.name === 'push') { var v = o.a[0]; st.push(v); mins.push(mins.length ? Math.min(mins[mins.length - 1], v) : v); res.push('null'); } else if (o.name === 'pop') { st.pop(); mins.pop(); res.push('null'); } else if (o.name === 'top') res.push(String(st[st.length - 1])); else if (o.name === 'getMin') res.push(String(mins[mins.length - 1])); }); return res.join('|'); } });

// ---- Implement Trie (Prefix Tree) ----
MORE15.push({ slug: 'implement-trie-prefix-tree', title: 'Implement Trie (Prefix Tree)', difficulty: 'medium', topics: ['Trie', 'Design', 'Hash Table', 'String'], type: 'OPS',
  desc: '<p>Implement a trie with <code>insert(word)</code>, <code>search(word)</code> (returns whether the exact word was inserted), and <code>startsWith(prefix)</code> (returns whether any inserted word has the given prefix).</p>',
  examples: [{ in: 'operations = ["Trie","insert","search","search","startsWith","insert","search"], values = [[],["apple"],["apple"],["app"],["app"],["app"],["app"]]', out: '[null,null,true,false,true,null,true]' }],
  constraints: ['1 &lt;= word.length, prefix.length &lt;= 2000', 'Words consist of lowercase English letters.', 'At most 3*10^4 calls.'],
  editorial: ED({ intuition: 'A trie stores words along shared prefixes. Each node has up to 26 children and a flag marking the end of a complete word, so both exact search and prefix search walk the same path.', approach: ['Each node holds a children map and an <code>isEnd</code> flag.', 'insert walks/creates nodes for each character, marking the last as end.', 'search walks the path and checks isEnd; startsWith walks the path and only checks it exists.'], code: 'class Trie:\n    def __init__(self):\n        self.children = {}\n        self.end = False\n    def insert(self, word):\n        node = self\n        for c in word:\n            node = node.children.setdefault(c, Trie())\n        node.end = True\n    def _find(self, word):\n        node = self\n        for c in word:\n            if c not in node.children:\n                return None\n            node = node.children[c]\n        return node\n    def search(self, word):\n        n = self._find(word)\n        return n is not None and n.end\n    def startsWith(self, prefix):\n        return self._find(prefix) is not None', time: 'O(L)', timeWhy: 'each operation walks the word length L.', space: 'O(total chars)', spaceWhy: 'nodes for every distinct prefix.' }),
  custom: {
    python: { stub: ln('class Trie:', '    def __init__(self):', '        # Write your code here', '        pass', '    def insert(self, word):', '        pass', '    def search(self, word):', '        return False', '    def startsWith(self, prefix):', '        return False'), harness: null },
    javascript: { stub: ln('class Trie {', '    constructor() {', '        // Write your code here', '    }', '    insert(word) {}', '    search(word) { return false; }', '    startsWith(prefix) { return false; }', '}'), harness: null },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class Trie {', 'public:', '    Trie() {', '        // Write your code here', '    }', '    void insert(string word) {}', '    bool search(string word) { return false; }', '    bool startsWith(string prefix) { return false; }', '};'), harness: null },
    java: { stub: ln('import java.util.*;', '', 'class Trie {', '    public Trie() {', '        // Write your code here', '    }', '    public void insert(String word) {}', '    public boolean search(String word) { return false; }', '    public boolean startsWith(String prefix) { return false; }', '}'), harness: null },
  },
  gen: function () {
    var o = [[[{ name: 'Trie', a: [] }, { name: 'insert', a: ['apple'] }, { name: 'search', a: ['apple'] }, { name: 'search', a: ['app'] }, { name: 'startsWith', a: ['app'] }, { name: 'insert', a: ['app'] }, { name: 'search', a: ['app'] }]]];
    for (var k = 0; k < 34; k++) { var ops = [{ name: 'Trie', a: [] }], n = randInt(3, 12); for (var i = 0; i < n; i++) { var r = Math.random(); if (r < 0.45) ops.push({ name: 'insert', a: [rw(1, 4, 'ab')] }); else if (r < 0.72) ops.push({ name: 'search', a: [rw(1, 4, 'ab')] }); else ops.push({ name: 'startsWith', a: [rw(1, 3, 'ab')] }); } o.push([ops]); }
    return o;
  },
  ref: function (a) { var words = {}, res = []; a[0].forEach(function (o) { if (o.name === 'Trie') res.push('null'); else if (o.name === 'insert') { words[o.a[0]] = 1; res.push('null'); } else if (o.name === 'search') res.push(words[o.a[0]] ? 'true' : 'false'); else if (o.name === 'startsWith') { var pre = o.a[0]; res.push(Object.keys(words).some(function (w) { return w.indexOf(pre) === 0; }) ? 'true' : 'false'); } }); return res.join('|'); } });

// ---- Design Add and Search Words Data Structure ----
MORE15.push({ slug: 'design-add-and-search-words-data-structure', title: 'Design Add and Search Words Data Structure', difficulty: 'medium', topics: ['Trie', 'Design', 'DFS', 'String'], type: 'OPS',
  desc: "<p>Design a data structure with <code>addWord(word)</code> and <code>search(word)</code>. In search, a <code>.</code> can match any single letter. search returns whether any added word matches.</p>",
  examples: [{ in: 'operations = ["WordDictionary","addWord","addWord","addWord","search","search","search","search"], values = [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]', out: '[null,null,null,null,false,true,true,true]' }],
  constraints: ['1 &lt;= word.length &lt;= 25', 'Added words are lowercase letters; search words may contain ".".', 'At most 10^4 calls.'],
  editorial: ED({ intuition: 'This is a trie plus wildcard search. On a normal character you descend one child; on a <code>.</code> you must try every child (a DFS branch).', approach: ['Store words in a trie keyed by length and characters.', 'addWord inserts normally.', 'search walks the trie; at a "." it recurses into all children, succeeding if any branch reaches an end node.'], code: 'class WordDictionary:\n    def __init__(self):\n        self.children = {}\n        self.end = False\n    def addWord(self, word):\n        node = self\n        for c in word:\n            node = node.children.setdefault(c, WordDictionary())\n        node.end = True\n    def search(self, word):\n        def dfs(node, i):\n            if i == len(word):\n                return node.end\n            c = word[i]\n            if c == ".":\n                return any(dfs(ch, i+1) for ch in node.children.values())\n            return c in node.children and dfs(node.children[c], i+1)\n        return dfs(self, 0)', time: 'O(26^d * L)', timeWhy: 'wildcards can branch across 26 children at each dotted position.', space: 'O(total chars)', spaceWhy: 'the trie nodes.', pitfalls: ['A "." must try every child, not just skip a position.'] }),
  custom: {
    python: { stub: ln('class WordDictionary:', '    def __init__(self):', '        # Write your code here', '        pass', '    def addWord(self, word):', '        pass', '    def search(self, word):', '        return False'), harness: null },
    javascript: { stub: ln('class WordDictionary {', '    constructor() {', '        // Write your code here', '    }', '    addWord(word) {}', '    search(word) { return false; }', '}'), harness: null },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class WordDictionary {', 'public:', '    WordDictionary() {', '        // Write your code here', '    }', '    void addWord(string word) {}', '    bool search(string word) { return false; }', '};'), harness: null },
    java: { stub: ln('import java.util.*;', '', 'class WordDictionary {', '    public WordDictionary() {', '        // Write your code here', '    }', '    public void addWord(String word) {}', '    public boolean search(String word) { return false; }', '}'), harness: null },
  },
  gen: function () {
    var o = [[[{ name: 'WordDictionary', a: [] }, { name: 'addWord', a: ['bad'] }, { name: 'addWord', a: ['dad'] }, { name: 'addWord', a: ['mad'] }, { name: 'search', a: ['pad'] }, { name: 'search', a: ['bad'] }, { name: 'search', a: ['.ad'] }, { name: 'search', a: ['b..'] }]]];
    for (var k = 0; k < 34; k++) { var ops = [{ name: 'WordDictionary', a: [] }], n = randInt(3, 12); for (var i = 0; i < n; i++) { if (Math.random() < 0.45) ops.push({ name: 'addWord', a: [rw(1, 3, 'ab')] }); else { var L = randInt(1, 3), s = ''; for (var j = 0; j < L; j++) s += (Math.random() < 0.4 ? '.' : 'ab'[randInt(0, 1)]); ops.push({ name: 'search', a: [s] }); } } o.push([ops]); }
    return o;
  },
  ref: function (a) { var words = [], res = []; a[0].forEach(function (o) { if (o.name === 'WordDictionary') res.push('null'); else if (o.name === 'addWord') { words.push(o.a[0]); res.push('null'); } else if (o.name === 'search') { var pat = o.a[0]; res.push(words.some(function (w) { if (w.length !== pat.length) return false; for (var i = 0; i < w.length; i++) if (pat[i] !== '.' && pat[i] !== w[i]) return false; return true; }) ? 'true' : 'false'); } }); return res.join('|'); } });

// ---- Time Based Key-Value Store ----
MORE15.push({ slug: 'time-based-key-value-store', title: 'Time Based Key-Value Store', difficulty: 'medium', topics: ['Hash Table', 'Binary Search', 'Design'], type: 'OPS',
  desc: '<p>Design <code>TimeMap</code> with <code>set(key, value, timestamp)</code> and <code>get(key, timestamp)</code>. get returns the value set for <code>key</code> with the largest timestamp <code>&lt;= timestamp</code>, or an empty string if none.</p>',
  examples: [{ in: 'operations = ["TimeMap","set","get","get","set","get","get"], values = [[],["foo","bar",1],["foo",1],["foo",3],["foo","bar2",4],["foo",4],["foo",5]]', out: '[null,null,bar,bar,null,bar2,bar2]' }],
  constraints: ['1 &lt;= key.length, value.length &lt;= 100', 'set timestamps are strictly increasing per problem.', 'At most 2*10^5 calls.'],
  editorial: ED({ intuition: 'Because set timestamps are increasing, each key stores an ascending list of (timestamp, value). A get is then a binary search for the rightmost timestamp not exceeding the query.', approach: ['Keep a map from key to a list of (timestamp, value) pairs appended in order.', 'For get, binary search that list for the largest timestamp &lt;= query.', 'Return the paired value, or "" if none qualifies.'], code: 'import bisect\n\nclass TimeMap:\n    def __init__(self):\n        self.store = {}\n    def set(self, key, value, timestamp):\n        self.store.setdefault(key, []).append((timestamp, value))\n    def get(self, key, timestamp):\n        arr = self.store.get(key, [])\n        i = bisect.bisect_right(arr, (timestamp, chr(127)))\n        return arr[i-1][1] if i else ""', time: 'O(log n) get', timeWhy: 'binary search per get; O(1) amortized set.', space: 'O(n)', spaceWhy: 'all set entries.' }),
  custom: {
    python: { stub: ln('class TimeMap:', '    def __init__(self):', '        # Write your code here', '        pass', '    def set(self, key, value, timestamp):', '        pass', '    def get(self, key, timestamp):', '        return ""'), harness: null },
    javascript: { stub: ln('class TimeMap {', '    constructor() {', '        // Write your code here', '    }', '    set(key, value, timestamp) {}', '    get(key, timestamp) { return ""; }', '}'), harness: null },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class TimeMap {', 'public:', '    TimeMap() {', '        // Write your code here', '    }', '    void set(string key, string value, int timestamp) {}', '    string get(string key, int timestamp) { return ""; }', '};'), harness: null },
    java: { stub: ln('import java.util.*;', '', 'class TimeMap {', '    public TimeMap() {', '        // Write your code here', '    }', '    public void set(String key, String value, int timestamp) {}', '    public String get(String key, int timestamp) { return ""; }', '}'), harness: null },
  },
  gen: function () {
    var o = [[[{ name: 'TimeMap', a: [] }, { name: 'set', a: ['foo', 'bar', 1] }, { name: 'get', a: ['foo', 1] }, { name: 'get', a: ['foo', 3] }, { name: 'set', a: ['foo', 'bar2', 4] }, { name: 'get', a: ['foo', 4] }, { name: 'get', a: ['foo', 5] }]]];
    for (var k = 0; k < 32; k++) { var ops = [{ name: 'TimeMap', a: [] }], ts = 1, n = randInt(3, 12); for (var i = 0; i < n; i++) { var key = 'ab'[randInt(0, 1)]; if (Math.random() < 0.5) { ops.push({ name: 'set', a: [key, 'v' + randInt(0, 9), ts] }); ts++; } else ops.push({ name: 'get', a: [key, randInt(0, ts + 2)] }); } o.push([ops]); }
    return o;
  },
  ref: function (a) { var store = {}, res = []; a[0].forEach(function (o) { if (o.name === 'TimeMap') res.push('null'); else if (o.name === 'set') { var k = o.a[0], v = o.a[1], t = +o.a[2]; (store[k] = store[k] || []).push([t, v]); res.push('null'); } else if (o.name === 'get') { var k = o.a[0], t = +o.a[1], arr = store[k] || [], best = ''; for (var i = 0; i < arr.length; i++) if (arr[i][0] <= t) best = arr[i][1]; res.push(best); } }); return res.join('|'); } });

// ---- LRU Cache ----
MORE15.push({ slug: 'lru-cache', title: 'LRU Cache', difficulty: 'medium', topics: ['Hash Table', 'Linked List', 'Design'], type: 'OPS',
  desc: '<p>Design an LRU (Least Recently Used) cache with <code>get(key)</code> and <code>put(key, value)</code>, both O(1). The constructor takes a positive <code>capacity</code>. <code>get</code> returns the value or -1; <code>put</code> inserts/updates and evicts the least recently used key when over capacity.</p>',
  examples: [{ in: 'operations = ["LRUCache","put","put","get","put","get","put","get","get","get"], values = [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]', out: '[null,null,null,1,null,-1,null,-1,3,4]' }],
  constraints: ['1 &lt;= capacity &lt;= 3000', '0 &lt;= key, value &lt;= 10^4', 'At most 2*10^5 calls.'],
  editorial: ED({ intuition: 'You need O(1) lookup and O(1) recency updates. A hash map gives lookup; a doubly-linked list (or an ordered map) gives O(1) move-to-most-recent and eviction of the tail.', approach: ['Maintain a hash map from key to node and a doubly-linked list ordered by recency.', 'On get/put, move the touched key to the most-recent end.', 'On overflow, evict the least-recent (front) key.'], code: 'from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cap = capacity\n        self.cache = OrderedDict()\n    def get(self, key):\n        if key not in self.cache:\n            return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key, value):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.cap:\n            self.cache.popitem(last=False)', time: 'O(1)', timeWhy: 'hash map + linked list give constant-time operations.', space: 'O(capacity)', spaceWhy: 'stored entries.', pitfalls: ['Update recency on get too, not just put.'] }),
  custom: {
    python: { stub: ln('class LRUCache:', '    def __init__(self, capacity):', '        # Write your code here', '        pass', '    def get(self, key):', '        return -1', '    def put(self, key, value):', '        pass'), harness: null },
    javascript: { stub: ln('class LRUCache {', '    constructor(capacity) {', '        // Write your code here', '    }', '    get(key) { return -1; }', '    put(key, value) {}', '}'), harness: null },
    cpp: { stub: ln('#include <bits/stdc++.h>', 'using namespace std;', '', 'class LRUCache {', 'public:', '    LRUCache(int capacity) {', '        // Write your code here', '    }', '    int get(int key) { return -1; }', '    void put(int key, int value) {}', '};'), harness: null },
    java: { stub: ln('import java.util.*;', '', 'class LRUCache {', '    public LRUCache(int capacity) {', '        // Write your code here', '    }', '    public int get(int key) { return -1; }', '    public void put(int key, int value) {}', '}'), harness: null },
  },
  gen: function () {
    var o = [[[{ name: 'LRUCache', a: [2] }, { name: 'put', a: [1, 1] }, { name: 'put', a: [2, 2] }, { name: 'get', a: [1] }, { name: 'put', a: [3, 3] }, { name: 'get', a: [2] }, { name: 'put', a: [4, 4] }, { name: 'get', a: [1] }, { name: 'get', a: [3] }, { name: 'get', a: [4] }]]];
    for (var k = 0; k < 32; k++) { var ops = [{ name: 'LRUCache', a: [randInt(1, 3)] }], n = randInt(4, 14); for (var i = 0; i < n; i++) { if (Math.random() < 0.5) ops.push({ name: 'put', a: [randInt(0, 4), randInt(0, 9)] }); else ops.push({ name: 'get', a: [randInt(0, 4)] }); } o.push([ops]); }
    return o;
  },
  ref: function (a) { var cap = 0, map = new Map(), res = []; a[0].forEach(function (o) { if (o.name === 'LRUCache') { cap = +o.a[0]; map = new Map(); res.push('null'); } else if (o.name === 'put') { var k = +o.a[0], v = +o.a[1]; if (map.has(k)) map.delete(k); map.set(k, v); if (map.size > cap) map.delete(map.keys().next().value); res.push('null'); } else if (o.name === 'get') { var k = +o.a[0]; if (map.has(k)) { var v = map.get(k); map.delete(k); map.set(k, v); res.push(String(v)); } else res.push('-1'); } }); return res.join('|'); } });

// ---- wire the ops-replay harness into each design problem ----
function attach(slug, cls, py, js, cpp, java) {
  var p = MORE15.filter(function (x) { return x.slug === slug; })[0];
  var h = opsHarness(cls, py, js, cpp, java);
  p.custom.python.harness = h.python;
  p.custom.javascript.harness = h.javascript;
  p.custom.cpp.harness = h.cpp;
  p.custom.java.harness = h.java;
}

attach('min-stack', 'MinStack',
  ln("        if _op=='MinStack': _o=MinStack(); _res.append('null')", "        elif _op=='push': _o.push(int(_p[1])); _res.append('null')", "        elif _op=='pop': _o.pop(); _res.append('null')", "        elif _op=='top': _res.append(str(_o.top()))", "        elif _op=='getMin': _res.append(str(_o.getMin()))"),
  ln("  if(_op==='MinStack'){_o=new MinStack();_res.push('null');}", "  else if(_op==='push'){_o.push(+_p[1]);_res.push('null');}", "  else if(_op==='pop'){_o.pop();_res.push('null');}", "  else if(_op==='top'){_res.push(String(_o.top()));}", "  else if(_op==='getMin'){_res.push(String(_o.getMin()));}"),
  ln('   if(_op=="MinStack"){_o=new MinStack();_res.push_back("null");}', '   else if(_op=="push"){int _x;_is>>_x;_o->push(_x);_res.push_back("null");}', '   else if(_op=="pop"){_o->pop();_res.push_back("null");}', '   else if(_op=="top"){_res.push_back(to_string(_o->top()));}', '   else if(_op=="getMin"){_res.push_back(to_string(_o->getMin()));}'),
  ln('        if(op.equals("MinStack")){o=new MinStack();res.add("null");}', '        else if(op.equals("push")){o.push(Integer.parseInt(p[1]));res.add("null");}', '        else if(op.equals("pop")){o.pop();res.add("null");}', '        else if(op.equals("top")){res.add(String.valueOf(o.top()));}', '        else if(op.equals("getMin")){res.add(String.valueOf(o.getMin()));}'));

attach('implement-trie-prefix-tree', 'Trie',
  ln("        if _op=='Trie': _o=Trie(); _res.append('null')", "        elif _op=='insert': _o.insert(_p[1]); _res.append('null')", "        elif _op=='search': _res.append('true' if _o.search(_p[1]) else 'false')", "        elif _op=='startsWith': _res.append('true' if _o.startsWith(_p[1]) else 'false')"),
  ln("  if(_op==='Trie'){_o=new Trie();_res.push('null');}", "  else if(_op==='insert'){_o.insert(_p[1]);_res.push('null');}", "  else if(_op==='search'){_res.push(_o.search(_p[1])?'true':'false');}", "  else if(_op==='startsWith'){_res.push(_o.startsWith(_p[1])?'true':'false');}"),
  ln('   if(_op=="Trie"){_o=new Trie();_res.push_back("null");}', '   else if(_op=="insert"){string _w;_is>>_w;_o->insert(_w);_res.push_back("null");}', '   else if(_op=="search"){string _w;_is>>_w;_res.push_back(_o->search(_w)?"true":"false");}', '   else if(_op=="startsWith"){string _w;_is>>_w;_res.push_back(_o->startsWith(_w)?"true":"false");}'),
  ln('        if(op.equals("Trie")){o=new Trie();res.add("null");}', '        else if(op.equals("insert")){o.insert(p[1]);res.add("null");}', '        else if(op.equals("search")){res.add(o.search(p[1])?"true":"false");}', '        else if(op.equals("startsWith")){res.add(o.startsWith(p[1])?"true":"false");}'));

attach('design-add-and-search-words-data-structure', 'WordDictionary',
  ln("        if _op=='WordDictionary': _o=WordDictionary(); _res.append('null')", "        elif _op=='addWord': _o.addWord(_p[1]); _res.append('null')", "        elif _op=='search': _res.append('true' if _o.search(_p[1]) else 'false')"),
  ln("  if(_op==='WordDictionary'){_o=new WordDictionary();_res.push('null');}", "  else if(_op==='addWord'){_o.addWord(_p[1]);_res.push('null');}", "  else if(_op==='search'){_res.push(_o.search(_p[1])?'true':'false');}"),
  ln('   if(_op=="WordDictionary"){_o=new WordDictionary();_res.push_back("null");}', '   else if(_op=="addWord"){string _w;_is>>_w;_o->addWord(_w);_res.push_back("null");}', '   else if(_op=="search"){string _w;_is>>_w;_res.push_back(_o->search(_w)?"true":"false");}'),
  ln('        if(op.equals("WordDictionary")){o=new WordDictionary();res.add("null");}', '        else if(op.equals("addWord")){o.addWord(p[1]);res.add("null");}', '        else if(op.equals("search")){res.add(o.search(p[1])?"true":"false");}'));

attach('time-based-key-value-store', 'TimeMap',
  ln("        if _op=='TimeMap': _o=TimeMap(); _res.append('null')", "        elif _op=='set': _o.set(_p[1],_p[2],int(_p[3])); _res.append('null')", "        elif _op=='get': _res.append(_o.get(_p[1],int(_p[2])))"),
  ln("  if(_op==='TimeMap'){_o=new TimeMap();_res.push('null');}", "  else if(_op==='set'){_o.set(_p[1],_p[2],+_p[3]);_res.push('null');}", "  else if(_op==='get'){_res.push(_o.get(_p[1],+_p[2]));}"),
  ln('   if(_op=="TimeMap"){_o=new TimeMap();_res.push_back("null");}', '   else if(_op=="set"){string _k,_v;int _t;_is>>_k>>_v>>_t;_o->set(_k,_v,_t);_res.push_back("null");}', '   else if(_op=="get"){string _k;int _t;_is>>_k>>_t;_res.push_back(_o->get(_k,_t));}'),
  ln('        if(op.equals("TimeMap")){o=new TimeMap();res.add("null");}', '        else if(op.equals("set")){o.set(p[1],p[2],Integer.parseInt(p[3]));res.add("null");}', '        else if(op.equals("get")){res.add(o.get(p[1],Integer.parseInt(p[2])));}'));

attach('lru-cache', 'LRUCache',
  ln("        if _op=='LRUCache': _o=LRUCache(int(_p[1])); _res.append('null')", "        elif _op=='put': _o.put(int(_p[1]),int(_p[2])); _res.append('null')", "        elif _op=='get': _res.append(str(_o.get(int(_p[1]))))"),
  ln("  if(_op==='LRUCache'){_o=new LRUCache(+_p[1]);_res.push('null');}", "  else if(_op==='put'){_o.put(+_p[1],+_p[2]);_res.push('null');}", "  else if(_op==='get'){_res.push(String(_o.get(+_p[1])));}"),
  ln('   if(_op=="LRUCache"){int _cp;_is>>_cp;_o=new LRUCache(_cp);_res.push_back("null");}', '   else if(_op=="put"){int _k,_v;_is>>_k>>_v;_o->put(_k,_v);_res.push_back("null");}', '   else if(_op=="get"){int _k;_is>>_k;_res.push_back(to_string(_o->get(_k)));}'),
  ln('        if(op.equals("LRUCache")){o=new LRUCache(Integer.parseInt(p[1]));res.add("null");}', '        else if(op.equals("put")){o.put(Integer.parseInt(p[1]),Integer.parseInt(p[2]));res.add("null");}', '        else if(op.equals("get")){res.add(String.valueOf(o.get(Integer.parseInt(p[1]))));}'));

module.exports = { MORE15 };
