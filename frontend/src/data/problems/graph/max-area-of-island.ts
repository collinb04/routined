export default {
  id: 'max-area-of-island',
  title: 'Max Area of Island',
  difficulty: 'medium',
  description: `<p>You are given an <code>m x n</code> binary matrix <code>grid</code>. An island is a group of <code>1</code>s connected 4-directionally. The area of an island is the number of cells with value <code>1</code>. Return the maximum area of an island in grid, or 0 if there is no island.</p>`,
  examples: [
    { input: 'grid = [[0,0,1,0,0],[0,0,0,0,0],[0,1,1,0,1],[0,1,0,0,1],[0,1,0,0,1]]', output: '4' },
  ],
  constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 50', 'grid[i][j] is 0 or 1'],
  starterCode: `def max_area_of_island(grid):
  pass`,
  functionName: 'max_area_of_island',
  conceptId: 'graphs',
  testCases: [
    { label: 'max=4', args: [[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]], expected: 6 },
    { label: 'no island', args: [[[0,0,0,0,0,0,0,0]]], expected: 0 },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'm, n ≤ 50. What does this say about how much of the grid you can afford to visit?',
      options: [
        { label: 'Visit each cell at most once with marking', isCorrect: true },
        { label: 'O(m²n²) nested search per cell is fine', isCorrect: false, feedback: 'At m = n = 50, O(m²n²) would be 50⁴ = 6.25 million operations per query — technically affordable but completely unnecessary. You only need to visit each cell once.' },
        { label: 'Only scan the grid boundary', isCorrect: false, feedback: 'Islands can be anywhere in the grid, not just on the boundary. A boundary-only scan would miss interior islands entirely.' },
        { label: 'Input size is irrelevant for grids', isCorrect: false, feedback: 'Grid dimensions directly determine how many cells you process. m, n ≤ 50 means at most 2500 cells — affordable to visit every one exactly once.' },
      ],
      correctFeedback: 'At most 50 × 50 = 2500 cells. Visiting each cell once and marking it as seen gives you O(m × n) total work — the natural and efficient approach for grid traversal.',
      wrongFeedback: [
        'How many total cells does a 50 × 50 grid contain? Can you afford to visit each one once?',
        'Once you visit a land cell and add it to an island, you mark it so you never revisit it. What is the total work across all cells?',
      ],
    },
    {
      id: 'connectivity-definition',
      question: '"Connected 4-directionally" — islands connect only up, down, left, right. What does this rule out?',
      options: [
        { label: 'Diagonal neighbors count as connected', isCorrect: false, feedback: '4-directional connectivity explicitly excludes diagonals. Two land cells sharing only a corner are not part of the same island.' },
        { label: 'Diagonal connections are excluded', isCorrect: true },
        { label: 'Islands must be rectangular', isCorrect: false, feedback: 'Islands can be any shape — L-shaped, single-cell, winding — as long as each cell connects to the next horizontally or vertically. Shape is unconstrained.' },
        { label: 'Only horizontal connections matter', isCorrect: false, feedback: '4-directional means all four cardinal directions: up, down, left, and right. Vertical connections are just as valid as horizontal ones.' },
      ],
      correctFeedback: 'Your neighbor-checking logic must only consider the four cardinal directions. Adding diagonal neighbors would merge islands that the problem treats as separate.',
      wrongFeedback: [
        'Count the directions: up, down, left, right. What does "4-directional" leave out?',
        'A grid cell has up to 8 neighbors. The problem uses 4. Which four are included, and which four are not?',
      ],
    },
    {
      id: 'output-type',
      question: 'The output is the maximum area, or 0 if no island exists. What does this require you to track?',
      options: [
        { label: 'A running maximum across all island sizes', isCorrect: true },
        { label: 'The coordinates of every island', isCorrect: false, feedback: 'The output is a single integer — the largest area. You do not need to store coordinates of islands, only compare their sizes as you discover each one.' },
        { label: 'The total area of all islands combined', isCorrect: false, feedback: 'The output is the maximum, not the sum. Adding all island areas together would give the wrong answer when multiple islands exist.' },
        { label: 'Count of islands only', isCorrect: false, feedback: 'Counting islands tells you how many exist but not how large each one is. The output requires knowing the area of each island so you can return the largest.' },
      ],
      correctFeedback: 'After each flood-fill, you have the area of one island. Keep a running maximum and update it after each island is fully measured. Return that maximum when the grid scan is complete.',
      wrongFeedback: [
        'You will discover multiple islands one at a time. What do you need to remember across all of them to return the largest?',
        'After measuring each island, compare its area to what? What value do you return at the end?',
      ],
    },
    {
      id: 'no-island-guarantee',
      question: '"Return 0 if there is no island." What edge case must your solution handle?',
      options: [
        { label: 'Initialize the answer to 0, not 1', isCorrect: true },
        { label: 'The grid will always have at least one island', isCorrect: false, feedback: 'The problem explicitly states "return 0 if there is no island" — an all-zero grid is a valid input. Your solution must handle it without error.' },
        { label: 'Return -1 when no island is found', isCorrect: false, feedback: 'The problem specifies 0 as the return value when no island exists, not -1. Using -1 would be incorrect.' },
        { label: 'Scan diagonals to find hidden islands', isCorrect: false, feedback: 'Diagonal connectivity is excluded by the 4-directional definition. An all-zero grid has no islands regardless of how you scan it.' },
      ],
      correctFeedback: 'Initializing the answer to 0 handles the no-island case automatically. If no land cell is found during the scan, the running maximum stays 0 and you return it correctly.',
      wrongFeedback: [
        'If the entire grid is 0s, what does your flood-fill loop never execute? What value do you return in that case?',
        'What is the natural value for "largest island seen" before you have seen any islands?',
      ],
    },
  ],
}
