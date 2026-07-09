export default {
  id: 'valid-palindrome',
  title: 'Valid Palindrome',
  difficulty: 'easy',
  description: 'After removing all non-alphanumeric characters and lowercasing, return <code>true</code> if the string reads the same forward and backward.',
  examples: [
    { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
    { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
  ],
  constraints: [
    '1 ≤ s.length ≤ 2 × 10⁵',
    's consists only of printable ASCII characters',
  ],
  starterCode: `def is_palindrome(s):
  pass`,
  functionName: 'is_palindrome',
  conceptId: 'strings',
  testCases: [
    { label: 'Classic phrase', args: ['A man, a plan, a canal: Panama'], expected: true },
    { label: 'Not palindrome', args: ['race a car'], expected: false },
    { label: 'Single space', args: [' '], expected: true },
    { label: 'Pure alpha', args: ['racecar'], expected: true },
  ],
  bruteHint: 'Describe building a cleaned, lowercased copy of the string and comparing it to its reverse, and its space cost',
  optimizeHint: 'Name the technique that checks the palindrome in place with two pointers, skipping non-alphanumeric characters',
  clues: [
    {
      id: 'preprocessing-signal',
      question: '"Remove all non-alphanumeric characters and lowercase." What does this preprocessing step imply about your scan?',
      options: [
        { label: 'Build a cleaned string, then check it', isCorrect: false, feedback: 'Building a cleaned copy works but costs O(n) extra space. Two pointers that skip non-alphanumeric characters in-place achieve the same result with O(1) space.' },
        { label: 'Skip non-alphanumeric characters during the two-pointer scan', isCorrect: true },
        { label: 'Sort the remaining characters to compare sets', isCorrect: false, feedback: 'Sorting after filtering destroys position — palindrome checking requires knowing the order of characters, not just which characters are present.' },
        { label: 'Count alphanumeric characters to determine the palindrome length', isCorrect: false, feedback: 'You do not need to know the palindrome length in advance. Two pointers that advance past non-alphanumerics naturally cover all valid characters.' },
      ],
      correctFeedback: 'Two pointers that skip non-alphanumeric characters in-place handle filtering and checking in a single O(n) pass with O(1) extra space.',
      wrongFeedback: [
        'You can filter then check, or filter while checking. What is the space trade-off between the two approaches?',
        'Advance the left pointer past non-alphanumerics; advance the right pointer past non-alphanumerics; then compare. No extra string needed.',
      ],
    },
    {
      id: 'case-insensitive-comparison',
      question: '"After lowercasing." The input includes uppercase letters. How must you compare characters in the scan?',
      options: [
        { label: 'Compare ASCII codes directly', isCorrect: false, feedback: 'ASCII codes differ for uppercase and lowercase versions of the same letter — \'A\' is 65, \'a\' is 97. Direct code comparison would fail the case-insensitive requirement.' },
        { label: 'Lowercase both characters before comparing', isCorrect: true },
        { label: 'Only compare characters after index 0 since the first may be uppercase', isCorrect: false, feedback: 'Uppercase can appear anywhere in the string — "A man, a plan, a canal: Panama" has uppercase at the start. Every character needs case normalization before comparison.' },
        { label: 'Uppercase characters are non-alphanumeric and should be skipped', isCorrect: false, feedback: 'Uppercase letters are alphanumeric — they are valid characters for the palindrome check. They must be lowercased and included, not skipped.' },
      ],
      correctFeedback: 'Call .lower() (or equivalent) on each character before comparing. This ensures \'A\' and \'a\' are treated as equal, which is required by the problem.',
      wrongFeedback: [
        '"A man, a plan, a canal: Panama" — the \'A\' and \'a\' must match. What operation makes them equal for comparison?',
        'Lowercase both characters at the comparison step. This handles all uppercase/lowercase variants without building a separate normalized string.',
      ],
    },
    {
      id: 'empty-after-filtering',
      question: 'A string of only spaces like " " has no alphanumeric characters. What should the result be?',
      options: [
        { label: 'false — no valid characters to form a palindrome', isCorrect: false, feedback: 'An empty sequence is trivially a palindrome — there are no characters to violate the rule. The test case " " expects true.' },
        { label: 'true — an empty sequence is a palindrome', isCorrect: true },
        { label: 'false — the string is not purely alphanumeric', isCorrect: false, feedback: 'The problem says to ignore non-alphanumeric characters, not to return false for them. After filtering, an empty result is a valid palindrome.' },
        { label: 'Return the original string unchanged', isCorrect: false, feedback: 'The output is a boolean, not a string. After filtering " " you have zero characters, which trivially satisfies the palindrome property.' },
      ],
      correctFeedback: 'Two pointers that start with left > right immediately return true — the loop body never executes. An empty filtered string is a palindrome by convention.',
      wrongFeedback: [
        'After filtering " ", how many alphanumeric characters remain? What does two-pointer comparison do when the string is empty?',
        'If left starts at 0 and right starts below 0 (or they cross immediately), the while loop never runs. The result is true — no mismatch found.',
      ],
    },
  ],
}
