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
]

export function problemForConcept(conceptId: string): Problem | undefined {
  return PROBLEMS.find(p => p.conceptId === conceptId)
}
