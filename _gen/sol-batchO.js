// Batch O: solutions for batch 18 (array & math fundamentals).
const SOL = {
  'running-sum-of-1d-array': {
    python: `        s = 0
        out = []
        for x in nums:
            s += x
            out.append(s)
        return out`,
    java: `        int[] out = new int[nums.length];
        int s = 0;
        for (int i = 0; i < nums.length; i++) { s += nums[i]; out[i] = s; }
        return out;`,
    cpp: `        vector<int> out(nums.size());
        int s = 0;
        for (size_t i = 0; i < nums.size(); i++) { s += nums[i]; out[i] = s; }
        return out;`,
    javascript: `    const out = [];
    let s = 0;
    for (const x of nums) { s += x; out.push(s); }
    return out;`,
  },
  'build-array-from-permutation': {
    python: `        return [nums[nums[i]] for i in range(len(nums))]`,
    java: `        int[] ans = new int[nums.length];
        for (int i = 0; i < nums.length; i++) ans[i] = nums[nums[i]];
        return ans;`,
    cpp: `        vector<int> ans(nums.size());
        for (size_t i = 0; i < nums.size(); i++) ans[i] = nums[nums[i]];
        return ans;`,
    javascript: `    return nums.map((_, i) => nums[nums[i]]);`,
  },
  'concatenation-of-array': {
    python: `        return nums + nums`,
    java: `        int n = nums.length;
        int[] ans = new int[2 * n];
        for (int i = 0; i < n; i++) { ans[i] = nums[i]; ans[i + n] = nums[i]; }
        return ans;`,
    cpp: `        vector<int> ans(nums);
        ans.insert(ans.end(), nums.begin(), nums.end());
        return ans;`,
    javascript: `    return nums.concat(nums);`,
  },
  'find-numbers-with-even-number-of-digits': {
    python: `        return sum(1 for x in nums if len(str(abs(x))) % 2 == 0)`,
    java: `        int c = 0;
        for (int x : nums) if (Integer.toString(Math.abs(x)).length() % 2 == 0) c++;
        return c;`,
    cpp: `        int c = 0;
        for (int x : nums) if (to_string(abs(x)).size() % 2 == 0) c++;
        return c;`,
    javascript: `    let c = 0;
    for (const x of nums) if (String(Math.abs(x)).length % 2 === 0) c++;
    return c;`,
  },
  'how-many-numbers-are-smaller-than-the-current-number': {
    python: `        res = []
        for x in nums:
            res.append(sum(1 for y in nums if y < x))
        return res`,
    java: `        int[] res = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            int c = 0;
            for (int y : nums) if (y < nums[i]) c++;
            res[i] = c;
        }
        return res;`,
    cpp: `        vector<int> res(nums.size());
        for (size_t i = 0; i < nums.size(); i++) {
            int c = 0;
            for (int y : nums) if (y < nums[i]) c++;
            res[i] = c;
        }
        return res;`,
    javascript: `    return nums.map(x => nums.reduce((c, y) => c + (y < x ? 1 : 0), 0));`,
  },
  'maximum-product-of-two-elements-in-an-array': {
    python: `        a = sorted(nums)
        return (a[-1] - 1) * (a[-2] - 1)`,
    java: `        Arrays.sort(nums);
        int n = nums.length;
        return (nums[n - 1] - 1) * (nums[n - 2] - 1);`,
    cpp: `        sort(nums.begin(), nums.end());
        int n = nums.size();
        return (nums[n - 1] - 1) * (nums[n - 2] - 1);`,
    javascript: `    const a = nums.slice().sort((x, y) => x - y);
    return (a[a.length - 1] - 1) * (a[a.length - 2] - 1);`,
  },
  'sum-of-all-odd-length-subarrays': {
    python: `        n = len(nums)
        total = 0
        for i in range(n):
            s = 0
            for j in range(i, n):
                s += nums[j]
                if (j - i + 1) % 2 == 1:
                    total += s
        return total`,
    java: `        int n = nums.length, total = 0;
        for (int i = 0; i < n; i++) {
            int s = 0;
            for (int j = i; j < n; j++) {
                s += nums[j];
                if ((j - i + 1) % 2 == 1) total += s;
            }
        }
        return total;`,
    cpp: `        int n = nums.size(), total = 0;
        for (int i = 0; i < n; i++) {
            int s = 0;
            for (int j = i; j < n; j++) {
                s += nums[j];
                if ((j - i + 1) % 2 == 1) total += s;
            }
        }
        return total;`,
    javascript: `    const n = nums.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        let s = 0;
        for (let j = i; j < n; j++) {
            s += nums[j];
            if ((j - i + 1) % 2 === 1) total += s;
        }
    }
    return total;`,
  },
  'number-of-good-pairs': {
    python: `        cnt = {}
        total = 0
        for x in nums:
            total += cnt.get(x, 0)
            cnt[x] = cnt.get(x, 0) + 1
        return total`,
    java: `        Map<Integer, Integer> cnt = new HashMap<>();
        int total = 0;
        for (int x : nums) {
            int c = cnt.getOrDefault(x, 0);
            total += c;
            cnt.put(x, c + 1);
        }
        return total;`,
    cpp: `        unordered_map<int, int> cnt;
        int total = 0;
        for (int x : nums) { total += cnt[x]; cnt[x]++; }
        return total;`,
    javascript: `    const cnt = {};
    let total = 0;
    for (const x of nums) { total += (cnt[x] || 0); cnt[x] = (cnt[x] || 0) + 1; }
    return total;`,
  },
  'maximum-product-of-three-numbers': {
    python: `        a = sorted(nums)
        return max(a[-1] * a[-2] * a[-3], a[0] * a[1] * a[-1])`,
    java: `        Arrays.sort(nums);
        int n = nums.length;
        return Math.max(nums[n-1]*nums[n-2]*nums[n-3], nums[0]*nums[1]*nums[n-1]);`,
    cpp: `        sort(nums.begin(), nums.end());
        int n = nums.size();
        return max(nums[n-1]*nums[n-2]*nums[n-3], nums[0]*nums[1]*nums[n-1]);`,
    javascript: `    const a = nums.slice().sort((x, y) => x - y);
    const n = a.length;
    return Math.max(a[n-1]*a[n-2]*a[n-3], a[0]*a[1]*a[n-1]);`,
  },
  'third-maximum-number': {
    python: `        s = sorted(set(nums), reverse=True)
        return s[2] if len(s) >= 3 else s[0]`,
    java: `        TreeSet<Integer> set = new TreeSet<>();
        for (int x : nums) set.add(x);
        if (set.size() < 3) return set.last();
        Iterator<Integer> it = set.descendingIterator();
        it.next(); it.next();
        return it.next();`,
    cpp: `        set<int> s(nums.begin(), nums.end());
        if (s.size() < 3) return *s.rbegin();
        auto it = s.rbegin();
        ++it; ++it;
        return *it;`,
    javascript: `    const s = Array.from(new Set(nums)).sort((x, y) => y - x);
    return s.length >= 3 ? s[2] : s[0];`,
  },
  'find-the-highest-altitude': {
    python: `        h = best = 0
        for g in nums:
            h += g
            best = max(best, h)
        return best`,
    java: `        int h = 0, best = 0;
        for (int g : nums) { h += g; best = Math.max(best, h); }
        return best;`,
    cpp: `        int h = 0, best = 0;
        for (int g : nums) { h += g; best = max(best, h); }
        return best;`,
    javascript: `    let h = 0, best = 0;
    for (const g of nums) { h += g; if (h > best) best = h; }
    return best;`,
  },
  'minimum-value-to-get-positive-step-by-step-sum': {
    python: `        s = 0
        mn = 0
        for x in nums:
            s += x
            mn = min(mn, s)
        return 1 - mn`,
    java: `        int s = 0, mn = 0;
        for (int x : nums) { s += x; mn = Math.min(mn, s); }
        return 1 - mn;`,
    cpp: `        int s = 0, mn = 0;
        for (int x : nums) { s += x; mn = min(mn, s); }
        return 1 - mn;`,
    javascript: `    let s = 0, mn = 0;
    for (const x of nums) { s += x; if (s < mn) mn = s; }
    return 1 - mn;`,
  },
  'max-consecutive-ones': {
    python: `        best = cur = 0
        for x in nums:
            cur = cur + 1 if x == 1 else 0
            best = max(best, cur)
        return best`,
    java: `        int best = 0, cur = 0;
        for (int x : nums) { cur = x == 1 ? cur + 1 : 0; best = Math.max(best, cur); }
        return best;`,
    cpp: `        int best = 0, cur = 0;
        for (int x : nums) { cur = x == 1 ? cur + 1 : 0; best = max(best, cur); }
        return best;`,
    javascript: `    let best = 0, cur = 0;
    for (const x of nums) { cur = x === 1 ? cur + 1 : 0; if (cur > best) best = cur; }
    return best;`,
  },
  'wiggle-subsequence': {
    python: `        if len(nums) < 2:
            return len(nums)
        up = down = 1
        for i in range(1, len(nums)):
            if nums[i] > nums[i-1]:
                up = down + 1
            elif nums[i] < nums[i-1]:
                down = up + 1
        return max(up, down)`,
    java: `        if (nums.length < 2) return nums.length;
        int up = 1, down = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i-1]) up = down + 1;
            else if (nums[i] < nums[i-1]) down = up + 1;
        }
        return Math.max(up, down);`,
    cpp: `        if (nums.size() < 2) return nums.size();
        int up = 1, down = 1;
        for (size_t i = 1; i < nums.size(); i++) {
            if (nums[i] > nums[i-1]) up = down + 1;
            else if (nums[i] < nums[i-1]) down = up + 1;
        }
        return max(up, down);`,
    javascript: `    if (nums.length < 2) return nums.length;
    let up = 1, down = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i-1]) up = down + 1;
        else if (nums[i] < nums[i-1]) down = up + 1;
    }
    return Math.max(up, down);`,
  },
  'arithmetic-slices': {
    python: `        total = cur = 0
        for i in range(2, len(nums)):
            if nums[i] - nums[i-1] == nums[i-1] - nums[i-2]:
                cur += 1
                total += cur
            else:
                cur = 0
        return total`,
    java: `        int total = 0, cur = 0;
        for (int i = 2; i < nums.length; i++) {
            if (nums[i] - nums[i-1] == nums[i-1] - nums[i-2]) { cur++; total += cur; }
            else cur = 0;
        }
        return total;`,
    cpp: `        int total = 0, cur = 0;
        for (int i = 2; i < (int)nums.size(); i++) {
            if (nums[i] - nums[i-1] == nums[i-1] - nums[i-2]) { cur++; total += cur; }
            else cur = 0;
        }
        return total;`,
    javascript: `    let total = 0, cur = 0;
    for (let i = 2; i < nums.length; i++) {
        if (nums[i] - nums[i-1] === nums[i-1] - nums[i-2]) { cur++; total += cur; }
        else cur = 0;
    }
    return total;`,
  },
  'maximum-ascending-subarray-sum': {
    python: `        best = cur = nums[0]
        for i in range(1, len(nums)):
            cur = cur + nums[i] if nums[i] > nums[i-1] else nums[i]
            best = max(best, cur)
        return best`,
    java: `        int best = nums[0], cur = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = nums[i] > nums[i-1] ? cur + nums[i] : nums[i];
            best = Math.max(best, cur);
        }
        return best;`,
    cpp: `        int best = nums[0], cur = nums[0];
        for (int i = 1; i < (int)nums.size(); i++) {
            cur = nums[i] > nums[i-1] ? cur + nums[i] : nums[i];
            best = max(best, cur);
        }
        return best;`,
    javascript: `    let best = nums[0], cur = nums[0];
    for (let i = 1; i < nums.length; i++) {
        cur = nums[i] > nums[i-1] ? cur + nums[i] : nums[i];
        if (cur > best) best = cur;
    }
    return best;`,
  },
  'monotonic-array': {
    python: `        inc = dec = True
        for i in range(1, len(nums)):
            if nums[i] > nums[i-1]:
                dec = False
            if nums[i] < nums[i-1]:
                inc = False
        return inc or dec`,
    java: `        boolean inc = true, dec = true;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i-1]) dec = false;
            if (nums[i] < nums[i-1]) inc = false;
        }
        return inc || dec;`,
    cpp: `        bool inc = true, dec = true;
        for (int i = 1; i < (int)nums.size(); i++) {
            if (nums[i] > nums[i-1]) dec = false;
            if (nums[i] < nums[i-1]) inc = false;
        }
        return inc || dec;`,
    javascript: `    let inc = true, dec = true;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i-1]) dec = false;
        if (nums[i] < nums[i-1]) inc = false;
    }
    return inc || dec;`,
  },
};
module.exports = { SOL };
