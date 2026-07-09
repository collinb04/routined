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

def copy_random_list(head):
  pass`,
  functionName: 'copy_random_list_run',
  conceptId: 'linked-list',
  runnerSetup: `def copy_random_list_run(pairs):
  if not pairs: return []
  nodes = [Node(p[0]) for p in pairs]
  for i, p in enumerate(pairs):
      if i + 1 < len(nodes): nodes[i].next = nodes[i+1]
      nodes[i].random = nodes[p[1]] if p[1] is not None else None
  result = copy_random_list(nodes[0])
  out = []
  while result:
      out.append(result.val)
      result = result.next
  return out`,
  testCases: [
    { label: '5 nodes', args: [[[7,null],[13,0],[11,4],[10,2],[1,0]]], expected: [7,13,11,10,1] },
    { label: 'single null', args: [[[1,null]]], expected: [1] },
  ],
  bruteHint: 'Describe scanning the list to locate each random pointer\'s target node, and the O(n²) that costs across all nodes',
  optimizeHint: 'Name the data structure that maps each original node to its copy for O(1) lookup',
  clues: [
    {
      id: 'output-deep-copy',
      question: 'The output must be a "deep copy" where both next and random pointers point to new nodes. This means…',
      options: [
        { label: 'Return the original head unchanged', isCorrect: false, feedback: 'Returning the original head is a shallow reference — no new nodes are created at all. A deep copy requires n entirely new nodes whose pointers reference each other, not the originals.' },
        { label: 'Create n new nodes with matching structure', isCorrect: true },
        { label: 'Copy only the next pointers', isCorrect: false, feedback: 'Copying only next pointers leaves the random pointers pointing into the original list — that breaks the deep copy contract. Both pointer types must reference the new nodes.' },
        { label: 'Copy values into an array', isCorrect: false, feedback: 'An array loses the linked structure entirely. The output is a linked list of new nodes, not a flat collection of values.' },
      ],
      correctFeedback: 'Every original node maps to exactly one new node. You need a way to locate the new copy of any original node — both when wiring next and when wiring random.',
      wrongFeedback: [
        'The problem says both next and random must point to new nodes. What does that imply about your ability to find the copy of any given original node?',
        'You need to map every original node to its copy. What structure gives you O(1) lookup of "given this original node, what is its copy?"',
      ],
    },
    {
      id: 'random-pointer-challenge',
      question: 'The random pointer "could point to any node in the list, or null." Why does this make a single linear pass insufficient?',
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
      question: 'n ≤ 1000 tells you…',
      options: [
        { label: 'O(n²) space is acceptable', isCorrect: false, feedback: 'O(n²) space at n = 1000 means a million entries — that\'s wasteful and unnecessary. The constraint permits O(n) time and space without any tighter pressure.' },
        { label: 'O(n) time and space is the target', isCorrect: true },
        { label: 'A brute-force two-pointer scan is fine', isCorrect: false, feedback: 'Two pointers don\'t naturally apply to deep copying — the challenge is resolving arbitrary random targets, not traversal speed. n ≤ 1000 permits O(n) approaches, not O(n²) ones.' },
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
      question: 'The problem says random pointers should point to new nodes "in the copied list." This means you must track…',
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
}
