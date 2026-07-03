export default {
  id: 'pascals-triangle',
  title: "Pascal's Triangle",
  difficulty: 'easy',
  description: 'Given an integer <code>numRows</code>, return the first <code>numRows</code> of Pascal\'s triangle, where each number is the sum of the two numbers directly above it.',
  examples: [
    { input: 'numRows = 5', output: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]' },
    { input: 'numRows = 1', output: '[[1]]' },
  ],
  constraints: ['1 ≤ numRows ≤ 30'],
  starterCode: `def generate(num_rows):
  pass`,
  functionName: 'generate',
  conceptId: 'arrays',
  testCases: [
    { label: '5 rows', args: [5], expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]] },
    { label: '1 row', args: [1], expected: [[1]] },
    { label: '3 rows', args: [3], expected: [[1],[1,1],[1,2,1]] },
  ],
}
