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
  bruteHint: 'Describe rescanning each cell\'s row, column, and box separately for duplicates, and the repeated work this causes',
  optimizeHint: 'Name the data structure that tracks seen digits per row, column, and box in a single pass',
  clues: [
    {
      id: 'three-independent-constraints',
      question: 'Validity requires checking rows, columns, and 3×3 boxes independently. What does "independently" imply about your validation structure?',
      options: [
        { label: 'One pass that checks all three simultaneously', isCorrect: true },
        { label: 'Three separate passes over the board', isCorrect: false, feedback: 'Three separate passes work but visit all 81 cells three times. A single pass over each cell can update row, column, and box tracking simultaneously in O(1) per cell.' },
        { label: 'Only rows and columns need checking', isCorrect: false, feedback: 'The 3×3 box constraint is explicitly listed as a rule. A board with valid rows and columns can still fail box validation — for example, placing 1 in multiple cells of the same box.' },
        { label: 'Check columns only since rows are implied', isCorrect: false, feedback: 'Row validity is not implied by column validity. A number can appear in a valid column but still be duplicated within its row. All three constraints must be checked independently.' },
      ],
      correctFeedback: 'For each cell (r, c), update three sets: seen_in_row[r], seen_in_col[c], and seen_in_box[r//3][c//3]. A single pass over all 81 cells handles all three checks.',
      wrongFeedback: [
        'At each cell, you can check row membership, column membership, and box membership at the same time. How many passes does that require?',
        'One set per row (9), one per column (9), one per box (9) — maintain all 27 in a single sweep. Each cell touches exactly one of each.',
      ],
    },
    {
      id: 'box-index-formula',
      question: 'For a cell at (row, col), which 3×3 box does it belong to? How do you compute the box index?',
      options: [
        { label: 'box = row * col', isCorrect: false, feedback: 'Multiplying row and column indices produces values like 0, 1, 4, 6 — not the 0–8 box indices you need. The correct mapping uses integer division: (row // 3, col // 3).' },
        { label: 'box_row = row // 3, box_col = col // 3', isCorrect: true },
        { label: 'box = row + col', isCorrect: false, feedback: 'Row + col gives values 0–16, not 0–8. And cells in different boxes can share the same sum — for example (0,2) and (1,1) both give 2 but may belong to different boxes.' },
        { label: 'box = row % 3 + col % 3', isCorrect: false, feedback: 'Taking the modulus folds multiple rows into the same bucket. Row 0 and row 3 both give row % 3 == 0 — you need row // 3 to distinguish which tier of boxes you are in.' },
      ],
      correctFeedback: 'Integer division maps rows 0–2 to box row 0, rows 3–5 to box row 1, rows 6–8 to box row 2 — and similarly for columns. The pair (row // 3, col // 3) uniquely identifies one of the nine 3×3 boxes.',
      wrongFeedback: [
        'The board has three rows of boxes (rows 0–2, 3–5, 6–8) and three columns of boxes. How do you map a cell row to which box row it falls in?',
        'Row // 3 gives box row 0, 1, or 2. Col // 3 gives box column 0, 1, or 2. Together they identify the 3×3 box.',
      ],
    },
    {
      id: 'skip-empty-cells',
      question: '"A \'.\' indicates an empty cell." How should you handle empty cells during validation?',
      options: [
        { label: 'Treat "." as the digit 0', isCorrect: false, feedback: 'Treating "." as 0 would flag duplicate empty cells as invalid. The problem says only filled cells need to be validated — skip "." entirely.' },
        { label: 'Skip "." cells without updating any tracking sets', isCorrect: true },
        { label: 'Count "." to verify the board has the right number of empty cells', isCorrect: false, feedback: 'The problem does not require a specific number of empty cells. Validation only concerns filled cells — skip "." without counting them.' },
        { label: '"." can never cause a constraint violation, so no check is needed', isCorrect: false, feedback: 'That reasoning is correct, but "skip without updating" is the specific action that implements it. You must explicitly skip "." so it does not pollute your seen-digit sets.' },
      ],
      correctFeedback: 'At each cell, check if board[r][c] == "."; if so, continue to the next cell. Only non-empty cells are added to the row/column/box sets.',
      wrongFeedback: [
        'What happens to your seen-digit sets if you insert "." as a value? Should it count as a repeated entry?',
        'Add a guard: if board[r][c] == ".", skip. Otherwise check for the digit in the relevant row, column, and box sets.',
      ],
    },
    {
      id: 'fixed-board-size',
      question: 'The board is always 9×9. What does this fixed size tell you about the complexity of your solution?',
      options: [
        { label: 'O(n²) where n = 9 — effectively O(1)', isCorrect: true },
        { label: 'O(n²) is too slow for this problem', isCorrect: false, feedback: 'The board is always exactly 81 cells — n is not a variable input. O(9²) = O(81) is a constant. There is no asymptotic complexity concern here.' },
        { label: 'You need O(n log n) to handle large boards', isCorrect: false, feedback: 'The board size is fixed at 9×9 — there are no "large boards." Any algorithm that visits each cell at most a constant number of times runs in constant time overall.' },
        { label: 'The board size affects which data structures are valid', isCorrect: false, feedback: 'The fixed size means the same simple sets work for any valid input. Data structure choice is not constrained by the 9×9 size.' },
      ],
      correctFeedback: 'A 9×9 board has exactly 81 cells. Any algorithm that visits each cell O(1) times runs in O(81) = O(1) — constant time. There is no scalability concern.',
      wrongFeedback: [
        'n is not a variable here — the board is always 9 rows by 9 columns. What does that say about the Big-O complexity of visiting every cell?',
        '81 cells visited once each is 81 operations regardless of what those cells contain. That is a constant — any single-pass approach is O(1) in terms of board size.',
      ],
    },
  ],
}
