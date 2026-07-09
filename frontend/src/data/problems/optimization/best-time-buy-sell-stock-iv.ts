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
  bruteHint: 'Describe the recursive approach that branches into buy/sell/skip at every day up to k times, re-exploring the same day/transaction combinations, and why that\'s exponential.',
  optimizeHint: 'Name the two things the DP state needs to track — day and transactions used (plus holding status) — to memoize away the repeated subproblems.',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'k ≤ 100 and prices.length ≤ 1000. What complexity does this permit?',
      options: [
        { label: 'O(n) only — k is a constant',          isCorrect: false, feedback: 'k is a variable input, not a fixed constant. An O(n) solution ignoring k would be wrong for k = 1 vs k = 50. You need k in your complexity.' },
        { label: 'O(k × n) is the natural target',        isCorrect: true },
        { label: 'O(n²) regardless of k',                isCorrect: false, feedback: 'O(n²) ignores k, which is a core part of the problem. The natural structure is iterating over transactions and prices — that\'s O(k × n).' },
        { label: 'O(k² × n²) is acceptable',             isCorrect: false, feedback: 'At k = 100 and n = 1000, O(k² × n²) is 10 billion operations — too slow. The constraints suggest O(k × n) = 100,000 operations is the target.' },
      ],
      correctFeedback: 'At k = 100 and n = 1000, O(k × n) = 100,000 operations — very fast. This is the natural complexity of a DP table indexed by (transaction count, day).',
      wrongFeedback: [
        'The two variables are k and n. At their maximums, what does k × n equal? What about k² × n²?',
        'k × n = 100,000. k² × n² = 10 billion. The constraints are sized for O(k × n).',
      ],
    },
    {
      id: 'k-as-resource',
      question: 'k is the maximum number of transactions allowed. What does treating k as a resource imply?',
      options: [
        { label: 'You must use exactly k transactions',             isCorrect: false, feedback: '"At most k" permits using fewer. If k = 100 but there are only 2 profitable opportunities, you\'d use 2 — spending extra transactions gains nothing.' },
        { label: 'Each transaction slot has a cost — spend wisely', isCorrect: true },
        { label: 'Always use all k transactions for maximum profit', isCorrect: false, feedback: 'More transactions don\'t guarantee more profit. A redundant buy-and-immediately-sell nets zero. The cap means each transaction slot is finite — you should only spend one on a genuinely profitable trade.' },
        { label: 'Sort prices to find the best k pairs',            isCorrect: false, feedback: 'Sorting destroys time ordering. Buy must precede sell, and transactions must be non-overlapping — you can\'t find the best k pairs without respecting the sequential constraint.' },
      ],
      correctFeedback: 'Treating k as a resource means your state tracks transactions remaining. At each day, you decide whether it\'s worth spending one transaction slot on the current opportunity.',
      wrongFeedback: [
        'If you have a budget of k "purchases," how does that budget shrink as you trade? What should you track?',
        'Each buy consumes one of your k slots. The DP state (transactions left, holding or not) lets you make optimal spend decisions at each price.',
      ],
    },
    {
      id: 'k-upper-bound',
      question: 'When k ≥ n/2, you can complete any number of profitable trades. What does this special case let you do?',
      options: [
        { label: 'Use a different algorithm entirely',              isCorrect: true },
        { label: 'Return 0 — no trades are possible',              isCorrect: false, feedback: 'k ≥ n/2 means the transaction cap is no longer binding — you can take every profitable day-to-day gain. That\'s a reason for more profit, not zero.' },
        { label: 'The k cap still limits your trades',             isCorrect: false, feedback: 'With k ≥ n/2, you can never exhaust your transaction budget — there are at most n/2 non-overlapping buy/sell pairs in an array of length n. The cap is effectively unlimited.' },
        { label: 'You must handle k ≥ n/2 the same as k = 1',     isCorrect: false, feedback: 'k = 1 means one transaction maximum; k ≥ n/2 means unlimited. These require completely different strategies — unlimited allows capturing every upswing.' },
      ],
      correctFeedback: 'When k ≥ n/2, the cap is never binding. You can switch to a greedy approach: sum every positive day-to-day difference. This avoids building a full k × n DP table.',
      wrongFeedback: [
        'At most n/2 non-overlapping trades fit in n days. If k exceeds that, can the cap ever restrict you?',
        'When the cap can\'t bind, you don\'t need to track transactions at all — just capture every profitable price increase greedily.',
      ],
    },
    {
      id: 'dp-dimensions',
      question: 'The problem has two varying quantities: transactions used and days elapsed. What does this suggest about your DP table?',
      options: [
        { label: 'A 1D array indexed by day',                       isCorrect: false, feedback: 'A 1D array loses the transaction dimension. At the same day, you might have used 1 or 3 transactions — those lead to different available profits, so they\'re different states.' },
        { label: 'A 2D table: dp[transaction][day]',                isCorrect: true },
        { label: 'A 1D array indexed by transaction count',         isCorrect: false, feedback: 'Transaction count alone ignores which day you\'re on. The same number of transactions at day 2 vs day 8 leaves very different remaining opportunities.' },
        { label: 'No table needed — compute profit mathematically', isCorrect: false, feedback: 'There\'s no closed-form formula for arbitrary k and price sequences. The ordering and non-overlap constraints require tracking state across days.' },
      ],
      correctFeedback: 'dp[j][i] = best profit using at most j transactions through day i. With k up to 100 and n up to 1000, the table is 100 × 1000 = 100,000 cells.',
      wrongFeedback: [
        'Your decisions depend on both how many transactions you\'ve used and what day it is. How many dimensions does that require?',
        'Two independent quantities that both affect the answer mean a 2D state space. One axis for transactions used, one for position in the price array.',
      ],
    },
  ],
}
