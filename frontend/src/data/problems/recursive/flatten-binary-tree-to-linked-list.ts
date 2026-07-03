export default {
  id: 'flatten-binary-tree-to-linked-list',
  title: 'Flatten Binary Tree to Linked List',
  difficulty: 'medium',
  description: 'Given the root of a binary tree, flatten it to a linked list in-place using the preorder traversal order. The left child of each node should be null, and the right child points to the next node.',
  examples: [
    { input: 'root = [1,2,5,3,4,null,6]', output: '[1,null,2,null,3,null,4,null,5,null,6]' },
  ],
  constraints: ['0 ≤ tree nodes ≤ 2000', '-100 ≤ Node.val ≤ 100'],
  starterCode: `def flatten(root):
  pass`,
  functionName: 'flatten',
  conceptId: 'trees',
  testCases: [
    { label: 'Standard', args: [[1,2,5,3,4,null,6]], expected: [1,2,3,4,5,6] },
    { label: 'Already flat', args: [[1,null,2,null,3]], expected: [1,2,3] },
  ],
}
