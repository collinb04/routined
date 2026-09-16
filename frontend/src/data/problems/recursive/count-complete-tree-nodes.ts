export default {
  id: 'count-complete-tree-nodes',
  title: 'Count Complete Tree Nodes',
  difficulty: 'easy',
  description: 'Given the root of a complete binary tree, count the number of nodes. A complete binary tree has all levels fully filled except possibly the last, which is filled from left to right. Achieve O(log²n) time.',
  examples: [
    { input: 'root = [1,2,3,4,5,6]', output: '6' },
    { input: 'root = []', output: '0' },
  ],
  constraints: ['0 ≤ number of nodes ≤ 5 × 10⁴', '0 ≤ Node.val ≤ 5 × 10⁴'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def count_nodes(self, root):
        pass`,
  functionName: 'count_nodes_run',
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
def count_nodes_run(arr):
  return Solution().count_nodes(_build(arr))`,
  testCases: [
    { label: 'Six nodes', args: [[1,2,3,4,5,6]], expected: 6 },
    { label: 'Empty', args: [null], expected: 0 },
    { label: 'One node', args: [[1]], expected: 1 },
  ],
  bruteHint: 'The simplest approach visits every node once via a full traversal (DFS or BFS) and increments a counter, which is correct for any binary tree but costs O(n) time and O(h) space for the call stack. The problem explicitly asks for O(log²n) time, and n can reach 5 × 10⁴ nodes, so a full visit is too slow. What does a complete tree\'s structure let you skip that a general binary tree would not?',
  optimizeComplexity: { time: 'O((log n)²)', space: 'O(log n)' },
  clues: [
    {
      id: 'complete-tree-definition',
      highlight: { location: 'description', text: 'all levels fully filled except possibly the last, which is filled from left to right' },
      question: 'Problem descriptions often smuggle in structural guarantees that unlock a faster algorithm than the naive approach. "All levels fully filled except possibly the last, filled left to right." What structural guarantee does this give you?',
      options: [
        { label: 'Every leaf is at the same depth', isCorrect: false, feedback: 'That describes a perfect binary tree — a stricter condition. A complete tree allows the last level to be partially filled, so leaves can differ in depth by one.' },
        { label: 'Every subtree is either a perfect binary tree or nearly so', isCorrect: true },
        { label: 'Left and right subtree heights differ by at most one', isCorrect: false, feedback: 'That is the definition of a height-balanced (AVL) tree. A complete tree is more specific: left-to-right filling guarantees that one of the two subtrees is always a perfect binary tree.' },
        { label: 'The tree always has 2^h - 1 nodes', isCorrect: false, feedback: '2^h - 1 is the count for a perfect binary tree — every level full. A complete tree may have fewer nodes if the last level is only partially filled.' },
      ],
      correctFeedback: 'In a complete binary tree, either the left subtree is perfect (one level deeper) and the right is complete, or the left is complete and the right is perfect (same depth). One of the two is always a perfect binary tree — and perfect trees can be counted in O(1).',
      wrongFeedback: [
        'In a complete tree, where does the last-level filling stop? What does that imply about the left vs. right subtree?',
        'Left-to-right filling means the left subtree is always at least as full as the right. One of the two subtrees is always perfect — all levels filled. Which one, and why does that matter?',
      ],
    },
    {
      id: 'target-complexity',
      highlight: { location: 'description', text: 'Achieve O(log²n) time' },
      question: 'When a problem states an explicit target complexity, that number tells you which category of technique to reach for before you write a single line of code. The problem explicitly asks for O(log²n) time. A naive traversal of all nodes is O(n). What property of the complete tree enables the faster approach?',
      options: [
        { label: 'A perfect binary tree can be counted with a formula instead of traversal', isCorrect: true },
        { label: 'The tree is sorted, so binary search applies', isCorrect: false, feedback: 'The tree is not a BST — node values carry no ordering guarantee. The O(log²n) speedup comes from detecting perfect subtrees and using 2^h - 1 directly, not from binary search on values.' },
        { label: 'You can skip counting the last level entirely', isCorrect: false, feedback: 'The last level is the one that may be partially filled — it is precisely what you need to count correctly. The speedup comes from counting full upper levels in O(1) using the perfect tree formula.' },
        { label: 'Complete trees always have an odd number of nodes', isCorrect: false, feedback: 'Node count parity has nothing to do with the complexity improvement. The key is that subtrees that are perfect can be counted in O(1) using 2^h - 1.' },
      ],
      correctFeedback: 'A perfect binary tree of height h has exactly 2^h - 1 nodes, computable in O(1). When you detect that a subtree is perfect (left height equals right height), you count it with the formula and skip traversal of all its nodes.',
      wrongFeedback: [
        'For a subtree where every level is full, do you need to visit every node to count them? What formula gives the count directly?',
        'If the leftmost-path height equals the rightmost-path height in a subtree, it is perfect. Perfect trees have 2^h - 1 nodes — no traversal needed.',
      ],
    },
    {
      id: 'height-comparison-trick',
      question: 'Understanding why a technique works, not just that it works, is what lets you apply it correctly and recognize when it breaks down. To detect a perfect subtree, you compare the height of the leftmost path with the height of the rightmost path. Why does this work for complete trees specifically?',
      options: [
        { label: 'In any binary tree, equal left and right heights mean the tree is perfect', isCorrect: false, feedback: 'In a general tree, equal leftmost and rightmost path heights do not guarantee perfection — a tree could have equal path lengths but missing interior nodes. This trick works only because the complete tree property guarantees left-to-right filling.' },
        { label: 'Left-to-right filling means equal path heights imply all levels are full', isCorrect: true },
        { label: 'The leftmost path is always the longest in a complete tree', isCorrect: false, feedback: 'The leftmost path is at least as long as the rightmost, but that is not what makes the comparison useful. The comparison tells you whether the tree is perfect — and that requires the complete tree filling guarantee.' },
        { label: 'Both paths visit O(log n) nodes, making comparison fast', isCorrect: false, feedback: 'The O(log n) path length is why the overall algorithm is O(log²n), but it does not explain why equal heights imply perfection. That requires the left-to-right filling property.' },
      ],
      correctFeedback: 'In a complete tree, left-to-right filling means if any node is missing, the rightmost path is shorter. Equal path lengths therefore guarantee no missing nodes — a perfect tree. This check takes O(log n) and unlocks the O(1) count formula.',
      wrongFeedback: [
        'In a complete tree, where would a missing node appear first? How would that affect the right-side path height versus the left-side path height?',
        'Left-to-right filling means gaps appear on the right side of the last level. A gap shortens the rightmost path. If left height == right height, there are no gaps — the tree is perfect.',
      ],
    },
    {
      id: 'complexity-analysis',
      highlight: { location: 'constraint', text: '0 ≤ number of nodes ≤ 5 × 10⁴' },
      question: 'Being able to derive a complexity bound from first principles, by counting recursive calls and the work done at each, lets you verify a claimed complexity instead of taking it on faith. The algorithm recurses with one O(log n) height check per call, and at each level makes at most one recursive call that is not immediately resolved by the formula. Why is overall complexity O(log²n)?',
      options: [
        { label: 'There are O(log n) recursive levels, each doing O(log n) height work', isCorrect: true },
        { label: 'Binary search over leaf positions takes O(log²n) steps', isCorrect: false, feedback: 'The algorithm is not a binary search over leaf positions — it recurses into subtrees and applies the perfect-tree shortcut. The O(log²n) bound comes from O(log n) depth × O(log n) height checks.' },
        { label: 'O(n) nodes visited but only O(log n) unique states', isCorrect: false, feedback: 'Far fewer than n nodes are visited. Each recursive call either applies the O(1) formula (skipping its entire subtree) or recurses one level deeper. At most O(log n) calls reach the recursion, each doing O(log n) work.' },
        { label: 'Each height check is O(1), giving O(log n) total', isCorrect: false, feedback: 'Each height check walks the leftmost and rightmost paths, each of length O(log n). That makes each check O(log n), not O(1).' },
      ],
      correctFeedback: 'The recursion tree has depth O(log n) — at most one subtree per level is not immediately resolved by the perfect-tree formula. Each of those O(log n) calls does an O(log n) height check. Total: O(log n) × O(log n) = O(log²n).',
      wrongFeedback: [
        'At each recursive call, one subtree is detected as perfect and counted in O(1). Only one subtree per level continues recursing. How deep can the recursion go?',
        'Recursion depth is O(log n) for a tree of 50,000 nodes (≈ 16 levels). At each level, computing left and right path heights costs O(log n). Multiply them.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def count_nodes(self, root):
        if not root:
            return 0

        def left_height(node):
            h = 0
            while node:
                h += 1
                node = node.left
            return h

        def right_height(node):
            h = 0
            while node:
                h += 1
                node = node.right
            return h

        lh = left_height(root)
        rh = right_height(root)
        if lh == rh:
            return (1 << lh) - 1
        return 1 + self.count_nodes(root.left) + self.count_nodes(root.right)`,
  solutionComplexity: { time: 'O((log n)²)', space: 'O(log n)' },
  solutionCaveat: 'The leftmost-path and rightmost-path height comparison only proves perfection <code>because</code> the tree is guaranteed complete — in an arbitrary binary tree, equal left/right path lengths say nothing about whether interior nodes are missing, so this shortcut would silently give wrong answers on a non-complete tree.',
  solutionExplanation: 'Complete-tree filling guarantees that at every node, one of its two subtrees is a perfect binary tree — comparing the leftmost-path height against the rightmost-path height detects which one in O(log n), since any missing node in a complete tree can only shorten the rightmost path relative to the leftmost. A confirmed-perfect subtree is counted instantly with the closed-form <code>2^h - 1</code>, skipping its entire contents, while the other, possibly-incomplete subtree is the only one recursed into — so at most one subtree per level needs further exploration, bounding recursion depth to O(log n) and, with an O(log n) height check at each level, total work to O(log²n).',
}
