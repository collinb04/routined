export default {
  id: 'search-rotated-sorted-array-ii',
  title: 'Search in Rotated Sorted Array II',
  difficulty: 'medium',
  description: 'Given a rotated sorted array that may contain duplicates, return <code>true</code> if the target is in the array, <code>false</code> otherwise.',
  examples: [
    { input: 'nums=[2,5,6,0,0,1,2], target=0', output: 'true' },
    { input: 'nums=[2,5,6,0,0,1,2], target=3', output: 'false' },
  ],
  constraints: ['1 ≤ nums.length ≤ 5000', '-10⁴ ≤ nums[i], target ≤ 10⁴'],
  starterCode: `def search(nums, target):
  pass`,
  functionName: 'search',
  conceptId: 'binary-search',
  testCases: [
    { label: 'Found', args: [[2,5,6,0,0,1,2],0], expected: true },
    { label: 'Not found', args: [[2,5,6,0,0,1,2],3], expected: false },
    { label: 'Single', args: [[1],0], expected: false },
    { label: 'All same', args: [[1,1,1,1],1], expected: true },
  ],
  clues: [
    {
      id: 'duplicates-break-binary-search',
      question: 'Unlike Part I, this array may contain duplicates. What specific case does that introduce that Part I avoids?',
      options: [
        { label: 'The array might not be rotated at all', isCorrect: false, feedback: 'A non-rotated array is a valid input for both parts. The new difficulty introduced by duplicates is the ambiguous comparison case, not the absence of rotation.' },
        { label: 'nums[lo] == nums[mid] makes it impossible to tell which half is sorted', isCorrect: true },
        { label: 'The target might appear more than once', isCorrect: false, feedback: 'Multiple copies of the target are fine — you only need to return true/false, not a specific index. The problem is that equal boundary values prevent you from knowing which half to eliminate.' },
        { label: 'Binary search no longer terminates', isCorrect: false, feedback: 'Binary search still terminates — worst case you shrink lo and hi by 1 each iteration. It just degrades to O(n) in the worst case instead of O(log n).' },
      ],
      correctFeedback: 'When nums[lo] == nums[mid], you can\'t determine which half is sorted. The fix is to increment lo (and/or decrement hi) by 1 and try again — degrading to O(n) in the all-duplicates worst case.',
      wrongFeedback: [
        'In Part I, if nums[lo] ≤ nums[mid], the left half is sorted. What goes wrong with that check when nums[lo] == nums[mid] == nums[hi]?',
        'With all elements equal, every midpoint comparison is a tie. You can\'t eliminate half the array — you can only step one position at a time.',
      ],
    },
    {
      id: 'worst-case-complexity',
      question: 'The test case [1,1,1,1] with target=1 illustrates the worst case. What is the worst-case complexity when duplicates are present?',
      options: [
        { label: 'O(log n) still holds', isCorrect: false, feedback: 'O(log n) is the best case and the case when duplicates are sparse. When nums[lo] == nums[mid] repeatedly (e.g., all equal values), you step one index at a time — that\'s O(n).' },
        { label: 'O(n) when all elements are equal', isCorrect: true },
        { label: 'O(n²) due to nested comparisons', isCorrect: false, feedback: 'There are no nested loops here. The algorithm is still a single pass through the array in the worst case — O(n), not O(n²).' },
        { label: 'O(n log n) after sorting', isCorrect: false, feedback: 'Sorting the array first would take O(n log n) and destroy the rotation structure. The algorithm works directly on the rotated array.' },
      ],
      correctFeedback: 'When all elements are equal (e.g., [1,1,1,1]), every iteration hits the tie case and increments lo by 1. That\'s n iterations total — O(n) worst case, compared to O(log n) in Part I.',
      wrongFeedback: [
        'With [1,1,1,1], how much does lo advance per iteration when the tie case fires?',
        'If each tie-breaking step advances lo by 1 and the array has n elements, how many steps in the worst case?',
      ],
    },
    {
      id: 'output-boolean',
      question: 'This problem returns a boolean, not an index. How does that simplify the logic compared to Part I?',
      options: [
        { label: 'You can stop as soon as you find the target anywhere', isCorrect: true },
        { label: 'You don\'t need to track lo and hi', isCorrect: false, feedback: 'lo and hi are still needed to maintain the search window. What changes is the return value — instead of returning mid, you return true the moment nums[mid] == target.' },
        { label: 'Binary search is no longer needed', isCorrect: false, feedback: 'Binary search is still the right approach. The boolean output just means you return true on first hit instead of tracking the exact index.' },
        { label: 'Duplicates no longer cause any problems', isCorrect: false, feedback: 'The boolean output doesn\'t resolve the ambiguous tie case. Duplicates still force you to step one position at a time when nums[lo] == nums[mid].' },
      ],
      correctFeedback: 'Since you only need existence, return true the moment nums[mid] == target. No need to track or return an index — the first hit is sufficient.',
      wrongFeedback: [
        'In Part I you return the index, so you must find the exact position. Here you only need to know if the target exists. What does that let you do as soon as nums[mid] == target?',
        'Returning a boolean means the moment you confirm the target is present, you\'re done. How does that differ from Part I\'s termination condition?',
      ],
    },
  ],
}
