export default {
  id: 'minimum-size-subarray-sum',
  title: 'Minimum Size Subarray Sum',
  difficulty: 'medium',
  description: 'Given an array of positive integers <code>nums</code> and a positive integer <code>target</code>, return the minimal length of a contiguous subarray whose sum is ≥ <code>target</code>. Return 0 if no such subarray exists.',
  examples: [
    { input: 'target=7, nums=[2,3,1,2,4,3]', output: '2', explanation: '[4,3] has sum 7 and length 2.' },
    { input: 'target=4, nums=[1,4,4]', output: '1' },
  ],
  constraints: ['1 ≤ target ≤ 10⁹', '1 ≤ nums.length ≤ 10⁵', '1 ≤ nums[i] ≤ 10⁴'],
  starterCode: `def min_sub_array_len(target, nums):
  pass`,
  functionName: 'min_sub_array_len',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'Length 2', args: [7,[2,3,1,2,4,3]], expected: 2 },
    { label: 'Length 1', args: [4,[1,4,4]], expected: 1 },
    { label: 'No solution', args: [11,[1,1,1,1,1]], expected: 0 },
    { label: 'Whole array', args: [7,[2,3,2]], expected: 3 },
  ],
}
