// Rich, LeetCode-style editorials keyed by slug.
// Sections: Intuition -> Approach steps -> Walkthrough -> Solution -> Complexity -> Pitfalls.
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function ED(o) {
  var h = '';
  if (o.intuition) h += '<h3>Intuition</h3>' + (Array.isArray(o.intuition) ? o.intuition.map(function (p) { return '<p>' + p + '</p>'; }).join('') : '<p>' + o.intuition + '</p>');
  if (o.approach) h += '<h3>Approach</h3><ol>' + o.approach.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>';
  if (o.walkthrough) h += '<h3>Walkthrough</h3><pre><code>' + esc(o.walkthrough) + '</code></pre>';
  if (o.code) h += '<h3>Solution</h3><pre><code>' + esc(o.code) + '</code></pre>';
  h += '<h3>Complexity</h3><ul><li><b>Time — ' + o.time + ':</b> ' + o.timeWhy + '</li><li><b>Space — ' + o.space + ':</b> ' + o.spaceWhy + '</li></ul>';
  if (o.pitfalls) h += '<h3>Common Pitfalls</h3><ul>' + o.pitfalls.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>';
  if (o.note) h += '<div class="ed-note">' + o.note + '</div>';
  return h;
}

const E = {};

E['two-sum'] = ED({
  intuition: ['The brute force checks every pair — for each <code>i</code>, scan every <code>j</code> after it. That is O(n\u00b2) and wasteful because we keep re-scanning numbers we have already seen.',
    'The key realization: for a fixed number <code>x</code>, there is exactly one number that completes the pair — its complement <code>target - x</code>. So instead of searching for it, we can <em>remember</em> every number we have passed in a hash map and check for the complement in O(1).'],
  approach: ['Create a hash map from value \u2192 index.', 'Iterate once. For the current value <code>x</code>, compute <code>need = target - x</code>.', 'If <code>need</code> is already a key in the map, we have found the two numbers — return <code>[map[need], i]</code>.', 'Otherwise record <code>x \u2192 i</code> and move on. We store <em>after</em> checking so an element is never paired with itself.'],
  walkthrough: 'nums = [2, 7, 11, 15], target = 9\n\ni=0  x=2   need=7   map={}          -> 7 not seen, store 2:0\ni=1  x=7   need=2   map={2:0}       -> 2 IS seen -> return [0, 1]',
  code: 'def twoSum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        need = target - x\n        if need in seen:\n            return [seen[need], i]\n        seen[x] = i',
  time: 'O(n)', timeWhy: 'a single pass; each hash-map lookup and insert is O(1) on average.',
  space: 'O(n)', spaceWhy: 'in the worst case the map stores nearly every element before the matching pair appears.',
  pitfalls: ['Storing the value in the map <em>before</em> checking would let an element match itself.', 'Return indices, not the values themselves.'],
});

E['two-sum-ii'] = ED({
  intuition: ['Because the array is <strong>sorted</strong>, the sum of the two ends tells us which direction to move. If the pair is too small, only a larger left value helps; if too big, only a smaller right value helps.',
    'A two-pointer sweep exploits this to reach the answer in one pass and O(1) space, beating both brute force and the hash-map approach.'],
  approach: ['Put <code>l</code> at the first index and <code>r</code> at the last.', 'Compute <code>s = numbers[l] + numbers[r]</code>.', 'If <code>s == target</code>, return the 1-based indices <code>[l+1, r+1]</code>.', 'If <code>s &lt; target</code>, increment <code>l</code> (need a bigger number). If <code>s &gt; target</code>, decrement <code>r</code>.'],
  walkthrough: 'numbers = [2, 7, 11, 15], target = 9\n\nl=0 r=3  2+15=17 > 9  -> r=2\nl=0 r=2  2+11=13 > 9  -> r=1\nl=0 r=1  2+7 =9  == 9 -> return [1, 2]',
  code: 'def twoSum(numbers, target):\n    l, r = 0, len(numbers) - 1\n    while l < r:\n        s = numbers[l] + numbers[r]\n        if s == target:\n            return [l + 1, r + 1]\n        if s < target:\n            l += 1\n        else:\n            r -= 1',
  time: 'O(n)', timeWhy: 'each iteration moves one pointer inward, so together they cross the array at most once.',
  space: 'O(1)', spaceWhy: 'only two index variables.',
  pitfalls: ['This works <em>only</em> because the array is sorted — do not use it on unsorted input.', 'The problem is 1-indexed, so add 1 to each pointer.'],
});

E['valid-parentheses'] = ED({
  intuition: ['Brackets must close in the reverse order they open: the most recently opened bracket must be the first one closed. "Last opened, first closed" is the definition of a <strong>stack</strong> (LIFO).',
    'So we push every opening bracket and, on every closing bracket, verify it matches the bracket on top of the stack.'],
  approach: ['Maintain a stack of unmatched opening brackets.', 'For an opening bracket, push it.', 'For a closing bracket, the top of the stack must be its matching open — if the stack is empty or the top is wrong, the string is invalid.', 'At the end, the stack must be empty; leftover opens mean unclosed brackets.'],
  walkthrough: 's = "([])"\n\n(  push       stack=[ (\n[  push       stack=[ ( [\n]  top=[ ok   stack=[ (\n)  top=( ok   stack=[]\nend: stack empty -> valid',
  code: 'def isValid(s):\n    stack = []\n    match = {")": "(", "]": "[", "}": "{"}\n    for c in s:\n        if c in match:\n            if not stack or stack.pop() != match[c]:\n                return False\n        else:\n            stack.append(c)\n    return not stack',
  time: 'O(n)', timeWhy: 'each character is pushed and popped at most once.',
  space: 'O(n)', spaceWhy: 'a string of all opening brackets fills the stack.',
  pitfalls: ['Forgetting the final empty-stack check accepts strings like <code>"("</code>.', 'A closing bracket when the stack is empty (e.g. <code>")"</code>) must return false, not crash.'],
});

E['maximum-subarray'] = ED({
  intuition: ['Consider the best subarray that <em>ends</em> at each index. When you extend to a new element, you either continue the previous subarray or start fresh at the new element.',
    'The decision is simple: if the running sum has dropped below zero, it can only hurt what follows, so discard it and restart. This is Kadane\u2019s algorithm.'],
  approach: ['Keep <code>cur</code> = best sum of a subarray ending here, and <code>best</code> = best anywhere.', 'For each element: <code>cur = max(x, cur + x)</code> (restart vs. extend).', 'Update <code>best = max(best, cur)</code>.', 'Return <code>best</code>.'],
  walkthrough: 'nums = [-2, 1, -3, 4, -1, 2, 1]\n\nx=-2  cur=-2  best=-2\nx= 1  cur=1    best=1\nx=-3  cur=-2   best=1\nx= 4  cur=4    best=4\nx=-1  cur=3    best=4\nx= 2  cur=5    best=5\nx= 1  cur=6    best=6  -> answer 6',
  code: 'def maxSubArray(nums):\n    best = cur = nums[0]\n    for x in nums[1:]:\n        cur = max(x, cur + x)\n        best = max(best, cur)\n    return best',
  time: 'O(n)', timeWhy: 'one pass, constant work per element.',
  space: 'O(1)', spaceWhy: 'two running scalars.',
  pitfalls: ['Initialize with <code>nums[0]</code>, not 0 — an all-negative array must still return its largest single element.'],
});

E['contains-duplicate'] = ED({
  intuition: 'A value is a duplicate the moment we see it a second time. A hash set gives O(1) membership tests, so we can detect a repeat as soon as it occurs instead of comparing all pairs.',
  approach: ['Create an empty set.', 'For each number, if it is already present, return <code>True</code> immediately.', 'Otherwise insert it. If the loop finishes, all values were distinct \u2192 return <code>False</code>.'],
  walkthrough: 'nums = [1, 2, 3, 1]\n1 -> add {1}\n2 -> add {1,2}\n3 -> add {1,2,3}\n1 -> already in set -> return True',
  code: 'def containsDuplicate(nums):\n    seen = set()\n    for x in nums:\n        if x in seen:\n            return True\n        seen.add(x)\n    return False',
  time: 'O(n)', timeWhy: 'single pass with O(1) average set operations.',
  space: 'O(n)', spaceWhy: 'the set may grow to hold every element.',
  pitfalls: ['Sorting first (O(n log n)) also works and uses O(1) extra space — a good trade-off to mention if asked to avoid the hash set.'],
});

E['best-time-to-buy-and-sell-stock'] = ED({
  intuition: ['You must buy before you sell, so for each day the best profit is that day\u2019s price minus the cheapest price on any earlier day.',
    'Sweeping left to right, keep the minimum price seen so far behind you and, at each day, ask "what if I sold today?"'],
  approach: ['Track <code>minPrice</code> (cheapest seen so far) and <code>best</code> profit.', 'For each price, update <code>best = max(best, price - minPrice)</code>.', 'Then update <code>minPrice = min(minPrice, price)</code>.', 'Return <code>best</code> (0 if prices only fall).'],
  walkthrough: 'prices = [7, 1, 5, 3, 6, 4]\nday 7: min=7 best=0\nday 1: min=1 best=0\nday 5: best=4  min=1\nday 3: best=4\nday 6: best=5  (6-1)\nday 4: best=5  -> answer 5',
  code: 'def maxProfit(prices):\n    minPrice = float("inf")\n    best = 0\n    for p in prices:\n        best = max(best, p - minPrice)\n        minPrice = min(minPrice, p)\n    return best',
  time: 'O(n)', timeWhy: 'one pass.',
  space: 'O(1)', spaceWhy: 'two scalars.',
  pitfalls: ['Update <code>best</code> before <code>minPrice</code> each day, otherwise you allow buying and selling on the same day for 0 which is harmless, but the order keeps the logic clear.'],
});

E['single-number'] = ED({
  intuition: ['XOR has two properties that make this elegant: <code>a ^ a = 0</code> (a value XORed with itself cancels) and <code>a ^ 0 = a</code>.',
    'XOR-ing every element together cancels all the pairs, and the lone element is left standing.'],
  approach: ['Initialize <code>x = 0</code>.', 'XOR every element into <code>x</code>.', 'The paired numbers cancel to 0; the unique number remains.'],
  walkthrough: 'nums = [4, 1, 2, 1, 2]\n0 ^ 4 = 4\n4 ^ 1 = 5\n5 ^ 2 = 7\n7 ^ 1 = 6\n6 ^ 2 = 4  -> answer 4',
  code: 'def singleNumber(nums):\n    x = 0\n    for v in nums:\n        x ^= v\n    return x',
  time: 'O(n)', timeWhy: 'one pass.',
  space: 'O(1)', spaceWhy: 'a single accumulator — beats the O(n) hash-set solution the problem hints against.',
});

E['majority-element'] = ED({
  intuition: ['Because the majority element occurs more than n/2 times, if we cancel out pairs of <em>different</em> elements, the majority can never be fully cancelled — it will always survive.',
    'Boyer\u2013Moore voting implements this: hold one candidate and a counter; matching votes add, differing votes subtract.'],
  approach: ['Keep <code>candidate</code> and <code>count = 0</code>.', 'When <code>count</code> hits 0, adopt the current element as the candidate.', 'If the element equals the candidate, increment count; otherwise decrement.', 'The final candidate is the majority (guaranteed to exist).'],
  walkthrough: 'nums = [2, 2, 1, 1, 1, 2, 2]\n2: cand=2 cnt=1\n2: cnt=2\n1: cnt=1\n1: cnt=0\n1: cand=1 cnt=1\n2: cnt=0\n2: cand=2 cnt=1  -> answer 2',
  code: 'def majorityElement(nums):\n    candidate = None\n    count = 0\n    for x in nums:\n        if count == 0:\n            candidate = x\n        count += 1 if x == candidate else -1\n    return candidate',
  time: 'O(n)', timeWhy: 'one pass.',
  space: 'O(1)', spaceWhy: 'two variables, versus O(n) for a frequency map.',
});

E['product-of-array-except-self'] = ED({
  intuition: ['The answer at index <code>i</code> is the product of everything to its left times everything to its right. Division would be easy but is disallowed (and breaks on zeros).',
    'So compute prefix products in one pass and suffix products in another, multiplying them together.'],
  approach: ['Left pass: <code>ans[i]</code> = product of all elements before <code>i</code>.', 'Right pass: multiply <code>ans[i]</code> by the product of all elements after <code>i</code>.', 'The output array doubles as scratch space, so no extra arrays are needed.'],
  walkthrough: 'nums = [1, 2, 3, 4]\nprefix: [1, 1, 2, 6]\nsuffix multiply from right (24,12,4,1):\n[1*24, 1*12, 2*4, 6*1] = [24, 12, 8, 6]',
  code: 'def productExceptSelf(nums):\n    n = len(nums)\n    ans = [1] * n\n    prefix = 1\n    for i in range(n):\n        ans[i] = prefix\n        prefix *= nums[i]\n    suffix = 1\n    for i in range(n - 1, -1, -1):\n        ans[i] *= suffix\n        suffix *= nums[i]\n    return ans',
  time: 'O(n)', timeWhy: 'two linear passes.',
  space: 'O(1)', spaceWhy: 'excluding the required output, just two running products.',
  pitfalls: ['Do not use division — it fails when the array contains a zero.'],
});

E['plus-one'] = ED({
  intuition: 'This is grade-school addition starting from the least significant digit. A digit below 9 simply increments; a 9 becomes 0 and carries. The only special case is all 9s, which grows the number by one digit.',
  approach: ['Walk from the last digit toward the first.', 'If the digit &lt; 9, increment it and return — no further carry.', 'If it is 9, set it to 0 and continue.', 'If every digit was 9, prepend a 1.'],
  walkthrough: 'digits = [1, 9, 9]\ni=2: 9 -> 0 (carry)\ni=1: 9 -> 0 (carry)\ni=0: 1 -> 2, return [2, 0, 0]',
  code: 'def plusOne(digits):\n    for i in range(len(digits) - 1, -1, -1):\n        if digits[i] < 9:\n            digits[i] += 1\n            return digits\n        digits[i] = 0\n    return [1] + digits',
  time: 'O(n)', timeWhy: 'at most one pass over the digits.',
  space: 'O(1)', spaceWhy: 'in place, except the rare all-9s case.',
});

E['climbing-stairs'] = ED({
  intuition: ['To land on step <code>n</code> your last move came from step <code>n-1</code> (a single step) or step <code>n-2</code> (a double step). So the number of ways to reach <code>n</code> is the sum of the ways to reach those two steps.',
    'That is exactly the Fibonacci recurrence, computable in O(1) space.'],
  approach: ['There is 1 way to be at the bottom and 1 way to reach step 1.', 'Roll two counters forward: <code>next = a + b</code>.', 'After <code>n</code> steps the counter holds ways(n).'],
  walkthrough: 'n = 4\nsteps: 1, 1, 2, 3, 5\nways(0)=1 ways(1)=1 ways(2)=2 ways(3)=3 ways(4)=5',
  code: 'def climbStairs(n):\n    a, b = 1, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a',
  time: 'O(n)', timeWhy: 'a single loop to n.',
  space: 'O(1)', spaceWhy: 'only the last two counts are kept.',
});

E['fibonacci-number'] = ED({
  intuition: 'Naive recursion recomputes the same subproblems exponentially. Since F(n) depends only on the previous two values, iterate and keep just those two.',
  approach: ['Return n directly for F(0)=0 and F(1)=1.', 'Otherwise roll two variables forward n-1 times.', 'Return the second.'],
  walkthrough: 'n = 6\n0, 1, 1, 2, 3, 5, 8  -> F(6) = 8',
  code: 'def fib(n):\n    if n < 2:\n        return n\n    a, b = 0, 1\n    for _ in range(n - 1):\n        a, b = b, a + b\n    return b',
  time: 'O(n)', timeWhy: 'one loop.',
  space: 'O(1)', spaceWhy: 'two rolling variables (vs. O(n) for memoized recursion).',
});

E['valid-anagram'] = ED({
  intuition: 'Two strings are anagrams exactly when they contain the same multiset of characters. Comparing their character-frequency counts settles it.',
  approach: ['Different lengths \u2192 not anagrams.', 'Count characters of <code>s</code>.', 'Decrement while scanning <code>t</code>; a missing or over-used character means false.', 'If all counts balance, they are anagrams.'],
  walkthrough: 's = "anagram", t = "nagaram"\ncount(s) = {a:3, n:1, g:1, r:1, m:1}\ncount(t) = {n:1, a:3, g:1, r:1, m:1}  -> equal -> true',
  code: 'from collections import Counter\ndef isAnagram(s, t):\n    return len(s) == len(t) and Counter(s) == Counter(t)',
  time: 'O(n)', timeWhy: 'counting both strings is linear.',
  space: 'O(1)', spaceWhy: 'the count map is bounded by the alphabet (26 lowercase letters).',
  pitfalls: ['For Unicode input, a fixed 26-size array no longer suffices \u2014 use a hash map.'],
});

E['binary-search'] = ED({
  intuition: 'A sorted array lets one comparison eliminate half the remaining candidates: compare the target to the middle and recurse into the half that could contain it.',
  approach: ['Keep an inclusive window <code>[lo, hi]</code>.', 'Compute <code>mid</code>; if it equals the target, return it.', 'If the middle value is smaller, search the right half; otherwise the left half.', 'An empty window means the target is absent \u2192 return -1.'],
  walkthrough: 'nums = [-1,0,3,5,9,12], target = 9\nlo=0 hi=5 mid=2 (3) < 9 -> lo=3\nlo=3 hi=5 mid=4 (9) == 9 -> return 4',
  code: 'def search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1',
  time: 'O(log n)', timeWhy: 'the search range halves each iteration.',
  space: 'O(1)', spaceWhy: 'iterative with two indices.',
  pitfalls: ['In languages with fixed-width ints, use <code>lo + (hi - lo) // 2</code> to avoid overflow.', 'Use <code>lo &lt;= hi</code> (inclusive) to not miss the last element.'],
});

E['search-insert-position'] = ED({
  intuition: 'This is the "lower bound" flavor of binary search: find the first index whose value is \u2265 target. If the target is present that is its index; otherwise it is the correct insertion point.',
  approach: ['Search a half-open range <code>[lo, hi)</code> with <code>hi = n</code>.', 'If <code>nums[mid] &lt; target</code>, the answer is strictly right: <code>lo = mid + 1</code>.', 'Otherwise <code>mid</code> is a candidate: <code>hi = mid</code>.', 'When the range collapses, <code>lo</code> is the answer.'],
  walkthrough: 'nums = [1,3,5,6], target = 2\nlo=0 hi=4 mid=2 (5) >=2 -> hi=2\nlo=0 hi=2 mid=1 (3) >=2 -> hi=1\nlo=0 hi=1 mid=0 (1) <2 -> lo=1\nlo==hi==1 -> insert at 1',
  code: 'def searchInsert(nums, target):\n    lo, hi = 0, len(nums)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if nums[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid\n    return lo',
  time: 'O(log n)', timeWhy: 'binary search halves the range.',
  space: 'O(1)', spaceWhy: 'two indices.',
});

E['move-zeroes'] = ED({
  intuition: 'Keep a "write" pointer marking where the next non-zero value belongs. Sliding every non-zero value forward compacts them in order, and the zeros are pushed to the tail for free.',
  approach: ['Let <code>j = 0</code> be the slot for the next non-zero.', 'Scan with <code>i</code>; when <code>nums[i] != 0</code>, swap it into position <code>j</code> and advance <code>j</code>.', 'After the pass, <code>[0, j)</code> holds the non-zeros in order; the rest are zeros.'],
  walkthrough: 'nums = [0, 1, 0, 3]\ni=0 (0) skip           j=0\ni=1 (1) swap -> [1,0,0,3] j=1\ni=2 (0) skip           j=1\ni=3 (3) swap -> [1,3,0,0] j=2',
  code: 'def moveZeroes(nums):\n    j = 0\n    for i in range(len(nums)):\n        if nums[i] != 0:\n            nums[i], nums[j] = nums[j], nums[i]\n            j += 1\n    return nums',
  time: 'O(n)', timeWhy: 'single pass.',
  space: 'O(1)', spaceWhy: 'in place with one index.',
});

E['container-with-most-water'] = ED({
  intuition: ['The area between two lines is <code>width \u00d7 min(height_left, height_right)</code>. Start with the widest possible container (the two ends).',
    'Moving the taller wall inward can never increase the area (the shorter wall still caps the height while width shrinks). So always move the <em>shorter</em> wall, hoping to find a taller one.'],
  approach: ['Two pointers at the ends; track the best area.', 'Compute the current area.', 'Move the shorter side inward.', 'Stop when the pointers meet.'],
  walkthrough: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]\nl=0 r=8: area=8*1=8, move l (1<7)\nl=1 r=8: area=7*7=49, move r (7<8)\n... best stays 49 -> answer 49',
  code: 'def maxArea(height):\n    l, r = 0, len(height) - 1\n    best = 0\n    while l < r:\n        best = max(best, (r - l) * min(height[l], height[r]))\n        if height[l] < height[r]:\n            l += 1\n        else:\n            r -= 1\n    return best',
  time: 'O(n)', timeWhy: 'each step moves a pointer inward once.',
  space: 'O(1)', spaceWhy: 'two pointers.',
});

E['trapping-rain-water'] = ED({
  intuition: ['Water sitting above a bar equals <code>min(tallest wall on its left, tallest wall on its right) - the bar\u2019s own height</code>.',
    'With two pointers we always process the side whose max is definitely the limiting one: if the left bar is shorter than the right bar, the left side\u2019s water depends only on <code>leftMax</code>, so we can settle it immediately.'],
  approach: ['Pointers <code>l, r</code> plus <code>leftMax</code>, <code>rightMax</code>.', 'If <code>height[l] &lt; height[r]</code>: update <code>leftMax</code>, add <code>leftMax - height[l]</code>, move <code>l</code> right.', 'Else: update <code>rightMax</code>, add <code>rightMax - height[r]</code>, move <code>r</code> left.', 'Accumulate until the pointers meet.'],
  walkthrough: 'height = [4, 2, 0, 3, 2, 5]\nright side lower until the 5 at the end;\ntrapped: above the 2 -> 2, above 0 -> 3, above 3 -> 0, above 2 -> 1... total = 9',
  code: 'def trap(height):\n    l, r = 0, len(height) - 1\n    leftMax = rightMax = water = 0\n    while l < r:\n        if height[l] < height[r]:\n            leftMax = max(leftMax, height[l])\n            water += leftMax - height[l]\n            l += 1\n        else:\n            rightMax = max(rightMax, height[r])\n            water += rightMax - height[r]\n            r -= 1\n    return water',
  time: 'O(n)', timeWhy: 'a single two-pointer pass.',
  space: 'O(1)', spaceWhy: 'a few scalars (the precompute-arrays version costs O(n)).',
  pitfalls: ['Update the running max <em>before</em> adding water, or you may subtract more than the wall height.'],
});

E['house-robber'] = ED({
  intuition: 'At each house you make a binary choice: rob it (then you could not have robbed the previous one) or skip it. The best total up to house <code>i</code> is <code>max(skip = best up to i-1, rob = best up to i-2 + money[i])</code>.',
  approach: ['Keep two rolling values: best up to the previous house and the house before that.', 'For each house: <code>new = max(prev, prevPrev + money)</code>.', 'Roll forward; the last value is the answer.'],
  walkthrough: 'nums = [2, 7, 9, 3, 1]\ncur: 2, 7, 11, 11, 12  -> answer 12  (2 + 9 + 1)',
  code: 'def rob(nums):\n    prev, cur = 0, 0\n    for x in nums:\n        prev, cur = cur, max(cur, prev + x)\n    return cur',
  time: 'O(n)', timeWhy: 'one pass.',
  space: 'O(1)', spaceWhy: 'two rolling variables instead of a DP array.',
});

E['house-robber-ii'] = ED({
  intuition: ['The houses form a circle, so the first and last are neighbors and cannot both be robbed. That single constraint splits the problem into two linear House Robber problems.',
    'Solve once excluding the first house and once excluding the last; the better of the two is the answer.'],
  approach: ['Handle the single-house case directly.', 'Run linear House Robber on <code>nums[1:]</code> (drop the first).', 'Run it on <code>nums[:-1]</code> (drop the last).', 'Return the maximum.'],
  walkthrough: 'nums = [2, 3, 2]\nexclude first -> rob [3,2] -> 3\nexclude last  -> rob [2,3] -> 3\nmax -> 3',
  code: 'def rob(nums):\n    if len(nums) == 1:\n        return nums[0]\n    def line(a):\n        prev = cur = 0\n        for x in a:\n            prev, cur = cur, max(cur, prev + x)\n        return cur\n    return max(line(nums[1:]), line(nums[:-1]))',
  time: 'O(n)', timeWhy: 'two linear passes.',
  space: 'O(1)', spaceWhy: 'rolling variables.',
});

E['coin-change'] = ED({
  intuition: ['To make an amount with the fewest coins, imagine the <em>last</em> coin you place. If it has value <code>c</code>, the rest of the amount is <code>a - c</code>, which is a smaller version of the same problem.',
    'So <code>dp[a] = 1 + min(dp[a - c])</code> over all coins <code>c</code>. We build these answers from small amounts upward. Because coins can repeat, this is the unbounded knapsack.'],
  approach: ['Let <code>dp[a]</code> = fewest coins to make amount <code>a</code>; set <code>dp[0] = 0</code> and the rest to "infinity".', 'For each amount 1..amount, try every coin that fits and take <code>dp[a] = min(dp[a], dp[a-c] + 1)</code>.', 'If <code>dp[amount]</code> stayed at infinity, it is unreachable \u2192 return -1.'],
  walkthrough: 'coins = [1, 2, 5], amount = 11\ndp[5]=1, dp[10]=2, dp[11]=min(dp[10]+1, dp[9]+1, dp[6]+1)=3  (5+5+1)',
  code: 'def coinChange(coins, amount):\n    INF = amount + 1\n    dp = [0] + [INF] * amount\n    for a in range(1, amount + 1):\n        for c in coins:\n            if c <= a:\n                dp[a] = min(dp[a], dp[a - c] + 1)\n    return dp[amount] if dp[amount] <= amount else -1',
  time: 'O(amount \u00d7 coins)', timeWhy: 'each amount tries every coin.',
  space: 'O(amount)', spaceWhy: 'the 1-D dp table.',
  pitfalls: ['Use <code>amount + 1</code> as "infinity" so <code>dp[a-c] + 1</code> never overflows a real int.', 'Return -1 (not the sentinel) when the amount is unreachable.'],
});

E['longest-increasing-subsequence'] = ED({
  intuition: ['The O(n\u00b2) DP tries every previous element. The faster idea: keep an array <code>tails</code> where <code>tails[k]</code> is the smallest tail value of any increasing subsequence of length <code>k+1</code>.',
    'A smaller tail is always at least as useful (it leaves more room to extend), so binary-searching each number into <code>tails</code> keeps it sorted, and its length is the LIS length. This is patience sorting.'],
  approach: ['For each number, binary-search the first tail \u2265 it.', 'If none is \u2265 it, it extends the longest run \u2192 append.', 'Otherwise replace that tail with this (smaller) value.', 'The length of <code>tails</code> is the answer.'],
  walkthrough: 'nums = [10, 9, 2, 5, 3, 7]\n10 -> [10]\n9  -> [9]\n2  -> [2]\n5  -> [2,5]\n3  -> [2,3]\n7  -> [2,3,7]  -> length 3',
  code: 'import bisect\ndef lengthOfLIS(nums):\n    tails = []\n    for x in nums:\n        i = bisect.bisect_left(tails, x)\n        if i == len(tails):\n            tails.append(x)\n        else:\n            tails[i] = x\n    return len(tails)',
  time: 'O(n log n)', timeWhy: 'one binary search per element.',
  space: 'O(n)', spaceWhy: 'the tails array.',
  pitfalls: ['<code>tails</code> is not itself a valid subsequence \u2014 only its length is meaningful.', 'Use <code>bisect_left</code> for strictly increasing; <code>bisect_right</code> would allow duplicates.'],
});

E['missing-number'] = ED({
  intuition: 'The full set 0..n has a known sum, n(n+1)/2. Subtract the sum of the array you were given, and the leftover is precisely the missing number.',
  approach: ['Compute the expected sum <code>n(n+1)/2</code> for <code>n = len(nums)</code>.', 'Subtract the actual array sum.', 'Return the difference.'],
  walkthrough: 'nums = [3, 0, 1], n = 3\nexpected = 3*4/2 = 6\nactual   = 3+0+1 = 4\nmissing  = 6 - 4 = 2',
  code: 'def missingNumber(nums):\n    n = len(nums)\n    return n * (n + 1) // 2 - sum(nums)',
  time: 'O(n)', timeWhy: 'one pass to sum.',
  space: 'O(1)', spaceWhy: 'arithmetic only.',
  pitfalls: ['With huge n, the sum can overflow fixed-width ints \u2014 XOR of indices and values avoids that.'],
});

E['maximum-product-subarray'] = ED({
  intuition: ['Products differ from sums because two negatives make a positive, so the smallest (most negative) running product can suddenly become the largest.',
    'Track both the running maximum and running minimum ending at each index; on a negative number, swap them, because multiplying flips which is largest.'],
  approach: ['Keep <code>mx</code>, <code>mn</code> (max/min product ending here) and global <code>res</code>.', 'If the current number is negative, swap <code>mx</code> and <code>mn</code>.', 'Update <code>mx = max(x, mx*x)</code>, <code>mn = min(x, mn*x)</code>.', 'Update <code>res = max(res, mx)</code>.'],
  walkthrough: 'nums = [2, 3, -2, 4]\nx=2  mx=2 mn=2 res=2\nx=3  mx=6 mn=3 res=6\nx=-2 swap -> mx=3 mn=6; mx=max(-2,-6)=-2 mn=min(-2,-12)=-12 res=6\nx=4  mx=max(4,-8)=4 res=6  -> answer 6',
  code: 'def maxProduct(nums):\n    res = mx = mn = nums[0]\n    for x in nums[1:]:\n        if x < 0:\n            mx, mn = mn, mx\n        mx = max(x, mx * x)\n        mn = min(x, mn * x)\n        res = max(res, mx)\n    return res',
  time: 'O(n)', timeWhy: 'single pass.',
  space: 'O(1)', spaceWhy: 'three scalars.',
  pitfalls: ['You must track the minimum too \u2014 a lone max would miss the negative\u00d7negative flip.'],
});

E['jump-game'] = ED({
  intuition: 'Instead of trying jumps, track the farthest index reachable so far. As long as you never stand on an index beyond that reach, you can keep going; the moment an index exceeds the reach, you are stuck.',
  approach: ['Keep <code>reach = 0</code>.', 'Scan indices; if <code>i &gt; reach</code>, return False.', 'Otherwise extend <code>reach = max(reach, i + nums[i])</code>.', 'Finishing the scan means the end is reachable.'],
  walkthrough: 'nums = [3, 2, 1, 0, 4]\ni=0 reach=3\ni=1 reach=3\ni=2 reach=3\ni=3 reach=3\ni=4 4>reach -> False',
  code: 'def canJump(nums):\n    reach = 0\n    for i, x in enumerate(nums):\n        if i > reach:\n            return False\n        reach = max(reach, i + x)\n    return True',
  time: 'O(n)', timeWhy: 'single greedy pass.',
  space: 'O(1)', spaceWhy: 'one variable.',
});

E['kth-largest-element-in-an-array'] = ED({
  intuition: ['We only need the k-th largest, not a full sort. A min-heap of size k keeps exactly the k largest values seen; its root (the smallest of those) is the k-th largest overall.',
    'Quickselect gives O(n) average time, but the heap is simpler and robust.'],
  approach: ['Push each element into a min-heap.', 'Whenever the heap exceeds size k, pop the smallest.', 'After all elements, the heap holds the k largest and its root is the answer.'],
  walkthrough: 'nums = [3,2,1,5,6,4], k = 2\nkeep 2 largest: heap ends as [5, 6]; root 5 -> 2nd largest = 5',
  code: 'import heapq\ndef findKthLargest(nums, k):\n    heap = []\n    for x in nums:\n        heapq.heappush(heap, x)\n        if len(heap) > k:\n            heapq.heappop(heap)\n    return heap[0]',
  time: 'O(n log k)', timeWhy: 'n elements, each an O(log k) heap op. Quickselect is O(n) average.',
  space: 'O(k)', spaceWhy: 'the heap holds at most k elements.',
});

E['longest-substring-without-repeating-characters'] = ED({
  intuition: ['Slide a window over the string keeping it free of duplicates. When the new character was already inside the window, jump the left edge to just past its previous position \u2014 that removes the duplicate in O(1).',
    'The window only ever grows on the right and jumps forward on the left, so each character is handled once.'],
  approach: ['Store the last index seen for each character and a <code>left</code> boundary.', 'For character at <code>right</code>: if it was seen at index \u2265 <code>left</code>, set <code>left = lastSeen + 1</code>.', 'Record its new index and update the best length <code>right - left + 1</code>.'],
  walkthrough: 's = "abcabcbb"\nwindow grows to "abc" (len 3)\nat index 3 (a): a seen at 0 -> left=1, window "bca"\n... best stays 3 -> answer 3',
  code: 'def lengthOfLongestSubstring(s):\n    seen = {}\n    left = best = 0\n    for right, c in enumerate(s):\n        if c in seen and seen[c] >= left:\n            left = seen[c] + 1\n        seen[c] = right\n        best = max(best, right - left + 1)\n    return best',
  time: 'O(n)', timeWhy: 'each character is visited once; <code>left</code> only moves forward.',
  space: 'O(min(n, charset))', spaceWhy: 'at most one map entry per distinct character.',
  pitfalls: ['The <code>seen[c] &gt;= left</code> check matters \u2014 an old occurrence outside the window must be ignored.'],
});

E['valid-palindrome'] = ED({
  intuition: 'After lowercasing and stripping non-alphanumeric characters, a palindrome reads identically forwards and backwards. Two pointers converging from both ends confirm this without building a reversed copy (O(1) space).',
  approach: ['Filter to lowercase alphanumeric characters (or skip non-alphanumerics with two pointers in place).', 'Compare the cleaned sequence to its reverse.', 'Equal means palindrome.'],
  walkthrough: 's = "A man, a plan, a canal: Panama"\ncleaned = "amanaplanacanalpanama"\nreads same both ways -> true',
  code: 'def isPalindrome(s):\n    t = [c.lower() for c in s if c.isalnum()]\n    return t == t[::-1]',
  time: 'O(n)', timeWhy: 'one pass to clean, one comparison.',
  space: 'O(1)', spaceWhy: 'the two-pointer variant compares in place (the shown version uses O(n) for the cleaned list).',
});

E['palindrome-number'] = ED({
  intuition: 'A number is a palindrome exactly when it equals its own digit-reversal. Negatives never qualify because of the leading minus sign.',
  approach: ['If negative, return False.', 'Reverse the digits (or compare the string form with its reverse).', 'Return whether they match.'],
  walkthrough: 'n = 121 -> "121" reversed "121" -> true\nn = -121 -> negative -> false\nn = 10  -> "10" vs "01" -> false',
  code: 'def isPalindrome(n):\n    if n < 0:\n        return False\n    s = str(n)\n    return s == s[::-1]',
  time: 'O(d)', timeWhy: 'proportional to the digit count d.',
  space: 'O(1)', spaceWhy: 'reversing half the number arithmetically avoids the string entirely for a strict O(1) solution.',
});

E['min-cost-climbing-stairs'] = ED({
  intuition: 'The cost to stand on a step is its own cost plus the cheaper of the two ways to get there (one or two steps below). Build these minimum costs upward; the top is just past the last step.',
  approach: ['Track the min cost to reach the previous two steps.', 'For each step: <code>cost_here = step + min(prev, prevPrev)</code>.', 'Return <code>min(last, secondLast)</code> since you can step onto the top from either.'],
  walkthrough: 'cost = [10, 15, 20]\nreach step0=10, step1=15, step2=20+min(10,15)=30\ntop = min(step1, step2) = min(15, 30) = 15',
  code: 'def minCostClimbingStairs(cost):\n    a = b = 0\n    for c in cost:\n        a, b = b, c + min(a, b)\n    return min(a, b)',
  time: 'O(n)', timeWhy: 'one pass.',
  space: 'O(1)', spaceWhy: 'two rolling variables.',
});

E['sqrtx'] = ED({
  intuition: 'The integer square root is the largest <code>m</code> with <code>m\u00b2 \u2264 n</code>. Since <code>m\u00b2</code> grows monotonically, binary-search for that boundary instead of scanning.',
  approach: ['Binary-search <code>m</code> in <code>[0, n]</code>.', 'If <code>m\u00b2 \u2264 n</code>, record <code>m</code> and search higher.', 'Otherwise search lower.', 'Return the last valid <code>m</code>.'],
  walkthrough: 'n = 8\nlo=0 hi=8 mid=4 16>8 -> hi=3\nlo=0 hi=3 mid=1 1<=8 ans=1 lo=2\nlo=2 hi=3 mid=2 4<=8 ans=2 lo=3\nlo=3 hi=3 mid=3 9>8 hi=2 -> answer 2',
  code: 'def mySqrt(n):\n    lo, hi, ans = 0, n, 0\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if mid * mid <= n:\n            ans = mid\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return ans',
  time: 'O(log n)', timeWhy: 'binary search halves the range each step.',
  space: 'O(1)', spaceWhy: 'a few integers.',
  pitfalls: ['<code>mid * mid</code> can overflow 32-bit ints for large n \u2014 use 64-bit or compare <code>mid</code> against <code>n / mid</code>.'],
});

module.exports = { EDITORIALS: E };
