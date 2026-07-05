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
  clues: [
    {
      id: 'unlimited-reuse',
      question: '"The same number may be chosen an unlimited number of times." How does this change the recursive call?',
      options: [
        { label: 'Advance the start index by 1 after picking a number', isCorrect: false, feedback: 'Advancing by 1 prevents reuse — that is the behavior of Combination Sum II. Here, you must pass the same index to the recursive call so the current candidate can be picked again.' },
        { label: 'Pass the same start index so the current candidate stays available', isCorrect: true },
        { label: 'Remove the picked number from candidates before recursing', isCorrect: false, feedback: 'Removing from the list discards the candidate permanently. You need it available for future picks in the same path. Keep the list unchanged and just pass the same start index.' },
        { label: 'Recurse over all candidates from index 0 each time', isCorrect: false, feedback: 'Starting from 0 every time allows combinations like [2,3] and [3,2] — both valid subsets but treated as different, producing duplicates. You must still advance forward to avoid those.' },
      ],
      correctFeedback: 'In the recursive call, pass the current index (not index + 1). That lets you pick the same element again on the next level, generating combinations like [2,2,3] from candidate 2.',
      wrongFeedback: [
        'To include [2,2,3] from candidates [2,3,6,7], you need to pick 2 twice in a row. What does the recursive call\'s start index need to be after the first pick of 2?',
        'Passing start (same index) means "I can pick this element again." Passing start+1 means "I must move on." Which behavior does this problem require?',
      ],
    },
    {
      id: 'distinct-candidates-guarantee',
      question: '"An array of distinct integers." How does this simplify the problem compared to a version with duplicates?',
      options: [
        { label: 'No duplicate combinations can be generated from distinct candidates', isCorrect: false, feedback: 'Distinct candidates do not prevent duplicate combinations on their own. Starting from index 0 each time would still produce [2,3] and [3,2] as separate paths. You still need a start index to avoid those.' },
        { label: 'No need to skip duplicate values at the same recursion level', isCorrect: true },
        { label: 'Each candidate can appear at most once in any combination', isCorrect: false, feedback: 'Distinctness of the candidates does not limit how many times each can appear in a combination — the problem explicitly allows unlimited reuse. Distinctness just means no two candidates share the same value.' },
        { label: 'You can skip sorting the candidates', isCorrect: false, feedback: 'Sorting is still useful for pruning: once a candidate exceeds the remaining target, all subsequent candidates will too. Distinctness does not eliminate the value of sorting.' },
      ],
      correctFeedback: 'With distinct candidates, you never encounter two different positions holding the same value at the same recursion level. The skip condition from Combination Sum II is unnecessary here.',
      wrongFeedback: [
        'In Combination Sum II, you skip candidates[i] if it equals candidates[i-1] at the same level. Can that situation arise when all candidates are distinct?',
        'Distinct means each value appears exactly once in the input. If no two positions share a value, picking position i vs position i+1 always produces different starting elements.',
      ],
    },
    {
      id: 'output-all-combinations',
      question: 'The output is all unique combinations — not a count, not an existence check. What does that require from your approach?',
      options: [
        { label: 'Return true as soon as you find one valid combination', isCorrect: false, feedback: 'Returning on the first find is appropriate for existence problems. Here you must collect every valid combination — early exit would miss results.' },
        { label: 'Enumerate all valid paths via backtracking, collecting each valid leaf', isCorrect: true },
        { label: 'Use a greedy approach to build the largest combination first', isCorrect: false, feedback: 'Greedy constructs one solution, not all solutions. To enumerate every valid combination you need exhaustive search with backtracking.' },
        { label: 'Use BFS to explore all combinations level by level', isCorrect: false, feedback: 'BFS explores by length of path, not by sum. With unlimited reuse, combination lengths are unbounded until the sum reaches target — the state space is better handled by DFS with pruning.' },
      ],
      correctFeedback: 'Backtracking DFS explores every candidate at each position, adds a combination to the result when the sum hits target, and prunes branches where the sum exceeds target. That is the standard exhaustive-enumeration pattern.',
      wrongFeedback: [
        'How many valid combinations are there for candidates=[2,3,6,7], target=7? Can a non-exhaustive approach find all of them?',
        'Backtracking explores every possible combination by making a choice, recursing, then undoing the choice. Every leaf where sum == target is a valid result to collect.',
      ],
    },
    {
      id: 'pruning-on-sum',
      question: 'candidates[i] ≥ 2 and target ≤ 40. Once the running sum exceeds the target, what should you do?',
      options: [
        { label: 'Continue — a later subtraction might bring the sum back down', isCorrect: false, feedback: 'All candidates are positive (≥ 2). Adding more can only increase the sum. Once you exceed target, no further picks can bring the sum back to target.' },
        { label: 'Prune the branch — all candidates are positive so the sum only grows', isCorrect: true },
        { label: 'Switch to a different candidate and keep the same sum', isCorrect: false, feedback: 'At this point in the recursion you have already committed to the current path\'s sum. You must backtrack, not switch mid-recursion.' },
        { label: 'Return the current combination as a partial answer', isCorrect: false, feedback: 'A partial combination with sum > target is not a valid answer. The only valid result is a combination with sum exactly equal to target.' },
      ],
      correctFeedback: 'Since candidates[i] ≥ 2, every additional pick increases the sum. If current sum > target, break out of the loop — this and all remaining candidates will only make it worse.',
      wrongFeedback: [
        'If the current sum is 8 and target is 7, can any combination of positive numbers (≥ 2) added to this path ever sum to exactly 7?',
        'Sorting candidates before backtracking lets you break early: once candidates[i] > remaining target, all subsequent (larger) candidates also exceed it.',
      ],
    },
  ],
}
