export default {
  id: 'cheapest-flights-k-stops',
  title: 'Cheapest Flights Within K Stops',
  difficulty: 'medium',
  description: 'Given flights as <code>[from, to, price]</code> and integers <code>src</code>, <code>dst</code>, <code>k</code>, return the cheapest price to fly from src to dst with at most k stops. Return -1 if no route. (Bellman-Ford)',
  examples: [
    { input: 'n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src=0, dst=3, k=1', output: '700', explanation: '0→1→3 costs 700 with 1 stop.' },
  ],
  constraints: ['1 ≤ n ≤ 100', '0 ≤ flights.length ≤ n*(n-1)/2', '1 ≤ price ≤ 10⁴'],
  starterCode: `def find_cheapest_price(n, flights, src, dst, k):
  pass`,
  functionName: 'find_cheapest_price',
  conceptId: 'advanced-graphs',
  testCases: [
    { label: 'k=1', args: [4,[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],0,3,1], expected: 700 },
    { label: 'k=2', args: [4,[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],0,3,2], expected: 400 },
  ],
}
