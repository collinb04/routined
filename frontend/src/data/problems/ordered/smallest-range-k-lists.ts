export default {
  id: 'smallest-range-k-lists',
  title: 'Smallest Range Covering Elements from K Lists',
  difficulty: 'hard',
  description: 'Given k sorted lists of integers, find the smallest range [a,b] such that each list has at least one element in [a,b].',
  examples: [
    { input: 'nums=[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]', output: '[20,24]', explanation: 'Range [20,24] includes 24 from list 1, 20 from list 2, 22 from list 3.' },
  ],
  constraints: ['nums.length == k', '1 ≤ k ≤ 3500', '1 ≤ nums[i].length ≤ 50', 'All lists are sorted'],
  starterCode: `def smallest_range(nums):
  pass`,
  functionName: 'smallest_range',
  conceptId: 'heap',
  testCases: [
    { label: 'Standard', args: [[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]], expected: [20,24] },
    { label: 'Two lists', args: [[[1,2,3],[1,2,3]]], expected: [1,1] },
  ],
}
