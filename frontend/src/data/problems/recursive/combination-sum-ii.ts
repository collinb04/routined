export default {
  id: 'combination-sum-ii',
  title: 'Combination Sum II',
  difficulty: 'medium',
  description: `<p>Given a collection of candidate numbers (may contain duplicates) and a target number, find all unique combinations where the candidate numbers sum to target. Each number in candidates may only be used once in the combination.</p>`,
  examples: [
    { input: 'candidates = [10,1,2,7,6,1,5], target = 8', output: '[[1,1,6],[1,2,5],[1,7],[2,6]]' },
    { input: 'candidates = [2,5,2,1,2], target = 5', output: '[[1,2,2],[5]]' },
  ],
  constraints: ['1 <= candidates.length <= 100', '1 <= candidates[i] <= 50', '1 <= target <= 30'],
  starterCode: `def combination_sum2(candidates, target):
  pass`,
  functionName: 'combination_sum2_run',
  conceptId: 'backtracking',
  runnerSetup: `def combination_sum2_run(candidates, target):
  result = combination_sum2(candidates, target)
  return sorted([sorted(c) for c in result])`,
  testCases: [
    { label: 'target=8', args: [[10,1,2,7,6,1,5], 8], expected: [[1,1,6],[1,2,5],[1,7],[2,6]] },
    { label: 'target=5', args: [[2,5,2,1,2], 5], expected: [[1,2,2],[5]] },
  ],
}
