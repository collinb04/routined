export default {
  id: 'sort-colors',
  title: 'Sort Colors',
  difficulty: 'medium',
  description: 'Given an array with values 0, 1, and 2 (representing red, white, blue), sort them in-place without using a library sort. (Dutch National Flag problem)',
  examples: [
    { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' },
    { input: 'nums = [2,0,1]', output: '[0,1,2]' },
  ],
  constraints: ['n == nums.length', '1 ≤ n ≤ 300', 'nums[i] is 0, 1, or 2'],
  starterCode: `def sort_colors(nums):
  pass
  return nums`,
  functionName: 'sort_colors',
  conceptId: 'arrays',
  testCases: [
    { label: 'Mixed', args: [[2,0,2,1,1,0]], expected: [0,0,1,1,2,2] },
    { label: 'Three values', args: [[2,0,1]], expected: [0,1,2] },
    { label: 'Already sorted', args: [[0,1,2]], expected: [0,1,2] },
  ],
}
