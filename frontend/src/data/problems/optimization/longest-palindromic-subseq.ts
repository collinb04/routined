export default {
  id: 'longest-palindromic-subseq',
  title: 'Longest Palindromic Subsequence',
  difficulty: 'medium',
  description: 'Given a string <code>s</code>, find the length of the longest palindromic subsequence. A subsequence does not need to be contiguous.',
  examples: [
    { input: 's = "bbbab"', output: '4', explanation: '"bbbb" is the longest palindromic subsequence (indices 0,1,2,4).' },
    { input: 's = "cbbd"', output: '2', explanation: '"bb" is the longest palindromic subsequence.' },
  ],
  constraints: [
    '1 ≤ s.length ≤ 1000',
    's consists only of lowercase English letters',
  ],
  starterCode: `class Solution:
    def longest_palindrome_subseq(self, s):
        # Hint: dp[i][j] = length of longest palindromic subseq in s[i..j]
        # If s[i]==s[j]: dp[i][j] = dp[i+1][j-1] + 2, else max(dp[i+1][j], dp[i][j-1])
        pass`,
  runnerSetup: 'longest_palindrome_subseq = Solution().longest_palindrome_subseq',
  functionName: 'longest_palindrome_subseq',
  conceptId: 'dp-intervals',
  testCases: [
    { label: '"bbbab"', args: ['bbbab'], expected: 4 },
    { label: '"cbbd"', args: ['cbbd'], expected: 2 },
    { label: 'Single char', args: ['a'], expected: 1 },
    { label: 'All same', args: ['aaaa'], expected: 4 },
    { label: '"agbdba"', args: ['agbdba'], expected: 5 },
  ],
  bruteHint: 'The brute-force approach recursively tries every possible pair of matching or skipped ends for each substring interval [i, j], branching into subproblems whenever characters differ. Because the same interval [i, j] gets revisited from many different recursive paths, this exponential recursion runs in roughly O(2ⁿ) time without memoization. Notice how many times the identical subproblem s[i..j] would be recomputed as the recursion branches. What if you could solve each distinct interval exactly once?',
  optimizeComplexity: { time: 'O(n²)', space: 'O(n²)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraints often reveal the time complexity budget before you write a single line of code. s.length ≤ 1000 tells you…',
      highlight: { location: 'constraint', text: '1 ≤ s.length ≤ 1000' },
      options: [
        { label: 'O(n²) is the target complexity', isCorrect: true },
        { label: 'O(n) linear time is required', isCorrect: false, feedback: 'O(n) isn\'t achievable here — you need to compare characters from both ends of every substring, which requires examining O(n²) interval pairs.' },
        { label: 'O(n³) is acceptable', isCorrect: false, feedback: 'At n = 1,000, O(n³) is 1 billion operations — too slow. The interval DP runs in O(n²) = 1 million operations, which is the right target.' },
        { label: 'Enumerate all 2ⁿ subsequences', isCorrect: false, feedback: 'At n = 1,000, 2¹⁰⁰⁰ subsequences is astronomically large. The DP over intervals reduces this to O(n²) states.' },
      ],
      correctFeedback: 'n = 1,000 makes an n × n = 1 million cell DP table the natural fit. Each cell represents a substring interval [i, j] and is computed in O(1).',
      wrongFeedback: [
        'You need to examine every substring of s. How many substrings are there? Is O(n²) feasible at n = 1,000?',
        'There are O(n²) substrings, and each takes O(1) to compute from smaller ones. That\'s 1 million operations total — well within limits.',
      ],
    },
    {
      id: 'interval-state',
      question: 'The way a DP recurrence relates smaller subproblems to bigger ones exposes the structure you need to exploit. dp[i][j] represents the longest palindromic subsequence in s[i..j]. Why does the recurrence shrink the interval?',
      options: [
        { label: 'Because palindromes always start at index 0', isCorrect: false, feedback: 'Palindromic subsequences can start anywhere in the string — the interval [i,j] is defined by the current left and right boundaries, not anchored to index 0.' },
        { label: 'Because checking if s[i]==s[j] lets you expand or contract the problem', isCorrect: true },
        { label: 'To avoid comparing the same pair twice', isCorrect: false, feedback: 'Pairs [i,j] and [j,i] are the same interval — the DP only fills the upper triangle of the table. Avoiding duplicates is a side effect, not the reason for the interval structure.' },
        { label: 'Because substrings can be processed left to right like 1D DP', isCorrect: false, feedback: 'Left-to-right 1D DP works for problems with a single index. Here the state is a pair (i, j), and smaller intervals [i+1,j-1] must be computed before [i,j].' },
      ],
      correctFeedback: 'If s[i] == s[j], they can bookend a palindrome: dp[i][j] = dp[i+1][j-1] + 2. If not, you try shrinking from either end: dp[i][j] = max(dp[i+1][j], dp[i][j-1]).',
      wrongFeedback: [
        'When s[i] and s[j] match, what do they contribute to a palindrome, and what subproblem remains?',
        'A match at the ends adds 2 to the inner interval\'s answer. A mismatch means one end is skipped — you take the better of the two resulting intervals.',
      ],
    },
    {
      id: 'subsequence-vs-substring',
      question: 'Precise problem wording like "contiguous" versus "subsequence" changes which characters you\'re allowed to skip. "Subsequence does not need to be contiguous." What does this allow?',
      highlight: { location: 'description', text: 'A subsequence does not need to be contiguous.' },
      options: [
        { label: 'Skipping characters between the two matching ends', isCorrect: true },
        { label: 'Reordering characters to form a palindrome', isCorrect: false, feedback: 'A subsequence preserves relative order — you can skip characters but not rearrange them. "abc" cannot form "cba" as a subsequence.' },
        { label: 'Using each character more than once', isCorrect: false, feedback: 'Each character can only be used once — subsequence just means gaps are allowed between selected characters, not repetition.' },
        { label: 'Ignoring character positions entirely', isCorrect: false, feedback: 'Positions matter because you need to preserve relative order. The interval [i,j] is defined by character positions — skipping means choosing not to include some positions, not ignoring them.' },
      ],
      correctFeedback: 'Non-contiguous means the two ends can be separated by any characters. In "bbbab", the "b" at index 0 and "b" at index 4 can be the outer pair even though "ba" sits between them.',
      wrongFeedback: [
        'In "bbbab", how can indices 0 and 4 both be part of the same palindromic subsequence even though they aren\'t adjacent?',
        'Subsequence allows gaps: you take s[0]=\'b\' and s[4]=\'b\' as the outer pair and recursively find the best palindrome in s[1..3].',
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
        return dp[0][n - 1]`,
  solutionComplexity: { time: 'O(n²)', space: 'O(n²)' },
  solutionCaveat: 'The fill order is deliberate: <code>i</code> runs backward and <code>j</code> forward from <code>i</code>, which guarantees <code>dp[i+1][j-1]</code>, <code>dp[i+1][j]</code>, and <code>dp[i][j-1]</code> — all shorter intervals — are already filled by the time a longer one needs them. Looping <code>i</code> forward instead would read cells that don\'t exist yet.',
  solutionExplanation: '<code>dp[i][j]</code> is the longest palindromic subsequence inside <code>s[i..j]</code>. If the two ends match, they can both be part of the palindrome, so the answer is 2 plus whatever\'s palindromic strictly inside them. If they don\'t match, at least one end can\'t be used, so the answer is just the best of dropping the left end or dropping the right end — whichever leaves a longer palindrome. Every subproblem is a shorter interval, which is exactly the interval-DP shape: solve small ranges first, then combine.',
}
