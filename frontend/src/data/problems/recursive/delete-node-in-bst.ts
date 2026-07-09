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
  bruteHint: 'Describe searching for the key by checking every node in the tree instead of using the BST\'s ordering to decide which way to go at each step',
  optimizeHint: 'Name the property of a BST that lets you discard half the remaining tree at each node while searching for the key',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'The BST has up to 10⁴ nodes. What does this tell you about acceptable complexity?',
      options: [
        { label: 'O(n) traversal of all nodes required', isCorrect: false, feedback: 'A BST lets you discard half the remaining tree at each step — you never need to visit all 10⁴ nodes to find the key.' },
        { label: 'O(n²) is fine at this size', isCorrect: false, feedback: 'O(n²) at n = 10,000 is 100 million operations. Even if that squeaks by, a BST search path is O(h) — you can do far better.' },
        { label: 'O(h) per operation, where h is tree height', isCorrect: true },
        { label: 'Input size is irrelevant for tree problems', isCorrect: false, feedback: 'Input size always matters. 10⁴ nodes rules out brute-force approaches that touch every node; the BST structure lets you navigate directly to the key.' },
      ],
      correctFeedback: 'BST search is O(h) — at each node you go left or right and ignore the other subtree. In a balanced tree that is O(log 10,000) ≈ 13 steps.',
      wrongFeedback: [
        'A BST has ordering: at each node you know which subtree the key must be in. How many nodes do you visit on the way to the target?',
        'You follow one path from root to key — that is O(h), the height of the tree, not O(n).',
      ],
    },
    {
      id: 'bst-search-direction',
      question: '"Each node is unique; key is guaranteed to exist." What does the BST ordering property let you do?',
      options: [
        { label: 'Navigate directly to the key node', isCorrect: true },
        { label: 'Scan left subtree only', isCorrect: false, feedback: 'The key could be anywhere. The BST property tells you which direction to go at each node — left or right — not that it is always on one side.' },
        { label: 'Perform an inorder traversal to find it', isCorrect: false, feedback: 'Inorder traversal visits every node — that is O(n). The BST property lets you skip entire subtrees and reach the key in O(h).' },
        { label: 'Rebuild the tree from scratch after deletion', isCorrect: false, feedback: 'Deletion only affects the target node and at most one subtree. Rebuilding from scratch would cost O(n) and discard the structure you already have.' },
      ],
      correctFeedback: 'At each node, compare key to node.val: go left if smaller, right if larger. The guarantee that the key exists means you will reach it without a not-found case.',
      wrongFeedback: [
        'The BST property says all left descendants are smaller, all right are larger. Given a key, how does that let you choose a direction at each step?',
        'At each node you eliminate one subtree entirely. You follow a single root-to-target path — never scanning all nodes.',
      ],
    },
    {
      id: 'deletion-cases',
      question: 'When you find the node to delete, the output example shows replacing 3 with its inorder successor 4. What signals that you need to handle multiple deletion cases?',
      options: [
        { label: 'The node may have 0, 1, or 2 children', isCorrect: true },
        { label: 'The tree may be unbalanced', isCorrect: false, feedback: 'Balance affects performance but not the logic of deletion. The three cases — leaf, one child, two children — exist regardless of whether the tree is balanced.' },
        { label: 'The key is guaranteed to exist', isCorrect: false, feedback: 'The guarantee simplifies the problem — it removes the not-found case. The multiple deletion cases come from how many children the target node has.' },
        { label: 'Node values can be negative', isCorrect: false, feedback: 'The value range does not create different deletion logic. What matters is the structural position of the node: leaf, one child, or two children.' },
      ],
      correctFeedback: 'A leaf is simply removed. A node with one child is replaced by that child. A node with two children needs its inorder successor (or predecessor) to preserve BST ordering.',
      wrongFeedback: [
        'Think about the structure of the node you are removing. What can be below it, and how does each possibility change what you do?',
        'Three cases: no children, one child, two children. The two-children case is the only one that needs a successor or predecessor.',
      ],
    },
    {
      id: 'return-root',
      question: 'The function signature is delete_node(root, key) and returns the root. Why return the root rather than modifying in place?',
      options: [
        { label: 'In case the deleted node is the root itself', isCorrect: true },
        { label: 'To make the function pure for testing', isCorrect: false, feedback: 'Testing convenience is not the reason. The concrete structural issue is that if the root is deleted, the caller needs to receive the new root — a reference it cannot get any other way.' },
        { label: 'BST nodes do not have parent pointers', isCorrect: false, feedback: 'Lack of parent pointers is a real BST trait, but it is not why the root is returned. The root itself could be the deleted node, leaving the caller holding a dangling reference.' },
        { label: 'The constraints require it for all tree problems', isCorrect: false, feedback: 'This is specific to deletion, not a universal rule. If root.val == key, the old root is gone — the caller must receive whatever replaces it.' },
      ],
      correctFeedback: 'If key == root.val, the root is deleted and the caller has no other way to learn the new root. Returning root from every recursive call lets the parent link up cleanly.',
      wrongFeedback: [
        'What happens if the node with the matching key is at the very top of the tree? How does the caller find the new root?',
        'Deletion can remove any node, including the root. Returning the (possibly new) root at every level lets recursive calls rewire parent-child links correctly.',
      ],
    },
  ],
}
