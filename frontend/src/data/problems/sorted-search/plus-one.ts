export default {
  id: 'plus-one',
  title: 'Plus One',
  difficulty: 'easy',
  description: 'You are given a large integer as an array of digits, where each element is a single digit. Increment the integer by one and return the resulting array of digits.',
  examples: [
    { input: 'digits = [1,2,3]', output: '[1,2,4]', explanation: '123 + 1 = 124.' },
    { input: 'digits = [9,9]', output: '[1,0,0]', explanation: '99 + 1 = 100.' },
  ],
  constraints: ['1 ≤ digits.length ≤ 100', '0 ≤ digits[i] ≤ 9', 'digits does not contain leading zeros'],
  starterCode: `def plus_one(digits):
  pass`,
  functionName: 'plus_one',
  conceptId: 'math-geometry',
  testCases: [
    { label: 'No carry', args: [[1,2,3]], expected: [1,2,4] },
    { label: 'Carry propagates', args: [[9,9]], expected: [1,0,0] },
    { label: 'Single nine', args: [[9]], expected: [1,0] },
    { label: 'No carry simple', args: [[4,3,2,1]], expected: [4,3,2,2] },
  ],
}
