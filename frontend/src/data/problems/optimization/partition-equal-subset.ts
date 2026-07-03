export default {
  id: 'partition-equal-subset',
  title: 'Partition Equal Subset Sum',
  difficulty: 'medium',
  description: 'Given a non-empty array <code>nums</code> of positive integers, determine if it can be partitioned into two subsets with equal sums.',
  examples: [
    { input: 'nums = [1,5,11,5]', output: 'true', explanation: '[1,5,5] and [11] both sum to 11.' },
    { input: 'nums = [1,2,3,5]', output: 'false', explanation: 'Cannot be partitioned into equal sums.' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 200',
    '1 ≤ nums[i] ≤ 100',
  ],
  starterCode: `def can_partition(nums):
  # Hint: target = sum(nums)//2; if odd total, return False
  # dp[j] = True if subset summing to j is reachable
  pass`,
  functionName: 'can_partition',
  conceptId: 'dp-knapsack',
  testCases: [
    { label: 'Can partition', args: [[1,5,11,5]], expected: true },
    { label: 'Cannot', args: [[1,2,3,5]], expected: false },
    { label: 'Two equal', args: [[3,3]], expected: true },
    { label: 'Odd sum', args: [[1,2]], expected: false },
    { label: 'Larger', args: [[1,2,5,5,11]], expected: true },
  ],
}
