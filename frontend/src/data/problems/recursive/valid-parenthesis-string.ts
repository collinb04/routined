export default {
  id: 'valid-parenthesis-string',
  title: 'Valid Parenthesis String',
  difficulty: 'medium',
  description: 'Given a string <code>s</code> containing only <code>(</code>, <code>)</code>, and <code>*</code> (which can be treated as <code>(</code>, <code>)</code>, or empty string), return <code>true</code> if <code>s</code> is valid.',
  examples: [
    { input: 's = "()"', output: 'true' },
    { input: 's = "(*)"', output: 'true' },
    { input: 's = "(*))"', output: 'true' },
  ],
  constraints: ['1 ≤ s.length ≤ 100', 's[i] is \'(\', \')\', or \'*\''],
  starterCode: `def check_valid_string(s):
  pass`,
  functionName: 'check_valid_string',
  conceptId: 'greedy',
  testCases: [
    { label: 'Simple valid', args: ['()'], expected: true },
    { label: 'Star fills', args: ['(*)'], expected: true },
    { label: 'Star as close', args: ['(*))'], expected: true },
    { label: 'Invalid', args: ['((('], expected: false },
  ],
}
