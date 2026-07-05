export default {
  id: 'find-k-closest-elements',
  title: 'Find K Closest Elements',
  difficulty: 'medium',
  description: 'Given a sorted integer array <code>arr</code> and integers <code>k</code> and <code>x</code>, return the <code>k</code> closest integers to <code>x</code> in sorted order. Ties are broken by preferring the smaller element.',
  examples: [
    { input: 'arr=[1,2,3,4,5], k=4, x=3', output: '[1,2,3,4]' },
    { input: 'arr=[1,2,3,4,5], k=4, x=-1', output: '[1,2,3,4]' },
  ],
  constraints: ['1 ≤ k ≤ arr.length', '1 ≤ arr.length ≤ 10⁴', 'arr is sorted'],
  starterCode: `def find_closest_elements(arr, k, x):
  pass`,
  functionName: 'find_closest_elements',
  conceptId: 'binary-search',
  testCases: [
    { label: 'Middle', args: [[1,2,3,4,5],4,3], expected: [1,2,3,4] },
    { label: 'Left of range', args: [[1,2,3,4,5],4,-1], expected: [1,2,3,4] },
    { label: 'Right of range', args: [[1,2,3,4,5],4,100], expected: [2,3,4,5] },
  ],
  clues: [
    {
      id: 'sorted-input',
      question: '"arr is sorted." What does this property enable?',
      options: [
        { label: 'Sort the output after collecting all candidates', isCorrect: false, feedback: 'The output is already in sorted order because arr is sorted and the k closest elements form a contiguous subarray. There\'s nothing to sort at the end.' },
        { label: 'Binary search to locate x, then expand outward', isCorrect: true },
        { label: 'Scan linearly from left for the first element near x', isCorrect: false, feedback: 'A linear scan works but ignores the sorted property. Binary search finds the starting position in O(log n) instead of O(n), and sorted order guarantees the k closest form a contiguous window.' },
        { label: 'Build a heap of all distances from x', isCorrect: false, feedback: 'A heap would work on an unsorted array, but it throws away the sorted structure. The k closest elements form a contiguous subarray in a sorted array — you don\'t need a heap.' },
      ],
      correctFeedback: 'Because arr is sorted, the k closest elements always form a contiguous subarray. Binary search locates the neighborhood of x in O(log n), then you expand or slide a window of size k.',
      wrongFeedback: [
        'In a sorted array, are the k closest elements to x guaranteed to be adjacent to each other?',
        'The k closest elements form a contiguous window. Binary search finds where x fits, and the answer is a window of width k somewhere around that position.',
      ],
    },
    {
      id: 'tie-breaking-rule',
      question: '"Ties are broken by preferring the smaller element." How does this affect how you compare candidates at the window boundary?',
      options: [
        { label: 'Prefer the element with the smaller index', isCorrect: false, feedback: 'Index is correlated with value in a sorted array, but the rule is about value magnitude, not array position. When distances are equal, prefer the numerically smaller element.' },
        { label: 'When left distance equals right distance, include the left (smaller) element', isCorrect: true },
        { label: 'When distances are equal, include both and trim the larger', isCorrect: false, feedback: 'You only return exactly k elements — there\'s no trimming step. The tie-breaking rule tells you which side to favor when shrinking or sliding the window.' },
        { label: 'Ties never occur in practice, so ignore this rule', isCorrect: false, feedback: 'Ties are common — for example, x = 3 with arr = [1,2,3,4,5] and k = 4 produces 4 vs 5 as candidates with equal distance from 3. The rule directly determines the output.' },
      ],
      correctFeedback: 'When comparing the left boundary and right boundary: if x − arr[left] ≤ arr[right] − x, the left element is at least as close (smaller wins ties), so prefer left. Otherwise take from the right.',
      wrongFeedback: [
        'Imagine x = 3 and candidates 1 and 5: distances are both 2. Which one do you include?',
        'Compare |arr[left] − x| and |arr[right] − x|. When they\'re equal, the left element is smaller (array is sorted), and the tie-breaking rule says take it.',
      ],
    },
    {
      id: 'output-structure',
      question: 'The output must be in sorted order. Given that arr is already sorted, what does this mean for how you collect the result?',
      options: [
        { label: 'Sort all distances and map back to values', isCorrect: false, feedback: 'Sorting distances and mapping back requires extra work and loses the original order. Since arr is sorted and the answer is a contiguous subarray, the result is already in order — just slice it.' },
        { label: 'Return a contiguous slice of arr; no re-sorting needed', isCorrect: true },
        { label: 'Use a min-heap to extract elements in sorted order', isCorrect: false, feedback: 'A heap would produce sorted order, but it\'s unnecessary overhead. The k closest elements form a contiguous window in a sorted array — a slice already provides sorted output.' },
        { label: 'Collect in any order, then sort at the end', isCorrect: false, feedback: 'Sorting at the end works but wastes O(k log k) time. The k closest elements form a contiguous window in arr, so a direct slice produces sorted output for free.' },
      ],
      correctFeedback: 'The answer is always arr[left:left+k] for some index left. Find the right starting index and slice — the sorted property of arr guarantees the output is already in order.',
      wrongFeedback: [
        'The k closest elements are contiguous in a sorted array. What does that tell you about the shape of your result?',
        'Your result is arr[i:i+k] for some i. Find that i, then slice. No sorting step is needed because arr is already sorted.',
      ],
    },
  ],
}
