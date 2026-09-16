export default {
  id: 'running-sum-1d-array',
  title: 'Running Sum of 1d Array',
  difficulty: 'easy',
  description: 'Given an array <code>nums</code>, return the running sum array where <code>runningSum[i] = sum(nums[0]...nums[i])</code>.',
  examples: [
    { input: 'nums = [1,2,3,4]', output: '[1,3,6,10]' },
    { input: 'nums = [1,1,1,1,1]', output: '[1,2,3,4,5]' },
  ],
  constraints: ['1 ≤ nums.length ≤ 1000', '-10⁶ ≤ nums[i] ≤ 10⁶'],
  starterCode: `class Solution:
    def running_sum(self, nums):
        pass`,
  runnerSetup: 'running_sum = Solution().running_sum',
  functionName: 'running_sum',
  conceptId: 'prefix-sum',
  testCases: [
    { label: 'Increasing', args: [[1,2,3,4]], expected: [1,3,6,10] },
    { label: 'All ones', args: [[1,1,1,1,1]], expected: [1,2,3,4,5] },
    { label: 'With negatives', args: [[3,-2,5]], expected: [3,1,6] },
  ],
  bruteHint: 'A brute-force approach recomputes runningSum[i] from scratch for every index by re-summing all elements from nums[0] through nums[i] each time. Since the work at index i grows with i, and this repeats for all n indices, the total cost is O(n²) time. What is being recomputed at each step that was already fully computed just one index earlier?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'output-structure',
      question: 'Recognizing how a formula reuses prior work tells you how much computation each new output value actually needs. runningSum[i] = sum(nums[0]...nums[i]). What does this definition imply about how you build each output value?',
      highlight: { location: 'description', text: '<code>runningSum[i] = sum(nums[0]...nums[i])</code>' },
      options: [
        { label: 'Compute each sum from scratch', isCorrect: false, feedback: 'Recomputing the sum from index 0 for every position costs O(n) per element, making the total O(n²). The definition hints that adjacent values share almost all the same work.' },
        { label: 'Each value extends the previous one', isCorrect: true },
        { label: 'Sort the elements first', isCorrect: false, feedback: 'The running sum depends on the original order of elements — sorting destroys the sequence the formula is built on.' },
        { label: 'Use a separate accumulator array', isCorrect: false },
      ],
      correctFeedback: 'runningSum[i] = runningSum[i-1] + nums[i]. Each output value is just the previous running sum plus the current element — one addition per step.',
      wrongFeedback: [
        'Look at the relationship between runningSum[i] and runningSum[i-1]. How much new work do you need to do to extend the sum by one element?',
        'The sum up to index i already includes everything up to i-1. What single operation gets you from runningSum[i-1] to runningSum[i]?',
      ],
    },
    {
      id: 'constraint-complexity',
      question: 'Input size bounds tell you what complexity is actually necessary versus merely tolerable. nums.length ≤ 1000. What complexity is acceptable here?',
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 1000' },
      options: [
        { label: 'O(n²) is fine at n = 1000', isCorrect: false, feedback: 'At n = 1000, O(n²) is only 1 million operations — technically fine. But the problem structure already gives you an O(n) path, so O(n²) means you missed the key insight.' },
        { label: 'O(n) is the natural target', isCorrect: true },
        { label: 'O(log n) is required', isCorrect: false, feedback: 'You must read every element to build the output, so you cannot do better than O(n). O(log n) is not achievable here.' },
        { label: 'Input size does not matter', isCorrect: false, feedback: 'Input size always matters. Even at n = 1000 it guides whether you should care about recomputing sums repeatedly.' },
      ],
      correctFeedback: 'One pass through the array is enough — add each element to the running total and record it. O(n) time, O(1) extra space.',
      wrongFeedback: [
        'How many elements do you need to visit at minimum to produce every output value?',
        'You need to output a value for each of the n positions. Can you do it in a single left-to-right pass?',
      ],
    },
    {
      id: 'output-type',
      question: 'The shape of the required output often dictates which direction and order you must process the input. The output is an array the same length as nums. What does this tell you about the traversal?',
      options: [
        { label: 'Traverse from right to left', isCorrect: false, feedback: 'A right-to-left pass would accumulate suffixes, not prefixes. The formula sum(nums[0]...nums[i]) anchors the sum at the left end.' },
        { label: 'Single left-to-right pass, one output per step', isCorrect: false },
        { label: 'Collect all values then return', isCorrect: false },
        { label: 'Build output in order, index by index', isCorrect: true },
      ],
      correctFeedback: 'Each output position depends only on what came before it, so you can fill the result array left to right in a single pass.',
      wrongFeedback: [
        'The definition says runningSum[i] depends on everything from index 0 to i. In what direction does that dependency flow?',
        'Each output value depends on all previous elements. Which traversal direction naturally accumulates that history?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def running_sum(self, nums):
        result = []
        total = 0
        for n in nums:
            total += n
            result.append(total)
        return result`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionExplanation: 'Each running-sum value only depends on the values before it plus itself, so a single accumulator carried forward left to right builds every output value in one pass — there is never a need to re-add the same earlier elements for a later index.',
}
