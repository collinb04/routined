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
  starterCode: `class Solution:
    def subsets(self, nums):
        result = []
        # Hint: backtrack — at each index, choose to include or skip
        def backtrack(start, current):
            pass
        backtrack(0, [])
        return result`,
  functionName: 'subsets',
  conceptId: 'backtracking',
  runnerSetup: `
_orig_subsets = Solution().subsets
def subsets(nums):
  result = _orig_subsets(nums)
  return sorted([sorted(s) for s in result])
`,
  testCases: [
    { label: 'Three elements', args: [[1,2,3]], expected: [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]] },
    { label: 'Single element', args: [[0]], expected: [[],[0]] },
    { label: 'Two elements', args: [[1,2]], expected: [[],[1],[1,2],[2]] },
  ],
  bruteHint: 'A brute-force approach iterates over every bitmask from 0 to 2^n - 1, using each bit of the mask to decide whether the corresponding element belongs in that subset. Building all 2^n subsets this way takes O(2^n · n) time, since decoding each mask into a subset costs O(n). That works fine within these constraints, but could you build the same subsets incrementally instead of decoding a fresh mask every time?',
  optimizeComplexity: { time: 'O(2ⁿ)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-output-size',
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 10' },
      question: 'Constraint bounds tell you what output size — and therefore what time complexity — the problem expects you to handle. nums.length ≤ 10 and all elements are unique. How many subsets can you expect in the worst case?',
      options: [
        { label: 'n² = 100', isCorrect: false, feedback: 'n² counts pairs, not subsets. Every element independently is either in a subset or not — that is 2 choices per element, giving 2^n subsets total.' },
        { label: '2^n = 1024', isCorrect: true },
        { label: 'n! = 3,628,800', isCorrect: false, feedback: 'n! counts permutations (orderings), not subsets. Subsets do not care about order within the subset — each element is simply included or excluded.' },
        { label: 'n = 10', isCorrect: false, feedback: 'n is the input size, not the output size. For n = 3, the answer alone has 8 entries — far more than n. Subsets grow exponentially.' },
      ],
      correctFeedback: 'Each element is either in a subset or not: 2^10 = 1024 subsets at most. This is manageable and signals that full backtracking enumeration is the expected approach.',
      wrongFeedback: [
        'For each element, you make a binary choice: include it or skip it. What does that give you for n elements?',
        'Two choices per element, n elements independently — that is 2 × 2 × … × 2, n times.',
      ],
    },
    {
      id: 'unique-elements-guarantee',
      highlight: { location: 'constraint', text: 'All elements of nums are unique' },
      question: 'Guarantees baked into the constraints can eliminate entire categories of edge-case handling before you write a line of code. "All elements of nums are unique." What does this remove from your implementation concerns?',
      options: [
        { label: 'You can skip sorting', isCorrect: false, feedback: 'Sorting may still be useful for producing a consistent traversal order, but uniqueness removes the need for duplicate-skipping logic — those are separate concerns.' },
        { label: 'No duplicate-subset pruning needed', isCorrect: true },
        { label: 'You can use O(1) space', isCorrect: false, feedback: 'Uniqueness does not affect space complexity. You still need to store all 2^n subsets and maintain the current path during backtracking.' },
        { label: 'The recursion depth is bounded by 1', isCorrect: false, feedback: 'Uniqueness has no effect on recursion depth. You can still recurse up to n levels deep as you build subsets of increasing length.' },
      ],
      correctFeedback: 'With unique elements, every distinct combination of elements produces a distinct subset. You never need to check whether you are about to generate a duplicate — just recurse freely.',
      wrongFeedback: [
        'What problem would arise with duplicate input values that this guarantee removes?',
        'In Subsets II, duplicates require a skip condition. What does uniqueness let you drop?',
      ],
    },
    {
      id: 'output-all-subsets',
      highlight: { location: 'description', text: 'return all possible subsets (the power set)' },
      question: 'The description\'s precise definition of what counts as valid output tells you exactly when in your recursion a result becomes complete. The output must include ALL possible subsets, including the empty set. What does this imply about when to record a result?',
      options: [
        { label: 'Only record subsets at leaf nodes', isCorrect: false, feedback: 'Leaf nodes represent only the maximal subsets. The empty set and all intermediate-length subsets must also be captured — recording only at leaves misses them.' },
        { label: 'Record the current subset at every recursion call', isCorrect: true },
        { label: 'Record only when the current subset has length > 0', isCorrect: false, feedback: 'The empty set is explicitly required in the output. Skipping length-0 subsets violates the problem statement.' },
        { label: 'Record only when you have processed all elements', isCorrect: false, feedback: 'Processing all elements captures only one subset per path. Shorter subsets — built by stopping early — are equally valid and must be included.' },
      ],
      correctFeedback: 'Every state in the backtracking tree is a valid subset. You record the current path immediately on entry — before choosing to include or skip the next element.',
      wrongFeedback: [
        'The empty set is a valid subset. So is [1], [1,2], and [1,2,3]. When during the recursion are all of these reachable?',
        'Each recursive call represents one valid subset. At what point in each call should you add the current path to results?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def subsets(self, nums):
        result = []
        def backtrack(start, current):
            result.append(current[:])
            for i in range(start, len(nums)):
                current.append(nums[i])
                backtrack(i + 1, current)
                current.pop()
        backtrack(0, [])
        return result`,
  solutionComplexity: { time: 'O(n × 2ⁿ)', space: 'O(n) recursion depth (output aside)' },
  solutionCaveat: 'Every recursive call records a snapshot with <code>current[:]</code>. Appending <code>current</code> itself instead would append a *reference* to the same list object that keeps getting mutated — every entry in the result would end up pointing at whatever <code>current</code> looked like at the very end (usually empty).',
  solutionExplanation: 'Each subset is a set of yes/no decisions — include <code>nums[i]</code> or don\'t. The recursion makes that decision explicit: at every call, <code>current</code> is itself a valid subset (that\'s why it\'s recorded immediately, not just at the leaves), and the loop tries including each remaining element one at a time. <code>backtrack(i + 1, ...)</code> — not <code>i</code> — is what stops the same element from being reconsidered, which is also what keeps every subset unique instead of generating permutations. Popping after the recursive call undoes the choice so the next iteration of the loop starts from a clean slate.',
}
