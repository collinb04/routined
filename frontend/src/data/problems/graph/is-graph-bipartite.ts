export default {
  id: 'is-graph-bipartite',
  title: 'Is Graph Bipartite?',
  difficulty: 'medium',
  description: 'Given a graph represented as an adjacency list, return <code>true</code> if it is bipartite (its nodes can be colored with two colors such that no two adjacent nodes share the same color).',
  examples: [
    { input: 'graph = [[1,2,3],[0,2],[0,1,3],[0,2]]', output: 'false' },
    { input: 'graph = [[1,3],[0,2],[1,3],[0,2]]', output: 'true' },
  ],
  constraints: ['1 ≤ graph.length ≤ 100', '0 ≤ graph[u].length < graph.length', 'No self-loops or repeated edges'],
  starterCode: `def is_bipartite(graph):
  pass`,
  functionName: 'is_bipartite',
  conceptId: 'graphs',
  testCases: [
    { label: 'Not bipartite', args: [[[1,2,3],[0,2],[0,1,3],[0,2]]], expected: false },
    { label: 'Is bipartite', args: [[[1,3],[0,2],[1,3],[0,2]]], expected: true },
  ],
}
