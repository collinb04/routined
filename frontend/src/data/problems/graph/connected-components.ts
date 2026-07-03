export default {
  id: 'connected-components',
  title: 'Number of Connected Components',
  difficulty: 'medium',
  description: 'Given <code>n</code> nodes labeled 0 to n-1 and a list of undirected edges, return the number of connected components in the graph. Use Union-Find.',
  examples: [
    { input: 'n=5, edges=[[0,1],[1,2],[3,4]]', output: '2' },
    { input: 'n=5, edges=[[0,1],[1,2],[2,3],[3,4]]', output: '1' },
  ],
  constraints: [
    '1 ≤ n ≤ 2000',
    '1 ≤ edges.length ≤ 5000',
    'No repeated edges, no self-loops',
  ],
  starterCode: `def count_components(n, edges):
  # Hint: initialize parent[i] = i, then union each edge, count unique roots
  pass`,
  functionName: 'count_components',
  conceptId: 'union-find',
  testCases: [
    { label: 'Two components', args: [5, [[0,1],[1,2],[3,4]]], expected: 2 },
    { label: 'One component', args: [5, [[0,1],[1,2],[2,3],[3,4]]], expected: 1 },
    { label: 'No edges', args: [4, []], expected: 4 },
    { label: 'All isolated', args: [3, []], expected: 3 },
  ],
}
