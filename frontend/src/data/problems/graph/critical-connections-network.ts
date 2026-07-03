export default {
  id: 'critical-connections-network',
  title: 'Critical Connections in a Network',
  difficulty: 'hard',
  description: 'Given a network of n servers and connections, a critical connection (bridge) is one whose removal disconnects the network. Find all critical connections. (Tarjan\'s bridge algorithm)',
  examples: [
    { input: 'n=4, connections=[[0,1],[1,2],[2,0],[1,3]]', output: '[[1,3]]', explanation: 'Removing [1,3] disconnects server 3.' },
  ],
  constraints: ['2 ≤ n ≤ 10⁵', 'n−1 ≤ connections.length ≤ 10⁵', 'No repeated connections'],
  starterCode: `def critical_connections(n, connections):
  pass`,
  functionName: 'critical_connections',
  conceptId: 'advanced-graphs',
  testCases: [
    { label: 'One bridge', args: [4,[[0,1],[1,2],[2,0],[1,3]]], expected: [[1,3]] },
    { label: 'All bridges', args: [3,[[0,1],[1,2]]], expected: [[0,1],[1,2]] },
  ],
}
