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
}
