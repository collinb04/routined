export default {
  id: 'surrounded-regions',
  title: 'Surrounded Regions',
  difficulty: 'medium',
  description: `<p>Given an <code>m x n</code> matrix <code>board</code> containing <code>'X'</code> and <code>'O'</code>, capture all regions that are 4-directionally surrounded by <code>'X'</code>. A region is captured by flipping all <code>'O'</code>s into <code>'X'</code>s in that surrounded region. Regions on the border are never captured. Return the modified board.</p>`,
  examples: [
    { input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]', output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]' },
  ],
  constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 200', 'board[i][j] is "X" or "O"'],
  starterCode: `def solve(board):
  pass`,
  functionName: 'solve_run',
  conceptId: 'graphs',
  runnerSetup: `def solve_run(board):
  import copy
  b = copy.deepcopy(board)
  solve(b)
  return b`,
  testCases: [
    { label: 'classic', args: [[['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]], expected: [['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']] },
  ],
}
