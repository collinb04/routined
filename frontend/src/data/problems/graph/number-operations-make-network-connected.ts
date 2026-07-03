export default {
  id: 'number-operations-make-network-connected',
  title: 'Number of Operations to Make Network Connected',
  difficulty: 'medium',
  description: 'Given n computers and connections (cables), you can move a cable from one pair of computers to another. Find the minimum number of moves to connect all computers, or -1 if impossible.',
  examples: [
    { input: 'n=4, connections=[[0,1],[0,2],[1,2]]', output: '1', explanation: 'One extra cable connects computer 3.' },
    { input: 'n=6, connections=[[0,1],[0,2],[0,3],[1,2],[1,3]]', output: '2' },
  ],
  constraints: ['1 ≤ n ≤ 10⁵', '1 ≤ connections.length ≤ min(n*(n-1)/2, 10⁵)'],
  starterCode: `def make_connected(n, connections):
  pass`,
  functionName: 'make_connected',
  conceptId: 'graphs',
  testCases: [
    { label: '1 operation', args: [4,[[0,1],[0,2],[1,2]]], expected: 1 },
    { label: '2 operations', args: [6,[[0,1],[0,2],[0,3],[1,2],[1,3]]], expected: 2 },
    { label: 'Impossible', args: [4,[[0,1]]], expected: -1 },
  ],
}
