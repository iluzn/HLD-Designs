---
layout: default
title: "Coin Change"
description: "Dynamic Programming pattern: find the minimum number of coins to make a target amount. Classic unbounded knapsack."
permalink: /dsa/coin-change
---

# Coin Change

⚡ **Difficulty:** Medium 🏷️ **Pattern:** Dynamic Programming 🏢 **Asked at:** Amazon, Google, Meta, Goldman Sachs, PhonePe

---

## Problem

Given an array `coins` of different denominations and a target `amount`, return the **fewest number of coins** needed to make up that amount. If it's impossible, return `-1`.

You have an infinite supply of each coin denomination.

**Constraints:**
- `1 ≤ coins.length ≤ 12`
- `1 ≤ coins[i] ≤ 2^31 - 1`
- `0 ≤ amount ≤ 10,000`

**Examples:**
```
Input:  coins = [1, 5, 10], amount = 12
Output: 3   (10 + 1 + 1)

Input:  coins = [2], amount = 3
Output: -1  (impossible)

Input:  coins = [1], amount = 0
Output: 0
```

---

## Approach

### Why DP?

This has **overlapping subproblems** + **optimal substructure**:
- To make amount `A`, I can use any coin `c` and then solve for `A - c`.
- The subproblems overlap: making 7 might require making 5, which itself requires making 3, etc.

### State definition

`dp[i]` = minimum coins needed to make amount `i`.

### Recurrence

```
dp[i] = min(dp[i - coin] + 1)  for each coin where coin <= i
```

### Base case

`dp[0] = 0` (zero amount needs zero coins).

### Fill order

Bottom-up from `1` to `amount`.

---

## Complexity

| | Time | Space |
|---|---|---|
| Bottom-up DP | O(amount × coins) | O(amount) |
| Recursive + memo | O(amount × coins) | O(amount) stack + memo |
| Brute force | O(coins^(amount/min_coin)) | exponential |

---

## Solution

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn active">Java</button>
<button class="tab-btn">Python</button>
<button class="tab-btn">C++</button>
</div>
<div class="tab-content active">
<pre><code class="language-java">public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1); // "infinity"
    dp[0] = 0;

    for (int i = 1; i &lt;= amount; i++) {
        for (int coin : coins) {
            if (coin &lt;= i &amp;&amp; dp[i - coin] + 1 &lt; dp[i]) {
                dp[i] = dp[i - coin] + 1;
            }
        }
    }
    return dp[amount] &gt; amount ? -1 : dp[amount];
}</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-python">def coinChange(coins: list[int], amount: int) -&gt; int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin &lt;= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1</code></pre>
</div>
<div class="tab-content">
<pre><code class="language-cpp">int coinChange(vector&lt;int&gt;&amp; coins, int amount) {
    vector&lt;int&gt; dp(amount + 1, amount + 1);
    dp[0] = 0;

    for (int i = 1; i &lt;= amount; i++) {
        for (int coin : coins) {
            if (coin &lt;= i &amp;&amp; dp[i - coin] + 1 &lt; dp[i]) {
                dp[i] = dp[i - coin] + 1;
            }
        }
    }
    return dp[amount] &gt; amount ? -1 : dp[amount];
}</code></pre>
</div>
</div>

---

## Key Insight

> This is the **unbounded knapsack** variant — you can reuse coins. The "bounded" version (each coin used once) would iterate coins in the outer loop and amounts in inner, but here it doesn't matter because reuse is allowed.

---

## Walkthrough

```
coins = [1, 5, 10], amount = 12

dp[0] = 0
dp[1] = dp[0]+1 = 1      (use coin 1)
dp[2] = dp[1]+1 = 2
dp[3] = dp[2]+1 = 3
dp[4] = dp[3]+1 = 4
dp[5] = min(dp[4]+1, dp[0]+1) = 1  (use coin 5)
dp[6] = dp[5]+1 = 2
...
dp[10] = min(dp[9]+1, dp[5]+1, dp[0]+1) = 1  (use coin 10)
dp[11] = dp[10]+1 = 2  (10 + 1)
dp[12] = min(dp[11]+1, dp[7]+1, dp[2]+1) = 3  (10 + 1 + 1)

Answer: 3
```

---

## Common DP Mistakes

1. **Forgetting the base case** → `dp[0] = 0` is critical.
2. **Using `Integer.MAX_VALUE` as infinity** → Adding 1 to it overflows! Use `amount + 1` instead.
3. **Wrong loop order for bounded vs unbounded** → For unbounded (this problem), order doesn't matter. For 0/1 knapsack, iterate coins outer, amounts inner, and go right-to-left.

---

## Follow-ups

- **Coin Change II (count ways)** → Same structure but `dp[i] += dp[i - coin]` instead of `min`.
- **Minimum cost climbing stairs** → Same pattern, different "coins" (step sizes).
- **Perfect Squares** → "coins" are 1², 2², 3²...

---

## Related Problems

- [Coin Change II](https://leetcode.com/problems/coin-change-ii/) (count combinations)
- [Perfect Squares](https://leetcode.com/problems/perfect-squares/)
- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)

---

*Drop a comment below if you want a follow-up on the counting-ways variant 👇*
