export default {
  id: 'find-k-closest-elements',
  title: 'Find K Closest Elements',
  difficulty: 'medium',
  description: 'Given a sorted integer array <code>arr</code> and integers <code>k</code> and <code>x</code>, return the <code>k</code> closest integers to <code>x</code> in sorted order. Ties are broken by preferring the smaller element.',
  examples: [
    { input: 'arr=[1,2,3,4,5], k=4, x=3', output: '[1,2,3,4]' },
    { input: 'arr=[1,2,3,4,5], k=4, x=-1', output: '[1,2,3,4]' },
  ],
  constraints: ['1 ≤ k ≤ arr.length', '1 ≤ arr.length ≤ 10⁴', 'arr is sorted'],
  starterCode: `def find_closest_elements(arr, k, x):
  pass`,
  functionName: 'find_closest_elements',
  conceptId: 'binary-search',
  testCases: [
    { label: 'Middle', args: [[1,2,3,4,5],4,3], expected: [1,2,3,4] },
    { label: 'Left of range', args: [[1,2,3,4,5],4,-1], expected: [1,2,3,4] },
    { label: 'Right of range', args: [[1,2,3,4,5],4,100], expected: [2,3,4,5] },
  ],
}
