// Known-correct solutions for Batch C (linked list) problems.
const SOL = {
  'reverse-linked-list': {
    python: '        prev=None\n        curr=head\n        while curr:\n            nxt=curr.next\n            curr.next=prev\n            prev=curr\n            curr=nxt\n        return prev',
    javascript: '    let prev=null,curr=head; while(curr){const nxt=curr.next;curr.next=prev;prev=curr;curr=nxt;} return prev;',
    cpp: '        ListNode* prev=nullptr; ListNode* curr=head; while(curr){ListNode* nxt=curr->next;curr->next=prev;prev=curr;curr=nxt;} return prev;',
    java: '        ListNode prev=null,curr=head; while(curr!=null){ListNode nxt=curr.next;curr.next=prev;prev=curr;curr=nxt;} return prev;',
  },
  'merge-two-sorted-lists': {
    python: '        dummy=ListNode(); tail=dummy\n        while l1 and l2:\n            if l1.val<=l2.val:\n                tail.next=l1; l1=l1.next\n            else:\n                tail.next=l2; l2=l2.next\n            tail=tail.next\n        tail.next=l1 or l2\n        return dummy.next',
    javascript: '    const dummy=new ListNode(0); let tail=dummy; while(l1&&l2){if(l1.val<=l2.val){tail.next=l1;l1=l1.next;}else{tail.next=l2;l2=l2.next;}tail=tail.next;} tail.next=l1||l2; return dummy.next;',
    cpp: '        ListNode dummy(0); ListNode* tail=&dummy; while(l1&&l2){if(l1->val<=l2->val){tail->next=l1;l1=l1->next;}else{tail->next=l2;l2=l2->next;}tail=tail->next;} tail->next=l1?l1:l2; return dummy.next;',
    java: '        ListNode dummy=new ListNode(0),tail=dummy; while(l1!=null&&l2!=null){if(l1.val<=l2.val){tail.next=l1;l1=l1.next;}else{tail.next=l2;l2=l2.next;}tail=tail.next;} tail.next=(l1!=null)?l1:l2; return dummy.next;',
  },
  'add-two-numbers': {
    python: '        dummy=ListNode(); tail=dummy; carry=0\n        while l1 or l2 or carry:\n            s=carry\n            if l1: s+=l1.val; l1=l1.next\n            if l2: s+=l2.val; l2=l2.next\n            carry,digit=divmod(s,10)\n            tail.next=ListNode(digit); tail=tail.next\n        return dummy.next',
    javascript: '    const dummy=new ListNode(0); let tail=dummy,carry=0; while(l1||l2||carry){let s=carry;if(l1){s+=l1.val;l1=l1.next;}if(l2){s+=l2.val;l2=l2.next;}carry=Math.floor(s/10);tail.next=new ListNode(s%10);tail=tail.next;} return dummy.next;',
    cpp: '        ListNode dummy(0); ListNode* tail=&dummy; int carry=0; while(l1||l2||carry){int s=carry;if(l1){s+=l1->val;l1=l1->next;}if(l2){s+=l2->val;l2=l2->next;}carry=s/10;tail->next=new ListNode(s%10);tail=tail->next;} return dummy.next;',
    java: '        ListNode dummy=new ListNode(0),tail=dummy; int carry=0; while(l1!=null||l2!=null||carry!=0){int s=carry;if(l1!=null){s+=l1.val;l1=l1.next;}if(l2!=null){s+=l2.val;l2=l2.next;}carry=s/10;tail.next=new ListNode(s%10);tail=tail.next;} return dummy.next;',
  },
  'remove-nth-node-from-end-of-list': {
    python: '        dummy=ListNode(0,head); fast=slow=dummy\n        for _ in range(k): fast=fast.next\n        while fast.next:\n            fast=fast.next; slow=slow.next\n        slow.next=slow.next.next\n        return dummy.next',
    javascript: '    const dummy=new ListNode(0,head); let fast=dummy,slow=dummy; for(let i=0;i<k;i++)fast=fast.next; while(fast.next){fast=fast.next;slow=slow.next;} slow.next=slow.next.next; return dummy.next;',
    cpp: '        ListNode dummy(0); dummy.next=head; ListNode* fast=&dummy; ListNode* slow=&dummy; for(int i=0;i<k;i++)fast=fast->next; while(fast->next){fast=fast->next;slow=slow->next;} slow->next=slow->next->next; return dummy.next;',
    java: '        ListNode dummy=new ListNode(0); dummy.next=head; ListNode fast=dummy,slow=dummy; for(int i=0;i<k;i++)fast=fast.next; while(fast.next!=null){fast=fast.next;slow=slow.next;} slow.next=slow.next.next; return dummy.next;',
  },
  'reverse-nodes-in-k-group': {
    python: '        def has_k(node):\n            for _ in range(k):\n                if not node: return False\n                node=node.next\n            return True\n        dummy=ListNode(0,head); gp=dummy\n        while has_k(gp.next):\n            prev=None; curr=gp.next\n            for _ in range(k):\n                nxt=curr.next; curr.next=prev; prev=curr; curr=nxt\n            tail=gp.next; gp.next=prev; tail.next=curr; gp=tail\n        return dummy.next',
    javascript: '    function hasK(node){for(let i=0;i<k;i++){if(!node)return false;node=node.next;}return true;} const dummy=new ListNode(0,head); let gp=dummy; while(hasK(gp.next)){let prev=null,curr=gp.next; for(let i=0;i<k;i++){const nxt=curr.next;curr.next=prev;prev=curr;curr=nxt;} const tail=gp.next; gp.next=prev; tail.next=curr; gp=tail;} return dummy.next;',
    cpp: '        function<bool(ListNode*)> hasK=[&](ListNode* node){for(int i=0;i<k;i++){if(!node)return false;node=node->next;}return true;}; ListNode dummy(0); dummy.next=head; ListNode* gp=&dummy; while(hasK(gp->next)){ListNode* prev=nullptr; ListNode* curr=gp->next; for(int i=0;i<k;i++){ListNode* nxt=curr->next;curr->next=prev;prev=curr;curr=nxt;} ListNode* tail=gp->next; gp->next=prev; tail->next=curr; gp=tail;} return dummy.next;',
    java: '        ListNode dummy=new ListNode(0); dummy.next=head; ListNode gp=dummy; while(hasK(gp.next,k)){ListNode prev=null,curr=gp.next; for(int i=0;i<k;i++){ListNode nxt=curr.next;curr.next=prev;prev=curr;curr=nxt;} ListNode tail=gp.next; gp.next=prev; tail.next=curr; gp=tail;} return dummy.next;\n    }\n    boolean hasK(ListNode node,int k){for(int i=0;i<k;i++){if(node==null)return false;node=node.next;}return true;',
  },
  'linked-list-cycle': {
    python: '        slow=fast=head\n        while fast and fast.next:\n            slow=slow.next; fast=fast.next.next\n            if slow is fast: return True\n        return False',
    javascript: '    let slow=head,fast=head; while(fast&&fast.next){slow=slow.next;fast=fast.next.next;if(slow===fast)return true;} return false;',
    cpp: '        ListNode* slow=head; ListNode* fast=head; while(fast&&fast->next){slow=slow->next;fast=fast->next->next;if(slow==fast)return true;} return false;',
    java: '        ListNode slow=head,fast=head; while(fast!=null&&fast.next!=null){slow=slow.next;fast=fast.next.next;if(slow==fast)return true;} return false;',
  },
  'merge-k-sorted-lists': {
    python: '        import heapq\n        heap=[]\n        for i,node in enumerate(lists):\n            if node: heapq.heappush(heap,(node.val,i,node))\n        dummy=ListNode(); tail=dummy\n        while heap:\n            val,i,node=heapq.heappop(heap)\n            tail.next=node; tail=node\n            if node.next: heapq.heappush(heap,(node.next.val,i,node.next))\n        return dummy.next',
    javascript: '    const vals=[]; for(const node of lists){let c=node;while(c){vals.push(c.val);c=c.next;}} vals.sort((a,b)=>a-b); const dummy=new ListNode(0); let tail=dummy; for(const v of vals){tail.next=new ListNode(v);tail=tail.next;} return dummy.next;',
    cpp: '        vector<int> vals; for(ListNode* node:lists){while(node){vals.push_back(node->val);node=node->next;}} sort(vals.begin(),vals.end()); ListNode dummy(0); ListNode* tail=&dummy; for(int v:vals){tail->next=new ListNode(v);tail=tail->next;} return dummy.next;',
    java: '        List<Integer> vals=new ArrayList<>(); for(ListNode node:lists){while(node!=null){vals.add(node.val);node=node.next;}} Collections.sort(vals); ListNode dummy=new ListNode(0),tail=dummy; for(int v:vals){tail.next=new ListNode(v);tail=tail.next;} return dummy.next;',
  },
  'reorder-list': {
    python: '        if not head or not head.next: return head\n        slow,fast=head,head.next\n        while fast and fast.next:\n            slow=slow.next; fast=fast.next.next\n        second=slow.next; slow.next=None\n        prev=None\n        while second:\n            nxt=second.next; second.next=prev; prev=second; second=nxt\n        first,second=head,prev\n        while second:\n            f2,s2=first.next,second.next\n            first.next=second; second.next=f2\n            first,second=f2,s2\n        return head',
    javascript: '    if(!head||!head.next)return head; let slow=head,fast=head.next; while(fast&&fast.next){slow=slow.next;fast=fast.next.next;} let second=slow.next; slow.next=null; let prev=null; while(second){const nxt=second.next;second.next=prev;prev=second;second=nxt;} let first=head; second=prev; while(second){const f2=first.next,s2=second.next; first.next=second; second.next=f2; first=f2; second=s2;} return head;',
    cpp: '        if(!head||!head->next)return head; ListNode* slow=head; ListNode* fast=head->next; while(fast&&fast->next){slow=slow->next;fast=fast->next->next;} ListNode* second=slow->next; slow->next=nullptr; ListNode* prev=nullptr; while(second){ListNode* nxt=second->next;second->next=prev;prev=second;second=nxt;} ListNode* first=head; second=prev; while(second){ListNode* f2=first->next; ListNode* s2=second->next; first->next=second; second->next=f2; first=f2; second=s2;} return head;',
    java: '        if(head==null||head.next==null)return head; ListNode slow=head,fast=head.next; while(fast!=null&&fast.next!=null){slow=slow.next;fast=fast.next.next;} ListNode second=slow.next; slow.next=null; ListNode prev=null; while(second!=null){ListNode nxt=second.next;second.next=prev;prev=second;second=nxt;} ListNode first=head; second=prev; while(second!=null){ListNode f2=first.next,s2=second.next; first.next=second; second.next=f2; first=f2; second=s2;} return head;',
  },
};
module.exports = { SOL };
