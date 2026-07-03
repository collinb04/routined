export default {
  id: 'kth-largest-stream',
  title: 'Kth Largest in a Stream',
  difficulty: 'easy',
  description: 'Given an integer <code>k</code>, an initial array <code>nums</code>, and a list of values to add one at a time, return the kth largest element in the running stream after each addition. Use a min-heap of size <code>k</code>.',
  examples: [
    { input: 'k=3, nums=[4,5,8,2], stream=[3,5,10,9,4]', output: '[4,5,8,8,8]', explanation: 'After each add, the 3rd largest is tracked.' },
  ],
  constraints: [
    '1 ≤ k ≤ nums.length + 1',
    '-10⁴ ≤ nums[i], stream[i] ≤ 10⁴',
  ],
  starterCode: `import heapq

def kth_in_stream(k, nums, stream):
  # Hint: maintain a min-heap of size k; heap[0] is always the kth largest
  results = []
  # initialize heap with nums...
  for val in stream:
      # add val, maintain size k, append heap[0]
      pass
  return results`,
  functionName: 'kth_in_stream',
  conceptId: 'heaps',
  testCases: [
    { label: 'Basic stream', args: [3, [4,5,8,2], [3,5,10,9,4]], expected: [4,5,8,8,8] },
    { label: 'k=1', args: [1, [1], [2,3]], expected: [2,3] },
    { label: 'Single add', args: [2, [3,1], [2]], expected: [2] },
  ],
}
