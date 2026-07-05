export default {
  id: 'kth-smallest-element-in-bst',
  title: 'Kth Smallest Element in a BST',
  difficulty: 'medium',
  description: `<p>Given the root of a binary search tree and an integer <code>k</code>, return the <code>k</code>th smallest value (1-indexed) of all the values of the nodes in the tree.</p>`,
  examples: [
    { input: 'root = [3,1,4,null,2], k = 1', output: '1' },
    { input: 'root = [5,3,6,2,4,null,null,1], k = 3', output: '3' },
  ],
  constraints: ['The number of nodes is n', '1 <= k <= n <= 10^4', '0 <= Node.val <= 10^4'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def kth_smallest(root, k):
  pass`,
  functionName: 'kth_smallest_run',
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
def kth_smallest_run(arr, k):
  return kth_smallest(_build(arr), k)`,
  testCases: [
    { label: 'k=1', args: [[3,1,4,null,2], 1], expected: 1 },
    { label: 'k=3', args: [[5,3,6,2,4,null,null,1], 3], expected: 3 },
  ],
  clues: [
    {
      id: 'bst-inorder-sorted',
      question: 'The input is a BST. What property of BSTs makes finding the kth smallest straightforward?',
      options: [
        { label: 'BST nodes are stored in a sorted array internally', isCorrect: false, feedback: 'BST nodes are tree nodes connected by pointers — there is no underlying sorted array. The sorted order is a logical property: inorder traversal visits nodes in ascending order.' },
        { label: 'Inorder traversal of a BST visits nodes in ascending order', isCorrect: true },
        { label: 'The smallest node is always the leftmost leaf', isCorrect: false, feedback: 'The smallest node is reached by following left pointers to the end, but it is not necessarily a leaf — it may have a right child. The broader insight is that inorder traversal produces the full sorted sequence, not just the minimum.' },
        { label: 'Level-order traversal gives sorted values', isCorrect: false, feedback: 'Level-order (BFS) gives values level by level, not sorted. In the example, level-order of [3,1,4,null,2] is [3,1,4,2] — not sorted. Only inorder traversal (left, root, right) is guaranteed sorted for a BST.' },
      ],
      correctFeedback: 'BST inorder traversal visits left subtree, then root, then right subtree — producing values in ascending order. The kth value in that sequence is the kth smallest.',
      wrongFeedback: [
        'In a BST, all nodes in the left subtree are smaller than the root, and all right subtree nodes are larger. What traversal order processes left before root before right?',
        'Inorder = left, root, right. On a BST this always produces a sorted sequence. The kth element visited is the kth smallest.',
      ],
    },
    {
      id: 'early-exit',
      question: '1 ≤ k ≤ n. Should your traversal visit all n nodes to find the kth smallest?',
      options: [
        { label: 'Yes — collect all values, sort, return index k-1', isCorrect: false, feedback: 'A BST already gives you sorted order via inorder traversal — sorting collected values throws away that free ordering. Collecting all n values is also O(n) space when you only need to count k steps.' },
        { label: 'No — stop as soon as you have visited k nodes inorder', isCorrect: true },
        { label: 'Yes — you must verify no smaller node exists elsewhere', isCorrect: false, feedback: 'The BST property guarantees inorder order. Once you have counted k nodes inorder, the kth one is definitively the kth smallest — no verification needed.' },
        { label: 'Only if k > n/2; otherwise scan from the largest', isCorrect: false, feedback: 'BST traversal naturally produces ascending order — there is no analogous descending traversal built in. For large k you could descend in reverse inorder (right, root, left) to count from the largest, but the standard approach simply stops at k.' },
      ],
      correctFeedback: 'Increment a counter on each inorder visit. When counter == k, you have found the answer — stop recursing. This saves work when k is small: k=1 requires visiting only the leftmost path.',
      wrongFeedback: [
        'If k=1, the answer is the very first node visited inorder (the minimum). Do you need to visit all n nodes after finding it?',
        'Once you count the kth inorder node, you are done. Use a counter and return early — no need to traverse the rest of the tree.',
      ],
    },
    {
      id: 'constraint-size',
      question: 'n ≤ 10⁴ and k ≤ n. What is the worst-case complexity of an inorder traversal approach?',
      options: [
        { label: 'O(k) — you stop after k nodes', isCorrect: false, feedback: 'O(k) is the average case when k is small, but the worst case is k=n — you must visit all n nodes. The early exit helps in practice but the worst case is still O(n).' },
        { label: 'O(n) — you may visit all nodes when k = n', isCorrect: true },
        { label: 'O(n log n) — the BST adds a log factor', isCorrect: false, feedback: 'Inorder traversal is O(n) — each node is visited exactly once regardless of tree shape. There is no log factor for a traversal; O(log n) applies to search operations that skip subtrees.' },
        { label: 'O(log n) — BST search narrows the range', isCorrect: false, feedback: 'O(log n) applies when the BST property lets you discard half the tree at each step (like search or insert). To find the kth smallest, you may need to traverse most of the tree — the kth node could be anywhere along the inorder path.' },
      ],
      correctFeedback: 'Worst case: k=n, so you visit all 10⁴ nodes. Average case with small k: O(k + height). Either way, O(n) is the correct worst-case bound for this approach.',
      wrongFeedback: [
        'If k equals the total number of nodes, your traversal must visit every node before finding the answer. What complexity does that imply?',
        'Visiting all n nodes is O(n). The early-exit optimization helps when k is small, but the worst case remains O(n).',
      ],
    },
    {
      id: 'stack-vs-recursion',
      question: 'An iterative inorder traversal uses an explicit stack. What is the space complexity of either approach?',
      options: [
        { label: 'O(1) — tree pointers are already there', isCorrect: false, feedback: 'An inorder traversal must remember which nodes to come back to after visiting a left subtree. That backtracking requires O(h) memory — either in the call stack (recursive) or an explicit stack (iterative).' },
        { label: 'O(h) where h is the tree height', isCorrect: true },
        { label: 'O(n) — you store all node values', isCorrect: false, feedback: 'You do not need to store all values — just the path from root to the current node. That path has length h. Collecting all n values is an approach, but an optimized traversal uses O(h) space.' },
        { label: 'O(k) — you store k results before returning', isCorrect: false, feedback: 'You only need to track one count, not k values. The stack depth at any point during traversal is the current depth in the tree — O(h), not O(k).' },
      ],
      correctFeedback: 'Both recursive and iterative inorder use O(h) space — the call stack or explicit stack grows to the height of the tree. For a balanced tree with 10⁴ nodes, h ≈ log₂(10,000) ≈ 14 levels.',
      wrongFeedback: [
        'During inorder traversal, how deep can the call stack (or explicit stack) grow? What determines that depth?',
        'The stack holds the path from the root to the current node — at most h entries where h is the tree height. Balanced: O(log n); worst case (skewed tree): O(n).',
      ],
    },
  ],
}
