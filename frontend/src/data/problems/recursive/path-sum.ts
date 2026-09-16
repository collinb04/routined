export default {
  id: 'path-sum',
  title: 'Path Sum',
  difficulty: 'easy',
  description: 'Given the root of a binary tree and an integer <code>targetSum</code>, return <code>true</code> if the tree has a root-to-leaf path such that the sum of all values along the path equals <code>targetSum</code>.',
  examples: [
    { input: 'root=[5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum=22', output: 'true', explanation: 'Path 5→4→11→2 has sum 22.' },
    { input: 'root=[1,2,3], targetSum=5', output: 'false' },
  ],
  constraints: ['0 ≤ number of nodes ≤ 5000', '-1000 ≤ Node.val ≤ 1000', '-1000 ≤ targetSum ≤ 1000'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def has_path_sum(self, root, target_sum):
        pass`,
  functionName: 'has_path_sum_run',
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
def has_path_sum_run(arr, target_sum):
  return Solution().has_path_sum(_build(arr), target_sum)`,
  testCases: [
    { label: 'Path exists', args: [[5,4,8,11,null,13,4,7,2,null,null,null,1],22], expected: true },
    { label: 'No path', args: [[1,2,3],5], expected: false },
    { label: 'Empty tree', args: [null,0], expected: false },
  ],
  bruteHint: 'The brute-force approach collects every root-to-leaf path into its own list first, walking down to each leaf and storing the full sequence of values along the way, and only afterward sums each stored path to check whether it equals targetSum. A tree with n nodes can require O(n) work just to build all the paths, and in the worst case (a skewed tree) each path can itself be O(n) long, so precomputing and summing every path costs O(n²) time and space overall. Could you avoid storing full paths altogether by carrying a running sum downward as you recurse, checking it only when you reach a leaf?',
  optimizeComplexity: { time: 'O(n)', space: 'O(h)' },
  clues: [
    {
      id: 'output-type',
      question: 'The shape of the expected return value tells you how much of the search you actually need to complete. The output is a boolean — true or false. What does this tell you about how to structure your search?',
      options: [
        { label: 'Return as soon as you find a valid path', isCorrect: true },
        { label: 'Collect all root-to-leaf paths first', isCorrect: false, feedback: 'Collecting all paths and then checking sums does more work than needed. A boolean result means you can stop the moment you find one valid path.' },
        { label: 'Count how many paths match', isCorrect: false, feedback: 'The output is true/false, not a count. Counting paths does unnecessary work — you only need to know if one exists.' },
        { label: 'Track the path with the maximum sum', isCorrect: false, feedback: 'Maximum sum is a different problem. Here you only need to check if any path matches a specific target.' },
      ],
      correctFeedback: 'A boolean output means early exit is valid — the moment you reach a leaf that satisfies the sum, you can return true without exploring the rest of the tree.',
      wrongFeedback: [
        'The problem asks whether a path exists, not which path or how many. What does that let you skip?',
        'When the answer is true/false, the first successful path ends the search. What traversal strategy makes this easy?',
      ],
      highlight: { location: 'description', text: 'return <code>true</code> if the tree has a root-to-leaf path such that the sum of all values along the path equals <code>targetSum</code>.' },
    },
    {
      id: 'leaf-definition',
      question: 'Structural definitions baked into the problem statement determine exactly when your recursion should stop and evaluate. The path must end at a leaf. What defines a leaf node?',
      options: [
        { label: 'Any node that has been visited', isCorrect: false },
        { label: 'A node whose value equals the remaining sum', isCorrect: false, feedback: 'A node\'s value matching the remainder is the success condition, not the definition of a leaf. A leaf is structural — it has no children.' },
        { label: 'A node with no left or right child', isCorrect: true },
        { label: 'The deepest node in the tree', isCorrect: false, feedback: 'A tree can have leaves at many different depths — they\'re not all at the same level. A leaf is any node with no children, regardless of depth.' },
      ],
      correctFeedback: 'A leaf has no children — both left and right are null. You must check this explicitly, or paths will be counted as complete at internal nodes with only one child.',
      wrongFeedback: [
        'The path must end at a leaf specifically, not just any node. What structural property makes a node a leaf?',
        'Think about children: a leaf is a node that cannot continue further down the tree.',
      ],
      highlight: { location: 'description', text: 'root-to-leaf path' },
    },
    {
      id: 'negative-values',
      question: 'Value ranges that include negatives can silently invalidate pruning strategies that only work for non-negative inputs. Node values can be negative (-1000 ≤ Node.val ≤ 1000). What pruning strategy does this rule out?',
      options: [
        { label: 'Stopping when remaining sum goes negative', isCorrect: true },
        { label: 'Using recursion to track the path', isCorrect: false },
        { label: 'Checking the leaf condition', isCorrect: false },
        { label: 'Subtracting node values from targetSum', isCorrect: false, feedback: 'Subtracting from the target as you descend is a valid and common approach here. Negative values don\'t break subtraction — they just mean you can\'t prune early when the remainder goes negative.' },
      ],
      correctFeedback: 'With negative node values, a path sum can dip below zero and then recover. You cannot prune a branch just because the remaining sum is negative — the sum might still reach the target deeper in the tree.',
      wrongFeedback: [
        'Negative values mean a path sum can decrease and then increase again. Which early-exit optimization breaks under that assumption?',
        'Think about pruning: if you stop exploring a branch when the remaining sum drops below zero, what valid paths might you miss?',
      ],
      highlight: { location: 'constraint', text: '-1000 ≤ Node.val ≤ 1000' },
    },
    {
      id: 'empty-tree-guarantee',
      question: 'Boundary guarantees on input size reveal which edge cases your base case must explicitly handle. The tree can have 0 nodes. What does this edge case require?',
      options: [
        { label: 'Return false immediately when root is null', isCorrect: false },
        { label: 'Handle null root as a base case returning false', isCorrect: true },
        { label: 'Return true for an empty tree if targetSum is 0', isCorrect: false, feedback: 'An empty tree has no root-to-leaf path at all, so the answer is always false regardless of targetSum. There is no path, so no sum can match.' },
        { label: 'Skip the null check if targetSum > 0', isCorrect: false, feedback: 'The null check is always necessary when the tree can be empty. Skipping it would crash on the empty-tree test case.' },
      ],
      correctFeedback: 'A null root means there are no paths — the function must return false. This is the natural recursive base case and also handles the empty-tree input.',
      wrongFeedback: [
        'An empty tree has no root-to-leaf paths. What should the function return in that case?',
        'The base case for recursion and the empty-tree edge case are the same here. What value is correct when root is null?',
      ],
      highlight: { location: 'constraint', text: '0 ≤ number of nodes ≤ 5000' },
    },
  ],
  solutionCode: `class Solution:
    def has_path_sum(self, root, target_sum):
        if not root:
            return False
        if not root.left and not root.right:
            return target_sum == root.val
        remaining = target_sum - root.val
        return self.has_path_sum(root.left, remaining) or self.has_path_sum(root.right, remaining)`,
  solutionComplexity: { time: 'O(n)', space: 'O(h)' },
  solutionCaveat: 'The leaf check requires <code>both</code> <code>root.left</code> and <code>root.right</code> to be absent — a node with exactly one child is not a leaf, so the path must keep extending through whichever child exists rather than being evaluated as complete at that node.',
  solutionExplanation: 'Subtracting the current node\'s value from the target as the recursion descends means a leaf only needs to check whether the <code>remaining</code> target equals its own value, rather than every node needing to know the full accumulated sum from the root — the subtraction carries that information forward implicitly. Because the return type is a boolean rather than a collection, the <code>or</code> between the two recursive calls lets the search stop the instant either subtree reports success, without needing to explore the rest of the tree once one valid path has been confirmed.',
}
