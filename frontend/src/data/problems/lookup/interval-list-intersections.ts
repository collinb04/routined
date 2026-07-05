export default {
  id: 'interval-list-intersections',
  title: 'Interval List Intersections',
  difficulty: 'medium',
  description: 'Given two lists of closed intervals <code>firstList</code> and <code>secondList</code>, return the intersection of these two interval lists.',
  examples: [
    { input: 'firstList=[[0,2],[5,10],[13,23],[24,25]], secondList=[[1,5],[8,12],[15,24],[25,26]]', output: '[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]' },
  ],
  constraints: ['0 ≤ firstList.length, secondList.length ≤ 1000', '0 ≤ start ≤ end ≤ 10⁹', 'Both lists are sorted and pairwise disjoint'],
  starterCode: `def interval_intersection(first_list, second_list):
  pass`,
  functionName: 'interval_intersection',
  conceptId: 'intervals',
  testCases: [
    { label: 'Standard', args: [[[0,2],[5,10],[13,23],[24,25]],[[1,5],[8,12],[15,24],[25,26]]], expected: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]] },
    { label: 'Empty first', args: [[],[[1,2]]], expected: [] },
    { label: 'No intersection', args: [[[1,2]],[[3,4]]], expected: [] },
  ],
  clues: [
    {
      id: 'two-pointer-structure',
      question: 'Both lists are sorted and pairwise disjoint. What traversal pattern does this enable?',
      options: [
        { label: 'Nested loop over both lists', isCorrect: false, feedback: 'A nested loop compares every pair — O(n × m), up to 1,000,000 comparisons. Sorted input lets you advance pointers instead of restarting the inner list each time.' },
        { label: 'Two pointers advancing through each list', isCorrect: true },
        { label: 'Merge both lists, then scan for overlaps', isCorrect: false, feedback: 'Merging first loses the list identity you need to compute intersections. The two-pointer approach works directly on the separate sorted lists without combining them.' },
        { label: 'Binary search firstList for each secondList interval', isCorrect: false, feedback: 'Binary search finds a single interval in O(log n), but you still need to process all intervals — and advancing both pointers together is simpler and equally fast.' },
      ],
      correctFeedback: 'Sorted + disjoint means once an interval in one list ends before an interval in the other starts, you advance the pointer in the list with the earlier ending interval. One pass through both lists together.',
      wrongFeedback: [
        'Both lists are sorted. What pattern lets you walk two sorted sequences simultaneously without nested loops?',
        'When two sorted sequences are compared element by element, you advance the pointer that is "behind." What data structure supports that?',
      ],
    },
    {
      id: 'intersection-formula',
      question: 'For two overlapping closed intervals, what is the intersection?',
      options: [
        { label: '[min(start1, start2), max(end1, end2)]', isCorrect: false, feedback: 'That is the union — it expands to cover both intervals. Intersection contracts to only the shared region.' },
        { label: '[max(start1, start2), min(end1, end2)]', isCorrect: true },
        { label: '[start1, end2] always', isCorrect: false, feedback: 'Fixing endpoints by list order ignores which interval starts later or ends sooner. The intersection depends on which boundary is tighter.' },
        { label: 'Average all four endpoints', isCorrect: false, feedback: 'Averaging endpoints produces a point, not an interval, and only by coincidence near the overlap. You need the tightest shared boundaries.' },
      ],
      correctFeedback: 'The intersection starts where the later interval begins and ends where the earlier interval ends: [max(s1, s2), min(e1, e2)]. This is only valid when max(s1,s2) ≤ min(e1,e2).',
      wrongFeedback: [
        'If [0,5] and [3,8] overlap, what range do they share? Think about which start is later and which end is earlier.',
        'Intersection means what both intervals have in common. You want the tighter start and the tighter end.',
      ],
    },
    {
      id: 'advance-pointer-rule',
      question: 'After checking a pair for intersection, which pointer should advance?',
      options: [
        { label: 'Always advance the firstList pointer', isCorrect: false, feedback: 'Advancing only one pointer means you never fully scan the other list. You might miss intersections between the skipped intervals and remaining ones.' },
        { label: 'Advance the pointer whose interval ends first', isCorrect: true },
        { label: 'Advance both pointers every time', isCorrect: false, feedback: 'Advancing both simultaneously skips the case where one interval can intersect multiple intervals in the other list before being exhausted.' },
        { label: 'Advance whichever interval starts later', isCorrect: false, feedback: 'The interval that started later may extend far beyond the current partner — it could intersect several more. The interval that ends first is the one that cannot match any further intervals in the other list.' },
      ],
      correctFeedback: 'The interval with the smaller end value cannot overlap any future intervals in the other list (they all start later). Advance that pointer to find new candidates.',
      wrongFeedback: [
        'After a comparison, one interval can no longer intersect anything ahead in the other list. Which one is it?',
        'An interval is "exhausted" as a candidate when every future interval in the other list starts after it ends. Which endpoint tells you that?',
      ],
    },
    {
      id: 'closed-interval-boundary',
      question: '"Closed intervals" — endpoints are included. How does this affect the overlap check?',
      options: [
        { label: 'Touching endpoints do not overlap', isCorrect: false, feedback: 'For closed intervals [a,b] and [b,c], the point b belongs to both — that is an intersection. Touching endpoints count as overlap in closed intervals.' },
        { label: 'Overlap exists when max(s1,s2) ≤ min(e1,e2)', isCorrect: false },
        { label: 'Overlap requires strict inequality: max(s1,s2) < min(e1,e2)', isCorrect: false, feedback: 'Strict inequality would miss the point-intersection case like [1,2] ∩ [2,3] = [2,2]. For closed intervals, ≤ is the correct check.' },
        { label: 'Touching endpoints count as an intersection', isCorrect: true },
      ],
      correctFeedback: 'For closed intervals, [max(s1,s2), min(e1,e2)] is valid whenever max(s1,s2) ≤ min(e1,e2) — equality means a single-point intersection like [5,5], which still appears in the output.',
      wrongFeedback: [
        'The example output contains [5,5]. What kind of intervals produce a single-point result?',
        'Closed means both endpoints are included. If two intervals share only an endpoint, does that count as an intersection?',
      ],
    },
  ],
}
