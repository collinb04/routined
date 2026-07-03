export default {
  id: 'reorganize-string',
  title: 'Reorganize String',
  difficulty: 'medium',
  description: 'Given a string <code>s</code>, rearrange its characters so that no two adjacent characters are the same. Return any valid rearrangement, or an empty string if it is not possible.',
  examples: [
    { input: 's = "aab"', output: '"aba"', explanation: 'Rearrange so no two a\'s are adjacent.' },
    { input: 's = "aaab"', output: '""', explanation: 'Impossible — too many a\'s.' },
  ],
  constraints: ['1 ≤ s.length ≤ 500', 's consists of lowercase English letters'],
  starterCode: `def reorganize_string(s):
  pass`,
  functionName: 'reorganize_string',
  conceptId: 'heap',
  testCases: [
    { label: '"aab" → "aba"', args: ['aab'], expected: 'aba' },
    { label: 'Impossible', args: ['aaab'], expected: '' },
    { label: 'Single', args: ['a'], expected: 'a' },
  ],
}
