---
layout: default
title: "LRU Cache"
description: "Design pattern: O(1) get and put with a HashMap plus a doubly linked list. PhonePe machine-coding crossover favorite."
permalink: /dsa/lru-cache
---

# LRU Cache

⚡ **Difficulty:** Medium 🏷️ **Pattern:** HashMap + Doubly Linked List 🏢 **Asked at:** PhonePe, Amazon, Google, Meta

---

## Problem

Design a cache with a fixed `capacity` supporting:
- `get(key)` → value if present, else `-1`. Counts as a use.
- `put(key, value)` → insert/update. If over capacity, evict the **least recently used** entry.

Both operations must be **O(1)**.

---

## Approach

### Why two data structures

- A **HashMap** gives O(1) lookup by key.
- A **doubly linked list** gives O(1) removal and reordering — we can detach any node and move it to the front instantly (a singly linked list can't unlink in O(1)).

The map stores `key → node`. The list orders nodes by recency: **most recently used at the head, least recently used at the tail**.

### Operations

- `get`: look up the node, **move it to the head**, return its value.
- `put`: if key exists, update and move to head. Else create a node, add to head, and if size exceeds capacity, **remove the tail node** and delete its key from the map.

Sentinel `head` and `tail` dummy nodes remove all null-edge-case branching.

---

## Complexity

| | Time | Space |
|---|---|---|
| get / put | O(1) | O(capacity) |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">class LRUCache {
    class Node { int key, val; Node prev, next;
        Node(int k, int v) { key = k; val = v; } }

    private final Map&lt;Integer, Node&gt; map = new HashMap&lt;&gt;();
    private final Node head = new Node(0, 0), tail = new Node(0, 0);
    private final int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail; tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node n = map.get(key);
        remove(n); addFront(n);
        return n.val;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) remove(map.get(key));
        Node n = new Node(key, value);
        map.put(key, n); addFront(n);
        if (map.size() &gt; capacity) {
            Node lru = tail.prev;
            remove(lru); map.remove(lru.key);
        }
    }

    private void remove(Node n) { n.prev.next = n.next; n.next.prev = n.prev; }
    private void addFront(Node n) {
        n.next = head.next; n.prev = head;
        head.next.prev = n; head.next = n;
    }
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">class Node:
    def __init__(self, k=0, v=0):
        self.key, self.val = k, v
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.map = {}
        self.head, self.tail = Node(), Node()
        self.head.next, self.tail.prev = self.tail, self.head

    def _remove(self, n):
        n.prev.next, n.next.prev = n.next, n.prev

    def _add_front(self, n):
        n.next, n.prev = self.head.next, self.head
        self.head.next.prev = n
        self.head.next = n

    def get(self, key):
        if key not in self.map:
            return -1
        n = self.map[key]
        self._remove(n); self._add_front(n)
        return n.val

    def put(self, key, value):
        if key in self.map:
            self._remove(self.map[key])
        n = Node(key, value)
        self.map[key] = n
        self._add_front(n)
        if len(self.map) &gt; self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.map[lru.key]</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">class LRUCache {
    struct Node { int key, val; Node *prev, *next;
        Node(int k, int v): key(k), val(v), prev(nullptr), next(nullptr) {} };
    unordered_map&lt;int, Node*&gt; map;
    Node *head, *tail;
    int cap;

    void remove(Node* n) { n-&gt;prev-&gt;next = n-&gt;next; n-&gt;next-&gt;prev = n-&gt;prev; }
    void addFront(Node* n) {
        n-&gt;next = head-&gt;next; n-&gt;prev = head;
        head-&gt;next-&gt;prev = n; head-&gt;next = n;
    }
public:
    LRUCache(int capacity): cap(capacity) {
        head = new Node(0, 0); tail = new Node(0, 0);
        head-&gt;next = tail; tail-&gt;prev = head;
    }
    int get(int key) {
        if (!map.count(key)) return -1;
        Node* n = map[key];
        remove(n); addFront(n);
        return n-&gt;val;
    }
    void put(int key, int value) {
        if (map.count(key)) remove(map[key]);
        Node* n = new Node(key, value);
        map[key] = n; addFront(n);
        if ((int)map.size() &gt; cap) {
            Node* lru = tail-&gt;prev;
            remove(lru); map.erase(lru-&gt;key); delete lru;
        }
    }
};</code></pre>
</div>
</div>

---

## Try It Yourself

Write your solution and run it live in C++, Java, Python, Go, Rust, and more — right here in the browser.

{% include code-runner.html %}

---

## Key Insight

> O(1) LRU needs **two structures working together**: a hash map for instant lookup and a doubly linked list for instant reordering/eviction. Neither alone can do both. Sentinel head/tail nodes eliminate null checks so `remove` and `addFront` are branch-free.

---

## PhonePe angle: thread-safety follow-up

PhonePe often asks "make it thread-safe" after you code this. Options:
- Wrap `get`/`put` in a single lock (simple, but serializes everything).
- Use Java's `ConcurrentHashMap` + a lock only around list surgery.
- Mention `Collections.synchronizedMap(new LinkedHashMap(...))` with `accessOrder=true` as a built-in shortcut.

---

## Follow-ups

- **LFU Cache** → [LC 460](https://leetcode.com/problems/lfu-cache/): track frequency buckets, evict least frequent.
- **TTL / expiry** → store timestamps; lazily evict on access.

---

## Related Problems

- [LFU Cache](https://leetcode.com/problems/lfu-cache/)
- [Design HashMap](https://leetcode.com/problems/design-hashmap/)
- [LRU Cache (LC 146)](https://leetcode.com/problems/lru-cache/)

---

*Drop a comment below if you want the thread-safe implementation 👇*
