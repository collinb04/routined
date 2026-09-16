export default {
  id: 'bubble-sort',
  title: 'Bubble Sort',
  difficulty: 'easy',
  description: 'Implement bubble sort to sort an array of integers in ascending order. Repeatedly step through the list, compare adjacent elements, and swap them if they\'re in the wrong order. <strong>Note:</strong> <code>sorted()</code> is disabled — implement the swapping yourself.',
  examples: [
    { input: 'nums = [5, 1, 4, 2, 8]', output: '[1, 2, 4, 5, 8]', explanation: 'Swap adjacent pairs until no swaps are needed.' },
    { input: 'nums = [1, 2, 3]', output: '[1, 2, 3]', explanation: 'Already sorted — no swaps needed.' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 10³',
    '-10⁴ ≤ nums[i] ≤ 10⁴',
  ],
  starterCode: `class Solution:
    def bubble_sort(self, nums):
        nums = nums[:]  # work on a copy
        # Hint: outer loop n times, inner loop compares adjacent pairs
        pass`,
  functionName: 'bubble_sort',
  conceptId: 'sorting',
  runnerSetup: `
import builtins as __b

def __no_sort(*a, **kw):
  raise RuntimeError("sorted() is disabled — implement the algorithm manually.")

__b.sorted = __no_sort
bubble_sort = Solution().bubble_sort
`,
  testCases: [
    { label: 'Basic', args: [[5, 1, 4, 2, 8]], expected: [1, 2, 4, 5, 8] },
    { label: 'Already sorted', args: [[1, 2, 3]], expected: [1, 2, 3] },
    { label: 'Reverse order', args: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5] },
    { label: 'Duplicates', args: [[3, 1, 2, 1, 3]], expected: [1, 1, 2, 3, 3] },
    { label: 'Single element', args: [[42]], expected: [42] },
  ],
  bruteHint: 'The direct approach walks through the array comparing each pair of neighboring elements and swapping them when they\'re out of order, then repeats that full pass again and again until nothing moves. Since you may need up to n passes and each pass scans up to n elements, this costs O(n²) time in the worst case. What happens to the largest unsorted element during a single left-to-right pass?',
  optimizeComplexity: { time: 'O(n²)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Numeric bounds in the constraints reveal which time complexities are affordable. n ≤ 1,000 tells you…',
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 10³' },
      options: [
        { label: 'O(n²) is acceptable here', isCorrect: true },
        { label: 'O(n log n) is required', isCorrect: false, feedback: 'O(n log n) would be efficient, but the constraint isn\'t that tight. At n = 1,000, even O(n²) is only 1 million operations — well within reach.' },
        { label: 'O(n) is required', isCorrect: false, feedback: 'O(n) would be the fastest possible, but the constraint doesn\'t demand it. Think about what 1,000² equals and whether that\'s fast enough.' },
        { label: 'Input size doesn\'t affect algorithm choice', isCorrect: false, feedback: 'Input size always constrains which complexities are viable. At n = 1,000, work backwards from the constraint to see what you can afford.' },
      ],
      correctFeedback: 'At n = 1,000, O(n²) is 1 million operations — fast enough. Bubble sort\'s nested loop is exactly O(n²), which fits.',
      wrongFeedback: [
        'With n = 1,000, how many operations does a nested loop perform at worst?',
        'A nested loop at n = 1,000 runs 1,000 × 1,000 = 1 million times. Is that fast enough to be acceptable?',
      ],
    },
    {
      id: 'algorithm-mechanism',
      question: 'The exact wording of the problem description often encodes how the algorithm must behave. "Compare adjacent elements and swap them if they\'re in the wrong order." This implies…',
      highlight: { location: 'description', text: 'compare adjacent elements, and swap them if they\'re in the wrong order.' },
      options: [
        { label: 'Find the minimum and move it to the front', isCorrect: false, feedback: 'Finding and placing the minimum is selection sort, not bubble sort. Bubble sort only ever compares neighbors — it doesn\'t search for a global minimum.' },
        { label: 'Largest unsorted element rises to its position each pass', isCorrect: true },
        { label: 'Build sorted prefix by inserting each element', isCorrect: false, feedback: 'Inserting each element into a sorted prefix is insertion sort. Bubble sort works on adjacent pairs throughout the whole array each pass.' },
        { label: 'Partition around a pivot each pass', isCorrect: false, feedback: 'Partitioning around a pivot is quicksort. Bubble sort never picks a pivot — it only compares and swaps neighbors.' },
      ],
      correctFeedback: 'Each full pass guarantees the largest remaining element has "bubbled up" to its final position. After k passes, the k largest elements are in place.',
      wrongFeedback: [
        'What happens to the largest element if you compare every adjacent pair from left to right?',
        'After one full left-to-right pass of adjacent swaps, which element reaches its final position?',
      ],
    },
    {
      id: 'termination-condition',
      question: 'Example cases that require no extra work often hint at a possible early-exit optimization. "No swaps needed" for the already-sorted case. What does this suggest about an optimization?',
      options: [
        { label: 'Always run exactly n passes', isCorrect: false, feedback: 'Running n passes regardless is correct but wasteful. The already-sorted example hints that you can detect early when the array is done.' },
        { label: 'Skip the inner loop if array length is 1', isCorrect: false, feedback: 'Handling length-1 is a special case, not the general optimization. The already-sorted example with length 3 still terminates early — why?' },
        { label: 'Track whether any swap happened; exit early if none', isCorrect: true },
        { label: 'Check only the middle element to guess when sorting is done', isCorrect: false, feedback: 'Binary search isn\'t applicable here — you can\'t binary-search for swaps across adjacent pairs. The hint is about detecting a pass with no swaps.' },
      ],
      correctFeedback: 'If a full pass produces zero swaps, the array is already sorted and you can stop immediately. This makes the best case O(n) instead of O(n²).',
      wrongFeedback: [
        'The already-sorted case requires no swaps at all. What could you check during a pass to know you\'re done early?',
        'One boolean flag per pass is enough. If no swaps happened during the entire inner loop, what does that tell you?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def bubble_sort(self, nums):
        nums = nums[:]
        n = len(nums)
        for i in range(n):
            for j in range(n - 1 - i):
                if nums[j] > nums[j + 1]:
                    nums[j], nums[j + 1] = nums[j + 1], nums[j]
        return nums`,
  solutionComplexity: { time: 'O(n²)', space: 'O(1) extra (O(n) for the copy)' },
  solutionCaveat: 'Each outer pass bubbles the next-largest remaining value into its final position at the end, so the inner loop\'s upper bound shrinks by one each time (<code>n - 1 - i</code>) — re-comparing the already-settled tail on every pass would just be wasted work.',
  solutionExplanation: 'Every pass walks the array comparing neighbors and swapping any pair that\'s out of order, which pushes the largest unsorted value one step closer to the end each time it\'s involved in a swap. After enough passes, the largest value has bubbled all the way to the last position, the second largest to the second-to-last, and so on — which is exactly why the inner loop\'s range shrinks by one on every outer iteration.',
}
