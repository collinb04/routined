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
}
