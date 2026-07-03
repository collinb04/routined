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
  starterCode: `def insertion_sort(nums):
  nums = nums[:]  # work on a copy
  # Hint: for each element, shift larger sorted elements right, then insert
  pass`,
  functionName: 'insertion_sort',
  conceptId: 'sorting',
  runnerSetup: `
import builtins as __b

def __no_sort(*a, **kw):
  raise RuntimeError("sorted() and list.sort() are disabled — implement the algorithm manually.")

__b.sorted = __no_sort
list.sort = lambda *a, **kw: __no_sort()
`,
  testCases: [
    { label: 'Basic', args: [[4, 3, 2, 10, 12, 1, 5, 6]], expected: [1, 2, 3, 4, 5, 6, 10, 12] },
    { label: 'Already sorted', args: [[1, 2, 3, 4]], expected: [1, 2, 3, 4] },
    { label: 'Reverse order', args: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5] },
    { label: 'Duplicates', args: [[3, 1, 2, 1, 3]], expected: [1, 1, 2, 3, 3] },
    { label: 'Single element', args: [[7]], expected: [7] },
  ],
}
