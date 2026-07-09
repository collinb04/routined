export default {
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
  bruteHint: 'Describe generating every root-to-leaf path first, then filtering afterward for the ones that sum to the target',
  optimizeHint: 'Name the technique of carrying the running sum and path forward through a single DFS, recording a match only at a leaf',
  clues: [
    {
      id: 'output-structure',
      question: 'The output is all root-to-leaf paths — a list of lists, not a count or boolean. What does that require?',
      options: [
        { label: 'Return as soon as any valid path is found', isCorrect: false, feedback: 'Early return works when you only need to confirm existence. Here the output requires collecting every valid path — you must explore the entire tree.' },
        { label: 'Collect every valid path; explore the full tree', isCorrect: true },
        { label: 'Count how many paths sum to targetSum', isCorrect: false, feedback: 'Counting would give a single integer. The output is the actual paths — lists of node values — so you must record which nodes are on each valid root-to-leaf path.' },
        { label: 'Return the single shortest valid path', isCorrect: false, feedback: 'The problem asks for all paths, not just the shortest. Multiple paths may sum to targetSum and all must appear in the output.' },
      ],
      correctFeedback: 'Because every valid path must be returned, you cannot prune after finding the first match. DFS must visit every leaf and record the current path whenever the sum equals targetSum.',
      wrongFeedback: [
        'The output is a list of lists. How many valid paths do you need to find?',
        'You need all paths, not just one. What does that mean for when you can stop the search?',
      ],
    },
    {
      id: 'path-tracking',
      question: 'To record a root-to-leaf path, you need the sequence of node values from root to the current node. How do you track this during DFS?',
      options: [
        { label: 'Store parent pointers in each node', isCorrect: false, feedback: 'Binary tree nodes don\'t have parent pointers, and adding them would require modifying the input structure. A running path list passed through recursion is simpler and doesn\'t mutate the tree.' },
        { label: 'Rebuild the path by re-traversing from root each time', isCorrect: false, feedback: 'Re-traversing to reconstruct the path at each leaf is O(n) extra work per leaf, making the overall algorithm O(n²). Pass the current path through recursion instead.' },
        { label: 'Pass a running path list through recursion; append and backtrack', isCorrect: true },
        { label: 'Use a global stack mirroring the call stack', isCorrect: false, feedback: 'A global stack would work but is less clean than passing the path explicitly. The key insight — append before recursing, pop after returning — is the backtracking pattern regardless of how you hold the path.' },
      ],
      correctFeedback: 'Append the current node\'s value before recursing into children; pop it after both recursive calls return. This maintains the invariant that the list always reflects the path from root to the current node.',
      wrongFeedback: [
        'At each node, you need to know all values on the path from the root down. How do you maintain that list as recursion goes deeper and then backtracks?',
        'The path changes as you descend into a subtree and then return. What operation undoes the append when you backtrack?',
      ],
    },
    {
      id: 'leaf-definition',
      question: 'A valid path ends at a leaf — a node with no children. Why must you check both children are None, not just one?',
      options: [
        { label: 'Nodes with one child are also leaves', isCorrect: false, feedback: 'A node with one child is not a leaf — the path continues through that child. Only nodes where both left and right are None are leaves; checking just one child would prematurely terminate paths.' },
        { label: 'A node with one child is not a leaf; the path continues', isCorrect: true },
        { label: 'The tree is guaranteed to be complete, so one check suffices', isCorrect: false, feedback: 'The constraints say nothing about a complete tree — arbitrary binary trees are valid inputs. Never assume completeness unless the problem states it.' },
        { label: 'Checking one child is enough if you track the sum correctly', isCorrect: false, feedback: 'The sum being correct is necessary but not sufficient. A node with one child might sum to targetSum, but since it\'s not a leaf the path isn\'t finished — you must still descend through the remaining child.' },
      ],
      correctFeedback: 'A leaf has both left == None and right == None. If only one child is None, the other subtree still has nodes — the path is not yet complete and you should not record it.',
      wrongFeedback: [
        'What is the definition of a leaf node in a binary tree? Does having one child qualify?',
        'If a node has a right child but no left child, is it a leaf? Should you record the path there?',
      ],
    },
    {
      id: 'negative-values',
      question: '-1000 ≤ Node.val, targetSum ≤ 1000 — node values can be negative. What does that rule out?',
      options: [
        { label: 'Pruning when the running sum exceeds targetSum', isCorrect: true },
        { label: 'Using DFS — only BFS handles negatives correctly', isCorrect: false, feedback: 'DFS handles negative values just fine. The only thing negatives rule out is sum-exceeds-target pruning, because a negative child could bring the sum back down after exceeding the target.' },
        { label: 'Tracking the running sum — use path length instead', isCorrect: false, feedback: 'You must track the running sum — that\'s what the problem is about. Path length has nothing to do with it. Negative values don\'t prevent sum tracking; they just prevent early pruning.' },
        { label: 'Returning multiple paths — at most one can sum correctly', isCorrect: false, feedback: 'Negative values don\'t limit the number of valid paths. Multiple paths can still sum to the same target, so you still need to collect all of them.' },
      ],
      correctFeedback: 'With positive-only values you could prune branches where the running sum exceeds targetSum. Negative values mean the sum can decrease at any point, so exceeding targetSum mid-path doesn\'t rule out a valid path below.',
      wrongFeedback: [
        'If all values were positive, you could stop exploring once the sum exceeds targetSum. Does that pruning still work when values can be negative?',
        'Negative node values mean the sum can go up and then come back down. What optimization does that invalidate?',
      ],
    },
  ],
}
