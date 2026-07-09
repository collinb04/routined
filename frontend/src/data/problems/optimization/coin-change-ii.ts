export default {
  id: 'coin-change-ii',
  title: 'Coin Change II',
  difficulty: 'medium',
  description: 'Given an amount and a list of coin denominations, return the number of combinations that make up that amount.',
  examples: [
    { input: 'amount=5, coins=[1,2,5]', output: '4', explanation: '5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1.' },
    { input: 'amount=3, coins=[2]', output: '0', explanation: 'Cannot make 3 with coins of 2.' },
  ],
  constraints: ['1 ≤ coins.length ≤ 300', '1 ≤ coins[i] ≤ 5000', '0 ≤ amount ≤ 5000'],
  starterCode: `def change(amount, coins):
  pass`,
  functionName: 'change',
  conceptId: 'dp-2d',
  testCases: [
    { label: '4 ways', args: [5,[1,2,5]], expected: 4 },
    { label: 'No solution', args: [3,[2]], expected: 0 },
    { label: 'amount=0', args: [0,[1,2,3]], expected: 1 },
  ],
  bruteHint: 'Describe the recursive approach that tries every combination of coins (with repetition) toward the amount, and explain why the same remaining amounts get re-explored many times.',
  optimizeHint: 'Name the 2D state — which coin you\'re considering and how much amount remains — you can tabulate so each subproblem is solved once.',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'coins.length ≤ 300 and amount ≤ 5000. What complexity does this suggest?',
      options: [
        { label: 'O(amount) only — coins don\'t matter', isCorrect: false, feedback: 'Coin denominations are part of the state. An approach that doesn\'t consider which coins are available can\'t distinguish between amount=5 with coins=[2] (0 ways) versus coins=[1,2,5] (4 ways).' },
        { label: 'O(coins × amount) is the target',      isCorrect: true },
        { label: 'O(amount²) regardless of coins',       isCorrect: false, feedback: 'Squaring amount would give 25 million operations and ignores the coin dimension. The two variables — 300 coins and 5000 amount — suggest a 2D DP indexed by both.' },
        { label: 'O(2^coins) — enumerate subsets',       isCorrect: false, feedback: 'At coins.length = 300, O(2^300) is astronomically large. Enumeration of coin subsets is not the structure here — coins can be reused, so it\'s not a subset problem.' },
      ],
      correctFeedback: 'O(coins × amount) = 300 × 5000 = 1.5 million operations. That\'s the natural cost of a 2D DP table: one axis per coin, one per sub-amount.',
      wrongFeedback: [
        'Two variables both affect the answer: the coin being considered and the amount remaining. How many dimensions does that suggest?',
        'With 300 coins and amount up to 5000, a table of size 300 × 5000 = 1.5 million cells covers everything.',
      ],
    },
    {
      id: 'combinations-not-permutations',
      question: 'The output is the number of combinations, not permutations. What does this mean for [1,2] summing to 3?',
      options: [
        { label: '[1,2] and [2,1] are both counted',     isCorrect: false, feedback: 'Those are the same combination — just in different order. Combinations don\'t care about order, so 1+2 and 2+1 count as one way, not two.' },
        { label: '[1,2] and [2,1] count as one way',     isCorrect: true },
        { label: 'Every ordering of every coin multiset counts', isCorrect: false, feedback: 'That would be a permutation count. The problem asks for combinations — unordered selections. For amount=3 with [1,2], only {1,2} and {1,1,1} count, giving 2 ways.' },
        { label: 'Coins must be used in sorted order',   isCorrect: false, feedback: 'There\'s no restriction on the order you pick coins. The "combination" distinction is about what you count — not what order you process them.' },
      ],
      correctFeedback: 'Combinations are order-independent. The trick to avoid double-counting is processing coins one at a time: for each coin denomination, extend existing subtotals — you never revisit a coin you\'ve already "decided on."',
      wrongFeedback: [
        'For amount=3 with coins=[1,2], how many combinations are there? Would [1,2] and [2,1] represent different real-world coin selections?',
        'Unordered means the multiset of coins matters, not their sequence. Two orderings of the same coins are one combination.',
      ],
    },
    {
      id: 'unbounded-reuse',
      question: '"Coins of different denominations" — the problem doesn\'t say each coin is used at most once. What does unlimited reuse imply?',
      options: [
        { label: 'You track how many of each coin remains', isCorrect: false, feedback: 'There\'s no finite supply to track. With unlimited coins, you only need to know which denominations exist — not how many of each are left.' },
        { label: 'Each denomination can contribute multiple times', isCorrect: true },
        { label: 'Treat it as a 0/1 knapsack — each coin used once', isCorrect: false, feedback: 'A 0/1 knapsack uses each item at most once. Here coins are unlimited — that\'s the unbounded knapsack variant, and the DP transition differs.' },
        { label: 'Only the largest coin should be reused',  isCorrect: false, feedback: 'Greedy reuse of the largest coin fails for many cases. With coins=[3,5] and amount=11, using the largest (5+5+??) doesn\'t work — you need 3+3+5.' },
      ],
      correctFeedback: 'Unlimited reuse means when building combinations for a sub-amount, you can use the same denomination more than once. In the DP, after considering coin c for amount a, you can still use c again for a larger amount.',
      wrongFeedback: [
        'With coins=[5] and amount=10, the answer is 1: {5,5}. If each coin could only be used once, what would the answer be?',
        'Unlimited reuse means the DP for amount a can draw on the same coin that was already used for a smaller sub-amount.',
      ],
    },
    {
      id: 'amount-zero-base-case',
      question: '"0 ≤ amount" is in the constraints. What does amount=0 mean for the answer?',
      options: [
        { label: 'Return -1 — no coins can be selected',  isCorrect: false, feedback: 'amount=0 has exactly one valid combination: the empty selection. -1 would signal impossibility, but zero amount is always achievable.' },
        { label: 'Return 1 — the empty combination counts', isCorrect: true },
        { label: 'Return 0 — nothing was combined',        isCorrect: false, feedback: 'There is one way to make amount 0: use no coins. That\'s a valid combination. Return 0 would mean "impossible," which is wrong here.' },
        { label: 'Return coins.length — all coins are options', isCorrect: false, feedback: 'No coins are needed for amount=0. The answer is 1 regardless of how many denominations exist.' },
      ],
      correctFeedback: 'dp[0] = 1 is the canonical base case: one way to make amount 0 (use nothing). Every larger sub-amount builds on this foundation.',
      wrongFeedback: [
        'How many ways can you select coins that sum to exactly 0? Is the empty selection a valid combination?',
        'One way: select nothing. This base case is the seed from which all other counts grow in the bottom-up DP.',
      ],
    },
  ],
}
