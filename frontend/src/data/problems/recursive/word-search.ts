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
  clues: [
    {
      id: 'constraint-board-size',
      question: 'm, n ≤ 6 and word.length ≤ 15. What does this small size say about the acceptable complexity?',
      options: [
        { label: 'Only O(m × n) solutions are acceptable', isCorrect: false, feedback: 'With a 6 × 6 board and word length 15, O(m × n × 4^L) DFS is at most 36 × 4^15 ≈ 36 billion — actually tight. In practice, backtracking prunes most branches early, making it feasible.' },
        { label: 'Backtracking with early pruning is sufficient', isCorrect: true },
        { label: 'O(n!) enumeration of all paths is feasible', isCorrect: false, feedback: 'O(n!) for n = 36 cells is astronomically large. Backtracking prunes dead branches early — it does not enumerate all permutations of cells.' },
        { label: 'A hash map of all possible paths solves it in O(1)', isCorrect: false, feedback: 'Precomputing all paths would require storing up to 4^15 sequences — far too many. Backtracking explores paths on demand and stops as soon as a mismatch occurs.' },
      ],
      correctFeedback: 'The 6 × 6 board has 36 cells. DFS from each cell explores at most 4^15 paths in theory, but backtracking prunes mismatches immediately. In practice, the constraint is tight but the pruning makes it work.',
      wrongFeedback: [
        'How does early pruning change the effective search space? If the first character doesn\'t match, how many paths do you skip?',
        'Backtracking stops exploring a path the moment the current character doesn\'t match. How does that bound the actual work compared to the theoretical worst case?',
      ],
    },
    {
      id: 'no-cell-reuse',
      question: '"The same cell may not be used more than once." How do you enforce this without extra space overhead?',
      options: [
        { label: 'Keep a separate boolean visited matrix', isCorrect: false, feedback: 'A boolean matrix works correctly but adds O(m × n) extra space. Marking the board cell in place and restoring it on backtrack achieves the same result with O(1) extra space per step.' },
        { label: 'Temporarily overwrite the cell and restore on backtrack', isCorrect: true },
        { label: 'Only move right and down to avoid revisiting', isCorrect: false, feedback: 'Restricting movement direction prevents valid words that require going up or left. The word can snake in any direction — you must track which cells are currently in use, not restrict direction.' },
        { label: 'Record the path and check it before each move', isCorrect: false, feedback: 'Checking the entire path list before each move is O(path length) per step. In-place marking is O(1) — just check if the cell is the sentinel character.' },
      ],
      correctFeedback: 'Replace board[r][c] with a sentinel (e.g., "#") when entering a cell, and restore the original character when backtracking. This prevents revisiting within the current path at O(1) cost per step.',
      wrongFeedback: [
        'You need to mark cells as "in use" for the current path but "available again" after backtracking. Where is the most direct place to record that information?',
        'The board itself is mutable. What temporary change makes a cell unvisitable, and when do you undo it?',
      ],
    },
    {
      id: 'output-boolean-early-exit',
      question: 'The output is a single boolean. What does this let you do as soon as you find a valid path?',
      options: [
        { label: 'Continue searching to confirm no other paths exist', isCorrect: false, feedback: 'The output only requires knowing whether any path exists — not all paths. Continuing after finding one is unnecessary work.' },
        { label: 'Return true immediately and stop all recursion', isCorrect: true },
        { label: 'Store the path and return it with the boolean', isCorrect: false, feedback: 'The output is a boolean, not the path itself. Storing the path does extra work that the problem does not require.' },
        { label: 'Restart DFS from a different starting cell to verify', isCorrect: false, feedback: 'One valid path is sufficient — there is no verification step. Return true immediately when the last character of the word is matched.' },
      ],
      correctFeedback: 'Once you match the last character of the word, return true. This propagates up through all recursive calls immediately. No need to continue searching — existence is confirmed.',
      wrongFeedback: [
        'The output asks whether any valid path exists. How many valid paths do you need to find?',
        'One match is conclusive. How does returning true from deep in the recursion propagate the answer back to the caller?',
      ],
    },
    {
      id: 'starting-cell-search',
      question: 'The word can start at any cell. What does this imply about how you initiate the search?',
      options: [
        { label: 'Start DFS only from the top-left corner', isCorrect: false, feedback: 'The word can start anywhere on the board. Starting only from (0, 0) would miss words that begin at any other cell.' },
        { label: 'Try DFS from every cell as a potential starting point', isCorrect: true },
        { label: 'Sort cells by character and start from the matching one', isCorrect: false, feedback: 'Multiple cells may match the first character. You must try all of them — sorting selects one, which could miss valid starting positions.' },
        { label: 'Only start from cells on the board perimeter', isCorrect: false, feedback: 'Words can begin at any interior cell, not just the perimeter. A cell in the middle of the board is a valid starting point.' },
      ],
      correctFeedback: 'You iterate over every (row, col) and launch DFS from any cell whose character matches word[0]. Returning true from any of these launches short-circuits the outer loop immediately.',
      wrongFeedback: [
        'The word can start at any position. How many cells could be valid starting points for a word beginning with "A" on a board full of "A"s?',
        'You check every cell as a potential start. As soon as one DFS returns true, what should you do with the remaining starting cells?',
      ],
    },
  ],
}
