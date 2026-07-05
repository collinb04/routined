export default {
  id: 'swim-in-rising-water',
  title: 'Swim in Rising Water',
  difficulty: 'hard',
  description: 'Given an n×n grid where <code>grid[i][j]</code> is the elevation, at time <code>t</code> you can swim in cells with elevation ≤ t. Find the least time to swim from the top-left to bottom-right.',
  examples: [
    { input: 'grid=[[0,2],[1,3]]', output: '3', explanation: 'At t=3, all cells are reachable.' },
  ],
  constraints: ['n == grid.length == grid[0].length', '1 ≤ n ≤ 50', 'grid[i][j] is a permutation of [0, n²−1]'],
  starterCode: `def swim_in_water(grid):
  pass`,
  functionName: 'swim_in_water',
  conceptId: 'advanced-graphs',
  testCases: [
    { label: '2×2', args: [[[0,2],[1,3]]], expected: 3 },
    { label: '1×1', args: [[[0]]], expected: 0 },
  ],
  clues: [
    {
      id: 'objective-minimize-max',
      question: 'You want the least time t to reach the bottom-right. At time t, you can enter any cell with elevation ≤ t. What is the path cost you are minimizing?',
      options: [
        { label: 'Sum of elevations along the path', isCorrect: false, feedback: 'Summing elevations would favor short paths, but that\'s not what the problem measures. The time needed equals the maximum elevation encountered — you must wait for the water to rise to that level.' },
        { label: 'Maximum elevation on the path', isCorrect: true },
        { label: 'Number of steps (cells) on the path', isCorrect: false, feedback: 'Fewer steps doesn\'t guarantee less waiting time. A 2-step path through elevation 10 takes longer than a 5-step path through max elevation 3. It\'s the peak elevation, not the step count, that determines t.' },
        { label: 'Minimum elevation on the path', isCorrect: false, feedback: 'Maximizing minimum elevation is a different problem (widest path). Here, you wait until the water rises to the highest point on your path — you want to minimize that peak.' },
      ],
      correctFeedback: 'The time to traverse a path equals its maximum elevation — you must wait for the water level to reach every cell you want to enter. Minimize the maximum elevation over all paths.',
      wrongFeedback: [
        'You can enter a cell only when t ≥ its elevation. If your path passes through a cell with elevation 7, what is the earliest time you can be there?',
        'The bottleneck on any path is the highest-elevation cell. You must wait until t equals that peak. So you want the path whose highest cell has the lowest elevation.',
      ],
    },
    {
      id: 'algorithm-choice',
      question: 'You need the path from (0,0) to (n−1,n−1) that minimizes the maximum edge/cell weight. What algorithm finds this?',
      options: [
        { label: 'BFS — it finds shortest paths in unweighted graphs', isCorrect: false, feedback: 'BFS treats all edges equally, but here cells have different elevations. BFS would find the path with the fewest steps, not the path with the lowest peak elevation.' },
        { label: 'Dijkstra with cost = max elevation seen so far', isCorrect: true },
        { label: 'DFS trying all paths', isCorrect: false, feedback: 'DFS with n up to 50 means up to 2,500 cells — exploring all paths is exponential. A priority-queue approach visits each cell at most once in O(n² log n).' },
        { label: 'Binary search on t, then BFS for reachability', isCorrect: false, feedback: 'Binary search on t is a valid alternative — try each candidate t and BFS whether (n−1,n−1) is reachable. It\'s O(n² log n²) = O(n² log n). Dijkstra is equally efficient and more direct.' },
      ],
      correctFeedback: 'Use a min-heap (Dijkstra-style) where the priority is the maximum elevation encountered on the path so far. When you pop (n−1,n−1), its priority is the answer.',
      wrongFeedback: [
        'The "cost" of reaching a cell is max(current_cost, cell_elevation). You want to minimize this cost to reach (n−1,n−1). Which algorithm processes nodes in order of their current best cost?',
        'Dijkstra with a min-heap: push (max_elevation_so_far, row, col). When popping, relax neighbors with cost = max(current_cost, neighbor_elevation). This is the minimax path problem.',
      ],
    },
    {
      id: 'permutation-guarantee',
      question: 'grid[i][j] is a permutation of [0, n²−1] — all elevations are distinct integers from 0 to n²−1. What does this guarantee?',
      options: [
        { label: 'The answer is always n²−1', isCorrect: false, feedback: 'The permutation guarantee means elevations are unique integers, not that you must traverse all of them. The answer is the peak elevation of the optimal path, which can be much less than n²−1.' },
        { label: 'No ties in elevation — simpler priority queue logic', isCorrect: true },
        { label: 'The shortest path by steps is always optimal', isCorrect: false, feedback: 'Distinct elevations don\'t imply step count and max-elevation align. A long path through low elevations can beat a short path through a high one.' },
        { label: 'You can reach any cell by time n²−1 at the latest', isCorrect: false, feedback: 'While technically true (the maximum elevation in the grid is n²−1), this is not the useful insight. The permutation guarantee primarily simplifies tie-breaking in the priority queue.' },
      ],
      correctFeedback: 'All n² elevations are distinct. This means no two cells have the same elevation, so priority queue comparisons never tie — you always know which unvisited cell has the lowest "max so far" cost.',
      wrongFeedback: [
        'A permutation of [0, n²−1] means each integer appears exactly once. What does uniqueness of elevations do to the priority queue when two cells have equal priority?',
        'With distinct elevations, no two cells tie in the min-heap — there\'s a clear ordering. This simplifies correctness arguments and means each cell is popped at most once.',
      ],
    },
  ],
}
