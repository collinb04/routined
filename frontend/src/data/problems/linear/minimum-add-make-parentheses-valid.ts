export default {
  id: 'minimum-add-make-parentheses-valid',
  title: 'Minimum Add to Make Parentheses Valid',
  difficulty: 'medium',
  description: 'A parentheses string is valid if every open bracket has a matching close bracket. Given a string of parentheses, return the minimum number of additions to make it valid.',
  examples: [
    { input: 's = "())"', output: '1', explanation: 'Add one open bracket.' },
    { input: 's = "((("', output: '3', explanation: 'Add three close brackets.' },
  ],
  constraints: ['1 ≤ s.length ≤ 1000', 's[i] is either \'(\' or \')\''],
  starterCode: `def min_add_to_make_valid(s):
  pass`,
  functionName: 'min_add_to_make_valid',
  conceptId: 'strings',
  testCases: [
    { label: 'One extra close', args: ['())'], expected: 1 },
    { label: 'Three opens', args: ['((('], expected: 3 },
    { label: 'Valid', args: ['()'], expected: 0 },
    { label: 'Mixed', args: ['()))(('], expected: 4 },
  ],
}
