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
  starterCode: `class Solution:
    def num_islands(self, grid):
        pass`,
  runnerSetup: 'num_islands = Solution().num_islands',
  functionName: 'num_islands',
  conceptId: 'grid-bfs-dfs',
  testCases: [
    { label: '1 island', args: [[['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]], expected: 1 },
    { label: '3 islands', args: [[['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]], expected: 3 },
  ],
  bruteHint: 'Picture scanning every cell and, whenever you land on a "1", exploring its entire connected region from scratch without marking any cell as visited — so the same island gets fully re-explored starting from each of its own cells. An island with k cells then costs roughly O(k) work, repeated k times, which is O(k²) for that island alone, and up to O((m · n)²) if the entire grid turns out to be one giant island. What would change about the total work if you remembered which cells you had already visited?',
  optimizeComplexity: { time: 'O(m · n)', space: 'O(m · n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraints define the scale you must handle efficiently, so reading the bounds first tells you what complexity is actually achievable. m, n ≤ 300. How many cells does the largest grid contain, and what does that mean for traversal?',
      highlight: { location: 'constraint', text: '1 <= m, n <= 300' },
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
      question: 'The problem\'s exact wording defines the rules you must implement precisely, so parsing it carefully prevents subtle correctness bugs. "Connected adjacent lands horizontally or vertically." What does this tell you about which neighbors to check?',
      highlight: { location: 'description', text: 'connecting adjacent lands horizontally or vertically' },
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
      question: 'Understanding what the output represents shapes the traversal pattern you need, so before diving into implementation, clarify exactly what you are counting. The output is the number of islands. What traversal pattern produces this count?',
      highlight: { location: 'description', text: 'return the number of islands' },
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
      question: 'The exact format of the input values often hints at implementation tricks available to you, so noticing how data is represented can simplify your bookkeeping. After visiting a land cell during flood-fill, you need to avoid revisiting it. What is the standard approach?',
      highlight: { location: 'constraint', text: 'grid[i][j] is "0" or "1"' },
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
  solutionCode: `class Solution:
    def num_islands(self, grid):
        rows, cols = len(grid), len(grid[0])
        def dfs(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
                return
            grid[r][c] = '0'
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)
        count = 0
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count`,
  solutionComplexity: { time: 'O(m × n)', space: 'O(m × n) worst-case recursion depth' },
  solutionCaveat: 'Marking visited cells by overwriting them to <code>\'0\'</code> avoids allocating a separate visited grid, but it destroys the input — fine for a one-shot answer, not fine if the original grid is needed again afterward.',
  solutionExplanation: 'Every time the outer scan lands on unvisited land, that\'s a brand new island — flood-filling from there with DFS silently visits (and sinks) every cell connected to it so the outer scan never counts any of them a second time. The count only increments at the *start* of each flood-fill, never during it, which is exactly what makes it "number of islands" instead of "number of land cells."',
}
