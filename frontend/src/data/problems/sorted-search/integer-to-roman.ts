export default {
  id: 'integer-to-roman',
  title: 'Integer to Roman',
  difficulty: 'medium',
  description: 'Given an integer in the range [1, 3999], convert it to its Roman numeral representation using the standard subtractive notation.',
  examples: [
    { input: 'num = 3', output: '"III"' },
    { input: 'num = 58', output: '"LVIII"' },
    { input: 'num = 1994', output: '"MCMXCIV"' },
  ],
  constraints: ['1 ≤ num ≤ 3999'],
  starterCode: `def int_to_roman(num):
  pass`,
  functionName: 'int_to_roman',
  conceptId: 'math-geometry',
  testCases: [
    { label: '3', args: [3], expected: 'III' },
    { label: '58', args: [58], expected: 'LVIII' },
    { label: '1994', args: [1994], expected: 'MCMXCIV' },
    { label: '4', args: [4], expected: 'IV' },
    { label: '9', args: [9], expected: 'IX' },
  ],
}
