export default {
  id: 'word-break-ii',
  title: 'Word Break II',
  difficulty: 'hard',
  description: 'Given a string <code>s</code> and a dictionary <code>wordDict</code>, add spaces in <code>s</code> to construct all possible sentences where each word is in the dictionary. Return all such sentences.',
  examples: [
    { input: 's="catsanddog", wordDict=["cat","cats","and","sand","dog"]', output: '["cat sand dog","cats and dog"]' },
  ],
  constraints: ['1 ≤ s.length ≤ 20', '1 ≤ wordDict.length ≤ 1000', '1 ≤ wordDict[i].length ≤ 10', 's and wordDict[i] consist of lowercase letters'],
  starterCode: `def word_break(s, word_dict):
  pass`,
  functionName: 'word_break',
  conceptId: 'backtracking',
  testCases: [
    { label: 'Two sentences', args: ['catsanddog',['cat','cats','and','sand','dog']], expected: ['cat sand dog','cats and dog'] },
    { label: 'No solution', args: ['a',['b']], expected: [] },
  ],
}
