export default {
  id: 'lowest-common-ancestor-binary-tree',
  title: 'Lowest Common Ancestor of a Binary Tree',
  difficulty: 'medium',
  description: 'Given a binary tree and two nodes <code>p</code> and <code>q</code>, find their lowest common ancestor (the deepest node that has both p and q as descendants, where a node is its own descendant).',
  examples: [
    { input: 'root=[3,5,1,6,2,0,8,null,null,7,4], p=5, q=1', output: '3' },
    { input: 'root=[3,5,1,6,2,0,8,null,null,7,4], p=5, q=4', output: '5' },
  ],
  constraints: ['2 ≤ number of nodes ≤ 10⁵', '-10⁹ ≤ Node.val ≤ 10⁹', 'All node values are unique; p and q exist in the tree'],
  starterCode: `def lowest_common_ancestor(root, p, q):
  pass`,
  functionName: 'lowest_common_ancestor',
  conceptId: 'trees',
  testCases: [
    { label: 'LCA is root', args: [[3,5,1,6,2,0,8,null,null,7,4],5,1], expected: 3 },
    { label: 'LCA is ancestor', args: [[3,5,1,6,2,0,8,null,null,7,4],5,4], expected: 5 },
  ],
}
