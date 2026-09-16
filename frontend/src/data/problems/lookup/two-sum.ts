export default {
  id: 'two-sum',
  title: 'Two Sum',
  difficulty: 'easy',
  description: 'Given an array of integers <code>nums</code> and an integer <code>target</code>, return the indices of the two numbers that add up to <code>target</code>. Each input has exactly one solution.',
  examples: [
    { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9.' },
    { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6.' },
  ],
  constraints: [
    '2 ≤ nums.length ≤ 10⁴',
    '-10⁹ ≤ nums[i] ≤ 10⁹',
    'Exactly one valid answer exists',
  ],
  starterCode: `class Solution:
    def two_sum(self, nums, target):
        pass`,
  runnerSetup: 'two_sum = Solution().two_sum',
  functionName: 'two_sum',
  conceptId: 'hash-maps',
  testCases: [
    { label: 'Basic', args: [[2, 7, 11, 15], 9], expected: [0, 1] },
    { label: 'Middle pair', args: [[3, 2, 4], 6], expected: [1, 2] },
    { label: 'Same value', args: [[3, 3], 6], expected: [0, 1] },
  ],
  bruteHint: 'A brute-force solution checks every possible pair by nesting one loop inside another: for each element, scan the rest of the array to see if any other value completes the target sum. This tries every combination but costs O(n²) time and O(1) extra space. With nums.length up to 10,000, how many comparisons would that be in the worst case, and can you avoid re-scanning from scratch for every element?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraints often reveal the complexity ceiling your solution must hit before you write any code. n ≤ 10,000 tells you…',
      highlight: { location: 'constraint', text: '2 ≤ nums.length ≤ 10⁴' },
      options: [
        { label: 'O(n²) is fine',            isCorrect: false },
        { label: 'O(n) or better needed',     isCorrect: true  },
        { label: 'O(log n) is required',      isCorrect: false },
        { label: 'Input size is irrelevant',  isCorrect: false },
      ],
      correctFeedback: '10,000² ≈ 100 million operations — too slow in Python. You need a linear-time approach.',
      wrongFeedback: [
        'Think about worst case: with n = 10,000, how many pairs would you check with two nested loops?',
        'n² = 100 million operations at n = 10,000. Python handles ~10 million simple ops per second — that\'s too slow.',
      ],
    },
    {
      id: 'output-structure',
      question: 'The shape of the required output tells you what your solution needs to track as it scans. The output is two indices, not values. This means you need to…',
      highlight: { location: 'description', text: 'return the indices of the two numbers that add up to <code>target</code>' },
      options: [
        { label: 'Track values you have seen, without recording positions', isCorrect: false },
        { label: 'Track each value together with the position where it occurred', isCorrect: true  },
        { label: 'Reorder the array before scanning',    isCorrect: false },
        { label: 'Count occurrences of each number',     isCorrect: false },
      ],
      correctFeedback: 'Exactly — you need to return where you found each number, not just that it exists. A hash map gives you O(1) value → index lookup.',
      wrongFeedback: [
        'A set only tells you if a value exists. But the output asks for indices — what else do you need to track?',
        'You need to return two positions in the array. So as you scan, you need to remember: "I saw this value at index ___."',
      ],
    },
    {
      id: 'one-solution-guarantee',
      question: 'Guarantees stated in the problem let you eliminate edge-case handling you would otherwise need. Exactly one valid answer exists. This means…',
      highlight: { location: 'constraint', text: 'Exactly one valid answer exists' },
      options: [
        { label: 'You must handle the no-solution case',  isCorrect: false },
        { label: 'You can return as soon as you find a pair', isCorrect: true  },
        { label: 'You need to collect all valid pairs',   isCorrect: false },
        { label: 'Reordering the values makes it easier to find', isCorrect: false },
      ],
      correctFeedback: 'Right — no ambiguity, no edge cases for missing solutions. The first valid pair you find is the answer.',
      wrongFeedback: [
        'The problem guarantees a solution always exists. What does that let you skip?',
        'If there\'s exactly one answer, the moment your loop finds a valid pair — that\'s it. You can return immediately.',
      ],
    },
  ],
  struggle: {
    "options": [
      {
        "strategyId": "nested_loops",
        "viability": "viable_suboptimal",
        "complexity": {
          "time": "O(n²)",
          "space": "O(1)"
        },
        "rationale": "Checking every pair guarantees finding the unique solution, but with up to 10⁴ elements the O(n²) time means up to 10⁸ operations, which is too slow for competitive constraints.",
        "planSteps": [
          "Iterate over each index i from 0 to len(nums)-1.",
          "For each i, iterate over each index j from i+1 to len(nums)-1.",
          "Check if nums[i] + nums[j] equals target.",
          "If the condition is met, return [i, j] immediately.",
          "Since exactly one solution is guaranteed, no fallback is needed."
        ],
        "socraticSeeds": [
          "How many pair comparisons does this approach make when nums has 10,000 elements, and does that concern you?",
          "For each element you visit in the outer loop, what information about the elements you have already seen could eliminate the need for the inner loop entirely?",
          "What would you need to store as you scan through the array so that each new element can be matched in a single lookup rather than a full scan?"
        ]
      },
      {
        "strategyId": "hash_map",
        "viability": "optimal",
        "complexity": {
          "time": "O(n)",
          "space": "O(n)"
        },
        "rationale": "Because we need to return original indices and each element has exactly one complement (target - nums[i]), storing each value-to-index mapping in a hash map lets us check for the complement in O(1) as we scan once.",
        "planSteps": [
          "Initialize an empty hash map to store {value: index} pairs.",
          "Iterate through nums with both index i and value nums[i].",
          "Compute the complement as target - nums[i].",
          "Check whether the complement already exists as a key in the hash map.",
          "If found, return [hash_map[complement], i] as the answer.",
          "Otherwise, insert nums[i]: i into the hash map and continue."
        ],
        "socraticSeeds": [
          "If you know the current number and the target, what is the exact value you are hoping to find among the numbers you have already seen?",
          "Why is it important to check the hash map before inserting the current number into it?",
          "The problem guarantees exactly one solution — how does that change what you need to handle at the end of your loop?"
        ]
      },
      {
        "strategyId": "sort_then_scan",
        "viability": "trap",
        "complexity": {
          "time": "O(n log n)",
          "space": "O(n)"
        },
        "rationale": "Sorting destroys the original indices, and the problem explicitly requires returning index positions, not values; saving original indices before sorting adds O(n) space but makes the logic unnecessarily convoluted compared to the hash map approach.",
        "planSteps": [
          "Create a copy of nums paired with original indices: [(value, index), ...].",
          "Sort the paired array by value in ascending order.",
          "Initialize two pointers, left at 0 and right at len(nums)-1.",
          "While left < right, compute the sum of the two pointed values.",
          "If the sum equals target, return the stored original indices of the two pointers.",
          "Move left forward if the sum is too small, or right backward if too large."
        ],
        "socraticSeeds": [
          "What happens to the relationship between an element's position in the array and its index in nums once you sort?",
          "Is there a simpler approach that finds the answer without rearranging the array at all?",
          "What extra bookkeeping do you need just to recover the original indices after sorting, and does that hint at a more direct solution?"
        ]
      },
      {
        "strategyId": "hash_set",
        "viability": "viable_suboptimal",
        "complexity": {
          "time": "O(n)",
          "space": "O(n)"
        },
        "rationale": "A hash set can confirm in O(1) whether a complement exists, but because it stores only values and not indices, a second pass or additional structure is required to recover the index positions the problem demands.",
        "planSteps": [
          "Insert all values of nums into a hash set.",
          "Iterate through nums again with index i and value nums[i].",
          "Compute complement = target - nums[i].",
          "Check if complement is in the set and complement != nums[i] (or handle duplicates carefully).",
          "If found, perform a linear scan to locate the index of the complement.",
          "Return the two indices once both are identified."
        ],
        "socraticSeeds": [
          "A set tells you whether a value exists — what critical piece of information does it not give you that the problem requires?",
          "If two elements have the same value and together they sum to target, how does a plain set handle distinguishing their positions?",
          "Is there a small change to what you store in the lookup structure that would let you avoid the extra scan for the index?"
        ]
      },
      {
        "strategyId": "binary_search_per_element",
        "viability": "inapplicable",
        "complexity": {
          "time": "O(n log n)",
          "space": "O(n)"
        },
        "rationale": "Binary search requires a sorted array, so applying it here demands sorting first and then preserving original indices separately — all of which is unnecessary overhead given the array has no sorted property and a hash map solves the problem in a single O(n) pass.",
        "planSteps": [
          "Pair each element with its original index and sort by value.",
          "For each element at position i in the sorted array, compute complement = target - value.",
          "Binary search the sorted value list for the complement, excluding index i.",
          "If the complement is found at a different position, retrieve both original indices.",
          "Return the pair of original indices."
        ],
        "socraticSeeds": [
          "What property must the array have before binary search can be applied, and does nums have that property from the start?",
          "After you sort to enable binary search, what additional problem do you now have to solve to satisfy the output requirement?",
          "If you are already doing O(n log n) work to sort, is there a fundamentally cheaper strategy you could use instead that avoids sorting altogether?"
        ]
      }
    ],
    "targetInsight": "Because the problem guarantees exactly one solution and requires original indices, each element has a unique complement (target minus itself) that can be looked up in O(1) using a hash map built during a single pass — making a second loop or sorting entirely unnecessary.",
    "insightRubric": [
      "The learner identifies that subtracting the current element from the target gives the exact value needed from a previous element, showing they see the complement relationship.",
      "The learner explains why a hash map (storing value-to-index) enables O(1) complement lookup and allows original indices to be returned, distinguishing it from a hash set or sorted approach.",
      "The learner recognizes that a single forward pass suffices because the guaranteed-unique solution means the complement will be encountered without needing to revisit elements."
    ]
  },
  solution: {
    patternName: 'Complement lookup via hashing — use when for each element you need to know if a specific paired value already exists in what you\'ve scanned so far',
    approaches: [
      {
        approachName: 'Brute force',
        oneLineIdea: 'Check every pair of indices for the target sum',
        subgoals: [
          { label: 'Fix the first index', explanation: 'Loop i over every position as a candidate first number' },
          { label: 'Search the remaining indices', explanation: 'Nested loop j over every later position, checking if nums[i] + nums[j] hits target' },
          { label: 'Return on the guaranteed match', explanation: 'The problem guarantees exactly one solution, so return the instant it\'s found' },
        ],
        code: `def two_sum(nums, target):
    n = len(nums)
    for i in range(n):                       # fix the first index
        for j in range(i + 1, n):             # search the remaining indices
            if nums[i] + nums[j] == target:
                return [i, j]                 # return on the guaranteed match`,
        timeComplexity: 'O(n²) — every index i is paired against every later index j',
        spaceComplexity: 'O(1) — no auxiliary structure beyond the two loop indices',
        whenYouWouldActuallyUseThis: 'Worth stating out loud first in an interview to confirm you understand the problem, but with n up to 10⁴ it\'s the one approach here you\'d never actually submit.',
      },
      {
        approachName: 'Hash set',
        oneLineIdea: 'Record all values first, then hunt for each complement\'s index',
        subgoals: [
          { label: 'Record every value', explanation: 'A pass inserts every element into a hash set, so existence can be checked in O(1)' },
          { label: 'Check each complement\'s existence', explanation: 'For each index, compute target - nums[i] and check the set in O(1)' },
          { label: 'Recover the index separately', explanation: 'Since the set only knows the value exists, a further scan is needed to find where it lives' },
        ],
        code: `def two_sum(nums, target):
    seen = set(nums)                          # record every value
    for i, x in enumerate(nums):
        complement = target - x
        if complement in seen:                # check each complement's existence
            j = nums.index(complement)        # recover the index separately
            if j != i:
                return [i, j]`,
        timeComplexity: 'O(n) to build the set, but each complement match then costs another O(n) scan to locate its index — O(n²) worst case, no better than brute force',
        spaceComplexity: 'O(n) — one slot per element in the set',
        whenYouWouldActuallyUseThis: 'It exposes exactly what\'s missing from a plain hash set: presence isn\'t enough when the output is a position. This is the step that motivates switching from a set to a map.',
      },
      {
        approachName: 'Hash map',
        oneLineIdea: 'Store value → index, checking for the complement before inserting',
        subgoals: [
          { label: 'Track value and position together', explanation: 'Storing the index alongside the value from the start makes recovery free' },
          { label: 'Check before you commit', explanation: 'Look up the complement first — if it\'s already there, the pair is found' },
          { label: 'Insert only after checking', explanation: 'Insert the current value → index only after confirming it isn\'t itself the answer\'s other half' },
        ],
        code: `def two_sum(nums, target):
    seen = {}                                  # track value and position together
    for i, x in enumerate(nums):
        complement = target - x
        if complement in seen:                 # check before you commit
            return [seen[complement], i]
        seen[x] = i                            # insert only after checking`,
        timeComplexity: 'O(n) — one O(1) average-case hash map lookup and insert per element',
        spaceComplexity: 'O(n) — worst case (no match until the last element) stores every element\'s index',
        whenYouWouldActuallyUseThis: 'The default choice — storing index alongside value from the moment it\'s seen means you never pay for a second lookup, which is exactly what both weaker approaches above were missing.',
      },
    ],
    comparisonTable: [
      { approach: 'Brute force', time: 'O(n²)', space: 'O(1)', structuralUnlock: 'None — still checking every pair directly' },
      { approach: 'Hash set', time: 'O(n²) worst case', space: 'O(n)', structuralUnlock: 'O(1) existence checks replace scanning for the complement\'s value, but recovering its index still requires a linear search, so the win is only partial' },
      { approach: 'Hash map', time: 'O(n)', space: 'O(n)', structuralUnlock: 'Storing index alongside value from the moment it\'s seen means existence and position are answered by the same O(1) lookup — nothing left to recover afterward' },
    ],
    transferNote: 'The complement-lookup shape reappears anywhere a target can be decomposed into "what I have now" and "what I need to have already seen": Contains Duplicate is the same lookup with the target fixed at "this exact value" instead of a computed complement, and Subarray Sum Equals K applies the identical trick to running prefix sums instead of raw array values. Whenever a problem asks for a pair, a complement, or a match against something computable from the current element, storing what you\'ve seen so far in a hash map — mapped to whatever you\'ll need later, an index or a count — turns an O(n²) search into a single O(n) pass.',
    retrievalCheck: [
      'If the problem asked you to return the pair of values instead of indices, would the hash set approach suddenly become optimal — why or why not?',
      'If nums were guaranteed sorted, which of these three approaches would you replace with an even better one, and what would that be?',
      'If instead of exactly one solution the problem asked for the count of all pairs summing to target, which approach adapts most directly, and what would you store in the map instead of an index?',
    ],
  },
  solutionCode: `class Solution:
    def two_sum(self, nums, target):
        seen = {}
        for i, x in enumerate(nums):
            if target - x in seen:
                return [seen[target - x], i]
            seen[x] = i
        return []`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'The complement check happens *before* the current value is stored — checking after would let a value match against itself (e.g. target=6 and the current element is 3, with no other 3 yet seen), which the single-pass order naturally prevents.',
  solutionExplanation: 'Instead of asking "does any other number in the array sum to target with me" (which means rescanning for every element — O(n²)), the hash map flips the question around: "have I already seen the specific number that would complete the pair?" Storing every value as it\'s seen turns that lookup into O(1), so the whole array only needs one pass.',
}
