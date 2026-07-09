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
  starterCode: `def subarray_sum(nums, k):
  pass`,
  functionName: 'subarray_sum',
  conceptId: 'arrays',
  testCases: [
    { label: 'Two subarrays', args: [[1,1,1],2], expected: 2 },
    { label: 'Two paths', args: [[1,2,3],3], expected: 2 },
    { label: 'Negative values', args: [[1,-1,1],1], expected: 3 },
    { label: 'No match', args: [[1,2,3],7], expected: 0 },
  ],
  bruteHint: 'Describe checking every subarray\'s sum directly, and its time complexity',
  optimizeHint: 'Name the data structure that tracks running prefix sums and how often each has occurred',
  clues: [
    {
      id: 'constraint-complexity',
      question: '1 ≤ nums.length ≤ 2 × 10⁴. What does this say about an O(n²) brute-force approach?',
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
      question: '"-1000 ≤ nums[i] ≤ 1000" allows negative values. Why does this matter for your approach?',
      options: [
        { label: 'You need to handle negatives with abs()', isCorrect: false, feedback: 'Taking absolute values changes the sums entirely. The problem asks for subarrays summing to k with the actual values, not their magnitudes.' },
        { label: 'A sliding window cannot be used', isCorrect: true },
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
      question: 'A subarray sum from index i to j equals prefix[j] − prefix[i-1]. What does this reduce the problem to?',
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
      question: 'The output is a count, not a list of subarrays. What does this allow?',
      options: [
        { label: 'You must still enumerate all subarrays', isCorrect: false, feedback: 'Enumerating all subarrays is O(n²) work. A count output means you only need to increment a counter — the hash map approach does exactly this without listing subarrays.' },
        { label: 'You can use a set to track seen sums', isCorrect: false, feedback: 'A set records only whether a prefix sum was seen, not how many times. When the same prefix sum appears multiple times, each occurrence corresponds to a valid subarray — you need a frequency count.' },
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
}
