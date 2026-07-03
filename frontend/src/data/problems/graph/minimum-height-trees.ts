export default {
  id: 'minimum-height-trees',
  title: 'Minimum Height Trees',
  difficulty: 'medium',
  description: 'A tree of n nodes can be rooted at any node. Find all root labels that give trees of minimum height. Return all such roots.',
  examples: [
    { input: 'n=4, edges=[[1,0],[1,2],[1,3]]', output: '[1]', explanation: 'Rooting at 1 gives height 1.' },
    { input: 'n=6, edges=[[3,0],[3,1],[3,2],[3,4],[5,4]]', output: '[3,4]' },
  ],
  constraints: ['1 ≤ n ≤ 2 × 10⁴', 'edges.length == n − 1'],
  starterCode: `def find_min_height_trees(n, edges):
  pass`,
  functionName: 'find_min_height_trees',
  conceptId: 'graphs',
  testCases: [
    { label: 'One root', args: [4,[[1,0],[1,2],[1,3]]], expected: [1] },
    { label: 'Two roots', args: [6,[[3,0],[3,1],[3,2],[3,4],[5,4]]], expected: [3,4] },
    { label: 'Single node', args: [1,[]], expected: [0] },
  ],
}
