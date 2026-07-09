export default {
  id: 'minimum-length-after-deleting',
  title: 'Minimum Length of String After Deleting Similar Ends',
  difficulty: 'medium',
  description: 'Given a string <code>s</code> consisting only of characters \'a\', \'b\', and \'c\'. Apply the following operation any number of times: if the leftmost and rightmost characters are equal, remove them. Return the minimum length of the resulting string.',
  examples: [
    { input: 's = "ca"', output: '2', explanation: 'No operation possible.' },
    { input: 's = "cabaabac"', output: '0', explanation: 'Remove all via: c..c → a..a → b..b.' },
  ],
  constraints: ['1 ≤ s.length ≤ 10⁵', 's consists of \'a\', \'b\', \'c\''],
  starterCode: `def minimum_length(s):
  pass`,
  functionName: 'minimum_length',
  conceptId: 'two-pointers',
  testCases: [
    { label: 'No ops', args: ['ca'], expected: 2 },
    { label: 'Remove all', args: ['cabaabac'], expected: 0 },
    { label: 'All same', args: ['aaa'], expected: 0 },
    { label: 'Single', args: ['a'], expected: 1 },
  ],
  bruteHint: 'Describe repeatedly rescanning the string to remove adjacent matching pairs and why that\'s wasteful',
  optimizeHint: 'Name the structure that removes the top element whenever the current character matches it',
  clues: [
    {
      id: 'constraint-complexity',
      question: 's.length ≤ 10⁵. What does this tell you about acceptable complexity?',
      options: [
        { label: 'O(n) is needed; O(n²) is too slow', isCorrect: true },
        { label: 'O(n²) is fine for this size', isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion operations — too slow. Each removal step should advance both pointers by a constant amount, keeping the total work linear.' },
        { label: 'O(log n) is required because the string shrinks', isCorrect: false, feedback: 'The string shrinks during the process, but you still need to process each character at most once. O(log n) is not achievable here — O(n) is the target.' },
        { label: 'You should rebuild the string after each deletion', isCorrect: false, feedback: 'Rebuilding the string after each deletion is O(n) per operation and O(n²) total. Use two pointers that advance in place without creating new strings.' },
      ],
      correctFeedback: 'Each character is visited at most once as the left or right pointer advances. Two pointers give you O(n) with O(1) extra space.',
      wrongFeedback: [
        'How many times does each character need to be examined? If you rebuild the string after each step, how does cost accumulate over n operations?',
        'Think of two pointers moving inward. Each step, both advance at least one position. How many total steps can there be?',
      ],
    },
    {
      id: 'two-pointer-structure',
      question: 'The operation checks the leftmost and rightmost characters. What data structure naturally models this?',
      options: [
        { label: 'A stack that processes one end at a time', isCorrect: false, feedback: 'A stack gives you one end efficiently but not both ends simultaneously. You need to check and advance both the left and right boundaries at once.' },
        { label: 'Two pointers at the left and right ends moving inward', isCorrect: true },
        { label: 'A queue that dequeues from both ends', isCorrect: false, feedback: 'A deque supports O(1) removal from both ends, but you do not need to physically remove characters — just track boundaries with two integer indices.' },
        { label: 'Sort the string, then check ends', isCorrect: false, feedback: 'Sorting destroys the original order. The operation depends on which characters currently occupy the left and right ends of the remaining string.' },
      ],
      correctFeedback: 'Two integer indices left and right track the current boundaries. When s[left] == s[right], advance both inward. No new string allocation needed.',
      wrongFeedback: [
        'You need to check the current leftmost and rightmost positions. What is the simplest way to track "what is the active left end" and "what is the active right end"?',
        'Two integers — one index from the left, one from the right — let you simulate all deletions in O(n) without touching the original string.' ,
      ],
    },
    {
      id: 'multi-char-deletion',
      question: 'When s[left] == s[right], you remove all matching characters from both ends — not just one. What does "all matching" require?',
      options: [
        { label: 'Advance left and right by exactly one each time', isCorrect: false, feedback: 'Advancing by one per step would require another outer loop pass to handle "aaa...a" at both ends. One inner loop per matching pair removes all identical characters from each side in one go.' },
        { label: 'Keep advancing each pointer while the character matches the original end char', isCorrect: true },
        { label: 'Remove only the outermost character from each end', isCorrect: false, feedback: 'The operation removes the entire run of equal characters from each end. For "aaabaa", matching on \'a\': you advance left past all leading \'a\'s and right past all trailing \'a\'s before checking again.' },
        { label: 'Use a frequency count to remove all instances of the character', isCorrect: false, feedback: 'Frequency counts would remove non-contiguous occurrences in the middle, which is not allowed. Only contiguous matching characters at the current ends are removed.' },
      ],
      correctFeedback: 'When s[left] == s[right], advance left forward while s[left] equals that character, and advance right backward while s[right] equals it. This collapses an entire matching run in one pass.',
      wrongFeedback: [
        'For the string "aaacaaa", what happens at the first step? How many \'a\'s should be removed from the left? From the right?',
        'After confirming s[left] == s[right], use a while loop on each side to advance past all characters equal to s[left]. Where do the pointers stop?',
      ],
    },
    {
      id: 'termination-condition',
      question: 'The result can be 0 (entire string deleted) or a positive length. What condition ends the loop?',
      options: [
        { label: 'Stop when left > right or s[left] != s[right]', isCorrect: true },
        { label: 'Stop only when left == right', isCorrect: false, feedback: 'left == right means one character remains — but the pointers can also cross (left > right) when the entire string is consumed. You need to handle both cases.' },
        { label: 'Stop when the string length is odd', isCorrect: false, feedback: 'Parity has nothing to do with termination. "aaa" (odd length) deletes to 0. The loop ends on a pointer-crossing or mismatch, not on length parity.' },
        { label: 'Stop after exactly n/2 iterations', isCorrect: false, feedback: 'The number of iterations depends on when a mismatch occurs, not the initial length. A mismatch at the very first step gives 0 iterations; all-same strings use n/2 steps.' },
      ],
      correctFeedback: 'The loop continues while left < right and s[left] == s[right]. The answer is max(0, right − left + 1) after the loop — 0 when left ≥ right.',
      wrongFeedback: [
        'Two things can end the process: the ends no longer match, or there are no characters left. How do you detect each with two pointers?',
        'After the loop, left and right define the remaining window. What is the length of that window when left > right versus when left == right?',
      ],
    },
  ],
}
