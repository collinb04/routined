export default {
  id: 'distinct-subsequences',
  title: 'Distinct Subsequences',
  difficulty: 'hard',
  description: 'Given strings <code>s</code> and <code>t</code>, return the number of distinct subsequences of <code>s</code> that equal <code>t</code>.',
  examples: [
    { input: 's="rabbbit", t="rabbit"', output: '3', explanation: 'Three ways to choose letters from "rabbbit" to form "rabbit".' },
  ],
  constraints: ['1 ≤ s.length, t.length ≤ 1000', 's and t consist of lowercase English letters'],
  starterCode: `def num_distinct(s, t):
  pass`,
  functionName: 'num_distinct',
  conceptId: 'dp-2d',
  testCases: [
    { label: '"rabbbit"', args: ['rabbbit','rabbit'], expected: 3 },
    { label: '"babgbag"', args: ['babgbag','bag'], expected: 5 },
    { label: 'Exact match', args: ['a','a'], expected: 1 },
  ],
}
