export default {
  id: 'number-of-1-bits',
  title: 'Number of 1 Bits',
  difficulty: 'easy',
  description: 'Given a positive integer <code>n</code>, return the number of set bits (1s) in its binary representation (also known as the Hamming weight).',
  examples: [
    { input: 'n = 11', output: '3', explanation: '11 in binary is 1011, which has three 1-bits.' },
    { input: 'n = 128', output: '1', explanation: '128 is 10000000, which has one 1-bit.' },
  ],
  constraints: ['1 ≤ n ≤ 2³¹ − 1'],
  starterCode: `def hammingWeight(n):
  pass`,
  functionName: 'hammingWeight',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: '11 → 3 bits', args: [11], expected: 3 },
    { label: '128 → 1 bit', args: [128], expected: 1 },
    { label: 'Max 32-bit', args: [2147483647], expected: 31 },
    { label: 'Zero bits... n=1', args: [1], expected: 1 },
  ],
  bruteHint: 'Describe checking all 32 bit positions one by one, and why it\'s already fairly efficient',
  optimizeHint: 'Name the bit trick that lets each iteration jump straight to the next set bit',
  clues: [
    {
      id: 'constraint-range',
      question: 'n ≤ 2³¹ − 1 tells you the input fits in a 32-bit unsigned integer. What does this bound the output to?',
      options: [
        { label: 'At most 31 set bits', isCorrect: true },
        { label: 'At most 32 set bits', isCorrect: false, feedback: 'The constraint is 2³¹ − 1, which is 31 ones in binary (0111…1). A full 32-bit unsigned integer (2³² − 1) would have 32 set bits, but the input is bounded below that.' },
        { label: 'Exactly 32 bits always', isCorrect: false, feedback: 'The number of set bits varies — 128 has exactly one, 11 has three. The constraint bounds the maximum possible, not the exact count for any input.' },
        { label: 'The output can be arbitrarily large', isCorrect: false, feedback: 'With a fixed 32-bit input, the output is bounded by the number of bits. At most 31 bits can be set given the constraint n ≤ 2³¹ − 1.' },
      ],
      correctFeedback: '2³¹ − 1 in binary is 0111…1 — thirty-one 1-bits. So the answer is always between 0 and 31, and the algorithm needs exactly 31 bit checks at most.',
      wrongFeedback: [
        'Write 2³¹ − 1 in binary. How many 1s does it have?',
        '2³¹ − 1 = 0111 1111 … 1111 (31 ones). That\'s the maximum set-bit count for any valid input.',
      ],
    },
    {
      id: 'bit-inspection-method',
      question: 'You need to inspect each bit of n. What operation isolates the lowest set bit?',
      options: [
        { label: 'n % 2 checks the lowest bit; shift right to advance', isCorrect: false, feedback: 'n % 2 works but is a division-based approach. The bitwise equivalent is n & 1, which is faster and more idiomatic for bit-counting. Both iterate through bits — the bitwise form is standard.' },
        { label: 'n & 1 checks the lowest bit; n >>= 1 advances', isCorrect: true },
        { label: 'n & n − 1 counts all bits at once', isCorrect: false, feedback: 'n & (n − 1) clears the lowest set bit — it doesn\'t count all bits at once. It\'s useful in a loop: each application removes one set bit, so the number of iterations equals the Hamming weight.' },
        { label: 'n ^ n counts set bits by cancellation', isCorrect: false, feedback: 'n ^ n is always 0 — XOR of a value with itself cancels everything. That\'s a subtraction trick, not a counting mechanism.' },
      ],
      correctFeedback: 'n & 1 isolates the least significant bit (0 or 1). After checking it, n >>= 1 shifts all bits right, bringing the next bit into position. Repeat 31 times to cover all bits.',
      wrongFeedback: [
        'To inspect one bit at a time, you need two things: a way to read the current lowest bit, and a way to move to the next. What bitwise operations do those jobs?',
        'AND with 1 reads the lowest bit. Right-shift discards it and exposes the next. Together they let you scan all bits one by one.',
      ],
    },
    {
      id: 'kernighan-trick',
      question: 'n & (n − 1) clears the lowest set bit of n. How does this lead to a faster bit-counting loop?',
      options: [
        { label: 'Loop 32 times regardless; count 1s found', isCorrect: false, feedback: 'Looping exactly 32 times checks every bit position — that\'s the straightforward approach. n & (n − 1) is faster because it only iterates once per set bit, skipping zero bits entirely.' },
        { label: 'Loop only as many times as there are set bits', isCorrect: true },
        { label: 'n & (n − 1) returns the count directly', isCorrect: false, feedback: 'n & (n − 1) is a single operation that modifies n — it doesn\'t return a count. You use it in a loop, incrementing a counter each time, until n reaches 0.' },
        { label: 'Subtract 1 in a loop until n is 0; count subtractions', isCorrect: false, feedback: 'Subtracting 1 repeatedly would take n iterations for large n, not popcount(n) iterations. n & (n − 1) works differently — it jumps directly to clearing the next set bit.' },
      ],
      correctFeedback: 'Each application of n &= (n − 1) removes exactly one set bit. The loop runs exactly popcount(n) times — for sparse inputs like 128 (one set bit), it terminates in one iteration instead of 32.',
      wrongFeedback: [
        'If n = 128 (binary: 10000000), how many iterations does a 32-step loop use? How many does a loop based on n &= (n − 1) use?',
        'n & (n − 1) jumps from set bit to set bit, skipping zero bits entirely. For n = 128, one iteration reaches 0. For n = 2³¹ − 1, it takes 31 iterations.',
      ],
    },
  ],
}
