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
  bruteHint: 'Describe the naive recursion where each player tries taking from either end of the remaining piles, and why the same subintervals get re-evaluated by different move sequences',
  optimizeHint: 'Name the interval DP state — the score advantage over piles[i..j] — that caches results for each subinterval',
  clues: [
    {
      id: 'even-length-guarantee',
      question: 'piles.length is always even. What strategic insight does this unlock for Alice?',
      options: [
        { label: 'Alice can always pick the largest available pile', isCorrect: false, feedback: 'Greedily picking the largest end isn\'t always optimal. Alice\'s advantage comes from the parity structure, not from immediate value maximization.' },
        { label: 'Alice can always guarantee a win by choosing parity', isCorrect: true },
        { label: 'Bob always wins if the last pile is large', isCorrect: false, feedback: 'With even-length arrays, Alice — going first — controls which parity she picks (even-indexed or odd-indexed piles). She can always choose the dominant parity.' },
        { label: 'The result depends only on the first and last pile', isCorrect: false, feedback: 'The full structure matters for the DP, even though the trivial observation (Alice always wins) follows from parity. The result doesn\'t depend on just two piles.' },
      ],
      correctFeedback: 'With an even number of piles, Alice can pre-commit to taking all even-indexed or all odd-indexed piles — whichever sum is larger. Every move Bob makes gives Alice the opportunity to continue that strategy.',
      wrongFeedback: [
        'With piles.length even, label each pile as "even-indexed" or "odd-indexed." Can Alice guarantee she always picks from one of those groups?',
        'Alice goes first. She can pick the left or right end. Whichever she picks, the next ends Bob faces will again be the opposite parity. Alice controls which half she collects.',
      ],
    },
    {
      id: 'minimax-state',
      question: 'Both players play optimally. What does the DP state need to capture?',
      options: [
        { label: 'Only Alice\'s total stones accumulated', isCorrect: false, feedback: 'Alice maximizes and Bob minimizes Alice\'s gain. You need to track the net advantage, not just one player\'s total — Bob\'s optimal counter-play must be accounted for.' },
        { label: 'The interval [i, j] of remaining piles and whose turn it is', isCorrect: false, feedback: 'Turn can be inferred from the interval length — Alice goes when (j-i+1) has the same parity as the original array length. Many implementations track dp[i][j] as the score difference (current player minus other), which embeds turn implicitly.' },
        { label: 'The score difference between current player and opponent over piles[i..j]', isCorrect: true },
        { label: 'The sum of all remaining piles', isCorrect: false, feedback: 'The sum alone doesn\'t tell you the optimal distribution between players. The DP needs to capture how much more the current player can guarantee versus the opponent.' },
      ],
      correctFeedback: 'dp[i][j] = maximum score advantage the current player can guarantee over the opponent on piles[i..j]. Alice wins if dp[0][n-1] > 0.',
      wrongFeedback: [
        'The current player takes from the left or right end and then becomes the "other player." What value should dp[i][j] return that makes both players\' choices consistent?',
        'dp[i][j] = the net gain (current player minus opponent) from playing optimally on piles[i..j]. Taking pile[i] gives piles[i] - dp[i+1][j]; taking piles[j] gives piles[j] - dp[i][j-1].',
      ],
    },
    {
      id: 'interval-dp-order',
      question: 'dp[i][j] depends on dp[i+1][j] and dp[i][j-1]. In what order must you fill the table?',
      options: [
        { label: 'Row by row, left to right', isCorrect: false, feedback: 'Row by row (increasing i) fills dp[0][j] before dp[1][j], but dp[0][j] depends on dp[1][j] — which hasn\'t been filled yet. Row order doesn\'t work.' },
        { label: 'By increasing interval length', isCorrect: true },
        { label: 'Column by column, top to bottom', isCorrect: false, feedback: 'Column order (increasing j) fills dp[i][0] before dp[i][1], but both dp[i+1][j] and dp[i][j-1] are needed. Column order doesn\'t guarantee both prerequisites are ready.' },
        { label: 'Any order, since the base cases anchor everything', isCorrect: false, feedback: 'Order matters. dp[i][j] for longer intervals depends on shorter intervals. You must compute length-1 intervals first, then length-2, up to length-n.' },
      ],
      correctFeedback: 'Base cases: dp[i][i] = piles[i] (one pile, take it). Then fill by increasing length: length 2, 3, ..., n. Each dp[i][j] is ready when its two shorter sub-intervals are already computed.',
      wrongFeedback: [
        'dp[i][j] needs dp[i+1][j] (shorter by 1 from the left) and dp[i][j-1] (shorter by 1 from the right). What fills those first?',
        'Shorter intervals are needed before longer ones. Fill all intervals of length 1 first, then length 2, then 3, up to n. That\'s bottom-up interval DP.',
      ],
    },
  ],
}
