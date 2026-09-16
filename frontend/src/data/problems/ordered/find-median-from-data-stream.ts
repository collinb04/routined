export default {
  id: 'find-median-from-data-stream',
  title: 'Find Median from Data Stream',
  difficulty: 'hard',
  description: `<p>The median is the middle value in an ordered integer list. For an odd-length list, it's the middle element; for even-length, it's the mean of the two middle elements.</p><p>Implement a <code>MedianFinder</code> class: <code>add_num(num)</code> adds a number, <code>find_median()</code> returns the median of all elements so far.</p>`,
  examples: [
    { input: 'add(1), add(2), find_median(), add(3), find_median()', output: '1.5, 2.0' },
  ],
  constraints: ['-10^5 <= num <= 10^5', 'There will be at least one element before calling find_median'],
  starterCode: `class MedianFinder:
  def __init__(self):
      pass

  def add_num(self, num):
      pass

  def find_median(self):
      pass`,
  functionName: 'median_finder_run',
  conceptId: 'heap',
  runnerSetup: `def median_finder_run(ops, args):
  mf = MedianFinder()
  results = []
  for op, a in zip(ops, args):
      if op == 'add_num': mf.add_num(a[0])
      elif op == 'find_median': results.append(mf.find_median())
  return results`,
  testCases: [
    { label: 'odd/even', args: [['add_num','add_num','find_median','add_num','find_median'],[[1],[2],[],[3],[]]], expected: [1.5,2.0] },
    { label: 'single', args: [['add_num','find_median'],[[6],[]]], expected: [6.0] },
  ],
  bruteHint: 'The brute-force approach keeps all numbers in a sorted list, inserting each new value into its correct position and reading off the middle element(s) for find_median. Inserting into a sorted array to maintain order costs O(n) per insertion, since existing elements must shift to make room. With add_num and find_median interleaved many times as the stream grows, what does that O(n) insertion cost do to your overall performance over a long stream?',
  optimizeComplexity: { time: 'O(log n)', space: 'O(n)' },
  clues: [
    {
      id: 'streaming-structure',
      question: 'How often an operation will be called — and in what order — tells you whether you can defer work or must handle it incrementally. add_num and find_median are called interleaved many times. This means you need a data structure that…',
      options: [
        { label: 'Sorts the array on every find_median call', isCorrect: false, feedback: 'Sorting on every find_median call costs O(n log n) per query. With many interleaved calls, that compounds quickly. You need a structure that stays ordered incrementally.' },
        { label: 'Maintains order incrementally as elements arrive', isCorrect: true },
        { label: 'Stores all elements and sorts once at the end', isCorrect: false, feedback: 'find_median is called mid-stream, not just at the end. Deferring all sorting means you cannot answer queries until the stream is complete.' },
        { label: 'Counts elements without storing them', isCorrect: false, feedback: 'You need to know the actual middle value, not just how many elements exist. Counts alone cannot recover the median.' },
      ],
      correctFeedback: 'Each add_num must update the structure so find_median can answer in O(1) or O(log n). The key is incremental maintenance — not batch processing.',
      wrongFeedback: [
        'find_median can be called after every single insertion. What does that rule out about when you can sort?',
        'You need the median available at any moment. What structure stays ordered as you insert elements one at a time?',
      ],
      highlight: { location: 'description', text: 'returns the median of all elements so far' },
    },
    {
      id: 'median-access-pattern',
      question: 'The exact value you must produce narrows down which pieces of the underlying data you actually need fast access to. The median is always the middle element (or average of two middle elements). What does this tell you about which elements you need fast access to?',
      options: [
        { label: 'The maximum element', isCorrect: false, feedback: 'The maximum is an extreme, not the middle. Fast max access does not help you find the median unless the structure also exposes the boundary of the lower half.' },
        { label: 'The top and bottom of the two halves', isCorrect: true },
        { label: 'Every element in sorted order', isCorrect: false, feedback: 'You only need the boundary elements — the largest of the smaller half and the smallest of the larger half. Keeping full sorted order is more than necessary.' },
        { label: 'The minimum element', isCorrect: false, feedback: 'The minimum is an extreme. For the median you need the element at the center boundary, not the edge of the whole range.' },
      ],
      correctFeedback: 'The median is determined by exactly two values: the max of the lower half and the min of the upper half. A max-heap and a min-heap give you both in O(1).',
      wrongFeedback: [
        'Imagine the stream split into a lower half and an upper half. Which specific element from each half determines the median?',
        'You need the largest element of the bottom half and the smallest element of the top half. What structure exposes those two elements instantly?',
      ],
      highlight: { location: 'description', text: 'the middle element' },
    },
    {
      id: 'two-heap-balance',
      question: 'When a solution relies on two cooperating structures, the invariant you maintain between them determines whether the answer stays correct after every update. You split elements into a lower half (max-heap) and an upper half (min-heap). What invariant must you maintain after each add_num?',
      options: [
        { label: 'Both heaps always have the same size', isCorrect: false, feedback: 'Sizes can differ by one when the total count is odd. Forcing equal sizes would be impossible for odd-length streams.' },
        { label: 'Sizes differ by at most one, and max-heap top ≤ min-heap top', isCorrect: true },
        { label: 'The max-heap always has one more element', isCorrect: false, feedback: 'The larger heap can be either one, and it depends on the total count. What matters is that the boundary values stay correctly partitioned.' },
        { label: 'All elements in max-heap are less than all in min-heap', isCorrect: false, feedback: 'This ordering is necessary but incomplete — without balancing sizes, the "middle" element could be buried deep in one heap and unreachable in O(1).' },
      ],
      correctFeedback: 'Two invariants together: the partition order (max-heap top ≤ min-heap top) and the size balance (differ by ≤ 1). Both are required to read the median in O(1).',
      wrongFeedback: [
        'Think about what find_median needs to do in O(1). What two conditions on the heaps make that possible?',
        'You need fast access to the middle value. What must be true about the sizes and the boundary values of the two heaps?',
      ],
    },
    {
      id: 'output-type',
      question: 'The exact return type — and how it varies across cases — tells you which branches your logic must explicitly handle. find_median returns a float even when all elements are integers. What does this tell you?',
      options: [
        { label: 'You need to store elements as floats', isCorrect: false, feedback: 'Elements can remain integers. The float output comes from the even-length case — averaging two integers — not from how elements are stored.' },
        { label: 'You must handle even-length and odd-length cases separately', isCorrect: true },
        { label: 'The median is always an average of two values', isCorrect: false, feedback: 'Only when the total count is even. For odd-length streams the median is the exact middle element, returned as a float for type consistency.' },
        { label: 'Integer division is sufficient for the answer', isCorrect: false, feedback: 'Integer division would truncate the average in even-length cases. The example shows 1.5 as a valid output — integer division would give 1.' },
      ],
      correctFeedback: 'Odd count → return the top of the larger heap directly. Even count → average the two heap tops. Both paths must produce a float.',
      wrongFeedback: [
        'The first example returns 1.5 for two elements and 2.0 for three. What changes between those two calls?',
        'When total count is odd vs. even, how does the median calculation differ? Your return logic needs to branch on that.',
      ],
      highlight: { location: 'description', text: 'the mean of the two middle elements' },
    },
  ],
  solutionCode: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = []
        self.large = []

    def add_num(self, num):
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def find_median(self):
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0`,
  solutionComplexity: { time: 'O(log n) per add, O(1) per median', space: 'O(n)' },
  solutionCaveat: 'Every number is pushed to <code>small</code> first and then shuffled to <code>large</code> if needed — never pushed to <code>large</code> directly — which guarantees every value passes through the max-heap\'s comparison against the current lower half before landing on the correct side, even if it should end up in <code>large</code>.',
  solutionExplanation: 'Splitting all numbers into a max-heap of the smaller half and a min-heap of the larger half, kept within one element of each other in size, means the median is always sitting at the top of one or both heaps — no sorting required. Routing every new number through <code>small</code> first and immediately rebalancing by moving its largest element to <code>large</code> keeps the invariant "everything in small ≤ everything in large" true after every single insertion, which is what makes an O(1) median lookup possible.',
}
