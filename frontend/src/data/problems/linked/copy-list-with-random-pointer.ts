export default {
  id: 'copy-list-with-random-pointer',
  title: 'Copy List with Random Pointer',
  difficulty: 'medium',
  description: `<p>A linked list of length <code>n</code> is given such that each node contains an additional random pointer, which could point to any node in the list, or <code>null</code>.</p><p>Construct a deep copy of the list and return the head. The deep copy should consist of exactly <code>n</code> new nodes, where each new node has its value set to the value of its corresponding original node. Both the <code>next</code> and <code>random</code> pointers of the new nodes should point to new nodes in the copied list.</p>`,
  examples: [
    { input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]', output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]' },
  ],
  constraints: ['0 <= n <= 1000', '-10^4 <= Node.val <= 10^4', 'Node.random is null or pointing to a node in the linked list'],
  starterCode: `class Node:
  def __init__(self, x, next=None, random=None):
      self.val = int(x)
      self.next = next
      self.random = random

class Solution:
    def copy_random_list(self, head):
        pass`,
  functionName: 'copy_random_list_run',
  conceptId: 'linked-list',
  runnerSetup: `def copy_random_list_run(pairs):
  if not pairs: return []
  nodes = [Node(p[0]) for p in pairs]
  for i, p in enumerate(pairs):
      if i + 1 < len(nodes): nodes[i].next = nodes[i+1]
      nodes[i].random = nodes[p[1]] if p[1] is not None else None
  result = Solution().copy_random_list(nodes[0])
  out = []
  while result:
      out.append(result.val)
      result = result.next
  return out`,
  testCases: [
    { label: '5 nodes', args: [[[7,null],[13,0],[11,4],[10,2],[1,0]]], expected: [7,13,11,10,1] },
    { label: 'single null', args: [[[1,null]]], expected: [1] },
  ],
  bruteHint: 'A brute-force approach first creates a copy of every node with its value, then for each node\'s random pointer, rescans the entire list from the head to find the matching original and points the copy\'s random at the corresponding copy. Locating one target this way takes O(n), and you repeat that scan for every one of the n nodes, so the whole thing costs O(n²) time. With n up to 1000, that\'s up to a million comparisons just to resolve pointers — what would let you find any node\'s copy in O(1) instead of rescanning?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'output-deep-copy',
      question: 'How the problem defines a correct output tells you what your solution actually has to preserve. The output must be a "deep copy" where both next and random pointers point to new nodes. This means…',
      highlight: { location: 'description', text: 'Both the <code>next</code> and <code>random</code> pointers of the new nodes should point to new nodes in the copied list.' },
      options: [
        { label: 'Return the original head unchanged', isCorrect: false, feedback: 'Returning the original head is a shallow reference — no new nodes are created at all. A deep copy requires n entirely new nodes whose pointers reference each other, not the originals.' },
        { label: 'Create n new nodes with matching structure', isCorrect: true },
        { label: 'Copy only the next pointers', isCorrect: false, feedback: 'Copying only next pointers leaves the random pointers pointing into the original list — that breaks the deep copy contract. Both pointer types must reference the new nodes.' },
        { label: 'Store the values only, without preserving pointer relationships', isCorrect: false, feedback: 'An array loses the linked structure entirely. The output is a linked list of new nodes, not a flat collection of values.' },
      ],
      correctFeedback: 'Every original node maps to exactly one new node. You need a way to locate the new copy of any original node — both when wiring next and when wiring random.',
      wrongFeedback: [
        'The problem says both next and random must point to new nodes. What does that imply about your ability to find the copy of any given original node?',
        'You need to map every original node to its copy. What structure gives you O(1) lookup of "given this original node, what is its copy?"',
      ],
    },
    {
      id: 'random-pointer-challenge',
      question: 'Recognizing when a simple approach breaks down tells you what technique the problem actually calls for. The random pointer "could point to any node in the list, or null." Why does this make a single linear pass insufficient?',
      highlight: { location: 'description', text: 'which could point to any node in the list, or <code>null</code>.' },
      options: [
        { label: 'Single pass is always sufficient', isCorrect: false, feedback: 'When you create a copy of node i, its random might point to node j that you haven\'t created yet. A single forward pass can\'t wire a pointer to a node that doesn\'t exist yet.' },
        { label: 'Random targets may not exist yet when you reach them', isCorrect: true },
        { label: 'You need sorted order to resolve random pointers', isCorrect: false, feedback: 'Sorting is irrelevant here — random pointers can point anywhere by index, not by value. The issue is creation order, not node order.' },
        { label: 'Null random pointers break iteration', isCorrect: false, feedback: 'Null random pointers are the easy case — you just assign None to the copy\'s random. The hard case is a non-null random pointing to a node you haven\'t copied yet.' },
      ],
      correctFeedback: 'Random can point backward or forward arbitrarily. You either need two passes (create all nodes, then wire randoms) or a map built on the fly so you can resolve any target on demand.',
      wrongFeedback: [
        'Imagine node 1\'s random points to node 5. When you\'re processing node 1, has node 5\'s copy been created yet?',
        'You need the copy of any original node to be findable at any time. What data structure built during traversal gives you that?',
      ],
    },
    {
      id: 'constraint-n-size',
      question: 'Constraints on input size set the efficiency bar your approach needs to clear. n ≤ 1000 tells you…',
      highlight: { location: 'constraint', text: '0 <= n <= 1000' },
      options: [
        { label: 'O(n²) space is acceptable', isCorrect: false, feedback: 'O(n²) space at n = 1000 means a million entries — that\'s wasteful and unnecessary. The constraint permits O(n) time and space without any tighter pressure.' },
        { label: 'O(n) time and space is the target', isCorrect: true },
        { label: 'A brute-force approach that rescans the list for every lookup is fine', isCorrect: false, feedback: 'Two pointers don\'t naturally apply to deep copying — the challenge is resolving arbitrary random targets, not traversal speed. n ≤ 1000 permits O(n) approaches, not O(n²) ones.' },
        { label: 'Input size does not affect the approach', isCorrect: false, feedback: 'Input size always shapes the acceptable complexity. n ≤ 1000 means a hash-map-based O(n) solution is clearly fine, but it also rules out anything quadratic like repeatedly scanning the list to find random targets.' },
      ],
      correctFeedback: 'With n ≤ 1000, O(n) time and O(n) space (a hash map from original nodes to copies) is the natural fit. An O(n²) scan-for-each-random would also pass at this size, but O(n) is cleaner.',
      wrongFeedback: [
        'What happens to an algorithm that scans the whole list to find the copy of each random target, for every node?',
        'That\'s O(n²) in the worst case — 1,000,000 operations at n = 1000. The constraint permits O(n), which a hash map provides.',
      ],
    },
    {
      id: 'node-identity-vs-value',
      question: 'What you need to look up while traversing determines which structure actually fits. The problem says random pointers should point to new nodes "in the copied list." This means you must track…',
      highlight: { location: 'description', text: 'in the copied list' },
      options: [
        { label: 'Node values only', isCorrect: false, feedback: 'Values alone are ambiguous — multiple nodes can share the same value. You need to track node identity (the object itself) to correctly resolve which copy corresponds to which original.' },
        { label: 'Original node identity → copy node', isCorrect: true },
        { label: 'Node indices in sorted order', isCorrect: false, feedback: 'Sorting by value destroys structural relationships. The random pointer refers to a specific node object, not a value rank — you need to map the original object to its copy.' },
        { label: 'The count of null random pointers', isCorrect: false, feedback: 'Counting nulls doesn\'t help you wire the non-null random pointers to the correct copies. You need a map from each original node to its corresponding new node.' },
      ],
      correctFeedback: 'A hash map keyed on the original node object — not its value — gives you O(1) lookup of any original\'s copy. This is the standard approach for deep-copying graphs and lists with arbitrary cross-references.',
      wrongFeedback: [
        'Two nodes can have the same value. If you only track values, how do you know which copy a random pointer is targeting?',
        'You need to distinguish nodes by identity, not value. What maps object identity to another object in O(1)?',
      ],
    },
  ],
  solutionCode: `class Solution:
    def copy_random_list(self, head):
        if not head:
            return None
        old_to_new = {}
        node = head
        while node:
            old_to_new[node] = Node(node.val)
            node = node.next
        node = head
        while node:
            old_to_new[node].next = old_to_new.get(node.next)
            old_to_new[node].random = old_to_new.get(node.random)
            node = node.next
        return old_to_new[head]`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'The map is keyed by the *original node object itself*, not by value — since two different nodes can share a value, only object identity reliably distinguishes "which specific node does this random pointer target."',
  solutionExplanation: 'Splitting the work into two passes solves the chicken-and-egg problem of wiring pointers to copies that might not exist yet: the first pass creates every copy up front (with no pointers set) while recording old-node → new-node in a hash map, and the second pass revisits each original node to look up where its <code>next</code> and <code>random</code> targets\' *copies* live, using <code>.get()</code> so a <code>None</code> target maps cleanly to <code>None</code>. By the second pass, every copy a pointer could possibly need already exists in the map.',
}
