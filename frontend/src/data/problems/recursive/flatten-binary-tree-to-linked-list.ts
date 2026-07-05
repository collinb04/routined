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
  clues: [
    {
      id: 'traversal-order',
      question: '"Flatten in preorder traversal order." Looking at root=[1,2,5,3,4,null,6] → [1,2,3,4,5,6], what does preorder mean here?',
      options: [
        { label: 'Root, then left subtree, then right subtree', isCorrect: true },
        { label: 'Left subtree, then root, then right subtree', isCorrect: false, feedback: 'That is inorder traversal. Inorder on a BST gives sorted values, but this tree is not a BST and the output [1,2,3,4,5,6] follows root-first ordering: 1 (root), then the left subtree rooted at 2, then the right subtree rooted at 5.' },
        { label: 'Left subtree, then right subtree, then root', isCorrect: false, feedback: 'That is postorder traversal. Postorder visits children before parents — the output would end with the root value 1, not start with it.' },
        { label: 'Level by level, left to right', isCorrect: false, feedback: 'Level-order (BFS) would give [1,2,5,3,4,6] — nodes in breadth-first order. Preorder visits the root first, then recurses left before right.' },
      ],
      correctFeedback: 'Preorder: visit root (1), recurse left (2,3,4), recurse right (5,6). That produces the output sequence [1,2,3,4,5,6] which is exactly the flattened order.',
      wrongFeedback: [
        'In the output [1,2,3,4,5,6], node 1 (the root) appears first, then 2 (left child of 1), then its children 3 and 4 — all before 5 (right child of 1). What traversal visits root before left before right?',
        'Preorder = root first, then left subtree completely, then right subtree completely. Confirm with the example.',
      ],
    },
    {
      id: 'in-place-constraint',
      question: '"Flatten it in-place." Left child should be null; right child points to next. What must you preserve before modifying any pointers?',
      options: [
        { label: 'Save the right subtree before overwriting the right pointer', isCorrect: true },
        { label: 'Save the left subtree before overwriting the left pointer', isCorrect: false, feedback: 'You will process the left subtree before the right, so you need a reference to it — but the more critical save is the right subtree. Once you move the left subtree into the right slot, the original right subtree is unreachable unless you saved it first.' },
        { label: 'Copy the entire tree before flattening', isCorrect: false, feedback: 'In-place means you modify the existing nodes — no copies. The constraint is about pointer management within the original tree, not about duplicating it.' },
        { label: 'Nothing needs to be saved; traversal handles it', isCorrect: false, feedback: 'If you overwrite node.right to point to the flattened left subtree without saving the original right subtree first, you lose the right subtree entirely.' },
      ],
      correctFeedback: 'At each node: save right subtree, move left subtree to right, set left to null, walk to end of (now-right) chain, attach saved right. Without saving, the original right subtree is gone.',
      wrongFeedback: [
        'You want to move the left subtree into the right slot. Once you do that, where is the original right subtree?',
        'node.right = node.left overwrites the right pointer. If you haven\'t saved the original right subtree, it becomes unreachable — lost.',
      ],
    },
    {
      id: 'connecting-subtrees',
      question: 'After placing the left subtree into the right slot, how do you attach the original right subtree?',
      options: [
        { label: 'Append it at the end of the newly placed chain', isCorrect: true },
        { label: 'Attach it as the left child of the root', isCorrect: false, feedback: 'The output requires left = null at every node. Attaching the right subtree as a left child would violate the output format immediately.' },
        { label: 'Discard it — the left subtree is all that matters', isCorrect: false, feedback: 'The right subtree (5,6 in the example) is part of the preorder sequence and must appear after the left subtree in the output. Discarding it gives a wrong answer.' },
        { label: 'Prepend it before the left subtree', isCorrect: false, feedback: 'Preorder visits the left subtree before the right. Prepending the right subtree before left would reverse their order and produce an incorrect flattening.' },
      ],
      correctFeedback: 'Walk the right-pointer chain from root until you reach a node with right = null (the end of the flattened left subtree), then set its right to the saved original right subtree.',
      wrongFeedback: [
        'The left subtree is now a right-pointer chain. Where in that chain should the original right subtree be attached to maintain preorder order?',
        'Walk to the tail of the right-pointer chain (last node where right is null), then attach the original right subtree there.',
      ],
    },
    {
      id: 'node-count-complexity',
      question: 'The tree has up to 2000 nodes. If "walk to end of chain" is O(n) per node, what is the overall complexity of the iterative approach?',
      options: [
        { label: 'O(n) — each node visited once', isCorrect: false, feedback: 'The iterative approach visits each of the n nodes as the outer step, and for each one may walk up to n nodes to find the chain tail. That is O(n²) in the worst case (a left-skewed tree).' },
        { label: 'O(n²) in the worst case', isCorrect: true },
        { label: 'O(n log n) due to chain splitting', isCorrect: false, feedback: 'There is no splitting or merging pattern that gives O(n log n) here. Each node triggers a linear walk in the worst case, making the total O(n²).' },
        { label: 'O(1) because it is in-place', isCorrect: false, feedback: '"In-place" means O(1) extra space, not O(1) time. The time complexity is still determined by how many node visits the algorithm performs — and that is O(n²) for the naive iterative approach.' },
      ],
      correctFeedback: 'On a left-skewed tree with 2000 nodes, the chain walk is O(n) at each of the n steps — O(n²) total. A recursive approach or Morris-like method achieves O(n) by not re-walking the chain.',
      wrongFeedback: [
        'Imagine a tree where every node has only a left child. How many steps does the "walk to tail" take for the root? For the second node? Add them up.',
        'For a left-skewed tree: root walks n-1 steps, second node walks n-2, and so on. Sum = n(n-1)/2 = O(n²).',
      ],
    },
  ],
}
