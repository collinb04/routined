export default {
  id: 'max-k-sum-pairs',
  title: 'Max Number of K-Sum Pairs',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> and an integer <code>k</code>, in one operation pick two numbers that sum to <code>k</code> and remove them. Return the maximum number of such operations.',
  examples: [
    { input: 'nums=[1,2,3,4], k=5', output: '2', explanation: '(1,4) and (2,3) are removed in 2 operations.' },
    { input: 'nums=[3,1,3,4,3], k=6', output: '1', explanation: 'Only one pair (3,3).' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '1 ≤ nums[i] ≤ 10⁹', '2 ≤ k ≤ 10⁹'],
  starterCode: `def max_operations(nums, k):
  pass`,
  functionName: 'max_operations',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'Two pairs', args: [[1,2,3,4],5], expected: 2 },
    { label: 'One pair', args: [[3,1,3,4,3],6], expected: 1 },
    { label: 'No pairs', args: [[1,2,3],10], expected: 0 },
  ],
}
