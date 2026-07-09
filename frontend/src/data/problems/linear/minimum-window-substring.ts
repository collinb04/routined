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
  starterCode: `def min_window(s, t):
  pass`,
  functionName: 'min_window',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'ADOBECODEBANC', args: ['ADOBECODEBANC', 'ABC'], expected: 'BANC' },
    { label: 'exact match', args: ['a', 'a'], expected: 'a' },
    { label: 'no match', args: ['a', 'aa'], expected: '' },
  ],
  bruteHint: 'Describe checking every substring with a frequency check each time and its time complexity',
  optimizeHint: 'Name the two-pointer technique that expands and shrinks a window while tracking how many required characters are currently satisfied',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'm, n ≤ 10⁵. What does this rule out?',
      options: [
        { label: 'Checking every substring of s', isCorrect: true },
        { label: 'Using a sliding window on s', isCorrect: false, feedback: 'A sliding window over s runs in O(m) — well within 100,000. The constraint rules out O(m²) substring enumeration, not the window technique.' },
        { label: 'Building a frequency map of t', isCorrect: false, feedback: 'Building a frequency map of t is O(n) — fast and necessary. The constraint rules out slow substring enumeration, not linear preprocessing.' },
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
      question: '"Every character in t including duplicates must be in the window." What does this mean for how you track coverage?',
      options: [
        { label: 'Check that the window contains each unique character of t', isCorrect: false, feedback: 'Tracking unique characters misses duplicates. If t = "aa", you need two \'a\'s in the window. A set of unique characters only tells you \'a\' is present — not how many.' },
        { label: 'Track character counts, not just presence', isCorrect: true },
        { label: 'Sort t and check containment', isCorrect: false, feedback: 'Sorting t organizes characters but does not help you efficiently track whether the current window has enough of each. You need counts, and you need to update them in O(1) as the window slides.' },
        { label: 'Use a bitmask over the 52 possible characters', isCorrect: false, feedback: 'A bitmask tracks presence but not count. If t = "aa", the bitmask for \'a\' is the same whether the window has one or two \'a\'s — you would miss the duplicate requirement.' },
      ],
      correctFeedback: 'Build a frequency map of t. As the window expands and shrinks, compare the window\'s counts against the required counts. A character is "covered" only when its window count meets the t count.',
      wrongFeedback: [
        'For t = "aa", the window must contain at least 2 \'a\'s. How would you detect that with counts versus with a set?',
        'You need to know, for each character in t, whether the window has enough copies. What data structure tracks "how many does the window have vs. how many are required"?',
      ],
    },
    {
      id: 'shrink-when-valid',
      question: 'Once the window contains all characters of t, what should you do?',
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
      question: 'Checking all character counts at every step to determine if the window is valid would be too slow. What is the efficient alternative?',
      options: [
        { label: 'Compare the full window frequency map to t\'s map each step', isCorrect: false, feedback: 'Comparing frequency maps at every step is O(|alphabet|) per step — 52 comparisons each time. At m = 100,000 steps that is 5.2 million extra operations. An integer counter is O(1) per step.' },
        { label: 'Maintain a single integer counting how many characters are fully covered', isCorrect: true },
        { label: 'Recompute the window sum after each expansion', isCorrect: false, feedback: 'There is no "sum" to track here — coverage is about character counts, not a numeric total. The efficient mechanism is a counter of how many distinct required characters have reached their quota.' },
        { label: 'Use a sorted structure to find the minimum missing character', isCorrect: false, feedback: 'A sorted structure answers "what is missing" but at O(log n) per update. An integer coverage counter answers "is everything covered" in O(1) per character event.' },
      ],
      correctFeedback: 'Keep an integer `have` counting how many distinct characters in t have met their quota in the window. When `have` equals the number of distinct characters in t, the window is valid — O(1) check.',
      wrongFeedback: [
        'You want to check "is the window valid?" in O(1) at every step. What single number encodes "all required characters are satisfied"?',
        'Increment `have` when a character\'s window count exactly reaches its required count; decrement when it drops below. When does `have` equal the number of distinct characters in t?',
      ],
    },
  ],
}
