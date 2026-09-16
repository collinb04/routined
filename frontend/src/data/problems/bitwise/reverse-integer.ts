export default {
  id: 'reverse-integer',
  title: 'Reverse Integer',
  difficulty: 'medium',
  description: 'Given a signed 32-bit integer <code>x</code>, reverse its digits. If the reversed integer overflows the 32-bit signed range <code>[-2³¹, 2³¹ − 1]</code>, return 0.',
  examples: [
    { input: 'x = 123', output: '321' },
    { input: 'x = -123', output: '-321' },
    { input: 'x = 120', output: '21', explanation: 'Leading zero is dropped.' },
  ],
  constraints: ['-2³¹ ≤ x ≤ 2³¹ − 1'],
  starterCode: `class Solution:
    def reverse(self, x):
        pass`,
  runnerSetup: 'reverse = Solution().reverse',
  functionName: 'reverse',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: 'Positive', args: [123], expected: 321 },
    { label: 'Negative', args: [-123], expected: -321 },
    { label: 'Trailing zero', args: [120], expected: 21 },
    { label: 'Overflow', args: [1534236469], expected: 0 },
  ],
  bruteHint: 'One brute-force approach converts the integer to a string, reverses the characters, and parses the result back into a number — O(log n) time and O(log n) space, since digit count scales with the size of x. But string reversal knows nothing about numeric bounds, so you would need to separately handle the negative sign and re-check for 32-bit overflow after converting back. What edge cases would trip up this approach if you did not handle them explicitly?',
  optimizeComplexity: { time: 'O(log n)', space: 'O(1)' },
  clues: [
    {
      id: 'overflow-condition',
      question: 'Constraints that spell out exact numeric bounds are often a hint that your solution needs explicit boundary checks. The range is [-2³¹, 2³¹ − 1]. The problem asks you to return 0 on overflow. What does this mean for your implementation?',
      highlight: { location: 'constraint', text: '-2³¹ ≤ x ≤ 2³¹ − 1' },
      options: [
        { label: 'Check for overflow after fully reversing', isCorrect: false, feedback: 'Checking after reversing is fine in Python, which has arbitrary-precision integers. But in fixed-width languages, the reversal itself could overflow before you compare. Check before committing each new digit.' },
        { label: 'Check bounds incrementally or at the end before returning', isCorrect: true },
        { label: 'Overflow can\'t happen — reversed numbers fit in 32 bits', isCorrect: false, feedback: 'The test case 1534236469 reversed is 9646324351, which exceeds 2³¹ − 1 = 2147483647. Overflow is a real case the problem explicitly requires you to handle.' },
        { label: 'Return 0 immediately if x is negative', isCorrect: false, feedback: 'Negative inputs can reverse without overflow: -123 → -321 is valid. The sign alone doesn\'t determine whether overflow occurs — only the reversed value does.' },
      ],
      correctFeedback: '2³¹ − 1 = 2147483647. If the reversed number exceeds that (or goes below -2³¹), return 0. In Python, build the result and compare at the end.',
      wrongFeedback: [
        'The test case 1534236469 → 0 shows overflow is real. When should you compare the reversed value against the 32-bit signed bounds?',
        '2³¹ − 1 = 2147483647. The reversed value of 1534236469 is 9646324351 — that exceeds the bound. Detect this and return 0.',
      ],
    },
    {
      id: 'digit-reversal-approach',
      question: 'The core verb in a problem description usually points to the operation you actually need to implement. To reverse digits of an integer, you need to extract them one at a time. What operations accomplish this?',
      highlight: { location: 'description', text: 'reverse its digits' },
      options: [
        { label: 'Convert to string, reverse the string, convert back', isCorrect: false, feedback: 'String reversal works, but misses handling the sign and leading zeros. If x = -120, reversing the string gives "021-", which requires cleanup. The arithmetic approach handles these cases more cleanly.' },
        { label: 'Use modulo to extract digits, build result by multiplying by 10', isCorrect: true },
        { label: 'Divide by successive powers of 10 to isolate each digit', isCorrect: false, feedback: 'Division can extract individual digits but requires knowing how many digits x has upfront. The modulo approach extracts from the right one at a time without needing to know the total count.' },
        { label: 'XOR adjacent digits to reverse their order', isCorrect: false, feedback: 'XOR swaps values, but reversing decimal digits is an arithmetic operation — there\'s no bitwise shortcut for decimal digit reversal.' },
      ],
      correctFeedback: 'x % 10 extracts the last digit; x //= 10 removes it. result = result * 10 + digit builds the reversal. This naturally handles trailing zeros (they become leading zeros and drop off).',
      wrongFeedback: [
        'Think about how to process digits from right to left. What operation gets the last digit? What removes it?',
        '123 % 10 = 3 (last digit), 123 // 10 = 12 (remaining). Build result: 0 * 10 + 3 = 3, then 3 * 10 + 2 = 32, then 32 * 10 + 1 = 321.',
      ],
    },
    {
      id: 'sign-handling',
      question: 'Type descriptors like "signed" often flag an edge case the naive approach glosses over. x = -123 should produce -321. How does the arithmetic digit-extraction approach handle negative inputs?',
      highlight: { location: 'description', text: 'signed 32-bit integer' },
      options: [
        { label: 'Process the absolute value, then restore the sign at the end', isCorrect: true },
        { label: 'Python\'s modulo handles negative values correctly without adjustment', isCorrect: false, feedback: 'Python\'s modulo for negative numbers follows floor division: -123 % 10 = 7, not 3. This produces wrong digits without explicit sign handling.' },
        { label: 'Negative inputs always overflow; return 0', isCorrect: false, feedback: 'The example shows -123 → -321, which is valid. Only reversal results outside [-2³¹, 2³¹ − 1] return 0 — the sign alone doesn\'t cause overflow.' },
        { label: 'Combine the sign into the result using a bitwise operation at the end', isCorrect: false, feedback: 'Sign in two\'s complement isn\'t a separable bit you can XOR in after the fact. Work with abs(x), reverse digits, then apply the original sign.' },
      ],
      correctFeedback: 'Take sign = -1 if x < 0 else 1, work with abs(x) to extract digits, then return sign * result after overflow checking.',
      wrongFeedback: [
        'In Python, -123 % 10 = 7 due to floor division. How would you avoid that complication when reversing digits?',
        'Strip the sign first: work with abs(x), build the reversal, then multiply by the original sign. Overflow checking applies to the absolute reversed value.',
      ],
    },
    {
      id: 'trailing-zeros',
      question: 'Worked examples often expose edge-case behavior that the general rule alone doesn\'t make obvious. x = 120 produces 21, not 021. Why does the modulo approach handle this automatically?',
      options: [
        { label: 'The algorithm skips zero digits', isCorrect: false, feedback: 'The algorithm doesn\'t skip zeros — it processes every digit including the trailing zero of 120. But when that zero is placed first in the result (result = 0 * 10 + 0 = 0), subsequent digits build on it without a stored leading zero.' },
        { label: 'Leading zeros have no numeric value, so result = 0 * 10 + 0 = 0 naturally', isCorrect: true },
        { label: 'You must strip trailing zeros from x before reversing', isCorrect: false, feedback: 'No pre-processing is needed. The arithmetic naturally handles it: if the first digit you extract is 0, the result starts at 0 and grows from there as remaining digits are appended.' },
        { label: 'Manually strip the leading zero from the output before returning it', isCorrect: false, feedback: 'String manipulation isn\'t needed and would add complexity. The arithmetic approach drops leading zeros automatically because integers don\'t store leading zeros.' },
      ],
      correctFeedback: 'Processing 120: extract 0 → result = 0, extract 2 → result = 2, extract 1 → result = 21. The zero starts result at 0, which is indistinguishable from no leading zero in an integer.',
      wrongFeedback: [
        'Trace the algorithm on x = 120. What is the result after each digit extraction step?',
        'First digit extracted from 120 is 0, making result = 0 * 10 + 0 = 0. Then 2 → result = 2. Then 1 → result = 21. No leading zero appears because integers don\'t carry them.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def reverse(self, x):
        sign = -1 if x < 0 else 1
        x = abs(x)
        result = 0
        while x != 0:
            digit = x % 10
            x //= 10
            result = result * 10 + digit
        result *= sign
        INT_MAX = 2**31 - 1
        INT_MIN = -2**31
        if result > INT_MAX or result < INT_MIN:
            return 0
        return result`,
  solutionComplexity: { time: 'O(log n)', space: 'O(1)' },
  solutionCaveat: 'Working with <code>abs(x)</code> and re-applying the sign at the end sidesteps a subtlety of Python\'s <code>%</code> operator, which returns a non-negative result for a negative left operand rather than mirroring the sign of <code>x</code> the way many other languages\' <code>%</code> would.',
  solutionExplanation: 'Peeling off digits from the least-significant end with <code>% 10</code> and rebuilding the number by multiplying the running result by 10 before adding each digit reverses the digit order directly, without ever leaving numeric form for a string. A leading zero in the original (like the one in 120) simply becomes a trailing digit that contributes 0 to the final result and vanishes naturally, exactly the way integers already drop insignificant leading zeros.',
}
