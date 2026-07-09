export default {
  id: 'integer-break',
  title: 'Integer Break',
  difficulty: 'medium',
  description: 'Given an integer <code>n</code>, break it into the sum of at least two positive integers and maximize the product of those integers. Return the maximum product.',
  examples: [
    { input: 'n = 2', output: '1', explanation: '2 = 1 + 1 → product = 1.' },
    { input: 'n = 10', output: '36', explanation: '10 = 3 + 3 + 4 → product = 36.' },
  ],
  constraints: ['2 ≤ n ≤ 58'],
  starterCode: `def integer_break(n):
  pass`,
  functionName: 'integer_break',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'n=2', args: [2], expected: 1 },
    { label: 'n=10', args: [10], expected: 36 },
    { label: 'n=4', args: [4], expected: 4 },
    { label: 'n=3', args: [3], expected: 2 },
  ],
  bruteHint: 'Describe the naive recursion that tries every split j + (n-j) for each n, and why the same smaller n values get recomputed repeatedly',
  optimizeHint: 'Name what you\'d cache — the best product for each integer up to n — to avoid recomputing smaller subproblems',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 58 tells you…',
      options: [
        { label: 'You need a logarithmic algorithm', isCorrect: false, feedback: 'At n = 58, even an exponential brute-force would be fast. The small bound makes logarithmic complexity irrelevant — any polynomial approach will work.' },
        { label: 'Almost any approach works; focus on correctness', isCorrect: true },
        { label: 'O(n²) will be too slow', isCorrect: false, feedback: 'O(n²) at n = 58 is just 3,364 operations — negligible. The constraint is very permissive.' },
        { label: 'Input size is irrelevant', isCorrect: false, feedback: 'Input size is always relevant — here it\'s telling you that even simple O(n²) DP is fine without any further optimization.' },
      ],
      correctFeedback: 'n ≤ 58 is tiny. An O(n²) DP runs in under 3,400 steps. The constraint gives you full freedom to focus on the math and structure, not performance.',
      wrongFeedback: [
        'What does worst-case look like at n = 58 for O(n²)? Is there any reason to worry about speed?',
        'n = 58 means O(n²) is 3,364 operations. That\'s essentially instant — any polynomial algorithm works.',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is the maximum product of parts that sum to n. What does "maximize a product" suggest?',
      options: [
        { label: 'Enumerate all integer partitions and pick the best', isCorrect: false, feedback: 'The number of integer partitions grows rapidly — at n = 58 it\'s in the millions. DP finds the optimum without enumerating them all.' },
        { label: 'The problem has an optimal substructure suitable for DP', isCorrect: true },
        { label: 'Greedily pick the largest piece each time', isCorrect: false, feedback: 'Greedy doesn\'t work here — taking the largest piece first (e.g., taking 57 from 58) gives a product of 57, but splitting into 3s and 4s gives 36 × something far larger.' },
        { label: 'Use logarithms to convert product maximization to sum maximization', isCorrect: false, feedback: 'While log converts products to sums mathematically, that approach is not needed here — the DP recurrence directly computes the maximum product at each integer.' },
      ],
      correctFeedback: 'Maximizing a product over sub-parts means the best split at n depends on optimal splits at smaller integers — that\'s optimal substructure, the core DP signal.',
      wrongFeedback: [
        'If you split n into pieces, the best product at n depends on what? Can those smaller results be reused?',
        'The maximum product of parts summing to n depends on the maximum products of smaller integers. That reuse is the hallmark of DP.',
      ],
    },
    {
      id: 'at-least-two-parts',
      question: '"Break it into the sum of at least two positive integers." What edge case does this create?',
      options: [
        { label: 'n itself can be kept unsplit as one of the parts', isCorrect: false, feedback: 'The problem requires at least two parts — n cannot be left unsplit. That\'s the defining constraint of the problem.' },
        { label: 'For small n, the best product may be less than n', isCorrect: true },
        { label: 'You must use exactly two parts', isCorrect: false, feedback: '"At least two" means two or more — you\'re not constrained to exactly two. The optimal may use many parts (e.g., n=10 uses three: 3+3+4).' },
        { label: 'Parts must be distinct integers', isCorrect: false, feedback: 'Parts can repeat — 10 = 3+3+4 uses 3 twice. The problem has no uniqueness constraint on the parts.' },
      ],
      correctFeedback: 'Right — for n=2, the only valid split is 1+1, giving product 1, which is less than n. The constraint forces you to break it even when breaking reduces the product.',
      wrongFeedback: [
        'What happens with n=2? You must split — what\'s the only option, and is the result larger or smaller than n?',
        '"At least two" means you can\'t return n unchanged. For small n, forced splits may give a product smaller than n itself.',
      ],
    },
    {
      id: 'subproblem-structure',
      question: 'To find the maximum product for n, you can try every split n = j + (n-j) for j from 1 to n-1. What does this imply?',
      options: [
        { label: 'The solution is purely mathematical — no DP needed', isCorrect: false, feedback: 'While a math shortcut exists (use 3s), the DP approach works generally for any n. The split structure confirms the problem has optimal substructure.' },
        { label: 'dp[n] depends on dp values at smaller integers', isCorrect: true },
        { label: 'You need a 2D DP table for the two parts', isCorrect: false, feedback: 'Each split n = j + (n-j) reduces to one-dimensional results — the maximum product at j and at n-j. You don\'t need a 2D table.' },
        { label: 'You must try all splits simultaneously', isCorrect: false, feedback: 'You try splits one at a time and take the max. Bottom-up DP builds up from small integers so each dp[j] is already available when you need it.' },
      ],
      correctFeedback: 'Each split gives two parts whose optimal products are already computed for smaller n. dp[n] = max over j of j * dp[n-j] and j * (n-j), building bottom-up.',
      wrongFeedback: [
        'If you split n into j and (n-j), what do you need to know about (n-j)? Is that result needed more than once?',
        'dp[n-j] is reused across many values of n. Bottom-up DP computes each once, making every split lookup O(1).',
      ],
    },
  ],
}
