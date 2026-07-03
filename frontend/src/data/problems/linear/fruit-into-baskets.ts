export default {
  id: 'fruit-into-baskets',
  title: 'Fruit Into Baskets',
  difficulty: 'medium',
  description: 'You have two baskets and a fruit-type array. Starting from any position, you must pick fruits moving right, but each basket can hold only one type of fruit. Return the maximum fruits you can collect.',
  examples: [
    { input: 'fruits = [1,2,1]', output: '3', explanation: 'Pick all three fruits.' },
    { input: 'fruits = [0,1,2,2]', output: '3', explanation: 'Pick fruits 1,2,2.' },
  ],
  constraints: ['1 ≤ fruits.length ≤ 10⁵', '0 ≤ fruits[i] < fruits.length'],
  starterCode: `def total_fruit(fruits):
  pass`,
  functionName: 'total_fruit',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'All unique max 3', args: [[1,2,1]], expected: 3 },
    { label: 'Sliding window', args: [[0,1,2,2]], expected: 3 },
    { label: 'Three types', args: [[1,2,3,2,2]], expected: 4 },
    { label: 'Single type', args: [[1,1,1]], expected: 3 },
  ],
}
