export default {
  id: 'gas-station',
  title: 'Gas Station',
  difficulty: 'medium',
  description: 'There are <code>n</code> gas stations in a circle. You are given <code>gas[i]</code> and <code>cost[i]</code> to travel to the next station. Find the starting station index from which you can complete a full circuit. Return -1 if impossible.',
  examples: [
    { input: 'gas=[1,2,3,4,5], cost=[3,4,5,1,2]', output: '3', explanation: 'Starting at station 3 you can complete the circuit.' },
    { input: 'gas=[2,3,4], cost=[3,4,3]', output: '-1' },
  ],
  constraints: ['n == gas.length == cost.length', '1 ≤ n ≤ 10⁵', '0 ≤ gas[i], cost[i] ≤ 10⁴'],
  starterCode: `def can_complete_circuit(gas, cost):
  pass`,
  functionName: 'can_complete_circuit',
  conceptId: 'greedy',
  testCases: [
    { label: 'Station 3', args: [[1,2,3,4,5],[3,4,5,1,2]], expected: 3 },
    { label: 'Impossible', args: [[2,3,4],[3,4,3]], expected: -1 },
    { label: 'Single station', args: [[5],[4]], expected: 0 },
  ],
}
