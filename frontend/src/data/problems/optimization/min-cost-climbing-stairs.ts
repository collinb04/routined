export default {
  id: 'min-cost-climbing-stairs',
  title: 'Min Cost Climbing Stairs',
  difficulty: 'easy',
  description: `<p>You are given an integer array <code>cost</code> where <code>cost[i]</code> is the cost of the <code>i</code>th step on a staircase. Once you pay the cost, you can climb one or two steps. You can start from index 0 or 1. Return the minimum cost to reach the top of the floor.</p>`,
  examples: [
    { input: 'cost = [10,15,20]', output: '15' },
    { input: 'cost = [1,100,1,1,1,100,1,1,100,1]', output: '6' },
  ],
  constraints: ['2 <= cost.length <= 1000', '0 <= cost[i] <= 999'],
  starterCode: `def min_cost_climbing_stairs(cost):
  pass`,
  functionName: 'min_cost_climbing_stairs',
  conceptId: 'dp-1d',
  testCases: [
    { label: '[10,15,20]', args: [[10,15,20]], expected: 15 },
    { label: 'longer', args: [[1,100,1,1,1,100,1,1,100,1]], expected: 6 },
  ],
}
