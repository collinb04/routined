export default {
  id: 'rotate-image',
  title: 'Rotate Image',
  difficulty: 'medium',
  description: 'You are given an <code>n × n</code> 2D matrix representing an image. Rotate the image 90 degrees clockwise in-place.',
  examples: [
    { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]', explanation: 'Each column becomes a row in reverse order.' },
  ],
  constraints: ['n == matrix.length == matrix[i].length', '1 ≤ n ≤ 20', '-1000 ≤ matrix[i][j] ≤ 1000'],
  starterCode: `class Solution:
    def rotate(self, matrix):
        pass`,
  runnerSetup: 'rotate = Solution().rotate',
  functionName: 'rotate',
  conceptId: 'matrix-rotation',
  testCases: [
    { label: '3×3 matrix', args: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [[7,4,1],[8,5,2],[9,6,3]] },
    { label: '2×2 matrix', args: [[[1,2],[3,4]]], expected: [[3,1],[4,2]] },
    { label: '1×1 matrix', args: [[[5]]], expected: [[5]] },
  ],
  bruteHint: 'The straightforward approach allocates a brand-new n×n matrix and copies each element directly into its rotated position, which takes O(n²) time and O(n²) extra space. That extra matrix is the problem: the task requires the rotation to happen within the given matrix. Why does copying into a second matrix conflict with the in-place requirement, and how could you rearrange elements using only the original matrix?',
  optimizeComplexity: { time: 'O(n²)', space: 'O(1)' },
  clues: [
    {
      id: 'in-place-constraint',
      question: 'Space constraints in the problem statement often rule out the most obvious approach. The problem says "rotate in-place." What does this rule out?',
      highlight: { location: 'description', text: 'Rotate the image 90 degrees clockwise in-place.' },
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
      question: 'Breaking a compound transformation into simpler steps often reveals an in-place path forward. A 90° clockwise rotation can be decomposed into two simpler in-place operations. What are they?',
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
      question: 'Dimension constraints tell you what shape guarantees you can rely on. The constraint says n == matrix.length == matrix[i].length. Why is the square shape significant for transposition?',
      highlight: { location: 'constraint', text: 'n == matrix.length == matrix[i].length' },
      options: [
        { label: 'Converting rows into columns in place only works when the matrix is square', isCorrect: true },
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
  solutionCode: `class Solution:
    def rotate(self, matrix):
        n = len(matrix)
        for r in range(n):
            for c in range(r + 1, n):
                matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
        for row in matrix:
            row.reverse()
        return matrix`,
  solutionComplexity: { time: 'O(n²)', space: 'O(1)' },
  solutionCaveat: 'Order matters: transpose first, *then* reverse each row. Reversing first and transposing second produces a counter-clockwise rotation instead of clockwise — the same two operations in the other order do a different rotation.',
  solutionExplanation: 'A 90° clockwise rotation is nothing but transpose (flip across the diagonal, turning rows into columns) followed by reversing every row. Both of those are simple, well-known in-place operations, so chaining them avoids ever needing a second matrix to write the rotated result into — the whole rotation happens by rearranging the values that are already there.',
}
