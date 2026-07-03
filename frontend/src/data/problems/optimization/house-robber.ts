export default {
  id: 'house-robber',
  title: 'House Robber',
  difficulty: 'medium',
  description: `<p>You are a professional robber planning to rob houses along a street. Each house has a certain amount of money. Adjacent houses have security systems — if two adjacent houses are robbed the police will be alerted. Given an integer array <code>nums</code> representing the amount of money in each house, return the maximum amount you can rob tonight without alerting the police.</p>`,
  examples: [
    { input: 'nums = [1,2,3,1]', output: '4 (rob houses 1 and 3)' },
    { input: 'nums = [2,7,9,3,1]', output: '12 (rob houses 1, 3, and 5)' },
  ],
  constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
  starterCode: `def rob(nums):
  pass`,
  functionName: 'rob',
  conceptId: 'dp-1d',
  testCases: [
    { label: '[1,2,3,1]', args: [[1,2,3,1]], expected: 4 },
    { label: '[2,7,9,3,1]', args: [[2,7,9,3,1]], expected: 12 },
  ],
}
