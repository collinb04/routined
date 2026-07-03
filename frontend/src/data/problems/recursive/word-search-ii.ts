export default {
  id: 'word-search-ii',
  title: 'Word Search II',
  difficulty: 'hard',
  description: 'Given an <code>m × n</code> board of characters and a list of strings <code>words</code>, return all words on the board. Each word must be formed by sequentially adjacent cells (horizontally or vertically), and cells cannot be reused.',
  examples: [
    { input: 'board=[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words=["oath","pea","eat","rain"]', output: '["eat","oath"]' },
  ],
  constraints: ['1 ≤ m, n ≤ 12', '1 ≤ words.length ≤ 3 × 10⁴', 'All inputs consist of lowercase English letters'],
  starterCode: `def find_words(board, words):
  pass`,
  functionName: 'find_words',
  conceptId: 'tries',
  testCases: [
    { label: 'Standard board', args: [[['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']],['oath','pea','eat','rain']], expected: ['eat','oath'] },
    { label: 'Single cell', args: [[['a']],['a']], expected: ['a'] },
    { label: 'No matches', args: [[['a','b'],['c','d']],['xyz']], expected: [] },
  ],
}
