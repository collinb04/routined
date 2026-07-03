export default {
  id: 'all-paths-source-to-target',
  title: 'All Paths From Source to Target',
  difficulty: 'medium',
  description: 'Given a DAG of <code>n</code> nodes (0 to n-1), find all paths from node 0 to node n-1. Return them in any order.',
  examples: [
    { input: 'graph = [[1,2],[3],[3],[]]', output: '[[0,1,3],[0,2,3]]' },
    { input: 'graph = [[4,3,1],[3,2,4],[3],[4],[]]', output: '[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]' },
  ],
  constraints: ['n == graph.length', '2 ≤ n ≤ 15', 'No self-loops, no repeated edges'],
  starterCode: `def all_paths_source_target(graph):
  pass`,
  functionName: 'all_paths_source_target',
  conceptId: 'graphs',
  testCases: [
    { label: 'Two paths', args: [[[1,2],[3],[3],[]]], expected: [[0,1,3],[0,2,3]] },
  ],
}
