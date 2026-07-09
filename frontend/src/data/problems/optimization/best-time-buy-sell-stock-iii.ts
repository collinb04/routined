export default {
  id: 'best-time-buy-sell-stock-iii',
  title: 'Best Time to Buy and Sell Stock III',
  difficulty: 'hard',
  description: 'Given stock prices, find the maximum profit using at most 2 transactions. You must sell before you buy again.',
  examples: [
    { input: 'prices = [3,3,5,0,0,3,1,4]', output: '6', explanation: 'Buy day 4 (price 0), sell day 6 (price 3): profit 3. Buy day 7 (price 1), sell day 8 (price 4): profit 3. Total = 6.' },
    { input: 'prices = [1,2,3,4,5]', output: '4', explanation: 'Buy day 1, sell day 5: profit 4.' },
  ],
  constraints: ['1 ≤ prices.length ≤ 10⁵', '0 ≤ prices[i] ≤ 10⁵'],
  starterCode: `def max_profit(prices):
  pass`,
  functionName: 'max_profit',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Two transactions', args: [[3,3,5,0,0,3,1,4]], expected: 6 },
    { label: 'One transaction', args: [[1,2,3,4,5]], expected: 4 },
    { label: 'Descending', args: [[7,6,4,3,1]], expected: 0 },
  ],
  bruteHint: 'Describe the recursive approach that tries every possible pair of non-overlapping buy/sell intervals and explain why exploring them all is too slow.',
  optimizeHint: 'Name the two things the DP state needs to track at each day — how many transactions you\'ve used, and whether you\'re currently holding — so overlapping subproblems are solved once.',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'prices.length ≤ 10⁵ tells you…',
      options: [
        { label: 'O(n²) is fine',           isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion operations — far too slow. The constraint rules out quadratic approaches.' },
        { label: 'O(n) or O(n log n) needed', isCorrect: true },
        { label: 'O(n³) is acceptable',      isCorrect: false, feedback: 'At n = 100,000, O(n³) is a quintillion operations. Even O(n²) doesn\'t fit — the constraint demands sub-quadratic solutions.' },
        { label: 'Input size is irrelevant', isCorrect: false, feedback: 'Input size always shapes your complexity budget. At n = 100,000, you must rule out quadratic and worse before choosing an approach.' },
      ],
      correctFeedback: 'At n = 100,000, O(n²) is 10 billion operations — too slow. You need an O(n) or O(n log n) solution.',
      wrongFeedback: [
        'At n = 100,000, square it: how many operations does a nested loop take?',
        '100,000² = 10 billion. That\'s too slow in any language. The constraint demands at most O(n log n).',
      ],
    },
    {
      id: 'transaction-cap',
      question: '"At most 2 transactions" means…',
      options: [
        { label: 'You must make exactly 2 transactions',          isCorrect: false, feedback: '"At most 2" includes using 0 or 1 transaction. If prices only fall, the best answer is 0 profit — you don\'t have to transact.' },
        { label: 'You track state for 0, 1, and 2 transactions used', isCorrect: true },
        { label: 'You always use both transactions for maximum profit', isCorrect: false, feedback: 'More transactions don\'t guarantee more profit. In [1,2,3,4,5], one transaction (buy day 1, sell day 5) beats two smaller ones.' },
        { label: 'You can use greedy — always buy low, sell high',     isCorrect: false, feedback: 'A local greedy buy/sell ignores the cap. Spending a transaction on a small gain early might prevent a larger gain later — the cap means each transaction is a limited resource.' },
      ],
      correctFeedback: 'The cap means transactions are a limited resource. Your state must track how many you\'ve used so far — at each point, you\'re in one of five states: 0 held/sold, 1 held/sold, 2 sold.',
      wrongFeedback: [
        'If you\'re limited to 2 uses, each transaction decision affects whether a future opportunity is still available. What does your state need to encode?',
        'With a fixed budget of 2 transactions, you need to track how many you\'ve spent. At each price, the optimal action depends on transactions remaining.',
      ],
    },
    {
      id: 'sell-before-buy',
      question: '"You must sell before you buy again" means…',
      options: [
        { label: 'You can hold multiple positions simultaneously',   isCorrect: false, feedback: 'The constraint explicitly forbids overlapping positions. You must fully exit a position (sell) before opening a new one (buy).' },
        { label: 'Your two transactions cannot overlap in time',      isCorrect: true },
        { label: 'You must complete transaction 1 before day n/2',   isCorrect: false, feedback: 'There\'s no calendar constraint on when each transaction happens. The only rule is that the buy of transaction 2 must come after the sell of transaction 1.' },
        { label: 'Transactions must be on consecutive days',          isCorrect: false, feedback: 'You can hold for any number of days between buy and sell. The constraint is ordering — sell before re-buying — not timing.' },
      ],
      correctFeedback: 'The two transactions partition the timeline: you\'re either in transaction 1, between transactions, or in transaction 2. They cannot run concurrently.',
      wrongFeedback: [
        'If you buy a second time before selling the first, what does "sell before buy" forbid?',
        'The constraint means the sell of trade 1 must precede the buy of trade 2. The timeline is strictly sequential.',
      ],
    },
    {
      id: 'state-tracking',
      question: 'To maximize profit with at most 2 transactions, what states do you need to track at each price?',
      options: [
        { label: 'Just the current running profit',                   isCorrect: false, feedback: 'A single profit value loses the information about whether you\'re holding stock and how many transactions you\'ve used. You need to distinguish states to make optimal decisions.' },
        { label: 'Best profit for each (transactions used, holding) combo', isCorrect: true },
        { label: 'The two lowest prices and two highest prices seen',  isCorrect: false, feedback: 'Global min/max pairs work for single-transaction problems. With 2 transactions and an ordering constraint, later cheap buys can be better than the global min, depending on what\'s left to sell.' },
        { label: 'All pairs of (buy day, sell day) with 2 transactions', isCorrect: false, feedback: 'Enumerating all valid day-pairs is O(n²) — too slow at n = 100,000. You need to carry forward optimal values, not enumerate.' },
      ],
      correctFeedback: 'You have 5 meaningful states: after 0 transactions (baseline), holding after buy 1, after sell 1, holding after buy 2, after sell 2. Updating all five in one pass gives you O(n).',
      wrongFeedback: [
        'At each price, your decision depends on whether you\'re holding stock and how many transactions you\'ve completed. How many distinct situations is that?',
        'Two transaction slots × (holding or not) gives you four active states, plus a baseline — five total. Tracking the best profit for each is all you need.',
      ],
    },
  ],
}
