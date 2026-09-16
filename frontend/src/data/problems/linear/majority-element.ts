export default {
  id: 'majority-element',
  title: 'Majority Element',
  difficulty: 'easy',
  description: 'Given an array of size n, find the majority element — the element that appears more than ⌊n/2⌋ times. The majority element always exists. Try O(1) space (Boyer-Moore voting).',
  examples: [
    { input: 'nums = [3,2,3]', output: '3' },
    { input: 'nums = [2,2,1,1,1,2,2]', output: '2' },
  ],
  constraints: ['n == nums.length', '1 ≤ n ≤ 5 × 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹'],
  starterCode: `class Solution:
    def majority_element(self, nums):
        pass`,
  runnerSetup: 'majority_element = Solution().majority_element',
  functionName: 'majority_element',
  conceptId: 'arrays',
  testCases: [
    { label: '3 is majority', args: [[3,2,3]], expected: 3 },
    { label: '2 is majority', args: [[2,2,1,1,1,2,2]], expected: 2 },
    { label: 'Single', args: [[1]], expected: 1 },
  ],
  bruteHint: 'The brute-force approach checks each element against the whole array: for every value, scan the entire array and count how many times it occurs, then compare that count to ⌊n/2⌋. That\'s an O(n) scan repeated for each of the n elements, so roughly n² operations overall, with O(1) extra space since you\'re only tracking a running count. At n up to 50,000, would that finish in time — and is there a way to identify the majority element without re-scanning for every value?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'We can understand how efficient we need to be based on the constraints on both time and space. n ≤ 5 × 10⁴ and the problem hints at O(1) space — what does that pair of constraints tell you?',
      options: [
        { label: 'O(n) time and O(1) space is the target', isCorrect: true },
        { label: 'O(n²) time is acceptable', isCorrect: false, feedback: 'At n = 50,000, O(n²) is 2.5 billion operations — far too slow. The O(1) space hint points toward a smarter linear pass.' },
        { label: 'Reordering the array before scanning works best', isCorrect: false, feedback: 'Sorting is O(n log n) and uses O(log n) auxiliary space — both worse than the hinted target. The problem is steering you away from that direction.' },
        { label: 'Input size does not affect the approach', isCorrect: false, feedback: 'Input size always matters. n ≤ 50,000 combined with the O(1) space hint is narrowing the expected solution to a single linear scan.' },
      ],
      correctFeedback: 'Right — n = 50,000 rules out O(n²) brute force, and the O(1) space hint rules out a frequency hash map. Both constraints together point to a single-pass algorithm.',
      wrongFeedback: [
        'The problem gives two hints at once: a size bound and a space target. What solution family fits both simultaneously?',
        'O(n) time handles 50,000 elements easily. What does the O(1) space constraint add — what familiar structure does it rule out?',
      ],
      highlight: { location: 'constraint', text: '1 ≤ n ≤ 5 × 10⁴' },
    },
    {
      id: 'majority-guarantee',
      question: 'Guarantees in a problem statement tell you what edge cases you can skip handling. "The majority element always exists." What does this guarantee let you skip?',
      options: [
        { label: 'Checking for elements with count > n/3', isCorrect: false, feedback: 'The threshold here is strictly ⌊n/2⌋, not n/3. The guarantee is about what you need to verify after finding a candidate — not about how many candidates exist.' },
        { label: 'Handling the case where no majority exists', isCorrect: true },
        { label: 'Iterating through the entire array', isCorrect: false, feedback: 'You still need to scan the full array to find the majority element. The guarantee removes the need to validate your result — not the need to search.' },
        { label: 'Tracking which element you are comparing', isCorrect: false, feedback: 'You still need to track a candidate during the scan. The guarantee removes the need to verify that candidate afterward — the problem promises it will be correct.' },
      ],
      correctFeedback: 'Exactly — without this guarantee you would need to make a second pass to confirm the candidate appears more than ⌊n/2⌋ times. The guarantee means your candidate is always valid.',
      wrongFeedback: [
        'Guarantees in problem statements are permissions to skip something. What validation step would you normally do after finding a candidate?',
        'Think about what happens after a voting algorithm identifies a candidate. Normally you confirm it — what does "always exists" let you do instead?',
      ],
      highlight: { location: 'description', text: 'The majority element always exists.' },
    },
    {
      id: 'majority-threshold',
      question: 'Numeric guarantees often hide a relationship between the pieces of the input that you can exploit. The majority element appears more than ⌊n/2⌋ times — what does this threshold imply about the relationship between the majority and all other elements?',
      options: [
        { label: 'It appears more often than all others combined', isCorrect: true },
        { label: 'It appears in every contiguous subarray', isCorrect: false, feedback: 'Appearing more than half the time does not guarantee presence in every subarray. A contiguous block of non-majority elements can still exist.' },
        { label: 'There can be two elements tied for majority', isCorrect: false, feedback: 'Two elements each appearing more than ⌊n/2⌋ times would together exceed n — impossible. The threshold guarantees uniqueness.' },
        { label: 'You must count every element to find it', isCorrect: false, feedback: 'Counting every element works but is unnecessary. The ⌊n/2⌋ threshold means a cancellation argument applies — each non-majority element can cancel one majority element and the majority still survives.' },
      ],
      correctFeedback: 'Correct — more than ⌊n/2⌋ occurrences means the majority element outnumbers all other elements combined. That imbalance is precisely what Boyer-Moore voting exploits.',
      wrongFeedback: [
        'If one element appears more than half the time, what must be true about the sum of all other elements\' counts?',
        'If the majority appears ⌊n/2⌋ + 1 times and n = 7, how many slots remain for all other values? What does that imply?',
      ],
      highlight: { location: 'description', text: 'appears more than ⌊n/2⌋ times' },
    },
    {
      id: 'output-structure',
      question: 'The type of output you\'re asked for tells you how much of the problem you actually need to solve. The output is a single element value, not an index or count — what does that simplify?',
      options: [
        { label: 'You can discard position information freely', isCorrect: false, feedback: 'Position information is not what you are discarding — you are discarding the need to track counts explicitly. The element value is what you need to return, but how you find it is still the key question.' },
        { label: 'You never need to return early', isCorrect: false, feedback: 'Returning early is still a valid optimization — if you know the element is majority you can stop. The output type does not prevent early exits.' },
        { label: 'You do not need to reconstruct indices after the scan', isCorrect: true },
        { label: 'Reordering the array is safe since indices are not needed', isCorrect: false, feedback: 'Sorting is O(n log n) — more expensive than necessary. The output type removes the constraint on order, but a linear approach is still preferred given the space hint.' },
      ],
      correctFeedback: 'Right — since you only need to return the value, you do not have to record where each element was found. The scan can focus entirely on identifying which value dominates.',
      wrongFeedback: [
        'Compare this to Two Sum: that problem requires indices, which forces you to remember positions. What does returning a value instead of indices free you from?',
        'What bookkeeping would you need if the output were an index? Since it is a value, what can you drop?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def majority_element(self, nums):
        candidate = None
        count = 0
        for n in nums:
            if count == 0:
                candidate = n
                count = 1
            elif n == candidate:
                count += 1
            else:
                count -= 1
        return candidate`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'This only works *because* the problem guarantees a majority element exists (appearing more than ⌊n/2⌋ times) — without that guarantee, Boyer-Moore voting can confidently return a candidate that never actually held a majority.',
  solutionExplanation: 'Pairing every occurrence of the majority element against one occurrence of something else always leaves at least one majority element unpaired, since it outnumbers everything else combined. The count acts as a running "net votes" tally for the current candidate: it drops to zero exactly when the votes seen so far have fully cancelled out, at which point switching candidates loses no information, because everything cancelled up to that point could never have contained more of the true majority element than of everything else combined.',
}
