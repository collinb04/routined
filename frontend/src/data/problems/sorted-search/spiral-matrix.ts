export default {
  id: 'spiral-matrix',
  title: 'Spiral Matrix',
  difficulty: 'medium',
  description: 'Given an <code>m × n</code> matrix, return all elements of the matrix in spiral order (clockwise from the outer ring inward).',
  examples: [
    { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]', explanation: 'Traverse the border, then spiral inward.' },
  ],
  constraints: ['m == matrix.length', 'n == matrix[0].length', '1 ≤ m, n ≤ 10', '-100 ≤ matrix[i][j] ≤ 100'],
  starterCode: `def spiral_order(matrix):
  pass`,
  functionName: 'spiral_order',
  conceptId: 'math-geometry',
  testCases: [
    { label: '3×3', args: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [1,2,3,6,9,8,7,4,5] },
    { label: '2×3', args: [[[1,2,3],[4,5,6]]], expected: [1,2,3,6,5,4] },
    { label: 'Single row', args: [[[1,2,3,4]]], expected: [1,2,3,4] },
    { label: 'Single column', args: [[[1],[2],[3]]], expected: [1,2,3] },
  ],
}
