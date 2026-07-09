export default {
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
  bruteHint: 'Describe what happens if you recurse on both jump directions without remembering which indices you\'ve already tried — why can it loop forever or redo the same work?',
  optimizeHint: 'Name the structure that records which indices have already been explored so each one is visited only once',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'arr.length ≤ 5 × 10⁴ tells you…',
      options: [
        { label: 'O(n²) is fine', isCorrect: false, feedback: 'At n = 50,000, O(n²) is 2.5 billion operations — far too slow. You need a linear-time traversal.' },
        { label: 'O(n) is the target complexity', isCorrect: true },
        { label: 'O(log n) is required', isCorrect: false, feedback: 'O(log n) would be impressive, but you can\'t even visit each index once in log n time. The constraint rules out O(n²) and worse, not everything above O(log n).' },
        { label: 'Input size doesn\'t matter here', isCorrect: false, feedback: 'Input size always matters. n = 50,000 rules out any approach that revisits indices repeatedly — you need each index visited at most once.' },
      ],
      correctFeedback: 'At n = 50,000, only O(n) (or O(n log n)) is practical. That means each index should be visited at most once — exactly what BFS or DFS with a visited set provides.',
      wrongFeedback: [
        'What happens if you revisit indices you\'ve already processed? How does that blow up at n = 50,000?',
        'You need to explore reachable indices without revisiting any. What traversal strategy visits each node exactly once?',
      ],
    },
    {
      id: 'bidirectional-jumps',
      question: 'From index i you can jump to i + arr[i] or i - arr[i]. What does having two jump directions imply?',
      options: [
        { label: 'Always jump forward; ignore backward jumps', isCorrect: false, feedback: 'Ignoring backward jumps can miss the answer entirely. The first example reaches value 0 by jumping backward from index 5 to 4 to 1 to 3. Both directions must be explored.' },
        { label: 'Model as a graph and explore all reachable nodes', isCorrect: true },
        { label: 'Sort the array to find the shortest path', isCorrect: false, feedback: 'Sorting destroys the original indices and positions — the jump destinations are calculated from index values, which would all change after sorting.' },
        { label: 'Use two pointers, one forward and one backward', isCorrect: false, feedback: 'Two pointers work on sorted arrays or specific convergence problems. The branching jump structure here is a graph traversal, not a converging pointer problem.' },
      ],
      correctFeedback: 'Each index is a node with up to two outgoing edges (i+arr[i] and i-arr[i]). BFS or DFS explores all reachable nodes — standard graph traversal.',
      wrongFeedback: [
        'Each index can lead to two other indices. What data structure processes "explore all reachable nodes from a starting point" efficiently?',
        'This is graph reachability: nodes are indices, edges are the two jump options. BFS gives you O(n) traversal with a visited set to avoid cycles.',
      ],
    },
    {
      id: 'target-condition',
      question: 'The goal is to reach any index with value 0 — not a specific index. This means…',
      options: [
        { label: 'There is always exactly one index with value 0', isCorrect: false, feedback: 'The problem doesn\'t guarantee a unique zero. Multiple indices can have value 0, and reaching any one of them satisfies the condition.' },
        { label: 'Return true as soon as any zero-value index is reached', isCorrect: true },
        { label: 'You must visit all indices to confirm the answer', isCorrect: false, feedback: 'As soon as you land on an index with value 0, you can return true immediately. There\'s no need to exhaust the entire reachable set.' },
        { label: 'Return the index of the zero, not a boolean', isCorrect: false, feedback: 'The output is a boolean — true or false. You don\'t need to track which zero-value index you reached, just whether you reached one.' },
      ],
      correctFeedback: 'The moment your traversal visits an index where arr[i] == 0, return true. You\'re looking for any path to any zero, so the first hit is sufficient.',
      wrongFeedback: [
        'The output is a boolean. How early can you return true once you find a valid destination?',
        'You need any path to any index with value 0. The first zero-valued index you reach ends the search — return true immediately.',
      ],
    },
    {
      id: 'bounds-check',
      question: '0 ≤ arr[i] < arr.length guarantees jumps stay in bounds. What does this let you skip?',
      options: [
        { label: 'You must still check for out-of-bounds jumps', isCorrect: false, feedback: 'The constraint guarantees arr[i] < arr.length, so i + arr[i] ≤ 2*(arr.length - 1) — which could still exceed the array. You must still check that jump destinations are within [0, n-1].' },
        { label: 'Skip bounds checks entirely', isCorrect: false, feedback: 'i + arr[i] can exceed n-1 even though arr[i] < n — for example i=3, arr[i]=4, n=5 gives destination 7. You still need bounds checks.' },
        { label: 'You never need a visited set', isCorrect: false, feedback: 'Without a visited set, you can loop indefinitely between indices. The visited set is essential to prevent infinite cycles regardless of the bounds guarantee.' },
        { label: 'Clamp destinations to valid indices instead of rejecting them', isCorrect: true },
      ],
      correctFeedback: 'arr[i] ≥ 0 means you never jump to a negative index from i — only i-arr[i] can go negative. Checking i+arr[i] < n and i-arr[i] >= 0 covers all cases with simple comparisons.',
      wrongFeedback: [
        'Even with arr[i] < arr.length, can i + arr[i] exceed n-1? What about i - arr[i] going below 0?',
        'Both jump directions need range checks: 0 ≤ i-arr[i] and i+arr[i] < n. The guarantee just rules out negative values for arr[i] itself.',
      ],
    },
  ],
}
