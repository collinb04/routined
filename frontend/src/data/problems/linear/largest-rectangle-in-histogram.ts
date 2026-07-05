export default {
  id: 'largest-rectangle-in-histogram',
  title: 'Largest Rectangle in Histogram',
  difficulty: 'hard',
  description: `<p>Given an array of integers <code>heights</code> representing the histogram's bar heights where the width of each bar is 1, return the area of the largest rectangle in the histogram.</p>`,
  examples: [
    { input: 'heights = [2,1,5,6,2,3]', output: '10' },
    { input: 'heights = [2,4]', output: '4' },
  ],
  constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
  starterCode: `def largest_rectangle_area(heights):
  pass`,
  functionName: 'largest_rectangle_area',
  conceptId: 'stack',
  testCases: [
    { label: '[2,1,5,6,2,3]', args: [[2,1,5,6,2,3]], expected: 10 },
    { label: '[2,4]', args: [[2,4]], expected: 4 },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'heights.length ≤ 10^5. A brute-force approach checks every (left, right) pair and finds the minimum height in between. What is that complexity, and is it acceptable?',
      options: [
        { label: 'O(n²) — acceptable at 10^5', isCorrect: false, feedback: 'O(n²) at n = 100,000 is 10 billion operations — far too slow. Even O(n²) without the inner minimum scan is 10 billion; the brute force with minimums is O(n³).' },
        { label: 'O(n³) — not acceptable, need O(n)', isCorrect: true },
        { label: 'O(n log n) — sort heights first', isCorrect: false, feedback: 'Sorting destroys positional information — the rectangle width depends on contiguous bars. Order matters here, so sorting is not a valid first step.' },
        { label: 'O(n²) — not acceptable, need O(n log n)', isCorrect: false, feedback: 'O(n) is achievable with a monotonic stack. The target is linear, not O(n log n).' },
      ],
      correctFeedback: 'Brute force is O(n³): O(n²) pairs × O(n) minimum scan. At n = 100,000 that\'s 10^15 operations. A monotonic stack solves this in O(n) by processing each bar exactly once.',
      wrongFeedback: [
        'How many (left, right) pairs exist for an array of length n? For each pair, how long does finding the minimum height take?',
        'n² pairs × n minimum scan = n³. At n = 100,000, is 10^15 operations feasible? What target does the constraint suggest?',
      ],
    },
    {
      id: 'rectangle-height-bound',
      question: 'A rectangle spanning bars i through j has height equal to the minimum bar in that range. What does this tell you about which bars can "limit" a rectangle?',
      options: [
        { label: 'Every bar limits all rectangles it is part of', isCorrect: false, feedback: 'A bar only limits rectangles when it is the shortest bar in their span. Taller bars within a span are irrelevant — only the minimum height constrains the rectangle.' },
        { label: 'Each bar defines the tallest rectangle where it is the minimum', isCorrect: true },
        { label: 'Only adjacent bars affect each other', isCorrect: false, feedback: 'A short bar in the middle of a long run limits every rectangle that spans across it — not just its immediate neighbors. The minimum over the entire span is what counts.' },
        { label: 'The maximum bar in the array sets the answer', isCorrect: false, feedback: 'The maximum bar height alone doesn\'t determine the answer. A tall bar flanked by short bars produces a narrow rectangle. The best answer balances height against width.' },
      ],
      correctFeedback: 'For each bar, the largest rectangle where that bar is the bottleneck extends left and right as far as adjacent bars are at least as tall. Finding those boundaries for every bar in O(n) is exactly what a monotonic stack does.',
      wrongFeedback: [
        'If bar i has height h, how far left and right can a rectangle of height h extend before it hits a shorter bar?',
        'Each bar is the minimum for some set of spans. Which span gives the maximum area with that bar as the limiting height?',
      ],
    },
    {
      id: 'monotonic-stack-signal',
      question: 'You need the nearest shorter bar to the left and right of each bar. What data structure processes "nearest smaller element" queries in O(n) total?',
      options: [
        { label: 'A sorted array of heights', isCorrect: false, feedback: 'Sorting loses positional information — you need nearest smaller by position, not by value. A sorted array tells you what the smaller values are, not where they sit relative to each bar.' },
        { label: 'A monotonic stack', isCorrect: false },
        { label: 'A stack maintaining increasing heights', isCorrect: true },
        { label: 'A hash map from height to index', isCorrect: false, feedback: 'A hash map retrieves a stored index for a given height, but duplicate heights and non-adjacent bars make this fragile. The nearest-smaller query is inherently positional, not value-lookup.' },
      ],
      correctFeedback: 'A stack that stays sorted in increasing order: when a shorter bar is encountered, every taller bar popped from the stack has found its right boundary. Each bar is pushed and popped at most once — O(n) total.',
      wrongFeedback: [
        'As you scan left to right, when does a bar "know" its right boundary? What event in the scan triggers that?',
        'A stack with elements always in increasing order means any new element shorter than the top immediately reveals the right boundary for the top. How many times is each bar pushed and popped?',
      ],
    },
    {
      id: 'zero-height-bars',
      question: '"0 ≤ heights[i] ≤ 10^4" — heights can be zero. What is the area of any rectangle that includes a bar of height 0?',
      options: [
        { label: 'It depends on the surrounding bars', isCorrect: false, feedback: 'A height-0 bar contributes 0 to any rectangle spanning it. Regardless of neighboring heights, the minimum height for any span that crosses a zero-height bar is 0, so the area is 0.' },
        { label: 'Zero — a height-0 bar blocks all rectangles across it', isCorrect: true },
        { label: 'The height of the widest bar touching it', isCorrect: false, feedback: 'The rectangle height is the minimum across its span. A zero-height bar is always the minimum, collapsing the rectangle area to 0 for any span that includes it.' },
        { label: 'Undefined — zero heights must be filtered out', isCorrect: false, feedback: 'Zero heights are valid input and your algorithm must handle them. They act as natural boundaries: no rectangle of positive area can span across a zero-height bar.' },
      ],
      correctFeedback: 'A zero-height bar collapses any rectangle spanning it to area 0. It acts as a hard boundary, splitting the histogram into independent sections. Your stack naturally handles this by popping all pending bars when height 0 is encountered.',
      wrongFeedback: [
        'If the minimum height in a span is 0, what is 0 × width?',
        'A bar of height 0 is the minimum for any span that includes it. What does that make the rectangle area for every span crossing a zero-height bar?',
      ],
    },
  ],
}
