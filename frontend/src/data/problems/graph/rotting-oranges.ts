export default {
  id: 'rotting-oranges',
  title: 'Rotting Oranges',
  difficulty: 'medium',
  description: `<p>You are given an <code>m x n</code> grid where each cell can be: <code>0</code> (empty), <code>1</code> (fresh orange), or <code>2</code> (rotten orange). Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If it is impossible, return <code>-1</code>.</p>`,
  examples: [
    { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4' },
    { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1' },
  ],
  constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 10', 'grid[i][j] is 0, 1, or 2'],
  starterCode: `def oranges_rotting(grid):
  pass`,
  functionName: 'oranges_rotting',
  conceptId: 'graphs',
  testCases: [
    { label: '4 minutes', args: [[[2,1,1],[1,1,0],[0,1,1]]], expected: 4 },
    { label: 'impossible', args: [[[2,1,1],[0,1,1],[1,0,1]]], expected: -1 },
    { label: 'all rotten', args: [[[0,2]]], expected: 0 },
  ],
  bruteHint: 'Describe a brute-force simulation that rescans the entire grid minute by minute looking for newly adjacent fresh oranges, and its time complexity',
  optimizeHint: 'Name the traversal technique that starts from all rotten oranges at once instead of spreading from just one',
  clues: [
    {
      id: 'output-minimum-time',
      question: 'The problem asks for the minimum number of minutes until all oranges are rotten. What does "minimum time" signal?',
      options: [
        { label: 'DFS from each rotten orange', isCorrect: false, feedback: 'DFS explores one path at a time and doesn\'t model simultaneous spread. Rotting spreads from all rotten oranges in parallel each minute — BFS naturally captures this level-by-level expansion.' },
        { label: 'BFS with all initial rotten oranges as sources', isCorrect: true },
        { label: 'Simulate one minute at a time with DFS', isCorrect: false, feedback: 'Simulating minute by minute is the right intuition, but DFS explores one branch at a time. BFS expands all frontiers simultaneously, which matches the parallel spreading of rot.' },
        { label: 'Sort oranges by distance to nearest rotten', isCorrect: false, feedback: 'You can\'t compute "distance to nearest rotten" without first doing a traversal — that\'s circular. BFS from all rotten sources simultaneously gives you exact spread times for free.' },
      ],
      correctFeedback: 'Multi-source BFS starts from all rotten oranges simultaneously. Each BFS level represents one minute of spreading. The depth at which the last fresh orange is reached is the answer.',
      wrongFeedback: [
        'Rotting spreads from every rotten orange at the same time each minute. Which traversal naturally models simultaneous expansion from multiple starting points?',
        'Multi-source BFS: enqueue all starting rotten oranges, then expand level by level. Each level is one minute. What is the answer once BFS is complete?',
      ],
    },
    {
      id: 'impossibility-detection',
      question: 'The function returns -1 if it\'s impossible for all oranges to rot. What condition triggers this?',
      options: [
        { label: 'Any rotten orange is isolated', isCorrect: false, feedback: 'An isolated rotten orange just means it won\'t spread to neighbors — that\'s fine if there are no fresh oranges nearby. The impossible case is when fresh oranges exist that can\'t be reached at all.' },
        { label: 'Fresh oranges remain after BFS completes', isCorrect: true },
        { label: 'The grid has more fresh than rotten oranges', isCorrect: false, feedback: 'The ratio of fresh to rotten doesn\'t determine impossibility. A single rotten orange can spread to a thousand fresh ones if they\'re connected. Impossibility is about reachability, not count.' },
        { label: 'BFS takes more than m×n minutes', isCorrect: false, feedback: 'BFS time is bounded by the grid size, not a minute threshold. The impossible condition is structural: after BFS, count whether any fresh oranges remain unreached — not how long BFS ran.' },
      ],
      correctFeedback: 'After multi-source BFS completes, scan the grid for any remaining 1s. If any fresh orange was never reached, it is cut off by empty cells or walls — return -1.',
      wrongFeedback: [
        'BFS will spread rot as far as it can reach. What does it mean if there are still fresh oranges after BFS is done?',
        'Count fresh oranges before and after BFS. If the count is still non-zero after BFS, those oranges were unreachable — return -1.',
      ],
    },
    {
      id: 'multi-source-start',
      question: 'There may be multiple initially rotten oranges. How should you initialize BFS?',
      options: [
        { label: 'Pick one rotten orange and start BFS from it', isCorrect: false, feedback: 'Starting from a single rotten orange misses simultaneous spreading from others. If orange A and B are both rotten at minute 0, fresh neighbors of both start rotting at minute 1 — not just neighbors of A.' },
        { label: 'Enqueue all rotten oranges at depth 0', isCorrect: true },
        { label: 'Run separate BFS from each rotten orange', isCorrect: false, feedback: 'Separate BFS runs per rotten orange would give you the minimum distance to each source independently — but you\'d need to combine them, and running k BFS passes is k times slower than one multi-source BFS.' },
        { label: 'Sort rotten oranges by position first', isCorrect: false, feedback: 'The position order of initial rotten oranges doesn\'t affect the result — what matters is that they all spread simultaneously. Enqueue all of them at the start; BFS handles the rest.' },
      ],
      correctFeedback: 'Seed the BFS queue with every initially rotten orange at time 0. BFS then spreads outward from all of them in parallel, correctly modeling the simultaneous minute-by-minute rotting.',
      wrongFeedback: [
        'Rotting starts at minute 0 from all existing rotten oranges at once. How do you represent "starting from multiple nodes simultaneously" in BFS?',
        'Multi-source BFS: scan the entire grid first, enqueue every cell with value 2, then run BFS normally. All those starting cells are at distance 0.',
      ],
    },
    {
      id: 'grid-size-constraint',
      question: 'm, n ≤ 10, so the grid has at most 100 cells. What does this say about algorithm choice?',
      options: [
        { label: 'Any O(m²n²) simulation is fine', isCorrect: false, feedback: 'While 100⁴ = 100 million is manageable at this tiny scale, it doesn\'t mean a quadratic approach is the right model. BFS naturally runs in O(mn) and correctly captures simultaneous spreading.' },
        { label: 'O(mn) BFS is more than sufficient', isCorrect: true },
        { label: 'The small size allows backtracking over all states', isCorrect: false, feedback: 'Backtracking isn\'t the right model here — the spread is deterministic. You don\'t explore choices; you simulate a fixed process. BFS captures it directly in O(mn).' },
        { label: 'Memoization is needed to avoid recomputation', isCorrect: false, feedback: 'Memoization applies when subproblems repeat. BFS with a visited-mark processes each cell exactly once — no repeated subproblems and no need for memoization.' },
      ],
      correctFeedback: 'With at most 100 cells, BFS at O(mn) runs in at most 100 steps. The small constraint means even a less efficient approach would work, but BFS is both optimal and correct.',
      wrongFeedback: [
        'With a 10×10 grid, you have at most 100 cells. What is the cost of visiting each cell exactly once?',
        'BFS visits each cell at most once — O(mn) = O(100) here. The constraint is small enough that almost any reasonable approach works, but BFS is the natural fit.',
      ],
    },
  ],
}
