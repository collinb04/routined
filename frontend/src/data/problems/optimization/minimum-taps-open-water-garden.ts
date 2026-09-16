export default {
  id: 'minimum-taps-open-water-garden',
  title: 'Minimum Number of Taps to Open to Water a Garden',
  difficulty: 'hard',
  description: 'A garden has n+1 points (0 to n). Each tap at position i waters [i-ranges[i], i+ranges[i]]. Return the minimum taps to water the entire garden, or -1 if impossible.',
  examples: [
    { input: 'n=5, ranges=[3,4,1,1,0,0]', output: '1', explanation: 'Tap 1 covers [1-4, 1+4] = [-3, 5], watering the whole garden.' },
    { input: 'n=3, ranges=[0,0,0,0]', output: '-1' },
  ],
  constraints: ['1 ≤ n ≤ 10⁴', '0 ≤ ranges[i] ≤ 100'],
  starterCode: `class Solution:
    def min_taps(self, n, ranges):
        pass`,
  runnerSetup: 'min_taps = Solution().min_taps',
  functionName: 'min_taps',
  conceptId: 'dp-2d',
  testCases: [
    { label: 'One tap', args: [5,[3,4,1,1,0,0]], expected: 1 },
    { label: 'Impossible', args: [3,[0,0,0,0]], expected: -1 },
    { label: 'Two taps', args: [3,[0,0,0,1]], expected: -1 },
  ],
  bruteHint: 'The brute-force approach recursively tries every subset of taps, checking after each choice whether the union of selected intervals covers the entire garden from 0 to n. With up to 10,000 taps, that means exploring roughly 2^n subsets, each requiring O(n) time to verify coverage — an exponential blowup that becomes hopeless past even small n. What would let you decide, position by position, which tap to open without ever revisiting a past decision?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraints tell you the time complexity a working solution must hit before you write any code. n ≤ 10⁴ and ranges[i] ≤ 100 tell you…',
      highlight: { location: 'constraint', text: '1 ≤ n ≤ 10⁴' },
      options: [
        { label: 'O(n²) is definitely too slow', isCorrect: false, feedback: 'At n = 10,000, O(n²) is 100 million operations — borderline but not clearly too slow. The constraints actually permit O(n) solutions, which is more natural given the interval structure.' },
        { label: 'An O(n) or O(n log n) approach fits cleanly', isCorrect: true },
        { label: 'Try all 2ⁿ subsets of taps', isCorrect: false, feedback: '2^10,000 is astronomically large. Brute-force subset enumeration is never viable at n = 10,000. The structure of the problem — intervals covering a line — calls for something smarter.' },
        { label: 'ranges[i] ≤ 100 is irrelevant', isCorrect: false, feedback: 'ranges[i] ≤ 100 bounds how far each tap reaches. It means each tap covers at most 200 positions, which limits how much any single tap can contribute and informs the interval-reduction step.' },
      ],
      correctFeedback: 'With n ≤ 10,000 positions and bounded reach per tap, an O(n) greedy or DP over positions is the target. Sorting or a single linear pass are both viable.',
      wrongFeedback: [
        'You have n+1 positions and taps with bounded reach. What complexity does a linear scan of positions suggest?',
        'Think about reducing each tap to its leftmost and rightmost coverage, then sweeping through positions once. That\'s O(n).',
      ],
    },
    {
      id: 'interval-reduction',
      question: 'Recognizing how each input element translates into a coverage range is what turns this into a solvable interval problem. Each tap at position i waters [i-ranges[i], i+ranges[i]]. This means…',
      highlight: { location: 'description', text: 'Each tap at position i waters [i-ranges[i], i+ranges[i]]' },
      options: [
        { label: 'Model as: left endpoint → farthest right reachable', isCorrect: true },
        { label: 'Sort taps by center position i', isCorrect: false, feedback: 'Sorting by center position doesn\'t help — what matters is the left boundary of coverage. Two taps centered at different positions might have the same left boundary but different right extents.' },
        { label: 'Treat each position as an independent subproblem', isCorrect: false, feedback: 'Positions are not independent — a tap at position i covers a range of them simultaneously. Treating them independently loses the interval-coverage structure entirely.' },
        { label: 'Group overlapping ranges into merged clusters', isCorrect: false, feedback: 'Union-find tracks connected components, not which tap extends coverage the farthest. The key operation here is "from this left boundary, how far right can one tap reach?" — a different question.' },
      ],
      correctFeedback: 'Reduce each tap to: its left boundary (max(0, i-ranges[i])) maps to its right boundary (min(n, i+ranges[i])). Then at each position p, you know the farthest right a tap starting at or before p can reach.',
      wrongFeedback: [
        'What two things characterize each tap\'s coverage? Can you express that as a mapping from left edge to right edge?',
        'Build an array where max_reach[p] = the farthest right any tap covering position p can reach. Then sweep from left to right using that array.',
      ],
    },
    {
      id: 'impossible-case',
      question: 'Special return values often signal an edge case your main algorithm must detect, not just handle as an afterthought. The problem returns -1 if full coverage is impossible. This means…',
      highlight: { location: 'description', text: 'or -1 if impossible' },
      options: [
        { label: 'Always assume coverage is possible', isCorrect: false, feedback: 'The second example — ranges=[0,0,0,0] — shows coverage can be impossible. Assuming it\'s always possible skips an essential check.' },
        { label: 'Check for gaps: a position unreachable by any tap', isCorrect: true },
        { label: 'Return -1 only if no taps exist', isCorrect: false, feedback: 'Taps always exist (ranges has n+1 entries), but they might have zero reach. The impossible case is a gap in coverage, not an absence of taps.' },
        { label: 'Sort taps by left boundary to detect gaps', isCorrect: false, feedback: 'Sorting is one way to detect gaps, but the simpler approach is: if at any point during your sweep the farthest reachable position hasn\'t advanced past the current one, you\'ve found a gap.' },
      ],
      correctFeedback: 'During the greedy sweep, if current coverage can\'t reach the next position you need to cover, return -1. That gap means no tap can bridge it.',
      wrongFeedback: [
        'If your current coverage ends at position p and no tap can reach beyond p, what does that mean for positions p+1 onward?',
        'Track the farthest position your chosen taps cover. If that ever falls short of where you need to be next, there\'s an uncoverable gap — return -1.',
      ],
    },
    {
      id: 'greedy-vs-dp',
      question: 'How a problem phrases its optimization target — minimizing a count versus minimizing a weighted cost — determines whether a greedy choice is even valid. The goal is the minimum number of taps, not minimum total cost. This means…',
      highlight: { location: 'description', text: 'Return the minimum taps to water the entire garden' },
      options: [
        { label: 'Minimize taps greedily: always extend coverage farthest', isCorrect: true },
        { label: 'DP over cost of each tap combination', isCorrect: false, feedback: 'All taps have equal "cost" (each counts as 1). Minimizing count — not weighted cost — means at each step you just want the tap that extends your coverage the most. That\'s a greedy choice, not a weighted optimization.' },
        { label: 'Try all combinations; return shortest', isCorrect: false, feedback: 'Enumerating all subsets is 2^(n+1) possibilities at n = 10,000 — not feasible. The interval-coverage structure allows a greedy approach that is provably optimal.' },
        { label: 'BFS over possible coverage states', isCorrect: false, feedback: 'BFS works for this problem but uses O(n) space for the state queue and is equivalent to the greedy sweep in practice. The greedy approach is simpler and equally correct.' },
      ],
      correctFeedback: 'Minimum count with equal-weight intervals is a classic greedy interval cover: always pick the tap that extends your coverage the farthest, just like Jump Game II.',
      wrongFeedback: [
        'Every tap costs 1 to open. What greedy criterion maximizes progress toward full coverage with the fewest taps?',
        'This is the "minimum jumps" pattern: from your current coverage endpoint, find the tap whose right boundary goes the farthest. Open it, advance, repeat.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def min_taps(self, n, ranges):
        max_reach = [0] * (n + 1)
        for i, r in enumerate(ranges):
            left = max(0, i - r)
            right = min(n, i + r)
            max_reach[left] = max(max_reach[left], right)

        taps = 0
        curr_end = 0
        farthest = 0
        i = 0
        while curr_end < n:
            while i <= curr_end:
                farthest = max(farthest, max_reach[i])
                i += 1
            if farthest <= curr_end:
                return -1
            taps += 1
            curr_end = farthest
        return taps`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'Each tap is reduced to just its <code>leftmost</code> reachable position mapping to its <code>rightmost</code> — the same "jump game" reduction used for interval-covering problems — so the algorithm never needs to reason about a tap\'s center position, only where its coverage starts and how far it extends.',
  solutionExplanation: 'This is the same greedy structure as Jump Game II: sweeping through every position up to the current coverage boundary, tracking the single farthest right edge any of those positions\' taps can reach, then jumping the boundary out to that farthest point counts the minimum number of taps needed to extend coverage — because each tap is equally "priced" at 1, the provably optimal choice at each step is always the one that reaches the farthest, never something needing a weighted comparison. If the boundary can\'t be pushed past where it already is during a sweep, no tap bridges that gap, which is exactly the impossible case.',
}
