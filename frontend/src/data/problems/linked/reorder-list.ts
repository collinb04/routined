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
  bruteHint: 'Describe storing references to every node in an array so you can jump to indices from both ends',
  optimizeHint: 'Name the combination of pointer techniques — finding the middle, reversing a half, and merging — that solves this in place',
  clues: [
    {
      id: 'interleaving-pattern',
      question: 'The pattern is L0 → Ln → L1 → Ln-1 → .... This interleaves the front half with the reversed back half. What three-step approach does this suggest?',
      options: [
        { label: 'Sort by distance from both ends simultaneously', isCorrect: false, feedback: 'Sorting doesn\'t produce this pattern — node Ln must come right after L0, which is a structural transformation, not a sort key. The interleaving requires you to combine two specific sub-sequences.' },
        { label: 'Find middle, reverse second half, merge the two halves', isCorrect: true },
        { label: 'Copy values into an array, reorder, write back', isCorrect: false, feedback: 'Copying values violates the constraint that you may not modify node values — you must rewire the nodes themselves. Also, writing values back into the original nodes circumvents the in-place pointer work.' },
        { label: 'Swap adjacent nodes repeatedly until the pattern emerges', isCorrect: false, feedback: 'Adjacent swaps don\'t produce this pattern efficiently — you\'d need multiple passes. The direct approach splits the list at the middle, reverses the back half, then interleaves.' },
      ],
      correctFeedback: 'Step 1: find the middle with fast/slow pointers. Step 2: reverse the second half. Step 3: merge the two halves by interleaving. Each step is O(n), making the whole operation O(n) time and O(1) space.',
      wrongFeedback: [
        'The output for [1,2,3,4] is [1,4,2,3]. Where do the values 4 and 3 come from in relation to the original list?',
        'They come from the end of the list, in reverse order. If you reverse the second half [3,4] to get [4,3], then merge [1,2] and [4,3] by alternating, you get [1,4,2,3].',
      ],
    },
    {
      id: 'no-value-modification',
      question: '"You may not modify the values in the list\'s nodes. Only nodes themselves may be changed." This means…',
      options: [
        { label: 'Collect all values into an array and write them back in reorder', isCorrect: false, feedback: 'Writing reordered values back into nodes modifies node values — exactly what the constraint forbids. You must move the actual node objects by rewiring their next pointers.' },
        { label: 'Rewire next pointers to achieve the new ordering', isCorrect: true },
        { label: 'Values never need to change — the constraint is trivially satisfied', isCorrect: false, feedback: 'The constraint actively rules out a common shortcut. Without it, you could load values into an array, reorder them, and write back — no pointer work needed. The constraint forces genuine node manipulation.' },
        { label: 'Create new nodes with reordered values and replace the old ones', isCorrect: false, feedback: 'Creating new nodes also uses O(n) extra space and sidesteps the pointer-manipulation challenge. The constraint means reuse the existing nodes exactly as they are — just change where their next pointers point.' },
      ],
      correctFeedback: 'Every node in the output is the same Python object as in the input — only the next pointers change. This forces you to actually splice and rewire the list rather than treating it as a value container.',
      wrongFeedback: [
        'If you can\'t change values, how do you move node L4 to position 2 in the output list?',
        'You change what node L1\'s next points to (now L4), and what L4\'s next points to (now L2). The node objects stay the same; the wiring changes.',
      ],
    },
    {
      id: 'constraint-large-n',
      question: 'Up to 5 × 10⁴ nodes tells you…',
      options: [
        { label: 'O(n²) is fine — 50,000 nodes is small', isCorrect: false, feedback: 'O(n²) at n = 50,000 is 2.5 billion operations — far too slow for Python, which handles roughly 10 million simple operations per second. You need O(n).' },
        { label: 'O(n) time is required; naive re-scanning is too slow', isCorrect: true },
        { label: 'Use O(n) extra space to simplify the logic', isCorrect: false, feedback: 'O(n) space (e.g. a deque of all nodes) would work at this scale, but the three-step approach — find middle, reverse, merge — does it in O(1) space. Extra space is not required.' },
        { label: 'Recursion is the clearest approach', isCorrect: false, feedback: 'Python\'s default recursion limit is 1,000. With up to 50,000 nodes, a recursive approach would hit that limit. An iterative implementation is needed.' },
      ],
      correctFeedback: 'n = 50,000 rules out O(n²). The find-middle + reverse-second-half + merge approach is three O(n) passes — O(n) total, O(1) space. Each step is a clean linear traversal.',
      wrongFeedback: [
        'At n = 50,000, how many operations does an O(n²) algorithm perform?',
        '2.5 billion — far too slow. Each of the three steps (find middle, reverse, merge) is a single O(n) pass, so the combined cost is O(n).',
      ],
    },
    {
      id: 'second-half-reversal',
      question: 'To merge L0…Lm with Ln…Lm+1 in the interleaved pattern, the second half must be reversed. Why can\'t you interleave without reversing first?',
      options: [
        { label: 'The second half is in sorted order and needs reordering', isCorrect: false, feedback: 'Sort order is irrelevant here — the reversal is not about values. Without reversing, you can\'t access Ln first; you\'d be interleaving Lm+1 (the start of the second half) before Ln.' },
        { label: 'Without reversal you\'d interleave from the middle outward, not from the ends inward', isCorrect: true },
        { label: 'Linked lists can only be traversed forward', isCorrect: false, feedback: 'That\'s exactly why reversal is needed — forward traversal of an unreversed second half gives you Lm+1, Lm+2, …, Ln in that order. Reversing it gives Ln, Ln-1, … so you can interleave from the end inward.' },
        { label: 'Reversal is only needed for odd-length lists', isCorrect: false, feedback: 'Both even and odd-length lists require reversal of the second half. For [1,2,3,4] the second half [3,4] reversed is [4,3], enabling the output [1,4,2,3].' },
      ],
      correctFeedback: 'Forward traversal gives Lm+1 first, but the pattern needs Ln first. Reversing the second half turns [Lm+1, …, Ln] into [Ln, …, Lm+1], so a simple forward merge from both halves produces the correct interleaved order.',
      wrongFeedback: [
        'For [1,2,3,4], the second half is [3,4]. If you interleave [1,2] with [3,4] without reversing, what do you get?',
        '[1,3,2,4] — wrong order. The expected output is [1,4,2,3]. Reversing [3,4] to [4,3] before merging gives the correct result.',
      ],
    },
  ],
}
