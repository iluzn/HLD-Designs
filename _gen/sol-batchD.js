// Known-correct solutions for Batch D (tree/BST) problems.
const SOL = {
  'invert-binary-tree': {
    python: '        if not root: return None\n        root.left,root.right=self.invertTree(root.right),self.invertTree(root.left)\n        return root',
    javascript: '    if(!root)return null; const l=invertTree(root.right),r=invertTree(root.left); root.left=l; root.right=r; return root;',
    cpp: '        if(!root)return nullptr; TreeNode* l=invertTree(root->right); TreeNode* r=invertTree(root->left); root->left=l; root->right=r; return root;',
    java: '        if(root==null)return null; TreeNode l=invertTree(root.right),r=invertTree(root.left); root.left=l; root.right=r; return root;',
  },
  'same-tree': {
    python: '        if not p and not q: return True\n        if not p or not q or p.val!=q.val: return False\n        return self.isSameTree(p.left,q.left) and self.isSameTree(p.right,q.right)',
    javascript: '    if(!p&&!q)return true; if(!p||!q||p.val!==q.val)return false; return isSameTree(p.left,q.left)&&isSameTree(p.right,q.right);',
    cpp: '        if(!p&&!q)return true; if(!p||!q||p->val!=q->val)return false; return isSameTree(p->left,q->left)&&isSameTree(p->right,q->right);',
    java: '        if(p==null&&q==null)return true; if(p==null||q==null||p.val!=q.val)return false; return isSameTree(p.left,q.left)&&isSameTree(p.right,q.right);',
  },
  'subtree-of-another-tree': {
    python: '        def same(a,b):\n            if not a and not b: return True\n            if not a or not b or a.val!=b.val: return False\n            return same(a.left,b.left) and same(a.right,b.right)\n        if not q: return True\n        if not p: return False\n        if same(p,q): return True\n        return self.isSubtree(p.left,q) or self.isSubtree(p.right,q)',
    javascript: '    function same(a,b){if(!a&&!b)return true;if(!a||!b||a.val!==b.val)return false;return same(a.left,b.left)&&same(a.right,b.right);} if(!q)return true; if(!p)return false; if(same(p,q))return true; return isSubtree(p.left,q)||isSubtree(p.right,q);',
    cpp: '        function<bool(TreeNode*,TreeNode*)> same=[&](TreeNode* a,TreeNode* b)->bool{if(!a&&!b)return true;if(!a||!b||a->val!=b->val)return false;return same(a->left,b->left)&&same(a->right,b->right);}; if(!q)return true; if(!p)return false; if(same(p,q))return true; return isSubtree(p->left,q)||isSubtree(p->right,q);',
    java: '        if(q==null)return true; if(p==null)return false; if(same(p,q))return true; return isSubtree(p.left,q)||isSubtree(p.right,q);\n    }\n    boolean same(TreeNode a,TreeNode b){if(a==null&&b==null)return true;if(a==null||b==null||a.val!=b.val)return false;return same(a.left,b.left)&&same(a.right,b.right);',
  },
  'binary-tree-level-order-traversal': {
    python: '        if not root: return []\n        from collections import deque\n        res=[]; q=deque([root])\n        while q:\n            level=[]\n            for _ in range(len(q)):\n                node=q.popleft(); level.append(node.val)\n                if node.left: q.append(node.left)\n                if node.right: q.append(node.right)\n            res.append(level)\n        return res',
    javascript: '    if(!root)return []; const res=[]; let q=[root]; while(q.length){const level=[],nq=[]; for(const node of q){level.push(node.val); if(node.left)nq.push(node.left); if(node.right)nq.push(node.right);} res.push(level); q=nq;} return res;',
    cpp: '        vector<vector<int>> res; if(!root)return res; queue<TreeNode*> q; q.push(root); while(!q.empty()){int sz=q.size(); vector<int> level; for(int i=0;i<sz;i++){TreeNode* n=q.front();q.pop();level.push_back(n->val);if(n->left)q.push(n->left);if(n->right)q.push(n->right);} res.push_back(level);} return res;',
    java: '        List<List<Integer>> res=new ArrayList<>(); if(root==null)return res; Queue<TreeNode> q=new LinkedList<>(); q.add(root); while(!q.isEmpty()){int sz=q.size(); List<Integer> level=new ArrayList<>(); for(int i=0;i<sz;i++){TreeNode n=q.poll();level.add(n.val);if(n.left!=null)q.add(n.left);if(n.right!=null)q.add(n.right);} res.add(level);} return res;',
  },
  'binary-tree-right-side-view': {
    python: '        if not root: return []\n        from collections import deque\n        res=[]; q=deque([root])\n        while q:\n            n=len(q)\n            for i in range(n):\n                node=q.popleft()\n                if i==n-1: res.append(node.val)\n                if node.left: q.append(node.left)\n                if node.right: q.append(node.right)\n        return res',
    javascript: '    if(!root)return []; const res=[]; let q=[root]; while(q.length){const nq=[]; for(let i=0;i<q.length;i++){const node=q[i]; if(i===q.length-1)res.push(node.val); if(node.left)nq.push(node.left); if(node.right)nq.push(node.right);} q=nq;} return res;',
    cpp: '        vector<int> res; if(!root)return res; queue<TreeNode*> q; q.push(root); while(!q.empty()){int sz=q.size(); for(int i=0;i<sz;i++){TreeNode* n=q.front();q.pop();if(i==sz-1)res.push_back(n->val);if(n->left)q.push(n->left);if(n->right)q.push(n->right);}} return res;',
    java: '        List<Integer> res=new ArrayList<>(); if(root==null)return new int[]{}; Queue<TreeNode> q=new LinkedList<>(); q.add(root); while(!q.isEmpty()){int sz=q.size(); for(int i=0;i<sz;i++){TreeNode n=q.poll();if(i==sz-1)res.add(n.val);if(n.left!=null)q.add(n.left);if(n.right!=null)q.add(n.right);}} int[] r=new int[res.size()]; for(int i=0;i<r.length;i++)r[i]=res.get(i); return r;',
  },
  'count-good-nodes-in-binary-tree': {
    python: '        def dfs(node,mx):\n            if not node: return 0\n            good=1 if node.val>=mx else 0\n            mx=max(mx,node.val)\n            return good+dfs(node.left,mx)+dfs(node.right,mx)\n        return dfs(root,root.val)',
    javascript: '    function dfs(node,mx){if(!node)return 0;let good=node.val>=mx?1:0;const nm=Math.max(mx,node.val);return good+dfs(node.left,nm)+dfs(node.right,nm);} return dfs(root,root.val);',
    cpp: '        function<int(TreeNode*,int)> dfs=[&](TreeNode* node,int mx)->int{if(!node)return 0;int good=node->val>=mx?1:0;int nm=max(mx,node->val);return good+dfs(node->left,nm)+dfs(node->right,nm);}; return dfs(root,root->val);',
    java: '        return dfs(root,root.val);\n    }\n    int dfs(TreeNode node,int mx){if(node==null)return 0;int good=node.val>=mx?1:0;int nm=Math.max(mx,node.val);return good+dfs(node.left,nm)+dfs(node.right,nm);',
  },
  'validate-binary-search-tree': {
    python: "        def valid(node,lo,hi):\n            if not node: return True\n            if not (lo<node.val<hi): return False\n            return valid(node.left,lo,node.val) and valid(node.right,node.val,hi)\n        return valid(root,float('-inf'),float('inf'))",
    javascript: '    function valid(node,lo,hi){if(!node)return true;if(!(lo<node.val&&node.val<hi))return false;return valid(node.left,lo,node.val)&&valid(node.right,node.val,hi);} return valid(root,-Infinity,Infinity);',
    cpp: '        function<bool(TreeNode*,long,long)> valid=[&](TreeNode* node,long lo,long hi)->bool{if(!node)return true;if(!((long)node->val>lo&&(long)node->val<hi))return false;return valid(node->left,lo,node->val)&&valid(node->right,node->val,hi);}; return valid(root,-5000000000L,5000000000L);',
    java: '        return valid(root,Long.MIN_VALUE,Long.MAX_VALUE);\n    }\n    boolean valid(TreeNode node,long lo,long hi){if(node==null)return true;if(!((long)node.val>lo&&(long)node.val<hi))return false;return valid(node.left,lo,node.val)&&valid(node.right,node.val,hi);',
  },
  'kth-smallest-element-in-a-bst': {
    python: '        st=[]; node=root\n        while st or node:\n            while node:\n                st.append(node); node=node.left\n            node=st.pop(); k-=1\n            if k==0: return node.val\n            node=node.right\n        return -1',
    javascript: '    const st=[]; let node=root; while(st.length||node){while(node){st.push(node);node=node.left;} node=st.pop(); k--; if(k===0)return node.val; node=node.right;} return -1;',
    cpp: '        stack<TreeNode*> st; TreeNode* node=root; while(!st.empty()||node){while(node){st.push(node);node=node->left;} node=st.top();st.pop(); if(--k==0)return node->val; node=node->right;} return -1;',
    java: '        Deque<TreeNode> st=new ArrayDeque<>(); TreeNode node=root; while(!st.isEmpty()||node!=null){while(node!=null){st.push(node);node=node.left;} node=st.pop(); if(--k==0)return node.val; node=node.right;} return -1;',
  },
  'lowest-common-ancestor-of-a-binary-search-tree': {
    python: '        node=root\n        while node:\n            if p<node.val and q<node.val: node=node.left\n            elif p>node.val and q>node.val: node=node.right\n            else: return node.val\n        return -1',
    javascript: '    let node=root; while(node){if(p<node.val&&q<node.val)node=node.left;else if(p>node.val&&q>node.val)node=node.right;else return node.val;} return -1;',
    cpp: '        TreeNode* node=root; while(node){if(p<node->val&&q<node->val)node=node->left;else if(p>node->val&&q>node->val)node=node->right;else return node->val;} return -1;',
    java: '        TreeNode node=root; while(node!=null){if(p<node.val&&q<node.val)node=node.left;else if(p>node.val&&q>node.val)node=node.right;else return node.val;} return -1;',
  },
  'binary-tree-maximum-path-sum': {
    python: "        self.best=float('-inf')\n        def gain(node):\n            if not node: return 0\n            l=max(gain(node.left),0); r=max(gain(node.right),0)\n            self.best=max(self.best,node.val+l+r)\n            return node.val+max(l,r)\n        gain(root)\n        return self.best",
    javascript: '    let best=-Infinity; function gain(node){if(!node)return 0;const l=Math.max(gain(node.left),0),r=Math.max(gain(node.right),0);best=Math.max(best,node.val+l+r);return node.val+Math.max(l,r);} gain(root); return best;',
    cpp: '        int best=-1000000000; function<int(TreeNode*)> gain=[&](TreeNode* node)->int{if(!node)return 0;int l=max(gain(node->left),0),r=max(gain(node->right),0);best=max(best,node->val+l+r);return node->val+max(l,r);}; gain(root); return best;',
    java: '        best=Integer.MIN_VALUE; gain(root); return best;\n    }\n    int best;\n    int gain(TreeNode node){if(node==null)return 0;int l=Math.max(gain(node.left),0),r=Math.max(gain(node.right),0);best=Math.max(best,node.val+l+r);return node.val+Math.max(l,r);',
  },
};
module.exports = { SOL };
