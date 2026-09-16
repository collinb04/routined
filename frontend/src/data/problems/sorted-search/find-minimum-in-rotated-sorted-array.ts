export default {
  id: 'find-minimum-in-rotated-sorted-array',
  title: 'Find Minimum in Rotated Sorted Array',
  difficulty: 'medium',
  description: `<p>Suppose an array of length <code>n</code> sorted in ascending order is rotated between 1 and <code>n</code> times. Given the sorted rotated array <code>nums</code> of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.</p>`,
  examples: [
    { input: 'nums = [3,4,5,1,2]', output: '1' },
    { input: 'nums = [4,5,6,7,0,1,2]', output: '0' },
  ],
  constraints: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All elements are unique'],
  starterCode: `class Solution:
    def find_min(self, nums):
        pass`,
  runnerSetup: 'find_min = Solution().find_min',
  functionName: 'find_min',
  conceptId: 'binary-search',
  testCases: [
    { label: '[3,4,5,1,2]', args: [[3,4,5,1,2]], expected: 1 },
    { label: '[4,5,6,7,0,1,2]', args: [[4,5,6,7,0,1,2]], expected: 0 },
    { label: '[11,13,15,17]', args: [[11,13,15,17]], expected: 11 },
  ],
  bruteHint: 'The brute-force approach is a linear scan: iterate through nums once, keeping track of the smallest value seen, in O(n) time and O(1) space. It\'s simple and always correct, but the problem explicitly caps you at O(log n) time. Since nums is sorted and only rotated, what could you compare at each step to eliminate half of the remaining array?',
  clues: [
    {
      id: 'time-constraint',
      highlight: { location: 'description', text: 'You must write an algorithm that runs in O(log n) time.' },
      question: 'An explicit complexity requirement is one of the strongest signals a problem gives you about which approaches are even allowed. "Must run in O(log n) time." With n ≤ 5000, what does this requirement rule out?',
      options: [
        { label: 'Checking every element one by one to find the minimum', isCorrect: true },
        { label: 'Any comparison-based approach', isCorrect: false, feedback: 'Comparison-based approaches are fine — binary search is comparison-based and runs in O(log n). O(log n) rules out linear work, not comparisons in general.' },
        { label: 'Accessing elements by index', isCorrect: false, feedback: 'Index access is O(1) and is used in every array algorithm including binary search. The O(log n) requirement restricts how many elements you visit, not how you access them.' },
        { label: 'Nothing — O(n) is fine for n = 5000', isCorrect: false, feedback: 'The problem explicitly requires O(log n), regardless of n\'s size. A linear scan would be trivially correct but violates the stated complexity requirement.' },
      ],
      correctFeedback: 'A linear scan is O(n) — trivially correct but disallowed. O(log n) means you must eliminate half the array per step, which points directly to binary search.',
      wrongFeedback: [
        'O(log n) is slower than O(n) at small inputs but the requirement is about asymptotic behavior. What kind of algorithm eliminates half the search space per step?',
        'Only binary search achieves O(log n) on a sorted or partially-sorted array. Scanning or checking every element is O(n).',
      ],
    },
    {
      id: 'rotation-structure',
      highlight: { location: 'description', text: 'sorted in ascending order is rotated between 1 and <code>n</code> times' },
      question: 'Recognizing structural guarantees about how the input is arranged is often the key to eliminating large chunks of it at once. A rotated sorted array like [4,5,6,7,0,1,2] has a pivot where the order "resets." What property lets binary search still work?',
      options: [
        { label: 'The minimum is always at index n//2', isCorrect: false, feedback: 'The rotation can land the minimum anywhere from index 1 to n-1 — it\'s not fixed at the midpoint. In [3,4,5,1,2] the minimum is at index 3, not index 2.' },
        { label: 'One half of the array is always fully sorted', isCorrect: true },
        { label: 'The maximum is always at index 0 after rotation', isCorrect: false, feedback: 'Only if the rotation is by exactly 1 step. In [4,5,6,7,0,1,2] the maximum is 7 at index 3, not index 0. Rotation amount varies.' },
        { label: 'All elements are positive, so comparisons are unambiguous', isCorrect: false, feedback: 'Elements can be negative (constraints allow -5000). The uniqueness property is what matters — it ensures that comparing nums[mid] to nums[right] unambiguously identifies which half is sorted.' },
      ],
      correctFeedback: 'In a rotated sorted array, the midpoint divides it into two halves: one is sorted end-to-end. Compare nums[mid] to nums[right] — if nums[mid] < nums[right], the right half is sorted and the minimum is in the left half.',
      wrongFeedback: [
        'Look at [4,5,6,7,0,1,2] and pick the midpoint (7). Is either side of 7 entirely sorted?',
        'For any midpoint, exactly one side is sorted (no "reset" within it). Compare nums[mid] to nums[right]: if nums[mid] < nums[right], the right half is sorted, meaning the minimum is on the left.',
      ],
    },
    {
      id: 'unique-elements-guarantee',
      highlight: { location: 'constraint', text: 'All elements are unique' },
      question: 'A uniqueness constraint can quietly remove an entire category of edge cases you\'d otherwise have to handle. "All elements are unique." How does this simplify the binary search decision?',
      options: [
        { label: 'You can skip duplicate checks in the comparison', isCorrect: false, feedback: 'That\'s a consequence but not the key insight. Uniqueness matters because it ensures nums[mid] ≠ nums[right], so the comparison nums[mid] < nums[right] always resolves unambiguously.' },
        { label: 'nums[mid] ≠ nums[right] always, so < or > is never ambiguous', isCorrect: true },
        { label: 'The minimum is guaranteed to be distinct, so you can stop early', isCorrect: false, feedback: 'Early stopping is always available (stop when left == right), but it doesn\'t depend on uniqueness. Uniqueness removes the ambiguous case where nums[mid] == nums[right].' },
        { label: 'Rearranging the array into order first is unnecessary because all elements differ', isCorrect: false, feedback: 'The array comes pre-sorted (then rotated) — sorting isn\'t your job. Uniqueness matters for the binary search comparison, not for whether the array is ordered.' },
      ],
      correctFeedback: 'With all unique elements, nums[mid] is never equal to nums[right]. Every comparison resolves to strictly less than or strictly greater than, so you always know which half to eliminate.',
      wrongFeedback: [
        'The hard version of this problem allows duplicates. What goes wrong in the decision step when nums[mid] == nums[right]?',
        'When nums[mid] == nums[right], you can\'t tell if the right half is sorted or wraps around the rotation point. Uniqueness prevents that case entirely.',
      ],
    },
  ],
  optimizeComplexity: { time: 'O(log n)', space: 'O(1)' },
  solutionCode: `class Solution:
    def find_min(self, nums):
        lo, hi = 0, len(nums) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] > nums[hi]:
                lo = mid + 1
            else:
                hi = mid
        return nums[lo]`,
  solutionExplanation: 'Comparing the middle element to the rightmost element always reveals which half contains the rotation point: if <code>nums[mid] > nums[hi]</code>, the array must wrap around somewhere to the right of <code>mid</code> (since a normal ascending run couldn\'t have a bigger value followed later by a smaller one), so the minimum lives in the right half; otherwise the right half from <code>mid</code> onward is already in ascending order, and the minimum is <code>mid</code> or somewhere to its left. Because every comparison is guaranteed to eliminate half the remaining search space, the loop narrows to a single element in O(log n) steps — the uniqueness guarantee is what makes this comparison always decisive.',
}
