export default {
  id: 'count-good-nodes-in-binary-tree',
  title: 'Count Good Nodes in Binary Tree',
  difficulty: 'medium',
  description: `<p>Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X. Return the number of good nodes in the binary tree.</p>`,
  examples: [
    { input: 'root = [3,1,4,3,null,1,5]', output: '4' },
    { input: 'root = [3,3,null,4,2]', output: '3' },
  ],
  constraints: ['The number of nodes is in [1, 10^5]', '-10^4 <= Node.val <= 10^4'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def good_nodes(self, root):
        pass`,
  functionName: 'good_nodes_run',
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
def good_nodes_run(arr):
  return Solution().good_nodes(_build(arr))`,
  testCases: [
    { label: '[3,1,4,3,null,1,5]', args: [[3,1,4,3,null,1,5]], expected: 4 },
    { label: '[3,3,null,4,2]', args: [[3,3,null,4,2]], expected: 3 },
  ],
  bruteHint: 'A brute-force approach would, for each node, walk back up through all of its ancestors to check whether any of them has a larger value - but binary tree nodes typically don\'t store parent pointers, so you\'d instead re-traverse from the root down to each node, re-checking every ancestor along the way. With up to 10⁵ nodes, and a root-to-node path that can itself be O(n) long, this repeated re-checking costs O(n²) in the worst case. What single piece of information could you carry down once, during a single pass, so you never have to re-examine an ancestor twice?',
  optimizeComplexity: { time: 'O(n)', space: 'O(h)' },
  clues: [
    {
      id: 'good-node-definition',
      highlight: { location: 'description', text: 'there are no nodes with a value greater than X' },
      question: 'A precise definition buried in the problem statement often tells you exactly which running value you need to track during traversal. "No nodes with a value greater than X on the path from root to X." What information must you carry down during traversal?',
      options: [
        { label: 'The sum of all values seen so far', isCorrect: false, feedback: 'The sum of path values tells you nothing about whether any individual value exceeded X. The definition requires knowing the single largest value seen — not the total.' },
        { label: 'The maximum value seen on the path so far', isCorrect: true },
        { label: 'The depth of the current node', isCorrect: false, feedback: 'Depth tracks how many levels you have descended, but not what values you passed. A node at depth 5 could have any mix of ancestors — depth alone cannot tell you whether any ancestor was larger than the current node.' },
        { label: 'The count of good nodes found so far', isCorrect: false, feedback: 'The running count is the output, not the input to the decision. To decide whether the current node is good, you need the maximum ancestor value, not how many good nodes you have already found.' },
      ],
      correctFeedback: 'At each node, compare node.val against the max seen on the path from root. If node.val >= max, it is good. Then pass max(node.val, current_max) down to children.',
      wrongFeedback: [
        'To decide whether node X is good, you need to know: was there any ancestor with a value larger than X? What single number captures that?',
        'The maximum value seen so far on the root-to-X path is the only thing you need. If node.val >= that max, the node qualifies.',
      ],
    },
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: 'The number of nodes is in [1, 10^5]' },
      question: 'Constraints on input size are a direct signal for the complexity class your solution needs to hit. The tree has up to 10⁵ nodes. What complexity does this require?',
      options: [
        { label: 'O(n²) — check all ancestors for each node', isCorrect: false, feedback: 'Re-checking all ancestors for each of the 10⁵ nodes is O(n²) — up to 10 billion comparisons. You can propagate the running maximum in O(1) per node instead.' },
        { label: 'O(n) — visit each node exactly once', isCorrect: true },
        { label: 'O(n log n) — sort nodes before traversal', isCorrect: false, feedback: 'Sorting nodes would destroy the parent-child structure you need to traverse. The path maximum can be tracked during a single DFS with no sorting.' },
        { label: 'O(log n) — use BST properties to skip subtrees', isCorrect: false, feedback: 'This is a general binary tree, not a BST. There is no ordering property that lets you skip subtrees — you must visit all 10⁵ nodes to count every good node.' },
      ],
      correctFeedback: 'A single DFS passes the running maximum down and processes each of the 10⁵ nodes exactly once — O(n) time, O(h) stack space where h is the tree height.',
      wrongFeedback: [
        'You need to visit every node to decide whether it is good. What is the minimum complexity for processing all 10⁵ nodes?',
        'One pass, one decision per node: O(n). Carry the path maximum as a parameter so you never re-examine ancestors.',
      ],
    },
    {
      id: 'root-is-always-good',
      question: 'Thinking through the edge case implied by a definition, like what happens at the very first step, often reveals the right initial state for your algorithm. The root is always a good node. Why, and what does that imply for your base case?',
      options: [
        { label: 'The root has the largest value in the tree', isCorrect: false, feedback: 'The root is not necessarily the largest node — the example root is 3 while node 5 is larger. The root is good because there are no ancestors at all, so the "no greater ancestor" condition is trivially satisfied.' },
        { label: 'There are no ancestors, so the condition is trivially met', isCorrect: true },
        { label: 'The root value is always positive', isCorrect: false, feedback: 'Node values range from -10⁴ to 10⁴, so the root can be negative. The root\'s goodness comes from having no ancestors, not from its sign.' },
        { label: 'You start counting from 1 to account for the root', isCorrect: false, feedback: 'Starting your count at 1 would be hardcoding an assumption. The correct approach is to start the traversal with max = -infinity (or the root value), so the root naturally passes the good-node check.' },
      ],
      correctFeedback: 'Start the traversal with current_max = -infinity (or -10⁴ - 1). The root always satisfies root.val >= -infinity, so it is correctly counted as good without any special case.',
      wrongFeedback: [
        'What is the "maximum ancestor value" when you are at the root? There are no ancestors.',
        'With no ancestors, the max-so-far is effectively -infinity. root.val >= -infinity is always true, so the root is always good.',
      ],
    },
    {
      id: 'output-type',
      highlight: { location: 'description', text: 'Return the number of good nodes in the binary tree' },
      question: 'The shape of the requested output, whether it\'s a count, a list, or a boolean, constrains what data structure you actually need to maintain while solving the problem. The output is a count, not a list of good nodes. What does this simplify?',
      options: [
        { label: 'You can return early once any good node is found', isCorrect: false, feedback: 'A count requires tallying every good node in the tree — you cannot stop at the first one. Early exit is only possible when the output is a boolean or a single value like a maximum.' },
        { label: 'You only need an integer accumulator, not a collection', isCorrect: true },
        { label: 'You do not need to traverse the whole tree', isCorrect: false, feedback: 'You must still visit all 10⁵ nodes — the count could include any of them. The simplification is that you accumulate a single integer rather than building a list of node references.' },
        { label: 'The order of traversal does not matter', isCorrect: false, feedback: 'Order of traversal is irrelevant to a count regardless of the output type. The output type simplifies storage: one integer instead of a growing list.' },
      ],
      correctFeedback: 'A single nonlocal integer (or return value sum) suffices. At each node, add 1 if node.val >= current_max, then recurse. No list building, no deduplication.',
      wrongFeedback: [
        'If the output were the list of good node values, you would need to collect and store them. What does a count need instead?',
        'A count is just an integer. Add 1 when a node qualifies; pass the sum up through return values or a shared variable.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def good_nodes(self, root):
        def dfs(node, max_so_far):
            if not node:
                return 0
            count = 1 if node.val >= max_so_far else 0
            new_max = max(max_so_far, node.val)
            return count + dfs(node.left, new_max) + dfs(node.right, new_max)

        return dfs(root, float('-inf'))`,
  solutionComplexity: { time: 'O(n)', space: 'O(h)' },
  solutionCaveat: 'The traversal starts with <code>max_so_far = -infinity</code>, not <code>0</code> or the root\'s own value — since node values can be negative, seeding with anything other than negative infinity could wrongly disqualify the root or an early negative-valued node from being counted as good.',
  solutionExplanation: 'Threading the running maximum of the root-to-current path as a parameter, rather than re-walking ancestors for every node, is what collapses what could be O(n) work per node into O(1) work per node: each call already knows the largest value seen on the path so far, so comparing the current node\'s value against it answers "is this node good" instantly, and passing <code>max(max_so_far, node.val)</code> down to both children keeps that running maximum correct for every deeper path.',
}
