export default {
  id: 'trapping-rain-water',
  title: 'Trapping Rain Water',
  difficulty: 'hard',
  description: `<p>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.</p>`,
  examples: [
    { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
    { input: 'height = [4,2,0,3,2,5]', output: '9' },
  ],
  constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
  starterCode: `def trap(height):
  pass`,
  functionName: 'trap',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'classic', args: [[0,1,0,2,1,0,1,3,2,1,2,1]], expected: 6 },
    { label: '[4,2,0,3,2,5]', args: [[4,2,0,3,2,5]], expected: 9 },
  ],
}
