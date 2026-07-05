export default {
  id: 'palindrome-linked-list',
  title: 'Palindrome Linked List',
  difficulty: 'easy',
  description: 'Given the head of a singly linked list, return <code>true</code> if it is a palindrome or <code>false</code> otherwise. Try to use O(1) extra space.',
  examples: [
    { input: 'head = [1,2,2,1]', output: 'true' },
    { input: 'head = [1,2]', output: 'false' },
  ],
  constraints: ['1 ≤ list length ≤ 10⁵', '0 ≤ Node.val ≤ 9'],
  starterCode: `def is_palindrome(head):
  vals = []
  cur = head
  while cur:
      vals.append(cur.val)
      cur = cur.next
  pass`,
  functionName: 'is_palindrome',
  conceptId: 'linked-list',
  testCases: [
    { label: 'Palindrome', args: [[1,2,2,1]], expected: true },
    { label: 'Not palindrome', args: [[1,2]], expected: false },
    { label: 'Single', args: [[1]], expected: true },
    { label: 'Odd palindrome', args: [[1,2,1]], expected: true },
  ],
  clues: [
    {
      id: 'constraint-large-n',
      question: 'List length up to 10⁵. The starter code copies values into an array. What does "try to use O(1) extra space" imply about that approach?',
      options: [
        { label: 'The array approach is preferred — it\'s simpler', isCorrect: false, feedback: 'The array approach uses O(n) space — up to 100,000 entries. The problem explicitly asks you to try O(1) space, which means avoiding any structure that grows with list length.' },
        { label: 'The array uses O(n) space; O(1) requires working in place', isCorrect: true },
        { label: 'O(1) space is impossible for palindrome checking', isCorrect: false, feedback: 'O(1) space palindrome checking is possible on a linked list: find the middle, reverse the second half in place, compare the two halves, then optionally restore the list.' },
        { label: 'At n = 10⁵, an array of values is too large to allocate', isCorrect: false, feedback: 'A list of 100,000 integers is trivially small in memory — it\'s not a memory concern. The O(1) goal is about algorithmic discipline: avoid auxiliary structures that scale with input size.' },
      ],
      correctFeedback: 'The array approach works and is O(n) space. The O(1) in-place approach: find the middle with fast/slow pointers, reverse the second half, compare front and back halves. No extra storage needed.',
      wrongFeedback: [
        'The array vals grows to hold every node\'s value — up to 100,000 entries. What complexity is that?',
        'O(n) space. The hint asks for O(1), which means no auxiliary array. The only way to compare the first and second halves without extra storage is to reverse one of them in place.',
      ],
    },
    {
      id: 'palindrome-comparison-challenge',
      question: 'A singly linked list only has next pointers — you can\'t traverse backward. To compare the first and second halves…',
      options: [
        { label: 'Compare node i with node (n - 1 - i) by index', isCorrect: false, feedback: 'Linked lists don\'t support index access — reaching node (n - 1 - i) requires a full traversal each time, making this O(n²). There is no direct "reach node by index" operation.' },
        { label: 'Reverse the second half so you can compare forward from both ends', isCorrect: true },
        { label: 'Use a set to record seen values', isCorrect: false, feedback: 'A set records which values exist but not their order or positions. Palindrome checking requires positional comparison — value at index i must equal value at index n-1-i.' },
        { label: 'Sort the list and check if it equals its reverse', isCorrect: false, feedback: 'Sorting destroys the original order, which is exactly what you need to check. A palindrome is defined by positional symmetry — sorting erases that information.' },
      ],
      correctFeedback: 'Reverse the second half in place. Now you have two sub-lists starting from the same direction — walk both simultaneously and compare values. When they diverge, return false; if you reach the end, return true.',
      wrongFeedback: [
        'You need to compare node 1 with the last node, node 2 with the second-to-last, and so on. How do you reach the "last" and "second-to-last" nodes without backward traversal?',
        'Make the second half traversable forward by reversing it. Then two pointers — one from the original head, one from the reversed-half head — advance together for the comparison.',
      ],
    },
    {
      id: 'find-middle-prerequisite',
      question: 'Before reversing the second half, you must find the middle of the list. For a list of length n, the second half starts at…',
      options: [
        { label: 'Node at index n - 1', isCorrect: false, feedback: 'Index n - 1 is the last node, not the start of the second half. For [1,2,2,1] (n = 4), the second half starts at index 2 (value 2), not index 3 (value 1).' },
        { label: 'Node at index n // 2 (the second middle for even-length lists)', isCorrect: true },
        { label: 'The node immediately after the head', isCorrect: false, feedback: 'The node after the head is index 1 — near the beginning, not the middle. You need index n // 2 to split the list evenly.' },
        { label: 'Any node works — palindrome is symmetric', isCorrect: false, feedback: 'You must split at the exact middle. Reversing from the wrong point leaves part of the first half unreversed or skips part of the second half, giving wrong comparisons.' },
      ],
      correctFeedback: 'Fast/slow pointers find the middle in O(n) time and O(1) space. For [1,2,2,1], slow lands on the second 2 (index 2) — the start of the second half to reverse.',
      wrongFeedback: [
        'For a 4-node palindrome [1,2,2,1], which node is the first node of the second half?',
        'Index 2 — the second 2. Fast/slow pointers: slow moves one step, fast moves two. When fast reaches the end, slow is at the split point.',
      ],
    },
    {
      id: 'values-0-to-9',
      question: 'Node values are in [0, 9] — single digits. This signals…',
      options: [
        { label: 'Use digit sum to check palindrome in O(1)', isCorrect: false, feedback: 'Digit sum is not a palindrome check — [1,2,1] and [1,1,2] have the same digit sum but different palindrome status. Positional comparison is required regardless of value range.' },
        { label: 'Values are simple to compare — no special equality logic needed', isCorrect: true },
        { label: 'Sort values to find the median efficiently', isCorrect: false, feedback: 'Sorting destroys positional information. The value range [0,9] doesn\'t suggest sorting — it just means each value is a single digit and integer comparison is straightforward.' },
        { label: 'Use a frequency count to detect the palindrome', isCorrect: false, feedback: 'Frequency counting can verify that each value appears an even number of times (necessary but not sufficient for a palindrome). Positional ordering still matters — [1,2,1] is a palindrome but [1,1,2] is not, despite the same counts.' },
      ],
      correctFeedback: 'Values in [0,9] are small integers — == comparison is all you need. The value range is not the key signal here; the constraint mainly tells you not to worry about overflow or complex equality.',
      wrongFeedback: [
        'With values only in [0,9], is there anything unusual about how you compare two node values for equality?',
        'No — standard integer equality works. The value range is a simplifying constraint: no negative numbers, no large integers, just single digits.',
      ],
    },
  ],
}
