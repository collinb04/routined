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
  bruteHint: 'Describe a brute-force approach that, for every open cell, runs a traversal to check whether it can reach the border, and its time complexity',
  optimizeHint: 'Name the traversal strategy that starts from the border cells and works inward instead of checking each region individually',
  clues: [
    {
      id: 'border-rule',
      question: 'Regions touching the border are never captured. What does this tell you about which O\'s to flip?',
      options: [
        { label: 'Flip all O\'s except those on the border', isCorrect: false, feedback: 'An O one cell inside the border can still be safe if it\'s connected to a border O. The rule isn\'t about position — it\'s about connectivity to the border.' },
        { label: 'Flip only O\'s with no path to any border O', isCorrect: true },
        { label: 'Flip all O\'s surrounded by X on all 4 sides', isCorrect: false, feedback: 'That only catches isolated single O\'s. A connected group of O\'s is safe as long as any member touches the border — even if interior members are fully surrounded.' },
        { label: 'Flip O\'s that are more than 1 cell from the border', isCorrect: false, feedback: 'Distance from the border is irrelevant. An O deep inside the board is safe if it\'s connected (through other O\'s) to a border O. Connectivity is what matters.' },
      ],
      correctFeedback: 'An O is safe if and only if it is connected (through O\'s) to an O on the border. All other O\'s are fully surrounded and should be flipped to X.',
      wrongFeedback: [
        'Consider an O that is 3 cells from the border but connected via other O\'s to a border cell. Should it be flipped?',
        'The rule is about reachability to the border, not proximity. If you can walk from an O to the border through O\'s, that O is safe.',
      ],
    },
    {
      id: 'reverse-search-strategy',
      question: 'Instead of checking from each O whether it can reach the border, what is the more efficient approach?',
      options: [
        { label: 'BFS/DFS from every O inward', isCorrect: false, feedback: 'Starting BFS from every O and checking whether it reaches the border is O(m²n²) in the worst case — far too slow for a 200×200 board. The reverse: start from the border and mark everything reachable.' },
        { label: 'BFS/DFS from border O\'s outward, then flip the rest', isCorrect: true },
        { label: 'Sort cells by distance from border', isCorrect: false, feedback: 'Sorting doesn\'t capture connectivity — an O three cells from the border could still be reachable from a border O through a chain of adjacent O\'s. You need a graph traversal, not a distance sort.' },
        { label: 'Flood fill from the center outward', isCorrect: false, feedback: 'Starting from the center doesn\'t tell you which O\'s are connected to the border. Start from the border O\'s and flood outward — anything you mark is safe; everything unmarked gets flipped.' },
      ],
      correctFeedback: 'Start BFS/DFS from every O on the four borders. Mark every reachable O as safe. Then make a single pass: flip unmarked O\'s to X, restore marked O\'s to O. Each cell is visited at most once.',
      wrongFeedback: [
        'There are at most 200×200 = 40,000 cells. Starting from every O and searching for the border visits each cell multiple times. What if you flip the search direction?',
        'Seed traversal from all border O\'s simultaneously. Mark every O you can reach. In a final pass, anything unmarked is surrounded — flip it.',
      ],
    },
    {
      id: 'grid-size-complexity',
      question: 'm, n ≤ 200 means the board has up to 40,000 cells. What does this say about acceptable complexity?',
      options: [
        { label: 'O(m²n²) — nested loops over all O pairs', isCorrect: false, feedback: 'At m = n = 200, O(m²n²) is 1.6 billion operations — far too slow. You need an approach that visits each cell a constant number of times.' },
        { label: 'O(mn) — visit each cell a constant number of times', isCorrect: true },
        { label: 'O(mn log mn) — sorting cells is required', isCorrect: false, feedback: 'Sorting isn\'t needed here. A two-pass approach — one traversal from border O\'s plus one scan to flip — processes each of the 40,000 cells at most twice: O(mn) total.' },
        { label: 'Grid size doesn\'t matter for correctness', isCorrect: false, feedback: 'Grid size determines whether an approach is viable. At 40,000 cells, O(mn) finishes in microseconds; O(m²n²) would take seconds or more. The constraint rules out quadratic approaches.' },
      ],
      correctFeedback: 'With 40,000 cells, O(mn) is the right target. Flood-fill from border O\'s visits each cell at most once; a final scan flips unmarked O\'s. Two O(mn) passes total.',
      wrongFeedback: [
        'At m = n = 200, how many cells does the board have? What does that say about algorithms that loop over all pairs of cells?',
        'O(mn) = 40,000 operations. O(m²n²) = 1.6 billion. The constraint says you must visit each cell a constant number of times.',
      ],
    },
  ],
}
