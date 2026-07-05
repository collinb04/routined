export default {
  id: 'plus-one',
  title: 'Plus One',
  difficulty: 'easy',
  description: 'You are given a large integer as an array of digits, where each element is a single digit. Increment the integer by one and return the resulting array of digits.',
  examples: [
    { input: 'digits = [1,2,3]', output: '[1,2,4]', explanation: '123 + 1 = 124.' },
    { input: 'digits = [9,9]', output: '[1,0,0]', explanation: '99 + 1 = 100.' },
  ],
  constraints: ['1 ≤ digits.length ≤ 100', '0 ≤ digits[i] ≤ 9', 'digits does not contain leading zeros'],
  starterCode: `def plus_one(digits):
  pass`,
  functionName: 'plus_one',
  conceptId: 'math-geometry',
  testCases: [
    { label: 'No carry', args: [[1,2,3]], expected: [1,2,4] },
    { label: 'Carry propagates', args: [[9,9]], expected: [1,0,0] },
    { label: 'Single nine', args: [[9]], expected: [1,0] },
    { label: 'No carry simple', args: [[4,3,2,1]], expected: [4,3,2,2] },
  ],
  clues: [
    {
      id: 'carry-propagation',
      question: 'digits = [9,9] produces [1,0,0]. What special case must your traversal handle?',
      options: [
        { label: 'Digits can be negative', isCorrect: false, feedback: 'The constraint states 0 ≤ digits[i] ≤ 9 — no negatives. The edge case here is about carry, not sign.' },
        { label: 'A carry can propagate through all digits', isCorrect: true },
        { label: 'The array might be in reverse order', isCorrect: false, feedback: 'The array is in standard order — most significant digit first. [9,9] represents ninety-nine, not ninety-nine in reverse.' },
        { label: 'The last digit could overflow to two digits', isCorrect: false, feedback: 'A single digit plus one is at most 10, which produces a 1-digit result (0) and a carry of 1. The challenge is that this carry may keep propagating leftward.' },
      ],
      correctFeedback: 'When every digit is 9, adding 1 causes a carry all the way through, requiring a new leading digit. [9,9] → [1,0,0] is the canonical example.',
      wrongFeedback: [
        'Walk through [9,9] step by step: add 1 to the last 9, write 0, carry 1. Now what happens at the first 9?',
        'When a carry exits the leftmost digit, the result needs one more digit than the input. How do you prepend that 1?',
      ],
    },
    {
      id: 'traversal-direction',
      question: 'You need to add one to the last digit first, then propagate carry leftward. Which traversal direction does this require?',
      options: [
        { label: 'Left to right (index 0 first)', isCorrect: false, feedback: 'Starting at index 0 adds to the most significant digit first — the opposite of addition. Carry flows right to left, so you must traverse right to left.' },
        { label: 'Right to left (last index first)', isCorrect: true },
        { label: 'Either direction works equally well', isCorrect: false, feedback: 'Direction is not interchangeable here. Adding 1 starts at the ones place (last index) and carry flows toward higher-significance digits (earlier indices).' },
        { label: 'Sort the digits before traversing', isCorrect: false, feedback: 'Sorting would scramble the number — [1,2,3] sorted is still [1,2,3], but [3,2,1] sorted becomes [1,2,3], a completely different number.' },
      ],
      correctFeedback: 'Addition always starts at the ones place — the rightmost digit. You traverse from the last index toward index 0, propagating carry as you go.',
      wrongFeedback: [
        'Which digit do you add to first when adding by hand: the leftmost or rightmost?',
        'In column addition, carry flows from right to left. That direction tells you where to start your loop.',
      ],
    },
    {
      id: 'output-length',
      question: 'The input has no leading zeros, but the output might be longer than the input. When does this happen?',
      options: [
        { label: 'When the last digit is 9', isCorrect: false, feedback: 'If only the last digit is 9, incrementing it yields 0 with carry 1 to the next digit — but the total length doesn\'t grow unless every digit is 9. [1,9] → [2,0], same length.' },
        { label: 'When every digit is 9', isCorrect: false, feedback: 'This is correct reasoning, but the framing from the problem is more precise: the output grows when the carry exits past the leftmost digit.' },
        { label: 'When carry propagates past the first digit', isCorrect: true },
        { label: 'When digits.length equals 100', isCorrect: false, feedback: 'Maximum length doesn\'t cause growth — only a full cascade of 9s does. [9,9,...,9] with 100 nines produces a 101-digit result regardless of the constraint ceiling.' },
      ],
      correctFeedback: 'If all digits are 9, carry exits past index 0 and you need to prepend a 1. The result is one digit longer than the input — [9] → [1,0], [9,9] → [1,0,0].',
      wrongFeedback: [
        'Under what input condition does a carry keep propagating all the way past the leftmost digit?',
        'Only [9,9,...,9] — all nines — causes the result to grow. How do you add a new leading digit in that case?',
      ],
    },
  ],
}
