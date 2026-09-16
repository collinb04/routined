export default {
  id: 'vertical-order-traversal',
  title: 'Vertical Order Traversal of a Binary Tree',
  difficulty: 'hard',
  description: 'Given the root of a binary tree, return the vertical order traversal: columns from left to right. Within the same column, nodes at the same row are sorted by value.',
  examples: [
    { input: 'root = [3,9,20,null,null,15,7]', output: '[[9],[3,15],[20],[7]]' },
  ],
  constraints: ['1 ≤ number of nodes ≤ 1000', '0 ≤ Node.val ≤ 1000'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def vertical_traversal(self, root):
        pass`,
  functionName: 'vertical_traversal_run',
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
def vertical_traversal_run(arr):
  return Solution().vertical_traversal(_build(arr))`,
  testCases: [
    { label: 'Standard tree', args: [[3,9,20,null,null,15,7]], expected: [[9],[3,15],[20],[7]] },
    { label: 'Single', args: [[1]], expected: [[1]] },
  ],
  bruteHint: 'The brute-force approach first finds the range of column indices, then re-traverses the entire tree once per column, collecting only the nodes that belong to that column each time. With up to O(n) distinct columns and an O(n) traversal for each one, this costs O(n²) time overall, plus O(n) space for the output and recursion stack. What information could you gather in a single pass instead of repeating the traversal for every column?',
  optimizeComplexity: { time: 'O(n log n)', space: 'O(n)' },
  clues: [
    {
      id: 'column-coordinate',
      highlight: { location: 'description', text: 'columns from left to right' },
      question: 'Deriving a coordinate directly from the path taken through the tree, rather than from traversal order, is often what separates a correct grouping key from a coincidental one. To group nodes into columns, you need to assign each node a column index. How does traversal direction map to column change?',
      options: [
        { label: 'Processing nodes level by level automatically gives column indices', isCorrect: false, feedback: 'BFS level order tracks depth (row), not horizontal position (column). Two nodes at the same BFS level can be in different columns — you need to explicitly track the column offset as you recurse.' },
        { label: 'Going left decrements the column; going right increments it', isCorrect: true },
        { label: 'Going right decrements the column; going left increments it', isCorrect: false, feedback: 'By convention, left is the negative direction and right is positive. Going left decrements the column index; going right increments it.' },
        { label: 'Column index equals node depth', isCorrect: false, feedback: 'Depth tracks vertical position (row), not horizontal position (column). A node at depth 3 could be in column -3, 0, or +3 depending on the path taken to reach it.' },
      ],
      correctFeedback: 'Root starts at column 0. Each left step decrements the column by 1; each right step increments it by 1. DFS or BFS both work as long as you carry the (row, col) coordinate through each call.',
      wrongFeedback: [
        'Imagine walking from the root to a node. Each left turn moves you one column left; each right turn moves one column right. How would you track that?',
        'Column index accumulates as you traverse. Root is col=0. What does going left do to col? What does going right do?',
      ],
    },
    {
      id: 'same-column-same-row-sort',
      highlight: { location: 'description', text: 'Within the same column, nodes at the same row are sorted by value.' },
      question: 'When a problem statement specifies both a grouping key and a tie-breaking order, it is usually telling you exactly what data structure and sort step you will need. "Within the same column, nodes at the same row are sorted by value." What data structure naturally supports grouping by (column, row) and then sorting?',
      options: [
        { label: 'A list of lists, indexed by depth', isCorrect: false, feedback: 'A list indexed by depth groups by row, not by column. You need the column as the primary grouping key, with (row, value) available for sorting within each column.' },
        { label: 'A dictionary mapping column → list of (row, value) pairs', isCorrect: true },
        { label: 'A sorted array of node values', isCorrect: false, feedback: 'A sorted array of values loses positional information entirely. You cannot reconstruct column and row groupings from values alone.' },
        { label: 'A set per column to auto-deduplicate', isCorrect: false, feedback: 'A set removes duplicates, but the problem does not say values are unique — two nodes in the same column at the same row must both appear, sorted by value. A list preserves all entries.' },
      ],
      correctFeedback: 'Collect entries as (col → [(row, val), ...]) during traversal. Then sort each column\'s list by (row, val) and extract the values. The dictionary gives O(1) insertion and the sort handles the tie-breaking.',
      wrongFeedback: [
        'You need to: 1) group by column, 2) within each column sort by row, then by value. What structure lets you accumulate entries by column key?',
        'A dictionary keyed by column lets you append (row, value) pairs as you traverse. After traversal, sort each column\'s list. Why do you need both row and value in each tuple?',
      ],
    },
    {
      id: 'output-column-order',
      highlight: { location: 'description', text: 'columns from left to right' },
      question: 'Output ordering requirements that do not match traversal order are a signal that a post-processing sort step is required, not just a clever traversal choice. The output is columns from left to right. How do you determine the final column ordering?',
      options: [
        { label: 'Output columns in the order they were first visited', isCorrect: false, feedback: 'Traversal order depends on your strategy (DFS preorder visits left subtrees first, but rightmost columns could be encountered before leftmost in some paths). Sort column keys numerically to guarantee left-to-right order.' },
        { label: 'Sort the column keys numerically', isCorrect: true },
        { label: 'Process nodes level by level to naturally produce left-to-right columns', isCorrect: false, feedback: 'BFS level order produces nodes row by row, not column by column. Columns still need to be assembled from column-keyed data and then sorted by column index.' },
        { label: 'Column order matches the order columns were first inserted', isCorrect: false, feedback: 'Python dicts preserve insertion order, but insertion order depends on traversal — not on column position. Sort the keys to guarantee the correct left-to-right output.' },
      ],
      correctFeedback: 'After collecting all (row, val) pairs per column, sort the column dictionary by key. The minimum column key is the leftmost column; maximum is rightmost. Sorting keys gives the required left-to-right order.',
      wrongFeedback: [
        'Column indices can be negative (nodes to the left of root). How do you arrange them from leftmost to rightmost for output?',
        'Column keys are integers that can range from negative to positive. What operation on those keys produces left-to-right order?',
      ],
    },
    {
      id: 'row-tracking',
      highlight: { location: 'description', text: 'nodes at the same row' },
      question: 'A second coordinate mentioned alongside the primary grouping key usually needs its own explicit tracking through the recursion, separate from the key itself. Nodes in the same column and same row must be sorted by value. How do you track a node\'s row during traversal?',
      options: [
        { label: 'Row equals the node\'s value', isCorrect: false, feedback: 'Row is the depth (distance from root), not the node\'s value. Two nodes with the same value at different depths are in different rows.' },
        { label: 'Row increments by 1 at each level of recursion', isCorrect: true },
        { label: 'Row equals the column index', isCorrect: false, feedback: 'Row and column are independent coordinates. A node at row 2 could be in column -2, -1, 0, 1, or 2 depending on the path taken.' },
        { label: 'The order nodes are processed in gives the row automatically', isCorrect: false, feedback: 'BFS queue position gives traversal order within a level, not the row number directly. You need to explicitly track depth — either by passing it as a parameter or by counting BFS levels.' },
      ],
      correctFeedback: 'Start with row=0 at the root. Each recursive call increments row by 1. This gives each node a (col, row) coordinate that uniquely identifies its position for the same-position sort.',
      wrongFeedback: [
        'Row is the node\'s depth — how far from the root. How do you pass that information down through recursive calls?',
        'If the root is row 0, what is row for the root\'s children? For the grandchildren?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def vertical_traversal(self, root):
        columns = {}

        def dfs(node, row, col):
            if not node:
                return
            columns.setdefault(col, []).append((row, node.val))
            dfs(node.left, row + 1, col - 1)
            dfs(node.right, row + 1, col + 1)

        dfs(root, 0, 0)
        result = []
        for col in sorted(columns):
            entries = sorted(columns[col])
            result.append([val for row, val in entries])
        return result`,
  solutionComplexity: { time: 'O(n log n)', space: 'O(n)' },
  solutionCaveat: 'Each dictionary entry stores a <code>(row, val)</code> tuple, not just the value — sorting by that tuple orders first by row and only uses value as a tiebreaker for nodes that land in the exact same row <code>and</code> column, which is precisely the ordering rule the problem specifies.',
  solutionExplanation: 'Tracking <code>(row, col)</code> coordinates through the recursion — incrementing row on every step down and shifting col by -1 going left or +1 going right — assigns every node a position derived directly from its actual path through the tree, rather than from traversal order, which is what makes the grouping correct regardless of whether the walk is DFS or BFS. Grouping nodes into a dictionary keyed by column defers the "left to right" ordering requirement to a single sort over the dictionary\'s keys at the end, rather than needing the traversal itself to visit columns in that order.',
}
