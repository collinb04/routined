export default {
  id: 'find-all-numbers-disappeared',
  title: 'Find All Numbers Disappeared in an Array',
  difficulty: 'easy',
  description: 'Given an array of n integers in the range [1, n], some elements appear twice and others once. Find all numbers in [1, n] that do not appear. Return them without extra space and in O(n) time.',
  examples: [
    { input: 'nums = [4,3,2,7,8,2,3,1]', output: '[5,6]' },
    { input: 'nums = [1,1]', output: '[2]' },
  ],
  constraints: ['n == nums.length', '1 ≤ n ≤ 10⁵', '1 ≤ nums[i] ≤ n'],
  starterCode: `class Solution:
    def find_disappeared_numbers(self, nums):
        pass`,
  runnerSetup: 'find_disappeared_numbers = Solution().find_disappeared_numbers',
  functionName: 'find_disappeared_numbers',
  conceptId: 'arrays',
  testCases: [
    { label: 'Missing 5,6', args: [[4,3,2,7,8,2,3,1]], expected: [5,6] },
    { label: 'Missing 2', args: [[1,1]], expected: [2] },
    { label: 'None missing', args: [[1,2,3]], expected: [] },
  ],
  bruteHint: 'The brute-force approach tracks which values you\'ve seen — a hash set or a boolean array of size n, marked as you scan nums — then walks 1 through n and collects every value that was never marked. That works in O(n) time, but it needs O(n) extra space for the tracking structure itself. At n up to 10⁵, that\'s a second array or set the size of the input just to remember what you\'ve visited — does that satisfy "without extra space"?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'on-time-constraint',
      question: 'A time-complexity requirement stated directly in the problem tells you which categories of approach are already off the table. "O(n) time." What approach does this explicitly rule out?',
      options: [
        { label: 'Any use of a hash set', isCorrect: false, feedback: 'A hash set supports O(1) average lookup and insertion, so building one from n elements takes O(n) total. A hash set is compatible with O(n) time.' },
        { label: 'Sorting to find gaps', isCorrect: true },
        { label: 'A single linear scan of the array', isCorrect: false, feedback: 'A single linear scan is O(n) — that\'s the goal, not something it rules out. The O(n) requirement is pointing you toward approaches that visit each element a constant number of times.' },
        { label: 'Returning multiple values', isCorrect: false, feedback: 'Returning a list of results doesn\'t affect time complexity. The constraint is about how many operations you perform, not the size of the output.' },
      ],
      correctFeedback: 'Sorting takes O(n log n), which exceeds the O(n) requirement at n = 10⁵. The constraint pushes you toward a single-pass approach.',
      wrongFeedback: [
        'What is the time complexity of sorting? Compare it to O(n) — does it satisfy the requirement?',
        'O(n log n) > O(n) for any n > 1. If sorting takes O(n log n), does a sort-then-scan approach satisfy the constraint?',
      ],
      highlight: { location: 'description', text: 'O(n) time' },
    },
    {
      id: 'values-as-indices',
      question: 'When a value\'s allowed range mirrors the array\'s own index range, that overlap usually signals a way to reuse the array itself as your lookup structure. "1 ≤ nums[i] ≤ n" and "n == nums.length". What technique does this value range enable?',
      options: [
        { label: 'Binary search for missing values', isCorrect: false, feedback: 'Binary search requires a sorted array and takes O(log n) per query — that\'s O(n log n) total to find all missing values. The constraint is enabling something simpler and faster.' },
        { label: 'Using values as indices into the same array', isCorrect: false },
        { label: 'Negate the value at each visited index', isCorrect: true },
        { label: 'Comparing each element to its index', isCorrect: false, feedback: 'Comparing element to index works only if the array is sorted. With duplicates, elements won\'t match their ideal positions — you need to actively mark which values have been seen.' },
      ],
      correctFeedback: 'Each value v in [1, n] is a valid index (v-1). Negate nums[v-1] to mark "value v has been seen." After one pass, positions that are still positive correspond to missing values.',
      wrongFeedback: [
        'If you see value 3, you can visit index 2. What could you do to the element at index 2 to record "3 has been seen," without using any extra space?',
        'Negating an element at a position is a reversible in-place marker. After marking, how do you identify which positions were never marked?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ nums[i] ≤ n' },
    },
    {
      id: 'no-extra-space',
      question: 'A restriction on extra space tells you which data structures are off-limits, no matter how convenient they\'d otherwise be. "Return them without extra space." What does this rule out?',
      options: [
        { label: 'The result list you return', isCorrect: false, feedback: 'Output lists are not counted as "extra space" — the problem is asking you to return something. The constraint refers to auxiliary working space beyond the input and output.' },
        { label: 'A set or boolean array of size n', isCorrect: true },
        { label: 'Modifying the input array', isCorrect: false, feedback: 'Modifying the input in place is exactly what the no-extra-space constraint is nudging you toward. Using the input array as your marker storage avoids allocating anything new.' },
        { label: 'Using integer variables', isCorrect: false, feedback: 'A fixed number of integer variables is O(1) space — well within "no extra space." The constraint is about structures that scale with n, not about a loop counter or index variable.' },
      ],
      correctFeedback: 'A boolean array or hash set of size n would use O(n) extra space. The constraint requires you to use the input array itself as your working storage.',
      wrongFeedback: [
        'Which approach here allocates n additional slots — a boolean array, or negating elements in the existing array?',
        'O(1) extra space means auxiliary storage must be constant. A structure of size n fails that. Which approach avoids allocating anything proportional to n?',
      ],
      highlight: { location: 'description', text: 'without extra space' },
    },
  ],
  solutionCode: `class Solution:
    def find_disappeared_numbers(self, nums):
        for n in nums:
            idx = abs(n) - 1
            if nums[idx] > 0:
                nums[idx] = -nums[idx]
        return [i + 1 for i, n in enumerate(nums) if n > 0]`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'Reading <code>abs(n)</code> rather than <code>n</code> when computing the index is essential on the second pass over an already-negated slot — otherwise a value negated earlier would compute a nonsensical negative index the next time it is encountered.',
  solutionExplanation: 'Since every value lies in [1, n], each one names a valid index it can "visit" by negating that slot — after one pass, every value that actually appeared has left its mark (a negative sign) at its own index. Whatever slot is still positive afterward was never visited by any value in the array, meaning that slot\'s number (<code>index + 1</code>) never appeared — exactly the set of missing numbers, recovered with no structure beyond the input array itself.',
}
