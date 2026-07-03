export default {
  id: 'remove-nth-node-from-end',
  title: 'Remove Nth Node From End of List',
  difficulty: 'medium',
  description: `<p>Given the head of a linked list, remove the <code>n</code>th node from the end of the list and return its head.</p>`,
  examples: [
    { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' },
    { input: 'head = [1], n = 1', output: '[]' },
  ],
  constraints: ['The number of nodes is sz', '1 <= sz <= 30', '0 <= Node.val <= 100', '1 <= n <= sz'],
  starterCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

def remove_nth_from_end(head, n):
  pass`,
  functionName: 'remove_nth_from_end_run',
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
def remove_nth_from_end_run(arr, n):
  return _tol(remove_nth_from_end(_ton(arr), n))`,
  testCases: [
    { label: '[1,2,3,4,5] n=2', args: [[1,2,3,4,5], 2], expected: [1,2,3,5] },
    { label: 'single n=1', args: [[1], 1], expected: [] },
    { label: '[1,2] n=1', args: [[1,2], 1], expected: [1] },
  ],
}
