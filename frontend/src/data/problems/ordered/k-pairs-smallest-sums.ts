export default {
  id: 'k-pairs-smallest-sums',
  title: 'Find K Pairs with Smallest Sums',
  difficulty: 'medium',
  description: 'Given two integer arrays sorted in ascending order, find the <code>k</code> pairs <code>(u, v)</code> (one from each array) with the smallest sums.',
  examples: [
    { input: 'nums1=[1,7,11], nums2=[2,4,6], k=3', output: '[[1,2],[1,4],[1,6]]' },
    { input: 'nums1=[1,1,2], nums2=[1,2,3], k=2', output: '[[1,1],[1,1]]' },
  ],
  constraints: ['1 ≤ nums1.length, nums2.length ≤ 10⁵', '-10⁹ ≤ nums1[i], nums2[j] ≤ 10⁹', '1 ≤ k ≤ 10⁴'],
  starterCode: `class Solution:
    def k_smallest_pairs(self, nums1, nums2, k):
        pass`,
  runnerSetup: 'k_smallest_pairs = Solution().k_smallest_pairs',
  functionName: 'k_smallest_pairs',
  conceptId: 'heap',
  testCases: [
    { label: 'Three pairs', args: [[1,7,11],[2,4,6],3], expected: [[1,2],[1,4],[1,6]] },
    { label: 'Duplicate values', args: [[1,1,2],[1,2,3],2], expected: [[1,1],[1,1]] },
  ],
  bruteHint: 'The brute-force approach generates every possible pair (nums1[i], nums2[j]) across both arrays, computes each sum, sorts all pairs by sum, and takes the first k. With both arrays able to hold up to 10^5 elements, the total number of pairs reaches 10^10, so generating and sorting them all is far too slow and memory-heavy to run. Since only k ≤ 10^4 pairs are ever needed, nearly all of that work is wasted before you even look at the result. How could you explore only the most promising pairs instead of every combination?',
  optimizeComplexity: { time: 'O(k log k)', space: 'O(k)' },
  clues: [
    {
      id: 'constraint-brute-force',
      highlight: { location: 'constraint', text: '1 ≤ nums1.length, nums2.length ≤ 10⁵' },
      question: 'Multiplying two input-size bounds together often reveals that a seemingly reasonable approach is actually computationally infeasible. nums1.length and nums2.length can each reach 10⁵. The total number of pairs is up to 10¹⁰. What does this rule out?',
      options: [
        { label: 'Generating all pairs and sorting them', isCorrect: true },
        { label: 'Using a heap at all', isCorrect: false, feedback: '10¹⁰ pairs rules out generating all pairs, not heap usage. A heap-based approach that avoids generating all pairs is exactly what the constraint motivates.' },
        { label: 'Returning k pairs', isCorrect: false, feedback: 'k ≤ 10⁴, so returning k pairs is fine. The constraint rules out approaches that enumerate or sort all n × m pairs before selecting k.' },
        { label: 'Sorting either input array', isCorrect: false, feedback: 'The arrays arrive already sorted — sorting them again would be redundant, but the constraint rules out generating all n × m pairs, not sorting a single array.' },
      ],
      correctFeedback: 'n × m can be 10¹⁰ pairs. Generating and sorting them all is impossible. You need to extract k smallest pairs without enumerating the rest.',
      wrongFeedback: [
        'If nums1 and nums2 each have 10⁵ elements, how many total pairs exist? Is it feasible to list them all?',
        'You only need k ≤ 10⁴ pairs from up to 10¹⁰ candidates. What does that suggest about how much of the pair space you should explore?',
      ],
    },
    {
      id: 'sorted-input-signal',
      highlight: { location: 'description', text: 'sorted in ascending order' },
      question: 'A stated property like sort order rarely appears by accident — it usually exists so you can exploit structure instead of searching blindly. Both arrays are sorted in ascending order. How does this structure your search?',
      options: [
        { label: 'The globally smallest pair must start at (nums1[0], nums2[0])', isCorrect: true },
        { label: 'You can binary search for each next smallest pair', isCorrect: false, feedback: 'Binary search finds a specific value, not the next smallest pair in a 2D grid. The sorted property tells you where to start and how to expand the search, not how to jump to it directly.' },
        { label: 'Sort the arrays in descending order first', isCorrect: false, feedback: 'The arrays are already sorted ascending, and that ascending order is the property you need. Reversing them would destroy the useful structure.' },
        { label: 'The smallest sum is always nums1[0] + nums2[−1]', isCorrect: false, feedback: 'nums2[−1] is the largest element of nums2. The smallest sum uses the smallest elements of both arrays: nums1[0] + nums2[0].' },
      ],
      correctFeedback: 'Because both arrays are sorted, (nums1[0], nums2[0]) is guaranteed to be the smallest pair. From any pair (i, j), the next candidates are (i+1, j) and (i, j+1) — a classic sorted-matrix traversal pattern.',
      wrongFeedback: [
        'With both arrays sorted ascending, where must the pair with the smallest possible sum be located?',
        'If you are at pair (i, j), the next smaller candidates must involve incrementing one index. Which ones, and why?',
      ],
    },
    {
      id: 'heap-expansion-strategy',
      question: 'Anticipating the risks of an expansion strategy before you code it prevents subtle correctness bugs like redundant work. You want to expand the search from the current smallest pair to its neighbors. What risk must you manage?',
      options: [
        { label: 'Heap size growing to n × m', isCorrect: false, feedback: 'A well-managed heap stays small. You only push new candidates when you pop, so heap size grows by at most one per extraction — it stays bounded by the frontier, not by all pairs.' },
        { label: 'Visiting the same pair (i, j) multiple times', isCorrect: true },
        { label: 'Missing pairs because both arrays are infinite', isCorrect: false, feedback: 'The arrays are finite (≤ 10⁵ each). The risk is not missing pairs — it is revisiting the same pair via different expansion paths (i-1,j)→(i,j) and (i,j-1)→(i,j).' },
        { label: 'Pairs with equal sums appearing out of order', isCorrect: false, feedback: 'Equal sums are handled fine by the heap — both will be extracted eventually. The structural risk is deduplication, not ordering of ties.' },
      ],
      correctFeedback: 'From (i, j) you push (i+1, j) and (i, j+1). But (i+1, j+1) can be reached via both paths. Without a visited set or a smarter seeding strategy, you process duplicates and return wrong results.',
      wrongFeedback: [
        'If pair (i, j) is expanded in two different ways, what happens when both paths eventually lead to the same (i, j) being pushed onto the heap?',
        'Track which (i, j) pairs you have already pushed. What data structure prevents the same pair from entering the heap twice?',
      ],
    },
    {
      id: 'output-structure',
      highlight: { location: 'description', text: 'the <code>k</code> pairs <code>(u, v)</code> (one from each array)' },
      question: 'What a problem asks you to return often dictates exactly what auxiliary data you must carry through your algorithm, not just how you order it. The output is a list of k pairs, each a [u, v] from the two arrays. What does this tell you about what to store in the heap?',
      options: [
        { label: 'Store only the sum of each pair', isCorrect: false, feedback: 'The sum is used for ordering, but the output requires the actual values u and v. If you only store the sum, you cannot reconstruct the pair to return it.' },
        { label: 'Store indices (i, j) and the sum for ordering', isCorrect: true },
        { label: 'Store pointers into both arrays', isCorrect: false, feedback: 'Storing indices is effectively storing pointers — but you also need the sum for heap ordering. The heap entry needs all three: sum for comparison, i and j to expand and to reconstruct the output.' },
        { label: 'Store only the values nums1[i] and nums2[j]', isCorrect: false, feedback: 'Values alone let you report the pair, but you cannot expand the search without knowing the indices. You need i and j to push (i+1, j) and (i, j+1) when this pair is popped.' },
      ],
      correctFeedback: 'Each heap entry is (sum, i, j). The sum drives heap ordering, i and j let you reconstruct the pair for output and generate the next candidates (i+1, j) and (i, j+1).',
      wrongFeedback: [
        'When you pop a pair from the heap, you need to do two things: add it to the result, and push its neighbors. What information do you need for both actions?',
        'Heap ordering needs a key (the sum). Expansion needs indices. Output needs the actual values. What single heap entry satisfies all three?',
      ],
    },
  ],
  solutionCode: `import heapq

class Solution:
    def k_smallest_pairs(self, nums1, nums2, k):
        if not nums1 or not nums2:
            return []
        heap = [(nums1[i] + nums2[0], i, 0) for i in range(min(k, len(nums1)))]
        result = []
        while heap and len(result) < k:
            s, i, j = heapq.heappop(heap)
            result.append([nums1[i], nums2[j]])
            if j + 1 < len(nums2):
                heapq.heappush(heap, (nums1[i] + nums2[j + 1], i, j + 1))
        return result`,
  solutionComplexity: { time: 'O(k log k)', space: 'O(k)' },
  solutionCaveat: 'Seeding the heap with only <code>min(k, len(nums1))</code> starting pairs — one per index of <code>nums1</code>, each paired with <code>nums2[0]</code> — is enough, because the true k smallest pairs can never need more than k distinct <code>nums1</code> indices to start from.',
  solutionExplanation: 'Since both arrays are sorted, pairing <code>nums1[i]</code> with <code>nums2[0]</code> for every <code>i</code> gives a starting point that already includes each row\'s smallest possible pair — the heap always has access to the next-best candidate without needing to consider a whole row at once. Popping the smallest sum and pushing that same row\'s next pair (one index over in <code>nums2</code>) mirrors merging k sorted lists, and the process stops the moment k pairs have been collected, so it never explores pairs that couldn\'t possibly make the cut.',
}
