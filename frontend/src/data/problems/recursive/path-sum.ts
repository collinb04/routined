export default {
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
  bruteHint: 'Describe generating every root-to-leaf path first, then checking afterward whether any of them sum to the target',
  optimizeHint: 'Name the technique of tracking the running sum during a single DFS descent, without ever storing the full paths',
  clues: [
    {
      id: 'output-type',
      question: 'The output is a boolean — true or false. What does this tell you about how to structure your search?',
      options: [
        { label: 'Return as soon as you find a valid path', isCorrect: true },
        { label: 'Collect all root-to-leaf paths first', isCorrect: false, feedback: 'Collecting all paths and then checking sums does more work than needed. A boolean result means you can stop the moment you find one valid path.' },
        { label: 'Count how many paths match', isCorrect: false, feedback: 'The output is true/false, not a count. Counting paths does unnecessary work — you only need to know if one exists.' },
        { label: 'Track the path with the maximum sum', isCorrect: false, feedback: 'Maximum sum is a different problem. Here you only need to check if any path matches a specific target.' },
      ],
      correctFeedback: 'A boolean output means early exit is valid — the moment you reach a leaf that satisfies the sum, you can return true without exploring the rest of the tree.',
      wrongFeedback: [
        'The problem asks whether a path exists, not which path or how many. What does that let you skip?',
        'When the answer is true/false, the first successful path ends the search. What traversal strategy makes this easy?',
      ],
    },
    {
      id: 'leaf-definition',
      question: 'The path must end at a leaf. What defines a leaf node?',
      options: [
        { label: 'Any node that has been visited', isCorrect: false },
        { label: 'A node whose value equals the remaining sum', isCorrect: false, feedback: 'A node\'s value matching the remainder is the success condition, not the definition of a leaf. A leaf is structural — it has no children.' },
        { label: 'A node with no left or right child', isCorrect: true },
        { label: 'The deepest node in the tree', isCorrect: false, feedback: 'A tree can have leaves at many different depths — they\'re not all at the same level. A leaf is any node with no children, regardless of depth.' },
      ],
      correctFeedback: 'A leaf has no children — both left and right are null. You must check this explicitly, or paths will be counted as complete at internal nodes with only one child.',
      wrongFeedback: [
        'The path must end at a leaf specifically, not just any node. What structural property makes a node a leaf?',
        'Think about children: a leaf is a node that cannot continue further down the tree.',
      ],
    },
    {
      id: 'negative-values',
      question: 'Node values can be negative (-1000 ≤ Node.val ≤ 1000). What pruning strategy does this rule out?',
      options: [
        { label: 'Stopping when remaining sum goes negative', isCorrect: true },
        { label: 'Using recursion to track the path', isCorrect: false },
        { label: 'Checking the leaf condition', isCorrect: false },
        { label: 'Subtracting node values from targetSum', isCorrect: false, feedback: 'Subtracting from the target as you descend is a valid and common approach here. Negative values don\'t break subtraction — they just mean you can\'t prune early when the remainder goes negative.' },
      ],
      correctFeedback: 'With negative node values, a path sum can dip below zero and then recover. You cannot prune a branch just because the remaining sum is negative — the sum might still reach the target deeper in the tree.',
      wrongFeedback: [
        'Negative values mean a path sum can decrease and then increase again. Which early-exit optimization breaks under that assumption?',
        'Think about pruning: if you stop exploring a branch when the remaining sum drops below zero, what valid paths might you miss?',
      ],
    },
    {
      id: 'empty-tree-guarantee',
      question: 'The tree can have 0 nodes. What does this edge case require?',
      options: [
        { label: 'Return false immediately when root is null', isCorrect: false },
        { label: 'Handle null root as a base case returning false', isCorrect: true },
        { label: 'Return true for an empty tree if targetSum is 0', isCorrect: false, feedback: 'An empty tree has no root-to-leaf path at all, so the answer is always false regardless of targetSum. There is no path, so no sum can match.' },
        { label: 'Skip the null check if targetSum > 0', isCorrect: false, feedback: 'The null check is always necessary when the tree can be empty. Skipping it would crash on the empty-tree test case.' },
      ],
      correctFeedback: 'A null root means there are no paths — the function must return false. This is the natural recursive base case and also handles the empty-tree input.',
      wrongFeedback: [
        'An empty tree has no root-to-leaf paths. What should the function return in that case?',
        'The base case for recursion and the empty-tree edge case are the same here. What value is correct when root is null?',
      ],
    },
  ],
}
