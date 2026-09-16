export default {
  id: 'k-closest-points-to-origin',
  title: 'K Closest Points to Origin',
  difficulty: 'medium',
  description: `<p>Given an array of <code>points</code> where <code>points[i] = [xi, yi]</code> represents a point on the X-Y plane and an integer <code>k</code>, return the <code>k</code> closest points to the origin. You may return the answer in any order.</p>`,
  examples: [
    { input: 'points = [[1,3],[-2,2]], k = 1', output: '[[-2,2]]' },
    { input: 'points = [[3,3],[5,-1],[-2,4]], k = 2', output: '[[3,3],[-2,4]]' },
  ],
  constraints: ['1 <= k <= points.length <= 10^4', '-10^4 <= xi, yi <= 10^4'],
  starterCode: `class Solution:
    def k_closest(self, points, k):
        pass`,
  functionName: 'k_closest_run',
  conceptId: 'heap',
  runnerSetup: `def k_closest_run(points, k):
  result = Solution().k_closest(points, k)
  return sorted([sorted(p) for p in result])`,
  testCases: [
    { label: '[[1,3],[-2,2]] k=1', args: [[[1,3],[-2,2]], 1], expected: [[-2,2]] },
    { label: 'k=2', args: [[[3,3],[5,-1],[-2,4]], 2], expected: [[-2,4],[3,3]] },
  ],
  bruteHint: 'The brute-force approach computes the squared distance from the origin for every point, sorts the entire array of n points by that distance, and slices the first k. Sorting costs O(n log n) time and O(n) extra space for the distances, and with points.length up to 10^4 it comfortably finishes in time. But sorting fully orders every point, including the n minus k points you never return. If you only need the k smallest, could you avoid fully ordering the rest of the array?',
  optimizeComplexity: { time: 'O(n log k)', space: 'O(k)' },
  clues: [
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: '1 <= k <= points.length <= 10^4' },
      question: 'Input-size limits tell you which time complexity your solution needs to hit before you write a line of code. points.length ≤ 10⁴ and you need the k closest. What complexity does this allow?',
      options: [
        { label: 'O(n²) — check all pairs of points', isCorrect: false, feedback: 'Checking all pairs of 10⁴ points is 10⁸ operations — unnecessarily slow. There is no pairwise comparison needed here; you are measuring each point against a fixed origin.' },
        { label: 'O(n log k) — maintain a bounded-size candidate set while scanning', isCorrect: true },
        { label: 'O(log n) — binary search the sorted distances', isCorrect: false, feedback: 'O(log n) would mean not reading every point, which is impossible here. You must examine all n points at least once to know which k are closest.' },
        { label: 'O(n log n) — sort all points by distance', isCorrect: false, feedback: 'Sorting all n points works, but O(n log n) is more than necessary. When k is small, maintaining a heap of size k costs only O(n log k), which is tighter.' },
      ],
      correctFeedback: 'With n = 10⁴, O(n log k) is well within budget. A heap of size k processes each of the n points in O(log k), giving total cost O(n log k).',
      wrongFeedback: [
        'You must look at every point at least once. What is the minimum work per point if you maintain a running top-k?',
        'Think about keeping only k points in memory at a time. Each new point costs O(log k) to compare against the current k-th closest.',
      ],
    },
    {
      id: 'distance-metric',
      highlight: { location: 'description', text: 'return the <code>k</code> closest points to the origin.' },
      question: 'Precise wording in a problem statement often signals which computations are strictly necessary and which are wasted effort. "Closest to the origin" — the output is the k nearest points, not the k smallest distances. What does this mean for your distance calculation?',
      options: [
        { label: 'You must compute and store the exact Euclidean distance', isCorrect: false, feedback: 'Exact distance requires a square root. Since you only need to compare distances, you can compare squared distances directly — the ordering is identical and avoids floating-point cost.' },
        { label: 'Compare squared distances; return the original points', isCorrect: true },
        { label: 'Normalize coordinates before comparing', isCorrect: false, feedback: 'Normalization changes the points themselves. You need to compare points by distance but return their original coordinates unchanged.' },
        { label: 'Sort points lexicographically as a tie-breaker', isCorrect: false, feedback: 'The problem says return in any order. There is no tie-breaking rule involving coordinates — only distance from the origin matters.' },
      ],
      correctFeedback: 'x² + y² preserves distance ordering without a sqrt. You compare squared distances during selection and return the original [xi, yi] coordinates in the result.',
      wrongFeedback: [
        'You need to rank points by distance but return their coordinates. Does computing the exact distance (with sqrt) affect which points are selected?',
        'sqrt(a) < sqrt(b) if and only if a < b for non-negative values. What does that let you skip when comparing distances?',
      ],
    },
    {
      id: 'output-any-order',
      highlight: { location: 'description', text: 'You may return the answer in any order.' },
      question: 'Explicit statements about acceptable output format can let you skip entire post-processing steps. "You may return the answer in any order." What does this permission remove from your solution?',
      options: [
        { label: 'The need to track which points belong in the answer', isCorrect: false, feedback: 'You still need to identify the k closest points. "Any order" only removes the sorting step on the output — it does not remove the selection step.' },
        { label: 'The need to sort the final k points before returning', isCorrect: true },
        { label: 'The need to compute distances at all', isCorrect: false, feedback: '"Any order" refers to the output sequence, not the selection criterion. You still need distances to determine which k points are closest.' },
        { label: 'The constraint on k', isCorrect: false, feedback: '"Any order" is about output format, not the size of the result. You still return exactly k points.' },
      ],
      correctFeedback: 'Without an ordering requirement on the output, you skip the final O(k log k) sort. Collect the k points in heap order and return them directly.',
      wrongFeedback: [
        'What extra step would you need if the problem asked for the k closest points in order from closest to farthest?',
        'The permission to return in any order eliminates one post-processing step. Which one?',
      ],
    },
    {
      id: 'heap-type-selection',
      question: 'Once you have committed to a bounded auxiliary structure, the exact operations you need determine which variant of it actually fits. You want to track the k closest points seen so far. Which heap type keeps the right candidate for eviction?',
      options: [
        { label: 'Min-heap of size k, keyed by squared distance', isCorrect: false, feedback: 'A min-heap puts the closest point at the top. When a new point arrives, you cannot tell whether to evict the smallest or largest without seeing both ends — a min-heap of size k hides the farthest candidate.' },
        { label: 'Max-heap of size k, keyed by squared distance', isCorrect: true },
        { label: 'Min-heap of all n points', isCorrect: false, feedback: 'A min-heap of all n points lets you pop k times to get the answer, but it requires O(n) space and O(n log n) build time. A size-k heap is more efficient when k ≪ n.' },
        { label: 'Max-heap of all n points', isCorrect: false, feedback: 'A max-heap of all n points costs O(n) space and does not help directly — you would still need to extract all but k elements to find the closest.' },
      ],
      correctFeedback: 'A max-heap of size k keeps the farthest of your current top-k at the root. When a closer point arrives, pop the root (farthest) and push the new point. The heap always holds exactly the k closest seen so far.',
      wrongFeedback: [
        'You want to evict the farthest point when a closer one arrives. Which heap type gives you fast access to the farthest element?',
        'The candidate to remove is always the current farthest among your k. What heap operation gives you that in O(log k)?',
      ],
    },
  ],
  solutionCode: `import heapq

class Solution:
    def k_closest(self, points, k):
        return heapq.nsmallest(k, points, key=lambda p: p[0]**2 + p[1]**2)`,
  solutionComplexity: { time: 'O(n log k)', space: 'O(k)' },
  solutionCaveat: 'Comparing squared distance rather than true Euclidean distance avoids an unnecessary square root on every point — since square root is monotonic for non-negative values, it never changes which points rank as closest, so computing it would be pure wasted work.',
  solutionExplanation: '<code>heapq.nsmallest</code> maintains a heap of size <code>k</code> internally rather than sorting the entire array, so points that are clearly too far away never need to be fully ordered relative to each other — only relative to whatever is currently the farthest point still inside the top-k. That keeps the cost proportional to <code>n log k</code> instead of the full <code>n log n</code> a complete sort would need.',
}
