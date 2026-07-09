export default {
  id: 'squares-sorted-array',
  title: 'Squares of a Sorted Array',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code> sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.',
  examples: [
    { input: 'nums = [-4,-1,0,3,10]', output: '[0,1,9,16,100]' },
    { input: 'nums = [-7,-3,2,3,11]', output: '[4,9,9,49,121]' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁴ ≤ nums[i] ≤ 10⁴', 'nums is sorted'],
  starterCode: `def sorted_squares(nums):
  pass`,
  functionName: 'sorted_squares',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'Negatives and positives', args: [[-4,-1,0,3,10]], expected: [0,1,9,16,100] },
    { label: 'Mixed', args: [[-7,-3,2,3,11]], expected: [4,9,9,49,121] },
    { label: 'All negative', args: [[-3,-2,-1]], expected: [1,4,9] },
  ],
  bruteHint: 'Describe squaring every element then sorting the result, and its time complexity',
  optimizeHint: 'Name the technique that uses two pointers from both ends to fill the result from the back',
  clues: [
    {
      id: 'sorted-input-signal',
      question: '"nums is sorted in non-decreasing order" — the input is already sorted. What does this tell you about where the largest squares are?',
      options: [
        { label: 'Largest squares are in the middle', isCorrect: false, feedback: 'Squaring makes negatives positive. The largest values are at the extremes — the most-negative left end and the most-positive right end — not the middle.' },
        { label: 'Largest squares are at both ends', isCorrect: true },
        { label: 'All squares are already sorted', isCorrect: false, feedback: 'Squaring does not preserve sorted order when negatives are present. For example, [-4,-1,0,3] squares to [16,1,0,9] — not sorted.' },
        { label: 'Sort order of input is irrelevant', isCorrect: false, feedback: 'The sorted order is the key insight. It tells you that the largest magnitudes live at the two ends, which lets you fill a result array from right to left in O(n).' },
      ],
      correctFeedback: 'The largest absolute value is always at one of the two ends of a sorted array. Two pointers starting at each end can fill the result from largest to smallest in O(n).',
      wrongFeedback: [
        'After squaring, which element in [-4,-1,0,3,10] is largest? Where does it sit in the original array?',
        'The most-negative and most-positive elements have the largest squares. Where do those live in a sorted array?',
      ],
    },
    {
      id: 'negative-values-effect',
      question: '"-10⁴ ≤ nums[i] ≤ 10⁴" allows negative values. Why does that matter for squaring?',
      options: [
        { label: 'Negatives can be ignored after squaring', isCorrect: false, feedback: 'Squaring makes negatives positive, but they still contribute to the result. A value of -10,000 squares to 100,000,000 — the largest possible square.' },
        { label: 'Negatives produce large squares on the left', isCorrect: true },
        { label: 'Negative inputs require a sign check before squaring', isCorrect: false, feedback: 'You square every element regardless of sign — squaring handles negatives automatically. The key issue is that large-magnitude negatives on the left compete with large positives on the right.' },
        { label: 'Sort the array first to remove negatives', isCorrect: false, feedback: 'You cannot remove negatives — they are valid inputs. And re-sorting after squaring would cost O(n log n); the sorted input already gives you a smarter O(n) path.' },
      ],
      correctFeedback: 'Negative values at the left end can have large magnitudes. After squaring, they compete with large positives at the right end — so both ends are candidates for the largest square.',
      wrongFeedback: [
        'What is (-10,000)²? How does that compare to 10,000²? Where do those values sit in the sorted array?',
        'Large-magnitude negatives are on the left; large positives are on the right. After squaring, both ends hold large values — how do you merge them?',
      ],
    },
    {
      id: 'output-sorted-order',
      question: 'The output must be sorted in non-decreasing order. Given that the two largest squares are at opposite ends, how do you build the result efficiently?',
      options: [
        { label: 'Square all values then sort', isCorrect: false, feedback: 'Squaring then sorting costs O(n log n). The sorted input lets you avoid the sort entirely by filling the output from right to left with two pointers in O(n).' },
        { label: 'Fill the result array from largest to smallest', isCorrect: true },
        { label: 'Use a min-heap to merge both ends', isCorrect: false, feedback: 'A heap works but adds O(n log n) overhead. Since there are only two candidates at any moment (the two ends), a simple comparison and two-pointer advance is O(n).' },
        { label: 'Insert each square into a sorted position', isCorrect: false, feedback: 'Insertion into a sorted array costs O(n) per element — O(n²) total. The two-pointer approach fills the result in O(n) by exploiting the sorted input.' },
      ],
      correctFeedback: 'Compare the squares at the left and right pointers, place the larger one at the current back of the result, and advance the corresponding pointer. This fills the output in O(n).',
      wrongFeedback: [
        'You know the largest square is always at one of the two ends. Can you use that to fill the result array without sorting?',
        'Place the largest element first (at the back of the result), then the next largest, and so on. Two pointers give you the two candidates at each step.',
      ],
    },
  ],
}
