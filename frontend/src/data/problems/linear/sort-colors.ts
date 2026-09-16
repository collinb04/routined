export default {
  id: 'sort-colors',
  title: 'Sort Colors',
  difficulty: 'medium',
  description: 'Given an array with values 0, 1, and 2 (representing red, white, blue), sort them in-place without using a library sort. (Dutch National Flag problem)',
  examples: [
    { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' },
    { input: 'nums = [2,0,1]', output: '[0,1,2]' },
  ],
  constraints: ['n == nums.length', '1 ≤ n ≤ 300', 'nums[i] is 0, 1, or 2'],
  starterCode: `class Solution:
    def sort_colors(self, nums):
        pass
        return nums`,
  runnerSetup: 'sort_colors = Solution().sort_colors',
  functionName: 'sort_colors',
  conceptId: 'arrays',
  testCases: [
    { label: 'Mixed', args: [[2,0,2,1,1,0]], expected: [0,0,1,1,2,2] },
    { label: 'Three values', args: [[2,0,1]], expected: [0,1,2] },
    { label: 'Already sorted', args: [[0,1,2]], expected: [0,1,2] },
  ],
  bruteHint: 'A straightforward approach counts how many 0s, 1s, and 2s appear in a first pass, then overwrites the array with that many 0s, 1s, and 2s in order during a second pass — O(n) time, but two full traversals of the array. Alternatively, calling a library sort takes O(n log n) time even though the values only span three possibilities. Since a single traversal is possible here, what extra work is the two-pass counting approach — or the log-n sort — doing that is not actually necessary?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'fixed-value-domain',
      question: 'A tightly bounded set of possible values often signals which structure fits the job. "nums[i] is 0, 1, or 2" — exactly three possible values. What does this tell you about your approach?',
      highlight: { location: 'constraint', text: 'nums[i] is 0, 1, or 2' },
      options: [
        { label: 'Use a comparison sort', isCorrect: false, feedback: 'A comparison sort treats all values as unknown. When the domain is exactly {0, 1, 2}, you can exploit the structure rather than comparing everything.' },
        { label: 'Track positions for all three values', isCorrect: true },
        { label: 'Count frequencies, then rebuild', isCorrect: false, feedback: 'Counting and rebuilding works but requires two passes. The bounded domain lets you sort in a single pass by tracking where each group ends.' },
        { label: 'Recurse and divide by pivot', isCorrect: false, feedback: 'Divide-and-conquer is designed for unknown value ranges. With only three values, you can partition in O(n) with no recursion.' },
      ],
      correctFeedback: 'Exactly three values means you can maintain three regions — low (0s), mid (1s), high (2s) — and sort in one pass with three pointers.',
      wrongFeedback: [
        'The domain is {0, 1, 2} — only three distinct values. Does that let you track partitions without comparing all pairs?',
        'Three values means three regions. Can you maintain the boundary of each region with a pointer?',
      ],
    },
    {
      id: 'in-place-constraint',
      question: 'Space constraints tell you what kinds of solutions are ruled out entirely. "Sort them in-place without using a library sort." What constraint does this impose?',
      highlight: { location: 'description', text: 'sort them in-place without using a library sort.' },
      options: [
        { label: 'O(1) extra space', isCorrect: true },
        { label: 'You must use recursion', isCorrect: false, feedback: 'In-place means you cannot allocate a new array proportional to n — it says nothing about recursion. A pure iterative solution is fine.' },
        { label: 'You cannot use any extra variables', isCorrect: false, feedback: 'In-place allows a constant number of extra variables (pointers, counters). It forbids allocating an O(n) auxiliary array.' },
        { label: 'You need only one pointer', isCorrect: false, feedback: 'In-place restricts memory, not the number of pointers. You may use several pointers — they occupy O(1) space.' },
      ],
      correctFeedback: 'In-place means O(1) auxiliary space. You swap elements within the array itself; no copy of size n is allowed.',
      wrongFeedback: [
        'What does in-place mean for memory? Can you allocate a second array of size n?',
        'In-place allows O(1) extra variables but forbids an O(n) auxiliary structure. How many pointers do you need?',
      ],
    },
    {
      id: 'single-pass-opportunity',
      question: 'The name of a classic algorithm can be a direct signal about how much work — and how many passes — the optimal solution needs. The problem name hints at the Dutch National Flag algorithm. What does that suggest about the number of passes needed?',
      highlight: { location: 'description', text: '(Dutch National Flag problem)' },
      options: [
        { label: 'Three passes, one per value', isCorrect: false, feedback: 'Three passes would work, but the Dutch National Flag algorithm achieves the same result in one pass by simultaneously maintaining all three partitions.' },
        { label: 'Two passes — count then place', isCorrect: false, feedback: 'Counting then placing is O(n) but takes two passes. The Dutch National Flag approach handles all three regions in a single traversal.' },
        { label: 'One pass with three pointers', isCorrect: true },
        { label: 'One pass with one pointer', isCorrect: false, feedback: 'A single pointer cannot track three partition boundaries at once. The Dutch National Flag uses three pointers: one for the 0-boundary, one for the current element, one for the 2-boundary.' },
      ],
      correctFeedback: 'The Dutch National Flag algorithm uses low, mid, and high pointers to partition {0,1,2} in a single O(n) pass with O(1) space.',
      wrongFeedback: [
        'How many boundaries separate three groups? Can one pointer track all of them at once?',
        'Three groups need three boundary markers. If each is a pointer, how many pointers and how many passes?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def sort_colors(self, nums):
        low, mid, high = 0, 0, len(nums) - 1
        while mid <= high:
            if nums[mid] == 0:
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1
        return nums`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'After swapping a 2 to the back, <code>mid</code> does not advance — the value just swapped into <code>mid</code>\'s position came from the unexplored tail and still needs to be classified, unlike the 0-swap case where the value swapped in from <code>low</code> is already known to be a 1 (everything between <code>low</code> and <code>mid</code> is guaranteed 1 at that point).',
  solutionExplanation: 'Three pointers carve the array into four regions as the scan proceeds: definitely-0 (before <code>low</code>), definitely-1 (between <code>low</code> and <code>mid</code>), unexplored (between <code>mid</code> and <code>high</code>), and definitely-2 (after <code>high</code>). Each comparison at <code>mid</code> either grows the 0-region, grows the 1-region by just moving past a correctly-placed value, or grows the 2-region — every element is examined and placed in one pass, with the three-way split doing in a single traversal what counting-then-overwriting would need two passes for.',
}
