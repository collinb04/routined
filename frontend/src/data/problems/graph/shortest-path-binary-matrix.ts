export default {
  id: 'shortest-path-binary-matrix',
  title: 'Shortest Path in Binary Matrix',
  difficulty: 'medium',
  description: 'Given an n×n binary matrix <code>grid</code>, return the length of the shortest clear path (cells with value 0) from top-left to bottom-right (8-directional). Return -1 if no path.',
  examples: [
    { input: 'grid = [[0,1],[1,0]]', output: '2' },
    { input: 'grid = [[0,0,0],[1,1,0],[1,1,0]]', output: '4' },
  ],
  constraints: ['n == grid.length == grid[0].length', '1 ≤ n ≤ 100', 'grid[i][j] is 0 or 1'],
  starterCode: `class Solution:
    def shortest_path_binary_matrix(self, grid):
        pass`,
  runnerSetup: 'shortest_path_binary_matrix = Solution().shortest_path_binary_matrix',
  functionName: 'shortest_path_binary_matrix',
  conceptId: 'graphs',
  testCases: [
    { label: 'Length 2', args: [[[0,1],[1,0]]], expected: 2 },
    { label: 'Length 4', args: [[[0,0,0],[1,1,0],[1,1,0]]], expected: 4 },
    { label: 'Blocked start', args: [[[1,0],[0,0]]], expected: -1 },
  ],
  bruteHint: 'A brute-force solution could run DFS from the top-left, exploring every possible sequence of moves to the bottom-right and tracking the shortest one found. Since each cell has up to 8 neighbors and paths can wind in many directions, the number of sequences explored grows exponentially — roughly O(8^(n²)) in the worst case. It also has no way to know a found path is the shortest without exhausting every alternative first. What traversal order would let you stop as soon as you reach the target, guaranteed to have taken the fewest steps?',
  optimizeComplexity: { time: 'O(n²)', space: 'O(n²)' },
  clues: [
    {
      id: 'output-shortest-path',
      question: 'Words like "shortest" or "minimum" in a problem statement often point directly to which graph traversal to reach for. The problem asks for the shortest clear path from top-left to bottom-right. What does "shortest" signal about the algorithm?',
      highlight: { location: 'description', text: 'shortest clear path' },
      options: [
        { label: 'DFS with backtracking', isCorrect: false, feedback: 'DFS finds a path, but not guaranteed to be the shortest. Backtracking explores arbitrary branches and has no mechanism for preferring shorter paths over longer ones.' },
        { label: 'BFS — it finds the shortest path in an unweighted graph', isCorrect: true },
        { label: 'Dijkstra with edge weights', isCorrect: false, feedback: 'This grid has no edge weights — every step costs 1. Dijkstra reduces to BFS when all edges have equal weight. BFS is simpler and equally correct here.' },
        { label: 'Greedy — always move toward bottom-right', isCorrect: false, feedback: 'A greedy diagonal approach can miss the only valid path when obstacles block direct routes. BFS explores all directions and guarantees finding the shortest path regardless of obstacle placement.' },
      ],
      correctFeedback: 'In an unweighted graph, BFS reaches every cell in order of distance from the start. The first time it reaches the bottom-right, that\'s the shortest path length.',
      wrongFeedback: [
        'Each step through a clear cell has the same cost. Which traversal visits cells in order of distance from the starting point?',
        'BFS expands level by level — all cells at distance 1, then distance 2, and so on. The first time you reach the target, the current level is the shortest path length.',
      ],
    },
    {
      id: 'eight-directional-movement',
      question: 'The allowed movement directions determine exactly how you generate neighbors during traversal. Movement is 8-directional (including diagonals). How does this affect your neighbor generation?',
      highlight: { location: 'description', text: '8-directional' },
      options: [
        { label: 'Check 4 neighbors (up, down, left, right)', isCorrect: false, feedback: 'Four-directional movement misses diagonal shortcuts. An 8-directional grid allows moving to any of 8 adjacent cells — including the 4 corners — which can yield strictly shorter paths.' },
        { label: 'Check all 8 adjacent cells', isCorrect: true },
        { label: 'Only move diagonally to reach the bottom-right faster', isCorrect: false, feedback: 'Restricting to diagonal moves would miss many valid paths. You must consider all 8 directions — the shortest path might combine diagonal and cardinal steps.' },
        { label: 'Movement direction doesn\'t affect path length', isCorrect: false, feedback: 'It absolutely does. With only 4 directions, the shortest path in a 3×3 grid from corner to corner is 5 steps. With 8 directions, it can be 3. The number of allowed directions changes path lengths significantly.' },
      ],
      correctFeedback: 'With 8-directional movement, each cell has up to 8 neighbors. A diagonal step still counts as 1 move, so the path length from (0,0) to (n−1,n−1) can be as short as n steps.',
      wrongFeedback: [
        'List all 8 directions from a cell (r, c): the 4 cardinal directions plus the 4 diagonals. How many offset pairs do you need in your neighbor loop?',
        'The 8 offsets are all combinations of (−1, 0, 1) for row and column, excluding (0, 0). Generate all 8 and filter for in-bounds, clear cells.',
      ],
    },
    {
      id: 'blocked-start-or-end',
      question: 'Checking the stated value constraints before traversal can reveal edge cases that must be handled first. The path requires clear cells (value 0). What edge case must you check before starting BFS?',
      highlight: { location: 'constraint', text: 'grid[i][j] is 0 or 1' },
      options: [
        { label: 'Whether the grid is square', isCorrect: false, feedback: 'The constraint guarantees n == grid.length == grid[0].length — the grid is always square. The edge case that actually matters is whether the start or end cell is blocked.' },
        { label: 'Whether grid[0][0] or grid[n−1][n−1] is 1', isCorrect: true },
        { label: 'Whether n is odd or even', isCorrect: false, feedback: 'Grid parity doesn\'t affect reachability. The critical pre-check is whether the entry or exit cell is blocked — if either is 1, no path can exist.' },
        { label: 'Whether the grid has any 0 cells', isCorrect: false, feedback: 'Even a grid with many 0 cells can have -1 if the start or end is blocked. The start and end cells specifically must be 0 — check those two before running BFS.' },
      ],
      correctFeedback: 'If grid[0][0] or grid[n−1][n−1] is 1, return -1 immediately. BFS can\'t start from a blocked cell, and arriving at a blocked destination is never allowed.',
      wrongFeedback: [
        'BFS can only traverse cells with value 0. Before you enqueue the starting cell, what must be true about it?',
        'Check both endpoints before starting. If grid[0][0] == 1 or grid[n-1][n-1] == 1, no path exists — return -1 without running BFS.',
      ],
    },
    {
      id: 'path-length-definition',
      question: 'Matching the traversal output to the exact definition of the answer prevents off-by-one mistakes. The path length is the number of cells visited, not the number of steps. A single-cell path has length 1. How does this affect what you return from BFS?',
      highlight: { location: 'description', text: 'the length of the shortest clear path' },
      options: [
        { label: 'Return the number of edges (steps) traversed', isCorrect: false, feedback: 'Edges equal cells minus 1 for a path. The problem counts cells, not edges — a path through 3 cells has length 3, not 2. Return the cell count, not the step count.' },
        { label: 'Return the cell count including start and end', isCorrect: true },
        { label: 'Return the traversal depth (levels explored)', isCorrect: false, feedback: 'BFS depth equals the number of steps (edges), which is one less than the cell count. The problem defines path length as the number of cells, so add 1 to the step count, or track cell count directly.' },
        { label: 'Return n−1 for a direct diagonal path', isCorrect: false, feedback: 'A direct diagonal path from (0,0) to (n−1,n−1) visits n cells — not n−1. The length is the cell count, which for that path is n.' },
      ],
      correctFeedback: 'Path length = number of cells on the path = number of BFS steps + 1. If you reach (n−1,n−1) at BFS depth d (having taken d steps), the answer is d + 1.',
      wrongFeedback: [
        'The example: grid = [[0,1],[1,0]] gives length 2. The path is (0,0) → (1,1) — two cells, one step. Is the answer 1 (steps) or 2 (cells)?',
        'Count the cells visited, not the edges between them. If BFS reaches the destination at depth d (d moves from start), the path has d+1 cells total.',
      ],
    },
  ],
  solutionCode: `from collections import deque

class Solution:
    def shortest_path_binary_matrix(self, grid):
        n = len(grid)
        if grid[0][0] == 1 or grid[n-1][n-1] == 1:
            return -1
        if n == 1:
            return 1

        visited = {(0, 0)}
        queue = deque([(0, 0, 1)])
        while queue:
            r, c, dist = queue.popleft()
            for dr in (-1, 0, 1):
                for dc in (-1, 0, 1):
                    if dr == 0 and dc == 0:
                        continue
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0 and (nr, nc) not in visited:
                        if nr == n - 1 and nc == n - 1:
                            return dist + 1
                        visited.add((nr, nc))
                        queue.append((nr, nc, dist + 1))
        return -1`,
  solutionComplexity: { time: 'O(n²)', space: 'O(n²)' },
  solutionCaveat: 'The BFS state tracks <code>dist</code> as a cell <code>count</code>, not a move count, so the starting cell is enqueued with distance <code>1</code> rather than <code>0</code> — matching the problem\'s own definition of path length as the number of visited cells, not the number of steps between them.',
  solutionExplanation: 'Allowing all 8 directions (not just 4) turns each cell into a node with up to 8 neighbors, and BFS from <code>(0,0)</code> finds the shortest such path since every move has equal cost. Checking whether the destination has been reached the moment it\'s discovered as a neighbor — rather than waiting for it to be dequeued — avoids ever enqueueing it unnecessarily, though either approach gives the same shortest-path result.',
}
