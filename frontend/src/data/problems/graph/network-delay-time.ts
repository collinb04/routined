export default {
  id: 'network-delay-time',
  title: 'Network Delay Time',
  difficulty: 'medium',
  description: 'Given a network of n nodes and travel times of directed edges, find the minimum time for a signal sent from node <code>k</code> to reach all nodes. Return -1 if not all nodes are reachable. (Dijkstra\'s algorithm)',
  examples: [
    { input: 'times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2', output: '2', explanation: 'Signal from node 2 reaches all nodes in at most 2 time units.' },
  ],
  constraints: ['1 ≤ k ≤ n ≤ 100', '1 ≤ times.length ≤ 6000', 'All travel times are positive'],
  starterCode: `def network_delay_time(times, n, k):
  pass`,
  functionName: 'network_delay_time',
  conceptId: 'advanced-graphs',
  testCases: [
    { label: 'Standard', args: [[[2,1,1],[2,3,1],[3,4,1]],4,2], expected: 2 },
    { label: 'Unreachable', args: [[[1,2,1]],2,2], expected: -1 },
    { label: 'Single node', args: [[],1,1], expected: 0 },
  ],
}
