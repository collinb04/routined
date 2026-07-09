export default {
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
  bruteHint: 'Describe trying every possible binary tree grouping of the leaves recursively and why that blows up',
  optimizeHint: 'Name the kind of stack that lets you greedily merge the smallest adjacent leaves first',
  clues: [
    {
      id: 'constraint-size',
      question: 'arr.length ≤ 40 and arr[i] ≤ 15. What does this small constraint allow?',
      options: [
        { label: 'O(n³) dynamic programming is feasible', isCorrect: true },
        { label: 'Only O(n) solutions are fast enough', isCorrect: false, feedback: 'With n ≤ 40, even O(n³) is just 64,000 operations. O(n) would be impressive but is not required — the constraint is permissive enough for cubic DP.' },
        { label: 'Brute-force over all possible binary trees', isCorrect: false, feedback: 'The number of distinct binary trees with n leaves is the (n−1)th Catalan number — exponential. Even at n = 40 that is astronomically large. The constraint allows polynomial DP, not pure brute force.' },
        { label: 'You can sort the leaves to minimize cost', isCorrect: false, feedback: 'The order of leaves is fixed — it encodes the tree structure (left-to-right in-order traversal). Sorting would change which trees are valid.' },
      ],
      correctFeedback: 'n ≤ 40 means O(n³) interval DP runs in under 100,000 operations. This is the signal that a cubic algorithm is fine — no need to optimize further.',
      wrongFeedback: [
        'At n = 40, O(n³) is 64,000. O(n!) is effectively infinite. What class of algorithm fits within the constraint?',
        'Interval DP over subarrays of leaves is O(n³). At n = 40, is that feasible?',
      ],
    },
    {
      id: 'leaf-order-fixed',
      question: 'The leaf array defines the in-order traversal of the tree. What does "fixed order" mean for how you can split the problem?',
      options: [
        { label: 'Split the array at any index into left and right subtrees', isCorrect: true },
        { label: 'Only split at the position of the maximum element', isCorrect: false, feedback: 'You can split at any index — the maximum-element split is one heuristic that minimizes cost for certain cases, but the general solution considers all possible splits.' },
        { label: 'The split point does not matter since you pick the best product', isCorrect: false, feedback: 'The split point determines which leaves fall in the left vs. right subtree. Different splits produce different maximum-leaf products at each internal node, changing the total cost.' },
        { label: 'Sort the array first to find the optimal split', isCorrect: false, feedback: 'Sorting changes the leaf order and invalidates the tree structure. The in-order constraint means leaves must stay in their original positions.' },
      ],
      correctFeedback: 'For any subarray arr[i..j], you can split at any k in [i, j−1]. The cost at this node is max(arr[i..k]) × max(arr[k+1..j]), plus the recursive costs of each half.',
      wrongFeedback: [
        'A subarray of leaves corresponds to a subtree. Where can you place the root of that subtree — i.e., where can you split the subarray?',
        'If dp[i][j] is the minimum cost for leaves i through j, what values of k define valid splits, and what is the cost at the split point?',
      ],
    },
    {
      id: 'non-leaf-cost',
      question: 'Each non-leaf node costs max(left subtree leaves) × max(right subtree leaves). What does this mean for large leaf values?',
      options: [
        { label: 'Large leaves should be paired together to reduce cost', isCorrect: false, feedback: 'Pairing two large leaves forces their product to appear as a non-leaf cost. You want large leaves to be "used" as few times as possible — pair them with small neighbors instead.' },
        { label: 'Large leaves should be paired with their smallest adjacent neighbor', isCorrect: true },
        { label: 'The global maximum leaf always becomes the root', isCorrect: false, feedback: 'The global maximum contributes to every internal node above its split. You want it to be consumed early — paired with its smallest adjacent element — not hoisted to the root where it multiplies many times.' },
        { label: 'All leaves contribute equally to the total cost', isCorrect: false, feedback: 'Larger leaves dominate the products at internal nodes. A leaf of value 15 paired with anything costs at least 15 per node it participates in. Smaller leaves are cheaper to combine.' },
      ],
      correctFeedback: 'A large leaf value multiplies whatever it is paired with. To minimize total cost, consume large leaves by pairing them with their smallest adjacent neighbor — the monotonic stack greedy does this in O(n).',
      wrongFeedback: [
        'Think about the leaf with value 15 in a length-3 array [15, 1, 2]. Which split produces a smaller non-leaf cost: (15,1) first or (1,2) first?',
        'Every time a large leaf is the max of a subtree, it multiplies the other subtree\'s max. How do you minimize how many times it appears in a product?',
      ],
    },
    {
      id: 'monotonic-stack-signal',
      question: 'The problem asks you to greedily eliminate the smallest leaves first. What data structure supports this efficiently?',
      options: [
        { label: 'A min-heap to always remove the smallest leaf', isCorrect: false, feedback: 'A min-heap finds the global minimum, but you need the smallest element adjacent to its neighbors — a local comparison. The heap does not preserve adjacency information.' },
        { label: 'A monotonic stack that maintains decreasing order', isCorrect: true },
        { label: 'A sorted array of (value, index) pairs', isCorrect: false, feedback: 'Sorting loses adjacency. When you eliminate a leaf, its neighbors become adjacent to each other — a static sorted array cannot model that dynamic relationship.' },
        { label: 'A prefix maximum array', isCorrect: false, feedback: 'Prefix maximums are useful for range-max queries but do not model which elements are currently adjacent. As leaves are consumed, adjacency changes.' },
      ],
      correctFeedback: 'A monotonic decreasing stack keeps track of unprocessed leaves in order. When a new element is larger than the stack top, the top is the local minimum — pair it with the smaller of its two neighbors and pop it.',
      wrongFeedback: [
        'You want to find each leaf\'s nearest larger neighbor on each side. What stack property gives you "the most recent unprocessed element that is larger"?',
        'A monotonic decreasing stack pops whenever a larger element arrives. The popped element is a local minimum. How do you use its two neighbors to compute its elimination cost?',
      ],
    },
  ],
}
