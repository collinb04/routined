export default {
  id: 'sort-list',
  title: 'Sort List',
  difficulty: 'medium',
  description: 'Given the head of a linked list, return the list sorted in ascending order. Try to achieve O(n log n) time and O(1) space using merge sort.',
  examples: [
    { input: 'head = [4,2,1,3]', output: '[1,2,3,4]' },
    { input: 'head = [-1,5,3,4,0]', output: '[-1,0,3,4,5]' },
  ],
  constraints: ['0 ≤ list length ≤ 5 × 10⁴', '-10⁵ ≤ Node.val ≤ 10⁵'],
  starterCode: `def sort_list(head):
  pass`,
  functionName: 'sort_list',
  conceptId: 'linked-list',
  testCases: [
    { label: 'Four nodes', args: [[4,2,1,3]], expected: [1,2,3,4] },
    { label: 'With negatives', args: [[-1,5,3,4,0]], expected: [-1,0,3,4,5] },
    { label: 'Empty', args: [[]], expected: [] },
    { label: 'Already sorted', args: [[1,2,3]], expected: [1,2,3] },
  ],
}
