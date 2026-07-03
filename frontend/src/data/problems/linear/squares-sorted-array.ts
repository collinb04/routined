export default {
  id: 'squares-sorted-array',
  title: 'Squares of a Sorted Array',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code> sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.',
  examples: [
    { input: 'nums = [-4,-1,0,3,10]', output: '[0,1,9,16,100]' },
    { input: 'nums = [-7,-3,2,3,11]', output: '[4,9,9,49,121]' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁴ ≤ nums[i] ≤ 10⁴', 'nums is sorted'],
  starterCode: `def sorted_squares(nums):
  pass`,
  functionName: 'sorted_squares',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'Negatives and positives', args: [[-4,-1,0,3,10]], expected: [0,1,9,16,100] },
    { label: 'Mixed', args: [[-7,-3,2,3,11]], expected: [4,9,9,49,121] },
    { label: 'All negative', args: [[-3,-2,-1]], expected: [1,4,9] },
  ],
}
