export default {
  id: 'number-of-subarrays-bounded-max',
  title: 'Number of Subarrays with Bounded Maximum',
  difficulty: 'medium',
  description: 'Given an array <code>nums</code> and two integers <code>left</code> and <code>right</code>, return the number of contiguous subarrays where the maximum element is in [left, right].',
  examples: [
    { input: 'nums=[2,1,4,3], left=2, right=3', output: '3', explanation: 'Subarrays: [2],[2,1],[3].' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '0 ≤ nums[i] ≤ 10⁹', '0 ≤ left ≤ right ≤ 10⁹'],
  starterCode: `def num_subarray_bounded_max(nums, left, right):
  pass`,
  functionName: 'num_subarray_bounded_max',
  conceptId: 'arrays',
  testCases: [
    { label: 'Three subarrays', args: [[2,1,4,3],2,3], expected: 3 },
    { label: 'All in range', args: [[1,2,3],1,3], expected: 6 },
  ],
}
