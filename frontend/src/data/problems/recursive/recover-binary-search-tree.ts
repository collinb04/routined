export default {
  id: 'recover-binary-search-tree',
  title: 'Recover Binary Search Tree',
  difficulty: 'medium',
  description: 'Two nodes of a BST are swapped by mistake. Recover the BST without changing its structure. Try to use O(1) constant space (Morris inorder traversal).',
  examples: [
    { input: 'root = [1,3,null,null,2]', output: '[3,1,null,null,2]', explanation: 'Swap 1 and 3 back.' },
    { input: 'root = [3,1,4,null,null,2]', output: '[2,1,4,null,null,3]', explanation: 'Swap 2 and 3 back.' },
  ],
  constraints: ['2 ≤ number of nodes ≤ 1000', '-2³¹ ≤ Node.val ≤ 2³¹ − 1'],
  starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def recover_tree(self, root):
        pass`,
  functionName: 'recover_tree_run',
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
def recover_tree_run(arr):
  root = _build(arr)
  Solution().recover_tree(root)
  return _level(root)`,
  testCases: [
    { label: 'Swap at root', args: [[1,3,null,null,2]], expected: [3,1,null,null,2] },
  ],
  bruteHint: 'The brute-force approach performs an inorder traversal to collect all node values into a list, sorts a copy of that list, and compares the two to find the two positions where they differ — revealing which values were swapped. This takes O(n log n) time for the sort and O(n) space for the collected values, then a second traversal to find and swap the actual nodes. Can you avoid the extra array and the sort by looking for inversions during a single traversal instead?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'inorder-bst-signal',
      question: 'Recognizing how a described corruption manifests in your data structure tells you exactly what pattern to search for. A valid BST has a strictly increasing inorder traversal. Two nodes are swapped. What does this produce in the inorder sequence?',
      highlight: { location: 'description', text: 'Two nodes of a BST are swapped by mistake.' },
      options: [
        { label: 'One out-of-order element in the sequence', isCorrect: false, feedback: 'Swapping two nodes creates two violations in the inorder sequence, not one. At each swap point, a larger value appears before a smaller one — that is two descents, though they may be adjacent (appearing as one).' },
        { label: 'One or two inversions in the inorder sequence', isCorrect: true },
        { label: 'The inorder sequence becomes fully reversed', isCorrect: false, feedback: 'Only two values are misplaced — the rest of the sequence is correct. The inorder traversal is nearly sorted, with exactly one or two positions where a number is larger than its successor.' },
        { label: 'Duplicate values appear in the inorder sequence', isCorrect: false, feedback: 'No duplicates are created — two existing values just exchange positions. The inorder sequence still contains the same values, just with one or two pairs out of order.' },
      ],
      correctFeedback: 'When two non-adjacent nodes are swapped, inorder traversal has two inversions: first[i] > first[i+1] and second[j] > second[j+1]. When swapped nodes are adjacent, there is only one inversion but both nodes are the culprits.',
      wrongFeedback: [
        'If the inorder sequence was [1,2,3,4,5] and you swapped the values at positions 2 and 4, what would the new sequence look like?',
        'Swapping non-adjacent elements gives [1,4,3,2,5] — two places where a number exceeds its successor (4>3 and 3>2). Adjacent swaps give one inversion but still two wrong nodes.',
      ],
    },
    {
      id: 'two-pointers-signal',
      question: 'Once you know how many inversions to expect, you need a strategy to actually pinpoint the offending nodes during traversal. During inorder traversal, how do you identify the two nodes that need to be swapped?',
      options: [
        { label: 'Find the node whose value is largest and smallest', isCorrect: false, feedback: 'The largest and smallest values are not necessarily the swapped ones. The swapped nodes are identified by where they violate the inorder ordering — not by their absolute values.' },
        { label: 'Track the first place prev > curr, and the last place prev > curr', isCorrect: true },
        { label: 'Collect all nodes into a sorted array and find mismatches', isCorrect: false, feedback: 'Collecting into an array and sorting requires O(n) extra space. The O(1) target hint means you should identify the swapped nodes during traversal itself using two tracked pointers.' },
        { label: 'Compare each node\'s value to its parent\'s value', isCorrect: false, feedback: 'Parent-child comparisons do not directly reveal inorder violations. A node may be correct relative to its parent but wrong relative to the overall sorted sequence. Inorder traversal catches the true violations.' },
      ],
      correctFeedback: 'Walk inorder, keeping a prev pointer. When prev.val > curr.val, record prev as the first candidate (on the first violation) and curr as the second candidate (on every violation). After traversal, swap their values.',
      wrongFeedback: [
        'As you walk inorder, you keep track of the previous node. When does prev.val > curr.val indicate a problem?',
        'First violation: first = prev, second = curr. Second violation (if it exists): update second = curr only. After the full traversal, swap first.val and second.val.',
      ],
    },
    {
      id: 'space-complexity-signal',
      question: 'When a problem explicitly hints at a target space complexity, that phrasing often names the exact technique required. The problem says "try to use O(1) constant space." What does O(1) space mean for a tree traversal?',
      highlight: { location: 'description', text: 'Try to use O(1) constant space (Morris inorder traversal).' },
      options: [
        { label: 'Use an explicit stack instead of recursion', isCorrect: false, feedback: 'An explicit stack still uses O(h) space — O(log n) for balanced trees, O(n) worst case. That is not O(1). The O(1) hint refers to Morris traversal, which uses no stack at all.' },
        { label: 'Morris inorder traversal — no recursion stack or queue', isCorrect: true },
        { label: 'BFS level-order traversal with a deque', isCorrect: false, feedback: 'BFS uses O(n/2) space at the widest level — O(n) total. That is the opposite of O(1). Morris traversal achieves O(1) by temporarily threading pointers through the tree itself.' },
        { label: 'Collect all values in a list and sort them', isCorrect: false, feedback: 'Collecting values into a list uses O(n) space. The O(1) target specifically means not using proportional-to-n auxiliary storage — Morris traversal is the canonical O(1) technique for inorder BST traversal.' },
      ],
      correctFeedback: 'Morris traversal temporarily modifies the tree\'s right pointers to create inorder threading, then restores them. It uses only a constant number of extra pointers — O(1) extra space — while visiting every node in inorder.',
      wrongFeedback: [
        'Recursive DFS uses O(h) stack space. What traversal technique visits every node in inorder without any stack or queue?',
        'Morris traversal threads the tree: for each node, its inorder predecessor\'s right pointer is temporarily set to point back to the node. This creates an inorder path without any stack. O(1) extra space.',
      ],
    },
    {
      id: 'in-place-recovery-signal',
      question: 'Constraints on what you are allowed to modify narrow down which part of the data structure actually needs fixing. The problem says "recover the BST without changing its structure." What exactly do you swap?',
      highlight: { location: 'description', text: 'Recover the BST without changing its structure.' },
      options: [
        { label: 'The two nodes themselves (restructure the tree)', isCorrect: false, feedback: 'Restructuring the tree — changing parent/child pointers — would change the structure, which is explicitly forbidden. Only the values inside the misplaced nodes need to be swapped.' },
        { label: 'Only the values of the two identified nodes', isCorrect: true },
        { label: 'All node values along the path between the two nodes', isCorrect: false, feedback: 'Only two specific nodes hold swapped values — swapping values along the entire path between them would corrupt the rest of the BST.' },
        { label: 'The subtrees rooted at the two nodes', isCorrect: false, feedback: 'Swapping subtrees changes the tree structure and would break the BST property for all nodes in those subtrees. Only the two misplaced values need to be exchanged.' },
      ],
      correctFeedback: 'Once you identify first and second (the two misplaced nodes), swap only their .val fields. The tree\'s pointer structure remains unchanged — only the values at those two positions are exchanged.',
      wrongFeedback: [
        'The tree structure (parent/child pointers) is correct — only values ended up in the wrong nodes. What is the minimal change that fixes this?',
        'Swap first.val and second.val. No pointer changes, no restructuring — just exchange the two integer values that ended up in the wrong positions.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def recover_tree(self, root):
        first = second = prev = None
        curr = root
        while curr:
            if curr.left:
                pred = curr.left
                while pred.right and pred.right != curr:
                    pred = pred.right
                if not pred.right:
                    pred.right = curr
                    curr = curr.left
                    continue
                else:
                    pred.right = None
            if prev and prev.val > curr.val:
                if not first:
                    first = prev
                second = curr
            prev = curr
            curr = curr.right
        first.val, second.val = second.val, first.val`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'The threaded pointer (<code>pred.right = curr</code>) is removed again the moment it\'s used to return to <code>curr</code> — leaving it in place would permanently corrupt the tree\'s structure, so the temporary thread must be torn down immediately after it serves its one purpose of avoiding a stack.',
  solutionExplanation: 'Morris traversal simulates inorder traversal without recursion or an explicit stack by temporarily linking each node\'s inorder predecessor forward to it, which is what lets the traversal return to a node after descending into its left subtree with zero extra memory. Every time the current value is smaller than the previous one visited, that\'s a violation of the BST\'s required ascending inorder order; recording the first violation\'s earlier node as <code>first</code> and every violation\'s later node as <code>second</code> correctly identifies both misplaced nodes whether the swap was between adjacent values (one violation) or distant ones (two violations) — swapping only their <code>.val</code> fields at the end repairs the BST without touching any pointer in the tree\'s actual structure.',
}
