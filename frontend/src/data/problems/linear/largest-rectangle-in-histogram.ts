export default {
  id: 'largest-rectangle-in-histogram',
  title: 'Largest Rectangle in Histogram',
  difficulty: 'hard',
  description: `<p>Given an array of integers <code>heights</code> representing the histogram's bar heights where the width of each bar is 1, return the area of the largest rectangle in the histogram.</p>`,
  examples: [
    { input: 'heights = [2,1,5,6,2,3]', output: '10' },
    { input: 'heights = [2,4]', output: '4' },
  ],
  constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
  starterCode: `def largest_rectangle_area(heights):
  pass`,
  functionName: 'largest_rectangle_area',
  conceptId: 'stack',
  testCases: [
    { label: '[2,1,5,6,2,3]', args: [[2,1,5,6,2,3]], expected: 10 },
    { label: '[2,4]', args: [[2,4]], expected: 4 },
  ],
}
