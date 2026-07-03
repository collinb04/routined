export default {
  id: 'pacific-atlantic-water-flow',
  title: 'Pacific Atlantic Water Flow',
  difficulty: 'medium',
  description: `<p>There is an <code>m x n</code> rectangular island that borders both the Pacific and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the right and bottom edges. Water can flow to a neighboring cell if that cell has height less than or equal to the current cell. Return a list of grid coordinates where water can flow to both the Pacific and Atlantic oceans.</p>`,
  examples: [
    { input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]' },
  ],
  constraints: ['m == heights.length', 'n == heights[r].length', '1 <= m, n <= 200', '0 <= heights[r][c] <= 10^5'],
  starterCode: `def pacific_atlantic(heights):
  pass`,
  functionName: 'pacific_atlantic_run',
  conceptId: 'graphs',
  runnerSetup: `def pacific_atlantic_run(heights):
  result = pacific_atlantic(heights)
  return sorted([sorted(c) for c in result])`,
  testCases: [
    { label: '5x5', args: [[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]], expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]] },
  ],
}
