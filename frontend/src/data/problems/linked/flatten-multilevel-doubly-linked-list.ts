export default {
  id: 'flatten-multilevel-doubly-linked-list',
  title: 'Flatten a Multilevel Doubly Linked List',
  difficulty: 'medium',
  description: 'A doubly linked list can have a <code>child</code> pointer that points to another doubly linked list. Flatten the list so that all nodes appear in a single-level doubly linked list.',
  examples: [
    { input: 'head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]', output: '[1,2,3,7,8,11,12,9,10,4,5,6]' },
  ],
  constraints: ['List nodes are between 1 and 1000', '1 ≤ Node.val ≤ 10⁵'],
  starterCode: `class Node:
  def __init__(self, val, prev=None, next=None, child=None):
      self.val = val
      self.prev = prev
      self.next = next
      self.child = child

class Solution:
    def flatten(self, head):
        pass`,
  functionName: 'flatten_run',
  runnerSetup: `def _build_level(items):
    head = None
    tail = None
    for item in items:
        if isinstance(item, list):
            val, child_items = item
            node = Node(val)
            node.child = _build_level(child_items)
        else:
            node = Node(item)
        if head is None:
            head = node
        else:
            tail.next = node
            node.prev = tail
        tail = node
    return head

def flatten_run(items):
    head = _build_level(items)
    result_head = Solution().flatten(head)
    out = []
    node = result_head
    while node:
        out.append(node.val)
        node = node.next
    return out`,
  conceptId: 'linked-list',
  testCases: [
    { label: 'Single level', args: [[1,2,3]], expected: [1,2,3] },
    { label: 'Multilevel', args: [[1, 2, [3, [7, [8, [11, 12]], 9, 10]], 4, 5, 6]], expected: [1,2,3,7,8,11,12,9,10,4,5,6] },
  ],
  bruteHint: 'A brute-force approach walks the entire multilevel structure — following child pointers as it finds them — and collects every node into a flat list in the correct order, then makes a second pass rewiring each node\'s next and prev pointers to match that flat sequence. That costs extra space just to hold the intermediate list, on top of the pointer work you have to redo anyway. Since you\'re already touching every node once to collect it, what would let you wire the pointers correctly during that same pass instead of a separate rebuild?',
  optimizeComplexity: { time: 'O(n)', space: 'O(1)' },
  clues: [
    {
      id: 'output-single-level',
      question: 'The exact shape required of the output tells you which pointers your solution actually has to fix. The output must be a single-level doubly linked list. This means…',
      highlight: { location: 'description', text: 'Flatten the list so that all nodes appear in a single-level doubly linked list.' },
      options: [
        { label: 'Only next pointers need updating', isCorrect: false, feedback: 'It\'s a doubly linked list — both next and prev pointers must be correctly wired in the output. Fixing only next pointers leaves prev broken, which violates the doubly linked contract.' },
        { label: 'Both next and prev must be correct after flattening', isCorrect: true },
        { label: 'Children can remain attached as long as next is set', isCorrect: false, feedback: 'Child pointers must be cleared in the output. A single-level list has no child pointers — leaving them set means the structure is still multilevel.' },
        { label: 'Return the values without preserving the pointer links', isCorrect: false, feedback: 'The output is a doubly linked list node, not an array. You need to rewire actual node pointers, not collect values.' },
      ],
      correctFeedback: 'Every node in the output needs a valid prev and next. When you splice a child sublist into the main list, you\'re creating new prev/next connections at two seam points — the node with the child and the tail of that child\'s sublist.',
      wrongFeedback: [
        'A doubly linked list means every node has both a next and a prev. Which of these does flattening definitely need to update?',
        'When a child sublist is inserted after node X, what are the two seam points where prev and next both need updating?',
      ],
    },
    {
      id: 'child-pointer-vocabulary',
      question: 'Understanding exactly where new data gets inserted shapes which traversal order will produce a correct result. Each node can have a child pointer "that points to another doubly linked list." Flattening inserts that child list…',
      highlight: { location: 'description', text: 'that points to another doubly linked list' },
      options: [
        { label: 'At the very end of the main list', isCorrect: false, feedback: 'The example output [1,2,3,7,8,11,12,9,10,4,5,6] shows node 3\'s child (7…) inserted immediately after node 3, not at the end. Insertion happens at the point where the child is found.' },
        { label: 'Immediately after the node that owns the child', isCorrect: true },
        { label: 'Before the node that owns the child', isCorrect: false, feedback: 'The child comes after its parent in depth-first traversal order. Inserting before would put children ahead of their parents, which contradicts the example output.' },
        { label: 'Sorted by node value', isCorrect: false, feedback: 'Flattening follows depth-first traversal order, not value order. The child sublist is inserted in place, not sorted.' },
      ],
      correctFeedback: 'Depth-first order: visit the child sublist fully before continuing with the parent\'s next sibling. The child is spliced in right after its parent node, and the tail of the child connects to the parent\'s former next.',
      wrongFeedback: [
        'Look at the example: node 3 has a child starting at 7. In the output, where does 7 appear relative to 3?',
        'The child goes right after its parent — and the tail of the child sublist connects to whatever came after the parent. That\'s a splice operation at two points.',
      ],
    },
    {
      id: 'recursive-structure',
      question: 'Nesting that can go arbitrarily deep tells you whether your approach needs to generalize or can stay special-cased. A child list can itself have child pointers (the example has three levels). This means…',
      options: [
        { label: 'Process each level separately in order', isCorrect: false, feedback: 'Processing level by level separately would require multiple passes and tracking which nodes belong to which level. The depth-first structure maps naturally to a single traversal that handles nesting automatically.' },
        { label: 'A depth-first approach handles arbitrary nesting', isCorrect: true },
        { label: 'Flattening is only needed for two levels', isCorrect: false, feedback: 'The problem says child lists can themselves have child pointers — the nesting is arbitrary. A solution hardcoded for two levels would fail on deeper inputs.' },
        { label: 'BFS level-order traversal is the right tool', isCorrect: false, feedback: 'BFS visits siblings before children, which would produce the wrong order. The output requires depth-first ordering: fully flatten each child before moving to the next sibling.' },
      ],
      correctFeedback: 'Whether you use recursion or an explicit stack, depth-first traversal naturally handles arbitrary nesting. Every time you encounter a child, you fully flatten it before moving on — which handles three levels, thirty levels, or any depth.',
      wrongFeedback: [
        'When you splice a child list in, that child list might itself have children. Does your approach handle that automatically?',
        'Depth-first means: go as deep as possible before backtracking. Which traversal tool — recursion or an explicit stack — lets you do that without knowing the depth in advance?',
      ],
    },
    {
      id: 'constraint-list-size',
      question: 'The total input size sets the efficiency bar your traversal needs to hit. Up to 1000 nodes total tells you…',
      highlight: { location: 'constraint', text: 'List nodes are between 1 and 1000' },
      options: [
        { label: 'An O(n²) approach scanning for children repeatedly is fine', isCorrect: false, feedback: 'At 1000 nodes, O(n²) is 1,000,000 operations — acceptable, but unnecessary. A single O(n) traversal visits every node exactly once and handles all splicing inline.' },
        { label: 'A single O(n) traversal is the target', isCorrect: true },
        { label: 'Recursion will cause a stack overflow', isCorrect: false, feedback: 'Python\'s default recursion limit is 1000, so deep nesting could be a concern, but the total node count is 1000 — not the nesting depth. An iterative stack sidesteps the issue entirely.' },
        { label: 'You need O(n) extra space to track levels', isCorrect: false, feedback: 'You can flatten in place with O(1) extra pointers — you don\'t need to store level information. A stack or recursion for depth tracking is O(depth), not O(n).' },
      ],
      correctFeedback: 'With 1000 nodes, O(n) is the natural target: one pass, splice each child in place as you encounter it, clear the child pointer, and continue. No extra storage of level information needed.',
      wrongFeedback: [
        'If you traverse the list once and splice each child in immediately when you find it, how many total node visits does that take?',
        'Each node is visited exactly once in a single forward scan. Splicing is O(1) pointer work per node — making the whole operation O(n).',
      ],
    },
  ],
  solutionCode: `class Solution:
    def flatten(self, head):
        if not head:
            return head
        node = head
        while node:
            if node.child:
                child_head = node.child
                child_tail = child_head
                while child_tail.next:
                    child_tail = child_tail.next
                child_tail.next = node.next
                if node.next:
                    node.next.prev = child_tail
                node.next = child_head
                child_head.prev = node
                node.child = None
            node = node.next
        return head`,
  solutionComplexity: { time: 'O(n)', space: 'O(1)' },
  solutionCaveat: 'After splicing a child list in, the traversal continues from <code>node.next</code> — which now points into the just-spliced child list rather than skipping past it — so a child\'s own children get flattened automatically on a later iteration of the very same loop, with no explicit recursion needed.',
  solutionExplanation: 'Whenever the current node has a child, that entire child list can simply be spliced in between the current node and whatever used to come after it — walk to the child list\'s tail, point that tail at the original <code>next</code>, and clear the child pointer since it has now been absorbed into the main chain. Continuing the same single forward scan naturally reaches the just-spliced-in nodes next, so any children nested inside *them* get flattened by that same loop without a separate recursive pass.',
}
