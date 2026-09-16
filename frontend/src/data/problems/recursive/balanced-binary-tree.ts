export default {
  id: 'balanced-binary-tree',
  title: 'Balanced Binary Tree',
  difficulty: 'easy',
  description: `<p>Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.</p>`,
  examples: [
    { input: 'root = [3,9,20,null,null,15,7]', output: 'true' },
    { input: 'root = [1,2,2,3,3,null,null,4,4]', output: 'false' },
  ],
  constraints: ['The number of nodes is in [0, 5000]', '-10^4 <= Node.val <= 10^4'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def is_balanced(self, root):
        pass`,
  functionName: 'is_balanced_run',
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
def is_balanced_run(arr):
  return Solution().is_balanced(_build(arr))`,
  testCases: [
    { label: 'balanced', args: [[3,9,20,null,null,15,7]], expected: true },
    { label: 'unbalanced', args: [[1,2,2,3,3,null,null,4,4]], expected: false },
  ],
  bruteHint: 'The brute-force approach calls a separate height-computing function at every node, comparing its left and right subtree heights to check the balance condition there. Because computing height from a node means re-walking that node\'s entire subtree, and this happens at every one of the n nodes, the total work becomes O(n²) in the worst case — for example on a skewed, chain-shaped tree. Each call redoes work that a deeper, previous call already performed. Could you restructure the traversal so each subtree\'s height is computed exactly once and reused by its ancestors?',
  optimizeComplexity: { time: 'O(n)', space: 'O(h)' },
  clues: [
    {
      id: 'definition-scope',
      question: 'Precise wording in a definition like this often marks exactly where your solution\'s logic must apply — not just at the top level. "The depth of the two subtrees of every node never differs by more than one." What does "every node" imply about where you must check?',
      highlight: { location: 'description', text: 'the depth of the two subtrees of every node never differs by more than one.' },
      options: [
        { label: 'Check only the root\'s two subtrees', isCorrect: false, feedback: 'The root\'s subtrees could be balanced while a deeper node is not. The definition requires the condition to hold at every single node in the tree.' },
        { label: 'Check the balance condition at each node recursively', isCorrect: true },
        { label: 'Check only leaf-level nodes', isCorrect: false, feedback: 'Leaves have no subtrees, so checking only there misses internal imbalances. A violation can occur at any internal node.' },
        { label: 'Check the overall tree height once', isCorrect: false, feedback: 'Overall height tells you nothing about local imbalances. A tree can have equal overall depth on both sides yet contain an unbalanced internal node.' },
      ],
      correctFeedback: 'Every node must individually satisfy the height-difference condition. That naturally maps to a recursive post-order check: verify subtrees before deciding about the current node.',
      wrongFeedback: [
        'The word "every" is precise. Can a tree pass the root-level check but fail somewhere deeper?',
        'Try drawing a tree where the two root subtrees have the same height but one contains an internally unbalanced node. Does a single root check catch it?',
      ],
    },
    {
      id: 'output-type',
      question: 'The shape of a function\'s return type is often a clue about what auxiliary state you need to thread through recursive calls. The output is a boolean. What does that mean for how you communicate imbalance up the recursion?',
      options: [
        { label: 'Return the height of each subtree', isCorrect: false, feedback: 'Height alone is not the final output, but you do need it to compute the balance condition. The trick is returning both height and balance status together — or using a sentinel value for "unbalanced."' },
        { label: 'Propagate a failure sentinel so you stop early', isCorrect: true },
        { label: 'Recompute height from the root each time', isCorrect: false, feedback: 'Recomputing height from the root at every node turns a linear check into O(n²). You need height information bottom-up, not top-down.' },
        { label: 'Count unbalanced nodes and check if count > 0', isCorrect: false, feedback: 'Counting works logically, but propagating a sentinel (like -1 for unbalanced) lets you short-circuit immediately and return false without visiting remaining nodes.' },
      ],
      correctFeedback: 'Returning -1 (or any sentinel) when imbalance is detected lets every ancestor immediately propagate failure without further work — making the solution O(n).',
      wrongFeedback: [
        'Once you know a subtree is unbalanced, do you need to compute heights for the rest of the tree?',
        'Think about what value your recursive helper can return that signals "already unbalanced — stop checking." That sentinel is what enables early exit.',
      ],
    },
    {
      id: 'complexity-naive',
      question: 'Node-count constraints are typically included so you can judge whether a naive, repeated-work approach will actually finish in time. A naive approach calls a separate height function at each node. With up to 5,000 nodes, what is the complexity of that approach?',
      highlight: { location: 'constraint', text: 'The number of nodes is in [0, 5000]' },
      options: [
        { label: 'O(n) — each node visited once', isCorrect: false, feedback: 'If you call a height function at each node and that function itself traverses the subtree, each node is visited multiple times — not once.' },
        { label: 'O(n²) — height recomputed at each node', isCorrect: true },
        { label: 'O(log n) — balanced trees have log-depth', isCorrect: false, feedback: 'Even for a balanced tree you must visit all n nodes. Log depth is a structural property, not a bound on the work needed to verify balance.' },
        { label: 'O(n log n) — similar to sorting', isCorrect: false, feedback: 'There is no divide-and-combine structure here that yields O(n log n). Calling a linear height function at each of n nodes is O(n) × O(n) = O(n²).' },
      ],
      correctFeedback: 'With 5,000 nodes, naive recomputation visits roughly 5,000² / 2 ≈ 12.5 million nodes in the worst case. A single bottom-up pass keeps it at O(n).',
      wrongFeedback: [
        'If computing height at a node takes O(subtree size) time, and you do it at every node, what is the total work on a skewed tree with 5,000 nodes?',
        'Summing 1 + 2 + ... + n gives O(n²). That is the cost of recalculating height from each node on a path-shaped tree.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def is_balanced(self, root):
        def height(node):
            if not node:
                return 0
            left = height(node.left)
            if left == -1:
                return -1
            right = height(node.right)
            if right == -1:
                return -1
            if abs(left - right) > 1:
                return -1
            return 1 + max(left, right)

        return height(root) != -1`,
  solutionComplexity: { time: 'O(n)', space: 'O(h)' },
  solutionCaveat: 'The moment a subtree is found unbalanced, <code>-1</code> propagates straight up through every ancestor without computing any further heights — that sentinel both reports the failure and doubles as an early-exit signal, so no node above the first imbalance ever does unnecessary work.',
  solutionExplanation: 'A single post-order pass computes each node\'s height while checking that node\'s own balance condition at the same time, since a node cannot decide whether it is balanced until both of its subtrees have reported their heights. Returning the height itself on success but a sentinel of <code>-1</code> on failure means a single value serves double duty — real height information flows up when everything below is fine, but the instant any subtree fails, that failure is all that needs to propagate, collapsing what would otherwise be O(n²) repeated height recomputation into a single O(n) traversal.',
}
