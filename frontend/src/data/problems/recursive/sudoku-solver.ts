export default {
  id: 'sudoku-solver',
  title: 'Sudoku Solver',
  difficulty: 'hard',
  description: 'Write a program to solve a Sudoku puzzle by filling in the empty cells (\'.\' denotes empty). There is always exactly one solution. The puzzle is a 9×9 board.',
  examples: [
    { input: 'board=[["5","3",".",".","7",".",".",".","."],...]', output: '[["5","3","4","6","7","8","9","1","2"],...]' },
  ],
  constraints: ['board.length == board[0].length == 9', 'Empty cells are denoted by \'.\'', 'The solution is unique'],
  starterCode: `def solve_sudoku(board):
  pass`,
  functionName: 'solve_sudoku',
  conceptId: 'backtracking',
  testCases: [
    { label: 'Classic puzzle', args: [[['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]], expected: [['5','3','4','6','7','8','9','1','2'],['6','7','2','1','9','5','3','4','8'],['1','9','8','3','4','2','5','6','7'],['8','5','9','7','6','1','4','2','3'],['4','2','6','8','5','3','7','9','1'],['7','1','3','9','2','4','8','5','6'],['9','6','1','5','3','7','2','8','4'],['2','8','7','4','1','9','6','3','5'],['3','4','5','2','8','6','1','7','9']] },
  ],
  bruteHint: 'Describe trying every digit 1-9 in every empty cell and only checking whether the board is valid after it is completely filled',
  optimizeHint: 'Name the technique that checks row, column, and box validity before placing each digit, so invalid branches are abandoned immediately rather than explored to completion',
  clues: [
    {
      id: 'constraint-fixed-board-size',
      question: 'The board is always 9×9 — a fixed size, not parameterized. What does this tell you about complexity analysis?',
      options: [
        { label: 'The algorithm must be O(1) since the size never changes', isCorrect: false, feedback: 'Fixed size does not mean O(1) — you still search through up to 81 cells, each with up to 9 digit choices. O(1) would mean no work at all.' },
        { label: 'Worst-case complexity is bounded by a constant', isCorrect: true },
        { label: 'You need an O(log n) approach to handle large inputs', isCorrect: false, feedback: 'There is no n to scale — the board is always 9×9. Worrying about O(log n) is irrelevant when input size is fixed.' },
        { label: 'You should precompute all possible boards', isCorrect: false, feedback: 'Precomputing is impossible in practice — the number of possible Sudoku configurations is astronomically large. You solve the given board by backtracking through its specific constraints.' },
      ],
      correctFeedback: 'With a fixed 9×9 board, even an exponential backtracking algorithm runs in constant time in the formal sense — though in practice constraint propagation determines how fast it finishes.',
      wrongFeedback: [
        'If the board size never changes, what does "worst case" even mean for this problem?',
        'A 9×9 grid has 81 cells. Even if each had 9 choices, the search space is bounded. Does it grow with input?',
      ],
    },
    {
      id: 'unique-solution-guarantee',
      question: '"The solution is unique." What does this let you do during backtracking?',
      options: [
        { label: 'Return immediately after filling the board once', isCorrect: true },
        { label: 'Skip validating rows — only check columns', isCorrect: false, feedback: 'Uniqueness of the solution does not relax the validity constraints. Rows, columns, and 3×3 boxes must all be checked before placing any digit.' },
        { label: 'Try digits in any order without backtracking', isCorrect: false, feedback: 'Uniqueness means exactly one solution exists, not that any sequence of choices leads there. You still need backtracking to undo wrong placements.' },
        { label: 'Collect all solutions then pick the unique one', isCorrect: false, feedback: 'Collecting all solutions wastes work — the guarantee means the first complete, valid board you find is the answer. Stop as soon as the board is fully filled.' },
      ],
      correctFeedback: 'Right — since exactly one solution exists, the first fully-filled valid board is the answer. You can return true immediately from the recursive call that completes it, unwinding the stack without collecting alternatives.',
      wrongFeedback: [
        'The guarantee means there is no ambiguity about which complete board is correct. What does that let you skip after finding a valid completion?',
        'If exactly one solution exists, do you ever need to keep searching after filling the last empty cell?',
      ],
    },
    {
      id: 'three-constraint-types',
      question: 'Sudoku validity requires each digit 1–9 to appear once per row, once per column, and once per 3×3 box. What does this imply about your placement check?',
      options: [
        { label: 'Check only the row — it dominates', isCorrect: false, feedback: 'All three constraints are independent. A digit can be valid in its row but already present in its column or its 3×3 box — you must check all three before placing.' },
        { label: 'Check all three constraints before each placement', isCorrect: true },
        { label: 'Check row and column; the box constraint is redundant', isCorrect: false, feedback: 'The box constraint is not redundant. A digit can be absent from its row and column but already present in its 3×3 box — that placement would be invalid.' },
        { label: 'Check constraints only when backtracking', isCorrect: false, feedback: 'Checking only at backtrack time means you place invalid digits first and undo them after — the opposite of what you want. Check before placing to prune invalid branches early.' },
      ],
      correctFeedback: 'Before placing any digit, verify it does not already appear in the same row, column, or 3×3 box. This is the core validity check and the pruning mechanism that makes backtracking efficient.',
      wrongFeedback: [
        'Imagine a digit that is absent from its row and column. Is it guaranteed to be a valid placement?',
        'Three independent constraints each eliminate candidates. Which must all pass before you commit a digit to a cell?',
      ],
    },
    {
      id: 'in-place-modification',
      question: 'The function signature is solve_sudoku(board) with no return value. What does this tell you about how to deliver the answer?',
      options: [
        { label: 'Create a copy and return it', isCorrect: false, feedback: 'The signature has no return value — returning a copy would be ignored by the caller. The board must be modified in place.' },
        { label: 'Modify the board in place', isCorrect: true },
        { label: 'Print the solution to stdout', isCorrect: false, feedback: 'The test harness reads the board object after your function returns — printing does nothing for the grader. Modify the board directly.' },
        { label: 'Return the solved board as a list of strings', isCorrect: false, feedback: 'The function has no return value. The contract is to fill the board object that was passed in — the caller reads the modified board directly.' },
      ],
      correctFeedback: 'Exactly — the board is a mutable 2D list. You fill empty cells during backtracking and restore them (set back to \'.\') when a branch fails. The caller inspects the board after the function returns.',
      wrongFeedback: [
        'No return value means the caller does not receive a new object. Where does the answer have to go?',
        'You are given a mutable board. When your function returns, what state should the board be in?',
      ],
    },
  ],
}
