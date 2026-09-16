export default {
  id: 'populating-next-right-pointers',
  title: 'Populating Next Right Pointers in Each Node',
  difficulty: 'medium',
  description: 'Given a perfect binary tree, populate each node\'s <code>next</code> pointer to the next node on the same level. The rightmost node\'s <code>next</code> should be null.',
  examples: [
    { input: 'root = [1,2,3,4,5,6,7]', output: '[1,#,2,3,#,4,5,6,7,#]', explanation: 'Each level connects left to right, ending with #.' },
  ],
  constraints: ['Tree is perfect: all leaves at the same depth, all interior nodes have two children', '0 ≤ Node.val ≤ 100'],
  starterCode: `class Node:
  def __init__(self, val=0, left=None, right=None, next=None):
      self.val = val
      self.left = left
      self.right = right
      self.next = next

class Solution:
    def connect(self, root):
        pass`,
  functionName: 'connect_run',
  conceptId: 'trees',
  runnerSetup: `def _build_perfect(arr):
  if not arr: return None
  nodes = [Node(v) for v in arr]
  n = len(nodes)
  for i in range(n):
      li, ri = 2*i+1, 2*i+2
      if li < n: nodes[i].left = nodes[li]
      if ri < n: nodes[i].right = nodes[ri]
  return nodes[0]
def connect_run(arr):
  root = Solution().connect(_build_perfect(arr))
  result = []
  level_start = root
  while level_start:
      node = level_start
      while node:
          result.append(node.val)
          node = node.next
      result.append(None)
      level_start = level_start.left
  return result`,
  testCases: [
    { label: 'Perfect tree', args: [[1,2,3,4,5,6,7]], expected: [1,null,2,3,null,4,5,6,7,null] },
  ],
  bruteHint: 'The brute-force approach traverses the tree level by level with a queue, storing every node on a level so each one can be linked to its right neighbor before moving to the next level. This costs O(n) time and O(n) space, since the queue can hold half the nodes when the widest level is reached. Given that the tree is guaranteed to be perfect, is there a way to walk each level without holding all of its nodes in memory at once?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'perfect-tree-guarantee',
      highlight: { location: 'constraint', text: 'Tree is perfect: all leaves at the same depth, all interior nodes have two children' },
      question: 'Constraints that describe a data structure\'s guaranteed shape often let you skip defensive checks entirely. The tree is guaranteed to be perfect — all interior nodes have two children, all leaves at the same depth. What does this let you assume?',
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
      highlight: { location: 'description', text: 'to the next node on the same level' },
      question: 'The exact relationship a problem\'s description draws between elements often points straight at the traversal you need to implement. For two children of different parents on the same level — like node 5 and node 6 — node 5\'s next should point to node 6. How can you set this cross-parent link?',
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
      question: 'Problems that expect an in-place solution are nudging you to reuse structure that already exists instead of allocating new memory. The problem asks you to populate pointers in-place. What space complexity is achievable?',
      options: [
        { label: 'O(n) — must store an entire level of nodes at once', isCorrect: false, feedback: 'BFS with a queue uses O(n/2) space at the widest level — O(n) overall. But the perfect-tree structure lets you walk each level using already-set next pointers, achieving O(1) extra space.' },
        { label: 'O(1) extra space using the next pointers as traversal', isCorrect: true },
        { label: 'O(log n) — one frame per level from recursive calls', isCorrect: false, feedback: 'Recursive approaches use O(log n) stack space (one frame per level of the perfect tree). Iterative traversal using already-set next pointers achieves true O(1) extra space.' },
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
      highlight: { location: 'description', text: 'The rightmost node\'s <code>next</code> should be null.' },
      question: 'Edge cases spelled out explicitly in a description often resolve on their own once the core traversal logic is right, without needing special-case code. The rightmost node at each level should have next = null. How does your algorithm handle this automatically?',
      options: [
        { label: 'Explicitly set the last node\'s next to null after each level', isCorrect: false, feedback: 'Python initializes object attributes to None by default, and the problem specifies this is already the default. If your traversal stops at the rightmost node without setting its next, it remains null automatically.' },
        { label: 'The rightmost node is never updated — it keeps its default null', isCorrect: true },
        { label: 'Check if node.next is null and skip it', isCorrect: false, feedback: 'Checking whether node.next is null is actually a useful loop termination condition — you stop advancing when you reach the end of a level. But the rightmost node\'s next is null by default, not something you set.' },
        { label: 'Add an extra placeholder node at the end of each level', isCorrect: false, feedback: 'Sentinels add unnecessary complexity. The rightmost node at each level is simply never assigned a next pointer during traversal — its next stays null without any special handling.' },
      ],
      correctFeedback: 'Your traversal moves left to right, wiring each node\'s next to its right neighbor. The rightmost node has no right neighbor, so its next is never touched and remains null — exactly what is required.',
      wrongFeedback: [
        'Your traversal connects node to its right neighbor. What happens at the end of a level when there is no right neighbor?',
        'At the rightmost node, the inner loop terminates — there is nothing to the right. Its next pointer is never set, so it remains null. No special case needed.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def connect(self, root):
        if not root:
            return root
        leftmost = root
        while leftmost.left:
            node = leftmost
            while node:
                node.left.next = node.right
                if node.next:
                    node.right.next = node.next.left
                node = node.next
            leftmost = leftmost.left
        return root`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'The cross-parent link (<code>node.right.next = node.next.left</code>) only runs when <code>node.next</code> exists — the rightmost node on a level has no next sibling to reach into, so its right child\'s <code>next</code> is simply never assigned and stays at the default <code>None</code>, exactly matching the required output.',
  solutionExplanation: 'Because the tree is guaranteed perfect, every interior node has exactly two children, so <code>node.left.next = node.right</code> always safely wires siblings under the same parent with no null check needed. The cross-parent connection is what makes this O(1) extra space possible: once level <code>k</code>\'s next pointers are fully set, that chain of pointers <code>is</code> a ready-made traversal of level <code>k</code> — walking it via <code>node = node.next</code> visits every node on the level without a queue, and <code>leftmost = leftmost.left</code> drops down to the next level once the current one is fully wired.',
}
