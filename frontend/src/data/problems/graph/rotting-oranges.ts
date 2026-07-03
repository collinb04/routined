export default {
  id: 'rotting-oranges',
  title: 'Rotting Oranges',
  difficulty: 'medium',
  description: `<p>You are given an <code>m x n</code> grid where each cell can be: <code>0</code> (empty), <code>1</code> (fresh orange), or <code>2</code> (rotten orange). Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If it is impossible, return <code>-1</code>.</p>`,
  examples: [
    { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4' },
    { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1' },
  ],
  constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 10', 'grid[i][j] is 0, 1, or 2'],
  starterCode: `def oranges_rotting(grid):
  pass`,
  functionName: 'oranges_rotting',
  conceptId: 'graphs',
  testCases: [
    { label: '4 minutes', args: [[[2,1,1],[1,1,0],[0,1,1]]], expected: 4 },
    { label: 'impossible', args: [[[2,1,1],[0,1,1],[1,0,1]]], expected: -1 },
    { label: 'all rotten', args: [[[0,2]]], expected: 0 },
  ],
}
