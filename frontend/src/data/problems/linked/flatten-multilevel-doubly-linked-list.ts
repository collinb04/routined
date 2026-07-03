export default {
  id: 'flatten-multilevel-doubly-linked-list',
  title: 'Flatten a Multilevel Doubly Linked List',
  difficulty: 'medium',
  description: 'A doubly linked list can have a <code>child</code> pointer that points to another doubly linked list. Flatten the list so that all nodes appear in a single-level doubly linked list.',
  examples: [
    { input: 'head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]', output: '[1,2,3,7,8,11,12,9,10,4,5,6]' },
  ],
  constraints: ['List nodes are between 1 and 1000', '1 ≤ Node.val ≤ 10⁵'],
  starterCode: `def flatten(head):
  pass`,
  functionName: 'flatten',
  conceptId: 'linked-list',
  testCases: [
    { label: 'Single level', args: [[1,2,3]], expected: [1,2,3] },
  ],
}
