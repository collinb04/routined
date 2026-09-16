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
  starterCode: `class Solution:
    def kth_in_stream(self, k, nums, stream):
        pass`,
  functionName: 'kth_in_stream',
  runnerSetup: 'kth_in_stream = Solution().kth_in_stream',
  conceptId: 'heaps',
  testCases: [
    { label: 'Basic stream', args: [3, [4,5,8,2], [3,5,10,9,4]], expected: [4,5,5,8,8] },
    { label: 'k=1', args: [1, [1], [2,3]], expected: [2,3] },
    { label: 'Single add', args: [2, [3,1], [2]], expected: [2] },
  ],
  bruteHint: 'The brute-force approach re-sorts every value seen so far after each new addition, then reads off the k-th largest by index. Sorting costs O(n log n), and with n growing across the whole stream, you pay that cost again on every single call. If the stream has m additions, how much total work have you done, and how much of the sorted order do you actually need to keep around?',
  optimizeComplexity: { time: 'O(log k)', space: 'O(k)' },
  clues: [
    {
      id: 'streaming-constraint',
      question: 'Constraints on when an answer must be produced — after every single update rather than once at the end — often rule out approaches that redo work from scratch each time. You must report the k-th largest after every addition. What does this rule out?',
      highlight: { location: 'description', text: 'return the kth largest element in the running stream after each addition' },
      options: [
        { label: 'Sorting all seen elements after each addition', isCorrect: false, feedback: 'Sorting after each addition costs O(n log n) per step, where n grows with the stream. A heap maintains order incrementally at O(log k) per addition.' },
        { label: 'Storing every element ever seen', isCorrect: true },
        { label: 'Keeping only a small bounded set of candidates instead of the full history', isCorrect: false, feedback: 'That is precisely the right approach here. The streaming constraint rules out approaches that require all elements to be present before computing, not bounded-candidate approaches.' },
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
      question: 'Once you have settled on a candidate structure, you need to verify its core invariant actually produces the value the problem asks for — otherwise the choice is just a guess. The hint says "use a min-heap of size k; heap[0] is always the kth largest." Why does the minimum of a size-k heap equal the k-th largest overall?',
      highlight: { location: 'description', text: 'Use a min-heap of size <code>k</code>.' },
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
      question: 'Knowing which structure to use is only half the battle — you also need a precise rule for keeping it correctly sized as new data arrives. When a new value arrives, how do you maintain a min-heap of exactly size k?',
      highlight: { location: 'description', text: 'a list of values to add one at a time' },
      options: [
        { label: 'Push the new value; if size > k, pop the maximum', isCorrect: false, feedback: 'A min-heap cannot pop the maximum efficiently — that would require a max-heap or a full scan. The eviction candidate is the minimum (heap[0]), since it is the smallest of the current top-k.' },
        { label: 'Push the new value; if size > k, pop the minimum', isCorrect: true },
        { label: 'Replace the smallest tracked value with the new value unconditionally', isCorrect: false, feedback: 'If the new value is smaller than heap[0], replacing would insert a value smaller than the current k-th largest — it should be ignored, not inserted. You need a comparison first.' },
        { label: 'Rebuild the entire tracking structure from scratch using all seen elements', isCorrect: false, feedback: 'Rebuilding from all seen elements grows with the stream length and loses the constant-size benefit. Incremental push/pop keeps the heap at size k regardless of how long the stream runs.' },
      ],
      correctFeedback: 'Push the new value (O(log k)), then if len(heap) > k, pop the root (O(log k)). The popped element is the smallest of the top k+1 candidates — it drops out of the top k. heap[0] is now the new k-th largest.',
      wrongFeedback: [
        'After pushing a new element, the heap has k+1 entries. Which one should be evicted to restore size k, and why is it the minimum?',
        'The element that no longer belongs in the top k after a new arrival is the smallest of the k+1 candidates. What heap operation removes the minimum?',
      ],
    },
    {
      id: 'initialization',
      question: 'Handling the steady-state update rule is not enough — you also need a correct starting point that accounts for any data given before the stream of updates begins. You are given an initial array nums before the stream begins. How should you initialize the heap?',
      highlight: { location: 'description', text: 'an initial array <code>nums</code>' },
      options: [
        { label: 'Insert every element of nums, then trim down to size k', isCorrect: true },
        { label: 'Sort nums and take the k largest as the starting set', isCorrect: false, feedback: 'Sorting works but costs O(n log n). Pushing all elements and trimming is O(n log k), which is tighter. More importantly, the push-and-trim approach is the same logic used for each stream element — consistent and simpler to implement.' },
        { label: 'Ignore nums; start with nothing tracked', isCorrect: false, feedback: 'Ignoring nums means the first stream elements have no prior context. The k-th largest after adding the first stream value depends on all previously seen numbers, including those in nums.' },
        { label: 'Push only the k largest elements from nums', isCorrect: false, feedback: 'Finding the k largest from nums requires scanning all of nums anyway. Pushing everything and trimming is equivalent work and avoids a separate selection step.' },
      ],
      correctFeedback: 'Push every element of nums into the heap (O(n log k)), then pop until the heap has exactly k elements. This seeds the heap with the top k values from the initial array before any stream values arrive.',
      wrongFeedback: [
        'The heap should reflect all values seen before the stream starts. How do you get it to size k from an arbitrary initial array?',
        'Push all of nums into the heap, then trim to k. After that, each stream element uses the same push-and-trim logic. What does the heap represent after initialization?',
      ],
    },
  ],
  solutionCode: `import heapq

class Solution:
    def kth_in_stream(self, k, nums, stream):
        heap = list(nums)
        heapq.heapify(heap)
        while len(heap) > k:
            heapq.heappop(heap)
        results = []
        for val in stream:
            heapq.heappush(heap, val)
            if len(heap) > k:
                heapq.heappop(heap)
            results.append(heap[0])
        return results`,
  solutionComplexity: { time: 'O(log k) per add, amortized', space: 'O(k)' },
  solutionCaveat: 'The heap only ever needs to remember the current top k values, not the full history of everything ever added — every value that gets popped is, by definition, too small to ever matter again once k larger values exist.',
  solutionExplanation: 'A min-heap capped at size k keeps exactly the k largest values seen so far, with the *smallest of those k* sitting at the root — which is precisely the kth largest overall. Adding a new value and immediately trimming back down to size k (by popping the root when the heap overflows) keeps that invariant true after every single addition, so <code>heap[0]</code> is always a valid answer to read off directly.',
}
