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
  starterCode: `import heapq

def top_k_frequent(nums, k):
  # Hint: count frequencies, then use a heap to find top k
  pass`,
  functionName: 'top_k_frequent',
  conceptId: 'top-k',
  runnerSetup: `
_orig_top_k = top_k_frequent
def top_k_frequent(nums, k):
  return sorted(_orig_top_k(nums, k))
`,
  testCases: [
    { label: 'Basic', args: [[1,1,1,2,2,3], 2], expected: [1,2] },
    { label: 'Single', args: [[1], 1], expected: [1] },
    { label: 'All same freq', args: [[1,2], 2], expected: [1,2] },
    { label: 'k=3', args: [[4,1,1,2,2,3,3,4,4,4], 3], expected: [1,3,4] },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'nums.length ≤ 10⁵ and you need the top k frequent elements. What does this allow?',
      options: [
        { label: 'O(n²) — compare every pair of elements', isCorrect: false, feedback: 'Comparing every pair of 10⁵ elements is 10¹⁰ operations — completely infeasible. Frequency counting needs only one pass through the array.' },
        { label: 'O(n log k) — count frequencies, then maintain a size-k heap', isCorrect: true },
        { label: 'O(log n) — binary search for the k-th most frequent', isCorrect: false, feedback: 'You cannot find the k-th most frequent without reading every element at least once. O(log n) is impossible here.' },
        { label: 'O(n log n) — sort by frequency and take the first k', isCorrect: false, feedback: 'Sorting all unique values by frequency works but costs O(n log n). A heap of size k reduces this to O(n log k), which is tighter when k ≪ n.' },
      ],
      correctFeedback: 'With n = 10⁵, O(n log k) is well within budget. One pass builds the frequency map in O(n); scanning those frequencies with a size-k heap costs O(n log k).',
      wrongFeedback: [
        'You must read every element to count frequencies — that is already O(n). After that, what is the cheapest way to extract the top k from those frequency counts?',
        'Think about keeping only k elements in the heap at once. Each new frequency value costs O(log k) to compare against the current k-th most frequent.',
      ],
    },
    {
      id: 'two-phase-approach',
      question: 'The hint says "count frequencies, then use a heap." Why are two separate phases needed?',
      options: [
        { label: 'A heap cannot store duplicate values', isCorrect: false, feedback: 'Heaps handle duplicates fine — they order by the key you provide. The reason for two phases is that you need complete frequency counts before you can rank elements by frequency.' },
        { label: 'You must know all frequencies before ranking elements by them', isCorrect: true },
        { label: 'The heap requires a sorted input', isCorrect: false, feedback: 'Heaps do not require sorted input — they accept elements in any order and maintain the heap property internally. The two phases exist because frequency is a derived property, not an input property.' },
        { label: 'Counting and heap insertion are both O(n) so ordering them saves work', isCorrect: false, feedback: 'The reason for two phases is logical, not a performance optimization from ordering. You simply cannot know an element\'s frequency until you have seen all its occurrences.' },
      ],
      correctFeedback: 'An element\'s frequency is only complete after you have processed the entire array. Building the frequency map first, then running the heap over those counts, is the correct dependency order.',
      wrongFeedback: [
        'After seeing just the first element, do you know its final frequency? When is a frequency count finalized for a given value?',
        'The key (frequency) used to rank elements in the heap is computed from the full array. You need all elements processed before any element has a reliable frequency rank.',
      ],
    },
    {
      id: 'heap-type-selection',
      question: 'You want to track the k most frequent elements as you scan frequency counts. Which heap type keeps the right candidate for eviction?',
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
      question: '"Guaranteed the answer is unique." What does this let you skip?',
      options: [
        { label: 'Counting element frequencies', isCorrect: false, feedback: 'You still need frequencies to determine which elements are in the top k. The uniqueness guarantee is about the result set, not about how you compute it.' },
        { label: 'Handling ties at the k-th position', isCorrect: true },
        { label: 'Using a heap', isCorrect: false, feedback: 'The guarantee simplifies tie-breaking, not the choice of data structure. A heap is still the right tool for extracting the top k by frequency.' },
        { label: 'The frequency counting phase', isCorrect: false, feedback: 'You need frequencies regardless. "Unique answer" means there is no ambiguity about which k elements belong in the result — it does not remove the need to compute frequencies.' },
      ],
      correctFeedback: 'Without the guarantee, two elements might share the k-th highest frequency and both could legitimately be in the answer. The guarantee means there is a clean cutoff at rank k — no tie-breaking logic needed.',
      wrongFeedback: [
        'What would you have to do if two elements had the same frequency and only one of them could be in the top k? The guarantee removes that problem.',
        'The "unique answer" constraint means no element sits exactly on the boundary between "in top k" and "not in top k" with the same frequency as another. What edge case does that eliminate from your code?',
      ],
    },
  ],
}
