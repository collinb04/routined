export default {
  id: 'koko-eating-bananas',
  title: 'Koko Eating Bananas',
  difficulty: 'medium',
  description: 'Koko has <code>piles</code> of bananas and <code>h</code> hours. She eats at most <code>k</code> bananas per hour from one pile. Find the minimum integer <code>k</code> such that she can eat all bananas within <code>h</code> hours.',
  examples: [
    { input: 'piles = [3,6,7,11], h = 8', output: '4' },
    { input: 'piles = [30,11,23,4,20], h = 5', output: '30', explanation: 'Must finish each pile in exactly one hour.' },
  ],
  constraints: [
    '1 ≤ piles.length ≤ h ≤ 10⁴',
    '1 ≤ piles[i] ≤ 10⁹',
  ],
  starterCode: `class Solution:
    def min_eating_speed(self, piles, h):
        pass`,
  functionName: 'min_eating_speed',
  runnerSetup: 'min_eating_speed = Solution().min_eating_speed',
  conceptId: 'binary-search-answer',
  testCases: [
    { label: 'Basic', args: [[3,6,7,11], 8], expected: 4 },
    { label: 'Must rush', args: [[30,11,23,4,20], 5], expected: 30 },
    { label: 'Extra time', args: [[30,11,23,4,20], 6], expected: 23 },
    { label: 'Single pile', args: [[10], 3], expected: 4 },
  ],
  bruteHint: 'The brute-force approach tries every possible eating speed k starting from 1 upward, checking each one until you find the smallest k that lets Koko finish within h hours. Since piles[i] can be as large as 10⁹, this scan could take up to a billion iterations, and each check costs O(n) to sum hours across piles — far too slow for the given constraints. Is there a way to narrow down k faster than checking every single value in order?',
  optimizeComplexity: { time: 'O(n log m)', space: 'O(1)' },
  clues: [
    {
      id: 'search-space',
      question: 'Recognizing a bounded range with a monotone yes/no property is often the key to picking the right search strategy. You\'re searching for the minimum k. k is at least 1 and at most max(piles). What does this bounded monotone range suggest?',
      options: [
        { label: 'Try every integer k from 1 to max(piles)', isCorrect: false, feedback: 'piles[i] can be up to 10⁹, so scanning every k from 1 to max(piles) would take up to 10⁹ iterations — far too slow. You need to exploit the monotone structure of the range.' },
        { label: 'Binary search over k in [1, max(piles)]', isCorrect: true },
        { label: 'Sort piles and try k = median pile size', isCorrect: false, feedback: 'The median pile size is not a meaningful starting guess — it doesn\'t account for time or the number of piles. The search space is over k values, and binary search finds the minimum valid one.' },
        { label: 'Set k = sum(piles) / h as the answer', isCorrect: false, feedback: 'The average bananas-per-hour is a lower bound heuristic, but ceil(sum/h) might not be the exact minimum k because pile boundaries matter. You need to verify feasibility, not just compute an average.' },
      ],
      correctFeedback: 'If k bananas/hour works, any k\' > k also works. That monotone feasibility property means binary search finds the minimum valid k in O(log(max(piles))) steps — about 30 steps when piles[i] ≤ 10⁹.',
      wrongFeedback: [
        'Feasibility is monotone: once k is large enough to finish in time, all larger k also work. What algorithm exploits a monotone yes/no boundary?',
        'Binary search needs a range and a monotone property. The range is [1, max(piles)] and the property is "k is sufficient." Binary search finds the lowest valid k in O(log(max(piles))) steps.',
      ],
    },
    {
      id: 'hours-constraint',
      highlight: { location: 'constraint', text: '1 ≤ piles.length ≤ h ≤ 10⁴' },
      question: 'A relationship between two constraint variables can reveal an implicit bound you can exploit. piles.length ≤ h. This means there are at least as many hours as piles. What does this tell you about the maximum useful k?',
      options: [
        { label: 'k can be arbitrarily large — no upper bound needed', isCorrect: false, feedback: 'k = max(piles) is always sufficient — at that speed, every pile takes exactly 1 hour and piles.length ≤ h guarantees enough time. You don\'t need k above max(piles).' },
        { label: 'k = max(piles) is always sufficient — it\'s the upper end of the valid range for k', isCorrect: true },
        { label: 'k must equal h / piles.length exactly', isCorrect: false, feedback: 'h / piles.length is an average, not a threshold. The minimum k depends on pile sizes and their interaction with h, not just the average hours per pile.' },
        { label: 'k = 1 is always sufficient given enough hours', isCorrect: false, feedback: 'At k = 1, the total hours needed equals sum(piles), which could be up to piles.length × 10⁹. That far exceeds h. k = 1 is the lower bound for binary search, not always sufficient.' },
      ],
      correctFeedback: 'At k = max(piles), every pile takes exactly ceil(pile / max(piles)) = 1 hour. With piles.length ≤ h, that always finishes in time. So max(piles) is the tight upper bound for the binary search.',
      wrongFeedback: [
        'What eating speed guarantees every pile finishes in exactly 1 hour? And if each pile takes 1 hour, what constraint ensures h is enough?',
        'At k = max(piles), even the largest pile takes 1 hour. Since piles.length ≤ h, you have enough hours. So k never needs to exceed max(piles).',
      ],
    },
    {
      id: 'feasibility-check',
      question: 'The checker function is what makes binary search on the answer actually work, so it\'s worth nailing down precisely. To binary search, you need to check whether a given k is feasible. What does that check look like?',
      options: [
        { label: 'Sum all piles and compare sum to k × h', isCorrect: false, feedback: 'sum / k gives the average hours needed, but piles are eaten one at a time and you can\'t split hours across piles. You must use ceil for each pile independently: ceil(pile / k).' },
        { label: 'Sum ceil(pile / k) for each pile; check if total ≤ h', isCorrect: true },
        { label: 'Count how many piles exceed k and compare to h', isCorrect: false, feedback: 'Counting piles that exceed k only tells you how many take more than 1 hour — it doesn\'t account for how many extra hours each such pile needs. You must sum the actual hours per pile.' },
        { label: 'Find the largest pile and check if max(piles) / k ≤ h', isCorrect: false, feedback: 'Checking only the largest pile ignores all the others. Feasibility requires summing the hours across all piles: sum of ceil(pile / k) ≤ h.' },
      ],
      correctFeedback: 'For each pile, the hours needed is ceil(pile / k). Sum these across all piles and check if the total is ≤ h. This O(n) check runs O(log(max(piles))) times, giving O(n log(max(piles))) overall.',
      wrongFeedback: [
        'Koko eats one pile per session. For a pile of size p at speed k, how many hours does it take? Use that to compute total hours.',
        'Each pile of size p takes ceil(p / k) hours. Sum over all piles and compare to h. In Python, ceil(p / k) = (p + k - 1) // k.',
      ],
    },
  ],
  solutionCode: `import math

class Solution:
    def min_eating_speed(self, piles, h):
        lo, hi = 1, max(piles)
        def hours_needed(k):
            return sum(math.ceil(p / k) for p in piles)
        while lo < hi:
            mid = (lo + hi) // 2
            if hours_needed(mid) <= h:
                hi = mid
            else:
                lo = mid + 1
        return lo`,
  solutionComplexity: { time: 'O(n × log(max(piles)))', space: 'O(1)' },
  solutionCaveat: '<code>math.ceil</code> matters here: eating a pile of 7 bananas at speed 4 takes 2 hours, not 1.75 — Koko can\'t start a new pile partway through the same hour, so every pile that doesn\'t divide evenly still costs a full extra hour.',
  solutionExplanation: 'The actual pile values never get searched — the *eating speed* does. "Is speed k fast enough to finish in h hours?" is a yes/no question that\'s monotone: every speed faster than a working one also works, every speed slower than a failing one also fails. That monotonicity is what turns "find the minimum speed" into an ordinary binary search over the range [1, max(piles)], collapsing toward the smallest speed for which <code>hours_needed(k) &lt;= h</code>.',
}
