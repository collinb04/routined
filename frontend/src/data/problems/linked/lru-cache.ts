export default {
  id: 'lru-cache',
  title: 'LRU Cache',
  difficulty: 'medium',
  description: `<p>Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.</p><p>Implement the <code>LRUCache</code> class: <code>LRUCache(capacity)</code> initializes the cache, <code>get(key)</code> returns the value or -1 if not found, <code>put(key, value)</code> inserts or updates the key. When the cache reaches capacity, evict the least recently used key before inserting.</p><p>Both operations must run in O(1) average time.</p>`,
  examples: [
    { input: 'LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)', output: '1, -1' },
  ],
  constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5', 'At most 2 * 10^5 calls to get and put'],
  starterCode: `class LRUCache:
  def __init__(self, capacity):
      pass

  def get(self, key):
      pass

  def put(self, key, value):
      pass`,
  functionName: 'lru_cache_run',
  conceptId: 'linked-list',
  runnerSetup: `def lru_cache_run(capacity, ops, args):
  cache = LRUCache(capacity)
  results = []
  for op, a in zip(ops, args):
      if op == 'get': results.append(cache.get(a[0]))
      elif op == 'put': cache.put(a[0], a[1])
  return results`,
  testCases: [
    { label: 'eviction', args: [2, ['put','put','get','put','get','put','get','get','get'], [[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]], expected: [1,-1,-1,3,4] },
  ],
  bruteHint: 'A simple approach stores entries in a plain dict for O(1) key lookup, but tracks recency separately — for example by scanning all entries for a timestamp whenever you need to evict. That eviction scan costs O(n) per put once the cache is full, since finding the least-recently-used entry means checking every stored key. With up to 2 × 10^5 calls and capacity up to 3,000, what does that scan cost add up to?',
  optimizeComplexity: { time: 'O(1)', space: 'O(capacity)' },
  clues: [
    {
      id: 'constraint-o1-operations',
      question: 'How fast an operation must run tells you which data structures are even viable. "Both operations must run in O(1) average time." With up to 2 × 10^5 calls, this rules out…',
      highlight: { location: 'description', text: 'Both operations must run in O(1) average time.' },
      options: [
        { label: 'Scanning a list to find the LRU item', isCorrect: true },
        { label: 'Retrieving a value by key in constant time', isCorrect: false, feedback: 'A hash map gives O(1) average lookup — that\'s exactly what you need. The constraint rules out linear scans, not hash-based lookup.' },
        { label: 'Storing key-value pairs at all', isCorrect: false, feedback: 'You must store key-value pairs — that\'s the core of a cache. The O(1) constraint is about how quickly you access and evict them, not whether you store them.' },
        { label: 'Tracking which item was used most recently', isCorrect: false, feedback: 'Tracking recency is required — the eviction policy depends on it. The constraint is that tracking and evicting must happen in O(1), not that they should be skipped.' },
      ],
      correctFeedback: 'At 200,000 calls, an O(n) scan per operation is up to 600 million steps — far too slow. O(1) for both get and put means you need a data structure that can find any key instantly and move it to "most recently used" in constant time.',
      wrongFeedback: [
        'If finding the LRU item requires scanning up to capacity = 3,000 nodes per eviction, and there are 2 × 10^5 puts, how many total steps is that?',
        'Linear scan per operation is O(n) — 3,000 steps × 200,000 calls = 600 million. You need a structure where eviction and access are both O(1).',
      ],
    },
    {
      id: 'eviction-policy',
      question: 'Which operations must update recency tells you what your structure needs to support. "Evict the least recently used key before inserting." This means recency must be tracked…',
      highlight: { location: 'description', text: 'evict the least recently used key before inserting.' },
      options: [
        { label: 'By insertion order only', isCorrect: false, feedback: 'Insertion order is only correct for newly inserted keys. A get operation also counts as a "use" and must promote that key to most-recently-used — which insertion order alone doesn\'t capture.' },
        { label: 'By both get and put operations', isCorrect: true },
        { label: 'By frequency of access', isCorrect: false, feedback: 'Frequency is LFU (Least Frequently Used) policy, not LRU. LRU tracks recency of the last access — a key used once yesterday is evicted before a key used once today, regardless of count.' },
        { label: 'Only when the cache is full', isCorrect: false, feedback: 'Recency must be updated on every get and put — not just when the cache is full. If you skip updates when there\'s space, the eviction order will be wrong when capacity is eventually reached.' },
      ],
      correctFeedback: 'Every get and every put makes a key "most recently used." The LRU item is the one not touched for the longest time. Your data structure must support moving any key to the "recently used" end in O(1).',
      wrongFeedback: [
        'After a successful get, is the accessed key now the most recently used?',
        'Yes — get promotes a key to the front. So recency order changes on every access, not just insertions. What structure lets you move any node to the front in O(1)?',
      ],
    },
    {
      id: 'two-structure-insight',
      question: 'When no single structure satisfies every requirement, look for two structures whose strengths cover each other\'s gaps. O(1) get requires instant key lookup; O(1) eviction requires instant access to the least-recently-used node. No single standard structure does both. This implies…',
      options: [
        { label: 'Use a sorted array updated on each access', isCorrect: false, feedback: 'Maintaining a sorted array requires shifting elements on each update — O(n) per operation at capacity 3,000. That defeats the O(1) requirement.' },
        { label: 'Combine a hash map with a doubly linked list', isCorrect: true },
        { label: 'Use a heap ordered by access timestamp', isCorrect: false, feedback: 'A heap gives O(log n) access to the minimum — not O(1). Updating priority in a heap is also O(log n). Close but not O(1).' },
        { label: 'Use a single hash map with timestamps', isCorrect: false, feedback: 'A hash map with timestamps gives O(1) lookup but O(n) eviction — you\'d need to scan all keys to find the minimum timestamp. That\'s O(n) per put when the cache is full.' },
      ],
      correctFeedback: 'Hash map: O(1) lookup of any key\'s node. Doubly linked list: O(1) move-to-front (just rewire prev/next) and O(1) evict-from-tail. Together they give O(1) for both operations.',
      wrongFeedback: [
        'You need O(1) lookup by key AND O(1) removal of the least-recently-used node. Which structure gives each of those?',
        'Hash map → O(1) lookup. Doubly linked list → O(1) node removal and insertion when you already have a pointer to the node. Combine them: the map stores pointers into the list.',
      ],
    },
    {
      id: 'capacity-constraint',
      question: 'Constraints on cache size and call volume tell you when eviction logic actually needs to run. 1 ≤ capacity ≤ 3000 and up to 2 × 10^5 calls. This means…',
      highlight: { location: 'constraint', text: '1 <= capacity <= 3000' },
      options: [
        { label: 'You must evict on every put regardless', isCorrect: false, feedback: 'You only evict when the cache is at capacity — if there is still room, just insert. Evicting unnecessarily would lose valid cached entries.' },
        { label: 'Eviction only triggers when at capacity and a new key is inserted', isCorrect: true },
        { label: 'The cache never needs to store more than 3000 entries', isCorrect: false, feedback: 'That\'s true by definition of capacity, but it\'s not the signal here. The key read is that eviction only happens when inserting a new key into a full cache — updating an existing key doesn\'t trigger eviction.' },
        { label: 'get must also evict to stay under capacity', isCorrect: false, feedback: 'get never adds entries — it only reads. Eviction only happens during put when a new key is inserted into a full cache. A get just updates recency order.' },
      ],
      correctFeedback: 'Two distinct put cases: (1) key already exists — update value and move to front, no eviction; (2) key is new and cache is full — evict LRU from the tail, then insert new key at the front.',
      wrongFeedback: [
        'If you put a key that\'s already in the cache, does the size change?',
        'Updating an existing key changes its value and promotes it — no eviction needed. Eviction only fires when a brand-new key is inserted and the cache is already at capacity.',
      ],
    },
  ],
  solutionCode: `class Node:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_to_front(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key):
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._add_to_front(node)
        return node.val

    def put(self, key, value):
        if key in self.cache:
            node = self.cache[key]
            node.val = value
            self._remove(node)
            self._add_to_front(node)
        else:
            if len(self.cache) >= self.capacity:
                lru = self.tail.prev
                self._remove(lru)
                del self.cache[lru.key]
            node = Node(key, value)
            self.cache[key] = node
            self._add_to_front(node)`,
  solutionComplexity: { time: 'O(1)', space: 'O(capacity)' },
  solutionCaveat: 'The two sentinel nodes (<code>head</code> and <code>tail</code>) always stay in the list — they are never real entries — which is what lets <code>_remove</code> and <code>_add_to_front</code> stay branch-free: there is never a "removing the only node" or "list is empty" special case to check for.',
  solutionExplanation: 'A hash map gives O(1) lookup by key, but recency needs an ordering that a plain dict can\'t track — that\'s what the doubly linked list is for, with the front representing "most recently used" and the back representing "least recently used." Every <code>get</code> or successful <code>put</code> on an existing key removes that node from wherever it sits and re-inserts it at the front, both O(1) pointer operations, while a <code>put</code> on a new key at full capacity evicts whatever sits just before the tail sentinel — always the true least-recently-used entry.',
}
