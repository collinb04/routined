export default {
  id: 'maximum-sum-3-non-overlapping',
  title: 'Maximum Sum of 3 Non-Overlapping Subarrays',
  difficulty: 'hard',
  description: 'Given an integer array <code>nums</code> and integer <code>k</code>, find 3 non-overlapping subarrays of length k with the maximum total sum. Return the starting indices of the subarrays.',
  examples: [
    { input: 'nums=[1,2,1,2,6,7,5,1], k=2', output: '[0,3,5]', explanation: 'Subarrays [1,2],[2,6],[7,5] with sum 15.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 2 × 10⁴', '1 ≤ nums[i] < 2¹⁶', '1 ≤ k ≤ ⌊nums.length / 3⌋'],
  starterCode: `def max_sum_of_three_subarrays(nums, k):
  pass`,
  functionName: 'max_sum_of_three_subarrays',
  conceptId: 'prefix-sum',
  testCases: [
    { label: 'Standard', args: [[1,2,1,2,6,7,5,1],2], expected: [0,3,5] },
    { label: 'k=1', args: [[1,2,3],1], expected: [0,1,2] },
  ],
}
