export default {
  id: 'house-robber-iii',
  title: 'House Robber III',
  difficulty: 'medium',
  description: 'The thief has found a new neighborhood structured as a binary tree. Adjacent nodes cannot both be robbed. Return the maximum amount that can be robbed.',
  examples: [
    { input: 'root = [3,2,3,null,3,null,1]', output: '7', explanation: 'Rob root (3) and leaves (3+1).' },
    { input: 'root = [3,4,5,1,3,null,1]', output: '9', explanation: 'Rob 4+5=9.' },
  ],
  constraints: ['The number of nodes is in the range [1, 10⁴]', '0 ≤ Node.val ≤ 10⁴'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def rob(self, root):
        pass`,
  functionName: 'house_robber_iii_run',
  conceptId: 'dp-2d',
  runnerSetup: `from collections import deque
def _build(arr):
  if not arr or arr[0] is None: return None
  root = TreeNode(arr[0]); q = deque([root]); i = 1
  while q and i < len(arr):
      node = q.popleft()
      if i < len(arr) and arr[i] is not None:
          node.left = TreeNode(arr[i]); q.append(node.left)
      i += 1
      if i < len(arr) and arr[i] is not None:
          node.right = TreeNode(arr[i]); q.append(node.right)
      i += 1
  return root
def house_robber_iii_run(arr):
  return Solution().rob(_build(arr))`,
  testCases: [
    { label: 'Depth 3', args: [[3,2,3,null,3,null,1]], expected: 7 },
    { label: 'Depth 3 v2', args: [[3,4,5,1,3,null,1]], expected: 9 },
  ],
  bruteHint: 'The brute-force approach recursively tries, at each node, robbing it (skipping its children) or skipping it (recursing freely into both children), branching at every step. Because grandchildren get re-explored from multiple different ancestor decisions without any caching, this naive recursion becomes exponential in the number of nodes. What could each node compute once and hand back to its parent so subtrees are never re-explored from scratch?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'structure-signal',
      question: 'The shape of the input data usually dictates which traversal strategy is even possible. The houses are arranged as a binary tree. What does tree structure imply about how you traverse the problem?',
      highlight: { location: 'description', text: 'structured as a binary tree' },
      options: [
        { label: 'Use a 2D DP table indexed by row and column', isCorrect: false, feedback: 'A 2D table suits grid problems, not trees. A binary tree\'s shape is irregular — you navigate it with recursion or DFS, not row/column indices.' },
        { label: 'Process nodes with DFS, returning results bottom-up', isCorrect: true },
        { label: 'Use BFS to process level by level', isCorrect: false, feedback: 'BFS visits a node before its children, so you\'d need to return and revisit after children are processed. DFS naturally returns information from children before the parent makes its decision.' },
        { label: 'Flatten the tree into an array first', isCorrect: false, feedback: 'Flattening destroys the parent-child adjacency structure, which is exactly the constraint you need to enforce.' },
      ],
      correctFeedback: 'Tree problems with per-node decisions are naturally recursive: process children first, then use their results at the parent. DFS (post-order) fits this bottom-up flow.',
      wrongFeedback: [
        'At each node you need information from its children before deciding whether to rob it. Which traversal order gives you children before parents?',
        'Post-order DFS visits children before the parent. What does that let you pass upward to the parent\'s decision?',
      ],
    },
    {
      id: 'adjacency-constraint',
      question: 'A rule that couples a choice at one node to what\'s allowed at its neighbors usually means each node must carry more than one possible answer. Adjacent nodes (parent-child pairs) cannot both be robbed. What two cases must each node track?',
      highlight: { location: 'description', text: 'Adjacent nodes cannot both be robbed.' },
      options: [
        { label: 'Best sum including this node vs. excluding it', isCorrect: true },
        { label: 'Left subtree sum vs. right subtree sum', isCorrect: false, feedback: 'Comparing left vs. right sums doesn\'t capture the adjacency constraint. The key choice is whether the current node itself is robbed, which blocks its children.' },
        { label: 'Whether the node is a leaf vs. internal node', isCorrect: false, feedback: 'Leaf vs. internal is a structural distinction, not a state you need to track. The relevant choice at every node is: rob it or skip it.' },
        { label: 'Maximum depth vs. minimum depth of subtree', isCorrect: false, feedback: 'Depth has nothing to do with the robbery constraint. The state you need is the best achievable value depending on whether this node is robbed.' },
      ],
      correctFeedback: 'Each node returns a pair — max gain if this node is robbed, max gain if it isn\'t. The parent uses both values to make its own optimal choice without revisiting children.',
      wrongFeedback: [
        'If you rob a node, what does that prevent? If you skip it, what becomes available?',
        'Each node needs to tell its parent two things: the best sum when this node is taken, and the best sum when it\'s not. What does each case unlock?',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'Constraints define the complexity budget your solution has to fit inside. The number of nodes is in the range [1, 10⁴]. What does this tell you about acceptable complexity?',
      highlight: { location: 'constraint', text: 'The number of nodes is in the range [1, 10⁴]' },
      options: [
        { label: 'O(n) per node is too slow', isCorrect: false, feedback: 'O(n) per node would be O(n²) total — 100 million operations at n = 10,000. That\'s borderline, but the more important signal is that you shouldn\'t revisit nodes.' },
        { label: 'Each node should be visited at most once', isCorrect: true },
        { label: 'O(n log n) is required', isCorrect: false, feedback: 'Nothing about n = 10,000 demands log-factor complexity. A single linear pass over all nodes is sufficient and natural for tree DP.' },
        { label: 'Input size doesn\'t constrain the approach', isCorrect: false, feedback: 'n = 10,000 nodes means a naive approach that revisits subtrees exponentially — like plain recursion without memoization — will be far too slow.' },
      ],
      correctFeedback: 'With up to 10,000 nodes, you need O(n) total — visit each node once. Naïve recursion without memoization revisits subtrees repeatedly and becomes exponential.',
      wrongFeedback: [
        'How many nodes might you revisit if you recompute each subtree from scratch? What does that blow up to?',
        'Without memoization, the same subtree is recomputed for every ancestor. Caching each node\'s result keeps the total work at O(n).',
      ],
    },
    {
      id: 'output-type',
      question: 'The shape of the return value tells you what you actually need to compute rather than merely check or reconstruct. The output is the maximum amount that can be robbed. This means…',
      highlight: { location: 'description', text: 'Return the maximum amount that can be robbed.' },
      options: [
        { label: 'Return the path from root to the best leaf', isCorrect: false, feedback: 'The output is a dollar amount, not a path. You don\'t need to reconstruct which nodes were robbed — just the total value.' },
        { label: 'Return a boolean indicating if robbery is possible', isCorrect: false, feedback: 'Robbery is always possible (rob any single node). The output is the maximum amount, not feasibility.' },
        { label: 'Maximize total value under the no-adjacent constraint', isCorrect: true },
        { label: 'Return the number of nodes that can be robbed', isCorrect: false, feedback: 'The output is the total money, not a count of nodes. Maximizing count and maximizing value are different objectives — a single high-value node may beat several low-value ones.' },
      ],
      correctFeedback: 'Exactly — you\'re solving an optimization problem on a tree. The goal is to find the subset of non-adjacent nodes with the maximum sum of values.',
      wrongFeedback: [
        'The output is an integer amount. What are you trying to do with that amount — minimize it, maximize it, or just report it?',
        'You\'re maximizing a sum of node values under a structural constraint. That\'s the DP objective.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def rob(self, root):
        def dfs(node):
            if not node:
                return (0, 0)
            left_rob, left_skip = dfs(node.left)
            right_rob, right_skip = dfs(node.right)
            rob_this = node.val + left_skip + right_skip
            skip_this = max(left_rob, left_skip) + max(right_rob, right_skip)
            return (rob_this, skip_this)

        return max(dfs(root))`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: '<code>skip_this</code> takes <code>max(left_rob, left_skip)</code> for each child, not just <code>left_skip</code> — skipping the current node only forbids robbing the current node itself, it says nothing about the grandchildren, so a child can still be freely robbed as long as it isn\'t this node doing the robbing.',
  solutionExplanation: 'Post-order DFS returns two values per node — the best total if this node is robbed, and the best total if it isn\'t — since a parent\'s decision depends on knowing both possibilities for each child before choosing. Robbing a node forces both children into their "not robbed" total (<code>left_skip + right_skip</code>), while skipping a node lets each child independently pick whichever of its own two totals is larger, and the root\'s final answer is simply the better of its own two totals.',
}
