export default {
  id: 'valid-palindrome-ii',
  title: 'Valid Palindrome II',
  difficulty: 'easy',
  description: 'Given a string <code>s</code>, return <code>true</code> if the string can become a palindrome by removing at most one character.',
  examples: [
    { input: 's = "aba"', output: 'true', explanation: 'Already a palindrome.' },
    { input: 's = "abca"', output: 'true', explanation: 'Remove "c" to get "aba".' },
    { input: 's = "abc"', output: 'false' },
  ],
  constraints: ['1 ≤ s.length ≤ 10⁵', 's consists of lowercase English letters'],
  starterCode: `class Solution:
    def valid_palindrome(self, s):
        pass`,
  runnerSetup: 'valid_palindrome = Solution().valid_palindrome',
  functionName: 'valid_palindrome',
  conceptId: 'strings',
  testCases: [
    { label: 'Already palindrome', args: ['aba'], expected: true },
    { label: 'One removal', args: ['abca'], expected: true },
    { label: 'Not possible', args: ['abc'], expected: false },
    { label: 'Empty-like', args: ['a'], expected: true },
  ],
  bruteHint: 'A brute-force approach tries removing each character one at a time, then checks whether the resulting string is a palindrome. Checking one candidate takes O(n), and there are n candidates to try, so the total cost is O(n²). With s as long as 10⁵ characters, do you really need to try every single removal, or does the first mismatch already tell you exactly which two characters could possibly need to go?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'two-pointer-palindrome-check',
      question: 'The property being checked often points to the approach that fits best. A palindrome reads the same forward and backward. What is the most direct way to check this on a string?',
      options: [
        { label: 'Reverse the string and compare', isCorrect: false, feedback: 'Reversing and comparing works, but creates a copy of size n. Two pointers converging from both ends check the same property in O(1) space.' },
        { label: 'Two pointers converging from both ends', isCorrect: true },
        { label: 'Hash the string and compare forward and backward hashes', isCorrect: false, feedback: 'Hashing adds complexity without benefit here. Two pointers are O(n) time and O(1) space and give exact character-level information when a mismatch is found.' },
        { label: 'Sort the characters and check for symmetry', isCorrect: false, feedback: 'Sorting destroys position — "aba" and "aab" have the same sorted characters but only one is a palindrome.' },
      ],
      correctFeedback: 'Two pointers starting at index 0 and len(s)-1 compare characters inward. Each comparison is O(1), and the full check is O(n) with no extra space.',
      wrongFeedback: [
        'A palindrome means s[0] == s[-1], s[1] == s[-2], and so on. What iterative pattern checks all those pairs?',
        'Start at both ends and move inward. When the pointers meet or cross, every pair has been verified. What is the space cost of this approach?',
      ],
    },
    {
      id: 'at-most-one-removal',
      question: 'Efficient handling of a special case often means checking just a couple of extra possibilities instead of redoing everything. "At most one character" can be removed. When two-pointer finds a mismatch at positions i and j, what must you try?',
      highlight: { location: 'description', text: 'at most one character' },
      options: [
        { label: 'Return false immediately', isCorrect: false, feedback: 'A single mismatch does not mean failure — you still have one deletion to use. The mismatch tells you exactly where to try: skip s[i] or skip s[j].' },
        { label: 'Check if either s[i+1..j] or s[i..j-1] is a palindrome', isCorrect: true },
        { label: 'Remove the character at the midpoint and recheck', isCorrect: false, feedback: 'The mismatch is at positions i and j — those are the candidates to skip, not the midpoint. Removing an unrelated character cannot fix a mismatch at the ends.' },
        { label: 'Try all possible single deletions from the whole string', isCorrect: false, feedback: 'Trying all n deletions is O(n²). When the mismatch is at i and j, only two candidates matter: skip s[i] or skip s[j]. Everything else is still matching.' },
      ],
      correctFeedback: 'When s[i] != s[j], the mismatch must be resolved by removing one of those two characters. Check is_palindrome(s[i+1..j]) or is_palindrome(s[i..j-1]). If either is true, return true.',
      wrongFeedback: [
        'You found the first mismatch at positions i and j. You have one deletion. Which characters are candidates for removal?',
        'Skip s[i] and check if the inner substring is a palindrome. Or skip s[j] and check. If either succeeds, you can fix it with one removal.',
      ],
    },
    {
      id: 'constraint-size',
      question: 'Input size limits often rule out certain time complexities before you even design the algorithm. 1 ≤ s.length ≤ 10⁵. What does this say about an O(n²) approach that tries every possible deletion?',
      highlight: { location: 'constraint', text: '1 ≤ s.length ≤ 10⁵' },
      options: [
        { label: 'O(n²) is fine at n = 10⁵', isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion operations. The two-pointer approach checks at most two inner substrings after a mismatch, keeping total work at O(n).' },
        { label: 'O(n) is required', isCorrect: true },
        { label: 'O(n log n) is the target', isCorrect: false, feedback: 'O(n log n) would pass, but the two-pointer approach is O(n) — linear. The constraint rules out O(n²), not O(n).' },
        { label: 'Input size does not affect the approach', isCorrect: false, feedback: 'At n = 100,000, the difference between O(n) and O(n²) is 100,000 operations versus 10 billion. Input size always matters.' },
      ],
      correctFeedback: 'At n = 100,000, O(n²) is 10 billion operations — far too slow. The two-pointer approach runs two palindrome checks of at most O(n) each after the first mismatch.',
      wrongFeedback: [
        'With n = 100,000, how many deletions would you test in an O(n²) approach? How does that compare to a two-pointer check?',
        '100,000² = 10 billion. The two-pointer method only ever checks two substrings after a mismatch, keeping total work linear.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def valid_palindrome(self, s):
        def is_pal(i, j):
            while i < j:
                if s[i] != s[j]:
                    return False
                i += 1
                j -= 1
            return True

        left, right = 0, len(s) - 1
        while left < right:
            if s[left] != s[right]:
                return is_pal(left + 1, right) or is_pal(left, right - 1)
            left += 1
            right -= 1
        return True`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'The very first mismatch already narrows the problem to exactly two candidates — skip <code>s[left]</code> or skip <code>s[right]</code> — because whichever one is wrong (if a valid deletion exists at all) must be one of those two; there is no need to consider deleting any other character in the string.',
  solutionExplanation: 'Closing two pointers inward finds the first place the string fails to mirror itself, and at that exact point only one of the two mismatched characters can possibly be the "extra" one allowed to be removed. Checking both possibilities — is the rest a palindrome without the left character, or without the right one — with a plain two-pointer palindrome check covers every case in O(n) total, since at most one mismatch can ever trigger this branch (a second mismatch found inside either candidate check means no single deletion can fix it).',
}
