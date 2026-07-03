export default {
  id: 'n-queens-ii',
  title: 'N-Queens II',
  difficulty: 'hard',
  description: 'Return the number of distinct solutions to the n-queens puzzle where <code>n</code> queens must be placed on an n×n chessboard such that no two queens attack each other.',
  examples: [
    { input: 'n = 4', output: '2', explanation: 'Two distinct solutions exist for 4 queens.' },
    { input: 'n = 1', output: '1' },
  ],
  constraints: ['1 ≤ n ≤ 9'],
  starterCode: `def total_n_queens(n):
  pass`,
  functionName: 'total_n_queens',
  conceptId: 'backtracking',
  testCases: [
    { label: 'n=4', args: [4], expected: 2 },
    { label: 'n=1', args: [1], expected: 1 },
    { label: 'n=8', args: [8], expected: 92 },
    { label: 'n=3', args: [3], expected: 0 },
  ],
}
