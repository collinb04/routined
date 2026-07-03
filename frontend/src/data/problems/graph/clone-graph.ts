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
}
