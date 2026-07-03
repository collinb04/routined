export default {
  id: 'bubble-sort',
  title: 'Bubble Sort',
  difficulty: 'easy',
  description: 'Implement bubble sort to sort an array of integers in ascending order. Repeatedly step through the list, compare adjacent elements, and swap them if they\'re in the wrong order. <strong>Note:</strong> <code>sorted()</code> and <code>list.sort()</code> are disabled.',
  examples: [
    { input: 'nums = [5, 1, 4, 2, 8]', output: '[1, 2, 4, 5, 8]', explanation: 'Swap adjacent pairs until no swaps are needed.' },
    { input: 'nums = [1, 2, 3]', output: '[1, 2, 3]', explanation: 'Already sorted — no swaps needed.' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 10³',
    '-10⁴ ≤ nums[i] ≤ 10⁴',
  ],
  starterCode: `def bubble_sort(nums):
  nums = nums[:]  # work on a copy
  # Hint: outer loop n times, inner loop compares adjacent pairs
  pass`,
  functionName: 'bubble_sort',
  conceptId: 'sorting',
  runnerSetup: `
import builtins as __b

def __no_sort(*a, **kw):
  raise RuntimeError("sorted() and list.sort() are disabled — implement the algorithm manually.")

__b.sorted = __no_sort
__orig_list_sort = list.sort
list.sort = lambda *a, **kw: __no_sort()
`,
  testCases: [
    { label: 'Basic', args: [[5, 1, 4, 2, 8]], expected: [1, 2, 4, 5, 8] },
    { label: 'Already sorted', args: [[1, 2, 3]], expected: [1, 2, 3] },
    { label: 'Reverse order', args: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5] },
    { label: 'Duplicates', args: [[3, 1, 2, 1, 3]], expected: [1, 1, 2, 3, 3] },
    { label: 'Single element', args: [[42]], expected: [42] },
  ],
}
