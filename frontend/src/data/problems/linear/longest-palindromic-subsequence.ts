export default {
  id: 'longest-palindromic-subsequence',
  title: 'Longest Palindromic Subsequence',
  difficulty: 'medium',
  description: 'Given a string <code>s</code>, return the length of the longest palindromic subsequence (characters don\'t need to be contiguous).',
  examples: [
    { input: 's = "bbbab"', output: '4', explanation: '"bbbb" is the longest palindromic subsequence.' },
    { input: 's = "cbbd"', output: '2', explanation: '"bb" is the longest.' },
  ],
  constraints: ['1 ≤ s.length ≤ 1000', 's consists of lowercase English letters'],
  starterCode: `class Solution:
    def longest_palindrome_subseq(self, s):
        pass`,
  runnerSetup: 'longest_palindrome_subseq = Solution().longest_palindrome_subseq',
  functionName: 'longest_palindrome_subseq',
  conceptId: 'strings',
  testCases: [
    { label: '"bbbab"', args: ['bbbab'], expected: 4 },
    { label: '"cbbd"', args: ['cbbd'], expected: 2 },
    { label: 'Single', args: ['a'], expected: 1 },
    { label: 'All same', args: ['aaaa'], expected: 4 },
  ],
  bruteHint: 'The brute-force approach generates every subsequence of the string and checks whether each one is a palindrome, keeping track of the longest one found so far. That works, but a string of length n has 2^n subsequences, so checking all of them is exponential. At n up to 1,000, how large is 2^1000, and would you ever finish enumerating them?',
  optimizeComplexity: { time: 'O(n²)', space: 'O(n²)' },
  clues: [
    {
      id: 'subsequence-not-substring',
      question: 'Precise wording about whether elements must stay adjacent quietly redefines how large the space of candidates really is. "Characters don\'t need to be contiguous" — what does this tell you about the search space compared to finding the longest palindromic substring?',
      options: [
        { label: 'The search space is smaller — fewer candidates', isCorrect: false, feedback: 'Subsequences include all substrings plus non-contiguous selections. The search space is strictly larger, not smaller — there are 2^n possible subsequences vs. O(n²) substrings.' },
        { label: 'The search space is larger — 2^n subsequences', isCorrect: true },
        { label: 'The search space is the same size', isCorrect: false, feedback: 'A substring is a contiguous slice — O(n²) options. A subsequence can skip any subset of characters — 2^n options. For n = 1000 that\'s an astronomically larger space.' },
        { label: 'Contiguity doesn\'t affect solution strategy', isCorrect: false, feedback: 'The distinction is fundamental. Palindromic substrings expand from a center in O(n²). Palindromic subsequences require dynamic programming over all (i, j) pairs because characters can be skipped.' },
      ],
      correctFeedback: 'With n = 1000, there are 2^1000 subsequences — too many to enumerate. The non-contiguous constraint requires dynamic programming over ranges [i, j] rather than an expand-from-center approach.',
      wrongFeedback: [
        'How many substrings does a string of length n have? How many subsequences? Which is larger?',
        'A substring must be contiguous — O(n²) options. A subsequence can skip any characters — 2^n options. What algorithmic approach handles 2^n without examining each one?',
      ],
      highlight: { location: 'description', text: 'characters don\'t need to be contiguous' },
    },
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. s.length ≤ 1000, and a naive recursive approach tries all 2^n subsequences — what does this constraint allow instead?',
      options: [
        { label: 'O(n) — one pass, no revisiting choices', isCorrect: false, feedback: 'A greedy scan works when a local rule always leads to the global optimum. Palindromic subsequences have no such rule — choosing the outermost matching pair may or may not be optimal, and the decision depends on the inner structure.' },
        { label: 'O(n²) — build answers from smaller ranges', isCorrect: true },
        { label: 'O(n log n) — split the range, combine halves', isCorrect: false, feedback: 'Divide and conquer splits the problem in half each time. Palindromic subsequences don\'t split cleanly — the optimal subsequence may span both halves, and you\'d need to combine solutions in ways that require O(n²) work anyway.' },
        { label: 'O(n³) — still acceptable at n = 1000', isCorrect: false, feedback: 'O(n³) at n = 1000 is 10^9 operations — too slow in Python. O(n²) = 10^6 is the target.' },
      ],
      correctFeedback: 'At n = 1000, an O(n²) DP table has 10^6 cells. Each cell takes O(1) to fill. That\'s the right target — and it fits comfortably within typical time limits.',
      wrongFeedback: [
        'At n = 1000, how large is n²? Is 10^6 feasible? What about 2^1000?',
        'DP memoizes overlapping subproblems. For a string of length 1000, how many unique (i, j) subproblems are there?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ s.length ≤ 1000' },
    },
    {
      id: 'outer-characters-match',
      question: 'A recurrence has to branch correctly on the relationship between the two ends of the current range — get the branch wrong and every value built on top of it inherits the error. For a substring s[i..j], if s[i] == s[j], the longest palindromic subsequence includes both outer characters plus the best result from s[i+1..j-1]. What is the recurrence in this case?',
      options: [
        { label: 'dp[i][j] = dp[i+1][j-1]', isCorrect: false, feedback: 'This forgets to count the two matching outer characters. If s[i] == s[j], they contribute 2 to the length.' },
        { label: 'dp[i][j] = dp[i+1][j-1] + 2', isCorrect: true },
        { label: 'dp[i][j] = max(dp[i+1][j], dp[i][j-1])', isCorrect: false, feedback: 'That recurrence applies when s[i] ≠ s[j] — you skip one of the outer characters. When s[i] == s[j], you take both and recurse inward.' },
        { label: 'dp[i][j] = dp[i+1][j-1] + 1', isCorrect: false, feedback: 'Matching outer characters contribute 2 to the palindrome length (one from each end), not 1.' },
      ],
      correctFeedback: 'When s[i] == s[j], wrap them around the inner solution: dp[i][j] = dp[i+1][j-1] + 2. The base cases are dp[i][i] = 1 (single char) and dp[i][i-1] = 0 (empty range).',
      wrongFeedback: [
        'If s[i] and s[j] match, how many characters do they together add to the palindrome?',
        'Two matching outer characters plus whatever fits inside them. If the inner best is dp[i+1][j-1], what is the total?',
      ],
    },
    {
      id: 'outer-characters-mismatch',
      question: 'The opposite relationship between the two ends of the range needs a different rule, and mixing the branches up silently drops a valid subsequence. When s[i] ≠ s[j], neither outer character can pair with the other. What is the recurrence?',
      options: [
        { label: 'dp[i][j] = 0', isCorrect: false, feedback: 'A mismatch at the outer characters doesn\'t mean the inner substring has no palindromic subsequence. You can still use all characters between i and j — just not both i and j together.' },
        { label: 'dp[i][j] = max(dp[i+1][j], dp[i][j-1])', isCorrect: true },
        { label: 'dp[i][j] = dp[i+1][j-1]', isCorrect: false, feedback: 'Skipping both i and j at once is too aggressive — you might keep one of them and pair it with something deeper inside. Try keeping each one separately and take the best.' },
        { label: 'dp[i][j] = dp[i+1][j] + dp[i][j-1]', isCorrect: false, feedback: 'Adding the two sub-results double-counts the characters in the overlap s[i+1..j-1]. You must take the max, not the sum.' },
      ],
      correctFeedback: 'When s[i] ≠ s[j], try dropping each outer character: dp[i][j] = max(dp[i+1][j], dp[i][j-1]). You keep the better of the two inner solutions.',
      wrongFeedback: [
        'If s[i] and s[j] don\'t match, you can\'t use both. What are your two options, and how do you pick between them?',
        'You can keep everything from i+1 to j, or everything from i to j-1. Which gives a longer palindromic subsequence? Take the max.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def longest_palindrome_subseq(self, s):
        n = len(s)
        dp = [[0] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            dp[i][i] = 1
            for j in range(i + 1, n):
                if s[i] == s[j]:
                    dp[i][j] = dp[i + 1][j - 1] + 2
                else:
                    dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])
        return dp[0][n - 1] if n else 0`,
  solutionComplexity: { time: 'O(n²)', space: 'O(n²)' },
  solutionCaveat: 'The outer loop runs <code>i</code> backwards from <code>n-1</code> to <code>0</code> specifically so that <code>dp[i+1][j-1]</code> and <code>dp[i+1][j]</code> are always already computed before they\'re needed — every subproblem this DP depends on covers a strictly shorter span, and filling rows from the bottom up guarantees that.',
  solutionExplanation: '<code>dp[i][j]</code> is the longest palindromic subsequence within <code>s[i..j]</code>. When the endpoints match, they can both be kept as the outer layer of a palindrome, adding 2 to whatever the best subsequence is strictly between them; when they don\'t match, at least one endpoint has to be dropped, so the answer is the better of dropping the left one or dropping the right one. This is the same "shrink the two-pointer window" reasoning as checking if a string is a palindrome, generalized to track the best answer for every possible sub-window instead of just one.',
}
