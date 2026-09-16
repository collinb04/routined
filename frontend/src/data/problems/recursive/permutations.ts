export default {
  id: 'permutations',
  title: 'Permutations',
  difficulty: 'medium',
  description: `<p>Given an array <code>nums</code> of distinct integers, return all the possible permutations. You can return the answer in any order.</p>`,
  examples: [
    { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
    { input: 'nums = [0,1]', output: '[[0,1],[1,0]]' },
  ],
  constraints: ['1 <= nums.length <= 6', 'All integers are unique'],
  starterCode: `class Solution:
    def permute(self, nums):
        pass`,
  functionName: 'permute_run',
  conceptId: 'backtracking',
  runnerSetup: `def permute_run(nums):
  return sorted(Solution().permute(nums))`,
  testCases: [
    { label: '[1,2,3]', args: [[1,2,3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
    { label: '[0,1]', args: [[0,1]], expected: [[0,1],[1,0]] },
  ],
  bruteHint: 'The brute-force approach generates every length-n sequence built from the elements of the array, including sequences that repeat one element and omit another, then filters that full set down to the ones using each element exactly once. Since each of the n positions could independently hold any of the n values, that is n^n candidate sequences to generate and check before filtering. With n up to 6, that is 6^6 = 46,656 candidates versus only 720 actual permutations, so most of the generated work is wasted. What if you only ever placed elements that had not yet been used, so every partial sequence you built was already guaranteed valid?',
  optimizeComplexity: { time: 'O(n!)', space: 'O(n)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Numeric bounds on the input size tell you whether an exponential-time enumeration is actually within budget. nums.length ≤ 6. What does this tell you about the number of results and the intended approach?',
      options: [
        { label: 'O(n²) iteration is sufficient', isCorrect: false, feedback: 'O(n²) cannot enumerate all permutations — there are n! of them. At n = 6, that is 720 permutations, each of length 6. The output size alone is 6 × 720 = 4,320 elements.' },
        { label: 'Backtracking over all n! permutations is feasible', isCorrect: true },
        { label: 'Dynamic programming builds permutations efficiently', isCorrect: false, feedback: 'DP works when subproblems overlap and can be reused. Permutation enumeration has no overlapping subproblems to exploit — each branch is distinct. The small n signals backtracking, not DP.' },
        { label: 'Only 6 permutations exist for any n ≤ 6', isCorrect: false, feedback: 'The number of permutations is n! — for n = 6 that is 720, not 6. The bound n ≤ 6 keeps 6! = 720 manageable, but there are not just 6 permutations.' },
      ],
      correctFeedback: 'At n = 6, n! = 720 permutations. Backtracking — pick one unused element for each position in turn — generates all of them in O(n × n!) time, which is trivially fast.',
      wrongFeedback: [
        'How many permutations does [1,2,3] have? How about [1,2,3,4,5,6]?',
        'n! permutations: 6 for n=3, 720 for n=6. At n ≤ 6, backtracking that generates all n! results is fast enough.',
      ],
      highlight: { location: 'constraint', text: '1 <= nums.length <= 6' },
    },
    {
      id: 'distinct-elements-signal',
      question: 'Guarantees about uniqueness in the input determine whether you need extra bookkeeping to avoid duplicate output. All integers are unique. What does this guarantee about duplicate results?',
      options: [
        { label: 'You must deduplicate results with a set', isCorrect: false, feedback: 'With all distinct elements, no two different orderings can produce the same permutation. No deduplication is needed — the uniqueness guarantee means your backtracking naturally produces distinct results.' },
        { label: 'Every permutation is distinct; no deduplication needed', isCorrect: true },
        { label: 'Sort nums before generating permutations', isCorrect: false, feedback: 'Sorting is useful when elements can repeat (to skip duplicate branches). With all distinct elements, the output is already fully distinct regardless of input order. Sorting is unnecessary.' },
        { label: 'You can skip checking whether an element is already used', isCorrect: false, feedback: 'You still need to track which elements are already in the current permutation — otherwise you would reuse the same number multiple times in one permutation. The uniqueness guarantee removes duplicates in the output, not the need to track usage.' },
      ],
      correctFeedback: 'Since all elements are distinct, each arrangement of them is a unique permutation. No two branches of your backtracking produce the same result, so you can collect every complete path without deduplication.',
      wrongFeedback: [
        'If nums had duplicate values, two permutations might look identical. Does that apply here?',
        'All elements are distinct, so every ordering is unique. Your result list will never contain duplicates — no set or sorting needed to clean it up.',
      ],
      highlight: { location: 'constraint', text: 'All integers are unique' },
    },
    {
      id: 'output-structure',
      question: 'The exact shape of the requested output — a single value versus a full collection — dictates when and what your backtracking must record. The output is all permutations — a list of n! lists. What does this require of your backtracking?',
      options: [
        { label: 'Return the lexicographically first permutation only', isCorrect: false, feedback: 'The problem asks for all permutations in any order. Stopping at the first result — or any single result — misses the rest of the required output.' },
        { label: 'Append a copy of the current path at each complete permutation', isCorrect: true },
        { label: 'Build permutations iteratively using index swaps', isCorrect: false, feedback: 'Index swaps are a valid technique, but the key requirement is appending a copy of each complete permutation to results. Whether you use swaps or a used-set, you must capture all n! complete paths.' },
        { label: 'Count how many permutations satisfy a condition', isCorrect: false, feedback: 'No condition is imposed here — every ordering is valid. The output requires collecting all of them, not counting them.' },
      ],
      correctFeedback: 'Each time your backtracking path reaches length n, you have a complete permutation. Append a copy (not a reference) to results and backtrack. Collect all n! of them before returning.',
      wrongFeedback: [
        'When your current path contains all n elements in some order, what do you do with it?',
        'Append a copy of the current path to results. Then backtrack — remove the last element and try the next unused one — to generate the remaining permutations.',
      ],
      highlight: { location: 'description', text: 'return all the possible permutations' },
    },
    {
      id: 'used-tracking-signal',
      question: 'Constraints on how many times an element may be reused directly determine what state your recursion must carry between calls. Each element can appear only once per permutation. How do you track which elements are available at each recursive step?',
      options: [
        { label: 'Re-sort the remaining elements before each recursive call', isCorrect: false, feedback: 'Sorting on each call is O(n log n) per level and unnecessary. A boolean used array or a set of remaining elements checks membership in O(1) and costs O(n) to initialize once.' },
        { label: 'A boolean used array or the remaining-elements list', isCorrect: true },
        { label: 'Check if the element is already in the output list', isCorrect: false, feedback: 'The output list grows with every complete permutation — scanning it to check availability would be O(n × n!) per check, which is extremely slow and logically wrong.' },
        { label: 'No tracking needed since all elements are distinct', isCorrect: false, feedback: 'Distinctness means no duplicate outputs, but it does not prevent you from reusing the same index within one permutation. You still need to mark elements as used within the current path.' },
      ],
      correctFeedback: 'A boolean used[i] array marks which indices are already in the current path. At each level, iterate over all indices; skip any that are marked. Mark on the way in, unmark on the way out.',
      wrongFeedback: [
        'Without any tracking, what stops you from putting 1 in every position of a permutation of [1,2,3]?',
        'You need to know which elements are already in the current partial permutation. A boolean used array lets you check and update in O(1) per element.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def permute(self, nums):
        result = []
        path = []
        used = [False] * len(nums)

        def backtrack():
            if len(path) == len(nums):
                result.append(path[:])
                return
            for i in range(len(nums)):
                if used[i]:
                    continue
                used[i] = True
                path.append(nums[i])
                backtrack()
                path.pop()
                used[i] = False

        backtrack()
        return result`,
  solutionComplexity: { time: 'O(n!)', space: 'O(n)' },
  solutionCaveat: 'The <code>used</code> array is unmarked (<code>used[i] = False</code>) in the same step that pops the element off <code>path</code> — both undo operations happen together on backtrack, since leaving either one out would either make an element permanently unavailable or let it silently reappear in the current path without actually being in it.',
  solutionExplanation: 'At every recursive level, trying every not-yet-used index and marking it used before recursing (then unmarking after) is what guarantees each of the n! orderings is generated exactly once — the <code>used</code> array is the complete state needed to know which elements remain available at any point in the search. Because all input values are guaranteed distinct, no two different index sequences can ever produce the same output permutation, so the result needs no deduplication beyond what backtracking already produces.',
}
