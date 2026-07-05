export default {
  id: 'pascals-triangle',
  title: "Pascal's Triangle",
  difficulty: 'easy',
  description: 'Given an integer <code>numRows</code>, return the first <code>numRows</code> of Pascal\'s triangle, where each number is the sum of the two numbers directly above it.',
  examples: [
    { input: 'numRows = 5', output: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]' },
    { input: 'numRows = 1', output: '[[1]]' },
  ],
  constraints: ['1 ≤ numRows ≤ 30'],
  starterCode: `def generate(num_rows):
  pass`,
  functionName: 'generate',
  conceptId: 'arrays',
  testCases: [
    { label: '5 rows', args: [5], expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]] },
    { label: '1 row', args: [1], expected: [[1]] },
    { label: '3 rows', args: [3], expected: [[1],[1,1],[1,2,1]] },
  ],
  clues: [
    {
      id: 'output-structure',
      question: 'The output is a list of lists (rows). What does that tell you about how to build the result?',
      options: [
        { label: 'Compute each value independently', isCorrect: false, feedback: 'Each interior value depends on the two values above it in the previous row. You cannot compute row i without row i−1 already computed.' },
        { label: 'Build one row at a time using the previous row', isCorrect: true },
        { label: 'Flatten all values into a single list', isCorrect: false, feedback: 'The required output is a list of lists — each row is its own sublist. Flattening would lose the row structure.' },
        { label: 'Use a formula for each row independently', isCorrect: false, feedback: 'Binomial coefficients C(n,k) do give each value, but computing them independently is more expensive than simply adding adjacent values from the previous row.' },
      ],
      correctFeedback: 'Row i is derived from row i−1: each interior element is the sum of two adjacent elements above. You append a completed row to the result before computing the next.',
      wrongFeedback: [
        '"Each number is the sum of the two numbers directly above it." What does "directly above" depend on?',
        'To compute row i, you need the values in row i−1. That means you must have row i−1 fully built before you start row i.',
      ],
    },
    {
      id: 'row-boundaries',
      question: 'Every row starts and ends with 1. What does this tell you about building a new row?',
      options: [
        { label: 'Only the first row has boundaries', isCorrect: false, feedback: 'Every row begins and ends with 1 — not just the first. The boundaries are always known, so you only need to compute interior elements.' },
        { label: 'Initialize each row with leading and trailing 1s', isCorrect: true },
        { label: 'The boundaries come from summing the previous row edges', isCorrect: false, feedback: 'The edges are always 1 by definition, not a sum. Trying to derive them from adjacent elements would require handling out-of-bounds indices unnecessarily.' },
        { label: 'Append 1 only if the row is odd-length', isCorrect: false, feedback: 'Every row ends with 1, regardless of length. Row length equals the row number (1-indexed), and all of them have 1 at both ends.' },
      ],
      correctFeedback: 'Since every row begins and ends with 1, you can initialize each new row as [1, …, 1] and fill only the interior positions from the previous row.',
      wrongFeedback: [
        'Look at every row in the example output. What is always true about the first and last element?',
        'The first and last elements are always 1 — you never need to compute them. That means you only need to fill positions 1 through len(row)−2.',
      ],
    },
    {
      id: 'small-constraint',
      question: 'numRows ≤ 30. What does this say about the complexity requirements?',
      options: [
        { label: 'Only O(log n) solutions are acceptable', isCorrect: false, feedback: 'numRows ≤ 30 is tiny. Even an O(n²) approach processes at most 30² = 900 elements — any reasonable implementation is fast enough.' },
        { label: 'Even O(n²) is fast enough; simplicity wins', isCorrect: true },
        { label: 'You need memoization to avoid recomputation', isCorrect: false, feedback: 'Each row is computed once and used once — there is no repeated subproblem. Memoization adds complexity without benefit at this scale.' },
        { label: 'Input size is too small to matter to the algorithm', isCorrect: false, feedback: 'Size matters because it tells you simplicity is acceptable. Knowing n ≤ 30 lets you choose the straightforward row-by-row build without worrying about efficiency.' },
      ],
      correctFeedback: 'The total number of elements is 1 + 2 + … + 30 = 465. Any O(n²) or even O(n³) approach is trivially fast. Clarity of implementation is more important than micro-optimization here.',
      wrongFeedback: [
        'The total elements in a 30-row triangle is 1+2+…+30. How many is that, and what does it say about algorithm choice?',
        '1+2+…+30 = 465 elements total. Even a slow approach is fine. What should guide your implementation choice when constraints are this small?',
      ],
    },
  ],
}
