export default {
  id: 'minimum-speed-arrive-on-time',
  title: 'Minimum Speed to Arrive on Time',
  difficulty: 'medium',
  description: 'You have <code>n</code> trains to take in sequence, with integer distances. You must arrive at exactly <code>hour</code> hours (decimal). Find the minimum speed (integer) to arrive on time, or -1 if impossible.',
  examples: [
    { input: 'dist=[1,3,2], hour=6', output: '1', explanation: 'At speed 1: 1+3+2=6 hours.' },
    { input: 'dist=[1,3,2], hour=2.7', output: '3' },
    { input: 'dist=[1,3,2], hour=1.9', output: '-1' },
  ],
  constraints: ['n == dist.length', '1 ≤ n ≤ 10⁵', '1 ≤ dist[i] ≤ 10⁵', '1 ≤ hour ≤ 10⁷'],
  starterCode: `class Solution:
    def min_speed_on_time(self, dist, hour):
        pass`,
  runnerSetup: 'min_speed_on_time = Solution().min_speed_on_time',
  functionName: 'min_speed_on_time',
  conceptId: 'binary-search',
  testCases: [
    { label: 'Speed 1', args: [[1,3,2],6], expected: 1 },
    { label: 'Speed 3', args: [[1,3,2],2.7], expected: 3 },
    { label: 'Impossible', args: [[1,3,2],1.9], expected: -1 },
  ],
  bruteHint: 'The brute-force approach tries every integer speed starting from 1 upward, checking feasibility of each one in O(n) time until the first one works. Since the required speed could climb as high as 10⁵, this scan costs O(n · maxSpeed) in the worst case. What happens to that runtime as both n and the maximum possible speed grow toward their limits?',
  optimizeComplexity: { time: 'O(n log m)', space: 'O(1)' },
  clues: [
    {
      id: 'monotone-feasibility',
      question: 'Recognizing monotonic behavior in a feasibility check is a strong signal about which search strategy will work efficiently. If speed s gets you there on time, does any speed greater than s also work? What does this property enable?',
      options: [
        { label: 'Greedy: always pick the largest dist', isCorrect: false },
        { label: 'Binary search on the answer', isCorrect: true },
        { label: 'Dynamic programming on subarrays', isCorrect: false, feedback: 'DP breaks a problem into overlapping subproblems. Speed feasibility has no overlapping subproblems — it\'s a single monotone yes/no function.' },
        { label: 'Sort distances, then scan', isCorrect: false, feedback: 'Sorting the distances would change the travel order. The trains run in a fixed sequence, so order is not yours to change.' },
      ],
      correctFeedback: 'Feasibility is monotone: if speed s works, every speed above s also works. That monotone yes/no function is exactly what binary search exploits, cutting the search space in half each step.',
      wrongFeedback: [
        'Higher speed always means less or equal travel time. If feasible(s) is true, what can you say about feasible(s+1)?',
        'When a predicate flips from false to true at some threshold and never flips back, one classic algorithm finds that threshold in O(log(search space)) time.',
      ],
    },
    {
      id: 'search-space-bounds',
      highlight: { location: 'constraint', text: '1 ≤ dist[i] ≤ 10⁵' },
      question: 'Constraint bounds often hand you the exact range a search needs to cover. n ≤ 10⁵ and dist[i] ≤ 10⁵. What is a safe upper bound for the binary search range?',
      options: [
        { label: '10⁷ (from hour upper bound)', isCorrect: false, feedback: 'hour bounds time, not speed. The worst-case minimum speed is driven by the maximum distance and the tightest time budget, not by hour directly.' },
        { label: '10⁵ (maximum dist value)', isCorrect: true },
        { label: '10⁵ × 10⁵ = 10¹⁰', isCorrect: false, feedback: 'That upper bound is correct but far too loose — binary search over 10¹⁰ values takes about 33 iterations, which is fine, but 10⁵ is a tighter and cleaner bound given the constraints.' },
        { label: 'n × max(dist[i])', isCorrect: false },
      ],
      correctFeedback: 'At speed 10⁵ you cover any single leg in 1 hour. Since each non-final leg is ceiling-rounded and dist[i] ≤ 10⁵, speed 10⁵ is always sufficient — making it a safe upper bound for binary search.',
      wrongFeedback: [
        'What is the slowest possible speed that still guarantees each dist[i] can be covered in at most 1 hour?',
        'Speed 10⁵ covers even the longest leg (dist[i] ≤ 10⁵) in exactly 1 hour. How many values does that leave to binary-search over?',
      ],
    },
    {
      id: 'ceiling-rounding-rule',
      question: 'Precise wording about timing rules often hides a computation detail you must replicate exactly. All trains except the last depart on the hour (ceiling rounding). How does this affect feasibility checking?',
      options: [
        { label: 'Ignore the last train; check the rest', isCorrect: false, feedback: 'The last train\'s time is not ceiling-rounded — it uses exact division. Ignoring it means you\'re not accounting for the fractional arrival time.' },
        { label: 'Sum ceil(dist/speed) for all but last, then add exact for last', isCorrect: true },
        { label: 'Use exact division for every train', isCorrect: false, feedback: 'Exact division applies only to the final leg. Earlier trains wait for the next departure hour, so you must ceiling their travel times.' },
        { label: 'Use ceiling division for every train', isCorrect: false, feedback: 'The last train\'s arrival time is fractional — you cannot ceiling-round it, or you\'d overcount and declare feasible solutions impossible.' },
      ],
      correctFeedback: 'The first n-1 legs are ceiling-rounded (you wait for the next whole hour); only the last leg uses exact division. A feasibility check must mix both, or it will misclassify edge cases near the boundary.',
      wrongFeedback: [
        'The problem says "depart on the hour" for all but the last. What does "depart on the hour" imply about how you round each intermediate travel time?',
        'Two different rounding rules apply to two different groups of trains. What is each group, and which rule applies to which?',
      ],
    },
    {
      id: 'impossible-case',
      highlight: { location: 'description', text: 'or -1 if impossible' },
      question: 'A special sentinel return value usually flags an edge case that needs its own explicit check. The problem returns -1 when arrival is impossible. When is it definitely impossible regardless of speed?',
      options: [
        { label: 'When n > hour', isCorrect: false, feedback: 'n > hour is a necessary condition (you need at least n-1 full hours for the first n-1 trains), but it\'s not "definitely impossible." When hour ≤ n-1 is the precise cutoff.' },
        { label: 'When hour ≤ n − 1', isCorrect: true },
        { label: 'When any dist[i] > hour', isCorrect: false, feedback: 'Increasing speed reduces travel time per leg. A large dist[i] is not a hard blocker — it just requires higher speed.' },
        { label: 'When sum(dist) > hour', isCorrect: false, feedback: 'Sum of distances is not the bottleneck because the ceiling rounding on intermediate trains dominates. You could have tiny distances but still miss if n−1 ≥ hour.' },
      ],
      correctFeedback: 'The first n-1 trains each consume at least 1 full hour (ceiling rounding). If hour ≤ n-1, there\'s zero time left for the last train, making arrival impossible at any speed.',
      wrongFeedback: [
        'Each of the first n-1 trains takes at least 1 full hour due to ceiling rounding. What does that imply about the minimum possible total time?',
        'If the first n-1 trains consume at least n-1 hours, what must be true about hour for there to be any time left for the final leg?',
      ],
    },
  ],
  solutionCode: `import math

class Solution:
    def min_speed_on_time(self, dist, hour):
        n = len(dist)
        if hour <= n - 1:
            return -1

        def time_needed(speed):
            total = 0
            for d in dist[:-1]:
                total += math.ceil(d / speed)
            total += dist[-1] / speed
            return total

        lo, hi = 1, 10**7
        while lo < hi:
            mid = (lo + hi) // 2
            if time_needed(mid) <= hour:
                hi = mid
            else:
                lo = mid + 1
        return lo`,
  solutionComplexity: { time: 'O(n log m)', space: 'O(1)' },
  solutionCaveat: 'Every train *except the last* rounds its travel time up to a whole hour (since the next train can only depart on the hour), but the final leg does not need to wait for anything after it, so only it uses exact division — mixing this up would silently overcount the total time needed.',
  solutionExplanation: 'Faster speeds can only ever reduce (or leave unchanged) the total time needed, which makes feasibility monotonic in speed — the exact property binary search needs to zero in on the smallest speed that still finishes on time. If even the fastest reasonable speed can\'t make up for the mandatory whole-hour rounding on every train but the last, arrival is impossible outright, which is exactly what the early <code>hour &lt;= n - 1</code> check catches before any search begins.',
}
