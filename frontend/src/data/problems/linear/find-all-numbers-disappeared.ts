export default {
  id: 'find-all-numbers-disappeared',
  title: 'Find All Numbers Disappeared in an Array',
  difficulty: 'easy',
  description: 'Given an array of n integers in the range [1, n], some elements appear twice and others once. Find all numbers in [1, n] that do not appear. Return them without extra space and in O(n) time.',
  examples: [
    { input: 'nums = [4,3,2,7,8,2,3,1]', output: '[5,6]' },
    { input: 'nums = [1,1]', output: '[2]' },
  ],
  constraints: ['n == nums.length', '1 ≤ n ≤ 10⁵', '1 ≤ nums[i] ≤ n'],
  starterCode: `def find_disappeared_numbers(nums):
  pass`,
  functionName: 'find_disappeared_numbers',
  conceptId: 'arrays',
  testCases: [
    { label: 'Missing 5,6', args: [[4,3,2,7,8,2,3,1]], expected: [5,6] },
    { label: 'Missing 2', args: [[1,1]], expected: [2] },
    { label: 'None missing', args: [[1,2,3]], expected: [] },
  ],
}
