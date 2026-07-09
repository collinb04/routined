export default {
  id: 'best-time-buy-sell-stock-ii',
  title: 'Best Time to Buy and Sell Stock II',
  difficulty: 'medium',
  description: 'Given an integer array <code>prices</code> where <code>prices[i]</code> is the price of a stock on day <code>i</code>, find the maximum profit you can achieve. You may complete as many transactions as you like (buy then sell, then buy again).',
  examples: [
    { input: 'prices = [7,1,5,3,6,4]', output: '7', explanation: 'Buy on day 2 (price 1) and sell on day 3 (price 5) for profit 4. Then buy on day 4 (price 3) and sell on day 5 (price 6) for profit 3. Total = 7.' },
  ],
  constraints: ['1 ≤ prices.length ≤ 3 × 10⁴', '0 ≤ prices[i] ≤ 10⁴'],
  starterCode: `def max_profit(prices):
  pass`,
  functionName: 'max_profit',
  conceptId: 'arrays',
  testCases: [
    { label: 'Multiple transactions', args: [[7,1,5,3,6,4]], expected: 7 },
    { label: 'Ascending', args: [[1,2,3,4,5]], expected: 4 },
    { label: 'Descending', args: [[7,6,4,3,1]], expected: 0 },
  ],
  bruteHint: 'Describe checking every pair of buy and sell days and its time complexity',
  optimizeHint: 'Name the single-pass technique that captures profit from price movements without picking specific buy/sell days upfront',
  clues: [
    {
      id: 'unlimited-transactions',
      question: '"You may complete as many transactions as you like." How does this change the strategy versus a single-transaction problem?',
      options: [
        { label: 'Find the single best buy-sell pair', isCorrect: false, feedback: 'The single best pair misses multiple profitable windows. In [7,1,5,3,6,4] the single best pair (buy at 1, sell at 6) gives 5, but two trades give 7.' },
        { label: 'Capture every upward price movement', isCorrect: true },
        { label: 'Sort prices to find optimal buy/sell days', isCorrect: false, feedback: 'Sorting loses the time ordering — you must buy before you sell, so day indices matter.' },
        { label: 'Buy once, sell multiple times', isCorrect: false, feedback: 'You must sell before buying again. You can hold at most one share at a time, so "sell multiple times" from a single buy is not valid.' },
      ],
      correctFeedback: 'With unlimited trades you can collect every positive day-over-day difference. The sum of all gains where prices[i+1] > prices[i] equals the maximum achievable profit.',
      wrongFeedback: [
        'Compare [1,5,3,6]: one trade gives at most 5. Two trades (1→5, 3→6) give 7. What pattern lets you capture both gains?',
        'Every time tomorrow is higher than today, you profit from that day. Can you collect all such one-day gains independently?',
      ],
    },
    {
      id: 'greedy-correctness',
      question: 'Summing every positive consecutive difference gives the optimal profit. Why is this greedy approach provably correct?',
      options: [
        { label: 'Because prices are sorted', isCorrect: false, feedback: 'Prices are not sorted — they are in chronological order. The greedy works for a different reason.' },
        { label: 'Any multi-day gain equals the sum of its single-day gains', isCorrect: true },
        { label: 'It works only when prices are strictly increasing', isCorrect: false, feedback: 'The approach works for any price sequence. A decreasing segment simply contributes zero positive differences, which are skipped.' },
        { label: 'The optimal solution always uses exactly two trades', isCorrect: false, feedback: 'The number of optimal trades depends on the input. [1,2,3,4,5] yields maximum profit with one trade, but capturing all up-moves (sum of day-gains = 4) gives the same result.' },
      ],
      correctFeedback: 'profit(day i to day j) = prices[j] - prices[i] = sum of (prices[t+1] - prices[t]) for t from i to j-1. Collecting each positive segment is equivalent to the best possible multi-trade plan.',
      wrongFeedback: [
        'Think about [1,3,5]: one trade from 1 to 5 yields 4. Two trades (1→3, 3→5) also yield 4. Are they equivalent?',
        'Any gain over k days can be decomposed into k one-day gains. Does collecting each positive one-day gain produce the same total?',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is a single integer — the maximum profit. What does this tell you about the algorithm\'s result?',
      options: [
        { label: 'Return the list of days to buy and sell', isCorrect: false, feedback: 'The problem only asks for the profit amount, not the specific transaction days. Tracking days adds complexity without contributing to the answer.' },
        { label: 'Accumulate a running profit total', isCorrect: true },
        { label: 'Return the highest and lowest prices', isCorrect: false, feedback: 'Max price minus min price gives the best single-trade profit, which may be less than the multi-trade optimum.' },
        { label: 'Return a ratio of gains to losses', isCorrect: false, feedback: 'The problem specifies profit as a sum of dollar differences, not a ratio.' },
      ],
      correctFeedback: 'A single accumulator is all you need — add prices[i] - prices[i-1] whenever it is positive, skip otherwise. No tracking of transaction boundaries is necessary.',
      wrongFeedback: [
        'The return value is just one number. Does your approach need to store anything beyond that single accumulating sum?',
        'You never need to know which specific days you traded — only whether each consecutive difference was positive. How simple does that make the implementation?',
      ],
    },
  ],
}
