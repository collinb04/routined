export default {
  id: 'binary-tree-maximum-path-sum',
  title: 'Binary Tree Maximum Path Sum',
  difficulty: 'hard',
  description: `<p>A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. The path sum is the sum of the nodes' values in the path.</p><p>Given the root of a binary tree, return the maximum path sum of any non-empty path.</p>`,
  examples: [
    { input: 'root = [1,2,3]', output: '6 (2→1→3)' },
    { input: 'root = [-10,9,20,null,null,15,7]', output: '42 (15→20→7)' },
  ],
  constraints: ['The number of nodes is in [1, 3 * 10^4]', '-1000 <= Node.val <= 1000'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def max_path_sum(self, root):
        pass`,
  functionName: 'max_path_sum_run',
  conceptId: 'trees',
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
def max_path_sum_run(arr):
  return Solution().max_path_sum(_build(arr))`,
  testCases: [
    { label: '[1,2,3]', args: [[1,2,3]], expected: 6 },
    { label: '[-10,9,20,null,null,15,7]', args: [[-10,9,20,null,null,15,7]], expected: 42 },
  ],
  bruteHint: 'The brute-force approach checks every pair of nodes as potential path endpoints, then walks the path connecting them (through their lowest common ancestor) to sum its values. With up to 3 × 10⁴ nodes, that\'s roughly n² pairs, and summing each path adds even more work on top, so the whole approach blows past any reasonable time budget. What if each node computed its own best contribution exactly once, in a single pass?',
  optimizeComplexity: { time: 'O(n)', space: 'O(h)' },
  clues: [
    {
      id: 'path-definition',
      highlight: { location: 'description', text: 'A node can only appear in the sequence at most once.' },
      question: 'Strict usage rules in a problem statement, like an element being usable only once, often dictate exactly how you\'re allowed to combine subproblems in a recursive solution. "A node can only appear in the sequence at most once." A path can go left-child → node → right-child (a bend). What does that mean for how a path can be used within the recursion?',
      options: [
        { label: 'A path must start at the root', isCorrect: false, feedback: 'The problem says "any non-empty path" — it can start and end anywhere in the tree. Paths through non-root nodes are valid.' },
        { label: 'A path that bends at a node cannot extend upward', isCorrect: true },
        { label: 'A path can only go straight down one side', isCorrect: false, feedback: 'Paths can bend — going through both children of a node is valid. The constraint is that once the path bends at a node, it cannot also extend up to that node\'s parent.' },
        { label: 'Each node must contribute its value to the path', isCorrect: false, feedback: 'You can choose not to include a subtree if it would decrease the sum — negative subtrees should be excluded. The path is a choice, not an obligation.' },
      ],
      correctFeedback: 'When a path bends at node N (using both left and right children), N becomes the "top" of that path and cannot contribute to its parent\'s upward extension. That forces two separate computations: the best bent path at N, and the best single-branch path N can pass upward.',
      wrongFeedback: [
        'If a path goes left-subtree → N → right-subtree, can that path continue through N\'s parent? Why or why not?',
        'A path has two endpoints. Once both children are included at N, N is already an interior node on the path — it cannot be an endpoint that extends further up.',
      ],
    },
    {
      id: 'negative-values',
      highlight: { location: 'constraint', text: '-1000 <= Node.val <= 1000' },
      question: 'Value ranges listed in the constraints tell you whether extreme values like negatives are possible, and that possibility often forces special-case handling in your algorithm. Node values can be as low as -1000. What does that mean for how you handle subtree contributions?',
      options: [
        { label: 'Always include both children in the path', isCorrect: false, feedback: 'A subtree with a negative sum would decrease the path total. Including it unconditionally could make a worse answer than taking the node alone.' },
        { label: 'Clamp negative subtree contributions to zero', isCorrect: true },
        { label: 'Take the absolute value of each node', isCorrect: false, feedback: 'Absolute values change the problem entirely — path sum depends on actual node values, not their magnitudes. A node valued -1000 contributes -1000 to the sum.' },
        { label: 'Skip nodes with negative values', isCorrect: false, feedback: 'A node with a negative value might still sit between two large-positive subtrees. You can\'t skip the node — you can choose not to extend the path through a subtree.' },
      ],
      correctFeedback: 'If the best path through a subtree is negative, including that subtree only hurts. Taking max(subtree_gain, 0) lets you exclude bad branches while keeping good ones — the path simply ends at that node instead.',
      wrongFeedback: [
        'If a subtree sums to -500, does adding it to your path help or hurt? What value should you treat it as contributing?',
        'In Python, max(gain, 0) returns 0 when the gain is negative. What does treating a bad subtree as contributing 0 mean for the path\'s shape?',
      ],
    },
    {
      id: 'global-vs-local',
      highlight: { location: 'description', text: 'return the maximum path sum of any non-empty path' },
      question: 'Phrasing like "any" path rather than "a" path through a fixed point (such as the root) signals that the answer needs tracking independent of what any single recursive call returns. The answer could be any path in the tree — not necessarily one that passes through the root. What does that imply about how you track the maximum?',
      options: [
        { label: 'Return the maximum from the root call only', isCorrect: false, feedback: 'The globally optimal path may be deep in the tree and never pass through the root. Returning only the root\'s result misses all those candidates.' },
        { label: 'Maintain a global maximum updated at every node', isCorrect: true },
        { label: 'Compute all possible paths and take the max', isCorrect: false, feedback: 'Enumerating every possible path is exponential. The recursive approach computes the best path through each node in O(n) total by reusing subtree results.' },
        { label: 'The root always lies on the maximum path', isCorrect: false, feedback: 'In the example [-10,9,20,null,null,15,7], the maximum path is 15→20→7 = 42, which does not include the root node -10. The root is not guaranteed to be on the best path.' },
      ],
      correctFeedback: 'At each node you compute the best path that bends here (left_gain + node + right_gain) and update a running global max. That way every candidate path is considered in a single O(n) pass.',
      wrongFeedback: [
        'In the second example, the answer is 42 from nodes 15→20→7. Does that path include the root (-10)?',
        'The recursive helper returns the best single-branch extension upward. But you also need to record the best "bent" path seen so far. Where do you store and update that?',
      ],
    },
    {
      id: 'constraint-values',
      highlight: { location: 'constraint', text: '-1000 <= Node.val <= 1000' },
      question: 'Boundary values in the constraints, especially negative lower bounds, are a signal to think through edge cases like an all-negative input before assuming your accumulator\'s starting value is safe. Values range from -1000 to 1000 and there are up to 3 × 10⁴ nodes. What edge case does the value range introduce?',
      options: [
        { label: 'The answer is always positive', isCorrect: false, feedback: 'If all nodes are negative, the best path is the single least-negative node. The answer can be negative — initialize your global max to negative infinity, not zero.' },
        { label: 'The answer may be negative (single most negative node)', isCorrect: false, feedback: 'Close — the answer is the maximum path sum, so when all values are negative it is the least-negative (highest) single node value. That value is still negative.' },
        { label: 'Initialize global max to -infinity, not zero', isCorrect: true },
        { label: 'Negative nodes should be excluded from the tree', isCorrect: false, feedback: 'You cannot remove nodes — the tree structure is given. You can choose not to extend a path through a bad subtree, but every node is part of the tree.' },
      ],
      correctFeedback: 'Starting the global max at 0 would incorrectly return 0 for an all-negative tree. Initialize it to negative infinity (or the root\'s value) so any single-node path can be the answer.',
      wrongFeedback: [
        'If every node value is -500, what is the correct answer? What initial value for your global max would produce that answer correctly?',
        'Setting global_max = 0 at the start means you\'ll never update it when all paths are negative. What starting value makes any single node a valid candidate?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def max_path_sum(self, root):
        best = float('-inf')

        def dfs(node):
            nonlocal best
            if not node:
                return 0
            left = max(dfs(node.left), 0)
            right = max(dfs(node.right), 0)
            best = max(best, node.val + left + right)
            return node.val + max(left, right)

        dfs(root)
        return best`,
  solutionComplexity: { time: 'O(n)', space: 'O(h)' },
  solutionCaveat: 'The value <code>dfs</code> <code>returns</code> to its caller (<code>node.val + max(left, right)</code>) is deliberately narrower than the value it uses to update <code>best</code> (<code>node.val + left + right</code>) — a path returned upward can only extend through <code>one</code> child, since a path that already bent through both children has no free end left to attach to the parent.',
  solutionExplanation: 'Clamping each child\'s contribution to <code>max(dfs(child), 0)</code> means a subtree whose best path sums negative is simply excluded rather than dragging the total down — the path just ends at the current node instead. Every node gets a chance to be the "peak" of a bent path (both children included) via the running <code>best</code> update, even though only a single-branch extension can ever be handed up to that node\'s own parent, which is exactly why a global variable outside the recursion — not the function\'s return value — is what accumulates the true answer.',
}
