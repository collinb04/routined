export default {
  id: 'rotate-image',
  title: 'Rotate Image',
  difficulty: 'medium',
  description: 'You are given an <code>n × n</code> 2D matrix representing an image. Rotate the image 90 degrees clockwise in-place.',
  examples: [
    { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]', explanation: 'Each column becomes a row in reverse order.' },
  ],
  constraints: ['n == matrix.length == matrix[i].length', '1 ≤ n ≤ 20', '-1000 ≤ matrix[i][j] ≤ 1000'],
  starterCode: `def rotate(matrix):
  pass`,
  functionName: 'rotate',
  conceptId: 'math-geometry',
  testCases: [
    { label: '3×3 matrix', args: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [[7,4,1],[8,5,2],[9,6,3]] },
    { label: '2×2 matrix', args: [[[1,2],[3,4]]], expected: [[3,1],[4,2]] },
    { label: '1×1 matrix', args: [[[5]]], expected: [[5]] },
  ],
}
