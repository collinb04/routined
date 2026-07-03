export default {
  id: 'number-of-provinces',
  title: 'Number of Provinces',
  difficulty: 'medium',
  description: 'Given an adjacency matrix <code>isConnected</code> of cities, return the number of provinces (connected components).',
  examples: [
    { input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]', output: '2' },
    { input: 'isConnected = [[1,0,0],[0,1,0],[0,0,1]]', output: '3' },
  ],
  constraints: ['1 ≤ n ≤ 200', 'n == isConnected.length == isConnected[i].length', 'isConnected[i][j] is 1 or 0'],
  starterCode: `def find_circle_num(is_connected):
  pass`,
  functionName: 'find_circle_num',
  conceptId: 'graphs',
  testCases: [
    { label: 'Two provinces', args: [[[1,1,0],[1,1,0],[0,0,1]]], expected: 2 },
    { label: 'Three provinces', args: [[[1,0,0],[0,1,0],[0,0,1]]], expected: 3 },
    { label: 'One province', args: [[[1,1,1],[1,1,1],[1,1,1]]], expected: 1 },
  ],
}
