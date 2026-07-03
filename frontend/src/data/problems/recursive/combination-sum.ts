export default {
  id: 'combination-sum',
  title: 'Combination Sum',
  difficulty: 'medium',
  description: `<p>Given an array of distinct integers <code>candidates</code> and a target integer <code>target</code>, return a list of all unique combinations of <code>candidates</code> where the chosen numbers sum to <code>target</code>. You may return the combinations in any order. The same number may be chosen from <code>candidates</code> an unlimited number of times.</p>`,
  examples: [
    { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' },
    { input: 'candidates = [2,3,4], target = 6', output: '[[2,2,2],[2,4],[3,3]]' },
  ],
  constraints: ['1 <= candidates.length <= 30', '2 <= candidates[i] <= 40', '1 <= target <= 40'],
  starterCode: `def combination_sum(candidates, target):
  pass`,
  functionName: 'combination_sum_run',
  conceptId: 'backtracking',
  runnerSetup: `def combination_sum_run(candidates, target):
  result = combination_sum(candidates, target)
  return sorted([sorted(c) for c in result])`,
  testCases: [
    { label: 'target=7', args: [[2,3,6,7], 7], expected: [[2,2,3],[7]] },
    { label: 'target=6', args: [[2,3,4], 6], expected: [[2,2,2],[2,4],[3,3]] },
  ],
}
