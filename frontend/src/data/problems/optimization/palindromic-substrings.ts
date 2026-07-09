export default {
  id: 'palindromic-substrings',
  title: 'Palindromic Substrings',
  difficulty: 'medium',
  description: `<p>Given a string <code>s</code>, return the number of palindromic substrings in it. A string is a palindrome when it reads the same backward as forward. A substring is a contiguous sequence of characters within the string.</p>`,
  examples: [
    { input: 's = "abc"', output: '3 (a, b, c)' },
    { input: 's = "aaa"', output: '6 (a, a, a, aa, aa, aaa)' },
  ],
  constraints: ['1 <= s.length <= 1000', 's consists of lowercase English letters'],
  starterCode: `def count_substrings(s):
  pass`,
  functionName: 'count_substrings',
  conceptId: 'dp-1d',
  testCases: [
    { label: '"abc"', args: ['abc'], expected: 3 },
    { label: '"aaa"', args: ['aaa'], expected: 6 },
  ],
  bruteHint: 'Describe the naive approach of checking every substring for the palindrome property, and its resulting O(n³) time complexity',
  optimizeHint: 'Name the technique that reuses a shorter palindrome\'s result to check a longer one in O(1), whether via a DP table or expanding around centers',
  clues: [
    {
      id: 'constraint-complexity',
      question: 's.length ≤ 1000 tells you…',
      options: [
        { label: 'O(n³) is acceptable', isCorrect: false, feedback: 'At n = 1,000, O(n³) is 1 billion operations — too slow in Python. You need O(n²).' },
        { label: 'O(n²) is the target complexity', isCorrect: true },
        { label: 'O(n) is required', isCorrect: false, feedback: 'O(n) solutions exist (Manacher\'s algorithm) but are complex to implement. At n = 1,000, O(n²) = 1 million operations is fast enough and much simpler.' },
        { label: 'A hash of all substrings is efficient enough', isCorrect: false, feedback: 'Hashing all O(n²) substrings still takes O(n²) time and O(n²) space. It\'s not more efficient than the expand-around-center approach, and adds complexity.' },
      ],
      correctFeedback: 'n = 1,000 makes O(n²) = 1 million operations fast. That permits either a 2D DP table or expand-around-center — both are O(n²).',
      wrongFeedback: [
        'At n = 1,000, how many operations does O(n²) require? O(n³)?',
        '1,000² = 1 million is fine. 1,000³ = 1 billion is not. O(n²) is your ceiling.',
      ],
    },
    {
      id: 'count-not-longest',
      question: 'The output is a count of palindromic substrings, not the longest one. This means…',
      options: [
        { label: 'Find the longest palindrome, then count substrings of it', isCorrect: false, feedback: 'Substrings of the longest palindrome aren\'t all the palindromic substrings of s. "aaa" has 6 palindromic substrings; you can\'t derive that by looking inside the longest one only.' },
        { label: 'Increment a counter for every palindrome found', isCorrect: true },
        { label: 'Return the length of the longest palindrome', isCorrect: false, feedback: 'Length of the longest palindrome is a different problem. Here you count every palindromic substring — including all single characters, which are always palindromes.' },
        { label: 'Collect all unique palindromic substrings', isCorrect: false, feedback: '"aaa" has 6 palindromic substrings but only 3 unique values (a, aa, aaa). The problem counts occurrences, not distinct substrings.' },
      ],
      correctFeedback: 'Every time you confirm a palindrome, increment your counter. Single characters always count — a string of length n starts with at least n palindromes.',
      wrongFeedback: [
        '"abc" has 3 palindromes and "aaa" has 6. Are any of those the same string? Does uniqueness matter here?',
        'Count occurrences, not unique values. Each position in the string can be the center of new palindromes — track every confirmed palindrome, even duplicates.',
      ],
    },
    {
      id: 'palindrome-expansion',
      question: 'A palindrome reads the same forward and backward. The most natural way to enumerate all of them is…',
      options: [
        { label: 'Check every substring with a reverse comparison', isCorrect: false, feedback: 'Reversing and comparing each of the O(n²) substrings costs O(n) per check — O(n³) total. That\'s too slow at n = 1,000.' },
        { label: 'Expand outward from each center', isCorrect: true },
        { label: 'Build a suffix array over s', isCorrect: false, feedback: 'Suffix arrays can enumerate palindromes but are complex to build and reason about. Expand-around-center achieves the same O(n²) result with much simpler code.' },
        { label: 'Use a stack to match characters', isCorrect: false, feedback: 'Stacks work well for balanced-bracket problems. For palindromes, the expansion structure is symmetric, not nested — a center-out approach fits it more directly.' },
      ],
      correctFeedback: 'Expand around each of the 2n-1 centers (n single characters + n-1 between-character gaps). Each expansion step adds one more palindrome if the outer characters match.',
      wrongFeedback: [
        'Palindromes grow symmetrically from a center. If s[l] == s[r], what can you infer about palindromes centered there?',
        'There are 2n-1 possible centers. For each center, expand outward while characters match and count each confirmed palindrome. That\'s O(n²) total.',
      ],
    },
    {
      id: 'odd-even-centers',
      question: '"aaa" produces 6 substrings including "aa". This means…',
      options: [
        { label: 'Only odd-length palindromes need centers', isCorrect: false, feedback: '"aa" is an even-length palindrome — it has no single-character center. If you only expand from single characters, you miss all even-length palindromes like "aa", "abba", etc.' },
        { label: 'Both odd- and even-length centers must be tried', isCorrect: true },
        { label: 'Even-length palindromes are substrings of odd ones', isCorrect: false, feedback: '"aa" in "aaa" is not a substring of an odd-length palindrome that contains everything. Even-length palindromes need their own expansion from between-character centers.' },
        { label: 'Use DP table dp[i][j] to avoid center iteration', isCorrect: false, feedback: 'A 2D DP table correctly handles both odd and even palindromes, but it doesn\'t make the odd/even distinction disappear — the table still requires initializing single-char and two-char cases separately.' },
      ],
      correctFeedback: 'Odd-length palindromes expand from single characters (n centers). Even-length palindromes expand from gaps between characters (n-1 centers). You need both — 2n-1 centers total.',
      wrongFeedback: [
        '"aa" is a palindrome of length 2 — even. What is its "center"? Is it a character or a gap between characters?',
        'Even-length palindromes have their center between two equal adjacent characters. Expand from all n-1 adjacent pairs in addition to n single-character centers.',
      ],
    },
  ],
}
