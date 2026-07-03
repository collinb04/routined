export default {
  id: 'maximum-subarray',
  title: 'Maximum Subarray',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code>, find the contiguous subarray with the largest sum and return that sum. (Kadane\'s Algorithm)',
  examples: [
    { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: '[4,-1,2,1] has the largest sum = 6.' },
    { input: 'nums = [1]', output: '1' },
    { input: 'nums = [5,4,-1,7,8]', output: '23' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
  starterCode: `def max_sub_array(nums):
  pass`,
  functionName: 'max_sub_array',
  conceptId: 'arrays',
  testCases: [
    { label: 'Mixed values', args: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
    { label: 'Single', args: [[1]], expected: 1 },
    { label: 'All positive', args: [[5,4,-1,7,8]], expected: 23 },
    { label: 'All negative', args: [[-1,-2,-3]], expected: -1 },
  ],
}
