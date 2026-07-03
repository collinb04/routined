export default {
  id: 'candy',
  title: 'Candy',
  difficulty: 'hard',
  description: 'Children with ratings stand in a line. Each child must receive at least one candy. Children with a higher rating than their neighbor must get more candies. Return the minimum total candies needed.',
  examples: [
    { input: 'ratings = [1,0,2]', output: '5', explanation: '[2,1,2] candies are the minimum.' },
    { input: 'ratings = [1,2,2]', output: '4', explanation: '[1,2,1] candies.' },
  ],
  constraints: ['n == ratings.length', '1 ≤ n ≤ 2 × 10⁴', '0 ≤ ratings[i] ≤ 2 × 10⁴'],
  starterCode: `def candy(ratings):
  pass`,
  functionName: 'candy',
  conceptId: 'greedy',
  testCases: [
    { label: 'Valley', args: [[1,0,2]], expected: 5 },
    { label: 'Equal at end', args: [[1,2,2]], expected: 4 },
    { label: 'Single', args: [[5]], expected: 1 },
    { label: 'Ascending', args: [[1,2,3]], expected: 6 },
  ],
}
