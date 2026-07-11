// Rich editorials, keyed by slug. Structure: intuition -> approach steps ->
// solution code -> complexity with reasoning. build.js uses EDITORIALS[slug].
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function ED(o) {
  var h = '';
  if (o.intuition) h += '<h3>Intuition</h3><p>' + o.intuition + '</p>';
  if (o.approach) h += '<h3>Approach</h3><ol>' + o.approach.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>';
  if (o.code) h += '<h3>Solution</h3><pre><code>' + esc(o.code) + '</code></pre>';
  h += '<h3>Complexity</h3><ul><li><b>Time — ' + o.time + ':</b> ' + o.timeWhy + '</li><li><b>Space — ' + o.space + ':</b> ' + o.spaceWhy + '</li></ul>';
  if (o.note) h += '<div class="ed-note">' + o.note + '</div>';
  return h;
}

const E = {};

E['two-sum'] = ED({
  intuition: 'For each number we need its complement <code>target - x</code>. Instead of scanning the rest of the array every time (O(n²)), we remember every value we have already seen in a hash map so the complement lookup is O(1).',
  approach: ['Create an empty hash map from value to index.', 'Walk the array once. For the current value <code>x</code>, compute <code>need = target - x</code>.', 'If <code>need</code> is already in the map, we found the pair — return the stored index and the current index.', 'Otherwise store <code>x -&gt; i</code> and continue. Storing after the check prevents using the same element twice.'],
  code: 'def twoSum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        need = target - x\n        if need in seen:\n            return [seen[need], i]\n        seen[x] = i',
  time: 'O(n)', timeWhy: 'one pass over the array, each hash lookup/insert is O(1) on average.',
  space: 'O(n)', spaceWhy: 'in the worst case the map holds every element before the pair is found.',
});

E['two-sum-ii'] = ED({
  intuition: 'The array is sorted, so we can use the ordering to decide which way to move. If the current pair sums to too little we need a bigger number; if too much, a smaller one — a two-pointer sweep from both ends does this in O(1) space.',
  approach: ['Put a pointer <code>l</code> at the start and <code>r</code> at the end.', 'Look at <code>nums[l] + nums[r]</code>. If it equals the target, return the 1-based indices.', 'If the sum is less than the target, move <code>l</code> right to increase it.', 'If the sum is greater, move <code>r</code> left to decrease it. Repeat until they meet.'],
  code: 'def twoSum(numbers, target):\n    l, r = 0, len(numbers) - 1\n    while l < r:\n        s = numbers[l] + numbers[r]\n        if s == target:\n            return [l + 1, r + 1]\n        if s < target:\n            l += 1\n        else:\n            r -= 1',
  time: 'O(n)', timeWhy: 'each step moves one pointer, so the two pointers together traverse the array at most once.',
  space: 'O(1)', spaceWhy: 'only two index variables — no extra data structures.',
  note: 'This only works because the array is sorted. For an unsorted array, use the hash-map approach from Two Sum.',
});

E['valid-parentheses'] = ED({
  intuition: 'Brackets must close in reverse order of opening — the most recently opened bracket must be the first to close. "Most recent first" is exactly a stack (LIFO).',
  approach: ['Keep a stack of open brackets.', 'For each opening bracket <code>( [ {</code>, push it.', 'For each closing bracket, the top of the stack must be the matching open bracket. If the stack is empty or the top does not match, the string is invalid.', 'After processing everything, the stack must be empty — leftover opens mean unclosed brackets.'],
  code: 'def isValid(s):\n    stack = []\n    match = {")": "(", "]": "[", "}": "{"}\n    for c in s:\n        if c in match:\n            if not stack or stack.pop() != match[c]:\n                return False\n        else:\n            stack.append(c)\n    return not stack',
  time: 'O(n)', timeWhy: 'each character is pushed and popped at most once.',
  space: 'O(n)', spaceWhy: 'in the worst case (all opening brackets) the stack holds the entire string.',
});

E['maximum-subarray'] = ED({
  intuition: 'At each position ask: is it better to extend the running subarray, or start fresh here? If the running sum has gone negative, it can only drag down whatever comes next, so we restart. This is Kadane\u2019s algorithm.',
  approach: ['Track <code>cur</code> = best subarray sum ending at the current index, and <code>best</code> = best seen anywhere.', 'For each number, set <code>cur = max(x, cur + x)</code> — either start new at <code>x</code> or extend.', 'Update <code>best = max(best, cur)</code>.', 'Return <code>best</code>.'],
  code: 'def maxSubArray(nums):\n    best = cur = nums[0]\n    for x in nums[1:]:\n        cur = max(x, cur + x)\n        best = max(best, cur)\n    return best',
  time: 'O(n)', timeWhy: 'a single pass with constant work per element.',
  space: 'O(1)', spaceWhy: 'only two running variables.',
  note: 'Initialize with <code>nums[0]</code>, not 0 — arrays can be all-negative, and the answer must be at least one element.',
});

E['contains-duplicate'] = ED({
  intuition: 'A value is a duplicate the second time we encounter it. A hash set lets us remember what we have seen and detect a repeat instantly.',
  approach: ['Create an empty set.', 'For each number, if it is already in the set, return <code>True</code>.', 'Otherwise add it. If the loop finishes, everything was distinct — return <code>False</code>.'],
  code: 'def containsDuplicate(nums):\n    seen = set()\n    for x in nums:\n        if x in seen:\n            return True\n        seen.add(x)\n    return False',
  time: 'O(n)', timeWhy: 'one pass, O(1) average set operations.',
  space: 'O(n)', spaceWhy: 'the set may hold every element.',
});

E['best-time-to-buy-and-sell-stock'] = ED({
  intuition: 'To maximize profit you buy at the lowest price seen so far and sell later. Sweeping left to right, keep the minimum price behind you and, at each day, check the profit if you sold today.',
  approach: ['Track <code>minPrice</code> (best day to have bought so far) and <code>best</code> profit.', 'For each price: update <code>best = max(best, price - minPrice)</code>.', 'Then update <code>minPrice = min(minPrice, price)</code>.', 'Return <code>best</code> (0 if prices only fall).'],
  code: 'def maxProfit(prices):\n    minPrice = float("inf")\n    best = 0\n    for p in prices:\n        best = max(best, p - minPrice)\n        minPrice = min(minPrice, p)\n    return best',
  time: 'O(n)', timeWhy: 'single pass.',
  space: 'O(1)', spaceWhy: 'two scalars.',
});

E['single-number'] = ED({
  intuition: 'XOR has two magic properties: <code>a ^ a = 0</code> and <code>a ^ 0 = a</code>. XOR-ing every number together cancels each pair, leaving only the unique element.',
  approach: ['Start with <code>x = 0</code>.', 'XOR every element into <code>x</code>.', 'All paired numbers cancel to 0; the lone number remains.'],
  code: 'def singleNumber(nums):\n    x = 0\n    for v in nums:\n        x ^= v\n    return x',
  time: 'O(n)', timeWhy: 'one pass.',
  space: 'O(1)', spaceWhy: 'a single accumulator — beats the O(n) hash-set approach.',
});

E['majority-element'] = ED({
  intuition: 'The majority element appears more than n/2 times, so if we pair up and cancel different elements, the majority always survives. This is the Boyer\u2013Moore voting algorithm.',
  approach: ['Keep a <code>candidate</code> and a <code>count</code> starting at 0.', 'For each number: if <code>count == 0</code>, adopt it as the candidate.', 'If the number equals the candidate, increment count, else decrement it.', 'The candidate at the end is the majority (guaranteed to exist).'],
  code: 'def majorityElement(nums):\n    candidate = None\n    count = 0\n    for x in nums:\n        if count == 0:\n            candidate = x\n        count += 1 if x == candidate else -1\n    return candidate',
  time: 'O(n)', timeWhy: 'one pass.',
  space: 'O(1)', spaceWhy: 'two variables — no frequency map needed.',
});

E['product-of-array-except-self'] = ED({
  intuition: 'Without division, the answer for index <code>i</code> is (product of everything to its left) \u00d7 (product of everything to its right). Two passes compute both sides.',
  approach: ['First pass (left to right): set <code>ans[i]</code> to the running product of everything before <code>i</code>.', 'Second pass (right to left): multiply <code>ans[i]</code> by the running product of everything after <code>i</code>.', 'Return <code>ans</code>. The output array itself carries the prefix products, so no extra arrays are needed.'],
  code: 'def productExceptSelf(nums):\n    n = len(nums)\n    ans = [1] * n\n    prefix = 1\n    for i in range(n):\n        ans[i] = prefix\n        prefix *= nums[i]\n    suffix = 1\n    for i in range(n - 1, -1, -1):\n        ans[i] *= suffix\n        suffix *= nums[i]\n    return ans',
  time: 'O(n)', timeWhy: 'two linear passes.',
  space: 'O(1)', spaceWhy: 'ignoring the output array, only two running products are stored.',
});

E['plus-one'] = ED({
  intuition: 'Adding one is grade-school addition from the rightmost digit, carrying while a digit is 9. The only tricky case is all-9s (e.g. 999), which grows by a digit.',
  approach: ['Iterate from the last digit backward.', 'If the digit is less than 9, increment it and return — no carry needed.', 'If it is 9, set it to 0 and continue (carry).', 'If we fall off the front, every digit was 9 — prepend a leading 1.'],
  code: 'def plusOne(digits):\n    for i in range(len(digits) - 1, -1, -1):\n        if digits[i] < 9:\n            digits[i] += 1\n            return digits\n        digits[i] = 0\n    return [1] + digits',
  time: 'O(n)', timeWhy: 'at most one pass over the digits.',
  space: 'O(1)', spaceWhy: 'in place, except the rare all-9s case that adds one digit.',
});

E['climbing-stairs'] = ED({
  intuition: 'To reach step <code>n</code> you arrive either from step <code>n-1</code> (a 1-step) or step <code>n-2</code> (a 2-step). So ways(n) = ways(n-1) + ways(n-2) — the Fibonacci recurrence.',
  approach: ['Base: 1 way to stand at the bottom, 1 way to reach step 1.', 'Iterate up, keeping only the last two counts.', 'Return the count for step <code>n</code>.'],
  code: 'def climbStairs(n):\n    a, b = 1, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a',
  time: 'O(n)', timeWhy: 'one loop to n.',
  space: 'O(1)', spaceWhy: 'only the last two values are kept (no DP array needed).',
});

E['fibonacci-number'] = ED({
  intuition: 'Direct definition: F(n) = F(n-1) + F(n-2). Computing iteratively avoids the exponential blow-up of naive recursion.',
  approach: ['Handle F(0)=0, F(1)=1.', 'Iterate keeping the previous two values, rolling them forward.', 'Return the nth value.'],
  code: 'def fib(n):\n    if n < 2:\n        return n\n    a, b = 0, 1\n    for _ in range(n - 1):\n        a, b = b, a + b\n    return b',
  time: 'O(n)', timeWhy: 'one loop.',
  space: 'O(1)', spaceWhy: 'two rolling variables.',
});

E['valid-anagram'] = ED({
  intuition: 'Two strings are anagrams iff they contain the same characters with the same counts. Compare their character-frequency maps.',
  approach: ['If lengths differ, they cannot be anagrams — return False.', 'Count each character of <code>s</code>.', 'Decrement counts while scanning <code>t</code>; if any count goes negative (or a char is missing), return False.', 'If all counts balance out, return True.'],
  code: 'from collections import Counter\ndef isAnagram(s, t):\n    return len(s) == len(t) and Counter(s) == Counter(t)',
  time: 'O(n)', timeWhy: 'counting both strings is linear.',
  space: 'O(1)', spaceWhy: 'the count map is bounded by the alphabet size (26 for lowercase letters).',
});

E['binary-search'] = ED({
  intuition: 'The array is sorted, so comparing the target to the middle element tells us which half to discard. Each step halves the search space.',
  approach: ['Maintain a window <code>[lo, hi]</code>.', 'Look at <code>mid</code>. If it equals the target, return <code>mid</code>.', 'If the middle value is smaller, the target must be in the right half (<code>lo = mid + 1</code>); otherwise the left half (<code>hi = mid - 1</code>).', 'If the window empties, the target is absent — return -1.'],
  code: 'def search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1',
  time: 'O(log n)', timeWhy: 'the range halves every iteration.',
  space: 'O(1)', spaceWhy: 'iterative — just two indices.',
});

E['search-insert-position'] = ED({
  intuition: 'This is binary search for the <em>first</em> index whose value is \u2265 target (the lower bound). If the target exists that is its index; if not, it is exactly where it should be inserted.',
  approach: ['Search on the half-open range <code>[lo, hi)</code> with <code>hi = n</code>.', 'If <code>nums[mid] &lt; target</code>, the answer is to the right (<code>lo = mid + 1</code>).', 'Otherwise it could be <code>mid</code> or to the left (<code>hi = mid</code>).', 'When the range collapses, <code>lo</code> is the insert position.'],
  code: 'def searchInsert(nums, target):\n    lo, hi = 0, len(nums)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if nums[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid\n    return lo',
  time: 'O(log n)', timeWhy: 'binary search halves the range each step.',
  space: 'O(1)', spaceWhy: 'two indices.',
});

E['move-zeroes'] = ED({
  intuition: 'Keep a write pointer for the next non-zero slot. Slide every non-zero value forward; the zeros naturally bubble to the end, and relative order is preserved.',
  approach: ['Let <code>j = 0</code> be the position for the next non-zero element.', 'Scan with <code>i</code>. When <code>nums[i]</code> is non-zero, swap it into <code>nums[j]</code> and advance <code>j</code>.', 'After the pass, indices <code>[0, j)</code> hold the non-zeros in order and the rest are zeros.'],
  code: 'def moveZeroes(nums):\n    j = 0\n    for i in range(len(nums)):\n        if nums[i] != 0:\n            nums[i], nums[j] = nums[j], nums[i]\n            j += 1\n    return nums',
  time: 'O(n)', timeWhy: 'single pass.',
  space: 'O(1)', spaceWhy: 'in place with one extra index.',
});

E['container-with-most-water'] = ED({
  intuition: 'Area = width \u00d7 min(left height, right height). Start with the widest container (both ends) and move the <em>shorter</em> wall inward — moving the taller wall can never help, since the shorter wall caps the height.',
  approach: ['Pointers at both ends; track the best area.', 'Compute the area for the current pair.', 'Move whichever side is shorter inward, hoping to find a taller wall.', 'Stop when the pointers meet.'],
  code: 'def maxArea(height):\n    l, r = 0, len(height) - 1\n    best = 0\n    while l < r:\n        best = max(best, (r - l) * min(height[l], height[r]))\n        if height[l] < height[r]:\n            l += 1\n        else:\n            r -= 1\n    return best',
  time: 'O(n)', timeWhy: 'each step moves a pointer inward once.',
  space: 'O(1)', spaceWhy: 'two pointers.',
});

E['trapping-rain-water'] = ED({
  intuition: 'Water above a bar equals <code>min(tallest wall to its left, tallest wall to its right) - its own height</code>. With two pointers we always know the true limiting wall on the shorter side, so we can settle that side immediately.',
  approach: ['Pointers <code>l, r</code> at the ends, plus <code>leftMax</code> and <code>rightMax</code>.', 'If <code>height[l] &lt; height[r]</code>, the left side is limited by <code>leftMax</code>: add <code>leftMax - height[l]</code> and move <code>l</code> right.', 'Otherwise do the symmetric thing on the right.', 'Accumulate until the pointers meet.'],
  code: 'def trap(height):\n    l, r = 0, len(height) - 1\n    leftMax = rightMax = water = 0\n    while l < r:\n        if height[l] < height[r]:\n            leftMax = max(leftMax, height[l])\n            water += leftMax - height[l]\n            l += 1\n        else:\n            rightMax = max(rightMax, height[r])\n            water += rightMax - height[r]\n            r -= 1\n    return water',
  time: 'O(n)', timeWhy: 'single two-pointer pass.',
  space: 'O(1)', spaceWhy: 'a handful of scalars (the array-precompute version uses O(n)).',
});

E['house-robber'] = ED({
  intuition: 'At each house you either rob it (and must skip the previous one) or skip it. So the best up to house <code>i</code> is <code>max(skip it = best up to i-1, rob it = best up to i-2 + money[i])</code>.',
  approach: ['Keep two rolling values: best up to the previous house and the one before it.', 'For each house, the new best is <code>max(prevBest, prevPrevBest + money)</code>.', 'Roll the variables forward and return the final best.'],
  code: 'def rob(nums):\n    prev, cur = 0, 0\n    for x in nums:\n        prev, cur = cur, max(cur, prev + x)\n    return cur',
  time: 'O(n)', timeWhy: 'one pass.',
  space: 'O(1)', spaceWhy: 'two rolling variables instead of a DP array.',
});

E['house-robber-ii'] = ED({
  intuition: 'The houses form a circle, so the first and last are adjacent and cannot both be robbed. That splits into two ordinary (linear) House Robber problems: one excluding the first house, one excluding the last. The answer is the better of the two.',
  approach: ['Handle the single-house edge case directly.', 'Run linear House Robber on <code>nums[1:]</code> (exclude first).', 'Run it on <code>nums[:-1]</code> (exclude last).', 'Return the maximum of the two results.'],
  code: 'def rob(nums):\n    if len(nums) == 1:\n        return nums[0]\n    def line(a):\n        prev = cur = 0\n        for x in a:\n            prev, cur = cur, max(cur, prev + x)\n        return cur\n    return max(line(nums[1:]), line(nums[:-1]))',
  time: 'O(n)', timeWhy: 'two linear passes.',
  space: 'O(1)', spaceWhy: 'rolling variables.',
});

E['coin-change'] = ED({
  intuition: 'To make amount <code>a</code> with the fewest coins, try each coin as the last one used: the answer is <code>1 + best way to make (a - coin)</code>. Build these answers bottom-up. Coins can repeat, so this is the unbounded knapsack.',
  approach: ['Let <code>dp[a]</code> = fewest coins to make amount <code>a</code>; initialize to a large "infinity" and <code>dp[0] = 0</code>.', 'For every amount from 1 to <code>amount</code>, try each coin that fits and take <code>min(dp[a], dp[a - coin] + 1)</code>.', 'If <code>dp[amount]</code> was never improved past infinity, the amount is unreachable — return -1.'],
  code: 'def coinChange(coins, amount):\n    INF = amount + 1\n    dp = [0] + [INF] * amount\n    for a in range(1, amount + 1):\n        for c in coins:\n            if c <= a:\n                dp[a] = min(dp[a], dp[a - c] + 1)\n    return dp[amount] if dp[amount] <= amount else -1',
  time: 'O(amount \u00d7 coins)', timeWhy: 'for each amount we try every coin.',
  space: 'O(amount)', spaceWhy: 'the 1-D dp table.',
  note: 'Use <code>amount + 1</code> as "infinity" rather than a huge int so <code>dp[a-c] + 1</code> never overflows.',
});

E['longest-increasing-subsequence'] = ED({
  intuition: 'Maintain <code>tails[k]</code> = the smallest possible tail value of an increasing subsequence of length <code>k+1</code>. A smaller tail leaves more room to extend later. Binary search places each number, and the length of <code>tails</code> is the answer (patience sorting).',
  approach: ['For each number, binary-search the first tail that is \u2265 it.', 'If none exists, the number extends the longest run — append it.', 'Otherwise replace that tail with the (smaller) number.', 'The final length of <code>tails</code> is the LIS length.'],
  code: 'import bisect\ndef lengthOfLIS(nums):\n    tails = []\n    for x in nums:\n        i = bisect.bisect_left(tails, x)\n        if i == len(tails):\n            tails.append(x)\n        else:\n            tails[i] = x\n    return len(tails)',
  time: 'O(n log n)', timeWhy: 'one binary search per element. (The simpler DP is O(n\u00b2).)',
  space: 'O(n)', spaceWhy: 'the tails array.',
  note: '<code>tails</code> is not an actual subsequence, but its length is always correct.',
});

E['missing-number'] = ED({
  intuition: 'The numbers 0..n have a known sum n(n+1)/2. Subtract the actual sum of the array and what remains is the missing number.',
  approach: ['Compute the expected sum <code>n(n+1)/2</code> for <code>n = len(nums)</code>.', 'Subtract the actual array sum.', 'Return the difference.'],
  code: 'def missingNumber(nums):\n    n = len(nums)\n    return n * (n + 1) // 2 - sum(nums)',
  time: 'O(n)', timeWhy: 'one pass to sum.',
  space: 'O(1)', spaceWhy: 'arithmetic only. (XOR gives the same result and avoids overflow concerns.)',
});

E['maximum-product-subarray'] = ED({
  intuition: 'Unlike sums, a product can flip sign: a very negative running product becomes the largest if multiplied by another negative. So we track both the running maximum and running minimum, and swap them when we hit a negative number.',
  approach: ['Track <code>mx</code> and <code>mn</code> (max and min product ending here), plus a global <code>res</code>.', 'If the current number is negative, swap <code>mx</code> and <code>mn</code> (a negative flips which is largest).', 'Update <code>mx = max(x, mx*x)</code> and <code>mn = min(x, mn*x)</code>.', 'Update <code>res = max(res, mx)</code>.'],
  code: 'def maxProduct(nums):\n    res = mx = mn = nums[0]\n    for x in nums[1:]:\n        if x < 0:\n            mx, mn = mn, mx\n        mx = max(x, mx * x)\n        mn = min(x, mn * x)\n        res = max(res, mx)\n    return res',
  time: 'O(n)', timeWhy: 'single pass.',
  space: 'O(1)', spaceWhy: 'three scalars.',
});

E['jump-game'] = ED({
  intuition: 'Track the farthest index reachable so far. If you ever stand on an index beyond that reach, you are stuck; otherwise you can always reach the end.',
  approach: ['Keep <code>reach = 0</code>.', 'Scan indices left to right. If the current index is past <code>reach</code>, return False.', 'Otherwise extend <code>reach = max(reach, i + nums[i])</code>.', 'If the loop finishes, the last index is reachable — return True.'],
  code: 'def canJump(nums):\n    reach = 0\n    for i, x in enumerate(nums):\n        if i > reach:\n            return False\n        reach = max(reach, i + x)\n    return True',
  time: 'O(n)', timeWhy: 'single greedy pass.',
  space: 'O(1)', spaceWhy: 'one variable.',
});

E['kth-largest-element-in-an-array'] = ED({
  intuition: 'We only need the k-th largest, not a full ranking. A min-heap of size k keeps the k largest seen so far; its smallest element is the answer. (Sorting also works and is simplest.)',
  approach: ['Push elements into a min-heap; when it exceeds size k, pop the smallest.', 'After processing all elements, the heap holds the k largest, and its root is the k-th largest.', 'Alternatively, sort descending and take index k-1.'],
  code: 'import heapq\ndef findKthLargest(nums, k):\n    heap = []\n    for x in nums:\n        heapq.heappush(heap, x)\n        if len(heap) > k:\n            heapq.heappop(heap)\n    return heap[0]',
  time: 'O(n log k)', timeWhy: 'each of n elements does an O(log k) heap operation. Quickselect gives O(n) average.',
  space: 'O(k)', spaceWhy: 'the heap holds at most k elements.',
});

E['longest-substring-without-repeating-characters'] = ED({
  intuition: 'Slide a window over the string. When a character repeats inside the window, jump the left edge just past the previous occurrence so the window never contains a duplicate.',
  approach: ['Track the last index seen for each character and a <code>left</code> boundary.', 'For each character at <code>right</code>: if it was seen at or after <code>left</code>, move <code>left</code> to <code>lastSeen + 1</code>.', 'Record its new index and update the best window length <code>right - left + 1</code>.'],
  code: 'def lengthOfLongestSubstring(s):\n    seen = {}\n    left = best = 0\n    for right, c in enumerate(s):\n        if c in seen and seen[c] >= left:\n            left = seen[c] + 1\n        seen[c] = right\n        best = max(best, right - left + 1)\n    return best',
  time: 'O(n)', timeWhy: 'each character is visited once; left only moves forward.',
  space: 'O(min(n, charset))', spaceWhy: 'the map holds at most one entry per distinct character.',
});

E['valid-palindrome'] = ED({
  intuition: 'Ignore case and non-alphanumeric characters, then a palindrome reads the same from both ends. Two pointers comparing inward avoids building a reversed copy.',
  approach: ['Filter to lowercase alphanumeric characters (or skip them in place with two pointers).', 'Compare the cleaned string to its reverse.', 'Equal means it is a palindrome.'],
  code: 'def isPalindrome(s):\n    t = [c.lower() for c in s if c.isalnum()]\n    return t == t[::-1]',
  time: 'O(n)', timeWhy: 'one pass to clean, one comparison.',
  space: 'O(1)', spaceWhy: 'the two-pointer variant compares in place; the shown version uses O(n) for the cleaned list.',
});

E['palindrome-number'] = ED({
  intuition: 'A number reads the same forwards and backwards exactly when it equals its own reverse. Negative numbers are never palindromes because of the leading minus sign.',
  approach: ['If the number is negative, return False.', 'Reverse its digits (or compare the string to its reverse).', 'Return whether the reverse equals the original.'],
  code: 'def isPalindrome(n):\n    if n < 0:\n        return False\n    s = str(n)\n    return s == s[::-1]',
  time: 'O(d)', timeWhy: 'proportional to the number of digits d.',
  space: 'O(1)', spaceWhy: 'the digit-reversal variant uses constant space (avoid string conversion for the O(1) version).',
});

E['min-cost-climbing-stairs'] = ED({
  intuition: 'The cost to stand on a step is the step\u2019s own cost plus the cheaper of the two ways to arrive (from one or two steps below). Build these minimum costs upward.',
  approach: ['Track the min cost to reach the previous two steps.', 'For each step, its cost is <code>step_cost + min(prev, prevPrev)</code>.', 'The top is just past the last step, so return <code>min(last, secondLast)</code>.'],
  code: 'def minCostClimbingStairs(cost):\n    a = b = 0\n    for c in cost:\n        a, b = b, c + min(a, b)\n    return min(a, b)',
  time: 'O(n)', timeWhy: 'one pass.',
  space: 'O(1)', spaceWhy: 'two rolling variables.',
});

E['sqrtx'] = ED({
  intuition: 'The integer square root is the largest <code>m</code> with <code>m\u00b2 \u2264 n</code>. Since <code>m\u00b2</code> increases monotonically, binary-search for that boundary.',
  approach: ['Binary-search <code>m</code> in <code>[0, n]</code>.', 'If <code>m\u00b2 \u2264 n</code>, <code>m</code> is a valid candidate — record it and search higher.', 'Otherwise search lower.', 'Return the last valid candidate.'],
  code: 'def mySqrt(n):\n    lo, hi, ans = 0, n, 0\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if mid * mid <= n:\n            ans = mid\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return ans',
  time: 'O(log n)', timeWhy: 'binary search halves the range each step.',
  space: 'O(1)', spaceWhy: 'a few integers.',
});

module.exports = { EDITORIALS: E };
