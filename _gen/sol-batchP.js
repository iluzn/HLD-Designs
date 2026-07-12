// Batch P: known-correct solutions for batch 19 (singly linked list).
const SOL = {
  'middle-of-the-linked-list': {
    python: `        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        return slow`,
    java: `        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;`,
    cpp: `        ListNode* slow = head; ListNode* fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;`,
    javascript: `    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;`,
  },
  'palindrome-linked-list': {
    python: `        vals = []
        while head:
            vals.append(head.val)
            head = head.next
        return vals == vals[::-1]`,
    java: `        java.util.List<Integer> vals = new java.util.ArrayList<>();
        while (head != null) { vals.add(head.val); head = head.next; }
        int i = 0, j = vals.size() - 1;
        while (i < j) { if (!vals.get(i).equals(vals.get(j))) return false; i++; j--; }
        return true;`,
    cpp: `        vector<int> vals;
        while (head) { vals.push_back(head->val); head = head->next; }
        int i = 0, j = (int)vals.size() - 1;
        while (i < j) { if (vals[i] != vals[j]) return false; i++; j--; }
        return true;`,
    javascript: `    const vals = [];
    while (head) { vals.push(head.val); head = head.next; }
    for (let i = 0, j = vals.length - 1; i < j; i++, j--) if (vals[i] !== vals[j]) return false;
    return true;`,
  },
  'remove-linked-list-elements': {
    python: `        dummy = ListNode(0, head)
        cur = dummy
        while cur.next:
            if cur.next.val == k:
                cur.next = cur.next.next
            else:
                cur = cur.next
        return dummy.next`,
    java: `        ListNode dummy = new ListNode(0); dummy.next = head;
        ListNode cur = dummy;
        while (cur.next != null) {
            if (cur.next.val == k) cur.next = cur.next.next;
            else cur = cur.next;
        }
        return dummy.next;`,
    cpp: `        ListNode dummy(0); dummy.next = head;
        ListNode* cur = &dummy;
        while (cur->next) {
            if (cur->next->val == k) cur->next = cur->next->next;
            else cur = cur->next;
        }
        return dummy.next;`,
    javascript: `    const dummy = new ListNode(0, head);
    let cur = dummy;
    while (cur.next) {
        if (cur.next.val === k) cur.next = cur.next.next;
        else cur = cur.next;
    }
    return dummy.next;`,
  },
  'odd-even-linked-list': {
    python: `        if not head or not head.next:
            return head
        odd = head
        even = head.next
        even_head = even
        while even and even.next:
            odd.next = even.next
            odd = odd.next
            even.next = odd.next
            even = even.next
        odd.next = even_head
        return head`,
    java: `        if (head == null || head.next == null) return head;
        ListNode odd = head, even = head.next, evenHead = even;
        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;
            even.next = odd.next;
            even = even.next;
        }
        odd.next = evenHead;
        return head;`,
    cpp: `        if (!head || !head->next) return head;
        ListNode* odd = head; ListNode* even = head->next; ListNode* evenHead = even;
        while (even && even->next) {
            odd->next = even->next;
            odd = odd->next;
            even->next = odd->next;
            even = even->next;
        }
        odd->next = evenHead;
        return head;`,
    javascript: `    if (!head || !head.next) return head;
    let odd = head, even = head.next; const evenHead = even;
    while (even && even.next) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    odd.next = evenHead;
    return head;`,
  },
  'swap-nodes-in-pairs': {
    python: `        dummy = ListNode(0, head)
        prev = dummy
        while prev.next and prev.next.next:
            a = prev.next
            b = a.next
            a.next = b.next
            b.next = a
            prev.next = b
            prev = a
        return dummy.next`,
    java: `        ListNode dummy = new ListNode(0); dummy.next = head;
        ListNode prev = dummy;
        while (prev.next != null && prev.next.next != null) {
            ListNode a = prev.next, b = a.next;
            a.next = b.next;
            b.next = a;
            prev.next = b;
            prev = a;
        }
        return dummy.next;`,
    cpp: `        ListNode dummy(0); dummy.next = head;
        ListNode* prev = &dummy;
        while (prev->next && prev->next->next) {
            ListNode* a = prev->next; ListNode* b = a->next;
            a->next = b->next;
            b->next = a;
            prev->next = b;
            prev = a;
        }
        return dummy.next;`,
    javascript: `    const dummy = new ListNode(0, head);
    let prev = dummy;
    while (prev.next && prev.next.next) {
        const a = prev.next, b = a.next;
        a.next = b.next;
        b.next = a;
        prev.next = b;
        prev = a;
    }
    return dummy.next;`,
  },
  'rotate-list': {
    python: `        if not head or not head.next:
            return head
        n = 1
        tail = head
        while tail.next:
            tail = tail.next
            n += 1
        k %= n
        if k == 0:
            return head
        tail.next = head
        steps = n - k
        new_tail = head
        for _ in range(steps - 1):
            new_tail = new_tail.next
        new_head = new_tail.next
        new_tail.next = None
        return new_head`,
    java: `        if (head == null || head.next == null) return head;
        int n = 1;
        ListNode tail = head;
        while (tail.next != null) { tail = tail.next; n++; }
        k %= n;
        if (k == 0) return head;
        tail.next = head;
        int steps = n - k;
        ListNode newTail = head;
        for (int i = 0; i < steps - 1; i++) newTail = newTail.next;
        ListNode newHead = newTail.next;
        newTail.next = null;
        return newHead;`,
    cpp: `        if (!head || !head->next) return head;
        int n = 1;
        ListNode* tail = head;
        while (tail->next) { tail = tail->next; n++; }
        k %= n;
        if (k == 0) return head;
        tail->next = head;
        int steps = n - k;
        ListNode* newTail = head;
        for (int i = 0; i < steps - 1; i++) newTail = newTail->next;
        ListNode* newHead = newTail->next;
        newTail->next = nullptr;
        return newHead;`,
    javascript: `    if (!head || !head.next) return head;
    let n = 1, tail = head;
    while (tail.next) { tail = tail.next; n++; }
    k %= n;
    if (k === 0) return head;
    tail.next = head;
    const steps = n - k;
    let newTail = head;
    for (let i = 0; i < steps - 1; i++) newTail = newTail.next;
    const newHead = newTail.next;
    newTail.next = null;
    return newHead;`,
  },
  'remove-duplicates-from-sorted-list': {
    python: `        cur = head
        while cur and cur.next:
            if cur.next.val == cur.val:
                cur.next = cur.next.next
            else:
                cur = cur.next
        return head`,
    java: `        ListNode cur = head;
        while (cur != null && cur.next != null) {
            if (cur.next.val == cur.val) cur.next = cur.next.next;
            else cur = cur.next;
        }
        return head;`,
    cpp: `        ListNode* cur = head;
        while (cur && cur->next) {
            if (cur->next->val == cur->val) cur->next = cur->next->next;
            else cur = cur->next;
        }
        return head;`,
    javascript: `    let cur = head;
    while (cur && cur.next) {
        if (cur.next.val === cur.val) cur.next = cur.next.next;
        else cur = cur.next;
    }
    return head;`,
  },
  'remove-duplicates-from-sorted-list-ii': {
    python: `        dummy = ListNode(0, head)
        prev = dummy
        cur = head
        while cur:
            while cur.next and cur.val == cur.next.val:
                cur = cur.next
            if prev.next == cur:
                prev = prev.next
            else:
                prev.next = cur.next
            cur = cur.next
        return dummy.next`,
    java: `        ListNode dummy = new ListNode(0); dummy.next = head;
        ListNode prev = dummy, cur = head;
        while (cur != null) {
            while (cur.next != null && cur.val == cur.next.val) cur = cur.next;
            if (prev.next == cur) prev = prev.next;
            else prev.next = cur.next;
            cur = cur.next;
        }
        return dummy.next;`,
    cpp: `        ListNode dummy(0); dummy.next = head;
        ListNode* prev = &dummy; ListNode* cur = head;
        while (cur) {
            while (cur->next && cur->val == cur->next->val) cur = cur->next;
            if (prev->next == cur) prev = prev->next;
            else prev->next = cur->next;
            cur = cur->next;
        }
        return dummy.next;`,
    javascript: `    const dummy = new ListNode(0, head);
    let prev = dummy, cur = head;
    while (cur) {
        while (cur.next && cur.val === cur.next.val) cur = cur.next;
        if (prev.next === cur) prev = prev.next;
        else prev.next = cur.next;
        cur = cur.next;
    }
    return dummy.next;`,
  },
  'partition-list': {
    python: `        less = ListNode(0)
        greater = ListNode(0)
        l, g = less, greater
        cur = head
        while cur:
            if cur.val < k:
                l.next = cur
                l = cur
            else:
                g.next = cur
                g = cur
            cur = cur.next
        g.next = None
        l.next = greater.next
        return less.next`,
    java: `        ListNode less = new ListNode(0), greater = new ListNode(0);
        ListNode l = less, g = greater, cur = head;
        while (cur != null) {
            if (cur.val < k) { l.next = cur; l = cur; }
            else { g.next = cur; g = cur; }
            cur = cur.next;
        }
        g.next = null;
        l.next = greater.next;
        return less.next;`,
    cpp: `        ListNode less(0), greater(0);
        ListNode* l = &less; ListNode* g = &greater; ListNode* cur = head;
        while (cur) {
            if (cur->val < k) { l->next = cur; l = cur; }
            else { g->next = cur; g = cur; }
            cur = cur->next;
        }
        g->next = nullptr;
        l->next = greater.next;
        return less.next;`,
    javascript: `    const less = new ListNode(0), greater = new ListNode(0);
    let l = less, g = greater, cur = head;
    while (cur) {
        if (cur.val < k) { l.next = cur; l = cur; }
        else { g.next = cur; g = cur; }
        cur = cur.next;
    }
    g.next = null;
    l.next = greater.next;
    return less.next;`,
  },
  'delete-the-middle-node-of-a-linked-list': {
    python: `        if not head or not head.next:
            return None
        slow = fast = head
        prev = None
        while fast and fast.next:
            prev = slow
            slow = slow.next
            fast = fast.next.next
        prev.next = slow.next
        return head`,
    java: `        if (head == null || head.next == null) return null;
        ListNode slow = head, fast = head, prev = null;
        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        prev.next = slow.next;
        return head;`,
    cpp: `        if (!head || !head->next) return nullptr;
        ListNode* slow = head; ListNode* fast = head; ListNode* prev = nullptr;
        while (fast && fast->next) {
            prev = slow;
            slow = slow->next;
            fast = fast->next->next;
        }
        prev->next = slow->next;
        return head;`,
    javascript: `    if (!head || !head.next) return null;
    let slow = head, fast = head, prev = null;
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    prev.next = slow.next;
    return head;`,
  },
  'merge-nodes-in-between-zeros': {
    python: `        dummy = ListNode(0)
        tail = dummy
        cur = head.next
        s = 0
        while cur:
            if cur.val == 0:
                tail.next = ListNode(s)
                tail = tail.next
                s = 0
            else:
                s += cur.val
            cur = cur.next
        return dummy.next`,
    java: `        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        ListNode cur = head.next;
        int s = 0;
        while (cur != null) {
            if (cur.val == 0) {
                tail.next = new ListNode(s);
                tail = tail.next;
                s = 0;
            } else s += cur.val;
            cur = cur.next;
        }
        return dummy.next;`,
    cpp: `        ListNode dummy(0);
        ListNode* tail = &dummy;
        ListNode* cur = head->next;
        int s = 0;
        while (cur) {
            if (cur->val == 0) {
                tail->next = new ListNode(s);
                tail = tail->next;
                s = 0;
            } else s += cur->val;
            cur = cur->next;
        }
        return dummy.next;`,
    javascript: `    const dummy = new ListNode(0);
    let tail = dummy, cur = head.next, s = 0;
    while (cur) {
        if (cur.val === 0) {
            tail.next = new ListNode(s);
            tail = tail.next;
            s = 0;
        } else s += cur.val;
        cur = cur.next;
    }
    return dummy.next;`,
  },
  'remove-nodes-from-linked-list': {
    python: `        if not head:
            return None
        head.next = self.removeNodes(head.next)
        if head.next and head.next.val > head.val:
            return head.next
        return head`,
    java: `        if (head == null) return null;
        head.next = removeNodes(head.next);
        if (head.next != null && head.next.val > head.val) return head.next;
        return head;`,
    cpp: `        if (!head) return nullptr;
        head->next = removeNodes(head->next);
        if (head->next && head->next->val > head->val) return head->next;
        return head;`,
    javascript: `    if (!head) return null;
    head.next = removeNodes(head.next);
    if (head.next && head.next.val > head.val) return head.next;
    return head;`,
  },
  'double-a-number-represented-as-a-linked-list': {
    python: `        num = 0
        cur = head
        while cur:
            num = num * 10 + cur.val
            cur = cur.next
        num *= 2
        dummy = ListNode(0)
        t = dummy
        for ch in str(num):
            t.next = ListNode(int(ch))
            t = t.next
        return dummy.next`,
    java: `        long num = 0;
        ListNode cur = head;
        while (cur != null) { num = num * 10 + cur.val; cur = cur.next; }
        num *= 2;
        String s = Long.toString(num);
        ListNode dummy = new ListNode(0), t = dummy;
        for (int i = 0; i < s.length(); i++) { t.next = new ListNode(s.charAt(i) - '0'); t = t.next; }
        return dummy.next;`,
    cpp: `        long long num = 0;
        ListNode* cur = head;
        while (cur) { num = num * 10 + cur->val; cur = cur->next; }
        num *= 2;
        string s = to_string(num);
        ListNode dummy(0); ListNode* t = &dummy;
        for (char ch : s) { t->next = new ListNode(ch - '0'); t = t->next; }
        return dummy.next;`,
    javascript: `    let num = 0, cur = head;
    while (cur) { num = num * 10 + cur.val; cur = cur.next; }
    num *= 2;
    const s = String(num);
    const dummy = new ListNode(0);
    let t = dummy;
    for (const ch of s) { t.next = new ListNode(+ch); t = t.next; }
    return dummy.next;`,
  },
  'sort-list': {
    python: `        vals = []
        cur = head
        while cur:
            vals.append(cur.val)
            cur = cur.next
        vals.sort()
        cur = head
        i = 0
        while cur:
            cur.val = vals[i]
            i += 1
            cur = cur.next
        return head`,
    java: `        java.util.List<Integer> vals = new java.util.ArrayList<>();
        ListNode cur = head;
        while (cur != null) { vals.add(cur.val); cur = cur.next; }
        java.util.Collections.sort(vals);
        cur = head;
        int i = 0;
        while (cur != null) { cur.val = vals.get(i++); cur = cur.next; }
        return head;`,
    cpp: `        vector<int> vals;
        ListNode* cur = head;
        while (cur) { vals.push_back(cur->val); cur = cur->next; }
        sort(vals.begin(), vals.end());
        cur = head;
        int i = 0;
        while (cur) { cur->val = vals[i++]; cur = cur->next; }
        return head;`,
    javascript: `    const vals = [];
    let cur = head;
    while (cur) { vals.push(cur.val); cur = cur.next; }
    vals.sort((a, b) => a - b);
    cur = head;
    let i = 0;
    while (cur) { cur.val = vals[i++]; cur = cur.next; }
    return head;`,
  },
  'insertion-sort-list': {
    python: `        dummy = ListNode(0)
        cur = head
        while cur:
            nxt = cur.next
            prev = dummy
            while prev.next and prev.next.val < cur.val:
                prev = prev.next
            cur.next = prev.next
            prev.next = cur
            cur = nxt
        return dummy.next`,
    java: `        ListNode dummy = new ListNode(0);
        ListNode cur = head;
        while (cur != null) {
            ListNode nxt = cur.next;
            ListNode prev = dummy;
            while (prev.next != null && prev.next.val < cur.val) prev = prev.next;
            cur.next = prev.next;
            prev.next = cur;
            cur = nxt;
        }
        return dummy.next;`,
    cpp: `        ListNode dummy(0);
        ListNode* cur = head;
        while (cur) {
            ListNode* nxt = cur->next;
            ListNode* prev = &dummy;
            while (prev->next && prev->next->val < cur->val) prev = prev->next;
            cur->next = prev->next;
            prev->next = cur;
            cur = nxt;
        }
        return dummy.next;`,
    javascript: `    const dummy = new ListNode(0);
    let cur = head;
    while (cur) {
        const nxt = cur.next;
        let prev = dummy;
        while (prev.next && prev.next.val < cur.val) prev = prev.next;
        cur.next = prev.next;
        prev.next = cur;
        cur = nxt;
    }
    return dummy.next;`,
  },
  'swapping-nodes-in-a-linked-list': {
    python: `        first = head
        for _ in range(k - 1):
            first = first.next
        second = head
        cur = first
        while cur.next:
            cur = cur.next
            second = second.next
        first.val, second.val = second.val, first.val
        return head`,
    java: `        ListNode first = head;
        for (int i = 0; i < k - 1; i++) first = first.next;
        ListNode second = head, cur = first;
        while (cur.next != null) { cur = cur.next; second = second.next; }
        int t = first.val; first.val = second.val; second.val = t;
        return head;`,
    cpp: `        ListNode* first = head;
        for (int i = 0; i < k - 1; i++) first = first->next;
        ListNode* second = head; ListNode* cur = first;
        while (cur->next) { cur = cur->next; second = second->next; }
        int t = first->val; first->val = second->val; second->val = t;
        return head;`,
    javascript: `    let first = head;
    for (let i = 0; i < k - 1; i++) first = first.next;
    let second = head, cur = first;
    while (cur.next) { cur = cur.next; second = second.next; }
    const t = first.val; first.val = second.val; second.val = t;
    return head;`,
  },
};
module.exports = { SOL };
