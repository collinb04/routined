export default {
  id: 'detect-squares',
  title: 'Detect Squares',
  difficulty: 'medium',
  description: 'Design a data structure that receives points one by one. Given a new point, count the number of ways to form an axis-aligned square using the new point and three other previously added points.',
  examples: [
    { input: 'add([3,10]), add([11,2]), add([3,2]), count([11,10])', output: '1', explanation: 'The square (3,2),(3,10),(11,2),(11,10) is valid.' },
  ],
  constraints: ['point.length == 2', '0 ≤ point[i] ≤ 1000', 'At most 3000 calls to add and count'],
  starterCode: `def detect_squares(operations, points):
  from collections import defaultdict
  counts = defaultdict(int)
  point_counts = defaultdict(int)
  result = []
  for op, point in zip(operations, points):
      if op == 'add':
          point_counts[tuple(point)] += 1
          result.append(None)
      else:
          pass  # implement count logic
  return result`,
  functionName: 'detect_squares',
  conceptId: 'math-geometry',
  testCases: [
    { label: 'One square', args: [['add','add','add','count'],[[3,10],[11,2],[3,2],[11,10]]], expected: [null,null,null,1] },
    { label: 'No square', args: [['add','add','count'],[[0,0],[1,1],[2,2]]], expected: [null,null,0] },
  ],
}
