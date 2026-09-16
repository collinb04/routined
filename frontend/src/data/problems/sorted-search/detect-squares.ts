export default {
  id: 'detect-squares',
  title: 'Detect Squares',
  difficulty: 'medium',
  description: 'Design a data structure that receives points one by one. Given a new point, count the number of ways to form an axis-aligned square using the new point and three other previously added points.',
  examples: [
    { input: 'add([3,10]), add([11,2]), add([3,2]), count([11,10])', output: '1', explanation: 'The square (3,2),(3,10),(11,2),(11,10) is valid.' },
  ],
  constraints: ['point.length == 2', '0 ≤ point[i] ≤ 1000', 'At most 3000 calls to add and count'],
  starterCode: `class Solution:
    def detect_squares(self, operations, points):
        pass`,
  functionName: 'detect_squares',
  runnerSetup: 'detect_squares = Solution().detect_squares',
  conceptId: 'hash-maps',
  testCases: [
    { label: 'One square', args: [['add','add','add','count'],[[3,10],[11,2],[3,2],[11,10]]], expected: [null,null,null,1] },
    { label: 'No square', args: [['add','add','count'],[[0,0],[1,1],[2,2]]], expected: [null,null,0] },
  ],
  bruteHint: 'The brute-force approach checks every triplet of previously stored points against the new query point on each count call, testing whether the four points form an axis-aligned square. With up to n stored points, examining all triplets costs O(n³) per query. If count is called up to 3000 times against thousands of stored points, how many total operations would that brute-force check require?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'axis-aligned-constraint',
      question: 'A geometric constraint in the description can eliminate the need to search at all. "Axis-aligned square" means all sides are horizontal or vertical. What does this tell you about how to find the other three corners?',
      highlight: { location: 'description', text: 'axis-aligned square' },
      options: [
        { label: 'Check all triplets of stored points', isCorrect: false, feedback: 'Checking all triplets is O(n³) per count call. Axis-aligned means you can derive the other three corners from just the query point and one diagonal point — no search needed.' },
        { label: 'Fix a diagonal point; the other two corners are determined', isCorrect: true },
        { label: 'Use the slope between points to detect right angles', isCorrect: false, feedback: 'Slope checks work for general squares but are unnecessary here. Axis-aligned squares have horizontal and vertical sides — the corners share x or y coordinates, so you can derive them arithmetically.' },
        { label: 'Sort stored points by x, then scan for matching y values', isCorrect: false, feedback: 'Sorting helps for range queries but not here. Once you pick a diagonal point opposite the query point, the other two corners are fixed by their shared coordinates.' },
      ],
      correctFeedback: 'For an axis-aligned square with query point (px, py) and a diagonal point (x, y), the side length is |x − px| and the other two corners must be (px, y) and (x, py). The geometry is fully determined.',
      wrongFeedback: [
        'In an axis-aligned square, if you know two diagonal corners (px, py) and (x, y), can you deduce the other two corners without searching?',
        'The other two corners are (px, y) and (x, py) — they\'re forced by the axis-aligned constraint. Your job is to check whether those points exist in your data structure.',
      ],
    },
    {
      id: 'duplicate-points',
      question: 'How a data structure problem is used, including whether duplicates are allowed, shapes what you must track. Points can be added multiple times. The example has at most 3000 calls. How should your data structure handle duplicates?',
      highlight: { location: 'constraint', text: 'At most 3000 calls to add and count' },
      options: [
        { label: 'Keep only unique points, ignoring how many times each was added', isCorrect: false, feedback: 'A set loses count information. If the same point is added three times, three different squares using that point are valid — multiplying by the count is essential.' },
        { label: 'Count occurrences; multiply counts when forming squares', isCorrect: true },
        { label: 'Reject duplicate points on add', isCorrect: false, feedback: 'The problem doesn\'t restrict duplicates — they\'re intentional. Each duplicate creates additional valid squares, so you must track how many times each point was added.' },
        { label: 'Keep every added point and rescan all of them on each query', isCorrect: false, feedback: 'Iterating a list on every count call repeats work and makes the logic harder. A frequency map gives O(1) lookup per candidate point.' },
      ],
      correctFeedback: 'Store a frequency map: point → count. When all four corners of a candidate square exist, multiply the counts of the three stored corners together to get the number of distinct ways.',
      wrongFeedback: [
        'If point (3, 2) was added twice and it\'s one corner of a valid square, how many squares does that contribute?',
        'Each stored corner can be any of its duplicate copies independently. Multiply the three corner counts: count[A] × count[B] × count[C].',
      ],
    },
    {
      id: 'counting-strategy',
      question: 'When a constraint caps how many operations you can perform, it tells you how expensive each individual query is allowed to be. For a query point (px, py), describe the counting strategy that avoids checking every pair of stored points.',
      options: [
        { label: 'Iterate over all stored x-values; fix the diagonal; check the two remaining corners', isCorrect: true },
        { label: 'Iterate over all pairs of stored points as potential sides', isCorrect: false, feedback: 'Iterating all pairs is O(n²) per query. With up to 3000 calls that\'s 3000 × 3000² ≈ 27 billion operations. The axis-aligned constraint lets you do better.' },
        { label: 'Check every possible coordinate combination directly for matching corners', isCorrect: false, feedback: 'Coordinates go up to 1000, so a 2D array is feasible for storage, but iterating it for every query is still O(1000²) per call. You need to iterate only distinct x-values, not all grid cells.' },
        { label: 'Iterate over all stored y-values, searching for a matching x-coordinate', isCorrect: false, feedback: 'Binary search isn\'t needed — a hash map gives O(1) lookup. More importantly, iterating y-values doesn\'t naturally give you the diagonal; iterating x-values (or points) does.' },
      ],
      correctFeedback: 'For each distinct x-coordinate seen, try x as the diagonal\'s x-coordinate. The side length is |x − px|, and the two remaining corners are (px, py ± side) and (x, py ± side). Check both sign options and sum the products.',
      wrongFeedback: [
        'Fix the query point as one corner. You need to pick the diagonally opposite corner. What attribute of that corner can you iterate over efficiently?',
        'Iterate over each distinct x-value in your stored points. For each x, compute the implied side length, derive the other two corners, and check if they exist.',
      ],
    },
  ],
  solutionCode: `from collections import defaultdict

class Solution:
    def detect_squares(self, operations, points):
        point_counts = defaultdict(int)
        result = []
        for op, point in zip(operations, points):
            if op == 'add':
                point_counts[tuple(point)] += 1
                result.append(None)
            else:
                px, py = point
                total = 0
                for x, y in list(point_counts.keys()):
                    if y == py and x != px:
                        side = abs(x - px)
                        total += point_counts[(x, y)] * point_counts.get((px, py + side), 0) * point_counts.get((x, py + side), 0)
                        total += point_counts[(x, y)] * point_counts.get((px, py - side), 0) * point_counts.get((x, py - side), 0)
                result.append(total)
        return result`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'Only points sharing the query\'s y-coordinate are ever considered as a candidate corner — that is one of the three points an axis-aligned square actually needs, so checking any point that doesn\'t share a row with the query would waste time on combinations that can never form a valid square with it.',
  solutionExplanation: 'For a square anchored at the query point, one of its other three corners must sit in the exact same row (same y) at some other x — once that candidate is found, the side length is fixed at <code>|x - px|</code>, and the remaining two corners are forced into exactly two possible positions, one square above and one below. Multiplying the counts at all three required positions (rather than just checking existence) correctly accounts for duplicate points, since each duplicate at a corner creates that many additional ways to form the same square.',
}
