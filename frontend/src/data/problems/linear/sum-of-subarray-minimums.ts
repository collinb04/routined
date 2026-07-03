export default {
  id: 'sum-of-subarray-minimums',
  title: 'Sum of Subarray Minimums',
  difficulty: 'medium',
  description: 'Given an array of integers, find the sum of minimums of all subarrays. Return the result modulo 10⁹ + 7.',
  examples: [
    { input: 'arr = [3,1,2,4]', output: '17', explanation: 'Subarrays: [3]=3,[1]=1,[2]=2,[4]=4,[3,1]=1,[1,2]=1,[2,4]=2,[3,1,2]=1,[1,2,4]=1,[3,1,2,4]=1. Sum = 17.' },
  ],
  constraints: ['1 ≤ arr.length ≤ 3 × 10⁴', '1 ≤ arr[i] ≤ 3 × 10⁴'],
  starterCode: `def sum_subarray_mins(arr):
  pass`,
  functionName: 'sum_subarray_mins',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'Standard', args: [[3,1,2,4]], expected: 17 },
    { label: 'Decreasing', args: [[3,2,1]], expected: 10 },
    { label: 'Single', args: [[1]], expected: 1 },
    { label: 'All same', args: [[2,2,2]], expected: 12 },
  ],
}
