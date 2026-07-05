export default {
  id: 'reverse-bits',
  title: 'Reverse Bits',
  difficulty: 'easy',
  description: 'Reverse the bits of a given 32-bit unsigned integer and return the result.',
  examples: [
    { input: 'n = 43261596', output: '964176192', explanation: 'Binary 00000010100101000001111010011100 reversed is 00111001011110000010100101000000.' },
    { input: 'n = 4294967293', output: '3221225471', explanation: 'Binary 11111111111111111111111111111101 reversed is 10111111111111111111111111111111.' },
  ],
  constraints: ['Input is a 32-bit unsigned integer'],
  starterCode: `def reverse_bits(n):
  pass`,
  functionName: 'reverse_bits',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: 'Standard case', args: [43261596], expected: 964176192 },
    { label: 'All ones minus one', args: [4294967293], expected: 3221225471 },
    { label: 'Zero', args: [0], expected: 0 },
    { label: 'One', args: [1], expected: 2147483648 },
  ],
  clues: [
    {
      id: 'fixed-width-constraint',
      question: 'The input is a 32-bit unsigned integer. What does the fixed width mean for your loop?',
      options: [
        { label: 'Loop until n becomes 0', isCorrect: false, feedback: 'Stopping when n reaches 0 would drop trailing zero bits. For a 32-bit integer, those zeros are significant bit positions — 1 reversed must become 10000000…0 (bit 31 set), not 1.' },
        { label: 'Always process exactly 32 bit positions', isCorrect: true },
        { label: 'Loop log₂(n) times to cover set bits', isCorrect: false, feedback: 'log₂(n) gives the position of the highest set bit, not the total bit width. With a fixed 32-bit representation, you must account for all 32 positions including leading zeros.' },
        { label: 'Process bits until the output stabilizes', isCorrect: false, feedback: 'There\'s no stabilization condition here. You need to process all 32 positions once — stopping early or late produces a wrong result for inputs like 1 (which reverses to 2147483648).' },
      ],
      correctFeedback: 'The input is always 32 bits wide, including leading zeros. Processing exactly 32 positions places each bit into its mirror position in the output.',
      wrongFeedback: [
        'n = 1 in binary is 00000000000000000000000000000001. Its reverse is 10000000000000000000000000000000 = 2147483648. How many bit positions must you process to get there?',
        'If you stop when n becomes 0, you stop after the first iteration for n = 1, placing bit 0 into bit 0 of the result. But it should land in bit position 31. The width is always 32.',
      ],
    },
    {
      id: 'bit-extraction-and-placement',
      question: 'To reverse bits, you extract each bit from n and place it in the mirror position of the result. What operations handle extraction and placement?',
      options: [
        { label: 'Extract with n & 1, place by shifting result left and ORing', isCorrect: true },
        { label: 'Extract with n >> 1, place by ANDing into result', isCorrect: false, feedback: 'n >> 1 shifts out all bits at once — it doesn\'t extract a single bit. AND also can\'t set bits; it can only clear them. You need & 1 to read a bit and | to write one.' },
        { label: 'Use modulo to extract, division to place', isCorrect: false, feedback: 'Modulo and division work numerically but are slower than their bitwise equivalents (& 1 and >> 1). More importantly, placement into the result requires shifting and OR, not division.' },
        { label: 'XOR corresponding bit positions directly', isCorrect: false, feedback: 'XOR toggles bits — it\'s useful for swapping two bits in place, but only if you already know both positions. Here you\'re building the result from scratch, which requires OR to set each bit.' },
      ],
      correctFeedback: 'Each iteration: shift result left (<<= 1) to make room, OR in the current lowest bit of n (result |= n & 1), then shift n right (n >>= 1) to expose the next bit. Repeat 32 times.',
      wrongFeedback: [
        'Think about two things separately: how do you read the least significant bit of n? And how do you write a bit into the result at the current highest available position?',
        'n & 1 reads the lowest bit. To append it to the result, shift the result left first to open a slot, then OR in the bit. n >>= 1 advances to the next input bit.',
      ],
    },
    {
      id: 'output-scale',
      question: 'The test case shows n = 1 (binary: 00…001) produces 2147483648. What does 2147483648 represent in binary?',
      options: [
        { label: '2147483648 = 2³¹, so bit 31 is set (10000…0)', isCorrect: true },
        { label: '2147483648 is a sentinel for "no set bits"', isCorrect: false, feedback: '2147483648 is a valid output — it\'s 2³¹, which is 1 followed by 31 zeros in binary. It\'s the correct result of reversing a 32-bit integer that has only bit 0 set.' },
        { label: '2147483648 means the output overflowed', isCorrect: false, feedback: 'The output is a 32-bit unsigned integer, and 2³¹ fits within that range. Overflow would only occur if the result exceeded 2³² − 1.' },
        { label: '2147483648 = 2³², the maximum 32-bit unsigned value', isCorrect: false, feedback: '2³² is 4294967296 — one more than the maximum 32-bit unsigned value. 2147483648 is 2³¹, which is the value with only bit 31 set.' },
      ],
      correctFeedback: '1 in 32-bit binary is 00…001 (bit 0 set). Reversed, bit 0 moves to position 31, giving 10…000 = 2³¹ = 2147483648. This confirms you must process all 32 positions.',
      wrongFeedback: [
        'Bit 0 in a 32-bit integer mirrors to bit 31 when reversed. What is the value of an integer with only bit 31 set?',
        '2³¹ = 2147483648. That\'s the value with a single 1 in the highest bit position of a 32-bit unsigned integer.',
      ],
    },
  ],
}
