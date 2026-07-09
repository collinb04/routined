export default {
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
  bruteHint: 'Describe collecting each full root-to-leaf path into a list first, converting each completed path into a number, and summing them afterward',
  optimizeHint: 'Name the technique that carries a running accumulated number down through the recursion so each leaf can contribute its total without ever storing the full path',
  clues: [
    {
      id: 'node-val-range',
      question: '0 ≤ Node.val ≤ 9 — each value is a single digit. What does this tell you about how to build the number along a path?',
      options: [
        { label: 'Concatenate digits as strings, then convert', isCorrect: false, feedback: 'String concatenation works but is unnecessary. Since each digit is 0–9, you can build the number arithmetically: multiply the running total by 10 and add the current digit.' },
        { label: 'Multiply running total by 10 and add current digit', isCorrect: true },
        { label: 'Add each node value directly to a running sum', isCorrect: false, feedback: 'Direct addition ignores place value. Path 1→2 should produce 12, not 1 + 2 = 3. Each digit must shift the existing number one decimal place to the left.' },
        { label: 'Use base-2 encoding since digits are small', isCorrect: false, feedback: 'The digits represent decimal numbers, not binary. The example paths — 12, 13, 495 — are standard base-10 integers.' },
      ],
      correctFeedback: 'Each step down the path shifts the accumulated value one decimal place: new_val = current * 10 + node.val. This builds the path number without any string conversion.',
      wrongFeedback: [
        'Path 1→2 should give 12, not 3. How do you shift 1 to the tens place before adding 2?',
        'Think in terms of place value: as you descend one level, the existing digits all move one place to the left. What arithmetic operation does that?',
      ],
    },
    {
      id: 'output-sum-all-paths',
      question: 'The output is the sum of ALL root-to-leaf numbers. When do you add a path\'s value to the total?',
      options: [
        { label: 'At every node you visit', isCorrect: false, feedback: 'Adding at every node counts partial paths — path 1→2 would contribute both 1 (at the root) and 12 (at the leaf). Only complete root-to-leaf paths represent numbers.' },
        { label: 'Only at leaf nodes', isCorrect: true },
        { label: 'At every left child', isCorrect: false, feedback: 'Left children are not necessarily leaves. A left child with further children is an internal node — its partial path value should not be added to the sum.' },
        { label: 'At the root after all paths are collected', isCorrect: false, feedback: 'The root is not a leaf (unless the tree has a single node). Adding at the root would add only the root digit, not any complete path number.' },
      ],
      correctFeedback: 'A leaf node has no children — it marks the end of a root-to-leaf path. That is the moment the full path number is complete and should be added to the running total.',
      wrongFeedback: [
        'A root-to-leaf number is only complete when you reach a node with no children. What kind of node is that?',
        'Internal nodes represent partial paths — their numbers are not yet complete. When does a path become complete?',
      ],
    },
    {
      id: 'depth-constraint',
      question: 'Tree depth ≤ 10 and each node value is a single digit. What is the maximum value of any root-to-leaf number?',
      options: [
        { label: 'Up to 9,999,999,999 (ten 9s)', isCorrect: true },
        { label: 'Up to 90 (ten nodes × max digit 9)', isCorrect: false, feedback: 'Adding digits gives 90 only if you ignore place value. With depth 10, the path number has 10 digits — the leftmost is in the billions place.' },
        { label: 'Up to 1000 (number of nodes)', isCorrect: false, feedback: 'Node count and path number value are unrelated. With depth 10 and digit 9 at every level, the path number is 9,999,999,999 — much larger than 1000.' },
        { label: 'Up to 9 (single digit max)', isCorrect: false, feedback: 'A single digit would only be the value of a depth-1 tree. With depth 10, digits from every level contribute to a multi-digit number.' },
      ],
      correctFeedback: 'Depth 10 with all 9s gives 9,999,999,999 — about 10 billion. This fits in a 64-bit integer, so integer overflow is not a concern in Python (which has arbitrary-precision integers).',
      wrongFeedback: [
        'With depth 10 and each digit being 9, what is the largest number a root-to-leaf path could spell out?',
        'Think of each level contributing one digit to the number. With 10 levels of all 9s, what decimal number do you get?',
      ],
    },
  ],
}
