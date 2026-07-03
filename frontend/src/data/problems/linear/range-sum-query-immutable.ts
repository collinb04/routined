export default {
  id: 'range-sum-query-immutable',
  title: 'Range Sum Query - Immutable',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code>, handle multiple queries of the form: return the sum of elements between indices <code>left</code> and <code>right</code> (inclusive). Precompute prefix sums to answer each query in O(1).',
  examples: [
    { input: 'nums=[−2,0,3,−5,2,−1], sumRange(0,2), sumRange(2,5), sumRange(0,5)', output: '1, −1, −3', explanation: 'Prefix sums allow O(1) range queries.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁵ ≤ nums[i] ≤ 10⁵', 'At most 10⁴ calls to sumRange'],
  starterCode: `def range_sum_query(nums, queries):
  prefix = [0] * (len(nums) + 1)
  for i, v in enumerate(nums):
      prefix[i+1] = prefix[i] + v
  return [prefix[r+1] - prefix[l] for l, r in queries]`,
  functionName: 'range_sum_query',
  conceptId: 'prefix-sum',
  testCases: [
    { label: 'Multiple queries', args: [[-2,0,3,-5,2,-1],[[0,2],[2,5],[0,5]]], expected: [1,-1,-3] },
    { label: 'Single query', args: [[1,2,3,4],[[1,3]]], expected: [9] },
  ],
}
