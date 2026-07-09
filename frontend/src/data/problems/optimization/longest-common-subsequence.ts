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
  starterCode: `def longest_common_subsequence(text1, text2):
  pass`,
  functionName: 'longest_common_subsequence',
  conceptId: 'dp-2d',
  testCases: [
    { label: '"ace"', args: ['abcde','ace'], expected: 3 },
    { label: 'Same string', args: ['abc','abc'], expected: 3 },
    { label: 'No common', args: ['abc','def'], expected: 0 },
  ],
  bruteHint: 'Describe the naive recursion that branches on matching or skipping characters in text1 and text2, and why the same (i, j) prefix pair recurs many times',
  optimizeHint: 'Name the 2D state (prefix length of text1, prefix length of text2) you\'d memoize to eliminate repeated work',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'text1.length, text2.length ≤ 1000 tells you…',
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
      question: '"A subsequence need not be contiguous." What does this change about the DP?',
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
      question: 'What two pieces of information define a DP state for this problem?',
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
      question: 'The output is the length of the LCS, not the LCS itself. This means…',
      options: [
        { label: 'Reconstruct the actual subsequence from the DP table', isCorrect: false, feedback: 'Reconstruction is extra work the problem never asks for. The length is read directly from dp[m][n] — no backtracking needed.' },
        { label: 'Store only integers in the DP table, not characters', isCorrect: true },
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
}
