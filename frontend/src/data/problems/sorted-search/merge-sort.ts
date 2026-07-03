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
}
