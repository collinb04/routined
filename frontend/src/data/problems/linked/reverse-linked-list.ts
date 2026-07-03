export default {
  id: 'reverse-linked-list',
  title: 'Reverse Linked List',
  difficulty: 'easy',
  description: 'Given the head of a singly linked list, reverse the list and return the new head.',
  examples: [
    { input: 'head = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' },
    { input: 'head = [1, 2]', output: '[2, 1]' },
    { input: 'head = []', output: '[]' },
  ],
  constraints: [
    '0 ≤ number of nodes ≤ 5000',
    '-5000 ≤ Node.val ≤ 5000',
  ],
  starterCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

def reverse_list(head):
  pass`,
  functionName: 'reverse_list',
  conceptId: 'list-reversal',
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

_orig_reverse_list = reverse_list
def reverse_list(values):
  return _to_list(_orig_reverse_list(_to_linked(values)))
`,
  testCases: [
    { label: 'Five nodes', args: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
    { label: 'Two nodes', args: [[1, 2]], expected: [2, 1] },
    { label: 'Empty list', args: [[]], expected: [] },
    { label: 'Single node', args: [[1]], expected: [1] },
  ],
}
