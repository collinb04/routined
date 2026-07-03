export default {
  id: 'find-all-duplicates-in-array',
  title: 'Find All Duplicates in an Array',
  difficulty: 'medium',
  description: 'Given an array of integers in the range [1, n] where some elements appear twice and others appear once, find all elements that appear twice. Use O(1) extra space.',
  examples: [
    { input: 'nums = [4,3,2,7,8,2,3,1]', output: '[2,3]' },
    { input: 'nums = [1,1,2]', output: '[1]' },
  ],
  constraints: ['n == nums.length', '1 ≤ n ≤ 10⁵', '1 ≤ nums[i] ≤ n', 'Each element appears once or twice'],
  starterCode: `def find_duplicates(nums):
  pass`,
  functionName: 'find_duplicates',
  conceptId: 'arrays',
  testCases: [
    { label: 'Two duplicates', args: [[4,3,2,7,8,2,3,1]], expected: [2,3] },
    { label: 'One duplicate', args: [[1,1,2]], expected: [1] },
    { label: 'No duplicates', args: [[1,2,3]], expected: [] },
  ],
}
