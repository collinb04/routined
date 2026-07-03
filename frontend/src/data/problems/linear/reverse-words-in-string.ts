export default {
  id: 'reverse-words-in-string',
  title: 'Reverse Words in a String',
  difficulty: 'medium',
  description: 'Given a string <code>s</code>, reverse the order of the words. Words are separated by spaces, and the result should have no leading/trailing spaces and only single spaces between words.',
  examples: [
    { input: 's = "the sky is blue"', output: '"blue is sky the"' },
    { input: 's = "  hello world  "', output: '"world hello"', explanation: 'Leading/trailing spaces removed.' },
  ],
  constraints: ['1 ≤ s.length ≤ 10⁴', 's contains English letters, digits, or spaces', 'At least one word exists'],
  starterCode: `def reverse_words(s):
  pass`,
  functionName: 'reverse_words',
  conceptId: 'strings',
  testCases: [
    { label: 'Normal sentence', args: ['the sky is blue'], expected: 'blue is sky the' },
    { label: 'Extra spaces', args: ['  hello world  '], expected: 'world hello' },
    { label: 'Single word', args: ['a'], expected: 'a' },
  ],
}
