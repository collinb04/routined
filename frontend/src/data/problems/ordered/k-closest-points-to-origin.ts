export default {
  id: 'k-closest-points-to-origin',
  title: 'K Closest Points to Origin',
  difficulty: 'medium',
  description: `<p>Given an array of <code>points</code> where <code>points[i] = [xi, yi]</code> represents a point on the X-Y plane and an integer <code>k</code>, return the <code>k</code> closest points to the origin. You may return the answer in any order.</p>`,
  examples: [
    { input: 'points = [[1,3],[-2,2]], k = 1', output: '[[-2,2]]' },
    { input: 'points = [[3,3],[5,-1],[-2,4]], k = 2', output: '[[3,3],[-2,4]]' },
  ],
  constraints: ['1 <= k <= points.length <= 10^4', '-10^4 <= xi, yi <= 10^4'],
  starterCode: `def k_closest(points, k):
  pass`,
  functionName: 'k_closest_run',
  conceptId: 'heap',
  runnerSetup: `def k_closest_run(points, k):
  result = k_closest(points, k)
  return sorted([sorted(p) for p in result])`,
  testCases: [
    { label: '[[1,3],[-2,2]] k=1', args: [[[1,3],[-2,2]], 1], expected: [[-2,2]] },
    { label: 'k=2', args: [[[3,3],[5,-1],[-2,4]], 2], expected: [[-2,4],[3,3]] },
  ],
}
