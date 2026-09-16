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
  starterCode: `class Solution:
    def combination_sum(self, candidates, target):
        pass`,
  functionName: 'combination_sum_run',
  conceptId: 'backtracking',
  runnerSetup: `def combination_sum_run(candidates, target):
  result = Solution().combination_sum(candidates, target)
  return sorted([sorted(c) for c in result])`,
  testCases: [
    { label: 'target=7', args: [[2,3,6,7], 7], expected: [[2,2,3],[7]] },
    { label: 'target=6', args: [[2,3,4], 6], expected: [[2,2,2],[2,4],[3,3]] },
  ],
  bruteHint: 'One brute-force approach generates every possible multiset of the candidates, trying every combination of repeated picks, and filters for the ones that sum exactly to target. Because numbers can repeat and target can be up to 40, this branches into roughly O(2ⁿ) paths in the worst case, most of which are wasted once a partial sum already exceeds target. What could let you stop extending a path the moment it can no longer reach target?',
  optimizeComplexity: { time: 'O(2ⁿ)', space: 'O(target / min(candidates))' },
  clues: [
    {
      id: 'unlimited-reuse',
      question: 'Noticing when a description lifts a restriction you would normally expect is what tells you the standard recursive pattern needs to change. "The same number may be chosen an unlimited number of times." How does this change the recursive call?',
      highlight: { location: 'description', text: 'The same number may be chosen from <code>candidates</code> an unlimited number of times.' },
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
      question: 'A guarantee buried in the input description can eliminate an entire category of edge-case handling you would otherwise need to write. "An array of distinct integers." How does this simplify the problem compared to a version with duplicates?',
      highlight: { location: 'description', text: 'an array of distinct integers' },
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
      question: 'What the return type asks for — a single value, a count, or every valid result — determines whether you can stop early or must explore exhaustively. The output is all unique combinations — not a count, not an existence check. What does that require from your approach?',
      highlight: { location: 'description', text: 'return a list of all unique combinations of <code>candidates</code> where the chosen numbers sum to <code>target</code>' },
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
      question: 'Knowing the sign and range of the values you are summing tells you whether a running total can ever recover once it overshoots. candidates[i] ≥ 2 and target ≤ 40. Once the running sum exceeds the target, what should you do?',
      highlight: { location: 'constraint', text: '2 <= candidates[i] <= 40' },
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
  solutionCode: `class Solution:
    def combination_sum(self, candidates, target):
        candidates.sort()
        result = []
        path = []

        def backtrack(start, remaining):
            if remaining == 0:
                result.append(path[:])
                return
            for i in range(start, len(candidates)):
                if candidates[i] > remaining:
                    break
                path.append(candidates[i])
                backtrack(i, remaining - candidates[i])
                path.pop()

        backtrack(0, target)
        return result`,
  solutionComplexity: { time: 'O(2ⁿ)', space: 'O(target / min(candidates))' },
  solutionCaveat: 'The recursive call passes <code>i</code>, not <code>i + 1</code> — staying at the same index deliberately keeps the just-picked candidate eligible for reuse, which is exactly what "unlimited number of times" requires; only once the loop moves past index <code>i</code> does that candidate become permanently unavailable to the current path.',
  solutionExplanation: 'Sorting up front enables an early <code>break</code> the moment a candidate exceeds the remaining target, since every later (larger) candidate would only make the running sum overshoot further — this prunes away large parts of the search tree that could never produce a valid combination. Since candidates are distinct, no explicit same-level duplicate-skipping is needed the way Combination Sum II requires; every path that reaches <code>remaining == 0</code> is recorded, giving every valid combination without exhaustively regenerating permutations of the same multiset.',
}
