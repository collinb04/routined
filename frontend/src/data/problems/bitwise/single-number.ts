export default {
  id: 'single-number',
  title: 'Single Number',
  difficulty: 'easy',
  description: 'Given a non-empty array of integers where every element appears twice except for one, find that single element. Your algorithm must run in O(n) time and O(1) extra space.',
  examples: [
    { input: 'nums = [2,2,1]', output: '1', explanation: '1 appears only once.' },
    { input: 'nums = [4,1,2,1,2]', output: '4', explanation: '4 is the only non-duplicate.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 3 × 10⁴', 'Each element appears exactly twice except one', '-3 × 10⁴ ≤ nums[i] ≤ 3 × 10⁴'],
  starterCode: `def single_number(nums):
  pass`,
  functionName: 'single_number',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: 'Three elements', args: [[2,2,1]], expected: 1 },
    { label: 'Five elements', args: [[4,1,2,1,2]], expected: 4 },
    { label: 'Single element', args: [[1]], expected: 1 },
    { label: 'Larger array', args: [[1,3,1,2,3]], expected: 2 },
  ],
  bruteHint: 'Describe using a hash set to spot the non-duplicate element, and its space complexity',
  optimizeHint: 'Name the bitwise operation that cancels duplicate pairs in a single pass',
  clues: [
    {
      id: 'space-constraint',
      question: 'O(1) extra space is required. What does this rule out?',
      options: [
        { label: 'Storing a running result in one variable', isCorrect: false, feedback: 'A single variable is O(1) space — exactly what the constraint allows. The constraint rules out structures that grow proportionally to n, not a fixed scalar.' },
        { label: 'A hash map counting frequencies', isCorrect: true },
        { label: 'Reading the array more than once', isCorrect: false, feedback: 'Multiple passes are an O(n) time concern, not space. O(1) space permits any number of array traversals as long as you don\'t allocate extra memory proportional to n.' },
        { label: 'Any comparison operations', isCorrect: false, feedback: 'Comparisons use no extra memory. The constraint is about data structures — a set or hash map of seen values would be O(n) space.' },
      ],
      correctFeedback: 'A hash map or set tracking seen values would use O(n) space — up to 3 × 10⁴ entries. O(1) requires a fixed-size approach, pointing toward a single accumulator variable.',
      wrongFeedback: [
        'If you store each element you\'ve seen in a set, how much space does that take relative to n?',
        'O(1) means the memory used doesn\'t grow with input size. A frequency count of all elements would need one slot per unique value — that\'s O(n).',
      ],
    },
    {
      id: 'pair-cancellation-property',
      question: '"Each element appears exactly twice except one." XOR has the property a ^ a = 0 and a ^ 0 = a. What does XOR-ing the entire array produce?',
      options: [
        { label: 'The sum of all unique elements', isCorrect: false, feedback: 'XOR is not addition — it operates bit by bit with no carry. 3 ^ 3 = 0, not 6. XOR doesn\'t sum; it cancels pairs.' },
        { label: 'The single non-duplicate element', isCorrect: true },
        { label: 'Zero, since all elements cancel', isCorrect: false, feedback: 'Every element except one appears twice. The duplicate pairs cancel (a ^ a = 0), but the single element has no partner to cancel against, so it remains.' },
        { label: 'The XOR of all duplicates only', isCorrect: false, feedback: 'You XOR everything together. The duplicates cancel (a ^ a = 0) and the single element passes through. The result is the single element — not a partial XOR.' },
      ],
      correctFeedback: 'XOR all elements: every pair reduces to 0, and the single element XORs with 0 to give itself. Order doesn\'t matter — XOR is commutative and associative.',
      wrongFeedback: [
        'Trace XOR on [2, 2, 1]: 0 ^ 2 = 2, ^ 2 = 0, ^ 1 = 1. What happened to the pair? What remained?',
        'a ^ a = 0 cancels every pair. What\'s left after all pairs cancel?',
      ],
    },
    {
      id: 'order-independence',
      question: 'XOR is commutative (a ^ b = b ^ a) and associative. What does this mean for your implementation?',
      options: [
        { label: 'You must sort the array before XOR-ing', isCorrect: false, feedback: 'Sorting is unnecessary — commutativity and associativity mean the result is the same regardless of order. Sorting would waste O(n log n) time on a problem solvable in O(n).' },
        { label: 'XOR all elements in any order; the result is the same', isCorrect: true },
        { label: 'XOR adjacent pairs only; the single element is the remainder', isCorrect: false, feedback: 'XOR-ing only adjacent pairs would work if the array happened to be sorted so duplicates are adjacent — but the problem doesn\'t guarantee that. XOR-ing everything in one pass works regardless of order.' },
        { label: 'You need two passes: one for duplicates, one for the single', isCorrect: false, feedback: 'One pass is sufficient. Because XOR is commutative, duplicates cancel regardless of when their two occurrences are encountered in the scan. No separation by category is needed.' },
      ],
      correctFeedback: 'A single left-to-right XOR accumulation works: result ^= nums[i] for each i. Duplicates cancel wherever they appear, leaving only the single element.',
      wrongFeedback: [
        'If [4, 1, 2, 1, 2] were rearranged as [1, 1, 2, 2, 4], would XOR-ing in order give the same result? Why?',
        'Commutativity means the XOR of a set of values doesn\'t depend on sequence. So one forward pass accumulates the answer without caring about element positions.',
      ],
    },
  ],
}
