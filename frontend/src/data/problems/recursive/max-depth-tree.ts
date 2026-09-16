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
  starterCode: `class Solution:
    def max_depth(self, level_order):
        # level_order is a list like [3, 9, 20, None, None, 15, 7]
        # Build the tree and find max depth
        pass`,
  runnerSetup: 'max_depth = Solution().max_depth',
  functionName: 'max_depth',
  conceptId: 'trees',
  testCases: [
    { label: 'Basic tree', args: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
    { label: 'Single node', args: [[1]], expected: 1 },
    { label: 'Empty tree', args: [[]], expected: 0 },
    { label: 'Left skewed', args: [[1, 2, null, 3]], expected: 3 },
  ],
  bruteHint: 'The brute-force approach recomputes the root-to-node distance for every node independently, walking down from the root again each time instead of reusing the depth already computed for that node\'s children. Doing this for all n nodes costs O(n²) time in the worst case, since each of the n distance computations can itself take O(n) steps down a skewed tree. Since a node\'s depth depends only on its children\'s depths, is there a way to compute every node\'s depth exactly once, from the bottom up?',
  optimizeComplexity: { time: 'O(n)', space: 'O(h)' },
  clues: [
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: '0 ≤ number of nodes ≤ 10⁴' },
      question: 'Constraints define the performance ceiling your traversal must respect. Up to 10⁴ nodes in the tree. What complexity target does this set?',
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
      highlight: { location: 'constraint', text: '0 ≤ number of nodes ≤ 10⁴' },
      question: 'Lower bounds in the constraints often hide an edge case your solution must handle before it touches the main structure. The constraint says "0 ≤ number of nodes." What edge case does this introduce?',
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
      question: 'A recursive problem definition often maps directly onto the recursive function you need to write. The depth of a tree equals 1 + the maximum depth of its subtrees. What does this recursive definition suggest about your approach?',
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
  solutionCode: `from collections import deque

class Solution:
    def max_depth(self, level_order):
        if not level_order or level_order[0] is None:
            return 0

        class _Node:
            def __init__(self, val):
                self.val = val
                self.left = None
                self.right = None

        root = _Node(level_order[0])
        queue = deque([root])
        i = 1
        n = len(level_order)
        while queue and i < n:
            node = queue.popleft()
            if i < n and level_order[i] is not None:
                node.left = _Node(level_order[i])
                queue.append(node.left)
            i += 1
            if i < n and level_order[i] is not None:
                node.right = _Node(level_order[i])
                queue.append(node.right)
            i += 1

        def depth(node):
            if not node:
                return 0
            return 1 + max(depth(node.left), depth(node.right))

        return depth(root)`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'The input here is a flat level-order *list*, not a tree object — so before depth can even be measured, the same index-based rule used everywhere else in this app (two children per node, <code>None</code> meaning "no child here") has to reconstruct the actual tree first.',
  solutionExplanation: 'Once the tree is built, depth is a one-line recurrence: the depth of any node is 1 (for itself) plus whichever child subtree goes deeper. A leaf has no children, so both branches of the <code>max</code> bottom out at 0, making the leaf\'s own depth exactly 1 — the recursion doesn\'t need a separate base case beyond "no node at all is depth 0."',
}
