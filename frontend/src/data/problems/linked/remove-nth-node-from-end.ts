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
  bruteHint: 'Describe counting the list length in one pass, then walking to the node before the target in a second pass',
  optimizeHint: 'Name the two-pointer technique that keeps a fixed gap of n nodes to find the target in one pass',
  clues: [
    {
      id: 'end-relative-position',
      question: 'The target is the nth node from the end — a position measured from the tail. Without knowing the list length, you can\'t compute this position directly. The naive approach requires…',
      options: [
        { label: 'One pass using a stack', isCorrect: false, feedback: 'A stack lets you reverse traversal order in one pass, but it uses O(sz) space. The two-pointer technique finds the nth-from-end node in one pass with O(1) space.' },
        { label: 'Two passes: one to count length, one to reach position (sz - n)', isCorrect: true },
        { label: 'Binary search to find the target index', isCorrect: false, feedback: 'Binary search requires random access, which linked lists don\'t support. Finding a node by index still requires linear traversal from the head.' },
        { label: 'Reversing the list first', isCorrect: false, feedback: 'Reversing the list converts "nth from end" to "nth from start," but it requires O(n) traversal and then another to find position n. A two-pointer approach reaches the same answer without reversing.' },
      ],
      correctFeedback: 'Naive: traverse once to count sz nodes, then walk to node at position (sz - n) and remove it. Total: two passes, O(1) space. The one-pass alternative uses two pointers offset by n steps.',
      wrongFeedback: [
        'If you knew sz = 5 and n = 2, which position from the start is the target? How would you find sz without a pass?',
        'Position from start = sz - n = 3 (0-based). You need sz first, which costs one full traversal. That\'s the two-pass baseline — can you find the same node without knowing sz in advance?',
      ],
    },
    {
      id: 'one-pass-two-pointer',
      question: 'To find the nth node from the end in one pass, you can use two pointers separated by a gap of n. When the fast pointer reaches the end, the slow pointer is…',
      options: [
        { label: 'At the head of the list', isCorrect: false, feedback: 'If both pointers start at the head and fast advances n steps first, when fast reaches null slow is at position (sz - n) — not the head. The gap between them equals n.' },
        { label: 'At the node just before the target', isCorrect: true },
        { label: 'At the target node itself', isCorrect: false, feedback: 'To remove a node you need its predecessor — if slow lands on the target, you can\'t redirect the link. Slow should land one node before the target so you can set slow.next = slow.next.next.' },
        { label: 'n nodes behind the fast pointer', isCorrect: false, feedback: 'That\'s true of their relative gap, but what matters is slow\'s absolute position when fast reaches null. Slow lands at the predecessor of the nth-from-end node.' },
      ],
      correctFeedback: 'Advance fast by n + 1 steps first (or use a dummy head to simplify), then advance both together. When fast reaches null, slow is exactly at the predecessor of the target. Set slow.next = slow.next.next to remove.',
      wrongFeedback: [
        'You need to remove the target node by updating its predecessor\'s next pointer. Should slow land on the target itself, or one node before it?',
        'One node before — the predecessor. If slow is at the predecessor when fast hits null, slow.next is the target and slow.next = slow.next.next removes it.',
      ],
    },
    {
      id: 'head-removal-edge-case',
      question: 'The test case [1] with n = 1 returns []. The test case [1,2] with n = 1 returns [1]. This means n can equal sz, removing the head. How does this affect your returned value?',
      options: [
        { label: 'Always return the original head', isCorrect: false, feedback: 'When n = sz, the head is removed. Returning the original head gives back a deleted node. For [1] with n = 1, the correct return is null.' },
        { label: 'The new head may be head.next or null', isCorrect: true },
        { label: 'Return null only when the list has exactly one node', isCorrect: false, feedback: 'Returning null is correct whenever all nodes are removed (n = sz = 1 here). The general rule is: when the head is the target, return head.next — which is null for a single-node list.' },
        { label: 'n cannot equal sz by constraint', isCorrect: false, feedback: 'The constraint says 1 <= n <= sz, so n can equal sz. That\'s the head-removal case explicitly allowed by the problem.' },
      ],
      correctFeedback: 'A dummy head node before the real head handles this cleanly: slow can never stall at the dummy, and returning dummy.next always gives the correct new head — whether or not the original head was removed.',
      wrongFeedback: [
        'When n = sz, which node is the nth from the end?',
        'The head — the very first node. After removing it, the new head is the original head.next. A dummy sentinel avoids special-casing this.',
      ],
    },
  ],
}
