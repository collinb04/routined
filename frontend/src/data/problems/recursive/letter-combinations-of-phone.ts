export default {
  id: 'letter-combinations-of-phone',
  title: 'Letter Combinations of Phone',
  difficulty: 'medium',
  description: `<p>Given a string containing digits from 2–9, return all possible letter combinations that the number could represent (like a phone keypad). Return the answer in any order. If the input is empty, return an empty list.</p>`,
  examples: [
    { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
    { input: 'digits = ""', output: '[]' },
  ],
  constraints: ['0 <= digits.length <= 4', 'digits[i] is a digit in the range [2,9]'],
  starterCode: `class Solution:
    def letter_combinations(self, digits):
        pass`,
  functionName: 'letter_combinations_run',
  conceptId: 'backtracking',
  runnerSetup: `def letter_combinations_run(digits):
  result = Solution().letter_combinations(digits)
  return sorted(result) if result else []`,
  testCases: [
    { label: '"23"', args: ['23'], expected: ['ad','ae','af','bd','be','bf','cd','ce','cf'] },
    { label: 'empty', args: [''], expected: [] },
  ],
  bruteHint: 'A brute-force approach expands a list of partial combinations one digit at a time: start with [""], then for each digit, loop over its letters and append each one to every partial string built so far. This costs O(4ⁿ · n) time and space, since it builds and stores all 4ⁿ possible strings of length n. The trouble is that the number of digits — and therefore the number of nested loops — is not fixed in advance. How would you structure this expansion when you do not know ahead of time how many loop levels you will need?',
  optimizeComplexity: { time: 'O(4ⁿ · n)', space: 'O(n)' },
  clues: [
    {
      id: 'output-count',
      question: 'Counting how many outputs an input can produce often reveals whether growth is additive or multiplicative, which hints at the right traversal shape. "23" produces 9 combinations. How many does "234" produce, and what pattern does this follow?',
      options: [
        { label: 'Additive: 3 + 3 + 3 = 9 combinations', isCorrect: false, feedback: 'Additive would be correct if you were listing letters from each digit separately. But you need every combination of one letter per digit — that is multiplicative. "234" gives 3 × 3 × 3 = 27 combinations.' },
        { label: 'Multiplicative: letters-per-digit₁ × letters-per-digit₂ × …', isCorrect: true },
        { label: 'Fixed at 9 regardless of digit count', isCorrect: false, feedback: '"23" gives 9 because 3 × 3 = 9. Adding a third digit multiplies the count again: "234" gives 27, "2345" gives 81. The count grows exponentially with the number of digits.' },
        { label: 'Equal to digits.length × 3', isCorrect: false, feedback: 'digits.length × 3 gives a linear count, but combinations are multiplicative. "23" would give 6 by this formula — but the actual answer is 9 (3 × 3, not 2 × 3).' },
      ],
      correctFeedback: '"234": 3 letters × 3 letters × 3 letters = 27 combinations. With digits.length ≤ 4 and at most 4 letters per digit (e.g., digit 7 maps to "pqrs"), the maximum is 4⁴ = 256 combinations — small enough to enumerate all.',
      wrongFeedback: [
        'For "23", digit 2 maps to abc and digit 3 maps to def. How many ways can you pick one letter from abc and one from def?',
        'Each digit adds a multiplicative factor equal to its letter count. "23" = 3 × 3 = 9. Adding a digit multiplies the total — the count grows as a product, not a sum.',
      ],
    },
    {
      id: 'empty-input',
      highlight: { location: 'description', text: 'If the input is empty, return an empty list.' },
      question: 'Edge cases spelled out explicitly in the problem statement often expose an off-by-one or default-case bug in the natural termination logic of an algorithm. "If the input is empty, return an empty list." Why is this an explicit constraint rather than falling out naturally?',
      options: [
        { label: 'An empty digits string has no digit mapping to apply', isCorrect: false, feedback: 'That is true — but a naive backtracking implementation starting with an empty current combination would add that empty string to results, returning [""] instead of []. The constraint guards against that off-by-one.' },
        { label: 'The natural recursive base case would otherwise return [""] instead of []', isCorrect: true },
        { label: 'The constraint is purely for input validation', isCorrect: false, feedback: 'The constraint has a concrete effect on the algorithm. Without an explicit check, a backtracking solution that adds current to results when index == len(digits) would output [""] for empty input — wrong answer.' },
        { label: 'An empty list avoids a division-by-zero error', isCorrect: false, feedback: 'There is no division involved. The constraint exists because backtracking\'s natural termination condition (index reaches end) would fire immediately on empty input and add an empty string to results.' },
      ],
      correctFeedback: 'The standard backtracking template adds the current string when the index equals digits length. For empty input, that fires immediately and adds "" — the explicit empty check prevents this.',
      wrongFeedback: [
        'Trace through your backtracking code with digits="". When does it terminate, and what does it add to results?',
        'With digits="", index == len(digits) immediately. The template would append current="" to results, giving [""]. The explicit guard returns [] before that happens.',
      ],
    },
    {
      id: 'backtracking-structure',
      highlight: { location: 'description', text: 'return all possible letter combinations that the number could represent' },
      question: 'Recognizing when a problem requires enumerating every possible outcome, rather than a single optimal one, is what points you toward the right search technique. To generate all combinations of "23", you try each letter for digit "2" and for each one try all letters for digit "3". What algorithmic pattern does this describe?',
      options: [
        { label: 'Dynamic programming — build combinations bottom-up', isCorrect: false, feedback: 'DP builds optimal solutions from subproblems. Here there is no optimization — you need every combination. Backtracking explores the full search space by making choices and recursing.' },
        { label: 'Backtracking — build combination one character at a time', isCorrect: true },
        { label: 'BFS — explore all length-1 combinations before length-2', isCorrect: false, feedback: 'BFS would work but is less natural here. You need every complete combination of length digits.length — backtracking builds each combination depth-first, appending one character per recursive level.' },
        { label: 'Greedy — always pick the alphabetically first letter', isCorrect: false, feedback: 'Greedy would pick one combination and stop. You need all combinations — there is no single "best" choice to make greedily.' },
      ],
      correctFeedback: 'Backtracking: at each recursive level you iterate over the letters for the current digit, append one to the current string, recurse to the next digit, then backtrack by removing it. The recursion depth equals digits.length (at most 4).',
      wrongFeedback: [
        'You build each combination one character at a time, choosing from the current digit\'s letters, then recurse. When the combination is complete, you record it and return. What pattern is this?',
        'Backtracking explores choices incrementally. Each call handles one digit; after recursing into the next digit, it undoes the choice and tries the next letter — hence "back" tracking.',
      ],
    },
    {
      id: 'constraint-output-size',
      highlight: { location: 'constraint', text: '0 <= digits.length <= 4' },
      question: 'Small numeric bounds in the constraints are often a signal that full enumeration, rather than a cleverer optimization, is the intended approach. digits.length ≤ 4. With at most 4 letters per digit, what is the maximum number of combinations to return?',
      options: [
        { label: '4 × 4 = 16', isCorrect: false, feedback: '16 would be correct if you were picking 2 letters from digits of size 4. With 4 digits each contributing up to 4 letters, the count is 4⁴ = 256 — one combination per path through the decision tree.' },
        { label: '4⁴ = 256', isCorrect: true },
        { label: '9 × 4 = 36 (9 digits times 4 letters each)', isCorrect: false, feedback: 'Multiplying digit count by letter count gives a linear estimate, not the combinatorial count. With 4 digits of 4 letters each, you need one letter per digit position — that is 4 × 4 × 4 × 4 = 256 combinations.' },
        { label: 'Unbounded — depends on the specific digits', isCorrect: false, feedback: 'The constraint bounds it: at most 4 digits and at most 4 letters per digit gives at most 4⁴ = 256 combinations. This is small enough that full enumeration is always acceptable.' },
      ],
      correctFeedback: 'Maximum: 4 digits × 4 letters each = 4⁴ = 256 combinations. This is tiny — generating all of them via backtracking is always fast, and no pruning or optimization is needed.',
      wrongFeedback: [
        'With 4 digits and up to 4 choices per digit, how many complete combinations exist in the worst case?',
        'It\'s 4 choices × 4 choices × 4 choices × 4 choices = 4⁴ = 256. The constraint makes brute-force enumeration trivially feasible.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def letter_combinations(self, digits):
        if not digits:
            return []

        mapping = {
            '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
            '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
        }
        result = []
        path = []

        def backtrack(index):
            if index == len(digits):
                result.append(''.join(path))
                return
            for ch in mapping[digits[index]]:
                path.append(ch)
                backtrack(index + 1)
                path.pop()

        backtrack(0)
        return result`,
  solutionComplexity: { time: 'O(4ⁿ · n)', space: 'O(n)' },
  solutionCaveat: 'The empty-input check runs <code>before</code> backtracking starts — without it, the standard base case (<code>index == len(digits)</code>) would fire immediately on an empty string and append the empty combination <code>""</code>, producing <code>[""]</code> instead of the required <code>[]</code>.',
  solutionExplanation: 'The number of combinations grows multiplicatively, not additively — each digit contributes an independent factor of however many letters map to it — which is exactly the shape backtracking handles naturally: recurse one digit at a time, trying every one of that digit\'s letters and appending it to the combination being built. Since the recursion depth is always <code>digits.length</code> (at most 4) and each level branches into at most 4 letters, the entire search space is small enough that no pruning is needed — every path bottoms out at a complete, valid combination.',
}
