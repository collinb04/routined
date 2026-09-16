export default {
  id: 'minimum-window-substring',
  title: 'Minimum Window Substring',
  difficulty: 'hard',
  description: `<p>Given two strings <code>s</code> and <code>t</code> of lengths <code>m</code> and <code>n</code> respectively, return the minimum window substring of <code>s</code> such that every character in <code>t</code> (including duplicates) is included in the window. If there is no such substring, return the empty string <code>""</code>.</p>`,
  examples: [
    { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
    { input: 's = "a", t = "a"', output: '"a"' },
    { input: 's = "a", t = "aa"', output: '""' },
  ],
  constraints: ['m == s.length', 'n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters'],
  starterCode: `class Solution:
    def min_window(self, s, t):
        pass`,
  runnerSetup: 'min_window = Solution().min_window',
  functionName: 'min_window',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'ADOBECODEBANC', args: ['ADOBECODEBANC', 'ABC'], expected: 'BANC' },
    { label: 'exact match', args: ['a', 'a'], expected: 'a' },
    { label: 'no match', args: ['a', 'aa'], expected: '' },
  ],
  bruteHint: 'The brute-force approach checks every substring of s: for each starting index, extend the ending index outward, and at each step build a fresh character count of the current substring to check whether it covers all of t. There are O(m²) substrings to consider, and checking coverage for each one adds further cost on top of that. At m up to 100,000, how many substrings would you be examining, and could you track coverage incrementally as a window slides, rather than recomputing it from scratch each time?',
  optimizeComplexity: { time: 'O(m + n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'We can gauge how efficient our solution needs to be from the size limit on both strings. m, n ≤ 10⁵. What does this rule out?',
      highlight: { location: 'constraint', text: '1 <= m, n <= 10^5' },
      options: [
        { label: 'Checking every substring of s', isCorrect: true },
        { label: 'Expanding and shrinking a window across s in one pass', isCorrect: false, feedback: 'Expanding and shrinking a window across s runs in O(m) — well within 100,000. The constraint rules out O(m²) substring enumeration, not this approach.' },
        { label: 'Counting how many times each character appears in t', isCorrect: false, feedback: 'Counting character occurrences in t is O(n) — fast and necessary. The constraint rules out slow substring enumeration, not linear preprocessing.' },
        { label: 'Returning the empty string when no window exists', isCorrect: false, feedback: 'The no-match case is an output requirement, not a complexity concern. The constraint governs how you search, not what you return.' },
      ],
      correctFeedback: 'There are O(m²) substrings of s. At m = 100,000 that is 5 billion — too slow to enumerate. You need a sliding window that finds the minimum window in O(m + n).',
      wrongFeedback: [
        'How many distinct substrings does a string of length m have? At m = 100,000, is iterating over all of them feasible?',
        'Two nested loops over start and end give O(m²) substrings. What technique processes each character of s at most twice instead?',
      ],
    },
    {
      id: 'including-duplicates',
      question: 'We can figure out which structure fits by looking closely at what "covering t" actually requires. "Every character in t including duplicates must be in the window." What does this mean for how you track coverage?',
      highlight: { location: 'description', text: 'every character in <code>t</code> (including duplicates) is included in the window' },
      options: [
        { label: 'Check that the window contains each unique character of t', isCorrect: false, feedback: 'Tracking unique characters misses duplicates. If t = "aa", you need two \'a\'s in the window. A set of unique characters only tells you \'a\' is present — not how many.' },
        { label: 'Track character counts, not just presence', isCorrect: true },
        { label: 'Rearrange t\'s characters and check for containment', isCorrect: false, feedback: 'Rearranging t\'s characters organizes them but does not help you efficiently track whether the current window has enough of each. You need counts, and you need to update them in O(1) as the window slides.' },
        { label: 'Track only whether each character has appeared at all, not how many times', isCorrect: false, feedback: 'Tracking only presence, not count, would miss duplicates. If t = "aa", a presence flag for \'a\' looks the same whether the window has one or two \'a\'s — you would miss the duplicate requirement.' },
      ],
      correctFeedback: 'Build a frequency map of t. As the window expands and shrinks, compare the window\'s counts against the required counts. A character is "covered" only when its window count meets the t count.',
      wrongFeedback: [
        'For t = "aa", the window must contain at least 2 \'a\'s. How would you detect that with counts versus with a set?',
        'You need to know, for each character in t, whether the window has enough copies. What data structure tracks "how many does the window have vs. how many are required"?',
      ],
    },
    {
      id: 'shrink-when-valid',
      question: 'We can figure out the right move at each step by thinking about what keeps the total scan linear. Once the window contains all characters of t, what should you do?',
      options: [
        { label: 'Record the window and keep expanding to the right', isCorrect: false, feedback: 'Expanding after the window is valid only makes it larger. You want the minimum length — once valid, shrink from the left to find the smallest window that still covers t.' },
        { label: 'Shrink from the left while the window remains valid', isCorrect: true },
        { label: 'Restart from the next position in s', isCorrect: false, feedback: 'Restarting discards the current right boundary. Shrinking from the left preserves the right portion — a shorter valid window often exists just one step inside the current left.' },
        { label: 'Return the window immediately as the answer', isCorrect: false, feedback: 'The first valid window may not be the minimum. "ADOBECODEBANC" with t="ABC": the first valid window might be "ADOBEC" (length 6), but "BANC" (length 4) is smaller.' },
      ],
      correctFeedback: 'When the window is valid, record its length, then remove s[left] and advance left. If removing s[left] breaks coverage, stop shrinking and resume expanding to the right.',
      wrongFeedback: [
        'When you remove the leftmost character, the window may still contain all of t. How do you know when to stop shrinking?',
        'The shrink loop runs while the window is still valid (all characters covered). What event breaks out of the shrink loop and switches you back to expanding?',
      ],
    },
    {
      id: 'coverage-counter',
      question: 'We can find a faster way to check validity by thinking about what\'s actually necessary to confirm at each step. Checking all character counts at every step to determine if the window is valid would be too slow. What is the efficient alternative?',
      options: [
        { label: 'Recompute and compare full character counts for the window against t every step', isCorrect: false, feedback: 'Comparing full counts at every step is O(|alphabet|) per step — 52 comparisons each time. At m = 100,000 steps that is 5.2 million extra operations. A single running counter is O(1) per step.' },
        { label: 'Maintain a single integer counting how many characters are fully covered', isCorrect: true },
        { label: 'Recompute the window sum after each expansion', isCorrect: false, feedback: 'There is no "sum" to track here — coverage is about character counts, not a numeric total. The efficient mechanism is a counter of how many distinct required characters have reached their quota.' },
        { label: 'Continuously search for whichever required character is missing, in order', isCorrect: false, feedback: 'Searching for what is missing each time can answer the question, but costs more per update. A single coverage counter answers "is everything covered" in O(1) per character event.' },
      ],
      correctFeedback: 'Keep an integer `have` counting how many distinct characters in t have met their quota in the window. When `have` equals the number of distinct characters in t, the window is valid — O(1) check.',
      wrongFeedback: [
        'You want to check "is the window valid?" in O(1) at every step. What single number encodes "all required characters are satisfied"?',
        'Increment `have` when a character\'s window count exactly reaches its required count; decrement when it drops below. When does `have` equal the number of distinct characters in t?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def min_window(self, s, t):
        if not t or not s:
            return ""
        need = {}
        for ch in t:
            need[ch] = need.get(ch, 0) + 1
        missing = len(t)
        left = 0
        best_len = float('inf')
        best_start = 0
        for right, ch in enumerate(s):
            if need.get(ch, 0) > 0:
                missing -= 1
            need[ch] = need.get(ch, 0) - 1
            while missing == 0:
                if right - left + 1 < best_len:
                    best_len = right - left + 1
                    best_start = left
                left_ch = s[left]
                need[left_ch] = need.get(left_ch, 0) + 1
                if need[left_ch] > 0:
                    missing += 1
                left += 1
        return "" if best_len == float('inf') else s[best_start:best_start + best_len]`,
  solutionComplexity: { time: 'O(m + n)', space: 'O(1)' },
  solutionCaveat: '<code>need</code> counts are allowed to go negative — a character that appears more often in the window than <code>t</code> requires still decrements normally, and <code>missing</code> only reacts when a count crosses exactly from 0 to positive (still needed) or from positive to 0 (fully satisfied), which is what keeps surplus characters from ever confusing the "is the window valid" check.',
  solutionExplanation: '<code>missing</code> is a single number standing in for "how many distinct required characters are still under-satisfied" — it hits zero exactly when the window covers every character of <code>t</code> with enough copies, turning the coverage check into an O(1) comparison instead of scanning the window\'s full character counts every time. Once a window is valid, shrinking from the left as far as possible before it breaks finds the tightest window ending at the current right pointer, and recording the best such window across the whole scan gives the global minimum.',
}
