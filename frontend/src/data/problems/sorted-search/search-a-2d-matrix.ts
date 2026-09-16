export default {
  id: 'search-a-2d-matrix',
  title: 'Search a 2D Matrix',
  difficulty: 'medium',
  description: `<p>You are given an <code>m x n</code> integer matrix <code>matrix</code> with the following two properties: each row is sorted in non-decreasing order, and the first integer of each row is greater than the last integer of the previous row.</p><p>Given an integer <code>target</code>, return <code>true</code> if <code>target</code> is in <code>matrix</code> or <code>false</code> otherwise. You must use an O(log(m * n)) algorithm.</p>`,
  examples: [
    { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'true' },
    { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13', output: 'false' },
  ],
  constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 100', '-10^4 <= matrix[i][j], target <= 10^4'],
  starterCode: `class Solution:
    def search_matrix(self, matrix, target):
        pass`,
  runnerSetup: 'search_matrix = Solution().search_matrix',
  functionName: 'search_matrix',
  conceptId: 'binary-search',
  testCases: [
    { label: 'found', args: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3], expected: true },
    { label: 'not found', args: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13], expected: false },
  ],
  bruteHint: 'A brute-force approach checks every cell of the matrix one by one, comparing it against the target until a match turns up or all cells are exhausted. With m rows and n columns, that means up to m × n comparisons, giving O(m × n) time. Given that each row is sorted and every row starts higher than the previous row ends, do you really need to inspect every single cell to find the target?',
  optimizeComplexity: { time: 'O(log(m · n))', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Explicit runtime requirements in a problem statement often signal which algorithm family is even viable. You must use an O(log(m * n)) algorithm. With m, n ≤ 100, what does this tell you about the expected approach?',
      highlight: { location: 'description', text: 'You must use an O(log(m * n)) algorithm.' },
      options: [
        { label: 'Search every row linearly', isCorrect: false, feedback: 'Searching every row linearly is O(m × n) = O(10,000) — much worse than O(log(m × n)) ≈ O(13). The constraint is ruling out linear scans entirely.' },
        { label: 'Binary search treating the matrix as a flat sorted array', isCorrect: true },
        { label: 'Use a hash set of all matrix values', isCorrect: false, feedback: 'Building a hash set requires O(m × n) time and space to populate. That violates the O(log(m × n)) time requirement for the search itself.' },
        { label: 'O(log(m * n)) is impossible for 2D data', isCorrect: false, feedback: 'The two properties (sorted rows + first of each row > last of previous) mean the matrix is effectively one sorted array read row by row. That makes binary search with index arithmetic possible.' },
      ],
      correctFeedback: 'O(log(m × n)) means binary search over m × n = up to 10,000 elements — about 13 iterations. The two sorted-order properties let you treat the matrix as a single sorted sequence.',
      wrongFeedback: [
        'What algorithm achieves O(log k) search time on a sorted sequence of k elements?',
        'The matrix has two properties that make it equivalent to a sorted 1D array of m × n elements. What algorithm searches a sorted array in O(log(m × n))?',
      ],
    },
    {
      id: 'matrix-as-flat-array',
      question: 'Structural guarantees about how pieces of input relate to each other can reveal a simpler, unified way to view the data. Each row is sorted, and the first element of each row exceeds the last of the previous row. What does this guarantee about the matrix overall?',
      highlight: { location: 'description', text: 'the first integer of each row is greater than the last integer of the previous row.' },
      options: [
        { label: 'Each row is independent — they don\'t connect', isCorrect: false, feedback: 'The second property explicitly connects rows: the first element of row i+1 is greater than the last element of row i. This is what makes cross-row comparison meaningful.' },
        { label: 'The matrix elements are globally sorted row by row', isCorrect: true },
        { label: 'Only the first column is sorted', isCtorrect: false, feedback: 'The first column happens to be sorted as a consequence, but that\'s a result of the global ordering, not the defining property. Every element in row i is smaller than every element in row i+1.' },
        { label: 'Each row contains exactly one possible target location', isCorrect: false, feedback: 'A row can contain 0 or 1 copies of the target, or the target may not exist at all. The property is about global sort order, not unique row membership.' },
      ],
      correctFeedback: 'Reading left to right, top to bottom, the matrix is one globally sorted sequence. Element at (i, j) maps to flat index i * n + j, enabling standard binary search with index arithmetic.',
      wrongFeedback: [
        'If you read [[1,3,5,7],[10,11,16,20],[23,30,34,60]] left to right, top to bottom, what sequence do you get?',
        'The two properties together mean every element in row 0 < every element in row 1 < every element in row 2. What does that imply about the overall order?',
      ],
    },
    {
      id: 'index-conversion',
      question: 'Translating an abstract search position back into a concrete data location is often where implementations go wrong. During binary search, you compute a flat midpoint index mid. How do you convert it back to (row, col) in the matrix?',
      options: [
        { label: 'row = mid % n, col = mid // n', isCorrect: false, feedback: 'This swaps the formulas. The row index is how many full rows fit into mid, which is mid // n (integer division). The column is the remainder, mid % n.' },
        { label: 'row = mid // n, col = mid % n', isCorrect: true },
        { label: 'row = mid // m, col = mid % m', isCorrect: false, feedback: 'You divide and mod by n (number of columns), not m (number of rows). Each row has n elements, so the row is mid // n and the column offset within that row is mid % n.' },
        { label: 'row = mid, col = 0 always', isCorrect: false, feedback: 'This would only index the first column of each row, which is not binary search over the full matrix. The flat index must be unpacked into both row and column.' },
      ],
      correctFeedback: 'Flat index mid in an n-column matrix: row = mid // n (how many complete rows), col = mid % n (position within that row). This is the same arithmetic as converting a 1D index to 2D.',
      wrongFeedback: [
        'If n = 4 (4 columns) and mid = 6, which row and column is that? Use division and modulo.',
        'mid = 6, n = 4: 6 // 4 = 1 (row 1), 6 % 4 = 2 (column 2). What are the general formulas?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def search_matrix(self, matrix, target):
        m, n = len(matrix), len(matrix[0])
        lo, hi = 0, m * n - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            val = matrix[mid // n][mid % n]
            if val == target:
                return True
            elif val < target:
                lo = mid + 1
            else:
                hi = mid - 1
        return False`,
  solutionComplexity: { time: 'O(log(m · n))', space: 'O(1)' },
  solutionCaveat: 'Because every row starts higher than the previous row ends, the matrix reads as one continuous ascending sequence when flattened — <code>mid // n</code> and <code>mid % n</code> convert a flat index back to its row and column without ever actually building that flattened array.',
  solutionExplanation: 'The two stated properties together mean the matrix is really just a single sorted array of <code>m × n</code> elements, arranged in rows of length <code>n</code> — so an ordinary binary search over the range <code>[0, m*n - 1]</code> works directly, treating each virtual index as if it were a position in that flat array and converting it to real (row, column) coordinates only when a value actually needs to be read.',
}
