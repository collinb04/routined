export default {
  id: 'n-queens',
  title: 'N-Queens',
  difficulty: 'hard',
  description: `<p>The N-queens puzzle is the problem of placing <code>n</code> queens on an <code>n x n</code> chessboard such that no two queens attack each other. Given an integer <code>n</code>, return all distinct solutions to the N-queens puzzle. Each solution contains a distinct board configuration where <code>'Q'</code> indicates a queen and <code>'.'</code> indicates an empty space.</p>`,
  examples: [
    { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
    { input: 'n = 1', output: '[["Q"]]' },
  ],
  constraints: ['1 <= n <= 9'],
  starterCode: `def solve_n_queens(n):
  pass`,
  functionName: 'solve_n_queens_run',
  conceptId: 'backtracking',
  runnerSetup: `def solve_n_queens_run(n):
  return sorted(solve_n_queens(n))`,
  testCases: [
    { label: 'n=4', args: [4], expected: [['..Q.','Q...','...Q','.Q..'],['.Q..','...Q','Q...','..Q.']] },
    { label: 'n=1', args: [1], expected: [['Q']] },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 9. What does this small bound signal about the intended approach?',
      options: [
        { label: 'Use dynamic programming to build up solutions', isCorrect: false, feedback: 'DP requires overlapping subproblems with optimal substructure. N-queens placements do not decompose that way — you cannot combine partial solutions independently. The tiny n signals exhaustive search.' },
        { label: 'Exhaustive backtracking is intended and feasible', isCorrect: true },
        { label: 'Greedy row-by-row placement always works', isCorrect: false, feedback: 'Greedy placement would commit to the first available column per row and never reconsider. That misses valid solutions that require earlier rows to be placed differently — you need backtracking.' },
        { label: 'O(n!) permutations must be pruned significantly', isCorrect: false, feedback: 'At n = 9, 9! = 362,880 — already manageable without aggressive pruning. Backtracking does prune, but the constraint is primarily saying the search space is small enough to explore in full.' },
      ],
      correctFeedback: 'At n = 9, the search space is at most 9! = 362,880 placements. Backtracking — trying one queen per row, pruning on conflict — explores far fewer. The small n is a green light for this approach.',
      wrongFeedback: [
        'What is 9! — the number of ways to assign one column per row to 9 queens?',
        '9! = 362,880, which a computer handles in milliseconds. The bound n ≤ 9 is telling you that brute-force-with-pruning is intentional.',
      ],
    },
    {
      id: 'output-structure',
      question: 'The output is a list of board configurations, each represented as a list of strings. What does this require you to build?',
      options: [
        { label: 'A count of valid placements', isCorrect: false, feedback: 'N-Queens II asks for the count. This problem asks for the actual boards — each valid placement must be converted into n strings of \'Q\' and \'.\' characters.' },
        { label: 'A string grid for each valid solution', isCorrect: true },
        { label: 'A list of column indices (one per row)', isCorrect: false, feedback: 'A list of column indices is a compact internal representation — useful during backtracking. But the output requires that representation converted to string grids before returning.' },
        { label: 'A set of (row, col) pairs per solution', isCorrect: false, feedback: 'Sets of pairs are useful for tracking queen positions, but the output requires string grids like [".Q..","...Q","Q...","..Q."]. You need to convert your internal state before appending to results.' },
      ],
      correctFeedback: 'Each valid placement must be serialized into n strings of length n. Build your solution as column indices internally, then convert to the string grid when you append to results.',
      wrongFeedback: [
        'Look at the expected output: [[".Q..","...Q","Q...","..Q."], ...]. What format does each solution need to be in?',
        'Each solution is a list of n strings. When you find a valid placement, convert your column-index state into rows of \'.\' and \'Q\' characters.',
      ],
    },
    {
      id: 'one-queen-per-row',
      question: 'Queens attack along rows — placing one queen per row eliminates row conflicts entirely. What does this simplify?',
      options: [
        { label: 'No conflict checking is needed at all', isCorrect: false, feedback: 'Row conflicts are eliminated, but column and diagonal conflicts remain. You still need to check whether the column and both diagonals are free before placing each queen.' },
        { label: 'Only column and diagonal conflicts need tracking', isCorrect: true },
        { label: 'You must still try every cell in each row', isCorrect: false, feedback: 'You try every column in each row (to find valid placements), but once you commit to one queen per row, the row itself is no longer a source of conflict. Only column and diagonal checks remain.' },
        { label: 'Row-by-row placement is a greedy choice', isCorrect: false, feedback: 'Placing one queen per row is a structural decision that reduces the search space — it is not a greedy commitment. You still backtrack when a row has no valid column.' },
      ],
      correctFeedback: 'With one queen per row guaranteed, rows never conflict with each other. Your only conflict checks are: is this column taken? Is either diagonal taken? Three sets handle this in O(1).',
      wrongFeedback: [
        'If each row gets exactly one queen, can two queens ever share a row?',
        'Row conflicts are impossible by construction. That leaves column conflicts (track occupied columns) and diagonal conflicts (track row − col and row + col values).',
      ],
    },
    {
      id: 'backtrack-signal',
      question: 'When you have placed queens in rows 0 through k and no column is valid for row k+1, what must you do?',
      options: [
        { label: 'Skip row k+1 and continue to row k+2', isCorrect: false, feedback: 'Skipping a row would leave a queen unplaced — you need exactly n queens, one per row. If row k+1 has no valid column, the current placement of earlier rows is invalid and must be revised.' },
        { label: 'Remove the queen from row k and try its next column', isCorrect: true },
        { label: 'Return an empty list for this branch', isCorrect: false, feedback: 'Returning an empty list is correct for the leaf case, but the action here is backtracking — undoing the placement in row k and trying the next available column for that row.' },
        { label: 'Mark all columns blocked and restart from row 0', isCorrect: false, feedback: 'Restarting from row 0 would redo all the work you have already done. Backtracking specifically means undoing only the most recent decision — row k — and trying its next option.' },
      ],
      correctFeedback: 'Backtrack: remove the queen from row k, unmark its column and diagonals, and try the next column in row k. If no columns remain in row k, backtrack further to row k−1.',
      wrongFeedback: [
        'You cannot move forward, so what is the last decision you made that you can change?',
        'The last decision was placing a queen in row k. Undo it — remove the queen, free the column and diagonals — then try the next column in that row.',
      ],
    },
  ],
}
