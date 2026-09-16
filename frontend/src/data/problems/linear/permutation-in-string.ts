export default {
  id: 'permutation-in-string',
  title: 'Permutation in String',
  difficulty: 'medium',
  description: `<p>Given two strings <code>s1</code> and <code>s2</code>, return <code>true</code> if <code>s2</code> contains a permutation of <code>s1</code>, or <code>false</code> otherwise.</p><p>In other words, return true if one of <code>s1</code>'s permutations is a substring of <code>s2</code>.</p>`,
  examples: [
    { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true' },
    { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false' },
  ],
  constraints: ['1 <= s1.length, s2.length <= 10^4', 's1 and s2 consist of lowercase English letters'],
  starterCode: `class Solution:
    def check_inclusion(self, s1, s2):
        pass`,
  runnerSetup: 'check_inclusion = Solution().check_inclusion',
  functionName: 'check_inclusion',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'ab in eidbaooo', args: ['ab', 'eidbaooo'], expected: true },
    { label: 'ab in eidboaoo', args: ['ab', 'eidboaoo'], expected: false },
  ],
  bruteHint: 'A direct approach checks every contiguous window of length len(s1) in s2, and for each one either rearranges the window\'s characters or builds a fresh character count to compare against s1. Rearranging each window costs O(k log k) where k = len(s1), repeated across roughly n − k + 1 windows, giving a total around O(n · k log k) — and with both n and k up to 10⁴, that is far too slow. If most of the comparison work for one window is already reflected in the window right before it, what would let you avoid rebuilding it from scratch each time?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'permutation-equivalence',
      question: 'Pinning down what actually makes two strings interchangeable tells you what property to compare instead of generating anything. "One of s1\'s permutations is a substring of s2." What does it mean for two substrings to be permutations of each other?',
      highlight: { location: 'description', text: 'one of <code>s1</code>\'s permutations is a substring of <code>s2</code>' },
      options: [
        { label: 'They share at least one character', isCorrect: false, feedback: 'Sharing one character is not enough. A permutation uses every character the same number of times — "ab" and "ba" are permutations; "ab" and "ac" are not.' },
        { label: 'They have the same character frequency counts', isCorrect: true },
        { label: 'They match once rearranged into the same fixed order', isCorrect: false, feedback: 'Sorting both and comparing is equivalent to checking frequency counts — but it costs O(k log k) per window vs. O(k) for a frequency comparison.' },
        { label: 'They have the same length', isCorrect: false, feedback: 'Same length is necessary but not sufficient. "aa" and "bb" have the same length but different characters.' },
      ],
      correctFeedback: 'Two strings are permutations of each other if and only if they have identical character frequency counts. Checking counts avoids generating all permutations of s1.',
      wrongFeedback: [
        '"ab" and "ba" are permutations. "ab" and "ac" are not. What is different between those pairs?',
        'Think about what sorting does to a string. If two strings are permutations, their sorted forms are identical. What does that tell you about their character counts?',
      ],
    },
    {
      id: 'window-size',
      question: 'Knowing the exact size any valid match must have tells you what fixed-size window you can reuse instead of checking substrings of every length. You are looking for a permutation of s1 as a contiguous substring. What is the length of every candidate window in s2?',
      options: [
        { label: 'It varies based on the current match', isCorrect: false, feedback: 'A permutation of s1 has exactly the same length as s1. The window size is fixed at len(s1) — it does not vary.' },
        { label: 'Exactly len(s1)', isCorrect: true },
        { label: 'At most len(s1)', isCorrect: false, feedback: 'A permutation uses all characters of s1, so it must have exactly len(s1) characters — not fewer. A shorter substring cannot be a permutation.' },
        { label: 'len(s2) − len(s1)', isCorrect: false, feedback: 'That is the number of windows to check, not the size of each window. Each window itself is len(s1) characters wide.' },
      ],
      correctFeedback: 'Every permutation of s1 has exactly len(s1) characters. You slide a fixed-size window of len(s1) across s2, checking each window\'s frequency counts against s1\'s.',
      wrongFeedback: [
        'A permutation of s1 uses all the characters of s1. How many characters does it have?',
        'If s1 = "ab", its permutations are "ab" and "ba" — both length 2. The window size is always fixed at len(s1).',
      ],
    },
    {
      id: 'input-size-complexity',
      question: 'Recognizing how explosively the naive count grows tells you it is not just slow — it is computationally impossible at this scale. s1.length, s2.length ≤ 10⁴. If you generated and compared every permutation of s1, what is the cost?',
      highlight: { location: 'constraint', text: '1 <= s1.length, s2.length <= 10^4' },
      options: [
        { label: 'O(n) — one pass over s2', isCorrect: false, feedback: 'Generating permutations is not O(n). The number of permutations of a string of length k is k!, which grows far faster than linearly.' },
        { label: 'O(k!) permutations — completely infeasible', isCorrect: true },
        { label: 'O(n²) — checking all substrings', isCorrect: false, feedback: 'Checking all substrings of s2 is O(n²) in count, but generating permutations of s1 adds a k! factor on top of that, making it far worse.' },
        { label: 'O(n log n) — by rearranging each window before comparing', isCorrect: false, feedback: 'Sorting each window is O(k log k) per window, giving O(n · k log k) total — not k!. But sorting is still worse than the O(26) frequency-count comparison available here.' },
      ],
      correctFeedback: 'Even s1.length = 10 gives 10! = 3.6 million permutations. At s1.length = 20 it is 2.4 quintillion. Generating permutations is not viable — use frequency counts instead.',
      wrongFeedback: [
        'How many permutations does a string of length k have? What is that number when k = 10?',
        'k! grows faster than exponential. At k = 13, 13! exceeds 6 billion. The only feasible approach avoids generating permutations entirely.',
      ],
    },
    {
      id: 'lowercase-letters-constraint',
      question: 'Knowing the exact universe of possible characters tells you how small and fast your counting structure can afford to be. "s1 and s2 consist of lowercase English letters." What does this tell you about the frequency count comparison?',
      highlight: { location: 'constraint', text: 's1 and s2 consist of lowercase English letters' },
      options: [
        { label: 'You need a structure that can hold arbitrarily many distinct keys', isCorrect: false, feedback: 'A hash map works, but it is overkill when only 26 possible characters exist. A fixed-size array of length 26 is simpler and faster.' },
        { label: 'A small fixed-size counter covering all 26 letters is enough', isCorrect: true },
        { label: 'Tracking whether a character appears, without counting how many times, is enough', isCorrect: false, feedback: 'A set tracks presence but not frequency. "aa" and "a" would look the same in a set. You need counts, not just membership.' },
        { label: 'Character comparison requires Unicode normalization', isCorrect: false, feedback: 'Lowercase English letters are all ASCII. No Unicode normalization is needed.' },
      ],
      correctFeedback: 'With only 26 possible characters, two frequency arrays of length 26 are enough. Comparing them is O(26) = O(1), making each window check constant time.',
      wrongFeedback: [
        'How many distinct characters can appear in s1 or s2? What is the most compact structure to count them all?',
        'The alphabet is bounded at 26 characters. A list of 26 integers holds every possible count, and comparing two such lists costs O(26) — effectively constant time.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def check_inclusion(self, s1, s2):
        n1, n2 = len(s1), len(s2)
        if n1 > n2:
            return False
        need = [0] * 26
        window = [0] * 26
        for ch in s1:
            need[ord(ch) - ord('a')] += 1
        for i in range(n2):
            window[ord(s2[i]) - ord('a')] += 1
            if i >= n1:
                window[ord(s2[i - n1]) - ord('a')] -= 1
            if i >= n1 - 1 and window == need:
                return True
        return False`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'Comparing frequency counts rather than sorted substrings sidesteps ever generating or checking individual permutations — a permutation of <code>s1</code> is, by definition, exactly anything with the same letter counts, so the frequency-count comparison directly *is* the permutation check.',
  solutionExplanation: 'A window of length <code>len(s1)</code> sliding across <code>s2</code> contains a permutation of <code>s1</code> exactly when its letter-frequency count matches <code>s1</code>\'s letter-frequency count — order inside the window never matters. Sliding the window one step is O(1): add the newly entered character\'s count and remove the one that just fell out the back, so the whole scan compares n2 - n1 + 1 windows against a fixed-size 26-slot array in linear total time, instead of rebuilding or sorting each window from scratch.',
}
