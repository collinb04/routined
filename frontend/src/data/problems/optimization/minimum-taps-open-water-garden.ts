export default {
  id: 'minimum-taps-open-water-garden',
  title: 'Minimum Number of Taps to Open to Water a Garden',
  difficulty: 'hard',
  description: 'A garden has n+1 points (0 to n). Each tap at position i waters [i-ranges[i], i+ranges[i]]. Return the minimum taps to water the entire garden, or -1 if impossible.',
  examples: [
    { input: 'n=5, ranges=[3,4,1,1,0,0]', output: '1', explanation: 'Tap 1 covers [1-4, 1+4] = [-3, 5], watering the whole garden.' },
    { input: 'n=3, ranges=[0,0,0,0]', output: '-1' },
  ],
  constraints: ['1 ≤ n ≤ 10⁴', '0 ≤ ranges[i] ≤ 100'],
  starterCode: `def min_taps(n, ranges):
  pass`,
  functionName: 'min_taps',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'One tap', args: [5,[3,4,1,1,0,0]], expected: 1 },
    { label: 'Impossible', args: [3,[0,0,0,0]], expected: -1 },
    { label: 'Two taps', args: [3,[0,0,0,1]], expected: -1 },
  ],
}
