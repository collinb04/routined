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
  starterCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

class Solution:
    def sort_list(self, head):
        pass`,
  functionName: 'sort_list_run',
  runnerSetup: `def _tol(h):
  r=[]
  while h: r.append(h.val); h=h.next
  return r
def _ton(a):
  if not a: return None
  h=ListNode(a[0]); c=h
  for v in a[1:]: c.next=ListNode(v); c=c.next
  return h
def sort_list_run(a):
  return _tol(Solution().sort_list(_ton(a)))`,
  conceptId: 'linked-list',
  testCases: [
    { label: 'Four nodes', args: [[4,2,1,3]], expected: [1,2,3,4] },
    { label: 'With negatives', args: [[-1,5,3,4,0]], expected: [-1,0,3,4,5] },
    { label: 'Empty', args: [[]], expected: [] },
    { label: 'Already sorted', args: [[1,2,3]], expected: [1,2,3] },
  ],
  bruteHint: 'A brute-force approach is to copy every node\'s value into an array, sort the array with any standard method — even a simple O(n²) sort like insertion sort — and then rebuild the list in that order. This is easy to get right but uses O(n) extra space for the array, working against the O(1) space goal. What would it take to sort the nodes in place, without copying every value out?',
  optimizeComplexity: { time: 'O(n log n)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-complexity',
      question: 'Input-size limits paired with a target time complexity tell you which algorithm classes are even in play. n ≤ 5 × 10⁴ and the problem asks for O(n log n) time. What does that rule out?',
      highlight: { location: 'constraint', text: '0 ≤ list length ≤ 5 × 10⁴' },
      options: [
        { label: 'Simple sorts that repeatedly compare and swap neighboring elements, taking O(n²) time', isCorrect: true },
        { label: 'O(n log n) is not achievable on a linked list', isCorrect: false, feedback: 'O(n log n) is achievable on a linked list — merge sort works naturally because merging two sorted lists only requires pointer rewiring, not index-based access.' },
        { label: 'O(n log n) requires converting to an array first', isCorrect: false, feedback: 'Converting to an array costs O(n) extra space, which violates the O(1) space goal. Merge sort can be implemented bottom-up on the list itself.' },
        { label: 'Only a divide-by-pivot partitioning approach reaches O(n log n) on a linked list', isCorrect: false, feedback: 'Quicksort on a linked list has O(n²) worst case and requires a good pivot strategy. Merge sort is the natural choice — splitting and merging linked lists is straightforward.' },
      ],
      correctFeedback: 'At n = 50,000, O(n²) is 2.5 billion operations — too slow. The O(n log n) hint points directly to merge sort, which splits the list in half and merges sorted halves.',
      wrongFeedback: [
        'At n = 50,000, how many operations does O(n²) require? Is that acceptable?',
        'Which standard sorting algorithms run in O(n log n)? Which of those works naturally without random access?',
      ],
    },
    {
      id: 'no-random-access',
      question: 'The specific capabilities a data structure lacks force you to adapt standard techniques to fit it. A linked list has no random access — you cannot jump to the middle by index. How do you split it in half for merge sort?',
      options: [
        { label: 'Count nodes first, then walk to n/2', isCorrect: false, feedback: 'Counting then walking works but requires two passes. The fast/slow pointer technique finds the midpoint in a single pass, which is cleaner and equally correct.' },
        { label: 'Two pointers moving at different speeds meet at the midpoint in a single pass', isCorrect: true },
        { label: 'Split on value: smaller values left, larger right', isCorrect: false, feedback: 'Splitting by value is a partition step — that\'s quicksort logic, not merge sort. Merge sort splits by position (first half / second half), then merges in sorted order.' },
        { label: 'Copy every node into an auxiliary structure to reverse it, then split by index', isCorrect: false, feedback: 'A stack would use O(n) space and adds unnecessary complexity. The fast/slow pointer finds the midpoint without any extra data structure.' },
      ],
      correctFeedback: 'Slow pointer advances one step, fast pointer advances two. When fast reaches the end, slow is at the midpoint. Disconnect there to produce two sublists.',
      wrongFeedback: [
        'You need to find the midpoint without using an index. Which classic two-pointer technique gives you that?',
        'Think about pointers moving at different speeds through the list. When one reaches the end, where is the other?',
      ],
    },
    {
      id: 'o1-space',
      question: 'Extra requirements like a space bound rule out approaches that would otherwise be the easiest to implement. The problem asks for O(1) extra space. Recursive merge sort uses O(log n) call stack space. What approach avoids that?',
      highlight: { location: 'description', text: 'O(n log n) time and O(1) space using merge sort.' },
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
  solutionCode: `class Solution:
    def sort_list(self, head):
        if not head or not head.next:
            return head

        def get_length(node):
            length = 0
            while node:
                length += 1
                node = node.next
            return length

        def split(node, n):
            for _ in range(n - 1):
                if not node:
                    break
                node = node.next
            if not node:
                return None
            second = node.next
            node.next = None
            return second

        def merge(l1, l2, tail):
            while l1 and l2:
                if l1.val <= l2.val:
                    tail.next = l1
                    l1 = l1.next
                else:
                    tail.next = l2
                    l2 = l2.next
                tail = tail.next
            tail.next = l1 if l1 else l2
            while tail.next:
                tail = tail.next
            return tail

        length = get_length(head)
        dummy = ListNode(0, head)
        size = 1
        while size < length:
            prev = dummy
            curr = dummy.next
            while curr:
                left = curr
                right = split(left, size)
                curr = split(right, size)
                prev = merge(left, right, prev)
            size *= 2
        return dummy.next`,
  solutionComplexity: { time: 'O(n log n)', space: 'O(1)' },
  solutionCaveat: 'Recursive merge sort also reaches O(n log n) time, but its call stack costs O(log n) space — genuinely reaching O(1) space requires this bottom-up iterative structure instead, merging runs of size 1, then 2, then 4, doubling each pass rather than splitting recursively down to single nodes first.',
  solutionExplanation: 'Merging is naturally bottom-up: two sorted runs of length 1 combine into a sorted run of length 2, two of those combine into length 4, and so on, doubling the sorted run size every pass until it covers the whole list — this is exactly merge sort, just built upward instead of recursing downward first. Each pass only needs a handful of pointers (to split off and merge fixed-size chunks) rather than a call stack tracking pending recursive splits, which is what makes the space cost O(1) instead of O(log n).',
}
