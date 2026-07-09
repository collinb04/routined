export default {
  id: 'serialize-and-deserialize-binary-tree',
  title: 'Serialize and Deserialize Binary Tree',
  difficulty: 'hard',
  description: `<p>Serialization is the process of converting a data structure into a sequence of bits so that it can be stored or sent and reconstructed later. Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.</p><p>Implement a <code>Codec</code> class with <code>serialize(root)</code> → string and <code>deserialize(data)</code> → TreeNode.</p>`,
  examples: [
    { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5] (after serialize then deserialize)' },
  ],
  constraints: ['The number of nodes is in [0, 10^4]', '-1000 <= Node.val <= 1000'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Codec:
  def serialize(self, root):
      pass

  def deserialize(self, data):
      pass`,
  functionName: 'codec_run',
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
def codec_run(arr):
  c = Codec()
  return _level(c.deserialize(c.serialize(_build(arr))))`,
  testCases: [
    { label: '[1,2,3,null,null,4,5]', args: [[1,2,3,null,null,4,5]], expected: [1,2,3,null,null,4,5] },
    { label: 'empty', args: [[]], expected: [] },
  ],
  bruteHint: 'Describe why storing just node values (e.g. a level-order list without null markers) makes the serialization ambiguous and unable to reconstruct the exact tree shape',
  optimizeHint: 'Name the traversal order and marker convention that lets deserialize rebuild the tree unambiguously in one pass',
  clues: [
    {
      id: 'constraint-node-count',
      question: 'Up to 10^4 nodes must survive a round-trip through a string. What does this tell you about null handling?',
      options: [
        { label: 'Skip nulls — they waste space', isCorrect: false, feedback: 'Skipping nulls destroys structural information. A tree with 10^4 nodes can have many different shapes even with identical values — you need the null markers to reconstruct exactly the right one.' },
        { label: 'Encode nulls explicitly in the string', isCorrect: true },
        { label: 'Store only leaf positions', isCorrect: false, feedback: 'Leaf positions alone are not enough — you cannot reconstruct internal structure without knowing where the empty branches are at each level.' },
        { label: 'Encode only values and depth', isCorrect: false, feedback: 'Depth tells you a level, not a position within that level. Two nodes at the same depth with the same value could be left or right children of different parents.' },
      ],
      correctFeedback: 'Right — null markers in the serialized string are what let deserialize know when to stop branching and where to place children correctly.',
      wrongFeedback: [
        'The round-trip must reproduce the exact tree structure. What happens to branching decisions when you encounter an empty child?',
        'Every null child is a structural signal. Without encoding it, how would deserialize know not to attach a subtree there?',
      ],
    },
    {
      id: 'output-round-trip',
      question: 'The output of serialize is a string; deserialize returns the original tree. What property must these two functions share?',
      options: [
        { label: 'The same traversal order', isCorrect: true },
        { label: 'The same time complexity', isCorrect: false, feedback: 'Matching time complexity is not required — serialize and deserialize can differ. What they must share is a common format so each knows how to produce or consume the string.' },
        { label: 'Both must use BFS', isCorrect: false, feedback: 'Either BFS or DFS works — the problem imposes no restriction. What matters is that both functions agree on the same traversal order and encoding, whatever you choose.' },
        { label: 'The same queue size', isCorrect: false, feedback: 'Queue size is an implementation detail, not a correctness requirement. The critical shared contract is the format of the serialized string.' },
      ],
      correctFeedback: 'Exactly — serialize and deserialize form a paired contract: one writes tokens in a fixed traversal order and the other reads them back in the same order to rebuild the tree.',
      wrongFeedback: [
        'Think about what serialize produces and what deserialize consumes. What must be consistent between them?',
        'If serialize visits nodes left-to-right, what order must deserialize read tokens to assign children correctly?',
      ],
    },
    {
      id: 'no-restriction-freedom',
      question: '"There is no restriction on how your algorithm works." What does this freedom suggest about the best encoding strategy?',
      options: [
        { label: 'Match the LeetCode level-order format exactly', isCorrect: false, feedback: 'The problem explicitly says there is no restriction — you are free to use any format that round-trips correctly. Matching LeetCode\'s specific format adds constraint without benefit.' },
        { label: 'Use a simple preorder traversal with null markers', isCorrect: true },
        { label: 'Compress the string to minimize length', isCorrect: false, feedback: 'Compression is extra work the problem does not require. The freedom is an invitation to pick the simplest encoding that round-trips correctly, not to optimize string length.' },
        { label: 'Store a parent-pointer array', isCorrect: false, feedback: 'A parent-pointer array could work but requires indexing all 10^4 nodes up front. A traversal-based approach naturally handles the tree structure without a separate indexing step.' },
      ],
      correctFeedback: 'A preorder traversal with null markers is the simplest approach: serialize visits root → left → right and appends "null" for empty children; deserialize reads the same sequence and builds the tree recursively.',
      wrongFeedback: [
        '"No restriction" means pick whatever is easiest to implement correctly. Which traversal order makes recursive serialization and deserialization most natural?',
        'Preorder visits root before children — that means deserialize reads the root token first, then recurses left, then right. Why does that order simplify reconstruction?',
      ],
    },
    {
      id: 'empty-tree-guarantee',
      question: 'The number of nodes can be 0. What edge case must both serialize and deserialize handle?',
      options: [
        { label: 'An empty string', isCorrect: false, feedback: 'An empty string is fragile — deserialize has to distinguish "no data provided" from "the string encoding an empty tree." A dedicated null token is safer and unambiguous.' },
        { label: 'A null root in both directions', isCorrect: true },
        { label: 'Return None without producing a string', isCorrect: false, feedback: 'Serialize must always return a string — that is its contract. Returning None breaks deserialization, which expects a string to parse.' },
        { label: 'Raise an exception for empty input', isCorrect: false, feedback: 'The constraint explicitly allows 0 nodes, so an empty tree is a valid input, not an error. Both functions must handle it gracefully.' },
      ],
      correctFeedback: 'Right — serialize(None) should produce a valid string (e.g., "null"), and deserialize of that string should return None. Handling the empty case explicitly prevents index errors during reconstruction.',
      wrongFeedback: [
        'If root is None, serialize still runs. What should it return, and what should deserialize do with that token?',
        'Both functions share responsibility for the empty case. Serialize produces a token; deserialize must recognize that token and return None.',
      ],
    },
  ],
}
