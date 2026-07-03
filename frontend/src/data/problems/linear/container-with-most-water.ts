export default {
  id: 'container-with-most-water',
  title: 'Container With Most Water',
  difficulty: 'medium',
  description: `<p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn at position <code>i</code> with height <code>height[i]</code>.</p><p>Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water the container can store.</p>`,
  examples: [
    { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' },
    { input: 'height = [1,1]', output: '1' },
  ],
  constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
  starterCode: `def max_area(height):
  pass`,
  functionName: 'max_area',
  conceptId: 'two-pointers',
  testCases: [
    { label: '[1,8,6,2,5,4,8,3,7]', args: [[1,8,6,2,5,4,8,3,7]], expected: 49 },
    { label: '[1,1]', args: [[1,1]], expected: 1 },
  ],
}
