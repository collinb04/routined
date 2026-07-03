export default {
  id: 'min-cost-connect-all-points',
  title: 'Min Cost to Connect All Points',
  difficulty: 'medium',
  description: 'Given an array of points on a 2D plane, return the minimum cost to connect all points. The cost of connecting two points is their Manhattan distance. (Prim\'s or Kruskal\'s MST)',
  examples: [
    { input: 'points=[[0,0],[2,2],[3,10],[5,2],[7,0]]', output: '20' },
    { input: 'points=[[3,12],[-2,5],[-4,1]]', output: '18' },
  ],
  constraints: ['1 ≤ points.length ≤ 1000', '-10⁶ ≤ x, y ≤ 10⁶', 'No two points are the same'],
  starterCode: `def min_cost_connect_points(points):
  pass`,
  functionName: 'min_cost_connect_points',
  conceptId: 'advanced-graphs',
  testCases: [
    { label: 'Five points', args: [[[0,0],[2,2],[3,10],[5,2],[7,0]]], expected: 20 },
    { label: 'Three points', args: [[[3,12],[-2,5],[-4,1]]], expected: 18 },
    { label: 'Single point', args: [[[0,0]]], expected: 0 },
  ],
}
