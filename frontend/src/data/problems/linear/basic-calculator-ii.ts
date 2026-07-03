export default {
  id: 'basic-calculator-ii',
  title: 'Basic Calculator II',
  difficulty: 'medium',
  description: 'Given a string <code>s</code> representing an expression with non-negative integers, <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, and spaces, evaluate and return the result as an integer. Integer division truncates toward zero.',
  examples: [
    { input: 's = "3+2*2"', output: '7' },
    { input: 's = " 3/2 "', output: '1' },
    { input: 's = " 3+5 / 2 "', output: '5' },
  ],
  constraints: ['1 ≤ s.length ≤ 3 × 10⁵', 's consists of digits, operators, and spaces', 'All operands fit in a 32-bit integer'],
  starterCode: `def calculate(s):
  pass`,
  functionName: 'calculate',
  conceptId: 'stack',
  testCases: [
    { label: 'Precedence', args: ['3+2*2'], expected: 7 },
    { label: 'Division', args: [' 3/2 '], expected: 1 },
    { label: 'Mixed', args: [' 3+5 / 2 '], expected: 5 },
    { label: 'Subtraction', args: ['10-3*2+1'], expected: 5 },
  ],
}
