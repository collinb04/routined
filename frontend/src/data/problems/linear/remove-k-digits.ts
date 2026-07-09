export default {
  id: 'remove-k-digits',
  title: 'Remove K Digits',
  difficulty: 'medium',
  description: 'Given a non-negative integer <code>num</code> as a string and an integer <code>k</code>, remove <code>k</code> digits to make the smallest possible number. Return the result as a string (no leading zeros).',
  examples: [
    { input: 'num = "1432219", k = 3', output: '"1219"', explanation: 'Remove 4, 3, 2 to get 1219.' },
    { input: 'num = "10200", k = 1', output: '"200"', explanation: 'Remove 1 to get 0200 → "200".' },
    { input: 'num = "10", k = 2', output: '"0"' },
  ],
  constraints: ['1 ≤ k ≤ num.length ≤ 10⁵', 'num consists of digits only', 'num does not have leading zeros except "0"'],
  starterCode: `def remove_k_digits(num, k):
  pass`,
  functionName: 'remove_k_digits',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'Remove 3', args: ['1432219',3], expected: '1219' },
    { label: 'Leading zero', args: ['10200',1], expected: '200' },
    { label: 'Remove all', args: ['10',2], expected: '0' },
    { label: 'Already min', args: ['123',1], expected: '12' },
  ],
  bruteHint: 'Describe trying every combination of k digit removals and comparing the results, and explain why that is exponential',
  optimizeHint: 'Name the structure that maintains increasing digits, popping larger ones when a smaller digit appears and removals remain',
  clues: [
    {
      id: 'constraint-input-size',
      question: 'num.length ≤ 10⁵ tells you…',
      options: [
        { label: 'O(n²) is acceptable — 10¹⁰ is fine', isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion operations — completely infeasible. You need an approach that processes each digit a constant number of times.' },
        { label: 'O(n) is needed — each digit processed once', isCorrect: true },
        { label: 'O(n log n) is required due to sorting', isCorrect: false, feedback: 'Sorting digits would destroy their positional meaning — you cannot rearrange digits, only remove them. No sorting step is needed.' },
        { label: 'Input size does not constrain the approach', isCorrect: false, feedback: 'n = 100,000 directly eliminates O(n²) approaches. Input size is always the first signal about what complexity is acceptable.' },
      ],
      correctFeedback: 'n = 100,000 makes O(n²) infeasible. You need each digit to be pushed and popped at most once, giving O(n) total — exactly what a monotonic stack provides.',
      wrongFeedback: [
        'If removing each digit requires scanning backward to find what to remove, what is the total cost across all n digits?',
        'O(n) per digit × n digits = O(n²) at 10 billion operations for n = 10⁵. You need each digit touched at most a constant number of times.',
      ],
    },
    {
      id: 'which-digit-to-remove',
      question: 'To minimize the number, which digit should you remove first when given a choice?',
      options: [
        { label: 'The largest digit in the entire number', isCorrect: false, feedback: 'Removing the global maximum does not always minimize the result. The position of the digit matters — a large digit early on is more harmful than a large digit at the end.' },
        { label: 'The leftmost digit that is greater than the one following it', isCorrect: true },
        { label: 'The rightmost digit', isCorrect: false, feedback: 'Removing the rightmost digit only helps if the number is already non-increasing. In general, a "peak" — a digit larger than its successor — is the first target.' },
        { label: 'Any digit at random', isCorrect: false, feedback: 'The choice is not arbitrary. Removing a digit that is larger than its successor reduces the most significant position available, producing the smallest result.' },
      ],
      correctFeedback: 'A digit larger than its right neighbor creates a local peak. Removing it lets the smaller digit take that position, reducing the number at the highest available place value.',
      wrongFeedback: [
        'In "1432219", removing 4 gives 132219 and removing 1 gives 432219. Which is smaller? What property of 4 made it the right choice?',
        '4 > 3, so 4 is a "peak" relative to its right neighbor. Removing a digit that is larger than what follows it always reduces the number at the most significant available position.',
      ],
    },
    {
      id: 'leading-zeros',
      question: '"Return the result as a string (no leading zeros)." When does this situation arise?',
      options: [
        { label: 'When the input contains a zero', isCorrect: false, feedback: 'A zero in the middle does not cause a leading zero unless it ends up at position 0 after removals. Leading zeros only matter for the final output string.' },
        { label: 'When removals leave zeros at the front of the result', isCorrect: true },
        { label: 'When k equals num.length', isCorrect: false, feedback: 'Removing all digits is a separate edge case that returns "0". Leading zeros are a concern when the result has remaining digits but starts with zero.' },
        { label: 'Only when the input has two or more zeros', isCorrect: false, feedback: 'A single zero can become a leading zero after enough removals. The number of zeros in the input is not what matters — it is their position in the result.' },
      ],
      correctFeedback: 'After building the result, strip leading zeros from the left. If stripping leaves an empty string, return "0". The example "10200" with k=1 removes 1, giving "0200" → "200".',
      wrongFeedback: [
        'In the example "10200", k=1: after removing 1 you have "0200". What must happen before returning that as the answer?',
        'The stack-built result may start with zeros if early removals exposed them. Strip leading zeros from the front of the final string, then return "0" if the result is now empty.',
      ],
    },
    {
      id: 'k-exhausted-guarantee',
      question: 'What if k removals are used up before you reach a peak (e.g., num = "123", k = 1)?',
      options: [
        { label: 'The algorithm fails — you must always find a peak', isCorrect: false, feedback: 'No failure occurs. When k reaches 0, you simply stop popping. For "123" with k=1, no digit exceeds its successor, so you remove the last digit and return "12".' },
        { label: 'Truncate the remaining digits to length n−k from the left', isCorrect: true },
        { label: 'Return the original number unchanged', isCorrect: false, feedback: 'You must still remove k digits. If no peak is found, the number is non-decreasing, so removing from the right end is optimal — giving the prefix of length n−k.' },
        { label: 'Sort the remaining digits ascending', isCorrect: false, feedback: 'Sorting rearranges digits, which is not allowed — you can only remove digits, not reorder them.' },
      ],
      correctFeedback: 'A non-decreasing number has no beneficial peak to remove. Each removal should take the rightmost digit (the least significant), leaving the n−k digit prefix. This is equivalent to truncating the stack to length n−k.',
      wrongFeedback: [
        'For "123" with k=1, no digit is greater than its successor. You still must remove 1 digit. Which removal hurts the number the least?',
        'When the number is non-decreasing, removing from the right end changes the least significant digit. The result is just the first n−k digits of the stack.',
      ],
    },
  ],
}
