export default {
  id: 'perfect-squares',
  title: 'Perfect Squares',
  difficulty: 'medium',
  description: 'Given an integer <code>n</code>, return the minimum number of perfect squares (1, 4, 9, 16, ...) that sum to <code>n</code>.',
  examples: [
    { input: 'n = 12', output: '3', explanation: '12 = 4 + 4 + 4.' },
    { input: 'n = 13', output: '2', explanation: '13 = 4 + 9.' },
  ],
  constraints: ['1 ≤ n ≤ 10⁴'],
  starterCode: `class Solution:
    def num_squares(self, n):
        pass`,
  runnerSetup: 'num_squares = Solution().num_squares',
  functionName: 'num_squares',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'n=12', args: [12], expected: 3 },
    { label: 'n=13', args: [13], expected: 2 },
    { label: 'Perfect square', args: [4], expected: 1 },
    { label: 'n=1', args: [1], expected: 1 },
  ],
  bruteHint: 'The brute-force approach recursively tries every perfect square k² ≤ n as the first term of the sum, then recurses on the remainder n - k², taking the best result over all valid choices of k. Because different orderings of the same squares lead back to the same remaining value, the recursion revisits the same remainder from many different call paths, giving exponential time in the worst case. If the same remaining value n - k² keeps getting solved again and again independently, what technique would let you compute its answer once and look it up thereafter?',
  optimizeComplexity: { time: 'O(n·√n)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraint bounds are often the strongest hint toward the required time complexity, since they tell you exactly how much computation is actually affordable. n ≤ 10⁴ tells you…',
      highlight: { location: 'constraint', text: '1 ≤ n ≤ 10⁴' },
      options: [
        { label: 'O(n × √n) is acceptable', isCorrect: true },
        { label: 'O(n²) is too slow', isCorrect: false, feedback: 'At n = 10,000, O(n²) is 100 million operations — borderline but typically acceptable. The natural DP is O(n × √n) ≈ 10,000 × 100 = 1 million operations, which is clearly fast.' },
        { label: 'O(√n) is sufficient', isCorrect: false, feedback: 'O(√n) at n = 10,000 is just 100 operations — you can\'t even look up precomputed answers that fast without first building a table of size n. The DP requires at least O(n) space.' },
        { label: 'Enumerate all combinations of squares', isCorrect: false, feedback: 'The number of combinations grows exponentially with n. Enumeration is never viable — the DP structure computes the minimum for all values up to n in O(n × √n).' },
      ],
      correctFeedback: 'There are √n perfect squares ≤ n (at most 100 for n = 10,000). For each of the n values, you try each perfect square. That\'s O(n × √n) ≈ 1 million operations.',
      wrongFeedback: [
        'How many perfect squares are there at most for n = 10,000? How does that bound the inner loop in the DP?',
        'Perfect squares ≤ n are 1, 4, 9, ..., ≤ n — there are ⌊√n⌋ of them. A loop over n values, each checking ⌊√n⌋ squares, is O(n √n).',
      ],
    },
    {
      id: 'optimal-substructure',
      question: 'Once you know what quantity you\'re minimizing, the recurrence usually falls out of asking how the last piece of the optimal solution was chosen. dp[n] = minimum squares summing to n. What is the recurrence?',
      highlight: { location: 'description', text: 'minimum number of perfect squares' },
      options: [
        { label: 'dp[n] = dp[n-1] + 1 always', isCorrect: false, feedback: 'dp[n] = dp[n-1] + 1 would always use 1 as the square, giving n for any input. But 12 = 4+4+4 uses only 3 squares. You need to try all perfect squares ≤ n.' },
        { label: 'dp[n] = 1 + min(dp[n - k²]) for all k where k² ≤ n', isCorrect: true },
        { label: 'dp[n] = dp[n/2] + dp[n/2] if n is even', isCorrect: false, feedback: 'Splitting by halves doesn\'t respect perfect squares. 12/2 = 6, and dp[6] = 3 (1+1+4), giving dp[12] = 6 — but 12 = 4+4+4 achieves 3 squares. Halving misses the optimal.' },
        { label: 'dp[n] = dp[n - largest square ≤ n] + 1', isCorrect: false, feedback: 'Greedy — always subtracting the largest square — fails. For n = 12, the largest square ≤ 12 is 9, giving 12-9=3, and dp[3] = 3 (1+1+1), total 4. But 4+4+4 = 3 squares is better.' },
      ],
      correctFeedback: 'For each perfect square k² ≤ n, dp[n] considers using k² as one element and dp[n-k²] for the rest. Take the minimum across all valid k.',
      wrongFeedback: [
        'If you use the square k² in your sum, what subproblem remains? And which k values are valid?',
        'dp[n] = 1 + dp[n - k²] for each k where k² ≤ n. You try all valid k and keep the minimum.',
      ],
    },
    {
      id: 'base-case',
      question: 'Every DP recurrence needs an anchor value that requires no further reduction, and getting that anchor wrong breaks every computation built on top of it. dp[0] = 0 is the base case. Why?',
      options: [
        { label: 'Because 0 is a perfect square', isCorrect: false, feedback: '0 is sometimes considered a perfect square (0²=0), but that\'s not why dp[0]=0. The base case means: to form a sum of 0, you need 0 perfect squares — you don\'t select anything.' },
        { label: 'Because forming sum 0 requires zero squares', isCorrect: true },
        { label: 'Because 0 is not in the valid input range', isCorrect: false, feedback: 'n ≥ 1 per the constraints, so dp[0] will never be the answer — but it\'s still needed as the base case for the recurrence. dp[k²] = 1 + dp[0] = 1 relies on dp[0] = 0.' },
        { label: 'To prevent array index errors', isCorrect: false, feedback: 'dp[0] = 0 is a meaningful mathematical choice, not just a safety measure. Without it, dp[4] = 1 + dp[0] would fail to give the correct answer of 1.' },
      ],
      correctFeedback: 'dp[0] = 0 means "zero squares are needed to sum to 0." From this, dp[k²] = 1 + dp[0] = 1 for every perfect square k² — which is correct: one square suffices.',
      wrongFeedback: [
        'What does dp[4] equal? Trace the recurrence: dp[4] = 1 + dp[4 - 4] = 1 + dp[0]. What must dp[0] be for this to give 1?',
        'dp[0] anchors the recurrence. Any perfect square k² needs dp[k²] = 1 + dp[0] = 1. That only works if dp[0] = 0.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def num_squares(self, n):
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            best = float('inf')
            k = 1
            while k * k <= i:
                best = min(best, dp[i - k * k] + 1)
                k += 1
            dp[i] = best
        return dp[n]`,
  solutionComplexity: { time: 'O(n · √n)', space: 'O(n)' },
  solutionCaveat: '<code>dp[0] = 0</code> is what makes <code>dp[k²] = 1 + dp[0] = 1</code> correct for every perfect square — without a zero anchor, the recurrence would have nothing valid to add the first square onto.',
  solutionExplanation: 'Trying every perfect square <code>k²</code> that fits within <code>i</code> and taking <code>1 + dp[i - k²]</code> considers "what if this was the last square used," and the minimum over all such choices of <code>k</code> is provably optimal, since any valid decomposition of <code>i</code> must end with some perfect square. Building the table bottom-up from 0 guarantees <code>dp[i - k²]</code> is always already computed by the time <code>dp[i]</code> needs it.',
}
