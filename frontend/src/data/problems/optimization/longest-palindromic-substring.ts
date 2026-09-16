export default {
  id: 'longest-palindromic-substring',
  title: 'Longest Palindromic Substring',
  difficulty: 'medium',
  description: `<p>Given a string <code>s</code>, return the longest palindromic substring in <code>s</code>.</p>`,
  examples: [
    { input: 's = "babad"', output: '"bab" (or "aba")' },
    { input: 's = "cbbd"', output: '"bb"' },
  ],
  constraints: ['1 <= s.length <= 1000', 's consists of only digits and English letters'],
  starterCode: `class Solution:
    def longest_palindrome(self, s):
        pass`,
  functionName: 'longest_palindrome_run',
  runnerSetup: `def _is_palindrome(s): return s == s[::-1]
def _max_pal_len(s):
  best = 0
  for i in range(len(s)):
      for j in range(i, len(s)):
          if _is_palindrome(s[i:j+1]): best = max(best, j-i+1)
  return best
def longest_palindrome_run(s):
  result = Solution().longest_palindrome(s)
  return isinstance(result, str) and _is_palindrome(result) and result in s and len(result) == _max_pal_len(s)`,
  testCases: [
    { label: '"cbbd"', args: ['cbbd'], expected: true },
    { label: '"a"', args: ['a'], expected: true },
    { label: '"racecar"', args: ['racecar'], expected: true },
    { label: '"babad"', args: ['babad'], expected: true },
  ],
  bruteHint: 'The brute-force approach enumerates all O(n²) possible substrings of s and, for each one, checks whether it\'s a palindrome by comparing it to its own reverse, an O(n) check per substring. That gives roughly O(n³) time overall, since verifying each substring redoes work that overlapping substrings already share. Two adjacent substrings often re-examine nearly the same characters from scratch. Where is that repeated comparison work coming from, and could it be reused instead of redone?',
  optimizeComplexity: { time: 'O(n²)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraints often reveal the time complexity budget before you write a single line of code. s.length ≤ 1000 tells you…',
      highlight: { location: 'constraint', text: '1 <= s.length <= 1000' },
      options: [
        { label: 'O(n²) is the target complexity', isCorrect: true },
        { label: 'O(n³) is acceptable', isCorrect: false, feedback: 'At n = 1,000, O(n³) is 1 billion operations — too slow. Checking every substring by reversing it costs O(n) per substring, giving O(n³) total. You need O(n²).' },
        { label: 'O(n) is required', isCorrect: false, feedback: 'O(n) exists (Manacher\'s algorithm) but is complex to implement. At n = 1,000, O(n²) = 1 million operations is fast enough and simpler to reason about.' },
        { label: 'Only substrings up to length 100 need checking', isCorrect: false, feedback: 'The longest palindromic substring can be the entire string. Nothing in the constraint limits the palindrome length to 100 — you must consider all substrings.' },
      ],
      correctFeedback: 'n = 1,000 makes O(n²) = 1 million operations fast. Expand-around-center or a 2D DP table both achieve O(n²) — either is the right fit.',
      wrongFeedback: [
        'At n = 1,000, what does O(n²) cost? What about O(n³)?',
        'O(n²) = 1 million is fine. O(n³) = 1 billion is not. Any approach that checks each of the O(n²) substrings in O(1) hits the target.',
      ],
    },
    {
      id: 'substring-not-subsequence',
      question: 'Precise problem wording like "substring" versus "subsequence" tells you whether gaps are allowed between selected characters. The problem asks for the longest palindromic substring, not subsequence. What does "contiguous" change?',
      highlight: { location: 'description', text: 'longest palindromic substring' },
      options: [
        { label: 'Characters can be skipped to form the palindrome', isCorrect: false, feedback: 'Skipping characters is allowed in subsequences, not substrings. The substring must be a contiguous slice of s — every character between the start and end is included.' },
        { label: 'The palindrome must occupy consecutive positions in s', isCorrect: true },
        { label: 'The palindrome must start at index 0', isCorrect: false, feedback: 'Substrings can start anywhere in s. "bab" is the answer for "babad" even though it doesn\'t start at index 0.' },
        { label: 'You sort s first to bring equal characters together', isCorrect: false, feedback: 'Sorting destroys positions — and positions are what define substrings. Sorting would make "racecar" into "aaccer", breaking the problem entirely.' },
      ],
      correctFeedback: 'Contiguous means the palindrome is s[i..j] for some i ≤ j. That lets you enumerate all O(n²) start/end pairs and check each one — or expand from centers.',
      wrongFeedback: [
        'A substring is a contiguous slice s[i..j]. How many such slices are there in a string of length n?',
        'There are O(n²) start/end pairs. Checking each in O(1) with expand-around-center or a DP table gives O(n²) total.',
      ],
    },
    {
      id: 'expansion-approach',
      question: 'A structural property of the target, like symmetry, can suggest an efficient way to enumerate candidates. A palindrome is symmetric around its center. What does this suggest for enumeration?',
      options: [
        { label: 'Check every substring by reversing it', isCorrect: false, feedback: 'Reversing each of the O(n²) substrings takes O(n) per check — O(n³) total. Too slow at n = 1,000.' },
        { label: 'Expand outward from each center while characters match', isCorrect: true },
        { label: 'Use binary search to find palindrome boundaries', isCorrect: false, feedback: 'Palindrome boundaries aren\'t monotone or sorted — binary search has no comparison function to exploit here. Expansion is the natural O(1)-per-step approach.' },
        { label: 'Hash each substring and compare to its reverse hash', isCorrect: false, feedback: 'Rolling hashes can work but add implementation complexity. Expand-around-center achieves the same O(n²) with simpler, direct comparisons.' },
      ],
      correctFeedback: 'For each of the 2n-1 centers (n single characters + n-1 adjacent pairs), expand outward as long as s[l] == s[r]. Track the longest expansion found. O(n²) total.',
      wrongFeedback: [
        'If you stand at the center of a palindrome, each expansion step either extends it or stops it. How many centers does a string of length n have?',
        'There are n centers for odd-length palindromes and n-1 centers for even-length ones — 2n-1 total. Expand from each; track the longest.',
      ],
    },
    {
      id: 'output-string-not-length',
      question: 'The exact type the function must return often dictates what auxiliary state you need to track. The output is the actual substring, not its length. This means…',
      highlight: { location: 'description', text: 'Given a string <code>s</code>, return the longest palindromic substring in <code>s</code>.' },
      options: [
        { label: 'Track the start index and length of the best palindrome', isCorrect: true },
        { label: 'Store the entire substring in a variable', isCorrect: false, feedback: 'You can, but it\'s unnecessary to copy the substring on every update. Tracking the start index and length is sufficient — the substring is s[start:start+length] at the end.' },
        { label: 'Return the length and reconstruct the string separately', isCorrect: false, feedback: 'Reconstruction is trivial once you have start and length — just slice s[start:start+length]. There\'s no separate reconstruction step needed.' },
        { label: 'Return as soon as you find any palindrome', isCorrect: false, feedback: 'Every single character is a palindrome, so you\'d always return s[0] immediately. You need to find the longest one, not just any one.' },
      ],
      correctFeedback: 'Keep two variables: best_start and best_len. When you find a longer palindrome during expansion, update them. Return s[best_start : best_start + best_len] at the end.',
      wrongFeedback: [
        'You need to return a string, not a number. What\'s the minimal information to reconstruct that string from s?',
        'A start index and a length are enough: s[start:start+length]. Update these whenever a longer palindrome is found during expansion.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def longest_palindrome(self, s):
        if not s:
            return ""
        best_start, best_len = 0, 1

        def expand(l, r):
            while l >= 0 and r < len(s) and s[l] == s[r]:
                l -= 1
                r += 1
            return l + 1, r - l - 1

        for i in range(len(s)):
            start, length = expand(i, i)
            if length > best_len:
                best_start, best_len = start, length
            start, length = expand(i, i + 1)
            if length > best_len:
                best_start, best_len = start, length
        return s[best_start:best_start + best_len]`,
  solutionComplexity: { time: 'O(n²)', space: 'O(1)' },
  solutionCaveat: 'Two center types are tried at every index — <code>expand(i, i)</code> for odd-length palindromes and <code>expand(i, i + 1)</code> for even-length ones — since a palindrome like "bb" has no single middle character, only a middle boundary between two equal characters.',
  solutionExplanation: 'Every palindrome is symmetric around some center, so instead of checking all O(n²) substrings by reversing each one, expanding outward from each of the 2n-1 possible centers while both sides keep matching finds every palindrome directly, stopping the instant a mismatch breaks the symmetry. Tracking just the best start index and length rather than copying the substring itself on every improvement keeps each expansion O(1) extra space, with the final answer sliced out of <code>s</code> only once at the end.',
}
