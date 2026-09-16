export default {
  id: '3sum',
  title: '3Sum',
  difficulty: 'medium',
  description: `<p>Given an integer array <code>nums</code>, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p><p>The solution set must not contain duplicate triplets.</p>`,
  examples: [
    { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
    { input: 'nums = [0,1,1]', output: '[]' },
  ],
  constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
  starterCode: `class Solution:
    def three_sum(self, nums):
        pass`,
  functionName: 'three_sum_run',
  conceptId: 'two-pointers',
  runnerSetup: `def three_sum_run(nums):
  result = Solution().three_sum(nums)
  return sorted([sorted(t) for t in result])`,
  testCases: [
    { label: '[-1,0,1,2,-1,-4]', args: [[-1,0,1,2,-1,-4]], expected: [[-1,-1,2],[-1,0,1]] },
    { label: '[0,1,1]', args: [[0,1,1]], expected: [] },
    { label: '[0,0,0]', args: [[0,0,0]], expected: [[0,0,0]] },
  ],
  bruteHint: 'The brute-force approach checks every possible triplet of indices — three nested loops trying every combination of i, j, k and testing whether the three values sum to zero. That works, but it checks on the order of n³ triplets. At n up to 3,000, how many operations is that, and would it finish in time?',
  optimizeComplexity: { time: 'O(n²)', space: 'O(log n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the size constraint of the input. What does 3 ≤ nums.length ≤ 3,000 tell you?',
      options: [
        { label: 'O(n) or better needed', isCorrect: false, feedback: 'O(n) would mean reading the array once with no inner loop — there is no known linear approach for finding all zero-sum triplets. The constraint allows a quadratic approach.' },
        { label: 'O(n²) is acceptable', isCorrect: true },
        { label: 'O(n³) is fine', isCorrect: false, feedback: 'At n = 3,000, O(n³) is 27 billion operations — far too slow. The constraint is hinting you need to cut the brute-force triple loop down to two levels.' },
        { label: 'Input size is irrelevant', isCorrect: false, feedback: 'Input size is always relevant. 3,000³ is 27 billion; 3,000² is 9 million — an enormous difference in feasibility.' },
      ],
      correctFeedback: '3,000² = 9 million operations — fast enough. Fix one element with an outer loop and sweep the remaining pair with two pointers in O(n), giving O(n²) total.',
      wrongFeedback: [
        'Think about what a brute-force triple loop costs at n = 3,000. What does the constraint rule out?',
        'At 3,000, n³ is 27 billion and n² is 9 million. Which one fits in time?',
      ],
      highlight: { location: 'constraint', text: '3 <= nums.length <= 3000' },
    },
    {
      id: 'no-duplicate-triplets',
      question: 'A uniqueness requirement tells you what bookkeeping you can\'t skip. "The solution set must not contain duplicate triplets" — what does this require?',
      options: [
        { label: 'Store results in a set of tuples', isCorrect: false, feedback: 'A set of tuples works but costs extra memory and hashing overhead. The constraint is better handled structurally by sorting the array and skipping repeated values during the scan.' },
        { label: 'Skip repeated pivot and pointer values after sorting', isCorrect: true },
        { label: 'Use indices, not values, as keys', isCorrect: false, feedback: 'The problem specifies no duplicate triplets by value — two triplets with the same three numbers but different positions still count as duplicates.' },
        { label: 'Return only the first valid triplet per starting index', isCorrect: false, feedback: 'One starting index can produce multiple distinct valid triplets — returning only the first would miss valid answers.' },
      ],
      correctFeedback: 'Sorting first lets you detect and skip repeated values at the pivot and at each pointer in O(1), preventing duplicate triplets without extra memory.',
      wrongFeedback: [
        'You need to avoid emitting the same three values twice. After sorting, what do adjacent equal elements look like — and what can you do with them?',
        'Sorting clusters duplicates together. When you advance the pivot or a pointer, check whether the new value equals the one you just processed.',
      ],
      highlight: { location: 'description', text: 'must not contain duplicate triplets' },
    },
    {
      id: 'output-structure',
      question: 'The type of output you\'re asked for tells you how much of the problem you actually need to solve. The output is a list of triplets, not a count or a single triplet — what does that tell you?',
      options: [
        { label: 'Stop after finding the first valid triplet', isCorrect: false, feedback: 'There may be multiple valid triplets — the example shows two. Stopping early would give an incomplete answer.' },
        { label: 'Collect all valid triplets before returning', isCorrect: true },
        { label: 'Return the number of valid triplets', isCorrect: false, feedback: 'A count discards the actual triplet values. The output requires the triplets themselves.' },
        { label: 'Return indices, not values', isCorrect: false, feedback: 'The output format is [nums[i], nums[j], nums[k]] — values, not positions. Indices would give the wrong type of output.' },
      ],
      correctFeedback: 'The output is a list, so you must accumulate every valid triplet and return them all — no early exit once you find one.',
      wrongFeedback: [
        'The output is a list of triplets. Does that mean you can stop as soon as you find one, or do you keep searching?',
        'A list output means every valid result must be included. The search exhausts all possibilities before returning.',
      ],
      highlight: { location: 'description', text: 'return all the triplets' },
    },
    {
      id: 'sorting-enables-two-pointers',
      question: 'The technique you reach for often follows directly from a choice you already made. After fixing nums[i] as the first element, you need pairs that sum to -nums[i] — what does sorting the array first let you do?',
      options: [
        { label: 'Binary search for each complement', isCorrect: false, feedback: 'Binary search finds one value in O(log n), but you need all pairs — that still costs O(n log n) per pivot, no better than two pointers, and harder to deduplicate.' },
        { label: 'Use two pointers to scan remaining elements in O(n)', isCorrect: true },
        { label: 'Use a hash map for O(1) complement lookup', isCorrect: false, feedback: 'A hash map works for Two Sum, but here deduplication of triplets is harder with a hash map than with sorted two pointers — and you lose the sorted structure needed to skip duplicates cleanly.' },
        { label: 'Skip elements that are too large', isCorrect: false, feedback: 'Skipping large elements is a minor optimization, not the main benefit of sorting. The key gain is that two pointers can sweep left–right in O(n) because order is known.' },
      ],
      correctFeedback: 'With sorted order, the left pointer increases the sum and the right pointer decreases it — a single O(n) sweep finds all valid pairs for each fixed pivot.',
      wrongFeedback: [
        'When the array is sorted, moving a pointer left or right has a predictable effect on the pair sum. How does that let you sweep efficiently?',
        'Two pointers work in O(n) on a sorted subarray: increase sum by moving left pointer right, decrease sum by moving right pointer left.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def three_sum(self, nums):
        nums.sort()
        n = len(nums)
        res = []
        for i in range(n - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            if nums[i] > 0:
                break
            lo, hi = i + 1, n - 1
            while lo < hi:
                s = nums[i] + nums[lo] + nums[hi]
                if s < 0:
                    lo += 1
                elif s > 0:
                    hi -= 1
                else:
                    res.append([nums[i], nums[lo], nums[hi]])
                    lo += 1
                    hi -= 1
                    while lo < hi and nums[lo] == nums[lo - 1]:
                        lo += 1
                    while lo < hi and nums[hi] == nums[hi + 1]:
                        hi -= 1
        return res`,
  solutionComplexity: { time: 'O(n²)', space: 'O(log n)' },
  solutionCaveat: 'Skipping a duplicate <code>nums[i]</code> only works because the array is sorted — every occurrence of the same value is adjacent, so <code>nums[i] == nums[i-1]</code> reliably means "this exact triplet search already ran."',
  solutionExplanation: 'Sorting groups equal values together and makes a two-pointer sweep possible for the remaining pair, turning the inner two loops of the brute force into one O(n) scan per fixed <code>nums[i]</code>. Skipping a repeated <code>nums[i]</code>, and nudging <code>lo</code>/<code>hi</code> past repeats after recording a match, prevents the same triplet from being collected twice without needing a set to de-duplicate results afterward.',
}
