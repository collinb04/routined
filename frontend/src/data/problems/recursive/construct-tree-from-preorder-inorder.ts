export default {
  id: 'construct-tree-from-preorder-inorder',
  title: 'Construct Tree from Preorder and Inorder',
  difficulty: 'medium',
  description: `<p>Given two integer arrays <code>preorder</code> and <code>inorder</code> where <code>preorder</code> is the preorder traversal of a binary tree and <code>inorder</code> is the inorder traversal of the same tree, construct and return the binary tree.</p>`,
  examples: [
    { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]' },
    { input: 'preorder = [-1], inorder = [-1]', output: '[-1]' },
  ],
  constraints: ['1 <= preorder.length <= 3000', 'inorder.length == preorder.length', 'All values are unique'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def build_tree(preorder, inorder):
  pass`,
  functionName: 'build_tree_run',
  conceptId: 'trees',
  runnerSetup: `from collections import deque
def _level(root):
  if not root: return []
  q = deque([root]); res = []
  while q:
      node = q.popleft()
      if node: res.append(node.val); q.append(node.left); q.append(node.right)
      else: res.append(None)
  while res and res[-1] is None: res.pop()
  return res
def build_tree_run(pre, ino):
  return _level(build_tree(pre, ino))`,
  testCases: [
    { label: 'classic', args: [[3,9,20,15,7],[9,3,15,20,7]], expected: [3,9,20,null,null,15,7] },
    { label: 'single', args: [[-1],[-1]], expected: [-1] },
  ],
  bruteHint: 'Describe scanning the inorder array for the root\'s value at every recursive call, and what that costs across all n nodes',
  optimizeHint: 'Name the data structure that gives you the root\'s split point in O(1) instead of scanning',
  clues: [
    {
      id: 'preorder-root-signal',
      question: 'preorder is "root, left, right." What does this tell you about preorder[0]?',
      options: [
        { label: 'preorder[0] is the leftmost leaf', isCorrect: false, feedback: 'Preorder visits the root first, before any children. preorder[0] is the root of the entire tree, not a leaf.' },
        { label: 'preorder[0] is always the root of the current subtree', isCorrect: true },
        { label: 'preorder[0] is the median value of the tree', isCorrect: false, feedback: 'Preorder order is structural (root before children), not sorted. preorder[0] is the root by definition of preorder traversal, regardless of its value.' },
        { label: 'preorder[0] is the root only if the tree is balanced', isCorrect: false, feedback: 'Preorder always visits the root first, regardless of whether the tree is balanced or skewed. Tree balance does not affect traversal order.' },
      ],
      correctFeedback: 'In preorder traversal, the root is always first. At every level of recursion, the first element of the current preorder slice is the root of that subtree.',
      wrongFeedback: [
        'Preorder means root → left → right. Which element comes first in that ordering?',
        'At each recursive step, you are reconstructing a subtree. The first element of that subtree\'s preorder slice is its root.',
      ],
    },
    {
      id: 'inorder-split-signal',
      question: 'inorder is "left, root, right." Once you know the root value, what does finding it in the inorder array tell you?',
      options: [
        { label: 'Nothing — inorder only confirms the root exists', isCorrect: false, feedback: 'The root\'s position in inorder is the key insight: everything to its left belongs to the left subtree, everything to its right to the right subtree. This splits the problem into two smaller subproblems.' },
        { label: 'How many nodes are in the left and right subtrees', isCorrect: true },
        { label: 'The depth of the root in the tree', isCorrect: false, feedback: 'Inorder position tells you about subtree sizes, not depth. Depth depends on how many ancestors the root has, which is tracked by the recursion level rather than inorder index.' },
        { label: 'The root\'s parent node', isCorrect: false, feedback: 'Inorder traversal carries no parent information — it only records the order of node visits. Subtree size (left/right split) is what the root\'s inorder index reveals.' },
      ],
      correctFeedback: 'If the root is at index i in inorder, then inorder[:i] belongs to the left subtree and inorder[i+1:] to the right. That also tells you how many elements to take from preorder for each subtree.',
      wrongFeedback: [
        'For preorder=[3,9,20,15,7] and inorder=[9,3,15,20,7]: root is 3, found at index 1 in inorder. How many nodes are in the left subtree? The right subtree?',
        'The number of nodes to the left of the root in inorder equals the size of the left subtree. Use that count to split preorder[1:] into left and right preorder slices.',
      ],
    },
    {
      id: 'unique-values-guarantee',
      question: '"All values are unique." Why is this constraint necessary for the reconstruction to work?',
      options: [
        { label: 'Duplicate values would make the tree unbalanced', isCorrect: false, feedback: 'Duplicates have no bearing on balance. The constraint is necessary because if a value appears twice, you cannot uniquely identify which occurrence in inorder corresponds to the current root.' },
        { label: 'Without uniqueness, you cannot unambiguously locate the root in inorder', isCorrect: true },
        { label: 'Unique values allow binary search in the inorder array', isCorrect: false, feedback: 'Binary search in inorder would only apply if inorder were sorted (i.e., a BST). In a general binary tree, inorder is not sorted. Uniqueness enables unambiguous root identification, not binary search.' },
        { label: 'Duplicates would require storing extra metadata per node', isCorrect: false, feedback: 'The uniqueness constraint is about algorithmic correctness, not metadata overhead. Without uniqueness, the root\'s position in inorder is ambiguous, making reconstruction impossible.' },
      ],
      correctFeedback: 'If a value appears multiple times in inorder, you cannot tell which occurrence marks the boundary between left and right subtrees. Uniqueness guarantees exactly one match, making the split unambiguous.',
      wrongFeedback: [
        'Suppose the root value is 5 and inorder is [3,5,5,7]. There are two 5s — which one is the root? How would you decide where to split?',
        'Unique values mean the root\'s value maps to exactly one index in inorder. That single index is the split point. Without uniqueness, the split is ambiguous.',
      ],
    },
    {
      id: 'lookup-optimization',
      question: 'With up to 3,000 nodes, scanning inorder for the root at every recursive call is O(n) per call. What optimization reduces overall complexity?',
      options: [
        { label: 'Sort the inorder array before searching', isCorrect: false, feedback: 'Sorting inorder would destroy the structural information it carries. Inorder must remain in its original order — sorting it removes the left/right split meaning.' },
        { label: 'Precompute a hash map from value to inorder index', isCorrect: true },
        { label: 'Use binary search on inorder', isCorrect: false, feedback: 'Binary search requires a sorted array. Inorder is only sorted for a BST — for a general binary tree it is not. Binary search on an unsorted array gives wrong results.' },
        { label: 'Process inorder right-to-left to avoid repeated scanning', isCorrect: false, feedback: 'Reversing traversal direction does not reduce the number of scans. You still search inorder O(n) times in the worst case. A hash map is the right optimization.' },
      ],
      correctFeedback: 'Build {value: index} for inorder before recursion. Each root lookup then takes O(1) instead of O(n), reducing overall complexity from O(n²) to O(n) across 3,000 nodes.',
      wrongFeedback: [
        'If every recursive call scans inorder to find the root, and there are n recursive calls, what is the total complexity? What data structure gives O(1) lookup?',
        'A hash map built once from inorder gives O(1) root-index lookup. With n = 3,000, that turns O(n²) = 9 million scans into O(n) = 3,000 lookups.',
      ],
    },
  ],
}
