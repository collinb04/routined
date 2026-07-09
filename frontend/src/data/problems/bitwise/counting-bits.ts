export default {
  id: 'counting-bits',
  title: 'Counting Bits',
  difficulty: 'easy',
  description: 'Given an integer <code>n</code>, return an array <code>ans</code> of length <code>n + 1</code> such that for each <code>i</code> (0 ≤ i ≤ n), <code>ans[i]</code> is the number of 1-bits in the binary representation of <code>i</code>.',
  examples: [
    { input: 'n = 2', output: '[0,1,1]', explanation: '0→0, 1→1, 2→10.' },
    { input: 'n = 5', output: '[0,1,1,2,1,2]', explanation: '0→0, 1→1, 2→1, 3→2, 4→1, 5→2.' },
  ],
  constraints: ['0 ≤ n ≤ 10⁵', 'Must solve in O(n) time and O(1) extra space (excluding output)'],
  starterCode: `def count_bits(n):
  pass`,
  functionName: 'count_bits',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: 'n=2', args: [2], expected: [0,1,1] },
    { label: 'n=5', args: [5], expected: [0,1,1,2,1,2] },
    { label: 'n=0', args: [0], expected: [0] },
    { label: 'n=4', args: [4], expected: [0,1,1,2,1] },
  ],
  bruteHint: 'Describe computing each number\'s bit count from scratch, and its time complexity',
  optimizeHint: 'Name the recurrence that lets each entry reuse an already-computed smaller result',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'The constraint says O(n) time and O(1) extra space. What does this rule out?',
      options: [
        { label: 'Counting bits fresh for each number', isCorrect: false, feedback: 'Counting bits for every number from scratch takes O(n log n) — each number up to n has up to log n bits. The O(n) requirement rules that out.' },
        { label: 'Reusing previously computed bit counts', isCorrect: true },
        { label: 'Using any bit operations at all', isCorrect: false, feedback: 'Bit operations are not the issue — this is a bit-manipulation problem. The constraint is about how much redundant work you do across the n + 1 numbers.' },
        { label: 'Allocating the output array', isCorrect: false, feedback: 'The constraint explicitly says O(1) extra space "excluding output." The output array is allowed; it\'s auxiliary structures like a hash map that are ruled out.' },
      ],
      correctFeedback: 'Recomputing from scratch for each of n + 1 numbers is O(n log n). The O(n) bound means each number\'s bit count must build on a result you\'ve already stored.',
      wrongFeedback: [
        'If you count bits from scratch for every i from 0 to n, how many total bit-inspection steps do you take?',
        'The constraint targets redundant work. What earlier result could tell you the bit count of i without starting from zero?',
      ],
    },
    {
      id: 'output-structure',
      question: 'The output is an array of length n + 1, with ans[i] = bit count of i. What does this structure suggest?',
      options: [
        { label: 'Sort numbers by their bit count', isCorrect: false, feedback: 'Sorting would destroy the index relationship — ans[i] must correspond to i. The array structure is precisely preserving that index.' },
        { label: 'Compute each value independently', isCorrect: false, feedback: 'Independence would require O(n log n) total work, violating the O(n) constraint. The array is there so each entry can reference earlier entries.' },
        { label: 'Build results iteratively, referencing earlier entries', isCorrect: true },
        { label: 'Use a hash map from number to bit count', isCorrect: false, feedback: 'A hash map would use O(n) extra space, violating the O(1) constraint. The output array itself is the storage — you can index into it directly.' },
      ],
      correctFeedback: 'ans[i] is already computed before you need ans[i+1]. The array is both output and lookup table — each new entry can reuse an earlier one in O(1).',
      wrongFeedback: [
        'You have ans[0] through ans[i-1] already filled in when computing ans[i]. Could any of those earlier values help?',
        'Think about the relationship between a number and a smaller number you\'ve already processed. How do their bit counts relate?',
      ],
    },
    {
      id: 'bit-relationship',
      question: 'Consider how i and i >> 1 (i right-shifted by one) relate in binary. What does this reveal?',
      options: [
        { label: 'i >> 1 always has one more 1-bit', isCorrect: false, feedback: 'Right-shifting removes the least-significant bit, so i >> 1 has at most the same number of 1-bits as i, never more.' },
        { label: 'i >> 1 has exactly the same 1-bits as i', isCorrect: false, feedback: 'Right-shifting drops the least-significant bit, which may or may not be a 1. The counts can differ by 0 or 1.' },
        { label: 'bit_count(i) = bit_count(i >> 1) + (i & 1)', isCorrect: true },
        { label: 'The relationship only holds for even numbers', isCorrect: false, feedback: 'The relationship holds for all non-negative integers. The last bit (i & 1) is 0 for even numbers and 1 for odd ones — both cases are handled by the same formula.' },
      ],
      correctFeedback: 'Right-shifting drops the last bit. Whatever that bit\'s value (0 or 1), i & 1 captures it. Since i >> 1 < i, its count is already in ans — so ans[i] = ans[i >> 1] + (i & 1) is O(1) per entry.',
      wrongFeedback: [
        'Write out a few numbers in binary: 4 = 100, 5 = 101. What is 5 >> 1? How do their 1-bit counts compare?',
        'Think of i\'s binary digits as i >> 1\'s digits plus one trailing bit. What operation isolates that trailing bit?',
      ],
    },
    {
      id: 'base-case',
      question: 'The range starts at 0. What is ans[0], and why does it matter?',
      options: [
        { label: 'ans[0] = 1, since 0 is a valid number', isCorrect: false, feedback: '0 in binary is all zeros — it has no 1-bits. ans[0] = 0, not 1.' },
        { label: 'ans[0] = 0; the recurrence builds from here', isCorrect: true },
        { label: 'ans[0] is undefined; the loop starts at 1', isCorrect: false, feedback: 'The problem requires ans of length n + 1 covering 0 through n. ans[0] must be included and equals 0.' },
        { label: 'ans[0] can be any value; only later entries matter', isCorrect: false, feedback: 'Later entries reference earlier ones — ans[i >> 1] eventually bottoms out at ans[0]. A wrong base case propagates errors through every dependent entry.' },
      ],
      correctFeedback: '0 has no 1-bits, so ans[0] = 0. Every subsequent ans[i] traces back through the recurrence to this base case, so initializing it correctly is essential.',
      wrongFeedback: [
        'What is 0 in binary? Count the 1-bits.',
        'The recurrence for ans[i] references ans[i >> 1]. Trace that chain for small i — where does it eventually land?',
      ],
    },
  ],
}
