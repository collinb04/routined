export default {
  id: 'best-time-buy-sell-stock-iv',
  title: 'Best Time to Buy and Sell Stock IV',
  difficulty: 'hard',
  description: 'Given stock prices and integer <code>k</code>, find the maximum profit using at most <code>k</code> transactions. You must sell before you buy again.',
  examples: [
    { input: 'k=2, prices=[2,4,1]', output: '2', explanation: 'Buy on day 1, sell on day 2. Profit = 2.' },
    { input: 'k=2, prices=[3,2,6,5,0,3]', output: '7', explanation: 'Buy on day 2, sell day 3 (profit 4); buy day 5, sell day 6 (profit 3).' },
  ],
  constraints: ['1 ≤ k ≤ 100', '1 ≤ prices.length ≤ 1000', '0 ≤ prices[i] ≤ 1000'],
  starterCode: `def max_profit(k, prices):
  pass`,
  functionName: 'max_profit',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'k=2, simple', args: [2,[2,4,1]], expected: 2 },
    { label: 'k=2, standard', args: [2,[3,2,6,5,0,3]], expected: 7 },
    { label: 'k=0', args: [0,[1,2,3]], expected: 0 },
  ],
}
