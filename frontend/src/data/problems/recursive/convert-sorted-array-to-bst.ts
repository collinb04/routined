export default {
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
  bruteHint: 'Describe what happens to tree height if you insert elements in their given order one at a time, or always pick an endpoint as root',
  optimizeHint: 'Name the divide-and-conquer root choice at each step that keeps the two resulting subtrees as close to equal size as possible',
  clues: [
    {
      id: 'sorted-input-bst-property',
      question: '"nums is sorted in ascending order." How does a sorted array relate to BST inorder traversal?',
      options: [
        { label: 'A sorted array maps directly to a BST level-order traversal', isCorrect: false, feedback: 'Level-order (BFS) visits nodes top-down by depth, not in sorted order. Inorder traversal of a BST produces the sorted sequence — that is the relationship being exploited here.' },
        { label: 'A sorted array is the inorder traversal of the target BST', isCorrect: true },
        { label: 'Sorted input means you can skip the BST property checks', isCorrect: false, feedback: 'The sorted input is what lets you construct the BST efficiently — it is not a reason to skip correctness. The BST property must hold in the output.' },
        { label: 'Sorted order implies the tree must be a min-heap', isCorrect: false, feedback: 'Heaps and BSTs are different structures. A BST maintains inorder sorted order; a heap maintains parent-child ordering. Sorted input targets a BST, not a heap.' },
      ],
      correctFeedback: 'Inorder traversal of a BST always yields values in ascending order. Working backward: a sorted array is the inorder sequence, so you can reconstruct the BST by assigning each element to the correct position.',
      wrongFeedback: [
        'Which BST traversal produces values in sorted (ascending) order? And if that traversal of the target tree gives nums, what does that tell you about how to pick roots?',
        'Inorder is left → root → right. If nums is the inorder output, what value should be the root, and which part of nums goes left versus right?',
      ],
    },
    {
      id: 'height-balanced-constraint',
      question: '"Height-balanced" means no subtree differs in height by more than one. What root choice ensures balance?',
      options: [
        { label: 'Always pick nums[0] (the smallest) as root', isCorrect: false, feedback: 'Picking the smallest as root puts all elements in the right subtree and none in the left — creating a maximally skewed, unbalanced tree of height n.' },
        { label: 'Pick the middle element as root at each level', isCorrect: true },
        { label: 'Pick a random element as root', isCorrect: false, feedback: 'A random root can create arbitrarily unbalanced trees. To guarantee height balance, you need the choice that splits the remaining elements as evenly as possible — the middle.' },
        { label: 'Pick the median value of nums', isCorrect: false, feedback: 'For a sorted array, the median value is the middle element by index — so this is essentially correct, but framing it as "middle index" is more precise, especially for arrays of even length where the median may not be an element.' },
      ],
      correctFeedback: 'The middle element of any subarray splits it into two halves of equal (or off-by-one) length, giving left and right subtrees of equal height. This is exactly the condition for height balance.',
      wrongFeedback: [
        'If you pick the middle element as root, how many elements go to the left subtree versus the right subtree?',
        'For n elements, picking index n//2 as root leaves n//2 elements on the left and n - n//2 - 1 on the right. These differ by at most 1 — guaranteeing height balance.',
      ],
    },
    {
      id: 'multiple-valid-answers',
      question: '"Multiple valid answers exist." What does that mean for how you handle even-length subarrays?',
      options: [
        { label: 'You must find the unique correct answer', isCorrect: false, feedback: 'There is no unique correct answer — the problem explicitly states that multiple valid trees exist. Any height-balanced BST that represents the sorted array is acceptable.' },
        { label: 'Either middle index works for even-length subarrays', isCorrect: true },
        { label: 'You must return all valid trees', isCorrect: false, feedback: 'The problem asks for one valid tree, not all of them. "Multiple valid answers exist" is permission to make a consistent choice, not a request to enumerate alternatives.' },
        { label: 'Use randomization to pick one valid answer', isCorrect: false, feedback: 'Randomization adds complexity without benefit. A consistent rule — always pick the left-middle or always the right-middle — produces a deterministic valid answer.' },
      ],
      correctFeedback: 'For an even-length subarray, both mid = (lo + hi) // 2 and mid = (lo + hi + 1) // 2 produce valid height-balanced trees. Pick one consistently.',
      wrongFeedback: [
        'For a subarray of length 4, indices 0–3, what are the two candidate midpoints? Do both produce height-balanced trees?',
        'Both mid = lo + (hi-lo)//2 and mid = lo + (hi-lo+1)//2 split 4 elements into groups of size 2 and 1 (or 1 and 2). Both result in valid balanced trees.',
      ],
    },
    {
      id: 'recursion-structure',
      question: 'With up to 10⁴ elements, what is the time complexity of the divide-and-conquer approach?',
      options: [
        { label: 'O(n log n) — similar to merge sort', isCorrect: false, feedback: 'This construction does O(1) work per node (pick midpoint, create node) and visits each node exactly once. That is O(n), not O(n log n). There is no merge step that costs O(n) per level.' },
        { label: 'O(n) — each element becomes exactly one node', isCorrect: true },
        { label: 'O(log n) — only the root-to-leaf path matters', isCorrect: false, feedback: 'Every element in nums must become a node in the BST. You cannot skip any elements, so the work is at minimum proportional to n.' },
        { label: 'O(n²) — finding the midpoint at each level revisits elements', isCorrect: false, feedback: 'Midpoint calculation is O(1) with index arithmetic. You do not scan the subarray to find the middle — you compute it directly. Total work is O(1) per node × n nodes = O(n).' },
      ],
      correctFeedback: 'Each of the n elements is visited exactly once: one recursive call creates one node. With O(1) work per call, total complexity is O(n) — efficient for 10,000 elements.',
      wrongFeedback: [
        'At each recursive call you create one node. How many calls are there in total across the recursion tree?',
        'Every element in nums becomes exactly one TreeNode. If there are n elements, there are n recursive calls, each doing O(1) work. Total: O(n).',
      ],
    },
  ],
}
