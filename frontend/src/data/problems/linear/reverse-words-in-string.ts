export default {
  id: 'reverse-words-in-string',
  title: 'Reverse Words in a String',
  difficulty: 'medium',
  description: 'Given a string <code>s</code>, reverse the order of the words. Words are separated by spaces, and the result should have no leading/trailing spaces and only single spaces between words.',
  examples: [
    { input: 's = "the sky is blue"', output: '"blue is sky the"' },
    { input: 's = "  hello world  "', output: '"world hello"', explanation: 'Leading/trailing spaces removed.' },
  ],
  constraints: ['1 ≤ s.length ≤ 10⁴', 's contains English letters, digits, or spaces', 'At least one word exists'],
  starterCode: `class Solution:
    def reverse_words(self, s):
        pass`,
  runnerSetup: 'reverse_words = Solution().reverse_words',
  functionName: 'reverse_words',
  conceptId: 'strings',
  testCases: [
    { label: 'Normal sentence', args: ['the sky is blue'], expected: 'blue is sky the' },
    { label: 'Extra spaces', args: ['  hello world  '], expected: 'world hello' },
    { label: 'Single word', args: ['a'], expected: 'a' },
  ],
  bruteHint: 'One brute-force approach walks the string character by character, manually collecting each word by hand instead of using split/join helpers, then builds the reversed result by repeatedly concatenating words onto a new string. Each concatenation onto an immutable string creates a fresh copy, so rebuilding across all words can cost O(n²) time in the worst case. Why does repeatedly prepending onto a string get more expensive as the input grows, and how might you avoid paying that cost over and over?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'output-word-order',
      question: 'Knowing exactly what a transformation must preserve tells you which parts of the structure you can safely rearrange. The output reverses word order, not character order. What must you preserve?',
      highlight: { location: 'description', text: 'reverse the order of the words' },
      options: [
        { label: 'The original character positions', isCorrect: false, feedback: 'Character positions change entirely when words are reversed. What must stay intact is each word\'s internal letter order — "sky" must remain "sky", not "yks".' },
        { label: 'Each word\'s internal character order', isCorrect: true },
        { label: 'The original spacing between words', isCorrect: false, feedback: 'The output explicitly requires single spaces between words regardless of original spacing. You discard original spacing and rebuild with single spaces.' },
        { label: 'The position of each space', isCorrect: false, feedback: 'Spaces are not preserved — the output normalizes to single spaces with no leading or trailing whitespace. Only the word content and reversed order are kept.' },
      ],
      correctFeedback: 'You reverse the sequence of words, but each word\'s characters stay in their original order. "the sky is blue" → ["the","sky","is","blue"] reversed → "blue is sky the".',
      wrongFeedback: [
        'Compare "the sky is blue" and "blue is sky the". What changed, and what stayed the same within each word?',
        'Word order is reversed; each individual word is unchanged. The operation is on the list of words, not on the characters within a word.',
      ],
    },
    {
      id: 'whitespace-normalization',
      question: 'Reading the exact output format tells you what cleanup logic is actually required. "No leading/trailing spaces and only single spaces between words." What does this require you to handle?',
      highlight: { location: 'description', text: 'no leading/trailing spaces and only single spaces between words.' },
      options: [
        { label: 'Only trim the final output string', isCorrect: false, feedback: 'Trimming handles leading/trailing spaces, but does not collapse multiple spaces between words into one. Both problems must be handled.' },
        { label: 'Strip and split on any whitespace, then rejoin with single spaces', isCorrect: true },
        { label: 'Replace all spaces with a single space character', isCorrect: false, feedback: 'A single global replace would collapse internal spaces but may still leave a leading or trailing space. Splitting on whitespace handles all three cases at once.' },
        { label: 'Count spaces and insert corrected ones manually', isCorrect: false, feedback: 'Manual space counting is error-prone and unnecessary. Splitting on whitespace with a filter removes all excess spaces in one step.' },
      ],
      correctFeedback: 'Splitting on whitespace and filtering empty strings handles multiple spaces, leading spaces, and trailing spaces simultaneously. Rejoin the resulting words with a single space.',
      wrongFeedback: [
        'What happens when you split "  hello world  " on whitespace? How many empty strings appear, and how do you remove them?',
        'Splitting on one or more spaces gives only the non-empty word tokens. Joining those with " " gives the correctly normalized output with no extra work.',
      ],
    },
    {
      id: 'at-least-one-word',
      question: 'Guarantees in the constraints often rule out entire edge-case branches you would otherwise have to handle. "At least one word exists." What edge case does this guarantee eliminate?',
      highlight: { location: 'constraint', text: 'At least one word exists' },
      options: [
        { label: 'You do not need to handle empty words', isCorrect: false, feedback: 'Empty words are an artifact of splitting on spaces, not an independent input case. The guarantee is about whether the input can yield zero words after splitting.' },
        { label: 'You do not need to handle an all-spaces input', isCorrect: true },
        { label: 'You do not need to handle single-character strings', isCorrect: false, feedback: 'Single-character strings are valid and must be handled — they contain one word. The guarantee removes the all-spaces case, not short strings.' },
        { label: 'You do not need to check if s is empty', isCorrect: false, feedback: 's.length ≥ 1 means s is never empty, but that alone does not prevent all-spaces input. "At least one word" is a stronger guarantee that a valid word always exists.' },
      ],
      correctFeedback: 'An all-spaces string like "   " would split into zero words, making reversal undefined and output empty. The guarantee means your logic always produces at least one word to join.',
      wrongFeedback: [
        'What would happen if s = "   " (all spaces) after you split and filter? What does "at least one word" prevent?',
        'Without this guarantee, you would need to handle the case where splitting yields an empty list. The guarantee makes that branch dead code — you always have words to reverse.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def reverse_words(self, s):
        words = s.split()
        return ' '.join(reversed(words))`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'Python\'s no-argument <code>.split()</code> already collapses runs of whitespace and drops leading/trailing spaces — a plain <code>.split(\' \')</code> would instead leave empty-string "words" wherever spaces run together, which then have to be filtered out separately.',
  solutionExplanation: 'Splitting on whitespace isolates the words themselves regardless of how much space separates them, sidestepping the leading/trailing/multiple-space cleanup entirely rather than handling it as a special case. Reversing that list of words and joining with single spaces produces the required output directly, since the problem only asks for the order of *words* to flip, not anything about individual characters within them.',
}
