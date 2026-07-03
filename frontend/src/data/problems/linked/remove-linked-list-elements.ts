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
}
