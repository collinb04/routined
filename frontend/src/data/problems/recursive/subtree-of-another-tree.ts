export default {
  id: 'subtree-of-another-tree',
  title: 'Subtree of Another Tree',
  difficulty: 'easy',
  description: `<p>Given the roots of two binary trees <code>root</code> and <code>subRoot</code>, return <code>true</code> if there is a subtree of <code>root</code> with the same structure and node values as <code>subRoot</code> and <code>false</code> otherwise.</p>`,
  examples: [
    { input: 'root = [3,4,5,1,2], subRoot = [4,1,2]', output: 'true' },
    { input: 'root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]', output: 'false' },
  ],
  constraints: ['The number of nodes in root is in [1, 2000]', 'The number of nodes in subRoot is in [1, 1000]'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def is_subtree(self, root, sub_root):
        pass`,
  functionName: 'is_subtree_run',
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
def is_subtree_run(root, sub):
  return Solution().is_subtree(_build(root), _build(sub))`,
  testCases: [
    { label: 'is subtree', args: [[3,4,5,1,2],[4,1,2]], expected: true },
    { label: 'not subtree', args: [[3,4,5,1,2,null,null,null,null,0],[4,1,2]], expected: false },
  ],
  bruteHint: 'A brute-force approach visits every node in root and, at each one, runs a full same-tree comparison to check whether the structure and values match subRoot exactly from that point down. Since you may attempt this comparison at each of root\'s m nodes, and each comparison can walk up to n nodes of subRoot, this runs in O(m · n) time. That already fits comfortably within the given size bounds — what would make an individual same-tree comparison stop early once it finds a mismatch?',
  optimizeComplexity: { time: 'O(m · n)', space: 'O(h)' },
  clues: [
    {
      id: 'constraint-two-sizes',
      highlight: { location: 'constraint', text: 'The number of nodes in root is in [1, 2000]' },
      question: 'Size constraints reveal what time complexity the problem expects you to tolerate, and where a naive approach might start to strain. root has up to 2000 nodes; subRoot has up to 1000. What does this suggest about worst-case complexity?',
      options: [
        { label: 'O(root + subRoot) — one pass each', isCorrect: false, feedback: 'A single pass through each tree only visits each node once, giving you the values but not the structural comparison. At every node in root you need to check if the entire subRoot matches from there.' },
        { label: 'O(root × subRoot) — compare at each node', isCorrect: true },
        { label: 'O(log root) — BST property speeds search', isCorrect: false, feedback: 'The problem does not state these are BSTs — they are general binary trees. You cannot use binary search to locate subRoot within root.' },
        { label: 'O(subRoot) — only traverse the smaller tree', isCorrect: false, feedback: 'You must search for subRoot at every possible position within root. Traversing only subRoot would not tell you where in root to attach it.' },
      ],
      correctFeedback: 'At each of the 2000 nodes in root, you may need to compare up to 1000 nodes in subRoot — giving O(2000 × 1000) = O(2 million) operations in the worst case. That is perfectly acceptable.',
      wrongFeedback: [
        'Imagine standing at each node in root and asking: does subRoot match here? How many nodes could you visit total?',
        'You have up to 2000 candidate positions in root. At each one you might compare all 1000 nodes of subRoot. Multiply those.',
      ],
    },
    {
      id: 'output-boolean-subtree',
      highlight: { location: 'description', text: 'there is a subtree' },
      question: 'The description\'s exact wording about what must be found tells you when it is safe to stop searching instead of exhaustively checking everything. The output is a single boolean. What does the word "there is a subtree" tell you about when to stop?',
      options: [
        { label: 'Check every node in root before returning', isCorrect: false, feedback: 'Checking every node wastes work after you find a match. Since only one matching subtree is needed, you can return true the moment you find it.' },
        { label: 'Return true as soon as one match is found', isCorrect: true },
        { label: 'Count how many subtrees match', isCorrect: false, feedback: 'The problem asks whether any match exists, not how many. Counting all matches does more work than required.' },
        { label: 'Return the matching subtree root', isCorrect: false, feedback: 'The return type is boolean, not a node. You only need to report whether a match exists.' },
      ],
      correctFeedback: 'Right — "there is a subtree" means existence, not enumeration. The moment any node in root has a matching subtree, you short-circuit and return true.',
      wrongFeedback: [
        'The problem says "if there is a subtree" — how many matches do you need to find to return true?',
        'One match is enough. What does finding that match early let you skip?',
      ],
    },
    {
      id: 'two-recursive-functions',
      question: 'Recognizing when a problem quietly bundles two different questions together helps you avoid conflating separate concerns into a single overloaded function. You need to check whether subRoot appears anywhere in root. What does this suggest about the structure of your solution?',
      options: [
        { label: 'One recursive function handles both tasks', isCorrect: false, feedback: 'Combining both tasks in one function conflates two different questions: "does the whole match start here?" and "should I search deeper?" Mixing them leads to incorrect early returns.' },
        { label: 'Two functions: one to search, one to compare', isCorrect: true },
        { label: 'Flatten both trees and compare strings', isCorrect: false, feedback: 'Flattening destroys structural information — two different trees can serialize to the same string if null markers are omitted. Structural comparison must be node by node.' },
        { label: 'BFS root, then DFS subRoot at each match', isCorrect: false, feedback: 'Mixing BFS and DFS traversal orders on paired trees makes position alignment unreliable. Both comparisons should use the same traversal strategy.' },
      ],
      correctFeedback: 'Exactly — one function recurses through root looking for a candidate node, and a separate "is same tree" function confirms whether subRoot matches exactly from that node.',
      wrongFeedback: [
        'This problem combines two separate questions. What are they, and can a single recursive function handle both cleanly?',
        'One question is "does subRoot match the tree rooted here?" The other is "where in root should I look?" What is the clean way to separate them?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def is_subtree(self, root, sub_root):
        def same(a, b):
            if not a and not b:
                return True
            if not a or not b:
                return False
            return a.val == b.val and same(a.left, b.left) and same(a.right, b.right)

        def dfs(node):
            if not node:
                return False
            if same(node, sub_root):
                return True
            return dfs(node.left) or dfs(node.right)

        return dfs(root)`,
  solutionComplexity: { time: 'O(m · n)', space: 'O(h)' },
  solutionCaveat: 'Two separate recursive functions handle two distinct questions — <code>same</code> asks "does <code>subRoot</code> match exactly starting here?" while <code>dfs</code> asks "where in <code>root</code> should that check even be tried?" — merging them into one function would conflate "no match at this candidate" with "stop searching entirely," breaking the search before it explores other candidate positions.',
  solutionExplanation: '<code>dfs</code> visits every node of <code>root</code> as a candidate attachment point and, at each one, calls <code>same</code> to run a full structural-and-value comparison against <code>sub_root</code> — since "there is a subtree" only requires existence, not enumeration, the search returns true the instant any candidate succeeds, short-circuiting through the <code>or</code> in both <code>dfs</code>\'s recursive calls and <code>same</code>\'s conjunctive checks. Running this comparison at each of <code>root</code>\'s up to 2000 nodes, each costing up to O(<code>sub_root</code>\'s size) in the worst case, gives the O(m · n) bound — well within what the given constraints allow.',
}
