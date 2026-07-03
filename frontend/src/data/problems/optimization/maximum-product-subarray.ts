export default {
  id: 'maximum-product-subarray',
  title: 'Maximum Product Subarray',
  difficulty: 'medium',
  description: `<p>Given an integer array <code>nums</code>, find a subarray that has the largest product, and return the product.</p>`,
  examples: [
    { input: 'nums = [2,3,-2,4]', output: '6 (subarray [2,3])' },
    { input: 'nums = [-2,0,-1]', output: '0' },
  ],
  constraints: ['1 <= nums.length <= 2 * 10^4', '-10 <= nums[i] <= 10', 'The product of any subarray fits in a 32-bit integer'],
  starterCode: `def max_product(nums):
  pass`,
  functionName: 'max_product',
  conceptId: 'dp-1d',
  testCases: [
    { label: '[2,3,-2,4]', args: [[2,3,-2,4]], expected: 6 },
    { label: '[-2,0,-1]', args: [[-2,0,-1]], expected: 0 },
  ],
}
