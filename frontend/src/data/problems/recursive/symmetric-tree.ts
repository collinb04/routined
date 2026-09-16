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
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def is_symmetric(self, root):
        pass`,
  functionName: 'is_symmetric_run',
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
def is_symmetric_run(arr):
  return Solution().is_symmetric(_build(arr))`,
  testCases: [
    { label: 'Symmetric', args: [[1,2,2,3,4,4,3]], expected: true },
    { label: 'Not symmetric', args: [[1,2,2,null,3,null,3]], expected: false },
    { label: 'Single node', args: [[1]], expected: true },
  ],
  bruteHint: 'The brute-force approach collects the left subtree into one traversal list and the right subtree into another, traversing the right side in mirrored order, then compares the two flattened lists for equality afterward. Building and comparing both lists takes O(n) time and O(n) space, but flattening discards structural information — you would need to encode nulls explicitly in each list to keep the comparison safe. Why compare flattened lists at all when you could compare the tree structure directly as you traverse it?',
  optimizeComplexity: { time: 'O(n)', space: 'O(h)' },
  clues: [
    {
      id: 'mirror-definition',
      highlight: { location: 'description', text: 'mirror of itself' },
      question: 'The problem\'s core definition often directly names the comparison your algorithm must perform. "Mirror of itself" means left and right subtrees reflect each other. What comparison does this require?',
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
      question: 'A function\'s return type constrains how eagerly you can stop computing once the answer is already determined. The output is a boolean. What does this let you do the moment you find a mismatch?',
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
      question: 'Once you know what comparison to perform, you still need to know exactly which parts of the structure that comparison must recurse into. When comparing two mirror nodes, you check their values. Then what must you check about their children?',
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
      question: 'Recursive solutions live or die on their base cases — get those wrong and no amount of correct recursive logic will save you. When comparing a mirror pair, what are the two null-based base cases you must handle first?',
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
  solutionCode: `class Solution:
    def is_symmetric(self, root):
        def mirror(a, b):
            if not a and not b:
                return True
            if not a or not b:
                return False
            return a.val == b.val and mirror(a.left, b.right) and mirror(a.right, b.left)

        return mirror(root, root)`,
  solutionComplexity: { time: 'O(n)', space: 'O(h)' },
  solutionCaveat: '<code>mirror</code> pairs <code>a.left</code> against <code>b.right</code> (the outer pair) and <code>a.right</code> against <code>b.left</code> (the inner pair) — pairing same-side children instead would check whether the two subtrees are identical copies of each other, not whether they\'re mirror images.',
  solutionExplanation: 'Calling <code>mirror(root, root)</code> naturally sets up the very first comparison as <code>root.left</code> against <code>root.right</code>, which is exactly the top-level symmetry check, and every deeper recursive call continues pairing nodes in that same crossed (outer/inner) pattern all the way down. The two null-handling base cases — both null is a symmetric match, exactly one null is a definitive mismatch — are what let the <code>and</code> chain short-circuit and return false the instant any single mirror pair fails, without needing to inspect the rest of either subtree.',
}
