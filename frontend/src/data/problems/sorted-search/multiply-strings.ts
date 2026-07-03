export default {
  id: 'multiply-strings',
  title: 'Multiply Strings',
  difficulty: 'medium',
  description: 'Given two non-negative integers <code>num1</code> and <code>num2</code> represented as strings, return the product of <code>num1</code> and <code>num2</code> as a string. You may not convert inputs directly to integers.',
  examples: [
    { input: 'num1 = "2", num2 = "3"', output: '"6"' },
    { input: 'num1 = "123", num2 = "456"', output: '"56088"' },
  ],
  constraints: ['1 ≤ num1.length, num2.length ≤ 200', 'num1 and num2 consist of digits only', 'Neither input has leading zeros except "0"'],
  starterCode: `def multiply(num1, num2):
  pass`,
  functionName: 'multiply',
  conceptId: 'math-geometry',
  testCases: [
    { label: 'Single digits', args: ['2','3'], expected: '6' },
    { label: 'Multi-digit', args: ['123','456'], expected: '56088' },
    { label: 'Multiply by zero', args: ['0','52'], expected: '0' },
    { label: '99×99', args: ['99','99'], expected: '9801' },
  ],
}
