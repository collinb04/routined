export default {
  id: '3sum-closest',
  title: '3Sum Closest',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> and integer <code>target</code>, find three integers in <code>nums</code> such that the sum is closest to <code>target</code>. Return that sum.',
  examples: [
    { input: 'nums=[-1,2,1,-4], target=1', output: '2', explanation: 'The sum -1+2+1=2 is closest to 1.' },
    { input: 'nums=[0,0,0], target=1', output: '0' },
  ],
  constraints: ['3 ≤ nums.length ≤ 500', '-1000 ≤ nums[i] ≤ 1000', '-10⁴ ≤ target ≤ 10⁴'],
  starterCode: `def three_sum_closest(nums, target):
  pass`,
  functionName: 'three_sum_closest',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'Closest is 2', args: [[-1,2,1,-4],1], expected: 2 },
    { label: 'All zeros', args: [[0,0,0],1], expected: 0 },
    { label: 'Exact match', args: [[1,2,3],6], expected: 6 },
  ],
}
