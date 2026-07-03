export default {
  id: 'subsets',
  title: 'Subsets',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.',
  examples: [
    { input: 'nums = [1,2,3]', output: '[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]' },
    { input: 'nums = [0]', output: '[[],[0]]' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 10',
    '-10 ≤ nums[i] ≤ 10',
    'All elements of nums are unique',
  ],
  starterCode: `def subsets(nums):
  result = []
  # Hint: backtrack — at each index, choose to include or skip
  def backtrack(start, current):
      pass
  backtrack(0, [])
  return result`,
  functionName: 'subsets',
  conceptId: 'backtracking',
  runnerSetup: `
_orig_subsets = subsets
def subsets(nums):
  result = _orig_subsets(nums)
  return sorted([sorted(s) for s in result])
`,
  testCases: [
    { label: 'Three elements', args: [[1,2,3]], expected: [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]] },
    { label: 'Single element', args: [[0]], expected: [[],[0]] },
    { label: 'Two elements', args: [[1,2]], expected: [[],[1],[1,2],[2]] },
  ],
}
