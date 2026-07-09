export default {
  id: 'remove-linked-list-elements',
  title: 'Remove Linked List Elements',
  difficulty: 'easy',
  description: 'Given the head of a linked list and an integer <code>val</code>, remove all nodes with <code>node.val == val</code> and return the new head.',
  examples: [
    { input: 'head = [1, 2, 6, 3, 4, 5, 6], val = 6', output: '[1, 2, 3, 4, 5]' },
    { input: 'head = [7, 7, 7, 7], val = 7', output: '[]' },
    { input: 'head = [], val = 1', output: '[]' },
  ],
  constraints: [
    '0 ≤ number of nodes ≤ 10⁴',
    '1 ≤ Node.val ≤ 50',
    '0 ≤ val ≤ 50',
  ],
  starterCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

def remove_elements(head, val):
  pass`,
  functionName: 'remove_elements',
  conceptId: 'linked-lists',
  runnerSetup: `
def _to_linked(lst):
  if not lst: return None
  head = ListNode(lst[0])
  cur = head
  for v in lst[1:]:
      cur.next = ListNode(v)
      cur = cur.next
  return head

def _to_list(head):
  result = []
  while head:
      result.append(head.val)
      head = head.next
  return result

_orig_remove_elements = remove_elements
def remove_elements(values, val):
  return _to_list(_orig_remove_elements(_to_linked(values), val))
`,
  testCases: [
    { label: 'Remove middle', args: [[1, 2, 6, 3, 4, 5, 6], 6], expected: [1, 2, 3, 4, 5] },
    { label: 'Remove all', args: [[7, 7, 7, 7], 7], expected: [] },
    { label: 'Empty list', args: [[], 1], expected: [] },
    { label: 'Remove head', args: [[1, 1, 2, 3], 1], expected: [2, 3] },
    { label: 'Not found', args: [[1, 2, 3], 4], expected: [1, 2, 3] },
  ],
  bruteHint: 'Describe collecting the non-matching values into a new array and rebuilding a fresh list from it',
  optimizeHint: 'Name the technique of walking the list with a trailing previous pointer (aided by a dummy head) to remove matching nodes in place',
  clues: [
    {
      id: 'head-removal-challenge',
      question: 'The test case [7,7,7,7] with val = 7 produces []. This means the head itself may need to be removed. How does this affect what you return?',
      options: [
        { label: 'Always return the original head', isCorrect: false, feedback: 'If the original head matches val, returning it gives back the node that should be deleted. For [7,7,7,7] the correct return is None, not the original head.' },
        { label: 'The returned head may differ from the input head', isCorrect: true },
        { label: 'Skip the first node and only check from the second', isCorrect: false, feedback: 'Skipping the first node would miss head removals that need to happen, but also leave valid heads unchecked. Every node — including the head — must be evaluated.' },
        { label: 'Return null whenever the list has only matching values', isCorrect: false, feedback: 'Returning null when all nodes match is correct for that case, but it\'s a consequence of general removal logic, not a special case to hardcode. The return is always the first non-matching node, which may be null.' },
      ],
      correctFeedback: 'A dummy head node (a sentinel prepended to the list) eliminates the head-removal special case: you always return dummy.next, which is null if all nodes were removed.',
      wrongFeedback: [
        'If the first node matches val, what node should become the new head?',
        'The new head is the first node that doesn\'t match val. A dummy sentinel node before the real head lets you handle head removal identically to any other removal.',
      ],
    },
    {
      id: 'removal-mechanism',
      question: 'To remove a node from a linked list, you need access to the node before it. This is because…',
      options: [
        { label: 'You must null out the removed node\'s next pointer', isCorrect: false, feedback: 'Nulling the removed node\'s next is optional cleanup. The essential step is redirecting the predecessor\'s next to skip the removed node — otherwise the list still traverses through it.' },
        { label: 'You redirect predecessor.next to skip the removed node', isCorrect: true },
        { label: 'You need to update the removed node\'s value to null', isCorrect: false, feedback: 'Setting a node\'s value to null doesn\'t remove it from the list — subsequent traversal still visits it. Removal requires changing pointer linkage, not values.' },
        { label: 'The removed node must point back to its predecessor', isCorrect: false, feedback: 'This is a singly linked list — nodes only have a next pointer, not a previous. There is no backward pointer to set. Removal works by making the predecessor skip forward over the removed node.' },
      ],
      correctFeedback: 'Removal by pointer redirection: prev.next = curr.next. The removed node is still in memory but unreachable from the list. Keep a prev pointer as you traverse, and update it only when the current node is not removed.',
      wrongFeedback: [
        'If you\'re standing at a node that should be deleted, what information do you need that you can\'t get from the node itself?',
        'You need to know the previous node — the one that points to the target. Without prev, you can\'t rewire prev.next to skip the deleted node.',
      ],
    },
    {
      id: 'all-nodes-match',
      question: 'The test case [7,7,7,7] with val = 7 expects an empty list. This edge case means…',
      options: [
        { label: 'Return null only if the input list is empty', isCorrect: false, feedback: 'Null is the correct return when all nodes are removed, not just when the input was already empty. [7,7,7,7] is a non-empty input that becomes empty after removal.' },
        { label: 'Your removal logic must handle an entirely removed list without crashing', isCorrect: true },
        { label: 'Stop early when you detect all remaining nodes match', isCorrect: false, feedback: 'Early stopping is an optimization that works, but the standard traversal naturally handles this: after removing every node, dummy.next is null, which is the correct return value. No special detection needed.' },
        { label: 'Reinitialize the list to empty before returning', isCorrect: false, feedback: 'No reinitialization is needed. If all nodes are removed during traversal, dummy.next ends up null — the correct empty-list return — without any explicit reset.' },
      ],
      correctFeedback: 'General removal logic covers this: every node is removed, dummy.next ends up null, and you return null (an empty list). No special case needed if you use a dummy head.',
      wrongFeedback: [
        'After removing every node from [7,7,7,7], what does dummy.next point to?',
        'Null — every node was skipped. Returning dummy.next returns null, which represents an empty list. The all-matching case falls out naturally from the general logic.',
      ],
    },
    {
      id: 'constraint-node-count',
      question: 'Up to 10⁴ nodes, values in [1, 50]. This tells you…',
      options: [
        { label: 'Use a hash set to record which values to remove', isCorrect: false, feedback: 'You only have one target value — val — not a set of values. A single integer comparison per node is all you need. A hash set would be over-engineering for a single target.' },
        { label: 'A single O(n) pass checking each node once is sufficient', isCorrect: true },
        { label: 'Sort nodes by value to group matches together', isCorrect: false, feedback: 'Sorting by value would require O(n log n) time and destroys the original order. You need to preserve list order — just skip the matching nodes as you traverse.' },
        { label: 'O(n²) is fine at n = 10⁴ — search from head for each match', isCorrect: false, feedback: 'O(n²) at n = 10,000 is 100 million operations — workable but pointless. A single linear pass visits each node exactly once, removing matches as it goes, with no re-scanning.' },
      ],
      correctFeedback: 'One pass, O(n): visit each node, compare its value to val, and either keep it (advance prev) or skip it (redirect prev.next). Up to 10,000 comparisons total.',
      wrongFeedback: [
        'Do you ever need to revisit a node you\'ve already passed?',
        'No — each node is checked exactly once. Linear traversal with a trailing prev pointer processes all 10,000 nodes in a single forward pass.',
      ],
    },
  ],
}
