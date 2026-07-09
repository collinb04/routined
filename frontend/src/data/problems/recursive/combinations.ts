export default {
  id: 'combinations',
  title: 'Combinations',
  difficulty: 'medium',
  description: 'Given two integers <code>n</code> and <code>k</code>, return all possible combinations of <code>k</code> numbers chosen from the range [1, n]. Return the answer in any order.',
  examples: [
    { input: 'n=4, k=2', output: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]' },
    { input: 'n=1, k=1', output: '[[1]]' },
  ],
  constraints: ['1 ≤ n ≤ 20', '1 ≤ k ≤ n'],
  starterCode: `def combine(n, k):
  pass`,
  functionName: 'combine',
  conceptId: 'backtracking',
  testCases: [
    { label: 'n=4,k=2', args: [4,2], expected: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]] },
    { label: 'n=1,k=1', args: [1,1], expected: [[1]] },
  ],
  bruteHint: 'Describe generating all subsets of [1, n] and filtering for those of size k',
  optimizeHint: 'Name the technique of backtracking in strictly increasing order to avoid generating the same combination twice',
  clues: [
    {
      id: 'output-all-combinations',
      question: 'The output is all possible combinations — not a count. What does that require from your approach?',
      options: [
        { label: 'Compute C(n, k) and return that number', isCorrect: false, feedback: 'C(n, k) counts combinations — it does not enumerate them. The problem asks you to return the actual combinations, not how many there are.' },
        { label: 'Backtrack to enumerate every valid k-length subset', isCorrect: true },
        { label: 'Sort the range [1, n] and return the first k elements', isCorrect: false, feedback: 'That returns only one combination: [1,2,...,k]. You need all C(n,k) combinations, not just the lexicographically smallest.' },
        { label: 'Use BFS to generate combinations level by level', isCorrect: false, feedback: 'BFS can work but is less natural here. DFS backtracking builds combinations element by element and records each complete k-length path — that is the standard pattern.' },
      ],
      correctFeedback: 'Backtracking explores every choice at each position: pick a number, recurse, then undo. Every path of length k is a valid combination to collect.',
      wrongFeedback: [
        'For n=4, k=2 there are C(4,2) = 6 combinations. Can any non-exhaustive method guarantee it finds all 6?',
        'DFS with backtracking naturally enumerates all subsets: at each step, pick the next number, recurse until you have k numbers, record the combination, then backtrack.',
      ],
    },
    {
      id: 'no-reuse-no-duplicates',
      question: 'Combinations (not permutations) — [1,2] and [2,1] are the same. How do you avoid generating both?',
      options: [
        { label: 'Use a visited array to mark used numbers', isCorrect: false, feedback: 'A visited array prevents reuse but does not prevent permutations — you could still generate [1,2] and [2,1] as separate paths if you start from 1 each time. The fix is advancing the start index.' },
        { label: 'Always pick the next number strictly greater than the last picked', isCorrect: true },
        { label: 'Deduplicate the result at the end by converting each list to a set', isCorrect: false, feedback: 'Post-processing works but wastes time generating duplicates and then discarding them. Enforcing increasing order during generation prevents duplicates from ever being created.' },
        { label: 'Pick numbers in random order and rely on hashing to deduplicate', isCorrect: false, feedback: 'Random order would generate permutations before deduplication — far more work than needed. Enforcing increasing selection order generates each combination exactly once.' },
      ],
      correctFeedback: 'Pass a start index to the recursive call. Each number picked must be ≥ start, and the next recursive call uses start = current + 1. This guarantees strictly increasing sequences — no permutation duplicates.',
      wrongFeedback: [
        'For n=4, k=2: if you always pick the second number to be larger than the first, how many paths are generated versus allowing any order?',
        'A start index that advances forward forces each new pick to be larger than the previous one. That produces exactly C(n,k) paths — one per unique combination.',
      ],
    },
    {
      id: 'pruning-not-enough-remaining',
      question: 'n ≤ 20, k ≤ n. If you need m more numbers and only r numbers remain in [start, n], when can you prune?',
      options: [
        { label: 'When start > n', isCorrect: false, feedback: 'start > n means no numbers remain at all — that is the natural loop termination, not a pruning optimization. Pruning happens earlier: when remaining numbers < numbers still needed.' },
        { label: 'When r < m — not enough numbers remain to complete the combination', isCorrect: true },
        { label: 'When the current combination length equals k', isCorrect: false, feedback: 'Length == k is the success condition, not a prune condition. You record the combination and return. Pruning is for branches that cannot possibly reach k elements.' },
        { label: 'When any picked number exceeds n / k', isCorrect: false, feedback: 'n / k has no pruning meaning here — combinations are sets of numbers from [1, n], and any number up to n is valid as long as enough remain to complete the combination.' },
      ],
      correctFeedback: 'If you need k - len(current) more numbers and only n - start + 1 remain, and n - start + 1 < k - len(current), no valid combination can be completed. Loop only while start ≤ n - (k - len(current)) + 1.',
      wrongFeedback: [
        'If your combination needs 3 more numbers and you\'re at start=19 with n=20, how many numbers are available? Can you complete the combination?',
        'The loop upper bound is: start ≤ n - (k - len(current)) + 1. Any start beyond that leaves too few remaining numbers to build a k-length combination.',
      ],
    },
  ],
}
