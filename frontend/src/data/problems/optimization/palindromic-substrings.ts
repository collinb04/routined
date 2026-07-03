export default {
  id: 'palindromic-substrings',
  title: 'Palindromic Substrings',
  difficulty: 'medium',
  description: `<p>Given a string <code>s</code>, return the number of palindromic substrings in it. A string is a palindrome when it reads the same backward as forward. A substring is a contiguous sequence of characters within the string.</p>`,
  examples: [
    { input: 's = "abc"', output: '3 (a, b, c)' },
    { input: 's = "aaa"', output: '6 (a, a, a, aa, aa, aaa)' },
  ],
  constraints: ['1 <= s.length <= 1000', 's consists of lowercase English letters'],
  starterCode: `def count_substrings(s):
  pass`,
  functionName: 'count_substrings',
  conceptId: 'dp-1d',
  testCases: [
    { label: '"abc"', args: ['abc'], expected: 3 },
    { label: '"aaa"', args: ['aaa'], expected: 6 },
  ],
}
