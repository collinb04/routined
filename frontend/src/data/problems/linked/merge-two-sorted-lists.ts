export default {
  id: 'merge-two-sorted-lists',
  title: 'Merge Two Sorted Lists',
  difficulty: 'easy',
  description: `<p>You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>. Merge the two lists into one sorted list and return the head of the merged linked list.</p>`,
  examples: [
    { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
    { input: 'list1 = [], list2 = []', output: '[]' },
  ],
  constraints: ['The number of nodes in both lists is in [0, 50]', '-100 <= Node.val <= 100'],
  starterCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

class Solution:
    def merge_two_lists(self, list1, list2):
        pass`,
  functionName: 'merge_two_lists_run',
  conceptId: 'linked-list',
  runnerSetup: `def _tol(h):
  r=[]
  while h: r.append(h.val); h=h.next
  return r
def _ton(a):
  if not a: return None
  h=ListNode(a[0]); c=h
  for v in a[1:]: c.next=ListNode(v); c=c.next
  return h
def merge_two_lists_run(l1, l2):
  return _tol(Solution().merge_two_lists(_ton(l1), _ton(l2)))`,
  testCases: [
    { label: '[1,2,4]+[1,3,4]', args: [[1,2,4],[1,3,4]], expected: [1,1,2,3,4,4] },
    { label: 'both empty', args: [[],[]], expected: [] },
    { label: 'one empty', args: [[], [0]], expected: [0] },
  ],
  bruteHint: 'One approach walks both lists, collects every value into a single array, sorts that array with a general-purpose sort, and builds a brand-new linked list from the sorted values. That costs O((n + m) log(n + m)) for the sort alone, plus extra space for the array and freshly allocated nodes. Since both input lists are already individually sorted, is a full sort really necessary to produce a sorted result?',
  optimizeComplexity: { time: 'O(n + m)', space: 'O(1)' },
  clues: [
    {
      id: 'sorted-lists-signal',
      question: 'Recognizing that both inputs are already ordered tells you which elements can possibly be next in the output. Both lists are already sorted. This means…',
      highlight: { location: 'description', text: 'two sorted linked lists' },
      options: [
        { label: 'Collect all values then sort them', isCorrect: false, feedback: 'Collecting all values and sorting ignores the existing order — that\'s O(n log n) when you could merge in O(n). The sorted property means you never need to look past the current front of each list.' },
        { label: 'The next output node is always the smaller of the two heads', isCorrect: true },
        { label: 'Append one list to the other and sort', isCorrect: false, feedback: 'Appending and sorting discards the sorted structure entirely. Because both lists are sorted, a linear merge compares only current front nodes — no re-sorting needed.' },
        { label: 'Sort order must be verified before each comparison', isCorrect: false, feedback: 'The lists are guaranteed sorted — you can trust that each head is the minimum of its list without checking. The sorted guarantee is what makes the greedy comparison safe.' },
      ],
      correctFeedback: 'Because each list is sorted, its head is its smallest remaining element. The globally smallest unplaced value is always one of the two current heads — compare them and advance the winner.',
      wrongFeedback: [
        'If list1 = [1,2,4] and list2 = [1,3,4], which values could possibly be the next in the merged output?',
        'Only the front of each list matters — everything behind it is larger. Comparing the two heads and taking the smaller one produces a sorted output in one pass.',
      ],
    },
    {
      id: 'empty-list-input',
      question: 'Boundary values in the constraints reveal which edge cases your solution must handle explicitly. The number of nodes in each list is in [0, 50] — either list can be empty. This means…',
      highlight: { location: 'constraint', text: 'The number of nodes in both lists is in [0, 50]' },
      options: [
        { label: 'Empty input is an error; both lists always have nodes', isCorrect: false, feedback: 'The constraint explicitly allows 0 nodes. Assuming non-empty lists would crash on the [[], []] test case — your code must handle null heads gracefully.' },
        { label: 'When one list is exhausted, return the other\'s remaining nodes', isCorrect: true },
        { label: 'Return null whenever either list is empty', isCorrect: false, feedback: 'If list1 is empty and list2 = [0], the correct output is [0] — not null. The remaining non-empty list is already sorted and can be directly attached to the result.' },
        { label: 'Pad the shorter list with sentinel values', isCorrect: false, feedback: 'No padding is needed. When one pointer goes null, the other list\'s remaining nodes are already in sorted order and can be appended directly.' },
      ],
      correctFeedback: 'When one pointer reaches null, the other list\'s remaining nodes are already sorted. Attach them directly — no node-by-node processing needed.',
      wrongFeedback: [
        'If list1 runs out first but list2 still has nodes, what should the merged output contain after that point?',
        'Everything remaining in list2 is already sorted and greater than everything placed so far. You can attach it as-is.',
      ],
    },
    {
      id: 'output-structure',
      question: 'What the return type actually is constrains how you\'re allowed to build the answer. The output is the head of a merged linked list. This means you need to…',
      highlight: { location: 'description', text: 'return the head of the merged linked list' },
      options: [
        { label: 'Return an array of values', isCorrect: false, feedback: 'The output is a ListNode, not an array. You need to wire next pointers between nodes — collecting into an array and then rebuilding wastes an extra pass.' },
        { label: 'Wire existing nodes together by adjusting next pointers', isCorrect: true },
        { label: 'Allocate new nodes for each merged value', isCorrect: false, feedback: 'You don\'t need new nodes — the existing nodes can be reused by redirecting their next pointers. Allocating fresh nodes wastes memory and time.' },
        { label: 'Return the longer of the two input lists', isCorrect: false, feedback: 'The merged list interleaves nodes from both lists. You can\'t return either input list unmodified — the next pointers need to be rewired to reflect sorted merge order.' },
      ],
      correctFeedback: 'Merge in place: at each step, point the current tail\'s next at the smaller head, then advance. A dummy head node simplifies handling the first node without a special case.',
      wrongFeedback: [
        'You\'re selecting existing nodes from list1 and list2. Do you need to create any new nodes, or just redirect pointers?',
        'Redirect next pointers — no allocation needed. A dummy head lets you treat the first node identically to all subsequent ones.',
      ],
    },
    {
      id: 'constraint-small-size',
      question: 'Small numeric bounds tell you that correctness and clarity matter more here than shaving complexity. Up to 50 nodes per list, values in [-100, 100]. This tells you…',
      options: [
        { label: 'O(n²) comparison is necessary for safety', isCorrect: false, feedback: 'With at most 100 total nodes, even O(n²) finishes instantly. But the sorted property makes O(n) straightforward — there\'s no reason to do extra comparisons.' },
        { label: 'O(n) merge with at most 100 total comparisons is sufficient', isCorrect: true },
        { label: 'Values can be negative, so a special comparison is needed', isCorrect: false, feedback: 'Python\'s < operator handles negative integers correctly. Negative values require no special handling — the comparison logic is identical regardless of sign.' },
        { label: 'The small size means a sort-based approach is best', isCorrect: false, feedback: 'A sort-based approach is O(n log n) — worse than linear merge for already-sorted lists. Small size makes both feasible, but the sorted property enables O(n), which is strictly better.' },
      ],
      correctFeedback: 'At most 100 total nodes, so even a naive approach works here. The linear merge is the natural fit: each comparison advances one pointer, completing in at most 100 steps.',
      wrongFeedback: [
        'Two lists of at most 50 nodes each give at most 100 total nodes. How many comparisons does a single-pass merge need in the worst case?',
        'At most 100 comparisons — one per node placed. No complexity concern at this scale; the merge pattern is the key takeaway.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def merge_two_lists(self, list1, list2):
        dummy = ListNode()
        curr = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                curr.next = list1
                list1 = list1.next
            else:
                curr.next = list2
                list2 = list2.next
            curr = curr.next
        curr.next = list1 if list1 else list2
        return dummy.next`,
  solutionComplexity: { time: 'O(m + n)', space: 'O(1)' },
  solutionCaveat: 'Existing nodes are relinked directly (<code>curr.next = list1</code>) rather than copied into new ones — this reuses the two input lists\' own nodes for the output, which is both simpler and avoids any unnecessary allocation.',
  solutionExplanation: 'Since both lists are already sorted, the smaller of the two current front nodes is always the correct next node in the merged result — repeatedly picking it and advancing that list\'s pointer builds the merge in one pass. Once one list runs out, everything remaining in the other is already sorted relative to what has been merged so far, so it can be attached wholesale instead of being walked node by node.',
}
