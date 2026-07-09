export default {
  id: 'valid-anagram',
  title: 'Valid Anagram',
  difficulty: 'easy',
  description: `<p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an anagram of <code>s</code>, and <code>false</code> otherwise.</p><p>An anagram uses all the original letters exactly once, rearranged.</p>`,
  examples: [
    { input: 's = "anagram", t = "nagaram"', output: 'true' },
    { input: 's = "rat", t = "car"', output: 'false' },
  ],
  constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters'],
  starterCode: `def is_anagram(s, t):
  pass`,
  functionName: 'is_anagram',
  conceptId: 'arrays',
  testCases: [
    { label: 'anagram', args: ['anagram', 'nagaram'], expected: true },
    { label: 'not anagram', args: ['rat', 'car'], expected: false },
    { label: 'different lengths', args: ['ab', 'a'], expected: false },
  ],
  bruteHint: 'Describe sorting both strings and comparing them, and its time complexity',
  optimizeHint: 'Name the data structure that counts letter frequencies in one pass instead of sorting',
  clues: [
    {
      id: 'length-check-first',
      question: 'An anagram uses all the original letters exactly once. What is the first thing you can check before comparing characters?',
      options: [
        { label: 'Whether s is alphabetically before t', isCorrect: false, feedback: 'Alphabetical order is irrelevant to anagram detection. The first useful check is whether both strings have the same number of characters — different lengths cannot be anagrams.' },
        { label: 'Whether both strings have the same length', isCorrect: true },
        { label: 'Whether the first characters match', isCorrect: false, feedback: 'First characters matching is not required — "anagram" and "nagaram" start with different letters yet are anagrams. Same length is the meaningful early check.' },
        { label: 'Whether s contains all characters of t', isCorrect: false, feedback: 'Containment alone does not confirm an anagram — you also need exact counts. And checking containment before length wastes work when lengths differ.' },
      ],
      correctFeedback: 'If len(s) != len(t), return False immediately. Two strings of different lengths cannot use the same letters exactly once.',
      wrongFeedback: [
        'An anagram uses every letter exactly once. What is the simplest property that must be true before any character comparison?',
        'If the strings have different lengths, no rearrangement of one can equal the other. Check that first.',
      ],
    },
    {
      id: 'lowercase-letters-only',
      question: '"s and t consist of lowercase English letters." What does this constraint tell you about how to count character frequencies?',
      options: [
        { label: 'Use a hash map for arbitrary character sets', isCorrect: false, feedback: 'A hash map works but is more than you need. With only 26 possible characters, a fixed-size array of length 26 is sufficient and slightly more efficient.' },
        { label: 'A fixed array of 26 counters is sufficient', isCorrect: true },
        { label: 'No special counting is needed — compare sorted strings', isCorrect: false, feedback: 'Sorting costs O(n log n). The lowercase-only constraint lets you count in O(n) with a 26-element array.' },
        { label: 'Use a set to track which letters appear', isCorrect: false, feedback: 'A set tracks presence, not count. "aab" and "abb" share the same letters but are not anagrams — you need exact frequencies.' },
      ],
      correctFeedback: 'Exactly 26 possible characters means a length-26 frequency array covers all cases. Index by ord(c) - ord(\'a\') to map each letter to a slot.',
      wrongFeedback: [
        'How many distinct lowercase English letters are there? Does that suggest a simpler structure than a general-purpose hash map?',
        'With only 26 possible values, a fixed array indexed by letter position is O(1) to build and compare. No hashing needed.',
      ],
    },
    {
      id: 'frequency-comparison',
      question: 'An anagram requires the same letters in the same counts. What comparison proves two strings are anagrams?',
      options: [
        { label: 'The sorted forms of both strings are equal', isCorrect: false, feedback: 'Sorting works but costs O(n log n). Comparing frequency counts is O(n) and does not require reordering characters.' },
        { label: 'The character frequency maps of s and t are identical', isCorrect: true },
        { label: 'Every character in s also appears in t', isCorrect: false, feedback: '"aab" contains every character from "ab", but they are not anagrams. You need the same letter with the same count in both strings.' },
        { label: 'The sum of character codes is the same', isCorrect: false, feedback: 'The same sum of character codes does not imply the same letter counts. Different multisets can have the same sum — for example "ac" and "bb" both sum to the same ASCII total.' },
      ],
      correctFeedback: 'Build a frequency count for s, subtract counts for t. If every count is 0 at the end, the strings are anagrams. One pass each for O(n) time.',
      wrongFeedback: [
        'What must be true about the count of every individual letter across s and t?',
        'Each letter must appear the same number of times in s and t. A frequency array that nets to all zeros after counting both strings proves this.',
      ],
    },
  ],
}
