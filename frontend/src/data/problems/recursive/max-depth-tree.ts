export default {
  id: 'max-depth-tree',
  title: 'Maximum Depth of Binary Tree',
  difficulty: 'easy',
  description: 'Given a list of node values in level-order (with <code>None</code> for missing nodes), return the maximum depth of the binary tree.',
  examples: [
    { input: 'level_order = [3, 9, 20, None, None, 15, 7]', output: '3' },
    { input: 'level_order = [1, None, 2]', output: '2' },
  ],
  constraints: [
    '0 ≤ number of nodes ≤ 10⁴',
    '-100 ≤ Node.val ≤ 100',
  ],
  starterCode: `def max_depth(level_order):
  # level_order is a list like [3, 9, 20, None, None, 15, 7]
  # Build the tree and find max depth
  pass`,
  functionName: 'max_depth',
  conceptId: 'trees',
  testCases: [
    { label: 'Basic tree', args: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
    { label: 'Single node', args: [[1]], expected: 1 },
    { label: 'Empty tree', args: [[]], expected: 0 },
    { label: 'Left skewed', args: [[1, 2, null, 3]], expected: 3 },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Up to 10⁴ nodes in the tree. What complexity target does this set?',
      options: [
        { label: 'O(n²) is acceptable at 10⁴ nodes', isCorrect: false, feedback: 'At n = 10,000, O(n²) is 100 million operations — borderline or too slow. For a tree traversal problem, O(n) is natural and expected.' },
        { label: 'O(n) — visit each node once', isCorrect: true },
        { label: 'O(log n) — exploit tree structure', isCorrect: false, feedback: 'O(log n) would require the tree to be balanced with exploitable structure. A generic binary tree can be skewed (depth = n), so you cannot skip nodes — you must visit all of them.' },
        { label: 'O(n log n) — sort nodes by depth', isCorrect: false, feedback: 'Sorting nodes by depth would require knowing their depth first, which already takes O(n). And sorting adds unnecessary work — you only need the maximum, not a sorted order.' },
      ],
      correctFeedback: 'With up to 10,000 nodes, a single O(n) traversal is both necessary and sufficient. Every node contributes to exactly one path from root to a leaf.',
      wrongFeedback: [
        'To find the maximum depth, how many nodes do you need to examine in the worst case?',
        'A skewed tree has depth equal to n, so you must visit every node. That makes O(n) the right target.',
      ],
    },
    {
      id: 'empty-tree-guarantee',
      question: 'The constraint says "0 ≤ number of nodes." What edge case does this introduce?',
      options: [
        { label: 'You can assume the tree is non-empty', isCorrect: false, feedback: 'The lower bound of 0 explicitly means the tree can be empty. Assuming non-empty would cause a crash or wrong answer on the empty-list input.' },
        { label: 'You must handle an empty input (depth = 0)', isCorrect: true },
        { label: 'An empty list means depth is undefined', isCorrect: false, feedback: 'The problem defines depth 0 for an empty tree — that is a valid, expected output. There is no undefined case here.' },
        { label: 'A single None node has depth 1', isCorrect: false, feedback: 'A tree with zero actual nodes has depth 0. A None in the level-order list represents a missing child, not a real node — an empty list means no nodes at all.' },
      ],
      correctFeedback: 'The test case `args: [[]]` confirms it: an empty tree returns 0. Your recursion or BFS base case must handle this before accessing the root.',
      wrongFeedback: [
        'What should your function return when the input list is empty?',
        'An empty tree has no root and no depth. Return 0 before trying to build or traverse the tree.',
      ],
    },
    {
      id: 'recursive-structure',
      question: 'The depth of a tree equals 1 + the maximum depth of its subtrees. What does this recursive definition suggest about your approach?',
      options: [
        { label: 'Iterative BFS counting levels', isCorrect: false, feedback: 'BFS counting levels is a valid approach, but it is iterative — the recursive definition points toward DFS where each call returns the depth of its subtree. Both work; DFS maps more directly to the definition.' },
        { label: 'DFS returning depth at each node', isCorrect: true },
        { label: 'Track the running maximum in a global variable', isCorrect: false, feedback: 'A global maximum works, but it is unnecessary — the recursive structure naturally propagates depth upward through return values. Each call computes and returns its local depth.' },
        { label: 'Sort nodes by value to find the deepest', isCorrect: false, feedback: 'Node values are irrelevant to depth. The deepest node is the one at the bottom of the longest root-to-leaf path, regardless of its value.' },
      ],
      correctFeedback: 'DFS on the tree naturally evaluates this: at each node, return 1 + max(depth(left), depth(right)). Base case: a None node returns 0.',
      wrongFeedback: [
        'If you know the depth of a node\'s left and right subtrees, how do you compute the node\'s own depth?',
        'depth(node) = 1 + max(depth(node.left), depth(node.right)). That is a direct recursive formula — implement it with DFS.',
      ],
    },
  ],
}
