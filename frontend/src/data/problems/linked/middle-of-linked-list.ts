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
}
