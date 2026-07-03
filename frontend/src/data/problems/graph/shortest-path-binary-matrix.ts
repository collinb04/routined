export default {
  id: 'shortest-path-binary-matrix',
  title: 'Shortest Path in Binary Matrix',
  difficulty: 'medium',
  description: 'Given an n×n binary matrix <code>grid</code>, return the length of the shortest clear path (cells with value 0) from top-left to bottom-right (8-directional). Return -1 if no path.',
  examples: [
    { input: 'grid = [[0,1],[1,0]]', output: '2' },
    { input: 'grid = [[0,0,0],[1,1,0],[1,1,0]]', output: '4' },
  ],
  constraints: ['n == grid.length == grid[0].length', '1 ≤ n ≤ 100', 'grid[i][j] is 0 or 1'],
  starterCode: `def shortest_path_binary_matrix(grid):
  pass`,
  functionName: 'shortest_path_binary_matrix',
  conceptId: 'graphs',
  testCases: [
    { label: 'Length 2', args: [[[0,1],[1,0]]], expected: 2 },
    { label: 'Length 4', args: [[[0,0,0],[1,1,0],[1,1,0]]], expected: 4 },
    { label: 'Blocked start', args: [[[1,0],[0,0]]], expected: -1 },
  ],
}
