export default {
  id: 'longest-common-prefix',
  title: 'Longest Common Prefix',
  difficulty: 'easy',
  description: 'Write a function to find the longest common prefix string among an array of strings. Return an empty string if there is no common prefix.',
  examples: [
    { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
    { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: 'No common prefix.' },
  ],
  constraints: ['1 ≤ strs.length ≤ 200', '0 ≤ strs[i].length ≤ 200', 'strs[i] consists of lowercase English letters'],
  starterCode: `def longest_common_prefix(strs):
  pass`,
  functionName: 'longest_common_prefix',
  conceptId: 'strings',
  testCases: [
    { label: '"fl"', args: [['flower','flow','flight']], expected: 'fl' },
    { label: 'No prefix', args: [['dog','racecar','car']], expected: '' },
    { label: 'Single string', args: [['alone']], expected: 'alone' },
    { label: 'All same', args: [['aa','aa','aa']], expected: 'aa' },
  ],
  clues: [
    {
      id: 'prefix-is-constrained-by-shortest',
      question: 'The common prefix cannot be longer than the shortest string. What does this tell you about which string to anchor your comparison to?',
      options: [
        { label: 'Compare every string to every other string', isCorrect: false, feedback: 'Comparing all pairs is O(n² × L). You don\'t need all pairs — any single string serves as the anchor, and the shortest is the tightest bound you can use.' },
        { label: 'Use the shortest string as the candidate prefix', isCorrect: true },
        { label: 'Use the longest string as the anchor', isCorrect: false, feedback: 'The longest string has characters that can\'t be part of the common prefix (the shorter strings don\'t have them). Starting with the shortest avoids checking positions that can never match.' },
        { label: 'Sort the strings first', isCorrect: false, feedback: 'Sorting is not needed. The common prefix is determined by character-by-character agreement across all strings, not by lexicographic order.' },
      ],
      correctFeedback: 'The shortest string is the upper bound on prefix length. You can use the first string as your candidate and trim it whenever a mismatch is found — that effectively anchors to the minimum.',
      wrongFeedback: [
        'If one string has length 3, can the common prefix ever be longer than 3? Which string imposes the tightest limit?',
        'Any character beyond position min(len) can\'t be in the prefix. Which string\'s length gives that minimum bound?',
      ],
    },
    {
      id: 'early-termination',
      question: 'If any string does not start with the current candidate prefix, what should you do?',
      options: [
        { label: 'Skip that string and continue', isCorrect: false, feedback: 'The common prefix must be shared by every string — you cannot skip one that doesn\'t match. A mismatch means the current candidate is too long and must be trimmed.' },
        { label: 'Shorten the candidate and restart from the first string', isCorrect: false, feedback: 'Restarting from the first string after each trim is correct in logic but O(n × L) in practice per trim step. You can shorten the candidate by one character and resume from the mismatching string.' },
        { label: 'Trim the candidate to the mismatch point and continue', isCorrect: true },
        { label: 'Return the empty string immediately', isCorrect: false, feedback: 'Returning empty on the first mismatch is too aggressive — the prefix may still be non-empty. A mismatch at position k means the prefix is at most k characters; it could still be 1 or 2.' },
      ],
      correctFeedback: 'When a mismatch occurs at position k, trim the candidate to its first k characters and continue scanning. If the candidate ever becomes empty, return "" immediately.',
      wrongFeedback: [
        'A mismatch at position k tells you exactly how long the prefix can be. Do you need to go back to earlier strings after trimming?',
        'After trimming to length k, earlier strings that matched a longer prefix also match the shorter one. So you only need to continue from where the mismatch was found.',
      ],
    },
    {
      id: 'single-string-case',
      question: '"1 ≤ strs.length ≤ 200" — the array always has at least one string. What is the common prefix of a single-element array?',
      options: [
        { label: 'An empty string', isCorrect: false, feedback: 'An empty string would only be correct if the single string is itself empty. The common prefix of ["alone"] is "alone" — the string is a prefix of itself.' },
        { label: 'The string itself', isCorrect: false },
        { label: 'The entire string (it is its own prefix)', isCorrect: true },
        { label: 'Undefined — prefix requires at least two strings', isCorrect: false, feedback: 'The problem guarantees at least one string and asks for the common prefix. A single string is trivially a prefix of itself — no comparison is needed.' },
      ],
      correctFeedback: 'With one string, there are no other strings to disagree with. The string is its own longest common prefix. Your algorithm handles this naturally: zero comparisons are made, and the initial candidate is returned unchanged.',
      wrongFeedback: [
        'The algorithm starts with the first string as the candidate. If there are no other strings to compare against, what gets returned?',
        'A prefix must be shared by all strings. With only one string, every prefix of it qualifies — so the longest is the string itself.',
      ],
    },
  ],
}
