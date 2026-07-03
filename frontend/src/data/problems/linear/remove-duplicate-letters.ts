export default {
  id: 'remove-duplicate-letters',
  title: 'Remove Duplicate Letters',
  difficulty: 'medium',
  description: 'Given a string <code>s</code>, remove duplicate letters so that every letter appears once. The result must be the smallest in lexicographic order among all possible results.',
  examples: [
    { input: 's = "bcabc"', output: '"abc"', explanation: 'Remove last b and c to get smallest arrangement.' },
    { input: 's = "cbacdcbc"', output: '"acdb"' },
  ],
  constraints: ['1 ≤ s.length ≤ 10⁴', 's consists of lowercase English letters'],
  starterCode: `def remove_duplicate_letters(s):
  pass`,
  functionName: 'remove_duplicate_letters',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: '"bcabc"', args: ['bcabc'], expected: 'abc' },
    { label: '"cbacdcbc"', args: ['cbacdcbc'], expected: 'acdb' },
    { label: 'No duplicates', args: ['abc'], expected: 'abc' },
  ],
}
