export default {
  id: 'find-pivot-index',
  title: 'Find Pivot Index',
  difficulty: 'easy',
  description: 'Find the leftmost index such that the sum of all elements to its left equals the sum of all elements to its right. Return -1 if no such index exists.',
  examples: [
    { input: 'nums = [1,7,3,6,5,6]', output: '3', explanation: 'Left sum = 1+7+3 = 11, right sum = 5+6 = 11.' },
    { input: 'nums = [1,2,3]', output: '-1' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '-1000 ≤ nums[i] ≤ 1000'],
  starterCode: `def pivot_index(nums):
  pass`,
  functionName: 'pivot_index',
  conceptId: 'prefix-sum',
  testCases: [
    { label: 'Middle pivot', args: [[1,7,3,6,5,6]], expected: 3 },
    { label: 'No pivot', args: [[1,2,3]], expected: -1 },
    { label: 'Left edge', args: [[2,1,-1]], expected: 0 },
    { label: 'Single', args: [[1]], expected: 0 },
  ],
  bruteHint: 'Describe recomputing the left and right sums from scratch at every index, and its time complexity',
  optimizeHint: 'Name the technique that lets you derive each side\'s sum in O(1) after a single upfront pass',
  clues: [
    {
      id: 'constraint-negative-values',
      question: '-1000 ≤ nums[i] ≤ 1000 — elements can be negative. What approach does this rule out?',
      options: [
        { label: 'Two-pointer shrink from both ends', isCorrect: false, feedback: 'Two pointers work when you can decide to move left or right based on whether a sum is too large or too small. Negative values break that monotonicity — shrinking the window could increase or decrease the sum unpredictably.' },
        { label: 'Prefix sums over the whole array', isCorrect: false, feedback: 'Prefix sums handle negatives just fine — you\'re adding values, not relying on any ordering property.' },
        { label: 'Sorting first to simplify', isCorrect: true },
        { label: 'A single linear scan', isCorrect: false, feedback: 'A linear scan computes running totals regardless of sign — negatives don\'t affect its correctness.' },
      ],
      correctFeedback: 'Sorting destroys index positions, and the pivot is defined by position. Negative values also break the assumption that removing a value always reduces a sum.',
      wrongFeedback: [
        'The pivot is defined by the index of an element, not its value. What happens to indices if you sort first?',
        'Any approach that relies on "larger sum means too far right" breaks when negatives can flip the direction. Which approach needs that monotonic property?',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is the leftmost pivot index. What does "leftmost" imply about how you scan?',
      options: [
        { label: 'Scan right-to-left, return last hit', isCorrect: false, feedback: 'Scanning right-to-left and returning the last hit gives you the rightmost pivot, not the leftmost.' },
        { label: 'Collect all pivots, return the minimum index', isCorrect: false, feedback: 'Collecting all pivots works but is unnecessary — a left-to-right scan returns the first one it finds, which is the leftmost by definition.' },
        { label: 'Scan left-to-right, return on first match', isCorrect: true },
        { label: 'Binary search for the pivot position', isCorrect: false, feedback: 'Binary search requires a monotonic property to halve the search space. The pivot condition (left sum equals right sum) has no such structure across arbitrary arrays.' },
      ],
      correctFeedback: 'A left-to-right scan hits the leftmost pivot first. Return immediately when the condition is met — no need to continue.',
      wrongFeedback: [
        'If you scan from left to right and the problem asks for the leftmost match, what can you do when you first find a valid index?',
        '"Leftmost" means the first one encountered in a left-to-right pass. One structure lets you check the pivot condition in O(1) at each index as you walk across.',
      ],
    },
    {
      id: 'prefix-sum-signal',
      question: 'At each index, you need the sum of all elements to its left and all elements to its right. How can you avoid recomputing these sums from scratch every step?',
      options: [
        { label: 'Recompute both sides with nested loops', isCorrect: false, feedback: 'Recomputing both sides at every index is O(n²). With nums.length up to 10⁴, that\'s 10⁸ operations — slow and unnecessary.' },
        { label: 'Precompute total sum; track left sum incrementally', isCorrect: true },
        { label: 'Use a stack to track running totals', isCorrect: false, feedback: 'A stack manages a LIFO sequence of values — it doesn\'t directly give you the sum of everything to the left or right of a given index.' },
        { label: 'Sort by value and use two pointers', isCorrect: false, feedback: 'Sorting destroys the index relationships that define the pivot. The left/right split is positional, not value-based.' },
      ],
      correctFeedback: 'Total sum is fixed. As you walk left to right, left_sum grows incrementally and right_sum = total − left_sum − nums[i]. That\'s O(1) per index, O(n) overall.',
      wrongFeedback: [
        'You know the total sum of the array upfront. At index i, if you also know the sum to the left, can you derive the sum to the right without scanning again?',
        'right_sum = total − left_sum − current element. That relationship lets you maintain both sums in a single pass.',
      ],
    },
  ],
}
