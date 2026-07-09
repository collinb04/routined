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
  bruteHint: 'Describe what re-sorting every value seen so far would cost if you did it after each addition.',
  optimizeHint: 'Explain why a bounded-size heap of exactly k elements is enough to answer each query in log time.',
  clues: [
    {
      id: 'streaming-constraint',
      question: 'You must report the k-th largest after every addition. What does this rule out?',
      options: [
        { label: 'Sorting all seen elements after each addition', isCorrect: false, feedback: 'Sorting after each addition costs O(n log n) per step, where n grows with the stream. A heap maintains order incrementally at O(log k) per addition.' },
        { label: 'Storing every element ever seen', isCorrect: true },
        { label: 'Using a heap', isCorrect: false, feedback: 'A heap is precisely the right tool here. The streaming constraint rules out approaches that require all elements to be present before computing, not heap-based approaches.' },
        { label: 'Knowing k in advance', isCorrect: false, feedback: 'k is given upfront and is fixed. The streaming constraint is about needing the answer after each element arrives, not about uncertainty in k.' },
      ],
      correctFeedback: 'You only care about the top k elements. Keeping all seen values wastes memory and slows down the query. A heap of exactly size k is sufficient.',
      wrongFeedback: [
        'You need the k-th largest at every step. If you kept every element, how would you find the k-th largest efficiently? Is there a leaner option?',
        'Only the top k elements ever affect the k-th largest value. What does that suggest about how many elements you need to store?',
      ],
    },
    {
      id: 'min-heap-insight',
      question: 'The hint says "use a min-heap of size k; heap[0] is always the kth largest." Why does the minimum of a size-k heap equal the k-th largest overall?',
      options: [
        { label: 'Because Python\'s heapq is a min-heap by default', isCorrect: false, feedback: 'That explains the implementation detail, not the logic. The reason heap[0] is the k-th largest is about what a size-k heap containing the top k elements represents, not about Python\'s default.' },
        { label: 'The heap holds the k largest seen; its minimum is ranked exactly k-th', isCorrect: true },
        { label: 'The k-th largest equals the mean of the top k', isCorrect: false, feedback: 'The mean has nothing to do with the k-th largest. The k-th largest is a specific rank position, not an average of the top k values.' },
        { label: 'heap[0] is always the most recently added element', isCorrect: false, feedback: 'heap[0] in a min-heap is the smallest element in the heap, not the most recent. Insertion order is not preserved in a heap.' },
      ],
      correctFeedback: 'The heap holds exactly the k largest elements seen so far. Everything else is smaller. The smallest element in that top-k group is by definition the k-th largest overall.',
      wrongFeedback: [
        'Imagine the heap contains the k largest values. Every other value seen is smaller than all of them. Where does the k-th largest rank among the heap elements?',
        'If the heap holds the top k values, what is the rank of the smallest element in the heap relative to all values seen so far?',
      ],
    },
    {
      id: 'heap-maintenance',
      question: 'When a new value arrives, how do you maintain a min-heap of exactly size k?',
      options: [
        { label: 'Push the new value; if size > k, pop the maximum', isCorrect: false, feedback: 'A min-heap cannot pop the maximum efficiently — that would require a max-heap or a full scan. The eviction candidate is the minimum (heap[0]), since it is the smallest of the current top-k.' },
        { label: 'Push the new value; if size > k, pop the minimum', isCorrect: true },
        { label: 'Replace heap[0] with the new value unconditionally', isCorrect: false, feedback: 'If the new value is smaller than heap[0], replacing would insert a value smaller than the current k-th largest — it should be ignored, not inserted. You need a comparison first.' },
        { label: 'Rebuild the heap from scratch with all seen elements', isCorrect: false, feedback: 'Rebuilding from all seen elements grows with the stream length and loses the constant-size benefit. Incremental push/pop keeps the heap at size k regardless of how long the stream runs.' },
      ],
      correctFeedback: 'Push the new value (O(log k)), then if len(heap) > k, pop the root (O(log k)). The popped element is the smallest of the top k+1 candidates — it drops out of the top k. heap[0] is now the new k-th largest.',
      wrongFeedback: [
        'After pushing a new element, the heap has k+1 entries. Which one should be evicted to restore size k, and why is it the minimum?',
        'The element that no longer belongs in the top k after a new arrival is the smallest of the k+1 candidates. What heap operation removes the minimum?',
      ],
    },
    {
      id: 'initialization',
      question: 'You are given an initial array nums before the stream begins. How should you initialize the heap?',
      options: [
        { label: 'Push all nums elements into the heap, then trim to size k', isCorrect: true },
        { label: 'Sort nums and take the k largest to seed the heap', isCorrect: false, feedback: 'Sorting works but costs O(n log n). Pushing all elements and trimming is O(n log k), which is tighter. More importantly, the push-and-trim approach is the same logic used for each stream element — consistent and simpler to implement.' },
        { label: 'Ignore nums; start from an empty heap', isCorrect: false, feedback: 'Ignoring nums means the first stream elements have no prior context. The k-th largest after adding the first stream value depends on all previously seen numbers, including those in nums.' },
        { label: 'Push only the k largest elements from nums', isCorrect: false, feedback: 'Finding the k largest from nums requires scanning all of nums anyway. Pushing everything and trimming is equivalent work and avoids a separate selection step.' },
      ],
      correctFeedback: 'Push every element of nums into the heap (O(n log k)), then pop until the heap has exactly k elements. This seeds the heap with the top k values from the initial array before any stream values arrive.',
      wrongFeedback: [
        'The heap should reflect all values seen before the stream starts. How do you get it to size k from an arbitrary initial array?',
        'Push all of nums into the heap, then trim to k. After that, each stream element uses the same push-and-trim logic. What does the heap represent after initialization?',
      ],
    },
  ],
}
