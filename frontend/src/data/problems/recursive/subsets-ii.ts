export default {
  id: 'subsets-ii',
  title: 'Subsets II',
  difficulty: 'medium',
  description: `<p>Given an integer array <code>nums</code> that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.</p>`,
  examples: [
    { input: 'nums = [1,2,2]', output: '[[],[1],[1,2],[1,2,2],[2],[2,2]]' },
    { input: 'nums = [0]', output: '[[],[0]]' },
  ],
  constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10'],
  starterCode: `def subsets_with_dup(nums):
  pass`,
  functionName: 'subsets_with_dup_run',
  conceptId: 'backtracking',
  runnerSetup: `def subsets_with_dup_run(nums):
  result = subsets_with_dup(nums)
  return sorted([sorted(s) for s in result])`,
  testCases: [
    { label: '[1,2,2]', args: [[1,2,2]], expected: [[],[1],[1,2],[1,2,2],[2],[2,2]] },
    { label: '[0]', args: [[0]], expected: [[],[0]] },
  ],
  bruteHint: 'Describe generating every subset via bitmasking over all 2^n combinations and then filtering out duplicate subsets afterward',
  optimizeHint: 'Name the backtracking approach that builds subsets incrementally and prunes duplicate branches after sorting the input, to avoid generating the same subset twice',
  clues: [
    {
      id: 'constraint-size',
      question: 'nums.length ≤ 10. The power set of 10 elements has 2^10 = 1024 subsets. What does this tell you?',
      options: [
        { label: 'You need a greedy approach to prune', isCorrect: false, feedback: 'Greedy is for optimization problems — here you must enumerate every valid subset. At n = 10, 1024 outputs is tiny; no greedy pruning is needed.' },
        { label: 'Exponential time is acceptable here', isCorrect: true },
        { label: 'Sort and binary search to avoid duplicates', isCorrect: false, feedback: 'Binary search finds elements, it does not enumerate subsets. At n = 10 the full backtracking traversal fits easily — there is no need to replace it.' },
        { label: 'O(n²) is the target complexity', isCorrect: false, feedback: 'O(n²) = 100 operations for n = 10, which would only produce 100 subsets — far too few. The output alone is O(2^n) in size, so the algorithm must be at least that.' },
      ],
      correctFeedback: 'With n ≤ 10, generating all 2^10 = 1024 subsets is trivially fast. The constraint is a green light for full backtracking enumeration.',
      wrongFeedback: [
        'How many subsets can n = 10 elements produce? Is that number large enough to worry about?',
        'The output itself has up to 2^n entries. What class of time complexity does that imply for the algorithm?',
      ],
    },
    {
      id: 'duplicates-in-input',
      question: '"nums may contain duplicates." What does this signal about your approach vs plain Subsets?',
      options: [
        { label: 'Use a set to store results and deduplicate at the end', isCorrect: false, feedback: 'Storing results in a set works but is wasteful — you generate duplicates and then discard them. Pruning during backtracking avoids generating duplicates in the first place.' },
        { label: 'Sort first, then skip duplicate elements at the same recursion level', isCorrect: true },
        { label: 'Track seen values with a hash map during backtracking', isCorrect: false, feedback: 'A hash map tracks seen values globally, not at the same recursion level — it would incorrectly prune valid subsets that reuse a value from a different branch.' },
        { label: 'Generate all subsets then filter out duplicates', isCorrect: false, feedback: 'Filter-after-generate is correct but inefficient. Sorting and skipping duplicates during backtracking avoids ever building the duplicates you would then have to throw away.' },
      ],
      correctFeedback: 'Sorting groups duplicate values together. During backtracking, if the current element equals the previous one at the same recursion level, you skip it — this prevents generating the same subset twice.',
      wrongFeedback: [
        'Duplicates in the input cause duplicate subsets if you are not careful. What preprocessing step lets you detect when you are about to generate a subset you have already seen?',
        'After sorting, duplicate values are adjacent. At a given recursion depth, if you see the same value twice in a row, what should you do?',
      ],
    },
    {
      id: 'output-no-duplicate-subsets',
      question: '"The solution set must not contain duplicate subsets." What structural guarantee does sorting the input provide?',
      options: [
        { label: 'Subsets are automatically in sorted order', isCorrect: false, feedback: 'Sorting the output order is a side effect, not the purpose. The real benefit is that duplicate values become adjacent, making it easy to detect and skip repeated choices at the same level.' },
        { label: 'Duplicate values become adjacent, enabling skip logic', isCorrect: true },
        { label: 'The recursion terminates faster', isCorrect: false, feedback: 'Sorting does not change the recursion depth or termination — it changes which branches you enter. The skip logic is what eliminates duplicate subsets.' },
        { label: 'Values are unique after sorting', isCorrect: false, feedback: 'Sorting rearranges elements — it does not remove duplicates. The duplicates are still present; sorting just groups them so your skip condition can catch them.' },
      ],
      correctFeedback: 'After sorting, all copies of a value sit next to each other. Your backtracking loop can then check: if nums[i] == nums[i-1] and i > start, skip — we already explored this choice at this level.',
      wrongFeedback: [
        'Sorting alone does not remove duplicates. But it changes their position — in what way that helps a skip condition?',
        'After sorting, where do duplicate values end up relative to each other? How does that help you detect a repeated choice?',
      ],
    },
  ],
}
