export default {
  id: 'recover-binary-search-tree',
  title: 'Recover Binary Search Tree',
  difficulty: 'medium',
  description: 'Two nodes of a BST are swapped by mistake. Recover the BST without changing its structure. Try to use O(1) constant space (Morris inorder traversal).',
  examples: [
    { input: 'root = [1,3,null,null,2]', output: '[3,1,null,null,2]', explanation: 'Swap 1 and 3 back.' },
    { input: 'root = [3,1,4,null,null,2]', output: '[2,1,4,null,null,3]', explanation: 'Swap 2 and 3 back.' },
  ],
  constraints: ['2 ≤ number of nodes ≤ 1000', '-2³¹ ≤ Node.val ≤ 2³¹ − 1'],
  starterCode: `def recover_tree(root):
  pass`,
  functionName: 'recover_tree',
  conceptId: 'trees',
  testCases: [
    { label: 'Swap at root', args: [[1,3,null,null,2]], expected: [3,1,null,null,2] },
  ],
}
