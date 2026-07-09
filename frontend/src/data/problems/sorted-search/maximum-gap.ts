export default {
  id: 'maximum-gap',
  title: 'Maximum Gap',
  difficulty: 'hard',
  description: 'Given an unsorted array, find the maximum difference between successive elements in its sorted form. Return 0 if the array has fewer than 2 elements. Solve in O(n) time.',
  examples: [
    { input: 'nums = [3,6,9,1]', output: '3', explanation: 'Sorted: [1,3,6,9]. Max gap is 9-6=3.' },
    { input: 'nums = [10]', output: '0' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '0 ≤ nums[i] ≤ 10⁹'],
  starterCode: `def maximum_gap(nums):
  pass`,
  functionName: 'maximum_gap',
  conceptId: 'sorting',
  testCases: [
    { label: 'Standard', args: [[3,6,9,1]], expected: 3 },
    { label: 'Single', args: [[10]], expected: 0 },
    { label: 'Two elements', args: [[1,10000000]], expected: 9999999 },
    { label: 'Consecutive', args: [[1,2,3,4,5]], expected: 1 },
  ],
  bruteHint: 'Describe sorting the array with a comparison sort and scanning adjacent pairs, and why that\'s O(n log n) rather than O(n)',
  optimizeHint: 'Name the technique — bucket-style sorting that exploits the pigeonhole principle — that achieves O(n)',
  clues: [
    {
      id: 'time-constraint',
      question: '"Solve in O(n) time." Comparison-based sorting is O(n log n). What does the O(n) requirement tell you?',
      options: [
        { label: 'Sort the array, then scan adjacent pairs — O(n log n) is close enough', isCorrect: false, feedback: 'The problem explicitly requires O(n). With n ≤ 10⁵, O(n log n) is about 1.7 million operations and would likely pass, but the problem is testing whether you know a non-comparison-based linear sort.' },
        { label: 'You need a non-comparison-based approach like bucket sort or radix sort', isCorrect: true },
        { label: 'You can scan the unsorted array in one pass without sorting', isCorrect: false, feedback: 'The gap is between successive elements in the sorted form. You can\'t find successive elements without some form of ordering — a single unsorted scan can\'t determine which pairs are adjacent in sorted order.' },
        { label: 'A hash map can find the maximum gap in O(n)', isCorrect: false, feedback: 'A hash map can check membership in O(1), but it doesn\'t establish sorted order. Knowing which values exist doesn\'t tell you the gap between sorted neighbors without an ordering step.' },
      ],
      correctFeedback: 'O(n) sorting requires using the value distribution, not comparisons. Bucket sort (or radix sort) achieves O(n) by distributing elements into fixed-size buckets based on value range, then finding the max gap between consecutive non-empty buckets.',
      wrongFeedback: [
        'The comparison sort lower bound is O(n log n). To beat it, you must use information beyond pairwise comparisons. What O(n) sorting algorithms do you know?',
        'Radix sort and bucket sort both run in O(n) when the value range is bounded. This problem\'s constraint (0 ≤ nums[i] ≤ 10⁹) provides a bounded range — think about dividing it into buckets.',
      ],
    },
    {
      id: 'bucket-insight',
      question: 'The key insight is: the maximum gap cannot come from within a single bucket — it must span across buckets. Why?',
      options: [
        { label: 'Because each bucket contains exactly one element', isCorrect: false, feedback: 'Buckets can hold multiple elements — the insight doesn\'t require one element per bucket. It relies on the bucket width being chosen so that the max gap exceeds any within-bucket spread.' },
        { label: 'If n elements span range R, at least one gap is ≥ R/(n−1), which exceeds the bucket width', isCorrect: true },
        { label: 'Because elements are uniformly distributed', isCorrect: false, feedback: 'Elements don\'t need to be uniform — the pigeonhole argument works regardless of distribution. With n elements and n−1 gaps covering range R, at least one gap is ≥ R/(n−1).' },
        { label: 'Because the minimum and maximum elements anchor the two end buckets', isCorrect: false, feedback: 'Anchoring min and max helps establish bucket boundaries, but that\'s not why within-bucket gaps can be ignored. The bucket width is chosen smaller than the guaranteed minimum maximum gap.' },
      ],
      correctFeedback: 'With n elements covering range R = max − min, the average gap is R/(n−1). Use n−1 buckets of width at least R/(n−1). No within-bucket gap can exceed the bucket width, so the max gap must span bucket boundaries.',
      wrongFeedback: [
        'With n elements spread over range R, what is the average gap? If buckets are wider than the within-bucket spread, where must the max gap fall?',
        'Average gap = R/(n−1). Set bucket width = ceil(R/(n−1)). Any two elements in the same bucket differ by at most bucket_width − 1 < average_gap ≤ max_gap. So max gap crosses bucket boundaries.',
      ],
    },
    {
      id: 'gap-computation',
      question: 'Once you\'ve distributed elements into buckets, how do you find the maximum gap?',
      options: [
        { label: 'Sort each bucket and compare all adjacent pairs', isCorrect: false, feedback: 'Sorting within buckets defeats the O(n) goal — sorting each bucket is O(k log k) per bucket. The key insight is you only need the min and max of each bucket, not the full sorted order within it.' },
        { label: 'Track only bucket min and max; compare max of one bucket to min of the next non-empty bucket', isCorrect: true },
        { label: 'Compare the max of every bucket to the min of every other bucket', isCorrect: false, feedback: 'Comparing all pairs of buckets is O(n²) in the worst case. You only need consecutive non-empty buckets — in sorted order, the gap between bucket i\'s max and bucket i+1\'s min is what matters.' },
        { label: 'The maximum gap equals the range divided by n−1', isCorrect: false, feedback: 'Range/(n−1) is the average gap, not the maximum. The maximum can be much larger than the average — consider [1, 2, 3, 100], where range/3 ≈ 33 but the max gap is 97.' },
      ],
      correctFeedback: 'For each non-empty bucket, store only its minimum and maximum value. Scan consecutive non-empty buckets left to right: the gap between bucket[i].max and bucket[i+1].min is a candidate. Track the running maximum.',
      wrongFeedback: [
        'You don\'t need to sort within buckets. What two values per bucket are sufficient to compute the gap to the next bucket?',
        'Store (min, max) per bucket. The gap between consecutive non-empty buckets is next_bucket.min − current_bucket.max. The maximum of these gaps is your answer.',
      ],
    },
  ],
}
