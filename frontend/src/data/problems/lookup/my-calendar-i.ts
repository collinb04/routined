export default {
  id: 'my-calendar-i',
  title: 'My Calendar I',
  difficulty: 'medium',
  description: 'Implement a calendar that can book events. A booking is represented by <code>[start, end)</code>. Implement <code>book(start, end)</code> that adds the event if it does not cause a double booking (overlapping events), returning true if successful.',
  examples: [
    { input: 'book(10,20), book(15,25), book(20,30)', output: '[true, false, true]', explanation: '[15,25) overlaps [10,20). [20,30) starts exactly where [10,20) ends — no overlap.' },
  ],
  constraints: ['0 ≤ start < end ≤ 10⁹', 'At most 1000 calls to book'],
  starterCode: `def my_calendar(operations, events):
  booked = []
  result = []
  for start, end in events:
      ok = all(end <= s or start >= e for s, e in booked)
      if ok:
          booked.append((start, end))
      result.append(ok)
  return result`,
  functionName: 'my_calendar',
  conceptId: 'intervals',
  testCases: [
    { label: 'Overlap rejected', args: [[['book','book','book']],[[10,20],[15,25],[20,30]]], expected: [true,false,true] },
  ],
  bruteHint: 'Describe scanning every existing booking on each new book() call to check for conflicts, and its time complexity',
  optimizeHint: 'Name the structure that keeps bookings sorted so conflicts can be found by binary search instead of a full scan',
  clues: [
    {
      id: 'interval-semantics',
      question: 'Events are represented as <code>[start, end)</code> — a half-open interval. The example shows book(20,30) succeeds after book(10,20). What does this tell you about the overlap check?',
      options: [
        { label: 'Events touching at a boundary always conflict', isCorrect: false, feedback: 'The example directly contradicts this: [10,20) and [20,30) are booked successfully together. The end of one event is not part of its interval — there\'s no conflict when they touch.' },
        { label: 'Two events conflict only if they share interior time', isCorrect: true },
        { label: 'The end time is inclusive, so use ≤ for conflict detection', isCorrect: false, feedback: 'Half-open means the end is exclusive. [10,20) ends before time 20, so [20,30) starting at 20 doesn\'t conflict. Using inclusive-end logic would incorrectly reject valid bookings.' },
        { label: 'Only check if start times are equal', isCorrect: false, feedback: 'Equal start times definitely conflict, but that\'s not the only case. [10,20) and [15,25) overlap even though their starts differ — one start falls inside the other\'s interval.' },
      ],
      correctFeedback: 'Half-open intervals [start, end) mean end is exclusive. Two events conflict when one starts strictly before the other ends AND that other starts strictly before the first ends: not (end ≤ s or start ≥ e).',
      wrongFeedback: [
        'The example shows [10,20) and [20,30) coexist. At what point in time do they both occupy the calendar?',
        'They share no time: [10,20) occupies [10,19.999…) and [20,30) starts at 20. The non-overlap condition is end ≤ s or start ≥ e.',
      ],
    },
    {
      id: 'constraint-call-count',
      question: 'At most 1000 calls to book. What does this tell you about acceptable time complexity per call?',
      options: [
        { label: 'Each call must be O(log n)', isCorrect: false, feedback: 'O(log n) per call would be optimal, but with only 1000 calls total, even O(n) per call gives 1000 × 1000 = 1 million operations — fast enough. A sorted structure with binary search is a nice-to-have, not a requirement.' },
        { label: 'O(n) per call is acceptable; 1000² = 1M ops total', isCorrect: true },
        { label: 'Each call must be O(1)', isCorrect: false, feedback: 'O(1) per call would require a hash-based structure, but intervals can\'t be looked up that way without preprocessing. With only 1000 calls, O(n) per call is perfectly fine.' },
        { label: '1000 calls means you need a priority queue', isCorrect: false, feedback: 'A priority queue helps in problems where you need the min or max efficiently. Here you need to check all booked events for conflict — a priority queue doesn\'t simplify that check.' },
      ],
      correctFeedback: 'With at most 1000 calls, the total work is at most 1000 × 1000 = 1 million comparisons even with O(n) per call. A simple list scan is fast enough — no fancy data structure needed.',
      wrongFeedback: [
        'How many total comparisons happen if each book call scans all prior bookings and there are 1000 calls?',
        '1000 calls × up to 1000 booked events = 1 million comparisons. That\'s trivially fast — the constraint is generous.',
      ],
    },
    {
      id: 'non-overlap-condition',
      question: 'The starter code checks <code>end <= s or start >= e</code> for each booked event (s, e). What does this express?',
      options: [
        { label: 'The new event starts and ends inside the booked one', isCorrect: false, feedback: 'That would check s ≤ start and end ≤ e — containment. The code checks a different condition: whether the new event is entirely before or entirely after the booked one.' },
        { label: 'The new event is entirely before or entirely after the booked one', isCorrect: true },
        { label: 'The new event shares no start time with the booked one', isCorrect: false, feedback: 'Sharing a start time is just one case of overlap. The condition end ≤ s or start ≥ e is more general — it tests whether any overlap exists at all, not just whether starts match.' },
        { label: 'The new event\'s duration is shorter than the booked one', isCorrect: false, feedback: 'Duration has nothing to do with whether events conflict. Two events with very different lengths can still overlap in time.' },
      ],
      correctFeedback: 'end ≤ s means the new event finishes before the booked one starts. start ≥ e means the new event starts after the booked one ends. Either condition means no conflict. If neither holds, they overlap.',
      wrongFeedback: [
        'Draw a number line. When does [start, end) have zero overlap with [s, e)? What are the two non-overlapping positions?',
        'The new event is either entirely left (end ≤ s) or entirely right (start ≥ e) of the booked event. If neither, they intersect.',
      ],
    },
  ],
}
