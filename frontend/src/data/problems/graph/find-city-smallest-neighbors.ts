export default {
  id: 'find-city-smallest-neighbors',
  title: 'Find the City With the Smallest Number of Neighbors at a Threshold Distance',
  difficulty: 'medium',
  description: 'Given n cities, edges with weights, and a threshold, find the city with the fewest reachable cities (within threshold). If tie, return the one with the greatest number.',
  examples: [
    { input: 'n=4, edges=[[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold=4', output: '3' },
  ],
  constraints: ['2 ≤ n ≤ 100', '1 ≤ edges.length ≤ n*(n-1)/2', '1 ≤ distanceThreshold ≤ 10⁴'],
  starterCode: `def find_the_city(n, edges, distance_threshold):
  pass`,
  functionName: 'find_the_city',
  conceptId: 'advanced-graphs',
  testCases: [
    { label: 'City 3', args: [4,[[0,1,3],[1,2,1],[1,3,4],[2,3,1]],4], expected: 3 },
    { label: 'City 0', args: [5,[[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]],2], expected: 0 },
  ],
}
