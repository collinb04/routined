export default {
  id: 'palindrome-partitioning',
  title: 'Palindrome Partitioning',
  difficulty: 'medium',
  description: `<p>Given a string <code>s</code>, partition <code>s</code> such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of <code>s</code>.</p>`,
  examples: [
    { input: 's = "aab"', output: '[["a","a","b"],["aa","b"]]' },
    { input: 's = "a"', output: '[["a"]]' },
  ],
  constraints: ['1 <= s.length <= 16', 's consists only of lowercase English letters'],
  starterCode: `def partition(s):
  pass`,
  functionName: 'partition_run',
  conceptId: 'backtracking',
  runnerSetup: `def partition_run(s):
  result = partition(s)
  return sorted([sorted(p) for p in result])`,
  testCases: [
    { label: '"aab"', args: ['aab'], expected: [['a','a','b'],['aa','b']] },
    { label: '"a"', args: ['a'], expected: [['a']] },
  ],
}
