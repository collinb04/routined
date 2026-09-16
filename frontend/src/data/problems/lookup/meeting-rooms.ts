export default {
  id: 'meeting-rooms',
  title: 'Meeting Rooms',
  difficulty: 'easy',
  description: 'Given an array of meeting time intervals <code>[start, end]</code>, determine if a person can attend all meetings (no two meetings overlap). Meetings that touch at an endpoint do not overlap.',
  examples: [
    { input: 'intervals = [[0,30],[5,10],[15,20]]', output: 'false', explanation: '[0,30] and [5,10] overlap.' },
    { input: 'intervals = [[7,10],[2,4]]', output: 'true', explanation: 'No overlap.' },
  ],
  constraints: [
    '0 ≤ intervals.length ≤ 10⁴',
    '0 ≤ start < end ≤ 10⁶',
  ],
  starterCode: `class Solution:
    def can_attend_all(self, intervals):
        # Hint: sort by start time, then check adjacent pairs
        pass`,
  runnerSetup: 'can_attend_all = Solution().can_attend_all',
  functionName: 'can_attend_all',
  conceptId: 'merge-intervals',
  testCases: [
    { label: 'Overlap', args: [[[0,30],[5,10],[15,20]]], expected: false },
    { label: 'No overlap', args: [[[7,10],[2,4]]], expected: true },
    { label: 'Touching endpoints', args: [[[1,5],[5,10]]], expected: true },
    { label: 'Adjacent overlap', args: [[[1,3],[2,5]]], expected: false },
    { label: 'Empty', args: [[]], expected: true },
  ],
  bruteHint: 'The brute-force approach checks every pair of meetings to see if their time ranges overlap, stopping as soon as one conflicting pair is found. Comparing all pairs like this costs O(n²) time in the worst case, since each of the n meetings could be checked against every other one. Nothing about the order meetings arrive in is used to your advantage here. What property of sorted intervals would let you skip most of those comparisons?',
  optimizeComplexity: { time: 'O(n log n)', space: 'O(1)' },
  clues: [
    {
      id: 'output-type',
      question: 'The type of the return value tells you the minimum amount of work actually required. The output is a single boolean — can you attend all meetings? This means…',
      highlight: { location: 'description', text: 'determine if a person can attend all meetings (no two meetings overlap).' },
      options: [
        { label: 'Find which meetings to drop', isCorrect: false, feedback: 'The question is yes/no: do any two meetings overlap? You don\'t need to identify which meeting causes the conflict — just whether one exists.' },
        { label: 'Detect any single overlap', isCorrect: true },
        { label: 'Return all overlapping pairs', isCorrect: false, feedback: 'The output is one boolean, not a list of pairs. Once you find any overlap, you can immediately return false — there\'s nothing more to collect.' },
        { label: 'Count how many meetings overlap', isCorrect: false, feedback: 'A count would answer a different question. This output only needs you to distinguish "at least one overlap exists" from "none exist."' },
      ],
      correctFeedback: 'A boolean output means you can short-circuit: the first overlap you find is enough to return false. No need to scan all pairs.',
      wrongFeedback: [
        'The output is true or false. What\'s the minimum work needed to produce that answer?',
        'You need to know if any two intervals conflict. The moment you find one conflict, you\'re done.',
      ],
    },
    {
      id: 'sort-enables-adjacent-check',
      question: 'The suggested approach itself often reveals why a simpler check is sufficient. The hint says "sort by start time, then check adjacent pairs." Why does sorting enable an adjacent-only check?',
      options: [
        { label: 'Sorting removes duplicate intervals', isCorrect: false, feedback: 'Sorting doesn\'t remove duplicates — it reorders. The value of sorting is that once intervals are ordered by start, any overlap must involve consecutive intervals: a non-adjacent pair can\'t overlap if the pair between them doesn\'t.' },
        { label: 'After sorting, only neighbors can conflict', isCorrect: true },
        { label: 'Sorting merges overlapping intervals automatically', isCorrect: false, feedback: 'Sorting reorders intervals; it doesn\'t merge them. Merging is a separate step you\'d apply after sorting — and for this problem you don\'t even need to merge, just detect.' },
        { label: 'Unsorted intervals can\'t be compared', isCorrect: false, feedback: 'You can compare unsorted intervals — it just requires checking every pair, which is O(n²). Sorting reduces the problem to O(n log n) by letting you check only neighbors.' },
      ],
      correctFeedback: 'After sorting by start time, if interval i and interval j (j > i + 1) overlapped, then interval i and interval i+1 would overlap too — because i+1 starts no later than j. So adjacent checks are sufficient.',
      wrongFeedback: [
        'Imagine the intervals sorted by start. Could interval 0 overlap with interval 2 without also overlapping with interval 1?',
        'In sorted order, each interval starts at or after the previous one. If a late interval overlapped an early one, the interval between them would catch it first.',
      ],
    },
    {
      id: 'touching-endpoints',
      question: 'Explicit rules about boundary behavior tell you exactly which comparison operator to use. "Meetings that touch at an endpoint do not overlap." What does this tell you about the overlap condition?',
      highlight: { location: 'description', text: 'Meetings that touch at an endpoint do not overlap.' },
      options: [
        { label: 'Use strict inequality: next.start < prev.end', isCorrect: true },
        { label: 'Use ≤: next.start ≤ prev.end', isCorrect: false, feedback: 'Using ≤ would flag touching endpoints as overlaps, but the problem defines them as non-overlapping. That would produce wrong answers on cases like [[1,5],[5,10]].' },
        { label: 'Only check if starts are equal', isCorrect: false, feedback: 'Equal starts do indicate overlap, but that\'s just one overlap case. Two meetings can overlap even with different start times if one starts before the other ends.' },
        { label: 'Touching is ambiguous; add a special case', isCorrect: false, feedback: 'The problem statement defines touching explicitly as non-overlapping. That\'s a precise rule, not an ambiguity.' },
      ],
      correctFeedback: 'Overlap means one meeting starts strictly before the previous one ends: next.start < prev.end. If next.start == prev.end, they\'re touching but not overlapping — the condition must be strict.',
      wrongFeedback: [
        'The test case [[1,5],[5,10]] should return true. What comparison between 5 and 5 produces that?',
        'Touching means equal endpoints. You want to flag overlap, not touching. Should the comparison be < or ≤?',
      ],
    },
    {
      id: 'empty-input-guarantee',
      question: 'Edge cases implied by the input-size constraints need an explicit, well-defined default. intervals.length can be 0. What should you return for an empty list?',
      highlight: { location: 'constraint', text: '0 ≤ intervals.length ≤ 10⁴' },
      options: [
        { label: 'Raise an error — no valid answer', isCorrect: false, feedback: 'An empty schedule has no meetings at all. A person with no meetings to attend trivially attends all of them — the answer is true, not an error.' },
        { label: 'Return false — undefined behavior', isCorrect: false, feedback: 'There\'s nothing conflicting in an empty list. False would claim a conflict exists where none does.' },
        { label: 'Return true — no meetings, no conflicts', isCorrect: true },
        { label: 'Return null — insufficient data', isCorrect: false, feedback: 'The output type is boolean. An empty list of meetings means no conflicts by definition, so true is the correct and well-defined answer.' },
      ],
      correctFeedback: 'Zero meetings means zero conflicts. The correct answer is true, and your loop naturally produces it without any special case — iterating over an empty list does nothing.',
      wrongFeedback: [
        'With zero meetings, are there any overlapping pairs? What does that mean for the boolean output?',
        'Your loop checks adjacent pairs. If there are no pairs to check, what does the loop return by default?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def can_attend_all(self, intervals):
        ordered = sorted(intervals, key=lambda x: x[0])
        for i in range(1, len(ordered)):
            if ordered[i][0] < ordered[i - 1][1]:
                return False
        return True`,
  solutionComplexity: { time: 'O(n log n)', space: 'O(1) extra (sort aside)' },
  solutionCaveat: 'Two meetings that touch exactly at the boundary — one ending at 5, the next starting at 5 — do <em>not</em> overlap. The check is a strict <code>&lt;</code>, not <code>&lt;=</code>, on purpose.',
  solutionExplanation: 'Sorting by start time turns an all-pairs overlap question into a single sweep: once ordered, the only way any two meetings can overlap is if they\'re adjacent in that sorted order, because anything further apart is already separated by everything in between. Checking each meeting only against the one right before it is enough to catch every possible overlap in the whole list.',
}
