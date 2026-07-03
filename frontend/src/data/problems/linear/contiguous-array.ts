export default {
  id: 'contiguous-array',
  title: 'Contiguous Array',
  difficulty: 'medium',
  description: 'Given a binary array <code>nums</code>, return the maximum length of a contiguous subarray with equal numbers of 0s and 1s.',
  examples: [
    { input: 'nums = [0,1]', output: '2', explanation: '[0,1] has one 0 and one 1.' },
    { input: 'nums = [0,1,0]', output: '2', explanation: '[0,1] or [1,0] are the longest equal subarrays.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', 'nums[i] is either 0 or 1'],
  starterCode: `def find_max_length(nums):
  pass`,
  functionName: 'find_max_length',
  conceptId: 'prefix-sum',
  testCases: [
    { label: '[0,1]', args: [[0,1]], expected: 2 },
    { label: '[0,1,0]', args: [[0,1,0]], expected: 2 },
    { label: 'Balanced', args: [[0,0,1,0,0,0,1,1]], expected: 6 },
    { label: 'All zeros', args: [[0,0,0]], expected: 0 },
  ],
}
