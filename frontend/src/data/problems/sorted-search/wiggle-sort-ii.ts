export default {
  id: 'wiggle-sort-ii',
  title: 'Wiggle Sort II',
  difficulty: 'medium',
  description: 'Given an integer array <code>nums</code>, reorder it such that <code>nums[0] < nums[1] > nums[2] < nums[3]...</code> (strict inequalities). It is guaranteed that a valid answer exists.',
  examples: [
    { input: 'nums = [1,5,1,1,6,4]', output: '[1,6,1,5,1,4]', explanation: 'One valid wiggle arrangement.' },
  ],
  constraints: ['1 ≤ nums.length ≤ 5 × 10⁴', '0 ≤ nums[i] ≤ 5000', 'A valid answer is guaranteed'],
  starterCode: `class Solution:
    def wiggle_sort(self, nums):
        pass`,
  runnerSetup: 'wiggle_sort = Solution().wiggle_sort',
  functionName: 'wiggle_sort',
  conceptId: 'sorting',
  testCases: [
    { label: 'Verify wiggle property', args: [[1,5,1,1,6,4]], expected: [1,6,1,5,1,4] },
    { label: '[1,3,2,2,3,1]', args: [[1,3,2,2,3,1]], expected: [2,3,1,3,1,2] },
  ],
  bruteHint: 'A direct approach sorts the array in O(n log n) time, then splits it into a smaller half and a larger half at the midpoint, placing the smaller half into the even indices and the larger half into the odd indices. This works for most inputs, but when the median value repeats an odd number of times, its copies get split across both halves and can end up right next to each other after interleaving. What happens to the strict inequality between two adjacent equal values in that case?',
  optimizeComplexity: { time: 'O(n log n)', space: 'O(n)' },
  clues: [
    {
      id: 'strict-inequalities',
      question: 'Strict versus non-strict relational conditions in a problem statement often determine how carefully you must handle duplicate values. The condition requires strict inequalities: nums[0] < nums[1] > nums[2] < … What does "strict" imply about how you handle duplicates?',
      highlight: { location: 'description', text: 'nums[0] < nums[1] > nums[2] < nums[3]...' },
      options: [
        { label: 'Equal adjacent elements are allowed at valley positions', isCorrect: false, feedback: 'Strict inequality means no adjacent element can be equal — not even at valleys. nums[0] < nums[1] means nums[0] must be strictly less than nums[1], not less-than-or-equal.' },
        { label: 'Equal elements must not be placed adjacent to each other', isCorrect: true },
        { label: 'Duplicates make a valid arrangement impossible', isCorrect: false, feedback: 'The problem guarantees a valid answer exists, even with duplicates like [1,5,1,1,6,4]. Strict inequalities are satisfiable — you just need to interleave duplicates carefully.' },
        { label: 'Only peaks (odd indices) can have repeated values', isCorrect: false, feedback: 'Repeated values at odd indices would violate the strict > condition with their neighbors. No position in the wiggle sequence can be equal to either neighbor.' },
      ],
      correctFeedback: 'Strict inequalities mean no ties anywhere in the sequence. With duplicates present, you must separate equal values — placing them all in the same "half" of the interleave would produce adjacent equals.',
      wrongFeedback: [
        'In [1,3,2,2,3,1], both 2s and both 3s appear twice. Can you place both 2s at valley positions? What inequality would that create between them?',
        'Strict means < and >, not ≤ and ≥. If two equal values end up adjacent (valley next to peak), the wiggle condition fails. How must you separate them?',
      ],
    },
    {
      id: 'sort-and-interleave-strategy',
      question: 'A natural-looking first approach can still hide an edge case that only shows up with certain inputs. A natural approach: sort the array, split into a smaller half and larger half, then interleave. Why does the split point matter?',
      options: [
        { label: 'Both halves must be the same size', isCorrect: false, feedback: 'For an odd-length array, the two halves differ by one element. The smaller half goes to even indices (valleys) and the larger to odd indices (peaks). Equal sizes are not required.' },
        { label: 'The median element must not be placed adjacent to itself', isCorrect: true },
        { label: 'The larger half should come first in the interleave', isCorrect: false, feedback: 'Placing larger values first would put them at even (valley) indices and smaller values at odd (peak) indices — reversing the wiggle direction. Smaller values fill valleys, larger fill peaks.' },
        { label: 'Splitting at the midpoint always works', isCorrect: false, feedback: 'Naively splitting at the midpoint can place the median value at both the last position of the smaller half and the first position of the larger half — adjacent after interleaving, violating strict inequality.' },
      ],
      correctFeedback: 'If the median appears an even number of times, any midpoint split works. If it appears an odd number of times, it straddles the split and can end up adjacent. You must ensure the median\'s copies are spread across both halves to avoid adjacency.',
      wrongFeedback: [
        'Sort [1,3,2,2,3,1] → [1,1,2,2,3,3]. Split at midpoint: smaller = [1,1,2], larger = [2,3,3]. Interleave: [1,2,1,3,2,3]. Check: 1<2>1<3>2<3 — does every strict inequality hold?',
        'The problem is the median value (2 in [1,1,2,2,3,3]) appearing at the boundary of both halves. After interleaving, those copies end up adjacent. How does reversing one half before interleaving fix this?',
      ],
    },
    {
      id: 'reverse-halves-trick',
      question: 'A small, targeted tweak to an almost-correct approach is often what closes the last correctness gap. Sorting, splitting into two halves, then reversing each half before interleaving prevents adjacency of equal elements. Why does reversing help?',
      options: [
        { label: 'Reversing sorts both halves in descending order', isCorrect: false, feedback: 'Reversing a sorted half gives descending order within that half — but the reason it helps is not about sort direction. It\'s about where the median-value copies land after interleaving.' },
        { label: 'It spreads median copies away from the interleave boundary', isCorrect: true },
        { label: 'It ensures odd-indexed positions are always larger', isCorrect: false, feedback: 'Odd-indexed positions being peaks is the goal, but that\'s determined by which half fills which index — not by reversing. Reversing specifically solves the median-adjacency problem.' },
        { label: 'Reversing cancels out the original sort order', isCorrect: false, feedback: 'Reversing a sorted half gives a descending subsequence, which is still useful structure — not a cancellation. The key effect is moving median copies from the boundary toward the center of their respective halves.' },
      ],
      correctFeedback: 'After sorting and splitting, the median copies sit at the join boundary — positions that become adjacent after interleaving. Reversing each half moves those boundary elements toward the ends, separating equal values across more interleave positions.',
      wrongFeedback: [
        'Without reversing, the median copies sit at the end of the smaller half and the start of the larger half. After interleaving, where do those two positions land relative to each other?',
        'Reversing moves the median copies from the "inner" boundary of each half to the "outer" edge. After interleaving outer edges with outer edges, are equal values still adjacent?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def wiggle_sort(self, nums):
        n = len(nums)
        sorted_nums = sorted(nums)
        mid = (n + 1) // 2
        small = sorted_nums[:mid][::-1]
        large = sorted_nums[mid:][::-1]
        for i in range(n):
            if i % 2 == 0:
                nums[i] = small[i // 2]
            else:
                nums[i] = large[i // 2]
        return nums`,
  solutionComplexity: { time: 'O(n log n)', space: 'O(n)' },
  solutionCaveat: 'Both halves are reversed before interleaving — filling from the *back* of each half rather than the front — which is specifically what keeps repeated copies of the median from ending up adjacent to each other, since a repeated median\'s copies get pushed to opposite outer edges of the two halves instead of sitting next to each other at the inner boundary.',
  solutionExplanation: 'Splitting the sorted array into a smaller half and a larger half and placing the smaller half at even indices, the larger at odd indices, guarantees every even-indexed value is <code>&lt;=</code> every odd-indexed value it neighbors — the general shape the wiggle pattern needs. Reversing each half before interleaving is the detail that makes the inequalities strict even when the median value repeats several times, since equal values end up separated across the two halves rather than clustered next to each other.',
}
