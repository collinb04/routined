export default {
  id: 'trim-binary-search-tree',
  title: 'Trim a Binary Search Tree',
  difficulty: 'medium',
  description: 'Given the root of a BST and bounds [low, high], trim the tree so that all values are in the range [low, high]. Return the root of the trimmed tree.',
  examples: [
    { input: 'root=[1,0,2], low=1, high=2', output: '[1,null,2]' },
    { input: 'root=[3,0,4,null,2,null,null,1], low=1, high=3', output: '[3,2,null,1]' },
  ],
  constraints: ['1 ≤ number of nodes ≤ 10⁴', '0 ≤ Node.val ≤ 10⁴', '0 ≤ low ≤ high ≤ 10⁴'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def trim_bst(self, root, low, high):
        pass`,
  functionName: 'trim_bst_run',
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
def _level(root):
  if not root: return []
  q = deque([root]); res = []
  while q:
      node = q.popleft()
      if node: res.append(node.val); q.append(node.left); q.append(node.right)
      else: res.append(None)
  while res and res[-1] is None: res.pop()
  return res
def trim_bst_run(arr, low, high):
  return _level(Solution().trim_bst(_build(arr), low, high))`,
  testCases: [
    { label: 'Simple trim', args: [[1,0,2],1,2], expected: [1,null,2] },
    { label: 'Multi-level trim', args: [[3,0,4,null,2,null,null,1],1,3], expected: [3,2,null,1] },
  ],
  bruteHint: 'The brute-force approach traverses the entire original tree, collects every value that falls within [low, high] into a list, and then inserts each of those values one by one into a brand-new BST built from scratch. Building the traversal list takes O(n) time, but inserting up to n values into a fresh BST can take O(n) time per insertion in the worst case, giving O(n²) time overall and O(n) space for the collected values and new tree. Why might this be wasteful compared to modifying the existing structure in place?',
  optimizeComplexity: { time: 'O(n)', space: 'O(h)' },
  clues: [
    {
      id: 'bst-property',
      highlight: { location: 'description', text: 'a BST' },
      question: 'Noticing an explicit structural guarantee, such as the ordering invariant of a binary search tree, often tells you which subtree can be skipped entirely without inspecting it. This is a BST, so all left-subtree values are less than the node and all right-subtree values are greater. When a node\'s value is below low, what can you infer?',
      options: [
        { label: 'Discard the entire subtree rooted here', isCorrect: false, feedback: 'The node is too small, but its right subtree could contain values within [low, high]. Discarding the whole subtree throws away valid nodes.' },
        { label: 'Discard this node and its entire left subtree; recurse into right', isCorrect: true },
        { label: 'Keep this node and trim both children', isCorrect: false, feedback: 'If the node\'s value is below low, it must be removed. Keeping it would violate the trimming requirement.' },
        { label: 'Recurse into the left subtree to find valid nodes', isCorrect: false, feedback: 'All left-subtree values are smaller than the current node — if the current node is already below low, every left descendant is also below low. There are no valid nodes to the left.' },
      ],
      correctFeedback: 'In a BST, everything to the left is smaller. If node.val < low, the left subtree is entirely below range. You trim it entirely and return trim(root.right, low, high), which may contain in-range values.',
      wrongFeedback: [
        'If node.val < low, the BST property tells you something definitive about the entire left subtree. What is it?',
        'All left children are smaller than the current node. If the current node is already below low, can any left descendant be in range?',
      ],
    },
    {
      id: 'above-high-inference',
      highlight: { location: 'constraint', text: '0 ≤ low ≤ high ≤ 10⁴' },
      question: 'The same ordering guarantee applies in the opposite direction, so recognizing it once lets you reason about both the low and high bounds symmetrically. When a node\'s value is above high in a BST, which subtree might still contain valid nodes?',
      options: [
        { label: 'The right subtree', isCorrect: false, feedback: 'All right-subtree values are greater than the current node. If the node is already above high, all right descendants are also above high — nothing useful to the right.' },
        { label: 'The left subtree', isCorrect: true },
        { label: 'Both subtrees', isCorrect: false, feedback: 'The right subtree is entirely above the current node\'s value, which is already above high — no valid nodes there. Only the left subtree could contain in-range values.' },
        { label: 'Neither subtree', isCorrect: false, feedback: 'The left subtree contains values smaller than the current node. Even though the current node exceeds high, its left descendants could be within [low, high].' },
      ],
      correctFeedback: 'When node.val > high, the right subtree is entirely out of range (BST guarantees everything right is larger). The left subtree may still have in-range values, so return trim(root.left, low, high).',
      wrongFeedback: [
        'The BST guarantees right children are larger. If the current node is already above high, what does that mean for every right descendant?',
        'Think about which direction in a BST holds smaller values. If node.val > high, that direction is the only one that could be in range.',
      ],
    },
    {
      id: 'in-range-node',
      highlight: { location: 'description', text: 'trim the tree so that all values are in the range [low, high]' },
      question: 'Confirming that a node satisfies the given range tells you how much work remains below it, since membership alone does not guarantee its descendants are valid too. When a node\'s value is within [low, high], what must you do with its children?',
      options: [
        { label: 'Keep both children unchanged', isCorrect: false, feedback: 'Children may themselves be out of range. Keeping them unchanged would leave invalid nodes in the tree.' },
        { label: 'Trim both children recursively', isCorrect: true },
        { label: 'Keep the node and delete both children', isCorrect: false, feedback: 'Deleting all children would discard every in-range node below this one. You need to keep the valid parts of both subtrees.' },
        { label: 'Keep only the child in the direction of the range midpoint', isCorrect: false, feedback: 'BSTs are trimmed by value bounds, not by directional heuristics. Both children must be recursively trimmed — each side can contain in-range or out-of-range nodes independently.' },
      ],
      correctFeedback: 'If node.val is in [low, high], keep the node and set node.left = trim(node.left, low, high) and node.right = trim(node.right, low, high). Both subtrees may have nodes to prune.',
      wrongFeedback: [
        'The current node is valid, but its subtrees may contain out-of-range values. What should you do with them?',
        'An in-range node survives, but its children are independent — each needs the same trimming logic applied recursively.',
      ],
    },
    {
      id: 'return-value',
      highlight: { location: 'description', text: 'Return the root of the trimmed tree.' },
      question: 'Return values in a recursive tree function are the mechanism that reconnects a modified structure back to its caller, so tracking what gets returned matters as much as what gets discarded. The function returns the root of the trimmed tree. What does this mean for how you connect trimmed subtrees?',
      options: [
        { label: 'Modify the original tree in place without returning', isCorrect: false, feedback: 'The signature explicitly returns a node. In-place modification without returning would break the recursive wiring — the caller uses the return value to reconnect subtrees.' },
        { label: 'Return the new root after reconnecting trimmed children', isCorrect: true },
        { label: 'Collect trimmed nodes in a list, then rebuild', isCorrect: false, feedback: 'Collecting and rebuilding is unnecessary extra work. The recursive structure naturally rewires the tree: each call returns its new root, which the parent assigns as its left or right child.' },
        { label: 'Return the low bound as the new root', isCorrect: false, feedback: 'The new root is whatever in-range node ends up at the top after trimming — not the low bound value.' },
      ],
      correctFeedback: 'The return value is what makes the recursion wire itself together. When you discard a node, you return its surviving child. The parent assigns that return value as its new left or right pointer.',
      wrongFeedback: [
        'When you remove a node, what replaces it in the parent\'s pointer? How does the parent learn which node to point to next?',
        'Each recursive call returns the root of its trimmed subtree. The caller assigns that return value — that is how the tree reconnects after removals.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def trim_bst(self, root, low, high):
        if not root:
            return None
        if root.val < low:
            return self.trim_bst(root.right, low, high)
        if root.val > high:
            return self.trim_bst(root.left, low, high)
        root.left = self.trim_bst(root.left, low, high)
        root.right = self.trim_bst(root.right, low, high)
        return root`,
  solutionComplexity: { time: 'O(n)', space: 'O(h)' },
  solutionCaveat: 'When a node falls below <code>low</code>, its entire left subtree is discarded <code>without being recursed into at all</code> — the BST property guarantees every value there is even smaller, so the function jumps straight to trimming the right subtree instead of wastefully visiting nodes already known to be invalid.',
  solutionExplanation: 'The BST ordering lets each node\'s value alone decide which direction still needs checking: a node below <code>low</code> can only possibly keep useful nodes in its right subtree (everything left is smaller still), and symmetrically a node above <code>high</code> can only keep useful nodes on its left — in both cases the recursive call on the surviving side\'s result is returned directly, replacing the discarded node. A node that already falls within range keeps its own position but still needs both subtrees independently trimmed, which is exactly why the return value of each recursive call must be reassigned to <code>root.left</code>/<code>root.right</code> — that reassignment is what reconnects the tree after any node above it gets removed.',
}
