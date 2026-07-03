export default {
  id: 'last-stone-weight',
  title: 'Last Stone Weight',
  difficulty: 'easy',
  description: `<p>You are given an array of integers <code>stones</code> where <code>stones[i]</code> is the weight of the <code>i</code>th stone. We play a game: on each turn we smash the two heaviest stones. If they have equal weight both are destroyed; otherwise the smaller one is destroyed and the larger one's weight is reduced by the smaller. Return the weight of the last remaining stone, or 0 if none remain.</p>`,
  examples: [
    { input: 'stones = [2,7,4,1,8,1]', output: '1' },
    { input: 'stones = [1]', output: '1' },
  ],
  constraints: ['1 <= stones.length <= 30', '1 <= stones[i] <= 1000'],
  starterCode: `def last_stone_weight(stones):
  pass`,
  functionName: 'last_stone_weight',
  conceptId: 'heap',
  testCases: [
    { label: '[2,7,4,1,8,1]', args: [[2,7,4,1,8,1]], expected: 1 },
    { label: 'single', args: [[1]], expected: 1 },
  ],
}
