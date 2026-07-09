export default {
  id: 'set-matrix-zeroes',
  title: 'Set Matrix Zeroes',
  difficulty: 'medium',
  description: 'Given an <code>m × n</code> integer matrix, if an element is 0, set its entire row and column to 0s in-place. Use O(1) extra space.',
  examples: [
    { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]', explanation: 'Row 1 and column 1 become zero.' },
  ],
  constraints: ['m == matrix.length', 'n == matrix[0].length', '1 ≤ m, n ≤ 200', '-2³¹ ≤ matrix[i][j] ≤ 2³¹ − 1'],
  starterCode: `def set_zeroes(matrix):
  pass`,
  functionName: 'set_zeroes',
  conceptId: 'math-geometry',
  testCases: [
    { label: 'Center zero', args: [[[1,1,1],[1,0,1],[1,1,1]]], expected: [[1,0,1],[0,0,0],[1,0,1]] },
    { label: 'Corner zero', args: [[[0,1,2],[3,4,5],[6,7,8]]], expected: [[0,0,0],[0,4,5],[0,7,8]] },
    { label: 'No zeroes', args: [[[1,2],[3,4]]], expected: [[1,2],[3,4]] },
  ],
  bruteHint: 'Describe recording the rows and columns that contain a zero in extra sets, then zeroing them in a second pass, and its space complexity',
  optimizeHint: 'Name the technique that reuses the matrix\'s own first row and first column as markers to achieve O(1) extra space',
  clues: [
    {
      id: 'order-of-operations',
      question: 'If you set an entire row to 0 as soon as you find a zero, what goes wrong when you scan the rest of the matrix?',
      options: [
        { label: 'Nothing — setting rows early is fine', isCorrect: false, feedback: 'Setting a row to 0 immediately introduces new zeros in that row. When you continue scanning, you\'ll treat those newly created zeros as original zeros and incorrectly zero their columns.' },
        { label: 'New zeros from zeroing contaminate later scans', isCorrect: true },
        { label: 'The matrix becomes read-only after the first write', isCorrect: false, feedback: 'The matrix is mutable — you can write to it at any point. The problem is logical, not a language constraint: writing zeros early creates false positives for later reads.' },
        { label: 'You\'d need O(n) extra space to fix it', isCorrect: false, feedback: 'The fix doesn\'t require O(n) space. You can record which rows and columns need zeroing first, then apply them — but the problem asks for O(1) space, so even that must be done cleverly.' },
      ],
      correctFeedback: 'Zeroing cells during your first pass creates new zeros. On subsequent rows, you\'d mistake those new zeros for original zeros and zero additional columns — cascading incorrectly. Separate the scan from the write.',
      wrongFeedback: [
        'Suppose matrix[1][1] = 0 and you immediately zero row 1. When you reach row 2, matrix[2][1] is now 0. Was that zero original?',
        'The scan must be complete before any zeroing happens. How do you know which rows and columns to zero after scanning without writing during the scan?',
      ],
    },
    {
      id: 'space-constraint',
      question: 'You must use O(1) extra space. A naive approach records zero positions in a set — what does O(1) force you to use instead?',
      options: [
        { label: 'A copy of the matrix', isCorrect: false, feedback: 'Copying the matrix costs O(m × n) space — far from O(1). That approach also violates the in-place requirement.' },
        { label: 'The first row and first column as markers', isCorrect: true },
        { label: 'Sort the matrix before scanning', isCorrect: false, feedback: 'Sorting the matrix would destroy the element values you\'re trying to preserve. The problem asks you to zero specific rows and columns, not reorder elements.' },
        { label: 'Bit manipulation on existing values', isCorrect: false, feedback: 'Encoding extra information in existing values is fragile — matrix values can range to ±2³¹ − 1, so there\'s no safe sentinel. The cleaner O(1) approach uses the matrix\'s own first row and column.' },
      ],
      correctFeedback: 'Use matrix[0][j] to mark which columns need zeroing and matrix[i][0] to mark which rows need zeroing. That\'s O(1) extra space — but you must handle the first row and column themselves separately since they serve double duty as markers.',
      wrongFeedback: [
        'The matrix itself is already allocated. Is there any part of it you could repurpose as a boolean flag array without allocating new memory?',
        'The first row has n cells — one per column. The first column has m cells — one per row. How could you use those as markers for which rows/columns to zero?',
      ],
    },
    {
      id: 'first-row-column-edge-case',
      question: 'When using the first row and column as markers, what edge case must you handle separately?',
      options: [
        { label: 'What if the matrix has only one row or one column', isCorrect: false, feedback: 'Single-row and single-column matrices work correctly with the marker approach — the first row is the entire matrix in that case. The edge case is about the markers themselves being overwritten.' },
        { label: 'Whether the first row or first column originally contained a zero', isCorrect: true },
        { label: 'What if all elements are zero', isCorrect: false, feedback: 'If all elements are zero, the entire matrix gets zeroed — which is correct. The tricky case is when the first row or column itself contains an original zero, which you might accidentally overwrite or miss.' },
        { label: 'The diagonal elements may be marked twice', isCorrect: false, feedback: 'The cell matrix[0][0] is the intersection of the first row and first column markers. You handle this by using a separate boolean to track whether the first column needs zeroing — diagonal double-marking is the symptom, not the root issue.' },
      ],
      correctFeedback: 'If the first row contains an original zero, it should be zeroed out at the end — but you use that same row as a marker during the scan. Record whether the first row and first column originally had a zero before you repurpose them, then apply those flags last.',
      wrongFeedback: [
        'You repurpose matrix[0][j] as a marker for column j. But what if matrix[0][j] was originally 0? How do you distinguish "this column needs zeroing" from "this row (row 0) needs zeroing"?',
        'Save two booleans before you start: did the first row contain a zero? Did the first column contain a zero? Use these after all the in-matrix marking is applied.',
      ],
    },
  ],
}
