export default {
  id: 'frog-jump',
  title: 'Frog Jump',
  difficulty: 'hard',
  description: 'A frog crossing a river must jump on stones. At each stone it can jump k-1, k, or k+1 units (k = last jump). Can the frog reach the last stone?',
  examples: [
    { input: 'stones = [0,1,3,5,6,8,12,17]', output: 'true', explanation: 'Jump sequence: 1,2,2,3,3,4,5.' },
    { input: 'stones = [0,1,2,3,4,8,9,11]', output: 'false' },
  ],
  constraints: ['2 ≤ stones.length ≤ 2000', '0 ≤ stones[i] ≤ 2³¹ − 1', 'stones[0] == 0', 'stones is sorted'],
  starterCode: `def can_cross(stones):
  pass`,
  functionName: 'can_cross',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Can cross', args: [[0,1,3,5,6,8,12,17]], expected: true },
    { label: 'Cannot cross', args: [[0,1,2,3,4,8,9,11]], expected: false },
  ],
}
