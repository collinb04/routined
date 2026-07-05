export default {
  id: 'walls-and-gates',
  title: 'Walls and Gates',
  difficulty: 'medium',
  description: `<p>You are given an <code>m x n</code> grid <code>rooms</code> initialized with: <code>-1</code> (wall or obstacle), <code>0</code> (gate), <code>INF</code> = 2147483647 (empty room). Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, leave it as INF. Return the modified grid.</p>`,
  examples: [
    { input: 'rooms = [[INF,-1,0,INF],[INF,INF,INF,-1],[INF,-1,INF,-1],[0,-1,INF,INF]]', output: '[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]' },
  ],
  constraints: ['m == rooms.length', 'n == rooms[i].length', '1 <= m, n <= 250'],
  starterCode: `def walls_and_gates(rooms):
  pass`,
  functionName: 'walls_and_gates_run',
  conceptId: 'graphs',
  runnerSetup: `def walls_and_gates_run(rooms):
  import copy
  r = copy.deepcopy(rooms)
  walls_and_gates(r)
  return r`,
  testCases: [
    { label: '4x4', args: [[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]], expected: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]] },
  ],
  clues: [
    {
      id: 'nearest-gate-implies-bfs',
      question: 'Each room needs the distance to its nearest gate. What does "nearest" signal about the algorithm?',
      options: [
        { label: 'DFS from each gate', isCorrect: false, feedback: 'DFS explores one path deeply before backtracking — it doesn\'t naturally find the nearest gate. A room could be assigned the distance from a far gate before a closer one is found.' },
        { label: 'BFS from each gate simultaneously', isCorrect: true },
        { label: 'Run Dijkstra with uniform edge weights', isCorrect: false, feedback: 'Dijkstra works, but reduces to BFS when all edges have the same weight (1 per step). BFS is simpler and equally correct here.' },
        { label: 'For each room, run BFS until a gate is found', isCorrect: false, feedback: 'Running separate BFS from each room is O(m²n²) — too slow for a 250×250 grid. Multi-source BFS from all gates simultaneously gives each room its nearest-gate distance in one O(mn) pass.' },
      ],
      correctFeedback: 'Multi-source BFS from all gates simultaneously fills rooms in order of their distance from the nearest gate. The first time BFS reaches a room, it\'s via the shortest path from any gate.',
      wrongFeedback: [
        'Every room needs the distance to the closest gate, not just any gate. Which traversal visits cells in order of their distance from the starting points?',
        'Seed BFS with all gates at distance 0. BFS then spreads outward — each room is reached at exactly its nearest-gate distance.',
      ],
    },
    {
      id: 'multi-source-initialization',
      question: 'There are multiple gates. How should you initialize BFS to find each room\'s nearest gate in one pass?',
      options: [
        { label: 'Run one BFS per gate, take the minimum', isCorrect: false, feedback: 'Running k separate BFS passes is k times slower than one multi-source BFS. With multiple gates in a 250×250 grid, this adds up. Seed all gates into the queue at the start.' },
        { label: 'Enqueue all gates at distance 0 before starting', isCorrect: true },
        { label: 'Start BFS from the gate closest to the center', isCorrect: false, feedback: 'Picking one starting gate means rooms near other gates get wrong distances. All gates start at distance 0 simultaneously — that\'s the definition of multi-source BFS.' },
        { label: 'Sort gates by position, process in order', isCorrect: false, feedback: 'Gate position order is irrelevant. What matters is that all gates contribute to the BFS simultaneously, so every room is measured from its actual nearest gate.' },
      ],
      correctFeedback: 'Scan the grid, enqueue every cell with value 0 at distance 0. Then run BFS normally — each room will be reached at the minimum distance from any gate.',
      wrongFeedback: [
        'The key insight: all gates are "at distance 0" from themselves. How do you represent multiple starting points in BFS?',
        'Pre-load the BFS queue with all gate positions. BFS expands outward from all of them at once — the first time any room is reached, it\'s from its nearest gate.',
      ],
    },
    {
      id: 'walls-as-barriers',
      question: 'Walls have value -1 and cannot be traversed. How should your BFS treat them?',
      options: [
        { label: 'Set walls to INF before BFS begins', isCorrect: false, feedback: 'Setting walls to INF would make them indistinguishable from empty rooms — BFS would try to traverse them. Keep walls as -1 and skip any neighbor with value -1 during BFS.' },
        { label: 'Skip any neighbor with value -1', isCorrect: true },
        { label: 'Treat walls as rooms with infinite distance', isCorrect: false, feedback: 'Walls are not rooms — they block passage. Treating them as rooms would allow BFS to "pass through" walls by updating their value, which corrupts the grid and gives wrong distances.' },
        { label: 'Remove walls before running BFS', isCorrect: false, feedback: 'Removing walls would eliminate the barriers and let BFS cross them freely. The -1 sentinel must remain — your BFS neighbor check should skip cells with value -1.' },
      ],
      correctFeedback: 'During BFS, only enqueue neighbors that are empty rooms (value INF). Skip cells with value -1 (walls) and 0 (gates — already processed). The -1 value naturally acts as a barrier.',
      wrongFeedback: [
        'In BFS, before enqueuing a neighbor, what condition must it satisfy? Think about what values walls and already-visited rooms have.',
        'Only enqueue a neighbor if rooms[r][c] == INF — meaning it\'s an unvisited empty room. Walls (-1) and gates (0) are both skipped.',
      ],
    },
    {
      id: 'grid-size-complexity',
      question: 'm, n ≤ 250 means up to 62,500 cells. What complexity is acceptable?',
      options: [
        { label: 'O(mn) — each cell visited once', isCorrect: true },
        { label: 'O(m²n²) — BFS from every room', isCorrect: false, feedback: 'At m = n = 250, O(m²n²) is approximately 3.9 billion operations — far too slow. Multi-source BFS visits each cell exactly once: O(mn) = 62,500 operations total.' },
        { label: 'O(mn log mn) — priority queue needed', isCorrect: false, feedback: 'A priority queue is needed for weighted shortest paths (Dijkstra), but here every step costs 1. BFS on an unweighted graph is O(mn) — no heap required.' },
        { label: 'O(k × mn) where k is the number of gates', isCorrect: false, feedback: 'Running k separate BFS passes would be O(k × mn), but multi-source BFS combines all k starting points into one pass. The total is O(mn) regardless of how many gates there are.' },
      ],
      correctFeedback: 'Multi-source BFS visits each of the 62,500 cells at most once. Total complexity is O(mn) — each cell is enqueued once and dequeued once, with constant work per cell.',
      wrongFeedback: [
        'At m = n = 250, how many cells are there? Multi-source BFS visits each one exactly once — what is that complexity?',
        'O(mn) = 62,500 cell visits. O(m²n²) = ~3.9 billion. BFS from all gates simultaneously is the O(mn) approach.',
      ],
    },
  ],
}
