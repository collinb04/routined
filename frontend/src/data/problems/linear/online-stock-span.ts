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
  functionName: 'StockSpanner',
  conceptId: 'monotonic-stack',
  testCases: [
    { label: 'Standard sequence', args: [[[100,80,60,70,60,75,85]]], expected: [1,1,1,2,1,4,6] },
  ],
}
