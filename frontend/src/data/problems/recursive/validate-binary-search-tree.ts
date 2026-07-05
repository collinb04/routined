export default {
  id: 'validate-binary-search-tree',
  title: 'Validate Binary Search Tree',
  difficulty: 'medium',
  description: `<p>Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as: the left subtree of a node contains only nodes with keys less than the node's key, the right subtree contains only nodes with keys greater than the node's key, and both subtrees must also be binary search trees.</p>`,
  examples: [
    { input: 'root = [2,1,3]', output: 'true' },
    { input: 'root = [5,1,4,null,null,3,6]', output: 'false (4 is in right subtree of 5)' },
  ],
  constraints: ['The number of nodes is in [1, 10^4]', '-2^31 <= Node.val <= 2^31 - 1'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def is_valid_bst(root):
  pass`,
  functionName: 'is_valid_bst_run',
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
def is_valid_bst_run(arr):
  return is_valid_bst(_build(arr))`,
  testCases: [
    { label: 'valid', args: [[2,1,3]], expected: true },
    { label: 'invalid', args: [[5,1,4,null,null,3,6]], expected: false },
  ],
  clues: [
    {
      id: 'subtree-constraint',
      question: 'A BST requires ALL left-subtree values to be less than the node — not just the immediate left child. What does this mean for your validation approach?',
      options: [
        { label: 'Check node.val > node.left.val and node.val < node.right.val', isCorrect: false, feedback: 'Checking only immediate children misses deeper violations. In the example [5,1,4,null,null,3,6], node 4 is a right child of 5 but 4 < 5 — caught by immediate check — but even if 4 > 5, its left child 3 < 5 would still be a violation that immediate-child checks miss.' },
        { label: 'Pass valid min/max bounds down through every recursive call', isCorrect: true },
        { label: 'Check in-order traversal is strictly increasing', isCorrect: false, feedback: 'In-order traversal being strictly increasing is actually equivalent to a valid BST — but it is a less direct approach that requires storing traversal results or tracking the previous value.' },
        { label: 'Compare each node to the root value only', isCorrect: false, feedback: 'Comparing to the root only ignores constraints imposed by intermediate ancestors. A node can satisfy the root constraint but violate a tighter bound set by an ancestor closer to it.' },
      ],
      correctFeedback: 'Each node must fall within a range set by all of its ancestors, not just its parent. Pass (min_bound, max_bound) down: when you go right, the current node becomes the new lower bound; when you go left, it becomes the upper bound.',
      wrongFeedback: [
        'Consider a node deep in the right subtree. Its value must be greater than every ancestor going left along the path to it. How do you carry that requirement down?',
        'At each node, the constraint is: min_bound < node.val < max_bound, where the bounds are inherited from ancestors. How do the bounds change when you recurse left vs right?',
      ],
    },
    {
      id: 'value-range-constraint',
      question: '-2^31 ≤ Node.val ≤ 2^31 - 1. What edge case does this create for your initial bounds?',
      options: [
        { label: 'Initialize bounds to -1000 and 1000', isCorrect: false, feedback: 'Hard-coded bounds of -1000 and 1000 would incorrectly reject valid nodes with values outside that range. The constraint says values can reach ±2^31.' },
        { label: 'Initialize bounds to -∞ and +∞', isCorrect: true },
        { label: 'No initial bounds needed — check children against parent only', isCorrect: false, feedback: 'Checking children against parent only — without inherited bounds — misses multi-level violations. Initial bounds of -∞ and +∞ allow the root to take any value, then tighten at each level.' },
        { label: 'Initialize both bounds to 0', isCorrect: false, feedback: 'Bounds of 0 would require all nodes to equal 0, rejecting every non-trivial tree. Initial bounds must allow any valid root value.' },
      ],
      correctFeedback: 'The root can be any value in [-2^31, 2^31 - 1], so initial bounds are -∞ and +∞. If you use integer sentinel values like INT_MIN and INT_MAX, a node with value INT_MIN would incorrectly fail the lower-bound check.',
      wrongFeedback: [
        'The root has no ancestor constraints. What initial bounds let any valid root value pass?',
        'If a node\'s value equals your sentinel bound, a strict inequality check would incorrectly fail. What type of initial bound avoids this problem entirely?',
      ],
    },
    {
      id: 'strict-inequality',
      question: 'The BST definition says values must be strictly less than or greater than (not equal). What does this mean for duplicate values?',
      options: [
        { label: 'Duplicates are allowed in the left subtree', isCorrect: false, feedback: 'The definition requires strictly less than — a duplicate in the left subtree would equal the parent, violating the strict inequality.' },
        { label: 'A tree with duplicate values is not a valid BST', isCorrect: true },
        { label: 'Duplicates are allowed anywhere as a special case', isCorrect: false, feedback: 'There is no special case for duplicates. The definition strictly requires less than (not ≤) for left and greater than (not ≥) for right.' },
        { label: 'Duplicates only matter at the root level', isCorrect: false, feedback: 'Strict inequality applies at every node, not just the root. A duplicate anywhere in the tree violates the BST property at that node.' },
      ],
      correctFeedback: 'The BST property uses strict inequalities: left subtree values are strictly less, right subtree values are strictly greater. Any node whose value equals an ancestor\'s value fails the check.',
      wrongFeedback: [
        'The definition says "less than" not "less than or equal to." What does that rule out?',
        'If node.val == parent.val, which side would it be on, and does it satisfy strict less-than or strict greater-than?',
      ],
    },
  ],
}
