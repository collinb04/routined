export default {
  id: 'max-sum-rectangle-no-larger-k',
  title: 'Max Sum of Rectangle No Larger Than K',
  difficulty: 'hard',
  description: 'Given a matrix of integers and integer <code>k</code>, return the max sum of a rectangle such that its sum is no larger than <code>k</code>.',
  examples: [
    { input: 'matrix=[[1,0,1],[0,-2,3]], k=2', output: '2', explanation: 'The rectangle [[0,1],[-2,3]] has sum 2.' },
  ],
  constraints: ['m == matrix.length', 'n == matrix[0].length', '1 ≤ m, n ≤ 100', '-100 ≤ matrix[i][j] ≤ 100', '-10⁵ ≤ k ≤ 10⁵'],
  starterCode: `class Solution:
    def max_sum_submatrix(self, matrix, k):
        pass`,
  runnerSetup: 'max_sum_submatrix = Solution().max_sum_submatrix',
  functionName: 'max_sum_submatrix',
  conceptId: 'prefix-sum',
  testCases: [
    { label: 'Standard', args: [[[1,0,1],[0,-2,3]],2], expected: 2 },
    { label: 'k=3', args: [[[2,2],[-1,-1]],3], expected: 2 },
  ],
  bruteHint: 'The brute-force approach tries every possible rectangle: pick a top row, bottom row, left column, and right column, then sum everything inside. With four nested loops over the row and column boundaries, that is O(m²n²) rectangles, and summing each one directly adds even more work on top. At m, n up to 100, would checking every one of these rectangles finish in time?',
  optimizeComplexity: { time: 'O(m² · n log n)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'We can figure out how efficient our approach needs to be based on the size bounds given. m, n ≤ 100. How does this 2D size bound shape your complexity budget?',
      highlight: { location: 'constraint', text: '1 ≤ m, n ≤ 100' },
      options: [
        { label: 'O(m² · n²) brute force is fine', isCorrect: false, feedback: 'O(m² · n²) is 100⁴ = 100 million operations — marginal at best. But the "no larger than k" check inside that loop would add another factor, pushing it over the limit.' },
        { label: 'O(m² · n · log n) is the target', isCorrect: true },
        { label: 'O(m · n) is required', isCorrect: false, feedback: 'O(m · n) would be ideal but is not achievable here — you cannot identify the best rectangle without at least fixing both row bounds, which already costs O(m²).' },
        { label: 'The matrix is small enough to try every sub-rectangle naively', isCorrect: false, feedback: 'There are O(m² · n²) sub-rectangles. At m = n = 100 that is 100 million, and naively summing each one adds another O(m·n) factor. That approach needs optimization.' },
      ],
      correctFeedback: 'Fixing the top and bottom row (O(m²)) then solving a 1D "max subarray sum ≤ k" problem per column pair (O(n log n) with a sorted set) gives O(m² · n · log n) — feasible for m, n ≤ 100.',
      wrongFeedback: [
        'Think of reducing the 2D problem: fix two row indices (O(m²) pairs), then solve a 1D problem on the compressed column sums. What complexity does the 1D part need?',
        'After compressing rows into column sums, you need the max prefix-sum difference ≤ k. A sorted set gives O(log n) per query. How does that combine with O(m²) row pairs and O(n) columns?',
      ],
    },
    {
      id: 'no-larger-than-k',
      question: 'We can narrow down which technique applies by paying close attention to the exact wording of the target condition. "No larger than k" — not "equal to k" or "as large as possible." What technique does this constraint point to?',
      highlight: { location: 'description', text: 'no larger than <code>k</code>' },
      options: [
        { label: 'Track the maximum subarray sum seen so far', isCorrect: false, feedback: 'Kadane\'s algorithm finds the maximum subarray sum without any upper bound. Here you need the maximum sum that does not exceed k — a different problem requiring a different approach.' },
        { label: 'Among the running totals seen so far, quickly find the one that keeps the difference within k', isCorrect: true },
        { label: 'Discard any rectangle whose sum equals k exactly', isCorrect: false, feedback: 'A sum equal to k is valid — the constraint is "no larger than k," meaning ≤ k. Equal is exactly the best case.' },
        { label: 'Grow and shrink a contiguous range of elements, stopping once its sum reaches k', isCorrect: false, feedback: 'A sliding window that stops at k finds a sum equal to k or misses cases. You need the maximum sum ≤ k, which may be less than k; stopping early would miss larger valid sums.' },
      ],
      correctFeedback: 'For a 1D array of prefix sums, you want the largest prefix[j] − prefix[i] ≤ k, i.e., the smallest prefix[i] ≥ prefix[j] − k. A sorted set supports that lookup in O(log n).',
      wrongFeedback: [
        'You have a 1D prefix sum array and want the largest subarray sum that does not exceed k. If current prefix is P, you want the smallest previous prefix ≥ P − k. What data structure finds that in O(log n)?',
        'A sorted container (like a sorted list or balanced BST) lets you query "smallest value ≥ x" in O(log n). How does that help find the best prefix-sum pair?',
      ],
    },
    {
      id: 'negative-values',
      question: 'We can figure out which rectangles are safe to skip — or not — by considering the full range of values allowed. -100 ≤ matrix[i][j] ≤ 100 and k can be negative (-10⁵ ≤ k). What does allowing negative values and negative k imply?',
      highlight: { location: 'constraint', text: '-10⁵ ≤ k ≤ 10⁵' },
      options: [
        { label: 'The answer is always non-negative', isCorrect: false, feedback: 'If k is negative, you must find a rectangle with sum ≤ k — which may itself be a large negative number. The answer can be negative.' },
        { label: 'You cannot skip rectangles with negative sums', isCorrect: true },
        { label: 'All-negative matrices have no valid rectangle', isCorrect: false, feedback: 'Even in an all-negative matrix, every single-cell rectangle is a valid candidate. The problem asks for the maximum sum ≤ k, not the maximum positive sum.' },
        { label: 'The maximum rectangle always includes the cell with the highest value', isCorrect: false, feedback: 'A single high-value cell might exceed k. You need the maximum sum that stays within the budget — that rectangle may not include the globally maximum cell.' },
      ],
      correctFeedback: 'Negative rectangle sums are valid candidates — especially when k is negative. You cannot prune based on sign; every sub-rectangle is a potential answer.',
      wrongFeedback: [
        'Consider k = -5. What kind of rectangle sum would be valid? Does that change which rectangles you need to evaluate?',
        'When k is negative, the best valid rectangle might have a large negative sum. Can you skip any rectangles without checking them?',
      ],
    },
    {
      id: 'row-compression',
      question: 'We can figure out which overall strategy fits by thinking about how to reduce this problem to one we already know how to solve. The problem is 2D. What is the standard reduction that turns a 2D rectangle problem into repeated 1D subarray problems?',
      options: [
        { label: 'Fix the left and right column bounds, sum each row', isCorrect: false, feedback: 'Close — but the standard reduction fixes the top and bottom row bounds, then computes column sums. That compresses the 2D rectangle into a 1D array of column-wise sums.' },
        { label: 'Fix the top and bottom row bounds, then solve 1D on column sums', isCorrect: true },
        { label: 'Flatten the matrix into one array and run 1D Kadane', isCorrect: false, feedback: 'Flattening destroys the 2D structure — a contiguous run in the flat array can cross row boundaries, which is not a valid rectangle. You must respect the 2D shape.' },
        { label: 'Process the matrix diagonally', isCorrect: false, feedback: 'Diagonal traversal does not correspond to any rectangle shape. Rectangles are defined by row and column ranges, so the reduction must fix row or column bounds.' },
      ],
      correctFeedback: 'Fix the top row r1 and bottom row r2 (O(m²) pairs). For each column j, compute the sum of matrix[r1..r2][j]. This gives a 1D array where any contiguous subarray corresponds to a valid rectangle.',
      wrongFeedback: [
        'A rectangle is defined by two row bounds and two column bounds. If you fix the row bounds, what does the problem reduce to?',
        'After fixing rows r1 and r2, sum each column j from r1 to r2 into colSum[j]. Now a contiguous subarray of colSum corresponds to a what?',
      ],
    },
  ],
  solutionCode: `import bisect

class Solution:
    def max_sum_submatrix(self, matrix, k):
        m, n = len(matrix), len(matrix[0])
        best = float('-inf')
        for top in range(m):
            row_sum = [0] * n
            for bottom in range(top, m):
                for c in range(n):
                    row_sum[c] += matrix[bottom][c]
                prefix = 0
                sorted_prefixes = [0]
                for val in row_sum:
                    prefix += val
                    idx = bisect.bisect_left(sorted_prefixes, prefix - k)
                    if idx < len(sorted_prefixes):
                        best = max(best, prefix - sorted_prefixes[idx])
                    bisect.insort(sorted_prefixes, prefix)
        return best`,
  solutionComplexity: { time: 'O(m² · n log n)', space: 'O(n)' },
  solutionCaveat: 'The sorted-prefix trick only finds the sum closest to (but not exceeding) <code>k</code> for the *current* row range — the outer two loops over <code>top</code> and <code>bottom</code> still have to try every row range, since collapsing rows any other way would lose information about which rectangle produced which sum.',
  solutionExplanation: 'Fixing a top and bottom row collapses the 2D problem into a 1D one: summing each column across just those rows produces an array where a contiguous slice is exactly a rectangle sum for that row range, reducing the question to "max subarray sum no larger than k" — solvable with prefix sums and a sorted list, binary-searching for the smallest earlier prefix that keeps the difference at or under <code>k</code>. Trying every row-range pair costs O(m²), and each one\'s column-collapsed array is solved in O(n log n), giving the combined complexity.',
}
