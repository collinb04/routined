export default {
  id: 'copy-list-with-random-pointer',
  title: 'Copy List with Random Pointer',
  difficulty: 'medium',
  description: `<p>A linked list of length <code>n</code> is given such that each node contains an additional random pointer, which could point to any node in the list, or <code>null</code>.</p><p>Construct a deep copy of the list and return the head. The deep copy should consist of exactly <code>n</code> new nodes, where each new node has its value set to the value of its corresponding original node. Both the <code>next</code> and <code>random</code> pointers of the new nodes should point to new nodes in the copied list.</p>`,
  examples: [
    { input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]', output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]' },
  ],
  constraints: ['0 <= n <= 1000', '-10^4 <= Node.val <= 10^4', 'Node.random is null or pointing to a node in the linked list'],
  starterCode: `class Node:
  def __init__(self, x, next=None, random=None):
      self.val = int(x)
      self.next = next
      self.random = random

def copy_random_list(head):
  pass`,
  functionName: 'copy_random_list_run',
  conceptId: 'linked-list',
  runnerSetup: `def copy_random_list_run(pairs):
  if not pairs: return []
  nodes = [Node(p[0]) for p in pairs]
  for i, p in enumerate(pairs):
      if i + 1 < len(nodes): nodes[i].next = nodes[i+1]
      nodes[i].random = nodes[p[1]] if p[1] is not None else None
  result = copy_random_list(nodes[0])
  out = []
  while result:
      out.append(result.val)
      result = result.next
  return out`,
  testCases: [
    { label: '5 nodes', args: [[[7,null],[13,0],[11,4],[10,2],[1,0]]], expected: [7,13,11,10,1] },
    { label: 'single null', args: [[[1,null]]], expected: [1] },
  ],
}
