export default {
  id: 'valid-sudoku',
  title: 'Valid Sudoku',
  difficulty: 'medium',
  description: `<p>Determine if a 9×9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:</p><p>Each row must contain the digits 1–9 without repetition. Each column must contain the digits 1–9 without repetition. Each of the nine 3×3 sub-boxes must contain the digits 1–9 without repetition. A <code>.</code> indicates an empty cell.</p>`,
  examples: [
    { input: 'board = (9x9 partially filled)', output: 'true' },
  ],
  constraints: ['board.length == 9', 'board[i].length == 9', 'board[i][j] is a digit 1-9 or "."'],
  starterCode: `class Solution:
    def is_valid_sudoku(self, board):
        pass`,
  runnerSetup: 'is_valid_sudoku = Solution().is_valid_sudoku',
  functionName: 'is_valid_sudoku',
  conceptId: 'arrays',
  testCases: [
    { label: 'valid board', args: [[['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]], expected: true },
    { label: 'duplicate in row', args: [[['8','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]], expected: false },
  ],
  bruteHint: 'A brute-force approach checks each filled cell by separately scanning its entire row, its entire column, and its 3×3 box for duplicates before moving to the next cell. Since the board is 9×9, every one of the 81 cells triggers up to three separate 9-element scans, so the same rows, columns, and boxes get re-read over and over. What is being repeated here that a single pass tracking already-seen digits would avoid?',
  optimizeComplexity: { time: 'O(1)', space: 'O(1)' },
  clues: [
    {
      id: 'three-independent-constraints',
      question: 'How you structure a validation pass depends on whether its checks can be combined or must stay separate. Validity requires checking rows, columns, and 3×3 boxes independently. What does "independently" imply about your validation structure?',
      highlight: { location: 'description', text: 'Each row must contain the digits 1–9 without repetition. Each column must contain the digits 1–9 without repetition. Each of the nine 3×3 sub-boxes must contain the digits 1–9 without repetition.' },
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
      question: 'Translating a 2D position into the right grouping is central to tracking constraints efficiently. For a cell at (row, col), which 3×3 box does it belong to? How do you compute the box index?',
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
      question: 'Not every cell on the board carries a constraint you need to track. "A \'.\' indicates an empty cell." How should you handle empty cells during validation?',
      highlight: { location: 'description', text: 'A <code>.</code> indicates an empty cell.' },
      options: [
        { label: 'Treat "." as the digit 0', isCorrect: false, feedback: 'Treating "." as 0 would flag duplicate empty cells as invalid. The problem says only filled cells need to be validated — skip "." entirely.' },
        { label: 'Skip "." cells without marking them as seen anywhere', isCorrect: true },
        { label: 'Count "." to verify the board has the right number of empty cells', isCorrect: false, feedback: 'The problem does not require a specific number of empty cells. Validation only concerns filled cells — skip "." without counting them.' },
        { label: '"." can never cause a constraint violation, so no check is needed', isCorrect: false, feedback: 'That reasoning is correct, but "skip without marking" is the specific action that implements it. You must explicitly skip "." so it does not pollute your seen-digit tracking.' },
      ],
      correctFeedback: 'At each cell, check if board[r][c] == "."; if so, continue to the next cell. Only non-empty cells are added to the row/column/box sets.',
      wrongFeedback: [
        'What happens to your seen-digit sets if you insert "." as a value? Should it count as a repeated entry?',
        'Add a guard: if board[r][c] == ".", skip. Otherwise check for the digit in the relevant row, column, and box sets.',
      ],
    },
    {
      id: 'fixed-board-size',
      question: 'Recognizing when an input size is fixed rather than variable changes how you should reason about efficiency. The board is always 9×9. What does this fixed size tell you about the complexity of your solution?',
      highlight: { location: 'constraint', text: 'board.length == 9' },
      options: [
        { label: 'O(n²) where n = 9 — effectively O(1)', isCorrect: true },
        { label: 'O(n²) is too slow for this problem', isCorrect: false, feedback: 'The board is always exactly 81 cells — n is not a variable input. O(9²) = O(81) is a constant. There is no asymptotic complexity concern here.' },
        { label: 'You need O(n log n) to handle large boards', isCorrect: false, feedback: 'The board size is fixed at 9×9 — there are no "large boards." Any algorithm that visits each cell at most a constant number of times runs in constant time overall.' },
        { label: 'The board size affects which approach is valid', isCorrect: false, feedback: 'The fixed size means the same simple approach works for any valid input. Approach choice is not constrained by the 9×9 size.' },
      ],
      correctFeedback: 'A 9×9 board has exactly 81 cells. Any algorithm that visits each cell O(1) times runs in O(81) = O(1) — constant time. There is no scalability concern.',
      wrongFeedback: [
        'n is not a variable here — the board is always 9 rows by 9 columns. What does that say about the Big-O complexity of visiting every cell?',
        '81 cells visited once each is 81 operations regardless of what those cells contain. That is a constant — any single-pass approach is O(1) in terms of board size.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def is_valid_sudoku(self, board):
        rows = [set() for _ in range(9)]
        cols = [set() for _ in range(9)]
        boxes = [set() for _ in range(9)]
        for r in range(9):
            for c in range(9):
                val = board[r][c]
                if val == '.':
                    continue
                box_idx = (r // 3) * 3 + (c // 3)
                if val in rows[r] or val in cols[c] or val in boxes[box_idx]:
                    return False
                rows[r].add(val)
                cols[c].add(val)
                boxes[box_idx].add(val)
        return True`,
  solutionComplexity: { time: 'O(1)', space: 'O(1)' },
  solutionCaveat: 'The box index formula <code>(r // 3) * 3 + (c // 3)</code> maps each cell to one of 9 box numbers 0-8 laid out left-to-right, top-to-bottom — <code>r // 3 + c // 3</code> (without the <code>* 3</code>) would collapse different boxes onto the same index, since it only ranges 0-4 instead of covering all 9 boxes distinctly.',
  solutionExplanation: 'Every cell participates in exactly three groups — its row, its column, and its 3×3 box — so checking a value against all three simultaneously as a single pass moves through the board catches a duplicate the instant it would occur, instead of re-scanning each group from scratch for every cell. Since the board size is fixed at 9×9 regardless of input, visiting all 81 cells once each is a constant amount of work, which is exactly why the target complexity is O(1) rather than a function of some variable n.',
  solution: {
    patternName: 'Simultaneous multi-constraint tracking via hashing — use when several independent constraints all key off the same single pass over the data',
    approaches: [
      {
        approachName: 'Brute force',
        oneLineIdea: 'For each filled cell, separately re-scan its row, column, and box',
        subgoals: [
          { label: 'Visit every filled cell', explanation: 'Loop over all 81 cells, skipping empty ones' },
          { label: 'Re-scan three regions per cell', explanation: 'For each filled cell, separately scan its full row, column, and 3×3 box for a duplicate' },
          { label: 'Fail fast on any duplicate', explanation: 'Return false the moment any of the three scans finds a repeat' },
        ],
        code: `def is_valid_sudoku(board):
    for r in range(9):
        for c in range(9):                                    # visit every filled cell
            val = board[r][c]
            if val == '.':
                continue
            row_count = sum(1 for cc in range(9) if board[r][cc] == val)
            col_count = sum(1 for rr in range(9) if board[rr][c] == val)
            box_r, box_c = 3 * (r // 3), 3 * (c // 3)
            box_count = sum(
                1 for rr in range(box_r, box_r + 3)
                for cc in range(box_c, box_c + 3)
                if board[rr][cc] == val
            )                                                  # re-scan three regions per cell
            if row_count > 1 or col_count > 1 or box_count > 1:
                return False                                   # fail fast on any duplicate
    return True`,
        timeComplexity: 'O(1) — bounded by the fixed 9×9 board, but each of the 81 cells triggers three separate 9-element scans, roughly 27× more work than the single-pass version',
        spaceComplexity: 'O(1) — no auxiliary structure, only loop counters',
        whenYouWouldActuallyUseThis: 'Never in practice once you see the single-pass version — it re-reads the same rows, columns, and boxes over and over for no benefit, purely because it validates one constraint at a time instead of all three together.',
      },
      {
        approachName: 'Single-pass hash sets',
        oneLineIdea: 'Track row, column, and box membership together in one sweep',
        subgoals: [
          { label: 'Set up one seen-set per row, column, and box', explanation: '27 sets total, one per row, one per column, one per 3×3 box' },
          { label: 'Update all three sets for each filled cell', explanation: 'A single pass visits each cell once, checking and inserting into its row, column, and box set together' },
          { label: 'Fail the instant any set already has the value', explanation: 'A duplicate in any one of the three sets is an immediate invalid board' },
        ],
        code: `def is_valid_sudoku(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]           # set up one seen-set per row, column, and box

    for r in range(9):
        for c in range(9):
            val = board[r][c]
            if val == '.':
                continue
            box_idx = (r // 3) * 3 + (c // 3)
            if val in rows[r] or val in cols[c] or val in boxes[box_idx]:
                return False                     # fail the instant any set already has the value
            rows[r].add(val)
            cols[c].add(val)
            boxes[box_idx].add(val)              # update all three sets for each filled cell

    return True`,
        timeComplexity: 'O(1) — 81 cells, each doing O(1) work across three set lookups and three inserts, still bounded by the fixed board size but with no repeated re-scanning',
        spaceComplexity: 'O(1) — 27 sets, each holding at most 9 digits, all bounded by the fixed board size',
        whenYouWouldActuallyUseThis: 'The default choice — one pass instead of three per cell, using the box-index formula (row // 3, col // 3) to route each cell to the right box set.',
      },
    ],
    comparisonTable: [
      { approach: 'Brute force', time: 'O(1) (~27× the work)', space: 'O(1)', structuralUnlock: 'None — every cell triggers three fresh scans over its row, column, and box' },
      { approach: 'Single-pass hash sets', time: 'O(1)', space: 'O(1)', structuralUnlock: 'Tracking row, column, and box membership simultaneously in 27 sets means every cell is visited exactly once instead of triggering three re-scans' },
    ],
    transferNote: 'Tracking several independent constraints in one pass with parallel hash sets is the same move behind Contains Duplicate II (a sliding window of seen values instead of a fixed board) and any problem with multiple simultaneous "have I seen this in region X?" checks. Whenever a problem lists several independent rules that all key off the same traversal, look for a way to update one seen-structure per rule in a single pass rather than validating each rule with its own separate scan.',
    retrievalCheck: [
      'If the board were n×n for an arbitrary n instead of fixed at 9×9, would this approach still be O(1), or would it become a genuine function of n?',
      'Why does the box index formula use (r // 3) * 3 + (c // 3) instead of just r // 3 + c // 3?',
      'If you needed to report where the first duplicate was found instead of just true/false, what would you add to each set?',
    ],
  },
}
