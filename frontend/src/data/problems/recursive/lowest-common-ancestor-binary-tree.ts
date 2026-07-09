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
  bruteHint: 'Describe finding the full root-to-node path for p and for q separately, then comparing the two paths for their last shared node',
  optimizeHint: 'Name the traversal where each recursive call reports what it found in its own subtree, so paths never need to be stored separately',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Up to 10⁵ nodes in the tree. What complexity does this permit?',
      options: [
        { label: 'O(n²) is fine at 10⁵ nodes', isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion operations — far too slow. You need an approach that visits each node at most once.' },
        { label: 'O(n) traversal is the target', isCorrect: true },
        { label: 'O(log n) is required', isCorrect: false, feedback: 'O(log n) is only achievable when the tree has structure you can exploit (like a BST). A generic binary tree gives you no ordering, so you must potentially visit all n nodes.' },
        { label: 'Rebuild the tree for each query', isCorrect: false, feedback: 'Rebuilding the tree for each query is O(n) per query — and entirely unnecessary. A single traversal of the existing tree is sufficient.' },
      ],
      correctFeedback: 'With 10⁵ nodes, O(n) is the right target. A single DFS that visits each node once is both necessary and sufficient.',
      wrongFeedback: [
        'If you had to find p and q without any ordering guarantees, how many nodes might you need to visit in the worst case?',
        'Without BST ordering, you have no shortcut — you might need to explore every node. That puts the floor at O(n).',
      ],
    },
    {
      id: 'ancestor-definition',
      question: '"A node is its own descendant." What does this guarantee about how you handle the case where p is an ancestor of q?',
      options: [
        { label: 'You must continue searching below p', isCorrect: false, feedback: 'If p is an ancestor of q, then p itself is the LCA by definition — no need to search further. The "own descendant" rule means you can return p as soon as you find it.' },
        { label: 'Return p immediately when found', isCorrect: true },
        { label: 'Skip p and look for the parent of both', isCorrect: false, feedback: 'If p is an ancestor of q, then p is already the answer. Looking for a higher ancestor would give you a wrong — shallower — result.' },
        { label: 'The case never occurs; p ≠ q always', isCorrect: false, feedback: 'The problem does not guarantee p ≠ q, and even when p ≠ q, one may be an ancestor of the other (see example 2: p=5, q=4, answer is 5). The "own descendant" clause covers exactly this.' },
      ],
      correctFeedback: 'When your DFS reaches p (or q), you can return it immediately — if the other node is somewhere in its subtree, this node is the LCA. No further searching needed.',
      wrongFeedback: [
        'In example 2, p=5 is returned as the answer even though q=4 is deeper in 5\'s subtree. What rule makes that valid?',
        'Because a node is its own descendant, finding p during DFS is sufficient to return it — the subtree check is implicit in the recursive structure.',
      ],
    },
    {
      id: 'output-structure',
      question: 'Both p and q are guaranteed to exist in the tree. How does this simplify your search?',
      options: [
        { label: 'You must handle the not-found case', isCorrect: false, feedback: 'The guarantee states both p and q exist. Writing a not-found handler would be dead code — the constraint is telling you what you can skip.' },
        { label: 'No null-result handling needed; always returns a node', isCorrect: true },
        { label: 'You can exit early if only one is found', isCorrect: false, feedback: 'Finding one does not mean the other is absent — it could be deeper. Since both are guaranteed to exist, you always need to find both before you can confirm the LCA.' },
        { label: 'Check the root first to avoid deep traversal', isCorrect: false, feedback: 'Checking the root first does not help — the LCA could be any node in the tree. The guarantee only removes the need to handle the no-solution case, not the traversal itself.' },
      ],
      correctFeedback: 'Since both nodes are guaranteed present, your DFS will always find them. You never need to return None or handle a missing-node path.',
      wrongFeedback: [
        'Guarantees in problem statements are permissions to skip work. What work does "p and q exist in the tree" let you skip?',
        'You are guaranteed a valid answer exists. That means no null-check on the result and no "not found" branch in your recursion.',
      ],
    },
    {
      id: 'recursive-split-signal',
      question: 'When DFS returns a non-null value from both the left and right subtrees of a node, what does that tell you?',
      options: [
        { label: 'The tree has duplicate values', isCorrect: false, feedback: 'All node values are unique (stated in the constraints), so non-null returns from both subtrees cannot mean duplicates. It means p is in one subtree and q is in the other.' },
        { label: 'p and q split across this node — it is the LCA', isCorrect: true },
        { label: 'Continue searching upward for a deeper ancestor', isCorrect: false, feedback: 'Deeper would mean further from the root — but "lowest" in LCA means closest to the leaves, which is the node where the split first occurs. You have already found it.' },
        { label: 'One of the returns must be discarded', isCorrect: false, feedback: 'Both non-null returns are meaningful: left found one target and right found the other. The current node is the first point where both subtrees contribute — that is the LCA.' },
      ],
      correctFeedback: 'If left DFS returns non-null and right DFS returns non-null, the current node is the split point — p is in one subtree, q in the other. This node is the LCA.',
      wrongFeedback: [
        'What does it mean for the left subtree to return non-null? What about the right? If both return a value, where are p and q relative to the current node?',
        'Non-null from left means p or q is in the left subtree. Non-null from right means the other is in the right. The current node is the first ancestor that has both below it.',
      ],
    },
  ],
}
