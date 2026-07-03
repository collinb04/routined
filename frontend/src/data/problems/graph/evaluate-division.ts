export default {
  id: 'evaluate-division',
  title: 'Evaluate Division',
  difficulty: 'medium',
  description: 'Given equations like A/B = k and queries, return the answer to each query. Return -1 if the answer does not exist.',
  examples: [
    { input: 'equations=[["a","b"],["b","c"]], values=[2.0,3.0], queries=[["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]', output: '[6.0,0.5,-1.0,1.0,-1.0]' },
  ],
  constraints: ['1 ≤ equations.length ≤ 20', 'values[i] > 0', '1 ≤ queries.length ≤ 20'],
  starterCode: `def calc_equation(equations, values, queries):
  pass`,
  functionName: 'calc_equation',
  conceptId: 'graphs',
  testCases: [
    { label: 'Standard', args: [[['a','b'],['b','c']],[2.0,3.0],[['a','c'],['b','a'],['a','e'],['a','a'],['x','x']]], expected: [6.0,0.5,-1.0,1.0,-1.0] },
  ],
}
