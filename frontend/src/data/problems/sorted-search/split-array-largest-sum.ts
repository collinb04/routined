export default {
  id: 'split-array-largest-sum',
  title: 'Split Array Largest Sum',
  difficulty: 'hard',
  description: 'Given an array of integers and <code>k</code>, split the array into <code>k</code> non-empty contiguous subarrays to minimize the largest sum of any subarray. Return that minimized largest sum.',
  examples: [
    { input: 'nums=[7,2,5,10,8], k=2', output: '18', explanation: 'Split [7,2,5] | [10,8]. Largest sum = 18.' },
    { input: 'nums=[1,2,3,4,5], k=2', output: '9', explanation: 'Split [1,2,3,4] | [5].' },
  ],
  constraints: ['1 ≤ nums.length ≤ 1000', '0 ≤ nums[i] ≤ 10⁶', '1 ≤ k ≤ min(50, nums.length)'],
  starterCode: `def split_array(nums, k):
  pass`,
  functionName: 'split_array',
  conceptId: 'binary-search',
  testCases: [
    { label: 'k=2', args: [[7,2,5,10,8],2], expected: 18 },
    { label: 'Sequential k=2', args: [[1,2,3,4,5],2], expected: 9 },
    { label: 'k=1', args: [[1,2,3],1], expected: 6 },
  ],
}
