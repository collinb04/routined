export default {
  id: 'decode-string',
  title: 'Decode String',
  difficulty: 'medium',
  description: 'Given an encoded string like <code>"3[a2[c]]"</code>, return its decoded string. The encoding rule is <code>k[encoded_string]</code>, where the string inside is repeated exactly <code>k</code> times.',
  examples: [
    { input: 's = "3[a]2[bc]"', output: '"aaabcbc"' },
    { input: 's = "3[a2[c]]"', output: '"accaccacc"' },
  ],
  constraints: ['1 ≤ s.length ≤ 30', 's consists of digits, lowercase letters, and brackets', 'All integers are in range [1, 300]'],
  starterCode: `def decode_string(s):
  pass`,
  functionName: 'decode_string',
  conceptId: 'stack',
  testCases: [
    { label: 'Simple', args: ['3[a]2[bc]'], expected: 'aaabcbc' },
    { label: 'Nested', args: ['3[a2[c]]'], expected: 'accaccacc' },
    { label: 'Single', args: ['2[abc]'], expected: 'abcabc' },
    { label: 'No brackets', args: ['abc'], expected: 'abc' },
  ],
}
