export default {
  id: 'h-index',
  title: 'H-Index',
  difficulty: 'medium',
  description: 'Given an array of integers <code>citations</code> representing the number of citations for each paper, return the researcher\'s h-index: the maximum value <code>h</code> such that at least <code>h</code> papers have at least <code>h</code> citations.',
  examples: [
    { input: 'citations = [3,0,6,1,5]', output: '3', explanation: '3 papers have ≥ 3 citations.' },
    { input: 'citations = [1,3,1]', output: '1' },
  ],
  constraints: ['1 ≤ n ≤ 5000', '0 ≤ citations[i] ≤ 1000'],
  starterCode: `def h_index(citations):
  pass`,
  functionName: 'h_index',
  conceptId: 'sorting',
  testCases: [
    { label: 'Standard', args: [[3,0,6,1,5]], expected: 3 },
    { label: 'Small', args: [[1,3,1]], expected: 1 },
    { label: 'All same', args: [[5,5,5,5,5]], expected: 5 },
    { label: 'All zeros', args: [[0,0]], expected: 0 },
  ],
}
