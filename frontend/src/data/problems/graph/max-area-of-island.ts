export default {
  id: 'max-area-of-island',
  title: 'Max Area of Island',
  difficulty: 'medium',
  description: `<p>You are given an <code>m x n</code> binary matrix <code>grid</code>. An island is a group of <code>1</code>s connected 4-directionally. The area of an island is the number of cells with value <code>1</code>. Return the maximum area of an island in grid, or 0 if there is no island.</p>`,
  examples: [
    { input: 'grid = [[0,0,1,0,0],[0,0,0,0,0],[0,1,1,0,1],[0,1,0,0,1],[0,1,0,0,1]]', output: '4' },
  ],
  constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 50', 'grid[i][j] is 0 or 1'],
  starterCode: `def max_area_of_island(grid):
  pass`,
  functionName: 'max_area_of_island',
  conceptId: 'graphs',
  testCases: [
    { label: 'max=4', args: [[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]], expected: 6 },
    { label: 'no island', args: [[[0,0,0,0,0,0,0,0]]], expected: 0 },
  ],
}
