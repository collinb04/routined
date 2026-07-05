export default {
  id: 'number-longest-increasing-subsequence',
  title: 'Number of Longest Increasing Subsequence',
  difficulty: 'medium',
  description: 'Given an integer array, return the number of longest increasing subsequences.',
  examples: [
    { input: 'nums = [1,3,5,4,7]', output: '2', explanation: 'LIS length = 4. There are 2 of length 4: [1,3,5,7] and [1,3,4,7].' },
    { input: 'nums = [2,2,2,2,2]', output: '5', explanation: 'LIS length = 1. There are 5 of length 1.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 2000', '-10⁶ ≤ nums[i] ≤ 10⁶'],
  starterCode: `def find_number_of_lis(nums):
  pass`,
  functionName: 'find_number_of_lis',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'Two LIS', args: [[1,3,5,4,7]], expected: 2 },
    { label: 'All same', args: [[2,2,2,2,2]], expected: 5 },
    { label: 'Single', args: [[1]], expected: 1 },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'nums.length ≤ 2000 tells you…',
      options: [
        { label: 'O(n log n) is required', isCorrect: false, feedback: 'O(n log n) works for finding the length of the LIS, but counting all sequences of that length is harder to do in O(n log n). At n = 2,000, O(n²) is 4 million operations — well within limits.' },
        { label: 'O(n²) is acceptable', isCorrect: true },
        { label: 'O(2ⁿ) is fine at this size', isCorrect: false, feedback: '2^2000 is incomprehensibly large. Exponential approaches are never fine at n = 2,000.' },
        { label: 'A single pass is sufficient', isCorrect: false, feedback: 'Counting LIS requires comparing each element against all previous elements to find which ones it can extend. A single pass can\'t see those relationships.' },
      ],
      correctFeedback: 'n = 2,000 makes O(n²) = 4 million operations fast. That lets you use the classic double-loop DP: for each i, scan all j < i.',
      wrongFeedback: [
        'At n = 2,000, how many operations does O(n²) require? Is that feasible?',
        '2,000² = 4 million — well within typical time limits. That permits a double-loop over all pairs (j, i) where j < i.',
      ],
    },
    {
      id: 'count-not-length',
      question: 'The output is the count of longest subsequences, not the length. This means…',
      options: [
        { label: 'Track both length and count at each index', isCorrect: true },
        { label: 'Find the LIS length first, then count separately', isCorrect: false, feedback: 'Two separate passes work but aren\'t necessary. You can accumulate both length[i] and count[i] simultaneously in a single O(n²) pass — fewer variables, one loop.' },
        { label: 'Return the length of the dp array', isCorrect: false, feedback: 'The dp array length is just n. You need to return how many subsequences achieve the maximum length — a completely different value.' },
        { label: 'Use a set to deduplicate subsequences', isCorrect: false, feedback: 'Storing actual subsequences is O(n · 2ⁿ) space. You only need counts — dp arrays tracking length and count per index give you the answer in O(n) space.' },
      ],
      correctFeedback: 'Maintain two arrays: length[i] = length of LIS ending at i, count[i] = number of such subsequences. At the end, sum count[i] for all i where length[i] equals the global maximum.',
      wrongFeedback: [
        'You need to know both "how long is the LIS ending here?" and "how many of that length exist ending here?". How many DP arrays does that suggest?',
        'Two arrays: length[i] and count[i]. When you find a longer extension at i, reset count[i] = count[j]. When you find an equally long extension, add count[j] to count[i].',
      ],
    },
    {
      id: 'count-update-rule',
      question: 'When two paths of equal length reach the same endpoint, the count must be…',
      options: [
        { label: 'Taken as the maximum of the two counts', isCorrect: false, feedback: 'Taking the max would pick one path over the other, but both are valid. You want the total number of distinct LIS ending at this index, so you add the counts.' },
        { label: 'Summed: count[i] += count[j]', isCorrect: true },
        { label: 'Left as count[i] = 1', isCorrect: false, feedback: 'Initializing count to 1 is correct only at the start (each element is itself a LIS of length 1). When another path of equal length arrives, you must add its count — otherwise you undercount.' },
        { label: 'Multiplied: count[i] *= count[j]', isCorrect: false, feedback: 'Multiplication applies when paths are independent and combine combinatorially. Here, each path ending at j is a distinct extension — you sum them, not multiply.' },
      ],
      correctFeedback: 'When length[j] + 1 == length[i], the subsequences ending at j all extend to i — so count[i] += count[j]. If length[j] + 1 > length[i], you found a longer one: reset length[i] and count[i] = count[j].',
      wrongFeedback: [
        'Two different paths of the same length both end at index i. How many total LIS of that length end at i?',
        'Each valid predecessor j contributes count[j] distinct subsequences ending at i. To get the total, you accumulate: count[i] += count[j] for every j that extends to the same length.',
      ],
    },
    {
      id: 'equal-elements-edge',
      question: '[2,2,2,2,2] produces output 5. This means…',
      options: [
        { label: 'Duplicate values extend increasing subsequences', isCorrect: false, feedback: '2 is not strictly greater than 2, so no element extends another here. Each element is a LIS of length 1 on its own — that\'s why there are 5 of them.' },
        { label: 'Each element is its own LIS of length 1', isCorrect: true },
        { label: 'Return n whenever all elements are equal', isCorrect: false, feedback: 'Returning n for all-equal arrays would be a special case, not a general rule. Your DP should produce 5 naturally: each index has length=1, count=1, and the global max is 1, so you sum all 5 counts.' },
        { label: 'The answer is always the array length', isCorrect: false, feedback: 'In [1,3,5,4,7], the answer is 2, not 5. The all-equal case is a boundary condition, not the general rule.' },
      ],
      correctFeedback: 'Strictly increasing means 2 cannot extend 2. Each element forms a standalone LIS of length 1. Summing five count[i]=1 values gives 5 — your DP handles this correctly without special-casing.',
      wrongFeedback: [
        'For nums[j] < nums[i] to extend a subsequence, what must be true? Does 2 < 2 hold?',
        'Strictly increasing means equal values don\'t extend each other. Every duplicate element stands alone as a LIS of length 1.',
      ],
    },
  ],
}
