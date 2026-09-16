export default {
  id: 'subarray-sum-equals-k',
  title: 'Subarray Sum Equals K',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> and an integer <code>k</code>, return the total number of subarrays whose sum equals <code>k</code>.',
  examples: [
    { input: 'nums=[1,1,1], k=2', output: '2', explanation: 'Subarrays [1,1] starting at index 0 and 1.' },
    { input: 'nums=[1,2,3], k=3', output: '2', explanation: '[1,2] and [3].' },
  ],
  constraints: ['1 ≤ nums.length ≤ 2 × 10⁴', '-1000 ≤ nums[i] ≤ 1000', '-10⁷ ≤ k ≤ 10⁷'],
  starterCode: `class Solution:
    def subarray_sum(self, nums, k):
        pass`,
  runnerSetup: 'subarray_sum = Solution().subarray_sum',
  functionName: 'subarray_sum',
  conceptId: 'arrays',
  testCases: [
    { label: 'Two subarrays', args: [[1,1,1],2], expected: 2 },
    { label: 'Two paths', args: [[1,2,3],3], expected: 2 },
    { label: 'Negative values', args: [[1,-1,1],1], expected: 3 },
    { label: 'No match', args: [[1,2,3],7], expected: 0 },
  ],
  bruteHint: 'A brute-force approach checks every possible subarray by trying all start and end index pairs and summing the elements between them, which costs O(n²) time (or worse if you re-sum from scratch for every pair instead of extending a running total). With nums.length up to 2 × 10⁴, that is already hundreds of millions of additions. Where is this approach redoing work it does not need to, given that neighboring subarrays share almost all of their elements?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraint sizes tell you how much work your algorithm can afford to do. "1 ≤ nums.length ≤ 2 × 10⁴" — what does this say about an O(n²) brute-force approach?',
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 2 × 10⁴' },
      options: [
        { label: 'O(n²) is fine here', isCorrect: false, feedback: 'At n = 20,000, O(n²) is 400 million operations — likely too slow for most graders even in compiled languages. This constraint suggests O(n) or O(n log n) is expected.' },
        { label: 'O(n) is the target', isCorrect: true },
        { label: 'O(n log n) is required', isCorrect: false, feedback: 'O(n log n) would pass, but the prefix-sum approach achieves O(n) with a hash map. The constraint rules out O(n²), not O(n).' },
        { label: 'Input size does not affect strategy', isCorrect: false, feedback: 'Input size always affects strategy. At n = 20,000, the difference between O(n) and O(n²) is 20,000 operations versus 400 million.' },
      ],
      correctFeedback: 'At n = 20,000, O(n²) is 400 million operations. A prefix-sum approach with a hash map solves this in O(n).',
      wrongFeedback: [
        'With n = 20,000, how many pairs does a nested loop check? Is that fast enough?',
        '20,000² = 400 million. What does that tell you about nested-loop approaches at this constraint size?',
      ],
    },
    {
      id: 'negative-values-block-sliding-window',
      question: 'Knowing which values are possible can rule out approaches that only work when things grow in one direction. "-1000 ≤ nums[i] ≤ 1000" allows negative values. Why does this matter for your approach?',
      highlight: { location: 'constraint', text: '-1000 ≤ nums[i] ≤ 1000' },
      options: [
        { label: 'You need to handle negatives with abs()', isCorrect: false, feedback: 'Taking absolute values changes the sums entirely. The problem asks for subarrays summing to k with the actual values, not their magnitudes.' },
        { label: 'Growing and shrinking a contiguous window based on whether the sum is too large no longer works', isCorrect: true },
        { label: 'Negatives make the problem unsolvable in O(n)', isCorrect: false, feedback: 'Prefix sums with a hash map handle negatives in O(n). Negatives only block sliding window, not all linear approaches.' },
        { label: 'Sort the array to group negatives', isCorrect: false, feedback: 'Sorting destroys subarray structure — subarrays must be contiguous in the original array. You cannot rearrange elements.' },
      ],
      correctFeedback: 'A sliding window can only shrink when the sum is too large, which assumes all values are non-negative. With negatives, the sum can decrease even as the window grows — so the window has no monotone property to exploit.',
      wrongFeedback: [
        'Sliding window works by shrinking the window when the sum exceeds the target. What happens to that logic when adding an element can decrease the sum?',
        'Negative values break the assumption that a larger window always has a larger sum. What approach handles sums without relying on monotonicity?',
      ],
    },
    {
      id: 'prefix-sum-key-insight',
      question: 'Reframing a problem mathematically often reveals which structure naturally fits it. A subarray sum from index i to j equals prefix[j] − prefix[i-1]. What does this reduce the problem to?',
      options: [
        { label: 'Finding two prefix sums that differ by k', isCorrect: true },
        { label: 'Sorting the prefix sums', isCorrect: false, feedback: 'Sorting prefix sums loses the pairing structure — you need to know which prefix sums came before the current one, not just which values exist.' },
        { label: 'Finding the maximum prefix sum', isCorrect: false, feedback: 'The maximum prefix sum finds the maximum subarray (Kadane\'s problem), not subarrays summing to a specific k.' },
        { label: 'Computing all O(n²) prefix-sum differences', isCorrect: false, feedback: 'Computing all differences is still O(n²). A hash map lets you check in O(1) whether the needed complement prefix sum was seen before — reducing the total work to O(n).' },
      ],
      correctFeedback: 'If prefix[j] − prefix[i-1] = k, then prefix[i-1] = prefix[j] − k. Store each prefix sum in a hash map as you go; at each j, look up how many times prefix[j] − k has appeared.',
      wrongFeedback: [
        'You want prefix[j] − prefix[i] = k. Rearrange: what value of prefix[i] are you looking for, given prefix[j]?',
        'You need prefix[i] = prefix[j] − k. If you store prefix sums in a hash map as you scan, can you look that up in O(1) at each step?',
      ],
    },
    {
      id: 'count-output',
      question: 'What the output actually asks for can reduce how much bookkeeping you need to do along the way. "return the total number of subarrays whose sum equals <code>k</code>" — what does this allow?',
      highlight: { location: 'description', text: 'return the total number of subarrays whose sum equals <code>k</code>' },
      options: [
        { label: 'You must still enumerate all subarrays', isCorrect: false, feedback: 'Enumerating all subarrays is O(n²) work. A count output means you only need to increment a counter — the hash map approach does exactly this without listing subarrays.' },
        { label: 'Tracking only whether a sum has been seen before, not how many times', isCorrect: false, feedback: 'A set records only whether a prefix sum was seen, not how many times. When the same prefix sum appears multiple times, each occurrence corresponds to a valid subarray — you need a frequency count.' },
        { label: 'Increment a counter without storing subarray boundaries', isCorrect: true },
        { label: 'You can stop at the first match', isCorrect: false, feedback: 'There may be multiple subarrays summing to k (the first example has 2). You must count all of them — an early exit would give the wrong answer.' },
      ],
      correctFeedback: 'A count output means you never need to record which subarrays matched — just how many. The hash map stores prefix-sum frequencies; you add that frequency to a running total.',
      wrongFeedback: [
        'You are counting matches, not listing them. Do you need to know where each matching subarray starts and ends?',
        'Each time prefix[j] − k exists in the map, you add its frequency to the count. You never store the subarray itself — just increment.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def subarray_sum(self, nums, k):
        count = {0: 1}
        total = 0
        result = 0
        for n in nums:
            total += n
            result += count.get(total - k, 0)
            count[total] = count.get(total, 0) + 1
        return result`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'The map must start as <code>{0: 1}</code>, not empty — that entry represents "a prefix sum of 0 before the array even starts," which is what lets a subarray beginning at index 0 be counted correctly when its own running total happens to equal <code>k</code>.',
  solutionExplanation: 'A subarray sums to <code>k</code> exactly when two prefix sums differ by <code>k</code>, so counting how many earlier prefix sums equal <code>current_total - k</code> counts exactly how many subarrays ending here sum to <code>k</code> — no need to know where those subarrays start, only how many times that target prefix value has occurred before. Because negative numbers are allowed, the same prefix sum can recur, which is why the map stores frequencies rather than just the most recent index.',
  solution: {
    patternName: 'Prefix-sum complement lookup via hashing — use when a running total needs to hit a target difference, not an absolute value',
    approaches: [
      {
        approachName: 'Brute force',
        oneLineIdea: 'Check every subarray, extending a running sum instead of re-summing',
        subgoals: [
          { label: 'Fix the subarray\'s start', explanation: 'Loop the start index over every position' },
          { label: 'Extend the sum as the end grows', explanation: 'For a fixed start, grow the end index one step at a time, adding just the new element instead of re-summing from scratch' },
          { label: 'Count every match', explanation: 'Increment a counter whenever the running sum equals k, without stopping the scan' },
        ],
        code: `def subarray_sum(nums, k):
    count = 0
    n = len(nums)
    for start in range(n):                    # fix the subarray's start
        total = 0
        for end in range(start, n):
            total += nums[end]                # extend the sum as the end grows
            if total == k:
                count += 1                     # count every match
    return count`,
        timeComplexity: 'O(n²) — every one of the n possible start indices grows its subarray up to n steps, each step O(1) since the sum is extended rather than recomputed',
        spaceComplexity: 'O(1) — only the running total and counter',
        whenYouWouldActuallyUseThis: 'Fine for a small array or as a first correct attempt — it already avoids the worse mistake of re-summing from scratch for every pair, but it still checks every possible subarray individually.',
      },
      {
        approachName: 'Prefix sum + hash map',
        oneLineIdea: 'Track how many times each prefix sum has occurred, and look up the complement',
        subgoals: [
          { label: 'Maintain a running prefix sum', explanation: 'One pass accumulates the sum of all elements up to the current index' },
          { label: 'Look up the complement prefix sum', explanation: 'A subarray ending here sums to k exactly when an earlier prefix sum equals the current total minus k' },
          { label: 'Record the current prefix sum\'s frequency', explanation: 'Store how many times each prefix sum has occurred so later indices can look it up in O(1)' },
        ],
        code: `def subarray_sum(nums, k):
    prefix_counts = {0: 1}                        # empty prefix (sum 0) occurs once before scanning starts
    total = 0
    count = 0
    for x in nums:
        total += x                                 # maintain a running prefix sum
        complement = total - k
        count += prefix_counts.get(complement, 0)  # look up the complement prefix sum
        prefix_counts[total] = prefix_counts.get(total, 0) + 1  # record the current prefix sum's frequency
    return count`,
        timeComplexity: 'O(n) — one pass, with an O(1) average-case hash map lookup and update per element',
        spaceComplexity: 'O(n) — the hash map can hold up to n+1 distinct prefix sums',
        whenYouWouldActuallyUseThis: 'The default choice — this is also the only approach here that handles negative values correctly at O(n), since a sliding window\'s shrink-when-too-large logic assumes every element is non-negative, which this problem explicitly does not guarantee.',
      },
    ],
    comparisonTable: [
      { approach: 'Brute force', time: 'O(n²)', space: 'O(1)', structuralUnlock: 'None — every subarray is still checked individually, just without re-summing from scratch' },
      { approach: 'Prefix sum + hash map', time: 'O(n)', space: 'O(n)', structuralUnlock: 'Reframing "subarray sums to k" as "two prefix sums differ by k" turns a search over all subarrays into a single O(1) lookup per index' },
    ],
    transferNote: 'The prefix-sum-as-hash-key trick reappears in Continuous Subarray Sum (the same idea, keyed by remainder instead of raw sum) and Contiguous Array (prefix sum of +1/−1 instead of raw values, looking for a net of zero). Whenever a running total needs to have appeared before at some specific earlier value — not just any earlier value — store prefix sums in a hash map as you scan, rather than searching or re-summing.',
    retrievalCheck: [
      'If nums were guaranteed to contain only non-negative values, would a sliding window become viable — and would it beat the prefix-sum approach\'s complexity?',
      'Why does the hash map need to start with {0: 1} instead of starting empty?',
      'If the question asked for the longest subarray summing to k instead of the count, would you still store frequencies in the map, or something else?',
    ],
  },
}
