export default {
  id: 'combination-sum-iii',
  title: 'Combination Sum III',
  difficulty: 'medium',
  description: 'Find all valid combinations of <code>k</code> numbers that sum up to <code>n</code> using only numbers 1-9, where each number is used at most once. Return all combinations in sorted order.',
  examples: [
    { input: 'k=3, n=7', output: '[[1,2,4]]', explanation: '1+2+4=7 is the only valid combination.' },
    { input: 'k=3, n=9', output: '[[1,2,6],[1,3,5],[2,3,4]]' },
  ],
  constraints: ['2 ≤ k ≤ 9', '1 ≤ n ≤ 60'],
  starterCode: `def combination_sum3(k, n):
  pass`,
  functionName: 'combination_sum3',
  conceptId: 'backtracking',
  testCases: [
    { label: 'k=3, n=7', args: [3,7], expected: [[1,2,4]] },
    { label: 'k=3, n=9', args: [3,9], expected: [[1,2,6],[1,3,5],[2,3,4]] },
    { label: 'Impossible', args: [3,1], expected: [] },
  ],
  clues: [
    {
      id: 'fixed-digit-pool',
      question: '"Using only numbers 1-9, where each number is used at most once." What does the fixed, small pool tell you about the search space?',
      options: [
        { label: 'The solution space is infinite — any integer could appear', isCorrect: false, feedback: 'The candidates are strictly limited to 1–9. You never need to consider 10 or beyond, so the entire search space is a subset of the 9 digits.' },
        { label: 'At most 9 candidates, each usable once — backtrack over them', isCorrect: true },
        { label: 'Use a greedy approach — always pick the largest digit that fits', isCorrect: false, feedback: 'A greedy approach does not enumerate all valid combinations — it finds at most one. With k up to 9 digits, you need exhaustive backtracking to collect every valid combination.' },
        { label: 'Dynamic programming over digits 1–9 and target n', isCorrect: false, feedback: 'DP could work in principle, but with only 9 digits and k ≤ 9 elements per combination, backtracking over this tiny search space is simpler and fast enough.' },
      ],
      correctFeedback: 'With only 9 candidates and combinations of length at most 9, the entire search space has at most C(9,9) = 1 node — tiny. Backtracking over digits 1–9 in order naturally handles both the pool and the "used at most once" rule.',
      wrongFeedback: [
        'The candidates are exactly {1, 2, 3, 4, 5, 6, 7, 8, 9}. How many subsets of size k exist within this pool? Is exhaustive search tractable?',
        'C(9, k) for k ≤ 9 is at most C(9,4) = 126 combinations. Backtracking over 9 digits is trivially fast — no pruning is strictly necessary, though it helps.',
      ],
    },
    {
      id: 'two-termination-conditions',
      question: 'A valid combination requires exactly k numbers that sum to n. What two conditions must both be true to add a combination to the result?',
      options: [
        { label: 'Sum equals n only', isCorrect: false, feedback: 'Sum = n with fewer than k numbers is not a valid answer. k=3, n=7 does not accept [7] — it requires exactly 3 numbers. Both conditions must hold simultaneously.' },
        { label: 'Length equals k only', isCorrect: false, feedback: 'A combination with exactly k numbers but the wrong sum is not valid. For k=3, n=7, the combination [1,2,3] has length 3 but sums to 6 — not a valid answer.' },
        { label: 'Length equals k AND sum equals n', isCorrect: true },
        { label: 'Length equals k OR sum equals n', isCorrect: false, feedback: 'OR is too loose — it would accept [7] (sum correct, length wrong) and [1,2,3] (length correct, sum wrong). You need both conditions satisfied at the same time.' },
      ],
      correctFeedback: 'The base case is: if len(current) == k and sum(current) == n, record it. If either condition fails at that point, discard the branch and backtrack.',
      wrongFeedback: [
        'For k=3, n=7: is [1,6] valid? Is [1,2,3]? What exactly disqualifies each?',
        'You collect a combination only when it simultaneously has k elements and sums to n. Missing either condition means backtrack.',
      ],
    },
    {
      id: 'pruning-opportunities',
      question: 'k ≤ 9 and n ≤ 60. What two pruning conditions let you abandon a branch early?',
      options: [
        { label: 'Stop if the current sum exceeds n, or if more numbers are needed than remain available', isCorrect: true },
        { label: 'Stop only when the sum exceeds n', isCorrect: false, feedback: 'Sum pruning alone does not catch the case where you need, say, 3 more numbers but only 1 digit remains in 1–9. You also need to prune when there are not enough remaining digits to reach k elements.' },
        { label: 'Stop if any digit is repeated', isCorrect: false, feedback: 'Repetition is already prevented by always starting from the next digit in the recursion. The meaningful pruning is sum overflow and insufficient remaining candidates.' },
        { label: 'No pruning is needed given the tiny search space', isCorrect: false, feedback: 'While the search space is small (at most 512 subsets), pruning still matters for correctness and clarity. Continuing to pick digits after the sum exceeds n produces no valid results.' },
      ],
      correctFeedback: 'Two prune conditions: (1) current sum > n — adding more digits only increases it; (2) remaining digits < digits still needed — you cannot reach length k. Both let you break the loop early.',
      wrongFeedback: [
        'If your current sum is already 8 and n = 7, can any valid combination still be built from this branch?',
        'If you need 3 more numbers and your loop is at digit 8, the remaining candidates are {8, 9} — only 2 options. Can you complete k numbers?',
      ],
    },
  ],
}
