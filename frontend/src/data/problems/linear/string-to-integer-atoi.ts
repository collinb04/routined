export default {
  id: 'string-to-integer-atoi',
  title: 'String to Integer (atoi)',
  difficulty: 'medium',
  description: 'Implement <code>atoi</code>: read leading whitespace, parse optional sign, then read digits until a non-digit or end of string. Clamp the result to the 32-bit signed integer range.',
  examples: [
    { input: 's = "42"', output: '42' },
    { input: 's = "   -42"', output: '-42' },
    { input: 's = "4193 with words"', output: '4193' },
  ],
  constraints: ['0 ≤ s.length ≤ 200', 's consists of English letters, digits, \' \', \'+\', \'-\', \'.\''],
  starterCode: `def my_atoi(s):
  pass`,
  functionName: 'my_atoi',
  conceptId: 'strings',
  testCases: [
    { label: 'Simple', args: ['42'], expected: 42 },
    { label: 'Negative with spaces', args: ['   -42'], expected: -42 },
    { label: 'Letters after', args: ['4193 with words'], expected: 4193 },
    { label: 'Overflow', args: ['99999999999'], expected: 2147483647 },
    { label: 'Empty', args: [''], expected: 0 },
  ],
}
