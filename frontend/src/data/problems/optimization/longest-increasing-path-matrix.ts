export default {
  id: 'longest-increasing-path-matrix',
  title: 'Longest Increasing Path in a Matrix',
  difficulty: 'hard',
  description: 'Given an <code>m × n</code> matrix, return the length of the longest increasing path (adjacent cells, strictly increasing). Movement is 4-directional.',
  examples: [
    { input: 'matrix = [[9,9,4],[6,6,8],[2,1,1]]', output: '4', explanation: 'Path: 1 → 2 → 6 → 9.' },
    { input: 'matrix = [[3,4,5],[3,2,6],[2,2,1]]', output: '4', explanation: 'Path: 3 → 4 → 5 → 6.' },
  ],
  constraints: ['m == matrix.length', 'n == matrix[0].length', '1 ≤ m, n ≤ 200', '0 ≤ matrix[i][j] ≤ 2³¹ − 1'],
  starterCode: `def longest_increasing_path(matrix):
  pass`,
  functionName: 'longest_increasing_path',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Length 4', args: [[[9,9,4],[6,6,8],[2,1,1]]], expected: 4 },
    { label: 'Length 4 v2', args: [[[3,4,5],[3,2,6],[2,2,1]]], expected: 4 },
    { label: 'Single', args: [[[1]]], expected: 1 },
  ],
}
