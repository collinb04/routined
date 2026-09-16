export default {
  id: 'top-k-frequent',
  title: 'Top K Frequent Elements',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code> most frequent elements in any order.',
  examples: [
    { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
    { input: 'nums = [1], k = 1', output: '[1]' },
  ],
  constraints: [
    '1 ≤ nums.length ≤ 10⁵',
    '1 ≤ k ≤ number of unique elements',
    'Guaranteed the answer is unique',
  ],
  starterCode: `class Solution:
    def top_k_frequent(self, nums, k):
        pass`,
  functionName: 'top_k_frequent',
  conceptId: 'top-k',
  runnerSetup: `
_orig_top_k = Solution().top_k_frequent
def top_k_frequent(nums, k):
  return sorted(_orig_top_k(nums, k))
`,
  testCases: [
    { label: 'Basic', args: [[1,1,1,2,2,3], 2], expected: [1,2] },
    { label: 'Single', args: [[1], 1], expected: [1] },
    { label: 'All same freq', args: [[1,2], 2], expected: [1,2] },
    { label: 'k=3', args: [[4,4,4,4,1,1,3,3,2], 3], expected: [1,3,4] },
  ],
  bruteHint: 'A brute-force approach counts the frequency of every element, then orders all unique elements by their frequency counts, and finally takes the first k from that ordered list. Since there can be up to n unique elements, this order-then-slice approach costs O(n log n) time because of the ordering step. Could you avoid fully ordering everything when you only need the top k, not a complete ranking of every element?',
  optimizeComplexity: { time: 'O(n log k)', space: 'O(k)' },
  clues: [
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 10⁵' },
      question: 'The size of the input constraint tells you which time complexities are even feasible, ruling out anything too slow before you settle on an approach. nums.length ≤ 10⁵ and you need the top k frequent elements. What does this allow?',
      options: [
        { label: 'O(n²) — compare every pair of elements', isCorrect: false, feedback: 'Comparing every pair of 10⁵ elements is 10¹⁰ operations — completely infeasible. Frequency counting needs only one pass through the array.' },
        { label: 'O(n log k) — count frequencies, then track only the k largest counts as you go', isCorrect: true },
        { label: 'O(log n) — repeatedly narrow the candidates without reading every element', isCorrect: false, feedback: 'You cannot find the k-th most frequent without reading every element at least once. O(log n) is impossible here.' },
        { label: 'O(n log n) — order every unique element by frequency and take the first k', isCorrect: false, feedback: 'Ordering all unique values by frequency works but costs O(n log n). Tracking only the top k as you scan reduces this to O(n log k), which is tighter when k ≪ n.' },
      ],
      correctFeedback: 'With n = 10⁵, O(n log k) is well within budget. One pass builds the frequency map in O(n); scanning those frequencies while tracking only the top k costs O(n log k).',
      wrongFeedback: [
        'You must read every element to count frequencies — that is already O(n). After that, what is the cheapest way to extract the top k from those frequency counts?',
        'Think about keeping only k elements tracked at once. Each new frequency value costs O(log k) to compare against the current k-th most frequent.',
      ],
    },
    {
      id: 'two-phase-approach',
      question: 'Recognizing that a value depends on information spread across the entire input tells you when a full pass must finish before further processing can begin. The hint says "count frequencies, then use a heap." Why are two separate phases needed?',
      options: [
        { label: 'The structure used for ranking cannot store duplicate values', isCorrect: false, feedback: 'Heaps handle duplicates fine — they order by the key you provide. The reason for two phases is that you need complete frequency counts before you can rank elements by frequency.' },
        { label: 'You must know all frequencies before ranking elements by them', isCorrect: true },
        { label: 'Ranking requires the input to already be sorted', isCorrect: false, feedback: 'Heaps do not require sorted input — they accept elements in any order and maintain the heap property internally. The two phases exist because frequency is a derived property, not an input property.' },
        { label: 'Counting and ranking insertion are both O(n) so ordering them saves work', isCorrect: false, feedback: 'The reason for two phases is logical, not a performance optimization from ordering. You simply cannot know an element\'s frequency until you have seen all its occurrences.' },
      ],
      correctFeedback: 'An element\'s frequency is only complete after you have processed the entire array. Building the frequency map first, then running the heap over those counts, is the correct dependency order.',
      wrongFeedback: [
        'After seeing just the first element, do you know its final frequency? When is a frequency count finalized for a given value?',
        'The key (frequency) used to rank elements in the heap is computed from the full array. You need all elements processed before any element has a reliable frequency rank.',
      ],
    },
    {
      id: 'heap-type-selection',
      highlight: { location: 'constraint', text: '1 ≤ k ≤ number of unique elements' },
      question: 'Picking the correct structure to track a running top-k means knowing exactly which candidate you need fast access to for eviction. You want to track the k most frequent elements as you scan frequency counts. Which heap type keeps the right candidate for eviction?',
      options: [
        { label: 'Max-heap of size k, keyed by frequency', isCorrect: false, feedback: 'A max-heap puts the most frequent element at the top. When a new element arrives, you cannot tell whether to evict the highest or lowest frequency without seeing both — a max-heap of size k hides the least-frequent candidate.' },
        { label: 'Min-heap of size k, keyed by frequency', isCorrect: true },
        { label: 'Max-heap of all unique elements', isCorrect: false, feedback: 'A max-heap of all unique elements lets you pop k times to get the answer, but it requires building the full heap first. A size-k min-heap processes each element in O(log k) as you scan.' },
        { label: 'Min-heap of all unique elements', isCorrect: false, feedback: 'A min-heap of all unique elements would require popping all but k elements to find the top k. A size-k heap is more efficient — evict the minimum as you go, keeping only the top k.' },
      ],
      correctFeedback: 'A min-heap of size k keeps the least frequent of the current top-k at the root. When a more frequent element arrives, pop the root (least frequent) and push the new element. The heap always holds exactly the k most frequent seen so far.',
      wrongFeedback: [
        'You want to evict the least frequent element when a more frequent one arrives. Which heap type gives you fast access to the least frequent element in your current top-k?',
        'The candidate to remove is always the current least frequent among your k. What heap operation gives you that in O(log k)?',
      ],
    },
    {
      id: 'uniqueness-guarantee',
      highlight: { location: 'constraint', text: 'Guaranteed the answer is unique' },
      question: 'Guarantees stated in the problem often let you skip defensive edge-case handling that would otherwise complicate your solution. "Guaranteed the answer is unique." What does this let you skip?',
      options: [
        { label: 'Counting element frequencies', isCorrect: false, feedback: 'You still need frequencies to determine which elements are in the top k. The uniqueness guarantee is about the result set, not about how you compute it.' },
        { label: 'Handling ties at the k-th position', isCorrect: true },
        { label: 'Needing a data structure to track top candidates', isCorrect: false, feedback: 'The guarantee simplifies tie-breaking, not the choice of data structure. A heap is still the right tool for extracting the top k by frequency.' },
        { label: 'The frequency counting phase', isCorrect: false, feedback: 'You need frequencies regardless. "Unique answer" means there is no ambiguity about which k elements belong in the result — it does not remove the need to compute frequencies.' },
      ],
      correctFeedback: 'Without the guarantee, two elements might share the k-th highest frequency and both could legitimately be in the answer. The guarantee means there is a clean cutoff at rank k — no tie-breaking logic needed.',
      wrongFeedback: [
        'What would you have to do if two elements had the same frequency and only one of them could be in the top k? The guarantee removes that problem.',
        'The "unique answer" constraint means no element sits exactly on the boundary between "in top k" and "not in top k" with the same frequency as another. What edge case does that eliminate from your code?',
      ],
    },
  ],
  solution: {
    patternName: 'Bounded top-k via a small heap — use when you need the k best items and k is much smaller than n, so a full ordering is wasted work',
    approaches: [
      {
        approachName: 'Full sort',
        oneLineIdea: 'Count frequencies, then sort all unique values by count',
        subgoals: [
          { label: 'Tally every element', explanation: 'One pass builds a frequency count for every unique value' },
          { label: 'Order everything by frequency', explanation: 'Sorting the unique values fully ranks every element, not just the top k' },
          { label: 'Slice off the top k', explanation: 'The first k entries of the sorted-by-frequency list are the answer' },
        ],
        code: `def top_k_frequent(nums, k):
    counts = {}
    for x in nums:
        counts[x] = counts.get(x, 0) + 1              # tally every element
    ranked = sorted(counts, key=lambda x: -counts[x])  # order everything by frequency
    return ranked[:k]                                  # slice off the top k`,
        timeComplexity: 'O(n log n) — counting is O(n), but sorting all unique values by frequency costs O(n log n) in the worst case where every element is unique',
        spaceComplexity: 'O(n) — the frequency map and the sorted list both scale with the number of unique elements',
        whenYouWouldActuallyUseThis: 'Fine when k is close to n anyway, or when you need the full ranking for something else later — otherwise it does more ordering work than the question actually asked for.',
      },
      {
        approachName: 'Min-heap of size k',
        oneLineIdea: 'Keep only the k most frequent seen so far, evicting the smallest',
        subgoals: [
          { label: 'Tally every element', explanation: 'Frequencies still have to be counted first, exactly as before' },
          { label: 'Maintain a heap bounded to size k', explanation: 'Push each (frequency, value) pair; once the heap exceeds k, pop the smallest' },
          { label: 'Read off the survivors', explanation: 'Whatever remains in the heap after processing every unique value is the top k' },
        ],
        code: `import heapq

def top_k_frequent(nums, k):
    counts = {}
    for x in nums:
        counts[x] = counts.get(x, 0) + 1         # tally every element
    heap = []
    for value, freq in counts.items():
        heapq.heappush(heap, (freq, value))       # maintain a heap bounded to size k
        if len(heap) > k:
            heapq.heappop(heap)
    return [value for freq, value in heap]         # read off the survivors`,
        timeComplexity: 'O(n log k) — counting is O(n); each of the up-to-n unique values costs O(log k) to push/pop against a heap that never exceeds size k',
        spaceComplexity: 'O(n + k) — O(n) for the frequency map, O(k) for the bounded heap',
        whenYouWouldActuallyUseThis: 'The default choice whenever k is small relative to n — you never pay to rank elements outside the top k, which is the entire saving over a full sort.',
      },
    ],
    comparisonTable: [
      { approach: 'Full sort', time: 'O(n log n)', space: 'O(n)', structuralUnlock: 'None — every unique value is fully ranked even though only k are needed' },
      { approach: 'Min-heap of size k', time: 'O(n log k)', space: 'O(n + k)', structuralUnlock: 'Bounding the heap to size k means you only ever pay log k per comparison instead of log n, since elements outside the current top k are discarded immediately' },
    ],
    transferNote: 'The bounded-heap trick reappears anywhere the question is "the best k" rather than "the full order": K Closest Points to Origin (bounding by distance instead of frequency) and Kth Largest Element in a Stream (the same size-k min-heap, maintained incrementally as new elements arrive instead of built once). Whenever k is much smaller than n, look for a way to discard non-contenders immediately instead of ranking everyone.',
    retrievalCheck: [
      'If k were equal to the number of unique elements, would the min-heap approach still be faster than the full sort — why or why not?',
      'If nums arrived one element at a time as a live stream instead of all at once, which of these two approaches adapts more naturally to running incrementally?',
      'Why does the heap need to be a min-heap rather than a max-heap, given that you want the most frequent elements?',
    ],
  },
  solutionCode: `import heapq
from collections import Counter

class Solution:
    def top_k_frequent(self, nums, k):
        count = Counter(nums)
        return heapq.nlargest(k, count.keys(), key=count.get)`,
  solutionComplexity: { time: 'O(n log k)', space: 'O(n)' },
  solutionExplanation: 'Sorting every distinct value by frequency to find the top k costs O(n log n) — <code>heapq.nlargest</code> does the equivalent job in O(n log k) by maintaining a heap that never grows past size k. When k is much smaller than the number of distinct values, that difference is the whole point: no need to fully order values that will never make the cut anyway.',
}
