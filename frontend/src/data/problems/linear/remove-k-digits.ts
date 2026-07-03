export default {
  id: 'remove-k-digits',
  title: 'Remove K Digits',
  difficulty: 'medium',
  description: 'Given a non-negative integer <code>num</code> as a string and an integer <code>k</code>, remove <code>k</code> digits to make the smallest possible number. Return the result as a string (no leading zeros).',
  examples: [
    { input: 'num = "1432219", k = 3', output: '"1219"', explanation: 'Remove 4, 3, 2 to get 1219.' },
    { input: 'num = "10200", k = 1', output: '"200"', explanation: 'Remove 1 to get 0200 → "200".' },
    { input: 'num = "10", k = 2', output: '"0"' },
  ],
  constraints: ['1 ≤ k ≤ num.length ≤ 10⁵', 'num consists of digits only', 'num does not have leading zeros except "0"'],
  starterCode: `def remove_k_digits(num, k):
  pass`,
  functionName: 'remove_k_digits',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'Remove 3', args: ['1432219',3], expected: '1219' },
    { label: 'Leading zero', args: ['10200',1], expected: '200' },
    { label: 'Remove all', args: ['10',2], expected: '0' },
    { label: 'Already min', args: ['123',1], expected: '12' },
  ],
}
