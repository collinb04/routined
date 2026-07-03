export default {
  id: 'linked-list-cycle',
  title: 'Linked List Cycle',
  difficulty: 'easy',
  description: 'Given the head of a linked list, return <code>true</code> if the list contains a cycle, or <code>false</code> otherwise. Use Floyd\'s fast and slow pointer algorithm.',
  examples: [
    { input: 'head = [3, 2, 0, -4], pos = 1', output: 'true', explanation: 'The tail connects back to node at index 1.' },
    { input: 'head = [1, 2], pos = 0', output: 'true', explanation: 'The tail connects back to the head.' },
    { input: 'head = [1], pos = -1', output: 'false', explanation: 'No cycle.' },
  ],
  constraints: [
    '0 ≤ number of nodes ≤ 10⁴',
    'pos is -1 or a valid node index',
  ],
  starterCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

def has_cycle(head):
  pass`,
  functionName: 'has_cycle',
  conceptId: 'fast-slow',
  runnerSetup: `
def _build_cycle(vals, pos):
  if not vals: return None
  nodes = [ListNode(v) for v in vals]
  for i in range(len(nodes) - 1):
      nodes[i].next = nodes[i + 1]
  if pos >= 0:
      nodes[-1].next = nodes[pos]
  return nodes[0]

_orig_has_cycle = has_cycle
def has_cycle(vals, pos):
  return _orig_has_cycle(_build_cycle(vals, pos))
`,
  testCases: [
    { label: 'Cycle at index 1', args: [[3, 2, 0, -4], 1], expected: true },
    { label: 'Cycle at head', args: [[1, 2], 0], expected: true },
    { label: 'No cycle', args: [[1], -1], expected: false },
    { label: 'Longer no cycle', args: [[1, 2, 3, 4], -1], expected: false },
  ],
}
