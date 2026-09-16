export default {
  id: 'diameter-of-binary-tree',
  title: 'Diameter of Binary Tree',
  difficulty: 'easy',
  description: `<p>Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes. This path may or may not pass through the root.</p>`,
  examples: [
    { input: 'root = [1,2,3,4,5]', output: '3 (path: 4→2→1→3)' },
    { input: 'root = [1,2]', output: '1' },
  ],
  constraints: ['The number of nodes is in [1, 10^4]', '-100 <= Node.val <= 100'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def diameter_of_binary_tree(self, root):
        pass`,
  functionName: 'diameter_of_binary_tree_run',
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
def diameter_of_binary_tree_run(arr):
  return Solution().diameter_of_binary_tree(_build(arr))`,
  testCases: [
    { label: '[1,2,3,4,5]', args: [[1,2,3,4,5]], expected: 3 },
    { label: '[1,2]', args: [[1,2]], expected: 1 },
  ],
  bruteHint: 'One brute-force approach computes the depth of a node by recursing into its left and right subtrees from scratch, then repeats this same depth computation independently at every node while tracking the best left-depth-plus-right-depth sum seen. Because each node triggers a fresh traversal of its own subtree, the total work multiplies to roughly O(n²) in the worst case for a skewed tree. What would let you compute every node\'s depth exactly once while still checking the diameter at each node?',
  optimizeComplexity: { time: 'O(n)', space: 'O(h)' },
  clues: [
    {
      id: 'path-not-through-root',
      question: 'When a description explicitly widens where an answer could live, it is warning you that checking a single fixed location will not be enough. "This path may or may not pass through the root." What does this tell you about where to look for the diameter?',
      highlight: { location: 'description', text: 'This path may or may not pass through the root.' },
      options: [
        { label: 'Compute left depth + right depth at the root only', isCorrect: false, feedback: 'The example shows path 4→2→1→3 which does pass through root 1, but the problem warns you the diameter might not. Computing only at the root misses paths entirely within a subtree.' },
        { label: 'The diameter must be checked at every node', isCorrect: true },
        { label: 'Only leaf-to-leaf paths matter', isCorrect: false, feedback: 'The diameter is the longest path between any two nodes — not exclusively leaves. Any node can be an endpoint, and the path can turn at any internal node.' },
        { label: 'The root is never part of the diameter', isCorrect: false, feedback: 'The problem says the path "may or may not" pass through the root — not that it never does. The example path 4→2→1→3 passes through root 1.' },
      ],
      correctFeedback: 'At every node, the longest path through that node is left_depth + right_depth. You track the maximum of these values across all nodes — not just the root.',
      wrongFeedback: [
        'If the diameter could be entirely within the left subtree, how do you find it without checking the root?',
        'You need to evaluate "left_depth + right_depth" at every node and keep a running maximum. The answer might come from any level of the tree.',
      ],
    },
    {
      id: 'diameter-as-depth-sum',
      question: 'Turning a concrete worked example into a general formula is often what reveals exactly what a recursive function needs to compute. The path 4→2→1→3 has length 3. How is that length expressed in terms of subtree depths?',
      highlight: { location: 'description', text: 'the length of the longest path between any two nodes' },
      options: [
        { label: 'Max depth of the tree minus 1', isCorrect: false, feedback: 'Max depth only measures one arm from the root. The diameter through node 1 uses both arms: left depth (2, going through nodes 2 and 4) plus right depth (1, going through node 3).' },
        { label: 'Number of nodes on the path', isCorrect: false, feedback: 'The length is measured in edges, not nodes. Path 4→2→1→3 has 4 nodes but length 3 (three edges). Counting nodes would overcount by 1.' },
        { label: 'Left depth + right depth at the turning node', isCorrect: true },
        { label: 'Height of left subtree × height of right subtree', isCorrect: false, feedback: 'Multiplying heights has no geometric meaning for path length. The diameter through a node is the sum of the depths of its two arms, not their product.' },
      ],
      correctFeedback: 'At node 1: left depth is 2 (path 1→2→4), right depth is 1 (path 1→3). Sum = 3 = diameter. Every node is a candidate turning point; you want the maximum such sum.',
      wrongFeedback: [
        'A path that "turns" at a node goes as far left and as far right as it can. How many edges does each arm contribute?',
        'The left arm contributes left_depth edges and the right arm contributes right_depth edges. The path length through that node is their sum.',
      ],
    },
    {
      id: 'recursive-depth-and-diameter',
      question: 'Deciding what a recursive call hands back to its caller determines whether a traversal repeats work or covers the whole tree in a single pass. To check the diameter at every node efficiently, what computation should each recursive call return?',
      options: [
        { label: 'The diameter found so far in the subtree', isCorrect: false, feedback: 'Returning the diameter from a subtree doesn\'t give the parent enough information to compute the diameter through the parent. The parent needs each child\'s depth, not a pre-computed diameter.' },
        { label: 'The depth of the subtree', isCorrect: true },
        { label: 'The number of nodes in the subtree', isCorrect: false, feedback: 'Node count doesn\'t tell you how deep the subtree goes, and depth is what you need to compute left_depth + right_depth at each node.' },
        { label: 'Both depth and diameter as a tuple', isCorrect: false, feedback: 'Passing the diameter up through return values works but is unnecessary. A single nonlocal or instance variable tracks the running maximum; each call only needs to return depth.' },
      ],
      correctFeedback: 'Each call returns the depth of its subtree. Before returning, it updates a global maximum with left_depth + right_depth. This gives you O(n) — one pass, every node visited once.',
      wrongFeedback: [
        'The parent node needs both children\'s depths to compute the diameter candidate through itself. What is the simplest value each recursive call can return to enable that?',
        'Return depth; update a maximum variable with left + right before returning. The maximum variable accumulates the answer across all nodes.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def diameter_of_binary_tree(self, root):
        best = 0

        def depth(node):
            nonlocal best
            if not node:
                return 0
            left = depth(node.left)
            right = depth(node.right)
            best = max(best, left + right)
            return 1 + max(left, right)

        depth(root)
        return best`,
  solutionComplexity: { time: 'O(n)', space: 'O(h)' },
  solutionCaveat: '<code>depth</code> returns <code>1 + max(left, right)</code> to its caller — only the taller of the two arms — while <code>best</code> is updated separately with <code>left + right</code>, the sum of <code>both</code> arms; a node\'s own depth going upward can only follow one branch, but a diameter passing through that node uses both.',
  solutionExplanation: 'Every node is a candidate "turning point" for the longest path, and the length of the longest path through a given node is exactly its left subtree\'s depth plus its right subtree\'s depth — so computing subtree depth bottom-up while updating a running maximum at every node checks every possible turning point in a single traversal, rather than requiring the O(n) work of computing depth from scratch at each of the n nodes independently. Because <code>best</code> lives outside the recursive return value, it can be updated at every node regardless of what gets passed back up to that node\'s own parent.',
}
