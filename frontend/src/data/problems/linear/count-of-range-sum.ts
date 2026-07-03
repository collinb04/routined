export default {
  id: 'count-of-range-sum',
  title: 'Count of Range Sum',
  difficulty: 'hard',
  description: 'Given an integer array <code>nums</code> and bounds <code>lower</code> and <code>upper</code>, return the number of range sums that lie in <code>[lower, upper]</code> (inclusive). A range sum is <code>S(i, j) = nums[i] + ... + nums[j]</code> for <code>i ≤ j</code>.',
  examples: [
    { input: 'nums=[-2,5,-1], lower=-2, upper=2', output: '3', explanation: 'Ranges: [0,0]→-2, [2,2]→-1, [0,2]→2.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1', '-10⁵ ≤ lower ≤ upper ≤ 10⁵'],
  starterCode: `def count_range_sum(nums, lower, upper):
  pass`,
  functionName: 'count_range_sum',
  conceptId: 'prefix-sum',
  testCases: [
    { label: 'Standard', args: [[-2,5,-1],-2,2], expected: 3 },
    { label: 'Single element', args: [[0],0,0], expected: 1 },
    { label: 'No valid range', args: [[5,5,5],1,4], expected: 0 },
  ],
}
