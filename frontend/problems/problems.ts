export const problems = [
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "easy",
    domain_cluster: "lookup",
    description: `Given an integer array nums, return true if any value appears more than once in the array, and return false if every element is distinct.`,
    examples: [
      {
        input: "nums = [1, 2, 3, 1]",
        output: "true",
        explanation: "1 appears twice."
      },
      {
        input: "nums = [1, 2, 3, 4]",
        output: "false",
        explanation: "All elements are distinct."
      },
      {
        input: "nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]",
        output: "true",
        explanation: "Multiple duplicates exist."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    starter_code: `def solution(nums: list[int]) -> bool:\n    # your code here\n    pass`,
    test_cases: [
      {
        id: 1,
        input: { nums: [1, 2, 3, 1] },
        expected: true,
        is_hidden: false,
        label: "Basic duplicate"
      },
      {
        id: 2,
        input: { nums: [1, 2, 3, 4] },
        expected: false,
        is_hidden: false,
        label: "All distinct"
      },
      {
        id: 3,
        input: { nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2] },
        expected: true,
        is_hidden: false,
        label: "Multiple duplicates"
      },
      {
        id: 4,
        input: { nums: [1] },
        expected: false,
        is_hidden: true,
        label: "Single element"
      },
      {
        id: 5,
        input: { nums: [] },
        expected: false,
        is_hidden: true,
        label: "Empty array"
      },
      {
        id: 6,
        input: { nums: [-1, -1, 2] },
        expected: true,
        is_hidden: true,
        label: "Negative duplicates"
      },
      {
        id: 7,
        input: { nums: [1000000000, -1000000000] },
        expected: false,
        is_hidden: true,
        label: "Boundary values"
      }
    ],
    criteria: {
      dissect: {
        what_is_being_asked: "Determine whether any integer appears more than once in the array. Return a boolean.",
        common_misconceptions: [
          "Returning the duplicate value instead of a boolean",
          "Thinking the array is sorted when it isn't guaranteed to be",
          "Confusing 'more than once' with 'exactly twice'"
        ],
        advance_condition: "User can accurately restate the goal, identify the return type is boolean, and trace at least one example correctly"
      },
      brute_force: {
        approach: "Compare every pair of elements using nested loops",
        complexity: { time: "O(n²)", space: "O(1)" },
        why_insufficient: "10^5 elements means up to 10^10 comparisons — too slow",
        advance_condition: "User describes nested loop comparison and correctly identifies O(n²) time complexity and why it fails the constraint"
      },
      optimize: {
        bottleneck: "Re-scanning the array for each element to find a match",
        applicable_patterns: ["hash set for O(1) membership lookup"],
        distractor_patterns: ["sorting the array first — works but O(n log n)", "binary search — requires sorted input"],
        why_fits: "A set tracks seen elements. For each element, check if it's already in the set in O(1) — if yes, return true. If no, add it and continue.",
        target_complexity: { time: "O(n)", space: "O(n)" },
        advance_condition: "User identifies a hash set, explains the seen-element tracking logic, and arrives at O(n) time with O(n) space tradeoff"
      }
    }
  }
]