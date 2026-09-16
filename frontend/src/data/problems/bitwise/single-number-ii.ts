export default {
  id: 'single-number-ii',
  title: 'Single Number II',
  difficulty: 'medium',
  description: 'Given an integer array where every element appears three times except for one, find the element that appears only once. Your algorithm must use O(1) extra space.',
  examples: [
    { input: 'nums = [2,2,3,2]', output: '3', explanation: '3 appears once; 2 appears three times.' },
    { input: 'nums = [0,1,0,1,0,1,99]', output: '99' },
  ],
  constraints: ['1 ≤ nums.length ≤ 3 × 10⁴', 'Every element appears exactly three times except one', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1'],
  starterCode: `class Solution:
    def single_number(self, nums):
        pass`,
  runnerSetup: 'single_number = Solution().single_number',
  functionName: 'single_number',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: 'Three pairs', args: [[2,2,3,2]], expected: 3 },
    { label: 'Larger', args: [[0,1,0,1,0,1,99]], expected: 99 },
    { label: 'Single element', args: [[7]], expected: 7 },
    { label: 'Negatives', args: [[-2,-2,-3,-2]], expected: -3 },
  ],
  bruteHint: 'One brute-force approach tallies each element\'s frequency in an auxiliary structure keyed by value, then scans it for the key with a count of one — O(n) time but O(n) space, since the structure can grow to hold one entry per unique element. That extra space is exactly what this problem forbids. What would you need to change to get the space down to O(1)?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'space-constraint',
      question: 'Explicit space constraints in a problem statement usually rule out the most obvious approach and point toward a leaner one. O(1) extra space is required. What does this rule out?',
      highlight: { location: 'description', text: 'Your algorithm must use O(1) extra space.' },
      options: [
        { label: 'Tallying each value\'s frequency in a structure that grows with the number of unique elements', isCorrect: true },
        { label: 'Using variables to track state', isCorrect: false, feedback: 'A constant number of integer variables is O(1) space. The constraint rules out structures that grow with input size — like a hash map with one entry per unique value.' },
        { label: 'Reading the array more than once', isCorrect: false, feedback: 'Multiple passes through the array are an O(n) time consideration, not space. The O(1) constraint is about memory, not the number of traversals.' },
        { label: 'Using bit operations on the elements', isCorrect: false, feedback: 'Bit operations work in-place on fixed-width integers — no extra memory allocation. They are exactly the kind of O(1)-space technique this constraint points toward.' },
      ],
      correctFeedback: 'A hash map counting frequencies would use O(n) space — one entry per unique element. The O(1) constraint forces a bit-level approach that accumulates information without extra allocation.',
      wrongFeedback: [
        'With up to 3 × 10⁴ elements, a frequency map could have up to 10,000 entries. Is that O(1)?',
        'O(1) space means a fixed amount regardless of input size. What structures grow with n that you must avoid?',
      ],
    },
    {
      id: 'why-xor-fails',
      question: 'Comparing a new problem to a similar one you\'ve already solved often reveals exactly which assumption breaks. In Single Number I, XOR worked because each duplicate appeared twice (a ^ a = 0). Why doesn\'t plain XOR work here?',
      highlight: { location: 'description', text: 'every element appears three times except for one' },
      options: [
        { label: 'XOR only handles positive integers', isCorrect: false, feedback: 'XOR works on all integers regardless of sign — it operates bit by bit on two\'s complement representations. The issue here is the count, not the sign.' },
        { label: 'Tripling doesn\'t cancel under XOR: a ^ a ^ a = a, not 0', isCorrect: true },
        { label: 'The array is too large for XOR to work efficiently', isCorrect: false, feedback: 'XOR over 3 × 10⁴ elements is trivially fast — it\'s a single O(n) pass. The problem with XOR isn\'t efficiency but the algebraic property: three copies don\'t cancel.' },
        { label: 'XOR requires a sorted array to cancel duplicates', isCorrect: false, feedback: 'XOR is commutative and associative — order doesn\'t matter. a ^ b ^ a = b regardless of position. The issue is that a ^ a ^ a = a, not 0.' },
      ],
      correctFeedback: 'a ^ a = 0, so two copies cancel. But a ^ a ^ a = (a ^ a) ^ a = 0 ^ a = a — three copies leave a residue. You need a counting mechanism that resets at 3, not at 2.',
      wrongFeedback: [
        'Trace XOR on [2, 2, 2]: 0 ^ 2 = 2, ^ 2 = 0, ^ 2 = 2. Three copies leave 2, not 0. What property of XOR means it can\'t cancel triples?',
        'XOR is addition mod 2 per bit. Mod 2 cancels pairs. To cancel triples you need arithmetic mod 3 — a different operation.',
      ],
    },
    {
      id: 'bit-count-mod-3',
      question: 'Exact repetition counts in a constraint often hint at the modular arithmetic you should apply. Every repeated element appears exactly three times. What happens to the total count of each bit position across the whole array?',
      highlight: { location: 'constraint', text: 'Every element appears exactly three times except one' },
      options: [
        { label: 'Each bit sum is always a multiple of 3', isCorrect: false, feedback: 'For bits in the tripled elements, yes — their contribution is a multiple of 3. But the single element contributes 0 or 1 to each bit position. So the total is either a multiple of 3 (if that bit of the single number is 0) or a multiple of 3 plus 1.' },
        { label: 'Each bit sum is divisible by 3, except bits set in the single number', isCorrect: true },
        { label: 'All bit counts are odd numbers', isCorrect: false, feedback: 'A bit appearing in k tripled elements contributes 3k — always even or odd depending on k, not necessarily odd. The key property is divisibility by 3, not parity.' },
        { label: 'Bit counts are random and reveal nothing', isCorrect: false, feedback: 'The exact-three guarantee makes bit counts structured. For any bit position, the tripled elements contribute a multiple of 3. The single element\'s contribution is what makes the sum not divisible by 3.' },
      ],
      correctFeedback: 'Sum each bit position across all n numbers. Tripled elements contribute 3k (divisible by 3) to each bit. The single number adds 0 or 1. So bit_sum % 3 == 1 precisely when that bit is set in the answer.',
      wrongFeedback: [
        'For a specific bit position, tripled elements contribute their bit value three times each. What property does that sum have?',
        'If every element except one appears three times, their bit contributions are multiples of 3. How does the remaining element\'s contribution affect the total mod 3?',
      ],
    },
    {
      id: 'ones-twos-state-machine',
      question: 'Naming the specific state variables an approach relies on is often the fastest way to understand its mechanics. One O(1)-space approach tracks two variables: ones (bits seen exactly once mod 3) and twos (bits seen exactly twice mod 3). What transition resets them?',
      options: [
        { label: 'When ones == twos, reset both to 0', isCorrect: false, feedback: 'ones and twos can be equal (both 0) at the start without needing a reset. The reset happens when a bit has been seen three times — the ones and twos variables together encode that state.' },
        { label: 'When a bit appears in both ones and twos, clear it from both', isCorrect: true },
        { label: 'Reset ones and twos every 3 elements', isCorrect: false, feedback: 'Elements in the array aren\'t grouped in threes — the same value\'s three copies could be spread anywhere. Resetting on element count instead of bit count would corrupt the state.' },
        { label: 'Merge twos directly into ones at every step', isCorrect: false, feedback: 'XORing twos into ones unconditionally would mix the two counts. The state machine must update ones and twos separately, then clear bits that have reached count 3.' },
      ],
      correctFeedback: 'After updating ones and twos for the new element, compute threes = ones & twos (bits seen 3 times), then clear them: ones &= ~threes, twos &= ~threes. At the end, ones holds the single number.',
      wrongFeedback: [
        'Trace [2, 2, 2]: after first 2, ones = 2, twos = 0. After second 2, ones = 0, twos = 2. After third 2, what should ones and twos be to reflect that 2 has appeared 3 times?',
        'A bit seen 3 times should vanish from both ones and twos. What mask lets you clear exactly those bits?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def single_number(self, nums):
        ones, twos = 0, 0
        for n in nums:
            ones = (ones ^ n) & ~twos
            twos = (twos ^ n) & ~ones
        return ones if ones < 2**31 else ones - 2**32`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'The final <code>ones - 2**32</code> adjustment is only needed because Python integers don\'t wrap at 32 bits on their own — <code>ones</code> is built as an unsigned bit pattern, so a value with the sign bit set has to be manually reinterpreted as negative to match the expected signed result.',
  solutionExplanation: '<code>ones</code> and <code>twos</code> track, bit by bit, whether each bit position has appeared exactly once or exactly twice among the numbers seen so far — a two-bit counter per position, counting modulo 3 (a third occurrence clears both, cycling back to "seen zero times" for that bit). Since every number except one appears exactly three times, every bit contributed by those triples cycles all the way back to zero, leaving only the singly-occurring number\'s bits sitting in <code>ones</code> once every element has been processed.',
}
