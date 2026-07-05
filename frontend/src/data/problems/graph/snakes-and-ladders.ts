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
  clues: [
    {
      id: 'output-minimum-rolls',
      question: 'The problem asks for the minimum number of dice rolls to reach cell n². What does "minimum rolls" signal?',
      options: [
        { label: 'BFS over cell numbers', isCorrect: true },
        { label: 'DFS to explore all paths', isCorrect: false, feedback: 'DFS finds a path, but not the shortest one. Minimum rolls requires visiting cells in order of how many rolls it took to reach them — that\'s BFS.' },
        { label: 'Greedy — always land on a ladder if available', isCorrect: false, feedback: 'Greedily taking every ladder isn\'t guaranteed to minimize rolls — a ladder might skip past a better ladder, or a snake might be unavoidable after a greedy jump. BFS considers all options.' },
        { label: 'Dynamic programming over cells', isCorrect: false, feedback: 'DP could work, but the state transitions here are straightforward enough that BFS is simpler and more natural. BFS also naturally handles the "minimum rolls" requirement by exploring level by level.' },
      ],
      correctFeedback: 'Model each cell 1 to n² as a node. From any cell, you can move to the next 1–6 cells (or wherever a snake/ladder takes you). BFS over this graph gives the minimum rolls to reach n².',
      wrongFeedback: [
        'Each roll takes you from one cell number to another — that\'s a graph of n² nodes. Which traversal finds the shortest path in an unweighted graph?',
        'BFS visits all cells reachable in 1 roll, then 2 rolls, and so on. The first time it reaches n², that roll count is the minimum.',
      ],
    },
    {
      id: 'boustrophedon-layout',
      question: 'Cells are numbered in a boustrophedon pattern: left-to-right on even rows from the bottom, right-to-left on odd rows. What does this require?',
      options: [
        { label: 'A conversion function from cell number to (row, col)', isCorrect: true },
        { label: 'Process cells in reverse order', isCorrect: false, feedback: 'Reversing cell order doesn\'t decode the layout. You need a formula that takes a cell number 1 to n² and returns the correct (row, col) index to read board[row][col].' },
        { label: 'Flip the board horizontally before BFS', isCorrect: false, feedback: 'Flipping the board doesn\'t fix the alternating row direction — odd rows would still be reversed relative to even rows. Write a cell-number-to-coordinate conversion instead.' },
        { label: 'The layout doesn\'t affect BFS logic', isCorrect: false, feedback: 'The layout directly affects how you read the board. Without a correct cell-to-coordinate conversion, you\'ll look up the wrong cell for snakes and ladders and produce wrong answers.' },
      ],
      correctFeedback: 'Cell number s maps to a row and column based on its distance from the bottom: row = n − 1 − (s−1)//n. The column depends on whether that row is counted left-to-right or right-to-left. Get this conversion right before writing BFS.',
      wrongFeedback: [
        'Cell 1 is at the bottom-left, cell n is at the bottom-right, cell n+1 is above cell n, cell 2n is above cell 1. Write out the formula: given cell number s, what is (row, col)?',
        'Start from the bottom: row = n−1−(s−1)//n. Column direction alternates: if the row from the bottom is even, count left-to-right; if odd, count right-to-left.',
      ],
    },
    {
      id: 'snake-ladder-teleportation',
      question: 'When you land on a cell with a snake or ladder (board[r][c] != -1), you are immediately moved to that destination. How does this interact with BFS?',
      options: [
        { label: 'Enqueue the destination, not the landed cell', isCorrect: true },
        { label: 'Treat the teleport as an extra roll', isCorrect: false, feedback: 'Snakes and ladders do not cost a roll — you land on the cell and are instantly moved. The roll count is the same whether or not you hit a snake or ladder. Enqueue the destination at the current roll depth.' },
        { label: 'Run a second BFS from the teleport destination', isCorrect: false, feedback: 'A second BFS would reset the roll count. The teleport is free — just enqueue the destination cell at the same BFS depth as the landed cell.' },
        { label: 'Mark both the landed cell and the destination as visited', isCorrect: false, feedback: 'You only need to mark the destination as visited. The landed cell is the intermediate step; after teleporting, you never want to return to it as its own node.' },
      ],
      correctFeedback: 'When landing on cell s and board[r][c] != -1, enqueue board[r][c] as the next position — not s. The teleport costs no extra rolls, so the destination inherits the current roll count.',
      wrongFeedback: [
        'You roll and land on cell s. If board[r][c] is not -1, you don\'t stay on s — you move to board[r][c] at no cost. Which cell do you add to the BFS queue?',
        'The teleport is instantaneous — same roll depth. Enqueue the final destination after teleporting, mark it visited, and never re-enqueue the intermediate landing cell.',
      ],
    },
  ],
}
