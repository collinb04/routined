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
}
