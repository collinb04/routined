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
  starterCode: `def two_sum(nums, target):
  pass`,
  functionName: 'two_sum',
  conceptId: 'hash-maps',
  testCases: [
    { label: 'Basic', args: [[2, 7, 11, 15], 9], expected: [0, 1] },
    { label: 'Middle pair', args: [[3, 2, 4], 6], expected: [1, 2] },
    { label: 'Same value', args: [[3, 3], 6], expected: [0, 1] },
  ],
  bruteHint: 'Describe the nested-loop approach and its time complexity',
  optimizeHint: 'Name the data structure that eliminates the inner loop',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 10,000 tells you…',
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
      question: 'The output is two indices, not values. This means you need to…',
      options: [
        { label: 'Store values in a set',               isCorrect: false },
        { label: 'Map each value to its index',         isCorrect: true  },
        { label: 'Sort the array first',                isCorrect: false },
        { label: 'Count occurrences of each number',    isCorrect: false },
      ],
      correctFeedback: 'Exactly — you need to return where you found each number, not just that it exists. A hash map gives you O(1) value → index lookup.',
      wrongFeedback: [
        'A set only tells you if a value exists. But the output asks for indices — what else do you need to track?',
        'You need to return two positions in the array. So as you scan, you need to remember: "I saw this value at index ___."',
      ],
    },
    {
      id: 'one-solution-guarantee',
      question: 'Exactly one valid answer exists. This means…',
      options: [
        { label: 'You must handle the no-solution case',  isCorrect: false },
        { label: 'You can return as soon as you find a pair', isCorrect: true  },
        { label: 'You need to collect all valid pairs',   isCorrect: false },
        { label: 'Sorting makes it easier to find',       isCorrect: false },
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
  }
}
