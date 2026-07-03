export default {
  id: 'unique-paths-ii',
  title: 'Unique Paths II',
  difficulty: 'medium',
  description: 'A robot starts at the top-left of an <code>m × n</code> grid and moves only right or down. Some cells have obstacles (1 = obstacle, 0 = empty). Return the number of unique paths to the bottom-right.',
  examples: [
    { input: 'obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]', output: '2', explanation: 'The obstacle blocks one of the three paths.' },
    { input: 'obstacleGrid = [[0,1],[0,0]]', output: '1' },
  ],
  constraints: ['m == obstacleGrid.length', 'n == obstacleGrid[0].length', '1 ≤ m, n ≤ 100', 'obstacleGrid[i][j] is 0 or 1'],
  starterCode: `def unique_paths_with_obstacles(obstacle_grid):
  pass`,
  functionName: 'unique_paths_with_obstacles',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'One obstacle', args: [[[0,0,0],[0,1,0],[0,0,0]]], expected: 2 },
    { label: 'Right obstacle', args: [[[0,1],[0,0]]], expected: 1 },
    { label: 'Blocked', args: [[[1,0]]], expected: 0 },
  ],
}
