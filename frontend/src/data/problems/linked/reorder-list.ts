export default {
  id: 'reorder-list',
  title: 'Reorder List',
  difficulty: 'medium',
  description: `<p>You are given the head of a singly linked list <code>L: L0 → L1 → ... → Ln-1 → Ln</code>. Reorder it to: <code>L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...</code></p><p>You may not modify the values in the list's nodes. Only nodes themselves may be changed. Modify the list in place and return the head.</p>`,
  examples: [
    { input: 'head = [1,2,3,4]', output: '[1,4,2,3]' },
    { input: 'head = [1,2,3,4,5]', output: '[1,5,2,4,3]' },
  ],
  constraints: ['The number of nodes is in [1, 5 * 10^4]', '1 <= Node.val <= 1000'],
  starterCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

def reorder_list(head):
  pass`,
  functionName: 'reorder_list_run',
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
def reorder_list_run(arr):
  head = _ton(arr)
  reorder_list(head)
  return _tol(head)`,
  testCases: [
    { label: '[1,2,3,4]', args: [[1,2,3,4]], expected: [1,4,2,3] },
    { label: '[1,2,3,4,5]', args: [[1,2,3,4,5]], expected: [1,5,2,4,3] },
  ],
}
