export default {
  id: 'longest-common-subsequence',
  title: 'Longest Common Subsequence',
  difficulty: 'medium',
  description: 'Given two strings <code>text1</code> and <code>text2</code>, return the length of their longest common subsequence. A subsequence need not be contiguous.',
  examples: [
    { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: 'LCS is "ace".' },
    { input: 'text1 = "abc", text2 = "abc"', output: '3' },
    { input: 'text1 = "abc", text2 = "def"', output: '0' },
  ],
  constraints: ['1 ≤ text1.length, text2.length ≤ 1000', 'Both consist of lowercase English letters'],
  starterCode: `def longest_common_subsequence(text1, text2):
  pass`,
  functionName: 'longest_common_subsequence',
  conceptId: 'dp-2d',
  testCases: [
    { label: '"ace"', args: ['abcde','ace'], expected: 3 },
    { label: 'Same string', args: ['abc','abc'], expected: 3 },
    { label: 'No common', args: ['abc','def'], expected: 0 },
  ],
}
