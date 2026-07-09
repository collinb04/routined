export default {
  id: 'all-paths-source-to-target',
  title: 'All Paths From Source to Target',
  difficulty: 'medium',
  description: 'Given a DAG of <code>n</code> nodes (0 to n-1), find all paths from node 0 to node n-1. Return them in any order.',
  examples: [
    { input: 'graph = [[1,2],[3],[3],[]]', output: '[[0,1,3],[0,2,3]]' },
    { input: 'graph = [[4,3,1],[3,2,4],[3],[4],[]]', output: '[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]' },
  ],
  constraints: ['n == graph.length', '2 ≤ n ≤ 15', 'No self-loops, no repeated edges'],
  starterCode: `def all_paths_source_target(graph):
  pass`,
  functionName: 'all_paths_source_target',
  conceptId: 'graphs',
  testCases: [
    { label: 'Two paths', args: [[[1,2],[3],[3],[]]], expected: [[0,1,3],[0,2,3]] },
  ],
  bruteHint: 'Describe generating candidate node sequences and checking each one against the edge list, and why that wastes work',
  optimizeHint: 'Name the traversal technique that builds a path by following real edges and undoes a step when a branch dead-ends',
  clues: [
    {
      id: 'dag-guarantee',
      question: '"Given a DAG" — a directed acyclic graph. What does acyclic let you skip?',
      options: [
        { label: 'You need a visited set to avoid revisiting', isCorrect: false, feedback: 'A DAG has no cycles by definition, so DFS cannot loop back to a node already on the current path. A visited set is the right tool for cyclic graphs — here it is unnecessary.' },
        { label: 'You can skip cycle detection entirely', isCorrect: true },
        { label: 'You must process nodes in sorted order', isCorrect: false, feedback: 'Processing order is determined by the graph structure, not sorted node indices. The acyclic guarantee is about termination, not traversal order.' },
        { label: 'BFS is required because DFS would loop', isCorrect: false, feedback: 'DFS cannot loop in a DAG — there are no back edges. Both DFS and BFS work; DFS is actually more natural here because you want to build complete paths.' },
      ],
      correctFeedback: 'No cycles means DFS always terminates at the target or a dead end. You can recurse freely without tracking visited nodes globally.',
      wrongFeedback: [
        'In a graph with cycles, DFS could revisit nodes and loop forever. What does "acyclic" eliminate?',
        'Cycle detection exists to prevent infinite loops. In a DAG, can DFS ever revisit a node on its current path?',
      ],
    },
    {
      id: 'output-all-paths',
      question: 'The output is all paths, not the shortest or any one path. What does this tell you about how to traverse?',
      options: [
        { label: 'BFS finds all paths layer by layer', isCorrect: false, feedback: 'BFS finds shortest paths efficiently, but building and tracking all partial paths in a BFS queue becomes awkward. DFS with backtracking naturally explores every branch to completion.' },
        { label: 'Stop as soon as you reach the target', isCorrect: false, feedback: 'If you stop at the first path found, you miss all others. The output requires every path — you need to continue exploring after each hit.' },
        { label: 'DFS with backtracking explores every branch', isCorrect: true },
        { label: 'Sort paths to avoid duplicates', isCorrect: false, feedback: 'The problem says no repeated edges and no self-loops, so duplicates aren\'t possible. Sorting doesn\'t affect which paths you find — traversal strategy does.' },
      ],
      correctFeedback: 'DFS with backtracking walks each branch to its end, records the path if it hits the target, then unwinds to explore sibling branches. That\'s exactly what "all paths" requires.',
      wrongFeedback: [
        'You need every path, not just one. What traversal strategy explores all branches and records each complete route to the target?',
        'Think about recursion: when you reach the target, you record the path. When you don\'t, you backtrack. What pattern is this?',
      ],
    },
    {
      id: 'constraint-n-small',
      question: 'n ≤ 15 nodes. What does this small bound tell you about the number of paths you might need to enumerate?',
      options: [
        { label: 'At most 15 paths — one per node', isCorrect: false, feedback: 'In a dense DAG with 15 nodes, the number of paths from source to target can be exponential — up to 2^13 in the worst case. The small n is what makes that feasible to enumerate.' },
        { label: 'Paths can number up to 2^n — exponential is acceptable here', isCorrect: true },
        { label: 'You need dynamic programming to count paths', isCorrect: false, feedback: 'DP counts paths in polynomial time, but the problem asks you to return all paths as lists, not just a count. With n ≤ 15, explicit enumeration via DFS is the right approach.' },
        { label: 'The graph is sparse — at most n edges', isCorrect: false, feedback: 'The constraint doesn\'t bound edges to n — a 15-node DAG can have up to n*(n-1)/2 directed edges. The small n bounds the exponential cost of enumeration, not the number of edges.' },
      ],
      correctFeedback: 'With n ≤ 15, there can be up to 2^13 paths — exponential but manageable. The problem is designed for explicit DFS enumeration, not a polynomial algorithm.',
      wrongFeedback: [
        'In a fully connected DAG with n nodes, how many distinct paths can there be from source to target? Is that linear or exponential in n?',
        'The bound n ≤ 15 is deliberately small. What class of algorithm does a tiny input size permit that would be unacceptable for n = 10,000?',
      ],
    },
    {
      id: 'path-tracking',
      question: 'You must return each path as an ordered list of nodes. What does this require during DFS?',
      options: [
        { label: 'Track which nodes have been visited globally', isCorrect: false, feedback: 'A global visited set prevents you from revisiting a node on any path — but valid paths can share nodes. You need to track the current path, not a permanent visited set.' },
        { label: 'Build the current path as you recurse and backtrack', isCorrect: true },
        { label: 'Store all node values in a set per level', isCorrect: false, feedback: 'Sets don\'t preserve order and would lose the sequence. Each path is a specific ordered sequence of nodes — you need a list you append to and pop from as you recurse.' },
        { label: 'Record edges, then reconstruct paths at the end', isCorrect: false, feedback: 'Reconstructing paths from edges is complex and unnecessary. Carrying the current path through DFS and snapshotting it at the target is simpler and correct.' },
      ],
      correctFeedback: 'Maintain a path list: append the current node when you enter, snapshot the list when you reach the target, pop when you backtrack. That\'s standard DFS path-tracking.',
      wrongFeedback: [
        'When DFS reaches the target, it needs to know the full sequence of nodes it took to get there. How do you maintain that sequence through recursive calls?',
        'You append a node when you visit it and remove it when you backtrack. What data structure supports that pattern?',
      ],
    },
  ],
}
