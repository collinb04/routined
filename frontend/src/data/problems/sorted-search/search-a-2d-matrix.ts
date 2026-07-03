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
  starterCode: `def search_matrix(matrix, target):
  pass`,
  functionName: 'search_matrix',
  conceptId: 'binary-search',
  testCases: [
    { label: 'found', args: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3], expected: true },
    { label: 'not found', args: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13], expected: false },
  ],
}
