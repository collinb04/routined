export default {
  id: 'is-subsequence',
  title: 'Is Subsequence',
  difficulty: 'easy',
  description: 'Given strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>s</code> is a subsequence of <code>t</code>. A subsequence maintains relative order but not necessarily contiguous positions.',
  examples: [
    { input: 's = "abc", t = "ahbgdc"', output: 'true', explanation: 'a-h-b-g-d-c contains a, b, c in order.' },
    { input: 's = "axc", t = "ahbgdc"', output: 'false' },
  ],
  constraints: ['0 ≤ s.length ≤ 100', '0 ≤ t.length ≤ 10⁴', 's and t consist of lowercase English letters'],
  starterCode: `def is_subsequence(s, t):
  pass`,
  functionName: 'is_subsequence',
  conceptId: 'strings',
  testCases: [
    { label: 'Is subsequence', args: ['abc','ahbgdc'], expected: true },
    { label: 'Not subsequence', args: ['axc','ahbgdc'], expected: false },
    { label: 'Empty s', args: ['','ahbgdc'], expected: true },
    { label: 'Empty t', args: ['a',''], expected: false },
  ],
}
