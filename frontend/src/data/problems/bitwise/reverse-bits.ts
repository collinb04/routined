export default {
  id: 'reverse-bits',
  title: 'Reverse Bits',
  difficulty: 'easy',
  description: 'Reverse the bits of a given 32-bit unsigned integer and return the result.',
  examples: [
    { input: 'n = 43261596', output: '964176192', explanation: 'Binary 00000010100101000001111010011100 reversed is 00111001011110000010100101000000.' },
    { input: 'n = 4294967293', output: '3221225471', explanation: 'Binary 11111111111111111111111111111101 reversed is 10111111111111111111111111111111.' },
  ],
  constraints: ['Input is a 32-bit unsigned integer'],
  starterCode: `def reverse_bits(n):
  pass`,
  functionName: 'reverse_bits',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: 'Standard case', args: [43261596], expected: 964176192 },
    { label: 'All ones minus one', args: [4294967293], expected: 3221225471 },
    { label: 'Zero', args: [0], expected: 0 },
    { label: 'One', args: [1], expected: 2147483648 },
  ],
}
