export default {
  id: 'binary-search',
  title: 'Binary Search',
  difficulty: 'easy',
  description: 'Given a sorted array of integers <code>nums</code> and a <code>target</code>, return the index of the target. If not found, return <code>-1</code>.',
  examples: [
    { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', output: '4', explanation: '9 exists at index 4.' },
    { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', output: '-1', explanation: '2 does not exist in the array.' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 10⁴',
    'nums is sorted in ascending order with unique values',
  ],
  starterCode: `def binary_search(nums, target):
  pass`,
  functionName: 'binary_search',
  conceptId: 'binary-search',
  testCases: [
    { label: 'Found', args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
    { label: 'Not found', args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
    { label: 'Single element', args: [[5], 5], expected: 0 },
    { label: 'First element', args: [[1, 3, 5, 7], 1], expected: 0 },
    { label: 'Last element', args: [[1, 3, 5, 7], 7], expected: 3 },
  ],
}
