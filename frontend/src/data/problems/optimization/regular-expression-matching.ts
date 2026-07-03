export default {
  id: 'regular-expression-matching',
  title: 'Regular Expression Matching',
  difficulty: 'hard',
  description: 'Implement regular expression matching with support for <code>.</code> (matches any single character) and <code>*</code> (matches zero or more of the preceding element). The match must cover the entire input string.',
  examples: [
    { input: 's="aa", p="a"', output: 'false', explanation: '"a" does not match "aa".' },
    { input: 's="aa", p="a*"', output: 'true', explanation: '"a*" means zero or more "a"s.' },
    { input: 's="ab", p=".*"', output: 'true', explanation: '".*" matches any string.' },
  ],
  constraints: ['1 ≤ s.length ≤ 20', '1 ≤ p.length ≤ 30', 's contains only lowercase letters; p contains lowercase letters, \'.\', \'*\''],
  starterCode: `def is_match(s, p):
  pass`,
  functionName: 'is_match',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'No match', args: ['aa','a'], expected: false },
    { label: 'Star repeats', args: ['aa','a*'], expected: true },
    { label: 'Dot star', args: ['ab','.*'], expected: true },
    { label: 'Complex', args: ['aab','c*a*b'], expected: true },
  ],
}
