export default {
  id: 'find-the-duplicate-number',
  title: 'Find the Duplicate Number',
  difficulty: 'medium',
  description: `<p>Given an array of integers <code>nums</code> containing <code>n + 1</code> integers where each integer is in the range <code>[1, n]</code>, there is only one repeated number. Return this repeated number.</p><p>You must solve the problem without modifying the array and uses only constant extra space.</p>`,
  examples: [
    { input: 'nums = [1,3,4,2,2]', output: '2' },
    { input: 'nums = [3,1,3,4,2]', output: '3' },
  ],
  constraints: ['1 <= n <= 10^5', 'nums.length == n + 1', '1 <= nums[i] <= n', 'There is only one repeated number'],
  starterCode: `def find_duplicate(nums):
  pass`,
  functionName: 'find_duplicate',
  conceptId: 'linked-list',
  testCases: [
    { label: '[1,3,4,2,2]', args: [[1,3,4,2,2]], expected: 2 },
    { label: '[3,1,3,4,2]', args: [[3,1,3,4,2]], expected: 3 },
  ],
}
