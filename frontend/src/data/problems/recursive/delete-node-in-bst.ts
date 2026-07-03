export default {
  id: 'delete-node-in-bst',
  title: 'Delete Node in a BST',
  difficulty: 'medium',
  description: 'Given a root of a BST and a key, delete the node with that key and return the root of the updated tree. It is guaranteed that the key exists in the tree.',
  examples: [
    { input: 'root=[5,3,6,2,4,null,7], key=3', output: '[5,4,6,2,null,null,7]', explanation: 'Replace 3 with its inorder successor 4.' },
  ],
  constraints: ['0 ≤ BST nodes ≤ 10⁴', '-10⁵ ≤ Node.val ≤ 10⁵', 'Each node is unique; key is guaranteed to exist'],
  starterCode: `def delete_node(root, key):
  pass`,
  functionName: 'delete_node',
  conceptId: 'trees',
  testCases: [
    { label: 'Delete leaf', args: [[5,3,6,2,4,null,7],2], expected: [5,3,6,null,4,null,7] },
  ],
}
