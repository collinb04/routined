export default {
  id: 'burst-balloons',
  title: 'Burst Balloons',
  difficulty: 'hard',
  description: 'Given n balloons with values, bursting balloon <code>i</code> earns <code>nums[left] * nums[i] * nums[right]</code> coins. Return the maximum coins you can collect by bursting all balloons.',
  examples: [
    { input: 'nums = [3,1,5,8]', output: '167', explanation: 'Burst 1: 3*1*5=15. Burst 5: 3*5*8=120. Burst 3: 1*3*8=24. Burst 8: 1*8*1=8. Total = 167.' },
  ],
  constraints: ['n == nums.length', '1 ≤ n ≤ 300', '0 ≤ nums[i] ≤ 100'],
  starterCode: `def max_coins(nums):
  pass`,
  functionName: 'max_coins',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'Classic', args: [[3,1,5,8]], expected: 167 },
    { label: 'Single', args: [[1]], expected: 1 },
    { label: 'Two', args: [[1,5]], expected: 10 },
  ],
}
