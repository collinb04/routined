export default {
  id: 'merge-k-sorted-lists',
  title: 'Merge K Sorted Lists',
  difficulty: 'hard',
  description: `<p>You are given an array of <code>k</code> linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.</p>`,
  examples: [
    { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
    { input: 'lists = []', output: '[]' },
  ],
  constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500', '-10^4 <= lists[i][j] <= 10^4'],
  starterCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

def merge_k_lists(lists):
  pass`,
  functionName: 'merge_k_lists_run',
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
def merge_k_lists_run(arrs):
  return _tol(merge_k_lists([_ton(a) for a in arrs]))`,
  testCases: [
    { label: '3 lists', args: [[[1,4,5],[1,3,4],[2,6]]], expected: [1,1,2,3,4,4,5,6] },
    { label: 'empty', args: [[]], expected: [] },
  ],
}
