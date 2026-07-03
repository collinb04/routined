export default {
  id: 'maximum-subarray-sum-one-deletion',
  title: 'Maximum Subarray Sum with One Deletion',
  difficulty: 'medium',
  description: 'Return the maximum sum of a non-empty subarray with at most one element deletion. The subarray must be contiguous and non-empty after deletion.',
  examples: [
    { input: 'arr = [1,-2,0,3]', output: '4', explanation: 'Delete -2 to get [1,0,3].' },
    { input: 'arr = [1,-2,-2,3]', output: '3', explanation: 'Delete -2,-2 is not allowed; best is just [3].' },
  ],
  constraints: ['1 ≤ arr.length ≤ 10⁵', '-10⁴ ≤ arr[i] ≤ 10⁴'],
  starterCode: `def maximum_sum(arr):
  pass`,
  functionName: 'maximum_sum',
  conceptId: 'prefix-sum',
  testCases: [
    { label: '[1,-2,0,3]', args: [[1,-2,0,3]], expected: 4 },
    { label: '[1,-2,-2,3]', args: [[1,-2,-2,3]], expected: 3 },
    { label: 'All positive', args: [[1,2,3]], expected: 6 },
    { label: 'Single negative', args: [[-1,-1,-1,-1]], expected: -1 },
  ],
}
