export default {
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
  bruteHint: 'Describe tracking visited cells with a visited matrix or set as you traverse in spiral order, and its extra space cost',
  optimizeHint: 'Name the technique that maintains four shrinking boundary pointers (top, bottom, left, right) instead of tracking visited cells',
  clues: [
    {
      id: 'output-structure',
      question: 'The output is a flat list of all m × n elements. What does "spiral order" define?',
      options: [
        { label: 'A diagonal traversal of the matrix', isCorrect: false, feedback: 'Diagonal traversal visits elements along NW-to-SE diagonals — a completely different pattern. Spiral order traverses the outermost ring clockwise, then recurses inward.' },
        { label: 'The sequence in which elements are collected layer by layer', isCorrect: true },
        { label: 'A sorted permutation of all elements', isCorrect: false, feedback: 'Spiral order is a traversal path — the values come out in the order they\'re visited, not sorted. [1,2,3,6,9,8,7,4,5] is not sorted; it\'s the clockwise boundary traversal.' },
        { label: 'Elements collected column by column', isCorrect: false, feedback: 'Column-by-column traversal reads each column top to bottom in sequence. Spiral order alternates direction each layer: right, down, left, up — not column by column.' },
      ],
      correctFeedback: 'Spiral order traverses the outermost ring (right → down → left → up), then shrinks the boundaries and repeats on the inner ring, until all m × n elements are collected.',
      wrongFeedback: [
        'Trace the path on [[1,2,3],[4,5,6],[7,8,9]]: you go right across the top, down the right edge, left across the bottom, up the left edge — then inward. What pattern is that?',
        'Each full "loop" of the spiral traverses four edges: top, right, bottom, left. After one loop, you shrink the bounds and repeat. What structure drives that inward progression?',
      ],
    },
    {
      id: 'boundary-tracking',
      question: 'To avoid revisiting cells, you need to track which area remains unvisited. What is the cleanest way to do this?',
      options: [
        { label: 'Mark visited cells with a special value', isCorrect: false, feedback: 'Marking with a sentinel (e.g., None) works but requires reading the value range to pick a safe sentinel — with values from −100 to 100, you need care. Shrinking boundaries avoids any mutation of the original values.' },
        { label: 'Maintain top, bottom, left, right boundary pointers', isCorrect: true },
        { label: 'Use a visited set of (row, col) pairs', isCorrect: false, feedback: 'A visited set uses O(m × n) extra space and adds O(1) overhead per cell. Shrinking boundaries achieve the same result in O(1) space with simpler logic.' },
        { label: 'Recursively slice the matrix after each ring', isCorrect: false, feedback: 'Slicing creates new sub-matrices at each level — O(m × n) total extra space across all levels. Boundary pointers track the same shrinking region without any allocation.' },
      ],
      correctFeedback: 'Four integer pointers (top, bottom, left, right) define the unvisited rectangle. After each edge traversal, shrink the corresponding boundary by one. When top > bottom or left > right, the spiral is complete.',
      wrongFeedback: [
        'After traversing the top row, which boundary advances? After the right column, which boundary retreats?',
        'Think of it as a shrinking rectangle: each completed edge moves one boundary inward. How many boundary variables do you need to track the current inner rectangle?',
      ],
    },
    {
      id: 'non-square-edge-case',
      question: 'The matrix can be non-square (e.g., 2×3 or single row). What must you check before traversing each edge?',
      options: [
        { label: 'Nothing extra — the four edges always exist', isCorrect: false, feedback: 'For a single-row matrix, the "bottom" traversal would re-visit the same row. For a single-column matrix, the "right" traversal would re-visit the same column. You must guard against traversing an edge when the layer has collapsed to a line.' },
        { label: 'That top ≤ bottom and left ≤ right still hold after each edge', isCorrect: true },
        { label: 'That m equals n before entering the spiral loop', isCorrect: false, feedback: 'Non-square inputs are valid — the 2×3 test case confirms this. The guard condition checks that boundaries haven\'t crossed, not that the matrix is square.' },
        { label: 'That the result list has fewer than m × n elements', isCorrect: false, feedback: 'Tracking result length indirectly catches the termination — but it doesn\'t prevent you from executing an already-completed edge traversal. Check boundaries directly to know when an edge is still valid.' },
      ],
      correctFeedback: 'After traversing the top row, check top ≤ bottom before the right column. After the right column, check left ≤ right before the bottom row. After the bottom row, check top ≤ bottom before the left column. These guards prevent re-traversal of collapsed layers.',
      wrongFeedback: [
        'Trace a 2×3 matrix: after right (top row) and down (right column), you traverse left (bottom row). But after incrementing top, is top still ≤ bottom?',
        'For a 1×n matrix, the spiral collapses after one right traversal. What condition tells you there\'s no "return left" step needed?',
      ],
    },
  ],
}
