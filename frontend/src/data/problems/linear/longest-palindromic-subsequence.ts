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
  starterCode: `def longest_palindrome_subseq(s):
  pass`,
  functionName: 'longest_palindrome_subseq',
  conceptId: 'strings',
  testCases: [
    { label: '"bbbab"', args: ['bbbab'], expected: 4 },
    { label: '"cbbd"', args: ['cbbd'], expected: 2 },
    { label: 'Single', args: ['a'], expected: 1 },
    { label: 'All same', args: ['aaaa'], expected: 4 },
  ],
}
