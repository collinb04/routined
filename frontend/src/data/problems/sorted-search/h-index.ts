export default {
  id: 'h-index',
  title: 'H-Index',
  difficulty: 'medium',
  description: 'Given an array of integers <code>citations</code> representing the number of citations for each paper, return the researcher\'s h-index: the maximum value <code>h</code> such that at least <code>h</code> papers have at least <code>h</code> citations.',
  examples: [
    { input: 'citations = [3,0,6,1,5]', output: '3', explanation: '3 papers have ≥ 3 citations.' },
    { input: 'citations = [1,3,1]', output: '1' },
  ],
  constraints: ['1 ≤ n ≤ 5000', '0 ≤ citations[i] ≤ 1000'],
  starterCode: `class Solution:
    def h_index(self, citations):
        pass`,
  runnerSetup: 'h_index = Solution().h_index',
  functionName: 'h_index',
  conceptId: 'sorting',
  testCases: [
    { label: 'Standard', args: [[3,0,6,1,5]], expected: 3 },
    { label: 'Small', args: [[1,3,1]], expected: 1 },
    { label: 'All same', args: [[5,5,5,5,5]], expected: 5 },
    { label: 'All zeros', args: [[0,0]], expected: 0 },
  ],
  bruteHint: 'The brute-force approach checks every candidate value of h from 0 up to n, counting how many papers have at least h citations for each candidate, which costs O(n) work per candidate and O(n²) overall. It\'s straightforward but repeats a lot of counting work across candidates. What single preprocessing step on citations would let you evaluate every candidate h without recounting from scratch each time?',
  clues: [
    {
      id: 'definition-signal',
      highlight: { location: 'description', text: 'the maximum value <code>h</code> such that at least <code>h</code> papers have at least <code>h</code> citations.' },
      question: 'A definition that ties two quantities together often hides a bound on the answer\'s range. "Maximum h such that at least h papers have at least h citations." This self-referential definition implies…',
      options: [
        { label: 'Sum all citations and divide by n', isCorrect: false, feedback: 'The average citation count is unrelated to the h-index. A researcher with one paper cited 1000 times has h = 1, not 1000. The definition is about count vs. threshold, not averages.' },
        { label: 'h is bounded by the number of papers, not the citation counts', isCorrect: true },
        { label: 'h equals the median citation count', isCorrect: false, feedback: 'The median is not the h-index. Consider [5,5,5,5,5]: median is 5 and h-index is 5. But [100,0,0,0,0]: median is 0 and h-index is 1. They diverge.' },
        { label: 'h is the maximum citation value in the array', isCorrect: false, feedback: 'The maximum citation is an upper bound on citations[i], not on h. With [100], you have 1 paper with 100 citations, so h = 1, not 100.' },
      ],
      correctFeedback: 'h is simultaneously a count of papers and a citation threshold. With n papers, h can never exceed n — you can\'t have more than n papers with ≥ h citations. This bounds the search space to [0, n].',
      wrongFeedback: [
        'h must satisfy two conditions at once: at least h papers, each with at least h citations. What\'s the maximum h can be if you have n papers total?',
        'You need h papers to achieve h-index h. If you only have n papers, h ≤ n always. The citation counts just determine where within [0, n] the answer lands.',
      ],
    },
    {
      id: 'sorting-approach',
      question: 'Choosing the right preprocessing step can turn an awkward comparison into a simple positional check. Sorting citations in descending order simplifies the search. Why?',
      options: [
        { label: 'Sorting removes duplicate citation values', isCorrect: false, feedback: 'Sorting doesn\'t remove duplicates — it just orders them. And duplicates are fine; citations = [5,5,5,5,5] has h = 5. Duplicates are not the issue.' },
        { label: 'After sorting, index i + 1 directly tells you the paper count', isCorrect: true },
        { label: 'Sorting puts the maximum at index 0, giving h immediately', isCorrect: false, feedback: 'The maximum citation is not the h-index (one very-cited paper doesn\'t give a high h). Sorting helps because it lets you compare each paper\'s citation count against its rank.' },
        { label: 'Sorted order enables binary search on citation values', isCorrect: false, feedback: 'You don\'t binary-search on citation values — you search for the rank where citations[i] ≥ rank. Sorting helps by aligning rank with index, but a simple scan suffices after sorting.' },
      ],
      correctFeedback: 'Sort descending. At index i (0-based), i+1 papers have citations ≥ citations[i]. Walk until citations[i] < i+1 — the previous i is your h-index.',
      wrongFeedback: [
        'After sorting [6,5,3,1,0] descending, at index 2 the value is 3. How many papers have at least 3 citations?',
        'In sorted descending order, index i means i+1 papers are at or above that citation count. You need to find the last i where citations[i] ≥ i+1.',
      ],
    },
    {
      id: 'output-type',
      question: 'The shape of the expected output often tells you what kind of running state you need to maintain while scanning. The output is a single integer h, not a list of papers. What does this mean about how you accumulate the answer?',
      options: [
        { label: 'Collect all valid h values and return the largest', isCorrect: false, feedback: 'You don\'t need to collect all valid h values. You can track the running maximum — once citations[i] < i+1, the maximum h you\'ve seen so far is your answer.' },
        { label: 'Track the running maximum as you scan sorted citations', isCorrect: true },
        { label: 'Return the count of papers above some fixed threshold', isCorrect: false, feedback: 'The threshold isn\'t fixed — h is what you\'re looking for, and it\'s the threshold itself. You find h by scanning, not by comparing against a predetermined value.' },
        { label: 'Jump directly to a candidate h instead of scanning every index in order', isCorrect: false, feedback: 'Binary search on h is possible but requires a separate feasibility check. After sorting, a simple linear scan is both simpler and sufficient at n ≤ 5000.' },
      ],
      correctFeedback: 'Scan sorted-descending citations. At each step, if citations[i] ≥ i+1, then i+1 is a valid h — update your answer. Stop when citations[i] < i+1.',
      wrongFeedback: [
        'You\'re looking for the maximum h. As you scan through sorted citations and each step gives you a candidate h, what do you do with it?',
        'Each index i where citations[i] ≥ i+1 contributes candidate h = i+1. Keep the running maximum of these candidates.',
      ],
    },
  ],
  optimizeComplexity: { time: 'O(n log n)', space: 'O(1)' },
  solutionCode: `class Solution:
    def h_index(self, citations):
        citations.sort(reverse=True)
        h = 0
        for i, c in enumerate(citations):
            if c >= i + 1:
                h = i + 1
            else:
                break
        return h`,
  solutionCaveat: 'The moment a paper\'s citation count drops below its 1-indexed position in the sorted-descending list, the loop stops immediately — once one paper fails to have "at least i+1 citations," every paper after it (with even fewer citations) fails too, so continuing the scan could never find a larger valid h.',
  solutionExplanation: 'Sorting citations from highest to lowest turns "at least h papers with at least h citations" into a simple position check: the paper at position <code>i</code> (1-indexed) needs at least <code>i</code> citations to count toward an h-index of <code>i</code>. Walking down the sorted list and tracking the largest position that still satisfies its own requirement finds the h-index directly, without recomputing a count for every candidate value of h from scratch.',
}
