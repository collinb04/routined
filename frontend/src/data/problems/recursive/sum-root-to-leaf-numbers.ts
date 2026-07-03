export default {
  id: 'sum-root-to-leaf-numbers',
  title: 'Sum Root to Leaf Numbers',
  difficulty: 'medium',
  description: 'Each root-to-leaf path in a binary tree represents a number. Return the total sum of all root-to-leaf numbers.',
  examples: [
    { input: 'root = [1,2,3]', output: '25', explanation: 'Path 1→2 = 12, path 1→3 = 13. Sum = 25.' },
    { input: 'root = [4,9,0,5,1]', output: '1026', explanation: 'Paths: 495, 491, 40. Sum = 1026.' },
  ],
  constraints: ['1 ≤ number of nodes ≤ 1000', '0 ≤ Node.val ≤ 9', 'Tree depth ≤ 10'],
  starterCode: `def sum_numbers(root):
  pass`,
  functionName: 'sum_numbers',
  conceptId: 'trees',
  testCases: [
    { label: 'Two paths', args: [[1,2,3]], expected: 25 },
    { label: 'Three paths', args: [[4,9,0,5,1]], expected: 1026 },
    { label: 'Single node', args: [[5]], expected: 5 },
  ],
}
