export default {
  id: 'word-ladder',
  title: 'Word Ladder',
  difficulty: 'hard',
  description: `<p>A transformation sequence from word <code>beginWord</code> to word <code>endWord</code> using a dictionary <code>wordList</code> is a sequence such that every adjacent pair of words differs by exactly one letter and every word is in the dictionary. Return the number of words in the shortest transformation sequence, or 0 if no such sequence exists.</p>`,
  examples: [
    { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5' },
    { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', output: '0' },
  ],
  constraints: ['1 <= beginWord.length <= 10', 'endWord.length == beginWord.length', '1 <= wordList.length <= 5000', 'All words have the same length'],
  starterCode: `def ladder_length(begin_word, end_word, word_list):
  pass`,
  functionName: 'ladder_length',
  conceptId: 'graphs',
  testCases: [
    { label: 'hit→cog', args: ['hit', 'cog', ['hot','dot','dog','lot','log','cog']], expected: 5 },
    { label: 'no path', args: ['hit', 'cog', ['hot','dot','dog','lot','log']], expected: 0 },
  ],
}
