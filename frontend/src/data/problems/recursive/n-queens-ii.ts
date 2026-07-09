export default {
  id: 'n-queens-ii',
  title: 'N-Queens II',
  difficulty: 'hard',
  description: 'Return the number of distinct solutions to the n-queens puzzle where <code>n</code> queens must be placed on an n×n chessboard such that no two queens attack each other.',
  examples: [
    { input: 'n = 4', output: '2', explanation: 'Two distinct solutions exist for 4 queens.' },
    { input: 'n = 1', output: '1' },
  ],
  constraints: ['1 ≤ n ≤ 9'],
  starterCode: `def total_n_queens(n):
  pass`,
  functionName: 'total_n_queens',
  conceptId: 'backtracking',
  testCases: [
    { label: 'n=4', args: [4], expected: 2 },
    { label: 'n=1', args: [1], expected: 1 },
    { label: 'n=8', args: [8], expected: 92 },
    { label: 'n=3', args: [3], expected: 0 },
  ],
  bruteHint: 'Describe generating every possible placement of n queens and filtering for validity only after each placement is complete',
  optimizeHint: 'Name the technique of rejecting an invalid partial placement as soon as a conflict appears, instead of completing it first',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 9. What does this tiny bound tell you about the expected approach?',
      options: [
        { label: 'O(n²) dynamic programming is needed', isCorrect: false, feedback: 'DP would help if subproblems overlapped cleanly, but n-queens placements do not decompose that way. The tiny bound of n ≤ 9 is a signal that exhaustive backtracking is intentional and feasible.' },
        { label: 'Exhaustive backtracking is feasible', isCorrect: true },
        { label: 'A mathematical formula gives the answer directly', isCorrect: false, feedback: 'No closed-form formula exists for the n-queens count. The values (1, 0, 0, 2, 10, 4, 40, 92, ...) must be computed by search. The small n just means the search terminates fast.' },
        { label: 'Brute force over all n! permutations is too slow', isCorrect: false, feedback: 'At n = 9, 9! = 362,880 — that is manageable. But backtracking is even faster because it prunes invalid branches early, making the actual search space much smaller than 9!.' },
      ],
      correctFeedback: 'At n = 9, the entire search space — even without pruning — is bounded by 9! = 362,880. Backtracking prunes invalid branches early, making this very fast in practice.',
      wrongFeedback: [
        'What is 9! (the number of ways to place 9 queens one per row)? Is that manageable?',
        '9! = 362,880 — trivially fast. The small n is a green light for backtracking with column/diagonal conflict checks.',
      ],
    },
    {
      id: 'output-is-count',
      question: 'The output is a count of solutions, not the solutions themselves (unlike N-Queens I). What does this change?',
      options: [
        { label: 'You must still build and store each board', isCorrect: false, feedback: 'Since you only need the count, you never need to construct or store the board configurations. Incrementing a counter at each valid leaf node is sufficient.' },
        { label: 'No board representation needed — just count valid leaves', isCorrect: true },
        { label: 'You can use bit manipulation to speed up counting', isCorrect: false, feedback: 'Bit manipulation can optimize column and diagonal tracking, but the "count only" output is what eliminates board construction entirely. The output type is the key signal here, not the optimization technique.' },
        { label: 'Fewer queens can be placed since boards are not checked', isCorrect: false, feedback: 'The placement rules (no two queens attack each other) are the same in both variants. Only the output format differs — you count valid placements instead of collecting board strings.' },
      ],
      correctFeedback: 'Because you only need the count, you skip building the board string at each valid solution. Your backtracking tree is identical to N-Queens I, but each leaf just increments a counter.',
      wrongFeedback: [
        'Compare N-Queens I (output: list of board strings) to N-Queens II (output: integer count). What work from N-Queens I can you skip here?',
        'You do not need to construct any board representation. When you reach a valid state with n queens placed, just add 1 to your count.',
      ],
    },
    {
      id: 'conflict-tracking',
      question: 'Queens attack along rows, columns, and both diagonals. How do you track which positions are under attack efficiently?',
      options: [
        { label: 'Scan the board on each placement attempt', isCorrect: false, feedback: 'Scanning the board for conflicts at each step costs O(n) per column per row, making the total O(n³) per path. Maintaining sets of attacked columns and diagonals gives O(1) conflict checks instead.' },
        { label: 'Sets for columns, left-diagonals, right-diagonals', isCorrect: true },
        { label: 'A 2D boolean grid of attacked squares', isCorrect: false, feedback: 'A 2D grid works but requires updating O(n) squares per queen placement. Sets are more efficient: a column number, a (row − col) value, and a (row + col) value each fit in O(1) per queen.' },
        { label: 'Only track columns — diagonals are secondary', isCorrect: false, feedback: 'Diagonal conflicts are the most common pruning opportunity in n-queens. Ignoring diagonals means your backtracking accepts many invalid placements that should have been pruned.' },
      ],
      correctFeedback: 'Three sets cover all conflicts: one for occupied columns, one for (row − col) left diagonals, one for (row + col) right diagonals. Each lookup and update is O(1).',
      wrongFeedback: [
        'At row r, column c, which column and diagonal identifiers would you store to mark that square as attacked?',
        'Column c, left-diagonal (r − c), and right-diagonal (r + c) each uniquely identify an attack line. Check membership in three sets before placing a queen.',
      ],
    },
    {
      id: 'n-equals-3-guarantee',
      question: 'The test case n=3 expects 0. What does this tell you about handling degenerate boards?',
      options: [
        { label: 'Return 1 as a minimum since n ≥ 1', isCorrect: false, feedback: 'n ≥ 1 does not guarantee a solution exists. At n = 3, no valid placement is possible — three queens on a 3×3 board always result in a conflict.' },
        { label: 'Your backtracking must correctly return 0 when no placement works', isCorrect: true },
        { label: 'Skip n = 3 using a lookup table', isCorrect: false, feedback: 'A lookup table could technically work for n ≤ 9, but it would not demonstrate correct backtracking. The zero case is a natural output of the algorithm when all branches are pruned.' },
        { label: 'The constraint guarantees at least one solution always', isCorrect: false, feedback: 'The constraint only bounds n between 1 and 9. It makes no guarantee about solutions existing. n = 2 and n = 3 both yield zero valid placements.' },
      ],
      correctFeedback: 'When every branch of your backtracking tree is pruned, the count stays 0. The n = 3 case verifies that your pruning is correct and that you do not return a false positive.',
      wrongFeedback: [
        'If your backtracking never reaches a valid full placement for n = 3, what does your counter return?',
        'A counter that only increments on valid solutions naturally returns 0 when backtracking prunes every branch. No special case needed.',
      ],
    },
  ],
}
