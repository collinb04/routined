export default {
  id: 'two-sum',
  title: 'Two Sum',
  difficulty: 'easy',
  description: 'Given an array of integers <code>nums</code> and an integer <code>target</code>, return the indices of the two numbers that add up to <code>target</code>. Each input has exactly one solution.',
  examples: [
    { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9.' },
    { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6.' },
  ],
  constraints: [
    '2 ≤ nums.length ≤ 10⁴',
    '-10⁹ ≤ nums[i] ≤ 10⁹',
    'Exactly one valid answer exists',
  ],
  starterCode: `def two_sum(nums, target):
  pass`,
  functionName: 'two_sum',
  conceptId: 'hash-maps',
  testCases: [
    { label: 'Basic', args: [[2, 7, 11, 15], 9], expected: [0, 1] },
    { label: 'Middle pair', args: [[3, 2, 4], 6], expected: [1, 2] },
    { label: 'Same value', args: [[3, 3], 6], expected: [0, 1] },
  ],
  bruteHint: 'Describe the nested-loop approach and its time complexity',
  optimizeHint: 'Name the data structure that eliminates the inner loop',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 10,000 tells you…',
      options: [
        { label: 'O(n²) is fine',            isCorrect: false },
        { label: 'O(n) or better needed',     isCorrect: true  },
        { label: 'O(log n) is required',      isCorrect: false },
        { label: 'Input size is irrelevant',  isCorrect: false },
      ],
      correctFeedback: '10,000² ≈ 100 million operations — too slow in Python. You need a linear-time approach.',
      wrongFeedback: [
        'Think about worst case: with n = 10,000, how many pairs would you check with two nested loops?',
        'n² = 100 million operations at n = 10,000. Python handles ~10 million simple ops per second — that\'s too slow.',
      ],
    },
    {
      id: 'output-structure',
      question: 'The output is two indices, not values. This means you need to…',
      options: [
        { label: 'Store values in a set',               isCorrect: false },
        { label: 'Map each value to its index',         isCorrect: true  },
        { label: 'Sort the array first',                isCorrect: false },
        { label: 'Count occurrences of each number',    isCorrect: false },
      ],
      correctFeedback: 'Exactly — you need to return where you found each number, not just that it exists. A hash map gives you O(1) value → index lookup.',
      wrongFeedback: [
        'A set only tells you if a value exists. But the output asks for indices — what else do you need to track?',
        'You need to return two positions in the array. So as you scan, you need to remember: "I saw this value at index ___."',
      ],
    },
    {
      id: 'one-solution-guarantee',
      question: 'Exactly one valid answer exists. This means…',
      options: [
        { label: 'You must handle the no-solution case',  isCorrect: false },
        { label: 'You can return as soon as you find a pair', isCorrect: true  },
        { label: 'You need to collect all valid pairs',   isCorrect: false },
        { label: 'Sorting makes it easier to find',       isCorrect: false },
      ],
      correctFeedback: 'Right — no ambiguity, no edge cases for missing solutions. The first valid pair you find is the answer.',
      wrongFeedback: [
        'The problem guarantees a solution always exists. What does that let you skip?',
        'If there\'s exactly one answer, the moment your loop finds a valid pair — that\'s it. You can return immediately.',
      ],
    },
  ],
}
