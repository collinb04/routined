export default {
  id: 'graph-valid-tree',
  title: 'Graph Valid Tree',
  difficulty: 'medium',
  description: `<p>You have a graph of <code>n</code> nodes labeled from <code>0</code> to <code>n - 1</code>. You are given an integer <code>n</code> and a list of undirected edges. Check if the edges make up a valid tree. A valid tree has exactly <code>n-1</code> edges and is fully connected with no cycles.</p>`,
  examples: [
    { input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', output: 'true' },
    { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', output: 'false' },
  ],
  constraints: ['1 <= n <= 2000', '0 <= edges.length <= 5000', 'No self-loops or repeated edges'],
  starterCode: `def valid_tree(n, edges):
  pass`,
  functionName: 'valid_tree',
  conceptId: 'graphs',
  testCases: [
    { label: 'valid tree', args: [5, [[0,1],[0,2],[0,3],[1,4]]], expected: true },
    { label: 'has cycle', args: [5, [[0,1],[1,2],[2,3],[1,3],[1,4]]], expected: false },
  ],
}
