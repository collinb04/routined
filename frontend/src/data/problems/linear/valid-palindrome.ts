export default {
  id: 'valid-palindrome',
  title: 'Valid Palindrome',
  difficulty: 'easy',
  description: 'After removing all non-alphanumeric characters and lowercasing, return <code>true</code> if the string reads the same forward and backward.',
  examples: [
    { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
    { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
  ],
  constraints: [
    '1 ≤ s.length ≤ 2 × 10⁵',
    's consists only of printable ASCII characters',
  ],
  starterCode: `def is_palindrome(s):
  pass`,
  functionName: 'is_palindrome',
  conceptId: 'strings',
  testCases: [
    { label: 'Classic phrase', args: ['A man, a plan, a canal: Panama'], expected: true },
    { label: 'Not palindrome', args: ['race a car'], expected: false },
    { label: 'Single space', args: [' '], expected: true },
    { label: 'Pure alpha', args: ['racecar'], expected: true },
  ],
}
