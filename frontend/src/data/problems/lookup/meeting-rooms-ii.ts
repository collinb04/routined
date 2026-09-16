export default {
  id: 'meeting-rooms-ii',
  title: 'Meeting Rooms II',
  difficulty: 'medium',
  description: 'Given an array of meeting time intervals <code>[start, end]</code>, return the minimum number of conference rooms required to hold all meetings.',
  examples: [
    { input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2', explanation: 'Meetings [0,30] and [5,10] overlap, requiring 2 rooms.' },
    { input: 'intervals = [[7,10],[2,4]]', output: '1' },
  ],
  constraints: ['1 ≤ intervals.length ≤ 10⁴', '0 ≤ start < end ≤ 10⁶'],
  starterCode: `class Solution:
    def min_meeting_rooms(self, intervals):
        pass`,
  runnerSetup: 'min_meeting_rooms = Solution().min_meeting_rooms',
  functionName: 'min_meeting_rooms',
  conceptId: 'intervals',
  testCases: [
    { label: 'Two rooms needed', args: [[[0,30],[5,10],[15,20]]], expected: 2 },
    { label: 'One room', args: [[[7,10],[2,4]]], expected: 1 },
    { label: 'All at same time', args: [[[1,5],[1,5],[1,5]]], expected: 3 },
    { label: 'Sequential', args: [[[1,2],[2,3],[3,4]]], expected: 1 },
  ],
  bruteHint: 'The brute-force approach compares every meeting against every other meeting, checking whether their time ranges overlap so it can count how many are simultaneously active in the worst case. Doing this pairwise comparison for all n meetings costs O(n²) time, and it re-derives overlap information from scratch instead of tracking room usage as it goes. What would let you determine room needs with a single sweep instead of pairwise comparisons?',
  optimizeComplexity: { time: 'O(n log n)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Input-size constraints usually reveal the time complexity the intended solution must hit. intervals.length ≤ 10⁴ tells you…',
      highlight: { location: 'constraint', text: '1 ≤ intervals.length ≤ 10⁴' },
      options: [
        { label: 'O(n²) is fine', isCorrect: false, feedback: 'At n = 10,000, O(n²) is 100 million comparisons — borderline at best in Python. The constraint is nudging you toward a more efficient approach.' },
        { label: 'O(n log n) or better is needed', isCorrect: false, feedback: 'O(n log n) works here and is a natural fit for sorting-based interval approaches. But O(n²) is not clearly ruled out — the constraint is more permissive than n = 10⁶.' },
        { label: 'O(n log n) or O(n²) both acceptable', isCorrect: true },
        { label: 'Input size is irrelevant to approach', isCorrect: false, feedback: 'Input size always shapes the approach. With n up to 10,000, a naive O(n²) scan is slow but not fatal — the constraint tells you a sorting-based O(n log n) solution is comfortably fast.' },
      ],
      correctFeedback: 'With n ≤ 10,000, O(n²) is 100 million ops — slow but not disqualifying. O(n log n) sorting is the practical target and gives you clean structure to work with.',
      wrongFeedback: [
        'Think about 10,000² operations. Is that clearly too slow, clearly fine, or somewhere in between?',
        'At n = 10,000, O(n²) is right on the edge. Sorting-based approaches at O(n log n) are safe. The constraint doesn\'t demand a sublinear trick.',
      ],
    },
    {
      id: 'output-type',
      question: 'The shape of the return value tells you exactly what to compute, not how to compute it. The output is the minimum number of rooms, not a list of assignments. This means…',
      highlight: { location: 'description', text: 'return the minimum number of conference rooms required to hold all meetings.' },
      options: [
        { label: 'Track which room each meeting goes to', isCorrect: false, feedback: 'Assigning meetings to specific rooms does more than required. You only need to know how many rooms are in use at the peak moment — not which meeting is in which room.' },
        { label: 'Track peak concurrent overlap only', isCorrect: true },
        { label: 'Return all possible room configurations', isCorrect: false, feedback: 'The problem asks for a single count, not an enumeration of configurations. Collecting all arrangements would do far more work than the output demands.' },
        { label: 'Merge overlapping intervals first', isCorrect: false, feedback: 'Merging collapses overlapping intervals into one, erasing the overlap signal you need. Two meetings that overlap require two rooms — merging them would hide that.' },
      ],
      correctFeedback: 'The answer is the maximum number of meetings running simultaneously. You need to find that peak overlap count, not construct any particular room assignment.',
      wrongFeedback: [
        'The output is a single integer. What single property of the intervals determines the room count?',
        'Rooms are needed when meetings overlap in time. The minimum rooms required equals the maximum number of meetings active at the same instant.',
      ],
    },
    {
      id: 'overlap-detection',
      question: 'The way overlap is defined determines what processing order will let you detect it efficiently. Two meetings overlap when one starts before the other ends. What does this tell you about how to process intervals?',
      options: [
        { label: 'Compare every pair of meetings', isCorrect: false, feedback: 'Checking all pairs is O(n²). There\'s a pattern in how starts and ends relate that lets you track concurrent meetings without comparing each pair to every other.' },
        { label: 'Sort by start, use a min-heap of end times', isCorrect: true },
        { label: 'Sort by duration, assign greedily', isCorrect: false, feedback: 'Sorting by duration doesn\'t help identify when meetings are concurrent. Overlap is determined by start and end times, not by how long each meeting lasts.' },
        { label: 'Count unique start times', isCorrect: false, feedback: 'Two meetings can share a start time and still need two rooms. Start-time uniqueness says nothing about how many are running simultaneously.' },
      ],
      correctFeedback: 'Sorting by start time lets you process meetings in order of arrival. A min-heap of end times tells you, at each new meeting, whether any room has freed up — its minimum end is the earliest any current meeting finishes.',
      wrongFeedback: [
        'You need to know at each new meeting whether an existing one has ended. What structure gives you the earliest-ending current meeting in O(log n)?',
        'A min-heap ordered by end time always exposes the meeting that finishes soonest. When a new meeting starts, compare its start to that minimum end.',
      ],
    },
    {
      id: 'endpoint-touching',
      question: 'Explicit rules about boundary cases tell you exactly which comparison operator to use. The hint code shows <code>end <= s or start >= e</code> as non-overlapping. Meetings that touch at an endpoint do not overlap. What does this mean for room counting?',
      options: [
        { label: 'A room frees up exactly when a meeting ends', isCorrect: true },
        { label: 'Touching meetings still need separate rooms', isCorrect: false, feedback: 'The problem defines touching endpoints as non-overlapping — so a meeting ending at time 10 and one starting at 10 can share a room. The room becomes available the moment the first meeting ends.' },
        { label: 'Endpoint equality is ambiguous; handle it as a special case', isCorrect: false, feedback: 'It\'s not ambiguous — the constraint defines touching as non-overlapping. That\'s a clear rule, not an edge case requiring special handling.' },
        { label: 'Equality means you need an extra room as buffer', isCorrect: false, feedback: 'No buffer is needed. If one meeting ends exactly when the next begins, that room is immediately reusable. Requiring a buffer would overcount.' },
      ],
      correctFeedback: 'If meeting A ends at time t and meeting B starts at t, B can use A\'s room. This boundary condition means you check start < end (strict), not start ≤ end, when deciding if a conflict exists.',
      wrongFeedback: [
        'The non-overlap condition is end ≤ s or start ≥ e. When exactly does a room become available relative to when a meeting ends?',
        'If end ≤ start means no conflict, then a meeting ending at the exact moment another begins is fine in the same room. What comparison captures that when you check against a heap?',
      ],
    },
  ],
  solutionCode: `import heapq

class Solution:
    def min_meeting_rooms(self, intervals):
        if not intervals:
            return 0
        intervals.sort(key=lambda x: x[0])
        heap = []
        for start, end in intervals:
            if heap and heap[0] <= start:
                heapq.heapreplace(heap, end)
            else:
                heapq.heappush(heap, end)
        return len(heap)`,
  solutionComplexity: { time: 'O(n log n)', space: 'O(n)' },
  solutionCaveat: '<code>heap[0] &lt;= start</code>, not <code>&lt;</code>, is what lets a meeting reuse a room that just freed up at the exact moment the new one begins — matching the "ending at the same instant another starts" case explicitly called out as fine in the same room.',
  solutionExplanation: 'Sorting by start time lets each meeting be considered in the order rooms would actually be requested, and a min-heap of "end times of rooms currently in use" always exposes the room that frees up soonest at its top. If that soonest-freeing room already ended by the time the current meeting starts, reusing it (via <code>heapreplace</code>) avoids allocating a new room; otherwise every currently-tracked room is still busy, and a new one has to be added. The heap\'s final size is exactly the peak number of rooms that were ever simultaneously in use.',
}
