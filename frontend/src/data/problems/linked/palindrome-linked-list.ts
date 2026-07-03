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
}
