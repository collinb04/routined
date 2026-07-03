export default {
  id: 'product-of-array-except-self',
  title: 'Product of Array Except Self',
  difficulty: 'medium',
  description: `<p>Given an integer array <code>nums</code>, return an array <code>answer</code> such that <code>answer[i]</code> is equal to the product of all elements of <code>nums</code> except <code>nums[i]</code>.</p><p>You must solve it in O(n) time without using the division operation.</p>`,
  examples: [
    { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
    { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' },
  ],
  constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer'],
  starterCode: `def product_except_self(nums):
  pass`,
  functionName: 'product_except_self',
  conceptId: 'arrays',
  testCases: [
    { label: '[1,2,3,4]', args: [[1,2,3,4]], expected: [24,12,8,6] },
    { label: 'with zero', args: [[-1,1,0,-3,3]], expected: [0,0,9,0,0] },
  ],
}
