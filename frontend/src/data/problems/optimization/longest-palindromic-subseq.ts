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
  starterCode: `def longest_palindrome_subseq(s):
  # Hint: dp[i][j] = length of longest palindromic subseq in s[i..j]
  # If s[i]==s[j]: dp[i][j] = dp[i+1][j-1] + 2, else max(dp[i+1][j], dp[i][j-1])
  pass`,
  functionName: 'longest_palindrome_subseq',
  conceptId: 'dp-intervals',
  testCases: [
    { label: '"bbbab"', args: ['bbbab'], expected: 4 },
    { label: '"cbbd"', args: ['cbbd'], expected: 2 },
    { label: 'Single char', args: ['a'], expected: 1 },
    { label: 'All same', args: ['aaaa'], expected: 4 },
    { label: '"agbdba"', args: ['agbdba'], expected: 5 },
  ],
}
