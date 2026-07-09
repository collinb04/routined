export default {
  id: 'symmetric-tree',
  title: 'Symmetric Tree',
  difficulty: 'easy',
  description: 'Given the root of a binary tree, check whether it is a mirror of itself (symmetric around its center).',
  examples: [
    { input: 'root = [1,2,2,3,4,4,3]', output: 'true' },
    { input: 'root = [1,2,2,null,3,null,3]', output: 'false' },
  ],
  constraints: ['1 ≤ number of nodes ≤ 1000', '-100 ≤ Node.val ≤ 100'],
  starterCode: `def is_symmetric(root):
  pass`,
  functionName: 'is_symmetric',
  conceptId: 'trees',
  testCases: [
    { label: 'Symmetric', args: [[1,2,2,3,4,4,3]], expected: true },
    { label: 'Not symmetric', args: [[1,2,2,null,3,null,3]], expected: false },
    { label: 'Single node', args: [[1]], expected: true },
  ],
  bruteHint: 'Describe collecting the left subtree and the right subtree into separate traversal lists (one mirrored) and comparing the two lists afterward',
  optimizeHint: 'Name the technique that recursively compares two mirrored subtrees node by node, pairing outer and inner children, and short-circuits on the first mismatch',
  clues: [
    {
      id: 'mirror-definition',
      question: '"Mirror of itself" means left and right subtrees reflect each other. What comparison does this require?',
      options: [
        { label: 'Compare left subtree to itself', isCorrect: false, feedback: 'Comparing a subtree to itself always returns true — that tests nothing about symmetry. The mirror check requires pairing the left subtree against the right.' },
        { label: 'Compare left subtree against right subtree', isCorrect: true },
        { label: 'Compare root to each leaf', isCorrect: false, feedback: 'Root-to-leaf comparison checks individual paths, not the mirror structure. Symmetry requires pairing every node on the left with its mirror counterpart on the right at the same depth.' },
        { label: 'Compare in-order traversal to its reverse', isCorrect: false, feedback: 'In-order traversal of a symmetric tree is a palindrome, but this check is not sufficient — a non-symmetric tree can also produce a palindromic in-order sequence with the right values.' },
      ],
      correctFeedback: 'A symmetric tree has its left and right subtrees as mirror images. You recurse with two pointers: one moving left→right and the other moving right→left simultaneously.',
      wrongFeedback: [
        'Think about what "mirror" means structurally: each node on the left side pairs with a node on the right. What two things must you compare at each pair?',
        'At every step, you check a node from the left subtree against its mirror node in the right subtree — their values and their children in opposite order.',
      ],
    },
    {
      id: 'output-boolean',
      question: 'The output is a boolean. What does this let you do the moment you find a mismatch?',
      options: [
        { label: 'Collect all mismatches, then return false', isCorrect: false, feedback: 'Collecting mismatches returns more than needed. A single mismatch is enough to prove asymmetry — there is no value in finding additional ones.' },
        { label: 'Return false immediately and stop recursing', isCorrect: true },
        { label: 'Count mismatches and return false if count > 0', isCorrect: false, feedback: 'Counting mismatches does extra work — you only need to know whether any exist. The first mismatch is definitive.' },
        { label: 'Record the asymmetric node and continue', isCorrect: false, feedback: 'The output does not include the asymmetric node — just true or false. Recording it wastes work.' },
      ],
      correctFeedback: 'Right — as soon as one mirror pair fails (different values, or one is null while the other is not), return false immediately. No need to inspect the remaining pairs.',
      wrongFeedback: [
        'The output is just true or false. What does finding the first mismatch tell you about the final answer?',
        'One asymmetric pair makes the whole tree asymmetric. What should you do as soon as you find it?',
      ],
    },
    {
      id: 'recursive-mirror-children',
      question: 'When comparing two mirror nodes, you check their values. Then what must you check about their children?',
      options: [
        { label: 'Left child of left vs left child of right', isCorrect: false, feedback: 'Comparing same-side children checks whether both subtrees look identical, not whether they mirror each other. Mirroring means the inner children pair together and the outer children pair together.' },
        { label: 'Outer children pair and inner children pair', isCorrect: true },
        { label: 'Only the deeper of the two children', isCorrect: false, feedback: 'Skipping the shallower children misses entire subtrees. Both children of both nodes must be checked — in mirrored pairs.' },
        { label: 'Check all four children against each other', isCorrect: false, feedback: 'There are only two pairs to check, not six. The left child of the left node mirrors the right child of the right node (outer), and vice versa (inner).' },
      ],
      correctFeedback: 'For mirror nodes A and B: A.left must mirror B.right (outer pair), and A.right must mirror B.left (inner pair). Both recursive calls must return true.',
      wrongFeedback: [
        'If A is on the left and B is its mirror on the right, which of A\'s children pairs with which of B\'s children?',
        'A mirrors B means: A\'s left subtree reflects B\'s right subtree, and A\'s right subtree reflects B\'s left subtree.',
      ],
    },
    {
      id: 'base-case-nulls',
      question: 'When comparing a mirror pair, what are the two null-based base cases you must handle first?',
      options: [
        { label: 'Both null → true; both non-null → recurse', isCorrect: false, feedback: 'This misses the critical failure case: one node is null and the other is not. That structural mismatch must return false before you attempt to read node values.' },
        { label: 'Both null → true; exactly one null → false', isCorrect: true },
        { label: 'Either null → false', isCorrect: false, feedback: 'If both nodes are null, that is a perfectly symmetric pair — two empty branches mirror each other. Returning false for both-null would incorrectly reject symmetric trees.' },
        { label: 'Neither null → true; one null → recurse deeper', isCorrect: false, feedback: 'You cannot recurse into a null node. When one node is null and the other is not, the structure already mismatches — return false immediately.' },
      ],
      correctFeedback: 'Both null means two matching empty branches — symmetric, return true. One null and one non-null means the structure differs — return false. Only after passing both checks do you compare values.',
      wrongFeedback: [
        'Before comparing values, you need to handle the cases where one or both nodes might not exist. What are the two possible null combinations, and what should each return?',
        'Think about it: two empty branches mirror each other perfectly. One empty branch and one non-empty branch cannot mirror each other.',
      ],
    },
  ],
}
