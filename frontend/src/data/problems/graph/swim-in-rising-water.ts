export default {
  id: 'swim-in-rising-water',
  title: 'Swim in Rising Water',
  difficulty: 'hard',
  description: 'Given an n×n grid where <code>grid[i][j]</code> is the elevation, at time <code>t</code> you can swim in cells with elevation ≤ t. Find the least time to swim from the top-left to bottom-right.',
  examples: [
    { input: 'grid=[[0,2],[1,3]]', output: '3', explanation: 'At t=3, all cells are reachable.' },
  ],
  constraints: ['n == grid.length == grid[0].length', '1 ≤ n ≤ 50', 'grid[i][j] is a permutation of [0, n²−1]'],
  starterCode: `def swim_in_water(grid):
  pass`,
  functionName: 'swim_in_water',
  conceptId: 'advanced-graphs',
  testCases: [
    { label: '2×2', args: [[[0,2],[1,3]]], expected: 3 },
    { label: '1×1', args: [[[0]]], expected: 0 },
  ],
}
