export default {
  id: 'merge-sort',
  title: 'Merge Sort',
  difficulty: 'medium',
  description: 'Implement merge sort to sort an array of integers in ascending order. Divide the array in half recursively, sort each half, then merge the sorted halves back together. <strong>Note:</strong> <code>sorted()</code> and <code>list.sort()</code> are disabled.',
  examples: [
    { input: 'nums = [38, 27, 43, 3, 9, 82, 10]', output: '[3, 9, 10, 27, 38, 43, 82]' },
    { input: 'nums = [2, 1]', output: '[1, 2]' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 10⁴',
    '-10⁴ ≤ nums[i] ≤ 10⁴',
  ],
  starterCode: `def merge_sort(nums):
  # Hint: base case is len <= 1; split in half, sort each, then merge
  pass`,
  functionName: 'merge_sort',
  conceptId: 'sorting',
  runnerSetup: `
import builtins as __b

def __no_sort(*a, **kw):
  raise RuntimeError("sorted() and list.sort() are disabled — implement the algorithm manually.")

__b.sorted = __no_sort
list.sort = lambda *a, **kw: __no_sort()
`,
  testCases: [
    { label: 'Basic', args: [[38, 27, 43, 3, 9, 82, 10]], expected: [3, 9, 10, 27, 38, 43, 82] },
    { label: 'Two elements', args: [[2, 1]], expected: [1, 2] },
    { label: 'Already sorted', args: [[1, 2, 3, 4, 5]], expected: [1, 2, 3, 4, 5] },
    { label: 'Duplicates', args: [[3, 1, 2, 1, 3]], expected: [1, 1, 2, 3, 3] },
    { label: 'Single element', args: [[5]], expected: [5] },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 10,000 and you\'re asked to implement merge sort explicitly. What does that tell you about expected time complexity?',
      options: [
        { label: 'O(n²) is acceptable here', isCorrect: false, feedback: 'At n = 10,000, O(n²) is 100 million operations — too slow. The problem explicitly names merge sort, which runs in O(n log n). That naming is the signal.' },
        { label: 'O(n log n) is the target', isCorrect: true },
        { label: 'O(log n) divide-and-conquer suffices', isCorrect: false, feedback: 'O(log n) would mean processing only log₂(10,000) ≈ 13 elements total — you can\'t sort an array without reading all n of it. Divide-and-conquer does O(log n) levels, but each level does O(n) work.' },
        { label: 'Input size doesn\'t constrain the approach', isCorrect: false, feedback: 'Input size always constrains the approach. n ≤ 10,000 rules out O(n²) bubblesort-style solutions and the problem title confirms the expected class of algorithm.' },
      ],
      correctFeedback: 'Merge sort divides log₂(10,000) ≈ 14 levels deep, doing O(n) merge work at each level — O(n log n) total. At n = 10,000 that\'s about 140,000 operations, well within budget.',
      wrongFeedback: [
        'The problem names the algorithm. What is the standard time complexity of merge sort?',
        'Merge sort does O(log n) recursive splits and O(n) merge work per level. Multiply those together.',
      ],
    },
    {
      id: 'divide-conquer-structure',
      question: 'The description says "divide the array in half recursively, sort each half, then merge." What is the required base case?',
      options: [
        { label: 'When the array is already sorted', isCorrect: false, feedback: 'Checking whether an array is sorted takes O(n) time and doesn\'t stop the recursion correctly — a sorted array of length 5 still needs to be split. The base case is about size, not sortedness.' },
        { label: 'When length ≤ 1', isCorrect: true },
        { label: 'When two elements remain', isCorrect: false, feedback: 'You can merge two elements, but a single element is also a valid recursive call that must return without splitting. Stopping at length ≤ 1 is simpler and handles both cases.' },
        { label: 'When left half equals right half', isCorrect: false, feedback: 'Equal halves is a coincidence, not a termination condition. The recursion terminates when there\'s nothing left to split — length 0 or 1.' },
      ],
      correctFeedback: 'An array of length 0 or 1 is already sorted by definition — nothing to do. Every correct recursive implementation returns immediately at that point.',
      wrongFeedback: [
        'What is the smallest array that cannot be divided further?',
        'Recursion terminates when a subproblem requires no more work. What size array needs no sorting?',
      ],
    },
    {
      id: 'merge-step',
      question: 'The merge step combines two sorted halves into one sorted array. What must it preserve?',
      options: [
        { label: 'The original unsorted order', isCorrect: false, feedback: 'The merge step is exactly where you establish sorted order. Preserving the original order would undo the purpose of sorting.' },
        { label: 'Relative order of equal elements (stability)', isCorrect: true },
        { label: 'Only the minimum of each pair', isCorrect: false, feedback: 'Taking only the minimum discards elements — you\'d lose half the array. The merge must incorporate every element from both halves.' },
        { label: 'The pivot element from the split', isCorrect: false, feedback: 'Pivots are a quicksort concept. Merge sort splits at the midpoint without designating any element as a pivot — it merges by comparing front elements of each half.' },
      ],
      correctFeedback: 'Merge sort is stable: when two elements are equal, the one from the left half comes first, preserving their relative order from the input.',
      wrongFeedback: [
        'When two elements are equal during the merge, which one should come first — and why does that matter?',
        'Stability means equal elements keep their relative input order. Merge sort achieves this by preferring the left half on ties.',
      ],
    },
    {
      id: 'output-structure',
      question: 'The output is a sorted array (not an index, not a boolean). What does the merge step need to return?',
      options: [
        { label: 'The index where the split occurred', isCorrect: false, feedback: 'The split index is used internally to divide the array, but the caller needs the merged sorted elements — not a position.' },
        { label: 'A new sorted list combining both halves', isCorrect: false, feedback: 'This is acceptable, but merge sort is often implemented to sort in-place by writing back into the original array slice — both approaches are valid.' },
        { label: 'A merged sorted sequence', isCorrect: true },
        { label: 'The count of swaps performed', isCorrect: false, feedback: 'Swap counts are useful for analysis but the problem asks for the sorted array itself, not metadata about how it was sorted.' },
      ],
      correctFeedback: 'Each merge call returns a sorted sequence of all elements from both halves. The recursion builds the final sorted array bottom-up from single-element base cases.',
      wrongFeedback: [
        'What does each level of the recursion need to hand back to the level above it?',
        'The top-level call must return the fully sorted array. What must each recursive merge call return to make that possible?',
      ],
    },
  ],
}
