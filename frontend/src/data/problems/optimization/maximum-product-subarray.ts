export default {
  id: 'maximum-product-subarray',
  title: 'Maximum Product Subarray',
  difficulty: 'medium',
  description: `<p>Given an integer array <code>nums</code>, find a subarray that has the largest product, and return the product.</p>`,
  examples: [
    { input: 'nums = [2,3,-2,4]', output: '6 (subarray [2,3])' },
    { input: 'nums = [-2,0,-1]', output: '0' },
  ],
  constraints: ['1 <= nums.length <= 2 * 10^4', '-10 <= nums[i] <= 10', 'The product of any subarray fits in a 32-bit integer'],
  starterCode: `class Solution:
    def max_product(self, nums):
        pass`,
  runnerSetup: 'max_product = Solution().max_product',
  functionName: 'max_product',
  conceptId: 'dp-1d',
  testCases: [
    { label: '[2,3,-2,4]', args: [[2,3,-2,4]], expected: 6 },
    { label: '[-2,0,-1]', args: [[-2,0,-1]], expected: 0 },
  ],
  bruteHint: 'The brute-force approach checks every possible subarray, computing its product from scratch each time, then tracks the best result seen — with O(n) starting points each extended up to O(n) steps, that\'s O(n²) time. Nested loops like this recompute the same partial products over and over instead of reusing work from the previous subarray. Can you update a running product incrementally as you extend the subarray by one element, rather than restarting the multiplication from scratch?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'negative-numbers',
      highlight: { location: 'constraint', text: '-10 <= nums[i] <= 10' },
      question: 'Value range constraints like this one often signal edge cases your algorithm must explicitly handle, such as sign changes in a running computation. nums[i] can be negative. What does a negative number do to a running product?',
      options: [
        { label: 'It always resets the product to 0', isCorrect: false, feedback: 'Negative numbers don\'t reset products — they flip the sign. Two negatives multiply to a positive, so a large negative product can become the new maximum after another negative.' },
        { label: 'It flips the sign: the current max becomes the min and vice versa', isCorrect: true },
        { label: 'It signals the start of a new subarray', isCorrect: false, feedback: 'Only a 0 forces a clean restart. A negative number flips the sign — the previously smallest (most negative) product might become the largest positive after multiplying by another negative.' },
        { label: 'It reduces the product, so skip negative numbers', isCorrect: false, feedback: 'Skipping negatives loses the sign-flip opportunity. In [-2,-3,4], multiplying both negatives gives 6×4 = 24. Skipping them yields only [4] = 4.' },
      ],
      correctFeedback: 'At each step, you need both the running maximum and minimum product. When you encounter a negative, swap them — yesterday\'s minimum might be tomorrow\'s maximum.',
      wrongFeedback: [
        'If your running max is 6 and you multiply by -2, what happens? What if the running min was -3 and you also multiply by -2?',
        'Multiplying by a negative turns the largest product into the smallest and vice versa. That\'s why you track both max_prod and min_prod at every step.',
      ],
    },
    {
      id: 'zero-reset',
      highlight: { location: 'constraint', text: '-10 <= nums[i] <= 10' },
      question: 'Boundary values within a constraint\'s range — like zero here — can break assumptions your algorithm depends on, so it\'s worth asking what happens when they appear. nums[i] can be 0. What does a 0 in the array do to any product that includes it?',
      options: [
        { label: 'It makes any subarray containing it negative', isCorrect: false, feedback: 'Zero makes any product containing it exactly 0, not negative. After a zero, any subarray extending past it has product 0 at minimum.' },
        { label: 'It forces a restart: any subarray crossing a 0 has product 0', isCorrect: true },
        { label: 'It can be skipped without affecting the result', isCorrect: false, feedback: 'You can\'t skip a 0 and still call it a contiguous subarray. A 0 in the array resets the running product — the next subarray starts fresh after the 0.' },
        { label: 'It only matters if it appears at the start or end', isCorrect: false, feedback: 'A 0 anywhere in a subarray zeros the entire product. In [-2,0,-1], the 0 in the middle prevents [-2,-1] from being a valid subarray.' },
      ],
      correctFeedback: 'After a 0, reset both running max and min to 1 (or equivalently, start a new subarray). In [-2,0,-1], the maximum product is 0 — no subarray crossing the 0 can do better.',
      wrongFeedback: [
        'What is the product of any subarray that contains a 0? What does that force you to do with the running product?',
        'A 0 collapses any product to 0. Your running max and min both reset after a 0 — the next element starts a fresh subarray.',
      ],
    },
    {
      id: 'constraint-complexity',
      highlight: { location: 'constraint', text: '1 <= nums.length <= 2 * 10^4' },
      question: 'Size constraints tell you how much computational headroom you have, which narrows down what time complexity is actually required. nums.length ≤ 2 × 10⁴ tells you…',
      options: [
        { label: 'O(n²) is fine for checking all subarrays', isCorrect: false, feedback: 'At n = 20,000, O(n²) is 400 million operations — borderline and unnecessary. The structure of the problem allows an O(n) single-pass solution.' },
        { label: 'O(n) single-pass is the target', isCorrect: true },
        { label: 'O(log n) binary search is required', isCorrect: false, feedback: 'Products don\'t have a sorted property to binary search on. The sign-flip behavior means you can\'t binary search for a threshold — you must process each element.' },
        { label: 'You can afford to enumerate all 2ⁿ subarrays', isCorrect: false, feedback: '2^20,000 is incomprehensibly large. Enumeration is never viable at this scale.' },
      ],
      correctFeedback: 'n = 20,000 calls for O(n) — a single forward pass tracking max_prod, min_prod, and a global best. Each element is processed exactly once.',
      wrongFeedback: [
        'Can you determine the maximum product subarray without looking at every element? What\'s the minimum number of passes needed?',
        'One pass is enough: at each position, update the running max and min, then check if the current max beats the global best.',
      ],
    },
    {
      id: 'track-both-extremes',
      question: 'Beyond the given constraints, thinking through what state your recurrence needs to track is what actually shapes a correct DP solution. The running maximum product alone isn\'t sufficient. Why must you also track the running minimum?',
      options: [
        { label: 'To handle the case where all numbers are negative', isCorrect: false, feedback: 'That\'s a consequence, not the root cause. The deeper reason is sign flipping: at any step, the future maximum product might come from the current minimum multiplied by a negative.' },
        { label: 'Because a negative number can turn the minimum into the maximum', isCorrect: true },
        { label: 'To detect when a 0 resets both extremes', isCorrect: false, feedback: 'A 0 resets both extremes to 1 regardless — you don\'t need the minimum specifically to handle that. The minimum is needed for the sign-flip case.' },
        { label: 'To avoid integer overflow when products grow large', isCorrect: false, feedback: 'The constraint says products fit in a 32-bit integer. Overflow isn\'t a concern here — the minimum is tracked for algorithmic correctness, not numerical safety.' },
      ],
      correctFeedback: 'At each step: new_max = max(nums[i], max_prod * nums[i], min_prod * nums[i]) and similarly for new_min. The minimum is needed because multiplying by a negative makes it the next maximum.',
      wrongFeedback: [
        'Suppose min_prod = -6 and you see nums[i] = -3. What is min_prod × nums[i]? Could that be the new maximum?',
        'min_prod × negative = a large positive. Without tracking min_prod, you\'d miss that the best subarray might pass through a large negative product and then get flipped.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def max_product(self, nums):
        max_prod = min_prod = result = nums[0]
        for x in nums[1:]:
            candidates = (x, max_prod * x, min_prod * x)
            max_prod, min_prod = max(candidates), min(candidates)
            result = max(result, max_prod)
        return result`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: '<code>x</code> itself is included among the three candidates at every step — without it, a subarray would be forced to always extend the previous one, but starting fresh at the current element is sometimes better, such as right after a 0 or a large negative product.',
  solutionExplanation: 'Because multiplying by a negative number flips the sign, the running minimum product isn\'t just useless extra bookkeeping — it\'s the value most likely to become the new maximum on the very next negative multiplication, so both the running max and min must be updated together at every step from the same three candidates (extend the max, extend the min, or restart at the current element). Taking the best of both at each position, rather than tracking only the maximum, is what correctly captures products that swing through a large negative before flipping positive again.',
}
