export default {
  id: 'middle-of-linked-list',
  title: 'Middle of the Linked List',
  difficulty: 'easy',
  description: 'Given the head of a singly linked list, return the middle node. If there are two middle nodes, return the second one.',
  examples: [
    { input: 'head = [1,2,3,4,5]', output: '[3,4,5]', explanation: 'The middle node is 3.' },
    { input: 'head = [1,2,3,4,5,6]', output: '[4,5,6]', explanation: 'Two middles: 3 and 4. Return second middle.' },
  ],
  constraints: ['1 ≤ list length ≤ 100', '1 ≤ Node.val ≤ 100'],
  starterCode: `def middle_node(head):
  slow = fast = head
  while fast and fast.next:
      slow = slow.next
      fast = fast.next.next
  return slow`,
  functionName: 'middle_node',
  conceptId: 'linked-list',
  testCases: [
    { label: 'Odd length', args: [[1,2,3,4,5]], expected: [3,4,5] },
    { label: 'Even length', args: [[1,2,3,4,5,6]], expected: [4,5,6] },
    { label: 'Single', args: [[1]], expected: [1] },
  ],
  clues: [
    {
      id: 'no-random-access',
      question: 'A singly linked list has no length property and no index access. Finding the middle by index requires…',
      options: [
        { label: 'One pass — middle is at index length // 2', isCorrect: false, feedback: 'You don\'t know the length without traversing first. Finding length // 2 takes one full pass, then a second pass to reach that index — that\'s two passes total, not one.' },
        { label: 'Two passes — one to count length, one to reach middle', isCorrect: true },
        { label: 'No traversal — check head.next.next', isCorrect: false, feedback: 'Checking head.next.next only works for a 3-node list. For an arbitrary-length list you cannot compute the middle without traversal.' },
        { label: 'A sort to bring the median to the middle', isCorrect: false, feedback: 'Sorting by value has nothing to do with structural middle position. The middle is determined by list length, not node values.' },
      ],
      correctFeedback: 'Without length information, the naive approach is: count all nodes in one pass, then walk to index length // 2 in a second pass. The starter code\'s two-pointer approach achieves the same in one pass.',
      wrongFeedback: [
        'A linked list doesn\'t store its length. To find index length // 2, what do you need to know first?',
        'You need the length, which costs one full traversal. Then you need a second traversal to reach the middle node. That\'s the two-pass baseline — can you do it in one?',
      ],
    },
    {
      id: 'even-length-tie-break',
      question: '"If there are two middle nodes, return the second one." For a 6-node list [1,2,3,4,5,6], the output is [4,5,6]. This means…',
      options: [
        { label: 'Always return the node at index length // 2 - 1', isCorrect: false, feedback: 'Index length // 2 - 1 = 2 for a 6-node list, pointing to node 3 — the first middle, not the second. The spec says return the second, which is at index length // 2.' },
        { label: 'For even-length lists, prefer the right of the two middles', isCorrect: true },
        { label: 'Count nodes and divide by 2, rounding down', isCorrect: false, feedback: 'Rounding down gives the first middle node. For 6 nodes, 6 // 2 = 3, which is index 3 (0-based) = node 4 — actually correct here, but the rule is ceiling division, not floor.' },
        { label: 'Return the last node for even-length lists', isCorrect: false, feedback: 'The last node is not the middle — it\'s the tail. For [1,2,3,4,5,6] the answer is node 4, not node 6.' },
      ],
      correctFeedback: 'For even-length lists, two nodes are equidistant from both ends. The problem specifies the right one. In the two-pointer approach, the slow pointer naturally lands on the second middle when fast reaches the end.',
      wrongFeedback: [
        'For a 6-node list, position 3 (0-based) is node 4. Position 2 is node 3. Which does the spec want?',
        'The spec wants the right middle — index ceil(n/2) - 1 in 0-based terms, or equivalently n // 2. Verify your off-by-one: does your approach land on node 3 or node 4 for a 6-node list?',
      ],
    },
    {
      id: 'fast-slow-pointer-signal',
      question: 'The starter code uses slow and fast pointers — slow moves one step, fast moves two. When fast reaches the end, slow is at the middle. This approach uses…',
      options: [
        { label: 'O(n) time and O(n) space', isCorrect: false, feedback: 'The two-pointer approach uses O(1) space — just two pointer variables. No auxiliary storage grows with list length.' },
        { label: 'O(n) time and O(1) space', isCorrect: true },
        { label: 'O(log n) time because fast skips nodes', isCorrect: false, feedback: 'Fast moves two steps per iteration, but the loop still runs n/2 times — O(n) total. Doubling the step size doesn\'t reduce the asymptotic time complexity.' },
        { label: 'O(n) time and O(n) space for tracking positions', isCorrect: false, feedback: 'No positions are stored — the two-pointer technique uses a fixed number of pointer variables regardless of list length. That\'s O(1) space.' },
      ],
      correctFeedback: 'Two pointer variables, one pass: O(n) time and O(1) space. Fast reaches null after n/2 iterations, and slow has advanced exactly n/2 steps — landing on the middle.',
      wrongFeedback: [
        'How many variables does the two-pointer approach use beyond the input list itself?',
        'Two pointers — slow and fast. That\'s O(1) extra space. The loop runs n/2 times, so O(n) time.',
      ],
    },
    {
      id: 'termination-condition',
      question: 'The loop condition is `while fast and fast.next`. Why must you check fast.next and not just fast?',
      options: [
        { label: 'fast.next prevents the loop from running on a single node', isCorrect: false, feedback: 'For a single node, fast is non-null so the first condition holds. fast.next is null so the loop exits immediately — that\'s correct behavior, but the reason to check fast.next is about even-length lists.' },
        { label: 'fast.next.next would crash if fast.next is null', isCorrect: true },
        { label: 'fast.next is only needed when the list has even length', isCorrect: false, feedback: 'fast.next is needed on every iteration: if fast.next is null, executing fast.next.next raises an AttributeError. The check is a guard against dereferencing null, not a special case for even length.' },
        { label: 'slow must not advance past the middle node', isCorrect: false, feedback: 'The loop condition controls when to stop, but the reason for checking fast.next specifically is to prevent fast.next.next from crashing on the next line when fast.next is null.' },
      ],
      correctFeedback: 'Inside the loop, fast moves to fast.next.next. If fast.next is null, that dereference crashes. Checking fast.next before the loop body ensures fast can safely take two steps.',
      wrongFeedback: [
        'Inside the loop you write fast = fast.next.next. What happens if fast.next is None at that point?',
        'None.next raises AttributeError. Checking fast.next in the condition guards against that — the loop exits before fast attempts an invalid double step.',
      ],
    },
  ],
}
