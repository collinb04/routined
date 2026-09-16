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
  starterCode: `class Solution:
    def is_anagram(self, s, t):
        pass`,
  runnerSetup: 'is_anagram = Solution().is_anagram',
  functionName: 'is_anagram',
  conceptId: 'arrays',
  testCases: [
    { label: 'anagram', args: ['anagram', 'nagaram'], expected: true },
    { label: 'not anagram', args: ['rat', 'car'], expected: false },
    { label: 'different lengths', args: ['ab', 'a'], expected: false },
  ],
  bruteHint: 'A brute-force approach sorts both strings and checks whether the sorted results are equal, since two strings built from the same letters produce identical sorted output. Sorting each string costs O(n log n), so the full check runs in O(n log n) time. With s and t each up to 5 * 10^4 characters, do you actually need to reorder every character just to confirm the same letters appear the same number of times in both?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'length-check-first',
      question: 'Some conditions let you rule out an answer before doing any real comparison work. An anagram uses all the original letters exactly once. What is the first thing you can check before comparing characters?',
      highlight: { location: 'description', text: 'An anagram uses all the original letters exactly once, rearranged.' },
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
      question: 'The character set of the input often determines which approach is efficient. "s and t consist of lowercase English letters." What does this constraint tell you about how to count character frequencies?',
      highlight: { location: 'constraint', text: 's and t consist of lowercase English letters' },
      options: [
        { label: 'Track counts assuming the alphabet could be arbitrarily large', isCorrect: false, feedback: 'That works but is more than you need. With only 26 possible characters, a fixed-size array of length 26 is sufficient and slightly more efficient.' },
        { label: 'Track counts using a small, fixed number of slots — one per possible letter', isCorrect: true },
        { label: 'Skip counting entirely and reorder both strings before comparing', isCorrect: false, feedback: 'Reordering costs O(n log n). The lowercase-only constraint lets you count in O(n) with a 26-element structure.' },
        { label: 'Track only which letters appear, not how many times each occurs', isCorrect: false, feedback: 'That tracks presence, not count. "aab" and "abb" share the same letters but are not anagrams — you need exact frequencies.' },
      ],
      correctFeedback: 'Exactly 26 possible characters means a length-26 frequency array covers all cases. Index by ord(c) - ord(\'a\') to map each letter to a slot.',
      wrongFeedback: [
        'How many distinct lowercase English letters are there? Does that suggest a simpler structure than a general-purpose hash map?',
        'With only 26 possible values, a fixed array indexed by letter position is O(1) to build and compare. No hashing needed.',
      ],
    },
    {
      id: 'frequency-comparison',
      question: 'The comparison method you choose determines how much work the check takes. An anagram requires the same letters in the same counts. What comparison proves two strings are anagrams?',
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
  solutionCode: `class Solution:
    def is_anagram(self, s, t):
        if len(s) != len(t):
            return False
        count = {}
        for ch in s:
            count[ch] = count.get(ch, 0) + 1
        for ch in t:
            if ch not in count or count[ch] == 0:
                return False
            count[ch] -= 1
        return True`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'The length check up front is a cheap short-circuit, not just a nice-to-have — two strings of different lengths can never be anagrams, and skipping straight to counting would still correctly reject them, but only after doing unnecessary work.',
  solutionExplanation: 'An anagram uses exactly the same letters the same number of times, so counting every letter in <code>s</code> and then "spending" one count per letter seen in <code>t</code> directly tests that equivalence: if <code>t</code> ever needs a letter that has already run out (or was never there), the strings can\'t be anagrams. Reaching the end of <code>t</code> without running out of any letter, combined with the matching lengths, guarantees every count landed exactly on zero.',
  solution: {
    patternName: 'Frequency fingerprinting — use when two collections are equal only if they contain the same elements the same number of times, order aside',
    approaches: [
      {
        approachName: 'Sort and compare',
        oneLineIdea: 'Sort both strings and check for equality',
        subgoals: [
          { label: 'Rule out mismatched lengths', explanation: 'Different lengths can never be anagrams, so exit before doing any sorting work' },
          { label: 'Normalize order', explanation: 'Sorting removes ordering as a source of difference — anagrams become identical sequences' },
          { label: 'Compare directly', explanation: 'Two anagrams\' sorted forms are exactly equal, character for character' },
        ],
        code: `def is_anagram(s, t):
    if len(s) != len(t):              # rule out mismatched lengths
        return False
    sorted_s = sorted(s)              # normalize order
    sorted_t = sorted(t)
    return sorted_s == sorted_t       # compare directly`,
        timeComplexity: 'O(n log n) — dominated by sorting both strings of length n',
        spaceComplexity: 'O(n) — sorted() returns a new list for each string, since Python strings are immutable',
        whenYouWouldActuallyUseThis: 'When you want the simplest possible correct one-liner and n is small enough that O(n log n) versus O(n) doesn\'t matter — the natural first thing to write before optimizing.',
      },
      {
        approachName: 'Frequency count',
        oneLineIdea: 'Tally each letter, then confirm the tallies cancel out',
        subgoals: [
          { label: 'Rule out mismatched lengths', explanation: 'Same early exit as before — different lengths can never be anagrams' },
          { label: 'Tally letters in one fixed-size array', explanation: 'Increment a slot for each character in s, decrement the same slot for each character in t' },
          { label: 'Confirm every slot nets to zero', explanation: 'If every letter\'s increments and decrements cancel out, s and t used exactly the same letters the same number of times' },
        ],
        code: `def is_anagram(s, t):
    if len(s) != len(t):                        # rule out mismatched lengths
        return False
    counts = [0] * 26
    for ch in s:
        counts[ord(ch) - ord('a')] += 1         # tally letters in a fixed-size array
    for ch in t:
        counts[ord(ch) - ord('a')] -= 1
    return all(c == 0 for c in counts)          # confirm every slot nets to zero`,
        timeComplexity: 'O(n) — one pass over s and one pass over t, each O(1) work per character',
        spaceComplexity: 'O(1) — a fixed 26-slot array regardless of input length',
        whenYouWouldActuallyUseThis: 'The default choice in practice — a fixed 26-slot array is faster and lighter than sorting, and the same tallying idea generalizes to any frequency-comparison problem.',
      },
    ],
    comparisonTable: [
      { approach: 'Sort and compare', time: 'O(n log n)', space: 'O(n)', structuralUnlock: 'None — still reordering the full input before it can be compared' },
      { approach: 'Frequency count', time: 'O(n)', space: 'O(1)', structuralUnlock: 'Exploiting the fixed 26-letter alphabet collapses "compare orderings" into "compare 26 counters," trading the sort for a single linear tally' },
    ],
    transferNote: 'The same net-to-zero counting trick reappears in Group Anagrams (the canonical-key idea extended to group many strings, not just compare two), and in Ransom Note (checking one frequency map is a subset of another). Whenever "same elements, same counts, order doesn\'t matter" is the actual question, frequency counting beats sorting because it never pays for an ordering it doesn\'t need.',
    retrievalCheck: [
      'If s and t could contain any Unicode character instead of just lowercase English letters, would the fixed 26-slot array still work — what would you replace it with?',
      'If you needed to check whether t is an anagram of any contiguous substring of a much longer s, would sorting or frequency counting adapt more naturally, and why?',
      'What is the smallest change to the frequency-count approach that would let it also report which letters differ when the strings are not anagrams?',
    ],
  },
}
