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
  starterCode: `def majority_element(nums):
  pass`,
  functionName: 'majority_element',
  conceptId: 'arrays',
  testCases: [
    { label: '3 is majority', args: [[3,2,3]], expected: 3 },
    { label: '2 is majority', args: [[2,2,1,1,1,2,2]], expected: 2 },
    { label: 'Single', args: [[1]], expected: 1 },
  ],
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 5 × 10⁴ and the problem hints at O(1) space. What does that pair of constraints tell you?',
      options: [
        { label: 'O(n) time and O(1) space is the target', isCorrect: true },
        { label: 'O(n²) time is acceptable', isCorrect: false, feedback: 'At n = 50,000, O(n²) is 2.5 billion operations — far too slow. The O(1) space hint points toward a smarter linear pass.' },
        { label: 'A sorting-based approach works best', isCorrect: false, feedback: 'Sorting is O(n log n) and uses O(log n) auxiliary space — both worse than the hinted target. The problem is steering you away from that direction.' },
        { label: 'Input size does not affect the approach', isCorrect: false, feedback: 'Input size always matters. n ≤ 50,000 combined with the O(1) space hint is narrowing the expected solution to a single linear scan.' },
      ],
      correctFeedback: 'Right — n = 50,000 rules out O(n²) brute force, and the O(1) space hint rules out a frequency hash map. Both constraints together point to a single-pass algorithm.',
      wrongFeedback: [
        'The problem gives two hints at once: a size bound and a space target. What solution family fits both simultaneously?',
        'O(n) time handles 50,000 elements easily. What does the O(1) space constraint add — what familiar structure does it rule out?',
      ],
    },
    {
      id: 'majority-guarantee',
      question: '"The majority element always exists." What does this guarantee let you skip?',
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
    },
    {
      id: 'majority-threshold',
      question: 'The majority element appears more than ⌊n/2⌋ times. What does this threshold imply about the relationship between the majority and all other elements?',
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
    },
    {
      id: 'output-structure',
      question: 'The output is a single element value, not an index or count. What does that simplify?',
      options: [
        { label: 'You can discard position information freely', isCorrect: false, feedback: 'Position information is not what you are discarding — you are discarding the need to track counts explicitly. The element value is what you need to return, but how you find it is still the key question.' },
        { label: 'You never need to return early', isCorrect: false, feedback: 'Returning early is still a valid optimization — if you know the element is majority you can stop. The output type does not prevent early exits.' },
        { label: 'You do not need to reconstruct indices after the scan', isCorrect: true },
        { label: 'Sorting is safe because indices are not needed', isCorrect: false, feedback: 'Sorting is O(n log n) — more expensive than necessary. The output type removes the constraint on order, but a linear approach is still preferred given the space hint.' },
      ],
      correctFeedback: 'Right — since you only need to return the value, you do not have to record where each element was found. The scan can focus entirely on identifying which value dominates.',
      wrongFeedback: [
        'Compare this to Two Sum: that problem requires indices, which forces you to remember positions. What does returning a value instead of indices free you from?',
        'What bookkeeping would you need if the output were an index? Since it is a value, what can you drop?',
      ],
    },
  ],
}
