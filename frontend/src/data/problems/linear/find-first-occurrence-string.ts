export default {
  id: 'find-first-occurrence-string',
  title: 'Find the Index of the First Occurrence in a String',
  difficulty: 'easy',
  description: 'Given strings <code>haystack</code> and <code>needle</code>, return the index of the first occurrence of <code>needle</code> in <code>haystack</code>, or -1 if <code>needle</code> is not part of <code>haystack</code>.',
  examples: [
    { input: 'haystack = "sadbutsad", needle = "sad"', output: '0', explanation: '"sad" first appears at index 0.' },
    { input: 'haystack = "leetcode", needle = "leeto"', output: '-1' },
  ],
  constraints: ['1 ≤ haystack.length, needle.length ≤ 10⁴', 'Both strings consist of lowercase English letters'],
  starterCode: `def str_str(haystack, needle):
  pass`,
  functionName: 'str_str',
  conceptId: 'strings',
  testCases: [
    { label: 'Found at start', args: ['sadbutsad','sad'], expected: 0 },
    { label: 'Not found', args: ['leetcode','leeto'], expected: -1 },
    { label: 'Found in middle', args: ['hello','ll'], expected: 2 },
    { label: 'Empty needle', args: ['hello',''], expected: 0 },
  ],
}
