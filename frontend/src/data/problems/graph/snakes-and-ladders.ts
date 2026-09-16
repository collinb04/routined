export default {
  id: 'snakes-and-ladders',
  title: 'Snakes and Ladders',
  difficulty: 'medium',
  description: 'Given an n×n board with snakes and ladders, find the minimum number of dice rolls to reach the last cell starting at cell 1. Board cells are labeled 1 to n² in a boustrophedon fashion. -1 means no snake/ladder.',
  examples: [
    { input: 'board=[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]', output: '4' },
  ],
  constraints: ['n == board.length == board[0].length', '2 ≤ n ≤ 20', 'board[i][j] is -1 or in range [1, n²]'],
  starterCode: `class Solution:
    def snakes_and_ladders(self, board):
        pass`,
  runnerSetup: 'snakes_and_ladders = Solution().snakes_and_ladders',
  functionName: 'snakes_and_ladders',
  conceptId: 'graphs',
  testCases: [
    { label: 'Classic board', args: [[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]], expected: 4 },
  ],
  bruteHint: 'A brute-force approach could use DFS to try every possible sequence of dice rolls from cell 1, recursively branching into up to 6 choices at each step until reaching cell n². Since each roll multiplies the number of sequences by up to 6, this explores an exponential number of paths — roughly O(6^k) for a path of depth k — with no guarantee the first completed sequence found used the fewest rolls. How could you explore all reachable cells level by level instead, so the first time you reach n² is guaranteed to use the minimum number of rolls?',
  optimizeComplexity: { time: 'O(n²)', space: 'O(n²)' },
  clues: [
    {
      id: 'output-minimum-rolls',
      question: 'Words like "minimum" or "fewest" in a problem statement often point directly to which graph traversal to reach for. The problem asks for the minimum number of dice rolls to reach cell n². What does "minimum rolls" signal?',
      highlight: { location: 'description', text: 'minimum number of dice rolls' },
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
      question: 'Some inputs are encoded in a nonstandard layout that must be decoded before any graph logic can run. Cells are numbered in a boustrophedon pattern: left-to-right on even rows from the bottom, right-to-left on odd rows. What does this require?',
      highlight: { location: 'description', text: 'in a boustrophedon fashion' },
      options: [
        { label: 'A conversion function from cell number to (row, col)', isCorrect: true },
        { label: 'Process cells in reverse order', isCorrect: false, feedback: 'Reversing cell order doesn\'t decode the layout. You need a formula that takes a cell number 1 to n² and returns the correct (row, col) index to read board[row][col].' },
        { label: 'Flip the board horizontally before traversal', isCorrect: false, feedback: 'Flipping the board doesn\'t fix the alternating row direction — odd rows would still be reversed relative to even rows. Write a cell-number-to-coordinate conversion instead.' },
        { label: 'The layout doesn\'t affect traversal logic', isCorrect: false, feedback: 'The layout directly affects how you read the board. Without a correct cell-to-coordinate conversion, you\'ll look up the wrong cell for snakes and ladders and produce wrong answers.' },
      ],
      correctFeedback: 'Cell number s maps to a row and column based on its distance from the bottom: row = n − 1 − (s−1)//n. The column depends on whether that row is counted left-to-right or right-to-left. Get this conversion right before writing BFS.',
      wrongFeedback: [
        'Cell 1 is at the bottom-left, cell n is at the bottom-right, cell n+1 is above cell n, cell 2n is above cell 1. Write out the formula: given cell number s, what is (row, col)?',
        'Start from the bottom: row = n−1−(s−1)//n. Column direction alternates: if the row from the bottom is even, count left-to-right; if odd, count right-to-left.',
      ],
    },
    {
      id: 'snake-ladder-teleportation',
      question: 'Special transitions baked into the input, like a free teleport, change how you enqueue neighbors without changing the search itself. When you land on a cell with a snake or ladder (board[r][c] != -1), you are immediately moved to that destination. How does this interact with BFS?',
      highlight: { location: 'constraint', text: 'board[i][j] is -1 or in range [1, n²]' },
      options: [
        { label: 'Enqueue the destination, not the landed cell', isCorrect: true },
        { label: 'Treat the teleport as an extra roll', isCorrect: false, feedback: 'Snakes and ladders do not cost a roll — you land on the cell and are instantly moved. The roll count is the same whether or not you hit a snake or ladder. Enqueue the destination at the current roll depth.' },
        { label: 'Run a second traversal from the teleport destination', isCorrect: false, feedback: 'A second BFS would reset the roll count. The teleport is free — just enqueue the destination cell at the same BFS depth as the landed cell.' },
        { label: 'Mark both the landed cell and the destination as visited', isCorrect: false, feedback: 'You only need to mark the destination as visited. The landed cell is the intermediate step; after teleporting, you never want to return to it as its own node.' },
      ],
      correctFeedback: 'When landing on cell s and board[r][c] != -1, enqueue board[r][c] as the next position — not s. The teleport costs no extra rolls, so the destination inherits the current roll count.',
      wrongFeedback: [
        'You roll and land on cell s. If board[r][c] is not -1, you don\'t stay on s — you move to board[r][c] at no cost. Which cell do you add to the BFS queue?',
        'The teleport is instantaneous — same roll depth. Enqueue the final destination after teleporting, mark it visited, and never re-enqueue the intermediate landing cell.',
      ],
    },
  ],
  solutionCode: `from collections import deque

class Solution:
    def snakes_and_ladders(self, board):
        n = len(board)

        def get_pos(s):
            r = (s - 1) // n
            c = (s - 1) % n
            if r % 2 == 1:
                c = n - 1 - c
            r = n - 1 - r
            return r, c

        visited = {1}
        queue = deque([(1, 0)])
        while queue:
            s, moves = queue.popleft()
            if s == n * n:
                return moves
            for nxt in range(s + 1, min(s + 6, n * n) + 1):
                r, c = get_pos(nxt)
                dest = board[r][c] if board[r][c] != -1 else nxt
                if dest not in visited:
                    if dest == n * n:
                        return moves + 1
                    visited.add(dest)
                    queue.append((dest, moves + 1))
        return -1`,
  solutionComplexity: { time: 'O(n²)', space: 'O(n²)' },
  solutionCaveat: 'The queue stores <code>dest</code> — the cell reached <code>after</code> resolving any ladder or snake — never the raw landing square, so a teleport costs the same single roll as landing anywhere else; it is not treated as an extra move.',
  solutionExplanation: 'The boustrophedon numbering means the board is really just a linear sequence of squares 1 through n², so this is plain unweighted shortest-path BFS over that sequence, with each state having up to 6 forward neighbors (the dice roll) and <code>get_pos</code> translating a square number back into the zig-zag (row, col) needed to check for a snake or ladder there. Following a snake or ladder immediately upon landing — rather than treating the intermediate square as its own visitable state — correctly models the fact that only the post-teleport square is ever actually stood on.',
}
