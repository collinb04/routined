export default {
  id: 'insertion-sort',
  title: 'Insertion Sort',
  difficulty: 'easy',
  description: 'Implement insertion sort to sort an array of integers in ascending order. Build the sorted portion one element at a time by inserting each new element into its correct position. <strong>Note:</strong> <code>sorted()</code> and <code>list.sort()</code> are disabled.',
  examples: [
    { input: 'nums = [4, 3, 2, 10, 12, 1, 5, 6]', output: '[1, 2, 3, 4, 5, 6, 10, 12]' },
    { input: 'nums = [1]', output: '[1]' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 10³',
    '-10⁴ ≤ nums[i] ≤ 10⁴',
  ],
  starterCode: `class Solution:
    def insertion_sort(self, nums):
        pass`,
  functionName: 'insertion_sort',
  conceptId: 'sorting',
  runnerSetup: `
import builtins as __b

def __no_sort(*a, **kw):
  raise RuntimeError("sorted() and list.sort() are disabled — implement the algorithm manually.")

__b.sorted = __no_sort
insertion_sort = Solution().insertion_sort
`,
  testCases: [
    { label: 'Basic', args: [[4, 3, 2, 10, 12, 1, 5, 6]], expected: [1, 2, 3, 4, 5, 6, 10, 12] },
    { label: 'Already sorted', args: [[1, 2, 3, 4]], expected: [1, 2, 3, 4] },
    { label: 'Reverse order', args: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5] },
    { label: 'Duplicates', args: [[3, 1, 2, 1, 3]], expected: [1, 1, 2, 3, 3] },
    { label: 'Single element', args: [[7]], expected: [7] },
  ],
  bruteHint: 'Insertion sort builds the sorted portion one element at a time: for each new element, shift every larger element in the sorted prefix one position to the right, then drop the new element into the resulting gap. In the worst case — a reverse-sorted array — every new element must shift past all previously sorted elements, giving O(n²) time overall. What loop structure lets you shift elements right while searching backward for the insertion point?',
  optimizeComplexity: { time: 'O(n²)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 10³' },
      question: 'Constraint bounds tell you which complexities are acceptable before you write a single line of code. n ≤ 1,000 tells you…',
      options: [
        { label: 'O(n log n) is required', isCorrect: false, feedback: 'O(n log n) would be faster but isn\'t required here. At n = 1,000, O(n²) is 1 million operations — well within reach. The constraint permits the simpler nested-loop approach.' },
        { label: 'O(n²) is acceptable', isCorrect: true },
        { label: 'The array must be split in half recursively', isCorrect: false, feedback: 'Divide-and-conquer (merge sort, quicksort) targets O(n log n) and isn\'t signaled by n = 1,000. The constraint is permissive enough for a simpler O(n²) approach.' },
        { label: 'Input size doesn\'t affect algorithm choice', isCorrect: false, feedback: 'Input size always constrains which complexities are viable. At n = 1,000, n² = 1 million — that\'s the budget you\'re working within.' },
      ],
      correctFeedback: 'At n = 1,000, O(n²) is 1 million operations — fast enough. Insertion sort\'s outer loop runs n − 1 times and the inner shift loop runs up to i times each, fitting squarely in O(n²).',
      wrongFeedback: [
        'With n = 1,000, how many operations does a nested loop perform at worst?',
        'A nested loop at n = 1,000 runs at most 1,000 × 1,000 = 1 million times. That\'s acceptable — the constraint is permissive, not tight.',
      ],
    },
    {
      id: 'algorithm-mechanism',
      highlight: { location: 'description', text: 'each new element into its correct position' },
      question: 'The problem description often names the core mechanic you need to implement. "Insert each new element into its correct position" in the sorted prefix. This implies…',
      options: [
        { label: 'Compare every adjacent pair and swap if out of order', isCorrect: false, feedback: 'Comparing all adjacent pairs across the whole array each pass is bubble sort, not insertion sort. Insertion sort works on one new element at a time, shifting only the sorted prefix to make room.' },
        { label: 'Shift larger sorted elements right to open a slot, then place the element', isCorrect: true },
        { label: 'Find the minimum of the unsorted portion and swap it to the front', isCorrect: false, feedback: 'Finding the minimum of the unsorted portion and placing it is selection sort. Insertion sort doesn\'t search the unsorted portion for a minimum — it takes the next element and places it into the sorted prefix.' },
        { label: 'Divide the array in half and sort each half independently', isCorrect: false, feedback: 'Dividing into halves is merge sort\'s strategy. Insertion sort grows a sorted prefix one element at a time — it doesn\'t split the array.' },
      ],
      correctFeedback: 'Pick nums[i], then shift every sorted element larger than it one position right. The gap left behind is exactly where nums[i] belongs. After n − 1 such insertions, the array is sorted.',
      wrongFeedback: [
        'You\'re inserting into a sorted prefix. To make room for the new element, what do you do to elements that are larger than it?',
        'Shift elements larger than the key one step to the right. When you hit an element that\'s ≤ the key (or the start of the array), that\'s the insertion point.',
      ],
    },
    {
      id: 'best-case-behavior',
      question: 'Test cases can reveal edge-case behavior that shapes an algorithm\'s real-world performance. "Already sorted" is one of the test cases. What is insertion sort\'s complexity on an already-sorted array?',
      options: [
        { label: 'O(n²) — same as the worst case', isCorrect: false, feedback: 'On a sorted array, the inner loop never shifts — each element is already in place. That reduces the total work to n − 1 comparisons, which is O(n), not O(n²).' },
        { label: 'O(n) — the inner loop body never executes', isCorrect: true },
        { label: 'O(log n) — repeatedly halving the search range locates the insertion point', isCorrect: false, feedback: 'Binary search could find the insertion point in O(log n), but you still need O(n) shifts in the worst case. On a sorted array the shift loop does zero work, giving O(n) total — not O(log n).' },
        { label: 'O(1) — no work is needed', isCorrect: false, feedback: 'You still need to iterate through all n elements to confirm each is already in place. That\'s O(n) comparisons even when no shifts are made.' },
      ],
      correctFeedback: 'On a sorted array, every element is already ≥ all preceding elements, so the inner shift loop exits immediately after one comparison. The outer loop still runs n − 1 times, giving O(n) total.',
      wrongFeedback: [
        'For each element in a sorted array, how many shifts does the inner loop perform before finding the correct position?',
        'Zero shifts per element — each element is already in position. The outer loop iterates n − 1 times, but the inner body never runs. That\'s O(n).',
      ],
    },
  ],
  solutionCode: `class Solution:
    def insertion_sort(self, nums):
        nums = nums[:]
        for i in range(1, len(nums)):
            key = nums[i]
            j = i - 1
            while j >= 0 and nums[j] > key:
                nums[j + 1] = nums[j]
                j -= 1
            nums[j + 1] = key
        return nums`,
  solutionComplexity: { time: 'O(n²) worst case, O(n) best case', space: 'O(1) extra' },
  solutionCaveat: 'Shifting stops as soon as a sorted element <code>&lt;= key</code> is found — not <code>&lt;</code> — which preserves the relative order of equal elements exactly as they appeared in the input, a property (stability) that would break if the comparison flipped.',
  solutionExplanation: 'The array is conceptually split into a sorted prefix (already placed) and an unsorted remainder — each iteration takes the next unsorted element and shifts every larger element in the sorted prefix one slot to the right until it finds the key\'s correct resting place, exactly how a person sorts playing cards in hand one at a time. On an already-sorted input, no element is ever larger than the key, so the inner loop never shifts anything, which is what makes the best case O(n) instead of O(n²).',
}
