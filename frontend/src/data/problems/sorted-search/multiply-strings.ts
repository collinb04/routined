export default {
  id: 'multiply-strings',
  title: 'Multiply Strings',
  difficulty: 'medium',
  description: 'Given two non-negative integers <code>num1</code> and <code>num2</code> represented as strings, return the product of <code>num1</code> and <code>num2</code> as a string. You may not convert inputs directly to integers.',
  examples: [
    { input: 'num1 = "2", num2 = "3"', output: '"6"' },
    { input: 'num1 = "123", num2 = "456"', output: '"56088"' },
  ],
  constraints: ['1 ≤ num1.length, num2.length ≤ 200', 'num1 and num2 consist of digits only', 'Neither input has leading zeros except "0"'],
  starterCode: `class Solution:
    def multiply(self, num1, num2):
        pass`,
  runnerSetup: 'multiply = Solution().multiply',
  functionName: 'multiply',
  conceptId: 'strings',
  testCases: [
    { label: 'Single digits', args: ['2','3'], expected: '6' },
    { label: 'Multi-digit', args: ['123','456'], expected: '56088' },
    { label: 'Multiply by zero', args: ['0','52'], expected: '0' },
    { label: '99×99', args: ['99','99'], expected: '9801' },
  ],
  bruteHint: 'The tempting brute-force shortcut is to call int() on both strings, multiply them as native integers, and convert the product back to a string — trivial in a language with arbitrary-precision integers, but explicitly banned by the problem. Even setting the ban aside, num1 and num2 can each be 200 digits long, far beyond what fixed-width integer types in most languages can represent natively. What would you need to do instead to compute the product without ever forming the whole number?',
  optimizeComplexity: { time: 'O(n · m)', space: 'O(n + m)' },
  clues: [
    {
      id: 'no-integer-conversion',
      highlight: { location: 'description', text: 'You may not convert inputs directly to integers.' },
      question: 'Constraints that explicitly rule out an easy shortcut are pointing you toward the technique the problem actually expects. "You may not convert inputs directly to integers." What approach does this constraint force?',
      options: [
        { label: 'Use floating-point arithmetic', isCorrect: false, feedback: 'Float conversion is still a conversion — and floats lose precision above ~15 significant digits, which matters here since inputs can be 200 digits long.' },
        { label: 'Simulate digit-by-digit multiplication', isCorrect: true },
        { label: 'Sort the digits before multiplying', isCorrect: false, feedback: 'Sorting digits would change the number entirely. The constraint isn\'t about ordering — it\'s about how you compute the product without using Python\'s int() cast.' },
        { label: 'Use string concatenation to build the result', isCorrect: false, feedback: 'Concatenating strings builds a longer string, not a product. Multiplication requires positional digit arithmetic — the same mechanics taught in grade school long multiplication.' },
      ],
      correctFeedback: 'Without int(), you multiply as humans do on paper: each digit of num1 by each digit of num2, accumulating partial products at the correct positional offset.',
      wrongFeedback: [
        'How would you multiply "123" × "456" by hand, without a calculator?',
        'Long multiplication works digit by digit with positional carries. That same process is what you implement here.',
      ],
    },
    {
      id: 'constraint-size',
      highlight: { location: 'constraint', text: '1 ≤ num1.length, num2.length ≤ 200' },
      question: 'Size constraints on the inputs often translate directly into a required size for your output buffer. num1 and num2 can each be up to 200 digits long. What does that imply about the result array size?',
      options: [
        { label: 'Result is at most 200 digits', isCorrect: false, feedback: 'The product of two m-digit and n-digit numbers has at most m + n digits. 200 × 200 produces a result up to 400 digits — not 200.' },
        { label: 'Result needs at most m + n positions', isCorrect: true },
        { label: 'Result fits in a 64-bit integer', isCorrect: false, feedback: 'A 64-bit integer holds at most 19 decimal digits. A 200-digit number is astronomically larger — this is exactly why the inputs arrive as strings.' },
        { label: 'You need O(n²) space for intermediate values', isCorrect: false, feedback: 'You accumulate intermediate products into a single result array of size m + n, not a 2D table. Space is O(m + n).' },
      ],
      correctFeedback: 'An m-digit number times an n-digit number produces at most m + n digits. Pre-allocating a result array of size m + n lets you accumulate digit products at the correct index without resizing.',
      wrongFeedback: [
        'What is the maximum number of digits in the product of a 3-digit number and a 4-digit number?',
        'Multiply 999 × 9999 mentally: the result is 7 digits. For inputs of lengths m and n, the product is at most m + n digits.',
      ],
    },
    {
      id: 'output-type',
      highlight: { location: 'constraint', text: 'Neither input has leading zeros except "0"' },
      question: 'The required output type can hide extra cleanup work you must do before returning. The output must be a string. When do you need to handle leading zeros in the result?',
      options: [
        { label: 'Never — the inputs guarantee no leading zeros', isCorrect: false, feedback: 'The inputs have no leading zeros (except "0"), but intermediate digit accumulation can leave leading zeros in the result array. "0" × anything is the key case to handle.' },
        { label: 'Only when one input is "0"', isCorrect: false, feedback: 'Multiplying by zero always produces "0", but leading zeros can also arise from the way you accumulate carries — you need to strip them before returning.' },
        { label: 'Before returning, strip leading zeros from the result', isCorrect: true },
        { label: 'After each digit multiplication step', isCorrect: false, feedback: 'Stripping zeros mid-computation would corrupt your positional accumulation. You carry and accumulate freely, then clean up leading zeros once at the end.' },
      ],
      correctFeedback: 'After all digit products are accumulated and carries are propagated, the high-order positions of the result array may be 0. Strip them before joining into the final string — but always return at least "0".',
      wrongFeedback: [
        'What does the result array look like after computing "0" × "52"? What would you return without cleanup?',
        'The result array is pre-allocated with zeros. After accumulation, any unused high positions remain 0 — those need to be removed before converting to a string.',
      ],
    },
    {
      id: 'positional-indexing',
      question: 'Working out the exact index math up front prevents off-by-one errors once you start accumulating partial products. When digit num1[i] × num2[j] contributes to the result, where in the result array does it land?',
      options: [
        { label: 'At index i + j', isCorrect: true },
        { label: 'At index i × j', isCorrect: false, feedback: 'Multiplication of indices has no positional meaning. Positional value is determined by how far each digit is from the right end — that\'s an addition of offsets, not a product.' },
        { label: 'At the rightmost position always', isCorrect: false, feedback: 'Only the units digits land at the rightmost position. Each digit carries a positional weight based on its index from the left, which translates to an offset from the right.' },
        { label: 'At index len(num1) + len(num2) − i − j', isCorrect: false, feedback: 'This reverses the indexing convention. If you index from the left and the result array also runs left-to-right, the partial product of num1[i] and num2[j] lands at result[i + j] (with the carry at i + j + 1).' },
      ],
      correctFeedback: 'num1[i] has positional weight (len(num1) − 1 − i) from the right, and num2[j] has weight (len(num2) − 1 − j). Their product lands at result[i + j] in a result array indexed left-to-right.',
      wrongFeedback: [
        'In long multiplication, which column does the product of the i-th and j-th digits from the left contribute to?',
        'Positional offset from the left end is additive. If i indexes into num1 and j into num2, the partial product goes into the result at position i + j.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def multiply(self, num1, num2):
        if num1 == "0" or num2 == "0":
            return "0"
        n1, n2 = len(num1), len(num2)
        result = [0] * (n1 + n2)
        for i in range(n1 - 1, -1, -1):
            for j in range(n2 - 1, -1, -1):
                d1 = ord(num1[i]) - ord('0')
                d2 = ord(num2[j]) - ord('0')
                pos_low, pos_high = i + j + 1, i + j
                total = d1 * d2 + result[pos_low]
                result[pos_low] = total % 10
                result[pos_high] += total // 10
        result_str = ''.join(map(str, result)).lstrip('0')
        return result_str if result_str else '0'`,
  solutionComplexity: { time: 'O(n · m)', space: 'O(n + m)' },
  solutionCaveat: 'Each digit-pair product is *added* into <code>result[pos_low]</code> rather than overwriting it, and any resulting carry is immediately folded into <code>result[pos_high]</code> — since multiple digit pairs from different (i, j) combinations can land on the very same result position, and each one might independently push a carry into its neighbor.',
  solutionExplanation: 'This mirrors grade-school long multiplication digit by digit: the product of the digit at position <code>i</code> in <code>num1</code> and position <code>j</code> in <code>num2</code> always contributes to result position <code>i + j</code> (with any overflow carrying into position <code>i + j - 1</code>), since that positional relationship holds regardless of the specific digits involved. Accumulating every digit-pair\'s contribution into a fixed-size result array — sized generously at <code>len(num1) + len(num2)</code> to always fit the largest possible product — avoids ever forming the actual integers, so arbitrarily long digit strings are handled without relying on big-integer support.',
}
