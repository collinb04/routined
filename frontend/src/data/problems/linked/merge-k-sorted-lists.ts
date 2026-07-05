export default {
  id: 'merge-k-sorted-lists',
  title: 'Merge K Sorted Lists',
  difficulty: 'hard',
  description: `<p>You are given an array of <code>k</code> linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.</p>`,
  examples: [
    { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
    { input: 'lists = []', output: '[]' },
  ],
  constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500', '-10^4 <= lists[i][j] <= 10^4'],
  starterCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

def merge_k_lists(lists):
  pass`,
  functionName: 'merge_k_lists_run',
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
def merge_k_lists_run(arrs):
  return _tol(merge_k_lists([_ton(a) for a in arrs]))`,
  testCases: [
    { label: '3 lists', args: [[[1,4,5],[1,3,4],[2,6]]], expected: [1,1,2,3,4,4,5,6] },
    { label: 'empty', args: [[]], expected: [] },
  ],
  clues: [
    {
      id: 'constraint-total-nodes',
      question: 'k ≤ 10^4 lists, each with up to 500 nodes, means up to 5 × 10^6 total nodes. Comparing every node to every other is…',
      options: [
        { label: 'Fine — 5 million nodes is small', isCorrect: false, feedback: 'Comparing all pairs of 5 million nodes is O(N²) — up to 25 × 10^12 comparisons. That\'s not feasible. The total node count tells you that you need O(N log k) or better.' },
        { label: 'O(N²) — too slow by a factor of millions', isCorrect: true },
        { label: 'Acceptable if you sort only adjacent lists', isCorrect: false, feedback: 'Merging adjacent pairs is actually the right direction (divide and conquer), but the point here is that naive all-pairs comparison is O(N²) — the constraint rules out brute-force approaches.' },
        { label: 'Unavoidable since lists are unsorted relative to each other', isCorrect: false, feedback: 'The lists are individually sorted, which is a strong signal. You don\'t need to compare all pairs — you only need to find the minimum among k current heads, which is O(k) or O(log k) per step.' },
      ],
      correctFeedback: 'N = 5 × 10^6 nodes. O(N²) is 25 × 10^12 operations — millions of times too slow. The constraint pushes you toward O(N log k): extract the minimum from k heads efficiently using a heap.',
      wrongFeedback: [
        'N = 5 × 10^6. If comparing every node to every other is O(N²), how many comparisons is that?',
        '25 trillion comparisons is clearly infeasible. You need O(log k) per node extraction, not O(k) scanning, which means a min-heap over the k list heads.',
      ],
    },
    {
      id: 'sorted-lists-signal',
      question: 'Each list is "sorted in ascending order." This means…',
      options: [
        { label: 'You must re-sort the merged list at the end', isCorrect: false, feedback: 'Re-sorting at the end ignores the fact that all lists are already sorted. You can produce a sorted output by always picking the smallest current head — no post-processing sort needed.' },
        { label: 'The next candidate for the output is always one of the k current heads', isCorrect: true },
        { label: 'Sorting is irrelevant since you\'re merging, not sorting', isCorrect: false, feedback: 'The sorted order is the key insight. Because each list is sorted, the global minimum at any step must be one of the k front elements — you never need to look deeper into any list.' },
        { label: 'You can merge any two lists in O(1)', isCorrect: false, feedback: 'Merging two sorted lists takes O(m + n) time proportional to their combined length, not O(1). The sorted property eliminates the need to search inside lists, but merging still costs linear time.' },
      ],
      correctFeedback: 'Because each list is sorted, its head is its smallest element. The global minimum across all lists must be one of the k heads. You only ever need to compare k values — never the interior of any list.',
      wrongFeedback: [
        'If each list is sorted, where is the smallest element of each list?',
        'At the front. So the globally smallest unplaced element is always one of the k front nodes. You need an efficient way to find the minimum among those k values repeatedly.',
      ],
    },
    {
      id: 'k-heads-efficiency',
      question: 'At each step you pick the minimum of up to k = 10^4 current heads. Scanning all k heads linearly costs O(k) per step. With N total nodes, that is…',
      options: [
        { label: 'O(N) total — acceptable', isCorrect: false, feedback: 'Each of the N steps costs O(k) for a linear scan, making the total O(N × k). With N = 5 × 10^6 and k = 10^4, that\'s 5 × 10^10 operations — not O(N).' },
        { label: 'O(N × k) — potentially 5 × 10^10 operations', isCorrect: true },
        { label: 'O(k log N) — because lists are sorted', isCorrect: false, feedback: 'O(k log N) would be great, but it\'s not what a linear scan gives you. A linear scan over k heads per step is O(N × k). To get O(N log k), you need a min-heap of size k.' },
        { label: 'O(N log N) — same as sorting from scratch', isCorrect: false, feedback: 'Sorting from scratch ignores the pre-sorted structure and costs O(N log N). A min-heap over k heads costs O(N log k), which is better when k < N — which it is here since k ≤ 10^4 and N ≤ 5 × 10^6.' },
      ],
      correctFeedback: 'O(N × k) = 5 × 10^6 × 10^4 = 5 × 10^10 operations — too slow. A min-heap of size k reduces each extraction to O(log k), giving O(N log k) total: about 5 × 10^6 × 13 ≈ 65 million operations.',
      wrongFeedback: [
        'N steps × O(k) per step = O(N × k). With N = 5 × 10^6 and k = 10^4, is that feasible?',
        '5 × 10^10 is too slow. You need O(log k) per extraction instead of O(k). What data structure gives you the minimum of k elements in O(log k)?',
      ],
    },
    {
      id: 'empty-list-guarantee',
      question: 'k can be 0 and lists[i] can be empty. This means…',
      options: [
        { label: 'An empty input is an error condition', isCorrect: false, feedback: 'The constraints explicitly allow k = 0 (empty lists array) and empty individual lists. These are valid inputs, not errors — your code must handle them without crashing.' },
        { label: 'You must handle empty lists without crashing', isCorrect: true },
        { label: 'You can skip null-checking inside the heap', isCorrect: false, feedback: 'When a list is exhausted, its head becomes null. Pushing null into your heap or trying to access null.val would crash. You must check before pushing each next pointer.' },
        { label: 'Empty lists can be removed in preprocessing', isCorrect: false, feedback: 'While filtering empty lists upfront is valid, the signal here is that your algorithm must not assume every list has at least one node. Runtime null checks are still needed as lists become exhausted.' },
      ],
      correctFeedback: 'Both k = 0 and empty individual lists are valid. Your heap initialization must skip null heads, and after extracting a node you must check that node.next is non-null before pushing it back.',
      wrongFeedback: [
        'If k = 0, what happens when your code tries to initialize a heap from an empty list?',
        'An empty lists array means nothing to merge — return None immediately. And when iterating, skip any list whose head is already null before adding to the heap.',
      ],
    },
  ],
}
