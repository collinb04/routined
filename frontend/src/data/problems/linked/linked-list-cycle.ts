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

class Solution:
    def has_cycle(self, head):
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

_orig_has_cycle = Solution().has_cycle
def has_cycle(vals, pos):
  return _orig_has_cycle(_build_cycle(vals, pos))
`,
  testCases: [
    { label: 'Cycle at index 1', args: [[3, 2, 0, -4], 1], expected: true },
    { label: 'Cycle at head', args: [[1, 2], 0], expected: true },
    { label: 'No cycle', args: [[1], -1], expected: false },
    { label: 'Longer no cycle', args: [[1, 2, 3, 4], -1], expected: false },
  ],
  bruteHint: 'A straightforward approach walks the list while storing every visited node in a hash set, checking before each step whether the next node is already in the set. This finds a cycle in O(n) time but costs O(n) extra space to remember up to n node references. Since the answer is just yes or no, can you detect a repeated node without remembering every node you have already seen?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'output-boolean',
      question: 'What the output actually requires shapes how much work you need to do. The output is true or false — just whether a cycle exists. This means you…',
      highlight: { location: 'description', text: 'return <code>true</code> if the list contains a cycle, or <code>false</code> otherwise.' },
      options: [
        { label: 'Must find where the cycle starts', isCorrect: false, feedback: 'Finding the cycle entry point is a harder variant of this problem. Here you only need to detect presence — true or false — which is simpler and allows earlier termination.' },
        { label: 'Only need to detect presence, not location', isCorrect: true },
        { label: 'Must return the length of the cycle', isCorrect: false, feedback: 'Cycle length is not asked for. The output is a boolean — stop as soon as you have enough information to say yes or no.' },
        { label: 'Must count how many nodes are in the cycle', isCorrect: false, feedback: 'Node count is irrelevant to a boolean output. Detection is the only goal — you can return true the moment you confirm a cycle exists.' },
      ],
      correctFeedback: 'Detection only — you can return true the instant you confirm a cycle, without knowing where it starts or how long it is.',
      wrongFeedback: [
        'The return type is a boolean. What is the minimum information you need to produce that output?',
        'You need to answer "does a cycle exist?" — not "where does it start" or "how big is it." The simplest confirmation of a cycle is enough.',
      ],
    },
    {
      id: 'constraint-no-end',
      question: 'Recognizing what a signal rules out saves you from writing code that never terminates. In a cyclic list, following next pointers never reaches null. This means a simple traversal…',
      options: [
        { label: 'Terminates when it revisits a value', isCorrect: false, feedback: 'Node values are not unique — a list can have repeated values without a cycle. You need to detect revisiting a node by identity, not by value.' },
        { label: 'Loops forever without a termination condition', isCorrect: true },
        { label: 'Terminates at the tail node automatically', isCorrect: false, feedback: 'A cyclic list has no tail — the last node points back into the list. There is no null to terminate on, which is exactly why naive traversal is insufficient.' },
        { label: 'Can use index bounds to stop', isCorrect: false, feedback: 'A linked list has no index bounds — you follow pointers, not indices. With n ≤ 10,000 nodes and a cycle, you\'d traverse indefinitely unless you add a cycle check.' },
      ],
      correctFeedback: 'Without a stopping condition, following next in a cycle never terminates. You need a mechanism that detects revisiting — either tracking seen nodes or using two pointers that catch each other.',
      wrongFeedback: [
        'If the list has a cycle, what does following next pointers eventually do?',
        'There\'s no null to land on in a cycle. You need a way to notice you\'re going in circles — without storing every visited node.',
      ],
    },
    {
      id: 'floyd-algorithm-signal',
      question: 'Explicit algorithm names in a problem statement are a direct signal about the intended complexity. The problem explicitly says "use Floyd\'s fast and slow pointer algorithm." This implies the intended space complexity is…',
      highlight: { location: 'description', text: 'Use Floyd\'s fast and slow pointer algorithm.' },
      options: [
        { label: 'O(n) — store all visited nodes', isCorrect: false, feedback: 'Storing visited nodes in a set detects cycles in O(n) time but O(n) space. Floyd\'s algorithm achieves O(n) time with O(1) space — two pointers, no storage.' },
        { label: 'O(1) — two pointers, no extra storage', isCorrect: true },
        { label: 'O(log n) — binary search on positions', isCorrect: false, feedback: 'Binary search doesn\'t apply to cycle detection in a linked list — there\'s no random access or sorted order to exploit. Floyd\'s is a linear scan with two pointers.' },
        { label: 'O(n²) — compare every pair of nodes', isCorrect: false, feedback: 'Comparing every pair of nodes would be O(n²) time and O(1) space, but Floyd\'s is O(n) time — it only needs two passes at most around the cycle to detect a meeting point.' },
      ],
      correctFeedback: 'Floyd\'s algorithm uses exactly two pointers — slow moves one step, fast moves two. They meet inside the cycle if and only if one exists. O(1) space, O(n) time.',
      wrongFeedback: [
        'Floyd\'s algorithm uses only two variables — slow and fast. What does that tell you about extra space usage?',
        'Two integer pointers is O(1) space. Floyd\'s trades the set of visited nodes for a mathematical guarantee: in a cycle, a faster pointer always laps the slower one.',
      ],
    },
    {
      id: 'pos-guarantee',
      question: 'Constraints define exactly what signals you can rely on for termination. pos is -1 or a valid node index. pos = -1 means no cycle. This guarantees…',
      highlight: { location: 'constraint', text: 'pos is -1 or a valid node index' },
      options: [
        { label: 'You must handle corrupted lists with invalid pointers', isCorrect: false, feedback: 'pos is always -1 or a valid index — there are no invalid pointer values in the input. The guarantee simplifies the problem: null means no cycle, and any non-null tail connection is valid.' },
        { label: 'Null termination is the only no-cycle signal', isCorrect: true },
        { label: 'The cycle always begins at the head', isCorrect: false, feedback: 'pos can be any valid index — the cycle can start anywhere, not just at index 0. The example with pos = 1 shows a cycle that starts mid-list.' },
        { label: 'Fast pointer always reaches null in two steps', isCorrect: false, feedback: 'The fast pointer only reaches null when there is no cycle. In a cyclic list it never reaches null — it keeps moving through the cycle indefinitely until it catches the slow pointer.' },
      ],
      correctFeedback: 'When there is no cycle (pos = -1), the tail\'s next is null. The fast pointer reaches null and you return false. When there is a cycle, null is unreachable — the pointers loop until they meet.',
      wrongFeedback: [
        'What does it mean for a linked list to have no cycle in terms of pointer values?',
        'No cycle means the tail\'s next is null — that\'s the termination signal. A cycle means null is never reached, so fast and slow meeting each other is your only termination signal.',
      ],
    },
  ],
  solutionCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

class Solution:
    def has_cycle(self, head):
        slow, fast = head, head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                return True
        return False`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'The loop guard checks <code>fast and fast.next</code> — both, not just <code>fast</code> — because <code>fast.next.next</code> would otherwise crash the instant <code>fast.next</code> is <code>None</code> on a list with no cycle.',
  solutionExplanation: 'Two pointers walk the same list at different speeds — one step at a time for <code>slow</code>, two for <code>fast</code>. If there\'s no cycle, <code>fast</code> simply runs off the end first. If there is one, both pointers are stuck circling the same loop forever, and a faster runner lapping a slower one on a closed track is *guaranteed* to eventually land on it exactly — that meeting point is the proof of a cycle, no extra memory of visited nodes required.',
}
