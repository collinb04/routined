export default {
  id: 'vertical-order-traversal',
  title: 'Vertical Order Traversal of a Binary Tree',
  difficulty: 'hard',
  description: 'Given the root of a binary tree, return the vertical order traversal: columns from left to right. Within the same column, nodes at the same row are sorted by value.',
  examples: [
    { input: 'root = [3,9,20,null,null,15,7]', output: '[[9],[3,15],[20],[7]]' },
  ],
  constraints: ['1 ≤ number of nodes ≤ 1000', '0 ≤ Node.val ≤ 1000'],
  starterCode: `def vertical_traversal(root):
  pass`,
  functionName: 'vertical_traversal',
  conceptId: 'trees',
  testCases: [
    { label: 'Standard tree', args: [[3,9,20,null,null,15,7]], expected: [[9],[3,15],[20],[7]] },
    { label: 'Single', args: [[1]], expected: [[1]] },
  ],
}
