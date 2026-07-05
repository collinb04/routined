export default {
  id: 'arithmetic-slices',
  title: 'Arithmetic Slices',
  difficulty: 'medium',
  description: 'A sequence of at least 3 elements is arithmetic if consecutive differences are equal. Given an array, return the number of arithmetic subarrays.',
  examples: [
    { input: 'nums = [1,2,3,4]', output: '3', explanation: '[1,2,3],[2,3,4],[1,2,3,4] are arithmetic.' },
    { input: 'nums = [1]', output: '0' },
  ],
  constraints: ['1 ≤ nums.length ≤ 5000', '-1000 ≤ nums[i] ≤ 1000'],
  starterCode: `def number_of_arithmetic_slices(nums):
  pass`,
  functionName: 'number_of_arithmetic_slices',
  conceptId: 'dp-1d',
  testCases: [
    { label: '[1,2,3,4]', args: [[1,2,3,4]], expected: 3 },
    { label: 'Single', args: [[1]], expected: 0 },
    { label: 'Not arithmetic', args: [[1,2,4]], expected: 0 },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'nums.length ≤ 5000 tells you…',
      options: [
        { label: 'O(n³) is acceptable',         isCorrect: false, feedback: 'At n = 5000, O(n³) is 125 billion operations — nowhere near feasible. The constraint rules out cubic solutions.' },
        { label: 'O(n²) is the upper limit',     isCorrect: false, feedback: 'At n = 5000, O(n²) is 25 million operations — borderline but not ideal. The constraint should push you toward linear or near-linear approaches.' },
        { label: 'O(n) or O(n²) are both viable', isCorrect: true },
        { label: 'Input size is irrelevant',      isCorrect: false, feedback: 'Input size always constrains your complexity budget. At n = 5000, you need to rule out cubic and worse before choosing an approach.' },
      ],
      correctFeedback: 'At n = 5000, O(n²) is about 25 million operations — feasible but tight. O(n) is comfortably fine. Both are realistic targets here.',
      wrongFeedback: [
        'At n = 5000, how many operations does a triple-nested loop perform? What about a double-nested loop?',
        'Cube n = 5000: that\'s 125 billion. Square it: 25 million. The constraint permits at most quadratic.',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is a count of subarrays, not the subarrays themselves. This means…',
      options: [
        { label: 'You must store every valid subarray',         isCorrect: false, feedback: 'Storing all subarrays wastes memory and work. A count only needs an integer — you never need to know which subarrays are valid, only how many there are.' },
        { label: 'You only need to track a running count',      isCorrect: true },
        { label: 'You need the start and end index of each',    isCorrect: false, feedback: 'Indices would let you reconstruct the subarrays, but the problem only asks for a count. Tracking indices is doing unnecessary work.' },
        { label: 'You should use a set to avoid duplicates',    isCorrect: false, feedback: 'A set prevents duplicates, but subarrays at different positions are always distinct. You need a count, not a deduplication structure.' },
      ],
      correctFeedback: 'A count is a single integer. You can accumulate it incrementally as you scan, without storing or reconstructing any subarray.',
      wrongFeedback: [
        'If the answer is just a number, what do you actually need to keep in memory while scanning?',
        'Counting doesn\'t require remembering what you counted — just how many. A running integer suffices.',
      ],
    },
    {
      id: 'minimum-length',
      question: 'A valid slice requires at least 3 elements. What does this imply about how you extend slices?',
      options: [
        { label: 'Every pair of equal-difference neighbors counts', isCorrect: false, feedback: 'Two elements always have a consistent difference — you need at least three to confirm the pattern holds. A pair alone is not a valid arithmetic slice.' },
        { label: 'You need to check groups of exactly 3 at a time',  isCorrect: false, feedback: 'Checking only triples misses longer slices. A valid arithmetic slice of length 4 contains multiple overlapping triples — and the longer slice itself counts separately.' },
        { label: 'Each extension of a valid slice adds more slices',  isCorrect: true },
        { label: 'Only the longest valid slice counts',               isCorrect: false, feedback: 'Every valid subarray counts, not just the longest one. [1,2,3,4] contributes three slices: [1,2,3], [2,3,4], and [1,2,3,4].' },
      ],
      correctFeedback: 'When you extend a valid arithmetic run by one element, every previous slice in that run gains a new valid slice. A run of length k starting at some index contains k−2 arithmetic slices.',
      wrongFeedback: [
        'Count the slices in [1,2,3,4]: there are three. How does adding element 5 change that count?',
        'Each new element that continues the arithmetic pattern adds exactly one new slice per position. Think about what that means for a run of length k.',
      ],
    },
    {
      id: 'dp-recurrence',
      question: 'Consecutive differences tell you whether a run continues. What local state is sufficient to count slices in one pass?',
      options: [
        { label: 'The full array of differences',                       isCorrect: false, feedback: 'You don\'t need the entire difference array at once. Only the current run length — or equivalently, how many new slices the last extension added — is needed at each step.' },
        { label: 'How many slices end at the current position',         isCorrect: true },
        { label: 'The start index of every active arithmetic run',       isCorrect: false, feedback: 'Tracking every run\'s start index gives you more information than you need. The count of slices ending at the current position encodes the same thing more compactly.' },
        { label: 'The global maximum run length seen so far',           isCorrect: false, feedback: 'Maximum run length doesn\'t tell you the count. A long run at the start and several short runs later could have the same max-length but very different total counts.' },
      ],
      correctFeedback: 'If dp[i] = number of arithmetic slices ending at index i, then dp[i] = dp[i-1] + 1 when the run continues, and 0 otherwise. Summing dp gives the total count.',
      wrongFeedback: [
        'If you know how many slices ended at index i−1, how many end at index i when the arithmetic pattern continues?',
        'Each continuation adds exactly one more slice than the previous position added. One integer — slices ending here — is all you need.',
      ],
    },
  ],
}
