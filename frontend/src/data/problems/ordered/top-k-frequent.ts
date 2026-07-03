export default {
  id: 'top-k-frequent',
  title: 'Top K Frequent Elements',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code> most frequent elements in any order.',
  examples: [
    { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
    { input: 'nums = [1], k = 1', output: '[1]' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 10⁵',
    '1 ≤ k ≤ number of unique elements',
    'Guaranteed the answer is unique',
  ],
  starterCode: `import heapq

def top_k_frequent(nums, k):
  # Hint: count frequencies, then use a heap to find top k
  pass`,
  functionName: 'top_k_frequent',
  conceptId: 'top-k',
  runnerSetup: `
_orig_top_k = top_k_frequent
def top_k_frequent(nums, k):
  return sorted(_orig_top_k(nums, k))
`,
  testCases: [
    { label: 'Basic', args: [[1,1,1,2,2,3], 2], expected: [1,2] },
    { label: 'Single', args: [[1], 1], expected: [1] },
    { label: 'All same freq', args: [[1,2], 2], expected: [1,2] },
    { label: 'k=3', args: [[4,1,1,2,2,3,3,4,4,4], 3], expected: [1,3,4] },
  ],
}
