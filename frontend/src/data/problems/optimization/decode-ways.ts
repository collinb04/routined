export default {
  id: 'decode-ways',
  title: 'Decode Ways',
  difficulty: 'medium',
  description: `<p>A message containing letters from A–Z can be encoded into numbers using the mapping <code>A=1, B=2, ..., Z=26</code>. Given a string <code>s</code> containing only digits, return the number of ways to decode it. If the entire string cannot be decoded in any valid way, return 0.</p>`,
  examples: [
    { input: 's = "12"', output: '2 ("AB" or "L")' },
    { input: 's = "226"', output: '3 ("BZ","VF","BBF")' },
    { input: 's = "06"', output: '0' },
  ],
  constraints: ['1 <= s.length <= 100', 's contains only digits and may contain leading zeros'],
  starterCode: `def num_decodings(s):
  pass`,
  functionName: 'num_decodings',
  conceptId: 'dp-1d',
  testCases: [
    { label: '"12"', args: ['12'], expected: 2 },
    { label: '"226"', args: ['226'], expected: 3 },
    { label: '"06"', args: ['06'], expected: 0 },
  ],
}
