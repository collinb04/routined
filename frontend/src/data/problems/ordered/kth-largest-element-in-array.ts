export default {
  id: 'kth-largest-element-in-array',
  title: 'Kth Largest Element in an Array',
  difficulty: 'medium',
  description: `<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code>th largest element in the array. Note that it is the <code>k</code>th largest element in sorted order, not the <code>k</code>th distinct element. You must solve it in O(n) average time complexity.</p>`,
  examples: [
    { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
    { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' },
  ],
  constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
  starterCode: `def find_kth_largest(nums, k):
  pass`,
  functionName: 'find_kth_largest',
  conceptId: 'heap',
  testCases: [
    { label: 'k=2', args: [[3,2,1,5,6,4], 2], expected: 5 },
    { label: 'k=4', args: [[3,2,3,1,2,4,5,5,6], 4], expected: 4 },
  ],
  clues: [
    {
      id: 'constraint-o-n-required',
      question: '"You must solve it in O(n) average time complexity." What does this rule out?',
      options: [
        { label: 'Using any heap', isCorrect: false, feedback: 'A min-heap of size k processes n elements at O(log k) each, giving O(n log k) — which satisfies the constraint when k is small. The O(n) requirement rules out O(n log n) sorting, not all heaps.' },
        { label: 'Sorting the full array first', isCorrect: true },
        { label: 'Looking at every element', isCorrect: false, feedback: 'O(n) means you must look at every element — that is the n. The constraint rules out anything slower than linear on average, not faster.' },
        { label: 'Returning a single integer', isCorrect: false, feedback: 'The output type is unrelated to time complexity. O(n) is a constraint on how much work the algorithm does, not on what it returns.' },
      ],
      correctFeedback: 'Sorting takes O(n log n). The problem explicitly forbids that path. O(n) average points toward quickselect, which finds the k-th element by partitioning without fully sorting.',
      wrongFeedback: [
        'O(n log n) sorting followed by indexing is the obvious approach. What does the O(n) requirement say about that?',
        'The O(n) constraint rules out algorithms that process the data in more than linear passes on average. Which common approach does that eliminate?',
      ],
    },
    {
      id: 'kth-largest-definition',
      question: '"Kth largest in sorted order, not kth distinct." What does this clarification signal?',
      options: [
        { label: 'Duplicate values count separately toward the rank', isCorrect: true },
        { label: 'You must deduplicate before finding the answer', isCorrect: false, feedback: 'Deduplicating would change the answer. The problem says the 4th largest in [3,2,3,1,2,4,5,5,6] is 4, counting duplicates — deduplication would give a wrong result.' },
        { label: 'The answer is always unique', isCorrect: false, feedback: 'The answer value may itself appear multiple times in the array. The clarification is about counting, not about value uniqueness.' },
        { label: 'k is always less than the number of distinct values', isCorrect: false, feedback: 'k can equal or exceed the number of distinct values. The clarification tells you how to count, not how k relates to distinct element count.' },
      ],
      correctFeedback: 'In sorted [6,5,5,4,3,2] with k=2, the 2nd largest is 5 (not 4). Duplicates hold their positions in the sorted order and each count as a separate rank.',
      wrongFeedback: [
        'In [3,2,3,1,2,4,5,5,6] with k=4, the sorted order is [6,5,5,4,...]. What is the element at position 4?',
        'Sort the second example and count from the largest down. Which position holds the 4th largest, counting duplicates as separate entries?',
      ],
    },
    {
      id: 'quickselect-partition',
      question: 'Quickselect finds the k-th element in O(n) average by partitioning. What is the key operation in each step?',
      options: [
        { label: 'Choose a pivot; partition array so elements left < pivot < elements right', isCorrect: true },
        { label: 'Merge two sorted halves like merge sort', isCorrect: false, feedback: 'Merge sort is O(n log n) and does not stop early at the k-th element. Quickselect partitions and recurses into only one side, achieving O(n) average.' },
        { label: 'Binary search the value range from -10⁴ to 10⁴', isCorrect: false, feedback: 'Binary searching the value range requires counting elements less than a midpoint — that is a separate O(n) scan per step, leading to O(n log(max_val)) not O(n). Quickselect partitions positions, not values.' },
        { label: 'Build a complete sorted order, then index', isCorrect: false, feedback: 'Building a full sorted order is O(n log n) — exactly what the O(n) requirement rules out. Quickselect stops as soon as the pivot lands in the k-th position.' },
      ],
      correctFeedback: 'After partitioning, the pivot is in its final sorted position. If that position equals k-1 (0-indexed from largest), you are done. Otherwise recurse into the one side that contains rank k.',
      wrongFeedback: [
        'After placing a pivot, you know exactly how many elements are larger than it. How does that tell you which side to recurse into?',
        'Quickselect recurses into only one partition per step, unlike quicksort which recurses into both. What determines which side to recurse into?',
      ],
    },
    {
      id: 'worst-case-awareness',
      question: 'Quickselect is O(n) average but O(n²) worst case. What causes the worst case?',
      options: [
        { label: 'Choosing the median as the pivot every time', isCorrect: false, feedback: 'Choosing the true median as pivot is the ideal case — it halves the partition every time, giving O(n) guaranteed. The problem is with a bad pivot, not a good one.' },
        { label: 'Consistently choosing the min or max as pivot on a sorted input', isCorrect: true },
        { label: 'Having many duplicate values in the array', isCorrect: false, feedback: 'Duplicates can cause unbalanced partitions but are usually handled with a three-way partition. The classic worst case is always picking the extremal element as pivot on already-sorted data.' },
        { label: 'Recursing into both partitions', isCorrect: false, feedback: 'Quickselect only recurses into one partition. Recursing into both is what quicksort does, and that is O(n log n) not O(n²). The worst case comes from unbalanced partitions, not from recursing into both.' },
      ],
      correctFeedback: 'On a sorted array with always picking the first element as pivot, the partition is 0 vs. n-1 every time. That gives n + (n-1) + … + 1 = O(n²) work. Random pivot selection reduces this to O(n) average.',
      wrongFeedback: [
        'Think about what happens when the pivot divides the array into a partition of size 1 and size n-1, every single time. How many total operations does that cause?',
        'The O(n²) case occurs when pivot choice is always maximally unbalanced. What input and pivot strategy causes that?',
      ],
    },
  ],
}
