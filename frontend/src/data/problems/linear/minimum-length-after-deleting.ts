export default {
  id: 'minimum-length-after-deleting',
  title: 'Minimum Length of String After Deleting Similar Ends',
  difficulty: 'medium',
  description: 'Given a string <code>s</code> consisting only of characters \'a\', \'b\', and \'c\'. Apply the following operation any number of times: if the leftmost and rightmost characters are equal, remove them. Return the minimum length of the resulting string.',
  examples: [
    { input: 's = "ca"', output: '2', explanation: 'No operation possible.' },
    { input: 's = "cabaabac"', output: '0', explanation: 'Remove all via: c..c → a..a → b..b.' },
  ],
  constraints: ['1 ≤ s.length ≤ 10⁵', 's consists of \'a\', \'b\', \'c\''],
  starterCode: `def minimum_length(s):
  pass`,
  functionName: 'minimum_length',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'No ops', args: ['ca'], expected: 2 },
    { label: 'Remove all', args: ['cabaabac'], expected: 0 },
    { label: 'All same', args: ['aaa'], expected: 0 },
    { label: 'Single', args: ['a'], expected: 1 },
  ],
}
