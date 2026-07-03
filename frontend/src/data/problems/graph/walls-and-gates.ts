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
}
