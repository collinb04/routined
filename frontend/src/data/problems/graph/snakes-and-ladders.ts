export default {
  id: 'snakes-and-ladders',
  title: 'Snakes and Ladders',
  difficulty: 'medium',
  description: 'Given an n×n board with snakes and ladders, find the minimum number of dice rolls to reach the last cell starting at cell 1. Board cells are labeled 1 to n² in a boustrophedon fashion. -1 means no snake/ladder.',
  examples: [
    { input: 'board=[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]', output: '4' },
  ],
  constraints: ['n == board.length == board[0].length', '2 ≤ n ≤ 20', 'board[i][j] is -1 or in range [1, n²]'],
  starterCode: `def snakes_and_ladders(board):
  pass`,
  functionName: 'snakes_and_ladders',
  conceptId: 'graphs',
  testCases: [
    { label: 'Classic board', args: [[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]], expected: 4 },
  ],
}
