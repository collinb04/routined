export default {
  id: 'longest-substring-without-repeating-chars',
  title: 'Longest Substring Without Repeating Chars',
  difficulty: 'medium',
  description: `<p>Given a string <code>s</code>, find the length of the longest substring without repeating characters.</p>`,
  examples: [
    { input: 's = "abcabcbb"', output: '3 ("abc")' },
    { input: 's = "bbbbb"', output: '1 ("b")' },
    { input: 's = "pwwkew"', output: '3 ("wke")' },
  ],
  constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces'],
  starterCode: `def length_of_longest_substring(s):
  pass`,
  functionName: 'length_of_longest_substring',
  conceptId: 'sliding-window',
  testCases: [
    { label: '"abcabcbb"', args: ['abcabcbb'], expected: 3 },
    { label: '"bbbbb"', args: ['bbbbb'], expected: 1 },
    { label: '"pwwkew"', args: ['pwwkew'], expected: 3 },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 's.length ≤ 5 × 10^4. A brute-force approach checks all O(n²) substrings and validates each in O(n). What does this bound tell you about acceptable complexity?',
      options: [
        { label: 'O(n³) is fine at 50,000 characters', isCorrect: false, feedback: 'O(n³) at n = 50,000 is 1.25 × 10^14 operations — nowhere near feasible. The constraint signals that O(n) is the target.' },
        { label: 'O(n) with a sliding window', isCorrect: true },
        { label: 'O(n²) — check every starting position', isCorrect: false, feedback: 'O(n²) at n = 50,000 is 2.5 billion operations — too slow in Python. A sliding window processes each character at most twice and runs in O(n).' },
        { label: 'O(n log n) — sort characters first', isCorrect: false, feedback: 'Sorting destroys order, and a substring must be contiguous. The order of characters in the window is essential — you cannot sort and maintain valid substrings.' },
      ],
      correctFeedback: 'At n = 50,000, O(n) gives 50,000 operations — trivially fast. A sliding window expands right and shrinks left, visiting each character at most twice.',
      wrongFeedback: [
        'How many substrings does a string of length 50,000 have? Is O(n²) ≈ 2.5 billion operations feasible in Python?',
        'A sliding window\'s two pointers each advance at most n steps. What total complexity does that give for n = 50,000?',
      ],
    },
    {
      id: 'validity-condition',
      question: '"Without repeating characters" — a window is valid when every character in it appears exactly once. When you add a character to the right, what must you check?',
      options: [
        { label: 'Whether the new character is alphabetic', isCorrect: false, feedback: 'The constraint "English letters, digits, symbols and spaces" means any character is valid input. The check is about repetition within the current window, not about character type.' },
        { label: 'Whether the new character is already in the window', isCorrect: true },
        { label: 'Whether the window length exceeds k', isCorrect: false, feedback: 'There is no k in this problem — there\'s no fixed limit on window size. The only constraint is that all characters in the window must be unique.' },
        { label: 'Whether the window has at most 26 distinct characters', isCorrect: false, feedback: '26 is a red herring from alphabet size. The actual constraint is zero repetitions within the window — any window with a repeated character is invalid, regardless of distinct count.' },
      ],
      correctFeedback: 'When the right pointer reaches a character already in the window, the window is invalid. Advance the left pointer until that character is evicted, then add the new character.',
      wrongFeedback: [
        'Adding character c to the window: what makes the window invalid?',
        'The window is valid as long as all characters are unique. What single condition breaks that?',
      ],
    },
    {
      id: 'tracking-structure',
      question: '"s consists of English letters, digits, symbols and spaces" — the character set is not just 26 letters. What structure most efficiently tracks which characters are in the current window?',
      options: [
        { label: 'A fixed array of 26 booleans', isCorrect: false, feedback: 'A 26-slot array only covers lowercase letters. The constraint explicitly includes digits, symbols, and spaces — ASCII has 128 characters, and a 26-slot array would miss most of them.' },
        { label: 'A hash set of current window characters', isCorrect: false },
        { label: 'A hash map from character to its last seen index', isCorrect: true },
        { label: 'A sorted list of window characters', isCorrect: false, feedback: 'A sorted list takes O(log n) to insert and O(log n) to check membership. A hash structure gives O(1) for both. Maintaining sort order is also unnecessary here.' },
      ],
      correctFeedback: 'A hash map storing character → most recent index lets you jump the left pointer directly to the position after the duplicate, rather than advancing one step at a time. This keeps the algorithm O(n).',
      wrongFeedback: [
        'When a duplicate is found, how far should the left pointer jump? Does a set give you that information?',
        'A set tells you whether a character is in the window, but not where it is. Which structure lets you find the duplicate\'s position in O(1) to jump the left pointer directly?',
      ],
    },
    {
      id: 'left-pointer-jump',
      question: 'When character c at index r is already in the window at index prev, where should the left pointer move?',
      options: [
        { label: 'To prev (the previous position of c)', isCorrect: false, feedback: 'Moving to prev would keep the duplicate c inside the window. You need to move past it — to prev + 1 — so that c is no longer in the window.' },
        { label: 'To prev + 1 (one past the duplicate)', isCorrect: true },
        { label: 'To r (the current right pointer position)', isCorrect: false, feedback: 'Jumping to r would discard the entire current window, including valid characters between the duplicate and r. You only need to evict the duplicate and everything before it.' },
        { label: 'One step right regardless of duplicate position', isCorrect: false, feedback: 'Moving one step at a time is O(n) total in the worst case, but storing the index allows a direct jump that skips unnecessary steps. A hash map makes this jump free.' },
      ],
      correctFeedback: 'Set left = max(left, prev + 1). The max guard prevents moving the left pointer backward when a character\'s stored index is before the current window start.',
      wrongFeedback: [
        'The duplicate at prev must be removed from the window. Which position puts left just past it?',
        'After moving left to prev + 1, is the duplicate c still inside the window [left, r]?',
      ],
    },
  ],
}
