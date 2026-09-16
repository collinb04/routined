export default {
  id: 'longest-common-subsequence',
  title: 'Longest Common Subsequence',
  difficulty: 'medium',
  description: 'Given two strings <code>text1</code> and <code>text2</code>, return the length of their longest common subsequence. A subsequence need not be contiguous.',
  examples: [
    { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: 'LCS is "ace".' },
    { input: 'text1 = "abc", text2 = "abc"', output: '3' },
    { input: 'text1 = "abc", text2 = "def"', output: '0' },
  ],
  constraints: ['1 ≤ text1.length, text2.length ≤ 1000', 'Both consist of lowercase English letters'],
  starterCode: `class Solution:
    def longest_common_subsequence(self, text1, text2):
        pass`,
  runnerSetup: 'longest_common_subsequence = Solution().longest_common_subsequence',
  functionName: 'longest_common_subsequence',
  conceptId: 'dp-2d',
  testCases: [
    { label: '"ace"', args: ['abcde','ace'], expected: 3 },
    { label: 'Same string', args: ['abc','abc'], expected: 3 },
    { label: 'No common', args: ['abc','def'], expected: 0 },
  ],
  bruteHint: 'The brute-force approach recursively branches at every index pair (i, j): if the characters match, advance both pointers together; if they don\'t, try skipping a character from either string and keep the best result. This explores an exponential number of call paths — O(2^(m+n)) in the worst case — because the same (i, j) prefix pair gets recomputed independently along many different branches. With text1 and text2 each up to 1,000 characters, that blow-up is far too slow. How often do you think the same (i, j) pair recurs, and what would happen if you computed each one only once?',
  optimizeComplexity: { time: 'O(m·n)', space: 'O(m·n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraint bounds are often the fastest way to spot the intended time complexity before writing any code. text1.length, text2.length ≤ 1000 tells you…',
      highlight: { location: 'constraint', text: '1 ≤ text1.length, text2.length ≤ 1000' },
      options: [
        { label: 'O(m × n) DP is the target', isCorrect: true },
        { label: 'O(m + n) linear time is sufficient', isCorrect: false, feedback: 'The state space is inherently 2D — you must track progress in both strings simultaneously. A linear pass can\'t capture all prefix comparisons.' },
        { label: 'O(m × n × min(m,n)) is acceptable', isCorrect: false, feedback: 'At m = n = 1,000, that\'s 1 billion operations — too slow. The target is O(m × n) = 1 million operations.' },
        { label: 'Brute force over all subsequences works', isCorrect: false, feedback: 'The number of subsequences of a string of length 1,000 is 2¹⁰⁰⁰ — incomprehensibly large. Brute force is never viable here.' },
      ],
      correctFeedback: 'With m, n ≤ 1,000, an (m+1) × (n+1) DP table has 1 million cells, each computed in O(1). That\'s the natural fit.',
      wrongFeedback: [
        'You need to compare every prefix of text1 against every prefix of text2. How many pairs is that?',
        'There are (m+1) × (n+1) prefix pairs. Computing each once in O(1) gives O(m × n) total — about 1 million ops at max size.',
      ],
    },
    {
      id: 'subsequence-vs-substring',
      question: 'The exact wording of a problem statement can distinguish between two similarly named problems that require entirely different approaches. "A subsequence need not be contiguous." What does this change about the DP?',
      highlight: { location: 'description', text: 'A subsequence need not be contiguous.' },
      options: [
        { label: 'Matching characters must be adjacent in both strings', isCorrect: false, feedback: 'That would be substring matching, not subsequence. A subsequence can skip characters — "ace" is a subsequence of "abcde" even though b and d are in between.' },
        { label: 'When characters match, you advance both pointers; when they don\'t, you keep the best of skipping either', isCorrect: true },
        { label: 'Reset the counter when characters stop matching', isCorrect: false, feedback: 'Resetting on mismatch is the substring (contiguous) approach. For subsequences, a mismatch doesn\'t erase progress — you carry forward the best match so far.' },
        { label: 'Sort both strings before comparing', isCorrect: false, feedback: 'Sorting destroys character order, which is exactly what subsequence matching depends on. The relative order of characters in the original strings must be preserved.' },
      ],
      correctFeedback: 'dp[i][j] = LCS of text1[:i] and text2[:j]. If text1[i-1] == text2[j-1]: dp[i][j] = dp[i-1][j-1] + 1. Otherwise: dp[i][j] = max(dp[i-1][j], dp[i][j-1]) — skip one character from either string.',
      wrongFeedback: [
        'What are your choices when text1[i] and text2[j] don\'t match? Can you still use work already done?',
        'Non-contiguous means you can skip characters. At a mismatch, the best LCS through (i,j) is the best you had when you skipped one character from either string.',
      ],
    },
    {
      id: 'state-definition',
      question: 'Every DP solution hinges on choosing a state that is minimal yet sufficient to distinguish subproblems from each other. What two pieces of information define a DP state for this problem?',
      highlight: { location: 'description', text: 'two strings <code>text1</code> and <code>text2</code>' },
      options: [
        { label: 'Current character in text1 and its frequency', isCorrect: false, feedback: 'Character frequency doesn\'t help — you need to know which prefix of each string you\'ve consumed so far, not how often a character appeared.' },
        { label: 'How many characters match so far', isCorrect: false, feedback: 'The running match count isn\'t enough — it doesn\'t tell you where in each string you are. The same count could arise from different prefix lengths with different future options.' },
        { label: 'Index into text1 and index into text2', isCorrect: true },
        { label: 'Current character in text1 and remaining text2', isCorrect: false, feedback: 'Storing remaining text2 as a string creates O(n) distinct values per position — too many. Two integer indices (i, j) compactly encode the same information.' },
      ],
      correctFeedback: 'State (i, j) represents the LCS of the first i characters of text1 and first j characters of text2. With both lengths ≤ 1,000, that\'s 1,001 × 1,001 states.',
      wrongFeedback: [
        'You\'re comparing prefixes of two strings. What two numbers tell you exactly which prefixes you\'re currently at?',
        'State (i, j) means you\'ve processed i chars of text1 and j chars of text2. Every distinct (i, j) pair is a subproblem — that\'s the 2D table.',
      ],
    },
    {
      id: 'output-length-not-string',
      question: 'Knowing precisely what a function must return can save you from solving a harder problem than the one actually being asked. The output is the length of the LCS, not the LCS itself. This means…',
      highlight: { location: 'description', text: 'return the length of their longest common subsequence.' },
      options: [
        { label: 'Reconstruct the actual subsequence from the DP table', isCorrect: false, feedback: 'Reconstruction is extra work the problem never asks for. The length is read directly from dp[m][n] — no backtracking needed.' },
        { label: 'Store only integers at each position, not characters', isCorrect: true },
        { label: 'Return early as soon as you find any common character', isCorrect: false, feedback: 'The first common character doesn\'t give you the length of the longest common subsequence — you need to process all prefix pairs.' },
        { label: 'Use a hash set of common characters', isCorrect: false, feedback: 'Common characters don\'t capture order or length. "abcde" and "edcba" share 5 common characters but their LCS is 1 — order matters.' },
      ],
      correctFeedback: 'Each dp[i][j] is just an integer — the LCS length for those prefixes. The final answer is dp[m][n]. No string storage or reconstruction required.',
      wrongFeedback: [
        'You need a number, not a string. What does that mean for what you store at each DP cell?',
        'Each cell stores an integer length. Building the actual subsequence would require backtracking — unnecessary when the output is just the count.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def longest_common_subsequence(self, text1, text2):
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]`,
  solutionComplexity: { time: 'O(m · n)', space: 'O(m · n)' },
  solutionCaveat: 'On a mismatch, <code>dp[i][j]</code> takes the max of dropping a character from <code>text1</code> or from <code>text2</code> — never both at once — since a subsequence match never needs to skip characters from both strings simultaneously to make progress.',
  solutionExplanation: 'Matching characters extend the best subsequence found for both prefixes one character shorter (<code>dp[i-1][j-1] + 1</code>), since a subsequence is free to skip over any characters in between; a mismatch means the LCS of the current prefixes can\'t include both current characters, so it carries forward the better of dropping the last character of either string. Because a subsequence need not be contiguous, this "skip on mismatch, extend on match" rule is exactly what distinguishes this from substring matching, where a mismatch would have to reset progress instead of falling back to a smaller subproblem.',
}
