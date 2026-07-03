export default {
  id: 'check-if-array-pairs-divisible-by-k',
  title: 'Check If Array Pairs Are Divisible by k',
  difficulty: 'medium',
  description: 'Given an even-length integer array <code>arr</code> and integer <code>k</code>, return <code>true</code> if the array can be divided into pairs such that each pair sums to a multiple of <code>k</code>.',
  examples: [
    { input: 'arr=[1,2,3,4,5,10,6,7,8,9], k=5', output: 'true', explanation: 'Pairs: (1,9),(2,8),(3,7),(4,6),(5,10).' },
    { input: 'arr=[1,2,3,4,5,6], k=7', output: 'true' },
    { input: 'arr=[1,2,3,4,5,6], k=10', output: 'false' },
  ],
  constraints: ['arr.length == 2n', '1 ≤ n ≤ 10⁵', '1 ≤ arr[i] ≤ 10⁹', '1 ≤ k ≤ 10⁵'],
  starterCode: `def can_arrange(arr, k):
  pass`,
  functionName: 'can_arrange',
  conceptId: 'arrays',
  testCases: [
    { label: 'Valid pairs', args: [[1,2,3,4,5,10,6,7,8,9],5], expected: true },
    { label: 'k=7', args: [[1,2,3,4,5,6],7], expected: true },
    { label: 'k=10', args: [[1,2,3,4,5,6],10], expected: false },
  ],
}
