export default {
  id: 'find-min-rotated-sorted-array-ii',
  title: 'Find Minimum in Rotated Sorted Array II',
  difficulty: 'hard',
  description: 'Given a rotated sorted array that may contain duplicates, find the minimum element. This is the harder follow-up to "Find Minimum in Rotated Sorted Array."',
  examples: [
    { input: 'nums = [1,3,5]', output: '1' },
    { input: 'nums = [2,2,2,0,1]', output: '0' },
  ],
  constraints: ['n == nums.length', '1 ≤ n ≤ 5000', '-5000 ≤ nums[i] ≤ 5000', 'nums is sorted and possibly rotated, may contain duplicates'],
  starterCode: `class Solution:
    def find_min(self, nums):
        pass`,
  runnerSetup: 'find_min = Solution().find_min',
  functionName: 'find_min',
  conceptId: 'binary-search',
  testCases: [
    { label: 'No rotation', args: [[1,3,5]], expected: 1 },
    { label: 'With duplicates', args: [[2,2,2,0,1]], expected: 0 },
    { label: 'All same', args: [[1,1,1]], expected: 1 },
    { label: 'Single', args: [[3]], expected: 3 },
  ],
  bruteHint: 'The brute-force approach is a linear scan: walk through the array once, tracking the minimum value seen so far, in O(n) time and O(1) space. It works no matter how the array is rotated or how many duplicates it contains, since it never relies on sorted structure. But the array is sorted — just rotated — so what property of that structure could let you skip over large chunks of it instead of checking every element?',
  clues: [
    {
      id: 'duplicates-impact',
      highlight: { location: 'constraint', text: 'nums is sorted and possibly rotated, may contain duplicates' },
      question: 'Constraints that permit repeated or special-case values often reveal exactly where a clean algorithm breaks down. "May contain duplicates" — this is the harder follow-up to the no-duplicates version. What specifically makes duplicates harder?',
      options: [
        { label: 'Duplicates increase the array size past what a fast search can handle', isCorrect: false, feedback: 'n ≤ 5000 is well within binary search range regardless of duplicates. The difficulty is about ambiguity in decision-making, not scale.' },
        { label: 'When nums[mid] == nums[right], you can\'t tell which half contains the minimum', isCorrect: true },
        { label: 'Duplicates mean the array may not be rotated', isCorrect: false, feedback: 'An array can be rotated whether or not it has duplicates. The issue with duplicates is that the standard binary search comparison breaks down in a specific case.' },
        { label: 'Duplicates require counting occurrences before searching', isCorrect: false, feedback: 'You don\'t need to count duplicates — you need to find the minimum. The challenge is that equal values at the boundaries prevent you from eliminating a half safely.' },
      ],
      correctFeedback: 'Without duplicates, nums[mid] < nums[right] tells you the minimum is in the left half. With duplicates, nums[mid] == nums[right] leaves both halves possible — you can only safely shrink by one: right -= 1.',
      wrongFeedback: [
        'In the no-duplicates version, comparing nums[mid] to nums[right] always tells you which half to search. What happens when nums[mid] == nums[right] and there are duplicates?',
        'When nums[mid] == nums[right], the minimum could be in either half. You can\'t eliminate an entire half — what\'s the safest move?',
      ],
    },
    {
      id: 'worst-case-complexity',
      question: 'Once you know an edge case exists, it\'s worth tracing how it affects your algorithm\'s worst-case guarantees. Because of duplicates, the worst-case complexity degrades. What is it?',
      options: [
        { label: 'Still O(log n) in all cases', isCorrect: false, feedback: 'That\'s true for the no-duplicates version. With duplicates, consider [2,2,2,…,2,0,2]: you can only shrink by 1 per step when nums[mid] == nums[right], leading to O(n) in the worst case.' },
        { label: 'O(n) in the worst case', isCorrect: true },
        { label: 'O(n log n) due to repeated comparisons', isCorrect: false, feedback: 'O(n log n) would suggest a sort-like process, but the algorithm is simpler than that. Each step either halves the range or shrinks it by one — worst case is O(n), not O(n log n).' },
        { label: 'O(n²) because duplicates require nested checks', isCorrect: false, feedback: 'No nested loops are involved. Each iteration does O(1) work and either halves the range or decrements right by 1. The worst case is linear, not quadratic.' },
      ],
      correctFeedback: 'On an array like [2,2,2,2,0,2], every step hits the ambiguous case nums[mid] == nums[right] and can only decrement right by 1. That\'s O(n) steps — the guarantee of O(log n) breaks down.',
      wrongFeedback: [
        'Imagine [2,2,2,2,2,0,2] with n = 7. How many times does the algorithm decrement right by 1 before it can make a binary jump?',
        'When every element is a duplicate except one, the algorithm degrades to stepping one element at a time. That\'s O(n) in the worst case.',
      ],
    },
    {
      id: 'handling-ambiguity',
      question: 'When two options both look safe, it helps to check whether one of them could silently discard the answer. When nums[mid] == nums[right], the safe move is right -= 1. Why not left += 1?',
      options: [
        { label: 'right -= 1 is arbitrary; left += 1 works equally well', isCorrect: false, feedback: 'They\'re not equivalent. The minimum could be at right itself — decrementing left could skip a position that was never the minimum anyway, but incrementing left might skip the minimum.' },
        { label: 'Incrementing left could skip the minimum if it\'s at left', isCorrect: true },
        { label: 'right -= 1 is faster because the minimum is always in the right half', isCorrect: false, feedback: 'The minimum is not always in the right half — the rotation pivot can be anywhere. right -= 1 is safe because nums[right] is a duplicate of nums[mid], so the minimum isn\'t lost by shrinking from the right.' },
        { label: 'left += 1 would make the loop infinite', isCorrect: false, feedback: 'left += 1 terminates the loop just as fast. The problem is correctness: if the minimum happens to be at the current left, incrementing left skips it.' },
      ],
      correctFeedback: 'When nums[mid] == nums[right], you know nums[right] is a duplicate of nums[mid]. The minimum is still somewhere in [left, right−1] because removing one duplicate from the right end can\'t remove the minimum.',
      wrongFeedback: [
        'When nums[mid] == nums[right], is it possible that right itself is the minimum? What would left += 1 risk?',
        'You can safely remove nums[right] because nums[mid] has the same value — the minimum is still represented. Removing nums[left] isn\'t guaranteed safe because left might be the unique minimum.',
      ],
    },
  ],
  optimizeComplexity: { time: 'O(log n) avg, O(n) worst', space: 'O(1)' },
  solutionCode: `class Solution:
    def find_min(self, nums):
        lo, hi = 0, len(nums) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] > nums[hi]:
                lo = mid + 1
            elif nums[mid] < nums[hi]:
                hi = mid
            else:
                hi -= 1
        return nums[lo]`,
  solutionCaveat: 'When <code>nums[mid] == nums[hi]</code>, neither half can be safely eliminated — the minimum could be in either — so the only correct move is to shrink from the right by one instead of jumping <code>mid</code> or <code>mid+1</code>, which is what drops this from guaranteed O(log n) to O(n) in the worst case (e.g. an array of all-identical values).',
  solutionExplanation: 'Comparing the middle element against the rightmost tells you which side must contain the rotation point: if <code>nums[mid] > nums[hi]</code>, the minimum lies strictly to the right of <code>mid</code>; if <code>nums[mid] < nums[hi]</code>, <code>mid</code> itself could still be the minimum, so the right half beyond it is safely discarded. Duplicates break that clean signal exactly when <code>nums[mid] == nums[hi]</code> — at that point nothing can be ruled out for certain, so nudging <code>hi</code> inward by one is the only move guaranteed not to skip past the true minimum.',
}
