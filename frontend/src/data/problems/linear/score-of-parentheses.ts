export default {
  id: 'score-of-parentheses',
  title: 'Score of Parentheses',
  difficulty: 'medium',
  description: 'Given a balanced parentheses string <code>s</code>, return its score. Rules: "()" = 1, "AB" = A + B, "(A)" = 2 * A.',
  examples: [
    { input: 's = "()"', output: '1' },
    { input: 's = "(())"', output: '2' },
    { input: 's = "()()"', output: '2' },
    { input: 's = "(()(()))"', output: '6' },
  ],
  constraints: ['2 ≤ s.length ≤ 50', 's consists of \'(\' and \')\' only', 's is a balanced parentheses string'],
  starterCode: `def score_of_parentheses(s):
  pass`,
  functionName: 'score_of_parentheses',
  conceptId: 'stack',
  testCases: [
    { label: '()', args: ['()'], expected: 1 },
    { label: '(())', args: ['(())'], expected: 2 },
    { label: '()()', args: ['()()'], expected: 2 },
    { label: 'Nested', args: ['(()(()))'], expected: 6 },
  ],
}
