export default {
  id: 'boats-to-save-people',
  title: 'Boats to Save People',
  difficulty: 'medium',
  description: 'Each boat can carry at most 2 people and a total weight of <code>limit</code>. Given the weights of people, return the minimum number of boats needed.',
  examples: [
    { input: 'people=[1,2], limit=3', output: '1', explanation: 'Both can ride in one boat.' },
    { input: 'people=[3,2,2,1], limit=3', output: '3', explanation: '(1,2),(2),(3).' },
  ],
  constraints: ['1 ≤ people.length ≤ 5 × 10⁴', '1 ≤ people[i] ≤ limit ≤ 3 × 10⁴'],
  starterCode: `def num_rescue_boats(people, limit):
  pass`,
  functionName: 'num_rescue_boats',
  conceptId: 'greedy',
  testCases: [
    { label: 'Two fit', args: [[1,2],3], expected: 1 },
    { label: 'Three boats', args: [[3,2,2,1],3], expected: 3 },
    { label: 'All alone', args: [[3,3,3,3],3], expected: 4 },
    { label: 'All together', args: [[1,1,1,1],4], expected: 2 },
  ],
}
