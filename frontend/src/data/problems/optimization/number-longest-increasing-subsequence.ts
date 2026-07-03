export default {
  id: 'number-longest-increasing-subsequence',
  title: 'Number of Longest Increasing Subsequence',
  difficulty: 'medium',
  description: 'Given an integer array, return the number of longest increasing subsequences.',
  examples: [
    { input: 'nums = [1,3,5,4,7]', output: '2', explanation: 'LIS length = 4. There are 2 of length 4: [1,3,5,7] and [1,3,4,7].' },
    { input: 'nums = [2,2,2,2,2]', output: '5', explanation: 'LIS length = 1. There are 5 of length 1.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 2000', '-10⁶ ≤ nums[i] ≤ 10⁶'],
  starterCode: `def find_number_of_lis(nums):
  pass`,
  functionName: 'find_number_of_lis',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'Two LIS', args: [[1,3,5,4,7]], expected: 2 },
    { label: 'All same', args: [[2,2,2,2,2]], expected: 5 },
    { label: 'Single', args: [[1]], expected: 1 },
  ],
}
