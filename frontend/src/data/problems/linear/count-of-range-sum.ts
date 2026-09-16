export default {
  id: 'count-of-range-sum',
  title: 'Count of Range Sum',
  difficulty: 'hard',
  description: 'Given an integer array <code>nums</code> and bounds <code>lower</code> and <code>upper</code>, return the number of range sums that lie in <code>[lower, upper]</code> (inclusive). A range sum is <code>S(i, j) = nums[i] + ... + nums[j]</code> for <code>i ≤ j</code>.',
  examples: [
    { input: 'nums=[-2,5,-1], lower=-2, upper=2', output: '3', explanation: 'Ranges: [0,0]→-2, [2,2]→-1, [0,2]→2.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 10⁵', '-2³¹ ≤ nums[i] ≤ 2³¹ − 1', '-10⁵ ≤ lower ≤ upper ≤ 10⁵'],
  starterCode: `class Solution:
    def count_range_sum(self, nums, lower, upper):
        pass`,
  runnerSetup: 'count_range_sum = Solution().count_range_sum',
  functionName: 'count_range_sum',
  conceptId: 'prefix-sum',
  testCases: [
    { label: 'Standard', args: [[-2,5,-1],-2,2], expected: 3 },
    { label: 'Single element', args: [[0],0,0], expected: 1 },
    { label: 'No valid range', args: [[5,5,5],1,4], expected: 0 },
  ],
  bruteHint: 'The brute-force approach checks every subarray directly — for each starting index, extend a running sum through every possible ending index and check whether it falls in [lower, upper]. That needs no auxiliary structure, but it inspects on the order of n² subarrays. At n up to 100,000, how many sums would that check, and would it finish in time?',
  optimizeComplexity: { time: 'O(n log n)', space: 'O(n)' },
  clues: [
    {
      id: 'prefix-sum-reduction',
      question: 'Recognizing when an expression can be rewritten in terms of a running total often reveals a different, well-known problem underneath. S(i, j) = prefix[j+1] − prefix[i]. The condition lower ≤ S(i,j) ≤ upper becomes lower ≤ prefix[j+1] − prefix[i] ≤ upper. What problem does this reduce to?',
      options: [
        { label: 'Finding the maximum subarray sum', isCorrect: false, feedback: 'Maximum subarray sum (Kadane\'s algorithm) finds one extreme value, not the count of sums within a range.' },
        { label: 'Counting prefix-sum pairs (i, j) with j > i and prefix[j] − prefix[i] in [lower, upper]', isCorrect: true },
        { label: 'Checking whether any subarray sum falls in the range', isCorrect: false, feedback: 'The problem asks for the count of all qualifying subarrays, not just whether one exists.' },
        { label: 'Reordering nums by value before scanning', isCorrect: false, feedback: 'Sorting the original array destroys contiguity — subarrays must be consecutive elements, so element order matters.' },
      ],
      correctFeedback: 'Fix j and count how many i < j have prefix[i] in [prefix[j] − upper, prefix[j] − lower]. This is a range-count query on previously seen prefix sums, which a sorted structure answers efficiently.',
      wrongFeedback: [
        'Rearrange the inequality: lower ≤ prefix[j] − prefix[i] ≤ upper means prefix[j] − upper ≤ prefix[i] ≤ prefix[j] − lower. What does that say about which prefix sums are valid partners for prefix[j]?',
        'For each j, you need to count prefix sums seen so far that fall in a specific interval. What data structure counts values in a range in O(log n)?',
      ],
      highlight: { location: 'description', text: 'S(i, j) = nums[i] + ... + nums[j]' },
    },
    {
      id: 'brute-force-bound',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. nums.length ≤ 10⁵. A brute-force O(n²) scan of all subarrays would be…',
      options: [
        { label: 'Fine — n² at 10⁵ is only 10,000', isCorrect: false, feedback: 'n² at n = 10⁵ is 10 billion operations, not 10,000. Only n itself equals 100,000.' },
        { label: 'Too slow — O(n²) is 10 billion operations at n = 10⁵', isCorrect: true },
        { label: 'Acceptable in Python with early exit', isCorrect: false, feedback: 'Even with early exits, worst-case O(n²) at n = 100,000 is 10 billion steps — Python handles roughly 10 million simple operations per second.' },
        { label: 'Fine because lower and upper bound the number of valid pairs', isCorrect: false, feedback: 'The bounds filter which pairs count, but do not reduce how many pairs you must examine. You still inspect all O(n²) pairs in the worst case.' },
      ],
      correctFeedback: 'At n = 100,000, O(n²) is 10 billion operations — roughly 1,000 seconds in Python. You need an approach closer to O(n log n).',
      wrongFeedback: [
        'With n = 100,000, how many pairs (i, j) are there? Is 10 billion operations feasible?',
        'O(n²) at n = 100,000 is 10¹⁰ operations. Python runs about 10⁷ simple ops per second. How long would that take?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 10⁵' },
    },
    {
      id: 'sorted-structure-for-range-count',
      question: 'The exact operation you need to repeat at scale determines which structure is worth reaching for. For each new prefix sum, you need to count how many previous prefix sums fall in [prefix[j] − upper, prefix[j] − lower]. What structure supports this efficiently?',
      options: [
        { label: 'Check for one exact prefix-sum match', isCorrect: false, feedback: 'A hash map handles exact-value lookups in O(1), but a range query [lo, hi] requires iterating all keys — O(n) per query, back to O(n²) total.' },
        { label: 'Keep prefix sums ordered for fast range counts', isCorrect: true },
        { label: 'Access only the most recently seen sum', isCorrect: false, feedback: 'A stack only gives O(1) access to the top element — a range count requires searching the entire stack, which is O(n) per query.' },
        { label: 'Sweep two positions inward across the array', isCorrect: false, feedback: 'Two pointers work when the condition is monotone (e.g., a fixed target sum), but range-sum counting with arbitrary bounds is not monotone over prefix sums.' },
      ],
      correctFeedback: 'Insert prefix sums into a sorted list (or a balanced BST). Use binary search to count values in [prefix[j] − upper, prefix[j] − lower] in O(log n). Total: O(n log n) time.',
      wrongFeedback: [
        'You need to count values in an interval, not find an exact match. Which data structure lets you count items in a range in O(log n)?',
        'A sorted array with bisect_left and bisect_right gives the count of values in any range in O(log n). Inserting each prefix sum into that sorted list costs O(n) per insert — what does that give overall?',
      ],
    },
    {
      id: 'output-is-count',
      question: 'The type of output you\'re asked for tells you how much of the problem you actually need to solve. The output is an integer count of qualifying ranges. What does this mean for your algorithm?',
      options: [
        { label: 'Return the list of all qualifying (i, j) pairs', isCorrect: false, feedback: 'The problem asks only for the count — not the actual subarray boundaries. Storing pairs adds O(n²) space in the worst case.' },
        { label: 'Accumulate a running count and return it', isCorrect: true },
        { label: 'Return the sum of all qualifying range sums', isCorrect: false, feedback: 'The problem counts how many ranges qualify, not what they sum to. Accumulating sums gives a different and irrelevant value.' },
        { label: 'Return true or false for the existence of any valid range', isCorrect: false, feedback: 'The problem requires the exact count of valid ranges. Returning a boolean loses all quantitative information.' },
      ],
      correctFeedback: 'A single integer accumulator is sufficient. At each step, add the range-count query result to the total. No need to store which pairs qualified.',
      wrongFeedback: [
        'The return type is an integer. Does your algorithm need to remember which subarrays were valid, or only how many?',
        'Accumulate the count from each range query. You never need to enumerate the actual pairs — just their total number.',
      ],
      highlight: { location: 'description', text: 'return the number of range sums' },
    },
  ],
  solutionCode: `class Solution:
    def count_range_sum(self, nums, lower, upper):
        prefix = [0]
        for n in nums:
            prefix.append(prefix[-1] + n)

        def count_and_sort(lo, hi):
            if hi - lo <= 1:
                return 0
            mid = (lo + hi) // 2
            count = count_and_sort(lo, mid) + count_and_sort(mid, hi)
            j = k = mid
            for i in range(lo, mid):
                while j < hi and prefix[j] - prefix[i] < lower:
                    j += 1
                while k < hi and prefix[k] - prefix[i] <= upper:
                    k += 1
                count += k - j
            prefix[lo:hi] = sorted(prefix[lo:hi])
            return count

        return count_and_sort(0, len(prefix))`,
  solutionComplexity: { time: 'O(n log n)', space: 'O(n)' },
  solutionCaveat: 'This is a merge-sort over the prefix-sum array itself, counting cross-half pairs while it sorts — the sorting is not incidental cleanup, it is *why* the two inner scans (<code>j</code> and <code>k</code>) can each move forward only, giving the O(n) per-level cost that keeps the whole thing at O(n log n) instead of O(n²).',
  solutionExplanation: 'S(i, j) falling in [lower, upper] is equivalent to <code>prefix[j+1] - prefix[i]</code> falling in that range, so the problem becomes: count pairs of prefix-sum values whose difference lands in [lower, upper]. Merge sort visits every split point once; while merging the sorted left and right halves, every prefix sum in the left half can be checked against a moving window of the right half (found with two pointers that only advance, since the right half is already sorted), counting valid pairs without ever comparing every pair explicitly.',
}
