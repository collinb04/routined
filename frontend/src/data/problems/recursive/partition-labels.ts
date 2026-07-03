export default {
  id: 'partition-labels',
  title: 'Partition Labels',
  difficulty: 'medium',
  description: 'You are given a string <code>s</code>. Partition it into as many parts as possible such that each letter appears in at most one part. Return a list of the sizes of these parts.',
  examples: [
    { input: 's = "ababcbacadefegdehijhklij"', output: '[9,7,8]', explanation: '"ababcbaca" (9), "defegde" (7), "hijhklij" (8).' },
    { input: 's = "eccbbbbdec"', output: '[10]' },
  ],
  constraints: ['1 ≤ s.length ≤ 500', 's consists of lowercase English letters'],
  starterCode: `def partition_labels(s):
  pass`,
  functionName: 'partition_labels',
  conceptId: 'greedy',
  testCases: [
    { label: 'Three parts', args: ['ababcbacadefegdehijhklij'], expected: [9,7,8] },
    { label: 'One part', args: ['eccbbbbdec'], expected: [10] },
    { label: 'All different', args: ['abc'], expected: [1,1,1] },
  ],
}
