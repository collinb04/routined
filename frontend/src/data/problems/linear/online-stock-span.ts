export default {
  id: 'online-stock-span',
  title: 'Online Stock Span',
  difficulty: 'medium',
  description: 'Design a class <code>StockSpanner</code> that collects daily stock prices and returns the span of the current price — the number of consecutive days (including today) where the price was ≤ today\'s price.',
  examples: [
    { input: 'next(100), next(80), next(60), next(70), next(60), next(75), next(85)', output: '[1,1,1,2,1,4,6]' },
  ],
  constraints: ['1 ≤ price ≤ 10⁵', 'At most 10⁴ calls to next'],
  starterCode: `class StockSpanner:
  def __init__(self):
      pass

  def next(self, price):
      pass`,
  functionName: 'stock_span_run',
  runnerSetup: `def stock_span_run(prices):
    spanner = StockSpanner()
    return [spanner.next(p) for p in prices]`,
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'Standard sequence', args: [[100,80,60,70,60,75,85]], expected: [1,1,1,2,1,4,6] },
  ],
  bruteHint: 'One approach scans backward from today through every previously seen price, counting consecutive days where price ≤ today\'s price, stopping at a larger price or the start of history. Each call to next() can look back through all of the prior days, so across up to 10⁴ total calls the worst-case work is O(n²) — roughly 50 million comparisons. If many of those backward scans re-examine prices already accounted for by earlier calls, what would let you skip over them instead of rescanning each time?',
  optimizeComplexity: { time: 'O(1)', space: 'O(n)' },
  clues: [
    {
      id: 'online-processing',
      question: 'Whether a problem can be solved with a fresh scan each time or needs persistent state changes which structure is even possible. "Collects daily stock prices" one at a time, without seeing future prices. What does this imply about storage?',
      highlight: { location: 'description', text: 'collects daily stock prices' },
      options: [
        { label: 'Collect every price first, then answer queries afterward', isCorrect: false, feedback: 'Prices arrive one at a time and you must answer immediately — there is no batch of prices available upfront to collect first.' },
        { label: 'You must maintain state between calls', isCorrect: true },
        { label: 'Process each price independently', isCorrect: false, feedback: 'The span depends on prior prices, so each call cannot be processed independently. You need accumulated history.' },
        { label: 'Buffer prices and answer in bulk', isCorrect: false, feedback: 'The problem returns a span for each call immediately — buffering and answering in bulk contradicts the online design.' },
      ],
      correctFeedback: 'Each next() call must answer using only prices seen so far. The class must store relevant history in __init__ so subsequent calls can use it.',
      wrongFeedback: [
        'You get one price at a time and must return its span instantly. What does that mean for the __init__ method?',
        'With no future prices available, the class must accumulate past information. What should __init__ initialize for next() to use?',
      ],
    },
    {
      id: 'span-definition',
      question: 'Precisely nailing down what quantity you\'re tracking determines which structure can maintain it efficiently. The span is "consecutive days (including today) where the price was ≤ today\'s price." For next(75) = 4 in the example, what does that mean?',
      highlight: { location: 'description', text: 'consecutive days (including today) where the price was ≤ today\'s price' },
      options: [
        { label: 'The 4 highest prices before today', isCorrect: false, feedback: 'The span counts consecutive days going backward from today where the condition holds — not the 4 largest prices overall.' },
        { label: 'Days back until a strictly greater price', isCorrect: true },
        { label: 'Days since the last equal price', isCorrect: false, feedback: 'The span continues past equal prices. You stop only when you find a price strictly greater than today\'s.' },
        { label: 'Total days where price ≤ 75 in history', isCorrect: false, feedback: 'The span is consecutive days going backward — not a count of all past days where price ≤ 75 regardless of continuity.' },
      ],
      correctFeedback: 'For next(75): looking back, prices were 60, 70, 60, which are all ≤ 75, then 80 > 75 stops the streak. That is 3 prior days + today = 4.',
      wrongFeedback: [
        'Span means a consecutive run. What breaks the run when counting backward from today?',
        'You count today plus each previous day going back as long as that day\'s price ≤ today. What stops the count?',
      ],
    },
    {
      id: 'naive-approach-cost',
      question: 'Recognizing how per-call cost scales with the number of calls tells you whether the naive approach is fast enough at this scale. At most 10⁴ calls to next. If each call linearly scans all prior prices, what is the worst-case total work?',
      highlight: { location: 'constraint', text: 'At most 10⁴ calls to next' },
      options: [
        { label: 'O(n) total — each call is O(1)', isCorrect: false, feedback: 'A linear scan per call is O(k) for the k-th call, not O(1). Summed over n calls, that is O(n²).' },
        { label: 'O(n²) total — 10⁸ operations', isCorrect: true },
        { label: 'O(n log n) total — n calls with log n scan', isCorrect: false, feedback: 'A linear scan backward is O(k) per call, not O(log n). You would need binary search or a sorted structure for log n lookup.' },
        { label: 'O(1) per call by only checking a fixed recent range', isCorrect: false, feedback: 'A fixed recent range does not directly give span, which varies. The span can extend arbitrarily far back.' },
      ],
      correctFeedback: 'With n = 10⁴ calls and a linear backward scan, the worst case is 1 + 2 + … + 10,000 ≈ 50 million comparisons — borderline. A stack-based approach gives amortized O(1) per call.',
      wrongFeedback: [
        'If call k scans k prior prices, what is the total work summed over all n calls?',
        'Sum 1 + 2 + … + n = n(n+1)/2. At n = 10,000 that is about 50 million. Is there a way to avoid rescanning prices you have already "crossed"?',
      ],
    },
    {
      id: 'monotonic-stack-insight',
      question: 'Realizing which past information becomes permanently irrelevant tells you what you are allowed to throw away for good. When today\'s price is higher than a previous day\'s price, does that previous day\'s price ever affect any future span calculation?',
      options: [
        { label: 'Yes — it could limit a future span', isCorrect: false, feedback: 'A future price must be ≥ today to span past today. If today already dominates the previous day, a future price that reaches today also reaches the previous day automatically. The previous day\'s raw price is redundant.' },
        { label: 'No — it is permanently dominated and can be discarded', isCorrect: true },
        { label: 'Only if a future price equals it exactly', isCorrect: false, feedback: 'Equal prices do not resurrect a dominated entry. Once a day is behind a higher day, all future spans either stop at the higher day or pass it — the lower day adds nothing.' },
        { label: 'Only if there are no higher prices between them', isCorrect: false, feedback: 'The presence of higher prices between them is exactly what dominated means. A dominated day is never the stopping point for any future span.' },
      ],
      correctFeedback: 'Once a day\'s price is ≤ the current price, no future span will stop there — it either stops at today or passes today entirely. You can collapse dominated days into a (price, span) pair and discard their individual records.',
      wrongFeedback: [
        'Imagine a future price of 200. Would it stop at any day with price ≤ today\'s price, or would it skip past all of them?',
        'A future price that passes today automatically passes all days today dominates. What data structure lets you skip those days in bulk?',
      ],
    },
  ],
  solutionCode: `class StockSpanner:
    def __init__(self):
        self.stack = []

    def next(self, price):
        span = 1
        while self.stack and self.stack[-1][0] <= price:
            span += self.stack.pop()[1]
        self.stack.append((price, span))
        return span`,
  solutionComplexity: { time: 'O(1) amortized', space: 'O(n)' },
  solutionCaveat: 'Storing each entry as <code>(price, span)</code> — not just the price — is what makes the merge O(1) amortized per popped day: absorbing a run of already-collapsed days costs the same as absorbing a single day, since their combined span was already computed when they were pushed.',
  solutionExplanation: 'Any earlier day whose price is at most today\'s price is completely dominated: it can never again be the boundary that stops some future day\'s span, because today already reaches past it. Popping it — and folding its own already-known span into today\'s running total — means a future day never has to rediscover that it was ≤ today\'s price by looking at it individually. Each day is pushed once and popped at most once across the whole sequence of calls, so the total work across n calls stays O(n), even though a single call can occasionally pop many days at once.',
}
