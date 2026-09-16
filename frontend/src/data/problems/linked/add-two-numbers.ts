export default {
  id: 'add-two-numbers',
  title: 'Add Two Numbers',
  difficulty: 'medium',
  description: `<p>You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each node contains a single digit. Add the two numbers and return the sum as a linked list.</p>`,
  examples: [
    { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8] (342 + 465 = 807)' },
    { input: 'l1 = [0], l2 = [0]', output: '[0]' },
  ],
  constraints: ['The number of nodes in each linked list is in [1, 100]', '0 <= Node.val <= 9', 'The lists represent numbers with no leading zeros'],
  starterCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

class Solution:
    def add_two_numbers(self, l1, l2):
        pass`,
  functionName: 'add_two_numbers_run',
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
def add_two_numbers_run(l1, l2):
  return _tol(Solution().add_two_numbers(_ton(l1), _ton(l2)))`,
  testCases: [
    { label: '342+465', args: [[2,4,3],[5,6,4]], expected: [7,0,8] },
    { label: '0+0', args: [[0],[0]], expected: [0] },
    { label: '999+99', args: [[9,9,9,9,9,9,9],[9,9,9,9]], expected: [8,9,9,9,0,0,0,1] },
  ],
  bruteHint: 'A brute-force approach walks each list to reconstruct its full integer value, adds the two integers together, then walks the sum apart again into a new list of digits — three full passes over data that can be up to 100 digits long. It works because Python integers have arbitrary precision, but it treats the linked list purely as a slow way to store a number instead of using its structure. What would happen to this approach in a language with fixed-width integers, and why walk the data three times when addition could happen inline?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'reversed-storage',
      question: 'How data is laid out often tells you which traversal order actually works. "The digits are stored in reverse order." What does this mean for how you traverse the lists?',
      highlight: { location: 'description', text: 'The digits are stored in reverse order, and each node contains a single digit.' },
      options: [
        { label: 'Reverse both lists first', isCorrect: false, feedback: 'Reversing the lists before adding undoes the problem\'s own design — the reversed order is exactly what makes head-to-head traversal add least-significant digits first, which is how addition works.' },
        { label: 'Traverse head-to-tail; digits are already in addition order', isCorrect: true },
        { label: 'Buffer all the digits first, then process them from the last one back to the first', isCorrect: false, feedback: 'A stack would re-reverse the digits, giving you most-significant first — the wrong direction for column-by-column addition.' },
        { label: 'Convert to integers, add, then re-encode', isCorrect: false, feedback: 'With up to 100 nodes per list, the numbers can have 100 digits — far beyond standard integer range. You need to add digit by digit.' },
      ],
      correctFeedback: 'Because the least-significant digit is at the head, you can walk both lists from the start and add pairs of digits exactly as pencil-and-paper column addition works.',
      wrongFeedback: [
        'The head of each list is the ones digit. In what order do you add digits when doing column addition by hand?',
        'Column addition starts at the ones place and moves left. Which end of these lists holds the ones digit?',
      ],
    },
    {
      id: 'output-structure',
      question: 'How you\'re asked to produce the output shapes how much extra work you\'ll do. The output is a linked list, not an integer. What does this tell you about how to produce the result?',
      highlight: { location: 'description', text: 'return the sum as a linked list' },
      options: [
        { label: 'Compute the full integer sum, then convert', isCorrect: false, feedback: 'Numbers up to 100 digits exceed Python\'s default int only in other languages, but building the result node-by-node is more direct and avoids an unnecessary conversion step.' },
        { label: 'Build result nodes digit by digit as you add', isCorrect: true },
        { label: 'Return the longer input list with modifications', isCorrect: false, feedback: 'The sum can have more digits than either input — 999...9 (100 nines) plus any positive number produces a 101-digit result. You need a fresh list.' },
        { label: 'Collect all the digits first, then build the result afterward', isCorrect: false, feedback: 'An intermediate array works but adds an extra pass. You can emit each result node the moment you compute that digit\'s sum.' },
      ],
      correctFeedback: 'As you walk the two lists and add digit pairs, you can create a new result node for each digit immediately. A dummy head simplifies attaching the first node.',
      wrongFeedback: [
        'You\'re already walking the lists one digit at a time. What can you create at each step without waiting for the full sum?',
        'Each addition step produces exactly one output digit. What structure lets you append that digit in O(1) as you go?',
      ],
    },
    {
      id: 'carry-propagation',
      question: 'Concrete examples often expose edge cases that rule out an incomplete approach. The test case 999...9 (7 nines) + 9999 (4 nines) produces [8,9,9,9,0,0,0,1] — 8 nodes from 7 and 4. What does this imply?',
      options: [
        { label: 'Output length equals the longer list\'s length', isCorrect: false, feedback: 'That test case produces 8 nodes from lists of length 7 and 4. A carry out of the final column can add an extra node.' },
        { label: 'A carry after the last pair may need a new node', isCorrect: true },
        { label: 'Stop as soon as both pointers reach null', isCorrect: false, feedback: 'If both pointers are null but a carry remains, you must append one more node with value 1. Stopping early drops the most-significant digit.' },
        { label: 'Pad the shorter list with zeros before adding', isCorrect: false },
      ],
      correctFeedback: 'After exhausting both lists, a leftover carry of 1 must become a new tail node. Forgetting this case produces an off-by-one length error on inputs like all-nines.',
      wrongFeedback: [
        'Seven nines plus four nines sums to a number with eight digits. Where does that extra digit come from?',
        'After you\'ve processed the last pair of nodes, what state variable might still be non-zero?',
      ],
    },
    {
      id: 'unequal-lengths',
      question: 'Recognizing input variations like this tells you what edge-case handling your loop can\'t skip. The two lists can have different lengths (e.g., 7 nodes vs. 4 nodes). How does your loop need to handle the shorter list running out?',
      highlight: { location: 'constraint', text: 'The number of nodes in each linked list is in [1, 100]' },
      options: [
        { label: 'Treat missing nodes as contributing 0', isCorrect: true },
        { label: 'Stop when the shorter list ends', isCorrect: false, feedback: 'Stopping at the shorter list drops all remaining digits of the longer list and any carry — the result would be wrong for any case where the lists differ in length.' },
        { label: 'Pad the shorter list with leading-zero nodes first', isCorrect: false, feedback: 'Physically inserting zero nodes before traversal works but wastes time. You can simply treat a null pointer as contributing 0 to that column\'s sum.' },
        { label: 'Reverse the longer list to align lengths', isCorrect: false },
      ],
      correctFeedback: 'When one pointer goes null, use 0 for that side\'s digit and continue until both pointers are null and no carry remains. No preprocessing needed.',
      wrongFeedback: [
        'What is the numeric value of a missing digit in column addition — for example, adding 342 and 99?',
        'A null pointer means no more digits on that side. What value should a missing digit contribute to the column sum?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def add_two_numbers(self, l1, l2):
        dummy = ListNode()
        curr = dummy
        carry = 0
        while l1 or l2 or carry:
            v1 = l1.val if l1 else 0
            v2 = l2.val if l2 else 0
            total = v1 + v2 + carry
            carry = total // 10
            curr.next = ListNode(total % 10)
            curr = curr.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None
        return dummy.next`,
  solutionComplexity: { time: 'O(max(m, n))', space: 'O(max(m, n))' },
  solutionCaveat: 'The loop condition includes <code>or carry</code> — without it, a final leftover carry (like the 1 in 999+99=1098) would be silently dropped once both input lists run out, even though it still needs its own extra digit in the result.',
  solutionExplanation: 'Because both numbers are stored least-significant-digit-first, they can be added exactly the way column addition works on paper — one digit position at a time, left to right through the lists — with a running carry folded into the next column\'s sum. A dummy head node avoids special-casing the first digit of the result, and treating a missing digit as 0 lets lists of different lengths be walked together without extra branching.',
}
