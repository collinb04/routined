export interface TestCase {
  label: string
  args: any[]
  expected: any
}

export interface Example {
  input: string
  output: string
  explanation?: string
}

export interface ClueOption {
  label: string
  isCorrect: boolean
}

export interface ClueCard {
  id: string
  question: string
  options: ClueOption[]
  correctFeedback: string
  wrongFeedback: string[]
}

export interface Problem {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  description: string
  examples: Example[]
  constraints: string[]
  starterCode: string
  functionName: string
  testCases: TestCase[]
  conceptId: string
  runnerSetup?: string
  clues?: ClueCard[]
  bruteSeedMessage?: string
  optimizeSeedMessage?: string
  bruteHint?: string
  optimizeHint?: string
}

export const PROBLEMS: Problem[] = [
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'easy',
    description: 'Given an integer array <code>nums</code>, return <code>true</code> if any value appears at least twice, and <code>false</code> if every element is distinct.',
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: 'true', explanation: '1 appears at index 0 and 3.' },
      { input: 'nums = [1, 2, 3, 4]', output: 'false', explanation: 'All elements are distinct.' },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 10⁵',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
    ],
    starterCode: `def contains_duplicate(nums):
    pass`,
    functionName: 'contains_duplicate',
    conceptId: 'arrays',
    testCases: [
      { label: 'Has duplicate', args: [[1, 2, 3, 1]], expected: true },
      { label: 'All unique', args: [[1, 2, 3, 4]], expected: false },
      { label: 'Single element', args: [[1]], expected: false },
      { label: 'Multiple duplicates', args: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
    ],
  },
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'easy',
    description: 'After removing all non-alphanumeric characters and lowercasing, return <code>true</code> if the string reads the same forward and backward.',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
    ],
    constraints: [
      '1 ≤ s.length ≤ 2 × 10⁵',
      's consists only of printable ASCII characters',
    ],
    starterCode: `def is_palindrome(s):
    pass`,
    functionName: 'is_palindrome',
    conceptId: 'strings',
    testCases: [
      { label: 'Classic phrase', args: ['A man, a plan, a canal: Panama'], expected: true },
      { label: 'Not palindrome', args: ['race a car'], expected: false },
      { label: 'Single space', args: [' '], expected: true },
      { label: 'Pure alpha', args: ['racecar'], expected: true },
    ],
  },
  {
    id: 'two-sum-ii',
    title: 'Two Sum II',
    difficulty: 'easy',
    description: 'Given a <strong>1-indexed</strong> sorted array <code>numbers</code> and a <code>target</code>, return the indices of the two numbers that add up to target as <code>[index1, index2]</code>. Use O(1) extra space.',
    examples: [
      { input: 'numbers = [2, 7, 11, 15], target = 9', output: '[1, 2]', explanation: 'numbers[1] + numbers[2] = 2 + 7 = 9.' },
      { input: 'numbers = [2, 3, 4], target = 6', output: '[1, 3]', explanation: 'numbers[1] + numbers[3] = 2 + 4 = 6.' },
    ],
    constraints: [
      '2 ≤ numbers.length ≤ 3 × 10⁴',
      'numbers is sorted in non-decreasing order',
      'Exactly one solution exists',
    ],
    starterCode: `def two_sum_ii(numbers, target):
    pass`,
    functionName: 'two_sum_ii',
    conceptId: 'two-pointers',
    testCases: [
      { label: 'Basic', args: [[2, 7, 11, 15], 9], expected: [1, 2] },
      { label: 'Middle pair', args: [[2, 3, 4], 6], expected: [1, 3] },
      { label: 'Negative numbers', args: [[-1, 0], -1], expected: [1, 2] },
      { label: 'Last two', args: [[1, 2, 3, 4, 5], 9], expected: [4, 5] },
    ],
  },
  {
    id: 'max-average-subarray',
    title: 'Maximum Average Subarray I',
    difficulty: 'easy',
    description: 'Given an integer array <code>nums</code> and an integer <code>k</code>, find the contiguous subarray of length <code>k</code> with the maximum average value and return that average.',
    examples: [
      { input: 'nums = [1, 12, -5, -6, 50, 3], k = 4', output: '12.75', explanation: 'Window [12, -5, -6, 50] averages to 51 / 4 = 12.75.' },
      { input: 'nums = [5], k = 1', output: '5.0' },
    ],
    constraints: [
      '1 ≤ k ≤ nums.length ≤ 10⁵',
      '-10⁴ ≤ nums[i] ≤ 10⁴',
    ],
    starterCode: `def find_max_average(nums, k):
    pass`,
    functionName: 'find_max_average',
    conceptId: 'sliding-window',
    testCases: [
      { label: 'Basic', args: [[1, 12, -5, -6, 50, 3], 4], expected: 12.75 },
      { label: 'Single element', args: [[5], 1], expected: 5.0 },
      { label: 'All same', args: [[3, 3, 3, 3], 2], expected: 3.0 },
      { label: 'k equals length', args: [[1, 2, 3, 4], 4], expected: 2.5 },
    ],
  },
  {
    id: 'range-sum-query',
    title: 'Range Sum Query',
    difficulty: 'easy',
    description: 'Given an integer array <code>nums</code> and two indices <code>left</code> and <code>right</code> (0-indexed, inclusive), return the sum of elements between them. Use a prefix sum array so the query runs in O(1).',
    examples: [
      { input: 'nums = [-2, 0, 3, -5, 2, -1], left = 0, right = 2', output: '1', explanation: '-2 + 0 + 3 = 1.' },
      { input: 'nums = [-2, 0, 3, -5, 2, -1], left = 2, right = 5', output: '-1', explanation: '3 + (-5) + 2 + (-1) = -1.' },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 10⁴',
      '-10⁵ ≤ nums[i] ≤ 10⁵',
      '0 ≤ left ≤ right < nums.length',
    ],
    starterCode: `def range_sum(nums, left, right):
    pass`,
    functionName: 'range_sum',
    conceptId: 'prefix-sums',
    testCases: [
      { label: 'First three', args: [[-2, 0, 3, -5, 2, -1], 0, 2], expected: 1 },
      { label: 'Last four', args: [[-2, 0, 3, -5, 2, -1], 2, 5], expected: -1 },
      { label: 'Full array', args: [[-2, 0, 3, -5, 2, -1], 0, 5], expected: -3 },
      { label: 'Single element', args: [[3, 5, 2], 1, 1], expected: 5 },
    ],
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'easy',
    description: 'Given a string <code>s</code> containing only <code>(</code>, <code>)</code>, <code>{</code>, <code>}</code>, <code>[</code>, and <code>]</code>, return <code>true</code> if the input string is valid. An input string is valid if every open bracket is closed by the same type of bracket in the correct order.',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    constraints: [
      '1 ≤ s.length ≤ 10⁴',
      's consists of parentheses only',
    ],
    starterCode: `def is_valid(s):
    pass`,
    functionName: 'is_valid',
    conceptId: 'stacks-queues',
    testCases: [
      { label: 'Simple pair', args: ['()'], expected: true },
      { label: 'All types', args: ['()[]{}'], expected: true },
      { label: 'Mismatched', args: ['(]'], expected: false },
      { label: 'Wrong order', args: ['([)]'], expected: false },
      { label: 'Nested', args: ['{[]}'], expected: true },
    ],
  },
  {
    id: 'next-greater-element',
    title: 'Next Greater Element I',
    difficulty: 'easy',
    description: 'Given two arrays <code>nums1</code> and <code>nums2</code> (no duplicates), for each element in <code>nums1</code> find its <strong>next greater element</strong> in <code>nums2</code> — the first element to its right that is larger. Return <code>-1</code> if none exists.',
    examples: [
      { input: 'nums1 = [4, 1, 2], nums2 = [1, 3, 4, 2]', output: '[-1, 3, -1]', explanation: '4 has no greater element. 1\'s next greater in nums2 is 3. 2 has no greater element.' },
      { input: 'nums1 = [2, 4], nums2 = [1, 2, 3, 4]', output: '[3, -1]' },
    ],
    constraints: [
      '1 ≤ nums1.length ≤ nums2.length ≤ 1000',
      'All integers in nums1 and nums2 are unique',
      'All elements of nums1 appear in nums2',
    ],
    starterCode: `def next_greater_element(nums1, nums2):
    pass`,
    functionName: 'next_greater_element',
    conceptId: 'monotonic-stack',
    testCases: [
      { label: 'Basic', args: [[4, 1, 2], [1, 3, 4, 2]], expected: [-1, 3, -1] },
      { label: 'Ascending', args: [[2, 4], [1, 2, 3, 4]], expected: [3, -1] },
      { label: 'All descending', args: [[1, 3, 5], [5, 4, 3, 2, 1]], expected: [-1, -1, -1] },
      { label: 'Single element', args: [[1], [1, 2]], expected: [2] },
    ],
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'easy',
    description: 'Given a sorted array of integers <code>nums</code> and a <code>target</code>, return the index of the target. If not found, return <code>-1</code>.',
    examples: [
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', output: '4', explanation: '9 exists at index 4.' },
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', output: '-1', explanation: '2 does not exist in the array.' },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 10⁴',
      'nums is sorted in ascending order with unique values',
    ],
    starterCode: `def binary_search(nums, target):
    pass`,
    functionName: 'binary_search',
    conceptId: 'binary-search',
    testCases: [
      { label: 'Found', args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { label: 'Not found', args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
      { label: 'Single element', args: [[5], 5], expected: 0 },
      { label: 'First element', args: [[1, 3, 5, 7], 1], expected: 0 },
      { label: 'Last element', args: [[1, 3, 5, 7], 7], expected: 3 },
    ],
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'easy',
    description: 'Given an array of integers <code>nums</code> and an integer <code>target</code>, return the indices of the two numbers that add up to <code>target</code>. Each input has exactly one solution.',
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9.' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6.' },
    ],
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      'Exactly one valid answer exists',
    ],
    starterCode: `def two_sum(nums, target):
    pass`,
    functionName: 'two_sum',
    conceptId: 'hash-maps',
    testCases: [
      { label: 'Basic', args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { label: 'Middle pair', args: [[3, 2, 4], 6], expected: [1, 2] },
      { label: 'Same value', args: [[3, 3], 6], expected: [0, 1] },
    ],
    bruteHint: 'Describe the nested-loop approach and its time complexity',
    optimizeHint: 'Name the data structure that eliminates the inner loop',
    clues: [
      {
        id: 'constraint-complexity',
        question: 'n ≤ 10,000 tells you…',
        options: [
          { label: 'O(n²) is fine',            isCorrect: false },
          { label: 'O(n) or better needed',     isCorrect: true  },
          { label: 'O(log n) is required',      isCorrect: false },
          { label: 'Input size is irrelevant',  isCorrect: false },
        ],
        correctFeedback: '10,000² ≈ 100 million operations — too slow in Python. You need a linear-time approach.',
        wrongFeedback: [
          'Think about worst case: with n = 10,000, how many pairs would you check with two nested loops?',
          'n² = 100 million operations at n = 10,000. Python handles ~10 million simple ops per second — that\'s too slow.',
        ],
      },
      {
        id: 'output-structure',
        question: 'The output is two indices, not values. This means you need to…',
        options: [
          { label: 'Store values in a set',               isCorrect: false },
          { label: 'Map each value to its index',         isCorrect: true  },
          { label: 'Sort the array first',                isCorrect: false },
          { label: 'Count occurrences of each number',    isCorrect: false },
        ],
        correctFeedback: 'Exactly — you need to return where you found each number, not just that it exists. A hash map gives you O(1) value → index lookup.',
        wrongFeedback: [
          'A set only tells you if a value exists. But the output asks for indices — what else do you need to track?',
          'You need to return two positions in the array. So as you scan, you need to remember: "I saw this value at index ___."',
        ],
      },
      {
        id: 'one-solution-guarantee',
        question: 'Exactly one valid answer exists. This means…',
        options: [
          { label: 'You must handle the no-solution case',  isCorrect: false },
          { label: 'You can return as soon as you find a pair', isCorrect: true  },
          { label: 'You need to collect all valid pairs',   isCorrect: false },
          { label: 'Sorting makes it easier to find',       isCorrect: false },
        ],
        correctFeedback: 'Right — no ambiguity, no edge cases for missing solutions. The first valid pair you find is the answer.',
        wrongFeedback: [
          'The problem guarantees a solution always exists. What does that let you skip?',
          'If there\'s exactly one answer, the moment your loop finds a valid pair — that\'s it. You can return immediately.',
        ],
      },
    ],
  },
  {
    id: 'remove-linked-list-elements',
    title: 'Remove Linked List Elements',
    difficulty: 'easy',
    description: 'Given the head of a linked list and an integer <code>val</code>, remove all nodes with <code>node.val == val</code> and return the new head.',
    examples: [
      { input: 'head = [1, 2, 6, 3, 4, 5, 6], val = 6', output: '[1, 2, 3, 4, 5]' },
      { input: 'head = [7, 7, 7, 7], val = 7', output: '[]' },
      { input: 'head = [], val = 1', output: '[]' },
    ],
    constraints: [
      '0 ≤ number of nodes ≤ 10⁴',
      '1 ≤ Node.val ≤ 50',
      '0 ≤ val ≤ 50',
    ],
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def remove_elements(head, val):
    pass`,
    functionName: 'remove_elements',
    conceptId: 'linked-lists',
    runnerSetup: `
def _to_linked(lst):
    if not lst: return None
    head = ListNode(lst[0])
    cur = head
    for v in lst[1:]:
        cur.next = ListNode(v)
        cur = cur.next
    return head

def _to_list(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result

_orig_remove_elements = remove_elements
def remove_elements(values, val):
    return _to_list(_orig_remove_elements(_to_linked(values), val))
`,
    testCases: [
      { label: 'Remove middle', args: [[1, 2, 6, 3, 4, 5, 6], 6], expected: [1, 2, 3, 4, 5] },
      { label: 'Remove all', args: [[7, 7, 7, 7], 7], expected: [] },
      { label: 'Empty list', args: [[], 1], expected: [] },
      { label: 'Remove head', args: [[1, 1, 2, 3], 1], expected: [2, 3] },
      { label: 'Not found', args: [[1, 2, 3], 4], expected: [1, 2, 3] },
    ],
  },
  {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    difficulty: 'easy',
    description: 'Given the head of a linked list, return <code>true</code> if the list contains a cycle, or <code>false</code> otherwise. Use Floyd\'s fast and slow pointer algorithm.',
    examples: [
      { input: 'head = [3, 2, 0, -4], pos = 1', output: 'true', explanation: 'The tail connects back to node at index 1.' },
      { input: 'head = [1, 2], pos = 0', output: 'true', explanation: 'The tail connects back to the head.' },
      { input: 'head = [1], pos = -1', output: 'false', explanation: 'No cycle.' },
    ],
    constraints: [
      '0 ≤ number of nodes ≤ 10⁴',
      'pos is -1 or a valid node index',
    ],
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def has_cycle(head):
    pass`,
    functionName: 'has_cycle',
    conceptId: 'fast-slow',
    runnerSetup: `
def _build_cycle(vals, pos):
    if not vals: return None
    nodes = [ListNode(v) for v in vals]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if pos >= 0:
        nodes[-1].next = nodes[pos]
    return nodes[0]

_orig_has_cycle = has_cycle
def has_cycle(vals, pos):
    return _orig_has_cycle(_build_cycle(vals, pos))
`,
    testCases: [
      { label: 'Cycle at index 1', args: [[3, 2, 0, -4], 1], expected: true },
      { label: 'Cycle at head', args: [[1, 2], 0], expected: true },
      { label: 'No cycle', args: [[1], -1], expected: false },
      { label: 'Longer no cycle', args: [[1, 2, 3, 4], -1], expected: false },
    ],
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'easy',
    description: 'Given the head of a singly linked list, reverse the list and return the new head.',
    examples: [
      { input: 'head = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' },
      { input: 'head = [1, 2]', output: '[2, 1]' },
      { input: 'head = []', output: '[]' },
    ],
    constraints: [
      '0 ≤ number of nodes ≤ 5000',
      '-5000 ≤ Node.val ≤ 5000',
    ],
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    pass`,
    functionName: 'reverse_list',
    conceptId: 'list-reversal',
    runnerSetup: `
def _to_linked(lst):
    if not lst: return None
    head = ListNode(lst[0])
    cur = head
    for v in lst[1:]:
        cur.next = ListNode(v)
        cur = cur.next
    return head

def _to_list(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result

_orig_reverse_list = reverse_list
def reverse_list(values):
    return _to_list(_orig_reverse_list(_to_linked(values)))
`,
    testCases: [
      { label: 'Five nodes', args: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
      { label: 'Two nodes', args: [[1, 2]], expected: [2, 1] },
      { label: 'Empty list', args: [[]], expected: [] },
      { label: 'Single node', args: [[1]], expected: [1] },
    ],
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'easy',
    description: 'You are climbing a staircase with <code>n</code> steps. Each time you can climb 1 or 2 steps. Return the number of distinct ways to reach the top.',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1 or 2.' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1.' },
    ],
    constraints: [
      '1 ≤ n ≤ 45',
    ],
    starterCode: `def climb_stairs(n):
    pass`,
    functionName: 'climb_stairs',
    conceptId: 'dynamic-programming',
    testCases: [
      { label: 'n = 2', args: [2], expected: 2 },
      { label: 'n = 3', args: [3], expected: 3 },
      { label: 'n = 5', args: [5], expected: 8 },
      { label: 'n = 1', args: [1], expected: 1 },
      { label: 'n = 10', args: [10], expected: 89 },
    ],
  },
  {
    id: 'max-depth-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'easy',
    description: 'Given a list of node values in level-order (with <code>None</code> for missing nodes), return the maximum depth of the binary tree.',
    examples: [
      { input: 'level_order = [3, 9, 20, None, None, 15, 7]', output: '3' },
      { input: 'level_order = [1, None, 2]', output: '2' },
    ],
    constraints: [
      '0 ≤ number of nodes ≤ 10⁴',
      '-100 ≤ Node.val ≤ 100',
    ],
    starterCode: `def max_depth(level_order):
    # level_order is a list like [3, 9, 20, None, None, 15, 7]
    # Build the tree and find max depth
    pass`,
    functionName: 'max_depth',
    conceptId: 'trees',
    testCases: [
      { label: 'Basic tree', args: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
      { label: 'Single node', args: [[1]], expected: 1 },
      { label: 'Empty tree', args: [[]], expected: 0 },
      { label: 'Left skewed', args: [[1, 2, null, 3]], expected: 3 },
    ],
  },
  {
    id: 'meeting-rooms',
    title: 'Meeting Rooms',
    difficulty: 'easy',
    description: 'Given an array of meeting time intervals <code>[start, end]</code>, determine if a person can attend all meetings (no two meetings overlap). Meetings that touch at an endpoint do not overlap.',
    examples: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', output: 'false', explanation: '[0,30] and [5,10] overlap.' },
      { input: 'intervals = [[7,10],[2,4]]', output: 'true', explanation: 'No overlap.' },
    ],
    constraints: [
      '0 ≤ intervals.length ≤ 10⁴',
      '0 ≤ start < end ≤ 10⁶',
    ],
    starterCode: `def can_attend_all(intervals):
    # Hint: sort by start time, then check adjacent pairs
    pass`,
    functionName: 'can_attend_all',
    conceptId: 'merge-intervals',
    testCases: [
      { label: 'Overlap', args: [[[0,30],[5,10],[15,20]]], expected: false },
      { label: 'No overlap', args: [[[7,10],[2,4]]], expected: true },
      { label: 'Touching endpoints', args: [[[1,5],[5,10]]], expected: true },
      { label: 'Adjacent overlap', args: [[[1,3],[2,5]]], expected: false },
      { label: 'Empty', args: [[[]]], expected: true },
    ],
  },
  {
    id: 'koko-eating-bananas',
    title: 'Koko Eating Bananas',
    difficulty: 'medium',
    description: 'Koko has <code>piles</code> of bananas and <code>h</code> hours. She eats at most <code>k</code> bananas per hour from one pile. Find the minimum integer <code>k</code> such that she can eat all bananas within <code>h</code> hours.',
    examples: [
      { input: 'piles = [3,6,7,11], h = 8', output: '4' },
      { input: 'piles = [30,11,23,4,20], h = 5', output: '30', explanation: 'Must finish each pile in exactly one hour.' },
    ],
    constraints: [
      '1 ≤ piles.length ≤ h ≤ 10⁴',
      '1 ≤ piles[i] ≤ 10⁹',
    ],
    starterCode: `import math

def min_eating_speed(piles, h):
    # Hint: binary search on k in range [1, max(piles)]
    pass`,
    functionName: 'min_eating_speed',
    conceptId: 'binary-search-answer',
    testCases: [
      { label: 'Basic', args: [[3,6,7,11], 8], expected: 4 },
      { label: 'Must rush', args: [[30,11,23,4,20], 5], expected: 30 },
      { label: 'Extra time', args: [[30,11,23,4,20], 6], expected: 23 },
      { label: 'Single pile', args: [[10], 3], expected: 4 },
    ],
  },
  {
    id: 'fibonacci-number',
    title: 'Fibonacci Number',
    difficulty: 'easy',
    description: 'The Fibonacci sequence is defined as: <code>F(0) = 0</code>, <code>F(1) = 1</code>, and <code>F(n) = F(n-1) + F(n-2)</code>. Given <code>n</code>, return <code>F(n)</code>. Implement it recursively.',
    examples: [
      { input: 'n = 4', output: '3', explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3.' },
      { input: 'n = 10', output: '55' },
    ],
    constraints: ['0 ≤ n ≤ 30'],
    starterCode: `def fib(n):
    # Base cases: fib(0) = 0, fib(1) = 1
    pass`,
    functionName: 'fib',
    conceptId: 'recursion',
    testCases: [
      { label: 'F(0)', args: [0], expected: 0 },
      { label: 'F(1)', args: [1], expected: 1 },
      { label: 'F(4)', args: [4], expected: 3 },
      { label: 'F(10)', args: [10], expected: 55 },
      { label: 'F(20)', args: [20], expected: 6765 },
    ],
  },
  {
    id: 'level-order-traversal',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'medium',
    description: 'Given the root of a binary tree, return the level-order traversal of its node values as a list of lists (one list per level, left to right).',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', output: '[[1]]' },
    ],
    constraints: [
      '0 ≤ number of nodes ≤ 2000',
      '-1000 ≤ Node.val ≤ 1000',
    ],
    starterCode: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root):
    # Hint: use a queue; process all nodes at current depth before moving on
    pass`,
    functionName: 'level_order',
    conceptId: 'bfs-dfs',
    runnerSetup: `
from collections import deque as _deque

def _build_tree(vals):
    if not vals or vals[0] is None: return None
    root = TreeNode(vals[0])
    q = _deque([root])
    i = 1
    while q and i < len(vals):
        node = q.popleft()
        if i < len(vals) and vals[i] is not None:
            node.left = TreeNode(vals[i])
            q.append(node.left)
        i += 1
        if i < len(vals) and vals[i] is not None:
            node.right = TreeNode(vals[i])
            q.append(node.right)
        i += 1
    return root

_orig_level_order = level_order
def level_order(vals):
    return _orig_level_order(_build_tree(vals))
`,
    testCases: [
      { label: 'Three levels', args: [[3,9,20,null,null,15,7]], expected: [[3],[9,20],[15,7]] },
      { label: 'Single node', args: [[1]], expected: [[1]] },
      { label: 'Empty', args: [[]], expected: [] },
      { label: 'Two levels', args: [[1,2,3]], expected: [[1],[2,3]] },
    ],
  },
  {
    id: 'subsets',
    title: 'Subsets',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code> of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.',
    examples: [
      { input: 'nums = [1,2,3]', output: '[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]' },
      { input: 'nums = [0]', output: '[[],[0]]' },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 10',
      '-10 ≤ nums[i] ≤ 10',
      'All elements of nums are unique',
    ],
    starterCode: `def subsets(nums):
    result = []
    # Hint: backtrack — at each index, choose to include or skip
    def backtrack(start, current):
        pass
    backtrack(0, [])
    return result`,
    functionName: 'subsets',
    conceptId: 'backtracking',
    runnerSetup: `
_orig_subsets = subsets
def subsets(nums):
    result = _orig_subsets(nums)
    return sorted([sorted(s) for s in result])
`,
    testCases: [
      { label: 'Three elements', args: [[1,2,3]], expected: [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]] },
      { label: 'Single element', args: [[0]], expected: [[],[0]] },
      { label: 'Two elements', args: [[1,2]], expected: [[],[1],[1,2],[2]] },
    ],
  },
  {
    id: 'assign-cookies',
    title: 'Assign Cookies',
    difficulty: 'easy',
    description: 'You want to give cookies to children. Child <code>i</code> has a greed factor <code>g[i]</code> — the minimum cookie size they\'ll accept. Cookie <code>j</code> has size <code>s[j]</code>. Each child gets at most one cookie. Return the maximum number of content children.',
    examples: [
      { input: 'g = [1,2,3], s = [1,1]', output: '1', explanation: 'Only one child with greed 1 can be satisfied.' },
      { input: 'g = [1,2], s = [1,2,3]', output: '2', explanation: 'Both children can be satisfied.' },
    ],
    constraints: [
      '1 ≤ g.length ≤ 3 × 10⁴',
      '0 ≤ s.length ≤ 3 × 10⁴',
      '1 ≤ g[i], s[j] ≤ 2³¹ - 1',
    ],
    starterCode: `def find_content_children(g, s):
    # Hint: sort both, use two pointers — give smallest sufficient cookie first
    pass`,
    functionName: 'find_content_children',
    conceptId: 'greedy',
    testCases: [
      { label: 'One satisfied', args: [[1,2,3],[1,1]], expected: 1 },
      { label: 'All satisfied', args: [[1,2],[1,2,3]], expected: 2 },
      { label: 'No cookies', args: [[1,2],[]], expected: 0 },
      { label: 'None fit', args: [[10],[1,2,3]], expected: 0 },
      { label: 'Exact match', args: [[1,2,3],[1,2,3]], expected: 3 },
    ],
  },
  {
    id: 'find-path-in-graph',
    title: 'Find if Path Exists in Graph',
    difficulty: 'easy',
    description: 'Given <code>n</code> nodes labeled 0 to n-1, a list of undirected edges, a <code>source</code> node and a <code>destination</code> node, return <code>true</code> if a valid path exists from source to destination.',
    examples: [
      { input: 'n=3, edges=[[0,1],[1,2],[2,0]], source=0, destination=2', output: 'true' },
      { input: 'n=6, edges=[[0,1],[0,2],[3,5],[5,4],[4,3]], source=0, destination=5', output: 'false' },
    ],
    constraints: [
      '1 ≤ n ≤ 2 × 10⁵',
      '0 ≤ edges.length ≤ 2 × 10⁵',
      '0 ≤ source, destination < n',
    ],
    starterCode: `def valid_path(n, edges, source, destination):
    # Hint: build an adjacency list, then BFS or DFS from source
    pass`,
    functionName: 'valid_path',
    conceptId: 'graphs',
    testCases: [
      { label: 'Path exists', args: [3, [[0,1],[1,2],[2,0]], 0, 2], expected: true },
      { label: 'No path', args: [6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5], expected: false },
      { label: 'Same node', args: [1, [], 0, 0], expected: true },
      { label: 'Direct edge', args: [3, [[0,1],[2,1]], 0, 2], expected: true },
    ],
  },
  {
    id: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'medium',
    description: 'There are <code>numCourses</code> courses labeled 0 to numCourses-1. <code>prerequisites[i] = [a, b]</code> means you must take course <code>b</code> before <code>a</code>. Return <code>true</code> if you can finish all courses (no cycle exists).',
    examples: [
      { input: 'numCourses=2, prerequisites=[[1,0]]', output: 'true', explanation: 'Take 0 then 1.' },
      { input: 'numCourses=2, prerequisites=[[1,0],[0,1]]', output: 'false', explanation: 'Cycle: 0→1→0.' },
    ],
    constraints: [
      '1 ≤ numCourses ≤ 2000',
      '0 ≤ prerequisites.length ≤ 5000',
    ],
    starterCode: `def can_finish(num_courses, prerequisites):
    # Hint: build adjacency list + in-degree array, use Kahn's BFS algorithm
    pass`,
    functionName: 'can_finish',
    conceptId: 'topological-sort',
    testCases: [
      { label: 'Simple dep', args: [2, [[1,0]]], expected: true },
      { label: 'Cycle', args: [2, [[1,0],[0,1]]], expected: false },
      { label: 'No deps', args: [3, []], expected: true },
      { label: 'Linear chain', args: [4, [[1,0],[2,1],[3,2]]], expected: true },
      { label: 'Diamond cycle', args: [4, [[1,0],[2,1],[3,2],[1,3]]], expected: false },
    ],
  },
  {
    id: 'connected-components',
    title: 'Number of Connected Components',
    difficulty: 'medium',
    description: 'Given <code>n</code> nodes labeled 0 to n-1 and a list of undirected edges, return the number of connected components in the graph. Use Union-Find.',
    examples: [
      { input: 'n=5, edges=[[0,1],[1,2],[3,4]]', output: '2' },
      { input: 'n=5, edges=[[0,1],[1,2],[2,3],[3,4]]', output: '1' },
    ],
    constraints: [
      '1 ≤ n ≤ 2000',
      '1 ≤ edges.length ≤ 5000',
      'No repeated edges, no self-loops',
    ],
    starterCode: `def count_components(n, edges):
    # Hint: initialize parent[i] = i, then union each edge, count unique roots
    pass`,
    functionName: 'count_components',
    conceptId: 'union-find',
    testCases: [
      { label: 'Two components', args: [5, [[0,1],[1,2],[3,4]]], expected: 2 },
      { label: 'One component', args: [5, [[0,1],[1,2],[2,3],[3,4]]], expected: 1 },
      { label: 'No edges', args: [4, []], expected: 4 },
      { label: 'All isolated', args: [3, []], expected: 3 },
    ],
  },
  {
    id: 'kth-largest-stream',
    title: 'Kth Largest in a Stream',
    difficulty: 'easy',
    description: 'Given an integer <code>k</code>, an initial array <code>nums</code>, and a list of values to add one at a time, return the kth largest element in the running stream after each addition. Use a min-heap of size <code>k</code>.',
    examples: [
      { input: 'k=3, nums=[4,5,8,2], stream=[3,5,10,9,4]', output: '[4,5,8,8,8]', explanation: 'After each add, the 3rd largest is tracked.' },
    ],
    constraints: [
      '1 ≤ k ≤ nums.length + 1',
      '-10⁴ ≤ nums[i], stream[i] ≤ 10⁴',
    ],
    starterCode: `import heapq

def kth_in_stream(k, nums, stream):
    # Hint: maintain a min-heap of size k; heap[0] is always the kth largest
    results = []
    # initialize heap with nums...
    for val in stream:
        # add val, maintain size k, append heap[0]
        pass
    return results`,
    functionName: 'kth_in_stream',
    conceptId: 'heaps',
    testCases: [
      { label: 'Basic stream', args: [3, [4,5,8,2], [3,5,10,9,4]], expected: [4,5,8,8,8] },
      { label: 'k=1', args: [1, [1], [2,3]], expected: [2,3] },
      { label: 'Single add', args: [2, [3,1], [2]], expected: [2] },
    ],
  },
  {
    id: 'top-k-frequent',
    title: 'Top K Frequent Elements',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code> most frequent elements in any order.',
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 10⁵',
      '1 ≤ k ≤ number of unique elements',
      'Guaranteed the answer is unique',
    ],
    starterCode: `import heapq

def top_k_frequent(nums, k):
    # Hint: count frequencies, then use a heap to find top k
    pass`,
    functionName: 'top_k_frequent',
    conceptId: 'top-k',
    runnerSetup: `
_orig_top_k = top_k_frequent
def top_k_frequent(nums, k):
    return sorted(_orig_top_k(nums, k))
`,
    testCases: [
      { label: 'Basic', args: [[1,1,1,2,2,3], 2], expected: [1,2] },
      { label: 'Single', args: [[1], 1], expected: [1] },
      { label: 'All same freq', args: [[1,2], 2], expected: [1,2] },
      { label: 'k=3', args: [[4,1,1,2,2,3,3,4,4,4], 3], expected: [1,3,4] },
    ],
  },
  {
    id: 'unique-paths',
    title: 'Unique Paths',
    difficulty: 'medium',
    description: 'A robot starts at the top-left of an <code>m × n</code> grid and can only move right or down. How many unique paths are there to the bottom-right corner?',
    examples: [
      { input: 'm=3, n=7', output: '28' },
      { input: 'm=3, n=2', output: '3', explanation: 'Right-Down-Down, Down-Right-Down, Down-Down-Right.' },
    ],
    constraints: [
      '1 ≤ m, n ≤ 100',
    ],
    starterCode: `def unique_paths(m, n):
    # Hint: dp[i][j] = dp[i-1][j] + dp[i][j-1]; first row and column are all 1s
    pass`,
    functionName: 'unique_paths',
    conceptId: 'dp-2d',
    testCases: [
      { label: '3×7', args: [3, 7], expected: 28 },
      { label: '3×2', args: [3, 2], expected: 3 },
      { label: '1×1', args: [1, 1], expected: 1 },
      { label: '7×3', args: [7, 3], expected: 28 },
      { label: '5×5', args: [5, 5], expected: 70 },
    ],
  },
  {
    id: 'longest-palindromic-subseq',
    title: 'Longest Palindromic Subsequence',
    difficulty: 'medium',
    description: 'Given a string <code>s</code>, find the length of the longest palindromic subsequence. A subsequence does not need to be contiguous.',
    examples: [
      { input: 's = "bbbab"', output: '4', explanation: '"bbbb" is the longest palindromic subsequence (indices 0,1,2,4).' },
      { input: 's = "cbbd"', output: '2', explanation: '"bb" is the longest palindromic subsequence.' },
    ],
    constraints: [
      '1 ≤ s.length ≤ 1000',
      's consists only of lowercase English letters',
    ],
    starterCode: `def longest_palindrome_subseq(s):
    # Hint: dp[i][j] = length of longest palindromic subseq in s[i..j]
    # If s[i]==s[j]: dp[i][j] = dp[i+1][j-1] + 2, else max(dp[i+1][j], dp[i][j-1])
    pass`,
    functionName: 'longest_palindrome_subseq',
    conceptId: 'dp-intervals',
    testCases: [
      { label: '"bbbab"', args: ['bbbab'], expected: 4 },
      { label: '"cbbd"', args: ['cbbd'], expected: 2 },
      { label: 'Single char', args: ['a'], expected: 1 },
      { label: 'All same', args: ['aaaa'], expected: 4 },
      { label: '"agbdba"', args: ['agbdba'], expected: 5 },
    ],
  },
  {
    id: 'partition-equal-subset',
    title: 'Partition Equal Subset Sum',
    difficulty: 'medium',
    description: 'Given a non-empty array <code>nums</code> of positive integers, determine if it can be partitioned into two subsets with equal sums.',
    examples: [
      { input: 'nums = [1,5,11,5]', output: 'true', explanation: '[1,5,5] and [11] both sum to 11.' },
      { input: 'nums = [1,2,3,5]', output: 'false', explanation: 'Cannot be partitioned into equal sums.' },
    ],
    constraints: [
      '1 ≤ nums.length ≤ 200',
      '1 ≤ nums[i] ≤ 100',
    ],
    starterCode: `def can_partition(nums):
    # Hint: target = sum(nums)//2; if odd total, return False
    # dp[j] = True if subset summing to j is reachable
    pass`,
    functionName: 'can_partition',
    conceptId: 'dp-knapsack',
    testCases: [
      { label: 'Can partition', args: [[1,5,11,5]], expected: true },
      { label: 'Cannot', args: [[1,2,3,5]], expected: false },
      { label: 'Two equal', args: [[3,3]], expected: true },
      { label: 'Odd sum', args: [[1,2]], expected: false },
      { label: 'Larger', args: [[1,2,5,5,11]], expected: true },
    ],
  },

  // ─── BIT MANIPULATION ────────────────────────────────────────────────────────
  {
    id: 'single-number',
    title: 'Single Number',
    difficulty: 'easy',
    description: 'Given a non-empty array of integers where every element appears twice except for one, find that single element. Your algorithm must run in O(n) time and O(1) extra space.',
    examples: [
      { input: 'nums = [2,2,1]', output: '1', explanation: '1 appears only once.' },
      { input: 'nums = [4,1,2,1,2]', output: '4', explanation: '4 is the only non-duplicate.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 3 × 10⁴', 'Each element appears exactly twice except one', '-3 × 10⁴ ≤ nums[i] ≤ 3 × 10⁴'],
    starterCode: `def single_number(nums):
    pass`,
    functionName: 'single_number',
    conceptId: 'bit-manipulation',
    testCases: [
      { label: 'Three elements', args: [[2,2,1]], expected: 1 },
      { label: 'Five elements', args: [[4,1,2,1,2]], expected: 4 },
      { label: 'Single element', args: [[1]], expected: 1 },
      { label: 'Larger array', args: [[1,3,1,2,3]], expected: 2 },
    ],
  },
  {
    id: 'number-of-1-bits',
    title: 'Number of 1 Bits',
    difficulty: 'easy',
    description: 'Given a positive integer <code>n</code>, return the number of set bits (1s) in its binary representation (also known as the Hamming weight).',
    examples: [
      { input: 'n = 11', output: '3', explanation: '11 in binary is 1011, which has three 1-bits.' },
      { input: 'n = 128', output: '1', explanation: '128 is 10000000, which has one 1-bit.' },
    ],
    constraints: ['1 ≤ n ≤ 2³¹ − 1'],
    starterCode: `def hammingWeight(n):
    pass`,
    functionName: 'hammingWeight',
    conceptId: 'bit-manipulation',
    testCases: [
      { label: '11 → 3 bits', args: [11], expected: 3 },
      { label: '128 → 1 bit', args: [128], expected: 1 },
      { label: 'Max 32-bit', args: [2147483647], expected: 31 },
      { label: 'Zero bits... n=1', args: [1], expected: 1 },
    ],
  },
  {
    id: 'counting-bits',
    title: 'Counting Bits',
    difficulty: 'easy',
    description: 'Given an integer <code>n</code>, return an array <code>ans</code> of length <code>n + 1</code> such that for each <code>i</code> (0 ≤ i ≤ n), <code>ans[i]</code> is the number of 1-bits in the binary representation of <code>i</code>.',
    examples: [
      { input: 'n = 2', output: '[0,1,1]', explanation: '0→0, 1→1, 2→10.' },
      { input: 'n = 5', output: '[0,1,1,2,1,2]', explanation: '0→0, 1→1, 2→1, 3→2, 4→1, 5→2.' },
    ],
    constraints: ['0 ≤ n ≤ 10⁵', 'Must solve in O(n) time and O(1) extra space (excluding output)'],
    starterCode: `def count_bits(n):
    pass`,
    functionName: 'count_bits',
    conceptId: 'bit-manipulation',
    testCases: [
      { label: 'n=2', args: [2], expected: [0,1,1] },
      { label: 'n=5', args: [5], expected: [0,1,1,2,1,2] },
      { label: 'n=0', args: [0], expected: [0] },
      { label: 'n=4', args: [4], expected: [0,1,1,2,1] },
    ],
  },
  {
    id: 'reverse-bits',
    title: 'Reverse Bits',
    difficulty: 'easy',
    description: 'Reverse the bits of a given 32-bit unsigned integer and return the result.',
    examples: [
      { input: 'n = 43261596', output: '964176192', explanation: 'Binary 00000010100101000001111010011100 reversed is 00111001011110000010100101000000.' },
      { input: 'n = 4294967293', output: '3221225471', explanation: 'Binary 11111111111111111111111111111101 reversed is 10111111111111111111111111111111.' },
    ],
    constraints: ['Input is a 32-bit unsigned integer'],
    starterCode: `def reverse_bits(n):
    pass`,
    functionName: 'reverse_bits',
    conceptId: 'bit-manipulation',
    testCases: [
      { label: 'Standard case', args: [43261596], expected: 964176192 },
      { label: 'All ones minus one', args: [4294967293], expected: 3221225471 },
      { label: 'Zero', args: [0], expected: 0 },
      { label: 'One', args: [1], expected: 2147483648 },
    ],
  },
  {
    id: 'missing-number',
    title: 'Missing Number',
    difficulty: 'easy',
    description: 'Given an array <code>nums</code> containing <code>n</code> distinct numbers in the range <code>[0, n]</code>, return the only number in the range that is missing.',
    examples: [
      { input: 'nums = [3,0,1]', output: '2', explanation: '2 is missing from the range [0,3].' },
      { input: 'nums = [0,1]', output: '2', explanation: '2 is missing from [0,2].' },
    ],
    constraints: ['n = nums.length', '0 ≤ nums[i] ≤ n', 'All numbers are distinct'],
    starterCode: `def missing_number(nums):
    pass`,
    functionName: 'missing_number',
    conceptId: 'bit-manipulation',
    testCases: [
      { label: 'Missing 2', args: [[3,0,1]], expected: 2 },
      { label: 'Missing at end', args: [[0,1]], expected: 2 },
      { label: 'Single element 0', args: [[0]], expected: 1 },
      { label: 'Missing first', args: [[1,2,3]], expected: 0 },
    ],
  },
  {
    id: 'sum-of-two-integers',
    title: 'Sum of Two Integers',
    difficulty: 'medium',
    description: 'Given two integers <code>a</code> and <code>b</code>, return their sum without using the operators <code>+</code> or <code>-</code>. Use bit manipulation instead.',
    examples: [
      { input: 'a = 1, b = 2', output: '3' },
      { input: 'a = 2, b = 3', output: '5' },
    ],
    constraints: ['-1000 ≤ a, b ≤ 1000'],
    starterCode: `def get_sum(a, b):
    pass`,
    functionName: 'get_sum',
    conceptId: 'bit-manipulation',
    testCases: [
      { label: '1+2', args: [1,2], expected: 3 },
      { label: '2+3', args: [2,3], expected: 5 },
      { label: 'Negatives', args: [-1,-2], expected: -3 },
      { label: 'One negative', args: [5,-3], expected: 2 },
    ],
  },
  {
    id: 'reverse-integer',
    title: 'Reverse Integer',
    difficulty: 'medium',
    description: 'Given a signed 32-bit integer <code>x</code>, reverse its digits. If the reversed integer overflows the 32-bit signed range <code>[-2³¹, 2³¹ − 1]</code>, return 0.',
    examples: [
      { input: 'x = 123', output: '321' },
      { input: 'x = -123', output: '-321' },
      { input: 'x = 120', output: '21', explanation: 'Leading zero is dropped.' },
    ],
    constraints: ['-2³¹ ≤ x ≤ 2³¹ − 1'],
    starterCode: `def reverse(x):
    pass`,
    functionName: 'reverse',
    conceptId: 'bit-manipulation',
    testCases: [
      { label: 'Positive', args: [123], expected: 321 },
      { label: 'Negative', args: [-123], expected: -321 },
      { label: 'Trailing zero', args: [120], expected: 21 },
      { label: 'Overflow', args: [1534236469], expected: 0 },
    ],
  },
  {
    id: 'single-number-ii',
    title: 'Single Number II',
    difficulty: 'medium',
    description: 'Given an integer array where every element appears three times except for one, find the element that appears only once. Your algorithm must use O(1) extra space.',
    examples: [
      { input: 'nums = [2,2,3,2]', output: '3', explanation: '3 appears once; 2 appears three times.' },
      { input: 'nums = [0,1,0,1,0,1,99]', output: '99' },
    ],
    constraints: ['1 ≤ nums.length ≤ 3 × 10⁴', 'Every element appears exactly three times except one', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1'],
    starterCode: `def single_number(nums):
    pass`,
    functionName: 'single_number',
    conceptId: 'bit-manipulation',
    testCases: [
      { label: 'Three pairs', args: [[2,2,3,2]], expected: 3 },
      { label: 'Larger', args: [[0,1,0,1,0,1,99]], expected: 99 },
      { label: 'Single element', args: [[7]], expected: 7 },
      { label: 'Negatives', args: [-2,-2,-3,-2], expected: -3 },
    ],
  },

  // ─── MATH & GEOMETRY ─────────────────────────────────────────────────────────
  {
    id: 'rotate-image',
    title: 'Rotate Image',
    difficulty: 'medium',
    description: 'You are given an <code>n × n</code> 2D matrix representing an image. Rotate the image 90 degrees clockwise in-place.',
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]', explanation: 'Each column becomes a row in reverse order.' },
    ],
    constraints: ['n == matrix.length == matrix[i].length', '1 ≤ n ≤ 20', '-1000 ≤ matrix[i][j] ≤ 1000'],
    starterCode: `def rotate(matrix):
    pass`,
    functionName: 'rotate',
    conceptId: 'math-geometry',
    testCases: [
      { label: '3×3 matrix', args: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [[7,4,1],[8,5,2],[9,6,3]] },
      { label: '2×2 matrix', args: [[[1,2],[3,4]]], expected: [[3,1],[4,2]] },
      { label: '1×1 matrix', args: [[[5]]], expected: [[5]] },
    ],
  },
  {
    id: 'spiral-matrix',
    title: 'Spiral Matrix',
    difficulty: 'medium',
    description: 'Given an <code>m × n</code> matrix, return all elements of the matrix in spiral order (clockwise from the outer ring inward).',
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]', explanation: 'Traverse the border, then spiral inward.' },
    ],
    constraints: ['m == matrix.length', 'n == matrix[0].length', '1 ≤ m, n ≤ 10', '-100 ≤ matrix[i][j] ≤ 100'],
    starterCode: `def spiral_order(matrix):
    pass`,
    functionName: 'spiral_order',
    conceptId: 'math-geometry',
    testCases: [
      { label: '3×3', args: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [1,2,3,6,9,8,7,4,5] },
      { label: '2×3', args: [[[1,2,3],[4,5,6]]], expected: [1,2,3,6,5,4] },
      { label: 'Single row', args: [[[1,2,3,4]]], expected: [1,2,3,4] },
      { label: 'Single column', args: [[[1],[2],[3]]], expected: [1,2,3] },
    ],
  },
  {
    id: 'set-matrix-zeroes',
    title: 'Set Matrix Zeroes',
    difficulty: 'medium',
    description: 'Given an <code>m × n</code> integer matrix, if an element is 0, set its entire row and column to 0s in-place. Use O(1) extra space.',
    examples: [
      { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]', explanation: 'Row 1 and column 1 become zero.' },
    ],
    constraints: ['m == matrix.length', 'n == matrix[0].length', '1 ≤ m, n ≤ 200', '-2³¹ ≤ matrix[i][j] ≤ 2³¹ − 1'],
    starterCode: `def set_zeroes(matrix):
    pass`,
    functionName: 'set_zeroes',
    conceptId: 'math-geometry',
    testCases: [
      { label: 'Center zero', args: [[[1,1,1],[1,0,1],[1,1,1]]], expected: [[1,0,1],[0,0,0],[1,0,1]] },
      { label: 'Corner zero', args: [[[0,1,2],[3,4,5],[6,7,8]]], expected: [[0,0,0],[0,4,5],[0,7,8]] },
      { label: 'No zeroes', args: [[[1,2],[3,4]]], expected: [[1,2],[3,4]] },
    ],
  },
  {
    id: 'happy-number',
    title: 'Happy Number',
    difficulty: 'easy',
    description: 'A number is "happy" if repeatedly replacing it with the sum of the squares of its digits eventually reaches 1. Return <code>true</code> if <code>n</code> is a happy number, <code>false</code> otherwise.',
    examples: [
      { input: 'n = 19', output: 'true', explanation: '1² + 9² = 82 → 68 → 100 → 1.' },
      { input: 'n = 2', output: 'false', explanation: 'Enters a cycle that never reaches 1.' },
    ],
    constraints: ['1 ≤ n ≤ 2³¹ − 1'],
    starterCode: `def is_happy(n):
    pass`,
    functionName: 'is_happy',
    conceptId: 'math-geometry',
    testCases: [
      { label: '19 is happy', args: [19], expected: true },
      { label: '2 is not happy', args: [2], expected: false },
      { label: '1 is happy', args: [1], expected: true },
      { label: '7 is happy', args: [7], expected: true },
      { label: '4 is not happy', args: [4], expected: false },
    ],
  },
  {
    id: 'plus-one',
    title: 'Plus One',
    difficulty: 'easy',
    description: 'You are given a large integer as an array of digits, where each element is a single digit. Increment the integer by one and return the resulting array of digits.',
    examples: [
      { input: 'digits = [1,2,3]', output: '[1,2,4]', explanation: '123 + 1 = 124.' },
      { input: 'digits = [9,9]', output: '[1,0,0]', explanation: '99 + 1 = 100.' },
    ],
    constraints: ['1 ≤ digits.length ≤ 100', '0 ≤ digits[i] ≤ 9', 'digits does not contain leading zeros'],
    starterCode: `def plus_one(digits):
    pass`,
    functionName: 'plus_one',
    conceptId: 'math-geometry',
    testCases: [
      { label: 'No carry', args: [[1,2,3]], expected: [1,2,4] },
      { label: 'Carry propagates', args: [[9,9]], expected: [1,0,0] },
      { label: 'Single nine', args: [[9]], expected: [1,0] },
      { label: 'No carry simple', args: [[4,3,2,1]], expected: [4,3,2,2] },
    ],
  },
  {
    id: 'power-x-n',
    title: 'Pow(x, n)',
    difficulty: 'medium',
    description: 'Implement <code>pow(x, n)</code>, which calculates <code>x</code> raised to the power <code>n</code>. Use fast exponentiation (O(log n)) rather than repeated multiplication.',
    examples: [
      { input: 'x = 2.0, n = 10', output: '1024.0' },
      { input: 'x = 2.1, n = 3', output: '9.261', explanation: '2.1³ = 9.261000000000001, rounded.' },
      { input: 'x = 2.0, n = -2', output: '0.25', explanation: '1/4.' },
    ],
    constraints: ['-100.0 < x < 100.0', '-2³¹ ≤ n ≤ 2³¹ − 1', 'n is an integer', 'Either x ≠ 0 or n > 0'],
    starterCode: `def my_pow(x, n):
    pass`,
    functionName: 'my_pow',
    conceptId: 'math-geometry',
    testCases: [
      { label: '2^10', args: [2.0, 10], expected: 1024.0 },
      { label: 'Negative exp', args: [2.0, -2], expected: 0.25 },
      { label: 'n=0', args: [5.0, 0], expected: 1.0 },
      { label: 'n=1', args: [3.0, 1], expected: 3.0 },
    ],
  },
  {
    id: 'multiply-strings',
    title: 'Multiply Strings',
    difficulty: 'medium',
    description: 'Given two non-negative integers <code>num1</code> and <code>num2</code> represented as strings, return the product of <code>num1</code> and <code>num2</code> as a string. You may not convert inputs directly to integers.',
    examples: [
      { input: 'num1 = "2", num2 = "3"', output: '"6"' },
      { input: 'num1 = "123", num2 = "456"', output: '"56088"' },
    ],
    constraints: ['1 ≤ num1.length, num2.length ≤ 200', 'num1 and num2 consist of digits only', 'Neither input has leading zeros except "0"'],
    starterCode: `def multiply(num1, num2):
    pass`,
    functionName: 'multiply',
    conceptId: 'math-geometry',
    testCases: [
      { label: 'Single digits', args: ['2','3'], expected: '6' },
      { label: 'Multi-digit', args: ['123','456'], expected: '56088' },
      { label: 'Multiply by zero', args: ['0','52'], expected: '0' },
      { label: '99×99', args: ['99','99'], expected: '9801' },
    ],
  },
  {
    id: 'roman-to-integer',
    title: 'Roman to Integer',
    difficulty: 'easy',
    description: 'Given a Roman numeral string, convert it to an integer. Roman numerals use the subtractive notation (e.g., IV = 4, IX = 9). Symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.',
    examples: [
      { input: 's = "III"', output: '3' },
      { input: 's = "LVIII"', output: '58', explanation: 'L=50, V=5, III=3.' },
      { input: 's = "MCMXCIV"', output: '1994', explanation: 'M=1000, CM=900, XC=90, IV=4.' },
    ],
    constraints: ['1 ≤ s.length ≤ 15', 's contains only valid Roman numeral characters', 'The integer is in the range [1, 3999]'],
    starterCode: `def roman_to_int(s):
    pass`,
    functionName: 'roman_to_int',
    conceptId: 'math-geometry',
    testCases: [
      { label: 'III', args: ['III'], expected: 3 },
      { label: 'LVIII', args: ['LVIII'], expected: 58 },
      { label: 'MCMXCIV', args: ['MCMXCIV'], expected: 1994 },
      { label: 'IX', args: ['IX'], expected: 9 },
    ],
  },
  {
    id: 'integer-to-roman',
    title: 'Integer to Roman',
    difficulty: 'medium',
    description: 'Given an integer in the range [1, 3999], convert it to its Roman numeral representation using the standard subtractive notation.',
    examples: [
      { input: 'num = 3', output: '"III"' },
      { input: 'num = 58', output: '"LVIII"' },
      { input: 'num = 1994', output: '"MCMXCIV"' },
    ],
    constraints: ['1 ≤ num ≤ 3999'],
    starterCode: `def int_to_roman(num):
    pass`,
    functionName: 'int_to_roman',
    conceptId: 'math-geometry',
    testCases: [
      { label: '3', args: [3], expected: 'III' },
      { label: '58', args: [58], expected: 'LVIII' },
      { label: '1994', args: [1994], expected: 'MCMXCIV' },
      { label: '4', args: [4], expected: 'IV' },
      { label: '9', args: [9], expected: 'IX' },
    ],
  },
  {
    id: 'count-primes',
    title: 'Count Primes',
    difficulty: 'medium',
    description: 'Given an integer <code>n</code>, return the number of prime numbers that are strictly less than <code>n</code>. Use the Sieve of Eratosthenes for efficiency.',
    examples: [
      { input: 'n = 10', output: '4', explanation: 'Primes less than 10: 2, 3, 5, 7.' },
      { input: 'n = 0', output: '0' },
      { input: 'n = 1', output: '0' },
    ],
    constraints: ['0 ≤ n ≤ 5 × 10⁶'],
    starterCode: `def count_primes(n):
    pass`,
    functionName: 'count_primes',
    conceptId: 'math-geometry',
    testCases: [
      { label: 'n=10', args: [10], expected: 4 },
      { label: 'n=0', args: [0], expected: 0 },
      { label: 'n=2', args: [2], expected: 0 },
      { label: 'n=20', args: [20], expected: 8 },
    ],
  },
  {
    id: 'detect-squares',
    title: 'Detect Squares',
    difficulty: 'medium',
    description: 'Design a data structure that receives points one by one. Given a new point, count the number of ways to form an axis-aligned square using the new point and three other previously added points.',
    examples: [
      { input: 'add([3,10]), add([11,2]), add([3,2]), count([11,10])', output: '1', explanation: 'The square (3,2),(3,10),(11,2),(11,10) is valid.' },
    ],
    constraints: ['point.length == 2', '0 ≤ point[i] ≤ 1000', 'At most 3000 calls to add and count'],
    starterCode: `def detect_squares(operations, points):
    from collections import defaultdict
    counts = defaultdict(int)
    point_counts = defaultdict(int)
    result = []
    for op, point in zip(operations, points):
        if op == 'add':
            point_counts[tuple(point)] += 1
            result.append(None)
        else:
            pass  # implement count logic
    return result`,
    functionName: 'detect_squares',
    conceptId: 'math-geometry',
    testCases: [
      { label: 'One square', args: [['add','add','add','count'],[[3,10],[11,2],[3,2],[11,10]]], expected: [null,null,null,1] },
      { label: 'No square', args: [['add','add','count'],[[0,0],[1,1],[2,2]]], expected: [null,null,0] },
    ],
  },

  // ─── SORTING ─────────────────────────────────────────────────────────────────
  {
    id: 'merge-sorted-array',
    title: 'Merge Sorted Array',
    difficulty: 'easy',
    description: 'Given two sorted integer arrays <code>nums1</code> and <code>nums2</code>, merge them in-place into <code>nums1</code> in sorted order. <code>nums1</code> has length <code>m + n</code>, with the last <code>n</code> slots reserved for merging.',
    examples: [
      { input: 'nums1=[1,2,3,0,0,0], m=3, nums2=[2,5,6], n=3', output: '[1,2,2,3,5,6]' },
      { input: 'nums1=[1], m=1, nums2=[], n=0', output: '[1]' },
    ],
    constraints: ['0 ≤ m, n ≤ 200', '1 ≤ m + n', '-10⁹ ≤ nums1[i], nums2[j] ≤ 10⁹'],
    starterCode: `def merge(nums1, m, nums2, n):
    pass`,
    functionName: 'merge',
    conceptId: 'sorting',
    testCases: [
      { label: 'Standard merge', args: [[1,2,3,0,0,0],3,[2,5,6],3], expected: [1,2,2,3,5,6] },
      { label: 'Empty second', args: [[1],1,[],0], expected: [1] },
      { label: 'Empty first', args: [[0],0,[1],1], expected: [1] },
    ],
  },
  {
    id: 'sort-an-array',
    title: 'Sort an Array',
    difficulty: 'medium',
    description: 'Given an array of integers, sort the array in ascending order and return it. Implement merge sort or quicksort (O(n log n) time, O(log n) space).',
    examples: [
      { input: 'nums = [5,2,3,1]', output: '[1,2,3,5]' },
      { input: 'nums = [5,1,1,2,0,0]', output: '[0,0,1,1,2,5]' },
    ],
    constraints: ['1 ≤ nums.length ≤ 5 × 10⁴', '-5 × 10⁴ ≤ nums[i] ≤ 5 × 10⁴'],
    starterCode: `def sort_array(nums):
    pass`,
    functionName: 'sort_array',
    conceptId: 'sorting',
    testCases: [
      { label: 'Unsorted', args: [[5,2,3,1]], expected: [1,2,3,5] },
      { label: 'With duplicates', args: [[5,1,1,2,0,0]], expected: [0,0,1,1,2,5] },
      { label: 'Single', args: [[1]], expected: [1] },
      { label: 'Already sorted', args: [[1,2,3]], expected: [1,2,3] },
    ],
  },
  {
    id: 'largest-number',
    title: 'Largest Number',
    difficulty: 'medium',
    description: 'Given a list of non-negative integers, arrange them such that they form the largest number and return it as a string.',
    examples: [
      { input: 'nums = [10,2]', output: '"210"', explanation: '"210" > "102".' },
      { input: 'nums = [3,30,34,5,9]', output: '"9534330"' },
    ],
    constraints: ['1 ≤ nums.length ≤ 100', '0 ≤ nums[i] ≤ 10⁹'],
    starterCode: `def largest_number(nums):
    pass`,
    functionName: 'largest_number',
    conceptId: 'sorting',
    testCases: [
      { label: '[10,2]', args: [[10,2]], expected: '210' },
      { label: '[3,30,34,5,9]', args: [[3,30,34,5,9]], expected: '9534330' },
      { label: 'All zeros', args: [[0,0]], expected: '0' },
      { label: 'Single', args: [[5]], expected: '5' },
    ],
  },
  {
    id: 'h-index',
    title: 'H-Index',
    difficulty: 'medium',
    description: 'Given an array of integers <code>citations</code> representing the number of citations for each paper, return the researcher\'s h-index: the maximum value <code>h</code> such that at least <code>h</code> papers have at least <code>h</code> citations.',
    examples: [
      { input: 'citations = [3,0,6,1,5]', output: '3', explanation: '3 papers have ≥ 3 citations.' },
      { input: 'citations = [1,3,1]', output: '1' },
    ],
    constraints: ['1 ≤ n ≤ 5000', '0 ≤ citations[i] ≤ 1000'],
    starterCode: `def h_index(citations):
    pass`,
    functionName: 'h_index',
    conceptId: 'sorting',
    testCases: [
      { label: 'Standard', args: [[3,0,6,1,5]], expected: 3 },
      { label: 'Small', args: [[1,3,1]], expected: 1 },
      { label: 'All same', args: [[5,5,5,5,5]], expected: 5 },
      { label: 'All zeros', args: [[0,0]], expected: 0 },
    ],
  },
  {
    id: 'wiggle-sort-ii',
    title: 'Wiggle Sort II',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code>, reorder it such that <code>nums[0] < nums[1] > nums[2] < nums[3]...</code> (strict inequalities). It is guaranteed that a valid answer exists.',
    examples: [
      { input: 'nums = [1,5,1,1,6,4]', output: '[1,6,1,5,1,4]', explanation: 'One valid wiggle arrangement.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 5 × 10⁴', '0 ≤ nums[i] ≤ 5000', 'A valid answer is guaranteed'],
    starterCode: `def wiggle_sort(nums):
    pass`,
    functionName: 'wiggle_sort',
    conceptId: 'sorting',
    testCases: [
      { label: 'Verify wiggle property', args: [[1,5,1,1,6,4]], expected: null },
      { label: '[1,3,2,2,3,1]', args: [[1,3,2,2,3,1]], expected: null },
    ],
  },
  {
    id: 'maximum-gap',
    title: 'Maximum Gap',
    difficulty: 'hard',
    description: 'Given an unsorted array, find the maximum difference between successive elements in its sorted form. Return 0 if the array has fewer than 2 elements. Solve in O(n) time.',
    examples: [
      { input: 'nums = [3,6,9,1]', output: '3', explanation: 'Sorted: [1,3,6,9]. Max gap is 9-6=3.' },
      { input: 'nums = [10]', output: '0' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', '0 ≤ nums[i] ≤ 10⁹'],
    starterCode: `def maximum_gap(nums):
    pass`,
    functionName: 'maximum_gap',
    conceptId: 'sorting',
    testCases: [
      { label: 'Standard', args: [[3,6,9,1]], expected: 3 },
      { label: 'Single', args: [[10]], expected: 0 },
      { label: 'Two elements', args: [[1,10000000]], expected: 9999999 },
      { label: 'Consecutive', args: [[1,2,3,4,5]], expected: 1 },
    ],
  },

  // ─── PREFIX SUM ───────────────────────────────────────────────────────────────
  {
    id: 'running-sum-1d-array',
    title: 'Running Sum of 1d Array',
    difficulty: 'easy',
    description: 'Given an array <code>nums</code>, return the running sum array where <code>runningSum[i] = sum(nums[0]...nums[i])</code>.',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[1,3,6,10]' },
      { input: 'nums = [1,1,1,1,1]', output: '[1,2,3,4,5]' },
    ],
    constraints: ['1 ≤ nums.length ≤ 1000', '-10⁶ ≤ nums[i] ≤ 10⁶'],
    starterCode: `def running_sum(nums):
    pass`,
    functionName: 'running_sum',
    conceptId: 'prefix-sum',
    testCases: [
      { label: 'Increasing', args: [[1,2,3,4]], expected: [1,3,6,10] },
      { label: 'All ones', args: [[1,1,1,1,1]], expected: [1,2,3,4,5] },
      { label: 'With negatives', args: [[3,-2,5]], expected: [3,1,6] },
    ],
  },
  {
    id: 'find-pivot-index',
    title: 'Find Pivot Index',
    difficulty: 'easy',
    description: 'Find the leftmost index such that the sum of all elements to its left equals the sum of all elements to its right. Return -1 if no such index exists.',
    examples: [
      { input: 'nums = [1,7,3,6,5,6]', output: '3', explanation: 'Left sum = 1+7+3 = 11, right sum = 5+6 = 11.' },
      { input: 'nums = [1,2,3]', output: '-1' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-1000 ≤ nums[i] ≤ 1000'],
    starterCode: `def pivot_index(nums):
    pass`,
    functionName: 'pivot_index',
    conceptId: 'prefix-sum',
    testCases: [
      { label: 'Middle pivot', args: [[1,7,3,6,5,6]], expected: 3 },
      { label: 'No pivot', args: [[1,2,3]], expected: -1 },
      { label: 'Left edge', args: [[2,1,-1]], expected: 0 },
      { label: 'Single', args: [[1]], expected: 0 },
    ],
  },
  {
    id: 'range-sum-query-immutable',
    title: 'Range Sum Query - Immutable',
    difficulty: 'easy',
    description: 'Given an integer array <code>nums</code>, handle multiple queries of the form: return the sum of elements between indices <code>left</code> and <code>right</code> (inclusive). Precompute prefix sums to answer each query in O(1).',
    examples: [
      { input: 'nums=[−2,0,3,−5,2,−1], sumRange(0,2), sumRange(2,5), sumRange(0,5)', output: '1, −1, −3', explanation: 'Prefix sums allow O(1) range queries.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁵ ≤ nums[i] ≤ 10⁵', 'At most 10⁴ calls to sumRange'],
    starterCode: `def range_sum_query(nums, queries):
    prefix = [0] * (len(nums) + 1)
    for i, v in enumerate(nums):
        prefix[i+1] = prefix[i] + v
    return [prefix[r+1] - prefix[l] for l, r in queries]`,
    functionName: 'range_sum_query',
    conceptId: 'prefix-sum',
    testCases: [
      { label: 'Multiple queries', args: [[-2,0,3,-5,2,-1],[[0,2],[2,5],[0,5]]], expected: [1,-1,-3] },
      { label: 'Single query', args: [[1,2,3,4],[[1,3]]], expected: [9] },
    ],
  },
  {
    id: 'contiguous-array',
    title: 'Contiguous Array',
    difficulty: 'medium',
    description: 'Given a binary array <code>nums</code>, return the maximum length of a contiguous subarray with equal numbers of 0s and 1s.',
    examples: [
      { input: 'nums = [0,1]', output: '2', explanation: '[0,1] has one 0 and one 1.' },
      { input: 'nums = [0,1,0]', output: '2', explanation: '[0,1] or [1,0] are the longest equal subarrays.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', 'nums[i] is either 0 or 1'],
    starterCode: `def find_max_length(nums):
    pass`,
    functionName: 'find_max_length',
    conceptId: 'prefix-sum',
    testCases: [
      { label: '[0,1]', args: [[0,1]], expected: 2 },
      { label: '[0,1,0]', args: [[0,1,0]], expected: 2 },
      { label: 'Balanced', args: [[0,0,1,0,0,0,1,1]], expected: 6 },
      { label: 'All zeros', args: [[0,0,0]], expected: 0 },
    ],
  },
  {
    id: 'maximum-subarray-sum-one-deletion',
    title: 'Maximum Subarray Sum with One Deletion',
    difficulty: 'medium',
    description: 'Return the maximum sum of a non-empty subarray with at most one element deletion. The subarray must be contiguous and non-empty after deletion.',
    examples: [
      { input: 'arr = [1,-2,0,3]', output: '4', explanation: 'Delete -2 to get [1,0,3].' },
      { input: 'arr = [1,-2,-2,3]', output: '3', explanation: 'Delete -2,-2 is not allowed; best is just [3].' },
    ],
    constraints: ['1 ≤ arr.length ≤ 10⁵', '-10⁴ ≤ arr[i] ≤ 10⁴'],
    starterCode: `def maximum_sum(arr):
    pass`,
    functionName: 'maximum_sum',
    conceptId: 'prefix-sum',
    testCases: [
      { label: '[1,-2,0,3]', args: [[1,-2,0,3]], expected: 4 },
      { label: '[1,-2,-2,3]', args: [[1,-2,-2,3]], expected: 3 },
      { label: 'All positive', args: [[1,2,3]], expected: 6 },
      { label: 'Single negative', args: [[-1,-1,-1,-1]], expected: -1 },
    ],
  },
  {
    id: 'count-of-range-sum',
    title: 'Count of Range Sum',
    difficulty: 'hard',
    description: 'Given an integer array <code>nums</code> and bounds <code>lower</code> and <code>upper</code>, return the number of range sums that lie in <code>[lower, upper]</code> (inclusive). A range sum is <code>S(i, j) = nums[i] + ... + nums[j]</code> for <code>i ≤ j</code>.',
    examples: [
      { input: 'nums=[-2,5,-1], lower=-2, upper=2', output: '3', explanation: 'Ranges: [0,0]→-2, [2,2]→-1, [0,2]→2.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1', '-10⁵ ≤ lower ≤ upper ≤ 10⁵'],
    starterCode: `def count_range_sum(nums, lower, upper):
    pass`,
    functionName: 'count_range_sum',
    conceptId: 'prefix-sum',
    testCases: [
      { label: 'Standard', args: [[-2,5,-1],-2,2], expected: 3 },
      { label: 'Single element', args: [[0],0,0], expected: 1 },
      { label: 'No valid range', args: [[5,5,5],1,4], expected: 0 },
    ],
  },

  // ─── STRING MANIPULATION ─────────────────────────────────────────────────────
  {
    id: 'valid-palindrome-ii',
    title: 'Valid Palindrome II',
    difficulty: 'easy',
    description: 'Given a string <code>s</code>, return <code>true</code> if the string can become a palindrome by removing at most one character.',
    examples: [
      { input: 's = "aba"', output: 'true', explanation: 'Already a palindrome.' },
      { input: 's = "abca"', output: 'true', explanation: 'Remove "c" to get "aba".' },
      { input: 's = "abc"', output: 'false' },
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵', 's consists of lowercase English letters'],
    starterCode: `def valid_palindrome(s):
    pass`,
    functionName: 'valid_palindrome',
    conceptId: 'strings',
    testCases: [
      { label: 'Already palindrome', args: ['aba'], expected: true },
      { label: 'One removal', args: ['abca'], expected: true },
      { label: 'Not possible', args: ['abc'], expected: false },
      { label: 'Empty-like', args: ['a'], expected: true },
    ],
  },
  {
    id: 'longest-palindromic-subsequence',
    title: 'Longest Palindromic Subsequence',
    difficulty: 'medium',
    description: 'Given a string <code>s</code>, return the length of the longest palindromic subsequence (characters don\'t need to be contiguous).',
    examples: [
      { input: 's = "bbbab"', output: '4', explanation: '"bbbb" is the longest palindromic subsequence.' },
      { input: 's = "cbbd"', output: '2', explanation: '"bb" is the longest.' },
    ],
    constraints: ['1 ≤ s.length ≤ 1000', 's consists of lowercase English letters'],
    starterCode: `def longest_palindrome_subseq(s):
    pass`,
    functionName: 'longest_palindrome_subseq',
    conceptId: 'strings',
    testCases: [
      { label: '"bbbab"', args: ['bbbab'], expected: 4 },
      { label: '"cbbd"', args: ['cbbd'], expected: 2 },
      { label: 'Single', args: ['a'], expected: 1 },
      { label: 'All same', args: ['aaaa'], expected: 4 },
    ],
  },
  {
    id: 'reverse-words-in-string',
    title: 'Reverse Words in a String',
    difficulty: 'medium',
    description: 'Given a string <code>s</code>, reverse the order of the words. Words are separated by spaces, and the result should have no leading/trailing spaces and only single spaces between words.',
    examples: [
      { input: 's = "the sky is blue"', output: '"blue is sky the"' },
      { input: 's = "  hello world  "', output: '"world hello"', explanation: 'Leading/trailing spaces removed.' },
    ],
    constraints: ['1 ≤ s.length ≤ 10⁴', 's contains English letters, digits, or spaces', 'At least one word exists'],
    starterCode: `def reverse_words(s):
    pass`,
    functionName: 'reverse_words',
    conceptId: 'strings',
    testCases: [
      { label: 'Normal sentence', args: ['the sky is blue'], expected: 'blue is sky the' },
      { label: 'Extra spaces', args: ['  hello world  '], expected: 'world hello' },
      { label: 'Single word', args: ['a'], expected: 'a' },
    ],
  },
  {
    id: 'string-to-integer-atoi',
    title: 'String to Integer (atoi)',
    difficulty: 'medium',
    description: 'Implement <code>atoi</code>: read leading whitespace, parse optional sign, then read digits until a non-digit or end of string. Clamp the result to the 32-bit signed integer range.',
    examples: [
      { input: 's = "42"', output: '42' },
      { input: 's = "   -42"', output: '-42' },
      { input: 's = "4193 with words"', output: '4193' },
    ],
    constraints: ['0 ≤ s.length ≤ 200', 's consists of English letters, digits, \' \', \'+\', \'-\', \'.\''],
    starterCode: `def my_atoi(s):
    pass`,
    functionName: 'my_atoi',
    conceptId: 'strings',
    testCases: [
      { label: 'Simple', args: ['42'], expected: 42 },
      { label: 'Negative with spaces', args: ['   -42'], expected: -42 },
      { label: 'Letters after', args: ['4193 with words'], expected: 4193 },
      { label: 'Overflow', args: ['99999999999'], expected: 2147483647 },
      { label: 'Empty', args: [''], expected: 0 },
    ],
  },
  {
    id: 'is-subsequence',
    title: 'Is Subsequence',
    difficulty: 'easy',
    description: 'Given strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>s</code> is a subsequence of <code>t</code>. A subsequence maintains relative order but not necessarily contiguous positions.',
    examples: [
      { input: 's = "abc", t = "ahbgdc"', output: 'true', explanation: 'a-h-b-g-d-c contains a, b, c in order.' },
      { input: 's = "axc", t = "ahbgdc"', output: 'false' },
    ],
    constraints: ['0 ≤ s.length ≤ 100', '0 ≤ t.length ≤ 10⁴', 's and t consist of lowercase English letters'],
    starterCode: `def is_subsequence(s, t):
    pass`,
    functionName: 'is_subsequence',
    conceptId: 'strings',
    testCases: [
      { label: 'Is subsequence', args: ['abc','ahbgdc'], expected: true },
      { label: 'Not subsequence', args: ['axc','ahbgdc'], expected: false },
      { label: 'Empty s', args: ['','ahbgdc'], expected: true },
      { label: 'Empty t', args: ['a',''], expected: false },
    ],
  },
  {
    id: 'longest-common-prefix',
    title: 'Longest Common Prefix',
    difficulty: 'easy',
    description: 'Write a function to find the longest common prefix string among an array of strings. Return an empty string if there is no common prefix.',
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
      { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: 'No common prefix.' },
    ],
    constraints: ['1 ≤ strs.length ≤ 200', '0 ≤ strs[i].length ≤ 200', 'strs[i] consists of lowercase English letters'],
    starterCode: `def longest_common_prefix(strs):
    pass`,
    functionName: 'longest_common_prefix',
    conceptId: 'strings',
    testCases: [
      { label: '"fl"', args: [['flower','flow','flight']], expected: 'fl' },
      { label: 'No prefix', args: [['dog','racecar','car']], expected: '' },
      { label: 'Single string', args: [['alone']], expected: 'alone' },
      { label: 'All same', args: [['aa','aa','aa']], expected: 'aa' },
    ],
  },
  {
    id: 'find-first-occurrence-string',
    title: 'Find the Index of the First Occurrence in a String',
    difficulty: 'easy',
    description: 'Given strings <code>haystack</code> and <code>needle</code>, return the index of the first occurrence of <code>needle</code> in <code>haystack</code>, or -1 if <code>needle</code> is not part of <code>haystack</code>.',
    examples: [
      { input: 'haystack = "sadbutsad", needle = "sad"', output: '0', explanation: '"sad" first appears at index 0.' },
      { input: 'haystack = "leetcode", needle = "leeto"', output: '-1' },
    ],
    constraints: ['1 ≤ haystack.length, needle.length ≤ 10⁴', 'Both strings consist of lowercase English letters'],
    starterCode: `def str_str(haystack, needle):
    pass`,
    functionName: 'str_str',
    conceptId: 'strings',
    testCases: [
      { label: 'Found at start', args: ['sadbutsad','sad'], expected: 0 },
      { label: 'Not found', args: ['leetcode','leeto'], expected: -1 },
      { label: 'Found in middle', args: ['hello','ll'], expected: 2 },
      { label: 'Empty needle', args: ['hello',''], expected: 0 },
    ],
  },
  {
    id: 'minimum-add-make-parentheses-valid',
    title: 'Minimum Add to Make Parentheses Valid',
    difficulty: 'medium',
    description: 'A parentheses string is valid if every open bracket has a matching close bracket. Given a string of parentheses, return the minimum number of additions to make it valid.',
    examples: [
      { input: 's = "())"', output: '1', explanation: 'Add one open bracket.' },
      { input: 's = "((("', output: '3', explanation: 'Add three close brackets.' },
    ],
    constraints: ['1 ≤ s.length ≤ 1000', 's[i] is either \'(\' or \')\''],
    starterCode: `def min_add_to_make_valid(s):
    pass`,
    functionName: 'min_add_to_make_valid',
    conceptId: 'strings',
    testCases: [
      { label: 'One extra close', args: ['())'], expected: 1 },
      { label: 'Three opens', args: ['((('], expected: 3 },
      { label: 'Valid', args: ['()'], expected: 0 },
      { label: 'Mixed', args: ['()))(('], expected: 4 },
    ],
  },
  {
    id: 'encode-decode-strings',
    title: 'Encode and Decode Strings',
    difficulty: 'medium',
    description: 'Design an algorithm to encode a list of strings to a single string, then decode it back. The encoded string must be transmittable and decodable without ambiguity, even if strings contain any characters.',
    examples: [
      { input: 'strs = ["Hello","World"]', output: '["Hello","World"]', explanation: 'Encode then decode returns original list.' },
    ],
    constraints: ['0 ≤ strs.length ≤ 200', '0 ≤ strs[i].length ≤ 200', 'strs[i] may contain any ASCII character'],
    starterCode: `def encode(strs):
    pass

def decode(s):
    pass`,
    functionName: 'encode',
    conceptId: 'strings',
    testCases: [
      { label: 'Basic roundtrip', args: [['Hello','World']], expected: ['Hello','World'] },
      { label: 'Empty strings', args: [['','']], expected: ['',''] },
      { label: 'Special chars', args: [['a/b','c#d']], expected: ['a/b','c#d'] },
    ],
  },
  {
    id: 'zigzag-conversion',
    title: 'ZigZag Conversion',
    difficulty: 'medium',
    description: 'The string "PAYPALISHIRING" written in a zigzag pattern on a given number of rows looks like a zigzag. Return the string read line by line.',
    examples: [
      { input: 's = "PAYPALISHIRING", numRows = 3', output: '"PAHNAPLSIIGYIR"', explanation: 'P A H N / A P L S I I G / Y I R read row by row.' },
      { input: 's = "PAYPALISHIRING", numRows = 4', output: '"PINALSIGYAHRPI"' },
    ],
    constraints: ['1 ≤ s.length ≤ 1000', 's consists of English letters, \',\' and \'.\'', '1 ≤ numRows ≤ 1000'],
    starterCode: `def convert(s, num_rows):
    pass`,
    functionName: 'convert',
    conceptId: 'strings',
    testCases: [
      { label: '3 rows', args: ['PAYPALISHIRING',3], expected: 'PAHNAPLSIIGYIR' },
      { label: '4 rows', args: ['PAYPALISHIRING',4], expected: 'PINALSIGYAHRPI' },
      { label: '1 row', args: ['A',1], expected: 'A' },
    ],
  },
  {
    id: 'count-and-say',
    title: 'Count and Say',
    difficulty: 'medium',
    description: 'The count-and-say sequence starts with "1". Each subsequent term describes the previous: "11" (one 1), "21" (two 1s), "1211" (one 2, one 1), etc. Given <code>n</code>, return the nth term.',
    examples: [
      { input: 'n = 1', output: '"1"' },
      { input: 'n = 4', output: '"1211"', explanation: '1→11→21→1211.' },
    ],
    constraints: ['1 ≤ n ≤ 30'],
    starterCode: `def count_and_say(n):
    pass`,
    functionName: 'count_and_say',
    conceptId: 'strings',
    testCases: [
      { label: 'n=1', args: [1], expected: '1' },
      { label: 'n=2', args: [2], expected: '11' },
      { label: 'n=4', args: [4], expected: '1211' },
      { label: 'n=5', args: [5], expected: '111221' },
    ],
  },
  {
    id: 'text-justification',
    title: 'Text Justification',
    difficulty: 'hard',
    description: 'Given an array of strings <code>words</code> and a width <code>maxWidth</code>, format the text so each line has exactly <code>maxWidth</code> characters and is fully left-and-right justified. The last line should be left-justified.',
    examples: [
      { input: 'words=["This","is","an","example","of","text","justification."], maxWidth=16', output: '["This    is    an","example  of text","justification.  "]' },
    ],
    constraints: ['1 ≤ words.length ≤ 300', '1 ≤ words[i].length ≤ 20', '1 ≤ maxWidth ≤ 100', 'words[i] consists of only English letters and symbols'],
    starterCode: `def full_justify(words, max_width):
    pass`,
    functionName: 'full_justify',
    conceptId: 'strings',
    testCases: [
      { label: 'Standard', args: [['This','is','an','example','of','text','justification.'],16], expected: ['This    is    an','example  of text','justification.  '] },
      { label: 'Single word', args: [['What','must','be','acknowledgment','shall','be'],16], expected: ['What   must   be','acknowledgment  ','shall be        '] },
    ],
  },

  // ─── TRIES ───────────────────────────────────────────────────────────────────
  {
    id: 'implement-trie',
    title: 'Implement Trie (Prefix Tree)',
    difficulty: 'medium',
    description: 'Implement a trie (prefix tree) supporting <code>insert(word)</code>, <code>search(word)</code>, and <code>startsWith(prefix)</code>. <code>search</code> returns true only if the exact word was inserted; <code>startsWith</code> returns true if any inserted word has that prefix.',
    examples: [
      { input: 'insert("apple"), search("apple"), search("app"), startsWith("app"), insert("app"), search("app")', output: '[null, true, false, true, null, true]' },
    ],
    constraints: ['1 ≤ word.length ≤ 2000', 'Only lowercase English letters', 'At most 3 × 10⁴ total calls'],
    starterCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        pass

    def search(self, word):
        pass

    def starts_with(self, prefix):
        pass`,
    functionName: 'Trie',
    conceptId: 'tries',
    testCases: [
      { label: 'Insert and search', args: [['insert','search','search','startsWith','insert','search'],['apple','apple','app','app','app','app']], expected: [null,true,false,true,null,true] },
      { label: 'Prefix check', args: [['insert','startsWith','search'],['hello','hel','hel']], expected: [null,true,false] },
    ],
  },
  {
    id: 'design-add-search-words',
    title: 'Design Add and Search Words Data Structure',
    difficulty: 'medium',
    description: 'Design a data structure supporting <code>addWord(word)</code> and <code>search(word)</code> where <code>word</code> may contain the wildcard <code>\'.\' </code> that matches any letter.',
    examples: [
      { input: 'addWord("bad"), addWord("dad"), addWord("mad"), search("pad"), search("bad"), search(".ad"), search("b..")', output: '[null,null,null,false,true,true,true]' },
    ],
    constraints: ['1 ≤ word.length ≤ 25', 'word for addWord consists of lowercase letters; word for search may contain \'.\'', 'At most 10⁴ calls total'],
    starterCode: `class WordDictionary:
    def __init__(self):
        pass

    def add_word(self, word):
        pass

    def search(self, word):
        pass`,
    functionName: 'WordDictionary',
    conceptId: 'tries',
    testCases: [
      { label: 'Wildcard search', args: [['addWord','addWord','addWord','search','search','search','search'],['bad','dad','mad','pad','bad','.ad','b..']], expected: [null,null,null,false,true,true,true] },
    ],
  },
  {
    id: 'replace-words',
    title: 'Replace Words',
    difficulty: 'medium',
    description: 'Given a dictionary of root strings and a sentence, replace each word in the sentence with its shortest matching root. If a word has multiple matching roots, use the shortest one.',
    examples: [
      { input: 'dictionary=["cat","bat","rat"], sentence="the cattle was rattled by the battery"', output: '"the cat was rat by the bat"' },
    ],
    constraints: ['1 ≤ dictionary.length ≤ 1000', '1 ≤ dictionary[i].length ≤ 100', '1 ≤ sentence.length ≤ 10⁶', 'sentence consists of lowercase letters and spaces'],
    starterCode: `def replace_words(dictionary, sentence):
    pass`,
    functionName: 'replace_words',
    conceptId: 'tries',
    testCases: [
      { label: 'Standard', args: [['cat','bat','rat'],'the cattle was rattled by the battery'], expected: 'the cat was rat by the bat' },
      { label: 'No replacement', args: [['a'],'b c d'], expected: 'b c d' },
      { label: 'Multiple roots', args: [['a','b','ab'],'ab ac bc'], expected: 'a a b' },
    ],
  },
  {
    id: 'longest-word-in-dictionary',
    title: 'Longest Word in Dictionary',
    difficulty: 'easy',
    description: 'Given an array of strings <code>words</code>, return the longest word that can be built one character at a time using other words in the array. If there is a tie, return the lexicographically smallest result.',
    examples: [
      { input: 'words = ["w","wo","wor","worl","world"]', output: '"world"', explanation: 'Each prefix is in the array.' },
      { input: 'words = ["a","banana","app","appl","ap","apply","apple"]', output: '"apple"' },
    ],
    constraints: ['1 ≤ words.length ≤ 1000', '1 ≤ words[i].length ≤ 30', 'words[i] consists of lowercase English letters'],
    starterCode: `def longest_word(words):
    pass`,
    functionName: 'longest_word',
    conceptId: 'tries',
    testCases: [
      { label: 'Sequential build', args: [['w','wo','wor','worl','world']], expected: 'world' },
      { label: 'Tie break', args: [['a','banana','app','appl','ap','apply','apple']], expected: 'apple' },
      { label: 'Single char', args: [['a','b','c']], expected: 'a' },
    ],
  },
  {
    id: 'word-search-ii',
    title: 'Word Search II',
    difficulty: 'hard',
    description: 'Given an <code>m × n</code> board of characters and a list of strings <code>words</code>, return all words on the board. Each word must be formed by sequentially adjacent cells (horizontally or vertically), and cells cannot be reused.',
    examples: [
      { input: 'board=[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words=["oath","pea","eat","rain"]', output: '["eat","oath"]' },
    ],
    constraints: ['1 ≤ m, n ≤ 12', '1 ≤ words.length ≤ 3 × 10⁴', 'All inputs consist of lowercase English letters'],
    starterCode: `def find_words(board, words):
    pass`,
    functionName: 'find_words',
    conceptId: 'tries',
    testCases: [
      { label: 'Standard board', args: [[['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']],['oath','pea','eat','rain']], expected: ['eat','oath'] },
      { label: 'Single cell', args: [[['a']],['a']], expected: ['a'] },
      { label: 'No matches', args: [[['a','b'],['c','d']],['xyz']], expected: [] },
    ],
  },


  // ─── INTERVALS ───────────────────────────────────────────────────────────────
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'medium',
    description: 'Given an array of intervals, merge all overlapping intervals and return an array of the non-overlapping intervals.',
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: '[1,3] and [2,6] overlap, so they merge to [1,6].' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]', explanation: 'They share a boundary, so they merge.' },
    ],
    constraints: ['1 ≤ intervals.length ≤ 10⁴', 'intervals[i].length == 2', '0 ≤ start ≤ end ≤ 10⁴'],
    starterCode: `def merge(intervals):
    pass`,
    functionName: 'merge',
    conceptId: 'intervals',
    testCases: [
      { label: 'Two overlapping', args: [[[1,3],[2,6],[8,10],[15,18]]], expected: [[1,6],[8,10],[15,18]] },
      { label: 'Touching', args: [[[1,4],[4,5]]], expected: [[1,5]] },
      { label: 'No overlap', args: [[[1,2],[3,4]]], expected: [[1,2],[3,4]] },
      { label: 'All overlap', args: [[[1,10],[2,3],[4,7]]], expected: [[1,10]] },
    ],
  },
  {
    id: 'insert-interval',
    title: 'Insert Interval',
    difficulty: 'medium',
    description: 'Given an array of non-overlapping intervals sorted by start time, insert a new interval and merge if necessary. Return the resulting array of intervals.',
    examples: [
      { input: 'intervals=[[1,3],[6,9]], newInterval=[2,5]', output: '[[1,5],[6,9]]' },
      { input: 'intervals=[[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval=[4,8]', output: '[[1,2],[3,10],[12,16]]' },
    ],
    constraints: ['0 ≤ intervals.length ≤ 10⁴', 'intervals is sorted and non-overlapping', '0 ≤ newInterval[i] ≤ 10⁵'],
    starterCode: `def insert(intervals, new_interval):
    pass`,
    functionName: 'insert',
    conceptId: 'intervals',
    testCases: [
      { label: 'Overlap in middle', args: [[[1,3],[6,9]],[2,5]], expected: [[1,5],[6,9]] },
      { label: 'Span multiple', args: [[[1,2],[3,5],[6,7],[8,10],[12,16]],[4,8]], expected: [[1,2],[3,10],[12,16]] },
      { label: 'Empty list', args: [[],[5,7]], expected: [[5,7]] },
      { label: 'No overlap before', args: [[[3,5],[6,9]],[1,2]], expected: [[1,2],[3,5],[6,9]] },
    ],
  },
  {
    id: 'non-overlapping-intervals',
    title: 'Non-overlapping Intervals',
    difficulty: 'medium',
    description: 'Given an array of intervals, return the minimum number of intervals you need to remove to make the rest non-overlapping.',
    examples: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1', explanation: 'Remove [1,3] and the rest are non-overlapping.' },
      { input: 'intervals = [[1,2],[1,2],[1,2]]', output: '2' },
    ],
    constraints: ['1 ≤ intervals.length ≤ 10⁵', 'intervals[i].length == 2', '-5 × 10⁴ ≤ start < end ≤ 5 × 10⁴'],
    starterCode: `def erase_overlap_intervals(intervals):
    pass`,
    functionName: 'erase_overlap_intervals',
    conceptId: 'intervals',
    testCases: [
      { label: 'Remove one', args: [[[1,2],[2,3],[3,4],[1,3]]], expected: 1 },
      { label: 'Remove two', args: [[[1,2],[1,2],[1,2]]], expected: 2 },
      { label: 'No removal', args: [[[1,2],[2,3]]], expected: 0 },
      { label: 'All overlap', args: [[[1,4],[1,4],[1,4]]], expected: 2 },
    ],
  },
  {
    id: 'meeting-rooms-ii',
    title: 'Meeting Rooms II',
    difficulty: 'medium',
    description: 'Given an array of meeting time intervals <code>[start, end]</code>, return the minimum number of conference rooms required to hold all meetings.',
    examples: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2', explanation: 'Meetings [0,30] and [5,10] overlap, requiring 2 rooms.' },
      { input: 'intervals = [[7,10],[2,4]]', output: '1' },
    ],
    constraints: ['1 ≤ intervals.length ≤ 10⁴', '0 ≤ start < end ≤ 10⁶'],
    starterCode: `def min_meeting_rooms(intervals):
    pass`,
    functionName: 'min_meeting_rooms',
    conceptId: 'intervals',
    testCases: [
      { label: 'Two rooms needed', args: [[[0,30],[5,10],[15,20]]], expected: 2 },
      { label: 'One room', args: [[[7,10],[2,4]]], expected: 1 },
      { label: 'All at same time', args: [[[1,5],[1,5],[1,5]]], expected: 3 },
      { label: 'Sequential', args: [[[1,2],[2,3],[3,4]]], expected: 1 },
    ],
  },
  {
    id: 'minimum-arrows-burst-balloons',
    title: 'Minimum Number of Arrows to Burst Balloons',
    difficulty: 'medium',
    description: 'Balloons are represented as intervals on a horizontal axis. An arrow shot at x bursts all balloons whose range includes x. Return the minimum number of arrows needed to burst all balloons.',
    examples: [
      { input: 'points = [[10,16],[2,8],[1,6],[7,12]]', output: '2', explanation: 'One arrow at x=6 bursts [2,8],[1,6]. One arrow at x=11 bursts [10,16],[7,12].' },
      { input: 'points = [[1,2],[3,4],[5,6],[7,8]]', output: '4', explanation: 'None overlap; need 4 arrows.' },
    ],
    constraints: ['1 ≤ points.length ≤ 10⁵', 'points[i].length == 2', '-2³¹ ≤ x_start ≤ x_end ≤ 2³¹ − 1'],
    starterCode: `def find_min_arrow_shots(points):
    pass`,
    functionName: 'find_min_arrow_shots',
    conceptId: 'intervals',
    testCases: [
      { label: 'Two arrows', args: [[[10,16],[2,8],[1,6],[7,12]]], expected: 2 },
      { label: 'Four separate', args: [[[1,2],[3,4],[5,6],[7,8]]], expected: 4 },
      { label: 'All overlap', args: [[[1,10],[2,9],[3,8]]], expected: 1 },
    ],
  },
  {
    id: 'interval-list-intersections',
    title: 'Interval List Intersections',
    difficulty: 'medium',
    description: 'Given two lists of closed intervals <code>firstList</code> and <code>secondList</code>, return the intersection of these two interval lists.',
    examples: [
      { input: 'firstList=[[0,2],[5,10],[13,23],[24,25]], secondList=[[1,5],[8,12],[15,24],[25,26]]', output: '[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]' },
    ],
    constraints: ['0 ≤ firstList.length, secondList.length ≤ 1000', '0 ≤ start ≤ end ≤ 10⁹', 'Both lists are sorted and pairwise disjoint'],
    starterCode: `def interval_intersection(first_list, second_list):
    pass`,
    functionName: 'interval_intersection',
    conceptId: 'intervals',
    testCases: [
      { label: 'Standard', args: [[[0,2],[5,10],[13,23],[24,25]],[[1,5],[8,12],[15,24],[25,26]]], expected: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]] },
      { label: 'Empty first', args: [[],[[1,2]]], expected: [] },
      { label: 'No intersection', args: [[[1,2]],[[3,4]]], expected: [] },
    ],
  },
  {
    id: 'my-calendar-i',
    title: 'My Calendar I',
    difficulty: 'medium',
    description: 'Implement a calendar that can book events. A booking is represented by <code>[start, end)</code>. Implement <code>book(start, end)</code> that adds the event if it does not cause a double booking (overlapping events), returning true if successful.',
    examples: [
      { input: 'book(10,20), book(15,25), book(20,30)', output: '[true, false, true]', explanation: '[15,25) overlaps [10,20). [20,30) starts exactly where [10,20) ends — no overlap.' },
    ],
    constraints: ['0 ≤ start < end ≤ 10⁹', 'At most 1000 calls to book'],
    starterCode: `def my_calendar(operations, events):
    booked = []
    result = []
    for start, end in events:
        ok = all(end <= s or start >= e for s, e in booked)
        if ok:
            booked.append((start, end))
        result.append(ok)
    return result`,
    functionName: 'my_calendar',
    conceptId: 'intervals',
    testCases: [
      { label: 'Overlap rejected', args: [[['book','book','book']],[[10,20],[15,25],[20,30]]], expected: [true,false,true] },
    ],
  },

  // ─── GREEDY ───────────────────────────────────────────────────────────────────
  {
    id: 'jump-game',
    title: 'Jump Game',
    difficulty: 'medium',
    description: 'You are given an integer array <code>nums</code> where <code>nums[i]</code> is the maximum jump length from position <code>i</code>. Return <code>true</code> if you can reach the last index starting from index 0.',
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: 'true', explanation: 'Jump 1 to index 1, then 3 to reach the end.' },
      { input: 'nums = [3,2,1,0,4]', output: 'false', explanation: 'You always reach index 3 with value 0.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '0 ≤ nums[i] ≤ 10⁵'],
    starterCode: `def can_jump(nums):
    pass`,
    functionName: 'can_jump',
    conceptId: 'greedy',
    testCases: [
      { label: 'Can reach', args: [[2,3,1,1,4]], expected: true },
      { label: 'Cannot reach', args: [[3,2,1,0,4]], expected: false },
      { label: 'Single element', args: [[0]], expected: true },
      { label: 'All zeros except first', args: [[2,0,0]], expected: true },
    ],
  },
  {
    id: 'jump-game-ii',
    title: 'Jump Game II',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code> where <code>nums[i]</code> is the maximum jump length from index <code>i</code>, return the minimum number of jumps to reach the last index. The answer is always reachable.',
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: '2', explanation: 'Jump 1 to index 1, then 3 jumps to end. Minimum 2 jumps.' },
      { input: 'nums = [2,3,0,1,4]', output: '2' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '0 ≤ nums[i] ≤ 1000', 'Answer is always reachable'],
    starterCode: `def jump(nums):
    pass`,
    functionName: 'jump',
    conceptId: 'greedy',
    testCases: [
      { label: 'Two jumps', args: [[2,3,1,1,4]], expected: 2 },
      { label: 'Two jumps v2', args: [[2,3,0,1,4]], expected: 2 },
      { label: 'Single', args: [[0]], expected: 0 },
      { label: 'Three jumps', args: [[1,1,1,1]], expected: 3 },
    ],
  },
  {
    id: 'gas-station',
    title: 'Gas Station',
    difficulty: 'medium',
    description: 'There are <code>n</code> gas stations in a circle. You are given <code>gas[i]</code> and <code>cost[i]</code> to travel to the next station. Find the starting station index from which you can complete a full circuit. Return -1 if impossible.',
    examples: [
      { input: 'gas=[1,2,3,4,5], cost=[3,4,5,1,2]', output: '3', explanation: 'Starting at station 3 you can complete the circuit.' },
      { input: 'gas=[2,3,4], cost=[3,4,3]', output: '-1' },
    ],
    constraints: ['n == gas.length == cost.length', '1 ≤ n ≤ 10⁵', '0 ≤ gas[i], cost[i] ≤ 10⁴'],
    starterCode: `def can_complete_circuit(gas, cost):
    pass`,
    functionName: 'can_complete_circuit',
    conceptId: 'greedy',
    testCases: [
      { label: 'Station 3', args: [[1,2,3,4,5],[3,4,5,1,2]], expected: 3 },
      { label: 'Impossible', args: [[2,3,4],[3,4,3]], expected: -1 },
      { label: 'Single station', args: [[5],[4]], expected: 0 },
    ],
  },
  {
    id: 'hand-of-straights',
    title: 'Hand of Straights',
    difficulty: 'medium',
    description: 'Alice has some number of cards and wants to rearrange them in groups so that each group is of size <code>groupSize</code> and consists of <code>groupSize</code> consecutive cards. Return <code>true</code> if possible.',
    examples: [
      { input: 'hand=[1,2,3,6,2,3,4,7,8], groupSize=3', output: 'true', explanation: '[1,2,3],[2,3,4],[6,7,8] each have 3 consecutive cards.' },
      { input: 'hand=[1,2,3,4,5], groupSize=4', output: 'false' },
    ],
    constraints: ['1 ≤ hand.length ≤ 10⁴', '0 ≤ hand[i] ≤ 10⁹', '1 ≤ groupSize ≤ hand.length'],
    starterCode: `def is_n_straight_hand(hand, group_size):
    pass`,
    functionName: 'is_n_straight_hand',
    conceptId: 'greedy',
    testCases: [
      { label: 'Valid', args: [[1,2,3,6,2,3,4,7,8],3], expected: true },
      { label: 'Invalid', args: [[1,2,3,4,5],4], expected: false },
      { label: 'Single group', args: [[1,2,3],3], expected: true },
    ],
  },
  {
    id: 'partition-labels',
    title: 'Partition Labels',
    difficulty: 'medium',
    description: 'You are given a string <code>s</code>. Partition it into as many parts as possible such that each letter appears in at most one part. Return a list of the sizes of these parts.',
    examples: [
      { input: 's = "ababcbacadefegdehijhklij"', output: '[9,7,8]', explanation: '"ababcbaca" (9), "defegde" (7), "hijhklij" (8).' },
      { input: 's = "eccbbbbdec"', output: '[10]' },
    ],
    constraints: ['1 ≤ s.length ≤ 500', 's consists of lowercase English letters'],
    starterCode: `def partition_labels(s):
    pass`,
    functionName: 'partition_labels',
    conceptId: 'greedy',
    testCases: [
      { label: 'Three parts', args: ['ababcbacadefegdehijhklij'], expected: [9,7,8] },
      { label: 'One part', args: ['eccbbbbdec'], expected: [10] },
      { label: 'All different', args: ['abc'], expected: [1,1,1] },
    ],
  },
  {
    id: 'valid-parenthesis-string',
    title: 'Valid Parenthesis String',
    difficulty: 'medium',
    description: 'Given a string <code>s</code> containing only <code>(</code>, <code>)</code>, and <code>*</code> (which can be treated as <code>(</code>, <code>)</code>, or empty string), return <code>true</code> if <code>s</code> is valid.',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "(*)"', output: 'true' },
      { input: 's = "(*))"', output: 'true' },
    ],
    constraints: ['1 ≤ s.length ≤ 100', 's[i] is \'(\', \')\', or \'*\''],
    starterCode: `def check_valid_string(s):
    pass`,
    functionName: 'check_valid_string',
    conceptId: 'greedy',
    testCases: [
      { label: 'Simple valid', args: ['()'], expected: true },
      { label: 'Star fills', args: ['(*)'], expected: true },
      { label: 'Star as close', args: ['(*))'], expected: true },
      { label: 'Invalid', args: ['((('], expected: false },
    ],
  },
  {
    id: 'candy',
    title: 'Candy',
    difficulty: 'hard',
    description: 'Children with ratings stand in a line. Each child must receive at least one candy. Children with a higher rating than their neighbor must get more candies. Return the minimum total candies needed.',
    examples: [
      { input: 'ratings = [1,0,2]', output: '5', explanation: '[2,1,2] candies are the minimum.' },
      { input: 'ratings = [1,2,2]', output: '4', explanation: '[1,2,1] candies.' },
    ],
    constraints: ['n == ratings.length', '1 ≤ n ≤ 2 × 10⁴', '0 ≤ ratings[i] ≤ 2 × 10⁴'],
    starterCode: `def candy(ratings):
    pass`,
    functionName: 'candy',
    conceptId: 'greedy',
    testCases: [
      { label: 'Valley', args: [[1,0,2]], expected: 5 },
      { label: 'Equal at end', args: [[1,2,2]], expected: 4 },
      { label: 'Single', args: [[5]], expected: 1 },
      { label: 'Ascending', args: [[1,2,3]], expected: 6 },
    ],
  },
  {
    id: 'boats-to-save-people',
    title: 'Boats to Save People',
    difficulty: 'medium',
    description: 'Each boat can carry at most 2 people and a total weight of <code>limit</code>. Given the weights of people, return the minimum number of boats needed.',
    examples: [
      { input: 'people=[1,2], limit=3', output: '1', explanation: 'Both can ride in one boat.' },
      { input: 'people=[3,2,2,1], limit=3', output: '3', explanation: '(1,2),(2),(3).' },
    ],
    constraints: ['1 ≤ people.length ≤ 5 × 10⁴', '1 ≤ people[i] ≤ limit ≤ 3 × 10⁴'],
    starterCode: `def num_rescue_boats(people, limit):
    pass`,
    functionName: 'num_rescue_boats',
    conceptId: 'greedy',
    testCases: [
      { label: 'Two fit', args: [[1,2],3], expected: 1 },
      { label: 'Three boats', args: [[3,2,2,1],3], expected: 3 },
      { label: 'All alone', args: [[3,3,3,3],3], expected: 4 },
      { label: 'All together', args: [[1,1,1,1],4], expected: 2 },
    ],
  },
  {
    id: 'lemonade-change',
    title: 'Lemonade Change',
    difficulty: 'easy',
    description: 'At a lemonade stand, each lemonade costs $5. Customers pay with $5, $10, or $20 bills. Given the order of bills, return <code>true</code> if you can give every customer correct change.',
    examples: [
      { input: 'bills = [5,5,5,10,20]', output: 'true' },
      { input: 'bills = [5,5,10,10,20]', output: 'false', explanation: 'Not enough $5 bills to make change for the second $20.' },
    ],
    constraints: ['1 ≤ bills.length ≤ 10⁵', 'bills[i] is 5, 10, or 20'],
    starterCode: `def lemonade_change(bills):
    pass`,
    functionName: 'lemonade_change',
    conceptId: 'greedy',
    testCases: [
      { label: 'Can make change', args: [[5,5,5,10,20]], expected: true },
      { label: 'Cannot', args: [[5,5,10,10,20]], expected: false },
      { label: 'All fives', args: [[5,5,5,5]], expected: true },
      { label: 'First $10', args: [[10]], expected: false },
    ],
  },
  {
    id: 'merge-triplets-form-target',
    title: 'Merge Triplets to Form Target Triplet',
    difficulty: 'medium',
    description: 'You have triplets <code>[a,b,c]</code> and a target triplet. In one operation, choose two triplets and replace one with the element-wise maximum. Return <code>true</code> if the target triplet can be formed.',
    examples: [
      { input: 'triplets=[[2,5,3],[1,8,4],[1,7,5]], target=[2,7,5]', output: 'true', explanation: 'Merge [2,5,3] and [1,7,5] to get [2,7,5].' },
      { input: 'triplets=[[3,4,5],[4,5,6]], target=[3,2,5]', output: 'false' },
    ],
    constraints: ['1 ≤ triplets.length ≤ 10⁵', '1 ≤ a, b, c, target[i] ≤ 1000'],
    starterCode: `def merge_triplets(triplets, target):
    pass`,
    functionName: 'merge_triplets',
    conceptId: 'greedy',
    testCases: [
      { label: 'Can form', args: [[[2,5,3],[1,8,4],[1,7,5]],[2,7,5]], expected: true },
      { label: 'Cannot form', args: [[[3,4,5],[4,5,6]],[3,2,5]], expected: false },
      { label: 'Exact match', args: [[[1,2,3]],[1,2,3]], expected: true },
    ],
  },

  // ─── MONOTONIC STACK ─────────────────────────────────────────────────────────
  {
    id: 'next-greater-element-ii',
    title: 'Next Greater Element II',
    difficulty: 'medium',
    description: 'Given a circular array <code>nums</code>, return the next greater number for every element. The next greater number of <code>nums[i]</code> is the first greater number reached when traversing to the right (wrapping around). Return -1 if none.',
    examples: [
      { input: 'nums = [1,2,1]', output: '[2,-1,2]', explanation: 'For nums[2]=1, traverse right: wraps to 2, which is greater.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹'],
    starterCode: `def next_greater_elements(nums):
    pass`,
    functionName: 'next_greater_elements',
    conceptId: 'monotonic-stack',
    testCases: [
      { label: 'Circular', args: [[1,2,1]], expected: [2,-1,2] },
      { label: 'Descending', args: [[3,2,1]], expected: [-1,3,3] },
      { label: 'All same', args: [[1,1,1]], expected: [-1,-1,-1] },
      { label: 'Ascending', args: [[1,2,3]], expected: [2,3,-1] },
    ],
  },
  {
    id: 'online-stock-span',
    title: 'Online Stock Span',
    difficulty: 'medium',
    description: 'Design a class <code>StockSpanner</code> that collects daily stock prices and returns the span of the current price — the number of consecutive days (including today) where the price was ≤ today\'s price.',
    examples: [
      { input: 'next(100), next(80), next(60), next(70), next(60), next(75), next(85)', output: '[1,1,1,2,1,4,6]' },
    ],
    constraints: ['1 ≤ price ≤ 10⁵', 'At most 10⁴ calls to next'],
    starterCode: `class StockSpanner:
    def __init__(self):
        pass

    def next(self, price):
        pass`,
    functionName: 'StockSpanner',
    conceptId: 'monotonic-stack',
    testCases: [
      { label: 'Standard sequence', args: [[[100,80,60,70,60,75,85]]], expected: [1,1,1,2,1,4,6] },
    ],
  },
  {
    id: 'sum-of-subarray-minimums',
    title: 'Sum of Subarray Minimums',
    difficulty: 'medium',
    description: 'Given an array of integers, find the sum of minimums of all subarrays. Return the result modulo 10⁹ + 7.',
    examples: [
      { input: 'arr = [3,1,2,4]', output: '17', explanation: 'Subarrays: [3]=3,[1]=1,[2]=2,[4]=4,[3,1]=1,[1,2]=1,[2,4]=2,[3,1,2]=1,[1,2,4]=1,[3,1,2,4]=1. Sum = 17.' },
    ],
    constraints: ['1 ≤ arr.length ≤ 3 × 10⁴', '1 ≤ arr[i] ≤ 3 × 10⁴'],
    starterCode: `def sum_subarray_mins(arr):
    pass`,
    functionName: 'sum_subarray_mins',
    conceptId: 'monotonic-stack',
    testCases: [
      { label: 'Standard', args: [[3,1,2,4]], expected: 17 },
      { label: 'Decreasing', args: [[3,2,1]], expected: 10 },
      { label: 'Single', args: [[1]], expected: 1 },
      { label: 'All same', args: [[2,2,2]], expected: 12 },
    ],
  },
  {
    id: '132-pattern',
    title: '132 Pattern',
    difficulty: 'medium',
    description: 'Given an array of integers, return <code>true</code> if there exist indices i, j, k such that i < j < k and <code>nums[i] < nums[k] < nums[j]</code> (a "132 pattern").',
    examples: [
      { input: 'nums = [1,2,3,4]', output: 'false', explanation: 'No 132 pattern exists.' },
      { input: 'nums = [3,1,4,2]', output: 'true', explanation: '1 < 2 < 4 at indices 1, 3, 2.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 2 × 10⁵', '-10⁹ ≤ nums[i] ≤ 10⁹'],
    starterCode: `def find132pattern(nums):
    pass`,
    functionName: 'find132pattern',
    conceptId: 'monotonic-stack',
    testCases: [
      { label: 'No pattern', args: [[1,2,3,4]], expected: false },
      { label: 'Has pattern', args: [[3,1,4,2]], expected: true },
      { label: 'Has pattern v2', args: [[-1,3,2,0]], expected: true },
      { label: 'All same', args: [[1,1,1]], expected: false },
    ],
  },
  {
    id: 'remove-duplicate-letters',
    title: 'Remove Duplicate Letters',
    difficulty: 'medium',
    description: 'Given a string <code>s</code>, remove duplicate letters so that every letter appears once. The result must be the smallest in lexicographic order among all possible results.',
    examples: [
      { input: 's = "bcabc"', output: '"abc"', explanation: 'Remove last b and c to get smallest arrangement.' },
      { input: 's = "cbacdcbc"', output: '"acdb"' },
    ],
    constraints: ['1 ≤ s.length ≤ 10⁴', 's consists of lowercase English letters'],
    starterCode: `def remove_duplicate_letters(s):
    pass`,
    functionName: 'remove_duplicate_letters',
    conceptId: 'monotonic-stack',
    testCases: [
      { label: '"bcabc"', args: ['bcabc'], expected: 'abc' },
      { label: '"cbacdcbc"', args: ['cbacdcbc'], expected: 'acdb' },
      { label: 'No duplicates', args: ['abc'], expected: 'abc' },
    ],
  },
  {
    id: 'remove-k-digits',
    title: 'Remove K Digits',
    difficulty: 'medium',
    description: 'Given a non-negative integer <code>num</code> as a string and an integer <code>k</code>, remove <code>k</code> digits to make the smallest possible number. Return the result as a string (no leading zeros).',
    examples: [
      { input: 'num = "1432219", k = 3', output: '"1219"', explanation: 'Remove 4, 3, 2 to get 1219.' },
      { input: 'num = "10200", k = 1', output: '"200"', explanation: 'Remove 1 to get 0200 → "200".' },
      { input: 'num = "10", k = 2', output: '"0"' },
    ],
    constraints: ['1 ≤ k ≤ num.length ≤ 10⁵', 'num consists of digits only', 'num does not have leading zeros except "0"'],
    starterCode: `def remove_k_digits(num, k):
    pass`,
    functionName: 'remove_k_digits',
    conceptId: 'monotonic-stack',
    testCases: [
      { label: 'Remove 3', args: ['1432219',3], expected: '1219' },
      { label: 'Leading zero', args: ['10200',1], expected: '200' },
      { label: 'Remove all', args: ['10',2], expected: '0' },
      { label: 'Already min', args: ['123',1], expected: '12' },
    ],
  },
  {
    id: 'maximum-width-ramp',
    title: 'Maximum Width Ramp',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code>, a ramp is a pair (i, j) with i < j and nums[i] ≤ nums[j]. Return the maximum width j − i of any ramp, or 0 if no ramp exists.',
    examples: [
      { input: 'nums = [6,0,8,2,1,5]', output: '4', explanation: 'Ramp (1, 5): nums[1]=0 ≤ nums[5]=5, width = 4.' },
      { input: 'nums = [9,8,1,0,1,9,4,0,4,1]', output: '7' },
    ],
    constraints: ['2 ≤ nums.length ≤ 5 × 10⁴', '0 ≤ nums[i] ≤ 5 × 10⁴'],
    starterCode: `def max_width_ramp(nums):
    pass`,
    functionName: 'max_width_ramp',
    conceptId: 'monotonic-stack',
    testCases: [
      { label: 'Width 4', args: [[6,0,8,2,1,5]], expected: 4 },
      { label: 'Width 7', args: [[9,8,1,0,1,9,4,0,4,1]], expected: 7 },
      { label: 'Descending', args: [[3,2,1]], expected: 0 },
      { label: 'Single ramp', args: [[1,2]], expected: 1 },
    ],
  },

  // ─── ARRAYS (additional) ─────────────────────────────────────────────────────
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code>, find the contiguous subarray with the largest sum and return that sum. (Kadane\'s Algorithm)',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: '[4,-1,2,1] has the largest sum = 6.' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
    starterCode: `def max_sub_array(nums):
    pass`,
    functionName: 'max_sub_array',
    conceptId: 'arrays',
    testCases: [
      { label: 'Mixed values', args: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
      { label: 'Single', args: [[1]], expected: 1 },
      { label: 'All positive', args: [[5,4,-1,7,8]], expected: 23 },
      { label: 'All negative', args: [[-1,-2,-3]], expected: -1 },
    ],
  },
  {
    id: 'subarray-sum-equals-k',
    title: 'Subarray Sum Equals K',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code> and an integer <code>k</code>, return the total number of subarrays whose sum equals <code>k</code>.',
    examples: [
      { input: 'nums=[1,1,1], k=2', output: '2', explanation: 'Subarrays [1,1] starting at index 0 and 1.' },
      { input: 'nums=[1,2,3], k=3', output: '2', explanation: '[1,2] and [3].' },
    ],
    constraints: ['1 ≤ nums.length ≤ 2 × 10⁴', '-1000 ≤ nums[i] ≤ 1000', '-10⁷ ≤ k ≤ 10⁷'],
    starterCode: `def subarray_sum(nums, k):
    pass`,
    functionName: 'subarray_sum',
    conceptId: 'arrays',
    testCases: [
      { label: 'Two subarrays', args: [[1,1,1],2], expected: 2 },
      { label: 'Two paths', args: [[1,2,3],3], expected: 2 },
      { label: 'Negative values', args: [[1,-1,1],1], expected: 3 },
      { label: 'No match', args: [[1,2,3],7], expected: 0 },
    ],
  },
  {
    id: 'move-zeroes',
    title: 'Move Zeroes',
    difficulty: 'easy',
    description: 'Given an integer array <code>nums</code>, move all 0s to the end while maintaining the relative order of non-zero elements. Do it in-place without making a copy.',
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]' },
      { input: 'nums = [0]', output: '[0]' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1'],
    starterCode: `def move_zeroes(nums):
    pass
    return nums`,
    functionName: 'move_zeroes',
    conceptId: 'arrays',
    testCases: [
      { label: 'Standard', args: [[0,1,0,3,12]], expected: [1,3,12,0,0] },
      { label: 'Single zero', args: [[0]], expected: [0] },
      { label: 'No zeros', args: [[1,2,3]], expected: [1,2,3] },
      { label: 'All zeros', args: [[0,0,0]], expected: [0,0,0] },
    ],
  },
  {
    id: 'find-all-duplicates-in-array',
    title: 'Find All Duplicates in an Array',
    difficulty: 'medium',
    description: 'Given an array of integers in the range [1, n] where some elements appear twice and others appear once, find all elements that appear twice. Use O(1) extra space.',
    examples: [
      { input: 'nums = [4,3,2,7,8,2,3,1]', output: '[2,3]' },
      { input: 'nums = [1,1,2]', output: '[1]' },
    ],
    constraints: ['n == nums.length', '1 ≤ n ≤ 10⁵', '1 ≤ nums[i] ≤ n', 'Each element appears once or twice'],
    starterCode: `def find_duplicates(nums):
    pass`,
    functionName: 'find_duplicates',
    conceptId: 'arrays',
    testCases: [
      { label: 'Two duplicates', args: [[4,3,2,7,8,2,3,1]], expected: [2,3] },
      { label: 'One duplicate', args: [[1,1,2]], expected: [1] },
      { label: 'No duplicates', args: [[1,2,3]], expected: [] },
    ],
  },
  {
    id: 'first-missing-positive',
    title: 'First Missing Positive',
    difficulty: 'hard',
    description: 'Given an unsorted integer array, return the smallest missing positive integer. Your algorithm must run in O(n) time and use O(1) auxiliary space.',
    examples: [
      { input: 'nums = [1,2,0]', output: '3' },
      { input: 'nums = [3,4,-1,1]', output: '2' },
      { input: 'nums = [7,8,9,11,12]', output: '1' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1'],
    starterCode: `def first_missing_positive(nums):
    pass`,
    functionName: 'first_missing_positive',
    conceptId: 'arrays',
    testCases: [
      { label: 'Missing 3', args: [[1,2,0]], expected: 3 },
      { label: 'Missing 2', args: [[3,4,-1,1]], expected: 2 },
      { label: 'Missing 1', args: [[7,8,9,11,12]], expected: 1 },
      { label: 'Sequential', args: [[1,2,3]], expected: 4 },
    ],
  },
  {
    id: 'pascals-triangle',
    title: "Pascal's Triangle",
    difficulty: 'easy',
    description: 'Given an integer <code>numRows</code>, return the first <code>numRows</code> of Pascal\'s triangle, where each number is the sum of the two numbers directly above it.',
    examples: [
      { input: 'numRows = 5', output: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]' },
      { input: 'numRows = 1', output: '[[1]]' },
    ],
    constraints: ['1 ≤ numRows ≤ 30'],
    starterCode: `def generate(num_rows):
    pass`,
    functionName: 'generate',
    conceptId: 'arrays',
    testCases: [
      { label: '5 rows', args: [5], expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]] },
      { label: '1 row', args: [1], expected: [[1]] },
      { label: '3 rows', args: [3], expected: [[1],[1,1],[1,2,1]] },
    ],
  },
  {
    id: 'best-time-buy-sell-stock-ii',
    title: 'Best Time to Buy and Sell Stock II',
    difficulty: 'medium',
    description: 'Given an integer array <code>prices</code> where <code>prices[i]</code> is the price of a stock on day <code>i</code>, find the maximum profit you can achieve. You may complete as many transactions as you like (buy then sell, then buy again).',
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '7', explanation: 'Buy on day 2 (price 1) and sell on day 3 (price 5) for profit 4. Then buy on day 4 (price 3) and sell on day 5 (price 6) for profit 3. Total = 7.' },
    ],
    constraints: ['1 ≤ prices.length ≤ 3 × 10⁴', '0 ≤ prices[i] ≤ 10⁴'],
    starterCode: `def max_profit(prices):
    pass`,
    functionName: 'max_profit',
    conceptId: 'arrays',
    testCases: [
      { label: 'Multiple transactions', args: [[7,1,5,3,6,4]], expected: 7 },
      { label: 'Ascending', args: [[1,2,3,4,5]], expected: 4 },
      { label: 'Descending', args: [[7,6,4,3,1]], expected: 0 },
    ],
  },
  {
    id: 'rotate-array',
    title: 'Rotate Array',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code>, rotate the array to the right by <code>k</code> steps in-place.',
    examples: [
      { input: 'nums=[1,2,3,4,5,6,7], k=3', output: '[5,6,7,1,2,3,4]', explanation: 'Rotate right 3 times.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1', '0 ≤ k ≤ 10⁵'],
    starterCode: `def rotate(nums, k):
    pass
    return nums`,
    functionName: 'rotate',
    conceptId: 'arrays',
    testCases: [
      { label: 'Rotate 3', args: [[1,2,3,4,5,6,7],3], expected: [5,6,7,1,2,3,4] },
      { label: 'Rotate by length', args: [[1,2],2], expected: [1,2] },
      { label: 'Rotate 1', args: [[1,2,3],1], expected: [3,1,2] },
    ],
  },
  {
    id: 'next-permutation',
    title: 'Next Permutation',
    difficulty: 'medium',
    description: 'Given an array of integers, rearrange the numbers into the next lexicographically greater permutation. If no such permutation exists, rearrange to the smallest (ascending) order. Modify in-place.',
    examples: [
      { input: 'nums = [1,2,3]', output: '[1,3,2]', explanation: 'Next permutation is [1,3,2].' },
      { input: 'nums = [3,2,1]', output: '[1,2,3]', explanation: 'Largest permutation; wrap to smallest.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 100', '0 ≤ nums[i] ≤ 100'],
    starterCode: `def next_permutation(nums):
    pass
    return nums`,
    functionName: 'next_permutation',
    conceptId: 'arrays',
    testCases: [
      { label: '[1,2,3]', args: [[1,2,3]], expected: [1,3,2] },
      { label: '[3,2,1]', args: [[3,2,1]], expected: [1,2,3] },
      { label: '[1,1,5]', args: [[1,1,5]], expected: [1,5,1] },
      { label: 'Single', args: [[1]], expected: [1] },
    ],
  },

  // ─── TWO POINTERS (additional) ───────────────────────────────────────────────
  {
    id: 'squares-sorted-array',
    title: 'Squares of a Sorted Array',
    difficulty: 'easy',
    description: 'Given an integer array <code>nums</code> sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.',
    examples: [
      { input: 'nums = [-4,-1,0,3,10]', output: '[0,1,9,16,100]' },
      { input: 'nums = [-7,-3,2,3,11]', output: '[4,9,9,49,121]' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁴ ≤ nums[i] ≤ 10⁴', 'nums is sorted'],
    starterCode: `def sorted_squares(nums):
    pass`,
    functionName: 'sorted_squares',
    conceptId: 'two-pointers',
    testCases: [
      { label: 'Negatives and positives', args: [[-4,-1,0,3,10]], expected: [0,1,9,16,100] },
      { label: 'Mixed', args: [[-7,-3,2,3,11]], expected: [4,9,9,49,121] },
      { label: 'All negative', args: [[-3,-2,-1]], expected: [1,4,9] },
    ],
  },
  {
    id: 'sort-array-by-parity',
    title: 'Sort Array By Parity',
    difficulty: 'easy',
    description: 'Given an integer array <code>nums</code>, move all even integers to the beginning followed by all odd integers. Return any valid arrangement.',
    examples: [
      { input: 'nums = [3,1,2,4]', output: '[2,4,3,1]', explanation: 'Even numbers first, then odd. Multiple valid answers exist.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 5000', '0 ≤ nums[i] ≤ 5000'],
    starterCode: `def sort_array_by_parity(nums):
    pass`,
    functionName: 'sort_array_by_parity',
    conceptId: 'two-pointers',
    testCases: [
      { label: 'Evens first check', args: [[3,1,2,4]], expected: null },
      { label: 'All even', args: [[2,4,6]], expected: [2,4,6] },
      { label: 'All odd', args: [[1,3,5]], expected: [1,3,5] },
    ],
  },
  {
    id: '3sum-closest',
    title: '3Sum Closest',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code> and integer <code>target</code>, find three integers in <code>nums</code> such that the sum is closest to <code>target</code>. Return that sum.',
    examples: [
      { input: 'nums=[-1,2,1,-4], target=1', output: '2', explanation: 'The sum -1+2+1=2 is closest to 1.' },
      { input: 'nums=[0,0,0], target=1', output: '0' },
    ],
    constraints: ['3 ≤ nums.length ≤ 500', '-1000 ≤ nums[i] ≤ 1000', '-10⁴ ≤ target ≤ 10⁴'],
    starterCode: `def three_sum_closest(nums, target):
    pass`,
    functionName: 'three_sum_closest',
    conceptId: 'two-pointers',
    testCases: [
      { label: 'Closest is 2', args: [[-1,2,1,-4],1], expected: 2 },
      { label: 'All zeros', args: [[0,0,0],1], expected: 0 },
      { label: 'Exact match', args: [[1,2,3],6], expected: 6 },
    ],
  },
  {
    id: 'max-k-sum-pairs',
    title: 'Max Number of K-Sum Pairs',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code> and an integer <code>k</code>, in one operation pick two numbers that sum to <code>k</code> and remove them. Return the maximum number of such operations.',
    examples: [
      { input: 'nums=[1,2,3,4], k=5', output: '2', explanation: '(1,4) and (2,3) are removed in 2 operations.' },
      { input: 'nums=[3,1,3,4,3], k=6', output: '1', explanation: 'Only one pair (3,3).' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', '1 ≤ nums[i] ≤ 10⁹', '2 ≤ k ≤ 10⁹'],
    starterCode: `def max_operations(nums, k):
    pass`,
    functionName: 'max_operations',
    conceptId: 'two-pointers',
    testCases: [
      { label: 'Two pairs', args: [[1,2,3,4],5], expected: 2 },
      { label: 'One pair', args: [[3,1,3,4,3],6], expected: 1 },
      { label: 'No pairs', args: [[1,2,3],10], expected: 0 },
    ],
  },
  {
    id: '4sum',
    title: '4Sum',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code> and integer <code>target</code>, return all unique quadruplets <code>[nums[a], nums[b], nums[c], nums[d]]</code> that sum to <code>target</code>.',
    examples: [
      { input: 'nums=[1,0,-1,0,-2,2], target=0', output: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]' },
      { input: 'nums=[2,2,2,2,2], target=8', output: '[[2,2,2,2]]' },
    ],
    constraints: ['1 ≤ nums.length ≤ 200', '-10⁹ ≤ nums[i] ≤ 10⁹', '-10⁹ ≤ target ≤ 10⁹'],
    starterCode: `def four_sum(nums, target):
    pass`,
    functionName: 'four_sum',
    conceptId: 'two-pointers',
    testCases: [
      { label: 'Three quadruplets', args: [[1,0,-1,0,-2,2],0], expected: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]] },
      { label: 'All same', args: [[2,2,2,2,2],8], expected: [[2,2,2,2]] },
      { label: 'No solution', args: [[1,2,3,4],100], expected: [] },
    ],
  },
  {
    id: 'minimum-length-after-deleting',
    title: 'Minimum Length of String After Deleting Similar Ends',
    difficulty: 'medium',
    description: 'Given a string <code>s</code> consisting only of characters \'a\', \'b\', and \'c\'. Apply the following operation any number of times: if the leftmost and rightmost characters are equal, remove them. Return the minimum length of the resulting string.',
    examples: [
      { input: 's = "ca"', output: '2', explanation: 'No operation possible.' },
      { input: 's = "cabaabac"', output: '0', explanation: 'Remove all via: c..c → a..a → b..b.' },
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵', 's consists of \'a\', \'b\', \'c\''],
    starterCode: `def minimum_length(s):
    pass`,
    functionName: 'minimum_length',
    conceptId: 'two-pointers',
    testCases: [
      { label: 'No ops', args: ['ca'], expected: 2 },
      { label: 'Remove all', args: ['cabaabac'], expected: 0 },
      { label: 'All same', args: ['aaa'], expected: 0 },
      { label: 'Single', args: ['a'], expected: 1 },
    ],
  },


  // ─── SLIDING WINDOW (additional) ─────────────────────────────────────────────
  {
    id: 'max-consecutive-ones-iii',
    title: 'Max Consecutive Ones III',
    difficulty: 'medium',
    description: 'Given a binary array <code>nums</code> and an integer <code>k</code>, return the maximum number of consecutive 1s in the array if you can flip at most <code>k</code> zeros.',
    examples: [
      { input: 'nums=[1,1,1,0,0,0,1,1,1,1,0], k=2', output: '6', explanation: 'Flip two zeros at indices 9 and 10: [1,1,1,0,0,1,1,1,1,1,1] → max run of 6.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', 'nums[i] is 0 or 1', '0 ≤ k ≤ nums.length'],
    starterCode: `def longest_ones(nums, k):
    pass`,
    functionName: 'longest_ones',
    conceptId: 'sliding-window',
    testCases: [
      { label: 'k=2', args: [[1,1,1,0,0,0,1,1,1,1,0],2], expected: 6 },
      { label: 'k=0', args: [[0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1],0], expected: 3 },
      { label: 'All ones', args: [[1,1,1],2], expected: 3 },
      { label: 'k=1', args: [[0,0,0],1], expected: 1 },
    ],
  },
  {
    id: 'minimum-size-subarray-sum',
    title: 'Minimum Size Subarray Sum',
    difficulty: 'medium',
    description: 'Given an array of positive integers <code>nums</code> and a positive integer <code>target</code>, return the minimal length of a contiguous subarray whose sum is ≥ <code>target</code>. Return 0 if no such subarray exists.',
    examples: [
      { input: 'target=7, nums=[2,3,1,2,4,3]', output: '2', explanation: '[4,3] has sum 7 and length 2.' },
      { input: 'target=4, nums=[1,4,4]', output: '1' },
    ],
    constraints: ['1 ≤ target ≤ 10⁹', '1 ≤ nums.length ≤ 10⁵', '1 ≤ nums[i] ≤ 10⁴'],
    starterCode: `def min_sub_array_len(target, nums):
    pass`,
    functionName: 'min_sub_array_len',
    conceptId: 'sliding-window',
    testCases: [
      { label: 'Length 2', args: [7,[2,3,1,2,4,3]], expected: 2 },
      { label: 'Length 1', args: [4,[1,4,4]], expected: 1 },
      { label: 'No solution', args: [11,[1,1,1,1,1]], expected: 0 },
      { label: 'Whole array', args: [7,[2,3,2]], expected: 3 },
    ],
  },
  {
    id: 'fruit-into-baskets',
    title: 'Fruit Into Baskets',
    difficulty: 'medium',
    description: 'You have two baskets and a fruit-type array. Starting from any position, you must pick fruits moving right, but each basket can hold only one type of fruit. Return the maximum fruits you can collect.',
    examples: [
      { input: 'fruits = [1,2,1]', output: '3', explanation: 'Pick all three fruits.' },
      { input: 'fruits = [0,1,2,2]', output: '3', explanation: 'Pick fruits 1,2,2.' },
    ],
    constraints: ['1 ≤ fruits.length ≤ 10⁵', '0 ≤ fruits[i] < fruits.length'],
    starterCode: `def total_fruit(fruits):
    pass`,
    functionName: 'total_fruit',
    conceptId: 'sliding-window',
    testCases: [
      { label: 'All unique max 3', args: [[1,2,1]], expected: 3 },
      { label: 'Sliding window', args: [[0,1,2,2]], expected: 3 },
      { label: 'Three types', args: [[1,2,3,2,2]], expected: 4 },
      { label: 'Single type', args: [[1,1,1]], expected: 3 },
    ],
  },
  {
    id: 'count-number-nice-subarrays',
    title: 'Count Number of Nice Subarrays',
    difficulty: 'medium',
    description: 'Given an array of integers <code>nums</code> and integer <code>k</code>, a "nice" subarray contains exactly <code>k</code> odd numbers. Return the number of nice subarrays.',
    examples: [
      { input: 'nums=[1,1,2,1,1], k=3', output: '2', explanation: 'Subarrays [1,1,2,1] and [1,2,1,1] each have exactly 3 odd numbers.' },
      { input: 'nums=[2,4,6], k=1', output: '0' },
    ],
    constraints: ['1 ≤ nums.length ≤ 50000', '1 ≤ nums[i] ≤ 10⁵', '1 ≤ k ≤ nums.length'],
    starterCode: `def number_of_subarrays(nums, k):
    pass`,
    functionName: 'number_of_subarrays',
    conceptId: 'sliding-window',
    testCases: [
      { label: 'Two nice', args: [[1,1,2,1,1],3], expected: 2 },
      { label: 'No nice', args: [[2,4,6],1], expected: 0 },
      { label: 'All odd', args: [[1,3,5],2], expected: 2 },
    ],
  },
  {
    id: 'grumpy-bookstore-owner',
    title: 'Grumpy Bookstore Owner',
    difficulty: 'medium',
    description: 'A bookstore owner has customers per minute and a grumpy array where <code>grumpy[i] = 1</code> means they are grumpy that minute. They can suppress grumpiness for <code>minutes</code> consecutive minutes. Return the maximum satisfied customers.',
    examples: [
      { input: 'customers=[1,0,1,2,1,1,7,5], grumpy=[0,1,0,1,0,1,0,1], minutes=3', output: '16', explanation: 'Suppress grumpiness minutes 3–5.' },
    ],
    constraints: ['n == customers.length == grumpy.length', '1 ≤ minutes ≤ n ≤ 2 × 10⁴', '0 ≤ customers[i] ≤ 1000'],
    starterCode: `def max_satisfied(customers, grumpy, minutes):
    pass`,
    functionName: 'max_satisfied',
    conceptId: 'sliding-window',
    testCases: [
      { label: 'Standard', args: [[1,0,1,2,1,1,7,5],[0,1,0,1,0,1,0,1],3], expected: 16 },
      { label: 'Never grumpy', args: [[1,2,3],[0,0,0],1], expected: 6 },
    ],
  },
  {
    id: 'substring-concatenation-all-words',
    title: 'Substring with Concatenation of All Words',
    difficulty: 'hard',
    description: 'Given a string <code>s</code> and an array <code>words</code> (all same length), return all starting indices of substrings that are a concatenation of all words in any order.',
    examples: [
      { input: 's="barfoothefoobarman", words=["foo","bar"]', output: '[0,9]', explanation: '"barfoo" starts at 0; "foobar" starts at 9.' },
      { input: 's="wordgoodgoodgoodbestword", words=["word","good","best","word"]', output: '[]' },
    ],
    constraints: ['1 ≤ s.length ≤ 10⁴', '1 ≤ words.length ≤ 5000', 'words[i].length == 1..30'],
    starterCode: `def find_substring(s, words):
    pass`,
    functionName: 'find_substring',
    conceptId: 'sliding-window',
    testCases: [
      { label: 'Two indices', args: ['barfoothefoobarman',['foo','bar']], expected: [0,9] },
      { label: 'No match', args: ['wordgoodgoodgoodbestword',['word','good','best','word']], expected: [] },
    ],
  },

  // ─── STACK (additional) ───────────────────────────────────────────────────────
  {
    id: 'decode-string',
    title: 'Decode String',
    difficulty: 'medium',
    description: 'Given an encoded string like <code>"3[a2[c]]"</code>, return its decoded string. The encoding rule is <code>k[encoded_string]</code>, where the string inside is repeated exactly <code>k</code> times.',
    examples: [
      { input: 's = "3[a]2[bc]"', output: '"aaabcbc"' },
      { input: 's = "3[a2[c]]"', output: '"accaccacc"' },
    ],
    constraints: ['1 ≤ s.length ≤ 30', 's consists of digits, lowercase letters, and brackets', 'All integers are in range [1, 300]'],
    starterCode: `def decode_string(s):
    pass`,
    functionName: 'decode_string',
    conceptId: 'stack',
    testCases: [
      { label: 'Simple', args: ['3[a]2[bc]'], expected: 'aaabcbc' },
      { label: 'Nested', args: ['3[a2[c]]'], expected: 'accaccacc' },
      { label: 'Single', args: ['2[abc]'], expected: 'abcabc' },
      { label: 'No brackets', args: ['abc'], expected: 'abc' },
    ],
  },
  {
    id: 'basic-calculator-ii',
    title: 'Basic Calculator II',
    difficulty: 'medium',
    description: 'Given a string <code>s</code> representing an expression with non-negative integers, <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, and spaces, evaluate and return the result as an integer. Integer division truncates toward zero.',
    examples: [
      { input: 's = "3+2*2"', output: '7' },
      { input: 's = " 3/2 "', output: '1' },
      { input: 's = " 3+5 / 2 "', output: '5' },
    ],
    constraints: ['1 ≤ s.length ≤ 3 × 10⁵', 's consists of digits, operators, and spaces', 'All operands fit in a 32-bit integer'],
    starterCode: `def calculate(s):
    pass`,
    functionName: 'calculate',
    conceptId: 'stack',
    testCases: [
      { label: 'Precedence', args: ['3+2*2'], expected: 7 },
      { label: 'Division', args: [' 3/2 '], expected: 1 },
      { label: 'Mixed', args: [' 3+5 / 2 '], expected: 5 },
      { label: 'Subtraction', args: ['10-3*2+1'], expected: 5 },
    ],
  },
  {
    id: 'simplify-path',
    title: 'Simplify Path',
    difficulty: 'medium',
    description: 'Given an absolute path for a Unix file system, simplify it to the canonical path. The canonical path starts with <code>/</code>, has no trailing <code>/</code>, and resolves <code>..</code> (parent) and <code>.</code> (current).',
    examples: [
      { input: 'path = "/home/"', output: '"/home"' },
      { input: 'path = "/home//foo/"', output: '"/home/foo"' },
      { input: 'path = "/home/user/Documents/../Pictures"', output: '"/home/user/Pictures"' },
    ],
    constraints: ['1 ≤ path.length ≤ 3000', 'path is a valid absolute Unix path'],
    starterCode: `def simplify_path(path):
    pass`,
    functionName: 'simplify_path',
    conceptId: 'stack',
    testCases: [
      { label: 'Trailing slash', args: ['/home/'], expected: '/home' },
      { label: 'Double slash', args: ['/home//foo/'], expected: '/home/foo' },
      { label: 'Parent dir', args: ['/home/user/Documents/../Pictures'], expected: '/home/user/Pictures' },
      { label: 'Go to root', args: ['/../'], expected: '/' },
    ],
  },
  {
    id: 'asteroid-collision',
    title: 'Asteroid Collision',
    difficulty: 'medium',
    description: 'Asteroids move in a row: positive = right, negative = left. When two collide, the smaller explodes; equal-sized ones both explode. Return the final state after all collisions.',
    examples: [
      { input: 'asteroids = [5,10,-5]', output: '[5,10]', explanation: '-5 and 10 collide; 10 survives.' },
      { input: 'asteroids = [8,-8]', output: '[]', explanation: 'Both same size; both explode.' },
      { input: 'asteroids = [10,2,-5]', output: '[10]', explanation: '-5 and 2 collide; -5 wins. -5 and 10 collide; 10 wins.' },
    ],
    constraints: ['2 ≤ asteroids.length ≤ 10⁴', '-1000 ≤ asteroids[i] ≤ 1000', 'asteroids[i] ≠ 0'],
    starterCode: `def asteroid_collision(asteroids):
    pass`,
    functionName: 'asteroid_collision',
    conceptId: 'stack',
    testCases: [
      { label: 'One survives', args: [[5,10,-5]], expected: [5,10] },
      { label: 'Both explode', args: [[8,-8]], expected: [] },
      { label: '10 survives', args: [[10,2,-5]], expected: [10] },
      { label: 'No collision', args: [[1,2,3]], expected: [1,2,3] },
    ],
  },
  {
    id: 'basic-calculator',
    title: 'Basic Calculator',
    difficulty: 'hard',
    description: 'Implement a basic calculator to evaluate a string expression containing <code>+</code>, <code>-</code>, parentheses, and non-negative integers. No multiplication or division.',
    examples: [
      { input: 's = "1 + 1"', output: '2' },
      { input: 's = " 2-1 + 2 "', output: '3' },
      { input: 's = "(1+(4+5+2)-3)+(6+8)"', output: '23' },
    ],
    constraints: ['1 ≤ s.length ≤ 3 × 10⁵', 's contains only digits, \'+\', \'-\', \'(\', \')\', and spaces', 'Expression is valid'],
    starterCode: `def calculate(s):
    pass`,
    functionName: 'calculate',
    conceptId: 'stack',
    testCases: [
      { label: 'Simple', args: ['1 + 1'], expected: 2 },
      { label: 'With subtraction', args: [' 2-1 + 2 '], expected: 3 },
      { label: 'With parens', args: ['(1+(4+5+2)-3)+(6+8)'], expected: 23 },
    ],
  },
  {
    id: 'score-of-parentheses',
    title: 'Score of Parentheses',
    difficulty: 'medium',
    description: 'Given a balanced parentheses string <code>s</code>, return its score. Rules: "()" = 1, "AB" = A + B, "(A)" = 2 * A.',
    examples: [
      { input: 's = "()"', output: '1' },
      { input: 's = "(())"', output: '2' },
      { input: 's = "()()"', output: '2' },
      { input: 's = "(()(()))"', output: '6' },
    ],
    constraints: ['2 ≤ s.length ≤ 50', 's consists of \'(\' and \')\' only', 's is a balanced parentheses string'],
    starterCode: `def score_of_parentheses(s):
    pass`,
    functionName: 'score_of_parentheses',
    conceptId: 'stack',
    testCases: [
      { label: '()', args: ['()'], expected: 1 },
      { label: '(())', args: ['(())'], expected: 2 },
      { label: '()()', args: ['()()'], expected: 2 },
      { label: 'Nested', args: ['(()(()))'], expected: 6 },
    ],
  },

  // ─── BINARY SEARCH (additional) ──────────────────────────────────────────────
  {
    id: 'find-min-rotated-sorted-array-ii',
    title: 'Find Minimum in Rotated Sorted Array II',
    difficulty: 'hard',
    description: 'Given a rotated sorted array that may contain duplicates, find the minimum element. This is the harder follow-up to "Find Minimum in Rotated Sorted Array."',
    examples: [
      { input: 'nums = [1,3,5]', output: '1' },
      { input: 'nums = [2,2,2,0,1]', output: '0' },
    ],
    constraints: ['n == nums.length', '1 ≤ n ≤ 5000', '-5000 ≤ nums[i] ≤ 5000', 'nums is sorted and possibly rotated, may contain duplicates'],
    starterCode: `def find_min(nums):
    pass`,
    functionName: 'find_min',
    conceptId: 'binary-search',
    testCases: [
      { label: 'No rotation', args: [[1,3,5]], expected: 1 },
      { label: 'With duplicates', args: [[2,2,2,0,1]], expected: 0 },
      { label: 'All same', args: [[1,1,1]], expected: 1 },
      { label: 'Single', args: [[3]], expected: 3 },
    ],
  },
  {
    id: 'capacity-ship-packages',
    title: 'Capacity To Ship Packages Within D Days',
    difficulty: 'medium',
    description: 'Packages must be shipped in order within <code>days</code> days. Given weights of packages, find the minimum ship weight capacity to ship all packages on time.',
    examples: [
      { input: 'weights=[1,2,3,4,5,6,7,8,9,10], days=5', output: '15', explanation: 'With capacity 15, ship [1-5],[6-8],[9],[10],[nothing] in 5 days.' },
    ],
    constraints: ['1 ≤ days ≤ weights.length ≤ 500', '1 ≤ weights[i] ≤ 500'],
    starterCode: `def ship_within_days(weights, days):
    pass`,
    functionName: 'ship_within_days',
    conceptId: 'binary-search',
    testCases: [
      { label: '5 days', args: [[1,2,3,4,5,6,7,8,9,10],5], expected: 15 },
      { label: '3 days', args: [[3,2,2,4,1,4],3], expected: 6 },
      { label: '1 day', args: [[1,2,3,1,1],1], expected: 8 },
    ],
  },
  {
    id: 'find-k-closest-elements',
    title: 'Find K Closest Elements',
    difficulty: 'medium',
    description: 'Given a sorted integer array <code>arr</code> and integers <code>k</code> and <code>x</code>, return the <code>k</code> closest integers to <code>x</code> in sorted order. Ties are broken by preferring the smaller element.',
    examples: [
      { input: 'arr=[1,2,3,4,5], k=4, x=3', output: '[1,2,3,4]' },
      { input: 'arr=[1,2,3,4,5], k=4, x=-1', output: '[1,2,3,4]' },
    ],
    constraints: ['1 ≤ k ≤ arr.length', '1 ≤ arr.length ≤ 10⁴', 'arr is sorted'],
    starterCode: `def find_closest_elements(arr, k, x):
    pass`,
    functionName: 'find_closest_elements',
    conceptId: 'binary-search',
    testCases: [
      { label: 'Middle', args: [[1,2,3,4,5],4,3], expected: [1,2,3,4] },
      { label: 'Left of range', args: [[1,2,3,4,5],4,-1], expected: [1,2,3,4] },
      { label: 'Right of range', args: [[1,2,3,4,5],4,100], expected: [2,3,4,5] },
    ],
  },
  {
    id: 'split-array-largest-sum',
    title: 'Split Array Largest Sum',
    difficulty: 'hard',
    description: 'Given an array of integers and <code>k</code>, split the array into <code>k</code> non-empty contiguous subarrays to minimize the largest sum of any subarray. Return that minimized largest sum.',
    examples: [
      { input: 'nums=[7,2,5,10,8], k=2', output: '18', explanation: 'Split [7,2,5] | [10,8]. Largest sum = 18.' },
      { input: 'nums=[1,2,3,4,5], k=2', output: '9', explanation: 'Split [1,2,3,4] | [5].' },
    ],
    constraints: ['1 ≤ nums.length ≤ 1000', '0 ≤ nums[i] ≤ 10⁶', '1 ≤ k ≤ min(50, nums.length)'],
    starterCode: `def split_array(nums, k):
    pass`,
    functionName: 'split_array',
    conceptId: 'binary-search',
    testCases: [
      { label: 'k=2', args: [[7,2,5,10,8],2], expected: 18 },
      { label: 'Sequential k=2', args: [[1,2,3,4,5],2], expected: 9 },
      { label: 'k=1', args: [[1,2,3],1], expected: 6 },
    ],
  },
  {
    id: 'search-rotated-sorted-array-ii',
    title: 'Search in Rotated Sorted Array II',
    difficulty: 'medium',
    description: 'Given a rotated sorted array that may contain duplicates, return <code>true</code> if the target is in the array, <code>false</code> otherwise.',
    examples: [
      { input: 'nums=[2,5,6,0,0,1,2], target=0', output: 'true' },
      { input: 'nums=[2,5,6,0,0,1,2], target=3', output: 'false' },
    ],
    constraints: ['1 ≤ nums.length ≤ 5000', '-10⁴ ≤ nums[i], target ≤ 10⁴'],
    starterCode: `def search(nums, target):
    pass`,
    functionName: 'search',
    conceptId: 'binary-search',
    testCases: [
      { label: 'Found', args: [[2,5,6,0,0,1,2],0], expected: true },
      { label: 'Not found', args: [[2,5,6,0,0,1,2],3], expected: false },
      { label: 'Single', args: [[1],0], expected: false },
      { label: 'All same', args: [[1,1,1,1],1], expected: true },
    ],
  },
  {
    id: 'minimum-speed-arrive-on-time',
    title: 'Minimum Speed to Arrive on Time',
    difficulty: 'medium',
    description: 'You have <code>n</code> trains to take in sequence, with integer distances. You must arrive at exactly <code>hour</code> hours (decimal). Find the minimum speed (integer) to arrive on time, or -1 if impossible.',
    examples: [
      { input: 'dist=[1,3,2], hour=6', output: '1', explanation: 'At speed 1: 1+3+2=6 hours.' },
      { input: 'dist=[1,3,2], hour=2.7', output: '3' },
      { input: 'dist=[1,3,2], hour=1.9', output: '-1' },
    ],
    constraints: ['n == dist.length', '1 ≤ n ≤ 10⁵', '1 ≤ dist[i] ≤ 10⁵', '1 ≤ hour ≤ 10⁷'],
    starterCode: `def min_speed_on_time(dist, hour):
    pass`,
    functionName: 'min_speed_on_time',
    conceptId: 'binary-search',
    testCases: [
      { label: 'Speed 1', args: [[1,3,2],6], expected: 1 },
      { label: 'Speed 3', args: [[1,3,2],2.7], expected: 3 },
      { label: 'Impossible', args: [[1,3,2],1.9], expected: -1 },
    ],
  },

  // ─── LINKED LIST (additional) ────────────────────────────────────────────────
  {
    id: 'palindrome-linked-list',
    title: 'Palindrome Linked List',
    difficulty: 'easy',
    description: 'Given the head of a singly linked list, return <code>true</code> if it is a palindrome or <code>false</code> otherwise. Try to use O(1) extra space.',
    examples: [
      { input: 'head = [1,2,2,1]', output: 'true' },
      { input: 'head = [1,2]', output: 'false' },
    ],
    constraints: ['1 ≤ list length ≤ 10⁵', '0 ≤ Node.val ≤ 9'],
    starterCode: `def is_palindrome(head):
    vals = []
    cur = head
    while cur:
        vals.append(cur.val)
        cur = cur.next
    pass`,
    functionName: 'is_palindrome',
    conceptId: 'linked-list',
    testCases: [
      { label: 'Palindrome', args: [[1,2,2,1]], expected: true },
      { label: 'Not palindrome', args: [[1,2]], expected: false },
      { label: 'Single', args: [[1]], expected: true },
      { label: 'Odd palindrome', args: [[1,2,1]], expected: true },
    ],
  },
  {
    id: 'middle-of-linked-list',
    title: 'Middle of the Linked List',
    difficulty: 'easy',
    description: 'Given the head of a singly linked list, return the middle node. If there are two middle nodes, return the second one.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[3,4,5]', explanation: 'The middle node is 3.' },
      { input: 'head = [1,2,3,4,5,6]', output: '[4,5,6]', explanation: 'Two middles: 3 and 4. Return second middle.' },
    ],
    constraints: ['1 ≤ list length ≤ 100', '1 ≤ Node.val ≤ 100'],
    starterCode: `def middle_node(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,
    functionName: 'middle_node',
    conceptId: 'linked-list',
    testCases: [
      { label: 'Odd length', args: [[1,2,3,4,5]], expected: [3,4,5] },
      { label: 'Even length', args: [[1,2,3,4,5,6]], expected: [4,5,6] },
      { label: 'Single', args: [[1]], expected: [1] },
    ],
  },
  {
    id: 'sort-list',
    title: 'Sort List',
    difficulty: 'medium',
    description: 'Given the head of a linked list, return the list sorted in ascending order. Try to achieve O(n log n) time and O(1) space using merge sort.',
    examples: [
      { input: 'head = [4,2,1,3]', output: '[1,2,3,4]' },
      { input: 'head = [-1,5,3,4,0]', output: '[-1,0,3,4,5]' },
    ],
    constraints: ['0 ≤ list length ≤ 5 × 10⁴', '-10⁵ ≤ Node.val ≤ 10⁵'],
    starterCode: `def sort_list(head):
    pass`,
    functionName: 'sort_list',
    conceptId: 'linked-list',
    testCases: [
      { label: 'Four nodes', args: [[4,2,1,3]], expected: [1,2,3,4] },
      { label: 'With negatives', args: [[-1,5,3,4,0]], expected: [-1,0,3,4,5] },
      { label: 'Empty', args: [[]], expected: [] },
      { label: 'Already sorted', args: [[1,2,3]], expected: [1,2,3] },
    ],
  },
  {
    id: 'flatten-multilevel-doubly-linked-list',
    title: 'Flatten a Multilevel Doubly Linked List',
    difficulty: 'medium',
    description: 'A doubly linked list can have a <code>child</code> pointer that points to another doubly linked list. Flatten the list so that all nodes appear in a single-level doubly linked list.',
    examples: [
      { input: 'head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]', output: '[1,2,3,7,8,11,12,9,10,4,5,6]' },
    ],
    constraints: ['List nodes are between 1 and 1000', '1 ≤ Node.val ≤ 10⁵'],
    starterCode: `def flatten(head):
    pass`,
    functionName: 'flatten',
    conceptId: 'linked-list',
    testCases: [
      { label: 'Single level', args: [[1,2,3]], expected: [1,2,3] },
    ],
  },

  // ─── TREES (additional) ──────────────────────────────────────────────────────
  {
    id: 'path-sum',
    title: 'Path Sum',
    difficulty: 'easy',
    description: 'Given the root of a binary tree and an integer <code>targetSum</code>, return <code>true</code> if the tree has a root-to-leaf path such that the sum of all values along the path equals <code>targetSum</code>.',
    examples: [
      { input: 'root=[5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum=22', output: 'true', explanation: 'Path 5→4→11→2 has sum 22.' },
      { input: 'root=[1,2,3], targetSum=5', output: 'false' },
    ],
    constraints: ['0 ≤ number of nodes ≤ 5000', '-1000 ≤ Node.val ≤ 1000', '-1000 ≤ targetSum ≤ 1000'],
    starterCode: `def has_path_sum(root, target_sum):
    pass`,
    functionName: 'has_path_sum',
    conceptId: 'trees',
    testCases: [
      { label: 'Path exists', args: [[5,4,8,11,null,13,4,7,2,null,null,null,1],22], expected: true },
      { label: 'No path', args: [[1,2,3],5], expected: false },
      { label: 'Empty tree', args: [null,0], expected: false },
    ],
  },
  {
    id: 'symmetric-tree',
    title: 'Symmetric Tree',
    difficulty: 'easy',
    description: 'Given the root of a binary tree, check whether it is a mirror of itself (symmetric around its center).',
    examples: [
      { input: 'root = [1,2,2,3,4,4,3]', output: 'true' },
      { input: 'root = [1,2,2,null,3,null,3]', output: 'false' },
    ],
    constraints: ['1 ≤ number of nodes ≤ 1000', '-100 ≤ Node.val ≤ 100'],
    starterCode: `def is_symmetric(root):
    pass`,
    functionName: 'is_symmetric',
    conceptId: 'trees',
    testCases: [
      { label: 'Symmetric', args: [[1,2,2,3,4,4,3]], expected: true },
      { label: 'Not symmetric', args: [[1,2,2,null,3,null,3]], expected: false },
      { label: 'Single node', args: [[1]], expected: true },
    ],
  },
  {
    id: 'binary-tree-zigzag-level-order',
    title: 'Binary Tree Zigzag Level Order Traversal',
    difficulty: 'medium',
    description: 'Given the root of a binary tree, return the zigzag level-order traversal: left-to-right for odd levels, right-to-left for even levels.',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[20,9],[15,7]]' },
    ],
    constraints: ['0 ≤ number of nodes ≤ 2000', '-100 ≤ Node.val ≤ 100'],
    starterCode: `def zigzag_level_order(root):
    pass`,
    functionName: 'zigzag_level_order',
    conceptId: 'trees',
    testCases: [
      { label: 'Standard', args: [[3,9,20,null,null,15,7]], expected: [[3],[20,9],[15,7]] },
      { label: 'Single', args: [[1]], expected: [[1]] },
      { label: 'Empty', args: [null], expected: [] },
    ],
  },
  {
    id: 'convert-sorted-array-to-bst',
    title: 'Convert Sorted Array to Binary Search Tree',
    difficulty: 'easy',
    description: 'Given an integer array <code>nums</code> sorted in ascending order, convert it to a height-balanced binary search tree.',
    examples: [
      { input: 'nums = [-10,-3,0,5,9]', output: '[0,-3,9,-10,null,5]', explanation: 'Multiple valid answers exist.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁴ ≤ nums[i] ≤ 10⁴', 'nums is sorted in strictly increasing order'],
    starterCode: `def sorted_array_to_bst(nums):
    pass`,
    functionName: 'sorted_array_to_bst',
    conceptId: 'trees',
    testCases: [
      { label: 'Five elements root', args: [[-10,-3,0,5,9]], expected: 0 },
      { label: 'Single', args: [[1]], expected: 1 },
    ],
  },
  {
    id: 'delete-node-in-bst',
    title: 'Delete Node in a BST',
    difficulty: 'medium',
    description: 'Given a root of a BST and a key, delete the node with that key and return the root of the updated tree. It is guaranteed that the key exists in the tree.',
    examples: [
      { input: 'root=[5,3,6,2,4,null,7], key=3', output: '[5,4,6,2,null,null,7]', explanation: 'Replace 3 with its inorder successor 4.' },
    ],
    constraints: ['0 ≤ BST nodes ≤ 10⁴', '-10⁵ ≤ Node.val ≤ 10⁵', 'Each node is unique; key is guaranteed to exist'],
    starterCode: `def delete_node(root, key):
    pass`,
    functionName: 'delete_node',
    conceptId: 'trees',
    testCases: [
      { label: 'Delete leaf', args: [[5,3,6,2,4,null,7],2], expected: [5,3,6,null,4,null,7] },
    ],
  },
  {
    id: 'lowest-common-ancestor-binary-tree',
    title: 'Lowest Common Ancestor of a Binary Tree',
    difficulty: 'medium',
    description: 'Given a binary tree and two nodes <code>p</code> and <code>q</code>, find their lowest common ancestor (the deepest node that has both p and q as descendants, where a node is its own descendant).',
    examples: [
      { input: 'root=[3,5,1,6,2,0,8,null,null,7,4], p=5, q=1', output: '3' },
      { input: 'root=[3,5,1,6,2,0,8,null,null,7,4], p=5, q=4', output: '5' },
    ],
    constraints: ['2 ≤ number of nodes ≤ 10⁵', '-10⁹ ≤ Node.val ≤ 10⁹', 'All node values are unique; p and q exist in the tree'],
    starterCode: `def lowest_common_ancestor(root, p, q):
    pass`,
    functionName: 'lowest_common_ancestor',
    conceptId: 'trees',
    testCases: [
      { label: 'LCA is root', args: [[3,5,1,6,2,0,8,null,null,7,4],5,1], expected: 3 },
      { label: 'LCA is ancestor', args: [[3,5,1,6,2,0,8,null,null,7,4],5,4], expected: 5 },
    ],
  },
  {
    id: 'count-complete-tree-nodes',
    title: 'Count Complete Tree Nodes',
    difficulty: 'easy',
    description: 'Given the root of a complete binary tree, count the number of nodes. A complete binary tree has all levels fully filled except possibly the last, which is filled from left to right. Achieve O(log²n) time.',
    examples: [
      { input: 'root = [1,2,3,4,5,6]', output: '6' },
      { input: 'root = []', output: '0' },
    ],
    constraints: ['0 ≤ number of nodes ≤ 5 × 10⁴', '0 ≤ Node.val ≤ 5 × 10⁴'],
    starterCode: `def count_nodes(root):
    pass`,
    functionName: 'count_nodes',
    conceptId: 'trees',
    testCases: [
      { label: 'Six nodes', args: [[1,2,3,4,5,6]], expected: 6 },
      { label: 'Empty', args: [null], expected: 0 },
      { label: 'One node', args: [[1]], expected: 1 },
    ],
  },
  {
    id: 'vertical-order-traversal',
    title: 'Vertical Order Traversal of a Binary Tree',
    difficulty: 'hard',
    description: 'Given the root of a binary tree, return the vertical order traversal: columns from left to right. Within the same column, nodes at the same row are sorted by value.',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[9],[3,15],[20],[7]]' },
    ],
    constraints: ['1 ≤ number of nodes ≤ 1000', '0 ≤ Node.val ≤ 1000'],
    starterCode: `def vertical_traversal(root):
    pass`,
    functionName: 'vertical_traversal',
    conceptId: 'trees',
    testCases: [
      { label: 'Standard tree', args: [[3,9,20,null,null,15,7]], expected: [[9],[3,15],[20],[7]] },
      { label: 'Single', args: [[1]], expected: [[1]] },
    ],
  },
  {
    id: 'all-nodes-distance-k',
    title: 'All Nodes Distance K in Binary Tree',
    difficulty: 'medium',
    description: 'Given the root of a binary tree, a target node, and integer <code>k</code>, return all nodes at distance <code>k</code> from the target node. Answer can be in any order.',
    examples: [
      { input: 'root=[3,5,1,6,2,0,8,null,null,7,4], target=5, k=2', output: '[7,4,1]', explanation: 'Nodes 7, 4 (both in subtree) and 1 (distance 2 upward).' },
    ],
    constraints: ['1 ≤ tree nodes ≤ 500', '0 ≤ Node.val ≤ 500', '0 ≤ k ≤ 1000'],
    starterCode: `def distance_k(root, target, k):
    pass`,
    functionName: 'distance_k',
    conceptId: 'trees',
    testCases: [
      { label: 'Three nodes', args: [[3,5,1,6,2,0,8,null,null,7,4],5,2], expected: [1,4,7] },
      { label: 'k=0 returns target', args: [[1],1,0], expected: [1] },
    ],
  },
  {
    id: 'flatten-binary-tree-to-linked-list',
    title: 'Flatten Binary Tree to Linked List',
    difficulty: 'medium',
    description: 'Given the root of a binary tree, flatten it to a linked list in-place using the preorder traversal order. The left child of each node should be null, and the right child points to the next node.',
    examples: [
      { input: 'root = [1,2,5,3,4,null,6]', output: '[1,null,2,null,3,null,4,null,5,null,6]' },
    ],
    constraints: ['0 ≤ tree nodes ≤ 2000', '-100 ≤ Node.val ≤ 100'],
    starterCode: `def flatten(root):
    pass`,
    functionName: 'flatten',
    conceptId: 'trees',
    testCases: [
      { label: 'Standard', args: [[1,2,5,3,4,null,6]], expected: [1,2,3,4,5,6] },
      { label: 'Already flat', args: [[1,null,2,null,3]], expected: [1,2,3] },
    ],
  },


  // ─── HEAP / PRIORITY QUEUE (additional) ──────────────────────────────────────
  {
    id: 'reorganize-string',
    title: 'Reorganize String',
    difficulty: 'medium',
    description: 'Given a string <code>s</code>, rearrange its characters so that no two adjacent characters are the same. Return any valid rearrangement, or an empty string if it is not possible.',
    examples: [
      { input: 's = "aab"', output: '"aba"', explanation: 'Rearrange so no two a\'s are adjacent.' },
      { input: 's = "aaab"', output: '""', explanation: 'Impossible — too many a\'s.' },
    ],
    constraints: ['1 ≤ s.length ≤ 500', 's consists of lowercase English letters'],
    starterCode: `def reorganize_string(s):
    pass`,
    functionName: 'reorganize_string',
    conceptId: 'heap',
    testCases: [
      { label: '"aab" → "aba"', args: ['aab'], expected: 'aba' },
      { label: 'Impossible', args: ['aaab'], expected: '' },
      { label: 'Single', args: ['a'], expected: 'a' },
    ],
  },
  {
    id: 'k-pairs-smallest-sums',
    title: 'Find K Pairs with Smallest Sums',
    difficulty: 'medium',
    description: 'Given two integer arrays sorted in ascending order, find the <code>k</code> pairs <code>(u, v)</code> (one from each array) with the smallest sums.',
    examples: [
      { input: 'nums1=[1,7,11], nums2=[2,4,6], k=3', output: '[[1,2],[1,4],[1,6]]' },
      { input: 'nums1=[1,1,2], nums2=[1,2,3], k=2', output: '[[1,1],[1,1]]' },
    ],
    constraints: ['1 ≤ nums1.length, nums2.length ≤ 10⁵', '-10⁹ ≤ nums1[i], nums2[j] ≤ 10⁹', '1 ≤ k ≤ 10⁴'],
    starterCode: `def k_smallest_pairs(nums1, nums2, k):
    pass`,
    functionName: 'k_smallest_pairs',
    conceptId: 'heap',
    testCases: [
      { label: 'Three pairs', args: [[1,7,11],[2,4,6],3], expected: [[1,2],[1,4],[1,6]] },
      { label: 'Duplicate values', args: [[1,1,2],[1,2,3],2], expected: [[1,1],[1,1]] },
    ],
  },
  {
    id: 'minimum-cost-connect-sticks',
    title: 'Minimum Cost to Connect Sticks',
    difficulty: 'medium',
    description: 'You have sticks with given lengths. Combine two sticks into one: the cost equals their combined length. Return the minimum cost to combine all sticks into one.',
    examples: [
      { input: 'sticks = [2,4,3]', output: '14', explanation: 'Combine 2+3=5 (cost 5), then 4+5=9 (cost 9). Total=14.' },
      { input: 'sticks = [1,8,3,5]', output: '30' },
    ],
    constraints: ['1 ≤ sticks.length ≤ 10⁴', '1 ≤ sticks[i] ≤ 10⁴'],
    starterCode: `def connect_sticks(sticks):
    pass`,
    functionName: 'connect_sticks',
    conceptId: 'heap',
    testCases: [
      { label: 'Three sticks', args: [[2,4,3]], expected: 14 },
      { label: 'Four sticks', args: [[1,8,3,5]], expected: 30 },
      { label: 'Single', args: [[5]], expected: 0 },
      { label: 'Two sticks', args: [[1,2]], expected: 3 },
    ],
  },
  {
    id: 'ipo',
    title: 'IPO',
    difficulty: 'hard',
    description: 'Before an IPO, you can finish at most <code>k</code> projects to maximize capital. Each project has a profit and requires minimum capital. Start with <code>w</code> capital and pick projects greedily by maximum profit you can afford.',
    examples: [
      { input: 'k=2, w=0, profits=[1,2,3], capital=[0,1,1]', output: '4', explanation: 'Finish project 0 (profit 1, capital → 1), then project 2 (profit 3, capital → 4).' },
    ],
    constraints: ['1 ≤ k ≤ 10⁵', '0 ≤ w ≤ 10⁹', 'n == profits.length == capital.length', '1 ≤ n ≤ 10⁵'],
    starterCode: `def find_maximized_capital(k, w, profits, capital):
    pass`,
    functionName: 'find_maximized_capital',
    conceptId: 'heap',
    testCases: [
      { label: 'k=2', args: [2,0,[1,2,3],[0,1,1]], expected: 4 },
      { label: 'k=3', args: [3,0,[1,2,3],[0,1,2]], expected: 6 },
      { label: 'k=0', args: [0,5,[1,2],[0,0]], expected: 5 },
    ],
  },
  {
    id: 'maximum-frequency-stack',
    title: 'Maximum Frequency Stack',
    difficulty: 'hard',
    description: 'Design a stack-like data structure that supports <code>push</code> and <code>pop</code>. <code>pop</code> returns the most frequently occurring element. If tie, returns the most recently pushed among the tied elements.',
    examples: [
      { input: 'push(5),push(7),push(5),push(7),push(4),push(5),pop(),pop(),pop(),pop()', output: '[5,7,5,4]' },
    ],
    constraints: ['0 ≤ val ≤ 10⁹', 'At most 2 × 10⁴ calls to push and pop', 'pop is never called on empty stack'],
    starterCode: `class FreqStack:
    def __init__(self):
        pass

    def push(self, val):
        pass

    def pop(self):
        pass`,
    functionName: 'FreqStack',
    conceptId: 'heap',
    testCases: [
      { label: 'Standard', args: [[[5,7,5,7,4,5]]], expected: [5,7,5,4] },
    ],
  },

  // ─── BACKTRACKING (additional) ────────────────────────────────────────────────
  {
    id: 'combination-sum-iii',
    title: 'Combination Sum III',
    difficulty: 'medium',
    description: 'Find all valid combinations of <code>k</code> numbers that sum up to <code>n</code> using only numbers 1-9, where each number is used at most once. Return all combinations in sorted order.',
    examples: [
      { input: 'k=3, n=7', output: '[[1,2,4]]', explanation: '1+2+4=7 is the only valid combination.' },
      { input: 'k=3, n=9', output: '[[1,2,6],[1,3,5],[2,3,4]]' },
    ],
    constraints: ['2 ≤ k ≤ 9', '1 ≤ n ≤ 60'],
    starterCode: `def combination_sum3(k, n):
    pass`,
    functionName: 'combination_sum3',
    conceptId: 'backtracking',
    testCases: [
      { label: 'k=3, n=7', args: [3,7], expected: [[1,2,4]] },
      { label: 'k=3, n=9', args: [3,9], expected: [[1,2,6],[1,3,5],[2,3,4]] },
      { label: 'Impossible', args: [3,1], expected: [] },
    ],
  },
  {
    id: 'combinations',
    title: 'Combinations',
    difficulty: 'medium',
    description: 'Given two integers <code>n</code> and <code>k</code>, return all possible combinations of <code>k</code> numbers chosen from the range [1, n]. Return the answer in any order.',
    examples: [
      { input: 'n=4, k=2', output: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]' },
      { input: 'n=1, k=1', output: '[[1]]' },
    ],
    constraints: ['1 ≤ n ≤ 20', '1 ≤ k ≤ n'],
    starterCode: `def combine(n, k):
    pass`,
    functionName: 'combine',
    conceptId: 'backtracking',
    testCases: [
      { label: 'n=4,k=2', args: [4,2], expected: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]] },
      { label: 'n=1,k=1', args: [1,1], expected: [[1]] },
    ],
  },
  {
    id: 'restore-ip-addresses',
    title: 'Restore IP Addresses',
    difficulty: 'medium',
    description: 'Given a string <code>s</code> of digits only, return all possible valid IP addresses. A valid IP has four 0-255 octets (no leading zeros). Return in any order.',
    examples: [
      { input: 's = "25525511135"', output: '["255.255.11.135","255.255.111.35"]' },
      { input: 's = "0000"', output: '["0.0.0.0"]' },
    ],
    constraints: ['1 ≤ s.length ≤ 20', 's consists of digits only'],
    starterCode: `def restore_ip_addresses(s):
    pass`,
    functionName: 'restore_ip_addresses',
    conceptId: 'backtracking',
    testCases: [
      { label: 'Two valid IPs', args: ['25525511135'], expected: ['255.255.11.135','255.255.111.35'] },
      { label: 'All zeros', args: ['0000'], expected: ['0.0.0.0'] },
      { label: 'Too short', args: ['1'], expected: [] },
    ],
  },
  {
    id: 'word-break-ii',
    title: 'Word Break II',
    difficulty: 'hard',
    description: 'Given a string <code>s</code> and a dictionary <code>wordDict</code>, add spaces in <code>s</code> to construct all possible sentences where each word is in the dictionary. Return all such sentences.',
    examples: [
      { input: 's="catsanddog", wordDict=["cat","cats","and","sand","dog"]', output: '["cat sand dog","cats and dog"]' },
    ],
    constraints: ['1 ≤ s.length ≤ 20', '1 ≤ wordDict.length ≤ 1000', '1 ≤ wordDict[i].length ≤ 10', 's and wordDict[i] consist of lowercase letters'],
    starterCode: `def word_break(s, word_dict):
    pass`,
    functionName: 'word_break',
    conceptId: 'backtracking',
    testCases: [
      { label: 'Two sentences', args: ['catsanddog',['cat','cats','and','sand','dog']], expected: ['cat sand dog','cats and dog'] },
      { label: 'No solution', args: ['a',['b']], expected: [] },
    ],
  },
  {
    id: 'n-queens-ii',
    title: 'N-Queens II',
    difficulty: 'hard',
    description: 'Return the number of distinct solutions to the n-queens puzzle where <code>n</code> queens must be placed on an n×n chessboard such that no two queens attack each other.',
    examples: [
      { input: 'n = 4', output: '2', explanation: 'Two distinct solutions exist for 4 queens.' },
      { input: 'n = 1', output: '1' },
    ],
    constraints: ['1 ≤ n ≤ 9'],
    starterCode: `def total_n_queens(n):
    pass`,
    functionName: 'total_n_queens',
    conceptId: 'backtracking',
    testCases: [
      { label: 'n=4', args: [4], expected: 2 },
      { label: 'n=1', args: [1], expected: 1 },
      { label: 'n=8', args: [8], expected: 92 },
      { label: 'n=3', args: [3], expected: 0 },
    ],
  },
  {
    id: 'sudoku-solver',
    title: 'Sudoku Solver',
    difficulty: 'hard',
    description: 'Write a program to solve a Sudoku puzzle by filling in the empty cells (\'.\' denotes empty). There is always exactly one solution. The puzzle is a 9×9 board.',
    examples: [
      { input: 'board=[["5","3",".",".","7",".",".",".","."],...]', output: '[["5","3","4","6","7","8","9","1","2"],...]' },
    ],
    constraints: ['board.length == board[0].length == 9', 'Empty cells are denoted by \'.\'', 'The solution is unique'],
    starterCode: `def solve_sudoku(board):
    pass`,
    functionName: 'solve_sudoku',
    conceptId: 'backtracking',
    testCases: [
      { label: 'Classic puzzle', args: [[['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]], expected: [['5','3','4','6','7','8','9','1','2'],['6','7','2','1','9','5','3','4','8'],['1','9','8','3','4','2','5','6','7'],['8','5','9','7','6','1','4','2','3'],['4','2','6','8','5','3','7','9','1'],['7','1','3','9','2','4','8','5','6'],['9','6','1','5','3','7','2','8','4'],['2','8','7','4','1','9','6','3','5'],['3','4','5','2','8','6','1','7','9']] },
    ],
  },

  // ─── GRAPHS (additional) ──────────────────────────────────────────────────────
  {
    id: '01-matrix',
    title: '01 Matrix',
    difficulty: 'medium',
    description: 'Given an <code>m × n</code> binary matrix <code>mat</code>, return a matrix of the same size where each cell contains the distance to the nearest 0. Use BFS.',
    examples: [
      { input: 'mat = [[0,0,0],[0,1,0],[0,0,0]]', output: '[[0,0,0],[0,1,0],[0,0,0]]' },
      { input: 'mat = [[0,0,0],[0,1,0],[1,1,1]]', output: '[[0,0,0],[0,1,0],[1,2,1]]' },
    ],
    constraints: ['m == mat.length', 'n == mat[0].length', '1 ≤ m, n ≤ 10⁴', 'mat[i][j] is 0 or 1', 'At least one 0'],
    starterCode: `def update_matrix(mat):
    pass`,
    functionName: 'update_matrix',
    conceptId: 'graphs',
    testCases: [
      { label: 'Center 1', args: [[[0,0,0],[0,1,0],[0,0,0]]], expected: [[0,0,0],[0,1,0],[0,0,0]] },
      { label: 'Corner 1s', args: [[[0,0,0],[0,1,0],[1,1,1]]], expected: [[0,0,0],[0,1,0],[1,2,1]] },
    ],
  },
  {
    id: 'shortest-path-binary-matrix',
    title: 'Shortest Path in Binary Matrix',
    difficulty: 'medium',
    description: 'Given an n×n binary matrix <code>grid</code>, return the length of the shortest clear path (cells with value 0) from top-left to bottom-right (8-directional). Return -1 if no path.',
    examples: [
      { input: 'grid = [[0,1],[1,0]]', output: '2' },
      { input: 'grid = [[0,0,0],[1,1,0],[1,1,0]]', output: '4' },
    ],
    constraints: ['n == grid.length == grid[0].length', '1 ≤ n ≤ 100', 'grid[i][j] is 0 or 1'],
    starterCode: `def shortest_path_binary_matrix(grid):
    pass`,
    functionName: 'shortest_path_binary_matrix',
    conceptId: 'graphs',
    testCases: [
      { label: 'Length 2', args: [[[0,1],[1,0]]], expected: 2 },
      { label: 'Length 4', args: [[[0,0,0],[1,1,0],[1,1,0]]], expected: 4 },
      { label: 'Blocked start', args: [[[1,0],[0,0]]], expected: -1 },
    ],
  },
  {
    id: 'all-paths-source-to-target',
    title: 'All Paths From Source to Target',
    difficulty: 'medium',
    description: 'Given a DAG of <code>n</code> nodes (0 to n-1), find all paths from node 0 to node n-1. Return them in any order.',
    examples: [
      { input: 'graph = [[1,2],[3],[3],[]]', output: '[[0,1,3],[0,2,3]]' },
      { input: 'graph = [[4,3,1],[3,2,4],[3],[4],[]]', output: '[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]' },
    ],
    constraints: ['n == graph.length', '2 ≤ n ≤ 15', 'No self-loops, no repeated edges'],
    starterCode: `def all_paths_source_target(graph):
    pass`,
    functionName: 'all_paths_source_target',
    conceptId: 'graphs',
    testCases: [
      { label: 'Two paths', args: [[[1,2],[3],[3],[]]], expected: [[0,1,3],[0,2,3]] },
    ],
  },
  {
    id: 'number-of-provinces',
    title: 'Number of Provinces',
    difficulty: 'medium',
    description: 'Given an adjacency matrix <code>isConnected</code> of cities, return the number of provinces (connected components).',
    examples: [
      { input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]', output: '2' },
      { input: 'isConnected = [[1,0,0],[0,1,0],[0,0,1]]', output: '3' },
    ],
    constraints: ['1 ≤ n ≤ 200', 'n == isConnected.length == isConnected[i].length', 'isConnected[i][j] is 1 or 0'],
    starterCode: `def find_circle_num(is_connected):
    pass`,
    functionName: 'find_circle_num',
    conceptId: 'graphs',
    testCases: [
      { label: 'Two provinces', args: [[[1,1,0],[1,1,0],[0,0,1]]], expected: 2 },
      { label: 'Three provinces', args: [[[1,0,0],[0,1,0],[0,0,1]]], expected: 3 },
      { label: 'One province', args: [[[1,1,1],[1,1,1],[1,1,1]]], expected: 1 },
    ],
  },
  {
    id: 'is-graph-bipartite',
    title: 'Is Graph Bipartite?',
    difficulty: 'medium',
    description: 'Given a graph represented as an adjacency list, return <code>true</code> if it is bipartite (its nodes can be colored with two colors such that no two adjacent nodes share the same color).',
    examples: [
      { input: 'graph = [[1,2,3],[0,2],[0,1,3],[0,2]]', output: 'false' },
      { input: 'graph = [[1,3],[0,2],[1,3],[0,2]]', output: 'true' },
    ],
    constraints: ['1 ≤ graph.length ≤ 100', '0 ≤ graph[u].length < graph.length', 'No self-loops or repeated edges'],
    starterCode: `def is_bipartite(graph):
    pass`,
    functionName: 'is_bipartite',
    conceptId: 'graphs',
    testCases: [
      { label: 'Not bipartite', args: [[[1,2,3],[0,2],[0,1,3],[0,2]]], expected: false },
      { label: 'Is bipartite', args: [[[1,3],[0,2],[1,3],[0,2]]], expected: true },
    ],
  },
  {
    id: 'evaluate-division',
    title: 'Evaluate Division',
    difficulty: 'medium',
    description: 'Given equations like A/B = k and queries, return the answer to each query. Return -1 if the answer does not exist.',
    examples: [
      { input: 'equations=[["a","b"],["b","c"]], values=[2.0,3.0], queries=[["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]', output: '[6.0,0.5,-1.0,1.0,-1.0]' },
    ],
    constraints: ['1 ≤ equations.length ≤ 20', 'values[i] > 0', '1 ≤ queries.length ≤ 20'],
    starterCode: `def calc_equation(equations, values, queries):
    pass`,
    functionName: 'calc_equation',
    conceptId: 'graphs',
    testCases: [
      { label: 'Standard', args: [[['a','b'],['b','c']],[2.0,3.0],[['a','c'],['b','a'],['a','e'],['a','a'],['x','x']]], expected: [6.0,0.5,-1.0,1.0,-1.0] },
    ],
  },
  {
    id: 'accounts-merge',
    title: 'Accounts Merge',
    difficulty: 'medium',
    description: 'Given a list of accounts (first element is the name, rest are emails), merge accounts that share an email. Return accounts sorted: name first, then emails in sorted order.',
    examples: [
      { input: 'accounts=[["John","j1","j2"],["John","j1","j3"],["Mary","m1"]]', output: '[["John","j1","j2","j3"],["Mary","m1"]]' },
    ],
    constraints: ['1 ≤ accounts.length ≤ 1000', '2 ≤ accounts[i].length ≤ 10', 'All emails are lowercase'],
    starterCode: `def accounts_merge(accounts):
    pass`,
    functionName: 'accounts_merge',
    conceptId: 'graphs',
    testCases: [
      { label: 'Merge John', args: [[['John','j1','j2'],['John','j1','j3'],['Mary','m1']]], expected: [['John','j1','j2','j3'],['Mary','m1']] },
    ],
  },
  {
    id: 'find-eventual-safe-states',
    title: 'Find Eventual Safe States',
    difficulty: 'medium',
    description: 'A node is safe if every path from it eventually leads to a terminal node (no outgoing edges). Return all safe nodes sorted in ascending order.',
    examples: [
      { input: 'graph = [[1,2],[2,3],[5],[0],[5],[],[]]', output: '[2,4,5,6]' },
    ],
    constraints: ['n == graph.length', '1 ≤ n ≤ 10⁴', '0 ≤ graph[i].length ≤ n'],
    starterCode: `def eventual_safe_nodes(graph):
    pass`,
    functionName: 'eventual_safe_nodes',
    conceptId: 'graphs',
    testCases: [
      { label: 'Standard', args: [[[1,2],[2,3],[5],[0],[5],[],[]]], expected: [2,4,5,6] },
      { label: 'No cycles', args: [[[1],[2],[]]], expected: [0,1,2] },
    ],
  },
  {
    id: 'snakes-and-ladders',
    title: 'Snakes and Ladders',
    difficulty: 'medium',
    description: 'Given an n×n board with snakes and ladders, find the minimum number of dice rolls to reach the last cell starting at cell 1. Board cells are labeled 1 to n² in a boustrophedon fashion. -1 means no snake/ladder.',
    examples: [
      { input: 'board=[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]', output: '4' },
    ],
    constraints: ['n == board.length == board[0].length', '2 ≤ n ≤ 20', 'board[i][j] is -1 or in range [1, n²]'],
    starterCode: `def snakes_and_ladders(board):
    pass`,
    functionName: 'snakes_and_ladders',
    conceptId: 'graphs',
    testCases: [
      { label: 'Classic board', args: [[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]], expected: 4 },
    ],
  },
  {
    id: 'minimum-height-trees',
    title: 'Minimum Height Trees',
    difficulty: 'medium',
    description: 'A tree of n nodes can be rooted at any node. Find all root labels that give trees of minimum height. Return all such roots.',
    examples: [
      { input: 'n=4, edges=[[1,0],[1,2],[1,3]]', output: '[1]', explanation: 'Rooting at 1 gives height 1.' },
      { input: 'n=6, edges=[[3,0],[3,1],[3,2],[3,4],[5,4]]', output: '[3,4]' },
    ],
    constraints: ['1 ≤ n ≤ 2 × 10⁴', 'edges.length == n − 1'],
    starterCode: `def find_min_height_trees(n, edges):
    pass`,
    functionName: 'find_min_height_trees',
    conceptId: 'graphs',
    testCases: [
      { label: 'One root', args: [4,[[1,0],[1,2],[1,3]]], expected: [1] },
      { label: 'Two roots', args: [6,[[3,0],[3,1],[3,2],[3,4],[5,4]]], expected: [3,4] },
      { label: 'Single node', args: [1,[]], expected: [0] },
    ],
  },
  {
    id: 'detonate-maximum-bombs',
    title: 'Detonate the Maximum Bombs',
    difficulty: 'medium',
    description: 'You have bombs at positions <code>[x, y, r]</code>. Detonating a bomb also detonates any bomb whose center is within its radius. Return the maximum number of bombs that can be detonated by detonating exactly one bomb.',
    examples: [
      { input: 'bombs = [[2,1,3],[6,1,4]]', output: '2', explanation: 'Detonating bomb 1 reaches bomb 0. Detonating bomb 0 doesn\'t reach bomb 1.' },
    ],
    constraints: ['1 ≤ bombs.length ≤ 100', 'bombs[i].length == 3', '1 ≤ x, y, r ≤ 10⁵'],
    starterCode: `def maximum_detonation(bombs):
    pass`,
    functionName: 'maximum_detonation',
    conceptId: 'graphs',
    testCases: [
      { label: 'Two bombs', args: [[[2,1,3],[6,1,4]]], expected: 2 },
      { label: 'No chain', args: [[[1,1,1],[2,2,1]]], expected: 1 },
      { label: 'Single', args: [[[5,5,5]]], expected: 1 },
    ],
  },

  // ─── ADVANCED GRAPHS ──────────────────────────────────────────────────────────
  {
    id: 'network-delay-time',
    title: 'Network Delay Time',
    difficulty: 'medium',
    description: 'Given a network of n nodes and travel times of directed edges, find the minimum time for a signal sent from node <code>k</code> to reach all nodes. Return -1 if not all nodes are reachable. (Dijkstra\'s algorithm)',
    examples: [
      { input: 'times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2', output: '2', explanation: 'Signal from node 2 reaches all nodes in at most 2 time units.' },
    ],
    constraints: ['1 ≤ k ≤ n ≤ 100', '1 ≤ times.length ≤ 6000', 'All travel times are positive'],
    starterCode: `def network_delay_time(times, n, k):
    pass`,
    functionName: 'network_delay_time',
    conceptId: 'advanced-graphs',
    testCases: [
      { label: 'Standard', args: [[[2,1,1],[2,3,1],[3,4,1]],4,2], expected: 2 },
      { label: 'Unreachable', args: [[[1,2,1]],2,2], expected: -1 },
      { label: 'Single node', args: [[],1,1], expected: 0 },
    ],
  },
  {
    id: 'min-cost-connect-all-points',
    title: 'Min Cost to Connect All Points',
    difficulty: 'medium',
    description: 'Given an array of points on a 2D plane, return the minimum cost to connect all points. The cost of connecting two points is their Manhattan distance. (Prim\'s or Kruskal\'s MST)',
    examples: [
      { input: 'points=[[0,0],[2,2],[3,10],[5,2],[7,0]]', output: '20' },
      { input: 'points=[[3,12],[-2,5],[-4,1]]', output: '18' },
    ],
    constraints: ['1 ≤ points.length ≤ 1000', '-10⁶ ≤ x, y ≤ 10⁶', 'No two points are the same'],
    starterCode: `def min_cost_connect_points(points):
    pass`,
    functionName: 'min_cost_connect_points',
    conceptId: 'advanced-graphs',
    testCases: [
      { label: 'Five points', args: [[[0,0],[2,2],[3,10],[5,2],[7,0]]], expected: 20 },
      { label: 'Three points', args: [[[3,12],[-2,5],[-4,1]]], expected: 18 },
      { label: 'Single point', args: [[[0,0]]], expected: 0 },
    ],
  },
  {
    id: 'swim-in-rising-water',
    title: 'Swim in Rising Water',
    difficulty: 'hard',
    description: 'Given an n×n grid where <code>grid[i][j]</code> is the elevation, at time <code>t</code> you can swim in cells with elevation ≤ t. Find the least time to swim from the top-left to bottom-right.',
    examples: [
      { input: 'grid=[[0,2],[1,3]]', output: '3', explanation: 'At t=3, all cells are reachable.' },
    ],
    constraints: ['n == grid.length == grid[0].length', '1 ≤ n ≤ 50', 'grid[i][j] is a permutation of [0, n²−1]'],
    starterCode: `def swim_in_water(grid):
    pass`,
    functionName: 'swim_in_water',
    conceptId: 'advanced-graphs',
    testCases: [
      { label: '2×2', args: [[[0,2],[1,3]]], expected: 3 },
      { label: '1×1', args: [[[0]]], expected: 0 },
    ],
  },
  {
    id: 'cheapest-flights-k-stops',
    title: 'Cheapest Flights Within K Stops',
    difficulty: 'medium',
    description: 'Given flights as <code>[from, to, price]</code> and integers <code>src</code>, <code>dst</code>, <code>k</code>, return the cheapest price to fly from src to dst with at most k stops. Return -1 if no route. (Bellman-Ford)',
    examples: [
      { input: 'n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src=0, dst=3, k=1', output: '700', explanation: '0→1→3 costs 700 with 1 stop.' },
    ],
    constraints: ['1 ≤ n ≤ 100', '0 ≤ flights.length ≤ n*(n-1)/2', '1 ≤ price ≤ 10⁴'],
    starterCode: `def find_cheapest_price(n, flights, src, dst, k):
    pass`,
    functionName: 'find_cheapest_price',
    conceptId: 'advanced-graphs',
    testCases: [
      { label: 'k=1', args: [4,[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],0,3,1], expected: 700 },
      { label: 'k=2', args: [4,[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],0,3,2], expected: 400 },
    ],
  },
  {
    id: 'reconstruct-itinerary',
    title: 'Reconstruct Itinerary',
    difficulty: 'hard',
    description: 'Given a list of airline tickets as <code>[from, to]</code> pairs, reconstruct the itinerary starting from "JFK". All tickets must be used exactly once. Return the lexicographically smallest valid itinerary.',
    examples: [
      { input: 'tickets=[["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]', output: '["JFK","MUC","LHR","SFO","SJC"]' },
    ],
    constraints: ['1 ≤ tickets.length ≤ 300', 'tickets[i].length == 2', 'All airport codes are 3 uppercase letters', 'A valid itinerary is guaranteed to exist'],
    starterCode: `def find_itinerary(tickets):
    pass`,
    functionName: 'find_itinerary',
    conceptId: 'advanced-graphs',
    testCases: [
      { label: 'Linear path', args: [[['MUC','LHR'],['JFK','MUC'],['SFO','SJC'],['LHR','SFO']]], expected: ['JFK','MUC','LHR','SFO','SJC'] },
      { label: 'Simple', args: [[['JFK','ATL'],['ATL','JFK'],['JFK','SFO']]], expected: ['JFK','ATL','JFK','SFO'] },
    ],
  },
  {
    id: 'critical-connections-network',
    title: 'Critical Connections in a Network',
    difficulty: 'hard',
    description: 'Given a network of n servers and connections, a critical connection (bridge) is one whose removal disconnects the network. Find all critical connections. (Tarjan\'s bridge algorithm)',
    examples: [
      { input: 'n=4, connections=[[0,1],[1,2],[2,0],[1,3]]', output: '[[1,3]]', explanation: 'Removing [1,3] disconnects server 3.' },
    ],
    constraints: ['2 ≤ n ≤ 10⁵', 'n−1 ≤ connections.length ≤ 10⁵', 'No repeated connections'],
    starterCode: `def critical_connections(n, connections):
    pass`,
    functionName: 'critical_connections',
    conceptId: 'advanced-graphs',
    testCases: [
      { label: 'One bridge', args: [4,[[0,1],[1,2],[2,0],[1,3]]], expected: [[1,3]] },
      { label: 'All bridges', args: [3,[[0,1],[1,2]]], expected: [[0,1],[1,2]] },
    ],
  },
  {
    id: 'find-city-smallest-neighbors',
    title: 'Find the City With the Smallest Number of Neighbors at a Threshold Distance',
    difficulty: 'medium',
    description: 'Given n cities, edges with weights, and a threshold, find the city with the fewest reachable cities (within threshold). If tie, return the one with the greatest number.',
    examples: [
      { input: 'n=4, edges=[[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold=4', output: '3' },
    ],
    constraints: ['2 ≤ n ≤ 100', '1 ≤ edges.length ≤ n*(n-1)/2', '1 ≤ distanceThreshold ≤ 10⁴'],
    starterCode: `def find_the_city(n, edges, distance_threshold):
    pass`,
    functionName: 'find_the_city',
    conceptId: 'advanced-graphs',
    testCases: [
      { label: 'City 3', args: [4,[[0,1,3],[1,2,1],[1,3,4],[2,3,1]],4], expected: 3 },
      { label: 'City 0', args: [5,[[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]],2], expected: 0 },
    ],
  },
  {
    id: 'path-with-max-probability',
    title: 'Path with Maximum Probability',
    difficulty: 'medium',
    description: 'You are given an undirected weighted graph. Find the path from <code>start</code> to <code>end</code> with the maximum probability. Return 0 if no path exists.',
    examples: [
      { input: 'n=3, edges=[[0,1],[1,2],[0,2]], succProb=[0.5,0.5,0.2], start=0, end=2', output: '0.25', explanation: '0→1→2 has probability 0.5*0.5=0.25, better than 0→2=0.2.' },
    ],
    constraints: ['2 ≤ n ≤ 10⁴', '0 ≤ start, end < n', '0 < succProb[i] ≤ 1'],
    starterCode: `def max_probability(n, edges, succ_prob, start, end):
    pass`,
    functionName: 'max_probability',
    conceptId: 'advanced-graphs',
    testCases: [
      { label: 'Path via 1', args: [3,[[0,1],[1,2],[0,2]],[0.5,0.5,0.2],0,2], expected: 0.25 },
      { label: 'Direct path better', args: [3,[[0,1],[1,2],[0,2]],[0.5,0.5,0.3],0,2], expected: 0.3 },
    ],
  },

  // ─── 1D DYNAMIC PROGRAMMING (additional) ─────────────────────────────────────
  {
    id: 'delete-and-earn',
    title: 'Delete and Earn',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code>, on each step you can pick any value <code>x</code> and gain <code>x</code> points, but then must delete all occurrences of <code>x-1</code> and <code>x+1</code>. Return maximum points you can earn.',
    examples: [
      { input: 'nums = [3,4,2]', output: '6', explanation: 'Earn 3 (delete 2 and 4) → earn 2 = total 5. Or earn 4 (delete 3) → earn 2 = total 6.' },
      { input: 'nums = [2,2,3,3,3,4]', output: '9', explanation: 'Earn all 3s (9 points), deleting 2 and 4.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 2 × 10⁴', '1 ≤ nums[i] ≤ 10⁴'],
    starterCode: `def delete_and_earn(nums):
    pass`,
    functionName: 'delete_and_earn',
    conceptId: 'dp-1d',
    testCases: [
      { label: 'Simple', args: [[3,4,2]], expected: 6 },
      { label: 'Three 3s', args: [[2,2,3,3,3,4]], expected: 9 },
      { label: 'Single', args: [[1]], expected: 1 },
    ],
  },
  {
    id: 'minimum-cost-for-tickets',
    title: 'Minimum Cost For Tickets',
    difficulty: 'medium',
    description: 'You plan to travel on certain days. Passes cost: 1-day pass = <code>costs[0]</code>, 7-day = <code>costs[1]</code>, 30-day = <code>costs[2]</code>. Find the minimum cost to travel every day you want.',
    examples: [
      { input: 'days=[1,4,6,7,8,20], costs=[2,7,15]', output: '11', explanation: '1-day pass on day 1 (2), 7-day pass starting day 4 (7), 1-day pass on day 20 (2) = 11.' },
    ],
    constraints: ['1 ≤ days.length ≤ 365', '1 ≤ days[i] ≤ 365', 'days is sorted'],
    starterCode: `def min_cost_tickets(days, costs):
    pass`,
    functionName: 'min_cost_tickets',
    conceptId: 'dp-1d',
    testCases: [
      { label: 'Standard', args: [[1,4,6,7,8,20],[2,7,15]], expected: 11 },
      { label: 'Daily travel', args: [[1,2,3,4,5,6,7,8,9,10,30,31],[2,7,15]], expected: 17 },
    ],
  },
  {
    id: 'perfect-squares',
    title: 'Perfect Squares',
    difficulty: 'medium',
    description: 'Given an integer <code>n</code>, return the minimum number of perfect squares (1, 4, 9, 16, ...) that sum to <code>n</code>.',
    examples: [
      { input: 'n = 12', output: '3', explanation: '12 = 4 + 4 + 4.' },
      { input: 'n = 13', output: '2', explanation: '13 = 4 + 9.' },
    ],
    constraints: ['1 ≤ n ≤ 10⁴'],
    starterCode: `def num_squares(n):
    pass`,
    functionName: 'num_squares',
    conceptId: 'dp-1d',
    testCases: [
      { label: 'n=12', args: [12], expected: 3 },
      { label: 'n=13', args: [13], expected: 2 },
      { label: 'Perfect square', args: [4], expected: 1 },
      { label: 'n=1', args: [1], expected: 1 },
    ],
  },
  {
    id: 'nth-tribonacci-number',
    title: 'N-th Tribonacci Number',
    difficulty: 'easy',
    description: 'The Tribonacci sequence is T₀=0, T₁=1, T₂=1, and Tₙ₊₃ = Tₙ + Tₙ₊₁ + Tₙ₊₂ for n ≥ 0. Given n, return the n-th tribonacci number.',
    examples: [
      { input: 'n = 4', output: '4', explanation: 'T3=2, T4=4.' },
      { input: 'n = 25', output: '1389537' },
    ],
    constraints: ['0 ≤ n ≤ 37', 'The answer is guaranteed to fit in a 32-bit integer'],
    starterCode: `def tribonacci(n):
    pass`,
    functionName: 'tribonacci',
    conceptId: 'dp-1d',
    testCases: [
      { label: 'n=4', args: [4], expected: 4 },
      { label: 'n=0', args: [0], expected: 0 },
      { label: 'n=1', args: [1], expected: 1 },
      { label: 'n=25', args: [25], expected: 1389537 },
    ],
  },
  {
    id: 'jump-game-iii',
    title: 'Jump Game III',
    difficulty: 'medium',
    description: 'Given an array of non-negative integers <code>arr</code>, starting from <code>start</code>, you can jump to index <code>i + arr[i]</code> or <code>i - arr[i]</code>. Return <code>true</code> if you can reach any index with value 0.',
    examples: [
      { input: 'arr=[4,2,3,0,3,1,2], start=5', output: 'true', explanation: 'Jump to index 4, then 1, then 3 (value 0).' },
      { input: 'arr=[3,0,2,1,2], start=2', output: 'false' },
    ],
    constraints: ['1 ≤ arr.length ≤ 5 × 10⁴', '0 ≤ arr[i] < arr.length', '0 ≤ start < arr.length'],
    starterCode: `def can_reach(arr, start):
    pass`,
    functionName: 'can_reach',
    conceptId: 'dp-1d',
    testCases: [
      { label: 'Can reach', args: [[4,2,3,0,3,1,2],5], expected: true },
      { label: 'Cannot reach', args: [[3,0,2,1,2],2], expected: false },
      { label: 'Start is zero', args: [[0],0], expected: true },
    ],
  },
  {
    id: 'arithmetic-slices',
    title: 'Arithmetic Slices',
    difficulty: 'medium',
    description: 'A sequence of at least 3 elements is arithmetic if consecutive differences are equal. Given an array, return the number of arithmetic subarrays.',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '3', explanation: '[1,2,3],[2,3,4],[1,2,3,4] are arithmetic.' },
      { input: 'nums = [1]', output: '0' },
    ],
    constraints: ['1 ≤ nums.length ≤ 5000', '-1000 ≤ nums[i] ≤ 1000'],
    starterCode: `def number_of_arithmetic_slices(nums):
    pass`,
    functionName: 'number_of_arithmetic_slices',
    conceptId: 'dp-1d',
    testCases: [
      { label: '[1,2,3,4]', args: [[1,2,3,4]], expected: 3 },
      { label: 'Single', args: [[1]], expected: 0 },
      { label: 'Not arithmetic', args: [[1,2,4]], expected: 0 },
    ],
  },
  {
    id: 'number-longest-increasing-subsequence',
    title: 'Number of Longest Increasing Subsequence',
    difficulty: 'medium',
    description: 'Given an integer array, return the number of longest increasing subsequences.',
    examples: [
      { input: 'nums = [1,3,5,4,7]', output: '2', explanation: 'LIS length = 4. There are 2 of length 4: [1,3,5,7] and [1,3,4,7].' },
      { input: 'nums = [2,2,2,2,2]', output: '5', explanation: 'LIS length = 1. There are 5 of length 1.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 2000', '-10⁶ ≤ nums[i] ≤ 10⁶'],
    starterCode: `def find_number_of_lis(nums):
    pass`,
    functionName: 'find_number_of_lis',
    conceptId: 'dp-1d',
    testCases: [
      { label: 'Two LIS', args: [[1,3,5,4,7]], expected: 2 },
      { label: 'All same', args: [[2,2,2,2,2]], expected: 5 },
      { label: 'Single', args: [[1]], expected: 1 },
    ],
  },
  {
    id: 'integer-break',
    title: 'Integer Break',
    difficulty: 'medium',
    description: 'Given an integer <code>n</code>, break it into the sum of at least two positive integers and maximize the product of those integers. Return the maximum product.',
    examples: [
      { input: 'n = 2', output: '1', explanation: '2 = 1 + 1 → product = 1.' },
      { input: 'n = 10', output: '36', explanation: '10 = 3 + 3 + 4 → product = 36.' },
    ],
    constraints: ['2 ≤ n ≤ 58'],
    starterCode: `def integer_break(n):
    pass`,
    functionName: 'integer_break',
    conceptId: 'dp-1d',
    testCases: [
      { label: 'n=2', args: [2], expected: 1 },
      { label: 'n=10', args: [10], expected: 36 },
      { label: 'n=4', args: [4], expected: 4 },
      { label: 'n=3', args: [3], expected: 2 },
    ],
  },

  // ─── 2D DYNAMIC PROGRAMMING ───────────────────────────────────────────────────
  {
    id: 'unique-paths-ii',
    title: 'Unique Paths II',
    difficulty: 'medium',
    description: 'A robot starts at the top-left of an <code>m × n</code> grid and moves only right or down. Some cells have obstacles (1 = obstacle, 0 = empty). Return the number of unique paths to the bottom-right.',
    examples: [
      { input: 'obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]', output: '2', explanation: 'The obstacle blocks one of the three paths.' },
      { input: 'obstacleGrid = [[0,1],[0,0]]', output: '1' },
    ],
    constraints: ['m == obstacleGrid.length', 'n == obstacleGrid[0].length', '1 ≤ m, n ≤ 100', 'obstacleGrid[i][j] is 0 or 1'],
    starterCode: `def unique_paths_with_obstacles(obstacle_grid):
    pass`,
    functionName: 'unique_paths_with_obstacles',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'One obstacle', args: [[[0,0,0],[0,1,0],[0,0,0]]], expected: 2 },
      { label: 'Right obstacle', args: [[[0,1],[0,0]]], expected: 1 },
      { label: 'Blocked', args: [[[1,0]]], expected: 0 },
    ],
  },
  {
    id: 'longest-common-subsequence',
    title: 'Longest Common Subsequence',
    difficulty: 'medium',
    description: 'Given two strings <code>text1</code> and <code>text2</code>, return the length of their longest common subsequence. A subsequence need not be contiguous.',
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: 'LCS is "ace".' },
      { input: 'text1 = "abc", text2 = "abc"', output: '3' },
      { input: 'text1 = "abc", text2 = "def"', output: '0' },
    ],
    constraints: ['1 ≤ text1.length, text2.length ≤ 1000', 'Both consist of lowercase English letters'],
    starterCode: `def longest_common_subsequence(text1, text2):
    pass`,
    functionName: 'longest_common_subsequence',
    conceptId: 'dp-2d',
    testCases: [
      { label: '"ace"', args: ['abcde','ace'], expected: 3 },
      { label: 'Same string', args: ['abc','abc'], expected: 3 },
      { label: 'No common', args: ['abc','def'], expected: 0 },
    ],
  },
  {
    id: 'best-time-buy-sell-stock-cooldown',
    title: 'Best Time to Buy and Sell Stock with Cooldown',
    difficulty: 'medium',
    description: 'After selling, you must wait one day before buying again (cooldown). Given stock prices, find the maximum profit you can achieve.',
    examples: [
      { input: 'prices = [1,2,3,0,2]', output: '3', explanation: 'Buy day 1, sell day 2 (profit 1), cooldown day 3, buy day 4, sell day 5 (profit 2). Total = 3.' },
    ],
    constraints: ['1 ≤ prices.length ≤ 5000', '0 ≤ prices[i] ≤ 1000'],
    starterCode: `def max_profit(prices):
    pass`,
    functionName: 'max_profit',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'Standard', args: [[1,2,3,0,2]], expected: 3 },
      { label: 'Single', args: [[1]], expected: 0 },
      { label: 'Descending', args: [[3,2,1]], expected: 0 },
      { label: 'Two days', args: [[1,2]], expected: 1 },
    ],
  },
  {
    id: 'coin-change-ii',
    title: 'Coin Change II',
    difficulty: 'medium',
    description: 'Given an amount and a list of coin denominations, return the number of combinations that make up that amount.',
    examples: [
      { input: 'amount=5, coins=[1,2,5]', output: '4', explanation: '5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1.' },
      { input: 'amount=3, coins=[2]', output: '0', explanation: 'Cannot make 3 with coins of 2.' },
    ],
    constraints: ['1 ≤ coins.length ≤ 300', '1 ≤ coins[i] ≤ 5000', '0 ≤ amount ≤ 5000'],
    starterCode: `def change(amount, coins):
    pass`,
    functionName: 'change',
    conceptId: 'dp-2d',
    testCases: [
      { label: '4 ways', args: [5,[1,2,5]], expected: 4 },
      { label: 'No solution', args: [3,[2]], expected: 0 },
      { label: 'amount=0', args: [0,[1,2,3]], expected: 1 },
    ],
  },
  {
    id: 'target-sum',
    title: 'Target Sum',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code> and integer <code>target</code>, you can assign + or - to each number. Return the number of ways to assign signs to reach the target sum.',
    examples: [
      { input: 'nums=[1,1,1,1,1], target=3', output: '5', explanation: 'There are 5 ways to assign + and - to get sum 3.' },
      { input: 'nums=[1], target=1', output: '1' },
    ],
    constraints: ['1 ≤ nums.length ≤ 20', '0 ≤ nums[i] ≤ 1000', '0 ≤ sum(nums[i]) ≤ 1000', '-1000 ≤ target ≤ 1000'],
    starterCode: `def find_target_sum_ways(nums, target):
    pass`,
    functionName: 'find_target_sum_ways',
    conceptId: 'dp-2d',
    testCases: [
      { label: '5 ways', args: [[1,1,1,1,1],3], expected: 5 },
      { label: '1 way', args: [[1],1], expected: 1 },
      { label: 'No way', args: [[1],2], expected: 0 },
    ],
  },
  {
    id: 'interleaving-string',
    title: 'Interleaving String',
    difficulty: 'medium',
    description: 'Given strings <code>s1</code>, <code>s2</code>, and <code>s3</code>, return <code>true</code> if <code>s3</code> can be formed by interleaving <code>s1</code> and <code>s2</code> (preserving relative orders of s1 and s2).',
    examples: [
      { input: 's1="aabcc", s2="dbbca", s3="aadbbcbcac"', output: 'true' },
      { input: 's1="aabcc", s2="dbbca", s3="aadbbbaccc"', output: 'false' },
    ],
    constraints: ['0 ≤ s1.length, s2.length ≤ 100', 's3.length == s1.length + s2.length'],
    starterCode: `def is_interleave(s1, s2, s3):
    pass`,
    functionName: 'is_interleave',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'Valid interleave', args: ['aabcc','dbbca','aadbbcbcac'], expected: true },
      { label: 'Invalid interleave', args: ['aabcc','dbbca','aadbbbaccc'], expected: false },
      { label: 'Empty strings', args: ['','',''], expected: true },
    ],
  },
  {
    id: 'longest-increasing-path-matrix',
    title: 'Longest Increasing Path in a Matrix',
    difficulty: 'hard',
    description: 'Given an <code>m × n</code> matrix, return the length of the longest increasing path (adjacent cells, strictly increasing). Movement is 4-directional.',
    examples: [
      { input: 'matrix = [[9,9,4],[6,6,8],[2,1,1]]', output: '4', explanation: 'Path: 1 → 2 → 6 → 9.' },
      { input: 'matrix = [[3,4,5],[3,2,6],[2,2,1]]', output: '4', explanation: 'Path: 3 → 4 → 5 → 6.' },
    ],
    constraints: ['m == matrix.length', 'n == matrix[0].length', '1 ≤ m, n ≤ 200', '0 ≤ matrix[i][j] ≤ 2³¹ − 1'],
    starterCode: `def longest_increasing_path(matrix):
    pass`,
    functionName: 'longest_increasing_path',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'Length 4', args: [[[9,9,4],[6,6,8],[2,1,1]]], expected: 4 },
      { label: 'Length 4 v2', args: [[[3,4,5],[3,2,6],[2,2,1]]], expected: 4 },
      { label: 'Single', args: [[[1]]], expected: 1 },
    ],
  },
  {
    id: 'distinct-subsequences',
    title: 'Distinct Subsequences',
    difficulty: 'hard',
    description: 'Given strings <code>s</code> and <code>t</code>, return the number of distinct subsequences of <code>s</code> that equal <code>t</code>.',
    examples: [
      { input: 's="rabbbit", t="rabbit"', output: '3', explanation: 'Three ways to choose letters from "rabbbit" to form "rabbit".' },
    ],
    constraints: ['1 ≤ s.length, t.length ≤ 1000', 's and t consist of lowercase English letters'],
    starterCode: `def num_distinct(s, t):
    pass`,
    functionName: 'num_distinct',
    conceptId: 'dp-2d',
    testCases: [
      { label: '"rabbbit"', args: ['rabbbit','rabbit'], expected: 3 },
      { label: '"babgbag"', args: ['babgbag','bag'], expected: 5 },
      { label: 'Exact match', args: ['a','a'], expected: 1 },
    ],
  },
  {
    id: 'edit-distance',
    title: 'Edit Distance',
    difficulty: 'medium',
    description: 'Given two strings <code>word1</code> and <code>word2</code>, return the minimum number of operations (insert, delete, or replace a character) to convert word1 to word2.',
    examples: [
      { input: 'word1="horse", word2="ros"', output: '3', explanation: 'horse→rorse (replace h with r)→rose (remove r)→ros (remove e). 3 operations.' },
    ],
    constraints: ['0 ≤ word1.length, word2.length ≤ 500', 'Both strings consist of lowercase English letters'],
    starterCode: `def min_distance(word1, word2):
    pass`,
    functionName: 'min_distance',
    conceptId: 'dp-2d',
    testCases: [
      { label: '"horse"→"ros"', args: ['horse','ros'], expected: 3 },
      { label: '"intention"→"execution"', args: ['intention','execution'], expected: 5 },
      { label: 'Empty to word', args: ['','abc'], expected: 3 },
    ],
  },
  {
    id: 'burst-balloons',
    title: 'Burst Balloons',
    difficulty: 'hard',
    description: 'Given n balloons with values, bursting balloon <code>i</code> earns <code>nums[left] * nums[i] * nums[right]</code> coins. Return the maximum coins you can collect by bursting all balloons.',
    examples: [
      { input: 'nums = [3,1,5,8]', output: '167', explanation: 'Burst 1: 3*1*5=15. Burst 5: 3*5*8=120. Burst 3: 1*3*8=24. Burst 8: 1*8*1=8. Total = 167.' },
    ],
    constraints: ['n == nums.length', '1 ≤ n ≤ 300', '0 ≤ nums[i] ≤ 100'],
    starterCode: `def max_coins(nums):
    pass`,
    functionName: 'max_coins',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'Classic', args: [[3,1,5,8]], expected: 167 },
      { label: 'Single', args: [[1]], expected: 1 },
      { label: 'Two', args: [[1,5]], expected: 10 },
    ],
  },
  {
    id: 'regular-expression-matching',
    title: 'Regular Expression Matching',
    difficulty: 'hard',
    description: 'Implement regular expression matching with support for <code>.</code> (matches any single character) and <code>*</code> (matches zero or more of the preceding element). The match must cover the entire input string.',
    examples: [
      { input: 's="aa", p="a"', output: 'false', explanation: '"a" does not match "aa".' },
      { input: 's="aa", p="a*"', output: 'true', explanation: '"a*" means zero or more "a"s.' },
      { input: 's="ab", p=".*"', output: 'true', explanation: '".*" matches any string.' },
    ],
    constraints: ['1 ≤ s.length ≤ 20', '1 ≤ p.length ≤ 30', 's contains only lowercase letters; p contains lowercase letters, \'.\', \'*\''],
    starterCode: `def is_match(s, p):
    pass`,
    functionName: 'is_match',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'No match', args: ['aa','a'], expected: false },
      { label: 'Star repeats', args: ['aa','a*'], expected: true },
      { label: 'Dot star', args: ['ab','.*'], expected: true },
      { label: 'Complex', args: ['aab','c*a*b'], expected: true },
    ],
  },
  {
    id: 'stone-game',
    title: 'Stone Game',
    difficulty: 'medium',
    description: 'Alice and Bob take turns picking stones from either end of a row (Alice goes first). Each pile has a certain number of stones. The player with the most stones wins. Return <code>true</code> if Alice always wins.',
    examples: [
      { input: 'piles = [5,3,4,5]', output: 'true', explanation: 'Alice can always guarantee a win.' },
    ],
    constraints: ['2 ≤ piles.length ≤ 500', 'piles.length is even', '1 ≤ piles[i] ≤ 500'],
    starterCode: `def stone_game(piles):
    pass`,
    functionName: 'stone_game',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'Alice wins', args: [[5,3,4,5]], expected: true },
      { label: 'Alice wins always', args: [[1,2,3,4]], expected: true },
    ],
  },

  // ─── GRAPHS — continuous from backtracking (open the lock, min genetic mutation) ──
  {
    id: 'open-the-lock',
    title: 'Open the Lock',
    difficulty: 'medium',
    description: 'A lock has 4 circular wheels each with digits 0-9. You can turn any wheel one step forward or backward. Given a list of <code>deadends</code> and a <code>target</code>, find the minimum turns to reach the target from "0000", or -1 if impossible.',
    examples: [
      { input: 'deadends=["0201","0101","0102","1212","2002"], target="0202"', output: '6' },
      { input: 'deadends=["8888"], target="0009"', output: '1' },
    ],
    constraints: ['1 ≤ deadends.length ≤ 500', 'target.length == deadends[i].length == 4', 'target is not in deadends'],
    starterCode: `def open_lock(deadends, target):
    pass`,
    functionName: 'open_lock',
    conceptId: 'graphs',
    testCases: [
      { label: '6 turns', args: [['0201','0101','0102','1212','2002'],'0202'], expected: 6 },
      { label: '1 turn', args: [['8888'],'0009'], expected: 1 },
      { label: 'Already there', args: [[],  '0000'], expected: 0 },
    ],
  },
  {
    id: 'minimum-genetic-mutation',
    title: 'Minimum Genetic Mutation',
    difficulty: 'medium',
    description: 'A gene string is a sequence of 8 characters from A, C, G, T. A mutation changes one character. Given a start gene, end gene, and a gene bank (valid mutations), find the minimum mutations from start to end, or -1 if impossible.',
    examples: [
      { input: 'startGene="AACCGGTT", endGene="AACCGGTA", bank=["AACCGGTA"]', output: '1' },
      { input: 'startGene="AACCGGTT", endGene="AAACGGTA", bank=["AACCGGTA","AACCGCTA","AAACGGTA"]', output: '2' },
    ],
    constraints: ['startGene.length == endGene.length == bank[i].length == 8', '0 ≤ bank.length ≤ 10'],
    starterCode: `def min_mutation(start_gene, end_gene, bank):
    pass`,
    functionName: 'min_mutation',
    conceptId: 'graphs',
    testCases: [
      { label: '1 mutation', args: ['AACCGGTT','AACCGGTA',['AACCGGTA']], expected: 1 },
      { label: '2 mutations', args: ['AACCGGTT','AAACGGTA',['AACCGGTA','AACCGCTA','AAACGGTA']], expected: 2 },
      { label: 'Impossible', args: ['AACCGGTT','AAACGGTA',['AACCGGTA']], expected: -1 },
    ],
  },
  {
    id: 'keys-and-rooms',
    title: 'Keys and Rooms',
    difficulty: 'medium',
    description: 'There are <code>n</code> rooms, labeled 0 to n-1. Room 0 is unlocked. Each room contains keys to other rooms. Return <code>true</code> if you can visit all rooms.',
    examples: [
      { input: 'rooms = [[1],[2],[3],[]]', output: 'true', explanation: 'Visit 0→1→2→3.' },
      { input: 'rooms = [[1,3],[3,0,1],[2],[0]]', output: 'false', explanation: 'Room 2 cannot be reached.' },
    ],
    constraints: ['n == rooms.length', '1 ≤ n ≤ 1000', '0 ≤ rooms[i].length ≤ 1000'],
    starterCode: `def can_visit_all_rooms(rooms):
    pass`,
    functionName: 'can_visit_all_rooms',
    conceptId: 'graphs',
    testCases: [
      { label: 'Can visit all', args: [[[1],[2],[3],[]]], expected: true },
      { label: 'Cannot visit all', args: [[[1,3],[3,0,1],[2],[0]]], expected: false },
      { label: 'Single room', args: [[[]]], expected: true },
    ],
  },
  {
    id: 'number-operations-make-network-connected',
    title: 'Number of Operations to Make Network Connected',
    difficulty: 'medium',
    description: 'Given n computers and connections (cables), you can move a cable from one pair of computers to another. Find the minimum number of moves to connect all computers, or -1 if impossible.',
    examples: [
      { input: 'n=4, connections=[[0,1],[0,2],[1,2]]', output: '1', explanation: 'One extra cable connects computer 3.' },
      { input: 'n=6, connections=[[0,1],[0,2],[0,3],[1,2],[1,3]]', output: '2' },
    ],
    constraints: ['1 ≤ n ≤ 10⁵', '1 ≤ connections.length ≤ min(n*(n-1)/2, 10⁵)'],
    starterCode: `def make_connected(n, connections):
    pass`,
    functionName: 'make_connected',
    conceptId: 'graphs',
    testCases: [
      { label: '1 operation', args: [4,[[0,1],[0,2],[1,2]]], expected: 1 },
      { label: '2 operations', args: [6,[[0,1],[0,2],[0,3],[1,2],[1,3]]], expected: 2 },
      { label: 'Impossible', args: [4,[[0,1]]], expected: -1 },
    ],
  },
  {
    id: 'frog-jump',
    title: 'Frog Jump',
    difficulty: 'hard',
    description: 'A frog crossing a river must jump on stones. At each stone it can jump k-1, k, or k+1 units (k = last jump). Can the frog reach the last stone?',
    examples: [
      { input: 'stones = [0,1,3,5,6,8,12,17]', output: 'true', explanation: 'Jump sequence: 1,2,2,3,3,4,5.' },
      { input: 'stones = [0,1,2,3,4,8,9,11]', output: 'false' },
    ],
    constraints: ['2 ≤ stones.length ≤ 2000', '0 ≤ stones[i] ≤ 2³¹ − 1', 'stones[0] == 0', 'stones is sorted'],
    starterCode: `def can_cross(stones):
    pass`,
    functionName: 'can_cross',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'Can cross', args: [[0,1,3,5,6,8,12,17]], expected: true },
      { label: 'Cannot cross', args: [[0,1,2,3,4,8,9,11]], expected: false },
    ],
  },
  {
    id: 'maximum-total-importance-roads',
    title: 'Maximum Total Importance of Roads',
    difficulty: 'medium',
    description: 'Given n cities (0-indexed) and bidirectional roads, assign values 1-n to cities (each value used once) to maximize the sum of road importances. A road\'s importance is the sum of its two city values.',
    examples: [
      { input: 'n=5, roads=[[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]', output: '43' },
      { input: 'n=5, roads=[[0,3],[2,4],[1,3]]', output: '20' },
    ],
    constraints: ['2 ≤ n ≤ 5 × 10⁴', '1 ≤ roads.length ≤ 5 × 10⁴'],
    starterCode: `def maximum_importance(n, roads):
    pass`,
    functionName: 'maximum_importance',
    conceptId: 'graphs',
    testCases: [
      { label: 'Six roads', args: [5,[[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]], expected: 43 },
      { label: 'Three roads', args: [5,[[0,3],[2,4],[1,3]]], expected: 20 },
    ],
  },
  {
    id: 'best-time-buy-sell-stock-iii',
    title: 'Best Time to Buy and Sell Stock III',
    difficulty: 'hard',
    description: 'Given stock prices, find the maximum profit using at most 2 transactions. You must sell before you buy again.',
    examples: [
      { input: 'prices = [3,3,5,0,0,3,1,4]', output: '6', explanation: 'Buy day 4 (price 0), sell day 6 (price 3): profit 3. Buy day 7 (price 1), sell day 8 (price 4): profit 3. Total = 6.' },
      { input: 'prices = [1,2,3,4,5]', output: '4', explanation: 'Buy day 1, sell day 5: profit 4.' },
    ],
    constraints: ['1 ≤ prices.length ≤ 10⁵', '0 ≤ prices[i] ≤ 10⁵'],
    starterCode: `def max_profit(prices):
    pass`,
    functionName: 'max_profit',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'Two transactions', args: [[3,3,5,0,0,3,1,4]], expected: 6 },
      { label: 'One transaction', args: [[1,2,3,4,5]], expected: 4 },
      { label: 'Descending', args: [[7,6,4,3,1]], expected: 0 },
    ],
  },
  {
    id: 'best-time-buy-sell-stock-iv',
    title: 'Best Time to Buy and Sell Stock IV',
    difficulty: 'hard',
    description: 'Given stock prices and integer <code>k</code>, find the maximum profit using at most <code>k</code> transactions. You must sell before you buy again.',
    examples: [
      { input: 'k=2, prices=[2,4,1]', output: '2', explanation: 'Buy on day 1, sell on day 2. Profit = 2.' },
      { input: 'k=2, prices=[3,2,6,5,0,3]', output: '7', explanation: 'Buy on day 2, sell day 3 (profit 4); buy day 5, sell day 6 (profit 3).' },
    ],
    constraints: ['1 ≤ k ≤ 100', '1 ≤ prices.length ≤ 1000', '0 ≤ prices[i] ≤ 1000'],
    starterCode: `def max_profit(k, prices):
    pass`,
    functionName: 'max_profit',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'k=2, simple', args: [2,[2,4,1]], expected: 2 },
      { label: 'k=2, standard', args: [2,[3,2,6,5,0,3]], expected: 7 },
      { label: 'k=0', args: [0,[1,2,3]], expected: 0 },
    ],
  },
  {
    id: 'minimum-taps-open-water-garden',
    title: 'Minimum Number of Taps to Open to Water a Garden',
    difficulty: 'hard',
    description: 'A garden has n+1 points (0 to n). Each tap at position i waters [i-ranges[i], i+ranges[i]]. Return the minimum taps to water the entire garden, or -1 if impossible.',
    examples: [
      { input: 'n=5, ranges=[3,4,1,1,0,0]', output: '1', explanation: 'Tap 1 covers [1-4, 1+4] = [-3, 5], watering the whole garden.' },
      { input: 'n=3, ranges=[0,0,0,0]', output: '-1' },
    ],
    constraints: ['1 ≤ n ≤ 10⁴', '0 ≤ ranges[i] ≤ 100'],
    starterCode: `def min_taps(n, ranges):
    pass`,
    functionName: 'min_taps',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'One tap', args: [5,[3,4,1,1,0,0]], expected: 1 },
      { label: 'Impossible', args: [3,[0,0,0,0]], expected: -1 },
      { label: 'Two taps', args: [3,[0,0,0,1]], expected: -1 },
    ],
  },
  {
    id: 'maximum-length-repeated-subarray',
    title: 'Maximum Length of Repeated Subarray',
    difficulty: 'medium',
    description: 'Given two integer arrays, return the maximum length of a subarray that appears in both arrays. (Contiguous subarrays, not subsequences.)',
    examples: [
      { input: 'nums1=[1,2,3,2,1], nums2=[3,2,1,4,7]', output: '3', explanation: '[3,2,1] is the longest common subarray of length 3.' },
      { input: 'nums1=[0,0,0,0,0], nums2=[0,0,0,0,0]', output: '5' },
    ],
    constraints: ['1 ≤ nums1.length, nums2.length ≤ 1000', '0 ≤ nums1[i], nums2[i] ≤ 100'],
    starterCode: `def find_length(nums1, nums2):
    pass`,
    functionName: 'find_length',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'Length 3', args: [[1,2,3,2,1],[3,2,1,4,7]], expected: 3 },
      { label: 'All same', args: [[0,0,0,0,0],[0,0,0,0,0]], expected: 5 },
      { label: 'No overlap', args: [[1,2],[3,4]], expected: 0 },
    ],
  },
  {
    id: 'count-number-of-teams',
    title: 'Count Number of Teams',
    difficulty: 'medium',
    description: 'Given a rating array of soldiers, count teams of 3 soldiers (i < j < k) such that either rating[i] < rating[j] < rating[k] or rating[i] > rating[j] > rating[k].',
    examples: [
      { input: 'rating = [2,5,3,4,1]', output: '3', explanation: 'Teams: (2,3,4),(2,3,1),(2,5,4) → Wait, valid: (2,3,4), (5,3,1), (5,4,1). Count = 3.' },
      { input: 'rating = [1,2,3,4]', output: '4' },
    ],
    constraints: ['n == rating.length', '3 ≤ n ≤ 1000', '1 ≤ rating[i] ≤ 10⁵', 'All ratings are unique'],
    starterCode: `def num_teams(rating):
    pass`,
    functionName: 'num_teams',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'Three teams', args: [[2,5,3,4,1]], expected: 3 },
      { label: 'Four teams', args: [[1,2,3,4]], expected: 4 },
      { label: 'No team', args: [[1,2]], expected: 0 },
    ],
  },
  {
    id: 'domino-tromino-tiling',
    title: 'Domino and Tromino Tiling',
    difficulty: 'medium',
    description: 'You have 2×1 dominoes and L-shaped trominoes. Fill a 2×n board with these pieces. Return the number of ways modulo 10⁹ + 7.',
    examples: [
      { input: 'n = 3', output: '5', explanation: 'Five different ways to tile a 2×3 board.' },
      { input: 'n = 1', output: '1' },
    ],
    constraints: ['1 ≤ n ≤ 1000'],
    starterCode: `def num_tilings(n):
    pass`,
    functionName: 'num_tilings',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'n=3', args: [3], expected: 5 },
      { label: 'n=1', args: [1], expected: 1 },
      { label: 'n=2', args: [2], expected: 2 },
      { label: 'n=4', args: [4], expected: 11 },
    ],
  },

  // ─── HEAP — continued ──────────────────────────────────────────────────────────
  {
    id: 'house-robber-iii',
    title: 'House Robber III',
    difficulty: 'medium',
    description: 'The thief has found a new neighborhood structured as a binary tree. Adjacent nodes cannot both be robbed. Return the maximum amount that can be robbed.',
    examples: [
      { input: 'root = [3,2,3,null,3,null,1]', output: '7', explanation: 'Rob root (3) and leaves (3+1).' },
      { input: 'root = [3,4,5,1,3,null,1]', output: '9', explanation: 'Rob 4+5=9.' },
    ],
    constraints: ['The number of nodes is in the range [1, 10⁴]', '0 ≤ Node.val ≤ 10⁴'],
    starterCode: `def rob(root):
    pass`,
    functionName: 'rob',
    conceptId: 'dp-2d',
    testCases: [
      { label: 'Depth 3', args: [[3,2,3,null,3,null,1]], expected: 7 },
      { label: 'Depth 3 v2', args: [[3,4,5,1,3,null,1]], expected: 9 },
    ],
  },
  {
    id: 'path-sum-ii',
    title: 'Path Sum II',
    difficulty: 'medium',
    description: 'Given the root of a binary tree and integer <code>targetSum</code>, return all root-to-leaf paths where the sum of node values equals <code>targetSum</code>.',
    examples: [
      { input: 'root=[5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum=22', output: '[[5,4,11,2],[5,8,4,5]]' },
    ],
    constraints: ['0 ≤ number of nodes ≤ 5000', '-1000 ≤ Node.val, targetSum ≤ 1000'],
    starterCode: `def path_sum(root, target_sum):
    pass`,
    functionName: 'path_sum',
    conceptId: 'trees',
    testCases: [
      { label: 'Two paths', args: [[5,4,8,11,null,13,4,7,2,null,null,5,1],22], expected: [[5,4,11,2],[5,8,4,5]] },
      { label: 'No paths', args: [[1,2],5], expected: [] },
    ],
  },
  {
    id: 'populating-next-right-pointers',
    title: 'Populating Next Right Pointers in Each Node',
    difficulty: 'medium',
    description: 'Given a perfect binary tree, populate each node\'s <code>next</code> pointer to the next node on the same level. The rightmost node\'s <code>next</code> should be null.',
    examples: [
      { input: 'root = [1,2,3,4,5,6,7]', output: '[1,#,2,3,#,4,5,6,7,#]', explanation: 'Each level connects left to right, ending with #.' },
    ],
    constraints: ['Tree is perfect: all leaves at the same depth, all interior nodes have two children', '0 ≤ Node.val ≤ 100'],
    starterCode: `def connect(root):
    pass`,
    functionName: 'connect',
    conceptId: 'trees',
    testCases: [
      { label: 'Perfect tree', args: [[1,2,3,4,5,6,7]], expected: [1,null,2,3,null,4,5,6,7,null] },
    ],
  },
  {
    id: 'sum-root-to-leaf-numbers',
    title: 'Sum Root to Leaf Numbers',
    difficulty: 'medium',
    description: 'Each root-to-leaf path in a binary tree represents a number. Return the total sum of all root-to-leaf numbers.',
    examples: [
      { input: 'root = [1,2,3]', output: '25', explanation: 'Path 1→2 = 12, path 1→3 = 13. Sum = 25.' },
      { input: 'root = [4,9,0,5,1]', output: '1026', explanation: 'Paths: 495, 491, 40. Sum = 1026.' },
    ],
    constraints: ['1 ≤ number of nodes ≤ 1000', '0 ≤ Node.val ≤ 9', 'Tree depth ≤ 10'],
    starterCode: `def sum_numbers(root):
    pass`,
    functionName: 'sum_numbers',
    conceptId: 'trees',
    testCases: [
      { label: 'Two paths', args: [[1,2,3]], expected: 25 },
      { label: 'Three paths', args: [[4,9,0,5,1]], expected: 1026 },
      { label: 'Single node', args: [[5]], expected: 5 },
    ],
  },
  {
    id: 'binary-search-tree-iterator',
    title: 'Binary Search Tree Iterator',
    difficulty: 'medium',
    description: 'Implement an iterator for a BST. <code>next()</code> returns the next smallest number; <code>hasNext()</code> returns whether more elements exist. Both operations should average O(1) time with O(h) space (h = tree height).',
    examples: [
      { input: 'BSTIterator([7,3,15,null,null,9,20]), next(), next(), hasNext(), next(), hasNext(), next(), hasNext(), next(), hasNext()', output: '[3,7,true,9,true,15,true,20,false]' },
    ],
    constraints: ['1 ≤ number of nodes ≤ 10⁵', '0 ≤ Node.val ≤ 10⁶'],
    starterCode: `class BSTIterator:
    def __init__(self, root):
        pass

    def next(self):
        pass

    def has_next(self):
        pass`,
    functionName: 'BSTIterator',
    conceptId: 'trees',
    testCases: [
      { label: 'Standard BST', args: [[[7,3,15,null,null,9,20]]], expected: [3,7,true,9,true,15,true,20,false] },
    ],
  },
  {
    id: 'trim-binary-search-tree',
    title: 'Trim a Binary Search Tree',
    difficulty: 'medium',
    description: 'Given the root of a BST and bounds [low, high], trim the tree so that all values are in the range [low, high]. Return the root of the trimmed tree.',
    examples: [
      { input: 'root=[1,0,2], low=1, high=2', output: '[1,null,2]' },
      { input: 'root=[3,0,4,null,2,null,null,1], low=1, high=3', output: '[3,2,null,1]' },
    ],
    constraints: ['1 ≤ number of nodes ≤ 10⁴', '0 ≤ Node.val ≤ 10⁴', '0 ≤ low ≤ high ≤ 10⁴'],
    starterCode: `def trim_bst(root, low, high):
    pass`,
    functionName: 'trim_bst',
    conceptId: 'trees',
    testCases: [
      { label: 'Simple trim', args: [[1,0,2],1,2], expected: [1,null,2] },
      { label: 'Multi-level trim', args: [[3,0,4,null,2,null,null,1],1,3], expected: [3,2,null,1] },
    ],
  },
  {
    id: 'recover-binary-search-tree',
    title: 'Recover Binary Search Tree',
    difficulty: 'medium',
    description: 'Two nodes of a BST are swapped by mistake. Recover the BST without changing its structure. Try to use O(1) constant space (Morris inorder traversal).',
    examples: [
      { input: 'root = [1,3,null,null,2]', output: '[3,1,null,null,2]', explanation: 'Swap 1 and 3 back.' },
      { input: 'root = [3,1,4,null,null,2]', output: '[2,1,4,null,null,3]', explanation: 'Swap 2 and 3 back.' },
    ],
    constraints: ['2 ≤ number of nodes ≤ 1000', '-2³¹ ≤ Node.val ≤ 2³¹ − 1'],
    starterCode: `def recover_tree(root):
    pass`,
    functionName: 'recover_tree',
    conceptId: 'trees',
    testCases: [
      { label: 'Swap at root', args: [[1,3,null,null,2]], expected: [3,1,null,null,2] },
    ],
  },
  {
    id: 'smallest-range-k-lists',
    title: 'Smallest Range Covering Elements from K Lists',
    difficulty: 'hard',
    description: 'Given k sorted lists of integers, find the smallest range [a,b] such that each list has at least one element in [a,b].',
    examples: [
      { input: 'nums=[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]', output: '[20,24]', explanation: 'Range [20,24] includes 24 from list 1, 20 from list 2, 22 from list 3.' },
    ],
    constraints: ['nums.length == k', '1 ≤ k ≤ 3500', '1 ≤ nums[i].length ≤ 50', 'All lists are sorted'],
    starterCode: `def smallest_range(nums):
    pass`,
    functionName: 'smallest_range',
    conceptId: 'heap',
    testCases: [
      { label: 'Standard', args: [[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]], expected: [20,24] },
      { label: 'Two lists', args: [[[1,2,3],[1,2,3]]], expected: [1,1] },
    ],
  },
  {
    id: 'minimum-cost-tree-leaf-values',
    title: 'Minimum Cost Tree From Leaf Values',
    difficulty: 'medium',
    description: 'Given an array of leaf values, build a non-leaf tree where each non-leaf node holds the product of the max leaves in its left and right subtrees. Return the minimum sum of all non-leaf nodes.',
    examples: [
      { input: 'arr = [6,2,4]', output: '32', explanation: 'Two possible trees: 6*(2*4)=48+24 vs (6*2)*4=32.' },
    ],
    constraints: ['2 ≤ arr.length ≤ 40', '1 ≤ arr[i] ≤ 15'],
    starterCode: `def mct_from_leaf_values(arr):
    pass`,
    functionName: 'mct_from_leaf_values',
    conceptId: 'monotonic-stack',
    testCases: [
      { label: 'Three leaves', args: [[6,2,4]], expected: 32 },
      { label: 'Two leaves', args: [[3,5]], expected: 15 },
    ],
  },
  {
    id: 'continuous-subarray-sum',
    title: 'Continuous Subarray Sum',
    difficulty: 'medium',
    description: 'Given an integer array <code>nums</code> and integer <code>k</code>, return <code>true</code> if there is a subarray of length at least 2 whose sum is a multiple of <code>k</code>.',
    examples: [
      { input: 'nums=[23,2,4,6,7], k=6', output: 'true', explanation: '[2,4] sums to 6 which is a multiple of 6.' },
      { input: 'nums=[23,2,6,4,7], k=6', output: 'true', explanation: '[23,2,6,4,7] sums to 42 which is a multiple of 6.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', '0 ≤ nums[i] ≤ 10⁹', '0 ≤ k ≤ 2³¹ − 1'],
    starterCode: `def check_subarray_sum(nums, k):
    pass`,
    functionName: 'check_subarray_sum',
    conceptId: 'prefix-sum',
    testCases: [
      { label: 'Short subarray', args: [[23,2,4,6,7],6], expected: true },
      { label: 'Full array', args: [[23,2,6,4,7],6], expected: true },
      { label: 'No match', args: [[1,2,3],7], expected: false },
    ],
  },
  {
    id: 'find-all-numbers-disappeared',
    title: 'Find All Numbers Disappeared in an Array',
    difficulty: 'easy',
    description: 'Given an array of n integers in the range [1, n], some elements appear twice and others once. Find all numbers in [1, n] that do not appear. Return them without extra space and in O(n) time.',
    examples: [
      { input: 'nums = [4,3,2,7,8,2,3,1]', output: '[5,6]' },
      { input: 'nums = [1,1]', output: '[2]' },
    ],
    constraints: ['n == nums.length', '1 ≤ n ≤ 10⁵', '1 ≤ nums[i] ≤ n'],
    starterCode: `def find_disappeared_numbers(nums):
    pass`,
    functionName: 'find_disappeared_numbers',
    conceptId: 'arrays',
    testCases: [
      { label: 'Missing 5,6', args: [[4,3,2,7,8,2,3,1]], expected: [5,6] },
      { label: 'Missing 2', args: [[1,1]], expected: [2] },
      { label: 'None missing', args: [[1,2,3]], expected: [] },
    ],
  },
  {
    id: 'sort-colors',
    title: 'Sort Colors',
    difficulty: 'medium',
    description: 'Given an array with values 0, 1, and 2 (representing red, white, blue), sort them in-place without using a library sort. (Dutch National Flag problem)',
    examples: [
      { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' },
      { input: 'nums = [2,0,1]', output: '[0,1,2]' },
    ],
    constraints: ['n == nums.length', '1 ≤ n ≤ 300', 'nums[i] is 0, 1, or 2'],
    starterCode: `def sort_colors(nums):
    pass
    return nums`,
    functionName: 'sort_colors',
    conceptId: 'arrays',
    testCases: [
      { label: 'Mixed', args: [[2,0,2,1,1,0]], expected: [0,0,1,1,2,2] },
      { label: 'Three values', args: [[2,0,1]], expected: [0,1,2] },
      { label: 'Already sorted', args: [[0,1,2]], expected: [0,1,2] },
    ],
  },
  {
    id: 'majority-element',
    title: 'Majority Element',
    difficulty: 'easy',
    description: 'Given an array of size n, find the majority element — the element that appears more than ⌊n/2⌋ times. The majority element always exists. Try O(1) space (Boyer-Moore voting).',
    examples: [
      { input: 'nums = [3,2,3]', output: '3' },
      { input: 'nums = [2,2,1,1,1,2,2]', output: '2' },
    ],
    constraints: ['n == nums.length', '1 ≤ n ≤ 5 × 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹'],
    starterCode: `def majority_element(nums):
    pass`,
    functionName: 'majority_element',
    conceptId: 'arrays',
    testCases: [
      { label: '3 is majority', args: [[3,2,3]], expected: 3 },
      { label: '2 is majority', args: [[2,2,1,1,1,2,2]], expected: 2 },
      { label: 'Single', args: [[1]], expected: 1 },
    ],
  },
  {
    id: 'max-sum-rectangle-no-larger-k',
    title: 'Max Sum of Rectangle No Larger Than K',
    difficulty: 'hard',
    description: 'Given a matrix of integers and integer <code>k</code>, return the max sum of a rectangle such that its sum is no larger than <code>k</code>.',
    examples: [
      { input: 'matrix=[[1,0,1],[0,-2,3]], k=2', output: '2', explanation: 'The rectangle [[0,1],[-2,3]] has sum 2.' },
    ],
    constraints: ['m == matrix.length', 'n == matrix[0].length', '1 ≤ m, n ≤ 100', '-100 ≤ matrix[i][j] ≤ 100', '-10⁵ ≤ k ≤ 10⁵'],
    starterCode: `def max_sum_submatrix(matrix, k):
    pass`,
    functionName: 'max_sum_submatrix',
    conceptId: 'prefix-sum',
    testCases: [
      { label: 'Standard', args: [[[1,0,1],[0,-2,3]],2], expected: 2 },
      { label: 'k=3', args: [[[2,2],[-1,-1]],3], expected: 3 },
    ],
  },
  {
    id: 'number-of-subarrays-bounded-max',
    title: 'Number of Subarrays with Bounded Maximum',
    difficulty: 'medium',
    description: 'Given an array <code>nums</code> and two integers <code>left</code> and <code>right</code>, return the number of contiguous subarrays where the maximum element is in [left, right].',
    examples: [
      { input: 'nums=[2,1,4,3], left=2, right=3', output: '3', explanation: 'Subarrays: [2],[2,1],[3].' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', '0 ≤ nums[i] ≤ 10⁹', '0 ≤ left ≤ right ≤ 10⁹'],
    starterCode: `def num_subarray_bounded_max(nums, left, right):
    pass`,
    functionName: 'num_subarray_bounded_max',
    conceptId: 'arrays',
    testCases: [
      { label: 'Three subarrays', args: [[2,1,4,3],2,3], expected: 3 },
      { label: 'All in range', args: [[1,2,3],1,3], expected: 6 },
    ],
  },
  {
    id: 'maximum-sum-3-non-overlapping',
    title: 'Maximum Sum of 3 Non-Overlapping Subarrays',
    difficulty: 'hard',
    description: 'Given an integer array <code>nums</code> and integer <code>k</code>, find 3 non-overlapping subarrays of length k with the maximum total sum. Return the starting indices of the subarrays.',
    examples: [
      { input: 'nums=[1,2,1,2,6,7,5,1], k=2', output: '[0,3,5]', explanation: 'Subarrays [1,2],[2,6],[7,5] with sum 15.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 2 × 10⁴', '1 ≤ nums[i] < 2¹⁶', '1 ≤ k ≤ ⌊nums.length / 3⌋'],
    starterCode: `def max_sum_of_three_subarrays(nums, k):
    pass`,
    functionName: 'max_sum_of_three_subarrays',
    conceptId: 'prefix-sum',
    testCases: [
      { label: 'Standard', args: [[1,2,1,2,6,7,5,1],2], expected: [0,3,5] },
      { label: 'k=1', args: [[1,2,3],1], expected: [0,1,2] },
    ],
  },
  {
    id: 'check-if-array-pairs-divisible-by-k',
    title: 'Check If Array Pairs Are Divisible by k',
    difficulty: 'medium',
    description: 'Given an even-length integer array <code>arr</code> and integer <code>k</code>, return <code>true</code> if the array can be divided into pairs such that each pair sums to a multiple of <code>k</code>.',
    examples: [
      { input: 'arr=[1,2,3,4,5,10,6,7,8,9], k=5', output: 'true', explanation: 'Pairs: (1,9),(2,8),(3,7),(4,6),(5,10).' },
      { input: 'arr=[1,2,3,4,5,6], k=7', output: 'true' },
      { input: 'arr=[1,2,3,4,5,6], k=10', output: 'false' },
    ],
    constraints: ['arr.length == 2n', '1 ≤ n ≤ 10⁵', '1 ≤ arr[i] ≤ 10⁹', '1 ≤ k ≤ 10⁵'],
    starterCode: `def can_arrange(arr, k):
    pass`,
    functionName: 'can_arrange',
    conceptId: 'arrays',
    testCases: [
      { label: 'Valid pairs', args: [[1,2,3,4,5,10,6,7,8,9],5], expected: true },
      { label: 'k=7', args: [[1,2,3,4,5,6],7], expected: true },
      { label: 'k=10', args: [[1,2,3,4,5,6],10], expected: false },
    ],
  },

  // ── Arrays & Hashing (classic) ───────────────────────────────────────────
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'easy',
    description: `<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an anagram of <code>s</code>, and <code>false</code> otherwise.</p><p>An anagram uses all the original letters exactly once, rearranged.</p>`,
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' },
    ],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters'],
    starterCode: `def is_anagram(s, t):
    pass`,
    functionName: 'is_anagram',
    conceptId: 'arrays',
    testCases: [
      { label: 'anagram', args: ['anagram', 'nagaram'], expected: true },
      { label: 'not anagram', args: ['rat', 'car'], expected: false },
      { label: 'different lengths', args: ['ab', 'a'], expected: false },
    ],
  },
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'medium',
    description: `<p>Given an array of strings <code>strs</code>, group the anagrams together. You can return the answer in any order.</p>`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
    ],
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase English letters'],
    starterCode: `def group_anagrams(strs):
    pass`,
    functionName: 'group_anagrams_run',
    conceptId: 'arrays',
    runnerSetup: `def group_anagrams_run(strs):
    result = group_anagrams(strs)
    return sorted([sorted(g) for g in result])`,
    testCases: [
      { label: 'mixed', args: [['eat','tea','tan','ate','nat','bat']], expected: [['bat'],['ate','eat','tea'],['nat','tan']] },
      { label: 'single', args: [['a']], expected: [['a']] },
      { label: 'all same', args: [['','','']], expected: [['','','']] },
    ],
  },
  {
    id: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'medium',
    description: `<p>Given an integer array <code>nums</code>, return an array <code>answer</code> such that <code>answer[i]</code> is equal to the product of all elements of <code>nums</code> except <code>nums[i]</code>.</p><p>You must solve it in O(n) time without using the division operation.</p>`,
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' },
    ],
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer'],
    starterCode: `def product_except_self(nums):
    pass`,
    functionName: 'product_except_self',
    conceptId: 'arrays',
    testCases: [
      { label: '[1,2,3,4]', args: [[1,2,3,4]], expected: [24,12,8,6] },
      { label: 'with zero', args: [[-1,1,0,-3,3]], expected: [0,0,9,0,0] },
    ],
  },
  {
    id: 'valid-sudoku',
    title: 'Valid Sudoku',
    difficulty: 'medium',
    description: `<p>Determine if a 9×9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:</p><p>Each row must contain the digits 1–9 without repetition. Each column must contain the digits 1–9 without repetition. Each of the nine 3×3 sub-boxes must contain the digits 1–9 without repetition. A <code>.</code> indicates an empty cell.</p>`,
    examples: [
      { input: 'board = (9x9 partially filled)', output: 'true' },
    ],
    constraints: ['board.length == 9', 'board[i].length == 9', 'board[i][j] is a digit 1-9 or "."'],
    starterCode: `def is_valid_sudoku(board):
    pass`,
    functionName: 'is_valid_sudoku',
    conceptId: 'arrays',
    testCases: [
      { label: 'valid board', args: [[['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]], expected: true },
      { label: 'duplicate in row', args: [[['8','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]], expected: false },
    ],
  },
  {
    id: 'longest-consecutive-sequence',
    title: 'Longest Consecutive Sequence',
    difficulty: 'medium',
    description: `<p>Given an unsorted array of integers <code>nums</code>, return the length of the longest consecutive elements sequence.</p><p>You must write an algorithm that runs in O(n) time.</p>`,
    examples: [
      { input: 'nums = [100,4,200,1,3,2]', output: '4 (sequence: 1,2,3,4)' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' },
    ],
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    starterCode: `def longest_consecutive(nums):
    pass`,
    functionName: 'longest_consecutive',
    conceptId: 'arrays',
    testCases: [
      { label: '[100,4,200,1,3,2]', args: [[100,4,200,1,3,2]], expected: 4 },
      { label: '[0,3,7,2,5,8,4,6,0,1]', args: [[0,3,7,2,5,8,4,6,0,1]], expected: 9 },
      { label: 'empty', args: [[]], expected: 0 },
    ],
  },

  // ── Two Pointers (classic) ────────────────────────────────────────────────
  {
    id: '3sum',
    title: '3Sum',
    difficulty: 'medium',
    description: `<p>Given an integer array <code>nums</code>, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p><p>The solution set must not contain duplicate triplets.</p>`,
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', output: '[]' },
    ],
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    starterCode: `def three_sum(nums):
    pass`,
    functionName: 'three_sum_run',
    conceptId: 'two-pointers',
    runnerSetup: `def three_sum_run(nums):
    result = three_sum(nums)
    return sorted([sorted(t) for t in result])`,
    testCases: [
      { label: '[-1,0,1,2,-1,-4]', args: [[-1,0,1,2,-1,-4]], expected: [[-1,-1,2],[-1,0,1]] },
      { label: '[0,1,1]', args: [[0,1,1]], expected: [] },
      { label: '[0,0,0]', args: [[0,0,0]], expected: [[0,0,0]] },
    ],
  },
  {
    id: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'medium',
    description: `<p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn at position <code>i</code> with height <code>height[i]</code>.</p><p>Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water the container can store.</p>`,
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' },
      { input: 'height = [1,1]', output: '1' },
    ],
    constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
    starterCode: `def max_area(height):
    pass`,
    functionName: 'max_area',
    conceptId: 'two-pointers',
    testCases: [
      { label: '[1,8,6,2,5,4,8,3,7]', args: [[1,8,6,2,5,4,8,3,7]], expected: 49 },
      { label: '[1,1]', args: [[1,1]], expected: 1 },
    ],
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'hard',
    description: `<p>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.</p>`,
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
      { input: 'height = [4,2,0,3,2,5]', output: '9' },
    ],
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    starterCode: `def trap(height):
    pass`,
    functionName: 'trap',
    conceptId: 'two-pointers',
    testCases: [
      { label: 'classic', args: [[0,1,0,2,1,0,1,3,2,1,2,1]], expected: 6 },
      { label: '[4,2,0,3,2,5]', args: [[4,2,0,3,2,5]], expected: 9 },
    ],
  },

  // ── Sliding Window (classic) ──────────────────────────────────────────────
  {
    id: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'easy',
    description: `<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i</code>th day.</p><p>You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve. If you cannot achieve any profit, return <code>0</code>.</p>`,
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5' },
      { input: 'prices = [7,6,4,3,1]', output: '0' },
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    starterCode: `def max_profit(prices):
    pass`,
    functionName: 'max_profit',
    conceptId: 'sliding-window',
    testCases: [
      { label: '[7,1,5,3,6,4]', args: [[7,1,5,3,6,4]], expected: 5 },
      { label: 'decreasing', args: [[7,6,4,3,1]], expected: 0 },
      { label: '[2,4,1]', args: [[2,4,1]], expected: 2 },
    ],
  },
  {
    id: 'longest-substring-without-repeating-chars',
    title: 'Longest Substring Without Repeating Chars',
    difficulty: 'medium',
    description: `<p>Given a string <code>s</code>, find the length of the longest substring without repeating characters.</p>`,
    examples: [
      { input: 's = "abcabcbb"', output: '3 ("abc")' },
      { input: 's = "bbbbb"', output: '1 ("b")' },
      { input: 's = "pwwkew"', output: '3 ("wke")' },
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces'],
    starterCode: `def length_of_longest_substring(s):
    pass`,
    functionName: 'length_of_longest_substring',
    conceptId: 'sliding-window',
    testCases: [
      { label: '"abcabcbb"', args: ['abcabcbb'], expected: 3 },
      { label: '"bbbbb"', args: ['bbbbb'], expected: 1 },
      { label: '"pwwkew"', args: ['pwwkew'], expected: 3 },
    ],
  },
  {
    id: 'longest-repeating-character-replacement',
    title: 'Longest Repeating Character Replacement',
    difficulty: 'medium',
    description: `<p>You are given a string <code>s</code> and an integer <code>k</code>. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most <code>k</code> times.</p><p>Return the length of the longest substring containing the same letter you can get after performing the above operations.</p>`,
    examples: [
      { input: 's = "ABAB", k = 2', output: '4' },
      { input: 's = "AABABBA", k = 1', output: '4' },
    ],
    constraints: ['1 <= s.length <= 10^5', 's consists of only uppercase English letters', '0 <= k <= s.length'],
    starterCode: `def character_replacement(s, k):
    pass`,
    functionName: 'character_replacement',
    conceptId: 'sliding-window',
    testCases: [
      { label: 'ABAB k=2', args: ['ABAB', 2], expected: 4 },
      { label: 'AABABBA k=1', args: ['AABABBA', 1], expected: 4 },
    ],
  },
  {
    id: 'permutation-in-string',
    title: 'Permutation in String',
    difficulty: 'medium',
    description: `<p>Given two strings <code>s1</code> and <code>s2</code>, return <code>true</code> if <code>s2</code> contains a permutation of <code>s1</code>, or <code>false</code> otherwise.</p><p>In other words, return true if one of <code>s1</code>'s permutations is a substring of <code>s2</code>.</p>`,
    examples: [
      { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true' },
      { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false' },
    ],
    constraints: ['1 <= s1.length, s2.length <= 10^4', 's1 and s2 consist of lowercase English letters'],
    starterCode: `def check_inclusion(s1, s2):
    pass`,
    functionName: 'check_inclusion',
    conceptId: 'sliding-window',
    testCases: [
      { label: 'ab in eidbaooo', args: ['ab', 'eidbaooo'], expected: true },
      { label: 'ab in eidboaoo', args: ['ab', 'eidboaoo'], expected: false },
    ],
  },
  {
    id: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'hard',
    description: `<p>Given two strings <code>s</code> and <code>t</code> of lengths <code>m</code> and <code>n</code> respectively, return the minimum window substring of <code>s</code> such that every character in <code>t</code> (including duplicates) is included in the window. If there is no such substring, return the empty string <code>""</code>.</p>`,
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""' },
    ],
    constraints: ['m == s.length', 'n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters'],
    starterCode: `def min_window(s, t):
    pass`,
    functionName: 'min_window',
    conceptId: 'sliding-window',
    testCases: [
      { label: 'ADOBECODEBANC', args: ['ADOBECODEBANC', 'ABC'], expected: 'BANC' },
      { label: 'exact match', args: ['a', 'a'], expected: 'a' },
      { label: 'no match', args: ['a', 'aa'], expected: '' },
    ],
  },
  {
    id: 'sliding-window-maximum',
    title: 'Sliding Window Maximum',
    difficulty: 'hard',
    description: `<p>You are given an array of integers <code>nums</code> and there is a sliding window of size <code>k</code> which is moving from the very left of the array to the very right. You can only see the <code>k</code> numbers in the window. Each time the sliding window moves right by one position, return the max sliding window values.</p>`,
    examples: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' },
      { input: 'nums = [1], k = 1', output: '[1]' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
    starterCode: `def max_sliding_window(nums, k):
    pass`,
    functionName: 'max_sliding_window',
    conceptId: 'sliding-window',
    testCases: [
      { label: 'k=3', args: [[1,3,-1,-3,5,3,6,7], 3], expected: [3,3,5,5,6,7] },
      { label: 'k=1', args: [[1], 1], expected: [1] },
    ],
  },
  // ── Stack (classic) ──────────────────────────────────────────────────────
  {
    id: 'min-stack',
    title: 'Min Stack',
    difficulty: 'medium',
    description: `<p>Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.</p><p>Implement the <code>MinStack</code> class with the operations: <code>push(val)</code>, <code>pop()</code>, <code>top()</code> → int, <code>get_min()</code> → int.</p>`,
    examples: [
      { input: 'push(-2), push(0), push(-3), get_min(), pop(), top(), get_min()', output: '-3, 0, -2' },
    ],
    constraints: ['-2^31 <= val <= 2^31 - 1', 'Methods pop, top and get_min will always be called on non-empty stacks'],
    starterCode: `class MinStack:
    def __init__(self):
        pass

    def push(self, val):
        pass

    def pop(self):
        pass

    def top(self):
        pass

    def get_min(self):
        pass`,
    functionName: 'min_stack_run',
    conceptId: 'stack',
    runnerSetup: `def min_stack_run(ops, vals):
    ms = MinStack()
    results = []
    for op, v in zip(ops, vals):
        if op == 'push': ms.push(v)
        elif op == 'pop': ms.pop()
        elif op == 'top': results.append(ms.top())
        elif op == 'get_min': results.append(ms.get_min())
    return results`,
    testCases: [
      { label: 'push/get_min/pop', args: [['push','push','push','get_min','pop','top','get_min'],[-2,0,-3,0,0,0,0]], expected: [-3,0,-2] },
      { label: 'simple', args: [['push','push','get_min','pop','get_min'],[5,3,0,0,0]], expected: [3,5] },
    ],
  },
  {
    id: 'evaluate-reverse-polish-notation',
    title: 'Evaluate Reverse Polish Notation',
    difficulty: 'medium',
    description: `<p>You are given an array of strings <code>tokens</code> that represents an arithmetic expression in Reverse Polish Notation. Evaluate the expression and return an integer representing the value of the expression.</p><p>Valid operators are <code>+</code>, <code>-</code>, <code>*</code>, and <code>/</code>. Integer division truncates toward zero.</p>`,
    examples: [
      { input: 'tokens = ["2","1","+","3","*"]', output: '9 ((2+1)*3)' },
      { input: 'tokens = ["4","13","5","/","+"]', output: '6 (4+(13/5))' },
    ],
    constraints: ['1 <= tokens.length <= 10^4', 'tokens[i] is either an operator or an integer'],
    starterCode: `def eval_rpn(tokens):
    pass`,
    functionName: 'eval_rpn',
    conceptId: 'stack',
    testCases: [
      { label: '(2+1)*3', args: [['2','1','+','3','*']], expected: 9 },
      { label: '4+(13/5)', args: [['4','13','5','/','+']],  expected: 6 },
      { label: 'negative', args: [['10','6','9','3','+','-11','*','/','+','17','+','5','+']], expected: 22 },
    ],
  },
  {
    id: 'generate-parentheses',
    title: 'Generate Parentheses',
    difficulty: 'medium',
    description: `<p>Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.</p>`,
    examples: [
      { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]' },
      { input: 'n = 1', output: '["()"]' },
    ],
    constraints: ['1 <= n <= 8'],
    starterCode: `def generate_parenthesis(n):
    pass`,
    functionName: 'generate_parenthesis_run',
    conceptId: 'stack',
    runnerSetup: `def generate_parenthesis_run(n):
    return sorted(generate_parenthesis(n))`,
    testCases: [
      { label: 'n=3', args: [3], expected: ['((()))','(()())','(())()','()(())','()()()'] },
      { label: 'n=1', args: [1], expected: ['()'] },
    ],
  },
  {
    id: 'daily-temperatures',
    title: 'Daily Temperatures',
    difficulty: 'medium',
    description: `<p>Given an array of integers <code>temperatures</code> representing the daily temperatures, return an array <code>answer</code> such that <code>answer[i]</code> is the number of days you have to wait after the <code>i</code>th day to get a warmer temperature. If there is no future day for which this is possible, keep <code>answer[i] == 0</code>.</p>`,
    examples: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
    ],
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
    starterCode: `def daily_temperatures(temperatures):
    pass`,
    functionName: 'daily_temperatures',
    conceptId: 'stack',
    testCases: [
      { label: 'classic', args: [[73,74,75,71,69,72,76,73]], expected: [1,1,4,2,1,1,0,0] },
      { label: '[30,40,50,60]', args: [[30,40,50,60]], expected: [1,1,1,0] },
    ],
  },
  {
    id: 'car-fleet',
    title: 'Car Fleet',
    difficulty: 'medium',
    description: `<p>There are <code>n</code> cars going to the same destination along a one-lane road. The destination is <code>target</code> miles away. You are given two integer arrays <code>position</code> and <code>speed</code>.</p><p>A car can never pass another car ahead of it, but it can catch up to it, and they will drive together as one fleet. Return the number of car fleets that will arrive at the destination.</p>`,
    examples: [
      { input: 'target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]', output: '3' },
    ],
    constraints: ['n == position.length == speed.length', '1 <= n <= 10^5', '0 < target <= 10^6'],
    starterCode: `def car_fleet(target, position, speed):
    pass`,
    functionName: 'car_fleet',
    conceptId: 'stack',
    testCases: [
      { label: 'target=12', args: [12, [10,8,0,5,3], [2,4,1,1,3]], expected: 3 },
      { label: 'single', args: [10, [3], [3]], expected: 1 },
    ],
  },
  {
    id: 'largest-rectangle-in-histogram',
    title: 'Largest Rectangle in Histogram',
    difficulty: 'hard',
    description: `<p>Given an array of integers <code>heights</code> representing the histogram's bar heights where the width of each bar is 1, return the area of the largest rectangle in the histogram.</p>`,
    examples: [
      { input: 'heights = [2,1,5,6,2,3]', output: '10' },
      { input: 'heights = [2,4]', output: '4' },
    ],
    constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
    starterCode: `def largest_rectangle_area(heights):
    pass`,
    functionName: 'largest_rectangle_area',
    conceptId: 'stack',
    testCases: [
      { label: '[2,1,5,6,2,3]', args: [[2,1,5,6,2,3]], expected: 10 },
      { label: '[2,4]', args: [[2,4]], expected: 4 },
    ],
  },

  // ── Binary Search (classic) ───────────────────────────────────────────────
  {
    id: 'search-a-2d-matrix',
    title: 'Search a 2D Matrix',
    difficulty: 'medium',
    description: `<p>You are given an <code>m x n</code> integer matrix <code>matrix</code> with the following two properties: each row is sorted in non-decreasing order, and the first integer of each row is greater than the last integer of the previous row.</p><p>Given an integer <code>target</code>, return <code>true</code> if <code>target</code> is in <code>matrix</code> or <code>false</code> otherwise. You must use an O(log(m * n)) algorithm.</p>`,
    examples: [
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'true' },
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13', output: 'false' },
    ],
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 100', '-10^4 <= matrix[i][j], target <= 10^4'],
    starterCode: `def search_matrix(matrix, target):
    pass`,
    functionName: 'search_matrix',
    conceptId: 'binary-search',
    testCases: [
      { label: 'found', args: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3], expected: true },
      { label: 'not found', args: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13], expected: false },
    ],
  },
  {
    id: 'find-minimum-in-rotated-sorted-array',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'medium',
    description: `<p>Suppose an array of length <code>n</code> sorted in ascending order is rotated between 1 and <code>n</code> times. Given the sorted rotated array <code>nums</code> of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.</p>`,
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1' },
      { input: 'nums = [4,5,6,7,0,1,2]', output: '0' },
    ],
    constraints: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All elements are unique'],
    starterCode: `def find_min(nums):
    pass`,
    functionName: 'find_min',
    conceptId: 'binary-search',
    testCases: [
      { label: '[3,4,5,1,2]', args: [[3,4,5,1,2]], expected: 1 },
      { label: '[4,5,6,7,0,1,2]', args: [[4,5,6,7,0,1,2]], expected: 0 },
      { label: '[11,13,15,17]', args: [[11,13,15,17]], expected: 11 },
    ],
  },
  {
    id: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'medium',
    description: `<p>There is an integer array <code>nums</code> sorted in ascending order with distinct values, possibly rotated at an unknown pivot. Given the array <code>nums</code> and an integer <code>target</code>, return the index of <code>target</code> if it is in <code>nums</code>, or <code>-1</code> if it is not. You must write an algorithm with O(log n) runtime complexity.</p>`,
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
    ],
    constraints: ['1 <= nums.length <= 5000', 'All values are unique', '-10^4 <= nums[i], target <= 10^4'],
    starterCode: `def search(nums, target):
    pass`,
    functionName: 'search',
    conceptId: 'binary-search',
    testCases: [
      { label: 'target=0', args: [[4,5,6,7,0,1,2], 0], expected: 4 },
      { label: 'not found', args: [[4,5,6,7,0,1,2], 3], expected: -1 },
      { label: 'single', args: [[1], 0], expected: -1 },
    ],
  },
  {
    id: 'time-based-key-value-store',
    title: 'Time Based Key-Value Store',
    difficulty: 'medium',
    description: `<p>Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.</p><p>Implement <code>set(key, value, timestamp)</code> and <code>get(key, timestamp)</code> which returns the value with the largest timestamp ≤ given timestamp, or <code>""</code> if no such value exists.</p>`,
    examples: [
      { input: 'set("foo","bar",1), get("foo",1), get("foo",3), set("foo","bar2",4), get("foo",4)', output: '"bar","bar","bar2"' },
    ],
    constraints: ['1 <= key.length, value.length <= 100', '1 <= timestamp <= 10^7', 'All timestamps for set are strictly increasing'],
    starterCode: `class TimeMap:
    def __init__(self):
        pass

    def set(self, key, value, timestamp):
        pass

    def get(self, key, timestamp):
        pass`,
    functionName: 'time_map_run',
    conceptId: 'binary-search',
    runnerSetup: `def time_map_run(ops, args):
    tm = TimeMap()
    results = []
    for op, a in zip(ops, args):
        if op == 'set': tm.set(*a)
        elif op == 'get': results.append(tm.get(*a))
    return results`,
    testCases: [
      { label: 'set/get', args: [['set','get','get','set','get','get','get'],[[['foo','bar',1]],[['foo',1]],[['foo',3]],[['foo','bar2',4]],[['foo',4]],[['foo',5]],[['foo',0]]]], expected: ['bar','bar','bar2','bar2',''] },
    ],
  },
  {
    id: 'median-of-two-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'hard',
    description: `<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).</p>`,
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.0' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.5' },
    ],
    constraints: ['0 <= m, n <= 1000', '1 <= m + n <= 2000', '-10^6 <= nums1[i], nums2[i] <= 10^6'],
    starterCode: `def find_median_sorted_arrays(nums1, nums2):
    pass`,
    functionName: 'find_median_sorted_arrays',
    conceptId: 'binary-search',
    testCases: [
      { label: '[1,3],[2]', args: [[1,3], [2]], expected: 2.0 },
      { label: '[1,2],[3,4]', args: [[1,2], [3,4]], expected: 2.5 },
    ],
  },

  // ── Linked List (classic) ─────────────────────────────────────────────────
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'easy',
    description: `<p>You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>. Merge the two lists into one sorted list and return the head of the merged linked list.</p>`,
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', output: '[]' },
    ],
    constraints: ['The number of nodes in both lists is in [0, 50]', '-100 <= Node.val <= 100'],
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(list1, list2):
    pass`,
    functionName: 'merge_two_lists_run',
    conceptId: 'linked-list',
    runnerSetup: `def _tol(h):
    r=[]
    while h: r.append(h.val); h=h.next
    return r
def _ton(a):
    if not a: return None
    h=ListNode(a[0]); c=h
    for v in a[1:]: c.next=ListNode(v); c=c.next
    return h
def merge_two_lists_run(l1, l2):
    return _tol(merge_two_lists(_ton(l1), _ton(l2)))`,
    testCases: [
      { label: '[1,2,4]+[1,3,4]', args: [[1,2,4],[1,3,4]], expected: [1,1,2,3,4,4] },
      { label: 'both empty', args: [[],[]], expected: [] },
      { label: 'one empty', args: [[], [0]], expected: [0] },
    ],
  },
  {
    id: 'reorder-list',
    title: 'Reorder List',
    difficulty: 'medium',
    description: `<p>You are given the head of a singly linked list <code>L: L0 → L1 → ... → Ln-1 → Ln</code>. Reorder it to: <code>L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...</code></p><p>You may not modify the values in the list's nodes. Only nodes themselves may be changed. Modify the list in place and return the head.</p>`,
    examples: [
      { input: 'head = [1,2,3,4]', output: '[1,4,2,3]' },
      { input: 'head = [1,2,3,4,5]', output: '[1,5,2,4,3]' },
    ],
    constraints: ['The number of nodes is in [1, 5 * 10^4]', '1 <= Node.val <= 1000'],
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reorder_list(head):
    pass`,
    functionName: 'reorder_list_run',
    conceptId: 'linked-list',
    runnerSetup: `def _tol(h):
    r=[]
    while h: r.append(h.val); h=h.next
    return r
def _ton(a):
    if not a: return None
    h=ListNode(a[0]); c=h
    for v in a[1:]: c.next=ListNode(v); c=c.next
    return h
def reorder_list_run(arr):
    head = _ton(arr)
    reorder_list(head)
    return _tol(head)`,
    testCases: [
      { label: '[1,2,3,4]', args: [[1,2,3,4]], expected: [1,4,2,3] },
      { label: '[1,2,3,4,5]', args: [[1,2,3,4,5]], expected: [1,5,2,4,3] },
    ],
  },
  {
    id: 'remove-nth-node-from-end',
    title: 'Remove Nth Node From End of List',
    difficulty: 'medium',
    description: `<p>Given the head of a linked list, remove the <code>n</code>th node from the end of the list and return its head.</p>`,
    examples: [
      { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' },
      { input: 'head = [1], n = 1', output: '[]' },
    ],
    constraints: ['The number of nodes is sz', '1 <= sz <= 30', '0 <= Node.val <= 100', '1 <= n <= sz'],
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def remove_nth_from_end(head, n):
    pass`,
    functionName: 'remove_nth_from_end_run',
    conceptId: 'linked-list',
    runnerSetup: `def _tol(h):
    r=[]
    while h: r.append(h.val); h=h.next
    return r
def _ton(a):
    if not a: return None
    h=ListNode(a[0]); c=h
    for v in a[1:]: c.next=ListNode(v); c=c.next
    return h
def remove_nth_from_end_run(arr, n):
    return _tol(remove_nth_from_end(_ton(arr), n))`,
    testCases: [
      { label: '[1,2,3,4,5] n=2', args: [[1,2,3,4,5], 2], expected: [1,2,3,5] },
      { label: 'single n=1', args: [[1], 1], expected: [] },
      { label: '[1,2] n=1', args: [[1,2], 1], expected: [1] },
    ],
  },
  {
    id: 'add-two-numbers',
    title: 'Add Two Numbers',
    difficulty: 'medium',
    description: `<p>You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each node contains a single digit. Add the two numbers and return the sum as a linked list.</p>`,
    examples: [
      { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8] (342 + 465 = 807)' },
      { input: 'l1 = [0], l2 = [0]', output: '[0]' },
    ],
    constraints: ['The number of nodes in each linked list is in [1, 100]', '0 <= Node.val <= 9', 'The lists represent numbers with no leading zeros'],
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def add_two_numbers(l1, l2):
    pass`,
    functionName: 'add_two_numbers_run',
    conceptId: 'linked-list',
    runnerSetup: `def _tol(h):
    r=[]
    while h: r.append(h.val); h=h.next
    return r
def _ton(a):
    if not a: return None
    h=ListNode(a[0]); c=h
    for v in a[1:]: c.next=ListNode(v); c=c.next
    return h
def add_two_numbers_run(l1, l2):
    return _tol(add_two_numbers(_ton(l1), _ton(l2)))`,
    testCases: [
      { label: '342+465', args: [[2,4,3],[5,6,4]], expected: [7,0,8] },
      { label: '0+0', args: [[0],[0]], expected: [0] },
      { label: '999+99', args: [[9,9,9,9,9,9,9],[9,9,9,9]], expected: [8,9,9,9,0,0,0,1] },
    ],
  },
  {
    id: 'find-the-duplicate-number',
    title: 'Find the Duplicate Number',
    difficulty: 'medium',
    description: `<p>Given an array of integers <code>nums</code> containing <code>n + 1</code> integers where each integer is in the range <code>[1, n]</code>, there is only one repeated number. Return this repeated number.</p><p>You must solve the problem without modifying the array and uses only constant extra space.</p>`,
    examples: [
      { input: 'nums = [1,3,4,2,2]', output: '2' },
      { input: 'nums = [3,1,3,4,2]', output: '3' },
    ],
    constraints: ['1 <= n <= 10^5', 'nums.length == n + 1', '1 <= nums[i] <= n', 'There is only one repeated number'],
    starterCode: `def find_duplicate(nums):
    pass`,
    functionName: 'find_duplicate',
    conceptId: 'linked-list',
    testCases: [
      { label: '[1,3,4,2,2]', args: [[1,3,4,2,2]], expected: 2 },
      { label: '[3,1,3,4,2]', args: [[3,1,3,4,2]], expected: 3 },
    ],
  },
  {
    id: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'medium',
    description: `<p>Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.</p><p>Implement the <code>LRUCache</code> class: <code>LRUCache(capacity)</code> initializes the cache, <code>get(key)</code> returns the value or -1 if not found, <code>put(key, value)</code> inserts or updates the key. When the cache reaches capacity, evict the least recently used key before inserting.</p><p>Both operations must run in O(1) average time.</p>`,
    examples: [
      { input: 'LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)', output: '1, -1' },
    ],
    constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5', 'At most 2 * 10^5 calls to get and put'],
    starterCode: `class LRUCache:
    def __init__(self, capacity):
        pass

    def get(self, key):
        pass

    def put(self, key, value):
        pass`,
    functionName: 'lru_cache_run',
    conceptId: 'linked-list',
    runnerSetup: `def lru_cache_run(capacity, ops, args):
    cache = LRUCache(capacity)
    results = []
    for op, a in zip(ops, args):
        if op == 'get': results.append(cache.get(a[0]))
        elif op == 'put': cache.put(a[0], a[1])
    return results`,
    testCases: [
      { label: 'eviction', args: [2, ['put','put','get','put','get','put','get','get','get'], [[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]], expected: [1,-1,-1,3,4] },
    ],
  },
  {
    id: 'merge-k-sorted-lists',
    title: 'Merge K Sorted Lists',
    difficulty: 'hard',
    description: `<p>You are given an array of <code>k</code> linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.</p>`,
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' },
    ],
    constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500', '-10^4 <= lists[i][j] <= 10^4'],
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_k_lists(lists):
    pass`,
    functionName: 'merge_k_lists_run',
    conceptId: 'linked-list',
    runnerSetup: `def _tol(h):
    r=[]
    while h: r.append(h.val); h=h.next
    return r
def _ton(a):
    if not a: return None
    h=ListNode(a[0]); c=h
    for v in a[1:]: c.next=ListNode(v); c=c.next
    return h
def merge_k_lists_run(arrs):
    return _tol(merge_k_lists([_ton(a) for a in arrs]))`,
    testCases: [
      { label: '3 lists', args: [[[1,4,5],[1,3,4],[2,6]]], expected: [1,1,2,3,4,4,5,6] },
      { label: 'empty', args: [[]], expected: [] },
    ],
  },
  {
    id: 'reverse-nodes-in-k-group',
    title: 'Reverse Nodes in K-Group',
    difficulty: 'hard',
    description: `<p>Given the head of a linked list, reverse the nodes of the list <code>k</code> at a time, and return the modified list. If the number of nodes is not a multiple of <code>k</code>, leave the remaining nodes as is.</p><p>You may not alter the values in the list's nodes, only nodes themselves may be changed.</p>`,
    examples: [
      { input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]' },
      { input: 'head = [1,2,3,4,5], k = 3', output: '[3,2,1,4,5]' },
    ],
    constraints: ['The number of nodes is n', '1 <= k <= n <= 5000', '0 <= Node.val <= 1000'],
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_k_group(head, k):
    pass`,
    functionName: 'reverse_k_group_run',
    conceptId: 'linked-list',
    runnerSetup: `def _tol(h):
    r=[]
    while h: r.append(h.val); h=h.next
    return r
def _ton(a):
    if not a: return None
    h=ListNode(a[0]); c=h
    for v in a[1:]: c.next=ListNode(v); c=c.next
    return h
def reverse_k_group_run(arr, k):
    return _tol(reverse_k_group(_ton(arr), k))`,
    testCases: [
      { label: 'k=2', args: [[1,2,3,4,5], 2], expected: [2,1,4,3,5] },
      { label: 'k=3', args: [[1,2,3,4,5], 3], expected: [3,2,1,4,5] },
    ],
  },
  {
    id: 'copy-list-with-random-pointer',
    title: 'Copy List with Random Pointer',
    difficulty: 'medium',
    description: `<p>A linked list of length <code>n</code> is given such that each node contains an additional random pointer, which could point to any node in the list, or <code>null</code>.</p><p>Construct a deep copy of the list and return the head. The deep copy should consist of exactly <code>n</code> new nodes, where each new node has its value set to the value of its corresponding original node. Both the <code>next</code> and <code>random</code> pointers of the new nodes should point to new nodes in the copied list.</p>`,
    examples: [
      { input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]', output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]' },
    ],
    constraints: ['0 <= n <= 1000', '-10^4 <= Node.val <= 10^4', 'Node.random is null or pointing to a node in the linked list'],
    starterCode: `class Node:
    def __init__(self, x, next=None, random=None):
        self.val = int(x)
        self.next = next
        self.random = random

def copy_random_list(head):
    pass`,
    functionName: 'copy_random_list_run',
    conceptId: 'linked-list',
    runnerSetup: `def copy_random_list_run(pairs):
    if not pairs: return []
    nodes = [Node(p[0]) for p in pairs]
    for i, p in enumerate(pairs):
        if i + 1 < len(nodes): nodes[i].next = nodes[i+1]
        nodes[i].random = nodes[p[1]] if p[1] is not None else None
    result = copy_random_list(nodes[0])
    out = []
    while result:
        out.append(result.val)
        result = result.next
    return out`,
    testCases: [
      { label: '5 nodes', args: [[[7,null],[13,0],[11,4],[10,2],[1,0]]], expected: [7,13,11,10,1] },
      { label: 'single null', args: [[[1,null]]], expected: [1] },
    ],
  },

  // ── Trees (classic) ──────────────────────────────────────────────────────
  {
    id: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    difficulty: 'easy',
    description: `<p>Given the root of a binary tree, invert the tree (mirror it), and return its root.</p>`,
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
      { input: 'root = [2,1,3]', output: '[2,3,1]' },
    ],
    constraints: ['The number of nodes is in [0, 100]', '-100 <= Node.val <= 100'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root):
    pass`,
    functionName: 'invert_tree_run',
    conceptId: 'trees',
    runnerSetup: `from collections import deque
def _build(arr):
    if not arr or arr[0] is None: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def _level(root):
    if not root: return []
    q = deque([root]); res = []
    while q:
        node = q.popleft()
        if node: res.append(node.val); q.append(node.left); q.append(node.right)
        else: res.append(None)
    while res and res[-1] is None: res.pop()
    return res
def invert_tree_run(arr):
    return _level(invert_tree(_build(arr)))`,
    testCases: [
      { label: '[4,2,7,1,3,6,9]', args: [[4,2,7,1,3,6,9]], expected: [4,7,2,9,6,3,1] },
      { label: '[2,1,3]', args: [[2,1,3]], expected: [2,3,1] },
    ],
  },
  {
    id: 'diameter-of-binary-tree',
    title: 'Diameter of Binary Tree',
    difficulty: 'easy',
    description: `<p>Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes. This path may or may not pass through the root.</p>`,
    examples: [
      { input: 'root = [1,2,3,4,5]', output: '3 (path: 4→2→1→3)' },
      { input: 'root = [1,2]', output: '1' },
    ],
    constraints: ['The number of nodes is in [1, 10^4]', '-100 <= Node.val <= 100'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def diameter_of_binary_tree(root):
    pass`,
    functionName: 'diameter_of_binary_tree_run',
    conceptId: 'trees',
    runnerSetup: `from collections import deque
def _build(arr):
    if not arr or arr[0] is None: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def diameter_of_binary_tree_run(arr):
    return diameter_of_binary_tree(_build(arr))`,
    testCases: [
      { label: '[1,2,3,4,5]', args: [[1,2,3,4,5]], expected: 3 },
      { label: '[1,2]', args: [[1,2]], expected: 1 },
    ],
  },
  {
    id: 'balanced-binary-tree',
    title: 'Balanced Binary Tree',
    difficulty: 'easy',
    description: `<p>Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.</p>`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: 'true' },
      { input: 'root = [1,2,2,3,3,null,null,4,4]', output: 'false' },
    ],
    constraints: ['The number of nodes is in [0, 5000]', '-10^4 <= Node.val <= 10^4'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_balanced(root):
    pass`,
    functionName: 'is_balanced_run',
    conceptId: 'trees',
    runnerSetup: `from collections import deque
def _build(arr):
    if not arr or arr[0] is None: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def is_balanced_run(arr):
    return is_balanced(_build(arr))`,
    testCases: [
      { label: 'balanced', args: [[3,9,20,null,null,15,7]], expected: true },
      { label: 'unbalanced', args: [[1,2,2,3,3,null,null,4,4]], expected: false },
    ],
  },
  {
    id: 'same-tree',
    title: 'Same Tree',
    difficulty: 'easy',
    description: `<p>Given the roots of two binary trees <code>p</code> and <code>q</code>, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.</p>`,
    examples: [
      { input: 'p = [1,2,3], q = [1,2,3]', output: 'true' },
      { input: 'p = [1,2], q = [1,null,2]', output: 'false' },
    ],
    constraints: ['The number of nodes in both trees is in [0, 100]', '-10^4 <= Node.val <= 10^4'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_same_tree(p, q):
    pass`,
    functionName: 'is_same_tree_run',
    conceptId: 'trees',
    runnerSetup: `from collections import deque
def _build(arr):
    if not arr or arr[0] is None: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def is_same_tree_run(p, q):
    return is_same_tree(_build(p), _build(q))`,
    testCases: [
      { label: 'same', args: [[1,2,3],[1,2,3]], expected: true },
      { label: 'different structure', args: [[1,2],[1,null,2]], expected: false },
    ],
  },
  {
    id: 'subtree-of-another-tree',
    title: 'Subtree of Another Tree',
    difficulty: 'easy',
    description: `<p>Given the roots of two binary trees <code>root</code> and <code>subRoot</code>, return <code>true</code> if there is a subtree of <code>root</code> with the same structure and node values as <code>subRoot</code> and <code>false</code> otherwise.</p>`,
    examples: [
      { input: 'root = [3,4,5,1,2], subRoot = [4,1,2]', output: 'true' },
      { input: 'root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]', output: 'false' },
    ],
    constraints: ['The number of nodes in root is in [1, 2000]', 'The number of nodes in subRoot is in [1, 1000]'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_subtree(root, sub_root):
    pass`,
    functionName: 'is_subtree_run',
    conceptId: 'trees',
    runnerSetup: `from collections import deque
def _build(arr):
    if not arr or arr[0] is None: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def is_subtree_run(root, sub):
    return is_subtree(_build(root), _build(sub))`,
    testCases: [
      { label: 'is subtree', args: [[3,4,5,1,2],[4,1,2]], expected: true },
      { label: 'not subtree', args: [[3,4,5,1,2,null,null,null,null,0],[4,1,2]], expected: false },
    ],
  },
  {
    id: 'lowest-common-ancestor-of-bst',
    title: 'Lowest Common Ancestor of a BST',
    difficulty: 'medium',
    description: `<p>Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST. The LCA is defined as the lowest node in the tree that has both nodes as descendants (a node can be a descendant of itself).</p>`,
    examples: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6' },
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2' },
    ],
    constraints: ['The number of nodes is in [2, 10^5]', '-10^9 <= Node.val <= 10^9', 'All Node.val are unique'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowest_common_ancestor(root, p, q):
    pass`,
    functionName: 'lca_bst_run',
    conceptId: 'trees',
    runnerSetup: `from collections import deque
def _build(arr):
    if not arr or arr[0] is None: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def _find(root, val):
    while root:
        if root.val == val: return root
        elif val < root.val: root = root.left
        else: root = root.right
def lca_bst_run(arr, p, q):
    root = _build(arr)
    result = lowest_common_ancestor(root, _find(root,p), _find(root,q))
    return result.val`,
    testCases: [
      { label: 'p=2,q=8', args: [[6,2,8,0,4,7,9,null,null,3,5], 2, 8], expected: 6 },
      { label: 'p=2,q=4', args: [[6,2,8,0,4,7,9,null,null,3,5], 2, 4], expected: 2 },
    ],
  },
  {
    id: 'binary-tree-right-side-view',
    title: 'Binary Tree Right Side View',
    difficulty: 'medium',
    description: `<p>Given the root of a binary tree, imagine yourself standing on the right side of it. Return the values of the nodes you can see ordered from top to bottom.</p>`,
    examples: [
      { input: 'root = [1,2,3,null,5,null,4]', output: '[1,3,4]' },
      { input: 'root = [1,null,3]', output: '[1,3]' },
    ],
    constraints: ['The number of nodes is in [0, 100]', '-100 <= Node.val <= 100'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def right_side_view(root):
    pass`,
    functionName: 'right_side_view_run',
    conceptId: 'trees',
    runnerSetup: `from collections import deque
def _build(arr):
    if not arr or arr[0] is None: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def right_side_view_run(arr):
    return right_side_view(_build(arr))`,
    testCases: [
      { label: '[1,2,3,null,5,null,4]', args: [[1,2,3,null,5,null,4]], expected: [1,3,4] },
      { label: '[1,null,3]', args: [[1,null,3]], expected: [1,3] },
    ],
  },
  {
    id: 'count-good-nodes-in-binary-tree',
    title: 'Count Good Nodes in Binary Tree',
    difficulty: 'medium',
    description: `<p>Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X. Return the number of good nodes in the binary tree.</p>`,
    examples: [
      { input: 'root = [3,1,4,3,null,1,5]', output: '4' },
      { input: 'root = [3,3,null,4,2]', output: '3' },
    ],
    constraints: ['The number of nodes is in [1, 10^5]', '-10^4 <= Node.val <= 10^4'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def good_nodes(root):
    pass`,
    functionName: 'good_nodes_run',
    conceptId: 'trees',
    runnerSetup: `from collections import deque
def _build(arr):
    if not arr or arr[0] is None: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def good_nodes_run(arr):
    return good_nodes(_build(arr))`,
    testCases: [
      { label: '[3,1,4,3,null,1,5]', args: [[3,1,4,3,null,1,5]], expected: 4 },
      { label: '[3,3,null,4,2]', args: [[3,3,null,4,2]], expected: 3 },
    ],
  },
  {
    id: 'validate-binary-search-tree',
    title: 'Validate Binary Search Tree',
    difficulty: 'medium',
    description: `<p>Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as: the left subtree of a node contains only nodes with keys less than the node's key, the right subtree contains only nodes with keys greater than the node's key, and both subtrees must also be binary search trees.</p>`,
    examples: [
      { input: 'root = [2,1,3]', output: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false (4 is in right subtree of 5)' },
    ],
    constraints: ['The number of nodes is in [1, 10^4]', '-2^31 <= Node.val <= 2^31 - 1'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root):
    pass`,
    functionName: 'is_valid_bst_run',
    conceptId: 'trees',
    runnerSetup: `from collections import deque
def _build(arr):
    if not arr or arr[0] is None: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def is_valid_bst_run(arr):
    return is_valid_bst(_build(arr))`,
    testCases: [
      { label: 'valid', args: [[2,1,3]], expected: true },
      { label: 'invalid', args: [[5,1,4,null,null,3,6]], expected: false },
    ],
  },
  {
    id: 'kth-smallest-element-in-bst',
    title: 'Kth Smallest Element in a BST',
    difficulty: 'medium',
    description: `<p>Given the root of a binary search tree and an integer <code>k</code>, return the <code>k</code>th smallest value (1-indexed) of all the values of the nodes in the tree.</p>`,
    examples: [
      { input: 'root = [3,1,4,null,2], k = 1', output: '1' },
      { input: 'root = [5,3,6,2,4,null,null,1], k = 3', output: '3' },
    ],
    constraints: ['The number of nodes is n', '1 <= k <= n <= 10^4', '0 <= Node.val <= 10^4'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def kth_smallest(root, k):
    pass`,
    functionName: 'kth_smallest_run',
    conceptId: 'trees',
    runnerSetup: `from collections import deque
def _build(arr):
    if not arr or arr[0] is None: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def kth_smallest_run(arr, k):
    return kth_smallest(_build(arr), k)`,
    testCases: [
      { label: 'k=1', args: [[3,1,4,null,2], 1], expected: 1 },
      { label: 'k=3', args: [[5,3,6,2,4,null,null,1], 3], expected: 3 },
    ],
  },
  {
    id: 'construct-tree-from-preorder-inorder',
    title: 'Construct Tree from Preorder and Inorder',
    difficulty: 'medium',
    description: `<p>Given two integer arrays <code>preorder</code> and <code>inorder</code> where <code>preorder</code> is the preorder traversal of a binary tree and <code>inorder</code> is the inorder traversal of the same tree, construct and return the binary tree.</p>`,
    examples: [
      { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]' },
      { input: 'preorder = [-1], inorder = [-1]', output: '[-1]' },
    ],
    constraints: ['1 <= preorder.length <= 3000', 'inorder.length == preorder.length', 'All values are unique'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def build_tree(preorder, inorder):
    pass`,
    functionName: 'build_tree_run',
    conceptId: 'trees',
    runnerSetup: `from collections import deque
def _level(root):
    if not root: return []
    q = deque([root]); res = []
    while q:
        node = q.popleft()
        if node: res.append(node.val); q.append(node.left); q.append(node.right)
        else: res.append(None)
    while res and res[-1] is None: res.pop()
    return res
def build_tree_run(pre, ino):
    return _level(build_tree(pre, ino))`,
    testCases: [
      { label: 'classic', args: [[3,9,20,15,7],[9,3,15,20,7]], expected: [3,9,20,null,null,15,7] },
      { label: 'single', args: [[-1],[-1]], expected: [-1] },
    ],
  },
  {
    id: 'binary-tree-maximum-path-sum',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'hard',
    description: `<p>A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. The path sum is the sum of the nodes' values in the path.</p><p>Given the root of a binary tree, return the maximum path sum of any non-empty path.</p>`,
    examples: [
      { input: 'root = [1,2,3]', output: '6 (2→1→3)' },
      { input: 'root = [-10,9,20,null,null,15,7]', output: '42 (15→20→7)' },
    ],
    constraints: ['The number of nodes is in [1, 3 * 10^4]', '-1000 <= Node.val <= 1000'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_path_sum(root):
    pass`,
    functionName: 'max_path_sum_run',
    conceptId: 'trees',
    runnerSetup: `from collections import deque
def _build(arr):
    if not arr or arr[0] is None: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def max_path_sum_run(arr):
    return max_path_sum(_build(arr))`,
    testCases: [
      { label: '[1,2,3]', args: [[1,2,3]], expected: 6 },
      { label: '[-10,9,20,null,null,15,7]', args: [[-10,9,20,null,null,15,7]], expected: 42 },
    ],
  },
  {
    id: 'serialize-and-deserialize-binary-tree',
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'hard',
    description: `<p>Serialization is the process of converting a data structure into a sequence of bits so that it can be stored or sent and reconstructed later. Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.</p><p>Implement a <code>Codec</code> class with <code>serialize(root)</code> → string and <code>deserialize(data)</code> → TreeNode.</p>`,
    examples: [
      { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5] (after serialize then deserialize)' },
    ],
    constraints: ['The number of nodes is in [0, 10^4]', '-1000 <= Node.val <= 1000'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Codec:
    def serialize(self, root):
        pass

    def deserialize(self, data):
        pass`,
    functionName: 'codec_run',
    conceptId: 'trees',
    runnerSetup: `from collections import deque
def _build(arr):
    if not arr or arr[0] is None: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def _level(root):
    if not root: return []
    q = deque([root]); res = []
    while q:
        node = q.popleft()
        if node: res.append(node.val); q.append(node.left); q.append(node.right)
        else: res.append(None)
    while res and res[-1] is None: res.pop()
    return res
def codec_run(arr):
    c = Codec()
    return _level(c.deserialize(c.serialize(_build(arr))))`,
    testCases: [
      { label: '[1,2,3,null,null,4,5]', args: [[1,2,3,null,null,4,5]], expected: [1,2,3,null,null,4,5] },
      { label: 'empty', args: [[]], expected: [] },
    ],
  },

  // ── Heap / Priority Queue (classic) ──────────────────────────────────────
  {
    id: 'last-stone-weight',
    title: 'Last Stone Weight',
    difficulty: 'easy',
    description: `<p>You are given an array of integers <code>stones</code> where <code>stones[i]</code> is the weight of the <code>i</code>th stone. We play a game: on each turn we smash the two heaviest stones. If they have equal weight both are destroyed; otherwise the smaller one is destroyed and the larger one's weight is reduced by the smaller. Return the weight of the last remaining stone, or 0 if none remain.</p>`,
    examples: [
      { input: 'stones = [2,7,4,1,8,1]', output: '1' },
      { input: 'stones = [1]', output: '1' },
    ],
    constraints: ['1 <= stones.length <= 30', '1 <= stones[i] <= 1000'],
    starterCode: `def last_stone_weight(stones):
    pass`,
    functionName: 'last_stone_weight',
    conceptId: 'heap',
    testCases: [
      { label: '[2,7,4,1,8,1]', args: [[2,7,4,1,8,1]], expected: 1 },
      { label: 'single', args: [[1]], expected: 1 },
    ],
  },
  {
    id: 'k-closest-points-to-origin',
    title: 'K Closest Points to Origin',
    difficulty: 'medium',
    description: `<p>Given an array of <code>points</code> where <code>points[i] = [xi, yi]</code> represents a point on the X-Y plane and an integer <code>k</code>, return the <code>k</code> closest points to the origin. You may return the answer in any order.</p>`,
    examples: [
      { input: 'points = [[1,3],[-2,2]], k = 1', output: '[[-2,2]]' },
      { input: 'points = [[3,3],[5,-1],[-2,4]], k = 2', output: '[[3,3],[-2,4]]' },
    ],
    constraints: ['1 <= k <= points.length <= 10^4', '-10^4 <= xi, yi <= 10^4'],
    starterCode: `def k_closest(points, k):
    pass`,
    functionName: 'k_closest_run',
    conceptId: 'heap',
    runnerSetup: `def k_closest_run(points, k):
    result = k_closest(points, k)
    return sorted([sorted(p) for p in result])`,
    testCases: [
      { label: '[[1,3],[-2,2]] k=1', args: [[[1,3],[-2,2]], 1], expected: [[-2,2]] },
      { label: 'k=2', args: [[[3,3],[5,-1],[-2,4]], 2], expected: [[-2,4],[3,3]] },
    ],
  },
  {
    id: 'kth-largest-element-in-array',
    title: 'Kth Largest Element in an Array',
    difficulty: 'medium',
    description: `<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code>th largest element in the array. Note that it is the <code>k</code>th largest element in sorted order, not the <code>k</code>th distinct element. You must solve it in O(n) average time complexity.</p>`,
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' },
    ],
    constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    starterCode: `def find_kth_largest(nums, k):
    pass`,
    functionName: 'find_kth_largest',
    conceptId: 'heap',
    testCases: [
      { label: 'k=2', args: [[3,2,1,5,6,4], 2], expected: 5 },
      { label: 'k=4', args: [[3,2,3,1,2,4,5,5,6], 4], expected: 4 },
    ],
  },
  {
    id: 'task-scheduler',
    title: 'Task Scheduler',
    difficulty: 'medium',
    description: `<p>Given a characters array <code>tasks</code>, representing tasks a CPU needs to do, and a non-negative integer <code>n</code> representing the cooldown period between the same task, return the minimum number of intervals the CPU will take to finish all the given tasks.</p>`,
    examples: [
      { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: '8' },
      { input: 'tasks = ["A","A","A","B","B","B"], n = 0', output: '6' },
    ],
    constraints: ['1 <= tasks.length <= 10^4', 'tasks[i] is an uppercase English letter', '0 <= n <= 100'],
    starterCode: `def least_interval(tasks, n):
    pass`,
    functionName: 'least_interval',
    conceptId: 'heap',
    testCases: [
      { label: 'n=2', args: [['A','A','A','B','B','B'], 2], expected: 8 },
      { label: 'n=0', args: [['A','A','A','B','B','B'], 0], expected: 6 },
    ],
  },
  {
    id: 'design-twitter',
    title: 'Design Twitter',
    difficulty: 'medium',
    description: `<p>Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in the user's news feed.</p><p>Implement: <code>post_tweet(userId, tweetId)</code>, <code>get_news_feed(userId)</code> → list of 10 most recent tweet IDs, <code>follow(followerId, followeeId)</code>, <code>unfollow(followerId, followeeId)</code>.</p>`,
    examples: [
      { input: 'post(1,5), post(1,3), follow(1,2), post(2,6), getNewsFeed(1)', output: '[6,3,5]' },
    ],
    constraints: ['1 <= userId, followerId, followeeId <= 500', '0 <= tweetId <= 10^4', 'All tweets have unique IDs'],
    starterCode: `class Twitter:
    def __init__(self):
        pass

    def post_tweet(self, user_id, tweet_id):
        pass

    def get_news_feed(self, user_id):
        pass

    def follow(self, follower_id, followee_id):
        pass

    def unfollow(self, follower_id, followee_id):
        pass`,
    functionName: 'twitter_run',
    conceptId: 'heap',
    runnerSetup: `def twitter_run(ops, args):
    t = Twitter()
    results = []
    for op, a in zip(ops, args):
        if op == 'post_tweet': t.post_tweet(*a)
        elif op == 'get_news_feed': results.append(t.get_news_feed(*a))
        elif op == 'follow': t.follow(*a)
        elif op == 'unfollow': t.unfollow(*a)
    return results`,
    testCases: [
      { label: 'basic feed', args: [['post_tweet','post_tweet','follow','post_tweet','get_news_feed'],[[1,5],[1,3],[1,2],[2,6],[1]]], expected: [[6,3,5]] },
    ],
  },
  {
    id: 'find-median-from-data-stream',
    title: 'Find Median from Data Stream',
    difficulty: 'hard',
    description: `<p>The median is the middle value in an ordered integer list. For an odd-length list, it's the middle element; for even-length, it's the mean of the two middle elements.</p><p>Implement a <code>MedianFinder</code> class: <code>add_num(num)</code> adds a number, <code>find_median()</code> returns the median of all elements so far.</p>`,
    examples: [
      { input: 'add(1), add(2), find_median(), add(3), find_median()', output: '1.5, 2.0' },
    ],
    constraints: ['-10^5 <= num <= 10^5', 'There will be at least one element before calling find_median'],
    starterCode: `class MedianFinder:
    def __init__(self):
        pass

    def add_num(self, num):
        pass

    def find_median(self):
        pass`,
    functionName: 'median_finder_run',
    conceptId: 'heap',
    runnerSetup: `def median_finder_run(ops, args):
    mf = MedianFinder()
    results = []
    for op, a in zip(ops, args):
        if op == 'add_num': mf.add_num(a[0])
        elif op == 'find_median': results.append(mf.find_median())
    return results`,
    testCases: [
      { label: 'odd/even', args: [['add_num','add_num','find_median','add_num','find_median'],[[1],[2],[],[3],[]]], expected: [1.5,2.0] },
      { label: 'single', args: [['add_num','find_median'],[[6],[]]], expected: [6.0] },
    ],
  },

  // ── Backtracking (classic) ────────────────────────────────────────────────
  {
    id: 'combination-sum',
    title: 'Combination Sum',
    difficulty: 'medium',
    description: `<p>Given an array of distinct integers <code>candidates</code> and a target integer <code>target</code>, return a list of all unique combinations of <code>candidates</code> where the chosen numbers sum to <code>target</code>. You may return the combinations in any order. The same number may be chosen from <code>candidates</code> an unlimited number of times.</p>`,
    examples: [
      { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' },
      { input: 'candidates = [2,3,4], target = 6', output: '[[2,2,2],[2,4],[3,3]]' },
    ],
    constraints: ['1 <= candidates.length <= 30', '2 <= candidates[i] <= 40', '1 <= target <= 40'],
    starterCode: `def combination_sum(candidates, target):
    pass`,
    functionName: 'combination_sum_run',
    conceptId: 'backtracking',
    runnerSetup: `def combination_sum_run(candidates, target):
    result = combination_sum(candidates, target)
    return sorted([sorted(c) for c in result])`,
    testCases: [
      { label: 'target=7', args: [[2,3,6,7], 7], expected: [[2,2,3],[7]] },
      { label: 'target=6', args: [[2,3,4], 6], expected: [[2,2,2],[2,4],[3,3]] },
    ],
  },
  {
    id: 'permutations',
    title: 'Permutations',
    difficulty: 'medium',
    description: `<p>Given an array <code>nums</code> of distinct integers, return all the possible permutations. You can return the answer in any order.</p>`,
    examples: [
      { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
      { input: 'nums = [0,1]', output: '[[0,1],[1,0]]' },
    ],
    constraints: ['1 <= nums.length <= 6', 'All integers are unique'],
    starterCode: `def permute(nums):
    pass`,
    functionName: 'permute_run',
    conceptId: 'backtracking',
    runnerSetup: `def permute_run(nums):
    return sorted(permute(nums))`,
    testCases: [
      { label: '[1,2,3]', args: [[1,2,3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
      { label: '[0,1]', args: [[0,1]], expected: [[0,1],[1,0]] },
    ],
  },
  {
    id: 'subsets-ii',
    title: 'Subsets II',
    difficulty: 'medium',
    description: `<p>Given an integer array <code>nums</code> that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.</p>`,
    examples: [
      { input: 'nums = [1,2,2]', output: '[[],[1],[1,2],[1,2,2],[2],[2,2]]' },
      { input: 'nums = [0]', output: '[[],[0]]' },
    ],
    constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10'],
    starterCode: `def subsets_with_dup(nums):
    pass`,
    functionName: 'subsets_with_dup_run',
    conceptId: 'backtracking',
    runnerSetup: `def subsets_with_dup_run(nums):
    result = subsets_with_dup(nums)
    return sorted([sorted(s) for s in result])`,
    testCases: [
      { label: '[1,2,2]', args: [[1,2,2]], expected: [[],[1],[1,2],[1,2,2],[2],[2,2]] },
      { label: '[0]', args: [[0]], expected: [[],[0]] },
    ],
  },
  {
    id: 'combination-sum-ii',
    title: 'Combination Sum II',
    difficulty: 'medium',
    description: `<p>Given a collection of candidate numbers (may contain duplicates) and a target number, find all unique combinations where the candidate numbers sum to target. Each number in candidates may only be used once in the combination.</p>`,
    examples: [
      { input: 'candidates = [10,1,2,7,6,1,5], target = 8', output: '[[1,1,6],[1,2,5],[1,7],[2,6]]' },
      { input: 'candidates = [2,5,2,1,2], target = 5', output: '[[1,2,2],[5]]' },
    ],
    constraints: ['1 <= candidates.length <= 100', '1 <= candidates[i] <= 50', '1 <= target <= 30'],
    starterCode: `def combination_sum2(candidates, target):
    pass`,
    functionName: 'combination_sum2_run',
    conceptId: 'backtracking',
    runnerSetup: `def combination_sum2_run(candidates, target):
    result = combination_sum2(candidates, target)
    return sorted([sorted(c) for c in result])`,
    testCases: [
      { label: 'target=8', args: [[10,1,2,7,6,1,5], 8], expected: [[1,1,6],[1,2,5],[1,7],[2,6]] },
      { label: 'target=5', args: [[2,5,2,1,2], 5], expected: [[1,2,2],[5]] },
    ],
  },
  {
    id: 'word-search',
    title: 'Word Search',
    difficulty: 'medium',
    description: `<p>Given an <code>m x n</code> grid of characters <code>board</code> and a string <code>word</code>, return <code>true</code> if <code>word</code> exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same cell may not be used more than once.</p>`,
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: 'false' },
    ],
    constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 6', '1 <= word.length <= 15'],
    starterCode: `def exist(board, word):
    pass`,
    functionName: 'exist',
    conceptId: 'backtracking',
    testCases: [
      { label: 'ABCCED', args: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCCED'], expected: true },
      { label: 'ABCB false', args: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCB'], expected: false },
    ],
  },
  {
    id: 'palindrome-partitioning',
    title: 'Palindrome Partitioning',
    difficulty: 'medium',
    description: `<p>Given a string <code>s</code>, partition <code>s</code> such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of <code>s</code>.</p>`,
    examples: [
      { input: 's = "aab"', output: '[["a","a","b"],["aa","b"]]' },
      { input: 's = "a"', output: '[["a"]]' },
    ],
    constraints: ['1 <= s.length <= 16', 's consists only of lowercase English letters'],
    starterCode: `def partition(s):
    pass`,
    functionName: 'partition_run',
    conceptId: 'backtracking',
    runnerSetup: `def partition_run(s):
    result = partition(s)
    return sorted([sorted(p) for p in result])`,
    testCases: [
      { label: '"aab"', args: ['aab'], expected: [['a','a','b'],['aa','b']] },
      { label: '"a"', args: ['a'], expected: [['a']] },
    ],
  },
  {
    id: 'letter-combinations-of-phone',
    title: 'Letter Combinations of Phone',
    difficulty: 'medium',
    description: `<p>Given a string containing digits from 2–9, return all possible letter combinations that the number could represent (like a phone keypad). Return the answer in any order. If the input is empty, return an empty list.</p>`,
    examples: [
      { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
      { input: 'digits = ""', output: '[]' },
    ],
    constraints: ['0 <= digits.length <= 4', 'digits[i] is a digit in the range [2,9]'],
    starterCode: `def letter_combinations(digits):
    pass`,
    functionName: 'letter_combinations_run',
    conceptId: 'backtracking',
    runnerSetup: `def letter_combinations_run(digits):
    result = letter_combinations(digits)
    return sorted(result) if result else []`,
    testCases: [
      { label: '"23"', args: ['23'], expected: ['ad','ae','af','bd','be','bf','cd','ce','cf'] },
      { label: 'empty', args: [''], expected: [] },
    ],
  },
  {
    id: 'n-queens',
    title: 'N-Queens',
    difficulty: 'hard',
    description: `<p>The N-queens puzzle is the problem of placing <code>n</code> queens on an <code>n x n</code> chessboard such that no two queens attack each other. Given an integer <code>n</code>, return all distinct solutions to the N-queens puzzle. Each solution contains a distinct board configuration where <code>'Q'</code> indicates a queen and <code>'.'</code> indicates an empty space.</p>`,
    examples: [
      { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
      { input: 'n = 1', output: '[["Q"]]' },
    ],
    constraints: ['1 <= n <= 9'],
    starterCode: `def solve_n_queens(n):
    pass`,
    functionName: 'solve_n_queens_run',
    conceptId: 'backtracking',
    runnerSetup: `def solve_n_queens_run(n):
    return sorted(solve_n_queens(n))`,
    testCases: [
      { label: 'n=4', args: [4], expected: [['..Q.','Q...','...Q','.Q..'],['.Q..','...Q','Q...','..Q.']] },
      { label: 'n=1', args: [1], expected: [['Q']] },
    ],
  },

  // ── Graphs (classic) ─────────────────────────────────────────────────────
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'medium',
    description: `<p>Given an <code>m x n</code> 2D binary grid <code>grid</code> which represents a map of <code>'1'</code>s (land) and <code>'0'</code>s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.</p>`,
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' },
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is "0" or "1"'],
    starterCode: `def num_islands(grid):
    pass`,
    functionName: 'num_islands',
    conceptId: 'graphs',
    testCases: [
      { label: '1 island', args: [[['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]], expected: 1 },
      { label: '3 islands', args: [[['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]], expected: 3 },
    ],
  },
  {
    id: 'max-area-of-island',
    title: 'Max Area of Island',
    difficulty: 'medium',
    description: `<p>You are given an <code>m x n</code> binary matrix <code>grid</code>. An island is a group of <code>1</code>s connected 4-directionally. The area of an island is the number of cells with value <code>1</code>. Return the maximum area of an island in grid, or 0 if there is no island.</p>`,
    examples: [
      { input: 'grid = [[0,0,1,0,0],[0,0,0,0,0],[0,1,1,0,1],[0,1,0,0,1],[0,1,0,0,1]]', output: '4' },
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 50', 'grid[i][j] is 0 or 1'],
    starterCode: `def max_area_of_island(grid):
    pass`,
    functionName: 'max_area_of_island',
    conceptId: 'graphs',
    testCases: [
      { label: 'max=4', args: [[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]], expected: 6 },
      { label: 'no island', args: [[[0,0,0,0,0,0,0,0]]], expected: 0 },
    ],
  },
  {
    id: 'clone-graph',
    title: 'Clone Graph',
    difficulty: 'medium',
    description: `<p>Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node has a value and a list of neighbors.</p><p>The graph is represented as an adjacency list. For testing, the graph is given as a list of adjacency lists: <code>adjList[i]</code> is the list of neighbor values for node <code>i+1</code>. Return the adjacency list of the cloned graph.</p>`,
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' },
    ],
    constraints: ['The number of nodes is in [0, 100]', '1 <= Node.val <= 100', 'Node.val is unique for each node', 'There are no repeated edges or self-loops'],
    starterCode: `class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def clone_graph(node):
    pass`,
    functionName: 'clone_graph_run',
    conceptId: 'graphs',
    runnerSetup: `def clone_graph_run(adj):
    if not adj: return []
    nodes = [Node(i+1) for i in range(len(adj))]
    for i, nbrs in enumerate(adj):
        nodes[i].neighbors = [nodes[v-1] for v in nbrs]
    cloned = clone_graph(nodes[0])
    if not cloned: return []
    visited = {}
    def bfs(n):
        if n.val in visited: return
        visited[n.val] = n
        for nb in n.neighbors: bfs(nb)
    bfs(cloned)
    result = [[] for _ in range(len(adj))]
    for v, n in visited.items(): result[v-1] = sorted([nb.val for nb in n.neighbors])
    return result`,
    testCases: [
      { label: '4-cycle', args: [[[2,4],[1,3],[2,4],[1,3]]], expected: [[2,4],[1,3],[2,4],[1,3]] },
      { label: 'single', args: [[[]]], expected: [[]] },
    ],
  },
  {
    id: 'pacific-atlantic-water-flow',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'medium',
    description: `<p>There is an <code>m x n</code> rectangular island that borders both the Pacific and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the right and bottom edges. Water can flow to a neighboring cell if that cell has height less than or equal to the current cell. Return a list of grid coordinates where water can flow to both the Pacific and Atlantic oceans.</p>`,
    examples: [
      { input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]' },
    ],
    constraints: ['m == heights.length', 'n == heights[r].length', '1 <= m, n <= 200', '0 <= heights[r][c] <= 10^5'],
    starterCode: `def pacific_atlantic(heights):
    pass`,
    functionName: 'pacific_atlantic_run',
    conceptId: 'graphs',
    runnerSetup: `def pacific_atlantic_run(heights):
    result = pacific_atlantic(heights)
    return sorted([sorted(c) for c in result])`,
    testCases: [
      { label: '5x5', args: [[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]], expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]] },
    ],
  },
  {
    id: 'surrounded-regions',
    title: 'Surrounded Regions',
    difficulty: 'medium',
    description: `<p>Given an <code>m x n</code> matrix <code>board</code> containing <code>'X'</code> and <code>'O'</code>, capture all regions that are 4-directionally surrounded by <code>'X'</code>. A region is captured by flipping all <code>'O'</code>s into <code>'X'</code>s in that surrounded region. Regions on the border are never captured. Return the modified board.</p>`,
    examples: [
      { input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]', output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]' },
    ],
    constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 200', 'board[i][j] is "X" or "O"'],
    starterCode: `def solve(board):
    pass`,
    functionName: 'solve_run',
    conceptId: 'graphs',
    runnerSetup: `def solve_run(board):
    import copy
    b = copy.deepcopy(board)
    solve(b)
    return b`,
    testCases: [
      { label: 'classic', args: [[['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]], expected: [['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']] },
    ],
  },
  {
    id: 'rotting-oranges',
    title: 'Rotting Oranges',
    difficulty: 'medium',
    description: `<p>You are given an <code>m x n</code> grid where each cell can be: <code>0</code> (empty), <code>1</code> (fresh orange), or <code>2</code> (rotten orange). Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If it is impossible, return <code>-1</code>.</p>`,
    examples: [
      { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4' },
      { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1' },
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 10', 'grid[i][j] is 0, 1, or 2'],
    starterCode: `def oranges_rotting(grid):
    pass`,
    functionName: 'oranges_rotting',
    conceptId: 'graphs',
    testCases: [
      { label: '4 minutes', args: [[[2,1,1],[1,1,0],[0,1,1]]], expected: 4 },
      { label: 'impossible', args: [[[2,1,1],[0,1,1],[1,0,1]]], expected: -1 },
      { label: 'all rotten', args: [[[0,2]]], expected: 0 },
    ],
  },
  {
    id: 'walls-and-gates',
    title: 'Walls and Gates',
    difficulty: 'medium',
    description: `<p>You are given an <code>m x n</code> grid <code>rooms</code> initialized with: <code>-1</code> (wall or obstacle), <code>0</code> (gate), <code>INF</code> = 2147483647 (empty room). Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, leave it as INF. Return the modified grid.</p>`,
    examples: [
      { input: 'rooms = [[INF,-1,0,INF],[INF,INF,INF,-1],[INF,-1,INF,-1],[0,-1,INF,INF]]', output: '[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]' },
    ],
    constraints: ['m == rooms.length', 'n == rooms[i].length', '1 <= m, n <= 250'],
    starterCode: `def walls_and_gates(rooms):
    pass`,
    functionName: 'walls_and_gates_run',
    conceptId: 'graphs',
    runnerSetup: `def walls_and_gates_run(rooms):
    import copy
    r = copy.deepcopy(rooms)
    walls_and_gates(r)
    return r`,
    testCases: [
      { label: '4x4', args: [[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]], expected: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]] },
    ],
  },
  {
    id: 'course-schedule-ii',
    title: 'Course Schedule II',
    difficulty: 'medium',
    description: `<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [ai, bi]</code> indicates that you must take course <code>bi</code> first to take course <code>ai</code>. Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible, return an empty array.</p>`,
    examples: [
      { input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]', output: '[0,2,1,3] or [0,1,2,3]' },
      { input: 'numCourses = 1, prerequisites = []', output: '[0]' },
    ],
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= numCourses * (numCourses - 1)'],
    starterCode: `def find_order(num_courses, prerequisites):
    pass`,
    functionName: 'find_order_run',
    conceptId: 'graphs',
    runnerSetup: `def find_order_run(num_courses, prerequisites):
    order = find_order(num_courses, prerequisites)
    if not order: return []
    pos = {v: i for i, v in enumerate(order)}
    for a, b in prerequisites:
        if pos.get(a, -1) < pos.get(b, -1): return []
    return list(range(num_courses)) if len(order) == num_courses else []`,
    testCases: [
      { label: '4 courses', args: [4, [[1,0],[2,0],[3,1],[3,2]]], expected: [0,1,2,3] },
      { label: 'single', args: [1, []], expected: [0] },
    ],
  },
  {
    id: 'redundant-connection',
    title: 'Redundant Connection',
    difficulty: 'medium',
    description: `<p>In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with <code>n</code> nodes labeled 1 to n, with one additional edge added. Return an edge that can be removed so that the resulting graph is a tree. If there are multiple answers, return the answer that occurs last in the input.</p>`,
    examples: [
      { input: 'edges = [[1,2],[1,3],[2,3]]', output: '[2,3]' },
      { input: 'edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]', output: '[1,4]' },
    ],
    constraints: ['n == edges.length', '3 <= n <= 1000', 'edges[i].length == 2', 'No repeated edges'],
    starterCode: `def find_redundant_connection(edges):
    pass`,
    functionName: 'find_redundant_connection',
    conceptId: 'graphs',
    testCases: [
      { label: 'triangle', args: [[[1,2],[1,3],[2,3]]], expected: [2,3] },
      { label: 'longer cycle', args: [[[1,2],[2,3],[3,4],[1,4],[1,5]]], expected: [1,4] },
    ],
  },
  {
    id: 'number-of-connected-components',
    title: 'Number of Connected Components',
    difficulty: 'medium',
    description: `<p>You have a graph of <code>n</code> nodes labeled from <code>0</code> to <code>n - 1</code>. You are given an integer <code>n</code> and a list of edges where <code>edges[i] = [ai, bi]</code> indicates there is an edge between nodes <code>ai</code> and <code>bi</code> in the undirected graph. Return the number of connected components in the graph.</p>`,
    examples: [
      { input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', output: '2' },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]', output: '1' },
    ],
    constraints: ['1 <= n <= 2000', '1 <= edges.length <= 5000', 'No repeated edges'],
    starterCode: `def count_components(n, edges):
    pass`,
    functionName: 'count_components',
    conceptId: 'graphs',
    testCases: [
      { label: '2 components', args: [5, [[0,1],[1,2],[3,4]]], expected: 2 },
      { label: '1 component', args: [5, [[0,1],[1,2],[2,3],[3,4]]], expected: 1 },
    ],
  },
  {
    id: 'graph-valid-tree',
    title: 'Graph Valid Tree',
    difficulty: 'medium',
    description: `<p>You have a graph of <code>n</code> nodes labeled from <code>0</code> to <code>n - 1</code>. You are given an integer <code>n</code> and a list of undirected edges. Check if the edges make up a valid tree. A valid tree has exactly <code>n-1</code> edges and is fully connected with no cycles.</p>`,
    examples: [
      { input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', output: 'true' },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', output: 'false' },
    ],
    constraints: ['1 <= n <= 2000', '0 <= edges.length <= 5000', 'No self-loops or repeated edges'],
    starterCode: `def valid_tree(n, edges):
    pass`,
    functionName: 'valid_tree',
    conceptId: 'graphs',
    testCases: [
      { label: 'valid tree', args: [5, [[0,1],[0,2],[0,3],[1,4]]], expected: true },
      { label: 'has cycle', args: [5, [[0,1],[1,2],[2,3],[1,3],[1,4]]], expected: false },
    ],
  },
  {
    id: 'word-ladder',
    title: 'Word Ladder',
    difficulty: 'hard',
    description: `<p>A transformation sequence from word <code>beginWord</code> to word <code>endWord</code> using a dictionary <code>wordList</code> is a sequence such that every adjacent pair of words differs by exactly one letter and every word is in the dictionary. Return the number of words in the shortest transformation sequence, or 0 if no such sequence exists.</p>`,
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5' },
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', output: '0' },
    ],
    constraints: ['1 <= beginWord.length <= 10', 'endWord.length == beginWord.length', '1 <= wordList.length <= 5000', 'All words have the same length'],
    starterCode: `def ladder_length(begin_word, end_word, word_list):
    pass`,
    functionName: 'ladder_length',
    conceptId: 'graphs',
    testCases: [
      { label: 'hit→cog', args: ['hit', 'cog', ['hot','dot','dog','lot','log','cog']], expected: 5 },
      { label: 'no path', args: ['hit', 'cog', ['hot','dot','dog','lot','log']], expected: 0 },
    ],
  },

  // ── 1D DP (classic) ───────────────────────────────────────────────────────
  {
    id: 'min-cost-climbing-stairs',
    title: 'Min Cost Climbing Stairs',
    difficulty: 'easy',
    description: `<p>You are given an integer array <code>cost</code> where <code>cost[i]</code> is the cost of the <code>i</code>th step on a staircase. Once you pay the cost, you can climb one or two steps. You can start from index 0 or 1. Return the minimum cost to reach the top of the floor.</p>`,
    examples: [
      { input: 'cost = [10,15,20]', output: '15' },
      { input: 'cost = [1,100,1,1,1,100,1,1,100,1]', output: '6' },
    ],
    constraints: ['2 <= cost.length <= 1000', '0 <= cost[i] <= 999'],
    starterCode: `def min_cost_climbing_stairs(cost):
    pass`,
    functionName: 'min_cost_climbing_stairs',
    conceptId: 'dp-1d',
    testCases: [
      { label: '[10,15,20]', args: [[10,15,20]], expected: 15 },
      { label: 'longer', args: [[1,100,1,1,1,100,1,1,100,1]], expected: 6 },
    ],
  },
  {
    id: 'house-robber',
    title: 'House Robber',
    difficulty: 'medium',
    description: `<p>You are a professional robber planning to rob houses along a street. Each house has a certain amount of money. Adjacent houses have security systems — if two adjacent houses are robbed the police will be alerted. Given an integer array <code>nums</code> representing the amount of money in each house, return the maximum amount you can rob tonight without alerting the police.</p>`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4 (rob houses 1 and 3)' },
      { input: 'nums = [2,7,9,3,1]', output: '12 (rob houses 1, 3, and 5)' },
    ],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
    starterCode: `def rob(nums):
    pass`,
    functionName: 'rob',
    conceptId: 'dp-1d',
    testCases: [
      { label: '[1,2,3,1]', args: [[1,2,3,1]], expected: 4 },
      { label: '[2,7,9,3,1]', args: [[2,7,9,3,1]], expected: 12 },
    ],
  },
  {
    id: 'house-robber-ii',
    title: 'House Robber II',
    difficulty: 'medium',
    description: `<p>You are a professional robber planning to rob houses arranged in a circle. The first and last houses are adjacent. Given an integer array <code>nums</code> representing the amount of money in each house, return the maximum amount you can rob tonight without alerting the police.</p>`,
    examples: [
      { input: 'nums = [2,3,2]', output: '3' },
      { input: 'nums = [1,2,3,1]', output: '4' },
    ],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 1000'],
    starterCode: `def rob(nums):
    pass`,
    functionName: 'rob',
    conceptId: 'dp-1d',
    testCases: [
      { label: '[2,3,2]', args: [[2,3,2]], expected: 3 },
      { label: '[1,2,3,1]', args: [[1,2,3,1]], expected: 4 },
    ],
  },
  {
    id: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    difficulty: 'medium',
    description: `<p>Given a string <code>s</code>, return the longest palindromic substring in <code>s</code>.</p>`,
    examples: [
      { input: 's = "babad"', output: '"bab" (or "aba")' },
      { input: 's = "cbbd"', output: '"bb"' },
    ],
    constraints: ['1 <= s.length <= 1000', 's consists of only digits and English letters'],
    starterCode: `def longest_palindrome(s):
    pass`,
    functionName: 'longest_palindrome_run',
    conceptId: 'dp-1d',
    runnerSetup: `def _is_palindrome(s): return s == s[::-1]
def _max_pal_len(s):
    best = 0
    for i in range(len(s)):
        for j in range(i, len(s)):
            if _is_palindrome(s[i:j+1]): best = max(best, j-i+1)
    return best
def longest_palindrome_run(s):
    result = longest_palindrome(s)
    return isinstance(result, str) and _is_palindrome(result) and result in s and len(result) == _max_pal_len(s)`,
    testCases: [
      { label: '"cbbd"', args: ['cbbd'], expected: true },
      { label: '"a"', args: ['a'], expected: true },
      { label: '"racecar"', args: ['racecar'], expected: true },
      { label: '"babad"', args: ['babad'], expected: true },
    ],
  },
  {
    id: 'palindromic-substrings',
    title: 'Palindromic Substrings',
    difficulty: 'medium',
    description: `<p>Given a string <code>s</code>, return the number of palindromic substrings in it. A string is a palindrome when it reads the same backward as forward. A substring is a contiguous sequence of characters within the string.</p>`,
    examples: [
      { input: 's = "abc"', output: '3 (a, b, c)' },
      { input: 's = "aaa"', output: '6 (a, a, a, aa, aa, aaa)' },
    ],
    constraints: ['1 <= s.length <= 1000', 's consists of lowercase English letters'],
    starterCode: `def count_substrings(s):
    pass`,
    functionName: 'count_substrings',
    conceptId: 'dp-1d',
    testCases: [
      { label: '"abc"', args: ['abc'], expected: 3 },
      { label: '"aaa"', args: ['aaa'], expected: 6 },
    ],
  },
  {
    id: 'decode-ways',
    title: 'Decode Ways',
    difficulty: 'medium',
    description: `<p>A message containing letters from A–Z can be encoded into numbers using the mapping <code>A=1, B=2, ..., Z=26</code>. Given a string <code>s</code> containing only digits, return the number of ways to decode it. If the entire string cannot be decoded in any valid way, return 0.</p>`,
    examples: [
      { input: 's = "12"', output: '2 ("AB" or "L")' },
      { input: 's = "226"', output: '3 ("BZ","VF","BBF")' },
      { input: 's = "06"', output: '0' },
    ],
    constraints: ['1 <= s.length <= 100', 's contains only digits and may contain leading zeros'],
    starterCode: `def num_decodings(s):
    pass`,
    functionName: 'num_decodings',
    conceptId: 'dp-1d',
    testCases: [
      { label: '"12"', args: ['12'], expected: 2 },
      { label: '"226"', args: ['226'], expected: 3 },
      { label: '"06"', args: ['06'], expected: 0 },
    ],
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    difficulty: 'medium',
    description: `<p>You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount cannot be made up by any combination of the coins, return <code>-1</code>.</p>`,
    examples: [
      { input: 'coins = [1,5,11], amount = 15', output: '3 (5+5+5)' },
      { input: 'coins = [2], amount = 3', output: '-1' },
    ],
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    starterCode: `def coin_change(coins, amount):
    pass`,
    functionName: 'coin_change',
    conceptId: 'dp-1d',
    testCases: [
      { label: 'amount=15', args: [[1,5,11], 15], expected: 3 },
      { label: 'impossible', args: [[2], 3], expected: -1 },
      { label: 'amount=0', args: [[1], 0], expected: 0 },
    ],
  },
  {
    id: 'maximum-product-subarray',
    title: 'Maximum Product Subarray',
    difficulty: 'medium',
    description: `<p>Given an integer array <code>nums</code>, find a subarray that has the largest product, and return the product.</p>`,
    examples: [
      { input: 'nums = [2,3,-2,4]', output: '6 (subarray [2,3])' },
      { input: 'nums = [-2,0,-1]', output: '0' },
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-10 <= nums[i] <= 10', 'The product of any subarray fits in a 32-bit integer'],
    starterCode: `def max_product(nums):
    pass`,
    functionName: 'max_product',
    conceptId: 'dp-1d',
    testCases: [
      { label: '[2,3,-2,4]', args: [[2,3,-2,4]], expected: 6 },
      { label: '[-2,0,-1]', args: [[-2,0,-1]], expected: 0 },
    ],
  },
  {
    id: 'word-break',
    title: 'Word Break',
    difficulty: 'medium',
    description: `<p>Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.</p>`,
    examples: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true' },
      { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: 'true' },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: 'false' },
    ],
    constraints: ['1 <= s.length <= 300', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 20'],
    starterCode: `def word_break(s, word_dict):
    pass`,
    functionName: 'word_break',
    conceptId: 'dp-1d',
    testCases: [
      { label: 'leetcode', args: ['leetcode', ['leet','code']], expected: true },
      { label: 'applepenapple', args: ['applepenapple', ['apple','pen']], expected: true },
      { label: 'catsandog', args: ['catsandog', ['cats','dog','sand','and','cat']], expected: false },
    ],
  },
  {
    id: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    difficulty: 'medium',
    description: `<p>Given an integer array <code>nums</code>, return the length of the longest strictly increasing subsequence.</p>`,
    examples: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4 ([2,3,7,101])' },
      { input: 'nums = [0,1,0,3,2,3]', output: '4' },
    ],
    constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
    starterCode: `def length_of_lis(nums):
    pass`,
    functionName: 'length_of_lis',
    conceptId: 'dp-1d',
    testCases: [
      { label: '[10,9,2,5,3,7,101,18]', args: [[10,9,2,5,3,7,101,18]], expected: 4 },
      { label: '[0,1,0,3,2,3]', args: [[0,1,0,3,2,3]], expected: 4 },
      { label: '[7,7,7,7]', args: [[7,7,7,7]], expected: 1 },
    ],
  },

]

export function problemForConcept(conceptId: string): Problem | undefined {
  return PROBLEMS.find(p => p.conceptId === conceptId)
}
