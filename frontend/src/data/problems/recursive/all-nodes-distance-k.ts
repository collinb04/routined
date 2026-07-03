export default {
  id: 'all-nodes-distance-k',
  title: 'All Nodes Distance K in Binary Tree',
  difficulty: 'medium',
  description: 'Given the root of a binary tree, a target node, and integer <code>k</code>, return all nodes at distance <code>k</code> from the target node. Answer can be in any order.',
  examples: [
    { input: 'root=[3,5,1,6,2,0,8,null,null,7,4], target=5, k=2', output: '[7,4,1]', explanation: 'Nodes 7, 4 (both in subtree) and 1 (distance 2 upward).' },
  ],
  constraints: ['1 ≤ tree nodes ≤ 500', '0 ≤ Node.val ≤ 500', '0 ≤ k ≤ 1000'],
  starterCode: `def distance_k(root, target, k):
  pass`,
  functionName: 'distance_k',
  conceptId: 'trees',
  testCases: [
    { label: 'Three nodes', args: [[3,5,1,6,2,0,8,null,null,7,4],5,2], expected: [1,4,7] },
    { label: 'k=0 returns target', args: [[1],1,0], expected: [1] },
  ],
}
