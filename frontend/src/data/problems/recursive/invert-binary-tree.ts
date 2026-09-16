export default {
  id: 'invert-binary-tree',
  title: 'Invert Binary Tree',
  difficulty: 'easy',
  description: `<p>Given the root of a binary tree, invert the tree (mirror it), and return its root.</p>`,
  examples: [
    { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
    { input: 'root = [2,1,3]', output: '[2,3,1]' },
  ],
  constraints: ['The number of nodes is in [0, 100]', '-100 <= Node.val <= 100'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def invert_tree(self, root):
        pass`,
  functionName: 'invert_tree_run',
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
def invert_tree_run(arr):
  return _level(Solution().invert_tree(_build(arr)))`,
  testCases: [
    { label: '[4,2,7,1,3,6,9]', args: [[4,2,7,1,3,6,9]], expected: [4,7,2,9,6,3,1] },
    { label: '[2,1,3]', args: [[2,1,3]], expected: [2,3,1] },
  ],
  bruteHint: 'One brute-force approach collects every node\'s value into a separate structure — say, a list or a fresh set of nodes — and then reconstructs an entirely new mirrored tree from that structure, rather than modifying the nodes you were given. This still visits every node exactly once, so it costs O(n) time, but it also allocates O(n) extra space for the new tree on top of the recursion stack. Do you actually need to build a second tree, or could you rearrange the pointers already sitting in the one you have?',
  optimizeComplexity: { time: 'O(n)', space: 'O(h)' },
  clues: [
    {
      id: 'what-invert-means',
      question: 'Worked examples often show you the exact transformation you need to reproduce, if you compare input and output structurally rather than just numerically. Input [4,2,7,1,3,6,9] produces [4,7,2,9,6,3,1]. At every node, what operation produces this mirror?',
      options: [
        { label: 'Swap the values of left and right children', isCorrect: false, feedback: 'Swapping values without swapping subtrees would change the root-level numbers but leave the subtree structures unreflected. [4,7,2,...] is correct at the root, but the full subtrees of 2 and 7 also need to be swapped — not just their values.' },
        { label: 'Swap the left and right child pointers', isCorrect: true },
        { label: 'Reverse the level-order sequence', isCorrect: false, feedback: 'Reversing level-order gives [9,6,3,1,7,2,4] — the whole array backwards. Inversion mirrors at every node independently, not just at the outermost level.' },
        { label: 'Sort children in descending order at each node', isCorrect: false, feedback: 'Sorting by value would produce a different tree that depends on node values, not a structural mirror. Inversion is purely a pointer swap — values never move, only the left/right links change.' },
      ],
      correctFeedback: 'At every node: node.left, node.right = node.right, node.left. Then recurse into both children. Values stay in place; the left/right pointers are mirrored at every level.',
      wrongFeedback: [
        'In the output, node 4\'s children changed from (2,7) to (7,2). Then 7\'s children changed from (6,9) to (9,6). What operation at each node produces this?',
        'Swap the child pointers at every node. The recursive calls ensure this happens at every level of the tree, not just the root.',
      ],
      highlight: { location: 'description', text: 'invert the tree (mirror it)' },
    },
    {
      id: 'null-base-case',
      question: 'Constraints that permit an empty or minimal input are a signal for exactly which edge case your base case must handle. The constraint allows 0 nodes (empty tree). What base case does your recursion need?',
      options: [
        { label: 'if root.left is None and root.right is None: return root', isCorrect: false, feedback: 'This stops recursion only at leaf nodes, but null nodes (children of leaves) are what actually terminate the recursion. A null child still gets passed to the recursive call — you need to catch None, not just leaves.' },
        { label: 'if root is None: return None', isCorrect: true },
        { label: 'if len(tree) == 0: return []', isCorrect: false, feedback: 'There is no "len" of a tree node in a recursive approach. The base case is a null pointer check on the current node, not a length check on the whole tree.' },
        { label: 'No base case needed — Python handles None automatically', isCorrect: false, feedback: 'Accessing root.left on a None node raises AttributeError. You must explicitly return before dereferencing a null node.' },
      ],
      correctFeedback: 'Return None immediately when root is None. Every recursive call can pass a null child — this check prevents AttributeError and correctly returns None for the parent to link to.',
      wrongFeedback: [
        'When you recurse into node.left, what happens if node.left is None? What must you check before accessing root.left or root.right?',
        'if root is None: return None is the guard. Without it, the first null child causes an AttributeError when you try root.left on None.',
      ],
      highlight: { location: 'constraint', text: 'The number of nodes is in [0, 100]' },
    },
    {
      id: 'return-root',
      question: 'The exact contract a function promises to return tells you what every code path — including the empty-input path — must produce. The function returns the root. Why is this necessary?',
      options: [
        { label: 'To allow the caller to chain calls', isCorrect: false, feedback: 'Method chaining is a style concern, not the reason. The structural reason is that if the input is an empty tree (None), the caller needs to receive None — without a return value there is no way to communicate that.' },
        { label: 'So the caller can access the (possibly null) result', isCorrect: true },
        { label: 'Because in-place modification does not work on trees', isCorrect: false, feedback: 'In-place modification does work — you are modifying the original nodes. But the root pointer itself does not change. The return exists to handle the empty-tree case and to make the recursive structure work cleanly.' },
        { label: 'To enable iterative rather than recursive solutions', isCorrect: false, feedback: 'Both iterative and recursive solutions return the root for the same reason: the caller needs a reference to the (possibly unchanged) root node.' },
      ],
      correctFeedback: 'With up to 100 nodes, the root itself is never replaced — but returning root is the correct contract. When root is None, returning None tells the caller the result is an empty tree.',
      wrongFeedback: [
        'What does the caller of invert_tree need to do with the result? What if the input tree is empty?',
        'The function must return the root so the caller can assign and use the result. For an empty tree (root=None), the return value is None — the caller has no other way to receive it.',
      ],
      highlight: { location: 'description', text: 'return its root' },
    },
    {
      id: 'traversal-order',
      question: 'Not every implementation choice affects correctness — recognizing which parts of an algorithm are flexible versus fixed keeps you from over-constraining your solution. Does the order in which you recurse — preorder (swap then recurse) vs. postorder (recurse then swap) — affect correctness?',
      options: [
        { label: 'Yes — you must swap before recursing (preorder only)', isCorrect: false, feedback: 'Swapping after recursing (postorder) works equally well. The children are swapped at each node regardless of when during the visit — the final tree is the same either way.' },
        { label: 'No — both preorder and postorder produce the same result', isCorrect: true },
        { label: 'Yes — you must swap after recursing (postorder only)', isCorrect: false, feedback: 'Swapping before recursing (preorder) also works. The recursive calls invert the subtrees independently, and swapping the pointers at the current node is valid at any point in the visit.' },
        { label: 'Only inorder traversal produces a valid mirror', isCorrect: false, feedback: 'Inorder visits left child, then root, then right child. Swapping mid-traversal in inorder would recurse into the original left, swap pointers, then recurse into the original left again (now in the right slot) — incorrect. Pre- or postorder both work cleanly.' },
      ],
      correctFeedback: 'Swapping pointers before or after the recursive calls both produce a correct mirror. What matters is that every node gets its children swapped exactly once.',
      wrongFeedback: [
        'If you swap left and right at the root first, then recurse — do the subtrees still get inverted correctly? What if you recurse first and swap after?',
        'Either order works because each subtree is fully inverted by its own recursive call, independently of when the parent swaps its pointers.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def invert_tree(self, root):
        if not root:
            return None
        root.left, root.right = self.invert_tree(root.right), self.invert_tree(root.left)
        return root`,
  solutionComplexity: { time: 'O(n)', space: 'O(h)' },
  solutionCaveat: 'The tuple assignment <code>root.left, root.right = invert_tree(root.right), invert_tree(root.left)</code> both recurses <code>and</code> swaps in a single expression — Python evaluates the right-hand side completely (inverting both subtrees) before assigning either pointer, so there\'s no risk of assigning a half-inverted subtree to the wrong side.',
  solutionExplanation: 'Inverting a tree is nothing more than swapping the left and right child pointers at every single node — values themselves never move — so a recursive call that inverts each subtree and then (or first — order doesn\'t matter, since each side is handled independently) swaps the two pointers at the current node mirrors the whole tree one level at a time. The base case of returning <code>None</code> immediately for an empty subtree is what lets every recursive call safely dereference <code>.left</code> and <code>.right</code> without ever hitting a null-pointer error, and it\'s also the correct answer for the empty-tree input itself.',
}
