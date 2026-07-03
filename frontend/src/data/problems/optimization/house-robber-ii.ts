export default {
  id: 'house-robber-ii',
  title: 'House Robber II',
  difficulty: 'medium',
  description: `<p>You are a professional robber planning to rob houses arranged in a circle. The first and last houses are adjacent. Given an integer array <code>nums</code> representing the amount of money in each house, return the maximum amount you can rob tonight without alerting the police.</p>`,
  examples: [
    { input: 'nums = [2,3,2]', output: '3' },
    { input: 'nums = [1,2,3,1]', output: '4' },
  ],
  constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 1000'],
  starterCode: `def rob(nums):
  pass`,
  functionName: 'rob',
  conceptId: 'dp-1d',
  testCases: [
    { label: '[2,3,2]', args: [[2,3,2]], expected: 3 },
    { label: '[1,2,3,1]', args: [[1,2,3,1]], expected: 4 },
  ],
}
