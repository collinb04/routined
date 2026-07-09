export default {
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
  bruteHint: 'Describe creating a brand-new matrix and copying each element into its rotated position, and why that violates the in-place constraint',
  optimizeHint: 'Name the two-step in-place technique that transposes the matrix and then reverses each row',
  clues: [
    {
      id: 'in-place-constraint',
      question: 'The problem says "rotate in-place." What does this rule out?',
      options: [
        { label: 'Creating a copy of the matrix', isCorrect: true },
        { label: 'Modifying matrix[i][j] values', isCorrect: false, feedback: 'In-place means you modify the matrix directly — changing matrix[i][j] values is exactly what you must do. What\'s forbidden is creating a separate result matrix.' },
        { label: 'Nested loops', isCorrect: false, feedback: 'Nested loops are the standard traversal pattern for 2D matrices and are fully compatible with in-place modification. The constraint is about space, not control flow.' },
        { label: 'Swapping elements', isCorrect: false, feedback: 'Swapping is the mechanism for in-place rotation — it moves values to their final positions without extra space. In-place encourages swapping, it doesn\'t forbid it.' },
      ],
      correctFeedback: 'In-place means O(1) extra space: you cannot allocate a second n×n matrix to write results into. You must rearrange elements within the original matrix using only swaps or a few temporary variables.',
      wrongFeedback: [
        'If you allocate a result matrix the same size as the input, is that O(1) extra space?',
        'In-place operations use O(1) extra space. What would using a second n×n array cost in space terms?',
      ],
    },
    {
      id: 'rotation-decomposition',
      question: 'A 90° clockwise rotation can be decomposed into two simpler in-place operations. What are they?',
      options: [
        { label: 'Reverse rows, then reverse each column', isCorrect: false, feedback: 'Reversing rows swaps entire rows, which is a horizontal flip — not the same as transposing. The correct decomposition uses transpose, not row reversal.' },
        { label: 'Transpose the matrix, then reverse each row', isCorrect: true },
        { label: 'Reverse each row, then transpose', isCorrect: false, feedback: 'The order matters. Reversing each row first (horizontal flip) then transposing gives a 90° counter-clockwise rotation, not clockwise.' },
        { label: 'Rotate each element four positions clockwise', isCorrect: false, feedback: 'There\'s no natural "four positions" in a 2D matrix without knowing where each element maps to. The two-step decomposition (transpose + reverse) is the clean approach.' },
      ],
      correctFeedback: 'Transpose swaps (i, j) with (j, i), converting rows into columns. Reversing each row after that completes the 90° clockwise rotation — both steps are O(n²) and O(1) space.',
      wrongFeedback: [
        'After transposing [[1,2,3],[4,5,6],[7,8,9]], you get [[1,4,7],[2,5,8],[3,6,9]]. What single operation on each row gives the expected output [[7,4,1],[8,5,2],[9,6,3]]?',
        'Transpose first, then reverse each row. Verify: transpose of the 3×3 example, then reverse each row — do you get the expected output?',
      ],
    },
    {
      id: 'square-constraint',
      question: 'The constraint says n == matrix.length == matrix[i].length. Why is the square shape significant for transposition?',
      options: [
        { label: 'Transposition only works on square matrices in-place', isCorrect: true },
        { label: 'It means you only need to traverse half the matrix', isCorrect: false, feedback: 'You do traverse only above the diagonal when transposing (to avoid double-swapping), but that\'s an implementation detail — the core point is that non-square matrices would need a different in-place strategy.' },
        { label: 'Diagonal elements never move', isCorrect: false, feedback: 'Diagonal elements (where i == j) map to themselves during transposition, so you don\'t swap them — but that\'s a consequence of the square shape, not the reason it matters.' },
        { label: 'Square shape allows O(log n) traversal', isCorrect: false, feedback: 'There\'s no O(log n) traversal here — every element must be visited. The square shape enables in-place transposition because the matrix has the same dimensions before and after.' },
      ],
      correctFeedback: 'Transposing an m×n matrix into an n×m matrix requires a different-sized output — which would need extra space. An n×n matrix transposes to another n×n layout, making in-place swapping possible.',
      wrongFeedback: [
        'What would happen if the matrix were 2×3 and you tried to transpose it in-place? Would the dimensions still fit?',
        'Transposing swaps rows and columns. For a non-square matrix, the transposed shape is different from the original. Why does that prevent in-place transposition?',
      ],
    },
  ],
}
