export default {
  id: 'time-based-key-value-store',
  title: 'Time Based Key-Value Store',
  difficulty: 'medium',
  description: `<p>Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.</p><p>Implement <code>set(key, value, timestamp)</code> and <code>get(key, timestamp)</code> which returns the value with the largest timestamp ≤ given timestamp, or <code>""</code> if no such value exists.</p>`,
  examples: [
    { input: 'set("foo","bar",1), get("foo",1), get("foo",3), set("foo","bar2",4), get("foo","foo",4)', output: '"bar","bar","bar2"' },
  ],
  constraints: ['1 <= key.length, value.length <= 100', '1 <= timestamp <= 10^7', 'All timestamps for set are strictly increasing'],
  starterCode: `class TimeMap:
  def __init__(self):
      pass

  def set(self, key, value, timestamp):
      pass

  def get(self, key, timestamp):
      pass`,
  functionName: 'time_map_run',
  conceptId: 'binary-search',
  runnerSetup: `def time_map_run(ops, args):
  tm = TimeMap()
  results = []
  for op, a in zip(ops, args):
      if op == 'set': tm.set(*a)
      elif op == 'get': results.append(tm.get(*a))
  return results`,
  testCases: [
    { label: 'set/get', args: [['set','get','get','set','get','get','get'],[['foo','bar',1],['foo',1],['foo',3],['foo','bar2',4],['foo',4],['foo',5],['foo',0]]], expected: ['bar','bar','bar2','bar2',''] },
  ],
  bruteHint: "The brute-force approach stores each key's (timestamp, value) pairs in a plain list and, on every get call, scans through all of them to find the one with the largest timestamp that's still ≤ the query. That scan costs O(n) per get, where n is the number of values stored for that key. Given the guarantee that timestamps are stored in increasing order, what property of that list could let you avoid checking every entry one by one?",
  optimizeComplexity: { time: 'O(log n)', space: 'O(n)' },
  clues: [
    {
      id: 'strictly-increasing-timestamps',
      question: 'Recognizing what a constraint guarantees about ordering often unlocks a faster search strategy. "All timestamps for set are strictly increasing." What does this guarantee about the stored values for each key?',
      highlight: { location: 'constraint', text: 'All timestamps for set are strictly increasing' },
      options: [
        { label: 'Each key has at most one stored value', isCorrect: false, feedback: 'A key can have many values — one per set call. "Strictly increasing" means each new timestamp is larger than all previous ones for that key, not that there\'s only one.' },
        { label: 'Values for each key are appended in sorted timestamp order', isCorrect: true },
        { label: 'You must sort values by timestamp before each get', isCorrect: false, feedback: 'Since set is always called with increasing timestamps, the list of (timestamp, value) pairs for any key is already sorted by timestamp. No re-sorting is needed.' },
        { label: 'Timestamps are unique across all keys', isCorrect: false, feedback: '"Strictly increasing" applies per-key: each new set for a given key has a larger timestamp than all previous sets for that key. Different keys can share timestamps.' },
      ],
      correctFeedback: 'Because set is always called with increasing timestamps, appending each (timestamp, value) pair produces a list already sorted by timestamp. That sorted order is exactly what makes binary search applicable in get.',
      wrongFeedback: [
        'If set("foo", "v1", 1) is followed by set("foo", "v2", 4), in what order are those entries stored? Does that list need sorting before searching?',
        'A list appended in strictly increasing timestamp order is sorted. What algorithm can efficiently search a sorted list?',
      ],
    },
    {
      id: 'get-semantics',
      question: 'Recognizing what kind of lookup a query describes tells you which search strategy applies. get(key, timestamp) returns the value with the largest stored timestamp ≤ given timestamp. What kind of search does "largest ≤ t" describe?',
      highlight: { location: 'description', text: 'returns the value with the largest timestamp ≤ given timestamp' },
      options: [
        { label: 'Exact match search', isCorrect: false, feedback: 'Exact match returns a value only when the stored timestamp equals t exactly. "Largest ≤ t" must also return a value when t falls between stored timestamps — that\'s a floor search, not an exact match.' },
        { label: 'Floor (predecessor) binary search', isCorrect: true },
        { label: 'Linear scan from the beginning', isCorrect: false, feedback: 'A linear scan would find the answer but costs O(n) per get call. With up to 10^7 timestamps, binary search on the sorted list gives O(log n) per query.' },
        { label: 'Ceiling (successor) binary search', isCorrect: false, feedback: 'Ceiling search finds the smallest timestamp ≥ t — the opposite direction. You want the largest timestamp ≤ t, which is the floor (predecessor).' },
      ],
      correctFeedback: 'Floor search: find the rightmost entry whose timestamp ≤ t. Binary search on the sorted timestamp list finds this in O(log n) — about log₂(10^7) ≈ 23 iterations for the largest possible timestamp range.',
      wrongFeedback: [
        'get("foo", 3) should return "bar" (set at t=1) even though t=3 was never explicitly set. What kind of lookup returns the nearest stored value at or before a given time?',
        'You want the largest stored timestamp that is still ≤ t. Is that a search for an exact value, the smallest value above t, or the largest value below t?',
      ],
    },
    {
      id: 'data-structure-design',
      question: 'The complexity targets required by an operation often dictate which combination of structures can achieve them. Each key maps to multiple (timestamp, value) pairs. What storage structure best supports O(1) set and O(log n) get?',
      options: [
        { label: 'One shared collection holding every key\'s entries together, requiring a scan to the right key before searching within it', isCorrect: false, feedback: 'A single sorted list mixes keys together — each get would need to filter by key before binary searching. Separating by key first avoids that cost.' },
        { label: 'A direct per-key lookup that leads straight to that key\'s own ordered history', isCorrect: true },
        { label: 'A separate ordered structure per key that rebalances as entries are added', isCorrect: false, feedback: 'A BST supports O(log n) insert and floor-search, but since timestamps are strictly increasing, appending to a list is O(1) and binary search gives O(log n). The simpler structure wins.' },
        { label: 'A fixed-size structure with a slot reserved for every possible timestamp, for every key', isCorrect: false, feedback: 'A 2D array indexed by timestamp would need up to 10^7 slots per key — far too much space. Most timestamps are sparse.' },
      ],
      correctFeedback: 'A dict mapping each key to a list of (timestamp, value) pairs: set appends in O(1), get binary-searches the list in O(log n). The strictly-increasing guarantee keeps the list sorted without any extra work.',
      wrongFeedback: [
        'You need fast lookup by key, then fast search within that key\'s history. What two data structures combine to give O(1) key lookup and O(log n) timestamp search?',
        'A hash map for key → list, a list for timestamp history. set appends; get binary-searches. What does the strictly-increasing constraint make unnecessary?',
      ],
    },
  ],
  solutionCode: `class TimeMap:
    def __init__(self):
        self.store = {}

    def set(self, key, value, timestamp):
        self.store.setdefault(key, []).append((timestamp, value))

    def get(self, key, timestamp):
        entries = self.store.get(key, [])
        lo, hi = 0, len(entries) - 1
        result = ""
        while lo <= hi:
            mid = (lo + hi) // 2
            if entries[mid][0] <= timestamp:
                result = entries[mid][1]
                lo = mid + 1
            else:
                hi = mid - 1
        return result`,
  solutionComplexity: { time: 'O(1) for set, O(log n) for get', space: 'O(n)' },
  solutionCaveat: 'The guarantee that timestamps for a given key arrive strictly increasing means every new entry can just be appended to the end of that key\'s list — it is automatically in sorted order, with no separate insertion-position search needed on <code>set</code>.',
  solutionExplanation: 'A hash map gets each key\'s own history in O(1), and because that history is already sorted by timestamp (thanks to the strictly-increasing guarantee), finding "the entry with the largest timestamp ≤ the query" is exactly the same binary-search-for-the-rightmost-valid-position pattern used elsewhere for sorted sequences — tracking the best candidate found so far while narrowing the search range, rather than scanning the whole history on every <code>get</code>.',
}
