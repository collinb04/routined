export default {
  id: 'longest-consecutive-sequence',
  title: 'Longest Consecutive Sequence',
  difficulty: 'medium',
  description: `<p>Given an unsorted array of integers <code>nums</code>, return the length of the longest consecutive elements sequence.</p><p>You must write an algorithm that runs in O(n) time.</p>`,
  examples: [
    { input: 'nums = [100,4,200,1,3,2]', output: '4 (sequence: 1,2,3,4)' },
    { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' },
  ],
  constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
  starterCode: `class Solution:
    def longest_consecutive(self, nums):
        pass`,
  runnerSetup: 'longest_consecutive = Solution().longest_consecutive',
  functionName: 'longest_consecutive',
  conceptId: 'arrays',
  testCases: [
    { label: '[100,4,200,1,3,2]', args: [[100,4,200,1,3,2]], expected: 4 },
    { label: '[0,3,7,2,5,8,4,6,0,1]', args: [[0,3,7,2,5,8,4,6,0,1]], expected: 9 },
    { label: 'empty', args: [[]], expected: 0 },
  ],
  bruteHint: 'The brute-force approach starts from every number in nums and tries to walk a sequence: check whether num+1 exists by scanning the whole array, then num+2, then num+3, extending the chain for as long as the next value is found. Each of those existence checks costs O(n), and in the worst case — a single run of n consecutive numbers — you repeat that scan roughly n times for each of the n starting points. What does nesting an O(n) scan inside an O(n) walk inside an O(n) set of starting points do to the overall time complexity?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'on-time-requirement',
      question: 'An explicit time-complexity requirement in the problem statement tells you which approaches are off the table before you even start designing. "You must write an algorithm that runs in O(n) time." What common approach does this explicitly rule out?',
      options: [
        { label: 'Recording each value as you scan, for instant lookups', isCorrect: false, feedback: 'Recording values as you scan takes O(n) time overall — that fits within the O(n) requirement, it isn\'t what gets ruled out.' },
        { label: 'Rearranging every element into ascending order before scanning', isCorrect: true },
        { label: 'Passing through the array once, without reordering it', isCorrect: false, feedback: 'A single pass through the array is O(n) — exactly what the constraint requires. The O(n) requirement is ruling out slower approaches, not this one.' },
        { label: 'Tallying how many times each value occurs, in one pass', isCorrect: false, feedback: 'Tallying each value once is still O(n) — that satisfies the constraint. The requirement is pointing you away from approaches that are fundamentally super-linear.' },
      ],
      correctFeedback: 'Rearranging the array into order costs O(n log n), which violates the O(n) requirement. The constraint forces you to find consecutive sequences without sorting.',
      wrongFeedback: [
        'What is the time complexity of putting the array in order? Is O(n log n) the same as O(n)?',
        'Putting elements in order is the natural first instinct for a "consecutive sequence" problem. But O(n log n) > O(n). What can you use instead to get O(1) lookup without reordering everything?',
      ],
      highlight: { location: 'description', text: 'You must write an algorithm that runs in O(n) time.' },
    },
    {
      id: 'large-value-range',
      question: 'The range of possible values tells you whether a structure indexed directly by value is even feasible. "-10^9 ≤ nums[i] ≤ 10^9". What does this rule out for tracking which numbers have been seen?',
      options: [
        { label: 'Recording only the values that actually appear', isCorrect: false, feedback: 'This only stores the values that occur in nums — at most n of them, not 2 × 10^9. Its size never depends on the value range.' },
        { label: 'Allocating one slot for every possible value in the range', isCorrect: true },
        { label: 'Keeping every input value in a plain list', isCorrect: false, feedback: 'Keeping the n input values in a list uses O(n) space regardless of value range. The constraint doesn\'t restrict list storage.' },
        { label: 'Comparing values to each other directly', isCorrect: false, feedback: 'Comparing values is O(1) per comparison and doesn\'t depend on value range. The constraint affects any structure sized proportional to the value space, not comparisons.' },
      ],
      correctFeedback: 'Allocating one slot per possible value would need 2 × 10^9 slots — about 2 GB. The value range is too large for direct indexing. Recording only the values that actually occur avoids this, since that scales with n, not with the range.',
      wrongFeedback: [
        'If you allocated one slot per possible value, how large would that allocation need to be given the range -10^9 to 10^9?',
        'Direct-index allocation only works when the value range is comparable to n. Here the range is 2 × 10^9 but n ≤ 10^5. What approach handles arbitrary values without allocating space by range?',
      ],
      highlight: { location: 'constraint', text: '-10^9 <= nums[i] <= 10^9' },
    },
    {
      id: 'sequence-start-detection',
      question: 'Avoiding repeated work is what separates an O(n) algorithm from one that silently becomes much slower. To keep from re-counting the same sequence multiple times, you should only begin counting from a true sequence start — how do you identify that a number n is the start of a consecutive sequence?',
      options: [
        { label: 'n is the smallest number in nums', isCorrect: false, feedback: 'There is only one smallest number in nums, but there can be many sequence starts. For example, in [1,2,100,101] both 1 and 100 are sequence starts.' },
        { label: 'No value one less than n has been recorded', isCorrect: true },
        { label: 'A value one greater than n has been recorded', isCorrect: false, feedback: 'A value one greater than n being recorded means n could be a start, but it could also be a middle element. The definitive test is that no value one less than n has been recorded — if n has no predecessor, it must be a start.' },
        { label: 'n appears exactly once in nums', isCorrect: false, feedback: 'Occurrence count is irrelevant to identifying a sequence start. Duplicates don\'t affect consecutive-sequence structure — only whether n-1 has been recorded matters.' },
      ],
      correctFeedback: 'If no value one less than n has been recorded, n has no predecessor — it is the start of a new sequence. Only from these starting points do you count forward (n+1, n+2, ...). This ensures each sequence is counted exactly once.',
      wrongFeedback: [
        'If you start counting from every element, you\'d recount the same sequence multiple times. What property uniquely identifies where a sequence begins?',
        'A sequence start has no element immediately before it. How do you check "is there an element just before n?" in O(1)?',
      ],
    },
    {
      id: 'duplicate-handling',
      question: 'Knowing whether the input can contain duplicates tells you whether you need extra bookkeeping to avoid double-processing the same value. nums can contain duplicates (e.g., [0,3,7,2,5,8,4,6,0,1] has two 0s) — how does a hash set handle this automatically?',
      options: [
        { label: 'It counts each value\'s frequency', isCorrect: false, feedback: 'A hash set stores presence, not frequency. It doesn\'t count occurrences — it just records whether a value is in the set. Duplicates are silently ignored on insertion.' },
        { label: 'It deduplicates on insertion', isCorrect: true },
        { label: 'It raises an error for duplicate values', isCorrect: false, feedback: 'Sets in Python silently ignore duplicate insertions — no error is raised. Converting a list with duplicates to a set simply keeps one copy of each value.' },
        { label: 'It stores all copies and you must deduplicate manually', isCorrect: false, feedback: 'Python sets never store duplicate values. Adding 0 twice to a set results in a set with one 0. No manual deduplication step is needed.' },
      ],
      correctFeedback: 'A set stores each value at most once. Adding [0, 0, 1] produces {0, 1}. Duplicates are harmless — the set already reflects which values are present, and sequence counting is based on presence, not frequency.',
      wrongFeedback: [
        'What happens when you add the same value to a Python set twice? Does the set grow?',
        'set([0, 0, 1]) gives {0, 1}. Does that affect your sequence length calculation for the sequence starting at 0?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def longest_consecutive(self, nums):
        num_set = set(nums)
        best = 0
        for n in num_set:
            if n - 1 not in num_set:
                length = 1
                while n + length in num_set:
                    length += 1
                best = max(best, length)
        return best`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'Only starting a walk when <code>n - 1</code> is absent from the set is what keeps this O(n) overall — without that check, every number in a run would independently re-walk the same run from its own position, turning one O(k) walk into k separate O(k) walks.',
  solutionExplanation: 'A hash set gives O(1) membership checks, which is what makes "does the next consecutive number exist" cheap enough to ask repeatedly. Restricting full walks to only the numbers that are the *start* of a run (nothing one less than them exists) guarantees each run gets walked exactly once, from its true beginning to its true end — so across the whole array, every number is visited by at most one walk, keeping total work linear despite the while loop living inside a for loop.',
  solution: {
    patternName: 'Existence-checking to skip redundant work — use when you need to find the boundaries of runs or groups without sorting, by checking presence directly',
    approaches: [
      {
        approachName: 'Brute force',
        oneLineIdea: 'From every number, walk forward checking existence by scanning the array',
        subgoals: [
          { label: 'Try every number as a potential start', explanation: 'For each element, assume it could begin the longest run' },
          { label: 'Walk forward checking existence', explanation: 'Repeatedly check whether the next consecutive number exists anywhere in the array' },
          { label: 'Track the longest walk found', explanation: 'Keep a running maximum across every starting point tried' },
        ],
        code: `def longest_consecutive(nums):
    best = 0
    for start in nums:                        # try every number as a potential start
        length = 1
        current = start
        while (current + 1) in nums:          # walk forward checking existence
            current += 1
            length += 1
        best = max(best, length)               # track the longest walk found
    return best`,
        timeComplexity: 'O(n³) worst case — up to n starting points, each walking a chain of up to n steps, with each step\'s existence check itself an O(n) scan of the list',
        spaceComplexity: 'O(1) — no auxiliary structure beyond the running counters',
        whenYouWouldActuallyUseThis: 'Never at the stated input size — it repeats the same "does this number exist?" scan so many times that a single long consecutive run makes this approach cubic.',
      },
      {
        approachName: 'Sort then scan',
        oneLineIdea: 'Sort the array, then count consecutive runs in one pass',
        subgoals: [
          { label: 'Impose an order', explanation: 'Sorting brings every consecutive sequence\'s members next to each other' },
          { label: 'Scan once, tracking run length', explanation: 'Walk the sorted array, extending the current run when the next value is exactly one more, resetting on a gap' },
          { label: 'Skip duplicates without breaking the run', explanation: 'Equal adjacent values are ignored rather than treated as a break' },
        ],
        code: `def longest_consecutive(nums):
    if not nums:
        return 0
    nums = sorted(set(nums))                  # impose an order (dedup while we're at it)
    best = 1
    run = 1
    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1] + 1:
            run += 1                            # scan once, tracking run length
        else:
            run = 1
        best = max(best, run)
    return best`,
        timeComplexity: 'O(n log n) — dominated by the sort; the scan afterward is a single O(n) pass',
        spaceComplexity: 'O(n) — sorting into a deduplicated structure (or O(1) extra if sorting the input in place)',
        whenYouWouldActuallyUseThis: 'A reasonable middle ground if you already need the array sorted for another reason — but on its own it does more work than necessary just to satisfy the "next number exists" check.',
      },
      {
        approachName: 'Hash set with start detection',
        oneLineIdea: 'Record every value in a set, only start counting from true sequence starts',
        subgoals: [
          { label: 'Record every value for O(1) lookup', explanation: 'A hash set lets you check whether any number exists in constant time, with no sort required' },
          { label: 'Only count forward from true starts', explanation: 'Skip any number whose predecessor (n − 1) is already in the set, so each sequence is only ever walked from its beginning' },
          { label: 'Walk forward once per sequence', explanation: 'From each true start, extend forward while the next number exists, without re-visiting earlier ground' },
        ],
        code: `def longest_consecutive(nums):
    num_set = set(nums)                        # record every value for O(1) lookup
    best = 0
    for n in num_set:
        if (n - 1) not in num_set:              # only count forward from true starts
            length = 1
            while (n + length) in num_set:       # walk forward once per sequence
                length += 1
            best = max(best, length)
    return best`,
        timeComplexity: 'O(n) — every number is visited as the target of a forward walk at most once total, because only true sequence starts trigger a walk',
        spaceComplexity: 'O(n) — the hash set stores every distinct value',
        whenYouWouldActuallyUseThis: 'The default choice — it meets the O(n) requirement stated in the problem and needs no sorting, at the cost of O(n) extra memory for the set.',
      },
    ],
    comparisonTable: [
      { approach: 'Brute force', time: 'O(n³)', space: 'O(1)', structuralUnlock: 'None — every existence check re-scans the entire array from scratch' },
      { approach: 'Sort then scan', time: 'O(n log n)', space: 'O(n)', structuralUnlock: 'Sorting makes every consecutive sequence contiguous in memory, replacing repeated existence scans with a single ordered pass' },
      { approach: 'Hash set with start detection', time: 'O(n)', space: 'O(n)', structuralUnlock: 'O(1) existence checks remove the need to sort at all, and only walking forward from true starts guarantees every number is visited by at most one walk, not once per candidate start' },
    ],
    transferNote: 'The "only start from a true beginning" trick reappears anywhere a linear structure hides inside an unordered collection — checking a predecessor is absent before doing expensive forward work avoids reprocessing the same run from the middle, the same idea behind prefix/interval merging problems that must avoid re-walking a run they\'ve already covered. Whenever brute force keeps re-discovering the same run from every point inside it, look for a cheap O(1) check that identifies the true starting points first.',
    retrievalCheck: [
      'Why does checking (n - 1) not in num_set before starting a walk guarantee each number is visited by at most one walk across the whole algorithm?',
      'If nums were already guaranteed sorted, would the hash-set approach still be worth the O(n) extra space over just scanning once?',
      'How does the hash set approach handle duplicate values in nums without any explicit deduplication step?',
    ],
  },
}
