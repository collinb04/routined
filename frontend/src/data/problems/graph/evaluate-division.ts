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
  clues: [
    {
      id: 'graph-as-model',
      question: 'a/b = 2.0 and b/c = 3.0, so a/c = 6.0. How does this chain of divisions map onto a graph?',
      options: [
        { label: 'Variables are edges, equations are nodes', isCorrect: false, feedback: 'Flip this: variables are nodes and equations define edges. The equation a/b = 2.0 becomes a directed edge from node a to node b with weight 2.0.' },
        { label: 'Variables are nodes, equations define weighted directed edges', isCorrect: true },
        { label: 'Each equation is a separate disconnected graph', isCorrect: false, feedback: 'If equations were disconnected, you could never answer multi-hop queries like a/c. The graph\'s connected components represent groups of variables that can be related.' },
        { label: 'The graph is unweighted — only connectivity matters', isCorrect: false, feedback: 'The numeric values are exactly the edge weights. To compute a/c = 6.0, you multiply weights along the path a→b→c: 2.0 × 3.0. Weights carry all the arithmetic information.' },
      ],
      correctFeedback: 'Each equation a/b = k contributes two edges: a→b with weight k, and b→a with weight 1/k. A query a/c becomes "find a path from a to c and multiply the edge weights."',
      wrongFeedback: [
        'If a/b = 2.0 is an edge, what is the starting node, the ending node, and what does the edge weight represent?',
        'To answer a/c, you chain: a/b × b/c. How does that chain of multiplications map to a path in the graph?',
      ],
    },
    {
      id: 'reverse-edge',
      question: 'You know a/b = 2.0. What edge do you add to handle the query b/a?',
      options: [
        { label: 'Nothing — b/a is undefined unless stated', isCorrect: false, feedback: 'b/a = 1 / (a/b) = 0.5. Every equation implies its reciprocal. You must add the reverse edge explicitly so that queries in either direction can be answered.' },
        { label: 'b→a with weight 1/2.0 = 0.5', isCorrect: true },
        { label: 'b→a with weight 2.0 — same weight in reverse', isCorrect: false, feedback: 'If b→a also had weight 2.0, that would mean b/a = 2.0 = a/b, implying a = b. The reverse edge weight must be the reciprocal: 1/k.' },
        { label: 'a→b with weight −2.0 to cancel the original', isCorrect: false, feedback: 'Negative weights have no meaning here — all values[i] > 0 and division is always positive. The reverse direction is the reciprocal, not the negation.' },
      ],
      correctFeedback: 'For every equation a/b = k, add edge a→b with weight k and edge b→a with weight 1/k. This makes the graph undirected in structure (both directions traversable) while encoding both a/b and b/a correctly.',
      wrongFeedback: [
        'If a/b = 2.0, what is b/a? How should that value appear as an edge in your graph?',
        'Division reversal: a/b = k means b/a = 1/k. How do you represent both directions in the adjacency list?',
      ],
    },
    {
      id: 'unknown-variable-signal',
      question: 'A query involves a variable that never appeared in any equation. You must return -1. How do you detect this?',
      options: [
        { label: 'Check if the variable\'s value is 0', isCorrect: false, feedback: 'Variables don\'t have stored values — they are nodes in the graph. A variable not in any equation simply has no node in the graph at all. Check the node set, not a value.' },
        { label: 'Check if the variable is absent from the graph\'s node set', isCorrect: true },
        { label: 'Run DFS and return -1 if it takes more than 20 steps', isCorrect: false, feedback: 'With at most 20 equations, the graph has at most 40 nodes. DFS would not take more than 40 steps regardless. The fast check is whether the node exists in your adjacency map at all.' },
        { label: 'Return 0 for unknown variables, not -1', isCorrect: false, feedback: 'The problem specifies -1 for answers that do not exist. Returning 0 would be incorrect — 0 is not a valid division result since all values > 0.' },
      ],
      correctFeedback: 'Before running any path search, check if both query variables exist as keys in your graph. If either is missing, return -1 immediately — no path can exist for a node that was never defined.',
      wrongFeedback: [
        'Your graph is built from the equations. What happens when you look up a variable in your adjacency map that was never part of any equation?',
        'Variables that never appeared in equations have no node in the graph. What is the simplest check before running DFS for a query (X, Y)?',
      ],
    },
    {
      id: 'path-product',
      question: 'To answer query a/c, you find a path a→b→c in the graph. How do you compute the final answer from the path?',
      options: [
        { label: 'Sum the edge weights along the path', isCorrect: false, feedback: 'Summation doesn\'t correspond to division chaining. a/b × b/c = a/c — intermediate variables cancel when you multiply. The operation is multiplication, not addition.' },
        { label: 'Multiply the edge weights along the path', isCorrect: true },
        { label: 'Take the minimum edge weight on the path', isCorrect: false, feedback: 'Min-weight is a bottleneck path concept, not division arithmetic. a/c = (a/b) × (b/c) — the path value is the product of all edge weights, not the smallest one.' },
        { label: 'Divide the first edge weight by the last', isCorrect: false, feedback: 'Only the first and last weights would ignore all intermediate edges. For a path of length k, all k edge weights must be multiplied together to chain the divisions correctly.' },
      ],
      correctFeedback: 'At each step, multiply the running product by the current edge weight. When you reach the destination, the product equals the answer: a/c = (a/b) × (b/c) = 2.0 × 3.0 = 6.0.',
      wrongFeedback: [
        'Express a/c in terms of a/b and b/c. What arithmetic operation combines them?',
        'Division chains multiply: a/b × b/c = a/c (the b cancels). How do you generalize that to a path of arbitrary length in DFS?',
      ],
    },
  ],
}
