export default {
  id: 'valid-sudoku',
  title: 'Valid Sudoku',
  difficulty: 'medium',
  description: `<p>Determine if a 9×9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:</p><p>Each row must contain the digits 1–9 without repetition. Each column must contain the digits 1–9 without repetition. Each of the nine 3×3 sub-boxes must contain the digits 1–9 without repetition. A <code>.</code> indicates an empty cell.</p>`,
  examples: [
    { input: 'board = (9x9 partially filled)', output: 'true' },
  ],
  constraints: ['board.length == 9', 'board[i].length == 9', 'board[i][j] is a digit 1-9 or "."'],
  starterCode: `def is_valid_sudoku(board):
  pass`,
  functionName: 'is_valid_sudoku',
  conceptId: 'arrays',
  testCases: [
    { label: 'valid board', args: [[['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]], expected: true },
    { label: 'duplicate in row', args: [[['8','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]], expected: false },
  ],
}
