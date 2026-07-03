export default {
  id: 'coin-change',
  title: 'Coin Change',
  difficulty: 'medium',
  description: `<p>You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount cannot be made up by any combination of the coins, return <code>-1</code>.</p>`,
  examples: [
    { input: 'coins = [1,5,11], amount = 15', output: '3 (5+5+5)' },
    { input: 'coins = [2], amount = 3', output: '-1' },
  ],
  constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
  starterCode: `def coin_change(coins, amount):
  pass`,
  functionName: 'coin_change',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'amount=15', args: [[1,5,11], 15], expected: 3 },
    { label: 'impossible', args: [[2], 3], expected: -1 },
    { label: 'amount=0', args: [[1], 0], expected: 0 },
  ],
}
