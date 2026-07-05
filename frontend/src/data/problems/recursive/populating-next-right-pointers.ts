export default {
  id: 'populating-next-right-pointers',
  title: 'Populating Next Right Pointers in Each Node',
  difficulty: 'medium',
  description: 'Given a perfect binary tree, populate each node\'s <code>next</code> pointer to the next node on the same level. The rightmost node\'s <code>next</code> should be null.',
  examples: [
    { input: 'root = [1,2,3,4,5,6,7]', output: '[1,#,2,3,#,4,5,6,7,#]', explanation: 'Each level connects left to right, ending with #.' },
  ],
  constraints: ['Tree is perfect: all leaves at the same depth, all interior nodes have two children', '0 ≤ Node.val ≤ 100'],
  starterCode: `def connect(root):
  pass`,
  functionName: 'connect',
  conceptId: 'trees',
  testCases: [
    { label: 'Perfect tree', args: [[1,2,3,4,5,6,7]], expected: [1,null,2,3,null,4,5,6,7,null] },
  ],
  clues: [
    {
      id: 'perfect-tree-guarantee',
      question: 'The tree is guaranteed to be perfect — all interior nodes have two children, all leaves at the same depth. What does this let you assume?',
      options: [
        { label: 'You must handle missing children at each node', isCorrect: false, feedback: 'In a perfect binary tree, every interior node has exactly two children. You never need to check whether node.left or node.right is null — the guarantee eliminates that case entirely.' },
        { label: 'Every interior node has both children; no null-child checks needed', isCorrect: true },
        { label: 'All nodes are at the same depth', isCorrect: false, feedback: 'Only the leaves are at the same depth in a perfect tree. Interior nodes are at various depths. The key guarantee is that every interior node has two children, not that all nodes are at one depth.' },
        { label: 'The tree always has exactly 7 nodes', isCorrect: false, feedback: 'A perfect binary tree can have 1, 3, 7, 15, ... nodes (2^h - 1 for height h). The constraint does not fix the size — it fixes the shape: all interior nodes have two children.' },
      ],
      correctFeedback: 'In a perfect binary tree, node.left and node.right are never null for interior nodes. You can wire node.left.next → node.right without null checks, simplifying every level of your traversal.',
      wrongFeedback: [
        'If a node is not a leaf, what does the "perfect" guarantee tell you about its children?',
        'Every non-leaf has exactly two children. You can always access .left and .right on non-leaf nodes without guarding against null.',
      ],
    },
    {
      id: 'next-pointer-across-parents',
      question: 'For two children of different parents on the same level — like node 5 and node 6 — node 5\'s next should point to node 6. How can you set this cross-parent link?',
      options: [
        { label: 'Use BFS and connect nodes level by level from a queue', isCorrect: false, feedback: 'BFS works, but using the next pointers already set on the parent level is more space-efficient. Once parent.next is set, you can reach the right-neighbor\'s children through parent.next.left — no queue needed.' },
        { label: 'Use already-set next pointers on the parent level to traverse', isCorrect: true },
        { label: 'Store all nodes in an array and link by index arithmetic', isCorrect: false, feedback: 'An array approach uses O(n) space and misses the structural insight. The next pointers you set on level k form a linked list you can exploit when setting pointers on level k+1.' },
        { label: 'Cross-parent links are impossible without extra storage', isCorrect: false, feedback: 'The already-set next pointers act as the "extra storage." Once parent.next is wired, node.right.next = node.next.left connects siblings across parent boundaries in O(1).' },
      ],
      correctFeedback: 'When processing a node with next already set, node.right.next = node.next.left bridges children across parent boundaries. Walk the level using next pointers, setting children\'s next as you go.',
      wrongFeedback: [
        'After you set next pointers on one level, those pointers form a linked list. How can you use that list when wiring the next level?',
        'At node on level k: node.left.next = node.right (same parent). node.right.next = node.next.left (cross-parent). Then advance: node = node.next. This uses the previous level\'s next pointers as a free traversal mechanism.',
      ],
    },
    {
      id: 'space-complexity-signal',
      question: 'The problem asks you to populate pointers in-place. What space complexity is achievable?',
      options: [
        { label: 'O(n) — must store all nodes in a queue', isCorrect: false, feedback: 'BFS with a queue uses O(n/2) space at the widest level — O(n) overall. But the perfect-tree structure lets you walk each level using already-set next pointers, achieving O(1) extra space.' },
        { label: 'O(1) extra space using the next pointers as traversal', isCorrect: true },
        { label: 'O(log n) — one pointer per level on the call stack', isCorrect: false, feedback: 'Recursive approaches use O(log n) stack space (one frame per level of the perfect tree). Iterative traversal using already-set next pointers achieves true O(1) extra space.' },
        { label: 'O(n²) — each node must be linked to every other', isCorrect: false, feedback: 'Each node gets exactly one next pointer. Total pointer assignments equal n − (number of rightmost nodes) = O(n), not O(n²).' },
      ],
      correctFeedback: 'The level-by-level iterative approach uses only a pointer to the leftmost node of each level. At each level, walk the previous level\'s next-linked list to set children\'s next — O(1) extra space.',
      wrongFeedback: [
        'What structures other than a queue could let you traverse an entire level?',
        'The next pointers you just set on level k form a linked list. Traverse it to set level k+1\'s next pointers. No queue, no recursion stack — just O(1) extra space.',
      ],
    },
    {
      id: 'rightmost-null-signal',
      question: 'The rightmost node at each level should have next = null. How does your algorithm handle this automatically?',
      options: [
        { label: 'Explicitly set the last node\'s next to null after each level', isCorrect: false, feedback: 'Python initializes object attributes to None by default, and the problem specifies this is already the default. If your traversal stops at the rightmost node without setting its next, it remains null automatically.' },
        { label: 'The rightmost node is never updated — it keeps its default null', isCorrect: true },
        { label: 'Check if node.next is null and skip it', isCorrect: false, feedback: 'Checking whether node.next is null is actually a useful loop termination condition — you stop advancing when you reach the end of a level. But the rightmost node\'s next is null by default, not something you set.' },
        { label: 'Append a sentinel node at the end of each level', isCorrect: false, feedback: 'Sentinels add unnecessary complexity. The rightmost node at each level is simply never assigned a next pointer during traversal — its next stays null without any special handling.' },
      ],
      correctFeedback: 'Your traversal moves left to right, wiring each node\'s next to its right neighbor. The rightmost node has no right neighbor, so its next is never touched and remains null — exactly what is required.',
      wrongFeedback: [
        'Your traversal connects node to its right neighbor. What happens at the end of a level when there is no right neighbor?',
        'At the rightmost node, the inner loop terminates — there is nothing to the right. Its next pointer is never set, so it remains null. No special case needed.',
      ],
    },
  ],
}
