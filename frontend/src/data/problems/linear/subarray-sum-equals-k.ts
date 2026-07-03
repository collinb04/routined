export default {
  id: 'subarray-sum-equals-k',
  title: 'Subarray Sum Equals K',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> and an integer <code>k</code>, return the total number of subarrays whose sum equals <code>k</code>.',
  examples: [
    { input: 'nums=[1,1,1], k=2', output: '2', explanation: 'Subarrays [1,1] starting at index 0 and 1.' },
    { input: 'nums=[1,2,3], k=3', output: '2', explanation: '[1,2] and [3].' },
  ],
  constraints: ['1 ≤ nums.length ≤ 2 × 10⁴', '-1000 ≤ nums[i] ≤ 1000', '-10⁷ ≤ k ≤ 10⁷'],
  starterCode: `def subarray_sum(nums, k):
  pass`,
  functionName: 'subarray_sum',
  conceptId: 'arrays',
  testCases: [
    { label: 'Two subarrays', args: [[1,1,1],2], expected: 2 },
    { label: 'Two paths', args: [[1,2,3],3], expected: 2 },
    { label: 'Negative values', args: [[1,-1,1],1], expected: 3 },
    { label: 'No match', args: [[1,2,3],7], expected: 0 },
  ],
}
