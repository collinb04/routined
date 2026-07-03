export default {
  id: 'word-break',
  title: 'Word Break',
  difficulty: 'medium',
  description: `<p>Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.</p>`,
  examples: [
    { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true' },
    { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: 'true' },
    { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: 'false' },
  ],
  constraints: ['1 <= s.length <= 300', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 20'],
  starterCode: `def word_break(s, word_dict):
  pass`,
  functionName: 'word_break',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'leetcode', args: ['leetcode', ['leet','code']], expected: true },
    { label: 'applepenapple', args: ['applepenapple', ['apple','pen']], expected: true },
    { label: 'catsandog', args: ['catsandog', ['cats','dog','sand','and','cat']], expected: false },
  ],
}
