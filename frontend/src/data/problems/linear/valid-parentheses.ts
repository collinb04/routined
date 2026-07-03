export default {
  id: 'valid-parentheses',
  title: 'Valid Parentheses',
  difficulty: 'easy',
  description: 'Given a string <code>s</code> containing only <code>(</code>, <code>)</code>, <code>{</code>, <code>}</code>, <code>[</code>, and <code>]</code>, return <code>true</code> if the input string is valid. An input string is valid if every open bracket is closed by the same type of bracket in the correct order.',
  examples: [
    { input: 's = "()"', output: 'true' },
    { input: 's = "()[]{}"', output: 'true' },
    { input: 's = "(]"', output: 'false' },
  ],
  constraints: [
    '1 ≤ s.length ≤ 10⁴',
    's consists of parentheses only',
  ],
  starterCode: `def is_valid(s):
  pass`,
  functionName: 'is_valid',
  conceptId: 'stacks-queues',
  testCases: [
    { label: 'Simple pair', args: ['()'], expected: true },
    { label: 'All types', args: ['()[]{}'], expected: true },
    { label: 'Mismatched', args: ['(]'], expected: false },
    { label: 'Wrong order', args: ['([)]'], expected: false },
    { label: 'Nested', args: ['{[]}'], expected: true },
  ],
}
