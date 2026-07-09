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
  bruteHint: 'Describe collecting values into an array in reverse order and building a brand-new list from it',
  optimizeHint: 'Name the in-place technique of reversing next pointers one node at a time',
  clues: [
    {
      id: 'pointer-direction',
      question: 'Reversing a singly linked list means each node\'s next pointer must point to its predecessor instead of its successor. Why can\'t you simply reverse the pointer on the current node without preparation?',
      options: [
        { label: 'Reversing a pointer loses access to the rest of the list', isCorrect: true },
        { label: 'Pointers in Python are immutable', isCorrect: false, feedback: 'Python object references (next pointers) are mutable — you can reassign node.next freely. The issue is that after reassignment you\'ve lost the link to the rest of the list.' },
        { label: 'You must visit nodes in reverse order to reverse pointers', isCorrect: false, feedback: 'You can reverse pointers in forward order. The key is saving curr.next before overwriting it, then redirecting curr.next to point backward.' },
        { label: 'The tail node has no next to reverse', isCorrect: false, feedback: 'The tail\'s next is already null, which is what you want in the reversed list — it becomes the new head\'s predecessor (null). The tail is the easy case, not the problem.' },
      ],
      correctFeedback: 'The moment you set curr.next = prev, the original curr.next (the next node in the list) is lost. Save it in a temporary variable before overwriting: next_node = curr.next, then curr.next = prev.',
      wrongFeedback: [
        'If curr.next currently points to node B, and you set curr.next = prev, how do you reach node B afterward?',
        'You can\'t — the link is gone. The fix: save curr.next to a variable before reassigning it. That saved reference is how you advance to the next node.',
      ],
    },
    {
      id: 'output-new-head',
      question: 'The output is the "new head" of the reversed list. In [1,2,3,4,5] reversed to [5,4,3,2,1], the new head is 5 — the original tail. This means…',
      options: [
        { label: 'Return the original head after reversing pointers', isCorrect: false, feedback: 'After reversal, the original head (1) becomes the tail — its next is null. Returning it gives the end of the reversed list. You need to return the original tail, which is now the front.' },
        { label: 'Track and return the last node processed', isCorrect: true },
        { label: 'Return the node whose next is null after reversal', isCorrect: false, feedback: 'After reversal, the original head has a null next — but that\'s the tail, not the new head. The original tail, now pointing backward through the list, is the new head.' },
        { label: 'Return head.next before starting the reversal', isCorrect: false, feedback: 'head.next is the second node in the original list — not the new head. The new head is the last node of the original list.' },
      ],
      correctFeedback: 'The prev pointer ends up pointing at the original tail once curr reaches null. Return prev — it is the new head of the reversed list.',
      wrongFeedback: [
        'In the reversed list [5,4,3,2,1], which node was the last one in the original list?',
        'Node 5 — the original tail. During reversal, prev is always one step behind curr. When curr becomes null (end of list), prev is at the last processed node — the new head.',
      ],
    },
    {
      id: 'empty-and-single-node',
      question: 'The constraints allow 0 nodes (empty list) and the test includes a single-node list. Your algorithm must handle these without crashing. What do both cases return?',
      options: [
        { label: 'Empty returns null; single node causes an error', isCorrect: false, feedback: 'A single-node list reverses to itself — its next is already null and it is both the head and tail. The reversal loop simply never runs; prev stays at the single node.' },
        { label: 'Both return the input head unchanged', isCorrect: true },
        { label: 'Empty returns null; single returns null', isCorrect: false, feedback: 'A single-node list reversed is that same node — not null. Null is the correct return only for an empty list (head is already null).' },
        { label: 'Both cause index-out-of-bounds errors', isCorrect: false, feedback: 'Linked list traversal uses pointer checks, not indices. An empty list means head is null — the loop condition `while curr` immediately fails and you return prev (which is null). No crash.' },
      ],
      correctFeedback: 'For an empty list, prev starts as null and curr starts as null — the loop never runs, and you return null. For a single node, the loop runs once: curr.next becomes null (prev), then curr advances to null, ending the loop. Return the single node.',
      wrongFeedback: [
        'If head is null (empty list), what does the three-variable reversal loop (prev=None, curr=head) do?',
        'The loop condition `while curr` is immediately false — it never executes. prev is still None, so you return None. For a single node, the loop runs once and prev becomes that node.',
      ],
    },
    {
      id: 'constraint-node-count',
      question: 'Up to 5000 nodes. This tells you…',
      options: [
        { label: 'Recursion is safe — 5000 stack frames is fine in Python', isCorrect: false, feedback: 'Python\'s default recursion limit is 1,000. A recursive reversal on a 5,000-node list hits a RecursionError. An iterative approach with a loop is required.' },
        { label: 'An iterative O(n) reversal is the safe choice', isCorrect: true },
        { label: 'O(n²) swapping of values is acceptable', isCorrect: false, feedback: 'O(n²) at n = 5,000 is 25 million operations — slow and unnecessary. A single O(n) pass flipping pointers reverses the list in exactly 5,000 steps.' },
        { label: 'Allocate a new list of 5000 nodes in reverse order', isCorrect: false, feedback: 'Allocating new nodes uses O(n) extra space when O(1) is achievable. The existing nodes can be reversed in place by redirecting their next pointers — no new allocation needed.' },
      ],
      correctFeedback: 'Python\'s recursion limit (~1,000) is below 5,000 nodes, making recursive reversal unsafe here. An iterative three-variable loop (prev, curr, next) reverses in O(n) time and O(1) space with no stack concerns.',
      wrongFeedback: [
        'Python\'s default recursion limit is 1,000. What happens when a recursive function is called 5,000 times?',
        'RecursionError. The iterative approach uses a while loop with three pointers — no call stack depth, no limit concerns.',
      ],
    },
  ],
}
