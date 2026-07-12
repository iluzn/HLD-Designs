// Batch V: solutions for the MATH / BIT MANIPULATION / GREEDY problems (batch 25).
const SOL = {
  'add-digits': {
    python: `        if n == 0:
            return 0
        return 1 + (n - 1) % 9`,
    java: `        if (n == 0) return 0;
        return 1 + (n - 1) % 9;`,
    cpp: `        if (n == 0) return 0;
        return 1 + (n - 1) % 9;`,
    javascript: `    if (n === 0) return 0;
    return 1 + (n - 1) % 9;`,
  },
  'ugly-number': {
    python: `        if n <= 0:
            return False
        for p in (2, 3, 5):
            while n % p == 0:
                n //= p
        return n == 1`,
    java: `        if (n <= 0) return false;
        int[] ps = {2, 3, 5};
        for (int p : ps) while (n % p == 0) n /= p;
        return n == 1;`,
    cpp: `        if (n <= 0) return false;
        for (int p : {2, 3, 5}) while (n % p == 0) n /= p;
        return n == 1;`,
    javascript: `    if (n <= 0) return false;
    for (const p of [2, 3, 5]) while (n % p === 0) n /= p;
    return n === 1;`,
  },
  'power-of-three': {
    python: `        if n <= 0:
            return False
        while n % 3 == 0:
            n //= 3
        return n == 1`,
    java: `        if (n <= 0) return false;
        while (n % 3 == 0) n /= 3;
        return n == 1;`,
    cpp: `        if (n <= 0) return false;
        while (n % 3 == 0) n /= 3;
        return n == 1;`,
    javascript: `    if (n <= 0) return false;
    while (n % 3 === 0) n /= 3;
    return n === 1;`,
  },
  'power-of-four': {
    python: `        if n <= 0:
            return False
        while n % 4 == 0:
            n //= 4
        return n == 1`,
    java: `        if (n <= 0) return false;
        while (n % 4 == 0) n /= 4;
        return n == 1;`,
    cpp: `        if (n <= 0) return false;
        while (n % 4 == 0) n /= 4;
        return n == 1;`,
    javascript: `    if (n <= 0) return false;
    while (n % 4 === 0) n /= 4;
    return n === 1;`,
  },
  'nim-game': {
    python: `        return n % 4 != 0`,
    java: `        return n % 4 != 0;`,
    cpp: `        return n % 4 != 0;`,
    javascript: `    return n % 4 !== 0;`,
  },
  'perfect-number': {
    python: `        if n <= 1:
            return False
        total, i = 1, 2
        while i * i <= n:
            if n % i == 0:
                total += i
                if i != n // i:
                    total += n // i
            i += 1
        return total == n`,
    java: `        if (n <= 1) return false;
        int total = 1;
        for (int i = 2; (long) i * i <= n; i++) {
            if (n % i == 0) {
                total += i;
                if (i != n / i) total += n / i;
            }
        }
        return total == n;`,
    cpp: `        if (n <= 1) return false;
        int total = 1;
        for (int i = 2; (long long) i * i <= n; i++) {
            if (n % i == 0) {
                total += i;
                if (i != n / i) total += n / i;
            }
        }
        return total == n;`,
    javascript: `    if (n <= 1) return false;
    let total = 1;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            total += i;
            if (i !== n / i) total += n / i;
        }
    }
    return total === n;`,
  },
  'factorial-trailing-zeroes': {
    python: `        count = 0
        while n > 0:
            n //= 5
            count += n
        return count`,
    java: `        int count = 0;
        while (n > 0) {
            n /= 5;
            count += n;
        }
        return count;`,
    cpp: `        int count = 0;
        while (n > 0) {
            n /= 5;
            count += n;
        }
        return count;`,
    javascript: `    let count = 0;
    while (n > 0) {
        n = Math.floor(n / 5);
        count += n;
    }
    return count;`,
  },
  'number-complement': {
    python: `        mask = 1
        t = n
        while t > 0:
            mask <<= 1
            t >>= 1
        return (mask - 1) ^ n`,
    java: `        int mask = 1, t = n;
        while (t > 0) { mask <<= 1; t >>= 1; }
        return (mask - 1) ^ n;`,
    cpp: `        int mask = 1, t = n;
        while (t > 0) { mask <<= 1; t >>= 1; }
        return (mask - 1) ^ n;`,
    javascript: `    let mask = 1, t = n;
    while (t > 0) { mask <<= 1; t >>= 1; }
    return (mask - 1) ^ n;`,
  },
  'subtract-the-product-and-sum-of-digits': {
    python: `        product, total = 1, 0
        while n > 0:
            d = n % 10
            product *= d
            total += d
            n //= 10
        return product - total`,
    java: `        int product = 1, total = 0;
        while (n > 0) {
            int d = n % 10;
            product *= d;
            total += d;
            n /= 10;
        }
        return product - total;`,
    cpp: `        int product = 1, total = 0;
        while (n > 0) {
            int d = n % 10;
            product *= d;
            total += d;
            n /= 10;
        }
        return product - total;`,
    javascript: `    let product = 1, total = 0;
    while (n > 0) {
        const d = n % 10;
        product *= d;
        total += d;
        n = Math.floor(n / 10);
    }
    return product - total;`,
  },
  'number-of-steps-to-reduce-a-number-to-zero': {
    python: `        steps = 0
        while n > 0:
            if n % 2 == 0:
                n //= 2
            else:
                n -= 1
            steps += 1
        return steps`,
    java: `        int steps = 0;
        while (n > 0) {
            if (n % 2 == 0) n /= 2;
            else n -= 1;
            steps++;
        }
        return steps;`,
    cpp: `        int steps = 0;
        while (n > 0) {
            if (n % 2 == 0) n /= 2;
            else n -= 1;
            steps++;
        }
        return steps;`,
    javascript: `    let steps = 0;
    while (n > 0) {
        if (n % 2 === 0) n /= 2;
        else n -= 1;
        steps++;
    }
    return steps;`,
  },
  'bulb-switcher': {
    python: `        r = int(n ** 0.5)
        while (r + 1) * (r + 1) <= n:
            r += 1
        while r > 0 and r * r > n:
            r -= 1
        return r`,
    java: `        int r = (int) Math.sqrt((double) n);
        while ((long) (r + 1) * (r + 1) <= n) r++;
        while (r > 0 && (long) r * r > n) r--;
        return r;`,
    cpp: `        int r = (int) sqrt((double) n);
        while ((long long) (r + 1) * (r + 1) <= n) r++;
        while (r > 0 && (long long) r * r > n) r--;
        return r;`,
    javascript: `    let r = Math.floor(Math.sqrt(n));
    while ((r + 1) * (r + 1) <= n) r++;
    while (r > 0 && r * r > n) r--;
    return r;`,
  },
  'maximum-swap': {
    python: `        d = list(str(n))
        last = {int(c): i for i, c in enumerate(d)}
        for i, c in enumerate(d):
            for k in range(9, int(c), -1):
                if last.get(k, -1) > i:
                    d[i], d[last[k]] = d[last[k]], d[i]
                    return int(''.join(d))
        return n`,
    java: `        char[] d = Integer.toString(n).toCharArray();
        int[] last = new int[10];
        for (int i = 0; i < d.length; i++) last[d[i] - '0'] = i;
        for (int i = 0; i < d.length; i++) {
            for (int k = 9; k > d[i] - '0'; k--) {
                if (last[k] > i) {
                    char t = d[i]; d[i] = d[last[k]]; d[last[k]] = t;
                    return Integer.parseInt(new String(d));
                }
            }
        }
        return n;`,
    cpp: `        string d = to_string(n);
        int last[10] = {0};
        for (int i = 0; i < (int)d.size(); i++) last[d[i] - '0'] = i;
        for (int i = 0; i < (int)d.size(); i++) {
            for (int k = 9; k > d[i] - '0'; k--) {
                if (last[k] > i) {
                    swap(d[i], d[last[k]]);
                    return stoi(d);
                }
            }
        }
        return n;`,
    javascript: `    const d = String(n).split('');
    const last = {};
    for (let i = 0; i < d.length; i++) last[d[i]] = i;
    for (let i = 0; i < d.length; i++) {
        for (let k = 9; k > +d[i]; k--) {
            if (last[k] !== undefined && last[k] > i) {
                const t = d[i]; d[i] = d[last[k]]; d[last[k]] = t;
                return parseInt(d.join(''), 10);
            }
        }
    }
    return n;`,
  },
  'hamming-distance': {
    python: `        return bin(a ^ b).count('1')`,
    java: `        return Integer.bitCount(a ^ b);`,
    cpp: `        return __builtin_popcount((unsigned)(a ^ b));`,
    javascript: `    let x = a ^ b, c = 0;
    while (x) { c += x & 1; x >>>= 1; }
    return c;`,
  },
  'range-bitwise-and': {
    python: `        shift = 0
        while a < b:
            a >>= 1
            b >>= 1
            shift += 1
        return a << shift`,
    java: `        int shift = 0;
        while (a < b) { a >>= 1; b >>= 1; shift++; }
        return a << shift;`,
    cpp: `        int shift = 0;
        while (a < b) { a >>= 1; b >>= 1; shift++; }
        return a << shift;`,
    javascript: `    let shift = 0;
    while (a < b) { a >>= 1; b >>= 1; shift++; }
    return a << shift;`,
  },
  'single-number-iii': {
    python: `        x = 0
        for v in nums:
            x ^= v
        diff = x & (-x)
        a = b = 0
        for v in nums:
            if v & diff:
                a ^= v
            else:
                b ^= v
        return sorted([a, b])`,
    java: `        int xorAll = 0;
        for (int v : nums) xorAll ^= v;
        int diff = xorAll & (-xorAll);
        int a = 0, b = 0;
        for (int v : nums) {
            if ((v & diff) != 0) a ^= v; else b ^= v;
        }
        return new int[]{Math.min(a, b), Math.max(a, b)};`,
    cpp: `        int xorAll = 0;
        for (int v : nums) xorAll ^= v;
        int diff = xorAll & (-xorAll);
        int a = 0, b = 0;
        for (int v : nums) { if (v & diff) a ^= v; else b ^= v; }
        return {min(a, b), max(a, b)};`,
    javascript: `    let xorAll = 0;
    for (const v of nums) xorAll ^= v;
    const diff = xorAll & (-xorAll);
    let a = 0, b = 0;
    for (const v of nums) { if (v & diff) a ^= v; else b ^= v; }
    return [Math.min(a, b), Math.max(a, b)];`,
  },
  'majority-element-ii': {
    python: `        from collections import Counter
        n = len(nums)
        cnt = Counter(nums)
        return sorted(v for v in cnt if cnt[v] * 3 > n)`,
    java: `        int n = nums.length;
        Map<Integer, Integer> cnt = new HashMap<>();
        for (int x : nums) cnt.put(x, cnt.getOrDefault(x, 0) + 1);
        List<Integer> res = new ArrayList<>();
        for (Map.Entry<Integer, Integer> e : cnt.entrySet())
            if (e.getValue() * 3 > n) res.add(e.getKey());
        Collections.sort(res);
        int[] r = new int[res.size()];
        for (int i = 0; i < r.length; i++) r[i] = res.get(i);
        return r;`,
    cpp: `        int n = (int)nums.size();
        map<int, int> cnt;
        for (int x : nums) cnt[x]++;
        vector<int> res;
        for (auto& p : cnt) if (p.second * 3 > n) res.push_back(p.first);
        sort(res.begin(), res.end());
        return res;`,
    javascript: `    const n = nums.length;
    const cnt = new Map();
    for (const x of nums) cnt.set(x, (cnt.get(x) || 0) + 1);
    const res = [];
    for (const [k, v] of cnt) if (v * 3 > n) res.push(k);
    res.sort((a, b) => a - b);
    return res;`,
  },
  'boats-to-save-people': {
    python: `        nums.sort()
        i, j, boats = 0, len(nums) - 1, 0
        while i <= j:
            if nums[i] + nums[j] <= target:
                i += 1
            j -= 1
            boats += 1
        return boats`,
    java: `        Arrays.sort(nums);
        int i = 0, j = nums.length - 1, boats = 0;
        while (i <= j) {
            if (nums[i] + nums[j] <= target) i++;
            j--;
            boats++;
        }
        return boats;`,
    cpp: `        sort(nums.begin(), nums.end());
        int i = 0, j = (int)nums.size() - 1, boats = 0;
        while (i <= j) {
            if (nums[i] + nums[j] <= target) i++;
            j--;
            boats++;
        }
        return boats;`,
    javascript: `    nums.sort((a, b) => a - b);
    let i = 0, j = nums.length - 1, boats = 0;
    while (i <= j) {
        if (nums[i] + nums[j] <= target) i++;
        j--;
        boats++;
    }
    return boats;`,
  },
  'array-partition': {
    python: `        nums.sort()
        return sum(nums[::2])`,
    java: `        Arrays.sort(nums);
        int s = 0;
        for (int i = 0; i < nums.length; i += 2) s += nums[i];
        return s;`,
    cpp: `        sort(nums.begin(), nums.end());
        int s = 0;
        for (int i = 0; i < (int)nums.size(); i += 2) s += nums[i];
        return s;`,
    javascript: `    nums.sort((a, b) => a - b);
    let s = 0;
    for (let i = 0; i < nums.length; i += 2) s += nums[i];
    return s;`,
  },
  'minimum-moves-to-equal-array-elements': {
    python: `        mn = min(nums)
        return sum(x - mn for x in nums)`,
    java: `        int mn = nums[0];
        for (int x : nums) mn = Math.min(mn, x);
        int moves = 0;
        for (int x : nums) moves += x - mn;
        return moves;`,
    cpp: `        int mn = *min_element(nums.begin(), nums.end());
        int moves = 0;
        for (int x : nums) moves += x - mn;
        return moves;`,
    javascript: `    const mn = Math.min(...nums);
    let moves = 0;
    for (const x of nums) moves += x - mn;
    return moves;`,
  },
  'min-cost-to-move-chips': {
    python: `        even = sum(1 for x in nums if x % 2 == 0)
        return min(even, len(nums) - even)`,
    java: `        int even = 0;
        for (int x : nums) if (((x % 2) + 2) % 2 == 0) even++;
        return Math.min(even, nums.length - even);`,
    cpp: `        int even = 0;
        for (int x : nums) if (((x % 2) + 2) % 2 == 0) even++;
        return min(even, (int)nums.size() - even);`,
    javascript: `    let even = 0;
    for (const x of nums) if (((x % 2) + 2) % 2 === 0) even++;
    return Math.min(even, nums.length - even);`,
  },
};
module.exports = { SOL };
