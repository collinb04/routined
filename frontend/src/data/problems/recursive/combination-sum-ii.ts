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
  starterCode: `class Solution:
    def combination_sum2(self, candidates, target):
        pass`,
  functionName: 'combination_sum2_run',
  conceptId: 'backtracking',
  runnerSetup: `def combination_sum2_run(candidates, target):
  result = Solution().combination_sum2(candidates, target)
  return sorted([sorted(c) for c in result])`,
  testCases: [
    { label: 'target=8', args: [[10,1,2,7,6,1,5], 8], expected: [[1,1,6],[1,2,5],[1,7],[2,6]] },
    { label: 'target=5', args: [[2,5,2,1,2], 5], expected: [[1,2,2],[5]] },
  ],
  bruteHint: 'The brute-force approach generates every possible subset of the candidates array — there are 2ⁿ of them — sums each one, and keeps only the subsets that equal target, discarding duplicate combinations afterward. With n up to 100, that is an enormous number of subsets to generate and sum, most of which do not even come close to target. What does this approach fail to take advantage of about the array once it is sorted?',
  optimizeComplexity: { time: 'O(2ⁿ)', space: 'O(n)' },
  clues: [
    {
      id: 'duplicate-input-signal',
      question: 'The input "may contain duplicates." Compared to Combination Sum I (distinct candidates), what new problem does this introduce?',
      options: [
        { label: 'You need a hash map to count occurrences', isCorrect: false, feedback: 'Counting occurrences is one approach, but sorting and skipping duplicates during backtracking is simpler and avoids extra space. The core problem is avoiding duplicate combinations in the output, not counting candidates.' },
        { label: 'The same combination can be produced multiple ways, creating duplicates in the output', isCorrect: true },
        { label: 'Each candidate can now be reused multiple times', isCorrect: false, feedback: 'The opposite is true — this variant restricts each candidate to at most one use. Duplicates in the input are different occurrences of the same value, not permission to reuse.' },
        { label: 'Backtracking is no longer valid with duplicate inputs', isCorrect: false, feedback: 'Backtracking is still the right approach. The change is that you must add a skip condition to avoid generating the same combination from different positions of the same value.' },
      ],
      correctFeedback: 'With two 1s in [10,1,2,7,6,1,5], choosing the first 1 and choosing the second 1 at the same level of recursion both start the same combination. You must skip duplicate values at the same recursion depth.',
      wrongFeedback: [
        'With two 1s in the input, how many ways can you pick "one 1" as your first element? Should both ways appear in the output?',
        'Sort the array. At each recursion level, if a candidate equals the previous candidate at the same level, skip it — that prevents starting two identical branches.',
      ],
    },
    {
      id: 'each-used-once',
      question: '"Each number in candidates may only be used once." How does this change the recursive call compared to Combination Sum I?',
      options: [
        { label: 'Pass the same start index to allow reuse', isCorrect: false, feedback: 'Passing the same start index is what Combination Sum I does — it allows the current element to be picked again. Here, each element can only be used once, so you must advance past it.' },
        { label: 'Advance the start index by 1 to skip the used element', isCorrect: true },
        { label: 'Remove the used element from the candidates list', isCorrect: false, feedback: 'Removing from a list during recursion is expensive (O(n) per call) and complicates backtracking. Simply advancing the start index achieves the same effect without mutation.' },
        { label: 'Track used indices in a boolean array', isCorrect: false, feedback: 'A boolean visited array works but adds O(n) space and complexity. Advancing the start index is sufficient — once you move past an index, you never pick it again in the same branch.' },
      ],
      correctFeedback: 'In the recursive call, pass start + 1 instead of start. That means the current element is consumed and cannot be picked again in the same combination, while later elements remain available.',
      wrongFeedback: [
        'In Combination Sum I, the recursive call passes the current index to allow reuse. What index do you pass here to prevent reuse?',
        'Advancing from index i to i+1 in the recursive call means element i is used exactly once per path from root to leaf in the recursion tree.',
      ],
    },
    {
      id: 'sorting-enables-pruning',
      question: 'candidates[i] can be up to 50 and target up to 30. Sorting before backtracking enables an important optimization. What is it?',
      options: [
        { label: 'Sorting ensures the output combinations are in sorted order', isCorrect: false, feedback: 'Sorted output is a side effect of sorting the input, but it is not the optimization that matters for performance. The key benefit is early termination.' },
        { label: 'If the current candidate exceeds the remaining target, all subsequent candidates also exceed it', isCorrect: true },
        { label: 'Sorting lets you binary-search for the exact complement', isCorrect: false, feedback: 'Binary search would find one complement in O(log n), but combinations have variable length. Sorting here is used for pruning the recursion tree, not for lookup.' },
        { label: 'Sorting eliminates duplicates from the input before backtracking', isCorrect: false, feedback: 'Sorting groups duplicates together, making them easy to skip, but it does not remove them. You still need explicit skip logic during backtracking.' },
      ],
      correctFeedback: 'After sorting, once candidates[i] > remaining target, you can break out of the loop — no subsequent candidate can contribute to a valid combination. This prunes entire subtrees of the recursion.',
      wrongFeedback: [
        'If the sorted candidates are [1,1,2,5,6,7,10] and your remaining target is 3, at which element can you stop trying?',
        'After sorting, candidates[i] > remaining means every element from i onward is also > remaining. You can break immediately instead of continuing the loop.',
      ],
    },
    {
      id: 'output-uniqueness',
      question: 'The output requires "unique combinations." In [2,5,2,1,2] with target=5, the answer is [[1,2,2],[5]] — not [[1,2,2],[1,2,2],[5]]. What single condition prevents the duplicate?',
      options: [
        { label: 'Use a set to deduplicate the final result', isCorrect: false, feedback: 'Deduplicating after the fact works but wastes time generating duplicates and then discarding them. The right approach prevents duplicate combinations from ever being generated.' },
        { label: 'Skip a candidate at the same recursion level if it equals the previous candidate', isCorrect: true },
        { label: 'Only pick each value once across the entire recursion', isCorrect: false, feedback: 'This would prevent [1,2,2] — a valid combination that uses the value 2 twice. The restriction is on picking the same value at the same recursion level (same position), not across all positions.' },
        { label: 'Sort the output and remove adjacent duplicates', isCorrect: false, feedback: 'Post-processing is wasteful. A well-placed skip in the backtracking loop — if i > start and candidates[i] == candidates[i-1], continue — prevents duplicate combinations at the source.' },
      ],
      correctFeedback: 'After sorting, check: if i > start and candidates[i] == candidates[i-1], skip this iteration. This prevents starting two branches at the same level with the same value, which would produce identical combinations.',
      wrongFeedback: [
        'Sort [2,5,2,1,2] → [1,2,2,2,5]. At the top level of recursion, you encounter 2 at index 1. Later you encounter another 2 at index 2. If you pick both as starting elements, what combinations do they generate?',
        'The skip condition is: if index i > start (we\'re not at the first pick of this level) AND candidates[i] == candidates[i-1], skip. Why is the i > start check necessary?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def combination_sum2(self, candidates, target):
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
                if i > start and candidates[i] == candidates[i - 1]:
                    continue
                path.append(candidates[i])
                backtrack(i + 1, remaining - candidates[i])
                path.pop()

        backtrack(0, target)
        return result`,
  solutionComplexity: { time: 'O(2ⁿ)', space: 'O(n)' },
  solutionCaveat: 'The duplicate-skip check requires <code>i &gt; start</code>, not just <code>candidates[i] == candidates[i-1]</code> — the <code>first</code> occurrence of a repeated value at the current recursion level must still be tried, since skipping it entirely would eliminate valid combinations like <code>[1,2,2]</code> that legitimately use a repeated value more than once across different levels.',
  solutionExplanation: 'Sorting first makes two things possible at once: candidates equal to the previous one at the same recursion level can be skipped to avoid generating the same combination twice, and once a candidate exceeds the remaining target, every later candidate does too (since they only get bigger), letting the loop break early instead of trying them all. Advancing to <code>i + 1</code> rather than <code>i</code> in the recursive call is what enforces "each number used once" — the same index is never eligible again within one combination.',
}
