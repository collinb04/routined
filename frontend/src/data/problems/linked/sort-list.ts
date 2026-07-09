export default {
  id: 'sort-list',
  title: 'Sort List',
  difficulty: 'medium',
  description: 'Given the head of a linked list, return the list sorted in ascending order. Try to achieve O(n log n) time and O(1) space using merge sort.',
  examples: [
    { input: 'head = [4,2,1,3]', output: '[1,2,3,4]' },
    { input: 'head = [-1,5,3,4,0]', output: '[-1,0,3,4,5]' },
  ],
  constraints: ['0 ≤ list length ≤ 5 × 10⁴', '-10⁵ ≤ Node.val ≤ 10⁵'],
  starterCode: `def sort_list(head):
  pass`,
  functionName: 'sort_list',
  conceptId: 'linked-list',
  testCases: [
    { label: 'Four nodes', args: [[4,2,1,3]], expected: [1,2,3,4] },
    { label: 'With negatives', args: [[-1,5,3,4,0]], expected: [-1,0,3,4,5] },
    { label: 'Empty', args: [[]], expected: [] },
    { label: 'Already sorted', args: [[1,2,3]], expected: [1,2,3] },
  ],
  bruteHint: 'Describe using an O(n²) sort like insertion sort, or copying values into an array to sort',
  optimizeHint: 'Name the divide-and-conquer sort that splits the list at its midpoint and merges sorted halves',
  clues: [
    {
      id: 'constraint-complexity',
      question: 'n ≤ 5 × 10⁴ and the problem asks for O(n log n) time. What does that rule out?',
      options: [
        { label: 'O(n²) sorts like bubble or insertion sort', isCorrect: true },
        { label: 'O(n log n) is not achievable on a linked list', isCorrect: false, feedback: 'O(n log n) is achievable on a linked list — merge sort works naturally because merging two sorted lists only requires pointer rewiring, not index-based access.' },
        { label: 'O(n log n) requires converting to an array first', isCorrect: false, feedback: 'Converting to an array costs O(n) extra space, which violates the O(1) space goal. Merge sort can be implemented bottom-up on the list itself.' },
        { label: 'Only quicksort reaches O(n log n) on a linked list', isCorrect: false, feedback: 'Quicksort on a linked list has O(n²) worst case and requires a good pivot strategy. Merge sort is the natural choice — splitting and merging linked lists is straightforward.' },
      ],
      correctFeedback: 'At n = 50,000, O(n²) is 2.5 billion operations — too slow. The O(n log n) hint points directly to merge sort, which splits the list in half and merges sorted halves.',
      wrongFeedback: [
        'At n = 50,000, how many operations does O(n²) require? Is that acceptable?',
        'Which standard sorting algorithms run in O(n log n)? Which of those works naturally without random access?',
      ],
    },
    {
      id: 'no-random-access',
      question: 'A linked list has no random access — you cannot jump to the middle by index. How do you split it in half for merge sort?',
      options: [
        { label: 'Count nodes first, then walk to n/2', isCorrect: false, feedback: 'Counting then walking works but requires two passes. The fast/slow pointer technique finds the midpoint in a single pass, which is cleaner and equally correct.' },
        { label: 'Fast/slow pointer finds the midpoint in one pass', isCorrect: true },
        { label: 'Split on value: smaller values left, larger right', isCorrect: false, feedback: 'Splitting by value is a partition step — that\'s quicksort logic, not merge sort. Merge sort splits by position (first half / second half), then merges in sorted order.' },
        { label: 'Use a stack to reverse, then split by index', isCorrect: false, feedback: 'A stack would use O(n) space and adds unnecessary complexity. The fast/slow pointer finds the midpoint without any extra data structure.' },
      ],
      correctFeedback: 'Slow pointer advances one step, fast pointer advances two. When fast reaches the end, slow is at the midpoint. Disconnect there to produce two sublists.',
      wrongFeedback: [
        'You need to find the midpoint without using an index. Which classic two-pointer technique gives you that?',
        'Think about pointers moving at different speeds through the list. When one reaches the end, where is the other?',
      ],
    },
    {
      id: 'o1-space',
      question: 'The problem asks for O(1) extra space. Recursive merge sort uses O(log n) call stack space. What approach avoids that?',
      options: [
        { label: 'Bottom-up merge sort with doubling sublist size', isCorrect: true },
        { label: 'Recursion is O(1) space because the list is in-place', isCorrect: false, feedback: 'Recursion uses call-stack frames — each recursive call adds a frame. With O(log n) levels of recursion, that\'s O(log n) stack space, not O(1).' },
        { label: 'Quicksort with random pivot achieves O(1) space', isCorrect: false, feedback: 'Quicksort also uses O(log n) stack space for recursion, and O(n) in the worst case. It doesn\'t satisfy the O(1) space requirement.' },
        { label: 'Collect values, sort with Python\'s sort(), rewrite nodes', isCorrect: false, feedback: 'Python\'s sort() on a list of values uses O(n) space. The problem\'s O(1) goal means not allocating proportional to n — only a constant number of extra pointers.' },
      ],
      correctFeedback: 'Bottom-up merge sort merges sublists of size 1, then 2, then 4, etc. in iterative passes over the list. No recursion — only a constant number of pointer variables at any time.',
      wrongFeedback: [
        'Recursive merge sort depth is O(log n). How do you eliminate that stack overhead?',
        'Instead of splitting recursively, what if you started by merging pairs of single nodes, then pairs of length-2 lists, doubling each pass?',
      ],
    },
  ],
}
