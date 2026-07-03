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
}
