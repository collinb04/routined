export default {
  id: 'ipo',
  title: 'IPO',
  difficulty: 'hard',
  description: 'Before an IPO, you can finish at most <code>k</code> projects to maximize capital. Each project has a profit and requires minimum capital. Start with <code>w</code> capital and pick projects greedily by maximum profit you can afford.',
  examples: [
    { input: 'k=2, w=0, profits=[1,2,3], capital=[0,1,1]', output: '4', explanation: 'Finish project 0 (profit 1, capital → 1), then project 2 (profit 3, capital → 4).' },
  ],
  constraints: ['1 ≤ k ≤ 10⁵', '0 ≤ w ≤ 10⁹', 'n == profits.length == capital.length', '1 ≤ n ≤ 10⁵'],
  starterCode: `def find_maximized_capital(k, w, profits, capital):
  pass`,
  functionName: 'find_maximized_capital',
  conceptId: 'heap',
  testCases: [
    { label: 'k=2', args: [2,0,[1,2,3],[0,1,1]], expected: 4 },
    { label: 'k=3', args: [3,0,[1,2,3],[0,1,2]], expected: 6 },
    { label: 'k=0', args: [0,5,[1,2],[0,0]], expected: 5 },
  ],
}
