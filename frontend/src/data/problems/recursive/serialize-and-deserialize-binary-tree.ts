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
}
