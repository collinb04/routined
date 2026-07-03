export default {
  id: 'longest-common-prefix',
  title: 'Longest Common Prefix',
  difficulty: 'easy',
  description: 'Write a function to find the longest common prefix string among an array of strings. Return an empty string if there is no common prefix.',
  examples: [
    { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
    { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: 'No common prefix.' },
  ],
  constraints: ['1 ≤ strs.length ≤ 200', '0 ≤ strs[i].length ≤ 200', 'strs[i] consists of lowercase English letters'],
  starterCode: `def longest_common_prefix(strs):
  pass`,
  functionName: 'longest_common_prefix',
  conceptId: 'strings',
  testCases: [
    { label: '"fl"', args: [['flower','flow','flight']], expected: 'fl' },
    { label: 'No prefix', args: [['dog','racecar','car']], expected: '' },
    { label: 'Single string', args: [['alone']], expected: 'alone' },
    { label: 'All same', args: [['aa','aa','aa']], expected: 'aa' },
  ],
}
