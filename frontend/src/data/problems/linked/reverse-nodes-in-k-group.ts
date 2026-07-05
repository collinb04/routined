export default {
  id: 'reverse-nodes-in-k-group',
  title: 'Reverse Nodes in K-Group',
  difficulty: 'hard',
  description: `<p>Given the head of a linked list, reverse the nodes of the list <code>k</code> at a time, and return the modified list. If the number of nodes is not a multiple of <code>k</code>, leave the remaining nodes as is.</p><p>You may not alter the values in the list's nodes, only nodes themselves may be changed.</p>`,
  examples: [
    { input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]' },
    { input: 'head = [1,2,3,4,5], k = 3', output: '[3,2,1,4,5]' },
  ],
  constraints: ['The number of nodes is n', '1 <= k <= n <= 5000', '0 <= Node.val <= 1000'],
  starterCode: `class ListNode:
  def __init__(self, val=0, next=None):
      self.val = val
      self.next = next

def reverse_k_group(head, k):
  pass`,
  functionName: 'reverse_k_group_run',
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
def reverse_k_group_run(arr, k):
  return _tol(reverse_k_group(_ton(arr), k))`,
  testCases: [
    { label: 'k=2', args: [[1,2,3,4,5], 2], expected: [2,1,4,3,5] },
    { label: 'k=3', args: [[1,2,3,4,5], 3], expected: [3,2,1,4,5] },
  ],
  clues: [
    {
      id: 'remainder-unchanged',
      question: '"If the number of nodes is not a multiple of k, leave the remaining nodes as is." For [1,2,3,4,5] with k = 2, the 5th node stays in place. This means…',
      options: [
        { label: 'Always reverse the last group even if it\'s smaller than k', isCorrect: false, feedback: 'The problem explicitly says leave remainder nodes unchanged. For k = 2 on [1,2,3,4,5], the last node (5) stays — it is not reversed. Reversing a partial group violates the spec.' },
        { label: 'Count k nodes ahead before reversing each group', isCorrect: true },
        { label: 'Pad the last group with null nodes to fill k slots', isCorrect: false, feedback: 'No padding is needed or allowed — the spec says leave remainder nodes unchanged. Padding would add or modify nodes, which violates the constraint that only pointers may be changed.' },
        { label: 'Reverse groups until fewer than k nodes remain, then recurse', isCorrect: false, feedback: 'Recursing on the remainder would reverse it if it happens to be exactly k, but you\'d still need the same "count k ahead" check to know when to stop. Counting first is the general solution.' },
      ],
      correctFeedback: 'Before reversing each group, verify that k nodes exist starting from the current head. If fewer than k remain, leave them untouched. This check prevents partial reversal of the tail.',
      wrongFeedback: [
        'How do you know whether the current group has exactly k nodes or fewer before reversing it?',
        'Walk forward k steps and check if you reach null before completing k steps. If you do, leave the remaining nodes as-is. If not, you have a full group to reverse.',
      ],
    },
    {
      id: 'group-connection-challenge',
      question: 'After reversing a k-group, you must connect its tail to the start of the next group. The tail of the reversed group was originally the head of that group. This means you need to track…',
      options: [
        { label: 'Only the new head of each reversed group', isCorrect: false, feedback: 'Knowing only the new head of the reversed group isn\'t enough — you also need the tail of the reversed group to wire it to the next group\'s output. The original group head becomes the tail after reversal.' },
        { label: 'Both the new head and the tail of each reversed group', isCorrect: true },
        { label: 'The total number of groups to reverse', isCorrect: false, feedback: 'You don\'t need to know the total number of groups in advance — you process them one at a time, stopping when fewer than k nodes remain. The group count is not a required input.' },
        { label: 'Only the predecessor of each group\'s start', isCorrect: false, feedback: 'The predecessor is needed to attach the reversed group\'s new head. But you also need the reversed group\'s tail to attach it to the next group. Both ends of each group must be tracked.' },
      ],
      correctFeedback: 'When reversing a group [A → B → C] with k = 3, the reversal produces [C → B → A]. C is the new head, A is the new tail. The predecessor must point to C, and A.next must point to the next group\'s output head.',
      wrongFeedback: [
        'After reversing group [1,2] to [2,1], node 1 is now the tail. What must node 1\'s next pointer be set to?',
        'The start of the next group (node 3, or whatever the next group\'s reversed head is). You need to know node 1 is the tail to wire that connection — which means tracking it during the reversal.',
      ],
    },
    {
      id: 'no-value-modification',
      question: '"You may not alter the values in the list\'s nodes, only nodes themselves may be changed." This constraint rules out…',
      options: [
        { label: 'Collecting k values into an array and writing them back reversed', isCorrect: true },
        { label: 'Redirecting next pointers within the group', isCorrect: false, feedback: 'Redirecting next pointers is exactly what the constraint requires — move the nodes, not the values. Pointer manipulation is the intended approach.' },
        { label: 'Using a dummy head node', isCorrect: false, feedback: 'A dummy sentinel head is a standard technique for simplifying edge cases. It\'s an extra node with no value written to the list — it doesn\'t modify any existing node\'s value.' },
        { label: 'Reversing pointers within a group of k nodes', isCorrect: false, feedback: 'Reversing pointers within the group is the intended operation. The constraint only forbids changing node.val — rewiring node.next is the whole point.' },
      ],
      correctFeedback: 'Swapping values between nodes is the easy shortcut — collect k values, write them back in reverse. The constraint forbids this, forcing you to physically rewire the node pointers to achieve the reversal.',
      wrongFeedback: [
        'If you collected the values [1, 2] and wrote them back as [2, 1] into the same nodes, would you be modifying node values?',
        'Yes — that writes new values to the nodes. The constraint says don\'t do that. You must reverse the order of the node objects themselves by rewiring their next pointers.',
      ],
    },
    {
      id: 'k-equals-1-or-n',
      question: 'k can equal 1 (no reversal) or n (reverse the entire list). What do these edge cases tell you about your algorithm\'s generality?',
      options: [
        { label: 'Handle k = 1 and k = n as special cases', isCorrect: false, feedback: 'A general algorithm handles both automatically: k = 1 means each "group" is one node — reversing a single node gives itself. k = n means one group covers the whole list. No special casing needed.' },
        { label: 'The algorithm must work for any k without special-casing', isCorrect: true },
        { label: 'k = 1 should short-circuit and return head immediately', isCorrect: false, feedback: 'Short-circuiting for k = 1 is a valid optimization but not necessary for correctness. A general reversal of one node leaves it unchanged — the output is the same as the input.' },
        { label: 'k = n means the remainder rule never applies', isCorrect: false, feedback: 'When k = n and n is divisible by k, the remainder is zero — true. But k = n with a list that has been extended isn\'t guaranteed; more importantly, the algorithm should handle all k from 1 to n without needing to inspect specific values of k.' },
      ],
      correctFeedback: 'A robust implementation doesn\'t branch on k. The "count k ahead, then reverse, then connect" loop handles k = 1 (one-node groups, no change) and k = n (one full-list group, complete reversal) identically.',
      wrongFeedback: [
        'For k = 1, what does "reversing a group of 1 node" produce?',
        'The same single node — reversal of length 1 is a no-op. Your general loop should produce the correct output for k = 1 without any special case, confirming the algorithm is truly general.',
      ],
    },
  ],
}
