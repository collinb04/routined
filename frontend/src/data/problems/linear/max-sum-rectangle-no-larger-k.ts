export default {
  id: 'max-sum-rectangle-no-larger-k',
  title: 'Max Sum of Rectangle No Larger Than K',
  difficulty: 'hard',
  description: 'Given a matrix of integers and integer <code>k</code>, return the max sum of a rectangle such that its sum is no larger than <code>k</code>.',
  examples: [
    { input: 'matrix=[[1,0,1],[0,-2,3]], k=2', output: '2', explanation: 'The rectangle [[0,1],[-2,3]] has sum 2.' },
  ],
  constraints: ['m == matrix.length', 'n == matrix[0].length', '1 ≤ m, n ≤ 100', '-100 ≤ matrix[i][j] ≤ 100', '-10⁵ ≤ k ≤ 10⁵'],
  starterCode: `def max_sum_submatrix(matrix, k):
  pass`,
  functionName: 'max_sum_submatrix',
  conceptId: 'prefix-sum',
  testCases: [
    { label: 'Standard', args: [[[1,0,1],[0,-2,3]],2], expected: 2 },
    { label: 'k=3', args: [[[2,2],[-1,-1]],3], expected: 3 },
  ],
}
