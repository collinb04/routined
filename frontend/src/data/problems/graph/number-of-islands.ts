export default {
  id: 'number-of-islands',
  title: 'Number of Islands',
  difficulty: 'medium',
  description: `<p>Given an <code>m x n</code> 2D binary grid <code>grid</code> which represents a map of <code>'1'</code>s (land) and <code>'0'</code>s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.</p>`,
  examples: [
    { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
    { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' },
  ],
  constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is "0" or "1"'],
  starterCode: `def num_islands(grid):
  pass`,
  functionName: 'num_islands',
  conceptId: 'graphs',
  testCases: [
    { label: '1 island', args: [[['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]], expected: 1 },
    { label: '3 islands', args: [[['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]], expected: 3 },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'm, n ≤ 300. How many cells does the largest grid contain, and what does that mean for traversal?',
      options: [
        { label: 'Visit each cell at most once', isCorrect: true },
        { label: 'O(m² × n²) search per cell is acceptable', isCorrect: false, feedback: 'At m = n = 300, O(m²n²) is 300⁴ = 8.1 billion operations — far too slow. You need to visit each of the 90,000 cells at most once.' },
        { label: 'Only scan cells on the grid boundary', isCorrect: false, feedback: 'Islands can be entirely interior to the grid. Scanning only the boundary would miss all interior land cells.' },
        { label: 'Input size does not matter for grid problems', isCorrect: false, feedback: 'Grid dimensions directly determine how many cells you process. At m = n = 300, you have up to 90,000 cells — manageable with a single pass but not with nested repeated scans.' },
      ],
      correctFeedback: 'At m = n = 300, the grid has up to 90,000 cells. Visiting each cell once and marking land as visited gives O(m × n) total work — the efficient, natural approach.',
      wrongFeedback: [
        'How many total cells does a 300 × 300 grid contain? Can you afford to visit each one exactly once?',
        'Once you flood-fill a land cell as visited, you never touch it again. What is the total work across all cells in the grid?',
      ],
    },
    {
      id: 'connectivity-4-directional',
      question: '"Connected adjacent lands horizontally or vertically." What does this tell you about which neighbors to check?',
      options: [
        { label: 'Check all 8 neighbors including diagonals', isCorrect: false, feedback: 'The problem specifies horizontal and vertical connections only. Including diagonals would merge islands that the problem considers separate.' },
        { label: 'Check only the 4 cardinal neighbors', isCorrect: true },
        { label: 'Only horizontal connections matter', isCorrect: false, feedback: '"Horizontally or vertically" means both axes. Vertical connections — up and down — are equally valid as left and right.' },
        { label: 'Islands connect if they touch at any point', isCorrect: false, feedback: '"Horizontally or vertically" is a precise constraint: shared edges only, not shared corners. Two cells touching diagonally are not part of the same island.' },
      ],
      correctFeedback: 'Your neighbor-check loop should iterate over exactly four offsets: (−1, 0), (1, 0), (0, −1), (0, 1). Diagonal neighbors are excluded.',
      wrongFeedback: [
        'Count the directions: up, down, left, right. "Horizontally or vertically" gives you how many?',
        'A grid cell has 8 potential neighbors. The problem uses 4. Which four are included?',
      ],
    },
    {
      id: 'output-count',
      question: 'The output is the number of islands. What traversal pattern produces this count?',
      options: [
        { label: 'Count every land cell in the grid', isCorrect: false, feedback: 'Counting individual land cells gives the total land area, not the number of distinct islands. Multiple connected land cells form one island, not several.' },
        { label: 'Start a flood-fill from each unvisited land cell; count starts', isCorrect: true },
        { label: 'Count the number of "1" characters in row 0', isCorrect: false, feedback: 'The first row is not representative of the whole grid. Islands span multiple rows and may not touch row 0 at all.' },
        { label: 'Count isolated water cells surrounding land', isCorrect: false, feedback: 'Counting water cells tells you nothing about island count. Islands are defined by connected land regions — track the land, not the surrounding water.' },
      ],
      correctFeedback: 'Scan every cell. Each time you find an unvisited "1", start a flood-fill to mark the entire island as visited, then increment your counter. The total count is the number of distinct islands.',
      wrongFeedback: [
        'When you find an unvisited land cell and flood-fill its entire island, what have you found one of?',
        'Each new flood-fill starting from an unvisited "1" corresponds to one island. How do you track the number of times you start a new flood-fill?',
      ],
    },
    {
      id: 'visited-marking',
      question: 'After visiting a land cell during flood-fill, you need to avoid revisiting it. What is the standard approach?',
      options: [
        { label: 'Use a separate boolean matrix for visited cells', isCorrect: false, feedback: 'A separate matrix works, but it uses O(m × n) extra space. Modifying the grid in-place — overwriting "1" with "0" — achieves the same result with no extra allocation.' },
        { label: 'Overwrite visited land cells with "0" in-place', isCorrect: true },
        { label: 'Track visited cells in a set of coordinates', isCorrect: false, feedback: 'A set works but uses O(m × n) extra space and hash overhead. In-place marking is simpler and more memory-efficient when modifying the input is permitted.' },
        { label: 'Re-scan the grid from the start each time', isCorrect: false, feedback: 'Re-scanning the entire grid after each flood-fill is O(m × n) per island — quadratic overall. Mark cells as visited during traversal to avoid redundant work.' },
      ],
      correctFeedback: 'During flood-fill, change each visited "1" to "0". This prevents revisiting the same cell and costs no extra space, since the grid itself tracks what has been processed.',
      wrongFeedback: [
        'Once you visit a land cell, how do you ensure the same cell is never added to the queue or stack again?',
        'The grid values are either "0" or "1". Can you use the grid itself to mark visited cells without extra space?',
      ],
    },
  ],
}
