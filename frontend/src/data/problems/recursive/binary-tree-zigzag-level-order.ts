export default {
  id: 'binary-tree-zigzag-level-order',
  title: 'Binary Tree Zigzag Level Order Traversal',
  difficulty: 'medium',
  description: 'Given the root of a binary tree, return the zigzag level-order traversal: left-to-right for odd levels, right-to-left for even levels.',
  examples: [
    { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[20,9],[15,7]]' },
  ],
  constraints: ['0 ≤ number of nodes ≤ 2000', '-100 ≤ Node.val ≤ 100'],
  starterCode: `def zigzag_level_order(root):
  pass`,
  functionName: 'zigzag_level_order',
  conceptId: 'trees',
  testCases: [
    { label: 'Standard', args: [[3,9,20,null,null,15,7]], expected: [[3],[20,9],[15,7]] },
    { label: 'Single', args: [[1]], expected: [[1]] },
    { label: 'Empty', args: [null], expected: [] },
  ],
}
