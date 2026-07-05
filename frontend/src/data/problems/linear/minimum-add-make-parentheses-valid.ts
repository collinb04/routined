export default {
  id: 'minimum-add-make-parentheses-valid',
  title: 'Minimum Add to Make Parentheses Valid',
  difficulty: 'medium',
  description: 'A parentheses string is valid if every open bracket has a matching close bracket. Given a string of parentheses, return the minimum number of additions to make it valid.',
  examples: [
    { input: 's = "())"', output: '1', explanation: 'Add one open bracket.' },
    { input: 's = "((("', output: '3', explanation: 'Add three close brackets.' },
  ],
  constraints: ['1 ≤ s.length ≤ 1000', 's[i] is either \'(\' or \')\''],
  starterCode: `def min_add_to_make_valid(s):
  pass`,
  functionName: 'min_add_to_make_valid',
  conceptId: 'strings',
  testCases: [
    { label: 'One extra close', args: ['())'], expected: 1 },
    { label: 'Three opens', args: ['((('], expected: 3 },
    { label: 'Valid', args: ['()'], expected: 0 },
    { label: 'Mixed', args: ['()))(('], expected: 4 },
  ],
  clues: [
    {
      id: 'output-type',
      question: 'The output is a count of additions, not the corrected string. What does that mean for your approach?',
      options: [
        { label: 'Build the corrected string, then measure it', isCorrect: false, feedback: 'Constructing the result and measuring it works, but the output only needs a count — you can track unmatched brackets directly without building anything.' },
        { label: 'Count unmatched brackets directly', isCorrect: true },
        { label: 'Return all possible corrected strings', isCorrect: false, feedback: 'Generating all valid strings would be exponential. The output is a single integer — the minimum count.' },
        { label: 'Sort brackets to find mismatches', isCorrect: false, feedback: 'Sorting destroys positional order, and parenthesis matching is order-dependent — a close bracket is only valid after a matching open.' },
      ],
      correctFeedback: 'You only need to count how many brackets are unmatched at the end. Two counters — unmatched opens and unmatched closes — are sufficient.',
      wrongFeedback: [
        'You need a count, not a string. What is the minimum information you need to track while scanning to arrive at that count?',
        'Each addition corresponds to one unmatched bracket. Can you count unmatched opens and closes in a single pass?',
      ],
    },
    {
      id: 'close-bracket-ordering',
      question: 'A \')\' without a preceding \'(\' cannot be matched later. What does this imply about how you process characters?',
      options: [
        { label: 'Collect all brackets, then match greedily', isCorrect: false, feedback: 'Collecting first loses the left-to-right ordering that determines which close brackets are unmatched.' },
        { label: 'Process left to right; unmatched \')\' is immediately counted', isCorrect: true },
        { label: 'Process right to left for close brackets', isCorrect: false, feedback: 'Right-to-left reverses the matching rule. A \')\' is only matched by an earlier \'(\', so left-to-right is the correct direction.' },
        { label: 'Match from the middle outward', isCorrect: false },
      ],
      correctFeedback: 'A \')\' that arrives with no open bracket waiting is immediately unmatched — no future character can fix it. Count it and move on.',
      wrongFeedback: [
        'If you see \')\' and there is no pending \'(\', can anything to the right rescue it? What does that tell you about when to count it?',
        'Unmatched close brackets are discovered instantly as you scan left to right. Track open brackets with a counter and increment your answer when a close arrives with none waiting.',
      ],
    },
    {
      id: 'string-length-constraint',
      question: 's.length ≤ 1000. What complexity does this permit?',
      options: [
        { label: 'O(n²) or worse is fine', isCorrect: true },
        { label: 'O(n log n) is required', isCorrect: false, feedback: 'A string of length 1,000 can tolerate much worse than O(n log n). This constraint is quite small.' },
        { label: 'O(1) extra space is required', isCorrect: false, feedback: 'The constraint is on string length, not space. It says nothing about forcing constant space.' },
        { label: 'O(n) is the only viable approach', isCorrect: false, feedback: 'O(n) is ideal, but n = 1,000 means even an O(n²) approach (1 million ops) is trivially fast.' },
      ],
      correctFeedback: 'At n = 1,000, even O(n²) is 1 million operations — instant. The problem is easy to solve in O(n) regardless, but the constraint imposes no pressure here.',
      wrongFeedback: [
        'With n at most 1,000, how many operations does O(n²) entail? Is that a problem?',
        'n = 1,000 is a very small bound. Focus on correctness — almost any reasonable approach will fit within it.',
      ],
    },
  ],
}
