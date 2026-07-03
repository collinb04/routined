export default {
  id: 'range-sum-query',
  title: 'Range Sum Query',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code> and two indices <code>left</code> and <code>right</code> (0-indexed, inclusive), return the sum of elements between them. Use a prefix sum array so the query runs in O(1).',
  examples: [
    { input: 'nums = [-2, 0, 3, -5, 2, -1], left = 0, right = 2', output: '1', explanation: '-2 + 0 + 3 = 1.' },
    { input: 'nums = [-2, 0, 3, -5, 2, -1], left = 2, right = 5', output: '-1', explanation: '3 + (-5) + 2 + (-1) = -1.' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 10⁴',
    '-10⁵ ≤ nums[i] ≤ 10⁵',
    '0 ≤ left ≤ right < nums.length',
  ],
  starterCode: `def range_sum(nums, left, right):
  pass`,
  functionName: 'range_sum',
  conceptId: 'prefix-sums',
  testCases: [
    { label: 'First three', args: [[-2, 0, 3, -5, 2, -1], 0, 2], expected: 1 },
    { label: 'Last four', args: [[-2, 0, 3, -5, 2, -1], 2, 5], expected: -1 },
    { label: 'Full array', args: [[-2, 0, 3, -5, 2, -1], 0, 5], expected: -3 },
    { label: 'Single element', args: [[3, 5, 2], 1, 1], expected: 5 },
  ],
}
