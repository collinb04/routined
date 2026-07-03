export default {
  id: 'substring-concatenation-all-words',
  title: 'Substring with Concatenation of All Words',
  difficulty: 'hard',
  description: 'Given a string <code>s</code> and an array <code>words</code> (all same length), return all starting indices of substrings that are a concatenation of all words in any order.',
  examples: [
    { input: 's="barfoothefoobarman", words=["foo","bar"]', output: '[0,9]', explanation: '"barfoo" starts at 0; "foobar" starts at 9.' },
    { input: 's="wordgoodgoodgoodbestword", words=["word","good","best","word"]', output: '[]' },
  ],
  constraints: ['1 ≤ s.length ≤ 10⁴', '1 ≤ words.length ≤ 5000', 'words[i].length == 1..30'],
  starterCode: `def find_substring(s, words):
  pass`,
  functionName: 'find_substring',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'Two indices', args: ['barfoothefoobarman',['foo','bar']], expected: [0,9] },
    { label: 'No match', args: ['wordgoodgoodgoodbestword',['word','good','best','word']], expected: [] },
  ],
}
