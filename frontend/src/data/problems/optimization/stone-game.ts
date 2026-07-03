export default {
  id: 'stone-game',
  title: 'Stone Game',
  difficulty: 'medium',
  description: 'Alice and Bob take turns picking stones from either end of a row (Alice goes first). Each pile has a certain number of stones. The player with the most stones wins. Return <code>true</code> if Alice always wins.',
  examples: [
    { input: 'piles = [5,3,4,5]', output: 'true', explanation: 'Alice can always guarantee a win.' },
  ],
  constraints: ['2 ≤ piles.length ≤ 500', 'piles.length is even', '1 ≤ piles[i] ≤ 500'],
  starterCode: `def stone_game(piles):
  pass`,
  functionName: 'stone_game',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Alice wins', args: [[5,3,4,5]], expected: true },
    { label: 'Alice wins always', args: [[1,2,3,4]], expected: true },
  ],
}
