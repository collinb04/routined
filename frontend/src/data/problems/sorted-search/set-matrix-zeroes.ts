export default {
  id: 'set-matrix-zeroes',
  title: 'Set Matrix Zeroes',
  difficulty: 'medium',
  description: 'Given an <code>m × n</code> integer matrix, if an element is 0, set its entire row and column to 0s in-place. Use O(1) extra space.',
  examples: [
    { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]', explanation: 'Row 1 and column 1 become zero.' },
  ],
  constraints: ['m == matrix.length', 'n == matrix[0].length', '1 ≤ m, n ≤ 200', '-2³¹ ≤ matrix[i][j] ≤ 2³¹ − 1'],
  starterCode: `def set_zeroes(matrix):
  pass`,
  functionName: 'set_zeroes',
  conceptId: 'math-geometry',
  testCases: [
    { label: 'Center zero', args: [[[1,1,1],[1,0,1],[1,1,1]]], expected: [[1,0,1],[0,0,0],[1,0,1]] },
    { label: 'Corner zero', args: [[[0,1,2],[3,4,5],[6,7,8]]], expected: [[0,0,0],[0,4,5],[0,7,8]] },
    { label: 'No zeroes', args: [[[1,2],[3,4]]], expected: [[1,2],[3,4]] },
  ],
}
