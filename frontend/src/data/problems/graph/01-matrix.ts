export default {
  id: '01-matrix',
  title: '01 Matrix',
  difficulty: 'medium',
  description: 'Given an <code>m × n</code> binary matrix <code>mat</code>, return a matrix of the same size where each cell contains the distance to the nearest 0. Use BFS.',
  examples: [
    { input: 'mat = [[0,0,0],[0,1,0],[0,0,0]]', output: '[[0,0,0],[0,1,0],[0,0,0]]' },
    { input: 'mat = [[0,0,0],[0,1,0],[1,1,1]]', output: '[[0,0,0],[0,1,0],[1,2,1]]' },
  ],
  constraints: ['m == mat.length', 'n == mat[0].length', '1 ≤ m, n ≤ 10⁴', 'mat[i][j] is 0 or 1', 'At least one 0'],
  starterCode: `def update_matrix(mat):
  pass`,
  functionName: 'update_matrix',
  conceptId: 'graphs',
  testCases: [
    { label: 'Center 1', args: [[[0,0,0],[0,1,0],[0,0,0]]], expected: [[0,0,0],[0,1,0],[0,0,0]] },
    { label: 'Corner 1s', args: [[[0,0,0],[0,1,0],[1,1,1]]], expected: [[0,0,0],[0,1,0],[1,2,1]] },
  ],
}
