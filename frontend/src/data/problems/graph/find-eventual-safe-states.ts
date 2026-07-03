export default {
  id: 'find-eventual-safe-states',
  title: 'Find Eventual Safe States',
  difficulty: 'medium',
  description: 'A node is safe if every path from it eventually leads to a terminal node (no outgoing edges). Return all safe nodes sorted in ascending order.',
  examples: [
    { input: 'graph = [[1,2],[2,3],[5],[0],[5],[],[]]', output: '[2,4,5,6]' },
  ],
  constraints: ['n == graph.length', '1 ≤ n ≤ 10⁴', '0 ≤ graph[i].length ≤ n'],
  starterCode: `def eventual_safe_nodes(graph):
  pass`,
  functionName: 'eventual_safe_nodes',
  conceptId: 'graphs',
  testCases: [
    { label: 'Standard', args: [[[1,2],[2,3],[5],[0],[5],[],[]]], expected: [2,4,5,6] },
    { label: 'No cycles', args: [[[1],[2],[]]], expected: [0,1,2] },
  ],
}
