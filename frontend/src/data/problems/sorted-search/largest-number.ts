export default {
  id: 'largest-number',
  title: 'Largest Number',
  difficulty: 'medium',
  description: 'Given a list of non-negative integers, arrange them such that they form the largest number and return it as a string.',
  examples: [
    { input: 'nums = [10,2]', output: '"210"', explanation: '"210" > "102".' },
    { input: 'nums = [3,30,34,5,9]', output: '"9534330"' },
  ],
  constraints: ['1 ≤ nums.length ≤ 100', '0 ≤ nums[i] ≤ 10⁹'],
  starterCode: `class Solution:
    def largest_number(self, nums):
        pass`,
  runnerSetup: 'largest_number = Solution().largest_number',
  functionName: 'largest_number',
  conceptId: 'sorting',
  testCases: [
    { label: '[10,2]', args: [[10,2]], expected: '210' },
    { label: '[3,30,34,5,9]', args: [[3,30,34,5,9]], expected: '9534330' },
    { label: 'All zeros', args: [[0,0]], expected: '0' },
    { label: 'Single', args: [[5]], expected: '5' },
  ],
  bruteHint: 'The brute-force instinct is to sort the numbers by their plain numeric value, largest to smallest, and concatenate them in that order. But numeric sort doesn\'t account for how digits combine — a case like [3, 34] shows why: 3 sorts before 34 numerically, giving "334", when "343" is actually larger. Since numeric sort doesn\'t reflect concatenation order, what comparison would?',
  optimizeComplexity: { time: 'O(n log n)', space: 'O(n)' },
  clues: [
    {
      id: 'comparison-key',
      question: 'When a natural sort order breaks under composition, the fix is usually a custom comparator built around how elements combine. Sorting [10, 2] numerically gives [2, 10], producing "210" — the correct answer. But standard numeric sort fails on [3, 30]: it gives [3, 30] (→ "330") when the answer is "330." Hmm, it happens to work here. Try [3, 34]: numeric sort gives [3, 34] → "334", but "343" > "334". What comparison actually works?',
      options: [
        { label: 'Sort numerically, largest first', isCorrect: false, feedback: 'Numeric sort breaks on cases like [3, 34]: it places 3 before 34 (→ "334") but "343" is larger. The correct order depends on concatenation, not numeric value.' },
        { label: 'Compare a+b vs b+a as strings for each pair', isCorrect: true },
        { label: 'Sort by string length, then numerically', isCorrect: false, feedback: 'Length-then-value doesn\'t capture the right ordering. For [3, 34]: same length gives numeric tie-break → 3 before 34 → "334". But "343" is larger. Concatenation comparison is what matters.' },
        { label: 'Sort lexicographically as strings', isCorrect: false, feedback: 'Lexicographic sort fails on [9, 90]: "9" > "90" lexicographically, giving "990" — but that\'s actually correct here. It fails on [3, 30]: "3" > "30" lex → "330" which is correct, but [9, 10] lex gives "910" — correct again. Consider [20, 200]: lex → "200" < "20" → "20200" but "20020" vs "20200": "20200" wins. Actually lex works here too. The definitive failure: [9, 901] — lex: "901" < "9" → "9901", but "9019" < "9901". Wait — lex is wrong in general. Compare str(a)+str(b) vs str(b)+str(a) is the correct comparator.' },
      ],
      correctFeedback: 'For any two numbers a and b, place a before b if str(a)+str(b) > str(b)+str(a). This comparator is transitive and produces the globally optimal arrangement when used as a sort key.',
      wrongFeedback: [
        'For [3, 34]: is "334" or "343" larger? Which concatenation order produced the larger result?',
        'Compare str(a)+str(b) against str(b)+str(a). If str(a)+str(b) is larger, a should come first. This pairwise rule, applied via sort, gives the globally optimal arrangement.',
      ],
    },
    {
      id: 'all-zeros-edge-case',
      highlight: { location: 'constraint', text: '0 ≤ nums[i] ≤ 10⁹' },
      question: 'Constraints that permit boundary values like zero often hide edge cases you must handle explicitly. The test case [0, 0] expects "0", not "00". When should you return "0"?',
      options: [
        { label: 'When every element is 0', isCorrect: false, feedback: 'This is close but imprecise. After sorting and joining, if the result starts with "0", the entire number is 0 — because if the largest element is 0, all elements are 0. Checking the first character of the joined result is the cleanest guard.' },
        { label: 'When the first character of the joined result is "0"', isCorrect: true },
        { label: 'When nums.length equals 1 and nums[0] is 0', isCorrect: false, feedback: 'This only handles a single-element input. [0, 0] has two elements and still needs the "0" guard. The check should apply whenever the sorted-then-joined result begins with "0".' },
        { label: 'When the sum of all elements is 0', isCorrect: false, feedback: 'Summing all elements works for this specific case, but it\'s more computation than necessary. A simpler check is: if the first character of the joined result is "0", return "0".' },
      ],
      correctFeedback: 'After sorting and joining, if result[0] == "0", all numbers were 0 and the answer is "0". This single check handles [0], [0,0], [0,0,0,0] without special-casing element values.',
      wrongFeedback: [
        'After your sort and join, when would the resulting string start with "0"? What does that imply about all the numbers in the input?',
        'If the largest number (first after sorting) is "0", every number is 0. The joined string starts with "0" in that case, and the correct output is the single character "0".',
      ],
    },
    {
      id: 'output-type',
      highlight: { location: 'constraint', text: '1 ≤ nums.length ≤ 100' },
      question: 'Large size bounds in the constraints can rule out native numeric types entirely. The output is a string, not an integer. Why return a string?',
      options: [
        { label: 'Integers can\'t hold large concatenations like nums.length = 100 with nums[i] up to 10⁹', isCorrect: true },
        { label: 'String comparison is faster than integer comparison', isCorrect: false, feedback: 'Performance is not the reason. The output is a string because the concatenated result could have up to 100 × 10 = 1,000 digits — far beyond the range of a 64-bit integer.' },
        { label: 'The problem involves string concatenation, so strings are natural', isCorrect: false, feedback: 'This is a consequence, not the reason. The key constraint is that the result can be up to ~1,000 digits long, which overflows any native integer type.' },
        { label: 'Returning a string avoids leading-zero ambiguity', isCorrect: false, feedback: 'Leading zeros are handled separately (the all-zeros edge case). The primary reason for string output is that the result can have up to 100 × 10 = 1,000 digits, far exceeding integer range.' },
      ],
      correctFeedback: 'With up to 100 numbers each up to 10⁹ (10 digits), the concatenated result can be up to 1,000 digits long. No built-in integer type holds that. Returning a string is the only correct representation.',
      wrongFeedback: [
        'nums.length ≤ 100 and nums[i] ≤ 10⁹. Each number has at most 10 digits. How many digits can the concatenated result have?',
        'Up to 100 × 10 = 1,000 digits. A 64-bit integer holds at most 19 digits. The output must be a string.',
      ],
    },
  ],
  solutionCode: `from functools import cmp_to_key

class Solution:
    def largest_number(self, nums):
        strs = [str(n) for n in nums]
        def compare(a, b):
            if a + b > b + a:
                return -1
            elif a + b < b + a:
                return 1
            return 0
        strs.sort(key=cmp_to_key(compare))
        result = "".join(strs)
        return "0" if result[0] == "0" else result`,
  solutionComplexity: { time: 'O(n log n)', space: 'O(n)' },
  solutionCaveat: 'The all-zeros edge case (like <code>[0, 0]</code>) needs an explicit check — concatenating any number of <code>"0"</code> strings sorted correctly still produces <code>"00"</code>, which is numerically zero but not the canonical string representation the problem wants.',
  solutionExplanation: 'Comparing two numbers by their *concatenation* in both orders — is <code>a + b</code> bigger than <code>b + a</code>? — directly answers "which order produces a larger combined number," which is exactly the ordering rule needed, unlike comparing the numbers\' plain numeric values (which breaks for cases like 3 vs. 34, where "334" loses to "343"). Sorting all the numbers\' string forms by that custom comparator and concatenating them in order builds the largest possible arrangement directly.',
}
