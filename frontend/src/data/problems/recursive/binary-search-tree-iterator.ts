export default {
  id: 'binary-search-tree-iterator',
  title: 'Binary Search Tree Iterator',
  difficulty: 'medium',
  description: 'Implement an iterator for a BST. <code>next()</code> returns the next smallest number; <code>hasNext()</code> returns whether more elements exist. Both operations should average O(1) time with O(h) space (h = tree height).',
  examples: [
    { input: 'BSTIterator([7,3,15,null,null,9,20]), next(), next(), hasNext(), next(), hasNext(), next(), hasNext(), next(), hasNext()', output: '[3,7,true,9,true,15,true,20,false]' },
  ],
  constraints: ['1 ≤ number of nodes ≤ 10⁵', '0 ≤ Node.val ≤ 10⁶'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class BSTIterator:
  def __init__(self, root):
      pass

  def next(self):
      pass

  def has_next(self):
      pass`,
  functionName: 'bst_iterator_run',
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
def bst_iterator_run(arr, ops, args):
  it = BSTIterator(_build(arr))
  results = []
  for op in ops:
      if op == 'next': results.append(it.next())
      elif op == 'hasNext': results.append(it.has_next())
  return results`,
  testCases: [
    { label: 'Standard BST', args: [[7,3,15,null,null,9,20], ['next','next','hasNext','next','hasNext','next','hasNext','next','hasNext'], [[],[],[],[],[],[],[],[],[]]], expected: [3,7,true,9,true,15,true,20,false] },
  ],
  bruteHint: 'The brute-force approach flattens the entire tree into a sorted list upfront with a full inorder traversal, then serves next() calls by walking through that list one index at a time. Building the list costs O(n) time and O(n) space before a single next() call happens, even if the caller only ever asks for the first two smallest values. If most of that list might never get used, is there a way to produce values on demand instead of all at once?',
  optimizeComplexity: { time: 'O(1)', space: 'O(h)' },
  clues: [
    {
      id: 'output-order',
      highlight: { location: 'description', text: '<code>next()</code> returns the next smallest number' },
      question: 'When a problem specifies the exact order values must come out in, that phrasing often points directly to the traversal or algorithm that naturally produces it. next() returns the next smallest number. Which BST traversal visits nodes in ascending order?',
      options: [
        { label: 'Preorder (root, left, right)', isCorrect: false, feedback: 'Preorder visits the root before its children, which does not produce sorted order. Inorder traversal is the one that yields BST values in ascending sequence.' },
        { label: 'Inorder (left, root, right)', isCorrect: true },
        { label: 'Postorder (left, right, root)', isCorrect: false, feedback: 'Postorder processes children before the root, producing a bottom-up order — not ascending by value. For a BST, inorder is the sorted traversal.' },
        { label: 'Level-order (BFS)', isCorrect: false, feedback: 'Level-order visits nodes by depth, not by value. In a BST, only inorder traversal guarantees ascending sorted output.' },
      ],
      correctFeedback: 'Inorder traversal of a BST always produces values in ascending order. The iterator is essentially lazily producing an inorder sequence on demand.',
      wrongFeedback: [
        'In a BST, all left-subtree values are smaller than the root, and all right-subtree values are larger. Which traversal order exploits that structure to produce a sorted sequence?',
        'Walk a small BST by hand: which traversal visits nodes from smallest to largest value?',
      ],
    },
    {
      id: 'space-constraint',
      highlight: { location: 'description', text: 'average O(1) time with O(h) space (h = tree height)' },
      question: 'Explicit time and space complexity requirements in a problem statement tell you exactly which approaches are off the table before you write a line of code. The space constraint is O(h) where h is the tree height. What does that rule out?',
      options: [
        { label: 'Keeping only the currently pending nodes in memory during traversal', isCorrect: false, feedback: 'A controlled stack that holds at most h nodes is exactly O(h) space — that is the intended approach, not something to rule out.' },
        { label: 'Pre-computing every value into memory before any next() call', isCorrect: true },
        { label: 'Storing the root pointer only', isCorrect: false, feedback: 'Storing just the root uses O(1) space — well within O(h) — but gives you no way to resume traversal at the right position for next().' },
        { label: 'Recursive calls inside next()', isCorrect: false, feedback: 'Recursion depth is bounded by tree height h, so recursive calls use O(h) stack space — exactly within the budget.' },
      ],
      correctFeedback: 'Flattening the tree into a list upfront uses O(n) space — that violates the O(h) limit. With up to 10⁵ nodes and a balanced tree of height ~17, a list would be about 6,000× over budget.',
      wrongFeedback: [
        'If you collected all n values into a list at construction time, how does that space scale with the number of nodes versus the height?',
        'For 10⁵ nodes, n = 100,000. A balanced tree has height ≈ log₂(100,000) ≈ 17. O(h) means ~17 slots; O(n) means 100,000. Which approach fits in O(h)?',
      ],
    },
    {
      id: 'average-o1-time',
      highlight: { location: 'description', text: 'average O(1) time' },
      question: 'Precise wording in a complexity requirement, like "average" instead of "worst case," is a deliberate signal that amortized analysis is what\'s expected. next() must run in average O(1) time. Why is "average" specified rather than "worst case"?',
      options: [
        { label: 'The problem allows next() to be slow on rare calls', isCorrect: false, feedback: 'Average O(1) is not a permission to be slow — it means total work across all n calls is O(n), so the amortized cost per call is O(1). No individual call does unbounded work.' },
        { label: 'Total work across all calls is O(n), amortized O(1) each', isCorrect: true },
        { label: 'O(1) worst case is achievable if every value is precomputed in order upfront', isCorrect: false, feedback: 'A sorted array achieves O(1) worst case for next(), but it requires O(n) space — violating the O(h) constraint. Average O(1) is what the O(h)-space stack approach achieves.' },
        { label: 'Worst case per call is O(h)', isCorrect: false, feedback: 'This is true for the stack-based approach, but the question asks why "average" is specified. The reason is that summed across all n calls the total work is O(n), giving O(1) amortized.' },
      ],
      correctFeedback: 'Each node is pushed and popped from the stack exactly once across all next() calls. Total work is O(n), so average cost per call is O(n) / n = O(1) — that is amortized analysis.',
      wrongFeedback: [
        'If each of the n nodes is visited exactly once total across all next() calls, what is the average work per call?',
        'Think about it over the lifetime of the iterator: n calls, O(n) total work. Divide total work by number of calls.',
      ],
    },
    {
      id: 'vocabulary-bst-property',
      highlight: { location: 'description', text: 'iterator for a BST' },
      question: 'Vocabulary in a problem\'s title or opening line often encodes a guaranteed structural property you\'re expected to exploit, not just flavor text. "BST" in the title guarantees a specific structural property. What does it let you assume about each node?',
      options: [
        { label: 'All values are unique', isCorrect: false, feedback: 'Uniqueness is a common BST assumption but is not guaranteed by the BST property alone. The key property is the ordering: left subtree values < node < right subtree values.' },
        { label: 'Left subtree values < node < right subtree values', isCorrect: true },
        { label: 'The tree is height-balanced', isCorrect: false, feedback: 'A BST is not necessarily balanced — that is the property of an AVL tree or red-black tree. A BST only guarantees the value ordering, not balance.' },
        { label: 'Nodes are stored in sorted order in memory', isCorrect: false, feedback: 'Nodes in a BST are arranged by value relative to their subtrees, but they are not stored in contiguous sorted memory. The ordering is structural, not positional.' },
      ],
      correctFeedback: 'The BST ordering guarantee means inorder traversal directly produces sorted output — you do not need to sort anything. That guarantee is why inorder is the right traversal here.',
      wrongFeedback: [
        'What ordering rule defines a BST at every single node, and how does that rule relate to producing a sorted sequence?',
        'In a BST, for any node N, every value in N\'s left subtree is smaller and every value in the right subtree is larger. Which traversal exploits that to emit values in order?',
      ],
    },
  ],
  solutionCode: `class BSTIterator:
    def __init__(self, root):
        self.stack = []
        self._push_left(root)

    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def next(self):
        node = self.stack.pop()
        self._push_left(node.right)
        return node.val

    def has_next(self):
        return len(self.stack) > 0`,
  solutionComplexity: { time: 'O(1) average', space: 'O(h)' },
  solutionCaveat: 'The stack only ever holds a node\'s left-spine — the chain of left children on the path to the smallest not-yet-visited value — which is exactly why its size is bounded by the tree\'s height <code>h</code> rather than growing with the total node count <code>n</code>.',
  solutionExplanation: 'This lazily simulates an inorder traversal without ever building the full sorted list up front: the stack always has the next-smallest unvisited node on top, since <code>_push_left</code> greedily descends as far left as possible whenever a new subtree comes into view. Popping that node to answer <code>next()</code> and then pushing its right subtree\'s left-spine is what correctly resumes the inorder walk from exactly where it left off, and since every node is pushed and popped exactly once across the iterator\'s whole lifetime, the total work over <code>n</code> calls is O(n) — an average of O(1) per call.',
}
