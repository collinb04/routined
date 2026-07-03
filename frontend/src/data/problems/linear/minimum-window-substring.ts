export default {
  id: 'minimum-window-substring',
  title: 'Minimum Window Substring',
  difficulty: 'hard',
  description: `<p>Given two strings <code>s</code> and <code>t</code> of lengths <code>m</code> and <code>n</code> respectively, return the minimum window substring of <code>s</code> such that every character in <code>t</code> (including duplicates) is included in the window. If there is no such substring, return the empty string <code>""</code>.</p>`,
  examples: [
    { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
    { input: 's = "a", t = "a"', output: '"a"' },
    { input: 's = "a", t = "aa"', output: '""' },
  ],
  constraints: ['m == s.length', 'n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters'],
  starterCode: `def min_window(s, t):
  pass`,
  functionName: 'min_window',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'ADOBECODEBANC', args: ['ADOBECODEBANC', 'ABC'], expected: 'BANC' },
    { label: 'exact match', args: ['a', 'a'], expected: 'a' },
    { label: 'no match', args: ['a', 'aa'], expected: '' },
  ],
}
