export default {
  id: 'max-consecutive-ones-iii',
  title: 'Max Consecutive Ones III',
  difficulty: 'medium',
  description: 'Given a binary array <code>nums</code> and an integer <code>k</code>, return the maximum number of consecutive 1s in the array if you can flip at most <code>k</code> zeros.',
  examples: [
    { input: 'nums=[1,1,1,0,0,0,1,1,1,1,0], k=2', output: '6', explanation: 'Flip two zeros at indices 9 and 10: [1,1,1,0,0,1,1,1,1,1,1] → max run of 6.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', 'nums[i] is 0 or 1', '0 ≤ k ≤ nums.length'],
  starterCode: `def longest_ones(nums, k):
  pass`,
  functionName: 'longest_ones',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'k=2', args: [[1,1,1,0,0,0,1,1,1,1,0],2], expected: 6 },
    { label: 'k=0', args: [[0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1],0], expected: 3 },
    { label: 'All ones', args: [[1,1,1],2], expected: 3 },
    { label: 'k=1', args: [[0,0,0],1], expected: 1 },
  ],
}
