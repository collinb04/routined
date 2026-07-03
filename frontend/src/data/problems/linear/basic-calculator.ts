export default {
  id: 'basic-calculator',
  title: 'Basic Calculator',
  difficulty: 'hard',
  description: 'Implement a basic calculator to evaluate a string expression containing <code>+</code>, <code>-</code>, parentheses, and non-negative integers. No multiplication or division.',
  examples: [
    { input: 's = "1 + 1"', output: '2' },
    { input: 's = " 2-1 + 2 "', output: '3' },
    { input: 's = "(1+(4+5+2)-3)+(6+8)"', output: '23' },
  ],
  constraints: ['1 ≤ s.length ≤ 3 × 10⁵', 's contains only digits, \'+\', \'-\', \'(\', \')\', and spaces', 'Expression is valid'],
  starterCode: `def calculate(s):
  pass`,
  functionName: 'calculate',
  conceptId: 'stack',
  testCases: [
    { label: 'Simple', args: ['1 + 1'], expected: 2 },
    { label: 'With subtraction', args: [' 2-1 + 2 '], expected: 3 },
    { label: 'With parens', args: ['(1+(4+5+2)-3)+(6+8)'], expected: 23 },
  ],
}
