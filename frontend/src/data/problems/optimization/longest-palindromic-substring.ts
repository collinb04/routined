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
  starterCode: `def longest_palindrome(s):
  pass`,
  functionName: 'longest_palindrome_run',
  conceptId: 'dp-1d',
  runnerSetup: `def _is_palindrome(s): return s == s[::-1]
def _max_pal_len(s):
  best = 0
  for i in range(len(s)):
      for j in range(i, len(s)):
          if _is_palindrome(s[i:j+1]): best = max(best, j-i+1)
  return best
def longest_palindrome_run(s):
  result = longest_palindrome(s)
  return isinstance(result, str) and _is_palindrome(result) and result in s and len(result) == _max_pal_len(s)`,
  testCases: [
    { label: '"cbbd"', args: ['cbbd'], expected: true },
    { label: '"a"', args: ['a'], expected: true },
    { label: '"racecar"', args: ['racecar'], expected: true },
    { label: '"babad"', args: ['babad'], expected: true },
  ],
}
