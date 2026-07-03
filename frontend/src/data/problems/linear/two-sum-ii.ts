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
}
