export default {
  id: 'minimum-arrows-burst-balloons',
  title: 'Minimum Number of Arrows to Burst Balloons',
  difficulty: 'medium',
  description: 'Balloons are represented as intervals on a horizontal axis. An arrow shot at x bursts all balloons whose range includes x. Return the minimum number of arrows needed to burst all balloons.',
  examples: [
    { input: 'points = [[10,16],[2,8],[1,6],[7,12]]', output: '2', explanation: 'One arrow at x=6 bursts [2,8],[1,6]. One arrow at x=11 bursts [10,16],[7,12].' },
    { input: 'points = [[1,2],[3,4],[5,6],[7,8]]', output: '4', explanation: 'None overlap; need 4 arrows.' },
  ],
  constraints: ['1 ≤ points.length ≤ 10⁵', 'points[i].length == 2', '-2³¹ ≤ x_start ≤ x_end ≤ 2³¹ − 1'],
  starterCode: `class Solution:
    def find_min_arrow_shots(self, points):
        pass`,
  runnerSetup: 'find_min_arrow_shots = Solution().find_min_arrow_shots',
  functionName: 'find_min_arrow_shots',
  conceptId: 'intervals',
  testCases: [
    { label: 'Two arrows', args: [[[10,16],[2,8],[1,6],[7,12]]], expected: 2 },
    { label: 'Four separate', args: [[[1,2],[3,4],[5,6],[7,8]]], expected: 4 },
    { label: 'All overlap', args: [[[1,10],[2,9],[3,8]]], expected: 1 },
  ],
  bruteHint: 'A brute-force approach could compare every pair of balloons to see which ones share a common point, merging overlapping pairs into clusters until no more merges are possible. Checking all pairs takes O(n²) time, and repeatedly re-scanning the merged groups adds even more overhead. With up to 100,000 balloons, will that pairwise comparison finish in time?',
  optimizeComplexity: { time: 'O(n log n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Constraints reveal the time complexity budget you have to work within. points.length ≤ 10⁵ tells you…',
      highlight: { location: 'constraint', text: '1 ≤ points.length ≤ 10⁵' },
      options: [
        { label: 'O(n²) is fine', isCorrect: false, feedback: 'At n = 100,000, O(n²) is 10 billion operations — far too slow. You need an approach that scales linearly or near-linearly.' },
        { label: 'O(n log n) or better is required', isCorrect: true },
        { label: 'O(log n) is achievable', isCorrect: false, feedback: 'O(log n) would be faster than reading all input, which is impossible here. With 100,000 balloons you must process each one at least once.' },
        { label: 'A brute-force search is fast enough', isCorrect: false, feedback: 'Brute-force here means trying all arrow positions, which is O(n²) or worse at n = 100,000. The constraint rules that out.' },
      ],
      correctFeedback: 'With n up to 100,000, you need at most O(n log n). Sorting the intervals (O(n log n)) followed by a single greedy sweep (O(n)) fits perfectly.',
      wrongFeedback: [
        'At n = 100,000, how many operations does an O(n²) algorithm perform? Is that acceptable?',
        '100,000² = 10 billion operations. You need something like sorting plus a linear scan — O(n log n) total.',
      ],
    },
    {
      id: 'output-type',
      question: 'Understanding exactly what the return value represents shapes the whole approach you build. The output is the minimum number of arrows, not their positions. This means…',
      highlight: { location: 'description', text: 'Return the minimum number of arrows needed to burst all balloons.' },
      options: [
        { label: 'Record where each arrow lands', isCorrect: false, feedback: 'Arrow positions don\'t appear in the output. You only need to count how many are required — the positions are a means to that count, not the answer itself.' },
        { label: 'Count how many disjoint groups of balloons exist', isCorrect: true },
        { label: 'Enumerate all valid arrow sets', isCorrect: false, feedback: 'Enumeration would be exponential. You need the minimum count, which a greedy strategy finds in O(n log n) — no exhaustive search required.' },
        { label: 'Find the optimal arrow spacing', isCorrect: false, feedback: 'Spacing between arrows isn\'t what you\'re computing. The count is determined by how many non-overlapping groups of balloons exist, not by any geometric spacing.' },
      ],
      correctFeedback: 'Each arrow bursts a maximal cluster of overlapping balloons. The minimum arrow count equals the number of such clusters — groups of balloons with no shared point.',
      wrongFeedback: [
        'One arrow can burst all balloons in a cluster if they share a common point. What are you actually counting?',
        'You\'re counting the minimum number of non-overlapping groups. Each group needs exactly one arrow.',
      ],
    },
    {
      id: 'greedy-end-time',
      question: 'Identifying the core greedy strategy is the key insight for interval problems like this. To burst as many balloons as possible with one arrow, where should you aim?',
      highlight: { location: 'description', text: 'An arrow shot at x bursts all balloons whose range includes x.' },
      options: [
        { label: 'At the start of the first balloon in the group', isCorrect: false, feedback: 'Aiming at the start of the leftmost balloon may miss later balloons that start after that point. You want to stay within every balloon in the group — shooting at the earliest end guarantees that.' },
        { label: 'At the earliest end in the current overlapping group', isCorrect: true },
        { label: 'At the midpoint of all overlapping balloons', isCorrect: false, feedback: 'A midpoint calculation is more complex and not guaranteed to lie within every balloon. The earliest end is always a valid shot point for all balloons whose range extends at least that far.' },
        { label: 'At any x within the widest balloon', isCorrect: false, feedback: 'Shooting inside the widest balloon doesn\'t guarantee hitting narrower ones that might end before the widest one does. You need the point that every current balloon shares — that\'s the earliest end.' },
      ],
      correctFeedback: 'After sorting by end time, the earliest end in any overlapping group is the tightest constraint. Every balloon in that group extends at least to that point, so one arrow there bursts all of them.',
      wrongFeedback: [
        'You want one arrow to hit as many balloons as possible. Which point is guaranteed to be inside every balloon currently in your group?',
        'Sort by end time. The balloon with the earliest end defines how far right your current group can span. Shoot there.',
      ],
    },
    {
      id: 'coordinate-range',
      question: 'Numeric ranges in the constraints often hint at overflow or precision pitfalls you need to guard against. Coordinates range from -2³¹ to 2³¹ − 1. What does this signal about implementation?',
      highlight: { location: 'constraint', text: '-2³¹ ≤ x_start ≤ x_end ≤ 2³¹ − 1' },
      options: [
        { label: 'Use floating-point arithmetic for comparisons', isCorrect: false, feedback: 'Floating-point would introduce rounding errors on large integers. The values fit in 64-bit signed integers — use those for exact comparisons.' },
        { label: 'Use 64-bit integers to avoid overflow', isCorrect: true },
        { label: 'Normalize coordinates to [0, n] before processing', isCorrect: false, feedback: 'Normalization would change interval relationships and require extra O(n log n) work. The algorithm works directly on the raw coordinates with 64-bit integers.' },
        { label: 'The range is too large; remap values onto a smaller set of indices first', isCorrect: false, feedback: 'Coordinate compression is useful for problems needing indexed structures. Here you only compare and sort, so raw 64-bit integers handle the full range without compression.' },
      ],
      correctFeedback: 'The coordinate range spans 2³² values — too large for 32-bit signed integers (max ~2.1 × 10⁹). Use 64-bit integers (Python handles this natively) to avoid overflow in comparisons.',
      wrongFeedback: [
        'x_end can be 2³¹ − 1, which is the maximum 32-bit signed integer. What happens if you add or compare such values in a 32-bit type?',
        'Python integers are arbitrary precision, so this is automatic there. In other languages, use int64 to safely hold values up to 2³¹ − 1.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def find_min_arrow_shots(self, points):
        points.sort(key=lambda p: p[1])
        arrows = 1
        current_end = points[0][1]
        for start, end in points[1:]:
            if start > current_end:
                arrows += 1
                current_end = end
        return arrows`,
  solutionComplexity: { time: 'O(n log n)', space: 'O(1)' },
  solutionCaveat: 'Sorting by *end* coordinate (not start) is what makes the greedy choice optimal — shooting at the earliest-ending balloon\'s end point guarantees that arrow also bursts every other balloon it overlaps, since none of them can end any sooner.',
  solutionExplanation: 'Shooting an arrow at the end coordinate of whichever unburst balloon ends soonest is always at least as good as shooting anywhere else, because that arrow catches every remaining balloon that overlaps it — no balloon ending even sooner exists to be missed. Once that arrow is placed, every balloon it bursts (anything starting at or before that point) can be skipped, and a new arrow is only needed when a balloon starts after the current arrow\'s position, which is exactly the greedy interval-scheduling pattern this shares with the Non-overlapping Intervals problem.',
}
