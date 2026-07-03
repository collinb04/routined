export default {
  id: 'jump-game-iii',
  title: 'Jump Game III',
  difficulty: 'medium',
  description: 'Given an array of non-negative integers <code>arr</code>, starting from <code>start</code>, you can jump to index <code>i + arr[i]</code> or <code>i - arr[i]</code>. Return <code>true</code> if you can reach any index with value 0.',
  examples: [
    { input: 'arr=[4,2,3,0,3,1,2], start=5', output: 'true', explanation: 'Jump to index 4, then 1, then 3 (value 0).' },
    { input: 'arr=[3,0,2,1,2], start=2', output: 'false' },
  ],
  constraints: ['1 ≤ arr.length ≤ 5 × 10⁴', '0 ≤ arr[i] < arr.length', '0 ≤ start < arr.length'],
  starterCode: `def can_reach(arr, start):
  pass`,
  functionName: 'can_reach',
  conceptId: 'dp-1d',
  testCases: [
    { label: 'Can reach', args: [[4,2,3,0,3,1,2],5], expected: true },
    { label: 'Cannot reach', args: [[3,0,2,1,2],2], expected: false },
    { label: 'Start is zero', args: [[0],0], expected: true },
  ],
}
