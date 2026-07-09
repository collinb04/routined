export default {
  id: 'maximum-width-ramp',
  title: 'Maximum Width Ramp',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code>, a ramp is a pair (i, j) with i < j and nums[i] ≤ nums[j]. Return the maximum width j − i of any ramp, or 0 if no ramp exists.',
  examples: [
    { input: 'nums = [6,0,8,2,1,5]', output: '4', explanation: 'Ramp (1, 5): nums[1]=0 ≤ nums[5]=5, width = 4.' },
    { input: 'nums = [9,8,1,0,1,9,4,0,4,1]', output: '7' },
  ],
  constraints: ['2 ≤ nums.length ≤ 5 × 10⁴', '0 ≤ nums[i] ≤ 5 × 10⁴'],
  starterCode: `def max_width_ramp(nums):
  pass`,
  functionName: 'max_width_ramp',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'Width 4', args: [[6,0,8,2,1,5]], expected: 4 },
    { label: 'Width 7', args: [[9,8,1,0,1,9,4,0,4,1]], expected: 7 },
    { label: 'Descending', args: [[3,2,1]], expected: 0 },
    { label: 'Single ramp', args: [[1,2]], expected: 1 },
  ],
  bruteHint: 'Describe checking every pair (i, j) and its time complexity',
  optimizeHint: 'Name the structure that lets you scan from the right while tracking a monotonic decreasing set of candidate left indices',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 5 × 10⁴ tells you…',
      options: [
        { label: 'O(n²) is fine for n = 50,000', isCorrect: false, feedback: 'At n = 50,000, O(n²) is 2.5 billion operations — far too slow. The constraint is signaling that a quadratic brute-force over all pairs will time out.' },
        { label: 'O(n log n) or better is needed', isCorrect: true },
        { label: 'O(log n) is required', isCorrect: false, feedback: 'O(log n) is faster than reading the full input. You need a sub-quadratic approach, but not that extreme.' },
        { label: 'Input size does not matter here', isCorrect: false, feedback: 'Input size always matters. With 50,000 elements, checking every (i, j) pair would be 2.5 billion comparisons.' },
      ],
      correctFeedback: 'With n up to 50,000, O(n²) is 2.5 billion comparisons — too slow. You need a linear or O(n log n) strategy.',
      wrongFeedback: [
        'At n = 50,000, how many (i, j) pairs does a brute-force scan check? What does that count tell you?',
        'Count the pairs: n(n−1)/2 ≈ 1.25 billion. You need an approach that avoids checking every pair.',
      ],
    },
    {
      id: 'ramp-start-candidates',
      question: 'A ramp requires nums[i] ≤ nums[j] with i < j. To maximize j − i, what kind of left endpoints i are worth keeping?',
      options: [
        { label: 'All indices in sorted order', isCorrect: false, feedback: 'Sorting loses the original indices, which define the width j − i. The positions are exactly what you need to preserve.' },
        { label: 'Indices where nums[i] is a new prefix minimum', isCorrect: true },
        { label: 'Indices where nums[i] is a local maximum', isCorrect: false, feedback: 'A large nums[i] is harder to satisfy — few values to its right will be ≥ it. Small left endpoints give the widest potential ramps.' },
        { label: 'Any index with nums[i] = 0', isCorrect: false, feedback: 'Only values of 0 would work for that, and the array may have no zeros. You want a general rule for which left endpoints maximize ramp width.' },
      ],
      correctFeedback: 'Prefix minimums are the only useful left endpoints: if nums[i] > nums[k] for some k < i, then k is a strictly better (smaller value, farther left) ramp start for any right endpoint that works for i.',
      wrongFeedback: [
        'If nums[i] > nums[k] and k < i, can index i ever beat k on ramp width? What does that imply about which left endpoints to keep?',
        'You want i as far left as possible and nums[i] as small as possible. Which indices satisfy both simultaneously?',
      ],
    },
    {
      id: 'scan-direction',
      question: 'After identifying useful left endpoints, which direction should you scan for right endpoints j to find the widest ramp?',
      options: [
        { label: 'Left to right, greedily', isCorrect: false, feedback: 'Scanning left to right for j finds a valid ramp early but not necessarily the widest one — you want j as far right as possible.' },
        { label: 'Right to left, matching greedily', isCorrect: true },
        { label: 'Sort j candidates by value', isCorrect: false, feedback: 'Sorting by value loses the position information that determines width.' },
        { label: 'Binary search from each left endpoint', isCorrect: false, feedback: 'Binary search requires a sorted structure. The original array is unsorted, so you cannot binary search positions directly by value.' },
      ],
      correctFeedback: 'Scanning j from right to left lets you match each candidate left endpoint with the farthest valid j first, maximizing j − i before moving inward.',
      wrongFeedback: [
        'You want j − i as large as possible. Should j be as close to i as possible, or as far away as possible?',
        'To maximize width, start j at the far right and work left. Pair it with the smallest available left endpoint that satisfies nums[i] ≤ nums[j].',
      ],
    },
  ],
}
