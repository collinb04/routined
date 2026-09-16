export default {
  id: 'sort-an-array',
  title: 'Sort an Array',
  difficulty: 'medium',
  description: 'Given an array of integers, sort the array in ascending order and return it. Implement merge sort or quicksort (O(n log n) time, O(log n) space).',
  examples: [
    { input: 'nums = [5,2,3,1]', output: '[1,2,3,5]' },
    { input: 'nums = [5,1,1,2,0,0]', output: '[0,0,1,1,2,5]' },
  ],
  constraints: ['1 ≤ nums.length ≤ 5 × 10⁴', '-5 × 10⁴ ≤ nums[i] ≤ 5 × 10⁴'],
  starterCode: `class Solution:
    def sort_array(self, nums):
        pass`,
  runnerSetup: 'sort_array = Solution().sort_array',
  functionName: 'sort_array',
  conceptId: 'sorting',
  testCases: [
    { label: 'Unsorted', args: [[5,2,3,1]], expected: [1,2,3,5] },
    { label: 'With duplicates', args: [[5,1,1,2,0,0]], expected: [0,0,1,1,2,5] },
    { label: 'Single', args: [[1]], expected: [1] },
    { label: 'Already sorted', args: [[1,2,3]], expected: [1,2,3] },
  ],
  bruteHint: 'A brute-force approach applies a simple comparison sort, repeatedly comparing and swapping adjacent elements until the array is fully ordered. That runs in O(n²) time, which at n = 50,000 means billions of operations — far too slow for the constraints here. What sorting strategy splits the work into smaller pieces to avoid that quadratic blowup?',
  optimizeComplexity: { time: 'O(n log n)', space: 'O(log n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Input size bounds tell you which time complexities are actually fast enough to finish in time. n ≤ 50,000 and the problem requires O(n log n). What does that rule out?',
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 5 × 10⁴' },
      options: [
        { label: 'Approaches that already run in O(n log n) time', isCorrect: false, feedback: 'O(n log n) is the target, not what\'s ruled out. At n = 50,000, O(n log n) is about 800,000 operations — fast enough.' },
        { label: 'Approaches that compare and shift elements one pair at a time, taking quadratic time', isCorrect: true },
        { label: 'Approaches that tally occurrences of each value directly', isCorrect: false, feedback: 'O(n) counting sort would satisfy the O(n log n) constraint and is also valid here given the bounded value range. The constraint rules out slower approaches, not faster ones.' },
        { label: 'Using recursion', isCorrect: false, feedback: 'Recursion is the natural structure for both merge sort and quicksort. The constraint is about time complexity, not implementation style.' },
      ],
      correctFeedback: 'At n = 50,000, O(n²) is 2.5 billion operations — far too slow. O(n log n) ≈ 800,000 operations. The constraint rules out selection sort, bubble sort, and insertion sort.',
      wrongFeedback: [
        'At n = 50,000, how many operations does O(n²) produce? Is that feasible?',
        '50,000² = 2.5 billion. Python handles roughly 10 million simple operations per second. How long would an O(n²) sort take?',
      ],
    },
    {
      id: 'space-constraint',
      question: 'When a problem states an explicit space bound, it narrows down which algorithms remain viable. The problem requires O(log n) space. Which sorting approach satisfies this?',
      highlight: { location: 'description', text: 'O(log n) space' },
      options: [
        { label: 'Merge sort with O(n) auxiliary array', isCorrect: false, feedback: 'Standard merge sort allocates O(n) space for the merge buffer — that violates the O(log n) space requirement. Quicksort with in-place partitioning uses only O(log n) stack space.' },
        { label: 'Quicksort with in-place partitioning', isCorrect: true },
        { label: 'Counting sort with a frequency array', isCorrect: false, feedback: 'Counting sort uses O(max_value − min_value) space for its frequency array. With values ranging from −50,000 to 50,000, that\'s 100,001 entries — O(n) not O(log n).' },
        { label: 'Both merge sort and quicksort use O(log n) space', isCorrect: false, feedback: 'Standard merge sort uses O(n) auxiliary space for the temporary merge array. Only quicksort (in-place) achieves O(log n) from recursive call stack depth alone.' },
      ],
      correctFeedback: 'In-place quicksort uses O(log n) stack space from recursion depth (on average). Merge sort needs O(n) auxiliary space for the temporary merge buffer, violating the constraint.',
      wrongFeedback: [
        'Merge sort merges two halves into a temporary array. How large is that temporary array?',
        'Compare the auxiliary space each algorithm needs: merge sort allocates an extra array during the merge step; quicksort partitions in-place with only a recursion stack. Which fits O(log n)?',
      ],
    },
    {
      id: 'duplicates',
      question: 'Repeated values in the input can silently degrade an algorithm\'s worst-case performance if not handled deliberately. The input may contain duplicates (e.g., [5,1,1,2,0,0]). How does that affect pivot choice in quicksort?',
      options: [
        { label: 'Duplicates always cause O(n²) behavior', isCorrect: false, feedback: 'Duplicates cause O(n²) only with a naive partition that puts equal elements on one side. Three-way partitioning (Dutch National Flag) handles duplicates in O(n log n) by grouping equal elements together.' },
        { label: 'Grouping elements equal to the pivot together, then recursing only on the smaller and larger groups', isCorrect: true },
        { label: 'Sort duplicates first with a counting pass', isCorrect: false, feedback: 'A counting pre-pass adds O(n) work and complexity without fixing the core partitioning issue. Three-way partition handles duplicates directly within the existing recursive structure.' },
        { label: 'Duplicates have no effect on quicksort performance', isCorrect: false, feedback: 'With a standard two-way partition, an array of all equal elements causes every partition to be maximally unbalanced — O(n²). Duplicates do matter for pivot and partition strategy.' },
      ],
      correctFeedback: 'Three-way partitioning (< pivot | == pivot | > pivot) places all equal elements in their final positions in one pass. Subarrays with many duplicates become very small, avoiding the O(n²) degenerate case.',
      wrongFeedback: [
        'What happens to a two-way quicksort partition when every element equals the pivot? Are the two halves balanced?',
        'A partition of all equal elements into [all elements | empty] gives O(n) levels of recursion — O(n²) total. What partition strategy groups equal elements together and recurses only on the unequal sides?',
      ],
    },
  ],
  solutionCode: `import random

class Solution:
    def sort_array(self, nums):
        def quicksort(lo, hi):
            if lo >= hi:
                return
            pivot_idx = random.randint(lo, hi)
            pivot = nums[pivot_idx]
            lt, gt = lo, hi
            i = lo
            while i <= gt:
                if nums[i] < pivot:
                    nums[lt], nums[i] = nums[i], nums[lt]
                    lt += 1
                    i += 1
                elif nums[i] > pivot:
                    nums[gt], nums[i] = nums[i], nums[gt]
                    gt -= 1
                else:
                    i += 1
            quicksort(lo, lt - 1)
            quicksort(gt + 1, hi)

        quicksort(0, len(nums) - 1)
        return nums`,
  solutionComplexity: { time: 'O(n log n) average', space: 'O(log n)' },
  solutionCaveat: 'Every element equal to the pivot gets swapped into the middle region and the scanning pointer <code>i</code> simply advances past it — neither recursive call ever revisits that middle region, which is exactly what keeps an all-duplicate array from degrading into the O(n²) single-element-partition worst case a plain two-way quicksort would hit.',
  solutionExplanation: 'A three-way partition splits the current range into "less than pivot," "equal to pivot," and "greater than pivot" in a single pass, instead of the usual two-way split — the equal region never needs to be sorted further, so only the two unequal regions get recursed into. Picking the pivot randomly also protects against an adversarial or already-sorted input consistently choosing the worst possible pivot, keeping the expected recursion depth at O(log n).',
}
