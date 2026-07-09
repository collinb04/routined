export default {
  id: 'two-sum-ii',
  title: 'Two Sum II',
  difficulty: 'easy',
  description: 'Given a <strong>1-indexed</strong> sorted array <code>numbers</code> and a <code>target</code>, return the indices of the two numbers that add up to target as <code>[index1, index2]</code>. Use O(1) extra space.',
  examples: [
    { input: 'numbers = [2, 7, 11, 15], target = 9', output: '[1, 2]', explanation: 'numbers[1] + numbers[2] = 2 + 7 = 9.' },
    { input: 'numbers = [2, 3, 4], target = 6', output: '[1, 3]', explanation: 'numbers[1] + numbers[3] = 2 + 4 = 6.' },
  ],
  constraints: [
    '2 ≤ numbers.length ≤ 3 × 10⁴',
    'numbers is sorted in non-decreasing order',
    'Exactly one solution exists',
  ],
  starterCode: `def two_sum_ii(numbers, target):
  pass`,
  functionName: 'two_sum_ii',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'Basic', args: [[2, 7, 11, 15], 9], expected: [1, 2] },
    { label: 'Middle pair', args: [[2, 3, 4], 6], expected: [1, 3] },
    { label: 'Negative numbers', args: [[-1, 0], -1], expected: [1, 2] },
    { label: 'Last two', args: [[1, 2, 3, 4, 5], 9], expected: [4, 5] },
  ],
  bruteHint: 'Describe the nested-loop approach checking every pair, and its time complexity',
  optimizeHint: 'Name the technique that exploits the array already being sorted to avoid nested loops',
  clues: [
    {
      id: 'sorted-input-signal',
      question: '"numbers is sorted in non-decreasing order." What does the sorted order unlock that an unsorted array would not?',
      options: [
        { label: 'You can skip duplicate values', isCorrect: false, feedback: 'The problem does not mention duplicates as a concern. The key insight from sorted order is that moving pointers inward changes the sum in a predictable direction.' },
        { label: 'Two pointers can adjust the sum by moving inward', isCorrect: true },
        { label: 'You can binary-search for each element\'s complement', isCorrect: false, feedback: 'Binary searching for each complement is O(n log n). Sorted order enables an O(n) two-pointer approach because the sum changes monotonically as you move either pointer.' },
        { label: 'Sorted order means the answer is always at the two ends', isCorrect: false, feedback: 'The answer is not always at the ends — [2, 3, 4] with target 6 returns indices 1 and 3, not the outermost pair. Sorted order allows directed adjustment, not a guaranteed position.' },
      ],
      correctFeedback: 'With sorted order, moving the left pointer right increases the sum; moving the right pointer left decreases it. This gives O(1) steering per step, for O(n) total.',
      wrongFeedback: [
        'If the current sum is too small, which pointer should move? If too large, which should move? Does sorted order make those moves reliable?',
        'Sorted order means increasing the left pointer raises the sum and decreasing the right pointer lowers it. Two pointers exploit this monotonicity to find the target in O(n).',
      ],
    },
    {
      id: 'o1-space-constraint',
      question: '"Use O(1) extra space." What common Two Sum approach does this rule out?',
      options: [
        { label: 'Two pointers', isCorrect: false, feedback: 'Two pointers use only two index variables — O(1) space. The constraint rules out approaches that allocate data structures proportional to n.' },
        { label: 'A hash map storing value-to-index mappings', isCorrect: true },
        { label: 'Binary search on the sorted array', isCorrect: false, feedback: 'Binary search uses O(log n) stack space at most — well within O(1) extra space for an iterative implementation. The hash map is the approach explicitly blocked.' },
        { label: 'A brute-force nested loop', isCorrect: false, feedback: 'A nested loop uses O(1) space (just two index variables), but it is O(n²) time. The O(1) space constraint does not rule it out — the sorted guarantee makes the two-pointer approach strictly better.' },
      ],
      correctFeedback: 'A hash map stores up to n entries — O(n) space. The O(1) constraint, combined with sorted order, points directly to the two-pointer approach.',
      wrongFeedback: [
        'Two Sum I uses a hash map to store values you\'ve seen. How much space does that map require? Does that satisfy O(1)?',
        'A hash map of size proportional to n violates O(1). The sorted array makes a hash map unnecessary anyway — two pointers achieve the same result without extra allocation.',
      ],
    },
    {
      id: 'exactly-one-solution',
      question: '"Exactly one solution exists." What does this guarantee let you skip?',
      options: [
        { label: 'You must handle the case where no solution is found', isCorrect: false, feedback: 'The guarantee says a solution always exists. Writing a "not found" return path would be dead code — the constraint explicitly permits omitting it.' },
        { label: 'You can return immediately when the pair is found', isCorrect: true },
        { label: 'You need to collect all valid pairs and return the first', isCorrect: false, feedback: 'There is only one valid pair by guarantee. Collecting multiple results and filtering wastes work — return as soon as the sum equals the target.' },
        { label: 'The answer must be at a specific position in the array', isCorrect: false, feedback: 'The "exactly one solution" guarantee is about when to stop, not where the answer is located. The pair can be anywhere in the array.' },
      ],
      correctFeedback: 'No missing-solution branch, no multi-result collection. The first time left + right == target, that is the unique answer — return it.',
      wrongFeedback: [
        'The problem guarantees a solution always exists. What branch of your code can you omit entirely because of this?',
        'Exactly one solution means the first match you find is the answer. You can return immediately without continuing the search or handling the "no solution" case.',
      ],
    },
    {
      id: 'one-indexed-output',
      question: '"The array is 1-indexed." The output is [index1, index2] where 1 ≤ index1 < index2. How does this affect your pointer tracking?',
      options: [
        { label: 'Start both pointers at index 1 in the code', isCorrect: false, feedback: 'Python arrays are 0-indexed. Start the pointers at 0 and len(numbers)-1 in your code, then add 1 to each before returning.' },
        { label: 'Add 1 to each pointer value before returning', isCorrect: true },
        { label: 'The output is 0-indexed like a normal Python array', isCorrect: false, feedback: 'The problem explicitly specifies 1-indexed output. [2, 7, 11, 15] with target 9 expects [1, 2], not [0, 1].' },
        { label: 'Subtract 1 from each pointer value before returning', isCorrect: false, feedback: 'You maintain 0-indexed pointers internally and convert to 1-indexed output. That means adding 1, not subtracting.' },
      ],
      correctFeedback: 'Internally use 0-indexed pointers (left = 0, right = len(numbers) - 1). When returning, output [left + 1, right + 1] to satisfy the 1-indexed requirement.',
      wrongFeedback: [
        'Your code uses 0-indexed arrays. The expected output for [2,7,11,15] is [1,2]. If your pointers are at positions 0 and 1, what do you return?',
        'Add 1 to each pointer when constructing the output. Internal logic stays 0-indexed; only the returned values need the +1 offset.',
      ],
    },
  ],
}
