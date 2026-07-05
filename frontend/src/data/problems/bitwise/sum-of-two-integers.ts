export default {
  id: 'sum-of-two-integers',
  title: 'Sum of Two Integers',
  difficulty: 'medium',
  description: 'Given two integers <code>a</code> and <code>b</code>, return their sum without using the operators <code>+</code> or <code>-</code>. Use bit manipulation instead.',
  examples: [
    { input: 'a = 1, b = 2', output: '3' },
    { input: 'a = 2, b = 3', output: '5' },
  ],
  constraints: ['-1000 ≤ a, b ≤ 1000'],
  starterCode: `def get_sum(a, b):
  pass`,
  functionName: 'get_sum',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: '1+2', args: [1,2], expected: 3 },
    { label: '2+3', args: [2,3], expected: 5 },
    { label: 'Negatives', args: [-1,-2], expected: -3 },
    { label: 'One negative', args: [5,-3], expected: 2 },
  ],
  clues: [
    {
      id: 'xor-as-addition',
      question: 'XOR gives the sum of two bits without carry: 1 ^ 1 = 0, 0 ^ 1 = 1. What does a ^ b compute across all bit positions?',
      options: [
        { label: 'The full sum including carry', isCorrect: false, feedback: 'a ^ b computes the carry-free partial sum — bits where exactly one of a or b is set. The carry (where both bits are 1) is a separate step handled by AND and left-shift.' },
        { label: 'The partial sum without carries', isCorrect: true },
        { label: 'The bitwise difference a − b', isCorrect: false, feedback: 'XOR doesn\'t compute subtraction. It gives 1 where bits differ, 0 where they match — that\'s carry-free addition (or equivalently, difference mod 2), not signed subtraction.' },
        { label: 'The carry bits only', isCorrect: false, feedback: 'AND gives the carry bits: (a & b) identifies positions where both bits are 1 and a carry must propagate. XOR gives the non-carry bits.' },
      ],
      correctFeedback: 'a ^ b gives the sum at each bit position ignoring carry: 1 + 1 = 0 (carry discarded), 1 + 0 = 1, 0 + 0 = 0. The carry is computed separately with a & b.',
      wrongFeedback: [
        'In binary addition, 1 + 1 = 10. XOR gives the right-hand digit (0) but drops the carry. What does XOR give you for every bit position?',
        'XOR is addition mod 2 per bit. It gives the digit, not the carry. You need a second operation to capture the carry.',
      ],
    },
    {
      id: 'carry-propagation',
      question: 'Carry occurs when both bits are 1: (a & b) gives carry positions. How do you propagate the carry to the next bit position?',
      options: [
        { label: 'OR the carry into the partial sum', isCorrect: false, feedback: 'OR would set bits at the carry positions rather than shift them. Carry from bit k must be added at bit k + 1 — that requires a left-shift, not OR.' },
        { label: 'Left-shift the carry by 1: (a & b) << 1', isCorrect: true },
        { label: 'Right-shift the carry by 1: (a & b) >> 1', isCorrect: false, feedback: 'Carry propagates upward to the next higher bit, not downward. A right-shift would move carry toward lower bits, which is the wrong direction.' },
        { label: 'XOR the carry with the partial sum directly', isCorrect: false, feedback: 'That would merge the carry back into the same bit position where it was generated. The carry must first be shifted left to reach the next bit, then XOR-ed with the partial sum there.' },
      ],
      correctFeedback: 'Carry from bit k must be added at bit k + 1. (a & b) << 1 shifts each carry one position left. Then XOR this carry into the partial sum — and repeat until there is no carry left.',
      wrongFeedback: [
        'When bit k generates a carry, it affects bit k + 1. What operation moves a bit one position to the left?',
        'Left-shift by 1 doubles a value, moving each bit one position higher. (a & b) << 1 puts carry bits exactly where they need to be applied next.',
      ],
    },
    {
      id: 'iteration-termination',
      question: 'The process repeats: partial_sum = a ^ b, carry = (a & b) << 1, then set a = partial_sum and b = carry. When does it stop?',
      options: [
        { label: 'After exactly 32 iterations', isCorrect: false, feedback: 'The number of iterations depends on how long carries propagate, not a fixed width. For a = 1, b = 2, carry disappears after one iteration. For numbers that generate cascading carries, it may take more steps.' },
        { label: 'When the carry becomes 0', isCorrect: true },
        { label: 'When a equals b', isCorrect: false, feedback: 'a equaling b is a coincidence, not a termination condition. After enough iterations, carry (stored in b) reaches 0 — that\'s the signal that no more propagation is needed.' },
        { label: 'When the partial sum stops changing', isCorrect: false, feedback: 'The partial sum changes at each step as carry is absorbed. The correct termination is when carry (b) is 0 — meaning all carries have been resolved and the partial sum is the final answer.' },
      ],
      correctFeedback: 'When b (the carry) is 0, there are no more bits to add — a holds the complete sum. For a = 1, b = 2: one XOR gives 3, one carry gives 0. Done in a single iteration.',
      wrongFeedback: [
        'Trace a = 1, b = 2: a ^ b = 3, (a & b) << 1 = 0. Set a = 3, b = 0. What is b now, and should you continue?',
        'The carry is stored in b after each step. When b = 0, there is nothing left to add. That\'s the loop invariant.',
      ],
    },
    {
      id: 'negative-numbers',
      question: 'The constraints include negative values (-1000 ≤ a, b ≤ 1000). In Python, integers have arbitrary precision, causing infinite carry loops for negatives. What solves this?',
      options: [
        { label: 'Convert to absolute value, add, restore sign', isCorrect: false, feedback: 'Sign restoration requires subtraction or addition, which you\'re not allowed to use. The correct fix is masking to a fixed bit width to simulate two\'s complement overflow.' },
        { label: 'Mask with 0xFFFFFFFF to simulate 32-bit integers', isCorrect: true },
        { label: 'Use Python\'s arbitrary precision as-is; it handles negatives', isCorrect: false, feedback: 'Python\'s arbitrary precision is the problem: carries for negative numbers propagate infinitely in Python because there\'s no fixed upper bit to stop them. You must impose a 32-bit boundary.' },
        { label: 'Handle negative inputs with a separate subtraction branch', isCorrect: false, feedback: 'Subtraction is explicitly forbidden. The approach is to simulate 32-bit two\'s complement arithmetic by masking with 0xFFFFFFFF, which handles both positive and negative inputs uniformly.' },
      ],
      correctFeedback: 'Apply & 0xFFFFFFFF at each step to keep values in 32-bit range. After the loop, if bit 31 is set (result > 0x7FFFFFFF), convert to a Python negative: result - 0x100000000.',
      wrongFeedback: [
        'In Python, -1 in binary is an infinite string of 1-bits. What mask would cap that to 32 bits?',
        '0xFFFFFFFF = 2³² − 1. ANDing with it discards any bits above position 31, simulating 32-bit overflow and preventing the infinite carry chain.',
      ],
    },
  ],
}
