export default {
  id: 'reverse-integer',
  title: 'Reverse Integer',
  difficulty: 'medium',
  description: 'Given a signed 32-bit integer <code>x</code>, reverse its digits. If the reversed integer overflows the 32-bit signed range <code>[-2³¹, 2³¹ − 1]</code>, return 0.',
  examples: [
    { input: 'x = 123', output: '321' },
    { input: 'x = -123', output: '-321' },
    { input: 'x = 120', output: '21', explanation: 'Leading zero is dropped.' },
  ],
  constraints: ['-2³¹ ≤ x ≤ 2³¹ − 1'],
  starterCode: `def reverse(x):
  pass`,
  functionName: 'reverse',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: 'Positive', args: [123], expected: 321 },
    { label: 'Negative', args: [-123], expected: -321 },
    { label: 'Trailing zero', args: [120], expected: 21 },
    { label: 'Overflow', args: [1534236469], expected: 0 },
  ],
}
