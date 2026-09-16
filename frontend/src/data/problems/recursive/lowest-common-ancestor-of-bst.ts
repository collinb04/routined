export default {
  id: 'lowest-common-ancestor-of-bst',
  title: 'Lowest Common Ancestor of a BST',
  difficulty: 'medium',
  description: `<p>Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST. The LCA is defined as the lowest node in the tree that has both nodes as descendants (a node can be a descendant of itself).</p>`,
  examples: [
    { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6' },
    { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2' },
  ],
  constraints: ['The number of nodes is in [2, 10^5]', '-10^9 <= Node.val <= 10^9', 'All Node.val are unique'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def lowest_common_ancestor(self, root, p, q):
        pass`,
  functionName: 'lca_bst_run',
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
def _find(root, val):
  while root:
      if root.val == val: return root
      elif val < root.val: root = root.left
      else: root = root.right
def lca_bst_run(arr, p, q):
  root = _build(arr)
  result = Solution().lowest_common_ancestor(root, _find(root,p), _find(root,q))
  return result.val`,
  testCases: [
    { label: 'p=2,q=8', args: [[6,2,8,0,4,7,9,null,null,3,5], 2, 8], expected: 6 },
    { label: 'p=2,q=4', args: [[6,2,8,0,4,7,9,null,null,3,5], 2, 4], expected: 2 },
  ],
  bruteHint: 'The brute-force approach ignores the BST ordering and treats the tree as a generic binary tree: build the full root-to-node path for p with a general traversal, build the full root-to-node path for q the same way, then compare the two paths for their last shared node. That takes O(n) time to build both paths and O(n) space to store them, even though BST ordering could tell you which way to go at every step without exploring both subtrees. What property of a BST lets you decide, at each node, which single subtree must contain the LCA?',
  optimizeComplexity: { time: 'O(h)', space: 'O(1)' },
  clues: [
    {
      id: 'bst-ordering-signal',
      highlight: { location: 'description', text: 'binary search tree (BST)' },
      question: 'Recognizing the specific structure you are given reveals which shortcuts become available. This is a BST, not a generic binary tree. What property does that give you for finding the LCA?',
      options: [
        { label: 'Left children are always larger than the root', isCorrect: false, feedback: 'In a BST, left children are smaller, not larger, than the parent. The ordering is: left subtree < node < right subtree.' },
        { label: 'Navigate by comparing node value to p and q', isCorrect: true },
        { label: 'The LCA is always the root', isCorrect: false, feedback: 'The LCA is only the root when p and q fall on opposite sides of it. Example 2 shows p=2 is the LCA because q=4 is in 2\'s subtree — no need to go to the root.' },
        { label: 'You must still visit every node', isCorrect: false, feedback: 'The BST ordering lets you prune entire subtrees. If both p and q are smaller than the current node, you know to go left — no right subtree visit needed.' },
      ],
      correctFeedback: 'In a BST, if both p and q are less than the current node, the LCA is in the left subtree. If both are greater, go right. The first node where they split is the LCA — no exhaustive search needed.',
      wrongFeedback: [
        'In a BST, values are ordered: left < node < right. If both p and q are smaller than the current node, which subtree must their LCA be in?',
        'The split point — where p goes left and q goes right, or vice versa — is the LCA. You can navigate directly without exploring both subtrees.',
      ],
    },
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: 'The number of nodes is in [2, 10^5]' },
      question: 'Constraints define the performance ceiling your solution must respect, though structural properties can lower it further. Up to 10⁵ nodes, but the tree is a BST. What does BST ordering do to the complexity of finding the LCA?',
      options: [
        { label: 'Still requires O(n) — ordering does not help', isCorrect: false, feedback: 'BST ordering lets you eliminate half the remaining tree at each step, giving O(h) where h is the tree height. In a balanced BST of 10⁵ nodes, h ≈ 17 — far better than visiting all 100,000 nodes.' },
        { label: 'O(h) where h is tree height — not O(n)', isCorrect: true },
        { label: 'O(log n) guaranteed regardless of tree shape', isCorrect: false, feedback: 'O(log n) is only guaranteed for a balanced BST. An unbalanced BST can degenerate into a linked list (h = n), making it O(n). The constraint does not specify that the tree is balanced.' },
        { label: 'O(1) because you compare values directly', isCorrect: false, feedback: 'Each comparison tells you which subtree to enter, but you still need to traverse from root to the LCA — that is O(h) steps, not O(1).' },
      ],
      correctFeedback: 'BST ordering lets you navigate directly toward the LCA in O(h) time. For a balanced BST with 10⁵ nodes, h ≈ log₂(100,000) ≈ 17 — a single root-to-LCA path, no backtracking.',
      wrongFeedback: [
        'At each node in a BST, you can decide which subtree to enter without checking the other. How many decisions do you need to make to reach the LCA?',
        'You travel from root to the LCA, making one left/right decision per level. That is O(h) — the height of the tree, not the total number of nodes.',
      ],
    },
    {
      id: 'split-point-signal',
      highlight: { location: 'description', text: 'the lowest node in the tree that has both nodes as descendants' },
      question: 'The way a problem defines its answer often tells you exactly what condition to check for. The LCA is the "lowest" (deepest) ancestor of both nodes. In BST terms, what identifies that node?',
      options: [
        { label: 'The first node where one of p or q is found', isCorrect: false, feedback: 'Finding p or q is not the split criterion. Example 2: you find p=2 before you encounter q=4, but 2 is still the LCA because 4 is in 2\'s subtree. The split point is the key, not the first match.' },
        { label: 'The first node where p and q go to different subtrees', isCorrect: true },
        { label: 'The node whose value is between p and q', isCorrect: false, feedback: 'A value between p and q is a necessary but not sufficient condition. The LCA must also be the deepest such node — meaning you navigate as far down as you can before the paths split.' },
        { label: 'The deepest node in the tree', isCorrect: false, feedback: 'The deepest node is a leaf — not the LCA unless one of p or q is that leaf. The LCA is the deepest node that is an ancestor of both, which depends on where p and q are, not how deep the tree goes.' },
      ],
      correctFeedback: 'Walk down the BST: as long as both p.val and q.val are on the same side of the current node, keep going. The moment they diverge — or one equals the current node — you have found the LCA.',
      wrongFeedback: [
        'Follow both p and q down the tree. When do their paths first diverge?',
        'If p.val < node.val and q.val > node.val, then p goes left and q goes right — they split here. That node is the LCA.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def lowest_common_ancestor(self, root, p, q):
        node = root
        while node:
            if p.val < node.val and q.val < node.val:
                node = node.left
            elif p.val > node.val and q.val > node.val:
                node = node.right
            else:
                return node`,
  solutionComplexity: { time: 'O(h)', space: 'O(1)' },
  solutionCaveat: 'The loop\'s final <code>else</code> branch fires both when <code>p</code> and <code>q</code> are on opposite sides of <code>node</code> <code>and</code> when <code>node</code> itself equals <code>p</code> or <code>q</code> — both cases correctly return the current node, since "a node can be a descendant of itself" means the LCA is exactly the current node either way.',
  solutionExplanation: 'BST ordering makes the search self-directing: if both targets are smaller than the current node, their LCA must be in the left subtree entirely, and symmetrically for the right — so an iterative walk moves directly toward the LCA in O(h) time, no exploration of the other subtree ever needed. The walk stops the instant the two targets no longer agree on a single direction, which is precisely the deepest node that still has both as descendants.',
}
