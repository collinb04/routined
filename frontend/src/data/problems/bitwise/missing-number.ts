export default {
  id: 'missing-number',
  title: 'Missing Number',
  difficulty: 'easy',
  description: 'Given an array <code>nums</code> containing <code>n</code> distinct numbers in the range <code>[0, n]</code>, return the only number in the range that is missing.',
  examples: [
    { input: 'nums = [3,0,1]', output: '2', explanation: '2 is missing from the range [0,3].' },
    { input: 'nums = [0,1]', output: '2', explanation: '2 is missing from [0,2].' },
  ],
  constraints: ['n = nums.length', '0 ≤ nums[i] ≤ n', 'All numbers are distinct'],
  starterCode: `class Solution:
    def missing_number(self, nums):
        pass`,
  runnerSetup: 'missing_number = Solution().missing_number',
  functionName: 'missing_number',
  conceptId: 'bit-manipulation',
  testCases: [
    { label: 'Missing 2', args: [[3,0,1]], expected: 2 },
    { label: 'Missing at end', args: [[0,1]], expected: 2 },
    { label: 'Single element 0', args: [[0]], expected: 1 },
    { label: 'Missing first', args: [[1,2,3]], expected: 0 },
  ],
  bruteHint: 'The brute-force approach checks each value from 0 to n against the array, either rescanning the array each time or first loading it into extra storage for faster lookups. Repeated scanning costs O(n²) time, while the extra-storage version costs O(n) time but O(n) space. Either way, you\'re paying in time or space just to locate one missing value. Is there a way to find that value using only arithmetic over the numbers you already have, with no extra storage at all?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'range-guarantee',
      question: 'Knowing exactly how many values should exist in a range tells you exactly how many can be missing. The array contains n distinct numbers from [0, n]. What does the closed range guarantee?',
      highlight: { location: 'description', text: '<code>n</code> distinct numbers in the range <code>[0, n]</code>' },
      options: [
        { label: 'Exactly one number is missing from the range', isCorrect: true },
        { label: 'Multiple numbers could be missing', isCorrect: false, feedback: 'The array has n elements covering n + 1 possible values (0 through n). Exactly one slot is empty — the pigeonhole math leaves no room for two gaps.' },
        { label: 'The missing number is always n', isCorrect: false, feedback: 'The missing number can be anywhere in [0, n], including 0 or a middle value. The examples show 2 missing from [0, 3], not the maximum.' },
        { label: 'The range tells you nothing about the approach', isCorrect: false, feedback: 'The range [0, n] is the key signal. Because you know exactly which integers should be present, you can compute the expected total and find the gap without storing anything extra.' },
      ],
      correctFeedback: 'n values span n + 1 slots, so exactly one is missing. This turns a search problem into an arithmetic one: compute what\'s expected, subtract what\'s there.',
      wrongFeedback: [
        'How many integers are in [0, n]? How many elements does the array have? What does the difference imply?',
        'The range gives you the complete expected set. One structure that uses a known expected total to find a single missing item does so in O(1) extra space.',
      ],
    },
    {
      id: 'output-type',
      question: 'The type of answer you\'re asked for often tells you how much you need to track along the way. The output is a single integer — the missing number. What does "exactly one missing" let you skip?',
      highlight: { location: 'description', text: 'return the only number in the range that is missing' },
      options: [
        { label: 'Putting every element in increasing order first', isCorrect: false, feedback: 'Sorting takes O(n log n) and O(1) space, but the single-missing guarantee lets you do O(n) work without sorting — you don\'t need elements in order to compute a sum or XOR.' },
        { label: 'Collecting all candidate missing values', isCorrect: true },
        { label: 'Checking every element against the range', isCorrect: false, feedback: 'You do need to process every element — but only once, as part of an aggregate operation, not to collect candidates. The guarantee is about how many answers to track, not whether to read the input.' },
        { label: 'Handling the case where nothing is missing', isCorrect: false, feedback: 'The guarantee already rules that out: with n elements in [0, n], something is always missing. You never need a "nothing missing" branch.' },
      ],
      correctFeedback: 'Because exactly one number is missing, your answer is a single value — not a list. You can aggregate the entire array into one number (sum or XOR) and derive the answer from that aggregate.',
      wrongFeedback: [
        'If exactly one number is missing, how many values do you need to track as your running answer?',
        'Think in terms of aggregates: what single computed value over all elements, compared to a known expected value, gives you the gap?',
      ],
    },
    {
      id: 'xor-property',
      question: 'Recognizing a mathematical property tied to a specific operator can point straight at the technique to use. "All numbers are distinct" and the range is [0, n]. XOR has the property that a ^ a = 0 and a ^ 0 = a. What does this suggest?',
      highlight: { location: 'constraint', text: 'All numbers are distinct' },
      options: [
        { label: 'XOR every element; the result is the missing number', isCorrect: false, feedback: 'XORing only the array elements leaves an imbalanced result — you need to also XOR the full expected range [0, n]. Only when each present number is XORed twice does it cancel to zero, leaving the missing one.' },
        { label: 'XOR the array elements with the indices 0..n', isCorrect: true },
        { label: 'XOR is only useful when numbers are sorted', isCorrect: false, feedback: 'XOR is order-independent: a ^ b ^ c = c ^ a ^ b regardless of arrangement. Sorting is irrelevant to XOR-based approaches.' },
        { label: 'XOR can only detect duplicates, not missing values', isCorrect: false, feedback: 'XOR detects "unpaired" values — which is exactly what a missing number is. If you XOR the array with the full expected range, present numbers cancel out and the missing one remains.' },
      ],
      correctFeedback: 'XOR nums[0..n-1] with indices 0..n: each number present in the array appears once in each group, so they cancel. The missing number has no pair to cancel against, so it remains.',
      wrongFeedback: [
        'If you XOR both the array and the full range [0, n] together, what happens to a number that appears in both?',
        'a ^ a = 0 means paired values vanish. Which value has no pair when you combine the array with the full expected range?',
      ],
    },
    {
      id: 'sum-approach',
      question: 'An arithmetic identity for a known range can let you compute an answer without scanning for it directly. The expected sum of [0, n] is n*(n+1)/2. What does comparing it to the actual sum tell you?',
      options: [
        { label: 'Nothing — sums don\'t identify which number is missing', isCorrect: false, feedback: 'With exactly one number missing, the difference between the expected sum and the actual sum is precisely that missing number. Sums are a direct path to the answer.' },
        { label: 'The missing number equals expected_sum − actual_sum', isCorrect: false },
        { label: 'actual_sum − expected_sum gives the missing number', isCorrect: false, feedback: 'The array is missing a value, so its sum is less than expected. actual_sum − expected_sum is negative; it\'s expected_sum − actual_sum that gives the missing number.' },
        { label: 'expected_sum − actual_sum gives the missing number', isCorrect: true },
      ],
      correctFeedback: 'n*(n+1)/2 is the sum if all values were present. The array sum is that minus the missing value. One subtraction gives the answer in O(n) time and O(1) space.',
      wrongFeedback: [
        'If every number from 0 to n were in the array, what would the sum be? How does the actual array sum compare?',
        'The difference between what should be there and what is there equals the missing piece. Which direction — expected minus actual, or actual minus expected?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def missing_number(self, nums):
        result = len(nums)
        for i, n in enumerate(nums):
            result ^= i ^ n
        return result`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'Starting <code>result</code> at <code>len(nums)</code> (rather than 0) accounts for the index <code>n</code> itself — the full expected range is <code>0..n</code>, which has <code>n+1</code> values, but only indices <code>0..n-1</code> exist to XOR against during the loop.',
  solutionExplanation: 'XOR-ing every index <code>0..n-1</code> together with every value actually present cancels out any number that appears in both roles — index and value — leaving only whichever number never got paired with its matching index because it was missing. This works for the same reason as the classic single-number XOR trick: pairing something with itself always cancels, so everything that lines up perfectly vanishes and only the true mismatch survives.',
}
