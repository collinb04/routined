export default {
  id: 'same-tree',
  title: 'Same Tree',
  difficulty: 'easy',
  description: `<p>Given the roots of two binary trees <code>p</code> and <code>q</code>, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.</p>`,
  examples: [
    { input: 'p = [1,2,3], q = [1,2,3]', output: 'true' },
    { input: 'p = [1,2], q = [1,null,2]', output: 'false' },
  ],
  constraints: ['The number of nodes in both trees is in [0, 100]', '-10^4 <= Node.val <= 10^4'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

def is_same_tree(p, q):
  pass`,
  functionName: 'is_same_tree_run',
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
def is_same_tree_run(p, q):
  return is_same_tree(_build(p), _build(q))`,
  testCases: [
    { label: 'same', args: [[1,2,3],[1,2,3]], expected: true },
    { label: 'different structure', args: [[1,2],[1,null,2]], expected: false },
  ],
  clues: [
    {
      id: 'input-two-roots',
      question: 'You are given two separate tree roots, p and q. What does this tell you about how to traverse?',
      options: [
        { label: 'Flatten both to arrays, then compare', isCorrect: false, feedback: 'Flattening loses structural information — two different trees can produce the same level-order array if nulls are omitted. The structure check must happen node by node.' },
        { label: 'Walk both trees simultaneously', isCorrect: true },
        { label: 'BFS one tree and DFS the other', isCorrect: false, feedback: 'Mixing traversal orders makes alignment impossible. To compare p and q position by position you need the same traversal on both.' },
        { label: 'Serialize both, then string-compare', isCorrect: false, feedback: 'Serialization works in principle but is unnecessary extra work when you can compare directly. Two pointers walking both trees at once is simpler and more direct.' },
      ],
      correctFeedback: 'Exactly — you recurse into p and q in lockstep, comparing the current pair of nodes at every step.',
      wrongFeedback: [
        'Both trees must match position by position. What happens if you walk them at the same time?',
        'Think about what you need to check at each step: the current node pair, then the left pair, then the right pair.',
      ],
    },
    {
      id: 'output-boolean',
      question: 'The output is a single boolean. What does this mean for your recursion?',
      options: [
        { label: 'Collect mismatches and return a list', isCorrect: false, feedback: 'Collecting mismatches returns too much — you only need to know whether any mismatch exists, not enumerate them. A boolean short-circuit is sufficient.' },
        { label: 'Short-circuit on the first mismatch', isCorrect: true },
        { label: 'Count matching nodes and threshold', isCorrect: false, feedback: 'Counting matches would work for approximate equality, but this problem requires exact structural identity. The first mismatch is a definitive "false."' },
        { label: 'Return depth of first difference', isCorrect: false, feedback: 'Depth is not the output — a boolean is. The moment you find any mismatch, the answer is false regardless of where it occurred.' },
      ],
      correctFeedback: 'Right — as soon as one node pair fails to match, you return false immediately without inspecting the rest of the tree.',
      wrongFeedback: [
        'The problem asks true or false, not where or how many. What does that let you do as soon as you find a discrepancy?',
        'A boolean result lets you stop early. The moment one pair of nodes differs, what should you return?',
      ],
    },
    {
      id: 'structural-identity',
      question: 'Trees must be "structurally identical, and nodes have the same value." What are the two separate checks this implies?',
      options: [
        { label: 'Values equal and same depth', isCorrect: false, feedback: 'Same depth is not sufficient — two trees can have equal depth but completely different shapes. The check must be per-node: same value and same left/right structure.' },
        { label: 'Values equal and null/non-null match', isCorrect: true },
        { label: 'Same in-order traversal', isCorrect: false, feedback: 'In-order traversal is not unique to a tree structure — different shaped BSTs can produce the same in-order sequence. You need structural checks, not just value order.' },
        { label: 'Same number of nodes and same sum', isCorrect: false, feedback: 'Two trees can have the same node count and sum while being completely different. Both structure and per-node values must match simultaneously.' },
      ],
      correctFeedback: 'Exactly — at each node pair you check: are both null (base case, return true), is one null and one not (return false), and do the values match (then recurse left and right).',
      wrongFeedback: [
        'The spec says structurally identical AND same values. What two failure modes can you get at a single node pair?',
        'One failure mode is a value mismatch. The other is a structural mismatch — one node exists where the other has null.',
      ],
    },
  ],
}
