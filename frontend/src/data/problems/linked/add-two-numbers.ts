export default {
  id: 'add-two-numbers',
  title: 'Add Two Numbers',
  difficulty: 'medium',
  description: `<p>You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each node contains a single digit. Add the two numbers and return the sum as a linked list.</p>`,
  examples: [
    { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8] (342 + 465 = 807)' },
    { input: 'l1 = [0], l2 = [0]', output: '[0]' },
  ],
  constraints: ['The number of nodes in each linked list is in [1, 100]', '0 <= Node.val <= 9', 'The lists represent numbers with no leading zeros'],
  starterCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

def add_two_numbers(l1, l2):
  pass`,
  functionName: 'add_two_numbers_run',
  conceptId: 'linked-list',
  runnerSetup: `def _tol(h):
  r=[]
  while h: r.append(h.val); h=h.next
  return r
def _ton(a):
  if not a: return None
  h=ListNode(a[0]); c=h
  for v in a[1:]: c.next=ListNode(v); c=c.next
  return h
def add_two_numbers_run(l1, l2):
  return _tol(add_two_numbers(_ton(l1), _ton(l2)))`,
  testCases: [
    { label: '342+465', args: [[2,4,3],[5,6,4]], expected: [7,0,8] },
    { label: '0+0', args: [[0],[0]], expected: [0] },
    { label: '999+99', args: [[9,9,9,9,9,9,9],[9,9,9,9]], expected: [8,9,9,9,0,0,0,1] },
  ],
}
