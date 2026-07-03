export default {
  id: 'minimum-cost-for-tickets',
  title: 'Minimum Cost For Tickets',
  difficulty: 'medium',
  description: 'You plan to travel on certain days. Passes cost: 1-day pass = <code>costs[0]</code>, 7-day = <code>costs[1]</code>, 30-day = <code>costs[2]</code>. Find the minimum cost to travel every day you want.',
  examples: [
    { input: 'days=[1,4,6,7,8,20], costs=[2,7,15]', output: '11', explanation: '1-day pass on day 1 (2), 7-day pass starting day 4 (7), 1-day pass on day 20 (2) = 11.' },
  ],
  constraints: ['1 ≤ days.length ≤ 365', '1 ≤ days[i] ≤ 365', 'days is sorted'],
  starterCode: `def min_cost_tickets(days, costs):
  pass`,
  functionName: 'min_cost_tickets',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'Standard', args: [[1,4,6,7,8,20],[2,7,15]], expected: 11 },
    { label: 'Daily travel', args: [[1,2,3,4,5,6,7,8,9,10,30,31],[2,7,15]], expected: 17 },
  ],
}
