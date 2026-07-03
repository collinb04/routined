export default {
  id: 'reverse-nodes-in-k-group',
  title: 'Reverse Nodes in K-Group',
  difficulty: 'hard',
  description: `<p>Given the head of a linked list, reverse the nodes of the list <code>k</code> at a time, and return the modified list. If the number of nodes is not a multiple of <code>k</code>, leave the remaining nodes as is.</p><p>You may not alter the values in the list's nodes, only nodes themselves may be changed.</p>`,
  examples: [
    { input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]' },
    { input: 'head = [1,2,3,4,5], k = 3', output: '[3,2,1,4,5]' },
  ],
  constraints: ['The number of nodes is n', '1 <= k <= n <= 5000', '0 <= Node.val <= 1000'],
  starterCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

def reverse_k_group(head, k):
  pass`,
  functionName: 'reverse_k_group_run',
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
def reverse_k_group_run(arr, k):
  return _tol(reverse_k_group(_ton(arr), k))`,
  testCases: [
    { label: 'k=2', args: [[1,2,3,4,5], 2], expected: [2,1,4,3,5] },
    { label: 'k=3', args: [[1,2,3,4,5], 3], expected: [3,2,1,4,5] },
  ],
}
