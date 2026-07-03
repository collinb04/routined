export default {
  id: 'redundant-connection',
  title: 'Redundant Connection',
  difficulty: 'medium',
  description: `<p>In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with <code>n</code> nodes labeled 1 to n, with one additional edge added. Return an edge that can be removed so that the resulting graph is a tree. If there are multiple answers, return the answer that occurs last in the input.</p>`,
  examples: [
    { input: 'edges = [[1,2],[1,3],[2,3]]', output: '[2,3]' },
    { input: 'edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]', output: '[1,4]' },
  ],
  constraints: ['n == edges.length', '3 <= n <= 1000', 'edges[i].length == 2', 'No repeated edges'],
  starterCode: `def find_redundant_connection(edges):
  pass`,
  functionName: 'find_redundant_connection',
  conceptId: 'graphs',
  testCases: [
    { label: 'triangle', args: [[[1,2],[1,3],[2,3]]], expected: [2,3] },
    { label: 'longer cycle', args: [[[1,2],[2,3],[3,4],[1,4],[1,5]]], expected: [1,4] },
  ],
}
