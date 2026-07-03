export default {
  id: 'find-path-in-graph',
  title: 'Find if Path Exists in Graph',
  difficulty: 'easy',
  description: 'Given <code>n</code> nodes labeled 0 to n-1, a list of undirected edges, a <code>source</code> node and a <code>destination</code> node, return <code>true</code> if a valid path exists from source to destination.',
  examples: [
    { input: 'n=3, edges=[[0,1],[1,2],[2,0]], source=0, destination=2', output: 'true' },
    { input: 'n=6, edges=[[0,1],[0,2],[3,5],[5,4],[4,3]], source=0, destination=5', output: 'false' },
  ],
  constraints: [
    '1 ≤ n ≤ 2 × 10⁵',
    '0 ≤ edges.length ≤ 2 × 10⁵',
    '0 ≤ source, destination < n',
  ],
  starterCode: `def valid_path(n, edges, source, destination):
  # Hint: build an adjacency list, then BFS or DFS from source
  pass`,
  functionName: 'valid_path',
  conceptId: 'graphs',
  testCases: [
    { label: 'Path exists', args: [3, [[0,1],[1,2],[2,0]], 0, 2], expected: true },
    { label: 'No path', args: [6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5], expected: false },
    { label: 'Same node', args: [1, [], 0, 0], expected: true },
    { label: 'Direct edge', args: [3, [[0,1],[2,1]], 0, 2], expected: true },
  ],
}
