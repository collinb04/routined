export default {
  id: 'clone-graph',
  title: 'Clone Graph',
  difficulty: 'medium',
  description: `<p>Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node has a value and a list of neighbors.</p><p>The graph is represented as an adjacency list. For testing, the graph is given as a list of adjacency lists: <code>adjList[i]</code> is the list of neighbor values for node <code>i+1</code>. Return the adjacency list of the cloned graph.</p>`,
  examples: [
    { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' },
  ],
  constraints: ['The number of nodes is in [0, 100]', '1 <= Node.val <= 100', 'Node.val is unique for each node', 'There are no repeated edges or self-loops'],
  starterCode: `class Node:
  def __init__(self, val=0, neighbors=None):
      self.val = val
      self.neighbors = neighbors if neighbors is not None else []

def clone_graph(node):
  pass`,
  functionName: 'clone_graph_run',
  conceptId: 'graphs',
  runnerSetup: `def clone_graph_run(adj):
  if not adj: return []
  nodes = [Node(i+1) for i in range(len(adj))]
  for i, nbrs in enumerate(adj):
      nodes[i].neighbors = [nodes[v-1] for v in nbrs]
  cloned = clone_graph(nodes[0])
  if not cloned: return []
  visited = {}
  def bfs(n):
      if n.val in visited: return
      visited[n.val] = n
      for nb in n.neighbors: bfs(nb)
  bfs(cloned)
  result = [[] for _ in range(len(adj))]
  for v, n in visited.items(): result[v-1] = sorted([nb.val for nb in n.neighbors])
  return result`,
  testCases: [
    { label: '4-cycle', args: [[[2,4],[1,3],[2,4],[1,3]]], expected: [[2,4],[1,3],[2,4],[1,3]] },
    { label: 'single', args: [[[]]], expected: [[]] },
  ],
  clues: [
    {
      id: 'deep-copy-requirement',
      question: 'The output is a deep copy — not a reference to the original nodes. What problem does a shallow copy create?',
      options: [
        { label: 'The clone shares Node objects with the original', isCorrect: true },
        { label: 'You can\'t traverse the graph without modifying it', isCorrect: false, feedback: 'Traversal doesn\'t modify nodes. The deep vs. shallow distinction is about what you create: shared references to original nodes versus new, independent node objects.' },
        { label: 'Node values would be duplicated in memory', isCorrect: false, feedback: 'Values (integers) are copied by value anyway. The concern is the Node objects themselves — a shallow copy would let the "clone" point to the original\'s neighbor nodes.' },
        { label: 'The graph order would be reversed', isCorrect: false, feedback: 'Copy depth has nothing to do with traversal order. A shallow copy creates new references that point at the original nodes, meaning mutations to either graph affect both.' },
      ],
      correctFeedback: 'A shallow copy creates new Node wrappers but reuses the original neighbor references. Any mutation to the clone\'s neighbors would corrupt the original. You need to create a new Node object for every node in the graph.',
      wrongFeedback: [
        'If cloned_node.neighbors still points to original Node objects, what happens when someone modifies a neighbor of the clone?',
        'Deep copy means every object in the structure is a new allocation. What breaks if cloned nodes still share references with the original graph?',
      ],
    },
    {
      id: 'cycle-handling',
      question: 'The graph is undirected — every edge (A, B) means A lists B as a neighbor and B lists A as a neighbor. What does this imply about traversal?',
      options: [
        { label: 'You process edges in both directions — doubled work', isCorrect: false, feedback: 'You don\'t need to explicitly double your work — but you do need to handle the fact that traversal from A will see B, and traversal from B will see A again. The key is detecting when you\'ve already cloned a node.' },
        { label: 'You must track which nodes you\'ve already cloned', isCorrect: true },
        { label: 'Process nodes in sorted order to avoid revisiting', isCorrect: false, feedback: 'Sorted order doesn\'t prevent revisiting — the graph structure determines reachability. You need a map from original node to its clone to detect when a node has already been cloned.' },
        { label: 'Undirected graphs cannot be cloned with DFS', isCorrect: false, feedback: 'DFS works fine on undirected graphs. The cyclic nature just means you must check whether you\'ve already cloned a node before creating a duplicate.' },
      ],
      correctFeedback: 'Without tracking, you\'d clone the same node twice and create an infinite loop following A→B→A→B. A visited map from original node to its clone breaks the cycle and ensures each node is cloned exactly once.',
      wrongFeedback: [
        'If you clone A, then clone its neighbor B, then process B\'s neighbors — you\'ll see A again. What prevents you from creating a second clone of A?',
        'You need a structure that maps original nodes to their clones, so when you encounter a node again you return the existing clone. What is that structure?',
      ],
    },
    {
      id: 'visited-map-role',
      question: 'You maintain a map from original node to its cloned copy. This map serves two purposes. Which pair is correct?',
      options: [
        { label: 'Counts edges and records node values', isCorrect: false, feedback: 'The map stores node objects, not counts or values. Its two jobs are detecting already-cloned nodes (cycle prevention) and providing the clone reference when wiring neighbor lists.' },
        { label: 'Detects revisits and provides the clone when wiring neighbors', isCorrect: true },
        { label: 'Sorts nodes and tracks depths', isCorrect: false, feedback: 'The map is an identity lookup, not a sort or depth tracker. It answers "have I cloned this node, and if so, which object is its clone?"' },
        { label: 'Stores edge weights and parent pointers', isCorrect: false, feedback: 'This problem has no edge weights. The map\'s role is purely about object identity: original node → cloned node, used both to skip re-cloning and to correctly set neighbor references.' },
      ],
      correctFeedback: 'When you see a node already in the map, you skip re-cloning it (cycle prevention). When you wire a clone\'s neighbors, you look up each original neighbor in the map to get its clone — not the original.',
      wrongFeedback: [
        'When building clone_A.neighbors, you need the clone of each neighbor, not the original. Where do you find the clone of a neighbor that was already processed?',
        'The map solves two problems in one: it tells you whether to create a new clone, and it tells you which clone to attach as a neighbor. Can you see both uses?',
      ],
    },
  ],
}
