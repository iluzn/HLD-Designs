---
permalink: /dsa-fundamentals/bit-manipulation/
layout: default
title: "Bit Manipulation - DSA Fundamentals"
description: "Complete guide to bit manipulation: XOR tricks, set/clear/toggle bits, counting bits, and common patterns. Code in Python/Java/C++/JavaScript with practice problems."
hide_toc: false
---

# Bit Manipulation

**The pattern:** Use bitwise operations (AND, OR, XOR, shifts) to solve problems in O(1) space and O(n) time that would otherwise require extra data structures. Bits let you encode states, find unique elements, and perform arithmetic tricks without extra memory.

**Why this matters in interviews:** Bit manipulation problems look like magic until you know the tricks. They test low-level thinking and mathematical insight. The key operations are few — learn them and you'll solve any bit problem quickly.

---

## When to Recognize It

- The problem says **O(1) extra space** and involves finding unique/missing elements
- XOR can cancel out pairs: "find the single number" (all others appear twice)
- You need to **check, set, or toggle** specific flags/properties
- Keywords: "single number," "missing number," "power of two," "count bits," "XOR"
- The problem involves **subsets** encoded as bitmasks (each bit = include/exclude an element)

---

## How It Works

Think of each number as a row of light switches (bits). Each operation flips, checks, or combines switches:

```mermaid
flowchart LR
    A["AND: both on = on"]:::client
    B["OR: either on = on"]:::service
    C["XOR: different = on"]:::data
    D["NOT: flip all"]:::client

    A --- B
    B --- C
    C --- D

    classDef client fill:#4c3a5e,stroke:#818cf8,color:#e2e8f0
    classDef service fill:#1a3a2a,stroke:#4ade80,color:#e2e8f0
    classDef data fill:#3b3520,stroke:#fbbf24,color:#e2e8f0
```

**Essential XOR properties:**
- `a ^ a = 0` (same number cancels itself)
- `a ^ 0 = a` (XOR with 0 changes nothing)
- XOR is commutative and associative (order doesn't matter)

**Common bit tricks:**
- Check if bit i is set: `(n >> i) & 1`
- Set bit i: `n | (1 << i)`
- Clear bit i: `n & ~(1 << i)`
- Toggle bit i: `n ^ (1 << i)`
- Check power of 2: `n & (n - 1) == 0`
- Get lowest set bit: `n & (-n)`
- Count set bits: keep clearing lowest bit with `n & (n - 1)`

---

## Template Code

### Code

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Python</button>
<button class="tab-btn">Java</button>
<button class="tab-btn">C++</button>
<button class="tab-btn">JavaScript</button>
</div>
<div class="tab-content active">

<pre><code class="language-python"># Single Number: find the element that appears once (all others twice)
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num  # pairs cancel out
    return result

# Number of 1 bits (Hamming weight)
def hamming_weight(n):
    count = 0
    while n:
        n &amp;= (n - 1)  # clear lowest set bit
        count += 1
    return count

# Missing number: [0..n] with one missing
def missing_number(nums):
    n = len(nums)
    result = n  # start with n (the last index)
    for i in range(n):
        result ^= i ^ nums[i]
    return result

# Counting bits: for each i in [0..n], count set bits
def count_bits(n):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i &gt;&gt; 1] + (i &amp; 1)
    return dp</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-java">// Single Number
int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) result ^= num;
    return result;
}

// Number of 1 bits
int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
        n &amp;= (n - 1);
        count++;
    }
    return count;
}

// Missing number
int missingNumber(int[] nums) {
    int result = nums.length;
    for (int i = 0; i &lt; nums.length; i++) {
        result ^= i ^ nums[i];
    }
    return result;
}

// Counting bits
int[] countBits(int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i &lt;= n; i++) {
        dp[i] = dp[i &gt;&gt; 1] + (i &amp; 1);
    }
    return dp;
}</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-cpp">// Single Number
int singleNumber(vector&lt;int&gt;&amp; nums) {
    int result = 0;
    for (int num : nums) result ^= num;
    return result;
}

// Number of 1 bits
int hammingWeight(uint32_t n) {
    int count = 0;
    while (n) {
        n &amp;= (n - 1);
        count++;
    }
    return count;
}

// Missing number
int missingNumber(vector&lt;int&gt;&amp; nums) {
    int result = nums.size();
    for (int i = 0; i &lt; nums.size(); i++) {
        result ^= i ^ nums[i];
    }
    return result;
}

// Counting bits
vector&lt;int&gt; countBits(int n) {
    vector&lt;int&gt; dp(n + 1, 0);
    for (int i = 1; i &lt;= n; i++) {
        dp[i] = dp[i &gt;&gt; 1] + (i &amp; 1);
    }
    return dp;
}</code></pre>

</div>
<div class="tab-content">

<pre><code class="language-javascript">// Single Number
function singleNumber(nums) {
    let result = 0;
    for (const num of nums) result ^= num;
    return result;
}

// Number of 1 bits
function hammingWeight(n) {
    let count = 0;
    while (n) {
        n &amp;= (n - 1);
        count++;
    }
    return count;
}

// Missing number
function missingNumber(nums) {
    let result = nums.length;
    for (let i = 0; i &lt; nums.length; i++) {
        result ^= i ^ nums[i];
    }
    return result;
}

// Counting bits
function countBits(n) {
    const dp = new Array(n + 1).fill(0);
    for (let i = 1; i &lt;= n; i++) {
        dp[i] = dp[i &gt;&gt; 1] + (i &amp; 1);
    }
    return dp;
}</code></pre>

</div>
</div>

---

## Variations

### Bitmask DP (Subsets as Integers)

Represent a subset of n elements as an n-bit integer. Bit i is 1 if element i is included. Iterate over all 2^n subsets with a loop from 0 to (1 << n) - 1.

### Two Single Numbers

If two numbers appear once (all others twice), XOR all gives `a ^ b`. Find any set bit in the result (this is where a and b differ). Partition all numbers by that bit — each partition has exactly one unique number.

### Reverse Bits

Swap bits from both ends, or build the result bit by bit from LSB to MSB.

---

## Complexity

| Operation | Time | Space |
|---|---|---|
| Single Number (XOR) | O(n) | O(1) |
| Count 1 bits | O(k) where k = set bits | O(1) |
| Missing Number | O(n) | O(1) |
| Counting Bits [0..n] | O(n) | O(n) |

---

## Common Mistakes

- **Forgetting signed vs unsigned** — in Java, `>>>` is unsigned right shift, `>>` preserves the sign bit. Use `>>>` for bit counting.
- **Python's infinite-precision integers** — `~n` in Python doesn't give a 32-bit complement. Use `n ^ 0xFFFFFFFF` for 32-bit NOT.
- **Off-by-one in shift amounts** — `1 << 31` is the sign bit in 32-bit integers. Be careful with overflow.
- **XOR doesn't work for elements appearing 3+ times** — for "single number II" (all others appear thrice), you need modular bit counting, not simple XOR.

---

## Practice Problems

- [Single Number](/dsa/problem/single-number)
- [Number of 1 Bits](/dsa/problem/number-of-1-bits)
- [Counting Bits](/dsa/problem/counting-bits)
- [Missing Number](/dsa/problem/missing-number)
- [Reverse Bits](/dsa/problem/reverse-bits)

---

## Key Takeaways

- XOR is the star: `a ^ a = 0` and `a ^ 0 = a`. This finds unique elements without extra space.
- `n & (n-1)` clears the lowest set bit — use it for counting bits and checking powers of 2
- Bit manipulation gives O(1) space solutions where hash maps would use O(n)
- Master the 5 tricks (check, set, clear, toggle, lowest set bit) and you can solve any bit problem
