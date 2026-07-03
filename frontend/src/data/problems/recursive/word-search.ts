export default {
  id: 'word-search',
  title: 'Word Search',
  difficulty: 'medium',
  description: `<p>Given an <code>m x n</code> grid of characters <code>board</code> and a string <code>word</code>, return <code>true</code> if <code>word</code> exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same cell may not be used more than once.</p>`,
  examples: [
    { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
    { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: 'false' },
  ],
  constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 6', '1 <= word.length <= 15'],
  starterCode: `def exist(board, word):
  pass`,
  functionName: 'exist',
  conceptId: 'backtracking',
  testCases: [
    { label: 'ABCCED', args: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCCED'], expected: true },
    { label: 'ABCB false', args: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCB'], expected: false },
  ],
}
