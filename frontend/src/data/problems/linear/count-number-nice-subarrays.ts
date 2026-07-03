export default {
  id: 'count-number-nice-subarrays',
  title: 'Count Number of Nice Subarrays',
  difficulty: 'medium',
  description: 'Given an array of integers <code>nums</code> and integer <code>k</code>, a "nice" subarray contains exactly <code>k</code> odd numbers. Return the number of nice subarrays.',
  examples: [
    { input: 'nums=[1,1,2,1,1], k=3', output: '2', explanation: 'Subarrays [1,1,2,1] and [1,2,1,1] each have exactly 3 odd numbers.' },
    { input: 'nums=[2,4,6], k=1', output: '0' },
  ],
  constraints: ['1 ≤ nums.length ≤ 50000', '1 ≤ nums[i] ≤ 10⁵', '1 ≤ k ≤ nums.length'],
  starterCode: `def number_of_subarrays(nums, k):
  pass`,
  functionName: 'number_of_subarrays',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'Two nice', args: [[1,1,2,1,1],3], expected: 2 },
    { label: 'No nice', args: [[2,4,6],1], expected: 0 },
    { label: 'All odd', args: [[1,3,5],2], expected: 2 },
  ],
}
