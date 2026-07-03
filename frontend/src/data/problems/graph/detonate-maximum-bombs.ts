export default {
  id: 'detonate-maximum-bombs',
  title: 'Detonate the Maximum Bombs',
  difficulty: 'medium',
  description: 'You have bombs at positions <code>[x, y, r]</code>. Detonating a bomb also detonates any bomb whose center is within its radius. Return the maximum number of bombs that can be detonated by detonating exactly one bomb.',
  examples: [
    { input: 'bombs = [[2,1,3],[6,1,4]]', output: '2', explanation: 'Detonating bomb 1 reaches bomb 0. Detonating bomb 0 doesn\'t reach bomb 1.' },
  ],
  constraints: ['1 ≤ bombs.length ≤ 100', 'bombs[i].length == 3', '1 ≤ x, y, r ≤ 10⁵'],
  starterCode: `def maximum_detonation(bombs):
  pass`,
  functionName: 'maximum_detonation',
  conceptId: 'graphs',
  testCases: [
    { label: 'Two bombs', args: [[[2,1,3],[6,1,4]]], expected: 2 },
    { label: 'No chain', args: [[[1,1,1],[2,2,1]]], expected: 1 },
    { label: 'Single', args: [[[5,5,5]]], expected: 1 },
  ],
}
