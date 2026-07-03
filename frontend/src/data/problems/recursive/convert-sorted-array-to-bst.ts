export default {
  id: 'convert-sorted-array-to-bst',
  title: 'Convert Sorted Array to Binary Search Tree',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code> sorted in ascending order, convert it to a height-balanced binary search tree.',
  examples: [
    { input: 'nums = [-10,-3,0,5,9]', output: '[0,-3,9,-10,null,5]', explanation: 'Multiple valid answers exist.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁴ ≤ nums[i] ≤ 10⁴', 'nums is sorted in strictly increasing order'],
  starterCode: `def sorted_array_to_bst(nums):
  pass`,
  functionName: 'sorted_array_to_bst',
  conceptId: 'trees',
  testCases: [
    { label: 'Five elements root', args: [[-10,-3,0,5,9]], expected: 0 },
    { label: 'Single', args: [[1]], expected: 1 },
  ],
}
