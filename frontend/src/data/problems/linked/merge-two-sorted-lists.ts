export default {
  id: 'merge-two-sorted-lists',
  title: 'Merge Two Sorted Lists',
  difficulty: 'easy',
  description: `<p>You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>. Merge the two lists into one sorted list and return the head of the merged linked list.</p>`,
  examples: [
    { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
    { input: 'list1 = [], list2 = []', output: '[]' },
  ],
  constraints: ['The number of nodes in both lists is in [0, 50]', '-100 <= Node.val <= 100'],
  starterCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

def merge_two_lists(list1, list2):
  pass`,
  functionName: 'merge_two_lists_run',
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
def merge_two_lists_run(l1, l2):
  return _tol(merge_two_lists(_ton(l1), _ton(l2)))`,
  testCases: [
    { label: '[1,2,4]+[1,3,4]', args: [[1,2,4],[1,3,4]], expected: [1,1,2,3,4,4] },
    { label: 'both empty', args: [[],[]], expected: [] },
    { label: 'one empty', args: [[], [0]], expected: [0] },
  ],
}
