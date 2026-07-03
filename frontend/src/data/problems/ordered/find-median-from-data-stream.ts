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
}
