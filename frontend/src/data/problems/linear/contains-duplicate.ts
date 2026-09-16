export default {
  id: 'contains-duplicate',
  title: 'Contains Duplicate',
  difficulty: 'easy',
  description: 'Given an integer array <code>nums</code>, return <code>true</code> if any value appears at least twice, and <code>false</code> if every element is distinct.',
  examples: [
    { input: 'nums = [1, 2, 3, 1]', output: 'true', explanation: '1 appears at index 0 and 3.' },
    { input: 'nums = [1, 2, 3, 4]', output: 'false', explanation: 'All elements are distinct.' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 10⁵',
    '-10⁹ ≤ nums[i] ≤ 10⁹',
  ],
  starterCode: `class Solution:
    def contains_duplicate(self, nums):
        pass`,
  functionName: 'contains_duplicate',
  runnerSetup: 'contains_duplicate = Solution().contains_duplicate',
  conceptId: 'arrays',
  testCases: [
    { label: 'Has duplicate', args: [[1, 2, 3, 1]], expected: true },
    { label: 'All unique', args: [[1, 2, 3, 4]], expected: false },
    { label: 'Single element', args: [[1]], expected: false },
    { label: 'Multiple duplicates', args: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
  ],
  bruteHint: 'The brute-force approach compares every pair of numbers — for each element, check it against every other one to see if two match. That works, but it checks roughly n² pairs. At n up to 100,000, how many comparisons is that, and would it finish in time?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. What does nums.length ≤ 10⁵ tell you?',
      options: [
        { label: 'O(n²) is acceptable',       isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion operations. That\'s nowhere near feasible. The constraint is telling you a nested loop won\'t work.' },
        { label: 'Input size doesn\'t matter', isCorrect: false, feedback: 'Input size always matters. 10⁵ is a signal about which complexities are acceptable — ask yourself what happens to a brute-force comparison at that scale.' },
        { label: 'O(n log n) or better needed', isCorrect: false, feedback: 'O(n log n) would work, but the constraint doesn\'t require it — O(n) is achievable and preferable. The constraint rules out O(n²), not all super-linear solutions.' },
        { label: 'O(n²) is too slow; aim for O(n)', isCorrect: true },
      ],
      correctFeedback: '10⁵² = 10 billion operations — far too slow. You need to find a repeated value without comparing every pair.',
      wrongFeedback: [
        'At n = 100,000, how many pairs would a double loop check? Is that fast enough?',
        'A nested loop checks every pair — that\'s n² ≈ 10 billion at max input. What complexity would still be fast enough?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 10⁵' },
    },
    {
      id: 'output-type',
      question: 'The type of output you\'re asked for tells you how much of the problem you actually need to solve. The output here is a boolean — true if any duplicate exists. What does that tell you about how much work you need to do?',
      options: [
        { label: 'You need to find all duplicate values',    isCorrect: false, feedback: 'The problem only asks whether a duplicate exists, not which values are duplicated or how many times. Collecting all duplicates is unnecessary work.' },
        { label: 'You can stop as soon as you see a repeat', isCorrect: true },
        { label: 'You must count occurrences of every value', isCorrect: false, feedback: 'Counting every value\'s occurrences would give you more than you need. You only need to know if any count exceeds one — and you can detect that the moment you see a second occurrence.' },
        { label: 'You need to return which index has the duplicate', isCorrect: false, feedback: 'The output is true or false, not an index. You don\'t need to track where the duplicate lives — only whether one exists at all.' },
      ],
      correctFeedback: 'A boolean output means the first repeated element ends the search. No need to process the entire array once you\'ve found a duplicate.',
      wrongFeedback: [
        'The output is just true or false. What does that tell you about how much of the array you need to examine?',
        'You\'re not asked for a count or a position — just whether a repeat exists. What can you do the moment you see one?',
      ],
      highlight: { location: 'description' },
    },
    {
      id: 'membership-lookup',
      question: 'The exact question you\'ll ask on every iteration determines what structure you should reach for. Here, you need to know: "have I seen this value before?" What do you need to do as you scan to answer that in O(1)?',
      options: [
        { label: 'Sort the array, then scan adjacent pairs',        isCorrect: false, feedback: 'Sorting works but costs O(n log n) and mutates the array. There\'s a way to answer the membership question directly in O(1), making the whole algorithm O(n).' },
        { label: 'Record each value as you see it, so a repeat is caught instantly', isCorrect: true },
        { label: 'Scan back through the values you\'ve already visited', isCorrect: false, feedback: 'Scanning what you\'ve already visited is O(n) per check — making the overall algorithm O(n²). You need to check "seen before?" without re-scanning.' },
        { label: 'Count how many times every value appears',        isCorrect: false, feedback: 'Counting every value\'s occurrences is unnecessary work. You only need to know if a value appears twice — recording what you\'ve seen catches that the moment the second occurrence arrives.' },
      ],
      correctFeedback: 'A hash set supports O(1) add and O(1) membership check. One pass through the array: if the current value is already recorded, return true; otherwise, record it.',
      wrongFeedback: [
        'You need to answer "seen before?" for each element without re-scanning everything. What lets you check that instantly?',
        'Scanning gives O(n) per check, sorting gives O(n log n) up front. One structure gives O(1) — it remembers elements with no order and no duplicates by definition.',
      ],
      highlight: { location: 'description', text: 'appears at least twice' },
    },
    {
      id: 'value-range',
      question: 'Value bounds tell you whether index-based tricks are even available to you. What does -10⁹ ≤ nums[i] ≤ 10⁹ tell you?',
      options: [
        { label: 'Values are small enough to use as array indices', isCorrect: false, feedback: 'The range spans 2 × 10⁹ distinct values. You cannot allocate an array that large as a lookup table — that\'s a 2 GB array of booleans.' },
        { label: 'Rules out direct indexing, but any hashable value still works as a key', isCorrect: true },
        { label: 'All values are positive',                         isCorrect: false, feedback: 'The range includes negative numbers down to -10⁹. Any approach that assumes positive-only values (like direct indexing into an array) would break on negative inputs.' },
        { label: 'Counting sort is applicable here',                isCorrect: false, feedback: 'Counting sort requires allocating space for every possible value in the range. With a span of 2 × 10⁹, that\'s not feasible. The range is too large for array-indexed counting.' },
      ],
      correctFeedback: 'The range is too large for array-indexed lookup but arbitrary values are fine for a hash set or hash map, which handles any integer in O(1).',
      wrongFeedback: [
        'The range spans 2 billion values. What does that rule out as a lookup structure?',
        'Direct array indexing would need 2 × 10⁹ slots. Which lookup structure handles arbitrary integers without pre-allocating space?',
      ],
      highlight: { location: 'constraint', text: '-10⁹ ≤ nums[i] ≤ 10⁹' },
    },
  ],
  struggle: {
    options: [
      {
        strategyId: 'hash_set',
        viability: 'optimal',
        complexity: { time: 'O(n)', space: 'O(n)' },
        rationale: 'A hash set answers "have I seen this value?" in O(1), so a single pass that checks-then-inserts each element catches the first repeat immediately — well within the n ≤ 10⁵ bound, and unaffected by the ±10⁹ value range since hashing never requires a bounded range.',
        planSteps: [
          'Initialize an empty hash set to track seen values.',
          'Iterate through nums, looking at the current value.',
          'Check whether the current value is already in the set.',
          'If it is, return true immediately.',
          'Otherwise, add the current value to the set and continue.',
          'If the loop finishes with no repeat found, return false.',
        ],
        socraticSeeds: [
          "What is the cheapest way to answer 'have I seen this exact value before?' as you scan?",
          'Since the output is just true or false, what can you do the instant you spot a repeat?',
          "Does the size of the value range (-10⁹ to 10⁹) change what structure you'd reach for here?",
        ],
      },
      {
        strategyId: 'nested_loops',
        viability: 'viable_suboptimal',
        complexity: { time: 'O(n²)', space: 'O(1)' },
        rationale: "Comparing every pair correctly finds a duplicate, but at n up to 10⁵ that's on the order of 10¹⁰ comparisons — far past what the constraint allows, even though it needs no extra memory.",
        planSteps: [
          'Iterate over each index i from 0 to len(nums) - 1.',
          'For each i, iterate over each index j from i + 1 to len(nums) - 1.',
          'Check whether nums[i] equals nums[j].',
          'If a match is found, return true immediately.',
          'If no match is found after all pairs are checked, return false.',
        ],
        socraticSeeds: [
          'At the largest allowed input size, how many comparisons does checking every pair actually take?',
          'Is there information from earlier in the scan you could reuse instead of re-checking every pair?',
        ],
      },
      {
        strategyId: 'sort_then_scan',
        viability: 'viable_suboptimal',
        complexity: { time: 'O(n log n)', space: 'O(1)' },
        rationale: 'Sorting brings equal values next to each other, so one linear scan comparing neighbors finds a duplicate — correct and memory-light, but the sort itself costs more than the single O(n) pass a direct lookup structure allows.',
        planSteps: [
          'Sort nums in ascending order.',
          'Iterate through the sorted array from index 1 onward.',
          'Compare each element to its immediate predecessor.',
          'If they are equal, return true immediately.',
          'If no adjacent pair matches, return false.',
        ],
        socraticSeeds: [
          'Once the array is sorted, where do any duplicate values end up relative to each other?',
          'What does the sort itself cost, and is there a way to skip it while still checking each value in O(1)?',
        ],
      },
      {
        strategyId: 'counting_sort',
        viability: 'trap',
        complexity: { time: 'O(n)', space: 'O(n)' },
        rationale: "Tallying occurrences in a bucket sized to the value range looks like a single O(n) pass, but the range spans -10⁹ to 10⁹ — over 2 billion possible values — so the bucket array itself would need billions of slots, making it infeasible no matter how small n actually is.",
        planSteps: [
          'Allocate a bucket array sized to the range of possible values.',
          'Increment the bucket for each value as you scan.',
          'Return true if any bucket count reaches 2.',
        ],
        socraticSeeds: [
          'If you allocated one bucket per possible value, how many buckets would -10⁹ to 10⁹ require?',
          "Does this approach's cost actually depend on n, or on something else entirely?",
        ],
      },
    ],
    targetInsight: "The problem only needs a yes/no on repetition, and a hash set answers 'have I seen this value?' in O(1) regardless of how large or negative the values are, so a single pass suffices without sorting or range-sized storage.",
    insightRubric: [
      'The learner identifies that only a yes/no membership check is needed, not positions, counts, or indices.',
      'The learner explains that a hash set (or hash map) gives O(1) "have I seen this?" checks, enabling a single linear pass instead of sorting or nested comparisons.',
      'The learner recognizes that the huge value range rules out array-indexed or range-sized approaches (like counting sort) but not hashing, since hashing needs no bounded range.',
    ],
  },
  solution: {
    patternName: 'Existence-checking via hashing — use when you need to know whether you\'ve seen a value before, not where or how many times',
    approaches: [
      {
        approachName: 'Brute force',
        oneLineIdea: 'Compare every pair of elements',
        subgoals: [
          { label: 'Define the check', explanation: 'A duplicate exists if any two distinct indices hold equal values' },
          { label: 'Exhaust the pairs', explanation: 'Nested loop over all index pairs i < j' },
          { label: 'Short-circuit on first hit', explanation: 'Return true immediately, don\'t wait to finish scanning' },
        ],
        code: `def contains_duplicate(nums):
    n = len(nums)
    for i in range(n):              # exhaust the pairs
        for j in range(i + 1, n):
            if nums[i] == nums[j]:
                return True          # short-circuit
    return False`,
        timeComplexity: 'O(n²) — n counts array length, and each element is compared against every later element',
        spaceComplexity: 'O(1) — no auxiliary structure, only loop indices',
        whenYouWouldActuallyUseThis: 'Never in production for large n, but it\'s the right first thing to say out loud in an interview — it proves you understand the problem before you reach for a data structure',
      },
      {
        approachName: 'Sort first',
        oneLineIdea: 'Sort, then duplicates become adjacent',
        subgoals: [
          { label: 'Change the representation', explanation: 'Sorting turns "anywhere in the array" into "adjacent in the array" — the search space collapses from all pairs to neighbors' },
          { label: 'Scan for the collapsed case', explanation: 'A single pass checking nums[i] == nums[i-1] now catches every duplicate' },
          { label: 'Account for the sort cost', explanation: 'The complexity win is now bounded by the sort, not the scan' },
        ],
        code: `def contains_duplicate(nums):
    nums.sort()                      # change the representation
    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:    # scan the collapsed case
            return True
    return False`,
        timeComplexity: 'O(n log n) — dominated by the sort; the scan afterward is O(n)',
        spaceComplexity: 'O(1) extra if sorting in place, O(n) if the language\'s sort isn\'t in-place',
        whenYouWouldActuallyUseThis: 'When you\'re memory-constrained and can mutate the input array, or when you already need it sorted for a later step',
      },
      {
        approachName: 'Hash set',
        oneLineIdea: 'Track seen values, check membership before inserting',
        subgoals: [
          { label: 'Establish the invariant', explanation: 'The set always holds exactly the distinct values seen so far' },
          { label: 'Check-then-commit each element', explanation: 'Before adding a value, check if it\'s already present — that check IS the duplicate detection' },
          { label: 'Exploit O(1) membership', explanation: 'This only works because hash set lookup doesn\'t depend on how many elements are already in it' },
        ],
        code: `def contains_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:                 # check-then-commit
            return True
        seen.add(x)                   # establish the invariant
    return False`,
        timeComplexity: 'O(n) — one O(1) average-case check and insert per element',
        spaceComplexity: 'O(n) — worst case (no duplicates) stores every element',
        whenYouWouldActuallyUseThis: 'The default choice whenever n is large and you\'re not memory-constrained — this is the one to reach for first in practice',
      },
    ],
    comparisonTable: [
      { approach: 'Brute force', time: 'O(n²)', space: 'O(1)', structuralUnlock: 'None — still checking every pair, just haven\'t changed the representation' },
      { approach: 'Sort first', time: 'O(n log n)', space: 'O(1)–O(n)', structuralUnlock: 'Reordering collapses "anywhere" into "adjacent", shrinking the check from all pairs to neighbors' },
      { approach: 'Hash set', time: 'O(n)', space: 'O(n)', structuralUnlock: 'Trades space for O(1) membership — you never re-derive "have I seen this", you just ask a structure that remembers' },
    ],
    transferNote: 'The check-then-commit shape reappears anywhere you need existence or frequency tracking: Two Sum (have I seen the complement?), Longest Substring Without Repeating Characters (have I seen this char in the current window?), and Subarray Sum Equals K (have I seen this prefix sum before?). Whenever a problem asks "has this happened before" rather than "where" or "how many", hashing is the first pattern to reach for.',
    retrievalCheck: [
      'If the problem instead asked for the index of the first duplicate pair, which approach\'s data structure would you swap out, and for what?',
      'If nums were a stream you couldn\'t re-scan (values arrive one at a time, no going back), which of these three approaches still works at all?',
      'If you needed to find values that appear more than twice, what would you swap the set for, and what new field would you check on each lookup?',
    ],
  },
  solutionCode: `class Solution:
    def contains_duplicate(self, nums):
        seen = set()
        for x in nums:
            if x in seen:                 # check-then-commit
                return True
            seen.add(x)                   # establish the invariant
        return False`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'This trades space for speed — the set can grow to hold every element. If you\'re memory-constrained and allowed to mutate the input, sorting first gets you to O(1) extra space at the cost of O(n log n) time instead.',
  solutionExplanation: 'A set only ever answers one question in O(1): "have I seen this exact value before?" That\'s precisely what "contains a duplicate" is asking, so the loop does the simplest possible thing — for each element, check membership before inserting. The check and the insert happen in the same pass, so by the time you reach index i, the set holds exactly the distinct values seen at indices 0..i-1. If the current element is already in there, two equal values exist and you can return immediately without scanning the rest of the array.',
}
