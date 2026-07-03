export default {
  id: 'valid-palindrome-ii',
  title: 'Valid Palindrome II',
  difficulty: 'easy',
  description: 'Given a string <code>s</code>, return <code>true</code> if the string can become a palindrome by removing at most one character.',
  examples: [
    { input: 's = "aba"', output: 'true', explanation: 'Already a palindrome.' },
    { input: 's = "abca"', output: 'true', explanation: 'Remove "c" to get "aba".' },
    { input: 's = "abc"', output: 'false' },
  ],
  constraints: ['1 ≤ s.length ≤ 10⁵', 's consists of lowercase English letters'],
  starterCode: `def valid_palindrome(s):
  pass`,
  functionName: 'valid_palindrome',
  conceptId: 'strings',
  testCases: [
    { label: 'Already palindrome', args: ['aba'], expected: true },
    { label: 'One removal', args: ['abca'], expected: true },
    { label: 'Not possible', args: ['abc'], expected: false },
    { label: 'Empty-like', args: ['a'], expected: true },
  ],
}
