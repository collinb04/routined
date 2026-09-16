export default {
  id: 'longest-repeating-character-replacement',
  title: 'Longest Repeating Character Replacement',
  difficulty: 'medium',
  description: `<p>You are given a string <code>s</code> and an integer <code>k</code>. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most <code>k</code> times.</p><p>Return the length of the longest substring containing the same letter you can get after performing the above operations.</p>`,
  examples: [
    { input: 's = "ABAB", k = 2', output: '4' },
    { input: 's = "AABABBA", k = 1', output: '4' },
  ],
  constraints: ['1 <= s.length <= 10^5', 's consists of only uppercase English letters', '0 <= k <= s.length'],
  starterCode: `class Solution:
    def character_replacement(self, s, k):
        pass`,
  runnerSetup: 'character_replacement = Solution().character_replacement',
  functionName: 'character_replacement',
  conceptId: 'sliding-window',
  testCases: [
    { label: 'ABAB k=2', args: ['ABAB', 2], expected: 4 },
    { label: 'AABABBA k=1', args: ['AABABBA', 1], expected: 4 },
  ],
  bruteHint: 'The brute-force approach tries every possible substring, counts the most frequent character inside it, and checks whether replacing every other character in that substring costs at most k operations. That works, but with roughly n²/2 substrings and a full character count for each one, it runs in O(n³) time. At n up to 100,000, how many operations is that, and would it finish in time?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'validity-condition',
      question: 'A stated limit on how many operations you\'re allowed to use defines an exact arithmetic test for validity. A window of length L is valid if you can make it all one character using at most k replacements — what is the condition in terms of the window\'s character counts?',
      options: [
        { label: 'The window has at most k distinct characters', isCorrect: false, feedback: 'Distinct character count is not the right measure. A window of "AAAB" has 2 distinct characters but only needs 1 replacement — only the non-dominant characters need changing.' },
        { label: 'L − max_count ≤ k', isCorrect: true },
        { label: 'The most frequent character appears at least k times', isCorrect: false, feedback: 'The dominant character\'s count doesn\'t need to reach k — it just needs to be large enough that the remaining characters fit within k replacements. The formula is L − max_count ≤ k.' },
        { label: 'The least frequent character appears at most k times', isCorrect: false, feedback: 'The least frequent character\'s count is irrelevant. What matters is the total number of replacements needed: window length minus the count of the dominant character.' },
      ],
      correctFeedback: 'To make the whole window one character, replace everything except the most frequent character. The cost is L − max_count. If that cost is ≤ k, the window is valid.',
      wrongFeedback: [
        'You want to keep as many characters as possible unchanged. Which character would you keep, and how many would you need to replace?',
        'If the most frequent character in the window appears max_count times, how many replacements do you need to turn the rest into that character?',
      ],
      highlight: { location: 'description', text: 'You can perform this operation at most <code>k</code> times.' },
    },
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. s.length ≤ 10^5. What complexity is achievable with a sliding window?',
      options: [
        { label: 'O(n²) — check every substring', isCorrect: false, feedback: 'O(n²) at n = 100,000 is 10 billion operations. A sliding window processes each character at most twice (once added, once removed), giving O(n).' },
        { label: 'O(n × 26) — iterate over all 26 target characters', isCorrect: false, feedback: 'While iterating over all 26 target characters and running a window per character is a valid O(26n) = O(n) approach, a single window tracking all counts achieves O(n) directly without the outer loop.' },
        { label: 'O(n) with a single window pass', isCorrect: true },
        { label: 'O(n log n) — sort to find dominant character', isCorrect: false, feedback: 'Sorting destroys order, which matters for substrings. You also don\'t need to sort — a frequency count tracked incrementally gives the dominant character in O(1) per step.' },
      ],
      correctFeedback: 'A sliding window with a 26-slot frequency array runs in O(n): each character is added and removed at most once, and max_count is updated in O(1) at each step.',
      wrongFeedback: [
        'How many times does each character enter and leave the window? What total complexity does that give?',
        'The window\'s right pointer advances n times total, and the left pointer advances at most n times. Both together are O(n).',
      ],
      highlight: { location: 'constraint', text: '1 <= s.length <= 10^5' },
    },
    {
      id: 'window-shrink-condition',
      question: 'How you respond when a window breaks its validity rule determines whether you redo work from scratch or reuse what you\'ve already tracked. When the window becomes invalid (L − max_count > k), what is the correct response?',
      options: [
        { label: 'Shrink the window until it is valid again', isCorrect: false, feedback: 'Shrinking until valid would work for correctness, but it\'s unnecessary for finding the maximum. Since you\'re tracking the longest valid window, you only need to shift by one — never shrink below the current best length.' },
        { label: 'Slide the window by one (shift left pointer right by 1)', isCorrect: true },
        { label: 'Reset the window to start after the current right pointer', isCorrect: false, feedback: 'Resetting loses all the progress from the current window. A shift of one position is sufficient — you don\'t need to restart from scratch.' },
        { label: 'Reduce k by the excess and continue', isCorrect: false, feedback: 'k is a fixed parameter — you can\'t reduce it as a strategy. The window\'s validity depends on whether the current content needs more than k replacements.' },
      ],
      correctFeedback: 'You only care about windows longer than the current best. When the window is invalid, slide right by 1 (advance both pointers). The window length stays the same or grows — it never shrinks.',
      wrongFeedback: [
        'You\'re looking for the maximum window length. If a window of size L is invalid, do you need to try smaller sizes, or just move the window forward?',
        'The key insight: the window never needs to shrink below its current size. An invalid window of size L just slides right — you won\'t find a longer answer by shrinking.',
      ],
    },
    {
      id: 'max-count-monotonicity',
      question: 'Knowing which pieces of state are safe to leave stale as a window slides is what keeps each step O(1) instead of forcing a recount. When the left pointer advances, you decrement one character\'s count. Why is it safe to not update max_count downward?',
      options: [
        { label: 'max_count is always equal to k', isCorrect: false, feedback: 'max_count tracks the most frequent character in the current window — it has no fixed relationship to k.' },
        { label: 'A smaller max_count can never produce a longer valid window', isCorrect: true },
        { label: 'The removed character is never the most frequent', isCorrect: false, feedback: 'The removed character could be the most frequent. But since you\'re only looking for windows longer than the current best, a lower max_count on a same-size window would just keep the window invalid.' },
        { label: 'Lowercase letters make the count always increasing', isCorrect: false, feedback: 'The string is uppercase letters, but that\'s irrelevant to max_count monotonicity. The reason is about window size and validity, not character case.' },
      ],
      correctFeedback: 'You\'re only interested in windows longer than the current best. A lower max_count makes the window harder to validate (more replacements needed). Keeping max_count at its historical high ensures you only accept windows that beat the current best length.',
      wrongFeedback: [
        'If max_count drops, does that make the window easier or harder to satisfy the validity condition L − max_count ≤ k?',
        'You only extend the answer when the window grows. A window of the same size with a lower max_count is still invalid — so not updating max_count downward is safe.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def character_replacement(self, s, k):
        count = {}
        left = 0
        max_freq = 0
        best = 0
        for right, ch in enumerate(s):
            count[ch] = count.get(ch, 0) + 1
            max_freq = max(max_freq, count[ch])
            while (right - left + 1) - max_freq > k:
                count[s[left]] -= 1
                left += 1
            best = max(best, right - left + 1)
        return best`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: '<code>max_freq</code> is deliberately never recalculated downward when the window shrinks — it can go stale (overstate the true max in the current window), but that staleness never produces a wrong *answer*, since <code>best</code> is only ever updated with windows that were actually valid when checked.',
  solutionExplanation: 'A window of length L is achievable with at most k replacements exactly when <code>L - max_freq <= k</code> — everything that is not the most frequent character in the window is what needs replacing. Expanding the window to the right and shrinking from the left only when that condition is violated means the window never needs to shrink below the best length already found, so tracking a possibly-stale <code>max_freq</code> is enough to correctly grow toward the true longest valid window in one linear pass.',
}
