export default {
  id: 'number-of-connected-components',
  title: 'Number of Connected Components',
  difficulty: 'medium',
  description: `<p>You have a graph of <code>n</code> nodes labeled from <code>0</code> to <code>n - 1</code>. You are given an integer <code>n</code> and a list of edges where <code>edges[i] = [ai, bi]</code> indicates there is an edge between nodes <code>ai</code> and <code>bi</code> in the undirected graph. Return the number of connected components in the graph.</p>`,
  examples: [
    { input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', output: '2' },
    { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]', output: '1' },
  ],
  constraints: ['1 <= n <= 2000', '1 <= edges.length <= 5000', 'No repeated edges'],
  starterCode: `def count_components(n, edges):
  pass`,
  functionName: 'count_components',
  conceptId: 'graphs',
  testCases: [
    { label: '2 components', args: [5, [[0,1],[1,2],[3,4]]], expected: 2 },
    { label: '1 component', args: [5, [[0,1],[1,2],[2,3],[3,4]]], expected: 1 },
  ],
}
