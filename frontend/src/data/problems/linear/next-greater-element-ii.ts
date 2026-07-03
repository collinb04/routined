export default {
  id: 'next-greater-element-ii',
  title: 'Next Greater Element II',
  difficulty: 'medium',
  description: 'Given a circular array <code>nums</code>, return the next greater number for every element. The next greater number of <code>nums[i]</code> is the first greater number reached when traversing to the right (wrapping around). Return -1 if none.',
  examples: [
    { input: 'nums = [1,2,1]', output: '[2,-1,2]', explanation: 'For nums[2]=1, traverse right: wraps to 2, which is greater.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹'],
  starterCode: `def next_greater_elements(nums):
  pass`,
  functionName: 'next_greater_elements',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'Circular', args: [[1,2,1]], expected: [2,-1,2] },
    { label: 'Descending', args: [[3,2,1]], expected: [-1,3,3] },
    { label: 'All same', args: [[1,1,1]], expected: [-1,-1,-1] },
    { label: 'Ascending', args: [[1,2,3]], expected: [2,3,-1] },
  ],
}
