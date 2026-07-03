export default {
  id: 'continuous-subarray-sum',
  title: 'Continuous Subarray Sum',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> and integer <code>k</code>, return <code>true</code> if there is a subarray of length at least 2 whose sum is a multiple of <code>k</code>.',
  examples: [
    { input: 'nums=[23,2,4,6,7], k=6', output: 'true', explanation: '[2,4] sums to 6 which is a multiple of 6.' },
    { input: 'nums=[23,2,6,4,7], k=6', output: 'true', explanation: '[23,2,6,4,7] sums to 42 which is a multiple of 6.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '0 ≤ nums[i] ≤ 10⁹', '0 ≤ k ≤ 2³¹ − 1'],
  starterCode: `def check_subarray_sum(nums, k):
  pass`,
  functionName: 'check_subarray_sum',
  conceptId: 'prefix-sum',
  testCases: [
    { label: 'Short subarray', args: [[23,2,4,6,7],6], expected: true },
    { label: 'Full array', args: [[23,2,6,4,7],6], expected: true },
    { label: 'No match', args: [[1,2,3],7], expected: false },
  ],
}
